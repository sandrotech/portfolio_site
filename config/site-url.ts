import { z } from "zod"

const siteUrlSchema = z.string().url().refine(
  (value) => value.startsWith("https://") || value.startsWith("http://"),
  "Use uma URL HTTP ou HTTPS.",
)

export function getSiteUrl() {
  // COOLIFY_URL é injetada automaticamente pelo Coolify no build e runtime.
  // A variável explícita mantém precedência para outros provedores.
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.COOLIFY_URL
  const parsed = siteUrlSchema.safeParse(configuredUrl)

  if (!parsed.success && process.env.NODE_ENV === "development") {
    console.warn("URL pública não definida; usando http://localhost:3000 apenas em desenvolvimento.")
    return new URL("http://localhost:3000")
  }

  if (!parsed.success) {
    throw new Error("Defina NEXT_PUBLIC_SITE_URL ou forneça COOLIFY_URL com a URL pública completa do site.")
  }

  return new URL(parsed.data)
}
