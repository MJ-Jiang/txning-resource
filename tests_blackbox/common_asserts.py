def assert_paging(data: dict):
    assert isinstance(data.get("total"), int)
    assert isinstance(data.get("limit"), int)
    assert isinstance(data.get("offset"), int)
    assert isinstance(data.get("items"), list)


def assert_content_card(item: dict):
    for k in ["id", "title", "link_type"]:
        assert k in item


def assert_dict_item(item: dict):
    assert "id" in item
    assert "name_zh" in item
    assert "code" in item