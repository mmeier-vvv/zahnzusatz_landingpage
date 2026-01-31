import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

/**
 * Design Philosophy: Modern Professional Insurance Landing Page
 * - Color: Teal/Green (#1B8B7E) for trust and health
 * - Typography: Poppins for headings (bold, modern), clean body text
 * - Layout: Asymmetric sections with clear information hierarchy
 * - Interaction: Smooth transitions and hover effects
 */

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [tarifOpen, setTarifOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 0, minutes: 0 });

  useEffect(() => {
    // Initialize EmailJS
    try {
      emailjs.init("lsXqGDCJzD5A2y6Dw");
      console.log("EmailJS initialized successfully");
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.days === 0 && prev.hours === 0 && prev.minutes === 0) {
          return { days: 3, hours: 0, minutes: 0 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        }
        return { days: prev.days - 1, hours: 23, minutes: 59 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const faqItems = [
    {
      question: "Bin ich verpflichtet, einen Vertrag abzuschließen?",
      answer: "Nein. Die Vorprüfung und die Beratung sind kostenlos und unverbindlich. Du entscheidest in Ruhe, ob und welchen Tarif du abschließen möchtest."
    },
    {
      question: "Wie funktioniert die anonyme Voranfrage?",
      answer: "Deine zahnbezogenen Gesundheitsangaben werden ohne Nennung von Name und Anschrift (anonymisiert) an ausgewählte Versicherungsgesellschaften übermittelt. Erst wenn du dich für einen Tarif entscheidest, erfolgt eine namentliche Antragstellung."
    },
    {
      question: "Was ist mit bereits vorhandenen Zahnproblemen?",
      answer: "Auch bei vorhandenen Zahnproblemen gibt es häufig Lösungen. Laufende oder bereits angeratene Behandlungen sind zwar in der Regel nicht mitversichert, über anonyme Voranfragen prüfe ich jedoch, welche Tarife oder alternativen Möglichkeiten für deine individuelle Situation in Frage kommen."
    },
    {
      question: "Warum reicht die gesetzliche Krankenversicherung nicht aus?",
      answer: "Die gesetzliche Krankenversicherung übernimmt bei Zahnersatz meist nur einen festen Basis-Zuschuss. Hochwertige Lösungen wie Implantate, Keramikkronen oder moderne Brücken führen deshalb häufig zu hohen Eigenkosten."
    },
    {
      question: "Was leistet eine Zahnzusatzversicherung?",
      answer: "Eine Zahnzusatzversicherung ergänzt die Leistungen der gesetzlichen Krankenversicherung. Je nach Tarif können Kosten für Zahnersatz, Zahnbehandlungen und professionelle Zahnreinigungen ganz oder teilweise übernommen werden."
    },
    {
      question: "Gibt es Wartezeiten?",
      answer: "Viele Tarife sehen Wartezeiten vor, andere verzichten ganz oder teilweise darauf. Welche Lösung sinnvoll ist, hängt von deiner persönlichen Situation ab – genau hier unterstütze ich dich mit einer individuellen Beratung."
    },
    {
      question: "Was bedeutet Leistungsstaffelung?",
      answer: "Viele Zahnzusatzversicherungen begrenzen die maximale Erstattung in den ersten Versicherungsjahren (z. B. im 1.–4. Jahr). Diese sogenannte Leistungsstaffelung dient dazu, Beitrag und Leistung fair auszubalancieren. Nach Ablauf der Staffel steht in der Regel der volle tarifliche Leistungsumfang zur Verfügung."
    },
    {
      question: "Warum über eine unabhängige Maklerin abschließen?",
      answer: "Als unabhängige Versicherungsmaklerin vergleiche ich Tarife mehrerer Anbieter und empfehle dir die Lösung, die zu deiner persönlichen Situation passt – nicht die eines einzelnen Versicherers."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validierung
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Bitte füllen Sie Name und E-Mail aus");
      return;
    }

    setLoading(true);

    try {
      const response1 = emailjs.send("service_3u1h0bj", "template_gvvxfqh", {
        to_email: "m.meier@vorsorgewerk24.de",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: `Neue Anfrage von ${formData.name}`,
      });

      const response2 = emailjs.send("service_3u1h0bj", "template_gvvxfqh", {
        to_email: formData.email,
        from_name: "Monica Meier",
        from_email: "m.meier@vorsorgewerk24.de",
        phone: formData.phone,
        message: `Vielen Dank für Ihre Anfrage. Ich werde mich in Kürze bei Ihnen melden.`,
      });

      console.log("Email 1 response:", response1);
      console.log("Email 2 response:", response2);

      if (response1.status === 200 && response2.status === 200) {
        toast.success("Vielen Dank! Ihre Anfrage wurde erfolgreich versendet.");
        setFormData({ name: "", email: "", phone: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Es gab einen Fehler beim Versenden. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="text-xl font-bold text-primary">Monica Meier | Versicherungsmakler bei A&K Vorsorgespezialisten</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-gray-700 hover:text-primary transition font-medium">
              Startseite
            </a>

            <a href="#benefits" className="text-gray-700 hover:text-primary transition font-medium">
              Zahnzusatz
            </a>
            <a href="#services" className="text-gray-700 hover:text-primary transition font-medium">
              Leistungen
            </a>
            <button onClick={() => setFaqOpen(true)} className="text-gray-700 hover:text-primary transition font-medium">
              FAQ
            </button>
            <button onClick={() => setTarifOpen(true)} className="text-gray-700 hover:text-primary transition font-medium">
              Tarife
            </button>
          </div>
          
          {/* Desktop CTA Button */}
          <a href="/health-check" className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-white">Jetzt Beratung anfordern</Button>
          </a>
          
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary transition"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
            <div className="container py-4 flex flex-col gap-4">
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-medium py-2">
                Startseite
              </a>

              <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-medium py-2">
                Zahnzusatz
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary transition font-medium py-2">
                Leistungen
              </a>
              <button onClick={() => { setFaqOpen(true); setMobileMenuOpen(false); }} className="text-gray-700 hover:text-primary transition font-medium py-2 text-left">
                FAQ
              </button>
              <button onClick={() => { setTarifOpen(true); setMobileMenuOpen(false); }} className="text-gray-700 hover:text-primary transition font-medium py-2 text-left">
                Tarife
              </button>
              <Button onClick={() => { setLocation("/health-check"); setMobileMenuOpen(false); }} className="w-full bg-primary hover:bg-primary/90 text-white mt-4">Jetzt Beratung anfordern</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative hidden lg:block order-first lg:order-first">
              <img 
                src="/images/dentist-treatment.jpg" 
                alt="Zahnarzt bei Behandlung" 
                className="rounded-2xl shadow-2xl w-full object-cover h-96"
              />
            </div>

            {/* Right Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Dein Lächeln ist mehr wert.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Schütze dich vor hohen Eigenkosten beim Zahnarzt. Mit einer Zahnzusatzversicherung zahlst du deutlich weniger.
              </p>

              {/* Problem Box */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-l-4 border-primary rounded-lg p-6 mb-8">
                <div className="flex gap-4">
                  <div className="text-3xl">💰</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Implantat oder Krone?</h3>
                    <p className="text-gray-600">Schnell mehrere tausend Euro Eigenanteil. Eine gute Zahnzusatzversicherung spart dir Zeit und Geld.</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/health-check">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
                    Jetzt Beratung anfordern
                  </Button>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Keine versteckten Gebühren.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Unverbindlich.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600">
              Je früher du vorsorgst, desto entspannter bist du bei zukünftigen Zahnbehandlungen.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Die Vorteile einer Zahnzusatzversicherung</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Hochwertige Versorgung, weniger Eigenkosten, finanzielle Sicherheit</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-3xl">
                ✨
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hochwertige Versorgung</h3>
              <p className="text-gray-600">Zugang zu modernen Zahnbehandlungen und hochqualitativen Materialien ohne Kompromisse.</p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-3xl">
                💰
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deutlich weniger Eigenkosten</h3>
              <p className="text-gray-600">Die Versicherung übernimmt einen großen Teil der Kosten für Implantate, Kronen und andere Behandlungen.</p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-3xl">
                ❤️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Finanzielle Sicherheit – ein Leben lang</h3>
              <p className="text-gray-600">Plane deine Zahngesundheit ohne finanzielle Sorgen. Langfristige Absicherung für deine Zukunft.</p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-8 border border-primary/20 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Wusstest du?</h3>
            <p className="text-gray-700 mb-4">
              Die gesetzliche Krankenkasse übernimmt oft nur den Basis-Zuschuss. Den Großteil der Kosten zahlst du selbst.
            </p>
            <div className="text-center text-3xl mb-4">↓</div>
            <p className="text-center text-primary font-bold text-lg">
              Eine Zahnzusatzversicherung schließt genau diese Lücke.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - OPTIMIZED TO 4 CARDS */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Was ist alles versichert?</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Umfassender Schutz für alle wichtigen Zahnbehandlungen</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  🦷
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Zahnersatz</p>
                  <p className="text-xs text-primary font-semibold">Implantate • Kronen • Brücken</p>
                </div>
              </div>
              <p className="text-gray-600">Hochwertige Lösungen für dauerhaften Zahnersatz mit modernen Materialien. Leistungsstaffelung: 70% - 100% je nach Tarif.</p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  💊
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Zahnbehandlungen</p>
                  <p className="text-xs text-primary font-semibold">Füllungen • Wurzelbehandlung • Bleaching</p>
                </div>
              </div>
              <p className="text-gray-600">Umfassender Schutz für Füllungen, Wurzelbehandlungen und Zahnaufhellung. Flexible Tarife je nach gewähltem Tarif unterschiedlich gestaffelt.</p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  ✨
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Prophylaxe & Vorsorge</p>
                  <p className="text-xs text-primary font-semibold">Zahnreinigung • Kieferorthopädie • Prävention</p>
                </div>
              </div>
              <p className="text-gray-600">Professionelle Zahnreinigung und Zahnspangen – gesunde Zähne durch regelmäßige Prävention. Für alle Altersgruppen von Kindern bis Erwachsene.</p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  💰
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Flexible Tarife</p>
                  <p className="text-xs text-primary font-semibold">Budget • Komfort • Premium</p>
                </div>
              </div>
              <p className="text-gray-600">Von Budget bis Premium – passend zu deinem Budget und deinen Bedürfnissen. Alle Leistungen je nach gewähltem Tarif unterschiedlich gestaffelt.</p>
            </div>
          </div>

          <p className="text-center text-gray-700 font-semibold text-lg">
            Alle Leistungen sind je nach gewähltem Tarif unterschiedlich gestaffelt
          </p>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Warum jetzt handeln?</h2>
            <p className="text-lg text-gray-600 mb-4">
              Früher Abschluss = bessere Konditionen
            </p>
            <p className="text-lg text-gray-600">
              Je früher du vorsorgst, desto entspannter bist du bei zukünftigen Zahnbehandlungen.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Das sagen meine Kunden</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"Ich hätte nie gedacht, dass eine Zahnzusatzversicherung so wichtig ist. Nach meinem Implantat habe ich über 3000€ gespart. Absolut empfehlenswert!"</p>
              <p className="font-bold text-gray-900">Sarah M.</p>
              <p className="text-sm text-gray-600">München</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"Monica hat mir die beste Lösung für meine Familie gefunden. Die Beratung war persönlich und verständlich. Sehr zufrieden!"</p>
              <p className="font-bold text-gray-900">Thomas K.</p>
              <p className="text-sm text-gray-600">Augsburg</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Unsere Kooperationspartner</h2>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-600 mb-8">
              Als unabhängige Versicherungsmaklerin vergleiche ich 50+ Tarife und finde DEINE perfekte Lösung – nicht die beste für mich. Kostenlose Beratung ohne versteckte Gebühren, mit persönlicher Betreuung von Anfang bis Ende.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-xl p-8">
                <p className="text-2xl mb-2">✓</p>
                <p className="font-bold text-gray-900">Unabhängige Beratung</p>
                <p className="text-sm text-gray-600">Keine Provisionsabhängigkeit</p>
              </div>
              <div className="bg-white rounded-xl p-8">
                <p className="text-2xl mb-2">✓</p>
                <p className="font-bold text-gray-900">Über 100+ zufriedene Kunden</p>
                <p className="text-sm text-gray-600">Vertrauen durch Erfahrung</p>
              </div>
              <div className="bg-white rounded-xl p-8">
                <p className="text-2xl mb-2">✓</p>
                <p className="font-bold text-gray-900">Kostenlose Beratung</p>
                <p className="text-sm text-gray-600">Keine versteckten Gebühren</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 font-semibold mb-4">
              👉 Du entscheidest – ich begleite dich.
            </p>
            
            {/* Partner Logos */}
            <div className="mb-8">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center justify-items-center">
                  <div className="bg-white rounded-lg p-3 w-full flex items-center justify-center h-20">
                    <img src="/images/allianz-logo.jpg" alt="Allianz" className="max-h-16 max-w-full object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 w-full flex items-center justify-center h-20">
                    <img src="/images/axa-logo.jpg" alt="AXA" className="max-h-16 max-w-full object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 w-full flex items-center justify-center h-20">
                    <img src="/images/arag-logo.png" alt="ARAG" className="max-h-16 max-w-full object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 w-full flex items-center justify-center h-20">
                    <img src="/images/BarmeniaGothaer.jpg" alt="Barmenia-Gothaer" className="max-h-16 max-w-full object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 w-full flex items-center justify-center h-20">
                    <img src="/images/Concordia.webp" alt="Concordia" className="max-h-16 max-w-full object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 w-full flex items-center justify-center h-20">
                    <img src="/images/debeka-logo.png" alt="Debeka" className="max-h-16 max-w-full object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 w-full flex items-center justify-center h-20">
                    <img src="/images/ergo-logo.jpg" alt="ERGO" className="max-h-16 max-w-full object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-3 w-full flex items-center justify-center h-20">
                    <img src="/images/generali-logo.png" alt="Generali" className="max-h-16 max-w-full object-contain" />
                  </div>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Die Logos dienen der Illustration der Marktbreite. Es besteht keine Verpflichtung zur Vermittlung eines bestimmten Versicherers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Häufig gestellte Fragen</h2>
          <p className="text-center text-gray-600 mb-8 text-lg">Du hast noch Fragen? Schau dir alle unsere FAQs an:</p>
          <div className="text-center">
            <Button onClick={() => setFaqOpen(true)} className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
              📖 Alle FAQs anschauen
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Über Monica</h2>
            <p className="text-lg text-gray-600 mb-6">
              Monica Meier ist eine unabhängige Versicherungsmaklerin und berät ihre Kunden persönlich und transparent, um die beste Lösung für ihre individuelle Situation zu finden.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Mit jahrelanger Erfahrung in der Zahnzusatzversicherung und dem Rückhalt ihres Partners A&K Vorsorgespezialisten hat Monica Zugang zu über 50 verschiedenen Zahnzusatztarifen. Sie vergleicht diese sorgfältig und empfiehlt nur die Tarife, die wirklich zu ihren Kunden passen.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Ihre Kunden schätzen ihre persönliche Beratung, ihre Transparenz und ihre Zuverlässigkeit. Monica arbeitet nach dem Grundsatz: "Du entscheidest – ich begleite dich."
            </p>
            
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <p className="font-bold text-gray-900 text-lg mb-2">Monica Meier</p>
              <p className="text-gray-600 mb-4">Versicherungsberaterin in München</p>
              <p className="text-gray-600 mb-4">A&K Vorsorgespezialisten UG</p>
              <p className="text-gray-600 mb-2">📞 +49 171 1144557</p>
              <p className="text-gray-600">📧 m.meier@vorsorgewerk24.de</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Navigation</h4>
              <p className="text-sm"><a href="#" className="hover:text-white">Startseite</a></p>
              <p className="text-sm"><a href="#benefits" className="hover:text-white">Zahnzusatz</a></p>
              <p className="text-sm"><a href="#services" className="hover:text-white">Leistungen</a></p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Informationen</h4>
              <p className="text-sm"><button onClick={() => setFaqOpen(true)} className="hover:text-white">FAQ</button></p>
              <p className="text-sm"><button onClick={() => setTarifOpen(true)} className="hover:text-white">Tarife</button></p>
              <p className="text-sm"><a href="/health-check" className="hover:text-white">Beratung anfordern</a></p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Kontakt</h4>
              <p className="text-sm"><a href="https://www.vvv360versichert.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">www.vvv360versichert.com</a></p>
              <p className="text-sm"><a href="/impressum" className="hover:text-white">Impressum</a></p>
              <p className="text-sm"><a href="/datenschutz" className="hover:text-white">Datenschutz</a></p>
            </div>
            <div className="flex items-center justify-end">
              <img src="/images/vvv-monica-logo.png" alt="VVV.MONICA" className="h-24 object-contain" />
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Monica Meier, unabhängige Versicherungsmaklerin bei A&K Vorsorgespezialisten UG. Alle Rechte vorbehalten. | <a href="/impressum" className="hover:text-white">Impressum</a> | <a href="/datenschutz" className="hover:text-white">Datenschutz</a></p>
          </div>
        </div>
      </footer>

      {/* FAQ Modal */}
      <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
        <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Häufig gestellte Fragen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-4 hover:bg-gray-50 font-medium text-gray-900 flex justify-between items-center"
                >
                  {item.question}
                  <span>{expandedFaq === index ? "−" : "+"}</span>
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-gray-50 border-t text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Tarife Modal */}
      <Dialog open={tarifOpen} onOpenChange={setTarifOpen}>
        <DialogContent className="max-w-4xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Konkrete Preisbeispiele</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600 mb-6 text-sm">Zahnzusatzversicherung ab 8,50€ pro Monat – je nach Alter und Tarif (Orientierungspreise)</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Age Group 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <div className="bg-primary text-white p-4 text-center">
                <h3 className="text-2xl font-bold">25 Jahre</h3>
                <p className="text-sm">Junge Erwachsene</p>
              </div>
              <div className="p-4 space-y-3">
                <div className="border-b pb-3">
                  <p className="font-bold text-gray-900 text-sm">🛡️ Starter (70%)</p>
                  <p className="text-xs text-gray-600">Basis-Schutz</p>
                  <p className="text-xl font-bold text-primary mt-1">8,50€</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-bold text-gray-900 text-sm">⭐ Komfort (80%)</p>
                  <p className="text-xs text-gray-600">Guter Schutz</p>
                  <p className="text-xl font-bold text-primary mt-1">12,99€</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">💎 Premium (100%)</p>
                  <p className="text-xs text-gray-600">Vollschutz</p>
                  <p className="text-xl font-bold text-primary mt-1">18,50€</p>
                </div>
                <p className="text-xs text-gray-500 text-center pt-2">Monatliche Beitrag (Beispiel)</p>
              </div>
            </div>

            {/* Age Group 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <div className="bg-primary text-white p-4 text-center">
                <h3 className="text-2xl font-bold">40 Jahre</h3>
                <p className="text-sm">Mittleres Alter</p>
              </div>
              <div className="p-4 space-y-3">
                <div className="border-b pb-3">
                  <p className="font-bold text-gray-900 text-sm">🛡️ Starter (70%)</p>
                  <p className="text-xs text-gray-600">Basis-Schutz</p>
                  <p className="text-xl font-bold text-primary mt-1">12,99€</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-bold text-gray-900 text-sm">⭐ Komfort (80%)</p>
                  <p className="text-xs text-gray-600">Guter Schutz</p>
                  <p className="text-xl font-bold text-primary mt-1">18,99€</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">💎 Premium (100%)</p>
                  <p className="text-xs text-gray-600">Vollschutz</p>
                  <p className="text-xl font-bold text-primary mt-1">27,50€</p>
                </div>
                <p className="text-xs text-gray-500 text-center pt-2">Monatliche Beitrag (Beispiel)</p>
              </div>
            </div>

            {/* Age Group 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <div className="bg-primary text-white p-4 text-center">
                <h3 className="text-2xl font-bold">55 Jahre</h3>
                <p className="text-sm">Reifes Alter</p>
              </div>
              <div className="p-4 space-y-3">
                <div className="border-b pb-3">
                  <p className="font-bold text-gray-900 text-sm">🛡️ Starter (70%)</p>
                  <p className="text-xs text-gray-600">Basis-Schutz</p>
                  <p className="text-xl font-bold text-primary mt-1">19,99€</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-bold text-gray-900 text-sm">⭐ Komfort (80%)</p>
                  <p className="text-xs text-gray-600">Guter Schutz</p>
                  <p className="text-xl font-bold text-primary mt-1">28,99€</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">💎 Premium (100%)</p>
                  <p className="text-xs text-gray-600">Vollschutz</p>
                  <p className="text-xl font-bold text-primary mt-1">39,99€</p>
                </div>
                <p className="text-xs text-gray-500 text-center pt-2">Monatliche Beitrag (Beispiel)</p>
              </div>
            </div>
          </div>

          {/* Tariff Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2 text-sm">🛡️ Starter (70%)</h4>
              <p className="text-xs text-gray-600">Kosteneffiziente Grundabsicherung. Deckt die wichtigsten Zahnbehandlungen ab. Geeignet für Kunden mit kleinerem Budget oder guter Zahngesundheit.</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2 text-sm">⭐ Komfort (80%)</h4>
              <p className="text-xs text-gray-600">Ausgewogener Schutz mit guten Leistungen. Deckt die meisten Zahnbehandlungen ab. Empfohlen für Kunden mit durchschnittlichen Zahnbehandlungskosten.</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2 text-sm">💎 Premium (100%)</h4>
              <p className="text-xs text-gray-600">Umfassende Absicherung mit maximaler Kostenübernahme. Ideal für Kunden mit häufigen oder kostspieligen Zahnbehandlungen.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 text-center mt-6">
            <p className="text-gray-700 mb-4 text-sm">
              Alle Preise sind Beispielwerte. Die tatsächlichen Beitäge hängen von deinem Alter, Gesundheitsstatus und dem gewählten Tarif ab. Der beste Tarif für Sie hängt von Ihrer persönlichen Situation ab – ich berate Sie gerne unabhängig!
            </p>
            <Button onClick={() => { setLocation("/health-check"); setTarifOpen(false); }} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm">
              Jetzt persönliche Beratung anfordern
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
