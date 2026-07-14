---
name: neues-kapitel
description: Erstellt mdBook-Kapitel. Trigger: "neues Kapitel/Lektion".
---
# Skill: Neue Kapitel/Lektionen erstellen

Dieser Skill beschreibt den vollständigen Workflow zum Hinzufügen neuer Buchkapitel oder Lektionen im mdBook.

## 🛠️ Aktivierung
- **Trigger:** "Schreibe ein neues Kapitel über [Thema]", "Erstelle eine neue Lektion zu [Thema]", "Füge ein Bonus-Kapitel hinzu".

## 🔄 Workflow zur Erstellung
1. **Datei anlegen:** Erstelle die neue Datei unter `rust-projekte/src/[name-kebab].md`.
2. **Inhaltsverzeichnis aktualisieren:** Trage das Kapitel in `SUMMARY.md` ein:
   `- [EMOJI Titel](./[name-kebab].md)`
3. **Didaktischer Stil:**
   - Verwende durchgehend eine freundliche, einfache "Du"-Form (anfängerfreundlich).
   - **Wichtig:** Präsentiere **keine fertigen Codelösungen**! Verwende stattdessen Code-Gerüste mit `todo!()`, Pseudocode oder didaktische Erklärungen.
4. **Validieren:** Führe `mdbook build` im Verzeichnis `rust-projekte` aus, um sicherzustellen, dass keine Fehler vorliegen.

## 📋 Kapitelstruktur
Jedes neue Kapitel sollte folgendem Muster folgen:
- `# EMOJI Titel`
- Einleitung (Zweck und Lernziele der Lektion)
- `## 🧠 Theorie` (Erklärung der Kernkonzepte mit Analogien)
- `## 🛠️ Praxis-Aufgaben` (Aufgaben ohne fertige Codelösungen)
- `## 🚀 50 Projekte` (Vorschläge zur praktischen Anwendung)
- `## 💡 Zusammenfassung` (Key Takeaways in Tabellenform oder Stichpunkten)
- `## 📚 Links` (Weiterführende Links zur offiziellen Dokumentation)
