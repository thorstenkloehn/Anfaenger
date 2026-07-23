# ✍️ Eigene Autorensysteme für E-Learning & Schulungen in Rust programmieren

Im vorherigen Kapitel hast du gelernt, wie man ein Lernmanagementsystem (LMS) baut, in dem Studenten lernen. Doch woher kommen die hochwertigen Kurse, interaktiven Aufgaben und Verzweigungsszenarien? Hier kommen **E-Learning-Autorensysteme** ins Spiel!

In diesem Kapitel lernst du, wie du dein eigenes **Autorensystem (Authoring Tool)** in Rust entwickelst. Ein solches System erlaubt es Trainern, Dozenten und Autoren, interaktive Lerninhalte visuell oder per Code zu erstellen, zu validieren und in Standardformate (wie HTML5, SCORM oder H5P) zu exportieren.

---

## 🚀 Einleitung & Vision: Vom Konsumenten zum Kurs-Ersteller

Während ein LMS Kurse **bereitstellt**, dient ein **Autorensystem** dem **Erstellen & Gestalten** von Kursen:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        AUTORENSYSTEM vs. LMS                           │
│                                                                        │
│  [ Autorensystem (Dieses Kapitel) ]   ──► Generiert Kurs-Pakete        │
│  • Autoren/Trainer erstellen Inhalte      (SCORM / H5P / HTML5)        │
│  • Interaktive Blöcke & Verzweigungen                                  │
│  • Validierung von Lernpfaden                                          │
│                                              │                         │
│                                              ▼                         │
│  [ LMS Plattform (Vorheriges Kapitel) ] ──► Spielt Kurse ab            │
│  • Studenten lernen & füllen Quizzes aus                               │
│  • Fortschritts-Tracking & Zertifikate                                 │
└────────────────────────────────────────────────────────────────────────┘
```

### Warum Rust für Autorensysteme?
- **Kompilier-Leistung & Validierung:** Rust kann komplexe Verzweigungsbäume (Branching Scenarios) blitzschnell auf Sackgassen prüfen.
- **Plattformübergreifender Export:** Rust generiert problemlos standalone HTML5-Pakete, SCORM-ZIP-Archive oder WebAssembly-Anwendungen.
- **Modulare Block-Architektur:** Dank Rusts `enum`s lassen sich beliebig erweiterbare Lernblöcke (Text, Quiz, Code-Sandbox, Video) typsicher modellieren.

---

## 🧠 Die Bildmetapher: Die Zauber-Schreibwerkstatt des Lehrbuch-Meisters

Stell dir dein Autorensystem wie die **Schreibwerkstatt eines meisterhaften Schulbuch-Autors** vor:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   DIE SCHREIBWERKSTATT DES AUTORS                      │
│                                                                        │
│  1. [ Der Baukasten (`BlockBuilder`) ]                                 │
│     ├── Fügt Text, Bilder, Multiple-Choice & Code-Sandboxes zusammen   │
│                                                                        │
│  2. [ Die Abzweigungs-Weiche (`BranchingScenario`) ]                   │
│     └── "Wenn der Schüler A wählt -> Gehe zu Lektion 3; sonst Lektion 2"│
│                                                                        │
│  3. [ Die Lektorats-Prüfung (`LektorValidator`) ]                      │
│     └── Prüft, ob alle Pfade lösbar sind und keine Sackgassen existieren│
│                                                                        │
│  4. [ Der Universaldrucker (`SCORM / HTML Exporter`) ]                 │
│     └── Verpackt alles in ein ZIP-Paket für jede E-Learning-Plattform  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architektur & Datenstrukturen

Ein Autorensystem organisiert Lerninhalte als **Bausteine (Blocks)** und **Lernpfad-Knoten (Flow Nodes)**.

### 1. Die lernspezifischen Bausteine (`ContentBlock`)

```rust
use uuid::Uuid;

/// Verschiedene interaktive Elemente, die ein Autor in eine Lektion einfügen kann
#[derive(Debug, Clone)]
pub enum ContentBlock {
    /// Ein einfacher Text- oder Markdown-Block
    Text(String),
    /// Ein eingebettetes Bild mit Alt-Text
    Image { url: String, alt: String },
    /// Ein interaktives Multiple-Choice-Quiz
    Quiz { question: String, options: Vec<String>, correct_index: usize },
    /// Eine interaktive Code-Challenge mit Start-Code
    CodeSandbox { prompt: String, initial_code: String, expected_output: String },
    /// Eine Entscheidungs-Weiche für Verzweigungsszenarien
    BranchingChoice { prompt: String, choices: Vec<ChoiceOption> },
}

#[derive(Debug, Clone)]
pub struct ChoiceOption {
    pub label: String,
    pub target_node_id: Uuid, // Wohin führt diese Entscheidung?
}
```

### 2. Der Lernpfad-Knoten (`LessonNode`) & das Projekt

```rust
use std::collections::HashMap;

