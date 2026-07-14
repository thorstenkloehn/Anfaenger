# 📦 Box<T> & Heap-Allokation – Das Schließfach-Prinzip

Stell dir vor, du gehst auf eine große Wandertour. Du trägst einen Rucksack, in dem sich deine Trinkflasche, dein Handy und dein Geldbeutel befinden. Das sind leichte, kleine Gegenstände, auf die du schnell zugreifen musst. Sie befinden sich direkt in deiner Reichweite (in Rust: auf dem **Stack**).

Jetzt kaufst du unterwegs eine schwere, sperrige Camping-Ausrüstung und ein großes Zelt. Würdest du versuchen, das Zelt den ganzen Tag in deinem Rucksack mitzutragen, würde dein Rucksack reißen und du könntest dich kaum noch bewegen. 

Stattdessen triffst du eine schlaue Entscheidung: Du gehst zum nächsten Bahnhof und sperrst das Zelt in ein **Bahnhofs-Schließfach** (in Rust: auf den **Heap**). In deinen Rucksack (Stack) legst du nur den kleinen, leichten **Schließfachschlüssel** (den **Zeiger** / Pointer). 

Der Schlüssel nimmt fast keinen Platz weg und hat immer dieselbe Größe – völlig egal, ob im Schließfach ein winziger Schlafsack oder eine tonnenschwere Ausrüstung liegt. Wenn du das Zelt brauchst, nutzt du den Schlüssel, um an das Schließfach heranzukommen.

Genau das macht **`Box<T>`** in Rust! Es ist der einfachste intelligente Zeiger (Smart Pointer). Er legt die eigentlichen Daten `T` auf dem Heap ab und behält nur den Zeiger darauf auf dem Stack.

---

## 🧠 Theorie

### 1. Stack vs. Heap (Kurz und verständlich)
Um zu verstehen, warum wir `Box` brauchen, müssen wir uns ansehen, wie Rust den Arbeitsspeicher aufteilt:

*   **Der Stack (Stapel):**
    *   **Wie er arbeitet:** Wie ein Stapel Teller. Daten werden oben draufgelegt und von oben wieder weggenommen (LIFO).
    *   **Eigenschaft:** Extrem schnell. 
    *   **Bedingung:** Alle Daten auf dem Stack müssen eine **feste, dem Compiler bekannte Größe** besitzen. Ein `i32` (4 Byte) oder eine Referenz (8 Byte) passen perfekt hierher.
*   **Der Heap (Haufen):**
    *   **Wie er arbeitet:** Wie ein großes Lagerhaus. Der Compiler sucht einen freien Platz, legt die Daten ab und gibt dir eine Adresse (Regalnummer) zurück.
    *   **Eigenschaft:** Etwas langsamer beim Zugriff, da wir den Zeiger verfolgen müssen.
    *   **Bedingung:** Ideal für Daten, deren Größe sich zur Laufzeit ändern kann (z. B. ein wachsender `Vec` oder ein `String`), oder die schlicht zu groß für den Stack sind.

---

### 2. Wie man eine `Box<T>` benutzt
Um Daten in einer Box auf den Heap zu legen, nutzen wir `Box::new()`:

```rust
fn main() {
    // Die Zahl 5 wird auf dem Heap gespeichert.
    // 'b' auf dem Stack enthält nur den Zeiger (die Speicheradresse) auf diese 5.
    let b = Box::new(5);

    // Wir können auf den Wert zugreifen, als wäre es eine normale Zahl.
    // Rust folgt dem Zeiger im Hintergrund automatisch (Deref-Dereferenzierung).
    println!("b = {}", b);
}
```

#### Speicherbereinigung durch Ownership
Eine `Box` besitzt die Daten auf dem Heap. Wenn die Variable `b` (die Box) am Ende der `main`-Funktion den Scope verlässt, passiert Folgendes:
1. Der Stack-Speicher für den Zeiger `b` wird freigegeben.
2. Rust ruft automatisch das **`Drop`**-Trait für die Box auf, welches den reservierten Speicherplatz im Schließfach (Heap) wieder freigibt. Es entstehen keine Speicherlecks!

---

### 3. Anwendungsfall 1: Rekursive Typen (Unbekannte Größe)
Rust muss zur Kompilierzeit exakt wissen, wie viel Speicherplatz eine Datenstruktur belegt. Das führt bei sogenannten **rekursiven Typen** (Typen, die sich selbst enthalten) zu Problemen.

Stell dir eine verkettete Liste vor (in der Informatik oft "Cons-List" genannt):

```rust
// ❌ COMPILER-FEHLER!
enum Liste {
    Cons(i32, Liste),
    Nil,
}
```

Der Compiler bricht mit einem Fehler ab: *"recursive type has infinite size"*. 
Warum? Um die Größe von `Liste` zu berechnen, muss Rust die Größe von `Cons` berechnen. `Cons` enthält aber wieder eine `Liste`, die wieder ein `Cons` enthält, das wieder eine `Liste` enthält... Es entsteht eine Endlosschleife. Die Struktur hätte theoretisch eine unendlich große Ausdehnung.

#### Die Lösung mit `Box<T>`
Wir brechen die Endlosschleife auf, indem wir die verschachtelte Liste in eine Box legen:

