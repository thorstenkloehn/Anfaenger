---
name: verteile-subagent
description: Teilt Tasks auf. Trigger: "3 neue Kapitel", "Theorie und Praxis parallel".
---
# Skill: Subagenten verteilen (Task-Verteilung)

Dieser Skill wird verwendet, um große Aufgaben (z. B. das Erstellen mehrerer Kapitel oder das gleichzeitige Bearbeiten von Theorie und Praxis) in kleinere, unabhängige Aufgaben aufzuteilen und diese an Subagenten zu delegieren.

## 🛠️ Einsatzbereich & Aktivierung
- **Einsatz:** Wenn mehr als 2 Dateien gleichzeitig bearbeitet oder erstellt werden müssen.
- **Trigger:** "Teile Aufgaben auf", "Nutze Subagenten", "Erstelle Kapitel parallel", "Theorie und Praxis parallel".

## 📋 Regeln für die Aufgabenverteilung
1. **Delegation:** Weise jedem Subagenten genau eine Datei zur Bearbeitung oder Neuerstellung zu.
2. **Instruktion der Subagenten:**
   - Übergib dem Subagenten immer absolute Pfade zu den Zieldateien.
   - Verlange die Einhaltung des didaktischen Konzepts (anfängerfreundlich, Deutsch, Du-Form).
   - **Wichtig:** Weise den Subagenten an, **keine fertigen Codelösungen** zu schreiben, sondern mit Hinweisen, Pseudocode und `todo!()` zu arbeiten.
   - Verbiete dem Subagenten explizit, Änderungen an `SUMMARY.md` vorzunehmen.

## 🔄 Integration durch den Hauptagenten
Nachdem alle Subagenten ihre Arbeit beendet haben, führt der Hauptagent folgende Schritte aus:
1. **Validierung:** Prüfe den erzeugten Code und die Kapiteltexte der Subagenten auf inhaltliche und stilistische Richtigkeit.
2. **SUMMARY.md:** Aktualisiere das Inhaltsverzeichnis unter `rust-projekte/src/SUMMARY.md` selbstständig.
3. **Erstellung validieren:** Führe `mdbook build` im Verzeichnis `rust-projekte` aus, um den fehlerfreien Build der Dokumentation sicherzustellen.
