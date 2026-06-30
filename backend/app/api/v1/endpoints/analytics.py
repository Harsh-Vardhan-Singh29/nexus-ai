from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.analytics import AnalyticsResponse
from app.services.analytics_service import AnalyticsService

router = APIRouter(
    prefix="",
    tags=["Analytics"],
)


@router.get(
    "/",
    response_model=AnalyticsResponse,
    summary="Get Productivity Analytics",
    description=(
        "Returns AI-powered productivity analytics, "
        "weekly trends, streaks, insights and recommendations."
    ),
)
def get_analytics(
    db: Session = Depends(get_db),
) -> AnalyticsResponse:

    analytics = AnalyticsService.get_analytics(db)

    return AnalyticsResponse.model_validate(analytics)