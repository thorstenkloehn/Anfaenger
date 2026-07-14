# 📜 Deklarative Makros (`macro_rules!`) – Das Plätzchenform-Prinzip

Eine normale Funktion in Rust ist wie eine **Knetmaschine**: Du fütterst sie mit Zutaten (Parametern) einer bestimmten Sorte (Typen) und sie knetet zur Laufzeit ein Ergebnis daraus. Aber eine Funktion hat starre Regeln: Sie kann nicht einfach mal drei und mal fünf Zutaten annehmen, und sie kann keine neuen Küchengeräte (wie neue Variablen- oder Funktionsnamen) im Raum erschaffen.

Ein **deklaratives Makro** (`macro_rules!`) ist dagegen wie eine **Plätzchenform (Schablone)**.

Bevor der Teig überhaupt gebacken wird (also zur **Compile-Zeit**, vor der eigentlichen Programmausführung), drückt das Makro seine Form auf den rohen Quelltext. Der Compiler nimmt deine Schablone, vergleicht sie mit dem, was du hingeschrieben hast, und stanzt (generiert) den entsprechenden echten Rust-Code aus.

Das erlaubt uns zwei gewaltige Superkräfte:
1.  **Variable Anzahl an Argumenten (Varargs):** Funktionen in Rust haben immer eine feste Anzahl an Parametern. Makros wie `println!` oder `vec!` können dagegen beliebig viele Argumente entgegennehmen.
2.  **Boilerplate-Code einsparen:** Wir können sich wiederholende Programmmuster in eine einzige Schablone gießen, was uns Tipparbeit erspart und den Code lesbarer macht.

---

## 🧠 Theorie

### 1. Die Syntax von `macro_rules!`
Deklarative Makros funktionieren über **Pattern Matching** (Mustervergleich). Wir definieren ein Suchmuster. Wenn der Compiler dieses Muster im Code findet, ersetzt er es durch den definierten Code-Block.

Ein einfaches Makro, das eine Nachricht ausgibt:

```rust
// Mit diesem Attribut machen wir das Makro im gesamten Crate verfügbar
#[macro_export]
macro_rules! sage_hallo {
    // Suchmuster => Ersetzungscode
    () => {
        println!("Hallo aus dem Makro!");
    };
}

fn main() {
    // Aufruf immer mit einem Ausrufezeichen!
    sage_hallo!();
}
```

---

### 2. Designatoren: Muster mit Platzhaltern
Natürlich möchten wir dem Makro auch Daten übergeben. Dafür nutzen wir Variablen, die mit einem Dollarzeichen `$` eingeleitet werden, gefolgt von einem **Designator** (Typ-Filter für den Parser):

Die wichtigsten Designatoren:
*   **`expr`** (Expression): Für mathematische Ausdrücke oder Werte (z. B. `5 + 3`, `x`, `"Text"`).
*   **`ident`** (Identifier): Für Namen von Variablen, Funktionen oder Strukturen (z. B. `mein_zähler`).
*   **`ty`** (Type): Für Rust-Datentypen (z. B. `i32`, `Vec<u8>`).
*   **`block`** (Block): Für einen in geschweiften Klammern gefassten Code-Block.

Beispiel für ein Makro, das eine mathematische Berechnung ausgibt und durchführt:

```rust
macro_rules! berechne_und_drucke {
    // Wir erwarten einen Ausdruck (expr) und nennen ihn 'aufgabe'
    ($aufgabe:expr) => {
        println!("Die Aufgabe '{}' ergibt: {}", stringify!($aufgabe), $aufgabe);
    };
}

fn main() {
    // stringify! macht aus dem Code-Ausdruck einen String "2 + 2"
    // Danach wird 2 + 2 ganz normal als Code ausgeführt
    berechne_und_drucke!(2 + 2); // Ausgabe: Die Aufgabe '2 + 2' ergibt: 4
}
```

---

### 3. Wiederholungen: Beliebig viele Argumente
Die wahre Stärke von Makros liegt in der Wiederholung von Mustern. Die Syntax dafür sieht so aus:
`$( ... ) separator repetition`

*   **`*`** steht für: 0 oder mehr Wiederholungen.
*   **`+`** steht für: 1 oder mehr Wiederholungen.

Bauen wir ein vereinfachtes `mein_vec!`-Makro, das beliebig viele durch Komma getrennte Elemente aufnimmt:

