import { useEffect, useState } from "react";
import type { Task, CreateTask } from "../types/task";
import { TaskService } from "../services/taskService";
import toast from "react-hot-toast";
import { useNotifications } from "../context/NotificationContext";
export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addNotification } = useNotifications();
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
            addNotification(
                "📝 Task Created",
                `"${task.title}" has been created successfully.`
            );

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

            addNotification(
                "✏️ Task Updated",
                `"${task.title}" has been updated.`
            );

            if (task.status === "Completed") {
                addNotification(
                    "✅ Task Completed",
                    `Great job! "${task.title}" has been completed.`
                );
            }

        } catch (error) {

            toast.error("Failed to update task.", {
                id: loadingToast,
            });

            throw error;
        }
    }

    async function deleteTask(id: number) {
        const loadingToast = toast.loading("Deleting task...");
        const taskToDelete = tasks.find((t) => t.id === id);

        try {

            await TaskService.deleteTask(id);

            await loadTasks();

            toast.success("Task deleted successfully!", {
                id: loadingToast,
            });

            addNotification(
                "🗑️ Task Deleted",
                `"${taskToDelete?.title ?? "Task"}" has been deleted.`
            );

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