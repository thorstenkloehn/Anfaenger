# 🧬 Generics & Generische Typen – Die Universal-Schablone

Stell dir vor, du leitest eine Spielzeugfabrik. Du möchtest Transportboxen herstellen. Zuerst baust du eine Box, die exakt für eine Holzente geformt ist. Kurz darauf brauchst du eine Box für einen Spielzeug-LKW, dann eine für einen Teddybären. 

Wenn du für jedes einzelne Spielzeug eine völlig neue, maßgeschneiderte Box entwerfen und bauen müsstest, hättest du bald Hunderte verschiedene Boxen-Typen in deiner Fabrik. Das wäre extrem ineffizient und teuer! 

Stattdessen triffst du eine schlaue Entscheidung: Du entwirfst eine **Universal-Box** mit einer flexiblen Polsterung im Inneren, die sich an *jedes* Spielzeug anpasst. Der Box selbst ist es völlig egal, was in ihr liegt – ob Ente, LKW oder Teddy. Sie schützt das Spielzeug und lässt sich immer auf die gleiche Weise öffnen und schließen.

In der Rust-Welt ist das genau so! Manchmal schreibst du Funktionen oder Datenstrukturen, die eigentlich immer das Gleiche tun, sich aber nur im Datentyp unterscheiden. Um zu verhindern, dass du denselben Code für `i32`, `f64`, `String` und eigene Typen immer wieder neu schreiben musst, nutzt du **Generics** (generische Typen). Sie funktionieren wie Platzhalter oder Universal-Schablonen.

---

## 🧠 Theorie

### 1. Das Problem ohne Generics
Nehmen wir an, wir wollen eine einfache Datenstruktur bauen, die einen einzelnen Wert im Speicher hält (eine "Kiste"). Ohne Generics müssten wir für jeden Typ ein eigenes Struct schreiben:

```rust
// Eine Kiste nur für ganze Zahlen
struct IntegerKiste {
    inhalt: i32,
}

// Eine Kiste nur für Texte
struct TextKiste {
    inhalt: String,
}
```

Das führt zu massivem Code-Duplikat. Wenn wir nun Methoden für diese Kisten schreiben wollen (z. B. den Inhalt ausgeben oder austauschen), müssten wir diese Methoden für jedes Struct einzeln programmieren.

---

### 2. Die Lösung: Generische Structs
Mit Generics deklarieren wir einen **Typ-Platzhalter**. In Rust nutzen wir dafür spitze Klammern `<>` direkt nach dem Namen der Struktur. Konventionell verwenden wir den Buchstaben **`T`** (für *Type*):

```rust
// T ist unsere Universal-Polsterung. Sie passt sich jedem Typ an!
struct Kiste<T> {
    inhalt: T,
}
```

Wenn wir diese Kiste im Code erstellen, setzt Rust den tatsächlichen Typ automatisch ein. Wir können eine Kiste für Zahlen oder für Text erstellen, nutzen aber exakt dasselbe Struct:

```rust
fn main() {
    // Rust erkennt: Hier ist T = i32
    let zahlen_kiste = Kiste { inhalt: 42 };

    // Rust erkennt: Hier ist T = String
    let text_kiste = Kiste { inhalt: String::from("Rust macht Spaß!") };
}
```

#### Methoden auf generischen Structs implementieren
Wenn wir Methoden für ein generisches Struct schreiben wollen, müssen wir dem Compiler sagen, dass die Methoden ebenfalls generisch sind. Das geschieht, indem wir das `<T>` sowohl nach dem `impl` als auch nach dem Typnamen schreiben:

```rust
impl<T> Kiste<T> {
    // Gibt eine Referenz auf den Inhalt zurück (egal welchen Typs T er ist)
    fn inhalt_zeigen(&self) -> &T {
        &self.inhalt
    }
}
```

---

### 3. Generische Funktionen
Genauso wie Structs können auch Funktionen generisch sein. Stell dir eine Funktion vor, die zwei Werte in ein Tupel verpackt. Anstatt eine Funktion für `(i32, i32)` und eine für `(String, String)` zu schreiben, nutzen wir eine generische Funktion:

```rust
// Die Funktion akzeptiert jeden Typ T für beide Parameter
fn erstelle_paar<T>(links: T, rechts: T) -> (T, T) {
    (links, rechts)
}
```

Wir deklarieren den Platzhalter `<T>` direkt hinter dem Funktionsnamen. Nun weiß Rust, dass die Parameter `links` und `rechts` sowie die Rückgabewerte vom selben Typ `T` sein müssen.

#### Das Limit von Generics (Vorschau auf Traits)
Wenn du eine generische Funktion schreibst, weiß Rust erst einmal *nichts* über den Typ `T`. Für Rust könnte `T` eine Zahl, ein Text oder eine Alarmanlage sein.

Deshalb verbietet Rust standardmäßig Operationen, die nicht für alle Typen gelten. Folgende Funktion wird zum Beispiel **nicht** kompilieren:

```rust
// ❌ COMPILER-FEHLER!
fn addieren<T>(a: T, b: T) -> T {
    a + b // Woher soll Rust wissen, ob man T addieren kann?
}
```

Um solche Operationen zu erlauben, müssen wir den Platzhalter `T` einschränken (z. B. "T muss addiert werden können"). Diesen Vorgang nennt man **Trait Bounds** (Trait-Grenzen) – das werden wir im nächsten Kapitel genauer unter die Lupe nehmen.

---

### 4. Generische Enums
Die vielleicht wichtigsten Enums in der Rust-Standardbibliothek nutzen Generics. Du hast sie in Phase 3 bereits kennengelernt: `Option<T>` und `Result<T, E>`.

