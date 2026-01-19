// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
    id: string;
    description: string;
    image: string;
    className?: string; // Allow custom sizing
}

interface Logos3Props {
    heading?: string;
    logos?: Logo[]; // Made logos optional locally, but will provide default
    className?: string;
}

const Logos3 = ({
    heading = "Trusted by high-growth marketing teams at",
    logos = [
        {
            id: "meta",
            description: "Meta",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
            className: "h-8 w-auto",
        },
        {
            id: "tiktok",
            description: "TikTok",
            image: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
            className: "h-9 w-auto",
        },
        {
            id: "google",
            description: "Google Ads",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            className: "h-8 w-auto",
        },
        {
            id: "stripe",
            description: "Stripe",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
            className: "h-9 w-auto",
        },
        {
            id: "shopify",
            description: "Shopify",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
            className: "h-9 w-auto",
        },
        {
            id: "hubspot",
            description: "HubSpot",
            image: "https://cdn.worldvectorlogo.com/logos/hubspot.svg",
            className: "h-8 w-auto"
        }
    ],
}: Logos3Props) => {
    // Duplicate logos to ensure seamless loop if array is small
    const displayLogos = [...logos, ...logos, ...logos];

    return (
        <section className="py-12 md:py-20 bg-tines-violet/5 rounded-[2rem] md:rounded-3xl mx-4 md:mx-6 my-6 md:my-12 border border-tines-violet/10 inset-shadow-sm overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col items-center text-center">
                <h2 className="mb-12 text-xl font-medium text-tines-forest/70 font-serif">
                    {heading}
                </h2>
            </div>
            <div className="">
                <div className="relative mx-auto flex items-center justify-center lg:max-w-7xl">
                    <Carousel
                        opts={{ loop: true }}
                        plugins={[AutoScroll({ playOnInit: true, speed: 1.5 })]}
                    >
                        <CarouselContent className="items-center">
                            {displayLogos.map((logo, index) => (
                                <CarouselItem
                                    key={`${logo.id}-${index}`}
                                    className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                                >
                                    <div className="mx-6 flex shrink-0 items-center justify-center transform-gpu will-change-transform transition-all duration-300 opacity-100 grayscale-0 md:opacity-60 md:grayscale md:hover:opacity-100 md:hover:grayscale-0">
                                        <div>
                                            <img
                                                src={logo.image}
                                                alt={logo.description}
                                                className={logo.className || "h-8 w-auto"}
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/0 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/0 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export { Logos3 };
