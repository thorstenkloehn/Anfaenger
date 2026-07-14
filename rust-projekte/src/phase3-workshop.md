# 🛒 Mitmach-Workshop: Phase 3 bildhaft verstehen (Der Süßigkeiten-Laden)

Willkommen im magischen Süßigkeiten-Laden! 🍬✨

Manchmal klingen Programmierbegriffe wie **Vektoren**, **HashMaps**, **Option** und **Result** ziemlich kompliziert und trocken. Aber eigentlich sind sie so einfach wie die Arbeitsschritte in einem echten Kiosk! 

In diesem Kapitel bauen wir zusammen einen Kiosk im Kopf auf und setzen ihn danach Schritt für Schritt in Rust um. Mach dich bereit für ein echtes Programmier-Abenteuer! Dieses Kapitel dient dir als umfassendes Handbuch und Nachschlagewerk für alle wichtigen Datenstrukturen und Konzepte aus Phase 3.

---

## 🗺️ Der Kiosk-Plan auf einen Blick

Schau dir an, welche Aufgaben unsere neuen Werkzeuge im Kiosk übernehmen:

```text
┌────────────────────────┐      ┌──────────────────────────────────┐
│   Die Warteschlange    │ ───> │ Vec: Kunden anstellen & aufrufen │
└────────────────────────┘      └──────────────────────────────────┘
            │
┌────────────────────────┐      ┌──────────────────────────────────┐
│   Das Verkaufsregal    │ ───> │ HashMap: Preise/Mengen ablesen   │
└────────────────────────┘      └──────────────────────────────────┘
            │
┌────────────────────────┐      ┌──────────────────────────────────┐
│  Der Griff ins Glas   │ ───> │ Option: Ist noch etwas drin?     │
└────────────────────────┘      │  ├─ Some: "Ja, nimm eins!"       │
                                │  └─ None: "Oh je, das Glas ist   │
                                │           vollkommen leer!"      │
                                └──────────────────────────────────┘
            │
┌────────────────────────┐      ┌──────────────────────────────────┐
│      Das Bezahlglas    │ ───> │ Result: Reicht das Geld?         │
└────────────────────────┘      │  ├─ Ok: Wechselgeld zurück       │
                                │  └─ Err: Fehler: Zu wenig Geld!  │
                                └──────────────────────────────────┘
```

---

## 🧠 Hintergrund: Wo liegen die Süßigkeiten? (Stack vs. Heap)

Bevor wir anfangen, müssen wir verstehen, wo der Computer unsere Kiosk-Daten speichert. Stell dir vor, du hast zwei Orte, um Dinge aufzubewahren:

### 1. Der Schreibtisch (Stack / Stapelspeicher)
Hier liegen Dinge, die du sofort griffbereit brauchst, wie dein Bleistift oder dein Radiergummi.
*   **Vorteil:** Du kannst blitzschnell danach greifen, da der Zugriff über feste Speicheradressen im Prozessor extrem optimiert ist.
*   **Nachteil:** Der Platz ist sehr klein. Und das Wichtigste: Du musst im Voraus genau wissen, wie groß die Gegenstände sind (z. B. eine Zahl, ein Buchstabe oder ein Struct mit fester Größe).
*   In Rust liegen hier einfache Typen wie `i32` (Zahlen), `bool` (Wahrheitswerte), `char` (einzelne Buchstaben) oder feste Referenzen.

### 2. Die riesige Lagerhalle (Heap / Haldenspeicher)
Wenn du plötzlich 100 Fußbälle oder eine wachsende Anzahl an Bonbongläsern lagern willst, passen diese nicht auf deinen Schreibtisch. Du schickst sie in eine riesige Lagerhalle.
*   **Vorteil:** Fast unendlich viel Platz. Deine Kisten können beliebig wachsen oder schrumpfen!
*   **Wie funktioniert das?** Die Lagerhalle packt deine Lollis in einen großen Karton. Sie gibt dir einen Zettel mit der genauen Regalnummer (die **Adresse** oder den **Pointer**). Diesen Zettel legst du auf deinen Schreibtisch.
*   In Rust nutzen dynamische Datenstrukturen wie `String`, `Vec<T>` und `HashMap<K, V>` diesen Speicherort. Auf dem Stack liegt nur die "Adresse", die echten Daten liegen auf dem Heap!

#### Speicher-Layout im Detail (Visualisierung)

Stell dir vor, du hast eine Warteschlange von Kunden im Speicher:

```text
STACK (Dein Schreibtisch)               HEAP (Die Lagerhalle)
┌────────────────────────────┐          ┌──────────────────────────────────┐
│ Name: "warteschlange"      │          │ Index 0: String("Paul")          │
│ - Pointer: 0x123456 ───────┼─────────>│ Index 1: String("Mia")           │
│ - Capacity: 4              │          │ Index 2: String("Leo")           │
│ - Length: 3                │          │ Index 3: (Freier Speicherplatz)  │
└────────────────────────────┘          └──────────────────────────────────┘
```

---

## 📦 Micro-Learning 1: Die Bonbon-Warteschlange (Vektoren / `Vec<T>`)

### 🧸 Die Analogie: Eine Kette aus bunten Holzperlen
Stell dir eine lange Schnur vor, auf die du bunte Holzperlen fädelst. Du kannst hinten immer eine neue Perle dranhängen oder die letzte Perle abziehen. Wenn du eine Perle aus der Mitte wegnimmst, rutschen alle anderen Perlen automatisch zusammen, damit keine Lücke entsteht.

Ein **Vektor** (geschrieben `Vec<T>`) ist genau so eine Perlenkette im Heap deines Computers. Er speichert Dinge in einer festen Reihenfolge hintereinander.

### 🔍 Der Speicher-Deep-Dive: Länge vs. Kapazität
Ein Vektor reserviert in der Lagerhalle (Heap) oft etwas mehr Platz, als er aktuell benötigt.
*   **Length (Länge):** Wie viele Elemente liegen *jetzt gerade* im Vektor.
*   **Capacity (Kapazität):** Für wie viele Elemente ist in dem reservierten Karton Platz, ohne dass wir einen neuen Karton bestellen müssen.
*   Wenn `Length` die `Capacity` überschreitet, sucht Rust automatisch einen neuen, doppelt so großen Platz in der Lagerhalle, kopiert alle Elemente dorthin und gibt den alten Platz frei. Das nennt man **Reallokation**. Das kann Zeit kosten, weshalb man bei großen Datenmengen die Kapazität vorab reservieren sollte.

### 🛠️ Der ultimative Spickzettel: Vektor-Operationen in der Praxis

Hier sind alle wichtigen Vektor-Werkzeuge für deinen Kiosk mit ausführlicher Erklärung:

#### 1. Erstellen und Initialisieren
```rust
// Erstellt einen komplett leeren Vektor. Auf dem Heap wird erst Speicher reserviert, 
// wenn das erste Element per .push() eingefügt wird.
let mut warteschlange: Vec<String> = Vec::new();

// Erstellt direkt einen Vektor mit Startwerten unter Verwendung des vec!-Makros.
// Rust berechnet die Kapazität hierbei automatisch passend.
let mut warteschlange = vec![String::from("Paul"), String::from("Mia")];

// Erstellt einen leeren Vektor, reserviert aber im Voraus Platz für 10 Elemente auf dem Heap.
// Verhindert unnötige Speicher-Reallokationen, wenn die ungefähre Zielgröße bekannt ist.
let mut warteschlange_optimiert: Vec<String> = Vec::with_capacity(10);
```

#### 2. Elemente hinzufügen und einfügen
```rust
// Hängt ein Element an das Ende des Vektors an.
// Falls die Kapazität erschöpft ist, wird im Hintergrund Speicher neu alloziiert.
warteschlange.push(String::from("Leo")); // ["Paul", "Mia", "Leo"]

// Fügt ein Element an einer beliebigen Position ein (hier Index 1).
// Alle nachfolgenden Elemente werden im Speicher um eine Position nach rechts verschoben.
// Achtung: Kann bei sehr langen Vektoren langsam sein!
warteschlange.insert(1, String::from("Anna")); // ["Paul", "Anna", "Mia", "Leo"]
```

#### 3. Elemente entfernen und auslesen
```rust
// Entfernt das letzte Element und gibt es verpackt in Option<T> zurück.
// Gibt Some(Element) zurück, falls der Vektor nicht leer war, ansonsten None.
let letzter_kunde = warteschlange.pop(); // Entfernt "Leo", gibt Some("Leo") zurück

// Entfernt ein Element an einer bestimmten Position (hier Index 0).
// Alle nachfolgenden Elemente rutschen nach links auf.
// Achtung: Kann bei großen Vektoren die Performance beeinträchtigen!
let paul = warteschlange.remove(0); // Entfernt "Paul", "Anna" rutscht auf Index 0 nach.

// Löscht alle Elemente aus dem Vektor.
// Der Vektor ist danach leer, behält aber seine reservierte Heap-Kapazität.
warteschlange.clear();
```

#### 4. Informationen über den Vektor abfragen
```rust
// Gibt die aktuelle Anzahl der Elemente im Vektor als usize zurück.
let anzahl = warteschlange.len();

// Gibt true zurück, wenn der Vektor keine Elemente enthält, andernfalls false.
// Ist performanter als "warteschlange.len() == 0".
let leer = warteschlange.is_empty();

// Gibt die aktuelle Heap-Kapazität des Vektors zurück.
let kapazitaet = warteschlange.capacity();
```

#### 5. Suchen und Prüfen
```rust
// Prüft, ob ein bestimmtes Element im Vektor existiert.
// Vergleicht den Wert mittels des PartialEq-Traits.
let hat_mia = warteschlange.contains(&String::from("Mia"));
```

#### 6. Zugriff auf Elemente
```rust
// Unmittelbarer Zugriff über eckige Klammern.
// ACHTUNG: Stürzt ab (panic!), falls der Index nicht existiert.
let kunde_referenz = &warteschlange[0];

// Sicherer Zugriff mit der .get()-Methode.
// Gibt Some(&T) zurück, wenn der Index existiert, andernfalls None.
let sicherer_kunde = warteschlange.get(0); 
```

#### 7. Iteration (Durchlaufen)
```rust
// Über die Elemente lesend iterieren. Die Elemente werden per Referenz (&) geliehen.
for kunde in &warteschlange {
    println!("Kunde in der Warteschlange: {}", kunde);
}

// Über die Elemente iterieren und sie direkt verändern (&mut).
for kunde in &mut warteschlange {
    kunde.push_str(" (Wartend)");
}
```

### ⚠️ Häufige Stolperfallen mit Vektoren

#### ❌ Falle 1: Index out of Bounds (Der Griff ins Nichts)
Wenn du direkt über eckige Klammern `[index]` auf ein Element zugreifst, das nicht existiert, stürzt dein Programm sofort ab.
```rust
let kunden = vec![String::from("Mia")];
// let fehler = &kunden[5]; // BOOM! Das Programm stürzt ab (panic!).
```
**Die Lösung:** Nutze `.get(index)`, um eine sichere `Option` zu erhalten:
```rust
match kunden.get(5) {
    Some(kunde) => println!("Kunde an Index 5: {}", kunde),
    None => println!("Kein Kunde an diesem Index vorhanden!"),
}
```

#### ❌ Falle 2: Der Borrow Checker schlägt beim Ändern in Schleifen zu
Du kannst den Vektor nicht verändern, während du über ihn iterierst!
```rust
let mut kunden = vec![String::from("Mia"), String::from("Leo")];
for kunde in &kunden {
    // kunden.push(String::from("Paul")); // FEHLER: Vektor ist bereits für die Schleife geliehen!
}
```
**Die Lösung:** Nutze eine Schleife, die Indizes durchläuft, oder sammle die neuen Elemente temporär in einem separaten Vektor, den du nach der Schleife anfügst:
```rust
let mut kunden = vec![String::from("Mia"), String::from("Leo")];
let mut neue_kunden = Vec::new();
for kunde in &kunden {
    if kunde == "Mia" {
        neue_kunden.push(String::from("Paul"));
    }
}
kunden.append(&mut neue_kunden); // Funktioniert problemlos!
```

### 🔄 Vergleich mit anderen Sprachen (Für Umsteiger)

Wenn du bereits Programmiererfahrung hast, kannst du Vektoren direkt mit bekannten Strukturen vergleichen:

*   **In Python:** Ein `Vec<T>` entspricht einer ganz normalen **Liste (`list`)**.
    *   *Python:* `kunden = ["Mia", "Leo"]` -> `kunden.append("Paul")`
    *   *Rust:* `let mut kunden = vec![String::from("Mia"), String::from("Leo")];` -> `kunden.push(String::from("Paul"));`
    *   *Der Unterschied:* In Python-Listen kannst du wild unterschiedliche Typen mischen (Zahlen, Texte, Objekte in einer Liste). In Rust müssen **alle Elemente denselben Typ `T` haben**.
*   **In JavaScript:** Ein `Vec<T>` entspricht dem **Array**.
    *   *JavaScript:* `let kunden = ["Mia", "Leo"];` -> `kunden.push("Paul");`
    *   *Der Unterschied:* Auch hier erzwingt Rust Typsicherheit. Zudem sind Vektoren in Rust nicht "sparse" – du kannst nicht einfach ein Element an Index 100 einfügen, wenn dein Vektor nur 2 Elemente hat.
*   **In Java:** Ein `Vec<T>` entspricht einer **`ArrayList<T>`**.
    *   *Java:* `ArrayList<String> kunden = new ArrayList<>();` -> `kunden.add("Paul");`
    *   *Der Unterschied:* In Rust gibt es keinen Garbage Collector. Der Speicher des Vektors auf dem Heap wird **sofort und automatisch freigegeben**, sobald die Variable `kunden` den Gültigkeitsbereich (Scope) verlässt. Das nennt man RAII (Resource Acquisition Is Initialization).

---

## 🏷️ Micro-Learning 2: Das beschriftete Regal (HashMaps / `HashMap<K, V>`)

### 🧸 Die Analogie: Das Apotheker-Regal mit beschrifteten Fächern
In unserem Kiosk haben wir ein großes Holzregal. Darauf stehen viele Gläser voller Leckereien. Auf jedem Glas klebt ein großes, deutliches Schild: "Erdbeer-Lollis", "Zitronen-Bonbons" oder "Saure Gurken".

Wenn ein Kunde "Erdbeer-Lollis" möchte, suchst du nicht das "Glas Nummer 3", sondern du liest einfach die Schilder ab! Das Schild ist der **Schlüssel (Key)**. Der Inhalt des Glases (z. B. 15 Stück) ist der **Wert (Value)**.

In Rust nennen wir das eine **HashMap**. Sie verbindet immer einen Schlüssel mit einem Wert im Heap-Speicher.

### 🔍 Der Speicher-Deep-Dive: Wie funktioniert Hashing?
Wie findet die HashMap so schnell das richtige Fach?
1. Wenn du nach `"Lollis"` suchst, jagt Rust dieses Wort durch eine mathematische Funktion (den **Hasher**).
2. Der Hasher berechnet daraus eine eindeutige Zahl (z. B. `4389274`).
3. Diese Zahl wird als Index in einem internen Vektor genutzt.
4. Dadurch muss Rust nicht das ganze Regal durchsuchen, sondern springt *sofort* zum richtigen Fach! Das macht die HashMap extrem schnell, selbst bei Millionen von Einträgen.

### 🛠️ Der ultimative Spickzettel: HashMap-Operationen

Hier sind die wichtigsten Werkzeuge für dein Verkaufsregal mit ausführlicher Erklärung:

