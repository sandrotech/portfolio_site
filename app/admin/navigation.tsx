"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Mail, LogOut } from "lucide-react";
import Link from "next/link";

export function Navigation() {
    const [open, setOpen] = useState(false);
    const [radius, setRadius] = useState(95);
    const [position, setPosition] = useState({
        bottom: "5%",
        left: "5%",
        transform: "",
    });

    // 🔧 Responsividade dinâmica
    useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;

            if (width < 480) {
                // Smartphones
                setRadius(65);
                setPosition({ bottom: "8%", left: "50%", transform: "translateX(-50%)" });
            } else if (width < 1024) {
                // Tablets
                setRadius(85);
                setPosition({ bottom: "8%", left: "8%", transform: "" });
            } else if (width < 1536) {
                // Notebooks
                setRadius(105);
                setPosition({ bottom: "10%", left: "6%", transform: "" });
            } else {
                // TVs ou telas grandes
                setRadius(130);
                setPosition({ bottom: "12%", left: "6%", transform: "" });
            }
        };

        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    const items = [
        { icon: <Home size={24} />, label: "Projetos", href: "/admin/projects" },
        { icon: <Mail size={24} />, label: "Mensagens", href: "/admin/messages" },
        { icon: <LogOut size={24} />, label: "Sair", href: "/api/logout" },
    ];

    return (
        <div
            className="fixed z-[9999] flex items-center justify-center"
            style={{
                bottom: position.bottom,
                left: position.left,
                transform: position.transform,
            }}
        >
            {/* Ícones orbitais */}
            <AnimatePresence>
                {open &&
                    items.map((item, index) => {
                        const angle = (index / items.length) * 2 * Math.PI;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: Math.cos(angle) * radius,
                                    y: Math.sin(angle) * -radius,
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    mass: 0.8,
                                }}
                                className="absolute flex items-center justify-center"
                            >
                                <Link
                                    href={item.href}
                                    className="
                    w-12 h-12 md:w-14 md:h-14 
                    flex items-center justify-center rounded-full 
                    bg-black/40 border border-white/10 backdrop-blur-md 
                    text-white hover:bg-white/10 hover:scale-110 
                    transition-all shadow-[0_0_15px_rgba(80,80,255,0.35)]
                    active:scale-95
                  "
                                >
                                    {item.icon}
                                </Link>
                            </motion.div>
                        );
                    })}
            </AnimatePresence>

            {/* Botão central */}
            <motion.button
                onClick={() => setOpen(!open)}
                animate={{ rotate: open ? 360 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="
          relative flex items-center justify-center 
          rounded-full text-white overflow-hidden 
          shadow-[0_0_40px_rgba(100,100,255,0.7)]
          hover:shadow-[0_0_55px_rgba(140,100,255,1)] 
          border border-white/10 transition-all
          w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20
          bg-gradient-to-br from-blue-600 to-purple-700
        "
            >
                {/* Aura animada */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-lg opacity-70 bg-gradient-to-br from-blue-500 to-purple-500"
                    animate={{ rotate: open ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                />

                {/* Núcleo */}
                <span className="relative z-10 font-bold text-xl select-none">⭘</span>
            </motion.button>
        </div>
    );
}
