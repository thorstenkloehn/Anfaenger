# Konzepte statt Syntax lernen (Phase 1)

Oft ist es am Anfang hilfreicher, die **Idee** hinter einer Technik zu verstehen, als sich sofort Code-Zeilen zu merken. In Phase 1 dreht sich alles um diese Kern-Konzepte. Bevor du eine Zeile Code schreibst, lies dieses Kapitel sorgfältig durch – denn wenn du die Konzepte verstehst, schreibt sich der Code fast von selbst!

---

## 🧱 1. Variablen & Datentypen

### Die Analogie: Kisten mit Etiketten

Stell dir deinen Arbeitsspeicher wie ein riesiges Lagerregal mit unzähligen Kisten vor. Jede Kiste hat ein Etikett (den Variablennamen) und einen Inhalt (den Wert). In Rust gibt es jedoch eine besondere Regel: Alle Kisten sind standardmäßig versiegelt! Das bedeutet, sobald du etwas in eine Kiste gelegt hast, kannst du den Inhalt nicht mehr verändern – es sei denn, du hast beim Aufstellen der Kiste ausdrücklich gesagt, dass sie veränderbar sein soll.

### Theorie: Unveränderbarkeit (Immutability)

Rust trifft hier eine bewusste Design-Entscheidung, die viele andere Sprachen nicht kennen: **Variablen sind standardmäßig unveränderbar (immutable)**. Das ist keine Einschränkung, sondern ein Schutzschild! Der Compiler verhindert damit ganze Klassen von Programmierfehlern, bei denen ein Wert unbeabsichtigt verändert wird.

```rust
// Eine normale, unveränderbare Variable.
// Das Etikett lautet "punkte", der Inhalt ist 100.
let punkte = 100;

// Das hier würde ein Compilerfehler geben!
// "Cannot assign twice to immutable variable"
// punkte = 200; // ❌ Fehler!

// Eine veränderbare Variable (mit `mut` gekennzeichnet).
// Jetzt ist die Kiste entsperrt.
let mut leben = 3;
println!("Leben zu Beginn: {}", leben);

leben = 2; // ✅ Das ist erlaubt!
println!("Leben nach Treffer: {}", leben);
```

### Theorie: Datentypen – Was passt in die Kiste?

Jede Variable in Rust hat einen Typ. Der Typ bestimmt, welche Art von Daten die "Kiste" aufnehmen kann und wie viel Speicherplatz sie belegt. Rust kann den Typ oft selbst herausfinden (Typinferenz), aber du kannst ihn auch explizit angeben.

```rust
// Ganze Zahlen (Integer)
// i = signed (vorzeichenbehaftet, kann negativ sein)
// u = unsigned (vorzeichenlos, nur positiv)
// Die Zahl dahinter ist die Bitbreite (8, 16, 32, 64, 128)
let alter: u8 = 25;          // Vorzeichenlos, 8-Bit (0 bis 255)
let kontostand: i32 = -500;  // Vorzeichenbehaftet, 32-Bit (Standard für ganze Zahlen)
let einwohner: u64 = 8_300_000_000; // Unterstriche erlaubt für Lesbarkeit!

// Gleitkommazahlen (Floating Point)
let preis: f64 = 19.99;  // 64-Bit Gleitkomma (Standard, empfohlen)
let pi: f32 = 3.14;      // 32-Bit Gleitkomma (weniger präzise)

// Wahrheitswerte (Boolean)
let ist_eingeloggt: bool = true;
let ist_admin: bool = false;

// Zeichen (Character) – immer in einfachen Anführungszeichen!
// Rust-Chars sind Unicode-Skalare (4 Byte), also kein reines ASCII!
let buchstabe: char = 'A';
let emoji: char = '🚀'; // Auch das ist ein gültiger char!

// Tupel: Eine feste Sammlung von Werten verschiedener Typen
let koordinate: (f64, f64) = (51.5074, -0.1278); // London
let (breitengrad, laengengrad) = koordinate; // Destrukturierung

// Arrays: Eine feste Sammlung von Werten DESSELBEN Typs
let wochentage: [&str; 7] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
println!("Erster Tag: {}", wochentage[0]);
```

