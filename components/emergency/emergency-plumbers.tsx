"use client";

import { Star, MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const emergencyPlumbers = [
  {
    id: "ep1",
    name: "Arthur Pendelton",
    initials: "AP",
    title: "Emergency Callout Specialist",
    rating: 4.91,
    jobs: 178,
    eta: "~12 min",
    location: "Citywide Dispatch",
    phone: "+1 (555) 210-4839",
    tags: ["Burst Pipes", "Flooding", "Gas Lines"],
    status: "on-route",
  },
  {
    id: "ep2",
    name: "James Ortega",
    initials: "JO",
    title: "24/7 Emergency Technician",
    rating: 4.87,
    jobs: 134,
    eta: "~18 min",
    location: "Northside & Westend",
    phone: "+1 (555) 349-0012",
    tags: ["Sewage Backup", "Drain Failure", "Pipe Burst"],
    status: "available",
  },
  {
    id: "ep3",
    name: "Nina Rodriguez",
    initials: "NR",
    title: "Emergency Plumbing Engineer",
    rating: 4.95,
    jobs: 201,
    eta: "~22 min",
    location: "East End & Downtown",
    phone: "+1 (555) 498-7761",
    tags: ["Emergency Repair", "Flooding", "Water Heaters"],
    status: "available",
  },
];

const statusConfig = {
  "on-route": { label: "On Route", className: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/25" },
  "available": { label: "Available", className: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25" },
};

export function EmergencyPlumbers() {
  return (
    <section className="bg-white py-14 border-t border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#1F2937]">Emergency Technicians On Standby</h2>
          <p className="text-sm text-[#6B7280]">
            These certified specialists are available right now for immediate dispatch to your location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {emergencyPlumbers.map((p) => {
            const status = statusConfig[p.status as keyof typeof statusConfig];
            return (
              <Card key={p.id} className="bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#F59E0B]/30 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center font-bold text-sm text-[#D97706] shrink-0">
                        {p.initials}
                      </div>
                      <div>
                        <CardTitle className="text-sm font-bold text-[#1F2937]">{p.name}</CardTitle>
                        <CardDescription className="text-[11px] text-[#6B7280] mt-0.5 leading-tight">{p.title}</CardDescription>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${status.className} flex items-center gap-1 shrink-0 mt-0.5`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      {status.label}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  <div className="border-t border-[#E5E7EB] pt-3 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="font-semibold text-[#1F2937]">{p.rating}</span>
                      <span>({p.jobs} jobs)</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <Clock className="h-3.5 w-3.5 text-[#F59E0B]" />
                      ETA: <span className="font-semibold text-[#1F2937]">{p.eta}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <MapPin className="h-3.5 w-3.5" />
                      {p.location}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-[#F59E0B]/8 border border-[#F59E0B]/20 text-[#D97706]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href={`tel:${p.phone.replace(/\D/g, "")}`}>
                    <button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold h-9 rounded-lg transition-colors cursor-pointer text-xs flex items-center justify-center gap-1.5 mt-1">
                      <Phone className="h-3.5 w-3.5" />
                      Call Directly
                    </button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
