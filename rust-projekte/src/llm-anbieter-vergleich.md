# 🌐 Multi-LLM- & Sprachmodell-Anbieter im Vergleich

*Der Weg durch den Modelldschungel: Von kostenlos lokal bis zur Premium-Cloud.*

---

Wenn du anfängst, eigene KI-gestützte Anwendungen oder eigene KI-Agenten in Rust zu entwickeln (wie im Kapitel [Eigene KI-Agenten programmieren](./eigener-agent.md) beschrieben), stehst du schnell vor einer entscheidenden Frage: **Woher bekomme ich das Sprachmodell (LLM) und wie viel kostet es mich?**

In dieser Lektion vergleichen wir die verschiedenen Bereitstellungswege und Anbieter. Wir sortieren sie nach Kosten (von billig zu teuer), betrachten lokale Alternativen zum Selbsthosten und zeigen dir, wie du den für dein Projekt optimalen Weg wählst.

---

## 🧠 Theorie: Die drei Säulen der Modell-Bereitstellung

Um zu verstehen, woher die Sprachmodelle kommen, hilft eine einfache Alltagsanalogie mit Wasser:

```
┌────────────────────────────────────────────────────────────────────────┐
│                              WASSER-ANALOGIE                           │
│                                                                        │
│ 🏠 Lokale Quelle (Ollama)      ☁️ Direktbezug (OpenAI/Gemini) 🌐 Router │
│   [Eigener Brunnen]               [Markenflaschen]         [Lieferant] │
│   - Kostenlos (Strom/Pumpe)       - Teurer, aber Premium   - Ein Vertrag│
│   - Limitiert durch Ausrüstung    - Nur eine Marke         - Viele Marken│
└────────────────────────────────────────────────────────────────────────┘
```

1. **Self-Hosting (Der eigene Brunnen):** Du installierst und betreibst Open-Source-Modelle auf deiner eigenen Hardware (z. B. mit Ollama). Das kostet dich keine Lizenzgebühren, verbraucht aber lokalen Strom und erfordert eine starke Grafikkarte (GPU).
2. **Direkte KI- & Cloud-Anbieter (Die Markenflasche):** Du gehst direkt zu den Entwicklern der Modelle (Google, OpenAI, Anthropic) und nutzt deren APIs. Du zahlst genau das, was du verbrauchst (Pay-as-you-go), bist aber an deren Ökosystem gebunden.
3. **Multi-LLM-Provider / Router (Der Getränkelieferant):** Diese Anbieter (z. B. OpenRouter) hosten selbst keine eigenen Modelle, sondern bündeln Dutzende von Modellen (sowohl Open-Source als auch proprietäre) unter einer einzigen API. Du brauchst nur einen einzigen Account und API-Key, um auf fast alle existierenden Sprachmodelle der Welt zuzugreifen.

---

## 🌐 1. Multi-LLM-Provider (Aggregatoren) – Sortiert von billig zu teuer

Multi-LLM-Provider sind für Entwickler genial, da sie Open-Source-Modelle (wie Llama 3 oder Qwen) auf extrem optimierten Serverfarmen betreiben. Dadurch können sie diese oft viel günstiger anbieten, als wenn du sie selbst in der Cloud hostest.

Hier sind die wichtigsten Multi-LLM-Provider, sortiert nach ihren durchschnittlichen Preisen (für Open-Source-Modelle):

| Provider | Typische Preise (pro 1M Token)* | Stärken | Schwächen |
| :--- | :--- | :--- | :--- |
| **DeepInfra** | **Sehr billig** (ca. $0.05 - $0.40) | Unschlagbare Preise, stabiles Hosten von Open Source | Weniger Auswahl an Nischenmodellen |
| **Together AI** | **Billig** (ca. $0.10 - $0.60) | Sehr schnelle Antwortzeiten, gute API | Fokus fast nur auf Open Source |
| **OpenRouter** | **Günstig bis Premium** (Modellabhängig) | Die größte Modellauswahl der Welt, auch GPT/Claude routing | Geringer Aufpreis bei manchen Modellen |
| **Fireworks AI** | **Mittel** (ca. $0.20 - $0.90) | Extrem schnelle Latenzen für Echtzeitanwendungen | Etwas teurer als DeepInfra |
| **Groq** | **Kostenlos bis Mittel** (je nach Limit) | Unfassbar schnell (LPU-Technologie) | Strenge Rate-Limits (Anfragen pro Minute) |

