import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import Lenis from "lenis";

// Components (Above the fold - Imported directly)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import StructuredData from "./components/StructuredData";
import AIChat from "./components/AIChat";
import Experience from "./components/Experience"; // 3D Component

// Lazy Loaded Components (Below the fold)
const TechMarquee = lazy(() => import("./components/TechMarquee"));
const WhoWeAre = lazy(() => import("./components/WhoWeAre"));
const Team = lazy(() => import("./components/Team"));
const Expertise = lazy(() => import("./components/Expertise"));
const Services = lazy(() => import("./components/Services"));
const IndustrySolutions = lazy(() => import("./components/IndustrySolutions"));
const Process = lazy(() => import("./components/Process"));
const Insights = lazy(() => import("./components/Insights"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));

const App = () => {
    const [is3DVisible, setIs3DVisible] = useState(true);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let lastActivity = Date.now();

        const handleActivity = () => {
            const now = Date.now();
            if (now - lastActivity > 100) { // Throttle to 100ms
                setIs3DVisible(true);
                lastActivity = now;

                if (idleTimer.current) clearTimeout(idleTimer.current);
                idleTimer.current = setTimeout(() => {
                    setIs3DVisible(false);
                }, 2000);
            }
        };

        // Listen for mouse move and scroll
        window.addEventListener('mousemove', handleActivity, { passive: true });
        window.addEventListener('scroll', handleActivity, { passive: true });

        // Initial trigger
        setIs3DVisible(true);
        idleTimer.current = setTimeout(() => {
            setIs3DVisible(false);
        }, 2000);

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('scroll', handleActivity);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05, // Lower for more butter/weight
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        // Optimization: Use separate function for rAF to avoid creating closures
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const frameId = requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <main className="w-full bg-paper text-ink font-sans selection:bg-vermilion selection:text-paper overflow-x-hidden antialiased cursor-none relative">
            <StructuredData />
            <CustomCursor />

            {/* Global 3D Background - Foreground Layer */}
            {/* Optimization: Conditionally render the simplified 3D scene or use visibility to avoid GPU overhead when idle */}
            <div
                className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000 ease-in-out ${is3DVisible ? 'opacity-90' : 'opacity-0'}`}
                aria-hidden="true"
            >
                <Canvas style={{ pointerEvents: 'none' }} dpr={[1, 2]}> {/* DPR optimization */}
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                    <Environment preset="city" />
                    <Experience />
                </Canvas>
            </div>

            <div className="relative z-10">
                <Navbar />
                <Hero />

                <Suspense fallback={<div className="h-20 w-full flex items-center justify-center text-stone/20">Loading...</div>}>
                    <TechMarquee />
                </Suspense>

                <Suspense fallback={<div className="min-h-screen"></div>}>
                    <WhoWeAre />
                    <Team />
                    <Expertise />
                    <Services />
                    <IndustrySolutions />
                    <Process />
                    <Insights />
                    <Contact />
                    <Footer />
                </Suspense>

                <Suspense fallback={null}>
                    <CookieConsent />
                </Suspense>
            </div>
            {/* AI Chat - Kept as is, assuming it handles its own loading or is lightweight enough */}
            {/* <AIChat />  Commented out based on original file not rendering it directly in JSX but importing it? 
               Wait, index.tsx renders AIChat alongside App. 
               Let's check index.tsx. It renders <App /> and <AIChat />.
               So I don't need to render AIChat here.
            */}
        </main>
    );
};



export default App;
