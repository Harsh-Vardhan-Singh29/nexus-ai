import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function AnimatedCard({
    children,
    delay = 0,
    className = "",
}: Props) {

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
                duration: 0.5,
                delay,
            }}

            whileHover={{
                y: -6,
                scale: 1.015,
            }}

            className={className}

        >

            {children}

        </motion.div>

    );

}