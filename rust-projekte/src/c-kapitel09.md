# 9 Arrays und Zeichenketten (Strings)

Stell dir vor, du möchtest die täglichen Temperaturen einer ganzen Woche speichern. Bisher müsstest du dafür sieben einzelne Variablen anlegen (`temp1`, `temp2` etc.). Das wird schnell unübersichtlich, besonders wenn du den Durchschnitt berechnen oder die Werte sortieren möchtest. 

Hier kommen **Arrays** (auch *Felder* genannt) ins Spiel. Sie erlauben es dir, eine feste Anzahl von Elementen desselben Datentyps unter einem einzigen Namen abzuspeichern. Später erweitern wir dieses Konzept auf **Strings**, die in C nichts anderes als Arrays aus Zeichen sind.

---

## 9.1 Eindimensionale Arrays

Ein eindimensionales Array kannst du dir wie eine Reihe von nummerierten Briefkästen oder eine Kommode mit mehreren Schubladen vorstellen. Jede Schublade enthält genau ein Element desselben Typs.

### Definieren und Zugriff
Bei der Definition eines Arrays musst du C mitteilen, welchen Datentyp die Elemente haben sollen, wie das Array heißt und wie viele Elemente es fassen kann.

Das grundlegende Syntax-Template sieht so aus:
```c
datentyp arrayName[ANZAHL_ELEMENTE];
```

> [!IMPORTANT]
> **Die Indexierung beginnt immer bei 0!**
> Wenn dein Array 5 Elemente hat, sind die gültigen Indizes `0, 1, 2, 3` und `4`. Der Zugriff auf den Index `5` ist ein ungültiger Speicherzugriff (Out-of-Bounds) und führt zu unvorhersehbarem Verhalten oder Programmabstürzen. C prüft diese Grenzen nicht automatisch für dich!

Um auf ein bestimmtes Element zuzugreifen (sei es zum Auslesen oder zum Beschreiben), verwendest du eckige Klammern:
```c
// Wert auslesen oder zuweisen
arrayName[index] = wert;
```

### Die Initialisierungsliste
Du kannst ein Array direkt bei der Deklaration mit Werten befüllen. Dazu nutzt du geschweifte Klammern:
* **Vollständige Initialisierung:** Du gibst für jedes Element einen Wert an.
* **Teilweise Initialisierung:** Gibst du weniger Werte an, als das Array groß ist, werden die restlichen Plätze automatisch mit `0` (oder dem Äquivalent für den Datentyp) aufgefüllt.
* **Automatische Größenbestimmung:** Wenn du die eckigen Klammern leer lässt, bestimmt C die Größe anhand der Anzahl der Werte in der Liste.

```c
int messwerte[5] = {12, 15, 8, 19, 22}; // Genau 5 Elemente
int speicher[10] = {1, 2};              // Restliche 8 Elemente werden 0
double preise[]  = {1.99, 2.49, 9.99};  // C reserviert automatisch Platz für 3 Elemente
```

### Schreibschutz mit `const`
Manchmal möchtest du verhindern, dass die Werte eines Arrays im Laufe des Programms versehentlich verändert werden. In diesem Fall kannst du das Schlüsselwort `const` voranstellen. Jeder Versuch, ein Element dieses Arrays neu zu beschreiben, führt dann zu einem Compilerfehler.

```c
const int primzahlen[] = {2, 3, 5, 7, 11};
```

### Variable Length Arrays (VLAs)
Seit dem C99-Standard gibt es sogenannte *Variable Length Arrays*. Das bedeutet, dass die Größe des Arrays erst zur Laufzeit bestimmt wird, beispielsweise durch eine Benutzereingabe.

```c
int groesse;
// ... (groesse wird zur Laufzeit eingelesen)
int dynamisches_array[groesse]; // VLA
```

> [!WARNING]
> **Vermeide VLAs, wenn es möglich ist!**
> VLAs werden auf dem Stack (dem lokalen Speicher der Funktion) angelegt. Ist die vom Benutzer eingegebene Größe zu riesig, stürzt dein Programm sofort mit einem sogenannten *Stack Overflow* ab. Im C11-Standard wurde die Unterstützung von VLAs daher für Compiler-Hersteller optional gemacht. Nutze für dynamische Größen lieber die dynamische Speicherverwaltung (die du in einem späteren Kapitel kennenlernst).

