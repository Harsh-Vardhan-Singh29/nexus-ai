import {
    FaCalendarAlt,
    FaBrain,
    FaMagic,
} from "react-icons/fa";

export default function PlannerHeader() {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-700
                bg-gradient-to-r
                from-slate-900
                via-slate-900
                to-slate-950
                p-8
                shadow-2xl
            "
        >
            {/* Background Glow */}

            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    h-56
                    w-56
                    rounded-full
                    bg-cyan-500/10
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    -bottom-16
                    left-0
                    h-48
                    w-48
                    rounded-full
                    bg-purple-500/10
                    blur-3xl
                "
            />

            <div className="relative flex items-center justify-between">

                {/* Left */}

                <div>

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
                                from-cyan-500
                                to-blue-600
                                text-3xl
                                text-white
                                shadow-xl
                            "
                        >
                            <FaBrain />
                        </div>

                        <div>

                            <h1 className="text-4xl font-bold text-white">

                                AI Planner

                            </h1>

                            <p className="mt-2 text-slate-400">

                                Your intelligent daily planning assistant.

                            </p>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="hidden lg:flex gap-4">

                    <div
                        className="
                            rounded-2xl
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            px-6
                            py-4
                        "
                    >

                        <div className="flex items-center gap-2">

                            <FaMagic className="text-emerald-400" />

                            <span className="font-semibold text-white">

                                AI Ready

                            </span>

                        </div>

                        <p className="mt-2 text-sm text-emerald-300">

                            Gemini Connected

                        </p>

                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-800
                            px-6
                            py-4
                        "
                    >

                        <div className="flex items-center gap-2">

                            <FaCalendarAlt className="text-cyan-400" />

                            <span className="font-semibold text-white">

                                Today's Plan

                            </span>

                        </div>

                        <p className="mt-2 text-sm text-slate-400">

                            Auto Generated

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}