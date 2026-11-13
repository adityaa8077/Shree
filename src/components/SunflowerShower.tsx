'use client';

import { useEffect, useRef } from 'react';

interface SunflowerShowerProps {
  active: boolean;
}

export default function SunflowerShower({ active }: SunflowerShowerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Sunflower {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      swaySpeed: number;
      swayRange: number;
      swayAngle: number;
      rotation: number;
      rotationSpeed: number;
      flipAngle: number;
      flipSpeed: number;
      opacity: number;
      type: 'sunflower' | 'petal' | 'sparkle';
    }

    const items: Sunflower[] = [];
    const count = 35; // Dense, magical sunflower storm

    for (let i = 0; i < count; i++) {
      items.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 22 + 16, // Rich sizes
        speedY: Math.random() * 1.8 + 1.2,
        speedX: (Math.random() - 0.5) * 0.8,
        swaySpeed: Math.random() * 0.03 + 0.015,
        swayRange: Math.random() * 2 + 1,
        swayAngle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.4 + 0.6,
        type: i % 4 === 0 ? 'sunflower' : (i % 3 === 0 ? 'petal' : 'sunflower'),
      });
    }

    // Helper to draw a detailed 3D Sunflower
    const drawSunflower = (c: CanvasRenderingContext2D, size: number, opacity: number) => {
      const petalCount = 14;
      const innerRadius = size * 0.38;
      const petalLength = size * 0.62;

      c.save();
      c.globalAlpha = opacity;

      // 1. Draw glowing golden-yellow petals around center
      for (let p = 0; p < petalCount; p++) {
        const angle = (p * Math.PI * 2) / petalCount;
        c.save();
        c.rotate(angle);

        // Petal Gradient
        const petalGrad = c.createLinearGradient(0, innerRadius, 0, innerRadius + petalLength);
        petalGrad.addColorStop(0, '#f59e0b'); // amber-500
        petalGrad.addColorStop(0.5, '#fbbf24'); // amber-400
        petalGrad.addColorStop(1, '#fef08a'); // yellow-200 tip

        c.fillStyle = petalGrad;
        c.beginPath();
        c.moveTo(0, innerRadius);
        c.bezierCurveTo(-size * 0.16, innerRadius + petalLength * 0.5, -size * 0.1, innerRadius + petalLength, 0, innerRadius + petalLength);
        c.bezierCurveTo(size * 0.1, innerRadius + petalLength, size * 0.16, innerRadius + petalLength * 0.5, 0, innerRadius);
        c.closePath();
        c.fill();

        // Delicate center rib line
        c.strokeStyle = 'rgba(217, 119, 6, 0.4)';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(0, innerRadius);
        c.lineTo(0, innerRadius + petalLength * 0.85);
        c.stroke();

        c.restore();
      }

      // 2. Draw deep velvet brown center disc
      const centerGrad = c.createRadialGradient(0, 0, 0, 0, 0, innerRadius);
      centerGrad.addColorStop(0, '#451a03'); // deep brown
      centerGrad.addColorStop(0.7, '#78350f'); // warm amber brown
      centerGrad.addColorStop(1, '#92400e'); // golden brown rim
      c.fillStyle = centerGrad;
      c.beginPath();
      c.arc(0, 0, innerRadius, 0, Math.PI * 2);
      c.fill();

      // Seed texture ring
      c.strokeStyle = 'rgba(251, 191, 36, 0.5)';
      c.lineWidth = 1.5;
      c.setLineDash([2, 3]);
      c.beginPath();
      c.arc(0, 0, innerRadius * 0.65, 0, Math.PI * 2);
      c.stroke();

      c.restore();
    };

    // Helper to draw single fluttering sunflower petal
    const drawPetal = (c: CanvasRenderingContext2D, size: number, opacity: number) => {
      c.save();
      c.globalAlpha = opacity;
      const grad = c.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.5, '#fbbf24');
      grad.addColorStop(1, '#d97706');

      c.fillStyle = grad;
      c.beginPath();
      c.moveTo(0, -size);
      c.bezierCurveTo(-size * 0.4, -size * 0.3, -size * 0.4, size * 0.4, 0, size);
      c.bezierCurveTo(size * 0.4, size * 0.4, size * 0.4, -size * 0.3, 0, -size);
      c.closePath();
      c.fill();
      c.restore();
    };

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // 3D kinematics
        item.y += item.speedY;
        item.swayAngle += item.swaySpeed;
        item.x += item.speedX + Math.sin(item.swayAngle) * item.swayRange;
        item.rotation += item.rotationSpeed;
        item.flipAngle += item.flipSpeed;

        // Wrap around top when out of screen
        if (item.y > canvas.height + 40) {
          item.y = -40;
          item.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(item.x, item.y);

        // 3D perspective flip (scaling on Y gives realistic 3D tumbling effect)
        const scaleY = Math.cos(item.flipAngle);
        ctx.scale(1, scaleY);
        ctx.rotate(item.rotation);

        if (item.type === 'sunflower') {
          drawSunflower(ctx, item.size, item.opacity);
        } else {
          drawPetal(ctx, item.size * 0.9, item.opacity);
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[125] w-full h-full"
      aria-hidden="true"
    />
  );
}

