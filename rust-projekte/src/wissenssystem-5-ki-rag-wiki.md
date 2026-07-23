# 🤖 Wissenssystem Stufe 5: Das KI-gestützte RAG-Wissenssystem

Willkommen in der Königsklasse deines Wissenssystems! In den vorherigen Stufen hast du gelernt, wie du Notizen strukturierst, ein CLI-Tool baust, Dateien verwaltest und Suchen implementierst. Doch je größer dein persönliches Wiki wird, desto schwieriger wird es, Zusammenhänge zwischen verschiedenen Notizen sofort zu erkennen.

Hier kommt **RAG (Retrieval-Augmented Generation)** ins Spiel. In diesem Kapitel lernst du, wie du dein Rust-Wiki mit moderner künstlicher Intelligenz verbindest, um direkt Fragen an dein eigenes Notizarchiv zu stellen.

---

## 🚀 Einleitung & Vision: Fragen an dein eigenes Wissen stellen

Große Sprachmodelle (LLMs) besitzen enormes Weltwissen, aber sie kennen deine persönlichen Notizen, Projektideen und Code-Schnipsel nicht. Fragst du eine allgemeine KI nach deinen spezifischen Notizen, wird sie entweder passen müssen oder Halluzinationen erfinden.

**Retrieval-Augmented Generation (RAG)** löst dieses Problem in zwei eleganten Schritten:

1. **Retrieval (Suchen):** Dein Rust-Programm durchsucht dein lokales Wiki nach den Notizen, die am besten zu der Frage passen.
2. **Generation (Antworten):** Dein Programm schickt diese relevanten Notizen als Kontext zusammen mit deiner Frage an das KI-Modell. Die KI liest deine Daten und antwortet exakt auf dieser Basis.

Das Ergebnis: Du erhältst präzise, maßgeschneiderte Antworten – basierend auf **deinem eigenen Wissen**, ohne dass du hunderte Markdown-Dateien manuell durchsuchen musst!

---

## 🧠 Die Bildmetapher: Der persönliche KI-Bibliothekar

Stelle dir dein KI-gestützte Wissenssystem wie einen erfahrenen Bibliothekar in einer riesigen Universitätsbibliothek vor:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     DEIN PERSONAL AI-BIBLIOTHEKAR                      │
│                                                                        │
│  1. [ Leser (Du) ] ──> "Was habe ich zu Rust Mutex notiert?"          │
│                               │                                        │
│  2. [ Bibliothekar ] ──> Sucht relevante Akten im Archiv (Retrieval)   │
│                               │                                        │
│  3. [ Assistent ]    ──> Liest Akten & formuliert Antwort (Generation) │
│                               │                                        │
│  4. [ Leser (Du) ] <── "Hier ist die Antwort inklusive Quelle!"       │
└────────────────────────────────────────────────────────────────────────┘
```

- **Der Leser (Du):** Du stellst eine konkrete Frage in natürlicher Sprache.
- **Der Bibliothekar (Dein Rust-Search-Engine):** Er rennt ins Archiv (deinen Ordner mit Markdown-Dateien), filtert die irrelevanten Dokumente heraus und bringt die 2-3 passendsten Notizblätter zum Schreibtisch.
- **Der Assistent (Das Sprachmodell / LLM):** Er überfliegt die mitgebrachten Dokumente und fasst die gewünschte Information verständlich für dich zusammen. Er darf dabei nur behaupten, was in den Dokumenten steht.

---

## 🏗️ Architektur & KI-Anbindung

Um den KI-Bibliothekar in Rust zum Leben zu erwecken, verbinden wir die asynchronous I/O-Fähigkeiten von Tokio mit HTTP-Requests (`reqwest`) und JSON-Parsing (`serde_json`).

```text
┌──────────────┐      1. Frage      ┌──────────────────────┐
│ User In/Out  ├───────────────────►│ main.rs (CLI / Async)│
└──────────────┘                    └──────────┬───────────┘
                                               │
                                      2. Suche Relevanten
                                         Text (Retrieval)
                                               ▼
                                    ┌──────────────────────┐
                                    │ Local Wiki Files     │
                                    │ (Markdown Search)    │
                                    └──────────┬───────────┘
                                               │
                                      3. Kontext + Frage
                                               ▼
