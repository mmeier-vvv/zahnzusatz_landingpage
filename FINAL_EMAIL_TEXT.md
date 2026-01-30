# Finaler Email-Text für EmailJS Template

## Betreff:
```
Neue Anfrage: Zahnzusatzversicherung - {{name}}
```

---

## Email Body (Text-Format - FINAL):

```
Neue Anfrage über die Landingpage Zahnzusatzversicherung

KUNDENDATEN:
Name: {{name}}
Email: {{email}}
Telefon: {{phone}}
Geburtsdatum: {{birthdate}}
PLZ: {{zip}}

ALLGEMEINE ANGABEN:
1. Versicherungsstatus: {{q1}}
2. Leistungswunsch Zahnersatz: {{q2}}
3. Leistungswunsch Zahnbehandlung: {{q3}}
4. Leistungswunsch Prophylaxe: {{q4}}

GESUNDHEITSANGABEN:
5. Laufende Zahnbehandlung: {{q5}}
6. Zahnbehandlungen in letzten 3 Jahren: {{q6}}
7. Fehlende Zähne: {{q7}}
8. Zahnersatz vorhanden: {{q8}}

Einwilligung: {{consent}}
```

---

## Anleitung zur Integration in EmailJS:

### Schritt 1: EmailJS Dashboard öffnen
1. Gehen Sie zu **https://www.emailjs.com/**
2. Melden Sie sich an
3. Gehen Sie zum **Dashboard**

### Schritt 2: Template bearbeiten
1. Wählen Sie Ihren **Service** (z.B. Gmail)
2. Öffnen Sie das Template **`template_tf8npv5`**
3. Klicken Sie auf **"Edit Template"**

### Schritt 3: Email-Inhalt einfügen
1. Gehen Sie zum **"Email Content"** Feld
2. Ersetzen Sie den bestehenden Inhalt mit dem **Text oben**
3. Speichern Sie das Template

### Schritt 4: Template-Einstellungen überprüfen
- **Service ID**: `service_e9rg4ka`
- **Template ID**: `template_tf8npv5`
- **To Email**: `m.meier@vorsorgewerk24.de`
- **Subject**: `Neue Anfrage: Zahnzusatzversicherung - {{name}}`

### Schritt 5: Test-Email senden
1. Klicken Sie auf **"Send Test Email"**
2. Überprüfen Sie, dass alle Variablen korrekt ersetzt wurden
3. Verifizieren Sie die Formatierung

---

## Variablenmapping (React → EmailJS):

```javascript
// Allgemeine Angaben (Step 1)
q1  = step1Data.insuranceStatus          // z.B. "Gesetzlich versichert (Pflicht)"
q2  = step1Data.zahnersatzCoverage       // z.B. "80%"
q3  = step1Data.zahnbehandlungCoverage   // z.B. "90%"
q4  = step1Data.prophylaxeCoverage       // z.B. "100%"

// Gesundheitsfragen (Step 2)
q5  = step2Data.q1                       // z.B. "Ja"
q6  = step2Data.q2                       // z.B. "Nein"
q7  = step2Data.q3                       // z.B. "1"
q8  = step2Data.q4                       // z.B. "Unsicher"

// Kontaktdaten
name      = firstName + " " + lastName
email     = step1Data.email
phone     = step1Data.phone
birthdate = step1Data.birthDate
zip       = step1Data.plz

// Einwilligung
consent   = "Ja"
```

---

## Beispiel einer ausgefüllten Email:

```
Neue Anfrage über die Landingpage Zahnzusatzversicherung

KUNDENDATEN:
Name: Max Mustermann
Email: max@example.de
Telefon: +49 171 1234567
Geburtsdatum: 01.01.1990
PLZ: 80131

ALLGEMEINE ANGABEN:
1. Versicherungsstatus: Gesetzlich versichert (Pflicht)
2. Leistungswunsch Zahnersatz: 80%
3. Leistungswunsch Zahnbehandlung: 90%
4. Leistungswunsch Prophylaxe: 100%

GESUNDHEITSANGABEN:
5. Laufende Zahnbehandlung: Nein
6. Zahnbehandlungen in letzten 3 Jahren: Ja
7. Fehlende Zähne: 1
8. Zahnersatz vorhanden: Unsicher

Einwilligung: Ja
```

---

## Wichtige Hinweise:

✅ **Alle 8 Fragen** sind durchnummeriert (1-4 Allgemeine Angaben, 5-8 Gesundheit)
✅ **Alle Variablen** entsprechen dem React-Code
✅ **Klare Struktur** für einfache Lesbarkeit
✅ **Text-Format** funktioniert in allen Email-Clients
✅ **Professionell** und übersichtlich formatiert

---

## Troubleshooting:

**Problem**: Variablen werden nicht ersetzt (z.B. "{{name}}" statt "Max Mustermann")
**Lösung**: 
1. Überprüfen Sie, dass die Variablennamen exakt mit dem React-Code übereinstimmen
2. Stellen Sie sicher, dass Sie die **korrekten Variablennamen** verwenden (q1-q8, nicht insurance_status, etc.)
3. Testen Sie mit "Send Test Email" im EmailJS Dashboard

**Problem**: Email kommt nicht an
**Lösung**:
1. Überprüfen Sie, dass die **Service ID** und **Template ID** korrekt sind
2. Überprüfen Sie, dass die **To Email** auf `m.meier@vorsorgewerk24.de` gesetzt ist
3. Überprüfen Sie die EmailJS Logs im Dashboard
