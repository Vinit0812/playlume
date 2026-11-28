import { Truck, Box, ShieldCheck, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export const metadata = {
  title: "Freight, Logistics & Shipping Policy",
  description: "B2B freight fulfillment, multi-state road logistics, palletization, and e-way bill protocols.",
  alternates: {
    canonical: "/policies/shipping",
  },
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090E1A] text-slate-100 antialiased">
      <Header />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-950/60 text-blue-400 border border-blue-800/60 mb-4">
            <Truck className="w-3.5 h-3.5" /> Commercial Freight Protocol
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Freight, Shipping & Logistics Policy
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            National multi-modal distribution, palletization specifications, and transit insurance guidelines.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Box className="w-5 h-5 text-blue-400" /> 1. Master Packaging & Palletization
            </h2>
            <p>
              To ensure zero transit damage across inter-state arterial routes, all V&A Global Sourcing inventory is dispatched in export-grade 5-ply / 7-ply corrugated master cartons, reinforced with corner edge-protectors, plastic strap strapping, and waterproof stretch-shrink film wrapping. Master cartons bear clear batch markings, SKU barcoding, and gross/net weight indications.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Shipping Terms & Freight Modes</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                  <Truck className="w-4 h-4 text-blue-400" /> Surface Cargo / Full Truckload (FTL)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Recommended for volume consignments exceeding 500 kg or full container/truck deliveries. Lowest freight cost per unit with verified commercial surface transport lines (VRL, TCI, Safexpress, Delhivery Freight).
                </p>
              </div>
              <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                  <Clock className="w-4 h-4 text-amber-400" /> Express Air Cargo
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Available on request for high-value time-sensitive lots (electronics, horology, sample approvals) with 24 to 48-hour airport-to-airport or door delivery.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. E-Way Bill & Statutory Documentation</h2>
            <p>
              Under Indian GST regulations, every consignment exceeding ₹50,000 is accompanied by a government-generated E-Way Bill (Part A & Part B updated with vehicle registration details), original Tax Invoice (Triplicate for Transporter), and Packing Slip.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Transit Lead Times by Region</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-800/80 text-white font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3 border-b border-slate-700">Hub / Sector</th>
                    <th className="p-3 border-b border-slate-700">Estimated Transit (Surface)</th>
                    <th className="p-3 border-b border-slate-700">Documentation Needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/30">
                  <tr>
                    <td className="p-3 flex items-center gap-2 text-white font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" /> Metro Hubs (Delhi NCR, Mumbai, Bengaluru)
                    </td>
                    <td className="p-3">2 – 4 Working Days</td>
                    <td className="p-3">GSTIN & E-Way Bill</td>
                  </tr>
                  <tr>
                    <td className="p-3 flex items-center gap-2 text-white font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" /> Tier 2 Commercial Distribution Hubs
                    </td>
                    <td className="p-3">3 – 6 Working Days</td>
                    <td className="p-3">GSTIN & Delivery Gate Pass</td>
                  </tr>
                  <tr>
                    <td className="p-3 flex items-center gap-2 text-white font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" /> Special Economic Zones / Remote Corridors
                    </td>
                    <td className="p-3">5 – 8 Working Days</td>
                    <td className="p-3">SEZ Endorsement / Special Permits</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Transit Marine Insurance
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consignments are covered by comprehensive Transit Marine Cargo Insurance against total loss, overturning, fire, and collision during freight movement. Consignee warehouses are advised to maintain active store-inward insurance.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <Link href="/policies/terms" className="hover:text-blue-400 transition-colors">
              ← Wholesale Terms of Supply
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">
              Trade Freight Desk →
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
