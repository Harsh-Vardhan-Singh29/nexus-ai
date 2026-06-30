import { FaRobot } from "react-icons/fa";

export default function TypingIndicator() {
    return (
        <div className="flex gap-4 animate-fade-in">

            {/* AI Avatar */}

            <div
                className="
                    mt-1
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    shadow-lg
                "
            >
                <FaRobot className="text-white" />
            </div>

            {/* Bubble */}

            <div
                className="
                    rounded-3xl
                    rounded-bl-md
                    border
                    border-slate-700
                    bg-slate-800
                    px-6
                    py-5
                    shadow-lg
                "
            >

                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    NEXUS AI
                </p>

                <p className="mb-4 text-sm text-slate-300">
                    Thinking...
                </p>

                <div className="flex gap-2">

                    <span
                        className="
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-cyan-400
                            animate-bounce
                        "
                    />

                    <span
                        className="
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-cyan-400
                            animate-bounce
                        "
                        style={{ animationDelay: "0.15s" }}
                    />

                    <span
                        className="
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-cyan-400
                            animate-bounce
                        "
                        style={{ animationDelay: "0.3s" }}
                    />

                </div>

            </div>

        </div>
    );
}