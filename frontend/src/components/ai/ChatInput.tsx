import { useRef, useState } from "react";
import {
    FaPaperPlane,
    FaMicrophone,
    FaPaperclip,
} from "react-icons/fa";

interface Props {
    loading: boolean;
    onSend: (message: string) => Promise<void>;
}

export default function ChatInput({
    loading,
    onSend,
}: Props) {
    const [message, setMessage] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    async function handleSend() {
        const text = message.trim();

        if (!text || loading) return;

        await onSend(text);

        setMessage("");

        if (textareaRef.current) {
            textareaRef.current.style.height = "56px";
        }
    }

    function handleChange(
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        setMessage(e.target.value);

        e.target.style.height = "56px";
        e.target.style.height =
            e.target.scrollHeight + "px";
    }

    return (
        <div className="flex items-end gap-3">

            {/* Attachment */}

            <button
                type="button"
                title="Coming Soon"
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    text-slate-400
                    transition
                    hover:border-cyan-500
                    hover:text-cyan-400
                "
            >
                <FaPaperclip />
            </button>

            {/* Input */}

            <div
                className="
                    flex-1
                    rounded-2xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-4
                    py-3
                    transition
                    focus-within:border-cyan-500
                    focus-within:ring-2
                    focus-within:ring-cyan-500/20
                "
            >
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={message}
                    onChange={handleChange}
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter" &&
                            !e.shiftKey
                        ) {
                            e.preventDefault();
                            handleSend();
                        }

                    }}
                    placeholder="Ask NEXUS AI anything..."
                    className="
                        max-h-48
                        min-h-[56px]
                        w-full
                        resize-none
                        overflow-y-auto
                        bg-transparent
                        text-white
                        outline-none
                        placeholder:text-slate-500
                    "
                />
            </div>

            {/* Voice */}

            <button
                type="button"
                title="Voice Assistant (Coming Soon)"
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    text-slate-400
                    transition
                    hover:border-cyan-500
                    hover:text-cyan-400
                "
            >
                <FaMicrophone />
            </button>

            {/* Send */}

            <button
                onClick={handleSend}
                disabled={loading}
                className="
                    flex
                    h-12
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    px-6
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    hover:scale-105
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                <FaPaperPlane />

                Send
            </button>

        </div>
    );
}