# 📦 Mitmach-Workshop: Makros in Rust verstehen

Willkommen zum Mitmach-Workshop für Rust-Makros! Makros sind ein extrem mächtiges Werkzeug in Rust, das es dir ermöglicht, Code zu schreiben, der wiederum anderen Code schreibt (Metaprogrammierung). Wenn du dich jemals gefragt hast, wie `println!` oder `vec!` unter der Haube funktionieren, bist du hier genau richtig.

In diesem Kapitel werden wir das Thema Makros von Grund auf erarbeiten. Und das Beste: Du wirst selbst aktiv! Wir starten mit einer alltagsnahen Analogie, werfen einen Blick auf einen Spickzettel, bauen ein HTML-Makro in einem interaktiven Workshop und vertiefen das Gelernte mit vier Übungen und einem Quiz.

---

## 1. Die Analogie: Plätzchenform vs. Fließband-Roboter

In Rust gibt es zwei Hauptarten von Makros: **deklarative** Makros (mit `macro_rules!`) und **prozedurale** Makros. Um den Unterschied zu verstehen, stellen wir uns eine Weihnachtsbäckerei vor.

### Deklarative Makros (`macro_rules!`): Die Plätzchenform
Stell dir ein deklaratives Makro vor wie eine **Plätzchenform (Ausstechform)**.
* **Wie es funktioniert**: Du hast einen fertigen Teig (deinen Quellcode) und drückst die Form hinein. Die Form stanzt genau das Muster aus, das vordefiniert ist.
* **Eigenschaft**: Es ist eine reine Schablone. Sie nimmt den Teig, der da ist, und bringt ihn in eine bestimmte Form (Text-Ersetzung und Pattern Matching). Die Form selbst kann nicht "denken" – sie kann den Teig nicht umrühren, keine Rosinen hinzufügen oder prüfen, ob der Teig süß genug ist. Sie kopiert einfach eine Struktur.
* **In Rust**: Deklarative Makros vergleichen den übergebenen Code mit Mustern und ersetzen ihn durch neuen Code.

### Prozedurale Makros: Der Fließband-Roboter
Ein prozedurales Makro ist dagegen wie ein **intelligenter Fließband-Roboter** in einer modernen Fabrik.
* **Wie es funktioniert**: Der Roboter nimmt die rohen Zutaten (den Code als abstrakten Syntaxbaum / AST) entgegen. Er analysiert die Zutaten, prüft die Qualität, fügt neue Zutaten hinzu, berechnet Nährwerte, backt das Ganze und verpackt es am Ende.
* **Eigenschaft**: Der Roboter führt echten Programmcode aus, um den neuen Code zu generieren. Er kann komplexe Berechnungen anstellen, externe Dateien einlesen oder Sicherheitsprüfungen durchführen, bevor er das fertige Gebäck auf das Band legt.
* **In Rust**: Prozedurale Makros erhalten den Rust-Code als TokenStream, verarbeiten ihn mit regulärem Rust-Code (oft unter Verwendung von Bibliotheken wie `syn` und `quote`) und geben einen neuen TokenStream zurück.

---

## 2. Micro-Learnings & Spickzettel

Bevor wir Code schreiben, schauen wir uns die Werkzeuge an, mit denen wir unsere Plätzchenform bauen.

### Deklarative Makros definieren
Ein deklaratives Makro wird mit `macro_rules!` erstellt:
```rust
macro_rules! mein_makro {
    ($parameter:designator) => {
        // Der Code, der erzeugt wird
    };
}
```

### Der Designator-Spickzettel
Designatoren sagen Rust, welche Art von Code-Teil an dieser Stelle erwartet wird. Hier sind die wichtigsten:

| Designator | Bedeutung | Beispiel im Code |
| :--- | :--- | :--- |
| **`expr`** | Ein Ausdruck (Expression), der einen Wert liefert. | `5`, `x + 1`, `berechne_wert()` |
| **`ident`** | Ein Bezeichner (Identifier). Namen von Variablen, Funktionen oder Typen. | `x`, `mein_vektor`, `String` |
| **`ty`** | Ein Rust-Datentyp (Type). | `i32`, `Vec<u8>`, `&str` |
| **`stmt`** | Eine Anweisung (Statement). | `let x = 5;`, `println!("Hi");` |
| **`path`** | Ein Pfad zu einem Modul oder Typ. | `std::collections::HashMap` |
| **`block`** | Ein in geschweifte Klammern eingeschlossener Block. | `{ let x = 1; x + 2 }` |

### Die Wiederholungs-Syntax
Oft möchtest du eine unbestimmte Anzahl von Argumenten verarbeiten (wie bei `vec![1, 2, 3]`). Dafür nutzt man die Wiederholungs-Syntax:

