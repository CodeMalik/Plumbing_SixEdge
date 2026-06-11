"use client";

import React, { useState } from "react";
import { Phone, User, AlertTriangle, RefreshCw, ShieldCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const emergencyTypes = [
  "Burst / Broken Pipe",
  "Active Flooding",
  "Sewage Backup",
  "No Hot Water",
  "Gas Line Concern",
  "Blocked Drain (Severe)",
];

export function DispatchForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [issueType, setIssueType] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <section className="bg-[#F9FAFB] py-16 border-t border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left info panel */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#1F2937]">Request Emergency Dispatch</h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Fill out the form and a dispatcher will assign the closest available technician immediately. You will receive a call back within <strong className="text-[#1F2937]">5 minutes</strong>.
              </p>
            </div>

            <Separator className="bg-[#E5E7EB]" />

            <div className="space-y-4">
              {[
                { icon: Phone, text: "Dispatcher calls you within 5 minutes" },
                { icon: ShieldCheck, text: "Technician arrives within 20 minutes on average" },
                { icon: FileText, text: "Full incident report provided after service" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#6B7280]">
                  <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl p-4">
              <p className="text-xs text-[#D97706] font-semibold mb-1 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Life-threatening emergency?
              </p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                If you smell gas or suspect carbon monoxide — evacuate immediately and call <strong>911</strong> before using this form.
              </p>
            </div>
          </div>

          {/* Right form */}
          <Card className="bg-white border border-[#E5E7EB] shadow-md">
            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <CardHeader className="border-b border-[#E5E7EB] pb-4">
                  <CardTitle className="text-base font-bold text-[#1F2937]">Emergency Dispatch Request</CardTitle>
                  <CardDescription className="text-xs text-[#6B7280]">All fields required. Dispatched immediately on submission.</CardDescription>
                </CardHeader>
                <CardContent className="pt-5 space-y-4">

                  <div className="space-y-1.5">
                    <Label htmlFor="em-name" className="text-xs font-semibold text-[#1F2937]">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-[#6B7280]" />
                      <Input id="em-name" required placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} className="pl-9 h-10 border-[#E5E7EB] text-[#1F2937] bg-white focus-visible:ring-[#F59E0B]/40 focus-visible:border-[#F59E0B]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="em-phone" className="text-xs font-semibold text-[#1F2937]">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-[#6B7280]" />
                      <Input id="em-phone" type="tel" required placeholder="(555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isLoading} className="pl-9 h-10 border-[#E5E7EB] text-[#1F2937] bg-white focus-visible:ring-[#F59E0B]/40 focus-visible:border-[#F59E0B]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="em-address" className="text-xs font-semibold text-[#1F2937]">Service Address</Label>
                    <Input id="em-address" required placeholder="123 Main St, Chicago, IL" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isLoading} className="h-10 border-[#E5E7EB] text-[#1F2937] bg-white focus-visible:ring-[#F59E0B]/40 focus-visible:border-[#F59E0B]" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-[#1F2937]">Type of Emergency</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {emergencyTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setIssueType(type)}
                          className={`text-[10px] font-semibold px-2 py-2 rounded-lg border text-left transition-colors cursor-pointer leading-tight ${
                            issueType === type
                              ? "bg-[#F59E0B]/10 border-[#F59E0B] text-[#D97706]"
                              : "bg-white border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="em-details" className="text-xs font-semibold text-[#1F2937]">Additional Details</Label>
                    <Textarea id="em-details" required placeholder="Describe the situation in detail — location in property, severity, etc." value={details} onChange={(e) => setDetails(e.target.value)} disabled={isLoading} className="border-[#E5E7EB] text-[#1F2937] bg-white focus-visible:ring-[#F59E0B]/40 focus-visible:border-[#F59E0B] min-h-[80px]" />
                  </div>

                  <Button type="submit" disabled={isLoading || !issueType} className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold h-11 mt-2 flex items-center justify-center gap-2 cursor-pointer">
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Send Emergency Request Now"}
                  </Button>
                </CardContent>
              </form>
            ) : (
              <CardContent className="p-8 text-center space-y-5">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 flex items-center justify-center text-[#10B981]">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#1F2937]">Dispatch Confirmed!</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Your emergency request has been received. A dispatcher will call <strong className="text-[#1F2937]">{phone}</strong> within the next 5 minutes to confirm a technician.
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 text-left space-y-1.5 font-mono text-[10px]">
                  <div><span className="text-[#1F2937] font-bold">Issue:</span> <span className="text-[#6B7280]">{issueType}</span></div>
                  <div><span className="text-[#1F2937] font-bold">Address:</span> <span className="text-[#6B7280]">{address}</span></div>
                  <div><span className="text-[#1F2937] font-bold">ETA:</span> <span className="text-[#6B7280]">~20 minutes</span></div>
                </div>
                <Button onClick={() => { setIsSuccess(false); setName(""); setPhone(""); setAddress(""); setIssueType(""); setDetails(""); }} className="w-full bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-semibold h-9 cursor-pointer">
                  Submit Another Request
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
