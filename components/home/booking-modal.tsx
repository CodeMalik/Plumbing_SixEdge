"use client";

import React, { useState } from "react";
import { X, Calendar, Phone, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  plumber: {
    name: string;
    specialty: string;
    rate: string;
  } | null;
}

export function BookingModal({ isOpen, onClose, plumber }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [urgency, setUrgency] = useState("standard");
  const [details, setDetails] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !plumber) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate api request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setName("");
    setPhone("");
    setUrgency("standard");
    setDetails("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F2937]/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-2xl border border-[#E5E7EB] w-full max-w-md overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-[#1F2937] transition-colors p-1 rounded-full hover:bg-zinc-100 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#1F2937]">Hire {plumber.name}</h2>
              <p className="text-xs text-[#6B7280]">
                {plumber.specialty} • <span className="font-semibold text-[#1E3A8A]">{plumber.rate}</span>
              </p>
            </div>

            <Separator className="bg-[#E5E7EB]" />

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="cust-name" className="text-[#1F2937] text-xs font-semibold">Your Full Name</Label>
                <Input
                  id="cust-name"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="border-[#E5E7EB] text-[#1F2937] focus-visible:ring-[#2563EB]/40 focus-visible:border-[#2563EB] h-10 bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cust-phone" className="text-[#1F2937] text-xs font-semibold">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-3.5 w-3.5 text-[#6B7280]" />
                  <Input
                    id="cust-phone"
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                    className="pl-9 border-[#E5E7EB] text-[#1F2937] focus-visible:ring-[#2563EB]/40 focus-visible:border-[#2563EB] h-10 bg-white"
                  />
                </div>
              </div>

              {/* Urgency Selector */}
              <div className="space-y-1.5">
                <Label className="text-[#1F2937] text-xs font-semibold block">Job Urgency Level</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency("standard")}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                      urgency === "standard"
                        ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                        : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-zinc-50"
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Standard Book
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency("emergency")}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                      urgency === "emergency"
                        ? "border-[#F59E0B] bg-[#F59E0B]/5 text-[#F59E0B]"
                        : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-zinc-50"
                    }`}
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Urgent Alert
                  </button>
                </div>
              </div>

              {urgency === "emergency" && (
                <div className="p-2.5 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-[11px] flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>This sets a high priority alert for immediate contact. Additional dispatch fees may apply.</span>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="cust-details" className="text-[#1F2937] text-xs font-semibold">Problem Details</Label>
                <Textarea
                  id="cust-details"
                  required
                  placeholder="Describe your plumbing problem (e.g. leaking kitchen pipe, clogged drain...)"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  disabled={isLoading}
                  className="border-[#E5E7EB] text-[#1F2937] focus-visible:ring-[#2563EB]/40 focus-visible:border-[#2563EB] min-h-[70px] bg-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold py-2.5 h-10 flex items-center justify-center gap-2 mt-4 rounded-lg transition-colors cursor-pointer"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                "Confirm & Hire Plumber"
              )}
            </Button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center border border-[#10B981]/25">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#1F2937]">Request Confirmed!</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Your booking request has been sent. <span className="font-semibold text-[#1F2937]">{plumber.name}</span> will contact you at <span className="font-semibold text-[#1E3A8A]">{phone}</span> within 15 minutes.
              </p>
            </div>

            <Separator className="bg-[#E5E7EB]" />

            <div className="text-left text-xs bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB] space-y-2 font-mono text-[#6B7280]">
              <div><span className="text-[#1F2937] font-semibold">Service:</span> {plumber.specialty}</div>
              <div><span className="text-[#1F2937] font-semibold">Priority:</span> {urgency === "emergency" ? "URGENT dispatch" : "Standard"}</div>
              <div><span className="text-[#1F2937] font-semibold">Rate:</span> {plumber.rate}</div>
            </div>

            <Button
              onClick={handleClose}
              className="w-full bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-semibold h-10 transition-colors cursor-pointer"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
