"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations";
import { INDIAN_STATES } from "@/lib/constants";

export default function EnquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  async function onSubmit(data: EnquiryFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Enquiry submission failed:", error);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-12 text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Submitted!</h2>
          <p className="text-gray-500 mb-6">
            Thank you! We will contact you within 24 hours with pricing and availability.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi, I just submitted a bulk enquiry on your website.`}
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors inline-block"
          >
            Also WhatsApp Us
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bulk Enquiry</h1>
          <p className="text-gray-500 mt-2">
            Fill in your requirements and we will get back to you with the best wholesale price.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  {...register("buyerName")}
                  placeholder="Full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {errors.buyerName && (
                  <p className="text-red-500 text-xs mt-1">{errors.buyerName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  {...register("businessName")}
                  placeholder="Company / Shop name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  {...register("phone")}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  {...register("whatsappNumber")}
                  placeholder="Same as phone / different"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address (optional)
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Row 3: State & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  {...register("state")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  {...register("city")}
                  placeholder="Your city"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Product & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Interested In
                </label>
                <input
                  {...register("productName")}
                  placeholder="Product name or category"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Quantity
                </label>
                <input
                  {...register("quantity", { valueAsNumber: true })}
                  type="number"
                  placeholder="Number of pieces"
                  min={1}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Additional requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Requirements
              </label>
              <textarea
                {...register("additionalRequirements")}
                rows={4}
                placeholder="Any specific requirements, delivery timeline, budget, etc."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Bulk Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
