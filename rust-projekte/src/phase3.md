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

## 👥 Projekt 3: Benutzer-Datenbank

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

---

## 📚 Projekt 11: Bibliotheks-Katalog

**Beschreibung:**
Ein System zur Verwaltung der Ausleihe von Büchern in einer kleinen Bibliothek.
- Nutze ein **Struct** `Buch` mit Titel und einem Ausleihstatus.
- Verwende eine **`HashMap<String, Buch>`** (ISBN-Nummer oder Buchtitel zu Buch-Daten).
- Implementiere eine **Methode** `buch_ausleihen(&mut self, titel: &str) -> Result<(), String>`. 
- Wenn das Buch bereits ausgeliehen ist oder nicht im Katalog existiert, gib ein `Err` mit einer entsprechenden Fehlermeldung zurück. Andernfalls setze den Status auf ausgeliehen und gib `Ok(())` zurück.

---

## 🏃 Projekt 12: Fitness-Tracker (Schritte-Log)

**Beschreibung:**
Ein Tracker zur Aufzeichnung deiner täglichen Schrittzahlen.
- Verwende eine **`HashMap<String, Vec<u32>>`** (Datum im Format "YYYY-MM-DD" zu einer Liste von gegangenen Schritten pro Aktivität an diesem Tag).
- Implementiere eine **Methode** `tages_durchschnitt(&self, datum: &str) -> Result<f64, String>`.
- Berechne den Durchschnitt aller Aktivitäten an dem Tag. Falls für das Datum kein Eintrag existiert oder die Liste der Schritte leer ist, gib ein `Err` zurück, um einen Laufzeitfehler (Division durch Null) zu vermeiden.

---

## 📦 Projekt 13: Paket-Verfolgung (Logistik)

**Beschreibung:**
Ein Verfolgungssystem für Postpakete.
- Nutze ein **Enum** `PaketStatus` mit den Zuständen `ImLager`, `InZustellung` und `Zugestellt`.
- Verwende eine **`HashMap<String, PaketStatus>`** (Sendungsnummer zu Paketstatus).
- Implementiere eine **Methode** `status_abfragen(&self, sendungsnummer: &str) -> Option<PaketStatus>`.
- Die Methode soll den aktuellen Status des Pakets zurückgeben. Nutze Pattern Matching im Hauptprogramm, um den Status übersichtlich auf Deutsch auszugeben oder eine Meldung anzuzeigen, falls das Paket unbekannt ist.

---

## 💳 Projekt 14: Bankkonto-Transaktionen

**Beschreibung:**
Verwalte die Kontobewegungen eines Bankkontos.
- Nutze ein **Struct** `Konto` mit Kontoinhaber und einem Vektor von Transaktionen.
- Verwende einen **Vektor** `Vec<f64>` zur Speicherung aller Einzahlungen (positive Werte) und Auszahlungen (negative Werte).
- Implementiere eine **Methode** `abheben(&mut self, betrag: f64) -> Result<f64, String>`.
- Die Methode darf die Auszahlung nur erlauben, wenn das Konto durch die Auszahlung nicht ins Minus gerät. Falls das Guthaben nicht ausreicht, gib ein `Err` zurück. Bei Erfolg gib den neuen Kontostand als `Ok(f64)` zurück.

---

## 🎬 Projekt 15: Kinosaal-Reservierung

**Beschreibung:**
Ein Reservierungssystem für Sitzplätze in einem Kinosaal.
- Verwende einen **Vektor** `Vec<bool>` im Struct `Kinosaal`, bei dem jeder Index einen Sitzplatz darstellt (wobei `true` für belegt und `false` für frei steht).
- Implementiere eine **Methode** `platz_reservieren(&mut self, sitz_index: usize) -> Result<(), String>`.
- Falls die Sitzplatznummer (Index) ungültig (außerhalb des Vektors) oder der Platz bereits belegt ist, gib ein `Err` mit einer genauen Erklärung zurück.

