# 🏛️ Alternativer Ansatz: Eine MediaWiki-Engine in Rust nachbauen

In den vorherigen Kapiteln haben wir vor allem auf Markdown gesetzt. Doch das weltweit bekannteste Wissenssystem überhaupt – **Wikipedia** – nutzt eine ganz eigene Syntax: **Wikitext / MediaWiki-Markup**.

In diesem Kapitel lernst du, wie du eine **MediaWiki-Engine in Rust** entwirfst und baust. Das ist besonders spannend, weil MediaWiki-Syntax mächtigere Features wie **Kategorien, Wikilinks, Vorlagen (Templates) und Infoboxen** bietet.

---

## 🚀 Einleitung & Vision: Der Wikipedia-Standard in Rust

MediaWiki treibt Wikipedia seit Jahrzehnten an. Ein MediaWiki-System in Rust nachzubauen bietet enorm hohe Performance, maximale Sicherheit gegen Script-Injection (HTML-Escaping) und erlaubt dir, ein echtes Enzyklopädie-System selbst zu betreiben.

### Warum MediaWiki-Syntax lernen?
- **Wikipedia-Kompatibilität:** Du kannst echte Wikipedia-Artikel oder Wikitext-Exporte einlesen.
- **Reichhaltige Syntax:** Wikitext unterscheidet strikt zwischen Fliesstext, internen Seiten-Links, Kategorien und dynamischen Vorlagen.
- **Parser-Bau in Rust:** Du lernst, wie man einen maßgeschneiderten Lexer und AST (Abstract Syntax Tree) für nicht-triviale Textformate baut.

---

## 🧠 Die Bildmetapher: Der Enzyklopädie-Skriptor

Stell dir deine MediaWiki-Engine wie einen mittelalterlichen **Skriptor in einer großen Enzyklopädie-Schreibstube** vor:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                    DER ENZYKLOPÄDIE-SKRIPTOR                           │
│                                                                        │
│  1. [ Quelltext ]     ──>  "== Rust == '''Rust''' ist [[Programmiersprache]]" │
│                                  │                                     │
│  2. [ Skriptor ]      ──>  Erkennt Überschrift, Fett-Text & Querverweis│
│                            (AST: Abstract Syntax Tree)                 │
│                                  │                                     │
│  3. [ Buchmaler ]     ──>  Stempelt Kategorie-Marken & Links           │
│                                  │                                     │
│  4. [ Pergament ]     ──>  Ausgabe als sauberes, sicheres HTML           │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Der Quelltext**: Der Autor reicht ein Manuskript in Wikitext-Format ein.
2. **Der Skriptor (Lexer & Parser)**: Er liest Zeichen für Zeichen, erkennt Sonderzeichen wie `==` oder `'''` und baut eine geordnete Liste von Bedeutungs-Bausteinen (den AST).
3. **Der Buchmaler (Template-Engine)**: Er löst Vorlagen (`{{Infobox ...}}`) auf und fügt Metadaten wie Kategorien am Seitenende ein.
4. **Das Pergament (HTML-Renderer)**: Der fertige Text wird sicher in HTML transformiert und im Browser ausgegeben.

---

## 🏗️ Syntax-Vergleich: Markdown vs. MediaWiki

Bevor wir den Parser entwerfen, vergleichen wir die beiden Syntax-Welten:

| Element | Markdown | MediaWiki (Wikitext) |
| :--- | :--- | :--- |
| **Überschrift 2** | `## Überschrift` | `== Überschrift ==` |
| **Fett-Text** | `**Fett**` | `'''Fett'''` |
| **Kursiv-Text** | `*Kursiv*` | `''Kursiv''` |
| **Interner Link** | `[Rust](rust_page)` | `[[Rust]]` oder `[[Rust\|Sprache Rust]]` |
| **Kategorie** | `- Tag: Rust` | `[[Kategorie:Programmiersprachen]]` |
| **Vorlagen / Templates** | *(Kein Standard)* | `{{Infobox Software\|name=Rust}}` |

---

## 🏗️ Der MediaWiki AST (Abstract Syntax Tree)

Um Wikitext in Rust zu verarbeiten, definieren wir die Datenstrukturen für unseren Parser:

```rust
/// Ein Baustein in einem MediaWiki-Dokument
#[derive(Debug, PartialEq, Clone)]
pub enum MediaWikiNode {
    /// Überschrift mit Ebene (1 bis 6) und Text
    Heading { level: usize, text: String },
    
    /// Normaler Textabsatz
    Paragraph(String),
    
    /// Fettgedruckter Text ('''text''')
    Bold(String),
    
    /// Kursiver Text (''text'')
    Italic(String),
    
    /// Interner Wiki-Link: [[Ziel]] oder [[Ziel|Alias]]
    WikiLink { target: String, alias: Option<String> },
    
    /// Kategorie-Zuordnung: [[Kategorie:Name]]
    Category(String),
    
    /// Dynamische Vorlage: {{Name|Param1|Param2}}
    Template { name: String, params: Vec<String> },
}

/// Das vollständige geparste Dokument
#[derive(Debug, Default)]
pub struct MediaWikiDocument {
    pub nodes: Vec<MediaWikiNode>,
    pub categories: Vec<String>,
}
```

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das didaktische Gerüst für deinen MediaWiki-Parser. Vervollständige die Lücken überall dort, wo `todo!()` steht!

