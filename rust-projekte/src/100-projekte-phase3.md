# 100 Projekte - Fehlerbehandlung & Collections

In dieser Phase 3 vertiefen wir die **Collections** (Datenstrukturen der Standardbibliothek wie `Vec<T>` und `HashMap<K, V>`) und die **Systematische Fehlerbehandlung** (Result & Option).
Jedes Projekt kombiniert das Gelernte aus den vorherigen Phasen (wie Structs, Enums, Pattern Matching, Ownership und Borrowing) und erweitert dies um robusten, ausfallsicheren Code.

| Thema | Was du lernst |
|---|---|
| 🧱 Grundlagen | Variablen, Datentypen, Kontrollfluss, Benutzereingabe |
| 🧠 Ownership & Borrowing | Wer besitzt Daten? Referenzen (`&` und `&mut`) |
| 📝 String vs. &str | Wandelbare Texte vs. feste Text-Slices |
| 📦 Structs & Methoden | Eigene Datentypen mit `impl`-Blöcken strukturieren |
| 🏷️ Enums & Pattern Matching | Feste Zustände abbilden und mit `match`/`if let` auswerten |
| 🗃️ Collections | `Vec<T>` und `HashMap<K, V>` für dynamische Daten |
| ⚠️ Fehlerbehandlung | `Result<T, E>` und `Option<T>` für sicheren Code |

Hinweis: Alle Projekte zeigen nur fertigen Code und Kommentare an. Nur lesen!

---
## Phase 3: Fehlerbehandlung & Collections (Projekte 1 bis 25)

Die folgenden 25 Projekte konzentrieren sich primär auf die Arbeit mit der dynamischen Liste `Vec<T>` und dem Typ `Option<T>` (für sichere Rückgabewerte und die Behandlung fehlender Werte). Jedes Projekt kombiniert diese Collections und Fehlerbehandlung mit den Konzepten aus Phase 1 und Phase 2 (Structs, Methoden, Enums, Pattern Matching, Ownership).

---

## Projekt 1: Hotelzimmer-Suche

```rust
// 🏷️ Enum für den Status des Hotelzimmers
#[derive(Debug, PartialEq)]
enum ZimmerStatus {
    Frei,
    Belegt,
}

// 📦 Struct für ein einzelnes Zimmer
struct Zimmer {
    nummer: u32,
    status: ZimmerStatus,
}

// 📦 Struct für das Hotel, das mehrere Zimmer verwaltet
struct Hotel {
    // 🗃️ Vec<Zimmer> verwaltet dynamisch alle Zimmer
    zimmer: Vec<Zimmer>,
}

impl Hotel {
    // 🔍 Methode zur Suche eines freien Zimmers
    // 🧠 Borrowing: Wir leihen uns das Hotel aus (&self) und geben eine Referenz
    // auf ein Zimmer innerhalb des Hotels zurück (Option<&Zimmer>)
    fn finde_freies_zimmer(&self) -> Option<&Zimmer> {
        for z in &self.zimmer {
            // 🔍 Pattern Matching auf den Enum-Wert
            if z.status == ZimmerStatus::Frei {
                return Some(z); // Gefundenes Zimmer einpacken
            }
        }
        None // Kein freies Zimmer gefunden
    }
}

fn main() {
    let hotel = Hotel {
        zimmer: vec![
            Zimmer { nummer: 101, status: ZimmerStatus::Belegt },
            Zimmer { nummer: 102, status: ZimmerStatus::Frei },
            Zimmer { nummer: 103, status: ZimmerStatus::Belegt },
        ],
    };

    // 🔍 if let nutzen, um den Option-Rückgabewert sauber auszupacken
    if let Some(z) = hotel.finde_freies_zimmer() {
        println!("Freies Zimmer gefunden: Nummer {}", z.nummer);
    } else {
        println!("Keine freien Zimmer verfügbar.");
    }
}
```

---

## Projekt 2: Parkplatz-Finder

```rust
// 🏷️ Enum für die verschiedenen Typen von Parkplätzen
#[derive(Debug, PartialEq)]
enum PlatzTyp {
    Standard,
    Elektro,
}

// 📦 Struct für einen Parkplatz
struct Parkplatz {
    id: u32,
    typ: PlatzTyp,
    belegt: bool,
}

// 📦 Struct für das Parkhaus
struct Parkhaus {
    plaetze: Vec<Parkplatz>,
}

impl Parkhaus {
    // 🔍 Sucht nach dem ersten freien Elektro-Parkplatz und gibt dessen ID zurück
    fn naechster_freier_elektroplatz(&self) -> Option<u32> {
        for p in &self.plaetze {
            if p.typ == PlatzTyp::Elektro && !p.belegt {
                return Some(p.id); // Kopiert die u32 ID
            }
        }
        None
    }
}

fn main() {
    let parkhaus = Parkhaus {
        plaetze: vec![
            Parkplatz { id: 1, typ: PlatzTyp::Standard, belegt: false },
            Parkplatz { id: 2, typ: PlatzTyp::Elektro, belegt: true },
            Parkplatz { id: 3, typ: PlatzTyp::Elektro, belegt: false },
        ],
    };

    // 🔍 Match-Ausdruck zur Prüfung des Option-Ergebnisses
    match parkhaus.naechster_freier_elektroplatz() {
        Some(id) => println!("Freier Elektro-Parkplatz gefunden: ID {}", id),
        None => println!("Aktuell sind alle E-Parkplätze belegt."),
    }
}
```

---

## Projekt 3: Schüler-Notenspiegel

```rust
// 📦 Struct für einen Schüler mit seinem Namen und einer Liste von Noten
struct Schueler {
    name: String,
    noten: Vec<u32>,
}

// 📦 Struct für die Schulklasse
struct Klasse {
    schueler: Vec<Schueler>,
}

impl Klasse {
    // 🔍 Methode zur Suche eines Schülers anhand des Namens
    // 🧠 Lifetime: Die zurückgegebene Referenz ist an die Lebensdauer der Klasse gebunden
    fn finde_schueler(&self, name: &str) -> Option<&Schueler> {
        for s in &self.schueler {
            if s.name == name {
                return Some(s);
            }
        }
        None
    }
}

fn main() {
    let klasse = Klasse {
        schueler: vec![
            Schueler { name: String::from("Anna"), noten: vec![1, 2, 1] },
            Schueler { name: String::from("Ben"), noten: vec![3, 2, 4] },
        ],
    };

    // 🔍 Überprüfung mit if let
    if let Some(s) = klasse.finde_schueler("Anna") {
        println!("Schüler {} wurde gefunden. Anzahl Noten: {}", s.name, s.noten.len());
    } else {
        println!("Schüler nicht gefunden.");
    }
}
```

---

## Projekt 4: To-Do-Dringlichkeit

```rust
// 🏷️ Enum für Aufgaben-Prioritäten
#[derive(Debug, PartialEq)]
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für eine Aufgabe
struct Aufgabe {
    beschreibung: String,
    prioritaet: Prioritaet,
}

// 📦 Struct für die To-Do-Liste
struct Aufgabenliste {
    aufgaben: Vec<Aufgabe>,
}

impl Aufgabenliste {
    // 🔍 Sucht nach der ersten Aufgabe mit hoher Priorität
    fn finde_dringende_aufgabe(&self) -> Option<&Aufgabe> {
        for a in &self.aufgaben {
            if a.prioritaet == Prioritaet::Hoch {
                return Some(a);
            }
        }
        None
    }
}

fn main() {
    let liste = Aufgabenliste {
        aufgaben: vec![
            Aufgabe { beschreibung: String::from("Müll rausbringen"), prioritaet: Prioritaet::Niedrig },
            Aufgabe { beschreibung: String::from("Rust-Buch schreiben"), prioritaet: Prioritaet::Hoch },
            Aufgabe { beschreibung: String::from("Kaffee trinken"), prioritaet: Prioritaet::Mittel },
        ],
    };

    if let Some(a) = liste.finde_dringende_aufgabe() {
        println!("Dringende Aufgabe zu erledigen: {}", a.beschreibung);
    } else {
        println!("Keine dringenden Aufgaben anstehend.");
    }
}
```

---

## Projekt 5: Lagerbestandswarnung

```rust
// 📦 Struct für einen Artikel im Lager
struct Artikel {
    id: u32,
    name: String,
    bestand: u32,
}

// 📦 Struct für das Lager
struct Lager {
    artikel: Vec<Artikel>,
}

impl Lager {
    // 🔍 Findet den ersten Artikel, dessen Bestand unter dem Schwellenwert liegt
    fn kritischer_artikel(&self, schwellenwert: u32) -> Option<&Artikel> {
        for a in &self.artikel {
            if a.bestand < schwellenwert {
                return Some(a);
            }
        }
        None
    }
}

fn main() {
    let lager = Lager {
        artikel: vec![
            Artikel { id: 1, name: String::from("Apfel"), bestand: 50 },
            Artikel { id: 2, name: String::from("Birne"), bestand: 3 },
            Artikel { id: 3, name: String::from("Banane"), bestand: 25 },
        ],
    };

    // Warnschwelle bei 5 Einheiten
    if let Some(a) = lager.kritischer_artikel(5) {
        println!("Warnung! Artikel {} hat nur noch {} Stück auf Lager!", a.name, a.bestand);
    } else {
        println!("Alle Artikel haben ausreichende Bestände.");
    }
}
```

---

## Projekt 6: Kinosaal-Belegung

```rust
// 📦 Struct für einen Sitzplatz im Kinosaal
struct Sitzplatz {
    reihe: u32,
    sitz: u32,
    // 💡 Option<String>: Some(Name) wenn belegt, None wenn frei
    gast: Option<String>,
}

// 📦 Struct für den Kinosaal
struct Kinosaal {
    sitze: Vec<Sitzplatz>,
}

impl Kinosaal {
    // 🔍 Prüft, wer auf einem bestimmten Sitz sitzt
    fn wer_sitzt_auf(&self, reihe: u32, sitz: u32) -> Option<&str> {
        for s in &self.sitze {
            if s.reihe == reihe && s.sitz == sitz {
                // 🧠 as_deref() wandelt Option<String> in Option<&str> um
                return s.gast.as_deref();
            }
        }
        None
    }
}

fn main() {
    let saal = Kinosaal {
        sitze: vec![
            Sitzplatz { reihe: 1, sitz: 1, gast: Some(String::from("Clara")) },
            Sitzplatz { reihe: 1, sitz: 2, gast: None },
        ],
    };

    match saal.wer_sitzt_auf(1, 1) {
        Some(name) => println!("Auf Sitz 1/1 sitzt: {}", name),
        None => println!("Sitz 1/1 ist frei."),
    }
}
```

---

## Projekt 7: Sensoren-Messwerte

```rust
// 📦 Struct für einen Temperatursensor
struct Sensor {
    id: String,
    // 💡 Option<f64>: Some(Temperatur) oder None bei Messfehler
    messwert: Option<f64>,
}

// 📦 Struct für das Netzwerk
struct Netzwerk {
    sensoren: Vec<Sensor>,
}

impl Netzwerk {
    // 🔍 Ermittelt den Sensor mit dem höchsten Messwert
    fn waermster_sensor(&self) -> Option<&Sensor> {
        let mut max_temp: Option<f64> = None;
        let mut bester_sensor: Option<&Sensor> = None;

        for s in &self.sensoren {
            // Nur Sensoren mit gültigem Messwert auswerten
            if let Some(temp) = s.messwert {
                match max_temp {
                    Some(max) if temp > max => {
                        max_temp = Some(temp);
                        bester_sensor = Some(s);
                    }
                    None => {
                        max_temp = Some(temp);
                        bester_sensor = Some(s);
                    }
                    _ => {} // Sonst nichts tun
                }
            }
        }
        bester_sensor
    }
}

fn main() {
    let netzwerk = Netzwerk {
        sensoren: vec![
            Sensor { id: String::from("Flur"), messwert: Some(21.5) },
            Sensor { id: String::from("Küche (Fehler)"), messwert: None },
            Sensor { id: String::from("Reaktor"), messwert: Some(55.3) },
        ],
    };

    if let Some(s) = netzwerk.waermster_sensor() {
        println!("Höchste Temperatur gemessen an Sensor '{}': {:?}", s.id, s.messwert);
    } else {
        println!("Keine gültigen Messdaten im Netzwerk.");
    }
}
```

---

## Projekt 8: Mitarbeiter-Suche

```rust
// 🏷️ Enum für die Mitarbeiter-Rollen
#[derive(Debug, PartialEq)]
enum Rolle {
    Entwickler,
    Designer,
    Manager,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    name: String,
    rolle: Rolle,
}

// 📦 Struct für das Team
struct Team {
    mitglieder: Vec<Mitarbeiter>,
}

impl Team {
    // 🔍 Findet den ersten Entwickler im Team
    fn finde_entwickler(&self) -> Option<&Mitarbeiter> {
        for m in &self.mitglieder {
            if m.rolle == Rolle::Entwickler {
                return Some(m);
            }
        }
        None
    }
}

fn main() {
    let team = Team {
        mitglieder: vec![
            Mitarbeiter { name: String::from("David"), rolle: Rolle::Designer },
            Mitarbeiter { name: String::from("Eva"), rolle: Rolle::Entwickler },
            Mitarbeiter { name: String::from("Frank"), rolle: Rolle::Manager },
        ],
    };

    if let Some(m) = team.finde_entwickler() {
        println!("Entwickler im Team gefunden: {}", m.name);
    } else {
        println!("Kein Entwickler im Team vorhanden.");
    }
}
```

---

## Projekt 9: Kunden-Warteschlange

```rust
// 🏷️ Enum für die Service-Dringlichkeit
#[derive(Debug, PartialEq)]
enum Dringlichkeit {
    Normal,
    Eilig,
}

// 📦 Struct für einen wartenden Kunden
struct Kunde {
    name: String,
    dringlichkeit: Dringlichkeit,
}

// 📦 Struct für die Warteschlange
struct Warteschlange {
    kunden: Vec<Kunde>,
}

impl Warteschlange {
    // 🧠 Ownership: Wir entnehmen den Kunden aus dem Vektor und geben ihn zurück
    fn bediene_naechsten(&mut self) -> Option<Kunde> {
        if self.kunden.is_empty() {
            None
        } else {
            // 💡 Wir entfernen das erste Element (Index 0) aus dem Vektor
            Some(self.kunden.remove(0))
        }
    }
}

fn main() {
    let mut schlange = Warteschlange {
        kunden: vec![
            Kunde { name: String::from("Felix"), dringlichkeit: Dringlichkeit::Normal },
            Kunde { name: String::from("Gabi"), dringlichkeit: Dringlichkeit::Eilig },
        ],
    };

    // Den ersten Kunden bedienen
    if let Some(k) = schlange.bediene_naechsten() {
        println!("Kunde {} wird jetzt bedient (Dringlichkeit: {:?}).", k.name, k.dringlichkeit);
    } else {
        println!("Die Warteschlange ist leer.");
    }
}
```

---

## Projekt 10: Smart-Home-Dimmer

```rust
// 📦 Struct für ein Gerät
struct Geraet {
    name: String,
    // 💡 Option<u8>: Some(Helligkeit 0..100) wenn an, None wenn aus
    dimm_wert: Option<u8>,
}

// 📦 Struct für ein Smart-Home-System
struct SmartHome {
    geraete: Vec<Geraet>,
}

impl SmartHome {
    // 🔍 Findet das am hellsten eingestellte Gerät
    fn hellstes_geraet(&self) -> Option<&Geraet> {
        let mut max_helligkeit: Option<u8> = None;
        let mut bester: Option<&Geraet> = None;

        for g in &self.geraete {
            if let Some(wert) = g.dimm_wert {
                match max_helligkeit {
                    Some(max) if wert > max => {
                        max_helligkeit = Some(wert);
                        bester = Some(g);
                    }
                    None => {
                        max_helligkeit = Some(wert);
                        bester = Some(g);
                    }
                    _ => {}
                }
            }
        }
        bester
    }
}

fn main() {
    let home = SmartHome {
        geraete: vec![
            Geraet { name: String::from("Wohnzimmerlicht"), dimm_wert: Some(40) },
            Geraet { name: String::from("Kabel-TV"), dimm_wert: None }, // TV hat keine Helligkeit
            Geraet { name: String::from("Fluter Küche"), dimm_wert: Some(85) },
        ],
    };

    if let Some(g) = home.hellstes_geraet() {
        println!("Das hellste eingeschaltete Licht ist '{}' mit {}%.", g.name, g.dimm_wert.unwrap());
    } else {
        println!("Keine dimmbaren Lichter sind aktiv.");
    }
}
```

---

## Projekt 11: Flugzeug-Reservierungen

```rust
// 📦 Struct für einen Sitzplatz im Flugzeug
struct Sitzplatz {
    sitz_id: String,
    // 💡 Option<String>: Name des Passagiers
    passagier: Option<String>,
}

// 📦 Struct für einen Flug
struct Flug {
    sitze: Vec<Sitzplatz>,
}

impl Flug {
    // 🔍 Sucht nach einem Passagier auf einem bestimmten Sitz
    fn passagier_auf_sitz(&self, sitz_id: &str) -> Option<&str> {
        for s in &self.sitze {
            if s.sitz_id == sitz_id {
                return s.passagier.as_deref();
            }
        }
        None
    }
}

fn main() {
    let flug = Flug {
        sitze: vec![
            Sitzplatz { sitz_id: String::from("12A"), passagier: Some(String::from("Hannah")) },
            Sitzplatz { sitz_id: String::from("12B"), passagier: None },
        ],
    };

    match flug.passagier_auf_sitz("12A") {
        Some(name) => println!("Auf Sitz 12A sits: {}", name),
        None => println!("Sitz 12A ist nicht reserviert."),
    }
}
```

---

## Projekt 12: Playlist-Suche

```rust
// 📦 Struct für ein Musikstück
struct Lied {
    titel: String,
    interpret: String,
    dauer_sekunden: u32,
}

// 📦 Struct für die Playlist
struct Playlist {
    lieder: Vec<Lied>,
}

impl Playlist {
    // 🔍 Findet ein Lied anhand des Titels
    fn suche_lied(&self, titel: &str) -> Option<&Lied> {
        for l in &self.lieder {
            if l.titel == titel {
                return Some(l);
            }
        }
        None
    }
}

fn main() {
    let playlist = Playlist {
        lieder: vec![
            Lied { titel: String::from("Rust Rock"), interpret: String::from("The Compilers"), dauer_sekunden: 180 },
            Lied { titel: String::from("Cargo Beat"), interpret: String::from("Crate Band"), dauer_sekunden: 210 },
        ],
    };

    if let Some(l) = playlist.suche_lied("Cargo Beat") {
        println!("Gefunden: '{}' von '{}' ({} Sek.)", l.titel, l.interpret, l.dauer_sekunden);
    } else {
        println!("Lied leider nicht in Playlist gefunden.");
    }
}
```

---

## Projekt 13: Elektroauto-Finder

```rust
// 🏷️ Enum für den Kraftstofftyp
#[derive(Debug, PartialEq)]
enum Antrieb {
    Benzin,
    Elektro,
}

// 📦 Struct für ein Auto
struct Auto {
    modell: String,
    baujahr: u32,
    antrieb: Antrieb,
}

// 📦 Struct für den Händler-Fuhrpark
struct Fuhrpark {
    bestand: Vec<Auto>,
}

impl Fuhrpark {
    // 🔍 Sucht das erste Elektroauto, das ab einem bestimmten Jahr gebaut wurde
    fn erstes_elektroauto_ab_jahr(&self, jahr: u32) -> Option<&Auto> {
        for a in &self.bestand {
            if a.antrieb == Antrieb::Elektro && a.baujahr >= jahr {
                return Some(a);
            }
        }
        None
    }
}

fn main() {
    let fuhrpark = Fuhrpark {
        bestand: vec![
            Auto { modell: String::from("Modell X"), baujahr: 2018, antrieb: Antrieb::Elektro },
            Auto { modell: String::from("Verbrenner Y"), baujahr: 2021, antrieb: Antrieb::Benzin },
            Auto { modell: String::from("Modell 3"), baujahr: 2022, antrieb: Antrieb::Elektro },
        ],
    };

    if let Some(a) = fuhrpark.erstes_elektroauto_ab_jahr(2020) {
        println!("Gefundenes Elektrofahrzeug (neuer als 2020): {} ({})", a.modell, a.baujahr);
    } else {
        println!("Kein passendes Elektrofahrzeug im Fuhrpark.");
    }
}
```

---

## Projekt 14: Wunschzettel-Sortierung

```rust
// 🏷️ Enum für die Priorität des Wunsches
#[derive(Debug, PartialEq)]
enum Dringlichkeit {
    Wunsch,
    Dringend,
}

// 📦 Struct für einen Wunsch
struct Wunsch {
    name: String,
    preis: f64,
    dringlichkeit: Dringlichkeit,
}

// 📦 Struct für den Wunschzettel
struct Wunschzettel {
    wuensche: Vec<Wunsch>,
}

impl Wunschzettel {
    // 🔍 Findet den günstigsten dringenden Wunsch
    fn guenstigster_dringender_wunsch(&self) -> Option<&Wunsch> {
        let mut guenstigster: Option<&Wunsch> = None;

        for w in &self.wuensche {
            if w.dringlichkeit == Dringlichkeit::Dringend {
                match guenstigster {
                    Some(g) if w.preis < g.preis => {
                        guenstigster = Some(w);
                    }
                    None => {
                        guenstigster = Some(w);
                    }
                    _ => {}
                }
            }
        }
        guenstigster
    }
}

fn main() {
    let zettel = Wunschzettel {
        wuensche: vec![
            Wunsch { name: String::from("Kaffeemaschine"), preis: 89.99, dringlichkeit: Dringlichkeit::Wunsch },
            Wunsch { name: String::from("Rust-Buch"), preis: 35.00, dringlichkeit: Dringlichkeit::Dringend },
            Wunsch { name: String::from("Monitor"), preis: 199.99, dringlichkeit: Dringlichkeit::Dringend },
        ],
    };

    if let Some(w) = zettel.guenstigster_dringender_wunsch() {
        println!("Günstigster dringender Wunsch: {} ({} Euro)", w.name, w.preis);
    } else {
        println!("Keine dringenden Wünsche vorhanden.");
    }
}
```

---

## Projekt 15: Spieler-Matchmaking

```rust
// 📦 Struct für einen Spieler in der Lobby
struct Spieler {
    name: String,
    elo: u32,
}

// 📦 Struct für die Matchmaking-Lobby
struct Lobby {
    wartende: Vec<Spieler>,
}

impl Lobby {
    // 🔍 Findet einen passenden Gegner für einen Spieler (ELO-Differenz maximal `toleranz`)
    fn suche_gegner(&self, name: &str, toleranz: u32) -> Option<&Spieler> {
        // Zuerst die ELO des suchenden Spielers finden
        let mut eigene_elo: Option<u32> = None;
        for s in &self.wartende {
            if s.name == name {
                eigene_elo = Some(s.elo);
                break;
            }
        }

        // Falls der suchende Spieler gar nicht in der Lobby ist, abbrechen
        let elo = eigene_elo?;

        for s in &self.wartende {
            if s.name != name {
                // Differenz berechnen, ohne dass es zum Überlauf (Underflow) kommt
                let diff = if s.elo > elo { s.elo - elo } else { elo - s.elo };
                if diff <= toleranz {
                    return Some(s);
                }
            }
        }
        None
    }
}

fn main() {
    let lobby = Lobby {
        wartende: vec![
            Spieler { name: String::from("Alice"), elo: 1500 },
            Spieler { name: String::from("Bob"), elo: 1540 },
            Spieler { name: String::from("Charlie"), elo: 1800 },
        ],
    };

    if let Some(gegner) = lobby.suche_gegner("Alice", 50) {
        println!("Gegner für Alice gefunden: {} (ELO: {})", gegner.name, gegner.elo);
    } else {
        println!("Kein passender Gegner in Reichweite.");
    }
}
```

---

## Projekt 16: Tierpensions-Suche

