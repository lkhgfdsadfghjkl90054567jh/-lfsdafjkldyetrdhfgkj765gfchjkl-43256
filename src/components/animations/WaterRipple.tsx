import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface WaterRippleProps {
  src: string;
  alt?: string;
  className?: string;
}

export function WaterRipple({ src, alt = "", className = "" }: WaterRippleProps) {
  const filterId = useRef(`water-${Math.random().toString(36).slice(2)}`).current;
  const freqX = useMotionValue(0);
  const freqY = useMotionValue(0);
  const sFreqX = useSpring(freqX, { stiffness: 80, damping: 20 });
  const sFreqY = useSpring(freqY, { stiffness: 80, damping: 20 });
  const scaleVal = useMotionValue(1);
  const sScale = useSpring(scaleVal, { stiffness: 120, damping: 18 });

  const rafRef = useRef<number | undefined>(undefined);
  const frameRef = useRef(0);

  const startRipple = useCallback(() => {
    freqX.set(0.018);
    freqY.set(0.012);
    scaleVal.set(1.04);

    let t = 0;
    const animate = () => {
      t += 0.04;
      freqX.set(0.018 + Math.sin(t * 1.3) * 0.006);
      freqY.set(0.012 + Math.cos(t * 0.9) * 0.005);
      frameRef.current++;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  }, [freqX, freqY, scaleVal]);

  const stopRipple = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    freqX.set(0);
    freqY.set(0);
    scaleVal.set(1);
  }, [freqX, freqY, scaleVal]);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} onMouseEnter={startRipple} onMouseLeave={stopRipple}>
      {/* SVG filter definition */}
      <svg className="absolute w-0 h-0" aria-hidden>
        <defs>
          <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              id={`turb-${filterId}`}
              type="turbulence"
              baseFrequency="0 0"
              numOctaves="3"
              seed="2"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Animated filter values via motion values → inline style */}
      <AnimatedFilter filterId={filterId} freqX={sFreqX} freqY={sFreqY} />

      <motion.img
        src={src}
        alt={alt}
        style={{ scale: sScale }}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Shimmer overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function AnimatedFilter({ filterId, freqX, freqY }: { filterId: string; freqX: any; freqY: any }) {
  const feTurbRef = useRef<SVGFETurbulenceElement>(null);

  freqX.on("change", (v: number) => {
    if (feTurbRef.current) {
      const fy = freqY.get();
      feTurbRef.current.setAttribute("baseFrequency", `${v} ${fy}`);
    }
  });

  freqY.on("change", (v: number) => {
    if (feTurbRef.current) {
      const fx = freqX.get();
      feTurbRef.current.setAttribute("baseFrequency", `${fx} ${v}`);
    }
  });

  return (
    <svg className="absolute w-0 h-0" aria-hidden>
      <defs>
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            ref={feTurbRef}
            type="turbulence"
            baseFrequency="0 0"
            numOctaves="3"
            seed="2"
            result="turb"
          />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
