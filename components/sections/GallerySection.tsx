"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { GALLERY_IMAGES } from "@/lib/data";

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = GALLERY_IMAGES.map((img) => ({
    src: img.src,
    alt: img.alt,
  }));

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-dark-800">
      <div className="absolute top-0 left-0 right-0 h-px section-divider opacity-30" />

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
            <span className="section-tag">OUR FACILITY</span>
            <div className="h-[1px] w-10 bg-yellow-500" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-white"
          >
            GYM <span className="text-yellow-500">GALLERY</span>
          </motion.h2>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
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
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 border-2 border-yellow-500 flex items-center justify-center mx-auto mb-2">
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
                    <span className="text-white text-xs tracking-widest">{img.alt}</span>
                  </div>
                </div>
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
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider opacity-30" />
    </section>
  );
}
