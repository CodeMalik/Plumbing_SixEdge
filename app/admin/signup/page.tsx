"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { User, Mail, Lock, AlertCircle, RefreshCw, ArrowLeft, Database, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
      });

      if (signUpError) {
        setError(signUpError.message || "Failed to sign up.");
      } else {
        setSuccess(true);
        // Automatically redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-2 bg-zinc-950 font-sans text-zinc-100">
      {/* Left side (Desktop only) */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-zinc-950 text-white relative overflow-hidden border-r border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100">
            <Database className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">Plumbflow</span>
        </div>

        {/* Center Plumber Image */}
        <div className="relative z-20 flex flex-col items-center justify-center my-auto py-8">
          <Image
            src="/plumber.png"
            alt="Plumber Graphic"
            width={340}
            height={340}
            className="object-contain opacity-85 mix-blend-screen contrast-200"
            priority
          />
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-zinc-200 font-light leading-relaxed">
              "This secure console manages the registration of authorized personnel. Account creation is subject to review, administrator approval, and logging."
            </p>
            <footer className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
              Secure Access Protocol // Reg_Mgr_v4.2
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right side (Form container) */}
      <div className="flex flex-col justify-center min-h-screen p-6 lg:p-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]">
          
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors self-start">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Admin Signup
            </h1>
            <p className="text-sm text-zinc-400">
              Create an administrator account to access the console
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-zinc-900 border border-red-900/30 text-red-400 text-xs flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-250">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-250">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>Signup successful! Redirecting to dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="Admin User"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading || success}
                  className="pl-10 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-400 h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@plumbflow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || success}
                  className="pl-10 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-400 h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || success}
                  className="pl-10 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-400 h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-zinc-300">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading || success}
                  className="pl-10 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-400 h-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || success}
              className="w-full bg-zinc-50 hover:bg-zinc-200 text-zinc-950 font-semibold h-10 flex items-center justify-center gap-2 mt-6 transition-colors duration-200"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                "Register Admin"
              )}
            </Button>
          </form>

          <div className="text-center text-xs text-zinc-500 pt-4 border-t border-zinc-900">
            Already have an admin account?{" "}
            <Link href="/admin/login" className="text-white hover:underline font-medium">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
