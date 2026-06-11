"use client";

import { Shield, Sparkles, Clock, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  const items = [
    {
      title: "Certified Professionals",
      description: "Every plumber on our platform undergoes rigorous background checks and licensing verification.",
      icon: BadgeCheck,
    },
    {
      title: "24/7 Rapid Dispatch",
      description: "Emergency dispatch service connects you to on-duty specialists in your neighborhood instantly.",
      icon: Clock,
    },
    {
      title: "Upfront Pricing",
      description: "Know the base hourly rates and estimate thresholds before hiring. No hidden callout surcharges.",
      icon: Shield,
    },
    {
      title: "Satisfaction Guarantee",
      description: "All booked jobs are backed by our service guarantee. Your satisfaction is our primary metric.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="bg-white py-16 border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl font-bold text-[#1F2937]">Why Book Through Plumbflow?</h2>
          <p className="text-sm text-[#6B7280]">
            We set a high benchmark for plumbing dispatches. Trust, efficiency, and clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-[#1F2937]">{item.title}</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
