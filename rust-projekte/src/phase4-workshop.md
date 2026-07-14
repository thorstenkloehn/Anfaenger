# 📦 Mitmach-Workshop: Phase 4 bildhaft verstehen (Die Pizzeria)

Willkommen in der Pizzeria "Bella Rustica"! 🍕✨

Bisher haben wir unsere Programme meist in eine einzige, lange Datei geschrieben. Aber stell dir vor, eine Pizzeria würde so arbeiten: Der Koch, der Pizzabäcker, der Kellner, der Abwasch und die Kasse befänden sich alle auf einem einzigen kleinen Tisch in der Mitte des Raumes. Das wäre das absolute Chaos! Töpfe würden umfallen, Bestellungen verloren gehen und Gäste stünden mitten in der Küche.

Genau deshalb teilen wir unsere Rust-Programme in strukturierte Bereiche auf. In diesem Kapitel lernen wir, wie man Code mit **Cargo**, **Crates**, **Modulen** und **Sichtbarkeitsgrenzen** ordnet. Mach dich bereit für ein echtes Organisations-Abenteuer!

---

## 🧠 Hintergrund: Wie Code strukturiert wird (Cargo, Crates, Module und Sichtbarkeitsgrenzen)

Bevor wir den Ofen anwerfen, müssen wir verstehen, wie Rust unsere "Pizzeria" organisiert. Rust bietet uns dafür vier Ebenen der Strukturierung:

### 1. Das Restaurant-Gebäude (Package)
Das **Package** ist das gesamte Restaurant-Gelände. Es umfasst alles, was wir für unseren Betrieb brauchen: Die Wände, die Speisekarte, die Zutatenlisten und alle Abteilungen.
*   In Rust ist das Package der Ordner, der deine `Cargo.toml` enthält.
*   Es beschreibt das gesamte Projekt und regelt, welche externen Zutaten wir einkaufen müssen.

### 2. Die Abteilungen (Crates)
Ein Package kann aus mehreren **Crates** (Kisten/Lieferungen) bestehen. In unserer Pizzeria gibt es zwei Hauptabteilungen:
*   **Der Gästebereich (Binary Crate - `src/main.rs`):** Hier kommen die Kunden rein. Hier startet der Betrieb, Bestellungen werden entgegengenommen und der Ablauf wird koordiniert (die `main`-Funktion).
*   **Die Küche (Library Crate - `src/lib.rs`):** Hier findet die eigentliche Arbeit statt. Hier lagern die Rezepte und Werkzeuge. Der Gästebereich ruft in der Küche an, um Essen zu bestellen, aber der Gast selbst betritt die Küche nie direkt.

### 3. Die Stationen in der Küche (Module)
Innerhalb der Küche (oder des Gästebereichs) organisieren wir uns in **Modulen** (`mod`).
*   Wir haben eine **Teig-Station**, eine **Zutaten-Station** und eine **Ofen-Station**.
*   Module helfen uns, zusammengehörigen Code (z. B. Funktionen zum Teigkneten) an einem Ort zu bündeln, statt alles ungeordnet herumliegen zu lassen.

### 4. Die Sichtbarkeitsgrenzen (`pub` oder privat)
Wer darf was sehen und benutzen? Das regelt die **Sichtbarkeit**:
*   **Privat (Standard in Rust):** Die geheime Rezeptur für die Tomatensoße ist privat. Nur die Köche in der Küche dürfen sie benutzen. Von außen (aus der `main`-Funktion des Gästebereichs) kann niemand darauf zugreifen.
*   **Öffentlich (`pub`):** Der Tresen zur Essensausgabe ist öffentlich. Hier kann der Service die fertige Pizza abholen. In Rust markieren wir Dinge mit `pub`, um sie für andere Module oder Crates freizugeben.

---

## 🗺️ Der Pizzeria-Plan auf einen Blick

