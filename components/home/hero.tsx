"use client";

import { Search, Flame, Droplets, Trash2, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
}

export function Hero({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
}: HeroProps) {
  const specialties = [
    { id: "all", label: "All Services" },
    { id: "leak", label: "Leak Detection", icon: Droplets },
    { id: "drain", label: "Drain Cleaning", icon: Trash2 },
    { id: "heater", label: "Water Heaters", icon: Flame },
    { id: "emergency", label: "Emergency Repair", icon: ShieldAlert, isEmergency: true },
  ];

  return (
    <section className="bg-[#F9FAFB] py-16 border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Urgent alert banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-xs text-[#F59E0B] font-semibold tracking-wide animate-pulse">
          <ShieldAlert className="h-4 w-4" />
          24/7 Emergency Dispatch Active
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1F2937] leading-tight">
            Find & Hire Trusted Local Plumbers
          </h1>
          <p className="text-lg text-[#6B7280] max-w-xl mx-auto leading-relaxed">
            Connect with verified, fully licensed plumbing professionals in your area. Quick response, clear pricing, guaranteed work.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto relative shadow-sm rounded-lg overflow-hidden bg-white border border-[#E5E7EB] focus-within:ring-2 focus-within:ring-[#2563EB]/40 focus-within:border-[#2563EB] transition-all">
          <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-[#6B7280]" />
          <Input
            type="text"
            placeholder="Search by plumber name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 py-6 w-full bg-white border-0 text-[#1F2937] placeholder:text-[#6B7280] focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
          />
        </div>

        {/* Quick Filter Specialty Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            const isSelected = selectedSpecialty === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? spec.isEmergency
                      ? "bg-[#F59E0B] text-white border-[#F59E0B] shadow-md"
                      : "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                    : spec.isEmergency
                    ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 hover:bg-[#F59E0B]/20"
                    : "bg-white text-[#1F2937] border-[#E5E7EB] hover:bg-zinc-50"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                {spec.label}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
