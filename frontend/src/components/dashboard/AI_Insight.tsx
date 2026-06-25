interface AIInsightProps {
    title?: string;
    message?: string;
}

export default function AIInsight({
    title = "AI Insight",
    message = "You're making steady progress today. Complete your pending high-priority tasks first to maximize productivity.",
}: AIInsightProps) {
    return (
        <div className="h-full rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg">

            {/* Header */}

            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-2xl">

                    🤖

                </div>

                <div>

                    <h2 className="text-xl font-bold text-white">
                        {title}
                    </h2>

                    <p className="text-sm text-slate-400">
                        AI Productivity Assistant
                    </p>

                </div>

            </div>

            {/* Message */}

            <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/60 p-5">

                <p className="leading-7 text-slate-300">
                    {message}
                </p>

            </div>

            {/* Tips */}

            <div className="mt-6 space-y-3">

                <div className="flex items-center gap-2 text-sm text-green-400">
                    ✅ Focus on important tasks first
                </div>

                <div className="flex items-center gap-2 text-sm text-yellow-400">
                    ⏰ Schedule breaks every 90 minutes
                </div>

                <div className="flex items-center gap-2 text-sm text-cyan-400">
                    🚀 Consistency beats intensity
                </div>

            </div>

            {/* Status */}

            <div className="mt-8 flex items-center justify-between rounded-xl border border-green-700/40 bg-green-500/10 px-4 py-3">

                <span className="text-sm text-green-300">
                    AI Status
                </span>

                <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                    ONLINE
                </span>

            </div>

        </div>
    );
}