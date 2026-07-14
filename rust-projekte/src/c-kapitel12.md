# 12 Komplexe Datentypen

Bisher hast du gelernt, wie du mit grundlegenden Datentypen wie `int`, `double` oder `char` arbeitest und wie du Daten gleichen Typs in Arrays zusammenfasst. In der realen Programmierung wirst du jedoch schnell auf Daten stoßen, die sich nicht einfach in ein Raster aus lauter gleichen Werten pressen lassen. 

Stell dir vor, du möchtest ein Buch in deinem Programm darstellen. Ein Buch hat einen Titel (Text), einen Autor (Text), eine Seitenzahl (Ganzzahl) und vielleicht einen Preis (Fließkommazahl). Ein einfaches Array reicht hier nicht aus, da ein Array nur Elemente *desselben* Typs speichern kann.

In diesem Kapitel lernst du die **komplexen Datentypen** in C kennen, mit denen du deine eigenen, maßgeschneiderten Datenstrukturen erschaffen kannst.

---

## 12.1 Strukturen (`struct`)

Eine Struktur (eingeleitet durch das Schlüsselwort `struct`) ist eine Sammlung von Variablen, die unter einem einzigen Namen zusammengefasst werden. Die Variablen innerhalb einer Struktur können dabei völlig unterschiedliche Datentypen haben. Man nennt diese Variablen auch **Komponenten**, **Member** oder **Elemente** der Struktur.

### Strukturtypen deklarieren und definieren

Um eine Struktur zu verwenden, musst du dem Compiler zuerst mitteilen, wie diese Struktur überhaupt aufgebaut ist. Das machst du mit einer **Deklaration**. Du erstellst damit eine Art Bauplan (auch Strukturtyp genannt).

```c
struct Buch {
    char titel[100];
    char autor[50];
    int seitenzahl;
    float preis;
};
```

Mit dieser Deklaration hast du einen neuen Typ namens `struct Buch` geschaffen. Es wurde jedoch noch kein Speicherplatz reserviert! Das passiert erst, wenn du eine Variable dieses Typs **definierst**:

```c
struct Buch meinLieblingsbuch;
```

> [!NOTE]
> Vergiss nicht das Semikolon `;` am Ende der Strukturdeklaration. Das ist einer der häufigsten Fehler von Einsteigern in C!

### Operationen auf Strukturvariablen

Was kannst du mit einer Strukturvariablen machen? Du kannst:
* Auf ihre einzelnen Komponenten zugreifen (lesen und schreiben).
* Sie als Ganzes einer anderen Strukturvariablen desselben Typs zuweisen.
* Ihre Adresse mit dem Adressoperator (`&`) ermitteln.
* Sie an Funktionen übergeben oder von Funktionen zurückgeben lassen.

Was du hingegen **nicht** direkt tun kannst, ist das Vergleichen zweier Strukturen mit `==` oder das direkte Einlesen/Ausgeben der gesamten Struktur über ein einziges `scanf` oder `printf`. Das musst du komponentenweise erledigen.

### Der `typedef`-Trick bei Strukturen

Es kann mühsam sein, im Code jedes Mal `struct Buch` schreiben zu müssen. Mit `typedef` kannst du einen kürzeren Alias-Namen vergeben. Es gibt zwei Wege, dies zu tun.

**Variante A: Struktur erst deklarieren, dann Alias definieren**
```c
struct Buch {
    // Komponenten
};
typedef struct Buch Buch_t;
```

**Variante B: Direkt bei der Deklaration (sehr verbreitet)**
```c
typedef struct {
    char titel[100];
    char autor[50];
    int seitenzahl;
    float preis;
} Buch_t;
```
Danach kannst du Variablen einfach mit `Buch_t meinLieblingsbuch;` deklarieren.

### Selektor-Operatoren `.` und `->`

Um auf die einzelnen Komponenten einer Struktur zuzugreifen, nutzt du sogenannte Selektoren:

1. **Der Punkt-Operator (`.`)**: Wird verwendet, wenn du direkt mit einer Strukturvariablen arbeitest.
   ```c
   variable.komponente = wert;
   ```
