from fastapi import APIRouter, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import Depends
from app.db import get_db
from app.crud import list_contents_by_category

router = APIRouter(prefix="/contents", tags=["contents"])

@router.get("")
def list_contents(
    category: List[int] = Query(..., description="可重复传：?category=4&category=5"),
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    return list_contents_by_category(
        db=db,
        category_ids=category,
        limit=limit,
        offset=offset,
    )


