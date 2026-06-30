import {
    Flame,
    Trophy,
    CalendarDays,
    TrendingUp,
} from "lucide-react";

interface Props {
    currentStreak: number;
    longestStreak: number;
}

export default function StreakCard({
    currentStreak,
    longestStreak,
}: Props) {

    const progress = Math.min(
        (currentStreak / Math.max(longestStreak, 1)) * 100,
        100
    );

    function getStatus() {

        if (currentStreak >= 30)
            return "Legendary";

        if (currentStreak >= 14)
            return "Excellent";

        if (currentStreak >= 7)
            return "Great";

        if (currentStreak >= 3)
            return "Building";

        return "Getting Started";

    }

    function getMessage() {

        if (currentStreak >= 30)
            return "Your consistency is exceptional.";

        if (currentStreak >= 14)
            return "You're building an excellent productivity habit.";

        if (currentStreak >= 7)
            return "Keep your momentum alive.";

        if (currentStreak >= 3)
            return "You're starting to form a strong routine.";

        return "Complete tasks daily to build a streak.";

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

            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-orange-500
                            to-red-500
                            text-white
                        "
                    >

                        <Flame size={34} />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            Productivity Streak
                        </h2>

                        <p className="text-slate-400">
                            {getStatus()}
                        </p>

                    </div>

                </div>

                <TrendingUp
                    className="text-cyan-400"
                    size={28}
                />

            </div>

            {/* Main */}

            <div className="mt-10">

                <h1
                    className="
                        text-7xl
                        font-black
                        text-orange-400
                    "
                >

                    {currentStreak}

                </h1>

                <p className="mt-2 text-slate-400">

                    Consecutive Days

                </p>

            </div>

            {/* Progress */}

            <div className="mt-8">

                <div className="mb-3 flex justify-between">

                    <span className="text-sm text-slate-400">

                        Progress to Best

                    </span>

                    <span className="text-sm text-cyan-400">

                        {Math.round(progress)}%

                    </span>

                </div>

                <div className="h-3 rounded-full bg-slate-800">

                    <div
                        style={{
                            width: `${progress}%`,
                        }}
                        className="
                            h-3
                            rounded-full
                            bg-gradient-to-r
                            from-orange-500
                            to-red-500
                            transition-all
                            duration-700
                        "
                    />

                </div>

            </div>

            {/* Stats */}

            <div className="mt-10 grid gap-4 md:grid-cols-2">

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-800
                        p-5
                    "
                >

                    <div className="flex items-center gap-3">

                        <Trophy
                            className="text-yellow-400"
                            size={20}
                        />

                        <span className="text-slate-300">

                            Best Streak

                        </span>

                    </div>

                    <h3
                        className="
                            mt-3
                            text-3xl
                            font-bold
                            text-white
                        "
                    >

                        {longestStreak} Days

                    </h3>

                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-800
                        p-5
                    "
                >

                    <div className="flex items-center gap-3">

                        <CalendarDays
                            className="text-emerald-400"
                            size={20}
                        />

                        <span className="text-slate-300">

                            AI Coach

                        </span>

                    </div>

                    <p
                        className="
                            mt-3
                            leading-7
                            text-slate-300
                        "
                    >

                        {getMessage()}

                    </p>

                </div>

            </div>

        </div>

    );

}