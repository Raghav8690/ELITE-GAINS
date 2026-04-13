"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "dot" | "dumbbell" | "ring";
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Create particles with gym themes
    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      type: Math.random() > 0.85 ? "dumbbell" : Math.random() > 0.7 ? "ring" : "dot",
    }));

    const drawDumbbell = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity * 0.6;
      ctx.strokeStyle = "#ffc107";
      ctx.lineWidth = size * 0.3;
      ctx.lineCap = "round";
      // Bar
      ctx.beginPath();
      ctx.moveTo(x - size * 2, y);
      ctx.lineTo(x + size * 2, y);
      ctx.stroke();
      // Left weight
      ctx.fillStyle = "#ffc107";
      ctx.fillRect(x - size * 2.5, y - size, size * 0.8, size * 2);
      // Right weight
      ctx.fillRect(x + size * 1.7, y - size, size * 0.8, size * 2);
      ctx.restore();
    };

    const drawRing = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity * 0.4;
      ctx.strokeStyle = "#ffc107";
      ctx.lineWidth = size * 0.25;
      ctx.beginPath();
      ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 193, 7, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Draw based on type
        if (p.type === "dumbbell") {
          drawDumbbell(ctx, p.x, p.y, p.size, p.opacity);
        } else if (p.type === "ring") {
          drawRing(ctx, p.x, p.y, p.size, p.opacity);
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 193, 7, ${p.opacity})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