### Theorie: Shadowing (Variable verdecken)

Eine besondere Rust-Eigenheit: Du kannst eine Variable neu deklarieren und dabei denselben Namen verwenden. Die neue Variable "verdeckt" die alte.

```rust
let zahl = 5;
println!("Zahl: {}", zahl); // Ausgabe: 5

// Shadowing: Neues 'let', gleicher Name
let zahl = zahl * 2; // Die alte 'zahl' wird verdeckt
println!("Zahl verdoppelt: {}", zahl); // Ausgabe: 10

// Shadowing erlaubt sogar den Typwechsel!
let farbe = "blau";    // &str
let farbe = farbe.len(); // usize (Anzahl der Zeichen)
println!("Länge: {}", farbe); // Ausgabe: 4
```

> [!NOTE]
> Der Unterschied zwischen `let mut` und Shadowing: Mit `mut` änderst du den Wert in derselben Kiste. Mit Shadowing erstellst du eine komplett neue Kiste mit demselben Etikett. Das ist besonders nützlich, wenn du den Typ ändern möchtest.

### Typische Einsteigerfehler bei Variablen

```rust
// ❌ Fehler 1: Zuweisung an unveränderbare Variable
let punkte = 10;
// punkte = 20; // Fehler: "cannot assign twice to immutable variable `punkte`"
// ✅ Lösung: let mut punkte = 10;

// ❌ Fehler 2: Variable ohne Initialisierung verwenden
// let x: i32;
// println!("{}", x); // Fehler: "use of possibly-uninitialized variable: `x`"
// ✅ Lösung: Immer einen Startwert vergeben.

// ❌ Fehler 3: Ganzzahl-Überlauf im Debug-Modus
// let zu_gross: u8 = 300; // Fehler: "literal out of range for `u8`"
// ✅ Lösung: Den richtigen Typ wählen (u16, u32...).
```

---

## 🔀 2. Kontrollfluss

### Die Analogie: Wegweiser und Ampeln

Ohne Kontrollfluss würde dein Programm wie ein Roboter auf Schienen laufen – immer geradeaus, von oben nach unten, ohne auf irgendetwas zu reagieren. Kontrollfluss gibt deinem Programm die Fähigkeit, Entscheidungen zu treffen (Wegweiser) und Dinge zu wiederholen (Kreisverkehr).

### Theorie: if / else if / else – Entscheidungen treffen

```rust
let temperatur: i32 = 22;

if temperatur < 0 {
    println!("Vereist! Achtung Rutschgefahr.");
} else if temperatur < 10 {
    println!("Kalt. Zieh eine Jacke an.");
} else if temperatur < 25 {
    println!("Angenehm. Perfektes Wetter.");
} else {
    println!("Heiß! Trink viel Wasser.");
}

// Wichtig: if ist in Rust ein AUSDRUCK (Expression), kein Statement!
// Das bedeutet, er kann einen Wert zurückgeben.
let bewertung = if temperatur > 20 { "gut" } else { "schlecht" };
println!("Wetter ist: {}", bewertung);
```

### Theorie: loop – Die Endlosschleife

`loop` läuft für immer, bis du es mit `break` unterbrichst. Es ist die einfachste, aber mächtigste Schleife in Rust.

```rust
let mut zaehler = 0;

// loop kann mit break einen Wert zurückgeben!
let ergebnis = loop {
    zaehler += 1;

    if zaehler == 5 {
        break zaehler * 10; // Gibt 50 zurück
    }
};

println!("Das Ergebnis ist: {}", ergebnis); // Ausgabe: 50
```

### Theorie: while – Bedingungsschleife

