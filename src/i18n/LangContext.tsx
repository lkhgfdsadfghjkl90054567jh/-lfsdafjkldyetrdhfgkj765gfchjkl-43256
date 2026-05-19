import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations } from "./translations";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)[Lang];
  dir: "rtl" | "ltr";
}

const LangContext = createContext<LangContextType>({
  lang: "ar",
  setLang: () => {},
  t: translations["ar"],
  dir: "rtl",
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("djulnar-lang") as Lang) || "ar";
    }
    return "ar";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("djulnar-lang", l);
    document.documentElement.dir = translations[l].dir;
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], dir: translations[lang].dir as "rtl" | "ltr" }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
