---
name: verteile-subagent
description: Teilt Tasks auf. Trigger: "3 neue Kapitel", "Theorie und Praxis parallel".
---
# Skill: Subagenten verteilen
- **Aktivierung:** "Teile Aufgaben auf", "Nutze Subagenten", "Erstelle Kapitel parallel".
- **Regeln:**
  1. 1 Datei pro Subagent.
  2. Nur absolute Pfade übergeben.
  3. Didaktik erzwingen (Deutsch, Du-Form, **keine Codelösungen**, nur `todo!()`).
  4. Subagenten dürfen `SUMMARY.md` nicht ändern.
- **Zusammenführung:**
  1. Validieren (Code & Stil prüfen).
  2. `SUMMARY.md` manuell durch Hauptagenten anpassen.
  3. `mdbook build` im Ordner `rust-projekte/` ausführen.
