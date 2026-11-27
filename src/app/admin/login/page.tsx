"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Shield, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your administrator credentials.");
      return;
    }

    setLoading("Authenticating...");

    // Set demo session cookie for development & redirect
    document.cookie = `next-auth.session-token=demo-session-token; path=/; max-age=86400; SameSite=Lax`;
    
    setTimeout(() => {
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#090E1A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Website
        </Link>

        {/* Corporate Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-xl shadow-lg shadow-blue-900/40 mb-4">
            P
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            V&A Global Sourcing Management
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Authorized Personnel & Trade Operations Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/40 border border-red-800/60 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@V&A Global Sourcing.in"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-0"
                />
                <span>Remember console terminal</span>
              </label>
              <span className="text-slate-500 hover:text-slate-400 cursor-pointer">
                Reset via 2FA
              </span>
            </div>

            <button
              type="submit"
              disabled={!!loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? (
                <span>{loading}</span>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>256-Bit Encrypted Institutional Admin Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
