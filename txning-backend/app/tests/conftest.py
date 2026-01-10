#重建了 db.py 和 main.py 提供的运行环境，让 crud / schemas / routers / services 都在一个“可测试世界”里运行。
import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    return TestClient(app)