```rust
// ✅ Funktioniert!
enum Liste {
    Cons(i32, Box<Liste>),
    Nil,
}
```

Nun enthält `Cons` keinen unendlich großen Typ mehr, sondern eine `Box<Liste>`. Und eine `Box` ist ein Zeiger – hat also auf einem 64-Bit-System immer exakt eine feste Größe von 8 Byte. Der Compiler ist glücklich, da er nun die genaue Größe der Struktur berechnen kann.

---

### 4. Anwendungsfall 2: Dynamic Dispatch (Trait-Objekte)
Stell dir vor, du hast ein Trait `Tier`. Du möchtest einen Vektor erstellen, der verschiedene Tiere (Hunde und Katzen) enthält.

Da Hunde- und Katzen-Structs unterschiedliche Felder haben und somit verschieden groß im Speicher sind, erlaubt Rust das folgende nicht:

```rust
// ❌ COMPILER-FEHLER! (Vec benötigt Elemente identischer Größe)
// let tiere: Vec<dyn Tier> = vec![Hund {}, Katze {}];
```

Auch hier hilft uns die `Box`:

```rust
// ✅ Funktioniert!
let tiere: Vec<Box<dyn Tier>> = vec![
    Box::new(Hund {}),
    Box::new(Katze {}),
];
```

Da jede `Box` dieselbe Zeiger-Größe hat, passen sie alle perfekt in den Vektor. Zur Laufzeit folgt Rust dem Zeiger in der Box und ruft die jeweils richtige Methode auf. Das nennt man **Dynamic Dispatch**.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Strukturen skizzierst und die Speicherverteilung (Stack vs. Heap) planst.

### Aufgabe 1: Das rekursive Dateisystem 📁
Wir wollen ein einfaches Modell für Ordner auf einer Festplatte entwerfen.
*   Ein Ordner soll einen `namen` (String) haben.
*   Zudem soll ein Ordner eine Liste von Unterordnern enthalten können.
*   *Die Herausforderung:* Da ein Ordner rekursiv wieder Ordner enthält, wird der Compiler meckern. Skizziere das Struct `Ordner` und überlege, wie du `Box` und `Vec` einsetzen musst, um die Struktur kompilierbar zu machen.

### Aufgabe 2: Die Text-Waggons (Cons-List) 🚂
Wir wollen einen Spielzeugzug im Code abbilden.
*   Entwirf ein Enum namens `Zug`.
*   Ein `Zug` ist entweder:
    1.  Ein `Waggon`, der eine Fracht (String) und die Verbindung zum nächsten `Zug`-Teil enthält.
    2.  Das `Ende` des Zuges (entspricht `Nil`).
*   *Aufgabe:* Zeichne oder schreibe die Definition des Enums auf. Wo genau musst du `Box` platzieren, damit der Zug beliebig lang werden kann?

### Aufgabe 3: Die Tierparade (Polymorphie) 🎪
Ein Trait `Kuenstler` verlangt eine Methode `auftreten(&self)`.
*   Zwei Structs `Akrobat` und `Zauberer` implementieren dieses Trait.
*   *Aufgabe:* Plane die Struktur für eine `Show`. Die Show soll eine Liste von verschiedenen Künstlern verwalten, die nacheinander auftreten. Wie muss der Typ des Vektors aussehen, damit er sowohl Akrobaten als auch Zauberer aufnehmen kann? Warum ist `Box` hier zwingend notwendig?

### Aufgabe 4: Das Stack-Limit-Experiment (Gedankenspiel) 🧠
Der Stack-Speicher ist standardmäßig sehr klein (oft nur wenige Megabyte).
*   *Überlege:* Was passiert, wenn du im Code ein gigantisches Array wie `let daten = [0_u8; 8_000_000];` (ca. 8 Megabyte) direkt auf dem Stack erstellst (Stichwort: *Stack Overflow*)?
*   Wie hilft dir `Box::new(daten)` in dieser Situation? Wo landen die 8 MB Daten und was verbleibt auf dem Stack?

---

## 💡 Zusammenfassung

*   **`Box<T>`** speichert Daten vom Typ `T` auf dem Heap und hält nur einen Zeiger darauf auf dem Stack.
*   Sie ist ein **Smart Pointer**, besitzt die Daten und gibt den Heap-Speicher automatisch frei, sobald sie den Scope verlässt (`Drop`-Trait).
*   **Anwendungsfall 1:** Umgehung von Endlosschleifen bei rekursiven Typen (z. B. verketteten Listen oder Baumstrukturen).
*   **Anwendungsfall 2:** Speichern von unterschiedlich großen Typen, die dasselbe Trait implementieren, in Collections (`Box<dyn Trait>`).
*   Der Zugriff ist geringfügig langsamer als auf dem Stack, da der Zeiger aufgelöst werden muss, ermöglicht aber maximale Flexibilität beim Speicherplatz.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Verwenden von Box<T> (Englisch)](https://doc.rust-lang.org/book/ch15-01-box.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Box<T> nutzen (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch15-01-box.html)
*   [Rust by Example: Box, stack and heap (Englisch)](https://doc.rust-lang.org/rust-by-example/std/box.html)
*   [Konzept: Traits & Schnittstellen (Grundlage für Box<dyn Trait>)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-traits.md)
