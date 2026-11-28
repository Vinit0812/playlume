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
  type MasterProduct,
} from "@/lib/products-data";
import { SITE_CONFIG } from "@/lib/constants";

function getVariantContext(product: MasterProduct) {
  const matchedVariant = product.variantItems?.find(
    (item) =>
      item.sku === product.sku ||
      `${product.id}`.endsWith(item.id) ||
      product.name.endsWith(`– ${item.label}`)
  );

  const variantAttributes = matchedVariant?.attributes || {};
  const attrPairs = Object.entries(variantAttributes).map(
    ([key, val]) => `${key}: ${val}`
  );
  const variantAttrSummary = attrPairs.join(", ");
  const colorValue =
    variantAttributes.Color ||
    variantAttributes.Colour ||
    variantAttributes.Shade ||
    undefined;

  const uniqueMetaDescription = variantAttrSummary
    ? `Order ${product.name} (SKU ${product.sku} · ${variantAttrSummary}) in ${product.subCategory}. Wholesale ₹${product.price}/pc (MRP ₹${product.mrp}/pc), MOQ ${product.moq} pcs, ${product.packaging.unitsPerCarton} pcs/carton.`
    : `Bulk sourcing for ${product.name} (SKU ${product.sku}) in ${product.subCategory}. MOQ ${product.moq} pcs, wholesale ₹${product.price}/pc (MRP ₹${product.mrp}/pc), GST billing & pan-India dispatch.`;

  const uniqueSchemaDescription = variantAttrSummary
    ? `${product.description} Variant specification: ${variantAttrSummary} (SKU ${product.sku}, ${product.packaging.unitsPerCarton} pcs/master carton, ${product.packaging.grossWeight}).`
    : `${product.description} SKU ${product.sku}, ${product.packaging.unitsPerCarton} pcs/master carton (${product.packaging.grossWeight}).`;

  const additionalProperty = [
    ...Object.entries(variantAttributes).map(([name, value]) => ({
      name,
      value,
    })),
    ...Object.entries(product.specs).map(([name, value]) => ({
      name,
      value,
    })),
    {
      name: "Master Carton Pack",
      value: `${product.packaging.unitsPerCarton} pcs (${product.packaging.grossWeight})`,
    },
  ];

  return {
    colorValue,
    uniqueMetaDescription,
    uniqueSchemaDescription,
    additionalProperty,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductByIdOrSlug(slug);

  if (!product) {
    return {
      title: "Wholesale Product Not Found",
      description: "The requested wholesale product could not be located in our commercial inventory.",
      robots: { index: false, follow: false },
    };
  }

  const { uniqueMetaDescription } = getVariantContext(product);
  const title = `${product.name} Wholesale (${product.sku})`;
  const description = uniqueMetaDescription;
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
  const { colorValue, uniqueSchemaDescription, additionalProperty } =
    getVariantContext(product);

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
        description={uniqueSchemaDescription}
        images={[product.image || "/brand-logo.png"]}
        sku={product.sku}
        mpn={product.sku}
        color={colorValue}
        additionalProperty={additionalProperty}
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
