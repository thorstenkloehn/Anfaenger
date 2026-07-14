# 🧱 Mitmach-Workshop: Phase 2 bildhaft verstehen (Das RPG-Helden-Abenteuer)

Willkommen im großen RPG-Helden-Abenteuer! ⚔️🛡️

Wenn wir programmieren lernen, wirken Begriffe wie **Structs**, **Enums**, **Methoden** (`impl`) und **Pattern Matching** oft sehr abstrakt. Aber eigentlich ist es wie das Entwerfen deines eigenen Rollenspiels! Ein Struct ist nichts anderes als ein Charakterbogen mit festen Feldern, und ein Enum ist die Auswahlliste deiner Ausrüstung.

In diesem Kapitel bauen wir zusammen ein kleines Abenteuerspiel im Kopf auf und setzen es danach Schritt für Schritt in Rust um. Mach dich bereit, deinen eigenen Helden zu erschaffen!

---

## 🧠 Hintergrund: Structs als feste Strukturpläne und Enums als flexible Wahlmöglichkeiten im Speicher

Bevor wir Code schreiben, schauen wir uns an, wie Rust unsere Daten im Arbeitsspeicher ablegt:

### 1. Das Struct: Der feste Bauplan
Stell dir ein Struct wie einen vorgedruckten Charakterbogen aus Papier vor. Auf diesem Bogen gibt es genau definierte Kästchen: *Name*, *Lebenspunkte* (LP) und *Schaden*.
*   **Feste Struktur:** Jedes Kästchen hat seinen festen Platz und seine feste Größe. Du kannst nicht spontan ein neues Kästchen dazwischenmalen.
*   **Im Speicher:** Da die Größe aller Kästchen (z. B. eine Zahl für LP oder Schaden) im Voraus bekannt ist, reserviert der Computer genau diese feste Anzahl an Bytes hintereinander auf dem **Stack** (Stapelspeicher). Das ist super schnell und ordentlich!

### 2. Das Enum: Die flexiblen Wahlmöglichkeiten
Ein Enum ist wie ein magischer Ausrüstungsplatz, auf dem immer nur **eine einzige Sache** zur gleichen Zeit liegen kann. Entweder liegt dort ein Heiltrank, eine Waffe oder ein Beutel Gold.
*   **Daten tragen:** In Rust sind Enums genial, weil sie nicht nur Namen sind, sondern auch Werte Huckepack tragen können! Ein Heiltrank trägt die Heilkraft als Zahl (`Heiltrank(u32)`), eine Waffe trägt ihren Schaden (`Waffe(u32)`) und das Gold seinen Wert (`Gold(u32)`).
*   **Im Speicher:** Der Computer reserviert auf dem Stack genau so viel Platz, wie die *größte* Möglichkeit des Enums benötigt, plus ein kleines "Etikett" (Tag), damit er weiß, welcher Gegenstand gerade wirklich da liegt.

---

## 🗺️ Das RPG-Helden-Abenteuer auf einen Blick

Schau dir an, wie unsere Bausteine im Abenteuer zusammenspielen:

