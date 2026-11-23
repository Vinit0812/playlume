import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, CATEGORIES_FEATURED } from "@/lib/constants";

export const metadata: Metadata = {
  title: "B2B Wholesale Trading & Distribution",
  description: SITE_CONFIG.description,
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ========== HEADER ========== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-700 tracking-tight">PLAYLUME</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <Link href="/products" className="hover:text-indigo-700 transition-colors">Products</Link>
              <Link href="/categories" className="hover:text-indigo-700 transition-colors">Categories</Link>
              <Link href="/trending" className="hover:text-indigo-700 transition-colors">Trending</Link>
              <Link href="/about" className="hover:text-indigo-700 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-indigo-700 transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello, I am interested in wholesale products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                <span>WhatsApp</span>
              </a>
              <Link
                href="/enquiry"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                Bulk Enquiry
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ========== HERO ========== */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-indigo-500/30 text-indigo-200 text-sm font-medium px-4 py-1 rounded-full mb-4">
            Wholesale · Sourcing · Distribution
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Your Trusted B2B
            <br />
            <span className="text-yellow-400">Wholesale Partner</span>
          </h1>
          <p className="text-indigo-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Connecting manufacturers, retailers, wholesalers and distributors across India.
            Toys, Clothing, Watches, Electronics, Home & Kitchen, Stationery and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold px-8 py-3 rounded-full text-lg transition-colors"
            >
              Explore Products
            </Link>
            <Link
              href="/enquiry"
              className="border-2 border-white hover:bg-white hover:text-indigo-900 text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TRUST INDICATORS ========== */}
      <section className="bg-white border-b py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "💰", title: "Bulk Pricing", desc: "Competitive wholesale rates" },
            { icon: "🏭", title: "Reliable Sourcing", desc: "Verified manufacturer network" },
            { icon: "🤝", title: "Business Support", desc: "Dedicated buyer assistance" },
            { icon: "📦", title: "Multi-Category", desc: "6+ product categories" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SHOP BY CATEGORY ========== */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Browse our wholesale product categories</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES_FEATURED.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-gray-100 group"
              >
                <span className="text-4xl">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">How Wholesale Ordering Works</h2>
            <p className="text-gray-500 mt-2">Simple 5-step process from enquiry to delivery</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Browse Products", desc: "Explore our catalogue" },
              { step: "02", title: "Submit Enquiry", desc: "Share your requirements" },
              { step: "03", title: "Get Quotation", desc: "Receive best pricing" },
              { step: "04", title: "Confirm Order", desc: "Agree on terms" },
              { step: "05", title: "Delivery", desc: "Products dispatched" },
            ].map((item, i) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                {i < 4 && <div className="hidden sm:block absolute text-indigo-300 mt-6 ml-24">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BECOME A BUYER CTA ========== */}
      <section className="py-16 px-4 bg-indigo-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Become a Wholesale Buyer</h2>
          <p className="text-indigo-200 mb-8">
            Join our network of retailers, wholesalers and distributors. Register today and get
            access to exclusive wholesale pricing.
          </p>
          <Link
            href="/become-a-buyer"
            className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold px-8 py-3 rounded-full text-lg transition-colors inline-block"
          >
            Register as Buyer
          </Link>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold text-white">PLAYLUME</span>
            <p className="text-sm mt-3 text-gray-400">
              Multi-category B2B wholesale trading and distribution company.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/enquiry" className="hover:text-white">Bulk Enquiry</Link></li>
              <li><Link href="/become-a-buyer" className="hover:text-white">Become a Buyer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 {SITE_CONFIG.phone}</li>
              <li>✉️ {SITE_CONFIG.email}</li>
              <li>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300"
                >
                  💬 WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PLAYLUME. All rights reserved. | B2B Wholesale Trading & Distribution
        </div>
      </footer>

      {/* ========== STICKY WHATSAPP BUTTON ========== */}
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello, I am interested in wholesale products from PLAYLUME.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Contact on WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}
