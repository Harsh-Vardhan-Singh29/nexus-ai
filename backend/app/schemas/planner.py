from pydantic import BaseModel
from typing import List


class TimelineItem(BaseModel):
    time: str
    title: str
    type: str


class PlannerResponse(BaseModel):
    workload: int
    estimated_minutes: int
    day_status: str

    today_tasks: List[str]

    timeline: List[TimelineItem]

    insights: List[str]