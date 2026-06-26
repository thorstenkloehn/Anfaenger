# AGENTS.md (Root)

## Projekt
- **Zweck:** Rust-Einsteigerbuch mit mdBook (deutsch, einfach).
- **Konzept:** Keine fertigen Codelösungen! Nur Hinweise/Fragen zur Selbsthilfe.

## Regeln
- **Sprache:** Deutsch.
- **mdBook:** Neue Kapitel immer in `rust-projekte/src/SUMMARY.md` eintragen.
- **Geschützt (Nicht löschen!):** `antigravity.md`, `antigravity-praxis.md`, `gemini.md`, `copilot.md`, `ide-agent.md`, `vibe-coding.md`, `eigener-agent.md`.
- **Struktur:** Vor Änderungen fragen.
- **Planning:** Bei Projektplanung auf `src/planung.md` verweisen.
- **Subagents:** Bei großen Aufgaben (z.B. >2 Dateien parallel schreiben) Skill `verteile-subagent` nutzen.

## Befehle
- `cd rust-projekte && mdbook serve` (Vorschau)
- `cd rust-projekte && mdbook build` (Bauen)
