/** Canvas confetti + CSS particle bursts. Celebration only on feedback/results screens. */

import { useEffect, useRef } from 'react';

const COLORS = ['#ffd166', '#4ade80', '#7dd3fc', '#f9a8d4', '#c4b5fd', '#fb7185'];

export function Confetti({ trigger, big = false }: { trigger: number; big?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (trigger === 0) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = big ? 130 : 55;
    const parts = Array.from({ length: count }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.55,
      y: big ? canvas.height * 0.35 : canvas.height * 0.55,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 11 - 4,
      w: 7 + Math.random() * 7,
      h: 5 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.32;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - frame / 110);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (frame < 115) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, big]);

  return <canvas ref={ref} className="confetti-layer" />;
}

/** Small particle burst attached to an element (CSS-driven). */
export function MiniBurst({ trigger }: { trigger: number }) {
  if (trigger === 0) return null;
  return (
    <span className="burst" key={trigger}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 36 + Math.random() * 22;
        return (
          <span
            key={i}
            className="burst-bit"
            style={{
              background: COLORS[i % COLORS.length],
              ['--dx' as string]: `${Math.cos(angle) * dist}px`,
              ['--dy' as string]: `${Math.sin(angle) * dist}px`,
            }}
          />
        );
      })}
    </span>
  );
}
