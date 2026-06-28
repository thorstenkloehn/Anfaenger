# 🚀 Antigravity CLI (`agy`) – Skripte & App-Steuerung

*Wie du AGY beauftragst, robuste Automatisierungs-Skripte und CLI-Wrapper zu schreiben, die andere Systeme steuern, und wie du dabei schwache UI-Ansätze in echte Architektur verwandelst.*

---

## 🧠 Theorie: "Alle wissen" für perfekte Skripte

Wenn du möchtest, dass ein autonomer KI-Agent ein Skript schreibt, um ein anderes Programm (z.B. Git, Docker, Datenbanken oder ein lokales System-Tool) fernzusteuern, braucht er exaktes Systemwissen ("Alle wissen").

* **Umgebung & Werkzeuge direkt prüfen:** AGY hat durch seine Tools (wie `run_command`) oft eigene Terminal-Rechte. Der Agent kann selbstständig auf deinem System nachsehen, welche Version von Python, Rust oder der Docker-CLI installiert ist. Er nutzt dieses Live-Wissen, um dir absolut passgenaue und kompilierbare Skripte zu liefern.
* **Wissen durch Hilfe-Texte:** Wenn AGY ein exotisches Tool steuern soll, übergib ihm im Prompt den Befehl, sich selbst einzuarbeiten: "Führe `ffmpeg --help` im Terminal aus, studiere den Output intensiv und schreibe erst danach mein Konvertierungs-Skript."
* **Der Weg zur "besseren Lösung":** Anfänger fordern oft Skripte an, die umständliche Mausklicks in einer GUI simulieren (Web-Scraping, Auto-Klicker). Die wahre Stärke von AGY liegt darin, dich auf eine "bessere Lösung" zu bringen: Der Agent sollte nach der versteckten REST-API des Dienstes suchen oder direkt die tieferliegenden Konfigurationsdateien manipulieren. Das ist Software-Engineering, statt bloßem Basteln!

## ⚙️ Einstellungen & Setup

Um mit AGY exzellente Skripte zu bauen, nutze diese spezifischen CLI-Features:
* **Terminal-Rechte (Tool Permissions):** Stelle sicher, dass AGY in deinen Einstellungen (z.B. via `/config`) die Erlaubnis hat, Terminal-Befehle im Workspace auszuführen. Nur so kann der Agent seine generierten Skripte sofort testen.
* **Ausführungsrechte setzen:** Zwinge AGY im Prompt dazu, frisch erstellte Shell-Skripte sofort lauffähig zu machen (z.B. durch den eigenen CLI-Aufruf von `chmod +x skript.sh`).
* **Self-Healing-Schleifen:** Wenn ein generiertes Skript beim Testen abstürzt, mach nicht die Arbeit der KI. Gib AGY einfach den Befehl: "Führe das Skript aus, lies den Error-Output im Terminal und repariere den Bug in deinem eigenen Code."

---

## 🛠️ Praxis-Übungen: Skripte & Automatisierung (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Code-Vorlagen zum Kopieren! Lerne, wie du den Agenten in der AGY CLI exakt anweist, die konzeptionelle und handwerkliche Arbeit für dich zu erledigen.

### 🧭 Grundlagen: Kleine CLI-Helfer

#### Übung 1: Das Git-Helfer-Skript
* **Aufgabe:** Bitte AGY in der CLI: "Erstelle ein Bash-Skript `git-sync.sh`. Es soll alle aktuellen Änderungen hinzufügen, mit einem von dir generierten dynamischen Text committen und pushen. Mach die Datei danach auf dem System direkt ausführbar."
* **Hinweis:** Kontrolliere in der CLI, ob AGY das Tool `write_to_file` und danach klugerweise `run_command` (für `chmod`) kombiniert hat.

#### Übung 2: Kontext-Injection durch das Terminal
* **Aufgabe:** Du willst ein Skript, das Bilder stapelweise verkleinert. Sag AGY: "Führe zuerst den Befehl `magick --help` über dein Terminal-Tool aus. Analysiere den Output und schreibe mir dann ein fehlerfreies Shell-Skript, das alle Bilder im aktuellen Ordner um 50% skaliert."
* **Hinweis:** Dies ist der mächtigste Weg, um AGYs Trainingsdaten bei Kommandozeilen-Tools in Echtzeit mit der Realität zu synchronisieren.