*\*Preise beziehen sich auf typische mittlere bis große Open-Source-Modelle wie Llama 3 8B bis 70B im Jahr 2026.*

### Warum lohnt sich ein Multi-LLM-Provider?
* **Ein API-Key für alles:** Du musst dich nicht bei fünf verschiedenen Plattformen anmelden und Kreditkarten hinterlegen.
* **Ausfallsicherheit:** Fällt ein Hoster aus, schaltet ein Router wie OpenRouter automatisch auf einen anderen Hoster des gleichen Modells um.
* **Preiskampf:** Die Aggregatoren unterbieten sich ständig gegenseitig, wodurch du automatisch vom günstigsten Preis profitierst.

---

## ☁️ 2. Cloud- & native KI-Anbieter – Sortiert von billig zu teuer

Wenn du die absolut leistungsfähigsten Modelle (die "Flaggschiff-Modelle") nutzen möchtest, musst du oft direkt an die Quelle gehen. Auch hier gibt es dramatische Preisunterschiede.

Hier sind die bekanntesten direkten Anbieter, sortiert von billig (Value) zu teuer (Premium):

```
Billig / Value ─────────────────────────────────────────────────────────────────────────────► Teuer / Premium
DeepSeek V3/R1 ──► Gemini 1.5 Flash ──► GPT-4o mini ──► Mistral Nemo/Large ──► xAI Grok ──► GPT-4o ──► Claude Sonnet ──► Claude Opus / o1
```

### 1. DeepSeek API (Extrem günstig mit Spitzenleistung)
* **Preise:** Unglaublich günstig (z. B. DeepSeek-V3: $0.14 / 1M Input-Token; DeepSeek-R1 Reasoning: $0.55 / 1M Input-Token).
* **Vorteile:** Exzellente Performance auf Augenhöhe mit den besten Modellen der Welt zu einem Bruchteil des Preises. R1 bietet extrem starkes logisches Denken (Reasoning).
* **Nachteile:** Gelegentliche Serverüberlastungen bei hoher Nachfrage, Hoster sitzt in China (Datenschutz-Bedenken bei sensiblen Firmendaten).

### 2. Google Gemini API (Kostenloser Einstieg bis extrem günstig)
* **Preise:** Sehr gering (z. B. Gemini 1.5 Flash: $0.075 / 1M Input-Token). Zudem gibt es ein **kostenloses Kontingent** (Free Tier) für Entwickler.
* **Vorteile:** Riesiges Kontextfenster (bis zu 2 Millionen Token), sehr schnelles Modell (Flash), kostenloser Testmodus.
* **Nachteile:** Qualität bei sehr komplexem Code-Refactoring manchmal leicht hinter Claude 3.5 Sonnet.

### 3. Mistral AI (Günstig bis Mittel)
* **Preise:** Moderat (z. B. Mistral Nemo sehr günstig, Mistral Large im mittleren Bereich).
* **Vorteile:** Europäischer Datenschutz (Hoster in der EU), gute Open-Source-Wurzeln.
* **Nachteile:** Kleinere Entwickler-Community im Vergleich zu OpenAI.

### 4. OpenAI API (Mittel bis Premium)
* **Preise:** GPT-4o mini ist extrem günstig ($0.15 / 1M Input-Token). GPT-4o und o1/o3-mini sind im mittleren bis teuren Segment.
* **Vorteile:** Hohe Stabilität, sehr gute Funktionsaufrufe (Function Calling), der Industriestandard.
* **Nachteile:** Strenge Zensurpolitik, teure Premium-Modelle.

### 5. Cohere API (Mittel, Fokus auf RAG & Unternehmen)
* **Preise:** Moderat (z. B. Command R: $0.15 / 1M Input-Token, Command R+: $2.50 / 1M Input-Token).
* **Vorteile:** Optimiert für Dokumentensuche (Retrieval-Augmented Generation / RAG) und mehrsprachige Aufgaben.
* **Nachteile:** Reines Textmodell, weniger Allround-Programmierfähigkeiten im Vergleich zu Claude.

### 6. xAI API - Grok (Mittel bis Premium)
* **Preise:** Vergleichbar mit OpenAI (z. B. Grok 2: ca. $2.00 / 1M Input-Token).
* **Vorteile:** Sehr aktueller Wissensstand durch Echtzeit-Datenintegration (X-Plattform), freche/humorvolle Persönlichkeit einstellbar.
* **Nachteile:** Weniger ausgereiftes Entwickler-Ökosystem.

