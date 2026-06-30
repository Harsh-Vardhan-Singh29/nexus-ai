import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
}

export default function GlassCard({
    children,
    className = "",
    delay = 0,
    hover = true,
}: GlassCardProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.45,
                delay,
            }}
            whileHover={
                hover
                    ? {
                          y: -6,
                          scale: 1.015,
                          transition: {
                              duration: 0.2,
                          },
                      }
                    : undefined
            }
            className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-xl
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:shadow-cyan-500/20
                ${className}
            `}
        >
            {/* Top glow */}
            <div
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-400/70
                    to-transparent
                "
            />

            {/* Soft radial glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-40
                    w-40
                    rounded-full
                    bg-cyan-400/10
                    blur-3xl
                "
            />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}