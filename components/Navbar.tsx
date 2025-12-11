import React, { useEffect, useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentSection, setCurrentSection] = useState('hero');

    useEffect(() => {
        // Optimized scroll handler for navbar background only
        const handleScroll = () => {
            if (window.scrollY > 50 !== scrolled) {
                setScrolled(window.scrollY > 50);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Intersection Observer for section detection
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setCurrentSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        ['hero', 'about', 'expertise', 'services', 'process', 'team', 'contact'].forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        // Initial check for scroll styling
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [scrolled]);

    // Get background based on current section
    const getMenuBackground = () => {
        switch (currentSection) {
            case 'hero':
                return 'bg-gradient-to-br from-blue-100/95 via-purple-50/95 to-white/95 backdrop-blur-xl';
            case 'process':
                return 'bg-gradient-to-br from-stone-50/95 via-stone-100/95 to-paper/95 backdrop-blur-xl';
            case 'team':
                return 'bg-paper/95 backdrop-blur-xl';
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
                        <a key={item} href={`#${item.toLowerCase()}`} className={`font-sans text-xs font-medium uppercase tracking-widest transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-vermilion hover:after:w-full after:transition-all after:duration-500 after:ease-[cubic-bezier(0.25,1,0.3,1)] ${currentSection === item.toLowerCase() ? 'text-vermilion after:w-full' : 'text-ink hover:text-vermilion'}`}>
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

export default Navbar;
