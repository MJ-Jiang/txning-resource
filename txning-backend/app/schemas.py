from __future__ import annotations

from datetime import date, datetime
from typing import Optional, List, Literal

from pydantic import BaseModel, Field, ConfigDict


class ContentCardOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    category_id: Optional[int] = None
    title: Optional[str] = None
    cover_url: Optional[str] = None

    link_type: Literal["detail", "external"] = "detail"
    link_url: Optional[str] = None

    release_year: Optional[int] = None
    status_id: Optional[int] = None
    type_id: Optional[int] = None



    # ---- 新字段：用于频道页筛选的“全量”多值字段（核心）----
    platform_ids: List[int] = Field(default_factory=list)
    city_ids: List[int] = Field(default_factory=list)

    # genre 本来就是多值 id，直接用于筛选
    genre_ids: List[int] = Field(default_factory=list)

    role: Optional[str] = None
    location: Optional[str] = None
    time_text: Optional[str] = None
    event_date: Optional[date] = None

    ugc_platform_id: Optional[int] = None
    related_ids: List[int] = Field(default_factory=list)

    created_at: Optional[datetime] = None
    href: Optional[str] = None


class DictItem(BaseModel):
    id: int
    code: Optional[str] = None
    name_zh: Optional[str] = None


class PlatformLink(BaseModel):
    platform: DictItem
    url: Optional[str] = None


class RatingInfo(BaseModel):
    source: Literal["douban"] = "douban"
    value: Optional[float] = None
    url: Optional[str] = None


class ContentDetailContent(BaseModel):
    id: int
    category_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    cover_url: Optional[str] = None

    release_year: Optional[int] = None
    episode_count: Optional[int] = None

    type_id: Optional[int] = None
    status_id: Optional[int] = None
    role: Optional[str] = None

    location: Optional[str] = None
    event_date: Optional[date] = None
    time_text: Optional[str] = None
    date_granularity: Optional[str] = None

    href: Optional[str] = None
    created_at: Optional[datetime] = None


class ContentDetailOut(BaseModel):
    content: ContentDetailContent
    rating: RatingInfo = Field(default_factory=RatingInfo)

    genres: List[DictItem] = Field(default_factory=list)
    cities: List[DictItem] = Field(default_factory=list)
    platforms: List[PlatformLink] = Field(default_factory=list)
    booking_platforms: List[PlatformLink] = Field(default_factory=list)
