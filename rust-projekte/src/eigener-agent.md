# 🧠 Eigene KI-Agenten programmieren – Theorie & Praxis

*Von der Idee zum eigenen intelligenten Agenten – in Rust.*

---

Du hast Antigravity genutzt, mit Copilot gearbeitet, Vibe Coding ausprobiert. Jetzt kommt die nächste Stufe:  
**Du baust deinen eigenen KI-Agenten.**

Das klingt nach Science-Fiction – ist es aber nicht. Ein KI-Agent ist im Kern ein Programm, das:
1. **Wahrnehmung** hat (Input: Text, Dateien, APIs)
2. **Entscheidungen** trifft (Logik, KI-Modell, Regeln)
3. **Handlungen** ausführt (Output: Text, Dateien, Terminal-Befehle)

In dieser Lektion lernst du die Theorie dahinter – und baust Schritt für Schritt deinen eigenen Agenten in Rust.

> **Für Anfänger:** Du musst kein KI-Forscher sein, um einen Agenten zu bauen.  
> Die meisten modernen Agenten nutzen einfach eine **API** – du rufst ein KI-Modell auf und gibst dem Ergebnis Struktur.  
> Das ist Rust-Programmierung – keine Magie.

---

## 🧠 Theorie: Was ist ein KI-Agent?

### Die klassische Definition

Ein KI-Agent ist ein System, das:

```
┌─────────────────────────────────────────┐
│                                         │
│   Umgebung  →  Agent  →  Aktion         │
│                  ↑                      │
│              Wahrnehmung                │
│                                         │
└─────────────────────────────────────────┘
```

- **Wahrnehmung:** Was sieht/hört/liest der Agent?
- **Entscheidung:** Was soll er tun?
- **Aktion:** Was tut er tatsächlich?

---

### 🔄 Der Agent-Loop

Moderne KI-Agenten arbeiten in einem **Schleifenprinzip**:

```
1. WAHRNEHMEN  →  User-Input, Datei lesen, API abfragen
2. DENKEN      →  KI-Modell aufrufen, Ergebnis analysieren
3. HANDELN     →  Datei schreiben, Terminal, Antwort geben
4. BEOBACHTEN  →  Was ist das Ergebnis der Aktion?
5. WIEDERHOLEN →  Zurück zu Schritt 1
```

Das nennt sich der **ReAct-Loop** (Reason + Act) – das Grundprinzip hinter Antigravity, Cursor und fast allen modernen Agenten.

---

### 🏗️ Architektur eines einfachen Agenten

```
┌──────────────────────────────────────────────┐
│                  Mein Agent                  │
│                                              │
│  ┌──────────┐   ┌──────────┐  ┌──────────┐  │
│  │  Input-  │   │  KI-    │  │ Output-  │  │
│  │ Handler  │ → │ Modul   │→ │ Handler  │  │
│  └──────────┘   └──────────┘  └──────────┘  │
│                      │                       │
│              ┌───────────────┐               │
│              │   Werkzeuge   │               │
│              │ (Tools/Fns)   │               │
│              │ - Datei lesen │               │
│              │ - HTTP-Call   │               │
│              │ - Terminal    │               │
│              └───────────────┘               │
└──────────────────────────────────────────────┘
```

---

### 🔑 Die vier Schlüssel-Konzepte

#### 1. Das Sprachmodell (LLM)
Das „Gehirn" des Agenten. Du rufst es über eine **API** auf:
- OpenAI GPT (über `api.openai.com`)
- Google Gemini (über `generativelanguage.googleapis.com`)
- Anthropic Claude (über `api.anthropic.com`)
- Lokale Modelle: Ollama (kein API-Key nötig!)

#### 2. Der Kontext (System-Prompt)
Was du dem Modell **vor** dem Nutzer-Input sagst:
```
"Du bist ein Assistent, der Rust-Code erklärt.
 Antworte immer auf Deutsch.
 Schreibe keinen fertigen Code."
```
Das ist im Grunde: **AGENTS.md in Textform**.

#### 3. Die Werkzeuge (Tools / Functions)
Was der Agent **tun** kann – über Funktionen, die du definierst:
```rust
// Werkzeug: Datei lesen
fn lese_datei(pfad: &str) -> String { ... }

// Werkzeug: Web-Suche
fn suche_web(query: &str) -> String { ... }

// Werkzeug: Terminal-Befehl
fn fuehre_aus(befehl: &str) -> String { ... }
```

