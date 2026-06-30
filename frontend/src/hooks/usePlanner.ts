import { useState } from "react";

import {
    PlannerService,
    type PlannerResponse,
} from "../services/PlannerService";

export function usePlanner() {

    const [loading, setLoading] =
        useState(true);

    const [planner, setPlanner] =
        useState<PlannerResponse>({
            workload: 0,
            estimated_minutes: 0,
            day_status: "Balanced",
            today_tasks: [],
            timeline: [],
            insights: [],
        });

    async function generatePlan() {

        try {

            setLoading(true);

            const data =
                await PlannerService.generatePlan();

            setPlanner(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    return {

        loading,

        planner,

        generatePlan,

    };

}