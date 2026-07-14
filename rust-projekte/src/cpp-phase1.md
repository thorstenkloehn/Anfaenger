# Phase 1: Projektvorschläge für C++-Einsteiger

Jedes der folgenden Projekte bietet dir die Möglichkeit, **alle C++-Grundlagen gleichzeitig** in der Praxis anzuwenden:

| Thema | Was du lernst |
| :--- | :--- |
| **🧱 Variablen & Datentypen** | Ganzzahlen, Kommazahlen, Zeichen, `const` |
| **🔀 Kontrollfluss** | `if/else`, `switch-case`, `while`, `for` |
| **⌨️ Benutzereingabe** | Konsoleneingabe und -ausgabe über C++-Streams (`std::cin` & `std::cout`) |
| **🔗 Referenzen (Aliases)** | Übergabe von Variablen per Call-by-Reference mittels `Type&` |
| **📝 std::string & std::vector** | Dynamische Strings und mitwachsende Arrays komfortabel verwalten |

> [!NOTE]
> **Hinweis:** Alle Projektvorschläge sind bewusst ohne fertige Code-Lösungen aufgeführt. Erarbeite die Programme selbstständig, um das Gelernte nachhaltig zu festigen!

---

## 🎮 Projekt 1: Zahlen raten

**Beschreibung:**
Das Programm generiert eine Zufallszahl zwischen 1 und 100. Der Spieler gibt über die Konsole Tipps ab, bis er die richtige Zahl erraten hat. Nach jedem Versuch gibt das Programm einen Hinweis („Zu groß!“ oder „Zu klein!“). Am Ende wird ausgegeben, wie viele Versuche benötigt wurden.

**C++-Schwerpunkte:**
*   Nutzung von `int` für Werte und Zähler.
*   Eine `while`- oder `do-while`-Schleife für die Spielrunde.
*   Eingabe und Ausgabe über `std::cin` und `std::cout`.
*   Zufallszahlengenerierung mittels `<random>` (C++-Standard) oder klassisch über `<cstdlib>` und `<ctime>`.

---

## 💳 Projekt 2: Guthaben-Rechner (Call-by-Reference)

**Beschreibung:**
Entwirf ein einfaches, textbasiertes Menü für ein Bankkonto. Der Benutzer kann Geld einzahlen, Geld abheben oder den aktuellen Kontostand anzeigen lassen. Die Kontostand-Variable soll in `main` liegen. Jede Menüaktion (Einzahlen/Abheben) soll über eine separate Funktion abgewickelt werden, die den Kontostand direkt über eine **Referenz** (`double&`) modifiziert.

**C++-Schwerpunkte:**
*   Verwendung von `double` für präzise Geldbeträge.
*   Menüsteuerung über eine Schleife mit einer `switch-case`-Verzweigung.
*   Call-by-Reference: Funktionen erhalten das Original-Postfach über eine Referenz (z. B. `void einzahlen(double& saldo_ref)`).

---

## 🌡️ Projekt 3: Temperatur-Statistik (std::vector)

**Beschreibung:**
Der Benutzer gibt die Tagestemperaturen für eine Woche (7 Tage) ein. Das Programm speichert diese in einem `std::vector<double>`. Eine separate Funktion ermittelt anschließend die Durchschnittstemperatur, die niedrigste (Minimum) und die höchste Temperatur (Maximum). Der Vektor wird als Referenz an die Auswertefunktion übergeben.

**C++-Schwerpunkte:**
*   Nutzung von `std::vector<double>` zur Speicherung der Werte.
*   Eingabe und Verarbeitung mit `for`-Schleifen.
*   Übergabe des Vektors als konstante Referenz (`const std::vector<double>&`), da die Werte beim Auswerten nicht verändert werden müssen.

---

## 📊 Projekt 4: Noten-Auswertung mit Eingabestopp

**Beschreibung:**
Der Benutzer kann nacheinander Schulnoten (1 bis 6) eingeben. Die Noten werden in einem `std::vector<int>` gespeichert. Da der Vektor dynamisch ist, gibt es keine feste Obergrenze für die Anzahl der Noten. Die Eingabe endet vorzeitig, wenn der Benutzer `0` eingibt. Das Programm berechnet den Durchschnitt aller eingegebenen Noten und gibt diesen formatiert aus.

**C++-Schwerpunkte:**
*   Dynamisches Hinzufügen von Elementen mittels `.push_back()`.
*   Prüfung auf das Abbruchkriterium (`0`) und Nutzung von `.size()` zur Ermittlung der Anzahl.
*   Typkonvertierung beim Berechnen des Durchschnitts (Casten von `int` zu `double` oder `float`).

---

## 🔐 Projekt 5: Login-Simulator mit `std::string`