┌──────────────┐   5. Antwort JSON  ┌──────────────────────┐
│  LLM API     ├───────────────────►│ ask_wiki_ai()        │
│(Ollama/OpenAI)│                   │ (reqwest HTTP Client)│
└──────────────┘                    └──────────────────────┘
```

### Die Bausteine des RAG-Systems:

1. **Notizen durchsuchen (Context Retrieval):** Eine Funktion liest die Notizdateien und sucht nach Stichwörtern oder passenden Abschnitten, um den *Kontext-String* zusammenzubauen.
2. **Prompt-Konstruktion:** Wir bauen einen Anweisungstext (Prompt), der der KI erklärt, wie sie sich zu verhalten hat.
3. **Async HTTP Request:** Mit `reqwest` senden wir eine POST-Anfrage an ein LLM (lokal z. B. via Ollama oder über eine Cloud-API).
4. **JSON Deserialisierung:** Wir wandeln die JSON-Antwort der API mit `serde_json` in Rust-Structs um.

---

## ⚙️ Code-Gerüst mit `todo!()`

Hier ist das Architektur-Gerüst für dein RAG-Wiki. Ergänze die fehlenden Stellen selbstständig, indem du die Aufgaben mit `todo!()` löst!

### 1. Datenstrukturen für die KI-API (Serde Structs)

```rust
use serde::{Deserialize, Serialize};
use std::error::Error;

/// Die Anfrage, die wir an den KI-Server senden
#[derive(Serialize, Debug)]
pub struct ChatCompletionRequest {
    pub model: String,
    pub messages: Vec<ChatMessage>,
    pub temperature: f32,
}

/// Eine einzelne Nachricht im Gesprächsverlauf
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ChatMessage {
    pub role: String, // z. B. "system", "user" oder "assistant"
    pub content: String,
}

/// Die JSON-Antwort des KI-Servers (vereinfacht)
#[derive(Deserialize, Debug)]
pub struct ChatCompletionResponse {
    pub choices: Vec<ChatChoice>,
}

#[derive(Deserialize, Debug)]
pub struct ChatChoice {
    pub message: ChatMessage,
}
```

---

### 2. Prompt-Konstruktion & RAG-Funktion

```rust
/// Baut aus den gefundenen Wiki-Notizen und der Benutzerfrage einen RAG-Prompt
pub fn build_rag_prompt(question: &str, context: &str) -> Vec<ChatMessage> {
    let system_instruction = String::from(
        "Du bist ein präziser KI-Bibliothekar für ein persönliches Wiki. \
         Beantworte die Frage des Nutzers AUSSCHLIESSLICH auf Basis des mitgelieferten Kontexts. \
         Wenn die Antwort nicht im Kontext enthalten ist, antworte ehrlich mit 'Das steht nicht in deinen Notizen.'"
    );

    let user_message_content = format!(
        "Hier ist der relevante Kontext aus meinen Notizen:\n---\n{}\n---\n\nFrage: {}",
        context, question
    );

    // TODO: Erstelle einen Vec<ChatMessage> mit zwei Nachrichten:
    // 1. role: "system" mit system_instruction
    // 2. role: "user" mit user_message_content
    todo!("Baue den Vektor von ChatMessage auf")
}

/// Sendet die Anfrage asynchron an den KI-Server und gibt die Antwort zurück
pub async fn ask_wiki_ai(
    question: &str, 
    context: &str,
    api_url: &str
) -> Result<String, Box<dyn Error>> {
    // 1. Baue die Nachrichten mit build_rag_prompt auf
    let messages = build_rag_prompt(question, context);

    // 2. Erstelle das Request-Objekt
    let request_payload = ChatCompletionRequest {
        model: String::from("llama3"), // Oder dein bevorzugtes Modell
        messages,
        temperature: 0.2,
    };

    // 3. HTTP Client initialisieren
    let client = reqwest::Client::new();

    // TODO: Sende einen POST-Request an api_url mit request_payload als JSON.
    // Wichtig: Nutze .json(&request_payload), .send().await? und verarbeite die Antwort.
    // Wandle die Antwort mit .json::<ChatCompletionResponse>().await? um.
    // Gib den Text der ersten Choice zurück.

    todo!("Implementiere den async HTTP Request mit reqwest und serde_json")
}
```

💡 **Denkanstöße & Leitfragen:**
- **Fehlertoleranz:** Was passiert, wenn der KI-Server offline ist oder ein falscher API-Key übergeben wird? Wie hilft dir der `?`-Operator und `Result` dabei, Fehler sauber abzufangen?
- **Async Runtime:** Welche Annotation braucht deine `main`-Funktion, um `ask_wiki_ai(...).await` aufrufen zu können? (Hinweis: `#[tokio::main]`).
- **Kontext-Länge:** Was passiert, wenn deine Notizen 100.000 Wörter lang sind? Kann ein LLM unendlich viel Text auf einmal verarbeiten?

