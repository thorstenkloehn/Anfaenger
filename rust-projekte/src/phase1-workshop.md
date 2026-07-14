# 🛹 Mitmach-Workshop: Phase 1 bildhaft verstehen (Die Leihbibliothek)

Willkommen in der magischen Leihbibliothek! 📚✨

Manchmal klingen Programmierbegriffe wie **Variablen**, **Mutabilität**, **Ownership (Besitz)**, **Borrowing (Ausleihen)** und **Slices (&str)** ziemlich theoretisch und trocken. Aber eigentlich funktionieren sie genauso wie die Regeln in einer echten Bibliothek!

In diesem Kapitel bauen wir zusammen eine Bibliothek im Kopf auf und setzen sie danach Schritt für Schritt in Rust um. Mach dich bereit für deine erste Programmier-Erfahrung!

---

## 🧠 Hintergrund: Wie arbeitet der Speicher? (Stack vs. Heap)

Bevor wir unsere Bücherregale einräumen, müssen wir verstehen, wie der Computer mit Daten im Speicher umgeht. Stell dir vor, die Bibliothek hat zwei Bereiche:

### 1. Die Servicetheke (Stack / Stapelspeicher)
Hier arbeitet der Bibliothekar. Auf der Theke liegen Dinge, die sofort griffbereit sein müssen.
*   **Vorteil:** Extrem schnell erreichbar.
*   **Nachteil:** Der Platz auf dem Tisch ist stark begrenzt. Und das Wichtigste: Es passen nur Dinge darauf, deren Größe sich niemals ändert (z. B. einfache Nummern wie `i32`, Wahrheitswerte wie `bool` oder die genauen Adressen von Lagerplätzen).
*   In Rust kopiert der Computer diese Werte oft einfach, wenn wir sie weitergeben (Copy-Verhalten), weil das so schnell geht.

### 2. Das Hauptlager im Keller (Heap / Haldenspeicher)
Wenn ein neues Buch geschrieben wird oder wir ein großes, flexibles Tagebuch anlegen, passt das nicht auf die kleine Servicetheke. Wir lagern es im Keller ein.
*   **Vorteil:** Fast unendlich viel Platz. Die Bücher können beliebig dick werden, Seiten hinzugefügt oder entfernt werden.
*   **Wie funktioniert das?** Das Buch liegt im Keller. Auf der Servicetheke (Stack) liegt nur ein kleiner Karteizettel mit der genauen Regalnummer (die **Adresse** oder der **Pointer**) und der Angabe, wie lang das Buch ist.
*   In Rust nutzt der Typ `String` diesen Speicherplatz. Wenn wir ein Buch an einen anderen Leser übergeben, geben wir nicht das ganze Buch im Keller weiter, sondern wir reichen den Besitzer-Karteizettel auf der Theke weiter.

---

## 🗺️ Der Bibliotheks-Plan auf einen Blick

Schau dir an, welche Aufgaben unsere grundlegenden Werkzeuge in der Bibliothek übernehmen:

```text
┌──────────────────────────────────────────────────────────┐
│                   DIE LEIHBIBLIOTHEK                     │
│    (Analogie für das Speichern und Verwalten von Daten)  │
└──────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
┌───────────────────┐               ┌───────────────────┐
│   OWNERSHIP       │               │   BORROWING       │
│   (Besitzer)      │               │   (Ausleihen)     │
└───────────────────┘               └───────────────────┘
            │                                   │
┌───────────┴───────────┐           ┌───────────┴───────────┐
│ Echter Besitzer       │           │                       │
│ (Besitzer-Karteizettel│           ▼                       ▼
│  liegt beim Leser)    │   ┌───────────────┐       ┌───────────────┐
│                       │   │ Read-Only (&) │       │ Mutable (&mut)│
│ Buch darf weggeworfen │   │  (Nur lesen)  │       │(Reinschreiben)│
│ oder verschenkt       │   │Beliebig viele │       │ Nur einer zur │
│ werden.               │   │ gleichzeitig. │       │     Zeit!     │
└───────────────────────┘   └───────────────┘       └───────────────┘
```

---

## 📦 Micro-Learning 1: Die Fächer & Stifte (Variablen & Datentypen)

### 🧸 Die Analogie: Beschriftete Fächer und die Tinte
Stell dir vor, du hast eine Reihe von Fächern an der Wand. Jedes Fach hat einen Namen (**Variablenname**) und darf nur eine bestimmte Art von Inhalt aufnehmen (**Datentyp**). 

