# 📦 Mitmach-Workshop: Nebenläufigkeit im Café

In diesem Workshop werden wir uns die Konzepte der Nebenläufigkeit (Concurrency) und Threads in Rust anhand einer alltagsnahen Analogie erarbeiten. 

Stell dir vor, wir eröffnen ein gemütliches Café namens **"Rustico"**. Anhand der Abläufe in diesem Café lässt sich die oft abstrakte Welt der Threads, Mutexes, Channels und des asynchronen Programmierens wunderbar bildhaft verstehen.

---

## 1. Die Analogie: Das Café "Rustico"

Um zu verstehen, warum wir diese Konzepte in der Softwareentwicklung brauchen, schauen wir uns das Team im Café an:

```mermaid
graph TD
    subgraph Kueche [Die Küche (Threads)]
        K1[Koch 1]
        K2[Koch 2]
    end
    subgraph Ressourcen [Geteilte Werkzeuge (Mutex)]
        N[Nudelholz in verschlossener Kiste]
    end
    subgraph Service [Service & Kasse (Channels)]
        W1[Kellner 1]
        W2[Kellner 2]
        RP[Rohrpost zur Küche]
    end
    subgraph Tresen [Kaffeetheke (Async)]
        B[Barista]
        KM[Kaffeemaschine]
    end

    W1 -->|Bestellung einwerfen| RP
    W2 -->|Bestellung einwerfen| RP
    RP -->|Bestellung lesen| K1
    K1 -->|Nutzt| N
    K2 -->|Wartet auf| N
```

### 🧵 Threads: Das Küchenteam
Wenn nur eine einzige Person im Café arbeitet, müsste sie Bestellungen aufnehmen, Kuchen backen, Kaffee kochen und abwaschen. Das wäre extrem langsam. 
Defür stellen wir ein **Küchenteam** ein. Jeder Koch ist ein eigener **Thread**. Sie arbeiten unabhängig und gleichzeitig (parallel) an verschiedenen Aufgaben.

### 🔒 Mutex: Die Kiste für das Nudelholz
Es gibt in der Küche nur ein einziges, sehr teures Nudelholz (die *geteilte Ressource*). Wenn zwei Köche gleichzeitig versuchen, das Nudelholz zu greifen und damit zu arbeiten, gibt es Chaos.
Deshalb legen wir das Nudelholz in eine **verschlossene Kiste (Mutex)**. 
* Möchte Koch 1 das Nudelholz benutzen, schließt er die Kiste auf (`.lock()`), nimmt es heraus und arbeitet damit.
* Koch 2 möchte nun auch teigrollen. Er sieht, dass die Kiste leer und verschlossen ist. Er muss warten (er blockiert), bis Koch 1 fertig ist, das Nudelholz zurücklegt und die Kiste wieder abschließt. 
* In Rust sorgt das Ownership-System dafür, dass die Kiste automatisch wieder verschlossen wird, sobald der Koch seine Arbeit beendet hat (RAII-Prinzip).

### 📮 Channels: Die Rohrpost zur Kasse
Die Kellner laufen im Gastraum herum und nehmen Bestellungen auf. Sie müssen diese schnell in die Küche schicken, wollen aber nicht jedes Mal selbst dorthin laufen.
Dafür nutzen sie eine **Rohrpost (Channel)**:
* Die Kellner sind die **Sender** (`Sender`). Sie stecken den Bestellzettel in die Kapsel und schicken ihn ab.
* In der Küche kommt die Kapsel bei der Rohrpost-Station an. Der Koch dort ist der **Empfänger** (`Receiver`). Er nimmt die Bestellungen nacheinander entgegen und bereitet sie zu.
* In Rust sprechen wir von einem `mpsc`-Channel: *Multiple Producer, Single Consumer* (Mehrere Sender, ein Empfänger). Mehrere Kellner können Bestellungen senden, aber ein Küchen-Thread liest sie aus.

### ⏳ Async & Tokio: Der multitaskingfähige Barista
An der Kaffeetheke steht der Barista. Er bereitet einen Espresso zu. Die Espressomaschine braucht 30 Sekunden, um den Kaffee aufzubrühen. 
Ein "synchroner" Barista würde diese 30 Sekunden lang starr vor der Maschine stehen und auf den Tropfen warten. In dieser Zeit könnte er nichts anderes tun.
Unser **asynchroner Barista** (unterstützt von der Runtime **Tokio**) macht es schlauer:
1. Er startet die Kaffeemaschine (startet einen asynchronen Task).
2. Während das Wasser durchläuft (`.await`), dreht er sich um und schmiert ein Brötchen für einen anderen Gast.
3. Sobald die Kaffeemaschine piept (die Zukunft/das `Future` ist bereit), stellt er die Tasse fertig.
Er blockiert sich nicht selbst, sondern nutzt Wartezeiten sinnvoll aus!

