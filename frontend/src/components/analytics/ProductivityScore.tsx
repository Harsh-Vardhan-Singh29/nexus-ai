interface Props {
    score: number;
}

export default function ProductivityScore({
    score,
}: Props) {

    const radius = 90;
    const stroke = 14;

    const normalizedRadius =
        radius - stroke * 2;

    const circumference =
        normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
        circumference -
        (score / 100) * circumference;

    function getColor() {

        if (score >= 80)
            return "#10b981";

        if (score >= 60)
            return "#f59e0b";

        return "#ef4444";

    }

    function getStatus() {

        if (score >= 90)
            return "Outstanding";

        if (score >= 80)
            return "Excellent";

        if (score >= 70)
            return "Great";

        if (score >= 60)
            return "Good";

        return "Needs Improvement";

    }

    function getMessage() {

        if (score >= 90)
            return "You're performing at an exceptional level today.";

        if (score >= 80)
            return "Excellent work! Stay focused to maintain your momentum.";

        if (score >= 70)
            return "You're progressing well. Finish a few more tasks to boost your score.";

        if (score >= 60)
            return "You're on the right track. Prioritize your important tasks.";

        return "Complete your highest-priority tasks first to improve today's productivity.";

    }

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

            <div className="flex items-center justify-between">

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-white
                        "
                    >
                        Productivity Score
                    </h2>

                    <p className="mt-2 text-slate-400">
                        AI evaluation of today's performance
                    </p>

                </div>

                <div
                    className="
                        rounded-full
                        bg-slate-800
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-cyan-400
                    "
                >
                    {getStatus()}
                </div>

            </div>

            <div
                className="
                    mt-10
                    flex
                    flex-col
                    items-center
                "
            >

                <svg
                    width="230"
                    height="230"
                >

                    <circle
                        stroke="#1e293b"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="115"
                        cy="115"
                    />

                    <circle
                        stroke={getColor()}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        r={normalizedRadius}
                        cx="115"
                        cy="115"
                        transform="rotate(-90 115 115)"
                        style={{
                            transition:
                                "stroke-dashoffset 1s ease",
                        }}
                    />

                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="fill-white"
                        style={{
                            fontSize: "42px",
                            fontWeight: 700,
                        }}
                    >
                        {score}%
                    </text>

                </svg>

                <h3
                    className="
                        mt-8
                        text-3xl
                        font-bold
                        text-white
                    "
                >
                    {getStatus()}
                </h3>

                <p
                    className="
                        mt-4
                        max-w-md
                        text-center
                        leading-7
                        text-slate-400
                    "
                >
                    {getMessage()}
                </p>

            </div>

        </div>

    );

}