*   **Tinte (Unveränderbar / Immutable):** Standardmäßig schreiben wir in Rust alles mit Tinte auf unsere Karteikarten. Einmal aufgeschrieben, kann der Wert nie wieder geändert werden.
*   **Bleistift (Veränderbar / Mutable):** Wenn wir ein Fach mit `mut` markieren, benutzen wir einen Bleistift. Wir dürfen den Wert ausradieren und etwas Neues hineinschreiben.

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Mit Tinte schreiben (unveränderbar):**
    ```rust
    // Dieses Buchjahr kann nicht mehr geändert werden
    let erscheinungsjahr: i32 = 2026;
    ```
*   **Mit Bleistift schreiben (veränderbar):**
    ```rust
    // Dank "mut" können wir die Seitenzahl anpassen
    let mut gelesene_seiten: u32 = 0;
    gelesene_seiten = 12; // Erlaubt!
    ```

> [!TIP]
> **Eselsbrücke:** Standardmäßig ist Rust sicher wie Tinte. Wenn du radieren willst, brauchst du das Radiergummi-Wort `mut`.
> **Merkzettel:** Rust möchte immer wissen, um welchen Typ es sich handelt (z. B. Ganzzahl `i32`, Text, Wahrheitswert `bool`). Oft errät der Compiler den Typ aber selbst!

---

## 🏷️ Micro-Learning 2: Der Einlasswächter (Kontrollfluss)

### 🧸 Die Analogie: Der Wächter an der Bibliothekstür
Ein Wächter steht am Eingang und kontrolliert die Besucher. Er stellt Fragen: "Haben Sie einen Bibliotheksausweis?" Wenn ja (`true`), darf der Besucher rein. Wenn nein (`false`), wird er abgewiesen.

In Rust übernimmt das `if` und `else` diese Aufgabe. Es leitet das Programm je nach Bedingung auf unterschiedliche Pfade. Mit Schleifen (`loop` oder `while`) können wir den Wächter anweisen, eine Aktion so lange zu wiederholen, wie eine Bedingung erfüllt ist (z. B. "Stempel so lange Bücher ab, bis der Stapel leer ist").

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Der Türsteher-Check (`if-else`):**
    ```rust
    let hat_ausweis = true;

    if hat_ausweis {
        println!("Willkommen in der Bibliothek!");
    } else {
        println!("Bitte melde dich zuerst an der Anmeldung an.");
    }
    ```
*   **Die Fleißarbeit (`while`-Schleife):**
    ```rust
    let mut verbleibende_buecher = 3;

    while verbleibende_buecher > 0 {
        println!("Buch abgestempelt!");
        verbleibende_buecher -= 1; // Ein Buch weniger auf dem Stapel
    }
    ```

> [!TIP]
> **Eselsbrücke:** `if` ist die Weiche auf den Schienen. Der Zug fährt nur in die Richtung, deren Bedingung wahr (`true`) ist.

---

## 🍯 Micro-Learning 3: Der Wunschzettel (Benutzereingabe)

### 🧸 Die Analogie: Der Zettel an der Theke
Wenn ein Besucher ein Buch sucht, schreibt er den Namen auf einen leeren Wunschzettel und reicht ihn über die Theke. Der Bibliothekar nimmt diesen Zettel und schreibt den Wunsch des Besuchers darauf auf. Da der Zettel beschrieben wird, muss er veränderbar sein (`&mut`).

Außerdem müssen wir den Text nach dem Schreiben oft "säubern": Wenn der Besucher auf die Eingabetaste drückt, entsteht ein unsichtbares Steuerzeichen (Zeilenumbruch `\n`). Das müssen wir abschneiden, bevor wir nach dem Buch suchen.

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Einen leeren Zettel vorbereiten:**
    ```rust
    let mut wunschzettel = String::new();
    ```
*   **Den Besucher schreiben lassen:**
    ```rust
    // Wir importieren die Ein-/Ausgabe-Bibliothek
    use std::io;

    // Der Wächter wartet auf die Tastatureingabe und schreibt sie auf den Zettel
    io::stdin()
        .read_line(&mut wunschzettel)
        .expect("Fehler beim Lesen der Eingabe");
    ```
