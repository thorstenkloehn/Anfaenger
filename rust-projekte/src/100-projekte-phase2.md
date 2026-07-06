# 100 Projekte - Themen anzeigen

Phase 2: Projekte für Thema unten lesen
Jedes Projekt übt alle:
* **Structs & Methoden (Die Basis):** Eigene Datentypen definieren und mit `impl` Methoden (Funktionen, die zu dem Struct gehören) hinzufügen.
* **Enums (Die Basis):** Eigene Aufzählungen erstellen, um feste Zustände oder Kategorien abzubilden.
* **Pattern Matching:** Der `match`-Ausdruck (mit Exhaustiveness Checking – der Compiler zwingt dich, jeden Fall abzudecken) und das kompakte `if let`.

Passives Auffrischen

| Thema | Was du lernst |
|---|---|
| 📦 Structs & Methoden | Eigene Datentypen & `impl`-Funktionen |
| 🏷️ Enums | Feste Zustände & Kategorien |
| 🔍 Pattern Matching | `match` (Exhaustiveness) & `if let` |

Hinweis: Alle Projekte zeigen nur fertigen Code und Kommentare an. Nur lesen!

---
## Projekt 1: Ampelschaltung
```rust
// 🏷️ Enum für die Ampelphasen
enum AmpelFarbe {
    Rot,
    Gelb,
    Gruen,
}

// 📦 Struct für die Ampel selbst
struct Ampel {
    id: i32,
    farbe: AmpelFarbe,
}

impl Ampel {
    // 📦 Methode zum Anzeigen des aktuellen Status
    fn anzeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.farbe {
            AmpelFarbe::Rot => println!("Ampel {}: ROT - Bitte stehen bleiben!", self.id),
            AmpelFarbe::Gelb => println!("Ampel {}: GELB - Bereitmachen!", self.id),
            AmpelFarbe::Gruen => println!("Ampel {}: GRÜN - Freie Fahrt!", self.id),
        }
    }
}

fn main() {
    let meine_ampel = Ampel {
        id: 1,
        farbe: AmpelFarbe::Rot,
    };
    meine_ampel.anzeigen();
}
```

---

## Projekt 2: Temperatur-Warnung
```rust
// 🏷️ Enum für die Warnstufe
enum Warnstufe {
    Normal,
    Warnung,
    Alarm,
}

// 📦 Struct für den Temperatursensor
struct Sensor {
    bezeichnung: String,
    temperatur: f64,
}

impl Sensor {
    // 📦 Methode zur Bestimmung der Warnstufe
    fn warnstufe(&self) -> Warnstufe {
        if self.temperatur > 80.0 {
            Warnstufe::Alarm
        } else if self.temperatur > 50.0 {
            Warnstufe::Warnung
        } else {
            Warnstufe::Normal
        }
    }
}

fn main() {
    let sensor = Sensor {
        bezeichnung: String::from("Hauptreaktor"),
        temperatur: 55.4,
    };
    
    // 🔍 Pattern Matching auf das Ergebnis der Methode
    match sensor.warnstufe() {
        Warnstufe::Normal => println!("Status von {}: Alles im grünen Bereich.", sensor.bezeichnung),
        Warnstufe::Warnung => println!("Status von {}: Achtung, Temperatur erhöht!", sensor.bezeichnung),
        Warnstufe::Alarm => println!("Status von {}: KRITISCH - Überhitzungsgefahr!", sensor.bezeichnung),
    }
}
```

---

## Projekt 3: Pizza-Größen
```rust
// 🏷️ Enum für die Pizzagrößen
enum PizzaGroesse {
    Klein,
    Mittel,
    Gross,
}

// 📦 Struct für die Pizza
struct Pizza {
    name: String,
    groesse: PizzaGroesse,
}

impl Pizza {
    // 📦 Methode zur Preisberechnung
    fn preis(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.groesse {
            PizzaGroesse::Klein => 6.50,
            PizzaGroesse::Mittel => 8.50,
            PizzaGroesse::Gross => 11.00,
        }
    }
}

fn main() {
    let bestellung = Pizza {
        name: String::from("Salami"),
        groesse: PizzaGroesse::Mittel,
    };
    println!("Pizza {} kostet {} Euro.", bestellung.name, bestellung.preis());
}
```

