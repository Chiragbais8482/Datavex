import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GlobalSpotlightProps {
  glowColor?: string;
}

export default function GlobalSpotlight({
  glowColor = "132, 0, 255",
}: GlobalSpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    el.className = "global-spotlight";
    el.style.cssText = `
      position: fixed;
      width: 420px;
      height: 420px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(
        circle,
        rgba(${glowColor}, 0.18) 0%,
        rgba(${glowColor}, 0.12) 20%,
        rgba(${glowColor}, 0.06) 40%,
        rgba(${glowColor}, 0.03) 55%,
        transparent 70%
      );
      filter: blur(40px);
      transform: translate(-50%, -50%);
      opacity: 0;
      z-index: 200;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(el);
    spotlightRef.current = el;

    const onMove = (e: MouseEvent) => {
      gsap.to(el, {
        left: e.clientX,
        top: e.clientY,
        opacity: 0.6,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      el.remove();
    };
  }, [glowColor]);

  return null;
}
