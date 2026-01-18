"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, Layout, Zap, Database } from "lucide-react";

const features = [
    {
        title: "The Storyboard",
        subtitle: "A canvas for your imagination",
        description: "Drag, drop, and connect actions to build workflows. Visualize your process from start to finish, with real-time feedback loop and infinite scalability.",
        color: "bg-purple-100 text-purple-600",
        icon: Layout,
        image: <div className="w-full h-full bg-slate-100 rounded-xl border border-slate-200" />
    },
    {
        title: "The Workbench",
        subtitle: "Your AI-powered assistant",
        description: "Leverage the power of LLMs to generate actions, transform data, and summarize incidents securely within your private tenant.",
        color: "bg-mint-100 text-teal-600",
        icon: Zap,
        image: <div className="w-full h-full bg-slate-100 rounded-xl border border-slate-200" />
    },
    {
        title: "Cases",
        subtitle: "Incident management reinvented",
        description: "Track, assign, and resolve incidents with a fully customizable case management system integrated directly into your automation workflows.",
        color: "bg-peach-100 text-orange-600",
        icon: Database,
        image: <div className="w-full h-full bg-slate-100 rounded-xl border border-slate-200" />
    }
];

export default function PlatformPage() {
    return (
        <div className="min-h-screen font-sans bg-white text-slate-900">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-medium mb-6"
                    >
                        A complete system for <br /> <span className="text-purple-600 italic">mission-critical</span> work
                    </motion.h1>
                    <p className="text-xl text-slate-600 mb-10">
                        Three powerful modules, one unified platform. Designed for speed, security, and scale.
                    </p>
                </div>
            </section>

            {/* Feature Blocks */}
            <section className="py-20">
                <div className="container mx-auto px-6 space-y-32">
                    {features.map((feature, idx) => (
                        <div key={feature.title} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="flex-1 space-y-6">
                                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-4xl font-serif font-medium">{feature.title}</h2>
                                <h3 className="text-xl font-medium text-slate-500">{feature.subtitle}</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className="pt-4">
                                    <button className="text-purple-600 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                                        Learn more <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 h-[400px] w-full rounded-2xl bg-slate-50 p-4 border border-slate-100 shadow-sm">
                                {/* Placeholder for feature image/demo */}
                                {feature.image}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-slate-900 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-serif mb-8">Ready to see it in action?</h2>
                    <div className="flex justify-center gap-4">
                        <button className="px-8 py-3 bg-white text-slate-900 rounded-full font-medium hover:scale-105 transition-transform">
                            Get started for free
                        </button>
                        <button className="px-8 py-3 border border-slate-700 text-white rounded-full font-medium hover:bg-slate-800 transition-colors">
                            Book a demo
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