*   **Unsichtbare Knicke glätten (Zeilenumbruch entfernen):**
    ```rust
    // .trim() entfernt Leerzeichen und Zeilenumbrüche am Anfang und Ende
    let gesuchtes_buch = wunschzettel.trim();
    ```

---

## 🪙 Micro-Learning 4: Besitzer & Ausleiher (Ownership & Borrowing)

### 🧸 Die Analogie: Das exklusive Buch
Ein Buch ist ein wertvolles Unikat. Es kann immer nur **einem einzigen** Leser zur gleichen Zeit gehören. Wenn du das Buch physisch an jemanden verschenkst, verlierst du deinen Besitzer-Karteizettel. Das Buch gehört jetzt dem anderen (das ist ein **Move** in Rust). Wenn du danach versuchst, das Buch zu lesen, merkt der Compiler, dass du es gar nicht mehr hast!

Damit das nicht ständig passiert, gibt es das **Ausleihen (Borrowing)**:
1.  **Die Lese-Ausleihe (`&`):** Du leihst dein Buch zum Lesen her. Beliebig viele Personen dürfen gleichzeitig einen Blick hineinwerfen, aber niemand darf darin herumschreiben.
2.  **Die Arbeitsbuch-Ausleihe (`&mut`):** Du leihst das Buch an **genau eine** Person aus, die Korrekturen hineinschreiben darf. Solange diese Person das Arbeitsbuch hat, darf niemand anderes darin lesen oder schreiben, damit kein Chaos entsteht.

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Besitzer wechseln (Move):**
    ```rust
    let buch_a = String::from("Rust Grundlagen");
    let buch_b = buch_a; // Das Buch wurde an B übergeben (Moved)
    // println!("{}", buch_a); // ❌ FEHLER! buch_a besitzt das Buch nicht mehr!
    ```
*   **Buch zum Lesen ausleihen (Immutable Borrow):**
    ```rust
    let mein_buch = String::from("Abenteuer Rust");
    let leser_1 = &mein_buch; // Ausgeliehen an Leser 1
    let leser_2 = &mein_buch; // Gleichzeitig ausgeliehen an Leser 2
    println!("Leser lesen: {} und {}", leser_1, leser_2); // Erlaubt!
    ```
*   **Buch zum Reinschreiben ausleihen (Mutable Borrow):**
    ```rust
    let mut tagebuch = String::from("Liebes Tagebuch, ");
    let schreiber = &mut tagebuch; // Nur einer darf reinschreiben
    schreiber.push_str("heute habe ich Rust gelernt!");
    // println!("{}", tagebuch); // ❌ Während "schreiber" aktiv ist, darf kein anderer zugreifen!
    ```

> [!IMPORTANT]
> **Die goldene Regel von Rust:** Du darfst beliebig viele Lese-Ausleihen (`&`) haben, ODER genau eine Schreib-Ausleihe (`&mut`) zur gleichen Zeit – aber niemals beides zusammen!

---

## 📖 Micro-Learning 5: Eigenes Buch vs. Blick ins Buch (String vs &str)

### 🧸 Die Analogie: Das Tagebuch vs. Das Zitat
*   **`String`:** Das ist dein eigenes, leeres Tagebuch im Keller (Heap). Du besitzt es komplett. Du kannst neue Seiten anheften, Text wegradieren und es beliebig vergrößern.
*   **`&str` (String-Slice / Referenz):** Das ist wie ein Lesezeichen oder ein Blick durch ein Fenster auf einen bestimmten Satz in einem Buch. Du besitzt den Text nicht. Du darfst ihn nicht verlängern oder verändern. Es ist nur eine geliehene Ansicht auf einen bestehenden Text (der im Heap oder sogar fest im Programmcode eingebrannt sein kann).

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Ein veränderbares, eigenes Buch anlegen (`String`):**
    ```rust
    let mut eigenes_buch = String::from("Hallo");
    eigenes_buch.push_str(" Welt"); // Kann wachsen
    ```
*   **Eine Ansicht ausleihen (`&str`):**
    ```rust
    let text: &str = "Fest im Programmcode eingebrannter Text";
    
    // Wir können auch einen Ausschnitt aus unserem String ausleihen:
    let ausschnitt: &str = &eigenes_buch[0..5]; // Leiht nur "Hallo"
    ```

---

## 🛠️ Mitmach-Workshop: Programmiere deine Bibliotheks-Verwaltung!

Jetzt bist du an der Reihe! Wir bauen eine kleine Konsolen-Bibliothek auf. 

