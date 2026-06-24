---
name: neues-kapitel
description: >
  Aktiviere diesen Skill, wenn ein neues Kapitel oder eine neue Lektion für das
  Rust-Lernbuch (mdBook) erstellt werden soll. Der Skill stellt die korrekte
  Struktur, den richtigen Stil und alle Konventionen bereit – inklusive
  automatischem SUMMARY.md-Eintrag und AGENTS.md-Update.
  Typische Trigger: "Schreibe ein neues Kapitel über X", "Erstelle eine neue
  Lektion zu Y", "Füge ein Bonus-Kapitel hinzu".
---

# Skill: Neues mdBook-Kapitel erstellen

Dieser Skill beschreibt den vollständigen Workflow zum Erstellen eines neuen
Kapitels im Rust-Lernbuch – vom ersten Satz bis zum fertigen Buch-Build.

---

## 📁 Wo liegen die Dateien?

```
/home/thorsten/Anfaenger/rust-projekte/
├── book.toml              ← mdBook-Konfiguration (nicht anfassen)
├── book/                  ← Generiertes HTML (automatisch, nicht bearbeiten)
└── src/
    ├── SUMMARY.md         ← Inhaltsverzeichnis (IMMER aktualisieren!)
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

## 🔄 Workflow: Schritt für Schritt

### Schritt 1: Thema analysieren

Bevor du schreibst, beantworte folgende Fragen:

```
1. Was ist das Thema? (1 Satz)
2. Zu welcher Kategorie gehört es?
   → Phase 1-4 (Rust-Grundlagen)
   → Bonus: KI als Lernpartner
   → Projektplanung
3. Welchen Dateinamen soll die Datei haben? (lowercase, kebab-case, .md)
   Beispiele: rust-traits.md, fehlerbehandlung.md, async-rust.md
4. Welches Emoji passt? (für SUMMARY.md-Eintrag)
5. Gibt es ähnliche bestehende Kapitel? (als Orientierung)
```

### Schritt 2: Kapitel-Datei erstellen

Erstelle die neue Datei unter:
```
/home/thorsten/Anfaenger/rust-projekte/src/[dateiname].md
```

### Schritt 3: SUMMARY.md aktualisieren

**PFLICHT:** Jedes neue Kapitel muss in `SUMMARY.md` eingetragen werden!

```
/home/thorsten/Anfaenger/rust-projekte/src/SUMMARY.md
```

Format des Eintrags:
```markdown
- [EMOJI Titel des Kapitels](./dateiname.md)
```

Richtige Sektion wählen:
- Rust-Grundlagen → unter der passenden `# Phase X`-Überschrift
- KI-Lernpartner → unter `# 🤖 Bonus: KI als Lernpartner`

### Schritt 4: mdBook bauen & prüfen

```bash
cd /home/thorsten/Anfaenger/rust-projekte && mdbook build
```

Auf Warnungen achten:
- `unclosed HTML tag` → spitze Klammern außerhalb von Code-Blöcken escapen
- `missing file` → Dateiname in SUMMARY.md falsch geschrieben

### Schritt 5: AGENTS.md aktualisieren

Trage das neue Kapitel ein in:
- `/home/thorsten/Anfaenger/AGENTS.md` → Projektstruktur + Lernphasen + Regeln
- `/home/thorsten/Anfaenger/.agents/AGENTS.md` → KI-Werkzeug-Tabelle (falls KI-Thema)

---

## 📐 Kapitel-Struktur (Vorlage)

Jedes Kapitel folgt dieser bewährten Struktur:

```markdown
# EMOJI Titel – Untertitel

*Kurze, einladende Beschreibung in einem Satz.*

---

Einleitungstext (2-4 Sätze):
- Was ist das Thema?
- Warum ist es für Rust-Anfänger relevant?
- Was erwartet den Leser in diesem Kapitel?

> **Hinweis für Anfänger:** [Wichtiger Hinweis, der Hemmschwellen abbaut]

---

## 🧠 Theorie: Was ist [THEMA]?

### Kernkonzept 1
[Erklärung]

### Kernkonzept 2
[Erklärung]

[Tabellen für Vergleiche nutzen!]

---

## 🛠️ Praxis-Aufgaben

### Aufgabe A: [Name]
[Beschreibung, Schritte, Nachdenk-Aufgaben]

### Aufgabe B: [Name]
[Beschreibung, Schritte, Nachdenk-Aufgaben]

### Aufgabe C: [Name]
[Beschreibung, Schritte, Nachdenk-Aufgaben]

---

## 🚀 [50/25/10] Projektvorschläge

> 🦀 **Lernregel:** [Themenspezifische Lernregel für den Leser]

### 🟢 Einstiegsprojekte (1–10)
1. **Projektname** – Kurzbeschreibung was zu bauen ist und was man dabei lernt.
...

### 🟡 Mittlere Projekte (11–25)
11. **Projektname** – Kurzbeschreibung.
...

### 🔴 Fortgeschrittene Projekte (26–40)
26. **Projektname** – Kurzbeschreibung.
...

### ⚡ Herausforderungsprojekte (41–50)
41. **Projektname** – Kurzbeschreibung.
...

---

## 💡 Zusammenfassung

| Konzept | Bedeutung |
|---|---|
| Begriff 1 | Erklärung |
| Begriff 2 | Erklärung |

> 🦀 **Merke:** [Wichtigste Erkenntnis des Kapitels in 1-2 Sätzen]

---

## 📚 Weiterführende Links

- [Link-Text](URL) – Kurze Beschreibung
```

