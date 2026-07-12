# Konzepte statt Syntax lernen (Phase 3)

Beim Programmierenlernen in Rust ist es entscheidend, zunächst die zugrunde liegenden Konzepte zu verstehen, anstatt nur die Syntax auswendig zu lernen. In Phase 3 dreht sich alles um **sicheren Umgang mit Fehlern** und **dynamische Datenspeicherung**.

---

## ⚠️ 1. Fehlerbehandlung mit Result\<T, E\>

### Die Analogie: Das Paket-Tracking-System

Stell dir vor, du bestellst online ein Paket. Das Logistikunternehmen gibt dir immer eine klare Rückmeldung: Entweder ist dein Paket angekommen (`Ok`) oder es gab ein Problem mit einer Fehlerbeschreibung (`Err`). Du kannst nicht einfach davon ausgehen, dass das Paket da ist – du musst immer prüfen!

Genau das macht `Result<T, E>` in Rust. Eine Funktion, die fehlschlagen kann, gibt immer einen `Result`-Wert zurück. Der Aufrufer **muss** damit umgehen – der Compiler lässt es nicht zu, einen möglichen Fehler zu ignorieren.

### Theorie: Der Result-Enum

```rust
// Result ist ein eingebauter Enum in Rust (kein Import nötig):
// enum Result<T, E> {
//     Ok(T),   // Erfolgsfall: enthält den Wert vom Typ T
//     Err(E),  // Fehlerfall: enthält die Fehlerbeschreibung vom Typ E
// }

// Beispiel: Eine Funktion, die fehlschlagen kann
fn dividiere(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        // Fehlerfall: Wir geben Err mit einer Beschreibung zurück
        Err(String::from("Division durch Null ist nicht erlaubt!"))
    } else {
        // Erfolgsfall: Wir geben Ok mit dem Ergebnis zurück
        Ok(a / b)
    }
}

fn main() {
    // Variante 1: Mit match – vollständige Kontrolle
    match dividiere(10.0, 2.0) {
        Ok(ergebnis) => println!("Ergebnis: {}", ergebnis),
        Err(fehler)  => println!("Fehler: {}", fehler),
    }

    // Variante 2: Mit if let – nur den Erfolgsfall behandeln
    if let Ok(wert) = dividiere(10.0, 0.0) {
        println!("Wert: {}", wert);
    } else {
        println!("Die Division ist fehlgeschlagen.");
    }

    // Variante 3: unwrap_or – Standardwert bei Fehler
    let ergebnis = dividiere(10.0, 0.0).unwrap_or(0.0);
    println!("Ergebnis (mit Fallback): {}", ergebnis); // 0.0

    // Variante 4: expect – bei Fehler Programm beenden mit Nachricht
    // Nur in Situationen verwenden, wo ein Fehler wirklich unmöglich sein sollte!
    let sicher = dividiere(10.0, 2.0).expect("Das sollte nie fehlschlagen!");
    println!("Sicheres Ergebnis: {}", sicher);
}
```

### Theorie: Fehlerweiterleitung mit dem ?-Operator

Der `?`-Operator ist die eleganteste Art, Fehler weiterzureichen. Er sagt: "Wenn das `Ok` ist, gib mir den Wert. Wenn das `Err` ist, gibt diesen Fehler sofort aus der Funktion zurück."

```rust
use std::fs;
use std::io;

// Diese Funktion kann scheitern, deshalb gibt sie Result zurück.
fn lies_datei(pfad: &str) -> Result<String, io::Error> {
    // Mit ? wird der Fehler automatisch weitergereicht,
    // falls fs::read_to_string fehlschlägt.
    let inhalt = fs::read_to_string(pfad)?;
    Ok(inhalt)
}

// Ohne ? müsste man schreiben:
fn lies_datei_lang(pfad: &str) -> Result<String, io::Error> {
    match fs::read_to_string(pfad) {
        Ok(inhalt) => Ok(inhalt),
        Err(e) => Err(e), // Fehler manuell weiterreichen
    }
}

fn main() {
    match lies_datei("beispiel.txt") {
        Ok(text)  => println!("Inhalt: {}", text),
        Err(fehler) => println!("Konnte Datei nicht lesen: {}", fehler),
    }
}
```

