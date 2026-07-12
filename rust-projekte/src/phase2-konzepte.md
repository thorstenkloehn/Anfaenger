# Konzepte statt Syntax lernen (Phase 2)

Beim Programmierenlernen in Rust ist es entscheidend, zunächst die zugrunde liegenden Konzepte zu verstehen, anstatt nur die Syntax auswendig zu lernen. In Phase 2 verlassen wir die Welt der einfachen, primitiven Datentypen (wie Zahlen, Wahrheitswerte und einfache Zeichenketten) und tauchen tief in die Erstellung und Manipulation eigener, ausdrucksstarker Datentypen ein.

In Rust geht es bei eigenen Typen nicht nur darum, Daten zu strukturieren, sondern dies mit absoluter Typsicherheit und ohne Performance-Verluste zu tun. Die drei Säulen dieser Phase sind **Structs & Methoden**, **Enums** und **Pattern Matching**.

---

## 🧱 1. Structs & Methoden (Der strukturierte Bauplan)

### 🏠 Die Bauplan-Analogie: Vom Entwurf zum konkreten Haus

Stell dir vor, du möchtest eine Siedlung mit verschiedenen Häusern bauen. Bevor du das erste Mal Ziegelsteine in die Hand nimmst, zeichnet ein Architekt einen **Bauplan** (das **Struct**). 

*   Der **Bauplan** legt fest, welche Eigenschaften jedes Haus haben muss: Wie viele Zimmer gibt es? Hat es eine Garage? Aus welchem Material ist das Dach? Welche Farbe hat die Haustür? Der Bauplan selbst ist noch kein Haus; er belegt keinen Platz in der echten Welt und niemand kann darin wohnen.
*   Das **konkrete Haus** (die **Instanz** des Structs) ist das physische Gebäude, das nach diesem Bauplan auf einem bestimmten Grundstück errichtet wird. Es belegt realen Platz (Speicher) und seine Felder sind mit konkreten Werten gefüllt (z. B. 4 Zimmer, rote Tür, Holz-Garage).
*   Die **Aktionen** im Haus (die **Methoden**) beschreiben, was man mit oder in diesem Haus tun kann. Eine Methode wie `tuer_oeffnen()` ändert den Zustand der Haustür von "geschlossen" auf "offen". Eine Methode wie `streiche_haus(neue_farbe)` ändert die Farbe der Fassade. Diese Aktionen gehören untrennbar zum Haus dazu.

### 🧠 Die Theorie: Was sind Structs?

Ein Struct (kurz für *Structure*) erlaubt es dir, mehrere zusammengehörige Werte unterschiedlicher Typen zu einer logischen Einheit zusammenzufassen. In Rust gibt es drei Arten von Structs:

1.  **Classic Structs (Benannte Felder):**
    Jedes Feld hat einen eindeutigen Namen und einen fest definierten Typ. Das ist die am häufigsten verwendete Form, da sie maximal lesbar ist.
    ```rust
    struct Haus {
        zimmer: u32,
        hat_garage: bool,
        farbe: String,
    }
    ```

2.  **Tuple Structs (Unbenannte, nummerierte Felder):**
    Sie ähneln normalen Tupeln, haben aber einen eigenen Namen. Sie sind nützlich, wenn die Struktur als Ganzes einen Namen braucht, die einzelnen Felder aber selbsterklärend sind.
    ```rust
    struct Punkt3D(f64, f64, f64);
    struct Kilogramm(f64); // Perfekt für Typsicherheit (Newtype-Pattern)
    ```

3.  **Unit-like Structs (Keine Felder):**
    Sie besitzen überhaupt keine Daten. Sie sind nützlich, wenn du ein Verhalten (einen Trait) auf einem Typ implementieren möchtest, ohne dass dieser Zustand speichern muss.
    ```rust
    struct UnendlichKreativ;
    ```

#### Speicherlayout: Wo liegen die Daten?

Rust ist eine systemnahe Sprache. Wenn du eine Instanz eines Structs auf dem Stack erstellst, liegen die Felder direkt hintereinander im Speicher. Rust fügt unter Umständen unsichtbare Lücken (sogenanntes *Padding*) ein, um sicherzustellen, dass der Prozessor optimal auf die Daten zugreifen kann (*Alignment*). Es gibt keinen versteckten Overhead wie in manch anderen Sprachen, die für jedes Objekt einen Header oder Metadaten im Speicher ablegen. Rust-Structs sind "Zero-Cost Abstractions".

