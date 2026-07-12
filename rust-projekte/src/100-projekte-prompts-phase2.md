# 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 2)
In diesem Kapitel erarbeitest du die 100 Projekte aus **Phase 2 (Eigene Datentypen: Structs, Enums und Pattern Matching)** Schritt für Schritt mithilfe von künstlicher Intelligenz (KI), ohne fertigen Code abzuschreiben.
Das Ziel ist das **passive Auffrischen** und aktive Verstehen der Modul- und Datenstrukturen in Rust.

---
## Jedes Projekt übt alle Grundlagen von Phase 2 gleichzeitig:
| Thema | Was du lernst |
| :--- | :--- |
| 📦 Structs & Methoden | Eigene Datenstrukturen entwerfen und mit `impl` logische Funktionen anhängen |
| 🏷️ Enums | Feste Zustände und Kategorien modellieren |
| 🔍 Pattern Matching | Strukturierter Kontrollfluss mit `match` (vollständig) und kompaktem `if let` |
---
## Der modulare Prompt-Katalog für alle 100 Projekte (Phase 2)
Hier findest du für jedes Projekt den genauen modularen Ablauf mit Präzisions-Prompts. Kopiere diese in den Chat mit deiner KI.

### Projekt 1: Ampelschaltung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `AmpelFarbe` (Enum für die Ampelphasen) mit den Werten `Rot`, `Gelb`, `Gruen`. Definiere ein Struct `Ampel` (Struct für die Ampel selbst) mit den Feldern: `id: i32`, `farbe: AmpelFarbe`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ampel`. Implementiere die `anzeigen` (Methode zum Anzeigen des aktuellen Status, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ampel` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 2: Temperatur-Warnung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Warnstufe` (Enum für die Warnstufe) mit den Werten `Normal`, `Warnung`, `Alarm`. Definiere ein Struct `Sensor` (Struct für den Temperatursensor) mit den Feldern: `bezeichnung: String`, `temperatur: f64`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Sensor`. Implementiere die `warnstufe` (Methode zur Bestimmung der Warnstufe, Parameter: `&self`, Rückgabetyp: `-> Warnstufe`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Sensor` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 3: Pizza-Größen

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PizzaGroesse` (Enum für die Pizzagrößen) mit den Werten `Klein`, `Mittel`, `Gross`. Definiere ein Struct `Pizza` (Struct für die Pizza) mit den Feldern: `name: String`, `groesse: PizzaGroesse`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Pizza`. Implementiere die `preis` (Methode zur Preisberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Pizza` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 4: Buch-Ausleihe

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `BuchStatus` (Enum für den Buchstatus) mit den Werten `Verfuegbar`, `Ausgeliehen`. Definiere ein Struct `Buch` (Struct für ein Buch) mit den Feldern: `titel: String`, `status: BuchStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Buch`. Implementiere die `ausleihen` (Methode zum Ausleihen, Parameter: `&mut self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Buch` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 5: Münz-Zähler

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Muenze` (Enum für Münzen) mit den Werten `Cent50`, `Euro1`, `Euro2`. Definiere ein Struct `Geldboerse` (Struct für die Geldbörse) mit den Feldern: `besitzer: String`, `wert: f64`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geldboerse`. Implementiere die `muenze_einwerfen` (Methode zum Hinzufügen einer Münze, Parameter: `&mut self, m: Muenze`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geldboerse` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 6: Kaffee-Bestellung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `KaffeeTyp` (Enum für Kaffeearten) mit den Werten `Espresso`, `Cappuccino`, `Latte`. Definiere ein Struct `Kaffee` (Struct für das Getränk) mit den Feldern: `typ: KaffeeTyp`, `extra_milch: bool`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Kaffee`. Implementiere die `preis` (Methode zur Preisermittlung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Kaffee` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 7: Benutzer-Rolle

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `AccountTyp` (Enum für den Kontotyp) mit den Werten `Premium`, `Standard`, `Gast`. Definiere ein Struct `User` (Struct für einen Benutzer) mit den Feldern: `name: String`, `account: AccountTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `User`. Implementiere die `speicher_limit_gb` (Methode zur Ermittlung des Speicherlimits, Parameter: `&self`, Rückgabetyp: `-> i32`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `User` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 8: Haustier-Fütterung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `HungerStatus` (Enum für den Hungerstatus) mit den Werten `Satt`, `Hungrig`, `SehrHungrig`. Definiere ein Struct `Haustier` (Struct für ein Haustier) mit den Feldern: `name: String`, `hunger: HungerStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Haustier`. Implementiere die `status_check` (Methode zur Statusprüfung, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Haustier` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 9: Spiel-Gegner

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GegnerTyp` (Enum für die Gegner-Klassen) mit den Werten `Ork`, `Goblin`, `Drache`. Definiere ein Struct `Gegner` (Struct für einen Spielgegner) mit den Feldern: `name: String`, `typ: GegnerTyp`, `leben: i32`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Gegner`. Implementiere die `basis_schaden` (Methode zur Schadensberechnung, Parameter: `&self`, Rückgabetyp: `-> i32`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Gegner` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 10: Paket-Zustellung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `SendungsStatus` (Enum für den Sendungsstatus) mit den Werten `Sortierung`, `Transport`, `Geliefert`. Definiere ein Struct `Paket` (Struct für ein Paket) mit den Feldern: `tracking_id: i32`, `status: SendungsStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `fortschritt` (Methode zur Fortschrittsanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 11: Status-Manager (Heizung 11)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 12: Ticket-System (Ticket 12)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 13: Paket-Tracker (Paket 13)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 14: Fahrzeug-Klasse (Fahrzeug 14)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 15: Mitarbeiter-Rolle (Mitarbeiter 15)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 16: Status-Manager (Kuehlschrank 16)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 17: Ticket-System (Ticket 17)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 18: Paket-Tracker (Paket 18)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 19: Fahrzeug-Klasse (Fahrzeug 19)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 20: Mitarbeiter-Rolle (Mitarbeiter 20)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 21: Status-Manager (Router 21)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 22: Ticket-System (Ticket 22)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 23: Paket-Tracker (Paket 23)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 24: Fahrzeug-Klasse (Fahrzeug 24)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 25: Mitarbeiter-Rolle (Mitarbeiter 25)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 26: Status-Manager (Klimaanlage 26)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 27: Ticket-System (Ticket 27)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 28: Paket-Tracker (Paket 28)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 29: Fahrzeug-Klasse (Fahrzeug 29)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 30: Mitarbeiter-Rolle (Mitarbeiter 30)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 31: Status-Manager (Fernseher 31)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 32: Ticket-System (Ticket 32)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 33: Paket-Tracker (Paket 33)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 34: Fahrzeug-Klasse (Fahrzeug 34)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 35: Mitarbeiter-Rolle (Mitarbeiter 35)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 36: Status-Manager (Drucker 36)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 37: Ticket-System (Ticket 37)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 38: Paket-Tracker (Paket 38)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 39: Fahrzeug-Klasse (Fahrzeug 39)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 40: Mitarbeiter-Rolle (Mitarbeiter 40)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 41: Status-Manager (Lichtleiste 41)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 42: Ticket-System (Ticket 42)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 43: Paket-Tracker (Paket 43)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 44: Fahrzeug-Klasse (Fahrzeug 44)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 45: Mitarbeiter-Rolle (Mitarbeiter 45)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 46: Status-Manager (Kamera 46)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 47: Ticket-System (Ticket 47)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 48: Paket-Tracker (Paket 48)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 49: Fahrzeug-Klasse (Fahrzeug 49)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 50: Mitarbeiter-Rolle (Mitarbeiter 50)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 51: Status-Manager (Waschmaschine 51)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 52: Ticket-System (Ticket 52)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 53: Paket-Tracker (Paket 53)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 54: Fahrzeug-Klasse (Fahrzeug 54)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 55: Mitarbeiter-Rolle (Mitarbeiter 55)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 56: Status-Manager (Geschirrspueler 56)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 57: Ticket-System (Ticket 57)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 58: Paket-Tracker (Paket 58)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 59: Fahrzeug-Klasse (Fahrzeug 59)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 60: Mitarbeiter-Rolle (Mitarbeiter 60)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 61: Status-Manager (Heizung 61)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 62: Ticket-System (Ticket 62)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 63: Paket-Tracker (Paket 63)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 64: Fahrzeug-Klasse (Fahrzeug 64)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 65: Mitarbeiter-Rolle (Mitarbeiter 65)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 66: Status-Manager (Kuehlschrank 66)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 67: Ticket-System (Ticket 67)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 68: Paket-Tracker (Paket 68)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 69: Fahrzeug-Klasse (Fahrzeug 69)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 70: Mitarbeiter-Rolle (Mitarbeiter 70)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 71: Status-Manager (Router 71)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 72: Ticket-System (Ticket 72)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 73: Paket-Tracker (Paket 73)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 74: Fahrzeug-Klasse (Fahrzeug 74)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 75: Mitarbeiter-Rolle (Mitarbeiter 75)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 76: Status-Manager (Klimaanlage 76)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 77: Ticket-System (Ticket 77)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 78: Paket-Tracker (Paket 78)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 79: Fahrzeug-Klasse (Fahrzeug 79)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 80: Mitarbeiter-Rolle (Mitarbeiter 80)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 81: Status-Manager (Fernseher 81)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 82: Ticket-System (Ticket 82)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 83: Paket-Tracker (Paket 83)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 84: Fahrzeug-Klasse (Fahrzeug 84)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 85: Mitarbeiter-Rolle (Mitarbeiter 85)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 86: Status-Manager (Drucker 86)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 87: Ticket-System (Ticket 87)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 88: Paket-Tracker (Paket 88)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 89: Fahrzeug-Klasse (Fahrzeug 89)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 90: Mitarbeiter-Rolle (Mitarbeiter 90)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 91: Status-Manager (Lichtleiste 91)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 92: Ticket-System (Ticket 92)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 93: Paket-Tracker (Paket 93)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 94: Fahrzeug-Klasse (Fahrzeug 94)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 95: Mitarbeiter-Rolle (Mitarbeiter 95)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 96: Status-Manager (Kamera 96)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteStatus` (Enum für den Status) mit den Werten `An`, `Aus`, `Standby`. Definiere ein Struct `Geraet` (Struct für das Gerät) mit den Feldern: `name: String`, `id: i32`, `status: GeraeteStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Geraet`. Implementiere die `status_zeigen` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Geraet` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 97: Ticket-System (Ticket 97)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Prioritaet` (Enum für die Priorität) mit den Werten `Niedrig`, `Mittel`, `Hoch`. Definiere ein Struct `Ticket` (Struct für das Ticket) mit den Feldern: `id: i32`, `titel: String`, `prioritaet: Prioritaet`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ticket`. Implementiere die `ist_dringend` (Methode zur Prioritätsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Ticket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 98: Paket-Tracker (Paket 98)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `PaketStatus` (Enum für den Paketstatus) mit den Werten `ImLager`, `Unterwegs`, `Zugestellt`. Definiere ein Struct `Paket` (Struct für das Paket) mit den Feldern: `id: i32`, `zielort: String`, `status: PaketStatus`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Paket`. Implementiere die `stationen_info` (Methode zur Statusanzeige, Parameter: `&self`, Rückgabetyp: ``). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Paket` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 99: Fahrzeug-Klasse (Fahrzeug 99)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `FahrzeugTyp` (Enum für den Fahrzeugtyp) mit den Werten `Auto`, `Motorrad`, `Lkw`. Definiere ein Struct `Fahrzeug` (Struct für das Fahrzeug) mit den Feldern: `hersteller: String`, `id: i32`, `typ: FahrzeugTyp`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Fahrzeug`. Implementiere die `maut_berechnen` (Methode zur Mautberechnung, Parameter: `&self`, Rückgabetyp: `-> f64`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Fahrzeug` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---

### Projekt 100: Mitarbeiter-Rolle (Mitarbeiter 100)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `Rolle` (Enum für die Benutzerrollen) mit den Werten `Admin`, `Entwickler`, `Gast`. Definiere ein Struct `Mitarbeiter` (Struct für einen Mitarbeiter) mit den Feldern: `id: i32`, `name: String`, `rolle: Rolle`. Eines der Felder soll das Enum nutzen."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Mitarbeiter`. Implementiere die `hat_schreibrechte` (Methode zur Berechtigungsprüfung, Parameter: `&self`, Rückgabetyp: `-> bool`). Nutze darin Pattern Matching (z. B. `match` oder `if let`), um den Zustand des Enums zu prüfen und entsprechend zu handeln."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für dieses Projekt. Erzeuge eine Instanz von `Mitarbeiter` mit Testwerten und rufe die implementierten Methoden auf. Stelle sicher, dass alle Ergebnisse verständlich auf der Konsole ausgegeben werden."

---
