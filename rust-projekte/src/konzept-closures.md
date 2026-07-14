# 🎯 Closures & Variablen-Einfangung – Das Sofortbildkamera-Prinzip

Eine normale Funktion in Rust ist wie eine Zeichnung: Der Maler zeichnet nur das, was du ihm explizit als Modell vor die Nase setzt (die Parameter). Die Funktion hat absolut keinen Bezug zu der Umgebung, in der sie definiert wurde.

Eine **Closure** (anonyme Funktion) ist dagegen wie eine **Sofortbildkamera (Schnappschuss)**. 

Wenn du eine Closure definierst, drückst du auf den Auslöser. Die Kamera macht ein Foto der aktuellen Umgebung. Sie **fängt die Variablen ein**, die in diesem Moment um sie herum existieren. 

Selbst wenn du das Foto später an einen ganz anderen Ort mitnimmst (die Closure in einer anderen Funktion oder einem Thread ausführst), kann die Closure immer noch auf die eingefangenen Daten zugreifen.

Wie das Foto die Umgebung einfängt, bestimmt Rust anhand von drei verschiedenen Traits:
1.  **Nur anschauen (Lesen):** Das Foto zeigt die Landschaft, verändert sie aber nicht (**`Fn`**).
2.  **Auf dem Foto herummalen (Ändern):** Du machst Notizen auf dem Foto und veränderst seinen Zustand (**`FnMut`**).
3.  **Das Foto verbrennen (Zerstören/Verbrauchen):** Du zerreißt das Foto, um den darin versteckten Gutschein zu nutzen. Danach ist das Foto weg (**`FnOnce`**).

---

## 🧠 Theorie

### 1. Syntax einer Closure
Closures werden mit zwei vertikalen Strichen `||` (den "Rohren") definiert, in denen die Parameter stehen. Danach folgt der Funktionskörper.

```rust
fn main() {
    // Eine normale Funktion würde so aussehen: fn addiere(a: i32, b: i32) -> i32 { a + b }
    // Als Closure geschrieben:
    let addiere = |a: i32, b: i32| a + b;

    let ergebnis = addiere(5, 3);
    println!("Ergebnis: {}", ergebnis); // Ausgabe: 8
}
```

Der große Vorteil: Rust leitet die Typen der Parameter und des Rückgabewerts bei Closures meistens automatisch ab! Du musst sie nicht explizit hinschreiben.

---

### 2. Das Einfangen der Umgebung: Die drei Fn-Traits

Hier wird es spannend: Wie greift die Closure auf Variablen aus ihrer Umgebung zu?

#### 1. `Fn` (Unveränderliches Ausleihen `&T`)
Die Closure leiht sich die Variablen der Umgebung nur unveränderlich aus. Sie liest sie nur. Da nichts verändert wird, kann die Closure beliebig oft aufgerufen werden (auch parallel).

```rust
fn main() {
    let gruß = String::from("Hallo");

    // Die Closure fängt 'gruß' unveränderlich ein
    let drucke_gruss = || println!("{}", gruß); 

    drucke_gruss(); // Aufruf 1
    drucke_gruss(); // Aufruf 2 (kein Problem!)
}
```

#### 2. `FnMut` (Veränderliches Ausleihen `&mut T`)
Die Closure möchte Werte in ihrer Umgebung verändern. Sie leiht sich die Variablen veränderlich aus. 
Wichtig: Damit wir die Closure ausführen können, müssen wir die Closure-Variable selbst als `mut` deklarieren!

```rust
fn main() {
    let mut zaehler = 0;

    // Die Closure fängt 'zaehler' veränderlich ein
    let mut erhoehe = || {
        zaehler += 1;
        println!("Zähler: {}", zaehler);
    };

    erhoehe(); // Ausgabe: Zähler: 1
    erhoehe(); // Ausgabe: Zähler: 2
}
```

#### 3. `FnOnce` (Besitz übernehmen / Ownership `T`)
Die Closure übernimmt das Eigentum an einer Variable aus der Umgebung (oder verbraucht sie). Da die Variable danach nicht mehr existiert, kann diese Closure **nur ein einziges Mal** aufgerufen werden. Daher der Name: *Once*.

```rust
fn main() {
    let text = String::from("Einweg-Text");

    // 'text' wird in die Closure verschoben und dort verbraucht (durch drop)
    let verbrauche_text = || {
        let _ = text; // Besitz übernommen!
        println!("Text wurde verbraucht.");
    };

    verbrauche_text(); // Funktionert!
    
    // ❌ COMPILER-FEHLER!
    // verbrauche_text(); 
    // Fehler: "use of moved value"
}
```

---

