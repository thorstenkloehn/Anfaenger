# 🔌 Das C-ABI: Die universelle Brücke zwischen Sprachen

Wenn du Programme schreibst, arbeiten verschiedene Module, Bibliotheken und manchmal sogar völlig unterschiedliche Programmiersprachen zusammen. Doch wie stellt der Computer sicher, dass eine in Rust geschriebene Funktion eine in C oder C++ geschriebene Funktion fehlerfrei aufrufen kann? 

Die Antwort lautet: **C-ABI (Application Binary Interface)**. 

Das C-ABI ist der kleinste gemeinsame Nenner der Systemprogrammierung. Es legt die Spielregeln fest, wie compiliertes Programm-Binärcode im Arbeitsspeicher und auf CPU-Ebene miteinander kommuniziert. In diesem Kapitel tauchen wir tief in die Funktionsweise des C-ABIs ein und lernen, wie wir es in Rust nutzen.

---

## 🧠 Theorie: API vs. ABI

Um das ABI zu verstehen, müssen wir es zuerst vom bekannten Begriff **API** abgrenzen:

| Begriff | Ebene | Analogie |
| :--- | :--- | :--- |
| **API** (*Application Programming Interface*) | **Quellcode-Ebene** (Source Code) | Das geschriebene Kochrezept. Es definiert für den Programmierer die Namen von Funktionen, Parametern und Typen. |
| **ABI** (*Application Binary Interface*) | **Binär-Ebene** (Compiled Machine Code) | Die physikalische Steckverbindung (z. B. USB-C). Sie definiert, in welchen Registern die Daten liegen und wie der Speicher strukturiert ist. |

Ein Compiler nimmt deinen Quellcode (der sich an die API hält) und erzeugt Maschinencode, der sich an das ABI der Zielplattform halten muss.

---

## Die drei Säulen des C-ABIs

Das C-ABI regelt im Wesentlichen drei fundamentale Bereiche:

### 1. Aufrufkonventionen (Calling Conventions)
Wenn eine Funktion eine andere aufruft, müssen Daten übergeben werden. Die Aufrufkonvention regelt exakt:
* **Wo liegen die Argumente?** Werden sie in bestimmte CPU-Register geladen (z. B. `rdi`, `rsi`, `rdx` unter Linux x86_64) oder auf den Stack gelegt?
* **Wo liegt der Rückgabewert?** Meistens im Register `rax`.
* **Wer räumt auf?** Muss der Aufrufer (*Caller*) den Stack-Speicher nach dem Aufruf bereinigen oder die aufgerufene Funktion (*Callee*)?

> [!IMPORTANT]
> **Plattformabhängigkeit:** Das ABI ist nicht für jede CPU gleich. Linux nutzt für x86_64 das *System V AMD64 ABI*, während Windows auf derselben CPU die *Microsoft x64 Calling Convention* nutzt. Das bedeutet: C-Binärcode für Linux läuft nicht ohne Weiteres auf Windows!

---

### 2. Daten-Layout (Data Layout, Alignment & Padding)
Wie liegen Variablen und Strukturen im Arbeitsspeicher?
Computer lesen Daten am effizientesten, wenn sie an bestimmten Adressen ausgerichtet sind. Ein 32-Bit-Integer (4 Byte) sollte an einer Speicheradresse liegen, die durch 4 teilbar ist. Das nennt man **Alignment**.

Um dieses Alignment zu garantieren, fügt der Compiler unsichtbare Füllbytes ein: **Padding**.

#### Das Padding-Experiment:
Stell dir folgende Struktur vor:

```rust
struct Mix {
    a: u8,   // 1 Byte
             // (3 Bytes Padding!)
    b: u32,  // 4 Bytes (muss an 4-Byte-Grenze ausgerichtet sein)
    c: u8,   // 1 Byte
             // (3 Bytes Padding am Ende!)
}
```

* **Im C-ABI (`#[repr(C)]`):** Die Felder müssen exakt in der Reihenfolge liegen, in der sie deklariert wurden. Die Größe beträgt durch das Padding **12 Bytes**!
* **In Rust standardmäßig (`#[repr(Rust)]`):** Rust darf die Felder umordnen, um Speicherplatz zu sparen. Der Rust-Compiler schiebt `a` und `c` zusammen:
  ```rust
  struct MixOptimiert {
      b: u32,  // 4 Bytes
      a: u8,   // 1 Byte
      c: u8,   // 1 Byte
               // (2 Bytes Padding am Ende)
  }
  ```
  Größe in Rust: Nur **8 Bytes**!

---

### 3. Namens-Dekoration (Name Mangling)
In Sprachen wie C++ und Rust gibt es Funktionsüberladung (Overloading) und Namespaces. Der Compiler muss eindeutige Namen für den Linker erzeugen. 
Aus einer Funktion `fn add(x: i32)` und `fn add(x: f32)` generiert C++ im Hintergrund dekorierte Namen wie `_Z3addi` und `_Z3addf`. 

C unterstützt kein Überladen. Der Funktionsname bleibt im Maschinencode exakt so, wie du ihn geschrieben hast. Damit Rust-Funktionen von C-Code gefunden werden können, müssen wir die Namensdekoration in Rust mit `#[no_mangle]` abschalten!

---

## 🛠️ Praxis: C-ABI in Rust erzwingen

