#重建了 db.py 和 main.py 提供的运行环境，让 crud / schemas / routers / services 都在一个“可测试世界”里运行。seed 数据
import pytest
from fastapi.testclient import TestClient
import os
os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///./_pytest_app_import.db")
os.environ.setdefault("CORS_ORIGINS", "")
from app.main import app


@pytest.fixture
def client():
    from app.main import app
    return TestClient(app)
