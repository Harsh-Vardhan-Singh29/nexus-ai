import { useEffect, useState } from "react";
import type { DashboardStats } from "../types/dashboard";
import { DashboardService } from "../services/dashboardService";

export function useDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadDashboard() {
        try {
            setLoading(true);

            const data = await DashboardService.getStats();

            setStats(data);

            setError("");
        } catch (err: any) {
            console.log("Dashboard Error:");
            console.log(err);
            console.log(err.response);
            console.log(err.message);

            setError("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDashboard();
    }, []);

    return {
        stats,
        loading,
        error,
        refresh: loadDashboard,
    };
}