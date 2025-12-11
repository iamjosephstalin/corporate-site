import React from "react";
import Reveal from "./Reveal";
import { HolographicCard } from "./Cards";

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
        <section id="expertise" className="py-8 md:py-16 px-6 md:px-12 bg-paper text-ink relative z-20">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="text-center mb-20">
                        <img src="/icon.png" alt="Expertise Icon" className="mb-6 mx-auto w-16 h-16 object-contain opacity-80" />
                        <Reveal tag="h2" className="font-serif text-4xl md:text-6xl mb-4">AI Expertise</Reveal>
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

export default Expertise;
