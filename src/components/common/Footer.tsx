import Link from "next/link";
import { ShieldCheck, Truck, FileText, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-300 py-14 px-4 border-t border-brand-900 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-brand-900">
        
        {/* Column 1: Corporate Profile */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xs tracking-tighter shadow-sm">
              V&amp;A
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">V&amp;A GLOBAL SOURCING</span>
              <span className="text-[9.5px] font-bold text-amber-400 uppercase tracking-widest block -mt-0.5">
                Wholesale &amp; Trade
              </span>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs max-w-xs">
            Multi-category wholesale trading and distribution enterprise connecting verified manufacturers with retailers, commercial stockists, and institutional distributors across India.
          </p>
          <div className="pt-1 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-accent-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GST Registered • Verified B2B Sourcing</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Truck className="w-3.5 h-3.5" />
              <span>Pan-India Commercial Freight Logistics</span>
            </div>
          </div>
        </div>

        {/* Column 2: Merchandise Lines */}
        <div>
          <h3 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Product Lines
          </h3>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/categories" className="hover:text-white transition">All Merchandise Divisions</Link></li>
            <li><Link href="/category/toys-games" className="hover:text-white transition">Toys &amp; Games</Link></li>
            <li><Link href="/category/clothing-apparel" className="hover:text-white transition">Clothing &amp; Apparel</Link></li>
            <li><Link href="/category/artificial-jewellery" className="hover:text-white transition">Artificial Jewellery</Link></li>
            <li><Link href="/category/consumer-electronics" className="hover:text-white transition">Consumer Electronics</Link></li>
            <li><Link href="/category/home-kitchen" className="hover:text-white transition">Home &amp; Kitchen</Link></li>
            <li><Link href="/category/fashion-accessories" className="hover:text-white transition">Fashion Accessories</Link></li>
          </ul>
        </div>

        {/* Column 3: For Trade Buyers */}
        <div>
          <h3 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            For Trade Buyers
          </h3>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/trending" className="hover:text-white transition">Trending Wholesale Deals</Link></li>
            <li><Link href="/enquiry" className="hover:text-white transition">Request a Bulk Quote</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white transition">How Ordering Works</Link></li>
            <li><Link href="/become-a-buyer" className="hover:text-white transition">Register as a Buyer</Link></li>
            <li><Link href="/products" className="hover:text-white transition">Full Product Catalogue</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">B2B Sourcing Guides</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Our Sourcing</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Operations */}
        <div className="space-y-2.5">
          <h3 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Trade Operations
          </h3>
          <div className="text-slate-400 space-y-2">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-accent-400 shrink-0" />
              <span>+91 98765 43210 (Sales &amp; RFQs)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-accent-400 shrink-0" />
              <span>trade@vaglobalsourcing.com</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-accent-400 shrink-0" />
              <span>Mon–Sat 09:00 – 19:00 IST</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
              <span>Logistics Central Corridor, Bhiwandi, Maharashtra</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal Row */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <div>
          © 2026 V&amp;A Global Sourcing B2B Wholesale Trading &amp; Distribution. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/policies/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/policies/terms" className="hover:text-white transition">
            Terms of Wholesale Trade
          </Link>
          <span>•</span>
          <Link href="/policies/shipping" className="hover:text-white transition">
            Freight &amp; Shipping
          </Link>
        </div>
      </div>
    </footer>
  );
}
