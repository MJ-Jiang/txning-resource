#main.py + config + 启动
import importlib
import os

import pytest
from starlette.middleware.cors import CORSMiddleware

from app.main import app


def test_app_import():
    assert app is not None


def test_health_ok(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"ok": True}


def test_docs_available(client):
    r = client.get("/docs")
    assert r.status_code == 200
    # 粗略检查是 Swagger UI 页面（避免被中间件重定向成别的页面）
    assert "text/html" in r.headers.get("content-type", "")


def test_openapi_loads(client):
    r = client.get("/openapi.json")
    assert r.status_code == 200
    data = r.json()
    assert "paths" in data
    assert "/health" in data["paths"]


def test_cors_middleware_present():
    # 确认确实挂了 CORS 中间件（避免以后重构时漏掉）
    middlewares = [m.cls for m in app.user_middleware]
    assert CORSMiddleware in middlewares


@pytest.mark.parametrize(
    "cors_env,expected",
    [
        ("", []),
        ("http://localhost:3000", ["http://localhost:3000"]),
        (" http://a.com , http://b.com  ", ["http://a.com", "http://b.com"]),
        (",,,", []),
    ],
)
def test_cors_origins_parsing(monkeypatch, cors_env, expected):
    monkeypatch.setenv("CORS_ORIGINS", cors_env)

    import app.main as main_module
    importlib.reload(main_module)

    reloaded_app = main_module.app

    cors_mw = None
    for m in reloaded_app.user_middleware:
        if m.cls is CORSMiddleware:
            cors_mw = m
            break

    assert cors_mw is not None

    # 兼容不同版本：有的叫 options，有的叫 kwargs
    opts = getattr(cors_mw, "options", None) or getattr(cors_mw, "kwargs", None) or {}
    assert opts.get("allow_origins") == expected


def test_rate_limit_excludes_health(client):
    """
     main.py 里写了 exclude_path_prefixes=('/health',)
    这个测试确保 /health 不会被 429 卡住。
    """
    # 疯狂请求 /health，理论上永远不会 429（除非中间件实现不对）
    for _ in range(50):
        r = client.get("/health")
        assert r.status_code == 200
