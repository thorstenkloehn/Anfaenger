# ⏳ Lifetimes & Lebensdauern – Das Mietvertrag-Prinzip

Unter den vielen Besonderheiten von Rust gibt es ein Konzept, das Einsteigern oft den größten Respekt einflößt: **Lifetimes** (Lebensdauern). Doch wenn man das zugrunde liegende Prinzip einmal verstanden hat, verliert es schnell seinen Schrecken.

Stell dir vor, du möchtest als Untermieter (eine **Referenz**) in eine Wohngemeinschaft (WG) einziehen. Der Hauptmieter der WG hat einen offiziellen Mietvertrag (der **Besitzer** des Werts im Speicher), der noch genau für 6 Monate gültig ist. 

Der Vermieter (in Rust: der **Borrow Checker** / die Leihprüfung) ist extrem streng. Er verlangt von dir, dass du einen Untermietvertrag vorlegst. Wenn du nun einen Vertrag unterschreiben willst, der dich für 12 Monate an das Zimmer bindet, wird der Vermieter sofort einschreiten und sagen: *"Halt! Das ist illegal! Du kannst nicht 12 Monate hier wohnen, wenn der Hauptmietvertrag schon in 6 Monaten endet. Nach 6 Monaten stündest du auf der Straße und hättest keinen gültigen Wohnsitz mehr!"*

Genau das tun Lifetimes in Rust! Sie sind die Mietverträge für Referenzen. Sie garantieren dem Compiler, dass eine Referenz (der Untermieter) niemals länger lebt als der eigentliche Wert (der Hauptmieter), auf den sie verweist. So werden gefährliche Speicherfehler wie hängende Referenzen (Dangling Pointers) bereits zur Kompilierzeit unmöglich gemacht.

---

## 🧠 Theorie

### 1. Das Problem: Die hängende Referenz (Dangling Reference)
Schauen wir uns an, was passiert, wenn wir versuchen, eine Referenz zu verwenden, deren Originalwert bereits gelöscht wurde. 

```rust
fn main() {
    let r; // 1. Wir deklarieren eine Referenz 'r'

    { // Ein neuer Gültigkeitsbereich (Scope) beginnt
        let x = 5; // 2. 'x' wird erstellt
        r = &x; // 3. 'r' leiht sich den Wert von 'x' aus
    } // 4. 'x' verlässt den Scope und wird gelöscht!

    // ❌ COMPILER-FEHLER!
    println!("r: {}", r); // 'r' zeigt auf eine Speicheradresse, die nicht mehr existiert!
}
```

Wenn wir diesen Code kompilieren wollen, schreitet der Borrow Checker ein. Er stellt fest, dass `x` (der Besitzer) eine kürzere Lebensdauer hat als `r` (die Referenz). Das Programm wird nicht kompiliert.

---

### 2. Was sind Scopes?
Jede Variable in Rust hat einen exakt definierten Lebensbereich. Dieser beginnt bei ihrer Erstellung und endet spätestens an der schließenden geschweiften Klammer `}` des Blocks, in dem sie deklariert wurde. Diesen Bereich nennen wir **Scope**.

Der Compiler vergleicht im Hintergrund einfach die Scopes aller Variablen und Referenzen. Solange die Referenz innerhalb des Scopes des Besitzers bleibt, ist alles in Ordnung.

---

### 3. Warum brauchen wir Lifetime-Annotations?
In 95 % aller Fälle musst du im Code überhaupt keine Lebensdauern aufschreiben. Rust ist schlau genug, die Lebensdauern von Referenzen selbstständig zu berechnen. Dieses automatische Erkennen nennt man **Lifetime Elision** (Lebensdauer-Auslassung).

Es gibt jedoch eine Situation, in der Rust deine Hilfe benötigt: Wenn eine Funktion **mehrere Referenzen entgegennimmt** und **eine Referenz zurückgibt**.

Schauen wir uns diese scheinbar einfache Funktion an:

```rust
// ❌ COMPILER-FEHLER!
fn laengste(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

Der Compiler bricht hier mit einer Fehlermeldung ab. Warum?
Die Funktion nimmt zwei Referenzen (`x` und `y`) entgegen und gibt eine von beiden zurück. Wenn wir diese Funktion aufrufen, weiß der Compiler zur Kompilierzeit nicht, welche der beiden Referenzen zurückgegeben wird (da dies erst zur Laufzeit entschieden wird).

Wenn der Aufrufer der Funktion das Ergebnis verwenden will, muss der Compiler aber garantieren können, dass dieses Ergebnis noch gültig ist. Er muss also wissen: Hängt die Lebensdauer des Rückgabewerts an `x` oder an `y`?

---

### 4. Die Syntax von Lifetime-Annotations
Um dieses Rätsel zu lösen, fügen wir der Funktion **Lifetime-Annotations** hinzu. Diese verändern nicht die tatsächliche Lebensdauer der Daten! Sie beschreiben lediglich die Beziehung zwischen den Lebensdauern der Parameter für den Compiler.

Lifetime-Annotations beginnen immer mit einem Apostroph `'` und haben meist kurze, kleingeschriebene Namen (z. B. `'a`):

```rust
// Wir deklarieren die Lifetime 'a' in spitzen Klammern
fn laengste<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

