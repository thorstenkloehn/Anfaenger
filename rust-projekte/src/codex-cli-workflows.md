# 💻 Codex CLI – Workflows & Steuerung

*Wie du den OpenAI Codex Agenten effektiv steuerst, ihm den richtigen Kontext lieferst und ihn an deine Arbeitsweise anpasst.*

---

## 🧠 Theorie: "Alle wissen" – Das Kontext-Fenster

Ein KI-Agent ist nur so schlau wie die Informationen, die du ihm gibst. Das Prinzip "Alle wissen" bedeutet, dass Codex CLI die Struktur deines Projekts und die relevanten Dateien kennen muss, um korrekten Code zu schreiben.

* **Automatisches Scannen:** Codex kann selbstständig Verzeichnisse lesen. Wenn du aber ein riesiges Projekt hast, kann der Kontext "überlaufen", oder die API-Kosten steigen unnötig.
* **Gezielte Eingrenzung:** Als Entwickler steuerst du, welche Dateien die KI ansehen soll. Wenn du einen Fehler in `src/main.rs` suchst, muss Codex nicht unbedingt die gesamte Dokumentation lesen.
* **Pipes nutzen:** Eine der größten Stärken der Codex CLI ist die Möglichkeit, Ausgaben anderer Programme direkt über die Shell "in den Kopf" der KI zu leiten (z. B. `git diff | codex ...`).

## ⚙️ Einstellungen & Setup

Die Codex CLI bietet verschiedene Wege, das Verhalten zu steuern:
* **Sicherheits-Modi:** Im Standardmodus fragt Codex vor jeder riskanten Aktion (wie Datei überschreiben) nach Erlaubnis. Du kannst ihn auch im reinen Lese-Modus (`--readonly`) starten.
* **Interne Konfiguration:** Mit dem Befehl `/config` während einer aktiven interaktiven Sitzung kannst du Modell-Parameter, Berechtigungen und das Ausgabe-Format justieren.
* **Prompt-Design:** Wie genau du deine Anweisungen formulierst, bestimmt, ob der Agent sofort Code ändert oder dir erst einen Plan präsentiert.

---

## 🛠️ Praxis-Übungen: Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Lösungs-Codes oder exakte Befehle zum Kopieren! Nutze die `codex --help` Funktion, teste die Befehle in der Shell und finde den Lösungsweg selbst.

### 🧭 Steuerung & Kontext ("Alle wissen")

#### Übung 1: Den Dateibaum begrenzen
* **Aufgabe:** Wie instruierst du Codex CLI, nur eine einzige spezifische Datei (z. B. `src/lib.rs`) zu lesen und den Rest des Projekts vorerst zu ignorieren?
* **Hinweis:** Kannst du den Dateinamen direkt als Parameter an den Befehl übergeben oder musst du ihn explizit im Text-Prompt nennen?

#### Übung 2: Kontext-Piping für Fehlersuche
* **Aufgabe:** Dein Compiler wirft einen riesigen Fehlertext aus. Wie leitest du diese Fehlermeldung direkt in die Codex CLI, ohne sie mit der Maus zu kopieren?
* **Hinweis:** Denke an das Pipe-Symbol (`|`) in der Bash. Wie verknüpfst du `cargo check` mit dem `codex`-Befehl? Was macht `2>&1`?

#### Übung 3: Chatverlauf leeren
* **Aufgabe:** Du hast 20 Minuten lang mit Codex über Datenbanken diskutiert. Jetzt willst du am Frontend arbeiten. Wie leerst du das Gedächtnis des Agenten, damit er nicht verwirrt ist?
* **Hinweis:** Suche im interaktiven Modus nach einem passenden Slash-Befehl (z. B. `/clear`).

### 🛡️ Einstellungen & Berechtigungen

#### Übung 4: Der Read-Only Modus
* **Aufgabe:** Du analysierst ein unbekanntes, fremdes Skript und hast Angst vor versteckter Malware. Wie startest du Codex so, dass er garantiert keine Shell-Befehle oder Datei-Änderungen ausführen kann?
* **Hinweis:** Finde das Flag für den Nur-Lese-Modus heraus (oft etwas in Richtung `--readonly`).

#### Übung 5: Konfiguration anpassen
* **Aufgabe:** Öffne das interne Konfigurationsmenü von Codex. Welche Parameter für Berechtigungen oder Modellauswahl kannst du dort finden?
* **Hinweis:** Starte eine Session und tippe `/config`. Untersuche das Menü.

#### Übung 6: Auto-Approve für Leserechte
* **Aufgabe:** Codex fragt jedes Mal nach, wenn er eine neue Datei öffnen will. Das stört den Workflow. Wie stellst du das System so ein, dass reine Lese-Aktionen immer ohne Nachfrage erlaubt sind?
* **Hinweis:** Schau dir die Berechtigungs-Optionen in `/config` oder beim Startbefehl genauer an. Kannst du Lesezugriffe auf "Erlauben" setzen?

### 🔄 Komplexe Workflows

#### Übung 7: Git Diff Review
* **Aufgabe:** Du hast mehrere Dateien geändert, aber noch nicht committet. Lass Codex dein aktuelles Diff lesen und dir Verbesserungsvorschläge machen, *bevor* du committest.
* **Hinweis:** Kombiniere `git diff` und einen Codex-Aufruf über eine Pipe. Wie formulierst du den Prompt, damit er nur bewertet und nichts ungefragt umschreibt?

#### Übung 8: Der Planungs-Modus
* **Aufgabe:** Zwinge Codex CLI, bei der Implementierung eines neuen Features zuerst eine Checkliste der Arbeitsschritte auszugeben. Erst wenn du zustimmst, soll er anfangen zu coden.
* **Hinweis:** Wie baust du eine solche Bedingung in deinen Start-Prompt ein? (Beispiel: "Analysiere das Problem und erstelle eine nummerierte Liste. Schreibe noch keinen Code.")

#### Übung 9: Fehler-Endlosschleifen abbrechen
* **Aufgabe:** Codex versucht eigenständig immer wieder denselben fehlerhaften Code zu kompilieren und dreht sich im Kreis. Wie greifst du ein, stoppst die Aktion und gibst ihm einen manuellen Hinweis?
* **Hinweis:** Wie brichst du in deinem Terminal einen laufenden Prozess ab (Tastenkombination `Ctrl+C`) und wie navigierst du die Agenten-Schleife zurück auf den richtigen Pfad?
