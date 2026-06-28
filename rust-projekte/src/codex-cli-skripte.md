# 💻 Codex CLI – Skripte & App-Steuerung

*Wie du Codex und reine Linux-Pipes nutzt, um Automatisierungs-Skripte für andere Anwendungen zu entwerfen, und wie du dabei fehleranfälligen UI-Pfusch durch echte "bessere Lösungen" ersetzt.*

---

## 🧠 Theorie: "Alle wissen" live per Pipe an Skripte übergeben

Um ein absolut robustes Automatisierungs-Skript für Dritt-Tools wie Git, Docker oder Bildbearbeitungs-Software zu schreiben, braucht die KI das exakte, aktuelle Systemwissen ("Alle wissen"). Da die Codex CLI ein reines Terminal-Werkzeug ohne eigene Systemrechte ist, lieferst du ihr diesen Kontext am besten *live* über Standard-Bash-Pipes:

* **Hilfetexte als Futter:** Anstatt blind ein ungetestetes Skript zu fordern, leitest du den nativen Hilfetext des Ziel-Programms direkt in Codex um (z.B. `docker run --help | codex "Schreibe ein Skript..."`). So zwingst du Codex, die aktuellsten Parameter deines lokalen Systems zu nutzen.
* **Output-Ketten (Self-Healing):** Wenn ein von Codex generiertes Skript beim Testen abstürzt, kopierst du den Fehler nicht mühsam mit der Maus. Du "pipest" den Error-Kanal (`2>&1`) direkt im Terminal zurück an Codex, um das Skript automatisch analysieren zu lassen.
* **Der Weg zur "besseren Lösung":** Skripte, die simulierte Mausklicks auf Bildschirmen ausführen (z.B. Web-Scraper oder `xdotool`), sind extrem fehleranfällig. Der wahre CLI-Workflow bedeutet, Codex im Prompt hart zu zwingen: "Schreibe kein UI-Skript! Finde eine 'bessere Lösung' über versteckte REST-APIs, direkte Manipulation von Konfigurationsdateien oder native CLI-Befehle."

## ⚙️ Einstellungen & Setup

