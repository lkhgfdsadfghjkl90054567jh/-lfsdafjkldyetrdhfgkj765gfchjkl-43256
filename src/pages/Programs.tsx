import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { Plane, Users, GraduationCap, Trophy, Clock, CheckCircle2, Award, ArrowLeft } from "lucide-react";

import programImg from "@assets/C931F5CD-A232-4FA8-8EEE-71766C91243E_1778701721058.png";
import heroImg    from "@assets/5E2F4A3F-1A1B-41B1-8AF6-70F7BEAA637D_1778701721058.png";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const programs = [
  {
    id: "css",
    title: "مضيف/ة طيران",
    subtitle: "Cabin Crew (CSS)",
    icon: Plane,
    color: "#d4af37",
    duration: "3 – 6 أشهر",
    hours: "120 ساعة تدريبية",
    badge: "الأكثر طلباً",
    description: "برنامج متكامل لتأهيل مضيفي الطيران وفق المعايير الدولية للسلامة وجودة الخدمات. يشمل التدريب النظري والعملي على أحدث المعدات في بيئة محاكاة احترافية.",
    features: [
      "شهادة معتمدة دولياً",
      "تدريب عملي على الإخلاء والطوارئ",
      "الإسعافات الأولية للطيران",
      "خدمة العملاء لكبار الشخصيات",
      "بروتوكول المظهر واللباس المهني",
      "إدارة المسافرين ذوي الاحتياجات الخاصة",
    ],
  },
  {
    id: "dispatcher",
    title: "مرحّل جوي",
    subtitle: "Flight Dispatcher",
    icon: Trophy,
    color: "#a78bfa",
    duration: "6 أشهر",
    hours: "200 ساعة تدريبية",
    badge: "مؤهل عالي",
    description: "تأهيل متخصصين في تخطيط ومتابعة الرحلات الجوية. يُعدّ المرحّل الجوي الطيّار الأرضي ويتحمل مسؤولية مشتركة مع الطيّار في سلامة وكفاءة الرحلة.",
    features: [
      "تخطيط مسارات الطيران الدولية",
      "دراسة الأرصاد الجوية للطيران",
      "إدارة الوقود والأحمال",
      "قوانين وأنظمة الطيران المدني",
      "متابعة الرحلات والتواصل مع الطاقم",
      "التحضير لرخصة ATPL dispatcher",
    ],
  },
  {
    id: "agent",
    title: "وكيل مطار",
    subtitle: "Ground Handling Agent",
    icon: Users,
    color: "#34d399",
    duration: "3 أشهر",
    hours: "90 ساعة تدريبية",
    badge: "توظيف سريع",
    description: "برنامج تدريبي لخدمات المطار الأرضية وإدارة المسافرين من لحظة وصولهم حتى صعودهم للطائرة، مع التركيز على الكفاءة والضيافة.",
    features: [
      "إجراءات تسجيل المسافرين (check-in)",
      "إدارة الأمتعة والمناولة الأرضية",
      "خدمة العملاء الاحترافية",
      "إجراءات الصعود للطائرة (boarding)",
      "التعامل مع حالات الطوارئ",
      "لوائح الأمن الجوي",
    ],
  },
  {
    id: "maintenance",
    title: "مهندس صيانة طائرات",
    subtitle: "Aircraft Maintenance Engineer",
    icon: GraduationCap,
    color: "#f472b6",
    duration: "2 – 3 سنوات",
    hours: "تكوين مكثف",
    badge: "شهادة EASA",
    description: "برنامج هندسي شامل لصيانة هيكل ومحركات الطائرات وإلكترونيات الطيران (Avionics) وفق متطلبات EASA وFAA — أعلى المعايير الدولية.",
    features: [
      "دراسة أنظمة الطائرات والمحركات",
      "الصيانة الوقائية والطارئة",
      "إلكترونيات الطيران (Avionics)",
      "التدريب العملي في ورش معتمدة",
      "التحضير لاختبارات الرخص الدولية",
      "رخصة PART-66 (EASA / DACM)",
    ],
  },
];