```rust
// 🏷️ Enum für die Haustierart
#[derive(Debug, PartialEq)]
enum TierArt {
    Hund,
    Katze,
}

// 📦 Struct für ein Haustier
struct Haustier {
    name: String,
    art: TierArt,
    alter: u32,
}

// 📦 Struct für die Pension
struct Pension {
    gaeste: Vec<Haustier>,
}

impl Pension {
    // 🔍 Findet das älteste Tier in der Pension
    fn finde_aeltestes_tier(&self) -> Option<&Haustier> {
        let mut aeltestes: Option<&Haustier> = None;

        for t in &self.gaeste {
            match aeltestes {
                Some(a) if t.alter > a.alter => {
                    aeltestes = Some(t);
                }
                None => {
                    aeltestes = Some(t);
                }
                _ => {}
            }
        }
        aeltestes
    }
}

fn main() {
    let pension = Pension {
        gaeste: vec![
            Haustier { name: String::from("Bello"), art: TierArt::Hund, alter: 5 },
            Haustier { name: String::from("Minka"), art: TierArt::Katze, alter: 12 },
            Haustier { name: String::from("Rex"), art: TierArt::Hund, alter: 8 },
        ],
    };

    if let Some(tier) = pension.finde_aeltestes_tier() {
        println!("Das älteste Tier in der Pension ist {} ({} Jahre alt).", tier.name, tier.alter);
    } else {
        println!("Die Pension ist derzeit leer.");
    }
}
```

---

## Projekt 17: Logbuch-Suche

```rust
// 🏷️ Enum für die Log-Schweregrade
#[derive(Debug, PartialEq)]
enum LogStufe {
    Info,
    Warnung,
    Fehler,
}

// 📦 Struct für einen einzelnen Logeintrag
struct LogEintrag {
    stufe: LogStufe,
    nachricht: String,
}

// 📦 Struct für ein Logbuch
struct Logbuch {
    eintraege: Vec<LogEintrag>,
}

impl Logbuch {
    // 🔍 Sucht nach einer Warnung, deren Nachricht ein bestimmtes Wort enthält
    fn suche_warnung_mit_text(&self, query: &str) -> Option<&LogEintrag> {
        for e in &self.eintraege {
            if e.stufe == LogStufe::Warnung && e.nachricht.contains(query) {
                return Some(e);
            }
        }
        None
    }
}

fn main() {
    let log = Logbuch {
        eintraege: vec![
            LogEintrag { stufe: LogStufe::Info, nachricht: String::from("Dienst gestartet.") },
            LogEintrag { stufe: LogStufe::Warnung, nachricht: String::from("RAM Auslastung hoch.") },
            LogEintrag { stufe: LogStufe::Fehler, nachricht: String::from("Verbindung verloren.") },
        ],
    };

    if let Some(eintrag) = log.suche_warnung_mit_text("RAM") {
        println!("Warnung gefunden: Nachricht: '{}'", eintrag.nachricht);
    } else {
        println!("Keine passende Warnung gefunden.");
    }
}
```

---

## Projekt 18: Rezept-Finder

```rust
// 📦 Struct für ein Kochrezept
struct Rezept {
    name: String,
    zutaten: Vec<String>,
}

// 📦 Struct für das Kochbuch
struct Kochbuch {
    rezepte: Vec<Rezept>,
}

impl Kochbuch {
    // 🔍 Sucht ein Rezept, das eine bestimmte Zutat enthält
    fn suche_rezept_mit_zutat(&self, zutat: &str) -> Option<&Rezept> {
        for r in &self.rezepte {
            if r.zutaten.contains(&String::from(zutat)) {
                return Some(r);
            }
        }
        None
    }
}

fn main() {
    let buch = Kochbuch {
        rezepte: vec![
            Rezept { name: String::from("Spaghetti"), zutaten: vec![String::from("Nudeln"), String::from("Tomaten")] },
            Rezept { name: String::from("Pfannkuchen"), zutaten: vec![String::from("Mehl"), String::from("Eier"), String::from("Milch")] },
        ],
    };

    if let Some(rezept) = buch.suche_rezept_mit_zutat("Mehl") {
        println!("Du kannst '{}' backen!", rezept.name);
    } else {
        println!("Kein Rezept mit dieser Zutat gefunden.");
    }
}
```

---

## Projekt 19: Lieferdienst

```rust
// 🏷️ Enum für den Status der Lieferung
#[derive(Debug, PartialEq)]
enum LieferStatus {
    Eingegangen,
    InZustellung,
    Geliefert,
}

// 📦 Struct für eine Bestellung
struct Bestellung {
    id: u32,
    status: LieferStatus,
}

// 📦 Struct für den Lieferdienst
struct Lieferdienst {
    bestellungen: Vec<Bestellung>,
}

impl Lieferdienst {
    // 🔍 Findet die nächste Bestellung, die in Zustellung ist
    fn naechste_zustellbare_bestellung(&self) -> Option<&Bestellung> {
        for b in &self.bestellungen {
            if b.status == LieferStatus::InZustellung {
                return Some(b);
            }
        }
        None
    }
}

fn main() {
    let dienst = Lieferdienst {
        bestellungen: vec![
            Bestellung { id: 101, status: LieferStatus::Eingegangen },
            Bestellung { id: 102, status: LieferStatus::InZustellung },
            Bestellung { id: 103, status: LieferStatus::Geliefert },
        ],
    };

    if let Some(b) = dienst.naechste_zustellbare_bestellung() {
        println!("Fahrer losschicken für Bestellung ID: {}", b.id);
    } else {
        println!("Keine Bestellungen zur Zustellung bereit.");
    }
}
```

---

## Projekt 20: Vereinsmitglieder

```rust
// 📦 Struct für ein Vereinsmitglied
struct Mitglied {
    name: String,
    aktiv: bool,
}

// 📦 Struct für den Verein
struct Verein {
    mitglieder: Vec<Mitglied>,
}

impl Verein {
    // 🔍 Sucht nach einem Mitglied anhand seines Namens
    fn mitglied_nach_name(&self, name: &str) -> Option<&Mitglied> {
        for m in &self.mitglieder {
            if m.name == name {
                return Some(m);
            }
        }
        None
    }
}

fn main() {
    let verein = Verein {
        mitglieder: vec![
            Mitglied { name: String::from("Jonas"), aktiv: true },
            Mitglied { name: String::from("Karin"), aktiv: false },
        ],
    };

    match verein.mitglied_nach_name("Jonas") {
        Some(m) => println!("Mitglied {} gefunden (Aktiv-Status: {}).", m.name, m.aktiv),
        None => println!("Dieses Mitglied existiert nicht im Verein."),
    }
}
```

---

## Projekt 21: Paket-Tracker

```rust
// 🏷️ Enum für den Paketzustand
#[derive(Debug, PartialEq)]
enum PaketStatus {
    Zustellbar,
    Beschaedigt,
}

// 📦 Struct für ein Paket
struct Paket {
    id: String,
    gewicht: f64,
    status: PaketStatus,
}

// 📦 Struct für das Paket-Depot
struct Depot {
    pakete: Vec<Paket>,
}

impl Depot {
    // 🔍 Sucht das erste beschädigte Paket zur Aussortierung
    fn finde_beschaedigtes_paket(&self) -> Option<&Paket> {
        for p in &self.pakete {
            if p.status == PaketStatus::Beschaedigt {
                return Some(p);
            }
        }
        None
    }
}

fn main() {
    let depot = Depot {
        pakete: vec![
            Paket { id: String::from("DE100"), gewicht: 2.5, status: PaketStatus::Zustellbar },
            Paket { id: String::from("DE101"), gewicht: 15.0, status: PaketStatus::Beschaedigt },
            Paket { id: String::from("DE102"), gewicht: 0.8, status: PaketStatus::Zustellbar },
        ],
    };

    if let Some(p) = depot.finde_beschaedigtes_paket() {
        println!("Achtung! Paket {} ({} kg) ist beschädigt und muss aussortiert werden.", p.id, p.gewicht);
    } else {
        println!("Alle Pakete sind im ordnungsgemäßen Zustand.");
    }
}
```

---

## Projekt 22: Notaufnahme

```rust
// 🏷️ Enum für die Dringlichkeitsstufe des Patienten
#[derive(Debug, PartialEq)]
enum Dringlichkeit {
    Niedrig,
    Mittel,
    Lebensbedrohlich,
}

// 📦 Struct für einen Patienten
struct Patient {
    name: String,
    prioritaet: Dringlichkeit,
}

// 📦 Struct für die Notaufnahme
struct Notaufnahme {
    wartende: Vec<Patient>,
}

impl Notaufnahme {
    // 🔍 Findet den ersten lebensbedrohlich erkrankten Patienten
    fn naechster_lebensbedrohlicher_patient(&self) -> Option<&Patient> {
        for p in &self.wartende {
            if p.prioritaet == Dringlichkeit::Lebensbedrohlich {
                return Some(p);
            }
        }
        None
    }
}

fn main() {
    let aufnahme = Notaufnahme {
        wartende: vec![
            Patient { name: String::from("Leo"), prioritaet: Dringlichkeit::Mittel },
            Patient { name: String::from("Marie"), prioritaet: Dringlichkeit::Lebensbedrohlich },
            Patient { name: String::from("Tom"), prioritaet: Dringlichkeit::Niedrig },
        ],
    };

    if let Some(p) = aufnahme.naechster_lebensbedrohlicher_patient() {
        println!("Sofortige Behandlung erforderlich für: Patient {}", p.name);
    } else {
        println!("Derzeit keine akuten Notfälle in der Warteliste.");
    }
}
```

---

## Projekt 23: Student ohne Note

```rust
// 📦 Struct für einen Studenten
struct Student {
    name: String,
    // 💡 Option<u32>: Some(Note) oder None, falls Prüfung noch nicht abgelegt
    note: Option<u32>,
}

// 📦 Struct für den Universitätskurs
struct Kurs {
    studenten: Vec<Student>,
}

impl Kurs {
    // 🔍 Findet einen Studenten, der die Prüfung noch nicht mitgemacht hat
    fn finde_student_ohne_pruefung(&self) -> Option<&Student> {
        for s in &self.studenten {
            if s.note.is_none() {
                return Some(s);
            }
        }
        None
    }
}

fn main() {
    let kurs = Kurs {
        studenten: vec![
            Student { name: String::from("Nils"), note: Some(2) },
            Student { name: String::from("Olivia"), note: None },
            Student { name: String::from("Peter"), note: Some(1) },
        ],
    };

    if let Some(s) = kurs.finde_student_ohne_pruefung() {
        println!("Achtung! {} muss die Prüfung noch nachschreiben.", s.name);
    } else {
        println!("Alle Studenten haben eine Note erhalten.");
    }
}
```

---

## Projekt 24: Kältester Ort

```rust
// 📦 Struct für einen meteorologischen Messpunkt
struct Messpunkt {
    ort: String,
    // 💡 Option<f64>: None, falls Sensor ausgefallen ist
    temperatur: Option<f64>,
}

// 📦 Struct für die Wetterstation
struct WetterStation {
    messpunkte: Vec<Messpunkt>,
}

impl WetterStation {
    // 🔍 Sucht nach dem Messpunkt mit der niedrigsten Temperatur
    fn kaeltester_ort(&self) -> Option<&Messpunkt> {
        let mut min_temp: Option<f64> = None;
        let mut bester: Option<&Messpunkt> = None;

        for m in &self.messpunkte {
            if let Some(temp) = m.temperatur {
                match min_temp {
                    Some(min) if temp < min => {
                        min_temp = Some(temp);
                        bester = Some(m);
                    }
                    None => {
                        min_temp = Some(temp);
                        bester = Some(m);
                    }
                    _ => {}
                }
            }
        }
        bester
    }
}

fn main() {
    let station = WetterStation {
        messpunkte: vec![
            Messpunkt { ort: String::from("Berlin"), temperatur: Some(18.5) },
            Messpunkt { ort: String::from("München (Fehler)"), temperatur: None },
            Messpunkt { ort: String::from("Zugspitze"), temperatur: Some(-2.0) },
        ],
    };

    if let Some(m) = station.kaeltester_ort() {
        println!("Kältester Ort ist {} mit {:?}°C.", m.ort, m.temperatur.unwrap());
    } else {
        println!("Keine gültigen Temperaturwerte gefunden.");
    }
}
```

---

## Projekt 25: Vokabelbox

```rust
// 📦 Struct für eine Lernkarte
struct Vokabelkarte {
    deutsch: String,
    englisch: String,
    fehler_anzahl: u32,
}

// 📦 Struct für die Vokabelbox
struct Vokabelbox {
    karten: Vec<Vokabelkarte>,
}

impl Vokabelbox {
    // 🔍 Findet die Vokabelkarte mit den meisten Fehlern
    fn schwerste_vokabel(&self) -> Option<&Vokabelkarte> {
        let mut max_fehler = 0;
        let mut beste: Option<&Vokabelkarte> = None;

        for k in &self.karten {
            if k.fehler_anzahl > max_fehler {
                max_fehler = k.fehler_anzahl;
                beste = Some(k);
            }
        }
        beste
    }
}

fn main() {
    let box_lern = Vokabelbox {
        karten: vec![
            Vokabelkarte { deutsch: String::from("Apfel"), englisch: String::from("apple"), fehler_anzahl: 1 },
            Vokabelkarte { deutsch: String::from("Geduld"), englisch: String::from("patience"), fehler_anzahl: 5 },
            Vokabelkarte { deutsch: String::from("Fehler"), englisch: String::from("error"), fehler_anzahl: 2 },
        ],
    };

    if let Some(k) = box_lern.schwerste_vokabel() {
        println!("Die schwerste Vokabel ist '{}' -> '{}' mit {} Fehlern.", k.deutsch, k.englisch, k.fehler_anzahl);
    } else {
        println!("Keine fehlerhaften Vokabelkarten in der Box.");
    }
}
```

---

## Phase 3: Fehlerbehandlung & Collections (Projekte 26 bis 50)

Die folgenden 25 Projekte konzentrieren sich primär auf die Arbeit mit der dynamischen Liste `Vec<T>` und dem Typ `Result<T, E>` (für fehleranfällige Operationen und präzise Fehlerbeschreibungen). Jedes Projekt kombiniert diese Collections und die Fehlerbehandlung mit den Konzepten aus Phase 1 und Phase 2 (Structs, Methoden, Enums, Pattern Matching, Ownership).

---

## Projekt 26: Hotel-Reservierungssystem

```rust
// 🏷️ Enum für den Status des Zimmers
#[derive(Debug, PartialEq, Clone, Copy)]
enum ZimmerStatus {
    Frei,
    Belegt,
}

// 📦 Struct für ein Zimmer
struct Zimmer {
    nummer: u32,
    status: ZimmerStatus,
}

// 📦 Struct für das Hotel
struct Hotel {
    // 🗃️ Vec<Zimmer> verwaltet dynamisch alle Zimmer
    zimmer: Vec<Zimmer>,
}

impl Hotel {
    // 🔍 Methode zum Buchen eines Zimmers
    // 🧠 Borrowing: Wir ändern den Zustand des Hotels (&mut self)
    // 💡 Result<(), String> gibt Ok(()) zurück oder einen Fehler als String
    fn zimmer_buchen(&mut self, nummer: u32) -> Result<(), String> {
        for z in &mut self.zimmer {
            if z.nummer == nummer {
                // 🔍 Pattern Matching auf den aktuellen Status
                return match z.status {
                    ZimmerStatus::Frei => {
                        z.status = ZimmerStatus::Belegt;
                        Ok(())
                    }
                    ZimmerStatus::Belegt => Err(format!("Zimmer {} ist bereits belegt.", nummer)),
                };
            }
        }
        Err(format!("Zimmer {} existiert nicht im Hotel.", nummer))
    }
}

fn main() {
    let mut mein_hotel = Hotel {
        zimmer: vec![
            Zimmer { nummer: 101, status: ZimmerStatus::Frei },
            Zimmer { nummer: 102, status: ZimmerStatus::Belegt },
        ],
    };

    // 🔍 Test der Buchung
    match mein_hotel.zimmer_buchen(101) {
        Ok(_) => println!("Zimmer 101 erfolgreich gebucht!"),
        Err(e) => println!("Fehler bei Buchung 101: {}", e),
    }

    match mein_hotel.zimmer_buchen(102) {
        Ok(_) => println!("Zimmer 102 erfolgreich gebucht!"),
        Err(e) => println!("Fehler bei Buchung 102: {}", e),
    }
}
```

---

## Projekt 27: Warenkorb-Bestandsabbuchung

```rust
// 🏷️ Enum für die Produkt-Kategorie
#[derive(Debug, Clone, Copy)]
enum Kategorie {
    Elektronik,
    Lebensmittel,
}

// 📦 Struct für ein Produkt
struct Produkt {
    id: u32,
    name: String,
    kategorie: Kategorie,
    preis: f64,
    bestand: u32,
}

// 📦 Struct für den Onlineshop
struct Shop {
    produkte: Vec<Produkt>,
}

impl Shop {
    // 🔍 Kauft eine bestimmte Menge eines Artikels und berechnet den Gesamtpreis
    // 🧠 Borrowing & Result: Verringert den Bestand im Erfolgsfall
    fn produkt_kaufen(&mut self, id: u32, menge: u32) -> Result<f64, String> {
        for p in &mut self.produkte {
            if p.id == id {
                if p.bestand >= menge {
                    p.bestand -= menge;
                    let gesamtpreis = p.preis * menge as f64;
                    return Ok(gesamtpreis);
                } else {
                    return Err(format!("Nicht genügend Bestand für '{}'. Nur noch {} auf Lager.", p.name, p.bestand));
                }
            }
        }
        Err(format!("Produkt mit ID {} wurde nicht gefunden.", id))
    }
}

fn main() {
    let mut mein_shop = Shop {
        produkte: vec![
            Produkt { id: 1, name: String::from("Laptop"), kategorie: Kategorie::Elektronik, preis: 899.99, bestand: 5 },
            Produkt { id: 2, name: String::from("Apfel"), kategorie: Kategorie::Lebensmittel, preis: 0.50, bestand: 100 },
        ],
    };

    match mein_shop.produkt_kaufen(1, 2) {
        Ok(preis) => println!("Kauf erfolgreich! Gesamtpreis: {} Euro.", preis),
        Err(e) => println!("Fehler beim Kauf: {}", e),
    }

    match mein_shop.produkt_kaufen(1, 10) {
        Ok(preis) => println!("Kauf erfolgreich! Gesamtpreis: {} Euro.", preis),
        Err(e) => println!("Fehler beim Kauf: {}", e),
    }
}
```

---

## Projekt 28: Banküberweisung

```rust
// 🏷️ Enum für den Kontotyp
#[derive(Debug, Clone, Copy)]
enum KontoTyp {
    Girokonto,
    Sparkonto,
}

// 📦 Struct für ein Bankkonto
struct Bankkonto {
    iban: String,
    inhaber: String,
    typ: KontoTyp,
    saldo: f64,
}

// 📦 Struct für das Bankensystem
struct Bank {
    konten: Vec<Bankkonto>,
}

impl Bank {
    // 🔍 Führt eine Überweisung von einem Konto zu einem anderen aus
    // 🧠 Borrowing & Vektoren: Da wir nicht zwei mutable Referenzen gleichzeitig
    // aus einem Vektor leihen können, arbeiten wir mit Indizes.
    fn ueberweisen(&mut self, von_iban: &str, an_iban: &str, betrag: f64) -> Result<(), String> {
        if betrag <= 0.0 {
            return Err(String::from("Der Betrag muss größer als Null sein."));
        }

        let mut von_idx = None;
        let mut an_idx = None;

        for (i, k) in self.konten.iter().enumerate() {
            if k.iban == von_iban {
                von_idx = Some(i);
            }
            if k.iban == an_iban {
                an_idx = Some(i);
            }
        }

        // 🔍 Pattern Matching mit if let auf die Indizes
        if let (Some(v_i), Some(a_i)) = (von_idx, an_idx) {
            if v_i == a_i {
                return Err(String::from("Sender- und Empfängerkonto müssen unterschiedlich sein."));
            }

            // Erst prüfen wir das Saldo des Absenders
            if self.konten[v_i].saldo < betrag {
                return Err(format!("Ungenügende Deckung auf dem Konto von {}.", self.konten[v_i].inhaber));
            }

            // Transaktion durchführen
            self.konten[v_i].saldo -= betrag;
            self.konten[a_i].saldo += betrag;
            Ok(())
        } else {
            Err(String::from("Eines oder beide Konten wurden nicht gefunden."))
        }
    }
}

fn main() {
    let mut bank = Bank {
        konten: vec![
            Bankkonto { iban: String::from("DE01"), inhaber: String::from("Alice"), typ: KontoTyp::Girokonto, saldo: 500.0 },
            Bankkonto { iban: String::from("DE02"), inhaber: String::from("Bob"), typ: KontoTyp::Sparkonto, saldo: 100.0 },
        ],
    };

    match bank.ueberweisen("DE01", "DE02", 150.0) {
        Ok(_) => println!("Überweisung erfolgreich durchgeführt!"),
        Err(e) => println!("Fehler bei Überweisung: {}", e),
    }
}
```

---

## Projekt 29: Bibliotheks-Rückgabe

```rust
// 🏷️ Enum für den Leihstatus
#[derive(Debug, PartialEq, Clone)]
enum LeihStatus {
    Verfuegbar,
    Ausgeliehen(String), // Speichert den Namen des Ausleihers
}

// 📦 Struct für ein Buch
struct Buch {
    isbn: String,
    titel: String,
    status: LeihStatus,
}

// 📦 Struct für die Bibliothek
struct Bibliothek {
    buecher: Vec<Buch>,
}

impl Bibliothek {
    // 🔍 Methode zur Rückgabe eines Buches
    // 🧠 Borrowing: Verändert den Ausleihstatus des Buches im Vektor
    fn buch_rueckgeben(&mut self, isbn: &str) -> Result<(), String> {
        for b in &mut self.buecher {
            if b.isbn == isbn {
                // Wir klonen den Status kurz, um Konflikte mit dem Borrow Checker zu vermeiden,
                // wenn wir den Status danach verändern.
                let status_kopie = b.status.clone();
                return match status_kopie {
                    LeihStatus::Ausgeliehen(name) => {
                        println!("Danke für die Rückgabe von '{}' (ausgeliehen von {}).", b.titel, name);
                        b.status = LeihStatus::Verfuegbar;
                        Ok(())
                    }
                    LeihStatus::Verfuegbar => {
                        Err(format!("Das Buch '{}' war gar nicht ausgeliehen.", b.titel))
                    }
                };
            }
        }
        Err(format!("Buch mit ISBN {} existiert nicht in dieser Bibliothek.", isbn))
    }
}

fn main() {
    let mut bib = Bibliothek {
        buecher: vec![
            Buch { isbn: String::from("111"), titel: String::from("Rust für Einsteiger"), status: LeihStatus::Ausgeliehen(String::from("Thorsten")) },
            Buch { isbn: String::from("222"), titel: String::from("Kochen ohne Topf"), status: LeihStatus::Verfuegbar },
        ],
    };

    match bib.buch_rueckgeben("111") {
        Ok(_) => println!("Rückbuchung abgeschlossen."),
        Err(e) => println!("Fehler: {}", e),
    }

    match bib.buch_rueckgeben("222") {
        Ok(_) => println!("Rückbuchung abgeschlossen."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 30: Kinosaal-Platzreservierung

```rust
// 🏷️ Enum für die Platzkategorie
#[derive(Debug, Clone, Copy)]
enum Kategorie {
    Parkett,
    Loge,
}

// 📦 Struct für einen Sitzplatz
struct Sitz {
    reihe: u32,
    nummer: u32,
    kategorie: Kategorie,
    reserviert: bool,
}

// 📦 Struct für das Kino
struct Kinosaal {
    sitze: Vec<Sitz>,
}

impl Kinosaal {
    // 🔍 Reserviert einen Sitzplatz
    // 🧠 Result & Borrowing: Gibt Fehler zurück, wenn bereits reserviert oder Sitz ungültig
    fn platz_reservieren(&mut self, reihe: u32, nummer: u32) -> Result<(), String> {
        for s in &mut self.sitze {
            if s.reihe == reihe && s.nummer == nummer {
                if s.reserviert {
                    return Err(format!("Sitz Reihe {}, Nummer {} ist bereits belegt.", reihe, nummer));
                } else {
                    s.reserviert = true;
                    return Ok(());
                }
            }
        }
        Err(format!("Sitz Reihe {}, Nummer {} existiert nicht in diesem Saal.", reihe, nummer))
    }
}

