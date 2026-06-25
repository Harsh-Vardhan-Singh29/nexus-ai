import { useState } from "react";
import type { CreateTask } from "../../types/task";

interface Props {
    initialData?: CreateTask;

    onSubmit: (task: CreateTask) => Promise<void>;

    onClose: () => void;

    submitText?: string;
}
export default function TaskForm({
    initialData,
    onSubmit,
    onClose,
    submitText = "Create Task",
}: Props) {

    const [form, setForm] = useState<CreateTask>(
        initialData ?? {
            title: "",
            description: "",
            priority: "Medium",
            status: "Pending",
        }
    );

    const [loading, setLoading] = useState(false);

    function updateField(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            await onSubmit(form);
            onClose();
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <div>

                <label
                    htmlFor="title"
                    className="text-white block mb-2"
                >
                    Title
                </label>

                <input
                    id="title"
                    name="title"
                    placeholder="Enter task title"
                    value={form.title}
                    onChange={updateField}
                    required
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
                />

            </div>

            <div>

               <label
                    htmlFor="description"
                    className="text-white block mb-2"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your task"
                    value={form.description}
                    onChange={updateField}
                    rows={4}
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
                />

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label
                        htmlFor="priority"
                        className="text-white block mb-2"
                    >
                        Priority
                    </label>

                    <select
                        id="priority"
                        name="priority"
                        value={form.priority}
                        onChange={updateField}
                        className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                </div>

                <div>

                    <label
                        htmlFor="status"
                        className="text-white block mb-2"
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={updateField}
                        className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
                    >
                        <option>Pending</option>
                        <option>Completed</option>
                    </select>

                </div>

            </div>

            <div className="flex justify-end gap-3">

                <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-lg bg-slate-700 text-white"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {loading ? "Saving..." : submitText}
                </button>

            </div>

        </form>
    );
}