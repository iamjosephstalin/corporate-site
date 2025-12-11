
import React, { useEffect, useState, useRef, ReactNode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, ContactShadows, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import Lenis from "lenis";
import AIChat from "./components/AIChat";


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

const IconHealth = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const IconFintech = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
);

const IconEducation = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);

const IconManufacturing = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M6 22V12c0-1.1.9-2 2-2h3l2.5-4.5L16 10h2c1.1 0 2 .9 2 2v10" />
        <circle cx="12" cy="18" r="2" />
    </svg>
);

const IconCookie = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
        <path d="M11 17v.01" />
        <path d="M7 14v.01" />
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
            className={`will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
};

// --- UI Components ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentSection, setCurrentSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect current section
            const scrollPosition = window.scrollY + 100; // Offset for navbar

            // Check hero section (header element)
            if (scrollPosition < window.innerHeight * 0.8) {
                setCurrentSection('hero');
            } else {
                const sections = [
                    { id: 'about', element: document.getElementById('about') },
                    { id: 'expertise', element: document.getElementById('expertise') },
                    { id: 'services', element: document.getElementById('services') },
                    { id: 'process', element: document.getElementById('process') }
                ];

                for (const section of sections) {
                    if (section.element) {
                        const rect = section.element.getBoundingClientRect();
                        const elementTop = window.scrollY + rect.top;
                        const elementBottom = elementTop + rect.height;

                        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                            setCurrentSection(section.id);
                            break;
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get background based on current section
    const getMenuBackground = () => {
        switch (currentSection) {
            case 'hero':
                return 'bg-gradient-to-br from-blue-100/95 via-purple-50/95 to-white/95 backdrop-blur-xl';
            case 'about':
                return 'bg-paper/95 backdrop-blur-xl';
            case 'expertise':
                return 'bg-paper/95 backdrop-blur-xl';
            case 'services':
                return 'bg-paper/95 backdrop-blur-xl';
            case 'process':
                return 'bg-gradient-to-br from-stone-50/95 via-stone-100/95 to-paper/95 backdrop-blur-xl';
            default:
                return 'bg-paper/95 backdrop-blur-xl';
        }
    };

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
                <button className="md:hidden flex flex-col gap-1.5 items-end z-[9999] relative p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                    <span className={`h-0.5 bg-ink transition-all duration-300 ease-out ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-8'}`}></span>
                    <span className={`h-0.5 bg-ink transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : 'w-6'}`}></span>
                    <span className={`h-0.5 bg-ink transition-all duration-300 ease-out ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed top-0 left-0 w-full h-screen ${getMenuBackground()} z-[9998] transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            >
                <div
                    className="w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col items-center gap-6 sm:gap-8 p-4 text-center max-w-sm mx-auto">
                        {['About', 'Services', 'Process', 'Contact'].map((item, i) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className={`font-serif text-3xl sm:text-4xl text-ink hover:text-vermilion transition-all duration-300 transform block ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
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
        { name: "OpenAI", logo: "https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/openai.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
        { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
        { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
        { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
    ];

    return (
        <div className="w-full py-10 bg-white border-y border-stone/10 overflow-hidden relative z-20">
            <div className="flex w-max animate-[marquee_80s_linear_infinite]">
                {[...techs, ...techs, ...techs].map((tech, i) => (
                    <div key={i} className="flex items-center gap-3 mx-8 opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                        <img
                            src={tech.logo}
                            alt={`${tech.name} Logo`}
                            loading="lazy"
                            decoding="async"
                            className="w-8 h-8 object-contain"
                        />
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
        <header aria-label="Hero Section" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-32 md:pt-0">
            {/* Aurora Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-white z-0 animate-[gradient_10s_ease_infinite] background-size-[400%_400%]"></div>

            {/* High-Tech Background Image - Infinite Zoom Effect */}
            <div className="absolute inset-0 z-0 bg-white">
                {[0, 10].map((delay, i) => (
                    <motion.img
                        key={i}
                        src="/hero_bg.webp"
                        alt="Shichifuku Tekx AI & Digital Solutions Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 will-change-transform"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                            scale: [1, 1.5],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            delay: delay,
                            ease: "linear",
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/90 pointer-events-none"></div>
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
            desc: "Expert guidance for aligning AI initiatives with national visions and business KPIs. We provide roadmaps for ROI-driven technology adoption in the UAE and GCC.",
            items: ["Readiness Assessments", "ROI Roadmaps", "PoC Development", "Training"]
        },
        {
            title: "Custom AI & Machine Learning",
            subtitle: "Intelligent Systems Built for You",
            desc: "Development of bespoke models for linguistic nuances and complex datasets. Specialized in Arabic NLP, predictive analytics, and computer vision systems.",
            items: ["Arabic NLP", "Predictive Analytics", "Computer Vision", "Recommenders"]
        },
        {
            title: "Business Automation & Insights",
            subtitle: "Work Smarter, Decide Faster",
            desc: "End-to-end automation of repetitive workflows. We implement intelligent dashboards and chatbots to reduce operational overhead and improve decision speed.",
            items: ["Workflow Automation", "Dashboards", "AI Chatbots", "Smart CRM"]
        },
        {
            title: "AI-Integrated Development",
            subtitle: "Upgrade Without Disruption",
            desc: "Seamless integration of AI capabilities into existing digital ecosystems. We enhance legacy ERPs and mobile apps with on-device intelligence and smart features.",
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
            title: "Bespoke Digital Platforms & SaaS",
            desc: "Scalable web applications for critical enterprise operations. We use Next.js and React to build supplier management systems, B2B portals, and operational dashboards.",
            items: ["SaaS Development", "Next.js Customization", "Operational Web Apps", "B2B Portal Development", "System Integration", "React/Node.js"],
            gradient: "bg-gradient-to-br from-blue-400/40 via-transparent to-purple-500/40"
        },
        {
            title: "Native Mobile & Field Applications",
            desc: "Secure iOS and Android applications for field service digitization. Features include offline data capture, real-time synchronization, and executive performance monitoring.",
            items: ["Mobile Operations App", "Native iOS/Android", "Field Service Digitization", "Real-Time KPI Dashboards", "Secure Mobile Solutions"],
            gradient: "bg-gradient-to-br from-green-400/40 via-transparent to-teal-500/40"
        },
        {
            title: "Brand Identity & Experience Design",
            desc: "Strategic visual identity systems for B2B enterprises. We ensure design consistency across all digital touchpoints to build trust and authority.",
            items: ["B2B Brand Strategy", "UX/UI Design", "Corporate Identity", "Digital Experience (DX) Consulting", "Design for Trust"],
            gradient: "bg-gradient-to-br from-orange-400/40 via-transparent to-red-500/40"
        },
        {
            title: "AI Agent Development & Automation",
            desc: "Custom Large Language Model (LLM) applications and autonomous agents. We automate complex workflows using Python and verified Lean Six Sigma process mapping.",
            items: ["AI Agent Building", "LLM Development", "Process Mining", "Intelligent Automation", "Generative AI for Business", "RAG Architecture"],
            gradient: "bg-gradient-to-br from-indigo-400/40 via-transparent to-pink-500/40"
        },
        {
            title: "E-Commerce Operations Optimization",
            desc: "High-conversion B2B/B2C platforms with integrated supply chain logic. We focus on reducing cost-to-serve through inventory forecasting and automated fulfillment.",
            items: ["E-Commerce B2B/B2C", "Supply Chain Optimization", "Inventory Management AI", "Headless Commerce", "Fulfillment Process Improvement"],
            gradient: "bg-gradient-to-br from-yellow-400/40 via-transparent to-amber-500/40"
        },
        {
            title: "Digital Growth & Performance Strategy",
            desc: "Data-driven lifecycle optimization. We apply statistical process control to marketing and sales funnels to maximize Lead-to-Sale conversion rates.",
            items: ["Digital Growth Strategy", "Full-Funnel Optimization", "Marketing Automation", "Data-Driven Performance", "Customer Journey Analytics"],
            gradient: "bg-gradient-to-br from-cyan-400/40 via-transparent to-blue-500/40"
        },
        {
            title: "DevOps & MLOps Consulting",
            desc: "Automated CI/CD pipelines for secure software delivery. We integrate MLOps to ensure AI model stability, scalability, and ISO 27001 compliance.",
            items: ["DevOps Pipeline", "MLOps Strategy", "CI/CD Implementation", "Cloud Infrastructure", "Automated Testing", "Security by Design"],
            gradient: "bg-gradient-to-br from-slate-400/40 via-transparent to-emerald-500/40"
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
        <section className="py-20 px-6 md:px-12 bg-paper text-ink relative overflow-hidden z-20">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="mb-12">
                        <h2 className="font-serif text-4xl md:text-6xl mb-4 text-ink">Industry Solutions</h2>
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
                                transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                                className={`relative rounded-none overflow-hidden cursor-pointer group border-r border-stone/20 last:border-none ${isActive ? 'bg-stone/5' : 'bg-transparent'}`}
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

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: true,
        marketing: false
    });

    useEffect(() => {
        const consented = localStorage.getItem('cookie-consent');
        if (!consented) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        setPreferences({ essential: true, analytics: true, marketing: true });
        saveConsent();
    };

    const saveConsent = () => {
        localStorage.setItem('cookie-consent', 'true');
        localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
        setIsVisible(false);
        setShowPreferences(false);
    };

    if (!isVisible) return null;

    return (
        <>
            <AnimatePresence>
                {isVisible && !showPreferences && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[9999]"
                    >
                        <div className="bg-white/80 backdrop-blur-md border border-stone/10 p-6 rounded-2xl shadow-2xl shadow-stone/10">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2 bg-vermilion/10 rounded-full text-vermilion">
                                    <IconCookie className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-lg font-bold text-ink mb-1">We value your privacy</h4>
                                    <p className="font-sans text-sm text-stone leading-relaxed">
                                        We use cookies to enhance your browsing experience and analyze our traffic.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 bg-vermilion text-white font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-ink transition-colors"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={() => setShowPreferences(true)}
                                    className="px-4 border border-stone/20 text-stone font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-lg hover:border-vermilion hover:text-vermilion transition-colors"
                                >
                                    Preferences
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preferences Modal */}
            <AnimatePresence>
                {showPreferences && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
                            onClick={() => setShowPreferences(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-paper relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-stone/10">
                                <h3 className="font-serif text-2xl mb-2">Cookie Preferences</h3>
                                <p className="font-sans text-stone text-sm">Manage how we use data to improve your experience.</p>
                            </div>
                            <div className="p-8 space-y-6">
                                {/* Essential */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-bold text-ink mb-1">Essential</h5>
                                        <p className="text-xs text-stone">Required for the site to function.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-vermilion/20 rounded-full relative cursor-not-allowed">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-vermilion rounded-full" />
                                    </div>
                                </div>
                                {/* Analytics */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-bold text-ink mb-1">Analytics</h5>
                                        <p className="text-xs text-stone">Help us improve our website.</p>
                                    </div>
                                    <button
                                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${preferences.analytics ? 'bg-vermilion' : 'bg-stone/20'}`}
                                        aria-label="Toggle analytics cookies"
                                        aria-pressed={preferences.analytics}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${preferences.analytics ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>
                                {/* Marketing */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-bold text-ink mb-1">Marketing</h5>
                                        <p className="text-xs text-stone">Personalized recommendations.</p>
                                    </div>
                                    <button
                                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${preferences.marketing ? 'bg-vermilion' : 'bg-stone/20'}`}
                                        aria-label="Toggle marketing cookies"
                                        aria-pressed={preferences.marketing}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${preferences.marketing ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 bg-stone/5 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="px-6 py-2 text-sm font-sans font-bold text-stone hover:text-ink transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveConsent}
                                    className="px-8 py-2 bg-vermilion text-white text-sm font-sans font-bold rounded-lg hover:bg-ink transition-colors"
                                >
                                    Save Preferences
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const Team = () => {
    const team = [
        {
            name: "Nitika Jindal",
            role: "Chief AI & Operational Excellence Officer (CAIO)",
            bio: "The Architect of Intelligent Efficiency. Leads the integration of cutting-edge AI strategy with guaranteed quality and process rigor (Lean Six Sigma Black Belt, ISO 9001 Lead).",
        },
        {
            name: "Joseph Stalin",
            role: "Lead Solutions Architect & Next-Gen AI Engineer",
            bio: "The Core Force. Expert in end-to-end full-stack development (Python, Node.js, React, AWS) specializing in building and deploying custom, high-performance AI Agents and digital platforms.",
        },
        {
            name: "Anushiya G",
            role: "AI/ML Solutions Certified Engineer",
            bio: "The Data-to-Intelligence Translator. Specializes in designing and implementing AI/ML models and translating data insights into clear business intelligence using Power BI (Microsoft Certified AI-102).",
        },
        {
            name: "Juan Carlos Gracia",
            role: "Principal Consultant, Operational Excellence",
            bio: "The Master of Transformation. Drives client value by leading complex consulting engagements, specializing in process optimization, Lean methodologies, and high-impact operational redesign across industries.",
        },
        {
            name: "Harsh",
            role: "AI/Cloud Automation Specialist & Full Stack Developer",
            bio: "The Multi-Platform Catalyst. A certified engineer proficient in Cloud (AZ-900), AI/ML (AI-102), and full-stack development, leveraging the Power Platform to rapidly deliver scalable, cross-functional automation solutions.",
        }
    ];

    return (
        <section id="team" className="py-24 px-6 md:px-12 bg-paper text-ink border-b border-stone/10 section-fade min-h-[50vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <Reveal>
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone/20 pb-8">
                        <div>
                            <h2 className="font-serif text-5xl md:text-7xl mb-2">Leadership</h2>
                            <p className="font-sans text-stone uppercase tracking-widest text-sm">The Human Intelligence</p>
                        </div>
                        <div className="font-sans text-stone text-sm max-w-sm text-right hidden md:block">
                            Expertise bridging the gap between legacy enterprise systems and the future of Artificial Intelligence.
                        </div>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-24">
                    {team.map((member, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className="group flex flex-col h-full justify-between">
                                <div>
                                    <h3 className="font-serif text-3xl md:text-4xl text-ink mb-3 group-hover:text-vermilion transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="font-sans text-xs font-bold text-vermilion uppercase tracking-widest mb-6 border-b border-vermilion/20 pb-4 inline-block w-full">
                                        {member.role}
                                    </p>
                                    <p className="font-serif text-lg leading-relaxed text-ink/80">
                                        {member.bio}
                                    </p>
                                </div>
                                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <span className="text-xs font-sans uppercase tracking-wider text-stone flex items-center gap-2">
                                        View Profile <span className="text-vermilion">→</span>
                                    </span>
                                </div>
                            </div>
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

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        service: 'Strategy',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formState.name) newErrors.name = 'Name is required';
        if (!formState.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = 'Valid email is required';
        if (!formState.message) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };

    return (
        <section id="contact-form" className="py-20 px-6 md:px-12 bg-white relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <Reveal>
                    <div>
                        <span className="font-sans text-vermilion text-xs font-bold uppercase tracking-widest mb-6 block">Get in Touch</span>
                        <h2 className="font-serif text-4xl md:text-6xl text-ink mb-8">Ready to <span className="italic text-stone/40">Accelerate?</span></h2>
                        <p className="font-sans text-lg text-ink/70 leading-relaxed mb-12 max-w-md">
                            Whether you need a strategic AI audit or a full-scale digital transformation, our team in Ajman is ready to deploy.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-stone/5 text-vermilion">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h5 className="font-bold text-ink">Email Us</h5>
                                    <a href="mailto:contact@shichifukutekx.com" className="text-stone hover:text-vermilion transition-colors">contact@shichifukutekx.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-stone/5 text-vermilion">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h5 className="font-bold text-ink">Visit Us</h5>
                                    <p className="text-stone">Ajman Free Zone, UAE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-12 bg-stone/5 rounded-2xl border border-stone/10"
                            >
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h3 className="font-serif text-3xl text-ink mb-4">Message Received</h3>
                                <p className="text-stone max-w-xs">Thank you, {formState.name}. We will be in touch shortly.</p>
                                <button onClick={() => setStatus('idle')} className="mt-8 text-vermilion text-sm font-bold uppercase tracking-wider hover:underline">Send Another</button>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6 bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-stone/5 border border-stone/10"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-stone/60">Full Name *</label>
                                        <input
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            type="text"
                                            className={`w-full bg-stone/5 border-b-2 ${errors.name ? 'border-red-400' : 'border-stone/20 focus:border-vermilion'} outline-none px-4 py-3 transition-colors text-ink`}
                                            placeholder="John Doe"
                                            aria-label="Full Name"
                                        />
                                        {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-stone/60">Work Email *</label>
                                        <input
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            type="email"
                                            className={`w-full bg-stone/5 border-b-2 ${errors.email ? 'border-red-400' : 'border-stone/20 focus:border-vermilion'} outline-none px-4 py-3 transition-colors text-ink`}
                                            placeholder="john@company.com"
                                            aria-label="Work Email"
                                        />
                                        {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-stone/60">Company</label>
                                        <input
                                            name="company"
                                            value={formState.company}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full bg-stone/5 border-b-2 border-stone/20 focus:border-vermilion outline-none px-4 py-3 transition-colors text-ink"
                                            placeholder="Acme Corp"
                                            aria-label="Company Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-stone/60">Interest</label>
                                        <select
                                            name="service"
                                            value={formState.service}
                                            onChange={handleChange}
                                            className="w-full bg-stone/5 border-b-2 border-stone/20 focus:border-vermilion outline-none px-4 py-3 transition-colors text-ink"
                                            aria-label="Service Interest"
                                        >
                                            <option>AI Strategy & Consulting</option>
                                            <option>Custom AI Development</option>
                                            <option>Web & Mobile Apps</option>
                                            <option>Process Automation</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone/60">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full bg-stone/5 border-b-2 ${errors.message ? 'border-red-400' : 'border-stone/20 focus:border-vermilion'} outline-none px-4 py-3 transition-colors text-ink resize-none`}
                                        placeholder="Tell us about your project..."
                                        aria-label="Message"
                                    />
                                    {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                                </div>

                                <button
                                    disabled={status === 'submitting'}
                                    className="w-full bg-ink text-white font-sans font-bold uppercase tracking-widest py-4 hover:bg-vermilion transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
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
                            <a href="mailto:sales@shichifukutekx.ae" className="font-sans text-xl sm:text-2xl md:text-3xl text-ink hover:text-vermilion border-b border-ink hover:border-vermilion transition-all duration-300 pb-1 truncate max-w-full">
                                sales@shichifukutekx.ae
                            </a>
                            <a href="tel:+971585057791" className="font-sans text-lg text-stone hover:text-ink transition-colors mt-4 duration-300">
                                +971 58 505 7791
                            </a>
                        </div>
                    </div>
                </Reveal>

                <div className="flex flex-col justify-between items-start md:items-end w-full">
                    <Reveal delay={200} className="w-full md:w-auto">
                        <div className="bg-white p-6 md:p-8 border border-stone/10 w-full md:max-w-sm hover:shadow-lg transition-shadow duration-500">
                            <h4 className="font-sans font-bold uppercase tracking-widest mb-6 border-b border-stone/10 pb-2">Location</h4>
                            <address className="font-serif text-ink not-italic leading-relaxed">
                                Office - C1 - 1F - Sf10837<br />
                                Ajman Free Zone C1 Building<br />
                                United Arab Emirates
                            </address>
                        </div>
                    </Reveal>

                    <Reveal delay={400} className="hidden md:block">
                        <img
                            src="/logo.png"
                            alt="ShichifukuTekx Logo"
                            loading="lazy"
                            decoding="async"
                            className="w-32 h-auto mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500"
                        />
                    </Reveal>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-stone/10 font-sans text-xs uppercase tracking-wider text-stone">
                <div className="text-center md:text-left">© 2025 Shichifuku Tekx. All Rights Reserved.</div>
                <div className="flex gap-8">
                    {['Instagram', 'LinkedIn', 'Twitter'].map(link => (
                        <a key={link} href="#" className="hover:text-vermilion transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-vermilion hover:after:w-full after:transition-all after:duration-300">{link}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

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

const StructuredData = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ProfessionalService",
                "@id": "https://shichifukutekx.com/#organization",
                "name": "Shichifuku Tekx FZE",
                "url": "https://shichifukutekx.com",
                "logo": "https://shichifukutekx.com/logo.png",
                "image": "https://shichifukutekx.com/hero-image.jpg", // Add a real hero image URL here
                "description": "Shichifuku Tekx FZE: Transforming businesses in Dubai, UAE, Saudi Arabia, and the GCC with cutting-edge AI strategy, custom software development, and intelligent automation.",
                "priceRange": "$$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Office - C1 - 1F - Sf10837, Ajman Free Zone C1 Building",
                    "addressLocality": "Ajman",
                    "addressRegion": "Ajman",
                    "addressCountry": "AE",
                    "postalCode": "00000"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+971-58-505-7791",
                    "contactType": "sales",
                    "availableLanguage": ["en", "ar"]
                },
                // AI SEO POWER MOVE: Linking to Wikidata Entities
                "areaServed": [
                    {
                        "@type": "Country",
                        "name": "United Arab Emirates",
                        "sameAs": "https://www.wikidata.org/wiki/Q878"
                    },
                    {
                        "@type": "Country",
                        "name": "Saudi Arabia",
                        "sameAs": "https://www.wikidata.org/wiki/Q851"
                    },
                    {
                        "@type": "Place",
                        "name": "GCC",
                        "sameAs": "https://www.wikidata.org/wiki/Q217142"
                    }
                ],
                "sameAs": [
                    "https://www.linkedin.com/company/shichifukutekx",
                    "https://twitter.com/shichifukutekx",
                    "https://www.instagram.com/shichifukutekx"
                ],
                // Connects YOUR personal authority to the brand
                "founder": {
                    "@type": "Person",
                    "name": "Your Name Here",
                    "jobTitle": "Senior Full Stack Architect",
                    "sameAs": ["Your Personal LinkedIn URL"]
                },
                // Explicitly lists what you SELL (not just what you know)
                "makesOffer": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI Strategy & Consulting",
                            "description": "Strategic implementation of Artificial Intelligence for enterprise workflows."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Custom Software Development",
                            "description": "Full-stack development using Python, Laravel, and Node.js."
                        }
                    }
                ],
                "knowsAbout": [
                    "Artificial Intelligence",
                    "Software Development",
                    "Process Optimization",
                    "Machine Learning",
                    "Web Development",
                    "Mobile App Development",
                    "LLM Applications"
                ]
            },
            // Embedding FAQ directly in the graph connects it firmly to the Org
            {
                "@type": "FAQPage",
                "@id": "https://shichifukutekx.com/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What services does Shichifuku Tekx offer?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Shichifuku Tekx specializes in AI Strategy & Consulting, Custom AI & Machine Learning development, Business Automation, and AI-Integrated Web & Mobile App Development."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Which regions do you serve?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We primarily serve the GCC region, including Dubai (UAE), Saudi Arabia, Qatar, Oman, and Kuwait."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you offer custom AI solutions?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, we build bespoke AI solutions including Arabic NLP models, predictive analytics dashboards, and intelligent automation agents tailored to your business needs."
                        }
                    }
                ]
            }
        ]
    };


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
};

const App = () => {
    const [is3DVisible, setIs3DVisible] = useState(true);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleActivity = () => {
            setIs3DVisible(true);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => {
                setIs3DVisible(false);
            }, 2000); // Hide after 2 seconds of inactivity
        };

        // Listen for mouse move and scroll
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('scroll', handleActivity);

        // Initial trigger
        handleActivity();

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('scroll', handleActivity);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.07, // Smoother, buttery feel (lowered from 0.1)
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1.2,
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
            <StructuredData />
            <CustomCursor />

            {/* Global 3D Background - Foreground Layer */}
            <div
                className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000 ease-in-out ${is3DVisible ? 'opacity-90' : 'opacity-0'}`}
            >
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
                <Team />
                <Expertise />
                <Services />
                <IndustrySolutions />
                <Process />
                <Insights />
                <Contact />
                <Footer />
                <CookieConsent />
            </div>
        </main>
    );
};

// End of App component
export default App;