Wenn wir mit FFI (Foreign Function Interface) arbeiten, müssen wir Rust anweisen, das standardmäßige C-ABI für Daten und Funktionen zu nutzen.

### 1. Daten-Layout anpassen: `#[repr(C)]`

Mit dem Attribut `#[repr(C)]` sagst du dem Rust-Compiler: *"Ordne diese Struktur exakt so im Speicher an, wie es ein C-Compiler tun würde."*

```rust
#[repr(C)]
pub struct CCompatibleStruct {
    pub id: u32,
    pub status: u8,
}
```

### 2. Aufrufkonvention anpassen: `extern "C"` & `#[no_mangle]`

Damit eine Rust-Funktion von C aufgerufen werden kann (oder umgekehrt), müssen wir die C-Aufrufkonvention nutzen und das Name Mangling verhindern:

```rust
// #[no_mangle] verhindert, dass Rust den Funktionsnamen kryptisch verpackt
// extern "C" erzwingt die C-Calling-Convention
#[no_mangle]
pub extern "C" fn addieren(a: i32, b: i32) -> i32 {
    a + b
}
```

---

## 🛠️ Praxis-Aufgaben

### Aufgabe 1: Die Padding-Größe berechnen
Berechne die Größe der folgenden Structs im Speicher, wenn sie mit `#[repr(C)]` kompiliert werden. 

```rust
#[repr(C)]
struct AufgabeA {
    x: u16,  // 2 Bytes
    y: u8,   // 1 Byte
    z: u32,  // 4 Bytes
}

#[repr(C)]
struct AufgabeB {
    x: u8,   // 1 Byte
    z: u32,  // 4 Bytes
    y: u16,  // 2 Bytes
}
```

**Deine Aufgabe:** 
1. Wie viele Bytes belegen `AufgabeA` und `AufgabeB` jeweils im Speicher inklusive Padding?
2. Schreibe ein kurzes Rust-Programm und überprüfe deine Berechnung mit `std::mem::size_of::<AufgabeA>()`.
*(Hinweis: Bedenke, dass der Compiler jedes Feld an seiner eigenen Typgröße ausrichtet. `z: u32` verlangt eine Ausrichtung an einer durch 4 teilbaren Adresse).*

### Aufgabe 2: FFI Lückentext (C-Funktion in Rust aufrufen)
Wir möchten eine Funktion aus der C-Standardbibliothek (`abs` für den Absolutwert einer Zahl) in Rust aufrufen. Vervollständige das Code-Gerüst.

```rust
// todo: Deklariere die externe C-Funktion
extern "C" {
    // Die C-Signatur ist: int abs(int j);
    // Bringe dies in die korrekte Rust-Syntax:
    /* todo: fn abs(...) -> ...; */
}

fn main() {
    let negative_zahl = -42;
    
    // Warnung: Da FFI-Aufrufe die Sicherheitsgarantien von Rust umgehen, 
    // müssen sie in einem bestimmten Block stehen.
    let positive_zahl = unsafe {
        // todo: Rufe die C-Funktion hier auf
        /* abs(negative_zahl) */
    };
    
    println!("Der Absolutwert von {} ist {}", negative_zahl, positive_zahl);
}
```

---

## 🚀 Experimente

### Experiment: Symbol-Tabelle auslesen
Erstelle eine Bibliothek in Rust mit zwei Funktionen:
```rust
// Datei: lib.rs
pub fn rust_funktion() {}

#[no_mangle]
pub extern "C" fn c_kompatible_funktion() {}
```

Kompiliere das Projekt als statische Bibliothek (`lib.a` oder `lib.so`) und nutze das Terminal-Werkzeug `nm` (unter Linux/macOS), um die exportierten Symbole der Binärdatei anzuzeigen:

```bash
nm target/debug/libname.a | grep funktion
```

Du wirst sehen:
* `c_kompatible_funktion` steht als sauberer Klartext in der Symboltabelle.
* `rust_funktion` ist durch kryptische Zeichen (Name Mangling, z. B. `_ZN7libname13rust_funktion17h8f...E`) geschützt.

---

## 💡 Zusammenfassung

* **API** ist für den Programmierer (Source Code), **ABI** ist für die CPU und den Linker (Binär-Ebene).
* Rust hat kein stabiles ABI. Jedes Update des Compilers darf das Speicherlayout ändern.
* Um mit C, C++ oder anderen Sprachen zu kommunizieren, müssen wir das stabile **C-ABI** nutzen.
* **`#[repr(C)]`** erzwingt das C-Daten-Layout (inkl. Padding & Alignment).
* **`extern "C"`** erzwingt die C-Aufrufkonvention.
* **`#[no_mangle]`** schaltet die Namens-Verzierung ab, damit der Linker die Symbole findet.

---

## 📚 Links
* [The Rustonomicon - Alternative Representations](https://doc.rust-lang.org/nomicon/other-reprs.html) – Offizielle Dokumentation zu den Speicherlayouts in Rust.
* [System V Application Binary Interface (PDF)](https://refspecs.linuxbase.org/elf/x86_64-abi-0.99.pdf) – Das Standard-ABI-Dokument für Linux auf x86_64-Systemen.
* [Rust FFI Guide](https://doc.rust-lang.org/nomicon/ffi.html) – Anleitung für die Schnittstellen zwischen Rust und C.
