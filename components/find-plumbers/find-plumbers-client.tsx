"use client";

import { useState } from "react";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { BookingModal } from "@/components/home/booking-modal";
import { FindPlumbersHero } from "./find-plumbers-hero";
import { PlumberGrid, Plumber } from "./plumber-grid";

interface FindPlumbersClientProps {
  session: any;
}

export function FindPlumbersClient({ session }: FindPlumbersClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedPlumber, setSelectedPlumber] = useState<Plumber | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <Navbar user={session?.user} />

      <main className="flex-grow">
        <FindPlumbersHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
        />
        <PlumberGrid
          searchQuery={searchQuery}
          selectedSpecialty={selectedSpecialty}
          onHire={(p) => { setSelectedPlumber(p); setIsModalOpen(true); }}
          onReset={() => { setSearchQuery(""); setSelectedSpecialty("all"); }}
        />
      </main>

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plumber={selectedPlumber}
      />
    </div>
  );
}