### Typische Einsteigerfehler bei Result

```rust
// ❌ Fehler 1: unwrap() in produktivem Code verwenden
// let zahl: i32 = "keine Zahl".parse().unwrap(); // Panic! Programm stürzt ab!
// ✅ Lösung: match, if let oder unwrap_or verwenden.

// ❌ Fehler 2: Result-Wert ignorieren
// dividiere(10.0, 0.0); // Compiler-Warnung: "unused `Result` that must be used"
// ✅ Lösung: Immer mit dem Result umgehen oder mit let _ = ... explizit ignorieren.

// ❌ Fehler 3: ? in Funktionen ohne Result-Rückgabetyp verwenden
// fn main() {
//     let text = fs::read_to_string("datei.txt")?; // Fehler! main gibt () zurück.
// }
// ✅ Lösung: main() kann auch Result zurückgeben:
// fn main() -> Result<(), Box<dyn std::error::Error>> { ... }
```

---

## 🔍 2. Fehlerbehandlung mit Option\<T\>

### Die Analogie: Die Suchfunktion im Wörterbuch

Wenn du in einem Wörterbuch ein Wort suchst, gibt es zwei Möglichkeiten: Du findest die Übersetzung (`Some`) oder das Wort ist nicht drin (`None`). Eine gute Suchfunktion stürzt nicht ab, wenn das Wort fehlt – sie teilt dir einfach mit, dass kein Ergebnis gefunden wurde.

### Theorie: Der Option-Enum

```rust
// Option ist wie Result, aber ohne Fehlerbeschreibung:
// enum Option<T> {
//     Some(T), // Ein Wert ist vorhanden
//     None,    // Kein Wert vorhanden
// }

// Beispiel: Suche in einem Vec
fn finde_ersten_geraden(zahlen: &[i32]) -> Option<i32> {
    for &zahl in zahlen {
        if zahl % 2 == 0 {
            return Some(zahl); // Gefunden!
        }
    }
    None // Nichts gefunden
}

fn main() {
    let zahlen = vec![1, 3, 5, 4, 7];

    // Variante 1: match
    match finde_ersten_geraden(&zahlen) {
        Some(zahl) => println!("Erste gerade Zahl: {}", zahl),
        None       => println!("Keine gerade Zahl gefunden."),
    }

    // Variante 2: if let
    if let Some(wert) = finde_ersten_geraden(&zahlen) {
        println!("Gefunden: {}", wert);
    }

    // Variante 3: unwrap_or – Standardwert wenn None
    let ergebnis = finde_ersten_geraden(&[1, 3, 5]).unwrap_or(-1);
    println!("Ergebnis: {}", ergebnis); // -1 (Fallback)

    // Variante 4: map – Wert transformieren wenn Some
    let verdoppelt = finde_ersten_geraden(&zahlen).map(|x| x * 2);
    println!("{:?}", verdoppelt); // Some(8)

    // Hilfsmethoden
    let x: Option<i32> = Some(5);
    println!("Ist Some: {}", x.is_some()); // true
    println!("Ist None: {}", x.is_none()); // false
}
```

### Typische Einsteigerfehler bei Option

```rust
// ❌ Fehler 1: Direkter Zugriff auf Option ohne Prüfung
// let zahlen: Vec<i32> = vec![1, 2, 3];
// let erster: i32 = zahlen.first(); // Fehler! first() gibt Option<&i32> zurück.
// ✅ Lösung: zahlen.first().copied().unwrap_or(0)

// ❌ Fehler 2: Option mit None in Berechnungen verwenden
// let x: Option<i32> = None;
// let y = x + 1; // Fehler! Kann nicht mit Option rechnen.
// ✅ Lösung: x.unwrap_or(0) + 1 oder x.map(|v| v + 1)

// ❌ Fehler 3: Option und Result verwechseln
// Option hat kein Err-Äquivalent – es gibt einfach nichts.
// Result hat eine Fehlerbeschreibung.
// Faustregel: Fehlschlag mit Grund → Result. Fehlende Daten → Option.
```

---

