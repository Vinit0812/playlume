import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductCard, { ProductProps } from "@/components/common/ProductCard";
import CategoryStudioBanner from "@/components/category/CategoryStudioBanner";
import { CATEGORIES_FEATURED, SITE_CONFIG } from "@/lib/constants";
import { CATEGORY_META, MASTER_PRODUCTS } from "@/lib/products-data";
import { CATEGORY_GUIDES } from "@/lib/category-guides";
import { BreadcrumbJsonLd, CollectionPageJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import {
  ArrowRight,
  Package,
  TrendingUp,
  Percent,
  Truck,
  ShieldCheck,
  Building2,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Check,
} from "lucide-react";

// Map category slug → banner image path
const CATEGORY_BANNER_MAP: Record<string, string> = {
  "toys-games": "/category-banners/banner-toys.png",
  "clothing-apparel": "/category-banners/banner-clothing.png",
  "artificial-jewellery": "/category-banners/banner-jewellery.png",
  "consumer-electronics": "/category-banners/banner-electronics.png",
  "home-kitchen": "/category-banners/banner-home.png",
  "fashion-accessories": "/category-banners/banner-fashion.png",
};

// Trust badges per category (using Lucide icons, no emojis)
const CATEGORY_TRUST: Record<
  string,
  { type: "shield" | "building" | "truck" | "package" | "sparkles" | "check"; text: string }[]
> = {
  "toys-games": [
    { type: "shield", text: "BIS / CE Certified" },
    { type: "building", text: "Direct Factory Rates" },
    { type: "truck", text: "Pan-India Dispatch" },
  ],
  "clothing-apparel": [
    { type: "check", text: "Bio-Wash Quality" },
    { type: "package", text: "Bulk Carton Packing" },
    { type: "truck", text: "Pan-India Dispatch" },
  ],
  "artificial-jewellery": [
    { type: "sparkles", text: "Anti-Tarnish Coated" },
    { type: "building", text: "Direct Factory Lots" },
    { type: "package", text: "Gift-Ready Packaging" },
  ],
  "consumer-electronics": [
    { type: "shield", text: "BIS Tested" },
    { type: "package", text: "Master Carton Pack" },
    { type: "truck", text: "Same-Day Dispatch" },
  ],
  "home-kitchen": [
    { type: "check", text: "Food-Grade Material" },
    { type: "building", text: "Factory Direct Lots" },
    { type: "truck", text: "Pan-India Dispatch" },
  ],
  "fashion-accessories": [
    { type: "sparkles", text: "Vegan Leather" },
    { type: "check", text: "Premium Finish" },
    { type: "truck", text: "Pan-India Dispatch" },
  ],
};

function renderTrustIcon(type: string) {
  switch (type) {
    case "shield":
      return <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />;
    case "building":
      return <Building2 className="w-3.5 h-3.5 text-blue-600" />;
    case "truck":
      return <Truck className="w-3.5 h-3.5 text-emerald-600" />;
    case "package":
      return <Package className="w-3.5 h-3.5 text-purple-600" />;
    case "sparkles":
      return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
    default:
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category =
    CATEGORY_META.find((c) => c.slug === slug || c.id === slug) ||
    CATEGORIES_FEATURED.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Wholesale Category Not Found",
      description: "Category not found in our commercial wholesale catalogue.",
      robots: { index: false, follow: false },
    };
  }

  const title = `Wholesale ${category.name} Supplier India | Bulk Sourcing`;
  const startingRate = "from" in category ? category.from : category.startingPrice;
  const description = `Direct factory wholesale supplier for ${category.name}. Verified MOQs from ${category.moq || '20 pcs'}, starting wholesale prices from ${startingRate || '₹49'}, GST invoices, and pan-India distribution from Gujarat.`;
  const canonicalUrl = `/category/${category.slug}`;
  const bannerImage = CATEGORY_BANNER_MAP[category.slug] || "/category-banners/banner-toys.png";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${SITE_CONFIG.url}${canonicalUrl}`,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: bannerImage,
          width: 1200,
          height: 400,
          alt: `${category.name} Wholesale Division`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [bannerImage],
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

export default async function CategoryLandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}) {
  const { slug } = await params;
  const { sub } = await searchParams;

  const categoryMeta = CATEGORY_META.find((c) => c.slug === slug || c.id === slug);
  const featured = CATEGORIES_FEATURED.find((c) => c.slug === slug);

  if (!categoryMeta && !featured) notFound();

  const categoryName = categoryMeta?.name || featured?.name || "Category";
  const categorySlug = categoryMeta?.slug || featured?.slug || slug;
  const subCategories = categoryMeta?.subCategories || [];

  const allCategoryProducts = MASTER_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug || p.categorySlug === slug
  );

  const displayedProducts = sub
    ? allCategoryProducts.filter((p) => p.subCategorySlug === sub)
    : allCategoryProducts;

  const activeSubCategoryName = sub
    ? subCategories.find((s) => s.slug === sub)?.name || sub
    : null;

  const trustBadges = CATEGORY_TRUST[categorySlug] || [];
  const guide = CATEGORY_GUIDES[categorySlug];

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Wholesale Catalogue", url: "/products" },
    { name: categoryName, url: `/category/${categorySlug}` },
    ...(activeSubCategoryName
      ? [{ name: activeSubCategoryName, url: `/category/${categorySlug}?sub=${sub}` }]
      : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 antialiased">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={
          activeSubCategoryName
            ? `${activeSubCategoryName} — ${categoryName} Wholesale`
            : `Wholesale ${categoryName}`
        }
        description={
          categoryMeta?.description ||
          `Direct factory wholesale ${categoryName} lots with verified MOQs and pan-India dispatch.`
        }
        url={sub ? `/category/${categorySlug}?sub=${sub}` : `/category/${categorySlug}`}
        totalCount={displayedProducts.length}
        items={displayedProducts.map((p) => ({
          name: p.name,
          url: `/product/${p.slug}`,
        }))}
      />
      {guide && <FaqJsonLd items={guide.faqs} />}
      <Header />

      <main className="flex-1 pb-12 px-4 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 py-5 font-medium">
          <Link href="/" className="hover:text-amber-600 transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-600 transition">Catalogue</Link>
          <span>/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-amber-600 transition font-semibold">
            {categoryName}
          </Link>
          {activeSubCategoryName && (
            <>
              <span>/</span>
              <span className="text-amber-600 font-bold">{activeSubCategoryName}</span>
            </>
          )}
        </nav>

        {/* ─── Category Hero Studio Banner (Crisp Vector HTML/CSS) ─── */}
        <CategoryStudioBanner
          categorySlug={categorySlug}
          categoryName={categoryName}
          description={categoryMeta?.description}
          startingRate={categoryMeta?.from}
          standardMoq={categoryMeta?.moq}
          availableLots={allCategoryProducts.length}
        />

        {/* ─── Trust Badges Strip ─── */}
        {trustBadges.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {trustBadges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-neutral-200 text-neutral-700 shadow-xs"
              >
                {renderTrustIcon(b.type)}
                <span>{b.text}</span>
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-neutral-200 text-neutral-700 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{allCategoryProducts.length} Products Available</span>
            </span>
          </div>
        )}

        {/* ─── Sub-Category Navigation Pills ─── */}
        {subCategories.length > 0 && (
          <div className="mb-8 bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs">
            <div className="text-[11px] font-black text-neutral-500 uppercase tracking-widest mb-3">
              Browse Sub-Categories
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/category/${categorySlug}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  !sub
                    ? "bg-amber-500 text-stone-950 shadow-sm"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                }`}
              >
                All {categoryName} ({allCategoryProducts.length})
              </Link>
              {subCategories.map((sc) => {
                const count = allCategoryProducts.filter((p) => p.subCategorySlug === sc.slug).length;
                const isActive = sub === sc.slug;
                return (
                  <Link
                    key={sc.slug}
                    href={`/category/${categorySlug}?sub=${sc.slug}`}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? "bg-amber-500 text-stone-950 shadow-sm"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {sc.name} ({count})
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Products Grid ─── */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                {activeSubCategoryName ? `${activeSubCategoryName} Lots` : `All ${categoryName} Lots`}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Showing {displayedProducts.length} wholesale ready products
              </p>
            </div>
            <Link
              href="/become-a-buyer"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition"
            >
              <span>Get Wholesale Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedProducts.map((p) => {
                const productProps: ProductProps = {
                  id: p.id,
                  slug: p.slug,
                  sku: p.sku,
                  name: p.name,
                  category: p.category,
                  categorySlug: p.categorySlug,
                  categoryTone: p.categoryTone,
                  image: p.image,
                  moq: p.moq,
                  price: p.price,
                  mrp: p.mrp,
                  status: p.status,
                  description: p.description,
                  specs: p.specs,
                };
                return <ProductCard key={p.id} product={productProps} />;
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-neutral-200 text-center">
              <Package className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-800">No products found in this subcategory</h3>
              <p className="text-xs text-neutral-500 mt-1 mb-4">
                Check back shortly or request custom wholesale manufacturing quotes.
              </p>
              <Link
                href={`/category/${categorySlug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg"
              >
                View all {categoryName}
              </Link>
            </div>
          )}
        </div>

        {/* ─── B2B Buying Guide & Commercial Insights (SEO Content Section) ─── */}
        {guide && (
          <section className="mb-14 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>B2B Commercial Sourcing Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mb-2">
              {guide.title}
            </h2>
            <p className="text-sm font-medium text-neutral-500 mb-6">
              {guide.subtitle}
            </p>

            <div className="prose prose-sm max-w-none text-neutral-700 leading-relaxed mb-8">
              <p>{guide.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Sourcing Considerations */}
              <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Wholesale Sourcing Considerations</span>
                </h3>
                <ul className="space-y-2 text-xs text-neutral-600">
                  {guide.sourcingConsiderations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Profit Margins & Turnover */}
              <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-100">
                <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Retailer Margin & Turnover Velocity</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                    <span className="text-neutral-600">Average Retail Gross Margin:</span>
                    <span className="font-black text-emerald-700">{guide.retailerMargins.averageMargin}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                    <span className="text-neutral-600">Restock Turnover Velocity:</span>
                    <span className="font-bold text-neutral-900">{guide.retailerMargins.turnoverVelocity}</span>
                  </div>
                  <p className="text-amber-900 font-medium pt-1 italic">
                    Tip: {guide.retailerMargins.tip}
                  </p>
                </div>
              </div>
            </div>

            {/* Packaging & Quality Standards */}
            <div className="border-t border-neutral-100 pt-6 mb-8">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Export-Grade Master Packaging & Quality Control</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {guide.qualityAndPackaging.map((spec, idx) => (
                  <div key={idx} className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-xs text-neutral-600">
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            {/* Trade FAQs */}
            <div className="border-t border-neutral-100 pt-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Trade Buyer Frequently Asked Questions</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Wholesale FAQs for {categoryName}
              </h3>
              <div className="space-y-3">
                {guide.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-50 rounded-xl p-4 border border-neutral-100"
                  >
                    <h4 className="text-xs font-bold text-neutral-900 mb-1.5">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Other Wholesale Divisions ─── */}
        <div className="pt-8 border-t border-neutral-200">
          <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-4">
            Other Wholesale Divisions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORY_META.filter((c) => c.slug !== categorySlug).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="bg-white rounded-xl p-3.5 border border-neutral-200 hover:border-amber-500 hover:-translate-y-0.5 transition shadow-xs text-center group"
              >
                <div className="font-bold text-neutral-900 text-xs group-hover:text-amber-600 transition">
                  {c.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">MOQ {c.moq} • From {c.from}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
