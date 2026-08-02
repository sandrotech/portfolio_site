"use client"

import { track } from "@vercel/analytics"
import type { SectorId } from "@/lib/sectors"

export type ConversionEvent =
  | "hero_primary_cta_click"
  | "hero_secondary_cta_click"
  | "navigation_cta_click"
  | "sector_cta_click"
  | "project_view"
  | "project_lead_click"
  | "project_filter_select"
  | "cases_automation_click"
  | "whatsapp_click"
  | "lead_form_start"
  | "lead_form_submit"
  | "lead_form_success"
  | "lead_form_error"
  | "faq_open"

type EventProperties = {
  source?: string
  sector?: SectorId
  filter?: string
  projectId?: string
  projectTitle?: string
  [key: string]: string | number | boolean | undefined
}

export function getAttribution() {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  let referrer = ""
  try { referrer = document.referrer ? new URL(document.referrer).origin : "" } catch { referrer = "" }
  const clean = (value: string | null) => value?.slice(0, 120) || undefined
  return {
    pathname: window.location.pathname,
    referrer,
    utm_source: clean(params.get("utm_source")),
    utm_medium: clean(params.get("utm_medium")),
    utm_campaign: clean(params.get("utm_campaign")),
    utm_content: clean(params.get("utm_content")),
  }
}

export function trackConversion(name: ConversionEvent, properties: EventProperties = {}) {
  if (typeof window === "undefined") return
  track(name, { ...getAttribution(), ...properties })
}
