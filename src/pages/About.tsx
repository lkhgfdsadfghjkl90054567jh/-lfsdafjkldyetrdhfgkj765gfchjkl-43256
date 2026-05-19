import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { ShieldCheck, Award, Target, Globe, Plane, Users, BookOpen, Star } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

import aboutImg    from "@assets/C931F5CD-A232-4FA8-8EEE-71766C91243E_1778701721058.png";
import partnerImg  from "@assets/90CE95D8-EA05-4ADE-A382-D0A7E95C9A1D_1778701721058.png";
import heroImg     from "@assets/5E2F4A3F-1A1B-41B1-8AF6-70F7BEAA637D_1778701721058.png";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const timeline = [
  { year: "2014", title: "التأسيس", desc: "أُسِّس معهد جلنار الدولي بمبادرة من خبراء الطيران الجزائريين برؤية واضحة: تخريج كوادر منافسة على المستوى العالمي." },
  { year: "2016", title: "الاعتماد الرسمي", desc: "حصول المعهد على الاعتماد الرسمي من سلطة ضبط الطيران المدني الجزائري (DACM)، وهو أول خطوة نحو المعايير الدولية." },
  { year: "2018", title: "الشراكة الملكية", desc: "توقيع اتفاقية الوكالة الحصرية مع أكاديمية الطيران الملكية الأردنية — أحد أعرق مراكز تدريب الطيران في العالم العربي." },
  { year: "2021", title: "التوسع وإطلاق برامج جديدة", desc: "إطلاق برنامج مهندس صيانة الطائرات ووكيل المطار، مع توسيع الطاقة الاستيعابية لاستقبال دفعات أكبر." },
  { year: "2024", title: "500+ خريج", desc: "تجاوز عدد الخريجين حاجز 500 متدرب موزعين على كبرى شركات الطيران العالمية، بمعدل توظيف يفوق 95%." },
];

const values = [
  { icon: ShieldCheck, title: "السلامة أولاً",     desc: "كل محتوى تدريبي لدينا يُبنى حول مبدأ السلامة الجوية؛ لأن ما نُدرِّسه يُنقذ أرواحاً في السماء." },
  { icon: Award,       title: "التميز والجودة",    desc: "نعتمد أحدث المناهج العالمية ونُحدِّثها باستمرار لمواكبة معايير IATA وEASA وFAA." },
  { icon: Target,      title: "التطوير المستمر",   desc: "مدرّبونا يتلقّون تكويناً مستمراً لضمان أن طلابنا يحصلون دائماً على أحدث المعارف والممارسات." },
  { icon: Globe,       title: "الانفتاح الدولي",   desc: "شراكات استراتيجية مع مؤسسات من الأردن، الإمارات، وفرنسا تفتح أمام طلابنا آفاقاً غير محدودة." },
  { icon: Users,       title: "روح الفريق",        desc: "نُنمّي لدى طلابنا مهارات العمل الجماعي والقيادة — وهي ضرورة حتمية في بيئة الطيران." },
  { icon: BookOpen,    title: "التعليم الشامل",    desc: "نجمع بين النظرية والتطبيق الميداني في بيئة محاكاة حقيقية لإعداد متكامل قبل الانضمام لسوق العمل." },
];

const stats = [
  { num: "500+", label: "خريج متميز" },
  { num: "10+",  label: "سنوات خبرة" },
  { num: "95%",  label: "معدل التوظيف" },
  { num: "15+",  label: "شريك دولي" },
];

const team = [
  { name: "كابتن يوسف بن علي",    role: "المدير العام — طيار A320 سابق",         initial: "ي" },
  { name: "د. سلمى بوزيد",         role: "رئيسة القسم الأكاديمي",                 initial: "س" },
  { name: "كابتن رشيد قاسمي",     role: "مدرّب طيران — 18 سنة خبرة",             initial: "ر" },
  { name: "أ. لينا العمري",        role: "خبيرة سلامة الطيران — IATA معتمدة",      initial: "ل" },
];

