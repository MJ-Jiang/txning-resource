from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from app.db import get_db
from models import Status, Type

router = APIRouter(prefix="/dict", tags=["dict"])

@router.get("/statuses")
def list_statuses(db: Session = Depends(get_db)):
    rows = db.query(Status).order_by(Status.id.asc()).all()
    return [{"id": r.id, "code": r.code, "name_zh": r.name_zh} for r in rows]

@router.get("/types")
def list_types(db: Session = Depends(get_db)):
    rows = db.query(Type).order_by(Type.id.asc()).all()
    return [{"id": r.id, "code": r.code, "name_zh": r.name_zh} for r in rows]
