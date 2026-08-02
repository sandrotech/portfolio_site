import nodemailer, { type Transporter } from "nodemailer"
import { z } from "zod"

const emailEnvSchema = z.object({
  SMTP_SERVICE: z.string().trim().min(1).optional(),
  SMTP_HOST: z.string().trim().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().max(65535).default(465),
  SMTP_USER: z.string().trim().min(1),
  SMTP_PASS: z.string().min(1),
  CONTACT_EMAIL: z.string().trim().email(),
}).refine((env) => Boolean(env.SMTP_SERVICE || env.SMTP_HOST), {
  message: "Defina SMTP_SERVICE ou SMTP_HOST.",
})

declare global {
  var portfolioMailTransporter: Transporter | undefined
}

export function getMailConfig() {
  const parsed = emailEnvSchema.safeParse(process.env)
  if (!parsed.success) throw new Error("EMAIL_ENV_INVALID")
  return parsed.data
}

export function getMailTransporter() {
  if (globalThis.portfolioMailTransporter) return globalThis.portfolioMailTransporter
  const env = getMailConfig()
  const transporter = env.SMTP_SERVICE
    ? nodemailer.createTransport({ service: env.SMTP_SERVICE, auth: { user: env.SMTP_USER, pass: env.SMTP_PASS } })
    : nodemailer.createTransport({ host: env.SMTP_HOST, port: env.SMTP_PORT, secure: env.SMTP_PORT === 465, auth: { user: env.SMTP_USER, pass: env.SMTP_PASS } })
  globalThis.portfolioMailTransporter = transporter
  return transporter
}
