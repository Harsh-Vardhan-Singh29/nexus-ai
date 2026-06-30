import {
    Brain,
    Lightbulb,
    TrendingUp,
    AlertTriangle,
} from "lucide-react";

interface PlannerData {
    insights?: string[];
}

interface Props {
    planner: PlannerData;
}

export default function PlannerInsight({
    planner,
}: Props) {

    const insights =
        planner?.insights ??
        [
            "Generate your first AI plan to receive personalized recommendations.",
            "High priority tasks should be completed during your peak focus hours.",
            "Remember to take regular breaks to maintain productivity."
        ];

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-700
                bg-slate-900
                p-8
            "
        >

            {/* Header */}

            <div className="mb-8 flex items-center gap-4">

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-r
                        from-violet-500
                        to-indigo-600
                        text-white
                    "
                >

                    <Brain size={28} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        AI Insights

                    </h2>

                    <p className="mt-1 text-slate-400">

                        Personalized recommendations for your day

                    </p>

                </div>

            </div>

            {/* Insight Cards */}

            <div className="space-y-5">

                {insights.map((insight, index) => {

                    const icons = [
                        <Lightbulb size={20} />,
                        <TrendingUp size={20} />,
                        <AlertTriangle size={20} />,
                    ];

                    const colors = [
                        "from-yellow-500 to-orange-500",
                        "from-emerald-500 to-green-600",
                        "from-red-500 to-pink-600",
                    ];

                    return (

                        <div
                            key={index}
                            className="
                                flex
                                gap-5
                                rounded-2xl
                                border
                                border-slate-700
                                bg-slate-800
                                p-5
                                transition-all
                                duration-300
                                hover:border-cyan-500
                            "
                        >

                            <div
                                className={`
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-r
                                    ${colors[index % colors.length]}
                                    text-white
                                `}
                            >

                                {icons[index % icons.length]}

                            </div>

                            <div>

                                <h3 className="font-semibold text-white">

                                    Insight {index + 1}

                                </h3>

                                <p className="mt-2 leading-7 text-slate-300">

                                    {insight}

                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}