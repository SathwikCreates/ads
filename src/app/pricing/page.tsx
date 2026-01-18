"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Community",
        price: "Free",
        description: "For individuals and small teams getting started.",
        features: ["3 users", "100 automation runs/day", "Community support", "1 tenant"],
        cta: "Sign up free",
        popular: false,
    },
    {
        name: "Essentials",
        price: "$500",
        period: "/month",
        description: "For growing teams with mission-critical workflows.",
        features: ["Unlimited users", "10,000 automation runs/day", "Standard support", "SSO & Audit logs"],
        cta: "Start trial",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations requiring scale and control.",
        features: ["Unlimited users", "Unlimited runs", "24/7 Premium support", "Dedicated success manager", "Private tenant"],
        cta: "Contact sales",
        popular: false,
    },
];

export default function PricingPage() {
    const [annual, setAnnual] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <section className="pt-32 pb-20 text-center">
                <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6">Simple, transparent pricing</h1>
                <p className="text-xl text-slate-600 mb-10">Start for free, scale as you grow.</p>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <span className={`text-sm font-medium ${!annual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                    <button
                        onClick={() => setAnnual(!annual)}
                        className="w-14 h-8 bg-purple-500 rounded-full p-1 transition-colors relative"
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${annual ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                    <span className={`text-sm font-medium ${annual ? 'text-slate-900' : 'text-slate-500'}`}>
                        Annual <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded-full ml-1">SAVE 20%</span>
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`relative bg-white rounded-2xl p-8 border ${plan.popular ? 'border-purple-500 ring-4 ring-purple-500/10' : 'border-slate-200'} shadow-sm flex flex-col`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-serif">{plan.price}</span>
                                {plan.period && <span className="text-slate-500">{plan.period}</span>}
                            </div>
                            <p className="text-slate-500 mb-8 h-12">{plan.description}</p>

                            <button className={`w-full py-3 rounded-full font-medium mb-8 transition-colors ${plan.popular ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                                {plan.cta}
                            </button>

                            <div className="space-y-4 flex-1">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
