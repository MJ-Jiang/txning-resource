# 写一个 list_contents(db, categories, limit, offset) 的查询
from sqlalchemy.orm import Session
from typing import List
from models import Content  # 如果 models.py 在根目录，改成 import models 再用 models.Content

def list_contents_by_category(
    db: Session,
    category_ids: List[int],
    limit: int = 50,
    offset: int = 0,
):
    return (
        db.query(Content)
        .filter(Content.category_id.in_(category_ids))
        .order_by(Content.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
