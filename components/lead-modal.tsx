"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LeadContext, LeadForm } from "@/components/lead-form"

type LeadModalContextValue = {
  openLeadModal: (context: LeadContext) => void
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null)

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [context, setContext] = useState<LeadContext>({ source: "unknown" })
  const value = useMemo(() => ({ openLeadModal(next: LeadContext) { setContext(next); setOpen(true) } }), [])

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100svh-1rem)] overflow-y-auto border-primary/30 bg-card p-4 pt-6 sm:max-h-[calc(100svh-2rem)] sm:p-7">
          <DialogHeader>
            <DialogTitle className="pr-8 text-2xl">{context.title ?? "Falar sobre meu projeto"}</DialogTitle>
            <DialogDescription className="leading-relaxed text-muted-foreground">
              {context.description ?? "Conte brevemente o cenário atual. A STech utilizará essas informações para entender o projeto e avaliar os próximos passos com Alessandro."}
            </DialogDescription>
          </DialogHeader>
          <LeadForm {...context} compact onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </LeadModalContext.Provider>
  )
}

export function useLeadModal() {
  const value = useContext(LeadModalContext)
  if (!value) throw new Error("useLeadModal deve ser usado dentro de LeadModalProvider")
  return value
}
