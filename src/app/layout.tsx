import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ads | Intelligent Advertising Optimization",
  description: "Transform your advertising strategy with AI-powered optimization. Unify data, generate content, and drive ROI.",
};

import { Tiles } from "@/components/ui/tiles";

// ... existing imports


import { Footer } from "@/components/footer";
// import { GlobalMenu } from "@/components/global-menu"; // Removing old global menuner";

import { Navbar1 } from "@/components/blocks/navbar1";
import { CookieBanner } from "@/components/ui/cookie-banner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-tines-lavender font-sans antialiased pb-32 md:pb-0",
        inter.variable,
        playfair.variable
      )} suppressHydrationWarning>
        <Navbar1 />
        <div className="relative z-10">
          {children}
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}
