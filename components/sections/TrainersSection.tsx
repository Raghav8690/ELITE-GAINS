"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Award, Clock, DollarSign } from "lucide-react";
import { TRAINERS } from "@/lib/data";
import type { Trainer } from "@/types";
import { SITE_CONFIG } from "@/lib/data";

function TrainerCard({ trainer, onClick }: { trainer: Trainer; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="trainer-card relative group cursor-pointer overflow-hidden bg-dark-700 border border-white/5 hover:border-yellow-500/30 transition-all duration-500"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          className="trainer-img object-cover object-top transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Hover overlay */}
        <div className="trainer-overlay absolute inset-0 bg-yellow-500/10 opacity-0 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-yellow-500 text-black font-heading tracking-widest text-sm px-4 py-2">
            VIEW PROFILE
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="text-yellow-500 text-xs tracking-widest uppercase font-semibold mb-1">
          {trainer.specialty}
        </div>
        <h3 className="font-heading text-2xl text-white mb-2">{trainer.name}</h3>
        <div className="flex items-center justify-between text-white/40 text-xs">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {trainer.experience}
          </span>
          <span className="flex items-center gap-1 text-yellow-500/70">
            <DollarSign size={11} />
            {trainer.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function TrainerModal({ trainer, onClose }: { trainer: Trainer; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-dark-700 border border-yellow-500/20 max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-2/5 aspect-square md:aspect-auto">
            <Image
              src={trainer.image}
              alt={trainer.name}
              fill
              className="object-cover object-top"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-700/50 hidden md:block" />
          </div>

          {/* Content */}
          <div className="flex-1 p-8 relative">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-yellow-500 text-xs tracking-widest uppercase font-semibold mb-2">
              {trainer.specialty}
            </div>
            <h2 className="font-heading text-4xl text-white mb-1">{trainer.name}</h2>

            <div className="flex gap-4 mb-5 text-sm">
              <span className="text-white/40 flex items-center gap-1">
                <Clock size={13} />
                {trainer.experience}
              </span>
              <span className="text-yellow-500 flex items-center gap-1">
                <DollarSign size={13} />
                {trainer.price}
              </span>
            </div>

            <div className="h-px bg-white/10 mb-5" />

            <p className="text-white/60 text-sm leading-relaxed mb-6">{trainer.bio}</p>

            {/* Certifications */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Award size={14} className="text-yellow-500" />
                <span className="text-xs tracking-widest uppercase text-white/50">
                  Certifications
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trainer.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-3 py-1"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Book */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=I%20want%20to%20book%20a%20session%20with%20${encodeURIComponent(trainer.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-block text-sm"
            >
              <span>BOOK SESSION</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TrainersSection() {
  const [selected, setSelected] = useState<Trainer | null>(null);

  return (
    <section id="trainers" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-[1px] w-10 bg-yellow-500" />
            <span className="section-tag">EXPERT TEAM</span>
            <div className="h-[1px] w-10 bg-yellow-500" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-white"
          >
            MEET THE <span className="text-yellow-500">PROFESSIONALS</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRAINERS.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              onClick={() => setSelected(trainer)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <TrainerModal trainer={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
