---
name: neues-kapitel
description: Erstellt mdBook-Kapitel strukturiert und stilistisch konform. Trigger: "neues Kapitel/Lektion".
---
# Skill: Neues Kapitel
- **Aktivierung:** "Schreibe ein neues Kapitel über [Thema]", "Erstelle neue Lektion zu [Thema]".
- **Workflow:**
  1. Datei anlegen: `rust-projekte/src/[name-kebab].md`.
  2. In [SUMMARY.md](file:///home/thorsten/Anfaenger/rust-projekte/src/SUMMARY.md) eintragen: `- [EMOJI Titel](./[name-kebab].md)`.
  3. Didaktik: Deutsch, freundliches "Du", **keine fertigen Codelösungen** (nur `todo!()`, Pseudocode).
  4. Diagramme: Nutze Mermaid-Syntax (```mermaid) für Architektur- und Kontrollfluss-Diagramme.
  5. Validierung: `mdbook build` in `rust-projekte/` ausführen.
- **Struktur:**
  - `# EMOJI Titel`
  - Einleitung (Verbindung von Konzept und Anwendungsbereich)
  - `## 🧠 Theorie` (Konzepte mit Analogien und Mermaid-Diagrammen)
  - `## 🛠️ Praxis-Aufgaben` (mit `todo!()` Code-Gerüsten & `#[test]`)
  - `## 🚀 Compiler- / Praxis-Experimente`
  - `## 💡 Zusammenfassung` (Tabelle/Stichpunkte)
  - `## 📚 Links`
