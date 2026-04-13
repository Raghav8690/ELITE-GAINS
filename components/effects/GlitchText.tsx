"use client";

import { useRef, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "div";
  triggerOnView?: boolean;
}

export default function GlitchText({ text, className = "", as: Tag = "span", triggerOnView = true }: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!triggerOnView || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("glitch-active");
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView]);

  return (
    <Tag
      ref={ref as any}
      className={`glitch-text ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
