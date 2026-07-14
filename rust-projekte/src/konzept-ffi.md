# 🔌 FFI (Foreign Function Interface) – Das Dolmetscher-Prinzip

Rust und C sind wie zwei verschiedene Länder. Sie haben **unterschiedliche Sprachen** (Datenstrukturen liegen anders im Speicher) und **andere Steckdosen-Standards** (wie Funktionen Parameter übergeben).

Das **Foreign Function Interface (FFI)** ist der **Dolmetscher** oder der **Reiseadapter** an der Landesgrenze. 

Wenn Rust-Code eine Funktion aufruft, die in C geschrieben wurde, müssen wir:
1.  **Den Stecker anpassen (`extern "C"`):** Wir sagen Rust, wie die C-Funktion heißt und wie die Parameter übergeben werden müssen.
2.  **Die Daten übersetzen (`#[repr(C)]`):** Wir zwingen den Rust-Compiler, Structs exakt so im Speicher anzuordnen, wie C es erwartet.
3.  **Die Sicherheitskontrolle passieren (`unsafe`):** C-Code kennt keinen Borrow-Checker, keine Lifetimes und kein automatisches Speichermanagement. Sobald Daten die Grenze nach C überschreiten, kann Rust nicht mehr garantieren, was damit passiert. Daher ist jeder FFI-Aufruf aus Sicht von Rust grundsätzlich **`unsafe`**.

---

## 🧠 Theorie

### 1. Eine C-Funktion in Rust aufrufen
Um eine Funktion aus einer C-Bibliothek zu importieren, deklarieren wir sie in einem `extern "C"`-Block. Rust kennt dann die Signatur der Funktion, weiß aber nicht, was sie tut.

Ein einfaches Beispiel mit einer Standard-C-Funktion (wie `abs`, die den Absolutwert einer Zahl berechnet):

```rust
// Wir deklarieren die C-Funktion. 
// Da C-Typen je nach Plattform variieren, nutzen wir kompatible Typen aus std::os::raw.
use std::os::raw::c_int;

extern "C" {
    // Rust sucht beim Linken nach der C-Funktion 'abs'
    fn abs(input: c_int) -> c_int;
}

fn main() {
    let negative_zahl = -15;

    // Jede Interaktion mit dem Ausland (C) ist unsicher!
    let ergebnis = unsafe { abs(negative_zahl) };

    println!("Der Absolutwert von -15 ist: {}", ergebnis); // Ausgabe: 15
}
```

---

### 2. Datenkompatibilität: `#[repr(C)]`
Standardmäßig optimiert der Rust-Compiler die Anordnung von Feldern in einem Struct (er sortiert sie um, um Speicherlücken zu schließen). C-Compiler tun das nicht; sie legen die Felder starr in der Reihenfolge ab, wie sie deklariert wurden.

Damit ein C-Programm ein Rust-Struct versteht (oder umgekehrt), müssen wir das Attribut **`#[repr(C)]`** über das Struct schreiben.

```rust
// Ohne dieses Attribut würde das Übergeben an eine C-Funktion zu Datenmüll führen!
#[repr(C)]
struct CKompatiblerPunkt {
    x: f64,
    y: f64,
}
```

---

### 3. Kompatible C-Datentypen in Rust
Verwende niemals Standard-Rust-Typen wie `usize` oder `u32` direkt für FFI, wenn die C-Funktion ein `int` oder `long` verlangt. Die Bitbreiten dieser Typen können sich zwischen den Compilern und Betriebssystemen unterscheiden.

Nutze stattdessen das Modul **`std::os::raw`**:
*   `c_int` entspricht `int` in C.
*   `c_char` entspricht `char` in C.
*   `c_double` entspricht `double` in C.
*   `c_void` entspricht `void` in C (wichtig für rohe Zeiger `*mut c_void`).

---

### 4. Rust-Code für C bereitstellen
Wir können auch den umgekehrten Weg gehen: Wir schreiben eine performante Funktion in Rust und stellen sie als Bibliothek für ein C- oder C++-Programm bereit.

