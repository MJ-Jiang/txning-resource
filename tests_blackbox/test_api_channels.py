import pytest

from conftest import find_any_category_with_items


def test_channels_contract(api):
    cid = find_any_category_with_items(api)
    if cid is None:
        pytest.skip("No category with items found; skip channels tests.")

    r = api.get(f"/channels/{cid}", params={"limit": 5, "offset": 0})
    assert r.status_code == 200
    data = r.json()

    assert isinstance(data, dict)
    assert isinstance(data.get("total"), int)
    assert isinstance(data.get("limit"), int)
    assert isinstance(data.get("offset"), int)
    assert isinstance(data.get("items"), list)

    if data["items"]:
        item0 = data["items"][0]
        assert isinstance(item0, dict)
        # 对外 contract：这些字段前端通常会用
        for key in ["id", "title", "link_type", "platform_ids", "city_ids", "genre_ids", "related_ids"]:
            assert key in item0


def test_channels_order_by_id_desc(api):
    cid = find_any_category_with_items(api)
    if cid is None:
        pytest.skip("No category with items found; skip channels ordering test.")

    r = api.get(f"/channels/{cid}", params={"limit": 10, "offset": 0})
    assert r.status_code == 200
    items = r.json().get("items", [])
    if len(items) < 2:
        return

    ids = [int(x["id"]) for x in items if "id" in x]
    #channel.py 明确是 order_by(Content.id.desc())
    assert ids == sorted(ids, reverse=True)


def test_channels_invalid_param_422(api):
    cid = find_any_category_with_items(api)
    if cid is None:
        pytest.skip("No category with items found; skip channels invalid param test.")

    r = api.get(f"/channels/{cid}", params={"limit": "not-a-number"})
    assert r.status_code == 422
