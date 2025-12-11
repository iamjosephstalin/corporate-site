import React from "react";
import Reveal from "./Reveal";

const Footer = () => {
    return (
        <footer className="bg-paper pt-20 md:pt-32 pb-12 px-6 md:px-12 border-t border-stone/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
                <Reveal>
                    <div>
                        <span className="font-sans text-xs text-vermilion uppercase tracking-widest mb-4 block">Contact Us</span>
                        <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl text-ink leading-[0.9] mb-8 md:mb-12 break-words">
                            Let's Build<br /><span className="italic text-stone">Fortune.</span>
                        </h2>

                        <div className="flex flex-col gap-2 items-start overflow-hidden">
                            <a href="mailto:sales@shichifukutekx.ae" className="font-sans text-xl sm:text-2xl md:text-3xl text-ink hover:text-vermilion border-b border-ink hover:border-vermilion transition-all duration-300 pb-1 truncate max-w-full">
                                sales@shichifukutekx.ae
                            </a>
                            <a href="tel:+971585057791" className="font-sans text-lg text-stone hover:text-ink transition-colors mt-4 duration-300">
                                +971 58 505 7791
                            </a>
                        </div>
                    </div>
                </Reveal>

                <div className="flex flex-col justify-between items-start md:items-end w-full">
                    <Reveal delay={200} className="w-full md:w-auto">
                        <div className="bg-white p-6 md:p-8 border border-stone/10 w-full md:max-w-sm hover:shadow-lg transition-shadow duration-500">
                            <h4 className="font-sans font-bold uppercase tracking-widest mb-6 border-b border-stone/10 pb-2">Location</h4>
                            <address className="font-serif text-ink not-italic leading-relaxed">
                                Office - C1 - 1F - Sf10837<br />
                                Ajman Free Zone C1 Building<br />
                                United Arab Emirates
                            </address>
                        </div>
                    </Reveal>

                    <Reveal delay={400} className="hidden md:block">
                        <img
                            src="/logo.png"
                            alt="ShichifukuTekx Logo"
                            loading="lazy"
                            decoding="async"
                            className="w-32 h-auto mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500"
                        />
                    </Reveal>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-stone/10 font-sans text-xs uppercase tracking-wider text-stone">
                <div className="text-center md:text-left">© 2025 Shichifuku Tekx. All Rights Reserved.</div>
                <div className="flex gap-8">
                    {['Instagram', 'LinkedIn', 'Twitter'].map(link => (
                        <a key={link} href="#" className="hover:text-vermilion transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-vermilion hover:after:w-full after:transition-all after:duration-300">{link}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
