"use client"

import type { ConversionEvent } from "@/lib/analytics"
import { trackConversion } from "@/lib/analytics"

export function TrackedLink({ event, properties, ...props }: React.ComponentProps<"a"> & { event: ConversionEvent; properties?: Record<string, string> }) {
  return <a {...props} onClick={(clickEvent) => { props.onClick?.(clickEvent); trackConversion(event, properties) }} />
}
