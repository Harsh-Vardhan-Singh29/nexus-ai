import api from "../api/api";
import type {
    ChatRequest,
    ChatResponse,
} from "../types/ai";

export const AIService = {

    async chat(message: string): Promise<string> {

        const body: ChatRequest = {
            message,
        };

        const response =
            await api.post<ChatResponse>(
                "/ai/chat",
                body
            );

        return response.data.response;
    },

    async clearChat(): Promise<void> {

        await api.post("/ai/clear");

    },

};