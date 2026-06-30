import { useMemo, useState } from "react";
import Modal from "../components/common/Modal";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import TaskSkeleton from "../components/tasks/TaskSkeleton";
import { useTasks } from "../hooks/useTasks";
import { calculateTaskScore } from "../utils/taskScore";

import type { Task, CreateTask } from "../types/task";
import { useSearch } from "../context/SearchContext";
export default function Tasks() {
    const {
        tasks,
        loading,
        error,
        refresh,
        createTask,
        updateTask,
        deleteTask,
    } = useTasks();

    const [openModal, setOpenModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { query } = useSearch();
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const overdueTasks = tasks.filter((task) => {

        if (!task.deadline || task.status === "Completed") {
            return false;
        }

        return new Date(task.deadline) < new Date();

    }).length;

    const [filter, setFilter] = useState<
        | "All"
        | "Pending"
        | "Completed"
        | "High"
        | "Medium"
        | "Low"
        | "Overdue"
    >("All");

    const [sortBy, setSortBy] = useState<
        "Newest" |
        "Oldest" |
        "Priority" |
        "Deadline" |
        "AI Priority"
    >("Newest");

    function openCreateModal() {
        setEditingTask(null);
        setOpenModal(true);
    }

    function openEditModal(task: Task) {
        setEditingTask(task);
        setOpenModal(true);
    }

    function closeModal() {
        setEditingTask(null);
        setOpenModal(false);
    }

    async function handleSubmit(task: CreateTask) {
        if (editingTask) {
            await updateTask(editingTask.id, task);
        } else {
            await createTask(task);
        }

        closeModal();
    }

    async function handleDelete(id: number) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        await deleteTask(id);
    }
    const filteredTasks = useMemo(() => {

        const result = tasks.filter((task) => {

            const search = query.toLowerCase();

            const matchesSearch =
                task.title.toLowerCase().includes(search) ||
                task.description.toLowerCase().includes(search);

            let matchesFilter = true;

            switch (filter) {

                case "Pending":
                    matchesFilter = task.status === "Pending";
                    break;

                case "Completed":
                    matchesFilter = task.status === "Completed";
                    break;

                case "High":
                case "Medium":
                case "Low":
                    matchesFilter = task.priority === filter;
                    break;
                case "Overdue":

                    matchesFilter =
                        task.status !== "Completed" &&
                        !!task.deadline &&
                        new Date(task.deadline) < new Date();

                    break;
            }

            return matchesSearch && matchesFilter;

        });

        result.sort((a, b) => {

            switch (sortBy) {

                case "Newest":
                    return b.id - a.id;

                case "Oldest":
                    return a.id - b.id;

                case "Priority": {

                    const priorityOrder = {
                        High: 3,
                        Medium: 2,
                        Low: 1,
                    };

                    return (
                        priorityOrder[
                            b.priority as keyof typeof priorityOrder
                        ] -
                        priorityOrder[
                            a.priority as keyof typeof priorityOrder
                        ]
                    );
                }

                case "Deadline":

                    return (
                        new Date(a.deadline ?? "9999-12-31").getTime() -
                        new Date(b.deadline ?? "9999-12-31").getTime()
                    );

                case "AI Priority":

                    return (
                        calculateTaskScore(b) -
                        calculateTaskScore(a)
                    );
                default:
                    return 0;
            }

        });

        return result;

    }, [tasks, query, filter, sortBy]);
    if (loading) {
        return (
            <div className="grid gap-6 lg:grid-cols-2">

                {[...Array(6)].map((_, index) => (

                    <TaskSkeleton key={index} />

                ))}

            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-5">

                <h2 className="text-2xl font-bold text-red-500">
                    {error}
                </h2>

                <button
                    onClick={refresh}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Retry
                </button>

            </div>
        );
    }

    return (
        <>
            <div className="page-enter p-8">

                {/* Header */}

                <div className="flex items-center justify-between mb-10">

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            Tasks
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Manage all your productivity tasks.
                        </p>

                    </div>

                    <button
                        onClick={openCreateModal}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        + New Task
                    </button>

                </div>

                <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

                    <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-5">
                        <p className="text-slate-400 text-sm">Total Tasks</p>
                        <h2 className="mt-2 text-3xl font-bold text-white">
                            {totalTasks}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-5">
                        <p className="text-slate-400 text-sm">Pending</p>
                        <h2 className="mt-2 text-3xl font-bold text-orange-400">
                            {pendingTasks}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-5">
                        <p className="text-slate-400 text-sm">Completed</p>
                        <h2 className="mt-2 text-3xl font-bold text-green-400">
                            {completedTasks}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-5">
                        <p className="text-slate-400 text-sm">Overdue</p>
                        <h2 className="mt-2 text-3xl font-bold text-red-400">
                            {overdueTasks}
                        </h2>
                    </div>

                </div>

                <div className="mb-8 flex flex-col gap-4 lg:flex-row">

                    <select
                        title="Filter Tasks"
                        aria-label="Filter Tasks"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as typeof filter)}
                        className="
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-900/70
                            px-5
                            py-3
                            text-white
                        "
                    >
                        <option>All</option>
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option>Overdue</option>
                        <option>AI Priority</option>
                    </select>

                    <select
                        title="Sort Tasks"
                        aria-label="Sort Tasks"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value as typeof sortBy)
                        }
                        className="
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-900/70
                            px-5
                            py-3
                            text-white
                        "
                    >
                        <option>Newest</option>
                        <option>Oldest</option>
                        <option>Priority</option>
                        <option>Deadline</option>
                    </select>

                </div>

                {/* Empty State */}

                {filteredTasks.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 py-20 text-center">

                        <div className="text-6xl">
                            📋
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-white">
                            {tasks.length === 0
                                ? "No Tasks Yet"
                                : "No Matching Tasks"}
                        </h2>

                        <p className="mt-3 text-slate-400">
                            {tasks.length === 0
                                ? "Create your first task and let NEXUS AI help you stay productive."
                                : "Try changing your search or filter."}
                        </p>

                        <button
                            onClick={() => setOpenModal(true)}
                            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            + Create First Task
                        </button>

                    </div>
                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {filteredTasks.map((task) => (

                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />

                        ))}

                    </div>

                )}

            </div>

            {/* Modal */}

            <Modal
                open={openModal}
                onClose={closeModal}
            >

                <h2 className="text-2xl font-bold text-white mb-6">
                    {editingTask ? "Edit Task" : "Create New Task"}
                </h2>

                <TaskForm
                    initialData={
                        editingTask
                            ? {
                                  title: editingTask.title,
                                  description: editingTask.description,
                                  priority: editingTask.priority,
                                  status: editingTask.status,
                              }
                            : undefined
                    }
                    submitText={
                        editingTask
                            ? "Update Task"
                            : "Create Task"
                    }
                    onSubmit={handleSubmit}
                    onClose={closeModal}
                />

            </Modal>
        </>
    );
}