#### `Option<T>` – Wert vorhanden oder nicht?
Das Enum `Option` ist generisch aufgebaut, damit es für absolut jeden Datentyp anzeigen kann, ob ein Wert existiert (`Some`) oder eben nicht (`None`):

```rust
enum Option<T> {
    Some(T),
    None,
}
```

Ob du eine optionale Zahl (`Option<i32>`) oder ein optionales Auto (`Option<Auto>`) hast – das Prinzip bleibt dank Generics identisch.

#### `Result<T, E>` – Erfolg oder Fehler?
Das Enum `Result` nutzt sogar **zwei** generische Platzhalter: `T` für den Erfolgsfall und `E` (für *Error*) für den Fehlerfall:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

Dadurch kann jede Funktion in Rust ihren ganz individuellen Erfolgstyp und ihren ganz individuellen Fehlertyp zurückgeben, ohne dass für jede Funktion ein neues Enum erfunden werden muss.

---

### 5. Wie arbeitet der Compiler? (Monomorphisierung)
Vielleicht fragst du dich: *"Machen Generics mein Programm zur Laufzeit langsamer, weil die KI oder der Prozessor ständig herausfinden muss, was in der Kiste liegt?"*

Die Antwort lautet: **Nein!** Rust verwendet ein Verfahren namens **Monomorphisierung** (ein langes Wort für "in eine konkrete Form bringen").

Bevor dein Programm compiliert wird, scannt Rust deinen Code nach allen Typen, mit denen du deine Generics benutzt hast. Wenn du `Kiste<i32>` und `Kiste<String>` verwendet hast, kopiert Rust den Code der generischen `Kiste` im Hintergrund und generiert zwei spezialisierte, nicht-generische Structs (z. B. `Kiste_i32` und `Kiste_String`).

*   **Vorteil:** Zur Laufzeit gibt es keinerlei Performance-Verlust (Zero-Cost Abstraction). Dein Programm läuft genauso blitzschnell, als hättest du den Code manuell dupliziert.
*   **Nachteil:** Da der Compiler den Code kopiert, kann die compilierte Datei (Binary) minimal größer werden, wenn du ein generisches Struct mit extrem vielen verschiedenen Typen benutzt.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Strukturen skizzierst und die logischen Typbeziehungen planst.

### Aufgabe 1: Das generische Werte-Paar 👥
Entwirf ein generisches Struct namens `Paar`.
*   Das Struct soll zwei Felder besitzen: `erstes` und `zweites`.
*   Beide Felder müssen vom **selben** generischen Typ `T` sein.
*   *Überlege:* Wie sieht die Definition des Structs aus? Wie erstellst du im Code ein Paar aus zwei ganzen Zahlen (`i32`) und wie ein Paar aus zwei Wahrheitswerten (`bool`)?

### Aufgabe 2: Der Universal-Umschlag (Verschiedene Typen) ✉️
Manchmal müssen die Daten in einer Struktur nicht vom gleichen Typ sein. Entwirf ein Struct namens `Umschlag`.
*   Der Umschlag soll eine `nachricht` enthalten.
*   Zusätzlich soll er eine `prioritaet` besitzen.
*   *Die Herausforderung:* Erlaube, dass die `nachricht` (z. B. ein Text oder eine Zahl) und die `prioritaet` (z. B. eine Zahl von 1-5 oder ein Enum-Status) unterschiedliche Datentypen haben können. Nutze dafür zwei verschiedene Platzhalter (z. B. `T` und `U`).

### Aufgabe 3: Der Werte-Tauscher (Funktion) 🔄
Plane eine generische Funktion namens `tauschen`.
*   Die Funktion soll zwei Argumente desselben Typs `T` entgegennehmen.
*   Als Rückgabe soll die Funktion ein Tupel liefern, bei dem die Reihenfolge der beiden Argumente vertauscht ist.
*   *Überlege:* Wie muss die Funktionssignatur lautet, damit sie für jeden beliebigen Typ `T` funktioniert?

### Aufgabe 4: Das eigene Zustands-Enum 🚦
Wir wollen ein eigenes Enum entwerfen, das den Zustand eines Ladevorgangs beschreibt. Nenne es `LadeZustand`.
*   Das Enum soll drei Varianten haben:
    1.  `Bereit` (enthält keine Daten).
    2.  `Aktiv` (enthält einen generischen Fortschrittswert vom Typ `T`).
    3.  `Fehler` (enthält eine generische Fehlermeldung vom Typ `E`).
*   *Überlege:* Wie deklarierst du die beiden Platzhalter am Enum und wie sehen die Varianten aus?

---

## 💡 Zusammenfassung

*   **Generics** sind Platzhalter (Schablonen) für Typen, die Code-Duplizierung verhindern.
*   Sie werden mit spitzen Klammern deklariert (z. B. `struct Kiste<T>` oder `fn funktion<T>`).
*   Methoden-Implementierungen müssen ebenfalls generisch deklariert werden (`impl<T> Kiste<T>`).
*   **Monomorphisierung:** Der Compiler ersetzt die Platzhalter zur Compilierzeit durch konkrete Typen. Generics kosten dich daher **keine Laufzeit-Performance**.
*   Standardmäßig erlaubt Rust auf generischen Typen keine Operationen wie `+`, `-` oder Vergleiche. Dafür werden **Trait Bounds** benötigt (Thema im nächsten Kapitel).

---

## 📚 Links

*   [Das offizielle Rust-Buch: Generische Datentypen (Englisch)](https://doc.rust-lang.org/book/ch10-01-syntax.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Generische Datentypen (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch10-01-syntax.html)
*   [Rust by Example: Generics (Englisch)](https://doc.rust-lang.org/rust-by-example/generics.html)
*   [Konzept: Fehlerbehandlung & Result (für die Anwendung von Generics)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-result.md)
