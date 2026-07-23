# ⚡ Wissenssystem Stufe 2: Der statische Wiki-Generator (Static Site Generator)

Willkommen zu Stufe 2 unseres Wissenssystems! Im ersten Teil hast du bereits kennengelernt, wie Informationen strukturiert und verwaltet werden können. Nun gehen wir den nächsten großen Schritt: Wir bauen einen **statischen Website-Generator (Static Site Generator, SSG)** in Rust.

Statt jedes Mal eine Datenbank abzufragen oder bei jedem Aufruf HTML neu auf dem Server zu berechnen, generieren wir aus einfachen Markdown-Dateien blitzschnelle, fertige HTML-Seiten.

---

## 🧠 Die Bildmetapher: Die automatisierte Druckerei

Stell dir deinen statischen Wiki-Generator wie eine moderne, vollautomatisierte Druckerei vor:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DIE AUTOMATISIERTE DRUCKEREI                          │
│                                                                             │
│  [ Manuskripte ]    ──> Einlesen der Rohdaten (.md-Dateien im Ordner)     │
│  [ Setzerei ]       ──> Umwandlung von Markdown in sauberes HTML-Format    │
│  [ Buchbinderei ]   ──> Einfügen in Layout-Template & Inhaltsverzeichnis    │
│  [ Auslieferung ]   ──> Fertige HTML-Dateien im Zielordner ablegen          │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Die Manuskripte (Input):** Du legst deine Notizen als einfache Markdown-Textdateien in einen Eingabe-Ordner (`/content`).
2. **Die Setzerei (Markdown-Parser):** Die Druckerei liest jede Datei ein und wandelt Überschriften (`#`), Absätze und Links in druckfertiges HTML um.
3. **Die Buchbinderei (Templating & Index):** Alle fertigen Seiten erhalten den gleichen eleganten Kopf- und Fußbereich (Template). Gleichzeitig wird eine Hauptseite (`index.html`) gedruckt, die wie ein Inhaltsverzeichnis alle Kapitel auflistet.
4. **Die Auslieferung (Output):** Die fertigen HTML-Seiten wandern direkt in das Auslieferungslager (`/public`). Jeder Browser kann sie ohne Datenbank sofort anzeigen!

---

## 🏗️ Architektur & Workflow

Damit unsere Druckerei reibungslos arbeitet, gliedern wir den Bauablauf in vier klare Schritte:

```
                  ┌──────────────────────────────┐
                  │ 1. Verzeichnis durchsuchen   │
                  │    (std::fs::read_dir)       │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │ 2. .md-Dateien einlesen &    │
                  │    in HTML umwandeln         │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │ 3. Inhaltsverzeichnis (Index)│
                  │    & Navigation erzeugen     │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │ 4. HTML-Seiten auf Festplatte│
                  │    schreiben                 │
                  └──────────────┬───────────────┘
```

### 1. Verzeichnis durchsuchen (`std::fs::read_dir`)
Über die Standardbibliothek `std::fs::read_dir` durchsuchst du den Eingabe-Ordner nach allen Quelldateien. Achte darauf, nur Dateien mit der Endung `.md` zu verarbeiten!

### 2. `.md`-Dateien einlesen und Markdown in HTML umwandeln
Jede gefundene Datei wird als Text gelesen. Mithilfe eines Markdown-Parsers (z. B. dem bekannten Rust-Crate `pulldown-cmark`) wird aus dem Markdown-Text valides HTML erzeugt.

### 3. Ein Inhaltsverzeichnis (Index) generieren
Während du alle Seiten einliest, sammelst du die Metadaten (wie Titel und Dateiname/Slug). Daraus baust du eine Übersicht `index.html`, damit Besucher sich durch dein Wiki navigieren können.

### 4. HTML-Seiten auf Festplatte schreiben
Jede gerenderte Seite bekommt ihr HTML-Template verpasst und wird mit `std::fs::write` im Ausgabeordner gespeichert.

---

## ⚙️ Code-Gerüst mit `todo!()`

Jetzt bist du an der Reihe! Hier ist das Grundgerüst für dein Wiki-Generator-Modul. Deine Aufgabe ist es, die Platzhalter mit Leben zu füllen.

