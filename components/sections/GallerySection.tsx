"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { GALLERY_IMAGES } from "@/lib/data";
import TextReveal from "@/components/effects/TextReveal";

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = GALLERY_IMAGES.map((img) => ({
    src: img.src,
    alt: img.alt,
  }));

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-dark-800">
      <div className="absolute top-0 left-0 right-0 animated-divider" />

      {/* Floating weight plate */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 opacity-[0.03] hidden xl:block"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#ffc107" strokeWidth="1.5">
          <circle cx="40" cy="40" r="36"/>
          <circle cx="40" cy="40" r="28"/>
          <circle cx="40" cy="40" r="12"/>
          <circle cx="40" cy="40" r="6" fill="#ffc107"/>
        </svg>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} className="h-[1px] bg-yellow-500" />
            <span className="section-tag">OUR FACILITY</span>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} className="h-[1px] bg-yellow-500" />
          </motion.div>

          <TextReveal
            as="h2"
            className="font-heading text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-white"
            splitBy="words"
          >
            GYM GALLERY
          </TextReveal>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`masonry-item relative overflow-hidden cursor-pointer group ${
                img.span === "tall" ? "row-span-2" : ""
              }`}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <div
                className={`relative overflow-hidden ${
                  img.span === "tall" ? "aspect-[2/3]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

                {/* Glow border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/40 transition-all duration-500 z-10" />

                {/* Content overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
                  <motion.div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-10 h-10 border-2 border-yellow-500 flex items-center justify-center mx-auto mb-2 bg-black/50 backdrop-blur-sm">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffc107"
                        strokeWidth="2"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                    <span className="text-white text-xs tracking-widest bg-black/50 backdrop-blur-sm px-2 py-1">{img.alt}</span>
                  </motion.div>
                </div>

                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ y: [0, 300, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.97)" },
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 animated-divider" />
    </section>
  );
}
