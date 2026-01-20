"use client";

import { motion } from "framer-motion";

export function ProductDemo() {
    return (
        <section className="py-20 flex justify-center overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 mb-6">
                        Complete Visibility. <br />
                        <span className="text-purple-600 italic">Zero Blindspots.</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        See your entire ad ecosystem in one high-fidelity dashboard. Track spend, attribution, and creative performance in real-time.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Browser Frame */}
                    <div className="rounded-xl bg-slate-900 shadow-2xl overflow-hidden border border-slate-800">
                        {/* Browser Header */}
                        <div className="h-10 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <div className="ml-4 flex-1 h-6 bg-slate-900/50 rounded-md text-[10px] text-slate-500 flex items-center px-3 font-mono">
                                app.ads-platform.com/dashboard/overview
                            </div>
                        </div>

                        {/* Dashboard Mock Content */}
                        <div className="bg-slate-900 p-6 md:p-8 aspect-video relative">
                            {/* Grid Layout */}
                            <div className="grid grid-cols-12 gap-4 h-full">
                                {/* Sidebar */}
                                <div className="col-span-2 hidden md:flex flex-col gap-3 border-r border-slate-800 pr-4">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="h-8 bg-slate-800/50 rounded animate-pulse opacity-50" style={{ width: `${Math.random() * 40 + 60}%` }} />
                                    ))}
                                </div>

                                {/* Main Area */}
                                <div className="col-span-12 md:col-span-10 flex flex-col gap-4">
                                    {/* Top Stats Row */}
                                    <div className="grid grid-cols-3 gap-4 h-24">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 flex flex-col justify-between">
                                                <div className="h-2 w-16 bg-slate-700/50 rounded" />
                                                <div className="h-6 w-24 bg-purple-500/20 rounded animate-pulse" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart Area */}
                                    <div className="flex-1 bg-slate-800/20 rounded-lg border border-slate-700/30 relative overflow-hidden flex items-end p-4 gap-2">
                                        {[...Array(20)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 bg-gradient-to-t from-purple-600/80 to-blue-500/80 rounded-t-sm hover:opacity-100 transition-all opacity-70"
                                                style={{ height: `${Math.random() * 60 + 20}%` }}
                                            />
                                        ))}
                                    </div>

                                    {/* Bottom Table */}
                                    <div className="h-24 bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 flex flex-col gap-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-4 bg-slate-700/30 rounded w-full" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Overlay Gradient for polish */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Shadow / Glow */}
                    <div className="absolute -inset-10 bg-purple-500/20 blur-3xl -z-10 rounded-full opacity-50" />
                </motion.div>
            </div>
        </section>
    );
}