**Beschreibung:**
Ein Benutzername (z. B. `"admin"`) und ein Passwort (z. B. `"geheim"`) sind fest im Programm hinterlegt. Der Benutzer hat maximal 3 Versuche, sich anzumelden. Gibt er die richtigen Daten ein, wird er begrüßt. Nach dem 3. Fehlversuch wird das Programm gesperrt.

**C++-Schwerpunkte:**
*   Nutzung von `std::string` zur Speicherung von Texten.
*   Sicheres Einlesen von Strings mit `std::cin` oder `std::getline`.
*   Komfortabler Vergleich der Texte mit dem Standard-Operator `==`.

---

## ➕ Projekt 6: Taschenrechner mit Referenz-Ergebnis

**Beschreibung:**
Schreibe ein Programm, das zwei Zahlen und ein Rechenzeichen (`+`, `-`, `*`, `/`) einliest. Eine Berechnungsfunktion soll das Ergebnis ermitteln. Da Divisionen durch Null nicht erlaubt sind, soll die Funktion einen Fehlercode (`bool` für Erfolg/Fehler) per `return` zurückgeben. Das berechnete Ergebnis wird der Funktion stattdessen über eine **Referenz** übergeben und direkt in `main` modifiziert.

**C++-Schwerpunkte:**
*   Nutzung von `double` für präzise Berechnungen.
*   Referenz-Parameter als „Rückkanal“ für das Rechenergebnis.
*   Rückgabewert der Funktion dient ausschließlich dem Status-Check (Fehlerbehandlung).

---

## 📝 Projekt 7: Wort-Längen-Zähler (std::string & Range-based for)

**Beschreibung:**
Der Benutzer gibt ein einzelnes Wort in einen `std::string` ein. Das Programm zählt die Anzahl der Buchstaben dieses Wortes auf zwei Arten: Einmal über die String-Methode `.length()` und einmal manuell über eine range-based `for`-Schleife (Bereichs-for-Schleife), die jedes Zeichen des Strings durchläuft.

**C++-Schwerpunkte:**
*   Nutzung von `std::string` und dessen eingebauter Methode `.length()`.
*   Einsatz der modernen C++-Schleife: `for (char c : wort)`.
*   Zähler-Logik zur manuellen Bestimmung.

---

## 💪 Projekt 8: BMI-Rechner (Stream-Formatierung)

**Beschreibung:**
Das Programm fragt den Benutzer nach seiner Körpergröße in Metern (z. B. `1.85`) und seinem Gewicht in Kilogramm (z. B. `80`). Es berechnet den Body-Mass-Index (BMI) nach der Formel `Gewicht / (Größe * Größe)` und gibt die entsprechende Kategorie aus (Untergewicht, Normalgewicht, Übergewicht usw.). Formatiere die Ausgabe des BMI-Werts auf genau zwei Nachkommastellen.

**C++-Schwerpunkte:**
*   Datentyp `double` für Gleitkommazahlen.
*   Formatierte Konsolenausgabe über Streams unter Verwendung der Manipulatoren `std::fixed` und `std::setprecision` aus dem Header `<iomanip>`.
*   Mehrfach verzweigte `if-else`-Strukturen zur Klassifizierung.

---

## 🎯 Projekt 9: FizzBuzz in C++

**Beschreibung:**
Gib alle Zahlen von 1 bis 100 auf der Konsole aus. Bei Zahlen, die durch 3 teilbar sind, soll statt der Zahl das Wort `"Fizz"` ausgegeben werden. Bei Zahlen, die durch 5 teilbar sind, `"Buzz"`. Bei Zahlen, die durch 3 und 5 teilbar sind, `"FizzBuzz"`.

**C++-Schwerpunkte:**
*   Die klassische `for`-Schleife: `for (int i = 1; i <= 100; i++)`.
*   Nutzung des Modulo-Operators `%` zur Prüfung auf Teilbarkeit.
*   Verschachtelte Kontrollstrukturen.

---

## 🔢 Projekt 10: Primzahl-Prüfer mit Referenz-Status

**Beschreibung:**
Der Benutzer gibt eine positive Ganzzahl ein. Eine Funktion `pruefe_primzahl` soll ermitteln, ob es sich um eine Primzahl handelt. Die Funktion soll das Ergebnis (wahr/falsch) in eine in `main` deklarierte Variable schreiben. Hierzu erhält die Funktion eine Referenz auf diese Variable.

**C++-Schwerpunkte:**
*   Nutzung von Ganzzahl-Datentypen wie `int` oder `long`.
*   Einsatz des Datentyps `bool` für den Primzahl-Status.
*   Verwendung von Referenzen zur direkten Wertänderung im Speicher.
