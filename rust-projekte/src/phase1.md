# Phase 1: Projektvorschläge für Einsteiger

Jedes Projekt übt **alle Grundlagen gleichzeitig**:

| Thema | Was du lernst |
|---|---|
| 🧱 Variablen & Datentypen | Zahlen, Texte, Mutabilität |
| 🔀 Kontrollfluss | `if/else`, `loop`, `while`, `for` |
| ⌨️ Benutzereingabe | Lesen von der Konsole, Konvertierung |
| 🧠 Ownership & Borrowing | Wer besitzt was? Referenzen nutzen |
| 📝 String vs. &str | Texte speichern, vergleichen, ausgeben |

> **Hinweis:** Alle Projekte werden ohne fertige Code-Vorschläge begleitet. Erarbeite die Lösung eigenständig!

---

## 🎮 Projekt 1: Zahlen raten

**Beschreibung:**
Das Programm denkt sich eine Zahl zwischen 1 und 100 aus. Der Spieler gibt Zahlen ein, bis er die richtige erraten hat. Nach jedem Versuch erscheint „zu groß" oder „zu klein". Am Ende wird die Anzahl der Versuche angezeigt.

**Themen:** Variablen, `loop`, Benutzereingabe, Konvertierung, Vergleich von Strings

---

## 🛒 Projekt 2: Einkaufsliste

**Beschreibung:**
Der Nutzer kann Artikel hinzufügen, alle anzeigen lassen oder das Programm beenden – alles über ein Textmenü. Am Ende wird die Gesamtanzahl der Artikel ausgegeben.

**Themen:** Variablen, `loop`, `match`, Benutzereingabe, Ownership beim Einfügen in eine Liste

---

## 🌡️ Projekt 3: Temperatur-Tagebuch

**Beschreibung:**
Der Nutzer gibt Temperaturen in Celsius ein (eine pro Tag). Das Programm speichert alle Werte und gibt am Ende Durchschnitt, Minimum und Maximum aus.

**Themen:** `f64`-Datentyp, `for`-Schleife, Benutzereingabe, Borrowing beim Auswerten der Liste

---

## 📊 Projekt 4: Noten-Auswertung

**Beschreibung:**
Der Schüler gibt seinen Namen und beliebig viele Noten ein. Das Programm berechnet den Durchschnitt und gibt eine Bewertung aus: „sehr gut", „gut", „befriedigend" oder „nicht bestanden".

**Themen:** `String` für Name, `f64` für Noten, `if/else`, Benutzereingabe, Borrowing

---

## 🔐 Projekt 5: Login-Simulator

**Beschreibung:**
Das Programm hat einen gespeicherten Nutzernamen und ein Passwort. Der Nutzer hat 3 Versuche. Bei Erfolg erscheint eine Begrüßung, sonst wird der Zugang gesperrt.

**Themen:** Variablen, Zähler, `while`-Schleife, Benutzereingabe, Vergleich von `String` mit `&str`

---

## ➕ Projekt 6: Taschenrechner

**Beschreibung:**
Der Nutzer gibt zwei Zahlen und eine Operation (`+`, `-`, `*`, `/`) ein. Das Programm berechnet und gibt das Ergebnis aus. Bei Division durch Null erscheint eine Fehlermeldung.

**Themen:** `f64`, `match`, Benutzereingabe, Konvertierung, `&str`-Vergleich

---

## 🌍 Projekt 7: Temperaturumrechner

**Beschreibung:**
Der Nutzer gibt eine Temperatur und die Einheit (`C`, `F` oder `K`) ein. Das Programm rechnet sie in die anderen beiden Einheiten um und gibt alle drei aus.

**Themen:** `f64`, `match`, Benutzereingabe, Konvertierung, `String` vs. `&str`

---

## 💪 Projekt 8: BMI-Rechner

**Beschreibung:**
Der Nutzer gibt Körpergröße (in Metern) und Gewicht (in Kilogramm) ein. Das Programm berechnet den BMI und gibt die Kategorie aus (Untergewicht, Normal, Übergewicht usw.).

**Themen:** `f64`, `if/else`, Benutzereingabe, Konvertierung, `&str` für Kategorienamen

