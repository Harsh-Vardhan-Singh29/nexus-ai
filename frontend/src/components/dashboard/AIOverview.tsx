import {
    FaBolt,
    FaBrain,
    FaShieldAlt,
    FaBullseye,
} from "react-icons/fa";

import GlassCard from "../ui/GlassCard";
import ProgressRing from "../ui/ProgressRing";
import AnimatedCounter from "../ui/AnimatedCounter";

interface Props {
    productivity: number;
    momentum: number;
    focus: number;
    success: number;
    risk: string;
}

export default function AIOverview({
    productivity,
    momentum,
    focus,
    success,
    risk,
}: Props) {

    const metrics = [
        {
            title: "Momentum",
            value: momentum,
            icon: <FaBolt />,
            color: "text-cyan-400",
        },
        {
            title: "Focus",
            value: focus,
            icon: <FaBrain />,
            color: "text-purple-400",
        },
        {
            title: "Success",
            value: success,
            icon: <FaBullseye />,
            color: "text-green-400",
        },
    ];

    return (

        <section className="grid gap-8 lg:grid-cols-[420px_1fr]">

            {/* Left */}

            <GlassCard className="p-8">

                <ProgressRing
                    value={productivity}
                    label="Today's Progress"
                    sublabel={
                        productivity >= 80
                            ? "Excellent"
                            : productivity >= 60
                            ? "On Track"
                            : "Keep Going"
                    }
                />

            </GlassCard>

            {/* Right */}

            <GlassCard className="p-8">

                <h2 className="mb-8 text-2xl font-bold text-white">

                    AI Performance

                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    {metrics.map((metric) => (

                        <div
                            key={metric.title}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                        >

                            <div
                                className={`mb-4 text-3xl ${metric.color}`}
                            >
                                {metric.icon}
                            </div>

                            <p className="text-sm text-slate-400">

                                {metric.title}

                            </p>

                            <h3 className="mt-2 text-4xl font-bold text-white">

                                <AnimatedCounter
                                    value={metric.value}
                                    suffix="%"
                                />

                            </h3>

                        </div>

                    ))}

                </div>

                <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

                    <div className="flex items-center gap-3">

                        <FaShieldAlt className="text-cyan-400" />

                        <span className="font-semibold text-white">

                            AI Health

                        </span>

                    </div>

                    <p className="mt-3 text-slate-300">

                        Risk Level:

                        <span className="ml-2 font-semibold text-cyan-400">

                            {risk}

                        </span>

                    </p>

                    <p className="mt-2 text-sm text-slate-400">

                        Your productivity engine is continuously monitoring
                        workload, priorities, and task completion to
                        optimize your day.

                    </p>

                </div>

            </GlassCard>

        </section>

    );

}