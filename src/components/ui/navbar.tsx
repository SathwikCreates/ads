"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
    { name: "Platform", href: "/platform" },
    { name: "Solutions", href: "/solutions" },
    { name: "Security", href: "/security" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
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
                    <div className="relative w-10 h-10">
                        <img
                            src="/logo.png"
                            alt="AI Ad Coach"
                            className="w-full h-full object-contain brightness-0"
                        />
                    </div>
                    <span className="text-xl font-bold font-serif tracking-tight">AI Ad Coach</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
                        href="/login"
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="inline-flex h-9 items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
