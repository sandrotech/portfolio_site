import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/config/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  return [
    { url: new URL("/", siteUrl).toString(), lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: new URL("/politica-de-privacidade", siteUrl).toString(), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]
}
