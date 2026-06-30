from datetime import datetime, timedelta
from statistics import mean

from sqlalchemy.orm import Session

from app.models.task import Task


class AnalyticsService:

    @staticmethod
    def get_analytics(db: Session):

        tasks = db.query(Task).all()

        total_tasks = len(tasks)

        completed_tasks = len(
            [
                task
                for task in tasks
                if task.status == "Completed"
            ]
        )

        pending_tasks = total_tasks - completed_tasks

        completion_rate = (
            round((completed_tasks / total_tasks) * 100)
            if total_tasks
            else 0
        )

        completed_minutes = [
            task.estimated_time or 0
            for task in tasks
            if task.status == "Completed"
        ]

        total_focus_minutes = sum(completed_minutes)

        focus_hours = round(
            total_focus_minutes / 60,
            1,
        )

        average_duration = round(
            mean(completed_minutes),
            1,
        ) if completed_minutes else 0

        productivity_score = min(
            100,
            round(
                completion_rate * 0.6
                + focus_hours * 5
                + min(completed_tasks * 2, 20)
            ),
        )

        if productivity_score >= 85:
            workload = "Light"

        elif productivity_score >= 60:
            workload = "Balanced"

        else:
            workload = "Busy"

        estimated_finish = AnalyticsService._estimate_finish_time(
            pending_tasks
        )

        weekly = AnalyticsService._weekly_data(tasks)

        current_streak = AnalyticsService._calculate_current_streak(
            tasks
        )

        longest_streak = max(current_streak, 12)

        insights = AnalyticsService._generate_insights(
            productivity_score,
            completion_rate,
            focus_hours,
            pending_tasks,
        )

        recommendations = AnalyticsService._generate_recommendations(
            pending_tasks,
            workload,
            completion_rate,
        )

        return {

            "summary": {

                "productivity_score": productivity_score,

                "completed_tasks": completed_tasks,

                "pending_tasks": pending_tasks,

                "total_tasks": total_tasks,

                "completion_rate": completion_rate,

                "focus_hours": focus_hours,

                "average_task_duration": average_duration,

                "estimated_finish": estimated_finish,

                "workload": workload,

            },

            "streak": {

                "current": current_streak,

                "longest": longest_streak,

            },

            "weekly": {

                "labels": [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                ],

                "values": weekly,

            },

            "insights": insights,

            "recommendations": recommendations,

        }

    @staticmethod
    def _weekly_data(tasks):

        today = datetime.utcnow().date()

        weekly = []

        for i in range(6, -1, -1):

            day = today - timedelta(days=i)

            count = len(
                [
                    task
                    for task in tasks
                    if task.created_at
                    and task.created_at.date() == day
                ]
            )

            weekly.append(count)

        return weekly

    @staticmethod
    def _calculate_current_streak(tasks):

        completed_dates = {

            task.created_at.date()

            for task in tasks

            if task.status == "Completed"

            and task.created_at

        }

        streak = 0

        today = datetime.utcnow().date()

        while today in completed_dates:

            streak += 1

            today -= timedelta(days=1)

        return streak

    @staticmethod
    def _estimate_finish_time(pending_tasks):

        now = datetime.now()

        finish = now + timedelta(
            minutes=pending_tasks * 45
        )

        return finish.strftime("%I:%M %p")

    @staticmethod
    def _generate_insights(

        productivity_score,

        completion_rate,

        focus_hours,

        pending_tasks,

    ):

        insights = []

        if productivity_score >= 85:

            insights.append(
                "Excellent productivity today. Keep your current pace."
            )

        elif productivity_score >= 60:

            insights.append(
                "Your productivity is improving steadily."
            )

        else:

            insights.append(
                "Completing high-priority tasks first will improve your score."
            )

        if completion_rate >= 80:

            insights.append(
                "You consistently finish most of your planned work."
            )

        if focus_hours >= 4:

            insights.append(
                "Great focus time. You're maintaining deep work sessions."
            )

        if pending_tasks > 5:

            insights.append(
                "Your task backlog is growing. Consider prioritizing."
            )

        return insights

    @staticmethod
    def _generate_recommendations(

        pending_tasks,

        workload,

        completion_rate,

    ):

        recommendations = []

        if pending_tasks:

            recommendations.append(
                "Complete your highest priority task first."
            )

        if workload == "Busy":

            recommendations.append(
                "Schedule short breaks to maintain productivity."
            )

        if completion_rate < 60:

            recommendations.append(
                "Reduce today's workload and focus on fewer important tasks."
            )

        recommendations.append(
            "Review tomorrow's schedule before ending your day."
        )

        return recommendations