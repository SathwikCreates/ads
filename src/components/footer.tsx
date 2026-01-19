"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
    const footerSections = [
        {
            title: "PLATFORM",
            links: [
                { name: "How it Works", href: "/mission" },
                { name: "The Platform", href: "/platform" },
                { name: "Enterprise", href: "/enterprise" },
                { name: "Security", href: "/security" },
                { name: "Integrations", href: "/integrations" },
                { name: "Pricing", href: "/pricing" },
            ],
        },
        {
            title: "SOLUTIONS",
            links: [
                { name: "By Industry", href: "/solutions" },
                { name: "By Role", href: "/roles" },
                { name: "Customers", href: "/customers" },
                { name: "Case Studies", href: "/case-studies" },
            ],
        },
        {
            title: "RESOURCES",
            links: [
                { name: "Blog", href: "/blog" },
                { name: "Newsroom", href: "/newsroom" },
                { name: "Community", href: "/community" },
                { name: "Help Center", href: "/help" },
                { name: "Store", href: "/store" },
            ],
        },
        {
            title: "COMPANY",
            links: [
                { name: "About us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Contact", href: "/contact" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/terms#privacy" },
                { name: "Cookie Policy", href: "/cookies" },
            ],
        },
        {
            title: "CONNECT",
            links: [
                { name: "Slack Community ↗", href: "/community" },
                { name: "LinkedIn ↗", href: "#" },
                { name: "Twitter ↗", href: "#" },
                { name: "YouTube ↗", href: "#" },
            ],
        },
    ];

    return (
        <footer className="bg-tines-violet text-white pt-20 pb-10 relative overflow-hidden">
            {/* Container */}
            <div className="container mx-auto px-6 font-sans">

                {/* Grid Links */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-32">
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-xs font-semibold tracking-wider text-white/60 mb-6 uppercase">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm font-medium hover:text-white/80 transition-colors block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
                    <div className="text-xl font-black tracking-tighter font-sans opacity-90 mb-4 md:mb-0">
                        ADS
                    </div>

                    <div className="mb-4 md:mb-0">
                        {/* Simple Logo Icon */}
                        <div className="relative w-10 h-10 group">
                            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-full h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>

                    <div className="text-sm font-medium opacity-80 cursor-pointer hover:opacity-100">
                        Cookie settings
                    </div>
                </div>
            </div>


        </footer>
    );
}
