import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Plane } from "lucide-react";

import heroImg from "@assets/5E2F4A3F-1A1B-41B1-8AF6-70F7BEAA637D_1778701721058.png";
import transformImg from "@assets/7522A107-FFC9-4206-9EDC-2A9F217FF410_1778701721058.png";
import attendantImg from "@assets/C931F5CD-A232-4FA8-8EEE-71766C91243E_1778701721058.png";
import escalatorImg from "@assets/C97D38DF-9258-4F0E-8320-33D9A719BD74_1778701772504.png";

import { MorphingText } from "@/components/animations/MorphingText";
import { WaterRipple } from "@/components/animations/WaterRipple";
import { HorizontalJourney } from "@/components/animations/HorizontalJourney";
import { SkyTransition } from "@/components/animations/SkyTransition";
import { ScrollStory } from "@/components/animations/ScrollStory";

/* ─── Word-by-word reveal ─────────────────────────────────────────── */
function SplitReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/* ─── Count-up stat ───────────────────────────────────────────────── */
function StatCounter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const dur = 2200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(end * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-[#d4af37] mb-2 tabular-nums" dir="ltr">
        +{count}{suffix}
      </div>
      <div className="text-white/60 text-sm tracking-wider uppercase">{label}</div>
    </div>
  );
}

/* ─── 3-D tilt card ──────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 30 };
  const rX = useSpring(rotateX, springConfig);
  const rY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    rotateX.set(-y * 14);
    rotateY.set(x * 14);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnetic button ─────────────────────────────────────────────── */
function MagneticBtn({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.35);
    y.set((e.clientY - top - height / 2) * 0.35);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ─── Infinite marquee ────────────────────────────────────────────── */
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-6 relative">
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#0a1628] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#0a1628] to-transparent" />
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-xl font-bold text-white/30 tracking-[0.2em] uppercase shrink-0">
            {item}
            <span className="text-[#d4af37] mx-8">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── SVG Airplane path animation ────────────────────────────────── */
function AirplanePath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const pathProgress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 60, damping: 20 });
  const xPos = useTransform(pathProgress, [0, 1], ["110%", "-20%"]);
  const yPos = useTransform(pathProgress, [0, 0.3, 0.6, 1], ["60%", "20%", "40%", "10%"]);
  const rotate = useTransform(pathProgress, [0, 0.3, 0.6, 1], [-5, -15, 5, -8]);
  const trailOpacity = useTransform(pathProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-48 overflow-hidden pointer-events-none">
      <motion.div style={{ x: xPos, y: yPos, rotate }} className="absolute">
        <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
          <path d="M70 16L20 4L12 10L28 16L12 22L20 28L70 16Z" fill="#d4af37" opacity="0.9" />
          <path d="M36 16L20 10L20 22L36 16Z" fill="#b8960c" />
          <rect x="30" y="14" width="40" height="4" rx="2" fill="#d4af37" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-1/2 -translate-y-px h-px w-[200px] -translate-x-[210px]"
        style={{ background: "linear-gradient(to left, #d4af3740, transparent)", x: xPos, opacity: trailOpacity } as any}
      />
    </div>
  );
}

