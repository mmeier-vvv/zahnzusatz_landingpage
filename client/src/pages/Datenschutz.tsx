import { Link } from "wouter";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-teal-600 hover:text-teal-700 font-semibold">
            ← Zurück zur Startseite
          </Link>
          <h1 className="text-4xl font-bold mt-4">Datenschutzerklärung</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Verantwortlicher im Sinne der DSGVO</h2>
            
            <p>Für die Verarbeitung personenbezogener Daten im Rahmen dieser Website ist verantwortlich:</p>
            
            <div className="bg-card p-6 rounded-lg mt-4 mb-6">
              <p className="font-semibold mb-2">Monica Meier</p>
              <p>Starnberger Str. 24, 82131 Gauting</p>
              <p className="mt-4">
                <strong>Festnetz:</strong> <a href="tel:+498920175965" className="text-teal-600 hover:text-teal-700">+49 89 20175965</a>
              </p>
              <p>
                <strong>Mobil:</strong> <a href="tel:+491711144557" className="text-teal-600 hover:text-teal-700">+49 171 1144557</a>
              </p>
              <p>
                <strong>E-Mail:</strong> <a href="mailto:m.meier@vorsorgewerk24.de" className="text-teal-600 hover:text-teal-700">m.meier@vorsorgewerk24.de</a>
              </p>
            </div>
            
            <p>Ich bin als selbstständige Handelsvertreterin gemäß § 84 HGB tätig und arbeite in Kooperation mit folgenden Partnerunternehmen:</p>
            
            <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
              <li><strong>A&K Vorsorgespezialisten UG</strong>, Sonnenhang 10A, 51381 Leverkusen (Versicherungsvermittlung)</li>
              <li><strong>4Motion GmbH</strong>, Rosa-Luxemburg-Str. 19/21, 04103 Leipzig (Energievermittlung: Strom & Gas)</li>
            </ul>
            
            <p className="mt-4">Die jeweilige Vermittlung erfolgt ausschließlich im Namen und auf Rechnung der genannten Partnerunternehmen.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Zwecke der Datenverarbeitung & Rechtsgrundlagen</h2>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-bold mb-2">Betrieb dieser Website</h3>
                <p><strong>Zweck:</strong> Technische Bereitstellung, Sicherheit, Optimierung</p>
                <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</p>
              </div>
              
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-bold mb-2">Kontaktaufnahme über das Formular oder per E-Mail</h3>
                <p><strong>Zweck:</strong> Vertragsanbahnung und Weiterleitung an die jeweiligen Kooperationspartner</p>
                <p><strong>Rechtsgrundlage:</strong></p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
                  <li>Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg">
                <h3 className="font-bold mb-2">Verarbeitung durch Kooperationspartner im Rahmen des Mandats</h3>
                <p><strong>Zweck:</strong> Beratung, Vermittlung und Betreuung von Versicherungs- bzw. Energieverträgen</p>
                <p><strong>Verantwortlich:</strong> A&K Vorsorgespezialisten UG bzw. 4Motion GmbH</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Kategorien verarbeiteter Daten</h2>
            
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name, E-Mail-Adresse, Telefonnummer</li>
              <li>Inhalte aus Anfragen und Formularen</li>
              <li>Angaben zum Versicherungs- oder Energiebedarf</li>
              <li>Technische Daten (z. B. IP-Adresse, Datum/Uhrzeit, Browser)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Speicherdauer</h2>
            
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Leaddaten auf dieser Website:</strong> max. 6 Monate nach letzter Aktivität oder Widerruf der Einwilligung</li>
              <li><strong>Vertragsbezogene Daten bei den Kooperationspartnern:</strong>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Während der Mandatsdauer</li>
                  <li>6 Jahre (z. B. Korrespondenz)</li>
                  <li>10 Jahre (z. B. Abrechnungen, steuerlich relevante Unterlagen)</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Betroffenenrechte</h2>
            
            <p>Sie haben jederzeit das Recht auf:</p>
            
            <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO), sofern keine gesetzlichen Pflichten entgegenstehen</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            
            <div className="bg-card p-4 rounded-lg mt-6">
              <p className="font-semibold mb-2">Ansprechpartner für Website-bezogene Datenverarbeitung:</p>
              <p>Monica Meier, <a href="mailto:m.meier@vorsorgewerk24.de" className="text-teal-600 hover:text-teal-700">m.meier@vorsorgewerk24.de</a></p>
              
              <p className="font-semibold mt-4 mb-2">Ansprechpartner für die Verarbeitung im Rahmen eines Mandats:</p>
              <p>Der jeweilige Kooperationspartner (A&K Vorsorgespezialisten UG bzw. 4Motion GmbH)</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Beschwerderecht bei der Aufsichtsbehörde</h2>
            
            <p>Sie haben das Recht, sich bei der für Sie zuständigen Landesdatenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass Ihre personenbezogenen Daten unrechtmäßig verarbeitet werden.</p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/" className="text-teal-600 hover:text-teal-700 font-semibold">
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
