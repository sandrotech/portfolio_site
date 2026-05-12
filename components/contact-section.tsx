"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  CheckCircle2,
  LucideProps,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
);

const socialLinks = [
  { icon: Github, href: "https://github.com/sandrotech", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/alessandro-barbosa/?locale=pt", label: "LinkedIn" },
  { icon: Mail, href: "mailto:sandro.santostech@gmail.com", label: "Email" },
  { icon: WhatsappIcon, href: "https://wa.me/5585988102690", label: "WhatsApp" },
];

export function ContactSection() {
  // campos do form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  // estados de envio
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: text,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao enviar mensagem");
      }

      // sucesso
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setText("");

      // tira o "Enviado!" depois de alguns segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Erro inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* background da seção */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Vamos Conectar?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Sempre aberto a novas ideias, colaborações estratégicas e desenvolvimento de projetos inovadores. Vamos conversar?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* FORMULÁRIO */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    required
                    className="bg-card border-border focus:border-primary transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    className="bg-card border-border focus:border-primary transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Conte-me sobre sua ideia..."
                    rows={5}
                    required
                    className="bg-card border-border focus:border-primary transition-colors resize-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-500">{errorMsg}</p>
                )}

                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r transition-all duration-500 group overflow-hidden relative h-11 ${
                    isSubmitted
                      ? "from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25"
                      : "from-primary to-secondary hover:opacity-90"
                  }`}
                  disabled={isSubmitting || isSubmitted}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center absolute inset-0"
                      >
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        <span>Enviando...</span>
                      </motion.div>
                    ) : isSubmitted ? (
                      <motion.div
                        key="submitted"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center justify-center absolute inset-0"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4 text-white" />
                        </motion.div>
                        <span className="font-semibold text-white">Enviado com Sucesso!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center absolute inset-0"
                      >
                        <span>Enviar Mensagem</span>
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </div>

            {/* SOCIAL / CONTATO ALTERNATIVO */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Redes Sociais</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Conecte-se comigo nas redes sociais e vamos construir algo
                  incrível juntos!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  const isWhatsapp = social.label === "WhatsApp";
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg ${
                        isWhatsapp
                          ? "hover:border-[#25D366]/50 hover:shadow-[#25D366]/20"
                          : "hover:border-primary/50 hover:shadow-primary/20"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className={`p-3 rounded-lg transition-colors ${
                            isWhatsapp
                              ? "bg-[#25D366]/10 group-hover:bg-[#25D366]/20"
                              : "bg-primary/10 group-hover:bg-primary/20"
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 transition-transform group-hover:scale-110 ${
                              isWhatsapp ? "text-[#25D366]" : "text-primary"
                            }`}
                          />
                        </div>
                        <span className="font-medium">{social.label}</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <p className="text-center text-sm text-muted-foreground leading-relaxed">
                  Respondo todas as mensagens em até 24 horas. Vamos conversar
                  sobre tecnologia, projetos e oportunidades!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
