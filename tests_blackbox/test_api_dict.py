def _assert_dict_item_shape(x: dict):
    assert "id" in x
    assert "name_zh" in x
    # code 有些表可能为 null，但 key 应该存在
    assert "code" in x


def test_dict_all_has_expected_keys(api):
    r = api.get("/dict/all")
    assert r.status_code == 200
    data = r.json()

    assert isinstance(data, dict)
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


def test_dict_categories_sorted_by_id(api):
    r = api.get("/dict/categories")
    assert r.status_code == 200
    rows = r.json()
    assert isinstance(rows, list)

    ids = [x.get("id") for x in rows if isinstance(x, dict)]
    # 只要是 int/可转 int 的，保证单调递增
    ids_int = [int(i) for i in ids if i is not None]
    assert ids_int == sorted(ids_int)

    if rows:
        _assert_dict_item_shape(rows[0])


def test_dict_platforms_shape(api):
    r = api.get("/dict/platforms")
    assert r.status_code == 200
    rows = r.json()
    assert isinstance(rows, list)
    if rows:
        _assert_dict_item_shape(rows[0])
