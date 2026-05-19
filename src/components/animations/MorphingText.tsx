import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["حلمك", "مستقبلك", "نجاحك", "قصتك"];

export function MorphingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block" style={{ minWidth: "4ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block text-[#d4af37]"
          initial={{ opacity: 0, filter: "blur(24px)", y: 24, scale: 0.85 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
          exit={{ opacity: 0, filter: "blur(24px)", y: -24, scale: 0.85 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
