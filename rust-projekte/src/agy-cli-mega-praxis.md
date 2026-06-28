# 🚀 Antigravity CLI – Der 100+ Praxis-Übungen Katalog

Willkommen zum ultimativen Praxis-Katalog! Hier findest du über 100 extrem kompakte Übungen, um die Antigravity CLI und die Arbeit mit KI-Agenten zu meistern.

**Regel für diese Lektion:** Es gibt hier keine fertigen Codelösungen! Du sollst die CLI selbst ausprobieren und den Agenten durch gezielte Prompts (Anweisungen) steuern.

---

## 1. Workflows & Steuerung
*Theorie:* Mit der Antigravity CLI steuerst du den Assistenten und lenkst ihn in die richtige Richtung. Die Kontrolle liegt immer bei dir.

1. **Aufgabe:** Starte die CLI. *Hinweis:* Gib einfach `agy` im Terminal ein.
2. **Aufgabe:** Stoppe eine zu lange oder unerwünschte Antwort des Agenten. *Hinweis:* Verwende die Tastenkombination `Strg+C`.
3. **Aufgabe:** Frag die CLI nach deinem aktuellen Arbeitsverzeichnis. *Hinweis:* Frage den Agenten: "Wo befinde ich mich im Dateisystem?".
4. **Aufgabe:** Lass den Agenten eine neue, leere Datei für Notizen anlegen. *Hinweis:* Nenne den genauen Dateinamen in deiner Anfrage.
5. **Aufgabe:** Fordere eine kurze Erklärung der wichtigsten CLI-Befehle an. *Hinweis:* Bitte den Agenten um eine kompakte Übersicht seiner Fähigkeiten.
6. **Aufgabe:** Setze den aktuellen Chat-Kontext zurück, um neu zu beginnen. *Hinweis:* Nutze den Befehl `/clear` (falls konfiguriert) oder starte `agy` neu.
7. **Aufgabe:** Lass den Agenten einen Shell-Befehl ausführen, um Dateien aufzulisten. *Hinweis:* Erlaube ihm, `ls` oder `dir` vorzuschlagen und bestätige dies.
8. **Aufgabe:** Bitte den Agenten, eine Datei umzubenennen. *Hinweis:* Beschreibe genau, welche Datei welchen neuen Namen erhalten soll.
9. **Aufgabe:** Ändere die Rolle des Agenten temporär. *Hinweis:* Gib die Anweisung: "Verhalte dich ab jetzt wie ein strenger Code-Reviewer".
10. **Aufgabe:** Beende die CLI-Sitzung sauber. *Hinweis:* Tippe `exit` oder nutze `Strg+D`.
11. **Aufgabe:** Lass den Agenten den Inhalt einer bestimmten Datei lesen. *Hinweis:* "Zeige mir bitte den Inhalt von Datei X."
12. **Aufgabe:** Navigiere mithilfe des Agenten durch die Ordnerstruktur deines Projekts. *Hinweis:* Lass dir alle Unterordner auflisten.
13. **Aufgabe:** Bestätige einen vom Agenten vorgeschlagenen Terminal-Befehl. *Hinweis:* Drücke `y`, wenn er dich um Erlaubnis fragt.
14. **Aufgabe:** Lehne einen gefährlich aussehenden Vorschlag des Agenten ab. *Hinweis:* Drücke `n`, wenn er eine Aktion vorschlägt, die du nicht möchtest.
15. **Aufgabe:** Bearbeite einen vorgeschlagenen Befehl vor der Ausführung. *Hinweis:* Wähle die Option zum Editieren, um Parameter anzupassen.
16. **Aufgabe:** Bitte um eine detaillierte, schrittweise Erklärung. *Hinweis:* "Erkläre mir das in kleinen, leicht verdaulichen Schritten."
17. **Aufgabe:** Weise den Agenten an, in einer anderen Sprache zu antworten. *Hinweis:* "Antworte mir ab sofort auf Englisch."
18. **Aufgabe:** Kehre zur deutschen Sprache zurück. *Hinweis:* "Lass uns ab jetzt wieder auf Deutsch weitermachen."
19. **Aufgabe:** Lass den Agenten ein leeres Rust-Projekt anlegen. *Hinweis:* Erwähne das Kommando `cargo init` in deiner Bitte.
20. **Aufgabe:** Kontrolliere geplante Code-Änderungen vor dem Speichern. *Hinweis:* Lies die Zusammenfassung des Agenten (den Diff) genau durch.

