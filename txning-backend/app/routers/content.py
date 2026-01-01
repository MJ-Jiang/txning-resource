from fastapi import APIRouter, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import Depends
from app.db import get_db
from app.crud import list_contents_by_category
from app.schemas import ContentCardOut

router = APIRouter(prefix="/contents", tags=["contents"])
# 所有接口统一以 /contents 开头

# 在接口文档（Swagger）里归类到 contents 这个分组 接口层接收（List[int]）翻译成 category_ids

# @router.get("")
# def list_contents(
#     category: List[int] = Query(..., description="可重复传：?category=4&category=5"), #接口层
#     limit: int = 50,
#     offset: int = 0,
#     db: Session = Depends(get_db),
# ):
    # return list_contents_by_category( #业务 / 数据访问层
    #     db=db,
    #     category_ids=category, #接口参数category，数据库层category_ids
    #     limit=limit,
    #     offset=offset,)
    # )这个接口本身不查数据库，只负责接收参数 + 转发

# FastAPI 接口定义，作用是：按分类 ID 列表分页查询内容数据。
# category        = HTTP 请求里的参数名
# category_ids    = 数据库查询里的条件名

@router.get("", response_model=list[ContentCardOut])
def list_contents(
    category: List[int] = Query(..., description="可重复传：?category=4&category=5"),
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    rows = list_contents_by_category(
        db=db,
        category_ids=category,
        limit=limit,
        offset=offset,
    )

    def to_card(r) -> ContentCardOut:
        # ugc（你定义：图频 category=4/5 没有详情页 → 外跳）
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
            # platform_id 未来外键：目前 Content 里没字段 → 先不填
            platform_id=None,

            genre_ids=[],        # 未来关系表
            role=r.role,

            city_id=None,        # 未来外键/关系
            location=r.location,
            time_text=r.time_text,
            event_date=r.event_date,

            ugc_platform_id=r.ugc_platform_id,
            related_ids=[],      # 未来关系表

            created_at=r.created_at,
            href=r.href,         # 暂时保留兼容
        )

    return [to_card(r) for r in rows]