#### 4. Das Gedächtnis (Memory)
Wie der Agent sich erinnert:
- **Kurzzeitgedächtnis:** Der Chat-Verlauf (`Vec<Message>`)
- **Langzeitgedächtnis:** Dateien, Datenbank, Vektordatenbank

---

### 🦀 Warum Rust für Agenten?

| Grund | Erklärung |
|---|---|
| **Geschwindigkeit** | Agenten-Loops laufen tausende Male – Rust ist schnell |
| **Zuverlässigkeit** | Kein Garbage Collector = keine unerwarteten Pausen |
| **Sicherheit** | Memory Safety ohne Runtime-Overhead |
| **Async/Await** | Perfekt für parallele API-Aufrufe |
| **WebAssembly** | Rust-Agenten können im Browser laufen |

---

### 🌐 API-Aufrufe in Rust – Das Grundprinzip

```rust
// Mit der reqwest-Crate (HTTP-Client)
// Cargo.toml: reqwest = { version = "0.11", features = ["json"] }
//             tokio = { version = "1", features = ["full"] }
//             serde = { version = "1", features = ["derive"] }

// So sieht ein API-Aufruf aus (Grundstruktur):
// 1. Request aufbauen (JSON mit Prompt)
// 2. An API senden (POST-Request)
// 3. Antwort empfangen (JSON parsen)
// 4. Text extrahieren und anzeigen
```

> **Für Anfänger:** Du musst kein HTTP-Experte sein. Die Beispiele in den Projekten zeigen dir die Struktur Schritt für Schritt.

---

### 🔧 Werkzeuge (Tools) – Wie Agenten handeln

Modern KI-APIs unterstützen **Function Calling**: Du definierst Werkzeuge, und das Modell entscheidet, wann es sie einsetzt.

```
Du:     „Wie viele Zeilen hat meine main.rs?"
Agent:  [Denkt: Ich brauche das Werkzeug 'lese_datei']
        [Ruft auf: lese_datei("src/main.rs")]
        [Bekommt: Dateiinhalt mit 47 Zeilen]
Agent:  „Deine main.rs hat 47 Zeilen."
```

Das ist der Kern eines echten Agenten – nicht nur antworten, sondern **handeln**.

---

### 📦 Wichtige Rust-Crates für Agenten

| Crate | Zweck |
|---|---|
| `reqwest` | HTTP-Client für API-Aufrufe |
| `tokio` | Async Runtime für parallele Anfragen |
| `serde` / `serde_json` | JSON serialisieren und deserialisieren |
| `clap` | CLI-Argumente für deinen Agenten |
| `dotenv` | API-Keys sicher aus `.env`-Datei laden |
| `anyhow` | Einfache Fehlerbehandlung |
| `colored` | Farbige Terminal-Ausgabe |
| `rustyline` | Readline-Unterstützung (wie in `agy`) |
| `ollama-rs` | Lokale Modelle mit Ollama |

---

### 🔐 API-Keys – Sicher speichern

```bash
# .env-Datei anlegen (NIEMALS in Git committen!)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...

# .gitignore:
.env
```

```rust
// In Rust laden:
// dotenv::dotenv().ok();
// let api_key = std::env::var("OPENAI_API_KEY").expect("API-Key fehlt!");
```

---

### 🏛️ Agent-Typen – Eine Übersicht

| Typ | Beschreibung | Beispiel |
|---|---|---|
| **Simple Agent** | Prompt rein, Antwort raus | Chatbot |
| **Tool-Use Agent** | Hat Werkzeuge, die er einsetzen kann | File-Reader Agent |
| **ReAct Agent** | Denkt laut (Chain-of-Thought) + handelt | Antigravity |
| **Multi-Agent** | Mehrere Agenten arbeiten zusammen | Forschungs-Team |
| **RAG Agent** | Sucht in Dokumenten bevor er antwortet | Dokumentations-KI |

---

## 🛠️ Praxis-Aufgaben vor den Projekten

### Aufgabe A: Ollama lokal einrichten

Installiere **Ollama** – damit brauchst du keinen API-Key:

```bash
# Ollama installieren (Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Ein Modell herunterladen
ollama pull llama3.2

# Testen
ollama run llama3.2 "Erkläre mir Ownership in Rust in einem Satz."
```

