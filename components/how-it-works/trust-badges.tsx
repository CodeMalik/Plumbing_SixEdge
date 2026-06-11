"use client";

import { BadgeCheck, Lock, Clock4, Headphones } from "lucide-react";

const badges = [
  { icon: BadgeCheck, title: "100% Licensed", description: "Every plumber carries a valid state plumbing licence and is background verified before listing." },
  { icon: Lock, title: "Secure Payments", description: "All billing information is handled with bank-grade encryption. We never store card details." },
  { icon: Clock4, title: "On-Time Guarantee", description: "If a technician is more than 30 minutes late we waive the dispatch fee, no questions asked." },
  { icon: Headphones, title: "24/7 Support Line", description: "Our customer care team is reachable around the clock for booking questions and disputes." },
];

export function TrustBadges() {
  return (
    <section className="bg-[#1E3A8A] py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Our Commitments to You</h2>
          <p className="text-sm text-white/70">Plumbflow holds every technician and every booking to the highest standard.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="flex flex-col items-center text-center gap-3 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white">{b.title}</h4>
                <p className="text-xs text-white/65 leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
