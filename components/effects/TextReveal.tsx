"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: "words" | "chars";
  animateFrom?: "bottom" | "left" | "right";
  once?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  splitBy = "words",
  animateFrom = "bottom",
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text
    const text = children;
    const parts = splitBy === "chars" ? text.split("") : text.split(" ");
    container.innerHTML = "";

    parts.forEach((part, i) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = part + (splitBy === "words" && i < parts.length - 1 ? "\u00A0" : "");
      inner.classList.add("text-reveal-char");

      // Initial state
      if (animateFrom === "bottom") {
        inner.style.transform = "translateY(110%)";
      } else if (animateFrom === "left") {
        inner.style.transform = "translateX(-110%)";
      } else {
        inner.style.transform = "translateX(110%)";
      }
      inner.style.opacity = "0";

      wrapper.appendChild(inner);
      container.appendChild(wrapper);
    });

    const chars = container.querySelectorAll(".text-reveal-char");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          hasAnimated.current = true;
          gsap.to(chars, {
            y: animateFrom === "bottom" ? 0 : undefined,
            x: animateFrom !== "bottom" ? 0 : undefined,
            opacity: 1,
            duration,
            stagger,
            delay,
            ease: "power3.out",
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [children, delay, duration, stagger, splitBy, animateFrom, once]);

  return <Tag ref={containerRef as any} className={className} />;
}
