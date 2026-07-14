# ⛓️ Iterator-Ketten & Adapter – Das Fabrik-Förderband-Prinzip

Im letzten Kapitel haben wir gelernt, wie wir mit einem Sushi-Laufband (Iterator) einzelne Elemente nacheinander herausholen. Das ist nützlich, aber die wahre Superkraft von Rust-Iteratoren entfaltet sich erst, wenn wir sie wie Module auf einem **Fabrik-Förderband** hintereinanderschalten!

Stell dir eine Sortieranlage in einer Apfelsaft-Fabrik vor:
1.  **Die Rohstoffe:** Ein Haufen ungeordneter Äpfel kommt auf das Förderband (der *Start-Iterator*).
2.  **Schritt 1: Sortieren (`filter`):** Das Band läuft durch eine Lichtschranke, die alle faulen oder zu kleinen Äpfel aussortiert. Nur die guten Äpfel laufen weiter.
3.  **Schritt 2: Schälen (`map`):** Eine Maschine schält jeden Apfel, der an ihr vorbeikommt. Aus einem "Apfel mit Schale" wird ein "geschälter Apfel".
4.  **Schritt 3: Zerkleinern (`map`):** Das nächste Messer schneidet jeden Apfel in vier Stücke.
5.  **Schritt 4: Einsammeln (`collect`):** Am Ende des Bandes fallen alle Apfelstücke in eine große Kiste.

Jeder dieser Schritte (Sortieren, Schälen, Schneiden) ist ein **Iterator-Adapter**. Sie verändern den Strom der Elemente, erzeugen aber selbst noch kein Endprodukt. Das Förderband bewegt sich erst, und die Äpfel werden erst geschält, wenn du am Ende die Kiste unter das Band stellst und den Startknopf drückst (der *konsumierende Adaptor* wie `.collect()`).

---

## 🧠 Theorie

### 1. Die zwei Arten von Iterator-Methoden
Um mit Ketten zu arbeiten, müssen wir zwei Arten von Methoden unterscheiden:

#### A) Iterator-Adapter (Zwischenschritte)
Diese Methoden nehmen einen Iterator, verändern ihn und geben einen **neuen Iterator** zurück. Sie sind **lazy** – sie führen die Berechnung nicht aus, sondern planen sie nur.
*   **`filter`**: Lässt nur Elemente durch, die eine bestimmte Bedingung (Closure) erfüllen.
*   **`map`**: Transformiert jedes Element in ein anderes Element (z. B. Typen umwandeln oder Berechnungen durchführen).
*   **`take(n)`**: Begrenzt den Iterator auf die ersten `n` Elemente und bricht danach ab.

#### B) Konsumierende Adaptoren (Endpunkte)
Diese Methoden verarbeiten den Iterator und geben einen **konkreten Wert** (z. B. eine Zahl) oder eine **neue Collection** (z. B. einen Vektor) zurück. Sie stoßen die eigentliche Ausführung der Kette an.
*   **`collect`**: Saugt den Iterator leer und sammelt alle verbleibenden Elemente in einer Collection (z. B. `Vec<T>`).
*   **`sum` / `product`**: Rechnet alle Elemente zusammen oder multipliziert sie.
*   **`count`**: Zählt, wie viele Elemente übrig geblieben sind.
*   **`fold`**: Reduziert alle Elemente mithilfe eines Akkumulators auf einen einzigen Endwert (extrem mächtig!).

---

### 2. Eine Kette in Aktion
Schauen wir uns an, wie elegant eine solche Kette im Code aussieht. Wir wollen alle geraden Zahlen verdoppeln und in einem Vektor sammeln:

```rust
fn main() {
    let zahlen = vec![1, 2, 3, 4, 5];

    // Wir bauen die Kette auf:
    let ergebnis: Vec<i32> = zahlen
        .into_iter()         // 1. Start-Iterator (Besitz übernehmen)
        .filter(|x| x % 2 == 0) // 2. Nur gerade Zahlen durchlassen
        .map(|x| x * 2)      // 3. Jede Zahl verdoppeln
        .collect();          // 4. In einem Vektor einsammeln (Endpunkt!)

    println!("Ergebnis: {:?}", ergebnis); // Ausgabe: [4, 8]
}
```

---

### 3. Der König der Konsumenten: `fold`
Manchmal reicht uns `sum()` oder `collect()` nicht aus. Wir wollen die Elemente nach unseren eigenen Regeln zu einem einzigen Wert zusammenfassen. Hier kommt **`fold`** ins Spiel. 

`fold` erwartet zwei Argumente:
1.  Einen **Startwert** (den Anfangszustand des Akkumulators).
2.  Eine **Closure**, die bei jedem Schritt den aktuellen Akkumulator und das nächste Element erhält und den neuen Akkumulator zurückgibt.