Hier siehst du, wie das Cargo-Package, die Crates, die Module und die Sichtbarkeiten in der Pizzeria "Bella Rustica" zusammenspielen:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ CARGO-PACKAGE: "Bella Rustica" (Das gesamte Restaurant-Gelände)          │
│                                                                         │
│  ┌─────────────────────────────┐       ┌─────────────────────────────┐  │
│  │ BINARY-CRATE (src/main.rs)  │       │ LIBRARY-CRATE (src/lib.rs)  │  │
│  │ "Der Gästebereich"          │       │ "Die Küche"                 │  │
│  │                             │       │                             │  │
│  │  fn main() {                │       │  mod service {              │  │
│  │     // Bestellung aufgeben  │ ────> │     pub fn bestellen() {    │  │
│  │     // Bezahlen             │       │        // ...               │  │
│  │  }                          │       │     }                       │  │
│  └─────────────────────────────┘       │  }                          │  │
│                                        │  mod kueche {               │  │
│                                        │     pub fn pizza_backen() { │  │
│                                        │        geheimnis();         │  │
│                                        │     }                       │  │
│                                        │     fn geheimnis() {        │  │
│                                        │        // privat!           │  │
│                                        │     }                       │  │
│                                        │  }                          │  │
│                                        └─────────────────────────────┘  │
│                                                                         │
│  Cargo.toml (Die Speisekammer: Bestellzettel für externe Zutaten)       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 Micro-Learning 1: Packages, Crates & Cargo

### 🧸 Die Analogie: Der Restaurant-Manager und die Speisekammer
Stell dir **Cargo** als deinen Restaurant-Manager vor. Wenn du sagst: "Cargo, starte den Betrieb!", schaut Cargo zuerst in den Bestellzettel (`Cargo.toml`). Dort steht zum Beispiel, dass wir feinsten italienischen Käse aus einer externen Käserei (einer externen Bibliothek wie `rand` oder `serde`) benötigen.

Cargo bestellt diesen Käse automatisch im Internet, lagert ihn ein, baut alle Abteilungen auf und sorgt dafür, dass das Restaurant bereit für die Gäste ist.

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Ein neues Package anlegen:**
    ```bash
    # Erstellt ein neues Projekt mit Cargo
    cargo new bella_rustica
    ```
*   **Der Bestellzettel (`Cargo.toml`):**
    Hier verwalten wir unsere Abhängigkeiten (Zutaten):
    ```toml
    [package]
    name = "bella_rustica"
    version = "0.1.0"
    edition = "2021"

    [dependencies]
    # Hier tragen wir externe Crates ein, die wir nutzen möchten
    ```

> [!TIP]
> **Eselsbrücke:** **Package** = Das Haus. **Crate** = Die Kiste mit Code. **Cargo** = Der Manager, der alles schleppt und baut.
> **Merkzettel:** Ein Package kann viele Binary-Crates (in `src/bin/`) enthalten, aber immer nur maximal eine Library-Crate (`src/lib.rs`).

---

## 🏷️ Micro-Learning 2: Module & Sichtbarkeit

### 🧸 Die Analogie: Küche und Tresen
Standardmäßig sind alle Türen in der Pizzeria verschlossen. Wenn ein Koch an der Teig-Station arbeitet, kann er zwar die Zutaten aus dem Regal neben sich nehmen, aber ein Gast darf nicht einfach hinter den Tresen greifen.

In Rust ist standardmäßig alles **privat** (`private`). Das bedeutet: Code in einem Modul kann nur von Code im *selben* Modul oder in dessen Untermodulen gesehen werden.

Wollen wir eine Station oder eine Funktion für andere zugänglich machen (z. B. für den Gästebereich), müssen wir das Schlüsselwort `pub` (für *public* / öffentlich) davorstellen. Das ist wie das Öffnen des Ausgabefensters in der Küche.

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Ein Modul deklarieren:**
    ```rust
    mod kueche {
        // Privat: Kann nur innerhalb der Küche aufgerufen werden
        fn geheimes_rezept() {
            println!("Ein Hauch von Basilikum...");
        }

        // Öffentlich: Kann von außerhalb aufgerufen werden
        pub fn pizza_zubereiten() {
            geheimes_rezept(); // Erlaubt! Das Modul darf eigene private Dinge nutzen.
            println!("Pizza Margherita zubereitet.");
        }
    }
    ```

