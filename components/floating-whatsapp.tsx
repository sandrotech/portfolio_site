"use client"

import { MessageCircle } from "lucide-react"
import { whatsappUrl } from "@/config/contact"
import { trackConversion } from "@/lib/analytics"

export function FloatingWhatsApp() { return <a href={whatsappUrl("Olá, Alessandro. Conheci a STech Sistemas pelo site e gostaria de conversar sobre um projeto.")} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_click", { source: "floating_button" })} className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 hover:bg-emerald-500 sm:right-6" aria-label="Conversar com Alessandro sobre um projeto da STech Sistemas pelo WhatsApp"><MessageCircle className="h-6 w-6" aria-hidden="true" /></a> }
