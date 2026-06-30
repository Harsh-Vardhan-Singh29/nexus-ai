import {
    CheckCircle2,
    Clock3,
    Coffee,
    CalendarClock,
} from "lucide-react";

interface TimelineItem {
    time: string;
    title: string;
    type?: string;
}

interface PlannerData {
    timeline?: TimelineItem[];
}

interface Props {
    planner: PlannerData;
}

export default function PlannerTimeline({
    planner,
}: Props) {

    const timeline =
        planner?.timeline ??
        [
            {
                time: "09:00",
                title: "Generate your first AI plan",
                type: "focus",
            },
        ];

    function getIcon(type?: string) {

        switch (type) {

            case "break":
                return <Coffee size={18} />;

            case "completed":
                return (
                    <CheckCircle2 size={18} />
                );

            case "meeting":
                return (
                    <CalendarClock size={18} />
                );

            default:
                return <Clock3 size={18} />;

        }

    }

    function getColor(type?: string) {

        switch (type) {

            case "break":
                return "bg-amber-500";

            case "completed":
                return "bg-emerald-500";

            case "meeting":
                return "bg-violet-500";

            default:
                return "bg-cyan-500";

        }

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

            <h2 className="mb-8 text-2xl font-bold text-white">

                Today's Timeline

            </h2>

            <div className="space-y-6">

                {timeline.map((item, index) => (

                    <div
                        key={index}
                        className="flex gap-5"
                    >

                        {/* Time */}

                        <div
                            className="
                                w-24
                                shrink-0
                                text-right
                            "
                        >

                            <p
                                className="
                                    font-semibold
                                    text-cyan-400
                                "
                            >

                                {item.time}

                            </p>

                        </div>

                        {/* Timeline */}

                        <div
                            className="
                                relative
                                flex
                                flex-col
                                items-center
                            "
                        >

                            <div
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-white
                                    ${getColor(item.type)}
                                `}
                            >

                                {getIcon(item.type)}

                            </div>

                            {index !==
                                timeline.length - 1 && (

                                <div
                                    className="
                                        mt-2
                                        h-14
                                        w-1
                                        rounded-full
                                        bg-slate-700
                                    "
                                />

                            )}

                        </div>

                        {/* Task */}

                        <div
                            className="
                                flex-1
                                rounded-2xl
                                border
                                border-slate-700
                                bg-slate-800
                                px-6
                                py-5
                                transition-all
                                duration-300
                                hover:border-cyan-500
                            "
                        >

                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    text-white
                                "
                            >

                                {item.title}

                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    capitalize
                                    text-slate-400
                                "
                            >

                                {item.type ?? "Focus"}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}