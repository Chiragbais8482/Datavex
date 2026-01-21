import { useEffect, useRef } from "react";

type LineLayer = {
  count: number;
  amplitude: number;
  glow: number;
  opacity: number;
  speed: number;
  offsetY: number;
};

export function FloatingLines() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smoothMouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    /* ---------- LINE LAYERS ---------- */

    const layers: LineLayer[] = [
      // BACKGROUND LAYER 1
      {
        count: 4,
        amplitude: 18,
        glow: 8,
        opacity: 0.18,
        speed: 0.00009,
        offsetY: -120,
      },
      // BACKGROUND LAYER 2
      {
        count: 4,
        amplitude: 22,
        glow: 10,
        opacity: 0.22,
        speed: 0.00011,
        offsetY: 120,
      },
      // PRIMARY FOREGROUND LAYER
      {
        count: 4,
        amplitude: 28,
        glow: 28,
        opacity: 0.75,
        speed: 0.00016, // slightly faster
        offsetY: 0,
      },
    ];

    let startTime = performance.now();

    const draw = (now: number) => {
      const t = now - startTime;

      // smooth mouse
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.06;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      layers.forEach((layer, layerIndex) => {
        ctx.lineWidth = layerIndex === 2 ? 2.2 : 1.4;
        ctx.shadowBlur = layer.glow;
        ctx.shadowColor = "rgba(168,85,247,1)";
        ctx.strokeStyle = `rgba(168,85,247,${layer.opacity})`;

        for (let i = 0; i < layer.count; i++) {
          ctx.beginPath();

          const phase = (i / layer.count) * Math.PI * 2;
          const diagonalSlope = 0.12; // makes lines diagonal

          for (let x = 0; x <= w; x += 14) {
            const nx = x / w;

            const baseWave =
              Math.sin(nx * Math.PI * 2 + t * layer.speed + phase) *
              layer.amplitude;

            const dx = x - smoothMouse.current.x;
            const dy = h / 2 - smoothMouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const hover =
              Math.exp(-dist * 0.0035) *
              dy *
              (layerIndex === 2 ? 0.18 : 0.08);

            const y =
              h / 2 +
              layer.offsetY +
              diagonalSlope * x +
              baseWave +
              hover +
              (i - layer.count / 2) * 42;

            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }

          ctx.stroke();
        }
      });

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}