### 7. Anthropic API (Premium bis sehr teuer)
* **Preise:** Claude 3.5 Sonnet liegt im mittleren bis gehobenen Segment ($3.00 / 1M Input-Token). Claude 3 Opus ist extrem teuer ($15.00 / 1M Input-Token).
* **Vorteile:** Der absolute König für Programmieraufgaben und logisches Denken.
* **Nachteile:** Keine dauerhaft kostenlosen Tarife, teure API-Preise für große Datenmengen.

### 8. Enterprise-Clouds (AWS Bedrock, Azure AI, Google Cloud Vertex AI)
* **Preise:** Ähnlich wie die nativen APIs, aber oft gekoppelt an Cloud-Infrastrukturgebühren oder feste Abonnements.
* **Vorteile:** Maximale Datensicherheit und Compliance (wichtig für Firmen).
* **Nachteile:** Sehr komplex einzurichten, nicht für schnelle Hobby-Projekte geeignet.

---

## 🏠 3. Selbstgehostete Sprachmodelle (Lokale Ausführung)

Wenn du keine Daten ins Internet senden möchtest oder offline arbeiten willst, kannst du Modelle lokal betreiben.

### Die Werkzeuge im Überblick:
1. **Ollama:** Der absolute Standard für Entwickler. Es läuft im Hintergrund als Service und bietet eine einfache HTTP-Schnittstelle (`localhost:11434`), die kompatibel zur OpenAI-API ist.
2. **LM Studio:** Eine Desktop-App mit grafischer Oberfläche. Perfekt zum Ausprobieren von Modellen und schnellen Starten eines lokalen Servers.
3. **vLLM / Llama.cpp:** Für fortgeschrittene Entwickler, die maximale Performance aus ihrer Grafikkarte kitzeln wollen. vLLM wird auch in der Produktion zum Hosten genutzt.

### Typische lokale Programmiermodelle (Open Weights):
* **Qwen 2.5 Coder (0.5B bis 32B):** Derzeit eines der besten lokalen Modelle für Code. Die kleineren Varianten (z. B. 7B) laufen auch auf normalen Laptops extrem flüssig.
* **Llama 3.1 / 3.2 (3B bis 8B):** Sehr gute Allrounder für allgemeine Aufgaben und einfache Code-Generierung.

---

## 🏗️ 4. Deinen eigenen Sprachmodell-Anbieter bauen (Self-Hosted Provider)

Wenn du für dein Team, deine Firma oder dich selbst einen privaten Sprachmodell-Anbieter bereitstellen willst, gibt es zwei Wege, wie du das in Rust umsetzen kannst:

### Weg A: Der API-Gateway-Proxy (Empfohlen für Teams)
Du programmierst einen Webserver in Rust (z. B. mit `axum`), der als Torwächter (Gateway) dient. 

```
┌──────────┐          ┌───────────────┐          ┌──────────────┐
│  Client  │  ─────►  │  Dein Gateway │  ─────►  │ Lokales LLM  │
│ (Editor) │  Auth &  │  (Rust-Server)│  Forward │ (Ollama/vLLM)│
└──────────┘  Rating  └───────────────┘          └──────────────┘
```

* **Wie es funktioniert:** Dein Server nimmt Anfragen im standardisierten OpenAI-Format (`POST /v1/chat/completions`) entgegen. Er prüft, ob der Nutzer berechtigt ist (Authentifizierung), zählt die genutzten Token (Rate-Limiting) und leitet die Anfrage an ein im Hintergrund laufendes Ollama oder vLLM weiter.
* **Vorteil:** Du kannst eigene API-Keys vergeben, Nutzungsstatistiken speichern und Modelle dynamisch austauschen, ohne dass die Clients etwas ändern müssen.

### Weg B: Der In-Process Runner (Candle)
Du betreibst das Modell direkt *innerhalb* deines Rust-Programms, ohne externe Dienste wie Ollama.
* **Wie es funktioniert:** Du nutzt **Candle**, das leichtgewichtige Machine-Learning-Framework für Rust (entwickelt von Hugging Face). Dein Rust-Programm lädt die GGUF- oder Safetensors-Gewichte eines Modells direkt in den RAM/VRAM und führt die mathematischen Berechnungen für die Textgenerierung selbst aus.
* **Vorteil:** Keine externen Abhängigkeiten, maximale Portabilität. Dein Programm ist ein eigenständiges KI-Produkt.