---

## 📋 Projekt 16: Todo-Liste mit Prioritäten

**Beschreibung:**
Eine To-Do-Liste, die Aufgaben nach Dringlichkeit sortiert.
- Nutze ein **Enum** `Prioritaet` mit den Werten `Hoch`, `Mittel` und `Niedrig`.
- Nutze ein **Struct** `Aufgabe` mit dem Aufgabentext und der Priorität.
- Verwende einen **Vektor** `Vec<Aufgabe>` zur Verwaltung aller Aufgaben.
- Implementiere eine **Methode** `naechste_wichtige_aufgabe(&self) -> Option<&Aufgabe>`, die die erste Aufgabe mit der Priorität `Hoch` sucht und zurückgibt. Falls keine dringende Aufgabe existiert, soll das Programm `None` zurückgeben.

---

## 🍳 Projekt 17: Rezept-Datenbank

**Beschreibung:**
Eine Rezeptverwaltung für die Küche.
- Verwende eine **`HashMap<String, Vec<String>>`** (Rezeptname zu einer Liste von Zutaten).
- Implementiere eine **Methode** `zutat_hinzufuegen(&mut self, rezept: &str, zutat: String) -> Result<(), String>`.
- Falls das Rezept nicht in der Datenbank existiert, gib ein `Err` zurück. Andernfalls füge die neue Zutat dem Vektor des Rezepts hinzu und gib `Ok(())` zurück.

---

## 🌡️ Projekt 18: Smart-Home Temperatur-Log

**Beschreibung:**
Ein Protokollierungssystem für Raumtemperaturen in einem Smart Home.
- Verwende eine **`HashMap<String, Vec<f64>>`** (Raumname zu einer Liste von gemessenen Temperaturen).
- Implementiere eine **Methode** `maximale_temperatur(&self, raum: &str) -> Result<f64, String>`.
- Finde die höchste gemessene Temperatur im angegebenen Raum. Falls der Raum nicht existiert oder keine Messwerte vorliegen, gib ein `Err` zurück.

---

## 🏆 Projekt 19: Highscore-Tabelle

**Beschreibung:**
Verwalte die Bestenliste eines Arcade-Spiels.
- Verwende eine **`HashMap<String, u32>`** (Spielername zu Punktzahl).
- Implementiere eine **Methode** `highscore_eintragen(&mut self, spieler: String, punkte: u32) -> Option<u32>`.
- Wenn der Spieler bereits existiert, überschreibe seinen Score nur, wenn die neuen Punkte höher sind als die alten, und gib den vorherigen Highscore in `Some` zurück. Falls er neu ist, trage ihn ein und gib `None` zurück.

---

## 🎟️ Projekt 20: Event-Registrierung

**Beschreibung:**
Ein Anmeldesystem für ein Event mit begrenzter Teilnehmerzahl.
- Verwende einen **Vektor** `Vec<String>` (Liste der angemeldeten Teilnehmernamen) in einem Struct `Event` mit einer maximalen Kapazitätsgrenze.
- Implementiere eine **Methode** `teilnehmer_registrieren(&mut self, name: String) -> Result<(), String>`.
- Falls das Event bereits ausgebucht ist oder der Teilnehmer bereits auf der Liste steht, gib ein `Err` zurück.

---

## 🚗 Projekt 21: Auto-Flottenmanager

**Beschreibung:**
Überwache den Tankfüllstand einer Fahrzeugflotte.
- Verwende eine **`HashMap<String, u32>`** (Kennzeichen zu Füllstand in Prozent, 0-100).
- Implementiere eine **Methode** `kraftstoff_nachtanken(&mut self, kennzeichen: &str, menge: u32) -> Result<(), String>`.
- Falls das Fahrzeug nicht in der Flotte existiert oder die Tankfüllung nach dem Tanken 100 % überschreiten würde, gib ein `Err` zurück.

---

## 🎵 Projekt 22: Musik-Playlist