---

## 2. Spickzettel (Micro-Learnings)

Hier sind die wichtigsten Werkzeuge für deine Hosentasche.

### Spickzettel 1: Threads
* **Erstellen**: `std::thread::spawn(move || { ... })` startet einen neuen Thread. Das `move`-Keyword sorgt dafür, dass Variablen in den Thread hineinbewegt (übertragen) werden.
* **Warten**: `.join()` blockiert den aktuellen Thread so lange, bis der gestartete Thread seine Arbeit beendet hat.
```rust
use std::thread;

let handle = thread::spawn(|| {
    // Arbeit im Hintergrund
    "Kuchen fertig!"
});
let ergebnis = handle.join().unwrap();
```

### Spickzettel 2: Mutex & Arc
* **Mutex**: `std::sync::Mutex` schützt Daten vor gleichzeitigem Zugriff. `.lock().unwrap()` gibt dir sicheren Zugriff auf die inneren Daten.
* **Arc**: `std::sync::Arc` (*Atomic Reference Counted*) erlaubt es uns, denselben Mutex an mehrere Threads sicher auszuleihen.
```rust
use std::sync::{Arc, Mutex};
use std::thread;

let kasse = Arc::new(Mutex::new(0));
let kasse_klon = Arc::clone(&kasse);

thread::spawn(move || {
    let mut daten = kasse_klon.lock().unwrap();
    *daten += 10; // Kasse erhöht
});
```

### Spickzettel 3: Channels
* **Erstellen**: `std::sync::mpsc::channel()` liefert ein Tupel aus `(Sender, Receiver)`.
* **Senden & Empfangen**: `tx.send(daten)` schickt Daten los. `rx.recv()` wartet blockierend, bis Daten ankommen.
```rust
use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();
thread::spawn(move || {
    tx.send("Kaffee bestellt").unwrap();
});
let bestellung = rx.recv().unwrap();
```

### Spickzettel 4: Async/Await
* **async fn**: Deklariert eine Funktion, die nicht sofort ausgeführt wird, sondern ein `Future` zurückgibt.
* **.await**: Pausiert die aktuelle Funktion asynchron und gibt die Kontrolle an den Executor (z. B. Tokio) zurück, bis das Ergebnis bereit ist.
```rust
// Benötigt die 'tokio' Library in Cargo.toml
async fn koche_wasser() {
    tokio::time::sleep(std::time::Duration::from_secs(2)).await;
}
```

---

## 3. Programmier-Workshop: Das Bestellsystem

Nun bist du an der Reihe! Wir bauen das Bestellsystem für unser Café "Rustico". 
Zwei Kellner (zwei Threads) nehmen Bestellungen auf und schicken sie über eine Rohrpost (Channel) in die Küche (Hauptthread).

Erstelle ein neues Rust-Projekt oder öffne deine Übungsdatei und versuche, das folgende Skelett an den Stellen mit `todo!()` auszufüllen:

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

// Eine Bestellung in unserem Café
#[derive(Debug)]
struct Bestellung {
    tisch: u32,
    gericht: String,
}

