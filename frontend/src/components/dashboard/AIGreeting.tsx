import {
    FaBolt,
    FaBullseye,
    FaClock,
} from "react-icons/fa";

interface Props {
    priorityTask: string;
    workload: string;
    momentum: number;
    estimatedFinish: string;
}

export default function AIGreeting({
    priorityTask,
    workload,
    momentum,
    estimatedFinish,
}: Props) {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    const momentumText =
        momentum >= 90
            ? "Excellent"
            : momentum >= 75
            ? "High"
            : momentum >= 60
            ? "Good"
            : "Building";

    return (

        <section className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 p-8 shadow-xl">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        👋 {greeting}

                    </h1>

                    <p className="mt-3 text-lg text-slate-300">

                        Your AI workspace is ready.

                    </p>

                </div>

                <div className="grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl bg-slate-800/60 p-4">

                        <div className="flex items-center gap-2 text-cyan-400">

                            <FaBullseye />

                            <span className="text-sm">

                                Today's Focus

                            </span>

                        </div>

                        <p className="mt-2 font-semibold text-white">

                            {priorityTask}

                        </p>

                    </div>

                    <div className="rounded-2xl bg-slate-800/60 p-4">

                        <div className="flex items-center gap-2 text-orange-400">

                            <FaBolt />

                            <span className="text-sm">

                                Momentum

                            </span>

                        </div>

                        <p className="mt-2 font-semibold text-white">

                            {momentumText}

                        </p>

                        <p className="text-xs text-slate-400">

                            {momentum}%

                        </p>

                    </div>

                    <div className="rounded-2xl bg-slate-800/60 p-4">

                        <div className="flex items-center gap-2 text-green-400">

                            <FaClock />

                            <span className="text-sm">

                                Finish

                            </span>

                        </div>

                        <p className="mt-2 font-semibold text-white">

                            {estimatedFinish}

                        </p>

                        <p className="text-xs text-slate-400">

                            {workload} Day

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}