### Einlesen mit `scanf`
Möchtest du einen Wert direkt in ein bestimmtes Array-Element einlesen, musst du `scanf` die Adresse dieses Elements mitteilen. Da ein einzelnes Array-Element (z. B. `zahlen[2]`) wie eine normale Variable behandelt wird, verwendest du hier den Adressoperator `&`.

```c
scanf("%d", &zahlen[index]);
```

### Arrays an Funktionen übergeben
Wenn du ein Array an eine Funktion übergibst, wird **keine Kopie** des gesamten Arrays erstellt. Stattdessen wird lediglich ein Zeiger auf das allererste Element des Arrays übergeben (*Call by Reference*-ähnliches Verhalten).

Das hat zwei wichtige Konsequenzen:
1. **Größenverlust:** Die Funktion weiß nicht, wie viele Elemente das Array hat. Du musst die Größe des Arrays als zusätzlichen Parameter an die Funktion übergeben.
2. **Veränderbarkeit:** Änderungen, die die Funktion an den Array-Elementen vornimmt, betreffen direkt das Original-Array. Wenn du das verhindern willst, deklariere den Parameter mit `const`.

Syntax-Template für den Funktionskopf:
```c
void verarbeiteArray(const int daten[], int groesse) {
    // const verhindert, dass die Elemente in 'daten' verändert werden können
}
```

---

## 9.2 Mehrdimensionale Arrays

Manchmal reicht eine einfache Liste nicht aus. Stell dir ein Schachbrett vor (8x8 Felder) oder ein Pixelraster eines Bildes. Hierfür eignen sich mehrdimensionale Arrays.

### Zweidimensionale Arrays
Ein zweidimensionales Array kannst du dir wie eine Tabelle mit Zeilen und Spalten vorstellen. 

Definition eines 2D-Arrays:
```c
// datentyp name[ZEILEN][SPALTEN];
int matrix[3][4]; // Eine Tabelle mit 3 Zeilen und jeweils 4 Spalten (insgesamt 12 Elemente)
```

Der Zugriff erfolgt ebenfalls über zwei Paare eckiger Klammern, wobei das erste Paar die Zeile und das zweite die Spalte bestimmt (jeweils ab 0 gezählt).

Bei der Initialisierung helfen geschachtelte geschweifte Klammern, um die Struktur lesbar zu machen:
```c
int tabelle[2][3] = {
    {1, 2, 3}, // Zeile 0
    {4, 5, 6}  // Zeile 1
};
```

### Übergabe an Funktionen
Wenn du ein mehrdimensionales Array an eine Funktion übergibst, musst du dem Compiler mindestens die Größe aller Dimensionen ab der zweiten mitteilen. Der Compiler muss nämlich wissen, wie viele Elemente eine Zeile hat, um die Speicheradresse der nächsten Zeile berechnen zu können.

Syntax-Template für den Funktionskopf:
```c
void zeigeMatrix(int matrix[][4], int zeilenAnzahl) {
    // Die Spaltenanzahl (hier 4) MUSS fest angegeben werden!
}
```

### Mehr als zwei Dimensionen
Es spricht nichts dagegen, drei- oder noch höherdimensionale Arrays zu definieren (z. B. `int koordinaten[10][10][10]`). Du kannst dir ein 3D-Array wie einen Stapel von Tabellen (ein Buch mit mehreren Seiten) vorstellen. In der Praxis werden Dimensionen höher als drei jedoch selten verwendet, da sie extrem viel Speicher verbrauchen und die logische Nachvollziehbarkeit erschweren.

---

## 9.3 Strings (Zeichenketten)

In C gibt es keinen eigenständigen Datentyp für Texte oder Wörter. Ein String (eine Zeichenkette) ist stattdessen ein **Array vom Typ `char`**, das mit einem speziellen Zeichen endet: dem Null-Byte `\0` (auch Null-Terminator genannt).

### Initialisieren und das Null-Byte
Das Null-Byte signalisiert allen String-Funktionen, wo der Text zu Ende ist. Ohne dieses Zeichen würden Funktionen wie `printf` einfach so lange weiter im Speicher lesen (und Müll ausgeben), bis sie zufällig auf eine Null stoßen.

