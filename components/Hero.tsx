import React from "react";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

const Hero = () => {
    return (
        <header aria-label="Hero Section" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-32 md:pt-0">
            {/* Aurora Background */}
            {/* Aurora Background - Hardware Accelerated */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-blue-100 via-purple-50 to-white animate-[spin_60s_linear_infinite] opacity-60 will-change-transform"></div>
            </div>

            {/* High-Tech Background Image - Static */}
            <div className="absolute inset-0 z-0 bg-white">
                <img
                    src="/hero_bg.webp"
                    alt="Shichifuku Tekx AI & Digital Solutions Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-white/95 pointer-events-none"></div>
            </div>

            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-300/30 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-300/30 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>

            <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto">
                <Reveal>
                    <div className="flex items-center gap-4 mb-6 justify-center">
                        <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-ink/80 font-semibold drop-shadow-sm">ShichifukuTekx FZE</span>
                    </div>
                </Reveal>

                <Reveal delay={200} tag="h1" className="font-sans font-medium text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-ink/90 tracking-tight select-none mb-6 drop-shadow-sm">
                    Empowering Dubai, UAE Businesses with <span className="font-serif italic text-vermilion">Intelligent AI Solutions</span>
                </Reveal>

                <Reveal delay={300}>
                    <p className="font-sans text-lg md:text-xl text-ink/80 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-sm">
                        Innovation rooted in tradition. Technology designed for people. <br className="hidden md:block" /> Results built for growth.
                    </p>
                </Reveal>

                <Reveal delay={400}>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <a href="#contact" className="magnetic group relative px-10 py-5 overflow-hidden rounded-full bg-vermilion text-white shadow-[0_10px_40px_-10px_rgba(218,44,56,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(218,44,56,0.8)] hover:-translate-y-1 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                            <span className="relative font-sans text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                                Get Your Free AI Strategy Consultation
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </header>
    );
};

export default Hero;
