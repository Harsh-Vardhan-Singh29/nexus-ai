import {
    FaRobot,
    FaCalendarAlt,
    FaTasks,
    FaChartLine,
    FaBolt,
    FaLightbulb,
    FaClipboardCheck,
} from "react-icons/fa";

interface Props {
    onPromptClick: (prompt: string) => void;
}

const prompts = [
    {
        icon: <FaCalendarAlt />,
        title: "Plan my day",
        subtitle: "Generate today's schedule",
    },
    {
        icon: <FaTasks />,
        title: "Prioritize my tasks",
        subtitle: "Find what to do first",
    },
    {
        icon: <FaChartLine />,
        title: "Analyze productivity",
        subtitle: "View productivity insights",
    },
    {
        icon: <FaBolt />,
        title: "What's next?",
        subtitle: "AI recommends your next task",
    },
    {
        icon: <FaClipboardCheck />,
        title: "Summarize today's work",
        subtitle: "Quick overview of progress",
    },
    {
        icon: <FaLightbulb />,
        title: "Give productivity tips",
        subtitle: "Improve your workflow",
    },
];

export default function EmptyChat({
    onPromptClick,
}: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-16">

            {/* Robot */}

            <div
                className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-600
                    shadow-2xl
                "
            >
                <FaRobot className="text-5xl text-white" />
            </div>

            {/* Title */}

            <h2 className="mt-8 text-4xl font-bold text-white">
                Welcome to NEXUS AI
            </h2>

            <p className="mt-4 max-w-2xl text-center text-lg text-slate-400">
                Ask questions, generate schedules,
                organize your work,
                analyze productivity,
                or let AI become your personal productivity coach.
            </p>

            {/* Prompt Grid */}

            <div className="mt-12 grid w-full max-w-5xl gap-5 md:grid-cols-2 xl:grid-cols-3">

                {prompts.map((item) => (

                    <button
                        key={item.title}
                        onClick={() => onPromptClick(item.title)}
                        className="
                            group
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-900/60
                            p-6
                            text-left
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-cyan-500
                            hover:bg-slate-800
                            hover:shadow-xl
                        "
                    >

                        <div
                            className="
                                mb-5
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-r
                                from-cyan-500
                                to-blue-600
                                text-xl
                                text-white
                                transition-transform
                                group-hover:scale-110
                            "
                        >
                            {item.icon}
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                            {item.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            {item.subtitle}
                        </p>

                    </button>

                ))}

            </div>

            {/* Footer */}

            <div className="mt-12 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm text-emerald-400">

                🟢 Gemini AI Connected • Ready to assist

            </div>

        </div>
    );
}