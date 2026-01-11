def test_home_structure_and_limits(client):
    r = client.get("/home")
    assert r.status_code == 200

    data = r.json()
    expected_keys = {
        "banners",
        "featured_drama",
        "featured_endorsement",
        "featured_event",
        "featured_media",
        "about",
    }
    assert expected_keys.issubset(set(data.keys()))

    # 每个字段都是 list
    for k in expected_keys:
        assert isinstance(data[k], list)

    # 限制数量（来自 home.py 的 pick limit）
    assert len(data["banners"]) <= 3
    assert len(data["featured_drama"]) <= 6
    assert len(data["featured_endorsement"]) <= 4
    assert len(data["featured_event"]) <= 4
    assert len(data["featured_media"]) <= 6
    assert len(data["about"]) <= 1


def test_home_drama_order_featured_then_id_desc(client):
    r = client.get("/home")
    assert r.status_code == 200
    data = r.json()

    # category=1 里我们 seed 了 101(featured True) 和 102(False)
    # 排序规则：desc(is_featured), desc(id)
    ids = [x["id"] for x in data["featured_drama"]]
    assert ids[:2] == [101, 102]


def test_home_featured_media_link_type_external(client):
    r = client.get("/home")
    assert r.status_code == 200
    data = r.json()

    # featured_media 对应 category [4,5]，home.to_card 逻辑：
    # category in (4,5) 或 ugc_url != None => external
    for item in data["featured_media"]:
        assert item["link_type"] == "external"
        # link_url 可能为 None（比如 category=5 且 ugc_url None）
