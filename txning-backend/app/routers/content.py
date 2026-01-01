from __future__ import annotations

from collections import defaultdict
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud import list_contents_by_category
from app.db import get_db
from app.schemas import ContentCardOut
from app.schemas import (
    ContentDetailContent,
    ContentDetailOut,
    PlatformLink,
    RatingInfo,
)
from models import (
    BookingPlatform,
    City,
    Content,
    ContentBookingPlatform,
    ContentCity,
    ContentGenre,
    ContentPlatform,
    ContentRelation,
    Genre,
    Platform,
)

router = APIRouter(prefix="/contents", tags=["contents"])


def _bulk_card_fields(db: Session, content_ids: list[int]):
    """
    批量补齐 Card 的筛选字段（避免 N+1）：
    - platform_ids: ContentPlatform
    - city_ids: ContentCity
    - genre_ids: ContentGenre
    - related_ids: ContentRelation
    """
    platform_ids_map: dict[int, list[int]] = defaultdict(list)
    city_ids_map: dict[int, list[int]] = defaultdict(list)
    genre_ids_map: dict[int, list[int]] = defaultdict(list)
    related_ids_map: dict[int, list[int]] = defaultdict(list)

    if not content_ids:
        return platform_ids_map, city_ids_map, genre_ids_map, related_ids_map

    # --- platforms ---
    cp_rows = db.execute(
        select(ContentPlatform.content_id, ContentPlatform.platform_id).where(
            ContentPlatform.content_id.in_(content_ids)
        )
    ).all()
    for content_id, platform_id in cp_rows:
        platform_ids_map[content_id].append(platform_id)

    # --- cities ---
    cc_rows = db.execute(
        select(ContentCity.content_id, ContentCity.city_id).where(
            ContentCity.content_id.in_(content_ids)
        )
    ).all()
    for content_id, city_id in cc_rows:
        city_ids_map[content_id].append(city_id)

    # --- genres ---
    cg_rows = db.execute(
        select(ContentGenre.content_id, ContentGenre.genre_id).where(
            ContentGenre.content_id.in_(content_ids)
        )
    ).all()
    for content_id, genre_id in cg_rows:
        genre_ids_map[content_id].append(genre_id)

    # --- related ids ---
    rel_rows = db.execute(
        select(ContentRelation.source_content_id, ContentRelation.target_content_id).where(
            ContentRelation.source_content_id.in_(content_ids)
        )
    ).all()
    for source_id, target_id in rel_rows:
        related_ids_map[source_id].append(target_id)

    # 去重 + 稳定排序（保证前端缓存/对比更稳定）
    def _uniq_sorted(xs: list[int]) -> list[int]:
        return sorted(set(xs))

    for cid in list(platform_ids_map.keys()):
        platform_ids_map[cid] = _uniq_sorted(platform_ids_map[cid])
    for cid in list(city_ids_map.keys()):
        city_ids_map[cid] = _uniq_sorted(city_ids_map[cid])
    for cid in list(genre_ids_map.keys()):
        genre_ids_map[cid] = _uniq_sorted(genre_ids_map[cid])
    for cid in list(related_ids_map.keys()):
        related_ids_map[cid] = _uniq_sorted(related_ids_map[cid])

    return platform_ids_map, city_ids_map, genre_ids_map, related_ids_map


