import React from "react";
import Reveal from "./Reveal";
import { Seal } from "./Icons";

const FeatureCard = ({ title, desc, delay }: { title: string, desc: string, delay: number }) => (
    <Reveal delay={delay} className="h-full">
        <div className="h-full p-8 bg-white/50 backdrop-blur-sm border border-stone/10 rounded-2xl hover:border-vermilion/30 hover:shadow-xl hover:shadow-stone/5 transition-all duration-300 group">
            <div className="w-2 h-2 bg-vermilion rounded-full mb-6 group-hover:scale-[2] transition-transform duration-500" />
            <h4 className="font-serif text-xl font-bold mb-3 text-ink group-hover:translate-x-1 transition-transform duration-300">{title}</h4>
            <p className="font-sans text-sm text-stone leading-relaxed group-hover:text-ink/70 transition-colors duration-300">{desc}</p>
        </div>
    </Reveal>
);

const WhoWeAre = () => {
    return (
        <section id="about" className="py-20 md:py-32 px-6 md:px-12 bg-paper text-ink relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left Column - Manifesto */}
                <Reveal>
                    <div className="relative z-10">
                        <span className="font-sans text-vermilion text-xs font-bold uppercase tracking-widest mb-6 block">Our DNA</span>
                        <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-8">
                            Bridging the <br />
                            <span className="text-stone/30 italic">Global Gap.</span>
                        </h2>
                        <p className="font-sans text-lg md:text-xl leading-relaxed text-ink/80 mb-8 max-w-lg">
                            Shichifuku Tekx operates from the <span className="font-bold text-ink">Ajman Free Zone</span>, fusing Japanese precision with Gulf business intelligence. We don't just build software; we engineer digital sovereignty.
                        </p>
                        <div className="flex items-center gap-4">
                            <Seal className="scale-75 origin-left" />
                            <span className="font-sans text-[10px] uppercase tracking-widest text-stone/60">ISO 27001 Certified System</span>
                        </div>
                    </div>
                </Reveal>

                {/* Right Column - Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <FeatureCard
                        delay={100}
                        title="Global Standards"
                        desc="World-class code quality meeting GCC regulatory compliance and international security benchmarks."
                    />
                    <FeatureCard
                        delay={200}
                        title="Local Insight"
                        desc="Deep understanding of Islamic Finance, Arabic NLP complexities, and regional business etiquette."
                    />
                    <FeatureCard
                        delay={300}
                        title="Proven Impact"
                        desc="Clients report 40% efficiency gains and drastic reductions in manual processing times."
                    />
                    <FeatureCard
                        delay={400}
                        title="Data Sovereignty"
                        desc="Secure, localized hosting strategies ensuring your sensitive data never leaves the region appropriately."
                    />
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
