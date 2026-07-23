# 🚀 Eigenes Wiki-CMS in Rust bauen (MeinCMS-Architektur)

In diesem Kapitel erfährst du, wie du ein vollständiges, hochperformantes und modular aufgebautes **Wiki-CMS** in Rust entwickelst. Dieses Projekt bringt viele zentrale Rust-Konzepte zusammen: **Cargo Workspaces, Async/Await mit Axum, Custom Parsing, Memory Safety und CLI-Tools**.

---

## 🧠 Die Bildmetapher: Der digitale Buchverlag

Stelle dir dein Wiki-CMS wie einen hochmodernen Zeitungsverlag oder Buchverlag vor:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          DEIN WIKI-VERLAG                              │
│                                                                        │
│  [ Pförtner ]       ──> Prüft Ausweise (Admin-Auth & Login)            │
│  [ Lektorat ]       ──> Wandelt Entwürfe in Layouts um (Wiki-Parser)   │
│  [ Lesesaal ]       ──> Liefert Seiten blitzschnell aus (Axum Web)     │
│  [ Staatsarchiv ]   ──> Sichert Rohtexte & stellt sie wieder her (CLI) │
└────────────────────────────────────────────────────────────────────────┘
```

- **Das Lektorat (`wiki_parser`)**: Nimmt Rohdaten (Markdown/Wiki-Syntax) entgegen, prüft sie und wandelt sie in sauberes HTML um.
- **Der Lesesaal (`wiki_web`)**: Der asynchrone Webserver (Axum), der Anfragen von Lesern entgegennimmt und die fertig gestalteten Artikel ausliefert.
- **Der Pförtner (`wiki_admin`)**: Ein CLI-Tool, mit dem Administratoren angelegt und Zugriffsrechte verwaltet werden.
- **Das Staatsarchiv (`wiki_backup`)**: Ein Backup-Tool, das Rohdaten effizient sichert und bei Bedarf neu aufbaut.

---

## 🏗️ Die Workspace-Architektur

Um dein Wiki übersichtlich und erweiterbar zu halten, unterteilst du das Projekt in einen **Cargo Workspace** mit vier spezialisierten Crates:

```text
mein_wiki/
├── Cargo.toml               # Workspace-Konfiguration
├── wiki_parser/             # Lexer, Parser & HTML-Renderer
├── wiki_web/                # Axum-Webserver & HTTP-Routen
├── wiki_admin/              # CLI-Tool für Admin-Verwaltung
└── wiki_backup/             # Sichern & Wiederherstellen von Artikeln
```

### Die Workspace-`Cargo.toml`

Im Wurzelverzeichnis verbindet die Workspace-Datei alle Module miteinander:

```toml
[workspace]
resolver = "2"
members = [
    "wiki_parser",
    "wiki_web",
    "wiki_admin",
    "wiki_backup",
]

[profile.release]
opt-level = 3
lto = true
codegen-units = 1
panic = "abort"
strip = true
```

---

## 🧱 Baustein 1: Der Wiki-Parser (`wiki_parser`)

Der Parser wandelt Rohtext (wie `[[Rust]]` oder `# Überschrift`) in einen **Abstract Syntax Tree (AST)** um und generiert daraus HTML.

### Der Datenstruktur-Entwurf (AST)

```rust
/// Ein Knoten im Abstract Syntax Tree unseres Wikis
#[derive(Debug, PartialEq, Clone)]
pub enum WikiNode {
    Heading { level: usize, text: String },
    Paragraph(String),
    WikiLink { target: String, label: String },
    CodeBlock { language: String, code: String },
}

/// Parst einen Wiki-Quelltext in eine Liste von AST-Knoten
pub fn parse_wiki_text(input: &str) -> Vec<WikiNode> {
    // TODO: Zerlege den Eingabetext Zeile für Zeile und erstelle die passenden WikiNodes
    todo!("Implementiere den Parser für Wiki-Syntax")
}

/// Wandelt AST-Knoten in valides HTML um
pub fn render_to_html(nodes: &[WikiNode]) -> String {
    // TODO: Iteriere über die Knoten und baue den HTML-String auf
    todo!("Implementiere das HTML-Rendering")
}
```

💡 **Denkanstoß:** Wie würdest du Links der Form `[[Rust|Die Sprache Rust]]` parsen? Trenne das Ziel (`Rust`) vom angezeigten Text (`Die Sprache Rust`).

---

## 🌐 Baustein 2: Der Axum-Webserver (`wiki_web`)

Der Webserver nimmt HTTP-Anfragen entgegen, holt Artikel aus dem Speicher oder der Datenbank und nutzt den `wiki_parser`, um das HTML an den Browser zu senden.

### Anwendungs-Zustand & Routen-Gerüst

