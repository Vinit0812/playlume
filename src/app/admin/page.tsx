import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to PLAYLUME Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: "Total Products", value: "0", icon: "📦", href: "/admin/products", color: "bg-indigo-50 text-indigo-700" },
          { label: "New Enquiries", value: "0", icon: "📋", href: "/admin/enquiries", color: "bg-yellow-50 text-yellow-700" },
          { label: "Total Buyers", value: "0", icon: "👥", href: "/admin/buyers", color: "bg-green-50 text-green-700" },
          { label: "Quotations", value: "0", icon: "📄", href: "/admin/quotations", color: "bg-purple-50 text-purple-700" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.color} mb-3`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/products/new" className="flex items-center gap-3 p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
              <span className="text-indigo-600">➕</span>
              <span className="text-sm font-medium text-indigo-700">Add New Product</span>
            </Link>
            <Link href="/admin/categories/new" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <span className="text-green-600">📂</span>
              <span className="text-sm font-medium text-green-700">Create Category</span>
            </Link>
            <Link href="/admin/enquiries" className="flex items-center gap-3 p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
              <span className="text-yellow-600">📋</span>
              <span className="text-sm font-medium text-yellow-700">View New Enquiries</span>
            </Link>
            <Link href="/admin/quotations/new" className="flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <span className="text-purple-600">📄</span>
              <span className="text-sm font-medium text-purple-700">Create Quotation</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Enquiries</h2>
          <div className="text-center py-8 text-gray-400 text-sm">
            No enquiries yet. They will appear here when buyers submit the form.
          </div>
        </div>
      </div>
    </div>
  );
}
