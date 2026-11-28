import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "All Wholesale Products & Sourcing Catalogue",
  description:
    "Explore 200+ verified B2B wholesale merchandise lots across Toys & Games, Clothing & Apparel, Artificial Jewellery, Consumer Electronics, Home & Kitchen, and Fashion Accessories. Direct factory pricing and pan-India dispatch.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_CONFIG.url}/products`,
    title: "All Wholesale Products & Sourcing Catalogue | V&A Global Sourcing",
    description:
      "Explore 200+ verified B2B wholesale merchandise lots with verified MOQs, factory pricing, and nationwide commercial logistics.",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "V&A Global Sourcing Full Catalogue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Wholesale Products & Sourcing Catalogue | V&A Global Sourcing",
    description:
      "Explore 200+ verified B2B wholesale merchandise lots across 6 core commercial divisions.",
    images: ["/og-image.png"],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Wholesale Catalogue", url: "/products" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {children}
    </>
  );
}
