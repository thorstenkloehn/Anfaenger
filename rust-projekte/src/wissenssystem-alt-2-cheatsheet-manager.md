# ⚡ Alternativ-System 2: Der Entwickler-Cheatsheet-Manager (tldr / cheat.sh Style)

Willkommen zu einer spannenden Alternative für dein persönliches Wissenssystem! Wenn du beim Entwickeln regelmäßig über seltsame Terminalbefehle wie `tar -xvf`, komplexe `git rebase`-Befehle oder Docker-Einzeiler stolperst, wirst du dieses Projekt lieben.

In diesem Kapitel entwerfen wir einen **Entwickler-Cheatsheet-Manager** im Stile von beliebten CLI-Tools wie `tldr` oder `cheat.sh`.

---

## 🚀 Einleitung & Vision: Schnelles Nachschlagen von Code-Snippets & Terminalbefehlen

Wer kennt es nicht? Man braucht einen bestimmten Befehl, kennt die grundlegende Syntax, vergisst aber jedes Mal die genauen Schalter und Parameter. Der Weg in die offizielle Manpage oder die Suchmaschine kostet wertvolle Sekunden und reißt dich aus dem Denkfluss.

### Die Vision deines Cheatsheet-Managers:
* **Blitzschnell:** Ein kurzer Befehl im Terminal (`cheat docker build`) liefert dir sofort praxisnahe Einzeiler statt meterlangem Dokumentationstext.
* **Fokus auf Beispiele:** Statt abstrakter Parameter-Listen stehen konkrete, sofort nutzbare Code-Snippets im Vordergrund.
* **Platzhalter & Zwischenablage:** Snippets enthalten Platzhalter für deine eigenen Parameter und lassen sich auf Wunsch direkt in die Zwischenablage kopieren!

---

## 🧠 Die Bildmetapher: Das Spickzettel-Bändchen des Werkstattmeisters

Stell dir einen erfahrenen Werkstattmeister in seiner Holz- oder Metallwerkstatt vor:

1. **Die Werkzeuge & Maschinen:** Jede Maschine hat Dutzende Hebel und Einstellungen. Niemand liest vor jedem Handgriff das 500-seitige Handbuch.
2. **Das Spickzettel-Bändchen (`CommandSnippet`)**: Am Gürtel des Meisters hängt ein kleines, abgriffenes Lederbändchen mit Kärtchen. Auf jedem Kärtchen steht nur das Wichtigste: Der Name des Handgriffs, eine kurze Erklärung und die genaue Einstellung mit Lücken (z.B. *"Gewinde schneiden: Drehzahl [WERT] bei Material [TYP]"*).
3. **Der Kasten am Gürtel (`CheatsheetStore`)**: Alle Kärtchen sind nach Kategorien sortiert (`git`, `docker`, `cargo`, `linux`). Der Meister greift in Bruchteilen einer Sekunde das richtige Kärtchen heraus.
4. **Der automatisierte Greifarm (Clipboard-Integration)**: Sobald der Meister das passende Kärtchen ausgewählt hat, wird die Einstellung direkt in die Maschine übertragen – ohne dass er jede Zahl einzeln abtippen muss!

---

## 🏗️ Architektur & Datenstrukturen

Um unseren Cheatsheet-Manager sauber zu strukturieren, bauen wir auf klaren Rust-Datenstrukturen auf:

### 1. Das einzelne Snippet (`CommandSnippet`)
Jeder Spickzettel braucht strukturierte Informationen:

```rust
#[derive(Debug, Clone)]
pub struct CommandSnippet {
    /// Die Kategorie oder das Werkzeug (z.B. "git", "docker", "tar")
    pub command: String,
    /// Eine kurze Beschreibung, was dieses Snippet tut
    pub description: String,
    /// Der eigentliche Terminalbefehl mit Platzhaltern (z.B. "tar -xvf {archive}.tar.gz")
    pub example: String,
    /// Liste der enthaltenen Platzhalter (z.B. ["archive"])
    pub placeholders: Vec<String>,
}
```

### 2. Der Gesamtspeicher (`CheatsheetStore`)
Der Speicher organisiert unsere Snippets nach Kategorien, um eine effiziente Suche zu ermöglichen:

```rust
use std::collections::HashMap;

#[derive(Debug, Default)]
pub struct CheatsheetStore {
    /// Zuordnung von Kategorie (z.B. "git") zu einer Liste von Snippets
    pub snippets: HashMap<String, Vec<CommandSnippet>>,
}
```

