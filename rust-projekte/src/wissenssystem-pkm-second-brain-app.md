# 🧠 Das eigene "Zweite Gehirn" (PKM-Tool) in Rust bauen: CLI, Desktop-GUI & Web

In den bisherigen Kapiteln hast du die einzelnen Bausteine moderner Notiz- und Lernsysteme kennengelernt. Nun führen wir alle Fäden zusammen und bauen die **Königsdisziplin aller Wissenswerkzeuge**: Ein eigenes **Personal Knowledge Management (PKM) Tool** – dein persönliches **"Zweites Gehirn"** (inspiriert von Notion, Obsidian und Roam Research)!

Das Besondere an unserem Rust-Ansatz: Wir schreiben die Kernlogik exakt **einmal** als wiederverwendbare Bibliothek (`pkm_core`) und bauen darauf **drei kraftvolle Schnittstellen**:
1. 📟 **Eine Terminal-CLI** (`pkm_cli`) für blitzschnelles Tastatur-Capturing.
2. 🖥️ **Eine Desktop-GUI** (`pkm_gui`) mit interaktiver Notiz-Graph-Visualisierung (`egui`/`Tauri`).
3. 🌐 **Eine Web-App** (`pkm_web`) für den Zugriff im Browser von jedem Gerät (Axum / Wasm).

---

## 🚀 Einleitung & Vision: Die C.O.D.E.-Methode im eigenen System

Ein **Zweites Gehirn** hilft dir, die tägliche Informationsflut zu bändigen und Ideen in konkrete Projekte zu verwandeln. Es folgt der bewährten **C.O.D.E.-Methode**:

- **C - Capture (Erfassen):** Spontane Gedanken in Sekundenbruchteilen festhalten.
- **O - Organize (Organisieren):** Notizen dynamisch vernetzen und verschlagworten.
- **D - Distill (Destillieren):** Das Wesentliche durch Zusammenfassungen herausschälen.
- **E - Express (Ausdrücken):** Wissen in neue Projekte, Bücher oder Software verwandeln.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   DAS DREIKÖPFIGE PKM-SYSTEM (PKM VAULT)               │
│                                                                        │
│   📟 Terminal-CLI          🖥️ Desktop-GUI           🌐 Web-Browser    │
│   (Blitz-Capture)          (Visual Graph)           (Zugriff überall)  │
│          │                        │                        │           │
│          └────────────────────────┼────────────────────────┘           │
│                                   ▼                                    │
│                    🧠 Shared Core Crate (`pkm_core`)                   │
│                    • Vault Engine & Storage                            │
│                    • Link-Parser & Backlink-Graph                      │
│                    • Volltext- & Vektorsuche                           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧠 Die Bildmetapher: Der dreiköpfige Wissens-Wächter

Stell dir dein PKM-Tool wie einen **dreiköpfigen Wächter deines Wissens-Schatzes** vor:

1. **Der Kern (`pkm_core`)**: Das schlagende Herz im Tresorraum. Er verwaltet deinen Notiz-Tresor (Vault), parst WikiLinks (`[[Gedanke]]`), berechnet Verbindungen und garantiert die Datensicherheit.
2. **Der Terminal-Kopf (`pkm_cli`)**: Der rasche Bote. Du tippst `pkm quick "Rust Mutex Idee"` ins Terminal, und in 5 Millisekunden ist der Gedanke sicher im Tresor gespeichert.
3. **Der Visuelle Kopf (`pkm_gui`)**: Der Kartograf. Er öffnet ein schickes Desktop-Fenster mit einem interaktiven Sternenhimmel aus Notizen und Verbindungsfäden (Obsidian-Style Graph Viewer).
4. **Der Browser-Kopf (`pkm_web`)**: Der Botschafter. Er stellt deinen Notiz-Schatz als reaktive Web-Anwendung im Browser bereit, egal ob auf dem Tablet oder Smartphone.

---

## 🏗️ Architektur & Cargo-Workspace

Wir nutzen ein elegantes **Cargo Workspace Layout**, um maximale Code-Wiederverwendung zu garantieren.

```text
pkm-workspace/
├── Cargo.toml
├── crates/
│   ├── pkm_core/       # Domain Logic, Markdown Parser, Graph, Storage
│   ├── pkm_cli/        # Terminal CLI mit clap
│   ├── pkm_gui/        # Desktop GUI mit egui / eframe
│   └── pkm_web/        # Axum Web-Server & Wasm Component
```

### 1. Das zentrale Notiz-Modell (`pkm_core`)

```rust
use std::collections::HashSet;
use chrono::{DateTime, Utc};
use uuid::Uuid;

/// Eine Notiz im Zweiten Gehirn
#[derive(Debug, Clone)]
pub struct Note {
    pub id: Uuid,
    pub title: String,
    pub body: String,
    pub tags: HashSet<String>,
    /// Automatisch erkannte Ausgehende Links (`[[Titel]]`)
    pub outgoing_links: HashSet<String>,
    /// Rückverweise (Welche Notizen verlinken hierher?)
    pub backlinks: HashSet<Uuid>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
```

