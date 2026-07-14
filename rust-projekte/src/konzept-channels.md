# 📡 Channels & Nachrichtenaustausch – Das Rohrpost-Prinzip

Im vorherigen Kapitel haben wir gelernt, wie wir Speicher teilen und mit einem Schloss (Mutex) absichern. Das funktioniert gut, kann aber kompliziert werden: Bäcker müssen anstehen, warten und sich absprechen.

In der modernen Softwareentwicklung gibt es deshalb ein anderes, sehr mächtiges Paradigma: **Nachrichtenaustausch (Message Passing)**. 

Ein bekanntes Zitat aus der Programmiersprache Go beschreibt das perfekt:
> *"Kommuniziere nicht, indem du Speicher teilst; teile stattdessen Speicher, indem du kommunizierst."*

Stell dir vor, du baust in deiner Bäckerei ein **Rohrpost-System** (einen **Channel**) ein:
*   Der Bäcker in der Backstube (ein Thread / **Sender**) knetet ein Brötchen, legt es in eine Rohrpost-Kapsel und schießt diese durch das Rohr (`send`). Sobald die Kapsel im Rohr ist, hat der Bäcker das Brötchen abgegeben (**Ownership übertragen**). Er kann es nicht mehr anfassen.
*   Am anderen Ende des Rohrs, vorne an der Theke, steht der Verkäufer (der Haupt-Thread / **Empfänger**). Er wartet an der Ausgabe, bis eine Kapsel herausfällt (`recv`). Er nimmt sie entgegen und verkauft das Brötchen.

Das Geniale an diesem System in Rust: Es ist ein **`mpsc`**-Kanal. Das steht für **Multiple Producer, Single Consumer** (Mehrere Sender, ein Empfänger). Das bedeutet: Es können **mehrere Bäcker** gleichzeitig ihre Kapseln in das Rohrpost-Netzwerk einspeisen (jeder hat einen eigenen geklonten Sender), aber am Ende steht **genau ein Verkäufer**, bei dem alle Kapseln ankommen.

---

## 🧠 Theorie

### 1. Einen Kanal erstellen
In Rust nutzen wir das Modul `std::sync::mpsc`. Die Funktion `channel()` liefert uns ein Tupel zurück: den Sender (`tx` für Transmitter) und den Empfänger (`rx` für Receiver).

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    // 1. Kanal erstellen
    // tx = Transmitter (Sender), rx = Receiver (Empfänger)
    let (tx, rx) = mpsc::channel();

    // 2. Einen Thread starten und den Sender 'tx' per move übergeben
    thread::spawn(move || {
        let nachricht = String::from("Brötchen fertig!");
        
        // Nachricht senden (send() gibt das Ownership der Nachricht ab!)
        tx.send(nachricht).unwrap();
    });

    // 3. Im Haupt-Thread auf die Nachricht warten (blockierend!)
    let empfangen = rx.recv().unwrap();
    println!("Erhalten: {}", empfangen); // Ausgabe: Erhalten: Brötchen fertig!
}
```

---

### 2. Blockierendes vs. Nicht-blockierendes Empfangen
Es gibt zwei Möglichkeiten, wie der Empfänger (`rx`) nach neuen Nachrichten schauen kann:

1.  **`rx.recv() -> Result<T, RecvError>` (Blockierend):**
    Der aufrufende Thread legt sich schlafen, bis eine Nachricht im Kanal ankommt. Das ist extrem CPU-schonend, hält den Thread aber so lange an.
2.  **`rx.try_recv() -> Result<T, TryRecvError>` (Nicht-blockierend):**
    Die Methode schaut sofort nach, ob eine Nachricht bereitliegt. 
    *   Ist eine da, gibt sie `Ok(wert)` zurück.
    *   Ist keine da, gibt sie sofort `Err(TryRecvError::Empty)` zurück, ohne zu warten. 
    *   Ideal für Benutzeroberflächen (GUIs) oder Spiele-Loops, die nicht einfrieren dürfen, nur weil gerade keine Daten eintreffen.

---

### 3. Mehrere Sender (Multiple Producer)
Da es sich um einen `mpsc`-Kanal handelt, dürfen wir beliebig viele Sender besitzen. Wir müssen den Sender dafür einfach mit `.clone()` vervielfältigen:

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    // Einen zweiten Sender durch Klonen erstellen
    let tx_brot = tx.clone();
    let tx_kuchen = tx; // Den originalen Sender können wir auch normal nutzen

    // Thread A schickt Brot
    thread::spawn(move || {
        tx_brot.send(String::from("Brot")).unwrap();
    });

    // Thread B schickt Kuchen
    thread::spawn(move || {
        tx_kuchen.send(String::from("Kuchen")).unwrap();
    });

    // Alle Nachrichten empfangen
    for _ in 0..2 {
        println!("Verkauft: {}", rx.recv().unwrap());
    }
}
```

