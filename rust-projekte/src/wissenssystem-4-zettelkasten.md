# 🧠 Wissenssystem Stufe 4: Das Zettelkasten-System mit Backlinks & Graph

Willkommen zur 4. Stufe unseres Wissenssystems! Bisher hast du ein solides Fundament aus CLI-Tools, Markdown-Parsing und Volltextsuche aufgebaut. Jetzt bringen wir dein System auf das nächste Level: Wir verwandeln eine lose Sammlung von Notizen in ein **vernetztes Zettelkasten-System** (nach dem Vorbild von Niklas Luhmann und modernen Tools wie Obsidian).

---

## 🚀 1. Einleitung & Vision: Das vernetzte Notizsystem (Obsidian-Style)

Klassische Ordnerstrukturen stoßen in der Praxis schnell an ihre Grenzen. Stell dir vor, du schreibst eine Notiz über *Asynchrone Programmierung in Rust für Webserver*. 

In welchen Ordner gehört diese Datei?
- `Ordner: /Rust`?
- `Ordner: /Webentwicklung`?
- `Ordner: /Performance`?

Egal wie du dich entscheidest: Die Struktur ist starr und sperrt dein Wissen in Silos ein. Das **Zettelkasten-Prinzip** löst dieses Problem auf elegante Weise. Statt hierarchischer Ordner verknüpfen wir Gedanken durch **zweidimensionale Querverweise** – sogenannte **WikiLinks** in der Form `[[Zielseite]]`.

Das Herzstück in Stufe 4 ist die automatische Analyse zweier Richtungen:
1. **Vorwärts-Links (Outgoing Links):** Auf welche anderen Notizen verweist meine aktuelle Seite?
2. **Backlinks (Incoming Links):** Welche anderen Notizen im gesamten System verweisen auf meine aktuelle Seite?

---

## 🧠 2. Die Bildmetapher: Das digitale Gehirn (Synapsen & Verbindungen)

Stell dir deinen Zettelkasten wie das **neuronale Netzwerk eines menschlichen Gehirns** vor:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                       DAS NEURONALE WISSENS-NETZ                        │
│                                                                         │
│    ( [Rust] ) ──Synapse [[Axum]]──> ( [Axum] )                          │
│        │                               │                                │
│     Synapse                         Synapse                             │
│    [[Tokio]]                       [[Async]]                            │
│        ▼                               ▼                                │
│    ( [Tokio] ) ◄──Synapse [[Tokio]]─ ( [Async] )                        │
│                                                                         │
│  • Knoten (Neuronen)  = Notizen / Gedanken                              │
│  • Pfeile (Synapsen)  = WikiLinks `[[...]]`                             │
│  • Signalfluss        = Ausgehende Links & Eingehende Backlinks         │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Notizen sind Neuronen:** Jedes Dokument steht für einen isolierten Gedanken oder ein Konzept.
- **WikiLinks sind Synapsen:** Sobald du im Text `[[Rust]]` schreibst, bildest du eine Verbindung zu einem anderen Neuron.
- **Rezeptoren spüren Backlinks:** Wenn Neuron `[Tokio]` von Neuron `[Rust]` und Neuron `[Async]` verlinkt wird, registriert `[Tokio]` diese Impulse als **Backlinks**. 

Wenn du im Zettelkasten stöberst, springst du nicht nur nach vorne zu neuen Themen, sondern siehst rückwirkend, welche früher geschriebenen Gedanken auf deine aktuelle Notiz verweisen. Dein Wissen wächst organisch!

---

## 🏗️ 3. Architektur & Graph-Struktur

Um diesen Wissens-Graph im Speicher aufzubauen, benötigen wir eine geeignete Datenstruktur sowie einen zweistufigen Build-Prozess.

