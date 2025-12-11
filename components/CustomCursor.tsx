import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    // Smooth spring animation for cursor movement - Tuned for snappier feel
    const smoothX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
    const smoothY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button, .magnetic, input, textarea, select')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-vermilion pointer-events-none z-[100] mix-blend-difference will-change-transform"
            style={{
                x: smoothX,
                y: smoothY,
            }}
            animate={{
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? "#DA2C38" : "transparent"
            }}
            transition={{
                scale: { type: "spring", stiffness: 300, damping: 20 },
                backgroundColor: { duration: 0.2 }
            }}
        />
    );
};

export default CustomCursor;
