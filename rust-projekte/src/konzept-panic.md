# 💥 Unwiederherstellbare Fehler mit panic! – Wenn nichts mehr geht

Während du mit `Result` und `Option` lernst, wie du mit Fehlern umgehst, die im normalen Betrieb auftreten können (wie eine fehlende Datei oder eine ungültige Benutzereingabe), gibt es in der Programmierwelt auch Fehler, von denen sich dein Programm unmöglich erholen kann.

Stell dir vor, du bist in einem Flugzeug und das Triebwerk fällt aus. Dafür gibt es Notfallprotokolle (`Result`). Was aber, wenn plötzlich die physikalischen Gesetze der Schwerkraft aufhören zu wirken? Darauf kann sich kein Protokoll vorbereiten. Das Programm muss sofort und kontrolliert stoppen.

In Rust nennen wir diesen kontrollierten Notstopp eine **Panic** (Panik). Sie wird meist durch das Makro `panic!` ausgelöst.

---

## 🧠 Theorie: Wann nutzt man `panic!`?

Rust unterscheidet strikt zwischen zwei Arten von Fehlern:

1. **Wiederherstellbare Fehler (Recoverable Errors):**
   * **Typ:** `Result<T, E>`
   * **Beispiele:** Datei nicht gefunden, Netzwerk-Timeout, falsches Passwort.
   * **Ziel:** Den Fehler abfangen, dem Benutzer Bescheid geben und es eventuell erneut versuchen.
2. **Unwiederherstellbare Fehler (Unrecoverable Errors):**
   * **Typ:** `panic!`
   * **Beispiele:** Zugriff auf ein Element außerhalb der Grenzen eines Vektors (Out of Bounds), Division durch Null (bei Ganzzahlen), oder wenn eine absolut kritische Komponente (wie eine Konfigurationsdatei zum Programmstart) komplett fehlt.
   * **Ziel:** Das Programm sofort beenden, um Datenkorruption zu verhindern.

### Die Analogie: Die Notbremse im Zug
Wenn ein Passagier den Müll nicht in den Eimer wirft, ist das ein kleiner Fehler. Der Schaffner räumt ihn weg (`Result`). Wenn aber plötzlich die Schienen blockiert sind und ein Zusammenstoß droht, zieht der Lokführer die **Notbremse** (`panic!`). Der Zug hält sofort an. Es gibt keinen Versuch, "normal weiterzufahren".

---

## 🛠️ Wie wird eine Panic ausgelöst?

Es gibt zwei Wege, wie eine Panic in deinem Rust-Programm entstehen kann:

### 1. Explizit durch dich: Das `panic!`-Makro
Du kannst das Makro an jeder Stelle in deinem Code selbst aufrufen:

```rust
fn main() {
    println!("Programm startet...");

    // Ein unlösbares Problem tritt auf
    panic!("Kritischer Systemfehler: Die Schwerkraft wurde deaktiviert!");

    // Dieser Code wird niemals erreicht!
    println!("Programm läuft weiter...");
}
```

Du kannst auch Werte in die Fehlermeldung formatieren:
```rust
let fehlercode = 500;
panic!("Verbindung zum Server fehlgeschlagen! Code: {}", fehlercode);
```

### 2. Implizit durch die Laufzeit (Laufzeitfehler)
Rusts Standardbibliothek wirft automatisch eine Panic, wenn du eine illegale Operation ausführst:

#### A) Index Out of Bounds (Bereichsüberschreitung)
```rust
let v = vec![10, 20, 30];
// Der Vektor hat nur die Indizes 0, 1 und 2.
// Der Zugriff auf Index 5 bringt das Programm zum Absturz!
let element = v[5]; 
```

#### B) Division durch Null
```rust
let x = 10;
let y = 0;
let ergebnis = x / y; // Löst eine Panic aus!
```

---

## ⚡ Unabsichtliche Panics durch unwrap() und expect()

In Phase 3 hast du gelernt, dass du mit `.unwrap()` und `.expect()` schnell an den Wert in einer `Option` oder einem `Result` herankommst. Du solltest diese Methoden jedoch mit äußerster Vorsicht nutzen!

```rust
let leere_option: Option<i32> = None;

// Das führt sofort zu einer Panic!
let wert = leere_option.unwrap(); 
```

*   **`unwrap()`** sagt dem Compiler: *"Ich bin mir zu 100% sicher, dass hier ein Wert drin ist. Wenn nicht, stürze einfach ab!"*
*   **`expect("Fehlermeldung")`** macht genau das Gleiche, erlaubt dir aber, eine eigene Fehlermeldung für den Absturz zu definieren:
    ```rust
    let datei = File::open("wichtig.txt").expect("Die Datei 'wichtig.txt' wird zwingend zum Start benötigt!");
    ```

