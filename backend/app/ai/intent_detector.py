from enum import Enum


class AIIntent(str, Enum):

    PLANNER = "planner"

    RECOMMENDATION = "recommendation"

    PRODUCTIVITY = "productivity"

    WORKFLOW = "workflow"

    GENERAL = "general"


class IntentDetector:

    @staticmethod
    def detect(message: str) -> AIIntent:

        text = message.lower()

        planner = [
            "plan",
            "schedule",
            "today",
            "timetable",
            "routine",
        ]

        recommendation = [
            "next",
            "first",
            "priority",
            "recommend",
            "which task",
        ]

        productivity = [
            "productivity",
            "progress",
            "analyze",
            "performance",
            "score",
        ]

        workflow = [
            "workflow",
            "improve",
            "efficient",
            "focus",
            "tips",
        ]

        if any(word in text for word in planner):
            return AIIntent.PLANNER

        if any(word in text for word in recommendation):
            return AIIntent.RECOMMENDATION

        if any(word in text for word in productivity):
            return AIIntent.PRODUCTIVITY

        if any(word in text for word in workflow):
            return AIIntent.WORKFLOW

        return AIIntent.GENERAL