import { useState } from "react";

import Modal from "../components/common/Modal";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import TaskSkeleton from "../components/tasks/TaskSkeleton";
import { useTasks } from "../hooks/useTasks";

import type { Task, CreateTask } from "../types/task";

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

                {/* Empty State */}

                {tasks.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 py-20 text-center">

                        <div className="text-6xl">
                            📋
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-white">
                            No Tasks Yet
                        </h2>

                        <p className="mt-3 text-slate-400">
                            Create your first task and let NEXUS AI help you stay productive.
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

                        {tasks.map((task) => (

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