## 🗃️ 3. Vektoren (Vec\<T\>)

### Die Analogie: Die dynamische Einkaufsliste

Ein normales Array in Rust ist wie ein beschriftetes, unveränderbares Regal – du weißt beim Bauen genau, wie viele Fächer es hat. Ein `Vec<T>` hingegen ist wie eine Einkaufsliste auf einem Zettel: Du kannst jederzeit neue Punkte hinzufügen, welche durchstreichen und der Zettel wächst ganz automatisch mit.

### Theorie: Vektoren erstellen und befüllen

```rust
fn main() {
    // Einen leeren Vec erstellen (Typ muss annotiert werden)
    let mut zahlen: Vec<i32> = Vec::new();

    // Elemente hinzufügen
    zahlen.push(10);
    zahlen.push(20);
    zahlen.push(30);
    println!("{:?}", zahlen); // [10, 20, 30]

    // Kurzschreibweise mit vec!-Makro
    let fruechte = vec!["Apfel", "Banane", "Kirsche"];

    // Auf Elemente zugreifen
    // Methode 1: Index [] – GEFÄHRLICH, Panic bei out of bounds!
    println!("Erste Frucht: {}", fruechte[0]);

    // Methode 2: .get() – SICHER, gibt Option<&T> zurück
    match fruechte.get(10) { // Index 10 existiert nicht!
        Some(frucht) => println!("Gefunden: {}", frucht),
        None         => println!("Index existiert nicht."), // Kein Absturz!
    }

    // Iterieren
    for frucht in &fruechte { // & um Ownership zu behalten
        println!("Ich mag: {}", frucht);
    }

    // Nützliche Methoden
    println!("Anzahl: {}", zahlen.len());        // Länge
    println!("Leer? {}", zahlen.is_empty());    // false
    zahlen.pop();                                // Letztes Element entfernen
    println!("Nach pop: {:?}", zahlen);          // [10, 20]

    // Sortieren
    let mut unsortiert = vec![3, 1, 4, 1, 5, 9, 2];
    unsortiert.sort();
    println!("Sortiert: {:?}", unsortiert); // [1, 1, 2, 3, 4, 5, 9]

    // Filtern mit retain
    let mut gerade = vec![1, 2, 3, 4, 5, 6];
    gerade.retain(|&x| x % 2 == 0);
    println!("Nur gerade: {:?}", gerade); // [2, 4, 6]
}
```

### Theorie: Ownership und Vektoren

```rust
// Wenn du einen Vec in eine Funktion übergibst, verlierst du die Ownership!
let namen = vec!["Anna", "Bob", "Clara"];

fn drucke_namen(liste: Vec<&str>) { // Ownership wird übernommen
    for name in liste {
        println!("{}", name);
    }
} // liste wird hier gelöscht

drucke_namen(namen);
// println!("{:?}", namen); // ❌ Fehler! namen wurde bewegt (moved).

// ✅ Lösung: Als Referenz übergeben
let namen2 = vec!["Anna", "Bob", "Clara"];
fn drucke_namen_ref(liste: &Vec<&str>) {
    for name in liste {
        println!("{}", name);
    }
}
drucke_namen_ref(&namen2);
println!("Noch da: {:?}", namen2); // ✅ namen2 ist noch gültig!

// Noch idiomatischer: &[&str] statt &Vec<&str>
fn drucke_namen_slice(liste: &[&str]) {
    for name in liste { println!("{}", name); }
}
drucke_namen_slice(&namen2); // ✅
```

### Typische Einsteigerfehler bei Vektoren

```rust
// ❌ Fehler 1: Index-Zugriff außerhalb des Bereichs (Panic!)
// let v = vec![1, 2, 3];
// println!("{}", v[5]); // PANIC: index out of bounds: the len is 3 but the index is 5
// ✅ Lösung: v.get(5) verwenden, das Option<&i32> zurückgibt.

// ❌ Fehler 2: Vektor verändern während er iteriert wird
// let mut v = vec![1, 2, 3];
// for x in &v {
//     v.push(*x * 2); // Fehler! Kann nicht ändern während ausgeliehen.
// }
// ✅ Lösung: Neuen Vec erstellen oder indices verwenden.

// ❌ Fehler 3: Vec<&str> mit lokalen Strings befüllen (Lifetime-Problem)
// fn erzeuge_liste() -> Vec<&str> { // Fehler: missing lifetime specifier
//     let s = String::from("hallo");
//     vec![&s] // s wird am Ende der Funktion gelöscht!
// }
// ✅ Lösung: Vec<String> zurückgeben statt Vec<&str>.
```

