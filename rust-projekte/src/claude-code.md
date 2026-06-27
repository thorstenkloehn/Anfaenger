# 🐚 Claude Code – Der KI-Agent im Terminal

*Lass die KI direkt in deiner Shell programmieren, testen und Fehler beheben.*

---

In dieser Lektion lernen wir **Claude Code** kennen. Claude Code ist ein von Anthropic entwickeltes Befehlszeilen-Tool (CLI), das als autonomer KI-Agent direkt in deinem Terminal arbeitet. Im Gegensatz zu normalen Chatbots kann Claude Code Befehle ausführen, Dateien lesen und bearbeiten, Git-Commits schreiben und Tests starten – alles gesteuert durch natürliche Sprache direkt aus deiner Shell.

Für Rust-Entwickler ist Claude Code ein extrem mächtiger Partner, da er Compiler-Fehler von `cargo build` direkt lesen und selbstständig im Code korrigieren kann.

---

## 🧠 Theorie: Was ist Claude Code?

### Was unterscheidet Claude Code von ChatGPT oder dem Claude Web-Chat?

| Eigenschaft | Claude im Web (Claude.ai) | Claude Code (CLI) |
|---|---|---|
| **Schnittstelle** | Browser-Oberfläche | Terminal / Shell |
| **Dateizugriff** | Nur über manuelles Hochladen | Direkter Lese- und Schreibzugriff (lokal) |
| **Terminalbefehle** | Keine | Kann Befehle ausführen (z. B. `cargo test`) |
| **Autonomie** | Niedrig (du kopierst Code) | Hoch (Agent plant und editiert selbstständig) |
| **Git-Anbindung** | Keine | Kann Commits erstellen und Diffs anzeigen |

### Wie funktioniert der Agenten-Workflow?

Wenn du Claude Code eine Aufgabe gibst (z. B. *„Finde den Fehler im Rechner-Modul und behebe ihn“*), arbeitet der Agent in einer Schleife (Loop):
1. **Analysieren:** Er durchsucht das Projektverzeichnis nach relevanten Dateien.
2. **Lesen:** Er öffnet und liest die betroffenen `.rs`-Dateien.
3. **Planen:** Er erstellt einen Plan, wie der Fehler behoben werden kann.
4. **Schreiben:** Er modifiziert die Dateien.
5. **Prüfen:** Er führt `cargo check` oder `cargo test` aus, um zu sehen, ob sein Fix funktioniert. Falls nicht, korrigiert er sich selbst so lange, bis die Tests bestehen.
6. **Bestätigen:** Er zeigt dir ein farbiges Diff (Änderungen) und bittet dich um Erlaubnis, die Änderungen dauerhaft zu speichern.

---

## 🛠️ Praxis-Aufgaben

### Aufgabe A: Installation und erster Start

1. Claude Code benötigt Node.js. Stelle sicher, dass Node.js auf deinem System installiert ist.
2. Installiere Claude Code global über dein Terminal:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
3. Navigiere in dein Rust-Projektverzeichnis.
4. Starte Claude Code durch Eingabe von:
   ```bash
   claude
   ```
5. Logge dich über den angezeigten Link in deinen Anthropic-Account ein, um das Tool zu autorisieren.

---

### Aufgabe B: Projekt erkunden

1. Starte Claude Code im interaktiven Modus (`claude`).
2. Stelle dem Agenten die Frage:
   ```text
   Gib mir eine Übersicht über die Struktur dieses Rust-Projekts und erkläre, welche Crates in Cargo.toml definiert sind.
   ```
3. Beobachte, wie Claude Code die Dateien im Hintergrund auflistet und analysiert.
4. Beende die Session mit dem Slash-Befehl `/exit`.

### Aufgabe C: Fehlerbehebung anstoßen

1. Öffne deine `src/main.rs` und baue absichtlich einen Syntaxfehler ein (z. B. ein fehlendes Semikolon oder einen falschen Variablennamen).
2. Starte Claude Code im Terminal mit einer direkten Aufgabe:
   ```bash
   claude "Führe cargo check aus und behebe alle gefundenen Fehler"
   ```