Wenn du einen String mit doppelten Anführungszeichen initialisierst, fügt C den Null-Terminator automatisch am Ende hinzu:
```c
char name[] = "Anna"; // Reserviert automatisch 5 Bytes im Speicher: 'A', 'n', 'n', 'a', '\0'
```

> [!NOTE]
> Achte immer darauf, dass dein `char`-Array groß genug sein muss, um den Text **und** das zusätzliche `\0`-Zeichen aufzunehmen! Ein Wort mit 10 Buchstaben benötigt also ein Array der Mindestgröße 11.

### Strings einlesen
Beim Einlesen von Strings mit `scanf` gibt es eine Besonderheit: Der Name eines Arrays steht im Code bereits für die Adresse seines ersten Elements. Deshalb brauchst du bei Strings **keinen** Adressoperator `&`.

```c
char puffer[20];
scanf("%19s", puffer); // Liest ein Wort ein. Begrenzung auf 19 Zeichen (+ 1 für '\0') schützt vor Pufferüberlauf!
```

> [!WARNING]
> Verwende niemals `scanf("%s", puffer)` ohne Breitenbegrenzung! Gibt der Benutzer ein Wort ein, das länger ist als der reservierte Puffer, kommt es zu einem **Buffer Overflow** (Pufferüberlauf) – ein kritisches Sicherheitsrisiko!
> 
> Eine sicherere Standard-Alternative zum Einlesen ganzer Zeilen (inklusive Leerzeichen) ist die Funktion `fgets`:
> `fgets(puffer, sizeof(puffer), stdin);`

### Unicode, Umlaute und Sonderzeichen
Ein standardmäßiges `char` in C belegt genau 1 Byte (8 Bit). Das reicht für das klassische ASCII-Zeichensatz-System (englische Buchstaben, Zahlen, einfache Satzzeichen). 
Moderne Betriebssysteme verwenden jedoch meist UTF-8 zur Codierung von Unicode-Zeichen. In UTF-8 können Umlaute (ä, ö, ü) oder Sonderzeichen (wie das Euro-Symbol €) 2 bis 4 Bytes belegen.

* **Das Problem:** Ein Zeichen wie `ä` belegt in UTF-8 zwei Plätze in deinem `char`-Array. Das bedeutet, dass Funktionen zur Längenmessung das Zeichen als zwei separate Zeichen zählen.
* Für echte Unicode-Unterstützung bietet C spezielle Datentypen (wie `wchar_t` in `<wchar.h>`), auf die in diesem Einsteigerbuch jedoch nicht tiefer eingegangen wird. Sei dir nur bewusst, dass deutsche Umlaute die Längenberechnung in einfachen `char`-Arrays beeinflussen können.

### Die Bibliothek `<string.h>`
Um komfortabel mit Zeichenketten zu arbeiten, stellt C in der Standardbibliothek `<string.h>` nützliche Funktionen bereit. Hier sind die wichtigsten Vertreter:

1. **`strlen` (String Length):**
   Gibt die tatsächliche Länge der Zeichenkette zurück (ohne das Null-Byte `\0` mitzuzählen).
   *Prototyp:* `size_t strlen(const char *str);`

2. **`strcpy` (String Copy):**
   Kopiert den Inhalt eines Strings in einen anderen.
   *Prototyp:* `char *strcpy(char *dest, const char *src);`
   > [!CAUTION]
   > `strcpy` ist unsicher, da es nicht prüft, ob das Ziel-Array `dest` groß genug ist! Verwende stattdessen die sicherere Variante `strncpy`, bei der du die maximale Anzahl der zu kopierenden Zeichen angibst (z. B. `strncpy(dest, src, sizeof(dest) - 1); dest[sizeof(dest) - 1] = '\0';`).

3. **`strcmp` (String Compare):**
   Vergleicht zwei Zeichenketten lexikografisch (alphabetisch). 
   *Prototyp:* `int strcmp(const char *str1, const char *str2);`
   * **Rückgabewert `0`:** Beide Strings sind identisch.
   * **Rückgabewert `< 0`:** `str1` kommt im Alphabet vor `str2`.
   * **Rückgabewert `> 0`:** `str1` kommt im Alphabet nach `str2`.

### Umwandlung zwischen Zahl und String
Häufig musst du eine Zahl, die als Text vorliegt (z. B. aus einer Benutzereingabe `"42"`), in eine echte Ganzzahl (`int`) umwandeln – oder umgekehrt.