---

## 2. Automatisieren
*Theorie:* Agenten glänzen darin, wiederkehrende Aufgaben für dich zu skripten und auszuführen.

1. **Aufgabe:** Lass ein Skript schreiben, das den aktuellen Ordner aufräumt. *Hinweis:* Beschreibe genau, welche Dateiendungen gelöscht werden sollen.
2. **Aufgabe:** Erstelle ein einfaches Backup-Skript. *Hinweis:* Lass den Agenten ein Bash-Skript vorschlagen, das wichtige Dateien kopiert.
3. **Aufgabe:** Automatiere die Ausführung von Tests. *Hinweis:* Lass den Agenten erklären, wie man `cargo test` bei Dateiänderungen automatisch startet.
4. **Aufgabe:** Schreibe ein Skript zur Code-Formatierung. *Hinweis:* Binde `cargo fmt` in ein kleines Automatisierungsskript ein.
5. **Aufgabe:** Generiere Dummy-Daten zum Testen. *Hinweis:* Lass den Agenten ein Skript schreiben, das automatisch 10 durchnummerierte Textdateien anlegt.
6. **Aufgabe:** Werte eine Log-Datei automatisch aus. *Hinweis:* Lass den Agenten einen Befehl schreiben, der alle "ERROR"-Zeilen extrahiert.
7. **Aufgabe:** Definiere einen Alias in der Shell für häufige Befehle. *Hinweis:* Frag den Agenten, wie man Aliase in der `.bashrc` oder `.zshrc` anlegt.
8. **Aufgabe:** Bereite ein einfaches Deployment vor. *Hinweis:* Frag nach einem Shell-Skript, das `cargo build --release` ausführt und die Datei verschiebt.
9. **Aufgabe:** Finde veraltete Projekt-Abhängigkeiten. *Hinweis:* Lass dir erklären, wie man Tools wie `cargo outdated` automatisiert nutzt.
10. **Aufgabe:** Ersetze einen bestimmten Begriff in mehreren Dateien. *Hinweis:* Lass den Agenten einen passenden Befehl (z.B. mit `sed` oder `rg`) erstellen.
11. **Aufgabe:** Führe einen Linter automatisiert aus. *Hinweis:* Integriere `cargo clippy` so in ein Skript, dass Warnungen in eine Datei geschrieben werden.
12. **Aufgabe:** Sammle alle "TODOs" im gesamten Code. *Hinweis:* Lass den Agenten ein Such-Skript schreiben, das alle TODO-Kommentare auflistet.
13. **Aufgabe:** Erstelle automatisch eine Dokumentation. *Hinweis:* Nutze `cargo doc` innerhalb eines Skripts und lass den Browser danach öffnen.
14. **Aufgabe:** Lass den Agenten ein klassisches `Makefile` erstellen. *Hinweis:* Erkläre ihm in Textform die gewünschten Build-Schritte.
15. **Aufgabe:** Automatiere das Packen von Releases. *Hinweis:* Lass ein Skript für `tar` oder `zip` generieren, das den fertigen Build verpackt.
16. **Aufgabe:** Zähle die Codezeilen deines Projekts. *Hinweis:* Frag nach einem Skript oder Tool, das nur `.rs` Dateien analysiert.
17. **Aufgabe:** Analysiere den Speicherplatzbedarf. *Hinweis:* Lass dir einen Befehl zeigen, der die größten Dateien im Projektverzeichnis auflistet.
18. **Aufgabe:** Bereinige das `target`-Verzeichnis regelmäßig. *Hinweis:* Lass ein Skript schreiben, das alte Build-Artefakte automatisch löscht.
19. **Aufgabe:** Generiere automatisch ein einfaches Changelog. *Hinweis:* Lass den Agenten einen Befehl vorschlagen, der die letzten Git-Commits zusammenfasst.
20. **Aufgabe:** Automatisiere den Git-Workflow. *Hinweis:* Frag nach einem Skript, das `git add`, `commit` und `push` hintereinander ausführt.

