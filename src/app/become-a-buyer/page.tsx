"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerRegistrationSchema, type BuyerRegistrationFormData } from "@/lib/validations";
import { INDIAN_STATES, SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  TrendingUp,
  Package,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function BecomeABuyerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerRegistrationFormData>({
    resolver: zodResolver(buyerRegistrationSchema),
    defaultValues: {
      businessType: "retailer",
    },
  });

  async function onSubmit(data: BuyerRegistrationFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1 py-12 px-4 max-w-5xl mx-auto w-full">
        {submitted ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-sm text-center max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-950">Commercial Account Registered</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Your trading business has been enrolled into the V&amp;A Global Sourcing commercial network. Your designated wholesale representative will contact you via WhatsApp with preferred rate slabs.
            </p>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%20V%26A%20Global%20Sourcing%2C%20I%20have%20registered%20as%20an%20authorized%20buyer.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs py-3 rounded-xl transition shadow-md"
              >
                <span>Connect with Account Manager on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* Header */}
            <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                Institutional Partnership
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
                Register as an Authorized Wholesale Buyer
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
                Connect your retail store, wholesale firm, or distribution network with V&amp;A Global Sourcing. Access tiered manufacturer rate contracts, recurring volume allocations, and customized supply solutions.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-950 text-sm">Volume Price Slabs</h3>
                <p className="text-xs text-slate-500 mt-1">Preferential pricing for ongoing order schedules and master-carton allocations.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-950 text-sm">Advance Lot Access</h3>
                <p className="text-xs text-slate-500 mt-1">First-look reservations on seasonal incoming containers before open market release.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-950 text-sm">Dedicated Account Desk</h3>
                <p className="text-xs text-slate-500 mt-1">Single-point commercial representative on WhatsApp for quotes, packing, and dispatch.</p>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm max-w-3xl mx-auto">
              <h2 className="text-lg font-bold text-slate-950 mb-1">Commercial Buyer Registration Form</h2>
              <p className="text-xs text-slate-500 mb-6">Enter your trading entity details for verified commercial enrollment.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      {...register("name")}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                    />
                    {errors.name && <p className="text-rose-600 text-[11px] mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Store Trade Name</label>
                    <input
                      {...register("businessName")}
                      placeholder="e.g. Patel Retail Enterprises"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Contact *</label>
                    <input
                      {...register("phone")}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                    />
                    {errors.phone && <p className="text-rose-600 text-[11px] mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Trade Business Type</label>
                    <select
                      {...register("businessType")}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition font-medium"
                    >
                      <option value="retailer">Retail Shop / Showroom Owner</option>
                      <option value="wholesaler">Regional Wholesaler / Stockist</option>
                      <option value="distributor">Commercial Distributor</option>
                      <option value="other">Corporate Gifting / Online Reseller</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Operating State</label>
                    <select
                      {...register("state")}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition font-medium"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City / Trade Market</label>
                    <input
                      {...register("city")}
                      placeholder="e.g. Surat, Zaveri Bazaar"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address (Optional)</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="trade@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs py-4 rounded-xl transition shadow-md flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                >
                  <span>{loading ? "Registering Commercial Entity..." : "Complete Wholesale Enrollment"}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            </div>

          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
