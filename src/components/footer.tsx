"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
    Product: ["Platform", "Templates", "Integrations", "Enterprise", "Pricing", "Security"],
    Resources: ["Blog", "University", "Case Studies", "Webinars", "Community", "Help Center"],
    Company: ["About Us", "Careers", "Press", "Contact", "Partners", "Terms"],
};

export function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-6">

                {/* Top Section - CTA */}
                <div className="flex flex-col md:flex-row items-center justify-between pb-16 border-b border-slate-800 gap-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4">Ready to get started?</h2>
                        <p className="text-slate-400">Join thousands of security teams automating their workflows today.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="#"
                            className="px-6 py-3 bg-white text-slate-900 rounded-full font-medium transition-transform hover:scale-105"
                        >
                            Sign up free
                        </Link>
                        <Link
                            href="#"
                            className="px-6 py-3 border border-slate-700 hover:bg-slate-800 text-white rounded-full font-medium transition-colors"
                        >
                            Book a demo
                        </Link>
                    </div>
                </div>

                {/* Middle Section - Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                                T
                            </div>
                        </Link>
                        <p className="text-slate-400 max-w-sm mb-6">
                            The smart workflow platform for security and operations teams. Automate without code.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-bold text-lg mb-6 text-slate-200">{category}</h3>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section - Copyright */}
                <div className="pt-8 text-center md:text-left text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} Tines-Clone. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-300">Terms of Service</Link>
                        <Link href="#" className="hover:text-slate-300">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
