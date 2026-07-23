# ✍️ Integration: Autorensysteme direkt in CMS & Wissensmanagement einbauen

Bisher haben wir das Autorensystem als eigenständiges Werkzeug betrachtet. Doch die wahre Magie entsteht, wenn du ein **Autorensystem direkt in dein CMS oder Wissensmanagement-System integrierst**!

In diesem Kapitel lernst du, wie Autoren Inhalte direkt im Browser oder CLI verfassen, in Echtzeit in einer **Live-Vorschau** sehen, Revisionshistorien verwalten und Artikel über einen **Freigabe-Workflow (Draft -> Review -> Published)** veröffentlichen.

---

## 🚀 Einleitung & Vision: Das integrierte Redaktions-System

Ein in das CMS/Wissenssystem integriertes Autorensystem bietet unschlagbare Vorteile:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   DAS INTEGRIERTE AUTOREN-CMS                          │
│                                                                        │
│  [ Autoren-Workspace ] ──► Live-Preview (WebSockets / SSE)             │
│  • Block- & Markdown-Editor                                            │
│  • Revisionsverwaltung (Version 1 -> Version 2 -> Version 3)          │
│                                              │                         │
│                                              ▼                         │
│  [ Freigabe-Workflow ] ──► (Draft -> In Review -> Published)           │
│                                              │                         │
│                                              ▼                         │
│  [ Öffentliches Wiki / CMS ] ──► Leserneinsicht                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Warum diese Integration in Rust bauen?
- **Typsichere Revisionshistorie:** Rusts Enums verhindern, dass ein Entwurf versehentlich im öffentlichen Bereich landet, bevor er freigegeben wurde.
- **Blitzschnelle Live-Vorschau:** Rust rendert Textänderungen in Millisekunden und kann Vorschau-Signale via WebSockets oder Server-Sent Events (SSE) an den Browser senden.
- **Rollensicherheit:** Autoren, Lektoren und Admins haben genau festgelegte Rechte auf Mutationsebene.

---

## 🧠 Die Bildmetapher: Die Zeitungs-Redaktion im Verlagshaus

Stell dir das integrierte Autorensystem wie die **Redaktion einer großen Tageszeitung** vor:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     DIE ZEITUNGS-REDAKTION IM CMS                      │
│                                                                        │
│  1. [ Der Redaktionsschreibtisch (`AuthorWorkspace`) ]                 │
│     └── Wo Journalisten Artikel schreiben & Bilder anordnen            │
│                                                                        │
│  2. [ Das Kontrollfenster (`LivePreview`) ]                            │
│     └── Zeigt in Echtzeit, wie die gedruckte Zeitung aussehen wird     │
│                                                                        │
│  3. [ Das Revisions-Archiv (`VersionHistory`) ]                        │
│     └── Speichert jede geänderte Fassung des Artikels ab               │
│                                                                        │
│  4. [ Der Chefredakteur-Stempel (`ApprovalWorkflow`) ]                 │
│     └── Gibt den Entwurf frei: Erst dann geht der Artikel in den Druck! │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architektur & Datenstrukturen

Ein integriertes Autorensystem benötigt Zustands-Verwaltung für Veröffentlichungs-Phasen und Versionshistorien.

### 1. Artikel-Status & Freigabe-Workflow

```rust
use chrono::{DateTime, Utc};
use uuid::Uuid;

/// Die verschiedenen Phasen eines Artikels im CMS-Lebenszyklus
#[derive(Debug, Clone, PartialEq)]
pub enum ArticleStatus {
    /// In Bearbeitung durch den Autor (nicht öffentlich)
    Draft,
    /// Zur Korrektur beim Lektor/Chefredakteur eingereicht
    PendingReview,
    /// Öffentlich im CMS / Wiki sichtbar
    Published,
    /// Archivierte Alt-Version
    Archived,
}

/// Eine konkrete Revision (Version) eines Artikels
#[derive(Debug, Clone)]
pub struct ArticleRevision {
    pub version: u32,
    pub content: String,
    pub author_id: Uuid,
    pub commit_message: String,
    pub created_at: DateTime<Utc>,
}
```

### 2. Das Haupt-CMS-Artikelobjekt (`CMSArticle`)

```rust
#[derive(Debug, Clone)]
pub struct CMSArticle {
    pub id: Uuid,
    pub slug: String,
    pub title: String,
    pub status: ArticleStatus,
    /// Die aktuell aktive/veröffentlichte Versionsnummer
    pub active_version: Option<u32>,
    /// Alle bisherigen Überarbeitungen
    pub revisions: Vec<ArticleRevision>,
}
```

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das didaktische Core-Gerüst für dein integriertes Redaktions-System. Ergänze die Lücken überall dort, wo `todo!()` steht!