* **String zu Zahl (klassisch):** Die Funktionen `atoi` (Ascii to Integer) und `atof` (Ascii to Float) aus der Bibliothek `<stdlib.h>`.
  > [!TIP]
  > Die Funktion `atoi` hat keine Fehlerbehandlung. Schlägt die Umwandlung fehl (weil z. B. `"abc"` eingegeben wurde), gibt sie einfach `0` zurück. Sicherer sind die Funktionen `strtol` (String to Long) oder `strtod` (String to Double), da sie dir signalisieren können, ob die Konvertierung erfolgreich war.
  
* **Zahl/Daten zu String:** Um eine Zahl formatiert in einen String zu schreiben, gibt es das Gegenstück zu `printf`: `sprintf` bzw. die sicherere Variante `snprintf` aus `<stdio.h>`.
  ```c
  // snprintf(ziel_array, groesse, "Formatierungs-String", werte...);
  ```

---

## 9.4 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Warum führt der Zugriff auf das Element `liste[10]` bei einem Array mit 10 Elementen zu einem Fehler?
2. Was passiert mit den nicht explizit initialisierten Elementen eines Arrays, wenn du eine Initialisierungsliste verwendest, die kürzer ist als die Array-Größe?
3. Warum ist die Verwendung von Variable Length Arrays (VLAs) in professioneller C-Software oft verpönt?
4. Weshalb muss bei der Übergabe eines zweidimensionalen Arrays an eine Funktion die Spaltenanzahl zwingend angegeben werden?
5. Welches unscheinbare Zeichen markiert das Ende eines Strings in C und warum ist es so wichtig?
6. Warum ist die Standardfunktion `strcpy` ein potenzielles Sicherheitsrisiko und welche Alternative gibt es?

---

### Praktische Aufgaben

#### Aufgabe 1: Das Temperatur-Archiv (Eindimensionales Array)
Schreibe ein Programm, das die Tagestemperaturen einer Woche (7 Tage) vom Benutzer abfragt und in einem Array speichert.
* Berechne anschließend die Durchschnittstemperatur der Woche.
* Finde und gib die höchste sowie die niedrigste gemessene Temperatur aus.
* *Didaktischer Hinweis:* Nutze eine Schleife für das Einlesen und eine weitere Schleife, um die Werte zu analysieren. Nutze Hilvsvariablen für das Minimum und das Maximum, die du vor der Schleife mit dem ersten Array-Element initialisierst.

#### Aufgabe 2: Die Kinosaal-Reservierung (Zweidimensionales Array)
Simuliere ein einfaches Reservierungssystem für einen kleinen Kinosaal mit 5 Reihen und je 6 Sitzen.
* Initialisiere den Saal so, dass alle Sitze frei sind (z. B. mit dem Wert `0`).
* Ermögliche es dem Benutzer, eine Reihe und einen Sitzplatz (1-basiert für den Komfort des Benutzers) einzugeben.
* Prüfe, ob der Platz frei ist. Wenn ja, reserviere ihn (z. B. Wert auf `1` setzen) und gib eine Bestätigung aus. Wenn nein, gib eine Fehlermeldung aus, dass der Platz besetzt ist.
* *Didaktischer Hinweis:* Denke an die Umrechnung der benutzerfreundlichen Indizes (1 bis 5) in die C-Indizes (0 bis 4). Vergiss nicht, die Benutzereingaben auf Gültigkeit zu prüfen, damit kein Zugriff außerhalb des Arrays stattfindet!

#### Aufgabe 3: Der Passwort-Prüfer (Strings)
Entwickle ein Programm, das den Benutzer zur Eingabe eines Passworts auffordert.
* Das Programm soll prüfen, ob das Passwort eine Mindestlänge von 8 Zeichen hat (nutze dazu eine Funktion aus `<string.h>`).
* Vergleiche das eingegebene Passwort mit einem im Programm fest hinterlegten "Master-Passwort" und gib aus, ob der Zugriff gewährt oder verweigert wird.
* *Didaktischer Hinweis:* Achte beim Einlesen des Passworts darauf, dass kein Pufferüberlauf möglich ist. Lies dich ein, wie du `strcmp` korrekt auswertest – ein Rückgabewert von `0` bedeutet Gleichheit, nicht Ungleichheit!