2. **Der Pfeil-Operator (`->`)**: Wird verwendet, wenn du über einen **Zeiger** auf eine Struktur zugreifst.
   ```c
   zeiger->komponente = wert;
   ```
   Der Pfeil-Operator ist eine bequeme Abkürzung für `(*zeiger).komponente`. Da der Punkt-Operator eine höhere Priorität als der Dereferenzierungs-Operator (`*`) hat, müsstest du ohne den Pfeil immer Klammern schreiben.

### Initialisierung und Zuweisung

Du kannst eine Struktur direkt bei ihrer Definition mit Startwerten belegen (initialisieren). Die Werte werden in geschweiften Klammern in der Reihenfolge angegeben, in der die Komponenten in der Deklaration stehen:

```c
Buch_t meinBuch = {"Die Schatzinsel", "Robert Louis Stevenson", 300, 9.99f};
```

Seit dem C99-Standard gibt es auch **benannte Initialisierer** (Designated Initializers). Diese sind sicherer und lesbarer, da die Reihenfolge keine Rolle spielt:

```c
Buch_t meinBuch = {
    .seitenzahl = 300,
    .preis = 9.99f,
    .titel = "Die Schatzinsel",
    .autor = "Robert Louis Stevenson"
};
```

Eine Zuweisung kopiert den gesamten Inhalt einer Struktur in eine andere, sofern sie vom exakt selben Typ sind:

```c
Buch_t kopie;
kopie = meinBuch; // Alle Werte werden eins zu eins kopiert!
```

### Speichergröße: `sizeof` und Alignment

Man könnte annehmen, dass die Größe einer Struktur im Speicher genau der Summe der Größen ihrer einzelnen Komponenten entspricht. Das ist jedoch meistens **nicht** der Fall!

Compiler richten Daten im Speicher an bestimmten Adressgrenzen aus (dies nennt man **Alignment** oder Ausrichtung), um den Zugriff für den Prozessor zu beschleunigen. Dafür fügt der Compiler unsichtbare Füllbytes (sogenanntes **Padding**) zwischen den Komponenten oder am Ende der Struktur ein.

> [!WARNING]
> Verwende niemals eine manuelle Summation der Datentypen, um die Größe einer Struktur zu schätzen. Nutze immer den Operator `sizeof(dein_strukturtyp)`.

### Strukturen vergleichen

Es ist in C nicht möglich, zwei Strukturen mit dem Vergleichsoperator zu prüfen:
```c
// DAS FUNKTIONIERT NICHT:
// if (buchA == buchB) { ... }
```
Warum? Wegen der potenziellen Füllbytes (Padding) im Speicher! Diese Füllbytes können zufällige Werte enthalten. Ein bitweiser Vergleich des gesamten Speicherbereichs würde daher fälschlicherweise `false` liefern.

**Die Lösung:** Du musst die für dich relevanten Komponenten einzeln vergleichen (z.B. die Seitenzahl mit `==`, Zeichenketten mit `strcmp`).

### Strukturen und Funktionen / Strukturzeiger

Du kannst Strukturen auf zwei Arten an Funktionen übergeben:

1. **Call-by-Value (Wertübergabe)**:
   Die gesamte Struktur wird kopiert. Bei sehr großen Strukturen kann dies das Programm verlangsamen und viel Stapelspeicher (Stack) verbrauchen.
   ```c
   void druckeBuch(Buch_t b); // Kopie von b wird übergeben
   ```
2. **Call-by-Reference (Zeigerübergabe)**:
   Es wird nur die Speicheradresse der Struktur übergeben. Das ist extrem schnell und spart Speicher. Zudem kann die Funktion die Originalstruktur modifizieren (es sei denn, du verwendest `const`).
   ```c
   void aktualisierePreis(Buch_t *b, float neuerPreis); // Adresse wird übergeben
   ```

> [!TIP]
> Verwende standardmäßig Zeiger auf Strukturen, wenn du sie an Funktionen übergibst. Wenn die Funktion die Struktur nicht verändern darf, schütze sie mit dem Schlüsselwort `const`:
> `void zeigeDaten(const Buch_t *b);`

### Arrays von Strukturen

Genau wie bei einfachen Datentypen kannst du auch Arrays von Strukturen anlegen. Das eignet sich hervorragend, um tabellarische Daten zu verwalten, beispielsweise eine ganze Bibliothek:

