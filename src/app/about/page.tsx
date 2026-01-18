"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";

const team = [
    { name: "Eoin Hinchy", role: "CEO & Co-founder", image: "/team-1.jpg" },
    { name: "Thomas Kinsella", role: "COO & Co-founder", image: "/team-2.jpg" },
    { name: "Person Three", role: "Chief Revenue Officer", image: "/team-3.jpg" },
    { name: "Person Four", role: "VP of Engineering", image: "/team-4.jpg" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen font-sans bg-white text-slate-900">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-slate-900 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-serif font-medium mb-8"
                    >
                        We believe the world’s best teams run on <span className="text-purple-400 italic">automation.</span>
                    </motion.h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Tines was founded to liberate security and operations teams from the mundane, so they can focus on the work that matters.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-serif font-medium mb-6">Our Story</h2>
                    <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                        <p>
                            In 2018, Eoin Hinchy and Thomas Kinsella were frustrated. As security practitioners, they spent most of their days performing repetitive manual tasks, copying and pasting data between tools, and struggling to keep up with the volume of alerts.
                        </p>
                        <p>
                            They looked for a solution—a platform that would allow them to automate their workflows without needing to write code or rely on engineering teams. They couldn't find one that was powerful enough, flexible enough, and easy enough to use.
                        </p>
                        <p>
                            So they built Tines. Today, Tines is trusted by the world&apos;s most innovative companies to power their mission-critical workflows.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-serif font-medium text-center mb-16">Meet the team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {team.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <div className="aspect-square bg-slate-200 rounded-xl mb-4 overflow-hidden relative">
                                    {/* Placeholder for images */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent mix-blend-overlay" />
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-serif text-6xl opacity-50">
                                        {member.name.charAt(0)}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">{member.name}</h3>
                                <p className="text-slate-500">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