```text
┌────────────────────────────────────────────────────────┐
│                     struct Held                        │
│  ┌───────────────┬───────────────────┬──────────────┐  │
│  │ name: String  │  lp: u32 (Leben)  │ schaden: u32 │  │
│  └───────────────┴───────────────────┴──────────────┘  │
└────────────────────────────────────────────────────────┘
                            │
                            ▼ (benutzt / interagiert mit)
┌────────────────────────────────────────────────────────┐
│                    enum Gegenstand                     │
│  ┌───────────────────┬───────────────────┬──────────┐  │
│  │ Heiltrank(u32)    │ Waffe(u32)        │ Gold(u32)│  │
│  └───────────────────┴───────────────────┴──────────┘  │
└────────────────────────────────────────────────────────┘
                            │
                            ▼ (ausgewertet durch)
┌────────────────────────────────────────────────────────┐
│                   match gegenstand                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Heiltrank(wert) ──> Erhöhe lp um wert            │  │
│  │ Waffe(wert)     ──> Erhöhe schaden um wert       │  │
│  │ Gold(wert)      ──> Erhöhe gesammeltes Gold      │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 📦 Micro-Learning 1: Der Charakterbogen (Structs & Methoden)

### 🧸 Die Analogie: Der Charakterbogen
Wenn du ein Spiel startest, hat jeder Held feste Eigenschaften. Dein Krieger "Grom" hat vielleicht 100 Lebenspunkte und macht 15 Schaden. Diese Werte gehören untrennbar zusammen. 

Ein **Struct** fasst diese Daten in einem Paket zusammen. Mit einem **`impl`-Block** (Kurzform für *Implementation*) können wir dem Helden Aktionen beibringen – also Methoden, die er ausführen kann (wie das Laufen oder Angreifen).

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Ein Struct definieren:**
    ```rust
    struct Held {
        name: String,
        leben: u32,
        schaden: u32,
    }
    ```
*   **Methoden hinzufügen (`impl`):**
    ```rust
    impl Held {
        // Ein Konstruktor, um einen Helden zu erschaffen
        fn neu(name: String) -> Held {
            Held {
                name,
                leben: 100,
                schaden: 15,
            }
        }

        // Eine Methode, die den Helden verändert (&mut self)
        fn heilen(&mut self, menge: u32) {
            self.leben += menge;
        }
    }
    ```

> [!TIP]
> **Eselsbrücke:** **Struct** = Die **S**ubstanz (Eigenschaften). **impl** = Die **I**mpulse (Aktionen).
> **Merkzettel:** Wenn eine Methode die Werte des Helden verändern soll, musst du `&mut self` als ersten Parameter nutzen!

---

## 🏷️ Micro-Learning 2: Die Ausrüstung (Enums mit Daten)

### 🧸 Die Analogie: Der flexible Rucksackplatz
In deinem Rucksack hast du einen Platz für einen Gegenstand. Das kann ein Trank sein (der dir LP gibt), ein Schwert (das deinen Schaden erhöht) oder ein Goldklumpen (der dein Vermögen vergrößert).

Ein **Enum** (Aufzählungstyp) listet diese Möglichkeiten auf. In Rust können die Varianten eigene Werte in Klammern tragen – so schleppt jeder Gegenstand direkt seine Stärke mit!

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Ein Enum mit Daten definieren:**
    ```rust
    enum Gegenstand {
        Heiltrank(u32), // Trägt die Heilkraft in LP
        Waffe(u32),     // Trägt den zusätzlichen Schaden
        Gold(u32),      // Trägt die Anzahl der Münzen
    }
    ```
*   **Einen Gegenstand erstellen:**
    ```rust
    let trank = Gegenstand::Heiltrank(25);
    let schwert = Gegenstand::Waffe(10);
    ```

> [!TIP]
> **Eselsbrücke:** **Enum** = **E**ntweder-oder-Zustände.
> **Merkzettel:** Rust-Enums sind mächtiger als in anderen Sprachen! Nutze die Klammern `(u32)` hinter den Varianten, um ihnen wichtige Daten mitzugeben.

---

## 🔑 Micro-Learning 3: Den Gegenstand benutzen (Pattern Matching)

### 🧸 Die Analogie: Die Reaktion auf den Gegenstand
Wenn dein Held einen Gegenstand aus dem Rucksack zieht, muss das Spiel entscheiden: Was passiert jetzt?
*   Ist es ein Heiltrank? Trinke ihn und erhöhe die Lebenspunkte.
*   Ist es eine Waffe? Rüste sie aus und mache mehr Schaden.
*   Ist es Gold? Stecke es in den Geldbeutel.

Mit dem **`match`-Ausdruck** prüfen wir genau, welche Variante vorliegt, packen den inneren Wert aus und reagieren passend.

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Werte auspacken mit `match`:**
    ```rust
    fn gegenstand_nutzen(held: &mut Held, gegenstand: Gegenstand) {
        match gegenstand {
            Gegenstand::Heiltrank(heilung) => {
                held.heilen(heilung);
                println!("{} trinkt einen Trank und heilt {} LP!", held.name, heilung);
            }
            Gegenstand::Waffe(bonus) => {
                held.schaden += bonus;
                println!("{} rüstet eine Waffe aus (+{} Schaden)!", held.name, bonus);
            }
            Gegenstand::Gold(anzahl) => {
                // Gold einsammeln...
                println!("Geld gefunden!");
            }
        }
    }
    ```

> [!TIP]
> **Eselsbrücke:** **match** = Der **M**uster-Wächter. Er prüft, was genau vorliegt und packt es aus.
> **Merkzettel:** Ein `match` in Rust muss **vollständig** sein! Du musst jede einzelne Variante deines Enums behandeln, sonst schimpft der Compiler.

---

## 🛠️ Mitmach-Workshop: Programmiere deinen Helden-Kampf-Simulator!

Jetzt schlüpfst du in die Rolle des Spielentwicklers! Wir bauen einen kleinen Kampf-Simulator, in dem ein Held gegen Monster antritt und Gegenstände nutzt. 

**WICHTIG:** Verwende in diesem Workshop keine Vektoren (`Vec`) oder HashMaps, da wir diese erst in Phase 3 lernen! Wir arbeiten nur mit festen Variablen, Structs und Enums.

---

### 📝 Dein Notizzettel (Das Ziel des Workshops)
Dein Programm soll:
1.  Einen Helden und ein Monster als Structs verwalten.
2.  Ein Enum für Beute-Gegenstände bereitstellen.
3.  Eine Methode haben, mit der ein Charakter einen anderen angreift.
4.  Eine Match-Logik besitzen, um Gegenstände sicher anzuwenden und Werte anzupassen.

---

### 🧱 Schritt-für-Schritt-Bauanleitung

#### 🏃 Schritt 1: Die Gegenstände definieren (Enum)
Erstelle ein Enum `Gegenstand`. Es soll folgende Varianten mit Werten besitzen:
*   `Heiltrank` (mit einer Zahl für die Heilung).
*   `Schwert` (mit einer Zahl für den Zusatzschaden).
*   `Schild` (mit einer Zahl für zusätzliche Lebenspunkte/Rüstung).

#### 🏢 Schritt 2: Den Helden und das Monster bauen (Struct)
Erstelle ein Struct `Charakter`. Es soll folgende Felder haben:
*   `name` (ein `String`)
*   `leben` (eine Ganzzahl `u32`)
*   `schaden` (eine Ganzzahl `u32`)

#### 🔧 Schritt 3: Die Charakter-Methoden entwerfen (`impl Charakter`)
Schreibe die Methoden im `impl`-Block:
1.  **`neu(name: String, leben: u32, schaden: u32) -> Charakter`**
    Erstellt einen Charakter mit den angegebenen Werten.
2.  **`angreifen(&self, ziel: &mut Charakter)`**
    Zieht dem Ziel Lebenspunkte in Höhe des Schadens des Angreifers ab. Sorge dafür, dass die Lebenspunkte nicht unter `0` fallen (z. B. mit `saturating_sub`).
3.  **`gegenstand_nutzen(&mut self, item: Gegenstand)`**
    Nutze ein `match`, um je nach Gegenstand die LP zu erhöhen (`Heiltrank`), den Schaden zu steigern (`Schwert`) oder die LP permanent zu erhöhen (`Schild`).

#### 🚦 Schritt 4: Der Testlauf in `main`
Schreibe ein Skelett deiner Anwendung. Verwende `todo!()` für alle Teile, die du selbst ausfüllen möchtest.

Hier ist das Code-Gerüst für dein Hauptprogramm:

```rust
// TODO: Definiere hier das Enum `Gegenstand` mit seinen Varianten und Werten

