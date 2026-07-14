# 🧵 Threads & Shared State – Das Bäckerei-Prinzip

Stell dir vor, du betreibst eine kleine Bäckerei. Anfangs machst du alles allein: Du knetest den Teig, wäschst das Geschirr ab, schiebst die Brötchen in den Ofen und verkaufst sie. Alles passiert nacheinander (Single-Threaded). Wenn die Brötchen 20 Minuten im Ofen backen müssen, stehst du ungenutzt herum und wartest. 

Um effizienter zu werden, stellst du drei Bäckergesellen ein (**Threads**). Nun arbeiten alle vier gleichzeitig: Einer knetet, einer wäscht ab, einer backt und einer verkauft. Die Arbeit geht viermal so schnell voran!

Allerdings gibt es ein Problem: In der Backstube gibt es nur **ein einziges Nudelholz** (eine geteilte Ressource / Shared State). 
* Wenn Geselle A und Geselle B gleichzeitig nach dem Nudelholz greifen, gibt es Streit oder das Nudelholz zerbricht (Datenrennen / **Race Condition**).
* Wenn Geselle A das Nudelholz nimmt, es aber niemals wieder hinlegt, steht die Arbeit still (Verklemmung / **Deadlock**).

Um dieses Chaos zu verhindern, stellt ihr eine Kiste mit einem Schloss für das Nudelholz auf. Wer das Nudelholz braucht, holt sich den Schlüssel (**Mutex**), schließt die Kiste auf (`lock`), nutzt das Nudelholz exklusiv und legt den Schlüssel danach wieder zurück. Und damit jeder Bäcker weiß, wo die Kiste steht, hat jeder einen Zettel mit der exakten Wegbeschreibung zur Kiste im Speicher (**Arc**).

Genau diese Koordination von Gleichzeitigkeit lernst du in diesem Kapitel kennen!

---

## 🧠 Theorie

### 1. Threads in Rust starten
Mit `std::thread::spawn` können wir einen neuen Thread erzeugen. Dieser führt eine anonyme Funktion (Closure) parallel zum Hauptprogramm aus.

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // Wir starten einen neuen Thread
    let handle = thread::spawn(|| {
        for i in 1..5 {
            println!("Hallo aus dem Thread! Nummer: {}", i);
            thread::sleep(Duration::from_millis(50)); // Kurz schlafen
        }
    });

    // Code im Haupt-Thread läuft parallel
    for i in 1..3 {
        println!("Hallo aus main! Nummer: {}", i);
        thread::sleep(Duration::from_millis(30));
    }

    // Warten, bis der gestartete Thread fertig ist
    handle.join().unwrap();
}
```

#### Das `move`-Keyword
Wenn ein Thread Variablen aus der Umgebung nutzen will, muss er deren Besitz übernehmen. Da der Compiler zur Compilezeit nicht weiß, wie lange der Thread läuft (er könnte länger leben als die aktuelle Funktion), verbietet Rust einfache Referenzen in Threads. 

Wir erzwingen die Besitzübertragung mit dem Schlüsselwort `move`:

```rust
use std::thread;

fn main() {
    let name = String::from("Rust-Entwickler");

    // Ohne 'move' würde der Compiler abbrechen!
    let handle = thread::spawn(move || {
        println!("Hallo, {}!", name); 
    });

    handle.join().unwrap();
    // ❌ name ist hier nicht mehr gültig, da der Thread den Besitz übernommen hat!
}
```

---

### 2. Geteilter veränderlicher Zustand: `Arc<Mutex<T>>`
Was ist, wenn mehrere Threads auf dieselbe Variable zugreifen und diese verändern müssen (z. B. einen gemeinsamen Zähler hochzählen)?

*   `Rc<T>` und `RefCell<T>` sind **nicht thread-sicher** (sie implementieren die Traits `Send` und `Sync` nicht). Der Compiler bricht sofort ab.
*   Die Lösung für Threads lautet: **`Arc<Mutex<T>>`**.
    *   **`Arc<T>`** (Atomic Reference Counted) sorgt dafür, dass mehrere Threads einen Zeiger auf dieselben Daten auf dem Heap besitzen können.
    *   **`Mutex<T>`** (Mutual Exclusion / gegenseitiger Ausschluss) sperrt die Daten im Inneren ab, sodass immer nur *ein einziger* Thread Zugriff erhält.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // 1. Wir packen den Zähler in einen Mutex und diesen in einen Arc
    let zaehler = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        // Zähler-Zeiger für den Thread klonen
        let zaehler_klon = Arc::clone(&zaehler);
        
        let handle = thread::spawn(move || {
            // 2. Sperre anfordern. Wenn ein anderer Thread den Zähler hat, 
            // wartet dieser Thread, bis er an der Reihe ist (Blockieren).
            let mut daten = zaehler_klon.lock().unwrap();
            
            // 3. Wert modifizieren
            *daten += 1;
            
        }); // 4. Am Scope-Ende wird 'daten' (der Lock Guard) gelöscht. 
            // Der Mutex wird automatisch wieder entsperrt!
            
        handles.push(handle);
    }

    // Auf alle Threads warten
    for handle in handles {
        handle.join().unwrap();
    }

    // Endergebnis ausgeben
    println!("Ergebnis: {}", *zaehler.lock().unwrap()); // Ausgabe: 10
}
```

