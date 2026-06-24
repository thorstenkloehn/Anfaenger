# AGENTS.md – Projekt-Root: /home/thorsten/Anfaenger

Diese Datei beschreibt das Projekt und gibt dem Antigravity-Agenten Kontext über Struktur, Ziele und Regeln.

---

## Projektübersicht

Dieses Projekt ist ein **Lernbuch für Rust-Einsteiger**, aufgebaut mit [mdBook](https://rust-lang.github.io/mdBook/).
Es begleitet Anfänger Schritt für Schritt durch praxisbezogene Projekte – ohne fertige Lösungen vorzugeben.

Der Lernende soll Rust durch eigenständiges Ausprobieren und Fehler-machen entdecken. 🦀

---

## Projektstruktur

```
Anfaenger/
├── .agents/
│   ├── AGENTS.md              # Workspace-weite Verhaltensregeln für den Agenten
│   └── skills/
│       └── verteile-subagent/ # Skill: Aufgaben auf Subagenten verteilen
│           └── SKILL.md
├── rust-projekte/             # Das mdBook-Projekt
│   ├── book.toml              # mdBook-Konfiguration
│   ├── book/                  # Generiertes HTML (wird von mdBook erzeugt)
│   └── src/
│       ├── SUMMARY.md              # Inhaltsverzeichnis des Buches
│       ├── einleitung.md           # Begrüßungsseite
│       ├── planung.md              # Projektplanung mit /planning
│       ├── phase1.md               # Projektvorschläge für Phase 1
│       ├── antigravity.md          # Bonus-Lektion: Antigravity Theorie
│       ├── antigravity-praxis.md   # Bonus-Lektion: Antigravity 50 Praxis-Projekte
│       ├── gemini.md               # Bonus-Lektion: Google Gemini als Lernpartner
│       ├── copilot.md              # Bonus-Lektion: GitHub Copilot (klassischer Assistent)
│       ├── ide-agent.md            # Bonus-Lektion: IDE KI-Agenten (nächste Generation)
│       ├── vibe-coding.md          # Bonus-Lektion: Vibe Coding (Programmieren im Flow)
│       └── eigener-agent.md        # Bonus-Lektion: Eigene KI-Agenten programmieren
└── AGENTS.md                       # Diese Datei
```

---

## Projektziele

- Rust-Grundlagen durch kleine, praxisnahe CLI-Projekte vermitteln
- Lernende zum selbstständigen Denken und Experimentieren motivieren
- Keine fertigen Code-Vorschläge – nur Hinweise, Konzepte und Fragen
- Klare, anfängerfreundliche Sprache durchgehend auf Deutsch
- KI-Werkzeuge verstehen und sinnvoll einsetzen lernen

---

## Lernphasen

| Phase | Bezeichnung | Status |
|-------|-------------|--------|
| 1     | Grundlagen für Einsteiger | ✅ In Arbeit |
| 2     | Strukturen & Enums | 🔜 Geplant |
| 3     | Fehlerbehandlung & Traits | 🔜 Geplant |
| 4     | Fortgeschrittene Konzepte | 🔜 Geplant |
| 🗺️    | Projektplanung mit /planning | ✅ Verfügbar |
| 🤖    | Bonus: Antigravity Theorie (CLI, 2.0, IDE) | ✅ Verfügbar |
| 🤖    | Bonus: Antigravity Praxis-Projekte (50 Projekte) | ✅ Verfügbar |
| 💎    | Bonus: Google Gemini als Lernpartner | ✅ Verfügbar |
| 🐙    | Bonus: GitHub Copilot – Klassischer Assistent (50 Projekte) | ✅ Verfügbar |
| 🤖    | Bonus: IDE KI-Agenten – Nächste Generation (50 Projekte) | ✅ Verfügbar |
| 🎵    | Bonus: Vibe Coding – Programmieren im Flow (50 Projekte) | ✅ Verfügbar |
| 🧠    | Bonus: Eigene KI-Agenten programmieren (50 Projekte) | ✅ Verfügbar |

---

## Regeln für den Agenten in diesem Projekt

- **Sprache:** Immer Deutsch, klare und einfache Formulierungen
- **Kein Code vorwegnehmen:** Keine fertigen Lösungen für Lernaufgaben liefern – nur Hilfestellung und Erklärungen
- **mdBook-Konventionen einhalten:** Neue Kapitel müssen in `SUMMARY.md` eingetragen werden
- **Inhalte anfängergerecht halten:** Keine komplexen Abstraktionen ohne vorherige Erklärung
- **Vor Änderungen an der Struktur:** Immer zuerst Rückfrage stellen
- **Geschützte Lektionen (nicht löschen):**
  - `src/antigravity.md` – Bonus-Lektion Antigravity CLI, 2.0, IDE
  - `src/antigravity-praxis.md` – 50 Antigravity Praxis-Projekte
  - `src/gemini.md` – Google Gemini als Lernpartner
  - `src/copilot.md` – GitHub Copilot Theorie & 50 Projekte
  - `src/ide-agent.md` – IDE KI-Agenten Theorie & 50 Projekte
  - `src/vibe-coding.md` – Vibe Coding Theorie & 50 Projekte
  - `src/eigener-agent.md` – Eigene KI-Agenten Theorie & 50 Projekte
- **KI-Werkzeuge vergleichen:** Wenn der Lernende fragt, erklärt der Agent den Unterschied zwischen Copilot, IDE-Agent, Vibe Coding und eigenem Agenten
- **Planungs-Lektion beachten:** `src/planung.md` erklärt den /planning-Workflow – beim Thema Projektplanung darauf verweisen
- **Subagenten-Skill nutzen:** Bei großen Aufgaben (mehrere Dateien gleichzeitig, paralleles Schreiben) den `verteile-subagent`-Skill aktivieren

---

## Technischer Stack

- **Buchformat:** [mdBook](https://rust-lang.github.io/mdBook/) (Markdown → HTML)
- **Programmiersprache:** Rust
- **Zielgruppe:** Absolute Anfänger ohne Vorkenntnisse
- **KI-Integration:** Antigravity (CLI, 2.0, IDE) + Skills + Subagenten

---

## 🤖 Antigravity – Kontext für den Agenten

Dieses Projekt nutzt **Antigravity** als KI-Assistenten. Es gibt drei Oberflächen:

| Oberfläche | Beschreibung | Wo |
|---|---|---|
| **CLI (`agy`)** | Terminal-Interface, gestartet mit `agy` | Terminal |
| **Antigravity 2.0** | Desktop-App (Electron) für Projektverwaltung & Tasks | Desktop |
| **Antigravity IDE** | VS-Code-basierte IDE mit KI-Integration | Editor |

**Wichtige Konzepte, die der Agent kennen soll:**

- `AGENTS.md` wird automatisch geladen → definiert das Verhalten des Agenten
- `.agents/AGENTS.md` enthält workspace-weite Regeln
- Skills liegen in `.agents/skills/` und werden automatisch erkannt
- Der Skill `verteile-subagent` ermöglicht paralleles Arbeiten mit Subagenten
- Slash-Befehle (`/`) sind im CLI und Chat verfügbar
- `@`-Mentions schicken Kontext (Dateien, frühere Gespräche) an den Agenten

**Der Agent soll bei den Bonus-Lektionen:**
- Fragen zu allen KI-Werkzeugen beantworten (kein Code, nur Erklärungen)
- Den Lernenden bei den Praxis-Projekten begleiten, ohne die Lösung vorwegzunehmen
- Den Unterschied zwischen Copilot (Assistent), IDE-Agent (handelt), Vibe Coding (beschreiben) und eigenem Agenten (bauen) erklären
- Auf offizielle Dokumentation verweisen: `https://antigravity.google/docs`

---

## 🐙 GitHub Copilot – Kontext für den Agenten

Copilot ist ein **klassischer Assistent** – er reagiert, schlägt vor, tippt mit.

- `src/copilot.md` enthält Theorie und 50 Projekte
- Copilot-Projekte sind darauf ausgelegt, mit Inline-Vorschlägen zu arbeiten
- Lernregel: Kein Vorschlag blind annehmen – jede Zeile verstehen
- Bei Fragen: Unterschied zwischen Tab-Vervollständigung und Copilot Chat erklären

---

## 🤖 IDE KI-Agenten – Kontext für den Agenten

IDE KI-Agenten **handeln selbstständig** – sie lesen, schreiben, führen aus.

- `src/ide-agent.md` enthält Theorie und 50 Projekte
- Wichtigstes Konzept: Planungsmodus (Agent erklärt erst, dann handelt er)
- Diff-Ansicht ist das Lernwerkzeug – jede Änderung sichtbar machen
- Bekannte Tools: Cursor, Windsurf, Antigravity IDE

---

## 🎵 Vibe Coding – Kontext für den Agenten

Vibe Coding ist das Programmieren durch **natürlichsprachliche Beschreibung**.

- `src/vibe-coding.md` enthält Theorie und 50 Projekte
- Geprägt von Andrej Karpathy (2025)
- Risiko für Anfänger: Code ohne Verständnis → Manifest beachten!
- Lernregel: Jeden KI-Code selbst erklären können

---

## 🧠 Eigene KI-Agenten – Kontext für den Agenten

Das Buch lehrt auch, wie man **selbst einen KI-Agenten baut**.

- `src/eigener-agent.md` enthält Theorie und 50 Projekte
- Grundkonzept: ReAct-Loop (Wahrnehmen → Denken → Handeln)
- Wichtige Crates: `reqwest`, `tokio`, `serde`, `ollama-rs`
- Einstieg: Ollama lokal (kein API-Key nötig!)
- Fortgeschritten: Multi-Agenten-System, RAG, eigener Antigravity-Klon

---

## 💎 Google Gemini – Kontext für den Agenten

| Werkzeug | Typ | Stärke | Wann nutzen? |
|---|---|---|---|
| **Gemini** | Chat-KI im Browser | Schnelle Erklärungen, Brainstorming | Für allgemeine Rust-Fragen |
| **Antigravity CLI** | Agenten-System | Dateizugriff, Terminal, Skills | Für projektbezogene Arbeit |
| **Antigravity IDE** | KI im Editor | Inline-Vorschläge, Code-Review | Beim aktiven Coden |
| **GitHub Copilot** | Klassischer Assistent | Tab-Vervollständigung | Beim Tippen |
| **Eigener Agent** | Selbst gebaut | Maßgeschneidert | Für eigene Workflows |

---

## Nützliche Befehle

```bash
# Buch lokal im Browser anzeigen (mit Live-Reload)
cd rust-projekte && mdbook serve

# Buch einmalig bauen
cd rust-projekte && mdbook build

# Antigravity CLI starten
agy

# Gemini im Browser öffnen
xdg-open https://gemini.google.com/app

# Ollama lokales Modell starten (für eigene Agenten)
ollama run llama3.2

# Subagenten-Skill aktivieren
# (im Antigravity CLI: /skills → verteile-subagent)
```
