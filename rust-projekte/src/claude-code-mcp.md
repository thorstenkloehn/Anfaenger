# 🐚 Claude Code – MCP Server nutzen (Erweiterte Lösungen)

*Wie du das Model Context Protocol (MCP) einsetzt, um Claude Code mit neuen Werkzeugen (Datenbanken, APIs, Fremdsystemen) auszustatten und so auf völlig neue Lösungswege zu kommen.*

---

## 🧠 Theorie: "Alle wissen" durch MCP

Bisher war das Wissen ("Alle wissen") von Claude Code streng auf deinen lokalen Dateiordner und dein Git-Repository beschränkt. Aber was ist, wenn eine "bessere Lösung" für deinen Code davon abhängt, wie das exakte Schema deiner Produktions-Datenbank aussieht oder was das DevOps-Team im letzten Jira-Ticket geschrieben hat?

Hier kommt das **Model Context Protocol (MCP)** ins Spiel. MCP ist ein offener Standard, der funktioniert wie ein USB-Stecker für KI-Agenten:
* **Tool-Erweiterung:** Du kannst Claude mit einem externen MCP-Server verbinden. Plötzlich hat Claude völlig neue, ausführbare Befehle wie `query_database`, `search_github_issues` oder `read_slack_channel` zur Verfügung.
* **Der ultimative Kontext:** Wenn Claude direkt auf deine laufende SQLite-Datenbank oder deine lebende API-Dokumentation (via MCP) zugreifen kann, erfindet er keine Annahmen mehr. Er liefert Architektur-Vorschläge auf Basis der *echten*, aktuellen Datenstruktur.
* **Sicherheit:** MCP-Server laufen in der Regel lokal auf deiner Maschine. Du kontrollierst präzise, welche Tools der Agent aufrufen darf.

## ⚙️ Einstellungen & Setup

Um MCP in Claude Code zu aktivieren, nutzt du primär die integrierten Konfigurations-Befehle der CLI:
* **Server hinzufügen:** Finde den CLI-Befehl (oft in der Form `claude mcp add <Name> <Kommando>`), um einen lokal installierten MCP-Server (z.B. ein bereitgestelltes npm- oder Python-Skript) an die CLI anzubinden.
* **Server verwalten:** Lerne, wie du dir die aktuell aktiven Server und deren verfügbare "Tools" anzeigen lässt (z.B. `claude mcp list`).
* **Konfigurationsdatei:** Im Hintergrund speichert Claude diese Verbindungen in einer Konfigurationsdatei (oft global unter `~/.claude.json` oder projektbasiert). Lerne, diese Datei zu prüfen, falls Verbindungsprobleme auftreten.

---

## 🛠️ Praxis-Übungen: MCP Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Scripts zum Abtippen! Nutze die CLI-Hilfe (`claude mcp --help`), um die genauen Parameter zu finden, und teste die Workflows live in deinem Terminal.

### 🧭 MCP Grundlagen & Setup

#### Übung 1: Den ersten MCP Server anbinden
* **Aufgabe:** Es gibt unzählige Open-Source MCP-Server (z.B. für GitHub, PostgreSQL oder Web-Scraping). Such dir den offiziellen "SQLite MCP Server" (oft über `npx` oder `uvx` direkt ausführbar) und binde ihn in deine Claude CLI ein.
* **Hinweis:** Nutze den Befehl `claude mcp add ...`. Prüfe danach mit dem List-Befehl der CLI, ob der Server wirklich den Status "connected" hat.

#### Übung 2: Die neuen Werkzeuge erkunden
* **Aufgabe:** Du hast den MCP-Server erfolgreich verbunden. Aber welche neuen Superkräfte hat Claude jetzt genau im Detail?
* **Hinweis:** Frag Claude direkt im normalen Chat: "Welche neuen MCP-Tools stehen dir durch den SQLite-Server zur Verfügung und was machen sie genau?" Er wird dir eine detaillierte Liste (z.B. `read_query`, `list_tables`) zurückgeben.

