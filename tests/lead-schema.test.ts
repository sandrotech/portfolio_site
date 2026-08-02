import assert from "node:assert/strict"
import test from "node:test"
import { leadSchema } from "../lib/lead-schema.ts"
import { escapeHtml } from "../lib/escape-html.ts"
import { sectorIds } from "../lib/sectors.ts"

const baseLead = {
  name: "Maria Silva",
  email: "maria@empresa.com",
  phone: "",
  company: "Empresa",
  message: "Precisamos integrar o ERP ao portal de fornecedores.",
  source: "contact_section",
  sector: "varejo",
  projectId: "",
  projectTitle: "",
  pathname: "/",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  website: "",
  startedAt: Date.now() - 3_000,
}

test("aceita lead com e-mail válido", () => {
  assert.equal(leadSchema.safeParse(baseLead).success, true)
})

test("aceita lead somente com WhatsApp", () => {
  assert.equal(leadSchema.safeParse({ ...baseLead, email: "", phone: "+55 (85) 98810-2690" }).success, true)
})

test("rejeita lead sem e-mail e WhatsApp", () => {
  assert.equal(leadSchema.safeParse({ ...baseLead, email: "", phone: "" }).success, false)
})

test("rejeita setor e campos inesperados", () => {
  assert.equal(leadSchema.safeParse({ ...baseLead, sector: "financeiro", admin: true }).success, false)
})

test("aceita todos os segmentos centralizados", () => {
  for (const sector of sectorIds) assert.equal(leadSchema.safeParse({ ...baseLead, sector }).success, true, sector)
})

test("rejeita mensagem curta e e-mail inválido", () => {
  assert.equal(leadSchema.safeParse({ ...baseLead, email: "invalido", message: "curta" }).success, false)
})

test("escapa todos os caracteres que poderiam injetar HTML", () => {
  assert.equal(escapeHtml(`<img src=x onerror="alert('x')"> &`), "&lt;img src=x onerror=&quot;alert(&#039;x&#039;)&quot;&gt; &amp;")
})