```c
Buch_t bibliothek[100]; // Platz für 100 Bücher
```

Der Zugriff erfolgt durch die Kombination des Array-Index und des Punkt-Operators:
`bibliothek[i].seitenzahl` greift auf die Seitenzahl des *i*-ten Buchs zu.

### Verschachtelte Strukturen

Strukturen können selbst wieder Strukturen als Komponenten enthalten. Dies hilft dir, Daten hierarchisch zu gliedern.

Stell dir vor, du möchtest das Veröffentlichungsdatum eines Buchs speichern:

```c
typedef struct {
    int tag;
    int monat;
    int jahr;
} Datum_t;

typedef struct {
    char titel[100];
    Datum_t erscheinungsdatum; // Verschachtelung!
} Buch_t;
```

Um auf das Jahr zuzugreifen, kettest du die Punkt-Operatoren einfach aneinander:
`meinBuch.erscheinungsdatum.jahr = 2026;`

### Zeiger als Strukturkomponenten

Eine Struktur kann auch Zeiger enthalten. Das ist besonders wichtig, wenn du mit dynamischer Speicherverwaltung arbeitest oder komplexe Datenstrukturen wie verkettete Listen aufbauen willst.

```c
typedef struct {
    char *dynamischerTitel; // Zeiger auf einen Speicherbereich
    int seiten;
} FlexiblesBuch_t;
```

> [!WARNING]
> Wenn deine Struktur Zeiger enthält, kopiert eine einfache Zuweisung (`kopie = original;`) nur die Adressen (flache Kopie). Beide Strukturen zeigen dann auf denselben Speicher im Heap! Wenn du den Speicher für eine Struktur freigibst, wird der Zeiger in der Kopie ungültig. Hier musst du manuell eine tiefe Kopie (Deep Copy) erstellen.

---

## 12.2 Unions (Gemeinschaftstypen)

Eine `union` (Gemeinschaftstyp) sieht syntaktisch fast genauso aus wie eine `struct`. Sie hat jedoch ein völlig anderes Verhalten im Speicher.

Während in einer Struktur alle Komponenten **nebeneinander** im Speicher liegen, teilen sich bei einer Union alle Komponenten **denselben Speicherplatz**. Die Größe einer Union richtet sich nach ihrer größten Komponente.

```c
union Datenelement {
    int ganzzahl;
    float fliesskomma;
    char zeichen;
};
```

### Wichtige Eigenschaften von Unions:
* Es kann immer nur **ein einziges** Element der Union zur gleichen Zeit einen gültigen Wert enthalten.
* Wenn du einen Wert in `ganzzahl` schreibst und danach `fliesskomma` ausliest, interpretierst du das Bitmuster der Ganzzahl als Fließkommazahl. Dies kann für spezielle Hardwarenahe Programmierungen nützlich sein, führt im normalen Code aber schnell zu Fehlern.
* Unions werden oft verwendet, um Speicherplatz zu sparen, wenn man weiß, dass eine Variable zu einem Zeitpunkt immer nur einen von mehreren Typen annehmen kann.

---

## 12.3 Der Aufzählungstyp `enum`

Ein Aufzählungstyp (`enum`) dient dazu, symbolische Konstanten zu definieren. Das macht deinen Code lesbarer und wartungsfreundlicher, da du sogenannte "Magic Numbers" (nichtssagende Zahlenwerte im Code) vermeidest.

```c
enum Wochentag {
    MONTAG,
    DIENSTAG,
    MITTWOCH,
    DONNERSTAG,
    FREITAG,
    SAMSTAG,
    SONNTAG
};
```

### Funktionsweise von Enums in C:
* Intern weist der C-Compiler jedem Namen einen ganzzahligen Wert (`int`) zu. Standardmäßig startet die Zählung bei `0` und erhöht sich für jeden weiteren Eintrag um `1` (also `MONTAG = 0`, `DIENSTAG = 1` etc.).
* Du kannst die Standardwerte manuell überschreiben:
  ```c
  enum Status {
      START = 1,
      PAUSE = 5,
      STOPP = 10
  };
  ```
