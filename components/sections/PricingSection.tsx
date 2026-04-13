"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { PRICING_PLANS } from "@/lib/data";
import TiltCard from "@/components/effects/TiltCard";
import TextReveal from "@/components/effects/TextReveal";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500/4 blur-[120px] pointer-events-none glow-orb" />

      {/* Hex grid decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23ffc107' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: "56px 100px",
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              className="h-[1px] bg-yellow-500"
            />
            <span className="section-tag">MEMBERSHIP PLANS</span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              className="h-[1px] bg-yellow-500"
            />
          </motion.div>

          <TextReveal
            as="h2"
            className="font-heading text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-white"
            splitBy="words"
          >
            CHOOSE YOUR POWER
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/50 mt-4 max-w-lg mx-auto"
          >
            High-performance plans designed for athletes who demand the absolute best
            from their training environment.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={`text-sm font-semibold transition-colors duration-300 ${!isYearly ? "text-white" : "text-white/40"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                isYearly ? "bg-yellow-500 shadow-[0_0_20px_rgba(255,193,7,0.3)]" : "bg-white/20"
              }`}
            >
              <motion.span
                animate={{ x: isYearly ? "calc(100% + 4px)" : "4px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-white block"
              />
            </button>
            <span className={`text-sm font-semibold transition-colors duration-300 ${isYearly ? "text-white" : "text-white/40"}`}>
              Yearly
            </span>
            {isYearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 font-semibold border border-yellow-500/30"
              >
                SAVE ~20%
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={plan.popular ? 5 : 4}>
                <div
                  className={`pricing-card relative card-shine ${
                    plan.popular
                      ? "border-2 border-yellow-500 bg-dark-600 shadow-[0_0_40px_rgba(255,193,7,0.1)]"
                      : "border border-white/10 bg-dark-700"
                  } p-8`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-yellow-500 text-black px-4 py-1 text-xs font-heading tracking-widest whitespace-nowrap shimmer-line">
                      <Zap size={10} />
                      MOST POPULAR
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="mb-6">
                    <div className={`inline-block px-3 py-1 text-xs tracking-widest font-semibold mb-3 ${
                      plan.popular ? "bg-yellow-500/20 text-yellow-500" : "bg-white/5 text-white/50"
                    }`}>
                      {plan.name}
                    </div>
                    <div className="flex items-end gap-1 mb-2">
                      <span className="font-heading text-6xl text-white leading-none">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-white/40 mb-2">/mo</span>
                    </div>
                    {isYearly && (
                      <div className="text-yellow-500/70 text-xs">
                        Billed ${plan.yearlyPrice * 12}/year
                      </div>
                    )}
                    <p className="text-white/40 text-sm mt-3 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fi) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + fi * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check
                          size={14}
                          className={`mt-0.5 flex-shrink-0 ${
                            plan.popular ? "text-yellow-500" : "text-white/40"
                          }`}
                        />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {plan.popular ? (
                    <button className="btn-glow w-full text-sm energy-pulse">
                      <span>{plan.cta}</span>
                    </button>
                  ) : (
                    <button className="btn-outline w-full text-sm">
                      {plan.cta}
                    </button>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
