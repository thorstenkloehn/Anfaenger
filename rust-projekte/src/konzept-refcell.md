# 🧪 `RefCell<T>` & Interior Mutability – Das Bibliothekar-Prinzip

Bisher hat uns der Rust-Compiler eine eiserne Regel eingeprägt: **Du darfst Daten entweder an viele Leser gleichzeitig verleihen ODER an genau einen Schreiber, aber niemals beides zeitgleich.** 

Normalerweise prüft der Compiler diese Leihregeln streng beim Übersetzen deines Codes. Findet er eine Verletzung, bricht er mit einem Fehler ab. 

Manchmal schränkt uns das aber zu stark ein. Stell dir vor, du gehst in eine Bibliothek. Die wertvollen Bücher liegen in einer abgeschlossenen Glasvitrine. Von außen betrachtet sind sie unveränderlich – du darfst sie nur anschauen. 

Aber es gibt einen **Bibliothekar** (in Rust: **`RefCell<T>`**). Wenn du ein Buch korrigieren oder eine Notiz hinzufügen willst, gehst du zum Bibliothekar. Er schließt die Vitrine für dich auf. Er wacht jedoch streng darüber, wer das Buch gerade hat:
*   Er erlaubt es, dass fünf Personen gleichzeitig Kopien eines Kapitels lesen.
*   Erlaubt er jedoch einer Person, im Buch zu schreiben, darf zur gleichen Zeit absolut niemand anderes das Buch lesen oder darin schreiben.
*   Versucht jemand, diese Regeln zu brechen, wird der Bibliothekar wütend und wirft den Störenfried hochkant aus der Bibliothek (in Rust: das Programm stürzt zur Laufzeit mit einem **`panic!`** ab).

Dieses Konzept nennen wir **Interior Mutability** (innere Veränderbarkeit). Es erlaubt uns, Daten zu verändern, obwohl die äußere Datenstruktur als unveränderlich (`immutable`) deklariert ist.

---

## 🧠 Theorie

### 1. Compile-Time vs. Run-Time Borrow Checking
Der wesentliche Unterschied zwischen normalem Rust-Code und `RefCell` liegt im Zeitpunkt der Überprüfung:

| Eigenschaft | Normaler Code (Compile-Time) | mit `RefCell<T>` (Run-Time) |
| :--- | :--- | :--- |
| **Prüfzeitpunkt** | Während des Kompilierens | Während das Programm läuft |
| **Fehler-Folge** | Compiler-Fehler (Programm startet nicht) | Laufzeit-Absturz (`panic!`) |
| **Performance** | Keine Einbußen (Zero-Cost) | Minimaler Overhead durch Zähler |
| **Flexibilität** | Streng, aber absolut sicher | Sehr flexibel, Risiko von Abstürzen |

---

### 2. Die Methoden von `RefCell<T>`
Um auf den Inhalt einer `RefCell` zuzugreifen, nutzen wir keine normalen Referenzen (`&` oder `&mut`), sondern rufen Methoden auf, die die Leihregeln zur Laufzeit prüfen:

*   **`borrow(&self) -> Ref<T>`:** Leiht den Wert unveränderlich aus (wie `&T`). Der interne Leser-Zähler des Bibliothekars erhöht sich um 1.
*   **`borrow_mut(&self) -> RefMut<T>`:** Leiht den Wert veränderlich aus (wie `&mut T`). Der Bibliothekar prüft, ob aktuell bereits Leser aktiv sind. Wenn nicht, gewährt er exklusiven Zugriff.

Sobald die zurückgegebenen Typen `Ref` oder `RefMut` ihren Scope verlassen, verringert der Bibliothekar den Zähler automatisch wieder.

```rust
use std::cell::RefCell;

fn main() {
    // Ein unveränderlicher Behälter im Speicher
    let behaelter = RefCell::new(5);

    // 1. Wir leihen den Wert veränderlich aus, obwohl 'behaelter' selbst nicht 'mut' ist!
    {
        let mut schreiber = behaelter.borrow_mut();
        *schreiber = 10; // Wert auf 10 ändern
    } // 'schreiber' verlässt den Scope. Der veränderliche Zugriff endet.

    // 2. Wir leihen den Wert unveränderlich aus
    let leser_a = behaelter.borrow();
    let leser_b = behaelter.borrow();

    println!("Leser A sieht: {}", leser_a);
    println!("Leser B sieht: {}", leser_b);
}
```

---

### 3. Die große Gefahr: Laufzeit-Panics!
Da der Compiler die Prüfung bei `RefCell` an die Laufzeit abgibt, meckert er beim Kompilieren nicht, wenn wir die Leihregeln verletzen. Das folgende Programm lässt sich problemlos kompilieren, stürzt aber beim Starten sofort ab:

```rust
use std::cell::RefCell;

fn main() {
    let daten = RefCell::new(String::from("Hallo"));

    let _leser = daten.borrow();
    
    // ❌ ABSTURZ ZUR LAUFZEIT (Panic!)
    // Wir versuchen veränderlich auszuleihen, während noch ein Leser aktiv ist!
    let mut _schreiber = daten.borrow_mut(); 
    
    _schreiber.push_str(" Welt");
}
```

*Fehlermeldung:* `already borrowed: BorrowMutError`

> [!WARNING]
> **Nutze `RefCell` mit Vorsicht!**
> Ein Absturz zur Laufzeit ist immer schlechter als ein Fehler beim Kompilieren. Verwende `RefCell` nur dann, wenn es sich architektonisch nicht anders lösen lässt (z. B. bei geteilten Datenstrukturen oder Mock-Objekten für Tests).