---

### 3. Alternative für viele Leser: `RwLock<T>`
Ein `Mutex` ist extrem sicher, bremst das Programm aber aus, wenn viele Threads Daten *nur lesen* wollen, da immer nur ein Thread Zugriff hat.

Hierfür gibt es das **`RwLock<T>`** (Read-Write Lock):
*   Es erlaubt **beliebig viele zeitgleiche Leser** (`.read()`).
*   Es gewährt **exklusiven Zugriff für genau einen Schreiber** (`.write()`), sobald keine Leser mehr aktiv sind.

**Faustregel:**
*   Nutze `Mutex<T>`, wenn Daten regelmäßig geschrieben werden.
*   Nutze `RwLock<T>`, wenn Daten sehr oft gelesen, aber nur selten verändert werden (z. B. Konfigurationen).

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Konzepte und Abläufe im Detail planst.

### Aufgabe 1: Das Kochstudio-Experiment 🍳
5 Köche (Threads) arbeiten parallel an einer Suppe (`Vec<String>`). Jeder Koch wirft eine Zutat in den Topf.
*   *Aufgabe:* Plane das Speicherlayout. Welche Typen benötigst du, um den Suppentopf sicher zwischen den Köchen aufzuteilen und zu modifizieren? Skizziere das Struct `Topf` und erkläre, wo `Arc` und wo `Mutex` zum Einsatz kommen.

### Aufgabe 2: Das Vergessene Join ⏳
Betrachte folgendes Szenario: Ein Programm startet 10 Threads, die jeweils eine Sekunde lang komplexe Berechnungen durchführen und das Ergebnis via `println!` ausgeben. In der `main`-Funktion vergisst der Entwickler jedoch, die Methode `join()` auf den Handles aufzureifen.
*   *Aufgabe:* Was passiert, wenn das Programm ausgeführt wird? Siehst du die Konsolenausgaben der Threads? Erkläre den Grund.

### Aufgabe 3: Der Deadlock-Detektiv (Das Essens-Dilemma) 🕵️
Ein Deadlock (eine Verklemmung) passiert, wenn sich Threads gegenseitig blockieren.
*   Stell dir vor: Es gibt zwei Mutexe: `Löffel` und `Teller`.
*   Thread 1 sperrt zuerst den `Löffel` und will danach den `Teller` sperren.
*   Thread 2 sperrt zeitgleich zuerst den `Teller` und will danach den `Löffel` sperren.
*   *Aufgabe:* Erkläre bildhaft, warum das Programm unendlich lang einfriert (Deadlock). Wie lässt sich dieses Problem durch eine feste Reihenfolge der Sperren lösen?

### Aufgabe 4: Mutex vs. RwLock ⚖️
Ein Webserver speichert eine globale Blacklist von IP-Adressen. Tausende Benutzeranfragen pro Sekunde lesen diese Liste, um zu prüfen, ob sie zugreifen dürfen. Nur einmal am Tag wird die Liste durch einen Administrator aktualisiert.
*   *Aufgabe:* Welches Synchronisations-Primitiv (`Mutex` oder `RwLock`) wählst du für diese Blacklist und warum? Argumentiere im Hinblick auf Systemleistung (Durchsatz) und Parallelität.

---

## 💡 Zusammenfassung

*   **`std::thread::spawn`** startet einen neuen Thread parallel zum Hauptthread.
*   Mit **`move`** übergeben wir Variablen per Ownership an den Thread, da der Thread länger leben könnte als der aktuelle Scope.
*   Mit **`join()`** warten wir, bis ein Thread seine Arbeit beendet hat, bevor das Hauptprogramm fortfährt.
*   **`Arc<T>`** ist die atomare, threadsichere Variante von `Rc` und ermöglicht geteilten Besitz an Heap-Daten zwischen Threads.
*   **`Mutex<T>`** sichert veränderbare Daten durch Sperren (`.lock()`) ab. Nur ein Thread darf zeitgleich schreiben/lesen.
*   **`RwLock<T>`** optimiert den Zugriff für Szenarien mit vielen Lesern und wenigen Schreibern.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Nebenläufigkeit mit Threads (Englisch)](https://doc.rust-lang.org/book/ch16-01-threads.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Threads (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch16-01-threads.html)
*   [Rust by Example: Threads (Englisch)](https://doc.rust-lang.org/rust-by-example/std/thread.html)
*   [Konzept: Rc & Arc (Grundlage für geteilten Besitz)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-rc-arc.md)
