# txning-backend/models.py
from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Boolean, Date, Integer, Numeric, Text, TIMESTAMP, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Content(Base):
    __tablename__ = "contents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    title_zh: Mapped[str | None] = mapped_column(Text, nullable=True)
    description_zh: Mapped[str | None] = mapped_column(Text, nullable=True)

    release_year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    category_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    type_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    status_id: Mapped[int | None] = mapped_column(Integer, nullable=True)

    poster_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    poster_alt_zh: Mapped[str | None] = mapped_column(Text, nullable=True)

    rating_value: Mapped[Decimal | None] = mapped_column(Numeric(3, 1), nullable=True)
    rating_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    episode_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    is_featured: Mapped[bool | None] = mapped_column(Boolean, nullable=True)

    created_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP, nullable=True, server_default=func.now()
    )
    created_by: Mapped[int | None] = mapped_column(Integer, nullable=True)

    href: Mapped[str | None] = mapped_column(Text, nullable=True)
    role: Mapped[str | None] = mapped_column(Text, nullable=True)

    event_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    date_granularity: Mapped[str | None] = mapped_column(Text, nullable=True)
    time_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    location: Mapped[str | None] = mapped_column(Text, nullable=True)

    ugc_type: Mapped[str | None] = mapped_column(Text, nullable=True)
    ugc_platform_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    ugc_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"Content(id={self.id}, title_zh={self.title_zh!r})"
from sqlalchemy import ForeignKey

class Type(Base):
    __tablename__ = "types"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str | None] = mapped_column(Text, nullable=True)
    name_zh: Mapped[str | None] = mapped_column(Text, nullable=True)


class Status(Base):
    __tablename__ = "statuses"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str | None] = mapped_column(Text, nullable=True)
    name_zh: Mapped[str | None] = mapped_column(Text, nullable=True)


class Category(Base):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str | None] = mapped_column(Text, nullable=True)
    name_zh: Mapped[str | None] = mapped_column(Text, nullable=True)


class Genre(Base):
    __tablename__ = "genres"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str | None] = mapped_column(Text, nullable=True)
    name_zh: Mapped[str | None] = mapped_column(Text, nullable=True)


class City(Base):
    __tablename__ = "cities"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str | None] = mapped_column(Text, nullable=True)
    name_zh: Mapped[str | None] = mapped_column(Text, nullable=True)


class Platform(Base):
    __tablename__ = "platforms"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str | None] = mapped_column(Text, nullable=True)
    name_zh: Mapped[str | None] = mapped_column(Text, nullable=True)


class BookingPlatform(Base):
    __tablename__ = "booking_platforms"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str | None] = mapped_column(Text, nullable=True)
    name_zh: Mapped[str | None] = mapped_column(Text, nullable=True)


class UGCPlatform(Base):
    __tablename__ = "ugc_platforms"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str | None] = mapped_column(Text, nullable=True)
    name_zh: Mapped[str | None] = mapped_column(Text, nullable=True)


# --- 关系表 ---

class ContentCity(Base):
    __tablename__ = "content_cities"
    content_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("contents.id", ondelete="CASCADE"), primary_key=True
    )
    city_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("cities.id", ondelete="CASCADE"), primary_key=True
    )


class ContentGenre(Base):
    __tablename__ = "content_genres"
    content_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("contents.id", ondelete="CASCADE"), primary_key=True
    )
    genre_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("genres.id", ondelete="CASCADE"), primary_key=True
    )


class ContentPlatform(Base):
    __tablename__ = "content_platforms"
    content_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("contents.id", ondelete="CASCADE"), primary_key=True
    )
    platform_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("platforms.id", ondelete="CASCADE"), primary_key=True
    )
    url: Mapped[str | None] = mapped_column(Text, nullable=True)


class ContentBookingPlatform(Base):
    __tablename__ = "content_booking_platforms"
    content_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("contents.id", ondelete="CASCADE"), primary_key=True
    )
    booking_platform_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("booking_platforms.id", ondelete="CASCADE"), primary_key=True
    )
    url: Mapped[str | None] = mapped_column(Text, nullable=True)


class ContentRelation(Base):
    __tablename__ = "content_relations"
    source_content_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("contents.id", ondelete="CASCADE"), primary_key=True
    )
    target_content_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("contents.id", ondelete="CASCADE"), primary_key=True
    )
