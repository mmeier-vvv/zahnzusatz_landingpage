import { Link } from "wouter";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-teal-600 hover:text-teal-700 font-semibold">
            ← Zurück zur Startseite
          </Link>
          <h1 className="text-4xl font-bold mt-4">Impressum</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 Telemedien-Digitale-Dienste-Gesetz (TDDDG)</h2>
            
            <div className="bg-card p-6 rounded-lg mb-6">
              <p className="font-semibold mb-2">Monica Meier</p>
              <p>Starnberger Str. 24</p>
              <p>82131 Gauting</p>
              <p className="mt-4">
                <strong>Festnetz:</strong> <a href="tel:+498920175965" className="text-teal-600 hover:text-teal-700">+49 89 20175965</a>
              </p>
              <p>
                <strong>Mobil:</strong> <a href="tel:+491711144557" className="text-teal-600 hover:text-teal-700">+49 171 1144557</a>
              </p>
              <p>
                <strong>E-Mail:</strong> <a href="mailto:m.meier@vorsorgewerk24.de" className="text-teal-600 hover:text-teal-700">m.meier@vorsorgewerk24.de</a>
              </p>
              <p>
                <strong>Internet:</strong> <a href="https://www.vorsorgewerk24.de" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">www.vorsorgewerk24.de</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Berufsrechtliche Angaben</h2>
            
            <p>Ich bin als selbstständige Handelsvertreterin gemäß § 84 HGB tätig.</p>
            
            <p className="mt-4">Die Vermittlung von Versicherungs- und Energieleistungen erfolgt ausschließlich im Namen und auf Rechnung der folgenden Kooperationspartner:</p>
            
            <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
              <li>
                <strong>A&K Vorsorgespezialisten UG</strong>, Sonnenhang 10A, 51381 Leverkusen (Versicherungsvermittlung, registriert nach § 34d GewO)
              </li>
              <li>
                <strong>4Motion GmbH</strong>, Rosa-Luxemburg-Str. 19/21, 04103 Leipzig (Energievermittlung, Strom und Gas)
              </li>
            </ul>
            
            <p className="mt-4">Makler- bzw. Vermittlungsverträge kommen ausschließlich zwischen dem Kunden und dem jeweiligen Kooperationspartner zustande.</p>
            
            <p className="mt-4">Ich selbst verfüge über keine eigene Erlaubnis gemäß § 34d GewO.</p>
            
            <p className="mt-4">Die rechtliche Verantwortung für die Vermittlungstätigkeit liegt ausschließlich bei den jeweiligen Partnerunternehmen.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Haftung für Inhalte</h2>
            
            <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehme ich keine Gewähr. Als Diensteanbieterin bin ich gemäß § 7 Abs. 1 TDDDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Hinweis zu Formularen & Datenerhebung</h2>
            
            <p>Wenn Sie über diese Website personenbezogene Daten übermitteln (z. B. per Kontaktformular oder Checkliste), erfolgt die Erhebung ausschließlich im Auftrag und zur Weiterleitung an den zuständigen Kooperationspartner mit entsprechender Erlaubnis nach § 34d GewO.</p>
            
            <p className="mt-4">Ich verarbeite Ihre Angaben nicht für eigene Zwecke, sondern lediglich als Vermittlungshelferin im Rahmen meiner Tätigkeit als Handelsvertreterin.</p>
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