```rust
use std::collections::HashMap;

#[derive(Debug, PartialEq, Clone)]
pub enum MediaWikiNode {
    Heading { level: usize, text: String },
    Paragraph(String),
    Bold(String),
    Italic(String),
    WikiLink { target: String, alias: Option<String> },
    Category(String),
}

pub struct MediaWikiParser;

impl MediaWikiParser {
    /// Wandelt Wikitext-Zeilen in eine Liste von AST-Knoten um
    pub fn parse(input: &str) -> Vec<MediaWikiNode> {
        let mut nodes = Vec::new();

        for line in input.lines() {
            let trimmed = line.trim();

            if trimmed.is_empty() {
                continue;
            }

            // 1. Überschriften parsen (z. B. == Überschrift ==)
            if trimmed.starts_with("==") && trimmed.ends_with("==") {
                // TODO: Ermittle die Anzahl der '='-Zeichen für das Level (z. B. == -> Level 2)
                // und extrahiere den reinen Text dazwischen.
                todo!("Implementiere das Parsen von MediaWiki-Überschriften")
            }
            
            // 2. Kategorien parsen (z. B. [[Kategorie:Rust]])
            else if trimmed.starts_with("[[Kategorie:") && trimmed.ends_with("]]") {
                // TODO: Extrahiere den Kategorienamen zwischen '[[Kategorie:' und ']]'
                todo!("Implementiere das Parsen von Kategorien")
            }

            // 3. Normale Absätze & WikiLinks verarbeiten
            else {
                // TODO: Parser für WikiLinks [[Ziel]] oder [[Ziel|Alias]] einbauen
                todo!("Implementiere den Absatz- und Link-Parser")
            }
        }

        nodes
    }

    /// Generiert sicheres HTML aus den AST-Knoten
    pub fn render_html(nodes: &[MediaWikiNode]) -> String {
        let mut html = String::new();

        for node in nodes {
            match node {
                MediaWikiNode::Heading { level, text } => {
                    html.push_str(&format!("<h{level}>{text}</h{level}>\n"));
                }
                MediaWikiNode::Bold(text) => {
                    html.push_str(&format!("<strong>{text}</strong>"));
                }
                MediaWikiNode::Italic(text) => {
                    html.push_str(&format!("<em>{text}</em>"));
                }
                MediaWikiNode::WikiLink { target, alias } => {
                    let display_text = alias.as_ref().unwrap_or(target);
                    html.push_str(&format!("<a href=\"/wiki/{target}\">{display_text}</a>"));
                }
                MediaWikiNode::Category(cat) => {
                    // TODO: Kategorien werden meist am Seitenende als Badge/Link gerendert
                    todo!("Rendere die Kategorie-Verlinkung")
                }
                MediaWikiNode::Paragraph(text) => {
                    html.push_str(&format!("<p>{text}</p>\n"));
                }
            }
        }

        html
    }
}

fn main() {
    let wikitext = "== Rust ==\n'''Rust''' ist eine [[Programmiersprache|sichere Sprache]].\n[[Kategorie:Informatik]]";
    
    println!("--- Quelltext ---");
    println!("{wikitext}\n");

    // TODO: Teste deinen Parser und den Renderer!
    // let nodes = MediaWikiParser::parse(wikitext);
    // let html = MediaWikiParser::render_html(&nodes);
    // println!("--- Generiertes HTML ---\n{html}");
}
```

---

## 🧪 Übungsaufgaben

### 🟢 Leicht: MediaWiki-Listen parsen
In Wikitext werden ungeordnete Listen mit `*` und nummerierte Listen mit `#` erstellt:
```wikitext
* Erstes Element
* Zweites Element
# Nummer 1
# Nummer 2
```
Erweitere die `MediaWikiNode`-Enum um `UnorderedList(Vec<String>)` und `OrderedList(Vec<String>)` und passe den Parser an.

### 🟡 Mittel: Kategorie-Sammler & Metadaten
Erstelle eine Funktion `extract_categories(nodes: &[MediaWikiNode]) -> Vec<String>`, die alle im Dokument vorkommenden Kategorien filtert.
- **Denkanstoß:** Wie kannst du am Seitenende eine automatische Fußzeile erzeugen, die z. B. `Kategorien: [Informatik] [Rust]` anzeigt?

### 🔴 Schwer: Vorlagen-Engine mit Rhai (`{{#rhai: ...}}`)
Integriere die eingebettete Skriptsprache **Rhai** (wie in der *MeinCMS*-Architektur), um dynamische Vorlagen zu ermöglichen:
```wikitext
{{#rhai: "Erstellt am: " + current_date() }}
```
- **Denkanstoß:** Wie schützt du die Ausführung von Skripten vor Endlosschleifen (Execution Limits)?

---

## 🎯 Zusammenfassung

Mit der MediaWiki-Engine hast du eine mächtige Alternative zum einfachen Markdown kennengelernt:
- Du kannst echte **WikiLinks** (`[[Ziel|Text]]`) und **Kategorien** strukturieren.
- Du verstehst, wie ein **Lexer & AST-Builder** für Wikitext aufgebaut ist.
- Du besitzt das Fundament, um deinen eigenen **Wikipedia-Klonserver in Rust** zu betreiben! 🏛️🚀