---

## 🗺️ 4. HashMaps (HashMap\<K, V\>)

### Die Analogie: Das Telefonbuch

Eine HashMap ist wie ein digitales Telefonbuch: Du kennst den Namen (Schlüssel/Key) und kannst sofort die Telefonnummer (Wert/Value) nachschlagen, ohne das gesamte Buch von vorne bis hinten durchsuchen zu müssen. Das Nachschlagen ist extrem schnell – nahezu unabhängig davon, wie viele Einträge das Buch hat!

### Theorie: HashMaps erstellen und verwenden

```rust
use std::collections::HashMap; // HashMap muss importiert werden!

fn main() {
    // Eine neue HashMap erstellen
    let mut telefonnummern: HashMap<String, String> = HashMap::new();

    // Einträge hinzufügen mit insert()
    telefonnummern.insert(String::from("Anna"), String::from("0171-1234567"));
    telefonnummern.insert(String::from("Bob"),  String::from("0172-9876543"));

    // Mit vec! und zip initialisieren
    let namen = vec!["Clara", "David"];
    let nummern = vec!["0173-111", "0174-222"];
    let verzeichnis: HashMap<_, _> = namen.iter().zip(nummern.iter()).collect();

    // Wert nachschlagen mit get() – gibt Option<&V> zurück
    match telefonnummern.get("Anna") {
        Some(nummer) => println!("Annas Nummer: {}", nummer),
        None         => println!("Anna nicht gefunden."),
    }

    // Iterieren über alle Einträge (Reihenfolge ist NICHT garantiert!)
    for (name, nummer) in &telefonnummern {
        println!("{}: {}", name, nummer);
    }

    // Enthält einen Schlüssel?
    println!("Enthält Bob: {}", telefonnummern.contains_key("Bob")); // true

    // Eintrag entfernen
    telefonnummern.remove("Bob");

    // Länge
    println!("Einträge: {}", telefonnummern.len());
}
```

### Theorie: Die Entry-API (Modernes Einfügen)

Die Entry-API ist das eleganteste Werkzeug für HashMaps. Sie löst das Problem "Füge ein, wenn nicht vorhanden; aktualisiere wenn vorhanden" in einer einzigen Zeile.

```rust
use std::collections::HashMap;

fn main() {
    let text = "hallo welt hallo rust welt welt";

    // Wörter zählen mit Entry-API
    let mut wort_zaehler: HashMap<&str, u32> = HashMap::new();

    for wort in text.split_whitespace() {
        // entry(): Gibt einen Entry (Eintragsreferenz) zurück.
        // or_insert(): Fügt 0 ein wenn nicht vorhanden, gibt Referenz auf den Wert zurück.
        let zaehler = wort_zaehler.entry(wort).or_insert(0);
        *zaehler += 1; // Wert über Referenz erhöhen (Dereferenzierung mit *)
    }

    println!("{:?}", wort_zaehler);
    // {"hallo": 2, "welt": 3, "rust": 1} (Reihenfolge kann variieren)

    // or_insert_with: Nur berechnen wenn wirklich nötig (lazy)
    let mut cache: HashMap<String, Vec<i32>> = HashMap::new();
    cache.entry(String::from("evens")).or_insert_with(|| {
        (0..10).filter(|x| x % 2 == 0).collect()
    });
}
```

### Theorie: Ownership bei HashMaps

