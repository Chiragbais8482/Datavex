import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from: any, steps: any[]) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: any = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  stepDuration?: number;
}

const BlurText = ({
  text,
  delay = 120,
  className = "",
  animateBy = "words",
  direction = "top",
  stepDuration = 0.35,
}: BlurTextProps) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const from = useMemo(
    () =>
      direction === "top"
        ? { opacity: 0, y: -40, filter: "blur(10px)" }
        : { opacity: 0, y: 40, filter: "blur(10px)" },
    [direction]
  );

  const to = useMemo(
    () => [
      { opacity: 0.6, y: 6, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)" },
    ],
    []
  );

  const totalDuration = stepDuration * to.length;

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(from, to);

        return (
          <motion.span
            key={index}
            initial={from}
            animate={inView ? animateKeyframes : from}
            transition={{
              duration: totalDuration,
              delay: (index * delay) / 1000,
              ease: "easeOut",
            }}
            style={{
              backgroundImage:
                "linear-gradient(90deg, #c084fc, #f472b6, #a855f7)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block",
              willChange: "transform, opacity, filter",
            }}
          >
            {segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