### Erkennen von WikiLinks (`[[Zielseite]]`)
In Markdown-Texten suchen wir nach dem Muster `[[Seitenname]]`. 
- Ein einfacher Fall: `[[Rust]]`
- Optional mit Alias: `[[Rust|Die Programmiersprache Rust]]` (hier ist `Rust` das Ziel und `Die Programmiersprache Rust` der angezeigte Text).

Zur Identifikation kannst du reguläre Ausdrücke (`regex`-Crate) oder ein eigenes String-Matching verwenden.

### Die Datenstruktur für einen Knoten (`NoteNode`)

Jede Notiz wird im Graph als Knoten dargestellt. Da doppelte Verweise keinen Sinn ergeben (ein Link von A nach B reicht einmal), nutzen wir `HashSet` für die Verweise.

```rust
use std::collections::HashSet;

/// Repräsentiert einen Knoten im Wissens-Graph
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NoteNode {
    /// Der Titel bzw. eindeutige Name der Notiz
    pub title: String,
    
    /// Alle Notizen, auf die DIESE Notiz verweist (Vorwärts-Links)
    pub outgoing_links: HashSet<String>,
    
    /// Alle Notizen, die AUF DIESE Notiz verlinken (Backlinks)
    pub incoming_backlinks: HashSet<String>,
}
```

### Der zweiphasige Graph-Aufbau

Um Vorwärts- und Rückwärtslinks korrekt zu verknüpfen, verarbeiten wir den Zettelkasten in zwei Phasen:

```text
Phase 1: Notizen lesen & Outgoing Links erfassen
┌──────────┐  parst WikiLinks   ┌────────────────────────────────┐
│ Notiz A  │ ─────────────────> │ NoteNode A: outgoing = { B, C }│
└──────────┘                    └────────────────────────────────┘

Phase 2: Graph invertieren & Backlinks berechnen
Für jeden Link (A ──> B):
  ➜ Trage A in die `incoming_backlinks` von NoteNode B ein!
```

---

## ⚙️ 4. Code-Gerüst mit `todo!()`

Hier ist das didaktische Code-Gerüst für dein Zettelkasten-Modul. Deine Aufgabe ist es, die mit `todo!()` markierten Abschnitte Schritt für Schritt mit Leben zu füllen!

```rust
use std::collections::{HashMap, HashSet};

/// Repräsentiert eine Notiz im Wissens-Graph
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NoteNode {
    pub title: String,
    pub outgoing_links: HashSet<String>,
    pub incoming_backlinks: HashSet<String>,
}

impl NoteNode {
    /// Erstellt einen neuen Knoten ohne Verlinkungen
    pub fn new(title: impl Into<String>) -> Self {
        Self {
            title: title.into(),
            outgoing_links: HashSet::new(),
            incoming_backlinks: HashSet::new(),
        }
    }
}

/// Extrahiert alle WikiLink-Ziele aus einem Markdown-Text.
/// Beispiel: "Lerne [[Rust]] und [[Axum|Axum Web]]" -> {"Rust", "Axum"}
pub fn extract_wikilinks(content: &str) -> HashSet<String> {
    // TODO: Durchsuche den Text nach `[[...]]`.
    // Tipp 1: Achte darauf, eventuelle Aliase hinter '|' abzuschneiden.
    // Tipp 2: Groß-/Kleinschreibung harmonisieren (z.B. trimmen).
    todo!("Implementiere die WikiLink-Extraktion aus dem Text")
}

/// Baut den vollständigen Zettelkasten-Graph aus allen Notizen auf.
/// Input: HashMap von Dateiname/Titel -> Notiz-Inhalt
pub fn build_zettelkasten_graph(raw_notes: &HashMap<String, String>) -> HashMap<String, NoteNode> {
    let mut graph: HashMap<String, NoteNode> = HashMap::new();

    // ── Phase 1: Knoten erstellen & Outgoing Links parsen ──
    for (title, content) in raw_notes {
        // TODO: Erstelle für jeden Titel einen NoteNode und befülle outgoing_links
        // mit den Ergebnissen aus `extract_wikilinks(content)`.
        todo!("Phase 1: Knoten anlegen und ausgehende Links erfassen")
    }

    // ── Phase 2: Invertieren & Backlinks eintragen ──
    // TODO: Iteriere über alle Knoten im Graph.
    // Für jeden Knoten A und jeden seiner Outgoing-Links B:
    // Trage A in die `incoming_backlinks` des Knotens B ein!
    // Hinweis: Was passiert, wenn B noch gar nicht im Graph existiert?
    todo!("Phase 2: Backlinks berechnen und Graph vervollständigen")

    graph
}
```

