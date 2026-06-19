import type { MetadataRoute } from "next";

// Generated at /sitemap.xml — helps Google discover and index nesycat.org.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nesycat.org",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
