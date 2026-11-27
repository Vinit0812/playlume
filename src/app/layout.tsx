import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { QuoteBasketProvider } from "@/context/QuoteBasketContext";
import QuoteBasketDrawer from "@/components/common/QuoteBasketDrawer";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | B2B Wholesale Trading & Distribution India`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "wholesale products supplier in India",
    "bulk products supplier",
    "wholesale distributors in India",
    "toys wholesale supplier Gujarat",
    "wholesale home and kitchen products",
    "bulk stationery supplier",
    "wholesale fashion accessories",
    "direct manufacturer sourcing",
    "B2B wholesale trading company Ahmedabad",
    "V&A Global Sourcing",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | B2B Wholesale Trading & Distribution India`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/banners/toys-games-banner.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} B2B Wholesale Trading`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | B2B Wholesale Trading & Distribution India`,
    description: SITE_CONFIG.description,
    images: ["/banners/toys-games-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <QuoteBasketProvider>
          {children}
          <QuoteBasketDrawer />
        </QuoteBasketProvider>
      </body>
    </html>
  );
}
