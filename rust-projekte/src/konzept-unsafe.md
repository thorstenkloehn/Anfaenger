# ⚠️ Unsafe Rust & Rohe Zeiger – Das Free-Solo-Prinzip

Normales Programmieren in Rust ist wie Klettern in einem professionellen **Hochseilgarten**. 

Du bist mit Klettersteigset, Sicherheitsgurt und doppeltem Seil gesichert. Der Compiler und seine strengen Borrow-Checks sind deine Sicherheitsausrüstung. Selbst wenn du den Halt verlierst, einen Schritt ins Leere machst oder abrutschst, fängt dich das Sicherheitsnetz ab. Dein Programm stürzt nicht mit undefiniertem Verhalten oder Speicherfehlern ab.

**Unsafe Rust** ist wie **Free-Solo-Klettern (Klettern ohne Seil)** im freien Gebirge. 

*   Es ist an sich nicht automatisch "schlechter" oder "falscher" Code – Kletterprofis können auch ohne Seil sicher oben ankommen.
*   Aber wenn du einen Fehler machst (z. B. an einen losen Stein greifst oder abrutschst), fängt dich kein Seil auf. Du stürzt ungebremst ab. Im Programm bedeutet das: Abstürze (Segfaults), Sicherheitslücken und korrupter Arbeitsspeicher.

Warum macht man das also? Manchmal musst du extreme Pfade gehen, wo man kein Sicherungsseil befestigen kann – zum Beispiel, wenn du direkt mit der Hardware oder einem fremden Betriebssystem-Treiber sprichst.

Die wichtigste Regel in Rust lautet: **Klettere so kurz wie möglich ohne Seil!** 
Du sperrst den Free-Solo-Abschnitt in ein kleines Gehäuse (den **`unsafe`-Block**) und baust eine absolut sichere Schnittstelle nach außen. Die Benutzer deines Codes können sich dann wieder wie im Hochseilgarten fühlen.

---

## 🧠 Theorie

### 1. Was `unsafe` tut – und was nicht
Ein weit verbreiteter Irrtum ist, dass `unsafe` den Borrow-Checker ausschaltet oder alle Sicherheitsprüfungen deaktiviert. Das stimmt nicht! Auch in einer `unsafe`-Umgebung prüft Rust weiterhin Lifetimes, Typkompatibilität und Variablen-Initialisierungen.

Das Schlüsselwort `unsafe` gibt dir lediglich Zugriff auf **fünf magische Kräfte** (unsichere Operationen), die der Compiler nicht auf Speichersicherheit prüfen kann:

1.  **Rohe Zeiger (Raw Pointers) dereferenzieren.**
2.  **Unsafe Funktionen oder Traits aufrufen oder implementieren.**
3.  **Auf veränderliche statische Variablen (`static mut`) zugreifen oder sie ändern.**
4.  **Felder einer `union` lesen.**
5.  **Externe Funktionen aufrufen (z. B. über FFI).**

---

### 2. Rohe Zeiger (Raw Pointers)
Im sicheren Rust nutzen wir Referenzen (`&T` und `&mut T`). Der Compiler garantiert, dass diese immer auf gültigen Speicher zeigen.

Im unsicheren Rust gibt es **rohe Zeiger** (raw pointers):
*   **`*const T`**: Ein unveränderlicher roher Zeiger auf einen Wert vom Typ `Item`.
*   **`*mut T`**: Ein veränderlicher roher Zeiger.

Rohe Zeiger haben im Vergleich zu sicheren Referenzen völlig andere Regeln:
*   Sie dürfen die Borrowing-Regeln ignorieren (es darf gleichzeitig einen schreibenden und mehrere lesende Zeiger auf dieselbe Speicheradresse geben).
*   Sie dürfen `null` sein (auf die Speicheradresse 0 zeigen).
*   Sie haben keine automatische Lebensdauer-Prüfung (Lifetimes).
*   Sie garantieren nicht, dass an der Adresse überhaupt gültiger Speicher liegt.

#### Das Zeiger-Experiment
Das Erstellen von rohen Zeigern ist in Rust völlig sicher! Erst das **Dereferenzieren** (also der Zugriff auf den Wert, auf den der Zeiger zeigt) erfordert einen `unsafe`-Block.

```rust
fn main() {
    let mut zahl = 42;

    // Sichere Zuweisung roher Zeiger aus normalen Referenzen (völlig legal ohne unsafe!)
    let r1 = &zahl as *const i32;
    let r2 = &mut zahl as *mut i32;

    // Bis hierhin ist nichts Gefährliches passiert. Die Zeiger existieren nur.

    // Erst das Auslesen oder Beschreiben des Werts erfordert 'unsafe'
    unsafe {
        println!("Wert über r1: {}", *r1); // Ausgabe: 42
        *r2 = 100;
        println!("Wert über r2: {}", *r2); // Ausgabe: 100
    }
}
```

