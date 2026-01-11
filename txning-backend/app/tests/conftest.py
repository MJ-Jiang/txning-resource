#重建了 db.py 和 main.py 提供的运行环境，让 crud / schemas / routers / services 都在一个“可测试世界”里运行。seed 数据
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from models import (
    Base,
    BookingPlatform,
    Category,
    City,
    Content,
    ContentBookingPlatform,
    ContentCity,
    ContentGenre,
    ContentPlatform,
    ContentRelation,
    Genre,
    Platform,
    Status,
    Type,
    UGCPlatform,
)

# ---  app/db.py import 时会 assert DATABASE_URL ---
# 测试里我们不让它指向真实 Postgres；只用 sqlite 占位即可（真正查询走 override 的测试 DB session）
os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///./_pytest_import_only.db")
os.environ.setdefault("CORS_ORIGINS", "")
os.environ.setdefault("RATE_LIMIT_MAX", "999999")
os.environ.setdefault("RATE_LIMIT_WINDOW", "60")


@pytest.fixture(scope="session")
def engine():
    # 单个内存 DB，供整个测试 session 使用
    engine = create_engine(
        "sqlite+pysqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    Base.metadata.create_all(engine)
    return engine


@pytest.fixture()
def db(engine):
    SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)
    session = SessionLocal()

    # 每个测试都清库+重建 seed，保证彼此独立、可预测
    for tbl in reversed(Base.metadata.sorted_tables):
        session.execute(tbl.delete())
    session.commit()

    seed_data(session)

    try:
        yield session
    finally:
        session.close()


def seed_data(db):
    # --- dict tables ---
    db.add_all(
        [
            Category(id=1, code="drama", name_zh="剧"),
            Category(id=2, code="endorsement", name_zh="代言"),
            Category(id=3, code="event", name_zh="活动"),
            Category(id=4, code="ugc", name_zh="UGC"),
            Category(id=5, code="personal", name_zh="个人"),
            Category(id=6, code="banner", name_zh="Banner"),
            Category(id=7, code="about", name_zh="About"),
            Status(id=1, code="on", name_zh="上线"),
            Type(id=1, code="t1", name_zh="类型1"),
            Genre(id=20, code="g20", name_zh="类型A"),
            Genre(id=21, code="g21", name_zh="类型B"),
            City(id=10, code="c10", name_zh="城市A"),
            City(id=11, code="c11", name_zh="城市B"),
            Platform(id=1, code="p1", name_zh="平台A"),
            Platform(id=2, code="p2", name_zh="平台B"),
            BookingPlatform(id=1, code="bp1", name_zh="订票A"),
            UGCPlatform(id=1, code="up1", name_zh="UGC平台A"),
        ]
    )

    # --- contents ---
    from datetime import datetime

    c101 = Content(
        id=101,
        category_id=1,
        title_zh="Drama A",
        created_at=datetime(2024, 1, 2, 0, 0, 0),
        release_year=2024,
        status_id=1,
        type_id=1,
        is_featured=True,
        poster_url="https://img/a",
        href="https://detail/101",
    )
    c102 = Content(
        id=102,
        category_id=1,
        title_zh="Drama B",
        created_at=datetime(2024, 1, 1, 0, 0, 0),
        release_year=2023,
        status_id=1,
        type_id=1,
        is_featured=False,
        poster_url="https://img/b",
        href="https://detail/102",
    )
    c201 = Content(
        id=201,
        category_id=2,
        title_zh="Endorsement A",
        created_at=datetime(2024, 1, 3, 0, 0, 0),
        is_featured=True,
    )
    c301 = Content(
        id=301,
        category_id=3,
        title_zh="Event A",
        created_at=datetime(2024, 1, 4, 0, 0, 0),
        is_featured=False,
    )
    c401 = Content(
        id=401,
        category_id=4,
        title_zh="UGC A",
        created_at=datetime(2024, 1, 5, 0, 0, 0),
        ugc_url="www.example.com/x",
        ugc_platform_id=1,
        is_featured=False,
    )
    c501 = Content(
        id=501,
        category_id=5,
        title_zh="Personal A",
        created_at=datetime(2024, 1, 6, 0, 0, 0),
        ugc_url=None,  # category_id=5 在 home.to_card 也会被当作 external
        is_featured=True,
    )
    c601 = Content(
        id=601,
        category_id=6,
        title_zh="Banner A",
        created_at=datetime(2024, 1, 7, 0, 0, 0),
        is_featured=True,
    )
    c701 = Content(
        id=701,
        category_id=7,
        title_zh="About A",
        created_at=datetime(2024, 1, 8, 0, 0, 0),
        is_featured=False,
    )

    db.add_all([c101, c102, c201, c301, c401, c501, c601, c701])
    db.commit()

    # --- relations / join tables for content_detail & cards ---
    db.add_all(
        [
            ContentGenre(content_id=101, genre_id=20),
            ContentCity(content_id=101, city_id=10),
            ContentPlatform(content_id=101, platform_id=1, url=None),
            ContentBookingPlatform(content_id=101, booking_platform_id=1, url="https://book/101"),
            # related (source -> target)
            ContentRelation(source_content_id=101, target_content_id=201),
            # related-from-map: target=401, source categories [1,2]
            ContentRelation(source_content_id=101, target_content_id=401),
            ContentRelation(source_content_id=201, target_content_id=401),
        ]
    )
    db.commit()


@pytest.fixture()
def client(db):
    """
    给 FastAPI app 注入测试 DB（override get_db）。
    """
    from app.main import app
    from app.db import get_db

    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app)
