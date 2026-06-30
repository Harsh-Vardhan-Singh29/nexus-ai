from sqlalchemy.orm import Session

from app.ai.ai_orchestrator import ai_orchestrator
from app.ai.context_engine import context_engine
from app.ai.memory import memory
from app.ai.prompt_builder import PromptBuilder
from app.services.task_service import TaskService


class AIService:
    """
    Central AI service for NEXUS AI.

    Responsibilities
    ----------------
    • Load user data
    • Build AI context
    • Build prompts
    • Delegate generation to AI Orchestrator
    • Persist conversation history

    This class intentionally knows nothing about
    Gemini, Local Brain or future AI providers.
    """

    @staticmethod
    def chat(
        message: str,
        db: Session,
    ) -> str:

        # ==========================================
        # Load User Data
        # ==========================================

        tasks = TaskService.get_tasks(db)

        stats = TaskService.get_dashboard_stats(db)

        history = memory.get_history()

        # ==========================================
        # Build AI Context
        # ==========================================

        context = context_engine.build(
            tasks,
            stats,
        )

        # ==========================================
        # Build Prompt
        # ==========================================

        prompt = PromptBuilder.build(
            message=message,
            tasks=tasks,
            stats=stats,
            history=history,
            context=context,
        )

        # ==========================================
        # AI Orchestrator
        # ==========================================

        response = ai_orchestrator.generate(
            message=message,
            prompt=prompt,
            context=context,
            tasks=tasks,
        )

        # ==========================================
        # Save Conversation
        # ==========================================

        memory.add_user(message)

        memory.add_ai(response)

        return response

    @staticmethod
    def get_context(
        db: Session,
    ) -> dict:
        """
        Returns the live AI Context used by:

        • Dashboard
        • AI Daily Brief
        • Analytics
        • Planner
        • AI Chat
        """

        tasks = TaskService.get_tasks(db)

        stats = TaskService.get_dashboard_stats(db)

        return context_engine.build(
            tasks,
            stats,
        )


ai_service = AIService()