from app.ai.intent_detector import (
    AIIntent,
    IntentDetector,
)
from app.ai.local_responses import LocalResponses
from app.ai.recommendation_engine import recommendation_engine


class LocalBrain:
    """
    Offline intelligence used whenever cloud AI is unavailable.

    Responsibilities
    ----------------
    • Detect user intent
    • Build recommendation/context data
    • Route to the correct local response builder

    This class intentionally contains almost no formatting logic.
    """

    def generate(
        self,
        message: str,
        context: dict,
        tasks,
    ) -> str:

        # ---------------------------------------
        # Build recommendation data
        # ---------------------------------------

        recommendation = recommendation_engine.build(
            context,
            tasks,
        )

        # Make recommendation data available to
        # LocalResponses without changing every
        # method signature.

        enriched_context = {
            **context,
            "recommendation": recommendation,
        }

        # ---------------------------------------
        # Detect intent
        # ---------------------------------------

        intent = IntentDetector.detect(message)

        # ---------------------------------------
        # Route response
        # ---------------------------------------

        if intent == AIIntent.PLANNER:

            return LocalResponses.planner(
                enriched_context,
            )

        if intent == AIIntent.RECOMMENDATION:

            return LocalResponses.recommendation(
                enriched_context,
            )

        if intent == AIIntent.PRODUCTIVITY:

            return LocalResponses.productivity(
                enriched_context,
            )

        if intent == AIIntent.WORKFLOW:

            return LocalResponses.workflow(
                enriched_context,
            )

        return LocalResponses.general(
            enriched_context,
        )


local_brain = LocalBrain()