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
                    <div className="rounded-xl bg-[#0B0F19] shadow-2xl overflow-hidden border border-slate-800 ring-1 ring-white/10 relative group">

                        {/* Glow Gradient */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                        {/* Browser Header */}
                        <div className="h-10 bg-[#0F131F] flex items-center px-4 gap-2 border-b border-slate-800 z-10 relative">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <a href="/platform" className="ml-4 flex-1 max-w-lg h-6 bg-[#1A1F2E] rounded-md text-[10px] text-slate-400 flex items-center px-3 font-mono hover:text-purple-400 hover:bg-[#23293B] transition-colors cursor-pointer group/bar border border-slate-700/50">
                                <span className="text-slate-600 group-hover/bar:text-purple-500 mr-2">🔒</span>
                                <span className="text-slate-500 group-hover/bar:text-purple-400">https://</span>app.ads-platform.com/dashboard/overview
                            </a>
                        </div>

                        {/* Dashboard Mock Content */}
                        <div className="bg-[#0B0F19] p-0 aspect-[16/9] relative flex">

                            {/* Sidebar */}
                            <div className="w-16 md:w-20 border-r border-slate-800/50 flex flex-col items-center py-6 gap-6 z-10 bg-[#0B0F19]">
                                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">A</div>
                                <div className="flex flex-col gap-4 mt-4 w-full px-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`h-10 w-full rounded-lg flex items-center justify-center transition-colors ${i === 1 ? 'bg-purple-500/10 text-purple-400' : 'text-slate-600 hover:bg-slate-800/50'}`}>
                                            <div className={`w-5 h-5 ${i === 1 ? '' : 'opacity-60'}`} style={{
                                                maskImage: `url('https://api.iconify.design/lucide/${["layout-dashboard", "bar-chart-2", "users", "settings"][i - 1]}.svg')`,
                                                maskSize: 'contain',
                                                maskRepeat: 'no-repeat',
                                                maskPosition: 'center',
                                                backgroundColor: 'currentColor'
                                            }} />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400" />
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 overflow-hidden flex flex-col relative">

                                {/* Top Bar */}
                                <div className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#0B0F19]/95 backdrop-blur z-10">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-medium">Campaign Performance</h3>
                                        <span className="flex h-2 w-2 relative ml-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-xs text-green-500 font-mono uppercase tracking-wider ml-1">Live</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="h-8 px-3 rounded-md bg-[#131825] border border-slate-800 text-xs text-slate-400 flex items-center">Last 30 Days</div>
                                        <div className="h-8 px-3 rounded-md bg-purple-600 text-white text-xs font-medium flex items-center">Export Report</div>
                                    </div>
                                </div>

                                {/* Dashboard Grid */}
                                <div className="p-8 grid grid-cols-12 gap-6 flex-1 overflow-hidden">

                                    {/* Stats Cards */}
                                    <div className="col-span-12 grid grid-cols-3 gap-6 h-32">
                                        {[
                                            { label: "Total Spend", val: "$124,592", trend: "+12.5%", good: true },
                                            { label: "ROAS", val: "4.8x", trend: "+0.4x", good: true },
                                            { label: "Conversions", val: "8,942", trend: "-2.1%", good: false },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-[#131825] rounded-xl border border-slate-800 p-5 flex flex-col justify-between group hover:border-slate-700 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${stat.good ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                        {stat.trend}
                                                    </span>
                                                </div>
                                                <div className="text-3xl text-white font-semibold tracking-tight">{stat.val}</div>
                                                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.random() * 40 + 40}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Main Chart */}
                                    <div className="col-span-8 bg-[#131825] rounded-xl border border-slate-800 p-6 relative overflow-hidden group">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-slate-300 text-sm font-medium">Revenue vs Spend</h4>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-48 flex items-end px-6 gap-1">
                                            {[...Array(24)].map((_, i) => {
                                                const h = 20 + Math.random() * 60;
                                                return (
                                                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 group/bar">
                                                        <div className="w-full bg-purple-500/20 group-hover/bar:bg-purple-500/40 transition-colors rounded-sm ml-0.5" style={{ height: `${h * 0.6}%` }} />
                                                        <div className="w-full bg-blue-500/20 group-hover/bar:bg-blue-500/40 transition-colors rounded-sm ml-0.5" style={{ height: `${h}%` }} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Side List */}
                                    <div className="col-span-4 bg-[#131825] rounded-xl border border-slate-800 p-6 flex flex-col gap-4">
                                        <h4 className="text-slate-300 text-sm font-medium mb-2">Active Channels</h4>
                                        {[
                                            { n: "Meta / Instagram", v: "$45k", c: "bg-blue-500" },
                                            { n: "TikTok Ads", v: "$32k", c: "bg-pink-500" },
                                            { n: "Google Search", v: "$28k", c: "bg-green-500" },
                                            { n: "YouTube", v: "$19k", c: "bg-red-500" },
                                        ].map((ch, i) => (
                                            <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${ch.c}`} />
                                                    <span className="text-slate-400 text-sm">{ch.n}</span>
                                                </div>
                                                <span className="text-white text-sm font-mono">{ch.v}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shadow / Glow */}
                    <div className="absolute -inset-10 bg-purple-500/20 blur-3xl -z-10 rounded-full opacity-50" />
                </motion.div>
            </div>
        </section>
    );
}
