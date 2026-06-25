export interface Task {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
}

export interface CreateTask {
    title: string;
    description: string;
    priority: string;
    status: string;
}