---

## 💳 5. Endkunden-Abonnements (Abo-Modelle) – Sortiert von billig zu teuer

Wenn du keine Lust hast, jede API-Anfrage einzeln in Cent-Beträgen abzurechnen (Pay-as-you-go), oder wenn du eine komfortable Chat-Oberfläche im Browser und Integrationen in deine IDE suchst, sind **Abo-Modelle** (Flatrates) die beste Wahl.

Hier sind die populärsten Anbieter, sortiert nach ihren monatlichen Kosten:

| Anbieter | Preis (pro Monat) | Zielgruppe | Enthaltene Modelle & Features | Stärken / Schwächen |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub Copilot** | **$10** (ca. 9 €) / oder $100/Jahr | Entwickler | Copilot-eigene Modelle (OpenAI-basiert) direkt in VS Code / IntelliJ | **+** Günstigster Preis für Entwickler<br>**-** Kein freier Allround-Browser-Chat |
| **Supermaven Pro** | **$12** (ca. 11 €) | Entwickler | Supermaven-eigene Modelle, extrem schnelles Autocomplete | **+** Unglaublich schnelles Inline-Coding<br>**-** Nur Autovervollständigung, kein komplexes Chat-Interface |
| **Poe.com Pro** | **$20** (ca. 18-20 €) | Allrounder & Tester | Zugriff auf fast alle Modelle (GPT-4o, Claude 3.5, Gemini 1.5) via Punktekonto | **+** Maximale Flexibilität, alle Top-Modelle in einer App<br>**-** Punktelimit kann bei starker Nutzung schnell aufgebraucht sein |
| **Perplexity Pro** | **$20** (ca. 18-20 €) | Rechercheure & Entwickler | Such-KI mit Auswahl an Modellen (Claude 3.5 Sonnet, GPT-4o) | **+** Beste KI-Suchmaschine, durchsucht das Web live und verweist auf Quellen<br>**-** Weniger geeignet für reines, langes Programmier-Chats |
| **Gemini Advanced** | **$20** (ca. 18-20 €) | Google-Nutzer & Allrounder | Gemini 1.5 Pro, integriert in Google Workspace + 2 TB Google One Speicher | **+** Bestes Preis-Leistungs-Verhältnis, wenn du ohnehin Cloud-Speicher brauchst<br>**-** Code-Generierung oft etwas schlechter als Claude |
| **ChatGPT Plus** | **$20** (ca. 18-20 €) | Allrounder | GPT-4o, o1, Advanced Voice Mode, Custom GPTs, Bildgenerierung (DALL-E) | **+** Marktführer, beste Zusatzfeatures (Sprachmodus, Bildgenerierung)<br>**-** o1-Nutzung ist im Abo stark gedeckelt |
| **Claude Pro** | **$20** (ca. 18-20 €) | Programmierer & Autoren | Claude 3.5 Sonnet & Opus, Projects-Funktion, Artifacts | **+** Der absolute Programmier-König, schreibt den saubersten Code<br>**-** Sehr strenges Rate-Limit (du wirst bei viel Code oft für einige Stunden gesperrt) |
| **Cursor Pro** | **$20** (ca. 18-20 €) | Entwickler | Premium-IDE mit 500 schnellen Anfragen/Monat (Claude 3.5 Sonnet, GPT-4o) | **+** Der derzeit beste KI-Code-Editor, extrem gut integriert<br>**-** Nach 500 Anfragen langsamere Bearbeitung |

### Welches Abo lohnt sich für wen?
1. **Für Entwickler (Sparfuchs):** **GitHub Copilot** für $10/Monat ist der absolute Preis-Leistungs-Sieger für die IDE.
2. **Für Entwickler (Profi):** **Cursor Pro** ($20) oder **Claude Pro** ($20). Claude 3.5 Sonnet ist derzeit unschlagbar beim Programmieren.
3. **Für Recherche & Lernen:** **Perplexity Pro** ($20), da es Erklärungen direkt mit echten Internet-Quellen belegt.
4. **Für Familien & Cloud-Nutzer:** **Gemini Advanced** ($20), da der enthaltene 2 TB Cloud-Speicher für Fotos/Dateien das Abo für Google-Nutzer fast gratis macht.

---

## 🛠️ Praxis-Aufgaben

