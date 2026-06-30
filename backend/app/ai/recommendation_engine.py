from typing import Any


class RecommendationEngine:

    def build(
        self,
        context: dict,
        tasks: list[Any],
    ) -> dict:

        recommendations = []

        risks = []

        priority_reason = ""

        next_action = ""

        priority = context["priority_task"]

        pending = context["pending"]

        workload = context["workload"]

        risk = context["risk"]

        productivity = context["productivity"]

        focus = context["focus_score"]

        # ------------------------------------
        # Priority Reason
        # ------------------------------------

        if priority != "No Pending Tasks":

            priority_reason = (
                f'"{priority}" has the highest overall priority '
                "based on urgency, importance and workload."
            )

            next_action = (
                f"Start working on '{priority}' immediately."
            )

        else:

            priority_reason = (
                "There are no pending tasks."
            )

            next_action = (
                "Enjoy your free time or create a new task."
            )

        # ------------------------------------
        # Workload Advice
        # ------------------------------------

        if workload == "Light":

            recommendations.append(
                "You have a light workload today. Finish everything in one focused session."
            )

        elif workload == "Moderate":

            recommendations.append(
                "Work in 45-minute focus blocks with short breaks."
            )

        else:

            recommendations.append(
                "Your workload is heavy. Focus on completing high-impact tasks first."
            )

        # ------------------------------------
        # Productivity Advice
        # ------------------------------------

        if productivity >= 80:

            recommendations.append(
                "You're performing well today. Maintain your current pace."
            )

        elif productivity >= 50:

            recommendations.append(
                "You're making progress. Prioritize your remaining important tasks."
            )

        else:

            recommendations.append(
                "Complete one important task first to build momentum."
            )

        # ------------------------------------
        # Focus Advice
        # ------------------------------------

        if focus < 70:

            recommendations.append(
                "Reduce context switching and avoid distractions."
            )

        else:

            recommendations.append(
                "This is a good time for deep work."
            )

        # ------------------------------------
        # Risk Analysis
        # ------------------------------------

        if risk == "High":

            risks.append(
                "There are too many pending tasks. Consider postponing lower-priority work."
            )

        elif risk == "Medium":

            risks.append(
                "Stay focused to avoid carrying work into tomorrow."
            )

        else:

            risks.append(
                "No significant productivity risks detected."
            )

        # ------------------------------------
        # Pending Tasks
        # ------------------------------------

        if pending > 5:

            recommendations.append(
                "Complete one task before starting another."
            )

        return {

            "priority_reason": priority_reason,

            "recommendations": recommendations,

            "risks": risks,

            "next_action": next_action,

        }


recommendation_engine = RecommendationEngine()