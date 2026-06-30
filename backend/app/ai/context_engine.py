from datetime import datetime, timedelta
from typing import Any

from app.ai.decision_engine import decision_engine


class ContextEngine:

    def build(
        self,
        tasks: list[Any],
        stats: dict,
    ) -> dict:

        # ----------------------------------------------------
        # Decision Engine
        # ----------------------------------------------------

        ranked = decision_engine.rank_tasks(tasks)
        best = decision_engine.get_best_task(tasks)
        workload = decision_engine.workload(tasks)

        # ----------------------------------------------------
        # Task Statistics
        # ----------------------------------------------------

        pending_tasks = [
            task
            for task in tasks
            if not getattr(task, "completed", False)
        ]

        pending = len(pending_tasks)
        completed = len(tasks) - pending

        total_minutes = sum(
            getattr(task, "estimated_minutes", 30)
            for task in pending_tasks
        )

        estimated_finish = (
            datetime.now() +
            timedelta(minutes=total_minutes)
        ).strftime("%I:%M %p")

        # ----------------------------------------------------
        # Productivity Metrics
        # ----------------------------------------------------

        productivity = int(
            (
                completed /
                max(len(tasks), 1)
            )
            * 100
        )

        productivity = max(0, min(productivity, 100))

        daily_progress = round(
            (
                completed /
                max(len(tasks), 1)
            )
            * 100,
            1,
        )

        remaining_minutes = max(total_minutes, 0)

        # ----------------------------------------------------
        # Focus & Confidence
        # ----------------------------------------------------

        focus_score = max(
            50,
            100 - pending * 5,
        )

        success_probability = min(
            98,
            productivity + 20,
        )

        if best:

            priority = best["task"]

            priority_name = getattr(
                priority,
                "title",
                "Unknown",
            )

            priority_score = best["score"]

            confidence = decision_engine.confidence(
                priority_score
            )

        else:

            priority_name = "No Pending Tasks"

            priority_score = 0

            confidence = 100

        # ----------------------------------------------------
        # Risk Analysis
        # ----------------------------------------------------

        if pending <= 2:
            workload_risk = "Low"

        elif pending <= 5:
            workload_risk = "Medium"

        else:
            workload_risk = "High"

        if productivity >= 80:
            productivity_level = "Excellent"

        elif productivity >= 60:
            productivity_level = "Good"

        elif productivity >= 40:
            productivity_level = "Average"

        else:
            productivity_level = "Needs Improvement"

        if focus_score >= 90:
            energy_state = "High"

        elif focus_score >= 75:
            energy_state = "Normal"

        else:
            energy_state = "Low"

        momentum_score = min(
            100,
            focus_score + (completed * 5),
        )

        if pending >= 8:
            burnout_risk = "High"

        elif pending >= 4:
            burnout_risk = "Medium"

        else:
            burnout_risk = "Low"

        if remaining_minutes > 300:
            delay_risk = "High"

        elif remaining_minutes > 180:
            delay_risk = "Medium"

        else:
            delay_risk = "Low"

        completion_probability = min(
            98,
            productivity + 15,
        )

        recommended_break = (
            datetime.now() +
            timedelta(minutes=90)
        ).strftime("%I:%M %p")

        # ----------------------------------------------------
        # Next Best Task
        # ----------------------------------------------------

        next_best_task = None

        if len(ranked) > 1:

            next_best_task = getattr(
                ranked[1]["task"],
                "title",
                None,
            )

        # ----------------------------------------------------
        # Final Context
        # ----------------------------------------------------

        return {

            # Priority
            "priority_task": priority_name,
            "priority_score": priority_score,
            "confidence": confidence,

            # Task Overview
            "workload": workload,
            "pending": pending,
            "completed": completed,
            "ranking": ranked,

            # Time
            "estimated_finish": estimated_finish,
            "remaining_minutes": remaining_minutes,
            "recommended_break": recommended_break,

            # Productivity
            "productivity": productivity,
            "daily_progress": daily_progress,
            "productivity_level": productivity_level,
            "focus_score": focus_score,
            "momentum_score": momentum_score,
            "energy_state": energy_state,

            # Prediction
            "completion_probability": completion_probability,
            "success_probability": success_probability,

            # Risks
            "risk": workload_risk,
            "delay_risk": delay_risk,
            "burnout_risk": burnout_risk,

            # Suggestions
            "next_best_task": next_best_task,
        }


context_engine = ContextEngine()