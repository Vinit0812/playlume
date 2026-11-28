import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/*?*search=*",
          "/*?*ref=*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/*?*search=*", "/*?*ref=*"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/*?*search=*", "/*?*ref=*"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/*?*search=*", "/*?*ref=*"],
      },
      {
        userAgent: "Claude-User",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
