"use client";

import { HelpCircle, ChevronDown } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      q: "How quickly can a plumber arrive?",
      a: "For emergency dispatches (selected as Urgent Alert in the hire form), technicians typically arrive at your location within 30 to 45 minutes, depending on traffic and location.",
    },
    {
      q: "Are the plumbers licensed and insured?",
      a: "Yes. Every technician listed on Plumbflow is fully licensed, background checked, and carries comprehensive liability insurance to guarantee safe service.",
    },
    {
      q: "How does billing work?",
      a: "Hourly base rates are clearly shown on each plumber's card. Payment is handled directly with the technician after completion of the job via credit card, check, or mobile transfer.",
    },
    {
      q: "Can I schedule a service for a later date?",
      a: "Absolutely. When you click 'Hire Plumber', select the 'Standard Book' option to coordinate a preferred date and time with the technician.",
    },
  ];

  return (
    <section className="bg-white py-16 border-t border-[#E5E7EB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-[#1F2937] flex items-center justify-center gap-2">
            <HelpCircle className="h-6 w-6 text-[#2563EB]" />
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#6B7280]">
            Everything you need to know about booking and dispatch.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group border border-[#E5E7EB] rounded-lg bg-[#FFFFFF] [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer focus:outline-hidden">
                <span className="text-xs font-bold text-[#1F2937]">{faq.q}</span>
                <ChevronDown className="h-4 w-4 text-[#6B7280] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="p-4 pt-0 border-t border-[#E5E7EB]">
                <p className="text-xs text-[#6B7280] leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
