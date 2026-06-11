"use client";

import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { ProcessSteps } from "./process-steps";
import { PricingTable } from "./pricing-table";
import { TrustBadges } from "./trust-badges";
import { FAQ } from "@/components/home/faq";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksClientProps {
  session: any;
}

export function HowItWorksClient({ session }: HowItWorksClientProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <Navbar user={session?.user} />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-[#1E3A8A] text-white py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight">How Plumbflow Works</h1>
            <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
              Our platform makes it effortless to find, vet, and hire a licensed plumber from your area in minutes.
            </p>
            <div className="pt-2">
              <Link href="/find-plumbers">
                <Button className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold px-6 h-10 cursor-pointer">
                  Find a Plumber Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <ProcessSteps />
        <TrustBadges />
        <PricingTable />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
