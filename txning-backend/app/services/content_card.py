from __future__ import annotations

from collections import defaultdict
from typing import DefaultDict, Iterable

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.schemas import ContentCardOut
from models import (
    Content,
    ContentCity,
    ContentGenre,
    ContentPlatform,
    ContentRelation,
)


def bulk_card_fields(db: Session, content_ids: Iterable[int]):
    """
    批量补齐 Card 的筛选字段（避免 N+1）：
    - platform_ids: ContentPlatform
    - city_ids: ContentCity
    - genre_ids: ContentGenre
    - related_ids: ContentRelation (source -> target)
    """
    ids = list(content_ids)

    platform_ids_map: DefaultDict[int, list[int]] = defaultdict(list)
    city_ids_map: DefaultDict[int, list[int]] = defaultdict(list)
    genre_ids_map: DefaultDict[int, list[int]] = defaultdict(list)
    related_ids_map: DefaultDict[int, list[int]] = defaultdict(list)

    if not ids:
        return platform_ids_map, city_ids_map, genre_ids_map, related_ids_map

    # --- platforms ---
    cp_rows = db.execute(
        select(ContentPlatform.content_id, ContentPlatform.platform_id).where(
            ContentPlatform.content_id.in_(ids)
        )
    ).all()
    for content_id, platform_id in cp_rows:
        platform_ids_map[content_id].append(platform_id)

    # --- cities ---
    cc_rows = db.execute(
        select(ContentCity.content_id, ContentCity.city_id).where(
            ContentCity.content_id.in_(ids)
        )
    ).all()
    for content_id, city_id in cc_rows:
        city_ids_map[content_id].append(city_id)

    # --- genres ---
    cg_rows = db.execute(
        select(ContentGenre.content_id, ContentGenre.genre_id).where(
            ContentGenre.content_id.in_(ids)
        )
    ).all()
    for content_id, genre_id in cg_rows:
        genre_ids_map[content_id].append(genre_id)

    # --- related ids ---
    rel_rows = db.execute(
        select(ContentRelation.source_content_id, ContentRelation.target_content_id).where(
            ContentRelation.source_content_id.in_(ids)
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


def content_to_card(
    r: Content,
    platform_ids_map,
    city_ids_map,
    genre_ids_map,
    related_ids_map,
) -> ContentCardOut:
    """
    统一卡片拼装（channels / contents / related 全复用）
    """
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
        platform_ids=platform_ids_map.get(r.id, []),
        city_ids=city_ids_map.get(r.id, []),
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
