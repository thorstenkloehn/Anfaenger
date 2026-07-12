# Konzepte statt Syntax lernen (Phase 4)

Wenn deine Rust-Programme wachsen, reicht eine einzige große Code-Datei nicht mehr aus. In Phase 4 lernst du, wie du deinen Code sauber strukturierst, modular aufteilst und externe Bibliotheken einbindest. Das Wichtigste ist auch hier, die grundlegenden Konzepte zu verstehen, anstatt nur die Syntax auswendig zu lernen.

---

## 📦 1. Module & Sichtbarkeit

### Die Analogie: Das Firmengebäude

Stell dir eine Firma vor. Es gibt verschiedene Abteilungen (Buchhaltung, IT, Marketing). Jede Abteilung hat interne Dokumente, auf die nur ihre Mitarbeiter Zugriff haben. Manche Räume sind öffentlich (Empfang, Konferenzräume), andere sind abgeschlossen (Serverraum, Chefbüro).

Genau so funktioniert das Modulsystem in Rust: Jedes Modul ist eine Abteilung. Standardmäßig ist alles abgeschlossen (privat). Nur was ausdrücklich mit `pub` markiert ist, kann von außen gesehen werden.

### Theorie: Inline-Module definieren

```rust
// Eine Datei: main.rs (Inline-Module für kleinere Projekte)

// Das Modul 'buchhaltung' ist eine Abteilung.
mod buchhaltung {
    // Diese Funktion ist PRIVAT – nur innerhalb des Moduls sichtbar.
    fn berechne_intern(betrag: f64) -> f64 {
        betrag * 1.19 // Mehrwertsteuer
    }

    // Mit 'pub' wird die Funktion öffentlich zugänglich.
    pub fn berechne_brutto(netto: f64) -> f64 {
        berechne_intern(netto) // Interne Funktion kann intern aufgerufen werden.
    }

    // Öffentliches Struct, aber private Felder!
    pub struct Rechnung {
        pub nummer: u32,    // pub: von außen les- und schreibbar
        betrag: f64,         // privat: nur innerhalb des Moduls zugänglich
    }

    impl Rechnung {
        // Assoziierte Funktion (Konstruktor) – öffentlich
        pub fn neu(nummer: u32, betrag: f64) -> Self {
            Rechnung { nummer, betrag }
        }

        // Getter für das private Feld
        pub fn betrag(&self) -> f64 {
            self.betrag
        }
    }
}

fn main() {
    // Auf öffentliche Funktion zugreifen mit dem ::-Pfad-Operator
    let brutto = buchhaltung::berechne_brutto(100.0);
    println!("Brutto: {:.2} €", brutto);

    // Auf privates Feld direkt zugreifen würde Fehler geben:
    // buchhaltung::berechne_intern(100.0); // ❌ Fehler: private function

    let rechnung = buchhaltung::Rechnung::neu(42, 150.0);
    println!("Rechnungsnummer: {}", rechnung.nummer);     // ✅ pub Feld
    println!("Betrag: {}", rechnung.betrag());             // ✅ pub Methode
    // println!("{}", rechnung.betrag); // ❌ Fehler: private Feld
}
```

### Theorie: Module in separate Dateien auslagern

Für größere Projekte lagerst du Module in eigene Dateien aus. Die Projektstruktur sieht dann so aus:

```text
src/
├── main.rs          ← Einstiegspunkt, deklariert die Module
├── buchhaltung.rs   ← Datei für das Modul 'buchhaltung'
└── it/              ← Ordner für das Modul 'it' mit Untermodulen
    ├── mod.rs       ← Einstiegspunkt des it-Moduls (klassisch)
    └── netzwerk.rs  ← Untermodul 'it::netzwerk'
```

