# 100 Projekte

Phase 1: Projekte für Einsteiger lesen
Jedes Projekt übt alle Grundlagen gleichzeitig:
Passives Auffrischen

| Thema | Was du lernst |
|---|---|
| 🧱 Variablen & Datentypen | Zahlen, Texte, Mutabilität |
| 🔀 Kontrollfluss | if/else, loop, while, for |
| ⌨️ Benutzereingabe | Lesen von der Konsole, Konvertierung |
| 🧠 Ownership & Borrowing | Wer besitzt was? Referenzen nutzen |
| 📝 String vs. &str | Texte speichern, vergleichen, ausgeben |

Hinweis: Alle Projekte zeigen nur fertigen Code und Kommentare an. Nur lesen!

---

## Projekt 1: Begrüßung mit Eingabe
```rust
use std::io;

fn main() {
    // 🧱 Variable für Text (String)
    let mut name = String::new();
    
    println!("Bitte gib deinen Namen ein:");
    
    // ⌨️ Benutzereingabe
    // 🧠 `&mut name` = veränderbare Referenz übergeben (Borrowing)
    io::stdin().read_line(&mut name).expect("Fehler beim Lesen");
    
    // 📝 `.trim()` entfernt Leerzeichen/Zeilenumbrüche am Ende (&str)
    let name_trimmed = name.trim();
    
    // 🔀 Kontrollfluss
    if name_trimmed == "Rust" {
        println!("Oh, du heißt wie die Sprache!");
    } else {
        println!("Hallo, {}!", name_trimmed);
    }
}
```

---

## Projekt 2: Zahlen addieren bis 100
```rust
fn main() {
    // 🧱 Veränderbare Zahl (i32)
    let mut summe = 0;
    
    // 🔀 Kontrollfluss (for-Schleife)
    for i in 1..=100 {
        summe += i; // Addiere i zur Summe
    }
    
    println!("Die Summe der Zahlen von 1 bis 100 ist: {}", summe);
}
```

---

## Projekt 3: Passwort-Prüfer
```rust
use std::io;

fn main() {
    // 📝 &str (fest vorgegebener Text)
    let geheimnis = "rust123";
    // 🧱 String (veränderbarer Text für Eingabe)
    let mut eingabe = String::new();
    
    println!("Bitte Passwort eingeben:");
    // ⌨️ Benutzereingabe mit Borrowing (&mut)
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // 🔀 Kontrollfluss & Vergleich
    if eingabe.trim() == geheimnis {
        println!("Zugriff gewährt!");
    } else {
        println!("Zugriff verweigert!");
    }
}
```

---

## Projekt 4: Gerade oder Ungerade
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung von String zu i32
    let zahl: i32 = eingabe.trim().parse().expect("Das ist keine Zahl!");
    
    // 🔀 Kontrollfluss mit Modulo
    if zahl % 2 == 0 {
        println!("{} ist eine gerade Zahl.", zahl);
    } else {
        println!("{} ist eine ungerade Zahl.", zahl);
    }
}
```

---

## Projekt 5: Zählen bis zum Ziel
```rust
use std::io;

fn main() {
    println!("Bis wohin soll ich zählen?");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let ziel: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    // 🔀 while-Schleife
    let mut aktuell = 1;
    while aktuell <= ziel {
        println!("Zahl: {}", aktuell);
        aktuell += 1;
    }
}
```

---

## Projekt 6: Lieblingsfarbe erraten
```rust
use std::io;

fn main() {
    // 🔀 Endlose loop-Schleife
    loop {
        println!("Errate meine Lieblingsfarbe (Tipp: Sie ist rot oder blau):");
        let mut farbe = String::new();
        io::stdin().read_line(&mut farbe).expect("Fehler");
        
        // 📝 Vergleichen von &str
        if farbe.trim() == "rot" {
            println!("Richtig! Rot ist super.");
            break; // 🔀 Schleife beenden
        } else {
            println!("Falsch, versuche es nochmal!");
        }
    }
}
```

---

## Projekt 7: Temperatur-Umrechner
```rust
use std::io;

