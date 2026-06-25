import { useTasks } from "../../hooks/useTasks";

export default function RecentTasks() {
    const { tasks, loading } = useTasks();

    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-white">
                        Recent Tasks
                    </h2>

                    <p className="text-sm text-slate-400">
                        Your latest productivity updates
                    </p>

                </div>

                <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
                    {tasks.length} Tasks
                </span>

            </div>

            {loading ? (

                <div className="py-10 text-center text-slate-400">
                    Loading tasks...
                </div>

            ) : tasks.length === 0 ? (

                <div className="rounded-xl border border-dashed border-slate-700 py-10 text-center text-slate-500">
                    No recent tasks available.
                </div>

            ) : (

                <div className="space-y-4">

                    {tasks.slice(0, 5).map((task) => (

                        <div
                            key={task.id}
                            className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 p-4 transition hover:border-blue-500"
                        >

                            <div>

                                <h3 className="font-semibold text-white">
                                    {task.title}
                                </h3>

                                <p className="mt-1 text-sm text-slate-400">
                                    {task.description}
                                </p>

                            </div>

                            <div className="flex gap-2">

                                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
                                    {task.priority}
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs ${
                                        task.status === "Completed"
                                            ? "bg-green-500/20 text-green-300"
                                            : "bg-yellow-500/20 text-yellow-300"
                                    }`}
                                >
                                    {task.status}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}