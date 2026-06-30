"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LucideProps } from "lucide-react"

const WhatsappIcon = (props: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path
      transform="translate(6.5, 6.2) scale(0.45)"
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    />
  </svg>
)

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false)

  const openWhatsApp = () => {
    window.open("https://wa.me/5585988102690", "_blank")
  }

  return (
    <div className="fixed bottom-24 right-8 z-50 flex items-center gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" />
        <Button
          size="icon"
          onClick={openWhatsApp}
          aria-label="Fale conosco no WhatsApp"
          className="relative rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/50 h-12 w-12 transition-all duration-300 hover:scale-110 hover:shadow-green-500/80"
        >
          <WhatsappIcon className="h-6 w-6" />
        </Button>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
        className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap pointer-events-none"
      >
        Fale conosco no WhatsApp
      </motion.span>
    </div>
  )
}