> [!TIP]
> Verwende `unwrap()` und `expect()` vor allem beim Prototyping oder in Tests. In produktivem Code solltest du fast immer `match` oder `if let` bevorzugen, um Abstürze zu vermeiden.

---

## 🔍 Den Fehler finden: RUST_BACKTRACE

Wenn dein Programm abstürzt, möchtest du natürlich wissen, *wo* im Code der Fehler passiert ist. Rust bietet dir dafür ein mächtiges Werkzeug namens **Backtrace**.

Standardmäßig gibt Rust bei einer Panic nur eine kurze Meldung aus:
```text
thread 'main' panicked at 'Kritischer Systemfehler!', src/main.rs:5:5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

Wenn du dein Programm im Terminal mit der Umgebungsvariable `RUST_BACKTRACE=1` startest, gibt Rust den gesamten Aufrufstapel (Call Stack) aus. Du siehst genau, welche Funktionen nacheinander aufgerufen wurden, bis es zum Absturz kam:

```bash
RUST_BACKTRACE=1 cargo run
```

---

## ⚙️ Was passiert bei einer Panic im Hintergrund?

Wenn eine Panic ausgelöst wird, reagiert Rust auf eine von zwei Arten (konfigurierbar in der `Cargo.toml`):

1.  **Stack Unwinding (Standard):**
    Rust geht den gesamten Funktionsaufruf-Stapel (Call Stack) rückwärts durch und räumt den Speicher auf. Alle Variablen und Datenstrukturen, die auf dem Weg liegen, werden ordnungsgemäß gelöscht (Destruktoren werden aufgerufen). Das ist sauber, kostet aber etwas Speicherplatz und Rechenzeit.
2.  **Abort (Sofortiger Abbruch):**
    Das Programm stoppt augenblicklich und übergibt die Kontrolle an das Betriebssystem. Es wird nichts aufgeräumt. Das spart Dateigröße und macht das fertige Programm minimal schneller.
    
    Du kannst dieses Verhalten in deiner `Cargo.toml` erzwingen:
    ```toml
    [profile.release]
    panic = "abort"
    ```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen!)

### Aufgabe 1: Leicht – Die Notbrems-Funktion
1. **Ziel:** Schreibe eine Funktion, die unter einer bestimmten Bedingung kontrolliert abstürzt.
2. **Details:**
   - Erstelle eine Funktion `pruefe_temperatur(grad: f64)`.
   - Wenn die Temperatur über 100.0 Grad steigt, soll das Programm mit einer verständlichen Fehlermeldung abstürzen (`panic!`).
   - Rufe die Funktion in deiner `main` mit verschiedenen Werten auf.

### Aufgabe 2: Mittel – Der Backtrace-Detektiv
1. **Ziel:** Provoziere einen Absturz tief in deinem Code und finde ihn mithilfe von `RUST_BACKTRACE`.
2. **Details:**
   - Erstelle drei Funktionen: `funktion_a()`, die `funktion_b()` aufruft, welche wiederum `funktion_c()` aufruft.
   - In `funktion_c()` greifst du absichtlich über einen ungültigen Index auf einen Vektor zu (z.B. Index 10 bei einem Vektor mit 3 Elementen).
   - Starte das Programm normal, betrachte die Ausgabe.
   - Starte das Programm danach mit `RUST_BACKTRACE=1` im Terminal und versuche, die Zeilennummer von `funktion_c` im Backtrace zu finden.

### Aufgabe 3: Schwer – Absicherung vs. Notstopp
1. **Ziel:** Entscheide, wann ein Fehler wiederherstellbar ist und wann nicht.
2. **Details:**
   - Schreibe ein Programm, das ein Benutzerkonto lädt.
   - Wenn die Datei für das Benutzerkonto nicht existiert, erstelle ein neues Standardkonto (das ist ein wiederherstellbarer Fehler -> `Result` oder `Option`).
   - Wenn die Datei jedoch existiert, aber völlig korrupte Daten enthält (z. B. negative Kontostände), bricht das Programm ab, da dies auf einen Systemfehler oder Manipulation hindeutet (`panic!`).

---

## 📌 Merkzettel: panic!

*   `panic!` wird für **unwiederherstellbare Fehler** verwendet (Bugs, illegale Zustände).
*   Es beendet das Programm sofort und kontrolliert.
*   Mit `unwrap()` und `expect()` greift man schnell auf Werte zu, riskiert aber unabsichtliche Panics.
*   Die Umgebungsvariable `RUST_BACKTRACE=1` zeigt dir den genauen Absturzort im Code.
*   In der `Cargo.toml` kann zwischen dem Aufräumen des Speichers (`unwind`) und dem sofortigen Abbruch (`abort`) unterschieden werden.
