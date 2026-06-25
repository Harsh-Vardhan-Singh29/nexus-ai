from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_tasks: int
    pending_tasks: int
    completed_tasks: int
    high_priority: int
    overdue_tasks: int