---

## 3. Projekt Wissendatenbank
*Theorie:* Die KI braucht Kontext. Je besser du dein Projekt dokumentierst, desto klüger werden die Antworten des Agenten.

1. **Aufgabe:** Speichere eine grundlegende Projekt-Beschreibung. *Hinweis:* Lass den Agenten eine ausführliche `README.md` anlegen.
2. **Aufgabe:** Dokumentiere die grobe Software-Architektur. *Hinweis:* Bitte den Agenten, die Struktur in einer neuen Markdown-Datei zu skizzieren.
3. **Aufgabe:** Lege einheitliche Coding-Richtlinien fest. *Hinweis:* Lass eine `CONTRIBUTING.md` mit Regeln für neue Entwickler erstellen.
4. **Aufgabe:** Dokumentiere häufige, bereits gelöste Fehler. *Hinweis:* Lass den Agenten ein Troubleshooting-Dokument für das Projekt anlegen.
5. **Aufgabe:** Fasse Projekt-Ideen zusammen. *Hinweis:* Gib dem Agenten lose Stichpunkte und lass ihn ein strukturiertes Konzept schreiben.
6. **Aufgabe:** Erkläre die Hauptkomponenten in eigenen Worten. *Hinweis:* Lass dir eine Übersicht der bestehenden Module generieren und speichere sie.
7. **Aufgabe:** Schreibe ein Projekt-Glossar. *Hinweis:* Bitte um Begriffserklärungen für anfängerspezifische Wörter in deinem Projekt.
8. **Aufgabe:** Dokumentiere dein Kern-Datenmodell. *Hinweis:* Lass die wichtigsten Structs des Projekts in einer Dokumentation verständlich beschreiben.
9. **Aufgabe:** Erstelle eine Onboarding-Anleitung. *Hinweis:* Schreibe auf (oder lass schreiben), was ein neuer Entwickler wissen muss, um das Projekt zu starten.
10. **Aufgabe:** Beschreibe die wichtigsten Abhängigkeiten. *Hinweis:* Lass den Agenten die `Cargo.toml` lesen und in eigenen Worten erklären.
11. **Aufgabe:** Notiere systematisch offene Fragen. *Hinweis:* Lege ein Dokument `FRAGEN.md` an und fülle es mit Unklarheiten.
12. **Aufgabe:** Fasse wichtige Design-Entscheidungen zusammen. *Hinweis:* Führe ein sogenanntes Architectural Decision Record (ADR) ein.
13. **Aufgabe:** Dokumentiere deine Teststrategie. *Hinweis:* Beschreibe schriftlich, welche Teile des Codes wie getestet werden sollen.
14. **Aufgabe:** Erstelle eine Meilenstein-Roadmap. *Hinweis:* Lass den Agenten die nächsten großen Schritte für dein Projekt strukturieren.
15. **Aufgabe:** Verknüpfe deine Dokumente untereinander. *Hinweis:* Achte darauf, dass sich die Markdown-Dateien sinnvoll aufeinander beziehen (Links).
16. **Aufgabe:** Nutze den Agenten zur Suche in deiner Wissensbasis. *Hinweis:* Frag ihn, in welcher Datei ein bestimmtes Konzept erklärt wird.
17. **Aufgabe:** Halte alte Dokumentationen aktuell. *Hinweis:* Lass den Agenten prüfen, ob eine alte Doku noch zum aktuellen Code passt.
18. **Aufgabe:** Erstelle textbasierte Diagramme. *Hinweis:* Lass den Agenten Abläufe als Mermaid-Code in eine Markdown-Datei schreiben.
19. **Aufgabe:** Halte "Lessons Learned" fest. *Hinweis:* Was lief beim letzten Feature gut, was schlecht? Lass den Agenten eine Zusammenfassung schreiben.
20. **Aufgabe:** Indexiere deine Dokumentation. *Hinweis:* Lass den Agenten ein Inhaltsverzeichnis über alle Markdown-Dateien im Ordner generieren.

