"use client";

import React, { useState } from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { PlumberList } from "./plumber-list";
import { BookingModal } from "./booking-modal";
import { Footer } from "./footer";
import { Features } from "./features";
import { Testimonials } from "./testimonials";
import { FAQ } from "./faq";

interface HomeClientProps {
  session: any;
}

export function HomeClient({ session }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedPlumber, setSelectedPlumber] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHirePlumber = (plumber: any) => {
    setSelectedPlumber(plumber);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("all");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-between text-[#1F2937] font-sans">
      <Navbar user={session?.user} />
      
      <main className="flex-grow">
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
        />

        <PlumberList
          searchQuery={searchQuery}
          selectedSpecialty={selectedSpecialty}
          onHire={handleHirePlumber}
          onReset={handleResetFilters}
        />

        <Features />

        {/* How it works info section */}
        <section id="how-it-works" className="bg-white border-t border-[#E5E7EB] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h3 className="text-2xl font-bold text-[#1F2937]">How Plumbflow Works</h3>
              <p className="text-sm text-[#6B7280]">Booking a local plumbing technician is quick, easy, and secure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3 p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#1E3A8A]/5 text-[#1E3A8A] border border-[#1E3A8A]/10 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="text-base font-bold text-[#1F2937]">Filter Specialists</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Search by specialty tag like leak detection, hot water boilers, or drain cleaning to find the right technician.
                </p>
              </div>

              <div className="space-y-3 p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#1E3A8A]/5 text-[#1E3A8A] border border-[#1E3A8A]/10 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="text-base font-bold text-[#1F2937]">Confirm Rates</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  View clear, pre-negotiated hourly base rates and verified ratings before hiring. No hidden surprises.
                </p>
              </div>

              <div className="space-y-3 p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#1E3A8A]/5 text-[#1E3A8A] border border-[#1E3A8A]/10 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="text-base font-bold text-[#1F2937]">Instant Contact</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Submit a dispatch alert. Your plumber will contact you directly within 15 minutes to coordinate arrival.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        <FAQ />

        {/* Emergency dispatch alerts section */}
        <section id="emergency" className="bg-[#F59E0B]/5 border-t border-[#F59E0B]/20 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h3 className="text-2xl font-bold text-[#1F2937]">Need Emergency Service?</h3>
            <p className="text-sm text-[#6B7280] max-w-xl mx-auto leading-relaxed">
              Burst pipes, severe sewage backups, and active flooding require immediate attention. Our priority dispatch line is online 24/7/365.
            </p>
            <div className="pt-2">
              <a href="tel:1-800-555-FLOW">
                <button className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold px-8 py-3.5 rounded-lg shadow-md transition-colors cursor-pointer text-sm">
                  Call 1-800-555-FLOW Now
                </button>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Booking Modal Popup */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plumber={selectedPlumber}
      />
    </div>
  );
}
