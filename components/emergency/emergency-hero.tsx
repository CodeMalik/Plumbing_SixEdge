"use client";

import { Phone, Siren, Clock } from "lucide-react";

export function EmergencyHero() {
  return (
    <section className="bg-[#F59E0B] text-white py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Pulsing alert icon */}
        <div className="flex justify-center">
          <div className="relative w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-white/10 animate-ping" />
            <Siren className="h-9 w-9 text-white relative z-10" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight">24/7 Emergency Dispatch</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto leading-relaxed">
            Burst pipes, active flooding, total drain failure, and gas-related plumbing emergencies. Our priority dispatch line is online every hour of every day.
          </p>
        </div>

        {/* Call button */}
        <a href="tel:18005553569" className="inline-block">
          <button className="bg-white text-[#D97706] hover:bg-[#FEF3C7] font-extrabold px-10 py-4 rounded-xl shadow-xl text-base flex items-center gap-3 mx-auto transition-colors cursor-pointer">
            <Phone className="h-5 w-5" />
            Call 1-800-555-FLOW
          </button>
        </a>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-2">
          {[
            { label: "Avg. Arrival", value: "20 min" },
            { label: "Available", value: "24 / 7" },
            { label: "Active Technicians", value: "12+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl p-3">
              <p className="text-xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