> [!IMPORTANT]
> **Einschränkung:** Da wir uns in Phase 1 befinden, benutzen wir **keine** komplexen Listen (`Vec`) oder Register (`HashMap`). Wir arbeiten ausschließlich mit einzelnen Variablen, Ownership-Transfers, Ausleihen und Bedingungen!

### 📝 Dein Notizzettel (Das Ziel des Workshops)
Dein Programm soll:
1.  Ein wertvolles Buch (als `String`) erstellen.
2.  Das Buch an einen Ausleiher übergeben (Besitz wechseln).
3.  Eine Funktion bereitstellen, die das Buch zum Lesen ausleiht, ohne den Besitz zu verlieren.
4.  Eine Funktion bereitstellen, die Korrekturen am Buchtitel vornimmt (veränderbare Ausleihe).

---

### 🧱 Schritt-für-Schritt-Bauanleitung

#### 🏢 Schritt 1: Das Buch erschaffen
Erstelle in deiner `main`-Funktion ein Buch als `String`. Nenne es zum Beispiel `"Rust-Handbuch"`.

#### 📖 Schritt 2: Eine Lese-Funktion schreiben
Schreibe eine Funktion `buch_anzeigen`. Sie soll den Titel des Buches nur lesen. Da wir den Besitz des Buches nicht verlieren wollen, darf die Funktion das Buch nur als Referenz (`&str` oder `&String`) annehmen!

#### ✏️ Schritt 3: Eine Korrektur-Funktion schreiben
Schreibe eine Funktion `buch_umbenennen`. Sie soll den Titel des Buches ändern (z. B. ein Ausrufezeichen anhängen). Da sie das Buch verändern muss, muss sie eine veränderbare Referenz (`&mut String`) verlangen.

#### 🚚 Schritt 4: Die Buch-Übergabe simulieren (Ownership Move)
Schreibe eine Funktion `buch_schenken`. Sie soll das Buch komplett übernehmen (Ownership per Move) und den Namen des neuen Besitzers an den Titel anhängen (z. B. `"Rust-Handbuch (Geschenk an Anna)"`). Sie gibt den neu entstandenen `String` als Rückgabewert zurück. Danach ist das ursprüngliche Buch in `main` nicht mehr verwendbar!

### 💻 Das Code-Skelett (Bitte ausfüllen!)

Kopiere diesen Code in deine Entwicklungsumgebung und ersetze die `todo!()`-Platzhalter durch deine eigene Logik.

```rust
// Schritt 2: Diese Funktion darf das Buch nur LESEN.
// Welchen Typ muss "titel" haben?
fn buch_anzeigen(titel: todo!()) {
    println!("📖 Wir lesen im Buch: {}", titel);
}

// Schritt 3: Diese Funktion muss das Buch VERÄNDERN.
// Welchen Typ muss "titel" haben?
fn buch_umbenennen(titel: todo!()) {
    // TODO: Hänge den Text " - Überarbeitete Version" an den Titel an
    todo!()
}

// Schritt 4: Diese Funktion übernimmt den BESITZ und gibt einen neuen String zurück.
fn buch_schenken(titel: todo!(), neuer_besitzer: &str) -> String {
    // TODO: Erstelle einen neuen String, der den Titel und den Text " (Besitzer: [Name])" enthält.
    // Tipp: Du kannst das Buch formatieren oder push_str nutzen.
    todo!()
}

fn main() {
    // 1. Erstelle das Buch mit Tinte/Bleistift (Überlege, ob es mutierbar sein muss!)
    let mut mein_buch = String::from("Rust für Anfänger");

    // 2. Zeige das Buch an (Lese-Ausleihe)
    // Wie leihst du "mein_buch" lesend aus?
    buch_anzeigen(todo!());

    // 3. Ändere das Buch (Schreib-Ausleihe)
    // Wie leihst du "mein_buch" schreibend aus?
    buch_umbenennen(todo!());
    
    // Zeige das geänderte Buch an
    buch_anzeigen(todo!());

    // 4. Schenke das Buch her (Ownership Move!)
    // Das Buch wechselt den Besitzer komplett.
    let geschenktes_buch = buch_schenken(todo!(), "Anna");
    
    println!("Anna freut sich über ihr neues Buch: {}", geschenktes_buch);

    // ❌ HINWEIS ZUM TESTEN:
    // Wenn du versuchst, hiernach `buch_anzeigen(&mein_buch)` aufzurufen,
    // sollte dir der Rust-Compiler einen Fehler anzeigen, weil das Buch "moved" wurde!
}
```