---

## Projekt 4: Buch-Ausleihe
```rust
// 🏷️ Enum für den Buchstatus
enum BuchStatus {
    Verfuegbar,
    Ausgeliehen,
}

// 📦 Struct für ein Buch
struct Buch {
    titel: String,
    status: BuchStatus,
}

impl Buch {
    // 📦 Methode zum Ausleihen
    fn ausleihen(&mut self) {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let BuchStatus::Verfuegbar = self.status {
            self.status = BuchStatus::Ausgeliehen;
            println!("Das Buch '{}' wurde erfolgreich ausgeliehen.", self.titel);
        } else {
            println!("Entschuldigung, '{}' ist bereits ausgeliehen.", self.titel);
        }
    }
}

fn main() {
    let mut mein_buch = Buch {
        titel: String::from("Der Rust-Führer"),
        status: BuchStatus::Verfuegbar,
    };
    mein_buch.ausleihen();
}
```

---

## Projekt 5: Münz-Zähler
```rust
// 🏷️ Enum für Münzen
enum Muenze {
    Cent50,
    Euro1,
    Euro2,
}

// 📦 Struct für die Geldbörse
struct Geldboerse {
    besitzer: String,
    wert: f64,
}

impl Geldboerse {
    // 📦 Methode zum Hinzufügen einer Münze
    fn muenze_einwerfen(&mut self, m: Muenze) {
        // 🔍 Pattern Matching
        let betrag = match m {
            Muenze::Cent50 => 0.50,
            Muenze::Euro1 => 1.00,
            Muenze::Euro2 => 2.00,
        };
        self.wert += betrag;
        println!("{} wirft eine Münze ein. Neuer Wert: {} Euro.", self.besitzer, self.wert);
    }
}

fn main() {
    let mut boerse = Geldboerse {
        besitzer: String::from("Thorsten"),
        wert: 5.00,
    };
    boerse.muenze_einwerfen(Muenze::Euro2);
}
```

---

## Projekt 6: Kaffee-Bestellung
```rust
// 🏷️ Enum für Kaffeearten
enum KaffeeTyp {
    Espresso,
    Cappuccino,
    Latte,
}

// 📦 Struct für das Getränk
struct Kaffee {
    typ: KaffeeTyp,
    extra_milch: bool,
}

impl Kaffee {
    // 📦 Methode zur Preisermittlung
    fn preis(&self) -> f64 {
        let basispreis = match self.typ {
            KaffeeTyp::Espresso => 2.00,
            KaffeeTyp::Cappuccino => 3.00,
            KaffeeTyp::Latte => 3.50,
        };
        
        if self.extra_milch {
            basispreis + 0.50
        } else {
            basispreis
        }
    }
}

fn main() {
    let bestellung = Kaffee {
        typ: KaffeeTyp::Cappuccino,
        extra_milch: true,
    };
    println!("Der Preis für deinen Kaffee beträgt {} Euro.", bestellung.preis());
}
```

---

## Projekt 7: Benutzer-Rolle
```rust
// 🏷️ Enum für den Kontotyp
enum AccountTyp {
    Premium,
    Standard,
    Gast,
}

// 📦 Struct für einen Benutzer
struct User {
    name: String,
    account: AccountTyp,
}

impl User {
    // 📦 Methode zur Ermittlung des Speicherlimits
    fn speicher_limit_gb(&self) -> i32 {
        // 🔍 Pattern Matching (match)
        match self.account {
            AccountTyp::Premium => 1000,
            AccountTyp::Standard => 50,
            AccountTyp::Gast => 5,
        }
    }
}

fn main() {
    let user = User {
        name: String::from("Lisa"),
        account: AccountTyp::Standard,
    };
    println!("Benutzerin {} hat ein Limit von {} GB.", user.name, user.speicher_limit_gb());
}
```

---

