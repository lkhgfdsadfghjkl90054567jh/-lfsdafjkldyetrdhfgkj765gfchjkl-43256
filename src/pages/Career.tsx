import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Send, CheckCircle2, Users, TrendingUp, Heart } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { sendToSheets } from "@/lib/sheets";

import heroImg from "@assets/5E2F4A3F-1A1B-41B1-8AF6-70F7BEAA637D_1778701721058.png";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}>
      {children}
    </motion.div>
  );
}

const perkIcons = [Users, TrendingUp, Heart];

export default function Career() {
  const { t } = useLang();
  const c = t.career;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [openJob, setOpenJob] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", position: "", experience: "", motivation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await sendToSheets({
      type: "career",
      ...form,
      submittedAt: new Date().toLocaleString("ar-DZ"),
    });
    setSending(false);
    setSent(true);
  };

  return (
    <div className="w-full bg-[#060d1a] text-white">

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src={heroImg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/40 via-[#060d1a]/55 to-[#060d1a]" />
        </motion.div>
        <motion.div className="relative z-10 text-center px-6 max-w-4xl" style={{ opacity: heroOp }}>
          <motion.p
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#d4af37]/60 text-xs tracking-[0.35em] uppercase mb-5"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            {c.hero_label}
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1 className="text-5xl md:text-7xl font-bold"
              initial={{ y: "100%" }} animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>
              {c.hero_title}
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }}
            className="text-xl text-white/50 max-w-2xl mx-auto">
            {c.hero_sub}
          </motion.p>
        </motion.div>
      </section>

      {/* ══ WHY JOIN US ══ */}
      <section className="py-24 px-6" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(212,175,55,0.04), transparent)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Why Us</p>
            <h2 className="text-4xl md:text-5xl font-bold">{c.why_title}</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {c.perks.map((perk, i) => {
              const Icon = perkIcons[i];
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.25)" }} transition={{ duration: 0.3 }}
                    className="p-8 rounded-2xl bg-white/[0.02] border border-white/6 cursor-default text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{perk.title}</h3>
                    <p className="text-white/50 leading-relaxed text-sm">{perk.desc}</p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ OPEN POSITIONS ══ */}
      <section className="py-24 border-t border-white/5 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Open Roles</p>
            <h2 className="text-4xl md:text-5xl font-bold">{c.open_positions}</h2>
            <p className="text-white/45 mt-4 max-w-xl mx-auto">{c.open_positions_sub}</p>
          </FadeUp>

          <div className="space-y-4">
            {c.jobs.map((job, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openJob === i ? "border-[#d4af37]/30 bg-[#d4af37]/[0.03]" : "border-white/6 bg-white/[0.015] hover:border-white/12"
                }`}>
                  {/* Header */}
                  <button
                    className="w-full flex items-center justify-between p-6 text-right"
                    onClick={() => setOpenJob(openJob === i ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div className="text-right">
                        <h3 className="text-lg font-bold text-white">{job.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1.5 text-white/40 text-xs">
                            <Clock size={12} /> {job.type}
                          </span>
                          <span className="flex items-center gap-1.5 text-white/40 text-xs">
                            <MapPin size={12} /> {job.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: openJob === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="w-5 h-5 text-white/30" />
                    </motion.div>
                  </button>

                  {/* Expandable details */}
                  <motion.div
                    initial={false}
                    animate={{ height: openJob === i ? "auto" : 0, opacity: openJob === i ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-white/6 pt-5">
                      <p className="text-white/50 text-sm mb-4 font-medium">المتطلبات:</p>
                      <ul className="space-y-2.5">
                        {job.req.map((r, ri) => (
                          <li key={ri} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                            <span className="text-white/65 text-sm">{r}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => document.getElementById("career-form")?.scrollIntoView({ behavior: "smooth" })}
                        className="mt-6 inline-flex items-center gap-2 text-[#d4af37] font-bold text-sm hover:gap-3 transition-all duration-200"
                      >
                        {c.apply} <Send size={14} />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APPLICATION FORM ══ */}
      <section id="career-form" className="py-24 border-t border-white/5 px-6">
        <div className="max-w-2xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Apply</p>
            <h2 className="text-4xl md:text-5xl font-bold">{c.apply_btn}</h2>
          </FadeUp>

          {sent ? (
            <FadeUp>
              <div className="text-center py-20 border border-[#d4af37]/20 rounded-3xl bg-[#d4af37]/[0.03]">
                <CheckCircle2 className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
                <p className="text-xl font-bold text-white mb-2">{c.success}</p>
                <Link href="/">
                  <motion.span whileHover={{ scale: 1.03 }}
                    className="inline-flex mt-8 items-center gap-2 bg-[#d4af37] text-[#060d1a] font-bold px-8 py-3 rounded-full cursor-pointer">
                    العودة للرئيسية
                  </motion.span>
                </Link>
              </div>
            </FadeUp>
          ) : (
            <FadeUp>
              <form onSubmit={handleSubmit} className="space-y-5 bg-white/[0.02] border border-white/6 rounded-3xl p-8">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">{c.full_name} *</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d4af37]/40 transition-colors"
                      placeholder="اسمك الكامل" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">{c.phone} *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required type="tel"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d4af37]/40 transition-colors"
                      placeholder="+213 7XX XX XX XX" dir="ltr" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">{c.email} *</label>
                  <input name="email" value={form.email} onChange={handleChange} required type="email"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d4af37]/40 transition-colors"
                    placeholder="example@email.com" dir="ltr" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">{c.position} *</label>
                    <select name="position" value={form.position} onChange={handleChange} required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/40 transition-colors appearance-none">
                      <option value="" className="bg-[#060d1a]">اختر الوظيفة...</option>
                      {c.jobs.map((job, i) => (
                        <option key={i} value={job.title} className="bg-[#060d1a]">{job.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">{c.experience} *</label>
                    <select name="experience" value={form.experience} onChange={handleChange} required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/40 transition-colors appearance-none">
                      <option value="" className="bg-[#060d1a]">اختر...</option>
                      <option value="0-2" className="bg-[#060d1a]">0 – 2 سنوات</option>
                      <option value="3-5" className="bg-[#060d1a]">3 – 5 سنوات</option>
                      <option value="5-10" className="bg-[#060d1a]">5 – 10 سنوات</option>
                      <option value="10+" className="bg-[#060d1a]">أكثر من 10 سنوات</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">{c.motivation}</label>
                  <textarea name="motivation" value={form.motivation} onChange={handleChange} rows={5}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d4af37]/40 transition-colors resize-none"
                    placeholder="لماذا تريد الانضمام لفريق جلنار؟" />
                </div>

                <motion.button type="submit" disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.02 }}
                  whileTap={{ scale: sending ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-[#d4af37] text-[#060d1a] font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] transition-shadow disabled:opacity-60">
                  {sending ? (
                    <><span className="w-5 h-5 border-2 border-[#060d1a]/30 border-t-[#060d1a] rounded-full animate-spin" /> {c.sending}</>
                  ) : (
                    <><Send className="w-5 h-5" /> {c.send}</>
                  )}
                </motion.button>
              </form>
            </FadeUp>
          )}
        </div>
      </section>
    </div>
  );
}