```rust
macro_rules! mein_vec {
    // $( $x:expr ),* bedeutet:
    // Suche nach Ausdrücken ($x:expr), die durch Komma (,) getrennt sind,
    // und wiederhole das Muster beliebig oft (*)
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            // Dieser Block wird für jede gefundene Wiederholung wiederholt:
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

fn main() {
    let liste = mein_vec![10, 20, 30];
    println!("Liste: {:?}", liste); // Ausgabe: [10, 20, 30]
}
```

---

### 4. Makro-Hygiene (Macro Hygiene)
Rust-Makros sind **hygienisch**. Das bedeutet, dass Variablen, die innerhalb eines Makros deklariert werden, nicht mit Variablen außerhalb des Makros kollidieren können, selbst wenn sie exakt denselben Namen haben.

```rust
macro_rules! erstelle_geheimnis {
    () => {
        let geheimnis = 999;
    };
}

fn main() {
    erstelle_geheimnis!();
    // ❌ Compilerfehler! 'geheimnis' existiert hier nicht.
    // println!("{}", geheimnis);
}
```
Das verhindert böse Überraschungen, wie sie in C/C++-Makros ständig vorkommen, wo Makros unbemerkt Variablen im umgebenden Code überschreiben können.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Makros skizzierst.

### Aufgabe 1: Das Begrüßungs-Makro 🗣️
Wir möchten ein Makro `begruesse!` entwerfen.
*   Wird es ohne Argument aufgerufen (`begruesse!()`), soll es `"Hallo Fremder!"` ausgeben.
*   Wird es mit einem Namen aufgerufen (`begruesse!("Timo")`), soll es `"Hallo Timo!"` ausgeben.
*   *Aufgabe:* Skizziere die zwei Muster-Regeln des Makros. Wie unterscheidest du die beiden Fälle syntaktisch?

### Aufgabe 2: Das Multiplikations-Makro ✖️
Wir wollen ein Makro `multipliziere!` schreiben, das beliebig viele Zahlen entgegennimmt, diese miteinander multipliziert und das Ergebnis zurückgibt.
*   Beispielaufruf: `let produkt = multipliziere![2, 3, 4];` (sollte 24 ergeben).
*   *Aufgabe:* Überlege, wie du den Akkumulator im Makro aufbaust. Welches Start-Muster und welche Wiederholungssyntax verwendest du? (Tipp: Starte mit dem Wert 1).

### Aufgabe 3: Der Designatoren-Detektiv 🔍
Ein Anfänger möchte ein Makro schreiben, das eine neue Variable deklariert. Er schreibt:
```rust
macro_rules! erstelle_variable {
    ($name:expr, $wert:expr) => {
        let $name = $wert; // ❌ Compiler-Fehler!
    };
}
```
*   *Aufgabe:* Warum bricht der Compiler ab? Welchen Designator muss der Entwickler anstelle von `expr` für den Parameternamen `$name` verwenden, damit Rust versteht, dass dies ein neuer Variablenname (Identifier) sein soll?

### Aufgabe 4: Das JSON-Gedankenspiel 🧩
Makros eignen sich hervorragend zum Bauen von strukturierten Daten-DSL (Domain Specific Languages).
*   Stell dir vor, du möchtest ein Makro schreiben, mit dem man JSON-Objekte direkt im Code deklarieren kann: `json!({ "name": "Alina", "alter": 25 })`.
*   *Aufgabe:* Welche Zeichen (Klammern, Doppelpunkte, Kommas) dienen hier als Trennzeichen im Suchmuster? Wie würdest du das Muster für ein einzelnes Schlüssel-Wert-Paar formulieren?

---

## 💡 Zusammenfassung

*   **Deklarative Makros** (`macro_rules!`) generieren Code zur Compile-Zeit über Mustervergleich.
*   Sie erlauben eine **variable Anzahl** an Argumenten.
*   **Designatoren** (wie `expr`, `ident`, `ty`) filtern die Eingaben für das Makro.
*   Mithilfe von **`$( ... ),*`** können Muster beliebig oft wiederholt werden.
*   **Makro-Hygiene** sorgt dafür, dass Makros keine Namenskonflikte mit lokalen Variablen des aufrufenden Scopes verursachen.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Makros (Englisch)](https://doc.rust-lang.org/book/ch19-06-macros.html#declarative-macros-with-macro_rules-for-general-metaprogramming)
*   [Die deutsche Übersetzung des Rust-Buchs: Makros (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch19-06-macros.html#deklarative-makros-mit-macro_rules-für-allgemeines-metaprogrammieren)
*   [The Little Book of Rust Macros (Ein tiefer, spezialisierter Guide für Makro-Experten - Englisch)](https://veykril.github.io/tlborm/)
*   [Konzept: Pattern Matching (Die Grundlage für Makro-Suchmuster)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-match.md)
