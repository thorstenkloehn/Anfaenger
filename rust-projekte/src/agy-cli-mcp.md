# 🚀 Antigravity CLI (`agy`) – MCP Server nutzen (Erweiterte Lösungen)

*Wie du das Model Context Protocol (MCP) in AGY einbindest, um deinen Agenten mit Datenbanken, Web-APIs und externen Tools zu vernetzen.*

---

## 🧠 Theorie: "Alle wissen" wird grenzenlos

Bisher wusste dein AGY-Agent nur das, was im aktuellen lokalen Datei-Workspace lag. Wenn du jedoch eine komplexe Rust-Software baust, die mit einer Live-Datenbank, Cloud-Diensten oder Drittanbieter-APIs spricht, stößt dieser isolierte Kontext schnell an seine Grenzen.

Das **Model Context Protocol (MCP)** durchbricht diese Grenze:
* **Echte Daten statt blinder Annahmen:** Anstatt AGY raten zu lassen ("Wie sieht meine Datenbank wohl aus?"), verbindest du einen SQLite-, Postgres- oder GitHub-MCP-Server. AGY liest das echte Schema live aus und schlägt Architektur-Verbesserungen auf Basis der Realität vor.
* **Sichere Tool-Delegation:** MCP-Server laufen als kleine, isolierte Skripte lokal auf deinem Rechner. AGY bekommt nur die Befehle (Tools) zur Verfügung gestellt, die der MCP-Server ausdrücklich freigibt (z.B. "Darf Tabellen lesen", aber "Darf keine Tabellen löschen").
* **Die beste Lösung finden:** Wenn AGY Jira-Tickets lesen, Sentry-Fehler-Logs analysieren oder eine externe REST-API live abfragen kann, werden seine Refactoring-Vorschläge um ein Vielfaches präziser und wertvoller.

## ⚙️ Einstellungen & Setup

Um MCP-Server in AGY zu konfigurieren, nutzt du die eingebauten Systeme der CLI:
* **Die `settings.json`:** Die Konfiguration von MCP-Servern erfolgt meist direkt in den AGY-Einstellungen (z.B. über `/config` oder in der Datei `~/.gemini/config/settings.json`). Dort trägst du unter `mcpServers` den Namen und den Startbefehl (wie `npx` oder `uvx`) des Servers ein.
* **Der Slash-Befehl `/mcp`:** In der laufenden CLI kannst du dir mit `/mcp` jederzeit anzeigen lassen, welche externen Server aktuell erfolgreich verbunden sind und welche spezifischen Tools sie dem Agenten bereitstellen.
* **Tool-Permissions:** Stelle sicher, dass deine `toolPermission` in den Einstellungen so konfiguriert ist, dass AGY Werkzeuge auch gefahrlos (z.B. im Sandbox-Modus) aufrufen darf.

---

## 🛠️ Praxis-Übungen: MCP Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Es gibt hier keine fertigen JSON-Configs oder Copy-Paste-Skripte! Erforsche die Einstellungen in der CLI (`/config`), recherchiere MCP-Server im Netz und teste die Interaktion mit dem Agenten selbstständig.

### 🧭 MCP Setup & Inspektion

#### Übung 1: Einen MCP-Server eintragen
* **Aufgabe:** Such dir im Internet einen Open-Source MCP-Server (z.B. den offiziellen `sqlite` Server von Anthropic). Finde heraus, wie du diesen Server im JSON-Format in die Konfiguration von Antigravity eintragen kannst.
* **Hinweis:** Öffne die Einstellungen (meist `~/.gemini/config/settings.json`) und suche nach der Struktur für `mcpServers`.

#### Übung 2: Die Live-Verbindung prüfen
* **Aufgabe:** Du hast den Server eingetragen und AGY neu gestartet. Wie überprüfst du nun in der laufenden Chat-Sitzung, ob AGY den externen Server erkannt hat?
* **Hinweis:** Tippe den Befehl `/mcp` in die CLI. Zeigt die Liste den neuen Server als "verbunden" an?

