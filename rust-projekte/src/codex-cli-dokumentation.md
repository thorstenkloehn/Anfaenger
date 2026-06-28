# 💻 Codex CLI – Dokumentation & Handbücher erstellen

*Wie du Codex CLI und Standard-Linux-Pipes kombinierst, um automatisiert brillante READMEs und Nutzer-Handbücher zu schreiben und dabei Architekturschwächen in deinem Code aufzudecken.*

---

## 🧠 Theorie: "Alle wissen" für exzellente Handbücher in der Shell

Die Codex CLI hat von sich aus keinen intelligenten Zugriff auf dein gesamtes Projekt-Verzeichnis. Ein KI-Agent kann aber nur dann ein wirklich gutes Nutzer-Handbuch schreiben, wenn er den kompletten, relevanten Kontext ("Alle wissen") bekommt. In der Shell steuerst du dieses Wissen manuell:

* **Tests als bester Kontext:** Deine Test-Dateien (z.B. im Ordner `tests/`) sind das perfekte Futter für Anleitungen. Sie zeigen der KI präzise auf, wie Funktionen in der echten Welt aufgerufen werden. Leitest du Tests via `cat` in Codex ein, generiert die KI garantiert realistische und lauffähige Code-Beispiele für die Doku.
* **Zielgruppen (Personas) im Prompt:** Ein System-Administrator braucht völlig andere Informationen als ein Endnutzer. Du musst Codex im Bash-Prompt explizit mitteilen, für wen der generierte Output gedacht ist.
* **Architektur-Check durch Doku:** Der ultimative Test für guten Code ("auf bessere Lösungen kommen") ist die Dokumentation. Du kannst Codex im Terminal-Prompt zwingen, mit einem Fehler abzubrechen, wenn eine Funktion intern so unlogisch ist, dass sie sich nicht einfach erklären lässt.

## ⚙️ Einstellungen & Setup

Um große Text-Dokumente effizient und automatisiert mit der Codex CLI zu generieren, brauchst du robuste Shell-Workflows:
* **Output-Umleitung (`>` und `>>`):** Anstatt den fertigen Text mühsam aus dem Terminal zu kopieren, leite den Output von Codex direkt in Markdown-Dateien um (z.B. `> README.md`).
* **Striktes Formatting:** Nutze Parameter in Codex (wie Quiet-Modes) oder sehr strikte Prompts, um zu verhindern, dass die KI störende Gesprächsfetzen ("Hallo, hier ist dein Handbuch:") vor den eigentlichen Markdown-Text schreibt.
* **Das Context-Limit beachten:** Lerne Bash-Tools wie `find` oder `grep` kennen, um *nur* die absolut relevanten Dateien an Codex zu schicken, damit das Token-Limit nicht überschritten wird und das Ergebnis präzise bleibt.

---

## 🛠️ Praxis-Übungen: Dokumentations-Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Bash-Skripte zum einfachen Kopieren! Finde die Parameter über `codex --help` heraus und trainiere den Umgang mit Linux-Pipes selbstständig.

### 🧭 Grundlagen: README und Code-Kommentare

#### Übung 1: Die perfekte README.md per Pipe
* **Aufgabe:** Nutze den `cat`-Befehl, um die `src/main.rs` und die `Cargo.toml` gleichzeitig an Codex zu übergeben. Prompt: "Generiere eine professionelle `README.md` mit kurzer Installations-Anleitung." Leite den Output direkt in die Datei `README.md` um.
* **Hinweis:** Wie formulierst du den Prompt, um sicherzustellen, dass die neu erstellte `README.md` zu 100 % aus sauberem Markdown besteht und keine Text-Reste der KI enthält?

#### Übung 2: Rustdoc inline ergänzen
* **Aufgabe:** Du hast eine Datei `utils.rs` ohne Kommentare. Nutze Codex, um professionelle Rustdoc-Kommentare (`///`) hinzuzufügen und speichere das Ergebnis als `utils_new.rs`.
* **Hinweis:** Wie formulierst du den Prompt, damit Codex den ausführbaren Quellcode zu 100 % unverändert lässt und wirklich *nur* die `///` Zeilen vor die Funktionen schreibt? Teste das Ergebnis am Ende mit `diff utils.rs utils_new.rs`.

