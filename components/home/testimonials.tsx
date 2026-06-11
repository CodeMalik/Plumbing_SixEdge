"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const reviews = [
    {
      name: "Clara Reynolds",
      location: "Downtown Loftowner",
      rating: 5,
      comment: "A pipe burst in my basement at 11 PM. I used Plumbflow, hired Marcus Vance, and he arrived in 20 minutes to fix it! Absolute lifesaver, clean work, fair pricing.",
    },
    {
      name: "Arthur Jenkins",
      location: "Property Manager",
      rating: 5,
      comment: "Plumbflow has streamlined how we hire plumbers for our rental portfolio. Sarah Lin resolved a massive boiler issue that other mechanics couldn't diagnose.",
    },
    {
      name: "James Henderson",
      location: "Suburban Homeowner",
      rating: 4.8,
      comment: "David Kross arrived on short notice for a sewer backup. Friendly, transparent flat-rate pricing, and he cleaned up the work area perfectly afterwards. Highly recommend.",
    },
  ];

  return (
    <section className="bg-[#F9FAFB] py-16 border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl font-bold text-[#1F2937]">What Our Clients Say</h2>
          <p className="text-sm text-[#6B7280]">
            Verified reviews from residential and commercial customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <Card key={idx} className="bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
              <CardContent className="p-6 space-y-4 flex flex-col justify-between h-full">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(rev.rating)
                              ? "text-[#F59E0B] fill-[#F59E0B]"
                              : "text-zinc-200"
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="h-5 w-5 text-[#2563EB]/10" />
                  </div>

                  <p className="text-xs text-[#6B7280] italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-3 mt-4">
                  <div className="w-9 h-9 rounded-full bg-[#1E3A8A]/5 flex items-center justify-center text-[#1E3A8A] font-bold text-xs">
                    {rev.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1F2937]">{rev.name}</h5>
                    <p className="text-[10px] text-[#6B7280]">{rev.location}</p>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
