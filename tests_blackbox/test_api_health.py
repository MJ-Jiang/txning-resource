def test_health_ok(api):
    r = api.get("/health")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, dict)
    assert data.get("ok") is True


def test_openapi_available(api):
    # 未来关闭 openapi/docs，这条可以删掉或改成可选
    r = api.get("/openapi.json")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, dict)
    assert "paths" in data
    assert isinstance(data["paths"], dict)
    assert "/health" in data["paths"]
