import type { MetadataRoute } from "next";

// Generated at /robots.txt — allow all crawlers, point to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://nesycat.org/sitemap.xml",
  };
}
