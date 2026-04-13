"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-yellow-500/15 py-3 shadow-[0_4px_30px_rgba(255,193,7,0.05)]"
            : "bg-transparent py-5"
        }`}
      >
        {/* Animated top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center relative overflow-hidden">
                <span className="font-heading text-black text-lg leading-none relative z-10">ORM</span>
                {/* Shine sweep on logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              <motion.div
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 bg-yellow-500/30 blur-lg"
              />
            </div>
            <span className="font-heading text-xl tracking-widest text-white">
              One <span className="text-yellow-500 glow-yellow-text">Rep Max</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4 + i * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className={`nav-link font-body font-500 text-sm tracking-widest uppercase transition-colors duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-yellow-500 active"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${SITE_CONFIG.whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm py-2.5 px-5"
            >
              <span>WhatsApp</span>
            </motion.a>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9 }}
              onClick={() => scrollToSection("#contact")}
              className="btn-glow text-sm py-2.5 px-5 energy-pulse"
            >
              <span>JOIN NOW</span>
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-500 blur-[100px]" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-yellow-500 blur-[80px]" />
            </div>

            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => scrollToSection(link.href)}
                className="font-heading text-4xl tracking-widest text-white hover:text-yellow-500 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-yellow-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08 + 0.1 }}
              onClick={() => scrollToSection("#contact")}
              className="btn-glow mt-4"
            >
              <span>JOIN NOW</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
