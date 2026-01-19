"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotate = useTransform(scrollY, [0, 500], [0, 10]);

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#F0EBFA]" ref={containerRef}>

            {/* Ambient Noise */}
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10 pt-20">

                {/* Floating Elements (The Portal) */}
                <motion.div style={{ y: y1 }} className="absolute top-0 right-0 md:-right-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-40 md:animate-blob pointer-events-none" />
                <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 md:-left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-pink-400 to-orange-300 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-40 md:animate-blob animation-delay-2000 pointer-events-none" />

                <div className="relative z-20 flex flex-col items-center text-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-900/10 bg-white/20 backdrop-blur-md text-slate-900 text-xs font-bold uppercase tracking-widest mb-8 md:mb-12 hover:bg-white/40 transition-colors cursor-pointer"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        v2.0 is Live
                    </motion.div>

                    {/* Massive Typography */}
                    <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-[10vw] leading-[0.9] md:leading-[0.85] font-serif font-medium tracking-tighter text-slate-900 mix-blend-darken mb-8 md:mb-12 text-center md:text-left">
                        <motion.span
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            Intelligent
                        </motion.span>
                        <motion.span
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="block italic text-purple-600"
                        >
                            Automation
                        </motion.span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-8 px-4 md:px-0"
                    >
                        <div className="h-[1px] w-12 bg-slate-900 hidden md:block" />
                        <p className="text-lg md:text-2xl text-slate-600 max-w-lg text-center md:text-left font-light leading-relaxed text-balance">
                            Stop guessing. Start engineering. The only ad platform that pays for itself.
                        </p>
                    </motion.div>

                    {/* Main CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-8 md:mt-12 flex flex-col xs:flex-row items-center gap-4 w-full xs:w-auto"
                    >
                        <Link
                            href="/signup"
                            className="group relative px-8 py-4 bg-slate-900 text-white rounded-full text-lg font-medium overflow-hidden"
                        >
                            <div className="absolute inset-0 w-full h-full bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            <span className="relative flex items-center gap-2">
                                Start Free <ArrowRight className="w-5 h-5" />
                            </span>
                        </Link>

                        <div className="w-12 h-12 rounded-full border border-slate-900/20 flex items-center justify-center cursor-pointer hover:bg-white hover:scale-110 transition-all">
                            <Play className="w-4 h-4 text-slate-900 ml-1" />
                        </div>
                    </motion.div>
                </div>

                {/* Right Content - Abstract visual */}
                <div className="relative z-10 hidden md:block w-full max-w-[500px] aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
                </div>

                {/* Abstract 3D Element Placeholder */}
                <motion.div
                    style={{ rotate }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border-[1px] border-slate-900/5 rounded-full z-0 pointer-events-none"
                />
            </div>
        </section >
    );
}
