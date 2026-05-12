"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingCart,
  HeartPulse,
  BadgeDollarSign,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
  url?: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP = "5585988102690";
const CARD_WIDTH = 360;
const CARD_GAP = 24;
const SPEED_PX_PER_SEC = 48;

// Detect project sector for modal accent color
function getSectorFromProject(project: Project) {
  const lowerTags = project.tags.map((t) => t.toLowerCase());
  const lowerTitle = project.title.toLowerCase();
  if (
    lowerTags.some((t) => ["lgpd", "ans", "telemedicina", "saúde", "pep", "hospitalar"].includes(t)) ||
    lowerTitle.includes("saúde") ||
    lowerTitle.includes("med") ||
    lowerTitle.includes("clínica")
  ) {
    return { accent: "#0F6B75", accentMuted: "rgba(15,107,117,0.14)", accentBorder: "rgba(15,107,117,0.35)", icon: HeartPulse, label: "Saúde & Hospitalar" };
  }
  return { accent: "#E57C1F", accentMuted: "rgba(229,124,31,0.14)", accentBorder: "rgba(229,124,31,0.35)", icon: ShoppingCart, label: "Varejo & Supermercados" };
}

// ─── Quote Modal ──────────────────────────────────────────────────────────────
function QuoteModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isOpen = project !== null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setName(""); setEmail(""); setCompany(""); setDescription("");
        setIsSubmitted(false); setErrorMsg("");
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!project) return null;

  const cfg = getSectorFromProject(project);
  const SectorIcon = cfg.icon;
  const placeholder = `Conte mais sobre o que você precisa com base no projeto "${project.title}"...`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const waText = `Olá, Alessandro! Sou ${name}${company ? ` da empresa "${company}"` : ""}.\n\nTenho interesse em um orçamento inspirado no projeto *${project.title}*.\n\n${description}\n\nE-mail: ${email}`;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `[Orçamento via Carrossel - ${project.title}]\nEmpresa: ${company || "não informada"}\nDescrição: ${description}`,
        }),
      });

      setIsSubmitted(true);

      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`, "_blank");
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
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 64, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
              style={{ background: "#0e0e0e", border: `1px solid ${cfg.accentBorder}` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${cfg.accent}, transparent)` }} />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar modal"
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
                    className="flex flex-col items-center justify-center gap-5 p-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.25, 1] }}
                      transition={{ duration: 0.45, delay: 0.05 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: cfg.accentMuted, border: `1px solid ${cfg.accentBorder}` }}
                    >
                      <CheckCircle2 className="h-8 w-8" style={{ color: cfg.accent }} />
                    </motion.div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white">Mensagem enviada!</h3>
                      <p className="text-white/50 text-sm">Abrindo WhatsApp para continuarmos...</p>
                    </div>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ background: cfg.accent }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.22 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div className="px-6 pt-8 pb-5" style={{ borderBottom: `1px solid ${cfg.accentBorder}` }}>
                      {/* Project preview pill */}
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 text-xs font-semibold"
                        style={{ background: cfg.accentMuted, color: cfg.accent, border: `1px solid ${cfg.accentBorder}` }}
                      >
                        <SectorIcon className="h-3.5 w-3.5" />
                        {project.title}
                      </div>

                      <h2 className="text-xl font-bold text-white leading-tight">
                        Solicitar Orçamento Personalizado
                      </h2>
                      <p className="text-white/45 text-sm mt-1.5 leading-relaxed">
                        Preencha abaixo e te chamo no WhatsApp em até <strong className="text-white/70">1 hora</strong>!
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Seu nome *", value: name, onChange: setName, placeholder: "João Silva", type: "text", required: true },
                          { label: "Empresa", value: company, onChange: setCompany, placeholder: "Nome da empresa", type: "text", required: false },
                        ].map((field) => (
                          <div key={field.label} className="space-y-1">
                            <label className="text-xs font-medium text-white/55">{field.label}</label>
                            <input
                              type={field.type}
                              required={field.required}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={isSubmitting}
                              placeholder={field.placeholder}
                              className="w-full h-10 px-3 rounded-lg text-sm text-white bg-white/5 border border-white/10 focus:outline-none placeholder:text-white/20 transition-colors"
                              onFocus={(e) => (e.target.style.borderColor = cfg.accentBorder)}
                              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-white/55">E-mail *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          placeholder="seu@email.com"
                          className="w-full h-10 px-3 rounded-lg text-sm text-white bg-white/5 border border-white/10 focus:outline-none placeholder:text-white/20 transition-colors"
                          onFocus={(e) => (e.target.style.borderColor = cfg.accentBorder)}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-white/55">O que você precisa? *</label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          disabled={isSubmitting}
                          placeholder={placeholder}
                          rows={4}
                          className="w-full px-3 py-2.5 rounded-lg text-sm text-white bg-white/5 border border-white/10 focus:outline-none placeholder:text-white/20 transition-colors resize-none"
                          onFocus={(e) => (e.target.style.borderColor = cfg.accentBorder)}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>

                      {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-60 hover:brightness-110"
                        style={{ background: cfg.accent, color: "#fff" }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Quero um orçamento para isso
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-white/25">
                        Após enviar, você será redirecionado ao WhatsApp.
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

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: (p: Project) => void;
}) {
  const cfg = getSectorFromProject(project);

  return (
    <motion.button
      onClick={() => onClick(project)}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="flex-shrink-0 text-left cursor-pointer focus:outline-none group"
      style={{ width: CARD_WIDTH }}
      aria-label={`Solicitar orçamento para ${project.title}`}
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background: "#111",
          border: `1px solid rgba(255,255,255,0.08)`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
        }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-25`}
          />
          <img
            src={project.image && project.image.trim() !== "" ? project.image : "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            draggable={false}
          />

          {/* Hover CTA overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
          >
            <span
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white"
              style={{ background: cfg.accent }}
            >
              <BadgeDollarSign className="h-4 w-4" />
              Pedir Orçamento
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
            <ArrowRight
              className="h-4 w-4 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-1"
              style={{ color: cfg.accent }}
            />
          </div>

          <p className="text-white/50 text-xs leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full"
                style={{
                  background: cfg.accentMuted,
                  color: cfg.accent,
                  border: `1px solid ${cfg.accentBorder}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Infinite Marquee ─────────────────────────────────────────────────────────
function InfiniteMarquee({
  projects,
  onCardClick,
}: {
  projects: Project[];
  onCardClick: (p: Project) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const totalW = projects.length * (CARD_WIDTH + CARD_GAP);

  const animate = useCallback(() => {
    if (!pausedRef.current && trackRef.current) {
      posRef.current -= SPEED_PX_PER_SEC / 60;
      if (posRef.current <= -totalW) posRef.current += totalW;
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [totalW]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // Duplicate cards to fill viewport seamlessly
  const doubled = [...projects, ...projects, ...projects];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
    >
      {/* Left / Right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--background) 0%, transparent 100%)" }} />

      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap: CARD_GAP, paddingBottom: 8 }}
      >
        {doubled.map((project, idx) => (
          <ProjectCard
            key={`${project.id}-${idx}`}
            project={project}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #E57C1F, transparent 70%)" }} />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 -translate-y-1/2 rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #0F6B75, transparent 70%)" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-2"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Projetos que posso construir para você
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-foreground"
          >
            Produtos Digitais
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Clique em qualquer projeto para solicitar um orçamento sob medida.
          </motion.p>
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="flex gap-6 overflow-hidden py-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl bg-white/5 animate-pulse"
                style={{ width: CARD_WIDTH, height: 340 }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InfiniteMarquee projects={projects} onCardClick={setSelectedProject} />
          </motion.div>
        )}

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-white/25 mt-8 flex items-center justify-center gap-1.5"
        >
          <span className="inline-block w-4 h-px bg-white/20" />
          Passe o mouse para pausar · Clique para orçar
          <span className="inline-block w-4 h-px bg-white/20" />
        </motion.p>
      </div>

      {/* Quote Modal */}
      <QuoteModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
