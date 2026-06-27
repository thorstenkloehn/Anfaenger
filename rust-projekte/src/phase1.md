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

