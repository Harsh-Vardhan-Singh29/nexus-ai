from fastapi import APIRouter
from app.api.v1.endpoints import analytics
from app.api.v1.endpoints import task
from app.api.v1.endpoints import dashboard
from app.api.v1.endpoints import ai
from app.api.v1.endpoints import planner

api_router = APIRouter()

api_router.include_router(
    task.router,
    prefix="/tasks",
    tags=["Tasks"],
)

api_router.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"],
)

api_router.include_router(
    ai.router,
    prefix="/ai",
    tags=["AI"],
)

api_router.include_router(
    planner.router,
    prefix="/planner",
    tags=["Planner"],
)

api_router.include_router(
    analytics.router,
    prefix="/analytics",
    tags=["Analytics"],
)