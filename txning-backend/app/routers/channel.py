from collections import defaultdict
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas import ContentCardOut
from models import (
    Content,
    ContentCity,
    ContentGenre,
    ContentPlatform,
    ContentRelation,
)

router = APIRouter(prefix="/channels", tags=["channels"])


def _bulk_card_fields(db: Session, content_ids: list[int]):
    platform_ids_map = defaultdict(list)
    city_ids_map = defaultdict(list)
    genre_ids_map = defaultdict(list)
    related_ids_map = defaultdict(list)

    if not content_ids:
        return platform_ids_map, city_ids_map, genre_ids_map, related_ids_map

    cp_rows = db.execute(
        select(ContentPlatform.content_id, ContentPlatform.platform_id).where(
            ContentPlatform.content_id.in_(content_ids)
        )
    ).all()
    for content_id, platform_id in cp_rows:
        platform_ids_map[content_id].append(platform_id)

    cc_rows = db.execute(
        select(ContentCity.content_id, ContentCity.city_id).where(
            ContentCity.content_id.in_(content_ids)
        )
    ).all()
    for content_id, city_id in cc_rows:
        city_ids_map[content_id].append(city_id)

    cg_rows = db.execute(
        select(ContentGenre.content_id, ContentGenre.genre_id).where(
            ContentGenre.content_id.in_(content_ids)
        )
    ).all()
    for content_id, genre_id in cg_rows:
        genre_ids_map[content_id].append(genre_id)

    rel_rows = db.execute(
        select(ContentRelation.source_content_id, ContentRelation.target_content_id).where(
            ContentRelation.source_content_id.in_(content_ids)
        )
    ).all()
    for source_id, target_id in rel_rows:
        related_ids_map[source_id].append(target_id)

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


@router.get("/{category_id}")
def get_channel(
    category_id: int,
    title: Optional[str] = Query(None, description="模糊搜索标题"),
    release_year: Optional[int] = Query(None),
    status_id: Optional[int] = Query(None),
    type_id: Optional[int] = Query(None),
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    q = db.query(Content).filter(Content.category_id == category_id)

    if title:
        q = q.filter(Content.title_zh.ilike(f"%{title}%"))
    if release_year is not None:
        q = q.filter(Content.release_year == release_year)
    if status_id is not None:
        q = q.filter(Content.status_id == status_id)
    if type_id is not None:
        q = q.filter(Content.type_id == type_id)

    total = q.count()
    rows = q.order_by(Content.id.desc()).offset(offset).limit(limit).all()

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
            # 兼容旧字段（单值）
            platform_id=platform_ids[0] if platform_ids else None,
            city_id=city_ids[0] if city_ids else None,
            # 新字段（全量，用于筛选）
            platform_ids=platform_ids,
            city_ids=city_ids,
            genre_ids=genre_ids_map.get(r.id, []),
            related_ids=related_ids_map.get(r.id, []),
            role=r.role,
            location=r.location,
            time_text=r.time_text,
            event_date=r.event_date,
            ugc_platform_id=r.ugc_platform_id,
            created_at=r.created_at,
            href=r.href,
        )

    return {
        "category_id": category_id,
        "total": total,
        "limit": limit,
        "offset": offset,
        "items": [to_card(r).model_dump() for r in rows],
    }
