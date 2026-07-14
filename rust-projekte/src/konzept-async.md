# ⚡ Async/Await & Tokio-Grundlagen – Das Barista-Prinzip

Stell dir vor, du gehst in ein Café und bestellst einen frisch gebrühten Espresso und ein belegtes Brötchen. 

*   **Synchrones Blockieren (Normale Threads):**
    Der Barista nimmt deine Bestellung auf. Er startet die Kaffeemaschine. Während das heiße Wasser durch das Kaffeemehl läuft (ca. 30 Sekunden), steht der Barista regungslos vor der Maschine und starrt sie an. Er tut absolut nichts anderes. Erst als der Kaffee fertig ist, dreht er sich um und belegt dein Brötchen. 
    Wenn das Café 10 Kunden gleichzeitig bedienen will, benötigt es 10 Baristas, die die meiste Zeit blockiert vor ihren Maschinen stehen. Das verbraucht viel Personal, Geld und Platz (in der Informatik: **Betriebssystem-Ressourcen, Stack-Speicher und CPU-Zeit**).

*   **Asynchrone Programmierung (Async/Await):**
    Du hast nur **einen einzigen Barista** (einen Thread). Er drückt den Startknopf an der Kaffeemaschine (er startet eine asynchrone I/O-Operation). Während der Kaffee brüht, wartet er nicht untätig! Er nutzt die Wartezeit, dreht sich sofort um und belegt das Brötchen. Als die Maschine fertig piept, nimmt er den Kaffee und serviert beides. 
    Ein einziger Barista kann so Dutzende Bestellungen gleichzeitig bearbeiten, indem er Wartezeiten intelligent überbrückt.

Genau das ist asynchrones Rust! Anstatt für jede blockierende Aufgabe (wie das Warten auf eine Webseite, eine Datenbank oder eine Datei) einen teuren Betriebssystem-Thread schlafen zu legen, nutzen wir extrem leichtgewichtige **Tasks**, die kooperativ von einer Laufzeitumgebung (Runtime) verwaltet werden.

---

## 🧠 Theorie

### 1. Threads vs. Tasks (Warum asynchron?)
*   **Betriebssystem-Threads (OS Threads):**
    Jeder Thread benötigt einen eigenen Speicherbereich (oft 2 Megabyte Stack-Speicher) und das Umschalten zwischen Threads (Context Switch) kostet die CPU wertvolle Rechenzeit. Wenn du 10.000 parallele Verbindungen hast, bricht der Server unter der Last der Threads zusammen.
*   **Asynchrone Tasks:**
    Tasks verbrauchen fast keinen Speicher (nur wenige Byte). Tausende asynchrone Tasks können problemlos auf einem einzigen echten OS-Thread ausgeführt werden. 

---

### 2. Futures: Die "faulen" Versprechen in Rust
Wenn du in Rust eine Funktion als `async fn` deklarierst, gibt sie beim Aufruf nicht direkt das Ergebnis zurück, sondern ein **`Future`** (ein Objekt, das das Trait `Future` implementiert). 

Ein Future ist wie ein Abholschein im Café: Es ist das Versprechen, dass du das Ergebnis später erhältst. 

> [!IMPORTANT]
> **Futures in Rust sind "lazy" (faul)!**
> Ein Future tut absolut nichts, solange man es nicht explizit anstößt. Wenn du eine `async fn` aufrufst, wird die Funktion noch nicht ausgeführt – sie wird erst gestartet, wenn du darauf wartest!

Um ein Future auszuführen und sein Ergebnis zu erhalten, nutzen wir das Schlüsselwort **`.await`**:

```rust
// Eine asynchrone Funktion
async fn kaffee_bruehen() -> String {
    // Simuliert eine Wartezeit (I/O)
    // ...
    String::from("Espresso")
}

async fn bestellung_bearbeiten() {
    // Aufruf startet das Future noch nicht! Es erzeugt nur den "Abholschein".
    let kaffee_future = kaffee_bruehen(); 

    // Erst .await führt die Funktion aus und wartet auf das Ergebnis!
    let kaffee = kaffee_future.await; 
    println!("Serviere: {}", kaffee);
}
```

---

### 3. Die asynchrone Laufzeitumgebung (Runtime): Tokio
Rusts Standardbibliothek enthält **keine** Laufzeitumgebung, um Futures auszuführen. Rust liefert nur die Syntax (`async`/`await`). Wir müssen daher ein externes Crate einbinden. Der Industriestandard für performante Anwendungen in Rust ist **`tokio`**.

Um ein asynchrones Programm zu starten, nutzen wir das Makro `#[tokio::main]` über der `main`-Funktion:

```rust
// Cargo.toml benötigt: tokio = { version = "1", features = ["full"] }

#[tokio::main] // Initialisiert die Tokio-Runtime im Hintergrund
async fn main() {
    println!("Start der asynchronen Anwendung");
    
    // Wir können asynchrone Funktionen aufrufen
    let ergebnis = lade_daten_aus_netzwerk().await;
    
    println!("Daten: {}", ergebnis);
}

async fn lade_daten_aus_netzwerk() -> String {
    // tokio::time::sleep blockiert nicht den Thread, 
    // sondern gibt die CPU frei für andere Tasks!
    tokio::time::sleep(std::time::Duration::from_secs(2)).await;
    String::from("HTML-Inhalt")
}
```

