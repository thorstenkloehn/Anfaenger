# 📦 Mitmach-Workshop: Phase 6 bildhaft verstehen

In diesem Workshop werden wir uns die Konzepte von Smart Pointers (`Box`, `Rc`, `RefCell`) anhand einer spielerischen Alltagsanalogie erarbeiten.

## 🏠 Die WG-Analogie: Das geteilte Wohnzimmer

Stell dir vor, du lebst in einer Wohngemeinschaft (WG). Das Wohnzimmer dieser WG ist unser Arbeitsspeicher (RAM).

### 1. `Box<T>`: Das persönliche Schließfach im Keller
Manche Dinge im Wohnzimmer sind einfach zu sperrig oder du möchtest sie sicher verstauen, ohne dass sie den Weg blockieren. Dafür mietest du dir ein **Schließfach im Keller** (den Heap).
* Im Wohnzimmer (auf dem Stack) hast du nur einen kleinen, leichten **Schlüssel** (den Pointer), auf dem die Nummer des Schließfachs steht.
* Das Schließfach gehört **nur dir allein** (exklusiver Besitz / Single Ownership).
* Wenn du ausziehst (der Scope endet), gibst du den Schlüssel ab und das Schließfach im Keller wird automatisch geleert und freigegeben.

### 2. `Rc<T>`: Der WG-Fernseher
Der große Fernseher im Wohnzimmer gehört nicht einer Person allein. Die WG-Mitglieder teilen sich die Anschaffung und die Nutzung (**Shared Ownership**).
* Damit der Fernseher nicht weggeworfen wird, während noch jemand fernsieht, gibt es eine Strichliste an der Wand (den **Reference Counter**).
* Jedes Mal, wenn ein neuer Bewohner ins Wohnzimmer kommt und mitschaut, macht er einen Strich dazu (`clone()`).
* Geht jemand ins Bett, wischt er seinen Strich weg.
* Erst wenn der Zähler auf `0` fällt (alle sind im Bett oder ausgezogen), wird der Fernseher ausgeschaltet und abgebaut (`drop()`).
* **Die Einschränkung:** Weil sich alle denselben Fernseher teilen, darf niemand einfach den Rahmen rot anpinseln oder die Tastenbelegung ändern. Der Fernseher ist für alle **schreibgeschützt (immutable)**.

### 3. `RefCell<T>`: Das abschließbare DVD-Player-Fach
Was ist aber, wenn wir ein geteiltes Gerät haben, das wir *doch* verändern müssen (z. B. eine DVD einlegen oder die Lautstärke anpassen)? Hier kommt die `RefCell` ins Spiel. Der DVD-Player steht in einem abschließbaren Fach im Schrank.
* Der Schrank hat eine strenge Regel, die durch den WG-Vorstand überwacht wird (Borrow-Checker zur Laufzeit):
  * Entwörfen dürfen sich **mehrere Personen** gleichzeitig den Schlüssel holen, um den Player anzuschauen (unveränderliche Referenz / `.borrow()`).
  * Oder **genau eine Person** bekommt den Schlüssel, um eine neue DVD einzulegen (veränderliche Referenz / `.borrow_mut()`).
  * Wer versucht, eine DVD einzulegen, während andere gerade einen Film schauen, fliegt hochkant aus der WG (**Laufzeit-Absturz / Panic!**).

### 4. Die Super-Kombi: `Rc<RefCell<T>>`
Wenn wir den DVD-Player mit der WG teilen *und* DVDs wechseln wollen, kombinieren wir beide: `Rc<RefCell<DVDPlayer>>`.
* Jeder Bewohner hat eine Kopie des Schrankschlüssels (`Rc`), aber um das Gerät tatsächlich zu bedienen, muss er die Tür zur Laufzeit aufschließen (`RefCell`).

---

## 📝 Micro-Learnings (Spickzettel)

### 📌 `Box<T>`
* **Zweck:** Legt Daten auf dem Heap ab und behält einen Pointer auf dem Stack.
* **Besitz:** Exklusiv (Single Ownership).
* **Haupt-Anwendungsfall:**
  * Rekursive Datenstrukturen (deren Größe zur Compilezeit nicht bekannt ist).
  * Vermeidung von unnötig großen Kopiervorgängen auf dem Stack.
* **Mutierbarkeit:** Folgt den normalen Rust-Regeln (`let mut b = Box::new(...)`).

