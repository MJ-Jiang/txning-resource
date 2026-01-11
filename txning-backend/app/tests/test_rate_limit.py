import time

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.middleware.rate_limit import RateLimitMiddleware


def make_client(
    *,
    max_requests: int = 3,
    window_seconds: int = 2,
    scope_path_prefixes=("/",),
    exclude_path_prefixes=("/health",),
):
    """
    建一个专用的小 app 来测中间件，避免和 main.py 的全站限流互相干扰。
    """
    app = FastAPI()

    app.add_middleware(
        RateLimitMiddleware,
        max_requests=max_requests,
        window_seconds=window_seconds,
        scope_path_prefixes=scope_path_prefixes,
        exclude_path_prefixes=exclude_path_prefixes,
    )

    @app.get("/items")
    def items():
        return {"ok": True}

    @app.get("/other")
    def other():
        return {"ok": True}

    @app.get("/health")
    def health():
        return {"ok": True}

    return TestClient(app)


def test_rate_limit_allows_under_limit():
    client = make_client(max_requests=3, window_seconds=60)
    headers = {"x-forwarded-for": "1.2.3.4"}

    for _ in range(3):
        r = client.get("/items", headers=headers)
        assert r.status_code == 200
        assert r.json() == {"ok": True}


def test_rate_limit_blocks_over_limit_and_sets_retry_after():
    client = make_client(max_requests=2, window_seconds=60)
    headers = {"x-forwarded-for": "1.2.3.4"}

    assert client.get("/items", headers=headers).status_code == 200
    assert client.get("/items", headers=headers).status_code == 200

    r = client.get("/items", headers=headers)
    assert r.status_code == 429

    body = r.json()
    assert body["detail"] == "Too Many Requests"
    assert "retry_after_seconds" in body
    assert isinstance(body["retry_after_seconds"], int)
    assert body["retry_after_seconds"] >= 1

    assert "Retry-After" in r.headers
    assert int(r.headers["Retry-After"]) >= 1


def test_rate_limit_is_per_ip():
    client = make_client(max_requests=1, window_seconds=60)

    h1 = {"x-forwarded-for": "1.1.1.1"}
    h2 = {"x-forwarded-for": "2.2.2.2"}

    assert client.get("/items", headers=h1).status_code == 200
    assert client.get("/items", headers=h1).status_code == 429  # 同 IP 第二次被挡

    assert client.get("/items", headers=h2).status_code == 200  # 不同 IP 不受影响


def test_rate_limit_is_per_path():
    client = make_client(max_requests=1, window_seconds=60)
    headers = {"x-forwarded-for": "1.2.3.4"}

    assert client.get("/items", headers=headers).status_code == 200
    assert client.get("/items", headers=headers).status_code == 429

    # 同一个 IP 访问另一个 path，应当是另一把 key，不应该被挡
    assert client.get("/other", headers=headers).status_code == 200


def test_health_is_excluded_from_rate_limit():
    client = make_client(max_requests=1, window_seconds=60)
    headers = {"x-forwarded-for": "1.2.3.4"}

    # /items 会被限流
    assert client.get("/items", headers=headers).status_code == 200
    assert client.get("/items", headers=headers).status_code == 429

    # /health 不限流：疯狂请求也一直 200
    for _ in range(5):
        r = client.get("/health", headers=headers)
        assert r.status_code == 200
        assert r.json() == {"ok": True}


def test_x_forwarded_for_first_ip_is_used():
    client = make_client(max_requests=1, window_seconds=60)

    # XFF 第一个 IP 应作为 key
    h = {"x-forwarded-for": "9.9.9.9, 10.0.0.1, 10.0.0.2"}

    assert client.get("/items", headers=h).status_code == 200
    assert client.get("/items", headers=h).status_code == 429


def test_window_resets_after_time_passes():
    client = make_client(max_requests=1, window_seconds=1)
    headers = {"x-forwarded-for": "1.2.3.4"}

    assert client.get("/items", headers=headers).status_code == 200
    assert client.get("/items", headers=headers).status_code == 429

    # 过了 window 后应该恢复
    time.sleep(1.05)
    assert client.get("/items", headers=headers).status_code == 200