#### 1. Importieren und Initialisieren
```rust
// Da HashMaps nicht in der absoluten Standard-Präludium-Bibliothek liegen, 
// müssen wir sie explizit aus dem collections-Modul importieren.
use std::collections::HashMap;

// Erstellt eine leere HashMap. Wie beim Vektor wird erst beim Einfügen 
// Speicher auf dem Heap reserviert.
let mut regal: HashMap<String, u32> = HashMap::new();

// Erstellt eine leere HashMap mit einer reservierten Kapazität für 50 verschiedene Sorten.
let mut regal_optimiert: HashMap<String, u32> = HashMap::with_capacity(50);
```

#### 2. Elemente einfügen und aktualisieren
```rust
// Fügt ein Schlüssel-Wert-Paar in die HashMap ein.
// Falls der Schlüssel bereits existierte, wird der alte Wert überschrieben 
// und als Option zurückgegeben.
regal.insert(String::from("Lollis"), 50);

// Die Entry-API: Prüft, ob ein Schlüssel bereits vorhanden ist. 
// Falls nicht, wird der Standardwert eingefügt.
// Gibt eine veränderbare Referenz (&mut V) auf den Wert zurück.
regal.entry(String::from("Schokolade")).or_insert(10);

// Einen Wert in der HashMap modifizieren (z. B. den Lolli-Bestand erhöhen).
// or_insert sorgt dafür, dass ein Eintrag existiert, falls er vorher fehlte.
// Das Sternchen (*) dereferenziert die Referenz, um den Wert direkt zu ändern.
let lolli_eintrag = regal.entry(String::from("Lollis")).or_insert(0);
*lolli_eintrag += 5; // Lolli-Bestand um 5 erhöht!
```

#### 3. Elemente auslesen und entfernen
```rust
// Holt den Wert zu einem Schlüssel.
// Gibt Option<&V> zurück: Some(&wert) falls vorhanden, None falls nicht vorhanden.
let bestand = regal.get("Lollis");

// Entfernt einen Schlüssel und seinen Wert aus der HashMap.
// Gibt Option<V> mit dem gelöschten Wert zurück.
let geloeschter_wert = regal.remove("Lollis"); // Gibt Some(55) zurück, Lollis sind gelöscht.

// Löscht alle Einträge aus der HashMap, behält aber die Kapazität bei.
regal.clear();
```

#### 4. Informationen abfragen
```rust
// Gibt die Anzahl der Schlüssel-Wert-Paare in der HashMap zurück.
let sorten_anzahl = regal.len();

// Gibt true zurück, wenn die HashMap leer ist, andernfalls false.
let leer = regal.is_empty();

// Prüft, ob ein bestimmter Schlüssel in der HashMap existiert.
// Liefert true oder false. Ist performanter als .get().is_some().
let hat_schokolade = regal.contains_key("Schokolade");
```

#### 5. Iteration (Durchlaufen)
```rust
// Nur über alle Schlüssel (Sortennamen) iterieren.
for sorte in regal.keys() {
    println!("Sorte im Sortiment: {}", sorte);
}

// Nur über alle Werte (Bestände) iterieren.
for bestand in regal.values() {
    println!("Bestandswert: {}", bestand);
}

// Über alle Schlüssel und Werte gleichzeitig iterieren.
// Die Reihenfolge, in der die Elemente ausgegeben werden, ist zufällig!
for (sorte, bestand) in &regal {
    println!("Sorte: {}, Vorhanden: {}", sorte, bestand);
}
```

### ⚠️ Häufige Stolperfallen mit HashMaps

#### ❌ Falle 1: Die Reihenfolge ist zufällig!
Eine HashMap speichert ihre Elemente *nicht* in der Reihenfolge ab, in der du sie einfügst. Wenn du eine Schleife über das Regal laufen lässt, kommen die Sorten jedes Mal in einer anderen Reihenfolge heraus!
```rust
let mut regal = HashMap::new();
regal.insert("Erdbeere", 1);
regal.insert("Zitrone", 2);
regal.insert("Cola", 3);
// Schleife gibt vielleicht "Cola", "Erdbeere", "Zitrone" aus!
```
**Die Lösung:** Wenn die Reihenfolge wichtig ist, nutze zusätzlich einen Vektor oder eine `BTreeMap` aus der Standardbibliothek:
```rust
use std::collections::BTreeMap;
// Ein BTreeMap sortiert die Schlüssel automatisch alphabetisch bzw. nach ihrer natürlichen Ordnung.
let mut sortiertes_regal: BTreeMap<String, u32> = BTreeMap::new();
```

#### ❌ Falle 2: Ownership-Konflikte mit Keys
Wenn du einen `String` als Schlüssel in eine HashMap einfügst, „frisst“ die HashMap den String auf. Du verlierst das Besitzrecht (Ownership).
```rust
let name = String::from("Gummibärchen");
let mut regal = HashMap::new();
regal.insert(name, 10);
// println!("{}", name); // FEHLER: 'name' wurde in die HashMap verschoben (moved)!
```
**Die Lösung:** Gib der HashMap eine Kopie des Strings mit `.clone()` oder erstelle den String erst beim Einfügen:
```rust
let name = String::from("Gummibärchen");
let mut regal = HashMap::new();
regal.insert(name.clone(), 10); // name bleibt weiterhin verwendbar!
```

### 🔄 Vergleich mit anderen Sprachen (Für Umsteiger)

Hier siehst du, wie die `HashMap<K, V>` in anderen Sprachen heißt und funktioniert:

*   **In Python:** Die HashMap entspricht dem **Dictionary (`dict`)**.
    *   *Python:* `regal = {"Lollis": 50}` -> `regal["Lollis"] = 55` -> `regal.get("Lollis")`
    *   *Der Unterschied:* In Python kannst du beliebige Typen als Schlüssel und Werte mischen. In Rust müssen alle Schlüssel vom gleichen Typ `K` (z. B. `String`) und alle Werte vom gleichen Typ `V` (z. B. `u32`) sein. Zudem liefert `.get()` in Python standardmäßig `None` zurück, wenn der Schlüssel fehlt. In Rust liefert `.get()` eine `Option<&V>` (also `Some(&wert)` oder `None`).
*   **In JavaScript:** Die HashMap entspricht dem **Object** (als Key-Value-Speicher) oder der **`Map`**.
    *   *JavaScript:* `let regal = new Map();` -> `regal.set("Lollis", 50);` -> `regal.get("Lollis");`
    *   *Der Unterschied:* JS-Objekte erlauben nur Strings und Symbols als Keys. Die JS-`Map` erlaubt beliebige Typen, ist aber dynamisch typisiert. In Rust ist der Typ der Schlüssel und Werte zur Compilezeit festgeschrieben.
*   **In Java:** Die HashMap entspricht exakt der **`HashMap<K, V>`**.
    *   *Java:* `HashMap<String, Integer> regal = new HashMap<>();` -> `regal.put("Lollis", 50);` -> `regal.get("Lollis");`
    *   *Der Unterschied:* In Java liefert `get()` direkt `null` zurück, wenn ein Schlüssel nicht existiert. In Rust ist das über den Typ `Option<&V>` sicher gelöst, sodass du niemals versehentlich einen Absturz wegen eines nicht existierenden Faches riskierst.

---

## 🍯 Micro-Learning 3: Der Griff ins Bonbonglas (`Option<T>`)

### 🧸 Die Analogie: Die Überraschung beim Hineingreifen
Du nimmst das Glas mit der Aufschrift "Erdbeer-Lollis" und greifst blind hinein. Es gibt genau zwei Möglichkeiten, was passieren kann:

1.  **Some (Etwas):** Deine Finger spüren etwas. Du ziehst ein Erdbeer-Bonbon heraus.
2.  **None (Nichts):** Deine Hand greift ins Leere. Das Glas ist komplett leer!

Rust zwingt dich dazu, **beide Möglichkeiten** einzuplanen. Der Computer darf nicht einfach davon ausgehen, dass immer ein Bonbon da ist, sonst würde er abstürzen, wenn er ins Leere greift!

### 🔍 Der Speicher-Deep-Dive: Warum Rust keine NULL-Pointer hat
In vielen anderen Programmiersprachen gibt es das Konzept von `null` (ein Zeiger, der auf nichts zeigt). Wenn du versehentlich auf ein `null`-Objekt zugreifst, stürzt die Anwendung ab (z. B. `NullPointerException`). Der Erfinder dieses Konzepts, Tony Hoare, nannte es seinen "Milliarden-Dollar-Fehler".

Rust hat **kein** `null`. Stattdessen gibt es den Datentyp `Option<T>`, der ein Enum ist:
```rust
enum Option<T> {
    Some(T),
    None,
}
```
Der Compiler zwingt dich, das Enum explizit auszupacken. So wird verhindert, dass du aus Versehen auf "Nichts" zugreifst.

### 🛠️ Der ultimative Spickzettel: Option-Operationen im Detail

Hier sind alle wichtigen Methoden zur Handhabung von `Option` mit detaillierten Code-Beispielen:

#### 1. Erstellen von Options
```rust
// Erstellt eine Option, die einen String enthält (Erfolgsfall)
let lolli: Option<String> = Some(String::from("Erdbeer-Lolli"));

// Erstellt eine Option, die keinen Inhalt hat (Leerfall)
let leeres_glas: Option<String> = None;
```

#### 2. Auspacken und Verarbeiten (Pattern Matching)
```rust
// Der sichere Match-Wächter (Das Schweizer Taschenmesser)
// Du musst zwingend beide Pfade (Some und None) abdecken, sonst meckert der Compiler!
match lolli {
    Some(ref bonbon) => println!("Ausgepackt: {}!", bonbon),
    None => println!("Das Glas ist leider komplett leer."),
}

// Der schnelle Blick mit if let
// Wird nur ausgeführt, wenn der Wert Some ist. Der None-Fall wird einfach ignoriert.
if let Some(ref bonbon) = lolli {
    println!("Schnellzugriff: Ich habe ein {}", bonbon);
}
```

#### 3. Zustand abfragen
```rust
// Gibt true zurück, wenn ein Wert vorhanden ist (Some), andernfalls false.
let hat_inhalt = lolli.is_some();

// Gibt true zurück, wenn kein Wert vorhanden ist (None), andernfalls false.
let ist_leer = lolli.is_none();
```

#### 4. Standardwerte setzen (Sicheres Entpacken)
```rust
// Entpackt den Wert. Wenn die Option None ist, wird das Argument als Standardwert zurückgegeben.
// Achtung: Das Argument wird immer ausgewertet (auch wenn Some vorliegt).
let naschwerk = leeres_glas.clone().unwrap_or(String::from("Standard-Bonbon"));

// Entpackt den Wert. Wenn die Option None ist, wird die übergebene Closure (Funktion) 
// ausgeführt, um den Standardwert erst bei Bedarf (Lazy Evaluation) zu erzeugen.
// Spart Performance, wenn die Erstellung des Standardwerts teuer ist.
let naschwerk_lazy = leeres_glas.clone().unwrap_or_else(|| {
    // Dieser Code läuft NUR, wenn leeres_glas wirklich None ist!
    String::from("Mühsam frisch hergestellter Lolli")
});
```

#### 5. Werte transformieren und filtern
```rust
// .map() transformiert den inneren Wert, falls vorhanden (Some).
// Wenn None vorliegt, bleibt das Ergebnis None.
// Macht aus Some("Erdbeer-Lolli") -> Some(13) (Länge des Strings)
let laenge: Option<usize> = lolli.as_ref().map(|s| s.len());

// .filter() wertet eine Bedingung aus.
// Gibt Some(Wert) zurück, wenn der Wert die Bedingung erfüllt, andernfalls None.
let saures_bonbon = lolli.clone().filter(|s| s.contains("Sauer"));
```

#### 6. Werte manipulieren (Besonders nützlich bei veränderbaren Options)
```rust
let mut mein_naschglas = Some(String::from("Apfel-Bonbon"));

// .take() entnimmt den Wert aus einer veränderbaren Option und lässt an ihrer Stelle None zurück.
// Extrem wichtig bei Structs, um Ownership aus einem Feld zu holen!
let entnommenes_bonbon = mein_naschglas.take(); // entnommenes_bonbon ist Some("Apfel-Bonbon"), mein_naschglas ist nun None

// .replace() legt einen neuen Wert in eine veränderbare Option und gibt den alten Wert als Option zurück.
let vorheriger_inhalt = mein_naschglas.replace(String::from("Cola-Lolli")); // mein_naschglas ist Some("Cola-Lolli"), vorheriger_inhalt ist None
```

#### 7. Verkettung mit dem ? - Operator
```rust
// Wenn eine Methode oder Funktion Option zurückgibt, kann das ? an einen Aufruf gehängt werden.
// Falls der Aufruf None liefert, bricht die gesamte Funktion sofort ab und gibt None zurück.
fn hole_bonbon_laenge(regal: &HashMap<String, u32>, artikel: &str) -> Option<usize> {
    let anzahl = regal.get(artikel)?; // Bricht sofort ab, falls Artikel nicht in der HashMap existiert
    Some(anzahl.to_string().len())
}
```

### ⚠️ Häufige Stolperfallen mit Option

#### ❌ Falle 1: `.unwrap()` blind vertrauen
Wenn du `.unwrap()` auf eine Variable anwendest, die `None` ist, stürzt dein Programm augenblicklich ab.
```rust
let leeres_glas: Option<String> = None;
// let bonbon = leeres_glas.unwrap(); // PANIC: Das Programm stürzt ab!
```
**Die Lösung:** Nutze immer `match`, `if let`, `.unwrap_or()` oder `.unwrap_or_else()`. Verwende `.unwrap()` nur in Tests oder wenn du durch vorherigen Code mathematisch beweisen kannst, dass die Variable niemals `None` sein kann.

### 🔄 Vergleich mit anderen Sprachen (Für Umsteiger)

So wird das Konzept von Vorhandensein/Fehlen (Option) in anderen Sprachen gehandhabt:

*   **In Python:** Die Abwesenheit von Werten wird durch **`None`** dargestellt.
    *   *Python:* `lolli = "Erdbeer-Lolli"` oder `lolli = None`
    *   *Der Unterschied:* In Python kannst du vergessen zu prüfen, ob `lolli` vielleicht `None` ist. Wenn du dann `lolli.lower()` aufrufst, wirft Python zur Laufzeit einen `AttributeError`. In Rust kannst du Methoden eines Werts nicht auf einem `Option<T>` aufrufen. Du *musst* ihn erst entpacken.
*   **In JavaScript:** Hier gibt es sogar zwei Feinde: **`null`** und **`undefined`**.
    *   *JavaScript:* `let lolli = null;` oder `let lolli = undefined;`
    *   *Der Unterschied:* Jeder JS-Entwickler fürchtet die Fehlermeldung `Cannot read properties of null (reading 'toString')`. Rust macht diese Art von Fehlern bereits beim Kompilieren unmöglich. Wenn du ein `Option` hast, kannst du nicht versehentlich so tun, als wäre es der Wert selbst.
*   **In Java:** Die Abwesenheit wird durch **`null`** (oder neuerdings durch **`Optional<T>`**) dargestellt.
    *   *Java:* `String lolli = null;`
    *   *Der Unterschied:* `Optional<T>` in Java wurde erst nachträglich hinzugefügt und ist nicht so tief in der Sprache verankert wie in Rust. In Rust ist `Option` ein fester Bestandteil des Typsystems und wird vom Compiler optimiert (z. B. belegt `Option<&T>` dank Null-Pointer-Optimization genauso wenig Platz im Speicher wie ein normaler Zeiger).

---

## 🪙 Micro-Learning 4: Das Bezahlen an der Kasse (`Result<T, E>`)

### 🧸 Die Analogie: Der Kassiervorgang
Ein Kind steht an der Kasse und möchte ein Bonbon für 50 Cent kaufen. Es legt eine Münze auf den Tresen. Der Kassiervorgang ist eine Aktion, die entweder gelingt oder schiefgeht:

1.  **Ok:** Das Kind hat 50 Cent (oder mehr). Die Kasse rattert, du nimmst das Geld und gibst eventuell Wechselgeld zurück. `Ok(Wechselgeld)`
2.  **Err (Error):** Das Kind hat nur 20 Cent dabei. Du musst den Kauf abbrechen und sagen: "Halt stop, das reicht nicht!" `Err("Nicht genug Taschengeld!")`

Ein `Result` speichert also entweder den Erfolgswert (`Ok`) oder eine Fehlermeldung (`Err`).

### 🔍 Der Speicher-Deep-Dive: Gesteuerte Fehler vs. Katastrophen
Rust unterscheidet strikt zwischen zwei Arten von Fehlern:
*   **Erwartbare Fehler (Recoverable Errors):** Dinge, die im echten Leben passieren (z. B. Kunde hat nicht genug Geld, Datei fehlt). Hier nutzen wir `Result<T, E>`. Das Programm läuft weiter, wir behandeln den Fehler einfach.
*   **Unerwartbare Katastrophen (Unrecoverable Errors):** Programmierfehler (z. B. Array-Index ungültig, Speicher voll). Hier nutzen wir `panic!`. Das Programm wird sofort beendet, weil ein sicherer Weiterbetrieb nicht garantiert werden kann.

### 🛠️ Der ultimative Spickzettel: Result-Operationen im Detail

Hier sind die wichtigsten Werkzeuge für Fehlerbehandlung an der Kasse mit detaillierten Code-Beispielen:

#### 1. Definieren und Erzeugen
```rust
// Ein Result definieren. Es hat zwei generische Typen: den Erfolgstyp und den Fehlertyp.
// u32 ist der Typ für das Wechselgeld (Erfolg), String ist der Typ für den Fehlertext (Fehler).
fn bezahlen(preis: u32, gegeben: u32) -> Result<u32, String> {
    if gegeben >= preis {
        Ok(gegeben - preis) // Erfolg
    } else {
        Err(String::from("Fehler: Zu wenig Geld eingeworfen!")) // Fehler
    }
}
```

#### 2. Fehlerbehandlung (Pattern Matching)
```rust
// Das komplette Match auf Result. Garantiert, dass der Fehlerfall niemals ignoriert wird.
match bezahlen(50, 100) {
    Ok(wechselgeld) => println!("Kauf abgeschlossen! Wechselgeld: {} Cent", wechselgeld),
    Err(fehler_beschreibung) => println!("Kassier-Abbruch: {}", fehler_beschreibung),
}

// Schneller Zugriff auf den Erfolgsfall mit if let Ok
if let Ok(geld) = bezahlen(50, 100) {
    println!("Wechselgeld erhalten: {} Cent", geld);
}

// Schneller Zugriff auf den Fehlerfall mit if let Err
if let Err(fehler) = bezahlen(50, 20) {
    println!("Kunde abgewiesen wegen: {}", fehler);
}
```

#### 3. Zustand abfragen
```rust
let ergebnis = bezahlen(50, 20);

// Gibt true zurück, wenn das Resultat Ok(T) ist.
let hat_geklappt = ergebnis.is_ok(); // false

// Gibt true zurück, wenn das Resultat Err(E) ist.
let ist_fehlgeschlagen = ergebnis.is_err(); // true
```

#### 4. Standardwerte setzen
```rust
// Falls die Bezahlung fehlschlägt, tun wir so, als ob 0 Cent Wechselgeld zurückkamen.
let wechselgeld_sicher = bezahlen(50, 20).unwrap_or(0);

// Berechnet den Standardwert im Fehlerfall über eine Closure.
// Die Closure erhält den Fehler (hier e) als Argument.
let wechselgeld_lazy = bezahlen(50, 20).unwrap_or_else(|e| {
    println!("Fehler abgefangen und protokolliert: {}", e);
    0 // Fallback-Wert
});
```

#### 5. Werte transformieren
```rust
// .map() transformiert den Erfolgswert (Ok), lässt Fehler aber unverändert.
// Hier: Cent-Betrag in Euro (f64) umrechnen
let wechselgeld_in_euro: Result<f64, String> = bezahlen(50, 100).map(|cent| cent as f64 / 100.0);

// .map_err() transformiert NUR den Fehlerwert, lässt Erfolge aber unverändert.
// Nützlich, um Fehlermeldungen mit Kontext anzureichern.
let fehler_mit_kontext: Result<u32, String> = bezahlen(50, 20).map_err(|e| format!("Kassenstation 1 - {}", e));
```

#### 6. Umwandlung in Option
```rust
// Konvertiert ein Result<T, E> in ein Option<T>.
// Aus Ok(Wert) wird Some(Wert), aus Err(Fehler) wird None. Der Fehlerwert wird verworfen.
let option_wechselgeld: Option<u32> = bezahlen(50, 100).ok();
```

#### 7. Fehlerweiterleitung (Der ? - Operator)
```rust
// Das ? kann an Funktionen gehängt werden, die ein Result liefern.
// Wenn das Resultat Err ist, bricht die aktuelle Funktion sofort ab 
// und gibt diesen Fehler zurück.
fn einkauf_abwickeln() -> Result<String, String> {
    // Falls bezahlen Err zurückgibt, wird die Funktion hier abgebrochen
    let wechselgeld = bezahlen(50, 20)?; 
    Ok(format!("Erfolg! Wechselgeld: {} Cent", wechselgeld))
}
```

### ⚠️ Häufige Stolperfallen mit Result

#### ❌ Falle 1: Fehler ignorieren (Der Compiler schimpft)
Wenn eine Funktion ein `Result` zurückgibt, *musst* du es verwenden. Rust lässt dich den Wert nicht einfach ignorieren, sonst warnt dich der Compiler mit der Meldung `unused Result that must be used`.
```rust
// bezahlen(50, 20); // Warnung: unused `Result` that must be used!
```
**Die Lösung:** Nimm den Wert entgegen, behandle ihn oder markiere ihn bewusst als ignoriert mit `let _ = bezahlen(50, 20);`.

#### ❌ Falle 2: Der `?`-Operator in `main`
Du versuchst, den `?`-Operator in einer Funktion zu nutzen, die kein `Result` zurückgibt (z. B. in einer einfachen `fn main()`).
```rust
/*
fn main() {
    let wechselgeld = bezahlen(50, 20)?; // FEHLER: the `?` operator can only be used in a function that returns `Result` or `Option`
}
*/
```
**Die Lösung:** Behandle den Fehler in `main` mittels `match` oder `if let`, anstatt ihn weiterzuleiten, oder ändere den Rückgabetyp von `main` auf `Result<(), Box<dyn std::error::Error>>`.

### 🔄 Vergleich mit anderen Sprachen (Für Umsteiger)

Die strukturierte Fehlerbehandlung mit `Result` weicht stark vom klassischen Exceptions-Modell ab:

*   **In Python / JavaScript / Java:** Hier werden Fehler über **Exceptions** (Ausnahmen) geworfen und mit **`try-catch`** (bzw. `try-except` in Python) abgefangen.
    *   *Python:*
        ```python
        try:
            wechselgeld = bezahlen(50, 20)
        except ValueError as e:
            print("Fehler:", e)
        ```
    *   *Der Unterschied:* Exceptions sind unsichtbar. Du siehst einer Funktion in Python oder JS an ihrer Signatur nicht an, ob sie abstürzen kann. Rusts `Result` hingegen macht Fehler **explizit zum Teil des Rückgabetyps**. Du wirst vom Compiler gezwungen, das Resultat zu behandeln, was zu extrem robuster Software führt. Zudem sind Exceptions im Laufzeitverhalten oft teuer (Stack-Unwinding). Ein `Result` in Rust ist einfach ein Enum – es ist genauso schnell wie eine normale Rückgabe.

---

## 🛍️ Micro-Learning 5: Die Bonbontüte (Mehrere Rückgabewerte & Debug-Ausgabe)

### 🧸 Die Analogie: Die Papiertüte
Wenn ein Kunde eine Süßigkeit kauft und Wechselgeld bekommt, gibst du ihm nicht beides einzeln mit leeren Händen. Stattdessen packst du beides zusammen in eine kleine Papiertüte. Der Kunde nimmt die Papiertüte entgegen und packt sie zu Hause aus.

In Rust ist diese Papiertüte ein **Tupel**. Damit können wir mehrere Werte gesammelt aus einer Funktion zurückgeben.

### 🔍 Der Speicher-Deep-Dive: Tupel vs. Structs
*   **Tupel** sind unbenannte Sammlungen von Werten. Sie eignen sich perfekt für kurze, einmalige Gruppierungen (z. B. um schnell zwei Werte aus einer Funktion zu werfen). Sie werden auf dem Stack gespeichert, wenn alle ihre Elemente feste Größen haben.
*   **Structs** sind benannte Datentypen. Sie eignen sich für langlebige Strukturen mit klarer Bedeutung (z. B. `Kunde` mit den Feldern `name` und `kontostand`). Sie machen den Code lesbarer, wenn die Anzahl der Felder wächst.

### 🛠️ Der ultimative Spickzettel: Tupel & Ausgabe-Operationen im Detail

Hier sind die wichtigsten Werkzeuge für Tupel und deren Konsolen-Ausgabe:

#### 1. Erstellen von Tupeln
```rust
// Ein Tupel kann verschiedene Typen mischen (hier: String, u32, bool)
let tuete: (String, u32, bool) = (String::from("Saures Bonbon"), 50, true);

// Das leere Tupel (Unit-Typ). Repräsentiert das Fehlen eines Werts.
let leeres_tupel: () = ();
```

#### 2. Tupel auspacken und ansprechen
```rust
// Komplettes Auspacken (Destrukturierung)
let (artikel, preis, vorraetig) = tuete.clone();
println!("Artikel: {}, Preis: {} Cent", artikel, preis);

// Direktzugriff per Index-Punkt. Indizes starten immer bei 0.
let name_der_ware = tuete.0;  // "Saures Bonbon"
let cent_betrag = tuete.1;    // 50
let ist_verfuegbar = tuete.2; // true
```

#### 3. Tupel als Funktions-Rückgabewert
```rust
// Gibt ein Tupel aus Name und Preis zurück
fn einkauf_einpacken() -> (String, u32) {
    let name = String::from("Himbeer-Lolli");
    let preis = 60;
    (name, preis) // Kein Semikolon = Rückgabe!
}
```

#### 4. Die Debug-Ausgabe {:?} und {:#?} (Die Debug-Brille)
Weil komplexe Typen wie Tupel, Vektoren, `Option` und `Result` keine feste Textdarstellung haben, weigert sich Rust, sie mit dem Standard-Platzhalter `{}` auszugeben. Wir müssen die Debug-Brille aufsetzen!

```rust
let test_tupel = (String::from("Kaugummi"), 20);
let test_option = Some(15);
let test_result: Result<u32, &str> = Err("Fehler!");

// Einfaches Debug-Printing (gibt alles auf einer Zeile aus)
println!("Tupel: {:?}", test_tupel);   // Tupel: ("Kaugummi", 20)
println!("Option: {:?}", test_option);  // Option: Some(15)
println!("Result: {:?}", test_result);  // Result: Err("Fehler!")

// Pretty-Print Debugging {:#?} (gibt große Strukturen übersichtlich über mehrere Zeilen aus)
let mut regal = HashMap::new();
regal.insert(String::from("Apfel-Lolli"), 10);
regal.insert(String::from("Zitronen-Bonbon"), 30);
println!("Unser Regal:\n{:#?}", regal);
```

### 🔄 Vergleich mit anderen Sprachen (Für Umsteiger)

Tupel sind eine schnelle Allzweck-Waffe, die in fast allen modernen Sprachen vorhanden ist:

*   **In Python:** Tupel verhalten sich nahezu **identisch**.
    *   *Python:* `tuete = ("Lolli", 50)` -> `ware, geld = tuete` -> `ware = tuete[0]`
    *   *Der Unterschied:* In Python sind Tupel dynamisch typisiert und können veränderbare Objekte enthalten. In Rust sind sie statisch typisiert. Zudem werden Tupel-Elemente in Rust per Punkt-Index (`tuete.0`) statt eckiger Klammern (`tuete[0]`) angesprochen.
*   **In JavaScript:** JavaScript hat standardmäßig **keine echten Tupel**.
    *   *JavaScript:* Man missbraucht meistens Arrays dafür: `const tuete = ["Lolli", 50];` und nutzt Destructuring: `const [ware, geld] = tuete;`
    *   *Der Unterschied:* JS-Arrays sind dynamisch und können beliebig wachsen. Ein Tupel in Rust hat eine **festgeschriebene, unveränderliche Länge**. Wenn du ein `(String, u32)` erstellst, hat es genau 2 Elemente und kann nicht wachsen.
*   **In Java:** Java besitzt **keine eingebauten Tupel**.
    *   *Java:* Entwickler müssen sich oft eigene kleine Klassen (wie `Pair<A, B>` oder `Record`) schreiben, um zwei Werte zurückzugeben.
    *   *Der Unterschied:* Rust bietet Tupel als Grundbaustein direkt an, was die Rückgabe von mehreren Werten aus Hilfsfunktionen extrem elegant und ohne Boilerplate-Code macht.

---

## 🛠️ Mitmach-Workshop: Programmiere deinen Kiosk!

Jetzt bist du dran! Wir bauen ein vollständiges Kiosk-Programm. Keine Angst: Wir verraten dir keine fertigen Codelösungen. Du bist der Architekt und die KI ist dein Bauhelfer.

### 📝 Dein Notizzettel (Das Ziel des Workshops)
Dein Programm soll:
1.  Ein Süßigkeitenregal verwalten.
2.  Preise für jede Süßigkeit speichern.
3.  Eine Warteschlange für Kunden haben.
4.  Eine Kasse haben, die Geld einnimmt und Wechselgeld berechnet.

---

### 🧱 Schritt-für-Schritt-Bauanleitung

#### 🏃 Schritt 1: Die Fehler definieren (Enum)
Zuerst überlegen wir, was in unserem Kiosk alles schiefgehen kann. Erstelle ein **Enum** mit dem Namen `KioskFehler`. Es soll folgende Zustände darstellen können:
*   Die Warteschlange ist leer (kein Kunde da!).
*   Die gewünschte Süßigkeit gibt es gar nicht im Regal.
*   Die Süßigkeit ist ausverkauft (Bestand ist 0).
*   Der Kunde hat nicht genug Geld dabei.

*Tipp:* Nutze `#[derive(Debug, PartialEq)]` über deinem Enum, damit du die Fehler später leicht vergleichen und mit `assert_eq!` prüfen kannst.

#### 🏢 Schritt 2: Das Kiosk-Struct bauen
Erstelle ein **Struct** namens `Kiosk`. Überlege dir, welche Felder es benötigt:
*   Ein Feld für den Namen des Kiosks.
*   Ein Regal für die Bestände (eine `HashMap`, die den Namen der Süßigkeit mit der Anzahl verbindet).
*   Ein Regal für die Preise (eine `HashMap`, die den Namen mit dem Preis in Cent verbindet).
*   Eine Warteschlange (ein `Vec` aus Strings für die Kundennamen).
*   Eine Kasse (ein einfacher Zahlentyp für den Kassenstand in Cent).

#### 🔧 Schritt 3: Die Kiosk-Methoden entwerfen (`impl Kiosk`)
Jetzt hauchen wir dem Kiosk Leben ein. Schreibe folgende Methoden:

1.  **`new(name: String) -> Kiosk`**
    Erstellt einen Kiosk mit leerem Regal, leeren Preisen, leerer Warteschlange und einer Kasse, die bei `0` Cent startet.
