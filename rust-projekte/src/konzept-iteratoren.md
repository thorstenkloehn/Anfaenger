# 🔄 Iteratoren & Das Iterator-Trait – Das Sushi-Laufband-Prinzip

Stell dir vor, du sitzt in einem gemütlichen Running-Sushi-Restaurant. Direkt vor deiner Nase zieht ein **Sushi-Laufband** vorbei. 

Auf dem Laufband kommen nacheinander kleine Teller (die Elemente) angerollt. Du sitzt da und wartest geduldig.
*   Das Laufband selbst ist extrem faul (**lazy**). Solange du nicht den Arm ausstreckst und einen Teller herumnimmst, passiert im Programm nichts. Es wird kein Teller verbraucht und keine Energie verschwendet.
*   Jedes Mal, wenn du den Arm ausstreckst (die Methode **`.next()`** aufrufst), erhältst du entweder einen leckeren Teller (`Some(Sushi)`) oder – wenn die Küche Feierabend gemacht hat und das Band komplett leer ist – absolut nichts mehr (`None`).

Du musst dich als Gast nicht darum kümmern, wie das Sushi in der Küche zubereitet wurde, wie groß die Küche ist oder in welcher Reihenfolge die Köche die Teller auf das Band gelegt haben. Der Iterator (das Laufband) verbirgt all diese komplexen Details hinter einer einzigen, einfachen Schnittstelle.

Genau das machen **Iteratoren** in Rust! Sie ermöglichen es dir, eine Sequenz von Werten nacheinander abzuarbeiten, ohne die interne Struktur der Sammlung (Vektor, HashMap, Liste) kennen zu müssen.

---

## 🧠 Theorie

### 1. Das `Iterator`-Trait
In Rust sind alle Iteratoren über ein einziges Trait aus der Standardbibliothek definiert: `std::iter::Iterator`.

Die Definition sieht vereinfacht so aus:

```rust
trait Iterator {
    type Item; // Der Typ der Elemente (Associated Type)

    // Die einzige Methode, die wir zwingend implementieren müssen!
    fn next(&mut self) -> Option<Self::Item>;
}
```

Die Methode `next` gibt eine `Option` zurück:
*   `Some(wert)`: Es gibt ein weiteres Element in der Sequenz.
*   `None`: Der Iterator ist am Ende angekommen.

---

### 2. Einen eigenen Iterator bauen
Um das Prinzip zu verstehen, bauen wir einen eigenen Iterator. Wir erstellen ein Struct `Counter`, das von 1 bis zu einem bestimmten Maximum zählt.

```rust
struct Counter {
    aktuell: u32,
    max: u32,
}

impl Counter {
    // Hilfsfunktion zum Erstellen
    fn new(max: u32) -> Counter {
        Counter { aktuell: 0, max }
    }
}

// Wir implementieren das Iterator-Trait für unser Struct
impl Iterator for Counter {
    type Item = u32; // Der Iterator gibt u32-Zahlen zurück

    fn next(&mut self) -> Option<Self::Item> {
        if self.aktuell < self.max {
            self.aktuell += 1;
            Some(self.aktuell) // Die nächste Zahl zurückgeben
        } else {
            None // Am Limit angekommen!
        }
    }
}

fn main() {
    let mut mein_counter = Counter::new(3);

    // Wir rufen next() manuell auf
    assert_eq!(mein_counter.next(), Some(1));
    assert_eq!(mein_counter.next(), Some(2));
    assert_eq!(mein_counter.next(), Some(3));
    assert_eq!(mein_counter.next(), None);
}
```

---

### 3. Warum Iteratoren "lazy" (faul) sind
Iteratoren tun nichts, solange wir sie nicht konsumieren. Das folgende Programm gibt absolut nichts aus und verbraucht fast keine Rechenleistung:

```rust
fn main() {
    // Wir erstellen einen Iterator über den Zahlenbereich 1 bis 1.000.000.
    // Aber wir rufen niemals next() auf! Es passiert nichts.
    let _millionen_zahlen = (1..1_000_000).map(|x| x * 2);
}
```

Erst wenn wir Methoden aufrufen, die den Iterator aktiv leersaugen (sogenannte *konsumierende Adaptoren* wie `collect()`, `sum()` oder eine `for`-Schleife), fängt das Laufband an sich zu bewegen.

---

### 4. Die drei Wege der Iteration: into_iter, iter, iter_mut
Wenn wir eine Collection (wie einen `Vec`) durchlaufen wollen, müssen wir entscheiden, was mit dem Besitzrecht (Ownership) der Elemente passieren soll. Rust bietet dafür drei Methoden:

1.  **`into_iter()` (Besitz übernehmen):**
    Konsumiert die Collection. Die Elemente werden aus dem Vektor herausbewegt. Der Vektor ist danach nicht mehr nutzbar.
