from typing import List

from pydantic import BaseModel


class SummaryMetrics(BaseModel):
    productivity_score: int
    completed_tasks: int
    pending_tasks: int
    total_tasks: int
    completion_rate: int
    focus_hours: float
    average_task_duration: float
    estimated_finish: str
    workload: str


class StreakMetrics(BaseModel):
    current: int
    longest: int


class WeeklyMetrics(BaseModel):
    labels: List[str]
    values: List[int]


class AnalyticsResponse(BaseModel):
    summary: SummaryMetrics

    streak: StreakMetrics

    weekly: WeeklyMetrics

    insights: List[str]

    recommendations: List[str]