2.  **`kunde_anstellen(&mut self, name: String)`**
    Fügt einen neuen Kundennamen hinten an die Warteschlange an.
3.  **`ware_liefern(&mut self, name: String, anzahl: u32, preis: u32)`**
    Legt die Ware ins Regal (erhöhe den Bestand) und trage den Preis in die Preistabelle ein.
4.  **`verkaufen(&mut self, suesigkeit: &str, geld: u32) -> Result<u32, KioskFehler>`**
    Das ist das Herzstück! Gehe logisch vor wie ein echter Kioskbesitzer:
    *   **Kunde holen:** Nimm den ersten Kunden aus der Warteschlange. Wenn die Schlange leer ist, gib `Err(KioskFehler::...)` zurück.
    *   **Preis prüfen:** Schau in deiner Preistabelle nach, wie viel die Süßigkeit kostet. Wenn es sie nicht gibt, gib einen entsprechenden Fehler zurück.
    *   **Bestand prüfen:** Schau im Regal nach. Gibt es die Süßigkeit? Ist noch mindestens eine da? Wenn nicht, gib einen Fehler zurück.
    *   **Geld zählen:** Reicht das übergebene `geld` für den Preis aus? Wenn nein, gib den Fehler für zu wenig Geld zurück.
    *   **Kasse & Regal aktualisieren:** Wenn alles passt:
        *   Ziehe eine Süßigkeit aus dem Regal ab.
        *   Füge den Preis der Süßigkeit zur Kasse hinzu.
        *   Berechne das Wechselgeld (`geld - preis`).
        *   Gib `Ok(wechselgeld)` zurück!

#### 🚦 Schritt 4: Der Testlauf in `main`
Schreibe eine `main`-Funktion und spiele den Ablauf durch:
1.  Erstelle einen Kiosk namens "Magischer Kiosk".
2.  Liefere 5 "Erdbeer-Lollis" für je 50 Cent und 1 "Super-Schokolade" für 150 Cent.
3.  Stelle "Mia", "Leo" und "Noah" in die Warteschlange.
4.  Lass "Mia" einen Lolli für 100 Cent kaufen (Erfolg! Wechselgeld: 50 Cent).
5.  Lass "Leo" versuchen, Schokolade für 100 Cent zu kaufen (Fehler! Zu wenig Geld).
6.  Gib nach jedem Kaufversuch den Status des Kiosks (Kassenbestand, Warteschlange) aus, um zu sehen, ob alles geklappt hat.

---

## 📝 Das große Übungs-Archiv (10 Übungen zum Vertiefen)

Jetzt festigen wir das Gelernte systematisch mit 10 praktischen Aufgaben. Jede Aufgabe enthält ein reales Kiosk-Szenario, eine klare Zielformulierung, eine Übersicht über typische Stolpersteine beim Programmieren, gestaffelte didaktische Tipps, ein mentales Modell mit Pseudocode sowie eine Analyse möglicher Compilerfehler.

Erstelle für diese Übungen eine neue Datei (z. B. `uebungen_phase3.rs`) und versuche, die Vorlagen zum Laufen zu bringen!

---

### 🟢 Übung 1 (Leicht): Die Bonbon-Sortiermaschine (`Vec` & `Option`)

#### 🧸 Das Kiosk-Szenario
Der Lieferant bringt eine unsortierte Holzkiste. Darin befinden sich Süßigkeiten, aber auch jede Menge Staub, alte Verpackungen und Kieselsteine. Wir wollen eine Maschine programmieren, die diese Kiste automatisch sortiert. Nur echte Süßigkeiten ("Lolli", "Kaugummi", "Bonbon") kommen in unsere Auslage.

#### 🎯 Das Ziel
Schreibe eine Funktion `sortiere_kiste(kiste: Vec<String>) -> Option<Vec<String>>`. Sie soll die Kiste filtern.
* Wenn am Ende mindestens eine Süßigkeit gefunden wurde, gibt die Funktion `Some(suesigkeiten)` zurück.
* Wenn die Kiste am Ende gar keine Süßigkeiten enthielt (also nur Staub und Steine), soll sie `None` zurückgeben.

#### ⚠️ Typische Stolpersteine
* **Ownership-Fehler (Wert verschoben):** Wenn du in einer Schleife `for gegenstand in kiste` arbeitest, gehört die Variable `gegenstand` dir. Wenn du sie mit `.push(gegenstand)` in den neuen Vektor schiebst, verlierst du das Ownership. Du darfst danach nicht mehr darauf zugreifen!
* **Rückgabetyp ignorieren:** Der Compiler verlangt eine `Option`. Du kannst nicht einfach `return suesigkeiten;` schreiben. Es muss `Some(suesigkeiten)` sein.

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Erstelle zu Beginn einen leeren, veränderbaren Vektor vom Typ `Vec<String>`.
* *Tipp 2:* Nutze einen einfachen Vergleich `gegenstand == "Lolli" || gegenstand == "Kaugummi" || gegenstand == "Bonbon"`.
* *Tipp 3:* Nutze nach der Schleife eine `if`-Abfrage mit `.is_empty()`, um zu entscheiden, ob du `Some` oder `None` zurückgibst.

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion sortiere_kiste(kiste):
    Erstelle leere Liste 'suesigkeiten'
    Für jeden 'gegenstand' in 'kiste':
        Falls 'gegenstand' gleich "Lolli", "Kaugummi" oder "Bonbon" ist:
            Füge 'gegenstand' an 'suesigkeiten' an
    Falls 'suesigkeiten' leer ist:
        Gib None zurück
    Sonst:
        Gib Some(suesigkeiten) zurück
```

#### 🔍 Compiler-Fehlermeldungen verstehen
Wenn du folgendes schreibst:
```rust
// error[E0308]: mismatched types
// expected enum `Option<Vec<String>>`
// found struct `Vec<String>`
```
*Was bedeutet das?* Du hast vergessen, den Vektor in eine `Option` einzupacken. Korrigiere dies, indem du `Some(suesigkeiten)` zurückgibst!

```rust
fn sortiere_kiste(kiste: Vec<String>) -> Option<Vec<String>> {
    let mut suesigkeiten = Vec::new();
    
    for gegenstand in kiste {
        // TODO: Implementiere die Filterlogik und füge Süßigkeiten dem Vektor hinzu.
        // Kriterium: "Lolli", "Kaugummi" oder "Bonbon".
        todo!()
    }
    
    // TODO: Rückgabewert implementieren (Some oder None)
    todo!()
}

fn main() {
    let test_kiste = vec![
        String::from("Lolli"),
        String::from("Staub"),
        String::from("Kaugummi"),
        String::from("Kieselstein"),
    ];
    
    let ergebnis = sortiere_kiste(test_kiste);
    assert!(ergebnis.is_some());
    let liste = ergebnis.unwrap();
    assert_eq!(liste.len(), 2);
    assert_eq!(liste[0], "Lolli");
    assert_eq!(liste[1], "Kaugummi");
    
    let leere_kiste = vec![String::from("Staub"), String::from("Socke")];
    assert!(sortiere_kiste(leere_kiste).is_none());
    
    println!("🎉 Übung 1 erfolgreich gelöst!");
}
```

---

### 🟢 Übung 2 (Leicht): Der Kiosk-Eröffnungs-Check (`Option` & `.unwrap_or`)

#### 🧸 Das Kiosk-Szenario
Wir erstellen ein Online-Formular zur Kiosk-Registrierung. Viele Kioskbesitzer geben keinen Wunschnamen an. Da wir aber auf der Webseite nicht "Kiosk: None" stehen haben wollen, vergeben wir automatisch den Standardnamen "Mein Dorfkiosk", wenn kein Name eingetragen wurde.

#### 🎯 Das Ziel
Schreibe eine Funktion `hole_kiosk_name(eingabe: Option<String>) -> String`. Sie soll den Namen auspacken oder eben den Standardnamen zurückliefern.

#### ⚠️ Typische Stolpersteine
* **Mismatched Types:** `.unwrap_or()` verlangt genau den Typ, der in der Option verpackt ist (also `String`). Du darfst kein einfaches Textliteral `"Mein Dorfkiosk"` hineinwerfen, da dies vom Typ `&str` ist.

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Wandle das Literal `"Mein Dorfkiosk"` mit `String::from()` um.
* *Tipp 2:* Du musst kein `match` schreiben. Rufe `.unwrap_or(...)` direkt auf der `eingabe` auf.
* *Tipp 3:* Stelle sicher, dass die Funktion den resultierenden `String` direkt zurückgibt (ohne Semikolon am Zeilenende).

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion hole_kiosk_name(eingabe):
    Gib aus: Inhalt von 'eingabe' ODER den Standard-String "Mein Dorfkiosk"
```

#### 🔍 Compiler-Fehlermeldungen verstehen
```rust
// error[E0308]: mismatched types
// expected struct `String`, found `&str`
```
*Was bedeutet das?* Du hast versucht, `.unwrap_or("Mein Dorfkiosk")` zu schreiben. Rust erzwingt, dass beide Seiten denselben Typ haben. Schreibe stattdessen `.unwrap_or(String::from("Mein Dorfkiosk"))`.

```rust
fn hole_kiosk_name(eingabe: Option<String>) -> String {
    // TODO: Verwende .unwrap_or(), um bei None den Namen "Mein Dorfkiosk" zurückzugeben.
    todo!()
}

fn main() {
    assert_eq!(hole_kiosk_name(Some(String::from("Zuckerparadies"))), "Zuckerparadies");
    assert_eq!(hole_kiosk_name(None), "Mein Dorfkiosk");
    println!("🎉 Übung 2 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 3 (Mittel): Der Kiosksuche-Wächter (`HashMap` & `Option`)

#### 🧸 Das Kiosk-Szenario
Ein Kind kommt in den Laden und fragt: "Haben Sie Zitronen-Lollis und wie viele?" Der Ladenbesitzer schaut zuerst in der Preisliste nach, ob die Sorte überhaupt geführt wird (Sortimentsprüfung). Falls ja, schaut er im Regal (Bestandstabelle) nach, wie viele Gläser noch da sind.

#### 🎯 Das Ziel
Schreibe eine Funktion `bestand_pruefen(preise, bestand, gesuchter_artikel) -> Option<u32>`.
* Wenn der Artikel nicht in den Preisen existiert, gib `None` zurück (führen wir nicht!).
* Wenn der Artikel in den Preisen existiert, gib `Some(menge)` zurück (auch wenn die Menge im Regal `0` ist!).

#### ⚠️ Typische Stolpersteine
* **Die Referenzfalle:** Die HashMap-Methode `.get()` liefert immer eine Referenz auf den Wert zurück (also `&u32` statt `u32`). Du musst diesen Wert mit dem Dereferenzierungs-Operator `*` auspacken!
* **Die Standardwert-Falle:** Ein Artikel kann in der Preisliste stehen, aber noch keinen Eintrag in der Bestands-HashMap haben (weil er komplett ausverkauft ist). In diesem Fall soll die Funktion `Some(0)` zurückgeben.

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Nutze `preise.contains_key(gesuchter_artikel)`, um die Sortimentsprüfung durchzuführen.
* *Tipp 2:* Wenn die Prüfung erfolgreich war, hole den Bestand mit `bestand.get(gesuchter_artikel)`.
* *Tipp 3:* Wende `.unwrap_or(&0)` auf den erhaltenen optionalen Bestand an und dereferenziere ihn mit `*`.

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion bestand_pruefen(preise, bestand, gesuchter_artikel):
    Falls 'gesuchter_artikel' nicht in 'preise' enthalten ist:
        Gib None zurück
    Sonst:
        Hole 'menge_ref' aus 'bestand' für 'gesuchter_artikel'
        Falls 'menge_ref' existiert:
            Gib Some(*menge_ref) zurück
        Sonst:
            Gib Some(0) zurück
```

#### 🔍 Compiler-Fehlermeldungen verstehen
```rust
// error[E0308]: mismatched types
// expected enum `Option<u32>`
// found enum `Option<&u32>`
```
*Was bedeutet das?* Du hast vergessen, die Referenz aus der HashMap zu dereferenzieren. Nutze `*`, um an den echten `u32`-Wert zu gelangen!

```rust
use std::collections::HashMap;

fn bestand_pruefen(
    preise: &HashMap<String, u32>,
    bestand: &HashMap<String, u32>,
    gesuchter_artikel: &str
) -> Option<u32> {
    // TODO: Implementiere die Abfragelogik
    todo!()
}

fn main() {
    let mut preise = HashMap::new();
    preise.insert(String::from("Lolli"), 50);
    preise.insert(String::from("Kaugummi"), 20);

    let mut bestand = HashMap::new();
    bestand.insert(String::from("Lolli"), 10);

    // Lolli ist da
    assert_eq!(bestand_pruefen(&preise, &bestand, "Lolli"), Some(10));
    // Kaugummi ist im Sortiment, aber ausverkauft (0)
    assert_eq!(bestand_pruefen(&preise, &bestand, "Kaugummi"), Some(0));
    // Gummibaerchen gibt es gar nicht im Sortiment
    assert_eq!(bestand_pruefen(&preise, &bestand, "Gummibaerchen"), None);

    println!("🎉 Übung 3 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 4 (Mittel): Die Tagesabrechnung (`Result` & Eigene Enums)

#### 🧸 Das Kiosk-Szenario
Am Abend zählt Herr Rustig die Kasse. Das Programm sagt, es müssten 10,00 Euro in der Kasse sein (`soll_kasse`). Die Zählung ergibt jedoch einen anderen Wert (`ist_kasse`). Wir wollen ein Fehlersystem schreiben, das Fehlbeträge und Überschüsse präzise erfasst und ausgibt.

#### 🎯 Das Ziel
Schreibe eine Funktion `tagesabschluss(soll_kasse: u32, ist_kasse: u32) -> Result<u32, AbrechnungsFehler>`.
* Wenn die Kasse stimmt, gib `Ok(ist_kasse)` zurück.
* Wenn Geld fehlt, gib `Err(AbrechnungsFehler::Fehlbetrag(differenz))` zurück.
* Wenn zu viel Geld da ist, gib `Err(AbrechnungsFehler::Ueberschuss(differenz))` zurück.

#### ⚠️ Typische Stolpersteine
* **Unterlauf-Gefahr:** Da wir `u32` (Zahlen ohne Vorzeichen) nutzen, stürzt das Programm ab, wenn wir `ist_kasse - soll_kasse` rechnen und `ist_kasse` kleiner ist. Berechne die Differenz immer so, dass die größere Zahl vorne steht!

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Vergleiche die Kassenstände mit `>` oder `<` oder `==`.
* *Tipp 2:* Rechne bei einem Fehlbetrag `soll_kasse - ist_kasse`.
* *Tipp 3:* Rechne bei einem Überschuss `ist_kasse - soll_kasse`.

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion tagesabschluss(soll_kasse, ist_kasse):
    Falls ist_kasse gleich soll_kasse:
        Gib Ok(ist_kasse) zurück
    Falls ist_kasse kleiner als soll_kasse:
        differenz = soll_kasse - ist_kasse
        Gib Err(Fehlbetrag(differenz)) zurück
    Sonst:
        differenz = ist_kasse - soll_kasse
        Gib Err(Ueberschuss(differenz)) zurück
```

