# AGENTS.md – Projektregeln für /home/thorsten/Anfaenger

Diese Datei enthält projektspezifische Regeln und Verhaltensrichtlinien für den Antigravity-Agenten in diesem Workspace.

---

## Allgemeine Regeln

- Antworte auf Deutsch, sofern der Nutzer nicht explizit eine andere Sprache wünscht.
- Halte Antworten prägnant und verständlich.
- Erkläre Code immer anfängerfreundlich mit klaren Kommentaren.

---

## Coding-Standards

- Bevorzuge einfache, lesbare Lösungen gegenüber übermäßig cleveren Ansätzen.
- Füge bei jeder Funktion einen kurzen Kommentar hinzu, der erklärt, was sie tut.
- Verwende aussagekräftige Variablennamen auf Deutsch oder Englisch (konsistent innerhalb einer Datei).

---

## Projektspezifisches Verhalten

- Dieses Projekt ist für Anfänger gedacht – erkläre Konzepte Schritt für Schritt.
- Vermeide komplexe Abstraktionen, solange einfachere Alternativen ausreichen.
- Bei Fehlern: Erkläre zunächst die Ursache, bevor du die Lösung zeigst.
- Neue Buchkapitel müssen **immer** in `rust-projekte/src/SUMMARY.md` eingetragen werden.
- Vor strukturellen Änderungen am Buch: Rückfrage stellen.

---

## Kommunikation

- Stelle Rückfragen, bevor du bei unklaren Anforderungen weitermachst.
- Zeige Zwischenergebnisse bei längeren Aufgaben, um Feedback einzuholen.
- Bei großen Aufgaben (viele Dateien, viele Kapitel): den `verteile-subagent`-Skill nutzen.

---

## Subagenten-Einsatz

Wenn eine Aufgabe **mehrere parallele Teilaufgaben** hat (z. B. 3 neue Kapitel gleichzeitig schreiben), soll der Agent den `verteile-subagent`-Skill aktivieren:

```
Trigger-Situationen für den verteile-subagent-Skill:
- "Schreibe 3 neue Kapitel"
- "Erstelle Theorie UND Praxisprojekte für mehrere Themen"
- "Aktualisiere alle KI-Lektionen"
- Aufgaben mit klar trennbaren, unabhängigen Teilaufgaben
```

---

## Rust – Lernkonzept

Rust ist eine fantastische Sprache, um solides Programmieren zu lernen. Für den Anfang ist es oft am besten, Kommandozeilen-Tools (CLI) oder einfache Logikspiele zu bauen. So verstehst du die Grundlagen.

Praxisbezogene Projekte werden **ohne Code-Vorschläge** begleitet – der Fokus liegt auf dem eigenständigen Erarbeiten der Lösung.

### Phase 1: Grundlagen für Einsteiger [Anfänger]

- **Fundamente:** Variablen, Mutabilität (Veränderbarkeit) und primitive Datentypen
- **Kontrollfluss:** Bedingungen (if/else) und Schleifen (loop, while, for)
- **Benutzereingabe & Erste Schritte:** Einfache I/O (Ein-/Ausgabe) für interaktive Mini-Programme
- **Speicherverwaltung:** Das Ownership-Modell, Borrowing (Referenzen) und Lifetimes (Grundlagen)
- **Zeichenketten:** Der Unterschied zwischen String und &str

---

## KI-Werkzeuge im Projekt

Dieses Projekt nutzt und erklärt folgende KI-Werkzeuge:

| Werkzeug | Typ | Lektion |
|---|---|---|
| **Antigravity** | Agent (CLI, Desktop, IDE) | `src/antigravity.md` |
| **Google Gemini** | Chat-KI im Browser | `src/gemini.md` |
| **GitHub Copilot** | Klassischer Assistent (Tab-Vervollständigung) | `src/copilot.md` |
| **IDE KI-Agenten** | Agenten im Editor (Cursor, Windsurf etc.) | `src/ide-agent.md` |
| **Vibe Coding** | Programmieren durch Beschreibung | `src/vibe-coding.md` |
| **Eigene Agenten** | Selbst gebaute KI-Agenten in Rust | `src/eigener-agent.md` |

### Wann welches Werkzeug erklären?

- Nutzer fragt nach **Codevervollständigung** → GitHub Copilot erklären
- Nutzer fragt nach **selbstständig handelnden KI im Editor** → IDE-Agent erklären
- Nutzer will **schnell Ideen umsetzen ohne viel zu tippen** → Vibe Coding erklären
- Nutzer will **eigenen Agenten bauen** → `src/eigener-agent.md` + Ollama empfehlen
- Nutzer fragt nach **schnellen Erklärungen ohne Codekontext** → Gemini empfehlen
- Nutzer arbeitet **aktiv am Projekt** → Antigravity empfehlen