```rust
use chrono::Utc;
use uuid::Uuid;

// (Datenstrukturen wie oben definiert)

pub struct CmsAuthoringEngine;

impl CmsAuthoringEngine {
    /// Erstellt eine neue Revision für einen Artikel (Entwurfs-Speicherung)
    pub fn create_revision(
        article: &mut CMSArticle,
        new_content: String,
        author_id: Uuid,
        commit_msg: &str,
    ) -> u32 {
        let new_version = (article.revisions.len() as u32) + 1;
        
        let revision = ArticleRevision {
            version: new_version,
            content: new_content,
            author_id,
            commit_message: commit_msg.to_string(),
            created_at: Utc::now(),
        };

        article.revisions.push(revision);
        
        // Wenn der Artikel neu ist, bleibt der Status auf Draft
        if article.status == ArticleStatus::Published {
            // Hinweis: Eine neue Revision ändert nicht automatisch die aktive Version!
        }

        new_version
    }

    /// Veröffentlicht eine bestimmte Version eines Artikels
    pub fn publish_version(article: &mut CMSArticle, version: u32) -> Result<(), String> {
        // Leitfragen:
        // 1. Existiert die angeforderte Version in `article.revisions`?
        // 2. Setze `article.active_version = Some(version)`.
        // 3. Setze `article.status = ArticleStatus::Published`.

        todo!("Implementiere die Veröffentlichungs-Logik für Versionen!")
    }

    /// Reicht den Entwurf zur Prüfung beim Lektor ein
    pub fn submit_for_review(article: &mut CMSArticle) -> Result<(), String> {
        if article.status != ArticleStatus::Draft {
            return Err(String::from("Nur Entwürfe können zur Prüfung eingereicht werden!"));
        }

        article.status = ArticleStatus::PendingReview;
        Ok(())
    }
}

fn main() {
    println!("✍️ CMS-Autoren-Integration Test");

    let author_id = Uuid::new_v4();
    let mut article = CMSArticle {
        id: Uuid::new_v4(),
        slug: String::from("rust-2026"),
        title: String::from("Neuerungen in Rust 2026"),
        status: ArticleStatus::Draft,
        active_version: None,
        revisions: Vec::new(),
    };

    // TODO: Erstelle Revisionen, reiche zur Prüfung ein und verfentliche den Artikel!
}
```

---

## 🧪 Übungsaufgaben

Bringe dein Redaktionssystem auf Profi-Niveau!

### 🟢 Leicht: Versions-Vergleich (Diff-Ansicht)
Schreibe eine Funktion `pub fn generate_diff(rev1: &ArticleRevision, rev2: &ArticleRevision) -> String`.
- **Ziel:** Vergleiche zwei Revisionen und zeige hinzugefügte Zeilen mit `+` und gelöschte Zeilen mit `-` an.

### 🟡 Mittel: Autosave-Draft-Handler
Erstelle einen Axum-Handler `POST /api/articles/:slug/autosave`.
- Der Handler nimmt den aktuellen Editor-Text entgegen und speichert ihn in einem flüchtigen Entwurfs-Speicher (`Arc<RwLock<HashMap<String, String>>>`), ohne jedes Mal eine permanente Datenbank-Revision zu erzeugen.

### 🔴 Schwer: Live-Preview per Server-Sent Events (SSE)
Echtes WYSIWYG-Gefühl für Autoren:
- Richte eine Axum-Route `GET /api/articles/:slug/preview/stream` ein.
- Sobald der Autor im Editor tippt, schickt Rust die frisch gerenderte HTML-Vorschau per **Server-Sent Events (SSE)** in Echtzeit an das Vorschau-Fenster des Browsers!

---

## 🎯 Zusammenfassung

Mit der **Integration von Autorensystemen in CMS & Wissensmanagement** hast du das komplette Redaktions-Ökosystem verstanden:
- **Redaktions-Workflow:** Sichere Status-Übergänge (Draft -> PendingReview -> Published).
- **Revisions-Kontrolle:** Lückenlose Historie aller Textänderungen mit Autoren-Zuordnung.
- **Live-Vorschau:** Nahtloses Zusammenspiel zwischen Texteingabe und fertiger HTML-Darstellung.

Damit besitzt du das Wissen, um professionelle News-Portale, Firmen-Wikis und Verlags-Systeme in Rust zu bauen! ✍️🏛️🚀
