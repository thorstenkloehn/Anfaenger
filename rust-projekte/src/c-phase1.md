# Phase 1: Projektvorschläge für C-Einsteiger

Jedes der folgenden Projekte bietet dir die Möglichkeit, **alle C-Grundlagen gleichzeitig** in der Praxis anzuwenden:

| Thema | Was du lernst |
| :--- | :--- |
| **🧱 Variablen & Datentypen** | Ganzzahlen, Kommazahlen, Zeichen, `const` |
| **🔀 Kontrollfluss** | `if/else`, `switch-case`, `while`, `for` |
| **⌨️ Benutzereingabe** | Konsoleneingabe mit `scanf` und dem Adress-Operator `&` |
| **🧠 Zeiger & Adressen** | Übergabe von Speicheradressen (Pointern) an Funktionen |
| **📝 Strings & Arrays** | Zeichenketten (`char`-Arrays) verwalten und das Null-Byte `'\0'` verstehen |

> [!NOTE]
> **Hinweis:** Alle Projektvorschläge sind bewusst ohne fertige Code-Lösungen aufgeführt. Erarbeite die Programme selbstständig, um das Gelernte nachhaltig zu festigen!

---

## 🎮 Projekt 1: Zahlen raten

**Beschreibung:**
Das Programm generiert eine Zufallszahl zwischen 1 und 100. Der Spieler gibt über die Konsole Tipps ab, bis er die richtige Zahl erraten hat. Nach jedem Versuch gibt das Programm einen Hinweis („Zu groß!“ oder „Zu klein!“). Am Ende wird ausgegeben, wie viele Versuche benötigt wurden.

**C-Schwerpunkte:**
*   Nutzung von `int` für Werte und Zähler.
*   Eine `while`- oder `do-while`-Schleife für die Spielrunde.
*   Einlesen mit `scanf` und dem Adress-Operator `&`.
*   Zufallszahlengenerierung mittels `rand()` und `srand()` aus der Bibliothek `<stdlib.h>`.

---

## 💳 Projekt 2: Guthaben-Rechner (Call-by-Reference)

**Beschreibung:**
Entwirf ein einfaches, textbasiertes Menü für ein Bankkonto. Der Benutzer kann Geld einzahlen, Geld abheben oder den aktuellen Kontostand anzeigen lassen. Die Kontostand-Variable soll in `main` liegen. Jede Menüaktion (Einzahlen/Abheben) soll über eine separate Funktion abgewickelt werden, die den Kontostand direkt über einen **Zeiger** (Pointer) modifiziert.

**C-Schwerpunkte:**
*   Verwendung von `float` oder `double` für Geldbeträge.
*   Menüsteuerung über eine Schleife mit einer `switch-case`-Verzweigung.
*   Call-by-Reference: Funktionen erhalten die Adresse der Kontovariable (z. B. `void einzahlen(double *saldo_ptr)`).

---

## 🌡️ Projekt 3: Temperatur-Statistik (Arrays & Pointer)

**Beschreibung:**
Der Benutzer gibt die Tagestemperaturen für eine Woche (7 Tage) ein. Das Programm speichert diese in einem Array. Eine separate Funktion ermittelt anschließend die Durchschnittstemperatur, die niedrigste (Minimum) und die höchste Temperatur (Maximum). Das Array wird als Pointer an die Auswertefunktion übergeben.

**C-Schwerpunkte:**
*   Erstellung eines `float`-Arrays der Größe 7.
*   Eingabe und Verarbeitung mit `for`-Schleifen.
*   Übergabe eines Arrays an eine Funktion (in C wird ein Arrayname als Zeiger auf das erste Element übergeben).

---

## 📊 Projekt 4: Noten-Auswertung mit Eingabestopp

**Beschreibung:**
Der Benutzer kann nacheinander Schulnoten (1 bis 6) eingeben. Die Noten werden in einem Array gespeichert (maximale Kapazität: 50 Noten). Die Eingabe endet vorzeitig, wenn der Benutzer `0` eingibt. Das Programm berechnet den Durchschnitt aller eingegebenen Noten und gibt diesen formatiert aus.

**C-Schwerpunkte:**
*   Array mit fester Größe (`int noten[50]`).
*   Prüfung auf das Abbruchkriterium (`0`) und Verhinderung von Array-Überschreitungen (maximal 50 Einträge).
*   Typkonvertierung beim Berechnen des Durchschnitts (Casten von `int` zu `float`).

---

## 🔐 Projekt 5: Login-Simulator mit C-Strings