fn main() {
    // 1. TODO: Erstelle einen Channel für 'Bestellung'
    // Tipp: Nutze mpsc::channel()
    let (tx, rx) = todo!("Erstelle den Channel");

    // 2. Kellner 1 (Thread 1) nimmt Bestellungen auf
    // Wir klonen den Sender, damit Kellner 1 und Kellner 2 jeweils einen eigenen Sender haben.
    let tx1 = tx.clone();
    let kellner1 = thread::spawn(move || {
        let bestellungen = vec![
            Bestellung { tisch: 1, gericht: "Kaffee".to_string() },
            Bestellung { tisch: 2, gericht: "Croissant".to_string() },
        ];
        for b in bestellungen {
            println!("Kellner 1: Nehme Bestellung für Tisch {} auf: {}", b.tisch, b.gericht);
            
            // TODO: Sende die Bestellung über den Channel 'tx1'
            todo!("Sende die Bestellung");

            thread::sleep(Duration::from_millis(100));
        }
    });

    // 3. Kellner 2 (Thread 2) nimmt Bestellungen auf
    let kellner2 = thread::spawn(move || {
        let bestellungen = vec![
            Bestellung { tisch: 3, gericht: "Käsekuchen".to_string() },
            Bestellung { tisch: 4, gericht: "Tee".to_string() },
        ];
        for b in bestellungen {
            println!("Kellner 2: Nehme Bestellung für Tisch {} auf: {}", b.tisch, b.gericht);
            
            // TODO: Sende die Bestellung über den Channel 'tx'
            todo!("Sende die Bestellung");

            thread::sleep(Duration::from_millis(150));
        }
    });

    // WICHTIG: Wir müssen den ursprünglichen Sender 'tx' in der main-Funktion schließen (droppen).
    // Wenn wir das nicht tun, wartet der Empfänger ewig, weil er glaubt, es könnten noch
    // neue Bestellungen über dieses 'tx' kommen.
    drop(tx);

    // 4. Küche empfängt die Bestellungen
    println!("Küche: Bereit für Bestellungen...");
    
    // TODO: Empfange alle Bestellungen im Loop, bis der Channel geschlossen ist.
    // Tipp: Du kannst den Receiver 'rx' direkt in einer 'for'-Schleife nutzen:
    // "for bestellung in rx { ... }"
    todo!("Lese alle Bestellungen aus dem Channel und gib sie mit println! aus");

    // 5. TODO: Warte darauf, dass beide Kellner-Threads ihre Arbeit beendet haben.
    // Tipp: Verwende .join() auf den Handles 'kellner1' und 'kellner2'.
    todo!("Warte auf Kellner 1 und Kellner 2");

    println!("Feierabend! Alle Bestellungen wurden erfolgreich zubereitet.");
}
```

---

## 4. Praxisnahe Übungen zum Vertiefen

Löse die folgenden Aufgaben, um dein Wissen zu festigen. Die Codelösungen musst du selbst implementieren, aber du kannst dich an den vorgegebenen Testfällen und Assertions orientieren.

### Übung 1 (Leicht): Der fleißige Bäcker 🥖
Schreibe eine Funktion, die einen neuen Thread startet. Dieser Thread soll die Backzeit eines Brotes (eine übergebene Zahl) verdoppeln und das Ergebnis zurückgeben.

```rust
use std::thread;

fn verdopple_backzeit(zeit: u32) -> u32 {
    let handle = thread::spawn(move || {
        // TODO: Berechne das Doppelte der Zeit und gib es zurück
        todo!("Berechne das Doppelte")
    });

    // TODO: Warte auf das Ergebnis des Threads und gib es zurück
    todo!("Warte auf das Ergebnis")
}

#[test]
fn test_verdopple_backzeit() {
    assert_eq!(verdopple_backzeit(5), 10);
    assert_eq!(verdopple_backzeit(12), 24);
}
```

### Übung 2 (Mittel): Die Rohrpost-Bestellungen ✉️
Mehrere Bestellungen sollen in einem Thread generiert und über einen Channel gesendet werden. Der Hauptthread empfängt diese und sammelt sie in einem Vektor.

```rust
use std::sync::mpsc;
use std::thread;

fn sammle_bestellungen() -> Vec<String> {
    let (tx, rx) = mpsc::channel();

    // Ein Thread, der drei Getränke sendet
    thread::spawn(move || {
        let getraenke = vec![
            "Espresso".to_string(), 
            "Cappuccino".to_string(), 
            "Latte Macchiato".to_string()
        ];
        for g in getraenke {
            // TODO: Sende das Getränk über den Channel
            todo!("Sende das Getränk");
        }
    });

    let mut erhaltene_bestellungen = Vec::new();
    
    // TODO: Empfange alle 3 Getränke aus dem Channel und speichere sie in 'erhaltene_bestellungen'
    todo!("Empfange die Getränke und speichere sie");

    erhaltene_bestellungen
}

