from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.db import get_db
from app.schemas import ContentCardOut
from models import Content

router = APIRouter(prefix="/channels", tags=["channels"])


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

    def to_card(r: Content) -> ContentCardOut:
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
            role=r.role,
            location=r.location,
            time_text=r.time_text,
            event_date=r.event_date,
            ugc_platform_id=r.ugc_platform_id,
            created_at=r.created_at,
            href=r.href,
            genre_ids=[],
            related_ids=[],
        )

    return {
        "category_id": category_id,
        "total": total,
        "limit": limit,
        "offset": offset,
        "items": [to_card(r).model_dump() for r in rows],
    }