**Beschreibung:**
Ein Benutzername (z. B. `"admin"`) und ein Passwort (z. B. `"geheim"`) sind fest im Programm hinterlegt. Der Benutzer hat maximal 3 Versuche, sich anzumelden. Gibt er die richtigen Daten ein, wird er begrüßt. Nach dem 3. Fehlversuch wird das Programm gesperrt.

**C-Schwerpunkte:**
*   `char`-Arrays zur Speicherung von Texten.
*   Begrenztes Einlesen von Texten (z. B. `scanf("%19s", eingabe)` zur Vermeidung von Pufferüberläufen).
*   Vergleich der Zeichenketten mithilfe der Funktion `strcmp()` aus `<string.h>`.

---

## ➕ Projekt 6: Taschenrechner mit Zeiger-Ergebnis

**Beschreibung:**
Schreibe ein Programm, das zwei Zahlen und ein Rechenzeichen (`+`, `-`, `*`, `/`) einliest. Eine Berechnungsfunktion soll das Ergebnis ermitteln. Da Divisionen durch Null nicht erlaubt sind, soll die Funktion einen Fehlercode (z. B. `0` für Erfolg, `1` für Fehler) per `return` zurückgeben. Das berechnete Ergebnis wird der Funktion stattdessen über einen **Zeiger** übergeben und direkt in `main` modifiziert.

**C-Schwerpunkte:**
*   Nutzung von `double` für präzise Berechnungen.
*   Zeiger-Parameter als „Rückkanal“ für das Rechenergebnis.
*   Rückgabewert der Funktion dient ausschließlich dem Status-Check (Fehlerbehandlung).

---

## 📝 Projekt 7: Wort-Längen-Zähler (Manuelle String-Schleife)

**Beschreibung:**
Der Benutzer gibt ein einzelnes Wort ein. Das Programm zählt die Anzahl der Buchstaben dieses Wortes und gibt das Ergebnis aus. **Wichtig:** Verwende hierbei bewusst nicht die Bibliotheksfunktion `strlen()`. Schreibe stattdessen eine eigene Schleife, die das Zeichen-Array so lange durchläuft, bis sie auf das Null-Byte-Zeichen `'\0'` trifft.

**C-Schwerpunkte:**
*   Zeichen-Arrays (`char`-Arrays) und deren Aufbau im Speicher verstehen.
*   Schleifenbedingung: `while (wort[i] != '\0')`.
*   Zähler-Logik oder Zeiger-Arithmetik.

---

## 💪 Projekt 8: BMI-Rechner

**Beschreibung:**
Das Programm fragt den Benutzer nach seiner Körpergröße in Metern (z. B. `1.85`) und seinem Gewicht in Kilogramm (z. B. `80`). Es berechnet den Body-Mass-Index (BMI) nach der Formel `Gewicht / (Größe * Größe)` und gibt die entsprechende Kategorie aus (Untergewicht, Normalgewicht, Übergewicht usw.).

**C-Schwerpunkte:**
*   Datentyp `float` oder `double` für Gleitkommazahlen.
*   Formatierte Konsolenausgabe mit einer festgelegten Anzahl an Nachkommastellen (z. B. `%.2f`).
*   Mehrfach verzweigte `if-else`-Strukturen zur Klassifizierung.

---

## 🎯 Projekt 9: FizzBuzz in C

**Beschreibung:**
Gib alle Zahlen von 1 bis 100 auf der Konsole aus. Bei Zahlen, die durch 3 teilbar sind, soll statt der Zahl das Wort `"Fizz"` ausgegeben werden. Bei Zahlen, die durch 5 teilbar sind, `"Buzz"`. Bei Zahlen, die durch 3 und 5 teilbar sind, `"FizzBuzz"`.

**C-Schwerpunkte:**
*   Die klassische zählerbasierte `for`-Schleife: `for (int i = 1; i <= 100; i++)`.
*   Nutzung des Modulo-Operators `%` zur Prüfung auf Teilbarkeit.
*   Verschachtelte Kontrollstrukturen.

---

## 🔢 Projekt 10: Primzahl-Prüfer mit Status-Zeiger

**Beschreibung:**
Der Benutzer gibt eine positive Ganzzahl ein. Eine Funktion `pruefe_primzahl` soll ermitteln, ob es sich um eine Primzahl handelt. Die Funktion soll das Ergebnis in eine in `main` deklarierte Variable schreiben (z. B. `1` für Primzahl, `0` für keine Primzahl). Hierzu erhält die Funktion einen Zeiger auf diese Variable.

**C-Schwerpunkte:**
*   Nutzung von Ganzzahl-Datentypen wie `int` oder `long`.
*   Optimierte Schleife zur Teilersuche (z. B. bis zur Quadratwurzel der Zahl).
*   Einsatz von Zeigern zur direkten Wertänderung im Speicher.
