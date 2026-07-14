---
name: neues-kapitel
description: Erstellt mdBook-Kapitel. Trigger: "neues Kapitel/Lektion".
---
# Skill: Neues Kapitel
- **Aktivierung:** "Schreibe ein neues Kapitel über [Thema]", "Erstelle neue Lektion zu [Thema]".
- **Workflow:**
  1. Datei anlegen: `rust-projekte/src/[name-kebab].md`.
  2. In [SUMMARY.md](file:///home/thorsten/Anfaenger/rust-projekte/src/SUMMARY.md) eintragen: `- [EMOJI Titel](./[name-kebab].md)`.
  3. Didaktik: Deutsch, freundliches "Du", **keine fertigen Codelösungen** (nur `todo!()`, Pseudocode).
  4. Validierung: `mdbook build` in `rust-projekte/` ausführen.
- **Struktur:**
  - `# EMOJI Titel`
  - Einleitung
  - `## 🧠 Theorie` (Konzepte mit Analogien)
  - `## 🛠️ Praxis-Aufgaben`
  - `## 🚀 50 Projekte`
  - `## 💡 Zusammenfassung` (Tabelle/Stichpunkte)
  - `## 📚 Links`

