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
├── .agents/
│   ├── AGENTS.md              ← Workspace-Regeln für den Agenten
│   └── skills/
│       ├── neues-kapitel/     ← Skill: Neue Buchkapitel erstellen
│       │   └── SKILL.md
│       └── verteile-subagent/ ← Skill: Aufgaben parallelisieren
│           └── SKILL.md
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

### 🗒️ `neues-kapitel`

**Zweck:** Erstellt neue mdBook-Kapitel im richtigen Stil und mit vollständiger Struktur.

**Skill-Datei:** [`.agents/skills/neues-kapitel/SKILL.md`](.agents/skills/neues-kapitel/SKILL.md)

**Aktivierungs-Sätze:**
```
"Schreibe ein neues Kapitel über [THEMA]"
"Erstelle eine neue Lektion zu [THEMA]"
"Füge ein Bonus-Kapitel über [THEMA] hinzu"
"Ich brauche ein neues Kapitel für Phase 2"
```

**Was der Skill enthält:**
- ✅ Vollständige Kapitel-Vorlage (Markdown-Struktur)
- ✅ 5-Schritte-Workflow (Analysieren → Schreiben → SUMMARY.md → Build → AGENTS.md)
- ✅ Stil-Regeln (Sprache, Ton, mdBook-Kompatibilität)
- ✅ Checkliste – damit nichts vergessen wird
- ✅ Referenz auf bestehende Kapitel als Orientierung

---

### 🔀 `verteile-subagent`

**Zweck:** Teilt große Aufgaben in parallele Teilaufgaben auf und delegiert sie an Subagenten.

**Skill-Datei:** [`.agents/skills/verteile-subagent/SKILL.md`](.agents/skills/verteile-subagent/SKILL.md)

**Aktivierungs-Sätze:**
```
"Schreibe 3 neue Kapitel gleichzeitig"
"Erstelle Theorie UND Praxisprojekte für mehrere Themen"
"Aktualisiere alle KI-Lektionen parallel"
"Nutze Subagenten für diese große Aufgabe"
```

**Was der Skill enthält:**
- ✅ Entscheidungsbaum (wann Subagent, wann sequenziell?)
- ✅ Workflow in 5 Schritten
- ✅ Fertige Prompt-Vorlagen für Subagenten
- ✅ Projektspezifische Regeln (absolute Pfade, SUMMARY.md erst am Ende)
- ✅ Checkliste nach dem Zusammenführen

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

> 🦀 **Lernprinzip:** Rust lernt man durch Ausprobieren – nicht durch Zuschauen.  
> Der KI-Agent ist dein Begleiter, nicht dein Ghostwriter.  
> **Schreibe den Code selbst – frage die KI, wenn du feststeckst.**