3. Beobachte die Ausführung: Claude Code wird `cargo check` starten, die Fehlermeldung auswerten, die Zeile in `src/main.rs` editieren, erneut testen und dir das Diff zur Bestätigung vorlegen.

---

### Aufgabe D: Arbeiten mit Pipes & CLI-Chaining

1. Erstelle einige ungespeicherte Änderungen in deinem Rust-Code.
2. Generiere eine automatisierte Commit-Nachricht, indem du das Git-Diff direkt an Claude Code übergibst:
   ```bash
   git diff | claude -p "Schreibe eine prägnante Git-Commit-Nachricht basierend auf diesem Diff"
   ```
3. Führe absichtlich einen fehlerhaften Test aus und pipe die Ausgabe an Claude:
   ```bash
   cargo test 2>&1 | claude -p "Erkläre mir, welcher Test fehlschlägt und warum (keinen Code generieren)"
   ```

---

### Aufgabe E: Sicherheitsmodus und Offline-Betrieb

1. Um sicherzustellen, dass Claude Code keine Dateien verändert, starte das Tool im Read-Only-Modus:
   ```bash
   claude --readonly
   ```
2. Versuche im Chat, eine Datei erstellen zu lassen (z. B. `Erstelle docs/test.txt`). Beobachte, wie der Agent dies verweigert oder darauf hinweist, dass er keine Schreibrechte hat.
3. Starte Claude Code ohne Internetzugang, um rein lokal zu arbeiten:
   ```bash
   claude --no-internet
   ```
4. Frage nach einer Rust-Syntax-Erklärung. Claude wird ausschließlich auf lokale Dokumentationen und sein internes Wissen zurückgreifen.

---

### Aufgabe F: Kosten und Konfiguration anpassen

1. Starte eine interaktive Session mit `claude`.
2. Öffne das Konfigurationsmenü über:
   ```text
   /config
   ```
3. Überprüfe die aktuellen Einstellungen (z. B. Autorisierungen für Befehle).
4. Lass dir nach ein paar Test-Prompts den genauen finanziellen Verbrauch der aktuellen Sitzung anzeigen:
   ```text
   /cost
   ```

---

## 🚀 50 Übungen mit Lösungen

Die folgenden Übungen helfen dir, die Steuerung, die Slash-Befehle und die Prompts von Claude Code optimal für deine Rust-Projekte einzusetzen.

> [!IMPORTANT]
> **Das Buchkonzept verbietet fertigen Rust-Code als Lösung.**
> Die Lösungen konzentrieren sich auf CLI-Parameter, Slash-Befehle, Prompts zur Steuerung des Agenten und Konfigurationseinstellungen.

---

### 🟢 Einstieg (1–10): Starten, Beenden und grundlegende Prompts

#### Übung 1: Interaktive Session starten
* **Aufgabe:** Wie startest du die interaktive Chat-Konsole von Claude Code in deinem aktuellen Projektverzeichnis?
* **Lösung:** Gib den Befehl `claude` im Terminal ein.

#### Übung 2: Session beenden
* **Aufgabe:** Wie verlässt du die interaktive Konsole von Claude Code wieder und kehrst zur normalen Shell zurück?
* **Lösung:** Tippe den Slash-Befehl `/exit` oder drücke `Ctrl+d`.

#### Übung 3: Hilfe anzeigen
* **Aufgabe:** Wie lässt du dir innerhalb von Claude Code alle verfügbaren Systembefehle und Tastenkürzel auflisten?
* **Lösung:** Tippe den Slash-Befehl `/help`.

#### Übung 4: Direktes Kommando ausführen (ohne interaktiven Modus)
* **Aufgabe:** Du möchtest dem Agenten nur eine schnelle Frage stellen (z. B. „Erkläre das Modul utils“), ohne in der interaktiven Konsole zu bleiben. Wie lautet der Terminalbefehl?
* **Lösung:** Führe `claude "Erkläre das Modul utils"` direkt in deiner Shell aus.

