"use client";

import { Search, FileCheck, PhoneCall, Star } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse & Filter Specialists",
    description: "Use our smart search to filter plumbers by specialty — drain cleaning, leak detection, water heaters, or emergency dispatch. Every profile shows verified ratings, experience, and base rates before you commit.",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "Review Rates & Credentials",
    description: "View each plumber's license badge, years of experience, customer reviews, and transparent hourly rates. No hidden fees — what you see is exactly what you pay.",
  },
  {
    number: "03",
    icon: PhoneCall,
    title: "Hire & Get Contacted",
    description: "Submit your dispatch request with your preferred urgency level. The technician will call you directly within 15 minutes to confirm arrival time and discuss the job scope.",
  },
  {
    number: "04",
    icon: Star,
    title: "Rate Your Experience",
    description: "After the job is complete, leave a verified review to help other customers make informed decisions. Your feedback directly influences plumber visibility on the platform.",
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-white py-16 border-b border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-[#1F2937]">The Booking Process</h2>
          <p className="text-sm text-[#6B7280] max-w-xl mx-auto">
            From search to fix — Plumbflow connects you to a certified technician in four simple steps.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div key={idx} className="flex gap-6 relative">
                {/* Left column: number + connector line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">
                    {step.number}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-[#E5E7EB] my-2" />
                  )}
                </div>

                {/* Right column: content */}
                <div className={`pb-10 ${isLast ? "" : ""}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-[#2563EB]" />
                    <h3 className="text-base font-bold text-[#1F2937]">{step.title}</h3>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