## Projekt 8: Haustier-Fütterung
```rust
// 🏷️ Enum für den Hungerstatus
enum HungerStatus {
    Satt,
    Hungrig,
    SehrHungrig,
}

// 📦 Struct für ein Haustier
struct Haustier {
    name: String,
    hunger: HungerStatus,
}

impl Haustier {
    // 📦 Methode zur Statusprüfung
    fn status_check(&self) {
        // 🔍 Pattern Matching
        match self.hunger {
            HungerStatus::Satt => println!("{} ist satt und schläft.", self.name),
            HungerStatus::Hungrig => println!("{} schaut dich erwartungsvoll an. Futterzeit?", self.name),
            HungerStatus::SehrHungrig => println!("Warnung: {} braucht dringend Futter!", self.name),
        }
    }
}

fn main() {
    let mein_haustier = Haustier {
        name: String::from("Minka"),
        hunger: HungerStatus::Hungrig,
    };
    mein_haustier.status_check();
}
```

---

## Projekt 9: Spiel-Gegner
```rust
// 🏷️ Enum für die Gegner-Klassen
enum GegnerTyp {
    Ork,
    Goblin,
    Drache,
}

// 📦 Struct für einen Spielgegner
struct Gegner {
    name: String,
    typ: GegnerTyp,
    leben: i32,
}

impl Gegner {
    // 📦 Methode zur Schadensberechnung
    fn basis_schaden(&self) -> i32 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            GegnerTyp::Goblin => 10,
            GegnerTyp::Ork => 25,
            GegnerTyp::Drache => 100,
        }
    }
}

fn main() {
    let feind = Gegner {
        name: String::from("Smaug"),
        typ: GegnerTyp::Drache,
        leben: 500,
    };
    println!("Gegner {} macht {} Schaden!", feind.name, feind.basis_schaden());
}
```

---

## Projekt 10: Paket-Zustellung
```rust
// 🏷️ Enum für den Sendungsstatus
enum SendungsStatus {
    Sortierung,
    Transport,
    Geliefert,
}

// 📦 Struct für ein Paket
struct Paket {
    tracking_id: i32,
    status: SendungsStatus,
}

impl Paket {
    // 📦 Methode zur Fortschrittsanzeige
    fn fortschritt(&self) {
        // 🔍 Pattern Matching mit match
        match self.status {
            SendungsStatus::Sortierung => println!("Paket {}: Wird im Paketzentrum sortiert.", self.tracking_id),
            SendungsStatus::Transport => println!("Paket {}: Befindet sich in der Zustellung.", self.tracking_id),
            SendungsStatus::Geliefert => println!("Paket {}: Erfolgreich zugestellt!", self.tracking_id),
        }
    }
}

fn main() {
    let mein_paket = Paket {
        tracking_id: 99482,
        status: SendungsStatus::Transport,
    };
    mein_paket.fortschritt();
}
```

---

