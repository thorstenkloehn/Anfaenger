# 💎 Google Gemini als Lernpartner

*Direkt im Browser – ohne Installation, immer erreichbar.*

---

Neben Antigravity gibt es ein weiteres mächtiges KI-Werkzeug, das wir kostenlos und sofort nutzen können: **Google Gemini** unter [gemini.google.com/app](https://gemini.google.com/app).

In dieser Lektion lernen wir, Gemini gezielt als **Lern-Gesprächspartner** für Rust einzusetzen – und verstehen, wann wir Gemini nutzen und wann Antigravity die bessere Wahl ist.

> **Das Wichtigste vorweg:** Gemini und Antigravity sind keine Konkurrenten – sie ergänzen sich. Wir lernen hier, das richtige Werkzeug für den richtigen Moment zu wählen.

---

## 🔍 Gemini vs. Antigravity – Was ist der Unterschied?

| | Google Gemini | Antigravity |
|---|---|---|
| **Wo** | Browser: gemini.google.com/app | Terminal, Desktop-App, IDE |
| **Typ** | Chat-KI | Agentic System |
| **Dateizugriff** | ❌ Nein | ✅ Ja |
| **Code ausführen** | ❌ Nein | ✅ Ja |
| **AGENTS.md** | ❌ Nicht möglich | ✅ Wird automatisch geladen |
| **Skills** | ❌ Nicht möglich | ✅ Vollständig |
| **Stärke** | Erklärungen, Brainstorming, Vergleiche | Projektarbeit, Automatisierung |
| **Ideal für** | Konzepte verstehen, Fragen klären | Code schreiben, Fehler debuggen |

**Die goldene Regel:**
> 🗣️ Wenn wir *über* Rust reden wollen → **Gemini**  
> 🛠️ Wenn wir *mit* Rust arbeiten wollen → **Antigravity**

---

## 🧠 Theorie: Wie funktioniert Gemini?

Gemini ist Googles multimodales KI-Modell. Im Browser unter [gemini.google.com/app](https://gemini.google.com/app) können wir:

- **Text-Fragen** stellen (Konzepte, Erklärungen, Vergleiche)
- **Bilder hochladen** (z. B. Foto einer Fehlermeldung vom Bildschirm)
- **Code einfügen** und erklären lassen
- **Gespräche führen** – Gemini erinnert sich an den Verlauf der Sitzung
- Mit **Gemini Gems** (benutzerdefinierte Assistenten) arbeiten

### Gemini Gems – Das Gegenstück zu Antigravity Skills

Genau wie wir in Antigravity **Skills** bauen, gibt es in Gemini **Gems** – vorkonfigurierte Assistenten mit eigenem Namen, Verhalten und Anweisungen.

| Antigravity | Gemini |
|---|---|
| Skill (`SKILL.md`) | Gem |
| AGENTS.md-Regeln | Gem-Anweisungen |
| `.agents/skills/` Ordner | Gems-Bereich in gemini.google.com |

---

## 🛠️ Übungen

### 🔵 Übung 1: Gemini kennenlernen

**Ziel:** Ersten Kontakt mit Gemini herstellen und die Oberfläche erkunden.

**Schritte:**

1. Öffne [gemini.google.com/app](https://gemini.google.com/app) im Browser
2. Melde dich mit deinem Google-Konto an
3. Stelle diese erste Frage:

   ```
   Erkläre mir Ownership in Rust so, als wäre ich 10 Jahre alt.
   Nutze eine Alltagsanalogie.
   ```

4. Lies die Antwort aufmerksam durch
5. Stelle eine **Folgefrage**, die auf der Antwort aufbaut

**Nachdenk-Aufgaben:**
- Wie unterscheidet sich die Antwort von der, die Antigravity gegeben hat?
- Welche Analogie hat Gemini gewählt?
- Fehlt dir etwas in der Antwort?

---

### 🔵 Übung 2: Rust-Konzepte mit Gemini erkunden

**Ziel:** Gemini als Erklär-Assistent für schwierige Rust-Konzepte nutzen.

**Schritte:**

1. Wähle eines dieser Rust-Konzepte, das du noch nicht vollständig verstehst:
   - Ownership & Move-Semantik
   - Borrowing & Referenzen (`&`)
   - Der Unterschied zwischen `String` und `&str`
   - Warum Rust keinen Garbage Collector hat

2. Stelle Gemini folgende Frage (passe `[KONZEPT]` an):

   ```
   Ich lerne Rust als Anfänger. Erkläre mir [KONZEPT] in drei Schritten:
   1. Eine einfache Definition in einem Satz
   2. Eine Alltagsanalogie
   3. Warum Rust das so macht (Vorteil)
   
   Schreibe keinen Code – nur Erklärungen.
   ```

3. Lies Schritt für Schritt
4. Formuliere in eigenen Worten, was du verstanden hast, und frage Gemini:

   ```
   Ich habe verstanden: [Deine Erklärung in eigenen Worten]
   Ist das korrekt? Was fehlt noch?
   ```

**Nachdenk-Aufgaben:**
- Was ist der Vorteil, ein Konzept in eigenen Worten zu formulieren?
- Welcher der drei Erklär-Schritte war am hilfreichsten?

---

### 🔵 Übung 3: Fehlermeldung fotografieren & verstehen

**Ziel:** Geminis Bildverständnis für Fehler-Analysen nutzen.

**Schritte:**

1. Schreibe absichtlich einen Rust-Fehler, z. B.:

   ```rust
   fn main() {
       let x = 5;
       x = 10; // Fehler: x ist nicht mut
   }
   ```

2. Führe `cargo build` aus und sieh die Fehlermeldung im Terminal
3. Mache einen **Screenshot** der Fehlermeldung
4. Lade den Screenshot in Gemini hoch und schreibe dazu:

   ```
   Ich bin Rust-Anfänger. Ich habe diesen Fehler bekommen.
   Erkläre mir:
   1. Was bedeutet die Fehlermeldung auf Deutsch?
   2. Warum verhindert Rust das?
   3. Welches Konzept steckt dahinter?
   
   Schreibe mir NICHT die Lösung – ich möchte sie selbst finden.
   ```

5. Beantworte den Fehler selbst, **ohne** Gemini nach dem Fix zu fragen

**Nachdenk-Aufgaben:**
- Was hat der Bild-Upload gegenüber dem Text-Kopieren vereinfacht?
- Hat Gemini das Konzept hinter dem Fehler korrekt erklärt?

---

### 🔵 Übung 4: Gemini als Lern-Gesprächspartner

**Ziel:** Ein strukturiertes Lern-Gespräch mit Gemini führen.

**Schritte:**

1. Starte ein neues Gespräch in Gemini mit diesem Einstieg:

   ```
   Du bist mein Rust-Lernpartner. Ich bin Anfänger.
   Deine Aufgaben:
   - Beantworte meine Fragen mit einfachen Alltagsbeispielen
   - Stelle nach jeder Erklärung eine Verständnisfrage
   - Schreibe NIE fertigen Code – nur Hinweise
   - Erinnere mich daran, Konzepte selbst auszuprobieren
   
   Beginne mit: "Hallo! Welches Rust-Thema möchtest du heute erkunden?"
   ```

2. Führe ein Gespräch über mindestens **3 Runden** (Frage → Antwort → Folgefrage)

3. Notiere am Ende:
   - Was habe ich in diesem Gespräch gelernt?
   - Welche Frage war am wertvollsten?

**Nachdenk-Aufgaben:**
- Was fehlt in Gemini im Vergleich zu Antigravity mit AGENTS.md?
- Wie könntest du das Gespräch effizienter gestalten?

---

### 🔵 Übung 5: Einen Gemini Gem bauen – Dein Rust-Tutor

**Ziel:** Einen personalisierten Rust-Lernassistenten in Gemini erstellen.

**Das Konzept:** Gemini Gems sind wie **Antigravity Skills** – vorkonfigurierte Assistenten mit eigenem Verhalten.

**Schritte:**

1. Öffne [gemini.google.com/app](https://gemini.google.com/app)
2. Klicke auf **„Gems"** in der linken Seitenleiste
3. Klicke auf **„Neuen Gem erstellen"**
4. Fülle das Formular aus:

   **Name:**
   ```
   Rust Lerntutor 🦀
   ```

   **Anweisungen:**
   ```
   Du bist mein persönlicher Rust-Lerntutor für Anfänger.

   Dein Verhalten:
   - Antworte immer auf Deutsch
   - Erkläre jedes Konzept mit einer Alltagsanalogie
   - Stelle nach jeder Erklärung eine Verständnisfrage
   - Schreibe KEINEN fertigen Code – nur Hinweise und Erklärungen
   - Wenn ich nach der Lösung frage: Stelle die Gegenfrage "Was hast du selbst schon probiert?"
   - Halte Antworten kurz: maximal 5 Sätze pro Abschnitt

   Mein Lernstand:
   - Ich bin absoluter Anfänger
   - Ich habe noch keine Programmiererfahrung
   - Ich lerne seit [Wochen] Rust
   
   Begrüße mich mit: "Hallo! Bereit für Rust? 🦀 Womit kann ich dir heute helfen?"
   ```

5. Klicke auf **„Speichern"**
6. Teste den Gem mit einer Rust-Frage

**Zeilenweise Dekonstruktion der Gem-Anweisungen:**

- `Antworte immer auf Deutsch` – Ohne diese Regel könnte Gemini auf Englisch antworten.
- `Alltagsanalogie` – Wir fordern aktiv die Erklär-Methode ein, die am besten funktioniert.
- `KEINEN fertigen Code` – In Großbuchstaben für Nachdruck – wie in unserer AGENTS.md.
- `Mein Lernstand` – Genau wie in unserer AGENTS.md: Je mehr Kontext, desto besser die Antworten.

**Vergleich: Gem vs. Antigravity Skill:**

| | Gemini Gem | Antigravity Skill |
|---|---|---|
| Erstellt | In der Browser-Oberfläche | Als `SKILL.md`-Datei |
| Gespeichert | In Googles Cloud | Lokal im `.agents/skills/`-Ordner |
| Dateizugriff | ❌ | ✅ |
| Versionierbar | ❌ | ✅ mit Git |
| Portierbar | ❌ (an Google-Konto gebunden) | ✅ (Ordner kopieren) |

**Nachdenk-Aufgaben:**
- Was kann dein Gem, was dein Antigravity Skill nicht kann?
- Was kann dein Skill, was dein Gem nicht kann?

---

### 🔵 Übung 6: Gemini + Antigravity kombinieren

**Ziel:** Beide Werkzeuge in einem Lernzyklus zusammen einsetzen.

**Der kombinierte Workflow:**

```
🌐 Gemini          →   🖥️ Antigravity CLI   →   📝 Code schreiben
──────────────────────────────────────────────────────────────────
Konzept verstehen   →   Projektkontext        →   Selbst programmieren
Fragen klären       →   Fehler analysieren    →   Lösung erarbeiten
Brainstorming       →   AGENTS.md aktualisieren → Review einholen
```

**Konkrete Schritte:**

**Schritt 1 – Mit Gemini vorbereiten:**
```
In Gemini:
"Ich möchte heute in Rust eine Eingabe vom Terminal lesen
und in eine Zahl umwandeln. Welche Konzepte brauche ich dafür?
Erkläre nur die Konzepte – keinen Code."
```

**Schritt 2 – In Antigravity die AGENTS.md aktualisieren:**
```markdown
## Mein aktuelles Thema
Ich lerne heute: Benutzereingabe lesen mit std::io::stdin()
und Strings in Zahlen umwandeln mit .parse()

Konzepte, die ich verstehe (aus Gemini-Gespräch):
- stdin() gibt einen Handle zum Standard-Input
- .read_line() liest eine Zeile als String
- .parse::<i32>() konvertiert den String
```

**Schritt 3 – Code selbst schreiben (kein Agent!):**
Öffne die IDE und schreibe den Code selbst, basierend auf dem, was du verstanden hast.

**Schritt 4 – Fehler mit Antigravity analysieren:**
```bash
agy
> Ich habe diesen Fehler: [Fehlermeldung]
  Erkläre mir das Warum – ich möchte die Lösung selbst finden.
```

**Schritt 5 – Ergebnis mit Gemini reflektieren:**
```
In Gemini:
"Ich habe gerade [Konzept] in Rust erfolgreich implementiert.
Was ist der nächste logische Schritt, den ich lernen sollte?
Erkläre kurz, warum dieser Schritt jetzt sinnvoll ist."
```

**Nachdenk-Aufgaben:**
- In welchem Schritt war Gemini hilfreicher? In welchem Antigravity?
- Wie viel Zeit hast du für jeden Schritt gebraucht?
- Was würdest du beim nächsten Mal anders machen?

---

### 🔵 Übung 7: Vergleich-Protokoll führen

**Ziel:** Systematisch verstehen, welches Werkzeug wann besser passt.

**Schritte:**

1. Erstelle eine Datei `ki-vergleich.md` in deinem Rust-Projekt:

   ```markdown
   # KI-Werkzeug-Vergleich – Meine Erfahrungen

   ## Wann nutze ich Gemini?
   - 

   ## Wann nutze ich Antigravity CLI?
   - 

   ## Wann nutze ich Antigravity IDE?
   - 

   ## Erlebnisse

   ### [Datum]: [Situation]
   Werkzeug: Gemini / Antigravity  
   Aufgabe:  
   Ergebnis:  
   Besser wäre gewesen:  
   ```

2. Fülle die Datei nach jeder Lernsitzung aus

3. Teile das Protokoll nach zwei Wochen mit dem Antigravity-Agenten:

   ```bash
   agy
   > @ki-vergleich.md Analysiere meine Erfahrungen. 
     Welches Muster erkennst du? Wann sollte ich welches Werkzeug nutzen?
   ```

**Nachdenk-Aufgaben:**
- Hat sich deine Meinung über die beiden Werkzeuge nach zwei Wochen verändert?
- Gibt es Situationen, in denen du keines von beiden nutzen würdest?

---

## 💡 Zusammenfassung: Das KI-Werkzeugkasten 2026

Als Rust-Lernender im Jahr 2026 haben wir drei Hauptwerkzeuge:

| Werkzeug | Link/Befehl | Beste Nutzung |
|---|---|---|
| 💎 Google Gemini | [gemini.google.com/app](https://gemini.google.com/app) | Konzepte verstehen, Brainstorming, Analogien |
| 🖥️ Antigravity CLI | `agy` im Terminal | Projektarbeit, Fehleranalyse, Automatisierung |
| 💻 Antigravity IDE | Antigravity IDE öffnen | Aktives Coden, Inline-Hilfe, Code-Review |

> 🦀 **Die wichtigste Erkenntnis:**  
> Kein KI-Werkzeug ersetzt das eigenständige Denken.  
> Sie alle sind **Spiegel** – sie zeigen uns, was wir noch nicht wissen.  
> Den Code schreiben, das Konzept verstehen, den Fehler lösen –  
> das macht immer noch **du**.

---

## 📚 Weiterführende Links

- [Google Gemini](https://gemini.google.com/app) – Direkt starten
- [Gemini Gems erstellen](https://gemini.google.com/app/gems) – Eigene Assistenten bauen
- [Antigravity Dokumentation](https://antigravity.google/docs) – Agent-System
- [Rust-Buch](https://doc.rust-lang.org/book/) – Die offizielle Rust-Referenz
