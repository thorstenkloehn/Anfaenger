# 100 Projekte - Module, Pfade & Crates

In dieser Phase 4 vertiefen wir die **Code-Organisation** und das **Crates-Ökosystem** in Rust.
Jedes Projekt kombiniert das Gelernte aus den Phasen 1, 2 und 3 (wie Structs, Enums, Collections, Fehlerbehandlung, Pattern Matching) und erweitert dies um modulare Architektur, Import-Pfade und die Einbindung externer Crates.

| Thema | Was du lernst |
|---|---|
| 🧱 Grundlagen | Variablen, Datentypen, Kontrollfluss, Benutzereingabe |
| 🧠 Ownership & Borrowing | Wer besitzt Daten? Referenzen (`&` und `&mut`) |
| 📦 Structs & Enums | Eigene Datenstrukturen mit `struct`, `enum` und `impl` |
| 🗃️ Collections & Fehler | `Vec<T>`, `HashMap<K, V>`, `Result<T, E>` und `Option<T>` |
| 📂 Module & Sichtbarkeit | Code aufteilen mit `mod`, Kapselung mit `pub` und `pub(crate)` |
| 🔗 Pfade & Importe | Navigieren mit `use`, `super`, `self` und `crate`, Re-Exporting |
| 📚 Cargo & Crates | Einbinden von externen Bibliotheken aus crates.io in der `Cargo.toml` |

Hinweis: Alle Projekte zeigen nur fertigen Code und Kommentare an. Nur lesen!

---
## 100 Projekte - Module & Sichtbarkeit

In dieser Phase 4 lernen wir das **Modulsystem** von Rust kennen. Wir lernen, wie wir Code in logische Einheiten unterteilen (`mod`), den Zugriff auf Daten und Funktionen steuern (`pub`, `pub(crate)` und standardmäßige Privatheit) und Pfade (`use`, `crate`, `super`) zur Navigation nutzen.
Jedes Projekt kombiniert das Gelernte aus den vorherigen Phasen (Grundlagen, Structs, Enums, Collections, Fehlerbehandlung) und wendet die Kapselung konsequent an.

| Thema | Was du lernst |
|---|---|
| 🧱 Grundlagen | Variablen, Datentypen, Kontrollfluss, Benutzereingabe |
| 🧠 Ownership & Borrowing | Wer besitzt Daten? Referenzen (`&` und `&mut`) |
| 📦 Structs & Methoden | Eigene Datentypen mit `impl`-Blöcken strukturieren |
| 🏷️ Enums & Pattern Matching | Zustände abbilden und mit `match`/`if let` auswerten |
| 🗃️ Collections | `Vec<T>` und `HashMap<K, V>` für dynamische Daten |
| ⚠️ Fehlerbehandlung | `Result<T, E>` und `Option<T>` für sicheren Code |
| 📦 Module & Sichtbarkeit | Code-Strukturierung, Kapselung, `pub`, `pub(crate)`, `use` |

Hinweis: Alle Projekte zeigen nur fertigen Code und Kommentare an. Nur lesen!

---

## Phase 4: Module & Sichtbarkeit (Projekte 1 bis 25)

Die folgenden 25 Projekte konzentrieren sich primär auf die Aufteilung von Code in logische Module und das Prinzip der Kapselung. Wir simulieren diese Aufteilung über Inline-Module (`mod name`), was uns erlaubt, das Verhalten von `pub` und die standardmäßige Privatheit direkt in einer einzigen, compilierbaren Datei nachzuvollziehen.

---

## Projekt 1: Sicheres Tresor-System

```rust
// 📦 Modul für die Tresor-Logik
pub mod tresor {
    // 📦 Struct für den Tresor
    pub struct Safe {
        // 🛡️ Sichtbarkeit: Dieses Feld ist privat. Niemand außerhalb dieses Moduls kann es lesen oder ändern.
        pincode: String,
        // 🛡️ Sichtbarkeit: Dieses Feld ist öffentlich.
        pub ist_offen: bool,
    }

    impl Safe {
        // 🛡️ Sichtbarkeit: Konstruktor zum Erstellen eines Safes
        pub fn neu(pincode: &str) -> Self {
            Safe {
                pincode: String::from(pincode),
                ist_offen: false,
            }
        }

        // 🛡️ Sichtbarkeit: Eine öffentliche Methode zum Entsperren des Tresors
        // 🧠 Kapselung: Die Überprüfung des PIN-Codes geschieht intern.
        pub fn entsperren(&mut self, eingegebene_pin: &str) -> bool {
            if eingegebene_pin == self.pincode {
                self.ist_offen = true;
                true
            } else {
                false
            }
        }
    }
}

// 📦 Modul für Konsoleneingaben
pub mod eingabe {
    use std::io; // 🔍 Pfad: Importieren der Standardbibliothek

    // 🛡️ Sichtbarkeit: Öffentliche Hilfsfunktion zur Eingabe
    pub fn lese_zeile() -> String {
        let mut eingabe = String::new();
        io::stdin().read_line(&mut eingabe).expect("Fehler beim Lesen");
        eingabe.trim().to_string()
    }
}

fn main() {
    // 🔍 Pfad: Zugriff auf den Safe über das Modul `tresor`
    let mut mein_safe = tresor::Safe::neu("1234");

    println!("Bitte PIN eingeben:");
    let pin = eingabe::lese_zeile();

    if mein_safe.entsperren(&pin) {
        println!("Safe geöffnet! Offen: {}", mein_safe.ist_offen);
    } else {
        println!("Falscher PIN! Zugriff verweigert.");
    }
}
```

---

## Projekt 2: Temperatur-Konverter mit Hilfsmodul

```rust
// 📦 Hauptmodul für die Konvertierung
pub mod konverter {
    // 📦 Untermodul für Celsius-Berechnungen
    pub mod celsius {
        // 🛡️ Sichtbarkeit: Eine private Konstante, die nur in diesem Modul sichtbar ist
        const ABSOLUTER_NULLPUNKT: f64 = -273.15;

        // 🛡️ Sichtbarkeit: Öffentliche Funktion
        pub fn zu_fahrenheit(celsius: f64) -> Result<f64, String> {
            if celsius < ABSOLUTER_NULLPUNKT {
                return Err(String::from("Temperatur unter dem absoluten Nullpunkt!"));
            }
            Ok(celsius * 1.8 + 32.0)
        }
    }

    // 📦 Untermodul für Fahrenheit-Berechnungen
    pub mod fahrenheit {
        // 🛡️ Sichtbarkeit: Öffentliche Funktion
        pub fn zu_celsius(fahrenheit: f64) -> f64 {
            (fahrenheit - 32.0) / 1.8
        }
    }
}

fn main() {
    let celsius_wert = 25.0;

    // 🔍 Pfad: Aufruf über die Modul-Hierarchie
    match konverter::celsius::zu_fahrenheit(celsius_wert) {
        Ok(f) => println!("{}°C sind {}°F", celsius_wert, f),
        Err(e) => println!("Fehler: {}", e),
    }

    let fahrenheit_wert = 77.0;
    println!("{}°F sind {}°C", fahrenheit_wert, konverter::fahrenheit::zu_celsius(fahrenheit_wert));
}
```

---

## Projekt 3: Mitarbeiterdatenbank mit Getter

```rust
// 📦 Modul zur Mitarbeiterverwaltung
pub mod personal {
    // 📦 Struct für einen Mitarbeiter
    pub struct Mitarbeiter {
        // 🛡️ Sichtbarkeit: Der Name ist öffentlich
        pub name: String,
        // 🛡️ Sichtbarkeit: Das Gehalt ist privat (Kapselung)
        gehalt: u32,
    }

    impl Mitarbeiter {
        // 🛡️ Sichtbarkeit: Öffentlicher Konstruktor
        pub fn neu(name: &str, gehalt: u32) -> Self {
            Mitarbeiter {
                name: String::from(name),
                gehalt,
            }
        }

        // 🛡️ Sichtbarkeit: Getter-Methode (Erlaubt nur das Lesen, nicht das Ändern)
        // 🧠 Kapselung: Schutz vor unbefugter Änderung des Gehalts
        pub fn gehalt_anzeigen(&self) -> u32 {
            self.gehalt
        }
    }
}

fn main() {
    // 🔍 Pfad: Erstellung über das Modul
    let mitarbeiter = personal::Mitarbeiter::neu("Alice", 4500);

    // Alice ist öffentlich lesbar
    println!("Mitarbeiterin: {}", mitarbeiter.name);

    // Das Gehalt kann nur über die Getter-Methode gelesen werden
    println!("Gehalt: {} EUR", mitarbeiter.gehalt_anzeigen());
    
    // mitarbeiter.gehalt = 5000; // ⚠️ Würde Compilerfehler erzeugen!
}
```

---

## Projekt 4: Einfache Benutzerauthentifizierung

```rust
// 📦 Modul für die Sicherheits-Hilfsfunktionen
pub mod sicherheit {
    // 🛡️ Sichtbarkeit: pub(crate) macht die Funktion im gesamten Crate sichtbar,
    // aber verbirgt sie nach außen (falls dieses Projekt eine Bibliothek wäre)
    pub(crate) fn simuliere_hash(passwort: &str) -> String {
        format!("hash_{}_secure", passwort)
    }
}

// 📦 Modul für die Benutzerdatenbank
pub mod benutzer_db {
    use std::collections::HashMap;
    // 🔍 Pfad: Importieren aus dem übergeordneten Crate-Pfad
    use crate::sicherheit::simuliere_hash;

    pub struct Datenbank {
        // 🛡️ Sichtbarkeit: Private HashMap mit Benutzern und Passwort-Hashes
        daten: HashMap<String, String>,
    }

    impl Datenbank {
        pub fn neu() -> Self {
            Datenbank {
                daten: HashMap::new(),
            }
        }

        // 🛡️ Sichtbarkeit: Öffentliche Funktion zum Registrieren
        pub fn registrieren(&mut self, name: &str, passwort: &str) {
            let hash = simuliere_hash(passwort);
            self.daten.insert(String::from(name), hash);
        }

        // 🛡️ Sichtbarkeit: Öffentliche Funktion zum Prüfen der Anmeldung
        pub fn anmelden(&self, name: &str, passwort: &str) -> bool {
            if let Some(gespeicherter_hash) = self.daten.get(name) {
                let eingegebener_hash = simuliere_hash(passwort);
                gespeicherter_hash == &eingegebener_hash
            } else {
                false
            }
        }
    }
}

fn main() {
    let mut db = benutzer_db::Datenbank::neu();
    db.registrieren("Bob", "super_sicher123");

    if db.anmelden("Bob", "super_sicher123") {
        println!("Login erfolgreich für Bob!");
    } else {
        println!("Login fehlgeschlagen.");
    }
}
```

---

## Projekt 5: Bibliothek-Verwaltungssystem

```rust
// 📦 Modul für die Bibliothek
pub mod bibliothek {
    // 🏷️ Enum für den Buchstatus
    #[derive(Debug, Clone, Copy, PartialEq)]
    pub enum Status {
        Verfuegbar,
        Ausgeliehen,
    }

    // 📦 Struct für ein Buch
    pub struct Buch {
        // 🛡️ Sichtbarkeit: Titel und Autor sind öffentlich
        pub titel: String,
        pub autor: String,
        // 🛡️ Sichtbarkeit: Der Status ist privat und kann nur über Methoden geändert werden
        status: Status,
    }

    impl Buch {
        pub fn neu(titel: &str, autor: &str) -> Self {
            Buch {
                titel: String::from(titel),
                autor: String::from(autor),
                status: Status::Verfuegbar,
            }
        }

        // Getter für den Status
        pub fn status(&self) -> Status {
            self.status
        }

        // Methode zum Ausleihen
        pub fn ausleihen(&mut self) -> Result<(), String> {
            if self.status == Status::Verfuegbar {
                self.status = Status::Ausgeliehen;
                Ok(())
            } else {
                Err(String::from("Buch ist bereits ausgeliehen!"))
            }
        }
    }
}

fn main() {
    use bibliothek::Buch; // 🔍 Pfad: Importieren des Structs

    let mut mein_buch = Buch::neu("Der alte Mann und das Meer", "Ernest Hemingway");

    println!("Status vor Ausleihe: {:?}", mein_buch.status());

    // 🧠 Kapselung: Wir ändern den Status über die Methode ausleihen()
    match mein_buch.ausleihen() {
        Ok(_) => println!("Erfolgreich ausgeliehen!"),
        Err(e) => println!("Fehler: {}", e),
    }

    // Erneuter Versuch sollte fehlschlagen
    if let Err(e) = mein_buch.ausleihen() {
        println!("Kapselung funktioniert! Fehler: {}", e);
    }
}
```

---

## Projekt 6: Online-Shop Warenkorb

```rust
// 📦 Hauptmodul
pub mod shop {
    // 📦 Untermodul für Artikel
    pub mod artikel {
        pub struct Produkt {
            pub name: String,
            // 🛡️ Sichtbarkeit: Preis ist privat, um Rundungen/Berechnungen zu kontrollieren
            preis: f64,
        }

        impl Produkt {
            pub fn neu(name: &str, preis: f64) -> Self {
                Produkt {
                    name: String::from(name),
                    preis,
                }
            }

            // Getter für den Preis
            pub fn preis(&self) -> f64 {
                self.preis
            }
        }
    }

    // 📦 Untermodul für den Warenkorb
    pub mod warenkorb {
        // 🔍 Pfad: Wir importieren den Typ Produkt aus dem Nachbarmodul
        use super::artikel::Produkt;

        pub struct Cart {
            // 🛡️ Sichtbarkeit: Die Liste der Produkte ist privat
            elemente: Vec<Produkt>,
        }

        impl Cart {
            pub fn neu() -> Self {
                Cart { elemente: Vec::new() }
            }

            pub fn hinzufuegen(&mut self, produkt: Produkt) {
                self.elemente.push(produkt);
            }

            // Methode zur Berechnung der Gesamtsumme
            pub fn gesamtsumme(&self) -> f64 {
                let mut summe = 0.0;
                for p in &self.elemente {
                    // 🔍 Pfad: Aufruf des Getters im Nachbarmodul
                    summe += p.preis();
                }
                summe
            }
        }
    }
}

fn main() {
    // 🔍 Pfad: Importieren für einfachere Nutzung
    use shop::artikel::Produkt;
    use shop::warenkorb::Cart;

    let p1 = Produkt::neu("Tastatur", 49.99);
    let p2 = Produkt::neu("Maus", 29.99);

    let mut cart = Cart::neu();
    cart.hinzufuegen(p1);
    cart.hinzufuegen(p2);

    println!("Gesamtsumme im Warenkorb: {} EUR", cart.gesamtsumme());
}
```

---

## Projekt 7: Sensor-Netzwerk mit Fehlerbehandlung

```rust
// 📦 Modul für die Hardware-Simulation
pub mod hardware {
    pub struct Sensor {
        pub id: u32,
    }

    impl Sensor {
        // Simuliert das Auslesen eines Messwertes
        pub fn lese_wert(&self) -> Option<f64> {
            // 🧠 Simulation: ID 99 gibt einen Fehler (None) zurück
            if self.id == 99 {
                None
            } else {
                Some(22.5 + (self.id as f64 * 0.5))
            }
        }
    }
}

// 📦 Modul für die Datenverarbeitung
pub mod verarbeitung {
    // 🔍 Pfad: Importieren aus dem Nachbarmodul auf Crate-Ebene
    use crate::hardware::Sensor;

    // 🛡️ Sichtbarkeit: Öffentliche Funktion zur Auswertung einer Sensorliste
    pub fn berechne_durchschnitt(sensoren: &Vec<Sensor>) -> Result<f64, String> {
        let mut summe = 0.0;
        let mut gueltige_werte = 0;

        for s in sensoren {
            // 🧠 Option-Behandlung mit if let
            if let Some(wert) = s.lese_wert() {
                summe += wert;
                gueltige_werte += 1;
            }
        }

        if gueltige_werte == 0 {
            Err(String::from("Keine gültigen Messwerte empfangen!"))
        } else {
            Ok(summe / gueltige_werte as f64)
        }
    }
}

fn main() {
    use hardware::Sensor;

    let sensoren = vec![
        Sensor { id: 1 },
        Sensor { id: 2 },
        Sensor { id: 99 }, // Dieser gibt None zurück
    ];

    match verarbeitung::berechne_durchschnitt(&sensoren) {
        Ok(avg) => println!("Durchschnittliche Temperatur: {:.2}°C", avg),
        Err(e) => println!("Kritischer Fehler: {}", e),
    }
}
```

---

## Projekt 8: Steuerrechner für Produkte

```rust
// 📦 Modul für Steuerberechnungen
pub mod finanzen {
    // 🛡️ Sichtbarkeit: Das Enum ist öffentlich zugänglich
    #[derive(Debug)]
    pub enum ProduktKategorie {
        Lebensmittel,
        Elektronik,
        Buecher,
    }

    // 🛡️ Sichtbarkeit: Diese Hilfsfunktion ist privat! Niemand außerhalb dieses Moduls kann sie aufrufen.
    // 🧠 Kapselung: Die konkreten Steuersätze sind interne Geschäftslogik.
    fn hole_steuersatz(kategorie: &ProduktKategorie) -> f64 {
        match kategorie {
            ProduktKategorie::Lebensmittel => 0.07, // 7%
            ProduktKategorie::Elektronik => 0.19,   // 19%
            ProduktKategorie::Buecher => 0.07,      // 7%
        }
    }

    // 🛡️ Sichtbarkeit: Diese Funktion ist öffentlich
    pub fn berechne_bruttopreis(nettopreis: f64, kategorie: ProduktKategorie) -> f64 {
        let steuersatz = hole_steuersatz(&kategorie);
        nettopreis * (1.0 + steuersatz)
    }
}

fn main() {
    use finanzen::{berechne_bruttopreis, ProduktKategorie};

    let nettopreis_buch = 14.99;
    let bruttopreis = berechne_bruttopreis(nettopreis_buch, ProduktKategorie::Buecher);
    println!("Bruttopreis des Buches: {:.2} EUR", bruttopreis);

    let nettopreis_tv = 499.00;
    let bruttopreis_tv = berechne_bruttopreis(nettopreis_tv, ProduktKategorie::Elektronik);
    println!("Bruttopreis des Fernsehers: {:.2} EUR", bruttopreis_tv);
}
```

---

## Projekt 9: Smart-Home Lichtsteuerung

```rust
// 📦 Modul für die physischen Geräte
pub mod geraete {
    #[derive(Debug, PartialEq, Clone)]
    pub enum LichtZustand {
        An,
        Aus,
    }

    pub struct Lampe {
        pub name: String,
        // 🛡️ Sichtbarkeit: Der Zustand ist privat. Änderungen nur über kontrollierte Methoden.
        zustand: LichtZustand,
    }

    impl Lampe {
        pub fn neu(name: &str) -> Self {
            Lampe {
                name: String::from(name),
                zustand: LichtZustand::Aus,
            }
        }

        // Getter für den Zustand
        pub fn zustand(&self) -> &LichtZustand {
            &self.zustand
        }

        // 🧠 Kapselung: Kontrolliertes Umschalten
        pub fn umschalten(&mut self) {
            self.zustand = match self.zustand {
                LichtZustand::An => LichtZustand::Aus,
                LichtZustand::Aus => LichtZustand::An,
            };
        }
    }
}

// 📦 Modul für die Zentrale
pub mod steuerung {
    // 🔍 Pfad: Import aus dem Nachbarmodul
    use crate::geraete::Lampe;

    pub struct SmartHomeZentrale {
        pub lampen: Vec<Lampe>,
    }

    impl SmartHomeZentrale {
        pub fn neu() -> Self {
            SmartHomeZentrale { lampen: Vec::new() }
        }

        pub fn lampe_hinzufuegen(&mut self, lampe: Lampe) {
            self.lampen.push(lampe);
        }

        // Alle Lampen ausschalten
        pub fn alle_ausschalten(&mut self) {
            for l in &mut self.lampen {
                if *l.zustand() == crate::geraete::LichtZustand::An {
                    l.umschalten();
                }
            }
        }
    }
}

fn main() {
    use geraete::Lampe;
    use steuerung::SmartHomeZentrale;

    let mut l1 = Lampe::neu("Wohnzimmer");
    l1.umschalten(); // Einschalten

    let l2 = Lampe::neu("Küche"); // Bleibt aus

    let mut zentrale = SmartHomeZentrale::neu();
    zentrale.lampe_hinzufuegen(l1);
    zentrale.lampe_hinzufuegen(l2);

    println!("Lampe 1 vor Zentralbefehl: {:?}", zentrale.lampen[0].zustand());

    // Zentralbefehl
    zentrale.alle_ausschalten();

    println!("Lampe 1 nach Zentralbefehl: {:?}", zentrale.lampen[0].zustand());
}
```

---

## Projekt 10: Log-System

```rust
// 📦 Modul für das Logging
pub mod logger {
    // 🛡️ Sichtbarkeit: Das Enum ist crate-weit sichtbar.
    #[derive(Debug)]
    pub(crate) enum LogLevel {
        Info,
        Warnung,
        Fehler,
    }

    // 📦 Struct für den Logger
    pub struct Logger {
        praefix: String,
    }

    impl Logger {
        pub fn neu(praefix: &str) -> Self {
            Logger {
                praefix: String::from(praefix),
            }
        }

        // 🛡️ Sichtbarkeit: Eine pub(crate)-Methode, die nur im eigenen Crate genutzt werden kann.
        pub(crate) fn logge(&self, level: LogLevel, nachricht: &str) {
            match level {
                LogLevel::Info => println!("[INFO] [{}]: {}", self.praefix, nachricht),
                LogLevel::Warnung => println!("[WARN] [{}]: {}", self.praefix, nachricht),
                LogLevel::Fehler => println!("[ERR ] [{}]: {}", self.praefix, nachricht),
            }
        }

        // 🛡️ Sichtbarkeit: Öffentliche Funktion für Standard-Logs
        pub fn info(&self, nachricht: &str) {
            // Interner Aufruf der pub(crate) Methode
            self.logge(LogLevel::Info, nachricht);
        }
    }
}

fn main() {
    let mein_logger = logger::Logger::neu("MainApp");

    // Verwendung der öffentlichen Methode
    mein_logger.info("Programm gestartet.");

    // Da wir uns im selben Crate befinden, können wir auch die pub(crate) Elemente nutzen:
    use logger::LogLevel;
    mein_logger.logge(LogLevel::Fehler, "Ein simulierter Fehler ist aufgetreten!");
}
```

