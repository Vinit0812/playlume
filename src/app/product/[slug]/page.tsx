import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductDetailView from "@/components/product/ProductDetailView";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import {
  findProductByIdOrSlug,
  getRelatedProducts,
} from "@/lib/products-data";
import { SITE_CONFIG } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductByIdOrSlug(slug);

  if (!product) {
    return {
      title: "Wholesale Product Not Found | V&A Global Sourcing",
      description: "The requested wholesale product could not be located in our commercial inventory.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.name} Wholesale Supplier India`;
  const description = `Bulk sourcing for ${product.name}. Minimum Order Quantity: ${product.moq} pcs. Wholesale rate: ₹${product.price}/pc (Retail MRP: ₹${product.mrp}). Direct factory lots, GST invoicing, and pan-India dispatch from Gujarat.`;
  const canonicalUrl = `/product/${product.slug}`;
  const imageUrl = product.image || "/brand-logo.png";

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
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.name} Wholesale Lot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProductByIdOrSlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 5);

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Wholesale Catalogue", url: "/products" },
    { name: product.category, url: `/category/${product.categorySlug}` },
    { name: product.name, url: `/product/${product.slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 antialiased">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductJsonLd
        name={product.name}
        description={product.description}
        images={[product.image || "/brand-logo.png"]}
        sku={product.sku}
        slug={product.slug}
        category={product.category}
        price={product.price}
        retailPrice={product.mrp}
        moq={product.moq}
        inStock={product.status === "in_stock" || product.status === "limited"}
      />
      <Header />

      <main className="flex-1 py-8 sm:py-12 px-4 max-w-7xl mx-auto w-full">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
