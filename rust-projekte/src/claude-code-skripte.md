# 🐚 Claude Code – Skripte & App-Steuerung

*Wie du Claude Code nutzt, um kleine Helfer-Skripte zu schreiben, die andere Anwendungen auf deinem System fernsteuern, und wie du dabei die robustesten Lösungswege ("bessere Lösungen") findest.*

---

## 🧠 Theorie: "Alle wissen" bei der App-Steuerung

Als Entwickler verbringt man oft viel Zeit mit wiederkehrenden Abläufen in anderen Programmen (z.B. Git-Workflows, Docker-Management, Datenbank-Tools oder Browser-Aktionen). Mit Claude Code kannst du dir Automatisierungs-Skripte (in Bash, Python oder Rust) generieren lassen, die diese Dritt-Tools für dich steuern.

Damit Claude funktionierende Skripte liefert, muss das Kontextwissen ("Alle wissen") präzise abgesteckt sein:
* **Umgebungswissen:** Claude muss wissen, auf welchem Betriebssystem du arbeitest (Linux, Mac, Windows) und welche Kommandozeilen-Tools auf deinem System überhaupt installiert sind.
* **Schnittstellen-Doku einspeisen:** Wenn du ein Skript für ein spezielles Kommandozeilen-Tool (wie `ffmpeg`, `kubectl` oder `imagemagick`) brauchst, übergib Claude am besten den Output von `--help` als Kontext, damit er die neuesten Befehle kennt.
* **Der Weg zur besseren Lösung:** Anfänger denken bei Automatisierung oft an "Mausklick-Simulation" (z.B. über Web-Scraper oder `xdotool`). Die Aufgabe von Claude ist es, dir eine "bessere Lösung" vorzuschlagen – etwa eine versteckte REST-API des Programms anzusprechen oder Konfigurationsdateien direkt mit Regex zu manipulieren, da dies technisch viel robuster ist.

## ⚙️ Einstellungen & Setup

Beim Erstellen von Skripten mit Claude Code helfen dir folgende Workflows:
* **Iteratives Testen:** Lass Claude ein Skript schreiben und es von ihm direkt im Terminal ausführen. Wenn es fehlschlägt, zwinge ihn, die Fehlermeldung zu lesen und das Skript selbstständig in einer Schleife zu korrigieren.
* **Ausführungsrechte:** Wenn Claude eine `.sh` Datei anlegt, musst du ihm manchmal explizit im Prompt sagen: "Mache die Datei nach dem Speichern auf dem System direkt ausführbar (z.B. via `chmod +x`)."
* **Die richtige Sprache wählen:** Überlasse Claude als Architekt die Wahl der Waffe. Manchmal ist ein simples Bash-Skript (für Dateioperationen) perfekt, manchmal erfordert komplexes Error-Handling aber ein robusteres Python- oder Rust-Skript.

---

## 🛠️ Praxis-Übungen: Skripte & Automatisierung (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Shell-Skripte zum einfachen Kopieren! Nutze die Claude CLI im Terminal und lass den KI-Agenten die Skripte von Grund auf für dich entwerfen.

### 🧭 Grundlagen: CLI-Wrapper und kleine Helfer

#### Übung 1: Das Git-Helfer-Skript
* **Aufgabe:** Bitte Claude: "Schreibe mir ein Bash-Skript namens `git-sync.sh`, das alle Änderungen im aktuellen Ordner hinzufügt, committet (mit einem von dir generierten Standard-Text und Zeitstempel) und sofort pusht."
* **Hinweis:** Achte darauf, dass Claude das Skript am Ende ausführbar macht. Teste es in einem ungefährlichen Test-Verzeichnis.

#### Übung 2: Kontext-Injection über `--help`
* **Aufgabe:** Du willst ein Skript, das alle `.jpg` Bilder in einem Ordner komprimiert, kennst aber die exakten `ImageMagick`-Befehle nicht.
* **Hinweis:** Nutze eine Bash-Pipe, um den Kontext frisch in den Agenten zu laden: `magick --help | claude "Schreibe ein Shell-Skript, das alle Bilder im aktuellen Ordner auf 50% skaliert."`

