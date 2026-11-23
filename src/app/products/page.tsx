import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete wholesale product catalogue. Toys, Clothing, Watches, Electronics, Home & Kitchen, Stationery and more.",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string; page?: string };
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white border-b py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-500 mt-1">Browse our complete wholesale catalogue</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border p-5 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
            {/* Category Filter */}
            <div className="mb-5">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li><Link href="/products" className="hover:text-indigo-700">All Categories</Link></li>
                <li><Link href="/products?category=toys-games" className="hover:text-indigo-700">Toys & Games</Link></li>
                <li><Link href="/products?category=clothing" className="hover:text-indigo-700">Clothing</Link></li>
                <li><Link href="/products?category=watches" className="hover:text-indigo-700">Watches</Link></li>
                <li><Link href="/products?category=electronics" className="hover:text-indigo-700">Electronics</Link></li>
                <li><Link href="/products?category=home-kitchen" className="hover:text-indigo-700">Home & Kitchen</Link></li>
                <li><Link href="/products?category=stationery" className="hover:text-indigo-700">Stationery</Link></li>
              </ul>
            </div>
            {/* Availability Filter */}
            <div className="mb-5">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li><Link href="/products?availability=available" className="hover:text-indigo-700">Available to Order</Link></li>
                <li><Link href="/products?availability=enquiry_only" className="hover:text-indigo-700">Available on Enquiry</Link></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">Products will appear here once added from the admin panel</p>
            <select className="text-sm border rounded-lg px-3 py-2 text-gray-700">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          {/* Empty State */}
          <div className="bg-white rounded-xl border shadow-sm p-16 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-6">Products will appear here once added from the admin dashboard.</p>
            <Link href="/enquiry" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
              Submit a Bulk Enquiry
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
