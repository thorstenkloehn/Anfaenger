# Phase 2: Projektvorschläge für Einsteiger

In dieser Phase vertiefen wir die Grundlagen und führen **eigene Datentypen** ein. Du wirst in jedem Projekt das Gelernte aus Phase 1 wiederholen und zusätzlich `Structs`, Methoden und `Enums` anwenden.

### Was wir wiederholen:
| Thema | Was du lernst |
|---|---|
| 🧱 Variablen & Datentypen | Zahlen, Texte, Mutabilität |
| 🔀 Kontrollfluss | `if/else`, `loop`, `while`, `for` |
| ⌨️ Benutzereingabe | Lesen von der Konsole, Konvertierung |
| 🧠 Ownership & Borrowing | Wer besitzt was? Referenzen nutzen |
| 📝 String vs. &str | Texte speichern, vergleichen, ausgeben |

### Neue Themen (in JEDEM Projekt angewendet):
* **Structs & Methoden (Die Basis):** Eigene Datentypen definieren und mit `impl` Methoden (Funktionen, die zu dem Struct gehören) hinzufügen.
* **Enums (Die Basis):** Eigene Aufzählungen erstellen, um feste Zustände oder Kategorien abzubilden.
* **Pattern Matching:** Der `match`-Ausdruck (mit Exhaustiveness Checking – der Compiler zwingt dich, jeden Fall abzudecken) und das kompakte `if let`.

> **Hinweis:** Alle Projekte werden ohne fertige Code-Vorschläge begleitet. Erarbeite die Lösung eigenständig!

---

## 📞 Projekt 1: Kontaktverwaltung

**Beschreibung:**
Der Nutzer kann neue Kontakte anlegen und alle Kontakte anzeigen. Jeder Kontakt hat einen Namen, ein Alter und eine Kategorie.
- Nutze ein **Struct** `Kontakt` für die Daten.
- Nutze ein **Enum** `Kategorie` (z.B. `Freund`, `Arbeit`, `Familie`).
- Schreibe eine **Methode** `anzeigen(&self)` für das Struct, die den Kontakt formatiert mit `match` für die Kategorie ausgibt.

---

## 📝 Projekt 2: To-Do-Liste

**Beschreibung:**
Ein Programm, um Aufgaben hinzuzufügen und ihren Status zu ändern.
- Nutze ein **Struct** `Aufgabe` mit Beschreibung und Status.
- Nutze ein **Enum** `Status` (z.B. `Offen`, `InArbeit`, `Erledigt`).
- Schreibe eine **Methode** im `impl`-Block, um den Status einer Aufgabe zu aktualisieren. Gib mit `match` je nach Status eine passende Meldung aus.

---

## 🍕 Projekt 3: Pizza-Bestellsystem

**Beschreibung:**
Der Nutzer kann eine Pizza bestellen und die Größe auswählen. Das Programm berechnet den Preis.
- Nutze ein **Struct** `Bestellung`.
- Nutze ein **Enum** `Groesse` (`Klein`, `Mittel`, `Gross`).
- Implementiere eine **Methode** `preis_berechnen(&self)`, die mit einem `match`-Ausdruck über die Größe den richtigen Preis zurückgibt.

---

## 🚗 Projekt 4: Fahrzeug-Inventar

**Beschreibung:**
Der Nutzer gibt Fahrzeuge in ein System ein. Jedes Fahrzeug hat einen Hersteller und einen Typ.
- Nutze ein **Struct** `Fahrzeug`.
- Nutze ein **Enum** `FahrzeugTyp` (`Auto`, `Motorrad`, `LKW`).
- Schreibe eine **Methode**, die mit `if let` (oder `match`) prüft, ob es sich um ein `Auto` handelt und dann eine spezielle Nachricht ausgibt.

---

## 📐 Projekt 5: Geometrie-Rechner (Revival)

**Beschreibung:**
Ein Rechner für Flächeninhalte.
- Nutze ein **Enum** `Form`, das die nötigen Maße direkt enthält (z.B. `Kreis(f64)`, `Rechteck(f64, f64)`).
- Nutze ein **Struct** `Rechner`, das die letzte Berechnung speichert.
- Schreibe eine **Methode** `flaeche_berechnen`, die ein `Form`-Enum annimmt und per `match`-Ausdruck die Exhaustiveness Checking nutzt, um die Fläche zu berechnen.

---

## 🌡️ Projekt 6: Wetterstation

**Beschreibung:**
Ein Programm, das Wetterberichte für Tage speichert.
- Nutze ein **Struct** `Wetterbericht` mit Temperatur und Wetterlage.
- Nutze ein **Enum** `Wetterlage` (`Sonnig`, `Regnerisch`, `Bewoelkt`).
- Implementiere eine **Methode**, die warnt, wenn es regnet, und empfiehlt, Sonnencreme bei Sonne zu nutzen (mit `match`).

---

## 🐶 Projekt 7: Haustier-Simulator

