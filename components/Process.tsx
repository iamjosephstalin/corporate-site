import React from "react";
import Reveal from "./Reveal";
import { FocusCard } from "./Cards";

const Process = () => {
    const steps = [
        { id: "01", title: "Discovery", jp: "発見", desc: "We begin by listening. Understanding your market, your obstacles, and your goals." },
        { id: "02", title: "Strategy", jp: "戦略", desc: "We draft the blueprint. Defining the technology stack and the user journey." },
        { id: "03", title: "Execution", jp: "実行", desc: "The build phase. Rigorous coding, testing, and refining until perfection." },
        { id: "04", title: "Delivery", jp: "配達", desc: "Launch and handoff. We ensure your team is trained and the system is stable." }
    ];

    return (
        <section id="process" className="py-8 md:py-16 px-6 md:px-12 bg-stone/5 text-ink relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <Reveal>
                    <div className="text-center mb-16 md:mb-24">
                        <img src="/icon.png" alt="Process Icon" className="mb-6 md:mb-8 mx-auto w-16 h-16 object-contain opacity-80" />
                        <h2 className="font-serif text-4xl md:text-7xl mb-4">The Methodology</h2>
                        <p className="font-sans text-stone uppercase tracking-widest text-sm">From Chaos to Order</p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <Reveal key={i} delay={i * 100} className="h-full">
                            <FocusCard
                                id={step.id}
                                title={step.title}
                                jp={step.jp}
                                desc={step.desc}
                            />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