---

### 4. Der Klassiker: `Rc<RefCell<T>>`
Die wahre Stärke von `RefCell` entfaltet sich in Kombination mit dem im letzten Kapitel gelernten `Rc` (oder `Arc`). 

*   `Rc<T>` erlaubt es, dass Daten **mehrere Besitzer** haben, macht sie aber unveränderlich.
*   `RefCell<T>` erlaubt es, **unveränderliche Daten zu verändern**.

Kombiniert man beide zu **`Rc<RefCell<T>>`**, erhält man das Beste aus beiden Welten: **Daten mit mehreren Besitzern, die von jedem Besitzer verändert werden können.**

```rust
use std::rc::Rc;
use std::cell::RefCell;

struct Widget {
    sichtbar: bool,
}

fn main() {
    // Ein geteiltes, veränderbares Widget im Speicher
    let shared_widget = Rc::new(RefCell::new(Widget { sichtbar: true }));

    // Besitzer A klont den Zeiger
    let besitzer_a = Rc::clone(&shared_widget);
    // Besitzer B klont den Zeiger
    let besitzer_b = Rc::clone(&shared_widget);

    // Besitzer A ändert den Zustand
    besitzer_a.borrow_mut().sichtbar = false;

    // Besitzer B sieht die Änderung sofort!
    println!("Widget sichtbar für B: {}", besitzer_b.borrow().sichtbar); // Ausgabe: false
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Konzepte und Logiken planst.

### Aufgabe 1: Der Mock-Logger für Unit-Tests 📝
Ein Trait `Logger` ist wie folgt definiert: `fn log(&self, nachricht: &str)`. Beachte das unveränderliche `&self`!
*   Für einen Test wollen wir einen `MockLogger` schreiben, der jede geloggte Nachricht in einem internen Vektor (`Vec<String>`) speichert, damit wir im Test prüfen können, was geloggt wurde.
*   *Die Herausforderung:* Da `log` nur `&self` akzeptiert, können wir den Vektor normalerweise nicht verändern.
*   *Aufgabe:* Skizziere das Struct `MockLogger` unter Verwendung von `RefCell`. Erkläre, wie die Methode `log` implementiert werden muss, um Nachrichten trotz `&self` im Vektor zu speichern.

### Aufgabe 2: Der Doppel-Ausleih-Crash 💥
Betrachte das folgende fiktive Programmsegment:
```rust
let werte = RefCell::new(vec![1, 2, 3]);
let mut ref_a = werte.borrow_mut();
ref_a.push(4);
let ref_b = werte.borrow(); // Stelle B
println!("{:?}", ref_b);
```
*   *Aufgabe:* Erkläre präzise, was an "Stelle B" beim Ausführen des Programms passiert. Warum meckert der Compiler nicht beim Bauen des Projekts?

### Aufgabe 3: Der zyklische Graph-Knoten (Rc + RefCell) 🕸️
Wir wollen ein einfaches Modell für ein soziales Netzwerk bauen, bei dem Personen miteinander befreundet sind.
*   Ein `Knoten` (eine Person) hat einen `namen` (String).
*   Zudem hat er eine Liste von Freunden. Da Freundschaften gegenseitig sind (A ist befreundet mit B, B ist befreundet mit A) und sich dynamisch ändern können, liegt hier geteilter, veränderbarer Besitz vor.
*   *Aufgabe:* Überlege, wie die Typdefinition für das Feld `freunde` im Struct `Knoten` aussehen muss. Nutze die Kombination aus `Rc` und `RefCell` sowie `Vec`.

### Aufgabe 4: Compile-Time vs. Run-Time Vergleich ⚖️
Erstelle eine Gegenüberstellung der Vor- und Nachteile der compilezeit-geprüften Leihregeln gegenüber der laufzeit-geprüften Leihregeln von `RefCell`.
*   *Überlege:* In welchen Szenarien (z. B. Performance-kritische Echtzeitsysteme vs. hochdynamische Benutzeroberflächen) ist welcher Ansatz besser geeignet und warum?

---

## 💡 Zusammenfassung

*   **`RefCell<T>`** ermöglicht **Interior Mutability** (innere Veränderbarkeit): Daten können verändert werden, obwohl der äußere Behälter unveränderlich ist.
*   Die Leihregeln von Rust werden bei `RefCell` erst zur **Laufzeit** statt zur Kompilierzeit geprüft.
*   Mit **`borrow()`** erhalten wir einen unveränderlichen Lese-Zeiger (`Ref`).
*   Mit **`borrow_mut()`** erhalten wir einen exklusiven Schreib-Zeiger (`RefMut`).
*   Werden die Leihregeln zur Laufzeit verletzt (z. B. schreiben, während jemand liest), stürzt das Programm mit einer **Panic** ab.
*   Die Kombination **`Rc<RefCell<T>>`** ist der Rust-Standard für geteilte, veränderbare Datenstrukturen im selben Thread.

---

## 📚 Links

*   [Das offizielle Rust-Buch: `RefCell<T>` und das Interior Mutability Pattern (Englisch)](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
*   [Die deutsche Übersetzung des Rust-Buchs: `RefCell<T>` (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch15-05-interior-mutability.html)
*   [Rust by Example: RefCell (Englisch)](https://doc.rust-lang.org/rust-by-example/std/box.html)
*   [Konzept: `Rc<T>` & `Arc<T>` (Die Grundlage für geteilten Besitz)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-rc-arc.md)