### 3. Schnelle Keyword-Suche & Zwischenablage
* **Keyword-Suche:** Wie durchsuchen wir nicht nur nach der exakten Kategorie, sondern auch nach Begriffen in der `description` oder im `example`?
* **Clipboard-Integration (Denkanstoß):** In der Rust-Welt gibt es das fantastische Crate [`arboard`](https://crates.io/crates/arboard), mit dem du plattformübergreifend Text direkt in die Zwischenablage des Betriebssystems legen kannst.

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das Gerüst für deinen Cheatsheet-Manager. Nutze dein Wissen aus den vorangegangenen Kapiteln und fülle die Lücken überall dort, wo `todo!()` steht!

```rust
use std::collections::HashMap;
use std::env;

#[derive(Debug, Clone)]
pub struct CommandSnippet {
    pub command: String,
    pub description: String,
    pub example: String,
    pub placeholders: Vec<String>,
}

#[derive(Debug, Default)]
pub struct CheatsheetStore {
    pub snippets: HashMap<String, Vec<CommandSnippet>>,
}

impl CheatsheetStore {
    /// Erstellt ein neues Store-Objekt mit ersten Beispiel-Cheatsheets.
    pub fn new_with_defaults() -> Self {
        let mut store = CheatsheetStore {
            snippets: HashMap::new(),
        };

        // TODO: Füge hier 2-3 nützliche CommandSnippets hinzu!
        // Beispiel-Kategorien: "tar", "git", "docker"

        store
    }

    /// Durchsucht den Store nach einem Suchbegriff.
    /// Prüft sowohl Kategorien als auch Beschreibungen und Beispiele!
    pub fn search_snippet(&self, query: &str) -> Vec<&CommandSnippet> {
        // TODO: Durchsuche alle Snippets im Store.
        // Leitfrage: Wie kannst du mit Iteratoren (.values(), .flatten(), .filter()) 
        // prüfen, ob 'query' in snippet.command, snippet.description oder snippet.example enthalten ist?
        todo!("Implementiere die Suchlogik für Snippets")
    }

    /// (Optional) Vorbereitung für die Zwischenablage
    pub fn format_for_clipboard(&self, snippet: &CommandSnippet) -> String {
        // TODO: Gib den formatierten Befehl zurück
        snippet.example.clone()
    }
}

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        println!("Verwendung: cheat <suchbegriff>");
        return;
    }

    let query = &args[1];
    let store = CheatsheetStore::new_with_defaults();
    let results = store.search_snippet(query);

    if results.is_empty() {
        println!("Keine passenden Cheatsheets für '{}' gefunden.", query);
    } else {
        println!("🔍 Gefundene Cheatsheets:");
        for snippet in results {
            println!("----------------------------------------");
            println!("📌 [{}] {}", snippet.command, snippet.description);
            println!("💡 Befehl: {}", snippet.example);
        }
    }
}
```

---

## 🧪 Übungsaufgaben

Bringe deinen Cheatsheet-Manager auf das nächste Level! Hier sind drei Herausforderungen mit steigendem Schwierigkeitsgrad:

### 🟢 Leicht: Farbige Syntax-Hervorhebung
Mache die CLI-Ausgabe übersichtlicher und ansprechender.
* **Aufgabe:** Nutze ein Crate wie `colored` oder ANSI-Escape-Codes, um Kategorien fett/blau, Beschreibungen gelb und den eigentlichen Befehl in leuchtendem Grün darzustellen.
* **Denkanstoß:** Wie unterscheidest du optisch festen Befehlscode von Platzhaltern in geschweiften Klammern `{...}`?

### 🟡 Mittel: Interaktive Platzhalter-Eingabe
Erleichtert das Ausfüllen von Lücken im Befehl.
* **Aufgabe:** Wenn ein ausgewähltes Snippet Platzhalter enthält (z. B. `{file}` oder `{port}`), frage den Benutzer interaktiv in der Konsole nach den konkreten Werten und ersetze diese im `example`-String, bevor das Ergebnis ausgegeben oder kopiert wird.
* **Denkanstoß:** Nutze `std::io::stdin().read_line()` und `String::replace()`.

### 🔴 Schwer: Sync mit einem Remote Git Repository
Teile deine Cheatsheets über verschiedene Rechner hinweg.
* **Aufgabe:** Speichere Cheatsheets als einzelne Markdown- oder YAML-Dateien in einem Ordner. Implementiere eine Funktion `cheat sync`, die im Hintergrund `git pull` ausführt oder Dateien aus einem Git-Repository liest und parst.
* **Denkanstoß:** Wie kannst du mit `std::process::Command` externe Git-Befehle ausführen oder Cheatsheets beim Programmstart dynamisch aus dem Dateisystem einlesen?

---

## 🎯 Zusammenfassung

Mit dem **Entwickler-Cheatsheet-Manager** schaffst du dir ein Werkzeug, das dich jeden Tag beim Programmieren begleitet. Ganz nebenbei vertiefst du zentrale Rust-Konzepte:
* **Strukturen & HashMaps:** Effizientes Ablegen und Sortieren von Daten.
* **Iteratoren & Filterung:** Suchen und Transformationen in Sammlungen ohne unnötige Allokationen.
* **CLI-Interaktion:** Einlesen von Argumenten und benutzerfreundliche Konsolenausgabe.

Viel Erfolg beim Bauen deines eigenen digitalen Werkstatt-Spickzettels! 🚀
