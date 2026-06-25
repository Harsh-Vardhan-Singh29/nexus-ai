import type { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    color?: string;
    change?: string;
}

export default function StatCard({
    title,
    value,
    icon,
    color = "from-blue-500 to-cyan-500",
    change,
}: StatCardProps) {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-700/60
                bg-slate-900/70
                backdrop-blur-xl
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-500/50
                hover:shadow-xl
                hover:shadow-blue-500/10
            "
        >
            {/* Gradient Glow */}
            <div
                className={`
                    absolute
                    top-0
                    right-0
                    h-28
                    w-28
                    rounded-full
                    bg-gradient-to-br
                    ${color}
                    opacity-10
                    blur-3xl
                `}
            />

            <div className="relative z-10 flex items-start justify-between">

                <div>
                    <p className="text-sm font-medium text-slate-400">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-white">
                        {value}
                    </h2>

                    {change && (
                        <p className="mt-3 text-sm text-emerald-400">
                            {change}
                        </p>
                    )}
                </div>

                <div
                    className={`
                        rounded-xl
                        bg-gradient-to-br
                        ${color}
                        p-4
                        text-white
                        shadow-lg
                    `}
                >
                    {icon}
                </div>

            </div>
        </div>
    );
}