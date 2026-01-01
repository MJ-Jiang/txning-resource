from __future__ import annotations
from datetime import date, datetime
from typing import Optional, List, Literal
from pydantic import BaseModel


class ContentCardOut(BaseModel):
    # core
    id: int
    category_id: Optional[int] = None
    title: Optional[str] = None
    cover_url: Optional[str] = None

    # click behavior
    link_type: Literal["detail", "external"] = "detail"
    link_url: Optional[str] = None

    # filters / display (optional by category)
    release_year: Optional[int] = None
    status_id: Optional[int] = None
    type_id: Optional[int] = None
    platform_id: Optional[int] = None

    genre_ids: List[int] = []
    role: Optional[str] = None

    city_id: Optional[int] = None
    location: Optional[str] = None
    time_text: Optional[str] = None
    event_date: Optional[date] = None

    ugc_platform_id: Optional[int] = None
    related_ids: List[int] = []

    created_at: Optional[datetime] = None
    href: Optional[str] = None  # 

    class Config:
        from_attributes = True