#### Übung 3: Werkzeuge (Tools) untersuchen
* **Aufgabe:** Ein verbundener MCP-Server liefert "Tools" (neue Fähigkeiten). Finde heraus, welche exakten Funktionen AGY durch deinen neuen Server ausführen kann.
* **Hinweis:** Frag AGY im Chat direkt: "Welche Tools stellt dir der aktuell verbundene MCP-Server zur Verfügung und welche Parameter muss ich angeben, damit du sie nutzt?"

### 🛡️ Lösungsfindung mit echten Daten

#### Übung 4: Das reale Schema abfragen
* **Aufgabe:** Verbinde eine lokale SQLite-Testdatenbank per MCP. Bitte AGY: "Nutze dein MCP-Tool, um die Tabellenstruktur meiner Datenbank komplett zu lesen, und generiere mir exakt dazu passende Rust `structs`."
* **Hinweis:** Beobachte die CLI-Ausgabe aufmerksam. Siehst du den Moment (den "Tool Call"), in dem AGY aktiv die Datenbank abfragt, bevor er den Rust-Code generiert?

#### Übung 5: Bessere Architektur durch Live-Daten
* **Aufgabe:** Du hast zehntausende Zeilen Testdaten in deiner lokalen Datenbank. Frag AGY: "Analysiere über dein MCP-Tool die Tabelle `users`. Ist ein Index auf der Spalte `email` gesetzt? Falls nicht, skizziere mir 2 architektonische Ansätze, wie ich Logins im Rust-Backend performanter mache."
* **Hinweis:** Hier entfaltet MCP seine volle Stärke: Der Agent kombiniert dein abstraktes Architektur-Problem mit dem physischen Echtzeit-Zustand deiner Infrastruktur.

#### Übung 6: Tool-Abstürze provozieren
* **Aufgabe:** Zwinge AGY im Prompt dazu, eine SQL-Query über das MCP-Tool auszuführen, die absichtlich einen groben Syntax-Fehler enthält.
* **Hinweis:** Wie reagiert AGY auf die Fehlermeldung des MCP-Servers? Entschuldigt sich der Agent und korrigiert den Fehler im nächsten Versuch völlig selbstständig (Self-Healing)?

### 🔄 Komplexe Schnittstellen & Eigene Server

#### Übung 7: Den Prompt auf Tools fokussieren
* **Aufgabe:** Manchmal ist die KI "faul" und rät eine theoretische Lösung, anstatt das verbundene MCP-Tool zu nutzen, um echte Fakten zu sammeln.
* **Hinweis:** Übe hartes Prompt-Engineering: "Du MUSST zwingend das Tool `read_query` verwenden, um die Live-Daten zu überprüfen, bevor du mir überhaupt eine Antwort gibst. Rate nicht!"

#### Übung 8: Externe Web-Inhalte einlesen
* **Aufgabe:** Binde testweise einen MCP-Server ein, der Webseiten lesen kann (z.B. den `fetch` oder `puppeteer` Server). 
* **Hinweis:** Gib AGY den Link zu einer Rust-Crate-Dokumentation und sage: "Lies diese externe URL via MCP und erkläre mir, wie ich das Crate in mein Projekt integriere."

#### Übung 9: Theorie: Einen eigenen MCP-Server planen
* **Aufgabe:** Du hast in deiner Firma eine alte, interne REST-API, für die es natürlich keinen fertigen MCP-Server auf dem Markt gibt. 
* **Hinweis:** Frage AGY interaktiv im Chat: "Erkläre mir konzeptionell auf Deutsch, wie das Model Context Protocol unter der Haube funktioniert und wie ich einen simplen, eigenen MCP-Server in Rust programmieren könnte, um unsere Firmen-API anzubinden."