**Beschreibung:**
Eine Wiedergabeliste für Songs.
- Nutze ein **Struct** `Song` mit Titel, Interpret und Dauer in Sekunden.
- Verwende einen **Vektor** `Vec<Song>` zur Speicherung der Playlist.
- Implementiere eine **Methode** `song_abspielen(&self, index: usize) -> Result<String, String>`.
- Gib den Titel und den Interpreten des Songs als formatierten String zurück. Falls der Index außerhalb des gültigen Bereichs liegt, gib ein `Err("Song-Index existiert nicht")` zurück.

---

## 🧠 Projekt 23: Vokabel-Trainer

**Beschreibung:**
Ein interaktiver Vokabeltrainer mit einer Fehlerstatistik.
- Nutze ein **Struct** `Vokabel` mit der Übersetzung und der Anzahl falscher Antworten.
- Verwende eine **`HashMap<String, Vokabel>`** (Deutsches Wort zu den Vokabel-Details).
- Implementiere eine **Methode** `antwort_pruefen(&mut self, wort: &str, eingabe: &str) -> Result<bool, String>`.
- Falls das Wort nicht existiert, gib ein `Err` zurück. Andernfalls vergleiche die Eingabe. Bei einer falschen Antwort erhöhe den Fehlerzähler der Vokabel im Struct und gib `Ok(false)` zurück. Bei Erfolg gib `Ok(true)` zurück.

---

## ✈️ Projekt 24: Flughafen-Flugplan

**Beschreibung:**
Ein Abflug- und Ankunftsboard für einen Flughafen.
- Nutze ein **Enum** `FlugStatus` mit den Zuständen `Planmaessig`, `Verspaetet`, `Storniert` und `Boarding`.
- Verwende eine **`HashMap<String, FlugStatus>`** (Flugnummer zu Status).
- Implementiere eine **Methode** `status_aktualisieren(&mut self, flugnummer: &str, neuer_status: FlugStatus) -> Result<(), String>`.
- Falls die Flugnummer nicht im Flugplan eingetragen ist, gib ein `Err` zurück.

---

## 🎓 Projekt 25: Kursanmeldung für Studierende

**Beschreibung:**
Verwalte die Zuweisung von Studierenden zu verschiedenen Universitätskursen.
- Verwende eine **`HashMap<String, Vec<u32>>`** (Kursname zu einer Liste von Matrikelnummern).
- Implementiere eine **Methode** `kurs_belegen(&mut self, kurs: &str, matrikelnummer: u32) -> Result<(), String>`.
- Setze ein Limit von maximal 3 Studierenden pro Kurs. Wenn der Kurs voll ist oder die Matrikelnummer bereits im Kurs registriert ist, gib ein `Err` zurück.

---

## 🛡️ Projekt 26: Chatroom-Moderation

**Beschreibung:**
Ein automatischer Filter für Nachrichten in einem Chatroom.
- Verwende einen **Vektor** `Vec<String>` für verbotene Wörter (Blacklist) und einen Vektor für gesperrte Benutzernamen.
- Implementiere eine **Methode** `nachricht_verarbeiten(&self, benutzer: &str, nachricht: &str) -> Result<String, String>`.
- Falls der Benutzer gesperrt ist, gib ein `Err` zurück. Falls die Nachricht ein verbotenes Wort enthält, gib ein `Err("Nachricht blockiert")` zurück. Andernfalls gib die Nachricht im `Ok` zurück.

---

## 🌐 Projekt 27: Webserver-Router

**Beschreibung:**
Ein vereinfachter Router, der HTTP-Pfaden entsprechende Handler-Namen zuweist.
- Verwende eine **`HashMap<String, String>`** (URL-Pfad wie z. B. `/ueber-uns` zu einem Handler-Namen wie `ueber_uns_page`).
- Implementiere eine **Methode** `route_aufloesen(&self, pfad: &str) -> Result<String, String>`.
- Falls der Pfad nicht existiert, gib ein `Err` mit einem simulierten "404 Not Found" Fehler zurück.