```rust
fn main() {
    let zahlen = vec![1, 2, 3];

    // Wir wollen die Zahlen aufaddieren, starten aber bei 10:
    let summe = zahlen.iter().fold(10, |akkumulator, &zahl| {
        akkumulator + zahl
    });

    println!("Summe: {}", summe); // Ausgabe: 16 (10 + 1 + 2 + 3)
}
```

---

### 4. Zero-Cost Abstractions: Die Performance
Anfänger sorgen sich oft: *"Sind diese vielen verschachtelten Methodenaufrufe und Closures nicht viel langsamer als eine normale for-Schleife?"*

Die Antwort lautet: **Nein!** In Rust sind Iteratoren eine sogenannte **Zero-Cost Abstraction** (Null-Kosten-Abstraktion). 

Der Rust-Compiler (LLVM) optimiert diese Ketten beim Kompilieren (im Release-Modus) so radikal, dass die Schleifen komplett flachgeklopft werden. Oft ist der erzeugte Maschinencode sogar **schneller** als eine handgeschriebene For-Schleife, da der Compiler Bereichsprüfungen (Bounds Checks) bei Vektoren einsparen kann. Du darfst Iteratoren also ohne Performance-Sorgen für maximale Lesbarkeit nutzen!

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Ketten planst.

### Aufgabe 1: Die Namensliste filtern 📜
Du hast einen Vektor von Namen: `let namen = vec!["Lisa", "Timo", "Jan", "Andreas", "Bo"];`.
*   Wir wollen nur Namen behalten, die **länger als 3 Zeichen** sind.
*   Diese verbleibenden Namen sollen komplett in **Großbuchstaben** umgewandelt werden (`name.to_uppercase()`).
*   Das Ergebnis soll in einem neuen `Vec<String>` gesammelt werden.
*   *Aufgabe:* Skizziere die Iterator-Kette. Welche Adapter und welchen Konsumenten benötigst du?

### Aufgabe 2: Das Produkt ungerader Zahlen 🧮
Gegeben ist ein Zahlenbereich von 1 bis 10.
*   Wir wollen das Produkt aller **ungeraden** Zahlen in diesem Bereich berechnen.
*   *Aufgabe:* Plane die Kette. Wie filterst du die ungeraden Zahlen heraus und wie berechnest du das Produkt (z. B. mit `product()` oder über `fold()`)?

### Aufgabe 3: Der Fehler des faulen Entwicklers 🔍
Ein Entwickler schreibt folgenden Code, um Log-Nachrichten auszugeben:
```rust
let warnungen = vec!["Fehler A", "Fehler B"];
warnungen.iter().map(|w| println!("Warnung gesendet: {}", w));
```
Beim Ausführen des Programms stellt er fest, dass absolut nichts auf der Konsole ausgegeben wird. 
*   *Aufgabe:* Erkläre präzise, warum der Code nicht funktioniert. Was hat der Entwickler vergessen? Wie löst er das Problem, ohne den Code komplett umzuschreiben?

### Aufgabe 4: fold im Detail verstehen 🧩
Gegeben ist die Liste `let zahlen = vec![1, 2, 3];` und die Kette `.fold(0, |akk, x| akk - x)`.
*   *Aufgabe:* Spiele den Ablauf von `fold` Schritt für Schritt durch. Welchen Wert hat der Akkumulator (`akk`) zu Beginn, nach dem ersten Schritt, nach dem zweiten Schritt und am Ende?

---

## 💡 Zusammenfassung

*   **Iterator-Ketten** ermöglichen das Hintereinanderschalten von Daten-Operationen.
*   **Iterator-Adapter** (wie `map`, `filter`, `take`) transformieren den Datenstrom, sind aber **lazy** (faul).
*   **Konsumierende Adaptoren** (wie `collect`, `sum`, `fold`) stoßen die Ausführung an und erzeugen das Endprodukt.
*   **`fold`** ist der mächtigste Konsument. Er reduziert einen Datenstrom mithilfe eines Akkumulators auf einen einzigen Wert.
*   Iteratoren sind **Zero-Cost Abstractions**: Sie kompilieren zu extrem schnellem Code und haben keinen Laufzeit-Overhead gegenüber klassischen For-Schleifen.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Iterator-Adaptoren (Englisch)](https://doc.rust-lang.org/book/ch13-02-iterators.html#methods-that-produce-other-iterators)
*   [Die deutsche Übersetzung des Rust-Buchs: Iterator-Adaptoren (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch13-02-iterators.html#methoden-die-andere-iteratoren-erzeugen)
*   [std::iter::Iterator API-Dokumentation (Englisch - Eine Schatzkiste voller Adapter!)](https://doc.rust-lang.org/std/iter/trait.Iterator.html)
*   [Konzept: Iteratoren & Das Iterator-Trait (Die Grundlage für Ketten)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-iteratoren.md)
