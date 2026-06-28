# 💻 Codex CLI – Automatisieren

*Wie du den Codex Agenten von OpenAI in Bash-Skripte einbindest, um wiederkehrende Entwicklungsaufgaben zu automatisieren.*

---

## 🧠 Theorie: "Alle wissen" bei der Automatisierung

Wenn du Codex CLI als interaktiven Chat nutzt, kannst du den Kontext manuell steuern und bei Fehlern direkt eingreifen. Wenn du Codex jedoch in **Bash-Skripten, CI/CD-Pipelines oder Git-Hooks** verwendest, muss alles vollautomatisch laufen. Damit der Agent "alles weiß", ohne hängen zu bleiben, sind drei Dinge essenziell:

* **Strikter Input (Piping):** Du fütterst Codex über die Standardeingabe exakt mit den Daten, die er braucht (z.B. den formatierten Output von `cargo clippy`), anstatt ihn ziellos das ganze Projekt scannen zu lassen.
* **Unterdrückte Bestätigungen:** Ein Shell-Skript bleibt stehen, wenn Codex fragt "Darf ich diese Datei ändern (Y/N)?". Du musst lernen, Sicherheitsabfragen gezielt zu umgehen, wenn du die Kontrolle an das Skript abgibst.
* **Vorhersehbarer Output:** Wenn dein Skript den Output von Codex weiterverarbeitet, darf die KI keinen konversationellen Text ("Hallo, hier ist dein Ergebnis...") ausgeben, sondern ausschließlich den reinen Quellcode oder das strukturierte JSON.

## ⚙️ Einstellungen & Setup

Um die Codex CLI fit für die Skript-Automatisierung zu machen, brauchst du spezielle Start-Parameter:
* **Auto-Approve Flags:** Suche nach Flags (wie `-y` oder `--yes`), die dem Tool sagen, dass alle Datei-Änderungen automatisch abgenickt werden dürfen.
* **Quiet Mode:** Oft gibt es Flags wie `-q` oder `--quiet`, um interne Log-Ausgaben und bunte Ladebalken abzustellen, die in CI/CD-Logs für Unordnung sorgen.
* **Authentifizierung:** Stelle sicher, dass die Authentifizierung über eine System-Umgebungsvariable (meist `OPENAI_API_KEY`) gesteuert wird, da im Headless-Modus kein Browser-Login aufploppen kann.

---

## 🛠️ Praxis-Übungen: Automatisierungs-Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine vorgefertigten Skripte! Finde die passenden CLI-Parameter durch `codex --help` oder eigenes Ausprobieren heraus.

### 🧭 Steuerung & Kontext in Skripten

#### Übung 1: Den Bestätigungs-Dialog überspringen
* **Aufgabe:** Schreibe einen einfachen Shell-Befehl, der Codex auffordert, alle `// TODO` Kommentare in einer spezifischen Datei zu entfernen, *ohne* dass du die Änderung manuell mit "Y" bestätigen musst.
* **Hinweis:** Welches Kommandozeilenargument deaktiviert den interaktiven Bestätigungs-Modus?

#### Übung 2: Roher Code-Output für Pipelines
* **Aufgabe:** Du willst, dass Codex ein kurzes Rust-Skript generiert. Den Output möchtest du direkt mit dem Umleitungsoperator `>` in eine neue Datei `script.rs` leiten.
* **Hinweis:** Wie formulierst du deinen Prompt extrem restriktiv, sodass Codex *nur* den nackten Quellcode und absolut keinen Erklärungstext oder störende Markdown-Formatierungen (wie ` ```rust `) ausgibt?

#### Übung 3: Linter-Warnungen automatisieren
* **Aufgabe:** Leite den Fehler-Output von `cargo clippy` an Codex weiter und lass ihn eine Markdown-Tabelle der 3 häufigsten Fehlerarten generieren.
* **Hinweis:** Kombiniere `cargo clippy 2>&1` (um den Error-Stream umzuleiten) über eine Pipe (`|`) mit dem Startbefehl von Codex.

### 🛡️ CI/CD & Hintergrund-Jobs

#### Übung 4: Git Pre-Commit Hook einrichten
* **Aufgabe:** Wie baust du theoretisch einen `.git/hooks/pre-commit` Hook, in dem Codex das aktuelle Git-Diff liest und den Commit mit einem Fehlercode (`exit 1`) abbricht, falls versehentlich API-Keys oder Passwörter im Code entdeckt werden?
* **Hinweis:** Recherchiere, wie du den Exit-Code des Codex-CLI-Befehls in Bash abfängst.

#### Übung 5: Automatisiertes Rustdoc-Update
* **Aufgabe:** Du möchtest einen wöchentlichen Cronjob anlegen, der alle neuen Funktionen in deinem Projekt findet und automatisch fehlende Rustdoc-Kommentare (`///`) ergänzt.
* **Hinweis:** Wie stellst du durch den Prompt sicher, dass Codex nur unkommentierte Funktionen bearbeitet und nicht deinen bestehenden Code ungefragt refactored?

#### Übung 6: Auth ohne Browser testen
* **Aufgabe:** Simuliere eine reine Serverumgebung (z.B. einen Docker-Container), in der du keinen Browser öffnen kannst. Wie authentifizierst du Codex CLI?
* **Hinweis:** Prüfe in der Doku, welche System-Umgebungsvariable (z.B. `OPENAI_API_KEY`) von der CLI akzeptiert wird und exportiere sie vor dem Aufruf.

### 🔄 Komplexe Schnittstellen-Automatisierung

#### Übung 7: Bulk-Translation von Log-Dateien
* **Aufgabe:** Du hast eine Textdatei `errors.log` mit dutzenden Zeilen komplexer, englischer Fehlermeldungen. Lass Codex die ganze Datei einlesen und zeilenweise in verständliches Deutsch übersetzen.
* **Hinweis:** Leitest du die Datei über `cat errors.log | codex ...` ein oder übergibst du die Datei als Parameter? Vergleiche beide Ansätze.

#### Übung 8: GitHub Actions Code-Review skizzieren
* **Aufgabe:** Skizziere den grundlegenden Ablauf eines GitHub Actions Workflows, der bei jedem Pull Request die Codex CLI installiert, das Diff analysiert und Verbesserungsvorschläge postet.
* **Hinweis:** Welche Parameter (Non-Interactive, Quiet) braucht Codex zwingend, um in einem CI/CD Runner nicht einzufrieren?

#### Übung 9: JSON-Payloads automatisiert erzeugen
* **Aufgabe:** Nutze Codex, um auf Basis eines komplexen Rust-Structs automatisiert 5 gültige JSON-Testdatensätze zu generieren. Speichere das Ergebnis direkt in `mock_data.json`.
* **Hinweis:** Zwinge Codex dazu, ausschließlich ein validiertes JSON-Array auszugeben. Prüfe danach, ob CLI-Tools wie `jq` die generierte Datei fehlerfrei lesen können, ohne sich an Textresten zu verschlucken.
