import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { SITE_CONFIG } from "@/lib/constants";
import { Phone, Mail, MapPin, MessageSquare, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Trade Desk & Wholesale Contact — PLAYLUME",
  description: "Contact the PLAYLUME commercial wholesale trade desk. Connect with our sourcing specialists via phone, email, or direct WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1 py-12 px-4 max-w-5xl mx-auto w-full space-y-10">
        {/* Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            Commercial Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
            Wholesale Trade Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-2 leading-relaxed">
            Connect directly with our sourcing representatives for volume pricing, sample requests, and transport logistics.
          </p>
        </div>

        {/* Contact Channels */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-950">Commercial Inquiries</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-900">Commercial Sales Desk</span>
                  <span className="text-slate-600">{SITE_CONFIG.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-900">Email Commercial RFQ</span>
                  <span className="text-slate-600">{SITE_CONFIG.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-900">Commercial Logistics</span>
                  <span className="text-slate-600">{SITE_CONFIG.address}</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%20PLAYLUME%2C%20I%20have%20an%20urgent%20wholesale%20procurement%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl transition shadow-md shadow-emerald-600/25"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp Wholesale Desk</span>
            </a>
          </div>

          {/* Business Hours & Quick RFQ */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Trading & Operating Hours
              </h2>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>Monday – Friday:</span>
                  <span className="font-bold text-slate-900">09:00 – 19:00 IST</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>Saturday:</span>
                  <span className="font-bold text-slate-900">09:00 – 17:00 IST</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Sunday:</span>
                  <span className="text-rose-600 font-bold">Closed (Dispatch Only)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Need a Formal Proforma Quote?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Use our structured RFQ engine to submit detailed quantity and transport destination criteria for instant routing.
              </p>
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition mt-2"
              >
                <span>Submit Detailed RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