fn main() {
    let mut saal = Kinosaal {
        sitze: vec![
            Sitz { reihe: 1, nummer: 5, kategorie: Kategorie::Parkett, reserviert: false },
            Sitz { reihe: 2, nummer: 10, kategorie: Kategorie::Loge, reserviert: true },
        ],
    };

    match saal.platz_reservieren(1, 5) {
        Ok(_) => println!("Sitzplatz erfolgreich reserviert!"),
        Err(e) => println!("Fehler: {}", e),
    }

    match saal.platz_reservieren(2, 10) {
        Ok(_) => println!("Sitzplatz erfolgreich reserviert!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 31: Benutzerregistrierung

```rust
// 🏷️ Enum für die Systemrolle
#[derive(Debug, Clone, Copy)]
enum SystemRolle {
    Admin,
    Gast,
}

// 📦 Struct für einen Benutzer
struct Benutzer {
    id: u32,
    username: String,
    email: String,
    rolle: SystemRolle,
}

// 📦 Struct für das Benutzer-System
struct System {
    datenbank: Vec<Benutzer>,
}

impl System {
    // 🔍 Registriert einen neuen Benutzer
    // 🧠 Ownership: Das Benutzer-Objekt wird vollständig übergeben und in den Vektor verschoben
    fn benutzer_registrieren(&mut self, neuer_user: Benutzer) -> Result<(), String> {
        for u in &self.datenbank {
            if u.username == neuer_user.username {
                return Err(format!("Der Benutzername '{}' ist bereits vergeben.", neuer_user.username));
            }
            if u.email == neuer_user.email {
                return Err(format!("Die E-Mail-Adresse '{}' wird bereits verwendet.", neuer_user.email));
            }
        }
        self.datenbank.push(neuer_user);
        Ok(())
    }
}

fn main() {
    let mut sys = System {
        datenbank: vec![
            Benutzer { id: 1, username: String::from("rust_dev"), email: String::from("dev@rust.de"), rolle: SystemRolle::Admin },
        ],
    };

    let user_valid = Benutzer {
        id: 2,
        username: String::from("rustacean"),
        email: String::from("crab@rust.de"),
        rolle: SystemRolle::Gast,
    };

    let user_invalid = Benutzer {
        id: 3,
        username: String::from("rust_dev"),
        email: String::from("anderer@dev.de"),
        rolle: SystemRolle::Gast,
    };

    match sys.benutzer_registrieren(user_valid) {
        Ok(_) => println!("Registrierung erfolgreich!"),
        Err(e) => println!("Fehler: {}", e),
    }

    match sys.benutzer_registrieren(user_invalid) {
        Ok(_) => println!("Registrierung erfolgreich!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 32: Lagerbestandsentnahme (Error-Enum)

```rust
// 🏷️ Enum für spezifische Lagerfehler
#[derive(Debug, Clone, Copy)]
enum LagerFehler {
    ArtikelNichtGefunden,
    ZuWenigBestand(u32), // Beinhaltet den aktuellen Bestand
}

// 📦 Struct für einen Artikel
struct Artikel {
    name: String,
    bestand: u32,
}

// 📦 Struct für das Lager
struct Lager {
    bestandliste: Vec<Artikel>,
}

impl Lager {
    // 🔍 Methode zur Entnahme von Artikeln
    // 🧠 Result mit eigenem Enum als Fehlertyp
    fn artikel_entnehmen(&mut self, name: &str, menge: u32) -> Result<(), LagerFehler> {
        for a in &mut self.bestandliste {
            if a.name == name {
                if a.bestand >= menge {
                    a.bestand -= menge;
                    return Ok(());
                } else {
                    return Err(LagerFehler::ZuWenigBestand(a.bestand));
                }
            }
        }
        Err(LagerFehler::ArtikelNichtGefunden)
    }
}

fn main() {
    let mut lager = Lager {
        bestandliste: vec![
            Artikel { name: String::from("Hammer"), bestand: 3 },
            Artikel { name: String::from("Schraube"), bestand: 100 },
        ],
    };

    // 🔍 Pattern Matching auf den Custom-Fehlertyp
    match lager.artikel_entnehmen("Hammer", 5) {
        Ok(_) => println!("Entnahme erfolgreich!"),
        Err(LagerFehler::ArtikelNichtGefunden) => println!("Fehler: Artikel nicht gefunden!"),
        Err(LagerFehler::ZuWenigBestand(aktuell)) => println!("Fehler: Zu wenig Bestand! Nur noch {} vorhanden.", aktuell),
    }
}
```

---

## Projekt 33: Flug-Check-in

```rust
// 🏷️ Enum für die Flugklasse
#[derive(Debug, Clone, Copy)]
enum FlugKlasse {
    Economy,
    Business,
}

// 📦 Struct für einen Passagier
struct Passagier {
    ticket_nummer: String,
    name: String,
    klasse: FlugKlasse,
    eingecheckt: bool,
}

// 📦 Struct für den Flug
struct Flug {
    passagiere: Vec<Passagier>,
}

impl Flug {
    // 🔍 Führt den Check-in aus
    // 🧠 Borrowing & Result zur Validierung des Ticket-Status
    fn check_in(&mut self, ticket: &str) -> Result<(), String> {
        for p in &mut self.passagiere {
            if p.ticket_nummer == ticket {
                if p.eingecheckt {
                    return Err(format!("Passagier {} ist bereits eingecheckt.", p.name));
                } else {
                    p.eingecheckt = true;
                    return Ok(());
                }
            }
        }
        Err(format!("Ticketnummer {} existiert nicht.", ticket))
    }
}

fn main() {
    let mut mein_flug = Flug {
        passagiere: vec![
            Passagier { ticket_nummer: String::from("TX123"), name: String::from("Dieter"), klasse: FlugKlasse::Business, eingecheckt: false },
            Passagier { ticket_nummer: String::from("TX456"), name: String::from("Sabine"), klasse: FlugKlasse::Economy, eingecheckt: true },
        ],
    };

    match mein_flug.check_in("TX123") {
        Ok(_) => println!("Check-in für TX123 war erfolgreich!"),
        Err(e) => println!("Check-in fehlgeschlagen: {}", e),
    }

    match mein_flug.check_in("TX456") {
        Ok(_) => println!("Check-in für TX456 war erfolgreich!"),
        Err(e) => println!("Check-in fehlgeschlagen: {}", e),
    }
}
```

---

## Projekt 34: Klassenbuch-Noten

```rust
// 🏷️ Enum für die Fächer
#[derive(Debug, Clone, Copy)]
enum Fach {
    Mathematik,
    Deutsch,
}

// 📦 Struct für einen Schüler
struct Schueler {
    name: String,
    noten: Vec<u32>,
}

// 📦 Struct für das Klassenbuch
struct KlassenBuch {
    fach: Fach,
    schueler: Vec<Schueler>,
}

impl KlassenBuch {
    // 🔍 Trägt eine neue Note ein
    // 🧠 Borrowing: Sucht den Schüler im Vektor und fügt dem Vektor seiner Noten einen Wert hinzu
    fn note_eintragen(&mut self, name: &str, note: u32) -> Result<(), String> {
        if note < 1 || note > 6 {
            return Err(format!("Note {} ungültig. Es sind nur Noten von 1 bis 6 zulässig.", note));
        }

        for s in &mut self.schueler {
            if s.name == name {
                s.noten.push(note);
                return Ok(());
            }
        }
        Err(format!("Schüler '{}' konnte nicht gefunden werden.", name))
    }
}

fn main() {
    let mut mathe_buch = KlassenBuch {
        fach: Fach::Mathematik,
        schueler: vec![
            Schueler { name: String::from("Lukas"), noten: vec![2, 3] },
            Schueler { name: String::from("Mia"), noten: vec![1] },
        ],
    };

    match mathe_buch.note_eintragen("Lukas", 5) {
        Ok(_) => println!("Note für Lukas eingetragen."),
        Err(e) => println!("Fehler: {}", e),
    }

    match mathe_buch.note_eintragen("Mia", 8) {
        Ok(_) => println!("Note für Mia eingetragen."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 35: Parkplatz-Freigabe

```rust
// 🏷️ Enum für Fahrzeugtyp
#[derive(Debug, Clone, Copy)]
enum FahrzeugTyp {
    PKW,
    Motorrad,
}

// 📦 Struct für einen belegten Platz
struct BelegterPlatz {
    nummer: u32,
    typ: FahrzeugTyp,
    kennzeichen: String,
}

// 📦 Struct für den Parkplatz-Manager
struct ParkplatzManager {
    belegte_plaetze: Vec<BelegterPlatz>,
}

impl ParkplatzManager {
    // 🔍 Gibt einen Parkplatz frei und gibt das Kennzeichen zurück
    // 🧠 Ownership: Wir entnehmen das Element aus dem Vektor (ownership transfer)
    fn fahrzeug_ausfahren(&mut self, nummer: u32) -> Result<String, String> {
        let mut gefunden_index = None;

        for (i, p) in self.belegte_plaetze.iter().enumerate() {
            if p.nummer == nummer {
                gefunden_index = Some(i);
                break;
            }
        }

        // 🔍 Pattern Matching zur Entnahme des Fahrzeugs
        if let Some(idx) = gefunden_index {
            let ausgefahrenes_auto = self.belegte_plaetze.remove(idx);
            Ok(ausgefahrenes_auto.kennzeichen)
        } else {
            Err(format!("Kein belegtes Fahrzeug auf Platz {} gefunden.", nummer))
        }
    }
}

fn main() {
    let mut manager = ParkplatzManager {
        belegte_plaetze: vec![
            BelegterPlatz { nummer: 12, typ: FahrzeugTyp::PKW, kennzeichen: String::from("B-MW-1234") },
        ],
    };

    match manager.fahrzeug_ausfahren(12) {
        Ok(kz) => println!("Fahrzeug mit Kennzeichen '{}' ist ausgefahren.", kz),
        Err(e) => println!("Fehler: {}", e),
    }

    match manager.fahrzeug_ausfahren(15) {
        Ok(kz) => println!("Fahrzeug mit Kennzeichen '{}' ist ausgefahren.", kz),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 36: Smart-Home Aktivierung

```rust
// 🏷️ Enum für Gerätestatus
#[derive(Debug, PartialEq, Clone, Copy)]
enum GeraeteStatus {
    Aus,
    An,
    Stoerung,
}

// 📦 Struct für ein Gerät
struct SmartGeraet {
    id: String,
    name: String,
    status: GeraeteStatus,
}

// 📦 Struct für die Zentrale
struct Zentrale {
    geraete: Vec<SmartGeraet>,
}

impl Zentrale {
    // 🔍 Methode zum Einschalten eines Geräts
    // 🧠 Result: Gibt Fehlermeldungen bei Defekt oder Fehlen zurück
    fn geraet_einschalten(&mut self, id: &str) -> Result<(), String> {
        for g in &mut self.geraete {
            if g.id == id {
                // 🔍 Pattern Matching auf den Status
                return match g.status {
                    GeraeteStatus::Aus => {
                        g.status = GeraeteStatus::An;
                        Ok(())
                    }
                    GeraeteStatus::An => {
                        Err(format!("Das Gerät '{}' ist bereits eingeschaltet.", g.name))
                    }
                    GeraeteStatus::Stoerung => {
                        Err(format!("Das Gerät '{}' ist defekt (Störung)!", g.name))
                    }
                };
            }
        }
        Err(format!("Gerät mit ID '{}' existiert nicht.", id))
    }
}

fn main() {
    let mut smart_home = Zentrale {
        geraete: vec![
            SmartGeraet { id: String::from("L-1"), name: String::from("Flurlicht"), status: GeraeteStatus::Aus },
            SmartGeraet { id: String::from("H-2"), name: String::from("Heizung"), status: GeraeteStatus::Stoerung },
        ],
    };

    match smart_home.geraet_einschalten("L-1") {
        Ok(_) => println!("L-1 erfolgreich gestartet."),
        Err(e) => println!("Fehler: {}", e),
    }

    match smart_home.geraet_einschalten("H-2") {
        Ok(_) => println!("H-2 erfolgreich gestartet."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 37: Kundenkarte-Punkteabbuchung

```rust
// 🏷️ Enum für Kundenstatus
#[derive(Debug, Clone, Copy)]
enum KundenStatus {
    Silber,
    Gold,
}

// 📦 Struct für einen Kunden
struct Kunde {
    karten_nummer: String,
    status: KundenStatus,
    punkte: u32,
}

// 📦 Struct für das Bonussystem
struct TreueSystem {
    kunden: Vec<Kunde>,
}

impl TreueSystem {
    // 🔍 Bucht Bonuspunkte ab
    // 🧠 Borrowing: Zieht Punkte im Erfolgsfall ab
    fn punkte_einloesen(&mut self, karten_nummer: &str, punkte_kosten: u32) -> Result<(), String> {
        for k in &mut self.kunden {
            if k.karten_nummer == karten_nummer {
                if k.punkte >= punkte_kosten {
                    k.punkte -= punkte_kosten;
                    return Ok(());
                } else {
                    return Err(format!("Zu wenig Punkte. Vorhanden: {}, Benötigt: {}", k.punkte, punkte_kosten));
                }
            }
        }
        Err(format!("Karten-ID {} unbekannt.", karten_nummer))
    }
}

fn main() {
    let mut system = TreueSystem {
        kunden: vec![
            Kunde { karten_nummer: String::from("CARD-99"), status: KundenStatus::Gold, punkte: 150 },
        ],
    };

    match system.punkte_einloesen("CARD-99", 100) {
        Ok(_) => println!("Punkte erfolgreich eingelöst!"),
        Err(e) => println!("Fehler: {}", e),
    }

    match system.punkte_einloesen("CARD-99", 100) {
        Ok(_) => println!("Punkte erfolgreich eingelöst!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 38: Mitarbeiter-Beförderung

```rust
// 🏷️ Enum für die Mitarbeiter-Rollen
#[derive(Debug, PartialEq, Clone, Copy)]
enum Rolle {
    Junior,
    Senior,
    Lead,
}

// 📦 Struct für einen Mitarbeiter
struct Mitarbeiter {
    name: String,
    rolle: Rolle,
}

// 📦 Struct für das Unternehmen
struct Firma {
    mitarbeiter_liste: Vec<Mitarbeiter>,
}

impl Firma {
    // 🔍 Befördert einen Mitarbeiter auf die nächsthöhere Rolle
    // 🧠 Borrowing & Result: Findet und ändert die Rolle
    fn mitarbeiter_befoerdern(&mut self, name: &str) -> Result<(), String> {
        for m in &mut self.mitarbeiter_liste {
            if m.name == name {
                // 🔍 Pattern Matching zur Bestimmung der nächsten Stufe
                return match m.rolle {
                    Rolle::Junior => {
                        m.rolle = Rolle::Senior;
                        Ok(())
                    }
                    Rolle::Senior => {
                        m.rolle = Rolle::Lead;
                        Ok(())
                    }
                    Rolle::Lead => {
                        Err(format!("{} ist bereits Lead-Entwickler.", m.name))
                    }
                };
            }
        }
        Err(format!("Mitarbeiter '{}' existiert nicht.", name))
    }
}

fn main() {
    let mut firma = Firma {
        mitarbeiter_liste: vec![
            Mitarbeiter { name: String::from("Jonas"), rolle: Rolle::Junior },
            Mitarbeiter { name: String::from("Sarah"), rolle: Rolle::Lead },
        ],
    };

    match firma.mitarbeiter_befoerdern("Jonas") {
        Ok(_) => println!("Jonas wurde befördert."),
        Err(e) => println!("Fehler: {}", e),
    }

    match firma.mitarbeiter_befoerdern("Sarah") {
        Ok(_) => println!("Sarah wurde befördert."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 39: Fahrrad-Verleiher

```rust
// 🏷️ Enum für den Fahrradtyp
#[derive(Debug, Clone, Copy)]
enum RadTyp {
    City,
    EBike,
}

// 📦 Struct für ein Fahrrad
struct Fahrrad {
    id: u32,
    typ: RadTyp,
    ausgeliehen: bool,
}

// 📦 Struct für die Verleihstation
struct VerleihStation {
    ort: String,
    raeder: Vec<Fahrrad>,
}

impl VerleihStation {
    // 🔍 Startet eine Ausleihe für ein Fahrrad
    // 🧠 Borrowing & Result zur Statuskontrolle
    fn fahrrad_ausleihen(&mut self, id: u32) -> Result<(), String> {
        for r in &mut self.raeder {
            if r.id == id {
                if r.ausgeliehen {
                    return Err(format!("Fahrrad {} ist derzeit bereits verliehen.", id));
                } else {
                    r.ausgeliehen = true;
                    return Ok(());
                }
            }
        }
        Err(format!("Fahrrad ID {} nicht an Station {} gefunden.", id, self.ort))
    }
}

fn main() {
    let mut station = VerleihStation {
        ort: String::from("Hauptbahnhof"),
        raeder: vec![
            Fahrrad { id: 10, typ: RadTyp::EBike, ausgeliehen: false },
            Fahrrad { id: 11, typ: RadTyp::City, ausgeliehen: true },
        ],
    };

    match station.fahrrad_ausleihen(10) {
        Ok(_) => println!("Ausleihe für Fahrrad 10 gestartet."),
        Err(e) => println!("Fehler bei Ausleihe: {}", e),
    }

    match station.fahrrad_ausleihen(11) {
        Ok(_) => println!("Ausleihe für Fahrrad 11 gestartet."),
        Err(e) => println!("Fehler bei Ausleihe: {}", e),
    }
}
```

---

## Projekt 40: Playlist-Lied entfernen

```rust
// 🏷️ Enum für das Musikgenre
#[derive(Debug, Clone, Copy)]
enum Genre {
    Rock,
    Pop,
}

// 📦 Struct für ein Lied
#[derive(Debug, Clone)]
struct Lied {
    titel: String,
    dauer_sekunden: u32,
    genre: Genre,
}

// 📦 Struct für die Playlist
struct Playlist {
    lieder: Vec<Lied>,
}

impl Playlist {
    // 🔍 Löscht ein Lied anhand des Titels und gibt es zurück
    // 🧠 Ownership: Wir entnehmen das Lied komplett (ownership transfer)
    fn lied_entfernen(&mut self, titel: &str) -> Result<Lied, String> {
        let mut index_zum_loeschen = None;

        for (i, l) in self.lieder.iter().enumerate() {
            if l.titel == titel {
                index_zum_loeschen = Some(i);
                break;
            }
        }

        // 🔍 Pattern Matching mit if let zur Entnahme
        if let Some(idx) = index_zum_loeschen {
            let geloeschtes_lied = self.lieder.remove(idx);
            Ok(geloeschtes_lied)
        } else {
            Err(format!("Das Lied '{}' existiert nicht in der Playlist.", titel))
        }
    }
}

fn main() {
    let mut meine_playlist = Playlist {
        lieder: vec![
            Lied { titel: String::from("Cargo Rock"), dauer_sekunden: 195, genre: Genre::Rock },
        ],
    };

    match meine_playlist.lied_entfernen("Cargo Rock") {
        Ok(lied) => println!("Erfolgreich entfernt: '{}'", lied.titel),
        Err(e) => println!("Fehler: {}", e),
    }

    match meine_playlist.lied_entfernen("Unbekannter Song") {
        Ok(lied) => println!("Erfolgreich entfernt: '{}'", lied.titel),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 41: Wetterdaten-Validierung

```rust
// 🏷️ Enum für die Datenqualität
#[derive(Debug, Clone, Copy)]
enum DatenQualitaet {
    Zuverlaessig,
    Provisorisch,
}

// 📦 Struct für einen Messwert
struct Messwert {
    tag: u32,
    temperatur: Option<f64>, // Kann None sein, wenn der Sensor ausgefallen ist
    qualitaet: DatenQualitaet,
}

// 📦 Struct für die Wetterstation
struct WetterStation {
    messungen: Vec<Messwert>,
}

impl WetterStation {
    // 🔍 Berechnet den Durchschnitt aller gültigen Messwerte
    // 🧠 Result: Liefert einen Fehler bei Division durch Null (keine gültigen Werte)
    fn durchschnitt_berechnen(&self) -> Result<f64, String> {
        let mut summe = 0.0;
        let mut anzahl = 0;

        for m in &self.messungen {
            // 🔍 Pattern Matching auf den Option-Messwert
            if let Some(temp) = m.temperatur {
                summe += temp;
                anzahl += 1;
            }
        }

        if anzahl == 0 {
            Err(String::from("Keine gültigen Messdaten für die Durchschnittsberechnung."))
        } else {
            Ok(summe / anzahl as f64)
        }
    }
}

fn main() {
    let station_aktiv = WetterStation {
        messungen: vec![
            Messwert { tag: 1, temperatur: Some(15.2), qualitaet: DatenQualitaet::Zuverlaessig },
            Messwert { tag: 2, temperatur: None, qualitaet: DatenQualitaet::Provisorisch },
            Messwert { tag: 3, temperatur: Some(18.8), qualitaet: DatenQualitaet::Zuverlaessig },
        ],
    };

    let station_defekt = WetterStation {
        messungen: vec![
            Messwert { tag: 1, temperatur: None, qualitaet: DatenQualitaet::Provisorisch },
        ],
    };

    match station_aktiv.durchschnitt_berechnen() {
        Ok(avg) => println!("Durchschnittstemperatur: {:.2}°C", avg),
        Err(e) => println!("Fehler: {}", e),
    }

    match station_defekt.durchschnitt_berechnen() {
        Ok(avg) => println!("Durchschnittstemperatur: {:.2}°C", avg),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 42: Kartenstapel-Entnahme

```rust
// 🏷️ Enums für Kartenfarbe und Kartenwert
#[derive(Debug, Clone, Copy)]
enum Farbe {
    Herz,
    Pik,
}

#[derive(Debug, Clone, Copy)]
enum Wert {
    Ass,
    Koenig,
}

// 📦 Struct für eine Spielkarte
struct Spielkarte {
    farbe: Farbe,
    wert: Wert,
}

// 📦 Struct für den Kartenstapel
struct Kartenstapel {
    karten: Vec<Spielkarte>,
}

impl Kartenstapel {
    // 🔍 Zieht die oberste Karte vom Stapel (letztes Element im Vektor)
    // 🧠 Ownership & Result: Gibt die Karte zurück oder Fehler, wenn leer
    fn karte_ziehen(&mut self) -> Result<Spielkarte, String> {
        // pop() gibt Option<Spielkarte> zurück und entzieht dem Stapel das Element
        match self.karten.pop() {
            Some(karte) => Ok(karte),
            None => Err(String::from("Der Stapel ist leer. Es kann keine Karte gezogen werden.")),
        }
    }
}

fn main() {
    let mut stapel = Kartenstapel {
        karten: vec![
            Spielkarte { farbe: Farbe::Herz, wert: Wert::Ass },
            Spielkarte { farbe: Farbe::Pik, wert: Wert::Koenig },
        ],
    };

    for _ in 1..=3 {
        match stapel.karte_ziehen() {
            Ok(k) => println!("Gezogen: {:?} {:?}", k.farbe, k.wert),
            Err(e) => println!("Fehler beim Ziehen: {}", e),
        }
    }
}
```

---

## Projekt 43: To-Do-Erledigung

```rust
// 🏷️ Enum für Aufgabenpriorität
#[derive(Debug, Clone, Copy)]
enum Prioritaet {
    Hoch,
    Niedrig,
}

// 📦 Struct für eine Aufgabe
struct Aufgabe {
    id: u32,
    beschreibung: String,
    prioritaet: Prioritaet,
    erledigt: bool,
}

// 📦 Struct für die To-Do-Liste
struct Aufgabenliste {
    liste: Vec<Aufgabe>,
}

impl Aufgabenliste {
    // 🔍 Setzt eine Aufgabe auf "erledigt"
    // 🧠 Borrowing & Result zur Validierung
    fn aufgabe_erledigen(&mut self, id: u32) -> Result<(), String> {
        for a in &mut self.liste {
            if a.id == id {
                if a.erledigt {
                    return Err(format!("Die Aufgabe '{}' ist bereits als erledigt markiert.", a.beschreibung));
                } else {
                    a.erledigt = true;
                    return Ok(());
                }
            }
        }
        Err(format!("Aufgabe mit ID {} existiert nicht in der Liste.", id))
    }
}

fn main() {
    let mut todo = Aufgabenliste {
        liste: vec![
            Aufgabe { id: 1, beschreibung: String::from("Rust lernen"), prioritaet: Prioritaet::Hoch, erledigt: false },
        ],
    };

    match todo.aufgabe_erledigen(1) {
        Ok(_) => println!("Aufgabe 1 wurde als erledigt markiert."),
        Err(e) => println!("Fehler: {}", e),
    }

    match todo.aufgabe_erledigen(1) {
        Ok(_) => println!("Aufgabe 1 wurde als erledigt markiert."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 44: Münzautomat-Entnahme

```rust
// 🏷️ Enum für Münzen
#[derive(Debug, PartialEq, Clone, Copy)]
enum Muenze {
    Cent50,
    Euro1,
    Euro2,
}

// 📦 Struct für ein Münzfach
struct MuenzFach {
    muenz_typ: Muenze,
    anzahl: u32,
}

// 📦 Struct für den Kassenautomaten
struct WechselkassenAutomat {
    faecher: Vec<MuenzFach>,
}

impl WechselkassenAutomat {
    // 🔍 Entnimmt Münzen eines Typs
    // 🧠 Borrowing & Result: Ändert den Münzbestand im Fach
    fn muenzen_entnehmen(&mut self, typ: Muenze, menge: u32) -> Result<(), String> {
        for f in &mut self.faecher {
            if f.muenz_typ == typ {
                if f.anzahl >= menge {
                    f.anzahl -= menge;
                    return Ok(());
                } else {
                    return Err(format!("Wechselgeldfach für {:?} hat zu wenig Münzen (Vorhanden: {}).", typ, f.anzahl));
                }
            }
        }
        Err(format!("Münztyp {:?} wird von diesem Automaten nicht unterstützt.", typ))
    }
}

fn main() {
    let mut automat = WechselkassenAutomat {
        faecher: vec![
            MuenzFach { muenz_typ: Muenze::Euro1, anzahl: 10 },
            MuenzFach { muenz_typ: Muenze::Euro2, anzahl: 2 },
        ],
    };

    match automat.muenzen_entnehmen(Muenze::Euro2, 1) {
        Ok(_) => println!("Münze erfolgreich ausgezahlt."),
        Err(e) => println!("Fehler: {}", e),
    }

    match automat.muenzen_entnehmen(Muenze::Euro2, 3) {
        Ok(_) => println!("Münzen erfolgreich ausgezahlt."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 45: Flug-Gepäckaufgabe

```rust
// 🏷️ Enum für den Status des Gepäcks
#[derive(Debug, Clone, Copy)]
enum GepaeckStatus {
    Normal,
    Sperrgut,
}

// 📦 Struct für ein Gepäckstück
struct Gepaeck {
    id: String,
    gewicht: f64,
    status: GepaeckStatus,
}

// 📦 Struct für einen Passagier
struct Passagier {
    name: String,
    gepaeck_liste: Vec<Gepaeck>,
}

impl Passagier {
    // 🔍 Fügt dem Passagier ein Gepäckstück hinzu, wenn das Gewichtslimit nicht überschritten wird
    // 🧠 Ownership: Gepäckstück wird in den Vektor verschoben
    fn gepaeck_hinzufuegen(&mut self, neues_gepaeck: Gepaeck, max_gesamtgewicht: f64) -> Result<(), String> {
        let mut aktuelles_gewicht = 0.0;
        for g in &self.gepaeck_liste {
            aktuelles_gewicht += g.gewicht;
        }

        if aktuelles_gewicht + neues_gepaeck.gewicht > max_gesamtgewicht {
            return Err(format!(
                "Abgelehnt: Gepäckgewicht überschreitet Limit um {:.2} kg.",
                (aktuelles_gewicht + neues_gepaeck.gewicht) - max_gesamtgewicht
            ));
        }

        self.gepaeck_liste.push(neues_gepaeck);
        Ok(())
    }
}

fn main() {
    let mut uwe = Passagier {
        name: String::from("Uwe"),
        gepaeck_liste: vec![
            Gepaeck { id: String::from("BAG-1"), gewicht: 18.5, status: GepaeckStatus::Normal },
        ],
    };

    let bag2 = Gepaeck { id: String::from("BAG-2"), gewicht: 10.0, status: GepaeckStatus::Sperrgut };

    // Gewichtslimit 23.0 kg
    match uwe.gepaeck_hinzufuegen(bag2, 23.0) {
        Ok(_) => println!("Gepäck erfolgreich registriert."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 46: Projekt-Teambildung

```rust
// 🏷️ Enum für die Kernkompetenz
#[derive(Debug, Clone, Copy)]
enum Skill {
    Rust,
    Design,
}

// 📦 Struct für ein Teammitglied
struct Mitglied {
    name: String,
    skill: Skill,
}

// 📦 Struct für das Projektteam
struct ProjektTeam {
    max_groesse: usize,
    mitglieder: Vec<Mitglied>,
}

impl ProjektTeam {
    // 🔍 Nimmt ein neues Mitglied ins Team auf
    // 🧠 Ownership & Result: Überprüft Namenskonflikte und Teamgröße vor der Aufnahme
    fn mitglied_aufnehmen(&mut self, neues_mitglied: Mitglied) -> Result<(), String> {
        if self.mitglieder.len() >= self.max_groesse {
            return Err(format!("Team voll! Maximale Größe von {} erreicht.", self.max_groesse));
        }

        for m in &self.mitglieder {
            if m.name == neues_mitglied.name {
                return Err(format!("Ein Mitglied namens '{}' existiert bereits.", neues_mitglied.name));
            }
        }

        // Ownership wird in den Vektor verschoben
        self.mitglieder.push(neues_mitglied);
        Ok(())
    }
}

fn main() {
    let mut team = ProjektTeam {
        max_groesse: 2,
        mitglieder: vec![
            Mitglied { name: String::from("Clara"), skill: Skill::Rust },
        ],
    };

    let mitglied2 = Mitglied { name: String::from("Erik"), skill: Skill::Design };
    let mitglied3 = Mitglied { name: String::from("Clara"), skill: Skill::Rust };

    match team.mitglied_aufnehmen(mitglied2) {
        Ok(_) => println!("Mitglied Erik wurde aufgenommen."),
        Err(e) => println!("Aufnahme fehlgeschlagen: {}", e),
    }

    match team.mitglied_aufnehmen(mitglied3) {
        Ok(_) => println!("Mitglied Clara wurde aufgenommen."),
        Err(e) => println!("Aufnahme fehlgeschlagen: {}", e),
    }
}
```

---

## Projekt 47: Streaming-Abonnement

```rust
// 🏷️ Enum für das Abonnement-Paket
#[derive(Debug, Clone, Copy)]
enum PaketTyp {
    Standard,
    Premium,
}

// 📦 Struct für ein Benutzerkonto
struct AboKonto {
    kunden_id: u32,
    paket: PaketTyp,
    aktiv: bool,
}

// 📦 Struct für den Streaming-Dienst
struct StreamingDienst {
    kunden_datenbank: Vec<AboKonto>,
}

impl StreamingDienst {
    // 🔍 Kündigt das Abonnement
    // 🧠 Borrowing & Result zur Zustandskontrolle
    fn abo_kuendigen(&mut self, kunden_id: u32) -> Result<(), String> {
        for k in &mut self.kunden_datenbank {
            if k.kunden_id == kunden_id {
                if !k.aktiv {
                    return Err(format!("Das Abonnement von Kunde {} ist bereits inaktiv.", kunden_id));
                } else {
                    k.aktiv = false;
                    return Ok(());
                }
            }
        }
        Err(format!("Kunden-ID {} wurde nicht gefunden.", kunden_id))
    }
}

fn main() {
    let mut dienst = StreamingDienst {
        kunden_datenbank: vec![
            AboKonto { kunden_id: 4004, paket: PaketTyp::Premium, aktiv: true },
        ],
    };

    match dienst.abo_kuendigen(4004) {
        Ok(_) => println!("Kündigung für 4004 erfolgreich."),
        Err(e) => println!("Fehler: {}", e),
    }

    match dienst.abo_kuendigen(4004) {
        Ok(_) => println!("Kündigung für 4004 erfolgreich."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 48: Rezept-Zutat ersetzen

```rust
// 🏷️ Enum für die Rezeptschwierigkeit
#[derive(Debug, Clone, Copy)]
enum Schwierigkeit {
    Einfach,
    Schwer,
}

// 📦 Struct für ein Kochrezept
struct Rezept {
    name: String,
    schwierigkeit: Schwierigkeit,
    zutaten: Vec<String>,
}

impl Rezept {
    // 🔍 Ersetzt eine Zutat durch eine andere Alternative
    // 🧠 Borrowing & Result: Verändert den Vektor der Zutaten
    fn zutat_ersetzen(&mut self, alte_zutat: &str, neue_zutat: &str) -> Result<(), String> {
        for z in &mut self.zutaten {
            if z == alte_zutat {
                *z = String::from(neue_zutat); // Dereferenzierung und Zuweisung
                return Ok(());
            }
        }
        Err(format!("Die Zutat '{}' konnte im Rezept nicht gefunden werden.", alte_zutat))
    }
}

fn main() {
    let mut rezept = Rezept {
        name: String::from("Spaghetti Napoli"),
        schwierigkeit: Schwierigkeit::Einfach,
        zutaten: vec![
            String::from("Nudeln"),
            String::from("Zucker"),
        ],
    };

    match rezept.zutat_ersetzen("Zucker", "Tomatensoße") {
        Ok(_) => println!("Zutat erfolgreich ersetzt!"),
        Err(e) => println!("Fehler: {}", e),
    }

    match rezept.zutat_ersetzen("Fleisch", "Tofu") {
        Ok(_) => println!("Zutat erfolgreich ersetzt!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 49: Logbuch-Filterung

```rust
// 🏷️ Enum für die System-Logstufen
#[derive(Debug, PartialEq, Clone, Copy)]
enum LogStufe {
    Info,
    Fehler,
}

// 📦 Struct für einen Logeintrag
struct LogEintrag {
    stufe: LogStufe,
    nachricht: String,
}

// 📦 Struct für das Logbuch
struct SystemLog {
    eintraege: Vec<LogEintrag>,
}

impl SystemLog {
    // 🔍 Filtert Einträge nach einer bestimmten Stufe
    // 🧠 Lifetime & Result: Liefert eine Liste von Referenzen im Erfolgsfall,
    // oder einen Fehler, wenn kein passender Eintrag existiert.
    fn filtere_stufe(&self, stufe: LogStufe) -> Result<Vec<&LogEintrag>, String> {
        let mut gefiltert = Vec::new();

        for e in &self.eintraege {
            if e.stufe == stufe {
                gefiltert.push(e);
            }
        }

        if gefiltert.is_empty() {
            Err(format!("Keine Logeinträge mit der Stufe {:?} vorhanden.", stufe))
        } else {
            Ok(gefiltert)
        }
    }
}

fn main() {
    let log = SystemLog {
        eintraege: vec![
            LogEintrag { stufe: LogStufe::Info, nachricht: String::from("Datenbank verbunden.") },
            LogEintrag { stufe: LogStufe::Info, nachricht: String::from("Server gestartet.") },
        ],
    };

    match log.filtere_stufe(LogStufe::Fehler) {
        Ok(liste) => println!("Fehler-Logeinträge gefunden: {}", liste.len()),
        Err(e) => println!("Fehler bei Suche: {}", e),
    }
}
```

---

## Projekt 50: Einkaufsliste-Mengen-Update

```rust
// 🏷️ Enum für die Wichtigkeit des Einkaufs
#[derive(Debug, Clone, Copy)]
enum Wichtigkeit {
    Optional,
    Wichtig,
}

// 📦 Struct für einen Listeneintrag
struct EinkaufsEintrag {
    artikel: String,
    menge: u32,
    wichtigkeit: Wichtigkeit,
}

// 📦 Struct für die Einkaufsliste
struct Einkaufsliste {
    eintraege: Vec<Eintrag>,
}

// 💡 Alias zur Verwendung des Structs mit kürzerem Namen (für Demonstration)
type Eintrag = EinkaufsEintrag;

impl Einkaufsliste {
    // 🔍 Erhöht die menge eines Artikels
    // 🧠 Borrowing & Result: Liefert Fehler, falls der Artikel nicht existiert
    fn menge_erhoehen(&mut self, artikel: &str, betrag: u32) -> Result<(), String> {
        for e in &mut self.eintraege {
            if e.artikel == artikel {
                e.menge += betrag;
                return Ok(());
            }
        }
        Err(format!("Artikel '{}' befindet sich nicht auf der Einkaufsliste.", artikel))
    }
}

fn main() {
    let mut liste = Einkaufsliste {
        eintraege: vec![
            Eintrag { artikel: String::from("Milch"), menge: 1, wichtigkeit: Wichtigkeit::Wichtig },
        ],
    };

    match liste.menge_erhoehen("Milch", 2) {
        Ok(_) => println!("Milchmenge erhöht."),
        Err(e) => println!("Fehler: {}", e),
    }

    match liste.menge_erhoehen("Brot", 1) {
        Ok(_) => println!("Brotmenge erhöht."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Phase 3: Projekte 51 bis 75 (Fehlerbehandlung & Collections)

In dieser Phase konzentrieren wir uns auf die praktische Anwendung der Collections (speziell `HashMap<K, V>`) und der fehlerrobusten Programmierung mittels `Option<T>` und `Result<T, E>`. Alle Projekte wiederholen und kombinieren die Konzepte der vorherigen Phasen (Variablen, Kontrollfluss, Benutzereingabe, Ownership/Borrowing, Structs, Methoden, Enums und Pattern Matching).

---

## Projekt 51: Telefonbuch (Telefonnummer-Zuordnung)
```rust
use std::collections::HashMap;

// 📦 Struct für das Telefonbuch
struct Telefonbuch {
    // 🗄️ HashMap zur Zuordnung von Name zu Telefonnummer
    eintraege: HashMap<String, String>,
}

impl Telefonbuch {
    // 📦 Konstruktor-Methode zum Erstellen eines neuen Telefonbuchs
    fn neu() -> Self {
        Telefonbuch {
            eintraege: HashMap::new(),
        }
    }

    // 📦 Methode zum Hinzufügen eines Eintrags
    // 🧠 Ownership: Name und Nummer werden als String übergeben und in die HashMap verschoben
    fn hinzufuegen(&mut self, name: String, nummer: String) {
        self.eintraege.insert(name, nummer);
    }

    // 📦 Methode zum Suchen einer Nummer
    // 🛡️ Option: Gibt Some(&String) zurück, wenn der Name existiert, andernfalls None
    fn suchen(&self, name: &str) -> Option<&String> {
        self.eintraege.get(name)
    }
}

fn main() {
    let mut mein_buch = Telefonbuch::neu();

    // 🧠 Erstellen von Strings und Hinzufügen zum Telefonbuch
    mein_buch.hinzufuegen(String::from("Alice"), String::from("0123-456789"));
    mein_buch.hinzufuegen(String::from("Bob"), String::from("0987-654321"));

    let name = "Alice";
    // 🔍 Pattern Matching (match) auf das Option-Ergebnis der Suche
    match mein_buch.suchen(name) {
        Some(nummer) => println!("Die Nummer von {} ist: {}", name, nummer),
        None => println!("Kein Eintrag für {} gefunden.", name),
    }

    let unbekannt = "Charlie";
    // 🔍 Pattern Matching (if let) zur kompakten Fehlerbehandlung
    if let Some(nummer) = mein_buch.suchen(unbekannt) {
        println!("Die Nummer von {} ist: {}", unbekannt, nummer);
    } else {
        println!("{} wurde nicht im Telefonbuch gefunden.", unbekannt);
    }
}
```

---

## Projekt 52: Lagerplatz-Finder (Belegungs-Tracker)
```rust
use std::collections::HashMap;

// 📦 Struct für das Lager
struct Lager {
    // 🗄️ Regalnummer (u32) zu Artikelname (String)
    regale: HashMap<u32, String>,
}

impl Lager {
    fn neu() -> Self {
        Lager {
            regale: HashMap::new(),
        }
    }

    // 📦 Methode zum Einlagern
    fn einlagern(&mut self, regal: u32, artikel: String) {
        self.regale.insert(regal, artikel);
    }

    // 🛡️ Option: Sucht nach dem Artikel und gibt die Regalnummer (Some(u32)) zurück
    // 🧠 Borrowing: Wir durchsuchen die HashMap per Referenz
    fn finde_regal(&self, gesuchter_artikel: &str) -> Option<u32> {
        for (regal, artikel) in &self.regale {
            if artikel == gesuchter_artikel {
                return Some(*regal); // 🧠 Dereferenzieren, da regal ein &u32 ist
            }
        }
        None
    }
}

fn main() {
    let mut mein_lager = Lager::neu();
    mein_lager.einlagern(101, String::from("Schraubenschluessel"));
    mein_lager.einlagern(102, String::from("Bohrmaschine"));

    let artikel = "Bohrmaschine";
    // 🔍 Pattern Matching mit match
    match mein_lager.finde_regal(artikel) {
        Some(regal) => println!("Der Artikel '{}' liegt in Regal {}.", artikel, regal),
        None => println!("Artikel '{}' nicht im Lager gefunden.", artikel),
    }
}
```

---

## Projekt 53: Kinosaal-Reservierung
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Status eines Sitzplatzes
enum ReservierungsStatus {
    Frei,
    Reserviert(String), // 🧠 Der Name des Gasts wird im Enum gespeichert
}

// 📦 Struct für den Kinosaal
struct Kinosaal {
    // 🗄️ Sitzplatznummer (z.B. "A12") zu Reservierungsstatus
    sitze: HashMap<String, ReservierungsStatus>,
}

impl Kinosaal {
    fn neu() -> Self {
        Kinosaal {
            sitze: HashMap::new(),
        }
    }

    // 📦 Methode zum Einrichten eines Sitzes
    fn sitz_einrichten(&mut self, sitz: String) {
        self.sitze.insert(sitz, ReservierungsStatus::Frei);
    }

    // 🛡️ Result: Versucht einen Sitz zu reservieren
    fn reservieren(&mut self, sitz: &str, name: String) -> Result<(), String> {
        // 🔍 Pattern Matching mit match auf die HashMap-Abfrage
        // 🧠 get_mut liefert eine veränderbare Referenz Option<&mut ReservierungsStatus>
        match self.sitze.get_mut(sitz) {
            Some(status) => match status {
                ReservierungsStatus::Frei => {
                    *status = ReservierungsStatus::Reserviert(name);
                    Ok(())
                }
                ReservierungsStatus::Reserviert(gast) => {
                    Err(format!("Sitz {} ist bereits für {} reserviert!", sitz, gast))
                }
            },
            None => Err(format!("Sitz {} existiert nicht in diesem Saal.", sitz)),
        }
    }
}

fn main() {
    let mut saal = Kinosaal::neu();
    saal.sitz_einrichten(String::from("A12"));
    saal.sitz_einrichten(String::from("A13"));

    // Erfolgreiche Reservierung
    match saal.reservieren("A12", String::from("Max")) {
        Ok(()) => println!("Sitz A12 erfolgreich reserviert!"),
        Err(fehler) => println!("Fehler: {}", fehler),
    }

    // Doppelte Reservierung (Fehlertest)
    if let Err(fehler) = saal.reservieren("A12", String::from("Anna")) {
        println!("Reservierung fehlgeschlagen: {}", fehler);
    }
}
```

---

## Projekt 54: Bibliotheks-Katalog
```rust
use std::collections::HashMap;

// 📦 Struct für ein Buch
struct Buch {
    titel: String,
    autor: String,
    ausgeliehen: bool,
}

// 📦 Struct für die Bibliothek
struct Bibliothek {
    // 🗄️ ISBN (String) zu Buchdaten
    katalog: HashMap<String, Buch>,
}

impl Bibliothek {
    fn neu() -> Self {
        Bibliothek {
            katalog: HashMap::new(),
        }
    }

    fn buch_hinzufuegen(&mut self, isbn: String, buch: Buch) {
        self.katalog.insert(isbn, buch);
    }

    // 🛡️ Result: Versucht ein Buch auszuleihen
    fn buch_ausleihen(&mut self, isbn: &str) -> Result<(), String> {
        match self.katalog.get_mut(isbn) {
            Some(buch) => {
                if buch.ausgeliehen {
                    Err(format!("Das Buch '{}' ist bereits ausgeliehen.", buch.titel))
                } else {
                    buch.ausgeliehen = true;
                    Ok(())
                }
            }
            None => Err(String::from("ISBN im Katalog nicht gefunden.")),
        }
    }
}

fn main() {
    let mut bib = Bibliothek::neu();
    let isbn = "978-3-16-148410-0";
    
    bib.buch_hinzufuegen(
        isbn.to_string(),
        Buch {
            titel: String::from("Rust fuer Anfaenger"),
            autor: String::from("Thorsten"),
            ausgeliehen: false,
        },
    );

    // Erstes Ausleihen
    match bib.buch_ausleihen(isbn) {
        Ok(()) => println!("Buch erfolgreich ausgeliehen!"),
        Err(e) => println!("Fehler: {}", e),
    }

    // Zweites Ausleihen (Sollte fehlschlagen)
    if let Err(e) = bib.buch_ausleihen(isbn) {
        println!("Konnte Buch nicht ausleihen: {}", e);
    }
}
```

---

## Projekt 55: Waehrungsrechner (Wechselkurs-Tabelle)
```rust
use std::collections::HashMap;

// 📦 Struct für die Wechselstube
struct Wechselstube {
    // 🗄️ Währungscode (z.B. "USD") zu Kurs im Vergleich zum Euro (1 EUR = X USD)
    kurse: HashMap<String, f64>,
}

impl Wechselstube {
    fn neu() -> Self {
        Wechselstube {
            kurse: HashMap::new(),
        }
    }

    fn kurs_setzen(&mut self, waehrung: String, kurs: f64) {
        self.kurse.insert(waehrung, kurs);
    }

    // 🛡️ Option: Berechnet den Betrag in Euro für eine gegebene Währung
    fn in_euro_umrechnen(&self, betrag: f64, waehrung: &str) -> Option<f64> {
        // 🔍 get() gibt Option<&f64> zurück
        self.kurse.get(waehrung).map(|kurs| betrag / kurs)
    }
}

fn main() {
    let mut stube = Wechselstube::neu();
    stube.kurs_setzen(String::from("USD"), 1.09);
    stube.kurs_setzen(String::from("GBP"), 0.86);

    let betrag = 100.0;
    let waehrung = "USD";

    // 🔍 Pattern Matching
    match stube.in_euro_umrechnen(betrag, waehrung) {
        Some(euro_betrag) => println!("{:.2} {} sind {:.2} EUR.", betrag, waehrung, euro_betrag),
        None => println!("Waehrung '{}' wird nicht unterstuetzt.", waehrung),
    }
}
```

---

## Projekt 56: Studenten-Register
```rust
use std::collections::HashMap;

// 📦 Struct für die Studentendaten
struct Student {
    name: String,
    fach: String,
}

// 📦 Struct für das Register
struct Register {
    // 🗄️ Matrikelnummer (u32) zu Student
    studenten: HashMap<u32, Student>,
}

impl Register {
    fn neu() -> Self {
        Register {
            studenten: HashMap::new(),
        }
    }

    fn eintragen(&mut self, matrikelnummer: u32, student: Student) {
        self.studenten.insert(matrikelnummer, student);
    }

    // 🛡️ Option: Sucht einen Studenten per Matrikelnummer
    fn suchen(&self, matrikelnummer: u32) -> Option<&Student> {
        self.studenten.get(&matrikelnummer)
    }
}

fn main() {
    let mut reg = Register::neu();
    reg.eintragen(
        12345,
        Student {
            name: String::from("Lukas"),
            fach: String::from("Informatik"),
        },
    );

    let gesuchte_nummer = 12345;
    // 🔍 Pattern Matching mit if let
    if let Some(studi) = reg.suchen(gesuchte_nummer) {
        println!("Matrikelnummer {} gehoert zu {} (Fach: {}).", gesuchte_nummer, studi.name, studi.fach);
    } else {
        println!("Kein Student mit Nummer {} gefunden.", gesuchte_nummer);
    }
}
```

---

## Projekt 57: DNS-Resolver (Domain-IP-Zuordnung)
```rust
use std::collections::HashMap;

// 📦 Struct für eine IP-Adresse
#[derive(Clone, Copy)]
struct IpAdresse {
    oktette: [u8; 4],
}

impl IpAdresse {
    fn anzeigen(&self) -> String {
        format!("{}.{}.{}.{}", self.oktette[0], self.oktette[1], self.oktette[2], self.oktette[3])
    }
}

// 📦 Struct für den DNS-Verwalter
struct DnsVerwalter {
    // 🗄️ Domain (String) zu IP-Adresse (IpAdresse)
    eintraege: HashMap<String, IpAdresse>,
}

impl DnsVerwalter {
    fn neu() -> Self {
        DnsVerwalter {
            eintraege: HashMap::new(),
        }
    }

    fn domain_eintragen(&mut self, domain: String, ip: IpAdresse) {
        self.eintraege.insert(domain, ip);
    }

    // 🛡️ Option: Liefert die IP-Adresse zurück, falls vorhanden
    fn aufloesen(&self, domain: &str) -> Option<IpAdresse> {
        // 🧠 Da IpAdresse Copy implementiert, können wir sie einfach kopieren (*ip)
        self.eintraege.get(domain).copied()
    }
}

fn main() {
    let mut dns = DnsVerwalter::neu();
    dns.domain_eintragen(String::from("rust-lang.org"), IpAdresse { oktette: [13, 224, 29, 74] });

    let ziel = "rust-lang.org";
    match dns.aufloesen(ziel) {
        Some(ip) => println!("Die IP-Adresse von {} ist {}.", ziel, ip.anzeigen()),
        None => println!("Konnte IP fuer {} nicht aufloesen.", ziel),
    }
}
```

---

## Projekt 58: Benutzer-Rollen-Zuweisung
```rust
use std::collections::HashMap;

// 🏷️ Enum für Benutzerrollen
enum Rolle {
    Admin,
    Moderator,
    Nutzer,
}

// 📦 Struct für das Berechtigungssystem
struct Berechtigungssystem {
    // 🗄️ Benutzername (String) zu Rolle
    nutzer: HashMap<String, Rolle>,
}

impl Berechtigungssystem {
    fn neu() -> Self {
        Berechtigungssystem {
            nutzer: HashMap::new(),
        }
    }

    fn rolle_zuweisen(&mut self, name: String, rolle: Rolle) {
        self.nutzer.insert(name, rolle);
    }

    // 🛡️ Option/bool: Prüft administrative Rechte
    fn ist_admin(&self, name: &str) -> bool {
        // 🔍 Pattern Matching auf Option-Ergebnis der HashMap
        match self.nutzer.get(name) {
            Some(Rolle::Admin) => true,
            _ => false, // 🔍 Fängt Moderator, Nutzer und None ab
        }
    }
}

fn main() {
    let mut system = Berechtigungssystem::neu();
    system.rolle_zuweisen(String::from("Thorsten"), Rolle::Admin);
    system.rolle_zuweisen(String::from("GastUser"), Rolle::Nutzer);

    let user1 = "Thorsten";
    let user2 = "GastUser";

    println!("Darf {} administrative Aktionen ausfuehren? {}", user1, system.ist_admin(user1));
    println!("Darf {} administrative Aktionen ausfuehren? {}", user2, system.ist_admin(user2));
}
```

---

## Projekt 59: Paketverfolgungs-Zentrale (Tracking)
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Paketstatus
#[derive(Clone)]
enum PaketStatus {
    ImDepot,
    InZustellung,
    Zugestellt,
}

// 📦 Struct für ein Paket
struct Paket {
    empfaenger: String,
    status: PaketStatus,
}

// 📦 Struct für den Paket-Dienst
struct PaketDienst {
    // 🗄️ Tracking-Code (String) zu Paket
    sendungen: HashMap<String, Paket>,
}

impl PaketDienst {
    fn neu() -> Self {
        PaketDienst {
            sendungen: HashMap::new(),
        }
    }

    fn paket_einbuchen(&mut self, code: String, empfaenger: String) {
        self.sendungen.insert(code, Paket {
            empfaenger,
            status: PaketStatus::ImDepot,
        });
    }

    // 🛡️ Result: Aktualisiert den Paketstatus
    fn status_aktualisieren(&mut self, code: &str, neuer_status: PaketStatus) -> Result<(), String> {
        match self.sendungen.get_mut(code) {
            Some(paket) => {
                paket.status = neuer_status;
                Ok(())
            }
            None => Err(format!("Paket mit Code {} existiert nicht.", code)),
        }
    }
}

fn main() {
    let mut dienst = PaketDienst::neu();
    let code = "TRACK1234";
    
    dienst.paket_einbuchen(code.to_string(), String::from("Sabine"));

    // Aktualisierung
    match dienst.status_aktualisieren(code, PaketStatus::InZustellung) {
        Ok(()) => println!("Paketstatus fuer {} erfolgreich aktualisiert.", code),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 60: Warenbestand-Warnung
```rust
use std::collections::HashMap;

// 📦 Struct für das Lager
struct Lagerbestand {
    // 🗄️ Artikelname (String) zu Stückzahl (u32)
    inventar: HashMap<String, u32>,
}

impl Lagerbestand {
    fn neu() -> Self {
        Lagerbestand {
            inventar: HashMap::new(),
        }
    }

    fn anliefern(&mut self, artikel: String, anzahl: u32) {
        // 🧠 entry-API von HashMap zur Aktualisierung oder Erstellung
        let bestand = self.inventar.entry(artikel).or_insert(0);
        *bestand += anzahl;
    }

    // 🛡️ Result: Zieht Artikel ab und gibt den Restbestand zurück
    fn entnehmen(&mut self, artikel: &str, menge: u32) -> Result<u32, String> {
        match self.inventar.get_mut(artikel) {
            Some(bestand) => {
                if *bestand >= menge {
                    *bestand -= menge;
                    Ok(*bestand)
                } else {
                    Err(format!("Nicht genug Bestand von '{}'. Vorhanden: {}", artikel, *bestand))
                }
            }
            None => Err(format!("Artikel '{}' existiert nicht im Lager.", artikel)),
        }
    }
}

fn main() {
    let mut lager = Lagerbestand::neu();
    lager.anliefern(String::from("T-Shirt"), 10);

    // Bestand verringern
    match lager.entnehmen("T-Shirt", 3) {
        Ok(rest) => println!("Entnahme erfolgreich. Neuer T-Shirt-Bestand: {}", rest),
        Err(e) => println!("Lagerfehler: {}", e),
    }

    // Fehler provozieren
    if let Err(e) = lager.entnehmen("T-Shirt", 15) {
        println!("Entnahme fehlgeschlagen: {}", e);
    }
}
```

---

## Projekt 61: Vokabeltrainer (Mehrfachübersetzungen)
```rust
use std::collections::HashMap;

// 📦 Struct für das Wörterbuch
struct Woerterbuch {
    // 🗄️ Wort (String) zu Liste von Übersetzungen (Vec<String>)
    uebersetzungen: HashMap<String, Vec<String>>,
}

impl Woerterbuch {
    fn neu() -> Self {
        Woerterbuch {
            uebersetzungen: HashMap::new(),
        }
    }

    fn uebersetzung_hinzufuegen(&mut self, wort: String, uebersetzung: String) {
        let liste = self.uebersetzungen.entry(wort).or_insert(Vec::new());
        liste.push(uebersetzung);
    }

    // 🛡️ Option: Gibt alle Übersetzungen für ein Wort zurück
    fn abfragen(&self, wort: &str) -> Option<&Vec<String>> {
        self.uebersetzungen.get(wort)
    }
}

fn main() {
    let mut wb = Woerterbuch::neu();
    wb.uebersetzung_hinzufuegen(String::from("laufen"), String::from("run"));
    wb.uebersetzung_hinzufuegen(String::from("laufen"), String::from("walk"));

    let wort = "laufen";
    // 🔍 Pattern Matching mit match auf Option
    match wb.abfragen(wort) {
        Some(liste) => {
            println!("Moegliche Uebersetzungen fuer '{}':", wort);
            for ueb in liste {
                println!("- {}", ueb);
            }
        }
        None => println!("Keine Uebersetzung fuer '{}' gefunden.", wort),
    }
}
```

---

## Projekt 62: Mitarbeiter-Abteilungs-Zuordnung
```rust
use std::collections::HashMap;

// 🏷️ Enum für die Abteilungen
#[derive(Debug, Clone, PartialEq)]
enum Abteilung {
    IT,
    HR,
    Marketing,
}

// 📦 Struct für Mitarbeiter-Stammdaten
struct Mitarbeiter {
    name: String,
    abteilung: Abteilung,
}

// 📦 Struct für das Firmenverzeichnis
struct Firmenverzeichnis {
    // 🗄️ Mitarbeiter-ID (u32) zu Mitarbeiter
    mitarbeiter: HashMap<u32, Mitarbeiter>,
}

impl Firmenverzeichnis {
    fn neu() -> Self {
        Firmenverzeichnis {
            mitarbeiter: HashMap::new(),
        }
    }

    fn einstellen(&mut self, id: u32, name: String, abt: Abteilung) {
        self.mitarbeiter.insert(id, Mitarbeiter { name, abteilung: abt });
    }

    // 🛡️ Result: Verschiebt Mitarbeiter in eine neue Abteilung
    fn abteilung_wechseln(&mut self, id: u32, neue_abt: Abteilung) -> Result<(), String> {
        match self.mitarbeiter.get_mut(&id) {
            Some(mitarbeiter) => {
                if mitarbeiter.abteilung == neue_abt {
                    Err(format!("{} ist bereits in der Abteilung {:?}.", mitarbeiter.name, neue_abt))
                } else {
                    mitarbeiter.abteilung = neue_abt;
                    Ok(())
                }
            }
            None => Err(format!("Kein Mitarbeiter mit ID {} gefunden.", id)),
        }
    }
}

fn main() {
    let mut firma = Firmenverzeichnis::neu();
    firma.einstellen(1, String::from("Klaus"), Abteilung::IT);

    // Verschieben in eine neue Abteilung
    match firma.abteilung_wechseln(1, Abteilung::Marketing) {
        Ok(()) => println!("Mitarbeiter 1 wurde in das Marketing verschoben."),
        Err(e) => println!("Fehler beim Wechsel: {}", e),
    }
}
```

---

## Projekt 63: Highscore-Tabelle
```rust
use std::collections::HashMap;

// 📦 Struct für die Highscore-Tabelle
struct Highscores {
    // 🗄️ Spielername (String) zu Punkten (u32)
    tabelle: HashMap<String, u32>,
}

impl Highscores {
    fn neu() -> Self {
        Highscores {
            tabelle: HashMap::new(),
        }
    }

    fn punkte_eintragen(&mut self, name: String, punkte: u32) {
        let eintrag = self.tabelle.entry(name).or_insert(0);
        if punkte > *eintrag {
            *eintrag = punkte; // 🧠 Nur aktualisieren, falls der neue Score höher ist
        }
    }

    // 🛡️ Option: Gibt das Tupel aus Name und Punkten des besten Spielers zurück
    fn bester_spieler(&self) -> Option<(&String, &u32)> {
        let mut bester: Option<(&String, &u32)> = None;
        for (spieler, punkte) in &self.tabelle {
            match bester {
                Some((_, max_punkte)) => {
                    if punkte > max_punkte {
                        bester = Some((spieler, punkte));
                    }
                }
                None => {
                    bester = Some((spieler, punkte));
                }
            }
        }
        bester
    }
}

fn main() {
    let mut scores = Highscores::neu();
    scores.punkte_eintragen(String::from("Zocker1"), 450);
    scores.punkte_eintragen(String::from("ProGamer"), 1200);
    scores.punkte_eintragen(String::from("Zocker1"), 500); // Neuer persönlicher Highscore

    // Bester Spieler ausgeben
    match scores.bester_spieler() {
        Some((name, punkte)) => println!("Bester Spieler: {} mit {} Punkten!", name, punkte),
        None => println!("Noch keine Highscores eingetragen."),
    }
}
```

---

## Projekt 64: Autovermietung
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Status des Mietwagens
enum MietStatus {
    Verfuegbar,
    Vermietet(String), // 🧠 Speichert den Namen des Mieters
}

// 📦 Struct für ein Auto
struct Auto {
    modell: String,
    status: MietStatus,
}

// 📦 Struct für die Autovermietung
struct Autovermietung {
    // 🗄️ Kennzeichen (String) zu Auto
    flotte: HashMap<String, Auto>,
}

impl Autovermietung {
    fn neu() -> Self {
        Autovermietung {
            flotte: HashMap::new(),
        }
    }

    fn auto_hinzufuegen(&mut self, kennzeichen: String, modell: String) {
        self.flotte.insert(kennzeichen, Auto {
            modell,
            status: MietStatus::Verfuegbar,
        });
    }

    // 🛡️ Result: Vermietet ein Auto
    fn auto_vermieten(&mut self, kennzeichen: &str, mieter: String) -> Result<(), String> {
        match self.flotte.get_mut(kennzeichen) {
            Some(auto) => match &auto.status {
                MietStatus::Verfuegbar => {
                    auto.status = MietStatus::Vermietet(mieter);
                    Ok(())
                }
                MietStatus::Vermietet(name) => {
                    Err(format!("Das Auto ({}) ist bereits an {} vermietet.", auto.modell, name))
                }
            },
            None => Err(format!("Kennzeichen {} ist nicht in der Flotte.", kennzeichen)),
        }
    }
}

fn main() {
    let mut vermietung = Autovermietung::neu();
    vermietung.auto_hinzufuegen(String::from("DO-XY-123"), String::from("Golf"));

    // Auto vermieten
    match vermietung.auto_vermieten("DO-XY-123", String::from("Max")) {
        Ok(()) => println!("Auto erfolgreich vermietet!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 65: Smart-Home Gerätesteuerung
```rust
use std::collections::HashMap;

// 🏷️ Enum für Geräteklassen
#[derive(Debug)]
enum GeraeteTyp {
    Licht,
    Heizung,
}

// 📦 Struct für das Smart-Home-Gerät
struct Geraet {
    typ: GeraeteTyp,
    aktiviert: bool,
}

// 📦 Struct für das Smart-Home-System
struct SmartHome {
    // 🗄️ Gerätename (String) zu Geraet
    geraete: HashMap<String, Geraet>,
}

impl SmartHome {
    fn neu() -> Self {
        SmartHome {
            geraete: HashMap::new(),
        }
    }

    fn geraet_registrieren(&mut self, name: String, typ: GeraeteTyp) {
        self.geraete.insert(name, Geraet { typ, aktiviert: false });
    }

    // 🛡️ Result: Schaltet den Status eines Gerätes um
    fn geraet_schalten(&mut self, name: &str, status: bool) -> Result<(), String> {
        match self.geraete.get_mut(name) {
            Some(geraet) => {
                geraet.aktiviert = status;
                Ok(())
            }
            None => Err(format!("Geraet '{}' nicht gefunden.", name)),
        }
    }
}

fn main() {
    let mut home = SmartHome::neu();
    home.geraet_registrieren(String::from("Wohnzimmerlicht"), GeraeteTyp::Licht);

    // Licht anschalten
    match home.geraet_schalten("Wohnzimmerlicht", true) {
        Ok(()) => println!("Wohnzimmerlicht eingeschaltet!"),
        Err(e) => println!("Steuerungsfehler: {}", e),
    }
}
```

---

## Projekt 66: Kunden-Treuepunkte
```rust
use std::collections::HashMap;

// 📦 Struct für das Punktesystem
struct TreuepunkteSystem {
    // 🗄️ Kundenkarte-ID (String) zu Punkten (u32)
    kunden: HashMap<String, u32>,
}

impl TreuepunkteSystem {
    fn neu() -> Self {
        TreuepunkteSystem {
            kunden: HashMap::new(),
        }
    }

    fn kunden_anlegen(&mut self, id: String) {
        self.kunden.insert(id, 0);
    }

    fn punkte_gutschreiben(&mut self, id: &str, punkte: u32) -> Result<(), String> {
        match self.kunden.get_mut(id) {
            Some(bestand) => {
                *bestand += punkte;
                Ok(())
            }
            None => Err(format!("Kunde mit ID {} existiert nicht.", id)),
        }
    }

    // 🛡️ Result: Löst Treuepunkte ein und zieht diese ab
    fn punkte_einloesen(&mut self, id: &str, punkte: u32) -> Result<u32, String> {
        match self.kunden.get_mut(id) {
            Some(bestand) => {
                if *bestand >= punkte {
                    *bestand -= punkte;
                    Ok(*bestand) // Gibt den neuen Kontostand zurück
                } else {
                    Err(format!("Nicht genuegend Punkte. Aktuell: {}", *bestand))
                }
            }
            None => Err(format!("Kunde mit ID {} existiert nicht.", id)),
        }
    }
}

fn main() {
    let mut system = TreuepunkteSystem::neu();
    let id = "KUNDE-999";
    system.kunden_anlegen(id.to_string());

    let _ = system.punkte_gutschreiben(id, 100);

    // Einlösungsversuch
    match system.punkte_einloesen(id, 40) {
        Ok(rest) => println!("40 Punkte eingeloest. Restpunkte: {}", rest),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 67: Projekt-Taskmanager
```rust
use std::collections::HashMap;

// 🏷️ Enum für Aufgaben-Prioritäten
#[derive(Debug)]
enum Prioritaet {
    Niedrig,
    Mittel,
    Hoch,
}

// 📦 Struct für die Aufgabe
struct Task {
    beschreibung: String,
    prioritaet: Prioritaet,
    erledigt: bool,
}

// 📦 Struct für den Taskmanager
struct TaskManager {
    // 🗄️ Task-ID (u32) zu Task
    aufgaben: HashMap<u32, Task>,
}

impl TaskManager {
    fn neu() -> Self {
        TaskManager {
            aufgaben: HashMap::new(),
        }
    }

    fn task_hinzufuegen(&mut self, id: u32, beschreibung: String, prio: Prioritaet) {
        self.aufgaben.insert(id, Task {
            beschreibung,
            prioritaet: prio,
            erledigt: false,
        });
    }

    // 🛡️ Result: Markiert eine Aufgabe als erledigt
    fn task_erledigen(&mut self, id: u32) -> Result<(), String> {
        match self.aufgaben.get_mut(&id) {
            Some(task) => {
                if task.erledigt {
                    Err(format!("Aufgabe '{}' wurde bereits erledigt.", task.beschreibung))
                } else {
                    task.erledigt = true;
                    Ok(())
                }
            }
            None => Err(format!("Aufgabe mit ID {} existiert nicht.", id)),
        }
    }
}

fn main() {
    let mut manager = TaskManager::neu();
    manager.task_hinzufuegen(1, String::from("Rust lernen"), Prioritaet::Hoch);

    // Aufgabe erledigen
    match manager.task_erledigen(1) {
        Ok(()) => println!("Aufgabe 1 erledigt!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 68: Server-Port-Belegung
```rust
use std::collections::HashMap;

// 📦 Struct für den Port-Manager
struct PortManager {
    // 🗄️ Portnummer (u16) zu Service-Name (String)
    belegung: HashMap<u16, String>,
}

impl PortManager {
    fn neu() -> Self {
        PortManager {
            belegung: HashMap::new(),
        }
    }

    // 🛡️ Result: Belegt einen Port, falls noch frei
    fn port_belegen(&mut self, port: u16, service: String) -> Result<(), String> {
        match self.belegung.get(&port) {
            Some(belegt_von) => {
                Err(format!("Port {} ist bereits von '{}' belegt.", port, belegt_von))
            }
            None => {
                self.belegung.insert(port, service);
                Ok(())
            }
        }
    }

    // 🛡️ Option: Gibt den Port frei und liefert den Namen des Services zurück (Some), falls belegt
    fn port_freigeben(&mut self, port: u16) -> Option<String> {
        self.belegung.remove(&port)
    }
}

fn main() {
    let mut manager = PortManager::neu();
    
    // Port belegen
    if let Err(e) = manager.port_belegen(80, String::from("Webserver")) {
        println!("Fehler beim Belegen: {}", e);
    }

    // Port freigeben
    match manager.port_freigeben(80) {
        Some(service) => println!("Port 80 freigegeben (belegt von: {}).", service),
        None => println!("Port 80 war nicht belegt."),
    }
}
```

---

## Projekt 69: Flug-Sitzplatz-Plan
```rust
use std::collections::HashMap;

// 🏷️ Enum für Ticketklassen
#[derive(Debug)]
enum Klasse {
    Economy,
    Business,
    First,
}

// 📦 Struct für den Passagier
struct Passagier {
    name: String,
    klasse: Klasse,
}

// 📦 Struct für die Sitzplatzverwaltung
struct Sitzplan {
    // 🗄️ Sitzplatznummer (z. B. "12A") zu Passagier
    plan: HashMap<String, Passagier>,
}

impl Sitzplan {
    fn neu() -> Self {
        Sitzplan {
            plan: HashMap::new(),
        }
    }

    // 🛡️ Result: Sitzplatz für einen Passagier buchen
    fn buchen(&mut self, sitz: String, name: String, klasse: Klasse) -> Result<(), String> {
        if self.plan.contains_key(&sitz) {
            Err(format!("Sitzplatz {} ist bereits besetzt.", sitz))
        } else {
            self.plan.insert(sitz, Passagier { name, klasse });
            Ok(())
        }
    }

    // 🛡️ Option: Passagier-Info abrufen
    fn info(&self, sitz: &str) -> Option<&Passagier> {
        self.plan.get(sitz)
    }
}

fn main() {
    let mut plan = Sitzplan::neu();
    let _ = plan.buchen(String::from("1A"), String::from("Anna"), Klasse::First);

    // Info abrufen
    match plan.info("1A") {
        Some(passagier) => println!("Platz 1A ist gebucht fuer {} ({:?}-Klasse).", passagier.name, passagier.klasse),
        None => println!("Platz 1A ist frei."),
    }
}
```

---

## Projekt 70: Wetter-Stationen
```rust
use std::collections::HashMap;

// 📦 Struct für das Wetternetzwerk
struct Wetternetzwerk {
    // 🗄️ Stationsname (String) zu Temperatur (f64)
    messungen: HashMap<String, f64>,
}

impl Wetternetzwerk {
    fn neu() -> Self {
        Wetternetzwerk {
            messungen: HashMap::new(),
        }
    }

    fn temperatur_eintragen(&mut self, station: String, temp: f64) {
        self.messungen.insert(station, temp);
    }

    // 🛡️ Option: Berechnet die Durchschnittstemperatur
    fn durchschnittstemperatur(&self) -> Option<f64> {
        if self.messungen.is_empty() {
            None
        } else {
            let summe: f64 = self.messungen.values().sum();
            Some(summe / self.messungen.len() as f64)
        }
    }
}

fn main() {
    let mut netz = Wetternetzwerk::neu();
    netz.temperatur_eintragen(String::from("Muenchen"), 21.5);
    netz.temperatur_eintragen(String::from("Hamburg"), 18.0);

    match netz.durchschnittstemperatur() {
        Some(avg) => println!("Die Durchschnittstemperatur betraegt {:.1}°C.", avg),
        None => println!("Keine Wetterstationen registriert."),
    }
}
```

---

## Projekt 71: E-Commerce Produkt-Katalog
```rust
use std::collections::HashMap;

// 🏷️ Enum für Kategorien
#[derive(Debug)]
enum Kategorie {
    Elektronik,
    Buecher,
    Kleidung,
}

// 📦 Struct für ein Produkt
struct Produkt {
    name: String,
    preis: f64,
    kategorie: Kategorie,
}

// 📦 Struct für den Katalog
struct Katalog {
    // 🗄️ Produkt-ID (u32) zu Produkt
    artikel: HashMap<u32, Produkt>,
}

impl Katalog {
    fn neu() -> Self {
        Katalog {
            artikel: HashMap::new(),
        }
    }

    fn produkt_hinzufuegen(&mut self, id: u32, name: String, preis: f64, kat: Kategorie) {
        self.artikel.insert(id, Produkt {
            name,
            preis,
            kategorie: kat,
        });
    }

    // 🛡️ Option: Sucht ein Produkt nach ID
    fn suchen(&self, id: u32) -> Option<&Produkt> {
        self.artikel.get(&id)
    }
}

fn main() {
    let mut kat = Katalog::neu();
    kat.produkt_hinzufuegen(1001, String::from("Kopfhoerer"), 89.99, Kategorie::Elektronik);

    let id = 1001;
    // 🔍 Pattern Matching mit if let
    if let Some(prod) = kat.suchen(id) {
        println!("Produkt {} gefunden: {} ({:.2} EUR) in Kategorie {:?}", id, prod.name, prod.preis, prod.kategorie);
    } else {
        println!("Kein Produkt mit ID {} im Katalog.", id);
    }
}
```

---

## Projekt 72: Länder-Hauptstädte-Quiz
```rust
use std::collections::HashMap;

// 📦 Struct für das Quiz
struct Quiz {
    // 🗄️ Land (String) zu Hauptstadt (String)
    fragen: HashMap<String, String>,
}

impl Quiz {
    fn neu() -> Self {
        Quiz {
            fragen: HashMap::new(),
        }
    }

    fn frage_hinzufuegen(&mut self, land: String, hauptstadt: String) {
        self.fragen.insert(land, hauptstadt);
    }

    // 🛡️ Option/bool: Überprüft die Antwort
    fn antwort_pruefen(&self, land: &str, antwort: &str) -> Option<bool> {
        // 🔍 Pattern Matching
        self.fragen.get(land).map(|korrekte_hauptstadt| {
            korrekte_hauptstadt.to_lowercase() == antwort.trim().to_lowercase()
        })
    }
}

fn main() {
    let mut quiz = Quiz::neu();
    quiz.frage_hinzufuegen(String::from("Deutschland"), String::from("Berlin"));
    quiz.frage_hinzufuegen(String::from("Frankreich"), String::from("Paris"));

    let land = "Frankreich";
    let tipp = "Paris";

    match quiz.antwort_pruefen(land, tipp) {
        Some(true) => println!("Richtig! Die Hauptstadt von {} ist {}.", land, tipp),
        Some(false) => println!("Falsch! {} ist nicht die Hauptstadt von {}.", tipp, land),
        None => println!("Das Land '{}' ist nicht im Quiz vorhanden.", land),
    }
}
```

---

## Projekt 73: Café-Bestellsystem
```rust
use std::collections::HashMap;

// 📦 Struct für die Tischbestellung
struct Bestellung {
    artikel: Vec<String>,
    gesamtpreis: f64,
}

// 📦 Struct für das Kasse-System
struct KassenSystem {
    // 🗄️ Tischnummer (u8) zu Bestellung
    tische: HashMap<u8, Bestellung>,
}

impl KassenSystem {
    fn neu() -> Self {
        KassenSystem {
            tische: HashMap::new(),
        }
    }

    fn artikel_hinzufuegen(&mut self, tisch: u8, artikel: String, preis: f64) {
        // 🧠 entry-API zum Abrufen oder Initialisieren der Tischbestellung
        let bestellung = self.tische.entry(tisch).or_insert(Bestellung {
            artikel: Vec::new(),
            gesamtpreis: 0.0,
        });
        bestellung.artikel.push(artikel);
        bestellung.gesamtpreis += preis;
    }

    // 🛡️ Result/f64: Bezahlt den Tisch, entfernt die Bestellung und gibt den Preis zurück
    fn bezahlen(&mut self, tisch: u8) -> Result<f64, String> {
        // 🔍 remove() entfernt den Schlüssel und gibt Option<Wert> zurück
        match self.tische.remove(&tisch) {
            Some(bestellung) => Ok(bestellung.gesamtpreis),
            None => Err(format!("Tisch {} hat keine offenen Bestellungen.", tisch)),
        }
    }
}

fn main() {
    let mut kasse = KassenSystem::neu();
    kasse.artikel_hinzufuegen(5, String::from("Kaffee"), 3.50);
    kasse.artikel_hinzufuegen(5, String::from("Kuchen"), 4.00);

    // Tisch abrechnen
    match kasse.bezahlen(5) {
        Ok(preis) => println!("Tisch 5 hat bezahlt. Gesamtbetrag: {:.2} EUR.", preis),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 74: Software-Lizenz-Key-Validator
```rust
use std::collections::HashMap;

// 🏷️ Enum für Lizenztypen
#[derive(Debug, PartialEq, Clone)]
enum LizenzTyp {
    Demo,
    Standard,
    Pro,
}

// 📦 Struct für Lizenzdaten
struct Lizenz {
    inhaber: String,
    typ: LizenzTyp,
}

// 📦 Struct für den Aktivierungsserver
struct LizenzServer {
    // 🗄️ Lizenzschlüssel (String) zu Lizenz
    lizenzen: HashMap<String, Lizenz>,
}

impl LizenzServer {
    fn neu() -> Self {
        LizenzServer {
            lizenzen: HashMap::new(),
        }
    }

    fn lizenz_registrieren(&mut self, key: String, inhaber: String, typ: LizenzTyp) {
        self.lizenzen.insert(key, Lizenz { inhaber, typ });
    }

    // 🛡️ Option: Prüft einen Lizenzschlüssel
    fn lizenz_pruefen(&self, key: &str) -> Option<&Lizenz> {
        self.lizenzen.get(key)
    }
}

fn main() {
    let mut server = LizenzServer::neu();
    let key = "PRO-KEY-123";
    server.lizenz_registrieren(key.to_string(), String::from("Firma GmbH"), LizenzTyp::Pro);

    // Prüfen
    match server.lizenz_pruefen(key) {
        Some(lizenz) => {
            println!("Lizenz gueltig fuer '{}' ({:?}-Lizenz).", lizenz.inhaber, lizenz.typ);
        }
        None => println!("Ungueltiger Lizenzschluessel."),
    }
}
```

---

## Projekt 75: Tierheim-Verzeichnis
```rust
use std::collections::HashMap;

// 🏷️ Enum für Tierarten
#[derive(Debug)]
enum TierArt {
    Hund,
    Katze,
    Nager,
}

// 📦 Struct für das Tier im Tierheim
struct Tier {
    name: String,
    art: TierArt,
}

// 📦 Struct für das Tierheim
struct Tierheim {
    // 🗄️ Tier-ID (u32) zu Tier
    tiere: HashMap<u32, Tier>,
}

impl Tierheim {
    fn neu() -> Self {
        Tierheim {
            tiere: HashMap::new(),
        }
    }

    fn tier_aufnehmen(&mut self, id: u32, name: String, art: TierArt) {
        self.tiere.insert(id, Tier { name, art });
    }

    // 🛡️ Option: Vermittelt ein Tier (entfernt es aus der Datenbank)
    fn tier_vermitteln(&mut self, id: u32) -> Option<Tier> {
        self.tiere.remove(&id)
    }
}

fn main() {
    let mut heim = Tierheim::neu();
    heim.tier_aufnehmen(42, String::from("Bello"), TierArt::Hund);

    let id = 42;
    // 🔍 Pattern Matching mit match auf Option
    match heim.tier_vermitteln(id) {
        Some(tier) => println!("{} ({:?}) wurde erfolgreich vermittelt!", tier.name, tier.art),
        None => println!("Kein Tier mit ID {} im Tierheim gefunden.", id),
    }
}
```

---

## Phase 3: Projekte 76 bis 100 (Fehlerbehandlung & Collections)

In dieser Phase konzentrieren wir uns auf die praktische Anwendung der Collections (speziell `HashMap<K, V>`) und der fehlerrobusten Programmierung mittels `Option<T>` und `Result<T, E>`. Alle Projekte wiederholen und kombinieren die Konzepte der vorherigen Phasen (Variablen, Kontrollfluss, Benutzereingabe, Ownership/Borrowing, Structs, Methoden, Enums und Pattern Matching).

---

## Projekt 76: Smarthome-Geräte-Status
```rust
use std::collections::HashMap;

// 🏷️ Enum für die verschiedenen Smart-Home-Gerätetypen
#[derive(Debug, Clone, Copy)]
enum GeraeteTyp {
    Licht,
    Heizung,
    Steckdose,
}

// 🏷️ Enum für den aktuellen Zustand des Geräts
#[derive(Debug, Clone, Copy, PartialEq)]
enum GeraeteStatus {
    An,
    Aus,
    Standby,
}

// 📦 Struct, das die Daten eines einzelnen Geräts zusammenfasst
#[derive(Debug, Clone)]
struct SmartGeraet {
    id: u32,
    typ: GeraeteTyp,
    status: GeraeteStatus,
}

// 📦 Struct für die Smart-Home-Zentrale
struct SmartHomeZentrale {
    // 🗄️ Die HashMap verbindet den Namen des Geräts (String) mit den Gerätedaten (SmartGeraet)
    geraete: HashMap<String, SmartGeraet>,
}

impl SmartHomeZentrale {
    fn neu() -> Self {
        SmartHomeZentrale {
            geraete: HashMap::new(),
        }
    }

    // 📦 Methode zum Registrieren eines neuen Geräts
    // 🧠 Ownership: Der Name (String) wird in die HashMap verschoben
    fn registrieren(&mut self, name: String, id: u32, typ: GeraeteTyp) {
        let geraet = SmartGeraet {
            id,
            typ,
            status: GeraeteStatus::Aus, // Standardmäßig ausgeschaltet
        };
        self.geraete.insert(name, geraet);
    }

    // 🛡️ Result: Versucht, den Status eines Geräts zu ändern
    // Wenn das Gerät nicht existiert, wird ein Fehler (Err) zurückgegeben
    fn status_aendern(&mut self, name: &str, neuer_status: GeraeteStatus) -> Result<(), String> {
        // 🔍 Pattern Matching auf das Ergebnis von `get_mut` (liefert Option<&mut SmartGeraet>)
        match self.geraete.get_mut(name) {
            Some(geraet) => {
                geraet.status = neuer_status;
                Ok(())
            }
            None => Err(format!("Gerät '{}' nicht gefunden!", name)),
        }
    }
}

fn main() {
    let mut zentrale = SmartHomeZentrale::neu();

    // Geräte hinzufügen
    zentrale.registrieren(String::from("Wohnzimmerlicht"), 1, GeraeteTyp::Licht);
    zentrale.registrieren(String::from("Kuechenheizung"), 2, GeraeteTyp::Heizung);

    // 🔍 Erfolgreiches Schalten eines Geräts
    match zentrale.status_aendern("Wohnzimmerlicht", GeraeteStatus::An) {
        Ok(()) => println!("Status erfolgreich geändert!"),
        Err(fehler) => println!("Fehler: {}", fehler),
    }

    // 🔍 Fehlgeschlagener Versuch (Gerät existiert nicht)
    if let Err(fehler) = zentrale.status_aendern("Garagentor", GeraeteStatus::An) {
        println!("Aktion fehlgeschlagen: {}", fehler);
    }
}
```

---

## Projekt 77: Studenten-Kurssystem
```rust
use std::collections::HashMap;

// 🏷️ Enum für mögliche Registrierungsfehler
#[derive(Debug)]
enum RegistrierungsFehler {
    StudentNichtGefunden,
    KursBereitsBelegt,
    KursVoll,
}

// 📦 Struct für Studentendaten
struct Student {
    name: String,
    kurse: Vec<String>,
}

// 📦 Struct für das Kurssystem
struct KursSystem {
    // 🗄️ HashMap: Matrikelnummer (u32) -> Studentendaten
    studenten: HashMap<u32, Student>,
    // 🗄️ HashMap: Kursname (String) -> Belegte Plätze & Max-Kapazität (usize, usize)
    kurse: HashMap<String, (usize, usize)>,
}

impl KursSystem {
    fn neu() -> Self {
        KursSystem {
            studenten: HashMap::new(),
            kurse: HashMap::new(),
        }
    }

    fn student_anlegen(&mut self, matrikelnr: u32, name: String) {
        self.studenten.insert(matrikelnr, Student { name, kurse: Vec::new() });
    }

    fn kurs_anlegen(&mut self, name: String, kapazitaet: usize) {
        self.kurse.insert(name, (0, kapazitaet));
    }

    // 🛡️ Result: Registriert einen Studenten für einen Kurs
    fn registrieren(&mut self, matrikelnr: u32, kurs_name: String) -> Result<(), RegistrierungsFehler> {
        // 🔍 Prüfen, ob der Kurs existiert und noch Platz frei ist
        let (belegt, max) = match self.kurse.get_mut(&kurs_name) {
            Some(kapazitaet) => kapazitaet,
            None => return Err(RegistrierungsFehler::StudentNichtGefunden),
        };

        if *belegt >= *max {
            return Err(RegistrierungsFehler::KursVoll);
        }

        // 🔍 Prüfen, ob der Student existiert
        let student = match self.studenten.get_mut(&matrikelnr) {
            Some(s) => s,
            None => return Err(RegistrierungsFehler::StudentNichtGefunden),
        };

        // 🔍 Prüfen, ob der Kurs bereits belegt wurde
        if student.kurse.contains(&kurs_name) {
            return Err(RegistrierungsFehler::KursBereitsBelegt);
        }

        // Wenn alles passt: Eintragen!
        student.kurse.push(kurs_name);
        *belegt += 1;
        Ok(())
    }
}

fn main() {
    let mut system = KursSystem::neu();
    system.student_anlegen(1001, String::from("Anna"));
    system.kurs_anlegen(String::from("Rust-Programmierung"), 2);

    // 🔍 1. Erfolgreiche Registrierung
    match system.registrieren(1001, String::from("Rust-Programmierung")) {
        Ok(()) => println!("Anna erfolgreich registriert!"),
        Err(e) => println!("Fehler bei Anna: {:?}", e),
    }

    // 🔍 2. Fehler: Bereits registriert
    match system.registrieren(1001, String::from("Rust-Programmierung")) {
        Ok(()) => println!("Erfolgreich registriert!"),
        Err(e) => println!("Fehler bei Zweitregistrierung: {:?}", e),
    }
}
```

---

## Projekt 78: Paket-Versandstation
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Status eines Pakets
#[derive(Debug, Clone, PartialEq)]
enum PaketStatus {
    ImDepot,
    InZustellung,
    Zugestellt(String), // 🧠 Speichert den Namen des Empfängers
}

// 📦 Struct für die Paketinformationen
struct Paket {
    zieladresse: String,
    status: PaketStatus,
}

// 📦 Struct für die Versandstation
struct VersandStation {
    // 🗄️ Sendungsnummer (String) -> Paket
    pakete: HashMap<String, Paket>,
}

impl VersandStation {
    fn neu() -> Self {
        VersandStation { pakete: HashMap::new() }
    }

    fn paket_einliefern(&mut self, sendungsnr: String, adresse: String) {
        self.pakete.insert(sendungsnr, Paket {
            zieladresse: adresse,
            status: PaketStatus::ImDepot,
        });
    }

    // 🛡️ Result: Aktualisiert den Status eines Pakets
    fn status_aendern(&mut self, sendungsnr: &str, neuer_status: PaketStatus) -> Result<(), String> {
        // 🔍 Pattern Matching auf das Vorhandensein des Pakets
        match self.pakete.get_mut(sendungsnr) {
            Some(paket) => {
                // Keine Änderungen erlauben, wenn bereits zugestellt
                if let PaketStatus::Zugestellt(_) = paket.status {
                    return Err(format!("Paket {} wurde bereits zugestellt.", sendungsnr));
                }
                paket.status = neuer_status;
                Ok(())
            }
            None => Err(format!("Paket {} existiert nicht im System.", sendungsnr)),
        }
    }
}

fn main() {
    let mut station = VersandStation::neu();
    let nr = "DE123456789";
    station.paket_einliefern(nr.to_string(), String::from("Musterstraße 5"));

    // Paket wird zugestellt
    match station.status_aendern(nr, PaketStatus::Zugestellt(String::from("Frau Schmidt"))) {
        Ok(()) => println!("Status geändert!"),
        Err(e) => println!("Fehler: {}", e),
    }

    // Fehlversuch einer erneuten Statusänderung
    if let Err(e) = station.status_aendern(nr, PaketStatus::InZustellung) {
        println!("Fehler abgefangen: {}", e);
    }
}
```

---

## Projekt 79: Bankkonten-Verwaltung
```rust
use std::collections::HashMap;

// 🏷️ Enum für Transaktionsfehler
#[derive(Debug)]
enum TransaktionsFehler {
    KontoNichtGefunden,
    UeberziehungsschutzAktiv,
    UngueltigerBetrag,
}

// 📦 Struct für ein einzelnes Konto
struct Konto {
    inhaber: String,
    kontostand: f64,
}

// 📦 Struct für die Bank
struct Bank {
    // 🗄️ IBAN (String) -> Konto
    konten: HashMap<String, Konto>,
}

impl Bank {
    fn neu() -> Self {
        Bank { konten: HashMap::new() }
    }

    fn konto_eroeffnen(&mut self, iban: String, inhaber: String, startguthaben: f64) {
        self.konten.insert(iban, Konto { inhaber, kontostand: startguthaben });
    }

    // 🛡️ Result: Führt eine Überweisung durch
    fn ueberweisen(&mut self, von_iban: &str, zu_iban: &str, betrag: f64) -> Result<(), TransaktionsFehler> {
        if betrag <= 0.0 {
            return Err(TransaktionsFehler::UngueltigerBetrag);
        }

        // 🧠 Rusts Borrow Checker verbietet es, gleichzeitig zwei veränderbare Referenzen
        // aus derselben HashMap zu holen. Daher prüfen wir zuerst die Existenz beider.
        if !self.konten.contains_key(von_iban) || !self.konten.contains_key(zu_iban) {
            return Err(TransaktionsFehler::KontoNichtGefunden);
        }

        // 🔍 Kontostand des Absenders prüfen
        let absender_kontostand = self.konten.get(von_iban).unwrap().kontostand;
        if absender_kontostand < betrag {
            return Err(TransaktionsFehler::UeberziehungsschutzAktiv);
        }

        // 🧠 Da wir wissen, dass beide Konten existieren und die Deckung reicht,
        // nehmen wir das Geld vom Absenderkonto...
        if let Some(von_konto) = self.konten.get_mut(von_iban) {
            von_konto.kontostand -= betrag;
        }

        // ... und schreiben es dem Empfängerkonto gut
        if let Some(zu_konto) = self.konten.get_mut(zu_iban) {
            zu_konto.kontostand += betrag;
        }

        Ok(())
    }
}

fn main() {
    let mut bank = Bank::neu();
    bank.konto_eroeffnen(String::from("DE01"), String::from("Alice"), 500.0);
    bank.konto_eroeffnen(String::from("DE02"), String::from("Bob"), 100.0);

    // 🔍 Erfolgreiche Überweisung
    match bank.ueberweisen("DE01", "DE02", 150.0) {
        Ok(()) => println!("Überweisung erfolgreich durchgeführt!"),
        Err(e) => println!("Überweisung fehlgeschlagen: {:?}", e),
    }
}
```

---

## Projekt 80: Fitness-Tracker
```rust
use std::collections::HashMap;

// 🏷️ Enum für die Art der Aktivität
#[derive(Debug, Clone, Copy)]
enum Aktivitaet {
    Laufen,
    Radfahren,
    Schwimmen,
}

// 📦 Struct für ein Training
struct Training {
    typ: Aktivitaet,
    dauer_minuten: u32,
    kalorien: u32,
}

// 📦 Struct für den Fitness-Tracker
struct FitnessTracker {
    // 🗄️ Datum (String) -> Vektor von Trainingsaktivitäten
    trainings_log: HashMap<String, Vec<Training>>,
}

impl FitnessTracker {
    fn neu() -> Self {
        FitnessTracker { trainings_log: HashMap::new() }
    }

    // 📦 Methode zum Eintragen eines Trainings
    // 🧠 or_insert initialisiert einen leeren Vektor, falls das Datum noch nicht existiert
    fn training_eintragen(&mut self, datum: String, training: Training) {
        let eintraege = self.trainings_log.entry(datum).or_insert(Vec::new());
        eintraege.push(training);
    }

    // 🛡️ Result: Berechnet die verbrannten Gesamtkalorien an einem Tag
    fn kalorien_am_tag(&self, datum: &str) -> Result<u32, String> {
        // 🔍 Pattern Matching auf die HashMap-Suche
        match self.trainings_log.get(datum) {
            Some(liste) => {
                let summe = liste.iter().map(|t| t.kalorien).sum();
                Ok(summe)
            }
            None => Err(format!("Keine Trainingseinträge für den {} gefunden.", datum)),
        }
    }
}

fn main() {
    let mut tracker = FitnessTracker::neu();
    tracker.training_eintragen(
        String::from("2026-07-12"),
        Training { typ: Aktivitaet::Laufen, dauer_minuten: 45, kalorien: 450 }
    );
    tracker.training_eintragen(
        String::from("2026-07-12"),
        Training { typ: Aktivitaet::Schwimmen, dauer_minuten: 30, kalorien: 300 }
    );

    // 🔍 Kalorien abrufen
    match tracker.kalorien_am_tag("2026-07-12") {
        Ok(cal) => println!("Verbrannte Kalorien heute: {} kcal.", cal),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 81: Parkplatz-Reservierung
```rust
use std::collections::HashMap;

// 🏷️ Enum für Fahrzeugtypen
enum FahrzeugTyp {
    Pkw,
    Motorrad,
    Lkw,
}

// 📦 Struct für das Parkticket
struct ParkTicket {
    typ: FahrzeugTyp,
    einfahrtzeit: u64, // Simulierter Zeitwert in Minuten
}

// 📦 Struct für das Parkhaus
struct Parkhaus {
    // 🗄️ Kennzeichen (String) -> Parkticket
    belegte_plaetze: HashMap<String, ParkTicket>,
    kapazitaet: usize,
}

impl Parkhaus {
    fn neu(kapazitaet: usize) -> Self {
        Parkhaus {
            belegte_plaetze: HashMap::new(),
            kapazitaet,
        }
    }

    // 🛡️ Result: Registriert die Einfahrt eines Fahrzeugs
    fn einfahren(&mut self, kennzeichen: String, typ: FahrzeugTyp, zeit: u64) -> Result<(), String> {
        if self.belegte_plaetze.len() >= self.kapazitaet {
            return Err(String::from("Parkhaus ist voll!"));
        }
        if self.belegte_plaetze.contains_key(&kennzeichen) {
            return Err(String::from("Fahrzeug ist bereits im Parkhaus registriert."));
        }

        self.belegte_plaetze.insert(kennzeichen, ParkTicket { typ, einfahrtzeit: zeit });
        Ok(())
    }

    // 🛡️ Result: Berechnet die Kosten bei Ausfahrt und entfernt das Fahrzeug
    fn ausfahren(&mut self, kennzeichen: &str, ausfahrtzeit: u64) -> Result<f64, String> {
        // 🔍 Fahrzeug aus der HashMap entfernen
        match self.belegte_plaetze.remove(kennzeichen) {
            Some(ticket) => {
                if ausfahrtzeit < ticket.einfahrtzeit {
                    return Err(String::from("Ungültige Ausfahrtzeit."));
                }
                let dauer = ausfahrtzeit - ticket.einfahrtzeit;
                
                // Mauttarif berechnen basierend auf dem Fahrzeugtyp
                let stundensatz = match ticket.typ {
                    FahrzeugTyp::Motorrad => 1.50,
                    FahrzeugTyp::Pkw => 3.00,
                    FahrzeugTyp::Lkw => 8.00,
                };
                
                let stunden = (dauer as f64 / 60.0).ceil();
                Ok(stunden * stundensatz)
            }
            None => Err(format!("Fahrzeug mit Kennzeichen {} nicht im Parkhaus gefunden.", kennzeichen)),
        }
    }
}

fn main() {
    let mut parkhaus = Parkhaus::neu(5);
    let auto = String::from("HH-AB-123");

    let _ = parkhaus.einfahren(auto.clone(), FahrzeugTyp::Pkw, 0); // Einfahrt bei 0 Min

    // Ausfahrt nach 120 Minuten (2 Stunden)
    match parkhaus.ausfahren(&auto, 120) {
        Ok(preis) => println!("Parkgebühr für {} beträgt {:.2} EUR.", auto, preis),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 82: Restaurant-Bestellsystem
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Status eines bestellten Gerichts
#[derive(Debug, Clone, Copy, PartialEq)]
enum SpeiseStatus {
    Bestellt,
    InZubereitung,
    Serviert,
}

// 📦 Struct für ein einzelnes Gericht in der Bestellung
#[derive(Debug, Clone)]
struct Gericht {
    name: String,
    preis: f64,
    status: SpeiseStatus,
}

// 📦 Struct für die Tischbestellungen
struct RestaurantKasse {
    // 🗄️ Tischnummer (u8) -> Vektor von bestellten Gerichten
    tisch_bestellungen: HashMap<u8, Vec<Gericht>>,
}

impl RestaurantKasse {
    fn neu() -> Self {
        RestaurantKasse {
            tisch_bestellungen: HashMap::new(),
        }
    }

    // 📦 Hinzufügen einer Bestellung zum Tisch
    fn gericht_bestellen(&mut self, tisch: u8, name: String, preis: f64) {
        let gerichte = self.tisch_bestellungen.entry(tisch).or_insert(Vec::new());
        gerichte.push(Gericht {
            name,
            preis,
            status: SpeiseStatus::Bestellt,
        });
    }

    // 🛡️ Result: Aktualisiert den Status eines Gerichts eines Tisches
    fn status_aendern(&mut self, tisch: u8, index: usize, neuer_status: SpeiseStatus) -> Result<(), String> {
        match self.tisch_bestellungen.get_mut(&tisch) {
            Some(gerichte) => {
                if let Some(gericht) = gerichte.get_mut(index) {
                    gericht.status = neuer_status;
                    Ok(())
                } else {
                    Err(format!("Gericht-Index {} existiert für Tisch {} nicht.", index, tisch))
                }
            }
            None => Err(format!("Tisch {} hat keine offenen Bestellungen.", tisch)),
        }
    }
}

fn main() {
    let mut kasse = RestaurantKasse::neu();
    kasse.gericht_bestellen(3, String::from("Schnitzel"), 14.50);
    kasse.gericht_bestellen(3, String::from("Spezi"), 3.50);

    // Status von Schnitzel (Index 0) ändern
    match kasse.status_aendern(3, 0, SpeiseStatus::InZubereitung) {
        Ok(()) => println!("Status von Schnitzel wurde auf 'In Zubereitung' gesetzt."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 83: Bibliothek-Benutzerkonten
```rust
use std::collections::HashMap;

// 📦 Struct für eine Buchausleihe
struct Ausleihe {
    titel: String,
    ausleihtag: u32, // Simulierter Tag im Kalenderjahr (z. B. Tag 200)
}

// 📦 Struct für das Benutzerkonto
struct Benutzer {
    name: String,
    ausgeliehene_buecher: Vec<Ausleihe>,
}

// 📦 Struct für das System
struct BibliotheksSystem {
    // 🗄️ Benutzer-ID (u32) -> Benutzerkonto
    mitglieder: HashMap<u32, Benutzer>,
}

impl BibliotheksSystem {
    fn neu() -> Self {
        BibliotheksSystem {
            mitglieder: HashMap::new(),
        }
    }

    fn mitglied_registrieren(&mut self, id: u32, name: String) {
        self.mitglieder.insert(id, Benutzer {
            name,
            ausgeliehene_buecher: Vec::new(),
        });
    }

    fn buch_ausleihen(&mut self, id: u32, titel: String, tag: u32) {
        if let Some(benutzer) = self.mitglieder.get_mut(&id) {
            benutzer.ausgeliehene_buecher.push(Ausleihe { titel, ausleihtag: tag });
        }
    }

    // 🛡️ Result: Berechnet eventuelle Mahngebühren (Leihfrist: 14 Tage, danach 0.50 EUR/Tag)
    fn mahngebuehr_berechnen(&self, id: u32, aktueller_tag: u32) -> Result<f64, String> {
        // 🔍 Suchen des Mitglieds
        let benutzer = match self.mitglieder.get(&id) {
            Some(b) => b,
            None => return Err(format!("Benutzer-ID {} existiert nicht.", id)),
        };

        let mut summe = 0.0;
        for ausleihe in &benutzer.ausgeliehene_buecher {
            let vergangen = aktueller_tag.saturating_sub(ausleihe.ausleihtag);
            if vergangen > 14 {
                let ueberzogene_tage = vergangen - 14;
                summe += ueberzogene_tage as f64 * 0.50;
            }
        }
        Ok(summe)
    }
}

fn main() {
    let mut bib = BibliotheksSystem::neu();
    bib.mitglied_registrieren(101, String::from("Dieter"));
    
    // Buch an Tag 100 ausgeliehen
    bib.buch_ausleihen(101, String::from("Rust Handbuch"), 100);

    // Abfrage an Tag 120 (20 Tage vergangen -> 6 Tage Überziehung -> 3.00 EUR Gebühr)
    match bib.mahngebuehr_berechnen(101, 120) {
        Ok(gebuehr) => println!("Aktuelle Mahngebühren: {:.2} EUR.", gebuehr),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 84: DNS-Cache-Simulator
```rust
use std::collections::HashMap;

// 📦 Struct für den DNS-Eintrag
struct DnsEintrag {
    ip_adresse: String,
    ablaufzeit: u32, // Simulierter Zeitwert in Sekunden
}

// 📦 Struct für den Cache
struct DnsCache {
    // 🗄️ Domain-Name (String) -> DNS-Eintrag
    eintraege: HashMap<String, DnsEintrag>,
}

impl DnsCache {
    fn neu() -> Self {
        DnsCache {
            eintraege: HashMap::new(),
        }
    }

    fn eintragen(&mut self, domain: String, ip: String, ttl_sekunden: u32, startzeit: u32) {
        self.eintraege.insert(domain, DnsEintrag {
            ip_adresse: ip,
            ablaufzeit: startzeit + ttl_sekunden,
        });
    }

    // 🛡️ Result: Löst die Domain auf, sofern sie existiert und nicht abgelaufen ist
    fn aufloesen(&self, domain: &str, aktuelle_zeit: u32) -> Result<String, String> {
        // 🔍 Pattern Matching auf Option
        match self.eintraege.get(domain) {
            Some(eintrag) => {
                if aktuelle_zeit > eintrag.ablaufzeit {
                    Err(format!("Eintrag für '{}' ist abgelaufen.", domain))
                } else {
                    Ok(eintrag.ip_adresse.clone()) // 🧠 Klonen, da wir das Ownership übertragen
                }
            }
            None => Err(format!("Domain '{}' nicht im Cache gefunden.", domain)),
        }
    }
}

fn main() {
    let mut cache = DnsCache::neu();
    cache.eintragen(String::from("rust-lang.org"), String::from("13.224.29.89"), 60, 1000);

    // 🔍 Abfrage innerhalb der TTL (Zeitpunkt 1030)
    match cache.aufloesen("rust-lang.org", 1030) {
        Ok(ip) => println!("IP-Adresse: {}", ip),
        Err(e) => println!("Fehler: {}", e),
    }

    // 🔍 Abfrage nach der TTL (Zeitpunkt 1100)
    if let Err(e) = cache.aufloesen("rust-lang.org", 1100) {
        println!("DNS-Lookup fehlgeschlagen: {}", e);
    }
}
```

---

## Projekt 85: Videospiel-Inventar
```rust
use std::collections::HashMap;

// 🏷️ Enum für Seltenheitsgrade
#[derive(Debug, Clone, Copy)]
enum Seltenheit {
    Gewoehnlich,
    Selten,
    Episch,
    Legendaer,
}

// 📦 Struct für ein Item
#[derive(Debug, Clone)]
struct Item {
    name: String,
    seltenheit: Seltenheit,
}

// 📦 Struct für das Spielinventar
struct Inventar {
    // 🗄️ Item-Name (String) -> (Item, Anzahl)
    plaetze: HashMap<String, (Item, u32)>,
    max_plaetze: usize,
}

impl Inventar {
    fn neu(max_plaetze: usize) -> Self {
        Inventar {
            plaetze: HashMap::new(),
            max_plaetze,
        }
    }

    // 🛡️ Result: Fügt Gegenstände hinzu
    fn item_hinzufuegen(&mut self, item: Item, anzahl: u32) -> Result<(), String> {
        let name = item.name.clone();

        // 🔍 Überprüfen, ob das Item bereits existiert
        if self.plaetze.contains_key(&name) {
            let eintrag = self.plaetze.get_mut(&name).unwrap();
            eintrag.1 += anzahl;
            return Ok(());
        }

        // Falls neu, prüfen ob Platz vorhanden ist
        if self.plaetze.len() >= self.max_plaetze {
            return Err(String::from("Inventar ist voll! Gegenstand passt nicht mehr rein."));
        }

        self.plaetze.insert(name, (item, anzahl));
        Ok(())
    }
}

fn main() {
    let mut inventar = Inventar::neu(2);
    let schwert = Item { name: String::from("Eisenschwert"), seltenheit: Seltenheit::Gewoehnlich };
    let bogen = Item { name: String::from("Elfenbogen"), seltenheit: Seltenheit::Episch };
    let heiltrank = Item { name: String::from("Heiltrank"), seltenheit: Seltenheit::Selten };

    let _ = inventar.item_hinzufuegen(schwert, 1);
    let _ = inventar.item_hinzufuegen(bogen, 1);

    // 🔍 Dieses Item sollte fehlschlagen, da Limit = 2
    match inventar.item_hinzufuegen(heiltrank, 5) {
        Ok(()) => println!("Heiltränke hinzugefügt."),
        Err(e) => println!("Konnte Tränke nicht hinzufügen: {}", e),
    }
}
```

---

## Projekt 86: Flugbuchungs-System
```rust
use std::collections::HashMap;

// 🏷️ Enum für Flugklassen
#[derive(Debug)]
enum FlugKlasse {
    Economy,
    Business,
}

// 📦 Struct für Fluggäste
struct Passagier {
    name: String,
    klasse: FlugKlasse,
}

// 📦 Struct für den Flug
struct Flug {
    flugnummer: String,
    // 🗄️ Sitzplatz (z.B. "17B") -> Passagier
    passagiere: HashMap<String, Passagier>,
    kapazitaet: usize,
}

impl Flug {
    fn neu(flugnummer: String, kapazitaet: usize) -> Self {
        Flug {
            flugnummer,
            passagiere: HashMap::new(),
            kapazitaet,
        }
    }

    // 🛡️ Result: Bucht einen Sitzplatz
    fn sitz_buchen(&mut self, sitz: String, name: String, klasse: FlugKlasse) -> Result<(), String> {
        if self.passagiere.len() >= self.kapazitaet {
            return Err(format!("Flug {} ist ausgebucht.", self.flugnummer));
        }

        // 🔍 Pattern Matching auf das Vorhandensein des Sitzes
        if self.passagiere.contains_key(&sitz) {
            return Err(format!("Sitzplatz {} ist bereits vergeben.", sitz));
        }

        self.passagiere.insert(sitz, Passagier { name, klasse });
        Ok(())
    }
}

fn main() {
    let mut mein_flug = Flug::neu(String::from("LH456"), 150);

    // 🔍 Erfolgreiche Buchung
    match mein_flug.sitz_buchen("12A".to_string(), String::from("Markus"), FlugKlasse::Business) {
        Ok(()) => println!("Sitz 12A erfolgreich reserviert."),
        Err(e) => println!("Buchungsfehler: {}", e),
    }

    // 🔍 Doppelte Buchung versuchen
    if let Err(e) = mein_flug.sitz_buchen("12A".to_string(), String::from("Sabine"), FlugKlasse::Economy) {
        println!("Achtung: {}", e);
    }
}
```

---

## Projekt 87: Kinosaal-Ticketshop
```rust
use std::collections::HashMap;

// 🏷️ Enum für Ticketkategorien
enum PlatzKategorie {
    Parkett,
    Loge,
}

// 🏷️ Enum für den Status
enum BelegungsStatus {
    Frei,
    Verkauft,
}

// 📦 Struct für den Kinositz
struct KinoSitz {
    kategorie: PlatzKategorie,
    status: BelegungsStatus,
}

// 📦 Struct für das Ticketsystem
struct TicketShop {
    // 🗄️ Sitzplatz-Koordinate (z.B. "Reihe3-Platz4") -> Kinositz
    saalplan: HashMap<String, KinoSitz>,
}

impl TicketShop {
    fn neu() -> Self {
        TicketShop { saalplan: HashMap::new() }
    }

    fn sitz_hinzufuegen(&mut self, koordinate: String, kat: PlatzKategorie) {
        self.saalplan.insert(koordinate, KinoSitz {
            kategorie: kat,
            status: BelegungsStatus::Frei,
        });
    }

    // 🛡️ Result: Bucht den Sitzplatz und gibt den berechneten Preis zurück
    fn ticket_kaufen(&mut self, koordinate: &str) -> Result<f64, String> {
        // 🔍 get_mut liefert Option<&mut KinoSitz>
        match self.saalplan.get_mut(koordinate) {
            Some(sitz) => match sitz.status {
                BelegungsStatus::Frei => {
                    sitz.status = BelegungsStatus::Verkauft;
                    let preis = match sitz.kategorie {
                        PlatzKategorie::Parkett => 8.50,
                        PlatzKategorie::Loge => 12.00,
                    };
                    Ok(preis)
                }
                BelegungsStatus::Verkauft => Err(format!("Platz {} ist bereits ausverkauft.", koordinate)),
            },
            None => Err(format!("Sitzplatz {} existiert nicht.", koordinate)),
        }
    }
}

fn main() {
    let mut shop = TicketShop::neu();
    shop.sitz_hinzufuegen(String::from("R1-P5"), PlatzKategorie::Parkett);
    shop.sitz_hinzufuegen(String::from("R5-P10"), PlatzKategorie::Loge);

    // 🔍 Kaufen eines Tickets
    match shop.ticket_kaufen("R5-P10") {
        Ok(preis) => println!("Ticket erfolgreich gebucht! Preis: {:.2} EUR.", preis),
        Err(e) => println!("Kauf fehlgeschlagen: {}", e),
    }
}
```

---

## Projekt 88: Onlineshop-Wunschzettel
```rust
use std::collections::HashMap;

// 📦 Struct für ein Produkt
#[derive(Debug, Clone)]
struct Produkt {
    id: u32,
    name: String,
    preis: f64,
}

// 📦 Struct für den Kunden
struct Kunde {
    wunschzettel: Vec<Produkt>,
    // 🗄️ Warenkorb: Produkt-ID -> Bestellmenge
    warenkorb: HashMap<u32, u32>,
}

// 📦 Struct für das Shopsystem
struct OnlineShop {
    // 🗄️ Kundenname -> Kundendaten
    kunden: HashMap<String, Kunde>,
}

impl OnlineShop {
    fn neu() -> Self {
        OnlineShop { kunden: HashMap::new() }
    }

    fn kunde_registrieren(&mut self, name: String) {
        self.kunden.insert(name, Kunde {
            wunschzettel: Vec::new(),
            warenkorb: HashMap::new(),
        });
    }

    fn wunsch_hinzufuegen(&mut self, kundenname: &str, produkt: Produkt) {
        if let Some(kunde) = self.kunden.get_mut(kundenname) {
            kunde.wunschzettel.push(produkt);
        }
    }

    // 🛡️ Result: Verschiebt ein Produkt vom Wunschzettel in den Warenkorb
    fn wunsch_in_warenkorb(&mut self, kundenname: &str, produkt_id: u32) -> Result<(), String> {
        // Kunde holen
        let kunde = match self.kunden.get_mut(kundenname) {
            Some(k) => k,
            None => return Err(format!("Kunde '{}' existiert nicht.", kundenname)),
        };

        // 🔍 Index auf dem Wunschzettel ermitteln
        let position = match kunde.wunschzettel.iter().position(|p| p.id == produkt_id) {
            Some(pos) => pos,
            None => return Err(format!("Produkt-ID {} nicht auf dem Wunschzettel.", produkt_id)),
        };

        // Vom Wunschzettel löschen (Ownership-Entnahme)
        let produkt = kunde.wunschzettel.remove(position);

        // In den Warenkorb einfügen
        let anzahl = kunde.warenkorb.entry(produkt.id).or_insert(0);
        *anzahl += 1;

        Ok(())
    }
}

fn main() {
    let mut shop = OnlineShop::neu();
    let name = "Mark";
    shop.kunde_registrieren(name.to_string());
    
    shop.wunsch_hinzufuegen(name, Produkt { id: 44, name: String::from("Rust Buch"), preis: 29.90 });

    // In den Warenkorb legen
    match shop.wunsch_in_warenkorb(name, 44) {
        Ok(()) => println!("Buch wurde vom Wunschzettel in den Warenkorb gelegt!"),
        Err(e) => println!("Shop-Fehler: {}", e),
    }
}
```

---

## Projekt 89: Wetterdaten-Archiv
```rust
use std::collections::HashMap;

// 📦 Struct für eine Wetterstation
struct WetterStation {
    bezeichnung: String,
    messwerte: Vec<f64>,
}

// 📦 Struct für das Gesamtarchiv
struct WetterArchiv {
    // 🗄️ Stations-ID (String) -> WetterStation
    stationen: HashMap<String, WetterStation>,
}

impl WetterArchiv {
    fn neu() -> Self {
        WetterArchiv { stationen: HashMap::new() }
    }

    fn station_anlegen(&mut self, id: String, name: String) {
        self.stationen.insert(id, WetterStation {
            bezeichnung: name,
            messwerte: Vec::new(),
        });
    }

    fn messwert_hinzufuegen(&mut self, id: &str, temperatur: f64) {
        if let Some(station) = self.stationen.get_mut(id) {
            station.messwerte.push(temperatur);
        }
    }

    // 🛡️ Result: Berechnet den Durchschnittswert der Messungen
    fn durchschnitts_temperatur(&self, id: &str) -> Result<f64, String> {
        // 🔍 Suchen der Station
        let station = match self.stationen.get(id) {
            Some(s) => s,
            None => return Err(format!("Messstation {} nicht registriert.", id)),
        };

        if station.messwerte.is_empty() {
            return Err(format!("Keine Messwerte für Station '{}' vorhanden.", station.bezeichnung));
        }

        // Durchschnitt berechnen
        let summe: f64 = station.messwerte.iter().sum();
        let anzahl = station.messwerte.len() as f64;
        Ok(summe / anzahl)
    }
}

fn main() {
    let mut archiv = WetterArchiv::neu();
    let id = "STA-01";
    archiv.station_anlegen(id.to_string(), String::from("Zugspitze"));

    archiv.messwert_hinzufuegen(id, -2.5);
    archiv.messwert_hinzufuegen(id, -1.0);
    archiv.messwert_hinzufuegen(id, 0.5);

    // 🔍 Durchschnitt abrufen
    match archiv.durchschnitts_temperatur(id) {
        Ok(avg) => println!("Die Durchschnittstemperatur auf der Zugspitze beträgt {:.2}°C.", avg),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 90: Auto-Werkstatt-Planer
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Status eines Werkstattauftrags
#[derive(Debug, Clone, Copy, PartialEq)]
enum AuftragsStatus {
    Angenommen,
    InArbeit,
    Erledigt,
}

// 📦 Struct für einen Auftrag
struct ReparaturAuftrag {
    kennzeichen: String,
    beschreibung: String,
    status: AuftragsStatus,
    kosten: f64,
}

// 📦 Struct für die Werkstatt
struct KfzWerkstatt {
    // 🗄️ Auftragsnummer (u32) -> Auftrag
    auftraege: HashMap<u32, ReparaturAuftrag>,
    naechste_id: u32,
}

impl KfzWerkstatt {
    fn neu() -> Self {
        KfzWerkstatt {
            auftraege: HashMap::new(),
            naechste_id: 1,
        }
    }

    fn auftrag_erstellen(&mut self, kennzeichen: String, beschreibung: String) -> u32 {
        let id = self.naechste_id;
        self.auftraege.insert(id, ReparaturAuftrag {
            kennzeichen,
            beschreibung,
            status: AuftragsStatus::Angenommen,
            kosten: 0.0,
        });
        self.naechste_id += 1;
        id
    }

    // 🛡️ Result: Setzt den Auftrag in Arbeit
    fn auftrag_starten(&mut self, id: u32) -> Result<(), String> {
        match self.auftraege.get_mut(&id) {
            Some(auftrag) => {
                if auftrag.status != AuftragsStatus::Angenommen {
                    return Err(format!("Auftrag {} kann nicht gestartet werden, aktueller Status: {:?}", id, auftrag.status));
                }
                auftrag.status = AuftragsStatus::InArbeit;
                Ok(())
            }
            None => Err(format!("Auftrag {} existiert nicht.", id)),
        }
    }

    // 🛡️ Result: Beendet den Auftrag und legt die Kosten fest
    fn auftrag_abschliessen(&mut self, id: u32, kosten: f64) -> Result<(), String> {
        match self.auftraege.get_mut(&id) {
            Some(auftrag) => {
                if auftrag.status != AuftragsStatus::InArbeit {
                    return Err(format!("Auftrag {} ist nicht in Arbeit.", id));
                }
                auftrag.status = AuftragsStatus::Erledigt;
                auftrag.kosten = kosten;
                Ok(())
            }
            None => Err(format!("Auftrag {} existiert nicht.", id)),
        }
    }
}

fn main() {
    let mut werkstatt = KfzWerkstatt::neu();
    let id = werkstatt.auftrag_erstellen(String::from("B-R-2026"), String::from("Bremsscheiben wechseln"));

    let _ = werkstatt.auftrag_starten(id);
    
    // Abschluss
    match werkstatt.auftrag_abschliessen(id, 250.0) {
        Ok(()) => println!("Auftrag {} erfolgreich abgeschlossen und verrechnet.", id),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 91: Server-Metriken-Monitor
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Typ der Server-Metrik
#[derive(Clone, Copy)]
enum MetrikTyp {
    Cpu,
    Ram,
}

// 🏷️ Enum für die Warnstufe
#[derive(Debug, PartialEq)]
enum WarnStufe {
    Normal,
    Warnung,
    Kritisch,
}

// 📦 Struct für einen Messwert
struct Metrik {
    typ: MetrikTyp,
    wert: f64,
}

// 📦 Struct für das Überwachungssystem
struct ServerMonitor {
    // 🗄️ Server-ID (String) -> Liste von Messwerten
    server_daten: HashMap<String, Vec<Metrik>>,
}

impl ServerMonitor {
    fn neu() -> Self {
        ServerMonitor {
            server_daten: HashMap::new(),
        }
    }

    fn metrik_speichern(&mut self, server_id: String, typ: MetrikTyp, wert: f64) {
        let messwerte = self.server_daten.entry(server_id).or_insert(Vec::new());
        messwerte.push(Metrik { typ, wert });
    }

    // 🛡️ Result: Ermittelt die Warnstufe des letzten CPU-Messwerts
    fn cpu_status_pruefen(&self, server_id: &str) -> Result<WarnStufe, String> {
        // 🔍 Server-Daten abfragen
        let daten = match self.server_daten.get(server_id) {
            Some(d) => d,
            None => return Err(format!("Server '{}' ist nicht bekannt.", server_id)),
        };

        // Letzten CPU-Wert ermitteln
        let letzter_cpu = daten.iter()
            .filter(|m| match m.typ {
                MetrikTyp::Cpu => true,
                _ => false,
            })
            .last();

        match letzter_cpu {
            Some(metrik) => {
                if metrik.wert > 90.0 {
                    Ok(WarnStufe::Kritisch)
                } else if metrik.wert > 70.0 {
                    Ok(WarnStufe::Warnung)
                } else {
                    Ok(WarnStufe::Normal)
                }
            }
            None => Err(format!("Keine CPU-Metriken für Server '{}' vorhanden.", server_id)),
        }
    }
}

fn main() {
    let mut monitor = ServerMonitor::neu();
    let srv = "srv-01";
    
    monitor.metrik_speichern(srv.to_string(), MetrikTyp::Cpu, 45.0);
    monitor.metrik_speichern(srv.to_string(), MetrikTyp::Cpu, 92.5); // Kritisches Event

    // CPU-Warnstufe prüfen
    match monitor.cpu_status_pruefen(srv) {
        Ok(stufe) => println!("Warnstufe für {}: {:?}", srv, stufe),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 92: E-Learning-Fortschritt
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Belegungsstatus des Kurses
#[derive(Debug, Clone, Copy, PartialEq)]
enum KursStatus {
    Aktiv,
    Abgeschlossen,
}

// 📦 Struct für den Fortschritt in einer Lektion
struct LektionsFortschritt {
    lektions_name: String,
    bestanden: bool,
}

// 📦 Struct für ein Benutzerprofil
struct BenutzerProfil {
    // 🗄️ Kursname (String) -> (Status, Module)
    kurs_daten: HashMap<String, (KursStatus, Vec<LektionsFortschritt>)>,
}

// 📦 Struct für die Lernplattform
struct ELearningPlattform {
    // 🗄️ Benutzer-ID (u32) -> BenutzerProfil
    benutzer: HashMap<u32, BenutzerProfil>,
}

impl ELearningPlattform {
    fn neu() -> Self {
        ELearningPlattform { benutzer: HashMap::new() }
    }

    fn user_registrieren(&mut self, id: u32) {
        self.benutzer.insert(id, BenutzerProfil { kurs_daten: HashMap::new() });
    }

    fn kurs_belegen(&mut self, id: u32, kurs: String) {
        if let Some(profil) = self.benutzer.get_mut(&id) {
            profil.kurs_daten.insert(kurs, (KursStatus::Aktiv, Vec::new()));
        }
    }

    fn lektion_abschliessen(&mut self, id: u32, kurs: &str, lektion: String, bestanden: bool) {
        if let Some(profil) = self.benutzer.get_mut(&id) {
            if let Some((_, lektionen)) = profil.kurs_daten.get_mut(kurs) {
                lektionen.push(LektionsFortschritt { lektions_name: lektion, bestanden });
            }
        }
    }

    // 🛡️ Result: Prüft alle Lektionen und stellt das Zertifikat aus
    fn zertifikat_ausstellen(&mut self, id: u32, kurs: &str) -> Result<(), String> {
        let profil = match self.benutzer.get_mut(&id) {
            Some(p) => p,
            None => return Err(format!("Benutzer {} existiert nicht.", id)),
        };

        let (status, lektionen) = match profil.kurs_daten.get_mut(kurs) {
            Some(daten) => daten,
            None => return Err(format!("Kurs '{}' wurde nicht belegt.", kurs)),
        };

        if lektionen.is_empty() {
            return Err(format!("Noch keine Lektionen absolviert."));
        }

        // 🔍 Prüfen, ob alle Lektionen bestanden sind
        let alle_bestanden = lektionen.iter().all(|l| l.bestanden);

        if alle_bestanden {
            *status = KursStatus::Abgeschlossen;
            Ok(())
        } else {
            Err(format!("Es wurden noch nicht alle Lektionen erfolgreich absolviert."))
        }
    }
}

fn main() {
    let mut plattform = ELearningPlattform::neu();
    plattform.user_registrieren(99);
    plattform.kurs_belegen(99, String::from("Einführung in Rust"));

    plattform.lektion_abschliessen(99, "Einführung in Rust", String::from("Ownership"), true);
    plattform.lektion_abschliessen(99, "Einführung in Rust", String::from("Generics"), false); // Leider durchgefallen

    // Zertifikat-Ausstellung versuchen
    match plattform.zertifikat_ausstellen(99, "Einführung in Rust") {
        Ok(()) => println!("Zertifikat erfolgreich ausgestellt!"),
        Err(e) => println!("Zertifikat abgelehnt: {}", e),
    }
}
```

---

## Projekt 93: Rezept-Zutatenrechner
```rust
use std::collections::HashMap;

// 📦 Struct für Mengenangaben von Zutaten
struct Zutat {
    einheit: String,
    menge_pro_portion: f64,
}

// 📦 Struct für ein Rezept
struct Rezept {
    bezeichnung: String,
    // 🗄️ Zutat-Name -> Zutat
    zutatenliste: HashMap<String, Zutat>,
}

// 📦 Struct für die Backstube
struct BackStube {
    rezepte: HashMap<String, Rezept>,
    // 🗄️ Zutat-Name -> Aktueller Lagerbestand (f64)
    lager: HashMap<String, f64>,
}

impl BackStube {
    fn neu() -> Self {
        BackStube {
            rezepte: HashMap::new(),
            lager: HashMap::new(),
        }
    }

    fn rezept_hinzufuegen(&mut self, rezept: Rezept) {
        self.rezepte.insert(rezept.bezeichnung.clone(), rezept);
    }

    fn zutat_einlagern(&mut self, name: String, menge: f64) {
        let bestand = self.lager.entry(name).or_insert(0.0);
        *bestand += menge;
    }

    // 🛡️ Result: Prüft, ob genug Zutaten für X Portionen im Lager sind
    fn backen_moeglich(&self, rezept_name: &str, portionen: f64) -> Result<(), String> {
        // 🔍 Rezept heraussuchen
        let rezept = match self.rezepte.get(rezept_name) {
            Some(r) => r,
            None => return Err(format!("Rezept '{}' existiert nicht.", rezept_name)),
        };

        // Zutaten prüfen
        for (name, zutat) in &rezept.zutatenliste {
            let benoetigt = zutat.menge_pro_portion * portionen;
            
            // 🔍 Lagerbestand ermitteln
            let auf_lager = self.lager.get(name).cloned().unwrap_or(0.0);

            if auf_lager < benoetigt {
                return Err(format!(
                    "Zu wenig '{}' auf Lager! Benötigt: {:.1}{}, Vorhanden: {:.1}{}.",
                    name, benoetigt, zutat.einheit, auf_lager, zutat.einheit
                ));
            }
        }

        Ok(())
    }
}

fn main() {
    let mut stube = BackStube::neu();

    // Rezept erstellen
    let mut pfannkuchen_zutaten = HashMap::new();
    pfannkuchen_zutaten.insert(String::from("Eier"), Zutat { einheit: String::from("Stk"), menge_pro_portion: 1.0 });
    pfannkuchen_zutaten.insert(String::from("Mehl"), Zutat { einheit: String::from("g"), menge_pro_portion: 100.0 });
    
    let pfannkuchen = Rezept {
        bezeichnung: String::from("Pfannkuchen"),
        zutatenliste: pfannkuchen_zutaten,
    };
    stube.rezept_hinzufuegen(pfannkuchen);

    // Lager füllen
    stube.zutat_einlagern(String::from("Eier"), 3.0);
    stube.zutat_einlagern(String::from("Mehl"), 500.0);

    // 🔍 Versuch, 4 Portionen zu backen (benötigt 4 Eier, wir haben nur 3)
    match stube.backen_moeglich("Pfannkuchen", 4.0) {
        Ok(()) => println!("Backen kann starten!"),
        Err(e) => println!("Planungsfehler: {}", e),
    }
}
```

---

## Projekt 94: E-Scooter-Verleih
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Scooter-Status
#[derive(Debug, PartialEq, Clone)]
enum ScooterStatus {
    Verfuegbar,
    Ausgeliehen(String), // 🧠 Speichert Benutzername
    Wartung,
}

// 📦 Struct für den E-Scooter
struct Scooter {
    akku: u8, // Ladestand in Prozent
    status: ScooterStatus,
}

// 📦 Struct für das Verleihsystem
struct ScooterVerleih {
    // 🗄️ Scooter-ID (u32) -> Scooter
    flotte: HashMap<u32, Scooter>,
}

impl ScooterVerleih {
    fn neu() -> Self {
        ScooterVerleih { flotte: HashMap::new() }
    }

    fn scooter_registrieren(&mut self, id: u32, akku: u8) {
        self.flotte.insert(id, Scooter {
            akku,
            status: ScooterStatus::Verfuegbar,
        });
    }

    // 🛡️ Result: Leiht den Scooter aus, wenn er geladen und verfügbar ist
    fn ausleihen(&mut self, id: u32, benutzer: String) -> Result<(), String> {
        // 🔍 Scooter suchen
        match self.flotte.get_mut(&id) {
            Some(scooter) => {
                if scooter.status != ScooterStatus::Verfuegbar {
                    return Err(format!("Scooter {} ist aktuell nicht verfügbar.", id));
                }
                if scooter.akku < 20 {
                    return Err(format!("Akku zu schwach ({}%). Scooter muss geladen werden.", scooter.akku));
                }

                scooter.status = ScooterStatus::Ausgeliehen(benutzer);
                Ok(())
            }
            None => Err(format!("Scooter {} existiert nicht.", id)),
        }
    }
}

fn main() {
    let mut verleih = ScooterVerleih::neu();
    verleih.scooter_registrieren(1, 85);
    verleih.scooter_registrieren(2, 15); // Fast leer

    // 🔍 Erfolgreiche Ausleihe
    let _ = verleih.ausleihen(1, String::from("Jonas"));

    // 🔍 Fehlversuch (Akku leer)
    match verleih.ausleihen(2, String::from("Sarah")) {
        Ok(()) => println!("Scooter 2 ausgeliehen!"),
        Err(e) => println!("Fehler bei Scooter 2: {}", e),
    }
}
```

---

## Projekt 95: Fuhrpark-Manager
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Zustand des Dienstwagens
#[derive(Debug, PartialEq, Clone, Copy)]
enum FahrzeugStatus {
    Bereit,
    Dienstfahrt,
}

// 📦 Struct für das Fahrzeug
struct Dienstwagen {
    kennzeichen: String,
    kilometerstand: u32,
    status: FahrzeugStatus,
}

// 📦 Struct für das Fuhrpark-System
struct Fuhrpark {
    // 🗄️ Kennzeichen (String) -> Dienstwagen
    autos: HashMap<String, Dienstwagen>,
}

impl Fuhrpark {
    fn neu() -> Self {
        Fuhrpark { autos: HashMap::new() }
    }

    fn fahrzeug_aufnehmen(&mut self, kennzeichen: String, kilometer: u32) {
        self.autos.insert(kennzeichen.clone(), Dienstwagen {
            kennzeichen,
            kilometerstand: kilometer,
            status: FahrzeugStatus::Bereit,
        });
    }

    // 🛡️ Result: Trägt eine neue Fahrt ein und aktualisiert den Kilometerstand
    fn fahrt_beenden(&mut self, kennzeichen: &str, kilometer_neu: u32) -> Result<(), String> {
        // 🔍 Suchen des Fahrzeugs
        match self.autos.get_mut(kennzeichen) {
            Some(auto) => {
                if kilometer_neu < auto.kilometerstand {
                    return Err(format!("Kilometerstand-Angabe ungültig. Alt: {}, Neu: {}.", auto.kilometerstand, kilometer_neu));
                }
                
                auto.kilometerstand = kilometer_neu;
                auto.status = FahrzeugStatus::Bereit;
                Ok(())
            }
            None => Err(format!("Fahrzeug {} existiert nicht im Fuhrpark.", kennzeichen)),
        }
    }
}

fn main() {
    let mut fuhrpark = Fuhrpark::neu();
    let auto = String::from("M-EX-2026");
    fuhrpark.fahrzeug_aufnehmen(auto.clone(), 12500);

    // 🔍 Erfolgreiche Rückkehr
    match fuhrpark.fahrt_beenden(&auto, 12850) {
        Ok(()) => println!("Kilometerstand für {} aktualisiert.", auto),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 96: Chatroom-Moderation
```rust
use std::collections::HashMap;

// 🏷️ Enum für Rollen im Chatroom
enum ChatRolle {
    User,
    Moderator,
}

// 🏷️ Enum für den Verwarnstatus
#[derive(Debug, PartialEq, Clone)]
enum ModStatus {
    Aktiv,
    Verwarnt(u32), // 🧠 Anzahl der Verwarnungen
    Gesperrt,
}

// 📦 Struct für das Chatmitglied
struct Mitglied {
    name: String,
    rolle: ChatRolle,
    status: ModStatus,
}

// 📦 Struct für das Moderationssystem
struct ModSystem {
    // 🗄️ Benutzername (String) -> Mitglied
    mitglieder: HashMap<String, Mitglied>,
}

impl ModSystem {
    fn neu() -> Self {
        ModSystem { mitglieder: HashMap::new() }
    }

    fn user_registrieren(&mut self, name: String, rolle: ChatRolle) {
        self.mitglieder.insert(name.clone(), Mitglied {
            name,
            rolle,
            status: ModStatus::Aktiv,
        });
    }

    // 🛡️ Result: Verwarnt einen Benutzer. Bei 3 Verwarnungen folgt eine Sperre.
    fn user_verwarnen(&mut self, moderator_name: &str, target_name: &str) -> Result<(), String> {
        // 🔍 Rechte des Moderators prüfen
        let mod_rechte = match self.mitglieder.get(moderator_name) {
            Some(m) => match m.rolle {
                ChatRolle::Moderator => true,
                ChatRolle::User => false,
            },
            None => return Err(format!("Moderator {} nicht gefunden.", moderator_name)),
        };

        if !mod_rechte {
            return Err(String::from("Aktion verweigert: Nur Moderatoren dürfen Benutzer verwarnen."));
        }

        // 🔍 Zielbenutzer suchen und anpassen
        let target = match self.mitglieder.get_mut(target_name) {
            Some(t) => t,
            None => return Err(format!("Benutzer {} existiert nicht.", target_name)),
        };

        // Status anpassen
        match target.status {
            ModStatus::Aktiv => {
                target.status = ModStatus::Verwarnt(1);
            }
            ModStatus::Verwarnt(count) => {
                if count >= 2 {
                    target.status = ModStatus::Gesperrt;
                    println!("Benutzer '{}' wurde aufgrund der 3. Verwarnung gesperrt!", target_name);
                } else {
                    target.status = ModStatus::Verwarnt(count + 1);
                }
            }
            ModStatus::Gesperrt => {
                return Err(format!("Benutzer '{}' ist bereits gesperrt.", target_name));
            }
        }

        Ok(())
    }
}

fn main() {
    let mut system = ModSystem::neu();
    system.user_registrieren(String::from("Alice"), ChatRolle::Moderator);
    system.user_registrieren(String::from("BadGuy"), ChatRolle::User);

    // 🔍 Alice verwarnt BadGuy
    let _ = system.user_verwarnen("Alice", "BadGuy");
    let _ = system.user_verwarnen("Alice", "BadGuy");
    
    // 3. Verwarnung -> Automatische Sperrung
    match system.user_verwarnen("Alice", "BadGuy") {
        Ok(()) => println!("Verwarnung erfolgreich erteilt."),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 97: Gutschein-Verwaltung
```rust
use std::collections::HashMap;

// 🏷️ Enum für Gutschein-Rabatte
enum RabattTyp {
    Prozent(f64), // z. B. 10% -> 0.10
    Festwert(f64), // z. B. 5.00 EUR
}

// 📦 Struct für Gutscheindaten
struct Gutschein {
    typ: RabattTyp,
    aktiv: bool,
}

// 📦 Struct für das Gutscheinsystem
struct GutscheinSystem {
    // 🗄️ Code (String) -> Gutschein
    datenbank: HashMap<String, Gutschein>,
}

impl GutscheinSystem {
    fn neu() -> Self {
        GutscheinSystem { datenbank: HashMap::new() }
    }

    fn gutschein_erstellen(&mut self, code: String, typ: RabattTyp) {
        self.datenbank.insert(code, Gutschein { typ, aktiv: true });
    }

    // 🛡️ Result: Löst einen Gutschein auf den Warenwert ein und deaktiviert ihn
    fn gutschein_anwenden(&mut self, code: &str, warenwert: f64) -> Result<f64, String> {
        // 🔍 Gutschein abrufen
        let gutschein = match self.datenbank.get_mut(code) {
            Some(g) => g,
            None => return Err(format!("Gutscheincode '{}' ist ungültig.", code)),
        };

        if !gutschein.aktiv {
            return Err(String::from("Dieser Gutschein wurde bereits eingelöst."));
        }

        // Rabatt berechnen
        let rabatt = match gutschein.typ {
            RabattTyp::Prozent(satz) => warenwert * satz,
            RabattTyp::Festwert(wert) => {
                if wert > warenwert {
                    warenwert // Rabatt kann nicht höher als der Warenwert sein
                } else {
                    wert
                }
            }
        };

        // Gutschein entwerten
        gutschein.aktiv = false;
        Ok(warenwert - rabatt)
    }
}

fn main() {
    let mut system = GutscheinSystem::neu();
    system.gutschein_erstellen(String::from("SAVE10"), RabattTyp::Prozent(0.10));

    let warenwert = 50.00;

    // 🔍 Erfolgreiche Einlösung
    match system.gutschein_anwenden("SAVE10", warenwert) {
        Ok(neuer_preis) => println!("Gutschein eingelöst! Neuer Betrag: {:.2} EUR.", neuer_preis),
        Err(e) => println!("Fehler: {}", e),
    }

    // 🔍 Zweite Einlösung schlägt fehl
    if let Err(e) = system.gutschein_anwenden("SAVE10", warenwert) {
        println!("Einlösung fehlgeschlagen: {}", e);
    }
}
```

---

## Projekt 98: Bewerber-Tracking-System
```rust
use std::collections::HashMap;

// 🏷️ Enum für den Bewerberstatus
#[derive(Debug, PartialEq, Clone, Copy)]
enum BewerbungsStatus {
    Eingegangen,
    Interview,
    Eingestellt,
    Abgelehnt,
}

// 📦 Struct für Bewerberdaten
struct Bewerber {
    name: String,
    email: String,
    status: BewerbungsStatus,
}

// 📦 Struct für das Tracking-System
struct RecruitingSystem {
    // 🗄️ Bewerber-ID (u32) -> Bewerber
    datenbank: HashMap<u32, Bewerber>,
    naechste_id: u32,
}

impl RecruitingSystem {
    fn neu() -> Self {
        RecruitingSystem {
            datenbank: HashMap::new(),
            naechste_id: 1,
        }
    }

    fn bewerbung_eintragen(&mut self, name: String, email: String) -> u32 {
        let id = self.naechste_id;
        self.datenbank.insert(id, Bewerber {
            name,
            email,
            status: BewerbungsStatus::Eingegangen,
        });
        self.naechste_id += 1;
        id
    }

    // 🛡️ Result: Ändert den Status des Bewerbers mit einfachen Validierungsregeln
    fn status_aendern(&mut self, id: u32, neuer_status: BewerbungsStatus) -> Result<(), String> {
        // 🔍 Bewerber suchen
        let bewerber = match self.datenbank.get_mut(&id) {
            Some(b) => b,
            None => return Err(format!("Bewerber mit ID {} nicht gefunden.", id)),
        };

        // 🧠 Validierung: Kein Einstellen ohne vorheriges Interview!
        if neuer_status == BewerbungsStatus::Eingestellt && bewerber.status != BewerbungsStatus::Interview {
            return Err(String::from("Regelverletzung: Bewerber muss vor der Einstellung interviewt werden."));
        }

        bewerber.status = neuer_status;
        Ok(())
    }
}

fn main() {
    let mut system = RecruitingSystem::neu();
    let id = system.bewerbung_eintragen(String::from("Clara"), String::from("clara@email.de"));

    // 🔍 Direkte Einstellung schlägt fehl
    match system.status_aendern(id, BewerbungsStatus::Eingestellt) {
        Ok(()) => println!("Erfolgreich eingestellt!"),
        Err(e) => println!("Prozessfehler: {}", e),
    }

    // Erst Interview...
    let _ = system.status_aendern(id, BewerbungsStatus::Interview);
    // ... dann Einstellung
    let _ = system.status_aendern(id, BewerbungsStatus::Eingestellt);
}
```

---

## Projekt 99: Smart-Grid-Stromzähler
```rust
use std::collections::HashMap;

// 🏷️ Enum für Kundenkategorien im Stromnetz
enum KundeKategorie {
    Haushalt,
    Industrie,
}

// 📦 Struct für den smarten Stromzähler
struct SmartZaehler {
    kategorie: KundeKategorie,
    verbrauchsdaten: Vec<f64>, // Messungen in kWh
}

// 📦 Struct für das Smart-Grid-System
struct SmartGrid {
    // 🗄️ Zählernummer (u32) -> SmartZaehler
    zaehler: HashMap<u32, SmartZaehler>,
}

impl SmartGrid {
    fn neu() -> Self {
        SmartGrid { zaehler: HashMap::new() }
    }

    fn zaehler_anmelden(&mut self, id: u32, kat: KundeKategorie) {
        self.zaehler.insert(id, SmartZaehler {
            kategorie: kat,
            verbrauchsdaten: Vec::new(),
        });
    }

    fn messwert_senden(&mut self, id: u32, kwh: f64) {
        if let Some(z) = self.zaehler.get_mut(&id) {
            z.verbrauchsdaten.push(kwh);
        }
    }

    // 🛡️ Result: Berechnet den durchschnittlichen Verbrauch pro Messung
    fn durchschnitts_verbrauch(&self, id: u32) -> Result<f64, String> {
        // 🔍 Zähler suchen
        let z = match self.zaehler.get(&id) {
            Some(zaehler) => zaehler,
            None => return Err(format!("Zähler {} ist nicht registriert.", id)),
        };

        if z.verbrauchsdaten.is_empty() {
            return Err(format!("Keine Messwerte für Zähler {} vorhanden.", id));
        }

        let summe: f64 = z.verbrauchsdaten.iter().sum();
        let anzahl = z.verbrauchsdaten.len() as f64;
        Ok(summe / anzahl)
    }
}

fn main() {
    let mut grid = SmartGrid::neu();
    grid.zaehler_anmelden(12345, KundeKategorie::Haushalt);

    grid.messwert_senden(12345, 1.2);
    grid.messwert_senden(12345, 2.5);

    // 🔍 Durchschnitt abfragen
    match grid.durchschnitts_verbrauch(12345) {
        Ok(avg) => println!("Durchschnittsverbrauch: {:.2} kWh pro Messung.", avg),
        Err(e) => println!("Fehler: {}", e),
    }
}
```

---

## Projekt 100: Krypto-Portfolio-Tracker
```rust
use std::collections::HashMap;

// 📦 Struct für ein Krypto-Asset
struct KryptoAsset {
    name: String,
    menge: f64,
    durchschnitts_kaufpreis: f64,
}

// 📦 Struct für das Benutzer-Portfolio
struct Portfolio {
    inhaber: String,
    // 🗄️ Symbol (z.B. "BTC") -> KryptoAsset
    assets: HashMap<String, KryptoAsset>,
}

impl Portfolio {
    fn neu(inhaber: String) -> Self {
        Portfolio {
            inhaber,
            assets: HashMap::new(),
        }
    }

    fn kauf_buchen(&mut self, symbol: String, name: String, menge: f64, kaufpreis: f64) {
        // 🧠 entry-API zur Aktualisierung oder Erstellung
        let asset = self.assets.entry(symbol).or_insert(KryptoAsset {
            name,
            menge: 0.0,
            durchschnitts_kaufpreis: 0.0,
        });

        // Neuen Durchschnittskaufpreis berechnen
        let alte_kosten = asset.menge * asset.durchschnitts_kaufpreis;
        let neue_kosten = menge * kaufpreis;
        asset.menge += menge;
        asset.durchschnitts_kaufpreis = (alte_kosten + neue_kosten) / asset.menge;
    }

    // 🛡️ Result: Bucht einen Verkauf und gibt den realisierten Gewinn/Verlust zurück
    fn verkauf_buchen(&mut self, symbol: &str, menge: f64, verkaufspreis: f64) -> Result<f64, String> {
        // 🔍 Asset suchen
        let asset = match self.assets.get_mut(symbol) {
            Some(a) => a,
            None => return Err(format!("Das Asset '{}' befindet sich nicht im Portfolio.", symbol)),
        };

        if asset.menge < menge {
            return Err(format!("Ungenaue Menge: Versuche {} zu verkaufen, besitze nur {}.", menge, asset.menge));
        }

        // Gewinn/Verlust berechnen
        let einstandspreis = asset.durchschnitts_kaufpreis;
        let gewinn_oder_verlust = (verkaufspreis - einstandspreis) * menge;

        // Menge anpassen
        asset.menge -= menge;
        
        Ok(gewinn_oder_verlust)
    }
}

fn main() {
    let mut mein_portfolio = Portfolio::neu(String::from("Thorsten"));

    // Käufe buchen
    mein_portfolio.kauf_buchen(String::from("BTC"), String::from("Bitcoin"), 0.5, 30000.0);
    mein_portfolio.kauf_buchen(String::from("BTC"), String::from("Bitcoin"), 0.5, 40000.0); // Durchschnitt: 35000.0

    // 🔍 Verkauf von 0.4 BTC für 38000.0 (Gewinn: (38k - 35k) * 0.4 = 1200.0)
    match mein_portfolio.verkauf_buchen("BTC", 0.4, 38000.0) {
        Ok(gewinn) => println!("Verkauf erfolgreich! Realisierter Gewinn/Verlust: {:.2} EUR.", gewinn),
        Err(e) => println!("Fehler beim Verkauf: {}", e),
    }
}
```
