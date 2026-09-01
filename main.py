from fastapi import FastAPI
from config import settings

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

@app.get("/")
async def root():
    return {"status": "online", "system": settings.PROJECT_NAME, "version": settings.VERSION}
