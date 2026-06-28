# 💻 Codex / OpenAI – Das offizielle SDK nutzen

*Wie du die Codex CLI verlässt und die extrem mächtige OpenAI API direkt in deinen Code integrierst, um strukturierte Daten und autarke KI-Workflows zu generieren.*

---

## 🧠 Theorie: Volle Kontrolle durch die Programmierschnittstelle (API)

Die Codex CLI ist im Prinzip nur ein kleiner, nützlicher Kommandozeilen-Wrapper um die echte OpenAI API. Wenn du jedoch professionelle KI-Applikationen, eigene TUI-Tools (Terminal User Interfaces) oder hochspezifische Code-Generatoren für deine Firma bauen willst, kommst du nicht umhin, direkt das **OpenAI SDK** zu nutzen.

* **Sprachenvielfalt:** OpenAI bietet stark gepflegte offizielle SDKs für Python und Node.js an. In der Rust-Welt hat sich das Open-Source Crate `async-openai` als hochperformanter Quasi-Standard etabliert.
* **Structured Outputs:** Über das SDK kannst du das Modell kryptografisch zwingen, Antworten strikt in einem vorgegebenen JSON-Format zurückzugeben (z.B. garantiert passend zu einem Rust-`struct`). Das eliminiert Parsing-Fehler komplett.
* **Zusätzliche Endpoints:** Das SDK gibt dir nicht nur Zugriff auf normale Chat-Completions (Text), sondern auch auf Vektor-Embeddings (für semantische Suchen), Audio-Transkriptionen oder Bild-Generierung.

## ⚙️ Einstellungen & Setup

* **API Keys exportieren:** Du benötigst zwingend deinen geheimen `OPENAI_API_KEY` aus dem Entwickler-Dashboard. Stelle sicher, dass dieser sicher als Umgebungsvariable gesetzt ist, da alle SDKs ihn dort standardmäßig suchen.
* **Das richtige Paket laden:** Füge in Rust `async-openai` (und meist `tokio`) zu deiner `Cargo.toml` hinzu oder installiere in Python die Bibliothek via `pip install openai`.
* **Asynchrone Programmierung:** Moderne SDK-Aufrufe an externe APIs sind asynchron, um dein Programm nicht zu blockieren. Mach dich in Rust tiefgehend mit `tokio` (Async/Await) oder in Python mit `asyncio` vertraut.

---

## 🛠️ Praxis-Übungen: Das SDK meistern (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Scripts zum Abschreiben! Lies die offizielle OpenAI API-Dokumentation und setze die Architektur-Anforderungen selbstständig in deinem Code um.

### 🧭 Grundlagen: Requests & Streaming

#### Übung 1: Der synchrone Hello-World-Call
* **Aufgabe:** Schreibe ein minimales Skript (Rust oder Python), das das SDK importiert, ein Client-Objekt mit Authentifizierung erstellt und eine simple Chat-Anfrage (`role: "user"`) an das Modell `gpt-4o` sendet.
* **Hinweis:** Greife tief in das zurückgegebene JSON-Response-Objekt (oft `response.choices[0].message.content`), um nur den reinen Text des Modells in der Konsole auszugeben.

#### Übung 2: Streaming-Responses einbauen
* **Aufgabe:** Niemand wartet gerne 10 Sekunden auf lange Antworten. Baue deinen Code aus Übung 1 so um, dass die Antwort über einen asynchronen Stream Zeichen für Zeichen im Terminal ausgegeben wird (wie in ChatGPT).
* **Hinweis:** In Python nutzt du oft `client.chat.completions.create(stream=True)`, in Rust arbeitest du mit iterierbaren Streams aus dem `async-openai` Crate.

#### Übung 3: System-Prompt und Temperatur regeln
* **Aufgabe:** Ergänze dein Skript. Füge eine Nachricht mit der speziellen Rolle `system` am Anfang des Arrays hinzu ("Du bist ein extrem mürrischer C-Programmierer") und setze den API-Parameter `temperature` auf einen hohen Wert wie `1.5`.
* **Hinweis:** Beobachte, wie dieser hohe Temperatur-Wert die Antwort extrem kreativ (oder teilweise völlig chaotisch) macht.

### 🛡️ Strukturierte Daten erzwingen

#### Übung 4: Den JSON-Mode aktivieren
* **Aufgabe:** Fordere die KI im Prompt auf, dir eine Liste mit 3 erfundenen Datenbank-Benutzernamen zu generieren. Setze im SDK-Aufruf den Parameter `response_format` auf den Typ `json_object`.
* **Hinweis:** Achte darauf, dass du in deinem Nutzer-Prompt auch explizit erwähnst, dass die Antwort zwingend im JSON-Format ausgegeben werden muss, sonst wirft die API einen Fehler.

#### Übung 5: Structured Outputs (Schema Enforcement)
* **Aufgabe:** Der moderne Weg! Definiere im SDK-Call ein extrem strenges JSON-Schema (Structured Output Format), das zwingend die Felder `name` (als String) und `age` (als Integer) verlangt. 
* **Hinweis:** Das Modell ist nun mathematisch gezwungen, exakt dieses Schema als JSON zurückzugeben. Kein fehleranfälliges Parsen von chaotischen Markdown-Blöcken (` ```json `) mehr!

#### Übung 6: Rust Structs direkt deserialisieren
* **Aufgabe:** Wenn du Rust nutzt: Nimm die garantierte JSON-Antwort aus Übung 5 und nutze das Crate `serde_json`, um den zurückgegebenen String sofort und fehlerfrei in ein stark typisiertes Rust `struct User { name: String, age: u8 }` zu verwandeln.
* **Hinweis:** Das ist die absolute Basis für absturzsichere, typisierte KI-Pipelines.

### 🔄 Embeddings & Tool Calling

#### Übung 7: Function Calling aufsetzen
* **Aufgabe:** Übergib dem SDK eine JSON-Tool-Definition für eine Funktion `get_file_size(filepath)`. Frage das Modell im Chat: "Wie groß ist die Datei `main.rs`?"
* **Hinweis:** Das Modell wird dir nicht mit Text antworten, sondern den Aufruf deiner Funktion anfordern. Fange diesen Wunsch (`finish_reason == "tool_calls"`) im Code ab.

#### Übung 8: Vektor-Embeddings erzeugen
* **Aufgabe:** Nutze nicht den normalen `/chat/completions` Endpoint, sondern den speziellen `/embeddings` Endpoint im SDK. Übergib den Satz "Hallo Welt" und lass dir den riesigen generierten Float-Vektor (die mathematische Repräsentation der Bedeutung) ausgeben.
* **Hinweis:** Embeddings sind der essenzielle Schlüssel, um eigene RAG (Retrieval-Augmented Generation) Systeme oder smarte Wissensdatenbanken in Rust zu bauen.

#### Übung 9: Die eigene interaktive CLI programmieren
* **Aufgabe:** Baue eine rudimentäre, unendliche interaktive Shell-Schleife (`while true`). Der User tippt Text ein, das SDK schickt es (inklusive der im Array mitgeführten vorherigen Historie) an OpenAI, streamt die Antwort zurück, und der User kann erneut tippen.
* **Hinweis:** Herzlichen Glückwunsch, du hast soeben deine allererste eigene KI-CLI von Grund auf selbst programmiert!