#### Was bedeutet diese Signatur?
Sie sagt dem Compiler: 
*"Lieber Compiler, nimm an, dass die Parameter `x` und `y` mindestens so lange leben wie die Lebensdauer `'a`. Der Rückgabewert der Funktion wird ebenfalls mindestens so lange leben wie `'a`."*

In der Praxis bedeutet das: Die Lebensdauer `'a` entspricht der **kürzeren** Lebensdauer von `x` und `y`. Der Rückgabewert ist also garantiert nur so lange gültig, wie der kurzlebigste der beiden Eingabeparameter lebt.

---

### 5. Lifetimes in Structs
Manchmal möchtest du ein Struct bauen, das keine eigenen Daten besitzt, sondern Referenzen auf Daten speichert, die woanders liegen. In diesem Fall muss auch das Struct eine Lifetime-Annotation erhalten:

```rust
// Das Struct 'Zitierer' leiht sich einen Text aus
struct Zitierer<'a> {
    teil_text: &'a str, // Diese Referenz muss mindestens so lange leben wie das Struct selbst
}
```

Diese Deklaration zwingt den Compiler zu prüfen, dass kein `Zitierer`-Objekt jemals länger existiert als der Text, aus dem es zitiert.

---

### 6. Die statische Lebensdauer (`'static`)
Es gibt eine ganz besondere Lifetime in Rust: **`'static`**.

Ein Wert mit der Lebensdauer `'static` lebt für die **gesamte Laufzeit des Programms** und wird niemals gelöscht.
Alle String-Literale (fester Text direkt im Code) haben automatisch die Lebensdauer `'static`:

```rust
// Dieser Text ist fest in das fertige Programm einkompiliert
let text: &'static str = "Ich lebe ewig!";
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Lebenszyklen der Variablen analysierst und die Beziehungen aufschreibst.

### Aufgabe 1: Der Scopes-Detektiv 🔍
Betrachte den folgenden fiktiven Code-Ablauf. Finde heraus, an welcher Stelle der Compiler meckern wird und begründe warum (nutze die Analogie von Haupt- und Untermieter).

```text
Scope-Start Hauptprogramm {
    Erstelle Variable 'besitzer_a' mit dem Wert 42.
    Erstelle leere Referenz 'leihgabe'.
    
    Scope-Start Unterbereich {
        Erstelle Variable 'besitzer_b' mit dem Wert 100.
        Lasse 'leihgabe' auf 'besitzer_b' verweisen.
    } Scope-Ende Unterbereich
    
    Gebe den Wert von 'leihgabe' auf dem Bildschirm aus.
} Scope-Ende Hauptprogramm
```

### Aufgabe 2: Der Namens-Vergleicher 🏷️
Wir wollen eine Funktion namens `waehle_ersten` schreiben.
*   Die Funktion soll zwei Textreferenzen (`&str`) entgegennehmen.
*   Sie soll diejenige Referenz zurückgeben, die alphabetisch zuerst kommt.
*   *Aufgabe:* Schreibe die vollständige Funktionssignatur (inklusive der spitzen Klammern `<...>` und der Lifetime-Annotations `'a`), ohne den Funktionskörper zu programmieren.

### Aufgabe 3: Das Buch-Struct 📖
Wir planen ein Struct namens `BuchAuszug`.
*   Das Struct soll ein wichtiges Kapitel eines Buches als Referenz (`&str`) speichern.
*   *Aufgabe:* Skizziere die Definition des Structs. Wo musst du überall die Lifetime `'a` deklarieren? Warum darf das Struct `BuchAuszug` nicht länger existieren als der originale Buch-String im Speicher?

### Aufgabe 4: Das Unmöglichkeits-Rätsel 🧩
Ein Programmier-Anfänger versucht, eine Funktion zu schreiben, die eine Referenz auf einen neu erstellten String zurückgibt:

```rust
fn erstelle_gruß() -> &str {
    let gruss = String::from("Hallo!");
    &gruss
}
```

*   *Überlege:* Warum wird diese Funktion **niemals** kompilieren, egal welche Lifetime-Annotations du hinzufügst? Was passiert mit `gruss` am Ende der Funktion? Wie müsste man die Funktion umbauen, damit sie gültigen Code liefert (Tipp: Ownership-Rückgabe)?

---

## 💡 Zusammenfassung

*   **Lifetimes** garantieren dem Compiler, dass keine Referenz länger lebt als die Daten, auf die sie verweist.
*   Sie verhindern **Dangling References** (hängende Referenzen) bereits zur Kompilierzeit.
*   Meistens ermittelt Rust die Lifetimes automatisch (**Lifetime Elision**).
*   Wir müssen Lifetimes manuell deklarieren (z. B. `'a`), wenn eine Funktion Referenzen empfängt und eine davon zurückgibt.
*   Structs, die Referenzen speichern, müssen zwingend mit Lifetimes markiert werden (`struct Name<'a>`).
*   **`'static`** ist eine spezielle Lebensdauer für Daten, die das gesamte Programm über existieren (z. B. String-Literale).

---

## 📚 Links

*   [Das offizielle Rust-Buch: Validieren von Referenzen mit Lifetimes (Englisch)](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Validieren von Referenzen mit Lifetimes (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch10-03-lifetime-syntax.html)
*   [Rust by Example: Lifetimes (Englisch)](https://doc.rust-lang.org/rust-by-example/scope/lifetime.html)
*   [Konzept: Ownership & Borrowing (Die Grundlage für Lifetimes)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-ownership.md)
