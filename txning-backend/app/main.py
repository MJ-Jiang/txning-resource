import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import content
from app.routers import dict as dict_router
from app.routers import channel
from app.routers import home

# 创建 FastAPI 实例
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



# ===== 路由注册 =====
app.include_router(content.router)
app.include_router(dict_router.router)
app.include_router(channel.router)
app.include_router(home.router)

# ===== 健康检查 =====
@app.get("/health")
def health():
    return {"ok": True}