Damit du lernst, wie man flexibel mit verschiedenen Anbietern arbeitet, programmieren wir ein einfaches Rust-Gerüst. Da die meisten Anbieter das OpenAI-kompatible API-Format unterstützen, kannst du mit demselben Rust-Code sowohl lokale Modelle als auch Cloud-Router ansprechen!

### 🔵 Aufgabe 1: Lokales Ollama vorbereiten
1. Installiere Ollama auf deinem System (falls noch nicht geschehen).
2. Lade das kleine, aber feine Code-Modell `qwen2.5-coder:1.5b` herunter:
   ```bash
   ollama pull qwen2.5-coder:1.5b
   ```
3. Teste, ob Ollama läuft, indem du im Browser `http://localhost:11434` aufrufst.

---

### 🔵 Aufgabe 2: Der universelle API-Client in Rust
Deine Aufgabe ist es, ein Rust-Programm zu schreiben, das eine Anfrage an eine OpenAI-kompatible API sendet. Durch Ändern der URL und des API-Keys kannst du damit wahlweise Ollama (lokal) oder OpenRouter (Multi-LLM Cloud) abfragen.

Erstelle ein neues Cargo-Projekt:
```bash
cargo new multi_client
cd multi_client
```

Füge diese Abhängigkeiten in deine `Cargo.toml` ein:
```toml
[dependencies]
reqwest = { version = "0.11", features = ["json", "blocking"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

Implementiere nun in [src/main.rs](file:///home/thorsten/Anfaenger/rust-projekte/multi_client/src/main.rs) die JSON-Struktur und den HTTP-Aufruf. Verwende das folgende Gerüst und fülle die Lücken (`todo!()`):

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
struct ChatMessage {
    role: String,
    content: String,
}

#[derive(Serialize)]
struct OpenAiRequest {
    model: String,
    messages: Vec<ChatMessage>,
    stream: bool,
}

#[derive(Deserialize)]
struct Choice {
    message: ChatMessage,
}

#[derive(Deserialize)]
struct OpenAiResponse {
    choices: Vec<Choice>,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 1. Definiere die API-Endpunkte
    // Für lokales Ollama: "http://localhost:11434/v1/chat/completions"
    // Für OpenRouter: "https://openrouter.ai/api/v1/chat/completions"
    let api_url = "http://localhost:11434/v1/chat/completions";
    
    // Für Ollama reicht ein leerer String. Für OpenRouter bräuchtest du den Key.
    let api_key = ""; 
    let model_name = "qwen2.5-coder:1.5b".to_string();

    // 2. Baue den Request auf
    let request_body = OpenAiRequest {
        model: model_name,
        messages: vec![
            ChatMessage {
                role: "system".to_string(),
                content: "Du bist ein hilfreicher Rust-Tutor. Antworte kurz.".to_string(),
            },
            ChatMessage {
                role: "user".to_string(),
                content: "Was macht die Option-Crate in Rust?".to_string(),
            }
        ],
        stream: false,
    };

    // 3. Führe den HTTP POST-Request aus
    // TIPP: Nutze reqwest::blocking::Client, um den Header "Authorization" zu setzen.
    // Falls ein api_key vorhanden ist, füge ihn als "Bearer <key>" hinzu.
    let client = reqwest::blocking::Client::new();
    
    // HIER DEINE AUFGABE: Baue den POST-Request und sende ihn ab
    let response = todo!("Sende den POST-Request an api_url und parse die JSON-Antwort!");

    // 4. Gib die Antwort aus
    println!("Antwort der KI:");
    // println!("{}", response.choices[0].message.content);

    Ok(())
}
```

*Hinweis: Wenn du die Aufgabe gelöst hast, kannst du die URL auf OpenRouter ändern, den entsprechenden API-Key eintragen, das Modell zu `meta-llama/llama-3-8b-instruct:free` ändern und sehen, wie derselbe Code plötzlich mit der Cloud spricht!*

---

### 🔵 Aufgabe 3: Deinen eigenen API-Gateway-Proxy in Rust bauen

**Ziel:** Erstelle einen einfachen API-Proxy-Server in Rust. Der Server lauscht auf `localhost:3000/v1/chat/completions`, verlangt einen API-Key in den HTTP-Headern und leitet die Anfragen an dein lokales Ollama weiter.

Erstelle ein neues Cargo-Projekt:
```bash
cargo new my_llm_gateway
cd my_llm_gateway
```

