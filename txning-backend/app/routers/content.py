from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud import list_contents_by_category
from app.db import get_db
from app.schemas import (
    ContentCardPageOut,
    ContentDetailContent,
    ContentDetailOut,
    PlatformLink,
    RatingInfo,
)
from app.services.content_card import bulk_card_fields, content_to_card
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


@router.get("", response_model=ContentCardPageOut)
def list_contents(
    category: List[int] = Query(..., description="可重复传：?category=4&category=5"),
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    # 先算 total（与 channels 对齐：分页对象）
    total = db.query(Content.id).filter(Content.category_id.in_(category)).count()

    rows = list_contents_by_category(
        db=db,
        category_ids=category,
        limit=limit,
        offset=offset,
    )

    content_ids = [r.id for r in rows]
    platform_ids_map, city_ids_map, genre_ids_map, related_ids_map = bulk_card_fields(
        db, content_ids
    )

    items = [
        content_to_card(r, platform_ids_map, city_ids_map, genre_ids_map, related_ids_map)
        for r in rows
    ]

    return ContentCardPageOut(total=total, limit=limit, offset=offset, items=items)


@router.get("/{content_id}", response_model=ContentDetailOut)
def get_content_detail(content_id: int, db: Session = Depends(get_db)):
    r = db.query(Content).filter(Content.id == content_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Content not found")

    rating_value = float(r.rating_value) if r.rating_value is not None else None

    # ✅ NEW: related_ids（从 relation 表取 target ids）
    rel_rows = (
        db.query(ContentRelation.target_content_id)
        .filter(ContentRelation.source_content_id == content_id)
        .all()
    )
    related_ids = [row[0] for row in rel_rows]

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
            ugc_type=r.ugc_type,
            # ✅ NEW
            related_ids=related_ids,
        ),
        rating=RatingInfo(source="douban", value=rating_value, url=r.rating_url),
        genres=genres,
        platforms=platforms,
        booking_platforms=booking_platforms,
        cities=cities,
    )


@router.get("/{content_id}/related", response_model=ContentCardPageOut)
def list_related_contents(
    content_id: int,
    title: Optional[str] = Query(None),
    release_year: Optional[int] = Query(None),
    type_id: Optional[int] = Query(None),
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    # 1) 确认内容存在
    exists = db.query(Content.id).filter(Content.id == content_id).first()
    if not exists:
        raise HTTPException(status_code=404, detail="Content not found")

    # 2) 从 relation 表取 target ids
    rel_rows = (
        db.query(ContentRelation.target_content_id)
        .filter(ContentRelation.source_content_id == content_id)
        .all()
    )
    target_ids = [r[0] for r in rel_rows]

    if not target_ids:
        return ContentCardPageOut(total=0, limit=limit, offset=offset, items=[])

    # 3) 查 contents
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
    platform_ids_map, city_ids_map, genre_ids_map, related_ids_map = bulk_card_fields(
        db, row_ids
    )

    items = [
        content_to_card(c, platform_ids_map, city_ids_map, genre_ids_map, related_ids_map)
        for c in rows
    ]

    return ContentCardPageOut(total=total, limit=limit, offset=offset, items=items)
