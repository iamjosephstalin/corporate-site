import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { IconHealth, IconFintech, IconEducation, IconManufacturing } from "./Icons";

const IndustrySolutions = () => {
    const [activeId, setActiveId] = useState<number | null>(0);
    const industries = [
        {
            title: "Healthcare",
            subtitle: "Predictive Care",
            desc: "AI-driven diagnostics and bilingual telemedicine platforms tailored for MENA.",
            gradient: "bg-gradient-to-b from-emerald-400/30 to-transparent",
            tools: ["Computer Vision", "PyTorch", "AWS HealthLake"],
            Icon: IconHealth
        },
        {
            title: "Fintech",
            subtitle: "Islamic Finance",
            desc: "Sharia-compliant algorithmic trading and fraud detection systems.",
            gradient: "bg-gradient-to-b from-blue-400/30 to-transparent",
            tools: ["Rust", "Blockchain", "Fraud Models"],
            Icon: IconFintech
        },
        {
            title: "Education",
            subtitle: "Adaptive Learning",
            desc: "Personalized AI tutors respecting cultural nuances and curriculum standards.",
            gradient: "bg-gradient-to-b from-orange-400/30 to-transparent",
            tools: ["NLP Algorithms", "Adaptive Engines", "React"],
            Icon: IconEducation
        },
        {
            title: "Manufacturing",
            subtitle: "Smart Factory",
            desc: "Computer vision for quality control and predictive maintenance.",
            gradient: "bg-gradient-to-b from-cyan-400/30 to-transparent",
            tools: ["IoT Sensors", "Edge AI", "OpenCV"],
            Icon: IconManufacturing
        },
    ];

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 bg-paper text-ink relative overflow-hidden z-20">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="mb-12">
                        <Reveal tag="h2" className="font-serif text-4xl md:text-6xl mb-4 text-ink">Industry Solutions</Reveal>
                        <p className="font-sans text-stone uppercase tracking-widest text-sm">Tailored for Key Sectors</p>
                    </div>
                </Reveal>

                <div className="flex flex-col md:flex-row h-[50vh] min-h-[400px] gap-4">
                    {industries.map((ind, i) => {
                        const isActive = activeId === i;
                        return (
                            <motion.div
                                key={i}
                                layout
                                onClick={() => setActiveId(i)}
                                animate={{ flex: isActive ? 3 : 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`relative rounded-none overflow-hidden cursor-pointer group border-r border-stone/20 last:border-none ${isActive ? 'bg-stone/5' : 'bg-transparent'} will-change-[flex]`}
                            >
                                {/* Background Gradient (Only visible when active) */}
                                <AnimatePresence mode="wait">
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className={`absolute inset-0 z-0 ${ind.gradient}`}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Background Icon (Animated) */}
                                <div className="absolute right-[-20%] bottom-[-20%] z-0 pointer-events-none opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500">
                                    <ind.Icon className="w-[400px] h-[400px] text-ink group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000 ease-in-out" />
                                </div>

                                <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                                    {/* Collapsed State: Vertical Text */}
                                    {!isActive && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <h3 className="font-serif text-2xl md:text-3xl text-stone/50 rotate-[-90deg] whitespace-nowrap tracking-widest group-hover:text-vermilion transition-colors">
                                                {ind.title}
                                            </h3>
                                        </div>
                                    )}

                                    {/* Expanded State: Content */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: 0.2, duration: 0.4 }}
                                            >
                                                <h3 className="font-serif text-4xl md:text-5xl text-ink mb-2">{ind.title}</h3>
                                                <p className="font-sans text-vermilion uppercase tracking-widest text-xs mb-6">{ind.subtitle}</p>
                                                <p className="font-sans text-stone text-lg leading-relaxed max-w-md">
                                                    {ind.desc}
                                                </p>
                                                <div className="mt-8 flex flex-wrap gap-2">
                                                    {ind.tools.map((tool, t) => (
                                                        <span key={t} className="px-3 py-1 border border-stone/20 text-[10px] font-sans uppercase tracking-wider text-ink/70 bg-white/50 backdrop-blur-sm hover:border-vermilion/50 transition-colors">
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default IndustrySolutions;
