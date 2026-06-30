import { useEffect, useRef } from "react";
import { FaRobot, FaTrash } from "react-icons/fa";

import { useAI } from "../hooks/useAI";


import EmptyChat from "../components/ai/EmptyChat";
import ChatInput from "../components/ai/ChatInput";
import ChatMessage from "../components/ai/ChatMessage";
import TypingIndicator from "../components/ai/TypingIndicator";

export default function AI() {
    const {
        messages,
        loading,
        error,
        sendMessage,
        clearConversation,
    } = useAI();

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    return (
        <div className="mx-auto flex h-[calc(100vh-120px)] w-full max-w-7xl flex-col">

            {/* ================= HEADER ================= */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">

                            <FaRobot className="text-xl text-white" />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold text-white">

                                NEXUS AI Assistant

                            </h1>

                            <p className="text-sm text-emerald-400">

                                ● Gemini Connected

                            </p>

                        </div>

                    </div>

                    <p className="mt-3 text-slate-400">

                        Your intelligent productivity companion.

                    </p>

                </div>

                <button
                    onClick={clearConversation}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-red-500/40
                        bg-red-600/10
                        px-5
                        py-3
                        text-red-300
                        transition-all
                        hover:bg-red-600
                        hover:text-white
                    "
                >

                    <FaTrash />

                    Clear Chat

                </button>

            </div>

            {/* ================= CHAT CARD ================= */}

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-700
                    bg-gradient-to-b
                    from-slate-900
                    to-slate-950
                    shadow-2xl
                "
            >

                {/* ================= MESSAGES ================= */}

                <div
                    className="
                        flex-1
                        overflow-y-auto
                        px-8
                        py-8
                        space-y-6
                    "
                >

                    {messages.length === 0 ? (

                        <EmptyChat
                            onPromptClick={sendMessage}
                        />

                    ) : (

                        <>

                            {messages.map((message, index) => (

                                <ChatMessage
                                    key={index}
                                    message={message}
                                />

                            ))}

                            {loading && (

                                <TypingIndicator />

                            )}

                            <div ref={bottomRef} />

                        </>

                    )}

                </div>

                {/* ================= ERROR ================= */}

                {error && (

                    <div
                        className="
                            mx-6
                            mb-4
                            rounded-xl
                            border
                            border-red-500/30
                            bg-red-500/10
                            px-5
                            py-3
                            text-red-400
                        "
                    >

                        {error}

                    </div>

                )}

                {/* ================= INPUT ================= */}

                <div
                    className="
                        border-t
                        border-slate-700
                        bg-slate-950/80
                        backdrop-blur-xl
                        p-6
                    "
                >

                    <ChatInput

                        loading={loading}

                        onSend={sendMessage}

                    />

                </div>

            </div>

        </div>
    );
}