---

### 4. Parallele Tasks starten: `tokio::spawn`
Ähnlich wie `std::thread::spawn` für Threads, können wir mit `tokio::spawn` asynchrone Tasks starten. Diese Tasks laufen konkurrierend auf der Runtime und werden automatisch auf die verfügbaren CPU-Kerne verteilt.

```rust
#[tokio::main]
async fn main() {
    // Startet einen neuen asynchronen Task im Hintergrund
    let task_handle = tokio::spawn(async {
        tokio::time::sleep(std::time::Duration::from_millis(500)).await;
        "Task beendet"
    });

    println!("Hauptprogramm läuft weiter...");

    // Auf das Ergebnis des Tasks warten
    let ergebnis = task_handle.await.unwrap();
    println!("Ergebnis: {}", ergebnis);
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Funktionsweisen und Event-Abläufe planst.

### Aufgabe 1: Das Wasserkocher-Experiment 🫖
Du willst ein Frühstück zubereiten.
*   Das Wasser benötigt 3 Minuten zum Kochen (`async fn wasser_kochen`).
*   Das Brot benötigt 1 Minute im Toaster (`async fn brot_toasten`).
*   *Aufgabe:* Beschreibe den Ablauf. Wie musst du die Aufrufe strukturieren, damit Toasten und Wasserkochen **zeitgleich** ablaufen, anstatt nacheinander? Was passiert, wenn du direkt nach dem Aufruf von `wasser_kochen()` ein `.await` anhängst?

### Aufgabe 2: Der blockierte Barista (Das Blockierungs-Problem) 🛑
Stell dir vor, ein Barista (ein einzelner CPU-Thread in der Tokio-Runtime) fängt in einer `async fn` an, eine gigantische Primzahl zu berechnen, was die CPU für 10 Sekunden zu 100% auslastet. Oder er nutzt das synchrone `std::thread::sleep(Duration::from_secs(10))`.
*   *Aufgabe:* Erkläre, warum dies ein schwerer Fehler in der asynchronen Programmierung ist. Was passiert mit allen anderen asynchronen Tasks, die zur gleichen Zeit auf diesem Thread ausgeführt werden sollen?

### Aufgabe 3: Threads vs. Tasks (Entscheidungshilfe) ⚖️
Erstelle eine Tabelle, die aufzeigt, wann du echte Betriebssystem-Threads (`std::thread::spawn`) und wann du asynchrone Tasks (`tokio::spawn`) einsetzen solltest.
*   *Szenarien zum Einordnen:*
    1.  Ein Webserver, der 50.000 parallele Chat-Verbindungen hält.
    2.  Ein Videokonvertierungs-Tool, das alle CPU-Kerne voll auslasten muss, um ein MP4-Video zu rendern.
    3.  Ein Bildbearbeitungsprogramm, das einen Weichzeichner-Filter auf ein 100-Megapixel-Bild anwendet.
    4.  Ein Netzwerk-Crawler, der Webseiten im Hintergrund herunterlädt.

### Aufgabe 4: Das vergessene `.await` 🧩
Ein Anfänger schreibt folgenden Code:
```rust
async fn lade_nachricht() -> String {
    String::from("Hallo!")
}

fn main() {
    let text = lade_nachricht();
    // println!("{}", text); // Compiler-Fehler!
}
```
*   *Aufgabe:* Erkläre dem Anfänger präzise, welchen Typ die Variable `text` in diesem Moment hat und warum er die Nachricht nicht ausgeben kann. Wie muss er den Code korrigieren?

---

## 💡 Zusammenfassung

*   **Asynchrone Programmierung** ermöglicht es, I/O-Wartezeiten zu überbrücken, ohne Betriebssystem-Threads schlafen zu legen.
*   Eine **`async fn`** gibt ein **`Future`** (Abholschein) zurück.
*   Futures tun nichts, bis sie mit **`.await`** angestoßen werden (Lazy Evaluation).
*   Rust benötigt eine externe **Runtime** wie **`tokio`**, um asynchronen Code auszuführen.
*   Mit **`tokio::spawn`** können wir Hunderte oder Tausende von asynchronen Tasks konkurrierend starten.
*   **Wichtigste Regel:** Blockiere niemals einen asynchronen Thread mit langwierigen CPU-Berechnungen oder synchronem Sleep (`std::thread::sleep`). Nutze stattdessen asynchrone Alternativen wie `tokio::time::sleep`.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Asynchrones Programmieren (Englisch)](https://rust-lang.github.io/async-book/)
*   [Die offizielle Dokumentation von Tokio (Englisch)](https://tokio.rs/)
*   [Konzept: Channels (Nachrichten zwischen asynchronen Tasks senden)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-channels.md)
*   [Konzept: Threads & Shared State (Die synchrone Grundlage)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-threads.md)
