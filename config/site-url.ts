import { z } from "zod"

const siteUrlSchema = z.string().url().refine((value) => value.startsWith("https://") || value.startsWith("http://"), "Use uma URL HTTP ou HTTPS.")

export function getSiteUrl() {
  const parsed = siteUrlSchema.safeParse(process.env.NEXT_PUBLIC_SITE_URL)
  if (!parsed.success && process.env.NODE_ENV === "development") {
    console.warn("NEXT_PUBLIC_SITE_URL não definida; usando http://localhost:3000 apenas em desenvolvimento.")
    return new URL("http://localhost:3000")
  }
  if (!parsed.success) throw new Error("NEXT_PUBLIC_SITE_URL deve conter a URL pública completa do site em produção.")
  return new URL(parsed.data)
}
