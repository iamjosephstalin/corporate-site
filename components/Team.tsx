import React from "react";
import Reveal from "./Reveal";

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
        <section id="team" className="py-12 md:py-24 px-6 md:px-12 bg-paper text-ink border-b border-stone/10 section-fade min-h-[50vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <Reveal>
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone/20 pb-8">
                        <div>
                            <Reveal tag="h2" className="font-serif text-5xl md:text-7xl mb-2">Leadership</Reveal>
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

export default Team;