* Enums erhöhen die Typsicherheit und die Lesbarkeit im Code erheblich, z.B. in `switch-case`-Anweisungen.

---

## 12.4 Eigene Typen mit `typedef` deklarieren

Das Schlüsselwort `typedef` ermöglicht es dir, neue Namen (Aliase) für bereits existierende Datentypen zu vergeben. Es erschafft keinen physisch neuen Typ, sondern gibt einem bestehenden Typ nur einen neuen, oft verständlicheren Namen.

### Syntax-Schema:
```c
typedef existierender_typ neuer_name;
```

### Anwendungsbeispiele:
1. **Lesbarkeit erhöhen**:
   `typedef unsigned long int Groesse_t;`
   Nun kannst du Variablen mit `Groesse_t dateigroesse;` deklarieren.
2. **Plattformunabhängigkeit**:
   Wenn du Code schreibst, der auf verschiedenen Systemen laufen soll, auf denen Datentypen unterschiedlich groß sein können, kannst du Aliase verwenden und diese zentral anpassen.
3. **Komplexität reduzieren**:
   Besonders bei Funktionszeigern (die eine sehr kryptische Syntax haben) wirkt `typedef` oft Wunder für die Lesbarkeit des Codes.

---

## 12.5 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Worin liegt der fundamentale Unterschied im Speicheraufbau zwischen einer `struct` und einer `union`?
2. Warum liefert der direkte Vergleich zweier Strukturvariablen mittels `if (variableA == variableB)` einen Compilerfehler, und wie löst man dieses Problem elegant?
3. Was versteht man unter dem Begriff "Padding" in Verbindung mit Strukturen, und welche Auswirkung hat es auf den Operator `sizeof`?
4. Wann benutzt man den Punkt-Operator (`.`) und wann den Pfeil-Operator (`->`)?
5. Welchen ganzzahligen Wert besitzt standardmäßig das dritte Element in einem Aufzählungstyp (`enum`), wenn für das erste Element kein Wert explizit definiert wurde?

### Aufgaben (ohne fertige Codelösungen!)

#### Aufgabe 1: Die Adressdatenbank
Entwerfe eine Struktur, die eine Postadresse abbildet (Straße, Hausnummer, Postleitzahl, Ort). Überlege dir gut, welche Datentypen für die einzelnen Komponenten am besten geeignet sind (Hinweis: Kann eine Hausnummer auch einen Buchstaben enthalten? Müssen mit einer Postleitzahl mathematische Berechnungen durchgeführt werden?).
Schreibe eine Funktion, die einen Zeiger auf eine solche Adresse entgegennimmt und die Daten sauber formatiert auf dem Bildschirm ausgibt.

#### Aufgabe 2: Geometrie im 2D-Raum
1. Definiere eine Struktur für einen Punkt im zweidimensionalen Koordinatensystem (mit x- und y-Koordinaten als Fließkommazahlen).
2. Definiere eine zweite Struktur für ein Rechteck. Ein Rechteck soll durch zwei Punkte definiert sein: den linken oberen Punkt und den rechten unteren Punkt (nutze hier das Prinzip der verschachtelten Strukturen!).
3. Überlege dir mathematisch und logisch, wie eine Funktion aufgebaut sein müsste, die die Fläche dieses Rechtecks berechnet, wenn ihr ein Zeiger auf das Rechteck übergeben wird. Schreibe die Funktionssignatur und den Berechnungsalgorithmus.

#### Aufgabe 3: Der Sensor-Messwert-Speicher
In Messsystemen werden oft Daten empfangen, die je nach Sensortyp unterschiedlich interpretiert werden müssen.
Erstelle eine Struktur, die:
* Einen Sensor-Typ speichert (nutze dafür ein `enum` mit Werten wie `TEMPERATUR`, `DRUCK`, `STATUS`).
* Eine `union` enthält, die entweder einen Fließkomma-Messwert (für Temperatur/Druck) oder einen einzelnen Wahrheitswert (für den Status) aufnehmen kann.
Entwerfe eine Funktion, die diesen kombinierten Datentyp liest und – abhängig vom Sensor-Typ – den Messwert mit der passenden physikalischen Einheit auf der Konsole ausgibt.
