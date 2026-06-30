import {
    Activity,
    CheckCircle2,
    Clock3,
    TimerReset,
} from "lucide-react";

interface PlannerData {
    workload?: number;
    estimated_minutes?: number;
    day_status?: string;
    today_tasks?: unknown[];
}

interface Props {
    planner: PlannerData;
}

export default function PlannerStats({
    planner,
}: Props) {

    const workload = planner?.workload ?? 0;

    const focusHours = Math.floor(
        (planner?.estimated_minutes ?? 0) / 60
    );

    const focusMinutes =
        (planner?.estimated_minutes ?? 0) % 60;

    const todayTasks =
        planner?.today_tasks?.length ?? 0;

    const dayStatus =
        planner?.day_status ?? "Balanced";

    const cards = [

        {
            title: "Today's Tasks",
            value: todayTasks,
            icon: <CheckCircle2 size={28} />,
            color:
                "from-cyan-500 to-blue-600",
        },

        {
            title: "Focus Time",
            value: `${focusHours}h ${focusMinutes}m`,
            icon: <Clock3 size={28} />,
            color:
                "from-purple-500 to-pink-500",
        },

        {
            title: "Workload",
            value: workload,
            icon: <Activity size={28} />,
            color:
                "from-emerald-500 to-green-500",
        },

        {
            title: "Day Status",
            value: dayStatus,
            icon: <TimerReset size={28} />,
            color:
                "from-orange-500 to-red-500",
        },

    ];

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="
                        rounded-3xl
                        border
                        border-slate-700
                        bg-slate-900
                        p-6
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-cyan-500
                        hover:shadow-xl
                    "
                >

                    <div
                        className={`
                            mb-6
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            ${card.color}
                            text-white
                        `}
                    >

                        {card.icon}

                    </div>

                    <p className="text-sm text-slate-400">

                        {card.title}

                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white">

                        {card.value}

                    </h2>

                </div>

            ))}

        </div>

    );

}