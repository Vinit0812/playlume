import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | PLAYLUME Wholesale Trading & Distribution",
  description: "Enterprise data privacy and buyer protection policy for PLAYLUME B2B clients.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#090E1A] min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-950/60 text-blue-400 border border-blue-800/60 mb-4">
            <Shield className="w-3.5 h-3.5" /> Institutional Data Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Commercial Privacy Policy
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Effective Date: November 2026 | Last Updated: Q4 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" /> 1. Commitment to B2B Data Security
            </h2>
            <p>
              PLAYLUME Wholesale Trading & Distribution operates strictly as a Business-to-Business (B2B) trade platform. We collect, process, and retain commercial enterprise data solely for business identity verification, GST compliance, order logistics, and proforma quotation processing under the provisions of the Information Technology Act, 2000 and associated data protection regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Commercial Information Collected</h2>
            <p>When you submit a Request for Quotation (RFQ) or onboard as a Registered Buyer, we collect:</p>
            <ul className="grid sm:grid-cols-2 gap-3 mt-3">
              <li className="flex items-start gap-2 bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Authorized Business Name & Trade License / GSTIN</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Designated Procurement Officer Contact (Phone & WhatsApp)</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Registered Dispatch & Delivery Warehouse Addresses</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Lot Quantities, SKU specifications & Tender Requirements</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. Non-Disclosure & Confidentiality Shield</h2>
            <p>
              Your procurement volumes, agreed wholesale contract rates, and company contact details are strictly confidential. PLAYLUME never sells, rents, or exposes buyer details to third-party commercial brokers or advertisers. Data is exclusively routed to our internal trade desk, verified logistics carriers, and statutory GST e-way billing systems.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Data Storage & Security Controls</h2>
            <p>
              All inquiry and quotation records are encrypted in transit via Transport Layer Security (TLS 1.3) and stored in hardened, firewalled relational database clusters. Access to buyer intelligence is restricted to authorized account managers bound by enterprise non-disclosure agreements.
            </p>
          </section>

          <section className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" /> Commercial Inquiries & Compliance Desk
            </h2>
            <p className="text-slate-400 text-sm">
              For verification queries, GST certificate updates, or data rectification, contact our trade compliance desk at{" "}
              <a href="mailto:compliance@playlume.in" className="text-blue-400 hover:underline">
                compliance@playlume.in
              </a>{" "}
              or via WhatsApp at{" "}
              <a href="https://wa.me/919876543210" className="text-emerald-400 hover:underline">
                +91 98765 43210
              </a>.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex gap-4 text-xs text-slate-500">
              <Link href="/policies/terms" className="hover:text-blue-400 transition-colors">
                Wholesale Terms of Supply
              </Link>
              <span>•</span>
              <Link href="/policies/shipping" className="hover:text-blue-400 transition-colors">
                Freight & Transit Policy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
