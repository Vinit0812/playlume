import { FileCheck, AlertTriangle, Truck, Receipt, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Wholesale Terms of Supply | PLAYLUME Trading & Distribution",
  description: "Commercial wholesale agreement, MOQ thresholds, proforma terms, and billing specifications.",
};

export default function TermsOfSupplyPage() {
  return (
    <div className="bg-[#090E1A] min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-950/60 text-blue-400 border border-blue-800/60 mb-4">
            <FileCheck className="w-3.5 h-3.5" /> Institutional Commercial Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Wholesale Terms of Supply & Trading
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Governing all commercial RFQs, Proforma Invoices, and Master Carton Dispatches.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-400" /> 1. Commercial Nature of Transactions
            </h2>
            <p>
              PLAYLUME deals strictly in wholesale bulk supply, institutional lots, and commercial distribution contracts. All orders must meet designated Minimum Order Quantities (MOQ) as declared per SKU or master carton tier. Single-piece consumer retail transactions are expressly outside the scope of our distribution operations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Quotation Validity & Indicative Pricing</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 bg-slate-900/40 p-4 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Price Volatility & Raw Material Pegging:</strong>
                  Website-listed prices are indicative base quotes excluding GST and freight. Formal binding prices are issued via generated Proforma Quotations (`PLY-YYMM-XXXX`) valid for 7 calendar days.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-slate-900/40 p-4 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Taxes & Statutory Levies:</strong>
                  All wholesale billing is processed with statutory Goods & Services Tax (GST 18% standard, or applicable HSN rates) with formal tax invoices enabling ITC (Input Tax Credit) for registered buyers.
                </div>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. Payment Terms & Order Confirmation</h2>
            <p>
              Unless an established corporate revolving credit facility or bank guarantee is active, standard order settlement terms are:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-white text-sm mb-1">Standard Ready-Stock Lots:</h4>
                <p className="text-xs text-slate-400">100% advance RTGS / NEFT / IMPS before warehouse dispatch and e-way bill generation.</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-white text-sm mb-1">Contract / Factory Sourcing:</h4>
                <p className="text-xs text-slate-400">30% production advance deposit, 70% against pre-dispatch quality audit and dispatch notice.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Inspection & Claim Protocol</h2>
            <p>
              Upon delivery at the destination warehouse, the recipient enterprise must inspect outer carton seals before signing the logistics consignment note (Lorry Receipt / POD). Any seal breaches or transit discrepancies must be recorded on the POD and reported to PLAYLUME within 48 hours accompanied by unboxing video documentation.
            </p>
          </section>

          <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90 leading-relaxed">
              <strong>Jurisdiction:</strong> All commercial agreements, supply contracts, and disputes arising out of wholesale supply are subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <Link href="/policies/privacy" className="hover:text-blue-400 transition-colors">
              ← Commercial Privacy Policy
            </Link>
            <Link href="/policies/shipping" className="hover:text-blue-400 transition-colors">
              Freight & Shipping Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