---

### 🛠️ Methoden und assoziierte Funktionen: Verhalten hinzufügen

Ein Struct hält nur die Daten. Um diesen Daten Leben einzuhauchen, nutzen wir `impl` (Implementation)-Blöcke. Hier definieren wir alles, was dieser Typ tun kann.

#### Assoziierte Funktionen (Statische Methoden)

Assoziierte Funktionen werden auf dem Typ selbst aufgerufen, nicht auf einer konkreten Instanz. Sie haben **kein** `self` als ersten Parameter. Der klassische Einsatzzweck ist ein Konstruktor, der traditionell `new` genannt wird:

```rust
impl Haus {
    // Eine assoziierte Funktion (Konstruktor)
    fn new(zimmer: u32, farbe: String) -> Self {
        Self {
            zimmer,
            hat_garage: false, // Standardwert
            farbe,
        }
    }
}
```
*Hinweis:* Das Schlüsselwort `Self` (großgeschrieben) ist eine Abkürzung für den Typen, für den wir gerade Code schreiben (hier also `Haus`).

#### Methoden: Zugriff auf die Instanz mit `self`

Methoden sind Funktionen, die auf einer konkreten Instanz aufgerufen werden (z. B. `mein_haus.streichen()`). Sie zeichnen sich dadurch aus, dass ihr erster Parameter immer eine Variante von `self` (kleingeschrieben) ist. Rust unterscheidet hier streng drei Übergabearten:

1.  **`&self` (Unveränderliche Referenz):**
    Die Methode darf die Daten des Structs nur *lesen*, aber nicht verändern. Das ist der Standardfall für Getter oder Statusprüfungen.
    *   *Analogie:* Du schaust dir das Haus von außen an, um die Farbe zu überprüfen. Das Haus verändert sich dadurch nicht.

2.  **`&mut self` (Veränderliche Referenz):**
    Die Methode darf die Daten des Structs unter Umständen *modifizieren*. Da Rusts Borrow Checker aktiv ist, darf zu diesem Zeitpunkt niemand sonst lesend oder schreibend auf dieses Struct zugreifen.
    *   *Analogie:* Du streichst das Haus neu. Währenddessen darf niemand anderes die Wand berühren oder Fotos machen, da die Farbe noch nasser Lack ist.

3.  **`self` (Ownership-Übergabe / Konsumieren):**
    Die Methode übernimmt die *Ownership* (Besitzrecht) über die Instanz. Nach dem Aufruf dieser Methode hört die Instanz außerhalb der Methode auf zu existieren. Sie wurde "aufgebraucht".
    *   *Analogie:* Du reißt das Haus ab, um an derselben Stelle etwas Neues zu bauen oder um die Baumaterialien anderweitig zu verwerten. Das ursprüngliche Haus ist danach weg.

---

### 💻 Detailliertes Theorie-Codebeispiel: Die Kaffeemaschine

Das folgende theoretische Beispiel demonstriert ein Struct mit verschiedenen Feldern, einem Konstruktor (assoziierte Funktion) sowie Methoden, die `&self`, `&mut self` und `self` verwenden.

