# 📟 Wissenssystem Stufe 1: Das Terminal-Wiki (CLI-Glossar)

Willkommen zum ersten Meilenstein deines eigenen Wissenssystems! In diesem Kapitel wirst du dein ganz persönliches **Terminal-Wiki** bauen. Stell dir vor, du sitzt im Terminal, stößt auf einen unbekannten Begriff oder möchtest schnell ein Kommando nachschlagen – und statt deinen Browser zu öffnen, fragst du einfach dein eigenes CLI-Tool.

---

## 🚀 Einleitung & Vision: Was ist das Terminal-Wiki?

Ein **Terminal-Wiki** (oder CLI-Glossar) ist ein schnelles, leichtgewichtiges Werkzeug für deine Kommandozeile. Du gibst einen Suchbegriff ein, und dein Tool durchsucht im Hintergrund eine strukturierte Sammlung von Begriffen, Erklärungen und Tags, um dir blitzschnell die passende Antwort direkt im Terminal anzuzeigen.

### Warum bauen wir das?
* **Rust in der Praxis:** Du lernst, wie du Datenstrukturen (`struct`), Sammlungen (`HashMap`) und Konsolen-Argumente (`std::env::args`) miteinander verbindest.
* **Erweiterbarkeit:** Dieses Terminal-Wiki bildet dein Fundament! In späteren Stufen werden wir es um Datei-Persistenz, Weboberflächen und KI-Funktionen erweitern.

---

## 🧠 Die Bildmetapher: Der Karteikasten im Büro

Stell dir ein klassisches Büro vor. Auf dem Schreibtisch steht ein eleganter **Karteikasten**:

1. **Die Karteikarte (`GlossaryEntry`)**: Jede Karte enthält oben ein Schlagwort (z. B. *"Borrowing"*), darunter eine verständliche Erklärung und unten ein paar bunte Kategorien-Sticker oder Tags (z. B. `["ownership", "rust", "basics"]`).
2. **Der Karteikasten (`Glossary`)**: Das ist die Kiste selbst. Sie verwaltet alle Karten geordnet, sodass du anhand des Schlagworts ohne langes Suchen direkt die passende Karte herausgreifen kannst.
3. **Der Bibliothekar (das CLI-Programm)**: Du kommst ins Büro und fragst: *"Hey, was bedeutet Borrowing?"* Der Bibliothekar greift zielgerichtet in den Karteikasten, zieht die passende Karte heraus und liest sie dir vor.

In Rust entspricht dieser Karteikasten einer `HashMap<String, GlossaryEntry>`. Der Schlüssel ist der Suchbegriff, und der Wert ist die vollständige Karteikarte!

---

## 🏗️ Architektur & Datenstrukturen

Lass uns die Karteikarten und den Karteikasten in Rust-Strukturen übersetzen:

```rust
use std::collections::HashMap;

// Eine einzelne Karteikarte im Glossar
#[derive(Debug, Clone)]
pub struct GlossaryEntry {
    pub term: String,
    pub definition: String,
    pub tags: Vec<String>,
}

// Der Karteikasten, der alle Einträge verwaltet
#[derive(Debug, Default)]
pub struct Glossary {
    pub entries: HashMap<String, GlossaryEntry>,
}
```

### Leitfragen zur Architektur:
* Warum eignet sich eine `HashMap` hervorragend für die Suche nach exakten Begriffen?
* Welchen Datentyp hat der Schlüssel in der `HashMap` und was passiert, wenn ein Begriff in Groß- oder Kleinschreibung gesucht wird?

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das Gerüst für dein Terminal-Wiki. Ergänze die Lücken überall dort, wo `todo!()` steht!

```rust
use std::collections::HashMap;
use std::env;

#[derive(Debug, Clone)]
pub struct GlossaryEntry {
    pub term: String,
    pub definition: String,
    pub tags: Vec<String>,
}

#[derive(Debug, Default)]
pub struct Glossary {
    pub entries: HashMap<String, GlossaryEntry>,
}

impl Glossary {
    /// Erstellt ein neues Glossar mit einigen Beispieldaten.
    pub fn new_with_defaults() -> Self {
        let mut glossary = Glossary {
            entries: HashMap::new(),
        };

        // TODO: Füge hier 2-3 Test-Einträge zur HashMap hinzu.
        // Tipp: glossary.entries.insert("borrowing".to_string(), GlossaryEntry { ... });

        glossary
    }

    /// Sucht nach einem Begriff im Glossar.
    pub fn search(&self, term: &str) -> Option<&GlossaryEntry> {
        // TODO: Nutze die passenden HashMap-Methoden, um den Eintrag zu finden.
        // Denkanstoß: Sollte die Suche case-insensitive (Groß-/Kleinschreibung ignorieren) sein?
        todo!("Implementiere die Suche im Glossar")
    }
}

fn main() {
    // 1. Befehlszeilen-Argumente auslesen
    let args: Vec<String> = env::args().collect();

    // Überprüfen, ob ein Suchbegriff übergeben wurde
    if args.len() < 2 {
        println!("Verwendung: cargo run -- <suchbegriff>");
        return;
    }

    let search_term = &args[1];
    let glossary = Glossary::new_with_defaults();

    // 2. Begriff im Glossar suchen und Ausgeben
    match glossary.search(search_term) {
        Some(entry) => {
            // TODO: Formatiere die Ausgabe ansprechend im Terminal!
            // Denkanstoß: Wie kannst du farbige Konsolenausgabe (z. B. mit der Crate `colored`) einbinden?
            todo!("Gib den gefundenen Eintrag schön formatiert aus")
        }
        None => {
            println!("❌ Der Begriff '{}' wurde nicht im Glossar gefunden.", search_term);
        }
    }
}
```

---

## 🧪 Übungsaufgaben

### 🟢 Leicht: Neuer Befehl zum Hinzufügen
Erweitere die `main`-Funktion und das `Glossary`, sodass ein Benutzer mit `cargo run -- add <begriff> <definition>` einen neuen Eintrag während der Laufzeit hinzufügen kann.

### 🟡 Mittel: Glossar aus einer Datei (z. B. JSON) laden
Aktuell sind die Einträge fest im Code programmiert (hardcoded). Versuche, die Einträge aus einer `.json`-Datei zu laden. 
* **Denkanstoß:** Welche Crate aus dem Rust-Ökosystem hilft dir beim Parsen von JSON? (`serde` / `serde_json`).

### 🔴 Schwer: Ununscharfe Suche (Fuzzy Search)
Was passiert, wenn sich der Benutzer vertippt (z. B. `"borow"` statt `"borrowing"`)?
* **Denkanstoß:** Reicht eine normale `HashMap`-Suche dafür aus? Überlege oder recherchiere, wie eine unscharfe Suche (z. B. Levenshtein-Distanz oder Prefix-Matching) funktionieren könnte.

---

## 🎯 Zusammenfassung

Du hast den ersten Baustein für dein persönliches Wissenssystem gelegt! 
* Du kennst die Rolle von `struct` und `HashMap` für schnelle Abfragen.
* Du hast gesehen, wie `std::env::args` Konsolenparameter entgegennimmt.
* Du hast ein erweiterbares Gerüst, das im weiteren Verlauf des Buches noch mächtiger werden wird.

Viel Erfolg beim Ausfüllen der `todo!()`-Blöcke!
