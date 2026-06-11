"use client";

import { Star, ShieldCheck, MapPin, DollarSign } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Plumber {
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
}

interface PlumberListProps {
  searchQuery: string;
  selectedSpecialty: string;
  onHire: (plumber: Plumber) => void;
  onReset: () => void;
}

export function PlumberList({ searchQuery, selectedSpecialty, onHire, onReset }: PlumberListProps) {
  const plumbers: Plumber[] = [
    {
      id: "p1",
      name: "Marcus Vance",
      specialty: "Master Plumber & Leak Specialist",
      specialtyKey: "leak",
      rating: 4.93,
      reviewsCount: 142,
      rate: "$85/hr",
      location: "Central & Westside",
      available: true,
      avatarInitials: "MV",
      tags: ["Leak Detection", "Emergency Repair", "Pipe Fitting"],
    },
    {
      id: "p2",
      name: "David Kross",
      specialty: "Drain Cleaning & Mainline Technician",
      specialtyKey: "drain",
      rating: 4.85,
      reviewsCount: 98,
      rate: "$75/hr",
      location: "East End & Suburbs",
      available: true,
      avatarInitials: "DK",
      tags: ["Drain Cleaning", "Hydro-Jetting", "Sewer Inspection"],
    },
    {
      id: "p3",
      name: "Sarah Lin",
      specialty: "Water Heater & Boiler Engineer",
      specialtyKey: "heater",
      rating: 4.97,
      reviewsCount: 114,
      rate: "$95/hr",
      location: "Northside & Downtown",
      available: false,
      avatarInitials: "SL",
      tags: ["Water Heaters", "Boilers", "Gas Lines"],
    },
    {
      id: "p4",
      name: "Arthur Pendelton",
      specialty: "Emergency Callout Specialist",
      specialtyKey: "emergency",
      rating: 4.91,
      reviewsCount: 178,
      rate: "$110/hr",
      location: "Citywide Dispatch",
      available: true,
      avatarInitials: "AP",
      tags: ["Emergency Repair", "Burst Pipes", "Flooding Specialist"],
    },
    {
      id: "p5",
      name: "Robert Diaz",
      specialty: "Residential Renovations Plumber",
      specialtyKey: "leak",
      rating: 4.79,
      reviewsCount: 64,
      rate: "$80/hr",
      location: "Southside & Hills",
      available: true,
      avatarInitials: "RD",
      tags: ["Bathroom Install", "Leak Detection", "Fixtures"],
    },
  ];

  // Filtering logic
  const filteredPlumbers = plumbers.filter((plumber) => {
    // Filter by search query (name, specialty, tags)
    const matchesSearch =
      plumber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plumber.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plumber.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter by specialty tab
    const matchesSpecialty =
      selectedSpecialty === "all" ||
      plumber.specialtyKey === selectedSpecialty ||
      (selectedSpecialty === "emergency" && plumber.tags.includes("Emergency Repair"));

    return matchesSearch && matchesSpecialty;
  });

  return (
    <section id="plumbers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937]">Available Plumbing Professionals</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Browse profile cards, rates, ratings, and instant booking availability.
          </p>
        </div>
        <span className="text-xs font-mono text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-1.5 rounded-md self-start md:self-auto">
          Showing {filteredPlumbers.length} Plumbers
        </span>
      </div>

      {filteredPlumbers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#E5E7EB] rounded-xl bg-[#F9FAFB] space-y-3">
          <p className="text-sm text-[#6B7280]">No plumbing specialists found matching your parameters.</p>
          <button
            onClick={onReset}
            className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
          >
            Clear filters and search query
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlumbers.map((plumber) => (
            <Card
              key={plumber.id}
              className="bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#2563EB]/30 transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] font-bold text-sm">
                      {plumber.avatarInitials}
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-[#1F2937] flex items-center gap-1.5">
                        {plumber.name}
                        <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
                      </CardTitle>
                      <CardDescription className="text-xs text-[#6B7280] leading-normal">
                        {plumber.specialty}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  {plumber.available ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25">
                      <span className="h-1.5 w-1.5 bg-[#10B981] rounded-full animate-pulse" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/25">
                      Busy
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4 flex-1 flex flex-col justify-between">
                
                {/* Details list */}
                <div className="space-y-2 border-t border-[#E5E7EB] pt-4 text-xs">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="font-semibold text-[#1F2937]">{plumber.rating.toFixed(2)}</span>
                    <span>({plumber.reviewsCount} verified jobs)</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <MapPin className="h-4 w-4 text-[#6B7280]" />
                    <span>{plumber.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <DollarSign className="h-4 w-4 text-[#1E3A8A]" />
                    <span className="font-semibold text-[#1F2937]">{plumber.rate}</span>
                    <span>base rate</span>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {plumber.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="pt-4 border-t border-[#E5E7EB] mt-auto">
                  <Button
                    onClick={() => onHire(plumber)}
                    className="w-full bg-[#2563EB] hover:bg-[#1E3A8A] text-white font-semibold h-9 rounded-lg transition-colors cursor-pointer"
                  >
                    Hire Plumber
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
