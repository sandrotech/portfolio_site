"use client"

import type { LeadInput } from "@/lib/lead-schema"

export async function submitLead(payload: LeadInput) {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await response.json().catch(() => null) as { error?: string } | null
  if (!response.ok) throw new Error(data?.error || "Não foi possível enviar sua mensagem.")
  return data
}