#### Übung 3: Fehlersuche gnadenlos delegieren
* **Aufgabe:** Führe ein von Claude geschriebenes Skript aus, das absichtlich fehlschlägt.
* **Hinweis:** Sage Claude nicht, was deiner Meinung nach kaputt ist. Übergib nur stumpf den Error-Output: "Das Skript ist fehlgeschlagen mit diesem Output. Analysiere das Problem und repariere den Code."

### 🛡️ App-Steuerung und "Bessere Lösungen"

#### Übung 4: Browser-Steuerung vs. API
* **Aufgabe:** Du möchtest ein Skript, das jeden Morgen Wetterdaten abliest. Frag Claude initial: "Schreibe ein Python-Skript, das den Browser öffnet, auf eine Wetterseite geht und die Temperatur kopiert."
* **Hinweis (Die bessere Lösung fordern):** Zwinge Claude direkt im nächsten Satz zur Kritik: "Wenn visuelle GUI-Automatisierung hier ein wackeliges Anti-Pattern ist, schlage mir eine robustere Architektur (z.B. eine offene REST-API) vor und schreibe *dafür* das Skript."

#### Übung 5: Docker-Umgebungen interaktiv fernsteuern
* **Aufgabe:** Du hast Docker installiert. Bitte Claude: "Schreibe ein kleines Rust-CLI-Tool, das alle laufenden Docker-Container auflistet und mich per Tasteneingabe fragt, welchen Container ich neustarten will."
* **Hinweis:** Prüfe den Code. Nutzt Claude das `std::process::Command` Modul in Rust sauber, um die Docker-Befehle im Hintergrund unsichtbar zu steuern?

#### Übung 6: Robuste Konfigurations-Manipulation
* **Aufgabe:** Anstatt eine App über unsichere Klicks umzustellen, willst du ein Skript, das eine Einstellung (z.B. den "Dark Mode") ändert.
* **Hinweis:** Fordere Claude auf: "Schreibe ein Bash-Skript, das eine fiktive JSON-Konfigurationsdatei öffnet und den Wert für das Theme über das CLI-Tool `jq` sicher austauscht, ohne die Formatierung der Datei zu zerstören."

### 🔄 Komplexe Workflows & System-Integration

#### Übung 7: Hintergrund-Dienste (Cronjobs/Systemd)
* **Aufgabe:** Du hast ein funktionierendes Backup-Skript von Claude schreiben lassen. Jetzt soll es vollautomatisch im Hintergrund laufen.
* **Hinweis:** Bitte Claude: "Generiere mir den exakten Cronjob-Eintrag (oder eine moderne Systemd-Service-Datei), um dieses Skript jeden Freitag um 20 Uhr laufen zu lassen. Erkläre mir Schritt für Schritt, wie ich den Service registriere."

#### Übung 8: Interaktive CLI-Tools (TUI)
* **Aufgabe:** Ein simples Bash-Skript reicht dir für die App-Steuerung nicht mehr. Du willst eine schöne Terminal-Oberfläche.
* **Hinweis:** Bitte Claude: "Schreibe das Steuerungs-Skript in Rust um und nutze die Bibliothek `ratatui` (oder `inquire`), um ein interaktives, farbiges Auswahlmenü zu rendern."

#### Übung 9: Skripte, die Code schreiben
* **Aufgabe:** Lass Claude ein Meta-Skript erzeugen, das dir in Zukunft die Arbeit abnimmt.
* **Hinweis:** Prompt: "Schreibe ein Skript `setup_rust_api.sh`. Wenn ich es ausführe, soll es eine komplette Rust-Web-Server-Projektstruktur anlegen, eine fertige `Cargo.toml` mit den nötigsten Dependencies schreiben, eine `main.rs` Vorlage erstellen und einen initialen Git-Commit durchführen."
