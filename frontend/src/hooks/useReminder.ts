import { useEffect } from "react";
import toast from "react-hot-toast";
import { TaskService } from "../services/taskService";

export function useReminder(
    addNotification?: (
        title: string,
        message: string
    ) => void
) {
    useEffect(() => {
        if (
            "Notification" in window &&
            Notification.permission === "default"
        ) {
            Notification.requestPermission();
        }

        const checkTasks = async () => {

            try {

                const tasks = await TaskService.getTasks();

                const reminderMinutes =
                    Number(localStorage.getItem("reminderMinutes")) || 30;

                const now = new Date();

                for (const task of tasks) {

                    if (task.status === "Completed")
                        continue;

                    if (!task.deadline)
                        continue;

                    const deadline = new Date(task.deadline);

                    const diffMinutes =
                        (deadline.getTime() - now.getTime()) / 60000;
                        console.log({
                            title: task.title,
                            deadline: task.deadline,
                            now: now.toISOString(),
                            diffMinutes,
                            status: task.status,
                            priority: task.priority,
                        });

                    if (
                        diffMinutes <= reminderMinutes &&
                        diffMinutes > 0
                    ) {

                        const reminderKey = `task-reminder-${task.id}`;

                        if (localStorage.getItem(reminderKey))
                            continue;

                        localStorage.setItem(reminderKey, "true");


                        let message = "";

                        switch (task.priority) {

                            case "High":
                                message = `🚨 "${task.title}" is due in ${Math.round(diffMinutes)} minutes. Start now!`;
                                break;

                            case "Medium":
                                message = `⏳ "${task.title}" is due in ${Math.round(diffMinutes)} minutes.`;
                                break;

                            default:
                                message = `📌 "${task.title}" is due soon.`;

                        }

                        toast(message, {
                            duration: 8000,
                            icon: "🔔",
                        });

                        addNotification?.(
                            "Reminder",
                            message
                        );

                        const audio = new Audio("/sounds/notification.mp3");

                        audio.volume = 1;

                        audio.play()
                            .then(() => {
                            })
                            .catch((err) => {
                                console.error("🔇 Audio Error:", err);
                            });

                        if (Notification.permission === "granted") {

                            new Notification("NEXUS AI Reminder", {
                                body: message,
                                icon: "/favicon.svg",
                            });

                        }

                    }

                }

            } catch (error) {

                console.error("Reminder Error", error);

            }

        };

        checkTasks();

        const interval = setInterval(
            checkTasks,
            10000
        );

        return () => clearInterval(interval);

    }, []);

}