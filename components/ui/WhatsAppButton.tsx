"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${SITE_CONFIG.whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, type: "spring", damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="whatsapp-float fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-black/40"
    >
      {/* WhatsApp SVG */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.087.536 4.049 1.477 5.756L0 24l6.435-1.453A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.822 0-3.53-.487-4.996-1.338l-.357-.213-3.713.839.838-3.619-.232-.369A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>

      {/* Tooltip */}
      <div className="absolute right-16 bg-dark-700 text-white text-xs whitespace-nowrap px-3 py-1.5 border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
        Chat with us!
      </div>
    </motion.a>
  );
}
