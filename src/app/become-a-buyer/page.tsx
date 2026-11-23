import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Become a Wholesale Buyer" };

export default function BecomeABuyerPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Become a Wholesale Buyer</h1>
          <p className="text-gray-500 mt-3 text-lg">
            Join our network of retailers, wholesalers and distributors across India.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: "💰", title: "Wholesale Pricing", desc: "Best-in-market bulk rates" },
            { icon: "🤝", title: "Dedicated Support", desc: "Personal account manager" },
            { icon: "📦", title: "Multi-Category", desc: "One supplier, all products" },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-xl border shadow-sm p-5 text-center">
              <div className="text-3xl mb-2">{b.icon}</div>
              <h3 className="font-semibold text-gray-900">{b.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl border shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Register Your Business</h2>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input type="text" placeholder="Full name" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input type="text" placeholder="Company / Shop name" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Select type</option>
                  <option>Retailer</option>
                  <option>Wholesaler</option>
                  <option>Distributor</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
              <input type="email" placeholder="your@email.com" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full transition-colors">
              Register as Wholesale Buyer
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