---

## ✍️ Stil-Regeln

### Sprache & Ton
- **Immer Deutsch** – klare, einfache Formulierungen
- **Du-Form** – direkte Ansprache des Lesers
- **Keine Fachbegriffe ohne Erklärung** – jedes neue Konzept einführen
- **Mut zur Analogie** – Alltagsvergleiche helfen Anfängern

### Inhalt
- **Keine fertigen Code-Lösungen** – nur Konzepte, Hinweise, Ideen
- **Nachdenk-Aufgaben** am Ende jeder Praxis-Übung
- **Vergleichstabellen** bei mehreren ähnlichen Konzepten
- **Lernregeln** als Merksätze mit 🦀-Emoji

### Technisch (mdBook-Kompatibilität)
- **Spitze Klammern** außerhalb von Code-Blöcken immer mit Backticks umschließen: `` `Vec<T>` ``
- **Keine ungeschlossenen HTML-Tags** – mdBook gibt sonst Warnungen
- **Code-Blöcke** immer mit Sprache kennzeichnen: ` ```rust `, ` ```bash `, ` ```toml `
- **Emojis** in Überschriften und SUMMARY.md sind erlaubt und erwünscht

---

## 📊 Kapitellängen-Orientierung

| Kapiteltyp | Ungefähre Länge | Projekte |
|---|---|---|
| Kurze Erklärung / Konzept | 100-200 Zeilen | 0-10 |
| Standard Bonus-Lektion | 300-400 Zeilen | 50 |
| Umfangreiche Theorie + Praxis | 400-500 Zeilen | 50 |
| Praxis-Sammlung (wie antigravity-praxis.md) | 500+ Zeilen | 50+ |

---

## 🏷️ Kategorien & Sektionen in SUMMARY.md

```
# 🗺️ Projektplanung
  → Planungs- und Workflow-Kapitel

# Phase 1: Grundlagen für Einsteiger
  → Rust-Grundlagen: Variablen, Typen, Kontrollfluss, Ownership

# Phase 2: Strukturen & Enums  [🔜 Geplant]
  → Structs, Enums, Pattern Matching, impl-Blöcke

# Phase 3: Fehlerbehandlung & Traits  [🔜 Geplant]
  → Result, Option, Traits, Generics

# Phase 4: Fortgeschrittene Konzepte  [🔜 Geplant]
  → Closures, Iteratoren, Async, Makros

# 🤖 Bonus: KI als Lernpartner
  → Alle KI-Tool-Lektionen (Antigravity, Gemini, Copilot, etc.)
```

---

## ⚡ Schnellstart-Checkliste

Benutze diese Checkliste für jedes neue Kapitel:

- [ ] Dateiname gewählt (lowercase, kebab-case, .md)
- [ ] Emoji gewählt
- [ ] Datei erstellt unter `rust-projekte/src/[name].md`
- [ ] Struktur vollständig: Einleitung → Theorie → Praxis → Projekte → Zusammenfassung → Links
- [ ] Keine fertigen Code-Lösungen enthalten
- [ ] Spitze Klammern außerhalb Code-Blöcken in Backticks
- [ ] `SUMMARY.md` aktualisiert – neuer Eintrag in richtiger Sektion
- [ ] `mdbook build` ausgeführt – keine Fehler, keine Warnungen
- [ ] `/home/thorsten/Anfaenger/AGENTS.md` aktualisiert
- [ ] `/home/thorsten/Anfaenger/.agents/AGENTS.md` aktualisiert (falls KI-Thema)
- [ ] Im Browser geprüft: `http://localhost:3000` (bei laufendem `mdbook serve`)

---

## 💡 Beispiel: Fertiger SUMMARY.md-Eintrag

```markdown
# 🤖 Bonus: KI als Lernpartner

- [Antigravity – CLI, 2.0 & IDE](./antigravity.md)
- [Antigravity Praxis-Projekte](./antigravity-praxis.md)
- [💎 Google Gemini als Lernpartner](./gemini.md)
- [🐙 GitHub Copilot – Der klassische Assistent](./copilot.md)
- [🤖 IDE KI-Agenten – Die nächste Generation](./ide-agent.md)
- [🎵 Vibe Coding – Programmieren im Flow](./vibe-coding.md)
- [🧠 Eigene KI-Agenten programmieren](./eigener-agent.md)
- [🔧 Mein neues Kapitel](./mein-neues-kapitel.md)   ← NEU
```

---

## 🔗 Referenz-Kapitel (als Vorlage nutzen)

Orientiere dich bei neuen Kapiteln an diesen bestehenden Lektionen:

| Kapitel | Pfad | Besonderheit |
|---|---|---|
| Eigener Agent | `src/eigener-agent.md` | Vollständige Theorie + 50 Projekte |
| Gemini | `src/gemini.md` | Übungs-orientiert, viele Aufgaben |
| Antigravity | `src/antigravity.md` | Theorie mit Tabellen und Vergleichen |
| Phase 1 | `src/phase1.md` | Rust-Grundlagen ohne KI-Bezug |
