import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const Reveal: React.FC<{ children?: ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: delay / 1000, ease: [0.25, 1, 0.3, 1] }}
            className={`will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