#### Übung 3: Einen MCP Server entfernen
* **Aufgabe:** Du brauchst die Datenbank-Verbindung für das aktuelle Refactoring nicht mehr und möchtest den Agenten aus Sicherheitsgründen wieder einschränken.
* **Hinweis:** Finde den passenden CLI-Befehl heraus (z.B. `claude mcp remove`), um den Server dauerhaft abzukoppeln.

### 🛡️ Lösungsfindung mit Echtzeit-Daten

#### Übung 4: Das reale Schema abfragen
* **Aufgabe:** Lege eine simple SQLite-Datenbank `test.db` an, erstelle zwei Tabellen und verbinde sie per MCP. Bitte Claude: "Nutze dein MCP-Tool, um die Tabellenstruktur von `test.db` auszulesen, und generiere mir dazu exakt passende Rust `structs`."
* **Hinweis:** Prüfe in der Konsolenausgabe, ob Claude wirklich aktiv das externe Tool aufruft (oft durch eine kurze Statusmeldung in der CLI sichtbar), bevor er anfängt, den Code zu generieren.

#### Übung 5: Bessere Architektur durch Live-Daten
* **Aufgabe:** Du hast fiktive User in deiner SQLite-Datenbank. Frag Claude: "Ich muss eine komplexe Suchfunktion für User schreiben. Analysiere über MCP, ob ein Datenbank-Index auf der Spalte `email` liegt. Wenn nicht, skizziere mir 2 architektonische Ansätze, wie ich die Suche im Rust-Backend performant löse."
* **Hinweis:** Das ist der Kern von "bessere Lösungen finden": Claude kombiniert die hart abgefragte DB-Struktur (via MCP) mit seinem Architektur-Wissen, statt blindlings Code zu raten.

#### Übung 6: Tool-Fehler beheben
* **Aufgabe:** Zwinge Claude dazu, einen absichtlich fehlerhaften oder ungültigen SQL-Befehl über das MCP-Tool an deine Datenbank zu senden. 
* **Hinweis:** Beobachte aufmerksam, wie Claude mit dem Fehler-Output des MCP-Servers umgeht. Korrigiert der Agent den Befehl nach der Fehlermeldung selbstständig und versucht es in einer iterativen Schleife erneut?

### 🔄 Komplexe Schnittstellen & Eigene Server

#### Übung 7: GitHub MCP für Bug-Fixes
* **Aufgabe:** Binde testweise den offiziellen GitHub-MCP-Server ein. Erstelle ein fiktives Issue in einem deiner privaten Test-Repositories mit einem kurzen Bug-Report.
* **Hinweis:** Prompt in der CLI: "Nutze dein MCP-Tool, um das Issue #12 in meinem Repository zu lesen. Refactore danach meinen Code so, dass der beschriebene Fehler behoben wird."

#### Übung 8: Den Prompt auf Tools fokussieren
* **Aufgabe:** Manchmal "vergisst" die KI, dass sie neue MCP-Tools hat, und versucht, Probleme rein theoretisch zu beantworten.
* **Hinweis:** Trainiere dein Prompt-Engineering, um den Einsatz zu erzwingen: "Du MUSS das Tool `execute_query` verwenden, um die Live-Daten zu prüfen, bevor du mir eine Antwort gibst. Rate nicht herum!"

#### Übung 9: Theorie: Einen eigenen MCP Server planen
* **Aufgabe:** Stell dir vor, deine Firma hat eine geheime, interne REST-API für Benutzerdaten. Da es dafür keinen fertigen MCP-Server auf dem Markt gibt, müsstest du selbst einen schreiben.
* **Hinweis:** Frag Claude interaktiv im Chat: "Erkläre mir konzeptionell auf Deutsch, wie ich einen eigenen kleinen MCP-Server in Rust programmieren würde, um unsere interne API an dich als KI-Agent anzubinden."
