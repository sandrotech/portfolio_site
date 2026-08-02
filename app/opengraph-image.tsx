import { ImageResponse } from "next/og"

export const alt = "STech Sistemas — Sistemas, Integrações e Automações"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 72, color: "white", background: "linear-gradient(135deg,#071b2f 10%,#104080 58%,#0050a0)" }}>
      <div style={{ display: "flex", fontSize: 28, color: "#70f0d0", letterSpacing: 2 }}>STech Sistemas</div>
      <div style={{ display: "flex", maxWidth: 1000, marginTop: 28, fontSize: 66, fontWeight: 700, lineHeight: 1.08 }}>Sistemas, Integrações e Automações</div>
      <div style={{ display: "flex", marginTop: 36, fontSize: 28, color: "#dbeafe" }}>Sistemas · Sites · Integrações · Automações</div>
      <div style={{ display: "flex", marginTop: 54, fontSize: 24, color: "#d4d4d8" }}>Projetos liderados por Alessandro Barbosa</div>
    </div>,
    size,
  )
}
