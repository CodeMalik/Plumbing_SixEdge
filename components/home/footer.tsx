"use client";

import Link from "next/link";
import { Wrench, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white/90 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-white">Plumbflow</span>
            </div>
            <p className="text-xs text-white/70 max-w-xs leading-relaxed">
              Plumbflow is a trusted portal connecting local, fully licensed plumbing technicians with residential and commercial properties. Available for 24/7 priority emergency dispatches.
            </p>
          </div>

          {/* Links Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Resources</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a href="#plumbers" className="hover:text-white transition-colors">Find a Plumber</a>
              </li>
              <li>
                <a href="#emergency" className="hover:text-white transition-colors">Emergency Protocol</a>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors">Admin Console</Link>
              </li>
              <li>
                <Link href="/admin/signup" className="hover:text-white transition-colors">Create Admin Account</Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Dispatch</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white shrink-0" />
                <span>Emergency: 1-800-555-FLOW</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white shrink-0" />
                <span>support@plumbflow.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white shrink-0" />
                <span>Enterprise Office: Suite 400, Chicago, IL</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 Plumbflow Portal. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