#### Übung 3: Fehlersuche (Gnadenloses Self-Healing)
* **Aufgabe:** Baue manuell einen absichtlichen Syntaxfehler in ein funktionierendes Skript ein.
* **Hinweis:** Beauftrage AGY im Chat: "Führe das Skript `skript.sh` aus. Es wird abstürzen. Analysiere die Terminal-Fehlermeldung völlig eigenständig und repariere die Datei, bis der Lauf erfolgreich ist."

### 🛡️ App-Steuerung und "Bessere Lösungen"

#### Übung 4: Browser-Steuerung vs. API (Die Bessere Lösung erzwingen)
* **Aufgabe:** Du brauchst Wetterdaten im Terminal. Frag AGY initial: "Schreibe ein Python-Skript, das den Browser öffnet, auf eine Wetterseite navigiert und den Text ausliest."
* **Hinweis (Der Architektur-Zwang):** Schiebe sofort einen zweiten Prompt hinterher: "Stopp! Visuelle GUI-Automatisierung ist ein wackeliges Anti-Pattern. Finde eine 'bessere Lösung' (z.B. eine freie REST-API wie Open-Meteo) und schreibe das Skript stattdessen dafür robuster um."

#### Übung 5: Rust-Wrapper für Docker
* **Aufgabe:** Du willst Docker interaktiv steuern. Bitte AGY: "Schreibe ein kleines Rust-Programm, das das `std::process::Command` Modul nutzt, um im Hintergrund alle laufenden Docker-Container als Liste abzufragen, und mich per Tasteneingabe fragt, welchen ich stoppen will."
* **Hinweis:** Achte penibel darauf, dass AGY mögliche Fehler bei der Ausführung des Sub-Prozesses (z.B. wenn der Docker-Daemon gar nicht läuft) sauber über Rusts `Result`-Typ abfängt.

#### Übung 6: Robuste Konfigurations-Manipulation
* **Aufgabe:** Anstatt den Editor über 10 Klicks umzustellen, willst du ein schnelles Theme-Skript.
* **Hinweis:** Fordere AGY auf: "Schreibe ein Skript, das die `settings.json` meiner Entwicklungsumgebung sucht und über das CLI-Tool `jq` den Wert für das Theme sicher umschaltet, ohne die JSON-Formatierung zu zerstören."

### 🔄 Komplexe Workflows & System-Integration

#### Übung 7: Automatisierung durch Systemd / Cron
* **Aufgabe:** Du hast ein fantastisches Backup-Skript von AGY schreiben lassen. Es muss nun unsichtbar und automatisch laufen.
* **Hinweis:** Bitte AGY: "Generiere mir den nötigen Cronjob-Eintrag (oder eine moderne Systemd-Service-Datei), um dieses Skript jeden Freitag um 20 Uhr als Hintergrund-Prozess laufen zu lassen. Erkläre mir genau, wie ich den Service aktiviere."

#### Übung 8: Interaktive CLI-Tools (TUI)
* **Aufgabe:** Ein simples Bash-Skript reicht dir für die App-Steuerung optisch nicht mehr aus.
* **Hinweis:** Bitte AGY: "Schreibe das Steuerungs-Skript in Rust komplett neu und nutze das Crate `ratatui` (oder das interaktive Crate `inquire`), um ein farbiges, navigierbares Auswahlmenü für das Terminal zu programmieren."

#### Übung 9: Der Meta-Bootstrapper (Skripte schreiben Code)
* **Aufgabe:** Lass AGY ein intelligentes Meta-Skript erzeugen, das dir künftige Standard-Aufgaben abnimmt.
* **Hinweis:** Prompt: "Schreibe mir ein ausführbares Meta-Skript `create_rust_api.sh`. Wenn ich dieses Skript aufrufe, soll es vollautomatisch eine neue Rust-Server-Architektur (`cargo new`) anlegen, die `Cargo.toml` mit gängigen Web-Frameworks befüllen, eine Datenbank-Anbindung skizzieren und den ersten Git-Commit durchführen."