export default function About() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY     = useTransform(heroScroll, [0, 1], ["0%", "35%"]);
  const heroScale = useTransform(heroScroll, [0, 1], [1.05, 1.14]);
  const heroOp    = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="w-full bg-[#060d1a] text-white">

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <img src={heroImg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/30 via-[#060d1a]/50 to-[#060d1a]" />
          <div className="absolute inset-0 bg-[#060d1a]/30" />
        </motion.div>

        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ opacity: heroOp }}>
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#d4af37]/60 text-xs tracking-[0.35em] uppercase mb-6 font-display"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Our Story · قصتنا
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              {t.about.fixed_title}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="text-xl text-white/55 max-w-2xl mx-auto leading-relaxed"
          >
            أكاديمية الطيران الأولى في الجزائر — نصنع أجيالاً تقود السماء بثقة
          </motion.p>
        </motion.div>
      </section>

      {/* ══ MISSION STATEMENT ══ */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-4 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>Mission</p>
            <blockquote className="text-3xl md:text-5xl font-bold text-white leading-relaxed">
              "نؤمن بأن كل جزائري يحمل في داخله
              <span className="text-[#d4af37]"> طيّاراً</span> ينتظر الجناح المناسب"
            </blockquote>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((s, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="text-center border border-white/6 rounded-2xl py-8 px-4 bg-white/[0.02]">
                  <p className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2 font-display" style={{ fontFamily: "'Outfit', sans-serif" }} dir="ltr">{s.num}</p>
                  <p className="text-white/50 text-sm">{s.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STORY — SPLIT ══ */}
      <section className="py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeUp className="relative order-last lg:order-first">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img src={aboutImg} alt="معهد جلنار" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 right-8 left-8">
                  <div className="w-12 h-px bg-[#d4af37] mb-4" />
                  <p className="text-xl font-bold text-white italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    "نصنع أجيالاً تقود السماء بثقة"
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-[#d4af37] text-[#060d1a] px-6 py-4 rounded-2xl shadow-xl"
              >
                <p className="font-bold text-sm">اعتماد رسمي</p>
                <p className="text-[10px] opacity-70 mt-0.5">DACM — الجزائر</p>
              </motion.div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-[#d4af37]/50 text-xs tracking-[0.3em] uppercase mb-4 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>About us</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                التميز في التدريب <br />
                <span className="text-[#d4af37]">نحو العالمية</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                تأسّس معهد جلنار الدولي عام 2014 بهدف واضح: سدّ الفجوة بين الطلب المتزايد على الكوادر المؤهّلة في قطاع الطيران المدني الجزائري وبين مخرجات التعليم التقليدي.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                اليوم، نفخر بكوننا المعهد الرائد المعتمد من سلطة ضبط الطيران المدني الجزائري، والوكيل الحصري لأكاديمية الطيران الملكية الأردنية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-[#d4af37] text-[#060d1a] font-bold px-8 py-3.5 rounded-full cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                    سجل الآن
                  </motion.span>
                </Link>
                <Link href="/programs">
                  <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:border-[#d4af37]/40 hover:text-white px-8 py-3.5 rounded-full cursor-pointer transition-colors">
                    برامجنا
                  </motion.span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-3 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>Timeline</p>
            <h2 className="text-4xl md:text-5xl font-bold">مسيرة نجاح</h2>
          </FadeUp>
          <div className="relative">
            <div className="absolute right-[19px] top-0 bottom-0 w-px bg-[#d4af37]/15 hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="flex gap-8 items-start">
                    <div className="flex-shrink-0 flex flex-col items-center gap-2 w-20">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center relative z-10">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                      </div>
                      <p className="text-[#d4af37] font-bold text-sm font-display" style={{ fontFamily: "'Outfit', sans-serif" }} dir="ltr">{item.year}</p>
                    </div>
                    <div className="flex-1 border border-white/6 bg-white/[0.02] rounded-2xl p-6 hover:border-[#d4af37]/20 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/55 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="py-24 border-y border-white/5" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.04), transparent)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-3 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>Values</p>
            <h2 className="text-4xl md:text-5xl font-bold">قيمنا ومبادئنا</h2>
            <p className="text-white/45 mt-4 max-w-2xl mx-auto">نلتزم بأعلى معايير الجودة والمهنية في كل تفاصيل عملنا الأكاديمي والتدريبي.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <motion.div whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.25)" }} transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/6 cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-6">
                    <val.icon className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{val.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ══ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeUp>
              <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-4 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>Certifications</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                اعتمادات <br />
                <span className="text-[#d4af37]">وشراكات استراتيجية</span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-10">
                نفتخر بشبكة واسعة من الشراكات مع كبرى المؤسسات الأكاديمية وشركات الطيران.
              </p>
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, title: "سلطة ضبط الطيران المدني الجزائري (DACM)", desc: "اعتماد رسمي كامل لجميع برامجنا التدريبية." },
                  { icon: Globe,       title: "أكاديمية الطيران الملكية الأردنية",       desc: "الوكيل الحصري والوحيد للأكاديمية في الجزائر." },
                  { icon: Plane,       title: "الخطوط الجوية الجزائرية وطاسيلي",         desc: "شراكات للتدريب العملي الميداني في بيئة حقيقية." },
                  { icon: Star,        title: "معايير IATA الدولية",                     desc: "مناهجنا مبنية وفق المعايير الدولية لرابطة النقل الجوي." },
                ].map((cert, i) => (
                  <FadeUp key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/6 hover:border-[#d4af37]/20 transition-colors duration-300">
                      <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                        <cert.icon className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="font-bold text-white mb-1">{cert.title}</p>
                        <p className="text-white/45 text-sm">{cert.desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.2} className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img src={partnerImg} alt="شراكات جلنار" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-overlay" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-24 border-t border-white/5 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-3 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>Team</p>
            <h2 className="text-4xl md:text-5xl font-bold">فريقنا التدريبي</h2>
            <p className="text-white/45 mt-4 max-w-xl mx-auto">مدرّبون معتمدون دولياً بعشرات آلاف ساعات الطيران والخبرة الأكاديمية المتراكمة.</p>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/6 hover:border-[#d4af37]/25 transition-colors duration-300 cursor-default">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#d4af37]">{member.initial}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug mb-2">{member.name}</h4>
                  <p className="text-[#d4af37]/55 text-[11px] leading-relaxed">{member.role}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LOCATION + CTA ══ */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-4 font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>Location</p>
              <h2 className="text-4xl font-bold mb-6">أين نتواجد؟</h2>
              <p className="text-white/55 text-lg leading-relaxed mb-8">
                يقع المقر الرئيسي للمعهد في منطقة <strong className="text-white">الستاوالي</strong>، غرب الجزائر العاصمة، مجهّز بأحدث الفصول الدراسية ومعدات التدريب والمحاكاة.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <motion.span whileHover={{ scale: 1.03 }}
                    className="inline-flex items-center gap-2 bg-[#d4af37] text-[#060d1a] font-bold px-8 py-3.5 rounded-full cursor-pointer">
                    تواصل معنا
                  </motion.span>
                </Link>
                <Link href="/register">
                  <motion.span whileHover={{ scale: 1.03 }}
                    className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:border-[#d4af37]/40 hover:text-white px-8 py-3.5 rounded-full cursor-pointer transition-colors">
                    سجل الآن
                  </motion.span>
                </Link>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/8 aspect-[16/10]">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.7%2C36.7%2C2.9%2C36.82&layer=mapnik&marker=36.76%2C2.80"
                  className="w-full h-full"
                  style={{ filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)" }}
                  title="موقع معهد جلنار"
                  loading="lazy"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