---

## 4. Auf bessere Lösungen kommen
*Theorie:* Nutze die KI nicht nur als Tippse, sondern als Sparringspartner für bessere Architektur und sauberen Code.

1. **Aufgabe:** Fordere ein kritisches Code-Review an. *Hinweis:* Frage: "Wie kann ich diese spezielle Funktion eleganter oder sicherer schreiben?"
2. **Aufgabe:** Frage nach etablierten Design-Patterns. *Hinweis:* "Welches Software-Entwurfsmuster passt hier am besten für mein Problem?"
3. **Aufgabe:** Suche nach Performance-Optimierungen. *Hinweis:* Frag den Agenten: "Wo könnte hier ein potenzieller Flaschenhals liegen?"
4. **Aufgabe:** Verbessere dein Error-Handling. *Hinweis:* Lass dir Tipps geben, wie man Fehler hilfreicher an den Nutzer zurückgibt.
5. **Aufgabe:** Refaktorisiere eine unübersichtliche Funktion. *Hinweis:* Bitte darum, eine große Funktion logisch in drei kleinere zu zerlegen.
6. **Aufgabe:** Hinterfrage deine eigene Architektur. *Hinweis:* Frage ehrlich: "Was sind die größten Nachteile meines aktuellen Ansatzes?"
7. **Aufgabe:** Reduziere tiefe Verschachtelungen. *Hinweis:* "Wie kann ich diesen Code mit vielen if-else-Blöcken vereinfachen?"
8. **Aufgabe:** Erhöhe die Robustheit deiner Tests. *Hinweis:* "Für welche kritischen Randfälle (Edge Cases) fehlen mir hier noch Tests?"
9. **Aufgabe:** Suche nach Alternativen zu einer Bibliothek. *Hinweis:* "Gibt es ein leichtgewichtigeres Crate für genau diese kleine Aufgabe?"
10. **Aufgabe:** Lass den Agenten Edge-Cases finden. *Hinweis:* "Was passiert mit meinem Code, wenn die Eingabe unerwartet leer ist?"
11. **Aufgabe:** Verbessere die allgemeine Lesbarkeit. *Hinweis:* "Welche Variablen-Namen wären hier deutlich sprechender?"
12. **Aufgabe:** Optimiere den Speicherverbrauch. *Hinweis:* "Kann ich an dieser Stelle Referenzen statt teurer Klone (`.clone()`) verwenden?"
13. **Aufgabe:** Modernisiere veraltete Methoden. *Hinweis:* Frag, ob es für dein Problem modernere Wege in der aktuellsten Rust-Version gibt.
14. **Aufgabe:** Schreibe "idiomatischeres" Rust. *Hinweis:* Lass dir typische Rust-Konventionen (z.B. Iterator-Methoden statt for-Schleifen) vorschlagen.
15. **Aufgabe:** Reduziere externe Abhängigkeiten. *Hinweis:* "Wie aufwendig wäre es, diese Funktion ohne die externe Bibliothek selbst zu schreiben?"
16. **Aufgabe:** Führe ein kreatives Brainstorming durch. *Hinweis:* Lass den Agenten 5 völlig verschiedene Lösungsansätze für ein Problem skizzieren.
17. **Aufgabe:** Vergleiche zwei Ansätze objektiv. *Hinweis:* "Was sind die Vor- und Nachteile von Ansatz A im Vergleich zu Ansatz B?"
18. **Aufgabe:** Lass den Agenten die Rolle eines Hackers einnehmen. *Hinweis:* "Wie würdest du versuchen, dieses kleine Skript anzugreifen oder zum Absturz zu bringen?"
19. **Aufgabe:** Identifiziere typische "Code-Smells". *Hinweis:* "Siehst du in dieser Datei bekannte Anti-Patterns?"
20. **Aufgabe:** Bereite dich auf ein technisches Interview/Review vor. *Hinweis:* "Was würde ein Senior-Entwickler an diesem Code vermutlich bemängeln?"

