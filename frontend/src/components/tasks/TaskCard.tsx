import {
    FaEdit,
    FaTrash,
    FaFlag,
    FaCheckCircle,
} from "react-icons/fa";
import {
    FaCalendarAlt,
    FaClock,
    FaExclamationTriangle,
} from "react-icons/fa";
import type { Task } from "../../types/task";
function getDeadlineStatus(deadline?: string | null) {
    if (!deadline) return null;

    const today = new Date();
    const due = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diff =
        (due.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24);

    if (diff < 0) {
        return {
            label: "Overdue",
            color: "bg-red-500/20 text-red-400",
        };
    }

    if (diff === 0) {
        return {
            label: "Today",
            color: "bg-orange-500/20 text-orange-300",
        };
    }

    if (diff === 1) {
        return {
            label: "Tomorrow",
            color: "bg-yellow-500/20 text-yellow-300",
        };
    }

    return {
        label: new Date(deadline).toLocaleDateString(),
        color: "bg-slate-700 text-slate-300",
    };
}
interface Props {
    task: Task;
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
}

export default function TaskCard({
    task,
    onDelete,
    onEdit,
}: Props) {
    const deadline = getDeadlineStatus(task.deadline);
    const priorityStyle = {
        High: "bg-red-500/20 text-red-400 border border-red-500/30",
        Medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        Low: "bg-green-500/20 text-green-400 border border-green-500/30",
    };

    const statusStyle = {
        Pending: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
        Completed: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    };

    return (
        <div
            className="
            group
            relative
            rounded-2xl
            border
            border-slate-700/60
            bg-slate-900/70
            backdrop-blur-xl
            p-6
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-blue-500/50
            hover:shadow-2xl
            hover:shadow-cyan-500/10
        "
        >
            {/* Glow */}

            <div
                className="
                absolute
                inset-0
                rounded-2xl
                bg-gradient-to-r
                from-blue-500/5
                via-cyan-500/5
                to-purple-500/5
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
            "
            />

            {/* Content */}

            <div className="relative z-10">

                <h2 className="text-2xl font-bold text-white">
                    {task.title}
                </h2>

                <p className="mt-3 text-slate-400 leading-relaxed">
                    {task.description}
                </p>

                {/* Tags */}

                <div className="mt-6 flex flex-wrap gap-3">

                    <span
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                            priorityStyle[
                                task.priority as keyof typeof priorityStyle
                            ]
                        }`}
                    >
                        <FaFlag size={12} />
                        {task.priority}
                    </span>

                    <span
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                            statusStyle[
                                task.status as keyof typeof statusStyle
                            ]
                        }`}
                    >
                        <FaCheckCircle size={12} />
                        {task.status}
                    </span>

                    {deadline && (
                        <span
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${deadline.color}`}
                        >
                            <FaCalendarAlt size={12} />
                            {deadline.label}
                        </span>
                    )}

                    {task.estimated_time && (
                        <span
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-cyan-500/20
                                border
                                border-cyan-500/30
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-cyan-300
                            "
                        >
                            <FaClock size={12} />
                            {task.estimated_time} mins
                        </span>
                    )}

                </div>

                {deadline?.label === "Overdue" && (
                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-red-500/30
                            bg-red-500/10
                            p-3
                            text-sm
                            font-medium
                            text-red-400
                        "
                    >
                        <FaExclamationTriangle />
                        This task is overdue. Complete it as soon as possible.
                    </div>
                )}

                {/* Buttons */}

                <div className="mt-8 flex gap-3">

                    <button
                        onClick={() => onEdit(task)}
                        className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-4
                        py-2
                        text-white
                        transition-all
                        hover:bg-blue-700
                        hover:scale-105
                    "
                    >
                        <FaEdit />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(task.id)}
                        className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-red-600
                        px-4
                        py-2
                        text-white
                        transition-all
                        hover:bg-red-700
                        hover:scale-105
                    "
                    >
                        <FaTrash />
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
}