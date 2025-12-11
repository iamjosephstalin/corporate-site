import React from "react";
import Reveal from "./Reveal";
import { LiquidCard } from "./Cards";
import { Hexagon } from "./Icons";

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
        <section id="services" className="py-8 md:py-16 px-6 md:px-12 bg-paper text-ink relative z-20">
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

export default Services;