// TODO: Definiere hier das Struct `Charakter`

impl Charakter {
    fn neu(name: String, leben: u32, schaden: u32) -> Charakter {
        // TODO: Erstelle einen neuen Charakter
        todo!()
    }

    fn angreifen(&self, ziel: &mut Charakter) {
        // Zieht ziel.leben ab, ohne unter 0 zu fallen
        // TODO: Schadensberechnung implementieren
        todo!()
    }

    fn gegenstand_nutzen(&mut self, item: Gegenstand) {
        // TODO: match-Ausdruck zur Auswertung des Gegenstands
        todo!()
    }
}

fn main() {
    // 1. Helden und Monster erstellen
    let mut held = Charakter::neu(String::from("Sir Rust-a-Lot"), 80, 15);
    let mut monster = Charakter::neu(String::from("Speicherleck-Ork"), 50, 10);
    
    println!("Kampf beginnt! {} ({} LP) gegen {} ({} LP)", held.name, held.leben, monster.name, monster.leben);

    // 2. Erster Schlagabtausch
    held.angreifen(&mut monster);
    println!("{} schlägt zu! {} hat noch {} LP.", held.name, monster.name, monster.leben);

    // 3. Held findet Beute und benutzt sie
    let beute = Gegenstand::Heiltrank(30);
    held.gegenstand_nutzen(beute);

    // 4. Monster schlägt zurück
    monster.angreifen(&mut held);
    println!("{} schlägt zurück! {} hat noch {} LP.", monster.name, held.name, held.leben);
    
    // TODO: Füge einen weiteren Beutegegenstand hinzu und teste, ob die Werte stimmen!
}
```

---

## 📝 Reichlich Übungen zum Vertiefen

Jetzt festigen wir dein Wissen mit praktischen Übungsaufgaben! Kopiere den Code in dein Projekt und ersetze die `todo!()`-Makros so, dass alle Tests in `main` erfolgreich durchlaufen.

### 🟢 Übung 1 (Leicht): Der Charakterklassen-Bonus
**Ziel:** Lerne, wie man ein einfaches Enum ohne Daten in einem `match`-Ausdruck auswertet.
**Szenario:** Bei der Charaktererstellung erhält jede Klasse einen unterschiedlichen Bonus auf ihre Lebenspunkte.

```rust
#[derive(Debug, Clone, Copy, PartialEq)]
enum Klasse {
    Krieger,
    Magier,
    Dieb,
}

