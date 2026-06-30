from datetime import datetime
from typing import Any


class DecisionEngine:

    PRIORITY_WEIGHT = {
        "high": 100,
        "medium": 60,
        "low": 30,
    }

    def score_task(
        self,
        task: Any,
    ) -> int:

        score = 0

        priority = (
            getattr(task, "priority", "medium")
            .lower()
            .strip()
        )

        score += self.PRIORITY_WEIGHT.get(
            priority,
            50,
        )

        if not getattr(task, "completed", False):
            score += 40

        duration = getattr(
            task,
            "estimated_minutes",
            30,
        )

        if duration <= 30:
            score += 15

        elif duration <= 60:
            score += 10

        due = getattr(task, "due_date", None)

        if due:

            try:

                delta = (
                    due - datetime.utcnow()
                ).days

                if delta <= 0:
                    score += 60

                elif delta <= 1:
                    score += 40

                elif delta <= 3:
                    score += 20

            except Exception:
                pass

        return score

    def rank_tasks(
        self,
        tasks: list[Any],
    ) -> list[dict]:

        ranked = []

        for task in tasks:

            ranked.append(
                {
                    "task": task,
                    "score": self.score_task(task),
                }
            )

        ranked.sort(
            key=lambda x: x["score"],
            reverse=True,
        )

        return ranked

    def get_best_task(
        self,
        tasks: list[Any],
    ):

        ranked = self.rank_tasks(tasks)

        if not ranked:
            return None

        return ranked[0]

    def workload(
        self,
        tasks: list[Any],
    ) -> str:

        minutes = sum(
            getattr(
                t,
                "estimated_minutes",
                30,
            )
            for t in tasks
            if not getattr(
                t,
                "completed",
                False,
            )
        )

        if minutes < 90:
            return "Light"

        if minutes < 240:
            return "Moderate"

        return "Heavy"

    def confidence(
        self,
        score: int,
    ) -> int:

        return min(
            99,
            max(
                55,
                score,
            ),
        )


decision_engine = DecisionEngine()