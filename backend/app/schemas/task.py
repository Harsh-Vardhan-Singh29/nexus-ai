from datetime import datetime
from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str = "Medium"
    deadline: datetime | None = None
    estimated_time: int | None = None


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    priority: str | None = None
    status: str | None = None
    deadline: datetime | None = None
    estimated_time: int | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    priority: str
    status: str

    class Config:
        from_attributes = True