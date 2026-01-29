import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

/**
 * Health Check Form Page - Professional Insurance Pre-Check
 * - Step 1: General Information + Contact Data + Coverage Wishes
 * - Step 2: Health Questions (4 questions) + Data processing consent
 * - Design: Professional, accessible, compliant with insurance standards
 */

export default function HealthCheck() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    try {
      emailjs.init("lsXqGDCJzD5A2y6Dw");
      console.log("EmailJS initialized for HealthCheck");
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
    }
  }, []);

  // Step 1: General Information + Contact Data
  const [step1Data, setStep1Data] = useState({
    // Contact Data
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phone: "",
    plz: "",
    // General Information
    insuranceStatus: "",
    zahnersatzCoverage: "",
    zahnbehandlungCoverage: "",
    prophylaxeCoverage: "",
  });

  // Step 2: Health Questions + Consent
  const [step2Data, setStep2Data] = useState({
    // Health Questions
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    // Consent
    consent1: false,
    consent2: false,
    consent3: false,
  });

  const handleStep1Change = useCallback((field: string, value: string | boolean) => {
    setStep1Data((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleStep2Change = useCallback((field: string, value: string | boolean) => {
    setStep2Data((prev) => ({ ...prev, [field]: value }));
  }, []);

  const isStep1Valid = () => {
    return (
      step1Data.firstName.trim() !== "" &&
      step1Data.lastName.trim() !== "" &&
      step1Data.birthDate.trim() !== "" &&
      step1Data.email.trim() !== "" &&
      step1Data.insuranceStatus !== "" &&
      step1Data.zahnersatzCoverage !== "" &&
      step1Data.zahnbehandlungCoverage !== "" &&
      step1Data.prophylaxeCoverage !== ""
    );
  };

  const isStep2Valid = () => {
    return (
      step2Data.q1 !== "" &&
      step2Data.q2 !== "" &&
      step2Data.q3 !== "" &&
      step2Data.q4 !== "" &&
      step2Data.consent1 &&
      step2Data.consent2 &&
      step2Data.consent3
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid()) {
      toast.error("Bitte füllen Sie alle erforderlichen Felder aus");
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

      console.log("Sending health check data to Monica Meier...");

      // Send email to Monica with all data
      const response = await emailjs.send(
        "service_e9rg4ka",
        "template_tf8npv5",
        {
          to_email: "m.meier@vorsorgewerk24.de",
          name: `${step1Data.firstName} ${step1Data.lastName}`,
          email: step1Data.email,
          phone: step1Data.phone || "Nicht angegeben",
          birthdate: step1Data.birthDate,
          zip: step1Data.plz || "Nicht angegeben",
          q1: step1Data.insuranceStatus,
          q2: step1Data.zahnersatzCoverage,
          q3: step1Data.zahnbehandlungCoverage,
          q4: step1Data.prophylaxeCoverage,
          q5: step2Data.q1,
          q6: step2Data.q2,
          q7: step2Data.q3,
          q8: step2Data.q4,
          consent: "Ja"
        }
      );
      console.log("Health check email sent:", response);

      // Send confirmation email to visitor
      const confirmResponse = await emailjs.send(
        "service_e9rg4ka",
        "template_auxmtjj",
        {
          email: step1Data.email,
          name: step1Data.firstName
        }
      );
      console.log("Confirmation email sent:", confirmResponse);

      toast.success("Vorprüfung erfolgreich eingereicht! Sie erhalten in Kürze eine Bestätigungsmail.");
      setSubmitted(true);
      setTimeout(() => {
        setLocation("/");
      }, 3000);
    } catch (error) {
      console.error("Fehler beim Senden:", error);
      toast.error("Es gab einen Fehler beim Senden Ihrer Vorprüfung. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Zurück
          </button>
          <h1 className="text-lg font-bold text-gray-900">Unverbindliche Vorprüfung</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex gap-4 mb-6">
              <div
                className={`flex-1 h-2 rounded-full transition ${
                  step >= 1 ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex-1 h-2 rounded-full transition ${
                  step >= 2 ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Schritt {step} von 2 • {step === 1 ? "Allgemeine Angaben & Kontaktdaten" : "Gesundheitsfragen"}
            </p>
          </div>

          {submitted ? (
            // Success Message
            <div className="bg-white rounded-xl p-12 text-center border-2 border-green-200">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Vielen Dank!
              </h2>
              <p className="text-gray-600 mb-6">
                Deine Vorprüfung wurde erfolgreich eingereicht. Ich werde mich in Kürze mit dir in Verbindung setzen, um die passenden Tarifoptionen zu besprechen.
              </p>
              <p className="text-sm text-gray-500">
                Du wirst in Kürze zur Startseite weitergeleitet...
              </p>
            </div>
          ) : step === 1 ? (
            // Step 1: General Information + Contact Data
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="bg-white rounded-xl p-8 md:p-12 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Schritt 1: Allgemeine Angaben
              </h2>
              <p className="text-gray-600 mb-8">
                Bitte gib deine Kontaktdaten, Versicherungssituation und deine Leistungswünsche an.
              </p>

              <div className="space-y-8">
                {/* Contact Data Section */}
                <div className="pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Kontaktdaten</h3>
                  
                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        required
                        value={step1Data.firstName}
                        onChange={(e) => handleStep1Change("firstName", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Max"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        required
                        value={step1Data.lastName}
                        onChange={(e) => handleStep1Change("lastName", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>

                  {/* Birth Date */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Geburtsdatum * (TT.MM.JJJJ)
                    </label>
                    <input
                      type="text"
                      required
                      value={step1Data.birthDate}
                      onChange={(e) => handleStep1Change("birthDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="01.01.1990"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      required
                      value={step1Data.email}
                      onChange={(e) => handleStep1Change("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="deine@email.de"
                    />
                  </div>

                  {/* Phone & PLZ Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Telefon (optional)
                      </label>
                      <input
                        type="tel"
                        value={step1Data.phone}
                        onChange={(e) => handleStep1Change("phone", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+49 171 1234567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        PLZ (optional)
                      </label>
                      <input
                        type="text"
                        value={step1Data.plz}
                        onChange={(e) => handleStep1Change("plz", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="80000"
                      />
                    </div>
                  </div>
                </div>

                {/* Question 1 - Insurance Status */}
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    1. Versicherungsstatus *
                  </p>
                  <div className="space-y-3">
                    {["Gesetzlich versichert (Pflicht)", "Gesetzlich versichert (Freiwillig)", "Privat versichert"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition">
                        <input
                          type="radio"
                          name="insuranceStatus"
                          value={option}
                          checked={step1Data.insuranceStatus === option}
                          onChange={(e) => handleStep1Change("insuranceStatus", e.target.value)}
                          className="w-5 h-5 text-primary cursor-pointer accent-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 2 - Zahnersatz Coverage */}
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    2. Leistungswunsch Zahnersatz (z. B. Kronen, Implantate, Brücken) *
                  </p>
                  <div className="space-y-3">
                    {["70%", "80%", "90%", "100%"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition">
                        <input
                          type="radio"
                          name="zahnersatzCoverage"
                          value={option}
                          checked={step1Data.zahnersatzCoverage === option}
                          onChange={(e) => handleStep1Change("zahnersatzCoverage", e.target.value)}
                          className="w-5 h-5 text-primary cursor-pointer accent-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">{option} Kostenübernahme</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 3 - Zahnbehandlung Coverage */}
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    3. Leistungswunsch Zahnbehandlung (z. B. Füllungen, Wurzelbehandlung, Parodontose) *
                  </p>
                  <div className="space-y-3">
                    {["70%", "80%", "90%", "100%"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition">
                        <input
                          type="radio"
                          name="zahnbehandlungCoverage"
                          value={option}
                          checked={step1Data.zahnbehandlungCoverage === option}
                          onChange={(e) => handleStep1Change("zahnbehandlungCoverage", e.target.value)}
                          className="w-5 h-5 text-primary cursor-pointer accent-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">{option} Kostenübernahme</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 4 - Prophylaxe Coverage */}
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    4. Leistungswunsch Prophylaxe / Zahnreinigung *
                  </p>
                  <div className="space-y-3">
                    {["70%", "80%", "90%", "100%"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition">
                        <input
                          type="radio"
                          name="prophylaxeCoverage"
                          value={option}
                          checked={step1Data.prophylaxeCoverage === option}
                          onChange={(e) => handleStep1Change("prophylaxeCoverage", e.target.value)}
                          className="w-5 h-5 text-primary cursor-pointer accent-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">{option} Kostenübernahme</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  className="flex-1"
                >
                  Abbrechen
                </Button>
                <Button
                  type="submit"
                  disabled={!isStep1Valid()}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Weiter zu Schritt 2
                </Button>
              </div>
            </form>
          ) : (
            // Step 2: Health Questions + Consent
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-8 md:p-12 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Schritt 2: Gesundheitsfragen
              </h2>
              <p className="text-gray-600 mb-4">
                (Dauer: ca. 3 Minuten) Bitte beantworte die folgenden Fragen nach bestem Wissen. Unsicher? Kein Problem – einfach angeben.
              </p>
              <div className="bg-blue-50 border-l-4 border-primary p-4 mb-8 rounded">
                <p className="text-gray-800 font-semibold">
                  Um Ihnen ein passendes Angebot berechnen zu können, bitte füllen Sie die folgenden Fragen ehrlich und vollständig aus. Ihre Angaben sind vertraulich und werden nur zur Tarifberechnung verwendet.
                </p>
              </div>

              <div className="space-y-8 mb-8">
                {/* Question 5 */}
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    5. Besteht aktuell eine laufende oder angeratene Zahnbehandlung?
                  </p>
                  <div className="space-y-3">
                    {["Nein", "Ja", "Unsicher"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition">
                        <input
                          type="radio"
                          name="q1"
                          value={option}
                          checked={step2Data.q1 === option}
                          onChange={(e) => handleStep2Change("q1", e.target.value)}
                          className="w-5 h-5 text-primary cursor-pointer accent-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 6 */}
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    6. Wurden in den letzten 3 Jahren Zahnbehandlungen angeraten oder begonnen? (z. B. Krone, Brücke, Implantat, Parodontose, Wurzelbehandlung)
                  </p>
                  <div className="space-y-3">
                    {["Nein", "Ja", "Unsicher"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition">
                        <input
                          type="radio"
                          name="q2"
                          value={option}
                          checked={step2Data.q2 === option}
                          onChange={(e) => handleStep2Change("q2", e.target.value)}
                          className="w-5 h-5 text-primary cursor-pointer accent-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 7 */}
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    7. Fehlen Zähne (außer Weisheitszähne)?
                  </p>
                  <div className="space-y-3">
                    {["Nein", "1", "2", "3", "4 oder mehr"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition">
                        <input
                          type="radio"
                          name="q3"
                          value={option}
                          checked={step2Data.q3 === option}
                          onChange={(e) => handleStep2Change("q3", e.target.value)}
                          className="w-5 h-5 text-primary cursor-pointer accent-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 8 - Zahnersatz */}
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    8. Ist aktuell Zahnersatz vorhanden oder geplant?
                  </p>
                  <div className="space-y-3">
                    {["Nein", "Ja", "Unsicher"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition">
                        <input
                          type="radio"
                          name="q4"
                          value={option}
                          checked={step2Data.q4 === option}
                          onChange={(e) => handleStep2Change("q4", e.target.value)}
                          className="w-5 h-5 text-primary cursor-pointer accent-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consent Section */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Einwilligung in die Verarbeitung von Gesundheitsdaten (Pflicht)
                </h3>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={step2Data.consent1}
                      onChange={(e) => handleStep2Change("consent1", e.target.checked)}
                      className="w-5 h-5 text-primary cursor-pointer mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      Ich willige ausdrücklich ein, dass meine im Rahmen der Vorprüfung gemachten Angaben zu meinem Zahn- und Gesundheitsstatus von Monica Meier, unabhängige Versicherungsmaklerin, zum Zweck der Beratung, Tarifprüfung und Angebotserstellung verarbeitet werden.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={step2Data.consent2}
                      onChange={(e) => handleStep2Change("consent2", e.target.checked)}
                      className="w-5 h-5 text-primary cursor-pointer mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      Ich bin damit einverstanden, dass diese Angaben – ohne Nennung meines Namens und meiner Anschrift (anonymisiert) – sofern zur Tarifprüfung erforderlich, an ausgewählte Versicherungsgesellschaften übermittelt werden.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={step2Data.consent3}
                      onChange={(e) => handleStep2Change("consent3", e.target.checked)}
                      className="w-5 h-5 text-primary cursor-pointer mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      Mir ist bekannt, dass ich diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen kann. Weitere Informationen finde ich in der{" "}
                      <a href="#" className="text-primary hover:underline font-medium">
                        Datenschutzerklärung
                      </a>
                      .
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Zurück
                </Button>
                <Button
                  type="submit"
                  disabled={!isStep2Valid() || loading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Wird gesendet..." : "Anfrage absenden"}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-6">
                Deine Daten werden sicher und vertraulich behandelt.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
