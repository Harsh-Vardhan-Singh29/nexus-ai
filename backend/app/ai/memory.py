from collections import deque


class ConversationMemory:

    def __init__(self, max_messages: int = 10):
        self.history = deque(maxlen=max_messages)

    def add_user(self, message: str):
        self.history.append(
            {
                "role": "user",
                "content": message,
            }
        )

    def add_ai(self, message: str):
        self.history.append(
            {
                "role": "assistant",
                "content": message,
            }
        )

    def get_history(self):

        if not self.history:
            return ""

        conversation = ""

        for msg in self.history:

            role = "User" if msg["role"] == "user" else "Assistant"

            conversation += (
                f"{role}: {msg['content']}\n"
            )

        return conversation

    def clear(self):
        self.history.clear()


memory = ConversationMemory()