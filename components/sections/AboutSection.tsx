"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Image from "next/image";
import gsap from "gsap";
import { STATS } from "@/lib/data";
import { Zap, Shield, Trophy, Users } from "lucide-react";
import TiltCard from "@/components/effects/TiltCard";
import TextReveal from "@/components/effects/TextReveal";

const PILLARS = [
  { icon: Zap, title: "Elite Equipment", desc: "500+ pieces of commercial-grade equipment from leading brands" },
  { icon: Shield, title: "Expert Coaching", desc: "NSCA and ACE certified trainers with proven track records" },
  { icon: Trophy, title: "Results Driven", desc: "Personalised programs engineered for maximum performance gains" },
  { icon: Users, title: "Community", desc: "A tribe of like-minded athletes pushing each other every day" },
];

function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <TiltCard maxTilt={6}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-glass rounded-sm p-6 text-center border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-500 group card-shine"
      >
        <div className="font-heading text-5xl md:text-6xl text-yellow-500 leading-none mb-2 group-hover:glow-yellow-text transition-all">
          {inView ? (
            <CountUp
              end={stat.value}
              duration={2.5}
              separator=","
              suffix={stat.suffix}
              useEasing
            />
          ) : (
            "0"
          )}
        </div>
        <div className="text-white/50 text-sm tracking-widest uppercase">{stat.label}</div>
      </motion.div>
    </TiltCard>
  );
}

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!borderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            borderRef.current,
            { clipPath: "inset(100% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.out" }
          );
        }
      },
      { threshold: 0.3 }
    );
    if (imageRef.current) observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32 bg-dark-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 animated-divider" />
      <div className="absolute -left-48 top-1/3 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none glow-orb" />
      <div className="absolute -right-48 bottom-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none glow-orb-delay" />

      {/* Decorative kettlebell */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        viewport={{ once: true }}
        className="absolute top-20 right-10 hidden xl:block kettlebell-swing"
      >
        <svg width="60" height="80" viewBox="0 0 60 80" fill="#ffc107">
          <circle cx="30" cy="15" r="12" fill="none" stroke="#ffc107" strokeWidth="4"/>
          <ellipse cx="30" cy="55" rx="25" ry="22"/>
        </svg>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about-gym.jpg"
                alt="One Rep Max Gym Interior"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Scanning line effect */}
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", damping: 15 }}
              className="absolute -bottom-6 -right-6 bg-yellow-500 p-6 hidden md:block shadow-[0_0_40px_rgba(255,193,7,0.3)]"
            >
              <div className="font-heading text-black text-center">
                <div className="text-5xl leading-none">12</div>
                <div className="text-xs tracking-widest mt-1">YEARS OF<br />EXCELLENCE</div>
              </div>
            </motion.div>
            {/* Animated border accent */}
            <div
              ref={borderRef}
              className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-yellow-500/50 pointer-events-none"
              style={{ clipPath: "inset(100% 100% 0% 0%)" }}
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-[1px] bg-yellow-500"
              />
              <span className="section-tag">OUR STORY</span>
            </div>

            <TextReveal
              as="h2"
              className="font-heading text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-white mb-6"
              splitBy="words"
              delay={0.2}
            >
              WHERE LEGENDS ARE FORGED
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/60 mb-5 leading-relaxed"
            >
              One Rep Max was founded in 2012 with a singular vision: to create the most
              advanced training facility available to serious athletes and fitness enthusiasts.
              We didn't build a gym — we built an engine for transformation.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-white/60 mb-8 leading-relaxed"
            >
              Every inch of our facility is engineered for performance. From Olympic lifting
              platforms to a state-of-the-art recovery suite, everything here exists to push
              you past what you thought was possible.
            </motion.p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-3 rounded-sm hover:bg-yellow-500/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-all">
                      <Icon size={13} className="text-yellow-500" />
                    </div>
                    <span className="font-semibold text-sm text-white">{title}</span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed pl-9">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 animated-divider" />
    </section>
  );
}
