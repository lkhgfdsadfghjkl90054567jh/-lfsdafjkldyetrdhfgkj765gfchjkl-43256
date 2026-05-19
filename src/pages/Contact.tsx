import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send, CheckCircle2 } from "lucide-react";
import { sendToSheets } from "@/lib/sheets";
import { useLang } from "@/i18n/LangContext";

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

const contactCards = [
  { icon: Phone,   title: "أرقام الهاتف",       lines: ["+213 770 22 87 18", "+213 770 22 87 38", "+213 770 22 87 77", "+213 770 22 87 80"], dir: "ltr" as const },
  { icon: Mail,    title: "البريد الإلكتروني",   lines: ["contact@djulnar.com", "inscription@djulnar.com"],                                  dir: "ltr" as const },
  { icon: MapPin,  title: "العنوان",              lines: ["شارع أحمد مالك، الستاوالي", "الجزائر العاصمة، الجزائر"],                           dir: "rtl" as const },
  { icon: Clock,   title: "ساعات العمل",          lines: ["الأحد – الخميس: 08:30 – 16:30", "الجمعة – السبت: مغلق"],                           dir: "rtl" as const },
];

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await sendToSheets({
      type: "contact",
      name: formData.name,
      contact: formData.contact,
      message: formData.message,
      submittedAt: new Date().toLocaleString("ar-DZ"),
    });
    setSending(false);
    setSent(true);
  };

  return (
    <div className="w-full bg-[#060d1a] text-white">

      {/* ══ HERO HEADER ══ */}
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4af37]/4 blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 px-6">
          <motion.p
            initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#d4af37]/50 text-xs tracking-[0.35em] uppercase mb-5"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            Contact Us · تواصل معنا
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1 className="text-5xl md:text-7xl font-bold"
              initial={{ y: "100%" }} animate={{ y: "0%" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}>
              تواصل معنا
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }}
            className="text-white/45 text-lg max-w-xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتك
          </motion.p>
        </div>
      </section>

      {/* ══ CONTACT CARDS ══ */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/6 hover:border-[#d4af37]/20 transition-colors duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-5">
                  <card.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <h3 className="font-bold text-white mb-4 text-sm">{card.title}</h3>
                {card.lines.map((line, li) => (
                  <p key={li} className="text-white/45 text-sm leading-relaxed" dir={card.dir}>{line}</p>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ FORM + SOCIAL ══ */}
      <section className="py-20 border-t border-white/5 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* Form */}
          <FadeUp>
            <h2 className="text-3xl font-bold mb-8">أرسل لنا رسالة</h2>

            {sent ? (
              <div className="text-center py-16 border border-[#d4af37]/20 rounded-3xl bg-[#d4af37]/[0.03]">
                <CheckCircle2 className="w-14 h-14 text-[#d4af37] mx-auto mb-5" />
                <p className="text-lg font-bold text-white">{t.contact.success_msg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-white/70 mb-2">الاسم الكامل *</label>
                  <input name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#d4af37]/40 transition-colors"
                    placeholder="اسمك الكريم" />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">رقم الهاتف أو البريد *</label>
                  <input name="contact" value={formData.contact} onChange={handleChange} required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#d4af37]/40 transition-colors"
                    placeholder="+213 7XX XX XX XX" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">رسالتك *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#d4af37]/40 transition-colors resize-none"
                    placeholder="كيف يمكننا مساعدتك؟" />
                </div>
                <motion.button type="submit" disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.02 }} whileTap={{ scale: sending ? 1 : 0.97 }}
                  className="w-full flex items-center justify-center gap-3 bg-[#d4af37] text-[#060d1a] font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] transition-shadow disabled:opacity-60">
                  {sending ? (
                    <><span className="w-5 h-5 border-2 border-[#060d1a]/30 border-t-[#060d1a] rounded-full animate-spin" /> جارٍ الإرسال...</>
                  ) : (
                    <><Send className="w-5 h-5" /> إرسال الرسالة</>
                  )}
                </motion.button>
              </form>
            )}
          </FadeUp>

          {/* Social + WhatsApp */}
          <FadeUp delay={0.15}>
            <h2 className="text-3xl font-bold mb-8">تابعنا</h2>
            <div className="space-y-4">
              {[
                { Icon: Facebook,  label: "Facebook",  href: "https://www.facebook.com/julnarplus",        handle: "julnarplus" },
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/djulnar_center",   handle: "djulnar_center" },
                { Icon: Youtube,   label: "YouTube",   href: "https://www.youtube.com/@djulnarinstitute",  handle: "@djulnarinstitute" },
              ].map(({ Icon, label, href, handle }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/6 hover:border-[#d4af37]/25 hover:bg-[#d4af37]/[0.03] transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{label}</p>
                    <p className="text-white/40 text-xs mt-0.5" dir="ltr">{handle}</p>
                  </div>
                </a>
              ))}

              {/* WhatsApp */}
              <a href="https://wa.me/213770228738" target="_blank" rel="noreferrer"
                className="flex items-center gap-5 p-5 rounded-2xl bg-[#25d366]/5 border border-[#25d366]/15 hover:border-[#25d366]/35 hover:bg-[#25d366]/10 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-[#25d366]/15 border border-[#25d366]/25 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#25d366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#25d366] text-sm">WhatsApp</p>
                  <p className="text-white/40 text-xs mt-0.5" dir="ltr">+213 770 22 87 38</p>
                </div>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
