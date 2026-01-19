"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { PlatformTabs } from "@/components/platform-tabs";
import { WorkflowDemo } from "@/components/workflow-demo";

export default function PlatformPage() {
    return (
        <div className="min-h-screen font-sans bg-[#F0EBFA]">

            <main className="pt-32">
                <section className="container mx-auto px-6 mb-20">
                    <div className="max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-slate-900 mb-8"
                        >
                            System for <br />
                            <span className="text-purple-500 italic">mission-critical</span> work.
                        </motion.h1>
                        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                            A complete operating system for your advertising strategy.
                            From data ingestion to creative generation and performance analysis.
                        </p>
                    </div>
                </section>

                <PlatformTabs />
                <WorkflowDemo />

            </main>

            <Footer />
        </div>
    );
}
