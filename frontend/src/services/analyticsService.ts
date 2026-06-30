import api from "../api/api";

import type {
    AnalyticsResponse,
} from "../types/analytics";

class AnalyticsService {

    /**
     * Fetch complete analytics dashboard.
     */
    async getAnalytics(): Promise<AnalyticsResponse> {

        try {

            const response =
                await api.get<AnalyticsResponse>(
                    "/analytics"
                );

            return response.data;

        }

        catch (error) {

            console.error(
                "Analytics API Error:",
                error
            );

            throw new Error(
                "Unable to fetch analytics."
            );

        }

    }

}

export default new AnalyticsService();