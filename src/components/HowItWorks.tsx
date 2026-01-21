import { motion, easeInOut } from "framer-motion";
import { Upload, Cpu, BarChart3, Target, type LucideIcon } from "lucide-react";
import MagicBentoWrapper from "./MagicBentoWrapper";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

/* ---------- Motion ---------- */

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeInOut },
  },
};

const blurText = {
  hidden: { opacity: 0, filter: "blur(14px)", y: 14 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.9, ease: easeInOut },
  },
};

export function HowItWorks() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Upload your dataset",
      description:
        "Upload CSV, Excel, or JSON files. Multiple data sources supported.",
      icon: Upload,
    },
    {
      number: 2,
      title: "AI cleans and understands data",
      description:
        "Automatic data typing, normalization, and missing value handling.",
      icon: Cpu,
    },
    {
      number: 3,
      title: "Insights and visuals generated",
      description:
        "Clear charts reveal trends, correlations, and anomalies.",
      icon: BarChart3,
    },
    {
      number: 4,
      title: "Recommendations delivered",
      description:
        "Actionable insights to guide confident decisions.",
      icon: Target,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="
        relative
        py-40 max-sm:py-24
        px-6
        overflow-hidden
        bg-black/20
        backdrop-blur-[2px]
        
      "
    >
      {/* ambient background */}
      <div className="absolute -top-40 right-1/3 w-[32rem] h-[32rem] bg-magenta-600/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-1/4 w-[26rem] h-[26rem] bg-purple-600/10 rounded-full blur-[180px]" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-160px" }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div className="text-center mb-32 max-sm:mb-16">
          <motion.h2
  variants={blurText}
  className="text-4xl md:text-5xl font-semibold mb-6 max-sm:mb-4"
>
  <span
    className="
      relative inline-block
      text-transparent bg-clip-text
      bg-gradient-to-r from-purple-400 via-pink-400 to-magenta-400
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
    How It Works
  </span>
</motion.h2>

          <motion.p
            variants={blurText}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            From raw data to decisions — streamlined into four steps
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-36 max-sm:space-y-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-24 gap-y-10"
              >
                <div
                  className={`
                    max-w-md mx-auto
                    text-center
                    space-y-6 max-sm:space-y-4
                    ${isLeft ? "md:col-start-1" : "md:col-start-2"}
                  `}
                >
                  <MagicBentoWrapper>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      className="
                        mx-auto
                        w-full
                        rounded-3xl
                        p-8 max-sm:p-6
                        bg-white/[0.035]
                        border border-white/[0.08]
                      "
                    >
                      <div className="flex justify-center">
                        <Icon className="w-12 h-12 text-purple-400/60" />
                      </div>
                    </motion.div>
                  </MagicBentoWrapper>

                  <motion.div
                    variants={blurText}
                    className="flex justify-center items-center gap-3 text-sm text-purple-400"
                  >
                    <span className="w-6 h-[1px] bg-purple-500/60" />
                    Step {step.number}
                    <span className="w-6 h-[1px] bg-purple-500/60" />
                  </motion.div>

                  <motion.h3
                    variants={blurText}
                    className="text-2xl font-medium text-white leading-snug"
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    variants={blurText}
                    className="text-gray-400 leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </div>

                <div
                  className={`hidden md:block ${
                    isLeft ? "md:col-start-2" : "md:col-start-1"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="text-center mt-36 max-sm:mt-20"
        >
        </motion.div>
      </motion.div>
    </section>
  );
}