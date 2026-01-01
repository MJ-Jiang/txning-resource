from fastapi import FastAPI
from app.routers import content
from app.routers import dict as dict_router
from app.routers import channel


app = FastAPI()

app.include_router(content.router)
app.include_router(dict_router.router)
app.include_router(channel.router)
@app.get("/health")
def health():
    return {"ok": True}
