"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { WorkflowAnimation } from "./workflow-animation";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-grid-pattern -z-10" />
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-500/5 to-transparent -z-10" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-8"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                            The smart workflow platform
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-gray-900 mb-8"
                        >
                            The intelligent <br />
                            <span className="text-purple-500 italic">workflow</span> platform
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-600 mb-10 leading-relaxed"
                        >
                            Build, run, and monitor automation workflows without writing a single line of code.
                            Trusted by security and operations teams worldwide.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                href="#"
                                className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium text-lg transition-all hover:scale-105 shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
                            >
                                Start building for free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full font-medium text-lg transition-all hover:border-purple-200 flex items-center justify-center gap-2"
                            >
                                Book a demo
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-500"
                        >
                            {["No credit card required", "SOC 2 Type II Certified", "GDPR Compliant"].map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:block"
                    >
                        <WorkflowAnimation />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