### 📌 `Rc<T>` / `Arc<T>`
* **Zweck:** Erlaubt mehrere Besitzer (Shared Ownership) auf demselben Thread (`Rc`) oder threadübergreifend (`Arc`).
* **Besitz:** Geteilt. Der Speicher wird erst freigegeben, wenn der Zähler `0` erreicht.
* **Einschränkung:** Daten sind standardmäßig **nicht veränderlich**.
* **Erstellung/Klonen:** Mit `Rc::clone(&x)` (erhöht nur den Zähler, kopiert nicht die Daten).

### 📌 `RefCell<T>`
* **Zweck:** Ermöglicht "Innere Veränderlichkeit" (Interior Mutability).
* **Besitz:** Normaler Einzelbesitz, aber die Ausleihregeln werden zur **Laufzeit** statt zur Compilezeit geprüft.
* **Gefahr:** Verstöße führen zu einem Programmabsturz (`panic!`) zur Laufzeit statt zu einem Compilerfehler.
* **Methoden:** `.borrow()` für unveränderlichen Zugriff, `.borrow_mut()` für veränderlichen Zugriff.

---

## 🛠️ Programmier-Workshop: Das WG-Möbel-System

In diesem Workshop baust du ein einfaches System, um Möbel in einer WG zu verwalten. Das Sofa soll von mehreren WG-Mitgliedern geteilt (`Rc`) und im Zustand verändert (`RefCell`) werden können.

### Deine Aufgabe
Ergänze die fehlenden Zugriffe und Smart-Pointer-Operationen im folgenden Code-Skelett. Ersetze alle `todo!()` durch den passenden Code.

```rust
use std::rc::Rc;
use std::cell::RefCell;

// Das Möbelstück, das wir verändern wollen
struct Moebel {
    name: String,
    zustand: String, // z. B. "Sauber", "Dreckig", "Vollgekrümelt"
}

// Ein Bewohner, der Zugriff auf geteilte Möbel hat
struct WGBewohner {
    name: String,
    // Geteilte Möbelstücke: Mehrere Besitzer, zur Laufzeit veränderlich
    geteilte_moebel: Vec<Rc<RefCell<Moebel>>>, 
}

impl WGBewohner {
    // Fügt ein bereits existierendes, geteiltes Möbelstück hinzu
    fn neues_moebel_hinzufuegen(&mut self, moebel: Rc<RefCell<Moebel>>) {
        // Tipp: Wir wollen den Besitz teilen. Was müssen wir mit dem Smart Pointer tun?
        self.geteilte_moebel.push(todo!());
    }

    // Ändert den Zustand eines Möbels am gegebenen Index
    fn moebel_nutzen(&self, index: usize, neuer_zustand: &str) {
        if let Some(moebel_cell) = self.geteilte_moebel.get(index) {
            // TODO: Leihe das Möbelstück VERÄNDERLICH zur Laufzeit aus 
            // und setze seinen Zustand auf `neuer_zustand`.
            todo!()
        }
    }

    // Gibt den aktuellen Zustand des Möbels aus
    fn moebel_zustand_anzeigen(&self, index: usize) {
        if let Some(moebel_cell) = self.geteilte_moebel.get(index) {
            // TODO: Leihe das Möbelstück UNVERÄNDERLICH zur Laufzeit aus
            let moebel = todo!();
            println!("{} sieht: Das {} ist {}", self.name, moebel.name, moebel.zustand);
        }
    }
}

fn main() {
    // 1. Erstelle ein neues Sofa auf dem Heap, das geteilt und verändert werden kann.
    // Name: "Sofa", Zustand: "Neu"
    let sofa = todo!();

    // 2. Erstelle zwei Bewohner
    let mut alina = WGBewohner {
        name: "Alina".to_string(),
        geteilte_moebel: vec![],
    };
    let mut ben = WGBewohner {
        name: "Ben".to_string(),
        geteilte_moebel: vec![],
    };

    // 3. Teile das Sofa mit Alina und Ben
    alina.neues_moebel_hinzufuegen(todo!());
    ben.neues_moebel_hinzufuegen(todo!());

    // 4. Alina schaut sich das Sofa an
    alina.moebel_zustand_anzeigen(0);

    // 5. Ben isst Chips auf dem Sofa und macht es vollgekrümelt
    ben.moebel_nutzen(0, "Vollgekrümelt");

    // 6. Alina schaut sich das Sofa erneut an.
    // Da sie sich dasselbe Sofa teilen, sieht sie sofort die Änderung!
    alina.moebel_zustand_anzeigen(0);
}
```

