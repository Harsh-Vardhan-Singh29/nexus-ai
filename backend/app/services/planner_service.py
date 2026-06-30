from datetime import datetime

from sqlalchemy.orm import Session

from app.models.task import Task


class PlannerService:

    @staticmethod
    def generate_plan(db: Session):

        tasks = (
            db.query(Task)
            .filter(Task.status != "Completed")
            .all()
        )

        priority_order = {
            "High": 50,
            "Medium": 30,
            "Low": 10,
        }

        def score(task):

            total = priority_order.get(task.priority, 0)

            if task.deadline:

                remaining = (
                    task.deadline.replace(tzinfo=None)
                    - datetime.now()
                ).days

                if remaining <= 0:
                    total += 40

                elif remaining <= 2:
                    total += 30

                elif remaining <= 5:
                    total += 20

            if task.estimated_time:

                if task.estimated_time <= 60:
                    total += 15

                elif task.estimated_time <= 120:
                    total += 10

            return total


        tasks.sort(
            key=score,
            reverse=True,
        )

        timeline = []

        insights = []

        start_hour = 9
        start_minute = 0

        total_minutes = 0

        today_tasks = []

        for task in tasks:

            hour = start_hour + start_minute // 60
            minute = start_minute % 60

            timeline.append({

                "time": f"{hour:02}:{minute:02}",

                "title": task.title,

                "type": "focus",

            })

            duration = task.estimated_time or 60

            total_minutes += duration

            today_tasks.append(task.title)

            start_minute += duration

            # Insert a break every 2 hours

            if start_minute >= 120:

                hour = start_hour + start_minute // 60
                minute = start_minute % 60

                timeline.append({

                    "time": f"{hour:02}:{minute:02}",

                    "title": "Break",

                    "type": "break",

                })

                start_minute += 15

        workload = min(len(tasks) * 10, 100)

        if workload >= 80:
            status = "Busy"
        elif workload >= 50:
            status = "Balanced"
        else:
            status = "Light"

        if tasks:

            insights.append(
                "Start with the highest-priority task while your energy is highest."
            )

            insights.append(
                "Take a 15-minute break after every two hours of focused work."
            )

            insights.append(
                "Complete difficult work before checking emails or messages."
            )

        else:

            insights.append(
                "You have no pending tasks today. Great job!"
            )

        return {

            "workload": workload,

            "estimated_minutes": total_minutes,

            "day_status": status,

            "today_tasks": today_tasks,

            "timeline": timeline,

            "insights": insights,

        }