💡 **Denkanstöße & Leitfragen:**
- **Nicht existierende Seiten:** Was soll passieren, wenn Notiz A auf `[[Geheimkonzept]]` verlinkt, es aber dazu noch keine Datei gibt? Soll `Geheimkonzept` als "leerer Knoten" im Graph auftauchen?
- **Case-Insensitivity:** Ist `[[Rust]]` dasselbe wie `[[rust]]`? Wie stellst du sicher, dass Verlinkungen nicht an Groß-/Kleinschreibung scheitern?
- **Performance:** Warum ist `HashSet` die perfekte Wahl für `outgoing_links` und `incoming_backlinks` im Vergleich zu `Vec<String>`?

---

## 🧪 5. Übungsaufgaben

Testen wir dein Wissen! Erweitere dein Zettelkasten-System um folgende Funktionen:

### 🟢 Übung 1 (Leicht): Verwaiste Notizen finden (Orphan Notes)
Schreibe eine Funktion `find_orphan_notes(graph: &HashMap<String, NoteNode>) -> Vec<String>`.
- Eine Notiz gilt als **verwaist** (Orphan Note), wenn sie **weder** ausgehende Links noch eingehende Backlinks besitzt.
- *Ziel:* Finde alle isolierten Neuronen in deinem digitalen Gehirn, damit du sie mit dem Rest deines Wissens verknüpfen kannst!

### 🟡 Übung 2 (Mittel): GraphViz DOT-Export
Erstelle eine Funktion `export_to_dot(graph: &HashMap<String, NoteNode>) -> String`.
- Generiere einen String im [GraphViz DOT-Format](https://graphviz.org/).
- Format-Beispiel:
  ```text
  digraph Zettelkasten {
      "Rust" -> "Axum";
      "Rust" -> "Tokio";
      "Async" -> "Tokio";
  }
  ```
- *Ziel:* Die erzeugte Ausgabe kannst du in Online-Tools (wie Graphviz Online) einfügen und deinen Zettelkasten visuell als echtes Netzwerk bewundern!

### 🔴 Übung 3 (Schwer): Tag-Clustering & Wissens-Inseln
Füge deiner Notiz-Struktur Unterstützung für `#tags` hinzu (z.B. `#rust`, `#web`).
- Schreibe eine Funktion `find_related_by_tag(graph: &HashMap<String, NoteNode>, tag: &str) -> HashSet<String>`.
- Identifiziere Cluster von Notizen, die über gemeinsame Tags verbunden sind, selbst wenn sie noch keine direkten WikiLinks zueinander haben.

---

## 🎯 6. Zusammenfassung

In diesem Kapitel hast du gelernt:
- Warum **Zettelkasten-Systeme** und zweidimensionale Verlinkungen starren Ordnerstrukturen überlegen sind.
- Wie das **neuronale Gehirn-Netzwerk** als Bildmetapher für Notizen, Links und Backlinks dient.
- Wie man eine **Graph-Struktur** in Rust mit `HashMap` und `HashSet` modelliert.
- Wie der **zweiphasige Graph-Aufbau** funktioniert, um ausgehende Links effizient in eingehende Backlinks zu konvertieren.

Mit diesem Wissen besitzt du die Werkzeuge, um dein eigenes kleines *Obsidian* in Rust zu bauen! 🚀
