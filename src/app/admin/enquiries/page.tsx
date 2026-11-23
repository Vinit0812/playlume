import type { Metadata } from "next";
import Link from "next/link";
import { ENQUIRY_STATUS_LABELS, ENQUIRY_STATUS_COLORS } from "@/lib/constants";

export const metadata: Metadata = { title: "Enquiries Management" };

export default function AdminEnquiriesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">Manage wholesale buyer enquiries (CRM)</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["all", "new", "contacted", "quotation_sent", "confirmed", "completed"].map((status) => (
          <button
            key={status}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
              status === "all"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
            }`}
          >
            {status === "all" ? "All" : ENQUIRY_STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-700">Buyer</th>
              <th className="text-left p-4 font-medium text-gray-700">Product</th>
              <th className="text-left p-4 font-medium text-gray-700">Qty</th>
              <th className="text-left p-4 font-medium text-gray-700">Status</th>
              <th className="text-left p-4 font-medium text-gray-700">Date</th>
              <th className="text-left p-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📋</div>
                <p>No enquiries yet. They will appear when buyers submit the form.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