---

## ☕ Projekt 28: Café-Kassensystem

**Beschreibung:**
Ein einfaches Kassensystem zur Abrechnung von Kaffeespezialitäten.
- Verwende eine **`HashMap<String, f64>`** (Getränkename zu Preis).
- Implementiere eine **Methode** `bestellung_abrechnen(&self, bestellungen: &[String]) -> Result<f64, String>`.
- Berechne die Summe aller Preise der bestellten Getränke. Falls ein bestelltes Getränk nicht auf der Karte steht, brich ab und gib ein `Err` zurück.

---

## 📞 Projekt 29: Telefonbuch-Suche

**Beschreibung:**
Ein digitales Telefonbuch zum Suchen und Verwalten von Kontakten.
- Verwende eine **`HashMap<String, String>`** (Name zu Telefonnummer).
- Implementiere eine **Methode** `nummer_suchen(&self, name: &str) -> Option<&String>`.
- Die Methode soll die Telefonnummer zurückgeben, falls der Name existiert, andernfalls `None`. Nutze im Hauptprogramm Pattern Matching, um dem Nutzer ein passendes Feedback anzuzeigen.

---

## ⚡ Projekt 30: Smart-Meter Stromverbrauch

**Beschreibung:**
Ein System zur Aufzeichnung und zum Vergleich des monatlichen Stromverbrauchs.
- Verwende eine **`HashMap<String, f64>`** (Monatsname zu Verbrauch in kWh).
- Implementiere eine **Methode** `verbrauch_vergleichen(&self, monat_a: &str, monat_b: &str) -> Result<f64, String>`.
- Berechne den Unterschied im Verbrauch zwischen den beiden Monaten. Falls einer der Monate nicht erfasst wurde, gib ein `Err` zurück.

---

## 🐱 Projekt 31: Tierheim-Verwaltung

**Beschreibung:**
Verwalte die Aufnahme von Tieren in einem Tierheim.
- Nutze ein **Enum** `Tierart` (`Hund`, `Katze`, `Nager`, `Vogel`).
- Nutze ein **Struct** `Tier` mit Name, Tierart und Alter in Jahren.
- Verwende einen **Vektor** `Vec<Tier>` zur Verwaltung der Tiere.
- Implementiere eine **Methode** `aeltestes_tier_suchen(&self) -> Option<&Tier>`, die das älteste Tier im Heim zurückgibt. Falls das Tierheim leer ist, gib `None` zurück.

---

## 💊 Projekt 32: Apotheken-Lagerverwaltung

**Beschreibung:**
Ein System zur Bestandsprüfung rezeptfreier Medikamente.
- Verwende eine **`HashMap<String, u32>`** (Medikamentenname zu Lagerbestand).
- Implementiere eine **Methode** `medikament_abgeben(&mut self, name: &str, anzahl: u32) -> Result<(), String>`.
- Reduziere den Bestand um die gewünschte Anzahl. Falls das Medikament nicht existiert oder nicht genügend Packungen auf Lager sind, gib ein `Err` zurück.

---

## 🅿️ Projekt 33: Parkschein-Rechner

**Beschreibung:**
Berechne die Parkgebühren für Fahrzeuge in einer Kurzparkzone.
- Verwende eine **`HashMap<String, u32>`** (Kennzeichen zu Ankunftszeitpunkt in vollen Stunden ab Tagesbeginn, z. B. 8 für 08:00 Uhr).
- Implementiere eine **Methode** `gebuehr_berechnen(&self, kennzeichen: &str, abfahrtszeit: u32, stundensatz: f64) -> Result<f64, String>`.
- Berechne die Parkdauer (Abfahrtszeit minus Ankunftszeit) und multipliziere sie mit dem Stundensatz. Falls das Kennzeichen nicht registriert ist oder die Abfahrtszeit vor der Ankunftszeit liegt, gib ein `Err` zurück.

