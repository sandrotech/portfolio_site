"use client";

import { ReactNode } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { Navigation } from "./navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden text-white">
            {/* Fundo de partículas "black hole" */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "#000" } },
                    fpsLimit: 60,
                    particles: {
                        color: { value: "#ffffff" },
                        links: { enable: false },
                        move: {
                            enable: true,
                            speed: 0.3,
                            direction: "none",
                            random: true,
                            straight: false,
                            outModes: "out",
                        },
                        number: { value: 60 },
                        opacity: { value: 0.3 },
                        shape: { type: "circle" },
                        size: { value: { min: 1, max: 3 } },
                    },
                    detectRetina: true,
                }}
                className="absolute inset-0 z-0"
            />

            {/* Gradiente central do buraco negro */}
            <div className="absolute inset-0 bg-gradient-radial from-[#000010] via-black to-[#020202] z-0" />
            <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-800/20 via-black to-transparent blur-3xl animate-pulse-slow z-0" />

            {/* Conteúdo principal */}
            <motion.main
                className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
            >
                {children}
            </motion.main>

            {/* Menu flutuante circular */}
            <Navigation />
        </div>
    );
}
