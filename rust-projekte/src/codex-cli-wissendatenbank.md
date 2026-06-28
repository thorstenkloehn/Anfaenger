# 💻 Codex CLI – Projekt Wissendatenbank

*Wie du dem Codex Agenten dauerhafte Projekt-Regeln beibringst und eine solide Wissensbasis für deine Rust-Projekte aufbaust.*

---

## 🧠 Theorie: "Alle wissen" – Projektwissen strukturieren

Im Gegensatz zu einigen anderen Agenten mit integriertem, automatischem Langzeitgedächtnis arbeitet ein reines CLI-Tool wie Codex CLI oft sehr zustandslos ("stateless") – jeder neue Aufruf in der Shell startet meist von vorn, es sei denn, du greifst aktiv ein. Damit Codex dennoch "alles weiß" und deine Architekturrichtlinien konsequent befolgt, musst du eine explizite Wissendatenbank aufbauen:

* **Das Rulebook (`CONTEXT.md`):** Du schreibst harte Regeln in eine zentrale Markdown-Datei. Das ist der Leitfaden deines Projekts. Codex muss gezwungen werden, diese Datei als Basis-Kontext bei jeder Frage zu laden.
* **System-Prompts & Shell-Wrappers:** Du kannst die Codex CLI über Bash-Skripte oder Aliase so wrappen, dass sie bei jedem Start automatisch auf dein Rulebook zugreift.
* **Modulare Dokumentation:** Statt einer riesigen Textdatei pflegst du kleine, fokussierte Dateien (z.B. `docs/error_handling.md`), die du dynamisch über die Konsole in den Codex-Prompt einfügst.

## ⚙️ Einstellungen & Setup

Um deine Wissendatenbank elegant mit der Codex CLI zu verknüpfen, brauchst du ein paar Shell-Tricks:
* **CLI-Parameter für Kontext:** Lerne die Parameter der CLI kennen, mit denen du Codex anweist, bestimmte Dateien als initialen Kontext oder System-Instruktion zu behandeln.
* **Shell-Aliase (`.bashrc` / `.zshrc`):** Lege dir einen Shortcut wie `codex-rust` an, der im Hintergrund immer den Inhalt deiner `CONTEXT.md` an Codex übergibt.
* **Projekt-Profile (`.codexrc`):** Überprüfe die Einstellungen, ob du standardmäßig einen System-Prompt für dein Projektverzeichnis definieren kannst.

---

## 🛠️ Praxis-Übungen: Wissendatenbank aufbauen (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Lösungsskripte zum Abschreiben! Finde die richtigen Parameter über `codex --help` heraus und teste die Bash-Tricks selbst in deinem Terminal.

### 🧭 Ein zentrales Rulebook erstellen

#### Übung 1: Die `CONTEXT.md` schreiben
* **Aufgabe:** Lege eine Datei namens `CONTEXT.md` im Hauptverzeichnis deines Projekts an. Schreibe drei harte Architektur-Regeln für dein Rust-Projekt hinein (z.B. "1. Nutze immer `Result` statt `unwrap()`. 2. ...").
* **Hinweis:** Formuliere die Regeln so präzise und unmissverständlich wie möglich, als würdest du einen neuen Mitarbeiter einarbeiten.

#### Übung 2: Die Regeln injizieren
* **Aufgabe:** Starte einen Codex-Befehl aus der Shell, bei dem du ein kurzes Code-Review anforderst. Zwinge Codex im selben Befehl dazu, deine `CONTEXT.md` zu lesen und als Maßstab zu verwenden.
* **Hinweis:** Nutze grundlegende Bash-Tricks (z.B. die Übergabe über den `cat`-Befehl und eine Pipe `|`). Wie verhinderst du, dass Codex die Regeln umschreibt, anstatt sie nur zu lesen?

#### Übung 3: Compliance-Check provozieren
* **Aufgabe:** Schreibe absichtlich fehlerhaften Code in einer Datei, der massiv gegen deine Regeln aus Übung 1 verstößt. Lass Codex den Code überprüfen.
* **Hinweis:** Wie stellst du im Prompt sicher, dass Codex nicht nur nach Syntax-Fehlern sucht, sondern den Code explizit *gegen* dein Rulebook validiert?

### 🛡️ Dauerhaftes Setup & Aliase

#### Übung 4: Einen Bash-Alias anlegen
* **Aufgabe:** Es ist extrem mühsam, bei jeder Abfrage den Kontext manuell einzuspeisen. Lege in deiner `.bashrc` (oder `.zshrc`) einen Alias oder eine Funktion namens `codex-projekt` an, der das Rulebook automatisch lädt.
* **Hinweis:** Wie definiert man in Bash eine kleine Shell-Funktion, die Argumente (den Rest deines Prompts) annehmen und weitergeben kann?

#### Übung 5: Modulares Wissen zusammenführen
* **Aufgabe:** Du hast deine Projektregeln in verschiedene Dateien aufgeteilt (z.B. `docs/style.md` und `docs/db.md`). Wie übergibst du *beide* Dateien gleichzeitig sauber an Codex CLI?
* **Hinweis:** Recherchiere, wie du den Befehl `cat` in Linux so nutzt, dass er den Inhalt mehrerer Dateien hintereinander ausgibt.

#### Übung 6: Projektweite Einstellungen finden
* **Aufgabe:** Finde heraus, ob Codex CLI eine versteckte projektspezifische Konfigurationsdatei (z.B. `.codexrc`) unterstützt, in der du System-Prompts ordnergebunden hinterlegen kannst.
* **Hinweis:** Lies die Hilfe (`codex --help`) oder navigiere in das interaktive `/config` Menü und suche nach Begriffen wie "System Prompt" oder "Default Context".

### 🔄 Komplexe Wissens-Workflows

#### Übung 7: Der Onboarding-Workflow
* **Aufgabe:** Stell dir vor, ein Kollege muss sich in dein Projekt einarbeiten. Lass Codex den Code im `src/` Verzeichnis sowie die `CONTEXT.md` analysieren und eine verständliche "Onboarding-Zusammenfassung" im Terminal ausgeben.
* **Hinweis:** Welche Bash-Werkzeuge (z.B. Platzhalter wie `src/*.rs`) kannst du nutzen, um den Quellcode gesammelt an Codex zu übergeben, ohne jede Datei einzeln tippen zu müssen?

#### Übung 8: Die README aus dem Wissen aktualisieren
* **Aufgabe:** Deine `README.md` ist veraltet. Beauftrage Codex damit, dein aktuelles Rulebook (`CONTEXT.md`) zu lesen und basierend darauf den Abschnitt "Contributing" in der `README.md` neu zu formulieren.
* **Hinweis:** Wie stellst du sicher, dass Codex nur diesen einen Abschnitt bewertet und nicht den gesamten Aufbau der Readme zerstört?

#### Übung 9: Wissens-Refactoring
* **Aufgabe:** Deine `CONTEXT.md` ist nach einigen Monaten zu lang und unübersichtlich geworden. Nutze Codex, um sie zu strukturieren.
* **Hinweis:** Übergib die Datei an Codex und fordere: "Gruppiere diese Projekt-Regeln logisch nach Themen, formatiere sie als saubere Markdown-Listen und entferne Redundanzen."