### 2. Der Vault-Manager (`pkm_core`)

```rust
use std::collections::HashMap;
use std::path::PathBuf;

pub struct PkmVault {
    pub vault_path: PathBuf,
    pub notes: HashMap<Uuid, Note>,
    /// Index: Titel/Slug -> Note-ID für blitzschnelle WikiLink-Auflösung
    pub title_index: HashMap<String, Uuid>,
}
```

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das didaktische Core-Gerüst für dein plattformübergreifendes PKM-System. Ergänze die Lücken überall dort, wo `todo!()` steht!

### 1. Die Shared Engine (`pkm_core`)

```rust
use std::collections::HashMap;
use std::path::Path;
use uuid::Uuid;

// (Datenstrukturen wie oben definiert)

impl PkmVault {
    pub fn open(vault_path: &Path) -> Result<Self, std::io::Error> {
        // TODO: Durchsuche das Verzeichnis nach .md Dateien, parst WikiLinks und baut den Backlink-Graph auf!
        todo!("Lade Notizen aus dem Tresor-Ordner und baue die Indizes auf")
    }

    pub fn capture_quick_note(&mut self, title: &str, body: &str) -> Uuid {
        // TODO: Erstelle eine neue Notiz, speichere sie als Markdown-Datei im Vault
        // und aktualisiere den Graph!
        todo!("Implementiere das schnelle Erfassen von Notizen")
    }
}
```

---

### 2. Die CLI-Schnittstelle (`pkm_cli`)

```rust
// In crates/pkm_cli/src/main.rs
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "pkm", author = "Du", version = "1.0", about = "Dein Zweites Gehirn im Terminal")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Schnell eine neue Notiz erfassen
    Capture { title: String, #[arg(short, long)] body: Option<String> },
    /// Im Notiz-Tresor suchen
    Search { query: String },
    /// Starte die Desktop-GUI
    Gui,
}

fn main() {
    let cli = Cli::parse();
    // TODO: Binde pkm_core an und verarbeite die Befehle!
}
```

---

### 3. Die Desktop-GUI Canvas (`pkm_gui` mit `egui`)

```rust
// In crates/pkm_gui/src/lib.rs
// Visualisiere Notizen als interaktiven Graphen im Desktop-Fenster

pub struct PkmGuiApp {
    // Shared Vault State
}

impl PkmGuiApp {
    pub fn render_graph_view(&mut self, ctx: &egui::Context, ui: &mut egui::Ui) {
        // Leitfragen für das Zeichnen von Knoten und Kanten:
        // 1. Wie zeichnest du jeden Notiz-Knoten als Kreis mit `ui.painter().circle_filled()`?
        // 2. Wie verbindest du verlinkte Notizen mit Linien (`ui.painter().line_segment()`)?
        // 3. Wie machst du Knoten per Maus klickbar, um die Notiz im Editor zu öffnen?

        todo!("Implementiere die interaktive Graph-Visualisierung mit egui!")
    }
}
```

---

## 🧪 Übungsaufgaben

Stelle dein Können unter Beweis und vollende dein "Zweites Gehirn"!

### 🟢 Leicht: CLI-Quick-Capture mit Hotkey
Erweitere die `pkm_cli`, sodass `pkm capture "Idee"` ohne weitere Parameter sofort einen Zeitstempel-Titel generiert und die Notiz speichert.

### 🟡 Mittel: Graph-Layout mit Physik-Simulation (Force-Directed Graph)
Erweitere die Desktop-GUI (`pkm_gui`):
- Implementiere eine einfache Feder-Physik-Simulation (Abstoßung zwischen Knoten, Anziehung bei Verlinkungen), sodass sich die Notizen im Graphen automatisch ästhetisch anordnen!

### 🔴 Schwer: Cross-Platform Live Vault Watcher
Baue eine Echtzeit-Synchronisation zwischen CLI, GUI und Web:
- Nutze das `notify`-Crate in `pkm_core`, um den Vault-Ordner auf der Festplatte zu überwachen.
- Wenn eine Datei extern geändert wird (z. B. durch einen Texteditor), aktualisiert sich die GUI und Web-App in Echtzeit ohne Neustart!

---

## 🎯 Zusammenfassung

Mit dem Bau deines eigenen **Zweiten Gehirns (PKM-Tool)** hast du die höchste Stufe der Systementwicklung erreicht:
- **Clean Architecture:** Eine gemeinsame Rust-Core-Bibliothek (`pkm_core`) versorgt alle Oberflächen.
- **Multiplattform:** CLI für Schnelligkeit, Desktop-GUI für Visualisierung, Web-App für Flexibilität.
- **Volle Datenkontrolle:** Deine Gedanken liegen als einfache, zukunftssichere Markdown-Dateien auf deiner eigenen Festplatte.

Du besitzt nun dein persönliches, maßgeschneidertes Wissens-Imperium in Rust! 🧠🖥️🌐🚀