@router.get("", response_model=list[ContentCardOut])
def list_contents(
    category: List[int] = Query(..., description="可重复传：?category=4&category=5"),
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    rows = list_contents_by_category(
        db=db,
        category_ids=category,
        limit=limit,
        offset=offset,
    )

    content_ids = [r.id for r in rows]
    platform_ids_map, city_ids_map, genre_ids_map, related_ids_map = _bulk_card_fields(
        db, content_ids
    )

    def to_card(r: Content) -> ContentCardOut:
        is_ugc = (r.category_id in (4, 5)) or (r.ugc_url is not None)

        platform_ids = platform_ids_map.get(r.id, [])
        city_ids = city_ids_map.get(r.id, [])

        return ContentCardOut(
            id=r.id,
            category_id=r.category_id,
            title=r.title_zh,
            cover_url=r.poster_url,
            link_type="external" if is_ugc else "detail",
            link_url=r.ugc_url if is_ugc else None,
            release_year=r.release_year,
            status_id=r.status_id,
            type_id=r.type_id,
            # 兼容旧前端：仍提供单值（无法表达“多个”）
            platform_id=platform_ids[0] if platform_ids else None,
            city_id=city_ids[0] if city_ids else None,
            # 新字段：全量用于筛选
            platform_ids=platform_ids,
            city_ids=city_ids,
            genre_ids=genre_ids_map.get(r.id, []),
            role=r.role,
            location=r.location,
            time_text=r.time_text,
            event_date=r.event_date,
            ugc_platform_id=r.ugc_platform_id,
            related_ids=related_ids_map.get(r.id, []),
            created_at=r.created_at,
            href=r.href,
        )

    return [to_card(r) for r in rows]


@router.get("/{content_id}", response_model=ContentDetailOut)
def get_content_detail(content_id: int, db: Session = Depends(get_db)):
    r = db.query(Content).filter(Content.id == content_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Content not found")

    rating_value = float(r.rating_value) if r.rating_value is not None else None

    # --- genres ---
    genre_rows = (
        db.execute(
            select(Genre)
            .join(ContentGenre, ContentGenre.genre_id == Genre.id)
            .where(ContentGenre.content_id == content_id)
        )
        .scalars()
        .all()
    )
    genres = [{"id": g.id, "name_zh": g.name_zh} for g in genre_rows]

    # --- cities ---
    city_rows = (
        db.execute(
            select(City)
            .join(ContentCity, ContentCity.city_id == City.id)
            .where(ContentCity.content_id == content_id)
        )
        .scalars()
        .all()
    )
    cities = [{"id": c.id, "name_zh": c.name_zh} for c in city_rows]

    # --- platforms ---
    platform_rows = (
        db.execute(
            select(Platform)
            .join(ContentPlatform, ContentPlatform.platform_id == Platform.id)
            .where(ContentPlatform.content_id == content_id)
        )
        .scalars()
        .all()
    )
    platforms = [
        PlatformLink(
            platform={"id": p.id, "code": p.code, "name_zh": p.name_zh},
            url=None,
        )
        for p in platform_rows
    ]

    # --- booking_platforms ---
    booking_rows = (
        db.execute(
            select(ContentBookingPlatform, BookingPlatform)
            .join(
                BookingPlatform,
                ContentBookingPlatform.booking_platform_id == BookingPlatform.id,
            )
            .where(ContentBookingPlatform.content_id == content_id)
        )
        .all()
    )
    booking_platforms = [
        PlatformLink(
            platform={"id": bp.id, "code": bp.code, "name_zh": bp.name_zh},
            url=cbp.url,
        )
        for (cbp, bp) in booking_rows
    ]

    return ContentDetailOut(
        content=ContentDetailContent(
            id=r.id,
            category_id=r.category_id,
            title=r.title_zh,
            description=r.description_zh,
            cover_url=r.poster_url,
            release_year=r.release_year,
            episode_count=r.episode_count,
            type_id=r.type_id,
            status_id=r.status_id,
            role=r.role,
            location=r.location,
            event_date=r.event_date,
            time_text=r.time_text,
            date_granularity=r.date_granularity,
            href=r.href,
            created_at=r.created_at,
        ),
        rating=RatingInfo(source="douban", value=rating_value, url=r.rating_url),
        genres=genres,
        platforms=platforms,
        booking_platforms=booking_platforms,
        cities=cities,
    )


@router.get("/{content_id}/related")
def list_related_contents(
    content_id: int,
    title: Optional[str] = Query(None),
    release_year: Optional[int] = Query(None),
    type_id: Optional[int] = Query(None),
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    # 1. 确认内容存在
    exists = db.query(Content.id).filter(Content.id == content_id).first()
    if not exists:
        raise HTTPException(status_code=404, detail="Content not found")

    # 2. 从 relation 表取 target ids
    rel_rows = (
        db.query(ContentRelation.target_content_id)
        .filter(ContentRelation.source_content_id == content_id)
        .all()
    )
    target_ids = [r[0] for r in rel_rows]

    if not target_ids:
        return {
            "content_id": content_id,
            "total": 0,
            "limit": limit,
            "offset": offset,
            "items": [],
        }

    # 3. 查 contents
    q = db.query(Content).filter(Content.id.in_(target_ids))

    if title:
        q = q.filter(Content.title_zh.ilike(f"%{title}%"))
    if release_year is not None:
        q = q.filter(Content.release_year == release_year)
    if type_id is not None:
        q = q.filter(Content.type_id == type_id)

    total = q.count()
    rows = q.order_by(Content.id.desc()).offset(offset).limit(limit).all()

    row_ids = [c.id for c in rows]
    platform_ids_map, city_ids_map, genre_ids_map, related_ids_map = _bulk_card_fields(
        db, row_ids
    )

    def to_card(c: Content) -> ContentCardOut:
        is_ugc = (c.category_id in (4, 5)) or (c.ugc_url is not None)

        platform_ids = platform_ids_map.get(c.id, [])
        city_ids = city_ids_map.get(c.id, [])

        return ContentCardOut(
            id=c.id,
            category_id=c.category_id,
            title=c.title_zh,
            cover_url=c.poster_url,
            link_type="external" if is_ugc else "detail",
            link_url=c.ugc_url if is_ugc else None,
            release_year=c.release_year,
            status_id=c.status_id,
            type_id=c.type_id,
            # 兼容旧前端（单值）
            platform_id=platform_ids[0] if platform_ids else None,
            city_id=city_ids[0] if city_ids else None,
            # 新字段（全量）
            platform_ids=platform_ids,
            city_ids=city_ids,
            genre_ids=genre_ids_map.get(c.id, []),
            role=c.role,
            location=c.location,
            time_text=c.time_text,
            event_date=c.event_date,
            ugc_platform_id=c.ugc_platform_id,
            related_ids=related_ids_map.get(c.id, []),
            created_at=c.created_at,
            href=c.href,
        )

    return {
        "content_id": content_id,
        "total": total,
        "limit": limit,
        "offset": offset,
        "items": [to_card(c).model_dump() for c in rows],
    }
