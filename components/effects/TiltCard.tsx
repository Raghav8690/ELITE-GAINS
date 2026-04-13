"use client";

import { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function TiltCard({ children, className = "", maxTilt = 8, glare = true }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
  });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, transform: "rotate(0deg)" });

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
    });

    if (glare) {
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
      const intensity = Math.min(Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) / Math.max(centerX, centerY), 1);
      setGlareStyle({
        opacity: intensity * 0.15,
        transform: `rotate(${angle}deg)`,
      });
    }
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    });
    setGlareStyle({ opacity: 0, transform: "rotate(0deg)" });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        transition: "transform 0.4s cubic-bezier(0.03,0.98,0.52,0.99)",
        willChange: "transform",
      }}
    >
      {children}
      {/* Glare overlay */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
          style={{
            background: "linear-gradient(180deg, rgba(255,193,7,0.3) 0%, rgba(255,193,7,0) 60%)",
            opacity: glareStyle.opacity,
            transform: glareStyle.transform,
            transition: "opacity 0.4s, transform 0.4s",
          }}
        />
      )}
    </div>
  );
}