---

## Projekt 11: Bankkonto mit Transaktionshistorie

```rust
// 📦 Modul für die Bank
pub mod bank {
    pub struct Konto {
        inhaber: String,
        // 🛡️ Sichtbarkeit: Das Guthaben ist privat, um unerlaubte Manipulationen zu verhindern.
        guthaben: i32,
        // 🛡️ Sichtbarkeit: Die Historie ist privat.
        historie: Vec<String>,
    }

    impl Konto {
        pub fn neu(inhaber: &str, startguthaben: i32) -> Self {
            Konto {
                inhaber: String::from(inhaber),
                guthaben: startguthaben,
                historie: vec![format!("Konto erstellt mit {} EUR", startguthaben)],
            }
        }

        // Getter für den Inhaber
        pub fn inhaber(&self) -> &str {
            &self.inhaber
        }

        // Getter für das Guthaben
        pub fn guthaben(&self) -> i32 {
            self.guthaben
        }

        // 🛡️ Sichtbarkeit: Öffentliche Methode zum Einzahlen
        pub fn einzahlen(&mut self, betrag: u32) {
            self.guthaben += betrag as i32;
            self.historie.push(format!("Einzahlung: +{} EUR", betrag));
        }

        // 🛡️ Sichtbarkeit: Öffentliche Methode zum Abheben mit Fehlerprüfung
        // 🧠 Kapselung: Es ist unmöglich, das Konto ins Negative zu bringen, wenn das nicht erlaubt ist.
        pub fn abheben(&mut self, betrag: u32) -> Result<(), String> {
            if self.guthaben >= betrag as i32 {
                self.guthaben -= betrag as i32;
                self.historie.push(format!("Auszahlung: -{} EUR", betrag));
                Ok(())
            } else {
                Err(String::from("Ungenügende Deckung!"))
            }
        }

        // 🛡️ Sichtbarkeit: Öffentliche Methode zum Einsehen der Historie (gibt Referenz zurück)
        pub fn zeige_historie(&self) -> &Vec<String> {
            &self.historie
        }
    }
}

fn main() {
    let mut mein_konto = bank::Konto::neu("Thorsten", 100);

    mein_konto.einzahlen(50);
    
    match mein_konto.abheben(200) {
        Ok(_) => println!("Abhebung erfolgreich!"),
        Err(e) => println!("Fehler bei Abhebung: {}", e), // Sollte fehlschlagen
    }

    println!("Inhaber: {}", mein_konto.inhaber());
    println!("Aktuelles Guthaben: {} EUR", mein_konto.guthaben());

    println!("Transaktionen:");
    for t in mein_konto.zeige_historie() {
        println!(" - {}", t);
    }
}
```

---

## Projekt 12: Geometrie-Rechner

```rust
// 📦 Hauptmodul
pub mod geometrie {
    // 📦 Untermodul für den Kreis
    pub mod kreis {
        // 🔍 Pfad: Wir importieren PI aus der Standardbibliothek
        use std::f64::consts::PI;

        pub struct Circle {
            pub radius: f64,
        }

        impl Circle {
            pub fn flaeche(&self) -> f64 {
                PI * self.radius * self.radius
            }
        }
    }

    // 📦 Untermodul für das Rechteck
    pub mod rechteck {
        pub struct Rectangle {
            pub breite: f64,
            pub hoehe: f64,
        }

        impl Rectangle {
            pub fn flaeche(&self) -> f64 {
                self.breite * self.hoehe
            }
        }
    }
}

fn main() {
    use geometrie::kreis::Circle;
    use geometrie::rechteck::Rectangle;

    let k = Circle { radius: 5.0 };
    println!("Fläche des Kreises: {:.2}", k.flaeche());

    let r = Rectangle { breite: 4.0, hoehe: 6.0 };
    println!("Fläche des Rechtecks: {:.2}", r.flaeche());
}
```

---

## Projekt 13: Task-Manager

```rust
// 📦 Modul für die Aufgabenverwaltung
pub mod tasks {
    pub struct Task {
        // 🛡️ Sichtbarkeit: ID ist öffentlich lesbar, aber kann nicht direkt geändert werden
        pub id: u32,
        pub titel: String,
    }

    pub struct TaskList {
        liste: Vec<Task>,
        // 🛡️ Sichtbarkeit: Dieser Zähler ist privat. Er garantiert, dass jede ID eindeutig ist.
        // 🧠 Kapselung: Verhindert, dass externe Aufrufer den Zähler manipulieren.
        naechste_id: u32,
    }

    impl TaskList {
        pub fn neu() -> Self {
            TaskList {
                liste: Vec::new(),
                naechste_id: 1,
            }
        }

        // Methode zum Hinzufügen einer Aufgabe
        pub fn hinzufuegen(&mut self, titel: &str) {
            let task = Task {
                id: self.naechste_id,
                titel: String::from(titel),
            };
            self.liste.push(task);
            self.naechste_id += 1; // Zähler erhöhen
        }

        // Methode zum Suchen einer Aufgabe anhand der ID
        pub fn finde(&self, id: u32) -> Option<&Task> {
            for t in &self.liste {
                if t.id == id {
                    return Some(t);
                }
            }
            None
        }
    }
}

fn main() {
    let mut manager = tasks::TaskList::neu();
    manager.hinzufuegen("Einkaufen");
    manager.hinzufuegen("Rust lernen");

    if let Some(t) = manager.finde(2) {
        println!("Task mit ID 2 gefunden: {}", t.titel);
    } else {
        println!("Task nicht gefunden.");
    }
}
```

---

## Projekt 14: Kaffeemaschinen-Simulator

```rust
// 📦 Modul für die Kaffeemaschine
pub mod maschine {
    #[derive(Debug)]
    pub enum KaffeeTyp {
        Espresso,
        Kaffee,
    }

    pub struct Kaffeemaschine {
        // 🛡️ Sichtbarkeit: Wasser (in ml) und Bohnen (in g) sind privat.
        wasser: u32,
        bohnen: u32,
    }

    impl Kaffeemaschine {
        pub fn neu(wasser: u32, bohnen: u32) -> Self {
            Kaffeemaschine { wasser, bohnen }
        }

        // 🛡️ Sichtbarkeit: Öffentliche Methode zum Kaffeekochen
        pub fn bruehen(&mut self, typ: KaffeeTyp) -> Result<String, String> {
            // 🔍 Pfad: Benötigte Ressourcen je nach Typ ermitteln
            let (wasser_bedarf, bohnen_bedarf) = match typ {
                KaffeeTyp::Espresso => (50, 10),
                KaffeeTyp::Kaffee => (150, 15),
            };

            if self.wasser < wasser_bedarf {
                return Err(String::from("Zu wenig Wasser!"));
            }
            if self.bohnen < bohnen_bedarf {
                return Err(String::from("Zu wenig Kaffeebohnen!"));
            }

            // Ressourcen abziehen
            self.wasser -= wasser_bedarf;
            self.bohnen -= bohnen_bedarf;

            Ok(format!("Dein {:?} ist fertig!", typ))
        }

        // Ressourcen auffüllen
        pub fn auffuellen(&mut self, wasser: u32, bohnen: u32) {
            self.wasser += wasser;
            self.bohnen += bohnen;
        }
    }
}

fn main() {
    use maschine::{Kaffeemaschine, KaffeeTyp};

    let mut meine_maschine = Kaffeemaschine::neu(100, 20);

    // Erster Espresso klappt
    match meine_maschine.bruehen(KaffeeTyp::Espresso) {
        Ok(m) => println!("{}", m),
        Err(e) => println!("Fehler: {}", e),
    }

    // Zweiter Espresso schlägt fehl (Wasser reicht nicht mehr)
    if let Err(e) = meine_maschine.bruehen(KaffeeTyp::Espresso) {
        println!("Kapselung meldet: {}", e);
    }
}
```

---

## Projekt 15: Schulnoten-Manager

```rust
// 📦 Modul für die Schule
pub mod schule {
    pub struct Schueler {
        pub name: String,
        // 🛡️ Sichtbarkeit: Die Notenliste ist privat. Sie darf nicht direkt manipuliert werden.
        noten: Vec<u32>,
    }

    impl Schueler {
        pub fn neu(name: &str) -> Self {
            Schueler {
                name: String::from(name),
                noten: Vec::new(),
            }
        }

        // 🛡️ Sichtbarkeit: Öffentliche Methode zum Hinzufügen einer Note mit Validierung.
        // 🧠 Kapselung: Verhindert, dass ungültige Noten (z.B. 0 oder 9) eingetragen werden.
        pub fn note_hinzufuegen(&mut self, note: u32) -> Result<(), String> {
            if note >= 1 && note <= 6 {
                self.noten.push(note);
                Ok(())
            } else {
                Err(format!("Ungültige Note: {}. Nur 1 bis 6 erlaubt.", note))
            }
        }

        // Gibt den Notendurchschnitt zurück
        pub fn durchschnitt(&self) -> Option<f64> {
            if self.noten.is_empty() {
                return None;
            }
            let summe: u32 = self.noten.iter().sum();
            Some(summe as f64 / self.noten.len() as f64)
        }
    }
}

fn main() {
    let mut s = schule::Schueler::neu("Ben");

    s.note_hinzufuegen(2).unwrap();
    s.note_hinzufuegen(3).unwrap();

    // Versuch, eine ungültige Note hinzuzufügen
    match s.note_hinzufuegen(7) {
        Ok(_) => println!("Hinzugefügt"),
        Err(e) => println!("Fehler abgefangen: {}", e),
    }

    if let Some(schnitt) = s.durchschnitt() {
        println!("Durchschnitt von {}: {:.2}", s.name, schnitt);
    }
}
```

---

## Projekt 16: Spiel-Inventar

```rust
// 📦 Hauptmodul
pub mod spiel {
    // 📦 Untermodul
    pub mod inventar {
        // 🏷️ Enum für Gegenstände
        #[derive(Debug, Clone)]
        pub enum Item {
            Schwert,
            Heiltrank,
            Goldmuenze,
        }

        pub struct Rucksack {
            // 🛡️ Sichtbarkeit: Das Inventar ist privat
            inhalt: Vec<Item>,
            // 🛡️ Sichtbarkeit: Maximale Anzahl an Elementen ist privat
            kapazitaet: usize,
        }

        impl Rucksack {
            pub fn neu(kapazitaet: usize) -> Self {
                Rucksack {
                    inhalt: Vec::new(),
                    kapazitaet,
                }
            }

            // Gegenstand hinzufügen mit Prüfung der Kapazität
            pub fn einpacken(&mut self, item: Item) -> Result<(), String> {
                if self.inhalt.len() >= self.kapazitaet {
                    Err(String::from("Rucksack ist voll!"))
                } else {
                    self.inhalt.push(item);
                    Ok(())
                }
            }

            // Inhalt anzeigen
            pub fn inhalt(&self) -> &Vec<Item> {
                &self.inhalt
            }
        }
    }
}

fn main() {
    use spiel::inventar::{Item, Rucksack};

    let mut rucksack = Rucksack::neu(2);
    rucksack.einpacken(Item::Schwert).unwrap();
    rucksack.einpacken(Item::Heiltrank).unwrap();

    // Rucksack ist voll, das sollte fehlschlagen
    if let Err(e) = rucksack.einpacken(Item::Goldmuenze) {
        println!("Fehler abgefangen: {}", e);
    }

    println!("Inhalt: {:?}", rucksack.inhalt());
}
```

---

## Projekt 17: Wetterstation

```rust
// 📦 Hauptmodul
pub mod wetter {
    // 📦 Untermodul für die Messwerte
    pub mod messung {
        pub struct Messwert {
            pub temperatur: f64,
        }
    }

    // 📦 Untermodul für die Statistik
    pub mod statistik {
        // 🔍 Pfad: Wir navigieren mit `super::` eine Ebene nach oben und gehen in das Nachbarmodul
        use super::messung::Messwert;

        pub fn ermittle_maximum(daten: &Vec<Messwert>) -> Option<f64> {
            if daten.is_empty() {
                return None;
            }
            let mut max = daten[0].temperatur;
            for d in daten {
                if d.temperatur > max {
                    max = d.temperatur;
                }
            }
            Some(max)
        }
    }
}

fn main() {
    use wetter::messung::Messwert;

    let daten = vec![
        Messwert { temperatur: 18.5 },
        Messwert { temperatur: 22.1 },
        Messwert { temperatur: 19.8 },
    ];

    if let Some(max) = wetter::statistik::ermittle_maximum(&daten) {
        println!("Maximale Temperatur: {}°C", max);
    }
}
```

---

## Projekt 18: Passwort-Generator (einfach)

```rust
// 📦 Modul für die Passwort-Generierung
pub mod generator {
    // 🛡️ Sichtbarkeit: Dieser Zeichensatz ist privat.
    const ZEICHEN: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    // Ein einfacher linearer Kongruenzgenerator (LGC) für deterministischen Pseudozufall ohne externe Crates.
    // 🛡️ Sichtbarkeit: Privat (wird nur intern benötigt)
    struct SimulierterZufall {
        zustand: u32,
    }

    impl SimulierterZufall {
        fn neu(seed: u32) -> Self {
            SimulierterZufall { zustand: seed }
        }

        fn naechste(&mut self, max: usize) -> usize {
            self.zustand = self.zustand.wrapping_mul(1103515245).wrapping_add(12345);
            (self.zustand as usize) % max
        }
    }

    // 🛡️ Sichtbarkeit: Öffentliche Funktion
    pub fn generiere(laenge: usize, seed: u32) -> String {
        let mut rng = SimulierterZufall::neu(seed);
        let mut passwort = String::new();

        for _ in 0..laenge {
            let index = rng.naechste(ZEICHEN.len());
            passwort.push(ZEICHEN[index] as char);
        }

        passwort
    }
}

fn main() {
    // Generiert ein Passwort der Länge 12 mit einem Seed von 42
    let passwort = generator::generiere(12, 42);
    println!("Generiertes Passwort: {}", passwort);
}
```

---

## Projekt 19: Ticket-Buchungssystem

```rust
// 📦 Modul für die Buchungen
pub mod buchung {
    #[derive(Debug, PartialEq, Clone, Copy)]
    pub enum Kategorie {
        Standard,
        Premium,
    }

    pub struct Ticket {
        pub sitznummer: u32,
        pub kategorie: Kategorie,
        // 🛡️ Sichtbarkeit: Der Buchungsstatus ist privat.
        ist_gebucht: bool,
    }

    impl Ticket {
        pub fn neu(sitznummer: u32, kategorie: Kategorie) -> Self {
            Ticket {
                sitznummer,
                kategorie,
                ist_gebucht: false,
            }
        }

        // Getter
        pub fn ist_gebucht(&self) -> bool {
            self.ist_gebucht
        }

        // Methode zum Buchen
        pub fn buche(&mut self) -> Result<(), String> {
            if self.ist_gebucht {
                Err(format!("Sitz {} ist bereits gebucht!", self.sitznummer))
            } else {
                self.ist_gebucht = true;
                Ok(())
            }
        }
    }
}

fn main() {
    use buchung::{Kategorie, Ticket};

    let mut t1 = Ticket::neu(12, Kategorie::Premium);

    t1.buche().unwrap();

    match t1.buche() {
        Ok(_) => println!("Erneut gebucht!"),
        Err(e) => println!("Fehler beim Buchen: {}", e), // Sollte fehlschlagen
    }
}
```

---

## Projekt 20: Auto-Dashboard

```rust
// 📦 Modul für das Auto
pub mod auto {
    pub struct Dashboard {
        // 🛡️ Sichtbarkeit: Der Motorzustand und der Tankinhalt sind privat.
        motor_an: bool,
        tank: u32, // in Litern
    }

    impl Dashboard {
        pub fn neu(start_tank: u32) -> Self {
            Dashboard {
                motor_an: false,
                tank: start_tank,
            }
        }

        // Motor starten
        pub fn motor_starten(&mut self) -> Result<(), String> {
            if self.tank == 0 {
                Err(String::from("Kein Benzin im Tank!"))
            } else {
                self.motor_an = true;
                Ok(())
            }
        }

        // Fahren verbraucht Benzin
        pub fn fahren(&mut self, strecke: u32) {
            if self.motor_an {
                let verbrauch = strecke / 10; // 1 Liter pro 10km
                if self.tank >= verbrauch {
                    self.tank -= verbrauch;
                    println!("Erfolgreich {} km gefahren. Tank: {}L", strecke, self.tank);
                } else {
                    self.tank = 0;
                    self.motor_an = false;
                    println!("Liegengeblieben! Tank leer.");
                }
            } else {
                println!("Der Motor läuft nicht!");
            }
        }
    }
}

fn main() {
    let mut mein_auto = auto::Dashboard::neu(15);

    mein_auto.motor_starten().unwrap();
    mein_auto.fahren(100); // Verbraucht 10L
    mein_auto.fahren(100); // Bleibt auf halber Strecke liegen
}
```

---

## Projekt 21: Kontaktbuch

```rust
// 📦 Modul für Kontakte
pub mod kontakte {
    use std::collections::HashMap;

    pub struct Adressbuch {
        // 🛡️ Sichtbarkeit: Die Map mit den Kontakten ist privat
        daten: HashMap<String, String>,
    }

    // 🛡️ Sichtbarkeit: Diese Hilfsfunktion ist privat.
    // 🧠 Kapselung: Telefonnummer-Validierung wird intern durchgeführt.
    fn validiere_nummer(nummer: &str) -> bool {
        // Eine Nummer muss aus mindestens 3 Ziffern bestehen und nur Ziffern enthalten
        nummer.chars().all(|c| c.is_numeric()) && nummer.len() >= 3
    }

    impl Adressbuch {
        pub fn neu() -> Self {
            Adressbuch {
                daten: HashMap::new(),
            }
        }

        // Öffentliche Methode zum Hinzufügen
        pub fn kontakt_hinzufuegen(&mut self, name: &str, nummer: &str) -> Result<(), String> {
            if validiere_nummer(nummer) {
                self.daten.insert(String::from(name), String::from(nummer));
                Ok(())
            } else {
                Err(String::from("Ungültiges Telefonnummern-Format!"))
            }
        }

        // Nummer holen
        pub fn hole_nummer(&self, name: &str) -> Option<&String> {
            self.daten.get(name)
        }
    }
}

fn main() {
    let mut buch = kontakte::Adressbuch::neu();

    match buch.kontakt_hinzufuegen("Alice", "01728392") {
        Ok(_) => println!("Alice hinzugefügt."),
        Err(e) => println!("Fehler: {}", e),
    }

    match buch.kontakt_hinzufuegen("Bob", "12a") {
        Ok(_) => println!("Bob hinzugefügt."),
        Err(e) => println!("Fehler bei Bob: {}", e), // Sollte scheitern wegen 'a'
    }
}
```

---

## Projekt 22: Rabatt-System für Kunden

```rust
// 📦 Modul für Rabatte
pub mod rabatt_system {
    pub enum Status {
        Standard,
        Bronze,
        Silber,
        Gold,
    }

    // 🛡️ Sichtbarkeit: Berechne den Rabattfaktor intern und privat.
    fn hole_rabatt_prozentsatz(status: &Status) -> f64 {
        match status {
            Status::Standard => 0.0,
            Status::Bronze => 0.05,
            Status::Silber => 0.10,
            Status::Gold => 0.20,
        }
    }

    // 🛡️ Sichtbarkeit: Öffentlich
    pub fn preis_nach_rabatt(original_preis: f64, status: Status) -> f64 {
        let rabatt = hole_rabatt_prozentsatz(&status);
        original_preis * (1.0 - rabatt)
    }
}

fn main() {
    use rabatt_system::{preis_nach_rabatt, Status};

    let original_preis = 100.0;
    let final_preis = preis_nach_rabatt(original_preis, Status::Gold);

    println!("Gold-Kunde zahlt: {} EUR (Original: {} EUR)", final_preis, original_preis);
}
```

---

## Projekt 23: Ampelsteuerung

```rust
// 📦 Modul für die Ampel
pub mod ampel {
    #[derive(Debug, PartialEq, Clone)]
    pub enum AmpelPhase {
        Rot,
        RotGelb,
        Gruen,
        Gelb,
    }

    pub struct AmpelSteuerung {
        // 🛡️ Sichtbarkeit: Die aktuelle Phase ist privat
        phase: AmpelPhase,
    }

    impl AmpelSteuerung {
        pub fn neu() -> Self {
            AmpelSteuerung {
                phase: AmpelPhase::Rot,
            }
        }

        // Getter
        pub fn phase(&self) -> &AmpelPhase {
            &self.phase
        }

        // 🛡️ Sichtbarkeit: Öffentliche Methode
        // 🧠 Kapselung: Es ist unmöglich, von Rot direkt auf Grün zu schalten,
        // da die Ampel intern die korrekte Reihenfolge steuert.
        pub fn schalten(&mut self) {
            self.phase = match self.phase {
                AmpelPhase::Rot => AmpelPhase::RotGelb,
                AmpelPhase::RotGelb => AmpelPhase::Gruen,
                AmpelPhase::Gruen => AmpelPhase::Gelb,
                AmpelPhase::Gelb => AmpelPhase::Rot,
            };
        }
    }
}

fn main() {
    let mut ampel = ampel::AmpelSteuerung::neu();

    println!("Startphase: {:?}", ampel.phase());

    ampel.schalten();
    println!("Nächste Phase: {:?}", ampel.phase()); // RotGelb

    ampel.schalten();
    println!("Nächste Phase: {:?}", ampel.phase()); // Gruen
}
```