---

## 🏋️ Übungen zum Vertiefen

> [!IMPORTANT]
> **Wichtig:** Löse diese Aufgaben, indem du die `todo!()` Platzhalter im Code-Skelett ersetzt. Schreibe keine fertige Lösung vorweg, sondern versuche, die Assertions zum Bestehen zu bringen!

### Übung 1: Die unendlich lange WG-Einkaufsliste (Leicht)
**Lernziel:** Verwendung von `Box` für rekursive Datenstrukturen.

Wenn ein Struct sich selbst als Feld enthalten soll, weiß Rust nicht, wie viel Speicher es reservieren soll. Mit `Box` verweisen wir stattdessen auf eine feste Pointer-Größe.
Vervollständige die Definition einer einfachen verketteten Liste für Einkäufe.

```rust
// Ein Element unserer Einkaufsliste
enum Einkaufsliste {
    Eintrag(String, Box<Einkaufsliste>), // Ein Eintrag und der Link zum nächsten Element
    Ende,
}

fn main() {
    // Baue eine Liste: "Milch" -> "Brot" -> Ende
    let liste = Einkaufsliste::Eintrag(
        "Milch".to_string(),
        todo!()
    );

    // Teste deine Implementierung
    if let Einkaufsliste::Eintrag(produkt, naechster) = liste {
        assert_eq!(produkt, "Milch");
        if let Einkaufsliste::Eintrag(produkt2, _) = *naechster {
            assert_eq!(produkt2, "Brot");
        } else {
            panic!("Zweites Element fehlt!");
        }
    }
}
```

---

### Übung 2: Die WG-Haustürschlüssel mit `Rc` (Leicht/Mittel)
**Lernziel:** Shared Ownership mit `Rc` verwalten und den Referenzzähler prüfen.

Jeder Bewohner hat einen Schlüssel zur WG-Tür. Wir wollen zählen, wie viele Schlüssel im Umlauf sind. Sobald kein Schlüssel mehr existiert, wird die Tür abgeschlossen.

```rust
use std::rc::Rc;

struct WGSchluessel {
    id: u32,
}

fn main() {
    // 1. Erstelle den Master-Schlüssel als Rc
    let master_schluessel = Rc::new(WGSchluessel { id: 42 });
    assert_eq!(Rc::strong_count(&master_schluessel), 1);

    // 2. Erstelle eine Kopie für Bewohner 1
    let schluessel_bewohner1 = todo!();
    assert_eq!(Rc::strong_count(&master_schluessel), 2);

    {
        // 3. Ein Gast bekommt temporär einen Schlüssel
        let schluessel_gast = todo!();
        assert_eq!(Rc::strong_count(&master_schluessel), 3);
        // Gast geht wieder (Scope endet)
    }

    assert_eq!(Rc::strong_count(&master_schluessel), 2);
}
```

---

### Übung 3: Der WG-Kühlschrank mit `RefCell` (Mittel)
**Lernziel:** Verwende `RefCell`, um Daten hinter einer unveränderlichen Referenz zu manipulieren.

Der Kühlschrank ist ein Gemeinschaftsobjekt. Wir haben nur eine unveränderliche Referenz `&Kuehlschrank` darauf, wollen aber trotzdem Lebensmittel hineinlegen und herausnehmen.

```rust
use std::cell::RefCell;

struct Kuehlschrank {
    // Die Liste der Lebensmittel muss trotz &self veränderbar sein!
    inhalt: RefCell<Vec<String>>,
}

impl Kuehlschrank {
    fn neues_essen_hinzufuegen(&self, essen: &str) {
        // TODO: Hole dir den veränderlichen Zugriff auf den Inhalt 
        // und füge das Essen hinzu.
        todo!()
    }

    fn hat_essen(&self, essen: &str) -> bool {
        // TODO: Hole dir den unveränderlichen Zugriff auf den Inhalt
        // und prüfe, ob das Essen vorhanden ist.
        todo!()
    }
}

fn main() {
    let kuehlschrank = Kuehlschrank {
        inhalt: RefCell::new(vec![]),
    };

    // Beachte: kuehlschrank ist NICHT als `mut` deklariert!
    kuehlschrank.neues_essen_hinzufuegen("Käse");
    kuehlschrank.neues_essen_hinzufuegen("Apfel");

    assert!(kuehlschrank.hat_essen("Käse"));
    assert!(kuehlschrank.hat_essen("Apfel"));
    assert!(!kuehlschrank.hat_essen("Pizza"));
}
```

