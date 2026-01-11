from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.crud import list_contents_by_category
from models import Base, Content


def make_session():
    engine = create_engine("sqlite+pysqlite:///:memory:", future=True)
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)
    return SessionLocal()


def seed_contents(db):
    db.add_all(
        [
            Content(
                id=1,
                category_id=10,
                title_zh="old",
                created_at=datetime(2024, 1, 1, 0, 0, 0),
            ),
            Content(
                id=2,
                category_id=10,
                title_zh="new",
                created_at=datetime(2024, 1, 2, 0, 0, 0),
            ),
            Content(
                id=3,
                category_id=99,
                title_zh="other",
                created_at=datetime(2024, 1, 3, 0, 0, 0),
            ),
        ]
    )
    db.commit()


def test_list_contents_by_category_filters_and_sorts_desc():
    db = make_session()
    seed_contents(db)

    rows = list_contents_by_category(db, category_ids=[10], limit=50, offset=0)
    assert [r.id for r in rows] == [2, 1]  # created_at desc


def test_list_contents_by_category_limit_offset():
    db = make_session()
    seed_contents(db)

    rows = list_contents_by_category(db, category_ids=[10], limit=1, offset=0)
    assert [r.id for r in rows] == [2]

    rows = list_contents_by_category(db, category_ids=[10], limit=1, offset=1)
    assert [r.id for r in rows] == [1]
