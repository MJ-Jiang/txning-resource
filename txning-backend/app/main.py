from fastapi import FastAPI
from app.routers import content

app = FastAPI()

app.include_router(content.router)

@app.get("/health")
def health():
    return {"ok": True}
