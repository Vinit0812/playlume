"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ClipboardList, Menu, X, Phone, Clock, ShieldCheck } from "lucide-react";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { SITE_CONFIG } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const { totalCount, setIsOpen } = useQuoteBasket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Catalogue" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/become-a-buyer", label: "Become a Buyer" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Trade Desk" },
  ];

  return (
    <>
      {/* 1. Announcement Bar (candlemould.in & B2B trade style) */}
      <div className="bg-brand-950 text-slate-300 text-xs font-medium border-b border-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-extrabold text-accent-400">Verified B2B</span>
            <span className="text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">
              Wholesale sourcing across India • Direct manufacturer pricing
            </span>
            <span className="sm:hidden text-slate-300">Direct factory wholesale</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="tel:+919876543210"
              className="hidden md:inline text-slate-300 hover:text-white transition"
            >
              +91 98765 43210
            </a>
            <span className="hidden lg:inline text-slate-400">Mon–Sat 09:00 – 19:00 IST</span>
            <span className="font-bold text-accent-300 hidden sm:inline">Wholesale orders only</span>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-white transition border-l border-brand-800 pl-3"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Storefront Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-lg bg-brand-700 text-accent-400 flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-brand-800 transition">
              P
            </div>
            <div>
              <span className="font-extrabold text-lg text-brand-900 tracking-tight leading-none block">
                PLAYLUME
              </span>
              <span className="text-[9.5px] font-bold text-brand-600 uppercase tracking-widest block -mt-0.5">
                Wholesale &amp; Trade
              </span>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-neutral-text">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition ${
                    active
                      ? "text-brand-700 bg-brand-50 font-bold"
                      : "text-neutral-text hover:text-brand-800 hover:bg-brand-50/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            {/* WhatsApp Desk Button */}
            <a
              href="https://wa.me/919876543210?text=Hello%20PLAYLUME%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Quote Basket Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold transition shadow-sm"
              aria-label="View Quote Basket"
            >
              <ClipboardList className="w-3.5 h-3.5 text-accent-300" />
              <span className="hidden sm:inline">Quote Basket</span>
              {totalCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-accent-400 text-brand-950 text-[10px] font-black">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-line bg-white px-4 py-3 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-bold text-neutral-text border-b border-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-xs font-bold text-emerald-700"
            >
              WhatsApp Trade Desk (+91 98765 43210)
            </a>
          </div>
        )}
      </header>
    </>
  );
}
