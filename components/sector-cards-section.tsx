"use client";

import { useState, useRef } from "react";
import {
  ShoppingCart,
  HeartPulse,
  BarChart3,
  Cpu,
  Scan,
  Activity,
  ArrowRight,
  Zap,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { BudgetModal } from "@/components/budget-modal";

type Sector = "varejo" | "saude";

// ─── Varejo features ──────────────────────────────────────────────────────────
const varejoFeatures = [
  { icon: BarChart3, label: "BI e Dashboards de Venda em Tempo Real" },
  { icon: ShoppingCart, label: "PDV e Gestão de Estoque Integrados" },
  { icon: Scan, label: "Portal de Fornecedores com Rastreio de Pedidos" },
  { icon: Cpu, label: "Automações e Integrações com ERPs" },
];

// ─── Saúde features ───────────────────────────────────────────────────────────
const saudeFeatures = [
  { icon: Activity, label: "Prontuário Eletrônico do Paciente (PEP)" },
  { icon: HeartPulse, label: "Agendamento Online e Telemedicina" },
  { icon: BarChart3, label: "Dashboards de Indicadores Hospitalares" },
  { icon: Cpu, label: "Integração com Sistemas TISS / TUSS" },
];

// ─── Stat badge ───────────────────────────────────────────────────────────────
function StatBadge({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <span className="text-2xl font-extrabold" style={{ color }}>{value}</span>
      <span className="text-xs text-muted-foreground text-center leading-tight">{label}</span>
    </div>
  );
}

// ─── Feature item ─────────────────────────────────────────────────────────────
function FeatureItem({
  icon: Icon,
  label,
  accent,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 group"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
        style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
      >
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
    </motion.div>
  );
}

// ─── Main sector card ─────────────────────────────────────────────────────────
function SectorCard({
  sector,
  onOpenModal,
}: {
  sector: Sector;
  onOpenModal: (s: Sector) => void;
}) {
  const isVarejo = sector === "varejo";
  const accent = isVarejo ? "#E57C1F" : "#0F9AA8";
  const accentDark = isVarejo ? "#C4651A" : "#0A7A85";
  const features = isVarejo ? varejoFeatures : saudeFeatures;

  const card = {
    varejo: {
      eyebrow: "Setor de Varejo & Supermercados",
      headline: "Seu concorrente já tem sistema. E você?",
      sub: "Construo plataformas que conectam caixa, estoque e fornecedor num ecossistema único — e que geram dados reais para você decidir com segurança.",
      stats: [
        { value: "3×", label: "Mais velocidade no checkout" },
        { value: "40%", label: "Redução de ruptura de estoque" },
        { value: "100%", label: "Visibilidade de pedidos" },
      ],
      cta: "Quero modernizar meu varejo →",
      urgency: "Supermercados com tecnologia vendem 34% mais. O próximo pode ser o seu.",
    },
    saude: {
      eyebrow: "Setor de Saúde & Hospitalar",
      headline: "Cada minuto perdido é uma vida em jogo.",
      sub: "Desenvolvo sistemas hospitalares que agilizam atendimentos, eliminam filas e entregam informação precisa para quem salva vidas.",
      stats: [
        { value: "60%", label: "Menos erros de prontuário" },
        { value: "3×", label: "Mais agendamentos digitais" },
        { value: "100%", label: "Conformidade LGPD/ANS" },
      ],
      cta: "Quero modernizar minha clínica →",
      urgency: "Hospitais digitais reduzem erros críticos em 60%. Quando vai ser a sua vez?",
    },
  }[sector];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden bg-card/40 backdrop-blur-sm border transition-all duration-500 hover:shadow-2xl"
      style={{
        borderColor: `${accent}28`,
        boxShadow: inView ? `0 15px 40px -15px ${accent}20` : "none",
      }}
    >
      {/* Vertical accent strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: `linear-gradient(to bottom, ${accent}, ${accentDark}40)` }}
      />

      {/* Subtle corner glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="pl-7 pr-6 py-8 md:py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* ── LEFT: copy ── */}
          <div className="space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: `${accent}20` }}
              >
                {isVarejo ? (
                  <ShoppingCart className="h-3.5 w-3.5" style={{ color: accent }} />
                ) : (
                  <HeartPulse className="h-3.5 w-3.5" style={{ color: accent }} />
                )}
              </div>
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: accent }}
              >
                {card.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {card.headline}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-lg">
                {card.sub}
              </p>
            </div>

            {/* Stats row */}
            <div
              className="flex gap-6 py-5 px-5 rounded-xl justify-between"
              style={{ background: `${accent}09`, border: `1px solid ${accent}18` }}
            >
              {card.stats.map((s) => (
                <StatBadge key={s.label} value={s.value} label={s.label} color={accent} />
              ))}
            </div>

            {/* Urgency line */}
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: accent }} />
              <p className="text-xs text-muted-foreground/60 italic">{card.urgency}</p>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenModal(sector)}
              className="group flex items-center gap-3 px-6 h-12 rounded-xl font-bold text-sm text-white transition-all duration-200 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
                boxShadow: `0 4px 20px ${accent}35`,
              }}
            >
              {card.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* ── RIGHT: features list ── */}
          <div className="space-y-3 lg:border-l lg:border-border/40 lg:pl-8">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-5">
              O que eu construo para este setor
            </p>
            <div className="space-y-3.5">
              {features.map((f, i) => (
                <FeatureItem
                  key={f.label}
                  icon={f.icon}
                  label={f.label}
                  accent={accent}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function SectorCardsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSector, setActiveSector] = useState<Sector | null>(null);

  const openModal = (s: Sector) => {
    setActiveSector(s);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section id="setores" className="py-24 relative overflow-hidden">
        {/* Subtle background noise */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,124,31,0.04)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(15,107,117,0.05)_0%,transparent_60%)]" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 max-w-3xl mx-auto"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Setores de Atuação
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Full Stack Developer{" "}
                <span className="text-muted-foreground/30">|</span>{" "}
                <span style={{ color: "#E57C1F" }}>Varejo</span>{" "}
                <span className="text-muted-foreground/30">•</span>{" "}
                <span style={{ color: "#0F9AA8" }}>Saúde</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Não sou um desenvolvedor genérico. Conheço a dor de cada setor e
                construo software que resolve problemas reais de quem opera no chão de fábrica.
              </p>
            </motion.div>

            {/* Cards */}
            <div className="space-y-8">
              <SectorCard sector="varejo" onOpenModal={openModal} />
              <SectorCard sector="saude" onOpenModal={openModal} />
            </div>
          </div>
        </div>
      </section>

      <BudgetModal
        isOpen={modalOpen}
        sector={activeSector}
        onClose={closeModal}
      />
    </>
  );
}
