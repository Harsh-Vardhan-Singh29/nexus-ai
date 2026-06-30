import {
    Brain,
    TrendingUp,
    Lightbulb,
    CheckCircle2,
} from "lucide-react";

interface Props {

    insights: string[];

    recommendations: string[];

}

export default function AIInsights({

    insights,

    recommendations,

}: Props) {

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
                        from-cyan-500
                        to-blue-600
                        text-white
                    "
                >

                    <Brain size={28} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        AI Productivity Coach

                    </h2>

                    <p className="mt-1 text-slate-400">

                        Personalized insights and recommendations generated from your activity.

                    </p>

                </div>

            </div>

            {/* Insights */}

            <div className="mb-8">

                <div className="mb-5 flex items-center gap-3">

                    <TrendingUp
                        size={20}
                        className="text-cyan-400"
                    />

                    <h3 className="text-lg font-semibold text-white">

                        Insights

                    </h3>

                </div>

                <div className="space-y-4">

                    {insights.length > 0 ? (

                        insights.map((item, index) => (

                            <div
                                key={index}
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-700
                                    bg-slate-800
                                    p-5
                                "
                            >

                                <p className="leading-7 text-slate-300">

                                    {item}

                                </p>

                            </div>

                        ))

                    ) : (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-slate-700
                                bg-slate-800
                                p-5
                                text-slate-400
                            "
                        >

                            No insights available yet.

                        </div>

                    )}

                </div>

            </div>

            {/* Recommendations */}

            <div>

                <div className="mb-5 flex items-center gap-3">

                    <Lightbulb
                        size={20}
                        className="text-yellow-400"
                    />

                    <h3 className="text-lg font-semibold text-white">

                        Recommendations

                    </h3>

                </div>

                <div className="space-y-4">

                    {recommendations.length > 0 ? (

                        recommendations.map((item, index) => (

                            <div
                                key={index}
                                className="
                                    flex
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-emerald-500/20
                                    bg-emerald-500/10
                                    p-5
                                "
                            >

                                <CheckCircle2
                                    size={20}
                                    className="
                                        mt-1
                                        shrink-0
                                        text-emerald-400
                                    "
                                />

                                <p className="leading-7 text-slate-200">

                                    {item}

                                </p>

                            </div>

                        ))

                    ) : (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-slate-700
                                bg-slate-800
                                p-5
                                text-slate-400
                            "
                        >

                            No recommendations available.

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}