/// Ein Knoten im interaktiven Lernpfad
#[derive(Debug, Clone)]
pub struct LessonNode {
    pub id: Uuid,
    pub title: String,
    pub blocks: Vec<ContentBlock>,
    /// Nächster Standard-Knoten (falls keine Verzweigung gewählt wird)
    pub next_node_id: Option<Uuid>,
}

/// Das Gesamte E-Learning-Projekt des Autors
#[derive(Debug, Clone, Default)]
pub struct AuthoringProject {
    pub id: Uuid,
    pub title: String,
    pub author: String,
    pub start_node_id: Option<Uuid>,
    pub nodes: HashMap<Uuid, LessonNode>,
}
```

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das didaktische Core-Gerüst für dein E-Learning-Autorensystem. Vervollständige die Lücken überall dort, wo `todo!()` steht!

```rust
use std::collections::{HashMap, HashSet};
use std::path::Path;
use uuid::Uuid;

// (Datenstrukturen wie oben definiert)

#[derive(Debug, PartialEq)]
pub enum ValidationError {
    MissingStartNode,
    UnreachableNode(Uuid),
    DeadEndNode(Uuid),
}

pub struct AuthoringEngine;

impl AuthoringEngine {
    /// Überprüft das Projekt des Autors auf logische Fehler und Sackgassen
    pub fn validate_project(project: &AuthoringProject) -> Result<(), Vec<ValidationError>> {
        let mut errors = Vec::new();

        // 1. Prüfen, ob ein Start-Knoten definiert ist
        if project.start_node_id.is_none() {
            errors.push(ValidationError::MissingStartNode);
            return Err(errors);
        }

        // 2. Erreichbarkeit prüfen (BFS/DFS von start_node_id)
        let mut visited = HashSet::new();
        let mut queue = Vec::new();

        if let Some(start_id) = project.start_node_id {
            queue.push(start_id);
        }

        // TODO: Durchlaufe alle Knoten von start_node_id aus (über next_node_id und BranchingChoices).
        // Füge jeden besuchten Knoten zu `visited` hinzu.

        // TODO: Überprüfe, ob es Knoten in `project.nodes` gibt, die NICHT in `visited` enthalten sind
        // -> Das sind unerreichbare Sackgassen! Erzeuge ValidationError::UnreachableNode.

        todo!("Implementiere die Lernpfad-Validierung!")
    }

    /// Exportiert das Projekt als standalone HTML5-Lernpaket
    pub fn export_to_html5(project: &AuthoringProject, output_dir: &Path) -> Result<(), std::io::Error> {
        // Leitfragen:
        // 1. Wie generierst du eine index.html mit interaktivem JavaScript für Quizze und Verzweigungen?
        // 2. Wie verpackst du alle CSS-, JS- und Bild-Dateien in den Zielordner?

        todo!("Implementiere den HTML5-Exporter für E-Learning Kurse!")
    }
}

fn main() {
    println!("✍️ E-Learning Autorensystem Engine Test");

    let mut project = AuthoringProject::default();
    project.title = String::from("Rust für Einsteiger");
    
    // TODO: Erstelle Test-Knoten und teste die Validierungs-Funktion!
}
```

---

## 🧪 Übungsaufgaben

Bringe dein Autorensystem auf Profi-Niveau!

### 🟢 Leicht: Block-Reihenfolge verschieben
Schreibe eine Methode `pub fn reorder_blocks(node: &mut LessonNode, from_index: usize, to_index: usize)`, mit der ein Autor Blöcke innerhalb einer Lektion nach oben oder unten verschieben kann.

### 🟡 Mittel: Sackgassen- & Dead-End-Finder
Erweitere die `validate_project`-Funktion:
- Ein Knoten gilt als **Dead End** (Sackgasse), wenn er keine Folge-Lektion (`next_node_id = None`) und keine Verzweigung hat, aber auch nicht als offizielles "Kurs-Ende" markiert ist.

### 🔴 Schwer: SCORM 1.2 / H5P ZIP-Exporter
Das Markenzeichen professioneller Autorensysteme (wie Articulate Storyline oder Adobe Captivate) ist der **SCORM-Export**:
- Erstelle ein SCORM 1.2 kompatibles ZIP-Archiv mit einem `imsmanifest.xml` Manifest.
- **Denkanstoß:** Nutze das `zip`-Crate und erstelle das XML-Manifest dynamisch aus `AuthoringProject`.

---

## 🎯 Zusammenfassung

Mit deinem eigenen **E-Learning-Autorensystem in Rust** schließt du den Kreis der digitalen Bildung:
- **E-Learning-Architektur:** Trennung zwischen Erstellung (Autorensystem) und Konsum (LMS).
- **Graph-Validierung:** Automatische Prüfung von Lernpfaden und Verzweigungsszenarien ohne Sackgassen.
- **Standard-Export:** Umwandlung von Rust-Datenstrukturen in universelle E-Learning-Formate (HTML5/SCORM).

Damit besitzt du das perfekte Werkzeugset, um interaktive Schulungen und moderne Online-Kurse in Rust zu erschaffen! ✍️🎓🚀
