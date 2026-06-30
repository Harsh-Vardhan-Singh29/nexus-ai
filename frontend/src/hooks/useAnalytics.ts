import { useCallback, useEffect, useState } from "react";

import AnalyticsService from "../services/analyticsService";

import type {
    AnalyticsResponse,
} from "../types/analytics";

const initialState: AnalyticsResponse = {

    summary: {

        productivity_score: 0,

        completed_tasks: 0,

        pending_tasks: 0,

        total_tasks: 0,

        completion_rate: 0,

        focus_hours: 0,

        average_task_duration: 0,

        estimated_finish: "--:--",

        workload: "Unknown",

    },

    streak: {

        current: 0,

        longest: 0,

    },

    weekly: {

        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
        ],

        values: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
        ],

    },

    insights: [],

    recommendations: [],

};

export function useAnalytics() {

    const [analytics, setAnalytics] =
        useState<AnalyticsResponse>(
            initialState
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const fetchAnalytics =
        useCallback(async () => {

            try {

                setLoading(true);

                setError(null);

                const data =
                    await AnalyticsService.getAnalytics();

                setAnalytics(data);

            }

            catch (err) {

                console.error(err);

                setError(
                    "Unable to load analytics."
                );

            }

            finally {

                setLoading(false);

            }

        }, []);

    useEffect(() => {

        fetchAnalytics();

    }, [fetchAnalytics]);

    return {

        analytics,

        loading,

        error,

        refreshAnalytics:
            fetchAnalytics,

    };

}