"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let current = 0;
    const increment = () => {
      const speed = current < 60 ? 3 : current < 85 ? 2 : 1;
      current = Math.min(current + speed, 100);
      setProgress(current);
      if (current < 100) {
        setTimeout(increment, 30 + Math.random() * 20);
      } else {
        setTimeout(() => setIsComplete(true), 400);
        setTimeout(() => setIsVisible(false), 1200);
      }
    };
    setTimeout(increment, 200);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="loader"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,193,7,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,193,7,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Pulsing glow behind logo */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-64 h-64 rounded-full bg-yellow-500/20 blur-[80px]"
          />

          {/* Rotating rings */}
          <div className="relative w-36 h-36 mb-8">
            {/* Outer ring - slow */}
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 140 140"
            >
              <circle
                cx="70" cy="70" r="65"
                fill="none"
                stroke="rgba(255,193,7,0.1)"
                strokeWidth="1"
              />
              <circle
                cx="70" cy="70" r="65"
                fill="none"
                stroke="#ffc107"
                strokeWidth="2"
                strokeDasharray="40 70"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* Inner ring - fast, reverse */}
            <motion.svg
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="rgba(255,193,7,0.08)"
                strokeWidth="1"
              />
              <circle
                ref={ringRef}
                cx="50" cy="50" r="45"
                fill="none"
                stroke="#ffc107"
                strokeWidth="1.5"
                strokeDasharray={`${progress * 2.83} 283`}
                strokeLinecap="round"
                className="transition-all duration-100"
              />
            </motion.svg>

            {/* Center: Dumbbell icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", damping: 15 }}
                width="40" height="40" viewBox="0 0 48 48" fill="none"
              >
                {/* Dumbbell */}
                <rect x="6" y="18" width="6" height="12" rx="1" fill="#ffc107"/>
                <rect x="12" y="14" width="4" height="20" rx="1" fill="#ffc107"/>
                <rect x="16" y="22" width="16" height="4" rx="1" fill="#ffc107" opacity="0.7"/>
                <rect x="32" y="14" width="4" height="20" rx="1" fill="#ffc107"/>
                <rect x="36" y="18" width="6" height="12" rx="1" fill="#ffc107"/>
              </motion.svg>
            </div>
          </div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <span className="font-heading text-3xl tracking-[0.3em] text-white">
              ONE<span className="text-yellow-500">REP</span>MAX
            </span>
          </motion.div>

          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-yellow-500/50" />
            <span className="font-heading text-yellow-500 text-2xl tracking-widest tabular-nums">
              {progress}%
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-yellow-500/50" />
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/30 text-xs tracking-[0.4em] uppercase mt-4"
          >
            Loading Experience
          </motion.p>

          {/* Bottom energy line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-dark-700 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
