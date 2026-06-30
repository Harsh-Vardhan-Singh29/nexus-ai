from typing import List

from app.ai.intent_detector import (
    IntentDetector,
    AIIntent,
)

from app.ai.prompts.general import GeneralPrompt
from app.ai.prompts.planner import PlannerPrompt
from app.ai.prompts.productivity import ProductivityPrompt
from app.ai.prompts.recommendation import RecommendationPrompt
from app.ai.prompts.workflow import WorkflowPrompt


class PromptBuilder:

    @staticmethod
    def build(
        message: str,
        tasks: List,
        stats: dict,
        history: str,
        context: dict,
    ) -> str:

        intent = IntentDetector.detect(message)

        # ==================================================
        # Build Shared AI Context
        # ==================================================

        context_text = f"""
==================================================
🧠 NEXUS AI CONTEXT
==================================================

🎯 Priority Task
{context["priority_task"]}

📊 Priority Score
{context["priority_score"]}

✅ Confidence
{context["confidence"]}%

📈 Productivity
{context["productivity"]}%

📅 Daily Progress
{context["daily_progress"]}%

⚡ Focus Score
{context["focus_score"]}

🔥 Momentum
{context["momentum_score"]}

💪 Energy State
{context["energy_state"]}

📦 Workload
{context["workload"]}

📌 Pending Tasks
{context["pending"]}

✅ Completed Tasks
{context["completed"]}

⏳ Remaining Work
{context["remaining_minutes"]} minutes

🕒 Estimated Finish
{context["estimated_finish"]}

🎯 Completion Probability
{context["completion_probability"]}%

🏆 Success Probability
{context["success_probability"]}%

⚠ Delay Risk
{context["delay_risk"]}

😴 Burnout Risk
{context["burnout_risk"]}

☕ Recommended Break
{context["recommended_break"]}

➡ Next Best Task
{context["next_best_task"]}

==================================================
TASK RANKING
==================================================
"""

        for index, item in enumerate(
            context["ranking"],
            start=1,
        ):

            task = item["task"]

            context_text += (
                f"{index}. "
                f"{task.title} "
                f"(Score {item['score']})\n"
            )

        context_text += "\n==================================================\n"

        full_history = (
            context_text
            + "\nConversation History\n\n"
            + history
        )

        # ==================================================
        # Route Prompt
        # ==================================================

        if intent == AIIntent.PLANNER:

            return PlannerPrompt.build(
                message,
                tasks,
                stats,
                full_history,
            )

        elif intent == AIIntent.RECOMMENDATION:

            return RecommendationPrompt.build(
                message,
                tasks,
                stats,
                full_history,
                context,
            )

        elif intent == AIIntent.PRODUCTIVITY:

            return ProductivityPrompt.build(
                message,
                tasks,
                stats,
                full_history,
                context,
            )

        elif intent == AIIntent.WORKFLOW:

            return WorkflowPrompt.build(
                message,
                tasks,
                stats,
                full_history,
            )

        else:

            return GeneralPrompt.build(
                message,
                tasks,
                stats,
                full_history,
            )