#### Übung 5: Prompt zum Projekt-Onboarding
* **Aufgabe:** Welchen Prompt gibst du Claude Code am besten bei einem völlig neuen Projekt, um einen Überblick über den Einstiegspunkt und den Zweck des Codes zu bekommen?
* **Lösung:** `„Lies die README.md und die main.rs und erkläre mir kurz den Zweck und die Architektur dieses Projekts.“`

#### Übung 6: Chatverlauf löschen
* **Aufgabe:** Wie setzt du den aktuellen Chatverlauf in einer aktiven Session zurück, um wieder mit einem leeren Kontext zu arbeiten?
* **Lösung:** Tippe den Slash-Befehl `/clear`.

#### Übung 7: Kosten und Token-Verbrauch anzeigen
* **Aufgabe:** Wie prüfst du während einer Session, wie viele API-Kosten und Token du im aktuellen Chat verbraucht hast?
* **Lösung:** Tippe den Slash-Befehl `/cost`.

#### Übung 8: Letzte Diffs anzeigen
* **Aufgabe:** Wie lässt du dir in Claude Code die Änderungen anzeigen, die der Agent in der aktuellen Session an den Dateien vorgenommen hat?
* **Lösung:** Tippe den Slash-Befehl `/diff`.

#### Übung 9: One-Shot-Dokumentation generieren
* **Aufgabe:** Wie forderst du Claude Code über die Befehlszeile auf, eine Dokumentationsdatei `docs/ARCHITECTURE.md` basierend auf dem Code in `src/` zu erstellen?
* **Lösung:** `claude "Analysiere den Code in src/ und erstelle eine Dokumentation unter docs/ARCHITECTURE.md"`

#### Übung 10: Letzten Befehl im Terminal wiederholen
* **Aufgabe:** Wie bringst du Claude Code dazu, den letzten vom Agenten vorgeschlagenen Terminalbefehl erneut auszuführen?
* **Lösung:** Bestätige die Nachfrage des Agenten im Terminal mit `y` (oder drücke einfach `Enter`, falls dies die Standardoption ist).

---

### 🟡 Mittelstufe (11–25): Cargo-Integration und Fehlerbehebung

#### Übung 11: Cargo Check Prompt
* **Aufgabe:** Welchen Prompt nutzt du, damit Claude Code prüft, ob dein Rust-Projekt ohne Compilerfehler baut?
* **Lösung:** `„Führe cargo check aus und zeige mir, ob Compilerfehler vorliegen.“`

#### Übung 12: Fehlerbehebung anstoßen
* **Aufgabe:** Du hast Compilerfehler. Wie lautet der Prompt, damit Claude Code diese analysiert und behebt?
* **Lösung:** `„Führe cargo check aus, finde die Ursachen für alle Fehler und behebe sie in den entsprechenden Dateien.“`

#### Übung 13: Nur bestimmte Dateien bearbeiten lassen
* **Aufgabe:** Du möchtest verhindern, dass der Agent das gesamte Projekt anfasst. Wie schränkst du seine Aufgabe im Prompt auf `src/lib.rs` ein?
* **Lösung:** `„Optimiere die Fehlerbehandlung, aber nimm Änderungen ausschließlich in src/lib.rs vor.“`

#### Übung 14: Test-Schleife starten (cargo test)
* **Aufgabe:** Wie instruierst du Claude Code, deine Tests so lange laufen zu lassen und den Code zu korrigieren, bis alle Tests erfolgreich durchlaufen?
* **Lösung:** `„Führe cargo test aus. Wenn Tests fehlschlagen, repariere den Code und wiederhole den Testlauf, bis alles grün ist.“`

#### Übung 15: Clippy-Warnungen beheben
* **Aufgabe:** Wie lautet der Befehl, um idiomatischen Rust-Stil über Clippy zu erzwingen und vom Agenten einarbeiten zu lassen?
* **Lösung:** `„Führe cargo clippy aus und behebe alle Warnungen und Vorschläge zur Code-Qualität.“`

