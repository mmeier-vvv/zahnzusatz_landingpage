# EmailJS Notification Template - Zahnzusatzversicherung Landingpage

## Betreff:
```
Neue Anfrage: Zahnzusatzversicherung - {{name}}
```

---

## Email Body (HTML-Format):

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 3px solid #1B8B7E;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        .header h1 {
            color: #1B8B7E;
            margin: 0;
            font-size: 24px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            background-color: #f0f8f7;
            color: #1B8B7E;
            padding: 10px 15px;
            border-left: 4px solid #1B8B7E;
            font-weight: bold;
            margin-bottom: 12px;
            border-radius: 4px;
            font-size: 14px;
        }
        .data-row {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            display: flex;
        }
        .data-row:last-child {
            border-bottom: none;
        }
        .data-label {
            font-weight: bold;
            color: #1B8B7E;
            width: 35%;
            min-width: 140px;
            font-size: 13px;
        }
        .data-value {
            color: #333;
            width: 65%;
            font-size: 13px;
        }
        .footer {
            text-align: center;
            padding-top: 15px;
            border-top: 1px solid #eee;
            color: #888;
            font-size: 11px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- HEADER -->
        <div class="header">
            <h1>📋 Neue Anfrage eingegangen</h1>
        </div>

        <!-- KUNDENDATEN -->
        <div class="section">
            <div class="section-title">Kundendaten</div>
            <div class="data-row">
                <div class="data-label">Name:</div>
                <div class="data-value">{{name}}</div>
            </div>
            <div class="data-row">
                <div class="data-label">Email:</div>
                <div class="data-value">{{email}}</div>
            </div>
            <div class="data-row">
                <div class="data-label">Telefon:</div>
                <div class="data-value">{{phone}}</div>
            </div>
            <div class="data-row">
                <div class="data-label">Geburtsdatum:</div>
                <div class="data-value">{{birthdate}}</div>
            </div>
            <div class="data-row">
                <div class="data-label">PLZ:</div>
                <div class="data-value">{{zip}}</div>
            </div>
        </div>

        <!-- GESUNDHEITSANGABEN -->
        <div class="section">
            <div class="section-title">Gesundheitsangaben</div>
            <div class="data-row">
                <div class="data-label">1. Laufende Zahnbehandlung:</div>
                <div class="data-value">{{q1}}</div>
            </div>
            <div class="data-row">
                <div class="data-label">2. Zahnbehandlungen in letzten 3 Jahren:</div>
                <div class="data-value">{{q2}}</div>
            </div>
            <div class="data-row">
                <div class="data-label">3. Fehlende Zähne:</div>
                <div class="data-value">{{q3}}</div>
            </div>
            <div class="data-row">
                <div class="data-label">4. Zahnersatz vorhanden:</div>
                <div class="data-value">{{q4}}</div>
            </div>
        </div>

        <!-- EINWILLIGUNG -->
        <div class="section">
            <div class="section-title">Einwilligung</div>
            <div class="data-row">
                <div class="data-label">Status:</div>
                <div class="data-value">{{consent}}</div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
            <p>Neue Anfrage über die Landingpage Zahnzusatzversicherung</p>
            <p>Monica Meier | Unabhängige Versicherungsmaklerin bei A&K Vorsorgespezialisten UG</p>
        </div>
    </div>
</body>
</html>
```

---

## Alternative: Einfache Text-Version

```
Neue Anfrage über die Landingpage Zahnzusatzversicherung

KUNDENDATEN:
Name: {{name}}
Email: {{email}}
Telefon: {{phone}}
Geburtsdatum: {{birthdate}}
PLZ: {{zip}}

GESUNDHEITSANGABEN:
1. Laufende Zahnbehandlung: {{q1}}
2. Zahnbehandlungen in letzten 3 Jahren: {{q2}}
3. Fehlende Zähne: {{q3}}
4. Zahnersatz vorhanden: {{q4}}

Einwilligung: {{consent}}
```

---

## Platzhalter-Variablen:

```
{{name}}           // Vorname + Nachname
{{email}}          // E-Mail-Adresse
{{phone}}          // Telefon
{{birthdate}}      // Geburtsdatum
{{zip}}            // PLZ
{{q1}}             // Laufende Zahnbehandlung
{{q2}}             // Zahnbehandlungen in letzten 3 Jahren
{{q3}}             // Fehlende Zähne
{{q4}}             // Zahnersatz vorhanden
{{consent}}        // Einwilligung (Ja/Nein)
```

---

## Integration in EmailJS:

1. Gehen Sie zu **emailjs.com** → Dashboard
2. Öffnen Sie das Template **`template_tf8npv5`**
3. Klicken Sie auf **"Edit Template"**
4. Ersetzen Sie den **Email Content** mit dem HTML-Code oben
5. Stellen Sie sicher, dass der **Betreff** lautet: `Neue Anfrage: Zahnzusatzversicherung - {{name}}`
6. Speichern Sie das Template

---

## Konfiguration in React (HealthCheck.tsx):

Die EmailJS Send-Funktion übergibt folgende Variablen:

```javascript
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
    q1: step2Data.q1,
    q2: step2Data.q2,
    q3: step2Data.q3,
    q4: step2Data.q4,
    consent: "Ja"
  }
);
```

---

## Test-Email senden:

1. Klicken Sie in EmailJS auf **"Send Test Email"**
2. Überprüfen Sie die Formatierung
3. Verifizieren Sie, dass alle Variablen korrekt ersetzt wurden
