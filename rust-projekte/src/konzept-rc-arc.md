# 👥 `Rc<T>` & `Arc<T>` – Das WG-Fernseher-Prinzip (Geteilter Besitz)

Rusts grundlegendes Prinzip lautet: **Jeder Wert hat genau einen Besitzer (Single Ownership).** Wenn dieser Besitzer den Scope verlässt, wird der Wert vernichtet. Das sorgt für Ordnung und verhindert Speicherfehler.

Aber stell dir eine Wohngemeinschaft (WG) vor. Jedes WG-Mitglied hat ein eigenes Bett (Single Ownership). Wenn ein Mitbewohner auszieht, nimmt er sein Bett mit. 

Was ist aber mit dem **Fernseher im Wohnzimmer**? Es wäre ziemlich unpraktisch, wenn der Fernseher nur einer Person gehören würde. Zieht diese Person aus, stünden alle anderen plötzlich ohne Fernseher da. Stattdessen gehört der Fernseher allen gemeinsam. 

Jeder Mitbewohner erhält eine eigene Fernbedienung (einen **Klon des Zeigers**). Der Fernseher selbst bleibt im Wohnzimmer stehen, solange auch nur ein einziger Mitbewohner in der WG wohnt und fernsieht. Erst wenn der allerletzte Bewohner auszieht (der **Referenzzähler sinkt auf 0**), wird der Fernseher aus der Wohnung getragen und entsorgt (der Speicher wird freigegeben).

In Rust implementieren wir diesen geteilten Besitz mit **`Rc<T>`** (für Single-Thread-Anwendungen) und **`Arc<T>`** (für Multithreading-Anwendungen).

---

## 🧠 Theorie

### 1. Das Problem mit Single Ownership
In manchen Programmen müssen mehrere Datenstrukturen gleichzeitig auf denselben Wert zugreifen und diesen besitzen. 

Stell dir ein soziales Netzwerk vor: Ein `Benutzer`-Objekt hat eine Liste von `Beitrag`-Objekten erstellt. Gleichzeitig sind diese Beiträge in einer globalen `Feed`-Liste gespeichert. Wer besitzt nun die Beiträge? Der Benutzer oder der Feed? 
Mit Rusts Standardregeln müssten wir die Beiträge kopieren – was Speicher verschwendet – oder komplizierte Lifetime-Konstruktionen nutzen. `Rc<T>` löst dieses Problem elegant.

---

### 2. Geteilter Besitz in einem Thread: `Rc<T>`
Das Kürzel **`Rc`** steht für **Reference Counted** (Referenzgezählt). Es lagert den Wert `T` auf dem Heap aus und zählt im Hintergrund mit, wie viele Zeiger auf diesen Wert verweisen.

#### Syntax und Erstellung
Um ein `Rc`-Objekt zu erstellen, verpacken wir die Daten in `Rc::new()`:

```rust
use std::rc::Rc;

struct Datei {
    name: String,
}

fn main() {
    // 1. Wir erstellen die Original-Datei auf dem Heap
    // Der Referenzzähler steht jetzt bei 1
    let original = Rc::new(Datei { name: String::from("protokoll.txt") });

    // 2. Wir erstellen einen neuen Besitzer (Klon des Zeigers)
    // Rc::clone kopiert NICHT die Datei auf dem Heap! 
    // Es kopiert nur den winzigen Zeiger auf dem Stack und erhöht den Zähler auf 2.
    let besitzer_a = Rc::clone(&original);

    // 3. Ein dritter Besitzer kommt hinzu. Zähler steht nun bei 3.
    let besitzer_b = Rc::clone(&original);

    // Wir können über jeden Zeiger auf die Daten zugreifen:
    println!("Datei A: {}", besitzer_a.name);
    println!("Datei B: {}", besitzer_b.name);
} // Am Ende verlässt original, besitzer_a und besitzer_b den Scope.
  // Der Zähler sinkt schrittweise auf 0, erst dann wird 'protokoll.txt' auf dem Heap gelöscht.
```

> [!IMPORTANT]
> **Warum `Rc::clone(&x)` statt `x.clone()`?**
> Zwar funktioniert auch `x.clone()`, aber in der Rust-Community schreibt man explizit `Rc::clone(&x)`. Das signalisiert jedem Leser sofort: *"Achtung! Hier werden keine teuren Daten kopiert, sondern nur ein extrem schneller Referenzzähler erhöht."*

---

### 3. Die Einschränkungen von `Rc<T>`
Ein `Rc<T>` ist ein mächtiges Werkzeug, hat aber zwei ganz wesentliche Einschränkungen:

#### 1. Nur lesender Zugriff (Read-Only)
Die Daten in einem `Rc` sind **standardmäßig unveränderlich (immutable)**. Wenn mehrere Zeiger auf denselben Speicher verweisen, verbietet Rust es dir, die Daten über einen der Zeiger zu verändern. Andernfalls könnte ein Zeiger die Daten manipulieren, während ein anderer Zeiger zeitgleich versucht, sie zu lesen (was zu Fehlern führt).
*Ausweg:* Wenn du geteilte Daten verändern musst, musst du `Rc<T>` mit `RefCell<T>` kombinieren (Interior Mutability – das erklären wir im nächsten Kapitel!).

#### 2. Nicht thread-sicher (Single-Threaded)
`Rc` ist extrem schnell, da das Erhöhen und Verringern des Zählers über einfache, nicht-abgesicherte Rechenoperationen auf der CPU läuft. Wenn du versuchen würdest, ein `Rc` an einen anderen Thread zu übergeben, würde dein Programm abstürzen oder unvorhersehbare Zählerstände liefern, da Threads zeitgleich auf den Zähler zugreifen könnten.
Der Rust-Compiler verhindert dies sofort zur Compilezeit, da `Rc` die Traits `Send` und `Sync` nicht implementiert.