Ollama läuft lokal auf `http://localhost:11434` – vollständig offline!

---

### Aufgabe B: Erste API-Struktur verstehen

Schaue dir an, wie eine Anfrage an Ollama aufgebaut ist:

```json
{
  "model": "llama3.2",
  "prompt": "Was ist Rust Ownership?",
  "stream": false
}
```

Und die Antwort:

```json
{
  "response": "Ownership ist Rusts Speicherverwaltungskonzept...",
  "done": true
}
```

Das ist alles, was du brauchst! **JSON rein, JSON raus.**

---

### Aufgabe C: cargo new agent

Erstelle dein erstes Agent-Projekt:

```bash
cargo new mein-agent
cd mein-agent
```

Füge in `Cargo.toml` hinzu:
```toml
[dependencies]
reqwest = { version = "0.11", features = ["json", "blocking"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

---

## 🚀 50 Rust-Projektvorschläge – Eigene KI-Agenten

Diese 50 Projekte führen dich vom einfachsten Chatbot bis zum vollständigen Multi-Agenten-System.  
Jedes Projekt baut auf dem vorherigen auf – du sammelst Baustein für Baustein.

> 🦀 **Lernregel:** Verstehe jedes Projekt vollständig, bevor du zum nächsten gehst.  
> Ein selbst gebauter Agent, den du verstehst, ist wertvoller als 10 kopierte.

---

### 🟢 Einstiegsprojekte – Erste Schritte (1–10)

1. **Hello, Ollama!** – Der einfachste Agent: Sende einen festen Prompt an Ollama und gib die Antwort aus. Lerne `reqwest::blocking` und JSON-Parsing.

2. **Interaktiver Chatbot** – Lies Eingaben vom Terminal in einer Schleife und sende sie an Ollama. Dein erster echter Chatbot!

3. **Persönlichkeit geben** – Füge einen System-Prompt hinzu, der dem Agenten eine Rolle gibt (z. B. „Du bist ein freundlicher Rust-Tutor").

4. **Chat-Verlauf** – Speichere alle Nachrichten in einem `Vec<Message>` und sende den gesamten Verlauf bei jeder Anfrage mit. Jetzt erinnert sich der Agent!

5. **Farbige Ausgabe** – Nutze die `colored`-Crate, um Nutzer-Text und Agenten-Text in verschiedenen Farben anzuzeigen.

6. **Eingabe-Prompt verbessern** – Nutze `rustyline` für eine professionelle Eingabe mit Pfeil-Tasten-History wie im echten Terminal.

7. **Konfigurationsdatei** – Lade Modell-Name und System-Prompt aus einer `config.toml`-Datei statt fest im Code.

8. **Streaming-Antworten** – Statt auf die komplette Antwort zu warten: Gib Wort für Wort aus, sobald es ankommt (wie ChatGPT).

9. **Token-Zähler** – Zeige nach jeder Antwort an, wie viele Wörter/Tokens die Konversation bisher hat.

10. **Mehrere Modelle** – Lass den Nutzer zu Beginn wählen: llama3.2, mistral oder gemma. Lerne, Argumente zu verarbeiten.

---

### 🟡 Werkzeuge (Tools) – Agent lernt zu handeln (11–25)

11. **Datei-Lese-Werkzeug** – Der Agent kann Dateipfade erkennen (z. B. „@main.rs") und den Inhalt automatisch anhängen.

12. **Taschenrechner-Werkzeug** – Der Agent erkennt Rechenaufgaben im Text und löst sie mit echtem Rust-Code (nicht vom Modell!).

13. **Datum/Zeit-Werkzeug** – Wenn der Nutzer nach dem Datum fragt, ruft der Agent eine Funktion auf statt zu raten.

14. **Wörterbuch-Werkzeug** – Der Agent schlägt unbekannte Wörter in einer lokalen Textdatei nach.

15. **Datei-Schreib-Werkzeug** – Der Agent kann Dateien erstellen, wenn der Nutzer sagt „Erstelle eine Datei notes.md mit...".

16. **Verzeichnis-Werkzeug** – Der Agent listet Dateien in einem Ordner auf und kann damit auf Fragen über Projektstruktur antworten.

17. **Terminal-Werkzeug** – Der Agent führt einfache Befehle aus (`ls`, `cargo build`) und gibt das Ergebnis zurück.

18. **Wetter-Werkzeug (simuliert)** – Eine Funktion gibt zufällige Wetterdaten zurück. Der Agent nutzt sie, wenn nach dem Wetter gefragt wird.

19. **Wikipedia-Werkzeug** – Rufe die Wikipedia-API ab und gib dem Agenten Zugriff auf Definitionen und Erklärungen.

20. **Mehrere Werkzeuge kombinieren** – Der Agent hat nun 3–5 Werkzeuge. Schreibe Logik, die erkennt, welches Werkzeug gebraucht wird.

21. **Werkzeug-Protokoll** – Zeige dem Nutzer, welches Werkzeug der Agent verwendet hat und warum (Transparenz!).

22. **Werkzeug-Genehmigung** – Bevor der Agent ein Werkzeug nutzt, fragt er: „Darf ich `cargo build` ausführen? [j/n]"

23. **Werkzeug-Fehlerbehandlung** – Was passiert, wenn ein Werkzeug fehlschlägt? Baue robuste `Result`-Behandlung ein.

24. **Dynamische Werkzeuge** – Lade Werkzeuge aus einer Konfigurationsdatei statt sie hart im Code zu haben.

25. **Werkzeug-Statistik** – Zeige am Ende einer Session, welches Werkzeug wie oft verwendet wurde.

---

### 🔴 Spezialisierte Agenten (26–40)

26. **Rust-Tutor-Agent** – Ein Agent, der ausschließlich Rust erklärt. System-Prompt: keine Code-Lösungen, nur Konzepte und Fragen.

27. **Code-Review-Agent** – Der Agent liest eine Rust-Datei und gibt Feedback zu Stil, Fehlerbehandlung und Klarheit.

28. **Dokumentations-Agent** – Liest eine Rust-Datei und schreibt `///`-Dokumentationskommentare für alle Funktionen.

