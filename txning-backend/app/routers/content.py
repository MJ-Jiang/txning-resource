from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List, Optional

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

    def to_card(r) -> ContentCardOut:
        # ugc（你定义：图频 category=4/5 没有详情页 → 外跳）
        is_ugc = (r.category_id in (4, 5)) or (r.ugc_url is not None)
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
            # platform_id 未来外键：目前 Content 里没字段 → 先不填
            platform_id=None,
            genre_ids=[],  # 未来关系表
            role=r.role,
            city_id=None,  # 未来外键/关系
            location=r.location,
            time_text=r.time_text,
            event_date=r.event_date,
            ugc_platform_id=r.ugc_platform_id,
            related_ids=[],  # 未来关系表
            created_at=r.created_at,
            href=r.href,  # 暂时保留兼容
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

    def to_card(c: Content) -> ContentCardOut:
        is_ugc = (c.category_id in (4, 5)) or (c.ugc_url is not None)
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
            role=c.role,
            city_id=None,
            location=c.location,
            time_text=c.time_text,
            event_date=c.event_date,
            ugc_platform_id=c.ugc_platform_id,
            created_at=c.created_at,
            href=c.href,
            genre_ids=[],
            related_ids=[],
        )

    return {
        "content_id": content_id,
        "total": total,
        "limit": limit,
        "offset": offset,
        "items": [to_card(c).model_dump() for c in rows],
    }
