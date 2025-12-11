import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCookie } from "./Icons";

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
                        className="fixed bottom-6 right-6 md:right-12 z-[9999] max-w-sm w-full"
                    >
                        <div className="bg-white/90 backdrop-blur-xl border border-stone/10 p-6 shadow-2xl rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <IconCookie className="w-24 h-24 text-ink rotate-12" />
                            </div>

                            <div className="relative z-10">
                                <h4 className="font-serif text-xl mb-3 flex items-center gap-2">
                                    <IconCookie className="w-5 h-5 text-vermilion" />
                                    Cookies & Privacy
                                </h4>
                                <p className="font-sans text-sm text-stone leading-relaxed mb-6">
                                    We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                </p>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="w-full py-3 bg-vermilion text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-ink transition-colors duration-300"
                                    >
                                        Accept All
                                    </button>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setShowPreferences(true)}
                                            className="flex-1 py-2 text-stone text-xs font-bold uppercase tracking-widest hover:text-ink transition-colors"
                                        >
                                            Preferences
                                        </button>
                                        <button
                                            onClick={() => setIsVisible(false)}
                                            className="flex-1 py-2 text-stone text-xs font-bold uppercase tracking-widest hover:text-ink transition-colors"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preferences Modal (Simplified for brevity) */}
            <AnimatePresence>
                {isVisible && showPreferences && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    >
                        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl relative">
                            <h3 className="font-serif text-2xl mb-6">Cookie Preferences</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-bold text-sm">Essential</h5>
                                        <p className="text-xs text-stone">Required for the site to function.</p>
                                    </div>
                                    <input type="checkbox" checked disabled className="accent-vermilion" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-bold text-sm">Analytics</h5>
                                        <p className="text-xs text-stone">Help us improve our website.</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                        className="accent-vermilion"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-bold text-sm">Marketing</h5>
                                        <p className="text-xs text-stone">Personalized advertisements.</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketing}
                                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                        className="accent-vermilion"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={saveConsent}
                                    className="flex-1 py-3 bg-ink text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-vermilion transition-colors"
                                >
                                    Save Preferences
                                </button>
                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="py-3 px-6 text-stone text-xs font-bold uppercase tracking-widest hover:text-ink"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CookieConsent;
