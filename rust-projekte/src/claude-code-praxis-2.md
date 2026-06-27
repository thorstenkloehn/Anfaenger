# 🐚 Claude Code – Praxis & Fortgeschrittene (Teil 2)

*Tiefergehende Workflows, Agent Memory, MCP und CI/CD-Integration für Profis.*

---

In dieser Lektion heben wir unsere Arbeit mit **Claude Code** auf das nächste Level. Nachdem du in Teil 1 die Grundlagen und Cargo-Integration gemeistert hast, geht es nun um den Einsatz in komplexen, automatisierten Umgebungen.

Wir behandeln **Agent Memory** (Langzeitgedächtnis), **Custom Tools über MCP (Model Context Protocol)**, fortgeschrittene **Permission Modes** (Rechtemanagement) und die Integration in **CI/CD-Pipelines**.

> [!IMPORTANT]
> **Erinnerung:** Auch hier gibt es keine fertigen Code-Blöcke zum Kopieren! Nutze die Aufgaben als Denkanstöße, um die CLI selbst zu erkunden.

---

## 🚀 Übungen: Fortgeschrittene & Profis (51–80)

### 🟣 Agent Memory & Langzeitgedächtnis (51–56)

#### Übung 51: Memory initialisieren
* **Aufgabe:** Wie bringst du Claude Code dazu, sich an spezifische Architektur-Entscheidungen aus deiner aktuellen Session für zukünftige Sessions zu erinnern?
* **Lösung:** Recherchiere, wie du den Agenten anweist, eine Information in sein Memory zu speichern. (Tipp: Frage Claude direkt nach "Wie speicherst du Informationen permanent?").

#### Übung 52: Gespeicherten Kontext abfragen
* **Aufgabe:** Du startest eine neue Session. Wie prüfst du, welche Projekt-Konventionen Claude bereits in seinem Gedächtnis hat?
* **Lösung:** Welchen Befehl oder Prompt nutzt du, um den Memory-Status anzeigen zu lassen?

#### Übung 53: Falsches Memory korrigieren
* **Aufgabe:** Der Agent erinnert sich an eine veraltete Cargo-Version. Wie löschst oder aktualisierst du diesen spezifischen Memory-Eintrag?
* **Lösung:** Überlege, wie du den Agenten instruierst, alte Gedächtnis-Einträge gezielt zu überschreiben.

#### Übung 54: Projekt-spezifisches vs. Globales Memory
* **Aufgabe:** Du willst, dass Claude sich an deinen bevorzugten Rust-Stil in *allen* Projekten erinnert. Wie erreichst du das?
* **Lösung:** Gibt es globale Konfigurationen im Vergleich zu projektbezogenen Speichern? Finde heraus, wo Claude Code dies verwaltet.

#### Übung 55: Memory-Limitierung
* **Aufgabe:** Was passiert, wenn das Gedächtnis zu voll wird? Wie kannst du irrelevante alte Informationen bereinigen, um Token zu sparen?
* **Lösung:** Welchen Slash-Befehl oder CLI-Argument könnte es geben, um das Memory zu "prunen" (aufzuräumen)?

#### Übung 56: Kontext-Dateien einbinden
* **Aufgabe:** Statt Memory manuell zu trainieren, möchtest du eine `CONTEXT.md` fest als Basis-Wissen verankern.
* **Lösung:** Wie übergibst du eine spezifische Datei bei jedem Start automatisch als System-Prompt? (Tipp: Sieh dir CLI-Parameter für System-Prompts an).

---

### 🛡️ Permission Modes & Sicherheit (57–62)

#### Übung 57: Isolierte Ausführung
* **Aufgabe:** Du arbeitest an einem unbekannten Repository. Wie startest du Claude Code so, dass es auf keinen Fall das Dateisystem außerhalb des aktuellen Ordners lesen kann?
* **Lösung:** Welche Flag oder welcher Sandbox-Modus verhindert Verzeichnisausbrüche?

#### Übung 58: Auto-Approve für bestimmte Befehle
* **Aufgabe:** Du bist es leid, `cargo check` jedes Mal manuell zu bestätigen. Wie konfigurierst du Claude Code so, dass Lese- und Build-Befehle ohne Nachfrage laufen, aber Git-Commits noch bestätigt werden müssen?
* **Lösung:** Erkunde die `/config` nach Berechtigungsstufen (z.B. "allowlist" für bestimmte Befehle).

