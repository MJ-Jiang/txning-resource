# 前端筛选面板的统一字典入口
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from models import BookingPlatform, City, Genre, Platform, Status, Type, Category,UGCPlatform

router = APIRouter(prefix="/dict", tags=["dict"])
@router.get("/categories")
def list_categories(db: Session = Depends(get_db)):
    rows = db.query(Category).order_by(Category.id.asc()).all()
    return [{"id": r.id, "code": r.code, "name_zh": r.name_zh} for r in rows]

@router.get("/statuses")
def list_statuses(db: Session = Depends(get_db)):
    rows = db.query(Status).order_by(Status.id.asc()).all()
    return [{"id": r.id, "code": r.code, "name_zh": r.name_zh} for r in rows]


@router.get("/types")
def list_types(db: Session = Depends(get_db)):
    rows = db.query(Type).order_by(Type.id.asc()).all()
    return [{"id": r.id, "code": r.code, "name_zh": r.name_zh} for r in rows]


@router.get("/genres")
def list_genres(db: Session = Depends(get_db)):
    rows = db.query(Genre).order_by(Genre.id.asc()).all()
    return [{"id": r.id, "code": getattr(r, "code", None), "name_zh": r.name_zh} for r in rows]


@router.get("/cities")
def list_cities(db: Session = Depends(get_db)):
    rows = db.query(City).order_by(City.id.asc()).all()
    return [{"id": r.id, "code": getattr(r, "code", None), "name_zh": r.name_zh} for r in rows]


@router.get("/platforms")
def list_platforms(db: Session = Depends(get_db)):
    rows = db.query(Platform).order_by(Platform.id.asc()).all()
    return [{"id": r.id, "code": r.code, "name_zh": r.name_zh} for r in rows]


@router.get("/booking-platforms")
def list_booking_platforms(db: Session = Depends(get_db)):
    rows = db.query(BookingPlatform).order_by(BookingPlatform.id.asc()).all()
    return [{"id": r.id, "code": r.code, "name_zh": r.name_zh} for r in rows]

@router.get("/ugc-platforms")
def list_ugc_platforms(db: Session = Depends(get_db)):
    rows = db.query(UGCPlatform).order_by(UGCPlatform.id.asc()).all()
    return [{"id": r.id, "code": r.code, "name_zh": r.name_zh} for r in rows]

@router.get("/all")
def get_all_dict(db=Depends(get_db)):
    return {
        "statuses": list_statuses(db),
        "types": list_types(db),
        "genres": list_genres(db),
        "platforms": list_platforms(db),
        "cities": list_cities(db),
        "categories": list_categories(db),
        "ugc_platforms": list_ugc_platforms(db),
        "booking_platforms": list_booking_platforms(db),
    }