Um lauffähige Skripte effizient und direkt mit Codex zu generieren, musst du die Parameter der CLI meistern:
* **Raw-Modus (Code Only):** Damit du den Output von Codex direkt als ausführbare Datei abspeichern kannst (`> script.sh`), musst du Codex anweisen, absolut keinen Konversations-Text ("Gerne, hier ist dein Skript:") und keine Markdown-Blöcke (````bash`) auszugeben. Finde in der `codex --help` den passenden Schalter (oft `--quiet`, `-q`, `--raw` oder `--code-only`).
* **Ausführungsrechte:** Generierte Dateien sind auf Linux nicht automatisch ausführbar. Du musst im Terminal manuell Rechte vergeben (`chmod +x script.sh`), bevor du testest.
* **Sichere Sandbox-Ordner:** Teste von KI generierte Bash-Skripte zur Sicherheit *niemals* direkt in deinem Root- oder Produktions-Workspace. Nutze das Terminal, um Wegwerf-Ordner (wie `/tmp/test-ordner`) anzulegen.

---

## 🛠️ Praxis-Übungen: Skripte & Automatisierung (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Bash-Befehle zum stumpfen Kopieren! Nutze dein Wissen über Linux-Pipes und finde die exakten `codex`-Parameter selbst über die Hilfe heraus.

### 🧭 Grundlagen: Reine Shell-Generierung

#### Übung 1: Das Git-Helfer-Skript über Raw-Output
* **Aufgabe:** Nutze Codex, um ein Skript `git-sync.sh` zu generieren, das alle Änderungen hinzufügt, committet und pusht. Leite den Output direkt im Terminal in die Datei um (z.B. `codex -q "Schreibe..." > git-sync.sh`).
* **Hinweis:** Überprüfe die erstellte Datei sofort mit dem Befehl `cat`. Sind dort störende Begrüßungsfloskeln der KI drin? Wenn ja, passe deinen Codex-Parameter an, damit 100 % purer Code ausgegeben wird!

#### Übung 2: Live-Kontext über Pipes injizieren
* **Aufgabe:** Du willst ein Skript zur Videokompression bauen, kennst aber das extrem komplexe Tool `ffmpeg` nicht.
* **Hinweis:** Kombiniere den Hilfetext intelligent per Pipe mit deinem Prompt: `ffmpeg --help | codex -q "Lies diese Hilfe. Schreibe ein kompaktes Skript, das alle .mp4 Dateien im Ordner stark verkleinert" > compress.sh`.

#### Übung 3: Fehlersuche (Piping Errors directly)
* **Aufgabe:** Dein generiertes Shell-Skript `skript.sh` stürzt mit einem Syntax-Fehler ab.
* **Hinweis:** Anstatt den Text zu lesen, lass Codex die Arbeit machen. Führe das Skript aus und leite den Fehler direkt um: `./skript.sh 2>&1 | codex "Analysiere diesen Fehler und schreibe mir exakt die korrigierte Zeile auf."`

### 🛡️ App-Steuerung und "Bessere Lösungen"

#### Übung 4: API statt UI (Die Bessere Lösung fordern)
* **Aufgabe:** Du brauchst Wetterdaten. Frag Codex im Terminal: "Schreibe ein Python-Skript, das auf eine Wetterseite surft, das HTML lädt und den Text ausliest."
* **Hinweis (Der Architektur-Zwang):** Brich den ersten Versuch sofort ab und schicke einen neuen, viel strikteren Befehl: "HTML-Scraping ist extrem fehleranfällig! Finde eine 'bessere Lösung' (z.B. die öffentliche Open-Meteo REST-API) und schreibe das Skript stattdessen dafür. Nutze robuste Tools wie `curl` und `jq`."

#### Übung 5: Rust-Wrapper für System-Tools
* **Aufgabe:** Du willst Docker in Zukunft über eine eigene CLI steuern. Bitte Codex: "Schreibe eine `main.rs`, die über das `std::process::Command` Modul alle Docker-Container im System abfragt, auflistet und mich per Terminal-Input fragt, welchen ich sofort stoppen will."
* **Hinweis:** Leite den generierten Code im Raw-Modus direkt in dein `src/main.rs` um und versuche, es blind mit `cargo run` zu starten.

#### Übung 6: Robuste Konfigurations-Manipulation
* **Aufgabe:** Anstatt in unübersichtlichen Konfigurations-Guis herumzuklicken, willst du Theme-Einstellungen per CLI-Skript ändern.
* **Hinweis:** Übergib Codex deine `settings.json` über `cat` und fordere: "Schreibe ein Bash-Skript, das exakt das CLI-Tool `jq` nutzt, um den Wert 'theme' in dieser Datei auf 'dark' zu setzen, *ohne* dabei die JSON-Formatierung der Rest-Datei zu brechen."

### 🔄 Komplexe Workflows & Meta-Skripte

#### Übung 7: Hintergrund-Dienste generieren (Systemd)
* **Aufgabe:** Du hast ein fantastisches Backup-Skript im Ordner. Es soll nun dauerhaft und unsichtbar laufen.
* **Hinweis:** Bitte Codex direkt über die CLI: "Generiere mir den reinen Code für eine Systemd-Service-Datei (`backup.service`), die mein Skript `/opt/backup.sh` jeden Freitag vollautomatisch startet." Leite den Output direkt nach `/tmp/backup.service` um.

#### Übung 8: Skripte, die Code schreiben (Bootstrapping)
* **Aufgabe:** Lass Codex ein Meta-Skript erzeugen, das dir gigantische Projekte aufbaut.
* **Hinweis:** Prompt: `codex -q "Schreibe ein Bash-Skript 'create_api_project.sh'. Wenn ich es ausführe, soll es 'cargo new' nutzen, die 'Cargo.toml' mit den 3 wichtigsten Web-Dependencies füllen, eine 'main.rs' Vorlage generieren und einen initialen Git-Commit machen" > create_project.sh`.

#### Übung 9: Vollautomatisches Self-Healing Pipeline
* **Aufgabe:** Die absolute Meisterklasse der Shell-Automatisierung! Schreibe dir selbstständig ein Bash-Skript namens `auto_fix.sh`.
* **Hinweis:** Dieses Skript soll intern einen fehleranfälligen Befehl ausführen (z.B. `cargo build`). Wenn der Befehl fehlschlägt, soll dein Skript den Error-Output abfangen, ihn automatisch per Pipe an Codex senden, den KI-Lösungsvorschlag in eine Datei speichern und dir anzeigen. Du baust dir damit deine eigene, komplett autarke Auto-Reparatur-KI!
