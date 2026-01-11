import os
from typing import Optional, Tuple

import httpx
import pytest


def _base_url() -> str:
    # 也可以本地跑：BASE_URL=http://127.0.0.1:8000 pytest
    return os.getenv("BASE_URL", "https://txning-resource.onrender.com").rstrip("/")


@pytest.fixture(scope="session")
def api() -> httpx.Client:
    """
    黑盒 HTTP client：只知道 BASE_URL，不知道任何后端内部实现。
    """
    client = httpx.Client(
        base_url=_base_url(),
        timeout=httpx.Timeout(20.0),
        follow_redirects=True,
        headers={
            "Accept": "application/json",
            #方便以后看日志/限流定位
            "User-Agent": "txning-blackbox-tests/1.0",
        },
    )
    yield client
    client.close()


def _is_int(x) -> bool:
    try:
        int(x)
        return True
    except Exception:
        return False


def find_any_category_with_items(api: httpx.Client) -> Optional[int]:
    """
    尝试找到一个“确实有内容”的 category_id：
    - 先从 /dict/categories 拿类别列表
    - 逐个 call /channels/{category_id}?limit=1
    - 找到 items 非空的 category
    """
    r = api.get("/dict/categories")
    if r.status_code != 200:
        return None
    cats = r.json()
    if not isinstance(cats, list) or not cats:
        return None

    for c in cats:
        cid = c.get("id")
        if not _is_int(cid):
            continue
        cid = int(cid)

        rr = api.get(f"/channels/{cid}", params={"limit": 1, "offset": 0})
        if rr.status_code != 200:
            continue
        data = rr.json()
        items = data.get("items")
        if isinstance(items, list) and len(items) > 0:
            return cid
    return None


def find_any_content_id(api: httpx.Client) -> Optional[Tuple[int, int]]:
    """
    返回 (category_id, content_id)
    """
    cid = find_any_category_with_items(api)
    if cid is None:
        return None

    rr = api.get(f"/channels/{cid}", params={"limit": 1, "offset": 0})
    if rr.status_code != 200:
        return None
    data = rr.json()
    items = data.get("items")
    if not isinstance(items, list) or not items:
        return None

    item0 = items[0]
    content_id = item0.get("id")
    if not _is_int(content_id):
        return None
    return cid, int(content_id)
