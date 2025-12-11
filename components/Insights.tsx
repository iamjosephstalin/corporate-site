import React from "react";
import Reveal from "./Reveal";
import { SpotlightCard } from "./Cards";

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
        <section className="py-8 md:py-16 px-6 md:px-12 bg-paper text-ink relative z-20">
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

export default Insights;
