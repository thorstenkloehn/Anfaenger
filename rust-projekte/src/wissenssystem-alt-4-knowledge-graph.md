# 🕸️ Alternativ-System 4: Der Knowledge Graph (Tripel-Datenbank / RDF Graph)

Willkommen zu einem besonders spannenden Ausflug in die Welt der Wissensrepräsentierung! In den bisherigen Kapiteln hast du kennengelernt, wie Notizen als Dokumente, Dateien oder verlinkte Wiki-Seiten gespeichert werden. Aber was passiert, wenn wir nicht ganze Fließtexte suchen, sondern **konkrete Fakten und deren logische Verknüpfungen** abfragen wollen?

Hier kommt der **Knowledge Graph** (wissensbasierter Graph bzw. RDF-Tripel-Datenbank) ins Spiel. Statt Wissen in großen Textdateien einzusperren, zerlegen wir Informationen in atomare Einheiten von Beziehungen.

---

## 🚀 1. Einleitung & Vision: Wissen als Beziehungen speichern (Subjekt – Prädikat – Objekt)

Stell dir vor, du möchtest deinem Wissenssystem Fragen stellen wie:
- *"Welche Programmiersprachen nutzen die LLVM-Compiler-Infrastruktur?"*
- *"Welche Rust-Crates werden von Tokio abhängigen Projekten genutzt?"*
- *"Welche Personen arbeiten an demselben Projekt wie Thorsten?"*

In einer klassischen Ordnerstruktur oder einer einfachen Textsuche müsstest du Dutzende Dateien manuell durchforsten und Verbindungen im Kopf ziehen. Der **Knowledge Graph** löst dieses Problem, indem er Wissen nicht in Dokumenten, sondern in **Aussagen-Tripeln** speichert.

Jede Information besteht aus genau drei Bausteinen:

1. **Subjekt (Subject):** Worum geht es? (Entität / Startknoten)
2. **Prädikat (Predicate):** Wie lautet die Beziehung? (Gerichtete Kante)
3. **Objekt (Object):** Womit ist es verbunden? (Entität oder Wert / Zielknoten)

### Beispiele für Tripel:
- `("Rust", "nutzt_backend", "LLVM")`
- `("Swift", "nutzt_backend", "LLVM")`
- `("Rust", "hat_eigenschaft", "Speichersicherheit")`
- `("Cargo", "ist_paketmanager_fuer", "Rust")`

Aus vielen einzelnen Tripeln entsteht automatisch ein riesiges, dynamisches Netz aus Fakten!

---

## 🧠 2. Die Bildmetapher: Das Beziehungsnetz der Detektiv-Suchtafel

Stell dir das Knowledge-Graph-Prinzip wie die berühmte **Pinnwand eines Detektivs** in einem Kriminalfilm vor:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                   DIE DETEKTIV-PINNWAND DER FAKTEN                       │
│                                                                          │
│  [ Rust ] ───────( nutzt_backend )───────► [ LLVM ] ◄───( nutzt_backend )│
│     │                                       ▲                            │
│     │                                       │                            │
│  ( hat_typ )                             ( nutzt_backend )               │
│     │                                       │                            │
│     ▼                                       │                            │
│  [ Statisch ]                            [ Swift ]                       │
│                                                                          │
│  • Zettel / Fotos (Knoten)    = Subjekt & Objekt (Entitäten)             │
│  • Rote Fäden (Pfeile)        = Prädikate (Beziehungen)                  │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Die Zettel an der Wand:** Das sind deine Begriffe und Objekte (z. B. *"Rust"*, *"LLVM"*, *"Statisch"*).
- **Die roten Fäden:** Jeder Faden verbindet zwei Zettel und trägt ein Kärtchen mit der Beziehungsart (z. B. *"nutzt_backend"*).
- **Spurensuche:** Wenn der Detektiv herausfinden möchte, welche Sprachen *LLVM* nutzen, stellt er sich vor den Zettel *"LLVM"* und folgt rückwärts allen roten Fäden mit der Aufschrift *"nutzt_backend"*. Er landet direkt bei *"Rust"* und *"Swift"*.

Genau so arbeitet ein Graph-Index im Hauptspeicher!

---

## 🏗️ 3. Architektur & Graph-Struktur

Um ein solches Netz in Rust abzubilden, kombinieren wir einfache Datenstrukturen mit Indizes für blitzschnelle Abfragen.

### 1. Das Tripel (`Triple`)
Ein einzelnen Tripel speichert drei Zeichenketten (oder IDs):

```rust
/// Ein atomares Faktum im Wissen-Graph
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct Triple {
    pub subject: String,
    pub predicate: String,
    pub object: String,
}
```

### 2. Der Knowledge Graph (`KnowledgeGraph`)
Damit wir nicht bei jeder Abfrage den gesamten Vektor durchsuchen müssen, legen wir Neben-Indizes an. Ein **SPO-Index** (Subject-Predicate-Object) ordnet z. B. jedem Subjekt eine Liste von Indizes im Haupt-Vektor zu:

```rust
use std::collections::HashMap;

/// Die zentrale Graph-Datenbank im Speicher
#[derive(Debug, Default)]
pub struct KnowledgeGraph {
    /// Alle gespeicherten Tripel
    pub triples: Vec<Triple>,
    
    /// Index: Subjekt -> Indizes im `triples`-Vektor
    pub index_spo: HashMap<String, Vec<usize>>,
}
```

### Pattern Matching für Flexibilität
Eine Abfrage an den Graph verwendet Muster mit `Option<&str>`. Jedes Feld kann konkret vorgegeben sein (`Some("...")`) oder als Platzhalter dienen (`None`):