> [!TIP]
> **Eselsbrücke:** **pub** = **P**ublikum erlaubt! Ohne `pub` bleibt die Tür für Gäste verschlossen.
> **Merkzettel:** Wenn du ein Modul mit `pub mod` öffentlich machst, sind seine Funktionen darin nicht automatisch auch öffentlich! Du musst jede einzelne Funktion, die von außen erreichbar sein soll, ebenfalls mit `pub fn` markieren.

---

## 🍯 Micro-Learning 3: Pfade & Importe

### 🧸 Die Analogie: Die Wegbeschreibung
Um an eine Zutat oder Funktion zu gelangen, brauchen wir eine Wegbeschreibung. Rust nutzt dafür Pfade:

1.  **Absoluter Pfad:** "Starte am Haupteingang und gehe dann..."
    In Rust startet das mit `crate::`. Es bedeutet: Fange ganz oben in der aktuellen Crate an und folge dem Pfad nach unten.
    *Beispiel:* `crate::kueche::pizza_station::backen();`
2.  **Relativer Pfad:** "Gehe von deiner aktuellen Position eine Tür zurück und dann..."
    In Rust nutzen wir dafür `super` (eine Ebene nach oben) oder `self` (im aktuellen Modul).
    *Beispiel:* `super::zutaten::tomaten_holen();`
3.  **Die Kurzwahltaste (`use`):** Statt jedes Mal den langen Weg beschreiben zu müssen, legen wir uns einen Schnellzugriff auf den Schreibtisch.
    *Beispiel:* Mit `use crate::kueche::pizza_station::backen;` können wir im restlichen Code einfach direkt `backen();` schreiben!

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Pfade aufrufen:**
    ```rust
    mod kueche {
        pub mod ofen {
            pub fn anheizen() {}
        }
        
        fn kochen() {
            // Absoluter Pfad
            crate::kueche::ofen::anheizen();
            
            // Relativer Pfad (Ofen ist ein Geschwister-Modul von kochen im Modul kueche)
            ofen::anheizen();
        }
    }
    ```
*   **Mit `use` importieren:**
    ```rust
    use crate::kueche::ofen::anheizen;

    fn main() {
        // Jetzt können wir direkt aufrufen:
        anheizen();
    }
    ```

> [!TIP]
> **Eselsbrücke:** `super` = Eine Etage nach oben (zum Elternmodul). `crate` = Zum Erdgeschoss/Haupteingang des gesamten Programms.
> **Merkzettel:** Importe mit `use` gelten immer nur für den aktuellen Sichtbarkeitsbereich (Block `{}` oder Datei), in dem sie definiert wurden!

---

## 🛠️ Mitmach-Workshop: Programmiere die modulare Pizzeria-Software!

Jetzt bist du der Chef der Pizzeria! Da wir in diesem mdBook-Kapitel in einer einzelnen Datei arbeiten, nutzen wir **Inline-Module** (Module, die direkt in einer Datei mit `mod name { ... }` definiert werden). So simulieren wir eine große, modulare Projektstruktur!

### 📝 Dein Notizzettel (Das Ziel des Workshops)
Dein Programm soll einen typischen Pizzeria-Ablauf simulieren:
1.  Der Service nimmt eine Bestellung für einen bestimmten Tisch auf.
2.  Die Bestellung wird an die Küche weitergeleitet.
3.  Der Pizzabäcker prüft das (private) Zutatenlager.
4.  Wenn die Zutaten da sind, wird die Pizza gebacken.
5.  Der Service berechnet an der Kasse den Preis und rechnet ab.

---

### 🧱 Schritt-für-Schritt-Bauanleitung

#### 📂 Schritt 1: Module aufteilen
Erstelle eine Struktur aus zwei Hauptmodulen: `service` und `kueche`.
*   `service` kümmert sich um den Gästekontakt (`mod tresen`) und das Geld (`mod kasse`).
*   `kueche` kümmert sich um das Lager (`mod lager`) und die Zubereitung (`mod ofen`).

#### 🔒 Schritt 2: Sichtbarkeitsgrenzen ziehen
Überlege dir gut, welche Funktionen öffentlich (`pub`) sein müssen, damit sie von anderen Modulen aufgerufen werden können, und was privat bleiben soll:
*   Das Zutatenlager in der Küche sollte seine Bestände privat halten, aber eine öffentliche Funktion anbieten, um Zutaten abzufragen.
*   Der Pizza-Ofen muss von außen (vom Service) den Auftrag zum Backen bekommen.

