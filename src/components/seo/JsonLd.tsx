import React from "react";
import { SITE_CONFIG } from "@/lib/constants";

interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

export function OrganizationJsonLd({
  name = SITE_CONFIG.name,
  url = SITE_CONFIG.url,
  logo = `${SITE_CONFIG.url}/brand-logo.png`,
  description = SITE_CONFIG.description,
  telephone = SITE_CONFIG.phone,
  email = SITE_CONFIG.email,
  address = {
    streetAddress: "Commercial Trade Corridor, GIDC Estate",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380001",
    addressCountry: "IN",
  },
}: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    "@id": `${url}/#organization`,
    name,
    url,
    logo,
    image: `${url}/brand-logo.png`,
    description,
    telephone,
    email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Bank Transfer, NEFT, RTGS, Commercial LC, UPI",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Gujarat",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone,
        email,
        contactType: "wholesale sales and corporate inquiries",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd({
  name = SITE_CONFIG.name,
  url = SITE_CONFIG.url,
}: {
  name?: string;
  url?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface ProductJsonLdProps {
  name: string;
  description: string;
  images: string[];
  sku: string;
  slug: string;
  category: string;
  price: number;
  retailPrice?: number;
  moq: number;
  inStock?: boolean;
  brand?: string;
  mpn?: string;
  color?: string;
  additionalProperty?: { name: string; value: string }[];
}

export function ProductJsonLd({
  name,
  description,
  images,
  sku,
  slug,
  category,
  price,
  moq,
  inStock = true,
  brand = SITE_CONFIG.name,
  mpn,
  color,
  additionalProperty,
}: ProductJsonLdProps) {
  const productUrl = `${SITE_CONFIG.url}/product/${slug}`;
  const absoluteImages = images.map((img) =>
    img.startsWith("http") ? img : `${SITE_CONFIG.url}${img}`
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}/#product`,
    name,
    description,
    image: absoluteImages,
    sku,
    ...(mpn ? { mpn } : {}),
    ...(color ? { color } : {}),
    category,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(additionalProperty && additionalProperty.length > 0
      ? {
          additionalProperty: additionalProperty.map((prop) => ({
            "@type": "PropertyValue",
            name: prop.name,
            value: prop.value,
          })),
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: price.toFixed(2),
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        value: moq,
        unitCode: "C62", // UN/CEFACT code for pieces
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: price.toFixed(2),
        priceCurrency: "INR",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "C62",
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  featuredImage: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category?: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  featuredImage,
  publishedAt,
  updatedAt,
  author = "V&A Wholesale Editorial Team",
}: ArticleJsonLdProps) {
  const articleUrl = `${SITE_CONFIG.url}/blog/${slug}`;
  const imageUrl = featuredImage.startsWith("http")
    ? featuredImage
    : `${SITE_CONFIG.url}${featuredImage}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}/#article`,
    headline: title,
    description,
    image: [imageUrl],
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/brand-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


export interface CollectionPageProps {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
  totalCount: number;
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  items,
  totalCount,
}: CollectionPageProps) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${fullUrl}#collection`,
    name,
    description,
    url: fullUrl,
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalCount,
      itemListElement: items.slice(0, 20).map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
