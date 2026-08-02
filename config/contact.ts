export const contactConfig = {
  email: "sandro.santostech@gmail.com",
  whatsappNumber: "5585988102690",
  linkedin: "https://www.linkedin.com/in/alessandro-barbosa/?locale=pt",
  github: "https://github.com/sandrotech",
} as const

export function whatsappUrl(message: string) {
  return `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
