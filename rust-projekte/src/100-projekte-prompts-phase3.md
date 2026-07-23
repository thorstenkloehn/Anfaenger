# 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 3)

In diesem Kapitel erarbeitest du die 100 Projekte aus **Phase 3 (Fehlerbehandlung & Collections)** Schritt für Schritt mithilfe von künstlicher Intelligenz (KI), ohne fertigen Code abzuschreiben.
Das Ziel ist das **passive Auffrischen** und aktive Verstehen der Modul- und Datenstrukturen in Rust.

| Thema | Was du lernst |
| :--- | :--- |
| 📦 Structs & Methoden | Eigene Datenstrukturen entwerfen und mit `impl` logische Funktionen anhängen |
| 🏷️ Enums | Feste Zustände und Kategorien modellieren |
| 🔍 Pattern Matching | Strukturierter Kontrollfluss mit `match` (vollständig) und kompaktem `if let` |
| 🗃️ Collections | `Vec<T>` und `HashMap<K, V>` für dynamische Daten |
| ⚠️ Fehlerbehandlung | `Result<T, E>` und `Option<T>` für sicheren Code |

---
## 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 3)
In diesem Kapitel erarbeitest du die 100 Projekte aus **Phase 3 (Fehlerbehandlung & Collections: `Vec<T>` & `Option<T>`)** Schritt für Schritt mithilfe von künstlicher Intelligenz (KI), ohne fertigen Code abzuschreiben.
Das Ziel ist das **passive Auffrischen** und aktive Verstehen der Fehlerbehandlung und Datensammlungen (Collections) in Rust.

---
## Jedes Projekt übt alle Grundlagen von Phase 3 gleichzeitig:
| Thema | Was du lernst |
| :--- | :--- |
| 🗄️ Collections (Datenstrukturen) | Dynamische Datensammlungen wie `Vec<T>` und `HashMap<K, V>` nutzen |
| 🛡️ Systematische Fehlerbehandlung | Fehler robust handhaben mit `Result<T, E>` und fehlende Werte sicher abfangen mit `Option<T>` |
| 📦 Structs, Enums & Pattern Matching | Eigene Datentypen strukturiert erweitern und mit `match`/`if let` auswerten |

---
## Der modulare Prompt-Katalog für alle 100 Projekte (Phase 3) – Teil 1 (Projekte 1 bis 25)
Hier findest du für jedes Projekt den genauen modularen Ablauf mit Präzisions-Prompts. Kopiere diese in den Chat mit deiner KI.

---

### Projekt 1: Hotelzimmer-Verwaltung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `ZimmerStatus` (Enum für den Zimmerstatus) mit den Werten `Frei` und `Belegt`. Definiere ein Struct `Zimmer` (Struct für ein einzelnes Zimmer) mit den Feldern `nummer: u32` und `status: ZimmerStatus`. Definiere ein Struct `Hotel` (Struct für das Hotel selbst) mit dem Feld `zimmer: Vec<Zimmer>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Hotel`. Implementiere die Methode `zimmer_buchen(&mut self, nummer: u32) -> Result<(), String>` (Methode zum Buchen eines Zimmers). Nutze darin Pattern Matching oder Suchen im Vektor, um zu prüfen, ob das Zimmer existiert und frei ist. Wenn ja, ändere den Status auf `Belegt` und gib `Ok(())` zurück. Andernfalls gib ein passendes `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Hotel` und füge einige Zimmer mit unterschiedlichen Statuswerten hinzu. Rufe die Methode `zimmer_buchen` auf, um erfolgreiche Buchungen sowie Fehlerfälle (Zimmer bereits belegt oder Zimmer existiert nicht) zu testen. Werte die Rückgabewerte sauber aus und gib verständliche Statusmeldungen auf der Konsole aus."

---

### Projekt 2: Warenkorb-System

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Warenkorb` (Struct für den Warenkorb) mit dem Feld `artikel: HashMap<String, u32>` (Artikelname zu Anzahl)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Warenkorb`. Implementiere die Methode `artikel_entfernen(&mut self, name: &str, menge: u32) -> Result<(), String>` (Methode zum Entfernen von Artikeln). Nutze Pattern Matching auf das Ergebnis der Suche in der `HashMap`. Falls der Artikel nicht existiert oder die zu entfernende Menge größer als der Bestand ist, gib ein `Err` zurück. Andernfalls reduziere die Anzahl oder entferne den Eintrag ganz und gib `Ok(())` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Warenkorb`, füge einige Artikel hinzu und teste die Methode `artikel_entfernen` für den Erfolgsfall sowie für verschiedene Fehlerfälle. Gib das Resultat verständlich auf der Konsole aus."

---

### Projekt 3: Benutzer-Datenbank

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `User` (Struct für Benutzerdaten) mit den Feldern `name: String` and `email: String`. Definiere ein Struct `BenutzerDatenbank` mit dem Feld `datenbank: HashMap<String, User>` (Benutzername zu Benutzerdaten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `BenutzerDatenbank`. Implementiere die Methode `benutzer_suchen(&self, benutzername: &str) -> Option<&User>` (Methode zum Suchen eines Benutzers). Sie soll `Some(&User)` zurückgeben, falls der Benutzer existiert, andernfalls `None`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `BenutzerDatenbank`, füge einige Testnutzer hinzu und suche nach vorhandenen und nicht vorhandenen Benutzern. Nutze das `if let`-Konstrukt im Hauptprogramm, um das Suchergebnis sicher auszugeben."

---

### Projekt 4: Inventar- & Lagerverwaltung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `LagerFehler` (Enum für mögliche Lagerfehler) mit den Werten `ArtikelNichtGefunden` und `ZuWenigBestand`. Definiere ein Struct `Lager` mit dem Feld `bestand: HashMap<String, u32>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Lager`. Implementiere die Methode `entnahme(&mut self, artikel: &str, anzahl: u32) -> Result<(), LagerFehler>` (Methode zur Bestandsminderung). Prüfe systematisch, ob der Artikel existiert und ob genug Bestand vorhanden ist, andernfalls gib den entsprechenden `LagerFehler` als `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge ein `Lager`, befülle es mit Artikeln und führe mehrere Entnahmen durch. Behandle alle Fehlerfälle systematisch mit einem `match`-Ausdruck auf das `Result` und gib verständliche Fehlermeldungen auf Deutsch aus."

---

### Projekt 5: Schüler- & Notenverwaltung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Notenverwaltung` mit dem Feld `schueler: HashMap<String, Vec<u32>>` (Schülername zu einer Liste von Noten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Notenverwaltung`. Implementiere die Methode `durchschnitt_berechnen(&self, name: &str) -> Result<f64, String>` (Methode zur Berechnung des Notendurchschnitts). Die Methode soll ein `Err` zurückgeben, falls der Schüler nicht existiert oder noch keine Noten eingetragen hat, um eine Division durch Null zu verhindern. Andernfalls berechne den Durchschnitt und gib ihn als `Ok(f64)` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Trage Testnoten für Schüler ein, berechne deren Durchschnittswerte und fange die Fehlerfälle (Schüler existiert nicht oder hat keine Noten) sauber ab."

---

### Projekt 6: Deutsch-Englisch Wörterbuch

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Woerterbuch` mit dem Feld `eintraege: HashMap<String, String>` (deutsches Wort zu englischem Wort)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Woerterbuch`. Implementiere die Methode `uebersetzen(&self, wort: &str) -> Result<String, String>` (Methode zur Übersetzung). Falls das gesuchte Wort nicht existiert, gib ein `Err("Wort nicht gefunden")` zurück, andernfalls die englische Übersetzung im `Ok`-Wrapper."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Befülle das Wörterbuch mit einigen Begriffen, frage Übersetzungen ab und gib diese auf der Konsole aus. Behandle den Fehlerfall sauber."

---

### Projekt 7: Wahl-Auswertung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Wahl` mit dem Feld `stimmen: HashMap<String, u32>` (Kandidatename zu Stimmenanzahl)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Wahl`. Implementiere die Methode `gewinner_ermitteln(&self) -> Option<String>` (Methode zur Ermittlung des Gewinners). Die Methode soll den Kandidaten mit den meisten Stimmen ermitteln. Falls die HashMap leer ist (noch keine Stimmen abgegeben wurden), gib `None` zurück, andernfalls `Some(Kandidatenname)`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Trage Stimmen für verschiedene Kandidaten ein und ermittle den Gewinner. Nutze `if let` or `match`, um das Resultat auszugeben, und teste auch den Fall, dass noch keine Stimmen existieren."

---

