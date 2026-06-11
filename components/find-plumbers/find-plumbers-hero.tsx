"use client";

import { Search, Droplets, Trash2, Flame, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FindPlumbersHeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (s: string) => void;
}

const specialties = [
  { id: "all", label: "All Services" },
  { id: "leak", label: "Leak Detection", icon: Droplets },
  { id: "drain", label: "Drain Cleaning", icon: Trash2 },
  { id: "heater", label: "Water Heaters", icon: Flame },
  { id: "emergency", label: "Emergency", icon: ShieldAlert, warn: true },
];

export function FindPlumbersHero({ searchQuery, setSearchQuery, selectedSpecialty, setSelectedSpecialty }: FindPlumbersHeroProps) {
  return (
    <section className="bg-[#1E3A8A] text-white py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight">Find a Trusted Plumber</h1>
          <p className="text-white/70 text-base">Browse licensed specialists in your area — available now.</p>
        </div>

        {/* Search */}
        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg max-w-xl mx-auto">
          <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-[#6B7280]" />
          <Input
            placeholder="Search by name, specialty, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 border-0 text-[#1F2937] placeholder:text-[#6B7280] focus-visible:ring-0 bg-white"
          />
        </div>

        {/* Specialty Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            const active = selectedSpecialty === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? spec.warn
                      ? "bg-[#F59E0B] border-[#F59E0B] text-white shadow"
                      : "bg-white border-white text-[#1E3A8A] shadow"
                    : spec.warn
                    ? "border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10"
                    : "border-white/30 text-white/80 hover:bg-white/10"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {spec.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