29. **Fehler-Erklärer-Agent** – Der Nutzer gibt einen `cargo`-Fehler ein, der Agent erklärt ihn auf Deutsch und gibt Hinweise.

30. **Commit-Message-Agent** – Liest `git diff` und schlägt eine sinnvolle Commit-Message vor.

31. **Test-Generator-Agent** – Liest eine Funktion und schlägt Testfälle vor (Grenzfälle, Normalfälle, Fehlerfälle).

32. **Refactoring-Agent** – Analysiert Code und schlägt Verbesserungen vor: bessere Namen, kürzere Funktionen, mehr Rust-Idiome.

33. **README-Generator-Agent** – Liest ein Rust-Projekt und erstellt automatisch eine `README.md`.

34. **Lernplan-Agent** – Der Nutzer gibt sein Ziel an, der Agent erstellt einen strukturierten Lernplan für Rust.

35. **Frage-Antwort-Agent (RAG)** – Der Agent sucht in einem lokalen Rust-Buch (als Textdateien) nach Antworten.

36. **Notiz-Agent** – Nimmt Notizen entgegen, speichert sie strukturiert und kann nach Themen suchen.

37. **Übersetzungs-Agent** – Übersetzt Rust-Fehlermeldungen und Dokumentation auf Deutsch.

38. **Code-Kommentar-Agent** – Liest unkommentierten Code und fügt hilfreiche Deutsche Kommentare ein.

39. **Dependency-Checker-Agent** – Analysiert `Cargo.toml` und prüft, ob neuere Versionen verfügbar sind (via crates.io API).

40. **Interview-Agent** – Stellt dem Nutzer Fragen zu einem Rust-Konzept – wie ein Lehrer im Sokrates-Stil.

---

### ⚡ Fortgeschrittene Agenten-Systeme (41–50)

41. **Gedächtnis mit Datei** – Der Chat-Verlauf wird in einer JSON-Datei gespeichert und beim nächsten Start geladen. Echter Langzeitspeicher!

42. **Mehrsprachiger Agent** – Der Agent erkennt die Sprache des Nutzers automatisch und antwortet in derselben Sprache.

43. **Agent mit Persönlichkeitsprofilen** – Wähle beim Start ein Profil: „Strenger Lehrer", „Geduldiger Mentor", „Enthusiastischer Anfänger".

44. **Async Multi-API-Agent** – Sende dieselbe Frage gleichzeitig an Ollama und eine andere API, vergleiche die Antworten.

