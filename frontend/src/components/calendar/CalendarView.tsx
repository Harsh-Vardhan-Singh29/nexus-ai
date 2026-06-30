import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "../../styles/calendar.css";

import {
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaFire,
    FaBrain,
} from "react-icons/fa";

import { useTasks } from "../../hooks/useTasks";
import type { Task } from "../../types/task";


export default function CalendarView() {

    const { tasks, loading } = useTasks();

    const [selectedDate, setSelectedDate] = useState<Date>(
        new Date()
    );

    function sameDay(date1: Date, date2: Date) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    const tasksForSelectedDay = useMemo(() => {

        return tasks.filter((task) => {

            if (!task.deadline) return false;

            return sameDay(
                new Date(task.deadline),
                selectedDate
            );

        });

    }, [tasks, selectedDate]);

    const summary = useMemo(() => {

        const completed =
            tasksForSelectedDay.filter(
                t => t.status === "Completed"
            ).length;

        const pending =
            tasksForSelectedDay.length - completed;

        const overdue =
            tasksForSelectedDay.filter(task => {

                if (!task.deadline) return false;

                return (
                    task.status === "Pending" &&
                    new Date(task.deadline) <
                        new Date()
                );

            }).length;

        return {

            total: tasksForSelectedDay.length,
            completed,
            pending,
            overdue,

        };

    }, [tasksForSelectedDay]);

    const nextTask = useMemo(() => {

        return [...tasksForSelectedDay]
            .filter(
                t => t.status === "Pending"
            )
            .sort((a, b) => {

                const priority = {
                    High: 3,
                    Medium: 2,
                    Low: 1,
                };

                return (
                    priority[
                        b.priority as keyof typeof priority
                    ] -
                    priority[
                        a.priority as keyof typeof priority
                    ]
                );

            })[0];

    }, [tasksForSelectedDay]);

    function getDayTasks(date: Date) {
        return tasks.filter((task) => {
            if (!task.deadline) return false;

            return sameDay(
                new Date(task.deadline),
                date
            );
        });
    }

    function tileContent({
        date,
        view,
    }: {
        date: Date;
        view: string;
    }) {
        if (view !== "month") return null;

        const dayTasks: Task[] = getDayTasks(date);

        if (!dayTasks.length) return null;

        const hasOverdue = dayTasks.some(
            (t) =>
                t.status === "Pending" &&
                t.deadline &&
                new Date(t.deadline) < new Date()
        );

        const hasHigh = dayTasks.some(
            (t) => t.priority === "High"
        );

        const allCompleted =
            dayTasks.every(
                (t) => t.status === "Completed"
            );

        const task = dayTasks[0];

        let dot = "dot-low";

        if (hasOverdue)
            dot = "dot-overdue";
        else if (allCompleted)
            dot = "dot-completed";
        else if (hasHigh)
            dot = "dot-high";
        else if (task.priority === "Medium")
            dot = "dot-medium";

        return (
            <div className={`calendar-dot ${dot}`} />
        );
    }

    if (loading) {
        return (
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
                Loading Calendar...
            </div>
        );
    }

    return (

        <div className="grid gap-8 xl:grid-cols-[420px_1fr]">

            {/* LEFT */}

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

                <div className="mb-6 flex items-center gap-3">

                    <FaCalendarAlt className="text-cyan-400" />

                    <h2 className="text-2xl font-bold text-white">
                        AI Calendar
                    </h2>

                </div>

                <Calendar
                    value={selectedDate}
                    onChange={(value) =>
                        setSelectedDate(value as Date)
                    }
                    tileContent={tileContent}
                />

                <div className="mt-8 grid gap-4">

                    <div className="rounded-2xl bg-slate-800 p-4">

                        <p className="text-sm text-slate-400">
                            Tasks
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white">
                            {summary.total}
                        </h2>

                    </div>

                    <div className="rounded-2xl bg-slate-800 p-4">

                        <p className="text-sm text-slate-400">
                            Completed
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-400">
                            {summary.completed}
                        </h2>

                    </div>

                    <div className="rounded-2xl bg-slate-800 p-4">

                        <p className="text-sm text-slate-400">
                            Pending
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                            {summary.pending}
                        </h2>

                    </div>

                    <div className="rounded-2xl bg-slate-800 p-4">

                        <p className="text-sm text-slate-400">
                            Overdue
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-red-400">
                            {summary.overdue}
                        </h2>

                    </div>

                </div>

            </div>

            {/* RIGHT */}

            <div className="space-y-6">

                <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 to-cyan-950 p-6">

                    <div className="flex items-center gap-3">

                        <FaBrain className="text-cyan-400" />

                        <h2 className="text-2xl font-bold text-white">

                            AI Recommendation

                        </h2>

                    </div>

                    {nextTask ? (

                        <>

                            <h3 className="mt-5 text-3xl font-bold text-white">

                                {nextTask.title}

                            </h3>

                            <p className="mt-4 text-slate-300">

                                Complete this first because it has the
                                highest priority for the selected day.

                            </p>

                        </>

                    ) : (

                        <div className="mt-5 space-y-3">

                            <h3 className="text-2xl font-bold text-green-400">

                                🎉 Great Job!

                            </h3>

                            <p className="text-slate-300">

                                You have no pending tasks on this day.

                            </p>

                            <ul className="list-disc pl-5 text-slate-400 space-y-1">

                                <li>Review completed work</li>
                                <li>Plan tomorrow</li>
                                <li>Maintain your productivity streak</li>

                            </ul>

                        </div>

                    )}

                </div>

                <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

                    <h2 className="mb-6 text-2xl font-bold text-white">

                        Tasks for {selectedDate.toLocaleDateString()}

                    </h2>

                    <div className="mb-6 grid grid-cols-2 gap-4">

                        <div className="rounded-xl bg-slate-800 p-4">

                            <p className="text-sm text-slate-400">
                                Focus Time
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-cyan-400">

                                {tasksForSelectedDay.reduce(
                                    (sum, task) =>
                                        sum +
                                        (task.estimated_time ?? 0),
                                    0
                                )} min

                            </h2>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-4">

                            <p className="text-sm text-slate-400">

                                Workload

                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-yellow-400">

                                {tasksForSelectedDay.reduce(
                                    (sum, task) =>
                                        sum +
                                        (task.estimated_time ?? 0),
                                    0
                                ) > 240
                                    ? "Heavy"
                                    : tasksForSelectedDay.reduce(
                                        (sum, task) =>
                                            sum +
                                            (task.estimated_time ?? 0),
                                        0
                                    ) > 120
                                    ? "Medium"
                                    : "Light"}

                            </h2>

                        </div>

                    </div>

                    {tasksForSelectedDay.length === 0 ? (

                        <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center text-slate-500">

                            No tasks scheduled.

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {tasksForSelectedDay.map((task) => (

                                <div
                                    key={task.id}
                                    className="rounded-2xl border border-slate-700 bg-slate-800 p-5"
                                >

                                    <div className="flex items-center justify-between">

                                        <h3 className="text-lg font-bold text-white">

                                            {task.title}

                                        </h3>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs ${
                                                task.priority === "High"
                                                    ? "bg-red-500/20 text-red-300"
                                                    : task.priority === "Medium"
                                                    ? "bg-yellow-500/20 text-yellow-300"
                                                    : "bg-cyan-500/20 text-cyan-300"
                                            }`}
                                        >

                                            {task.priority}

                                        </span>

                                    </div>

                                    <p className="mt-3 text-slate-400">

                                        {task.description}

                                    </p>

                                    <div className="mt-4 flex gap-5 text-sm">

                                        <span className="flex items-center gap-2 text-green-400">

                                            <FaCheckCircle />

                                            {task.status}

                                        </span>

                                        <span className="flex items-center gap-2 text-cyan-400">

                                            <FaClock />

                                            {task.estimated_time ?? 0} min

                                        </span>

                                        {task.deadline && (

                                            <span className="flex items-center gap-2 text-orange-400">

                                                <FaFire />

                                                {new Date(
                                                    task.deadline
                                                ).toLocaleDateString()}

                                            </span>

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}