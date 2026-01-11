def test_contents_list_requires_category_param(client):
    # category 是 Query(...) 必填
    r = client.get("/contents")
    assert r.status_code == 422


def test_contents_list_by_category_sorted_by_created_at_desc(client):
    # /contents 用 crud.list_contents_by_category，按 created_at.desc()
    r = client.get("/contents?category=1&limit=50&offset=0")
    assert r.status_code == 200
    data = r.json()

    assert data["total"] == 2
    ids = [x["id"] for x in data["items"]]
    # seed：101 created_at=2024-01-02, 102=2024-01-01
    assert ids == [101, 102]


def test_contents_list_multi_category(client):
    r = client.get("/contents?category=4&category=5")
    assert r.status_code == 200
    data = r.json()
    assert data["total"] == 2
    ids = sorted([x["id"] for x in data["items"]])
    assert ids == [401, 501]


def test_contents_detail_404(client):
    r = client.get("/contents/999999")
    assert r.status_code == 404
    assert r.json()["detail"] == "Content not found"


def test_contents_detail_shape_and_nested_lists(client):
    r = client.get("/contents/101")
    assert r.status_code == 200
    data = r.json()

    assert "content" in data
    assert "rating" in data
    assert "genres" in data
    assert "cities" in data
    assert "platforms" in data
    assert "booking_platforms" in data

    assert data["content"]["id"] == 101
    assert isinstance(data["genres"], list)
    assert isinstance(data["cities"], list)
    assert isinstance(data["platforms"], list)
    assert isinstance(data["booking_platforms"], list)

    # seed 的关联
    assert [g["id"] for g in data["genres"]] == [20]
    assert [c["id"] for c in data["cities"]] == [10]

    # booking_platforms 有 url
    assert len(data["booking_platforms"]) == 1
    assert data["booking_platforms"][0]["url"] == "https://book/101"


def test_contents_related_empty_when_no_relations(client):
    # 102 没有 source->target 关系
    r = client.get("/contents/102/related")
    assert r.status_code == 200
    data = r.json()
    assert data["total"] == 0
    assert data["items"] == []


def test_contents_related_404_when_source_missing(client):
    r = client.get("/contents/999999/related")
    assert r.status_code == 404
    assert r.json()["detail"] == "Content not found"


def test_contents_related_returns_cards(client):
    # seed: 101 -> 201 and 101 -> 401 (used by related-from-map)
    r = client.get("/contents/101/related?limit=20&offset=0")
    assert r.status_code == 200
    data = r.json()

    assert data["total"] == 2
    ids = [x["id"] for x in data["items"]]
    # order_by(Content.id.desc()) so 401 comes before 201
    assert ids == [401, 201]



def test_related_from_map_basic(client):
    # seed: 101(category=1)->401(category=4), 201(category=2)->401(category=4)
    r = client.get("/contents/related-from-map?target_category=4&source_category=1&source_category=2")
    assert r.status_code == 200
    data = r.json()

    assert "401" in data
    assert data["401"] == [1, 2]  # 应为排序后的来源分类
