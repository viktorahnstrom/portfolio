"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  lineColor?: string;
  bgColor?: string;
  lineCount?: number;
  lineWidth?: number;
  speed?: number;
}

function hash2D(x: number, y: number) {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
}

function noise2D(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const a = hash2D(ix, iy);
  const b = hash2D(ix + 1, iy);
  const c = hash2D(ix, iy + 1);
  const d = hash2D(ix + 1, iy + 1);
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  return a * (1 - sx) * (1 - sy) + b * sx * (1 - sy) + c * (1 - sx) * sy + d * sx * sy;
}

export default function FlowingTopography({
  className = "",
  lineColor = "#F9541D",
  bgColor = "transparent",
  lineCount = 14,
  lineWidth = 1.25,
  speed = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Seed = { x: number; y: number; steps: number; turn: number };
    let seeds: Seed[] = [];

    const seedRng = (n: number) => {
      const v = Math.sin(n * 9301 + 49297) * 233280;
      return v - Math.floor(v);
    };

    const buildSeeds = () => {
      seeds = [];
      for (let i = 0; i < lineCount; i++) {
        seeds.push({
          x: seedRng(i + 1) * width,
          y: seedRng(i + 100) * height,
          steps: 80 + Math.floor(seedRng(i + 200) * 120),
          turn: (seedRng(i + 300) - 0.5) * 0.04,
        });
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSeeds();
    };

    const NOISE_SCALE = 0.0028;
    const STEP = 4;
    const startTime = performance.now();

    const trace = (sx: number, sy: number, steps: number, dir: 1 | -1, turn: number, t: number) => {
      ctx.beginPath();
      let x = sx;
      let y = sy;
      ctx.moveTo(x, y);
      let extraAngle = 0;
      for (let i = 0; i < steps; i++) {
        const n = noise2D(x * NOISE_SCALE + t, y * NOISE_SCALE + t * 0.7);
        const angle = n * Math.PI * 2 + extraAngle;
        x += Math.cos(angle) * STEP * dir;
        y += Math.sin(angle) * STEP * dir;
        if (x < -50 || x > width + 50 || y < -50 || y > height + 50) break;
        ctx.lineTo(x, y);
        extraAngle += turn;
      }
      ctx.stroke();
    };

    const frame = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const t = reduceMotion ? 0 : (time - startTime) * 0.000028 * speed;

      for (const seed of seeds) {
        trace(seed.x, seed.y, seed.steps, 1, seed.turn, t);
        trace(seed.x, seed.y, seed.steps, -1, -seed.turn, t);
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [lineColor, bgColor, lineCount, lineWidth, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
