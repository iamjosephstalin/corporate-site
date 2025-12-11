import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

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
        <section id="contact" className="py-12 md:py-24 px-6 md:px-12 bg-white relative z-20">
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
                                    <a href="mailto:sales@shichifukutekx.ae" className="text-stone hover:text-vermilion transition-colors">sales@shichifukutekx.ae</a>
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

export default Contact;