---

## Projekt 24: Musik-Playlist

```rust
// 📦 Modul für die Musik-Wiedergabe
pub mod playlist {
    #[derive(Debug, Clone)]
    pub struct Song {
        pub titel: String,
        pub interpret: String,
    }

    pub struct Player {
        songs: Vec<Song>,
        // 🛡️ Sichtbarkeit: Der Zeiger auf das aktuelle Lied ist privat.
        aktuelle_position: usize,
    }

    impl Player {
        pub fn neu() -> Self {
            Player {
                songs: Vec::new(),
                aktuelle_position: 0,
            }
        }

        pub fn song_hinzufuegen(&mut self, song: Song) {
            self.songs.push(song);
        }

        // 🛡️ Sichtbarkeit: Öffentliche Methode zum Abspielen des nächsten Songs
        pub fn naechster_song(&mut self) -> Option<&Song> {
            if self.songs.is_empty() {
                return None;
            }
            let song = &self.songs[self.aktuelle_position];
            self.aktuelle_position = (self.aktuelle_position + 1) % self.songs.len();
            Some(song)
        }
    }
}

fn main() {
    use playlist::{Player, Song};

    let mut player = Player::neu();
    player.song_hinzufuegen(Song { titel: String::from("Yesterday"), interpret: String::from("The Beatles") });
    player.song_hinzufuegen(Song { titel: String::from("Let it be"), interpret: String::from("The Beatles") });

    println!("Song 1: {:?}", player.naechster_song().unwrap());
    println!("Song 2: {:?}", player.naechster_song().unwrap());
    // Fängt wieder von vorne an
    println!("Song 3 (Wiederholung): {:?}", player.naechster_song().unwrap());
}
```

---

## Projekt 25: Einfacher Taschenrechner mit Modul-Struktur

```rust
// 📦 Hauptmodul für Berechnungen
pub mod rechner {
    // 📦 Untermodul für Division
    pub mod division {
        // 🛡️ Sichtbarkeit: Öffentliche Funktion mit Fehlerprüfung
        pub fn dividiere(a: f64, b: f64) -> Result<f64, String> {
            if b == 0.0 {
                Err(String::from("Division durch Null ist nicht erlaubt!"))
            } else {
                Ok(a / b)
            }
        }
    }

    // 📦 Untermodul für Multiplikation
    pub mod multiplikation {
        pub fn multipliziere(a: f64, b: f64) -> f64 {
            a * b
        }
    }
}

fn main() {
    use rechner::division::dividiere;
    use rechner::multiplikation::multipliziere;

    let a = 10.0;
    let b = 0.0;

    match dividiere(a, b) {
        Ok(ergebnis) => println!("{} / {} = {}", a, b, ergebnis),
        Err(e) => println!("Fehler bei Division: {}", e),
    }

    println!("{} * 5 = {}", a, multipliziere(a, 5.0));
}
```

---

## 100 Projekte – Pfade & Importe (Teil 2: Projekte 26 bis 50)

In diesem zweiten Teil der Phase 4 vertiefen wir die **Modulnavigation und das Re-Exporting**. Der Fokus liegt auf der Strukturierung von Code durch Module (`mod`), dem Navigieren in Hierarchien (`use`, `super`, `self`, `crate`) sowie dem Vereinfachen von Schnittstellen durch Re-Exports (`pub use`).

Jedes Projekt baut auf den Grundlagen der vorherigen Phasen auf und integriert Collections (Vektoren, HashMaps), Fehlerbehandlung (Option, Result) und Objektmodellierung in eine saubere Modulstruktur.

---

## Phase 4: Pfade & Importe (Projekte 26 bis 50)

Die folgenden 25 Projekte zeigen vollständige, compilierbare Rust-Programme, die direkt in einer Datei ausgeführt werden können. Dazu nutzen wir inline deklarierte Module (`mod name { ... }`), was die Modulnavigation direkt in einer Datei veranschaulicht.

---

## Projekt 26: Hotel-Reservierungssystem

### Beschreibung
Ein System zur Verwaltung von Hotelzimmern. Es besteht aus dem Modul `hotel`, das intern die Submodule `zimmer` (für Datenstrukturen) und `reservierung` (für die Buchungslogik) besitzt.

### Modulhierarchie
```text
crate
└── hotel
    ├── zimmer (Status, Zimmer)
    └── reservierung (ReservierungsSystem)
```

### Code
```rust
mod hotel {
    pub mod zimmer {
        #[derive(Debug, PartialEq, Clone, Copy)]
        pub enum Status {
            Frei,
            Belegt,
        }

        pub struct Zimmer {
            pub nummer: u32,
            pub status: Status,
        }
    }

    pub mod reservierung {
        // 🔍 Navigation: Wir greifen über 'super' auf das Geschwistermodul 'zimmer' zu
        use super::zimmer::{Zimmer, Status};

        pub struct ReservierungsSystem {
            pub zimmerliste: Vec<Zimmer>,
        }

        impl ReservierungsSystem {
            pub fn buche_zimmer(&mut self, nummer: u32) -> Result<(), String> {
                for z in &mut self.zimmerliste {
                    if z.nummer == nummer {
                        if z.status == Status::Frei {
                            z.status = Status::Belegt;
                            return Ok(());
                        } else {
                            return Err(format!("Zimmer {} ist bereits belegt.", nummer));
                        }
                    }
                }
                Err(format!("Zimmer {} existiert nicht.", nummer))
            }
        }
    }

    // 🏷️ Re-Exporting: Vereinfacht die API für den Aufrufer
    pub use zimmer::Zimmer;
    pub use reservierung::ReservierungsSystem;
}

fn main() {
    // Dank Re-Exporting können wir die Typen direkt aus 'hotel' importieren
    use hotel::{Zimmer, ReservierungsSystem};
    use hotel::zimmer::Status; // Status wurde nicht re-exportiert, daher voller Pfad

    let mut system = ReservierungsSystem {
        zimmerliste: vec![
            Zimmer { nummer: 101, status: Status::Frei },
            Zimmer { nummer: 102, status: Status::Belegt },
        ],
    };

    match system.buche_zimmer(101) {
        Ok(_) => println!("Erfolgreich gebucht!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 27: Bibliotheks-Verwaltung

### Beschreibung
Verwaltung von Büchern in einer Bibliothek. Dieses Projekt zeigt die absolute Pfadnavigation mit `crate::` aus einem Submodul heraus auf eine Struktur im Elternmodul.

### Modulhierarchie
```text
crate
└── bibliothek
    ├── medien (Buch)
    └── ausleihe (Ausleiher)
```

### Code
```rust
mod bibliothek {
    pub mod medien {
        pub struct Buch {
            pub titel: String,
            pub ausgeliehen: bool,
        }
    }

    pub mod ausleihe {
        // 🔍 Navigation: Absoluter Pfad vom Crate-Root aus
        use crate::bibliothek::medien::Buch;

        pub struct Ausleiher {
            pub name: String,
            pub ausgeliehene_buecher: Vec<Buch>,
        }

        impl Ausleiher {
            pub fn neue_ausleihe(&mut self, mut buch: Buch) -> Result<(), String> {
                if buch.ausgeliehen {
                    Err(format!("Das Buch '{}' ist bereits ausgeliehen!", buch.titel))
                } else {
                    buch.ausgeliehen = true;
                    self.ausgeliehene_buecher.push(buch);
                    Ok(())
                }
            }
        }
    }
}

fn main() {
    use bibliothek::medien::Buch;
    use bibliothek::ausleihe::Ausleiher;

    let buch = Buch {
        titel: String::from("Rust für Anfänger"),
        ausgeliehen: false,
    };

    let mut user = Ausleiher {
        name: String::from("Thorsten"),
        ausgeliehene_buecher: Vec::new(),
    };

    if let Ok(_) = user.neue_ausleihe(buch) {
        println!("Buch erfolgreich für {} registriert.", user.name);
    }
}
```

---

## Projekt 28: E-Commerce Warenkorb

### Beschreibung
Warenkorb-System mit Produkten. Es wird demonstriert, wie `pub use` verwendet wird, um ein komplexes Submodul-System hinter einer flachen API-Schnittstelle zu verbergen.

### Modulhierarchie
```text
crate
└── shop
    ├── produkte (Produkt)
    └── warenkorb (Warenkorb)
```

### Code
```rust
mod shop {
    pub mod produkte {
        #[derive(Clone)]
        pub struct Produkt {
            pub name: String,
            pub preis: f64,
        }
    }

    pub mod warenkorb {
        // Relative Navigation zu Geschwistermodul
        use super::produkte::Produkt;

        pub struct Warenkorb {
            pub artikel: Vec<Produkt>,
        }

        impl Warenkorb {
            pub fn produkt_hinzufuegen(&mut self, produkt: Produkt) {
                self.artikel.push(produkt);
            }

            pub fn gesamtsumme(&self) -> f64 {
                self.artikel.iter().map(|p| p.preis).sum()
            }
        }
    }

    // 🏷️ Re-Exporting beider Modulebenen für eine saubere Client-Nutzung
    pub use produkte::Produkt;
    pub use warenkorb::Warenkorb;
}

fn main() {
    // Nutzung der vereinfachten API dank Re-Exporten
    use shop::{Produkt, Warenkorb};

    let mut cart = Warenkorb { artikel: Vec::new() };
    cart.produkt_hinzufuegen(Produkt {
        name: String::from("Rust-Tasse"),
        preis: 14.99,
    });

    println!("Gesamtsumme: {} EUR", cart.gesamtsumme());
}
```

---

## Projekt 29: Mitarbeiter-Datenbank

### Beschreibung
Eine Mitarbeiter-Datenbank, die eine `HashMap` zur Speicherung nutzt. Das Projekt kombiniert absolute Pfadnamen mit Modulstrukturen zur Verwaltung von Abteilungen.

### Modulhierarchie
```text
crate
└── firma
    ├── personal (Mitarbeiter)
    └── abteilung (Abteilung)
```

### Code
```rust
mod firma {
    pub mod personal {
        pub struct Mitarbeiter {
            pub id: u32,
            pub name: String,
        }
    }

    pub mod abteilung {
        use std::collections::HashMap;
        // 🔍 Absolute Pfadnavigation
        use crate::firma::personal::Mitarbeiter;

        pub struct Abteilung {
            pub name: String,
            pub mitarbeiter_register: HashMap<u32, Mitarbeiter>,
        }

        impl Abteilung {
            pub fn mitarbeiter_einstellen(&mut self, m: Mitarbeiter) {
                self.mitarbeiter_register.insert(m.id, m);
            }

            pub fn finde_mitarbeiter(&self, id: u32) -> Option<&Mitarbeiter> {
                self.mitarbeiter_register.get(&id)
            }
        }
    }
}

fn main() {
    use firma::personal::Mitarbeiter;
    use firma::abteilung::Abteilung;
    use std::collections::HashMap;

    let mut abteilung = Abteilung {
        name: String::from("IT-Entwicklung"),
        mitarbeiter_register: HashMap::new(),
    };

    let m1 = Mitarbeiter { id: 1001, name: String::from("Alice") };
    abteilung.mitarbeiter_einstellen(m1);

    if let Some(m) = abteilung.finde_mitarbeiter(1001) {
        println!("Mitarbeiter gefunden: {} (ID: {})", m.name, m.id);
    }
}
```

---

## Projekt 30: Smart Home Steuerung

### Beschreibung
Eine Smart-Home-Zentrale, die Lampen und Thermostate verwaltet. Es demonstriert die Kapselung mithilfe von `pub(crate)` für interne Steuerbefehle.

### Modulhierarchie
```text
crate
└── smarthome
    ├── geraete (SmartGeraet)
    └── zentrale (Steuerung)
```

### Code
```rust
mod smarthome {
    pub mod geraete {
        pub enum Typ {
            Licht,
            Heizung,
        }

        pub struct SmartGeraet {
            pub id: u32,
            pub geraete_typ: Typ,
            pub aktiv: bool,
        }

        impl SmartGeraet {
            // 🔒 Diese Funktion soll nur innerhalb dieses Crates aufgerufen werden
            pub(crate) fn umschalten(&mut self) {
                self.aktiv = !self.aktiv;
            }
        }
    }

    pub mod zentrale {
        use super::geraete::SmartGeraet;

        pub struct Steuerung {
            pub geraete: Vec<SmartGeraet>,
        }

        impl Steuerung {
            pub fn toggle_geraet(&mut self, id: u32) -> Result<(), String> {
                for g in &mut self.geraete {
                    if g.id == id {
                        // Aufruf der pub(crate) Methode ist hier erlaubt,
                        // da sich beide Module im selben Crate befinden.
                        g.umschalten();
                        return Ok(());
                    }
                }
                Err(format!("Gerät {} nicht gefunden.", id))
            }
        }
    }
}

fn main() {
    use smarthome::geraete::{SmartGeraet, Typ};
    use smarthome::zentrale::Steuerung;

    let g = SmartGeraet { id: 1, geraete_typ: Typ::Licht, aktiv: false };
    let mut zentrale = Steuerung { geraete: vec![g] };

    assert_eq!(zentrale.geraete[0].aktiv, false);
    zentrale.toggle_geraet(1).unwrap();
    assert_eq!(zentrale.geraete[0].aktiv, true);
    println!("Gerätezustand erfolgreich umgeschaltet!");
}
```

---

## Projekt 31: Bankkonto-Manager

### Beschreibung
Konto- und Transaktionsverwaltung einer Bank. Zeigt, wie man private Attribute über öffentliche Modulmethoden absichert und mit `super` navigiert.

### Modulhierarchie
```text
crate
└── bank
    ├── konto (Konto)
    └── transaktion (TransaktionsProtokoll)
```

### Code
```rust
mod bank {
    pub mod konto {
        pub struct Konto {
            inhaber: String,
            kontostand: f64, // Kapselung: Privat innerhalb des Moduls
        }

        impl Konto {
            pub fn neu(inhaber: &str, startguthaben: f64) -> Self {
                Konto {
                    inhaber: String::from(inhaber),
                    kontostand: startguthaben,
                }
            }

            pub fn guthaben(&self) -> f64 {
                self.kontostand
            }

            // Methode zum Ändern des Kontostands (intern für Transaktionen)
            pub(super) fn einzahlen(&mut self, betrag: f64) {
                self.kontostand += betrag;
            }
        }
    }

    pub mod transaktion {
        // 🔍 Navigation zum Geschwistermodul
        use super::konto::Konto;

        pub struct TransaktionsProtokoll;

        impl TransaktionsProtokoll {
            pub fn fuehre_einzahlung_aus(konto: &mut Konto, betrag: f64) -> Result<(), String> {
                if betrag <= 0.0 {
                    Err(String::from("Betrag muss positiv sein."))
                } else {
                    // Aufruf der pub(super) Methode, da 'transaktion'
                    // und 'konto' Geschwistermodule unter 'bank' sind.
                    konto.einzahlen(betrag);
                    Ok(())
                }
            }
        }
    }
}

fn main() {
    use bank::konto::Konto;
    use bank::transaktion::TransaktionsProtokoll;

    let mut mein_konto = Konto::neu("Thorsten", 100.0);
    println!("Startguthaben: {} EUR", mein_konto.guthaben());

    TransaktionsProtokoll::fuehre_einzahlung_aus(&mut mein_konto, 50.0).unwrap();
    println!("Neues Guthaben: {} EUR", mein_konto.guthaben());
}
```

---

## Projekt 32: Musik-Playlist-Manager

### Beschreibung
Verwaltung einer Playlist. Veranschaulicht die explizite Pfadnavigation mit `self` zur Verdeutlichung lokaler Bezüge.

### Modulhierarchie
```text
crate
└── musik
    ├── titel (Song)
    └── playlist (Playlist)
```

### Code
```rust
mod musik {
    pub mod titel {
        #[derive(Clone)]
        pub struct Song {
            pub titel: String,
            pub interpret: String,
        }
    }

    pub mod playlist {
        // 🔍 Navigation: 'self' verweist auf das aktuelle Modul 'playlist'
        // 'super' verweist auf 'musik'
        use super::titel::Song;

        pub struct Playlist {
            pub name: String,
            pub songs: Vec<Song>,
        }

        impl Playlist {
            pub fn song_hinzufuegen(&mut self, song: Song) {
                // Deutlichmachen lokaler Pfadnutzung
                self.songs.push(song);
            }
        }
    }
}

fn main() {
    use musik::titel::Song;
    use musik::playlist::Playlist;

    let song = Song {
        titel: String::from("Rust Rock"),
        interpret: String::from("Die Compiler-Band"),
    };

    let mut playlist = Playlist {
        name: String::from("Meine Favoriten"),
        songs: Vec::new(),
    };

    playlist.song_hinzufuegen(song);
    println!("Song '{}' zur Playlist hinzugefügt.", playlist.songs[0].titel);
}
```

---

## Projekt 33: Fahrzeug-Flottenverwaltung

### Beschreibung
Verwaltung einer Fahrzeugflotte. Hier wird demonstriert, wie komplexe Enums und Hilfsstructs in einem Submodul definiert und per `pub use` dem Client zur Verfügung gestellt werden.

### Modulhierarchie
```text
crate
└── flotte
    ├── fahrzeug (Auto, Status)
    └── wartung (WartungsSystem)
```

### Code
```rust
mod flotte {
    pub mod fahrzeug {
        #[derive(Debug, PartialEq, Clone)]
        pub enum Status {
            Bereit,
            InWartung,
        }

        pub struct Auto {
            pub kennzeichen: String,
            pub status: Status,
        }
    }

    pub mod wartung {
        use super::fahrzeug::{Auto, Status};

        pub struct WartungsSystem;

        impl WartungsSystem {
            pub fn starte_wartung(auto: &mut Auto) {
                auto.status = Status::InWartung;
            }
        }
    }

    // 🏷️ Re-Exporting des gesamten Modul-Inhalts für flachen Zugriff
    pub use fahrzeug::Auto;
    pub use fahrzeug::Status;
    pub use wartung::WartungsSystem;
}

fn main() {
    // Client greift flach auf alle Typen zu
    use flotte::{Auto, Status, WartungsSystem};

    let mut auto = Auto {
        kennzeichen: String::from("B-RUST-2026"),
        status: Status::Bereit,
    };

    WartungsSystem::starte_wartung(&mut auto);
    assert_eq!(auto.status, Status::InWartung);
    println!("Fahrzeug {} ist nun in der Wartung.", auto.kennzeichen);
}
```

---

## Projekt 34: Rezepte-Datenbank

### Beschreibung
Eine Rezepte-Datenbank, die `HashMap` für Zutaten verwendet. Zeigt den Einsatz von Import-Aliasing (`as`), um Namenskollisionen bei gleichem Struct-Namen in unterschiedlichen Modulen zu vermeiden.

### Modulhierarchie
```text
crate
└── rezepte
    ├── zutaten (Zutat)
    └── datenbank (Rezept)
```

### Code
```rust
mod rezepte {
    pub mod zutaten {
        pub struct Zutat {
            pub name: String,
        }
    }

    pub mod datenbank {
        use std::collections::HashMap;

        // 🔍 Import-Aliasing zur Vermeidung von Unklarheiten oder Kollisionen
        use super::zutaten::Zutat as RezeptZutat;

        pub struct Rezept {
            pub name: String,
            // HashMap bildet Zutat auf Gramm/Menge ab
            pub zutaten_liste: HashMap<String, u32>,
        }

        impl Rezept {
            pub fn zutat_hinzufuegen(&mut self, zutat: RezeptZutat, menge: u32) {
                self.zutaten_liste.insert(zutat.name, menge);
            }
        }
    }
}

fn main() {
    use rezepte::zutaten::Zutat;
    use rezepte::datenbank::Rezept;
    use std::collections::HashMap;

    let mut pfannkuchen = Rezept {
        name: String::from("Pfannkuchen"),
        zutaten_liste: HashMap::new(),
    };

    let mehl = Zutat { name: String::from("Mehl") };
    pfannkuchen.zutat_hinzufuegen(mehl, 200);

    println!("Rezept: {}", pfannkuchen.name);
    for (name, menge) in &pfannkuchen.zutaten_liste {
        println!("- {}: {}g", name, menge);
    }
}
```

---

## Projekt 35: Schule-Notensystem

### Beschreibung
Fehlerfortpflanzung über Module hinweg. Schüler und Notenverwaltung werden getrennt deklariert. Ein Fehler im Notenmodul wird mit `Result` an den Client zurückgegeben.

### Modulhierarchie
```text
crate
└── schule
    ├── schueler (Schueler)
    └── noten (ZensurSystem)
```

### Code
```rust
mod schule {
    pub mod schueler {
        pub struct Schueler {
            pub name: String,
        }
    }

    pub mod noten {
        // 🔍 Navigation zum Geschwistermodul über absolutem Pfad
        use crate::schule::schueler::Schueler;

        pub struct ZensurSystem;

        impl ZensurSystem {
            // Didaktik: Fehlerfortpflanzung mittels Result
            pub fn note_eintragen(schueler: &Schueler, note: u32) -> Result<String, String> {
                if note < 1 || note > 6 {
                    Err(format!("Ungültige Note {}. Erlaubt ist nur 1-6.", note))
                } else {
                    Ok(format!("Note {} für {} eingetragen.", note, schueler.name))
                }
            }
        }
    }
}

