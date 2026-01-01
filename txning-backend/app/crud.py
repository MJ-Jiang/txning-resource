from __future__ import annotations

from typing import List
from sqlalchemy.orm import Session

from models import Content


def list_contents_by_category(
    db: Session,
    category_ids: List[int],
    limit: int = 50,
    offset: int = 0,
):
    return (
        db.query(Content)
        .filter(Content.category_id.in_(category_ids))  # WHERE category_id IN (...)
        .order_by(Content.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