---

## 🎯 Projekt 9: FizzBuzz

**Beschreibung:**
Gib die Zahlen 1 bis 100 aus. Bei Vielfachen von 3: „Fizz", bei Vielfachen von 5: „Buzz", bei beiden: „FizzBuzz".

**Themen:** `for`-Schleife, `if/else`, Modulo-Operator, `&str` für Ausgabe

---

## 🔢 Projekt 10: Primzahl-Prüfer

**Beschreibung:**
Der Nutzer gibt eine Zahl ein. Das Programm prüft, ob sie eine Primzahl ist, und gibt das Ergebnis aus.

**Themen:** `u64`-Datentyp, `for`-Schleife, `if/else`, Benutzereingabe, Konvertierung

---

## 📅 Projekt 11: Wochentag-Finder

**Beschreibung:**
Der Nutzer gibt ein Datum als Tag, Monat und Jahr ein. Das Programm berechnet, welcher Wochentag das war (z. B. Montag).

**Themen:** `u32`-Datentyp, Rechnen mit Zahlen, Benutzereingabe, `match` für Wochentagname

---

## 🎲 Projekt 12: Würfelspiel

**Beschreibung:**
Zwei Spieler würfeln abwechselnd (Zufallszahl 1–6). Der erste Spieler, der 21 Punkte erreicht oder überschreitet, verliert. Das Programm zeigt jeden Wurf an.

**Themen:** Variablen, Zufallszahlen, `loop`, Benutzereingabe (zum Fortfahren), `String`-Ausgabe

---

## 🏦 Projekt 13: Einfaches Bankkonto

**Beschreibung:**
Der Nutzer kann Geld einzahlen, abheben oder den Kontostand anzeigen lassen. Das Programm verhindert, dass das Konto ins Negative geht.

**Themen:** `f64`, `mut`, `loop`, Benutzereingabe, `if/else`, `&str` für Menüoptionen

---

## 🔤 Projekt 14: Wörter zählen

**Beschreibung:**
Der Nutzer gibt einen Satz ein. Das Programm zählt die Wörter, Zeichen und Vokale und gibt alles aus.

**Themen:** `String`, `&str`, `for`-Schleife über Zeichen, Benutzereingabe, Variablen

---

## 🔄 Projekt 15: Kollatz-Folge

**Beschreibung:**
Der Nutzer gibt eine positive Zahl ein. Das Programm berechnet die Kollatz-Folge (gerade → halbieren, ungerade → mal 3 plus 1) und gibt jeden Schritt aus, bis 1 erreicht ist.

**Themen:** `u64`, `while`-Schleife, `if/else`, Benutzereingabe, Konvertierung

---

## 📐 Projekt 16: Geometrie-Rechner

**Beschreibung:**
Der Nutzer wählt eine Form (Kreis, Rechteck, Dreieck) und gibt die Maße ein. Das Programm berechnet Fläche und Umfang.

**Themen:** `f64`, `match`, Benutzereingabe, Konvertierung, `&str` für Formnamen

---

## 🔡 Projekt 17: Palindrom-Prüfer

