export interface SummaryMetrics {

    productivity_score: number;

    completed_tasks: number;

    pending_tasks: number;

    total_tasks: number;

    completion_rate: number;

    focus_hours: number;

    average_task_duration: number;

    estimated_finish: string;

    workload: string;

}

export interface StreakMetrics {

    current: number;

    longest: number;

}

export interface WeeklyMetrics {

    labels: string[];

    values: number[];

}

export interface AnalyticsResponse {

    summary: SummaryMetrics;

    streak: StreakMetrics;

    weekly: WeeklyMetrics;

    insights: string[];

    recommendations: string[];

}