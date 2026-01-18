import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/hero";
import { LogoTicker } from "@/components/logo-ticker";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
