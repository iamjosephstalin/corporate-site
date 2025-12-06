
import React, { useEffect, useState, useRef, ReactNode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, ContactShadows, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import Lenis from "lenis";

// --- Icons & Graphics ---

const Seal = ({ className = "" }: { className?: string }) => (
    <div className={`border-2 border-vermilion text-vermilion p-1 inline-flex items-center justify-center font-serif font-bold leading-none ${className}`}>
        <span className="block pt-1">福</span>
    </div>
);

const ArrowDiagonal = ({ className = "" }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);

const ArrowRight = ({ className = "" }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const Hexagon = ({ className = "" }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7L2 17L12 22L22 17L22 7L12 2Z" />
    </svg>
);

// --- Animation Components ---

const Reveal: React.FC<{ children?: ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: delay / 1000, ease: [0.25, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- UI Components ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 h-[65px] flex items-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] ${scrolled
                ? 'bg-white/70 backdrop-blur-lg shadow-sm border-b border-white/20'
                : 'bg-transparent'
                }`}
        >
            <div className="flex justify-between items-center w-full">
                <a href="#" className="flex flex-col gap-1 group">
                    <img src="/logo.png" alt="ShichifukuTekx" className="h-[50px] w-auto object-contain transform scale-150 origin-left" />
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-12 items-center">
                    {['About', 'Services', 'Process', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="font-sans text-xs font-medium uppercase tracking-widest text-ink hover:text-vermilion transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-vermilion hover:after:w-full after:transition-all after:duration-500 after:ease-[cubic-bezier(0.25,1,0.3,1)]">
                            {item}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden flex flex-col gap-1.5 items-end z-50 relative p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                    <span className={`h-0.5 bg-ink transition-all duration-300 ease-out ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-8'}`}></span>
                    <span className={`h-0.5 bg-ink transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : 'w-6'}`}></span>
                    <span className={`h-0.5 bg-ink transition-all duration-300 ease-out ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-paper/95 backdrop-blur-xl z-40 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center gap-8 p-4 text-center">
                    {['About', 'Services', 'Process', 'Contact'].map((item, i) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className={`font-serif text-4xl text-ink hover:text-vermilion transition-colors duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </nav >
    );
};

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button, .magnetic')) {
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
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-vermilion pointer-events-none z-[100] mix-blend-difference"
            animate={{
                x: position.x - 16,
                y: position.y - 16,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? "#DA2C38" : "transparent"
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        />
    );
};

// --- Advanced Card Components ---

const HolographicCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
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

const LiquidCard = ({ title, desc, num, tags, gradient }: { title: string, desc: string, num: string, tags: string[], gradient: string }) => {
    return (
        <div className="group relative h-full bg-white/50 backdrop-blur-sm border border-stone/10 overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-60 group-hover:animate-shine" />

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <span className="font-serif text-4xl text-stone/20 group-hover:text-vermilion transition-colors duration-500">{num}</span>
                        <div className="w-10 h-10 rounded-full border border-stone/20 flex items-center justify-center group-hover:bg-vermilion group-hover:border-vermilion transition-all duration-500">
                            <ArrowDiagonal className="text-stone group-hover:text-white" />
                        </div>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl mb-4 text-ink group-hover:text-vermilion transition-colors duration-300">{title}</h3>
                    <p className="font-sans text-stone text-sm leading-relaxed mb-8">{desc}</p>
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

const TechGridCard = ({ icon, title, desc, tags }: { icon: string, title: string, desc: string, tags: string[] }) => {
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

const FocusCard = ({ id, title, jp, desc }: { id: string, title: string, jp: string, desc: string }) => {
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

const SpotlightCard = ({ title, date, category, image }: { title: string, date: string, category: string, image: string }) => {
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
                    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
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

const ZenShape = () => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh scale={1.5}>
                <icosahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.6} // Increased for better transparency
                    thickness={1.5} // Increased thickness
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    ior={1.5}
                />
            </mesh>
        </Float>
    );
};

const Experience = () => {
    const crystalRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!crystalRef.current) return;

        // Calculate scroll progress (0 to 1)
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

        // Waypoints & Scale
        // 0.0 (Hero): Center Right, Big
        // 0.25 (About): Far Left, Small (avoid text)
        // 0.5 (Services): Top Right, Massive
        // 0.75 (Process): Center, Medium
        // 1.0 (Footer): Bottom Center, Giant

        // Constant Scale
        let targetScale = 1.0;
        let targetPos = new THREE.Vector3(2, 0, 0);
        let targetRot = new THREE.Euler(0, 0, 0);

        if (progress < 0.25) {
            // Hero -> About
            const t = progress / 0.25;
            targetPos.lerpVectors(new THREE.Vector3(3, 0, 0), new THREE.Vector3(-4, -2, 2), t);
            targetRot.set(0, t * Math.PI * 2, t * 0.5);
        } else if (progress < 0.5) {
            // About -> Services
            const t = (progress - 0.25) / 0.25;
            targetPos.lerpVectors(new THREE.Vector3(-4, -2, 2), new THREE.Vector3(3.5, 2, -1), t);
            targetRot.set(t * Math.PI, Math.PI * 2 + t * Math.PI, 0.5 + t);
        } else if (progress < 0.75) {
            // Services -> Process
            const t = (progress - 0.5) / 0.25;
            targetPos.lerpVectors(new THREE.Vector3(3.5, 2, -1), new THREE.Vector3(0, 0, 3.5), t);
            targetRot.set(Math.PI + t, Math.PI * 3 + t * Math.PI * 2, 1.5 - t);
        } else {
            // Process -> Footer
            const t = (progress - 0.75) / 0.25;
            targetPos.lerpVectors(new THREE.Vector3(0, 0, 3.5), new THREE.Vector3(0, -1, 1), t);
            targetRot.set(Math.PI * 2 + t, Math.PI * 5 + t * Math.PI, 0.5);
        }

        // Smoothly interpolate current position/rotation/scale to target
        crystalRef.current.position.lerp(targetPos, 0.08);
        crystalRef.current.scale.setScalar(THREE.MathUtils.lerp(crystalRef.current.scale.x, targetScale, 0.08));

        // Manual rotation interpolation
        crystalRef.current.rotation.x = THREE.MathUtils.lerp(crystalRef.current.rotation.x, targetRot.x, 0.08);
        crystalRef.current.rotation.y = THREE.MathUtils.lerp(crystalRef.current.rotation.y, targetRot.y, 0.08);
        crystalRef.current.rotation.z = THREE.MathUtils.lerp(crystalRef.current.rotation.z, targetRot.z, 0.08);

        // Constant spin
        crystalRef.current.rotation.y += 0.005;
    });

    return (
        <group ref={crystalRef}>
            <ZenShape />
        </group>
    );
};

const TechMarquee = () => {
    const techs = [
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "OpenAI", logo: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
        { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
        { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
        { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/000000" },
        { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ];

    return (
        <div className="w-full py-10 bg-white border-y border-stone/10 overflow-hidden relative z-20">
            <div className="flex w-max animate-[marquee_80s_linear_infinite]">
                {[...techs, ...techs, ...techs].map((tech, i) => (
                    <div key={i} className="flex items-center gap-3 mx-8 opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                        <img src={tech.logo} alt={tech.name} className="w-8 h-8 object-contain" />
                        <span className="font-sans text-lg text-ink/80 font-medium tracking-wide">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Hero = () => {
    return (
        <header className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-32 md:pt-0">
            {/* Aurora Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-white z-0 animate-[gradient_10s_ease_infinite] background-size-[400%_400%]"></div>

            {/* High-Tech Background Image */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <img src="/hero_bg.png" alt="AI Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/90"></div>
            </div>

            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-300/30 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-300/30 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>

            <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto">
                <Reveal>
                    <div className="flex items-center gap-4 mb-6 justify-center">
                        <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-ink/60 font-semibold">ShichifukuTekx FZE</span>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <h1 className="font-sans font-medium text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-ink/90 tracking-tight select-none mb-6">
                        Empowering Dubai, UAE Businesses with <span className="font-serif italic text-vermilion">Intelligent AI Solutions</span>
                    </h1>
                </Reveal>

                <Reveal delay={300}>
                    <p className="font-sans text-lg md:text-xl text-ink/70 max-w-2xl mx-auto leading-relaxed mb-10">
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

            <div className="absolute bottom-12 left-0 w-full text-center">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink/40 animate-bounce">Scroll</span>
            </div>
        </header>
    );
};

const About = () => {
    return (
        <section id="about" className="py-10 md:py-20 px-6 md:px-12 bg-paper relative">
            <div className="hidden md:block absolute top-0 left-6 md:left-12 w-[1px] h-32 bg-gradient-to-b from-ink/20 to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
                <div className="relative">
                    {/* Decorative circle */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 border border-stone/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none hidden md:block"></div>
                    <Reveal>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-8">
                            The Logic<br />Behind Luck
                        </h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="space-y-6 font-sans text-stone text-base md:text-lg leading-relaxed relative z-10 bg-paper/50 backdrop-blur-sm">
                            <p>
                                <strong className="text-ink font-medium">Shichifuku (七福)</strong> refers to the seven gods of fortune. In the digital age, fortune is not random—it is engineered.
                            </p>
                            <p>
                                We are a foundry of developers, designers, and strategists bridging the gap between traditional wisdom and algorithmic precision. Based in the heart of Dubai, we build systems that scale, endure, and prosper.
                            </p>
                            <a href="#contact" className="inline-block mt-4 font-sans text-sm uppercase tracking-widest text-vermilion hover:text-ink transition-colors duration-300 border-b border-vermilion pb-1">
                                Learn More About Us
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
        </section>
    );
};

const ServiceCard: React.FC<{ num: string, title: string, desc: string, tags: string[] }> = ({ num, title, desc, tags }) => (
    <div className="group bg-white/50 backdrop-blur-sm p-8 md:p-10 lg:p-12 border border-stone/10 hover:border-vermilion transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] relative overflow-hidden h-full flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-stone/10 hover:-translate-y-2">
        <div className="absolute top-0 right-0 w-32 h-32 bg-vermilion/5 rounded-bl-[120px] -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-1000 ease-out"></div>

        <div>
            <div className="flex justify-between items-start mb-6 md:mb-8">
                <span className="font-serif text-3xl md:text-4xl text-stone/20 group-hover:text-ink transition-colors duration-500">{num}</span>
                <Hexagon className="text-vermilion opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4 break-words leading-tight">{title}</h3>
            <p className="font-sans text-stone text-sm leading-relaxed mb-8 group-hover:text-ink/80 transition-colors duration-500">{desc}</p>
        </div>

        <div>
            <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag, i) => (
                    <span key={i} className="font-sans text-[10px] uppercase tracking-wider border border-stone/20 px-2 py-1 text-stone group-hover:border-vermilion/30 group-hover:text-vermilion bg-paper/50 transition-all duration-300">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="w-full h-[1px] bg-stone/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-vermilion -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.3,1)]"></div>
            </div>
        </div>
    </div>
);

const Expertise = () => {
    const serviceCategories = [
        {
            title: "AI Strategy & Consulting",
            subtitle: "Your Roadmap to Intelligent Growth",
            desc: "Many companies invest in AI but fail to see returns because of poor planning. We help business leaders in the UAE, Saudi Arabia, Qatar, Oman, and Kuwait craft actionable AI strategies aligned with national visions and real business goals.",
            items: ["Readiness Assessments", "ROI Roadmaps", "PoC Development", "Training"]
        },
        {
            title: "Custom AI & Machine Learning",
            subtitle: "Intelligent Systems Built for You",
            desc: "We build intelligent systems that understand your people, your culture, and your business needs. From predictive models to natural language processing, we create bespoke solutions.",
            items: ["Arabic NLP", "Predictive Analytics", "Computer Vision", "Recommenders"]
        },
        {
            title: "Business Automation & Insights",
            subtitle: "Work Smarter, Decide Faster",
            desc: "Stop wasting time on repetitive tasks. Let AI handle it while you focus on growth. We automate workflows and provide real-time insights for better decision-making.",
            items: ["Workflow Automation", "Dashboards", "AI Chatbots", "Smart CRM"]
        },
        {
            title: "AI-Integrated Development",
            subtitle: "Upgrade Without Disruption",
            desc: "Already running digital systems? We enhance them with AI intelligence. Whether it's a legacy ERP or a modern mobile app, we inject smart capabilities seamlessly.",
            items: ["ERP Integration", "App Enhancements", "Flutter AI Apps", "On-device AI"]
        }
    ];

    return (
        <section id="expertise" className="py-10 md:py-20 px-6 md:px-12 bg-paper text-ink relative z-20">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="text-center mb-20">
                        <img src="/icon.png" alt="Expertise Icon" className="mb-6 mx-auto w-16 h-16 object-contain opacity-80" />
                        <h2 className="font-serif text-4xl md:text-6xl mb-4">AI Expertise</h2>
                        <p className="font-sans text-stone uppercase tracking-widest text-sm">Intelligent Solutions</p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {serviceCategories.map((cat, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <HolographicCard className="h-full">
                                <div className="h-full flex flex-col">
                                    <h3 className="font-serif text-2xl md:text-3xl mb-2 group-hover:text-vermilion transition-colors">{cat.title}</h3>
                                    <p className="font-sans text-sm font-bold text-ink/60 uppercase tracking-wide mb-6">{cat.subtitle}</p>
                                    <p className="font-sans text-stone leading-relaxed mb-8">{cat.desc}</p>
                                    <ul className="space-y-3 border-t border-ink/5 pt-6 mt-auto">
                                        {cat.items.map((item, j) => (
                                            <li key={j} className="flex items-center gap-3 font-sans text-ink/80 text-sm group-hover:translate-x-1 transition-transform duration-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-vermilion"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </HolographicCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    const serviceCategories = [
        {
            title: "Web Platforms",
            desc: "Bespoke digital environments. We craft high-performance websites using Next.js and WebGL that serve as your 24/7 global embassy.",
            items: ["React", "Next.js", "Three.js"],
            gradient: "bg-gradient-to-br from-blue-400/40 via-transparent to-purple-500/40"
        },
        {
            title: "Mobile Apps",
            desc: "Native iOS and Android ecosystems. Seamless, intuitive, and robust applications that place your brand in the user's hand.",
            items: ["React Native", "Swift", "Kotlin"],
            gradient: "bg-gradient-to-br from-green-400/40 via-transparent to-teal-500/40"
        },
        {
            title: "Brand Identity",
            desc: "Visual storytelling. From logo design to comprehensive style guides, we forge identities that command respect and trust.",
            items: ["Strategy", "Design", "Typography"],
            gradient: "bg-gradient-to-br from-orange-400/40 via-transparent to-red-500/40"
        },
        {
            title: "AI Integration",
            desc: "Operational intelligence. Implementing LLMs and automation scripts to reduce overhead and multiply output.",
            items: ["OpenAI", "Python", "Automation"],
            gradient: "bg-gradient-to-br from-indigo-400/40 via-transparent to-pink-500/40"
        },
        {
            title: "E-Commerce",
            desc: "Digital marketplaces. Secure, high-conversion storefronts designed to maximize average order value.",
            items: ["Shopify", "Stripe", "Custom"],
            gradient: "bg-gradient-to-br from-yellow-400/40 via-transparent to-amber-500/40"
        },
        {
            title: "Digital Growth",
            desc: "Growth signals. Data-driven campaigns that target the right audience with surgical precision.",
            items: ["SEO", "PPC", "Analytics"],
            gradient: "bg-gradient-to-br from-cyan-400/40 via-transparent to-blue-500/40"
        }
    ];

    return (
        <section id="services" className="py-10 md:py-20 px-6 md:px-12 bg-paper text-ink relative z-20">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="text-center mb-20">
                        <img src="/icon.png" alt="Services Icon" className="mb-6 mx-auto w-16 h-16 object-contain opacity-80" />
                        <h2 className="font-serif text-4xl md:text-6xl mb-4">Digital Services</h2>
                        <p className="font-sans text-stone uppercase tracking-widest text-sm">Web & Mobile Development</p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {serviceCategories.map((cat, i) => (
                        <Reveal key={i} delay={i * 100} className="h-full">
                            <LiquidCard
                                num={`0${i + 1}`}
                                title={cat.title}
                                desc={cat.desc}
                                tags={cat.items}
                                gradient={cat.gradient}
                            />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const IndustrySolutions = () => {
    const industries = [
        {
            title: "Healthcare AI",
            desc: "Revolutionizing patient care with predictive diagnostics and bilingual telemedicine platforms tailored for the MENA region.",
            icon: "🏥",
            tags: ["Diagnostics", "Telemedicine", "Patient Analytics"]
        },
        {
            title: "Fintech AI",
            desc: "Secure, Sharia-compliant algorithmic trading and fraud detection systems designed for the next generation of Islamic Finance.",
            icon: "💳",
            tags: ["Algorithmic Trading", "Fraud Detection", "Compliance"]
        },
        {
            title: "EdTech AI",
            desc: "Personalized learning experiences powered by adaptive algorithms that respect cultural nuances and curriculum standards.",
            icon: "🎓",
            tags: ["Adaptive Learning", "AI Tutors", "Performance Tracking"]
        },
        {
            title: "Manufacturing AI",
            desc: "Smart factory solutions utilizing computer vision for quality control and predictive maintenance to minimize downtime.",
            icon: "🏭",
            tags: ["Predictive Maintenance", "Quality Control", "IoT Integration"]
        },
    ];

    return (
        <section className="py-10 md:py-20 px-6 md:px-12 bg-stone/5 relative overflow-hidden z-20">
            <div className="max-w-7xl mx-auto relative z-10">
                <Reveal>
                    <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-ink/10 pb-8">
                        <div>
                            <h2 className="font-serif text-4xl md:text-6xl mb-4 text-ink">Industry Solutions</h2>
                            <p className="font-sans text-stone uppercase tracking-widest text-sm">Tailored for Key Sectors</p>
                        </div>
                        <p className="font-sans text-stone max-w-md text-sm md:text-base leading-relaxed">
                            We understand that every industry has unique challenges. Our AI solutions are customized to meet the specific demands of your sector.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {industries.map((ind, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <TechGridCard
                                icon={ind.icon}
                                title={ind.title}
                                desc={ind.desc}
                                tags={ind.tags}
                            />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Insights = () => {
    const posts = [
        {
            title: "The Rise of AI-Powered Business Automation in the GCC",
            date: "2025",
            category: "Automation",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Manufacturing Meets AI: Smart Factories in the Middle East",
            date: "2025",
            category: "Industry 4.0",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Ethical AI in the Middle East: Balancing Innovation & Values",
            date: "2025",
            category: "Ethics",
            image: "/blog_ethical_ai.png"
        },
    ];

    return (
        <section className="py-10 md:py-20 px-6 md:px-12 bg-paper text-ink relative z-20">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="font-serif text-3xl md:text-5xl mb-4">Latest Insights</h2>
                            <p className="font-sans text-stone uppercase tracking-widest text-sm">Trends & Analysis</p>
                        </div>
                        <a href="#" className="hidden md:block font-sans text-sm uppercase tracking-widest hover:text-vermilion transition-colors">View All &rarr;</a>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <SpotlightCard
                                title={post.title}
                                date={post.date}
                                category={post.category}
                                image={post.image}
                            />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Process = () => {
    const steps = [
        { id: "01", title: "Discovery", jp: "発見", desc: "We begin by listening. Understanding your market, your obstacles, and your goals." },
        { id: "02", title: "Strategy", jp: "戦略", desc: "We draft the blueprint. Defining the technology stack and the user journey." },
        { id: "03", title: "Execution", jp: "実行", desc: "The build phase. Rigorous coding, testing, and refining until perfection." },
        { id: "04", title: "Delivery", jp: "配達", desc: "Launch and handoff. We ensure your team is trained and the system is stable." }
    ];

    return (
        <section id="process" className="py-10 md:py-20 px-6 md:px-12 bg-stone/5 text-ink relative overflow-hidden">
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

const Footer = () => {
    return (
        <footer id="contact" className="bg-paper pt-20 md:pt-32 pb-12 px-6 md:px-12 border-t border-stone/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
                <Reveal>
                    <div>
                        <span className="font-sans text-xs text-vermilion uppercase tracking-widest mb-4 block">Contact Us</span>
                        <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl text-ink leading-[0.9] mb-8 md:mb-12 break-words">
                            Let's Build<br /><span className="italic text-stone">Fortune.</span>
                        </h2>

                        <div className="flex flex-col gap-2 items-start overflow-hidden">
                            <a href="mailto:hello@shichifukutekx.ae" className="font-sans text-xl sm:text-2xl md:text-3xl text-ink hover:text-vermilion border-b border-ink hover:border-vermilion transition-all duration-300 pb-1 truncate max-w-full">
                                hello@shichifukutekx.ae
                            </a>
                            <a href="tel:+971500000000" className="font-sans text-lg text-stone hover:text-ink transition-colors mt-4 duration-300">
                                +971 50 000 0000
                            </a>
                        </div>
                    </div>
                </Reveal>

                <div className="flex flex-col justify-between items-start md:items-end w-full">
                    <Reveal delay={200} className="w-full md:w-auto">
                        <div className="bg-white p-6 md:p-8 border border-stone/10 w-full md:max-w-sm hover:shadow-lg transition-shadow duration-500">
                            <h4 className="font-sans font-bold uppercase tracking-widest mb-6 border-b border-stone/10 pb-2">Location</h4>
                            <address className="font-serif text-ink not-italic leading-relaxed">
                                Dubai Design District (d3)<br />
                                Building 7, Office 401<br />
                                Dubai, United Arab Emirates
                            </address>
                        </div>
                    </Reveal>

                    <Reveal delay={400} className="hidden md:block">
                        <img src="/logo.png" alt="ShichifukuTekx" className="w-32 h-auto mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500" />
                    </Reveal>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-stone/10 font-sans text-xs uppercase tracking-wider text-stone">
                <div className="text-center md:text-left">© 2024 Shichifuku Tekx. All Rights Reserved.</div>
                <div className="flex gap-8">
                    {['Instagram', 'LinkedIn', 'Twitter'].map(link => (
                        <a key={link} href="#" className="hover:text-vermilion transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-vermilion hover:after:w-full after:transition-all after:duration-300">{link}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

const WhoWeAre = () => {
    return (
        <section id="about" className="py-10 md:py-20 px-6 md:px-12 bg-paper text-ink relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Left Column - Vision */}
                <div className="relative z-10">
                    <Reveal>
                        <h2 className="font-serif text-4xl md:text-6xl mb-8">Who We Are</h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="font-sans text-lg md:text-xl leading-relaxed text-ink/80 mb-8">
                            At ShichifukuTekx FZE, we believe that artificial intelligence should not just be powerful—it should be practical, profitable, and culturally relevant.
                        </p>
                        <p className="font-sans text-lg md:text-xl leading-relaxed text-ink/80">
                            Founded with a vision to make AI accessible to every business, today we are a trusted partner for 200+ organizations in Dubai and across the Middle East and worldwide. From Dubai’s innovation hubs to Saudi Arabia’s Vision 2030 projects, we deliver AI that respects local values while driving global competitiveness.
                        </p>
                    </Reveal>
                </div>

                {/* Right Column - Why Choose Us */}
                <div className="relative z-10">
                    <Reveal delay={300}>
                        <h3 className="font-sans font-bold text-2xl md:text-3xl mb-10 text-vermilion">Why Dubai, UAE Businesses Choose Us</h3>
                    </Reveal>

                    <div className="space-y-10">
                        <Reveal delay={400}>
                            <div>
                                <h4 className="font-serif text-xl font-bold mb-2">Global Expertise + Local Understanding</h4>
                                <p className="font-sans text-ink/70 leading-relaxed">Deep knowledge of Gulf business culture, Islamic finance, and regional regulations.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={500}>
                            <div>
                                <h4 className="font-serif text-xl font-bold mb-2">Proven Results</h4>
                                <p className="font-sans text-ink/70 leading-relaxed">Clients report 40% efficiency gains and 30–50% reduction in manual work within the first year.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={600}>
                            <div>
                                <h4 className="font-serif text-xl font-bold mb-2">Security & Compliance First</h4>
                                <p className="font-sans text-ink/70 leading-relaxed">Certified in ISO 27001 & SOC 2 Type II, ensuring full data protection.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={700}>
                            <div>
                                <h4 className="font-serif text-xl font-bold mb-2">Cultural Intelligence Built-In</h4>
                                <p className="font-sans text-ink/70 leading-relaxed">AI solutions optimized for Arabic NLP, Islamic compliance, and Gulf business practices.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

const App = () => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1, // Snappy response
            duration: 1.2,
            smoothWheel: true,
        });
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main className="w-full bg-paper text-ink font-sans selection:bg-vermilion selection:text-paper overflow-x-hidden antialiased cursor-none relative">
            <CustomCursor />

            {/* Global 3D Background - Foreground Layer */}
            <div className="fixed inset-0 z-40 pointer-events-none opacity-90">
                <Canvas style={{ pointerEvents: 'none' }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                    <Environment preset="city" />
                    <Experience />
                    {/* <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#000000" /> */}
                </Canvas>
            </div>

            <div className="relative z-10">
                <Navbar />
                <Hero />
                <TechMarquee />
                <WhoWeAre />
                <Expertise />
                <Services />
                <IndustrySolutions />
                <Process />
                <Insights />
                <Footer />
            </div>
        </main>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
