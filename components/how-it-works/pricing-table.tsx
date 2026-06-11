"use client";

import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    name: "Standard Call",
    price: "$75–$95",
    unit: "per hour",
    description: "Scheduled non-urgent plumbing services during regular business hours.",
    features: [
      "Leak detection & pipe repair",
      "Drain cleaning & unclogging",
      "Fixture installation",
      "Water heater inspection",
      "Free initial assessment",
    ],
    cta: "Book Standard",
    highlight: false,
  },
  {
    name: "Priority Dispatch",
    price: "$110–$130",
    unit: "per hour",
    description: "Fast-track response for urgent plumbing jobs. Technician arrives within 45 min.",
    features: [
      "Everything in Standard",
      "Priority queue placement",
      "45-minute arrival target",
      "Evening & weekend slots",
      "Dedicated dispatch handler",
    ],
    cta: "Book Priority",
    highlight: true,
  },
  {
    name: "Emergency Callout",
    price: "$140+",
    unit: "per hour",
    description: "24/7 immediate dispatch for burst pipes, flooding, and severe sewage backups.",
    features: [
      "Everything in Priority",
      "24/7 including holidays",
      "20-minute arrival target",
      "Flooding containment tools",
      "Full incident documentation",
    ],
    cta: "Call Emergency Line",
    highlight: false,
    link: "/emergency",
  },
];

export function PricingTable() {
  return (
    <section className="bg-[#F9FAFB] py-16 border-t border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-[#1F2937]">Clear, Upfront Pricing</h2>
          <p className="text-sm text-[#6B7280] max-w-xl mx-auto">
            All rates are standardized across technicians. Prices are base rates — final quotes confirmed before work begins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col border ${
                tier.highlight
                  ? "border-[#2563EB] shadow-lg shadow-[#2563EB]/10 ring-1 ring-[#2563EB]/20"
                  : "border-[#E5E7EB] shadow-sm"
              } bg-white`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#2563EB] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="pb-4 border-b border-[#E5E7EB]">
                <CardTitle className="text-sm font-bold text-[#1F2937]">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl font-extrabold text-[#1E3A8A]">{tier.price}</span>
                  <span className="text-xs text-[#6B7280]">{tier.unit}</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{tier.description}</p>
              </CardHeader>

              <CardContent className="pt-5 flex-1 flex flex-col gap-4">
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#1F2937]">
                      <Check className="h-3.5 w-3.5 text-[#10B981] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.link ? (
                  <Link href={tier.link}>
                    <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold h-9 cursor-pointer">
                      {tier.cta}
                    </Button>
                  </Link>
                ) : (
                  <Link href="/find-plumbers">
                    <Button
                      className={`w-full font-semibold h-9 cursor-pointer ${
                        tier.highlight
                          ? "bg-[#2563EB] hover:bg-[#1E3A8A] text-white"
                          : "bg-[#1E3A8A] hover:bg-[#2563EB] text-white"
                      }`}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-[10px] text-[#6B7280]">
          All rates are subject to final agreement between customer and technician. Minimum 1-hour billing applies.
        </p>
      </div>
    </section>
  );
}
