from datetime import datetime, timedelta, timezone
def normalize_deadline(deadline):
    """
    Convert all deadlines to timezone-aware UTC datetimes
    so Python can safely compare them.
    """

    if deadline is None:
        return datetime.max.replace(tzinfo=timezone.utc)

    if deadline.tzinfo is None:
        return deadline.replace(tzinfo=timezone.utc)

    return deadline.astimezone(timezone.utc)


class PlannerAgent:

    WORK_START_HOUR = 9
    WORK_END_HOUR = 18

    BREAK_MINUTES = 15
    LUNCH_MINUTES = 60

    DEFAULT_TASK_TIME = 30
    MAX_FOCUS_BLOCK = 90

    @staticmethod
    def prepare(tasks):

        pending = [
            task
            for task in tasks
            if task.status == "Pending"
        ]

        priority_order = {
            "High": 0,
            "Medium": 1,
            "Low": 2,
        }

        pending.sort(
            key=lambda task: (
                priority_order.get(task.priority, 3),
                normalize_deadline(task.deadline),
            )
        )

        current = datetime.now().replace(
            hour=PlannerAgent.WORK_START_HOUR,
            minute=0,
            second=0,
            microsecond=0,
        )

        schedule = []

        estimated_total = 0
        completed_today = []
        tomorrow = []

        lunch_taken = False

        for task in pending:

            remaining = task.estimated_time or PlannerAgent.DEFAULT_TASK_TIME

            estimated_total += remaining

            while remaining > 0:

                if current.hour >= PlannerAgent.WORK_END_HOUR:
                    tomorrow.append(task)
                    break

                if (
                    current.hour >= 13
                    and not lunch_taken
                ):

                    lunch_start = current

                    current += timedelta(
                        minutes=PlannerAgent.LUNCH_MINUTES
                    )

                    schedule.append({
                        "type": "lunch",
                        "title": "🍽 Lunch",
                        "start": lunch_start.strftime("%H:%M"),
                        "end": current.strftime("%H:%M"),
                        "duration": PlannerAgent.LUNCH_MINUTES,
                    })

                    lunch_taken = True

                focus = min(
                    remaining,
                    PlannerAgent.MAX_FOCUS_BLOCK,
                )

                start = current

                current += timedelta(
                    minutes=focus
                )

                schedule.append({

                    "type": "task",

                    "title": task.title,

                    "priority": task.priority,

                    "start": start.strftime("%H:%M"),

                    "end": current.strftime("%H:%M"),

                    "duration": focus,

                })

                remaining -= focus

                if remaining > 0:

                    break_start = current

                    current += timedelta(
                        minutes=PlannerAgent.BREAK_MINUTES
                    )

                    schedule.append({

                        "type": "break",

                        "title": "☕ Break",

                        "start": break_start.strftime("%H:%M"),

                        "end": current.strftime("%H:%M"),

                        "duration": PlannerAgent.BREAK_MINUTES,

                    })

            else:
                completed_today.append(task)

        workload = "Balanced"

        if estimated_total > 420:
            workload = "Heavy"

        elif estimated_total < 120:
            workload = "Light"

        return {

            "tasks": pending,

            "today_tasks": completed_today,

            "tomorrow_tasks": tomorrow,

            "estimated_minutes": estimated_total,

            "workload": len(pending),

            "day_status": workload,

            "schedule": schedule,

        }