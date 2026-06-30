import api from "../api/api";

export interface TimelineItem {
    time: string;
    title: string;
    type: string;
}

export interface PlannerResponse {

    workload: number;

    estimated_minutes: number;

    day_status: string;

    today_tasks: unknown[];

    timeline: TimelineItem[];

    insights: string[];

}

export const PlannerService = {

    async generatePlan(): Promise<PlannerResponse> {

        const response = await api.get<PlannerResponse>(
            "/planner/generate"
        );

        return response.data;

    },

};