fn main() {
    use schule::schueler::Schueler;
    use schule::noten::ZensurSystem;

    let schueler = Schueler { name: String::from("Bob") };

    match ZensurSystem::note_eintragen(&schueler, 8) {
        Ok(msg) => println!("{}", msg),
        Err(err) => println!("Fehler abgefangen: {}", err),
    }
}
```

---

## Projekt 36: Kino-Sitzplatzreservierung

### Beschreibung
Sitzplatzreservierung in einem 2D-Kino-Saal. Dieses Projekt veranschaulicht tiefer verschachtelte Module und wie relative Pfade über mehrere Ebenen navigieren.

### Modulhierarchie
```text
crate
└── kino
    └── saal
        ├── platz (Sitzplatz)
        └── buchung (Reservierung)
```

### Code
```rust
mod kino {
    pub mod saal {
        pub mod platz {
            pub struct Sitzplatz {
                pub reihe: char,
                pub nummer: u32,
                pub reserviert: bool,
            }
        }

        pub mod buchung {
            // 🔍 Navigation: Zwei Ebenen nach oben ('super::super'), dann in 'platz'
            use super::super::saal::platz::Sitzplatz;

            pub struct Reservierung {
                pub sitze: Vec<Sitzplatz>,
            }

            impl Reservierung {
                pub fn reserviere_platz(&mut self, reihe: char, nummer: u32) -> Result<(), String> {
                    for s in &mut self.sitze {
                        if s.reihe == reihe && s.nummer == nummer {
                            if s.reserviert {
                                return Err(String::from("Platz bereits belegt."));
                            } else {
                                s.reserviert = true;
                                return Ok(());
                            }
                        }
                    }
                    Err(String::from("Platz existiert nicht."))
                }
            }
        }
    }
}

fn main() {
    use kino::saal::platz::Sitzplatz;
    use kino::saal::buchung::Reservierung;

    let s1 = Sitzplatz { reihe: 'A', nummer: 5, reserviert: false };
    let s2 = Sitzplatz { reihe: 'A', nummer: 6, reserviert: true };

    let mut system = Reservierung { sitze: vec![s1, s2] };

    match system.reserviere_platz('A', 5) {
        Ok(_) => println!("Platz A5 erfolgreich reserviert."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 37: Lagerverwaltung (Logistik)

### Beschreibung
Lagerbestandsverwaltung mit modularer Kapselung. Es zeigt die Nutzung von `pub(crate)` und `pub(super)`, um Funktionen nur für das übergeordnete Modul oder das Crate freizugeben.

### Modulhierarchie
```text
crate
└── lager
    ├── details (ArtikelInfo)
    └── system (BestandsManager)
```

### Code
```rust
mod lager {
    pub mod details {
        pub struct ArtikelInfo {
            pub name: String,
            pub gewicht: f64,
        }

        impl ArtikelInfo {
            // 🔒 Sichtbarkeit: Nur für das übergeordnete Modul 'lager' sichtbar
            pub(super) fn validiere_daten(&self) -> bool {
                self.gewicht > 0.0 && !self.name.is_empty()
            }
        }
    }

    pub mod system {
        use super::details::ArtikelInfo;

        pub struct BestandsManager {
            pub artikel: Vec<ArtikelInfo>,
        }

        impl BestandsManager {
            pub fn artikel_hinzufuegen(&mut self, info: ArtikelInfo) -> Result<(), String> {
                // Aufruf von validiere_daten() ist erlaubt, da 'system'
                // und 'details' Geschwistermodule unter 'lager' sind.
                if info.validiere_daten() {
                    self.artikel.push(info);
                    Ok(())
                } else {
                    Err(String::from("Ungültige Artikeldaten."))
                }
            }
        }
    }
}

fn main() {
    use lager::details::ArtikelInfo;
    use lager::system::BestandsManager;

    let mut manager = BestandsManager { artikel: Vec::new() };
    let art = ArtikelInfo { name: String::from("Schraube"), gewicht: 0.02 };

    if let Ok(_) = manager.artikel_hinzufuegen(art) {
        println!("Artikel erfolgreich hinzugefügt!");
    }
}
```

---

## Projekt 38: Fitness-Tracker

### Beschreibung
Verfolgung von Trainingsaktivitäten. Veranschaulicht die Navigation mittels `super` aus einem verschachtellten Submodul, um auf eine Struktur im Elternmodul zuzugreifen.

### Modulhierarchie
```text
crate
└── fitness
    ├── log (AktivitaetsLog)
    └── aktivitaet (Aktivitaet)
```

### Code
```rust
mod fitness {
    // Liegt im übergeordneten Modul
    pub struct Aktivitaet {
        pub typ: String,
        pub dauer: u32, // in Minuten
    }

    pub mod log {
        // 🔍 Navigation zum übergeordneten Modul
        use super::Aktivitaet;

        pub struct AktivitaetsLog {
            pub eintraege: Vec<Aktivitaet>,
        }

        impl AktivitaetsLog {
            pub fn logge(&mut self, act: Aktivitaet) {
                self.eintraege.push(act);
            }
        }
    }
}

fn main() {
    // Um an 'AktivitaetsLog' heranzukommen, navigieren wir über 'fitness::log'
    use fitness::Aktivitaet;
    use fitness::log::AktivitaetsLog;

    let mut tracker = AktivitaetsLog { eintraege: Vec::new() };
    let lauf = Aktivitaet {
        typ: String::from("Joggen"),
        dauer: 45,
    };

    tracker.logge(lauf);
    println!("Aktivität erfasst: {} Minuten", tracker.eintraege[0].dauer);
}
```

---

## Projekt 39: Paket-Zustelldienst

### Beschreibung
Sendungsverfolgung für einen Paketdienst. Dieses Projekt verwendet `pub use`, um API-Änderungen im Inneren des Moduls vor dem Client zu verstecken.

### Modulhierarchie
```text
crate
└── logistik
    ├── details (Paket, Status)
    └── versand (VersandModul)
```

### Code
```rust
mod logistik {
    pub mod details {
        #[derive(Debug, PartialEq, Clone)]
        pub enum Status {
            ImLager,
            Unterwegs,
        }

        pub struct Paket {
            pub tracking_id: String,
            pub status: Status,
        }
    }

    pub mod versand {
        use super::details::{Paket, Status};

        pub struct VersandModul;

        impl VersandModul {
            pub fn versende(paket: &mut Paket) {
                paket.status = Status::Unterwegs;
            }
        }
    }

    // 🏷️ Re-Exporting kapselt die interne Aufteilung
    pub use details::{Paket, Status};
    pub use versand::VersandModul;
}

fn main() {
    // Client nutzt nur re-exportierte Schnittstellen
    use logistik::{Paket, Status, VersandModul};

    let mut p = Paket {
        tracking_id: String::from("DE1234567"),
        status: Status::ImLager,
    };

    VersandModul::versende(&mut p);
    assert_eq!(p.status, Status::Unterwegs);
    println!("Paket {} befindet sich im Zustand: {:?}", p.tracking_id, p.status);
}
```

---

## Projekt 40: Flug-Buchungssystem

### Beschreibung
Ein Flugbuchungssystem. Kombiniert hierarchische Modulimporte, Vektoren und den Typ `Option` für freie Sitzplätze in einem Flugzeug.

### Modulhierarchie
```text
crate
└── airline
    ├── passagiere (Kunde)
    └── flugbetrieb (Flug)
```

### Code
```rust
mod airline {
    pub mod passagiere {
        pub struct Kunde {
            pub name: String,
        }
    }

    pub mod flugbetrieb {
        use crate::airline::passagiere::Kunde;

        pub struct Flug {
            pub flugnummer: String,
            pub passagier: Option<Kunde>,
        }

        impl Flug {
            pub fn buche_passagier(&mut self, k: Kunde) -> Result<(), String> {
                if self.passagier.is_none() {
                    self.passagier = Some(k);
                    Ok(())
                } else {
                    Err(String::from("Dieser Flug ist bereits ausgebucht!"))
                }
            }
        }
    }
}

fn main() {
    use airline::passagiere::Kunde;
    use airline::flugbetrieb::Flug;

    let user = Kunde { name: String::from("Thorsten") };
    let mut flug = Flug { flugnummer: String::from("LH456"), passagier: None };

    match flug.buche_passagier(user) {
        Ok(_) => println!("Erfolgreich gebucht!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 41: Game-Inventar

### Beschreibung
Ein RPG-Gegenstandsinventar. Zeigt, wie man Pattern Matching auf re-exportierten Enums aus Submodulen anwendet.

### Modulhierarchie
```text
crate
└── spiel
    ├── gegenstand (Seltenheit, Item)
    └── inventar (SpielerInventar)
```

### Code
```rust
mod spiel {
    pub mod gegenstand {
        #[derive(Debug, PartialEq)]
        pub enum Seltenheit {
            Gewoehnlich,
            Legendaer,
        }

        pub struct Item {
            pub name: String,
            pub seltenheit: Seltenheit,
        }
    }

    pub mod inventar {
        use super::gegenstand::Item;

        pub struct SpielerInventar {
            pub items: Vec<Item>,
        }

        impl SpielerInventar {
            pub fn hinzufuegen(&mut self, item: Item) {
                self.items.push(item);
            }
        }
    }

    // 🏷️ Re-Exporting
    pub use gegenstand::{Item, Seltenheit};
    pub use inventar::SpielerInventar;
}

fn main() {
    use spiel::{Item, Seltenheit, SpielerInventar};

    let mut inv = SpielerInventar { items: Vec::new() };
    inv.hinzufuegen(Item {
        name: String::from("Excalibur"),
        seltenheit: Seltenheit::Legendaer,
    });

    // 🔍 Pattern Matching auf re-exportiertem Enum
    match inv.items[0].seltenheit {
        Seltenheit::Legendaer => println!("Ein legendärer Gegenstand: {}", inv.items[0].name),
        Seltenheit::Gewoehnlich => println!("Ein gewöhnlicher Gegenstand: {}", inv.items[0].name),
    }
}
```

---

## Projekt 42: Wetterstation

### Beschreibung
Eine Wetterstation zur Aggregation von Messwerten. Es demonstriert ein internes Hilfsmodul, auf das nur das übergeordnete Modul zugreift.

### Modulhierarchie
```text
crate
└── wetter
    ├── messung (Messwert)
    └── private_berechnung (Durchschnitt)
```

### Code
```rust
mod wetter {
    pub mod messung {
        pub struct Messwert {
            pub temperatur: f64,
        }
    }

    // 🔒 Privates Modul: Von außen nicht importierbar
    mod private_berechnung {
        use super::messung::Messwert;

        pub fn berechne_mittelwert(werte: &[Messwert]) -> f64 {
            if werte.is_empty() { return 0.0; }
            let summe: f64 = werte.iter().map(|w| w.temperatur).sum();
            summe / werte.len() as f64
        }
    }

    // Öffentliche Schnittstelle des wetter-Moduls
    pub struct Station {
        pub werte: Vec<messung::Messwert>,
    }

    impl Station {
        pub fn durchschnitt_ermitteln(&self) -> f64 {
            // Aufruf aus dem privaten Hilfsmodul über relativen Pfad
            private_berechnung::berechne_mittelwert(&self.werte)
        }
    }
}

fn main() {
    use wetter::Station;
    use wetter::messung::Messwert;

    let w1 = Messwert { temperatur: 20.5 };
    let w2 = Messwert { temperatur: 22.5 };

    let station = Station { werte: vec![w1, w2] };
    println!("Die Durchschnittstemperatur ist: {:.1}°C", station.durchschnitt_ermitteln());
}
```

---

## Projekt 43: Task-Manager (Kanban)

### Beschreibung
Verwaltung eines Kanban-Boards. Typen aus tiefen Submodulen werden bis zur Crate-Root-Ebene re-exportiert, um dem Nutzer maximalen Komfort zu bieten.

### Modulhierarchie
```text
crate
└── kanban
    ├── task (Aufgabe, Status)
    └── board (KanbanBoard)
```

### Code
```rust
mod kanban {
    pub mod task {
        pub enum Status {
            Offen,
            Erledigt,
        }

        pub struct Aufgabe {
            pub titel: String,
            pub status: Status,
        }
    }

    pub mod board {
        use super::task::{Aufgabe, Status};

        pub struct KanbanBoard {
            pub aufgaben: Vec<Aufgabe>,
        }

        impl KanbanBoard {
            pub fn erledige_aufgabe(&mut self, index: usize) {
                if let Some(a) = self.aufgaben.get_mut(index) {
                    a.status = Status::Erledigt;
                }
            }
        }
    }

    // 🏷️ Crate-Root Re-Exporting
    pub use task::Aufgabe;
    pub use board::KanbanBoard;
}

fn main() {
    // Direktes Importieren aus dem Stammmodul
    use kanban::{Aufgabe, KanbanBoard};
    use kanban::task::Status;

    let a1 = Aufgabe {
        titel: String::from("Rust-Modul-Kapitel schreiben"),
        status: Status::Offen,
    };

    let mut board = KanbanBoard { aufgaben: vec![a1] };
    board.erledige_aufgabe(0);
    println!("Aufgabe erfolgreich aktualisiert!");
}
```

---

## Projekt 44: Café-Bestellsystem

### Beschreibung
Bestellannahme in einem Café. Dieses Projekt zeigt die Entkopplung von Datenstrukturen zur Vermeidung von zirkulären Modul-Abhängigkeiten.

### Modulhierarchie
```text
crate
└── cafe
    ├── menue (Getraenk)
    └── bestellung (BestellListe)
```

### Code
```rust
mod cafe {
    pub mod menue {
        #[derive(Clone)]
        pub struct Getraenk {
            pub name: String,
            pub preis: f64,
        }
    }

    pub mod bestellung {
        // Didaktik: Vermeidung zirkulärer Importe.
        // bestellung importiert menue::Getraenk, menue importiert aber nichts aus bestellung.
        use super::menue::Getraenk;

        pub struct BestellListe {
            pub getraenke: Vec<Getraenk>,
        }

        impl BestellListe {
            pub fn add(&mut self, g: Getraenk) {
                self.getraenke.push(g);
            }

            pub fn abrechnen(&self) -> f64 {
                self.getraenke.iter().map(|g| g.preis).sum()
            }
        }
    }
}

fn main() {
    use cafe::menue::Getraenk;
    use cafe::bestellung::BestellListe;

    let kaffee = Getraenk { name: String::from("Espresso"), preis: 2.20 };
    let mut order = BestellListe { getraenke: Vec::new() };

    order.add(kaffee);
    println!("Rechnungsbetrag: {:.2} EUR", order.abrechnen());
}
```

---

## Projekt 45: Fuhrpark-Fahrtenbuch

### Beschreibung
Erfassung von geschäftlichen Fahrten im Fuhrpark. Zeigt absolute Pfade mit `crate::` zur Navigation innerhalb eines komplexeren Systems.

### Modulhierarchie
```text
crate
└── fahrtenbuch
    ├── fahrt (Eintrag)
    └── auswertung (FahrtenRechner)
```

### Code
```rust
mod fahrtenbuch {
    pub mod fahrt {
        pub struct Eintrag {
            pub kilometer: u32,
            pub zweck: String,
        }
    }

    pub mod auswertung {
        // 🔍 Navigation: Absolute Navigation vom Root-Modul
        use crate::fahrtenbuch::fahrt::Eintrag;

        pub struct FahrtenRechner;

        impl FahrtenRechner {
            pub fn summiere_kilometer(eintraege: &[Eintrag]) -> u32 {
                eintraege.iter().map(|e| e.kilometer).sum()
            }
        }
    }
}

fn main() {
    use fahrtenbuch::fahrt::Eintrag;
    use fahrtenbuch::auswertung::FahrtenRechner;

    let f1 = Eintrag { kilometer: 120, zweck: String::from("Kundenbesuch") };
    let f2 = Eintrag { kilometer: 15, zweck: String::from("Post") };

    let liste = vec![f1, f2];
    let summe = FahrtenRechner::summiere_kilometer(&liste);

    println!("Gesamte Fahrtstrecke: {} km", summe);
}
```

---

## Projekt 46: Event-Ticketing

### Beschreibung
Verkauf von Eintrittskarten für Veranstaltungen. Es implementiert einen benutzerdefinierten Modulfehler und zeigt, wie man diesen über Modulgrenzen transportiert.

### Modulhierarchie
```text
crate
└── event
    ├── show (Konzert)
    └── kasse (KartenVerkauf)
```

### Code
```rust
mod event {
    pub mod show {
        pub struct Konzert {
            pub kuenstler: String,
            pub freie_plaetze: u32,
        }
    }

    pub mod kasse {
        use super::show::Konzert;

        // Custom Error auf Modulebene
        #[derive(Debug)]
        pub enum TicketError {
            Ausverkauft,
        }

        pub struct KartenVerkauf;

        impl KartenVerkauf {
            pub fn ticket_kaufen(konzert: &mut Konzert) -> Result<(), TicketError> {
                if konzert.freie_plaetze == 0 {
                    Err(TicketError::Ausverkauft)
                } else {
                    konzert.freie_plaetze -= 1;
                    Ok(())
                }
            }
        }
    }
}

fn main() {
    use event::show::Konzert;
    use event::kasse::{KartenVerkauf, TicketError};

    let mut gig = Konzert {
        kuenstler: String::from("The Rustaceans"),
        freie_plaetze: 0,
    };

    match KartenVerkauf::ticket_kaufen(&mut gig) {
        Ok(_) => println!("Ticket erfolgreich gebucht!"),
        Err(TicketError::Ausverkauft) => println!("Buchung fehlgeschlagen: Konzert ist ausverkauft!"),
    }
}
```

---

## Projekt 47: Online-Kurs-Plattform

### Beschreibung
Eine Plattform zur Verwaltung von Online-Kursen und Lernfortschritten. Zeigt, wie Kapselung über gekoppelte Submodule und Sichtbarkeitsmodifizierer realisiert wird.

### Modulhierarchie
```text
crate
└── kursportal
    ├── kurs (Lektion, Kurs)
    └── benutzer (Fortschritt)
```

### Code
```rust
mod kursportal {
    pub mod kurs {
        pub struct Lektion {
            pub titel: String,
        }

        pub struct Kurs {
            pub name: String,
            pub lektionen: Vec<Lektion>,
        }
    }

    pub mod benutzer {
        use super::kurs::Kurs;

        pub struct Fortschritt {
            pub username: String,
            abgeschlossene_kurse: Vec<String>, // Kapselung
        }

        impl Fortschritt {
            pub fn neu(username: &str) -> Self {
                Fortschritt {
                    username: String::from(username),
                    abgeschlossene_kurse: Vec::new(),
                }
            }

            pub fn kurs_abschliessen(&mut self, k: &Kurs) {
                self.abgeschlossene_kurse.push(k.name.clone());
            }

            pub fn hat_kurs_bestanden(&self, kurs_name: &str) -> bool {
                self.abgeschlossene_kurse.contains(&String::from(kurs_name))
            }
        }
    }
}

fn main() {
    use kursportal::kurs::{Kurs, Lektion};
    use kursportal::benutzer::Fortschritt;

    let k = Kurs {
        name: String::from("Rust 101"),
        lektionen: vec![Lektion { titel: String::from("Einführung") }],
    };

    let mut user = Fortschritt::neu("Thorsten");
    user.kurs_abschliessen(&k);

    assert!(user.hat_kurs_bestanden("Rust 101"));
    println!("{} hat den Kurs erfolgreich absolviert!", user.username);
}
```

---

## Projekt 48: Tierarzt-Praxis

### Beschreibung
Karteiverwaltung einer Tierarztpraxis unter Verwendung einer `HashMap` und Kapselung. Das Hinzufügen von Behandlungen erfolgt über kontrollierte Modulschnittstellen.

### Modulhierarchie
```text
crate
└── praxis
    ├── tier (Patient)
    └── karteikarte (Register)
```

### Code
```rust
mod praxis {
    pub mod tier {
        pub struct Patient {
            pub name: String,
            pub tierart: String,
        }
    }

    pub mod karteikarte {
        use std::collections::HashMap;
        use super::tier::Patient;

        pub struct Register {
            // Patient ID -> (Patient, Behandlungsverlauf)
            eintraege: HashMap<u32, (Patient, Vec<String>)>,
        }

        impl Register {
            pub fn neu() -> Self {
                Register { eintraege: HashMap::new() }
            }

            pub fn patient_aufnehmen(&mut self, id: u32, p: Patient) {
                self.eintraege.insert(id, (p, Vec::new()));
            }

            pub fn behandlung_hinzufuegen(&mut self, id: u32, diagnose: String) -> Result<(), String> {
                if let Some(eintrag) = self.eintraege.get_mut(&id) {
                    eintrag.1.push(diagnose);
                    Ok(())
                } else {
                    Err(String::from("Patient nicht gefunden."))
                }
            }

            pub fn zeige_verlauf(&self, id: u32) {
                if let Some((p, verlauf)) = self.eintraege.get(&id) {
                    println!("Verlauf für {} ({}):", p.name, p.tierart);
                    for eintrag in verlauf {
                        println!("- {}", eintrag);
                    }
                }
            }
        }
    }
}

fn main() {
    use praxis::tier::Patient;
    use praxis::karteikarte::Register;

    let p = Patient { name: String::from("Bello"), tierart: String::from("Hund") };
    let mut reg = Register::neu();

    reg.patient_aufnehmen(1, p);
    reg.behandlung_hinzufuegen(1, String::from("Impfung")).unwrap();

    reg.zeige_verlauf(1);
}
```

---

## Projekt 49: Dokumenten-Archiv

### Beschreibung
Ein System zum Suchen und Filtern von Dokumenten. Es veranschaulicht den Export und die Verwendung von Submodul-Schnittstellen mit relativen Importpfaden.

### Modulhierarchie
```text
crate
└── archiv
    ├── datei (Dokument)
    └── suche (SuchEngine)
```

### Code
```rust
mod archiv {
    pub mod datei {
        pub struct Dokument {
            pub name: String,
            pub inhalt: String,
        }
    }

    pub mod suche {
        // 🔍 Navigation: Relative Imports
        use super::datei::Dokument;

        pub struct SuchEngine;

        impl SuchEngine {
            pub fn enthaelt_begriff<'a>(doc: &'a Dokument, begriff: &str) -> Option<&'a str> {
                if doc.inhalt.contains(begriff) {
                    Some(&doc.name)
                } else {
                    None
                }
            }
        }
    }
}

fn main() {
    use archiv::datei::Dokument;
    use archiv::suche::SuchEngine;

    let doc = Dokument {
        name: String::from("geheim.txt"),
        inhalt: String::from("Rust ist eine sehr sichere Sprache."),
    };

    match SuchEngine::enthaelt_begriff(&doc, "sichere") {
        Some(name) => println!("Begriff gefunden in Datei: {}", name),
        None => println!("Begriff nicht gefunden."),
    }
}
```

---

## Projekt 50: Mietwagen-Verleih

### Beschreibung
Umfassendes Abschlussprojekt zu Pfaden & Importen. Modellierung eines Verleihsystems für Mietfahrzeuge. Es demonstriert das Zusammenspiel von `super`, `self`, `crate`, `pub use`, `pub(crate)` sowie allen bisherigen Programmierkonzepten.

### Modulhierarchie
```text
crate
└── verleih
    ├── fahrzeuge (Fahrzeug, Fahrzeugklasse)
    └── vertraege (Mietvertrag, Mietdauer)
```

### Code
```rust
mod verleih {
    pub mod fahrzeuge {
        #[derive(Debug, PartialEq, Clone, Copy)]
        pub enum Fahrzeugklasse {
            Kleinwagen,
            Premium,
        }

        pub struct Fahrzeug {
            pub id: u32,
            pub modell: String,
            pub klasse: Fahrzeugklasse,
            pub verfuegbar: bool,
        }

        impl Fahrzeug {
            // 🔒 Nur innerhalb des 'verleih' Modulbaums sichtbar
            pub(super) fn blockieren(&mut self) {
                self.verfuegbar = false;
            }
        }
    }

    pub mod vertraege {
        // 🔍 Navigation über absoluten Pfad
        use crate::verleih::fahrzeuge::{Fahrzeug, Fahrzeugklasse};

        pub struct Mietvertrag {
            pub vertrags_id: u32,
            pub kunde: String,
            pub tage: u32,
            pub fahrzeug_id: u32,
        }

        impl Mietvertrag {
            pub fn erstelle_vertrag(
                id: u32,
                kunde: &str,
                tage: u32,
                auto: &mut Fahrzeug,
            ) -> Result<Self, String> {
                if !auto.verfuegbar {
                    Err(format!("Das Fahrzeug '{}' ist nicht verfügbar.", auto.modell))
                } else {
                    // Blockiere das Fahrzeug (nutzt pub(super) Methode)
                    auto.blockieren();
                    Ok(Mietvertrag {
                        vertrags_id: id,
                        kunde: String::from(kunde),
                        tage,
                        fahrzeug_id: auto.id,
                    })
                }
            }

            pub fn berechne_mietpreis(&self, klasse: Fahrzeugklasse) -> f64 {
                let tagessatz = match klasse {
                    Fahrzeugklasse::Kleinwagen => 30.0,
                    Fahrzeugklasse::Premium => 85.0,
                };
                self.tage as f64 * tagessatz
            }
        }
    }

    // 🏷️ Re-Exporting der Kernkomponenten für eine flache API
    pub use fahrzeuge::{Fahrzeug, Fahrzeugklasse};
    pub use vertraege::Mietvertrag;
}

fn main() {
    // Zugriff auf die flache API
    use verleih::{Fahrzeug, Fahrzeugklasse, Mietvertrag};

    let mut auto = Fahrzeug {
        id: 42,
        modell: String::from("Rust-Mobil 5000"),
        klasse: Fahrzeugklasse::Premium,
        verfuegbar: true,
    };

    match Mietvertrag::erstelle_vertrag(1, "Thorsten", 5, &mut auto) {
        Ok(vertrag) => {
            let preis = vertrag.berechne_mietpreis(auto.klasse);
            println!("Vertrag erfolgreich erstellt!");
            println!("Kunde: {}", vertrag.kunde);
            println!("Mietpreis für {} Tage: {:.2} EUR", vertrag.tage, preis);
            assert_eq!(auto.verfuegbar, false);
        }
        Err(e) => println!("Verleihfehler: {}", e),
    }
}
```

---

## Phase 4: Projekte 51 bis 75 (Cargo & Crates)

In dieser Phase 4 (Projekte 51 bis 75) liegt der Fokus auf der **Einbindung und praktischen Nutzung von externen Abhängigkeiten (Crates)** über den Paketmanager Cargo. 
Jedes Projekt zeigt, wie du Bibliotheken aus dem Rust-Ökosystem (`crates.io`) einbindest und diese mit den Konzepten der vorherigen Phasen (Variablen, Enums, Structs, Fehlerbehandlung, Collections) kombinierst.

---

## Projekt 51: Zufallsgenerator-Spiel mit `rand` und farbigen Ausgaben mit `colored`

```rust
use rand::Rng;
use colored::Colorize;
use std::io::{self, Write};

// 🏷️ Enum für das Spielergebnis
#[derive(Debug, PartialEq)]
enum SpielStatus {
    Gewonnen,
    ZuNiedrig,
    ZuHoch,
}

// 📦 Struct zur Verwaltung des Spielzustands
struct Ratespiel {
    geheimzahl: u32,
    versuche: u32,
}

impl Ratespiel {
    fn neu() -> Self {
        // 🎲 thread_rng() holt den lokalen Zufallsgenerator
        let mut rng = rand::thread_rng();
        Ratespiel {
            geheimzahl: rng.gen_range(1..=100), // Generiert eine Zahl zwischen 1 und 100
            versuche: 0,
        }
    }

    // 🧠 Mutation: Der Spielzustand (versuche) wird verändert
    fn rate_einmal(&mut self, tipp: u32) -> SpielStatus {
        self.versuche += 1;
        if tipp == self.geheimzahl {
            SpielStatus::Gewonnen
        } else if tipp < self.geheimzahl {
            SpielStatus::ZuNiedrig
        } else {
            SpielStatus::ZuHoch
        }
    }
}

fn main() {
    let mut spiel = Ratespiel::neu();
    // 🎨 Farbige Konsolenausgaben über das 'colored' Crate (.bold().cyan() etc.)
    println!("{}", "Willkommen beim Zahlenratespiel!".bold().cyan());
    println!("Ich habe mir eine Zahl zwischen 1 und 100 ausgedacht.");

    loop {
        print!("Dein Tipp: ");
        io::stdout().flush().unwrap();

        let mut eingabe = String::new();
        io::stdin().read_line(&mut eingabe).unwrap();

        // 🛡️ Robustes Parsen der Benutzereingabe
        let tipp: u32 = match eingabe.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("{}", "Bitte gib eine gültige Zahl ein!".red());
                continue;
            }
        };

        // 🔍 Pattern Matching auf den Auswertungsstatus
        match spiel.rate_einmal(tipp) {
            SpielStatus::Gewonnen => {
                println!("{}", format!("Glückwunsch! Du hast die Zahl in {} Versuchen erraten!", spiel.versuche).green().bold());
                break;
            }
            SpielStatus::ZuNiedrig => {
                println!("{}", "Zu niedrig! Versuche es noch einmal.".yellow());
            }
            SpielStatus::ZuHoch => {
                println!("{}", "Zu hoch! Versuche es noch einmal.".yellow());
            }
        }
    }
}
```

---

## Projekt 52: JSON-Dateiverwaltung von Kontakten mit `serde` und `serde_json`

```rust
use serde::{Serialize, Deserialize};
use std::fs::File;
use std::io::{self, Read, Write};

