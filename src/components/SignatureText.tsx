import { motion } from "framer-motion";

export default function SignatureText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {/* Text */}
      <motion.span
        variants={{
          rest: { y: 0 },
          hover: { y: -2 },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-block"
      >
        {text}
      </motion.span>

      {/* Underline */}
      <motion.span
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          absolute left-0 -bottom-1
          h-[2px] w-full
          origin-left
          bg-gradient-to-r from-purple-400 to-pink-500
        "
      />
    </motion.span>
  );
}