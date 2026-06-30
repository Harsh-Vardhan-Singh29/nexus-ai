export interface Task {
    id: number;

    title: string;

    description: string;

    priority: "High" | "Medium" | "Low";

    status: "Pending" | "Completed";

    deadline?: string | null;

    estimated_time?: number | null;

    created_at?: string | null;
}

export interface CreateTask {
    title: string;

    description: string;

    priority: "High" | "Medium" | "Low";

    status: "Pending" | "Completed";

    deadline?: string | null;

    estimated_time?: number | null;
}