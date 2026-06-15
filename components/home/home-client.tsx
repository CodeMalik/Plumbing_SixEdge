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
import { CheckCircle, Clock, Shield, Star, Users, Zap } from "lucide-react";

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
    <div className="min-h-screen bg-white flex flex-col text-slate-900 font-sans">
      <Navbar user={session?.user} />
      
      <main className="grow">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
        />

        {/* Trust Indicators Section */}
        <section className="bg-slate-50 border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">2,500+</div>
                <p className="text-xs sm:text-sm text-slate-600">Verified Plumbers</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">15K+</div>
                <p className="text-xs sm:text-sm text-slate-600">Happy Customers</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">4.8★</div>
                <p className="text-xs sm:text-sm text-slate-600">Average Rating</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">24/7</div>
                <p className="text-xs sm:text-sm text-slate-600">Support Available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Plumber List Section */}
        <PlumberList
          searchQuery={searchQuery}
          selectedSpecialty={selectedSpecialty}
          onHire={handleHirePlumber}
          onReset={handleResetFilters}
        />

        {/* Why Choose PlumbFlow Section */}
        <section className="bg-white border-t border-slate-200 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why Choose PlumbFlow?</h2>
              <p className="text-lg text-slate-600">
                We've revolutionized how homeowners find and hire trusted plumbing professionals with our transparent, secure, and convenient platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Vetted Professionals */}
              <div className="bg-slate-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Vetted Professionals</h3>
                <p className="text-slate-600 leading-relaxed">
                  Every plumber is thoroughly background-checked, licensed, and insured for your peace of mind.
                </p>
              </div>

              {/* Real-Time Availability */}
              <div className="bg-slate-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Quick Response Time</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get contacted within 15 minutes. Same-day service available for urgent plumbing emergencies.
                </p>
              </div>

              {/* Transparent Pricing */}
              <div className="bg-slate-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 mb-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">No Hidden Fees</h3>
                <p className="text-slate-600 leading-relaxed">
                  See upfront rates before booking. What you see is what you pay—no surprises on the bill.
                </p>
              </div>

              {/* Expert Specialists */}
              <div className="bg-slate-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Specialists</h3>
                <p className="text-slate-600 leading-relaxed">
                  Find specialists for any job: drain cleaning, water heaters, gas lines, repairs, and more.
                </p>
              </div>

              {/* Verified Reviews */}
              <div className="bg-slate-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real Customer Reviews</h3>
                <p className="text-slate-600 leading-relaxed">
                  Read authentic feedback from thousands of verified customers to make informed choices.
                </p>
              </div>

              {/* Satisfaction Guarantee */}
              <div className="bg-slate-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 mb-4">
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Satisfaction Guarantee</h3>
                <p className="text-slate-600 leading-relaxed">
                  Not satisfied with the work? We'll help resolve any disputes and ensure quality service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works - Process Steps */}
        <Features />

        {/* How PlumbFlow Works - Detailed Section */}
        <section id="how-it-works" className="bg-blue-50 border-t border-blue-200 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Simple 3-Step Process</h2>
              <p className="text-lg text-slate-600">
                Booking a professional plumber has never been easier. Get quality service in just a few clicks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Search & Filter</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Use our smart filters to find plumbers by specialty, rating, availability, and location. Compare rates instantly.
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-slate-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Book Instantly</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Select your preferred plumber and submit a service request. Lock in the rate before confirming the booking.
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-slate-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900">Get Expert Service</h3>
                <p className="text-slate-600 leading-relaxed">
                  Your plumber contacts you within 15 minutes to confirm details. Professional service delivered on time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Emergency Service CTA Section */}
        <section id="emergency" className="bg-linear-to-r from-red-600 to-red-700 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Emergency Plumbing? We're Here 24/7</h2>
              <p className="text-lg text-red-100 max-w-2xl mx-auto leading-relaxed">
                Burst pipes, sewer backups, or flooding? Don't wait. Our emergency dispatch team is standing by to connect you with an available plumber immediately.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-800-555-FLOW" className="inline-block">
                <button className="w-full sm:w-auto bg-white text-red-600 font-bold px-8 py-4 rounded-lg hover:bg-red-50 shadow-lg transition-colors text-base">
                  📞 Call Now: 1-800-555-FLOW
                </button>
              </a>
              <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-colors text-base">
                Request Service Online
              </button>
            </div>
            <p className="text-sm text-red-100">
              Average response time: <span className="font-bold">15 minutes</span> • Available in your area
            </p>
          </div>
        </section>

        {/* CTA Section - Professional Signup */}
        <section className="bg-slate-50 border-t border-slate-200 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Ready to Get Your Plumbing Fixed?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Browse our network of verified plumbers, compare prices, and book your service in minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  document.getElementById("plumber-list")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-colors text-base"
              >
                Browse Plumbers
              </button>
              {!session?.user && (
                <a href="/admin/login" className="inline-block">
                  <button className="w-full sm:w-auto bg-slate-200 text-slate-900 hover:bg-slate-300 font-bold px-8 py-4 rounded-lg transition-colors text-base">
                    Sign In
                  </button>
                </a>
              )}
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
