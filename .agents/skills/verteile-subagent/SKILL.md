---
name: verteile-subagent
description: >
  Aktiviere diesen Skill, wenn eine Aufgabe in mehrere unabhängige Teilaufgaben
  aufgeteilt werden kann, die parallel von Subagenten bearbeitet werden sollen.
  Typische Trigger: "Schreibe 3 neue Kapitel", "Erstelle Theorie UND Projekte
  für mehrere Themen gleichzeitig", "Aktualisiere alle Lektionen".
---

# Skill: Verteile Aufgaben auf Subagenten

Dieser Skill beschreibt, wie du große Aufgaben in parallele Teilaufgaben zerlegst
und diese an Subagenten delegierst – für schnelleres, strukturiertes Arbeiten.

---

## 🧠 Wann diesen Skill nutzen?

Nutze diesen Skill, wenn:

- Eine Aufgabe **3 oder mehr unabhängige Teile** hat
- Die Teile **parallel** erledigt werden können (keine Abhängigkeiten)
- Jeder Teil eine **klar abgegrenzte Ausgabedatei** produziert
- Die Gesamtaufgabe so groß ist, dass ein einzelner Kontext überfordert wäre

**Beispiele für dieses Projekt:**
- „Schreibe Kapitel für Copilot, IDE-Agent und Vibe Coding" → 3 Subagenten
- „Aktualisiere alle AGENTS.md-Dateien und erstelle einen neuen Skill" → 2 Subagenten
- „Erstelle Theorie + 50 Projekte für 4 verschiedene KI-Themen" → 4 Subagenten

---

## 🔄 Der Workflow

### Schritt 1: Aufgabe analysieren

Bevor du Subagenten startest, identifiziere:

```
1. Wie viele unabhängige Teilaufgaben gibt es?
2. Welche Ausgabedatei produziert jede Teilaufgabe?
3. Gibt es Abhängigkeiten? (Wenn ja: sequenziell, nicht parallel!)
4. Welche gemeinsamen Informationen brauchen alle Subagenten?
```

### Schritt 2: Subagenten definieren

Für jeden unabhängigen Teil:

```
Subagent A:
  - Aufgabe: [klar beschreiben]
  - Ausgabe: [Dateiname]
  - Kontext: [Was muss der Subagent wissen?]

Subagent B:
  - Aufgabe: [klar beschreiben]
  - Ausgabe: [Dateiname]
  - Kontext: [Was muss der Subagent wissen?]
```

### Schritt 3: Gemeinsamen Kontext vorbereiten

Alle Subagenten erhalten denselben Basis-Kontext:

```markdown
## Basis-Kontext für alle Subagenten

**Projekt:** Rust-Lernbuch mit mdBook
**Pfad:** /home/thorsten/Anfaenger/rust-projekte/src/
**Sprache:** Immer Deutsch
**Stil:** Anfängerfreundlich, keine fertigen Code-Lösungen
**Format:** Markdown, kompatibel mit mdBook
**Struktur:** Theorie → Praxis-Aufgaben → 50 Projekte (wie bestehende Kapitel)
**Vorlage:** Orientiere dich am Stil von `src/gemini.md` oder `src/eigener-agent.md`
```

### Schritt 4: Subagenten starten (parallel)

Starte alle Subagenten **gleichzeitig** – sie arbeiten unabhängig voneinander.

### Schritt 5: Ergebnisse sammeln & integrieren

Wenn alle Subagenten fertig sind:

1. Alle neuen Dateien in `SUMMARY.md` eintragen
2. `mdbook build` ausführen – auf Warnungen prüfen
3. `AGENTS.md` aktualisieren (neue Kapitel dokumentieren)

---

## 📋 Vorlage: Prompt für einen Subagenten (mdBook-Kapitel)

Nutze diese Vorlage als Basis für jeden Subagenten-Prompt:

