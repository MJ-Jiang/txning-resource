# │ 业务 / CRUD  层生成 SQL
from sqlalchemy.orm import Session
from typing import List
from models import Content  

def list_contents_by_category(
    db: Session,
    category_ids: List[int],
    limit: int = 50,
    offset: int = 0,
):
    return (
        db.query(Content)
        .filter(Content.category_id.in_(category_ids)) #WHERE category_id IN (4, 5, 8)
        .order_by(Content.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
