import api from "../api/api";
import type { Task, CreateTask } from "../types/task";

export const TaskService = {
    async getTasks(): Promise<Task[]> {
        const response = await api.get("/tasks/");
        return response.data;
    },

    async getTask(id: number): Promise<Task> {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    async createTask(task: CreateTask): Promise<Task> {
        const response = await api.post("/tasks/", task);
        return response.data;
    },

    async updateTask(id: number, task: CreateTask): Promise<Task> {
        const response = await api.put(`/tasks/${id}`, task);
        return response.data;
    },

    async deleteTask(id: number): Promise<void> {
        await api.delete(`/tasks/${id}`);
    },
};