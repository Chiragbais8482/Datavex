import { useRef, useEffect, useState } from "react";
import "./GooeyNav.css";

interface NavItem {
  label: string;
  href: string;
}

interface GooeyNavProps {
  items: NavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

export default function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLUListElement | null>(null);
  const filterRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, index: number, total: number) => {
    const angle = ((360 + noise(8)) / total) * index * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: number[], r: number) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (el: HTMLElement) => {
    const bubbleTime = animationTime * 2 + timeVariance;
    el.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, particleDistances, particleR);

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");

        particle.className = "particle";
        point.className = "point";

        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        particle.appendChild(point);
        el.appendChild(particle);

        setTimeout(() => particle.remove(), t);
      }, 30);
    }
  };

  const updateEffectPosition = (el: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    const styles = {
      left: `${rect.left - container.left}px`,
      top: `${rect.top - container.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = el.innerText;
  };

  const handleClick = (e: React.MouseEvent, index: number) => {
    const li = e.currentTarget.parentElement as HTMLElement;
    if (activeIndex === index) return;

    setActiveIndex(index);
    updateEffectPosition(li);
    filterRef.current && makeParticles(filterRef.current);
    textRef.current?.classList.add("active");
  };

  useEffect(() => {
    const li = navRef.current?.children[activeIndex] as HTMLElement;
    if (li) {
      updateEffectPosition(li);
      textRef.current?.classList.add("active");
    }
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, i) => (
            <li key={i} className={activeIndex === i ? "active" : ""}>
              <a
                href={item.href}
                className="gooey-nav-link"
                onClick={(e) => handleClick(e, i)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
}
