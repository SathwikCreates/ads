"use client";

import Image from "next/image";

interface Logo {
    id: string;
    description: string;
    image: string;
    className?: string;
}

interface Logos3Props {
    heading?: string;
    logos?: Logo[];
    className?: string; // Preserve className prop
}

const Logos3 = ({
    heading = "Trusted by high-growth marketing teams at",
    className = "",
}: Logos3Props) => {
    const logos = [
        {
            id: "meta",
            name: "Meta",
            className: "text-[#0668E1] md:text-slate-500 md:hover:text-[#0668E1]",
            component: (props: any) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M16.92 11.27a.89.89 0 0 0-.2-.04 7.6 7.6 0 0 0-1.83.22 8.52 8.52 0 0 1-2.18.28 11.83 11.83 0 0 1-3.69-.61l-.22-.07a16 16 0 0 1-3.15-1.55 4.09 4.09 0 0 1-1.39-1.92 2.37 2.37 0 0 1 .15-1.74A2.69 2.69 0 0 1 5.6 5.1a4.23 4.23 0 0 1 1.77.34 6.78 6.78 0 0 1 1.48 1A14.93 14.93 0 0 1 10.93 9 5.86 5.86 0 0 0 12 10.22a5.49 5.49 0 0 0 1 .43 2.94 2.94 0 0 0 .5.1 2.36 2.36 0 0 0 1.25-.26.92.92 0 0 0 .27-.27l.11-.16a2.76 2.76 0 0 0 .4-1.35 2.57 2.57 0 0 0-.8-1.78l-.13-.12a5 5 0 0 0-1.63-1 6.55 6.55 0 0 0-1.89-.28 5.61 5.61 0 0 0-1.2.14l-.39.1A17.9 17.9 0 0 0 5 8.09a2.52 2.52 0 0 1-1.34 1.29 4.3 4.3 0 0 1-2.2-.09 3.65 3.65 0 0 1-1.3-1 4 4 0 0 1-.72-1.77A4.6 4.6 0 0 1 0 4.21a4.67 4.67 0 0 1 1.57-3.1A5.39 5.39 0 0 1 5.39 0a7 7 0 0 1 3.55.85A11.08 11.08 0 0 1 11.69 3a7.41 7.41 0 0 1 .31.22l.53.4.19-.14a7.35 7.35 0 0 1 4.51-1.63 7.85 7.85 0 0 1 3.29.69 4.41 4.41 0 0 1 1.83 1.52A3.87 3.87 0 0 1 23 6a5 5 0 0 1-.68 2.6l-.16.24a5.1 5.1 0 0 1-1.57 1.48 7.37 7.37 0 0 1-1.82.76 4.19 4.19 0 0 1-.49.09 5.23 5.23 0 0 0-1.2-.28 2.32 2.32 0 0 0-1.12.18c-.37.16-.58.4-.64.71a1.2 1.2 0 0 0 .09.77 2 2 0 0 0 .91 1 5.6 5.6 0 0 0 1.82.52 9.59 9.59 0 0 0 2.22 0A12 12 0 0 0 24 13.09a4.23 4.23 0 0 0 0-2.82 4.15 4.15 0 0 0-1.17-1.84l.35-.38a5.2 5.2 0 0 1 1.09 2.52 5.86 5.86 0 0 1-.78 3.82 6.59 6.59 0 0 1-2.9 2.5 13.56 13.56 0 0 1-5.1 1 12.06 12.06 0 0 1-4.75-.85l-.27-.1a16.82 16.82 0 0 1-3.32-1.85 2.11 2.11 0 0 1-.51-.55.77.77 0 0 1-.09-.59.94.94 0 0 1 .5-.67 2.45 2.45 0 0 1 1.2-.38 5.76 5.76 0 0 1 2.38.64l.15.08A11.63 11.63 0 0 0 14.6 15a8.4 8.4 0 0 0 2.52-.39 6.2 6.2 0 0 0 1.55-.7 8 8 0 0 0-1.75-2.64z" />
                </svg>
            )
        },
        {
            id: "tiktok",
            name: "TikTok",
            className: "text-black md:text-slate-500 md:hover:text-black",
            component: (props: any) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M12.53 18.23a4.48 4.48 0 1 1 4.48-4.48V6.92a7.29 7.29 0 0 0 4.15 2.43V12a4.67 4.67 0 0 1-2.79-1.37V13.75a7.19 7.19 0 0 1-7.19 7.19 7.21 7.21 0 0 1-5.07-12.33l1.88 1.95A4.47 4.47 0 0 0 8.05 13.75a4.48 4.48 0 0 0 4.48 4.48Z" />
                    <path d="M17.01 1.15v2.7a4.69 4.69 0 0 1 2.66-.82v-2.7a7.27 7.27 0 0 0-2.66.82Z" />
                </svg>
            )
        },
        {
            id: "google",
            name: "Google Ads",
            className: "text-[#4285F4] md:text-slate-500 md:hover:text-[#4285F4]",
            component: (props: any) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M21.35 11.6h.47c1.17 0 2.13.93 2.13 2.08v5.56c0 1.15-1.07 2.18-2.6 2.18h-4.2V8.67l4.2 2.93zM2.66 11.6H2.2C1.03 11.6.08 12.53.08 13.68v5.56c0 1.15 1.07 2.18 2.6 2.18h4.2V8.67L2.66 11.6z" />
                    <path d="M12 2L2.67 8.67h18.66L12 2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
            )
        },
        {
            id: "stripe",
            name: "Stripe",
            className: "text-[#635BFF] md:text-slate-500 md:hover:text-[#635BFF]",
            component: (props: any) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M13.98 12.01c0-.98.81-1.31 2.37-1.31 1.34 0 2.92.34 2.92.34l.43-3.48s-1.32-.48-3.08-.48c-3.5 0-5.87 1.77-5.87 4.88 0 4.54 6.27 4.69 6.27 7.15 0 1.03-1.03 1.4-2.47 1.4-2.07 0-3.66-.66-3.66-.66l-.5 3.59s1.61.56 3.66.56c3.55 0 6.09-1.74 6.09-5.1 0-4.9-6.42-5.14-6.42-7.39l.26.5zM2.28 20l3.05-18.78h4.2L6.48 20H2.28z" />
                </svg>
            )
        },
        {
            id: "shopify",
            name: "Shopify",
            className: "text-[#96BF48] md:text-slate-500 md:hover:text-[#96BF48]",
            component: (props: any) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M21.9 6.8c-.3-1-1.1-1.9-2.2-2.3L15.3.3c-.5-.2-1.1-.2-1.6 0l-5.6 2.3c-.1 0-.2.1-.3.1l-.3.1C5.3 4.2 3.8 6.4 3.7 8.8l-.6 8.7c-.1 2.9 2.1 5.4 5 5.6h.2l7.5.9c3.1.4 5.9-1.9 6.2-5 .4-3.5.4-8.7-.1-12.2zm-6.1-4c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2-2.2-1-2.2-2.2 1-2.2 2.2-2.2zm-4.3 2.2c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2C15.9 6.2 15 7 13.8 7s-2.3-.8-2.3-2z" />
                </svg>
            )
        },
        {
            id: "hubspot",
            name: "HubSpot",
            className: "text-[#FF7A59] md:text-slate-500 md:hover:text-[#FF7A59]",
            component: (props: any) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                    <path d="M19.1 6.8c0 1.3-1.1 2.4-2.4 2.4-1.3 0-2.4-1.1-2.4-2.4S15.4 4.4 16.7 4.4c1.3 0 2.4 1.1 2.4 2.4zm-4.8 11.2c0 1.3-1.1 2.4-2.4 2.4-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4zm2.4-5.6h-2.4v-4.8c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4s2.4 1.1 2.4 2.4v7.2zm4.8 0h-2.4v-4.8c0-2.6-2.2-4.8-4.8-4.8-2.6 0-4.8 2.2-4.8 4.8v4.8h-2.4c-1.8 0-3.3 1.2-3.8 2.9-1.1-.4-2.4-.1-3.2.7l1.7 1.7c.3-.3.8-.4 1.2-.2.4.2.7.6.7 1.1s-.4.9-.8.9c-.3 0-.6-.1-.8-.3l-1.7 1.7c.7.7 1.7 1.1 2.8 1.1v-2.4h2.4v2.4h7.2v-2.4h2.4v2.4h2.4v-7.2zm0 6h-2.4v-2.4h2.4v2.4z" />
                </svg>
            )
        }
    ];

    return (
        <section className={`py-12 md:py-20 bg-transparent mx-auto ${className}`}>
            <div className="container mx-auto px-6 flex flex-col items-center text-center">
                <h2 className="mb-10 md:mb-12 text-sm font-bold tracking-widest text-slate-500 uppercase font-sans">
                    {heading}
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 max-w-6xl mx-auto items-center justify-items-center">
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="flex items-center justify-center opacity-100 md:opacity-40 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer group"
                        >
                            <logo.component className={`h-8 md:h-10 w-auto transition-colors ${logo.className}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Logos3 };
