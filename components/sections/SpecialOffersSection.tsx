"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCountdown } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/data";

// Target: 7 days from now (recalculates on mount)
function getTargetDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="countdown-unit w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-sm relative overflow-hidden">
        <span className="font-heading text-3xl md:text-4xl text-yellow-500 leading-none relative z-10">
          {String(value).padStart(2, "0")}
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent" />
      </div>
      <span className="text-white/40 text-xs tracking-widest uppercase mt-2">{label}</span>
    </div>
  );
}

export default function SpecialOffersSection() {
  const [target] = useState(getTargetDate);
  const [countdown, setCountdown] = useState(getCountdown(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <section id="offers" className="relative py-24 overflow-hidden bg-dark-800">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #ffc107 0px, #ffc107 1px, transparent 1px, transparent 40px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Glow orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-500/20 blur-[80px] pointer-events-none"
      />

      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-yellow-500/40 bg-yellow-500/10 px-4 py-2 mb-8"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"
            />
            <span className="section-tag">LIMITED TIME OFFER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-white mb-4"
          >
            FOUNDER'S<br />
            <span className="text-yellow-500">MEMBERSHIP</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg mb-4 leading-relaxed"
          >
            Join our inner circle. Lock in{" "}
            <span className="text-yellow-500 font-bold">40% OFF FOR LIFE</span> and get
            exclusive VIP benefits available only for the first 500 members.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-sm mb-10"
          >
            ⚡ Only{" "}
            <span className="text-yellow-500 font-semibold">47 spots remaining</span> at
            this price
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 md:gap-6 mb-12"
          >
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="font-heading text-yellow-500 text-3xl mb-5">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="font-heading text-yellow-500 text-3xl mb-5">:</span>
            <CountdownUnit value={countdown.minutes} label="Minutes" />
            <span className="font-heading text-yellow-500 text-3xl mb-5">:</span>
            <CountdownUnit value={countdown.seconds} label="Seconds" />
          </motion.div>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=I%20want%20to%20claim%20the%20Founder's%20Membership%20offer`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center gap-2 animate-glow-pulse text-base"
          >
            <span>CLAIM MY FOUNDER'S SPOT →</span>
          </motion.a>

          <p className="text-white/25 text-xs mt-4">
            No commitment required. Cancel anytime. Offer ends when spots fill.
          </p>
        </div>
      </div>
    </section>
  );
}
