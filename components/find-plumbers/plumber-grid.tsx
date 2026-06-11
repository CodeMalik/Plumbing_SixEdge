"use client";

import { Star, ShieldCheck, MapPin, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Plumber {
  id: string;
  name: string;
  specialty: string;
  specialtyKey: "leak" | "drain" | "heater" | "emergency";
  rating: number;
  reviewsCount: number;
  rate: string;
  location: string;
  available: boolean;
  avatarInitials: string;
  tags: string[];
  experience: string;
}

export const PLUMBERS: Plumber[] = [
  { id: "p1", name: "Marcus Vance", specialty: "Master Plumber & Leak Specialist", specialtyKey: "leak", rating: 4.93, reviewsCount: 142, rate: "$85/hr", location: "Central & Westside", available: true, avatarInitials: "MV", tags: ["Leak Detection", "Emergency Repair", "Pipe Fitting"], experience: "12 yrs exp." },
  { id: "p2", name: "David Kross", specialty: "Drain Cleaning & Mainline Technician", specialtyKey: "drain", rating: 4.85, reviewsCount: 98, rate: "$75/hr", location: "East End & Suburbs", available: true, avatarInitials: "DK", tags: ["Drain Cleaning", "Hydro-Jetting", "Sewer Inspection"], experience: "8 yrs exp." },
  { id: "p3", name: "Sarah Lin", specialty: "Water Heater & Boiler Engineer", specialtyKey: "heater", rating: 4.97, reviewsCount: 114, rate: "$95/hr", location: "Northside & Downtown", available: false, avatarInitials: "SL", tags: ["Water Heaters", "Boilers", "Gas Lines"], experience: "15 yrs exp." },
  { id: "p4", name: "Arthur Pendelton", specialty: "Emergency Callout Specialist", specialtyKey: "emergency", rating: 4.91, reviewsCount: 178, rate: "$110/hr", location: "Citywide Dispatch", available: true, avatarInitials: "AP", tags: ["Emergency Repair", "Burst Pipes", "Flooding"], experience: "10 yrs exp." },
  { id: "p5", name: "Robert Diaz", specialty: "Residential Renovations Plumber", specialtyKey: "leak", rating: 4.79, reviewsCount: 64, rate: "$80/hr", location: "Southside & Hills", available: true, avatarInitials: "RD", tags: ["Bathroom Install", "Leak Detection", "Fixtures"], experience: "6 yrs exp." },
  { id: "p6", name: "Priya Sharma", specialty: "Commercial Plumbing Engineer", specialtyKey: "drain", rating: 4.88, reviewsCount: 203, rate: "$100/hr", location: "Business District", available: true, avatarInitials: "PS", tags: ["Commercial Plumbing", "Drain Systems", "Code Compliance"], experience: "18 yrs exp." },
];

interface PlumberGridProps {
  searchQuery: string;
  selectedSpecialty: string;
  onHire: (plumber: Plumber) => void;
  onReset: () => void;
}

export function PlumberGrid({ searchQuery, selectedSpecialty, onHire, onReset }: PlumberGridProps) {
  const filtered = PLUMBERS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchSpec =
      selectedSpecialty === "all" ||
      p.specialtyKey === selectedSpecialty ||
      (selectedSpecialty === "emergency" && p.tags.includes("Emergency Repair"));
    return matchSearch && matchSpec;
  });

  return (
    <section className="bg-[#F9FAFB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6B7280]">
            Showing <span className="font-semibold text-[#1F2937]">{filtered.length}</span> plumbers
          </p>
          {(searchQuery || selectedSpecialty !== "all") && (
            <button onClick={onReset} className="text-xs text-[#2563EB] hover:underline cursor-pointer">
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#E5E7EB] rounded-xl bg-white">
            <p className="text-sm text-[#6B7280]">No plumbers match your criteria.</p>
            <button onClick={onReset} className="text-xs text-[#2563EB] hover:underline mt-2 cursor-pointer block mx-auto">
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((plumber) => (
              <Card key={plumber.id} className="bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#2563EB]/30 transition-all flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] font-bold text-sm shrink-0">
                        {plumber.avatarInitials}
                      </div>
                      <div>
                        <CardTitle className="text-sm font-bold text-[#1F2937] flex items-center gap-1">
                          {plumber.name}
                          <ShieldCheck className="h-3.5 w-3.5 text-[#2563EB]" />
                        </CardTitle>
                        <CardDescription className="text-[11px] text-[#6B7280] leading-normal mt-0.5">
                          {plumber.specialty}
                        </CardDescription>
                      </div>
                    </div>
                    {plumber.available ? (
                      <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-[#10B981] rounded-full animate-pulse" />
                        Available
                      </span>
                    ) : (
                      <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/25">
                        Busy
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col gap-3">
                  <div className="space-y-1.5 border-t border-[#E5E7EB] pt-3 text-xs">
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <Star className="h-3.5 w-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                      <span className="font-semibold text-[#1F2937]">{plumber.rating}</span>
                      <span>({plumber.reviewsCount} jobs) • {plumber.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <MapPin className="h-3.5 w-3.5" />
                      {plumber.location}
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <DollarSign className="h-3.5 w-3.5 text-[#1E3A8A]" />
                      <span className="font-semibold text-[#1F2937]">{plumber.rate}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {plumber.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() => onHire(plumber)}
                    className="mt-auto w-full bg-[#2563EB] hover:bg-[#1E3A8A] text-white font-semibold h-9 rounded-lg transition-colors cursor-pointer"
                  >
                    Hire Plumber
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
