import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { BLOG_POSTS } from "@/lib/blog-data";
import { CATEGORIES_FEATURED, SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "B2B Wholesale Sourcing Guides & Retail Strategies",
  description:
    "Comprehensive B2B wholesale buying guides, profit margin calculations, supplier evaluation blueprints, and retail trade strategies for Indian shop owners, resellers, and distributors.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_CONFIG.url}/blog`,
    title: "B2B Wholesale Sourcing Guides & Retail Strategies | V&A Global Sourcing",
    description:
      "Expert trade guides for Indian retailers, wholesalers, and distributors across Gujarat and Pan-India.",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "V&A Wholesale Sourcing Knowledge Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Wholesale Sourcing Guides & Retail Strategies | V&A Global Sourcing",
    description:
      "Actionable wholesale guides and supplier selection strategies for Indian retail businesses.",
    images: ["/og-image.png"],
  },
};

export default function BlogIndexPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Wholesale Sourcing Guides", url: "/blog" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 antialiased">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Header />

      <main className="flex-1 pb-16 px-4 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 py-5 font-medium">
          <Link href="/" className="hover:text-amber-600 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-600 font-bold">B2B Sourcing Guides</span>
        </nav>

        {/* ─── Hero Header ─── */}
        <div className="bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Wholesale Intelligence Hub</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-4">
              B2B Wholesale Sourcing Guides &amp; Retail Playbooks
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              Practical, field-tested trade guides authored for Indian shop owners, commercial retailers, distributors, and online sellers. Master manufacturer sourcing, wholesale profit margin models, and high-velocity inventory turns across Gujarat and Pan-India.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ─── Featured Articles Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {BLOG_POSTS.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-400 hover:-translate-y-1 transition duration-200 flex flex-col group"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                  <span className="font-bold text-amber-600 uppercase tracking-wider text-[11px] bg-amber-50 px-2.5 py-1 rounded-md">
                    {post.categorySlug.replace("-", " ")}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-amber-600 transition leading-snug mb-3">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs text-neutral-600 leading-relaxed mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs mt-auto">
                  <span className="text-neutral-500 font-medium">
                    {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-amber-600 group-hover:text-amber-700 transition"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ─── Sourcing Divisions CTA Strip ─── */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-black text-neutral-900 mb-1">
              Ready to Source Commercial Lots for Your Retail Counter?
            </h3>
            <p className="text-xs text-neutral-600 max-w-xl">
              Access verified wholesale lots with low MOQs, volume tiering, GST billing, and fast dispatch from our Gujarat trade corridors.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/products"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition shadow-xs"
            >
              Browse Catalogue
            </Link>
            <Link
              href="/become-a-buyer"
              className="px-5 py-2.5 rounded-xl bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 font-bold text-xs transition"
            >
              Register as Buyer
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
