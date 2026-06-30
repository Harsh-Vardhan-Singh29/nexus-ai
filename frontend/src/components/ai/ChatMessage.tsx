import {
    FaRobot,
    FaUserCircle,
    FaCopy,
    FaCheck,
} from "react-icons/fa";
import { useState } from "react";
import type { ChatMessage as ChatMessageType } from "../../types/ai";
import MarkdownMessage from "./MarkdownMessage";

interface Props {
    message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {

    const isUser = message.role === "user";

    const [copied, setCopied] = useState(false);

    async function copyMessage() {

        try {

            await navigator.clipboard.writeText(
                message.content
            );

            setCopied(true);

            setTimeout(() => {

                setCopied(false);

            }, 2000);

        } catch {

            console.error("Copy failed");

        }

    }

    return (

        <div
            className={`flex gap-4 ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            {/* AI Avatar */}

            {!isUser && (

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

            )}

            {/* Bubble */}

            <div
                className={`
                    group
                    relative
                    max-w-[72ch]
                    rounded-3xl
                    px-6
                    py-5
                    shadow-lg
                    transition-all
                    duration-300

                    ${
                        isUser
                            ? "rounded-br-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                            : "rounded-bl-md border border-slate-700 bg-slate-800 text-slate-100"
                    }
                `}
            >

                {/* Sender */}

                <div
                    className="
                        mb-3
                        flex
                        items-center
                        justify-between
                    "
                >

                    <span
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-widest
                            opacity-70
                        "
                    >

                        {isUser ? "You" : "NEXUS AI"}

                    </span>

                    {/* Copy */}

                    {!isUser && (

                        <button
                            onClick={copyMessage}
                            className="
                                opacity-0
                                transition
                                group-hover:opacity-100
                            "
                        >

                            {copied ? (

                                <FaCheck className="text-emerald-400" />

                            ) : (

                                <FaCopy className="text-slate-400 hover:text-white" />

                            )}

                        </button>

                    )}

                </div>

                {/* Content */}

                {isUser ? (

                    <div className="whitespace-pre-wrap leading-7">

                        {message.content}

                    </div>

                ) : (

                    <MarkdownMessage
                        content={message.content}
                    />

                )}

            </div>

            {/* User Avatar */}

            {isUser && (

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
                        bg-blue-600
                        shadow-lg
                    "
                >

                    <FaUserCircle className="text-white" />

                </div>

            )}

        </div>

    );

}