Füge diese Abhängigkeiten in deine `Cargo.toml` ein:
```toml
[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["full"] }
reqwest = { version = "0.12", features = ["json"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

Schreibe nun in [src/main.rs](file:///home/thorsten/Anfaenger/rust-projekte/my_llm_gateway/src/main.rs) den Webserver. Verwende dieses Code-Gerüst und fülle die Lücken (`todo!()`):

```rust
use axum::{
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    routing::post,
    Json, Router,
};
use serde_json::Value;

// Der Handler für den Chat-Endpunkt
async fn handle_chat(
    headers: HeaderMap,
    Json(payload): Json<Value>,
) -> impl IntoResponse {
    // 1. Authentifizierung prüfen
    // Tipp: Hole den "Authorization"-Header und vergleiche ihn mit "Bearer geheimnis"
    let authenticated = todo!("Prüfe, ob der Authorization-Header 'Bearer geheimnis' enthält");

    if !authenticated {
        return (StatusCode::UNAUTHORIZED, "Falscher oder fehlender API-Key").into_response();
    }

    // 2. Request an Ollama weiterleiten
    // Tipp: Nutze reqwest::Client, um payload als POST-Request an
    // http://localhost:11434/v1/chat/completions zu senden.
    let ollama_url = "http://localhost:11434/v1/chat/completions";
    let client = reqwest::Client::new();
    
    // HIER DEINE AUFGABE: Sende den Payload an Ollama und hole das Ergebnis
    let response = todo!("Sende den Request an Ollama");

    // 3. Ergebnis an den Client zurückgeben
    (StatusCode::OK, Json(response)).into_response()
}

#[tokio::main]
async fn main() {
    // 4. Router einrichten und Server starten
    let app = Router::new().route("/v1/chat/completions", post(handle_chat));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    println!("Privates LLM-Gateway läuft auf http://127.0.0.1:3000");
    
    axum::serve(listener, app).await.unwrap();
}
```

*Tipp zur Validierung: Du kannst dein Programm aus Aufgabe 2 nutzen, um dein Gateway zu testen! Ändere dort einfach die URL auf `http://localhost:3000/v1/chat/completions` und den API-Key auf `geheimnis`!*

---

## 💡 Zusammenfassung: Welchen Anbieter wähle ich wann?

Damit du die Übersicht behältst, findest du hier den Entscheidungshelfer für dein nächstes Rust-Projekt:

| Dein Ziel | Empfohlener Weg | Hauptvorteil |
| :--- | :--- | :--- |
| **Datenschutz & Kostenlos** | **Lokales Ollama** | Vollständig offline, 0€ Kosten, keine Datenlecks |
| **Hobby-Projekte & Prototypen** | **Google Gemini API (Free Tier)** | Kostenlose Premium-Modelle direkt über die Cloud |
| **Spitzenleistung bei Minipreisen** | **DeepSeek API** | Extrem starkes Reasoning (R1) für einen Bruchteil des Preises |
| **Experimente mit vielen Modellen** | **OpenRouter / DeepInfra** | Ein einziger API-Key für über 100 verschiedene Modelle |
| **Produktivbetrieb (Günstig)** | **DeepInfra, DeepSeek oder Gemini API** | Extrem niedrige Kosten pro Million Token |
| **Maximale Code-Qualität** | **Anthropic (Claude 3.5 Sonnet)** | Der Goldstandard für logische Entwicklungsaufgaben |
| **Firmen-Compliance / Enterprise** | **AWS Bedrock / Azure AI / Cohere** | Datenschutzgarantien und feste Service Level Agreements |

---

## 📚 Links
* [OpenRouter](https://openrouter.ai/) – Der größte Multi-LLM-Router.
* [DeepInfra](https://deepinfra.com/) – Extrem günstiger Hoster für Open Source.
* [Ollama](https://ollama.com/) – Die einfachste Lösung für lokales Hosten.
* [Google AI Studio](https://aistudio.google.com/) – Zugriff auf den Gemini API Key und Free Tier.
* [DeepSeek Platform](https://platform.deepseek.com/) – Die extrem günstige Entwicklerplattform.
* [xAI Console](https://console.x.ai/) – API-Zugriff auf die Grok-Modellfamilie.
* [Cohere Dashboard](https://dashboard.cohere.com/) – Enterprise LLMs und RAG-Lösungen.
* [LM Studio](https://lmstudio.ai/) – Lokale Modelle mit schöner UI.
