import { motion } from "framer-motion";
import { Upload, Sparkles, Code, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ ADD
import BlurText from "./BlurText";

interface Feature {
  icon: LucideIcon;
  text: string;
}

/* ---------------- Animation Variants ---------------- */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const featureItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const navigate = useNavigate(); // ✅ ADD

  const features: Feature[] = [
    { icon: Upload, text: "Upload CSV & Excel files" },
    { icon: Sparkles, text: "Automatic insights & visualizations" },
    { icon: Code, text: "No coding required" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
    >
      {/* ---------------- Background Glows ---------------- */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-600/20 rounded-full blur-[120px]"
      />

      {/* ---------------- Content ---------------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* ---------------- Heading ---------------- */}
        <div className="flex justify-center max-sm:w-full">
          <BlurText
            text="AI Data Analysis"
            animateBy="words"
            direction="top"
            className="
              text-6xl md:text-7xl lg:text-8xl
              font-bold
              leading-tight
              bg-gradient-to-r from-purple-400 via-pink-400 to-magenta-500
              bg-clip-text text-transparent
              mb-6
              max-sm:text-center
            "
          />
        </div>

        {/* ---------------- Subheading ---------------- */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12"
        >
          AI-powered data insights to understand trends, detect patterns, and make
          smarter decisions — instantly.
        </motion.p>

        {/* ---------------- Features ---------------- */}
        <motion.div
          variants={container}
          className="flex flex-row flex-wrap items-center justify-center gap-x-16 gap-y-8 mb-14"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={featureItem}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 px-2 py-1"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-magenta-500 shadow-lg shadow-purple-500/50" />
                <span className="flex items-center gap-2 text-sm md:text-base text-gray-300">
                  <Icon className="w-4 h-4 text-purple-400" />
                  {feature.text}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---------------- CTA ---------------- */}
        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.06, backgroundPosition: "100% 50%" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate("/analyze")} // ✅ ADD
          style={{
            backgroundSize: "200% 200%",
            backgroundImage:
              "linear-gradient(90deg, #9333ea, #1f0133, #440152)",
          }}
          className="
            mt-1
            px-8 py-4 rounded-full
            text-white text-lg font-semibold
            shadow-2xl shadow-purple-500/40
          "
        >
          Analyze Your Data
        </motion.button>

        {/* ---------------- Trust Badge ---------------- */}
        <motion.p
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="text-xs text-gray-500 mt-6"
        >
          No credit card required • Free trial available
        </motion.p>
      </motion.div>
    </section>
  );
}
