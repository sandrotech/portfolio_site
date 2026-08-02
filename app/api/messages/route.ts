import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { getMailConfig, getMailTransporter } from "@/lib/email"
import { leadSchema } from "@/lib/lead-schema"
import { escapeHtml } from "@/lib/escape-html"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Attempt = { count: number; resetAt: number }
const ipAttempts = new Map<string, Attempt>()
const contactAttempts = new Map<string, Attempt>()
const MAX_BODY_BYTES = 20_000
const MIN_SUBMIT_TIME_MS = 1_500
const mailConfig = getMailConfig()
const mailTransporter = getMailTransporter()

function limited(store: Map<string, Attempt>, key: string, maximum: number, windowMs: number) {
  const now = Date.now()
  if (store.size >= 10_000) {
    for (const [storedKey, attempt] of store) if (attempt.resetAt <= now) store.delete(storedKey)
    if (store.size >= 10_000) store.delete(store.keys().next().value as string)
  }
  const current = store.get(key)
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }
  current.count += 1
  return current.count > maximum
}

function hashIdentifier(value: string) {
  return createHash("sha256").update(value.toLowerCase().trim()).digest("hex")
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Formato de envio inválido." }, { status: 415 })
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0)
  if (declaredLength > MAX_BODY_BYTES) return NextResponse.json({ error: "Conteúdo muito grande." }, { status: 413 })

  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown"
  if (limited(ipAttempts, hashIdentifier(address), 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." }, { status: 429 })
  }

  try {
    const rawBody = await request.text()
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Conteúdo muito grande." }, { status: 413 })
    }

    let body: unknown
    try { body = JSON.parse(rawBody) } catch { return NextResponse.json({ error: "JSON inválido." }, { status: 400 }) }
    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Revise os dados enviados.", fields: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const lead = parsed.data
    if (lead.website) return NextResponse.json({ success: true }, { status: 201 })
    if (Date.now() - lead.startedAt < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ error: "Não foi possível validar o envio." }, { status: 400 })
    }

    const contactKey = hashIdentifier(lead.email || lead.phone || "missing")
    if (limited(contactAttempts, contactKey, 3, 30 * 60 * 1000)) {
      return NextResponse.json({ error: "Muitas tentativas para este contato. Tente novamente mais tarde." }, { status: 429 })
    }

    const context = [lead.source, lead.sector, lead.projectTitle].filter(Boolean).join(" · ")
    const safe = {
      name: escapeHtml(lead.name),
      company: escapeHtml(lead.company ?? "Não informada"),
      email: escapeHtml(lead.email ?? "Não informado"),
      phone: escapeHtml(lead.phone ?? "Não informado"),
      message: escapeHtml(lead.message),
      context: escapeHtml(context || "Site"),
      pathname: escapeHtml(lead.pathname ?? "/"),
    }

    await mailTransporter.sendMail({
      from: `"STech Sistemas — contato pelo site" <${mailConfig.SMTP_USER}>`,
      to: mailConfig.CONTACT_EMAIL,
      replyTo: lead.email,
      subject: `Novo contato comercial da STech Sistemas - ${lead.name.replace(/[\r\n]/g, " ").slice(0, 80)}`,
      text: `Nome: ${lead.name}\nEmpresa: ${lead.company || "Não informada"}\nE-mail: ${lead.email || "Não informado"}\nWhatsApp: ${lead.phone || "Não informado"}\nOrigem/setor/projeto: ${context || "Site"}\nPágina: ${lead.pathname || "/"}\n\nDesafio:\n${lead.message}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto"><h1>Novo contato comercial da STech Sistemas</h1><p><strong>Nome:</strong> ${safe.name}</p><p><strong>Empresa:</strong> ${safe.company}</p><p><strong>E-mail:</strong> ${safe.email}</p><p><strong>WhatsApp:</strong> ${safe.phone}</p><p><strong>Origem/setor/projeto:</strong> ${safe.context}</p><p><strong>Página:</strong> ${safe.pathname}</p><h2>Desafio</h2><p style="white-space:pre-wrap">${safe.message}</p></div>`,
    })

    return NextResponse.json({ success: true }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("Falha no envio do lead", { cause: error instanceof Error ? error.name : "unknown" })
    return NextResponse.json({ error: "Não foi possível enviar sua mensagem. Tente novamente." }, { status: 500 })
  }
}
