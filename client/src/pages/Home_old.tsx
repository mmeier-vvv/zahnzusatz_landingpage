import { Button } from "@/components/ui/button";
import { Heart, Smile, DollarSign, Clock, Shield, Star, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
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
      question: "Wann zahlt die Versicherung?",
      answer: "Die Zahnzusatzversicherung zahlt ab Tag 1 für Unfallschäden. Für Krankheitsbehandlungen gibt es typischerweise eine Wartezeit von 8 Wochen. Je nach Tarif können die Leistungen unterschiedlich gestaffelt sein."
    },
    {
      question: "Gibt es Wartezeiten?",
      answer: "Ja, für Zahnbehandlungen gibt es typischerweise 8 Wochen Wartezeit. Unfallschäden sind sofort versichert. Einige Tarife bieten auch Wartezeit-Verzicht an – ich berate Sie gerne zu den besten Optionen."
    },
    {
      question: "Kann ich kündigen?",
      answer: "Ja, Sie können die Versicherung jederzeit zum Ende eines Kalendermonats kündigen. Es gibt keine Mindestvertragslaufzeit. Sie haben auch ein 14-Tage-Widerrufsrecht nach Vertragsabschluss."
    },
    {
      question: "Wie schnell erhalte ich eine Antwort?",
      answer: "Innerhalb von 24 Stunden per E-Mail oder Telefon. Ich beantworte Ihre Fragen persönlich und unkompliziert. Bei dringenden Fragen können Sie mich auch direkt anrufen: +49 171 1144557"
    },
    {
      question: "Sind meine Daten sicher?",
      answer: "Ja, Ihre Daten sind vollständig geschützt. Alle Daten werden SSL-verschlüsselt übertragen und entsprechend den geltenden Datenschutzbestimmungen (DSGVO) behandelt. Ihre Privatsphäre ist mir wichtig."
    },
    {
      question: "Welche Leistungen sind versichert?",
      answer: "Das hängt vom gewählten Tarif ab. Typischerweise sind Zahnreinigungen, Füllungen, Zahnersatz (Kronen, Brücken, Implantate), Kieferorthopädie und Parodontologie versichert. Ich zeige Ihnen gerne die genauen Leistungen für Ihren idealen Tarif."
    },
    {
      question: "Wie viel kostet eine Zahnzusatzversicherung?",
      answer: "Die Kosten hängen von Ihrem Alter, Ihrem Gesundheitszustand und dem gewählten Tarif ab. Die Spanne liegt typischerweise zwischen 10 und 50 Euro pro Monat. Ich vergleiche über 50 Tarife und finde die beste Lösung für Ihr Budget."
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
      const now = new Date();
      const time = now.toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      console.log("Sending inquiry email to Monica Meier...");
      
      // Email 1: An Monica Meier mit allen Details
      const response1 = await emailjs.send(
        "service_e9rg4ka",
        "template_wozznne",
        {
          to_email: "m.meier@vorsorgewerk24.de",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "Nicht angegeben",
          time: time,
          message: `Name: ${formData.name}\nE-Mail: ${formData.email}\nTelefon: ${formData.phone || "Nicht angegeben"}`
        }
      );
      console.log("Inquiry email sent:", response1);

      console.log("Sending confirmation email to visitor...");
      
      // Email 2: Bestätigungsmail an den Besucher
      const response2 = await emailjs.send(
        "service_e9rg4ka",
        "template_wozznne",
        {
          to_email: formData.email,
          from_name: "Monica Meier",
          from_email: "m.meier@vorsorgewerk24.de",
          phone: formData.phone || "Nicht angegeben",
          time: time,
          message: `Vielen Dank für Ihre Anfrage – wir haben Ihre Nachricht erhalten und melden uns so schnell wie möglich persönlich bei Ihnen.\n\nIhre Angaben behandeln wir selbstverständlich vertraulich und entsprechend den geltenden Datenschutzbestimmungen.\n\nBeste Grüße,\nMonica Meier\nVersicherungsmaklerin\nA&K Vorsorgespezialisten`
        }
      );
      console.log("Confirmation email sent:", response2);

      toast.success("Anfrage erfolgreich versendet! Sie erhalten in Kürze eine Bestätigungsmail.");
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Fehler beim Senden:", error);
      toast.error("Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "München",
      text: "Ich hätte nie gedacht, dass eine Zahnzusatzversicherung so wichtig ist. Nach meinem Implantat habe ich über 3000€ gespart. Absolut empfehlenswert!",
      rating: 5
    },
    {
      name: "Thomas K.",
      role: "Augsburg",
      text: "Monica hat mir die beste Lösung für meine Familie gefunden. Die Beratung war persönlich und verständlich. Sehr zufrieden!",
      rating: 5
    },
    {
      name: "Julia W.",
      role: "Ingolstadt",
      text: "Endlich eine Versicherungsmaklerin, die meine Fragen wirklich beantwortet. Keine versteckten Gebühren, alles transparent. Danke Monica!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="hover:text-primary transition">
            <div className="text-lg font-bold text-gray-900">Monica Meier</div>
            <div className="text-xs text-gray-600 font-medium">Versicherungsmaklerin</div>
          </a>
          
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
              <a href="/health-check" className="w-full block" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-4">Jetzt Beratung anfordern</Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative h-96 md:h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
            <img
              src="/images/hero-dental-care.jpg"
              alt="Professionelle Zahnbehandlung"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center px-6 md:px-12 py-16 md:py-0">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Dein Lächeln ist mehr wert.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Schütze dich vor hohen Eigenkosten beim Zahnarzt. Mit einer Zahnzusatzversicherung zahlst du deutlich weniger.
              </p>

              <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6 mb-8">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-bold text-gray-900">Implantat oder Krone?</p>
                    <p className="text-gray-700">Schnell mehrere tausend Euro Eigenanteil. Eine gute Zahnzusatzversicherung spart dir Zeit und Geld.</p>
                  </div>
                </div>
              </div>

              <a href="/health-check">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg mb-4">
                  Jetzt Beratung anfordern
                </Button>
              </a>
              <p className="text-sm text-gray-600">Keine versteckten Gebühren. Unverbindlich.</p>
              
              <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 font-bold flex items-center gap-2">
                  <span>🔥</span> Spezialangebot: Nur noch {timeLeft.days} Tage gültig!
                </p>
                <p className="text-red-600 text-sm mt-1">Sichern Sie sich jetzt die beste Beratung zum Vorzugspreis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Die Vorteile einer Zahnzusatzversicherung
            </h2>
            <p className="text-xl text-gray-600">
              Hochwertige Versorgung, weniger Eigenkosten, finanzielle Sicherheit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hochwertige Versorgung</h3>
              <p className="text-gray-600">Zugang zu modernen Zahnbehandlungen und hochqualitativen Materialien ohne Kompromisse.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Deutlich weniger Eigenkosten</h3>
              <p className="text-gray-600">Die Versicherung übernimmt einen großen Teil der Kosten für Implantate, Kronen und andere Behandlungen.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Finanzielle Sicherheit – ein Leben lang</h3>
              <p className="text-gray-600">Plane deine Zahngesundheit ohne finanzielle Sorgen. Langfristige Absicherung für deine Zukunft.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Wusstest du?</h3>
            <p className="text-lg text-gray-700 mb-4">
              Die gesetzliche Krankenkasse übernimmt oft nur den Basis-Zuschuss. Den Großteil der Kosten zahlst du selbst.
            </p>
            <div className="text-4xl mb-4">↓</div>
            <p className="text-lg font-semibold text-primary">
              Eine Zahnzusatzversicherung schließt genau diese Lücke.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Schutz</h3>
              <p className="text-gray-600">Umfassender Schutz vor hohen Zahnkosten</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Smile className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Zähne</h3>
              <p className="text-gray-600">Gesunde Zähne durch professionelle Versorgung</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Kosten</h3>
              <p className="text-gray-600">Transparente Kosten und flexible Tarife</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - ENHANCED */}
      <section id="services" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Was ist alles versichert?
            </h2>
            <p className="text-xl text-gray-600">
              Umfassender Schutz für alle wichtigen Zahnbehandlungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
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
              <p className="text-gray-600">Hochwertige Lösungen für dauerhaften Zahnersatz mit modernen Materialien</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  💊
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Zahnbehandlungen</p>
                  <p className="text-xs text-primary font-semibold">Füllungen • Wurzelbehandlung</p>
                </div>
              </div>
              <p className="text-gray-600">Umfassender Schutz für Füllungen und Wurzelbehandlungen</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  ✨
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Prophylaxe</p>
                  <p className="text-xs text-primary font-semibold">Zahnreinigung • Vorsorge</p>
                </div>
              </div>
              <p className="text-gray-600">Professionelle Zahnreinigung – gesunde Zähne durch regelmäßige Prävention</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  😁
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Bleaching</p>
                  <p className="text-xs text-primary font-semibold">Je nach Tarif</p>
                </div>
              </div>
              <p className="text-gray-600">Zahnaufhellung für ein strahlendes Lächeln – je nach gewähltem Tarif</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  🦷
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Kieferorthopädie</p>
                  <p className="text-xs text-primary font-semibold">Je nach Tarif</p>
                </div>
              </div>
              <p className="text-gray-600">Zahnspangen & Aligner – für gerade und gesunde Zähne je nach Tarif</p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-primary shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                  💰
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Flexible Tarife</p>
                  <p className="text-xs text-primary font-semibold">Budget bis Premium</p>
                </div>
              </div>
              <p className="text-gray-600">Von Budget bis Premium – passend zu deinem Budget und deinen Bedürfnissen</p>
            </div>
          </div>

          <p className="text-center text-gray-700 font-semibold text-lg">
            Alle Leistungen sind je nach gewähltem Tarif unterschiedlich gestaffelt
          </p>
        </div>
      </section>

      {/* Why Act Now Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Warum jetzt handeln?</h2>
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
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Das sagen meine Kunden
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-sm">"{testimonial.text}"</p>
                <div className="border-t border-gray-200 pt-3">
                  <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Examples Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Konkrete Preisbeispiele</h2>
            <p className="text-lg text-gray-600">Zahnzusatzversicherung ab 8,50€ pro Monat – je nach Alter und Tarif (Orientierungspreise)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Age 25 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-primary">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                <h3 className="text-2xl font-bold">25 Jahre</h3>
                <p className="text-primary/90 text-sm">Junge Erwachsene</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div>
                      <span className="text-gray-700 font-semibold">Starter (70%)</span>
                      <p className="text-xs text-gray-500">Basis-Schutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">8,50€</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div>
                      <span className="text-gray-700 font-semibold">Komfort (80%)</span>
                      <p className="text-xs text-gray-500">Guter Schutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">12,99€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700 font-semibold">Premium (100%)</span>
                      <p className="text-xs text-gray-500">Vollschutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">18,50€</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6 pt-6 border-t border-gray-200">Monatliche Beitrag (Beispiel)</p>
              </div>
            </div>

            {/* Age 40 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-primary transform md:scale-105">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                <h3 className="text-2xl font-bold">40 Jahre</h3>
                <p className="text-primary/90 text-sm">Mittleres Alter</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div>
                      <span className="text-gray-700 font-semibold">Starter (70%)</span>
                      <p className="text-xs text-gray-500">Basis-Schutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">12,99€</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div>
                      <span className="text-gray-700 font-semibold">Komfort (80%)</span>
                      <p className="text-xs text-gray-500">Guter Schutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">18,99€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700 font-semibold">Premium (100%)</span>
                      <p className="text-xs text-gray-500">Vollschutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">27,50€</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6 pt-6 border-t border-gray-200">Monatliche Beitrag (Beispiel)</p>
              </div>
            </div>

            {/* Age 55 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-primary">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                <h3 className="text-2xl font-bold">55 Jahre</h3>
                <p className="text-primary/90 text-sm">Reifes Alter</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div>
                      <span className="text-gray-700 font-semibold">Starter (70%)</span>
                      <p className="text-xs text-gray-500">Basis-Schutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">19,99€</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div>
                      <span className="text-gray-700 font-semibold">Komfort (80%)</span>
                      <p className="text-xs text-gray-500">Guter Schutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">28,99€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700 font-semibold">Premium (100%)</span>
                      <p className="text-xs text-gray-500">Vollschutz</p>
                    </div>
                    <span className="font-bold text-lg text-primary">39,99€</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6 pt-6 border-t border-gray-200">Monatliche Beitrag (Beispiel)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">🛡️ Starter (70%)</h4>
                <p className="text-sm text-gray-600">Kosteneffiziente Grundabsicherung. Deckt die wichtigsten Zahnbehandlungen ab. Geeignet für Kunden mit kleinerem Budget oder guter Zahngesundheit.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">⭐ Komfort (80%)</h4>
                <p className="text-sm text-gray-600">Ausgewogener Schutz mit guten Leistungen. Deckt die meisten Zahnbehandlungen ab. Empfohlen für Kunden mit durchschnittlichen Zahnbehandlungskosten.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">💎 Premium (100%)</h4>
                <p className="text-sm text-gray-600">Umfassende Absicherung mit maximaler Kostenübernahme. Ideal für Kunden mit häufigen oder kostspieligen Zahnbehandlungen.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Alle Preise sind Beispielwerte. Die tatsächlichen Beitäge hängen von deinem Alter, Gesundheitsstatus und dem gewählten Tarif ab. Der beste Tarif für Sie hängt von Ihrer persönlichen Situation ab – ich berate Sie gerne unabhängig!</p>
            <a href="/health-check" className="inline-block">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition">
                Jetzt persönliche Beratung anfordern
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Partners Section - REDESIGNED with Larger Logos */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Unsere Kooperationspartner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-lg text-gray-600 mb-8">Als unabhängige Versicherungsmaklerin vergleiche ich 50+ Tarife und finde DEINE perfekte Lösung – nicht die beste für mich. Kostenlose Beratung ohne versteckte Gebühren, mit persönlicher Betreuung von Anfang bis Ende.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">Unabhängige Beratung</p>
                    <p className="text-gray-600 text-sm">Keine Provisionsabhängigkeit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">Über 100+ zufriedene Kunden</p>
                    <p className="text-gray-600 text-sm">Vertrauen durch Erfahrung</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">Kostenlose Beratung</p>
                    <p className="text-gray-600 text-sm">Keine versteckten Gebühren</p>
                  </div>
                </div>
              </div>
              
              
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-lg border border-teal-200">
                <p className="text-lg font-bold text-primary flex items-center gap-2">
                  <span>👉</span> Du entscheidest – ich begleite dich.
                </p>
              </div>
            </div>
            
            {/* Asymmetric Logo Layout */}
            <div className="space-y-6">
              {/* Row 1 */}
              <div className="flex gap-4 items-center">
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/allianz-logo.jpg" alt="Allianz" className="h-20 object-contain" />
                </div>
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/muenchener-verein-logo.png" alt="Münchener Verein" className="h-20 object-contain" />
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="flex gap-4 items-center">
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/die-bayerische-logo.jpeg" alt="Die Bayerische" className="h-20 object-contain" />
                </div>
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/barmenia-gothaer-logo.jpg" alt="Barmenia Gothaer" className="h-20 object-contain" />
                </div>
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/axa-logo.jpg" alt="AXA" className="h-20 object-contain" />
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="flex gap-4 items-center">
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/signal-iduna-logo.png" alt="Signal Iduna" className="h-20 object-contain" />
                </div>
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/arag-logo.png" alt="ARAG" className="h-20 object-contain" />
                </div>
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/hanse-merkur-logo.png" alt="Hanse Merkur" className="h-20 object-contain" />
                </div>
              </div>
              
              {/* Row 4 */}
              <div className="flex gap-4 items-center">
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/ergo-logo.png" alt="ERGO" className="h-20 object-contain" />
                </div>
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/concordia-logo.webp" alt="Concordia" className="h-20 object-contain" />
                </div>
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/rv-logo.jpg" alt="R+V" className="h-20 object-contain" />
                </div>
              </div>
              
              {/* Row 5 - New Logos */}
              <div className="flex gap-4 items-center">
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/sdk-logo.gif" alt="SDK" className="h-20 object-contain" />
                </div>
                <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex-1">
                  <img src="/images/universa-logo.jpg" alt="Universa" className="h-20 object-contain" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
              <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-4">Die Logos dienen der Illustration der Marktbreite. Es besteht keine Verpflichtung zur Vermittlung eines bestimmten Versicherers.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Häufig gestellte Fragen</h2>
            
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3">❓ Wann zahlt die Versicherung?</h3>
                <p className="text-gray-600">Die Zahnzusatzversicherung zahlt ab Tag 1 für Unfallschäden. Für Krankheitsbehandlungen gibt es typischerweise eine Wartezeit von 8 Wochen. Je nach Tarif können die Leistungen unterschiedlich gestaffelt sein.</p>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3">❓ Gibt es Wartezeiten?</h3>
                <p className="text-gray-600">Ja, für Zahnbehandlungen gibt es typischerweise 8 Wochen Wartezeit. Unfallschäden sind sofort versichert. Einige Tarife bieten auch Wartezeit-Verzicht an – ich berate Sie gerne zu den besten Optionen.</p>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3">❓ Kann ich kündigen?</h3>
                <p className="text-gray-600">Ja, Sie können die Versicherung jederzeit zum Ende eines Kalendermonats kündigen. Es gibt keine Mindestvertragslaufzeit. Sie haben auch ein 14-Tage-Widerrufsrecht nach Vertragsabschluss.</p>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3">❓ Wie schnell erhalte ich eine Antwort?</h3>
                <p className="text-gray-600">Innerhalb von 24 Stunden per E-Mail oder Telefon. Ich beantworte Ihre Fragen persönlich und unkompliziert. Bei dringenden Fragen können Sie mich auch direkt anrufen: +49 171 1144557</p>
              </div>
              
              {/* FAQ Item 5 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3">❓ Sind meine Daten sicher?</h3>
                <p className="text-gray-600">Ja, Ihre Daten sind vollständig geschützt. Alle Daten werden SSL-verschlüsselt übertragen und entsprechend den geltenden Datenschutzbestimmungen (DSGVO) behandelt. Ihre Privatsphäre ist mir wichtig.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Monica Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
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
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-xl font-bold text-primary mb-2">Monica Meier</p>
              <p className="text-gray-600">Versicherungsberaterin in München</p>
              <p className="text-gray-600 mt-4">A&K Vorsorgespezialisten UG</p>
              <p className="text-gray-600 mt-4">📞 +49 171 1144557</p>
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
              <p className="font-bold text-white mb-4">Monica Meier</p>
              <p className="text-sm">Versicherungsmaklerin bei A&K Vorsorgespezialisten UG</p>
              <p className="text-sm text-gray-400 mt-2">Unabhängige Beratung für Zahnzusatzversicherungen</p>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Kontakt</p>
              <p className="text-sm">+49 171 1144557</p>
              <p className="text-sm">m.meier@vorsorgewerk24.de</p>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Links</p>
              <p className="text-sm"><a href="https://www.vvv360versichert.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">www.vvv360versichert.com</a></p>
              <p className="text-sm"><a href="https://www.vvv360versichert.com/impressum" target="_blank" rel="noopener noreferrer" className="hover:text-white">Impressum</a></p>
              <p className="text-sm"><a href="https://www.vvv360versichert.com/datenschutz" target="_blank" rel="noopener noreferrer" className="hover:text-white">Datenschutz</a></p>
            </div>
            <div className="flex items-center justify-end">
              <img src="/images/vvv-monica-logo.png" alt="VVV.MONICA" className="h-24 object-contain" />
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Monica Meier, A&K Vorsorgespezialisten UG. Alle Rechte vorbehalten. | <a href="https://www.vvv360versichert.com/impressum" target="_blank" rel="noopener noreferrer" className="hover:text-white">Impressum</a> | <a href="https://www.vvv360versichert.com/datenschutz" target="_blank" rel="noopener noreferrer" className="hover:text-white">Datenschutz</a></p>
          </div>
        </div>
      </footer>

      {/* FAQ Modal */}
      <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Häufig gestellte Fragen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition flex items-center justify-between"
                >
                  <span>{item.question}</span>
                  <span className="text-primary">{expandedFaq === index ? '−' : '+'}</span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