```rust
// Definition unserer Datenstruktur
struct Kaffeemaschine {
    modell: String,
    wasser_kapazitaet_ml: u32,
    wasser_stand_ml: u32,
    bohnen_stand_g: u32,
    ist_eingeschaltet: bool,
}

impl Kaffeemaschine {
    // 1. Assoziierte Funktion (Konstruktor)
    // Erstellt eine neue Maschine mit Standardwerten
    fn neu(modell: String, wasser_kapazitaet: u32) -> Self {
        Self {
            modell,
            wasser_kapazitaet_ml: wasser_kapazitaet,
            wasser_stand_ml: 0,      // Startet leer
            bohnen_stand_g: 0,       // Startet leer
            ist_eingeschaltet: false, // Startet ausgeschaltet
        }
    }

    // 2. Methode mit &self (Nur Lesen)
    // Zeigt den aktuellen Status der Maschine an, ohne etwas zu verändern
    fn status_anzeigen(&self) {
        println!("--- Status: {} ---", self.modell);
        println!("Wasser: {}/{} ml", self.wasser_stand_ml, self.wasser_kapazitaet_ml);
        println!("Bohnen: {} g", self.bohnen_stand_g);
        println!("Eingeschaltet: {}", if self.ist_eingeschaltet { "Ja" } else { "Nein" });
        println!("----------------------");
    }

    // 3. Methode mit &mut self (Verändern der Daten)
    // Schaltet die Kaffeemaschine an
    fn einschalten(&mut self) {
        self.ist_eingeschaltet = true;
        println!("Die Kaffeemaschine {} heizt auf...", self.modell);
    }

    // 4. Methode mit &mut self (Verändern der Daten)
    // Füllt Wasser nach, limitiert durch die maximale Kapazität
    fn wasser_nachfuellen(&mut self, menge_ml: u32) {
        let freier_platz = self.wasser_kapazitaet_ml - self.wasser_stand_ml;
        if menge_ml > freier_platz {
            self.wasser_stand_ml = self.wasser_kapazitaet_ml;
            println!("Wasser bis zum Maximum aufgefüllt.");
        } else {
            self.wasser_stand_ml += menge_ml;
            println!("{} ml Wasser hinzugefügt.", menge_ml);
        }
    }

    // 5. Methode mit &mut self (Verändern der Daten)
    // Füllt Kaffeebohnen ein
    fn bohnen_nachfuellen(&mut self, menge_g: u32) {
        self.bohnen_stand_g += menge_g;
        println!("{} g Kaffeebohnen hinzugefügt.", menge_g);
    }

    // 6. Methode mit &mut self (Verändern der Daten)
    // Bereitet Kaffee zu. Verbraucht Ressourcen und kann scheitern.
    fn kaffee_bruehen(&mut self) -> Result<(), String> {
        if !self.ist_eingeschaltet {
            return Err("Maschine ist nicht eingeschaltet!".to_string());
        }
        if self.wasser_stand_ml < 150 {
            return Err("Zu wenig Wasser!".to_string());
        }
        if self.bohnen_stand_g < 15 {
            return Err("Zu wenig Bohnen!".to_string());
        }

        // Ressourcen verbrauchen
        self.wasser_stand_ml -= 150;
        self.bohnen_stand_g -= 15;
        
        println!("*Klassische Brühgeräusche* Ihr Kaffee ist fertig!");
        Ok(())
    }

    // 7. Methode mit self (Konsumiert das Objekt)
    // Schrottet die Maschine und gibt die Rohstoffe zurück
    fn verschrotten(self) -> u32 {
        println!("Die Kaffeemaschine {} wird in ihre Einzelteile zerlegt.", self.modell);
        // Hier wird die Kaffeemaschine vernichtet. 
        // Wir geben fiktive Gramm an Altmetall zurück.
        let altmetall_gewicht = 2500;
        altmetall_gewicht
        // Am Ende dieser Funktion geht self out of scope und wird gedroppt!
    }
}
```

---

### ⚠️ Typische Einsteigerfehler bei Structs

#### Fehler 1: Zugriff auf Felder nach Ownership-Verlust (Partial Moves)

Wenn du ein Struct hast, das Typen ohne den `Copy`-Trait (wie `String` oder `Vec`) besitzt, und du versuchst, dieses Feld einzeln herauszubewegen, verliert das Struct das Besitzrecht an diesem Teil.

```rust
struct Benutzer {
    name: String,
    alter: u32,
}

fn main() {
    let user = Benutzer {
        name: String::from("Anna"),
        alter: 30,
    };

    let name = user.name; // user.name wird hier HERAUSBEWEGT (Moved)
    
    // FEHLER: user kann nicht mehr als Ganzes verwendet werden!
    // println!("Benutzeralter: {}", user.alter); // Das geht noch einzeln, ABER:
    // println!("Benutzer: {:?}", user); // FEHLER! Das Struct ist unvollständig.
}
```

*   **Die Behebung:** Wenn du nur lesenden Zugriff auf den Namen brauchst, nutze Referenzen (`&user.name`). Wenn du den Wert kopieren musst, nutze `.clone()`: `let name = user.name.clone();`. Damit bleibt das Struct intakt.

#### Fehler 2: Vergessen der Sichtbarkeit (`pub`)

Standardmäßig ist in Rust alles **privat** (Modul-Kapselung). Wenn du ein Struct in einer Datei definierst und in einer anderen Datei (oder einem Modul) nutzen willst, sind weder das Struct noch seine Felder oder Methoden von außen sichtbar.

```rust
// In einem anderen Modul oder einer anderen Datei:
struct Auto {
    marke: String, // privat!
}
```

