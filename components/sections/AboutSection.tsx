"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Image from "next/image";
import { STATS } from "@/lib/data";
import { Zap, Shield, Trophy, Users } from "lucide-react";

const PILLARS = [
  { icon: Zap, title: "Elite Equipment", desc: "500+ pieces of commercial-grade equipment from leading brands" },
  { icon: Shield, title: "Expert Coaching", desc: "NSCA and ACE certified trainers with proven track records" },
  { icon: Trophy, title: "Results Driven", desc: "Personalised programs engineered for maximum performance gains" },
  { icon: Users, title: "Community", desc: "A tribe of like-minded athletes pushing each other every day" },
];

function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-glass rounded-sm p-6 text-center border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group"
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
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-dark-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px section-divider opacity-30" />
      <div className="absolute -left-48 top-1/3 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-48 bottom-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about-gym.jpg"
                alt="Elite Gains Gym Interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-yellow-500 p-6 hidden md:block"
            >
              <div className="font-heading text-black text-center">
                <div className="text-5xl leading-none">12</div>
                <div className="text-xs tracking-widest mt-1">YEARS OF<br />EXCELLENCE</div>
              </div>
            </motion.div>
            {/* Border accent */}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-yellow-500/50 pointer-events-none" />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-yellow-500" />
              <span className="section-tag">OUR STORY</span>
            </div>
            <h2 className="font-heading text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-white mb-6">
              WHERE LEGENDS<br />
              <span className="text-yellow-500">ARE FORGED</span>
            </h2>
            <p className="text-white/60 mb-5 leading-relaxed">
              Elite Gains was founded in 2012 with a singular vision: to create the most
              advanced training facility available to serious athletes and fitness enthusiasts.
              We didn't build a gym — we built an engine for transformation.
            </p>
            <p className="text-white/60 mb-8 leading-relaxed">
              Every inch of our facility is engineered for performance. From Olympic lifting
              platforms to a state-of-the-art recovery suite, everything here exists to push
              you past what you thought was possible.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className="text-yellow-500" />
                    <span className="font-semibold text-sm text-white">{title}</span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
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

      <div className="absolute bottom-0 left-0 right-0 h-px section-divider opacity-30" />
    </section>
  );
}