---

## 5. MCP Server nutzen
*Theorie:* Das Model Context Protocol (MCP) erlaubt es dem Agenten, externe Tools, APIs und Datenbanken direkt zu nutzen.

1. **Aufgabe:** Verstehe das grundlegende Konzept von MCP. *Hinweis:* Frag den Agenten ausführlich, was ein "Model Context Protocol Server" eigentlich ist.
2. **Aufgabe:** Erfrage die Anbindung einer lokalen Datenbank. *Hinweis:* Lass dir erklären, wie ein SQLite- oder PostgreSQL-MCP-Server funktioniert.
3. **Aufgabe:** Lass die CLI theoretisch Webseiten lesen. *Hinweis:* Informiere dich über Fetch- oder Browser-MCPs zur Datenbeschaffung.
4. **Aufgabe:** Integriere externe Plattformen wie GitHub. *Hinweis:* Frage, wie ein MCP-Server helfen kann, Issues direkt im Terminal auszulesen.
5. **Aufgabe:** Frage Echtzeit-Daten ab. *Hinweis:* Finde heraus, wie ein passender MCP Wetter- oder API-Daten in den Chat bringen könnte.
6. **Aufgabe:** Erweitere die lokale Dateisuche. *Hinweis:* Informiere dich über spezialisierte Datei-Such-MCPs für extrem große Repositories.
7. **Aufgabe:** Führe komplexe Rechnungen sicher aus. *Hinweis:* Frag nach Mathematik- oder Python-Evaluierungs-MCPs.
8. **Aufgabe:** Verbinde Projektmanagement-Tools. *Hinweis:* Lass dir erklären, was nötig wäre, um via Jira-MCP-Server Tickets zu erstellen.
9. **Aufgabe:** Analysiere Code mit speziellen externen Tools. *Hinweis:* Informiere dich über die Nutzung eines Linter- oder Security-Scanner-MCPs.
10. **Aufgabe:** Übersetze Texte über externe Cloud-Dienste. *Hinweis:* Frag, ob es MCPs für DeepL oder Google Translate gibt.
11. **Aufgabe:** Erweitere die Fähigkeiten auf E-Mails. *Hinweis:* Suche nach Konzepten für einen Mail-MCP zum Lesen von Posteingängen.
12. **Aufgabe:** Steuere Hardware oder IoT. *Hinweis:* Informiere dich über Möglichkeiten, Smart-Home-Geräte (z.B. Home Assistant) per MCP anzubinden.
13. **Aufgabe:** Integriere Finanzdaten. *Hinweis:* Frag nach der Theorie hinter einem Finance-API-MCP für Aktienkurse.
14. **Aufgabe:** Verwalte Termine. *Hinweis:* Lass dir das Prinzip eines Kalender-MCPs (z.B. Google Calendar) erklären.
15. **Aufgabe:** Greife auf externe Notizen zu. *Hinweis:* Frage, wie man Tools wie Notion über einen Notion-MCP-Server anbindet.
16. **Aufgabe:** Analysiere Team-Kommunikation. *Hinweis:* Informiere dich über die Möglichkeiten eines Slack- oder Discord-MCPs.
17. **Aufgabe:** Verknüpfe Cloud-Provider. *Hinweis:* Lass dir erklären, wie ein AWS- oder Azure-MCP bei der Infrastrukturverwaltung helfen könnte.
18. **Aufgabe:** Generiere Medieninhalte. *Hinweis:* Frag, ob man Image-Generation-Tools via MCP in den Workflow einbauen kann.
19. **Aufgabe:** Analysiere komplexe Dokumente. *Hinweis:* Informiere dich über Document-Parsing-MCPs für große PDFs.
20. **Aufgabe:** Entdecke neue MCP-Ökosysteme. *Hinweis:* Lass den Agenten erklären, wo man am besten nach verfügbaren Open-Source-MCPs sucht.