### Projekt 8: Parkhaus-Manager

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Parkplatz` mit den Feldern `nummer: usize` und `belegt: Option<String>` (belegt mit Autokennzeichen im `Some`-Fall, sonst `None`). Definiere ein Struct `Parkhaus` mit dem Feld `plaetze: Vec<Parkplatz>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Parkhaus`. Implementiere die Methode `finde_freien_platz(&self) -> Option<usize>` (sucht den Index des ersten freien Platzes) und die Methode `parken(&mut self, kennzeichen: String) -> Result<usize, String>` (belegt den freien Parkplatz mit dem Kennzeichen. Gibt den Parkplatz-Index bei Erfolg zurück, andernfalls ein `Err("Parkhaus voll")`)."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Instanziiere ein `Parkhaus` mit einer festen Anzahl an Plätzen. Teste das Parken von Autos, bis das Parkhaus voll ist, und gib die jeweiligen Erfolgsmeldungen oder Fehler aus."

---

### Projekt 9: Status-Tracker für Chat-Nutzer

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `OnlineStatus` mit den Werten `Online`, `Offline` und `Abwesend`. Definiere ein Struct `StatusTracker` mit dem Feld `nutzer: HashMap<String, OnlineStatus>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusTracker`. Implementiere die Methode `status_aendern(&mut self, name: &str, neuer_status: OnlineStatus) -> Result<(), String>`. Gibt ein `Err` zurück, falls der Benutzername nicht registriert ist."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Registriere einige Benutzer, ändere deren Online-Status und provoziere eine Fehlermeldung durch eine Statusänderung bei einem nicht registrierten Benutzer."

---

### Projekt 10: Einnahmen-Ausgaben-Rechner

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `TransaktionsTyp` mit den Werten `Einnahme` und `Ausgabe`. Definiere ein Struct `Transaktion` mit den Feldern `betrag: f64`, `kategorie: String` und `typ: TransaktionsTyp`. Definiere ein Struct `Haushaltsbuch` mit dem Feld `transaktionen: Vec<Transaktion>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Haushaltsbuch`. Implementiere die Methode `letzte_transaktion(&self) -> Option<&Transaktion>` (gibt eine Referenz auf die letzte Transaktion zurück, falls Vektor nicht leer ist)."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Trage Transaktionen ein und rufe `letzte_transaktion` auf. Werte das Resultat mit Pattern Matching aus. Stelle sicher, dass auch der Fall eines leeren Haushaltsbuchs sicher behandelt wird."

---

### Projekt 11: Zimmer-Reservierung (Kino 11)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `SitzStatus` mit den Werten `Frei` und `Reserviert`. Definiere ein Struct `Sitzplatz` mit den Feldern `nummer: u32` und `status: SitzStatus`. Definiere ein Struct `KinoSaal` mit dem Feld `sitze: Vec<Sitzplatz>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `KinoSaal`. Implementiere die Methode `sitz_reservieren(&mut self, nummer: u32) -> Result<(), String>`. Die Methode soll prüfen, ob der Sitzplatz existiert und frei ist. Wenn ja, ändere den Status auf `Reserviert` und gib `Ok(())` zurück. Andernfalls gib ein passendes `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `KinoSaal` mit einer Liste von Sitzen. Teste erfolgreiche und fehlgeschlagene Reservierungen und gib die Ergebnisse verständlich auf der Konsole aus."

---

### Projekt 12: Bestell-System (Bestellung 12)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Bestellung` mit dem Feld `artikel: HashMap<String, u32>` (Artikelname zu Bestellmenge)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Bestellung`. Implementiere die Methode `menge_reduzieren(&mut self, name: &str, menge: u32) -> Result<(), String>`. Falls der Artikel nicht in der Bestellung ist oder weniger bestellt wurde als zu reduzieren ist, gib ein `Err` zurück, andernfalls verringere die Menge oder entferne den Artikel und gib `Ok(())` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `Bestellung`, füge Artikel hinzu und verringere deren Mengen. Fange Fehlerfälle (Artikel fehlt oder Menge zu groß) sauber ab und gib die Ergebnisse aus."

---

### Projekt 13: Kunden-Verzeichnis (Kunde 13)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Kunde` mit den Feldern `name: String` und `telefon: String`. Definiere ein Struct `KundenVerzeichnis` mit dem Feld `kunden: HashMap<String, Kunde>` (Kundennummer zu Kundendaten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `KundenVerzeichnis`. Implementiere die Methode `kunde_suchen(&self, nummer: &str) -> Option<&Kunde>`. Sie soll `Some(&Kunde)` zurückgeben, falls die Kundennummer existiert, andernfalls `None`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge ein `KundenVerzeichnis`, füge Kunden hinzu und suche nach ihnen. Gib das Ergebnis mit `if let` sicher auf der Konsole aus."

---

### Projekt 14: Paket-Lagerung (Paket 14)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `LagerFehler` mit den Werten `PaketNichtGefunden` und `Uebergewicht`. Definiere ein Struct `PaketLager` mit dem Feld `pakete: HashMap<String, u32>` (Paket-ID zu Gewicht in kg)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketLager`. Implementiere die Methode `paket_entnehmen(&mut self, id: &str, max_gewicht: u32) -> Result<(), LagerFehler>`. Falls das Paket zu schwer für den Arbeiter (über `max_gewicht`) ist oder nicht existiert, gib den passenden `LagerFehler` als `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge ein `PaketLager`, befülle es und teste die Entnahme von Paketen unter Beachtung des Maximalgewichts. Werte alle Ergebnisse mit `match` aus."

---

### Projekt 15: Wetter-Messwerte (Station 15)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `WetterStation` mit dem Feld `messwerte: HashMap<String, Vec<f64>>` (Stadt zu einer Liste von gemessenen Temperaturen)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `WetterStation`. Implementiere die Methode `durchschnitt_temperatur(&self, stadt: &str) -> Result<f64, String>`. Falls die Stadt fehlt oder noch keine Temperaturen gemessen wurden, gib ein `Err` zurück. Berechne ansonsten den Durchschnitt der Messwerte."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Trage Temperaturwerte für verschiedene Städte ein, berechne die Durchschnittswerte und fange Fehlerfälle sauber ab."

---

### Projekt 16: Zimmer-Reservierung (Flugzeug 16)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `SitzStatus` mit den Werten `Frei` und `Belegt`. Definiere ein Struct `Sitzplatz` mit den Feldern `nummer: u32` und `status: SitzStatus`. Definiere ein Struct `Flugzeug` mit dem Feld `sitze: Vec<Sitzplatz>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Flugzeug`. Implementiere die Methode `sitz_buchen(&mut self, nummer: u32) -> Result<(), String>`. Falls der Sitz nicht existiert oder bereits belegt ist, gib ein `Err` zurück, andernfalls buche ihn und gib `Ok(())` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge ein `Flugzeug` mit Sitzplätzen, buche Sitze und gib die Resultate verständlich aus."

---

### Projekt 17: Bestell-System (Einkaufsliste 17)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Einkaufsliste` mit dem Feld `eintraege: HashMap<String, u32>` (Artikelname zu gewünschter Menge)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Einkaufsliste`. Implementiere die Methode `artikel_entfernen(&mut self, name: &str, menge: u32) -> Result<(), String>`. Falls der Artikel fehlt oder weniger als die verlangte Menge auf der Liste steht, gib ein `Err` zurück, andernfalls passe die menge an oder lösche den Artikel."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge eine `Einkaufsliste`, entferne Artikel und fange Fehlerfälle ab."

---

### Projekt 18: Kunden-Verzeichnis (Mitarbeiter 18)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Mitarbeiter` mit den Feldern `name: String` und `abteilung: String`. Definiere ein Struct `MitarbeiterVerzeichnis` mit dem Feld `mitarbeiter: HashMap<String, Mitarbeiter>` (Personalnummer zu Mitarbeiterdaten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `MitarbeiterVerzeichnis`. Implementiere die Methode `mitarbeiter_suchen(&self, nummer: &str) -> Option<&Mitarbeiter>` (sucht den Mitarbeiter anhand seiner Personalnummer und gibt im Erfolgsfall eine Referenz zurück)."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge ein `MitarbeiterVerzeichnis`, trage Mitarbeiter ein, suche nach ihnen und gib die Ergebnisse mit `if let` aus."

---

### Projekt 19: Paket-Lagerung (Bibliothek 19)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `AusleihFehler` mit den Werten `BuchNichtGefunden` und `BestandLeer`. Definiere ein Struct `Bibliothek` mit dem Feld `bestand: HashMap<String, u32>` (Buchtitel zu verbleibendem Bestand)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Bibliothek`. Implementiere die Methode `buch_ausleihen(&mut self, titel: &str, anzahl: u32) -> Result<(), AusleihFehler>`. Falls das Buch fehlt oder nicht genug Exemplare da sind, gib den passenden `AusleihFehler` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge eine `Bibliothek` mit Büchern, teste Ausleihen (Erfolg und Fehlerszenarien) und gib verständliche Fehlermeldungen auf der Konsole aus."

---

### Projekt 20: Wetter-Messwerte (Sensoren 20)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `SensorVerwaltung` mit dem Feld `daten: HashMap<String, Vec<f64>>` (Sensor-ID zu einer Liste von Messwerten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `SensorVerwaltung`. Implementiere die Methode `durchschnitt_wert(&self, id: &str) -> Result<f64, String>`. Falls die Sensor-ID fehlt oder keine Daten vorhanden sind, gib ein `Err` zurück, andernfalls berechne den Durchschnitt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Befülle die `SensorVerwaltung` mit Messwerten, berechne Durchschnitte und fange Fehlerfälle ab."

---

### Projekt 21: Zimmer-Reservierung (Konferenzraum 21)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `RaumStatus` mit den Werten `Frei` und `Gebucht`. Definiere ein Struct `Konferenzraum` mit den Feldern `nummer: u32` und `status: RaumStatus`. Definiere ein Struct `Buero` mit dem Feld `raeume: Vec<Konferenzraum>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Buero`. Implementiere die Methode `raum_buchen(&mut self, nummer: u32) -> Result<(), String>`. Die Methode soll prüfen, ob der Raum existiert und frei ist. Wenn ja, ändere den Status auf `Gebucht` und gib `Ok(())` zurück. Andernfalls gib ein passendes `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge ein `Buero` mit Räumen, buche Räume und gib die Resultate auf der Konsole aus."

---

### Projekt 22: Bestell-System (Lagerbestand 22)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Lagerbestand` mit dem Feld `bestand: HashMap<String, u32>` (Artikelname zu Lagermenge)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Lagerbestand`. Implementiere die Methode `bestand_mindern(&mut self, name: &str, menge: u32) -> Result<(), String>`. Falls der Artikel nicht vorhanden oder die Menge zu gering ist, gib ein `Err` zurück, andernfalls mindere den Bestand."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge eine `Lagerbestand`-Instanz, verringere Bestände und fange Fehlerfälle ab."

---

### Projekt 23: Kunden-Verzeichnis (Mitglieder 23)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Mitglied` mit den Feldern `name: String` und `beitrag: f64`. Definiere ein Struct `MitgliederVerzeichnis` mit dem Feld `mitglieder: HashMap<String, Mitglied>` (Mitgliedsnummer zu Mitgliedsdaten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `MitgliederVerzeichnis`. Implementiere die Methode `mitglied_suchen(&self, nummer: &str) -> Option<&Mitglied>`. Sie soll `Some(&Mitglied)` zurückgeben, falls die Nummer existiert, andernfalls `None`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge ein `MitgliederVerzeichnis`, trage Mitglieder ein, suche nach ihnen und gib die Ergebnisse mit `if let` aus."

---

### Projekt 24: Paket-Lagerung (Fuhrpark 24)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FuhrparkFehler` mit den Werten `FahrzeugNichtGefunden` und `Ueberladen`. Definiere ein Struct `Fuhrpark` mit dem Feld `ladungen: HashMap<String, u32>` (Fahrzeug-ID zu Ladung in kg)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere die Methode `ladung_entnehmen(&mut self, id: &str, menge: u32) -> Result<(), FuhrparkFehler>`. Falls das Fahrzeug zu viel geladen hat oder nicht existiert, gib den passenden `FuhrparkFehler` als `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge einen `Fuhrpark`, belade Fahrzeuge und teste die Entnahme. Werte alle Ergebnisse mit `match` aus."

---

### Projekt 25: Wetter-Messwerte (Notenspiegel 25)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Struct `Notenspiegel` mit dem Feld `noten: HashMap<String, Vec<u32>>` (Schulfach zu einer Liste von Noten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Notenspiegel`. Implementiere die Methode `fach_durchschnitt(&self, fach: &str) -> Result<f64, String>`. Falls das Fach fehlt oder noch keine Noten vorhanden sind, gib ein `Err` zurück, andernfalls berechne den Notendurchschnitt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Trage Noten für verschiedene Fächer ein, berechne den Durchschnitt und fange alle Fehlerfälle sauber ab."

---

## 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 3) – Teil 2 (Projekte 26 bis 50)

In diesem Abschnitt findest du die Präzisions-Prompts für die Projekte 26 bis 50 der Phase 3. Der Fokus liegt hierbei auf der Verwendung von dynamischen Listen (`Vec<T>`) und systematischer Fehlerbehandlung (`Result<T, E>`).

---

### Projekt 26: Status-Manager (Klimaanlage 26)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere ein Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Definiere anschließend ein weiteres Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`, das eine Liste von Geräten verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `geraet_hinzufuegen(&mut self, g: Geraet)` zum Hinzufügen eines Geräts und eine Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID im Vektor suchen und dessen Status ändern. Wenn das Gerät nicht existiert, soll sie ein `Err` mit einer Fehlermeldung zurückgeben, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Klimaanlage', der ID 26 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts. Teste außerdem den Fehlerfall, indem du versuchst, den Status eines nicht existierenden Geräts zu ändern. Werte die Ergebnisse (Erfolg und Fehler) sicher mit Pattern Matching (z. B. `match` oder `if let`) aus und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 27: Ticket-System (Ticket 27)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Definiere anschließend ein Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`, um mehrere Tickets zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_hinzufuegen(&mut self, t: Ticket)` zum Hinzufügen eines Tickets und eine Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` im Vektor suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches dringendes Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 27, Titel 'Fehler in Modul 27' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket mehr im System ist. Werte die Ergebnisse mit Pattern Matching aus und gib sie auf der Konsole aus."

---

### Projekt 28: Paket-Tracker (Paket 28)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `id: i32`, `zielort: String` and `status: PaketStatus`. Definiere anschließend ein Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`, um eine Liste von Paketen zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_registrieren(&mut self, p: Paket)` zum Hinzufügen eines Pakets und eine Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID im Vektor suchen und seinen Status aktualisieren. Wenn das Paket nicht existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 28, Zielort 'Koeln' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch ein nicht existiertendes Paket für den Fehlerfall. Behandle und präsentiere die Resultate mit Pattern Matching auf der Konsole."

---

### Projekt 29: Fahrzeug-Klasse (Fahrzeug 29)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Definiere anschließend ein Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`, das den Fahrzeugbestand verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` zum Hinzufügen eines Fahrzeugs und eine Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID im Vektor suchen. Falls gefunden, berechne die Maut (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und gib `Ok(maut)` zurück. Falls nicht gefunden, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Volkswagen' (ID 29, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib sie auf der Konsole aus."

---

### Projekt 30: Mitarbeiter-Rolle (Mitarbeiter 30)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Definiere anschließend ein Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`, das die Mitarbeiterliste verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Abteilung`. Implementiere eine Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` zum Hinzufügen eines Mitarbeiters und eine Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen. Falls vorhanden, soll mittels Pattern Matching auf der `Rolle` geprüft werden, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgegeben werden. Falls nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Daniel' (ID 30, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Daniel sowie für eine ungültige ID. Nutze Pattern Matching zur sicheren Auswertung und gib die Ergebnisse verständlich auf der Konsole aus."

---

### Projekt 31: Status-Manager (Fernseher 31)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere ein Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Definiere anschließend ein weiteres Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`, das eine Liste von Geräten verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `geraet_hinzufuegen(&mut self, g: Geraet)` zum Hinzufügen eines Geräts und eine Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID im Vektor suchen und dessen Status ändern. Wenn das Gerät nicht existiert, soll sie ein `Err` mit einer Fehlermeldung zurückgeben, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Fernseher', der ID 31 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts. Teste außerdem den Fehlerfall, indem du versuchst, den Status eines nicht existierenden Geräts zu ändern. Werte die Ergebnisse (Erfolg und Fehler) sicher mit Pattern Matching (z. B. `match` oder `if let`) aus und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 32: Ticket-System (Ticket 32)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Definiere anschließend ein Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`, um mehrere Tickets zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_hinzufuegen(&mut self, t: Ticket)` zum Hinzufügen eines Tickets und eine Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` im Vektor suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches dringendes Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 32, Titel 'Fehler in Modul 32' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket mehr im System ist. Werte die Ergebnisse mit Pattern Matching aus und gib sie auf der Konsole aus."

---

### Projekt 33: Paket-Tracker (Paket 33)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Definiere anschließend ein Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`, um eine Liste von Paketen zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_registrieren(&mut self, p: Paket)` zum Hinzufügen eines Pakets und eine Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID im Vektor suchen und seinen Status aktualisieren. Wenn das Paket nicht existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 33, Zielort 'Frankfurt' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch ein nicht existiertendes Paket für den Fehlerfall. Behandle und präsentiere die Resultate mit Pattern Matching auf der Konsole."

---

### Projekt 34: Fahrzeug-Klasse (Fahrzeug 34)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Definiere anschließend ein Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`, das den Fahrzeugbestand verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` zum Hinzufügen eines Fahrzeugs und eine Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID im Vektor suchen. Falls gefunden, berechne die Maut (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und gib `Ok(maut)` zurück. Falls nicht gefunden, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Porsche' (ID 34, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib sie auf der Konsole aus."

---

### Projekt 35: Mitarbeiter-Rolle (Mitarbeiter 35)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Definiere anschließend ein Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`, das die Mitarbeiterliste verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Abteilung`. Implementiere eine Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` zum Hinzufügen eines Mitarbeiters und eine Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen. Falls vorhanden, soll mittels Pattern Matching auf der `Rolle` geprüft werden, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgegeben werden. Falls nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Emma' (ID 35, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Emma sowie für eine ungültige ID. Nutze Pattern Matching zur sicheren Auswertung und gib die Ergebnisse verständlich auf der Konsole aus."

---

### Projekt 36: Status-Manager (Drucker 36)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere ein Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Definiere anschließend ein weiteres Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`, das eine Liste von Geräten verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `geraet_hinzufuegen(&mut self, g: Geraet)` zum Hinzufügen eines Geräts und eine Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID im Vektor suchen und dessen Status ändern. Wenn das Gerät nicht existiert, soll sie ein `Err` mit einer Fehlermeldung zurückgeben, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Drucker', der ID 36 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts. Teste außerdem den Fehlerfall, indem du versuchst, den Status eines nicht existierenden Geräts zu ändern. Werte die Ergebnisse (Erfolg und Fehler) sicher mit Pattern Matching (z. B. `match` oder `if let`) aus und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 37: Ticket-System (Ticket 37)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Definiere anschließend ein Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`, um mehrere Tickets zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_hinzufuegen(&mut self, t: Ticket)` zum Hinzufügen eines Tickets und eine Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` im Vektor suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches dringendes Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 37, Titel 'Fehler in Modul 37' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket mehr im System ist. Werte die Ergebnisse mit Pattern Matching aus und gib sie auf der Konsole aus."

---

### Projekt 38: Paket-Tracker (Paket 38)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Definiere anschließend ein Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`, um eine Liste von Paketen zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_registrieren(&mut self, p: Paket)` zum Hinzufügen eines Pakets und eine Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID im Vektor suchen und seinen Status aktualisieren. Wenn das Paket nicht existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 38, Zielort 'Stuttgart' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch ein nicht existiertendes Paket für den Fehlerfall. Behandle und präsentiere die Resultate mit Pattern Matching auf der Konsole."

---

### Projekt 39: Fahrzeug-Klasse (Fahrzeug 39)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Definiere anschließend ein Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`, das den Fahrzeugbestand verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` zum Hinzufügen eines Fahrzeugs und eine Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID im Vektor suchen. Falls gefunden, berechne die Maut (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und gib `Ok(maut)` zurück. Falls nicht gefunden, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Opel' (ID 39, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib sie auf der Konsole aus."

---

### Projekt 40: Mitarbeiter-Rolle (Mitarbeiter 40)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Definiere anschließend ein Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`, das die Mitarbeiterliste verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Abteilung`. Implementiere eine Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` zum Hinzufügen eines Mitarbeiters und eine Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen. Falls vorhanden, soll mittels Pattern Matching auf der `Rolle` geprüft werden, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgegeben werden. Falls nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Felix' (ID 40, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Felix sowie für eine ungültige ID. Nutze Pattern Matching zur sicheren Auswertung und gib die Ergebnisse verständlich auf der Konsole aus."

---

### Projekt 41: Status-Manager (Lichtleiste 41)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere ein Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Definiere anschließend ein weiteres Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`, das eine Liste von Geräten verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `geraet_hinzufuegen(&mut self, g: Geraet)` zum Hinzufügen eines Geräts und eine Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID im Vektor suchen und dessen Status ändern. Wenn das Gerät nicht existiert, soll sie ein `Err` mit einer Fehlermeldung zurückgeben, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Lichtleiste', der ID 41 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts. Teste außerdem den Fehlerfall, indem du versuchst, den Status eines nicht existierenden Geräts zu ändern. Werte die Ergebnisse (Erfolg und Fehler) sicher mit Pattern Matching (z. B. `match` oder `if let`) aus und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 42: Ticket-System (Ticket 42)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Definiere anschließend ein Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`, um mehrere Tickets zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_hinzufuegen(&mut self, t: Ticket)` zum Hinzufügen eines Tickets und eine Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` im Vektor suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches dringendes Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 42, Titel 'Fehler in Modul 42' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket mehr im System ist. Werte die Ergebnisse mit Pattern Matching aus und gib sie auf der Konsole aus."

---

### Projekt 43: Paket-Tracker (Paket 43)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Definiere anschließend ein Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`, um eine Liste von Paketen zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_registrieren(&mut self, p: Paket)` zum Hinzufügen eines Pakets und eine Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID im Vektor suchen und seinen Status aktualisieren. Wenn das Paket nicht existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 43, Zielort 'Duesseldorf' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch ein nicht existiertendes Paket für den Fehlerfall. Behandle und präsentiere die Resultate mit Pattern Matching auf der Konsole."

---

### Projekt 44: Fahrzeug-Klasse (Fahrzeug 44)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Definiere anschließend ein Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`, das den Fahrzeugbestand verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` zum Hinzufügen eines Fahrzeugs und eine Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID im Vektor suchen. Falls gefunden, berechne die Maut (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und gib `Ok(maut)` zurück. Falls nicht gefunden, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Ford' (ID 44, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib sie auf der Konsole aus."

---

### Projekt 45: Mitarbeiter-Rolle (Mitarbeiter 45)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Definiere anschließend ein Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`, das die Mitarbeiterliste verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Abteilung`. Implementiere eine Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` zum Hinzufügen eines Mitarbeiters und eine Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen. Falls vorhanden, soll mittels Pattern Matching auf der `Rolle` geprüft werden, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgegeben werden. Falls nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Greta' (ID 45, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Greta sowie für eine ungültige ID. Nutze Pattern Matching zur sicheren Auswertung und gib die Ergebnisse verständlich auf der Konsole aus."

---

### Projekt 46: Status-Manager (Kamera 46)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere ein Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Definiere anschließend ein weiteres Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`, das eine Liste von Geräten verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `geraet_hinzufuegen(&mut self, g: Geraet)` zum Hinzufügen eines Geräts und eine Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID im Vektor suchen und dessen Status ändern. Wenn das Gerät nicht existiert, soll sie ein `Err` mit einer Fehlermeldung zurückgeben, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Kamera', der ID 46 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts. Teste außerdem den Fehlerfall, indem du versuchst, den Status eines nicht existierenden Geräts zu ändern. Werte die Ergebnisse (Erfolg und Fehler) sicher mit Pattern Matching (z. B. `match` oder `if let`) aus und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 47: Ticket-System (Ticket 47)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Definiere anschließend ein Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`, um mehrere Tickets zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_hinzufuegen(&mut self, t: Ticket)` zum Hinzufügen eines Tickets und eine Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` im Vektor suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches dringendes Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 47, Titel 'Fehler in Modul 47' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket mehr im System ist. Werte die Ergebnisse mit Pattern Matching aus und gib sie auf der Konsole aus."

---

### Projekt 48: Paket-Tracker (Paket 48)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Definiere anschließend ein Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`, um eine Liste von Paketen zu verwalten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_registrieren(&mut self, p: Paket)` zum Hinzufügen eines Pakets und eine Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID im Vektor suchen und seinen Status aktualisieren. Wenn das Paket nicht existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden, andernfalls `Ok(())`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 48, Zielort 'Dortmund' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch ein nicht existiertendes Paket für den Fehlerfall. Behandle und präsentiere die Resultate mit Pattern Matching auf der Konsole."

---

### Projekt 49: Fahrzeug-Klasse (Fahrzeug 49)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Definiere anschließend ein Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`, das den Fahrzeugbestand verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` zum Hinzufügen eines Fahrzeugs und eine Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID im Vektor suchen. Falls gefunden, berechne die Maut (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und gib `Ok(maut)` zurück. Falls nicht gefunden, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Volvo' (ID 49, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib sie auf der Konsole aus."

---

### Projekt 50: Mitarbeiter-Rolle (Mitarbeiter 50)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Definiere anschließend ein Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`, das die Mitarbeiterliste verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Abteilung`. Implementiere eine Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` zum Hinzufügen eines Mitarbeiters und eine Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen. Falls vorhanden, soll mittels Pattern Matching auf der `Rolle` geprüft werden, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgegeben werden. Falls nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Henry' (ID 50, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Henry sowie für eine ungültige ID. Nutze Pattern Matching zur sicheren Auswertung und gib die Ergebnisse verständlich auf der Konsole aus."

---

## 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 3 - Projekte 51 bis 75)

In diesem Abschnitt erarbeitest du die Projekte 51 bis 75 aus **Phase 3 (Fehlerbehandlung & Collections)** schrittweise mithilfe von künstlicher Intelligenz (KI), ohne fertigen Code vorwegzunehmen.
Der Fokus liegt hierbei auf der Verwendung von `HashMap<K, V>` zur Datenhaltung und `Option<T>` zur sicheren Abfrage von Werten.

---

### Projekt 51: Status-Manager (Waschmaschine 51)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Geräte-Statusverwaltung. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `StatusManager` mit einem Feld `geraete`, das eine `HashMap<String, GeraeteStatus>` (Gerätename als Schlüssel, Status als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `status_abfragen(&self, name: &str) -> Option<&GeraeteStatus>`, die den Status des angegebenen Geräts aus der HashMap sucht und zurückgibt (also `Some(&GeraeteStatus)` bei Erfolg oder `None` falls nicht vorhanden)."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein Gerät mit dem Namen 'Waschmaschine 51' und dem Status `Standby` hinzu, und rufe die Methode `status_abfragen` auf. Behandle die Rückgabe (`Option`) sicher mit Pattern Matching (`match` oder `if let`) und gib das Ergebnis verständlich auf der Konsole aus."

---

### Projekt 52: Ticket-System (Ticket 52)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Ticket-Verwaltung. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `titel: String` und `prioritaet: Prioritaet`. Definiere ein weiteres Struct `TicketSystem` mit einem Feld `tickets`, das eine `HashMap<i32, Ticket>` (Ticket-ID als Schlüssel, Ticket als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_abrufen(&self, id: i32) -> Option<&Ticket>`, die nach einem Ticket mit der angegebenen ID sucht und es verpackt in ein `Option` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem`, füge ein Ticket mit der ID 52, dem Titel 'Ticket 52' und der Priorität `Hoch` hinzu. Rufe anschließend die Methode `ticket_abrufen` auf und gib das Ergebnis sicher auf der Konsole aus."

---

### Projekt 53: Paket-Tracker (Paket 53)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Paket-Tracker. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `zielort: String` und `status: PaketStatus`. Definiere ein Struct `PaketTracker` mit dem Feld `pakete`, das eine `HashMap<String, Paket>` (Sendungsnummer/Tracking-ID als Schlüssel, Paket als Wert) verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_verfolgen(&self, tracking_id: &str) -> Option<&Paket>`, die nach dem Paket sucht und ein `Option<&Paket>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker`, füge ein Paket mit dem Schlüssel 'Paket 53' (Zielort: 'München', Status: `Unterwegs`) hinzu. Suche danach und gib den Status des Pakets sicher über Pattern Matching aus."

---

### Projekt 54: Fahrzeug-Klasse (Fahrzeug 54)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Fuhrpark. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String` und `typ: FahrzeugTyp`. Definiere ein Struct `Fuhrpark` mit dem Feld `fahrzeuge`, das eine `HashMap<String, Fahrzeug>` (Kennzeichen als Schlüssel, Fahrzeug als Wert) enthält."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_suchen(&self, kennzeichen: &str) -> Option<&Fahrzeug>`, die das Fahrzeug anhand des Kennzeichens in der HashMap sucht und als `Option<&Fahrzeug>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fuhrpark`, füge ein Fahrzeug mit dem Kennzeichen 'Fahrzeug 54' (Typ: `Auto`, Hersteller: 'Audi') hinzu. Suche nach diesem Kennzeichen und gib die Details des Fahrzeugs sicher aus."

---

### Projekt 55: Mitarbeiter-Rolle (Mitarbeiter 55)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Mitarbeiter-Datenbank. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `name: String` und `rolle: Rolle`. Definiere ein Struct `MitarbeiterDatenbank` mit einem Feld `mitarbeiter`, das eine `HashMap<i32, Mitarbeiter>` (Mitarbeiter-ID als Schlüssel, Mitarbeiter als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `MitarbeiterDatenbank`. Implementiere eine Methode `mitarbeiter_suchen(&self, id: i32) -> Option<&Mitarbeiter>`, die den Mitarbeiter anhand seiner ID in der HashMap sucht."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `MitarbeiterDatenbank`, füge den Mitarbeiter mit ID 55 (Name: 'Mitarbeiter 55', Rolle: `Entwickler`) hinzu, suche nach der ID 55 und gib den Namen und die Rolle sicher aus."

---

### Projekt 56: Status-Manager (Geschirrspueler 56)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Geräte-Statusverwaltung. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `StatusManager` mit einem Feld `geraete`, das eine `HashMap<String, GeraeteStatus>` (Gerätename als Schlüssel, Status als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `status_abfragen(&self, name: &str) -> Option<&GeraeteStatus>`, die den Status des angegebenen Geräts aus der HashMap sucht und zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein Gerät mit dem Namen 'Geschirrspueler 56' und dem Status `Aus` hinzu. Suche nach diesem Gerät und gib seinen Zustand mit Hilfe von Pattern Matching sicher aus."

---

### Projekt 57: Ticket-System (Ticket 57)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Ticket-Verwaltung. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `titel: String` und `prioritaet: Prioritaet`. Definiere ein weiteres Struct `TicketSystem` mit einem Feld `tickets`, das eine `HashMap<i32, Ticket>` (Ticket-ID als Schlüssel, Ticket als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_abrufen(&self, id: i32) -> Option<&Ticket>`, die nach einem Ticket mit der angegebenen ID sucht und es verpackt in ein `Option` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem`, füge ein Ticket mit der ID 57, dem Titel 'Ticket 57' und der Priorität `Mittel` hinzu. Rufe anschließend die Methode `ticket_abrufen` auf und gib das Ergebnis sicher auf der Konsole aus."

---

### Projekt 58: Paket-Tracker (Paket 58)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Paket-Tracker. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `zielort: String` und `status: PaketStatus`. Definiere ein Struct `PaketTracker` mit dem Feld `pakete`, das eine `HashMap<String, Paket>` (Sendungsnummer/Tracking-ID als Schlüssel, Paket als Wert) verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_verfolgen(&self, tracking_id: &str) -> Option<&Paket>`, die nach dem Paket sucht und ein `Option<&Paket>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker`, füge ein Paket mit dem Schlüssel 'Paket 58' (Zielort: 'Berlin', Status: `ImLager`) hinzu. Suche danach und gib den Status des Pakets sicher über Pattern Matching aus."

---

### Projekt 59: Fahrzeug-Klasse (Fahrzeug 59)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Fuhrpark. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String` und `typ: FahrzeugTyp`. Definiere ein Struct `Fuhrpark` mit dem Feld `fahrzeuge`, das eine `HashMap<String, Fahrzeug>` (Kennzeichen als Schlüssel, Fahrzeug als Wert) enthält."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_suchen(&self, kennzeichen: &str) -> Option<&Fahrzeug>`, die das Fahrzeug anhand des Kennzeichens in der HashMap sucht und als `Option<&Fahrzeug>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fuhrpark`, füge ein Fahrzeug mit dem Kennzeichen 'Fahrzeug 59' (Typ: `Lkw`, Hersteller: 'MAN') hinzu. Suche nach diesem Kennzeichen und gib die Details des Fahrzeugs sicher aus."

---

### Projekt 60: Mitarbeiter-Rolle (Mitarbeiter 60)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Mitarbeiter-Datenbank. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `name: String` und `rolle: Rolle`. Definiere ein Struct `MitarbeiterDatenbank` mit einem Feld `mitarbeiter`, das eine `HashMap<i32, Mitarbeiter>` (Mitarbeiter-ID als Schlüssel, Mitarbeiter als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `MitarbeiterDatenbank`. Implementiere eine Methode `mitarbeiter_suchen(&self, id: i32) -> Option<&Mitarbeiter>`, die den Mitarbeiter anhand seiner ID in der HashMap sucht."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `MitarbeiterDatenbank`, füge den Mitarbeiter mit ID 60 (Name: 'Mitarbeiter 60', Rolle: `Admin`) hinzu, suche nach der ID 60 und gib den Namen und die Rolle sicher aus."

---

### Projekt 61: Status-Manager (Heizung 61)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Geräte-Statusverwaltung. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `StatusManager` mit einem Feld `geraete`, das eine `HashMap<String, GeraeteStatus>` (Gerätename als Schlüssel, Status als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `status_abfragen(&self, name: &str) -> Option<&GeraeteStatus>`, die den Status des angegebenen Geräts aus der HashMap sucht und zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein Gerät mit dem Namen 'Heizung 61' und dem Status `An` hinzu. Suche nach diesem Gerät und gib seinen Zustand mit Hilfe von Pattern Matching sicher aus."

---

### Projekt 62: Ticket-System (Ticket 62)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Ticket-Verwaltung. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `titel: String` und `prioritaet: Prioritaet`. Definiere ein weiteres Struct `TicketSystem` mit einem Feld `tickets`, das eine `HashMap<i32, Ticket>` (Ticket-ID als Schlüssel, Ticket als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_abrufen(&self, id: i32) -> Option<&Ticket>`, die nach einem Ticket mit der angegebenen ID sucht und es verpackt in ein `Option` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem`, füge ein Ticket mit der ID 62, dem Titel 'Ticket 62' und der Priorität `Niedrig` hinzu. Rufe anschließend die Methode `ticket_abrufen` auf und gib das Ergebnis sicher auf der Konsole aus."

---

### Projekt 63: Paket-Tracker (Paket 63)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Paket-Tracker. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `zielort: String` und `status: PaketStatus`. Definiere ein Struct `PaketTracker` mit dem Feld `pakete`, das eine `HashMap<String, Paket>` (Sendungsnummer/Tracking-ID als Schlüssel, Paket als Wert) verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_verfolgen(&self, tracking_id: &str) -> Option<&Paket>`, die nach dem Paket sucht und ein `Option<&Paket>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker`, füge ein Paket mit dem Schlüssel 'Paket 63' (Zielort: 'Hamburg', Status: `Zugestellt`) hinzu. Suche danach und gib den Status des Pakets sicher über Pattern Matching aus."

---

### Projekt 64: Fahrzeug-Klasse (Fahrzeug 64)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Fuhrpark. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String` und `typ: FahrzeugTyp`. Definiere ein Struct `Fuhrpark` mit dem Feld `fahrzeuge`, das eine `HashMap<String, Fahrzeug>` (Kennzeichen als Schlüssel, Fahrzeug als Wert) enthält."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_suchen(&self, kennzeichen: &str) -> Option<&Fahrzeug>`, die das Fahrzeug anhand des Kennzeichens in der HashMap sucht und als `Option<&Fahrzeug>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fuhrpark`, füge ein Fahrzeug mit dem Kennzeichen 'Fahrzeug 64' (Typ: `Motorrad`, Hersteller: 'BMW') hinzu. Suche nach diesem Kennzeichen und gib die Details des Fahrzeugs sicher aus."

---

### Projekt 65: Mitarbeiter-Rolle (Mitarbeiter 65)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Mitarbeiter-Datenbank. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `name: String` und `rolle: Rolle`. Definiere ein Struct `MitarbeiterDatenbank` mit einem Feld `mitarbeiter`, das eine `HashMap<i32, Mitarbeiter>` (Mitarbeiter-ID als Schlüssel, Mitarbeiter als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `MitarbeiterDatenbank`. Implementiere eine Methode `mitarbeiter_suchen(&self, id: i32) -> Option<&Mitarbeiter>`, die den Mitarbeiter anhand seiner ID in der HashMap sucht."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `MitarbeiterDatenbank`, füge den Mitarbeiter mit ID 65 (Name: 'Mitarbeiter 65', Rolle: `Gast`) hinzu, suche nach der ID 65 und gib den Namen und die Rolle sicher aus."

---

### Projekt 66: Status-Manager (Kuehlschrank 66)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Geräte-Statusverwaltung. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `StatusManager` mit einem Feld `geraete`, das eine `HashMap<String, GeraeteStatus>` (Gerätename als Schlüssel, Status als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `status_abfragen(&self, name: &str) -> Option<&GeraeteStatus>`, die den Status des angegebenen Geräts aus der HashMap sucht und zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein Gerät mit dem Namen 'Kuehlschrank 66' und dem Status `An` hinzu. Suche nach diesem Gerät und gib seinen Zustand mit Hilfe von Pattern Matching sicher aus."

---

### Projekt 67: Ticket-System (Ticket 67)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Ticket-Verwaltung. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `titel: String` und `prioritaet: Prioritaet`. Definiere ein weiteres Struct `TicketSystem` mit einem Feld `tickets`, das eine `HashMap<i32, Ticket>` (Ticket-ID als Schlüssel, Ticket als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_abrufen(&self, id: i32) -> Option<&Ticket>`, die nach einem Ticket mit der angegebenen ID sucht und es verpackt in ein `Option` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem`, füge ein Ticket mit der ID 67, dem Titel 'Ticket 67' und der Priorität `Hoch` hinzu. Rufe anschließend die Methode `ticket_abrufen` auf und gib das Ergebnis sicher auf der Konsole aus."

---

### Projekt 68: Paket-Tracker (Paket 68)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Paket-Tracker. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `zielort: String` und `status: PaketStatus`. Definiere ein Struct `PaketTracker` mit dem Feld `pakete`, das eine `HashMap<String, Paket>` (Sendungsnummer/Tracking-ID als Schlüssel, Paket als Wert) verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_verfolgen(&self, tracking_id: &str) -> Option<&Paket>`, die nach dem Paket sucht und ein `Option<&Paket>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker`, füge ein Paket mit dem Schlüssel 'Paket 68' (Zielort: 'Köln', Status: `Unterwegs`) hinzu. Suche danach und gib den Status des Pakets sicher über Pattern Matching aus."

---

### Projekt 69: Fahrzeug-Klasse (Fahrzeug 69)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Fuhrpark. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String` und `typ: FahrzeugTyp`. Definiere ein Struct `Fuhrpark` mit dem Feld `fahrzeuge`, das eine `HashMap<String, Fahrzeug>` (Kennzeichen als Schlüssel, Fahrzeug als Wert) enthält."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_suchen(&self, kennzeichen: &str) -> Option<&Fahrzeug>`, die das Fahrzeug anhand des Kennzeichens in der HashMap sucht und als `Option<&Fahrzeug>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fuhrpark`, füge ein Fahrzeug mit dem Kennzeichen 'Fahrzeug 69' (Typ: `Auto`, Hersteller: 'Tesla') hinzu. Suche nach diesem Kennzeichen und gib die Details des Fahrzeugs sicher aus."

---

### Projekt 70: Mitarbeiter-Rolle (Mitarbeiter 70)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Mitarbeiter-Datenbank. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `name: String` und `rolle: Rolle`. Definiere ein Struct `MitarbeiterDatenbank` mit einem Feld `mitarbeiter`, das eine `HashMap<i32, Mitarbeiter>` (Mitarbeiter-ID als Schlüssel, Mitarbeiter als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `MitarbeiterDatenbank`. Implementiere eine Methode `mitarbeiter_suchen(&self, id: i32) -> Option<&Mitarbeiter>`, die den Mitarbeiter anhand seiner ID in der HashMap sucht."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `MitarbeiterDatenbank`, füge den Mitarbeiter mit ID 70 (Name: 'Mitarbeiter 70', Rolle: `Entwickler`) hinzu, suche nach der ID 70 und gib den Namen und die Rolle sicher aus."

---

### Projekt 71: Status-Manager (Router 71)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Geräte-Statusverwaltung. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `StatusManager` mit einem Feld `geraete`, das eine `HashMap<String, GeraeteStatus>` (Gerätename als Schlüssel, Status als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere eine Methode `status_abfragen(&self, name: &str) -> Option<&GeraeteStatus>`, die den Status des angegebenen Geräts aus der HashMap sucht und zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager`, füge ein Gerät mit dem Namen 'Router 71' und dem Status `Standby` hinzu. Suche nach diesem Gerät und gib seinen Zustand mit Hilfe von Pattern Matching sicher aus."

---

### Projekt 72: Ticket-System (Ticket 72)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Ticket-Verwaltung. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `titel: String` und `prioritaet: Prioritaet`. Definiere ein weiteres Struct `TicketSystem` mit einem Feld `tickets`, das eine `HashMap<i32, Ticket>` (Ticket-ID als Schlüssel, Ticket als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere eine Methode `ticket_abrufen(&self, id: i32) -> Option<&Ticket>`, die nach einem Ticket mit der angegebenen ID sucht und es verpackt in ein `Option` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `TicketSystem`, füge ein Ticket mit der ID 72, dem Titel 'Ticket 72' und der Priorität `Mittel` hinzu. Rufe anschließend die Methode `ticket_abrufen` auf und gib das Ergebnis sicher auf der Konsole aus."

---

### Projekt 73: Paket-Tracker (Paket 73)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Paket-Tracker. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `zielort: String` und `status: PaketStatus`. Definiere ein Struct `PaketTracker` mit dem Feld `pakete`, das eine `HashMap<String, Paket>` (Sendungsnummer/Tracking-ID als Schlüssel, Paket als Wert) verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `PaketTracker`. Implementiere eine Methode `paket_verfolgen(&self, tracking_id: &str) -> Option<&Paket>`, die nach dem Paket sucht und ein `Option<&Paket>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `PaketTracker`, füge ein Paket mit dem Schlüssel 'Paket 73' (Zielort: 'Düsseldorf', Status: `Zugestellt`) hinzu. Suche danach und gib den Status des Pakets sicher über Pattern Matching aus."

---

### Projekt 74: Fahrzeug-Klasse (Fahrzeug 74)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für einen Fuhrpark. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `hersteller: String` und `typ: FahrzeugTyp`. Definiere ein Struct `Fuhrpark` mit dem Feld `fahrzeuge`, das eine `HashMap<String, Fahrzeug>` (Kennzeichen als Schlüssel, Fahrzeug als Wert) enthält."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fuhrpark`. Implementiere eine Methode `fahrzeug_suchen(&self, kennzeichen: &str) -> Option<&Fahrzeug>`, die das Fahrzeug anhand des Kennzeichens in der HashMap sucht und als `Option<&Fahrzeug>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fuhrpark`, füge ein Fahrzeug mit dem Kennzeichen 'Fahrzeug 74' (Typ: `Lkw`, Hersteller: 'Mercedes') hinzu. Suche nach diesem Kennzeichen und gib die Details des Fahrzeugs sicher aus."

---

### Projekt 75: Mitarbeiter-Rolle (Mitarbeiter 75)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für eine Mitarbeiter-Datenbank. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `name: String` und `rolle: Rolle`. Definiere ein Struct `MitarbeiterDatenbank` mit einem Feld `mitarbeiter`, das eine `HashMap<i32, Mitarbeiter>` (Mitarbeiter-ID als Schlüssel, Mitarbeiter als Wert) speichert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `MitarbeiterDatenbank`. Implementiere eine Methode `mitarbeiter_suchen(&self, id: i32) -> Option<&Mitarbeiter>`, die den Mitarbeiter anhand seiner ID in der HashMap sucht."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `MitarbeiterDatenbank`, füge den Mitarbeiter mit ID 75 (Name: 'Mitarbeiter 75', Rolle: `Admin`) hinzu, suche nach der ID 75 und gib den Namen und die Rolle sicher aus."

---

## 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 3 - Teil 4: Projekte 76 bis 100)

In diesem Teil des Katalogs erarbeitest du die Projekte 76 bis 100 aus **Phase 3 (Fehlerbehandlung & Collections)**. Der Fokus liegt bei allen Projekten auf der Verwendung von `HashMap<K, V>` zur Datenverwaltung und `Result<T, E>` zur strukturierten Fehlerbehandlung. 

Jedes Projekt folgt dem modularen Prinzip mit drei Schritten, um ein schrittweises Vibe Coding und passive Wissensüberprüfung zu ermöglichen.

---

### Projekt 76: Status-Manager (Klimaanlage 76)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Klimaanlage` mit den Feldern `raum: String` und `status: GeraeteStatus`. Definiere ein Struct `StatusManager` mit einem Feld `geraete: HashMap<String, Klimaanlage>`, das die Klimaanlagen verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `StatusManager`. Implementiere die Methode `klimaanlage_hinzufuegen(&mut self, raum: String, status: GeraeteStatus) -> Result<(), String>`, die ein `Err` zurückgibt, wenn der Raum bereits existiert. Implementiere eine zweite Methode `status_aendern(&mut self, raum: &str, neuer_status: GeraeteStatus) -> Result<(), String>`, die den Status ändert oder ein `Err` zurückgibt, falls der Raum nicht gefunden wird."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `StatusManager` und füge zwei Klimaanlagen für 'Wohnzimmer' und 'Schlafzimmer' hinzu. Ändere den Status einer vorhandenen Klimaanlage und versuche danach, den Status eines nicht existierenden Raums zu ändern. Werte die zurückgegebenen `Result`-Werte mit Pattern Matching aus und gib verständliche Meldungen aus."

---

### Projekt 77: Ticket-System (Ticket 77)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` mit den Feldern `titel: String` und `prioritaet: Prioritaet`. Definiere ein Struct `TicketSystem` mit dem Feld `tickets: HashMap<u32, Ticket>` zur Verwaltung der Tickets über eine eindeutige ID."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `TicketSystem`. Implementiere die Methode `ticket_erstellen(&mut self, id: u32, ticket: Ticket) -> Result<(), String>`, die ein `Err` zurückgibt, wenn die Ticket-ID bereits existiert. Implementiere die Methode `ticket_loesen(&mut self, id: u32) -> Result<Ticket, String>`, die das Ticket aus der Map entfernt und zurückgibt, oder ein `Err` wirft, falls die ID unbekannt ist."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge ein `TicketSystem` und erstelle zwei Tickets (z. B. ein dringendes Fehler-Ticket). Löse eines der Tickets erfolgreich auf und versuche danach, ein nicht existierendes Ticket mit einer ungültigen ID zu lösen. Behandle alle Fehler strukturiert mit `match` und gib passende Infos aus."

---

### Projekt 78: Paket-Tracker (Paket 78)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` mit den Feldern `zielort: String` und `status: PaketStatus`. Definiere ein Struct `PaketTracker` mit dem Feld `pakete: HashMap<String, Paket>`, wobei der Schlüssel der Tracking-Code ist."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `PaketTracker`. Implementiere die Methode `paket_registrieren(&mut self, code: String, paket: Paket) -> Result<(), String>`, die fehlschlägt, falls der Tracking-Code bereits existiert. Ergänze die Methode `status_aktualisieren(&mut self, code: &str, neuer_status: PaketStatus) -> Result<(), String>`, die den Status anpasst oder bei einem unbekannten Code ein `Err` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Instanziere den `PaketTracker`. Registriere ein Paket mit dem Code 'DE100' und aktualisiere seinen Status auf `Unterwegs`. Teste auch die Aktualisierung mit einem falschen Code. Verwende Pattern Matching zur Anzeige der Fehlermeldungen und Erfolge."

---

### Projekt 79: Fahrzeug-Klasse (Fahrzeug 79)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` mit den Feldern `marke: String` und `typ: FahrzeugTyp`. Definiere ein Struct `Fuhrpark` mit dem Feld `fahrzeuge: HashMap<String, Fahrzeug>`, das Kennzeichen auf Fahrzeuge abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Fuhrpark`. Implementiere die Methode `fahrzeug_aufnehmen(&mut self, kennzeichen: String, fahrzeug: Fahrzeug) -> Result<(), String>`, die ein `Err` erzeugt, falls das Kennzeichen bereits registriert ist. Implementiere die Methode `maut_berechnen(&self, kennzeichen: &str) -> Result<f64, String>`, die für das gefundene Fahrzeug die Maut berechnet (Motorrad: 2.0, Auto: 5.0, Lkw: 12.0) oder ein `Err` zurückgibt, wenn das Kennzeichen fehlt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Initialisiere den `Fuhrpark` und füge ein Auto und einen Lkw hinzu. Rufe die Mautberechnung für beide auf und teste die Berechnung für ein nicht registriertes Kennzeichen. Verwende `match` zur Auswertung."

---

### Projekt 80: Mitarbeiter-Rolle (Mitarbeiter 80)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` mit den Feldern `name: String` und `rolle: Rolle`. Definiere ein Struct `MitarbeiterVerwaltung` mit dem Feld `mitarbeiter: HashMap<u32, Mitarbeiter>`, das IDs auf Mitarbeiter abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `MitarbeiterVerwaltung`. Implementiere die Methode `mitarbeiter_hinzufuegen(&mut self, id: u32, m: Mitarbeiter) -> Result<(), String>`, die bei einer ID-Kollision ein `Err` zurückgibt. Implementiere die Methode `hat_schreibrechte(&self, id: u32) -> Result<bool, String>`, die `Ok(true)` für `Admin` und `Entwickler` und `Ok(false)` für `Gast` zurückgibt. Sollte die ID fehlen, wird ein `Err` zurückgegeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `MitarbeiterVerwaltung` und füge zwei Mitarbeiter mit verschiedenen Rollen hinzu. Prüfe deren Schreibrechte und teste die Abfrage einer nicht existierenden ID. Werte alle Resultate mit Pattern Matching aus."

---

### Projekt 81: Status-Manager (Fernseher 81)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FernseherStatus` mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Fernseher` mit den Feldern `modell: String` und `status: FernseherStatus`. Definiere ein Struct `FernseherManager` mit einem Feld `fernseher: HashMap<String, Fernseher>`, wobei der Schlüssel der Standort des Fernsehers ist."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `FernseherManager`. Implementiere die Methode `fernseher_hinzufuegen(&mut self, standort: String, tv: Fernseher) -> Result<(), String>`, die fehlschlägt, wenn an diesem Standort bereits ein Fernseher registriert ist. Implementiere die Methode `status_aendern(&mut self, standort: &str, neuer_status: FernseherStatus) -> Result<(), String>`, die den Status anpasst oder bei unbekanntem Standort ein `Err` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Instanziere den `FernseherManager`. Registriere einen Fernseher in der 'Kueche' und einen im 'Wohnzimmer'. Ändere den Status des Küchen-TVs auf `Standby`. Teste eine Statusänderung für ein nicht vorhandenes Gerät ('Garten') und behandle die `Result`-Typen mit `match`."

---

### Projekt 82: Ticket-System (Ticket 82)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `SupportKategorie` mit den Werten `Hardware`, `Software`, `Netzwerk`. Definiere ein Struct `SupportTicket` mit den Feldern `kunde: String` und `kategorie: SupportKategorie`. Definiere ein Struct `SupportCenter` mit dem Feld `tickets: HashMap<u32, SupportTicket>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `SupportCenter`. Implementiere die Methode `ticket_eintragen(&mut self, id: u32, ticket: SupportTicket) -> Result<(), String>`, die fehlschlägt, falls die ID bereits vergeben ist. Implementiere die Methode `ticket_schliessen(&mut self, id: u32) -> Result<SupportTicket, String>`, die das Ticket aus der Map entfernt und zurückgibt, oder bei einer unbekannten ID ein `Err` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge ein `SupportCenter`, trage Tickets für Software- und Netzwerkprobleme ein und schließe eines der Tickets. Behandle das gefundene Ticket sowie einen Fehlerfall mit einer ungültigen ID sauber im Hauptprogramm."

---

### Projekt 83: Paket-Tracker (Paket 83)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `LogistikStatus` mit den Werten `Sortierung`, `Zustellfahrzeug`, `Abholstation`. Definiere ein Struct `ExpressPaket` mit den Feldern `empfaenger: String` und `status: LogistikStatus`. Definiere ein Struct `ExpressTracker` mit dem Feld `pakete: HashMap<String, ExpressPaket>`, das Sendungsnummern auf Express-Pakete abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `ExpressTracker`. Implementiere die Methode `express_einbuchen(&mut self, code: String, paket: ExpressPaket) -> Result<(), String>`, die bei bereits vergebenem Code ein `Err` zurückgibt. Implementiere die Methode `status_abfragen(&self, code: &str) -> Result<LogistikStatus, String>`, die den aktuellen Logistik-Status zurückgibt oder fehlschlägt, wenn die Sendung nicht existiert."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `ExpressTracker`, buche ein Express-Paket mit dem Code 'EXP-99' ein und frage dessen Status ab. Teste auch das Verhalten bei der Abfrage einer ungültigen Sendungsnummer. Gib die Ergebnisse verständlich auf der Konsole aus."

---

### Projekt 84: Fahrzeug-Klasse (Fahrzeug 84)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Antriebsart` mit den Werten `Benzin`, `Diesel`, `Elektro`. Definiere ein Struct `MietWagen` mit den Feldern `modell: String`, `antrieb: Antriebsart` und `verfuegbar: bool`. Definiere ein Struct `Autovermietung` mit dem Feld `autos: HashMap<String, MietWagen>`, das Kennzeichen auf Mietwagen abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Autovermietung`. Implementiere die Methode `auto_einstellen(&mut self, kennzeichen: String, wagen: MietWagen) -> Result<(), String>`, die fehlschlägt, wenn das Auto bereits vorhanden ist. Implementiere die Methode `auto_mieten(&mut self, kennzeichen: &str) -> Result<(), String>`, die das Auto sucht, die Verfügbarkeit prüft, `verfuegbar` auf `false` setzt oder andernfalls ein `Err` zurückgibt (wenn nicht verfuegbar oder nicht existent)."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Initialisiere die `Autovermietung` und stelle ein Elektroauto ein. Versuche, dieses Auto anzumieten, und miete es danach ein zweites Mal an. Teste auch die Miete eines unbekannten Kennzeichens und werte die Rückgabewerte aus."

---

### Projekt 85: Mitarbeiter-Rolle (Mitarbeiter 85)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Abteilung` mit den Werten `IT`, `HR`, `Vertrieb`. Definiere ein Struct `TeamMitglied` mit den Feldern `name: String` und `abteilung: Abteilung`. Definiere ein Struct `UnternehmensStruktur` mit dem Feld `mitglieder: HashMap<u32, TeamMitglied>`, das IDs auf Teammitglieder abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `UnternehmensStruktur`. Implementiere die Methode `mitglied_hinzufuegen(&mut self, id: u32, m: TeamMitglied) -> Result<(), String>`, die bei einer doppelten ID fehlschlägt. Implementiere die Methode `abteilung_wechseln(&mut self, id: u32, neue_abteilung: Abteilung) -> Result<(), String>`, die das Mitglied sucht und seine Abteilung anpasst, oder andernfalls ein `Err` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `UnternehmensStruktur`, füge ein Teammitglied zur IT hinzu und lasse diese Person in den Vertrieb wechseln. Simuliere einen Fehlerfall bei der Zuweisung einer ungültigen ID und werte die Ergebnisse mit `match` aus."

---

### Projekt 86: Status-Manager (Drucker 86)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `DruckerStatus` mit den Werten `Bereit`, `Beschaeftigt`, `KeinPapier`. Definiere ein Struct `Drucker` mit den Feldern `modell: String` und `status: DruckerStatus`. Definiere ein Struct `DruckerNetzwerk` mit dem Feld `drucker: HashMap<String, Drucker>`, das Namen auf Drucker-Objekte abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `DruckerNetzwerk`. Implementiere die Methode `drucker_registrieren(&mut self, name: String, d: Drucker) -> Result<(), String>`, die bei Namenskonflikten fehlschlägt. Implementiere die Methode `status_aendern(&mut self, name: &str, neuer_status: DruckerStatus) -> Result<(), String>`, die den Status anpasst oder bei unbekanntem Druckernamen ein `Err` liefert."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Initialisiere das `DruckerNetzwerk`. Registriere einen Drucker 'Office-EG' und ändere seinen Status auf `KeinPapier`. Versuche die Statusänderung an einem unregistrierten Drucker und werte die Ergebnisse mit Pattern Matching aus."

---

### Projekt 87: Ticket-System (Ticket 87)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FehlerKlasse` mit den Werten `Kritisch`, `Kosmetisch`, `FeatureWunsch`. Definiere ein Struct `BugReport` mit den Feldern `modul: String` und `klasse: FehlerKlasse`. Definiere ein Struct `BugTracker` mit dem Feld `reports: HashMap<u32, BugReport>`, das IDs auf BugReports abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `BugTracker`. Implementiere die Methode `report_hinzufuegen(&mut self, id: u32, report: BugReport) -> Result<(), String>`, die fehlschlägt, falls die ID bereits vergeben ist. Implementiere die Methode `report_schliessen(&mut self, id: u32) -> Result<BugReport, String>`, die den Report entfernt und zurückgibt, oder bei ungültiger ID ein `Err` wirft."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `BugTracker` und füge zwei Reports hinzu. Schließe einen der Reports und teste das Verhalten bei dem Versuch, einen nicht existierenden Report zu schließen. Verwende `match` zur Fehlerbehandlung."

---

### Projekt 88: Paket-Tracker (Paket 88)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `VersandTyp` mit den Werten `Standard`, `Express`, `Brief`. Definiere ein Struct `Sendung` (mit dem Feld `typ: VersandTyp` und `aktueller_ort: String`). Definiere ein Struct `SendungsManager` mit dem Feld `sendungen: HashMap<String, Sendung>`, das Tracking-Codes auf Sendungen abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `SendungsManager`. Implementiere die Methode `sendung_einbuchen(&mut self, code: String, s: Sendung) -> Result<(), String>`, die ein `Err` zurückgibt, wenn der Code bereits existiert. Implementiere die Methode `ort_aktualisieren(&mut self, code: &str, neuer_ort: String) -> Result<(), String>`, die den Aufenthaltsort einer Sendung anpasst oder bei unbekanntem Code fehlschlägt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `SendungsManager` und buche ein Express-Paket mit Code 'EXP-555' und aktuellem Ort 'Muenchen' ein. Aktualisiere den Ort auf 'Nürnberg'. Behandle einen Fehler bei einem ungültigen Code sauber im Code."

---

### Projekt 89: Fahrzeug-Klasse (Fahrzeug 89)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `ServiceStatus` mit den Werten `Inspektion`, `Reparatur`, `Bereit`. Definiere ein Struct `WerkstattFahrzeug` mit den Feldern `besitzer: String` und `status: ServiceStatus`. Definiere ein Struct `Werkstatt` mit dem Feld `auftraege: HashMap<String, WerkstattFahrzeug>`, das Kennzeichen auf Werkstattfahrzeuge abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Werkstatt`. Implementiere die Methode `fahrzeug_aufnehmen(&mut self, kennzeichen: String, fahrzeug: WerkstattFahrzeug) -> Result<(), String>`, die fehlschlägt, wenn das Kennzeichen bereits registriert ist. Implementiere die Methode `service_beenden(&mut self, kennzeichen: &str) -> Result<(), String>`, die den Status des Fahrzeugs auf `Bereit` setzt, oder ein `Err` zurückgibt, wenn das Fahrzeug nicht gefunden wird."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `Werkstatt`, nimm ein Auto auf, das eine `Reparatur` benötigt, und schließe den Service erfolgreich ab. Teste auch die Fertigstellung für ein Auto, das sich nicht in der Werkstatt befindet."

---

### Projekt 90: Mitarbeiter-Rolle (Mitarbeiter 90)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `VertragsTyp` mit den Werten `Festangestellt`, `Freiberufler`, `Praktikant`. Definiere ein Struct `MitarbeiterVertrag` mit den Feldern `name: String`, `vertrag: VertragsTyp` und `gehalt: u32`. Definiere ein Struct `PersonalAbteilung` mit dem Feld `datenbank: HashMap<u32, MitarbeiterVertrag>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `PersonalAbteilung`. Implementiere die Methode `vertrag_erfassen(&mut self, id: u32, mv: MitarbeiterVertrag) -> Result<(), String>`, die fehlschlägt, falls ein Vertrag mit dieser ID bereits existiert. Implementiere die Methode `gehalt_auszahlen(&self, id: u32) -> Result<u32, String>`, die das Gehalt des Mitarbeiters zurückgibt, oder ein `Err` erzeugt, falls die ID unbekannt ist."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `PersonalAbteilung`, erfasse zwei Verträge und zahle das Gehalt für einen Mitarbeiter aus. Simuliere das Auszahlen bei einem nicht existierenden Vertrag und werte die Rückgabewerte mittels `match` aus."

---

### Projekt 91: Status-Manager (Lichtleiste 91)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `LichtStatus` mit den Werten `An(u8)` (wobei der `u8`-Parameter die Helligkeit von 0 bis 100 darstellt) und `Aus`. Definiere ein Struct `Lichtleiste` mit den Feldern `modell: String` und `status: LichtStatus`. Definiere ein Struct `BeleuchtungsSteuerung` mit dem Feld `lichtleisten: HashMap<String, Lichtleiste>`, wobei der Schlüssel der Raumname ist."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `BeleuchtungsSteuerung`. Implementiere die Methode `lichtleiste_hinzufuegen(&mut self, raum: String, leiste: Lichtleiste) -> Result<(), String>`, die bei bereits existierenden Räumen fehlschlägt. Implementiere die Methode `helligkeit_abrufen(&self, raum: &str) -> Result<u8, String>`, die bei aktivem Licht den Helligkeitswert zurückgibt, oder bei ausgeschaltetem Licht bzw. nicht existierendem Raum ein `Err` liefert."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Initialisiere die `BeleuchtungsSteuerung`. Registriere eine Lichtleiste im 'Flur' (ausgeschaltet) und eine im 'Bad' (eingeschaltet mit 80% Helligkeit). Rufe die Helligkeit für beide Räume und einen nicht existierenden Raum ab und werte die Resultate sicher mit Pattern Matching aus."

---

### Projekt 92: Ticket-System (Ticket 92)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `ReservierungsStatus` mit den Werten `Bestaetigt`, `Warteliste`, `Storniert`. Definiere ein Struct `Reservierung` mit den Feldern `gastname: String`, `personen_anzahl: u32` und `status: ReservierungsStatus`. Definiere ein Struct `ReservierungsSystem` mit dem Feld `buchungen: HashMap<u32, Reservierung>`, das Buchungsnummern auf Reservierungen abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `ReservierungsSystem`. Implementiere die Methode `reservieren(&mut self, id: u32, res: Reservierung) -> Result<(), String>`, die ein `Err` zurückgibt, wenn die Buchungsnummer bereits vergeben ist. Implementiere die Methode `status_aktualisieren(&mut self, id: u32, neuer_status: ReservierungsStatus) -> Result<(), String>`, die den Status anpasst oder bei unbekannter Buchungsnummer fehlschlägt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge ein `ReservierungsSystem`. Trage zwei Reservierungen ein und aktualisiere den Status einer Buchung auf `Storniert`. Teste die Aktualisierung mit einer ungültigen Nummer und gib die Fehlermeldungen verständlich auf der Konsole aus."

---

### Projekt 93: Paket-Tracker (Paket 93)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `LieferStatus` mit den Werten `InVorbereitung`, `InZustellung`, `Erfolgreich`. Definiere ein Struct `Lieferung` mit den Feldern `adresse: String`, `fahrer: String` und `status: LieferStatus`. Definiere ein Struct `LieferDienst` mit dem Feld `auftraege: HashMap<String, Lieferung>`, das Liefer-IDs auf Lieferungen abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `LieferDienst`. Implementiere die Methode `lieferung_erstellen(&mut self, id: String, l: Lieferung) -> Result<(), String>`, die fehlschlägt, falls die ID bereits vorhanden ist. Implementiere die Methode `fahrer_zuweisen(&mut self, id: &str, fahrer_name: String) -> Result<(), String>`, die den Fahrer einer Lieferung anpasst, oder bei ungültiger ID ein `Err` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `LieferDienst` und erstelle eine neue Lieferung. Weise dieser Lieferung erfolgreich einen Fahrer zu und simuliere eine Zuweisung zu einer falschen Liefer-ID. Werte alle Ausgänge sauber mit Pattern Matching aus."

---

### Projekt 94: Fahrzeug-Klasse (Fahrzeug 94)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `ParkplatzTyp` mit den Werten `Normal`, `Elektro`, `Behindert`. Definiere ein Struct `ParkplatzFahrzeug` mit den Feldern `marke: String` und `bedarf: ParkplatzTyp`. Definiere ein Struct `SmarterParkplatz` mit dem Feld `belegung: HashMap<String, ParkplatzFahrzeug>`, das Kennzeichen auf parkende Fahrzeuge abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `SmarterParkplatz`. Implementiere die Methode `fahrzeug_parken(&mut self, kennzeichen: String, fahrzeug: ParkplatzFahrzeug) -> Result<(), String>`, die fehlschlägt, wenn das Kennzeichen bereits registriert ist. Implementiere die Methode `ausparken(&mut self, kennzeichen: &str) -> Result<ParkplatzFahrzeug, String>`, die das Fahrzeug aus der Map entfernt und zurückgibt, oder bei unbekanntem Kennzeichen ein `Err` liefert."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `SmarterParkplatz` und parke ein Fahrzeug. Führe danach den Ausparkprozess für dieses Kennzeichen durch und versuche anschließend, ein Fahrzeug auszulagern, das gar nicht parkt. Gib die Fehlermeldungen auf der Konsole aus."

---

### Projekt 95: Mitarbeiter-Rolle (Mitarbeiter 95)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `SchichtTyp` mit den Werten `Fruehschicht`, `Spaetschicht`, `Nachtschicht`. Definiere ein Struct `SchichtMitarbeiter` mit den Feldern `name: String` und `schicht: SchichtTyp`. Definiere ein Struct `SchichtPlaner` mit dem Feld `plan: HashMap<u32, SchichtMitarbeiter>`, das IDs auf Schichtarbeiter abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `SchichtPlaner`. Implementiere die Methode `mitarbeiter_einteilen(&mut self, id: u32, m: SchichtMitarbeiter) -> Result<(), String>`, die ein `Err` zurückgibt, falls die ID bereits vergeben ist. Implementiere die Methode `schicht_wechseln(&mut self, id: u32, neue_schicht: SchichtTyp) -> Result<(), String>`, die den Mitarbeiter sucht und seine Schicht anpasst, oder bei unbekannter ID fehlschlägt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge einen `SchichtPlaner` und teile einen Mitarbeiter für die Frühschicht ein. Wechsle dessen Schicht danach in die Nachtschicht. Simuliere einen Fehlerfall bei der Zuweisung einer ungültigen ID und fange diesen mit Pattern Matching ab."

---

### Projekt 96: Status-Manager (Kamera 96)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `KameraModus` mit den Werten `Inaktiv`, `Aufzeichnung`, `Bewegungserkennung`. Definiere ein Struct `Kamera` mit den Feldern `bezeichnung: String` und `modus: KameraModus`. Definiere ein Struct `SicherheitsSystem` mit dem Feld `kameras: HashMap<String, Kamera>`, wobei der Schlüssel der Standort der Kamera ist."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `SicherheitsSystem`. Implementiere die Methode `kamera_registrieren(&mut self, standort: String, k: Kamera) -> Result<(), String>`, die fehlschlägt, falls an diesem Standort bereits eine Kamera registriert ist. Implementiere die Methode `modus_aendern(&mut self, standort: &str, neuer_modus: KameraModus) -> Result<(), String>`, die den Kamera-Modus anpasst oder bei unbekanntem Standort ein `Err` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Initialisiere das `SicherheitsSystem` und registriere Kameras im 'Eingang' und 'Garten'. Ändere den Modus der Eingangskamera auf `Aufzeichnung`. Teste auch die Änderung an einem nicht registrierten Standort ('Garage') und werte die Rückgabewerte aus."

---

### Projekt 97: Ticket-System (Ticket 97)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `BestellStatus` mit den Werten `Eingegangen`, `Verpackt`, `Versandt`. Definiere ein Struct `Bestellung` mit den Feldern `kunde: String`, `betrag: f64` und `status: BestellStatus`. Definiere ein Struct `BestellVerwaltung` mit dem Feld `bestellungen: HashMap<u32, Bestellung>`, das IDs auf Bestellungen abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `BestellVerwaltung`. Implementiere die Methode `bestellung_aufgeben(&mut self, id: u32, b: Bestellung) -> Result<(), String>`, die bei bereits existierender ID fehlschlägt. Implementiere die Methode `naechster_schritt(&mut self, id: u32) -> Result<BestellStatus, String>`, die den Status einer Bestellung zum nächsten Schritt weiterschaltet (`Eingegangen` -> `Verpackt` -> `Versandt`). Gib ein `Err` zurück, falls die ID unbekannt ist oder die Bestellung bereits `Versandt` wurde."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `BestellVerwaltung` und gib eine Bestellung auf. Schalte den Status der Bestellung zweimal weiter und versuche es danach ein drittes Mal. Teste auch die Abfrage einer nicht existierenden ID und zeige die Fehlermeldungen an."

---

### Projekt 98: Paket-Tracker (Paket 98)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `ZollStatus` mit den Werten `KeinZoll`, `Pruefung`, `Freigegeben`, `GebuehrenFaellig`. Definiere ein Struct `AuslandsPaket` mit den Feldern `herkunftsland: String`, `wert: f64` und `status: ZollStatus`. Definiere ein Struct `ZollTracker` mit dem Feld `pakete: HashMap<String, AuslandsPaket>`, das Sendungsnummern auf Auslandspakete abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `ZollTracker`. Implementiere die Methode `paket_anmelden(&mut self, code: String, p: AuslandsPaket) -> Result<(), String>`, die ein `Err` zurückgibt, wenn das Paket bereits registriert ist. Implementiere die Methode `zoll_pruefung_abschliessen(&mut self, code: &str) -> Result<ZollStatus, String>`, die den Status bei einem Paketwert über 150.0 Euro auf `GebuehrenFaellig` setzt, andernfalls auf `Freigegeben` (oder bei unbekanntem Code ein `Err` wirft)."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Initialisiere den `ZollTracker` und melde zwei Pakete an (eines mit Wert 50.0 Euro und eines mit Wert 200.0 Euro). Schließe die Zollprüfung für beide Pakete ab und teste auch einen ungültigen Sendungscode. Behandle die Fehler strukturiert."

---

### Projekt 99: Fahrzeug-Klasse (Fahrzeug 99)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `LadeZustand` mit den Werten `Ladet`, `Voll`, `Fehler`. Definiere ein Struct `EAuto` mit den Feldern `modell: String`, `batterie_kapazitaet: u32` (in kWh) und `ladung: u32` (in %). Definiere ein Struct `LadeStation` mit dem Feld `anschlusspunkte: HashMap<String, EAuto>`, das Kennzeichen an Anschlusspunkten registriert."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `LadeStation`. Implementiere die Methode `fahrzeug_anschliessen(&mut self, kennzeichen: String, auto: EAuto) -> Result<(), String>`, die fehlschlägt, falls der Anschlusspunkt bereits belegt (Kennzeichen vorhanden) is. Implementiere die Methode `lade_fortschritt(&self, kennzeichen: &str) -> Result<u32, String>`, die den aktuellen Ladestand in % ausgibt. Tritt ein `Fehler` auf oder ist das Fahrzeug nicht angeschlossen, soll ein `Err` zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `LadeStation`, schließe ein Elektrofahrzeug an und frage den Ladefortschritt ab. Simuliere auch die Abfrage an einem unbesetzten Anschlusspunkt und werte die Rückgabewerte aus."

---

### Projekt 100: Mitarbeiter-Rolle (Mitarbeiter 100)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `SicherheitsFreigabe` mit den Werten `Stufe1`, `Stufe2`, `Stufe3`. Definiere ein Struct `SicherheitsMitarbeiter` mit den Feldern `name: String` und `freigabe: SicherheitsFreigabe`. Definiere ein Struct `ZugangsKontrolle` mit dem Feld `datenbank: HashMap<u32, SicherheitsMitarbeiter>`, das IDs auf Sicherheitsmitarbeiter abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `ZugangsKontrolle`. Implementiere die Methode `mitarbeiter_registrieren(&mut self, id: u32, m: SicherheitsMitarbeiter) -> Result<(), String>`, die fehlschlägt, falls die ID bereits vorhanden ist. Implementiere die Methode `zutritt_gewaehren(&self, id: u32, erforderliche_stufe: SicherheitsFreigabe) -> Result<bool, String>`, die `Ok(true)` zurückgibt, wenn die Freigabestufe des Mitarbeiters mindestens der erforderlichen Stufe entspricht (wobei gilt: `Stufe3` > `Stufe2` > `Stufe1`), andernfalls `Ok(false)`. Wenn die ID nicht in der Datenbank existiert, wird ein `Err` zurückgegeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine `ZugangsKontrolle` und registriere zwei Mitarbeiter (z. B. einen mit `Stufe1` und einen mit `Stufe3`). Prüfe den Zutritt für beide an Kontrollpunkten, die `Stufe2` erfordern, und teste den Zutritt für eine unregistrierte ID. Gib das Ergebnis strukturiert aus."