---

## 📝 Reichlich Übungen zum Vertiefen

Bringe diese Übungen zum Laufen, indem du den unvollständigen Code vervollständigst. Keine Sorge, die Tests in `main` helfen dir zu prüfen, ob deine Lösung stimmt!

### 🟢 Übung 1 (Leicht): Die Tinten-Korrektur (`mut` und Variablen)
**Ziel:** Verstehe den Unterschied zwischen `let` und `let mut` sowie grundlegende String-Zuweisung.
**Szenario:** Ein Buch bekommt ein neues Kapitel. Ändere die Seitenzahl des Buches und hänge ein Symbol an den Titel an.

```rust
fn buch_aktualisieren(mut titel: String, mut seiten: u32) -> (String, u32) {
    // TODO: Hänge an das Ende des Titels das Symbol " [Neu]" an.
    // TODO: Addiere 50 Seiten zur aktuellen Seitenzahl hinzu.
    
    todo!()
}

fn main() {
    let alter_titel = String::from("Rust Kochbuch");
    let alte_seiten = 120;
    
    let (neuer_titel, neue_seiten) = buch_aktualisieren(alter_titel, alte_seiten);
    
    assert_eq!(neuer_titel, "Rust Kochbuch [Neu]");
    assert_eq!(neue_seiten, 170);
    
    println!("🎉 Übung 1 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 2 (Mittel): Der Einlasswächter und das Mindestalter (Kontrollfluss & Parsing)
**Ziel:** Nutze `if-else` und konvertiere einen Text-String in eine Zahl, um Bedingungen zu prüfen.
**Szenario:** In der Bibliothek gibt es einen gesperrten Bereich für seltene, historische Bücher. Der Einlasswächter prüft das Alter.

```rust
fn darf_historischen_bereich_betreten(alter_eingabe: &str) -> bool {
    // 1. Entferne eventuelle Leerzeichen am Rand mit .trim()
    // 2. Wandle den String mit .parse::<u32>() in eine Zahl um.
    //    Tipp: parse() gibt ein Result zurück. Nutze .ok() oder ein match, um das Alter zu erhalten.
    // 3. Wenn die Umwandlung fehlschlägt, gib false zurück.
    // 4. Wenn die Person 18 Jahre oder älter ist, gib true zurück, sonst false.
    
    todo!()
}

fn main() {
    // Test 1: Gültiges Alter, alt genug
    assert!(darf_historischen_bereich_betreten("25"));
    
    // Test 2: Gültiges Alter, zu jung
    assert!(!darf_historischen_bereich_betreten("17"));
    
    // Test 3: Unsaubere Eingabe mit Leerzeichen
    assert!(darf_historischen_bereich_betreten(" 18\n"));
    
    // Test 4: Ungültige Eingabe
    assert!(!darf_historischen_bereich_betreten("keine_zahl"));
    
    println!("🎉 Übung 2 erfolgreich gelöst!");
}
```

---

### 🟡 Übung 3 (Mittel): Die Leser-Kette (Ownership & Moving)
**Ziel:** Verfolge, wie Ownership von einer Funktion zur nächsten wandert.
**Szenario:** Ein Buch wird von Person zu Person weitergereicht. Jede Person trägt ihre Signatur in das Buch ein, muss aber danach das Buch abgeben.

```rust
fn leser_anna_liest(buch: String) -> String {
    // TODO: Hänge den Text " -> Gelesen von Anna" an den Buchtext an.
    // Gib das modifizierte Buch zurück.
    todo!()
}

fn leser_ben_liest(buch: String) -> String {
    // TODO: Hänge den Text " -> Gelesen von Ben" an den Buchtext an.
    // Gib das modifizierte Buch zurück.
    todo!()
}