---

## 🔨 Projekt 34: Auktionsplattform-Gebote

**Beschreibung:**
Ein System zur Registrierung von Geboten für ein Auktionsgut.
- Nutze ein **Struct** `Gebot` mit dem Namen des Bieters und der gebotenen Summe.
- Verwende einen **Vektor** `Vec<Gebot>` im Struct `Auktion`, um den Verlauf aller Gebote zu protokollieren.
- Implementiere eine **Methode** `gebot_abgeben(&mut self, bieter: String, betrag: f64) -> Result<(), String>`.
- Ein neues Gebot darf nur akzeptiert werden, wenn es höher ist als das aktuell höchste Gebot. Andernfalls gib ein `Err` zurück.

---

## 📊 Projekt 35: Umfrage-Tool

**Beschreibung:**
Ein Werkzeug zur Auswertung von Kundenfeedback.
- Verwende eine **`HashMap<String, Vec<u32>>`** (Feedback-Kategorie wie z. B. "Service" zu einer Liste von Bewertungen von 1 bis 5 Sternen).
- Implementiere eine **Methode** `kategorie_durchschnitt(&self, kategorie: &str) -> Result<f64, String>`.
- Berechne den Notendurchschnitt für die angegebene Kategorie. Falls die Kategorie nicht existiert oder noch keine Bewertungen abgegeben wurden, gib ein `Err` zurück.

---

## 🖥️ Projekt 36: Server-Status-Monitor

**Beschreibung:**
Überwache den Betriebszustand mehrerer Netzwerkhosts.
- Nutze ein **Enum** `ServerStatus` mit den Werten `Online`, `Wartung` und `Offline`.
- Verwende eine **`HashMap<String, ServerStatus>`** (Server-IP-Adresse zu Status).
- Implementiere eine **Methode** `wartung_aktivieren(&mut self, ip: &str) -> Result<(), String>`.
- Setze den Serverstatus auf `Wartung`. Falls die IP-Adresse im System nicht bekannt ist, gib ein `Err` zurück.

---

## 📬 Projekt 37: E-Mail-Posteingang

**Beschreibung:**
Ein System zur Verwaltung eingegangener E-Mails.
- Nutze ein **Struct** `Email` mit Absender, Betreff und dem Status `gelesen` (Boolean).
- Verwende einen **Vektor** `Vec<Email>` zur Verwaltung deines Posteingangs.
- Implementiere eine **Methode** `als_gelesen_markieren(&mut self, index: usize) -> Result<(), String>`.
- Setze den Status der E-Mail am angegebenen Index auf gelesen. Falls der Index ungültig ist, gib ein `Err` zurück.

---

## 📋 Projekt 38: Kanban-Taskboard

**Beschreibung:**
Ein einfaches Kanban-Board zur Verwaltung von Software-Projekten.
- Verwende eine **`HashMap<String, Vec<String>>`** (Spaltenname wie "Todo", "In Arbeit", "Erledigt" zu einer Liste von Aufgabentiteln).
- Implementiere eine **Methode** `aufgabe_verschieben(&mut self, task: &str, von_spalte: &str, nach_spalte: &str) -> Result<(), String>`.
- Suche die Aufgabe in der Quellspalte, entferne sie und füge sie in die Zielspalte ein. Falls die Quell- oder Zielspalte oder die Aufgabe selbst nicht existiert, gib ein `Err` zurück.

---

## 🚚 Projekt 39: Waren-Lieferstatus

**Beschreibung:**
Bestätige den Erhalt von Lieferungen im Großhandel.
- Verwende eine **`HashMap<String, bool>`** (Bestellnummer zu einem Boolean, der angibt, ob die Lieferung abgeschlossen ist).
- Implementiere eine **Methode** `lieferung_bestaetigen(&mut self, bestellnummer: &str) -> Result<(), String>`.
- Setze den Status auf `true` (Geliefert). Falls die Bestellnummer nicht existiert oder die Bestellung bereits als geliefert markiert ist, gib ein `Err` zurück.

