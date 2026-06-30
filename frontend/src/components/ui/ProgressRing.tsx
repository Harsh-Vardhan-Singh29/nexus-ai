import { motion } from "framer-motion";

interface ProgressRingProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
    sublabel?: string;
}

export default function ProgressRing({
    value,
    size = 220,
    strokeWidth = 14,
    label = "Today's Progress",
    sublabel = "Keep Going",
}: ProgressRingProps) {

    const normalized = Math.min(Math.max(value, 0), 100);

    const radius = (size - strokeWidth) / 2;

    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (normalized / 100) * circumference;

    const progressColor =
        normalized >= 80
            ? "#22c55e"
            : normalized >= 60
            ? "#06b6d4"
            : normalized >= 40
            ? "#f59e0b"
            : "#ef4444";

    return (

        <div className="flex flex-col items-center justify-center">

            <div
                className="relative"
                style={{
                    width: size,
                    height: size,
                }}
            >

                <svg
                    width={size}
                    height={size}
                    className="-rotate-90"
                >

                    <defs>

                        <linearGradient
                            id="progressGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >

                            <stop
                                offset="0%"
                                stopColor="#06b6d4"
                            />

                            <stop
                                offset="100%"
                                stopColor="#3b82f6"
                            />

                        </linearGradient>

                    </defs>

                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />

                    <motion.circle

                        cx={size / 2}
                        cy={size / 2}
                        r={radius}

                        stroke="url(#progressGradient)"

                        strokeWidth={strokeWidth}

                        fill="transparent"

                        strokeLinecap="round"

                        strokeDasharray={circumference}

                        initial={{
                            strokeDashoffset: circumference,
                        }}

                        animate={{
                            strokeDashoffset: offset,
                        }}

                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                        }}

                    />

                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <motion.h2

                        initial={{
                            opacity: 0,
                            scale: 0.8,
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}

                        transition={{
                            delay: 0.6,
                        }}

                        className="text-5xl font-bold"

                        style={{
                            color: progressColor,
                        }}

                    >

                        {normalized}%

                    </motion.h2>

                    <p className="mt-2 text-sm text-slate-400">

                        {label}

                    </p>

                    <span className="mt-1 rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">

                        {sublabel}

                    </span>

                </div>

            </div>

        </div>

    );

}