45. **Planer-Agent** – Der Agent zerlegt eine große Aufgabe in Teilschritte und arbeitet sie nacheinander ab (ReAct-Loop).

46. **Kritiker-Agent** – Zwei Agenten: Einer schlägt vor, der andere kritisiert. Der Nutzer entscheidet.

47. **Spezialisierungs-Router** – Ein „Master"-Agent, der entscheidet, welcher Spezialist-Agent die Aufgabe übernimmt.

48. **Agent mit Vektordatenbank** – Speichere Text-Chunks als Embeddings, suche ähnliche Texte bei jeder Anfrage.

49. **Selbst-verbessernder Agent** – Der Agent kann seine eigene Konfigurationsdatei (System-Prompt) anpassen, wenn du ihm sagst, was er besser machen soll.

50. **Vollständiger Antigravity-Klon (Mini)** – Baue einen eigenen kleinen KI-Agenten mit: Chat-Loop, Datei-Werkzeug, Terminal-Werkzeug, Verlauf-Speicher und farbiger Ausgabe. Dein eigenes `agy`!

---

## 🗺️ Lernpfad – So gehst du vor

```
Projekte 1–5:    Grundstruktur verstehen (API, JSON, Loop)
     ↓
Projekte 6–10:   Benutzerfreundlichkeit (Input, Config, Streaming)
     ↓
Projekte 11–15:  Erste Werkzeuge (Dateien, Rechnen, Zeit)
     ↓
Projekte 16–25:  Werkzeug-System aufbauen (Mehrere, Fehler, Genehmigung)
     ↓
Projekte 26–35:  Spezialisierte Agenten (Tutor, Review, RAG)
     ↓
Projekte 36–45:  Fortgeschrittene Techniken (Gedächtnis, Async, Multi-Agent)
     ↓
Projekte 46–50:  Vollständige Systeme (Router, Planer, Mini-Antigravity)
```

---

## 🔍 Agenten vs. klassische Programme

| Merkmal | Klassisches Programm | KI-Agent |
|---|---|---|
| **Logik** | Fest kodiert | Dynamisch durch KI |
| **Fehlerbehandlung** | Immer gleich | Kontextabhängig |
| **Eingabe** | Strukturiert (Argumente) | Natürliche Sprache |
| **Ausgabe** | Vorhersehbar | Variabel |
| **Lernfähigkeit** | ❌ Nein | ✅ Durch Kontext |
| **Werkzeuge** | Immer ausgeführt | Bei Bedarf entschieden |

---

## 💡 Zusammenfassung

| Konzept | Bedeutung |
|---|---|
| LLM / Sprachmodell | Das „Gehirn" – aufgerufen via API |
| System-Prompt | Die Persönlichkeit und Regeln des Agenten |
| Chat-Verlauf | Das Kurzzeitgedächtnis (`Vec<Message>`) |
| Werkzeuge (Tools) | Funktionen, die der Agent aufrufen kann |
| ReAct-Loop | Wahrnehmen → Denken → Handeln → Wiederholen |
| Ollama | Lokale Modelle – kein API-Key nötig |
| `reqwest` + `serde` | Die zwei wichtigsten Crates für Agenten |

> 🦀 **Die größte Erkenntnis:**  
> Antigravity, Cursor, ChatGPT-Plugins – sie alle folgen demselben Prinzip.  
> **Du kannst das auch bauen.**  
> Ein Agent ist keine Magie – er ist ein Programm, das ein KI-Modell aufruft und das Ergebnis sinnvoll nutzt.  
> Und du kennst jetzt alle Zutaten. 🚀

---

## 📚 Weiterführende Links

- [Ollama](https://ollama.ai/) – Lokale KI-Modelle, kein API-Key
- [Ollama API Docs](https://github.com/ollama/ollama/blob/main/docs/api.md) – REST-API-Referenz
- [OpenAI API](https://platform.openai.com/docs) – GPT-Modelle via API
- [Google Gemini API](https://ai.google.dev/) – Gemini via API nutzen
- [reqwest Docs](https://docs.rs/reqwest/) – HTTP in Rust
- [serde Docs](https://serde.rs/) – Serialisierung in Rust
- [Rust Async Book](https://rust-lang.github.io/async-book/) – Async/Await verstehen
- [LangChain Konzepte](https://python.langchain.com/docs/concepts/) – Agent-Konzepte (in Python, aber übertragbar)
