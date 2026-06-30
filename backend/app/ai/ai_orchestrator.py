import time

from app.ai.gemini_client import gemini_client
from app.ai.local_brain import local_brain


class AIOrchestrator:

    def generate(
        self,
        *,
        message: str,
        prompt: str,
        context: dict,
        tasks,
    ) -> str:

        retries = 1

        for attempt in range(retries + 1):

            try:

                return gemini_client.generate(prompt)

            except Exception as e:

                print(f"[AI] Gemini attempt {attempt + 1} failed: {e}")

                if attempt < retries:

                    time.sleep(1)

                    continue

                print("[AI] Switching to Local Brain...")

                return local_brain.generate(
                    message=message,
                    context=context,
                    tasks=tasks,
                )


ai_orchestrator = AIOrchestrator()