*   **Die Behebung:** Du musst explizit das Schlüsselwort `pub` vor das Struct und vor *jedes einzelne Feld* schreiben, auf das von außen zugegriffen werden soll. Ebenso müssen die Methoden im `impl`-Block mit `pub fn` deklariert werden.
```rust
pub struct Auto {
    pub marke: String, // Jetzt öffentlich
}
```

#### Fehler 3: Versuch, Referenzen im Struct zu speichern, ohne Lifetimes zu verstehen

Rust-Einsteiger versuchen oft, Platz zu sparen, indem sie `&str` statt `String` in ihren Structs nutzen:

```rust
// FEHLER beim Kompilieren!
struct Buch {
    titel: &str, // Compiler verlangt Lifetimes: &'a str
}
```

*   **Die Erklärung:** Eine Referenz ist nur ein Zeiger auf Daten, die jemand anderem gehören. Rust muss absolut sicherstellen, dass das Buch nicht länger lebt als der Text, auf den `titel` verweist. Dafür benötigt man Lebenszeit-Annotationen (Lifetimes), was für Anfänger extrem verwirrend ist.
*   **Die Behebung (Für Phase 2):** **Nutze immer besitzende Typen!** Verwende `String` statt `&str` und `Vec<T>` statt Arrays/Slices. Das Kopieren oder Klonen von Daten ist am Anfang völlig in Ordnung und schützt dich vor komplexen Compiler-Kämpfen.

---

## 🔠 2. Enums (Die sichere Klassifikation)

### 📦 Die Paketstatus-Analogie: Vielfalt in einer einzigen Schublade

Stell dir vor, du betreibst ein Logistikunternehmen. Jedes Paket, das du transportierst, befindet sich in einem bestimmten Zustand. Du möchtest diesen Zustand in deinem Computersystem abbilden.

In klassischen Sprachen würdest du vielleicht Zahlen nutzen (0 = Vorbereitung, 1 = Transport, 2 = Zugestellt). Aber was ist, wenn der Status "Transport" auch wissen muss, welcher LKW das Paket gerade fährt? Und was ist, wenn "Zugestellt" den Namen der Person braucht, die unterschrieben hat?

In Rust ist ein **Enum** (Aufzählung) wie eine clevere Schublade. Die Schublade hat ein Schild auf der Vorderseite, das den aktuellen Status anzeigt. Je nachdem, welches Schild gerade aktiv ist, enthält die Schublade andere Gegenstände:
*   Steht auf dem Schild **"Vorbereitung"**, ist die Schublade leer.
*   Steht auf dem Schild **"In Zustellung"**, liegt in der Schublade ein Zettel mit dem Namen des Fahrers und den aktuellen GPS-Koordinaten.
*   Steht auf dem Schild **"Ausgeliefert"**, liegt in der Schublade das digitale Foto der Unterschrift.
*   Steht auf dem Schild **"Fehlgeschlagen"**, liegt dort ein Zettel mit der Begründung (z. B. "Adresse nicht gefunden").

Das Geniale: Ein Paket kann **niemals** gleichzeitig im Zustand "Vorbereitung" und "Ausgeliefert" sein. Das Enum garantiert, dass immer genau ein Zustand aktiv ist, und bündelt die exakt dazu passenden Daten.

### 🧠 Die Theorie: Was macht Rust-Enums so besonders?