fn main() {
    println!("Gib die Temperatur in Celsius ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // 🧱 f64 für Kommazahlen
    let celsius: f64 = eingabe.trim().parse().expect("Zahl benötigt");
    let fahrenheit = celsius * 1.8 + 32.0;
    
    println!("{}°C sind {}°F", celsius, fahrenheit);
}
```

---

## Projekt 8: Wortlängen-Messer
```rust
use std::io;

fn main() {
    println!("Gib ein Wort ein:");
    let mut wort = String::new();
    io::stdin().read_line(&mut wort).expect("Fehler");
    
    // 🧠 Borrowing: len() nutzt eine Referenz auf den String
    let laenge = wort.trim().len();
    
    println!("Dein Wort hat {} Buchstaben.", laenge);
}
```

---

## Projekt 9: Countdown
```rust
fn main() {
    // 🔀 for-Schleife rückwärts
    for i in (1..=10).rev() {
        println!("Countdown: {}", i);
    }
    println!("Start!");
}
```

---

## Projekt 10: Einfacher Taschenrechner (Addition)
```rust
use std::io;

fn main() {
    let mut zahl1 = String::new();
    let mut zahl2 = String::new();
    
    println!("Erste Zahl:");
    io::stdin().read_line(&mut zahl1).expect("Fehler");
    
    println!("Zweite Zahl:");
    io::stdin().read_line(&mut zahl2).expect("Fehler");
    
    let z1: f64 = zahl1.trim().parse().expect("Zahl erwartet");
    let z2: f64 = zahl2.trim().parse().expect("Zahl erwartet");
    
    println!("Ergebnis: {}", z1 + z2);
}
```

---

## Projekt 11: Zähler bis 11
```rust
fn main() {
    let max = 11;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 12: Ist die Zahl größer als 12?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 12 {
        println!("Ja, {} ist größer als 12!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 12.", zahl);
    }
}
```

---

## Projekt 13: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 14: Altersprüfer (Mindestalter 14)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 14 {
        println!("Du hast das Mindestalter von 14 erreicht!");
    } else {
        println!("Leider noch zu jung für 14.");
    }
}
```

---

## Projekt 15: Multiplikator 15
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 15 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 15);
}
```

---

## Projekt 16: Zähler bis 16
```rust
fn main() {
    let max = 16;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 17: Ist die Zahl größer als 17?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 17 {
        println!("Ja, {} ist größer als 17!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 17.", zahl);
    }
}
```

---

## Projekt 18: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 19: Altersprüfer (Mindestalter 19)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 19 {
        println!("Du hast das Mindestalter von 19 erreicht!");
    } else {
        println!("Leider noch zu jung für 19.");
    }
}
```

---

## Projekt 20: Multiplikator 20
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 20 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 20);
}
```

---

## Projekt 21: Zähler bis 21
```rust
fn main() {
    let max = 21;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 22: Ist die Zahl größer als 22?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 22 {
        println!("Ja, {} ist größer als 22!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 22.", zahl);
    }
}
```

---

## Projekt 23: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 24: Altersprüfer (Mindestalter 24)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 24 {
        println!("Du hast das Mindestalter von 24 erreicht!");
    } else {
        println!("Leider noch zu jung für 24.");
    }
}
```

---

## Projekt 25: Multiplikator 25
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 25 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 25);
}
```

---

## Projekt 26: Zähler bis 26
```rust
fn main() {
    let max = 26;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 27: Ist die Zahl größer als 27?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 27 {
        println!("Ja, {} ist größer als 27!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 27.", zahl);
    }
}
```

---

## Projekt 28: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 29: Altersprüfer (Mindestalter 29)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 29 {
        println!("Du hast das Mindestalter von 29 erreicht!");
    } else {
        println!("Leider noch zu jung für 29.");
    }
}
```

---

## Projekt 30: Multiplikator 30
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 30 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 30);
}
```

---

## Projekt 31: Zähler bis 31
```rust
fn main() {
    let max = 31;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 32: Ist die Zahl größer als 32?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 32 {
        println!("Ja, {} ist größer als 32!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 32.", zahl);
    }
}
```

---

## Projekt 33: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 34: Altersprüfer (Mindestalter 34)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 34 {
        println!("Du hast das Mindestalter von 34 erreicht!");
    } else {
        println!("Leider noch zu jung für 34.");
    }
}
```

---

