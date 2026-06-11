"use client";

import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { EmergencyHero } from "./emergency-hero";
import { DispatchForm } from "./dispatch-form";
import { EmergencyPlumbers } from "./emergency-plumbers";

interface EmergencyClientProps {
  session: any;
}

export function EmergencyClient({ session }: EmergencyClientProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <Navbar user={session?.user} />

      <main className="flex-grow">
        <EmergencyHero />
        <DispatchForm />
        <EmergencyPlumbers />

        {/* Safety tips strip */}
        <section className="bg-[#1F2937] py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
              Safety Reminders
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Shut off your main water valve immediately during a burst pipe.",
                "Never touch electrical outlets in a flooded area.",
                "If you smell gas — open windows, evacuate, and call 911.",
                "Take photos of damage for insurance before cleanup begins.",
                "Do not use chemical drain cleaners on a severely blocked drain.",
                "Keep the water heater area clear in case of pressure release.",
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-white/60 leading-relaxed">
                  <span className="text-[#F59E0B] font-bold shrink-0 mt-0.5">{idx + 1}.</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
