# 🐚 Claude Code – Der KI-Agent im Terminal

*Lass die KI direkt in deiner Shell programmieren, testen und Fehler beheben.*

---

In dieser Lektion lernen wir **Claude Code** kennen. Claude Code ist ein von Anthropic entwickeltes Befehlszeilen-Tool (CLI), das als autonomer KI-Agent direkt in deinem Terminal arbeitet. Im Gegensatz zu normalen Chatbots kann Claude Code Befehle ausführen, Dateien lesen und bearbeiten, Git-Commits schreiben und Tests starten – alles gesteuert durch natürliche Sprache direkt aus deiner Shell.

Für Rust-Entwickler ist Claude Code ein extrem mächtiger Partner, da er Compiler-Fehler von `cargo build` direkt lesen und selbstständig im Code korrigieren kann.

---

## 🧠 Theorie: Was ist Claude Code?

### Was unterscheidet Claude Code von ChatGPT oder dem Claude Web-Chat?

| Eigenschaft | Claude im Web (Claude.ai) | Claude Code (CLI) |
|---|---|---|
| **Schnittstelle** | Browser-Oberfläche | Terminal / Shell |
| **Dateizugriff** | Nur über manuelles Hochladen | Direkter Lese- und Schreibzugriff (lokal) |
| **Terminalbefehle** | Keine | Kann Befehle ausführen (z. B. `cargo test`) |
| **Autonomie** | Niedrig (du kopierst Code) | Hoch (Agent plant und editiert selbstständig) |
| **Git-Anbindung** | Keine | Kann Commits erstellen und Diffs anzeigen |

### Wie funktioniert der Agenten-Workflow?

Wenn du Claude Code eine Aufgabe gibst (z. B. *„Finde den Fehler im Rechner-Modul und behebe ihn“*), arbeitet der Agent in einer Schleife (Agentic Loop):
1. **Analysieren:** Er durchsucht das Projektverzeichnis nach relevanten Dateien (mittels `ls`, `grep` etc.).
2. **Lesen:** Er öffnet und liest die betroffenen `.rs`-Dateien (`view_file`).
3. **Planen:** Er erstellt einen Plan, wie der Fehler behoben werden kann.
4. **Schreiben:** Er modifiziert die Dateien (`edit_file`).
5. **Prüfen:** Er führt `cargo check` oder `cargo test` aus, um zu sehen, ob sein Fix funktioniert. Falls nicht, korrigiert er sich selbst so lange, bis die Tests bestehen.
6. **Bestätigen:** Er zeigt dir ein farbiges Diff (Änderungen) und bittet dich um Erlaubnis, die Änderungen dauerhaft zu speichern.

---

## 💾 Memory & Anweisungen (CLAUDE.md)

Claude Code kann sich über mehrere Sitzungen hinweg Dinge merken. Es gibt zwei Hauptwege, wie Claude lernt, wie du in deinem Projekt arbeiten möchtest:

### 1. CLAUDE.md
Wenn du eine Datei namens `CLAUDE.md` in dein Projektverzeichnis legst, liest Claude Code diese bei jedem Start automatisch ein. 
Hier kannst du projektweite Regeln definieren:
- Wie gebaut und getestet wird (z. B. `cargo build --release`).
- Namenskonventionen oder Architektur-Richtlinien.
- Vorgaben (z. B. "Schreibe keine unwrap() Aufrufe").

### 2. Auto-Memory (Automatisches Lernen)
Wenn du Claude im Chat korrigierst oder ihm sagst, dass er sich etwas für die Zukunft merken soll (z. B. mit dem Befehl `/learn`), speichert er dieses Wissen in der `.claude/` Mappe ab. So passt er sich kontinuierlich an deinen Coding-Stil an, ohne dass du alles jedes Mal neu erklären musst.

---

## 🔒 Berechtigungen (Permission Modes)

Da Claude Code Befehle in deiner Shell ausführt, ist Sicherheit wichtig. Claude Code kennt verschiedene Berechtigungsmodi, die du z. B. über `/config` einstellen kannst:

- **Ask (Nachfragen):** Claude fragt vor jedem Terminal-Befehl und vor jeder Datei-Änderung um Erlaubnis. (Standard für sensible Aktionen)
- **Auto-Approve:** Du kannst bestimmte Befehle (wie `cargo check`, `cargo test`, `git status`) automatisch erlauben. Claude führt sie dann sofort aus.
- **Read-Only Mode:** Startest du Claude mit `claude --readonly`, darf der Agent nur Dateien lesen, aber nichts ändern oder schreiben. Perfekt für Code-Analysen ohne Risiko.

---

## ⚡ Context Window & Prompt Caching

Wenn du mit großen Rust-Projekten arbeitest, liest Claude oft viele Dateien ein.
- **Context Window:** Claude Code nutzt das riesige Kontextfenster (über 200.000 Token) von Modellen wie Claude 3.5 Sonnet, um ganze Repositories auf einmal zu überblicken.
- **Prompt Caching:** Um Kosten zu sparen und Antworten zu beschleunigen, nutzt Claude Code "Prompt Caching". Häufig gelesene Dateien werden im Hintergrund zwischengespeichert.

---

## 🚀 Praxis & Übungen

Um die schiere Menge an Möglichkeiten und Funktionen zu erlernen, haben wir die Praxisübungen in zwei Kapitel unterteilt:

1. **[Praxis Teil 1: Grundlagen & Cargo-Integration](./claude-code-praxis-1.md)** - Übungen 1 bis 30 (Installation, Basic Commands, Fehlerbehebung).
2. **[Praxis Teil 2: Profi-Workflows & Git](./claude-code-praxis-2.md)** - Übungen 31 bis 60+ (Git, CI/CD, Agent Memory, Permissions).

Bitte arbeite diese Kapitel nacheinander durch, um vom Anfänger zum Profi im Umgang mit Claude Code zu werden!
