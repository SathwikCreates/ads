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
            image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
            className: "h-6 md:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "tiktok",
            description: "TikTok",
            image: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
            className: "h-7 md:h-9 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "google",
            description: "Google Ads",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            className: "h-6 md:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "stripe",
            description: "Stripe",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
            className: "h-7 md:h-9 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "shopify",
            description: "Shopify",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
            className: "h-7 md:h-9 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0",
        },
        {
            id: "hubspot",
            description: "HubSpot",
            image: "https://cdn.worldvectorlogo.com/logos/hubspot.svg",
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
