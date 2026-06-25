from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class TaskService:

    @staticmethod
    def create_task(db: Session, task: TaskCreate):

        new_task = Task(
            title=task.title,
            description=task.description,
            priority=task.priority,
            deadline=task.deadline,
            estimated_time=task.estimated_time,
        )

        db.add(new_task)
        db.commit()
        db.refresh(new_task)

        return new_task

    @staticmethod
    def get_tasks(db: Session):

        return db.query(Task).all()

    @staticmethod
    def get_task(db: Session, task_id: int):

        return db.query(Task).filter(Task.id == task_id).first()

    @staticmethod
    def update_task(db: Session, task_id: int, task: TaskUpdate):

        db_task = db.query(Task).filter(Task.id == task_id).first()

        if not db_task:
            return None

        update_data = task.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_task, key, value)

        db.commit()
        db.refresh(db_task)

        return db_task

    @staticmethod
    def delete_task(db: Session, task_id: int):

        db_task = db.query(Task).filter(Task.id == task_id).first()

        if not db_task:
            return False

        db.delete(db_task)
        db.commit()

        return True