$$\$( \dots ) \text{Trennzeichen} \text{Indikator}$$

* **Trennzeichen**: Meistens ein Komma `,` oder Semikolon `;`.
* **Indikator**:
  * `*`: 0 oder mehr Wiederholungen.
  * `+`: 1 oder mehr Wiederholungen.

**Beispiel**:
`$($element:expr),*` bedeutet: Beliebig viele Ausdrücke, getrennt durch Kommata.

---

## 3. Programmier-Workshop: HTML-Element-Generierung

Jetzt bist du dran! Wir wollen ein Makro schreiben, das uns HTML-Elemente generiert.

### Das Ziel
Wir möchten folgendes Makro aufrufen können:
```rust
let html = html_list!(
    div => "Hallo Welt",
    p => "Rust ist super",
    span => "Ein kleiner Text"
);
```
Am Ende soll `html` den String `<div>Hallo Welt</div><p>Rust ist super</p><span>Ein kleiner Text</span>` enthalten.

### Dein Code-Skelett zum Ausfüllen
Kopiere diesen Code in ein lokales Rust-Projekt (z. B. in die `src/main.rs`) und versuche, die Lücken zu füllen.

> [!IMPORTANT]
> Lass dich nicht entmutigen, wenn es nicht sofort klappt. Nutze den Spickzettel oben, um die richtige Syntax für die Wiederholungen zu finden!

```rust
// Unser Makro zur Generierung von HTML-Tags
macro_rules! html_list {
    // 1. Der Basisfall: Ein einzelnes Element ohne Komma am Ende
    ($tag:ident => $content:expr) => {
        format!("<{}>{}</{}>", stringify!($tag), $content, stringify!($tag))
    };

    // 2. Die Wiederholung: Mehrere Elemente, getrennt durch Kommata
    // TIPP: Nutze die Wiederholungs-Syntax $(...) und das Trennzeichen,
    // um mehrere `$tag:ident => $content:expr` Paare zu matchen!
    ( $( $tag:ident => $content:expr ),+ ) => {
        // TODO: Implementiere die Expansion!
        // Du musst die einzelnen HTML-Strings generieren und zusammenfügen.
        // Ein kleiner Hinweis: Du kannst ein Vector-Makro oder direkt das `concat!` Makro
        // bzw. eine Verkettung im Makro-Körper verwenden.
        //
        // Beispiel-Tipp:
        // [ $( html_list!($tag => $content) ),+ ].join("")
        //
        // Ersetze das `todo!()` durch die richtige Expansion!
        todo!("Ersetze mich durch die korrekte Wiederholungs-Syntax!")
    };
}

fn main() {
    // Wenn dein Makro korrekt implementiert ist, sollten die Assertions erfolgreich sein!
    
    // Test 1: Einzelnes Element
    let einzeln = html_list!(div => "Test");
    assert_eq!(einzeln, "<div>Test</div>");
    println!("✓ Test 1 erfolgreich!");

    // Test 2: Mehrere Elemente
    let liste = html_list!(
        h1 => "Titel",
        p => "Ein Absatz",
        span => "Wichtig!"
    );
    assert_eq!(liste, "<h1>Titel</h1><p>Ein Absatz</p><span>Wichtig!</span>");
    println!("✓ Test 2 erfolgreich!");
}
```

---

## 4. Praxisnahe Übungen zum Vertiefen

Hier sind vier Übungen, mit denen du deine Makro-Muskeln trainieren kannst. Versuche, die `todo!()`s und Lücken so zu füllen, dass alle Assertions ohne Panik durchlaufen!

### Übung 1 (Leicht): Der Multiplikator
Schreibe ein Makro `multiply!`, das zwei Ausdrücke entgegennimmt und sie miteinander multipliziert.

```rust
macro_rules! multiply {
    ($a:expr, $b:expr) => {
        // TODO: Füge hier die Multiplikation ein!
        todo!()
    };
}

#[test]
fn test_multiply() {
    assert_eq!(multiply!(3, 5), 15);
    assert_eq!(multiply!(2 + 2, 3), 12);
}
```

### Übung 2 (Mittel): Ein einfacher Map-Builder
Schreibe ein Makro `make_map!`, das eine `std::collections::HashMap` mit Schlüssel-Wert-Paaren initialisiert.

*Kriterien*:
- Es soll Paare im Format `schluessel => wert` akzeptieren.
- Es soll auch leere Aufrufe erlauben.
- Es soll ein optionales abschließendes Komma unterstützen.

