def test_home_structure(api):
    r = api.get("/home")
    assert r.status_code == 200

    data = r.json()
    assert isinstance(data, dict)

    expected_keys = {
        "banners",
        "featured_drama",
        "featured_endorsement",
        "featured_event",
        "featured_media",
        "about",
    }
    assert expected_keys.issubset(set(data.keys()))

    for k in expected_keys:
        assert isinstance(data[k], list)

    # 不做精确数量断言（线上数据会变），只做“不会超过合理上限”的弱断言
    assert len(data["banners"]) <= 3
    assert len(data["featured_drama"]) <= 6
    assert len(data["featured_endorsement"]) <= 4
    assert len(data["featured_event"]) <= 4
    assert len(data["featured_media"]) <= 6
    assert len(data["about"]) <= 1


def test_home_items_have_min_fields(api):
    r = api.get("/home")
    assert r.status_code == 200
    data = r.json()

    # 找到任意一个非空列表，检查字段
    any_list = None
    for v in data.values():
        if isinstance(v, list) and v:
            any_list = v
            break

    if not any_list:
        # 首页可能暂时没数据：黑盒不该 fail，直接跳过
        return

    item0 = any_list[0]
    assert isinstance(item0, dict)
    # 卡片最基本字段
    assert "id" in item0
    assert "title" in item0
    assert "link_type" in item0