// 📦 Structs für Kontakte. Mit serde-Makros für die Serialisierung vorbereitet.
#[derive(Serialize, Deserialize, Debug)]
struct Kontakt {
    name: String,
    email: String,
    telefon: Option<String>, // 🛡️ Option für optionale Felder
}

// 📦 Verwaltet eine Liste von Kontakten
#[derive(Serialize, Deserialize, Debug)]
struct KontaktBuch {
    kontakte: Vec<Kontakt>,
}

impl KontaktBuch {
    fn neu() -> Self {
        KontaktBuch { kontakte: Vec::new() }
    }

    fn hinzufuegen(&mut self, name: &str, email: &str, telefon: Option<&str>) {
        self.kontakte.push(Kontakt {
            name: name.to_string(),
            email: email.to_string(),
            telefon: telefon.map(|t| t.to_string()),
        });
    }

    // 🛡️ Fehlerfortpflanzung mittels Result
    fn speichern(&self, dateipfad: &str) -> Result<(), io::Error> {
        let datei = File::create(dateipfad)?;
        // 📦 Serialisiere die Daten in eine JSON-Datei mit serde_json
        serde_json::to_writer_pretty(datei, self)
            .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
        Ok(())
    }

    // 🛡️ Fehlerfortpflanzung: Gibt bei Erfolg ein neues KontaktBuch zurück
    fn laden(dateipfad: &str) -> Result<Self, io::Error> {
        let datei = File::open(dateipfad)?;
        // 📦 Deserialisiere die Daten aus der JSON-Datei
        let buch: KontaktBuch = serde_json::from_reader(datei)
            .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
        Ok(buch)
    }
}

fn main() {
    let mut mein_buch = KontaktBuch::neu();
    mein_buch.hinzufuegen("Alice", "alice@example.com", Some("0172-1234567"));
    mein_buch.hinzufuegen("Bob", "bob@example.com", None);

    let pfad = "kontakte_test.json";

    // 🛡️ Versuche das Buch zu speichern
    if let Err(e) = mein_buch.speichern(pfad) {
        eprintln!("Fehler beim Speichern: {}", e);
        return;
    }
    println!("Kontaktbuch erfolgreich gespeichert unter '{}'.", pfad);

    // 🛡️ Versuche das Buch zu laden und zu verifizieren
    match KontaktBuch::laden(pfad) {
        Ok(geladenes_buch) => {
            println!("Erfolgreich geladen. Kontakte:");
            for k in geladenes_buch.kontakte {
                println!("- {} ({})", k.name, k.email);
            }
        }
        Err(e) => eprintln!("Fehler beim Laden: {}", e),
    }

    // Aufräumen: Datei nach Test wieder entfernen
    let _ = std::fs::remove_file(pfad);
}
```

---

## Projekt 53: Zeitstempel-Logger für Aufgaben mit `chrono`

```rust
use chrono::{DateTime, Local};

// 📦 Struct für eine Aufgabe mit Zeiterfassung
struct LogEintrag {
    aufgabe: String,
    erstellt_am: DateTime<Local>, // 📅 Chrono-Typ für lokale Zeitstempel
}

struct Logger {
    eintraege: Vec<LogEintrag>,
}

impl Logger {
    fn neu() -> Self {
        Logger { eintraege: Vec::new() }
    }

    fn logge_aufgabe(&mut self, name: &str) {
        // 📅 Aktuelle lokale Uhrzeit abrufen
        let jetzt = Local::now();
        self.eintraege.push(LogEintrag {
            aufgabe: name.to_string(),
            erstellt_am: jetzt,
        });
    }

    fn zeige_log(&self) {
        for eintrag in &self.eintraege {
            // 📅 Formatieren des Datums mit der strftime-Syntax von Chrono
            let formatiert = eintrag.erstellt_am.format("%Y-%m-%d %H:%M:%S");
            println!("[{}] {}", formatiert, eintrag.aufgabe);
        }
    }
}

fn main() {
    let mut logger = Logger::neu();
    logger.logge_aufgabe("Programm starten");
    
    // Simuliere eine kurze Verzögerung von 500 ms
    std::thread::sleep(std::time::Duration::from_millis(500));
    
    logger.logge_aufgabe("Verbindung zur API herstellen");
    logger.zeige_log();
}
```

---

## Projekt 54: Regex-E-Mail-Validator und -Extraktor mit `regex`

```rust
use regex::Regex;

struct EmailExtraktor {
    // 📦 Regex-Muster vorkompiliert speichern (verhindert ständiges Re-Parsing)
    muster: Regex,
}

impl EmailExtraktor {
    fn neu() -> Result<Self, regex::Error> {
        // 🔍 Erstellen des regulären Ausdrucks für einfache E-Mail-Adressen
        let pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}";
        let re = Regex::new(pattern)?;
        Ok(EmailExtraktor { muster: re })
    }

    // 🔍 Extrahiert alle E-Mail-Adressen aus einem beliebigen Text
    fn extrahiere(&self, text: &str) -> Vec<String> {
        let mut ergebnisse = Vec::new();
        // 🔍 Iteriere über alle Regex-Matches im Text
        for fund in self.muster.find_iter(text) {
            ergebnisse.push(fund.as_str().to_string());
        }
        ergebnisse
    }
}

fn main() {
    // Regex beim Start kompilieren, Fehler werfen falls Syntax ungültig
    let extraktor = EmailExtraktor::neu().expect("Regex-Fehler");
    
    let text = "Hallo, meine E-Mail ist info@firma.de. Meine private Adresse lautet test.user@mail.com!";
    let e_mails = extraktor.extrahiere(text);
    
    println!("Gefundene Adressen:");
    for mail in e_mails {
        println!("- {}", mail);
    }
}
```

---

## Projekt 55: UUID-Generator für Datenbanksätze mit `uuid`

```rust
use uuid::Uuid;
use std::collections::HashMap;

// 📦 Struct für ein Benutzerkonto
struct Benutzer {
    id: Uuid, // 🔑 Eindeutige ID über das uuid-Crate
    benutzername: String,
}

struct BenutzerDatenbank {
    daten: HashMap<Uuid, Benutzer>,
}

impl BenutzerDatenbank {
    fn neu() -> Self {
        BenutzerDatenbank { daten: HashMap::new() }
    }

    fn benutzer_anlegen(&mut self, name: &str) -> Uuid {
        // 🔑 Generiere eine neue, zufällige Version 4 UUID
        let neue_id = Uuid::new_v4();
        let benutzer = Benutzer {
            id: neue_id,
            benutzername: name.to_string(),
        };
        self.daten.insert(neue_id, benutzer);
        neue_id
    }

    // 🛡️ Option: Gibt Some(&Benutzer) zurück, wenn gefunden, sonst None
    fn finde_benutzer(&self, id: &Uuid) -> Option<&Benutzer> {
        self.daten.get(id)
    }
}

fn main() {
    let mut db = BenutzerDatenbank::neu();
    let id1 = db.benutzer_anlegen("Thorsten");
    let id2 = db.benutzer_anlegen("Gemini");

    println!("Thorsten-ID: {}", id1);
    println!("Gemini-ID:   {}", id2);

    if let Some(user) = db.finde_benutzer(&id1) {
        println!("Benutzer mit ID {} heißt {}", user.id, user.benutzername);
    }
}
```

---

## Projekt 56: Datei-Integrations-Prüfer mit `sha2` und `hex`

```rust
use sha2::{Sha256, Digest};
use hex;
use std::fs::File;
use std::io::{self, Read, Write};

struct Dateipruefer;

impl Dateipruefer {
    // 🛡️ Berechnet den SHA-256 Hash einer Datei und gibt ihn als Hex-String zurück
    fn berechne_sha256(pfad: &str) -> Result<String, io::Error> {
        let mut datei = File::open(pfad)?;
        let mut hasher = Sha256::new(); // 📦 Hasher-Instanz aus dem sha2 Crate
        let mut puffer = [0; 1024];

        loop {
            let gelesene_bytes = datei.read(&mut puffer)?;
            if gelesene_bytes == 0 {
                break;
            }
            // Hasher mit den gelesenen Bytes aktualisieren
            hasher.update(&puffer[..gelesene_bytes]);
        }

        let ergebnis = hasher.finalize();
        // 📦 Konvertiere das Byte-Array mit dem hex-Crate in eine lesbare Zeichenkette
        Ok(hex::encode(ergebnis))
    }
}

fn main() {
    let test_pfad = "test_datei.txt";
    
    // Test-Datei erstellen
    let mut f = File::create(test_pfad).unwrap();
    f.write_all(b"Dieser Inhalt wird gehasht!").unwrap();
    
    // Hash berechnen
    match Dateipruefer::berechne_sha256(test_pfad) {
        Ok(hash) => println!("SHA-256 Hash der Datei: {}", hash),
        Err(e) => eprintln!("Fehler beim Hashen: {}", e),
    }

    // Aufräumen
    let _ = std::fs::remove_file(test_pfad);
}
```

---

## Projekt 57: URL-Parser und Query-Parameter-Extraktor mit `url`

```rust
use url::Url;
use std::collections::HashMap;

struct UrlAnalysator;

impl UrlAnalysator {
    // 🔍 Extrahiert die Query-Parameter einer URL in eine HashMap
    fn extrahiere_parameter(url_text: &str) -> Result<HashMap<String, String>, url::ParseError> {
        // 📦 Nutze das url-Crate, um den String zu parsen
        let parsed_url = Url::parse(url_text)?;
        let mut parameter_map = HashMap::new();

        // 🔍 Iteriere über die Query-Schlüssel-Wert-Paare der URL
        for (schluessel, wert) in parsed_url.query_pairs() {
            parameter_map.insert(schluessel.into_owned(), wert.into_owned());
        }

        Ok(parameter_map)
    }
}

fn main() {
    let test_url = "https://www.beispiel.de/suche?q=rust&lang=de&page=2";
    
    match UrlAnalysator::extrahiere_parameter(test_url) {
        Ok(params) => {
            println!("Query-Parameter gefunden:");
            for (k, v) in params {
                println!("- {}: {}", k, v);
            }
        }
        Err(e) => eprintln!("Fehler beim Parsen der URL: {}", e),
    }
}
```

---

## Projekt 58: CSV-Berichtsgenerator mit `csv` und `serde`

```rust
use serde::{Serialize, Deserialize};
use std::io;

#[derive(Serialize, Deserialize, Debug)]
struct Transaktion {
    produkt: String,
    menge: u32,
    preis: f64,
}

struct CSVVerwalter;

impl CSVVerwalter {
    // 🗃️ Schreibt eine Liste von Transaktionen als CSV-Daten in einen Standard-Writer
    fn erstelle_bericht<W: io::Write>(transaktionen: &[Transaktion], ziel: W) -> Result<(), csv::Error> {
        // 📦 Erstellt einen CSV-Writer
        let mut writer = csv::Writer::from_writer(ziel);
        for t in transaktionen {
            writer.serialize(t)?;
        }
        writer.flush()?;
        Ok(())
    }
}

fn main() {
    let daten = vec![
        Transaktion { produkt: "Buch".to_string(), menge: 3, preis: 12.99 },
        Transaktion { produkt: "Stift".to_string(), menge: 10, preis: 1.50 },
    ];

    // CSV-Ausgabe direkt in den Konsolen-Stream (stdout) leiten
    println!("Generierter CSV-Inhalt:");
    let stdout = io::stdout();
    if let Err(e) = CSVVerwalter::erstelle_bericht(&daten, stdout.lock()) {
        eprintln!("Fehler beim Erstellen des Berichts: {}", e);
    }
}
```

---

## Projekt 59: CLI-Argumenten-Parser für System-Informationen mit `clap`

```rust
use clap::Parser;

// 📦 Struct repräsentiert die Kommandozeilenargumente
// 'Parser' wird von clap abgeleitet, um die CLI-Optionen zu definieren.
#[derive(Parser, Debug)]
#[command(name = "SysInfo", version = "1.0", about = "Gibt System-Infos aus")]
struct CliArgs {
    /// Aktiviert detaillierte Debug-Informationen
    #[arg(short, long)]
    verbose: bool,

    /// Der auszugebende Berichtstyp (z. B. "cpu", "speicher")
    #[arg(short, long, default_value = "cpu")]
    typ: String,
}

fn main() {
    // 📦 Das clap-Crate parst die CLI-Argumente automatisch zur Laufzeit
    // Bei Aufruf mit '--help' wird automatisch ein Hilfetext generiert.
    let args = CliArgs::parse();

    println!("Gewählter Modus: {}", args.typ);
    if args.verbose {
        println!("Details: Verbose-Modus ist aktiv.");
    }
}
```

---

## Projekt 60: Lokale Zeitzonen-Konvertierung mit `chrono`

```rust
use chrono::{DateTime, Utc, TimeZone, FixedOffset};

struct Termin {
    name: String,
    zeit_utc: DateTime<Utc>,
}

impl Termin {
    fn neue_zeit_in_zeitzone(&self, stunden_offset: i32) -> Option<DateTime<FixedOffset>> {
        // 📅 Erstelle einen Zeitzonen-Offset (z.B. +2 Stunden für Mitteleuropa)
        let offset = FixedOffset::east_opt(stunden_offset * 3600)?;
        // 📅 Konvertiere das UTC-Datum in die Ziel-Zeitzone
        Some(self.zeit_utc.with_timezone(&offset))
    }
}

fn main() {
    let besprechung = Termin {
        name: "Standup Meeting".to_string(),
        zeit_utc: Utc::now(),
    };

    println!("Termin: {}", besprechung.name);
    println!("UTC-Zeit:        {}", besprechung.zeit_utc.format("%H:%M:%S UTC"));

    // Konvertiere zu +2 Stunden Offset (z.B. MESZ)
    if let Some(lokal_zeit) = besprechung.neue_zeit_in_zeitzone(2) {
        println!("Deutsche Zeit:   {}", lokal_zeit.format("%H:%M:%S UTC+2"));
    }
}
```

---

## Projekt 61: HTTP-GET-Client zur IP-Abfrage mit `reqwest` und `tokio`

```rust
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct IpResponse {
    ip: String,
}