```rust
#[derive(Debug, PartialEq)]
enum AbrechnungsFehler {
    Fehlbetrag(u32), // Wie viel Geld fehlt?
    Ueberschuss(u32), // Wie viel Geld ist zu viel?
}

fn tagesabschluss(soll_kasse: u32, ist_kasse: u32) -> Result<u32, AbrechnungsFehler> {
    // TODO: Implementiere den Kassenabgleich
    todo!()
}

fn main() {
    // Kasse stimmt genau
    assert_eq!(tagesabschluss(1000, 1000), Ok(1000));
    
    // Es fehlen 200 Cent
    assert_eq!(tagesabschluss(1000, 800), Err(AbrechnungsFehler::Fehlbetrag(200)));
    
    // Es sind 150 Cent zu viel
    assert_eq!(tagesabschluss(1000, 1150), Err(AbrechnungsFehler::Ueberschuss(150)));

    println!("🎉 Übung 4 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 5 (Mittel): Rabatt-Aktion kalkulieren (`Option` & `.map`)

#### 🧸 Das Kiosk-Szenario
Um Platz für neue Lollis zu schaffen, gibt der Kiosk heute 20% Rabatt. Wir wollen ein System schreiben, das einen optionalen Preis nimmt (da manche Sorten keinen Preis hinterlegt haben) und den Rabattpreis ermittelt.

#### 🎯 Das Ziel
Schreibe eine Funktion `rabatt_berechnen(preis_opt: Option<u32>) -> Option<u32>`. Verwende dazu ausschließlich die Methode `.map()`.

#### ⚠️ Typische Stolpersteine
* **Manuelles Pattern Matching:** Du sollst hier *kein* `match` oder `if let` nutzen! Die Aufgabe verlangt die elegante, funktionale Methode `.map()`.

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Rufe `.map()` auf der Variable `preis_opt` auf.
* *Tipp 2:* Die Formel für 20% Rabatt auf Ganzzahlen lautet: `preis * 80 / 100`.
* *Tipp 3:* Schreibe die Closure in der Form `|p| p * 80 / 100`.

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion rabatt_berechnen(preis_opt):
    Wende auf 'preis_opt' die Transformation an:
        Nimm den Preis und multipliziere ihn mit 80, teile dann durch 100
```

```rust
fn rabatt_berechnen(preis_opt: Option<u32>) -> Option<u32> {
    // TODO: Benutze .map(), um den Preis um 20% zu reduzieren (preis * 80 / 100).
    todo!()
}

fn main() {
    assert_eq!(rabatt_berechnen(Some(100)), Some(80));
    assert_eq!(rabatt_berechnen(Some(50)), Some(40));
    assert_eq!(rabatt_berechnen(None), None);
    println!("🎉 Übung 5 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 6 (Mittel): Münzen-Einwurf-Zähler (`Result` & `unwrap_or_else`)

#### 🧸 Das Kiosk-Szenario
Ein moderner Münzprüfer wirft beim Zählen manchmal Fehler aus (z. B. wenn eine Münze verkantet ist). Bei einem Lesefehler soll das System nicht abstürzen. Stattdessen soll eine Fehlermeldung ausgegeben werden, und der Automat bucht als Trost für den Kunden eine Standardkraft von 5 Cent ein.

#### 🎯 Das Ziel
Schreibe eine Funktion `muenze_auswerten(ergebnis: Result<u32, String>) -> u32`. Verwende `.unwrap_or_else()`, um im Fehlerfall eine Log-Meldung auszugeben und die Zahl `5` zurückzugeben.

#### ⚠️ Typische Stolpersteine
* **Closure-Parameter vergessen:** `.unwrap_or_else` verlangt eine Closure, die das Fehlerobjekt (hier den `String`) als Parameter entgegennimmt. Du musst also `|fehler| ...` schreiben, nicht `|| ...`.

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Nutze `.unwrap_or_else(|e| { ... })`.
* *Tipp 2:* Gib die Fehlermeldung `e` mit `println!` aus.
* *Tipp 3:* Der letzte Ausdruck in der Closure muss `5` lauten (ohne Semikolon).

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion muenze_auswerten(ergebnis):
    Falls ergebnis erfolgreich (Ok) ist:
        Gib den Wert zurück
    Falls ergebnis fehlerhaft (Err) ist:
        Drucke den Fehler auf dem Bildschirm
        Gib 5 zurück
```

```rust
fn muenze_auswerten(ergebnis: Result<u32, String>) -> u32 {
    // TODO: Verwende .unwrap_or_else(), um im Fehlerfall eine Fehlermeldung auszugeben 
    // und den Standardwert 5 zurückzugeben.
    todo!()
}

fn main() {
    assert_eq!(muenze_auswerten(Ok(50)), 50);
    assert_eq!(muenze_auswerten(Err(String::from("Münze klemmt"))), 5);
    println!("🎉 Übung 6 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 7 (Mittel): Regalfächer sortieren (`Vec` & `HashMap` & Sortierung)

#### 🧸 Das Kiosk-Szenario
Herr Rustig will eine Liste aller Süßigkeiten ausdrucken. Um die Übersicht zu behalten, soll diese Liste alphabetisch von A bis Z sortiert sein.

#### 🎯 Das Ziel
Schreibe eine Funktion `hole_sortierte_sorten(regal: &HashMap<String, u32>) -> Vec<String>`. Sie soll alle Schlüssel der HashMap extrahieren, sortieren und zurückgeben.

#### ⚠️ Typische Stolpersteine
* **Die Referenz-Verschiebung:** Die Schlüssel der HashMap gehören der HashMap. Wenn du über `regal.keys()` iterierst, erhältst du Referenzen (`&String`). Du musst sie mit `.clone()` duplizieren, um einen eigenständigen `Vec<String>` zurückgeben zu können.
* **Sortier-Reihenfolge:** Die Methode `.sort()` arbeitet direkt auf dem Vektor und verändert ihn an Ort und Stelle (in-place). Sie gibt keinen Wert zurück.

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Erstelle einen veränderbaren Vektor: `let mut sortiert = Vec::new();`.
* *Tipp 2:* Iteriere über `regal.keys()` und füge die Klone mit `.push(key.clone())` hinzu.
* *Tipp 3:* Rufe `sortiert.sort();` auf und gib `sortiert` zurück.

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion hole_sortierte_sorten(regal):
    Erstelle leere Liste 'liste'
    Für jeden 'schluessel' in 'regal':
        Kopiere 'schluessel' und füge ihn an 'liste' an
    Sortiere 'liste' alphabetisch
    Gib 'liste' zurück
```

```rust
use std::collections::HashMap;

fn hole_sortierte_sorten(regal: &HashMap<String, u32>) -> Vec<String> {
    // TODO:
    // 1. Erstelle einen leeren Vektor.
    // 2. Kopiere alle Schlüssel der HashMap in den Vektor.
    // 3. Nutze die Vektormethode .sort() zum alphabetischen Sortieren.
    // 4. Gib den sortierten Vektor zurück.
    todo!()
}

fn main() {
    let mut regal = HashMap::new();
    regal.insert(String::from("Zitronen-Bonbon"), 10);
    regal.insert(String::from("Apfel-Lolli"), 5);
    regal.insert(String::from("Cola-Kracher"), 20);

    let sortiert = hole_sortierte_sorten(&regal);
    assert_eq!(sortiert.len(), 3);
    assert_eq!(sortiert[0], "Apfel-Lolli");
    assert_eq!(sortiert[1], "Cola-Kracher");
    assert_eq!(sortiert[2], "Zitronen-Bonbon");

    println!("🎉 Übung 7 erfolgreich gelöst!");
}
```

---

### 🔴 Übung 8 (Schwer): Das transaktionssichere Liefer-System (`Vec`, `HashMap`, `Result` & `?`)

#### 🧸 Das Kiosk-Szenario
Ein Lieferant bringt eine Kiste mit Waren. Die Sorten müssen bereits in der Preisliste des Kiosks eingetragen sein (wir nehmen keine unbepreisten Exoten an). Falls auch nur eine einzige gelieferte Sorte nicht in der Preisliste existiert, verweigern wir die **gesamte Annahme** der Lieferung, um Datenchaos zu vermeiden.

#### 🎯 Das Ziel
Schreibe eine Funktion `lieferung_verarbeiten(bestand, preise, lieferung)`.
* Wenn alle gelieferten Artikel in `preise` existieren, buche die Mengen in den `bestand` ein und gib `Ok(())` zurück.
* Wenn ein Artikel fehlt, buche gar nichts ein und gib `Err(LieferFehler::ArtikelNichtImSortiment(Name))` zurück.

#### ⚠️ Typische Stolpersteine
* **Das unvollständige Buchen:** Wenn du die Bestände direkt beim Durchgehen der Schleife erhöhst und im dritten Element auf einen Fehler stößt, hast du die ersten beiden Elemente bereits eingebucht. Das bricht die Anforderung der Transaktionssicherheit!
* **Die Entry-API:** Nutze `.entry().or_insert()` zum Einbuchen, um Codezeilen zu sparen.

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Führe zuerst eine komplette Schleife über die `lieferung` durch, die nur prüft, ob `preise.contains_key(&artikel)` wahr ist. Falls nicht, brich sofort mit `return Err(...)` ab.
* *Tipp 2:* Nutze erst nach dieser Schleife eine zweite Schleife, um die Bestände tatsächlich zu aktualisieren.
* *Tipp 3:* Gib am Ende `Ok(())` zurück.

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion lieferung_verarbeiten(bestand, preise, lieferung):
    // Phase 1: Prüfung
    Für jedes (artikel, menge) in 'lieferung':
        Falls 'artikel' nicht in 'preise' enthalten ist:
            Gib Err(ArtikelNichtImSortiment(artikel)) zurück
            
    // Phase 2: Buchung
    Für jedes (artikel, menge) in 'lieferung':
        Bestand von 'artikel' um 'menge' erhöhen
    Gib Ok(()) zurück
```

```rust
use std::collections::HashMap;

#[derive(Debug, PartialEq)]
enum LieferFehler {
    ArtikelNichtImSortiment(String),
}

fn lieferung_verarbeiten(
    bestand: &mut HashMap<String, u32>,
    preise: &HashMap<String, u32>,
    lieferung: Vec<(String, u32)>
) -> Result<(), LieferFehler> {
    // TODO: Implementiere die Logik
    todo!()
}

fn main() {
    let mut bestand = HashMap::new();
    bestand.insert(String::from("Lolli"), 10);

    let mut preise = HashMap::new();
    preise.insert(String::from("Lolli"), 50);
    preise.insert(String::from("Kaugummi"), 20);

    // Diese Lieferung klappt, da Lolli im Sortiment ist
    let lieferung_1 = vec![(String::from("Lolli"), 10)];
    assert!(lieferung_verarbeiten(&mut bestand, &preise, lieferung_1).is_ok());
    assert_eq!(*bestand.get("Lolli").unwrap(), 20);

    // Diese Lieferung schlägt fehl, da Schokolade nicht im Sortiment (nicht in preise) ist
    let lieferung_2 = vec![
        (String::from("Lolli"), 5),
        (String::from("Schokolade"), 10)
    ];
    let ergebnis = lieferung_verarbeiten(&mut bestand, &preise, lieferung_2);
    assert_eq!(ergebnis, Err(LieferFehler::ArtikelNichtImSortiment(String::from("Schokolade"))));
    
    // Wichtig: Der Lolli-Bestand darf sich bei der fehlerhaften Lieferung NICHT auf 25 erhöht haben!
    assert_eq!(*bestand.get("Lolli").unwrap(), 20);

    println!("🎉 Übung 8 erfolgreich gelöst!");
}
```

---

### 🔴 Übung 9 (Schwer): Der automatische Einkaufszettel (`Vec`, `HashMap`, `Option` & Tupel)

#### 🧸 Das Kiosk-Szenario
Um niemals vor leeren Regalen zu stehen, führt Herr Rustig jeden Samstagabend eine Bestandsprüfung durch. Er will einen automatischen Einkaufszettel drucken lassen. Jedes Produkt, dessen Bestand unter 5 Stück liegt, soll nachbestellt werden, und zwar genau so viel, dass der Zielbestand von 20 Stück wieder erreicht wird.

#### 🎯 Das Ziel
Schreibe eine Funktion `einkaufszettel_erstellen(bestand: &HashMap<String, u32>) -> Vec<(String, u32)>`. Sie soll eine Liste von Tupeln zurückgeben, die den Artikelnamen und die zu bestellende Menge enthält.

#### ⚠️ Typische Stolpersteine
* **Referenzen im Tupel:** Da die HashMap-Keys als `&String` übergeben werden, musst du sie klonen, um einen Vektor mit echten `String`s aufzubauen.
* **Zielmenge berechnen:** Die Bestellmenge berechnet sich aus `20 - aktueller_bestand`.

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Iteriere über die HashMap mit `for (name, menge) in bestand`.
* *Tipp 2:* Prüfe `if *menge < 5`.
* *Tipp 3:* Berechne `20 - *menge` und füge das Tupel `(name.clone(), differenz)` an.

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion einkaufszettel_erstellen(bestand):
    Erstelle leere Liste 'zettel'
    Für jedes (artikel_name, menge) in 'bestand':
        Falls menge < 5:
            differenz = 20 - menge
            Füge (artikel_name, differenz) an 'zettel' an
    Gib 'zettel' zurück
```

```rust
use std::collections::HashMap;

fn einkaufszettel_erstellen(bestand: &HashMap<String, u32>) -> Vec<(String, u32)> {
    // TODO: Implementiere die Einkaufszettel-Erstellung
    todo!()
}

fn main() {
    let mut bestand = HashMap::new();
    bestand.insert(String::from("Lolli"), 3);       // Unter 5, nachbestellen! (20 - 3 = 17)
    bestand.insert(String::from("Kaugummi"), 12);   // Genug da
    bestand.insert(String::from("Schokolade"), 0);  // Unter 5, nachbestellen! (20 - 0 = 20)

    let zettel = einkaufszettel_erstellen(&bestand);
    assert_eq!(zettel.len(), 2);
    
    // Da HashMaps unsortiert sind, müssen wir flexibel prüfen
    let lolli_bestellung = zettel.iter().find(|(name, _)| name == "Lolli");
    let schoko_bestellung = zettel.iter().find(|(name, _)| name == "Schokolade");

    assert!(lolli_bestellung.is_some());
    assert_eq!(lolli_bestellung.unwrap().1, 17);

    assert!(schoko_bestellung.is_some());
    assert_eq!(schoko_bestellung.unwrap().1, 20);

    println!("🎉 Übung 9 erfolgreich gelöst!");
}
```

---

### 💀 Übung 10 (Sehr Schwer): Die transaktionssichere Großbestellung (`Vec`, `HashMap`, `Result` & `?` & Rollback)

#### 🧸 Das Kiosk-Szenario
Die örtliche Grundschule bestellt eine Liste von Süßigkeiten für das Schulfest. Die Bestellung wird als Liste von Tupeln `Vec<(String, u32)>` übergeben. Wenn auch nur ein einziger Artikel der Bestellung nicht im Sortiment ist oder die gewünschte Menge den Kioskbestand übersteigt, soll die **gesamte Bestellung storniert** werden. Es darf kein einziger Lolli das Regal verlassen haben!

#### 🎯 Das Ziel
Schreibe eine Funktion `bestellung_ausfuehren(bestand, bestellliste) -> Result<(), BestellFehler>`.
* Wenn die Bestellung komplett lieferbar ist, passe alle Bestände in der `bestand`-HashMap an und gib `Ok(())` zurück.
* Wenn ein Artikel fehlt oder zu wenig vorhanden ist, ändere *nichts* am Bestand und gib einen entsprechenden `BestellFehler` zurück.

