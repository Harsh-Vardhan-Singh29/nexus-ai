from fastapi import FastAPI
from app.api.v1.router import api_router

app = FastAPI(
    title="NEXUS AI API",
    description="Backend API for NEXUS AI - AI Productivity Companion",
    version="1.0.0",
)

app.include_router(api_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to NEXUS AI 🚀",
        "status": "running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }