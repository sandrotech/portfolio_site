"use client"

import { FormEvent, useId, useRef, useState } from "react"
import { ArrowRight, CheckCircle2, Loader2, RotateCcw, X } from "lucide-react"
import { contactConfig, whatsappUrl } from "@/config/contact"
import { getAttribution, trackConversion } from "@/lib/analytics"
import { leadSchema } from "@/lib/lead-schema"
import { submitLead } from "@/lib/submit-lead"
import type { SectorId } from "@/lib/sectors"

export type LeadContext = {
  source: string
  sector?: SectorId
  projectId?: string
  projectTitle?: string
  title?: string
  description?: string
  initialMessage?: string
}

type LeadFormProps = LeadContext & { compact?: boolean; onClose?: () => void }
type FieldErrors = Partial<Record<"name" | "email" | "phone" | "company" | "message", string>>

export function LeadForm({ source, sector, projectId, projectTitle, initialMessage = "", compact = false, onClose }: LeadFormProps) {
  const id = useId()
  const startedAt = useRef(Date.now())
  const startedEventSent = useRef(false)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [whatsAppMessage, setWhatsAppMessage] = useState("")

  function startAgain() {
    startedAt.current = Date.now()
    startedEventSent.current = false
    setError("")
    setFieldErrors({})
    setStatus("idle")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const form = new FormData(event.currentTarget)
    const attribution = getAttribution()
    const payload = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
      startedAt: startedAt.current,
      source, sector, projectId, projectTitle,
      pathname: attribution.pathname,
      referrer: attribution.referrer,
      utmSource: attribution.utm_source,
      utmMedium: attribution.utm_medium,
      utmCampaign: attribution.utm_campaign,
      utmContent: attribution.utm_content,
    }

    const parsed = leadSchema.safeParse(payload)
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors
      setFieldErrors(Object.fromEntries(Object.entries(flattened).map(([key, messages]) => [key, messages?.[0]])) as FieldErrors)
      setStatus("error")
      setError("Revise os campos indicados e tente novamente.")
      return
    }

    setStatus("sending")
    setError("")
    setFieldErrors({})
    trackConversion("lead_form_submit", { source, sector, projectId, projectTitle })
    try {
      await submitLead(parsed.data)
      const context = projectTitle || sector || "um projeto de software sob medida"
      setWhatsAppMessage(`Olá, Alessandro. Conheci a STech Sistemas pelo site e gostaria de conversar sobre ${context}. Meu principal desafio é: ${parsed.data.message}`)
      setStatus("success")
      trackConversion("lead_form_success", { source, sector, projectId, projectTitle })
    } catch (submitError) {
      setStatus("error")
      setError(submitError instanceof Error ? submitError.message : "Não foi possível enviar sua mensagem.")
      trackConversion("lead_form_error", { source, sector, projectId, projectTitle })
    }
  }

  if (status === "success") {
    return <div className="rounded-xl border border-[var(--success)]/30 bg-emerald-50 p-6 text-center" role="status" aria-live="polite">
      <CheckCircle2 className="mx-auto mb-3 h-9 w-9 text-[var(--success)]" aria-hidden="true" />
      <h3 className="text-lg font-semibold">Mensagem recebida</h3>
      <p className="mt-2 text-sm text-muted-foreground">A mensagem foi enviada à STech Sistemas. Você também pode continuar a conversa diretamente com Alessandro pelo WhatsApp.</p>
      <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
        <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-medium text-white transition-colors hover:bg-emerald-800" href={whatsappUrl(whatsAppMessage)} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_click", { source: `${source}_success`, sector, projectId, projectTitle })}>Continuar no WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        <button type="button" onClick={startAgain} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-medium hover:bg-muted"><RotateCcw className="h-4 w-4" aria-hidden="true" />Enviar outra mensagem</button>
        {onClose && <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-medium hover:bg-muted"><X className="h-4 w-4" aria-hidden="true" />Fechar</button>}
      </div>
    </div>
  }

  return <form onSubmit={handleSubmit} className="space-y-4" aria-busy={status === "sending"} noValidate onFocusCapture={() => { if (!startedEventSent.current) { startedEventSent.current = true; trackConversion("lead_form_start", { source, sector, projectId, projectTitle }) } }}>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField id={`${id}-name`} name="name" label="Nome" autoComplete="name" required placeholder="Seu nome" error={fieldErrors.name} />
      <TextField id={`${id}-company`} name="company" label="Empresa (opcional)" autoComplete="organization" placeholder="Nome da empresa" error={fieldErrors.company} />
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField id={`${id}-email`} name="email" label="E-mail" type="email" inputMode="email" autoComplete="email" placeholder="email@empresa.com" error={fieldErrors.email} />
      <TextField id={`${id}-phone`} name="phone" label="WhatsApp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" error={fieldErrors.phone} />
    </div>
    <p className="-mt-2 text-xs text-muted-foreground">Informe pelo menos um dos dois canais de contato.</p>
    <div className="space-y-2">
      <label htmlFor={`${id}-message`} className="text-sm font-medium">Qual desafio precisa resolver? <span aria-hidden="true">*</span></label>
      <textarea id={`${id}-message`} name="message" required rows={compact ? 4 : 5} className="form-control resize-y" defaultValue={initialMessage} placeholder="Descreva o processo atual, os sistemas envolvidos e o resultado esperado." aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? `${id}-message-error` : undefined} />
      {fieldErrors.message && <p id={`${id}-message-error`} className="flex items-center gap-2 text-sm font-medium text-[var(--error)]"><span aria-hidden="true">⚠</span>{fieldErrors.message}</p>}
    </div>
    <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor={`${id}-website`}>Website</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
    <p className="text-xs leading-relaxed text-muted-foreground">Os dados serão utilizados apenas para responder ao contato. Não envie dados de pacientes, documentos, prontuários ou informações pessoais sensíveis. Consulte a <a href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-foreground">Política de Privacidade</a>.</p>
    <div aria-live="polite">{error && <p className="flex items-center gap-2 text-sm font-medium text-[var(--error)]" role="alert"><span aria-hidden="true">⚠</span>{error}</p>}</div>
    <button type="submit" disabled={status === "sending"} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-[0_8px_24px_rgba(21,94,239,0.18)] transition-colors duration-200 hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60">{status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Enviando…</> : <>Solicitar avaliação inicial <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}</button>
    <p className="text-center text-xs text-muted-foreground">{contactConfig.email} · Atendimento direto com Alessandro</p>
  </form>
}

function TextField({ id, label, error, required, ...input }: React.ComponentProps<"input"> & { id: string; label: string; error?: string }) {
  return <div className="space-y-2"><label htmlFor={id} className="text-sm font-medium">{label}{required && <span aria-hidden="true"> *</span>}</label><input {...input} id={id} required={required} className="form-control" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />{error && <p id={`${id}-error`} className="flex items-center gap-2 text-sm font-medium text-[var(--error)]"><span aria-hidden="true">⚠</span>{error}</p>}</div>
}
