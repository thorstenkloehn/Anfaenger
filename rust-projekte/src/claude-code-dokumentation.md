# 🐚 Claude Code – Dokumentation & Handbücher erstellen

*Wie du Claude Code nutzt, um automatisiert brillante READMEs, mdBooks und nutzerfreundliche Handbücher für deine Software zu schreiben und dabei Architekturschwächen aufzudecken.*

---

## 🧠 Theorie: "Alle wissen" für gute Handbücher

Ein KI-Agent kann nur dann ein wirklich exzellentes Nutzer-Handbuch schreiben, wenn er nicht nur den reinen Quellcode ("Wie es intern funktioniert"), sondern auch die Anwender-Perspektive ("Wie man es täglich bedient") kennt. 

Um an "bessere Lösungen" und Texte zu kommen, muss der Kontext ("Alle wissen") präzise abgesteckt sein:
* **Kontext über Tests:** Unit- und Integrationstests (z.B. im Ordner `tests/`) zeigen exakt, wie eine Funktion in der Praxis aufgerufen wird. Wenn Claude die Tests liest, generiert er garantiert fehlerfreie und realistische Code-Beispiele für das Handbuch.
* **Zielgruppe definieren:** Ein Handbuch für Endnutzer (z.B. "Wie klicke ich den Button?") braucht einen völlig anderen Ton als eine API-Referenz für andere Entwickler. Du musst Claude die Persona deiner Leser im Prompt genau beschreiben.
* **Das richtige Format:** Claude kann perfekte Markdown-Dateien für Systeme wie `mdBook`, `Hugo` oder `Rustdoc` (`///`) ausgeben. Definiere strikt, welche Überschriften-Ebenen, Callouts (wie Warnungen) oder Datei-Strukturen in deinem Projekt erlaubt sind.

## ⚙️ Einstellungen & Setup