#### Übung 59: Sensible Umgebungsvariablen verbergen
* **Aufgabe:** Wie verhinderst du, dass Claude Code während eines Debuggings versehentlich deine `.env`-Datei liest und API-Keys im Chatverlauf landen?
* **Lösung:** Erinnere dich an die `.claudeignore` aus Teil 1. Gilt dies auch für versteckte Dateien und Ordner?

#### Übung 60: Netzwerk-Zugriff blockieren
* **Aufgabe:** Du willst nicht, dass Claude Code selbstständig `curl`-Befehle ausführt, um Code nachzuladen. Wie verbietest du den Netzwerkzugriff auf Shell-Ebene?
* **Lösung:** Kann dies über Permissions konfiguriert werden, oder musst du den Agenten in einer speziellen Umgebung (z.B. Offline-Docker-Container) starten?

#### Übung 61: Audit-Logs prüfen
* **Aufgabe:** Du möchtest im Nachhinein nachvollziehen, welche Bash-Befehle Claude Code gestern ausgeführt hat. Wo findest du diese Logs?
* **Lösung:** Suche im lokalen Konfigurationsverzeichnis des Tools nach Log- oder Verlaufs-Dateien.

#### Übung 62: Temporärer Read-Only Modus
* **Aufgabe:** Mitten in der Session willst du dem Agenten temporär Schreibrechte entziehen, während er sensiblen Code analysiert. Geht das?
* **Lösung:** Welchen Slash-Befehl oder Konfigurationswechsel nutzt du on-the-fly, um die Modus-Rechte zu ändern?

---

### 🔌 Custom Tools & MCP (Model Context Protocol) (63–68)

#### Übung 63: Was ist MCP?
* **Aufgabe:** Finde heraus, wie das Model Context Protocol (MCP) funktioniert. Wie erweitert es die Fähigkeiten von Claude Code?
* **Lösung:** Recherchiere das Konzept: MCP erlaubt es, lokale APIs und Datenbanken als "Tools" für den Agenten bereitzustellen.

#### Übung 64: Ein lokales Bash-Tool registrieren
* **Aufgabe:** Du hast ein Skript `deploy.sh`. Wie machst du dieses Skript für Claude Code als aufrufbares "Tool" verfügbar?
* **Lösung:** Wie sieht eine typische Tool-Definition in der MCP-Konfiguration (oft in JSON) aus?

#### Übung 65: Datenbankzugriff gewähren
* **Aufgabe:** Du möchtest, dass Claude SQL-Queries gegen eine lokale SQLite-Datenbank ausführen kann, um Bug-Reports zu verifizieren.
* **Lösung:** Wie richtest du einen MCP-Server für SQLite ein und verbindest ihn mit der Claude-CLI?

#### Übung 66: Eigene Rust-Tools für Claude schreiben
* **Aufgabe:** Wie kannst du ein kleines Rust-Programm schreiben, das über Stdin/Stdout als MCP-Tool fungiert?
* **Lösung:** Erkunde das MCP-SDK. Welche Schnittstellen müssen für das JSON-RPC-basierte Protokoll implementiert werden?

#### Übung 67: Tools mit Parametern
* **Aufgabe:** Dein Tool benötigt spezifische Parameter (z.B. eine Issue-ID). Wie weiß Claude, welche Argumente es übergeben muss?
* **Lösung:** Stichwort JSON-Schema. Wie beschreibst du die Eingabeparameter in der Tool-Registrierung exakt?

#### Übung 68: Fehlerbehandlung in Custom Tools
* **Aufgabe:** Was passiert, wenn dein registriertes Tool abstürzt? Wie stellst du sicher, dass Claude Code dies erkennt und selbstständig korrigiert?
* **Lösung:** Das Tool muss strukturierte Fehlermeldungen über das Protokoll zurückgeben, die der Agent interpretieren kann.

---

### ⚙️ CI/CD & Automatisierung (69–74)

#### Übung 69: Headless-Modus (Non-Interactive)
* **Aufgabe:** Du möchtest Claude Code in einem GitHub Actions Workflow laufen lassen. Wie verhinderst du, dass das Tool auf Nutzereingaben wartet?
* **Lösung:** Finde die passenden Argumente (wie z.B. `--non-interactive`), um den Agenten zu zwingen, ohne Interaktion durchzulaufen.

#### Übung 70: Automatisiertes Code-Review
* **Aufgabe:** Ein Pull Request wird erstellt. Wie konfigurierst du deine CI so, dass Claude Code das Diff analysiert und einen Review-Kommentar hinterlässt?
* **Lösung:** Kombiniere das Piped-Diff (`git diff`) mit der Claude CLI und leite die Ausgabe in einen GitHub-Kommentar-Schritt weiter.