In den meisten Programmiersprachen (C++, Java, C#) sind Enums lediglich eine hübschere Schreibweise für eine Liste von Zahlen (0, 1, 2...). In Rust sind Enums sogenannte **algebraische Datentypen (Summen-Typen)**. Sie können Daten direkt an ihre Varianten binden.

Es gibt drei Arten von Varianten in einem Enum:

1.  **Einfache Varianten (wie klassische Enums):**
    Besitzen keine zusätzlichen Daten.
    ```rust
    enum Ampelphase {
        Rot,
        Gelb,
        Gruen,
    }
    ```

2.  **Tupel-Varianten:**
    Tragen unbenannte Daten bei sich.
    ```rust
    enum IPAdresse {
        V4(u8, u8, u8, u8), // z. B. V4(127, 0, 0, 1)
        V6(String),          // z. B. V6(String::from("::1"))
    }
    ```

3.  **Struct-Varianten:**
    Tragen benannte Felder bei sich – wie ein eingebettetes Struct.
    ```rust
    enum BenutzerAktion {
        Klick { x: i32, y: i32 },
        TextEingabe(String),
        Abmelden,
    }
    ```

#### Speicherlayout von Enums: Der "Tag" (Discriminant)

Wie speichert Rust ein Enum, wenn die Varianten unterschiedlich groß sind? 
Das Enum reserviert im Speicher so viel Platz, wie seine **größte** Variante benötigt, plus ein winziges bisschen Extra-Platz für den sogenannten **Tag** (oder *Discriminant*). Der Tag ist eine einfache Zahl, die dem Computer mitteilt, welche Variante momentan aktiv ist.

*Beispiel:* 
*   Variante A benötigt 0 Byte.
*   Variante B benötigt 32 Byte.
*   Das Enum belegt im Speicher insgesamt 32 Byte (für die Daten) + 1 Byte (für den Tag) = 33 Byte (abzüglich Alignment-Optimierungen).
*   **Null-Pointer-Optimierung:** Rust ist extrem clever. Wenn du einen Typen wie `Option<&T>` (eine Referenz, die vorhanden sein kann oder nicht) nutzt, belegt dies exakt genauso viel Speicher wie die bloße Referenz `&T`. Rust nutzt die Tatsache aus, dass eine Referenz niemals Null (0x0) sein darf. Die Variante `None` wird einfach als Null-Zeiger dargestellt. Es gibt keinen Speicher-Overhead!

---

### 💻 Detailliertes Theorie-Codebeispiel: Der Paketstatus

Dieses Beispiel zeigt die Definition eines komplexen Enums mit verschiedenen Datenstrukturen und Methoden, die auf dem Enum selbst definiert werden können.

```rust
// Hilfs-Struct für die Retoure
struct Retourengrund {
    code: u32,
    beschreibung: String,
}

// Definition des Enums mit unterschiedlichen Datenanhängen
enum PaketStatus {
    // 1. Einfache Variante ohne Daten
    ImLager,
    
    // 2. Tupel-Variante mit einem String (Fahrername) und u32 (Distanz in km)
    AufWeg(String, u32),
    
    // 3. Struct-Variante mit benannten Feldern für detaillierte Infos
    Zugestellt {
        empfaenger: String,
        uhrzeit_stunden: u32,
    },
    
    // 4. Eine Variante, die ein anderes Struct enthält
    Retoure(Retourengrund),
}

// Auch Enums können Methoden haben!
impl PaketStatus {
    // Eine Methode, die den Status analysiert und ausgibt
    fn print_info(&self) {
        match self {
            PaketStatus::ImLager => {
                println!("Das Paket liegt sicher im Zentrallager.");
            }
            // Destrukturierung der Tupel-Variante
            PaketStatus::AufWeg(fahrer, verbleibend) => {
                println!("Das Paket ist unterwegs mit Fahrer {} (noch {} km).", fahrer, verbleibend);
            }
            // Destrukturierung der Struct-Variante
            PaketStatus::Zugestellt { empfaenger, uhrzeit_stunden } => {
                println!("Erfolgreich zugestellt an {} um {} Uhr.", empfaenger, uhrzeit_stunden);
            }
            // Zugriff auf das verschachtelte Struct
            PaketStatus::Retoure(grund) => {
                println!("Paket geht zurück. Grund: [{}] {}", grund.code, grund.beschreibung);
            }
        }
    }

    // Eine Methode, die prüft, ob das Paket bereits beim Kunden angekommen ist
    fn ist_erledigt(&self) -> bool {
        match self {
            // Uns interessieren hier die inneren Daten nicht, daher nutzen wir Platzhalter
            PaketStatus::Zugestellt { .. } => true,
            _ => false, // Alles andere ist noch nicht erledigt
        }
    }
}
```

---

### ⚠️ Typische Einsteigerfehler bei Enums

#### Fehler 1: Der direkte Feldzugriff (Suchen nach dem Unmöglichen)

Ein häufiger Fehler ist der Versuch, direkt auf Daten einer Variante zuzugreifen, ohne zu wissen, ob diese Variante überhaupt aktiv ist.

```rust
let mein_paket = PaketStatus::ImLager;

// FEHLER! Was, wenn das Paket gar nicht auf dem Weg ist?
// Der Compiler blockiert das, da 'fahrer' nicht in allen Varianten existiert.
// let fahrer = mein_paket.0; 
```

*   **Die Behebung:** Du musst **Pattern Matching** (siehe nächstes Kapitel) verwenden, um den Zustand sicher zu überprüfen. Der Compiler zwingt dich dazu, den Fall abzufangen, in dem das Paket *nicht* unterwegs ist.

#### Fehler 2: Verwechslung von Enum-Varianten mit Typen

In Rust sind die einzelnen Varianten eines Enums **keine eigenständigen Typen**. Sie sind lediglich Konstruktoren für das Enum.

```rust
enum Status {
    Aktiv(String),
    Inaktiv,
}

// FEHLER: 'Aktiv' ist kein Typ, den man als Parameter übergeben kann!
// fn verarbeite_aktivität(status: Status::Aktiv) {} 
```

*   **Die Behebung:** Die Funktion muss das gesamte Enum als Parameter akzeptieren und intern prüfen, welche Variante übergeben wurde.
```rust
fn verarbeite_aktivität(status: Status) {
    if let Status::Aktiv(name) = status {
        // ...
    }
}
```

---

## 🎯 3. Pattern Matching (match & if let)

### 🛂 Die Zoll-Analogie: Präzise Sortierung nach Regeln

Stell dir vor, du stehst als Zollbeamter am Flughafen an der Kontrollstation. Deine Aufgabe ist es, alle ankommenden Reisenden in die richtigen Bahnen zu lenken. Du hast ein strenges Regelwerk vor dir liegen:

1.  **Regel 1:** Hat der Reisende einen Diplomatenpass? ➔ Direkt durchwinken ohne Kontrolle.
2.  **Regel 2:** Kommt der Reisende aus einem EU-Land? ➔ Kurzer Blick auf den Ausweis, dann durchlassen.
3.  **Regel 3:** Kommt der Reisende aus einem Nicht-EU-Land *und* führt Waren im Wert von über 430 € mit sich? ➔ Zur Zollabfertigung schicken (Daten der Waren registrieren).
4.  **Regel 4:** Trifft nichts von alledem zu (der Standardfall)? ➔ Standard-Einreisekontrolle durchführen.

Dieses Regelwerk entspricht exakt einem `match`-Block in Rust:
*   Du gehst die Regeln von **oben nach unten** durch. Die erste Regel, die auf den Reisenden zutrifft, wird ausgeführt. Alle folgenden Regeln werden ignoriert.
*   Du darfst **keine Lücke** lassen. Wenn ein Reisender kommt, auf den keine deiner Regeln passt, gerät das System ins Stocken. Das Gesetz verlangt, dass du für absolut jedes mögliche Szenario eine Anweisung hast (**Exhaustiveness Checking**).
*   Manchmal filterst du nicht nur nach groben Kategorien, sondern packst direkt die Taschen aus (Destrukturierung), um den genauen Wert der geschmuggelten Ware zu ermitteln.

### 🧠 Die Theorie: Mustererkennung in Höchstform

Pattern Matching in Rust ist weitaus mächtiger als ein einfaches `switch-case` in C oder Java. Es erlaubt das Vergleichen von Mustern, das Entpacken von Daten und das Knüpfen von Bedingungen an Bedingungen.

#### `match` und die Exhaustiveness (Vollständigkeit)

Der Rust-Compiler prüft beim Kompilieren mathematisch genau, ob dein `match`-Ausdruck alle Möglichkeiten des überprüften Typs abdeckt. Vergisst du auch nur eine einzige Variante eines Enums oder einen möglichen Zahlenbereich, verweigert der Compiler den Dienst. Dies verhindert eine der häufigsten Fehlerquellen in der Softwareentwicklung: den "vergessenen Sonderfall".

```rust
let zahl = 5;
match zahl {
    1 => println!("Eins"),
    2 => println!("Zwei"),
    // FEHLER: Was ist mit 3, 4, 5, -100 etc.?
}
```

#### Der Default-Platzhalter `_`

Um nicht alle unendlich vielen Zahlen oder Zustände einzeln auflisten zu müssen, nutzen wir den Unterstrich `_`. Er dient als Auffangnetz ("Catch-All") für alle Fälle, die weiter oben nicht explizit genannt wurden.

```rust
match zahl {
    1 => println!("Eins"),
    2 => println!("Zwei"),
    _ => println!("Eine andere Zahl"), // Deckt den Rest ab
}
```

*Wichtiger Warnhinweis:* Nutze `_` bei Enums mit Bedacht! Wenn du später eine neue Variante zum Enum hinzufügst (z. B. `PaketStatus::Verloren`), wird der Compiler dich nicht warnen, dass du diese Variante im `match` vergessen hast, da sie automatisch vom `_` abgefangen wird. Das kann zu logischen Fehlern führen.

#### `if let` (Die präzise Kurzform)

Manchmal ist uns die Vollständigkeit von `match` zu schreibaufwendig. Wenn uns von 10 möglichen Enum-Varianten nur eine einzige interessiert und wir alle anderen stumm ignorieren wollen, nutzen wir `if let`.

*   **Mit match:**
    ```rust
    match status {
        Status::Aktiv(name) => println!("Hallo {}", name),
        _ => {} // Mühsames Ignorieren aller anderen Fälle
    }
    ```
*   **Mit `if let`:**
    ```rust
    if let Status::Aktiv(name) = status {
        println!("Hallo {}", name);
    }
    ```
    *Lesehilfe:* "Wenn es sich bei `status` um das Muster `Status::Aktiv` handelt, dann binde den inneren Wert an die Variable `name` und führe den Block aus."

#### Match Guards (Zusatzbedingungen)

Ein Match Guard erlaubt es dir, einen Match-Arm mit einer zusätzlichen `if`-Bedingung zu versehen. Das Muster passt nur dann, wenn auch die Bedingung wahr ist.

```rust
match status {
    Status::Aktiv(name) if name.starts_with("A") => {
        println!("A-Team Mitglied: {}", name);
    }
    Status::Aktiv(name) => {
        println!("Normales Mitglied: {}", name);
    }
    _ => {}
}
```

---

### 💻 Detailliertes Theorie-Codebeispiel: Paket-Auswertung

Das folgende Programm zeigt, wie wir das zuvor definierte `PaketStatus`-Enum mittels Pattern Matching und `if let` strukturiert auswerten können.

```rust
// Wir redefinieren hier kurz eine vereinfachte Version für das eigenständige Beispiel
enum Paket {
    ImLager,
    AufWeg(String, u32), // Fahrer, Restkilometer
    Zugestellt(String),  // Empfänger
}

fn verarbeite_paket(paket: &Paket) {
    // 1. Auswertung mit vollem 'match'
    match paket {
        // Fall 1: Keine Daten vorhanden
        Paket::ImLager => {
            println!("Paket wartet auf die Verladung.");
        }
        
        // Fall 2: Destrukturierung mit Match Guard (Zusatzbedingung)
        // Wir prüfen, ob die Reststrecke sehr kurz ist
        Paket::AufWeg(fahrer, restliche_km) if *restliche_km < 5 => {
            println!("Fahrer {} ist fast da! Nur noch {} km.", fahrer, restliche_km);
        }
        
        // Fall 3: Standard-Fall für 'AufWeg'
        Paket::AufWeg(fahrer, restliche_km) => {
            println!("Paket ist auf dem Weg. Fahrer: {}. Distanz: {} km.", fahrer, restliche_km);
        }
        
        // Fall 4: Auspacken des Empfängernamens
        Paket::Zugestellt(name) => {
            println!("Das Paket wurde erfolgreich an {} übergeben.", name);
        }
    }
}

fn schnelles_update(paket: &Paket) {
    // 2. Auswertung mit 'if let', da uns NUR der Zustellungsstatus interessiert
    if let Paket::Zugestellt(name) = paket {
        println!("Benachrichtigung senden: Ihr Paket wurde von {} entgegengenommen.", name);
    } else {
        println!("Paket ist noch im Prozess. Keine Benachrichtigung erforderlich.");
    }
}
```

---

### ⚠️ Typische Einsteigerfehler bei Pattern Matching

#### Fehler 1: Vergessene Zweige (`non-exhaustive patterns`)

Der Compiler bricht ab mit der Meldung: `error[E0004]: non-exhaustive patterns: ... not covered`.

```rust
enum Richtung { Nord, Ost, Sued, West }

fn wind_richtung(r: Richtung) {
    match r {
        Richtung::Nord => println!("Kalter Wind"),
        Richtung::Ost => println!("Trockener Wind"),
        // FEHLER: Sued und West fehlen!
    }
}
```

*   **Die Behebung:** Entweder alle Varianten explizit ausschreiben (empfohlen für Enums, damit spätere Änderungen auffallen) oder am Ende des `match`-Blocks einen Default-Zweig `_ => ...` einbauen.

#### Fehler 2: Schattenvariablen (Variable Shadowing) im Match-Arm

Ein extrem tückischer Fehler für Anfänger betrifft das Vergleichen von Werten mit Variablen, die außerhalb des Matches definiert sind.

```rust
let lieblings_zahl = 7;
let gewinn_zahl = 5;

match gewinn_zahl {
    lieblings_zahl => println!("Gewonnen!"), // ACHTUNG: Das vergleicht nicht!
    _ => println!("Verloren!"),
}
```

*   **Das Problem:** Rust liest `lieblings_zahl` im Match-Arm nicht als die konstante Zahl 7 aus der äußeren Zeile, sondern deklariert im Match-Arm eine **neue, temporäre Variable** namens `lieblings_zahl`. Diese fängt *jeden* Wert von `gewinn_zahl` ab (wie ein `_`). Das Programm gibt fälschlicherweise immer "Gewonnen!" aus.
*   **Die Behebung:** Für exakte Vergleiche mit externen Variablen nutzt man Match Guards:
```rust
match gewinn_zahl {
    x if x == lieblings_zahl => println!("Gewonnen!"),
    _ => println!("Verloren!"),
}
```

#### Fehler 3: Ownership-Verlust beim Destrukturieren im Match

Wenn du über ein Struct oder Enum matchst und dabei Daten herauskopierst, die nicht `Copy` sind (wie ein `String`), versucht Rust, die Ownership aus der gematchten Struktur herauszubewegen.

```rust
struct Mitglied {
    name: String,
}

fn pruefe_mitglied(mitglied: Mitglied) {
    match mitglied {
        Mitglied { name } => { // name wird hier HERAUSBEWEGT
            println!("Mitgliedsname: {}", name);
        }
    }
    // FEHLER: mitglied kann hier nicht mehr verwendet werden, 
    // da 'name' herausbewegt wurde.
    // println!("Username: {}", mitglied.name); 
}
```

*   **Die Behebung:** Wenn du das Struct nach dem Match weiterverwenden willst, matche auf einer **Referenz** des Objekts: `match &mitglied`. Rust wird dann automatisch die Felder als Referenzen (`&name`) und nicht als Besitzwerte destrukturieren.

---

## 🚀 Wie du diese Phase am besten nutzt

Um diese Phase optimal zu durchlaufen und frustfreie Fortschritte zu erzielen, solltest du folgende Strategien beherzigen:

*   **Trenne Daten und Verhalten konsequent:**
    Wenn du ein Problem lösen musst, schreibe zuerst die Rohdaten auf. Welche Eigenschaften hat dein Objekt? Definiere das Struct. Überlege dir danach, welche Aktionen (Methoden) darauf ausgeführt werden sollen, und packe sie in einen `impl`-Block. Schritt für Schritt programmieren verhindert, dass du dich in der Logik verlierst.
*   **Kopieren ist am Anfang dein Freund:**
    Wenn der Compiler sich beschwert, dass Daten "moved" wurden, nutze großzügig `.clone()`. Optimierungen auf Performance und das Vermeiden von Klonvorgängen sind Themen für Phase 3 und 4. In Phase 2 geht es darum, lauffähige Programme zu schreiben und die Typsicherheit zu verstehen.
*   **Lerne die Fehlermeldungen des Compilers lieben:**
    Der Rust-Compiler ist kein Gegner, der dich schikanieren will, sondern dein kostenloser Programmier-Tutor. Wenn er dir sagt, dass ein `match` nicht vollständig ist, zeigt er dir meistens direkt die fehlende Variante an. Lies die Fehlermeldungen aufmerksam von oben nach unten durch.

---

## 📌 Merkzettel: Phase 2 auf einen Blick

> [!IMPORTANT]
> *   **Structs (Baupläne):** Fassen zusammengehörige Datenfelder zu einem Typ zusammen. Sie liegen kompakt im Speicher und haben keinen Laufzeit-Overhead.
> *   **Methoden (`impl`):** Fügen Structs Verhalten hinzu. `self` konsumiert das Objekt (Ownership geht verloren), `&self` erlaubt nur lesenden Zugriff, `&mut self` erlaubt verändernden Zugriff unter Ausschluss anderer Zugriffe.
> *   **Enums (Klassifikationen):** Bilden Zustände ab, von denen immer exakt einer aktiv ist. Sie können komplexe Daten (Tupel oder Structs) Huckepack tragen.
> *   **Pattern Matching (`match`):** Sortiert Daten sicher aus. Die Vollständigkeitsprüfung (Exhaustiveness) zwingt dich, jeden Fall abzudecken. `_` dient als Auffangnetz für den Rest.
> *   **`if let` (Kurzform):** Reagiert elegant auf genau ein bestimmtes Muster und ignoriert den Rest, ohne dass ein vollständiger `match`-Block geschrieben werden muss.
