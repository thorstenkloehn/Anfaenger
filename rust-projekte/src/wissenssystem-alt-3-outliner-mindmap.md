# 🌲 Alternativ-System 3: Das Outliner / Mindmap Baum-Notizsystem

Willkommen zu einer faszinierenden Reise in die Welt der hierarchischen Gedankenstrukturierung! Nach linearen Notizen und Verlinkungen widmen wir uns nun einem Werkzeug, das viele Denker, Programmierer und Autoren lieben: dem **Outliner** (bekannt aus Tools wie Workflowy, Dynalist oder Roam Research).

In diesem Kapitel lernst du, wie du deine Notizen in einer flexiblen Baumstruktur organisierst und wie man komplexe, verästelte Datenstrukturen in Rust sauber und ohne Speicherlecks modelliert.

---

## 🚀 Einleitung & Vision: Hierarchische Gedankenstrukturierung

Ein **Outliner** ist mehr als ein einfacher Texteditor. Er erlaubt es dir, Gedanken beliebig tief zu verschachteln. Jedes Thema kann in Unterthemen, diese in Absätze und diese wiederum in konkrete Aufgaben oder Stichpunkte unterteilt werden.

```text
🌲 Mein Wissensbaum
├── 🦀 Rust Lernen
│   ├── 📦 Speicherverwaltung
│   │   ├── Ownership
│   │   └── Borrowing
│   └── 🏗️ Datenstrukturen
│       ├── Structs
│       └── Enums
└── 📝 Projektplanung
    └── Outliner CLI bauen
```

### Warum ist das wichtig?
* **Top-Down-Denken:** Du startest mit einer großen Idee und zerlegst sie Schritt für Schritt in handliche Teile.
* **Rust-Herausforderung:** Bäume gehören in Rust zu den spannendsten Datenstrukturen überhaupt. Sie fordern unser Verständnis von Ownership, Borrowing und Speicher-Layouts heraus!

---

## 🧠 Die Bildmetapher: Der verästelte Wissensbaum

Stell dir einen mächtigen Eichenbaum im Wald vor:

1. **Der Stamm (`Root Node`)**: Die Wurzel deines gesamten Notizbuchs. Er trägt die Hauptkategorien.
2. **Die Äste (`Category Nodes`)**: Große Themenbereiche wie *"Rust-Programmierung"* oder *"Projekte"*.
3. **Die Zweige (`Sub-Nodes`)**: Konkrete Kapitel oder Bausteine.
4. **Die Blätter (`Leaf Nodes`)**: Einzelne Notizen, Checklisten-Punkte oder Code-Schnipsel.
5. **Einklappen / Ausklappen (`collapsed`)**: Im Winter verliert ein Ast seine Blätter und ruht. Genauso kannst du in einem Outliner ganze Teilbäume einklappen, um dich auf das Wesentliche zu konzentrieren – und sie bei Bedarf wieder entfalten.

Wenn du den Baum durchwanderst, gehst du vom Stamm entlang eines Astes bis zu den Zweigen und Blättern. Genau so funktioniert die Traversierung deines Wissensbaums im Code!

---

## 🏗️ Architektur & Baum-Datenstrukturen in Rust

### Das klassische "Rust-Baum-Problem"

In objektorientierten Sprachen wie Java oder Python erstellt man Knoten oft mit direkten Zeigern:

```text
Node -> Kind-Node -> Mutter-Node (Zeiger zurück)
```

In Rust führt dieses doppelseitige Verweisen (`parent` zeigt auf Mutter, `children` zeigt auf Kinder) schnell zu **Reference Cycles** (Speicherlecks mit `Rc`/`Arc`) oder Ownership-Konflikten mit dem Borrow Checker.

### Die elegante Rust-Lösung: Arena / Index-basierter Baum

Statt Zeigern speichern wir alle Knoten flach in einem einzigen `Vec<OutlineNode>`! Die Verweise zwischen Eltern und Kindern sind schlicht **Array-Indizes** (`usize`).

```rust
#[derive(Debug, Clone)]
pub struct OutlineNode {
    pub id: usize,
    pub text: String,
    pub children: Vec<usize>,
    pub parent: Option<usize>,
    pub collapsed: bool,
}

#[derive(Debug, Default)]
pub struct OutlineTree {
    pub nodes: Vec<OutlineNode>,
    pub root_id: Option<usize>,
}
```

#### Vorteile des Index-basierten Baums:
* ⚡ **Keine Speicherlecks:** Keine komplexe Zyklerkennung erforderlich.
* 🚀 **Speicher-Effizienz:** Alle Knoten liegen zusammenhängend im Speicher (`Vec`).
* 💾 **Einfache Serialisierung:** Lässt sich problemlos als JSON oder OPML speichern und laden.

---

### Vergleich: Rekursiver `Box`-Baum vs. Index-Baum (`Vec`)

| Eigenschaft | Rekursiv (`Box<Node>`) | Index-basiert (`Vec<OutlineNode>`) |
| :--- | :--- | :--- |
| **Rückverweis zum Parent** | Sehr schwer (`Weak` / Unsafe) | Trivial (`Option<usize>`) |
| **Borrow Checker** | Komplexe Lifetimes / Borrowing | Keine Lifetime-Probleme |
| **Verschieben von Knoten** | Aufwendige Umzeigerung | Einfaches Anpassen von Indizes |
| **Performance** | Viele Heap-Allokationen | Sehr schnell (Cache-freundlich) |

---

## ⚙️ Traversierung & Code-Gerüst zum Selberbauen

Um eine baumartige Textstruktur auf dem Bildschirm auszugeben, nutzen wir die **Tiefensuche (Depth-First Search - DFS)**. Wir beginnen bei der Wurzel, geben den Knoten aus, wandern tief in den ersten Unterknoten, und erst wenn dieser Ast abgearbeitet ist, gehen wir zum nächsten Ast über.