```rust
use std::sync::Arc;
use std::collections::HashMap;
use tokio::sync::RwLock;

/// Der gemeinsame Zustand des Webservers (In-Memory Artikel-Speicher)
pub struct AppState {
    pub articles: RwLock<HashMap<String, String>>, // Slug -> Wiki-Quelltext
}

/// Startet den Webserver
#[tokio::main]
async fn main() {
    let state = Arc::new(AppState {
        articles: RwLock::new(HashMap::new()),
    });

    // TODO: Erstelle den Axum Router mit folgenden Routen:
    // GET  /             -> Startseite
    // GET  /wiki/:slug   -> Artikel anzeigen
    // POST /wiki/:slug   -> Artikel speichern (Admin)
    
    todo!("Richte den Axum-Router ein und starte den Server auf Port 3000")
}
```

### Handler für Artikel-Anzeige

```rust
// Pseudocode / Gerüst für den Artikel-Handler:
// 1. Schlage den Artikel im AppState nach matching slug nach.
// 2. Falls gefunden: Parse den Quelltext mit `wiki_parser::parse_wiki_text`.
// 3. Wandle das Ergebnis in HTML um mit `wiki_parser::render_to_html`.
// 4. Falls nicht gefunden: Liefere einen 404-Fehler oder eine "Seite erstellen"-Vorlage.
```

---

## 🔐 Baustein 3: Admin & Sicherheit (`wiki_admin`)

Sicherheit ist bei Wikis essenziell. Registrierungen sollten geschützt und Admin-Passwörter sicher gehasht werden.

### Sicheres Passwort-Hashing (Konzept)

Verwende für Passwörter niemals Klartext oder einfache Hashes wie MD5/SHA256, sondern moderne Verfahren wie **Argon2id**:

```rust
/// Hasht ein Passwort für die sichere Speicherung
pub fn hash_password(password: &str) -> Result<String, String> {
    // TODO: Nutze die argon2-Crate zum Generieren eines sicheren Hashes
    todo!("Implementiere Argon2id Password Hashing")
}

/// Prüft, ob das eingegebene Passwort mit dem gespeicherten Hash übereinstimmt
pub fn verify_password(password: &str, hash: &str) -> bool {
    // TODO: Vergleiche das Passwort mit dem Hash
    todo!("Implementiere Passwort-Verifikation")
}
```

---

## 📦 Baustein 4: Der Backup- & Speicher-Trick (`wiki_backup`)

Ein cleverer Trick aus der **MeinCMS-Praxis**: Speichere im Backup **nur den Quelltext (Markdown/Wiki-Syntax)**, niemals das fertig gerenderte HTML!

### Warum?
- **70 % Speicherersparnis:** HTML-Tags blähen Backups extrem auf.
- **Zukunftssicherheit:** Wenn du das HTML-Design oder den Parser verbesserst, kannst du beim Import alle Artikel automatisch **frisch regenerieren** (`repair`-Befehl).

```rust
pub struct BackupArticle {
    pub slug: String,
    pub title: String,
    pub raw_content: String,
}

pub fn export_backup(filepath: &str) -> Result<(), std::io::Error> {
    // TODO: Lade alle Artikel und schreibe sie als YAML/JSON ab
    todo!("Exportiere Rohdaten im YAML-Format")
}

pub fn import_and_repair_backup(filepath: &str) -> Result<(), std::io::Error> {
    // TODO: Lese Rohdaten, generiere das HTML neu und speichere die Artikel
    todo!("Importiere Rohdaten und regeneriere den HTML-Cache")
}
```

---

## 🧪 Übungsaufgaben für dich

### 🟢 Leicht: Eigene Wiki-Syntax erweitern
Erweitere die `WikiNode`-Enum und den Parser in `wiki_parser`, sodass Fett-Text mit `**Wort**` erkannt und als `<strong>Wort</strong>` gerendert wird.

### 🟡 Mittel: In-Memory Caching
Beim Aufruf eines Artikels soll das gerenderte HTML in einer `HashMap` zwischengespeichert werden. Erst wenn der Artikel bearbeitet wird, wird der Cache gelöscht. Wie setzt du das mit `RwLock` um?

### 🔴 Schwer: Dynamische Makros (Rhai-Skripting)
Integriere die Skriptsprache **Rhai**, um dynamische Bausteine im Wiki zu erlauben, z.B.:
`{{#rhai: current_date() }}` oder `{{#rhai: count_articles() }}`.

---

## 🎯 Zusammenfassung & Nächste Schritte

Mit dieser Workspace-Architektur hast du das Fundament für ein extrem schnelles, sicheres und erweiterbares Wiki-CMS gelegt. Der modulare Aufbau erlaubt es dir, einzelne Teile (wie den Parser oder den Webserver) unabhängig voneinander zu testen und zu verbessern.

Viel Erfolg beim Bau deines eigenen Rust-Wikis! 🦀🚀
