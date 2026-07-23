# 🌐 Wissenssystem Stufe 3: Das interaktive Web-Wiki (Axum & Async)

Willkommen zur dritten Stufe unseres Wissenssystems! Nach der CLI-Steuerung in Stufe 1 und der persistenten Datenbank-Anbindung in Stufe 2 bringen wir dein Projekt jetzt ins globale Netz: Wir bauen ein **interaktives Web-Wiki im Browser**.

In diesem Kapitel lernst du, wie du mit **Axum** (einem der modernsten Web-Frameworks für Rust) und **Tokio** (der asynchronen Runtime) eine vollwertige Webanwendung entwickelst, in der Benutzer Artikel lesen, bearbeiten und neu anlegen können.

---

## 🚀 1. Einleitung & Vision

Stell dir vor, du öffnest deinen Browser, steuerst `http://localhost:3000` an und vor dir erscheint dein eigenes, blitzschnelles Wissenssystem! Du kannst durch Artikel navigieren, fehlende Seiten direkt über ein Formular anlegen und bestehende Inhalte per Klick überarbeiten.

Rust eignet sich hervorragend für Web-Backends, da es extrem speichereffizient ist, tausende parallele Anfragen ohne Overhead verarbeiten kann und dich dank des Typsystems vor Thread-Safety-Problemen schützt.

---

## 🧠 2. Die Bildmetapher: Der Online-Lesesaal mit Redaktion

Um zu verstehen, wie ein asynchroner Webserver mit mehreren gleichzeitigen Benutzern arbeitet, hilft uns das Bild eines modernen **Online-Lesesaals**:

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             DEIN ONLINE-LESESAAL                                │
│                                                                                  │
│  [ Besucher / Browser ] ─── HTTP-Anfrage ───► [ Empfangspult: Axum Router ]      │
│                                                       │                          │
│                                              Zuweisung an Handler                │
│                                                       ▼                          │
│                                           [ Redaktionsstube: State ]             │
│                                           Arc<RwLock<HashMap<...>>>              │
│                                            /                     \               │
│                                   (Viele Leser)            (Ein Autor)           │
│                                  Parallel Lesen             Exklusiv Schreiben   │
│                                         │                        │               │
│                                         ▼                        ▼               │
│                                  [ Lese-Zugriff ]        [ Schreib-Zugriff ]     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

- **Das Empfangspult (`Axum Router`)**: Nimmt alle eingehenden Browser-Anfragen entgegen (z. B. "Ich möchte Artikel X lesen") und leitet sie an die zuständige Fachkraft (den Handler) weiter.
- **Der Aufzug & die Boten (`Tokio Runtime`)**: Bearbeitet hunderte Anfragen asynchron nebeneinander, ohne dass ein Mitarbeiter auf den anderen warten muss.
- **Die Redaktionsstube (`Arc<RwLock<HashMap>>`)**: Hier lagert das gemeinsame Wissen. 
  - **`Arc`** sorgt dafür, dass alle Mitarbeiter Zugriff auf dieselben Unterlagen haben.
  - **`RwLock`** erlaubt es beliebig vielen Besuchern gleichzeitig, Artikel zu **lesen**, stellt aber sicher, dass nur genau ein Autor gleichzeitig einen Artikel **schreiben** oder ändern darf.

---

## 🏗️ 3. Architektur & Web-Routen

Unsere Anwendung basiert auf klar definierten HTTP-Routen und einem zentralen Speicherzustand (State).

### Die Web-Routen

| HTTP-Methode | Pfad | Beschreibung |
| :--- | :--- | :--- |
| `GET` | `/` | **Startseite**: Zeigt eine Liste aller vorhandenen Wiki-Artikel |
| `GET` | `/wiki/:slug` | **Artikel lesen**: Reicht den Slug (z. B. `rust-basics`) ein und zeigt den Inhalt als HTML |
| `GET` | `/wiki/:slug/edit` | **Editor öffnen**: Zeigt ein Formular zum Bearbeiten des Artikels |
| `POST` | `/wiki/:slug` | **Speichern**: Nimmt die Formulardaten entgegen und aktualisiert den State |

### Gemeinsamer Zustand (State Sharing)

Da Axum jede Anfrage in einem eigenen asynchronen Task verarbeitet, müssen Daten sicher zwischen Threads geteilt werden.

```rust
// Der Artikel selbst
pub struct Article {
    pub title: String,
    pub content: String,
}

// Unser gemeinsamer In-Memory-Speicher
// Schlüssel: Slug (z. B. "einfuehrung"), Wert: Article
pub type Db = Arc<RwLock<HashMap<String, Article>>>;
```

- **`Arc` (Atomic Reference Counting):** Erlaubt es mehreren Besitzern (Tasks/Threads), eine Referenz auf den Speicherzustand zu halten.
- **`RwLock` (Read-Write Lock):** Bietet flexible Zugriffskontrolle:
  - `.read().await`: Mehrere Lesezugriffe parallel erlaubt.
  - `.write().await`: Exklusiver Schreibzugriff (blockiert Leser während des Schreibens kurzzeitig).

---

## ⚙️ 4. Code-Gerüst mit `todo!()`

Hier ist die Grundstruktur deines Web-Wiki-Servers. Ergänze die fehlenden Teile in den Handler-Funktionen, um den Server zum Leben zu erwecken!