---

### 3. Sichere Abstraktionen bauen
Das Ziel von Unsafe Rust ist fast immer das Kapseln von Gefahr. 

Ein gutes Beispiel aus der Standardbibliothek ist die Methode `split_at_mut` bei Slices. Sie teilt einen Vektor in zwei veränderliche Teile. Da Rusts Borrow-Checker nicht verstehen kann, dass zwei Slices auf unterschiedliche Teile desselben Vektors zeigen, müssen die Entwickler intern `unsafe` nutzen. Die Methode selbst ist aber absolut sicher aufzurufen!

```rust
// Eine vereinfachte Darstellung, wie man eine sichere Kapsel baut
struct SichererWrapper {
    roher_zeiger: *mut i32,
}

impl SichererWrapper {
    // Der Konstruktor übernimmt die Verantwortung, dass der Zeiger gültig ist
    fn new(referenz: &mut i32) -> Self {
        SichererWrapper {
            roher_zeiger: referenz as *mut i32,
        }
    }

    // Nach außen hin bieten wir eine vollkommen sichere Schnittstelle an
    fn lese_wert(&self) -> i32 {
        // Intern müssen wir unsafe nutzen, um den Zeiger zu lesen
        unsafe { *self.roher_zeiger }
    }
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Strukturen skizzierst und die logischen Abläufe planst.

### Aufgabe 1: Das Zeiger-Experiment 🧪
Wir wollen eine Speicheradresse manuell untersuchen.
*   Erstelle in Gedanken eine Variable `let mut daten = 10;`.
*   Erstelle zwei rohe Zeiger darauf: Einen unveränderlichen (`*const i32`) und einen veränderlichen (`*mut i32`).
*   Verändere den Wert über den veränderlichen Zeiger und gib ihn über den unveränderlichen Zeiger aus.
*   *Aufgabe:* Skizziere den Code. Welche Zeilen müssen zwingend in einen `unsafe`-Block geschrieben werden und welche dürfen außerhalb stehen? Warum?

### Aufgabe 2: Der Null-Pointer-Unfall (Gedankenspiel) 💥
In C und C++ ist der Null-Pointer-Fehler berüchtigt.
*   In Rust können wir einen Null-Pointer erstellen mit `std::ptr::null::<i32>()`.
*   *Aufgabe:* Was passiert, wenn du versuchst, einen solchen Null-Pointer in einem `unsafe`-Block zu dereferenzieren? Was macht das Betriebssystem in diesem Moment? Warum verhindert Rust das im sicheren Code?

### Aufgabe 3: Die geteilte Box 📦
Du möchtest eine Datenstruktur schreiben, die es erlaubt, dass zwei verschiedene Programmteile direkten Zugriff auf dieselbe Speicherstelle erhalten, ohne `Rc<RefCell<T>>` zu nutzen (z.B. für extreme Performanceoptimierung).
*   Du planst ein Struct `Teilhaber`, das einen rohen Zeiger `*mut i32` hält.
*   *Aufgabe:* Welche Sicherheitsgarantien musst du als Entwickler von `Teilhaber` manuell zusichern, damit das Programm nicht abstürzt? Was passiert, wenn die ursprüngliche Variable, auf die der Zeiger verweist, freigegeben wird (Dangling Pointer)?

### Aufgabe 4: Das Auswendiglernen der 5 Kräfte 🧠
*   *Aufgabe:* Erkläre in deinen eigenen Worten, warum das Verändern einer veränderlichen statischen Variable (`static mut`) in Rust als unsicher (`unsafe`) eingestuft wird. Welches Problem droht, wenn zwei Threads gleichzeitig darauf zugreifen?

---

## 💡 Zusammenfassung

*   `unsafe` schaltet den Borrow-Checker nicht ab, sondern gibt Zugriff auf 5 spezielle Operationen.
*   **Rohe Zeiger** (`*const T`, `*mut T`) dürfen die Borrow-Rules umgehen, `null` sein und haben keine automatische Lebensdauer-Prüfung.
*   Das **Erstellen** eines Zeigers ist sicher; das **Dereferenzieren** (Zollkontrolle passieren) erfordert `unsafe`.
*   Die wichtigste Entwicklerpflicht: **Unsafe-Code immer in sichere APIs kapseln**, damit der Rest des Programms geschützt bleibt.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Unsafe Rust (Englisch)](https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Unsicheres Rust (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch19-01-unsafe-rust.html)
*   [Das Rustonomicon (Das ultimative Buch über Unsafe Rust - Fortgeschritten!)](https://doc.rust-lang.org/nomicon/)
*   [Konzept: Smart Pointer & Speicherverwaltung (Wichtig zum Verständnis von Stack/Heap und Zeigern)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-box.md)
