# 🦀 Rust-Lernbuch für Einsteiger

Ein interaktives Lernbuch für Rust-Anfänger – gebaut mit [mdBook](https://rust-lang.github.io/mdBook/) und begleitet von einem KI-Agenten (Antigravity).

---

## 🚀 Schnellstart

```bash
# Buch im Browser öffnen (mit Live-Reload)
cd rust-projekte && mdbook serve

# → Browser öffnet sich automatisch: http://localhost:3000
```

---

## 📁 Projektstruktur

```
Anfaenger/
├── README.md                  ← Du liest sie gerade
├── AGENTS.md                  ← Globale Regeln für den KI-Agenten
├── .cursorrules               ← Regeln für Cursor / VS Code KIs
├── .agents/
│   ├── AGENTS.md              ← Workspace-Regeln für den Agenten
│   └── skills/                ← Spezialisierte Fähigkeiten des Agenten
│       ├── anki-karten-generieren/
│       ├── code-review/
│       ├── fehler-erklaeren/
│       ├── kapitel-lektorat/
│       ├── neues-kapitel/
│       ├── subagent-steuern/
│       ├── uebungen-erstellen/
│       └── verteile-subagent/
└── rust-projekte/
    ├── book.toml              ← mdBook-Konfiguration
    ├── book/                  ← Generiertes HTML (nicht bearbeiten)
    └── src/
        ├── SUMMARY.md         ← Inhaltsverzeichnis
        ├── einleitung.md
        ├── planung.md
        ├── phase1.md
        ├── antigravity.md
        ├── antigravity-praxis.md
        ├── gemini.md
        ├── copilot.md
        ├── ide-agent.md
        ├── vibe-coding.md
        └── eigener-agent.md
```

---

## 📚 Buchinhalt

| Kapitel | Thema | Status |
|---|---|---|
| Einleitung | Willkommen & Einstieg | ✅ |
| Planung | Projektplanung mit Antigravity `/planning` | ✅ |
| Phase 1 | Rust-Grundlagen für Einsteiger (50 Projekte) | ✅ |
| Antigravity | KI-Assistent: CLI, 2.0 & IDE (Theorie) | ✅ |
| Antigravity Praxis | 50 Praxis-Projekte mit Antigravity | ✅ |
| Google Gemini | Gemini als Lernpartner im Browser | ✅ |
| GitHub Copilot | Klassischer Assistent: Theorie & 50 Projekte | ✅ |
| IDE KI-Agenten | Nächste Generation: Theorie & 50 Projekte | ✅ |
| Vibe Coding | Programmieren im Flow: Theorie & 50 Projekte | ✅ |
| Eigene KI-Agenten | Selbst bauen in Rust: Theorie & 50 Projekte | ✅ |

---

## 🤖 KI-Assistent: Antigravity

Dieses Projekt wird von **Antigravity** (`agy`) als KI-Assistent begleitet.  
Der Agent liest automatisch die `AGENTS.md`-Dateien und weiß damit, wie er sich verhalten soll.

```bash
# KI-Assistent starten
agy
```

---

## 🛠️ Skills – Was sie sind & wie sie aktiviert werden

Skills sind **spezialisierte Fähigkeiten** des KI-Agenten. Sie liegen als Dateien im Ordner `.agents/skills/` und werden **automatisch erkannt** – ohne manuelle Registrierung.

### Wie ein Skill aktiviert wird

Ein Skill aktiviert sich, wenn deine Anfrage zu seiner `description` in der `SKILL.md` passt.  
Der Agent erkennt den passenden Skill und lädt seine Anweisungen automatisch.

```
Du schreibst:  "Erstelle ein neues Kapitel über Rust Traits"
                           ↓
Agent erkennt: → passt zu Skill: neues-kapitel
                           ↓
Agent lädt:    .agents/skills/neues-kapitel/SKILL.md
                           ↓
Agent befolgt: alle Regeln, Vorlagen und Checklisten aus dem Skill
```

### Manuell aktivieren (im Antigravity CLI)

Du kannst Skills auch direkt aufrufen:

```bash
# Im agy-Terminal:
/skills              # Alle verfügbaren Skills anzeigen
```

Oder durch einen beschreibenden Satz in deiner Anfrage:

```
"Nutze den verteile-subagent Skill und schreibe 3 neue Kapitel parallel."
```

---

## 📋 Verfügbare Skills

Das Projekt verfügt über folgende spezialisierte Skills in `.agents/skills/`, die vom Agenten dynamisch geladen werden:

1. **`neues-kapitel`**
   - **Zweck:** Erstellt mdBook-Kapitel strukturiert und stilistisch konform.
   - **Trigger:** "neues Kapitel/Lektion", "Schreibe ein neues Kapitel über [Thema]".
   - **Datei:** [`.agents/skills/neues-kapitel/SKILL.md`](.agents/skills/neues-kapitel/SKILL.md)

2. **`verteile-subagent`**
   - **Zweck:** Splittet große Aufgaben auf und delegiert sie an Subagenten.
   - **Trigger:** "Teile Aufgaben auf", "Nutze Subagenten", "Erstelle Kapitel parallel".
   - **Datei:** [`.agents/skills/verteile-subagent/SKILL.md`](.agents/skills/verteile-subagent/SKILL.md)

3. **`subagent-steuern`**
   - **Zweck:** Koordiniert und integriert die Arbeit abgeschlossener Subagenten.
   - **Trigger:** "Subagenten steuern", "Subagenten verwalten", "Subagenten koordinieren".
   - **Datei:** [`.agents/skills/subagent-steuern/SKILL.md`](.agents/skills/subagent-steuern/SKILL.md)

4. **`anki-karten-generieren`**
   - **Zweck:** Extrahiert atomare Lernkarten im Format `Frage;Antwort` in `rust_anki_karten.csv`.
   - **Trigger:** "Generiere Anki-Karten aus Kapitel [Name]", "Erstelle Karteikarten".
   - **Datei:** [`.agents/skills/anki-karten-generieren/SKILL.md`](.agents/skills/anki-karten-generieren/SKILL.md)

5. **`code-review`**
   - **Zweck:** Analysiert Rust-Code auf Idiomatik, Ownership & Konventionen (keine fertigen Lösungen).
   - **Trigger:** "Reviewe meinen Code", "Prüfe diesen Code", "Ist dieser Rust-Code idiomatisch?".
   - **Datei:** [`.agents/skills/code-review/SKILL.md`](.agents/skills/code-review/SKILL.md)

6. **`fehler-erklaeren`**
   - **Zweck:** Didaktische Erklärung von Compiler-Fehlern ohne direkte Lösungs-Codeausgabe.
   - **Trigger:** "Erkläre diesen Compiler-Fehler", "Warum kompiliert das nicht?".
   - **Datei:** [`.agents/skills/fehler-erklaeren/SKILL.md`](.agents/skills/fehler-erklaeren/SKILL.md)

7. **`kapitel-lektorat`**
   - **Zweck:** Lektoriert Kapitel auf Du-Form, didaktische Struktur und Code-Formatierung.
   - **Trigger:** "Lektoriere dieses Kapitel", "Prüfe den Text", "Korrekturlesen".
   - **Datei:** [`.agents/skills/kapitel-lektorat/SKILL.md`](.agents/skills/kapitel-lektorat/SKILL.md)

8. **`uebungen-erstellen`**
   - **Zweck:** Erstellt Übungen (Leicht, Mittel, Schwer) mit Assertions und Testfällen ohne Codelösung.
   - **Trigger:** "Erstelle Übungen zu Kapitel [Name]", "Füge Aufgaben hinzu".
   - **Datei:** [`.agents/skills/uebungen-erstellen/SKILL.md`](.agents/skills/uebungen-erstellen/SKILL.md)

---

## 🧩 Wie Skills aufgebaut sind

Jede `SKILL.md` hat zwei Teile:

```markdown
---
name: skill-name
description: >
  Wann der Skill aktiviert wird – dieser Text wird
  vom Agenten zum Abgleich mit deiner Anfrage genutzt.
---

# Skill: Titel

[Hier stehen die detaillierten Anweisungen für den Agenten]
```

- **YAML-Frontmatter** (`---` Block): Wird immer gelesen – enthält Name & Beschreibung
- **Markdown-Body**: Wird nur geladen, wenn der Skill aktiviert wird

---

## ➕ Eigenen Skill erstellen

```bash
# 1. Ordner anlegen
mkdir -p .agents/skills/mein-skill

# 2. SKILL.md erstellen
touch .agents/skills/mein-skill/SKILL.md
```

Minimalstruktur einer `SKILL.md`:

```markdown
---
name: mein-skill
description: >
  Aktiviere diesen Skill, wenn [BEDINGUNG].
  Typische Trigger: "[SATZ 1]", "[SATZ 2]".
---

# Skill: Mein Skill

## Wann aktivieren?
[Beschreibung]

## Workflow
[Schritte]

## Regeln
[Regeln]
```

> **Tipp:** Je präziser die `description`, desto zuverlässiger erkennt der Agent, wann er den Skill aktivieren soll.

---

## ⚙️ Wichtige Befehle

```bash
# Buch mit Live-Reload starten
cd rust-projekte && mdbook serve

# Buch einmalig bauen (prüft auf Fehler)
cd rust-projekte && mdbook build

# KI-Assistenten starten
agy

# Verfügbare Skills anzeigen (im agy-Terminal)
/skills

# Ollama (lokales KI-Modell) starten
ollama run llama3.2

# Gemini im Browser öffnen
xdg-open https://gemini.google.com/app
```

---

## 📖 Ressourcen

- [mdBook Dokumentation](https://rust-lang.github.io/mdBook/)
- [Rust-Buch (offiziell)](https://doc.rust-lang.org/book/)
- [Antigravity Dokumentation](https://antigravity.google/docs)
- [Ollama (lokale KI-Modelle)](https://ollama.ai/)
- [Google Gemini](https://gemini.google.com/app)
- [GitHub Copilot](https://github.com/features/copilot)
- [Cargo Guide](https://doc.rust-lang.org/cargo/)

---

## 🪙 Token-Verbrauch & Effizienz (Laufzeit-Optimierung)

Um sicherzustellen, dass die KI-Agenten schnell antworten und nicht in API-Limits (z. B. `429 RESOURCE_EXHAUSTED` / Quoten-Limits) laufen, sollte der Token-Verbrauch überwacht werden:

*   **Normaler Verbrauch (< 10.000 Tokens):** Kurze Präzisionsfragen, gezielte Dateiänderungen, kurze Anweisungen.
*   **Starker Verbrauch (10.000 – 30.000 Tokens):** Einlesen mehrerer großer Buchkapitel, Generierung von Kapiteln mit über 500 Zeilen, parallele Ausführung mehrerer komplexer Subagenten.
*   **Zu starker Verbrauch (> 30.000 Tokens):** Generierung riesiger Monolith-Dateien (z. B. 2.000+ Zeilen in einem Rutsch), ständiges Einlesen des gesamten Projektordners, unstrukturierte Chats mit langen Verlaufshistorien.

### 💡 Best Practices zur Token-Reduzierung:
1. **Regeln kurz halten:** AGENTS.md-Dateien und Skills immer so kurz wie möglich fassen.
2. **Modularisieren:** Große Themen in mehrere kleinere Konzept-Dateien aufteilen.
3. **Kontext leeren:** Nach Abschluss großer Aufgaben den Chatverlauf zurücksetzen.

---

> 🦀 **Lernprinzip:** Rust lernt man durch Ausprobieren – nicht durch Zuschauen.  
> Der KI-Agent ist dein Begleiter, nicht dein Ghostwriter.  
> **Schreibe den Code selbst – frage die KI, wenn du feststeckst.**

