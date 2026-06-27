# 🛠️ Claude Code Praxis – Teil 1 (Grundlagen & Cargo)

Willkommen im ersten Praxis-Teil zu Claude Code! Hier kannst du dein Wissen aus der Theorie direkt im Terminal anwenden. 

> [!IMPORTANT]
> **Selbsthilfe statt Copy & Paste!**
> In diesem Buch gibt es keine fertigen Lösungsbefehle oder Codelösungen zum blinden Kopieren. Die Übungen geben dir das Ziel vor – die Lösung musst du dir mithilfe der Hinweise und der Claude Code-Hilfe (`/help`) selbst erarbeiten!

---

## 🟢 Block 1: Installation & Erste Schritte (Übungen 1–5)

### Übung 1: Installation überprüfen
* **Ziel:** Stelle sicher, dass Claude Code und Node.js auf deinem System installiert sind.
* **Hinweis:** Du kannst die Versionen von Node.js und npm im Terminal prüfen. Wie lautet der npm-Befehl zur globalen Installation eines Pakets (hier `@anthropic-ai/claude-code`)?

### Übung 2: Authentifizierung durchführen
* **Ziel:** Logge dich in deinen Anthropic-Account ein, um Claude Code nutzen zu können.
* **Hinweis:** Starte den Basisbefehl für Claude Code im Terminal. Es sollte sich ein Browser-Fenster öffnen oder ein Link angezeigt werden.

### Übung 3: Projektkontext initialisieren
* **Ziel:** Starte Claude Code in deinem Rust-Projektordner (`rust-projekte`), sodass die KI den Kontext versteht.
* **Hinweis:** Navigiere im Terminal zuerst in den richtigen Ordner, bevor du Claude aufrufst. Teste, ob Claude weiß, in welchem Verzeichnis er sich befindet.

### Übung 4: Die Hilfe-Funktion aufrufen
* **Ziel:** Finde heraus, welche internen Befehle (Slash Commands) Claude Code unterstützt.
* **Hinweis:** Wenn du in der interaktiven Session bist, beginnen spezielle Befehle immer mit einem Schrägstrich. Probier es mal mit dem englischen Wort für "Hilfe".

### Übung 5: Claude Code beenden
* **Ziel:** Verlasse die interaktive Session und kehre zu deiner normalen Terminal-Eingabe zurück.
* **Hinweis:** Auch hierfür gibt es einen Slash-Befehl (denke an das englische Wort für "Ausgang"). Alternativ klappt auch eine bekannte Tastenkombination wie `Ctrl+C` oder `Ctrl+D`.

---

## 🟡 Block 2: Basis-Kommandos & Slash-Befehle (Übungen 6–15)

### Übung 6: Ein direktes Kommando absetzen
* **Ziel:** Stelle Claude eine Frage zu deinem Projekt, ohne in den interaktiven Modus zu wechseln.
* **Hinweis:** Du kannst dem Startbefehl von Claude Code einen Text in Anführungszeichen direkt mitgeben. Manchmal nutzt man dafür auch den Parameter `-p` (für Prompt).

### Übung 7: Den Chatverlauf leeren
* **Ziel:** Starte innerhalb deiner Session ein komplett neues Thema, ohne alte Informationen mitzuschleppen.
* **Hinweis:** Suche in der `/help`-Übersicht nach einem Befehl, der den Bildschirm oder Verlauf "säubert" (Clear).

### Übung 8: Kostenkontrolle
* **Ziel:** Finde heraus, wie viele Tokens du in der aktuellen Sitzung verbraucht hast und was das kostet.
* **Hinweis:** Das englische Wort für Kosten ist ein guter Tipp für den passenden Slash-Befehl.

### Übung 9: Token-Kontext komprimieren
* **Ziel:** Deine Unterhaltung ist sehr lang geworden. Komprimiere den Kontext, um Tokens zu sparen, ohne die Kerninformationen zu verlieren.
* **Hinweis:** Es gibt einen Slash-Befehl, der so ähnlich klingt wie das englische Wort "compact".

