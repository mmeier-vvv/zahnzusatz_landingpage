import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HealthCheckProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HealthCheck({ open, onOpenChange }: HealthCheckProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Contact + General
    name: "",
    email: "",
    phone: "",
    q1_insurance_status: "", // Versicherungsstatus
    q2_zahnersatz: "", // Zahnersatz (70/80/90/100%)
    q3_zahnbehandlung: "", // Zahnbehandlung (70/80/90/100%)
    q4_prophylaxe: "", // Prophylaxe (70/80/90/100%)
    // Step 2: Health Questions
    q5_health: "", // Gesundheitsfrage 1
    q6_health: "", // Gesundheitsfrage 2
    q7_health: "", // Gesundheitsfrage 3
    q8_health: "", // Gesundheitsfrage 4
    privacy_consent: false,
    data_consent: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      // Validate step 1
      if (!formData.name.trim() || !formData.email.trim()) {
        toast.error("Bitte füllen Sie Name und E-Mail aus");
        return;
      }
      setStep(2);
      return;
    }

    // Step 2: Submit form
    if (!formData.privacy_consent || !formData.data_consent) {
      toast.error("Bitte akzeptieren Sie die Datenschutzbestimmungen");
      return;
    }

    setLoading(true);

    try {
      const templateParams = {
        to_email: "m.meier@vorsorgewerk24.de",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        q1_insurance_status: formData.q1_insurance_status,
        q2_zahnersatz: formData.q2_zahnersatz,
        q3_zahnbehandlung: formData.q3_zahnbehandlung,
        q4_prophylaxe: formData.q4_prophylaxe,
        q5_health: formData.q5_health,
        q6_health: formData.q6_health,
        q7_health: formData.q7_health,
        q8_health: formData.q8_health,
      };

      await emailjs.send("service_tf8npv5", "template_tf8npv5", templateParams);
      
      toast.success("Vielen Dank! Ihre Anfrage wurde versendet. Monica wird sich bald bei Ihnen melden.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        q1_insurance_status: "",
        q2_zahnersatz: "",
        q3_zahnbehandlung: "",
        q4_prophylaxe: "",
        q5_health: "",
        q6_health: "",
        q7_health: "",
        q8_health: "",
        privacy_consent: false,
        data_consent: false,
      });
      setStep(1);
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Fehler beim Versenden. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {step === 1 ? "Schritt 1: Ihre Kontaktdaten" : "Schritt 2: Gesundheitsfragen"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              {/* Step 1: Contact + General Questions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 1: Ihr Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Max Mustermann"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Ihre E-Mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="max@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Ihre Telefonnummer
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+49 171 1234567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 2: Haben Sie bereits eine Zahnzusatzversicherung?
                  </label>
                  <select
                    name="q1_insurance_status"
                    value={formData.q1_insurance_status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="Nein">Nein</option>
                    <option value="Ja, aber ich möchte wechseln">Ja, aber ich möchte wechseln</option>
                    <option value="Ja, und ich bin zufrieden">Ja, und ich bin zufrieden</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 3: Welche Leistung für Zahnersatz (Implantate, Kronen, Brücken)?
                  </label>
                  <select
                    name="q2_zahnersatz"
                    value={formData.q2_zahnersatz}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="70%">70% Kostenübernahme</option>
                    <option value="80%">80% Kostenübernahme</option>
                    <option value="90%">90% Kostenübernahme</option>
                    <option value="100%">100% Kostenübernahme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 4: Welche Leistung für Zahnbehandlung (Füllungen, Wurzelbehandlung)?
                  </label>
                  <select
                    name="q3_zahnbehandlung"
                    value={formData.q3_zahnbehandlung}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="70%">70% Kostenübernahme</option>
                    <option value="80%">80% Kostenübernahme</option>
                    <option value="90%">90% Kostenübernahme</option>
                    <option value="100%">100% Kostenübernahme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 5: Welche Leistung für Prophylaxe (Zahnreinigung)?
                  </label>
                  <select
                    name="q4_prophylaxe"
                    value={formData.q4_prophylaxe}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="70%">70% Kostenübernahme</option>
                    <option value="80%">80% Kostenübernahme</option>
                    <option value="90%">90% Kostenübernahme</option>
                    <option value="100%">100% Kostenübernahme</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Step 2: Health Questions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 6: Haben Sie aktuell Zahnprobleme oder laufende Behandlungen?
                  </label>
                  <textarea
                    name="q5_health"
                    value={formData.q5_health}
                    onChange={handleInputChange}
                    placeholder="Bitte beschreiben Sie kurz..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 h-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 7: Wann war Ihre letzte Zahnreinigung?
                  </label>
                  <select
                    name="q6_health"
                    value={formData.q6_health}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="Weniger als 6 Monate">Weniger als 6 Monate</option>
                    <option value="6-12 Monate">6-12 Monate</option>
                    <option value="Mehr als 1 Jahr">Mehr als 1 Jahr</option>
                    <option value="Weiß ich nicht">Weiß ich nicht</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 8: Leiden Sie unter Zahnfleischproblemen oder Parodontose?
                  </label>
                  <select
                    name="q7_health"
                    value={formData.q7_health}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="Nein">Nein</option>
                    <option value="Ja, leicht">Ja, leicht</option>
                    <option value="Ja, schwer">Ja, schwer</option>
                    <option value="Weiß ich nicht">Weiß ich nicht</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Frage 9: Haben Sie Angst vor Zahnarztbesuchen?
                  </label>
                  <select
                    name="q8_health"
                    value={formData.q8_health}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="Nein">Nein</option>
                    <option value="Ja, leicht">Ja, leicht</option>
                    <option value="Ja, sehr">Ja, sehr</option>
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="privacy_consent"
                      checked={formData.privacy_consent}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      Ich akzeptiere die <a href="https://www.vvv360versichert.com/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Datenschutzerklärung</a>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="data_consent"
                      checked={formData.data_consent}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      Ich akzeptiere, dass meine Daten zur Beratung verwendet werden
                    </span>
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-3 justify-end pt-4">
            {step === 2 && (
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-900"
              >
                Zurück
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {step === 1 ? "Weiter" : loading ? "Wird versendet..." : "Anfrage absenden"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
