---
name: subagent-steuern
description: Steuert Subagenten. Trigger: "Subagenten steuern/verwalten".
---
# Subagenten Steuerung
- Einsatz: 3+ Kapitel oder parallele Tasks.
- Prompt-Regeln: 1 Datei/Agent, absolut Pfad, Deutsch, **Keine Codelösungen!**, keine Änderungen an `SUMMARY.md` durch Subagenten.
- Nach Abschluss: Hauptagent prüft Dateien, trägt in `SUMMARY.md` ein, und führt `mdbook build` aus.