#### Übung 16: Interaktive Diffs ablehnen
* **Aufgabe:** Claude Code schlägt eine Änderung in deiner `main.rs` vor, die dir nicht gefällt. Wie reagierst du im Terminal-Prompt?
* **Lösung:** Wähle bei der Bestätigungsaufforderung `n` (Nein) oder tippe ein Feedback ein wie: `„Nein, behalte die ursprüngliche Logik bei, verwende aber eine Match-Anweisung statt if let.“`

#### Übung 17: Token-Kontext komprimieren
* **Aufgabe:** Wenn der Chatverlauf sehr lang wird, verbraucht Claude viele Token. Mit welchem Slash-Befehl kannst du den bisherigen Verlauf komprimieren (compacten), um Token zu sparen?
* **Lösung:** Tippe den Slash-Befehl `/compact`.

#### Übung 18: Konfiguration anzeigen
* **Aufgabe:** Wie lässt du dir die aktuellen Einstellungen von Claude Code (z. B. das genutzte Modell oder die Berechtigungen) anzeigen?
* **Lösung:** Tippe den Slash-Befehl `/config`.

#### Übung 19: Auto-Formatierung erzwingen
* **Aufgabe:** Wie bringst du den Agenten dazu, nach seinen Änderungen den Rust-Formatter über das Projekt laufen zu lassen?
* **Lösung:** `„Nachdem du die Änderungen vorgenommen hast, formatiere das gesamte Projekt mit cargo fmt.“`

#### Übung 20: Erklärung von Imports anfordern
* **Aufgabe:** Du siehst in der `Cargo.toml` eine dir unbekannte Crate. Wie lässt du dir deren Verwendung im Projekt erklären?
* **Lösung:** `„Erkläre mir, wofür die Crate XYZ in diesem Projekt verwendet wird und zeige mir die Stellen im Code, wo wir sie importieren.“`

#### Übung 21: Unit-Test-Gerüst anfordern
* **Aufgabe:** Welchen Prompt nutzt du, um für eine spezifische Funktion in `src/math.rs` ein passendes Unit-Test-Modul schreiben zu lassen?
* **Lösung:** `„Erstelle in src/math.rs ein Test-Modul mit mindestens drei Unit-Tests für die Funktion XYZ.“`

#### Übung 22: Unnötige Abhängigkeiten finden
* **Aufgabe:** Welcher Prompt hilft dir herauszufinden, ob in `Cargo.toml` Crates eingetragen sind, die im Quellcode gar nicht importiert werden?
* **Lösung:** `„Überprüfe, ob es in Cargo.toml Abhängigkeiten gibt, die in keiner unserer .rs-Dateien verwendet werden.“`

#### Übung 23: Log-Dateien einlesen
* **Aufgabe:** Deine App stürzt ab und schreibt einen Log unter `target/debug/error.log`. Wie weist du Claude Code an, diesen Log zu analysieren?
* **Lösung:** `„Lies target/debug/error.log, finde die Absturzursache im Code und schlage eine Behebung vor.“`

#### Übung 24: Globale Ignorier-Regeln (`.claudeignore`)
* **Aufgabe:** Du möchtest verhindern, dass Claude Code jemals eine bestimmte Datei (z. B. `.env` oder Passwörter) liest. Wo konfigurierst du das?
* **Lösung:** Erstelle im Projektverzeichnis eine Datei `.claudeignore` und trage dort die zu ignorierenden Dateipfade ein (analog zu `.gitignore`).

#### Übung 25: API-Limit-Status abfragen
* **Aufgabe:** Wie prüfst du, wie viel deines monatlichen Anthropic-Budgets noch übrig ist?
* **Lösung:** Nutze den Slash-Befehl `/cost` oder `/cost limit` in der Konsole.

---

