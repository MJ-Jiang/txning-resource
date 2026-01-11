def test_dict_all_has_all_keys(client):
    r = client.get("/dict/all")
    assert r.status_code == 200
    data = r.json()

    keys = {
        "statuses",
        "types",
        "genres",
        "platforms",
        "cities",
        "categories",
        "ugc_platforms",
        "booking_platforms",
    }
    assert keys.issubset(set(data.keys()))
    for k in keys:
        assert isinstance(data[k], list)


def test_dict_endpoints_sorted_by_id_asc(client):
    # categories
    r = client.get("/dict/categories")
    assert r.status_code == 200
    rows = r.json()
    ids = [x["id"] for x in rows]
    assert ids == sorted(ids)

    # platforms
    r = client.get("/dict/platforms")
    assert r.status_code == 200
    rows = r.json()
    ids = [x["id"] for x in rows]
    assert ids == sorted(ids)

    # ugc platforms
    r = client.get("/dict/ugc-platforms")
    assert r.status_code == 200
    rows = r.json()
    ids = [x["id"] for x in rows]
    assert ids == sorted(ids)


def test_dict_item_shape(client):
    r = client.get("/dict/statuses")
    assert r.status_code == 200
    rows = r.json()

    assert len(rows) >= 1
    one = rows[0]
    assert set(one.keys()) == {"id", "code", "name_zh"}