`while` läuft, solange eine Bedingung wahr ist. Perfekt, wenn du nicht weißt, wie oft die Schleife laufen wird.

```rust
let mut leben = 3;

while leben > 0 {
    println!("Du hast noch {} Leben.", leben);
    leben -= 1;
}

println!("Game Over!");
```

### Theorie: for – Iterationsschleife

`for` ist die häufigste und sicherste Schleife in Rust. Sie durchläuft eine Kollektion oder einen Zahlenbereich. Im Gegensatz zu anderen Sprachen gibt es kein klassisches `for (int i = 0; i < 10; i++)`.

```rust
// Einen Bereich durchlaufen (exklusives Ende mit ..)
for i in 0..5 {
    print!("{} ", i); // Ausgabe: 0 1 2 3 4
}
println!();

// Einen Bereich durchlaufen (inklusives Ende mit ..=)
for i in 1..=5 {
    print!("{} ", i); // Ausgabe: 1 2 3 4 5
}
println!();

// Eine Kollektion durchlaufen
let fruechte = ["Apfel", "Banane", "Kirsche"];
for frucht in fruechte {
    println!("Ich esse: {}", frucht);
}

// Mit Index: enumerate()
for (index, frucht) in fruechte.iter().enumerate() {
    println!("Position {}: {}", index, frucht);
}

// continue: Aktuellen Durchlauf überspringen
for i in 0..10 {
    if i % 2 == 0 {
        continue; // Gerade Zahlen überspringen
    }
    print!("{} ", i); // Ausgabe: 1 3 5 7 9
}
```

### Typische Einsteigerfehler beim Kontrollfluss

```rust
// ❌ Fehler 1: Klammern um die if-Bedingung (wie in C/Java)
// if (x > 5) { ... } // Zwar erlaubt, aber unidiomatic! Compiler warnt.
// ✅ Lösung: if x > 5 { ... }

// ❌ Fehler 2: Semikolon nach dem letzten Ausdruck in einem Block
// let wert = if true { 42; } else { 0; }; // Fehler: Typ ist (), nicht i32
// ✅ Lösung: Kein Semikolon am Ende des Rückgabe-Ausdrucks!
// let wert = if true { 42 } else { 0 };

// ❌ Fehler 3: Endlosschleife ohne break
// loop { println!("Immer!"); } // Dieses Programm läuft ewig!
// ✅ Lösung: Immer eine Abbruchbedingung einbauen.
```

---

## ⌨️ 3. Benutzereingabe & Konvertierung

### Die Analogie: Der Dolmetscher

Der Computer versteht nur zwei Dinge: Nullen und Einsen. Wenn du etwas tippst, ist es für das Programm zunächst nur eine Folge von Textzeichen – selbst wenn du die Zahl `42` eingibst. Rust hat deshalb einen strikten "Dolmetscher", der sicherstellt, dass du immer explizit sagst, was du mit dem eingegebenen Text machen willst.

### Theorie: Text von der Konsole lesen

```rust
use std::io; // Das io-Modul (Input/Output) aus der Standardbibliothek importieren

fn main() {
    println!("Wie heißt du?");

    // Ein neuer, leerer, veränderbarer String als "Empfangsbehälter"
    let mut name = String::new();

    // stdin() = Standardeingabe (Tastatur)
    // read_line() = Eine Zeile einlesen
    // &mut name = Wir leihen der Funktion unseren Behälter AUS (veränderbare Referenz),
    //             damit sie den Text direkt dort hineinspeichern kann.
    // .expect() = Falls etwas schiefgeht (z.B. kein Terminal), Programm mit Meldung beenden.
    io::stdin()
        .read_line(&mut name)
        .expect("Fehler beim Lesen der Eingabe");

    // .trim() entfernt Leerzeichen UND den Zeilenumbruch (\n oder \r\n) am Ende.
    // Dieser Zeilenumbruch entsteht automatisch, wenn du Enter drückst!
    let name = name.trim();

    println!("Hallo, {}!", name);
}
```