### 🔴 Fortgeschritten (26–40): Git-Integration und Multi-File-Aktionen

#### Übung 26: Git Commit durch Claude Code schreiben lassen
* **Aufgabe:** Claude Code hat deine Änderungen fertiggestellt. Wie lässt du ihn direkt einen passenden Git-Commit formulieren und ausführen?
* **Lösung:** `„Erstelle einen Git-Commit für die aktuellen Änderungen mit einer passenden Commit-Nachricht nach Conventional-Commits-Standard.“`

#### Übung 27: Commit-Entwurf manuell anpassen
* **Aufgabe:** Wie verhinderst du, dass Claude Code einen Commit direkt pusht, sondern ihn nur lokal committet?
* **Lösung:** `„Erstelle den Commit nur lokal, führe kein git push aus.“`

#### Übung 28: Refactoring über mehrere Dateien hinweg (Multi-File)
* **Aufgabe:** Du möchtest den Namen eines Structs (z. B. `Config` zu `AppConfig`) im gesamten Projekt ändern. Wie lautet der Prompt?
* **Lösung:** `„Benenne das Struct Config in AppConfig um und passe alle Importe und Verwendungen in allen Dateien des Projekts an.“`

#### Übung 29: Feature-Zweig erstellen
* **Aufgabe:** Wie weist du Claude Code an, vor der Bearbeitung einer Aufgabe einen neuen Git-Branch zu erstellen?
* **Lösung:** `„Erstelle einen neuen Git-Branch namens feature/fehlerbehandlung und wechsle dorthin, bevor du mit der Arbeit beginnst.“`

#### Übung 30: Undo der letzten Claude-Änderung über Git
* **Aufgabe:** Du hast die Änderungen von Claude Code bestätigt, merkst aber im Nachhinein, dass sie fehlerhaft waren. Wie bringst du Claude dazu, das über Git rückgängig zu machen?
* **Lösung:** `„Mache die letzten Änderungen in diesem Git-Repository rückgängig (git checkout / git reset).“`

#### Übung 31: Performance-Flaschenhälse suchen
* **Aufgabe:** Welchen Prompt sendest du, um den Code nach offensichtlichen Performance-Flaschenhälsen (z. B. unnötigen Klon-Vorgängen `.clone()`) durchsuchen zu lassen?
* **Lösung:** `„Suche im Projekt nach unnötigen .clone()-Aufrufen oder teuren Allokationen und schlage performantere Alternativen vor.“`

#### Übung 32: Fehlerbehandlung verbessern
* **Aufgabe:** Wie bringst du Claude Code dazu, panikgefährdete Stellen (`unwrap()`, `expect()`) in sichere Fehlerbehandlung (`Result`) umzuschreiben?
* **Lösung:** `„Suche nach unwrap() und expect() im Code und ersetze sie durch eine sichere Fehlerbehandlung mit Result und dem ?-Operator.“`

#### Übung 33: `/config` Werte setzen
* **Aufgabe:** Wie stellst du die Standardberechtigung für Terminalbefehle in Claude Code über das CLI-Menü auf „Immer nachfragen“ (ask)?
* **Lösung:** Führe den Befehl `/config set auto_approve_commands false` aus (oder passe es interaktiv in `/config` an).

#### Übung 34: Dokumentation aus Code-Kommentaren generieren
* **Aufgabe:** Wie lässt du eine API-Dokumentation für dein Library-Projekt generieren?
* **Lösung:** `„Generiere aus allen mit /// markierten Dokumentationskommentaren im Code eine zusammenfassende API.md.“`

#### Übung 35: Interaktiven Modus mit vordefiniertem Prompt starten
* **Aufgabe:** Du möchtest Claude Code starten und direkt eine Frage mitgeben, aber danach in der interaktiven Konsole bleiben. Wie machst du das?
* **Lösung:** Starte mit `claude -p "Deine Frage"` (bzw. `--prompt`).