#### Übung 71: Automatischer Bugfix-Versuch im Branch
* **Aufgabe:** Wenn ein Test in der CI fehlschlägt, soll Claude versuchen, den Fehler zu beheben und einen neuen Commit in denselben Branch zu pushen.
* **Lösung:** Wie verknüpfst du den Fehler-Exit-Code der Testsuite mit dem Startkommando und einem spezifischen Prompt für Claude?

#### Übung 72: CI-Kostenlimit setzen
* **Aufgabe:** Du hast Angst vor explodierenden API-Kosten durch Endlos-Schleifen in der CI. Wie sicherst du das ab?
* **Lösung:** Überprüfe, ob es Sicherheitslimits oder `--max-cost`-Argumente für CLI-Aufrufe gibt, um nach einem festen Budget hart abzubrechen.

#### Übung 73: Reports generieren
* **Aufgabe:** Claude soll nachts die Codebase analysieren und einen Status-Report als Markdown ablegen.
* **Lösung:** Richte einen Cron-Job oder einen Scheduled Workflow ein, der Claude headless mit einem Prompt zur Analyse aufruft.

#### Übung 74: Umgebungsvariablen für CI-Authentifizierung
* **Aufgabe:** In der CI hast du keinen Browser, um dich via OAuth einzuloggen. Wie authentifizierst du Claude Code?
* **Lösung:** Welches API-Key-Environment-Flag (z.B. `ANTHROPIC_API_KEY`) ist zwingend erforderlich, damit der Agent headless funktioniert?

---

### 🧩 Komplexe Workflows & Git (75–80)

#### Übung 75: Git Bisect mit Claude Code
* **Aufgabe:** Ein Bug wurde irgendwo in den letzten 50 Commits eingeführt. Wie nutzt du `git bisect` in Kombination mit Claude Code, um den Schuldigen Commit automatisch zu finden und den Fehler zu erklären?
* **Lösung:** Erkläre den Workflow, bei dem das Ergebnis von `git bisect run <script>` analysiert und in einen Claude-Prompt übergeben wird.

#### Übung 76: Projekt-Refactoring in Etappen
* **Aufgabe:** Ein riesiges Refactoring übersteigt das Kontext-Fenster. Wie zwingst du Claude, in isolierten Etappen (Modul für Modul) vorzugehen?
* **Lösung:** Schreibe einen Plan (z.B. ein Bash-Skript), das eine Liste von Modulen in einer Schleife abarbeitet und Claude für jedes Modul separat aufruft.

#### Übung 77: Cross-Language Migration
* **Aufgabe:** Du willst ein Python-Skript nach Rust portieren. Wie organisierst du die Ein- und Ausgabe so, dass Claude beides testen kann?
* **Lösung:** Welchen Prompt brauchst du, damit Claude beide Tools (`python` und `cargo run`) aufruft, die Ergebnisse direkt vergleicht und korrigiert?

#### Übung 78: Multi-Agenten Setup
* **Aufgabe:** Du möchtest einen Agenten für das Schreiben von Tests (Read-Only auf `src/`, Write auf `tests/`) und einen anderen für die Implementierung der Logik. Wie steuerst du das im Terminal?
* **Lösung:** Überlege, wie du zwei separate Terminal-Sitzungen öffnest und die Agenten iterativ arbeiten lässt.

#### Übung 79: Eigene CLI-Befehle parsen
* **Aufgabe:** Du baust ein eigenes Rust-CLI-Tool. Wie lässt du Claude testen, ob die Hilfeausgabe (`--help`) deines Tools verständlich ist?
* **Lösung:** Führe `cargo run -- --help` aus, leite die Ausgabe über Pipe (`|`) an Claude weiter und bitte um ein Review aus Sicht eines Anfängers.

#### Übung 80: Autonomes Schreiben eines Buchkapitels
* **Aufgabe:** Wie weist du Claude Code an, den gesamten neuen Rust-Code zu analysieren, ein mdBook-Kapitel darüber zu verfassen und es selbstständig in die `SUMMARY.md` einzutragen?
* **Lösung:** Formuliere einen umfassenden, verketteten Prompt, der den Lesezugriff, das Schreiben der Datei, das Aktualisieren des Inhaltsverzeichnisses und den anschließenden Build-Test (`mdbook build`) kombiniert.