### Übung 10: Letzte Änderungen anzeigen
* **Ziel:** Claude hat gerade an deinen Dateien gearbeitet. Lass dir eine Übersicht (Diff) der Änderungen anzeigen.
* **Hinweis:** Entwickler nennen den Unterschied zwischen zwei Dateiversionen "Diff". Welcher Slash-Befehl könnte das sein?

### Übung 11: Konfiguration prüfen
* **Ziel:** Lass dir anzeigen, welches KI-Modell (z.B. Claude 3.5 Sonnet) aktuell verwendet wird.
* **Hinweis:** Suche nach einem Slash-Befehl für die "Config" oder Konfiguration.

### Übung 12: Modell wechseln
* **Ziel:** Ändere das verwendete Modell für die aktuelle Session testweise auf ein schnelleres oder günstigeres Modell (z.B. Haiku).
* **Hinweis:** Schau in der Hilfe nach, ob es einen Befehl für Modelle (`/model`) gibt.

### Übung 13: Read-Only Modus testen
* **Ziel:** Starte Claude Code so, dass er Dateien nur lesen, aber auf keinen Fall verändern darf (Sicherheitsmodus).
* **Hinweis:** Wenn du Claude aus dem Terminal startest, gibt es dafür einen speziellen Start-Parameter (Flag). Denke an das englische "read-only".

### Übung 14: Theme anpassen
* **Ziel:** Wechsle die Farbe deines Claude Code Terminals auf "light" oder "dark".
* **Hinweis:** Solche Einstellungen kannst du im interaktiven Konfigurationsmenü vornehmen.

### Übung 15: Letzten Terminal-Befehl wiederholen
* **Ziel:** Claude schlägt dir die Ausführung eines Terminal-Befehls vor. Wie bestätigst du ihn am schnellsten?
* **Hinweis:** Meistens reicht es, einfach "y" (für yes) einzugeben oder direkt die Eingabetaste (Enter) zu drücken.

---

## 🟠 Block 3: Sessions & Kontext (Übungen 16–20)

### Übung 16: Ordner ignorieren
* **Ziel:** Verhindere, dass Claude Code versehentlich in sensible Ordner (z.B. `.env`-Dateien oder bestimmte Build-Verzeichnisse) schaut.
* **Hinweis:** Wie bei Git (`.gitignore`) gibt es auch für Claude eine spezielle Datei, die du im Hauptverzeichnis anlegen kannst (`.claudeignore`).

### Übung 17: Spezifische Dateien fokussieren
* **Ziel:** Zwinge Claude dazu, sich nur auf EINE bestimmte Datei in `src/` zu konzentrieren.
* **Hinweis:** Formuliere deinen Prompt ganz exakt. Nenne den genauen Dateipfad und verbiete Änderungen an anderen Dateien.

### Übung 18: Hintergrund-Tasks starten
* **Ziel:** Lass Claude eine zeitaufwändige Analyse durchführen, während du weiter im Terminal arbeiten kannst.
* **Hinweis:** Finde in den aktuellen Docs heraus, ob es ein Flag oder einen Befehl gibt, der Aufgaben in den Hintergrund (Background) schiebt.

### Übung 19: Session wieder aufnehmen
* **Ziel:** Du hast das Terminal gestern geschlossen. Nimm die exakt selbe Unterhaltung von gestern heute wieder auf.
* **Hinweis:** Claude Code speichert Historien. Schau nach Startparametern wie `--continue` in der Dokumentation.

### Übung 20: Projekt-Onboarding durch die KI
* **Ziel:** Lass dir von Claude Code als Erstes die Architektur des aktuellen Projekts anhand der `Cargo.toml` und `src/main.rs` erklären.
* **Hinweis:** Beschreibe im Prompt genau, welche zwei Dateien er lesen soll, und frag nach einer einfachen Zusammenfassung.

---

## 🔵 Block 4: File Edits & Refactoring (Übungen 21–25)

