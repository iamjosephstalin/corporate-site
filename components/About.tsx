import React from "react";
import Reveal from "./Reveal";

const About = () => {
    return (
        <section id="about" className="py-8 md:py-16 px-6 md:px-12 bg-paper relative">
            <div className="hidden md:block absolute top-0 left-6 md:left-12 w-[1px] h-32 bg-gradient-to-b from-ink/20 to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
                <div className="relative">
                    {/* Decorative circle */}
                    <div aria-hidden="true" className="absolute -top-20 -left-20 w-64 h-64 border border-stone/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none hidden md:block"></div>
                    <Reveal>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-8">
                            The Logic<br />Behind Luck
                        </h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="space-y-6 font-sans text-stone text-base md:text-lg leading-relaxed relative z-10 bg-paper/50 backdrop-blur-sm">
                            <p>
                                <strong className="text-ink font-medium">Shichifuku Tekx FZE</strong> is an AI and software development firm based in Ajman, UAE, serving the greater GCC region.
                            </p>
                            <p>
                                We specialize in Python-based AI agents, enterprise automation, and secure cloud architecture. Our mission is to bridge traditional business wisdom with algorithmic precision, delivering systems that are scalable, compliant, and profitable.
                            </p>
                            <a href="#contact" className="inline-block mt-4 font-sans text-sm uppercase tracking-widest text-vermilion hover:text-ink transition-colors duration-300 border-b border-vermilion pb-1">
                                Contact Our Team
                            </a>
                        </div>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 gap-8 md:gap-12 mt-10 md:mt-0">
                    {[
                        { title: "Precision", kanji: "精", desc: "Code quality that rivals Swiss horology." },
                        { title: "Harmony", kanji: "和", desc: "Design systems that breathe and flow." },
                        { title: "Longevity", kanji: "寿", desc: "Future-proof architectures built to last." }
                    ].map((item, i) => (
                        <Reveal key={i} delay={300 + (i * 100)}>
                            <div className="flex gap-6 group hover:pl-6 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] border-b border-stone/20 pb-8 cursor-default">
                                <div className="font-serif text-4xl text-stone/20 group-hover:text-vermilion transition-colors duration-500">
                                    {item.kanji}
                                </div>
                                <div>
                                    <h3 className="font-sans text-xl font-bold uppercase tracking-wide text-ink mb-2">{item.title}</h3>
                                    <p className="font-sans text-stone text-sm">{item.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default About;
