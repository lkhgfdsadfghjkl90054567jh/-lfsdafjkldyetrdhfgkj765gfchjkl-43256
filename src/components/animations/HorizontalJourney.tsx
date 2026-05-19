import { useRef, useMemo } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stages = [
  {
    num: "01",
    ar: "الاكتشاف",
    en: "Discovery",
    desc: "تصفح موقع معهد جلنار، شاهد قصص النجاح، وأدرك أن هذا هو مسارك",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
        <circle cx="40" cy="40" r="30" stroke="#d4af37" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="40" cy="40" r="12" fill="#d4af37" opacity="0.2" />
        <circle cx="40" cy="40" r="6" fill="#d4af37" />
        <path d="M40 20L40 14M40 60L40 66M20 40L14 40M60 40L66 40" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    ar: "التسجيل",
    en: "Enrollment",
    desc: "ملء استمارة القبول، المقابلة الأولية، وتأكيد مكانك في الدفعة القادمة",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
        <rect x="18" y="14" width="44" height="52" rx="4" stroke="#d4af37" strokeWidth="2" />
        <path d="M28 30h24M28 40h24M28 50h16" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
        <circle cx="58" cy="60" r="10" fill="#d4af37" />
        <path d="M54 60l3 3 5-5" stroke="#0a1628" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    ar: "التدريب",
    en: "Training",
    desc: "3 إلى 6 أشهر من التكوين المكثف — نظري وعملي — بأيدي محترفين معتمدين دولياً",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
        <path d="M14 56L40 20L66 56" stroke="#d4af37" strokeWidth="2" />
        <path d="M22 56L40 30L58 56" stroke="#d4af37" strokeWidth="2" opacity="0.5" />
        <rect x="32" y="44" width="16" height="12" rx="2" fill="#d4af37" opacity="0.3" stroke="#d4af37" strokeWidth="1.5" />
        <circle cx="40" cy="20" r="4" fill="#d4af37" />
      </svg>
    ),
  },
  {
    num: "04",
    ar: "التخرج",
    en: "Graduation",
    desc: "احصل على شهادتك المعتمدة واحتفل بأول خطوة نحو السماء",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
        <path d="M40 20L70 34L40 48L10 34L40 20Z" stroke="#d4af37" strokeWidth="2" fill="#d4af37" fillOpacity="0.1" />
        <path d="M24 42v14c0 0 6 8 16 8s16-8 16-8V42" stroke="#d4af37" strokeWidth="2" />
        <path d="M70 34v16" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
        <circle cx="70" cy="52" r="3" fill="#d4af37" />
      </svg>
    ),
  },
  {
    num: "05",
    ar: "التحليق",
    en: "Take Off",
    desc: "انطلق مع أكبر شركات الطيران العالمية وعيش حياة لا تُصدّق",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
        <path d="M12 52l28-28 8 4-10 10 20-4 4 4-30 16-4-4 8-8-4-4" fill="#d4af37" opacity="0.8" />
        <path d="M8 60h64" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M60 28l6-6M65 35l6-3M54 24l3-7" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* ── PanelContent: each panel's opacity/scale driven by scroll progress ── */
function PanelContent({
  stage,
  index,
  scrollYProgress,
  total,
}: {
  stage: { num: string; ar: string; en: string; desc: string; svg: ReactNode };
  index: number;
  scrollYProgress: any;
  total: number;
}) {
  /*
   * CRITICAL: input arrays must be strictly increasing.
   * For index=0: center=0, so [lo, center] would be [0, 0] — duplicate!
   * For index=N-1: center=1, so [center, hi] would be [1, 1] — duplicate!
   * Fix: use only a 2-point range for edge panels.
   */
  const { inputRange, opOut, scOut, yOut } = useMemo(() => {
    const center = index / (total - 1);
    const span   = 0.55 / (total - 1);

    if (index === 0) {
      return {
        inputRange: [0, Math.min(1, span * 2.2)],
        opOut: [1, 0.06] as number[],
        scOut: [1, 0.84] as number[],
        yOut:  [0, 44]   as number[],
      };
    }
    if (index === total - 1) {
      return {
        inputRange: [Math.max(0, 1 - span * 2.2), 1],
        opOut: [0.06, 1] as number[],
        scOut: [0.84, 1] as number[],
        yOut:  [44, 0]   as number[],
      };
    }
    return {
      inputRange: [center - span, center, center + span],
      opOut: [0.06, 1, 0.06] as number[],
      scOut: [0.84, 1, 0.84] as number[],
      yOut:  [44, 0, 44]    as number[],
    };
  }, [index, total]);

  const opacity = useTransform(scrollYProgress, inputRange, opOut);
  const scale   = useTransform(scrollYProgress, inputRange, scOut);
  const yVal    = useTransform(scrollYProgress, inputRange, yOut);

  return (
    <div
      className="w-screen h-full shrink-0 flex items-center justify-center px-8 md:px-24"
      style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, #131f38, #060d1a)" }}
    >
      <motion.div className="max-w-lg text-center" style={{ opacity, scale, y: yVal }}>
        <div className="flex justify-center mb-8">{stage.svg}</div>
        <p className="text-[#d4af37]/15 text-8xl font-bold leading-none mb-2 select-none font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {stage.num}
        </p>
        <h3 className="text-5xl md:text-6xl font-bold text-white mb-3">{stage.ar}</h3>
        <p className="text-[#d4af37]/50 text-xs tracking-[0.22em] uppercase mb-8 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {stage.en}
        </p>
        <p className="text-white/55 text-lg leading-relaxed max-w-sm mx-auto">{stage.desc}</p>
        <div className="mt-10 w-12 h-px bg-[#d4af37]/40 mx-auto rounded-full" />
      </motion.div>
    </div>
  );
}

/* ── Dot + label in progress bar ── */
function ProgressDot({
  scrollYProgress,
  index,
  total,
}: {
  scrollYProgress: any;
  index: number;
  total: number;
}) {
  const { inputRange, opOut, scOut } = useMemo(() => {
    const center = index / (total - 1);
    const span   = 0.38 / (total - 1);
    if (index === 0) {
      return {
        inputRange: [0, Math.min(1, span * 2.5)],
        opOut: [1, 0.2] as number[],
        scOut: [1.8, 0.6] as number[],
      };
    }
    if (index === total - 1) {
      return {
        inputRange: [Math.max(0, 1 - span * 2.5), 1],
        opOut: [0.2, 1] as number[],
        scOut: [0.6, 1.8] as number[],
      };
    }
    return {
      inputRange: [center - span, center, center + span],
      opOut: [0.2, 1, 0.2] as number[],
      scOut: [0.6, 1.8, 0.6] as number[],
    };
  }, [index, total]);

  const op = useTransform(scrollYProgress, inputRange, opOut);
  const sc = useTransform(scrollYProgress, inputRange, scOut);
  return (
    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" style={{ opacity: op, scale: sc }} />
  );
}

function StageLabel({
  ar,
  index,
  total,
  scrollYProgress,
}: {
  ar: string;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const { inputRange, opOut } = useMemo(() => {
    const center = index / (total - 1);
    const span   = 0.38 / (total - 1);
    if (index === 0) {
      return {
        inputRange: [0, Math.min(1, span * 2.5)],
        opOut: [1, 0.2] as number[],
      };
    }
    if (index === total - 1) {
      return {
        inputRange: [Math.max(0, 1 - span * 2.5), 1],
        opOut: [0.2, 1] as number[],
      };
    }
    return {
      inputRange: [center - span, center, center + span],
      opOut: [0.2, 1, 0.2] as number[],
    };
  }, [index, total]);

  const op = useTransform(scrollYProgress, inputRange, opOut);
  return (
    <motion.span
      className="text-[9px] text-[#d4af37] tracking-wide text-center w-10"
      style={{ opacity: op }}
    >
      {ar}
    </motion.span>
  );
}

/* ── Main exported component ── */
export function HorizontalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const N = stages.length; // 5

  /*
   * xPercent: pure numeric motion value (0 → -80).
   * Container width = N*100vw = 500vw.
   * translateX(-80%) of 500vw = -400vw = -(N-1)*100vw ✓
   */
  const xPercent = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -((N - 1) / N) * 100]
  );

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${N * 100}vh`, overflowX: "clip" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Header */}
        <div className="absolute top-8 inset-x-0 z-20 text-center pointer-events-none">
          <p className="text-white/20 text-[10px] tracking-[0.35em] uppercase mb-1 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Journey · رحلة التحول
          </p>
          <h2 className="text-2xl font-bold text-white/70">خطوة بخطوة</h2>
        </div>

        {/* Progress bar + dots */}
        <div className="absolute bottom-8 inset-x-0 z-20 flex flex-col items-center gap-3 pointer-events-none px-16">
          <div className="w-full max-w-xs h-px bg-white/8 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#d4af37] rounded-full" style={{ width: lineWidth }} />
          </div>
          <div className="flex justify-between w-full max-w-xs">
            {stages.map((_, i) => (
              <ProgressDot key={i} scrollYProgress={scrollYProgress} index={i} total={N} />
            ))}
          </div>
          <div className="flex justify-between w-full max-w-xs mt-0.5">
            {stages.map((s, i) => (
              <StageLabel key={i} ar={s.ar} index={i} total={N} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Sliding strip */}
        <motion.div
          className="flex h-full"
          style={{ width: `${N * 100}vw`, xPercent } as any}
        >
          {stages.map((stage, i) => (
            <PanelContent
              key={i}
              stage={stage}
              index={i}
              scrollYProgress={scrollYProgress}
              total={N}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