```rust
use std::collections::HashMap;

// Achtung: Wenn du einen String als Key einfügst, übernimmt die HashMap die Ownership!
let mut map: HashMap<String, i32> = HashMap::new();

let schluessel = String::from("punkte");
let wert = 100;

map.insert(schluessel, wert);
// println!("{}", schluessel); // ❌ Fehler! schluessel wurde in die Map bewegt.

// i32 implementiert Copy, deshalb bleibt wert gültig:
println!("{}", wert); // ✅

// Lösung: Referenz als Key (wenn der Wert länger lebt als die Map)
let s = String::from("name");
let mut map2: HashMap<&str, i32> = HashMap::new();
map2.insert(&s, 42); // Referenz – s bleibt Besitzer
println!("{}", s); // ✅ s ist noch gültig
```

### Typische Einsteigerfehler bei HashMaps

```rust
// ❌ Fehler 1: HashMap ohne Import verwenden
// let map = HashMap::new(); // Fehler: use of undeclared type `HashMap`
// ✅ Lösung: use std::collections::HashMap; oben hinzufügen.

// ❌ Fehler 2: Direkter Index-Zugriff auf nicht vorhandenen Key (Panic!)
// let map: HashMap<&str, i32> = HashMap::new();
// let wert = map["nichtVorhanden"]; // PANIC!
// ✅ Lösung: map.get("nichtVorhanden") verwenden.

// ❌ Fehler 3: Reihenfolge der Einträge erwarten
// HashMaps garantieren KEINE bestimmte Reihenfolge der Elemente!
// ✅ Lösung: Für sortierte Ausgabe: let mut schluessel: Vec<_> = map.keys().collect();
//           schluessel.sort(); for k in schluessel { ... }
```

---

## 🚀 Wie du diese Phase am besten nutzt

**1. Verstehe den Unterschied:** `Result` ist für Operationen, die aus einem guten Grund fehlschlagen können (Datei nicht gefunden, ungültige Eingabe). `Option` ist für Werte, die einfach fehlen können (kein Element gefunden, optionales Feld).

**2. Vermeide unwrap() im echten Code:** Gewöhne dir von Anfang an an, mit `match`, `if let` oder `unwrap_or` zu arbeiten. Dein Programm wird dadurch nie unerwartet abstürzen.

**3. Wähle die richtige Kollektion:**
- Brauchst du eine geordnete, indizierbare Liste? → `Vec<T>`
- Brauchst du schnellen Zugriff über einen Schlüssel? → `HashMap<K, V>`

**4. Kombiniere alles:** Die Stärke dieser Phase liegt in der Kombination. Eine `HashMap<String, Vec<String>>` (Schlüssel zu Liste von Werten) oder `Vec<Result<i32, String>>` (Liste von Ergebnissen) sind völlig normal.

> [!TIP]
> Lese den Absatz aus den 100-Projekten für Phase 3, bevor du mit dem Prompt-Katalog beginnst. Viele der dort gezeigten Muster (z.B. `HashMap::entry().or_insert()`) werden sich in deinen eigenen Projekten immer wiederholen.

---

## 📌 Merkzettel: Phase 3 auf einen Blick

> [!IMPORTANT]
> **Die 4 Kernkonzepte der Phase 3:**
>
> * **Result\<T, E\>:** Für Operationen, die fehlschlagen können. `Ok(wert)` bei Erfolg, `Err(fehler)` bei Misserfolg. Mit `match` oder `?` (Weiterleitungsoperator) sicher handhaben. NIEMALS `unwrap()` in produktivem Code verwenden!
>
> * **Option\<T\>:** Für Werte, die fehlen können (kein Fehlergrund). `Some(wert)` wenn vorhanden, `None` wenn nicht. Sicher entpacken mit `match`, `if let`, `unwrap_or(standardwert)` oder `map(|x| ...)`.
>
> * **Vec\<T\>:** Eine dynamische, wachsende Liste auf dem Heap. Zugriff mit `[]` (Panic bei out of bounds!) oder sicher mit `.get()` (gibt `Option`). Ownership beim Übergeben an Funktionen beachten – besser als `&[T]` übergeben.
>
> * **HashMap\<K, V\>:** Ein Schlüssel-Wert-Speicher mit sehr schnellem Zugriff (O(1)). Import nötig! Zugriff mit `.get(key)` (gibt `Option`). Die Entry-API (`.entry(key).or_insert(wert)`) ist der idiomatische Weg zum sicheren Einfügen und Aktualisieren.