#### 🗺️ Schritt 3: Pfade verknüpfen
Nutze relative Pfade (`super::`) und absolute Pfade (`crate::`), um die Module miteinander kommunizieren zu lassen.

---

### 🏗️ Das Code-Skelett zum Ausfüllen

Kopiere dieses Skelett in eine Rust-Datei (z. B. `pizzeria.rs`) und versuche, die Lücken (`todo!()`) zu füllen. Achte genau auf die Fehlermeldungen des Compilers – sie zeigen dir sofort, wenn du eine Sichtbarkeitsgrenze verletzt hast!

```rust
// =========================================================================
// DIE MODUL-STRUKTUR UNSERER PIZZERIA
// =========================================================================

mod kueche {
    // Unser Zutatenlager - von außen völlig unsichtbar!
    mod lager {
        // Die Bestände sind privat!
        let mut tomatensose: u32 = 10;
        let mut teigkugeln: u32 = 5;

        // TODO: Schreibe eine Funktion, die prüft, ob noch Zutaten da sind.
        // Sie muss für das Modul `kueche` erreichbar sein.
        // Tipp: Überlege, welchen Sichtbarkeitsmodifikator du brauchst!
        fn zutaten_bereit() -> bool {
            // TODO: Prüfe, ob tomatensose > 0 und teigkugeln > 0 ist.
            // Verringere danach die Bestände um 1, da wir sie verbrauchen.
            todo!()
        }
    }

    // Die Pizza-Station
    pub mod ofen {
        // TODO: Diese Funktion soll vom Service-Modul aufgerufen werden können.
        fn pizza_backen(name: &str) -> String {
            // Wir müssen prüfen, ob das Lager bereit ist.
            // TODO: Rufe die Funktion `zutaten_bereit` aus dem Nachbarmodul `lager` auf.
            // Tipp: Wie lautet der Pfad von hier zum Modul lager?
            let bereit = todo!();

            if bereit {
                format!("Eine leckere Pizza {} kommt frisch aus dem Ofen!", name)
            } else {
                String::from("Oh nein! Uns sind die Zutaten ausgegangen!")
            }
        }
    }
}

mod service {
    // Der Empfangstresen
    pub mod tresen {
        // TODO: Importiere die Funktion `pizza_backen` mit einem `use`-Statement,
        // um den Code lesbarer zu machen!
        // Tipp: Nutze den absoluten Pfad ausgehend von `crate`.
        // use ...;

        pub fn bestellung_aufnehmen(tisch: u32, gericht: &str) {
            println!("Bestellung von Tisch {}: {} aufgenommen.", tisch, gericht);
            
            // TODO: Rufe die importierte Funktion zum Backen auf.
            let fertiges_gericht = todo!();
            
            println!("Service brings to Table {}: {}", tisch, fertiges_gericht);
        }
    }

    // Die Kasse
    pub mod kasse {
        pub fn abrechnen(tisch: u32, preis: u32) {
            println!("Tisch {} zahlt {} Euro. Vielen Dank!", tisch, preis);
        }
    }
}

// =========================================================================
// DER TESTLAUF (GÄSTEBEREICH)
// =========================================================================

fn main() {
    println!("=== Die Pizzeria öffnet ihre Pforten! ===");

    // TODO: Simuliere den Ablauf:
    // 1. Rufe den Service-Tresen auf, um für Tisch 4 eine "Margherita" zu bestellen.
    // 2. Rufe die Kasse auf, um Tisch 4 einen Betrag von 8 Euro zu berechnen.
    // Tipp: Achte darauf, die richtigen Pfade zu nutzen!
    
    todo!();

    println!("=== Feierabend in der Pizzeria ===");
}
```

---

## 📝 Reichlich Übungen zum Vertiefen

Jetzt festigen wir dein Wissen! Versuche, die folgenden Übungen zum Laufen zu bringen. Schreibe sie am besten in eine separate Datei und löse sie Schritt für Schritt.