#[test]
fn test_sammle_bestellungen() {
    let bestellungen = sammle_bestellungen();
    assert_eq!(bestellungen.len(), 3);
    assert_eq!(bestellungen[0], "Espresso");
    assert_eq!(bestellungen[1], "Cappuccino");
    assert_eq!(bestellungen[2], "Latte Macchiato");
}
```

### Übung 3 (Mittel): Die Kaffeekasse 💰
Fünf Kellner gleichzeitig buchen Trinkgelder in eine gemeinsame Kasse. Da alle auf dieselbe Variable schreiben, müssen wir den Zugriff mit `Mutex` und `Arc` absichern.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn trinkgeld_buchen() -> u32 {
    let kasse = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    // 5 Kellner buchen jeweils 10 Euro
    for _ in 0..5 {
        let kasse_klon = Arc::clone(&kasse);
        let handle = thread::spawn(move || {
            // TODO: Sichere den Zugriff auf die Kasse (lock) und erhöhe den Wert um 10
            todo!("Erhöhe das Guthaben in der Kasse");
        });
        handles.push(handle);
    }

    // Auf alle Threads warten
    for handle in handles {
        handle.join().unwrap();
    }

    // TODO: Entpacke den Mutex und gib den Endbetrag zurück
    todo!("Gib das Kassen-Ergebnis zurück")
}

#[test]
fn test_trinkgeld_buchen() {
    assert_eq!(trinkgeld_buchen(), 50);
}
```

### Übung 4 (Schwer): Der asynchrone Ofen ⏰
Zwei Backöfen sollen asynchron vorgeheizt werden. Ofen A benötigt 10ms, Ofen B benötigt 20ms. Nutze die asynchrone Runtime von Tokio, um das Aufheizen parallel zu starten und die Ergebnisse zu sammeln.

```rust
// HINWEIS: Verwende für diese Übung die Tokio Runtime.
// Stelle sicher, dass in deiner Cargo.toml der Eintrag 'tokio = { version = "1", features = ["full"] }' existiert.

async fn heize_ofen_auf(ofen_name: &str, dauer_ms: u64) -> String {
    // TODO: Warte asynchron für 'dauer_ms' Millisekunden.
    // Tipp: Nutze 'tokio::time::sleep' anstelle von 'std::thread::sleep'.
    todo!("Asynchrones Warten");
    
    format!("Ofen {} ist heiß!", ofen_name)
}

async fn backe_kuchen() -> (String, String) {
    // TODO: Starte das Aufheizen von Ofen A (10ms) und Ofen B (20ms) asynchron
    // und warte, bis beide fertig sind.
    // Tipp: Nutze 'tokio::join!' um beide Futures gleichzeitig auszuführen.
    todo!("Führe beide Ofen-Heizprozesse aus und gib ihre Ergebnisse als Tupel zurück")
}

// Zum lokalen Testen kannst du diesen Test verwenden:
// #[tokio::test]
// async fn test_backe_kuchen() {
//     let (ofen_a, ofen_b) = backe_kuchen().await;
//     assert_eq!(ofen_a, "Ofen A ist heiß!");
//     assert_eq!(ofen_b, "Ofen B ist heiß!");
// }
```

---

## 5. Das Café-Quiz

Teste dein Wissen! (Die Antworten findest du im Kopf – oder durch Ausprobieren!).

### Frage 1: Warum reicht ein einfacher `Rc` nicht aus, um einen Mutex zwischen Threads zu teilen?
* A) Weil `Rc` zu viel Speicher verbraucht.
* B) Weil `Rc` nicht thread-sicher ist (es implementiert nicht die Traits `Send` und `Sync`). Wir müssen das atomare `Arc` nutzen.
* C) Weil `Rc` nur für Strings funktioniert.

### Frage 2: Was passiert, wenn wir vergessen, den Mutex-Lock freizugeben?
* A) Rust gibt einen Compilerfehler aus.
* B) Es entsteht ein Deadlock: Andere Threads, die auf das Schloss warten, blockieren sich für immer.
* C) Der Wert wird automatisch auf 0 zurückgesetzt.

### Frage 3: Was bedeutet `mpsc` in `std::sync::mpsc`?
* A) Multi-Threaded Parallel Safe Channel
* B) Multiple Producer, Single Consumer (Mehrere Sender, ein Empfänger)
* C) Maximum Power Speed Connection

### Frage 4: Wann blockiert `.await` den aktuellen Betriebssystem-Thread?
* A) Immer, wenn wir auf ein Future warten.
* B) Nie! Es pausiert nur die aktuelle asynchrone Funktion, während der Thread andere Aufgaben (Tasks) weiterverarbeitet.
* C) Nur, wenn wir keinen Mutex verwenden.
