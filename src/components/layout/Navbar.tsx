import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import type { Lang } from "@/i18n/translations";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/",         label: t.nav.home },
    { href: "/programs", label: t.nav.programs },
    { href: "/about",    label: t.nav.about },
    { href: "/career",   label: t.nav.career },
    { href: "/contact",  label: t.nav.contact },
  ];

  const langs: { code: Lang; label: string; flag: string }[] = [
    { code: "ar", label: "العربية", flag: "🇩🇿" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English",  flag: "🇬🇧" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#060d1a]/85 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_0_rgba(212,175,55,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors duration-300">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M21 12L7 5L5 8.5L10 12L5 15.5L7 19L21 12Z" fill="#d4af37" />
              </svg>
            </div>
            <div>
              <span
                className="text-xl font-bold text-[#d4af37] leading-none block"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}
              >
                جلنار
              </span>
              <span
                className="text-[10px] text-white/35 tracking-[0.18em] uppercase leading-none"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Academy
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group"
                  style={{ color: active ? "#d4af37" : "rgba(255,255,255,0.6)" }}
                >
                  <span className="relative z-10 hover:text-white transition-colors duration-200">
                    {link.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20"
                      transition={{ type: "spring", stiffness: 380, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm"
              >
                <Globe size={15} />
                <span style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {langs.find((l) => l.code === lang)?.flag}
                </span>
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-12 right-0 bg-[#0d1b2e] border border-white/10 rounded-xl shadow-xl overflow-hidden w-36 z-50"
                    onMouseLeave={() => setShowLangMenu(false)}
                  >
                    {langs.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                          lang === l.code
                            ? "text-[#d4af37] bg-[#d4af37]/8"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link href="/register">
              <motion.span
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(212,175,55,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#d4af37] text-[#060d1a] font-bold text-sm px-7 py-2.5 rounded-full cursor-pointer shadow-[0_0_16px_rgba(212,175,55,0.2)] transition-shadow duration-300"
              >
                {t.nav.register}
              </motion.span>
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="القائمة"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#060d1a]/95 backdrop-blur-xl border-b border-white/8 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
              {links.map((link) => {
                const active = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium px-4 py-3 rounded-xl transition-colors duration-200 ${
                      active
                        ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Mobile language switcher */}
              <div className="flex gap-2 mt-2">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex-1 py-2 rounded-lg text-sm transition-colors duration-150 ${
                      lang === l.code
                        ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                        : "bg-white/4 text-white/50 border border-white/8"
                    }`}
                  >
                    {l.flag} {l.code.toUpperCase()}
                  </button>
                ))}
              </div>

              <Link href="/register" onClick={() => setIsOpen(false)} className="mt-3">
                <span className="block w-full text-center bg-[#d4af37] text-[#060d1a] font-bold py-3 rounded-xl cursor-pointer">
                  {t.nav.register}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
