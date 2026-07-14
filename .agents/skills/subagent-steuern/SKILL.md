---
name: subagent-steuern
description: Steuert Subagenten. Trigger: "Subagenten steuern/verwalten".
---
# Skill: Subagenten steuern
- **Aktivierung:** "Subagenten steuern", "Subagenten verwalten", "Subagenten koordinieren".
- **Workflow:**
  1. Starte Subagenten mit restriktiven Prompts (1 Subagent pro Datei, absolute Pfade, Deutsch, keine Codelösungen, kein `SUMMARY.md` Zugriff).
  2. Nach Abschluss: Review durch Hauptagent.
  3. `SUMMARY.md` manuell aktualisieren.
  4. `mdbook build` in `rust-projekte/` ausführen.