Beim Generieren großer Dokumentationen mit der Claude CLI solltest du folgende Taktiken anwenden:
* **Kontext-Hygiene (`/compact`):** Wenn du mit Claude an einem 20-seitigen Handbuch schreibst, füllt sich der Kontext-Speicher (das Token-Limit) extrem schnell. Nutze den Befehl `/compact`, um alte Entwürfe und Korrekturschleifen aus dem Gedächtnis zu löschen und nur den finalen Stand im aktiven Speicher zu behalten.
* **Dateien gezielt freigeben:** Anstatt Claude ziellos das ganze Projekt analysieren zu lassen, nenne ihm im Prompt explizit die relevanten Einstiegsdateien (z.B. "Lies nur `src/main.rs` und `src/config.rs` und dokumentiere sie").
* **Markdown-Blockierung:** Wenn Claude die fertigen `.md`-Dateien direkt auf der Festplatte speichert, achte darauf (notfalls per Prompt-Befehl), dass er den Text nicht noch einmal in einen störenden Markdown-Code-Block (wie ` ```markdown `) einhüllt.

---

## 🛠️ Praxis-Übungen: Dokumentations-Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Text-Vorlagen oder Code-Lösungen! Nimm ein eigenes, kleines Rust-Projekt und lass Claude die Dokumentation dafür von Grund auf schreiben.

### 🧭 Grundlagen: README und Code-Kommentare

#### Übung 1: Die perfekte README.md
* **Aufgabe:** Bitte Claude in der CLI: "Lies den Code im Verzeichnis `src/` und generiere mir eine professionelle `README.md`. Sie muss eine kurze Beschreibung, eine Installations-Anleitung und ein minimales Code-Beispiel enthalten."
* **Hinweis:** Überprüfe, ob Claude die nötigen Abhängigkeiten und Befehle aus der `Cargo.toml` richtig erkannt und in die Installationsanleitung übernommen hat.

#### Übung 2: Rustdoc im Bulk generieren
* **Aufgabe:** Du hast eine Datei `utils.rs` mit 5 völlig unkommentierten Funktionen. Fordere Claude auf: "Füge über jeder öffentlichen Funktion in `utils.rs` saubere Rustdoc-Kommentare (`///`) hinzu, inklusive eines `Examples` Abschnitts."
* **Hinweis:** Achte darauf, dass Claude den ausführbaren Code nicht versehentlich ändert, sondern wirklich nur die Kommentare ergänzt. Teste das Ergebnis am Ende mit `cargo doc --open`.

#### Übung 3: Zielgruppen-Wechsel (Persona)
* **Aufgabe:** Lass Claude eine Installationsanleitung für deine App schreiben. Einmal für einen extrem technischen Systemadministrator (DevOps) und einmal für einen nicht-technischen Endanwender.
* **Hinweis:** Vergleiche die ausgegebene Sprache. Hat Claude im zweiten Versuch auf Fachbegriffe wie "Environment Variables" oder "PATH" verzichtet und stattdessen einfache Klick-Pfade beschrieben?

### 🛡️ Große Handbücher (mdBook) strukturieren

#### Übung 4: Ein Inhaltsverzeichnis (SUMMARY) entwerfen
* **Aufgabe:** Du willst ein komplettes mdBook-Handbuch für deine App schreiben. Lass Claude deinen Quellcode analysieren und ein logisches Inhaltsverzeichnis (im Format einer mdBook `SUMMARY.md`) entwerfen.
* **Hinweis:** Der Prompt könnte lauten: "Entwirf eine Kapitel-Struktur für ein Nutzerhandbuch basierend auf den Features meiner Software. Speichere das Ergebnis als `src/SUMMARY.md`."

#### Übung 5: Kapitel iterativ schreiben lassen
* **Aufgabe:** Nimm dir das erste Kapitel aus Übung 4 vor. Sag Claude: "Schreibe nun den Markdown-Text für Kapitel 1. Nutze maximal 300 Wörter und füge einen Link auf Kapitel 2 hinzu."
* **Hinweis:** Wenn Claude fertig ist und die Datei gespeichert hat, nutze zwingend den Befehl `/compact`, bevor du Kapitel 2 in Auftrag gibst. Das hält die Konversation schnell und kostengünstig.

#### Übung 6: Diagramme generieren (Mermaid)
* **Aufgabe:** Ein Bild sagt mehr als tausend Worte. Bitte Claude: "Analysiere den Datenfluss in `main.rs` und generiere mir einen Mermaid.js Graphen (als Code-Block), den ich in mein Handbuch kopieren kann."
* **Hinweis:** mdBook (mit dem entsprechenden Plugin) und Markdown-Editoren können Mermaid-Codeblöcke direkt als visuelle Diagramme rendern. Probier es in deiner eigenen Vorschau aus!

### 🔄 Komplexe Doku-Workflows & Bessere Lösungen

#### Übung 7: Dokumentation aus Tests ableiten
* **Aufgabe:** Du hast eine Logik-Datei (z.B. `calc.rs`) und die dazugehörigen Tests in `tests/calc_tests.rs`. Fordere Claude auf: "Schreibe ein Nutzer-Handbuch für den Taschenrechner, aber lies *ausschließlich* die Test-Datei, um zu verstehen, wie man ihn als Nutzer bedient."
* **Hinweis:** Tests sind oft die ehrlichste Dokumentation. Claude wird die `assert_eq!` Anweisungen nutzen, um absolut fehlerfreie Code-Beispiele für das Handbuch zu generieren.

#### Übung 8: Automatische Übersetzung (I18n)
* **Aufgabe:** Deine neu generierte `README.md` ist auf Deutsch. Bitte Claude im Terminal: "Erstelle eine exakte inhaltliche Kopie dieser Datei, übersetze sie in fließendes, hochtechnisches Englisch und speichere sie als `README_en.md` ab."
* **Hinweis:** Lass Claude die neue Datei direkt über seine CLI-Rechte auf der Festplatte anlegen, anstatt den Text mühsam manuell aus dem Chatfenster zu kopieren.

#### Übung 9: Das Handbuch als Architekt (Bessere Lösungen finden)
* **Aufgabe:** Manchmal deckt erst das Schreiben von Dokumentation fundamentale Systemfehler auf. Sag Claude: "Schreibe eine Anleitung für das Befüllen meiner Konfigurations-Datei (`config.rs`). Wenn dir dabei auffällt, dass bestimmte Parameter völlig unlogisch oder extrem schwer zu erklären sind, brich das Schreiben sofort ab und schlage mir stattdessen ein besseres Architektur-Design vor."
* **Hinweis:** Dies ist der Königsweg des KI-Einsatzes! Wenn Code schwer zu dokumentieren ist, ist er in der Regel auch extrem fehleranfällig zu bedienen. Claude kann dieses "Code Smell" beim Lesen erkennen und dir ein Refactoring vorschlagen.
