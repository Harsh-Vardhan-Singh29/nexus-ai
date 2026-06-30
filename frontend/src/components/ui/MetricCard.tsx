import { motion } from "framer-motion";
import type { ReactNode } from "react";

import GlassCard from "./GlassCard";
import AnimatedCounter from "./AnimatedCounter";

interface MetricCardProps {
    title: string;
    value: number;
    suffix?: string;
    icon: ReactNode;
    color?: string;
    description?: string;
    delay?: number;
}

export default function MetricCard({
    title,
    value,
    suffix = "",
    icon,
    color = "text-cyan-400",
    description,
    delay = 0,
}: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                delay,
            }}
        >
            <GlassCard className="p-6 h-full">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-sm text-slate-400">
                            {title}
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-white">

                            <AnimatedCounter
                                value={value}
                                suffix={suffix}
                            />

                        </h2>

                    </div>

                    <div
                        className={`rounded-2xl bg-white/5 p-4 text-3xl ${color}`}
                    >
                        {icon}
                    </div>

                </div>

                {description && (

                    <p className="mt-5 text-sm text-slate-500">

                        {description}

                    </p>

                )}

            </GlassCard>
        </motion.div>
    );
}