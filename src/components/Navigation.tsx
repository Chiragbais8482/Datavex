import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface NavItem {
  label: string;
  href: string;
}

/* ---------------- Variants ---------------- */

const navBarVariant: Variants = {
  hidden: { y: -80, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const navContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};

const navItemVariant: Variants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0 },
};

export function Navigation() {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "What You Get", href: "#what-you-get" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <motion.nav
      variants={navBarVariant}
      initial="hidden"
      animate="show"
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-900/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo (IMAGE, SAME SIZE) */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Datavex Logo"
              className="w-8 h-8 object-contain"
            />
          </motion.div>

          {/* Nav Links */}
          <motion.ul
            variants={navContainer}
            initial="hidden"
            animate="show"
            className="flex items-center space-x-8"
          >
            {navItems.map((item) => (
              <motion.li
                key={item.label}
                variants={navItemVariant}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative"
              >
                <motion.a
                  href={item.href}
                  className="block text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  variants={{
                    rest: { y: 0, letterSpacing: "0em" },
                    hover: { y: -2, letterSpacing: "0.04em" },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {item.label}
                </motion.a>

                <motion.span
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-purple-500 to-magenta-500 origin-left"
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={() => navigate("/analyze")}
            className="
              block
              px-5 py-2 rounded-full
              text-white text-sm font-medium
              bg-gradient-to-r from-purple-600 to-magenta-600
              shadow-lg shadow-purple-500/30
            "
          >
            Get Started
          </motion.button>

        </div>
      </div>
    </motion.nav>
  );
}