// 📦 Asynchroner Einstiegspunkt über das tokio-Crate
// Ermöglicht die Verwendung von .await für nicht-blockierende Netzwerkzugriffe
#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let url = "https://api.ipify.org?format=json";

    println!("Rufe öffentliche IP-Adresse von '{}' ab...", url);

    // 📦 HTTP-Anfrage asynchron senden und JSON-Antwort parsen
    let response: IpResponse = reqwest::get(url)
        .await?
        .json()
        .await?;

    println!("Deine öffentliche IP-Adresse lautet: {}", response.ip);
    Ok(())
}
```

---

## Projekt 62: Passwort-Generierung mit `rand`

```rust
use rand::seq::SliceRandom; // 🎲 Trait für das zufällige Auswählen aus Slices

struct PasswortKonfigurator {
    laenge: usize,
    zahlen_erlaubt: bool,
    sonderzeichen_erlaubt: bool,
}

impl PasswortKonfigurator {
    fn generiere(&self) -> String {
        let mut buchstaben = b"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".to_vec();
        let zahlen = b"0123456789";
        let sonderzeichen = b"!@#$%^&*()_+-=";

        let mut zeichensatz = buchstaben;
        if self.zahlen_erlaubt {
            zeichensatz.extend_from_slice(zahlen);
        }
        if self.sonderzeichen_erlaubt {
            zeichensatz.extend_from_slice(sonderzeichen);
        }

        let mut rng = rand::thread_rng();
        let mut passwort = String::new();

        for _ in 0..self.laenge {
            // 🎲 Wähle zufällig ein Byte aus dem Zeichensatz
            if let Some(&zeichen) = zeichensatz.choose(&mut rng) {
                passwort.push(zeichen as char);
            }
        }

        passwort
    }
}

fn main() {
    let generator = PasswortKonfigurator {
        laenge: 16,
        zahlen_erlaubt: true,
        sonderzeichen_erlaubt: true,
    };

    let pw = generator.generiere();
    println!("Generiertes sicheres Passwort: {}", pw);
}
```

---

## Projekt 63: Base64-Codierer/Decodierer für Binärdaten mit `base64`

```rust
use base64::{Engine as _, engine::general_purpose::STANDARD};

struct Base64Konverter;

impl Base64Konverter {
    // 📦 Codiert Text- oder Binärdaten in einen Base64-String
    fn codiere(daten: &[u8]) -> String {
        STANDARD.encode(daten)
    }

    // 🛡️ Versucht einen Base64-String zu decodieren
    fn decodiere(base64_text: &str) -> Result<Vec<u8>, base64::DecodeError> {
        STANDARD.decode(base64_text)
    }
}

fn main() {
    let original = "Rust ist fantastisch!";
    
    // Codiere
    let codiert = Base64Konverter::codiere(original.as_bytes());
    println!("Original: {}", original);
    println!("Base64:   {}", codiert);

    // Decodiere
    match Base64Konverter::decodiere(&codiert) {
        Ok(decodierte_bytes) => {
            let decodiert_string = String::from_utf8(decodierte_bytes).unwrap();
            println!("Decodiert: {}", decodiert_string);
        }
        Err(e) => eprintln!("Fehler beim Decodieren: {}", e),
    }
}
```

---

## Projekt 64: Logging-System für Anwendungs-Events mit `log` und `env_logger`

```rust
use log::{info, warn, error};

fn initialisiere_logger() {
    // 📦 Initialisiert das Logging-System über env_logger
    // Das Verhalten kann zur Laufzeit über Umgebungsvariablen gesteuert werden (z. B. RUST_LOG=info)
    env_logger::init();
}

fn pruefe_system(temperatur: f64) {
    if temperatur > 90.0 {
        error!("System überhitzt! Aktuelle Temperatur: {}°C", temperatur);
    } else if temperatur > 75.0 {
        warn!("Erhöhte Temperatur gemeldet: {}°C", temperatur);
    } else {
        info!("System läuft im Normalbereich: {}°C", temperatur);
    }
}

fn main() {
    // Falls keine Systemvariable RUST_LOG gesetzt ist, setzen wir einen Default
    std::env::set_var("RUST_LOG", "info");
    initialisiere_logger();

    println!("Starte Systemüberwachung...");
    pruefe_system(55.3);
    pruefe_system(78.5);
    pruefe_system(93.1);
}
```

---

## Projekt 65: IP-Netzwerk-Rechner mit `ipnetwork`

```rust
use ipnetwork::Ipv4Network;

struct NetzwerkRechner;

impl NetzwerkRechner {
    // 🔍 Analysiert ein CIDR-Netzwerk (z. B. 192.168.1.0/24)
    fn analysiere_netzwerk(cidr: &str) -> Result<(), ipnetwork::IpNetworkError> {
        // 📦 Nutze das ipnetwork Crate, um IP und Subnetz zu parsen
        let netzwerk: Ipv4Network = cidr.parse()?;

        println!("Netzwerk:         {}", cidr);
        println!("Netzwerk-Adresse: {}", netzwerk.network());
        println!("Subnetzmaske:     {}", netzwerk.mask());
        println!("Broadcast-Adr.:   {}", netzwerk.broadcast());
        println!("Anzahl IPs:       {}", netzwerk.size());

        Ok(())
    }
}

fn main() {
    let netz = "192.168.178.0/24";
    if let Err(e) = NetzwerkRechner::analysiere_netzwerk(netz) {
        eprintln!("Fehler beim Analysieren des Subnetzes: {}", e);
    }
}
```

---

## Projekt 66: Konfigurationsdatei-Parser für TOML mit `toml` und `serde`

```rust
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
struct ServerConfig {
    host: String,
    port: u16,
    max_verbindungen: u32,
}

struct ConfigVerwalter;

impl ConfigVerwalter {
    // 📦 Parsen einer TOML-Zeichenkette in ein ServerConfig Struct
    fn lade_aus_toml(toml_inhalt: &str) -> Result<ServerConfig, toml::de::Error> {
        toml::from_str(toml_inhalt)
    }

    // 📦 Serialisieren einer ServerConfig in das TOML-Format
    fn erstelle_toml(config: &ServerConfig) -> Result<String, toml::ser::Error> {
        toml::to_string_pretty(config)
    }
}

fn main() {
    let toml_daten = r#"
        host = "127.0.0.1"
        port = 8080
        max_verbindungen = 1000
    "#;

    match ConfigVerwalter::lade_aus_toml(toml_daten) {
        Ok(config) => {
            println!("Geladene Konfiguration: {:?}", config);
            
            // Konvertiere zurück zu TOML
            let neu_toml = ConfigVerwalter::erstelle_toml(&config).unwrap();
            println!("Generiertes TOML:\n{}", neu_toml);
        }
        Err(e) => eprintln!("Fehler beim Parsen des TOML: {}", e),
    }
}
```

---

## Projekt 67: SemVer-Versionsvergleicher mit `semver`

```rust
use semver::{Version, VersionReq};

struct PluginSchnittstelle;

impl PluginSchnittstelle {
    // 🔍 Prüft, ob eine Plugin-Version mit den Anforderungen der App kompatibel ist
    fn ist_kompatibel(plugin_version: &str, app_anforderung: &str) -> Result<bool, semver::Error> {
        // 📦 Parsen der Plugin-Version und der Versionsanforderung
        let version = Version::parse(plugin_version)?;
        let anforderung = VersionReq::parse(app_anforderung)?;

        // 🔍 Überprüfung der Kompatibilität
        Ok(anforderung.matches(&version))
    }
}

fn main() {
    let anforderung = ">=1.2.0, <2.0.0";
    let plugin1 = "1.5.3";
    let plugin2 = "2.0.1";

    let c1 = PluginSchnittstelle::ist_kompatibel(plugin1, anforderung).unwrap();
    let c2 = PluginSchnittstelle::ist_kompatibel(plugin2, anforderung).unwrap();

    println!("App-Anforderung: '{}'", anforderung);
    println!("Plugin {} kompatibel? {}", plugin1, c1); // true
    println!("Plugin {} kompatibel? {}", plugin2, c2); // false
}
```

---

## Projekt 68: Temporäre Dateien und Verzeichnisse für Tests mit `tempfile`

```rust
use tempfile::NamedTempFile;
use std::fs::File;
use std::io::{self, Write, Read};

struct TemporaererSpeicher;

impl TemporaererSpeicher {
    // 🛡️ Schreibt Daten in eine temporäre Datei, die sich beim Verlassen des Scopes selbst löscht
    fn schreibe_temporaere_daten(inhalt: &str) -> Result<String, io::Error> {
        // 📦 Erstellt eine neue temporäre Datei auf dem System
        let mut temp_datei = NamedTempFile::new()?;
        
        temp_datei.write_all(inhalt.as_bytes())?;
        
        // 🔍 Pfad der temporären Datei ermitteln
        let pfad = temp_datei.path().to_string_lossy().into_owned();
        
        // Die Datei bleibt geöffnet und wird gelöscht, sobald `temp_datei`
        // aus dem Scope fällt und gedroppt wird.
        Ok(pfad)
    }
}

fn main() {
    let daten = "Dies sind hochgeheime, temporäre Testdaten.";
    
    match TemporaererSpeicher::schreibe_temporaere_daten(daten) {
        Ok(pfad) => {
            println!("Temporäre Datei erstellt unter: {}", pfad);
            // Überprüfen, ob die Datei existiert
            assert!(std::path::Path::new(&pfad).exists());
        }
        Err(e) => eprintln!("Fehler: {}", e),
    }
    // Nach dem Match-Scope ist die Datei automatisch gelöscht.
}
```

---

## Projekt 69: Glob-Pattern-Dateisuche mit `glob`

```rust
use glob::glob;
use std::path::PathBuf;

struct Dateisucher;

impl Dateisucher {
    // 🔍 Findet alle Dateien im aktuellen Verzeichnis, die einem Muster entsprechen
    fn finde_dateien(muster: &str) -> Result<Vec<PathBuf>, glob::PatternError> {
        let mut gefundene_pfade = Vec::new();

        // 📦 Führt die Mustersuche im Dateisystem aus (z. B. "*.json")
        for eintrag in glob(muster)? {
            if let Ok(pfad) = eintrag {
                gefundene_pfade.push(pfad);
            }
        }

        Ok(gefundene_pfade)
    }
}

fn main() {
    let such_muster = "*.json";
    println!("Suche nach Dateien im Format: '{}'", such_muster);
    
    match Dateisucher::finde_dateien(such_muster) {
        Ok(dateien) => {
            for d in dateien {
                println!("- {}", d.display());
            }
        }
        Err(e) => eprintln!("Musterfehler: {}", e),
    }
}
```

---

## Projekt 70: HTML-Scraper für Überschriften mit `scraper`

```rust
use scraper::{Html, Selector};

struct HtmlAnalysator;

impl HtmlAnalysator {
    // 🔍 Extrahiert den Text aller H1-Überschriften aus einem HTML-Dokument
    fn extrahiere_h1(html_dokument: &str) -> Vec<String> {
        // 📦 Parsen des HTML-Inhalts mit dem scraper-Crate
        let parsed_html = Html::parse_document(html_dokument);
        
        // 📦 Erstellen eines CSS-Selektors für h1-Tags
        let h1_selektor = Selector::parse("h1").expect("Ungültiger CSS-Selektor");
        
        let mut ueberschriften = Vec::new();
        // 🔍 Iteriere über alle HTML-Elemente, die dem Selektor entsprechen
        for element in parsed_html.select(&h1_selektor) {
            // Text-Inhalte sammeln und verbinden
            ueberschriften.push(element.text().collect::<Vec<_>>().join(""));
        }

        ueberschriften
    }
}

fn main() {
    let html = r#"
        <!DOCTYPE html>
        <html>
        <body>
            <h1>Lerne Rust durch Beispiele</h1>
            <p>Ein Paragraph.</p>
            <h1>Kapitel 4: Cargo & Crates</h1>
        </body>
        </html>
    "#;

    let h1_texte = HtmlAnalysator::extrahiere_h1(html);
    println!("Gefundene Überschriften:");
    for t in h1_texte {
        println!("- {}", t);
    }
}
```

---

## Projekt 71: Tar-Archiv-Ersteller mit `tar` und `flate2`

```rust
use std::fs::File;
use flate2::write::GzEncoder;
use flate2::Compression;
use std::io;

struct Archivierer;

impl Archivierer {
    // 📦 Packt und komprimiert ein Verzeichnis in eine .tar.gz Datei
    fn packe_verzeichnis(ordner_pfad: &str, archiv_pfad: &str) -> Result<(), io::Error> {
        let tar_gz_datei = File::create(archiv_pfad)?;
        
        // 📦 GzEncoder komprimiert die Daten mit Gzip
        let enc = GzEncoder::new(tar_gz_datei, Compression::default());
        
        // 📦 Builder aus dem tar-Crate schreibt die Tar-Archiv-Struktur
        let mut tar_builder = tar::Builder::new(enc);
        
        // 📦 Fügt das Verzeichnis dem Archiv hinzu
        tar_builder.append_dir_all(".", ordner_pfad)?;
        tar_builder.finish()?;
        
        Ok(())
    }
}

fn main() {
    let ordner = "."; // Aktuelles Verzeichnis
    let archiv = "test_archiv.tar.gz";

    println!("Packe Verzeichnis '{}' in '{}'...", ordner, archiv);
    if let Err(e) = Archivierer::packe_verzeichnis(ordner, archiv) {
        eprintln!("Fehler beim Archivieren: {}", e);
    } else {
        println!("Archiv erfolgreich erstellt.");
        let _ = std::fs::remove_file(archiv); // Gleich wieder aufräumen
    }
}
```

---

## Projekt 72: JWT-Token-Generator und -Prüfer mit `jsonwebtoken` und `serde`

```rust
use serde::{Serialize, Deserialize};
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    company: String,
    exp: usize,
}

struct TokenManager;

impl TokenManager {
    // 🔑 Generiert ein JWT (JSON Web Token) mit HS256-Signatur
    fn erstelle_token(claims: &Claims, geheimnis: &[u8]) -> Result<String, jsonwebtoken::errors::Error> {
        encode(
            &Header::default(),
            claims,
            &EncodingKey::from_secret(geheimnis)
        )
    }

    // 🛡️ Validiert das JWT und extrahiert die Claims
    fn validiere_token(token: &str, geheimnis: &[u8]) -> Result<Claims, jsonwebtoken::errors::Error> {
        let validation = Validation::new(Algorithm::HS256);
        let token_data = decode::<Claims>(
            token,
            &DecodingKey::from_secret(geheimnis),
            &validation
        )?;
        Ok(token_data.claims)
    }
}

fn main() {
    let geheimnis = b"super-geheimes-salz";
    let claims = Claims {
        sub: "thorsten@example.com".to_string(),
        company: "Rust-Lernende".to_string(),
        exp: 10000000000, // Zeitstempel in der fernen Zukunft
    };

    // Generieren
    let token = TokenManager::erstelle_token(&claims, geheimnis).unwrap();
    println!("Generiertes JWT: {}", token);

    // Validieren
    match TokenManager::validiere_token(&token, geheimnis) {
        Ok(geladene_claims) => {
            println!("Token ist gültig für: {}", geladene_claims.sub);
        }
        Err(e) => eprintln!("Token-Validierungsfehler: {}", e),
    }
}
```

---

## Projekt 73: Terminal-Fortschrittsbalken-Simulation mit `indicatif`

```rust
use indicatif::{ProgressBar, ProgressStyle};
use std::thread;
use std::time::Duration;

struct FortschrittsSimulant;

impl FortschrittsSimulant {
    fn simuliere_laden(schritte: u64) {
        // 📦 Erstellt einen Fortschrittsbalken über das indicatif-Crate
        let pb = ProgressBar::new(schritte);
        
        // 🎨 Formatieren des Fortschrittsbalkens mit Unicode-Zeichen
        pb.set_style(ProgressStyle::with_template("{spinner:.green} [{elapsed_precise}] [{wide_bar:.cyan/blue}] {pos}/{len} ({eta})")
            .unwrap()
            .progress_chars("#>-"));

        for _ in 0..schritte {
            pb.inc(1); // 📦 Fortschritt erhöhen
            thread::sleep(Duration::from_millis(20)); // Simuliert Rechenzeit
        }

        pb.finish_with_message("Ladevorgang abgeschlossen!");
    }
}

fn main() {
    println!("Starte Download-Simulation...");
    FortschrittsSimulant::simuliere_laden(50);
}
```

---

## Projekt 74: Thread-sichere globale Konfiguration mit `once_cell`

```rust
use once_cell::sync::Lazy; // 📦 Lazy sorgt für sichere, einmalige Initialisierung zur Laufzeit
use std::sync::Mutex;

struct SystemStatus {
    fehler_anzahl: u32,
}

// 📦 Thread-sicherer globaler Zustand, der erst bei der ersten Benutzung initialisiert wird
static GLOBALER_STATUS: Lazy<Mutex<SystemStatus>> = Lazy::new(|| {
    Mutex::new(SystemStatus { fehler_anzahl: 0 })
});

fn logge_fehler() {
    // 🧠 Mutex sperren, um thread-sicher auf den Zustand zuzugreifen
    if let Ok(mut status) = GLOBALER_STATUS.lock() {
        status.fehler_anzahl += 1;
        println!("Fehler geloggt. Gesamtfehler: {}", status.fehler_anzahl);
    }
}

fn main() {
    // Rufe die Funktion auf verschiedenen Stufen auf
    logge_fehler();
    logge_fehler();
}
```

---

## Projekt 75: YAML-Datenkonverter mit `serde_yaml` und `serde_json`

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct BenutzerProfil {
    benutzername: String,
    berechtigungen: Vec<String>,
    aktiviert: bool,
}

struct FormatKonverter;

impl FormatKonverter {
    // 📦 Konvertiert ein YAML-Dokument in ein JSON-Dokument
    fn yaml_zu_json(yaml_inhalt: &str) -> Result<String, String> {
        // 📦 Deserialisiere aus YAML
        let profil: BenutzerProfil = serde_yaml::from_str(yaml_inhalt)
            .map_err(|e| e.to_string())?;
        
        // 📦 Serialisiere in JSON
        let json_inhalt = serde_json::to_string_pretty(&profil)
            .map_err(|e| e.to_string())?;
            
        Ok(json_inhalt)
    }
}

fn main() {
    let yaml = r#"
        benutzername: Thorsten
        berechtigungen:
          - Admin
          - User
        aktiviert: true
    "#;

    match FormatKonverter::yaml_zu_json(yaml) {
        Ok(json) => println!("Umgewandeltes JSON:\n{}", json),
        Err(e) => eprintln!("Fehler bei Konvertierung: {}", e),
    }
}
```

---

## Phase 4: Projekte 76 bis 100 (Kombination)

In diesem vierten Teil der Phase 4 führen wir alle bisher gelernten Konzepte zusammen. Diese Projekte (76 bis 100) sind als komplexe, modulare Anwendungen aufgebaut, die externe Bibliotheken (Crates) einbinden und Cargo zur Abhängigkeitsverwaltung nutzen. Um die Programme in einem einzigen Dokument darzustellen und direkt compilierbar zu machen, werden Inline-Module (`mod name { ... }`) verwendet. Jedes Projekt enthält didaktische Kommentare, die den Einstieg erleichtern.

---

## Projekt 76: Modulares Krypto-Portfolio-Verwaltungssystem
Dieses Projekt kombiniert `HashMap`, structs, enums und modularer Programmierung, um Krypto-Bestände zu verwalten und deren Gesamtwert in JSON zu exportieren.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"

// 🧱 Modul für die Datenstrukturen und Portfolio-Verwaltung
mod portfolio {
    use std::collections::HashMap;
    use serde::{Serialize, Deserialize};

    // 🏷️ Enum für Krypto-Assets
    #[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq, Hash)]
    pub enum KryptoAsset {
        Bitcoin,
        Ethereum,
        Cardano,
    }

    // 📦 Struct für ein Portfolio
    #[derive(Debug, Serialize, Deserialize)]
    pub struct Portfolio {
        pub besitzer: String,
        // 🗃️ HashMap zur Zuordnung Asset -> Menge
        pub bestaende: HashMap<KryptoAsset, f64>,
    }

    impl Portfolio {
        pub fn neu(besitzer: String) -> Self {
            Portfolio {
                besitzer,
                bestaende: HashMap::new(),
            }
        }

        // 🧠 Borrowing: Wir verändern das Portfolio über &mut self
        pub fn hinzufügen(&mut self, asset: KryptoAsset, menge: f64) {
            let eintrag = self.bestaende.entry(asset).or_insert(0.0);
            *eintrag += menge;
        }
    }
}

// 🧱 Modul zur Berechnung des Gesamtwerts
mod bewertung {
    // 🔍 Importiert Typen aus dem Geschwistermodul 'portfolio'
    use super::portfolio::KryptoAsset;
    use std::collections::HashMap;

    pub fn berechne_gesamtwert(bestaende: &HashMap<KryptoAsset, f64>) -> f64 {
        let mut summe = 0.0;
        for (asset, menge) in bestaende {
            // 🔍 Pattern Matching zur Kursermittlung
            let kurs = match asset {
                KryptoAsset::Bitcoin => 55000.0,
                KryptoAsset::Ethereum => 3200.0,
                KryptoAsset::Cardano => 0.50,
            };
            summe += menge * kurs;
        }
        summe
    }
}

