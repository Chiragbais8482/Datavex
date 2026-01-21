import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
}

export default function ParticleCard({
  children,
  className = "",
  particleCount = 10,
  glowColor = "132, 0, 255",
  enableTilt = true,
  enableMagnetism = true,
}: ParticleCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const particles = useRef<HTMLDivElement[]>([]);
  const hovered = useRef(false);

  const createParticle = (x: number, y: number) => {
    const p = document.createElement("div");
    p.style.cssText = `
      position:absolute;
      width:3px;
      height:3px;
      border-radius:50%;
      background:rgba(${glowColor},1);
      box-shadow:0 0 4px rgba(${glowColor},0.6);
      left:${x}px;
      top:${y}px;
      pointer-events:none;
    `;
    return p;
  };

  const spawnParticles = useCallback(() => {
    if (!cardRef.current || !hovered.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        if (!cardRef.current || !hovered.current) return;

        const p = createParticle(
          Math.random() * rect.width,
          Math.random() * rect.height
        );

        cardRef.current.appendChild(p);
        particles.current.push(p);

        gsap.fromTo(p, { scale: 0 }, { scale: 1, duration: 0.25 });
        gsap.to(p, {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
        });
      }, i * 90);
    }
  }, [particleCount, glowColor]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onEnter = () => {
      hovered.current = true;
      spawnParticles();
    };

    const onLeave = () => {
      hovered.current = false;
      particles.current.forEach(p => p.remove());
      particles.current = [];
      gsap.to(el, { rotateX: 0, rotateY: 0, x: 0, y: 0 });
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (enableTilt) {
        gsap.to(el, {
          rotateX: (-y / rect.height) * 8,
          rotateY: (x / rect.width) * 8,
          duration: 0.2,
        });
      }

      if (enableMagnetism) {
        gsap.to(el, {
          x: x * 0.04,
          y: y * 0.04,
          duration: 0.25,
        });
      }
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
    };
  }, [spawnParticles, enableTilt, enableMagnetism]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}
