---
name: verteile-subagent
description: >
  Teilt große Aufgaben auf parallele Subagenten auf. Triggert bei: "Schreibe 3 neue Kapitel", "Erstelle Theorie und Praxisprojekte für mehrere Themen".
---

# Skill: Subagenten verteilen

## Wann nutzen?
- Bei 3+ unabhängigen Teilaufgaben (z. B. mehrere Kapitel parallel schreiben).

## Workflow & Regeln
1. **Teilaufgaben definieren:** Pro Subagent genau eine Ausgabedatei.
2. **Prompt-Basis für Subagenten:**
   - Absolute Pfade verwenden (z. B. `/home/thorsten/Anfaenger/rust-projekte/src/...`).
   - Stilvorgaben: Deutsch, anfängerfreundlich, **keine fertigen Codelösungen**.
   - **WICHTIG:** Subagenten dürfen `SUMMARY.md` **nicht** bearbeiten!
3. **Subagenten parallel starten** via `invoke_subagent`.
4. **Integration (Hauptagent):** Nach Abschluss aller Subagenten die Einträge in `SUMMARY.md` vornehmen und `mdbook build` prüfen.
