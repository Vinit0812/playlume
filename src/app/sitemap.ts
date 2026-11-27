import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { MASTER_PRODUCTS, CATEGORY_META } from "@/lib/products-data";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // 1. Static Core Landing Pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/trending`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/enquiry`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/become-a-buyer`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/policies/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/policies/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 2. Commercial Category Pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORY_META.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Unrolled Commercial Products (219 Active SKUs)
  const productPages: MetadataRoute.Sitemap = MASTER_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/product/${prod.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. B2B Sourcing Guides & Blog Hub Articles
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
