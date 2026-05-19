import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { LangProvider } from "@/i18n/LangContext";
import { useEffect } from "react";

// Import pages
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import About from "@/pages/About";
import Register from "@/pages/Register";
import Contact from "@/pages/Contact";
import Career from "@/pages/Career";

const queryClient = new QueryClient();

// SEO meta tags setup
function SEOMeta() {
  useEffect(() => {
    // Base SEO
    document.title = "معهد جلنار الدولي | أكاديمية الطيران الأولى في الجزائر";

    const metas: Record<string, string> = {
      description: "معهد جلنار الدولي — أكاديمية الطيران الرائدة في الجزائر. تدريب مضيفي الطيران، المرحّل الجوي، وكيل المطار، ومهندس الصيانة. اعتماد DACM رسمي.",
      keywords: "معهد جلنار، أكاديمية طيران الجزائر، مضيف طيران الجزائر، تدريب طيران، ستاوالي، djulnar, cabin crew algeria, aviation academy algeria",
      "og:title": "معهد جلنار الدولي | أكاديمية الطيران الأولى في الجزائر",
      "og:description": "تدريب احترافي لمضيفي الطيران، المرحّل الجوي، وكيل المطار، ومهندس الصيانة. اعتماد رسمي من DACM — الجزائر.",
      "og:type": "website",
      "og:url": "https://djulnar.com",
      "og:locale": "ar_DZ",
      "og:image": "https://djulnar.com/opengraph.jpg",
      "twitter:card": "summary_large_image",
      "twitter:title": "معهد جلنار الدولي",
      "twitter:description": "أكاديمية الطيران الرائدة في الجزائر",
    };

    Object.entries(metas).forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (name.startsWith("og:") || name.startsWith("twitter:")) {
          el.setAttribute("property", name);
        } else {
          el.setAttribute("name", name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://djulnar.com");

    // Structured data (JSON-LD)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "معهد جلنار الدولي",
      alternateName: "Djulnar International Institute",
      url: "https://djulnar.com",
      logo: "https://djulnar.com/favicon.svg",
      description: "أكاديمية الطيران الرائدة في الجزائر — تدريب مضيفي الطيران والكوادر الجوية",
      address: {
        "@type": "PostalAddress",
        streetAddress: "شارع أحمد مالك، الستاوالي",
        addressLocality: "الجزائر العاصمة",
        addressCountry: "DZ",
      },
      telephone: "+213770228718",
      email: "contact@djulnar.com",
      sameAs: [
        "https://www.facebook.com/julnarplus",
        "https://www.instagram.com/djulnar_center",
        "https://www.youtube.com/@djulnarinstitute",
      ],
    };
    let scriptEl = document.querySelector("#djulnar-jsonld") as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "djulnar-jsonld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/"          component={Home}     />
        <Route path="/programs"  component={Programs} />
        <Route path="/about"     component={About}    />
        <Route path="/register"  component={Register} />
        <Route path="/contact"   component={Contact}  />
        <Route path="/career"    component={Career}   />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AppInner() {
  useSmoothScroll();
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <SEOMeta />
      <Router />
    </WouterRouter>
  );
}

function App() {
  return (
    <LangProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppInner />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LangProvider>
  );
}

export default App;
