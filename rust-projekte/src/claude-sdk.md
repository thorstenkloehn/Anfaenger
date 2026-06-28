# 🐚 Claude Code – Das offizielle SDK nutzen

*Wie du die CLI verlässt und Anthropic's Claude direkt in deinen eigenen Rust- oder Python-Code einbaust, um maßgeschneiderte Agenten zu programmieren.*

---

## 🧠 Theorie: Von der CLI zum eigenen Agenten

Die Claude CLI ist ein hervorragendes, vorgefertigtes Produkt für Entwickler. Doch manchmal brauchst du Claude tief integriert in deiner eigenen Softwarearchitektur – zum Beispiel als interner Chatbot auf einer Webseite, als unsichtbarer Helfer in einer CI/CD-Pipeline oder als Backend für eine eigene Terminal User Interface (TUI).

Hierfür nutzt du das offizielle **Claude SDK** (oder REST-API Wrapper für Rust).
* **Volle Kontrolle:** Mit dem SDK bestimmst du auf Code-Ebene exakt, wann ein Request an das LLM geschickt wird, wie hoch die Temperatur (Kreativität vs. Präzision) ist und wie viele Token maximal generiert werden dürfen.
* **Function Calling (Tools):** Der mächtigste Aspekt des SDKs ist, dass du Claude *deine eigenen* Funktionen (z.B. `delete_user_from_db()` oder `trigger_build()`) als Werkzeuge übergeben kannst. Claude entscheidet dann als Agent, diese Funktionen in deinem Code aufzurufen.
* **Streaming:** Anstatt sekundenlang auf die fertige Antwort zu warten, kannst du die Antwort über das SDK Wort für Wort in deine Benutzeroberfläche streamen (genau wie in der echten CLI).

## ⚙️ Einstellungen & Setup

Um das SDK zu nutzen, musst du deine Umgebung vorbereiten:
* **API Keys:** Im Gegensatz zur fertig eingeloggten CLI brauchst du für das SDK einen "nackten" API-Schlüssel aus der Anthropic Console (`ANTHROPIC_API_KEY`). Diesen setzt du am besten als Umgebungsvariable.
* **Das richtige Paket:** Suche nach dem offiziellen Python SDK (z.B. `pip install anthropic` oder `uv add anthropic`) oder nach etablierten Rust-Crates (oft wird `reqwest` für reine REST-Calls genutzt, oder inoffizielle Wrapper-Crates).
* **Kostenkontrolle:** Da du im Code – besonders bei rekursivem Tool-Calling – unbemerkt Endlosschleifen bauen kannst, setze im SDK immer harte Sicherheitslimits (wie den `max_tokens` Parameter).

---

## 🛠️ Praxis-Übungen: Das SDK meistern (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Skripte zum Abschreiben! Du musst die Dokumentation des SDKs im Netz lesen und den Code selbstständig in Rust oder Python strukturieren.

### 🧭 Grundlagen: Der erste API-Call

#### Übung 1: Hello World
* **Aufgabe:** Schreibe ein minimales Skript, das das SDK importiert, eine einfache "Hallo"-Nachricht an Claude sendet und den Antwort-Text auf der Konsole ausgibt.
* **Hinweis:** Achte darauf, dass du das richtige, aktuelle Modell (z.B. `claude-3-5-sonnet-latest`) und den zwingend erforderlichen Parameter `max_tokens` im Code übergibst.

#### Übung 2: System-Prompts injizieren
* **Aufgabe:** Erweitere dein erstes Skript. Übergib Claude einen System-Prompt (z.B. "Du bist ein extrem sarkastischer Pirat"), bevor du die eigentliche Nutzerfrage stellst.
* **Hinweis:** Im Anthropic SDK gibt es für den System-Prompt meist ein völlig separates Parameter-Feld außerhalb des eigentlichen `messages` Arrays.

#### Übung 3: Chat-Historie aufbauen
* **Aufgabe:** Baue eine einfache `while`-Schleife in deinem Terminal. Das Skript muss sich die vorherigen Fragen und Antworten im Speicher merken und dieses Array bei jedem neuen API-Call wieder mitschicken.
* **Hinweis:** Du musst eine Liste aus JSON-Objekten mit `role: "user"` und `role: "assistant"` verwalten und immer weiter anhängen.

### 🛡️ Fortgeschrittene Steuerung

#### Übung 4: Streaming aktivieren
* **Aufgabe:** Ändere deinen asynchronen API-Aufruf so um, dass der Text "live" und buchstabenweise in der Konsole erscheint.
* **Hinweis:** Suche in der SDK-Dokumentation nach dem Stichwort `stream=True` und finde heraus, wie man den Chunk-Iterator in einer Schleife ausliest.

#### Übung 5: Bilder analysieren (Vision)
* **Aufgabe:** Nutze das SDK, um ein lokales Bild (z.B. `test.png`) in den RAM einzulesen, es in Base64 zu codieren und Claude zu fragen, was auf dem Bild zu sehen ist.
* **Hinweis:** Der Payload für Bilder im Nachrichten-Array erfordert einen hochspezifischen Block-Typ (`type: "image"` und den `data` String).

### 🔄 Function Calling (Tools) programmieren

#### Übung 6: Ein Werkzeug definieren
* **Aufgabe:** Definiere ein fiktives Werkzeug namens `get_weather` in deinem Code und übergib die strikte JSON-Schema-Definition dieses Werkzeugs in den SDK-Parametern (unter `tools`).
* **Hinweis:** Du musst Claude über das Schema exakt beschreiben, welche Input-Parameter (z.B. `location` als String) das Tool zwingend erwartet.

#### Übung 7: Den Tool-Call abfangen
* **Aufgabe:** Frag Claude: "Wie ist das Wetter heute in Berlin?". Das SDK wird dir nun keinen Text antworten, sondern einen speziellen "Tool Use" Request zurückgeben. Fange diesen Typ im Code ab und gib den Namen des geforderten Tools aus.
* **Hinweis:** Prüfe das Feld `stop_reason` der API-Antwort, es sollte nun `tool_use` lauten.

#### Übung 8: Das Ergebnis zurückmelden
* **Aufgabe:** Simuliere die Antwort deines Wetter-Tools (z.B. `{"temp": "12°C", "rain": true}`) und hänge dieses Ergebnis (`tool_result`) als neuen Block an deine Nachrichten-Historie an. Sende dann einen zweiten API-Call.
* **Hinweis:** Erst nach diesem zweiten Call erhält Claude die fehlenden Daten und formuliert die finale, menschenlesbare Textantwort ("In Berlin regnet es bei 12 Grad."). Du hast einen Agenten gebaut!
