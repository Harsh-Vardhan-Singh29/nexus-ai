from typing import List


class WorkflowPrompt:

    @staticmethod
    def build(
        message: str,
        tasks: List,
        stats: dict,
        history: str,
    ) -> str:

        return f"""
You are NEXUS AI.

The user wants workflow advice.

Conversation

{history}

Dashboard

Pending: {stats["pending_tasks"]}

Completed: {stats["completed_tasks"]}

Instructions

Return markdown.

Provide exactly:

# 🚀 Workflow Improvements

Five actionable suggestions.

Each suggestion should be short.

Focus on:

- Time management
- Prioritization
- Focus
- Breaks
- Planning

Do not exceed 150 words.
"""