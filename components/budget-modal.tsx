"use client";

import { useState, useEffect } from "react";
import { X, Send, CheckCircle2, ShoppingCart, HeartPulse } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Sector = "varejo" | "saude";

interface BudgetModalProps {
  isOpen: boolean;
  sector: Sector | null;
  onClose: () => void;
  projectName?: string | null;
}

const sectorConfig = {
  varejo: {
    label: "Varejo & Supermercados",
    icon: ShoppingCart,
    accent: "#E57C1F",
    accentMuted: "rgba(229,124,31,0.12)",
    accentBorder: "rgba(229,124,31,0.3)",
    placeholder: "Ex: sistema de gestão de estoque, PDV, portal de fornecedores...",
    cta: "Quero transformar meu varejo",
  },
  saude: {
    label: "Saúde & Hospitalar",
    icon: HeartPulse,
    accent: "#0F6B75",
    accentMuted: "rgba(15,107,117,0.12)",
    accentBorder: "rgba(15,107,117,0.3)",
    placeholder: "Ex: sistema de agendamento, prontuário eletrônico, gestão hospitalar...",
    cta: "Quero modernizar minha clínica/hospital",
  },
};

const WHATSAPP_NUMBER = "5585988102690";

export function BudgetModal({ isOpen, sector, onClose, projectName }: BudgetModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Initialize description if a project name is passed
  useEffect(() => {
    if (isOpen) {
      if (projectName) {
        setDescription(`Olá! Tenho interesse em desenvolver um sistema sob medida inspirado no projeto "${projectName}". Seguem alguns detalhes da minha ideia:\n\n`);
      } else {
        setDescription("");
      }
    }
  }, [isOpen, projectName]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("");
        setEmail("");
        setCompany("");
        setDescription("");
        setIsSubmitted(false);
        setErrorMsg("");
      }, 400);
    }
  }, [isOpen]);

  if (!sector) return null;

  const config = sectorConfig[sector];
  const SectorIcon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const message = `Olá, Alessandro! Sou ${name} da empresa "${company || "não informado"}". Tenho interesse em um orçamento para a área de ${config.label}. Segue o que preciso: ${description}. E-mail para contato: ${email}`;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `[Orçamento - ${config.label}]\nEmpresa: ${company || "não informada"}\nDescrição: ${description}`,
        }),
      });

      setIsSubmitted(true);

      // Redirect to WhatsApp after 1.8 seconds
      setTimeout(() => {
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
        onClose();
      }, 1800);
    } catch {
      setErrorMsg("Erro ao enviar. Tente novamente ou nos contate diretamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "#111", border: `1px solid ${config.accentBorder}` }}
            >
              {/* Accent bar top */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: config.accent }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-5 p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: config.accentMuted, border: `1px solid ${config.accentBorder}` }}
                    >
                      <CheckCircle2 className="h-8 w-8" style={{ color: config.accent }} />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">Mensagem enviada!</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Redirecionando você para o WhatsApp para continuarmos a conversa...
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ background: config.accent }}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div
                      className="px-6 pt-8 pb-5"
                      style={{ borderBottom: `1px solid ${config.accentBorder}` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: config.accentMuted }}
                        >
                          <SectorIcon className="h-5 w-5" style={{ color: config.accent }} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: config.accent }}>
                            {config.label}
                          </p>
                          <h2 className="text-xl font-bold text-white leading-tight">
                            Solicitar Orçamento
                          </h2>
                        </div>
                      </div>
                      <p className="text-sm text-white/50">
                        Preencha os dados abaixo. Vou te chamar no WhatsApp em até 1 hora!
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-white/60">Seu nome *</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="João Silva"
                            className="w-full h-10 px-3 rounded-lg text-sm text-white bg-white/5 border border-white/10 focus:outline-none placeholder:text-white/20 transition-colors"
                            style={{
                              "--tw-ring-color": config.accent,
                            } as React.CSSProperties}
                            onFocus={(e) => (e.target.style.borderColor = config.accentBorder)}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-white/60">Empresa</label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="Nome da empresa"
                            className="w-full h-10 px-3 rounded-lg text-sm text-white bg-white/5 border border-white/10 focus:outline-none placeholder:text-white/20 transition-colors"
                            onFocus={(e) => (e.target.style.borderColor = config.accentBorder)}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-white/60">E-mail *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          placeholder="seu@email.com"
                          className="w-full h-10 px-3 rounded-lg text-sm text-white bg-white/5 border border-white/10 focus:outline-none placeholder:text-white/20 transition-colors"
                          onFocus={(e) => (e.target.style.borderColor = config.accentBorder)}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-white/60">O que você precisa? *</label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          disabled={isSubmitting}
                          placeholder={config.placeholder}
                          rows={4}
                          className="w-full px-3 py-2 rounded-lg text-sm text-white bg-white/5 border border-white/10 focus:outline-none placeholder:text-white/20 transition-colors resize-none"
                          onFocus={(e) => (e.target.style.borderColor = config.accentBorder)}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>

                      {errorMsg && (
                        <p className="text-red-400 text-xs">{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-60"
                        style={{
                          background: config.accent,
                          color: "#fff",
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            {config.cta}
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-white/30">
                        Após enviar, você será redirecionado ao WhatsApp para continuarmos.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
