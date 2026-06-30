import { useEffect, useState } from "react";
import axios from "axios";

export interface AIContext {

    priority_task: string;

    priority_score: number;

    confidence: number;

    workload: string;

    pending: number;

    completed: number;

    estimated_finish: string;

    remaining_minutes: number;

    productivity: number;

    daily_progress: number;

    productivity_level: string;

    focus_score: number;

    momentum_score: number;

    energy_state: string;

    completion_probability: number;

    success_probability: number;

    risk: string;

    delay_risk: string;

    burnout_risk: string;

    recommended_break: string;

    next_best_task: string | null;
}

export function useAIContext() {

    const [context, setContext] =
        useState<AIContext | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

        async function fetchContext() {

            try {

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/v1/ai/context"
                );

                setContext(response.data);

            } catch {

                setError(
                    "Unable to load AI Context."
                );

            } finally {

                setLoading(false);

            }

        }

        fetchContext();

    }, []);

    return {

        context,

        loading,

        error,

    };

}