### 3. Das `move`-Schlüsselwort bei Closures
Manchmal müssen wir erzwingen, dass eine Closure die Variablen der Umgebung komplett per Ownership übernimmt, selbst wenn sie die Variablen im Funktionskörper nur liest (also eigentlich `Fn` wäre).

Das ist besonders wichtig, wenn die Closure an einen **Thread** übergeben wird oder **aus einer Funktion zurückgegeben** wird. Ohne `move` würde die Closure nur eine Referenz halten. Wenn die ursprüngliche Funktion endet, wäre die Referenz ungültig (Dangling Reference).

```rust
use std::thread;

fn main() {
    let daten = vec![1, 2, 3];

    // Mit 'move' zieht die Closure den Vektor 'daten' komplett in sich hinein
    let handle = thread::spawn(move || {
        println!("Daten im Thread: {:?}", daten);
    });

    handle.join().unwrap();
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Funktionsweisen und Speicherzugriffe planst.

### Aufgabe 1: Das Rabatt-System (Fn) 🏷️
Ein Onlineshop möchte Preise berechnen.
*   In der Umgebung ist eine Variable `let rabatt = 0.15;` (15% Rabatt) definiert.
*   Schreibe eine Closure, die einen `preis` (f64) als Parameter entgegennimmt, den Rabatt aus der Umgebung anwendet und den reduzierten Preis zurückgibt.
*   *Aufgabe:* Skizziere die Closure. Erkläre, welches `Fn`-Trait Rust hier im Hintergrund automatisch für die Closure implementiert und warum.

### Aufgabe 2: Der Klickzähler (FnMut) 🖱️
Für eine Benutzeroberfläche soll ein Klick-Zähler simuliert werden.
*   In der Umgebung gibt es eine Variable `let mut klicks = 0;`.
*   Entwerfe eine Closure namens `klick_simulieren`, die keinen Parameter erwartet. Bei jedem Aufruf soll sie den Zähler `klicks` um 1 erhöhen und den aktuellen Stand ausgeben.
*   *Aufgabe:* Skizziere den Ablauf. Warum muss die Closure-Variable selbst mit `let mut klick_simulieren` deklariert werden? Welches Trait liegt hier vor?

### Aufgabe 3: Der Einweg-Anmelde-Schlüssel (FnOnce) 🔐
Ein Sicherheitssystem verlangt eine einmalige Anmeldung.
*   In der Umgebung existiert ein schreibgeschütztes Einmal-Token: `let token = String::from("SECRET_TOKEN");`.
*   Eine Closure namens `anmelden` soll dieses Token per Ownership übernehmen und an eine (simulierte) API senden. Danach ist das Token verbraucht.
*   *Aufgabe:* Skizziere die Logik. Warum bricht der Compiler ab, wenn du versuchst, `anmelden` zweimal hintereinander aufzurufen?

### Aufgabe 4: Das Hierarchie-Rätsel 🧩
In Rust gibt es eine feste Beziehung zwischen den drei Traits:
*   Jede Closure, die `Fn` implementiert, implementiert auch `FnMut` und `FnOnce`.
*   Jede Closure, die `FnMut` implementiert, implementiert auch `FnOnce`.
*   Aber nicht jede `FnOnce`-Closure implementiert `FnMut` oder `Fn`.
*   *Aufgabe:* Erkläre dieses Prinzip logisch anhand unserer Sofortbildkamera-Analogie (Gutschein aufessen vs. Foto bemalen vs. Foto nur anschauen).

---

## 💡 Zusammenfassung

*   **Closures** sind anonyme Funktionen, die Variablen aus ihrer Umgebung einfangen.
*   Sie werden mit der **`||`**-Syntax definiert.
*   **`Fn`** leiht die Umgebung unveränderlich aus (nur lesen). Kann beliebig oft aufgerufen werden.
*   **`FnMut`** leiht die Umgebung veränderlich aus (Werte ändern). Die Closure-Variable muss als `mut` markiert sein.
*   **`FnOnce`** übernimmt das Eigentum an der Umgebung (Werte verbrauchen). Sie kann nur ein einziges Mal aufgerufen werden.
*   Mit **`move`** zwingen wir die Closure, alle eingefangenen Variablen per Ownership zu übernehmen. Das ist essenziell für Threads und Rückgabewerte aus Funktionen.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Closures (Englisch)](https://doc.rust-lang.org/book/ch13-01-closures.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Closures (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch13-01-closures.html)
*   [Rust by Example: Closures (Englisch)](https://doc.rust-lang.org/rust-by-example/fn/closures.html)
*   [Konzept: Lifetimes & Lebensdauern (Wichtig für das Verständnis von Referenzen in Closures)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-lifetimes.md)
