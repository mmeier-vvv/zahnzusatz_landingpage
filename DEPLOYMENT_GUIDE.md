# Zahnzusatzversicherung Landingpage - Deployment Guide

## 📦 Projekt-Übersicht

Dies ist eine **React 19 + Tailwind CSS 4** Landingpage mit:
- ✅ Health-Check Formular (2-Schritt)
- ✅ EmailJS Integration (Formular-Versand)
- ✅ Chatbase Integration (Live-Chat)
- ✅ Responsive Design
- ✅ SEO-optimiert

---

## 🚀 Installation auf Ihrer Hosting-Domain

### Schritt 1: Voraussetzungen

Sie benötigen:
- **Node.js 18+** (https://nodejs.org/)
- **pnpm** oder **npm** (pnpm wird empfohlen)
- **Git** (optional, aber empfohlen)

Überprüfen Sie die Installation:
```bash
node --version
npm --version
```

---

### Schritt 2: Projekt entpacken

1. Entpacken Sie `zahnzusatz_landingpage_export.zip`
2. Öffnen Sie das Terminal/CMD im Projekt-Ordner
3. Navigieren Sie in den Ordner:
```bash
cd zahnzusatz_landingpage
```

---

### Schritt 3: Dependencies installieren

```bash
npm install
# oder mit pnpm:
pnpm install
```

Dies installiert alle notwendigen Pakete (React, Tailwind, shadcn/ui, etc.)

---

### Schritt 4: Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env.local` Datei im Projekt-Root:

```bash
# Analytics (Optional - für Umami Analytics)
VITE_ANALYTICS_ENDPOINT=https://your-analytics-domain.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# App Info
VITE_APP_TITLE=Zahnzusatzversicherung
VITE_APP_ID=zahnzusatz_landingpage
```

**Wichtig:** Die EmailJS und Chatbase Konfigurationen sind bereits im Code enthalten.

---

### Schritt 5: Lokal testen

```bash
npm run dev
# oder mit pnpm:
pnpm dev
```

Die Seite ist dann verfügbar unter: **http://localhost:5173**

---

### Schritt 6: Für Production bauen

```bash
npm run build
# oder mit pnpm:
pnpm build
```

Dies erstellt einen optimierten `dist/` Ordner mit allen Dateien.

---

### Schritt 7: Auf Hosting deployen

#### Option A: Statischer Hosting (Empfohlen)

Für Services wie **Netlify**, **Vercel**, **GitHub Pages**:

1. Bauen Sie das Projekt:
```bash
npm run build
```

2. Laden Sie den `dist/` Ordner hoch
3. Stellen Sie sicher, dass **SPA Routing** aktiviert ist (alle Requests zu `index.html` leiten)

#### Option B: Node.js Hosting

Für Services wie **Railway**, **Render**, **Heroku**:

1. Bauen Sie das Projekt:
```bash
npm run build
```

2. Laden Sie den kompletten Projekt-Ordner hoch
3. Stellen Sie sicher, dass die Build-Befehle ausgeführt werden

#### Option C: Eigener Server (VPS/Dedicated)

1. Installieren Sie Node.js auf dem Server
2. Klonen Sie das Projekt oder laden Sie die Dateien hoch
3. Installieren Sie Dependencies:
```bash
npm install
```

4. Bauen Sie das Projekt:
```bash
npm run build
```

5. Starten Sie den Dev-Server:
```bash
npm run dev
```

Oder verwenden Sie **PM2** für Production:
```bash
npm install -g pm2
pm2 start "npm run dev" --name "zahnzusatz"
```

---

## 🔧 Wichtige Konfigurationen

### EmailJS Integration

Die EmailJS Konfiguration ist in `client/src/pages/HealthCheck.tsx` enthalten:

```typescript
const serviceID = "service_xxxxxxx";
const templateID = "template_xxxxxxx";
const publicKey = "your_public_key";
```

**Überprüfen Sie diese Werte** und passen Sie sie ggf. an!

### Chatbase Integration

Die Chatbase ID ist in `client/index.html` enthalten:

```html
<script id="LSJBnNuHnDnD6Edt9WfcI" ...></script>
```

Dies ist bereits konfiguriert und sollte funktionieren.

---

## 📧 Email-Template in EmailJS

Das Email-Template sollte folgende Variablen enthalten:

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

## 🌐 Domain-Konfiguration

### SSL/HTTPS

Stellen Sie sicher, dass Ihre Domain **HTTPS** unterstützt (kostenlos mit Let's Encrypt).

### DNS-Einstellungen

Wenn Sie eine Custom Domain verwenden:
1. Aktualisieren Sie die DNS-Einträge bei Ihrem Domain-Provider
2. Weisen Sie die Domain auf Ihren Hosting-Server hin

---

## 🧪 Testing vor dem Launch

Überprüfen Sie folgende Punkte:

- [ ] Startseite lädt korrekt
- [ ] Health-Check Formular funktioniert
- [ ] Formular-Daten werden per Email versendet
- [ ] Chatbot ist sichtbar und funktioniert
- [ ] Mobile-Ansicht ist responsive
- [ ] Links funktionieren alle
- [ ] Bilder laden korrekt
- [ ] Analytics funktioniert (falls konfiguriert)

---

## 🐛 Häufige Probleme & Lösungen

### Problem: "Cannot find module"
**Lösung:**
```bash
rm -rf node_modules
npm install
```

### Problem: Port 5173 ist bereits in Verwendung
**Lösung:**
```bash
npm run dev -- --port 3000
```

### Problem: Formular wird nicht versendet
**Lösung:**
- Überprüfen Sie die EmailJS Konfiguration
- Testen Sie die EmailJS Service-ID und Template-ID
- Überprüfen Sie die Browser-Konsole auf Fehler

### Problem: Chatbot wird nicht angezeigt
**Lösung:**
- Überprüfen Sie, dass die Chatbase ID korrekt ist
- Clearen Sie den Browser-Cache
- Testen Sie in einem Incognito-Fenster

---

## 📊 Performance-Optimierung

### Build-Größe prüfen
```bash
npm run build
# Überprüfen Sie die dist/ Ordner-Größe
```

### Bilder optimieren
Alle Bilder sind bereits optimiert. Falls Sie neue Bilder hinzufügen:
- Verwenden Sie WebP-Format
- Komprimieren Sie Bilder (z.B. mit TinyPNG)
- Verwenden Sie responsive Images

---

## 🔐 Sicherheit

### Environment Variables
Speichern Sie **niemals** sensible Daten im Code:
- EmailJS Keys → `.env.local`
- API Keys → `.env.local`
- Secrets → `.env.local`

### CORS
Falls Sie API-Calls von anderen Domains machen, konfigurieren Sie CORS richtig.

---

## 📞 Support & Kontakt

Falls Sie Probleme haben:
1. Überprüfen Sie die Browser-Konsole (F12)
2. Überprüfen Sie die Server-Logs
3. Kontaktieren Sie den Support der Hosting-Plattform

---

## 🎉 Nächste Schritte nach dem Deployment

1. **Monitoring einrichten**: Überwachen Sie die Seite auf Fehler
2. **Analytics aktivieren**: Tracken Sie Besucher und Conversions
3. **SEO optimieren**: Überprüfen Sie Meta-Tags und Sitemap
4. **Backups erstellen**: Sichern Sie regelmäßig Ihre Daten
5. **Updates durchführen**: Halten Sie Dependencies aktuell

---

## 📝 Projekt-Struktur

```
zahnzusatz_landingpage/
├── client/
│   ├── public/              # Statische Assets (Bilder, Logos)
│   ├── src/
│   │   ├── components/      # React Komponenten
│   │   ├── pages/           # Seiten (Home, HealthCheck)
│   │   ├── contexts/        # React Contexts
│   │   ├── hooks/           # Custom Hooks
│   │   ├── lib/             # Utility-Funktionen
│   │   ├── App.tsx          # Haupt-App
│   │   ├── main.tsx         # Entry Point
│   │   └── index.css        # Global Styles
│   └── index.html           # HTML Template
├── package.json             # Dependencies
├── vite.config.ts           # Vite Konfiguration
└── tailwind.config.ts       # Tailwind Konfiguration
```

---

## 🚀 Viel Erfolg mit Ihrer Landingpage!

Wenn Sie Fragen haben, zögern Sie nicht zu fragen. 😊