export default function Programs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY  = useTransform(heroScroll, [0, 1], ["0%", "35%"]);
  const heroOp = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="w-full bg-[#060d1a] text-white">

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src={heroImg} alt="" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/40 via-[#060d1a]/55 to-[#060d1a]" />
        </motion.div>

        <motion.div className="relative z-10 text-center px-6 max-w-4xl" style={{ opacity: heroOp }}>
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#d4af37]/60 text-xs tracking-[0.35em] uppercase mb-5 font-display"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Training Programs · البرامج التكوينية
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              البرامج التكوينية
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="text-xl text-white/50 max-w-2xl mx-auto"
          >
            أربعة مسارات احترافية تفتح أمامك أبواب سماء العالم
          </motion.p>
        </motion.div>
      </section>

      {/* ══ PROGRAMS LIST ══ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {programs.map((prog, idx) => (
            <FadeUp key={prog.id} delay={idx * 0.07}>
              <motion.div
                whileHover={{ borderColor: `${prog.color}30` }}
                className="rounded-3xl border border-white/6 bg-white/[0.015] overflow-hidden transition-colors duration-500"
              >
                <div className="grid md:grid-cols-[1fr_260px]">
                  {/* Left — details */}
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: `${prog.color}18`, border: `1px solid ${prog.color}30` }}
                        >
                          <prog.icon className="w-6 h-6" style={{ color: prog.color }} />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white">{prog.title}</h2>
                          <p className="text-sm tracking-widest font-display mt-0.5" style={{ color: prog.color, fontFamily: "'Outfit', sans-serif" }}>
                            {prog.subtitle}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full shrink-0 mt-1"
                        style={{ background: `${prog.color}15`, color: prog.color, border: `1px solid ${prog.color}25` }}
                      >
                        {prog.badge}
                      </span>
                    </div>

                    <p className="text-white/55 leading-relaxed mb-8">{prog.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {prog.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: prog.color }} />
                          <span className="text-white/70 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={`/register?program=${prog.id}`}>
                      <motion.span
                        whileHover={{ gap: "14px" }}
                        className="inline-flex items-center gap-2 font-bold text-sm cursor-pointer transition-all duration-300"
                        style={{ color: prog.color }}
                      >
                        التسجيل في البرنامج
                        <ArrowLeft className="w-4 h-4" />
                      </motion.span>
                    </Link>
                  </div>

                  {/* Right — meta */}
                  <div
                    className="flex flex-col justify-center p-8 border-r border-white/5"
                    style={{ background: `${prog.color}06` }}
                  >
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 text-white/35 text-xs mb-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>مدة التكوين</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{prog.duration}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-white/35 text-xs mb-2">
                          <Award className="w-3.5 h-3.5" />
                          <span>الحجم الساعي</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{prog.hours}</p>
                      </div>
                      <div className="pt-6 border-t border-white/8">
                        <p className="font-bold text-sm" style={{ color: prog.color }}>
                          شهادة معتمدة دولياً ✓
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ FAQ / REQUIREMENTS ══ */}
      <section className="py-24 border-t border-white/5 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-3 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>Requirements</p>
            <h2 className="text-4xl font-bold">شروط الالتحاق</h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "السن", desc: "17 إلى 30 سنة لمضيف/ة الطيران — 20 إلى 35 لبقية التخصصات" },
              { title: "المستوى الدراسي", desc: "بكالوريا (مرحلة نهائي مقبول لبعض البرامج)" },
              { title: "اللغات", desc: "مستوى جيد في اللغة الفرنسية والإنجليزية مطلوب" },
              { title: "اللياقة الصحية", desc: "شهادة طبية من طبيب معتمد للطيران المدني" },
              { title: "الطول", desc: "155 سم كحد أدنى لبرنامج مضيف/ة الطيران" },
              { title: "الشخصية", desc: "مقابلة شخصية تقييمية للتواصل والثقة بالنفس" },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/6">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#d4af37] text-xs font-bold font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-28 px-6" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.06), transparent)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              تحتاج للمساعدة في <span className="text-[#d4af37]">الاختيار؟</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              مستشارونا الأكاديميون جاهزون للإجابة على استفساراتك وتوجيهك نحو المسار الذي يناسب طموحاتك ومؤهلاتك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-[#d4af37] text-[#060d1a] font-bold px-10 py-4 rounded-full cursor-pointer shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                >
                  سجّل الآن <ArrowLeft className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:border-[#d4af37]/40 hover:text-white px-10 py-4 rounded-full cursor-pointer transition-colors"
                >
                  تحدث مع مستشار
                </motion.span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
