# 💻 Codex CLI – MCP Server nutzen (Erweiterte Lösungen)

*Wie du das Model Context Protocol (MCP) mit der Codex CLI verknüpfst, um reale Daten in deine Bash-Workflows einzuspeisen und fundiertere Architektur-Entscheidungen zu treffen.*

---

## 🧠 Theorie: "Alle wissen" durch externe Daten (MCP)

Die Codex CLI ist ein mächtiges Werkzeug, aber von Haus aus oft auf den statischen Text beschränkt, den du ihr über die Kommandozeile (z.B. über `cat` oder Pipes) übergibst. Wenn du jedoch komplexe Software-Architekturen entwirfst, reicht dieser statische Kontext ("Alle wissen") häufig nicht aus.

Das **Model Context Protocol (MCP)** löst dieses Problem auf standardisierte Weise:
* **Dynamischer Kontext:** Mit MCP kann der KI-Agent hinter der Codex CLI selbstständig externe Live-Quellen anzapfen – sei es eine Datenbank, ein Jira-Board oder eine interne Web-API. Das Wissen ist nicht mehr statisch, sondern topaktuell.
* **Die beste Lösung finden:** Wenn Codex deine echte PostgreSQL-Datenbank über MCP lesen kann, anstatt blind zu raten, wie das Schema wohl aussieht, sind die vorgeschlagenen Refactorings und Rust-Structs zu 100% fehlerfrei und auf die Realität abgestimmt.
* **CLI-Integration:** Da die Codex CLI ein reines Terminal-Tool ist, wird MCP meist auf zwei Wegen eingebunden: Entweder nativ über Tool-Plugins in der Konfigurationsdatei oder durch geschicktes Kombinieren von unabhängigen MCP-Clients mit Standard-Linux-Pipes (`|`).

## ⚙️ Einstellungen & Setup

Um MCP in der Shell mit Codex zu nutzen, musst du die entsprechende Infrastruktur aufsetzen:
* **Native Plugins prüfen:** Untersuche die Hilfe (`codex --help`), ob die CLI direkte Startargumente wie `--mcp-server`, `--tools` oder `--plugins` anbietet, um externe Server-Prozesse anzubinden.
* **Konfigurationsdatei (`.codexrc`):** Oft werden externe Tools und Server-Verbindungen dauerhaft in einer versteckten Konfigurationsdatei deines Benutzerprofils verankert.
* **Die Bash-Pipe-Alternative:** Falls die CLI MCP in deiner Version nicht nativ unterstützt, kannst du einen eigenständigen Kommandozeilen-MCP-Client nutzen und dessen JSON-Output direkt in Codex umleiten (z.B. `mcp-cli query db | codex "Analysiere dieses Schema und refactore den Code"`).

---

## 🛠️ Praxis-Übungen: MCP Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Bash-Skripte! Erforsche die Dokumentation deiner CLI, trainiere den Umgang mit Linux-Pipes und finde die Syntax selbst heraus.

### 🧭 MCP Setup & Inspektion

#### Übung 1: Den MCP-Server konfigurieren
* **Aufgabe:** Such dir einen simplen, Open-Source MCP-Server für SQLite. Finde heraus, wie du diesen Server in der Codex CLI registrierst (z.B. über die `.codexrc` oder ein Plugin-Verzeichnis).
* **Hinweis:** Suche in der Dokumentation nach den entscheidenden Begriffen wie "Tool calling", "Plugins" oder "MCP Server".

#### Übung 2: Werkzeuge (Tools) auflisten
* **Aufgabe:** Du hast den Server erfolgreich eingebunden. Wie listest du nun im Terminal auf, welche neuen Fähigkeiten (Tools) Codex jetzt zur Verfügung stehen?
* **Hinweis:** Gibt es einen nativen Befehl wie `codex tools list` oder musst du die KI im interaktiven Modus mit `codex "Welche ausführbaren Tools hast du?"` direkt fragen?

#### Übung 3: Die Pipe-Alternative (Fallback Workflow)
* **Aufgabe:** Nimm an, Codex unterstützt in deiner spezifischen Version MCP nicht nativ. Lade dir einen simplen CLI-basierten MCP-Client herunter.
* **Hinweis:** Wie leitest du den Text-Output dieses externen Clients in der Bash sauber so um, dass Codex ihn als initialen System-Kontext (`-p`) für die Beantwortung deiner Architektur-Frage nutzt?

### 🛡️ Lösungsfindung mit Echtzeit-Daten

#### Übung 4: Das reale Schema abfragen
* **Aufgabe:** Verbinde eine lokale SQLite-Testdatenbank. Bitte Codex über die CLI: "Nutze dein Datenbank-Tool, um das Schema von `test.db` auszulesen, und generiere mir exakt dazu passende Rust `structs`."
* **Hinweis:** Prüfe in der Konsolenausgabe, ob Codex wirklich selbstständig den Zwischenschritt (den "Tool Call" an den MCP-Server) ausführt, bevor der fertige Code generiert wird.

#### Übung 5: Performance-Refactoring durch Live-Daten
* **Aufgabe:** Du hast zehntausende Zeilen Testdaten in der Datenbank. Frag Codex in der Shell: "Analysiere über MCP die Tabelle `users`. Ist ein Index auf der Spalte `email`? Falls nicht, skizziere mir 2 Architektur-Ansätze, wie ich die Suche im Rust-Backend massiv beschleunige."
* **Hinweis:** Codex soll das physische Fehlen des Indexes in der Livedatenbank erkennen und dir daraufhin raten, entweder die DB zu optimieren oder einen In-Memory-Cache in Rust zu entwerfen.

#### Übung 6: Umgang mit Tool-Abstürzen
* **Aufgabe:** Zwinge Codex im Prompt dazu, eine offensichtlich ungültige SQL-Query über das MCP-Tool auszuführen.
* **Hinweis:** Beobachte in der Konsole, was passiert, wenn das MCP-Tool einen harten Fehler zurückwirft. Kann Codex den Fehler selbst analysieren, heilen und sofort einen neuen, korrekten Versuch starten?

### 🔄 Komplexe Schnittstellen & Eigene Server

#### Übung 7: Strikte Tool-Nutzung erzwingen
* **Aufgabe:** Manchmal halluziniert die KI lieber ein fiktives DB-Schema, anstatt das etwas langsamere MCP-Tool aufzurufen.
* **Hinweis:** Übe striktes Prompt-Engineering: `codex "Du MUSST zwingend das Tool 'execute_query' verwenden, um die Live-Daten abzugleichen. Antworte auf keinen Fall aus deinem Trainings-Gedächtnis!"`

#### Übung 8: Web-Scraping MCP nutzen
* **Aufgabe:** Binde einen MCP-Server ein, der externe Webseiten lesen kann (z.B. den `puppeteer` oder `fetch` Server). 
* **Hinweis:** Gib Codex in der Konsole den Link zu einem aktuellen GitHub-Issue und sage: "Lies diese URL via MCP, fasse den Fehler zusammen und schreibe den Rust-Code, um den Bug in meinem aktuellen Workspace zu fixen."

#### Übung 9: Theorie: Einen eigenen MCP-Server in Rust schreiben
* **Aufgabe:** Stell dir vor, du brauchst zwingend Zugriff auf eine proprietäre, hausinterne API, für die es auf GitHub keinen fertigen MCP-Server gibt. 
* **Hinweis:** Frag Codex in der Konsole: "Erkläre mir konzeptionell auf Deutsch, wie das Model Context Protocol technisch aufgebaut ist, und skizziere mir die Architektur eines eigenen MCP-Servers in Rust."
