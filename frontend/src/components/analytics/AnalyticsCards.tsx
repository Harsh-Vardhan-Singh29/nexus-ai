import {
    CheckCircle2,
    Clock3,
    TrendingUp,
    Target,
    Timer,
    Briefcase,
} from "lucide-react";

import type {
    SummaryMetrics,
} from "../../types/analytics";

interface Props {
    analytics: SummaryMetrics;
}

export default function AnalyticsCards({
    analytics,
}: Props) {

    const cards = [

        {
            title: "Productivity",
            value: `${analytics.productivity_score}%`,
            subtitle: "Overall Score",
            icon: <TrendingUp size={28} />,
            color: "from-cyan-500 to-blue-600",
        },

        {
            title: "Completed",
            value: analytics.completed_tasks,
            subtitle: `${analytics.total_tasks} Total Tasks`,
            icon: <CheckCircle2 size={28} />,
            color: "from-emerald-500 to-green-600",
        },

        {
            title: "Focus Time",
            value: `${analytics.focus_hours}h`,
            subtitle: `${analytics.average_task_duration} min avg`,
            icon: <Clock3 size={28} />,
            color: "from-purple-500 to-pink-600",
        },

        {
            title: "Completion",
            value: `${analytics.completion_rate}%`,
            subtitle: `${analytics.pending_tasks} Pending`,
            icon: <Target size={28} />,
            color: "from-orange-500 to-red-500",
        },

        {
            title: "Finish By",
            value: analytics.estimated_finish,
            subtitle: "Estimated",
            icon: <Timer size={28} />,
            color: "from-indigo-500 to-violet-600",
        },

        {
            title: "Workload",
            value: analytics.workload,
            subtitle: "Today's Status",
            icon: <Briefcase size={28} />,
            color: "from-amber-500 to-orange-600",
        },

    ];

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="
                        rounded-3xl
                        border
                        border-slate-700
                        bg-slate-900
                        p-6
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-cyan-500
                        hover:shadow-2xl
                    "
                >

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-slate-400">

                                {card.title}

                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-4xl
                                    font-bold
                                    text-white
                                "
                            >

                                {card.value}

                            </h2>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-slate-500
                                "
                            >

                                {card.subtitle}

                            </p>

                        </div>

                        <div
                            className={`
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-r
                                ${card.color}
                                text-white
                                shadow-lg
                            `}
                        >

                            {card.icon}

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}