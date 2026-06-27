---
name: subagent-steuern
description: >
  Steuert und koordiniert Subagenten bei komplexen Aufgaben. Triggert bei "Wie steuere ich Subagenten?", "Verwalte Subagenten für X", "Subagenten-Anleitung".
---

# Skill: Subagenten steuern & koordinieren

Dieses Dokument beschreibt die Richtlinien und Workflows zur effizienten Steuerung, Überwachung und Zusammenführung von Subagenten in diesem Projekt.

## 📋 Grundlagen der Subagenten-Steuerung

Subagenten sind mächtige, spezialisierte Instanzen. Um ein optimales Ergebnis im Rust-Einsteigerbuch zu erzielen, müssen sie präzise angeleitet und überwacht werden.

### 1. Wann werden Subagenten eingesetzt?
- Bei großen Aufgaben (z. B. dem gleichzeitigen Schreiben von 3 oder mehr Kapiteln).
- Wenn Theoriekapitel und Praxisprojekte parallel entwickelt werden sollen.
- Bei umfassenden Updates aller bestehenden Lektionen.

---

## 🛠️ Workflow zur Steuerung von Subagenten

### Schritt 1: Teilaufgaben präzise definieren
- Jeder Subagent erhält **genau eine** klar abgegrenzte Aufgabe (z. B. das Erstellen einer einzigen `.md`-Datei).
- Keine zwei Subagenten dürfen gleichzeitig dieselbe Datei bearbeiten, um Schreibkonflikte zu vermeiden.

### Schritt 2: Den optimalen Prompt formulieren
Der Prompt für `invoke_subagent` muss folgende Elemente enthalten:
1. **Ziel-Datei:** Angabe des absoluten Pfads im Workspace (z. B. `/home/thorsten/Anfaenger/rust-projekte/src/[dateiname].md`).
2. **Thema & Inhalt:** Genaue Inhaltsbeschreibung (Theorie, Praxis, Struktur).
3. **Wichtige Regeln (verpflichtend mitgeben):**
   - Sprache: Deutsch (anfängerfreundlich, präzise, in der Du-Form).
   - **Keine Codelösungen!** Nur Hinweise, Fragen und Denkanstöße zur Selbsthilfe.
   - Formatierung: Markdown mit Code-Blöcken, spitze Klammern in Backticks (z. B. `` `Vec<T>` ``).
   - Verbot von Änderungen an `SUMMARY.md` durch den Subagenten.

*Beispiel-Prompt:*
> „Erstelle das Kapitel über [Thema] unter dem absoluten Pfad `/home/thorsten/Anfaenger/rust-projekte/src/[dateiname].md`. Verwende das standardmäßige Kapitel-Schema (Theorie, Praxis, Zusammenfassung, Links). Schreibe auf Deutsch, halte es anfängerfreundlich und liefere KEINE fertigen Rust-Codelösungen! Nimm keine Änderungen an SUMMARY.md vor.“

### Schritt 3: Subagenten starten
Nutze das Tool `invoke_subagent` mit dem passenden `TypeName` (z. B. `self` für vollen Zugriff oder `research` für Nur-Lese-Aufgaben).

### Schritt 4: Status überwachen und kommunizieren
- Du musst nicht in einer Schleife pollen. Das System weckt dich automatisch auf, wenn ein Subagent fertig ist oder eine Nachricht sendet.
- Falls nötig, kannst du mit `send_message` Zwischenstände abfragen oder Korrekturen senden.
- Mit `manage_subagents` (Action: `list`) behältst du den Überblick über alle aktiven Subagenten.

### Schritt 5: Zusammenführung und Validierung (Hauptagent)
Sobald ein Subagent seine Arbeit beendet hat:
1. **Qualitätskontrolle:** Öffne die erstellte Datei mit `view_file` und prüfe, ob alle Regeln eingehalten wurden (insbesondere das Codelösungsverbot!).
2. **Inhaltsverzeichnis aktualisieren:** Trage den Link zur neuen Datei in `rust-projekte/src/SUMMARY.md` ein.
3. **Build-Prüfung:** Führe `cd rust-projekte && mdbook build` im Terminal aus, um sicherzustellen, dass keine Fehler vorliegen.

---

## ⚠️ Wichtige Constraints & Fallback-Regeln

- **Schreibrechte:** Nur der Hauptagent darf `SUMMARY.md` bearbeiten. Subagenten dürfen niemals Links hinzufügen oder entfernen, um Merge-Konflikte zu vermeiden.
- **Fehlerhafte Subagenten:** Wenn ein Subagent Code-Lösungen generiert hat oder die Struktur nicht einhält, weise ihn per `send_message` an, den Fehler zu korrigieren, oder korrigiere es selbst mit den Dateibearbeitungs-Tools des Hauptagenten.
- **Ressourcen schonen:** Beende nicht mehr benötigte oder hängengebliebene Subagenten über das Tool `manage_subagents` mit der Action `kill`.
