from fastapi import APIRouter, Depends
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas import ContentCardOut
from models import Content

router = APIRouter(tags=["home"])


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


def pick(
    db: Session,
    *,
    category_ids: list[int],
    limit: int,
):
    q = (
        db.query(Content)
        .filter(Content.category_id.in_(category_ids))
        .order_by(desc(Content.is_featured), desc(Content.id))
        .limit(limit)
    )
    return [to_card(r).model_dump() for r in q.all()]


@router.get("/home")
def home(db: Session = Depends(get_db)):
    return {
        "banners": pick(db, category_ids=[6], limit=3),
        "featured_drama": pick(db, category_ids=[1], limit=6),
        "featured_endorsement": pick(db, category_ids=[2], limit=4),
        "featured_event": pick(db, category_ids=[3], limit=4),
        "featured_media": pick(db, category_ids=[4, 5], limit=6),
        "about": pick(db, category_ids=[7], limit=1),
    }
