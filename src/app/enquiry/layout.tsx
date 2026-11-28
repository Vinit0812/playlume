import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Submit Wholesale RFQ & Bulk Enquiry",
  description:
    "Request formal wholesale pricing slabs, GST proforma invoices, MOQ breakdowns, and pan-India dispatch quotes from V&A Global Sourcing.",
  alternates: {
    canonical: "/enquiry",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_CONFIG.url}/enquiry`,
    title: "Submit Wholesale RFQ & Bulk Enquiry | V&A Global Sourcing",
    description:
      "Request formal wholesale pricing slabs, GST proforma invoices, and bulk dispatch quotes across 6 merchandise divisions.",
    siteName: SITE_CONFIG.name,
  },
};

export default function EnquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