### 🟢 Übung 1 (Leicht): Der vergessene Tresen (`pub` Sichtbarkeit)
**Ziel:** Verstehe, wie man Funktionen für übergeordnete Module sichtbar macht.
**Szenario:** Der Service möchte dem Gast das Tagesgericht mitteilen. Doch das Modul `speisekarte` weigert sich, die Informationen herauszugeben, weil die Küche forgotten hat, die Tür aufzuschließen!

```rust
mod speisekarte {
    // TODO: Mache diese Funktion von außen erreichbar!
    fn tagesgericht_empfehlen() -> String {
        String::from("Pizza Tonno mit extra Zwiebeln")
    }
}

fn main() {
    // Dieser Aufruf soll klappen!
    // Entferne die Kommentarzeichen und repariere das Modul oben.
    
    // let gericht = speisekarte::tagesgericht_empfehlen();
    // assert_eq!(gericht, "Pizza Tonno mit extra Zwiebeln");
    
    println!("🎉 Übung 1 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 2 (Mittel): Der Ofen-Notstopp (`super` Pfade)
**Ziel:** Nutze relative Pfade mit `super`, um auf das Elternmodul zuzugreifen.
**Szenario:** Im Inneren des Pizza-Ofens befindet sich eine Steuerungseinheit. Diese muss im Notfall den Hauptgashahn zudrehen, der sich eine Ebene höher direkt am Ofen befindet.

```rust
mod pizza_ofen {
    // Der Hauptschalter liegt direkt im Ofen-Modul
    fn gaszufuhr_abschalten() -> String {
        String::from("Gaszufuhr gestoppt!")
    }

    pub mod steuerung {
        pub fn notstopp_auslosen() -> String {
            println!("[WARNUNG] Ofen überhitzt! Löse Notstopp aus...");
            
            // TODO: Rufe die Funktion `gaszufuhr_abschalten` auf.
            // Du musst `super` verwenden, da die Funktion im Elternmodul liegt!
            let status = todo!();
            
            status
        }
    }
}

