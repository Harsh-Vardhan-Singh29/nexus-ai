import { useEffect, useState } from "react";
import type { Task, CreateTask } from "../types/task";
import { TaskService } from "../services/taskService";
import toast from "react-hot-toast";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadTasks() {
        try {
            setLoading(true);

            const data = await TaskService.getTasks();

            setTasks(data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }

    async function createTask(task: CreateTask) {
        const loadingToast = toast.loading("Creating task...");

        try {
            await TaskService.createTask(task);

            await loadTasks();

            toast.success("Task created successfully!", {
                id: loadingToast,
            });

        } catch (error) {

            toast.error("Failed to create task.", {
                id: loadingToast,
            });

            throw error;
        }
    }

    async function updateTask(id: number, task: CreateTask) {
        const loadingToast = toast.loading("Updating task...");

        try {

            await TaskService.updateTask(id, task);

            await loadTasks();

            toast.success("Task updated successfully!", {
                id: loadingToast,
            });

        } catch (error) {

            toast.error("Failed to update task.", {
                id: loadingToast,
            });

            throw error;
        }
    }

    async function deleteTask(id: number) {
        const loadingToast = toast.loading("Deleting task...");

        try {

            await TaskService.deleteTask(id);

            await loadTasks();

            toast.success("Task deleted successfully!", {
                id: loadingToast,
            });

        } catch (error) {

            toast.error("Failed to delete task.", {
                id: loadingToast,
            });

            throw error;
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        refresh: loadTasks,
        createTask,
        updateTask,
        deleteTask,
    };
}