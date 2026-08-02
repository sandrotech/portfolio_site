"use client"

import { ArrowRight } from "lucide-react"
import { trackConversion, type ConversionEvent } from "@/lib/analytics"
import { useLeadModal } from "@/components/lead-modal"
import type { LeadContext } from "@/components/lead-form"
import { cn } from "@/lib/utils"

type LeadCtaProps = LeadContext & {
  label: string
  event?: ConversionEvent
  className?: string
}

export function LeadCta({ label, event = "lead_form_start", className, ...context }: LeadCtaProps) {
  const { openLeadModal } = useLeadModal()
  return (
    <button
      type="button"
      className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-[0_8px_24px_rgba(21,94,239,0.22)] transition-colors duration-200 hover:bg-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", className)}
      onClick={() => { trackConversion(event, { source: context.source, sector: context.sector, projectId: context.projectId, projectTitle: context.projectTitle }); openLeadModal(context) }}
    >
      {label}<ArrowRight className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}
