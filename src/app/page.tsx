import { Hero } from "@/components/hero";
import { ValueProposition } from "@/components/value-proposition";
import { Footer } from "@/components/footer";
import { Logos3 } from "@/components/blocks/logos3";
import { Testimonials } from "@/components/ui/testimonials";
import { ProductDemo } from "@/components/product-demo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <main>
        <Hero />

        {/* Logos Infinite Scroll */}
        <Logos3
          heading="Trusted by high-growth marketing teams at"
          className="mt-[-20px] relative z-20" // Pull up slightly to overlap/connect with hero visual if needed, or just standard flow
        />

        <ProductDemo />

        <ValueProposition />

        <Testimonials />

        {/* Call to Action Section for deeper engagement */}
        <section className="py-24 text-center bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-serif font-medium mb-8">Ready to dive deeper?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/platform" className="px-8 py-4 bg-purple-600 border border-purple-600 text-white rounded-full font-medium hover:bg-purple-500 transition-colors flex items-center justify-center gap-2">
                Explore Platform <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/solutions" className="px-8 py-4 bg-transparent border border-slate-300 rounded-full font-medium hover:bg-white hover:border-slate-400 transition-colors flex items-center justify-center gap-2 text-slate-700">
                View Solutions
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