### Theorie: Text in Zahlen konvertieren (Parsen)

Das Lesen einer Zahl von der Konsole erfordert immer zwei Schritte:
1. Text einlesen
2. Text in Zahl umwandeln (parsen)

```rust
use std::io;

fn main() {
    println!("Gib dein Alter ein:");

    let mut eingabe = String::new();
    io::stdin()
        .read_line(&mut eingabe)
        .expect("Fehler beim Lesen");

    // .trim() um Zeilenumbruch zu entfernen
    // .parse() versucht, den Text in den angegebenen Typ umzuwandeln.
    // : u32 sagt Rust, welchen Typ wir erwarten.
    // .expect() beendet das Programm, falls der Text keine gültige Zahl ist.
    let alter: u32 = eingabe
        .trim()
        .parse()
        .expect("Das war keine gültige Zahl!");

    println!("Du bist {} Jahre alt.", alter);

    // Robustere Variante mit match (behandelt ungültige Eingaben sicher):
    let nochmal: Result<u32, _> = eingabe.trim().parse();
    match nochmal {
        Ok(zahl) => println!("Zahl erkannt: {}", zahl),
        Err(_)   => println!("Eingabe war keine gültige Zahl."),
    }
}
```

### Typische Einsteigerfehler bei Benutzereingabe

```rust
// ❌ Fehler 1: trim() vergessen vor dem Parsen
// Die eingelesene Zeile enthält immer einen \n am Ende!
// "42\n".parse::<u32>() schlägt fehl, weil "\n" keine Zahl ist.
// ✅ Lösung: IMMER .trim() vor .parse() aufrufen.

// ❌ Fehler 2: read_line ohne &mut
// io::stdin().read_line(name) // Fehler: erwartet &mut String
// ✅ Lösung: &mut vor den Variablennamen schreiben.

// ❌ Fehler 3: Direkter Zugriff auf den String-Wert nach parse ohne Fehlerbehandlung
// let zahl = eingabe.trim().parse(); // Typ ist Result<_, _>, nicht die Zahl!
// ✅ Lösung: .expect("...") oder match verwenden, um den Result-Wert auszupacken.
```

---

## 🧠 4. Ownership & Borrowing

### Die Analogie: Das Buch-System

Ownership ist das Herzstück von Rust und der Grund, warum Rust so sicher und schnell ist. Stell dir ein Buch vor:

- **Ownership (Besitz):** Jedes Buch gehört genau einer Person. Wenn du das Buch dauerhaft jemandem gibst, hast du es nicht mehr. Du kannst es nicht mehr lesen oder weitergeben.
- **Borrowing (Ausleihen):** Du kannst das Buch auch nur ausleihen. Der Entleiher darf es lesen, aber du bleibst der Besitzer. Am Ende bekommst du es zurück.
- **Mutable Borrowing:** Du kannst jemandem das Buch auch zum Bearbeiten geben. Aber: Es darf jeweils nur eine Person gleichzeitig Notizen reinschreiben (mutable reference), oder beliebig viele Personen dürfen es gleichzeitig lesen (immutable references) – aber niemals beides gleichzeitig!

### Theorie: Ownership-Regeln

Es gibt drei goldene Regeln:
1. Jeder Wert hat genau **einen Besitzer** (Owner).
2. Es kann immer nur **einen Besitzer** geben.
3. Wenn der Besitzer seinen Gültigkeitsbereich (Scope) verlässt, wird der Wert **automatisch gelöscht** (Drop).

```rust
{
    // 'buch' ist der Besitzer des Strings.
    let buch = String::from("Der Herr der Ringe");
    println!("Ich lese: {}", buch);

    // Hier endet der Scope von 'buch'.
    // Rust ruft automatisch drop(buch) auf.
    // Der Speicher wird freigegeben – ohne Garbage Collector!
}
// 'buch' existiert hier nicht mehr. Zugriff wäre ein Compilerfehler.
```

