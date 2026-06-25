import api from "../api/api";

export interface DashboardStats {
    total_tasks: number;
    pending_tasks: number;
    completed_tasks: number;
    high_priority: number;
    overdue_tasks: number;
}

export const DashboardService = {
    async getStats(): Promise<DashboardStats> {
        const response = await api.get("/dashboard/");
        return response.data;
    },
};