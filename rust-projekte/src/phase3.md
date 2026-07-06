# Phase 3: Projektvorschläge für Einsteiger

In dieser Phase vertiefen wir die **Collections** (Datenstrukturen der Standardbibliothek) und die **Systematische Fehlerbehandlung** (Result & Option). Du wirst in jedem Projekt das Gelernte aus den Phasen 1 und 2 wiederholen (wie Structs, Enums und Pattern Matching) und diese um dynamische Speicherstrukturen und robusten Code erweitern.

### Was wir wiederholen:
| Thema | Was du lernst |
|---|---|
| 🧱 Grundlagen | Variablen, Datentypen, Kontrollfluss, Benutzereingabe |
| 🧠 Ownership & Borrowing | Wer besitzt Daten? Referenzen (`&` und `&mut`) |
| 📝 String vs. &str | Wandelbare Texte vs. feste Text-Slices |
| 📦 Structs & Methoden | Eigene Datentypen mit `impl`-Blöcken strukturieren |
| 🏷️ Enums & Pattern Matching | Feste Zustände abbilden und mit `match`/`if let` auswerten |

### Neue Themen (in JEDEM Projekt angewendet):
* **Collections (Standardbibliothek):** Nutze `Vec<T>` für dynamische Listen oder `HashMap<K, V>` für Schlüssel-Wert-Zuordnungen.
* **Systematische Fehlerbehandlung:** Nutze `Result<T, E>` für fehleranfällige Operationen und `Option<T>` für Werte, die fehlen können. Kehre Fehler sauber um, statt das Programm abstürzen zu lassen.

> **Hinweis:** Alle Projekte werden ohne fertige Code-Vorschläge begleitet. Erarbeite die Lösung eigenständig!

---

## 🏨 Projekt 1: Hotelzimmer-Verwaltung

**Beschreibung:**
Ein Programm zur Buchung von Hotelzimmern.
- Nutze ein **Struct** `Zimmer` mit Zimmernummer und Status.
- Nutze ein **Enum** `ZimmerStatus` (`Frei`, `Belegt`).
- Verwende einen **Vektor** `Vec<Zimmer>` zur Verwaltung aller Zimmer im Hotel.
- Implementiere eine **Methode** `zimmer_buchen(&mut self, nummer: u32) -> Result<(), String>`. Wenn das Zimmer bereits belegt ist oder nicht existiert, gib ein `Err` mit einer Fehlermeldung zurück, andernfalls buche das Zimmer und gib `Ok(())` zurück.

---

## 🛍️ Projekt 2: Warenkorb-System

**Beschreibung:**
Ein Warenkorb für einen Online-Shop.
- Verwende eine **`HashMap<String, u32>`** (Artikelname zu Anzahl) im `Warenkorb`-Struct.
- Schreibe eine **Methode** `artikel_entfernen(&mut self, name: &str, menge: u32) -> Result<(), String>`. 
- Nutze Pattern Matching, um zu prüfen, ob der Artikel existiert. Wenn die zu entfernende Menge größer als der Bestand ist oder der Artikel fehlt, gib ein `Err` zurück.

---

## 👥 Benutzer-Datenbank

**Beschreibung:**
Eine einfache Benutzerverwaltung für eine Anwendung.
- Erstelle ein **Struct** `User` mit Name und E-Mail-Adresse.
- Verwende eine **`HashMap<String, User>`** (Benutzername zu Benutzerdaten).
- Schreibe eine **Methode** `benutzer_suchen(&self, benutzername: &str) -> Option<&User>`.
- Das Programm soll `Some(&User)` zurückgeben, falls der Benutzer existiert, andernfalls `None`. Nutze `if let` im Hauptprogramm, um das Ergebnis sicher auszugeben.

---

## 📦 Projekt 4: Inventar- & Lagerverwaltung