fn main() {
    // 🔍 Verwendung der Module über Pfade
    let mut mein_portfolio = portfolio::Portfolio::neu(String::from("Thorsten"));
    
    mein_portfolio.hinzufügen(portfolio::KryptoAsset::Bitcoin, 0.25);
    mein_portfolio.hinzufügen(portfolio::KryptoAsset::Ethereum, 1.5);

    // Gesamtwert berechnen
    let wert = bewertung::berechne_gesamtwert(&mein_portfolio.bestaende);

    // Serialisierung in JSON (simulierte externe crate)
    if let Ok(json) = serde_json::to_string_pretty(&mein_portfolio) {
        println!("Portfolio-Daten:\n{}", json);
    }
    println!("Aktueller Gesamtwert: {} EUR", wert);
}
```

---

## Projekt 77: CLI-Log-Analysator
Dieses Projekt parst simulierte Logdaten im Terminal, validiert das Format und erstellt Statistiken über Fehlermeldungen und Warnungen.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// regex = "1.10"
// chrono = "0.4"

// 🧱 Modul für das Parsen von Logzeilen
mod parser {
    use std::str::FromStr;

    #[derive(Debug, PartialEq, Eq, Hash)]
    pub enum LogLevel {
        Info,
        Warnung,
        Fehler,
    }

    impl FromStr for LogLevel {
        type Err = String;

        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s.to_uppercase().as_str() {
                "INFO" => Ok(LogLevel::Info),
                "WARN" | "WARNING" => Ok(LogLevel::Warnung),
                "ERROR" | "ERR" => Ok(LogLevel::Fehler),
                _ => Err(format!("Unbekanntes Log-Level: {}", s)),
            }
        }
    }

    pub struct LogEintrag {
        pub timestamp: String,
        pub level: LogLevel,
        pub nachricht: String,
    }

    // 🛡️ Fehlerbehandlung: Result gibt Aufschluss über Parse-Fehler
    pub fn parse_zeile(zeile: &str) -> Result<LogEintrag, String> {
        let teile: Vec<&str> = zeile.splitn(3, ' ').collect();
        if teile.len() < 3 {
            return Err(String::from("Zeilenformat ungültig. Erwartet: 'ZEIT LEVEL MESSAGE'"));
        }
        
        let level = LogLevel::from_str(teile[1])?;
        Ok(LogEintrag {
            timestamp: teile[0].to_string(),
            level,
            nachricht: teile[2].to_string(),
        })
    }
}

// 🧱 Modul für die Statistikerstellung
mod stats {
    use super::parser::{LogEintrag, LogLevel};
    use std::collections::HashMap;

    pub fn erstelle_statistik(einträge: &[LogEintrag]) -> HashMap<&LogLevel, usize> {
        let mut karte = HashMap::new();
        for eintrag in einträge {
            let zähler = karte.entry(&eintrag.level).or_insert(0);
            *zähler += 1;
        }
        karte
    }
}

fn main() {
    let log_zeilen = vec![
        "2026-07-12T15:00:00 INFO Server-Start",
        "2026-07-12T15:05:12 WARN Speicher_nahe_Limit",
        "2026-07-12T15:10:45 ERROR Verbindungsabbruch",
        "Ungültige Zeile ohne Struktur",
    ];

    let mut einträge = Vec::new();
    for zeile in log_zeilen {
        // 🔍 Pattern Matching zur Fehlerbehandlung
        match parser::parse_zeile(zeile) {
            Ok(eintrag) => einträge.push(eintrag),
            Err(e) => println!("Zeile übersprungen. Grund: {}", e),
        }
    }

    let statistik = stats::erstelle_statistik(&einträge);
    println!("\n--- Statistik ---");
    for (level, anzahl) in statistik {
        println!("{:?}: {} Mal", level, anzahl);
    }
}
```

---

## Projekt 78: Modulare Filmdatenbank mit Such- und Filterfunktionen
Verwaltung einer Filmdatenbank mit Modulen für Datenstrukturen, Genre-Filter und einer simulierten UI.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"

mod datenbank {
    use serde::{Serialize, Deserialize};

    #[derive(Debug, Clone, Serialize, Deserialize)]
    pub enum Genre {
        Action,
        Drama,
        SciFi,
        Komödie,
    }

    #[derive(Debug, Clone, Serialize, Deserialize)]
    pub struct Film {
        pub titel: String,
        pub genre: Genre,
        pub bewertung: u8,
    }

    pub struct FilmDb {
        // 🗃️ Speichert Filme in einem Vector
        filme: Vec<Film>,
    }

    impl FilmDb {
        pub fn neu() -> Self {
            FilmDb { filme: Vec::new() }
        }

        pub fn hinzufügen(&mut self, film: Film) {
            self.filme.push(film);
        }

        // 🧠 Borrowing: Rückgabe von Referenzen auf Filme
        pub fn alle_filme(&self) -> &[Film] {
            &self.filme
        }
    }
}

mod filter {
    use super::datenbank::{Film, Genre};

    pub fn filter_nach_genre(filme: &[Film], gesuchtes_genre: Genre) -> Vec<&Film> {
        let mut ergebnis = Vec::new();
        for film in filme {
            // 🔍 Discriminant-Vergleich für Enums
            if std::mem::discriminant(&film.genre) == std::mem::discriminant(&gesuchtes_genre) {
                ergebnis.push(film);
            }
        }
        ergebnis
    }
}

fn main() {
    let mut db = datenbank::FilmDb::neu();
    db.hinzufügen(datenbank::Film {
        titel: String::from("Inception"),
        genre: datenbank::Genre::SciFi,
        bewertung: 9,
    });
    db.hinzufügen(datenbank::Film {
        titel: String::from("The Dark Knight"),
        genre: datenbank::Genre::Action,
        bewertung: 10,
    });

    let scifi_filme = filter::filter_nach_genre(db.alle_filme(), datenbank::Genre::SciFi);
    
    println!("Gefundene Sci-Fi Filme:");
    for film in scifi_filme {
        println!("- {} (Bewertung: {}/10)", film.titel, film.bewertung);
    }
}
```

---

## Projekt 79: Konsolen-Chatserver-Simulation
Ein Chat-Protokoll-Simulator mit Unique-User-IDs (`uuid`) und Fehlerüberprüfung für ungültige Verbindungen.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// uuid = { version = "1.6", features = ["v4"] }

mod server {
    use std::collections::HashMap;
    use uuid::Uuid;

    pub struct Client {
        pub id: Uuid,
        pub name: String,
    }

    pub struct ChatServer {
        clients: HashMap<Uuid, Client>,
        nachrichten_verlauf: Vec<String>,
    }

    impl ChatServer {
        pub fn neu() -> Self {
            ChatServer {
                clients: HashMap::new(),
                nachrichten_verlauf: Vec::new(),
            }
        }

        // 🛡️ Fehlerbehandlung bei leeren Namen
        pub fn client_verbinden(&mut self, name: String) -> Result<Uuid, String> {
            if name.trim().is_empty() {
                return Err(String::from("Name darf nicht leer sein."));
            }
            
            let id = Uuid::new_v4();
            let client = Client { id, name: name.clone() };
            self.clients.insert(id, client);
            self.nachrichten_verlauf.push(format!("Server: {} ist beigetreten.", name));
            Ok(id)
        }

        pub fn nachricht_senden(&mut self, absender_id: Uuid, text: &str) -> Result<(), String> {
            match self.clients.get(&absender_id) {
                Some(client) => {
                    let nachricht = format!("{}: {}", client.name, text);
                    self.nachrichten_verlauf.push(nachricht);
                    Ok(())
                }
                None => Err(String::from("Nicht autorisierter Client.")),
            }
        }

        pub fn zeige_verlauf(&self) {
            println!("\n--- Chat Verlauf ---");
            for msg in &self.nachrichten_verlauf {
                println!("{}", msg);
            }
        }
    }
}

fn main() {
    let mut server = server::ChatServer::neu();

    let client1 = match server.client_verbinden(String::from("Alice")) {
        Ok(id) => id,
        Err(e) => panic!("Fehler bei Alice: {}", e),
    };

    let client2 = match server.client_verbinden(String::from("Bob")) {
        Ok(id) => id,
        Err(e) => panic!("Fehler bei Bob: {}", e),
    };

    let _ = server.nachricht_senden(client1, "Hallo zusammen!");
    let _ = server.nachricht_senden(client2, "Hi Alice!");

    server.zeige_verlauf();
}
```

---

## Projekt 80: Modulare Lagerverwaltung mit Barcode-Simulator
Das Projekt lagert Artikel ein und generiert mithilfe der `rand`-Bibliothek zufällige Barcodes zur späteren Identifikation.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// rand = "0.8"

mod barcode {
    use rand::Rng;

    pub fn generiere_barcode() -> String {
        let mut rng = rand::thread_rng();
        let mut code = String::new();
        for _ in 0..8 {
            let ziffer = rng.gen_range(0..10);
            code.push_str(&ziffer.to_string());
        }
        code
    }
}

mod lager {
    use std::collections::HashMap;

    pub struct Artikel {
        pub name: String,
        pub menge: u32,
    }

    pub struct LagerVerwaltung {
        inventar: HashMap<String, Artikel>,
    }

    impl LagerVerwaltung {
        pub fn neu() -> Self {
            LagerVerwaltung {
                inventar: HashMap::new(),
            }
        }

        pub fn artikel_einlagern(&mut self, name: String, menge: u32) -> String {
            // 🔍 Aufruf des Nachbarmoduls
            let code = super::barcode::generiere_barcode();
            let artikel = Artikel { name, menge };
            self.inventar.insert(code.clone(), artikel);
            code
        }

        pub fn finde_artikel(&self, barcode: &str) -> Option<&Artikel> {
            self.inventar.get(barcode)
        }
    }
}

fn main() {
    let mut mein_lager = lager::LagerVerwaltung::neu();

    let code1 = mein_lager.artikel_einlagern(String::from("Rust Handbuch"), 50);
    let code2 = mein_lager.artikel_einlagern(String::from("Kaffeebecher"), 200);

    println!("Rust Handbuch Barcode: {}", code1);
    
    if let Some(artikel) = mein_lager.finde_artikel(&code1) {
        println!("Gefunden: {} (Bestand: {} Stück)", artikel.name, artikel.menge);
    }
}
```

---

## Projekt 81: Wetter-Aggregator mit Caching
Dieses Projekt demonstriert Zeitberechnungen via `chrono`, um abgelaufene Wettermessungen aus dem Cache zu verwerfen.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// chrono = "0.4"

mod wetter_api {
    pub struct WetterDaten {
        pub temperatur: f32,
        pub beschreibung: String,
    }

    pub fn hole_wetter(stadt: &str) -> WetterDaten {
        match stadt.to_lowercase().as_str() {
            "berlin" => WetterDaten { temperatur: 22.5, beschreibung: String::from("Sonnig") },
            _ => WetterDaten { temperatur: 15.0, beschreibung: String::from("Bewölkt") },
        }
    }
}

mod cache {
    use super::wetter_api::WetterDaten;
    use chrono::{DateTime, Utc, Duration};
    use std::collections::HashMap;

    pub struct CacheEintrag {
        pub daten: WetterDaten,
        pub zeitstempel: DateTime<Utc>,
    }

    pub struct WetterCache {
        speicher: HashMap<String, CacheEintrag>,
    }

    impl WetterCache {
        pub fn neu() -> Self {
            WetterCache {
                speicher: HashMap::new(),
            }
        }

        pub fn abfragen(&self, stadt: &str) -> Option<&WetterDaten> {
            if let Some(eintrag) = self.speicher.get(stadt) {
                // 🧠 TTL-Berechnung
                let alter = Utc::now() - eintrag.zeitstempel;
                if alter < Duration::minutes(5) {
                    return Some(&eintrag.daten);
                }
            }
            None
        }

        pub fn speichern(&mut self, stadt: String, daten: WetterDaten) {
            let eintrag = CacheEintrag {
                daten,
                zeitstempel: Utc::now(),
            };
            self.speicher.insert(stadt, eintrag);
        }
    }
}

fn main() {
    let mut cache = cache::WetterCache::neu();
    let stadt = String::from("Berlin");

    let wetter = match cache.abfragen(&stadt) {
        Some(daten) => daten,
        None => {
            let daten = wetter_api::hole_wetter(&stadt);
            cache.speichern(stadt.clone(), daten);
            cache.abfragen(&stadt).unwrap()
        }
    };

    println!("Temperatur in Berlin: {}°C", wetter.temperatur);
}
```

---

## Projekt 82: Modulare Aufgabenverwaltung (Kanban-Board) mit JSON-Storage
Ein Kanban-Board, das seine Aufgabenstrukturen modular organisiert und in valides JSON exportiert.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"

mod kanban {
    use serde::{Serialize, Deserialize};

    #[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
    pub enum Status {
        ToDo,
        InProgress,
        Done,
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Task {
        pub id: u32,
        pub titel: String,
        pub status: Status,
    }

    pub struct Board {
        pub tasks: Vec<Task>,
    }

    impl Board {
        pub fn neu() -> Self {
            Board { tasks: Vec::new() }
        }

        pub fn task_hinzufügen(&mut self, titel: String) {
            let id = (self.tasks.len() + 1) as u32;
            self.tasks.push(Task {
                id,
                titel,
                status: Status::ToDo,
            });
        }

        pub fn status_aendern(&mut self, id: u32, neuer_status: Status) -> Result<(), String> {
            for task in &mut self.tasks {
                if task.id == id {
                    task.status = neuer_status;
                    return Ok(());
                }
            }
            Err(format!("Task mit ID {} existiert nicht.", id))
        }
    }
}

mod speicher {
    use super::kanban::Task;
    
    pub fn in_json_exportieren(tasks: &[Task]) -> Result<String, String> {
        serde_json::to_string_pretty(tasks).map_err(|e| e.to_string())
    }
}

fn main() {
    let mut board = kanban::Board::neu();
    board.task_hinzufügen(String::from("Modul-System lernen"));
    let _ = board.status_aendern(1, kanban::Status::InProgress);

    if let Ok(json) = speicher::in_json_exportieren(&board.tasks) {
        println!("Board JSON Export:\n{}", json);
    }
}
```

---

## Projekt 83: Fitness-Tracker mit Kalorien- und Aktivitätsberechnung
Kombiniert Enums mit Strukturparametern (Laufen, Krafttraining) und berechnet modular die Aktivitäts-Kalorien.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// chrono = "0.4"

mod sport {
    pub enum Aktivitaet {
        Laufen { distanz_km: f32, zeit_min: u32 },
        Krafttraining { zeit_min: u32 },
    }

    impl Aktivitaet {
        pub fn berechne_kalorien(&self) -> u32 {
            match self {
                Aktivitaet::Laufen { distanz_km, zeit_min } => {
                    ((*distanz_km * 60.0) + (*zeit_min as f32 * 2.0)) as u32
                }
                Aktivitaet::Krafttraining { zeit_min } => zeit_min * 6,
            }
        }
    }
}

mod tracker {
    use super::sport::Aktivitaet;
    use chrono::{DateTime, Utc};

    pub struct Training {
        pub datum: DateTime<Utc>,
        pub aktivitaet: Aktivitaet,
    }

    pub struct FitnessTracker {
        pub name: String,
        pub trainings: Vec<Training>,
    }

    impl FitnessTracker {
        pub fn neu(name: &str) -> Self {
            FitnessTracker {
                name: name.to_string(),
                trainings: Vec::new(),
            }
        }

        pub fn training_loggen(&mut self, aktivitaet: Aktivitaet) {
            self.trainings.push(Training {
                datum: Utc::now(),
                aktivitaet,
            });
        }

        pub fn gesamt_kalorien(&self) -> u32 {
            self.trainings.iter().map(|t| t.aktivitaet.berechne_kalorien()).sum()
        }
    }
}

fn main() {
    let mut tracker = tracker::FitnessTracker::neu("Thorsten");
    tracker.training_loggen(sport::Aktivitaet::Laufen {
        distanz_km: 5.0,
        zeit_min: 30,
    });

    println!("Tracker für: {}", tracker.name);
    println!("Kalorien verbrannt: {} kcal", tracker.gesamt_kalorien());
}
```

---

## Projekt 84: Modulares Bibliothekssystem mit Verleihhistorie
Modulare Bibliotheksverwaltung mit UUID-Generierung und detaillierter Fehlerfortpflanzung im Fehlerfall.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// chrono = "0.4"
// uuid = { version = "1.6", features = ["v4"] }

mod bibliothek {
    use uuid::Uuid;
    use chrono::{DateTime, Utc, Duration};

    pub struct Buch {
        pub id: Uuid,
        pub titel: String,
        pub ausgeliehen_bis: Option<DateTime<Utc>>,
    }

    pub struct Bibliothek {
        buecher: Vec<Buch>,
    }

    impl Bibliothek {
        pub fn neu() -> Self {
            Bibliothek { buecher: Vec::new() }
        }

        pub fn buch_hinzufügen(&mut self, titel: &str) -> Uuid {
            let id = Uuid::new_v4();
            self.buecher.push(Buch {
                id,
                titel: titel.to_string(),
                ausgeliehen_bis: None,
            });
            id
        }

