# Workspace-Richtlinien & Skills für Antigravity

Dieses Dokument definiert die im Workspace verfügbaren Tools, Subagenten und Skills sowie die Regeln zu deren Aktivierung und Steuerung.

---

## 🛠️ Tools im Buch

- **Gemini:** Chat & Konzeption im Browser.
- **Antigravity (`agy`):** Coden, Workflows (CLI, 2.0 & IDE) und Automatisierung.
- **Copilot:** Klassische Code-Vervollständigung.
- **IDE-Agenten:** Planung & Bearbeitung direkt in der Entwicklungsumgebung.
- **Claude Code:** Terminal-Agent für Workflows.
- **Codex CLI:** Terminal-Assistent von OpenAI.
- **Vibe Coding:** Flow-orientierte Entwicklung.
- **Zed IDE / Vim:** Editor-spezifische KI-Integration.
- **Eigene KI-Agenten:** Selbstgebaute Rust-basierte Agenten.

---

## 🔀 Subagenten-Typen & Richtlinien

- **`self` (Lese-/Schreibzugriff):** Klon des Hauptagenten. Verwenden für das Erstellen und Bearbeiten einzelner Kapitel.
- **`research` (Schreibgeschützt):** Für Suchen und Recherchen ohne Gefahr von Code-Modifikationen.

### Regeln für die Zuweisung (ab 3 Dateien oder komplexen Refactorings):
1. Nutze den Skill `verteile-subagent` zur Aufteilung.
2. Jeder Subagent erhält maximal eine Datei als Arbeitsauftrag mit absolutem Pfad.
3. Subagenten dürfen die `SUMMARY.md` nicht anfassen.
4. Nach Abschluss koordinierst du die Integration mit dem Skill `subagent-steuern`.

---

## 🧩 Verfügbare Skills (Dynamisches Laden über .agents/skills/)

Der Hauptagent besitzt folgende vordefinierte Fähigkeiten, die bei passenden Triggern automatisch geladen werden:
- `neues-kapitel` (Erstellt mdBook-Kapitel strukturiert und stilistisch konform)
- `verteile-subagent` (Splittet große Aufgaben auf und delegiert sie an Subagenten)
- `subagent-steuern` (Koordiniert und integriert die Arbeit abgeschlossener Subagenten)
- `anki-karten-generieren` (Extrahiert atomare Lernkarten in `rust_anki_karten.csv`)
- `code-review` (Analysiert Rust-Code auf Idiomatik, Ownership & Konventionen)
- `fehler-erklaeren` (Didaktische Erklärung von Compiler-Fehlern)
- `kapitel-lektorat` (Lektoriert Kapitel auf Du-Form, Didaktik und Formatierung)
- `uebungen-erstellen` (Erstellt Übungen in drei Schwierigkeitsgraden)

---

## 🪙 Token-Effizienz & Ignorierte Dateien

Um API-Limits zu sparen und den Token-Verbrauch gering zu halten, ignoriert der Agent automatisch alle temporären und generierten Ordner. Stelle sicher, dass diese Dateien nicht in den Kontext geladen werden. Sie sind in der [.gitignore](file:///home/thorsten/Anfaenger/.gitignore) eingetragen:
- `rust-projekte/book/` (das generierte HTML-Buch)
- `rust-projekte/node_modules/` (Node-Pakete für das Deployment)
- Temporäre Dateien (`*.o`, `*.out`, `.DS_Store`, etc.)