fn main() {
    let ergebnis = pizza_ofen::steuerung::notstopp_auslosen();
    assert_eq!(ergebnis, "Gaszufuhr gestoppt!");
    
    println!("🎉 Übung 2 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 3 (Mittel): Die Kurzwahltaste (`use` Importe)
**Ziel:** Lerne, wie man tiefe Modulpfade mit `use` abkürzt.
**Szenario:** Um eine Kaffeemaschine zu starten, müssen wir durch viele Räume gehen. Das ist lästig. Richte eine Kurzwahltaste ein, damit der Aufruf in `main` ganz kurz wird!

```rust
mod gebaeude {
    pub mod personalraum {
        pub mod kuechenzeile {
            pub mod kaffeemaschine {
                pub fn espresso_bruhen() -> String {
                    String::from("Schwarzes Gold rinnt in die Tasse.")
                }
            }
        }
    }
}

// TODO: Richte hier den use-Import ein!
// Tipp: Importiere die Funktion `espresso_bruhen` in diesen Sichtbarkeitsbereich.
// use ...;

fn main() {
    // TODO: Entferne die Kommentare. Der Aufruf soll direkt funktionieren!
    // let kaffee = espresso_bruhen();
    // assert_eq!(kaffee, "Schwarzes Gold rinnt in die Tasse.");
    
    println!("🎉 Übung 3 erfolgreich gelöst!");
}
```

---

### 🔴 Übung 4 (Schwer): Das Pizzabäcker-Netzwerk (Modul-Refactoring)
**Ziel:** Verbinde mehrere unterschiedliche Module über korrekte Pfade und richte die Sichtbarkeiten so ein, dass alles sicher gekapselt ist.
**Szenario:** Wir haben ein System für die Pizzeria gebaut. Allerdings sind die Module wild durcheinander gewürfelt und die Pfade stimmen nicht mehr. Repariere das System, ohne die logische Struktur zu zerstören!

```rust
mod lager {
    // TODO: Überlege, wer diese Funktion aufrufen darf.
    fn hefe_vorhanden() -> bool {
        true
    }
}

mod backstube {
    pub mod teig_station {
        pub fn teig_kneten() -> String {
            // TODO: Greife auf die Funktion `hefe_vorhanden` im Modul `lager` zu.
            // Nutze den absoluten Pfad ausgehend von `crate`.
            let hat_hefe = todo!();
            
            if hat_hefe {
                String::from("Hefeteig geht auf.")
            } else {
                String::from("Kein Teig möglich.")
            }
        }
    }

    pub mod pizzabacker {
        pub fn margherita_belegen() -> String {
            // TODO: Greife auf `teig_kneten` zu. 
            // Tipp: Die Teig-Station liegt im gleichen Elternmodul (backstube) wie der Pizzabäcker!
            // Wie kommst du mit `super` dorthin?
            let teig = todo!();
            
            format!("{} + Tomaten + Mozzarella", teig)
        }
    }
}

fn main() {
    let fertige_pizza = backstube::pizzabacker::margherita_belegen();
    assert_eq!(fertige_pizza, "Hefeteig geht auf. + Tomaten + Mozzarella");
    
    println!("🎉 Übung 4 erfolgreich gelöst!");
}
```

---

## 📇 Merkzettel für den Kühlschrank (Zusammenfassung)

| Werkzeug | Was bedeutet es? | Analogie in der Pizzeria | Rust-Beispiel |
| :--- | :--- | :--- | :--- |
| **`Package`** | Das Gesamtprojekt, definiert durch `Cargo.toml`. | Das Restaurant-Gebäude | Ein Ordner mit `Cargo.toml` |
| **`Crate`** | Eine Übersetzungseinheit (Binary oder Library). | Eine Abteilung (Gästebereich vs. Küche) | `src/main.rs` oder `src/lib.rs` |
| **`mod`** | Ein Modul, das Code logisch gruppiert. | Eine Station in der Küche (Ofen, Lager) | `mod kueche { ... }` |
| **`pub`** | Makes modules, functions, or structs public. | Die Durchreiche am Tresen | `pub fn bestellen() {}` |
| **`crate::`** | Starts a path at the root of the crate. | "Vom Haupteingang aus..." | `crate::kueche::ofen::backen()` |
| **`super::`** | Moves up one level in the path. | "Gehe einen Raum zurück..." | `super::lager::holen()` |
| **`use`** | Creates an shortcut for a path. | Die Kurzwahltaste am Telefon | `use crate::kueche::ofen;` |

---

## 🎓 Mini-Quiz (Micro-Learning)

*Versuche, diese Fragen im Kopf zu beantworten:*

1.  **Warum macht Rust standardmäßig alle Module und Funktionen privat?**
    *Antwort:* Um deinen Code zu schützen! So kann niemand von außen versehentlich interne Details ändern, die für das Funktionieren deines Codes wichtig sind. Du entscheidest ganz bewusst mit `pub`, was die "Schnittstelle" nach außen ist.

2.  **Ein Modul `mod service` ist mit `pub mod service` als öffentlich markiert. Ist eine Funktion darin (`fn kassieren()`) nun auch automatisch öffentlich?**
    *Antwort:* Nein! Die Funktion bleibt privat, bis du sie explizit mit `pub fn kassieren()` markierst. Nur die "Tür zum Raum" ist offen, aber die Schubladen darin bleiben verschlossen.

3.  **Wann benutzt man `super` in einem pfad?**
    *Antwort:* Wenn du aus einem Untermodul auf Funktionen zugreifen willst, die im direkt übergeordneten Modul (dem Elternmodul) liegen. Das spart dir den langen Weg über den absoluten Pfad ab `crate::`.

4.  **Wo liegt der Unterschied zwischen einer Binary-Crate und einer Library-Crate?**
    *Antwort:* Eine Binary-Crate (`main.rs`) kann ausgeführt werden und hat einen Einstiegspunkt (`fn main()`). Eine Library-Crate (`lib.rs`) enthält nur Hilfsfunktionen und Rezepte, die von anderen Programmen aufgerufen werden können, lässt sich aber nicht selbstständig wie ein eigenständiges Programm starten.

*Viel Erfolg beim Leiten deiner eigenen Pizzeria und dem Strukturieren deines Codes! Wenn dir der Compiler den Zutritt verweigert, denke an die Sichtbarkeitsgrenzen und benutze deine Schlüssel!*