Dazu müssen wir dem Compiler zwei Dinge mitteilen:
1.  **`#[no_mangle]`:** Der Compiler verschlüsselt (mangled) standardmäßig Funktionsnamen im fertigen Binärcode, um Namenskollisionen zu vermeiden. Mit `no_mangle` zwingen wir ihn, den exakten Namen im Linker beizubehalten, damit C die Funktion findet.
2.  **`extern "C"`:** Die Funktion soll die C-Aufrufkonvention nutzen.

```rust
#[no_mangle]
pub extern "C" fn addiere_in_rust(a: i32, b: i32) -> i32 {
    a + b
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Schnittstellen planst.

### Aufgabe 1: Die C-Mathebibliothek anbinden 📐
Wir möchten die C-Funktion `pow` (Potenzieren) einbinden. In C hat sie folgende Signatur: `double pow(double base, double exponent);`.
*   *Aufgabe:* Deklariere den `extern "C"`-Block in Rust. Verwende die passenden Typen aus `std::os::raw`. Wie würde ein Aufruf aussehen, um $2^8$ zu berechnen?

### Aufgabe 2: Das Speicher-Layout-Rätsel 🧩
Ein Entwickler schreibt folgendes Struct für FFI:
```rust
struct Spieler {
    id: u32,
    aktiv: bool,
    punkte: f64,
}
```
*   *Aufgabe:* Warum wird dieser Code beim Übergeben an eine C-Bibliothek höchstwahrscheinlich zu Fehlverhalten oder Speicherabstürzen führen? Welches Attribut fehlt und wie ordnen Rust und C dieses Struct ohne das Attribut unterschiedlich an?

### Aufgabe 3: Der no_mangle Detektiv 🔍
Du baust eine Dynamic Link Library (`.so` bzw. `.dll`) in Rust. Ein C-Entwickler meldet dir, dass der Linker deine Funktion `daten_verarbeiten` nicht finden kann, obwohl sie als `pub fn` definiert ist.
*   *Aufgabe:* Welches Attribut hast du vergessen? Erkläre, was Name Mangling ist und warum der Compiler das standardmäßig tut.

### Aufgabe 4: Das Speicherleck an der Grenze (Gedankenspiel) 💧
Eine C-Funktion `char* erzeuge_text()` allokiert intern Speicher mit `malloc` und gibt einen Zeiger darauf zurück. Rust liest diesen Zeiger ein.
*   *Aufgabe:* Warum darf Rust diesen Speicher nicht einfach über seine eigene Speicherverwaltung freigeben? Was musst du tun, um ein Speicherleck zu verhindern? Welche C-Funktion musst du importieren und aufrufen?

---

## 💡 Zusammenfassung

*   **FFI** ermöglicht die Zusammenarbeit von Rust mit C/C++-Code.
*   **`extern "C"`** definiert die C-Aufrufkonvention und deklariert externe Funktionen.
*   Jeder FFI-Funktionsaufruf ist **`unsafe`**, da der Compiler den C-Code nicht kontrollieren kann.
*   **`#[repr(C)]`** zwingt Rust-Structs in das standardisierte C-Speicherlayout.
*   **`std::os::raw`** bietet plattformunabhängige C-Datentypen.
*   **`#[no_mangle]`** verhindert, dass der Linker den Funktionsnamen beim Kompilieren unkenntlich macht.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Externe Funktionen aufrufen (Englisch)](https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html#using-unsafe-code-to-call-external-code)
*   [Die deutsche Übersetzung des Rust-Buchs: FFI (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch19-01-unsafe-rust.html#mittels-unsicherem-code-externen-code-aufrufen)
*   [Die Rust FFI Omnibook (Umfangreicher Guide für FFI mit verschiedenen Sprachen)](https://jakegoulding.com/rust-ffi-omnibook/)
*   [Konzept: Unsafe Rust & Rohe Zeiger (Die Grundlage für FFI-Zugriffe)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-unsafe.md)
