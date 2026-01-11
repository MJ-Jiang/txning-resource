def test_channel_basic_pagination_and_total(client):
    r = client.get("/channels/1?limit=50&offset=0")
    assert r.status_code == 200
    data = r.json()

    assert data["total"] == 2
    assert data["limit"] == 50
    assert data["offset"] == 0
    assert len(data["items"]) == 2

    # channel.py 里 order_by(Content.id.desc())
    ids = [x["id"] for x in data["items"]]
    assert ids == [102, 101]


def test_channel_title_filter(client):
    r = client.get("/channels/1?title=Drama%20A")
    assert r.status_code == 200
    data = r.json()
    assert data["total"] == 1
    assert [x["id"] for x in data["items"]] == [101]


def test_channel_limit_offset(client):
    r = client.get("/channels/1?limit=1&offset=0")
    assert r.status_code == 200
    data = r.json()
    assert data["total"] == 2
    assert [x["id"] for x in data["items"]] == [102]

    r = client.get("/channels/1?limit=1&offset=1")
    assert r.status_code == 200
    data = r.json()
    assert [x["id"] for x in data["items"]] == [101]


def test_channel_items_include_bulk_fields(client):
    # 101 seed 了 platform/city/genre；102 没有
    r = client.get("/channels/1")
    assert r.status_code == 200
    items = r.json()["items"]

    item_by_id = {x["id"]: x for x in items}
    assert item_by_id[101]["platform_ids"] == [1]
    assert item_by_id[101]["city_ids"] == [10]
    assert item_by_id[101]["genre_ids"] == [20]

    assert item_by_id[102]["platform_ids"] == []
    assert item_by_id[102]["city_ids"] == []
    assert item_by_id[102]["genre_ids"] == []