fn main() {
    let start_buch = String::from("Das Geheimnis von Rust");
    
    // Reiche das Buch durch die Kette
    let buch_nach_anna = leser_anna_liest(start_buch);
    
    // println!("{}", start_buch); // ❌ Wenn du das einkommentierst, darf es nicht kompilieren!
    
    let end_buch = leser_ben_liest(buch_nach_anna);
    
    assert_eq!(end_buch, "Das Geheimnis von Rust -> Gelesen von Anna -> Gelesen von Ben");
    
    println!("🎉 Übung 3 erfolgreich gelöst!");
}
```

---

### 🔴 Übung 4 (Schwer): Das erste Wort finden (Borrowing & Slices)
**Ziel:** Lerne, mit String-Slices (`&str`) zu arbeiten, ohne neue Strings im Speicher anzulegen.
**Szenario:** Der Bibliothekar braucht für ein Suchregister das allererste Wort eines Buchtitels.

```rust
fn erstes_wort(titel: &str) -> &str {
    // 1. Wandle den Titel in Bytes um, um über die einzelnen Zeichen iterieren zu können:
    //    let bytes = titel.as_bytes();
    // 2. Iteriere über die Bytes und suche nach dem Leerzeichen-Byte: b' '
    //    Tipp: Nutze .iter().enumerate(), um Index und Byte-Referenz zu bekommen.
    // 3. Sobald du das Byte b' ' findest, gib den Slice von Anfang bis zu diesem Index zurück: &titel[0..index]
    // 4. Findest du kein Leerzeichen, gib den gesamten Titel zurück.
    
    todo!()
}

fn main() {
    let titel_1 = String::from("Rust Programmierung");
    let titel_2 = "Einführung_in_Rust"; // Kein Leerzeichen
    let titel_3 = " Buch "; // Leerzeichen am Anfang
    
    assert_eq!(erstes_wort(&titel_1), "Rust");
    assert_eq!(erstes_wort(titel_2), "Einführung_in_Rust");
    
    // Zusatz-Herausforderung: Trimmen vor der Suche hilft bei Leerzeichen am Anfang
    let getrimmt = titel_3.trim();
    assert_eq!(erstes_wort(getrimmt), "Buch");
    
    println!("🎉 Übung 4 erfolgreich gelöst!");
}
```

---

## 📇 Merkzettel für den Kühlschrank (Zusammenfassung)

| Werkzeug | Wann benutzen? | Bibliotheks-Analogie | Syntax-Beispiel |
| :--- | :--- | :--- | :--- |
| **`let`** | Für Daten, die sich nie ändern sollen. | Mit Tinte geschriebener Eintrag | `let regale = 10;` |
| **`let mut`** | Für Daten, die aktualisiert werden müssen. | Mit Bleistift geschriebener Eintrag | `let mut ausleihen = 0;` |
| **`if / else`** | Zur Entscheidung, welcher Pfad genommen wird. | Der Einlasswächter an der Tür | `if alter >= 18 { ... }` |
| **`String`** | Für veränderbaren, eigenen Text im Heap. | Ein eigens, dickes Tagebuch | `let s = String::from("Buch");` |
| **`&str`** | Für unveränderbare Text-Ansichten / Slices. | Der kurze Blick auf eine Buchseite | `let slice = &s[0..2];` |
| **Ownership** | Standard in Rust: Jedes Ding hat genau einen Besitzer. | Nur ein Leser besitzt den Karteizettel | `let b2 = b1; // b1 ist ungültig` |
| **Borrowing (`&`)** | Um Daten sicher auszuleihen, ohne sie abzugeben. | Buch zum Lesen ausleihen (mehrere) | `let leser = &mein_buch;` |
| **Borrowing (`&mut`)** | Um Daten auszuleihen und direkt zu bearbeiten. | Arbeitsbuch zum Reinschreiben (nur einer) | `let schreiber = &mut mein_buch;` |

---

## 🎓 Mini-Quiz (Micro-Learning)
*Versuche, diese Fragen im Kopf zu beantworten:*
1.  Was passiert mit dem Speicher im Keller (Heap), wenn der Besitzer eines `String` die Bibliothek verlässt (die Variable ungültig wird)?
2.  Warum darfst du nicht gleichzeitig eine veränderbare Ausleihe (`&mut`) und eine normale Lese-Ausleihe (`&`) auf dasselbe Buch haben?
3.  Was ist der Unterschied zwischen einem `String` und einem `&str` bezüglich des Speicherorts?
4.  Warum lässt sich der Code `let buch = String::from("Rust"); let kopie = buch; println!("{}", buch);` nicht kompilieren?

*Viel Erfolg beim Programmieren deiner Bibliotheks-Verwaltung und beim Meistern der Übungen! Wenn du eine Frage hast oder feststeckst, frage deinen KI-Lernpartner nach einem didaktischen Tipp – aber lass dir keine fertigen Code-Lösungen geben!*