```rust
// main.rs
mod buchhaltung; // Rust sucht nach 'buchhaltung.rs' oder 'buchhaltung/mod.rs'
mod it;          // Rust sucht nach 'it.rs' oder 'it/mod.rs'

fn main() {
    buchhaltung::starte();
    it::netzwerk::verbinde();
}

// buchhaltung.rs
pub fn starte() {
    println!("Buchhaltung gestartet.");
}

// it/mod.rs
pub mod netzwerk; // Deklariert das Untermodul

// it/netzwerk.rs
pub fn verbinde() {
    println!("Netzwerk verbunden.");
}
```

### Theorie: Sichtbarkeits-Modifier

```rust
mod bibliothek {
    mod intern {
        pub(super) fn nur_fuer_eltern() {
            println!("Nur das Elternmodul (bibliothek) kann das aufrufen.");
        }
    }

    pub(crate) fn nur_innerhalb_der_crate() {
        intern::nur_fuer_eltern(); // OK: bibliothek ist das Elternmodul
        println!("Nur innerhalb desselben Crates sichtbar, nicht für externe Nutzer.");
    }

    pub fn oeffentlich() {
        println!("Jeder kann das aufrufen – auch externe Crates.");
    }
}

fn main() {
    bibliothek::oeffentlich();           // ✅
    bibliothek::nur_innerhalb_der_crate(); // ✅ (wir sind in derselben Crate)
    // bibliothek::intern::nur_fuer_eltern(); // ❌ Fehler: Modul 'intern' ist privat
}
```

### Typische Einsteigerfehler bei Modulen

```rust
// ❌ Fehler 1: Modul-Datei erstellen, aber nicht in main.rs deklarieren
// Du erstellst 'hilfe.rs', aber vergisst 'mod hilfe;' in main.rs
// → Rust weiß nichts von dieser Datei!
// ✅ Lösung: Immer 'mod dateiname;' in main.rs oder lib.rs hinzufügen.

// ❌ Fehler 2: Versuchen, auf private Felder zuzugreifen
// struct Konto { saldo: f64 } // privat (kein pub)
// let k = Konto { saldo: 100.0 }; // ❌ außerhalb des Moduls
// ✅ Lösung: pub fn neu(...) als Konstruktor und pub fn saldo(&self) als Getter.

// ❌ Fehler 3: pub vergessen bei wiederverwendeten Funktionen
// mod utils { fn helper() { ... } } // privat!
// utils::helper(); // ❌ Fehler: function `helper` is private
// ✅ Lösung: pub fn helper() { ... }
```

---

## 🔗 2. Pfade & Importe

### Die Analogie: Das GPS-Navigationssystem

Stell dir vor, du beschreibst jemandem, wie er zu deinem Büro kommt. Du könntest die vollständige Adresse angeben ("Musterstraße 1, 12345 Berlin, Deutschland") oder wenn er schon in deiner Stadt ist, nur sagen ("zweite Etage, links"). In Rust gibt es genauso absolute Pfade (von der Wurzel) und relative Pfade (von deiner aktuellen Position).

### Theorie: Pfade verstehen

```rust
// Projekt-Struktur:
// crate (Wurzel)
// ├── garden
// │   ├── vegetables
// │   │   └── Asparagus (Struct)
// │   └── herbs
// └── kitchen

mod garden {
    pub mod vegetables {
        pub struct Asparagus {
            pub sprouts: u32,
        }
    }

    pub mod herbs {
        pub fn salbei() {
            // Relativer Pfad mit super:: – gehe eine Ebene hoch (zu garden)
            // und dann zum Geschwistermodul vegetables
            let _a = super::vegetables::Asparagus { sprouts: 5 };
        }
    }
}

fn main() {
    // Absoluter Pfad: beginnt mit 'crate' (Wurzel der aktuellen Crate)
    let aspa1 = crate::garden::vegetables::Asparagus { sprouts: 3 };

    // Relativer Pfad: beginnt vom aktuellen Modul (hier: crate-Wurzel)
    let aspa2 = garden::vegetables::Asparagus { sprouts: 5 };

    println!("{}", aspa1.sprouts);
    println!("{}", aspa2.sprouts);
}
```