---

### 4. Geteilter Besitz für mehrere Threads: `Arc<T>`
Wenn du Daten zwischen verschiedenen Threads teilen möchtest, nutzt du **`Arc<T>`** (**Atomically Reference Counted**).

`Arc` funktioniert exakt wie `Rc`, verwendet im Hintergrund jedoch **atomare CPU-Befehle** zur Verwaltung des Zählers. Diese Operationen sind absolut thread-sicher, kosten die CPU jedoch ein minimales Bisschen mehr Rechenleistung als die einfachen Operationen von `Rc`.

#### Wann nutzt man was? (Faustregel)
*   **`Rc<T>`:** Wenn die Daten **nur innerhalb eines einzigen Threads** (z. B. in einer GUI-Schleife oder einem CLI-Ablauf) geteilt werden.
*   **`Arc<T>`:** Sobald Daten **an Threads übergeben** werden (z. B. bei Webservern oder parallelen Berechnungen).

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    // Ein geteilter Text im Speicher
    let daten = Arc::new(String::from("Geheimes Passwort"));

    let mut threads = vec![];

    for i in 0..3 {
        // Wir klonen den Arc-Zeiger für jeden Thread
        let daten_klon = Arc::clone(&daten);
        
        let t = thread::spawn(move || {
            // Jeder Thread kann sicher auf die Heap-Daten zugreifen
            println!("Thread {} liest: {}", i, daten_klon);
        });
        threads.push(t);
    }

    for t in threads {
        t.join().unwrap();
    }
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Programmabläufe skizzierst und die Zählerstände der Referenzen planst.

### Aufgabe 1: Das geteilte Config-Objekt (Rc) ⚙️
Ein Programm lädt beim Start eine `DatenbankConfig` (Struct mit IP-Adresse und Zugangsdaten).
*   Zwei unabhängige Module (`UserManager` und `LogManager`) benötigen während der gesamten Laufzeit Zugriff auf diese Konfiguration.
*   *Aufgabe:* Skizziere die Struktur der Module. Wie übergibst du die Konfiguration mithilfe von `Rc` an die Konstruktoren der beiden Manager, ohne die Daten im Speicher zu duplizieren?

### Aufgabe 2: Der Thread-Analysator (Arc) 📡
Du hast einen großen Vektor mit 10.000 Messwerten (`Vec<f64>`) im Speicher vorliegen.
*   Drei parallele Threads sollen gleichzeitig unterschiedliche Abschnitte oder statistische Analysen (z. B. Durchschnitt, Minimum, Maximum) auf diesen Werten durchführen.
*   *Aufgabe:* Erkläre, warum die Nutzung von `Rc` hier zu einem Compiler-Fehler führt und wie du das Problem mit `Arc` löst. Skizziere die Signatur des Datentransfers in die Threads.

### Aufgabe 3: Der Zähler-Detektiv (Gedankenspiel) 🔍
Betrachte den folgenden fiktiven Code-Ablauf. Ermittle an den markierten Stellen (A, B, C, D) den exakten Stand des Referenzzählers (Reference Count).

```text
Scope-Start Hauptprogramm {
    Erstelle 'daten' als Rc::new(100). // Stand A?
    
    Scope-Start Block 1 {
        Erstelle 'klon_1' als Klon von 'daten'. // Stand B?
        
        Scope-Start Block 2 {
            Erstelle 'klon_2' als Klon von 'daten'. // Stand C?
        } Scope-Ende Block 2
        
    } Scope-Ende Block 1 // Stand D?
    
} Scope-Ende Hauptprogramm
```

### Aufgabe 4: Das Klon-Rätsel 🧩
Ein Anfänger fragt sich: *"Warum soll ich Rc::clone nutzen, wenn ich auch einfach ein normales Struct mit der Methode .clone() tief kopieren kann?"*
*   *Aufgabe:* Vergleiche die beiden Ansätze. Was passiert im RAM-Speicher und mit der CPU-Last, wenn du ein Struct, das ein 50 Megabyte großes Bild enthält, per `.clone()` kopierst, im Vergleich dazu, wenn du einen `Rc`-Zeiger auf dieses Bild klonst?

---

## 💡 Zusammenfassung

*   **`Rc<T>`** und **`Arc<T>`** ermöglichen geteilten Besitz (Shared Ownership) an einem Wert auf dem Heap.
*   Sie nutzen **Referenzzählung**: Der Speicher wird erst freigegeben, wenn der letzte Zeiger gelöscht wird (Zähler = 0).
*   Mit **`Rc::clone(&x)`** kopieren wir nur den Zeiger und erhöhen den Zähler – das ist extrem schnell und spart Speicher.
*   **`Rc<T>`** ist für Single-Thread-Anwendungen optimiert, aber nicht thread-sicher.
*   **`Arc<T>`** verwendet atomare Operationen, ist absolut thread-sicher, aber minimal langsamer als `Rc`.
*   Daten in `Rc` und `Arc` sind standardmäßig **unveränderlich (Read-Only)**.

---

## 📚 Links

*   [Das offizielle Rust-Buch: `Rc<T>` der Referenzzähler-Smart-Pointer (Englisch)](https://doc.rust-lang.org/book/ch15-04-rc.html)
*   [Die deutsche Übersetzung des Rust-Buchs: `Rc<T>` (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch15-04-rc.html)
*   [Rust by Example: Arc (Englisch)](https://doc.rust-lang.org/rust-by-example/std/arc.html)
*   [Konzept: `Box<T>` (Der einfachere Smart Pointer für exklusiven Besitz)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-box.md)