#### ⚠️ Typische Stolpersteine
* **Veränderbarkeit während der Schleife:** Wenn du direkt im Originalbestand buchst und erst beim vierten Artikel scheiterst, hast du die ersten drei Artikel bereits abgezogen. Diesen unvollständigen Zustand zu heilen, ist mühsam.
* **Die Klon-Strategie:** Der einfachste Weg, Transaktionssicherheit (Rollback) in Rust zu implementieren, ist das Arbeiten auf einer temporären Kopie (`.clone()`) der Datenstruktur. Nur bei absolutem Erfolg wird die Kopie in das Original zurückkopiert!

#### 💡 Didaktische Wächter (Gestaffelte Tipps)
* *Tipp 1:* Klone die `bestand`-HashMap zu Beginn der Funktion: `let mut temporaerer_bestand = bestand.clone();`.
* *Tipp 2:* Iteriere über die `bestellliste` und führe alle Prüfungen und Abzüge auf `temporaerer_bestand` durch.
* *Tipp 3:* Wenn die Schleife ohne Fehler durchläuft, weise dem Originalbestand den temporären Bestand zu (`*bestand = temporaerer_bestand;`) und liefere `Ok(())`.

#### 🧠 Das mentale Modell (Pseudocode)
```text
Funktion bestellung_ausfuehren(bestand, bestellliste):
    Erstelle Kopie 'temp_bestand' von 'bestand'
    Für jedes (artikel, menge_gesucht) in 'bestellliste':
        Hole 'bestand_vorhanden' aus 'temp_bestand'
        Falls 'artikel' nicht existiert:
            Gib Err(ArtikelNichtImSortiment) zurück
        Falls 'bestand_vorhanden' < 'menge_gesucht':
            Gib Err(ZuWenigBestand) zurück
        Zieh 'menge_gesucht' von 'temp_bestand' ab
    // Wenn wir hier angekommen sind, war alles erfolgreich!
    Ersetze 'bestand' durch 'temp_bestand'
    Gib Ok(()) zurück
```

#### 🔍 Compiler-Fehlermeldungen verstehen
```rust
// error[E0507]: cannot move out of `*bestand` which is behind a mutable reference
```
*Was bedeutet das?* Du versuchst, den Originalbestand zu verschieben. Nutze `.clone()`, um eine eigenständige Kopie zu erstellen, statt die Referenz direkt zu manipulieren.

```rust
use std::collections::HashMap;

#[derive(Debug, PartialEq)]
enum BestellFehler {
    ArtikelNichtImSortiment(String),
    ZuWenigBestand { artikel: String, vorhanden: u32, gesucht: u32 },
}

fn bestellung_ausfuehren(
    bestand: &mut HashMap<String, u32>,
    bestellliste: Vec<(String, u32)>
) -> Result<(), BestellFehler> {
    // TODO: Implementiere die sichere Bestelllogik.
    todo!()
}

fn main() {
    let mut bestand = HashMap::new();
    bestand.insert(String::from("Lolli"), 10);
    bestand.insert(String::from("Kaugummi"), 5);

    // Diese Bestellung sollte klappen
    let bestellung_1 = vec![
        (String::from("Lolli"), 3),
        (String::from("Kaugummi"), 2),
    ];
    assert!(bestellung_ausfuehren(&mut bestand, bestellung_1).is_ok());
    assert_eq!(*bestand.get("Lolli").unwrap(), 7); // Noch 7 da
    assert_eq!(*bestand.get("Kaugummi").unwrap(), 3); // Noch 3 da

    // Diese Bestellung schlägt fehl, da Schokolade fehlt
    let bestellung_2 = vec![
        (String::from("Lolli"), 2),
        (String::from("Schokolade"), 1),
    ];
    let ergebnis_2 = bestellung_ausfuehren(&mut bestand, bestellung_2);
    assert_eq!(
        ergebnis_2,
        Err(BestellFehler::ArtikelNichtImSortiment(String::from("Schokolade")))
    );
    // WICHTIG: Die 2 Lollis dürfen NICHT abgezogen worden sein,
    // da die Gesamtbestellung gescheitert ist!
    assert_eq!(*bestand.get("Lolli").unwrap(), 7); 

    // Diese Bestellung schlägt fehl, da zu wenig Kaugummis da sind
    let bestellung_3 = vec![
        (String::from("Kaugummi"), 5), // Wir haben aber nur 3!
    ];
    let ergebnis_3 = bestellung_ausfuehren(&mut bestand, bestellung_3);
    assert_eq!(
        ergebnis_3,
        Err(BestellFehler::ZuWenigBestand {
            artikel: String::from("Kaugummi"),
            vorhanden: 3,
            gesucht: 5
        })
    );
    // Bestand muss unverändert bei 3 sein!
    assert_eq!(*bestand.get("Kaugummi").unwrap(), 3); 

    println!("🎉 Übung 10 erfolgreich gelöst!");
}
```

---

## 🛠️ Praxis-Guide: Echte Kiosk-Szenarien programmieren (Architektur & Entwurfsmuster in Rust)

Wenn wir größere Anwendungen in Rust schreiben (wie unseren Kiosk-Simulator), reichen reine Sprachgrundlagen oft nicht aus. Wir müssen wissen, wie wir den Code so strukturieren, dass er lesbar, erweiterbar und absolut sicher gegen Fehler bleibt. In diesem Leitfaden betrachten wir die wichtigsten Entwurfsmuster und Architekturkonzepte, die speziell in Phase 3 eine Rolle spielen.

---

### 1. Kapselung und State-Management (Zustands-Verwaltung)

In objektorientierten Sprachen neigt man dazu, Felder von Objekten direkt veränderbar zu machen. In Rust führt das schnell zu Konflikten mit dem Borrow Checker. Daher trennen wir Daten und Logik streng.

#### Das Prinzip des privaten Zustands
Ein guter Kiosk erlaubt es Kunden nicht, direkt ins Süßigkeitenregal zu greifen oder Geld aus der Kasse zu nehmen. Alles läuft über den Kioskbesitzer (die Methoden des Structs). In Rust setzen wir das mit Sichtbarkeitsmodifikatoren (`pub`) um.

```rust
// In einer echten Bibliotheksdatei (z.B. kiosk.rs)
pub struct Kiosk {
    name: String,                  // Privat! Niemand außerhalb darf den Namen ändern
    regal: HashMap<String, u32>,   // Privat! Direkter Zugriff verboten
    kasse: u32,                    // Privat! Nur der Kiosk darf Geld einnehmen
}

impl Kiosk {
    // Konstruktor zum sicheren Erstellen
    pub fn new(name: String) -> Self {
        Kiosk {
            name,
            regal: HashMap::new(),
            kasse: 0,
        }
    }

    // Ein "Getter" erlaubt das sichere Lesen des Kassenstands, verhindert aber das Ändern!
    pub fn kassenstand(&self) -> u32 {
        self.kasse
    }
    
    // Nur diese Methode darf den Kassenstand verändern
    pub fn geld_einnehmen(&mut self, betrag: u32) {
        self.kasse += betrag;
    }
}
```

#### Warum machen wir das?
*   **Daten-Konsistenz (Invarianten):** Wir können in `geld_einnehmen` prüfen, ob der Betrag gültig ist (z. B. nicht 0). Wenn das Feld `kasse` öffentlich (`pub`) wäre, könnte jeder beliebige Code von außen `kiosk.kasse = 0` schreiben und unsere Kassenabrechnung ruinieren.
*   **Refactoring-Freundlichkeit:** Wenn wir uns später entscheiden, die Kasse nicht als `u32` (Cent), sondern als `f64` (Euro) zu speichern, müssen wir nur die internen Methoden anpassen. Der Code außerhalb des Structs, der `.kassenstand()` aufruft, bleibt unverändert!

---

### 2. Das Rollback-Pattern (Transaktionssicherheit)

In Übung 10 sind wir auf das Problem gestoßen, dass eine Bestellung nur dann ausgeführt werden darf, wenn *alle* Artikel vorhanden sind. Schlägt ein einziger Artikel fehl, müssen alle bisherigen Änderungen rückgängig gemacht werden.

#### Die drei Strategien für Transaktionen

##### Strategie A: Die Vorab-Prüfung (Look-Ahead)
Wir durchlaufen die Bestellliste zweimal. Die erste Schleife prüft nur die Machbarkeit. Die zweite Schleife führt die Änderungen aus.

```text
Schritt 1: Prüfen ───> Sind alle Lollis da? ───> Ja!
Schritt 2: Prüfen ───> Ist Schokolade da? ───> Nein! ───> ABBRUCH (Keine Buchung)
```

*   **Vorteil:** Schnell und speicherschonend, da keine Kopien angelegt werden.
*   **Nachteil:** Der Code wird doppelt geschrieben. Wenn sich die Buchungslogik ändert, muss oft auch die Prüflogik angepasst werden.

##### Strategie B: Das State-Cloning (Kopie bei Buchung)
Wir klonen den gesamten Zustand, führen alle Buchungen auf der Kopie aus und kopieren die Kopie bei Erfolg zurück ins Original.

```text
Original: [10 Lollis] 
  │
  ├── Klone ──> Kopie: [10 Lollis] ──> Ziehe 3 ab ──> Kopie: [7 Lollis] (Erfolg!)
  │                                                            │
  └── Überschreibe Original mit Kopie <────────────────────────┘
```

*   **Vorteil:** Extrem einfach zu programmieren und absolut sicher.
*   **Nachteil:** Verbraucht mehr Speicher und CPU-Zeit, da die gesamte Datenstruktur geklont wird. Bei Kiosk-Größen (einige hundert Artikel) ist das vernachlässigbar, bei Millionen von Datensätzen jedoch ein Problem.

##### Strategie C: Das In-Place-Rollback (Rückgängig-Schleife)
Wir buchen direkt im Original. Tritt ein Fehler auf, durchlaufen wir eine Liste der bereits getätigten Buchungen in umgekehrter Reihenfolge und buchen sie wieder zurück.
*   **Vorteil:** Speichereffizient und flexibel.
*   **Nachteil:** Extrem kompliziert zu programmieren. Wenn das Zurückbuchen selbst fehlschlägt, befindet sich das System in einem undefinierten Zustand.

#### Rust-Empfehlung
Nutze für Phase 3 immer **Strategie B** (State-Cloning). Rusts `.clone()`-Methode macht dies extrem einfach und lesbar. Sie zeigt die Stärke von Rusts Ownership-Modell: Wir können Daten kopieren, manipulieren und bei Erfolg einfach die alte Struktur verwerfen.

---

### 3. Fortgeschrittene Fehlerbehandlung mit Enums

Ein einfacher Fehlertext (`String`) reicht in professionellen Anwendungen selten aus. Der Aufrufer einer Funktion muss wissen, *warum* eine Aktion fehlgeschlagen ist, um programmgesteuert darauf reagieren zu können (z. B. dem Benutzer eine spezifische Meldung anzuzeigen oder eine Alternativroute zu wählen).

#### Fehler mit Daten-Payload
Rust-Enums können Daten tragen. Das nutzen wir für informative Fehlerklassen:

```rust
#[derive(Debug, PartialEq)]
pub enum BestellFehler {
    ArtikelNichtImSortiment(String), // Trägt den Namen des fehlenden Artikels
    ZuWenigBestand { 
        artikel: String, 
        vorhanden: u32, 
        gesucht: u32 
    }, // Trägt detaillierte Bestandszahlen
    KasseDefekt, // Trägt keine zusätzlichen Daten
}
```

#### Fehler verarbeiten und darauf reagieren
Der Aufrufer kann nun mittels Pattern Matching genau analysieren, was schiefgelaufen ist, und entsprechende Maßnahmen ergreifen:

```rust
match bestellung_ausfuehren(&mut regal, bestellung) {
    Ok(()) => println!("Bestellung erfolgreich übergeben!"),
    Err(BestellFehler::ArtikelNichtImSortiment(name)) => {
        println!("Wir müssen '{}' schnell beim Großhändler ordern!", name);
    },
    Err(BestellFehler::ZuWenigBestand { artikel, vorhanden, gesucht }) => {
        println!(
            "Kann Bestellung für '{}' nicht erfüllen. Gesucht: {}, Vorhanden: {}",
            artikel, gesucht, vorhanden
        );
    },
    Err(BestellFehler::KasseDefekt) => {
        println!("Bitte rufen Sie den Techniker!");
    }
}
```

---

### 4. Ownership und Borrow-Checker Muster in Schleifen

Ein häufiges Problem in Phase 3 ist das Iterieren über eine HashMap, während man gleichzeitig Einträge in ihr ändern möchte.

#### Das Problem
```rust
let mut regal = HashMap::new();
regal.insert(String::from("Lollis"), 5);

for (sorte, anzahl) in &mut regal {
    if *anzahl < 10 {
        // regal.insert(String::from("Bonus"), 1); 
        // FEHLER: we cannot borrow `regal` as mutable more than once at a time!
    }
}
```
Der Borrow Checker verbietet es, die HashMap zu verändern, während der Iterator `&mut regal` aktiv ist, da dies die internen Speicheradressen der Map ungültig machen könnte.

#### Die Lösungsmuster

##### Muster 1: Temporäre Sammelliste (Collector)
Sammle alle Schlüssel, die du ändern willst, in einem separaten Vektor. Iteriere danach über diesen Vektor, um die HashMap zu manipulieren.

```rust
let mut regal = HashMap::new();
regal.insert(String::from("Lollis"), 5);

// 1. Schritt: Schlüssel sammeln
let mut zu_wenig = Vec::new();
for (sorte, anzahl) in &regal {
    if *anzahl < 10 {
        zu_wenig.push(sorte.clone());
    }
}

// 2. Schritt: HashMap manipulieren
for sorte in zu_wenig {
    let eintrag = regal.entry(sorte).or_insert(0);
    *eintrag += 10; // Aufstocken!
}
```

##### Muster 2: Retain-Methode nutzen
Für das reine Löschen von Elementen bietet Rust die optimierte Methode `.retain()` an:

```rust
let mut regal = HashMap::new();
regal.insert(String::from("Lollis"), 0); // Ausverkauft
regal.insert(String::from("Bonbons"), 15);

// Behalte nur Einträge, deren Bestand größer als 0 ist (entfernt Ausverkauftes)
regal.retain(|_sorte, anzahl| *anzahl > 0);
```

---

## 📖 Das ultimative 50-Methoden-Lexikon (Der vollständige Spickzettel-Anhang)

Dieses Lexikon dient dir als allumfassendes Nachschlagewerk für alle Typen aus Phase 3. Zu jeder Methode findest du eine genaue Erklärung der Funktionsweise, ein praxisnahes Codebeispiel aus unserem Süßigkeiten-Kiosk und einen didaktischen Tipp.

---

### 📦 1. Das Vektor-Methoden-Lexikon (`Vec<T>`)

#### Method 1: `Vec::new()`
*   **Funktionsweise:** Erstellt einen neuen, leeren Vektor. Auf dem Heap wird erst Speicher reserviert, wenn das erste Element eingefügt wird.
*   **Kiosk-Fall:** Du eröffnest eine leere Warteschlange am Morgen.
*   **Beispiel:**
    ```rust
    let mut kunden: Vec<String> = Vec::new();
    ```
*   **Tipp:** Du musst oft den Typ explizit angeben, da Rust beim Erstellen noch nicht weiß, was in der Schlange stehen wird.

#### Method 2: `Vec::with_capacity(capacity)`
*   **Funktionsweise:** Erstellt einen leeren Vektor, reserviert aber im Voraus Platz für eine bestimmte Anzahl an Elementen auf dem Heap, um Reallokationen zu vermeiden.
*   **Kiosk-Fall:** Du weißt, dass zur großen Pause etwa 30 Schulkinder kommen werden.
*   **Beispiel:**
    ```rust
    let mut schüler: Vec<String> = Vec::with_capacity(30);
    ```
*   **Tipp:** Nutze dies immer, wenn die ungefähre Endgröße der Liste im Voraus bekannt ist, um Performance zu sparen.

