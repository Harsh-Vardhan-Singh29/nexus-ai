from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.planner import PlannerResponse
from app.services.planner_service import PlannerService

router = APIRouter()


@router.get(
    "/generate",
    response_model=PlannerResponse,
)
def generate_plan(
    db: Session = Depends(get_db),
):

    return PlannerService.generate_plan(db)