```
Du schreibst ein Kapitel für ein Rust-Lernbuch (mdBook).

**Deine Aufgabe:** [THEMA] – Theorie und 50 Praxisprojekte

**Zieldatei:** /home/thorsten/Anfaenger/rust-projekte/src/[DATEINAME].md

**Anforderungen:**
- Sprache: Deutsch
- Zielgruppe: Absolute Rust-Anfänger ohne Vorkenntnisse
- Struktur:
  1. Einleitung (was ist das Thema, warum wichtig?)
  2. Theorie (Konzepte, Vergleiche, Tabellen)
  3. 3 Praxis-Aufgaben zum Ausprobieren
  4. 50 Projektvorschläge (🟢 Einsteiger 1-10, 🟡 Mittel 11-25, 🔴 Fortgeschritten 26-40, ⚡ Herausforderung 41-50)
  5. Zusammenfassung (Tabelle)
  6. Weiterführende Links
- Keine fertigen Code-Lösungen – nur Konzepte, Hinweise, Ideen
- Orientiere dich am Stil von: /home/thorsten/Anfaenger/rust-projekte/src/eigener-agent.md

**Wichtig:** SUMMARY.md NICHT bearbeiten – das macht der Hauptagent danach.
```

---

## 🗂️ Projektspezifische Subagenten-Vorlagen

### Vorlage: Neues mdBook-Kapitel

```
Subagent für: [THEMA]
Datei:        src/[name].md
Emoji:        [🔧/🌐/🎮/...]
Einleitung:   [2-3 Sätze, was das Thema ist]
Kernkonzepte: [3-5 Stichpunkte]
Besonderheit: [Was macht dieses Thema für Rust-Anfänger interessant?]
```

### Vorlage: AGENTS.md aktualisieren

```
Subagent für: AGENTS.md-Update
Dateien:      /home/thorsten/Anfaenger/AGENTS.md
              /home/thorsten/Anfaenger/.agents/AGENTS.md
Aufgabe:      Neue Kapitel/Regeln/Kontexte eintragen
Neue Inhalte: [Liste der neuen Kapitel mit Beschreibung]
```

### Vorlage: Skill erstellen

```
Subagent für: Neuen Skill erstellen
Ordner:       /home/thorsten/Anfaenger/.agents/skills/[skill-name]/
Dateien:      SKILL.md (Pflicht)
Skill-Zweck:  [Was soll der Skill können?]
Trigger:      [Wann soll er aktiviert werden?]
```

---

## ⚠️ Wichtige Regeln für Subagenten in diesem Projekt

1. **Nie `SUMMARY.md` in einem Subagenten bearbeiten** – das macht immer der Hauptagent am Ende, um Konflikte zu vermeiden.

2. **Dateipfade immer absolut angeben** – Subagenten kennen das Arbeitsverzeichnis nicht automatisch.
   - ✅ `/home/thorsten/Anfaenger/rust-projekte/src/neues-kapitel.md`
   - ❌ `src/neues-kapitel.md`

3. **Jeder Subagent schreibt genau eine Ausgabedatei** – keine Überschneidungen.

4. **Gemeinsame Konventionen explizit mitgeben** – Sprache, Stil, Format in jeden Prompt.

5. **Nach dem Zusammenführen:** `mdbook build` ausführen und Warnungen beheben.

---

## 📊 Entscheidungsbaum: Subagent oder nicht?

```
Aufgabe bekommen
      │
      ▼
Ist die Aufgabe in unabhängige Teile trennbar?
      │
   JA │                    NEIN │
      ▼                         ▼
Gibt es 3+ Teile?         Normal bearbeiten
      │
   JA │         NEIN │
      ▼               ▼
Subagenten       Sequenziell
starten!         bearbeiten
```

---

## ✅ Checkliste nach dem Subagenten-Einsatz

- [ ] Alle Subagenten haben ihre Dateien erstellt
- [ ] Alle neuen Dateien in `SUMMARY.md` eingetragen
- [ ] `mdbook build` ausgeführt – keine Fehler/Warnungen
- [ ] `AGENTS.md` aktualisiert (neue Kapitel/Regeln dokumentiert)
- [ ] Dateien im Browser geprüft (`mdbook serve`)

---

## 💡 Beispiel aus diesem Projekt

**Aufgabe:** „GitHub Copilot, IDE KI-Agent und Vibe Coding – je Theorie mit 50 Projekten"

**Aufteilung:**
```
Subagent 1 → src/copilot.md      (GitHub Copilot)
Subagent 2 → src/ide-agent.md    (IDE KI-Agenten)
Subagent 3 → src/vibe-coding.md  (Vibe Coding)
```

**Parallel gestartet** → alle 3 fertig in der Zeit, die sonst 1 gebraucht hätte.

**Hauptagent danach:**
1. `SUMMARY.md` → 3 neue Einträge
2. `mdbook build` → sauber
3. `AGENTS.md` → neue Kapitel dokumentiert