        pub fn ausleihen(&mut self, id: Uuid, tage: i64) -> Result<(), String> {
            for buch in &mut self.buecher {
                if buch.id == id {
                    if buch.ausgeliehen_bis.is_some() {
                        return Err(String::from("Buch ist bereits ausgeliehen."));
                    }
                    buch.ausgeliehen_bis = Some(Utc::now() + Duration::days(tage));
                    return Ok(());
                }
            }
            Err(String::from("Buch wurde nicht gefunden."))
        }
    }
}

fn main() {
    let mut bib = bibliothek::Bibliothek::neu();
    let id = bib.buch_hinzufügen("The Rust Programming Language");

    match bib.ausleihen(id, 14) {
        Ok(()) => println!("Erfolgreich ausgeliehen!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 85: Markdown-Parser für Überschriften und Listen
Verwendung von regulären Ausdrücken via `regex`, um Markdown-Syntaxzeilen zu erkennen und in HTML zu übersetzen.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// regex = "1.10"

mod parser {
    use regex::Regex;

    pub enum HtmlElement {
        Ueberschrift { ebene: usize, text: String },
        Listenpunkt(String),
        Absatz(String),
    }

    pub fn parse_zeile(zeile: &str) -> HtmlElement {
        let re_h = Regex::new(r"^(#+)\s+(.*)$").unwrap();
        let re_li = Regex::new(r"^[-*]\s+(.*)$").unwrap();

        if let Some(caps) = re_h.captures(zeile) {
            let ebene = caps.get(1).unwrap().as_str().len();
            let text = caps.get(2).unwrap().as_str().to_string();
            HtmlElement::Ueberschrift { ebene, text }
        } else if let Some(caps) = re_li.captures(zeile) {
            let text = caps.get(1).unwrap().as_str().to_string();
            HtmlElement::Listenpunkt(text)
        } else {
            HtmlElement::Absatz(zeile.to_string())
        }
    }
}

mod generator {
    use super::parser::HtmlElement;

    pub fn zu_html(element: &HtmlElement) -> String {
        match element {
            HtmlElement::Ueberschrift { ebene, text } => {
                format!("<h{}>{}</h{}>", ebene, text, ebene)
            }
            HtmlElement::Listenpunkt(text) => format!("<li>{}</li>", text),
            HtmlElement::Absatz(text) => format!("<p>{}</p>", text),
        }
    }
}

fn main() {
    let markdown_zeilen = vec![
        "# Überschrift",
        "- Punkt 1",
        "Normaler Absatztext.",
    ];

    for zeile in markdown_zeilen {
        let el = parser::parse_zeile(zeile);
        println!("{}", generator::zu_html(&el));
    }
}
```

---

## Projekt 86: CLI-Passwort-Generator und Stärkemesser
Ein sicherer Passwortgenerator, der Zeichen per `rand` auswählt und das Ergebnis auf Komplexität prüft.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// rand = "0.8"

mod generator {
    use rand::Rng;

    pub fn generiere_passwort(laenge: usize) -> String {
        const ZEICHEN: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let mut rng = rand::thread_rng();
        let mut passwort = String::new();

        for _ in 0..laenge {
            let index = rng.gen_range(0..ZEICHEN.len());
            passwort.push(ZEICHEN[index] as char);
        }
        passwort
    }
}

mod bewertung {
    pub enum Staerke {
        Schwach,
        Mittel,
        Stark,
    }

    pub fn bewerte_passwort(pw: &str) -> Staerke {
        let hat_zahlen = pw.chars().any(|c| c.is_numeric());
        let hat_sonderzeichen = pw.chars().any(|c| !c.is_alphanumeric());
        
        match (pw.len(), hat_zahlen, hat_sonderzeichen) {
            (len, true, true) if len >= 12 => Staerke::Stark,
            (len, true, _) if len >= 8 => Staerke::Mittel,
            _ => Staerke::Schwach,
        }
    }
}

fn main() {
    let pw = generator::generiere_passwort(12);
    let level = match bewertung::bewerte_passwort(&pw) {
        bewertung::Staerke::Schwach => "Schwach",
        bewertung::Staerke::Mittel => "Mittel",
        bewertung::Staerke::Stark => "Stark",
    };
    println!("Generiertes Passwort: {}", pw);
    println!("Passwortstärke: {}", level);
}
```

---

## Projekt 87: Modulares Text-Adventure mit Zustandsspeicherung
Zustandsspeicherung eines Spielers (Schlüsselbesitz, aktueller Raum) in einem Text-Adventure, serialisiert in JSON.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"

mod spielwelt {
    use serde::{Serialize, Deserialize};

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub enum Raum {
        Eingang,
        Bibliothek,
        Schatzkammer,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Spieler {
        pub name: String,
        pub aktueller_raum: Raum,
        pub schluessel_gefunden: bool,
    }

    impl Spieler {
        pub fn neu(name: &str) -> Self {
            Spieler {
                name: name.to_string(),
                aktueller_raum: Raum::Eingang,
                schluessel_gefunden: false,
            }
        }
    }
}

mod engine {
    use super::spielwelt::{Spieler, Raum};

    pub fn bewege_spieler(spieler: &mut Spieler, ziel: Raum) -> Result<(), String> {
        match (&spieler.aktueller_raum, &ziel) {
            (Raum::Eingang, Raum::Bibliothek) => {
                spieler.aktueller_raum = ziel;
                spieler.schluessel_gefunden = true;
                Ok(())
            }
            (Raum::Bibliothek, Raum::Schatzkammer) => {
                if spieler.schluessel_gefunden {
                    spieler.aktueller_raum = ziel;
                    Ok(())
                } else {
                    Err(String::from("Die Schatzkammer ist verschlossen!"))
                }
            }
            _ => Err(String::from("Dieser Weg ist nicht möglich.")),
        }
    }
}

fn main() {
    let mut held = spielwelt::Spieler::neu("Thorsten");
    let _ = engine::bewege_spieler(&mut held, spielwelt::Raum::Bibliothek);

    if let Ok(json) = serde_json::to_string(&held) {
        println!("Speicherdaten: {}", json);
    }
}
```

---

## Projekt 88: Ausgaben-Tracker mit statistischer Auswertung
Verwalter Ausgaben mit Kategorien und summiert diese in einer HashMap für eine übersichtliche Finanzauswertung.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// chrono = "0.4"

mod ausgaben {
    use chrono::{DateTime, Utc};

    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
    pub enum Kategorie {
        Lebensmittel,
        Freizeit,
        Miete,
    }

    pub struct Ausgabe {
        pub datum: DateTime<Utc>,
        pub betrag: f64,
        pub kategorie: Kategorie,
    }
}

mod statistik {
    use super::ausgaben::{Ausgabe, Kategorie};
    use std::collections::HashMap;

    pub fn berechne_pro_kategorie(ausgaben: &[Ausgabe]) -> HashMap<Kategorie, f64> {
        let mut summen = HashMap::new();
        for a in ausgaben {
            let eintrag = summen.entry(a.kategorie).or_insert(0.0);
            *eintrag += a.betrag;
        }
        summen
    }
}

fn main() {
    use chrono::Utc;
    let meine_ausgaben = vec![
        ausgaben::Ausgabe {
            datum: Utc::now(),
            betrag: 15.50,
            kategorie: ausgaben::Kategorie::Lebensmittel,
        },
        ausgaben::Ausgabe {
            datum: Utc::now(),
            betrag: 50.00,
            kategorie: ausgaben::Kategorie::Freizeit,
        },
    ];

    let stats = statistik::berechne_pro_kategorie(&meine_ausgaben);
    for (kategorie, summe) in stats {
        println!("Kategorie {:?}: {} EUR", kategorie, summe);
    }
}
```

---

## Projekt 89: Quiz-Spiel mit Kategorien und Highscore-Tabelle
Das Projekt speichert Quizfragen und mischt deren Antwortoptionen mithilfe von `rand::seq::SliceRandom` vor der Anzeige.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// rand = "0.8"
// serde = { version = "1.0", features = ["derive"] }

mod quiz {
    use serde::{Serialize, Deserialize};

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Frage {
        pub frage: String,
        pub antworten: Vec<String>,
        pub korrekter_index: usize,
    }
}

mod spiel {
    use super::quiz::Frage;
    use rand::seq::SliceRandom;

    pub fn mische_antworten(frage: &Frage) -> (Vec<String>, usize) {
        let mut rng = rand::thread_rng();
        let mut indizes: Vec<usize> = (0..frage.antworten.len()).collect();
        indizes.shuffle(&mut rng);

        let gemischte_antworten = indizes.iter()
            .map(|&i| frage.antworten[i].clone())
            .collect();
            
        let neuer_index = indizes.iter().position(|&i| i == frage.korrekter_index).unwrap();
        (gemischte_antworten, neuer_index)
    }
}

fn main() {
    let q = quiz::Frage {
        frage: String::from("Welcher Typ vertritt Fehler in Rust?"),
        antworten: vec![String::from("Result"), String::from("Option"), String::from("Panic")],
        korrekter_index: 0,
    };

    let (gemischt, korrekter) = spiel::mische_antworten(&q);
    println!("Frage: {}", q.frage);
    for (i, ant) in gemischt.iter().enumerate() {
        println!("{}: {}", i, ant);
    }
    println!("Korrekte Antwort-Nummer: {}", korrekter);
}
```

---

## Projekt 90: Modulares E-Commerce-Warenkorb-System
Fügt Produkte mit eindeutigen UUIDs zu einem Warenkorb hinzu und führt eine Validierung beim Checkout durch.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// uuid = { version = "1.6", features = ["v4"] }

mod ecommerce {
    use uuid::Uuid;

    #[derive(Debug, Clone)]
    pub struct Produkt {
        pub id: Uuid,
        pub name: String,
        pub preis: f64,
    }

    pub struct Warenkorb {
        pub produkte: Vec<Produkt>,
    }

    impl Warenkorb {
        pub fn neu() -> Self {
            Warenkorb { produkte: Vec::new() }
        }

        pub fn hinzufügen(&mut self, produkt: Produkt) {
            self.produkte.push(produkt);
        }

        pub fn checkout(&self) -> Result<f64, String> {
            if self.produkte.is_empty() {
                return Err(String::from("Warenkorb leer."));
            }
            let summe: f64 = self.produkte.iter().map(|p| p.preis).sum();
            Ok(summe)
        }
    }
}

fn main() {
    use uuid::Uuid;
    let mut korb = ecommerce::Warenkorb::neu();
    korb.hinzufügen(ecommerce::Produkt {
        id: Uuid::new_v4(),
        name: String::from("Tastatur"),
        preis: 49.99,
    });

    match korb.checkout() {
        Ok(summe) => println!("Gesamtsumme: {} EUR", summe),
        Err(e) => println!("Checkout fehlgeschlagen: {}", e),
    }
}
```

---

## Projekt 91: DNS-Eintrag-Simulator mit Cache und TTL
Ein DNS-Server-Simulator, der Time-to-Live (TTL) für DNS-Auflösungen über Chrono-Zeitstempel cached.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// chrono = "0.4"

mod dns {
    pub enum RecordType {
        A,
        AAAA,
    }

    pub struct DnsRecord {
        pub domain: String,
        pub ip: String,
        pub record_type: RecordType,
    }
}

mod resolver {
    use super::dns::DnsRecord;
    use chrono::{DateTime, Utc, Duration};
    use std::collections::HashMap;

    pub struct CacheEintrag {
        pub ip: String,
        pub ablaufzeit: DateTime<Utc>,
    }

    pub struct DnsResolver {
        cache: HashMap<String, CacheEintrag>,
    }

    impl DnsResolver {
        pub fn neu() -> Self {
            DnsResolver { cache: HashMap::new() }
        }

        pub fn eintragen(&mut self, record: DnsRecord, ttl_sekunden: i64) {
            self.cache.insert(record.domain, CacheEintrag {
                ip: record.ip,
                ablaufzeit: Utc::now() + Duration::seconds(ttl_sekunden),
            });
        }

        pub fn auflösen(&self, domain: &str) -> Option<String> {
            if let Some(eintrag) = self.cache.get(domain) {
                if Utc::now() < eintrag.ablaufzeit {
                    return Some(eintrag.ip.clone());
                }
            }
            None
        }
    }
}

fn main() {
    let mut resolver = resolver::DnsResolver::neu();
    resolver.eintragen(dns::DnsRecord {
        domain: String::from("rust-lang.org"),
        ip: String::from("192.0.2.1"),
        record_type: dns::RecordType::A,
    }, 1);

    if let Some(ip) = resolver.auflösen("rust-lang.org") {
        println!("IP aufgelöst: {}", ip);
    }
}
```

---

## Projekt 92: Rezept-Verwalter mit Einkaufszettellisten-Generator
Aggregiert ausgewählte Rezepte und summiert die nötigen Zutatenmengen in einer vereinten Einkaufsliste.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// serde = { version = "1.0", features = ["derive"] }

mod rezepte {
    use std::collections::HashMap;

    pub struct Rezept {
        pub name: String,
        pub zutaten: HashMap<String, u32>,
    }
}

mod einkauf {
    use super::rezepte::Rezept;
    use std::collections::HashMap;

    pub fn generiere_liste(auswahl: &[&Rezept]) -> HashMap<String, u32> {
        let mut liste = HashMap::new();
        for rezept in auswahl {
            for (zutat, menge) in &rezept.zutaten {
                let eintrag = liste.entry(zutat.clone()).or_insert(0);
                *eintrag += menge;
            }
        }
        liste
    }
}

fn main() {
    let mut pfannkuchen = rezepte::Rezept {
        name: String::from("Pfannkuchen"),
        zutaten: std::collections::HashMap::new(),
    };
    pfannkuchen.zutaten.insert(String::from("Mehl"), 250);

    let auswahl = vec![&pfannkuchen];
    let einkaufsliste = einkauf::generiere_liste(&auswahl);

    for (zutat, menge) in einkaufsliste {
        println!("Zutat: {}, Menge: {}g", zutat, menge);
    }
}
```

---

## Projekt 93: CLI-Netzwerk-Ping-Simulator mit Latenzanalyse
Simuliert unzuverlässige Netzwerk-Pings via `rand` und wertet die Latenzen (Durchschnitt, Maximum) statistisch aus.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// rand = "0.8"

mod netzwerk {
    use rand::Rng;

    pub struct PingResult {
        pub erfolgreich: bool,
        pub latenz_ms: u32,
    }

    pub fn sende_ping() -> PingResult {
        let mut rng = rand::thread_rng();
        if rng.gen_bool(0.8) {
            PingResult { erfolgreich: true, latenz_ms: rng.gen_range(15..120) }
        } else {
            PingResult { erfolgreich: false, latenz_ms: 0 }
        }
    }
}

mod analyse {
    use super::netzwerk::PingResult;

    pub fn analysiere_pings(ergebnisse: &[PingResult]) {
        let erfolgreiche: Vec<&PingResult> = ergebnisse.iter().filter(|e| e.erfolgreich).collect();
        if erfolgreiche.is_empty() {
            println!("Fehler: Alle Pings fehlgeschlagen.");
            return;
        }
        let summe: u32 = erfolgreiche.iter().map(|e| e.latenz_ms).sum();
        println!("Durchschnitt: {} ms", summe / erfolgreiche.len() as u32);
    }
}

fn main() {
    let ergebnisse = vec![netzwerk::sende_ping(), netzwerk::sende_ping()];
    analyse::analysiere_pings(&ergebnisse);
}
```

---

## Projekt 94: Modulare Zeiterfassung für Freelancer
Ein modularer Zeittracker, der die Dauer gestarteter und gestoppter Tasks mithilfe von `chrono` misst.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// chrono = "0.4"
// serde = { version = "1.0", features = ["derive"] }

mod zeiterfassung {
    use chrono::{DateTime, Utc};
    use serde::{Serialize, Deserialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct TaskEintrag {
        pub task_name: String,
        pub start: DateTime<Utc>,
        pub ende: Option<DateTime<Utc>>,
    }

    pub struct Tracker {
        pub einträge: Vec<TaskEintrag>,
    }

    impl Tracker {
        pub fn neu() -> Self {
            Tracker { einträge: Vec::new() }
        }

        pub fn start_task(&mut self, name: &str) {
            self.einträge.push(TaskEintrag {
                task_name: name.to_string(),
                start: Utc::now(),
                ende: None,
            });
        }

        pub fn stop_task(&mut self) -> Result<(), String> {
            if let Some(letzter) = self.einträge.last_mut() {
                if letzter.ende.is_none() {
                    letzter.ende = Some(Utc::now());
                    return Ok(());
                }
            }
            Err(String::from("Kein offener Task gefunden."))
        }
    }
}

fn main() {
    let mut tracker = zeiterfassung::Tracker::neu();
    tracker.start_task("Rust Programmieren");
    let _ = tracker.stop_task();
    println!("Tasks aufgezeichnet: {}", tracker.einträge.len());
}
```

---

## Projekt 95: Vokabeltrainer mit Leitner-System
Simuliert ein Vokabel-Lernsystem mit drei Fächern. Falsche Antworten stufen die Karte zurück in Fach 1.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// rand = "0.8"

mod leitner {
    #[derive(Debug, Clone)]
    pub struct Vokabel {
        pub deutsch: String,
        pub englisch: String,
        pub fach: u8,
    }

    pub struct BoxSystem {
        pub karten: Vec<Vokabel>,
    }

    impl BoxSystem {
        pub fn neu() -> Self {
            BoxSystem { karten: Vec::new() }
        }

        pub fn karte_hinzufügen(&mut self, de: &str, en: &str) {
            self.karten.push(Vokabel {
                deutsch: de.to_string(),
                englisch: en.to_string(),
                fach: 1,
            });
        }

        pub fn bewerten(&mut self, index: usize, korrekt: bool) {
            if let Some(karte) = self.karten.get_mut(index) {
                if korrekt {
                    if karte.fach < 3 { karte.fach += 1; }
                } else {
                    karte.fach = 1;
                }
            }
        }
    }
}

fn main() {
    let mut box_system = leitner::BoxSystem::neu();
    box_system.karte_hinzufügen("Apfel", "apple");
    box_system.bewerten(0, true);
    println!("Fach für Apfel: {}", box_system.karten[0].fach);
}
```

---

## Projekt 96: Modulares Smart-Home-Energiemonitoring
Simulation von Stromverbrauchssensoren per `rand` und fortlaufende Aggregation im Zentralmonitor.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// rand = "0.8"

mod sensor {
    use rand::Rng;

    pub struct SensorMessung {
        pub geraete_id: u32,
        pub verbrauch_watt: f64,
    }

    pub fn lese_verbrauch(id: u32) -> SensorMessung {
        let mut rng = rand::thread_rng();
        SensorMessung {
            geraete_id: id,
            verbrauch_watt: rng.gen_range(5.0..100.0),
        }
    }
}

mod monitor {
    use super::sensor::SensorMessung;

    pub struct EnergyMonitor {
        messwerte: Vec<SensorMessung>,
    }

    impl EnergyMonitor {
        pub fn neu() -> Self {
            EnergyMonitor { messwerte: Vec::new() }
        }

        pub fn messung_hinzufügen(&mut self, messung: SensorMessung) {
            self.messwerte.push(messung);
        }

        pub fn gesamt_verbrauch(&self) -> f64 {
            self.messwerte.iter().map(|m| m.verbrauch_watt).sum()
        }
    }
}

fn main() {
    let mut monitor = monitor::EnergyMonitor::neu();
    monitor.messung_hinzufügen(sensor::lese_verbrauch(1));
    println!("Gesamtverbrauch: {} Watt", monitor.gesamt_verbrauch());
}
```

---

## Projekt 97: Simulierter Key-Value-Store mit Commit-Log
Zustandsspeicherung eines Key-Value-Stores mit Transaktions-Commit-Log, serialisiert über `serde_json`.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"

mod kv_store {
    use std::collections::HashMap;
    use serde::{Serialize, Deserialize};

    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub enum Operation {
        Set { key: String, val: String },
    }

    pub struct Store {
        daten: HashMap<String, String>,
        commit_log: Vec<Operation>,
    }

    impl Store {
        pub fn neu() -> Self {
            Store {
                daten: HashMap::new(),
                commit_log: Vec::new(),
            }
        }

        pub fn set(&mut self, key: String, val: String) {
            self.daten.insert(key.clone(), val.clone());
            self.commit_log.push(Operation::Set { key, val });
        }

        pub fn get(&self, key: &str) -> Option<&String> {
            self.daten.get(key)
        }

        pub fn export_log(&self) -> Result<String, String> {
            serde_json::to_string(&self.commit_log).map_err(|e| e.to_string())
        }
    }
}

fn main() {
    let mut store = kv_store::Store::neu();
    store.set(String::from("thema"), String::from("dunkel"));

    if let Ok(json) = store.export_log() {
        println!("Log: {}", json);
    }
}
```

---

## Projekt 98: Dateimanager-CLI-Tool (Simuliert)
Simuliert Dateibaumoperationen mit Zeitstempeln via `chrono` und unterscheidet zwischen Dateien und Ordnern.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// chrono = "0.4"

mod dateisystem {
    use chrono::{DateTime, Utc};

    pub enum DateiTyp {
        Datei,
        Ordner,
    }

    pub struct DateiNode {
        pub name: String,
        pub typ: DateiTyp,
        pub erstellungsdatum: DateTime<Utc>,
    }
}

mod manager {
    use super::dateisystem::{DateiNode, DateiTyp};

    pub struct Dateimanager {
        eintraege: Vec<DateiNode>,
    }

    impl Dateimanager {
        pub fn neu() -> Self {
            Dateimanager { eintraege: Vec::new() }
        }

        pub fn datei_erstellen(&mut self, name: &str, typ: DateiTyp) {
            self.eintraege.push(DateiNode {
                name: name.to_string(),
                typ,
                erstellungsdatum: chrono::Utc::now(),
            });
        }

        pub fn auflisten(&self) {
            for node in &self.eintraege {
                let prefix = match node.typ {
                    DateiTyp::Datei => "[F]",
                    DateiTyp::Ordner => "[D]",
                };
                println!("{} {} (Erstellt am: {})", prefix, node.name, node.erstellungsdatum);
            }
        }
    }
}

fn main() {
    let mut fm = manager::Dateimanager::neu();
    fm.datei_erstellen("skripte", dateisystem::DateiTyp::Ordner);
    fm.auflisten();
}
```

---

## Projekt 99: Modulares Ticketsystem für Support-Anfragen
Ticketsystem für Fehlerberichte mit UUIDs und Prioritäts-Enums, das per `find` nach Tickets sucht.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// uuid = { version = "1.6", features = ["v4"] }
// chrono = "0.4"

mod tickets {
    use uuid::Uuid;
    use chrono::{DateTime, Utc};

    #[derive(Debug, PartialEq)]
    pub enum Prioritaet {
        Niedrig,
        Hoch,
    }

    pub struct Ticket {
        pub id: Uuid,
        pub titel: String,
        pub prioritaet: Prioritaet,
        pub erstellt_am: DateTime<Utc>,
    }

    pub struct TicketSystem {
        tickets: Vec<Ticket>,
    }

    impl TicketSystem {
        pub fn neu() -> Self {
            TicketSystem { tickets: Vec::new() }
        }

        pub fn ticket_erstellen(&mut self, titel: &str, prio: Prioritaet) -> Uuid {
            let id = Uuid::new_v4();
            self.tickets.push(Ticket {
                id,
                titel: titel.to_string(),
                prioritaet: prio,
                erstellt_am: Utc::now(),
            });
            id
        }

        pub fn finde_ticket(&self, id: Uuid) -> Option<&Ticket> {
            self.tickets.iter().find(|t| t.id == id)
        }
    }
}

fn main() {
    let mut system = tickets::TicketSystem::neu();
    let id = system.ticket_erstellen("Datenbankfehler", tickets::Prioritaet::Hoch);

    if let Some(ticket) = system.finde_ticket(id) {
        println!("Ticket '{}' mit Prio {:?} gefunden.", ticket.titel, ticket.prioritaet);
    }
}
```

---

## Projekt 100: Modulares Projektmanagement-Tool mit Gantt-Simulierung
Das finale Kombinationsprojekt der Phase 4 implementiert ein modulares Projektplanungs-Tool, das Meilensteine verwaltet und ein vereinfachtes Gantt-Diagramm im Terminal ausgibt.

```rust
// 📦 Benötigte Abhängigkeiten in Cargo.toml:
// [dependencies]
// chrono = "0.4"
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"

mod model {
    use serde::{Serialize, Deserialize};

    #[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
    pub enum TaskStatus {
        Geplant,
        InArbeit,
        Abgeschlossen,
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Meilenstein {
        pub id: u32,
        pub beschreibung: String,
        pub dauer_tage: u32,
        pub status: TaskStatus,
    }
}

mod planung {
    use super::model::{Meilenstein, TaskStatus};

    pub struct ProjektPlan {
        pub projekt_name: String,
        pub meilensteine: Vec<Meilenstein>,
    }

    impl ProjektPlan {
        pub fn neu(name: &str) -> Self {
            ProjektPlan {
                projekt_name: name.to_string(),
                meilensteine: Vec::new(),
            }
        }

        pub fn meilenstein_hinzufügen(&mut self, beschreibung: &str, dauer: u32) {
            let id = (self.meilensteine.len() + 1) as u32;
            self.meilensteine.push(Meilenstein {
                id,
                beschreibung: beschreibung.to_string(),
                dauer_tage: dauer,
                status: TaskStatus::Geplant,
            });
        }

        pub fn status_aktualisieren(&mut self, id: u32, status: TaskStatus) -> Result<(), String> {
            for m in &mut self.meilensteine {
                if m.id == id {
                    m.status = status;
                    return Ok(());
                }
            }
            Err(format!("Meilenstein {} nicht gefunden.", id))
        }
    }
}

mod visualisierung {
    use super::planung::ProjektPlan;
    use super::model::TaskStatus;

    pub fn zeichne_diagramm(plan: &ProjektPlan) {
        println!("=== Projektplan: {} ===", plan.projekt_name);
        for m in &plan.meilensteine {
            let status_char = match m.status {
                TaskStatus::Geplant => "-",
                TaskStatus::InArbeit => "/",
                TaskStatus::Abgeschlossen => "#",
            };
            
            let balken = status_char.repeat(m.dauer_tage as usize);
            println!("{:<20} | {}", m.beschreibung, balken);
        }
    }
}

fn main() {
    let mut plan = planung::ProjektPlan::neu("Rust Migration");
    plan.meilenstein_hinzufügen("Analyse", 4);
    plan.meilenstein_hinzufügen("Refactoring", 6);

    let _ = plan.status_aktualisieren(1, model::TaskStatus::Abgeschlossen);
    let _ = plan.status_aktualisieren(2, model::TaskStatus::InArbeit);

    visualisierung::zeichne_diagramm(&plan);
}
```
