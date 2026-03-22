from typing import Optional, Tuple


def _is_int(x):
    try:
        int(x)
        return True
    except Exception:
        return False


def find_any_category_with_items(api) -> Optional[int]:
    r = api.get("/dict/categories")
    if r.status_code != 200:
        return None

    cats = r.json()
    if not isinstance(cats, list):
        return None

    for c in cats:
        cid = c.get("id")
        if not _is_int(cid):
            continue

        cid = int(cid)
        rr = api.get(f"/channels/{cid}", params={"limit": 1})

        if rr.status_code != 200:
            continue

        items = rr.json().get("items")
        if isinstance(items, list) and items:
            return cid

    return None


def find_any_content_id(api) -> Optional[Tuple[int, int]]:
    cid = find_any_category_with_items(api)
    if cid is None:
        return None

    r = api.get(f"/channels/{cid}", params={"limit": 1})
    items = r.json().get("items")

    if not items:
        return None

    content_id = items[0].get("id")
    if not _is_int(content_id):
        return None

    return cid, int(content_id)