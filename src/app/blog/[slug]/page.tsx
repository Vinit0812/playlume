import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog-data";
import { CATEGORIES_FEATURED, SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  Building2,
  ShieldCheck,
  Package,
  TrendingUp,
  Share2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Wholesale Sourcing Guide Not Found | V&A Global Sourcing",
      description: "The requested trade guide could not be found in our knowledge hub.",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seoTitle || post.title;
  const canonicalUrl = `/blog/${post.slug}`;
  const imageUrl = `${SITE_CONFIG.url}/banners/toys-games-banner.png`;

  return {
    title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: `${SITE_CONFIG.url}${canonicalUrl}`,
      title,
      description: post.seoDescription || post.excerpt,
      siteName: SITE_CONFIG.name,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.seoDescription || post.excerpt,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Sourcing Guides", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const featuredImg = `${SITE_CONFIG.url}/banners/toys-games-banner.png`;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 antialiased">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ArticleJsonLd
        title={post.title}
        description={post.seoDescription || post.excerpt}
        slug={post.slug}
        featuredImage={featuredImg}
        publishedAt={post.publishedAt}
        author={post.author}
      />
      <Header />

      <main className="flex-1 pb-16 px-4 max-w-5xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 py-5 font-medium">
          <Link href="/" className="hover:text-amber-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-amber-600 transition">
            Sourcing Guides
          </Link>
          <span>/</span>
          <span className="text-amber-600 font-bold truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* ─── Article Header ─── */}
        <header className="mb-10 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mb-4">
            <span className="font-bold text-amber-700 uppercase tracking-wider text-[11px] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
              {post.categorySlug.replace("-", " ")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedAt}</span>
            </span>
            <span>•</span>
            <span className="text-neutral-700 font-medium">
              By {post.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium pb-6 border-b border-neutral-100">
            {post.excerpt}
          </p>

          <div className="pt-4 flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Wholesale Industry Sourcing Insights</span>
            </div>
            <Link
              href="/become-a-buyer"
              className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-1 transition"
            >
              <span>Get Wholesale Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* ─── Article Body ─── */}
        <article className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xs mb-12">
          <div
            className="prose prose-neutral prose-sm sm:prose-base max-w-none text-neutral-700 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Wholesale Trade Callout Box */}
          <div className="mt-10 p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Wholesale Buyer Advisory</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-2">
              Source Verified Commercial Lots via V&amp;A Global Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
              We connect retail business owners, online marketplace merchants, and regional distributors with certified manufacturer lots. Enjoy transparent volume tiers, GST input credits, and rapid courier/freight dispatch across Gujarat and all Indian states.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition shadow-xs"
              >
                Explore Active Catalog Lots
              </Link>
              <Link
                href="/enquiry"
                className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 font-bold text-xs transition"
              >
                Submit Custom RFQ
              </Link>
            </div>
          </div>
        </article>

        {/* ─── Related Articles ─── */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-black text-neutral-900 tracking-tight mb-5">
              More Wholesale Sourcing &amp; Retail Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="bg-white rounded-2xl p-5 border border-neutral-200 hover:border-amber-400 hover:shadow-sm transition flex flex-col group"
                >
                  <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-2">
                    {related.categorySlug.replace("-", " ")}
                  </div>
                  <h3 className="font-bold text-neutral-900 text-sm group-hover:text-amber-600 transition mb-2 leading-snug">
                    {related.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 mt-auto">
                    {related.excerpt}
                  </p>
                  <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>{related.readTime}</span>
                    <span className="font-bold text-amber-600 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── Browse Wholesale Divisions ─── */}
        <section className="pt-8 border-t border-neutral-200">
          <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-4">
            Commercial Wholesale Product Divisions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES_FEATURED.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="bg-white rounded-xl p-3 border border-neutral-200 hover:border-amber-500 hover:-translate-y-0.5 transition shadow-xs text-center group"
              >
                <div className="font-bold text-neutral-900 text-xs group-hover:text-amber-600 transition">
                  {c.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">MOQ {c.moq}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