### Übung 21: Neue Datei erstellen lassen
* **Ziel:** Lass Claude Code eine neue Datei `src/math.rs` mit einer einfachen Additions-Funktion anlegen.
* **Hinweis:** Du musst den genauen Pfad nennen. Überprüfe anschließend das von Claude vorgeschlagene Diff, bevor du zustimmst.

### Übung 22: Modul-Einbindung (Refactoring)
* **Ziel:** Claude hat `math.rs` erstellt. Nun soll er dieses Modul in `main.rs` einbinden und die Additions-Funktion aufrufen.
* **Hinweis:** Wie importiert man in Rust Module? Lass Claude das übernehmen: "Binde das Modul X in Y ein und..."

### Übung 23: Dokumentation generieren
* **Ziel:** Claude soll für alle Funktionen in `src/math.rs` Rust-Dokumentationskommentare (`///`) schreiben.
* **Hinweis:** Sag Claude, er soll sich an den offiziellen Rust-Standard für Doc-Comments halten.

### Übung 24: Variablen umbenennen (Projektweit)
* **Ziel:** Lass eine Variable in deinem Code durch Claude umbenennen, sodass sie in allen betroffenen Dateien automatisch aktualisiert wird.
* **Hinweis:** Achte darauf, dass Claude das gesamte Projekt scannt, damit keine Aufrufe übersehen werden.

### Übung 25: Interaktives Diff ablehnen
* **Ziel:** Claude schlägt eine Änderung vor, die dir nicht gefällt. Lehne sie ab und gib ihm direkt Feedback, was er stattdessen tun soll.
* **Hinweis:** Anstatt einfach "n" (Nein) zu drücken, kannst du oft direkt einen Text tippen, um deinen Änderungswunsch zu äußern.

---

## 🟣 Block 5: Basis-Fehlerbehebung mit Cargo (Übungen 26–30)

### Übung 26: Syntaxfehler provozieren und beheben
* **Ziel:** Lösche in `main.rs` absichtlich ein Semikolon `;` am Ende einer Zeile. Lass Claude Code den Fehler finden und korrigieren.
* **Hinweis:** Weise Claude an: "Führe `cargo check` aus und behebe den Fehler".

### Übung 27: Clippy-Warnungen auflösen
* **Ziel:** Fordere Claude auf, das Projekt nach idiomatischem Rust-Standard zu überprüfen und Verbesserungsvorschläge direkt einzuarbeiten.
* **Hinweis:** Welches Cargo-Tool überprüft den Code auf Best Practices? Richtig, Clippy! Sag Claude: "Lass `cargo clippy` laufen und behebe Warnungen."

### Übung 28: Test-getriebenes Reparieren (TDD)
* **Ziel:** Schreibe einen simplen Test, der fehlschlägt (z.B. `assert_eq!(1+1, 3);`). Lass Claude solange an der Logik schrauben, bis der Test grün wird.
* **Hinweis:** "Führe `cargo test` aus. Repariere den Code, bis die Tests erfolgreich sind."

### Übung 29: Unnötige Abhängigkeiten aufspüren
* **Ziel:** Finde heraus, ob in deiner `Cargo.toml` Crates stehen, die im Rust-Code gar nicht verwendet werden.
* **Hinweis:** Lass Claude Code das Projekt analysieren: "Gibt es Abhängigkeiten in Cargo.toml, die wir in .rs-Dateien nicht importieren?"

### Übung 30: Code-Formatierung erzwingen
* **Ziel:** Bringe Claude Code dazu, nach jeder Dateibearbeitung immer den Rust-Standard-Formatter über das Projekt laufen zu lassen.
* **Hinweis:** Rust hat ein eingebautes Tool zur Formatierung (`cargo fmt`). Du kannst das als Zusatzanweisung in deinen Prompt aufnehmen.

---

> [!TIP]
> **Tipp für Fortgeschrittene:** 
> Wenn du möchtest, dass Claude Code bei jedem Start automatisch auf Cargo-Standards (fmt, clippy, test) achtet, kannst du diese Regeln später in einer zentralen `CLAUDE.md`-Datei im Projekt festhalten!