### Theorie: use – Pfade in den Scope bringen

```rust
use std::collections::HashMap; // Einzelnen Typ importieren

// Verschachtelte Pfade: Mehrere Importe aus demselben Pfad
use std::{
    collections::{HashMap, HashSet, BTreeMap},
    io::{self, Write}, // 'self' importiert std::io als Modul UND Write als Trait
};

// Umbenennung mit 'as'
use std::fmt::Result as FmtResult;
use std::io::Result as IoResult;

// Glob-Import (alle öffentlichen Elemente) – mit Vorsicht verwenden!
use std::collections::*;

fn main() {
    let mut map: HashMap<&str, i32> = HashMap::new(); // Kein langer Pfad mehr nötig!
    map.insert("a", 1);

    // io wurde importiert, Write als Trait für flush()
    io::stdout().flush().unwrap();
}
```

### Theorie: pub use – Re-Exporting für saubere APIs

Re-Exporting erlaubt es dir, die interne Struktur vor Benutzern zu verstecken und eine aufgeräumte öffentliche API anzubieten.

```rust
// Interne Struktur (komplex):
mod backend {
    pub mod datenbank {
        pub mod verbindung {
            pub fn verbinde() { println!("Verbunden!"); }
        }
    }
}

// Re-Export: Externe Nutzer müssen nur 'api::verbinde()' kennen.
pub mod api {
    // pub use: macht den importierten Pfad öffentlich zugänglich
    pub use crate::backend::datenbank::verbindung::verbinde;
}

fn main() {
    // Ohne Re-Export müsste man schreiben:
    // backend::datenbank::verbindung::verbinde();

    // Mit Re-Export ist es viel einfacher:
    api::verbinde(); // ✅ Saubere, einfache API!
}
```

### Typische Einsteigerfehler bei Pfaden

```rust
// ❌ Fehler 1: self:: verwechseln mit super:: und crate::
// self::   = aktuelles Modul (selten benötigt)
// super::  = Elternmodul (ein Level hoch)
// crate::  = Wurzel der gesamten Crate (absoluter Pfad)
// ✅ Lösung: In Untermodulen use super::Typ; für Eltermodul-Typen.

// ❌ Fehler 2: use in Modulen vergessen
// mod mein_modul {
//     fn test() {
//         let mut map = HashMap::new(); // ❌ HashMap nicht gefunden!
//     }
// }
// ✅ Lösung: use std::collections::HashMap; innerhalb des Moduls oder am Anfang der Datei.

// ❌ Fehler 3: Glob-Import in Bibliotheken
// use meiner_crate::*; // Schlechte Praxis in Libraries – unklare Abhängigkeiten!
// ✅ Lösung: Immer explizit importieren. Glob-Import nur in Tests oder Preludes.
```

---

## 📚 3. Crates & Cargo

### Die Analogie: Der Baumarkt

Cargo ist wie ein gut organisierter Baumarkt für Code. Du musst nicht jedes Werkzeug selbst herstellen – du gehst in den Baumarkt (crates.io), wählst die Werkzeuge aus, die du brauchst (Dependencies), und Cargo besorgt und verwaltet alles für dich automatisch. Wenn eine neue Version eines Werkzeugs herauskommt, kümmert sich Cargo auch darum.

### Theorie: Cargo.toml verstehen

```toml
# Cargo.toml – Das Herzstück deines Rust-Projekts

[package]
name = "mein_projekt"
version = "0.1.0"
edition = "2021"          # Rust-Edition (2015, 2018, 2021)
authors = ["Dein Name <email@example.com>"]
description = "Mein erstes Rust-Projekt"

# Externe Abhängigkeiten
[dependencies]
rand = "0.8"              # Semantische Versionierung: ^0.8 (kompatibel mit 0.8.x)
serde = { version = "1.0", features = ["derive"] }  # Mit aktivierten Features
chrono = "0.4"
tokio = { version = "1", features = ["full"] }       # Async-Runtime

# Nur für Tests und Entwicklung, nicht in der Releaseversion
[dev-dependencies]
assert_eq_float = "0.1"

# Optimierungen für den Release-Build
[profile.release]
opt-level = 3             # Maximale Optimierung
```

