from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.dashboard import DashboardStats
from app.services.task_service import TaskService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/", response_model=DashboardStats)
def dashboard(
    db: Session = Depends(get_db)
):
    return TaskService.get_dashboard_stats(db)