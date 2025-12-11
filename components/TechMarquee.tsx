import React from "react";

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
        <div className="w-full py-8 bg-white border-y border-stone/10 overflow-hidden relative z-20">
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

export default TechMarquee;
