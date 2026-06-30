from datetime import datetime


class RecommendationAgent:

    @staticmethod
    def prepare(tasks):

        pending = [
            task
            for task in tasks
            if task.status == "Pending"
        ]

        if not pending:

            return {
                "best_task": None,
                "reason": "No pending tasks.",
                "ranking": [],
            }

        ranking = []

        for task in pending:

            score = 0

            # ---------- Priority ----------

            if task.priority == "High":
                score += 50

            elif task.priority == "Medium":
                score += 30

            else:
                score += 10

            # ---------- Deadline ----------

            if task.deadline:

                days = (
                    task.deadline.replace(tzinfo=None)
                    - datetime.now()
                ).days

                if days <= 0:
                    score += 40

                elif days <= 2:
                    score += 30

                elif days <= 5:
                    score += 20

                else:
                    score += 10

            # ---------- Estimated Time ----------

            if task.estimated_time:

                if task.estimated_time <= 60:
                    score += 15

                elif task.estimated_time <= 120:
                    score += 10

                else:
                    score += 5

            ranking.append({

                "task": task,

                "score": score,

            })

        ranking.sort(
            key=lambda item: item["score"],
            reverse=True,
        )

        best = ranking[0]

        return {

            "best_task": best["task"],

            "score": best["score"],

            "ranking": ranking,

        }