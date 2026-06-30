import { Brain, Zap, Clock, Target } from "lucide-react";

interface PlannerData {
    timeline?: {
        title: string;
        type?: string;
    }[];
    estimated_minutes?: number;
    day_status?: string;
}

interface Props {
    planner: PlannerData;
}

export default function PlannerRecommendation({
    planner,
}: Props) {

    const nextTask =
        planner.timeline?.find(
            item => item.type !== "break"
        )?.title ?? "No tasks planned";

    const focusHours = Math.floor(
        (planner.estimated_minutes ?? 0) / 60
    );

    const focusMinutes =
        (planner.estimated_minutes ?? 0) % 60;

    return (

        <div
            className="
                rounded-3xl
                border
                border-cyan-500/20
                bg-gradient-to-r
                from-slate-900
                via-slate-900
                to-cyan-950/40
                p-8
            "
        >

            <div className="flex items-center gap-4">

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

                        AI Recommendation

                    </h2>

                    <p className="text-slate-400">

                        Your smartest next move.

                    </p>

                </div>

            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">

                <div className="rounded-2xl bg-slate-800 p-5">

                    <Target className="mb-3 text-cyan-400" />

                    <p className="text-sm text-slate-400">

                        Next Best Task

                    </p>

                    <h3 className="mt-2 text-lg font-bold text-white">

                        {nextTask}

                    </h3>

                </div>

                <div className="rounded-2xl bg-slate-800 p-5">

                    <Clock className="mb-3 text-orange-400" />

                    <p className="text-sm text-slate-400">

                        Deep Work

                    </p>

                    <h3 className="mt-2 text-lg font-bold text-white">

                        {focusHours}h {focusMinutes}m

                    </h3>

                </div>

                <div className="rounded-2xl bg-slate-800 p-5">

                    <Zap className="mb-3 text-yellow-400" />

                    <p className="text-sm text-slate-400">

                        AI Outlook

                    </p>

                    <h3 className="mt-2 text-lg font-bold text-white">

                        {planner.day_status}

                    </h3>

                </div>

            </div>

        </div>

    );

}