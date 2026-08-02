import Image from "next/image"
import { brandConfig } from "@/config/brand"
import { contactConfig } from "@/config/contact"

const links = [["Soluções","#solutions"],["Automações","#automations"],["Projetos","#cases"],["Sobre","#about"],["Contato","#contact"],["Política de Privacidade","/politica-de-privacidade"]]

export function Footer() {
  return <footer className="border-t border-border bg-background py-10 text-foreground"><div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto]"><div><div className="w-fit max-w-xs"><Image src={brandConfig.logoHorizontal} alt="Logo oficial da STech Sistemas" width={brandConfig.logoWidth} height={brandConfig.logoHeight} className="h-auto w-full" /></div><p className="mt-4 font-semibold">STech Sistemas</p><p className="text-sm text-muted-foreground">Sistemas, Integrações e Automações</p><p className="mt-1 text-sm text-muted-foreground">Projetos liderados por Alessandro Barbosa</p><p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} STech Sistemas.</p></div><div className="space-y-5"><nav aria-label="Links do rodapé" className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground">{links.map(([label,href]) => <a key={href} href={href} className="transition-colors hover:text-primary">{label}</a>)}</nav><div className="flex gap-5 text-sm text-muted-foreground"><a href={contactConfig.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">LinkedIn</a><a href={contactConfig.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">GitHub</a>{/* TODO: confirmar com Alessandro o perfil oficial do Instagram da STech Sistemas. */}</div></div></div></footer>
}