## Projekt 11: Status-Manager (Heizung 11)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Heizung"),
        id: 11,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 12: Ticket-System (Ticket 12)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 12,
        titel: String::from("Fehler in Modul 12"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 13: Paket-Tracker (Paket 13)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 13,
        zielort: String::from("Muenchen"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 14: Fahrzeug-Klasse (Fahrzeug 14)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Audi"),
        id: 14,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 15: Mitarbeiter-Rolle (Mitarbeiter 15)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 15,
        name: String::from("Anna"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 16: Status-Manager (Kuehlschrank 16)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Kuehlschrank"),
        id: 16,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 17: Ticket-System (Ticket 17)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 17,
        titel: String::from("Fehler in Modul 17"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 18: Paket-Tracker (Paket 18)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 18,
        zielort: String::from("Berlin"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 19: Fahrzeug-Klasse (Fahrzeug 19)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("BMW"),
        id: 19,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 20: Mitarbeiter-Rolle (Mitarbeiter 20)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 20,
        name: String::from("Ben"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 21: Status-Manager (Router 21)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Router"),
        id: 21,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 22: Ticket-System (Ticket 22)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 22,
        titel: String::from("Fehler in Modul 22"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 23: Paket-Tracker (Paket 23)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 23,
        zielort: String::from("Hamburg"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 24: Fahrzeug-Klasse (Fahrzeug 24)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Mercedes"),
        id: 24,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 25: Mitarbeiter-Rolle (Mitarbeiter 25)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 25,
        name: String::from("Clara"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 26: Status-Manager (Klimaanlage 26)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Klimaanlage"),
        id: 26,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 27: Ticket-System (Ticket 27)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 27,
        titel: String::from("Fehler in Modul 27"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 28: Paket-Tracker (Paket 28)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 28,
        zielort: String::from("Koeln"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 29: Fahrzeug-Klasse (Fahrzeug 29)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Volkswagen"),
        id: 29,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 30: Mitarbeiter-Rolle (Mitarbeiter 30)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 30,
        name: String::from("Daniel"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 31: Status-Manager (Fernseher 31)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Fernseher"),
        id: 31,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 32: Ticket-System (Ticket 32)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 32,
        titel: String::from("Fehler in Modul 32"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 33: Paket-Tracker (Paket 33)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 33,
        zielort: String::from("Frankfurt"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 34: Fahrzeug-Klasse (Fahrzeug 34)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Porsche"),
        id: 34,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 35: Mitarbeiter-Rolle (Mitarbeiter 35)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 35,
        name: String::from("Emma"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 36: Status-Manager (Drucker 36)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Drucker"),
        id: 36,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 37: Ticket-System (Ticket 37)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 37,
        titel: String::from("Fehler in Modul 37"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 38: Paket-Tracker (Paket 38)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 38,
        zielort: String::from("Stuttgart"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 39: Fahrzeug-Klasse (Fahrzeug 39)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Opel"),
        id: 39,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 40: Mitarbeiter-Rolle (Mitarbeiter 40)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 40,
        name: String::from("Felix"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 41: Status-Manager (Lichtleiste 41)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Lichtleiste"),
        id: 41,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 42: Ticket-System (Ticket 42)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 42,
        titel: String::from("Fehler in Modul 42"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 43: Paket-Tracker (Paket 43)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 43,
        zielort: String::from("Duesseldorf"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 44: Fahrzeug-Klasse (Fahrzeug 44)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Ford"),
        id: 44,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 45: Mitarbeiter-Rolle (Mitarbeiter 45)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 45,
        name: String::from("Greta"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 46: Status-Manager (Kamera 46)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Kamera"),
        id: 46,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 47: Ticket-System (Ticket 47)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 47,
        titel: String::from("Fehler in Modul 47"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 48: Paket-Tracker (Paket 48)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 48,
        zielort: String::from("Dortmund"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 49: Fahrzeug-Klasse (Fahrzeug 49)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Volvo"),
        id: 49,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 50: Mitarbeiter-Rolle (Mitarbeiter 50)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 50,
        name: String::from("Henry"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 51: Status-Manager (Waschmaschine 51)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Waschmaschine"),
        id: 51,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 52: Ticket-System (Ticket 52)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 52,
        titel: String::from("Fehler in Modul 52"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 53: Paket-Tracker (Paket 53)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 53,
        zielort: String::from("Essen"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 54: Fahrzeug-Klasse (Fahrzeug 54)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Tesla"),
        id: 54,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 55: Mitarbeiter-Rolle (Mitarbeiter 55)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 55,
        name: String::from("Ida"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 56: Status-Manager (Geschirrspueler 56)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Geschirrspueler"),
        id: 56,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 57: Ticket-System (Ticket 57)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 57,
        titel: String::from("Fehler in Modul 57"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 58: Paket-Tracker (Paket 58)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 58,
        zielort: String::from("Bremen"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 59: Fahrzeug-Klasse (Fahrzeug 59)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Renault"),
        id: 59,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 60: Mitarbeiter-Rolle (Mitarbeiter 60)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 60,
        name: String::from("Jakob"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 61: Status-Manager (Heizung 61)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Heizung"),
        id: 61,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 62: Ticket-System (Ticket 62)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 62,
        titel: String::from("Fehler in Modul 62"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 63: Paket-Tracker (Paket 63)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 63,
        zielort: String::from("Muenchen"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 64: Fahrzeug-Klasse (Fahrzeug 64)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Audi"),
        id: 64,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 65: Mitarbeiter-Rolle (Mitarbeiter 65)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 65,
        name: String::from("Anna"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 66: Status-Manager (Kuehlschrank 66)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Kuehlschrank"),
        id: 66,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 67: Ticket-System (Ticket 67)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 67,
        titel: String::from("Fehler in Modul 67"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 68: Paket-Tracker (Paket 68)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 68,
        zielort: String::from("Berlin"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 69: Fahrzeug-Klasse (Fahrzeug 69)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("BMW"),
        id: 69,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 70: Mitarbeiter-Rolle (Mitarbeiter 70)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 70,
        name: String::from("Ben"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 71: Status-Manager (Router 71)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Router"),
        id: 71,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 72: Ticket-System (Ticket 72)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 72,
        titel: String::from("Fehler in Modul 72"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 73: Paket-Tracker (Paket 73)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 73,
        zielort: String::from("Hamburg"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 74: Fahrzeug-Klasse (Fahrzeug 74)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Mercedes"),
        id: 74,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 75: Mitarbeiter-Rolle (Mitarbeiter 75)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 75,
        name: String::from("Clara"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 76: Status-Manager (Klimaanlage 76)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Klimaanlage"),
        id: 76,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 77: Ticket-System (Ticket 77)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 77,
        titel: String::from("Fehler in Modul 77"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 78: Paket-Tracker (Paket 78)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 78,
        zielort: String::from("Koeln"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 79: Fahrzeug-Klasse (Fahrzeug 79)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Volkswagen"),
        id: 79,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 80: Mitarbeiter-Rolle (Mitarbeiter 80)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 80,
        name: String::from("Daniel"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 81: Status-Manager (Fernseher 81)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Fernseher"),
        id: 81,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 82: Ticket-System (Ticket 82)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 82,
        titel: String::from("Fehler in Modul 82"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 83: Paket-Tracker (Paket 83)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 83,
        zielort: String::from("Frankfurt"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 84: Fahrzeug-Klasse (Fahrzeug 84)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Porsche"),
        id: 84,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 85: Mitarbeiter-Rolle (Mitarbeiter 85)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 85,
        name: String::from("Emma"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 86: Status-Manager (Drucker 86)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Drucker"),
        id: 86,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 87: Ticket-System (Ticket 87)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 87,
        titel: String::from("Fehler in Modul 87"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 88: Paket-Tracker (Paket 88)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 88,
        zielort: String::from("Stuttgart"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 89: Fahrzeug-Klasse (Fahrzeug 89)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Opel"),
        id: 89,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 90: Mitarbeiter-Rolle (Mitarbeiter 90)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 90,
        name: String::from("Felix"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 91: Status-Manager (Lichtleiste 91)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Lichtleiste"),
        id: 91,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 92: Ticket-System (Ticket 92)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 92,
        titel: String::from("Fehler in Modul 92"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 93: Paket-Tracker (Paket 93)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 93,
        zielort: String::from("Duesseldorf"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 94: Fahrzeug-Klasse (Fahrzeug 94)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Ford"),
        id: 94,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 95: Mitarbeiter-Rolle (Mitarbeiter 95)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 95,
        name: String::from("Greta"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```

---

## Projekt 96: Status-Manager (Kamera 96)
```rust
// 🏷️ Enum für den Status
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct für das Gerät
struct Geraet {
    name: String,
    id: i32,
    status: GeraeteStatus,
}

impl Geraet {
    // 📦 Methode zur Statusanzeige
    fn status_zeigen(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            GeraeteStatus::An => println!("Gerät {} ({}) ist eingeschaltet.", self.id, self.name),
            GeraeteStatus::Aus => println!("Gerät {} ({}) ist ausgeschaltet.", self.id, self.name),
            GeraeteStatus::Standby => println!("Gerät {} ({}) ist im Standby-Modus.", self.id, self.name),
        }
    }
}

fn main() {
    let mein_geraet = Geraet {
        name: String::from("Kamera"),
        id: 96,
        status: GeraeteStatus::Standby,
    };
    mein_geraet.status_zeigen();
}
```

---

## Projekt 97: Ticket-System (Ticket 97)
```rust
// 🏷️ Enum für die Priorität
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für das Ticket
struct Ticket {
    id: i32,
    titel: String,
    prioritaet: Prioritaet,
}

impl Ticket {
    // 📦 Methode zur Prioritätsprüfung
    fn ist_dringend(&self) -> bool {
        // 🔍 Pattern Matching mit dem kompakten `if let`
        if let Prioritaet::Hoch = self.prioritaet {
            true
        } else {
            false
        }
    }
}

fn main() {
    let ticket = Ticket {
        id: 97,
        titel: String::from("Fehler in Modul 97"),
        prioritaet: Prioritaet::Hoch,
    };
    if ticket.ist_dringend() {
        println!("Ticket {}: Dringende Bearbeitung erforderlich!", ticket.id);
    } else {
        println!("Ticket {}: Normale Bearbeitung.", ticket.id);
    }
}
```

---

## Projekt 98: Paket-Tracker (Paket 98)
```rust
// 🏷️ Enum für den Paketstatus
enum PaketStatus {
    ImLager,
    Unterwegs,
    Zugestellt,
}

// 📦 Struct für das Paket
struct Paket {
    id: i32,
    zielort: String,
    status: PaketStatus,
}

impl Paket {
    // 📦 Methode zur Statusanzeige
    fn stationen_info(&self) {
        // 🔍 Pattern Matching (match)
        match self.status {
            PaketStatus::ImLager => println!("Paket {}: Noch im Lager in {}.", self.id, self.zielort),
            PaketStatus::Unterwegs => println!("Paket {}: Auf dem Weg nach {}.", self.id, self.zielort),
            PaketStatus::Zugestellt => println!("Paket {}: In {} angekommen.", self.id, self.zielort),
        }
    }
}

fn main() {
    let paket = Paket {
        id: 98,
        zielort: String::from("Dortmund"),
        status: PaketStatus::Unterwegs,
    };
    paket.stationen_info();
}
```

---

## Projekt 99: Fahrzeug-Klasse (Fahrzeug 99)
```rust
// 🏷️ Enum für den Fahrzeugtyp
enum FahrzeugTyp {
    Auto,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Fahrzeug
struct Fahrzeug {
    hersteller: String,
    id: i32,
    typ: FahrzeugTyp,
}

impl Fahrzeug {
    // 📦 Methode zur Mautberechnung
    fn maut_berechnen(&self) -> f64 {
        // 🔍 Pattern Matching (match)
        match self.typ {
            FahrzeugTyp::Motorrad => 2.50,
            FahrzeugTyp::Auto => 5.00,
            FahrzeugTyp::Lkw => 15.00,
        }
    }
}

fn main() {
    let fahrzeug = Fahrzeug {
        hersteller: String::from("Volvo"),
        id: 99,
        typ: FahrzeugTyp::Lkw,
    };
    println!("Die Mautgebühr für Fahrzeug {} ({}) beträgt {} Euro.", fahrzeug.id, fahrzeug.hersteller, fahrzeug.maut_berechnen());
}
```

---

## Projekt 100: Mitarbeiter-Rolle (Mitarbeiter 100)
```rust
// 🏷️ Enum für die Benutzerrollen
enum Rolle {
    Admin,
    Entwickler,
    Gast,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    id: i32,
    name: String,
    rolle: Rolle,
}

impl Mitarbeiter {
    // 📦 Methode zur Berechtigungsprüfung
    fn hat_schreibrechte(&self) -> bool {
        // 🔍 Pattern Matching (match)
        match self.rolle {
            Rolle::Admin | Rolle::Entwickler => true,
            Rolle::Gast => false,
        }
    }
}

fn main() {
    let kollege = Mitarbeiter {
        id: 100,
        name: String::from("Henry"),
        rolle: Rolle::Entwickler,
    };
    if kollege.hat_schreibrechte() {
        println!("Mitarbeiter {} ({}) darf Änderungen vornehmen.", kollege.id, kollege.name);
    } else {
        println!("Mitarbeiter {} ({}) hat nur Leserechte.", kollege.id, kollege.name);
    }
}
```