fn berechne_leben_mit_bonus(basis_leben: u32, klasse: Klasse) -> u32 {
    // Krieger erhält +30 LP, Magier erhält +5 LP, Dieb erhält +15 LP.
    // TODO: Werte mit match aus und addiere den Bonus zum basis_leben.
    todo!()
}

fn main() {
    assert_eq!(berechne_leben_mit_bonus(100, Klasse::Krieger), 130);
    assert_eq!(berechne_leben_mit_bonus(100, Klasse::Magier), 105);
    assert_eq!(berechne_leben_mit_bonus(100, Klasse::Dieb), 115);
    
    println!("🎉 Übung 1 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 2 (Mittel): Die Ausrüstungs-Tragkraft
**Ziel:** Lerne, wie man Enums mit Daten verwendet und Werte berechnet, ohne Vektoren zu nutzen.
**Szenario:** Ein Held hat zwei feste Ausrüstungsplätze (Hände). Wir wollen das zusätzliche Gewicht berechnen, das er trägt.

```rust
enum Ausruestung {
    Schild(u32),     // Schild mit Gewicht in kg
    Waffe(u32),      // Waffe mit Gewicht in kg
    ZweihandAxt(u32),// Riesige Axt mit Gewicht in kg
    Leer,            // Hand ist leer
}

struct HeldenHaende {
    linke_hand: Ausruestung,
    rechte_hand: Ausruestung,
}

impl HeldenHaende {
    fn gesamt_gewicht(&self) -> u32 {
        // TODO: Berechne das Gewicht beider Hände zusammen mithilfe von Pattern Matching.
        // Tipp: Schreibe eine kleine Hilfsfunktion oder matche beide Hände einzeln.
        todo!()
    }
}

fn main() {
    let ausruestung = HeldenHaende {
        linke_hand: Ausruestung::Schild(5),
        rechte_hand: Ausruestung::Waffe(3),
    };
    assert_eq!(ausruestung.gesamt_gewicht(), 8);

    let schwerer_held = HeldenHaende {
        linke_hand: Ausruestung::ZweihandAxt(12),
        rechte_hand: Ausruestung::Leer,
    };
    assert_eq!(schwerer_held.gesamt_gewicht(), 12);

    println!("🎉 Übung 2 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 3 (Mittel): Die Kisten-Falle
**Ziel:** Enums mit komplexeren Datenstrukturen auswerten und Spielzustände verändern.
**Szenario:** Der Held öffnet eine Schatztruhe. Sie kann Gold enthalten, eine Falle sein, die Schaden verursacht, oder einfach leer sein.

```rust
enum TruhenInhalt {
    Gold(u32),
    Falle(u32),
    Leer,
}

struct Held {
    name: String,
    leben: u32,
    gold: u32,
}

fn truhe_oeffnen(held: &mut Held, truhe: TruhenInhalt) {
    // TODO: Werte den Inhalt der Truhe aus.
    // Gold erhöht das Gold des Helden.
    // Falle zieht Leben ab (darf nicht unter 0 fallen! Nutze saturating_sub).
    // Leer gibt eine Textmeldung aus.
    todo!()
}

fn main() {
    let mut held = Held {
        name: String::from("Alrik"),
        leben: 50,
        gold: 10,
    };

    truhe_oeffnen(&mut held, TruhenInhalt::Gold(100));
    assert_eq!(held.gold, 110);
    assert_eq!(held.leben, 50);

    truhe_oeffnen(&mut held, TruhenInhalt::Falle(20));
    assert_eq!(held.leben, 30);

    truhe_oeffnen(&mut held, TruhenInhalt::Falle(40));
    assert_eq!(held.leben, 0); // Leben darf nicht negativ werden!

    println!("🎉 Übung 3 erfolgreich gelöst!");
}
```

---

### 🔴 Übung 4 (Schwer): Das Kampf-Duell
**Ziel:** Schreibe eine komplexe Simulationsfunktion, die zwei Structs per veränderlicher Referenz (`&mut`) manipuliert und den Gewinner zurückgibt.
**Szenario:** Zwei Helden duellieren sich in einer Arena. Sie schlagen abwechselnd zu, bis einer von beiden keine Lebenspunkte (0 LP) mehr hat.

```rust
#[derive(Debug, PartialEq)]
struct Duellant {
    name: String,
    leben: u32,
    schaden: u32,
}

// Simuliert ein Duell. held_a schlägt zuerst zu, dann held_b.
// Das geht so lange, bis einer der beiden 0 LP erreicht.
// Gibt den Namen des Gewinners als String zurück.
fn duell(held_a: &mut Duellant, held_b: &mut Duellant) -> String {
    // TODO: Schreibe eine Schleife.
    // In jeder Runde greift held_a den held_b an.
    // Wenn held_b noch lebt, schlägt held_b zurück.
    // Sobald einer der beiden 0 LP hat, bricht das Duell ab und der Siegername wird zurückgegeben.
    todo!()
}

fn main() {
    let mut krieger = Duellant {
        name: String::from("Thorin"),
        leben: 80,
        schaden: 15,
    };
    let mut ork = Duellant {
        name: String::from("Uruk"),
        leben: 60,
        schaden: 20,
    };

    // Rundenverlauf im Kopf:
    // Runde 1: Thorin greift Uruk an -> Uruk verliert 15 LP (hat noch 45).
    //          Uruk schlägt zurück -> Thorin verliert 20 LP (hat noch 60).
    // Runde 2: Thorin greift an -> Uruk verliert 15 LP (hat noch 30).
    //          Uruk schlägt zurück -> Thorin verliert 20 LP (hat noch 40).
    // Runde 3: Thorin greift an -> Uruk verliert 15 LP (hat noch 15).
    //          Uruk schlägt zurück -> Thorin verliert 20 LP (hat noch 20).
    // Runde 4: Thorin greift an -> Uruk verliert 15 LP (hat noch 0). Uruk besiegt!
    // Thorin gewinnt mit 20 LP.
    
    let gewinner = duell(&mut krieger, &mut ork);
    
    assert_eq!(gewinner, "Thorin");
    assert_eq!(krieger.leben, 20);
    assert_eq!(ork.leben, 0);

    println!("🎉 Übung 4 erfolgreich gelöst!");
}
```

---

## 📇 Merkzettel für den Kühlschrank (Zusammenfassung)

| Werkzeug | Wann benutzen? | Analogie | Wichtigste Syntax / Schlüsselwörter |
| :--- | :--- | :--- | :--- |
| **`struct`** | Wenn du zusammengehörige Daten als ein Paket speichern willst. | Der Charakterbogen | `struct Held { name: String }` |
| **`impl`** | Um Aktionen (Methoden) für dein Struct zu definieren. | Die Aktionen des Charakters | `impl Held { fn heilen(&mut self) }` |
| **`enum`** | Wenn du eine Auswahl aus sich ausschließenden Optionen brauchst. | Der flexible Rucksackplatz | `enum Gegenstand { Trank(u32), Leer }` |
| **`match`** | Um zu prüfen, welche Enum-Option vorliegt und Daten zu entpacken. | Die Reaktion auf Beute | `match item { Gegenstand::Trank(x) => {} }` |

---

## 🎓 Mini-Quiz (Micro-Learning)

*Versuche, diese Fragen im Kopf zu beantworten:*
1.  Was unterscheidet ein Rust-Enum von Enums in vielen anderen Programmier-Sprachen (wie Java oder C++)?
2.  Wann benutzt man `&self` and wann `&mut self` in Methoden eines Structs?
3.  Warum meckert der Rust-Compiler, wenn du im `match`-Ausdruck eine Enum-Variante vergisst?
4.  Warum werden Structs mit festen Datentypen standardmäßig auf dem Stack gespeichert und nicht auf dem Heap?

*Viel Erfolg beim Gestalten deiner Helden und dem Bestehen des Abenteuers! Wenn du mal feststeckst, frage deinen KI-Lernpartner nach einem Tipp für das nächste Level, aber lass dir nicht den Code vorsagen!*
