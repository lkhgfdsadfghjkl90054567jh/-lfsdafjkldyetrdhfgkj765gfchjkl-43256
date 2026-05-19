import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 60,
  r: Math.random() * 1.5 + 0.5,
  dur: Math.random() * 4 + 3,
  delay: Math.random() * 3,
}));

const clouds = [
  { x: 10, y: 40, w: 160, opacity: 0.06 },
  { x: 55, y: 20, w: 200, opacity: 0.04 },
  { x: 30, y: 60, w: 140, opacity: 0.05 },
  { x: 75, y: 45, w: 180, opacity: 0.05 },
];

export function SkyTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const nightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.6, 0.3, 0]);
  const dawnOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.5, 1, 0.5, 0]);
  const dayOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9, 1], [0, 0.5, 1, 1]);
  const sunY = useTransform(scrollYProgress, [0.4, 0.9], ["120%", "20%"]);
  const moonY = useTransform(scrollYProgress, [0, 0.4], ["-10%", "120%"]);
  const cloudX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const cloudX2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden">
      {/* Night sky */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: nightOpacity,
          background: "linear-gradient(180deg, #060d1a 0%, #0a1628 60%, #111c35 100%)",
        }}
      >
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* Moon */}
        <motion.div
          className="absolute left-3/4 w-14 h-14"
          style={{ y: moonY }}
        >
          <div className="w-full h-full rounded-full bg-amber-100/80 shadow-[0_0_30px_rgba(255,230,150,0.4)]" />
          <div className="absolute top-1 right-1 w-11 h-11 rounded-full bg-[#060d1a]" />
        </motion.div>
      </motion.div>

      {/* Dawn */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: dawnOpacity,
          background: "linear-gradient(180deg, #1a0a2e 0%, #4a1a2e 30%, #c4502a 65%, #e87030 85%, #f5a030 100%)",
        }}
      />

      {/* Day sky */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: dayOpacity,
          background: "linear-gradient(180deg, #0a2060 0%, #1a4080 40%, #2060a0 70%, #4090c0 90%, #60b0d0 100%)",
        }}
      />

      {/* Sun */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-20 h-20"
        style={{ y: sunY, opacity: dayOpacity }}
      >
        <div className="w-full h-full rounded-full bg-yellow-200 shadow-[0_0_60px_rgba(255,220,50,0.6),0_0_120px_rgba(255,180,30,0.3)]" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-yellow-200/50 origin-bottom rounded-full"
            style={{ transform: `translate(-50%, -100%) rotate(${deg}deg) translateY(-100%)` }}
          />
        ))}
      </motion.div>

      {/* Clouds */}
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            x: i % 2 === 0 ? cloudX1 : cloudX2,
            opacity: dawnOpacity,
          }}
        >
          <svg width={c.w} height={c.w * 0.4} viewBox="0 0 200 80">
            <ellipse cx="100" cy="60" rx="100" ry="30" fill="white" opacity={c.opacity * 8} />
            <ellipse cx="80" cy="50" rx="60" ry="25" fill="white" opacity={c.opacity * 6} />
            <ellipse cx="120" cy="45" rx="50" ry="22" fill="white" opacity={c.opacity * 5} />
          </svg>
        </motion.div>
      ))}

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <motion.p
            className="text-white/50 text-sm tracking-[0.25em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            كل يوم فرصة جديدة
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            سماؤك تنتظرك
          </motion.h2>
        </div>
      </div>
    </div>
  );
}
