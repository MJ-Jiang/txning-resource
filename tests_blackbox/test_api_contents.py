import pytest

from conftest import find_any_content_id


def test_contents_list_requires_category(api):
    r = api.get("/contents")
    assert r.status_code == 422


def test_contents_list_page_shape(api):
    found = find_any_content_id(api)
    if found is None:
        pytest.skip("No content found from channels; skip contents list test.")
    cid, _content_id = found

    r = api.get("/contents", params=[("category", cid), ("limit", 5), ("offset", 0)])
    assert r.status_code == 200
    data = r.json()

    assert isinstance(data, dict)
    assert isinstance(data.get("total"), int)
    assert isinstance(data.get("limit"), int)
    assert isinstance(data.get("offset"), int)
    assert isinstance(data.get("items"), list)

    if data["items"]:
        item0 = data["items"][0]
        assert "id" in item0
        assert "title" in item0
        assert "link_type" in item0


def test_content_detail_404(api):
    r = api.get("/contents/999999999")
    assert r.status_code == 404


def test_content_detail_shape(api):
    found = find_any_content_id(api)
    if found is None:
        pytest.skip("No content found from channels; skip content detail test.")
    _cid, content_id = found

    r = api.get(f"/contents/{content_id}")
    assert r.status_code == 200
    data = r.json()

    assert isinstance(data, dict)
    assert "content" in data
    assert "rating" in data
    assert "genres" in data
    assert "cities" in data
    assert "platforms" in data
    assert "booking_platforms" in data

    assert isinstance(data["content"], dict)
    assert data["content"].get("id") == content_id
    assert isinstance(data["genres"], list)
    assert isinstance(data["cities"], list)
    assert isinstance(data["platforms"], list)
    assert isinstance(data["booking_platforms"], list)


def test_related_from_map_contract(api):
    # 不强依赖具体数据，只验证类型与值类型
    r = api.get("/contents/related-from-map")
    assert r.status_code == 200
    data = r.json()

    assert isinstance(data, dict)
    # key 应是 target_id 的字符串，value 是 source_category_id 列表
    for k, v in list(data.items())[:5]:  # 只抽样检查前几个，避免数据太大
        assert isinstance(k, str)
        assert isinstance(v, list)
        for x in v:
            assert isinstance(x, int)


def test_related_endpoint_contract(api):
    found = find_any_content_id(api)
    if found is None:
        pytest.skip("No content found from channels; skip related endpoint test.")
    _cid, content_id = found

    r = api.get(f"/contents/{content_id}/related", params={"limit": 5, "offset": 0})
    # 如果该 content 没有关联，你的实现返回 total=0 items=[]
    # 所以只要 200 并且结构正确即可
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data.get("total"), int)
    assert isinstance(data.get("items"), list)
