import { Link } from "wouter";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

export function Footer() {
  const { t } = useLang();

  const quickLinks = [
    { href: "/",         label: t.nav.home },
    { href: "/programs", label: t.nav.programs },
    { href: "/about",    label: t.nav.about },
    { href: "/career",   label: t.nav.career },
    { href: "/contact",  label: t.nav.contact },
    { href: "/register", label: t.nav.register },
  ];

  const programs = [
    t.programs.css,
    t.programs.dispatcher,
    t.programs.agent,
    t.programs.maintenance,
  ];

  return (
    <footer className="border-t border-white/6 pt-16 pb-8" style={{ background: "#04090f" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M21 12L7 5L5 8.5L10 12L5 15.5L7 19L21 12Z" fill="#d4af37" />
                </svg>
              </div>
              <span
                className="text-2xl font-bold text-[#d4af37]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                جلنار
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/julnarplus" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-white/40 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30 hover:text-[#d4af37] transition-all duration-200">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/djulnar_center" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-white/40 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30 hover:text-[#d4af37] transition-all duration-200">
                <Instagram size={16} />
              </a>
              <a href="https://www.youtube.com/@djulnarinstitute" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-white/40 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/30 hover:text-[#d4af37] transition-all duration-200">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white/70 uppercase tracking-[0.18em] mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/40 hover:text-[#d4af37] transition-colors duration-200 text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-bold text-white/70 uppercase tracking-[0.18em] mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.footer.programs}
            </h3>
            <ul className="space-y-3">
              {programs.map((name) => (
                <li key={name}>
                  <Link href="/programs" className="text-white/40 hover:text-[#d4af37] transition-colors duration-200 text-sm">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white/70 uppercase tracking-[0.18em] mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#d4af37]/60 mt-0.5 shrink-0" size={15} />
                <span className="text-white/40 text-sm leading-relaxed">شارع أحمد مالك، الستاوالي، الجزائر العاصمة</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#d4af37]/60 shrink-0" size={15} />
                <a href="tel:+213770228718" className="text-white/40 text-sm hover:text-[#d4af37] transition-colors" dir="ltr">
                  0770 22 87 18 / 38
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#d4af37]/60 shrink-0" size={15} />
                <a href="mailto:contact@djulnar.com" className="text-white/40 text-sm hover:text-[#d4af37] transition-colors">
                  contact@djulnar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} معهد جلنار الدولي. {t.footer.rights}.
          </p>
          <p className="text-white/20 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Djulnar International Academy · Algeria
          </p>
        </div>
      </div>
    </footer>
  );
}
