import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
}

export default function SectionHeader({
    title,
    subtitle,
    icon,
}: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 12,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.4,
            }}
            className="mb-6"
        >
            <div className="flex items-center gap-3">

                {icon && (
                    <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                        {icon}
                    </div>
                )}

                <div>

                    <h2 className="text-2xl font-bold tracking-tight text-white">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-400">
                            {subtitle}
                        </p>
                    )}

                </div>

            </div>
        </motion.div>
    );
}