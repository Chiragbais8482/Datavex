import React from "react";

interface GradualBlurProps {
  position?: "top" | "bottom";
  height?: string;
}

const GradualBlur: React.FC<GradualBlurProps> = ({
  position = "bottom",
  height = "8rem",
}) => {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: 0,
        right: 0,
        [position]: 0,
        height,
        zIndex: 40,

        /* 🔑 Smooth fade mask */
        WebkitMaskImage:
          position === "bottom"
            ? "linear-gradient(to top, black 0%, transparent 100%)"
            : "linear-gradient(to bottom, black 0%, transparent 100%)",
        maskImage:
          position === "bottom"
            ? "linear-gradient(to top, black 0%, transparent 100%)"
            : "linear-gradient(to bottom, black 0%, transparent 100%)",

        /* Subtle blur only */
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",

        /* Very light darkening to blend */
        background:
          "linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0))",
      }}
    />
  );
};

export default GradualBlur;