### Theorie: Externe Crates einbinden und nutzen

```rust
// Nach dem Hinzufügen in Cargo.toml: cargo build lädt alles herunter.

// rand-Crate: Zufallszahlen generieren
use rand::Rng; // Trait importieren (stellt Methoden zur Verfügung)

fn main() {
    // thread_rng() erzeugt einen Zufallsgenerator für den aktuellen Thread
    let mut rng = rand::thread_rng();

    // Zufällige Ganzzahl zwischen 1 und 100 (inklusiv)
    let zufallszahl: u32 = rng.gen_range(1..=100);
    println!("Zufallszahl: {}", zufallszahl);

    // Zufälligen Bool-Wert erzeugen
    let muenze: bool = rng.gen();
    println!("Münze: {}", if muenze { "Kopf" } else { "Zahl" });
}
```

```rust
// serde-Crate: Daten serialisieren und deserialisieren
use serde::{Serialize, Deserialize};
use serde_json; // Separate Crate für JSON-Format

// Mit derive-Makros automatisch Serialisierung implementieren
#[derive(Serialize, Deserialize, Debug)]
struct Benutzer {
    name: String,
    alter: u32,
    email: String,
}

fn main() {
    let nutzer = Benutzer {
        name: String::from("Alice"),
        alter: 30,
        email: String::from("alice@example.com"),
    };

    // Rust-Struct → JSON-String
    let json = serde_json::to_string_pretty(&nutzer)
        .expect("Serialisierung fehlgeschlagen");
    println!("{}", json);
    // {
    //   "name": "Alice",
    //   "alter": 30,
    //   "email": "alice@example.com"
    // }

    // JSON-String → Rust-Struct
    let json_str = r#"{"name": "Bob", "alter": 25, "email": "bob@example.com"}"#;
    let bob: Benutzer = serde_json::from_str(json_str)
        .expect("Deserialisierung fehlgeschlagen");
    println!("{:?}", bob);
}
```

### Theorie: Cargo-Befehle im Überblick

```bash
# Neues Projekt erstellen
cargo new mein_projekt      # Binäres Projekt (main.rs)
cargo new meine_lib --lib   # Bibliothek (lib.rs)

# Abhängigkeiten verwalten
cargo add rand              # Fügt rand zur Cargo.toml hinzu (cargo-edit nötig)
cargo update                # Aktualisiert alle Abhängigkeiten

# Bauen und Ausführen
cargo build                 # Debug-Build (schnell, mit Debug-Infos)
cargo build --release       # Release-Build (langsam, aber optimiert)
cargo run                   # Bauen und direkt ausführen
cargo run --release         # Release-Build ausführen

# Prüfen und Testen
cargo check                 # Nur auf Fehler prüfen (ohne Binärdatei zu erzeugen)
cargo test                  # Alle Tests ausführen
cargo doc --open            # Dokumentation generieren und im Browser öffnen

# Aufräumen
cargo clean                 # Alle Build-Artefakte löschen
```

### Theorie: Workspaces für Monorepos

```toml
# Workspace Cargo.toml (im Projektstamm)
[workspace]
members = [
    "bibliothek",   # Eine Library Crate
    "server",       # Eine Binary Crate
    "client",       # Noch eine Binary Crate
]
```

Mit einem Workspace teilen alle Mitglieder denselben `Cargo.lock` und denselben `target/`-Ordner. Das spart Speicherplatz und Buildzeit.

### Typische Einsteigerfehler bei Cargo & Crates