#### Method 3: `push(element)`
*   **Funktionsweise:** Hängt das übergebene Element an das Ende des Vektors an.
*   **Kiosk-Fall:** Ein neuer Kunde stellt sich hinten in der Schlange an.
*   **Beispiel:**
    ```rust
    let mut schlange = vec![String::from("Mia")];
    schlange.push(String::from("Leo")); // ["Mia", "Leo"]
    ```
*   **Tipp:** Die Variable, die du übergibst, verliert ihr Ownership und wird in den Vektor verschoben (moved).

#### Method 4: `pop()`
*   **Funktionsweise:** Entfernt das letzte Element des Vektors und gibt es als `Option<T>` zurück.
*   **Kiosk-Fall:** Der Kunde, der sich als Letztes angestellt hat, verlässt verärgert die Warteschlange.
*   **Beispiel:**
    ```rust
    let mut schlange = vec![String::from("Mia"), String::from("Leo")];
    let gegangen = schlange.pop(); // Some("Leo"), schlange ist nun ["Mia"]
    ```
*   **Tipp:** Wenn der Vektor leer ist, liefert `.pop()` einfach `None` zurück, ohne dass das Programm abstürzt.

#### Method 5: `remove(index)`
*   **Funktionsweise:** Entfernt das Element am angegebenen Index und schiebt alle nachfolgenden Elemente im Speicher nach links auf.
*   **Kiosk-Fall:** Der Kunde auf Position 1 (der Zweite) verlässt die Schlange.
*   **Beispiel:**
    ```rust
    let mut schlange = vec![String::from("Mia"), String::from("Leo"), String::from("Noah")];
    let entfernt = schlange.remove(1); // "Leo", schlange ist nun ["Mia", "Noah"]
    ```
*   **Tipp:** Stürzt ab (panic!), wenn der Index außerhalb der aktuellen Länge liegt.

#### Method 6: `insert(index, element)`
*   **Funktionsweise:** Schiebt ein Element an die angegebene Index-Position und verschiebt alle nachfolgenden Elemente nach rechts.
*   **Kiosk-Fall:** Jemand drängelt sich auf Position 0 (ganz vorne) vor.
*   **Beispiel:**
    ```rust
    let mut schlange = vec![String::from("Mia")];
    schlange.insert(0, String::from("Drängler")); // ["Drängler", "Mia"]
    ```
*   **Tipp:** Stürzt ebenfalls ab, wenn der Index größer als die Vektorlänge ist.

#### Method 7: `len()`
*   **Funktionsweise:** Gibt die aktuelle Anzahl der Elemente im Vektor als `usize` zurück.
*   **Kiosk-Fall:** Der Kioskbesitzer zählt die wartenden Köpfe.
*   **Beispiel:**
    ```rust
    let kunden = vec![String::from("Mia"), String::from("Leo")];
    println!("Wartend: {}", kunden.len()); // 2
    ```
*   **Tipp:** `len` gibt die tatsächliche Anzahl an Elementen zurück, nicht die Kapazität des reservierten Speichers.

#### Method 8: `is_empty()`
*   **Funktionsweise:** Gibt `true` zurück, wenn der Vektor leer ist, sonst `false`.
*   **Kiosk-Fall:** Prüfung, ob Herr Rustig Feierabend machen kann.
*   **Beispiel:**
    ```rust
    let schlange: Vec<String> = vec![];
    if schlange.is_empty() { println!("Feierabend!"); }
    ```
*   **Tipp:** Verwende `.is_empty()` statt `len() == 0`, da es semantisch klarer und bei manchen Datenstrukturen schneller ist.

#### Method 9: `contains(&element)`
*   **Funktionsweise:** Prüft, ob ein Element im Vektor existiert. Benötigt das `PartialEq`-Trait.
*   **Kiosk-Fall:** Ist "Noah" in der Warteschlange?
*   **Beispiel:**
    ```rust
    let kunden = vec![String::from("Mia"), String::from("Noah")];
    let ist_da = kunden.contains(&String::from("Noah")); // true
    ```
*   **Tipp:** Übergib das Element als Referenz (`&`), da `.contains()` den Wert nicht besitzen möchte.

#### Method 10: `clear()`
*   **Funktionsweise:** Löscht alle Elemente aus dem Vektor. Der Vektor hat danach die Länge 0.
*   **Kiosk-Fall:** Der Kiosk schließt und Herr Rustig schickt alle verbliebenen Kunden nach Hause.
*   **Beispiel:**
    ```rust
    let mut kunden = vec![String::from("Mia")];
    kunden.clear(); // kunden ist nun leer []
    ```
*   **Tipp:** Der reservierte Speicherplatz auf dem Heap bleibt erhalten, sodass der Vektor danach ohne Reallokationen wieder befüllt werden kann.

---

### 🏷️ 2. Das HashMap-Methoden-Lexikon (`HashMap<K, V>`)

#### Method 11: `HashMap::new()`
*   **Funktionsweise:** Erstellt eine neue, leere HashMap.
*   **Kiosk-Fall:** Du stellst ein komplett neues Regal ohne Ware auf.
*   **Beispiel:**
    ```rust
    use std::collections::HashMap;
    let mut regal: HashMap<String, u32> = HashMap::new();
    ```
*   **Tipp:** Die HashMap muss aus `std::collections` importiert werden, da sie nicht automatisch geladen wird.

#### Method 12: `insert(key, value)`
*   **Funktionsweise:** Fügt ein Schlüssel-Wert-Paar hinzu. Existiert der Schlüssel bereits, wird der alte Wert überschrieben.
*   **Kiosk-Fall:** Du stellst ein neues Bonbonglas mit 50 Lollis ins Regal.
*   **Beispiel:**
    ```rust
    let mut regal = HashMap::new();
    regal.insert(String::from("Lollis"), 50);
    ```
*   **Tipp:** Die Methode gibt `Some(alter_wert)` zurück, falls der Schlüssel bereits existierte und überschrieben wurde, ansonsten `None`.

#### Method 13: `get(&key)`
*   **Funktionsweise:** Liefert eine Referenz auf den zum Schlüssel gehörenden Wert zurück, verpackt in eine `Option<&V>`.
*   **Kiosk-Fall:** Du liest den Bestand vom Bonbonglas ab.
*   **Beispiel:**
    ```rust
    let mut regal = HashMap::new();
    regal.insert(String::from("Lollis"), 50);
    let bestand_opt = regal.get("Lollis"); // Some(&50)
    ```
*   **Tipp:** Da `.get()` eine Referenz liefert, musst du den Wert oft mit `*` dereferenzieren.

#### Method 14: `contains_key(&key)`
*   **Funktionsweise:** Prüft, ob ein bestimmter Schlüssel in der HashMap existiert.
*   **Kiosk-Fall:** Führen wir überhaupt die Sorte "Gummibärchen"?
*   **Beispiel:**
    ```rust
    let mut regal = HashMap::new();
    regal.insert(String::from("Lollis"), 50);
    let haben_lollis = regal.contains_key("Lollis"); // true
    ```
*   **Tipp:** Schneller als `.get().is_some()`, wenn dich der Wert selbst gar nicht interessiert.

#### Method 15: `remove(&key)`
*   **Funktionsweise:** Entfernt das Schlüssel-Wert-Paar und gibt den Wert als `Option<V>` zurück.
*   **Kiosk-Fall:** Du nimmst das Lolli-Glas komplett aus dem Sortiment.
*   **Beispiel:**
    ```rust
    let mut regal = HashMap::new();
    regal.insert(String::from("Lollis"), 50);
    let entnommen = regal.remove("Lollis"); // Some(50)
    ```
*   **Tipp:** Übergib den Schlüssel als Referenz (z. B. `&str` oder `&String`).

#### Method 16: `len()`
*   **Funktionsweise:** Gibt die Anzahl der gespeicherten Schlüssel-Wert-Paare zurück.
*   **Kiosk-Fall:** Wie viele verschiedene Süßigkeitensorten haben wir im Regal?
*   **Beispiel:**
    ```rust
    let mut regal = HashMap::new();
    regal.insert(String::from("Lollis"), 50);
    println!("Sorten: {}", regal.len()); // 1
    ```
*   **Tipp:** Liefert die Anzahl der *Gläser*, nicht die Summe der darin enthaltenen Bonbons.

#### Method 17: `is_empty()`
*   **Funktionsweise:** Prüft, ob die HashMap leer ist.
*   **Kiosk-Fall:** Ist das Regal komplett leergeräumt?
*   **Beispiel:**
    ```rust
    let regal: HashMap<String, u32> = HashMap::new();
    assert!(regal.is_empty());
    ```
*   **Tipp:** Sollte immer verwendet werden, um auf Leere zu prüfen (anstatt `len() == 0`).

#### Method 18: `entry(key)`
*   **Funktionsweise:** Liefert einen Entry-Wächter zurück, mit dem man prüfen kann, ob ein Schlüssel existiert, und diesen direkt manipulieren kann.
*   **Kiosk-Fall:** Du gehst zum Lolli-Fach. Wenn Lollis da sind, erhöhst du die Menge. Wenn nicht, stellst du ein neues Glas hin.
*   **Beispiel:**
    ```rust
    let mut regal = HashMap::new();
    regal.entry(String::from("Lollis")).or_insert(0);
    ```
*   **Tipp:** Extrem mächtig in Kombination mit `.or_insert(default)`, da es eine veränderbare Referenz (`&mut V`) zurückgibt.

#### Method 19: `keys()`
*   **Funktionsweise:** Liefert einen Iterator über alle Schlüssel in der HashMap.
*   **Kiosk-Fall:** Du schreibst eine Liste aller Sortennamen auf.
*   **Beispiel:**
    ```rust
    let mut regal = HashMap::new();
    regal.insert(String::from("Lollis"), 50);
    for sorte in regal.keys() { println!("{}", sorte); }
    ```
*   **Tipp:** Die Reihenfolge der Schlüssel im Iterator ist absolut unvorhersehbar und ändert sich bei jedem Programmdurchlauf!

#### Method 20: `values()`
*   **Funktionsweise:** Liefert einen Iterator über alle Werte (Mengen/Preise) in der HashMap.
*   **Kiosk-Fall:** Du möchtest wissen, welche Bestandszahlen im Kiosk vorhanden sind.
*   **Beispiel:**
    ```rust
    let mut regal = HashMap::new();
    regal.insert(String::from("Lollis"), 50);
    for anzahl in regal.values() { println!("{}", anzahl); }
    ```
*   **Tipp:** Der Iterator gibt Referenzen auf die Werte (`&V`) zurück.

---

### 🍯 3. Das Option-Methoden-Lexikon (`Option<T>`)

#### Method 21: `is_some()`
*   **Funktionsweise:** Gibt `true` zurück, wenn die Option `Some` enthält, andernfalls `false`.
*   **Kiosk-Fall:** Du schaust von außen ins Glas: Befindet sich ein Bonbon darin?
*   **Beispiel:**
    ```rust
    let glas = Some("Lolli");
    assert!(glas.is_some());
    ```
*   **Tipp:** Hilft bei schnellen Abfragen, ohne den Wert direkt auszupacken.

#### Method 22: `is_none()`
*   **Funktionsweise:** Gibt `true` zurück, wenn die Option `None` ist, andernfalls `false`.
*   **Kiosk-Fall:** Du schaust ins Glas: Ist es absolut leer?
*   **Beispiel:**
    ```rust
    let glas: Option<&str> = None;
    assert!(glas.is_none());
    ```
*   **Tipp:** Das logische Gegenteil von `.is_some()`.

#### Method 23: `unwrap()`
*   **Funktionsweise:** Entpackt den Wert. Wenn die Option `None` ist, stürzt das Programm ab (panic!).
*   **Kiosk-Fall:** Der blinde, unvorsichtige Griff ins Bonbonglas.
*   **Beispiel:**
    ```rust
    let glas = Some("Lolli");
    let bonbon = glas.unwrap(); // "Lolli"
    ```
*   **Tipp:** Vermeide `.unwrap()` im echten Code. Nutze es nur, wenn du den Absturz bewusst provozieren willst, falls der Wert fehlt, oder beim Schreiben von Unittests.

#### Method 24: `unwrap_or(default)`
*   **Funktionsweise:** Entpackt den Wert. Wenn die Option `None` ist, wird stattdessen der übergebene Standardwert (`default`) zurückgeliefert.
*   **Kiosk-Fall:** Du greifst ins Lolli-Glas. Wenn keins da ist, nimmst du den Notfall-Kaugummi vom Tresen.
*   **Beispiel:**
    ```rust
    let leeres_glas: Option<&str> = None;
    let naschwerk = leeres_glas.unwrap_or("Kaugummi"); // "Kaugummi"
    ```
*   **Tipp:** Der Standardwert muss exakt denselben Typ wie der verpackte Wert haben.

#### Method 25: `unwrap_or_else(f)`
*   **Funktionsweise:** Entpackt den Wert. Wenn die Option `None` ist, wird die übergebene Closure `f` ausgeführt, um den Standardwert erst bei Bedarf zu erzeugen.
*   **Kiosk-Fall:** Wenn kein Lolli im Glas ist, rennst du mühsam in die Küche und machst einen frischen Lolli.
*   **Beispiel:**
    ```rust
    let leeres_glas: Option<String> = None;
    let lolli = leeres_glas.unwrap_or_else(|| String::from("Frischer Lolli"));
    ```
*   **Tipp:** Bietet bessere Performance als `unwrap_or`, wenn die Erstellung des Ersatzwertes rechenintensiv ist, da sie nur bei Bedarf ausgeführt wird.

#### Method 26: `map(f)`
*   **Funktionsweise:** Wendet die Funktion `f` auf den Wert an, falls `Some` vorliegt. Wenn `None` vorliegt, bleibt das Ergebnis `None`.
*   **Kiosk-Fall:** Du verpackst das gefundene Bonbon in Geschenkpapier. Wenn kein Bonbon da ist, verpackst du nichts.
*   **Beispiel:**
    ```rust
    let lolli = Some(String::from("Lolli"));
    let laenge = lolli.map(|s| s.len()); // Some(5)
    ```
*   **Tipp:** Eine der elegantesten Methoden in Rust, um Match-Blöcke einzusparen.

#### Method 27: `and_then(f)`
*   **Funktionsweise:** Ähnlich wie `.map()`, aber die Funktion `f` muss selbst eine `Option` zurückgeben. Verhindert verschachtelte Options (`Option<Option<T>>`).
*   **Kiosk-Fall:** Du nimmst einen Lolli und prüfst in der Preistabelle, ob er einen Preis hat.
*   **Beispiel:**
    ```rust
    let lolli = Some("Lolli");
    let preis = lolli.and_then(|l| if l == "Lolli" { Some(50) } else { None }); // Some(50)
    ```
*   **Tipp:** Wird oft für die Verkettung von Operationen genutzt, die fehlschlagen können.

#### Method 28: `filter(predicate)`
*   **Funktionsweise:** Gibt `Some` zurück, wenn ein Wert existiert UND dieser die Bedingung im `predicate` erfüllt. Andernfalls wird `None` geliefert.
*   **Kiosk-Fall:** Du greifst ins Glas, behältst das Bonbon aber nur, wenn es rot ist.
*   **Beispiel:**
    ```rust
    let lolli = Some(String::from("Roter Lolli"));
    let rot = lolli.filter(|s| s.contains("Rot")); // Some("Roter Lolli")
    ```
*   **Tipp:** Ermöglicht die Filterung von optionalen Werten direkt im Datenfluss.

