from __future__ import annotations

from typing import Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session, aliased

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
from app.tests.conftest import db
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
        content_to_card(
            r, platform_ids_map, city_ids_map, genre_ids_map, related_ids_map
        )
        for r in rows
    ]

    return ContentCardPageOut(total=total, limit=limit, offset=offset, items=items)


# =========================================================
# ✅ A2 新接口：反向 related 映射
# GET /contents/related-from-map?target_category=...&source_category=...
# ⚠️ 一定要放在 /{content_id} 之前，避免路由被当成 content_id
# =========================================================
@router.get("/related-from-map", response_model=Dict[str, List[int]])
def get_related_from_map(
    # target：Gallery 里要显示的卡片分类（比如 ugc/personal 的 category_id）
    target_category: Optional[List[int]] = Query(
        None, description="目标内容分类 id，可重复：?target_category=10&target_category=11"
    ),
    # source：哪些分类算“相关来源”（比如 drama/event/endorsement 的 category_id）
    source_category: Optional[List[int]] = Query(
        None, description="来源内容分类 id，可重复：?source_category=1&source_category=2"
    ),
    db: Session = Depends(get_db),
):
    Source = aliased(Content)
    Target = aliased(Content)

    stmt = (
        select(ContentRelation.target_content_id, Source.category_id)
        .join(Source, Source.id == ContentRelation.source_content_id)
        .join(Target, Target.id == ContentRelation.target_content_id)
    )

    if source_category:
        stmt = stmt.where(Source.category_id.in_(source_category))

    if target_category:
        stmt = stmt.where(Target.category_id.in_(target_category))

    rows = db.execute(stmt).all()

    # 聚合成：{ "target_id": [source_category_id...] }
    out: Dict[str, List[int]] = {}
    for target_id, source_cat_id in rows:
        if target_id is None or source_cat_id is None:
            continue
        k = str(int(target_id))
        arr = out.setdefault(k, [])
        v = int(source_cat_id)
        if v not in arr:
            arr.append(v)

    # 排序（稳定输出，前端更好做 options）
    for k in out.keys():
        out[k].sort()

    return out


from app.services.content_card import _normalize_url, _has_any_url

@router.get("/{content_id}", response_model=ContentDetailOut)
def get_content_detail(content_id: int, db: Session = Depends(get_db)):
    r = db.query(Content).filter(Content.id == content_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Content not found")

    rating_value = float(r.rating_value) if r.rating_value is not None else None

    # ===== 关键新增：生成 link_url（与 card 逻辑一致）=====
    raw_ugc_url = r.ugc_url
    link_url = _normalize_url(raw_ugc_url) if _has_any_url(raw_ugc_url) else None

    # related_ids
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

    # --- platforms（最小修改版，已带 url） ---
    platform_rows = (
        db.execute(
            select(ContentPlatform, Platform)
            .join(Platform, ContentPlatform.platform_id == Platform.id)
            .where(ContentPlatform.content_id == content_id)
        )
        .all()
    )

    platforms = [
        PlatformLink(
            platform={
                "id": p.id,
                "code": p.code,
                "name_zh": p.name_zh,
            },
            url=cp.url,
        )
        for (cp, p) in platform_rows
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
            related_ids=related_ids,
            # ===== 关键新增：把 link_url 返回给前端 =====
            link_url=link_url,
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
    exists = db.query(Content.id).filter(Content.id == content_id).first()
    if not exists:
        raise HTTPException(status_code=404, detail="Content not found")

    rel_rows = (
        db.query(ContentRelation.target_content_id)
        .filter(ContentRelation.source_content_id == content_id)
        .all()
    )
    target_ids = [r[0] for r in rel_rows]

    if not target_ids:
        return ContentCardPageOut(total=0, limit=limit, offset=offset, items=[])

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
        content_to_card(
            c, platform_ids_map, city_ids_map, genre_ids_map, related_ids_map
        )
        for c in rows
    ]

    return ContentCardPageOut(total=total, limit=limit, offset=offset, items=items)
