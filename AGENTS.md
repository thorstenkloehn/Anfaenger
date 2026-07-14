# Projekt-Richtlinien für KI-Agenten

Dieses Repository enthält das Rust-Lernbuch "Anfänger". Als KI-Agent (Antigravity, Claude, Gemini etc.) musst du dich strikt an die folgenden didaktischen, organisatorischen und technischen Regeln halten.

---

## 🧠 Didaktische Grundregeln (Höchste Priorität)

- **Sprache & Stil:** Schreibe alle Texte auf Deutsch in einer freundlichen, einfachen und motivierenden "Du"-Form. Erkläre Konzepte anschaulich und verwende Analogien, bevor du auf die Syntax eingehst.
- **Keine fertigen Codelösungen!** Präsentiere dem Lernenden niemals fertigen Code für Übungen oder Probleme. Verwende stattdessen:
  - Code-Gerüste mit `todo!()`
  - Abstrakten Pseudocode oder Konzept-Skizzen
  - Hilfreiche Denkanstöße, Leitfragen und Verweise auf Compiler-Fehlermeldungen
  - Der Lernende muss den Code selbst schreiben, um zu lernen.

---

## 🛠️ Technische & Workflow-Regeln

- **Inhaltsverzeichnis:** Neue Kapitel müssen immer manuell in [rust-projekte/src/SUMMARY.md](file:///home/thorsten/Anfaenger/rust-projekte/src/SUMMARY.md) eingetragen werden:
  `- [EMOJI Titel](./[name-kebab].md)`
- **Validierung:** Nach jeder Änderung an Buchkapiteln oder der Struktur muss im Ordner [rust-projekte](file:///home/thorsten/Anfaenger/rust-projekte) der Befehl `mdbook build` ausgeführt werden, um sicherzustellen, dass das Buch fehlerfrei baut.
- **Kapitelschutz (NICHT LÖSCHEN):** Lösche oder überschreibe unter keinen Umständen Kapitel, die sich auf Editoren, IDEs oder KI-Agenten beziehen. Das betrifft alle Dateien, deren Namen mit folgenden Mustern übereinstimmen:
  `gemini*`, `copilot*`, `claude-code*`, `codex-cli*`, `agy-cli*`, `agy-sdk*`, `claude-sdk*`, `codex-sdk*`, `vibe-coding*`, `eigener-agent*`, `zed-ide*`, `vim*`, `antigravity*`.

---

## 🔀 Subagenten-Orchestrierung

- **Wann Subagenten einsetzen?** Nutze Subagenten bei größeren Aufgaben (z. B. der parallelen Erstellung oder Bearbeitung von mehr als 2 Dateien/Kapiteln).
- **Verfügbare Subagenten-Typen:**
  - `self`: Erbt die volle Konfiguration des Hauptagenten (inkl. Schreib- und Ausführungs-Tools). Verwende `self` für Erstellungs- und Bearbeitungstasks.
  - `research`: Schreibgeschützter Agent für Websuche, Code-Recherchen und Lesen. Ideal zur Informationsbeschaffung ohne Risiko von Dateischäden.
- **Regeln für Subagenten-Prompts:**
  - **Ein Subagent pro Datei:** Jeder Subagent darf genau eine Datei bearbeiten oder erstellen.
  - **Absolute Pfade:** Übergib den Subagenten immer absolute Dateipfade (z. B. `/home/thorsten/Anfaenger/rust-projekte/src/datei.md`).
  - **Regel-Weitergabe:** Verpflichte Subagenten zur Einhaltung der didaktischen Regeln (Deutsch, Du-Form, keine fertigen Codelösungen).
  - **Verbot von SUMMARY.md:** Subagenten dürfen die `SUMMARY.md` **nicht** selbstständig ändern.
- **Integration:** Nach Beendigung der Subagenten führt der Hauptagent ein Review durch, aktualisiert die `SUMMARY.md` und führt `mdbook build` aus.

---

## 🪙 Token-Effizienz & Ignorierte Dateien

Um API-Limits zu sparen und den Token-Verbrauch gering zu halten, ignoriert der Agent automatisch alle temporären und generierten Ordner. Stelle sicher, dass diese Dateien nicht in den Kontext geladen werden. Sie sind in der [.gitignore](file:///home/thorsten/Anfaenger/.gitignore) eingetragen:
- `rust-projekte/book/` (das generierte HTML-Buch)
- `rust-projekte/node_modules/` (Node-Pakete für das Deployment)
- Temporäre Dateien (`*.o`, `*.out`, `.DS_Store`, etc.)
