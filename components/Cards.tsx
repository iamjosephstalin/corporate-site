import React, { ReactNode, useRef, useState } from "react";
import { ArrowDiagonal } from "./Icons";

export const HolographicCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
    return (
        <div className={`group relative h-full bg-white rounded-2xl border border-stone/10 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(218,44,56,0.15)] hover:-translate-y-2 ${className}`}>
            {/* Tech Circuit Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #da2c38 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Animated Gradient Border */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vermilion/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-vermilion/0 group-hover:border-vermilion/50 transition-colors duration-500 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-vermilion/0 group-hover:border-vermilion/50 transition-colors duration-500 rounded-br-2xl" />

            <div className="relative z-10 p-8 h-full">
                {children}
            </div>
        </div>
    );
};

export const LiquidCard = ({ title, desc, num, tags, gradient }: { title: string, desc: string, num: string, tags: string[], gradient: string }) => {
    return (
        <div className="group relative h-full bg-white/50 backdrop-blur-sm border border-stone/10 overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
            <div className={`absolute inset-0 ${gradient} opacity-10 group-hover:opacity-100 transition-opacity duration-700`}></div>
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-60 group-hover:animate-shine" />

            <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <span className="font-serif text-3xl text-stone/20 group-hover:text-ink transition-colors duration-500">{num}</span>
                    <div className="p-2 rounded-full bg-white/50 border border-stone/10 group-hover:border-vermilion/30 transition-colors duration-300">
                        <ArrowDiagonal className="w-5 h-5 text-stone/40 group-hover:text-vermilion transition-colors duration-300" />
                    </div>
                </div>

                <div className="mb-auto">
                    <h3 className="font-serif text-2xl text-ink mb-4 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
                    <p className="font-sans text-stone text-sm leading-relaxed mb-8 group-hover:text-ink/80 transition-colors duration-300">{desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="font-sans text-[10px] uppercase tracking-wider px-2 py-1 border border-stone/10 bg-white/50 text-stone group-hover:border-vermilion/20 group-hover:text-vermilion transition-colors duration-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const TechGridCard = ({ icon, title, desc, tags }: { icon: string, title: string, desc: string, tags: string[] }) => {
    return (
        <div className="group relative h-full bg-white/60 backdrop-blur-md p-8 rounded-2xl border border-white/20 overflow-hidden hover:border-vermilion/50 transition-colors duration-500">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-vermilion opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-vermilion opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />

            <div className="relative z-10">
                <div className="text-4xl mb-6 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(218,44,56,0.5)] transition-all duration-500 inline-block">
                    {icon}
                </div>
                <h3 className="font-serif text-2xl mb-3 group-hover:text-vermilion transition-colors duration-300">{title}</h3>
                <p className="font-sans text-stone text-sm leading-relaxed mb-6">{desc}</p>

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="text-[10px] uppercase font-bold tracking-wider text-stone/60 group-hover:text-vermilion transition-colors duration-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const FocusCard = ({ id, title, jp, desc }: { id: string, title: string, jp: string, desc: string }) => {
    return (
        <div className="group relative p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 hover:border-vermilion/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full flex flex-col">
            {/* Bottom Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-vermilion transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* Watermark Number */}
            <div className="font-serif text-8xl text-stone/5 absolute -top-6 -right-6 group-hover:text-vermilion/5 transition-colors duration-500 select-none">
                {id}
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-baseline mb-6">
                    <h3 className="font-serif text-2xl text-ink group-hover:text-vermilion transition-colors duration-300">{title}</h3>
                    <span className="font-sans text-xs font-bold text-stone/60 uppercase tracking-wider group-hover:text-vermilion/60 transition-colors duration-300">{jp}</span>
                </div>
                <p className="font-sans text-stone text-sm leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
    );
};

export const SpotlightCard = ({ title, date, category, image }: { title: string, date: string, category: string, image: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            className="relative overflow-hidden rounded-xl border border-white/20 bg-white/60 backdrop-blur-md p-6 cursor-pointer group"
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(218, 44, 56, 0.5), transparent 40%)`,
                }}
            />
            <div className="relative z-10">
                <div className="aspect-[4/3] bg-stone/5 mb-6 overflow-hidden rounded-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone/5 to-stone/20 group-hover:scale-110 transition-transform duration-700"></div>
                    <img
                        src={image}
                        alt={`${title} - ${category} Report`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                </div>
                <div className="flex items-center gap-4 mb-3">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-vermilion bg-vermilion/5 px-2 py-1 rounded-full">{category}</span>
                    <span className="font-sans text-xs text-stone">{date}</span>
                </div>
                <h3 className="font-serif text-xl leading-tight group-hover:text-vermilion transition-colors duration-300">{title}</h3>
            </div>
        </div>
    );
};