### Theorie: Move – Ownership übertragen

```rust
let s1 = String::from("Hallo");

// Die Ownership wird von s1 auf s2 VERSCHOBEN (Move).
// s1 ist danach ungültig!
let s2 = s1;

// println!("{}", s1); // ❌ Compilerfehler: "value borrowed here after move"
println!("{}", s2);   // ✅ s2 ist der neue Besitzer.

// Primitive Typen (i32, bool, char, f64, etc.) werden KOPIERT (Copy), nicht bewegt!
// Das ist möglich, weil sie auf dem Stack liegen und klein sind.
let x = 5;
let y = x; // x wird KOPIERT, nicht verschoben.
println!("x={}, y={}", x, y); // ✅ Beide sind gültig!
```

### Theorie: Borrowing – Ausleihen mit &

```rust
let buch = String::from("Rust Programmieren");

// Wir übergeben eine unveränderbare Referenz (&).
// Die Funktion 'lesen' leiht sich das Buch, besitzt es aber nicht.
fn lesen(text: &String) {
    println!("Lese: {}", text);
} // Die Referenz wird hier zurückgegeben (automatisch).

lesen(&buch); // & erzeugt eine Referenz
println!("Buch gehört noch mir: {}", buch); // ✅ Wir sind noch der Besitzer!

// Mehrere unveränderbare Referenzen gleichzeitig sind erlaubt.
let r1 = &buch;
let r2 = &buch;
println!("{} und {}", r1, r2); // ✅

// Veränderbare Referenzen (&mut):
let mut notizen = String::from("Kapitel 1: ");

fn schreiben(text: &mut String) {
    text.push_str("Ownership erklärt.");
}

schreiben(&mut notizen);
println!("{}", notizen); // Ausgabe: Kapitel 1: Ownership erklärt.
```

### Theorie: Die Borrow-Checker-Regeln

```rust
let mut s = String::from("Text");

// Regel: Entweder EINE veränderbare ODER beliebig viele unveränderbare Referenzen.
let r1 = &s;     // unveränderbar
let r2 = &s;     // unveränderbar - OK, mehrere gleichzeitig erlaubt
// let r3 = &mut s; // ❌ Fehler! Kann nicht gleichzeitig mit r1 und r2 existieren.

println!("{} und {}", r1, r2);
// Hier enden r1 und r2 (letzter Einsatz oben).

let r3 = &mut s; // ✅ Jetzt ist es erlaubt, da r1 und r2 nicht mehr aktiv sind.
r3.push_str(" erweitert");
println!("{}", r3);
```

### Typische Einsteigerfehler bei Ownership

```rust
// ❌ Fehler 1: Nach einem Move auf die ursprüngliche Variable zugreifen
let v1 = vec![1, 2, 3];
let v2 = v1; // Move!
// println!("{:?}", v1); // Fehler: value borrowed here after move
// ✅ Lösung: v1.clone() für eine tiefe Kopie, oder &v1 für eine Referenz.

// ❌ Fehler 2: Gleichzeitig mutable und immutable Referenzen
let mut zahl = 5;
let leser = &zahl;          // unveränderbare Referenz
// let schreiber = &mut zahl; // Fehler! Kann nicht gleichzeitig existieren.
// ✅ Lösung: Referenzen nacheinander, nicht gleichzeitig verwenden.

// ❌ Fehler 3: Eine Referenz, die länger lebt als der Wert (Dangling Reference)
// fn erzeugeReferenz() -> &String {
//     let s = String::from("kurzlebig");
//     &s // Fehler! s wird am Ende der Funktion gelöscht.
// }
// ✅ Lösung: Den String selbst zurückgeben, nicht eine Referenz darauf.
```

---

## 📝 5. String vs. &str

