"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
    { name: "Platform", href: "/platform" },
    { name: "Solutions", href: "#" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "#" },
    { name: "Company", href: "/about" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "bg-white/80 backdrop-blur-md border-gray-200 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        T
                    </div>
                    <span className="text-xl font-bold font-serif tracking-tight">Tines</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-600 hover:text-purple-500 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link
                        href="#"
                        className="hidden md:block text-sm font-medium text-gray-900 hover:text-purple-500 transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="#"
                        className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105"
                    >
                        Try Tines for free
                    </Link>
                </div>
            </div>
        </nav>
    );
}