Hier ist das didaktische Code-Gerüst für dein Outliner-System. Ergänze die Lücken überall dort, wo `todo!()` steht!

```rust
#[derive(Debug, Clone)]
pub struct OutlineNode {
    pub id: usize,
    pub text: String,
    pub children: Vec<usize>,
    pub parent: Option<usize>,
    pub collapsed: bool,
}

impl OutlineNode {
    pub fn new(id: usize, text: impl Into<String>, parent: Option<usize>) -> Self {
        Self {
            id,
            text: text.into(),
            children: Vec::new(),
            parent,
            collapsed: false,
        }
    }
}

pub struct OutlineTree {
    pub nodes: Vec<OutlineNode>,
}

impl OutlineTree {
    pub fn new() -> Self {
        Self { nodes: Vec::new() }
    }

    /// Fügt einen neuen Knoten hinzu und verknüpft ihn mit seinem Elternknoten
    pub fn add_node(&mut self, text: &str, parent_id: Option<usize>) -> usize {
        let new_id = self.nodes.len();
        let mut node = OutlineNode::new(new_id, text, parent_id);

        // TODO: Wenn ein parent_id angegeben ist, füge `new_id` zur `children`-Liste
        // des Elternknotens hinzu.
        // HINWEIS: Achte darauf, dass der Elternknoten existieren muss!
        todo!("Erstelle den Knoten und trage ihn in die Kinder-Liste des Elternknotens ein!");

        self.nodes.push(node);
        new_id
    }
}

/// Rekursive Funktion zur Darstellung des Baums als formatierter String.
/// `depth` bestimmt die Einrückungsebene für die Hierarchie.
pub fn render_outline_tree(nodes: &[OutlineNode], root_id: usize, depth: usize) -> String {
    // Leitfragen für deine Implementierung:
    // 1. Wie holst du den Knoten mit `root_id` aus dem Slices `nodes`?
    // 2. Wie erzeugst du Einrückungs-Leerzeichen basierend auf `depth`? (z.B. "  ".repeat(depth))
    // 3. Was machst du, wenn `collapsed == true` ist? (Abbruch der Rekursion für die Kinder!)
    // 4. Wie rufst du `render_outline_tree` rekursiv für alle Kinder in `children` auf?

    todo!("Implementiere die Baumdarstellung mit passender Einrückung und Einklapp-Logik!");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_tree_rendering() {
        let mut tree = OutlineTree::new();
        let root = tree.add_node("Mein Wissensbaum", None);
        let rust_node = tree.add_node("Rust Lernen", Some(root));
        let ownership = tree.add_node("Ownership & Borrowing", Some(rust_node));

        let output = render_outline_tree(&tree.nodes, root, 0);
        assert!(output.contains("Mein Wissensbaum"));
        assert!(output.contains("Rust Lernen"));
        assert!(output.contains("Ownership & Borrowing"));
    }
}
```

---

## 🧪 Übungsaufgaben

Stelle dein Können unter Beweis! Bearbeite die Aufgaben Schritt für Schritt.

### 🟢 Stufe 1 (Leicht): Knoten ein- und ausklappen
Implementiere eine Methode `pub fn toggle_collapse(&mut self, node_id: usize)` auf `OutlineTree`.
* **Anforderung:** Wenn der Knoten ausgeklappt ist (`collapsed = false`), soll er eingeklappt werden und umgekehrt.
* **Erweiterung von `render_outline_tree`:** Wenn ein Knoten eingeklappt ist und Kinder besitzt, gib hinter seinem Text ein kleines Präfix wie `[+]` aus und überspringe die Rekursion für seine Kinder. Wenn er ausgeklappt ist, zeige `[-]`.

### 🟡 Stufe 2 (Mittel): Knoten verschieben (Re-Parenting Logik)
Schreibe eine Funktion `pub fn move_node(&mut self, node_id: usize, new_parent_id: usize) -> Result<(), String>`.
* **Anforderung:** Entferne `node_id` aus der `children`-Liste seines alten Elternknotens und füge sie bei `new_parent_id` ein. Aktualisiere auch das `parent`-Feld von `node_id`.
* **Denkanstoß zur Zyklenerkennung:** Was passiert, wenn du versuchst, einen Elternknoten in eines seiner eigenen Kinder zu verschieben? Wie kannst du prüfen, ob `new_parent_id` ein Nachfahre von `node_id` ist?

### 🔴 Stufe 3 (Schwer): Export nach JSON oder OPML
Implementiere einen Export-Mechanismus für deinen Wissensbaum!
* **OPML Export:** OPML (Outline Processor Markup Language) ist ein verbreitetes XML-Format für Outliner.
* **Aufgabe:** Schreibe eine Funktion `pub fn export_to_opml(tree: &OutlineTree) -> String`, die den Baum rekursiv durchläuft und sauberes XML mit `<outline text="...">` Tags erzeugt.

---

## 🎯 Zusammenfassung

Mit dem **Outliner-Baumsystem** hast du eine der mächtigsten Datenstrukturen in Rust gemeistert:
* **Arena-Muster:** Statt unübersichtlicher Zeiger-Zyklen nutzen wir flache Vektoren mit Indizes als Referenzen.
* **Hierarchische Struktur:** Perfekt für die Zerlegung komplexer Ideen von der Wurzel bis zum einzelnen Blatt.
* **Tiefensuche:** Durch rekursive Traversierung lässt sich der Baum elegant formatieren und darstellen.

Du besitzt nun das Fundament, um deinen eigenen interaktiven Outliner für die Kommandozeile zu bauen! 🌲✨