**Beschreibung:**
Ein System zur Bestandskontrolle in einem Lager.
- Nutze ein **Enum** `LagerFehler` (z. B. `ArtikelNichtGefunden`, `ZuWenigBestand`).
- Verwende eine **`HashMap<String, u32>`** zur Speicherung der Artikel und deren Stückzahlen.
- Implementiere eine **Methode** `entnahme(&mut self, artikel: &str, anzahl: u32) -> Result<(), LagerFehler>`. Behandle die Fehler systematisch.

---

## 🏫 Projekt 5: Schüler- & Notenverwaltung

**Beschreibung:**
Eine Notenverwaltung für eine Schulklasse.
- Verwende eine **`HashMap<String, Vec<u32>>`** (Schülername zu einer Liste von Noten).
- Schreibe eine **Methode** `durchschnitt_berechnen(&self, name: &str) -> Result<f64, String>`.
- Gib ein `Err` zurück, falls der Schüler nicht existiert oder noch keine Noten eingetragen hat (verhindere Division durch Null!).

---

## 📝 Projekt 6: Deutsch-Englisch Wörterbuch

**Beschreibung:**
Ein Übersetzungswerkzeug für Vokabeln.
- Verwende eine **`HashMap<String, String>`** (deutsches Wort zu englischem Wort).
- Schreibe eine **Methode** `uebersetzen(&self, wort: &str) -> Result<String, String>`.
- Falls das Wort nicht im Wörterbuch ist, gib ein `Err("Wort nicht gefunden")` zurück.

---

## 🗳️ Projekt 7: Wahl-Auswertung

**Beschreibung:**
Ein Programm zur Stimmauszählung bei einer Wahl.
- Nutze eine **`HashMap<String, u32>`** (Kandidat zu Stimmenzahl).
- Schreibe eine **Methode** `gewinner_ermitteln(&self) -> Option<String>`.
- Die Methode ermittelt den Kandidaten mit den meisten Stimmen. Falls noch keine Stimmen abgegeben wurden (HashMap ist leer), gib `None` zurück, andernfalls `Some(Kandidatenname)`.

---

## 🚗 Projekt 8: Parkhaus-Manager

**Beschreibung:**
Verwalte die Belegung in einem Parkhaus.
- Erstelle ein **Struct** `Parkhaus` mit einem Vektor von Parkplätzen.
- Schreibe eine **Methode** `finde_freien_platz(&self) -> Option<usize>`, die den Index des ersten freien Platzes sucht.
- Schreibe eine **Methode** `parken(&mut self, kennzeichen: String) -> Result<usize, String>`, die den freien Platz belegt oder ein `Err("Parkhaus voll")` zurückgibt.

---

## 💬 Projekt 9: Status-Tracker für Chat-Nutzer

**Beschreibung:**
Verwalte den Online-Status von Benutzern in einem Chat.
- Nutze ein **Enum** `OnlineStatus` (`Online`, `Offline`, `Abwesend`).
- Verwende eine **`HashMap<String, OnlineStatus>`** (Benutzername zu Status).
- Implementiere eine **Methode** `status_aendern(&mut self, name: &str, neuer_status: OnlineStatus) -> Result<(), String>`. Gibt ein `Err` zurück, falls der Benutzername im System nicht registriert ist.

---

## 💰 Projekt 10: Einnahmen-Ausgaben-Rechner

**Beschreibung:**
Ein Haushaltsbuch zur Erfassung von Geldbewegungen.
- Nutze ein **Struct** `Transaktion` mit Betrag und Kategorie.
- Nutze ein **Enum** `TransaktionsTyp` (`Einnahme`, `Ausgabe`).
- Verwende einen **Vektor** `Vec<Transaktion>` zur Auflistung aller Einträge.
- Schreibe eine **Methode** `letzte_transaktion(&self) -> Option<&Transaktion>`, die den letzten Eintrag zurückgibt oder `None`, wenn noch keine Buchung vorgenommen wurde.