### Die Analogie: Notizbuch vs. Aushang

Stell dir zwei Arten vor, Text festzuhalten:

- **`String`** ist dein eigenes **Notizbuch**. Du besitzt es, du kannst jederzeit etwas hineinschreiben, Seiten hinzufügen oder rausreißen. Es liegt in deiner Schreibtischschublade (Heap-Speicher).
- **`&str`** (String Slice) ist ein **Aushang an einer Pinnwand**. Du kannst ihn lesen und auf ihn zeigen, aber du kannst ihn nicht verändern und du besitzt ihn nicht. Er ist fest eingebaut (oft im Programmcode selbst oder als Referenz auf einen `String`).

### Theorie: Die Unterschiede im Detail

```rust
// &str: Ein String-Literal, direkt im kompilierten Programm eingebettet.
// Es ist eine Referenz auf einen unveränderlichen Text.
// Lebt so lange wie das gesamte Programm ('static Lifetime).
let begruessing: &str = "Hallo, Welt!";

// String: Ein dynamischer, heap-allozierter, besessener String.
// Kann zur Laufzeit wachsen und verändert werden.
let mut nachricht: String = String::new(); // Leer
nachricht.push_str("Hallo"); // Text anhängen
nachricht.push('!');          // Einzelnes Zeichen anhängen
println!("{}", nachricht);    // Ausgabe: Hallo!

// String::from() erzeugt einen String aus einem &str
let owned: String = String::from("Ich bin ein owned String");

// Ein String kann als &str "ausgeliehen" werden (Deref-Coercion)
fn drucke(text: &str) { // Funktionen nehmen oft &str, weil es flexibler ist
    println!("{}", text);
}

drucke(&owned);      // ✅ String als &str ausleihen
drucke(begruessing); // ✅ &str direkt übergeben
```

### Theorie: Wichtige String-Methoden

```rust
let satz = String::from("  Rust ist großartig!  ");

// Leerzeichen/Zeilenumbrüche entfernen
let bereinigt = satz.trim();
println!("'{}'", bereinigt);

// Länge in Bytes (nicht Zeichen! Bei UTF-8 kann ein Zeichen mehrere Bytes sein)
println!("Länge: {} Bytes", bereinigt.len());

// Enthält einen Teilstring?
println!("Enthält 'Rust': {}", bereinigt.contains("Rust"));

// Zu Großbuchstaben
println!("{}", bereinigt.to_uppercase());

// Ersetzen
let neu = bereinigt.replace("großartig", "fantastisch");
println!("{}", neu);

// Aufteilen (split) – gibt einen Iterator zurück
let woerter: Vec<&str> = bereinigt.split_whitespace().collect();
println!("{:?}", woerter); // ["Rust", "ist", "großartig!"]

// Zwei Strings verbinden
let teil1 = String::from("Hello");
let teil2 = String::from(", World!");
// + operator: teil1 wird konsumiert! (Move)
let komplett = teil1 + &teil2;
println!("{}", komplett);
// println!("{}", teil1); // ❌ Fehler! teil1 wurde durch + konsumiert.

// Alternativ mit format! (verbraucht keine Strings)
let a = String::from("foo");
let b = String::from("bar");
let c = format!("{}{}", a, b); // a und b bleiben gültig
println!("{} {} {}", a, b, c);
```

### Typische Einsteigerfehler bei Strings