---

## 🧪 Übungsaufgaben

Versuche nun, das RAG-System schrittweise zu erweitern!

### 🟢 Übung 1 (Leicht): Temperatur-Regler
Füge der Funktion `ask_wiki_ai` einen Parameter `temperature: f32` hinzu.
- **Frage zum Nachdenken:** Warum ist für ein Wissenssystem/RAG eine niedrige Temperatur (z. B. `0.0` bis `0.2`) in der Regel viel besser geeignet als eine hohe Temperatur (z. B. `0.9` oder `1.5`)?
- **Aufgabe:** Passe das `ChatCompletionRequest`-Struct so an, dass der Wert dynamisch vom Aufrufer bestimmt werden kann.

---

### 🟡 Übung 2 (Mittel): Zitations-Angabe & Quellen-Nachweis
Ein echter Bibliothekar nennt immer das Buch und die Seitenzahl! 
Erweitere dein System so, dass die Antwort nicht nur ein einfacher `String` ist, sondern eine Struktur `RagResponse`, die auch die verwendeten Dateipfade auflistet:

```rust
use std::path::PathBuf;

pub struct RagResponse {
    pub answer: String,
    pub sources: Vec<PathBuf>,
}

pub async fn ask_wiki_ai_with_sources(
    question: &str,
    notes: &[(PathBuf, String)], // Pair aus Dateipfad und Inhalt
) -> Result<RagResponse, Box<dyn Error>> {
    // TODO: 
    // 1. Filter die 'notes' nach Relevanz für die 'question'.
    // 2. Merke dir die Pfade der ausgewählten Notizen in 'sources'.
    // 3. Füge den Inhalt der ausgewählten Notizen zu einem Kontext-String zusammen.
    // 4. Rufe den KI-API-Call auf und erstelle das 'RagResponse'-Objekt.
    todo!("Implementiere RAG mit Quellen-Nachweis")
}
```

---

### 🔴 Schwer: Semantische Suche mit Embeddings (Denkanstoß & Konzept)
Stelle dir vor, in deiner Notiz steht: *"Concurrency in Rust schützt vor Data Races."*
Der Nutzer fragt aber: *"Wie hilft mir Rust bei paralleler Programmierung?"*

Eine einfache Stichwortsuche findet das Wort "paralleler" in der Notiz vielleicht nicht!

- **Konzept-Frage:** Wie lösen moderne Vektor-Datenbanken (z. B. Qdrant oder pgvector) dieses Problem?
- **Recherche-Auftrag:** Schau dir an, was ein **Embedding** (Vektor aus Zahlen, z. B. 384 Fließkommazahlen) ist. Wie berechnet man die Ähnlichkeit zweier Sätze mit der *Kosinus-Ähnlichkeit* (Cosine Similarity) in Rust?
- **Skizziere den Pseudocode:** Wie würde ein Modul `src/embeddings.rs` aussehen, das Sätze in Vektoren umwandelt und vergleicht?

---

## 🎯 Zusammenfassung

Herzlichen Glückwunsch! Du hast nun alle Stufen unseres Wissenssystem-Pfads durchlaufen:

| Stufe | Thema | Rust-Konzepte |
| :--- | :--- | :--- |
| **Stufe 1** | Markdown & Datei-Handling | `std::fs`, String-Parsing, File I/O |
| **Stufe 2** | CLI-Verwaltung & Suche | `clap`, Iteratoren, Pattern Matching |
| **Stufe 3** | Strukturierte Daten & Tags | `HashMap`, Enums, Structs, `serde` |
| **Stufe 4** | Web-Frontend & Wiki-CMS | Axum, Async/Await, Routing, Workspaces |
| **Stufe 5** | **KI & RAG-Bibliothekar** | `reqwest`, `serde_json`, Async LLM-Integration, Prompts |

Dein Wissenssystem ist nun nicht mehr nur eine passive Sammlung von Textdateien, sondern ein **aktiver digitaler Assistent**, der dein Wissen bündelt, durchsucht und auf den Punkt beantwortet! 🚀
