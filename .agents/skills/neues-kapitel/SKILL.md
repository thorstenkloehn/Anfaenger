---
name: neues-kapitel
description: >
  Erstellt ein neues mdBook-Kapitel. Triggert bei "Schreibe ein neues Kapitel über X", "Erstelle eine neue Lektion zu Y", "Füge ein Bonus-Kapitel hinzu".
---

# Skill: Neues mdBook-Kapitel

## Workflow
1. **Datei:** `rust-projekte/src/[name-kebab-case].md` erstellen.
2. **SUMMARY.md:** Eintrag `- [EMOJI Titel](./dateiname.md)` in passender Sektion.
3. **Struktur:**
   - `# EMOJI Titel – Untertitel`
   - Einleitung
   - ## 🧠 Theorie: Was ist [Thema]?
   - ## 🛠️ Praxis-Aufgaben (A, B, C; keine Codelösungen)
   - ## 🚀 50 Projektvorschläge (1-10 Einstieg, 11-25 Mittel, 26-40 Fortgeschritten, 41-50 Challenge)
   - ## 💡 Zusammenfassung (Tabelle Begriff/Erklärung)
   - ## 📚 Weiterführende Links
4. **Validieren:** `cd rust-projekte && mdbook build`.
5. **Stil:** Deutsch, Du-Form, **keine Codelösungen**, spitze Klammern in Backticks (z. B. `` `Vec<T>` ``).
