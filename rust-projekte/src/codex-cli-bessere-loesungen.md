# 💻 Codex CLI – Auf bessere Lösungen kommen

*Wie du die OpenAI Codex CLI über die Shell nutzt, um Code-Qualität zu prüfen, zu refactoren und clevere Architekturen zu entwerfen.*

---

## 🧠 Theorie: "Alle wissen" beim CLI-Refactoring

Wenn du eine reine Kommandozeilen-Schnittstelle (CLI) wie Codex für Refactoring nutzt, hast du keinen grafischen IDE-Editor, der den Kontext deines Projekts automatisch analysiert. Um "auf bessere Lösungen zu kommen", musst du der KI alle relevanten Informationen über Standard-Linux-Tools zuspielen.

* **Shell-basierter Kontext:** Die KI kann nur das bewerten, was du ihr durch eine Pipe (`|`) oder als Dateiargument schickst. Wenn du eine Funktion refactoren willst, musst du ihr oft auch die Datenstrukturen (`struct` oder `enum`) mitschicken, auf denen die Funktion basiert.
* **Trennen von Input und Prompt:** Anstatt ungenau zu sagen "Mach meinen Code besser", ist der saubere CLI-Weg: Du zeigst den Code (`cat Datei X`) und formulierst den Befehl isoliert (`codex "Kritisiere das Architektur-Design"`).
* **Ausprobieren ohne Risiko:** Ein schlechtes, automatisiertes KI-Refactoring kann deine Dateien zerstören. Lerne, den Output in temporäre Dateien umzuleiten (`> temp.rs`), um den neuen Ansatz zu kompilieren, bevor du dein Original überschreibst.

## ⚙️ Einstellungen & Setup

Um mit Codex auf intelligente Lösungen zu kommen, solltest du folgende CLI-Features beherrschen:
* **Das richtige Modell wählen (`--model`):** Für simples Autocomplete reicht ein kleines Modell. Für harte Architektur- oder Logik-Probleme solltest du Codex anweisen, temporär das stärkste verfügbare Modell (z.B. GPT-4o oder "Reasoning"-Modelle) zu nutzen.
* **Read-Only / Diskussions-Modus:** Finde heraus, wie du Codex daran hinderst, Dateien ungefragt zu verändern, wenn du eigentlich nur ein reines Text-Brainstorming im Terminal führen möchtest.
* **Diff-Integration:** Nutze Standard-Shell-Befehle wie `diff`, um deinen ursprünglichen Code objektiv mit dem Vorschlag von Codex im Terminal zu vergleichen.

---

## 🛠️ Praxis-Übungen: Bessere Lösungen finden (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Bash-Snippets zum einfachen Kopieren! Schau in die `codex --help`, kombiniere Linux-Befehle und erarbeite dir den optimalen Weg selbst.

### 🧭 Brainstorming über die Kommandozeile

#### Übung 1: Drei Architekturen anfordern
* **Aufgabe:** Du planst eine neue Datenbank-Anbindung. Nutze Codex direkt in der Shell, ohne einen bestimmten Dateikontext: "Skizziere 3 völlig verschiedene Ansätze für eine Rust-Datenbank-Schicht mit Vor- und Nachteilen."
* **Hinweis:** Zwinge Codex über den Prompt dazu, die Ausgabe als saubere, kompakte Markdown-Tabelle in der Konsole zu rendern.

#### Übung 2: Kontext genau zuschneiden
* **Aufgabe:** Du willst eine komplizierte `match`-Logik refactoren. Die Logik liegt in `logic.rs`, aber die zugehörige `enum`-Definition liegt in `types.rs`. 
* **Hinweis:** Wie nutzt du den Linux-Befehl `cat`, um *beide* Dateien hintereinander auszugeben und gleichzeitig an Codex zu übergeben, damit die KI wirklich "alles weiß"?

#### Übung 3: Modell-Upgrade für harte Nüsse
* **Aufgabe:** Du steckst bei einem extrem kryptischen Lifetime-Error in Rust fest. Das Standard-Modell gibt dir nur generische, nutzlose Tipps.
* **Hinweis:** Finde heraus, wie du Codex über einen Startparameter (oft `--model`) anweist, das intelligenteste, modernste Backend (z.B. für Code-Reasoning) für diese eine Abfrage zu nutzen.

### 🛡️ Risikofreies Refactoring

#### Übung 4: Der Schonungslose Reviewer
* **Aufgabe:** Schicke deine größte und chaotischste Rust-Datei an Codex und fordere: "Sei ein extrem kritischer Senior Developer. Nenne mir die 3 größten Schwachstellen in diesem Code, was Performance und Wartbarkeit angeht. Schreibe absolut KEINEN neuen Code!"
* **Hinweis:** Wie stellst du sicher, dass die Originaldatei unter keinen Umständen von der CLI angerührt wird?

#### Übung 5: Output in Temp-Dateien umlenken
* **Aufgabe:** Lass Codex eine ineffiziente Funktion umschreiben. Anstatt dass Codex die Datei direkt überschreibt, leite den generierten Code im Terminal in eine neue Datei namens `test_refactor.rs` um.
* **Hinweis:** Wie verbietest du Codex, Konversations-Text oder Markdown-Blöcke (wie ` ```rust `) auszugeben, damit die Zieldatei sofort per `cargo check` oder `rustc` getestet werden kann?

#### Übung 6: Terminal-Diffs vergleichen
* **Aufgabe:** Du hast das Refactoring erfolgreich in `test_refactor.rs` gespeichert. Deine unberührte Originaldatei heißt `main.rs`. 
* **Hinweis:** Nutze das Standard-Linux-Kommando `diff -u main.rs test_refactor.rs`, um exakt zu studieren, welche Zeilen Codex für die angebliche "bessere Lösung" geändert hat.

### 🔄 Komplexe Lösungs-Workflows

#### Übung 7: Fremden Code modernisieren
* **Aufgabe:** Kopiere ein sehr altes Rust-Snippet aus einem 5 Jahre alten Tutorial. Fordere Codex in der Shell auf: "Modernisiere diesen Code auf die Rust Edition 2021 und nutze idiomatische Standard-Bibliotheks-Features."
* **Hinweis:** Erkennt Codex alte Patterns und ersetzt sie durch elegante, moderne Operatoren?

#### Übung 8: Performance-Analyse von Loops
* **Aufgabe:** Du hast eine Schleife programmiert, die tausende Strings verarbeitet. Frag Codex in der CLI: "Welche Teile verursachen hier vermutlich die meisten unnötigen Heap-Allokationen (RAM) und wie verhindere ich sie?"
* **Hinweis:** Achte darauf, ob Codex dir kluge Rust-Konzepte wie `Cow` (Clone-on-Write) oder Pre-Allocation (`Vec::with_capacity`) vorschlägt.

#### Übung 9: Testgetriebene Reparatur über Pipes
* **Aufgabe:** Ein Test in deinem Projekt schlägt permanent fehl, und du hast den Bug nach einer Stunde immer noch nicht gefunden. 
* **Hinweis:** Wie übergibst du den reinen Fehler-Output von `cargo test` über eine Pipe (`|`) direkt an Codex und verlangst: "Erkläre mir, warum dieser Test rot ist und skizziere, wie ich den Logik-Fehler beheben kann."