- `(Some("Rust"), Some("nutzt_backend"), None)` $\rightarrow$ *"Was nutzt Rust als Backend?"*
- `(None, Some("nutzt_backend"), Some("LLVM"))` $\rightarrow$ *"Welche Subjekte nutzen LLVM als Backend?"*
- `(None, None, Some("LLVM"))` $\rightarrow$ *"Welche Beziehungen gibt es zu LLVM als Objekt?"*

---

## ⚙️ 4. Code-Gerüst mit `todo!()`

Hier ist dein Gerüst für die Abfragefunktion. Deine Aufgabe wird es sein, die Logik für das Matching zu entwickeln!

```rust
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct Triple {
    pub subject: String,
    pub predicate: String,
    pub object: String,
}

#[derive(Debug, Default)]
pub struct KnowledgeGraph {
    pub triples: Vec<Triple>,
    pub index_spo: HashMap<String, Vec<usize>>,
}

impl KnowledgeGraph {
    pub fn new() -> Self {
        Self::default()
    }
}

/// Durchsucht den KnowledgeGraph nach Tripeln, die zum angegebenen Muster passen.
/// `None` wirkt wie eine Wildcard (matcht jeden Wert).
pub fn query_triples<'a>(
    graph: &'a KnowledgeGraph,
    subject: Option<&str>,
    predicate: Option<&str>,
    object: Option<&str>,
) -> Vec<&'a Triple> {
    // 💡 Denkanstoß:
    // 1. Wenn `subject` ein `Some(s)` ist: Kannst du den `index_spo` nutzen, 
    //    um direkt nur die relevanten Tripel zu prüfen?
    // 2. Wie filterst du die Tripel danach auf `predicate` und `object`?
    // 3. Wenn `subject` `None` ist: Wie kannst du stattdessen alle Tripel durchgehen (`graph.triples.iter()`)?

    todo!("Implementiere die Musterabfrage für Tripel!")
}
```

### Leitfragen für deine Implementierung:
- Wie vergleicht man ein `Option<&str>` am elegantesten mit einem `String`-Feld in Rust? (Tipp: `.map_or(true, |val| field == val)`)
- Wie stellt der Befehl `.iter().filter(...)` sicher, dass du nur Referenzen (`&Triple`) zurückgibst, ohne neue Daten zu kopieren?

---

## 🧪 5. Übungsaufgaben

Jetzt bist du an der Reihe! Setze dein Wissen in die Praxis um.

### 🟢 Aufgabe 1 (Leicht): Neues Tripel hinzufügen & Index pflegen
Schreibe eine Methode `add_triple`:
```rust
impl KnowledgeGraph {
    pub fn add_triple(&mut self, subject: &str, predicate: &str, object: &str) -> bool {
        todo!("Tripel hinzufügen, Dubletten vermeiden und index_spo aktualisieren!")
    }
}
```
- **Ziel:** Wenn das Tripel bereits existiert, gib `false` zurück. Wenn es neu ist, füge es in `triples` ein, trage den neuen Index in `index_spo` ein und gib `true` zurück.

---

### 🟡 Aufgabe 2 (Mittel): Export in die GraphViz DOT-Syntax
Visualisiere deine Fakten! Schreibe eine Funktion, die den Graphen in eine Textdarstellung für [GraphViz](https://graphviz.org/) umwandelt.

```rust
pub fn export_to_dot(graph: &KnowledgeGraph) -> String {
    todo!("Generiere einen Valid-DOT-String wie: digraph { \"Rust\" -> \"LLVM\" [label=\"nutzt_backend\"]; }")
}
```
- **Ziel:** Erzeuge einen String im Format:
  ```dot
  digraph KnowledgeGraph {
      "Rust" -> "LLVM" [label="nutzt_backend"];
      "Swift" -> "LLVM" [label="nutzt_backend"];
  }
  ```

---

### 🔴 Aufgabe 3 (Schwer): Pfadsuche mit Breadth-First Search (BFS)
Implementiere eine Suche nach der kürzesten Verbindung zwischen zwei Begriffen über beliebige Prädikate hinweg!

```rust
pub fn find_path<'a>(
    graph: &'a KnowledgeGraph,
    start: &str,
    target: &str,
) -> Option<Vec<&'a Triple>> {
    todo!("Nutze eine Queue (std::collections::VecDeque) für die Breitensuche (BFS)!")
}
```
- **Ziel:** Finde heraus, wie *"Rust"* mit *"WebAssembly"* zusammenhängt.
- **Beispielpfad:** `Rust` $\xrightarrow{\text{kompiliert\_zu}}$ `LLVM IR` $\xrightarrow{\text{generiert}}$ `WebAssembly`.

---

## 🎯 6. Zusammenfassung

Der **Knowledge Graph** hebt dein Wissenssystem auf ein völlig neues Level:
- **Atomare Fakten:** Informationen werden in einfache `(Subjekt, Prädikat, Objekt)`-Tripel zerlegt.
- **Detektiv-Netzwerk:** Wissen wird wie eine Pinnwand mit roten Fäden traversierbar und durchsuchbar.
- **Pattern Matching:** Mit flexiblen Abfragen kannst du komplexe logische Zusammenhänge aus deinem Graph extrahieren.
- **Erweiterbarkeit:** Ergänzt durch Pfadsuchen (BFS) oder Visualisierungen (GraphViz) wird aus einer starren Notizsammlung ein lebendiges, intelligentes Datennetz!
