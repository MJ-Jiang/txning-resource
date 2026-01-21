import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import content
from app.routers import dict as dict_router
from app.routers import channel
from app.routers import home
from fastapi import Response
from app.middleware.rate_limit import RateLimitMiddleware

app = FastAPI()

cors_origins = os.getenv("CORS_ORIGINS", "")
allow_origins = (
    [origin.strip() for origin in cors_origins.split(",") if origin.strip()]
    if cors_origins
    else []
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== Rate Limit（可通过 env 调整）=====
RATE_LIMIT_MAX = int(os.getenv("RATE_LIMIT_MAX", "120"))          # 每窗口最大请求数
RATE_LIMIT_WINDOW = int(os.getenv("RATE_LIMIT_WINDOW", "60"))     # 窗口秒数

app.add_middleware(
    RateLimitMiddleware,
    max_requests=RATE_LIMIT_MAX,
    window_seconds=RATE_LIMIT_WINDOW,
    scope_path_prefixes=("/",),         # 默认全站限流（包含所有 router）
    exclude_path_prefixes=("/health",), # health 不限流
)

# ===== 路由注册 =====
app.include_router(content.router)
app.include_router(dict_router.router)
app.include_router(channel.router)
app.include_router(home.router)

@app.get("/health")
def health():
    return {"ok": True}
@app.head("/health")
def health_head(response: Response):
    response.status_code = 200