```rust
use std::path::{Path, PathBuf};
use std::fs;

/// Repräsentiert eine einzelne Wiki-Seite im Speicher
#[derive(Debug, Clone)]
pub struct WikiPage {
    /// Der Titel der Seite (z. B. extrahiert aus der ersten Überschrift oder dem Dateinamen)
    pub title: String,
    /// Der URL-freundliche Name / Dateiname ohne Endung (z. B. "rust-grundlagen")
    pub slug: String,
    /// Der fertig in HTML umgewandelte Inhalt
    pub html_content: String,
}

impl WikiPage {
    /// Erstellt aus einem Markdown-Dateipfad eine WikiPage-Struktur
    pub fn from_markdown_file(path: &Path) -> Result<Self, std::io::Error> {
        // TODO: Lies den Inhalt der Datei mit fs::read_to_string(path) ein.
        // TODO: Extrahiere den Dateinamen (Slug) ohne Endung.
        // TODO: Wandle den Markdown-Inhalt in HTML um.
        // TODO: Gib die fertige WikiPage-Instanz zurück.
        todo!("Implementiere das Einlesen und Umwandeln der Markdown-Datei")
    }

    /// Verpackt den HTML-Inhalt in ein vollständiges HTML5-Dokumenten-Template
    pub fn render_full_document(&self) -> String {
        // TODO: Erzeuge einen HTML-String mit <!DOCTYPE html>, <html>, <head>, <title> und <body>.
        // TODO: Füge self.title und self.html_content an den passenden Stellen ein.
        todo!("Implementiere das HTML-Template")
    }
}

/// Hauptfunktion: Baut die gesamte statische Website aus dem input_dir im output_dir auf
pub fn build_site(input_dir: &Path, output_dir: &Path) -> Result<(), std::io::Error> {
    println!("🚀 Starte Statischen Wiki-Generator...");

    // 1. Stelle sicher, dass der Zielordner existiert
    if !output_dir.exists() {
        fs::create_dir_all(output_dir)?;
    }

    let mut pages: Vec<WikiPage> = Vec::new();

    // 2. Durchsuche das Eingabeverzeichnis nach .md Dateien
    // TODO: Nutze fs::read_dir(input_dir)? um durch alle Einträge zu iterieren.
    // TODO: Filter auf Dateien mit der Endung ".md".
    // TODO: Rufe WikiPage::from_markdown_file() auf und füge die Seiten dem Vector `pages` hinzu.
    
    todo!("Iteriere über das Eingabeverzeichnis und sammle alle WikiPages");

    // 3. Generiere für jede Seite das finale HTML und schreibe es in das output_dir
    // TODO: Iteriere über `pages`, erstelle den Ziel-Dateipfad (z. B. output_dir/slug.html)
    // TODO: Schreibe das Ergebnis von page.render_full_document() auf die Festplatte.

    // 4. Generiere die index.html als Inhaltsverzeichnis
    // TODO: Baue einen HTML-String, der Links zu allen gesammelten Seiten enthält.
    // TODO: Schreibe die index.html in das output_dir.

    Ok(())
}
```

💡 **Leitfragen zum Code-Gerüst:**
- Wie gehst du vor, wenn ein Eintrag in `read_dir` ein Unterordner statt einer Datei ist?
- Wie kannst du Fehler behandeln, wenn eine Datei nicht gelesen werden kann? (`Result` / `?`-Operator)
- Welches Rust-Crate könntest du für das Markdown-Parsing nutzen? (Tipp: Suche nach `pulldown-cmark`).

---

## 🧪 Übungsaufgaben

Testen wir dein Wissen mit drei spannenden Herausforderungen!

### 🟢 Leicht: Template-Header anpassen
Erweitere die Methode `render_full_document`, sodass jede Seite ein modernes CSS-Styling im `<head>`-Bereich erhält (z. B. ein dunkles Theme oder eine hübsche Schriftart wie Inter/Roboto via Google Fonts).
- **Ziel:** Die generierten HTML-Seiten sollen im Browser sofort ansprechend aussehen.

### 🟡 Mittel: Automatische Navigationsleiste erzeugen
Übergebe beim Rendern einer `WikiPage` eine Liste aller verfügbaren Seiten (`&[WikiPage]`). Erzeuge am oberen Rand jeder HTML-Seite eine Navigationsleiste (`<nav>`), in der Links zu allen anderen Wiki-Seiten automatisch aufgelistet werden.
- **Denkanstoß:** Wie verhinderst du, dass der Link auf die aktuell geöffnete Seite wie ein normaler Klick aussieht (z. B. durch eine CSS-Klasse `.active`)?

### 🔴 Schwer: Live-Reload Denkanstoß (Konzeptaufgabe)
Stell dir vor, du möchtest dein Wiki lokal schreiben und im Browser sofort das Ergebnis sehen, sobald du eine Markdown-Datei speicherst.
- **Denkanstoß & Architekturfrage:**
  1. Welche Komponenten brauchst du zusätzlich zu unserem Generator? (z. B. File Watcher, lokaler HTTP-Webserver)
  2. Wie könnte dein Rust-Programm Veränderungen am Dateisystem erkennen? (Recherche-Tipp: Das Crate `notify`).
  3. Wie könnte der Browser mitbekommen, dass sich eine Datei geändert hat, ohne dass der Benutzer manuell `F5` drücken muss?

---

## 🎯 Zusammenfassung

In diesem Kapitel hast du das Fundament für deinen eigenen statischen Wiki-Generator gelegt:
- **Verzeichnis-Handling:** Du weißt, wie man in Rust Ordner durchsucht (`std::fs::read_dir`) und Pfade verarbeitet (`std::path::Path`).
- **Transformation:** Du hast gesehen, wie aus Markdown-Quelltexten über Zwischendatenstrukturen (`WikiPage`) fertige HTML-Dokumente werden.
- **Entkopplung:** Durch das Trennen von Parsing, Templating und Ausgeben bleibt dein Code übersichtlich und einfach zu testen.

Mit diesem Wissen besitzt du bereits ein mächtiges Werkzeug, um eigene Dokumentationsseiten, Blogs oder Wissensdatenbanken in blitzschnelle statische Websites zu verwandeln! 🚀
