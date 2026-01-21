import { motion } from "framer-motion";
import SignatureText from "./SignatureText";

export default function CreatedBy() {
  return (
    <section className="relative mt-40 px-6 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -6 }}
          className="
            max-w-3xl w-full
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-[0_20px_60px_-15px_rgba(168,85,247,0.35)]
            px-10 py-12
            text-center
            transition-all
          "
        >
          {/* Label */}
          <span className="inline-block mb-4 text-xs tracking-widest uppercase text-purple-400">
            Crafted With Intent
          </span>

          {/* Main Line */}
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-6">
            Created by{" "}
    <SignatureText
  text="Chirag Bais"
  className="font-bold text-purple-400"
/>



          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            This project is the result of thoughtful design, engineering precision,
            and a deep interest in building meaningful AI-powered tools that feel
            intuitive, fast, and human.
          </p>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          {/* Signature Line */}
          <p className="text-sm text-gray-400">
            Designed • Built • Iterated with focus on clarity and performance
          </p>
        </motion.div>
      </div>
    </section>
  );
}