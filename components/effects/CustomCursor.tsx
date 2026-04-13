"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const handleInteractiveEnter = () => setIsHovering(true);
    const handleInteractiveLeave = () => setIsHovering(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // Smooth ring follow
    let raf: number;
    const followRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        const size = isHovering ? 50 : 32;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      raf = requestAnimationFrame(followRing);
    };
    followRing();

    // Attach hover events to interactive elements
    const updateInteractives = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select, .cursor-hover");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleInteractiveEnter);
        el.addEventListener("mouseleave", handleInteractiveLeave);
      });
      return interactives;
    };

    const interactives = updateInteractives();
    const observer = new MutationObserver(() => updateInteractives());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(raf);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleInteractiveEnter);
        el.removeEventListener("mouseleave", handleInteractiveLeave);
      });
    };
  }, [isHovering]);

  if (isMobile) return null;

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#ffc107",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          width: isHovering ? 50 : 32,
          height: isHovering ? 50 : 32,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "#ffc107" : "rgba(255,193,7,0.4)"}`,
          backgroundColor: isHovering ? "rgba(255,193,7,0.08)" : "transparent",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, background-color 0.3s, opacity 0.3s",
        }}
      />
    </>
  );
}