#### Method 29: `take()`
*   **Funktionsweise:** Entnimmt den Wert aus einer veränderbaren Option und lässt an deren Stelle `None` zurück.
*   **Kiosk-Fall:** Du greifst ins Glas, nimmst das Bonbon heraus und das Glas bleibt danach leer zurück.
*   **Beispiel:**
    ```rust
    let mut glas = Some(String::from("Lolli"));
    let entnommen = glas.take(); // entnommen = Some("Lolli"), glas = None
    ```
*   **Tipp:** Perfekt, um das Ownership aus veränderbaren Variablen herauszuziehen, ohne den Compiler zu verärgern.

#### Method 30: `replace(value)`
*   **Funktionsweise:** Ersetzt den Wert in einer veränderbaren Option und gibt den alten Wert als Option zurück.
*   **Kiosk-Fall:** Du tauschst den Lolli im Glas gegen ein Bonbon aus.
*   **Beispiel:**
    ```rust
    let mut glas = Some(String::from("Lolli"));
    let alter_lolli = glas.replace(String::from("Bonbon")); // glas = Some("Bonbon"), alter_lolli = Some("Lolli")
    ```
*   **Tipp:** Hilft, Werte atomar in einer einzigen Operation auszutauschen.

---

### 🪙 4. Das Result-Methoden-Lexikon (`Result<T, E>`)

#### Method 31: `is_ok()`
*   **Funktionsweise:** Gibt `true` zurück, wenn das Resultat ein Erfolg (`Ok`) ist.
*   **Kiosk-Fall:** Die Kasse rattert und der Bezahlvorgang war erfolgreich.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, &str> = Ok(50);
    assert!(ergebnis.is_ok());
    ```
*   **Tipp:** Zeigt an, dass die Operation ohne Fehler durchgelaufen ist.

#### Method 32: `is_err()`
*   **Funktionsweise:** Gibt `true` zurück, wenn das Resultat ein Fehler (`Err`) ist.
*   **Kiosk-Fall:** Die Kasse piept rot – Bezahlung fehlgeschlagen.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, &str> = Err("Zu wenig Geld!");
    assert!(ergebnis.is_err());
    ```
*   **Tipp:** Hilft, Fehler schnell abzufragen, ohne sie auszupacken.

#### Method 33: `unwrap()`
*   **Funktionsweise:** Gibt den Erfolgswert zurück. Falls ein Fehler (`Err`) vorliegt, stürzt das Programm mit einer Panic-Meldung ab.
*   **Kiosk-Fall:** Du nimmst das Wechselgeld an. Wenn es ein Fehler war, gerätst du in Panik.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, &str> = Ok(10);
    let geld = ergebnis.unwrap(); // 10
    ```
*   **Tipp:** Genau wie bei `Option` gilt: Nur in Tests oder bei absoluter Sicherheit verwenden!

#### Method 34: `unwrap_err()`
*   **Funktionsweise:** Das Gegenstück zu `unwrap()`. Gibt die Fehlermeldung zurück, falls ein Fehler (`Err`) vorliegt. Stürzt ab, falls das Resultat `Ok` war.
*   **Kiosk-Fall:** Du willst die Fehlermeldung der Kasse genau analysieren.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, &str> = Err("Kasse klemmt");
    let fehler = ergebnis.unwrap_err(); // "Kasse klemmt"
    ```
*   **Tipp:** Sehr nützlich beim Testen von Fehlerpfaden in Unittests.

#### Method 35: `unwrap_or(default)`
*   **Funktionsweise:** Gibt den inneren Erfolgswert zurück. Liegt ein Fehler vor, wird das übergebene Argument als Standardwert zurückgegeben.
*   **Kiosk-Fall:** Wenn beim Abrechnen ein Kassenfehler auftritt, buchen wir einfach 0 Cent Wechselgeld.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, &str> = Err("Fehler");
    let geld = ergebnis.unwrap_or(0); // 0
    ```
*   **Tipp:** Verwirft die Fehlermeldung komplett und ersetzt sie durch den Standardwert.

#### Method 36: `unwrap_or_else(op)`
*   **Funktionsweise:** Gibt den Erfolgswert zurück oder führt im Fehlerfall die Closure `op` aus, um einen Standardwert zu berechnen (Lazy Evaluation).
*   **Kiosk-Fall:** Tritt beim Bezahlen ein Fehler auf, rufen wir den Filialleiter und lassen ihn den Betrag manuell autorisieren.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, String> = Err(String::from("Kartenfehler"));
    let geld = ergebnis.unwrap_or_else(|e| {
        println!("Achtung: {}", e);
        0
    });
    ```
*   **Tipp:** Die Closure erhält die Fehlermeldung als Parameter übergeben, so dass man den Fehler protokollieren kann.

#### Method 37: `map(op)`
*   **Funktionsweise:** Wendet die Operation `op` auf den Erfolgswert an, lässt einen Fehler jedoch unberührt passieren.
*   **Kiosk-Fall:** Du rechnest das Wechselgeld in Euro um, falls das Bezahlen erfolgreich war.
*   **Beispiel:**
    ```rust
    let cent: Result<u32, &str> = Ok(150);
    let euro = cent.map(|c| c as f64 / 100.0); // Ok(1.5)
    ```
*   **Tipp:** Nützlich, um Datenflüsse im Gut-Fall fortzusetzen, ohne sich um Fehler kümmern zu müssen.

#### Method 38: `map_err(op)`
*   **Funktionsweise:** Wendet die Operation `op` auf den Fehlerwert an, lässt den Erfolgswert jedoch unberührt.
*   **Kiosk-Fall:** Du übersetzt die Fehlermeldung der Kasse ins Deutsche.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, &str> = Err("Card declined");
    let uebersetzt = ergebnis.map_err(|e| format!("Fehler an Kasse: {}", e)); // Err("Fehler an Kasse: Card declined")
    ```
*   **Tipp:** Unverzichtbar, um Fehler aus fremden Bibliotheken in eigene Fehler-Enums umzuwandeln.

#### Method 39: `ok()`
*   **Funktionsweise:** Wandelt das Resultat in eine Option um. Aus `Ok(wert)` wird `Some(wert)`, aus `Err(fehler)` wird `None`.
*   **Kiosk-Fall:** Uns interessiert nur, ob Wechselgeld da ist – die Fehlermeldung werfen wir weg.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, &str> = Ok(50);
    let opt_wechselgeld = ergebnis.ok(); // Some(50)
    ```
*   **Tipp:** Hilfreich, wenn man Fehlerinformationen nicht mehr benötigt und mit `Option`-Methoden weiterarbeiten möchte.

#### Method 40: `err()`
*   **Funktionsweise:** Das Gegenstück zu `.ok()`. Wandelt ein Resultat so um, dass aus `Err(fehler)` ein `Some(fehler)` wird und aus `Ok(wert)` ein `None`.
*   **Kiosk-Fall:** Du willst nur die Fehlermeldung sammeln und den Erfolgswert verwerfen.
*   **Beispiel:**
    ```rust
    let ergebnis: Result<u32, &str> = Err("Kartenfehler");
    let opt_fehler = ergebnis.err(); // Some("Kartenfehler")
    ```
*   **Tipp:** Nimm den Fehler als Option entgegen, um ihn mit `if let Some(e)` zu prüfen.

---

### 🛍️ 5. Das Tupel- & Ausgabe-Lexikon (Techniken)

#### Technique 41: Tupel-Initialisierung
*   **Funktionsweise:** Erstellt eine unbenannte Sammlung von Werten unterschiedlicher Typen.
*   **Kiosk-Fall:** Du packst eine Bonbontüre mit einem Lolli (String) und dem Preis (u32).
*   **Beispiel:**
    ```rust
    let tuete = (String::from("Lolli"), 50);
    ```
*   **Tipp:** Die Anzahl und die Typen der Elemente sind nach der Definition festgeschrieben.

#### Technique 42: Destrukturierung (Auspacken)
*   **Funktionsweise:** Zerlegt ein Tupel in einzelne Variablen.
*   **Kiosk-Fall:** Der Kunde nimmt den Lolli und das Geld aus der Papiertüte.
*   **Beispiel:**
    ```rust
    let tuete = (String::from("Lolli"), 50);
    let (name, preis) = tuete;
    ```
*   **Tipp:** Du musst auf der linken Seite genau so viele Variablen angeben, wie das Tupel Elemente hat.

#### Technique 43: Index-Zugriff
*   **Funktionsweise:** Greift direkt auf ein Element des Tupels über die Punkt-Schreibweise zu (startend bei 0).
*   **Kiosk-Fall:** Du holst nur das Geld aus der Tüte, der Lolli bleibt drin.
*   **Beispiel:**
    ```rust
    let tuete = (String::from("Lolli"), 50);
    let preis = tuete.1; // 50
    ```
*   **Tipp:** Der Index muss zur Compilezeit eine feste Zahl sein (`tuete.0` ist erlaubt, `tuete.i` mit einer Variablen `i` ist verboten!).

#### Technique 44: Platzhalter bei der Destrukturierung
*   **Funktionsweise:** Ignoriert bestimmte Teile des Tupels beim Auspacken unter Verwendung des Unterstrichs `_`.
*   **Kiosk-Fall:** Du packst die Tüte aus, wirfst den Lolli aber sofort weg und behältst nur das Wechselgeld.
*   **Beispiel:**
    ```rust
    let tuete = (String::from("Lolli"), 50);
    let (_, preis) = tuete; // Ignoriert das erste Element
    ```
*   **Tipp:** Verhindert Compiler-Warnungen über ungenutzte Variablen.

#### Technique 45: Der Unit-Typ `()`
*   **Funktionsweise:** Ein leeres Tupel. Es hat genau einen Wert (ebenfalls `()`) und repräsentiert das Fehlen von Daten.
*   **Kiosk-Fall:** Eine Aktion (wie das Regal putzen) liefert keinen Ertrag, sondern war nur eine Tätigkeit.
*   **Beispiel:**
    ```rust
    fn regal_putzen() -> () {
        println!("Sauber!");
    }
    ```
*   **Tipp:** Wenn eine Funktion keinen Rückgabetyp definiert, gibt sie insgeheim `()` zurück.

#### Technique 46: Debug-Ausgabe `{:?}`
*   **Funktionsweise:** Gibt den Wert unter Verwendung des `Debug`-Traits aus. Zeigt die Struktur des Objekts, wie sie im Code existiert.
*   **Kiosk-Fall:** Du druckst das komplette Lolli-Glas im Terminal aus, um zu sehen, was Rust intern speichert.
*   **Beispiel:**
    ```rust
    let glas = Some("Lolli");
    println!("{:?}", glas); // Some("Lolli")
    ```
*   **Tipp:** Jedes eigene Struct/Enum benötigt `#[derive(Debug)]` über dem Kopf, um so ausgegeben werden zu können.

#### Technique 47: Pretty-Print Debug-Ausgabe `{:#?}`
*   **Funktionsweise:** Wie `{:?}`, formatiert die Ausgabe aber mit Absätzen, Einrückungen und Zeilenumbrüchen.
*   **Kiosk-Fall:** Du druckst das gesamte Kioskregal übersichtlich aus.
*   **Beispiel:**
    ```rust
    let mut regal = std::collections::HashMap::new();
    regal.insert("Lolli", 10);
    println!("{:#?}", regal);
    ```
*   **Tipp:** Nutze `{:#?}` bei großen Datenstrukturen (wie verschachtelten HashMaps oder Structs), um den Überblick zu behalten.

#### Technique 48: Tupel-Vergleiche
*   **Funktionsweise:** Vergleicht zwei Tupel Element für Element von links nach rechts.
*   **Kiosk-Fall:** Welcher Einkauf ist wertvoller?
*   **Beispiel:**
    ```rust
    let einkauf_1 = (1, 50); // 1 Lolli, 50 Cent
    let einkauf_2 = (1, 60); // 1 Lolli, 60 Cent
    assert!(einkauf_2 > einkauf_1); // true, da 60 > 50
    ```
*   **Tipp:** Die Elemente an den entsprechenden Positionen müssen vergleichbar sein.

#### Technique 49: Der verschachtelte Index-Zugriff
*   **Funktionsweise:** Greift auf Elemente in Tupeln zu, die selbst wieder in anderen Strukturen liegen.
*   **Kiosk-Fall:** Du hast eine Kundenliste aus Tupeln und willst den Preis des ersten Kunden wissen.
*   **Beispiel:**
    ```rust
    let kunden_liste = vec![(String::from("Mia"), 50)];
    let preis = kunden_liste[0].1; // 50
    ```
*   **Tipp:** Achte auf die korrekte Reihenfolge: erst der Index des Vektors in eckigen Klammern, dann der Punkt für das Tupel-Element.

#### Technique 50: Debug-Formatting von Ausdrücken mit `dbg!`
*   **Funktionsweise:** Ein Makro, das den übergebenen Ausdruck auswertet, die Datei, Zeile und das Ergebnis ausgibt und den Wert danach unverändert zurückliefert.
*   **Kiosk-Fall:** Du willst mitten in einer komplexen Rechnung sehen, wie viel Geld gerade berechnet wurde.
*   **Beispiel:**
    ```rust
    let preis = 50;
    let geld = 100;
    let wechselgeld = dbg!(geld - preis); // Druckt: [src/main.rs:3] geld - preis = 50
    ```
*   **Tipp:** Viel besser als `println!`, da `dbg!` den Wert nicht konsumiert (ownership-freundlich) und den exakten Code-Ausdruck mit ausgibt.

---

## 📇 Merkzettel für den Kühlschrank (Zusammenfassung)

| Werkzeug | Wann benutzen? | Analogie | Wichtigste Methoden |
| :--- | :--- | :--- | :--- |
| **`Vec<T>`** | Wenn die Reihenfolge zählt und die Liste wachsen soll. | Warteschlange vor der Tür | `.push()`, `.pop()`, `.remove()`, `.len()` |
| **`HashMap<K, V>`** | Wenn du Dinge über ein Namensschild suchen willst. | Beschriftete Gläser im Regal | `.insert()`, `.get()`, `.contains_key()`, `.entry()` |
| **`Option<T>`** | Wenn ein Wert da sein kann oder eben fehlen kann. | Der blinde Griff ins Glas | `Some(wert)`, `None`, `match`, `if let`, `.unwrap_or()` |
| **`Result<T, E>`** | Wenn eine Aktion erfolgreich sein oder fehlschlagen kann. | Der Bezahlvorgang an der Kasse | `Ok(wert)`, `Err(fehler)`, `?`, `.unwrap_or()` |
| **`Tupel (A, B)`** | Wenn du schnell mehrere Werte als Paket zurückgeben willst. | Die vollgepackte Papiertüte | `(wert1, wert2)`, Destrukturierung `let (x, y) = ...`, `.0`, `.1` |
| **`{:?}` und `{:#?}`** | Zur Ausgabe komplexer Datentypen auf dem Bildschirm. | Die Debug-Brille | `println!("{:?}", variable);` |

---

## 🎓 Mini-Quiz (Micro-Learning)

*Versuche, diese Fragen im Kopf zu beantworten:*
1.  Warum liefert `regal.get("Lolli")` eine `Option<&u32>` zurück und nicht direkt `u32`?
2.  Was passiert, wenn du `unwrap()` auf ein `None` anwendest?
3.  Welches Zeichen leitet einen Fehler im `Result` blitzschnell weiter?
4.  Darfst du den `?`-Operator in einer `fn main()` verwenden, die keinen Rückgabetyp hat?
5.  Was ist der Unterschied zwischen der Debug-Ausgabe `{:?}` und `{:#?}`?

*Viel Erfolg beim Programmieren deines Kiosks und Lösen der Aufgaben! Wenn du feststeckst, frage deinen KI-Lernpartner nach einem Tipp für den jeweiligen Arbeitsschritt, aber lass dir nicht den fertigen Code geben!*
