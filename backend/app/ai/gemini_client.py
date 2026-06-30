from google import genai
from google.genai import types

from app.core.config import settings


class GeminiClient:
    """
    Thin wrapper around the Gemini API.

    Responsibilities:
    - Send prompts to Gemini.
    - Return generated text.
    - Raise exceptions on failure.

    It DOES NOT:
    - Retry requests.
    - Handle fallbacks.
    - Format user-facing error messages.

    Those responsibilities belong to AIOrchestrator.
    """

    def __init__(self):

        if not settings.GEMINI_API_KEY:
            raise ValueError(
                "GEMINI_API_KEY is missing."
            )

        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

        self.model = settings.GEMINI_MODEL

    def generate(
        self,
        prompt: str,
    ) -> str:

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=1024,
            ),
        )

        if response is None:
            raise RuntimeError(
                "Gemini returned no response."
            )

        if not getattr(response, "text", None):
            raise RuntimeError(
                "Gemini returned an empty response."
            )

        return response.text.strip()


gemini_client = GeminiClient()