2.  **`iter()` (Unveränderlich ausleihen):**
    Erzeugt einen Iterator über Referenzen (`&T`). Die Elemente verbleiben im Vektor. Ideal zum reinen Lesen.
3.  **`iter_mut()` (Veränderlich ausleihen):**
    Erzeugt einen Iterator über veränderliche Referenzen (`&mut T`). Ermöglicht es, die Elemente direkt in der Collection zu modifizieren.

```rust
fn main() {
    let mut namen = vec![String::from("Alina"), String::from("Ben")];

    // 1. Unveränderlich ausleihen (iter)
    for name in namen.iter() {
        println!("Name: {}", name); // 'name' ist vom Typ &String
    }

    // 2. Veränderlich ausleihen (iter_mut)
    for name in namen.iter_mut() {
        name.push_str(" WG"); // Namen direkt im Vektor ändern
    }

    // 3. Konsumieren (into_iter)
    for name in namen.into_iter() {
        println!("Konsumiere: {}", name); // 'name' ist vom Typ String (Besitz übertragen)
    }
    // ❌ namen ist ab hier nicht mehr gültig!
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Strukturen skizzierst und die logischen Abläufe planst.

### Aufgabe 1: Der Schrittzähler 🚶
Wir wollen ein Struct `Schrittzaehler` entwerfen.
*   Es soll ein Startwert und ein Limit (z. B. 10.000 Schritte) gespeichert werden.
*   Jeder Aufruf von `.next()` soll die Schritte um 1.000 erhöhen, bis das Limit erreicht ist.
*   *Aufgabe:* Skizziere das Struct und die Implementierung des `Iterator`-Traits. Welchen Typ hat `type Item`?

### Aufgabe 2: Der unendliche Iterator (Gedankenspiel) ♾️
Wir wollen einen Iterator namens `Fibonacci` bauen, der unendlich viele Zahlen der Fibonacci-Folge (1, 1, 2, 3, 5, 8, 13...) generiert.
*   Da die Folge unendlich ist, wird die Methode `.next()` niemals `None` zurückgeben, sondern immer `Some(nächste_zahl)`.
*   *Aufgabe:* Warum läuft der Arbeitsspeicher des Computers nicht voll, wenn wir diesen Iterator im Programm definieren? Was passiert, wenn wir `fibonacci_iterator.take(5)` aufrufen?

### Aufgabe 3: iter vs. into_iter 🧩
Ein Anfänger hat folgenden Code geschrieben und versteht den Compilerfehler nicht:
```rust
let einkauf = vec![String::from("Apfel"), String::from("Banane")];
for obst in einkauf.into_iter() {
    println!("{}", obst);
}
println!("Einkaufsliste hatte {} Elemente", einkauf.len()); // ❌ Fehler!
```
*   *Aufgabe:* Erkläre dem Anfänger präzise, warum der Vektor `einkauf` in Zeile 5 nicht mehr gültig ist. Wie muss er den Code ändern, damit die Einkaufsliste lesbar bleibt?

### Aufgabe 4: Das DoubleEndedIterator-Rätsel 🔙
Manche Kollektionen können nicht nur von vorne nach hinten, sondern auch von hinten nach vorne durchlaufen werden (z. B. ein Vektor).
*   Schlage in Gedanken oder der Dokumentation das Trait `DoubleEndedIterator` nach.
*   *Aufgabe:* Welche Methode verlangt dieses Trait zusätzlich zu `next()`? Wie könnte man es nutzen, um ein Sushi-Laufband rückwärts laufen zu lassen?

---

## 💡 Zusammenfassung

*   Iteratoren ermöglichen den sequenziellen Zugriff auf Elemente.
*   Sie sind **lazy** (faul) und tun nichts, bis sie aktiv konsumiert werden.
*   Das **`Iterator`-Trait** verlangt das Festlegen eines assoziierten Typs (`type Item`) und die Implementierung der Methode **`next(&mut self) -> Option<Self::Item>`**.
*   `next()` gibt `Some(wert)` zurück, solange Elemente da sind, und am Ende `None`.
*   **`iter()`** leiht Elemente unveränderlich aus (`&T`).
*   **`iter_mut()`** leiht Elemente veränderlich aus (`&mut T`).
*   **`into_iter()`** übernimmt das Eigentum (Ownership) und verbraucht die Collection.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Verarbeiten von Elementreihen mit Iteratoren (Englisch)](https://doc.rust-lang.org/book/ch13-02-iterators.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Iteratoren (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch13-02-iterators.html)
*   [Rust by Example: Iterators (Englisch)](https://doc.rust-lang.org/rust-by-example/trait/iter.html)
*   [Konzept: Closures & Variablen-Einfangung (Grundlage für Iterator-Adapter)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-closures.md)