---

### 4. Wann schließt sich ein Kanal?
Ein Empfänger weiß automatisch, wann keine Nachrichten mehr kommen können: **Sobald alle Sender (`tx`) zerstört wurden** (den Scope verlassen haben / dropped).

Wenn alle Sender weg sind, liefert `rx.recv()` ein `Err` zurück. Das können wir nutzen, um Nachrichten elegant mit einer `for`-Schleife zu empfangen. Die Schleife läuft so lange, wie der Kanal offen ist und Nachrichten fließen, und beendet sich danach automatisch:

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let zutaten = vec!["Mehl", "Wasser", "Hefe"];
        for zutat in zutaten {
            tx.send(zutat).unwrap();
        }
        // Am Ende dieses Threads wird 'tx' gelöscht (dropped).
        // Da es der einzige Sender war, schließt sich der Kanal.
    });

    // Die for-Schleife liest den Empfänger aus, bis der Kanal schließt!
    for nachricht in rx {
        println!("Zutat geliefert: {}", nachricht);
    }
    println!("Alle Zutaten da, Kanal geschlossen!");
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Logik und die Datenflüsse planst.

### Aufgabe 1: Die Paketstation (Mehrere Sender) 📦
Ein Paketshop (der Haupt-Thread) wartet auf Lieferungen.
*   Zwei Boten (Thread A: "DHL", Thread B: "UPS") liefern unabhängig voneinander Pakete (Strings) an den Shop.
*   *Aufgabe:* Plane das Programm. Wie musst du die Kanäle erstellen und übergeben, damit beide Threads an denselben Paketshop-Empfänger senden können? Wie stellt der Paketshop fest, wann beide Boten Feierabend gemacht haben?

### Aufgabe 2: Die Endlos-Warteschleife (Der hängende Empfänger) 🛑
Stell dir vor, du erstellst einen Kanal, startest einen Thread, übergibst ihm den Sender, rufst im Haupt-Thread `rx.recv()` auf – aber der gestartete Thread sendet niemals eine Nachricht und läuft stattdessen in einer Endlosschleife fest.
*   *Aufgabe:* Was passiert mit deinem Haupt-Thread? Wie verhält sich das Programm und wie nennt man diesen Zustand?

### Aufgabe 3: Der Game-Loop und die Messdaten 🎮
Du programmierst ein Spiel, das flüssig mit 60 Bildern pro Sekunde (FPS) laufen soll. Im Hintergrund lädt ein Thread kontinuierlich neue Leveldaten über das Netzwerk herunter und schickt sie über einen Kanal an das Hauptprogramm.
*   *Aufgabe:* Erkläre, warum die Nutzung von `rx.recv()` im Render-Loop des Spiels eine schlechte Idee ist. Welche Methode musst du stattdessen verwenden und wie verarbeitest du eintreffende Daten, ohne dass das Spiel ruckelt?

### Aufgabe 4: Das Ownership-Dilemma 🧩
Ein Thread erstellt ein großes Daten-Objekt: `let brief = Brief { inhalt: String::from("Geheim") };`. Er sendet dieses Objekt via `tx.send(brief)` an den Empfänger. Direkt in der nächsten Zeile des Threads versucht der Entwickler, auf `brief.inhalt` zuzugreifen.
*   *Aufgabe:* Warum wird der Rust-Compiler diesen Zugriff verbieten? Welches Sicherheitsrisiko wird dadurch verhindert?

---

## 💡 Zusammenfassung

*   **Message Passing** (Nachrichtenaustausch) entkoppelt Threads, indem sie Daten senden, statt sie direkt im Speicher zu teilen.
*   **`mpsc::channel()`** erzeugt ein Paar aus einem Sender (`Transmitter`) und einem Empfänger (`Receiver`).
*   **`mpsc`** bedeutet: Es darf **mehrere Sender** (durch Klonen mit `tx.clone()`), aber immer nur **einen Empfänger** geben.
*   **`send()`** übergibt das Ownership am gesendeten Wert an den Empfänger.
*   **`recv()`** blockiert den Thread, bis eine Nachricht kommt. **`try_recv()`** prüft sofort und blockiert nicht.
*   Wenn alle Sender den Scope verlassen, schließt sich der Kanal automatisch. Der Empfänger kann dann über eine `for`-Schleife sauber beendet werden.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Nachrichtenaustausch zwischen Threads (Englisch)](https://doc.rust-lang.org/book/ch16-02-message-passing.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Nachrichtenaustausch (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch16-02-message-passing.html)
*   [Rust by Example: Channels (Englisch)](https://doc.rust-lang.org/rust-by-example/std/mpsc.html)
*   [Konzept: Threads & Shared State (Die Alternative zum Nachrichtenaustausch)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-threads.md)
