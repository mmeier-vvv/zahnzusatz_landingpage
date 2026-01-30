# Chatbase Willkommensnachricht konfigurieren

## Schritt-für-Schritt Anleitung

### Schritt 1: Chatbase Dashboard öffnen
1. Gehen Sie zu **https://www.chatbase.co/**
2. Melden Sie sich an
3. Wählen Sie Ihren Chatbot aus

---

### Schritt 2: Zu den Einstellungen gehen
1. Klicken Sie auf **Settings** (Zahnrad-Icon)
2. Wählen Sie **Chatbot Settings** oder **Configuration**

---

### Schritt 3: Willkommensnachricht konfigurieren

Suchen Sie nach einer der folgenden Optionen:
- **"Welcome Message"**
- **"Initial Message"**
- **"Greeting Message"**
- **"First Message"**

---

### Schritt 4: Nachricht einfügen

Kopieren Sie diese Nachricht:

```
Hallo! 👋 Möchtest du eine unverbindliche Zahnzusatz-Vorprüfung machen? 

Mit unserer schnellen Vorprüfung finden wir die beste Versicherung für dich:
✓ Nur 2 Minuten
✓ Kostenlos & unverbindlich
✓ Sofort Ergebnis

Starten wir? 🦷
```

---

### Schritt 5: Buttons/Quick Replies hinzufügen (Optional)

Falls Chatbase Quick Reply Buttons unterstützt, fügen Sie diese hinzu:

**Button 1:**
- Text: "Ja, Vorprüfung starten"
- Action: Link zu `/health-check`

**Button 2:**
- Text: "Später"
- Action: "Später nachdenken"

---

### Schritt 6: Speichern

1. Klicken Sie auf **Save** oder **Update**
2. Testen Sie den Chatbot auf Ihrer Website

---

## Alternative Nachrichtenideen

### Variante 1 - Kurz & prägnant:
```
Hallo! 👋 Zahnzusatzversicherung in 2 Minuten? 
Starten Sie jetzt Ihre unverbindliche Vorprüfung!
```

### Variante 2 - Mit Benefit:
```
Hallo! 👋 Wusstest du, dass eine Zahnzusatzversicherung dir tausende Euro sparen kann?

Lass mich dir zeigen, welcher Tarif zu dir passt - völlig kostenlos!
```

### Variante 3 - Mit CTA:
```
Hallo! 👋 Willkommen bei Monica Meier!

Ich helfe dir, die perfekte Zahnzusatzversicherung zu finden. 
Möchtest du eine schnelle Vorprüfung machen? (2 Min)

👉 Jetzt starten
```

---

## Zusätzliche Tipps

### 1. Nachricht Timing
- Stellen Sie sicher, dass die Nachricht **sofort** nach dem Laden angezeigt wird
- Nicht zu aufdringlich - Besucher sollten sie schließen können

### 2. Personalisierung
- Nutzen Sie den Namen des Besuchers, falls möglich
- Beispiel: "Hallo {name}! 👋"

### 3. Link zur Health-Check Seite
- Wenn Chatbase Links unterstützt, verlinken Sie direkt zu: `/health-check`
- Oder nutzen Sie einen Button mit dieser URL

### 4. A/B Testing
- Testen Sie verschiedene Nachrichten
- Messen Sie die Conversion Rate
- Optimieren Sie basierend auf den Ergebnissen

---

## Häufige Probleme & Lösungen

### Problem: Nachricht wird nicht angezeigt
**Lösung:**
- Überprüfen Sie, dass die Nachricht aktiviert ist
- Clearen Sie den Browser-Cache (Ctrl+Shift+Del)
- Testen Sie in einem Incognito-Fenster

### Problem: Nachricht wird zu oft angezeigt
**Lösung:**
- Suchen Sie nach "Show frequency" oder "Display frequency"
- Stellen Sie ein, dass die Nachricht nur einmal pro Session angezeigt wird

### Problem: Buttons funktionieren nicht
**Lösung:**
- Überprüfen Sie die URL-Syntax
- Nutzen Sie relative URLs: `/health-check`
- Testen Sie die Links manuell

---

## Conversion Tracking

Nach der Konfiguration können Sie die Performance messen:

1. **In Chatbase:**
   - Gehen Sie zu **Analytics**
   - Sehen Sie, wie viele Besucher die Willkommensnachricht sehen
   - Messen Sie die Klick-Rate auf die Health-Check Seite

2. **In Ihrer Website Analytics:**
   - Überprüfen Sie, wie viele Besucher von Chatbase zur `/health-check` Seite kommen
   - Messen Sie die Conversion Rate (Besucher → Formular-Absender)

---

## Nächste Schritte

Nach der Willkommensnachricht können Sie auch:
- **Follow-up Nachrichten** konfigurieren (wenn Besucher nicht klicken)
- **Häufig gestellte Fragen** im Chatbot hinzufügen
- **Automatische Antworten** für häufige Fragen einrichten
- **Lead-Erfassung** konfigurieren (Email, Telefon)

---

## Support

Falls Sie Probleme haben:
- Kontaktieren Sie den Chatbase Support: https://www.chatbase.co/support
- Überprüfen Sie die Chatbase Dokumentation: https://www.chatbase.co/docs