#### Übung 3: Zielgruppen-Wechsel (Persona)
* **Aufgabe:** Lass Codex einen kurzen Setup-Guide im Terminal generieren. Einmal für einen erfahrenen DevOps-Engineer und einmal für einen nicht-technischen Endanwender.
* **Hinweis:** Übergib in beiden Fällen den exakt gleichen Code (`cat src/setup.rs`), ändere aber die Zielgruppen-Persona im Prompt. Vergleiche die Sprache der beiden Outputs.

### 🛡️ Große Handbücher (mdBook) strukturieren

#### Übung 4: Ein Inhaltsverzeichnis (SUMMARY) entwerfen
* **Aufgabe:** Du willst ein komplettes mdBook-Handbuch schreiben. Lass Codex all deine `src/`-Dateien analysieren und ein logisches Inhaltsverzeichnis (im exakten Format einer mdBook `SUMMARY.md`) auf der Konsole ausgeben.
* **Hinweis:** Welche Shell-Wildcards (z.B. `cat src/*.rs`) kannst du geschickt nutzen, um mehrere Dateien gleichzeitig an Codex zu übergeben, ohne jede einzeln tippen zu müssen?

#### Übung 5: Kapitel iterativ schreiben lassen
* **Aufgabe:** Nimm dir das erste generierte Kapitel vor. Übergib Codex nur die spezifischen Dateien, die für dieses eine Kapitel relevant sind, und leite den Output in `kapitel_1.md` um.
* **Hinweis:** Da Codex CLI meist zustandslos ("stateless") arbeitet, ist dein Kontext nach jedem Shell-Befehl frisch. Das ist hier ein riesiger Vorteil! So verhinderst du, dass die KI Halluzinationen oder Wiederholungen aus dem vorherigen Kapitel mitschleppt.

#### Übung 6: Architektur visualisieren (Mermaid)
* **Aufgabe:** Bitte Codex direkt über die Shell: "Analysiere diesen Code und generiere mir ausschließlich einen Mermaid.js Graphen (als reinen Code-Block), der den internen Datenfluss zeigt."
* **Hinweis:** Leite den Output in eine Datei um und binde sie testweise in eine Markdown-Vorschau ein, um den grafischen Output zu überprüfen.

### 🔄 Bessere Lösungen durch Dokumentation finden

#### Übung 7: Dokumentation exakt aus Tests ableiten
* **Aufgabe:** Du hast eine Logik-Datei `calc.rs` und die dazu passenden Tests in `tests/calc_tests.rs`. Übergib Codex *nur* die Test-Datei über die Pipe und fordere ein kurzes Nutzer-Handbuch an.
* **Hinweis:** Tests sind oft die ehrlichste Doku. Codex wird die `assert_eq!` Anweisungen nutzen, um absolut fehlerfreie und garantierte Code-Beispiele für die Anleitung zu schreiben.

#### Übung 8: Automatische Übersetzung per Shell-Skript
* **Aufgabe:** Deine `README.md` ist auf Deutsch. Nutze Codex, um sie vollautomatisch zu übersetzen: (z.B. `cat README.md | codex "..." > README_en.md`).
* **Hinweis:** Dieser simple Shell-Einzeiler eignet sich perfekt für automatisierte CI/CD-Pipelines (z.B. in GitHub Actions), um mehrsprachige Handbücher immer synchron zu halten!

#### Übung 9: Das Handbuch deckt Bad-Design auf
* **Aufgabe:** Der ultimative Architektur-Check! Übergib deine komplexeste `config.rs` und fordere: "Schreibe eine Endnutzer-Anleitung für diese Konfigurationsdatei. Wenn dir dabei jedoch auffällt, dass Parameter unlogisch benannt sind oder extrem schwer zu erklären sind, gib KEINE Anleitung aus, sondern schlage mir stattdessen ein hartes architektonisches Refactoring vor."
* **Hinweis:** Dies zwingt die KI aktiv, auf "bessere Lösungen" zu kommen. Wenn Code zu schwer ist, um ihn im Terminal simpel zu erklären, ist das Feature-Design oft schlichtweg schlecht.