```rust
// ❌ Fehler 1: Crate in Cargo.toml hinzufügen, aber vergessen use zu schreiben
// Cargo.toml: rand = "0.8"
// main.rs: let n = rand::thread_rng(); // Funktioniert, aber...
// let x: u32 = rng.gen_range(1..10); // ❌ Fehler: Methode gen_range nicht gefunden!
// ✅ Lösung: use rand::Rng; // Den Trait importieren, der die Methoden bereitstellt.

// ❌ Fehler 2: Falsche Semantic-Versioning-Spezifikation
// rand = "*"  // Gefährlich! Kann bei Updates brechen.
// rand = "0"  // Zu breit – erlaubt 0.1 bis 0.9 mit möglicherweise brechenden Änderungen.
// ✅ Lösung: rand = "0.8" (erlaubt 0.8.0 bis 0.8.x, blockiert 0.9.0)

// ❌ Fehler 3: Crate-Namen mit Bindestrichen vs. Unterstrichen verwechseln
// Cargo.toml: serde_json = "1.0"  → Dateiname im System: serde-json
// Im Code: use serde_json;        → Im Code immer Unterstrich!
// ✅ Merkhilfe: Cargo.toml = Unterstrich ODER Bindestrich (beides geht).
//              In Rust-Code immer Unterstrich.
```

---

## 🚀 Wie du diese Phase am besten nutzt

**1. Klein anfangen:** Beginne mit einer einzigen `main.rs` und erstelle inline Module (`mod name { }`). Wenn das Modul zu groß wird, lagere es in eine eigene Datei aus. Du musst nicht von Anfang an die perfekte Struktur haben.

**2. API-Design üben:** Wenn du ein Modul schreibst, frage dich: "Was soll ein Nutzer dieses Moduls sehen?" Alles andere als privat markieren. Weniger Oberfläche = besser wartbarer Code.

**3. Pfade mit use vereinfachen:** Wenn du einen Pfad mehr als zweimal tippst, ist es Zeit für ein `use`. Aber übertreibe nicht mit Glob-Imports (`*`) – sie machen den Code unlesbar.

**4. Crates schrittweise einbinden:** Fange mit `rand` und `serde` an – sie sind die häufigsten Einstiegspunkte. Schaue auf [crates.io](https://crates.io) und [docs.rs](https://docs.rs) nach Dokumentation.

> [!TIP]
> Besuche [lib.rs](https://lib.rs) statt crates.io für eine bessere Übersicht und Bewertungen von populären Crates. Schau immer auf die Downloadzahlen und das letzte Update-Datum – aktiv gewartete Crates sind deutlich bevorzugter.

---

## 📌 Merkzettel: Phase 4 auf einen Blick

> [!IMPORTANT]
> **Die 3 Kernkonzepte der Phase 4:**
>
> * **Module & Sichtbarkeit:** Alles ist standardmäßig PRIVAT. `pub` macht Elemente öffentlich. `pub(crate)` nur innerhalb der Crate. `pub(super)` nur für das Elternmodul. Modul-Dateien mit `mod dateiname;` in `main.rs` deklarieren. Struct-Felder sind unabhängig von der Struct-Sichtbarkeit (brauchen eigenes `pub`).
>
> * **Pfade & Importe:** `crate::` = absoluter Pfad von der Wurzel. `super::` = ein Level hoch. `self::` = aktuelles Modul. Mit `use pfad::Typ;` Pfade abkürzen. Mit `pub use` Re-Exporte für saubere APIs erstellen. Verschachtelte Importe mit `use std::{io, fs};` bündeln.
>
> * **Crates & Cargo:** Abhängigkeiten in `[dependencies]` der `Cargo.toml`. Semantic Versioning: `"1.0"` = kompatibel mit 1.x.x. `cargo add crate_name` zum Hinzufügen. `cargo build` baut, `cargo run` führt aus, `cargo test` testet. Auf [docs.rs](https://docs.rs) die Dokumentation jeder Crate nachschlagen. Traits oft separat importieren (`use rand::Rng;`).