## Projekt 35: Multiplikator 35
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 35 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 35);
}
```

---

## Projekt 36: Zähler bis 36
```rust
fn main() {
    let max = 36;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 37: Ist die Zahl größer als 37?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 37 {
        println!("Ja, {} ist größer als 37!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 37.", zahl);
    }
}
```

---

## Projekt 38: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 39: Altersprüfer (Mindestalter 39)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 39 {
        println!("Du hast das Mindestalter von 39 erreicht!");
    } else {
        println!("Leider noch zu jung für 39.");
    }
}
```

---

## Projekt 40: Multiplikator 40
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 40 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 40);
}
```

---

## Projekt 41: Zähler bis 41
```rust
fn main() {
    let max = 41;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 42: Ist die Zahl größer als 42?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 42 {
        println!("Ja, {} ist größer als 42!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 42.", zahl);
    }
}
```

---

## Projekt 43: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 44: Altersprüfer (Mindestalter 44)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 44 {
        println!("Du hast das Mindestalter von 44 erreicht!");
    } else {
        println!("Leider noch zu jung für 44.");
    }
}
```

---

## Projekt 45: Multiplikator 45
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 45 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 45);
}
```

---

## Projekt 46: Zähler bis 46
```rust
fn main() {
    let max = 46;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 47: Ist die Zahl größer als 47?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 47 {
        println!("Ja, {} ist größer als 47!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 47.", zahl);
    }
}
```

---

## Projekt 48: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 49: Altersprüfer (Mindestalter 49)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 49 {
        println!("Du hast das Mindestalter von 49 erreicht!");
    } else {
        println!("Leider noch zu jung für 49.");
    }
}
```

---

## Projekt 50: Multiplikator 50
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 50 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 50);
}
```

---

## Projekt 51: Zähler bis 51
```rust
fn main() {
    let max = 51;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 52: Ist die Zahl größer als 52?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 52 {
        println!("Ja, {} ist größer als 52!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 52.", zahl);
    }
}
```

---

## Projekt 53: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 54: Altersprüfer (Mindestalter 54)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 54 {
        println!("Du hast das Mindestalter von 54 erreicht!");
    } else {
        println!("Leider noch zu jung für 54.");
    }
}
```

---

## Projekt 55: Multiplikator 55
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 55 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 55);
}
```

---

## Projekt 56: Zähler bis 56
```rust
fn main() {
    let max = 56;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 57: Ist die Zahl größer als 57?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 57 {
        println!("Ja, {} ist größer als 57!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 57.", zahl);
    }
}
```

---

## Projekt 58: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 59: Altersprüfer (Mindestalter 59)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 59 {
        println!("Du hast das Mindestalter von 59 erreicht!");
    } else {
        println!("Leider noch zu jung für 59.");
    }
}
```

---

## Projekt 60: Multiplikator 60
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 60 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 60);
}
```

---

## Projekt 61: Zähler bis 61
```rust
fn main() {
    let max = 61;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 62: Ist die Zahl größer als 62?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 62 {
        println!("Ja, {} ist größer als 62!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 62.", zahl);
    }
}
```

---

## Projekt 63: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 64: Altersprüfer (Mindestalter 64)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 64 {
        println!("Du hast das Mindestalter von 64 erreicht!");
    } else {
        println!("Leider noch zu jung für 64.");
    }
}
```

---

## Projekt 65: Multiplikator 65
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 65 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 65);
}
```

---

## Projekt 66: Zähler bis 66
```rust
fn main() {
    let max = 66;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 67: Ist die Zahl größer als 67?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 67 {
        println!("Ja, {} ist größer als 67!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 67.", zahl);
    }
}
```

---

## Projekt 68: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 69: Altersprüfer (Mindestalter 69)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 69 {
        println!("Du hast das Mindestalter von 69 erreicht!");
    } else {
        println!("Leider noch zu jung für 69.");
    }
}
```

---

## Projekt 70: Multiplikator 70
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 70 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 70);
}
```

---

## Projekt 71: Zähler bis 71
```rust
fn main() {
    let max = 71;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 72: Ist die Zahl größer als 72?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 72 {
        println!("Ja, {} ist größer als 72!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 72.", zahl);
    }
}
```

---

## Projekt 73: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 74: Altersprüfer (Mindestalter 74)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 74 {
        println!("Du hast das Mindestalter von 74 erreicht!");
    } else {
        println!("Leider noch zu jung für 74.");
    }
}
```