/* ─── Floating gold particles ─────────────────────────────────────── */
function GoldParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 8 + 4,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#d4af37]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Film grain overlay ──────────────────────────────────────────── */
function FilmGrain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1.05, 1.15]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const programs = [
    { ar: "مضيف/ة طيران", en: "Cabin Crew (CSS)", duration: "3-6 أشهر", hours: "120 ساعة", icon: "✈" },
    { ar: "مرحل جوي", en: "Flight Dispatcher", duration: "4 أشهر", hours: "90 ساعة", icon: "📡" },
    { ar: "وكيل مطار", en: "Ground Agent", duration: "2 أشهر", hours: "60 ساعة", icon: "🛂" },
    { ar: "مهندس صيانة", en: "Aircraft Maintenance", duration: "6 أشهر", hours: "200 ساعة", icon: "🔧" },
  ];

  const airlines = ["Emirates", "Qatar Airways", "Etihad Airways", "Air Algérie", "Tassili Airlines", "Turkish Airlines", "Royal Jordanian"];

  return (
    <div className="w-full bg-[#060d1a] text-white">
      <FilmGrain />

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax bg image */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <img src={heroImg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/30 via-[#060d1a]/40 to-[#060d1a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a]/60 via-transparent to-[#060d1a]/60" />
        </motion.div>

        <GoldParticles />

        {/* Content */}
        <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ opacity: heroOpacity }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-[#d4af37] text-sm tracking-[0.15em]">معتمد من سلطة الطيران المدني الجزائري</span>
          </motion.div>

          {/* Headline with morphing word */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.05] mb-6">
            <div className="overflow-hidden mb-2">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              >
                <MorphingText />
              </motion.span>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.span
                className="block text-white"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              >
                في الطيران
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="block text-[#d4af37]"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
              >
                يبدأ هنا
              </motion.span>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            معهد جلنار الدولي — أكاديمية الطيران الأولى في الجزائر
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticBtn
              href="/register"
              className="group inline-flex items-center gap-3 bg-[#d4af37] text-[#060d1a] font-bold text-lg px-10 py-4 rounded-full relative overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(212,175,55,0.35)] hover:shadow-[0_0_70px_rgba(212,175,55,0.55)] transition-shadow duration-500"
            >
              <span className="relative z-10">سجل الآن</span>
              <ArrowLeft className="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </MagneticBtn>
            <Link href="/programs">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-8 py-4 rounded-full text-lg transition-colors duration-300 cursor-pointer backdrop-blur-sm"
              >
                اكتشف برامجنا
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-white/40 text-xs tracking-[0.2em] uppercase">انتقل للأسفل</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-[#d4af37] to-transparent"
            animate={{ scaleY: [0, 1, 0], transformOrigin: "top" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════ */}
      <section className="py-24 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatCounter end={500} label="طالب متخرج" />
            <StatCounter end={10} label="سنوات خبرة" />
            <StatCounter end={95} suffix="%" label="معدل التوظيف" />
            <StatCounter end={15} label="شريك دولي" />
          </div>
        </div>
      </section>

      {/* ══════════════════════ SKY TRANSITION ══════════════════════ */}
      <SkyTransition />

      {/* ══════════════════════ AIRPLANE PATH ══════════════════════ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent absolute top-1/2" />
        </div>
        <AirplanePath />
      </div>

      {/* ══════════════════════ PROGRAMS ══════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <SplitReveal text="برامجنا التكوينية" />
            </h2>
            <p className="text-white/50 text-xl">
              <SplitReveal text="اختر المسار الذي يناسب طموحك" delay={0.2} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              >
                <TiltCard className="h-full">
                  <div className="h-full border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl p-8 transition-colors duration-500 group cursor-pointer relative overflow-hidden"
                    style={{ transform: "translateZ(0)" }}
                  >
                    {/* Glow on hover */}
                    <motion.div
                      className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.15), transparent 70%)" }}
                    />
                    <div className="text-4xl mb-6">{prog.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-1">{prog.ar}</h3>
                    <p className="text-[#d4af37]/70 text-sm mb-6 tracking-wider">{prog.en}</p>
                    <div className="flex gap-6 text-white/40 text-sm mb-8">
                      <span>{prog.duration}</span>
                      <span>·</span>
                      <span>{prog.hours}</span>
                    </div>
                    <Link href="/programs">
                      <span className="inline-flex items-center gap-2 text-[#d4af37] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        اكتشف أكثر <ArrowLeft className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ HORIZONTAL JOURNEY ══════════════════════ */}
      <HorizontalJourney />

      {/* ══════════════════════ TRANSFORMATION ══════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        {/* bg texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/3 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Images stack with water ripple */}
            <div className="relative h-[550px]">
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ rotate: 3 }}
              >
                <WaterRipple src={attendantImg} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-transparent to-transparent pointer-events-none rounded-2xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="absolute inset-4 shadow-2xl"
                style={{ rotate: -3 }}
              >
                <WaterRipple src={transformImg} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/80 via-transparent to-transparent pointer-events-none rounded-2xl" />
              </motion.div>

              {/* Float badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-6 right-6 bg-[#d4af37] text-[#060d1a] px-5 py-3 rounded-xl font-bold text-sm shadow-xl z-10"
              >
                95% معدل التوظيف
              </motion.div>
            </div>

            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[#d4af37] text-sm tracking-[0.2em] uppercase mb-4"
              >
                رحلة التحول
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                <SplitReveal text="من أين أنت الآن" />
                <br />
                <span className="text-[#d4af37]">
                  <SplitReveal text="إلى أين ستصل" delay={0.15} />
                </span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                في معهد جلنار، نحن لا نقدم دروساً فقط. نحن نصنع محترفين. بيئة تدريبية تحاكي الواقع، مناهج معتمدة دولياً، وشبكة علاقات تفتح لك أبواب أهم شركات الطيران في العالم.
              </p>

              {[
                "اعتماد من سلطة الطيران المدني الجزائري",
                "شراكة حصرية مع أكاديمية الطيران الملكية الأردنية",
                "تدريب عملي على أحدث المعدات",
                "مرافقة كاملة حتى التوظيف",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                  <span className="text-white/80">{item}</span>
                </motion.div>
              ))}

              <Link href="/about">
                <motion.div
                  whileHover={{ x: -4 }}
                  className="inline-flex items-center gap-3 mt-10 text-[#d4af37] font-bold text-lg cursor-pointer group"
                >
                  اكتشف قصتنا
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ JOURNEY IMAGE ══════════════════════ */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.img
          src={escalatorImg}
          alt=""
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-[#060d1a]/30 to-[#060d1a]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-4">
              اصنعي <span className="text-[#d4af37]">مستقبلك</span>
            </h3>
            <p className="text-white/60 text-xl">اليوم هو أفضل وقت للبداية</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ AIRLINES MARQUEE ══════════════════════ */}
      <section className="py-16 border-y border-white/5">
        <div className="mb-6 text-center">
          <span className="text-white/30 text-sm tracking-[0.2em] uppercase">خريجونا يحلقون مع</span>
        </div>
        <Marquee items={airlines} />
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-bold mb-4">
              <SplitReveal text="قصص نجاح حقيقية" />
            </h2>
            <p className="text-white/40 text-lg">
              <SplitReveal text="خريجونا يتحدثون" delay={0.2} />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "تجربتي في المعهد غيّرت مسار حياتي. اليوم أنا أطير مع الإماراتية وكل ذلك بدأ من هنا.", name: "سارة م.", role: "مضيفة طيران · Emirates" },
              { q: "التدريب العملي كان حاسماً. أساتذتي كانوا محترفين وشاركوني خبرتهم الميدانية.", name: "أحمد ك.", role: "مرحل جوي · Air Algérie" },
              { q: "وجدت في المعهد الدعم الكامل من أول يوم حتى توظيفي. الاهتمام بالتفاصيل لا يعلى عليه.", name: "ليلى ب.", role: "وكيلة مطار · Tassili Airlines" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 relative overflow-hidden cursor-default group transition-colors duration-500 hover:bg-white/[0.06]"
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.4 }}
                />
                <div className="text-[#d4af37]/20 text-7xl font-serif leading-none mb-4 select-none">"</div>
                <p className="text-white/70 leading-relaxed mb-8 text-lg">{t.q}</p>
                <div className="flex items-center gap-4 border-t border-white/8 pt-6">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-[#d4af37]/70 text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PARTNERSHIPS ══════════════════════ */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/30 text-sm tracking-[0.2em] uppercase mb-12"
          >
            شركاء النجاح
          </motion.p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {["أكاديمية الطيران الملكية الأردنية", "الخطوط الجوية الجزائرية", "طيران الطاسيلي", "DGAC"].map((p, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-white/40 hover:text-white/80 transition-colors duration-300 text-lg font-medium cursor-default"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SCROLL STORY ══════════════════════ */}
      <ScrollStory />

      {/* ══════════════════════ CTA ══════════════════════ */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,175,55,0.12),transparent)]" />
        <GoldParticles />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#d4af37]/60 text-sm tracking-[0.25em] uppercase mb-6">المقاعد محدودة</p>
            <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              هل أنت مستعد<br />
              <span className="text-[#d4af37]">للتحليق؟</span>
            </h2>
            <p className="text-white/50 text-xl max-w-lg mx-auto mb-14">
              انضم إلى النخبة وابدأ رحلتك نحو مهنة الأحلام. الدفعة القادمة تبدأ قريباً.
            </p>

            <MagneticBtn
              href="/register"
              className="inline-flex items-center gap-3 bg-[#d4af37] text-[#060d1a] font-bold text-xl px-14 py-5 rounded-full shadow-[0_0_60px_rgba(212,175,55,0.4)] hover:shadow-[0_0_100px_rgba(212,175,55,0.6)] transition-shadow duration-500 cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">ابدأ رحلتك الآن</span>
              <Plane className="w-6 h-6 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-white/25"
                initial={{ x: "100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </MagneticBtn>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
