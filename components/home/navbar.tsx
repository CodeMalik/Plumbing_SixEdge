"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Wrench, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

interface NavbarProps {
  user: any;
}

const navLinks = [
  { label: "Find Plumbers", href: "/find-plumbers" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Emergency Alerts", href: "/emergency" },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: { onSuccess: () => router.refresh() },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-[#1E3A8A] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-white/10 text-white">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Plumbflow</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors pb-0.5 ${
                isActive(link.href)
                  ? "text-white border-b-2 border-white font-semibold"
                  : "text-white/75 hover:text-white border-b-2 border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Separator orientation="vertical" className="h-4 bg-white/20" />

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/80">
                Hi, <span className="text-white font-semibold">{user.name}</span>
              </span>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="border-white/20 hover:border-white/40 text-white bg-white/5 hover:bg-white/10 h-9">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Console
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-white/80 hover:text-white hover:bg-white/10 h-9"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/admin/login" className="text-white/80 hover:text-white transition-colors text-sm">
                Login
              </Link>
              <Link href="/admin/signup">
                <Button variant="outline" size="sm" className="border-white/20 hover:border-white/40 text-white bg-white/5 hover:bg-white/10 h-9">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-white/10 text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E3A8A] border-t border-white/10 px-4 py-4 space-y-1 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-white/10 text-white"
                  : "text-white/75 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-white/10 space-y-2 mt-2">
            {user ? (
              <>
                <p className="text-xs text-white/60 px-2 py-1">
                  Signed in as <span className="text-white font-semibold">{user.name}</span>
                </p>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-white/20 text-white bg-white/5 hover:bg-white/10">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Console
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  className="w-full text-white/80 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white/80 hover:text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/admin/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-white/20 text-white bg-white/5 hover:bg-white/10">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
