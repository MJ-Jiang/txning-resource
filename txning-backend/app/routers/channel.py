from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas import ContentCardPageOut
from app.services.content_card import bulk_card_fields, content_to_card
from models import Content  # ✅ 修正：原来误写为 Contenta

router = APIRouter(prefix="/channels", tags=["channels"])


@router.get("/{category_id}", response_model=ContentCardPageOut)
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
    platform_ids_map, city_ids_map, genre_ids_map, related_ids_map = bulk_card_fields(
        db, content_ids
    )

    items = [
        content_to_card(
            r,
            platform_ids_map,
            city_ids_map,
            genre_ids_map,
            related_ids_map,
        )
        for r in rows
    ]

    return ContentCardPageOut(
        total=total,
        limit=limit,
        offset=offset,
        items=items,
    )
