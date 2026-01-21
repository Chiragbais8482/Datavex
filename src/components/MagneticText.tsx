import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function MagneticText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 150, damping: 12 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 12 });

  return (
    <motion.span
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const dx = e.clientX - rect.left - rect.width / 2;
        const dy = e.clientY - rect.top - rect.height / 2;

        x.set(dx * 0.15);
        y.set(dy * 0.15);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: smoothX, y: smoothY }}
      className={`
        relative inline-block cursor-pointer
        transition-colors duration-300
        ${className}
      `}
    >
      {/* Glow */}
      <span
        className="
          absolute inset-0
          rounded-lg
          bg-purple-500/20
          blur-xl
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Text */}
      <span className="relative z-10">
        {children}
      </span>
    </motion.span>
  );
}