---

## Projekt 75: Multiplikator 75
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 75 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 75);
}
```

---

## Projekt 76: Zähler bis 76
```rust
fn main() {
    let max = 76;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 77: Ist die Zahl größer als 77?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 77 {
        println!("Ja, {} ist größer als 77!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 77.", zahl);
    }
}
```

---

## Projekt 78: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 79: Altersprüfer (Mindestalter 79)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 79 {
        println!("Du hast das Mindestalter von 79 erreicht!");
    } else {
        println!("Leider noch zu jung für 79.");
    }
}
```

---

## Projekt 80: Multiplikator 80
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 80 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 80);
}
```

---

## Projekt 81: Zähler bis 81
```rust
fn main() {
    let max = 81;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 82: Ist die Zahl größer als 82?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 82 {
        println!("Ja, {} ist größer als 82!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 82.", zahl);
    }
}
```

---

## Projekt 83: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 84: Altersprüfer (Mindestalter 84)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 84 {
        println!("Du hast das Mindestalter von 84 erreicht!");
    } else {
        println!("Leider noch zu jung für 84.");
    }
}
```

---

## Projekt 85: Multiplikator 85
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 85 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 85);
}
```

---

## Projekt 86: Zähler bis 86
```rust
fn main() {
    let max = 86;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 87: Ist die Zahl größer als 87?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 87 {
        println!("Ja, {} ist größer als 87!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 87.", zahl);
    }
}
```

---

## Projekt 88: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 89: Altersprüfer (Mindestalter 89)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 89 {
        println!("Du hast das Mindestalter von 89 erreicht!");
    } else {
        println!("Leider noch zu jung für 89.");
    }
}
```

---

## Projekt 90: Multiplikator 90
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 90 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 90);
}
```

---

## Projekt 91: Zähler bis 91
```rust
fn main() {
    let max = 91;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 92: Ist die Zahl größer als 92?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 92 {
        println!("Ja, {} ist größer als 92!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 92.", zahl);
    }
}
```

---

## Projekt 93: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 94: Altersprüfer (Mindestalter 94)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 94 {
        println!("Du hast das Mindestalter von 94 erreicht!");
    } else {
        println!("Leider noch zu jung für 94.");
    }
}
```

---

## Projekt 95: Multiplikator 95
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 95 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 95);
}
```

---

## Projekt 96: Zähler bis 96
```rust
fn main() {
    let max = 96;
    let mut count = 1;
    // 🔀 while-Schleife
    while count <= max {
        println!("Zähle: {}", count);
        count += 1;
    }
}
```

---

## Projekt 97: Ist die Zahl größer als 97?
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    // ⌨️ Konvertierung
    let zahl: i32 = eingabe.trim().parse().expect("Zahl erwartet");
    
    // 🔀 if/else
    if zahl > 97 {
        println!("Ja, {} ist größer als 97!", zahl);
    } else {
        println!("Nein, {} ist nicht größer als 97.", zahl);
    }
}
```

---

## Projekt 98: Textwiederholung
```rust
fn main() {
    // 📝 &str
    let wort = "Rust";
    // 🔀 for-Schleife
    for _ in 0..4 {
        println!("Ich lerne {}", wort);
    }
}
```

---

## Projekt 99: Altersprüfer (Mindestalter 99)
```rust
use std::io;

fn main() {
    println!("Wie alt bist du?");
    // 🧱 String
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let alter: i32 = eingabe.trim().parse().expect("Alter erwartet");
    
    if alter >= 99 {
        println!("Du hast das Mindestalter von 99 erreicht!");
    } else {
        println!("Leider noch zu jung für 99.");
    }
}
```

---

## Projekt 100: Multiplikator 100
```rust
use std::io;

fn main() {
    println!("Gib eine Zahl ein, um sie mit 100 zu multiplizieren:");
    let mut eingabe = String::new();
    io::stdin().read_line(&mut eingabe).expect("Fehler");
    
    let zahl: i32 = eingabe.trim().parse().expect("Bitte eine Zahl eingeben");
    
    println!("Das Ergebnis ist: {}", zahl * 100);
}
```