**Beschreibung:**
Du kümmerst dich um ein virtuelles Haustier.
- Nutze ein **Struct** `Haustier` mit Name, Hunger-Level und Stimmung.
- Nutze ein **Enum** `Stimmung` (`Gluecklich`, `Hungrig`, `Muede`).
- Schreibe **Methoden** wie `fuettern(&mut self)` oder `spielen(&mut self)`, die die Stimmung per `match` anpassen.

---

## 📚 Projekt 8: Mini-Bibliothek

**Beschreibung:**
Bücher ausleihen und zurückgeben.
- Nutze ein **Struct** `Buch` mit Titel und Verfügbarkeit.
- Nutze ein **Enum** `Zustand` (`Verfuegbar`, `Ausgeliehen`).
- Implementiere eine **Methode** zum Ausleihen, die den Zustand mit `match` oder `if let` prüft und entsprechend ändert.

---

## ⚔️ Projekt 9: Rollenspiel-Charakter

**Beschreibung:**
Erstelle einen Charakter für ein Spiel.
- Nutze ein **Struct** `Charakter` mit Name, Lebenspunkten und Klasse.
- Nutze ein **Enum** `Klasse` (`Magier`, `Krieger`, `Schurke`).
- Schreibe eine **Methode** `angreifen(&self)`, die mit `match` je nach Klasse eine andere Angriffs-Nachricht ausgibt.

---

## 🏦 Projekt 10: Erweitertes Bankkonto

**Beschreibung:**
Ein Konto, das Transaktionen (Einzahlungen/Auszahlungen) verarbeitet.
- Nutze ein **Struct** `Konto` mit dem aktuellen Saldo.
- Nutze ein **Enum** `Transaktion` (`Einzahlung(f64)`, `Auszahlung(f64)`).
- Schreibe eine **Methode** `verarbeite(&mut self, t: Transaktion)`, die das `Enum` mit `match` auswertet und den Saldo entsprechend aktualisiert.

---

## 🛠️ Didaktische Übungen (mit Code-Gerüsten)

### 🟢 Übung 1 (Leicht): Structs & Methoden
Schreibe ein Struct `Rechteck` mit den Feldern `breite` und `hoehe` (jeweils `u32`) sowie eine Methode `flaeche(&self) -> u32`.

```rust
struct Rechteck {
    breite: u32,
    hoehe: u32,
}

impl Rechteck {
    fn new(breite: u32, hoehe: u32) -> Self {
        // todo: Erstelle und liefere eine Rechteck-Instanz zurück
        todo!()
    }

    fn flaeche(&self) -> u32 {
        // todo: Berechne die Fläche (Breite * Höhe)
        todo!()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_rechteck_flaeche() {
        let r = Rechteck::new(5, 10);
        assert_eq!(r.flaeche(), 50);
    }
}
```

---

### 🟡 Übung 2 (Mittel): Enums mit Daten & Pattern Matching
Definiere ein Enum `Signal` mit den Varianten `Rot`, `Gelb` und `Gruen(u32)` (wobei die Zahl für die verbleibende Restzeit in Sekunden steht). Implementiere eine Methode `ist_fahrt_erlaubt(&self) -> bool`, die nur bei `Gruen` (egal wie viele Sekunden) `true` zurückgibt.

```rust
enum Signal {
    Rot,
    Gelb,
    Gruen(u32),
}

impl Signal {
    fn ist_fahrt_erlaubt(&self) -> bool {
        // todo: Nutze match oder if let, um zu prüfen, ob es sich um Gruen handelt!
        todo!()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_signal_fahrt() {
        let rot = Signal::Rot;
        let gruen = Signal::Gruen(30);
        
        assert_eq!(rot.ist_fahrt_erlaubt(), false);
        assert_eq!(gruen.ist_fahrt_erlaubt(), true);
    }
}
```

---

### 🔴 Übung 3 (Schwer): Zustandsübergänge mit `&mut self` und Enum
Schreibe eine Datenstruktur `Paket` mit einem Absender (`String`) und einem `Status`. Das Enum `Status` kann `Unterwegs` oder `Zugestellt(String)` (mit dem Namen des Empfängers) sein. Implementiere die Methode `zustellen(&mut self, empfaenger: &str)`.

```rust
#[derive(Debug, PartialEq)]
enum Status {
    Unterwegs,
    Zugestellt(String),
}

struct Paket {
    absender: String,
    status: Status,
}

impl Paket {
    fn new(absender: &str) -> Self {
        Paket {
            absender: absender.to_string(),
            status: Status::Unterwegs,
        }
    }

    fn zustellen(&mut self, empfaenger: &str) {
        // todo: Ändere den Status der Paket-Instanz auf Zugestellt(empfaenger.to_string())
        todo!()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_paket_zustellung() {
        let mut p = Paket::new("DHL");
        assert_eq!(p.status, Status::Unterwegs);

        p.zustellen("Thorsten");
        assert_eq!(p.status, Status::Zugestellt("Thorsten".to_string()));
    }
}
```