---

## 🔑 Projekt 40: Passwort-Tresor (Mock)

**Beschreibung:**
Ein sicherer Passwort-Manager zum Nachschlagen von Anmeldedaten.
- Verwende eine **`HashMap<String, String>`** (Dienstname wie z. B. "github.com" zu einem gehashten Passwort-String).
- Implementiere eine **Methode** `passwort_abrufen(&self, dienst: &str) -> Option<&String>`.
- Gib das Passwort des Dienstes zurück, falls es im Tresor vorhanden ist. Behandle den Fall eines nicht existierenden Eintrags im Hauptprogramm sicher mit einem `match` oder `if let`.

---

## ♟️ Projekt 41: Schachturnier-Ergebnisse

**Beschreibung:**
Verwalte die erzielten Punkte von Spielern bei einem Schachturnier.
- Verwende eine **`HashMap<String, f64>`** (Spielername zu Gesamtpunktzahl).
- Implementiere eine **Methode** `ergebnis_eintragen(&mut self, spieler: &str, punkte: f64) -> Result<(), String>`.
- Erhöhe die Punktzahl des Spielers um den Wert `punkte`. Es sind nur Turnierergebnisse von `0.0` (Niederlage), `0.5` (Remis) oder `1.0` (Sieg) erlaubt. Bei anderen Werten gib ein `Err` zurück.

---

## 📡 Projekt 42: IoT-Sensor-Netzwerk

**Beschreibung:**
Sammle Messwerte von verschiedenen im Haus verteilten IoT-Sensoren.
- Verwende eine **`HashMap<u32, Vec<f64>>`** (Sensor-ID zu einer Liste von gemessenen Sensorwerten).
- Implementiere eine **Methode** `letzter_messwert(&self, sensor_id: u32) -> Result<f64, String>`.
- Gib den neuesten (letzten) Messwert des angegebenen Sensors zurück. Falls der Sensor nicht existiert oder noch keine Messwerte gesendet hat, gib ein `Err` zurück.

---

## 🚨 Projekt 43: Sensor-Alarm-System

**Beschreibung:**
Ein System zur Schwellenwert-Überwachung von Messgeräten.
- Verwende eine **`HashMap<String, f64>`** (Sensorname zu Grenzwert) und eine **`HashMap<String, Vec<f64>>`** (Sensorname zu einer Liste von gemessenen Werten).
- Implementiere eine **Methode** `grenzwert_ueberschritten(&self, sensor: &str) -> Result<bool, String>`.
- Gib ein `Err` zurück, falls der Sensor nicht existiert oder noch keine Messdaten erfasst wurden. Gib andernfalls `Ok(true)` zurück, wenn mindestens einer der Messwerte über dem Grenzwert des Sensors liegt, ansonsten `Ok(false)`.

---

## 🛫 Projekt 44: Reisekosten-Abrechnung

**Beschreibung:**
Ein Tool zur Spesenabrechnung auf Geschäftsreisen.
- Nutze ein **Enum** `SpesenKategorie` (`Verpflegung`, `Unterkunft`, `Fahrtkosten`, `Sonstiges`).
- Nutze ein **Struct** `Spesenbeleg` mit dem Betrag und der Kategorie.
- Verwende einen **Vektor** `Vec<Spesenbeleg>` zur Auflistung aller Belege.
- Implementiere eine **Methode** `kategorie_summe(&self, kategorie: SpesenKategorie) -> f64`.
- Berechne die Summe aller Beträge, die der angegebenen Kategorie entsprechen, und gib diese zurück.

---

## 💎 Projekt 45: Inventar-Wert-Rechner

