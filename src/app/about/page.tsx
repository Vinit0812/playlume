import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-indigo-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About PLAYLUME</h1>
          <p className="text-indigo-200 text-lg">
            Your trusted multi-category wholesale trading and distribution partner
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              PLAYLUME is a B2B wholesale trading and distribution company supplying a wide range
              of products across multiple categories — Toys & Games, Clothing, Watches, Electronics,
              Home & Kitchen, and Stationery.
            </p>
            <p className="text-gray-600 mb-4">
              We connect manufacturers, retailers, wholesalers and distributors, making bulk
              procurement easy, reliable and cost-effective.
            </p>
            <p className="text-gray-600">
              Our sourcing-first model means we can find the right products at the right price —
              without you having to manage multiple suppliers.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🏭</div>
            <h3 className="text-xl font-bold text-indigo-900">One Company, All Categories</h3>
            <p className="text-indigo-700 text-sm mt-2">
              Toys · Clothing · Watches · Electronics · Home & Kitchen · Stationery
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🤝", title: "Trusted Partner", desc: "Building long-term relationships with retailers and distributors across India." },
            { icon: "🔍", title: "Smart Sourcing", desc: "We source the right products at the best price from verified manufacturers." },
            { icon: "📦", title: "Bulk Ready", desc: "Minimum order quantities designed for wholesale buyers, not individual shoppers." },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
