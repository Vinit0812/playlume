import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Products Management" };

export default function AdminProductsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your wholesale product catalogue</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border shadow-sm p-4 mb-5 flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 min-w-48 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
          <option>All Categories</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-700">Product</th>
              <th className="text-left p-4 font-medium text-gray-700">Category</th>
              <th className="text-left p-4 font-medium text-gray-700">MOQ</th>
              <th className="text-left p-4 font-medium text-gray-700">Availability</th>
              <th className="text-left p-4 font-medium text-gray-700">Status</th>
              <th className="text-left p-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📦</div>
                <p>No products yet. Add your first product!</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
