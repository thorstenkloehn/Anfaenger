---
name: neues-kapitel
description: Erstellt mdBook-Kapitel. Trigger: "neues Kapitel/Lektion".
---
# Workflow
1. `rust-projekte/src/[name-kebab].md`
2. `SUMMARY.md` ergänzen: `- [EMOJI Titel](./dateiname.md)`
3. Struktur: `# EMOJI Titel`, Einleitung, `## 🧠 Theorie`, `## 🛠️ Praxis-Aufgaben (Keine Codelösungen)`, `## 🚀 50 Projekte`, `## 💡 Zusammenfassung`, `## 📚 Links`.
4. `cd rust-projekte && mdbook build`
5. Du-Form, **KEINE Codelösungen**.
