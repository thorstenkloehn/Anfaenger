---
name: subagent-steuern
description: Steuert Subagenten. Trigger: "Subagenten steuern/verwalten".
---
# Skill: Subagenten steuern und verwalten

Dieser Skill dient zur Steuerung und Verwaltung von Subagenten bei größeren, parallelen Aufgaben (z. B. der parallelen Bearbeitung von 3+ Kapiteln oder komplexen Refactorings).

## 🛠️ Einsatzbereich & Aktivierung
- **Einsatz:** Bei komplexen Aufgaben mit mehreren parallelen Schritten oder Dateien.
- **Trigger:** "Subagenten steuern", "Subagenten verwalten", "Subagenten koordinieren".

## 📋 Richtlinien für Subagenten-Prompts
Jeder Subagent muss mit präzisen, restriktiven Prompts gestartet werden:
1. **Ein Subagent pro Datei:** Ein Subagent darf jeweils nur genau eine Datei bearbeiten.
2. **Absolute Pfade:** Gib dem Subagenten immer absolute Dateipfade mit.
3. **Sprache:** Deutsch, anfängerfreundlich und klar verständlich.
4. **Keine Codelösungen:** Subagenten dürfen **keinen** fertigen Code vorwegnehmen oder Lösungen präsentieren. Nur Hinweise und Code-Gerüste (`todo!()`) sind erlaubt.
5. **Kein SUMMARY.md:** Subagenten dürfen die Datei `SUMMARY.md` **nicht** selbstständig verändern.

## 🔄 Workflow nach Abschluss
Sobald die Subagenten ihre Aufgaben abgeschlossen haben, übernimmt der Hauptagent die Integration:
1. **Code-Review:** Der Hauptagent prüft alle geänderten oder neu erstellten Dateien auf Qualität und Einhaltung der Regeln.
2. **SUMMARY.md:** Der Hauptagent trägt neue Kapitel manuell in `rust-projekte/src/SUMMARY.md` ein.
3. **Validierung:** Der Hauptagent führt im Verzeichnis `rust-projekte` den Befehl `mdbook build` aus, um das Buch erfolgreich zu kompilieren.
