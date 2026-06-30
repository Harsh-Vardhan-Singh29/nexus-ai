import type { Task } from "../types/task";

export function calculateTaskScore(task: Task): number {
    let score = 0;

    // Priority
    switch (task.priority) {
        case "High":
            score += 50;
            break;

        case "Medium":
            score += 30;
            break;

        case "Low":
            score += 10;
            break;
    }

    // Deadline
    if (task.deadline) {
        const diff =
            (new Date(task.deadline).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24);

        if (diff <= 0)
            score += 50;
        else if (diff <= 1)
            score += 40;
        else if (diff <= 3)
            score += 20;
    }

    // Pending tasks matter more
    if (task.status === "Pending")
        score += 20;

    // Short tasks are easier wins
    if (
        task.estimated_time &&
        task.estimated_time <= 60
    ) {
        score += 10;
    }

    return score;
}