**Beschreibung:**
Der Nutzer gibt ein Wort ein. Das Programm prüft, ob es ein Palindrom ist (z. B. „Rentner"), und gibt das Ergebnis aus.

**Themen:** `String`, `&str`, Iteration über Zeichen, Benutzereingabe, `bool`

---

## 🎓 Projekt 18: Lernkarten-Quiz

**Beschreibung:**
Das Programm enthält 10 feste Frage-Antwort-Paare. Es stellt die Fragen nacheinander, liest die Antwort ein und gibt am Ende die Punktzahl aus.

**Themen:** Arrays oder Tuples, `for`-Schleife, Benutzereingabe, String-Vergleich, Zähler

---

## 📏 Projekt 19: Einheiten-Umrechner

**Beschreibung:**
Der Nutzer wählt eine Kategorie (Länge, Gewicht, Volumen) und gibt einen Wert mit Einheit ein. Das Programm rechnet in alle anderen Einheiten der Kategorie um.

**Themen:** `f64`, `match`, Benutzereingabe, `String` vs. `&str`, Variablen

---

## ⏱️ Projekt 20: Countdown-Timer

**Beschreibung:**
Der Nutzer gibt eine Anzahl von Sekunden ein. Das Programm zählt von dieser Zahl bis 0 herunter und gibt jeden Schritt aus. Am Ende erscheint „Zeit abgelaufen!".

**Themen:** `u32`, `for`-Schleife, Benutzereingabe, Konvertierung, `&str`-Ausgabe

---

## 🐍 Projekt 21: Schere-Stein-Papier

**Beschreibung:**
Der Nutzer spielt gegen das Programm (Zufallswahl). Das Spiel läuft so lange, bis einer von beiden 3 Runden gewonnen hat. Am Ende wird der Gesamtsieger angezeigt.

**Themen:** `match`, Zufallszahlen, `loop`, Benutzereingabe, Zähler, `String` vs. `&str`

---

## 📦 Projekt 22: Lagerverwaltung

**Beschreibung:**
Der Nutzer kann Artikel mit Name und Anzahl hinzufügen, die Anzahl ändern, einen Artikel entfernen oder alle anzeigen. Das Menü läuft in einer Schleife.

**Themen:** Variablen, `loop`, Benutzereingabe, Ownership beim Speichern, `String` für Namen

---

## 🎵 Projekt 23: Playlist-Manager

**Beschreibung:**
Der Nutzer kann Songs (als Text) zu einer Playlist hinzufügen, einen entfernen, alle anzeigen oder die Playlist mischen (zufällige Reihenfolge).

**Themen:** `String`, `Vec`, `loop`, Benutzereingabe, Ownership, Borrowing beim Anzeigen

---

## 🏋️ Projekt 24: Kalorienrechner

**Beschreibung:**
Der Nutzer gibt Mahlzeiten mit Kalorienanzahl ein. Das Programm summiert alle Kalorien und vergleicht sie mit einem Tagesziel. Es zeigt an, ob das Ziel über- oder unterschritten wurde.

**Themen:** `f64`, `loop`, Benutzereingabe, Konvertierung, `if/else`, Summierung

---

## 🗓️ Projekt 25: Altersrechner

**Beschreibung:**
Der Nutzer gibt sein Geburtsjahr ein. Das Programm berechnet das aktuelle Alter und gibt aus, in wie vielen Jahren der nächste runde Geburtstag (10, 20, 30 …) ist.

**Themen:** `u32`, Arithmetik, Benutzereingabe, `if/else`, Modulo

---

## 🔑 Projekt 26: Passwort-Generator

**Beschreibung:**
Der Nutzer gibt die gewünschte Länge des Passworts ein. Das Programm generiert ein zufälliges Passwort aus Buchstaben, Zahlen und Sonderzeichen und zeigt es an.

**Themen:** `String`, Zufallszahlen, `for`-Schleife, Benutzereingabe, Konvertierung

---

## 🧮 Projekt 27: Fakultät & Fibonacci

**Beschreibung:**
Der Nutzer wählt: Fakultät oder Fibonacci berechnen. Dann gibt er eine Zahl ein. Das Programm berechnet das Ergebnis und zeigt es an.

**Themen:** `u64`, `match`, `for`-Schleife, Benutzereingabe, Konvertierung, Variablen

---

## 🛤️ Projekt 28: Schritt-Zähler

**Beschreibung:**
Der Nutzer gibt täglich seine gelaufenen Schritte ein (für 7 Tage). Das Programm berechnet Gesamtschritte, Tagesdurchschnitt und den aktivsten Tag.

**Themen:** Arrays, `for`-Schleife, Benutzereingabe, Vergleiche, `usize`

---

## 💬 Projekt 29: Umgekehrter Satz

**Beschreibung:**
Der Nutzer gibt einen Satz ein. Das Programm gibt ihn rückwärts aus – einmal Zeichen für Zeichen, einmal Wort für Wort.

**Themen:** `String`, `&str`, Iteration, Benutzereingabe, Borrowing

---

## 🏆 Projekt 30: Punkte-Tabelle

**Beschreibung:**
Der Nutzer gibt Namen und Punkte von bis zu 5 Spielern ein. Das Programm sortiert die Spieler nach Punkten und gibt eine nummerierte Rangliste aus.

**Themen:** Arrays oder Tuples, `for`-Schleife, Sortierung, Benutzereingabe, `String`

---

## 🧩 Projekt 31: Wort-Verschlüsseler (Caesar)

**Beschreibung:**
Der Nutzer gibt einen Text und eine Verschiebungszahl ein. Das Programm verschlüsselt den Text mit der Caesar-Verschlüsselung und gibt das Ergebnis aus.

**Themen:** `String`, `char`, `for`-Schleife, Benutzereingabe, Arithmetik mit Zeichen

---

## 🌤️ Projekt 32: Wetter-Notizen

**Beschreibung:**
Der Nutzer gibt für jeden Tag der Woche eine Temperatur und eine Beschreibung (z. B. „sonnig") ein. Am Ende gibt das Programm eine Übersicht mit dem wärmsten und kältesten Tag aus.

**Themen:** `String`, `f64`, `for`-Schleife, Benutzereingabe, Vergleiche, Borrowing

---

## 🔢 Projekt 33: Zahlen-Statistik

**Beschreibung:**
Der Nutzer gibt beliebig viele Zahlen ein (bis „fertig"). Das Programm berechnet Summe, Durchschnitt, Minimum und Maximum.

**Themen:** `Vec<f64>`, `loop`, Benutzereingabe, Vergleiche, Borrowing beim Auswerten

---

## 🎪 Projekt 34: Wort-Häufigkeit

**Beschreibung:**
Der Nutzer gibt einen Satz ein. Das Programm zählt, wie oft jedes Wort vorkommt, und gibt alle Wörter mit ihrer Häufigkeit aus.

**Themen:** `String`, `&str`, Iteration, Benutzereingabe, Variablen, Vergleiche

---

## 📖 Projekt 35: Tagebuch-App

**Beschreibung:**
Der Nutzer kann Einträge mit Datum und Text hinzufügen oder alle bisherigen Einträge anzeigen. Das Programm läuft in einer Menü-Schleife.

**Themen:** `String`, `loop`, Benutzereingabe, Ownership beim Speichern, Borrowing beim Lesen

---

## 🚦 Projekt 36: Ampel-Simulator

**Beschreibung:**
Das Programm simuliert eine Ampel: Rot → Gelb → Grün → Gelb → Rot … Der Nutzer drückt Enter, um zur nächsten Phase zu wechseln. Nach 10 Zyklen endet das Programm.

**Themen:** `&str`, `loop`, Benutzereingabe, Zähler, `match`

---

## 📱 Projekt 37: Kontaktbuch

**Beschreibung:**
Der Nutzer kann Kontakte (Name + Telefonnummer) hinzufügen, nach einem Namen suchen oder alle anzeigen.

**Themen:** `String`, `Vec`, `loop`, Benutzereingabe, Ownership, Borrowing, String-Vergleich

---

## ⚖️ Projekt 38: Einheiten-Waage

**Beschreibung:**
Der Nutzer gibt ein Gewicht in Kilogramm ein. Das Programm rechnet es in Gramm, Pfund und Unzen um und zeigt alle Werte an.

**Themen:** `f64`, Benutzereingabe, Konvertierung, Ausgabe, Variablen

---

## 🎰 Projekt 39: Münzwurf-Simulation

**Beschreibung:**
Der Nutzer gibt an, wie oft eine Münze geworfen werden soll. Das Programm simuliert die Würfe und gibt aus, wie oft Kopf und wie oft Zahl erschienen ist.

**Themen:** Zufallszahlen, `for`-Schleife, Benutzereingabe, Konvertierung, Zähler

---

## 📝 Projekt 40: To-Do-Liste

**Beschreibung:**
Der Nutzer kann Aufgaben hinzufügen, als erledigt markieren oder alle offenen Aufgaben anzeigen. Das Programm läuft in einer Menü-Schleife.

**Themen:** `String`, `bool`, `Vec`, `loop`, Benutzereingabe, Ownership, Borrowing

---

## 🚀 Projekt 41: Raketenzünder

**Beschreibung:**
Der Nutzer gibt eine Startzahl (max. 100) ein. Das Programm zählt rückwärts und gibt bei 0 „Zündung!" aus. Bei jeder 10er-Stufe erscheint eine besondere Meldung.

**Themen:** `u32`, `for`-Schleife, `if/else`, Benutzereingabe, `&str`-Ausgabe

---

## 🐾 Projekt 42: Tier-Lexikon

**Beschreibung:**
Das Programm enthält Informationen zu 5 Tieren (Name + Beschreibung). Der Nutzer gibt einen Tiernamen ein und bekommt die passende Beschreibung – oder „nicht gefunden".

**Themen:** Arrays mit `&str`, `for`-Schleife, Benutzereingabe, String-Vergleich, `bool`

---

## 💡 Projekt 43: Rätsel-Spiel

**Beschreibung:**
Das Programm stellt 5 Rätsel (Texträtsel mit Freitext-Antwort). Der Nutzer hat pro Rätsel 2 Versuche. Am Ende gibt es eine Auswertung.

**Themen:** Arrays, `for`-Schleife, `while`/Zähler, Benutzereingabe, String-Vergleich

---

## 🏃 Projekt 44: Lauf-Tracker

**Beschreibung:**
Der Nutzer gibt für jeden Wochentag die gelaufenen Kilometer ein. Das Programm berechnet die Gesamtstrecke, den Tagesdurchschnitt und sagt, ob das Wochenziel (z. B. 30 km) erreicht wurde.

**Themen:** `f64`, Arrays, `for`-Schleife, Benutzereingabe, `if/else`, Summierung

---

## 🔍 Projekt 45: Duplikat-Finder

**Beschreibung:**
Der Nutzer gibt eine Liste von Wörtern ein (bis „fertig"). Das Programm findet alle Wörter, die mehr als einmal vorkommen, und gibt sie aus.

**Themen:** `String`, `Vec`, `for`-Schleife, Benutzereingabe, Vergleiche, Borrowing

---

## 🎭 Projekt 46: Stimmungs-Tagebuch

**Beschreibung:**
Der Nutzer gibt täglich eine Stimmung (1–10) und ein Stichwort ein. Das Programm speichert alle Einträge und gibt am Ende den Stimmungsdurchschnitt und den besten Tag aus.

**Themen:** `u8`, `String`, `Vec`, `loop`, Benutzereingabe, Vergleiche, Borrowing

---

## 🏠 Projekt 47: Mietkosten-Rechner

**Beschreibung:**
Der Nutzer gibt Kaltmiete, Nebenkosten und Stromkosten ein. Das Programm berechnet die Gesamtkosten pro Monat und pro Jahr und gibt an, wie hoch der Anteil jeder Kostenart ist.

**Themen:** `f64`, Benutzereingabe, Konvertierung, Arithmetik, Ausgabe, `&str`

---

## 🌱 Projekt 48: Pflanzenwachstum

**Beschreibung:**
Der Nutzer gibt an, wie groß eine Pflanze heute ist (in cm) und wie viel sie täglich wächst. Das Programm gibt aus, wann sie eine bestimmte Zielhöhe erreicht.

**Themen:** `f64`, `while`-Schleife, Benutzereingabe, Konvertierung, Zähler

---

## 📚 Projekt 49: Buch-Sammlung

**Beschreibung:**
Der Nutzer kann Buchtitel hinzufügen, einen Titel suchen, einen entfernen oder alle anzeigen. Das Menü läuft in einer Schleife.

**Themen:** `String`, `Vec`, `loop`, `match`, Benutzereingabe, Ownership, Borrowing

---

## 🧠 Projekt 50: Gedächtnis-Trainer

**Beschreibung:**
Das Programm zeigt dem Nutzer kurz eine Liste von 5 Wörtern, löscht sie dann vom Bildschirm und fragt ihn, welche Wörter er sich merken konnte. Am Ende gibt es eine Auswertung.

**Themen:** Arrays mit `&str`, `for`-Schleife, Benutzereingabe, String-Vergleich, Zähler

