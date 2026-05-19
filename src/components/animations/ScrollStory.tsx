import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const steps = [
  { ar: "اكتشف",  sub: "تعرّف على برامجنا" },
  { ar: "سجّل",   sub: "ملء الاستمارة"      },
  { ar: "تدرّب",  sub: "6 أشهر مكثفة"       },
  { ar: "تخرّج",  sub: "شهادة معتمدة"        },
  { ar: "حلّق",   sub: "وظيفة دولية"         },
];

function StepNode({
  progress,
  index,
  total,
}: {
  progress: number;
  index: number;
  total: number;
}) {
  const threshold = index / (total - 1);
  const isActive = progress >= threshold - 0.04;

  return (
    <div className="flex flex-col items-center gap-2" style={{ width: `${100 / total}%` }}>
      {/* Circle */}
      <motion.div
        className="relative flex items-center justify-center rounded-full border-2 transition-all duration-500"
        animate={{
          width:           isActive ? 44 : 28,
          height:          isActive ? 44 : 28,
          borderColor:     isActive ? "#d4af37" : "rgba(255,255,255,0.15)",
          backgroundColor: isActive ? "rgba(212,175,55,0.15)" : "transparent",
          boxShadow:       isActive ? "0 0 20px rgba(212,175,55,0.4)" : "none",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="rounded-full bg-[#d4af37]"
          animate={{ width: isActive ? 12 : 6, height: isActive ? 12 : 6, opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Label */}
      <motion.div
        className="text-center"
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <p className={`font-bold transition-all duration-500 ${isActive ? "text-white text-base" : "text-white/40 text-sm"}`}>
          {steps[index].ar}
        </p>
        <p className="text-[#d4af37]/60 text-[10px] tracking-wide mt-0.5 hidden md:block">
          {steps[index].sub}
        </p>
      </motion.div>
    </div>
  );
}

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.25"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 18 });
  const [progress, setProgress] = useState(0);

  useEffect(() => smoothProgress.on("change", setProgress), [smoothProgress]);

  const planeX   = useTransform(smoothProgress, [0, 1], ["2%", "90%"]);
  const trailW   = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const activeIndex = Math.min(
    steps.length - 1,
    Math.round(progress * (steps.length - 1))
  );

  return (
    <section ref={ref} className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-3">رحلتك في 5 خطوات</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">من الحلم إلى الواقع</h2>
        </div>

        {/* Track + nodes */}
        <div className="relative mb-16">
          {/* Background rail */}
          <div className="absolute top-[22px] left-[10%] right-[10%] h-px bg-white/8" />

          {/* Animated fill */}
          <div className="absolute top-[22px] left-[10%] right-[10%] h-px overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4af37]/60 to-[#d4af37]" style={{ width: trailW }} />
          </div>

          {/* Plane */}
          <motion.div
            className="absolute top-0 -translate-y-[10px] -translate-x-1/2 z-10"
            style={{ left: planeX }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 40 24" width="36" height="22" fill="none">
                <path d="M32 12L4 3L2 8L14 12L2 16L4 21L32 12Z" fill="#d4af37" />
                <rect x="14" y="10.5" width="18" height="3" rx="1.5" fill="#d4af37" opacity="0.6" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Step nodes */}
          <div className="flex items-start justify-between pt-1 px-[10%]">
            {steps.map((_, i) => (
              <StepNode key={i} progress={progress} index={i} total={steps.length} />
            ))}
          </div>
        </div>

        {/* Active step detail */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-sm text-center border border-[#d4af37]/15 bg-[#d4af37]/5 rounded-2xl px-8 py-6"
        >
          <p className="text-2xl font-bold text-white mb-1">{steps[activeIndex].ar}</p>
          <p className="text-[#d4af37]/60 text-sm">{steps[activeIndex].sub}</p>
        </motion.div>

      </div>
    </section>
  );
}
