# 🐚 Claude Code – Automatisieren

*Wie du den Claude KI-Agenten für CI/CD-Pipelines, automatische Code-Reviews und Hintergrund-Aufgaben skriptest.*

---

## 🧠 Theorie: "Alle wissen" bei der Automatisierung

Wenn wir Claude Code als interaktiven Agenten im Terminal nutzen, steuern wir ihn live. Beim **Automatisieren** (z.B. in GitHub Actions oder Git-Hooks) muss der Agent völlig selbstständig handeln. Dafür muss das Setup ("Alle wissen") perfekt vorbereitet sein:

* **Headless-Modus:** Der Agent darf nicht auf Eingaben vom Benutzer warten (wie Bestätigungen für Dateizugriffe), sonst friert das Automatisierungsskript ein.
* **Präziser Kontext durch Pipes:** Anstatt Claude das ganze Projekt scannen zu lassen, leitest du nur exakt das weiter, was er prüfen soll (z.B. `git diff | claude "Reviewe diese Änderungen"`). Das spart Geld und Zeit.
* **Fixe Vorgaben (System Prompts):** Über feste Instruktionen muss klar definiert werden, wie das Ausgabeformat aussehen soll (z.B. reines JSON ohne Markdown-Geschwafel), damit andere Skripte das Ergebnis maschinell weiterverarbeiten können.

## ⚙️ Einstellungen & Setup

Um Claude Code skriptfähig zu machen, musst du die CLI-Argumente beherrschen:
* **Non-Interactive Flags:** Finde heraus, welches Argument den interaktiven Modus deaktiviert (oft etwas wie `--non-interactive` oder `--yes`), damit Sicherheitsabfragen entweder automatisch erlaubt oder strikt blockiert werden.
* **API-Keys über Umgebungsvariablen:** Da du auf einem Server oder in der CI/CD keinen Browser-Login machen kannst, muss die Authentifizierung über eine Umgebungsvariable (wie `ANTHROPIC_API_KEY`) gelöst werden.
* **Kosten- und Tokenlimits:** Automatisierte Skripte können bei Fehlern in Endlosschleifen geraten. Ein hartes Budget-Limit (z.B. `--max-cost`) ist beim Automatisieren absolute Pflicht, um böse Überraschungen auf der Kreditkarte zu vermeiden.

---

## 🛠️ Praxis-Übungen: Automatisierungs-Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Es gibt hier keine fertigen Bash-Skripte zum einfachen Kopieren! Nutze die `claude --help` Funktion, trainiere deine Shell-Kenntnisse und erarbeite dir die Befehlsketten selbst.

### 🧭 Steuerung & Kontext in Skripten

#### Übung 1: Den Headless-Modus nutzen
* **Aufgabe:** Starte Claude Code direkt aus der Shell heraus mit einem Prompt, ohne dass sich die interaktive Chat-Ansicht öffnet und das Programm auf weitere Benutzereingaben wartet.
* **Hinweis:** Lies die Hilfe (`claude --help`). Gibt es ein Kommandozeilenargument für den einmaligen Prompt-Aufruf oder einen Non-Interactive-Schalter?

#### Übung 2: Piped Diff Review
* **Aufgabe:** Bevor du committest, soll Claude dein aktuelles `git diff` lesen und dir als Text eine kurze Zusammenfassung (z.B. für die Commit-Nachricht) ausgeben.
* **Hinweis:** Kombiniere den Pipe-Operator (`|`) der Shell mit dem Claude-Befehl. Wie formulierst du den Prompt so, dass Claude sich *nur* auf den Input konzentriert und nicht im Dateisystem stöbert?

#### Übung 3: Striktes JSON erzwingen
* **Aufgabe:** Du möchtest, dass Claude Code eine Liste offener Todos (`// TODO: ...`) in deinem Code findet und *ausschließlich* als gültiges JSON ausgibt, damit ein anderes Skript sie lesen kann.
* **Hinweis:** Teste, wie extrem bestimmend du im Prompt sein musst (Beispiel: "Output strictly JSON, absolutely no markdown wrappers, no conversational text").

### 🛡️ Sicherheit & CI/CD-Setup

#### Übung 4: Kostenlimit-Sicherheit
* **Aufgabe:** Simuliere einen automatisierten Skript-Aufruf, bei dem Claude maximal 0,10 $ ausgeben darf. Wie übergibst du das Limit beim Start der CLI?
* **Hinweis:** Welche Parameter (z.B. `--max-cost` oder `--budget`) stehen dir zur Verfügung? Teste es mit einem extrem niedrigen Wert.

#### Übung 5: API-Key Auth ohne Browser
* **Aufgabe:** Logge dich in der CLI aus (`claude logout`). Versuche nun, Claude über eine exportierte Umgebungsvariable im Terminal lauffähig zu machen, ohne den Browser-Login auszulösen.
* **Hinweis:** Schau in die Dokumentation des Tools. Wie muss die Umgebungsvariable exakt heißen, damit der Headless-Betrieb authentifiziert wird?

#### Übung 6: Git Pre-Commit Hook vorbereiten
* **Aufgabe:** Wie schreibst du theoretisch ein kleines Bash-Skript für `.git/hooks/pre-commit`, das Claude anweist, den Code auf Syntax-Fehler zu scannen, bevor der Commit durchgeht?
* **Hinweis:** Erinnere dich an die Exit-Codes in Bash. Wenn Claude einen Fehler anmerkt, muss das Skript mit `exit 1` den Commit blockieren.

### 🔄 Komplexe Automatisierungs-Workflows

#### Übung 7: Automatische Übersetzungen (I18n)
* **Aufgabe:** Du hast eine `de.json` Datei für Text-Übersetzungen. Schreibe einen Terminal-Befehl, der Claude anweist: "Nimm diese Datei, übersetze alle Werte ins Spanische und gib das Ergebnis aus." Speichere den Output als `es.json`.
* **Hinweis:** Muss Claude dafür selbst Schreibrechte erhalten, oder leitest du die Datei sicherer via `cat` in den Befehl rein und schreibst die Ausgabe via `>` in die neue Datei?

#### Übung 8: CI/CD Workflow entwerfen
* **Aufgabe:** Nutze Claude (im interaktiven Modus), um dir erklären zu lassen, wie du einen YAML-Workflow für GitHub Actions schreibst. Der Workflow soll bei jedem Push die Claude CLI herunterladen und das aktuelle Git-Diff auf Best Practices prüfen.
* **Hinweis:** Wie wird bei GitHub Actions der Anthropic API-Key als sicheres "Secret" an das Skript weitergereicht?

#### Übung 9: Server-Log Monitoring (Cronjob-Idee)
* **Aufgabe:** Stell dir vor, du hast auf einem Server eine `error.log`. Wie sieht ein Einzeiler aus, den du in einen Cronjob packen könntest, bei dem Claude die letzten 50 Zeilen der Log-Datei liest und kurz zusammenfasst?
* **Hinweis:** Kombiniere das Standard-Linux-Tool `tail -n 50 error.log` über eine Pipe (`|`) mit dem Aufruf der Claude CLI.