```rust
use axum::{
    extract::{Path, State},
    response::{Html, IntoResponse, Redirect},
    routing::{get, post},
    Form, Router,
};
use serde::Deserialize;
use std::{
    collections::HashMap,
    sync::{Arc, RwLock},
};

// 1. Artikel-Struktur & Shared State definieren
#[derive(Clone, Debug)]
pub struct Article {
    pub title: String,
    pub content: String,
}

// Typ-Alias für unseren sicheren Speicher
pub type SharedState = Arc<RwLock<HashMap<String, Article>>>;

// Formular-Daten für POST-Anfragen
#[derive(Deserialize)]
pub struct ArticleForm {
    pub title: String,
    pub content: String,
}

#[tokio::main]
async fn main() {
    // Shared State initialisieren & mit Beispiel-Daten füllen
    let state: SharedState = Arc::new(RwLock::new(HashMap::new()));
    
    // Initialen Test-Artikel einfügen (Pseudocode / Denkanstoß)
    // state.write().unwrap().insert(...);

    // 2. Router definieren
    let app = Router::new()
        .route("/", get(show_index))
        .route("/wiki/{slug}", get(show_article))
        .route("/wiki/{slug}/edit", get(show_edit_form))
        .route("/wiki/{slug}", post(save_article))
        .with_state(state);

    // 3. Server starten auf localhost:3000
    println!("🚀 Wiki-Server läuft auf http://localhost:3000");
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    
    axum::serve(listener, app).await.unwrap();
}

// --- HANDLER FUNKTIONEN ---

/// Zeigt die Startseite mit einer Übersicht aller Artikel
async fn show_index(State(state): State<SharedState>) -> impl IntoResponse {
    // Denkanstoß: Lies alle Slugs & Titel aus dem State und baue eine HTML-Liste
    todo!("Lies aus state.read() und gib ein Html(...) mit der Artikelliste zurück")
}

/// Zeigt einen einzelnen Artikel an
async fn show_article(
    Path(slug): Path<String>,
    State(state): State<SharedState>,
) -> impl IntoResponse {
    // Denkanstoß: Prüfe, ob der Slug in der HashMap existiert.
    // Wenn ja -> HTML mit Titel & Inhalt anzeigen.
    // Wenn nein -> Fehlerseite oder Hinweis "Artikel existiert nicht" anzeigen.
    todo!("Implementiere die Anzeige für einen Artikel basierend auf dem Slug")
}

/// Zeigt das Bearbeitungs-Formular für einen Artikel
async fn show_edit_form(
    Path(slug): Path<String>,
    State(state): State<SharedState>,
) -> impl IntoResponse {
    // Denkanstoß: Hole den bestehenden Artikel (falls vorhanden) für die Formular-Vorausfüllung
    // und erstelle ein HTML-<form action="/wiki/..." method="post">.
    todo!("Erstelle das HTML-Formular mit Input-Feldern für Titel und Text")
}

/// Speichert Änderungen an einem Artikel
async fn save_article(
    Path(slug): Path<String>,
    State(state): State<SharedState>,
    Form(payload): Form<ArticleForm>,
) -> impl IntoResponse {
    // Denkanstoß: Nutze state.write(), um den Artikel in der HashMap zu aktualisieren
    // oder neu anzulegen. Leite danach mit Redirect::to(...) auf die Leseansicht weiter.
    todo!("Speichere den Artikel ab und führe einen HTTP-Redirect durch")
}
```

---

## 🧪 5. Übungsaufgaben

Verwende das Code-Gerüst oben und baue das Wiki Schritt für Schritt aus!

### 🟢 Leicht: Navigation & Buttons
Füge auf der Artikelseite (`show_article`) zwei HTML-Links hinzu:
1. Einen Link zurück zur Startseite (`/`).
2. Einen "Bearbeiten"-Button, der direkt zu `/wiki/:slug/edit` führt.

*Leitfrage:* Wie strukturierst du das HTML in der Handler-Funktion, sodass der Pfad dynamisch eingefügt wird?

---

### 🟡 Mittel: Einfache Markdown-Vorschau
Aktuell geben wir Text unformatiert aus. Versuche in `show_article` einfachen Text vor der HTML-Ausgabe aufzubereiten:
- Ersetze doppelte Sternchen `**text**` durch `<strong>text</strong>`.
- Ersetze Rautenzeichen `# Überschrift` durch `<h1>Überschrift</h1>`.

*Denkanstoß:* Kannst du dafür einfache `String::replace`-Aufrufe nutzen oder lohnt sich eine kleine Hilfsfunktion?

---

### 🔴 Schwer: Autosave & Entwurfs-Speicher (Denkanstoß)
Stell dir vor, ein Autor schreibt einen langen Artikel im Web-Formular. Wie könntest du verhindern, dass der Text bei einem Browser-Absturz verloren geht?

*Denkanstöße & Leitfragen:*
1. Wie könnte eine API-Route `POST /api/draft/:slug` aussehen, die via JavaScript Fetch im Hintergrund aufgerufen wird?
2. Brauchst du in deinem `Article`-Struct ein Feld `pub draft: Option<String>`?
3. Welche Auswirkung hätte das häufige Schreiben von Entwürfen auf die Performance deines `RwLock`?

---

## 🎯 6. Zusammenfassung

In dieser dritten Stufe hast du wichtige Grundsteine moderner Rust-Webentwicklung kennengelernt:

- **Axum Router & Extraktoren:** Wie HTTP-Anfragen sauber an Handler weitergeleitet und Pfad-Parameter (`Path`), Formular-Daten (`Form`) und Zustand (`State`) extrahiert werden.
- **Asynchrones Tokio-Fundament:** Wie asynchrone Handler hohe Nebenläufigkeit ermöglichen.
- **Thread-sicherer State (`Arc<RwLock>`):** Wie Rust garantiert, dass parallele Lese- und Schreibzugriffe ohne Data Races ablaufen.

Du hast nun ein funktionierendes Fundament für ein vollwertiges Web-Wiki geschaffen! 🚀
