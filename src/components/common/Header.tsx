import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Layers, MessageSquare, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function Header() {
  return (
    <>
      {/* 1. Institutional Top Bar */}
      <div className="bg-slate-950 text-slate-400 border-b border-slate-800/80 text-[11px] font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/60 text-blue-300 font-semibold text-[10px] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified Trade Partner
            </span>
            <span className="hidden md:inline text-slate-400">Direct Sourcing • Pan-India Commercial Logistics • GST Invoicing</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 inline" />
              Trading Hours: Mon–Sat 09:00 – 19:00 IST
            </span>
            <Link href="/admin" className="text-slate-400 hover:text-white transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Executive Navigation Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-white shadow-md relative overflow-hidden group-hover:border-blue-600 transition">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-transparent opacity-60"></div>
              <Layers className="w-5 h-5 text-amber-400 relative z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-slate-950">PLAYLUME</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">B2B</span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest -mt-0.5">Wholesale Trading & Distribution</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-slate-700">
            <Link href="/" className="text-blue-600 hover:text-blue-700 transition">Overview</Link>
            <Link href="/products" className="hover:text-slate-950 transition">Catalogue</Link>
            <Link href="/categories" className="hover:text-slate-950 transition">Divisions</Link>
            <Link href="/trending" className="hover:text-slate-950 transition">Trending Lots</Link>
            <Link href="/become-a-buyer" className="hover:text-slate-950 transition">Buyer Network</Link>
            <Link href="/about" className="hover:text-slate-950 transition">Company Profile</Link>
            <Link href="/contact" className="hover:text-slate-950 transition">Trade Desk</Link>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%20PLAYLUME%2C%20I%20am%20a%20commercial%20buyer%20inquiring%20about%20wholesale%20rates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>

            <Link
              href="/enquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide transition shadow-sm shadow-blue-500/25"
            >
              <span>Request Bulk Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
