"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        // In a real app, redirect here
        console.log("Logged in!");
        window.location.href = "/platform";
    };

    return (
        <div className="min-h-screen bg-[#F0EBFA] flex flex-col items-center justify-center p-6 font-sans">
            <Link href="/" className="mb-8">
                <div className="relative w-12 h-12">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-full h-full object-contain brightness-0"
                    />
                </div>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md rounded-2xl p-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-medium text-slate-900 mb-2">Welcome back</h1>
                    <p className="text-slate-500 text-sm">Enter your credentials to access the workspace.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input id="email" type="email" placeholder="name@company.com" required className="bg-slate-50 mx-0" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="/forgot-password" className="text-xs text-purple-600 hover:underline">Forgot password?</Link>
                        </div>
                        <Input id="password" type="password" placeholder="••••••••" required className="bg-slate-50 mx-0" />
                    </div>

                    <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-10" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign in <ArrowRight className="ml-2 h-4 w-4 opacity-50" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-purple-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </div>
            </motion.div>

            <div className="mt-8 text-center text-xs text-slate-400">
                &copy; 2024 Ads Inc. All rights reserved.
            </div>
        </div>
    );
}
