"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Zap, Shield, ShoppingBag, Layers, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Pricing", href: "/pricing", icon: Zap },
    { name: "Mission", href: "/mission", icon: Layers },
    { name: "Enterprise", href: "/enterprise", icon: Shield },
    { name: "Store", href: "/store", icon: ShoppingBag },
];

export function MobileMenu() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                layoutId="mobile-dock"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl shadow-purple-500/10 ring-1 ring-black/5"
            >
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative group"
                        >
                            <motion.div
                                whileTap={{ scale: 0.85 }}
                                className={cn(
                                    "relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300",
                                    isActive ? "text-white" : "text-slate-500 hover:text-slate-800"
                                )}
                            >
                                {/* Active Background Blob */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-bg"
                                        className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/30"
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    />
                                )}

                                <item.icon className={cn("w-5 h-5 relative z-10", isActive && "stroke-2")} />
                            </motion.div>
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
}
