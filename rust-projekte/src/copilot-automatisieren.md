# 🐙 GitHub Copilot in VS Code – Automatisieren

*Wie du Copilot nutzt, um wiederkehrende Aufgaben, große Refactorings und Terminal-Befehle automatisch erledigen zu lassen.*

---

## 🧠 Theorie: "Alle wissen" bei der Automatisierung

Ursprünglich war Copilot nur eine Autovervollständigung für einzelne Zeilen. Mittlerweile bietet er Werkzeuge an, um ganze Arbeitsabläufe zu **automatisieren**. Damit das klappt, muss der Kontext ("Alle wissen") noch größer gefasst werden:

* **Copilot Edits (Multi-File):** Anstatt nur Code innerhalb einer Datei vorzuschlagen, kann Copilot nun über mehrere Dateien hinweg Änderungen planen und anwenden. Er muss dafür zwingend wissen, welche Dateien zusammenhängen.
* **Terminal & Befehle:** Mit dem Terminal-Chat in VS Code kannst du Shell-Befehle und Automatisierungs-Skripte generieren lassen, anstatt sie mühsam auswendig zu lernen.
* **CI/CD und Boilerplate:** Copilot ist extrem gut darin, wiederkehrende Strukturen (wie z.B. Konfigurationsdateien für GitHub Actions) oder vollständige Rustdoc-Kommentare auf Basis des bestehenden Codes massenhaft und automatisch zu erzeugen.

## ⚙️ Einstellungen & Setup

Um die Automatisierungstools voll auszuschöpfen, solltest du folgende Einstellungen in VS Code prüfen:
* **Terminal Chat aktivieren:** Stelle sicher, dass du das Copilot-Icon (oft ein kleines Glitzern) in deinem integrierten Terminal (`Ctrl + \``) sehen kannst.
* **Copilot Edits:** Diese Funktion (für dateiübergreifende Bearbeitung) findest du in den neueren VS Code Versionen meist als eigenen Reiter ("Copilot Edits") in der Seitenleiste.
* **GitHub CLI (`gh`):** Für die maximale Automatisierung außerhalb von VS Code kannst du in deiner Shell die offizielle GitHub CLI mit der Copilot-Erweiterung (`gh copilot`) installieren.

---

## 🛠️ Praxis-Übungen: Automatisierungs-Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Skripte oder Lösungs-Codes! Lerne, indem du die Aufgaben selbst in VS Code testest und Copilot die Arbeit machen lässt. Überprüfe die Ergebnisse immer kritisch.

### 🧭 Steuerung & Kontext (Multi-File)

#### Übung 1: Copilot Edits starten
* **Aufgabe:** Du hast ein Struct `User` in einer Datei in `Kunde` umbenannt. Die Änderung bricht nun den Code in zwei anderen Dateien (`main.rs` und `db.rs`). Wie bittest du Copilot Edits, den Namensfehler in *allen* betroffenen Dateien gleichzeitig zu beheben?
* **Hinweis:** Öffne den Bereich "Copilot Edits". Wie fügst du die kaputten Dateien in den "Working Set" Kontext hinzu, bevor du den Prompt absendest?

#### Übung 2: Projektweites Refactoring
* **Aufgabe:** Du willst in deinem gesamten Rust-Projekt von `String` auf `&str` bei Funktionsparametern wechseln, wo es sinnvoll ist.
* **Hinweis:** Nutze den `@workspace` Befehl. Wie formulierst du den Prompt im Chat, damit Copilot dir eine Liste von Datei-Änderungen anbietet, die du anschließend Datei für Datei überprüfen kannst?

### 🛡️ Terminal & CLI-Automatisierung

#### Übung 3: Der Terminal-Chat
* **Aufgabe:** Du weißt nicht auswendig, wie der `cargo`-Befehl lautet, um nur Warnungen auszugeben, ohne das komplette Projekt zu kompilieren (`cargo check` mit bestimmten Flags). Wie fragst du Copilot direkt im integrierten VS Code Terminal?
* **Hinweis:** Klicke auf das kleine Copilot-Icon im Terminal oder drücke `Ctrl+I`, während der Cursor im Terminal ist.

#### Übung 4: Shell-Skripte erklären lassen
* **Aufgabe:** In deinem Projekt liegt ein kryptisches Skript (z.B. `deploy.sh`). Lass dir von Copilot direkt im Terminal genau erklären, was dieser Ablauf automatisiert.
* **Hinweis:** Wie beziehst du dich im Terminal-Chat auf diese spezifische Datei? Funktioniert `#file` hier auch?

#### Übung 5: `gh copilot` ausprobieren
* **Aufgabe:** Falls du die GitHub CLI nutzt: Lass dir in deiner normalen Shell einen komplexen Git-Befehl vorschlagen (z.B. "Wie mache ich den letzten Commit rückgängig, behalte aber die Dateien?").
* **Hinweis:** Recherchiere den Befehl `gh copilot suggest`. Wie interagierst du im Terminal damit?

### 🔄 Komplexe Automatisierungs-Workflows

#### Übung 6: Bulk-Dokumentation (Rustdoc)
* **Aufgabe:** Du hast eine Datei mit 10 unkommentierten Funktionen. Lass Copilot für jede Funktion standardkonforme Rustdoc-Kommentare (`///`) generieren.
* **Hinweis:** Markiere die gesamte Datei (`Ctrl+A`) und öffne den Inline-Chat (`Ctrl+I`). Welchen eingebauten Slash-Befehl nutzt du dafür (z.B. `/doc`)?

#### Übung 7: Massen-Tests generieren
* **Aufgabe:** Du hast ein Modul `math.rs` geschrieben. Anstatt einen Test nach dem anderen manuell zu schreiben, lass Copilot eine komplette Test-Suite generieren.
* **Hinweis:** Öffne den Seitenleisten-Chat, lade `math.rs` mit `#file` in den Kontext und gib eine klare Anweisung: "Generiere 5 Unit-Tests für Randfälle und binde sie als `mod tests` ein".

#### Übung 8: CI/CD Pipeline (GitHub Actions)
* **Aufgabe:** Automatisiere den Testablauf deines Projekts. Beauftrage Copilot im Chat, eine GitHub Actions Datei (`.github/workflows/rust.yml`) zu erstellen, die bei jedem Git Push automatisch `cargo test` ausführt.
* **Hinweis:** Formuliere den Prompt so, dass Copilot dir direkt die vollständige YAML-Datei anbietet. Klicke auf "In Datei einfügen" und überprüfe die Struktur.

#### Übung 9: Boilerplate automatisch befüllen
* **Aufgabe:** Du musst ein neues `struct` für eine API-Antwort anlegen, das 15 verschiedene Felder hat. Du hast nur eine JSON-Beispiel-Antwort aus dem Browser. Wie lässt du Copilot die mühsame Tipparbeit erledigen?
* **Hinweis:** Füge das JSON in den Chat ein (oder in einen großen Kommentar) und fordere Copilot auf: "Erstelle ein Rust-Struct mit `serde::Deserialize` basierend auf diesem JSON-Objekt."