```rust
// ❌ Fehler 1: &str und String verwechseln in Funktionssignaturen
// fn begrüsse(name: String) { ... } // Zu restriktiv!
// Wenn du begrüsse("Max") aufrufst, muss "Max" erst in String::from("Max") gewandelt werden.
// ✅ Lösung: &str als Parameter nehmen – flexible für beide Typen.
// fn begrüsse(name: &str) { ... }

// ❌ Fehler 2: Indizierung eines Strings mit []
// let s = String::from("héllo");
// let h = s[0]; // ❌ Fehler! Strings unterstützen keinen Index-Zugriff.
// Grund: "é" ist 2 Bytes groß. s[0] wäre nur die Hälfte eines Zeichens.
// ✅ Lösung: s.chars().nth(0) für einzelne Unicode-Zeichen.

// ❌ Fehler 3: Vergessen, trim() vor dem Vergleich zu nutzen
// let eingabe = "Ja\n";
// if eingabe == "Ja" { ... } // Schlägt fehl wegen \n
// ✅ Lösung: if eingabe.trim() == "Ja" { ... }
```

---

## 🚀 Wie du diese Phase am besten nutzt

Der effektivste Lernweg durch Phase 1 ist ein klarer vierstufiger Prozess:

**1. Konzepte verstehen (diese Datei lesen)**
Lies dieses Kapitel ohne jeden Code auszuführen. Verstehe die Analogien. Stelle sicher, dass du die Frage "Warum macht Rust das so?" beantworten kannst.

**2. Passiv lesen (100 Mini-Projekte)**
Öffne das Kapitel [100 Projekte (Phase 1)](./100-projekte.md) und lies die Projekte eins nach dem anderen durch. Folge den didaktischen Kommentaren im Code. Du sollst nichts abtippen – du lernst hier wie ein Musikstudent, der Partituren liest.

**3. Aktiv codieren (Prompt-Katalog)**
Öffne das Kapitel [100 Projekte – Nur Prompts](./100-projekte-prompts.md). Such dir ein Projekt aus und erarbeite es Schritt für Schritt mit einer KI (z. B. Antigravity oder Claude). Schreibe den Code selbst – die KI gibt nur Hinweise.

**4. Wiederholen (Anki-Karten)**
Importiere die Datei `rust_anki_karten.csv` in Anki und übe täglich 10–15 Minuten. Spaced Repetition ist die effektivste Methode, um Syntax dauerhaft im Gedächtnis zu behalten.

> [!TIP]
> Kämpfe nicht zu lange mit dem Borrow Checker! Wenn du in Phase 1 nicht weiterkommst, fange mit einfachen Typen an (Integer, bool), die automatisch kopiert werden. Komplexe Ownership-Probleme werden in Phase 2 und 3 klarer.

---

## 📌 Merkzettel: Phase 1 auf einen Blick

> [!IMPORTANT]
> **Die 5 Kernkonzepte der Phase 1:**
>
> * **Variablen & Datentypen:** Variablen sind standardmäßig unveränderbar (`let`). Für Veränderbarkeit brauchst du `let mut`. Rust hat starke Typen (i32, u32, f64, bool, char) und kann sie meist selbst erkennen (Typinferenz).
>
> * **Kontrollfluss:** `if/else` sind Ausdrücke und können Werte zurückgeben. `loop` läuft ewig bis `break`, `while` läuft solange eine Bedingung gilt, `for … in` iteriert über Bereiche oder Kollektionen. Mit `continue` überspringst du den aktuellen Durchlauf.
>
> * **Benutzereingabe:** Jede Tastatureingabe ist zunächst Text (`String`). Um damit zu rechnen, musst du ihn erst mit `.parse()` in eine Zahl umwandeln. IMMER `.trim()` vor `.parse()` verwenden, um den Zeilenumbruch zu entfernen!
>
> * **Ownership & Borrowing:** Jeder Wert hat genau einen Besitzer. Wenn der Besitzer endet, wird der Wert gelöscht. Du kannst Werte mit `&` ausleihen (lesen) oder mit `&mut` veränderbar ausleihen. Niemals gleichzeitig unveränderbare und veränderbare Referenzen!
>
> * **String vs. &str:** `String` besitzt seinen Text (Heap, veränderbar, wächst). `&str` ist ein Lesefenster in einen Text (Stack/statisch, unveränderbar). Funktionsparameter nutzen meist `&str`, da es beides akzeptiert.
