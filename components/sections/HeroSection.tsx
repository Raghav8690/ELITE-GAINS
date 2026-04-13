"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { SITE_CONFIG } from "@/lib/data";
import GlitchText from "@/components/effects/GlitchText";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const tl = gsap.timeline({ delay: 2 });

    // Animate heading words
    const words = headingRef.current.querySelectorAll(".hero-word");
    tl.fromTo(
      words,
      { y: 120, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
    );

    // Animate sub elements
    tl.fromTo(
      ".hero-sub",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    );

    tl.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );

    tl.fromTo(
      ".hero-stat",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );

    // Parallax on scroll
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const bg = sectionRef.current.querySelector(".hero-bg") as HTMLElement;
      if (bg) {
        bg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg absolute inset-0 will-change-transform" style={{ transform: "scale(1.1)" }}>
          <Image
            src="/images/hero-bg.jpg"
            alt="One Rep Max Gym"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />

        {/* Animated vertical lines */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 w-[1px] h-full bg-yellow-500"
              style={{ left: `${12.5 * (i + 1)}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2.5 + i * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="max-w-3xl">
          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex items-center gap-3 mb-6 overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="h-[1px] bg-yellow-500"
            />
            <span className="section-tag whitespace-nowrap">ELITE PERFORMANCE TRAINING</span>
          </motion.div>

          {/* Main Heading - GSAP animated */}
          <div ref={headingRef} className="font-heading text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-wide text-white mb-4" style={{ perspective: "600px" }}>
            <div className="overflow-hidden">
              <span className="hero-word inline-block opacity-0">PUSH</span>
            </div>
            <div className="overflow-hidden">
              <GlitchText
                text="BEYOND"
                className="hero-word inline-block opacity-0 text-yellow-500 glow-yellow-text"
              />
            </div>
            <div className="overflow-hidden">
              <span className="hero-word inline-block opacity-0">YOUR LIMITS</span>
            </div>
          </div>

          {/* Sub */}
          <p className="hero-sub opacity-0 text-white/60 text-lg max-w-lg mb-10 leading-relaxed">
            {SITE_CONFIG.subTagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hero-cta opacity-0 btn-glow animate-glow-pulse text-base"
            >
              <span>JOIN NOW</span>
            </button>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${SITE_CONFIG.whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta opacity-0 btn-outline flex items-center gap-2 text-base"
            >
              {/* WhatsApp Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.087.536 4.049 1.477 5.756L0 24l6.435-1.453A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.822 0-3.53-.487-4.996-1.338l-.357-.213-3.713.839.838-3.619-.232-.369A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WHATSAPP CHAT
            </a>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="flex gap-8 mt-16 pt-8 border-t border-white/10">
            {[
              { num: "12+", label: "Years" },
              { num: "3.5K+", label: "Members" },
              { num: "25+", label: "Trainers" },
            ].map(({ num, label }) => (
              <div key={label} className="hero-stat opacity-0">
                <div className="font-heading text-3xl text-yellow-500 glow-yellow-text">{num}</div>
                <div className="text-white/40 text-xs tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-yellow-500/60 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
            className="absolute top-0 w-full h-1/3 bg-yellow-500"
          />
        </div>
      </motion.div>

      {/* Decorative floating gym elements */}
      <div className="absolute top-24 right-8 md:right-16 z-10 hidden md:block">
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 45 }}
          transition={{ delay: 3, duration: 0.8, ease: "backOut" }}
          className="w-24 h-24 border border-yellow-500/20 relative"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 border border-yellow-500/10"
          />
        </motion.div>
      </div>

      {/* Floating dumbbell decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ delay: 3 }}
        className="absolute bottom-32 right-20 hidden lg:block animate-float"
      >
        <svg width="120" height="50" viewBox="0 0 120 50" fill="#ffc107">
          <rect x="0" y="12" width="15" height="26" rx="3"/>
          <rect x="15" y="8" width="8" height="34" rx="2"/>
          <rect x="23" y="21" width="74" height="8" rx="2"/>
          <rect x="97" y="8" width="8" height="34" rx="2"/>
          <rect x="105" y="12" width="15" height="26" rx="3"/>
        </svg>
      </motion.div>
    </section>
  );
}
