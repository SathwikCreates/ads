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
    logos = [
        {
            id: "meta",
            description: "Meta",
            image: "https://logo.clearbit.com/meta.com",
            className: "h-6 md:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "tiktok",
            description: "TikTok",
            image: "https://logo.clearbit.com/tiktok.com",
            className: "h-7 md:h-9 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "google",
            description: "Google Ads",
            image: "https://logo.clearbit.com/ads.google.com",
            className: "h-6 md:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "stripe",
            description: "Stripe",
            image: "https://logo.clearbit.com/stripe.com",
            className: "h-7 md:h-9 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "shopify",
            description: "Shopify",
            image: "https://logo.clearbit.com/shopify.com",
            className: "h-7 md:h-9 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "hubspot",
            description: "HubSpot",
            image: "https://logo.clearbit.com/hubspot.com",
            className: "h-6 md:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        }
    ],
    className = "", // Default to empty string
}: Logos3Props) => {
    return (
        <section className={`py-12 md:py-20 bg-transparent mx-auto ${className}`}>
            <div className="container mx-auto px-6 flex flex-col items-center text-center">
                <h2 className="mb-10 md:mb-12 text-sm font-bold tracking-widest text-slate-500 uppercase font-sans">
                    {heading}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-16 max-w-5xl mx-auto items-center justify-items-center">
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="flex items-center justify-center"
                        >
                            <img
                                src={logo.image}
                                alt={logo.description}
                                className={logo.className}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Logos3 };
