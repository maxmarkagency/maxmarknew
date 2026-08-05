"use client";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
  speedY: number;
  speedX: number;
  oscillationSpeed: number;
  oscillationAmplitude: number;
  oscillationOffset: number;
  color: string;
  life: number;
  maxLife: number;
}

// Brand-matching colour palette — mostly white dust, occasional brand-pink sparks
const COLORS = [
  "255,255,255",   // white      — majority
  "255,255,255",
  "255,255,255",
  "237,60,105",    // #ed3c69    — brand pink
  "255,160,190",   // soft pink
  "200,190,255",   // soft lavender
];

const PARTICLE_COUNT = 220;

function createParticle(
  canvasWidth: number,
  canvasHeight: number,
  startAnywhere = false
): Particle {
  const maxLife = 300 + Math.random() * 400;
  return {
    x: Math.random() * canvasWidth,
    y: startAnywhere
      ? Math.random() * canvasHeight
      : canvasHeight + Math.random() * 120,
    radius: 0.5 + Math.random() * 1.8,
    opacity: 0,
    targetOpacity: 0.05 + Math.random() * 0.09,
    speedY: -(0.15 + Math.random() * 0.4),
    speedX: (Math.random() - 0.5) * 0.15,
    oscillationSpeed: 0.004 + Math.random() * 0.008,
    oscillationAmplitude: 15 + Math.random() * 35,
    oscillationOffset: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 0,
    maxLife,
  };
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

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

    // Seed particles spread across the entire viewport on first load
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height, true)
    );

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, idx) => {
        p.life++;

        // Smooth fade in / fade out
        const progress = p.life / p.maxLife;
        if (progress < 0.12) {
          p.opacity = Math.min(p.opacity + 0.003, p.targetOpacity * (progress / 0.12));
        } else if (progress > 0.75) {
          p.opacity = Math.max(p.opacity - 0.002, 0);
        } else {
          p.opacity = Math.min(p.opacity + 0.004, p.targetOpacity);
        }

        // Move — gentle upward drift with lazy horizontal oscillation
        p.y += p.speedY;
        p.x +=
          p.speedX +
          Math.sin(frameRef.current * p.oscillationSpeed + p.oscillationOffset) * 0.25;

        // Respawn when exhausted or out of view
        if (p.life >= p.maxLife || p.y < -20) {
          particlesRef.current[idx] = createParticle(canvas.width, canvas.height, false);
          return;
        }

        if (p.opacity <= 0) return;

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
        ctx.fill();

        // Soft radial glow halo on larger particles
        if (p.radius > 0.8) {
          const glowRadius = p.radius * 4.5;
          const grd = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, glowRadius
          );
          grd.addColorStop(0, `rgba(${p.color},${p.opacity * 0.28})`);
          grd.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
