import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getSiteUrl } from "@/config/site-url"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })
const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "STech Sistemas | Sistemas, Sites e Automações", template: "%s | STech Sistemas" },
  description: "A STech Sistemas desenvolve sistemas web, sites profissionais, landing pages, integrações e automações de WhatsApp, Telegram, e-mail e APIs.",
  keywords: ["STech Sistemas", "sistemas sob medida", "sites profissionais", "landing pages", "integrações", "automações"],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/brand/stech-logo-icon.png", type: "image/png", sizes: "371x364" }],
    shortcut: "/brand/stech-logo-icon.png",
    apple: [{ url: "/brand/stech-logo-icon.png", type: "image/png", sizes: "371x364" }],
  },
  openGraph: {
    type: "website", locale: "pt_BR", url: "/", siteName: "STech Sistemas",
    title: "STech Sistemas — Sistemas, Integrações e Automações",
    description: "Soluções digitais sob medida para automatizar processos, integrar canais e melhorar a operação.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "STech Sistemas — Sistemas, Integrações e Automações" }],
  },
  twitter: { card: "summary_large_image", title: "STech Sistemas — Sistemas, Integrações e Automações", description: "Sistemas, sites, integrações e automações sob medida.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${geistSans.variable} ${geistMono.variable} min-h-svh bg-background font-sans antialiased`}>{children}<Analytics /></body></html>
}