**Beschreibung:**
Kalkuliere den Gesamtwert aller Artikel in deinem Lager.
- Verwende eine **`HashMap<String, (u32, f64)>`** (Artikelname zu einem Tupel mit der Stückzahl und dem Einzelpreis).
- Implementiere eine **Methode** `gesamtwert_berechnen(&self) -> Result<f64, String>`.
- Berechne den Gesamtwert über alle Artikel (Stückzahl multipliziert mit Einzelpreis). Falls bei einem Artikel ein fehlerhafter, negativer Preis hinterlegt ist, brich ab und gib ein `Err` zurück.

---

## 🥜 Projekt 46: Rezept-Allergene-Filter

**Beschreibung:**
Prüfe Rezepte auf bestimmte Unverträglichkeiten.
- Verwende eine **`HashMap<String, Vec<String>>`** (Rezeptname zu einer Liste von enthaltenen Allergenen wie "Nüsse", "Gluten" etc.).
- Implementiere eine **Methode** `ist_sicher_fuer(&self, rezept: &str, allergene: &[String]) -> Result<bool, String>`.
- Falls das Rezept nicht existiert, gib ein `Err` zurück. Andernfalls gib `Ok(true)` zurück, wenn das Rezept keines der vom Benutzer angegebenen Allergene enthält, andernfalls `Ok(false)`.

---

## 🎫 Projekt 47: Support-Ticket-Warteschlange

**Beschreibung:**
Ein Ticketsystem, das Support-Tickets nach Dringlichkeit und Reihenfolge verarbeitet.
- Nutze ein **Enum** `Dringlichkeit` (`Normal`, `Kritisch`).
- Nutze ein **Struct** `Ticket` mit einer ID, der Problembeschreibung und der Dringlichkeit.
- Verwende einen **Vektor** `Vec<Ticket>` zur Abbildung der Warteschlange.
- Implementiere eine **Methode** `naechstes_ticket_bearbeiten(&mut self) -> Option<Ticket>`.
- Die Methode soll das älteste Ticket (den ersten Eintrag im Vektor) entfernen und zurückgeben. Falls die Warteschlange leer ist, gib `None` zurück.

---

## 📈 Projekt 48: ECTS-Notenschnitt-Rechner

**Beschreibung:**
Berechne den gewichteten Notendurchschnitt für Studierende an einer Hochschule.
- Verwende eine **`HashMap<String, Vec<(u32, u32)>>`** (Studentenname zu einer Liste von Tupeln aus `(Note, ECTS-Punkte)`).
- Implementiere eine **Methode** `durchschnitt_berechnen(&self, name: &str) -> Result<f64, String>`.
- Berechne den gewichteten Schnitt (Summe aus Note * ECTS geteilt durch die Summe aller ECTS-Points). Falls der Student nicht existiert oder keine ECTS-Punkte vorhanden sind, gib ein `Err` zurück.

---

## 🔌 Projekt 49: Smart-Home Geräte-Status

**Beschreibung:**
Überwache den Betriebsmodus von verbundenen Haushaltsgeräten.
- Nutze ein **Enum** `GeraeteZustand` (`An`, `Aus`, `Standby`).
- Verwende eine **`HashMap<String, GeraeteZustand>`** (Gerätename zu Zustand).
- Implementiere eine **Methode** `geraet_umschalten(&mut self, name: &str) -> Result<(), String>`.
- Schalte das Gerät von `An` auf `Aus`, von `Aus` auf `Standby` und von `Standby` auf `An` um. Falls das Gerät nicht registriert ist, gib ein `Err` zurück.

---

## 🗺️ Projekt 50: Paket-Routen-Planer

**Beschreibung:**
Bestimme den nächsten Lieferort einer Lieferroute.
- Verwende einen **Vektor** `Vec<String>` im Struct `Route` zur Speicherung der einzelnen Lieferstationen in ihrer richtigen Reihenfolge.
- Implementiere eine **Methode** `naechste_station(&self, aktuelle_station: &str) -> Option<&String>`.
- Die Methode soll die darauffolgende Station in der Liste zurückgeben. Falls die aktuelle Station die letzte Station ist oder sich nicht auf der Route befindet, gib `None` zurück.

