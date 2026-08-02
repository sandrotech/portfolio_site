import { z } from "zod"
import { sectorIds } from "./sectors.ts"

const optionalString = (max: number) => z.preprocess(
  (value) => typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().trim().max(max).optional(),
)

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  email: z.preprocess(
    (value) => typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().trim().email("Informe um e-mail válido.").max(254).optional(),
  ),
  phone: z.preprocess(
    (value) => typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().trim().min(8, "Informe um WhatsApp válido.").max(30).regex(/^[+()0-9\s.-]+$/, "Informe um WhatsApp válido.").optional(),
  ),
  company: optionalString(150),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o desafio.").max(3000),
  source: z.string().trim().min(1).max(100),
  sector: z.preprocess(
    (value) => value === "" ? undefined : value,
    z.enum(sectorIds).optional(),
  ),
  projectId: optionalString(100),
  projectTitle: optionalString(200),
  pathname: optionalString(500),
  referrer: optionalString(500),
  utmSource: optionalString(200),
  utmMedium: optionalString(200),
  utmCampaign: optionalString(200),
  utmContent: optionalString(200),
  website: optionalString(200),
  startedAt: z.number().int().positive(),
}).strict().refine((data) => Boolean(data.email || data.phone), {
  message: "Informe um e-mail ou WhatsApp.",
  path: ["email"],
})

export type LeadInput = z.infer<typeof leadSchema>
