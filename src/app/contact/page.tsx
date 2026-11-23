import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-2">We&apos;re here to help with your wholesale requirements</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Get In Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-indigo-600 hover:underline">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-indigo-600 hover:underline">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">{SITE_CONFIG.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello, I am interested in your wholesale products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl transition-colors"
            >
              <span className="text-4xl">💬</span>
              <div>
                <p className="font-bold text-lg">Chat on WhatsApp</p>
                <p className="text-green-100 text-sm">Fastest way to reach us</p>
              </div>
            </a>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Business Hours</h2>
            <div className="space-y-3 text-sm">
              {[
                { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item) => (
                <div key={item.day} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">{item.day}</span>
                  <span className={item.hours === "Closed" ? "text-red-500" : "text-green-600"}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700 font-medium">
                📋 For bulk enquiries, use our{" "}
                <a href="/enquiry" className="underline">enquiry form</a>{" "}
                and we&apos;ll respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
