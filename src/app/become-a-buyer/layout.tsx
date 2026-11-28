import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Become a Verified B2B Wholesale Buyer",
  description:
    "Register your retail store, distribution business, or corporate procurement team with V&A Global Sourcing for factory-direct wholesale rates and priority dispatch.",
  alternates: {
    canonical: "/become-a-buyer",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_CONFIG.url}/become-a-buyer`,
    title: "Become a Verified B2B Wholesale Buyer | V&A Global Sourcing",
    description:
      "Register your commercial trade account to unlock tiered MOQ pricing, GST billing, and dedicated account management.",
    siteName: SITE_CONFIG.name,
  },
};

export default function BecomeABuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
