import { useState } from "react";
import toast from "react-hot-toast";

import { AIService } from "../services/aiService";
import type { ChatMessage } from "../types/ai";

export function useAI() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function sendMessage(message: string) {

        const text = message.trim();

        if (!text || loading) return;

        const userMessage: ChatMessage = {
            role: "user",
            content: text,
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);
        setError("");

        try {

            const reply = await AIService.chat(text);

            const aiMessage: ChatMessage = {
                role: "assistant",
                content: reply,
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (err: any) {

            console.error(err);

            const message =
                err?.response?.data?.detail ??
                err?.message ??
                "Failed to contact NEXUS AI.";

            setError(message);

            toast.error(message);

        } finally {

            setLoading(false);

        }
    }

    async function clearConversation() {

        try {

            await AIService.clearChat();

            setMessages([]);

            setError("");

            toast.success("Conversation cleared.");

        } catch (err) {

            console.error(err);

            toast.error("Unable to clear conversation.");

        }
    }

    return {

        messages,

        loading,

        error,

        sendMessage,

        clearConversation,

    };
}