---

### Übung 4: Das WG-Schuldenbuch (Schwer)
**Lernziel:** Kombination von `Rc` und `RefCell` für geteilte, veränderbare Zustände.

Mehrere WG-Bewohner wollen in ein gemeinsames Schuldenbuch eintragen, wie viel Geld für die WG ausgegeben wurde. Jede Ausgabe aktualisiert das Schuldenbuch.

```rust
use std::rc::Rc;
use std::cell::RefCell;

struct Schuldenbuch {
    gesamtausgaben: f64,
}

struct Bewohner {
    name: String,
    // Geteiltes Schuldenbuch
    buch: Rc<RefCell<Schuldenbuch>>,
}

impl Bewohner {
    fn ausgabe_taetigen(&self, betrag: f64) {
        // TODO: Leihe das Schuldenbuch veränderlich aus und addiere den Betrag
        todo!()
    }
}

fn main() {
    // 1. Erstelle das geteilte Schuldenbuch mit Startwert 0.0
    let gemeinsames_buch = todo!();

    // 2. Erstelle zwei Bewohner, die das Buch teilen
    let lisa = Bewohner {
        name: "Lisa".to_string(),
        buch: todo!(),
    };
    let timo = Bewohner {
        name: "Timo".to_string(),
        buch: todo!(),
    };

    // 3. Beide machen Ausgaben
    lisa.ausgabe_taetigen(15.50);
    timo.ausgabe_taetigen(24.50);

    // 4. Überprüfe die Gesamtausgaben im Buch
    let ausgaben = todo!(); // Hole den aktuellen Wert aus dem Buch
    assert_eq!(ausgaben, 40.0);
}
```

---

## ❓ Quiz: Bist du bereit für Phase 6?

Teste dein Wissen! Die Antworten findest du, wenn du den Text aufmerksam gelesen hast.

1. **Was passiert, wenn du versuchst, einen Wert in einem `Rc<T>` ohne `RefCell` direkt zu verändern?**
   * [ ] A) Es kompiliert problemlos, führt aber zur Laufzeit zu Daten-Races.
   * [ ] B) Das Programm stürzt mit einer `Panic` ab.
   * [ ] C) Der Compiler bricht mit einer Fehlermeldung ab, da Werte in `Rc` schreibgeschützt sind.

2. **Wann stürzt ein Programm mit einer `RefCell` ab?**
   * [ ] A) Wenn zwei Threads gleichzeitig darauf zugreifen wollen.
   * [ ] B) Wenn zur Laufzeit gleichzeitig eine veränderliche und eine andere (veränderliche oder unveränderliche) Referenz angefordert werden.
   * [ ] C) Sobald mehr als 5 Referenzen darauf zeigen.

3. **Welches Problem löst `Box<T>` bei rekursiven Strukturen?**
   * [ ] A) Es sorgt dafür, dass die Daten automatisch im Cache des CPUs landen.
   * [ ] B) Es verschiebt die Daten auf den Heap, sodass das Struct selbst nur noch die feste Größe eines Pointers hat.
   * [ ] C) Es erlaubt uns, die Daten ohne `clone()` an andere Funktionen zu übergeben.

4. **Wozu dient `Arc<T>` im Vergleich zu `Rc<T>`?**
   * [ ] A) `Arc` ist die threadsichere (atomare) Variante von `Rc` für Multi-Threaded-Programme.
   * [ ] B) `Arc` verbraucht weniger Speicher als `Rc`.
   * [ ] C) `Arc` erlaubt das direkte Verändern von Werten ohne `RefCell`.

5. **Welche Kombination wählst du, wenn Daten mehrere Besitzer haben und zur Laufzeit veränderbar sein müssen?**
   * [ ] A) `Box<Rc<T>>`
   * [ ] B) `Rc<RefCell<T>>`
   * [ ] C) `RefCell<Box<T>>`

---
*Glückwunsch! Wenn du alle Übungen gelöst und das Quiz gemeistert hast, bist du bereit, komplexe Datenstrukturen in Rust sicher zu navigieren!*