#### Übung 36: Debugging mit Test-Ausgaben
* **Aufgabe:** Ein Test schlägt fehl, aber die Ursache ist unklar. Wie weist du Claude Code an, Debugging-Ausgaben einzubauen, um den Fehler zu isolieren?
* **Lösung:** `„Füge temporäre println!- oder dbg!-Ausgaben in die fehlschlagende Testfunktion ein, führe cargo test aus und analysiere die Ausgaben.“`

#### Übung 37: Cargo Benchmarks auswerten
* **Aufgabe:** Wie lässt du deine Benchmark-Ergebnisse analysieren?
* **Lösung:** `„Führe cargo bench aus und interpretiere die Ergebnisse. Zeige mir, welche Funktionen sich verbessert oder verschlechtert haben.“`

#### Übung 38: Abhängigkeiten-Update prüfen
* **Aufgabe:** Welchen Prompt nutzt du, um veraltete Crates in Cargo.toml zu identifizieren und zu aktualisieren?
* **Lösung:** `„Prüfe, ob für unsere Abhängigkeiten in Cargo.toml neuere Versionen verfügbar sind, und aktualisiere sie vorsichtig.“`

#### Übung 39: Codeabdeckung (Coverage) verbessern
* **Aufgabe:** Wie bringst du Claude Code dazu, gezielt Tests für noch nicht abgedeckte Codepfade zu schreiben?
* **Lösung:** `„Analysiere, welche Codepfade in src/ noch keine Unit-Tests haben, und schreibe Tests für diese Randfälle (Edge Cases).“`

#### Übung 40: Compiler-Warnings als Fehler behandeln (Deny Warnings)
* **Aufgabe:** Wie lässt du das Projekt so prüfen, dass alle Compiler-Warnungen wie Fehler behandelt werden, um maximale Code-Sauberkeit zu garantieren?
* **Lösung:** `„Führe cargo check aus, setze dabei die Umgebungsvariable RUSTFLAGS="-D warnings" und behebe alle auftretenden Warnungen.“`

---

### ⚡ Challenge (41–50): Komplexe Agentensteuerung und CI/CD

#### Übung 41: AGENTS.md-Regeln erweitern
* **Aufgabe:** Wie lässt du Claude Code eine neue Regel bezüglich Code-Formatierung (z.B. `cargo fmt` vor Commits) in die Datei `AGENTS.md` einarbeiten?
* **Lösung:** `„Füge in der Datei AGENTS.md unter Regeln den Punkt 'Formatierung: Vor jedem Git-Commit muss cargo fmt ausgeführt werden' hinzu.“`

#### Übung 42: Überprüfung auf Regelkonformität
* **Aufgabe:** Welchen Prompt nutzt du, damit Claude Code deinen Projektordner scannt und prüft, ob irgendwo Code-Kommentare oder Dokumentationen gegen die Deutsch-Regel aus `AGENTS.md` verstoßen?
* **Lösung:** `„Scanne alle Dateien in src/ und prüfe, ob nicht-deutsche Kommentare oder Dokumentationen enthalten sind, die der Regel in AGENTS.md widersprechen.“`

#### Übung 43: Subagenten-Ergebnisse integrieren
* **Aufgabe:** Du hast die Arbeit von Subagenten abgeschlossen. Wie lässt du Claude Code deren Änderungen in die Haupt-Dokumentation integrieren?
* **Lösung:** `„Lies die von den Subagenten erstellten Entwürfe in docs/sub/ und füge die Kernpunkte strukturiert in src/main.rs oder SUMMARY.md zusammen.“`

#### Übung 44: Skill-Struktur aufbauen
* **Aufgabe:** Wie lässt du Claude Code die Ordnerstruktur für einen komplexen Skill inklusive `scripts/` und `examples/` automatisch anlegen?
* **Lösung:** `„Erstelle unter .agents/skills/mein-skill/ die Unterordner scripts/ und examples/ und lege eine leere SKILL.md an.“`

