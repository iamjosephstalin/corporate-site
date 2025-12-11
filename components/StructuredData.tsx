import React from "react";

const StructuredData = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["Organization", "ProfessionalService"],
                "@id": "https://shichifukutekx.com/#organization",
                "name": "Shichifuku Tekx",
                "alternateName": "Shichifuku Tekx FZE",
                "url": "https://shichifukutekx.com",
                "logo": "https://shichifukutekx.com/logo.png",
                "image": "https://shichifukutekx.com/hero_bg.webp",
                "description": "Shichifuku Tekx: Premier AI strategy and custom software development in Dubai & GCC. Empowering businesses with intelligent automation.",
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

export default StructuredData;
