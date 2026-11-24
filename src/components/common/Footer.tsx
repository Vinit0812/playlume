import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Layers, ShieldCheck, Truck, FileText, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-14 px-4 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        
        {/* Corporate Identity */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">PLAYLUME</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
            PLAYLUME is a multi-category B2B wholesale trading enterprise supplying certified toys, apparel, timepieces, consumer technology, housewares, and commercial stationery.
          </p>
          <div className="space-y-1 text-[11px] text-slate-500 font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>GSTIN: Registered Trade Entity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Commercial Trade Registration Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Commercial E-Way Bill Logistics</span>
            </div>
          </div>
        </div>

        {/* Merchandise Divisions */}
        <div>
          <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3.5">Merchandise</h5>
          <ul className="space-y-2.5 text-slate-400">
            <li><Link href="/category/toys-games" className="hover:text-white transition">Toys & Educational</Link></li>
            <li><Link href="/category/clothing" className="hover:text-white transition">Apparel & Textiles</Link></li>
            <li><Link href="/category/watches" className="hover:text-white transition">Watches & Horology</Link></li>
            <li><Link href="/category/electronics" className="hover:text-white transition">Consumer Technology</Link></li>
            <li><Link href="/category/home-kitchen" className="hover:text-white transition">Home & Kitchenware</Link></li>
            <li><Link href="/category/stationery" className="hover:text-white transition">Office & Stationery</Link></li>
          </ul>
        </div>

        {/* Trade Services */}
        <div>
          <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3.5">Services</h5>
          <ul className="space-y-2.5 text-slate-400">
            <li><Link href="/enquiry" className="hover:text-white transition">Request Commercial RFQ</Link></li>
            <li><Link href="/become-a-buyer" className="hover:text-white transition">Buyer Registration</Link></li>
            <li><Link href="/products" className="hover:text-white transition">Wholesale Catalogue</Link></li>
            <li><Link href="/trending" className="hover:text-white transition">High-Demand Lots</Link></li>
            <li><Link href="/admin" className="hover:text-white transition">Authorized Staff Login</Link></li>
          </ul>
        </div>

        {/* Commercial Desk */}
        <div>
          <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3.5">Commercial Desk</h5>
          <ul className="space-y-2.5 text-slate-400">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{SITE_CONFIG.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{SITE_CONFIG.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Pan-India Distribution</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
        <div>© {new Date().getFullYear()} PLAYLUME Commercial Wholesale Trading Co. All rights reserved.</div>
        <div className="flex gap-6">
          <Link href="/policies/privacy" className="hover:text-slate-300 transition">Privacy Statement</Link>
          <Link href="/policies/terms" className="hover:text-slate-300 transition">Wholesale Terms of Supply</Link>
          <Link href="/policies/shipping" className="hover:text-slate-300 transition">Freight & Logistics Policy</Link>
        </div>
      </div>
    </footer>
  );
}
