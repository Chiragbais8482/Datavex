import MasonryBoxes from "./MasonryBoxes";
import BlurText from "./BlurText";

type FeatureItem = {
  id: string;
  title: string;
  description: string;
  height: number;
};

const FEATURES: FeatureItem[] = [
  {
    id: "auto-insights",
    title: "Auto Insights",
    description:
      "Automatically performs deep analysis across your entire dataset to uncover meaningful patterns, relationships, and hidden insights that are often missed in manual analysis. It evaluates multiple variables together, highlights key performance drivers, and presents actionable insights that help you understand why something is happening, not just what is happening. This significantly reduces analysis time and improves decision accuracy.",
    height: 420,
  },
  {
    id: "trend-detection",
    title: "Trend Detection",
    description:
      "Examines historical, real-time, and time-series data to identify long-term trends, short-term movements, seasonal patterns, and behavioral shifts. It clearly shows whether metrics are growing, declining, or stabilizing, helping businesses forecast outcomes, plan strategies, and react early to changes before they impact results.",
    height: 300,
  },
  {
    id: "smart-charts",
    title: "Smart Charts",
    description:
      "Automatically determines the most effective visualization for each dataset by analyzing data structure, scale, and context. It creates clean, interactive charts that highlight comparisons, distributions, and relationships, eliminating guesswork and ensuring insights are communicated clearly to both technical and non-technical users.",
    height: 380,
  },
  {
    id: "ai-summary",
    title: "AI Summary",
    description:
      "Converts complex analysis results into structured, easy-to-understand written summaries using natural language. It explains trends, insights, and anomalies in a concise but meaningful way, allowing stakeholders to quickly grasp conclusions without digging into raw data or dashboards.",
    height: 260,
  },
  {
    id: "anomaly-detection",
    title: "Anomaly Detection",
    description:
      "Continuously monitors data to detect unexpected spikes, drops, deviations, or outliers that differ from normal behavior. These anomalies may indicate risks, system failures, data errors, fraud, or sudden market changes, enabling faster investigation and timely corrective action.",
    height: 320,
  },
];

export default function WhatYouGet() {
  return (
    <section
      id="what-you-get"
      className="
        relative
        py-40 max-sm:py-24
        px-6
        overflow-hidden
        bg-black/20
        backdrop-blur-[2px]
      "
    >
      {/* Heading block */}
      <div className="text-center flex flex-col items-center mb-[3px]">
        {/* Hover-reveal title */}
        <div
          className="
            relative inline-block
            text-transparent bg-clip-text
            bg-gradient-to-r from-purple-400 to-pink-500
            transition-all duration-300
          "
          style={{
            WebkitMaskImage:
              "radial-gradient(200px at center, black 100%, transparent 100%)",
            maskImage:
              "radial-gradient(200px at center, black 100%, transparent 100%)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.webkitMaskImage =
              "radial-gradient(120px at var(--x) var(--y), black 0%, transparent 70%)";
            e.currentTarget.style.maskImage =
              "radial-gradient(120px at var(--x) var(--y), black 0%, transparent 70%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.webkitMaskImage =
              "radial-gradient(200px at center, black 100%, transparent 100%)";
            e.currentTarget.style.maskImage =
              "radial-gradient(200px at center, black 100%, transparent 100%)";
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty(
              "--x",
              `${e.clientX - rect.left}px`
            );
            e.currentTarget.style.setProperty(
              "--y",
              `${e.clientY - rect.top}px`
            );
          }}
        >
          <BlurText
            text="What You Get"
            animateBy="words"
            direction="top"
            className="
              text-4xl md:text-5xl
              font-semibold mb-4
            "
          />
        </div>

        {/* Subtitle */}
        <BlurText
          text="Powerful AI features designed to convert raw data into clear insights"
          animateBy="words"
          direction="bottom"
          className="
            text-gray-400
            max-w-xl
            text-center
            text-base md:text-lg
          "
        />
      </div>

      {/* EXACT 3px spacing */}
      <div style={{ height: "3px" }} />

      {/* Masonry boxes */}
      <MasonryBoxes items={FEATURES} />
    </section>
  );
}
