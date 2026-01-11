from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.services.content_card import (
    _has_any_url,
    _normalize_url,
    bulk_card_fields,
    content_to_card,
)
from models import (
    Base,
    City,
    Content,
    ContentCity,
    ContentGenre,
    ContentPlatform,
    ContentRelation,
    Genre,
    Platform,
)


def make_session():
    engine = create_engine("sqlite+pysqlite:///:memory:", future=True)
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)
    return SessionLocal()


def seed_basic_dicts(db):
    db.add_all(
        [
            Platform(id=1, code="p1", name_zh="P1"),
            Platform(id=2, code="p2", name_zh="P2"),
            City(id=10, code="c10", name_zh="C10"),
            City(id=11, code="c11", name_zh="C11"),
            Genre(id=20, code="g20", name_zh="G20"),
            Genre(id=21, code="g21", name_zh="G21"),
        ]
    )
    db.commit()


def test_normalize_url_rules():
    assert _normalize_url(None) == ""
    assert _normalize_url("") == ""
    assert _normalize_url("   ") == ""
    assert _normalize_url("http://example.com") == "http://example.com"
    assert _normalize_url("https://example.com") == "https://example.com"
    assert _normalize_url("//example.com/a") == "https://example.com/a"
    assert _normalize_url("www.example.com") == "https://www.example.com"
    assert _normalize_url("example.com/path") == "https://example.com/path"
    assert _normalize_url("  example.com  ") == "https://example.com"


def test_has_any_url():
    assert _has_any_url(None) is False
    assert _has_any_url("") is False
    assert _has_any_url("   ") is False
    assert _has_any_url("example.com") is True


def test_bulk_card_fields_empty_ids_returns_empty_maps():
    db = make_session()
    platform_ids_map, city_ids_map, genre_ids_map, related_ids_map = bulk_card_fields(db, [])
    assert dict(platform_ids_map) == {}
    assert dict(city_ids_map) == {}
    assert dict(genre_ids_map) == {}
    assert dict(related_ids_map) == {}


def test_bulk_card_fields_collects_and_sorts():
    """
    这里不再插入重复的 (content_id, platform_id) 行（数据库不允许），
    而是用“乱序插入”来验证 bulk_card_fields 最终会 sorted。
    """
    db = make_session()
    seed_basic_dicts(db)

    c1 = Content(
        id=1,
        title_zh="A",
        category_id=1,
        created_at=datetime(2024, 1, 1, 0, 0, 0),
        ugc_url=None,
    )
    c2 = Content(
        id=2,
        title_zh="B",
        category_id=1,
        created_at=datetime(2024, 1, 2, 0, 0, 0),
        ugc_url="www.example.com/x",
    )
    db.add_all([c1, c2])
    db.commit()

    # 乱序插入：platform 先 2 再 1，city 先 11 再 10，genre 先 21 再 20
    db.add_all(
        [
            ContentPlatform(content_id=1, platform_id=2, url=None),
            ContentPlatform(content_id=1, platform_id=1, url=None),
            ContentCity(content_id=1, city_id=11),
            ContentCity(content_id=1, city_id=10),
            ContentGenre(content_id=1, genre_id=21),
            ContentGenre(content_id=1, genre_id=20),
            ContentRelation(source_content_id=1, target_content_id=2),
        ]
    )
    db.commit()

    platform_ids_map, city_ids_map, genre_ids_map, related_ids_map = bulk_card_fields(db, [1, 2])

    # bulk_card_fields 会 sorted(set(xs))，所以输出应为升序且去重（去重这里主要是逻辑保证）
    assert platform_ids_map[1] == [1, 2]
    assert city_ids_map[1] == [10, 11]
    assert genre_ids_map[1] == [20, 21]
    assert related_ids_map[1] == [2]

    # c2 没有任何关系：map 里不会有 key=2（content_to_card 会用 .get(..., []) 兜底）
    assert platform_ids_map.get(2) is None
    assert city_ids_map.get(2) is None
    assert genre_ids_map.get(2) is None
    assert related_ids_map.get(2) is None


def test_content_to_card_link_type_and_maps():
    db = make_session()
    seed_basic_dicts(db)

    c = Content(
        id=3,
        title_zh="C",
        category_id=9,
        poster_url="https://img",
        created_at=datetime(2024, 1, 3, 0, 0, 0),
        ugc_url="www.example.com/x",
        release_year=2024,
        status_id=2,
        type_id=3,
        role="role",
        location="loc",
        time_text="time",
        event_date=None,
        ugc_platform_id=None,
        href="https://detail/3",
        is_featured=False,
        ugc_type=None,
    )
    db.add(c)
    db.commit()

    db.add_all(
        [
            ContentPlatform(content_id=3, platform_id=2, url=None),
            ContentCity(content_id=3, city_id=10),
            ContentGenre(content_id=3, genre_id=20),
        ]
    )
    db.commit()

    platform_ids_map, city_ids_map, genre_ids_map, related_ids_map = bulk_card_fields(db, [3])

    card = content_to_card(c, platform_ids_map, city_ids_map, genre_ids_map, related_ids_map)

    assert card.id == 3
    assert card.link_type == "external"
    assert card.link_url == "https://www.example.com/x"
    assert card.platform_ids == [2]
    assert card.city_ids == [10]
    assert card.genre_ids == [20]
    assert card.related_ids == []


def test_content_to_card_detail_when_no_url():
    c = Content(id=4, title_zh="D", category_id=1, ugc_url="   ")
    card = content_to_card(c, {}, {}, {}, {})
    assert card.link_type == "detail"
    assert card.link_url is None