#### Übung 45: AGENTS.md-Regeln einhalten
* **Aufgabe:** Wie weist du Claude Code an, vor jeder Dateiänderung die Regeln in `AGENTS.md` zu prüfen, um sicherzustellen, dass keine geschützten Dateien verändert werden?
* **Lösung:** `„Lies die Datei AGENTS.md und stelle sicher, dass du bei deinen Änderungen keine der dort gelisteten geschützten Dateien modifizierst.“`

#### Übung 46: Einhaltung des Codelösungs-Verbots durchsetzen
* **Aufgabe:** Wie instruierst du Claude Code, bei der Beantwortung von Benutzerfragen das strenge Verbot von fertigen Code-Lösungen aus `AGENTS.md` einzuhalten?
* **Lösung:** `„Beachte die Regel aus AGENTS.md: Gib mir keine fertigen Rust-Codelösungen, sondern erkläre mir nur Fehlerursachen und gib mir Denkanstöße zur Selbsthilfe.“`

#### Übung 47: Erstellen eines neuen Skills
* **Aufgabe:** Wie lässt du Claude Code einen neuen Buch-Skill namens `neues-thema` im Verzeichnis `.agents/skills/neues-thema/` anlegen?
* **Lösung:** `„Erstelle das Verzeichnis .agents/skills/neues-thema/ und lege darin eine SKILL.md mit passendem YAML-Frontmatter (name, description) an.“`

#### Übung 48: Einen Skill weiter einstellen & verfeinern
* **Aufgabe:** Du möchtest einen bestehenden Skill mit Claude Code erweitern und eine Schritt-für-Schritt-Anleitung hinzufügen.
* **Lösung:** `„Öffne .agents/skills/neues-thema/SKILL.md und füge einen Abschnitt zur detaillierten Konfiguration hinzu.“`

#### Übung 49: Steuerung von Subagenten über Prompts
* **Aufgabe:** Wie bringst du Claude Code dazu, eine große Aufgabe in Teilaufgaben zu zerlegen und Anweisungen für Subagenten zu formulieren?
* **Lösung:** `„Analysiere dieses große Refactoring, teile es in drei unabhängige Teilaufgaben auf und formuliere für jeden Subagenten einen präzisen, regelkonformen Start-Prompt.“`

#### Übung 50: Eigene Skills registrieren
* **Aufgabe:** Wie lässt du Claude Code einen neu erstellten Skill in der globalen `skills.json` registrieren, falls dieser in einem benutzerdefinierten Verzeichnis liegt?
* **Lösung:** `„Öffne die Datei skills.json im Customization-Root und füge den Pfad unseres neuen Skills zu den entries hinzu.“`

---

## 💡 Zusammenfassung

| Begriff | Erklärung |
|---|---|
| **Autonomer Agent** | Ein KI-System, das eigenständig Aktionen (Lesen, Schreiben, Befehle ausführen) plant und durchführt. |
| **`/exit`** | Beendet die interaktive Claude Code-Session im Terminal. |
| **`/clear`** | Löscht den Chat-Kontext der aktuellen Session. |
| **`/cost`** | Zeigt den aktuellen Token-Verbrauch und die aufgelaufenen Kosten der Session an. |
| **`/diff`** | Visualisiert alle vom Agenten vorgenommenen Änderungen an den Projektdateien. |
| **`.claudeignore`** | Datei zum Ausschließen von Pfaden und sensiblen Dateien aus dem Lese-Kontext des Agenten. |
| **`claude --readonly`** | Startet den Agenten im reinen Lese-Modus, um versehentliche Dateiänderungen zu verhindern. |

---

## 📚 Weiterführende Links

- [Anthropic Claude Code Dokumentation](https://docs.anthropic.com/claude/docs/claude-code) – Offizielle Anleitung und Installationshinweise.
- [Anthropic Console](https://console.anthropic.com) – Verwaltung von API-Keys und Abrechnung.
- [Cargo Book](https://doc.rust-lang.org/cargo/) – Referenz für Cargo-Befehle, die Claude Code im Hintergrund ausführt.