```rust
macro_rules! make_map {
    // TODO: Definiere die Muster!
    // Tipp: Denke an den leeren Fall und den Fall mit beliebig vielen Elementen.
    () => {
        std::collections::HashMap::new()
    };
    ( $( $key:expr => $value:expr ),* $(,)? ) => {
        {
            let mut map = std::collections::HashMap::new();
            // TODO: Füge die Elemente in die Map ein!
            // Nutze die Wiederholungs-Syntax für map.insert(...)
            todo!();
            map
        }
    };
}

#[test]
fn test_make_map() {
    let map = make_map!(
        "Name" => "Peter",
        "Alter" => "30",
    );
    assert_eq!(map.get("Name"), Some(&"Peter"));
    assert_eq!(map.get("Alter"), Some(&"30"));

    let empty: std::collections::HashMap<i32, i32> = make_map!();
    assert!(empty.is_empty());
}
```

### Übung 3 (Mittel): Der String-Verbindungskünstler
Schreibe ein Makro `join_strings!`, das ein Trennzeichen und beliebig viele Ausdrücke entgegennimmt. Das Makro soll alle Ausdrücke in Strings umwandeln und mit dem Trennzeichen verbinden.

*Kriterien*:
- Das erste Argument ist das Trennzeichen (z. B. `", "`).
- Danach folgen beliebig viele Ausdrücke, getrennt durch Kommata.
- Verwende `format!` oder `.to_string()`, um die Typen umzuwandeln.

```rust
macro_rules! join_strings {
    // TODO: Definiere das Muster für ein Trennzeichen und eine Liste von Ausdrücken.
    ($separator:expr, $( $val:expr ),* ) => {
        {
            // TODO: Erzeuge ein Array/Vektor aus den Strings und verbinde sie.
            // Tipp: [$( $val.to_string() ),*].join($separator)
            todo!()
        }
    };
}

#[test]
fn test_join_strings() {
    let result = join_strings!("-", 1, "zwei", 3.0);
    assert_eq!(result, "1-zwei-3");
}
```

### Übung 4 (Schwer): Das Mini-Math-DSL
Schreibe ein Makro `calc!`, das eine einfache DSL (Domain Specific Language) für mathematische Operationen bereitstellt. Es soll Ausdrücke wie `calc!(5 add 3)` oder `calc!(10 sub 4)` auswerten können.

*Kriterien*:
- Unterstütze die Schlüsselwörter `add` und `sub`.
- Nutze den passenden Designator für Zahlen bzw. Ausdrücke.
- Achte darauf, dass die Schlüsselwörter als Literale oder Bezeichner gematcht werden können.

```rust
macro_rules! calc {
    // TODO: Entwirf die Muster für Addition und Subtraktion
    // Tipp: Verwende `ident` für das Wort add/sub.
    ($left:expr add $right:expr) => {
        todo!()
    };
    ($left:expr sub $right:expr) => {
        todo!()
    };
}

#[test]
fn test_calc() {
    assert_eq!(calc!(10 add 5), 15);
    assert_eq!(calc!(20 sub 7), 13);
}
```

---

## 5. Abschluss-Quiz

Teste dein Wissen! Welche Antworten sind richtig? *(Lösungen findest du ganz unten im Kapitel)*

### Frage 1: Welcher Designator ist am besten geeignet, wenn du den Namen einer neu zu erstellenden Funktion übergeben willst?
* [ ] A) `expr`
* [ ] B) `ident`
* [ ] C) `ty`
* [ ] D) `path`

### Frage 2: Was bedeutet das Plus-Zeichen (`+`) in der Wiederholungs-Syntax `$(...)+`?
* [ ] A) Der Ausdruck muss positiv sein.
* [ ] B) Es steht für 0 oder mehr Wiederholungen.
* [ ] C) Es steht für 1 oder mehr Wiederholungen.
* [ ] D) Es addiert alle übergebenen Zahlen automatisch.

### Frage 3: Warum können deklarative Makros (macro_rules!) keine externen APIs im Compiler aufrufen oder Dateien lesen?
* [ ] A) Weil sie reine Text/Token-Ersetzungen anhand von Mustern sind und keinen beliebigen Rust-Code während des Kompilierens ausführen.
* [ ] B) Weil Rust-Compiler aus Sicherheitsgründen überhaupt keine Dateizugriffe erlauben.
* [ ] C) Weil man dafür zwingend C-Code schreiben müsste.

---

### Lösungen zum Quiz
<details>
<summary>Hier klicken, um die Lösungen anzuzeigen</summary>

1. **Richtig: B) `ident`**. Da es sich um einen Bezeichner (einen Namen) handelt, ist `ident` die richtige Wahl.
2. **Richtig: C) Es steht für 1 oder mehr Wiederholungen**. Im Gegensatz dazu steht `*` für 0 oder mehr Wiederholungen.
3. **Richtig: A)**. Deklarative Makros sind einfache Ausstechformen (Musterabgleiche). Nur prozedurale Makros laufen als eigenständige Rust-Programme während des Kompilierens und können komplexe Operationen durchführen.
</details>
