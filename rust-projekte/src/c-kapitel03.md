# 3 Basisdatentypen in C

In diesem Kapitel steigen wir tief in das Fundament der C-Programmierung ein: wie Daten im Speicher abgelegt, verwaltet und verarbeitet werden. Ohne Datentypen wüsste der Computer nicht, ob eine Sequenz von Nullen und Einsen im Arbeitsspeicher eine Zahl, ein Buchstabe oder ein Bildpunkt ist. Du wirst lernen, wie du Variablen erstellst, welche Datentypen es gibt und wie du deren Speicherbedarf und Grenzen ermittelst.

---

## 3.1 Variablen, Deklaration, Definition, Initialisierung und Zuweisung

Bevor wir uns die verschiedenen Datentypen anschauen, müssen wir verstehen, wie wir Speicherplatz benennen und nutzen können. Eine **Variable** kannst du dir wie eine beschriftete Box im Arbeitsspeicher deines Computers vorstellen. In diese Box kannst du Werte hineinlegen, sie herauslesen oder verändern.

Um mit Variablen zu arbeiten, durchlaufen wir im Wesentlichen drei Schritte:

### Deklaration und Definition
In C müssen wir dem Compiler mitteilen, dass wir eine Variable nutzen möchten, bevor wir sie das erste Mal verwenden.

*   **Deklaration:** Macht dem Compiler einen Namen und einen Datentyp bekannt. Sie reserviert noch keinen Speicherplatz, sondern sagt lediglich: *"Es existiert irgendwo eine Variable mit diesem Namen und diesem Typ."*
*   **Definition:** Reserviert tatsächlich den Speicherplatz für die Variable im Arbeitsspeicher. 

In den meisten Fällen fallen Deklaration und Definition in C zusammen.

```c
// Definition einer Ganzzahl-Variable (reserviert Speicherplatz)
int meine_zahl;
```

> [!NOTE]
> Eine reine Deklaration ohne Definition begegnet dir meistens, wenn du das Schlüsselwort `extern` verwendest, um auf Variablen zuzugreifen, die in einer anderen Datei definiert sind.

### Initialisierung und Zuweisung
*   **Initialisierung:** Das ist das erstmalige Zuweisen eines Wertes direkt bei der Definition der Variable. 
*   **Zuweisung:** Das nachträgliche Ändern des Wertes einer bereits existierenden Variable.

```c
// Initialisierung (Definition + erste Zuweisung)
int alter = 25;

// Spätere Zuweisung (der alte Wert wird überschrieben)
alter = 26;
```

> [!WARNING]
> Wenn du eine lokale Variable in C definierst, ohne sie zu initialisieren (z. B. `int x;`), hat sie keinen definiertem Wert! In dieser Box liegt dann zufälliger "Speichermüll" (die Reste dessen, was vorher an dieser Speicheradresse lag). Greifst du darauf zu, führt dies zu unvorhersehbarem Verhalten. Gewöhne dir daher an, Variablen immer direkt bei der Definition zu initialisieren!

---

## 3.2 Datentypen für Ganzzahlen

Ganzzahlen (engl. *Integers*) sind Zahlen ohne Nachkommastellen. C bietet verschiedene Ganzzahltypen an, die sich in ihrer Speichergröße und darin unterscheiden, ob sie negative Werte speichern können.

### Vorzeichenbehaftet vs. Vorzeichenlos
Jeder Ganzzahltyp existiert standardmäßig in einer vorzeichenbehafteten Variante (`signed`) und kann optional als vorzeichenlos (`unsigned`) deklariert werden:

*   **signed:** Kann sowohl negative als auch positive Zahlen (sowie die Null) darstellen. Dies ist der Standard.
*   **unsigned:** Kann nur nicht-negative Zahlen (0 und positive Zahlen) darstellen. Dadurch verdoppelt sich der darstellbare positive Wertebereich, da das Bit, das sonst für das Vorzeichen reserviert ist, für den Wert selbst genutzt wird.

### Die Ganzzahltypen im Überblick
Die genaue Bit-Breite hängt vom Betriebssystem und der Prozessorarchitektur ab, jedoch garantiert der C-Standard Mindestgrößen:

*   `short` (oder `short int`): Mindestens 16 Bit.
*   `int`: Die "natürliche" Wortbreite des Systems, mindestens 16 Bit (auf modernen Systemen meist 32 Bit).
*   `long` (oder `long int`): Mindestens 32 Bit.
*   `long long` (oder `long long int`): Mindestens 64 Bit (eingeführt mit C99).

```c
unsigned short paket_groese;
long long weltbevoelkerung;
```

### Ganzzahl-Suffixe
Wenn du eine Zahl direkt in den Code schreibst (ein sogenanntes Literal), nimmt der Compiler standardmäßig an, dass es sich um ein normales `int` handelt. Möchtest du erzwingen, dass ein Literal als ein bestimmter Typ interpretiert wird, hängst du ein Suffix an:

*   `U` oder `u` für `unsigned`
*   `L` oder `l` für `long`
*   `LL` oder `ll` für `long long`

Du kannst diese auch kombinieren (z. B. `ULL` oder `ull` für `unsigned long long`).

---

## 3.3 Datentypen für Zeichen

Computer kennen keine Buchstaben, sondern nur Zahlen. Deshalb speichert C Zeichen als Ganzzahlen ab, die einem bestimmten Zeichensatz (meist ASCII) entsprechen.

### Der Typ `char`
Der grundlegende Typ für Zeichen ist `char`. Er belegt in der Regel genau 1 Byte (8 Bit) Speicher.
Ein `char`-Literal wird in einfache Anführungszeichen gesetzt:

```c
char initial = 'A';
```

Intern speichert C hier den Zahlenwert des Buchstabens `A` (im ASCII-Code die 65). Du kannst mit `char` also auch ganz normal rechnen!

### Breite Zeichen (`wchar_t`) und Unicode
Da 8 Bit nur 256 verschiedene Zeichen darstellen können (zu wenig für internationale Zeichensätze wie Chinesisch oder Kyrillisch), gibt es Erweiterungen:

*   `wchar_t`: Ein Datentyp für "breite Zeichen" (wide characters). Seine Größe ist systemabhängig (meist 16 oder 32 Bit). Literale werden mit einem vorangestellten `L` gekennzeichnet (z. B. `L'Ω'`). Um diesen Typ zu nutzen, wird oft `<stddef.h>` oder `<wchar.h>` eingebunden.
*   **Unicode-Unterstützung (ab C11):** C11 führt die Typen `char16_t` (UTF-16, Präfix `u`) und `char32_t` (UTF-32, Präfix `U`) ein, die in `<uchar.h>` definiert sind.

---

## 3.4 Datentypen für Fließkommazahlen

Für reelle Zahlen mit Nachkommastellen (z. B. mathematische Konstanten oder Messwerte) verwenden wir Fließkommatypen (auch Gleitkommazahlen genannt).

C bietet drei Standardtypen, die sich in ihrer Präzision und ihrem Speicherbedarf unterscheiden:

*   `float`: Einfache Genauigkeit (meist 32 Bit).
*   `double`: Doppelte Genauigkeit (meist 64 Bit). Dies ist der Standardtyp für Fließkommaliterale in C.
*   `long double`: Erhöhte Genauigkeit (systemabhängig, oft 80 oder 128 Bit).

```c
float temperatur = 36.6f;
double pi = 3.1415926535;
long double astronomische_distanz = 1.496e11L;
```

### Suffixe für Fließkommazahlen
*   Ohne Suffix wird ein Literal als `double` interpretiert.
*   Mit dem Suffix `f` oder `F` erzwingst du den Typ `float`.
*   Mit dem Suffix `l` oder `L` erzwingst du den Typ `long double`.

### Komplexe Typen
Seit C99 unterstützt C auch komplexe Zahlen. Wenn du die Header-Datei `<complex.h>` einbindest, stehen dir Typen wie `float complex`, `double complex` und `long double complex` sowie die imaginäre Einheit `I` zur Verfügung.

---

## 3.5 Boolescher Datentyp

In der ursprünglichen C-Sprachdefinition gab es keinen eigenen Datentyp für Wahrheitswerte. Stattdessen galt:
*   Die Zahl `0` entspricht "falsch" (*false*).
*   Jeder Wert ungleich `0` entspricht "wahr" (*true*).

### Der Typ `_Bool` (ab C99)
Mit dem C99-Standard wurde der eingebaute Typ `_Bool` eingeführt. Er kann nur die Werte `0` (falsch) und `1` (wahr) aufnehmen.

### Der Header `<stdbool.h>`
Um den Code lesbarer zu machen, liefert `<stdbool.h>` nützliche Makros:
*   `bool` als verständlicher Name für den Typ.
*   `true` (expandiert zu `1`).
*   `false` (expandiert zu `0`).

```c
#include <stdbool.h>

bool ist_aktiv = true;
```

---

## 3.6 Speicherbedarf mit `sizeof` ermitteln

Da die exakte Größe der Datentypen (z. B. ob ein `int` 16 oder 32 Bit groß ist) von deinem Compiler und deiner Hardware abhängt, stellt C den Operator `sizeof` zur Verfügung.

Mit `sizeof` kannst du zur Übersetzungszeit ermitteln, wie viele Bytes ein bestimmter Typ oder eine Variable im Speicher belegt.

### Syntax
*   `sizeof(Datentyp)` – z. B. `sizeof(int)`
*   `sizeof variable` – z. B. `sizeof meine_zahl` (Klammern sind bei Variablen optional, werden aber aus Gründen der Einheitlichkeit oft gesetzt)

> [!TIP]
> Der Rückgabetyp von `sizeof` ist ein spezieller vorzeichenloser Ganzzahltyp namens `size_t`. Wenn du diesen Wert auf dem Bildschirm ausgeben möchtest (z. B. mit `printf`), solltest du den Formatplatzhalter `%zu` verwenden.

---

## 3.7 Wertebereiche ermitteln

Um herauszufinden, welche kleinsten und größten Werte ein Datentyp auf deinem System speichern kann, kannst du auf Standard-Header-Dateien zurückgreifen.

### Ganzzahl-Grenzwerte in `<limits.h>`
Dieser Header definiert Konstanten (Makros) für die Grenzen von Ganzzahltypen. Typische Beispiele sind:
*   `CHAR_BIT`: Anzahl der Bits in einem `char` (normalerweise 8).
*   `INT_MIN` / `INT_MAX`: Minimaler/maximaler Wert eines `signed int`.
*   `UINT_MAX`: Maximaler Wert eines `unsigned int` (das Minimum ist immer 0).
*   Analoge Makros gibt es für `CHAR`, `SHRT`, `LONG` und `LLONG`.

### Fließkomma-Grenzwerte in `<float.h>`
Für Fließkommazahlen bietet `<float.h>` ähnliche Konstanten, darunter:
*   `FLT_MIN` / `FLT_MAX`: Kleinster/größter positiver Wert für `float`.
*   `DBL_MIN` / `DBL_MAX`: Entsprechungen für `double`.
*   `FLT_DIG` / `DBL_DIG`: Anzahl der verlässlichen Dezimalstellen (Präzision).

### Integertypen fester Größe (`<stdint.h>`)
Da die Standardtypen plattformabhängig variieren, führt C99 in `<stdint.h>` Typen ein, deren Bitbreite exakt definiert ist. Diese sind besonders wichtig, wenn du hardwarenah programmierst oder Binärdateien plattformübergreifend liest/schreibst:
*   `int8_t` / `uint8_t`: Exakt 8 Bit (vorzeichenbehaftet / vorzeichenlos).
*   `int16_t` / `uint16_t`: Exakt 16 Bit.
*   `int32_t` / `uint32_t`: Exakt 32 Bit.
*   `int64_t` / `uint64_t`: Exakt 64 Bit.

### Überprüfung zur Compilezeit: `static_assert`
Ab C11 kannst du mit `static_assert` Annahmen über Typgrößen direkt beim Kompilieren prüfen lassen. Schlägt die Prüfung fehl, bricht der Compiler mit einer Fehlermeldung ab.

*Syntax-Schema:*
`static_assert(Bedingung, "Fehlermeldung");`

---

## 3.8 Konstanten erstellen

Konstanten sind Werte, die sich während der Laufzeit des Programms nicht verändern dürfen. In C gibt es zwei primäre Wege, Konstanten zu definieren:

### 1. Schreibgeschützte Variablen mit `const`
Indem du das Schlüsselwort `const` vor oder nach den Datentyp stellst, signalisierst du dem Compiler, dass der Wert nach der Initialisierung nicht mehr verändert werden darf.

```c
const double PI_KONSTANTE = 3.14159;
```
Jeder Versuch, `PI_KONSTANTE` später einen neuen Wert zuzuweisen, führt zu einem Compilerfehler.

### 2. Präprozessor-Makros mit `#define`
Mit `#define` erstellst du Textersetzungen. Der Präprozessor sucht vor dem eigentlichen Kompilieren nach dem Namen und ersetzt ihn stumpf durch den definierten Text.

```c
#define MAX_BENUTZER 100
```
> [!IMPORTANT]
> Beachte, dass am Ende einer `#define`-Zeile **kein** Semikolon steht! Wenn du dort ein Semikolon setzt, wird dieses mit in den Code kopiert, was zu schwer zu findenden Syntaxfehlern führen kann.

### Vergleich: `const` vs. `#define`
*   `const`-Konstanten haben einen Datentyp. Der Compiler kann Typprüfungen durchführen. Zudem beachten sie Gültigkeitsbereiche (Scopes).
*   `#define`-Makros haben keinen Typ und kennen keine Gültigkeitsbereiche. Sie sind reine Textersetzungen. In modernem C wird meist die Verwendung von `const` bevorzugt, sofern kein zwingender Grund für ein Makro vorliegt.

---

## 3.9 Lebensdauer und Sichtbarkeit von Variablen (Scope)

Wo eine Variable im Code bekannt ist und wie lange sie im Speicher existiert, wird durch ihren **Scope** (Gültigkeitsbereich) und ihre **Lebensdauer** bestimmt.

### Der Gültigkeitsbereich (Scope)
*   **Lokaler Gültigkeitsbereich (Block-Scope):** Variablen, die innerhalb von geschweiften Klammern `{ ... }` (z. B. in einer Funktion oder einer Schleife) definiert sind. Sie sind nur innerhalb dieser Klammern sichtbar.
*   **Globaler Gültigkeitsbereich (File-Scope):** Variablen, die außerhalb aller Funktionen deklariert werden. Sie sind im gesamten restlichen Quellcode der Datei sichtbar.

### Die Lebensdauer (Lifetime)
*   **Automatische Lebensdauer (automatische Variablen):** Lokale Variablen werden standardmäßig auf dem sogenannten *Stack* angelegt. Ihr Speicher wird automatisch reserviert, wenn der Block betreten wird, und automatisch wieder freigegeben, wenn der Block verlassen wird.
*   **Statische Lebensdauer (statische Variablen):** Deklarierst du eine lokale Variable mit dem Schlüsselwort `static`, behält sie ihren Wert auch dann, wenn der Block verlassen wird. Sie wird beim Programmstart initialisiert und existiert, bis das Programm endet.

```c
// Template für eine statische lokale Variable
static int aufrufe = 0;
```

---

## 3.10 `void` – ein unvollständiger Typ

Der Typ `void` (dt. *leer*, *nichtig*) nimmt eine Sonderrolle in C ein. Er signalisiert das Fehlen eines Typs oder Werts. Du kannst keine Variable vom Typ `void` deklarieren (z. B. ist `void x;` illegal), da der Compiler nicht weiß, wie viel Speicher er reservieren soll.

### Wofür wird `void` genutzt?
1.  **Rückgabetyp von Funktionen:** Wenn eine Funktion dem Aufrufer keinen Wert zurückgibt.
2.  **Leere Parameterliste:** Zeigt an, dass eine Funktion keine Parameter akzeptiert (z. B. `int main(void)`).
3.  **Generische Zeiger (`void*`):** Ein Zeiger auf einen unbestimmten Datentyp. Dies wirst du in späteren Kapiteln über Zeiger und dynamische Speicherverwaltung kennenlernen.

---

## 3.11 Kontrollfragen und Aufgaben

### Kontrollfragen
1.  Warum sollte man eine lokale Variable in C immer sofort initialisieren? Was passiert, wenn man es nicht tut?
2.  Welchen Unterschied gibt es bezüglich des Wertebereichs zwischen `signed int` und `unsigned int`, wenn beide Typen 32 Bit groß sind?
3.  Warum ist der Datentyp `char` eigentlich ein Ganzzahltyp?
4.  Was unterscheidet eine Konstante, die mit `const` definiert wurde, von einer Konstanten, die mit `#define` erstellt wurde?
5.  Was passiert mit dem Wert einer lokalen Variable, die mit dem Schlüsselwort `static` definiert wurde, wenn die umschließende Funktion beendet und erneut aufgerufen wird?

### Praktische Aufgaben
*(Hinweis: Erstelle für diese Aufgaben kleine Programme in einer Testumgebung, um deine Annahmen zu überprüfen. Nutze die gelernten Konzepte wie `sizeof` und die Header-Dateien.)*

*   **Aufgabe 1 (Speicherbedarf analysieren):**
    Schreibe ein Programm, das den Speicherbedarf (in Byte) der Typen `char`, `short`, `int`, `long`, `long long`, `float`, `double` und `long double` auf deinem System ermittelt und übersichtlich ausgibt. Nutze dafür die Formatierung mit `%zu`.
*   **Aufgabe 2 (Grenzwerte auslesen):**
    Erstelle ein Programm, das unter Verwendung von `<limits.h>` und `<float.h>` den maximalen Wert eines `unsigned int`, den minimalen und maximalen Wert eines `signed int` sowie die maximale Genauigkeit (Dezimalstellen) von `float` und `double` darstellt.
*   **Aufgabe 3 (Konstanten & Compilezeit-Check):**
    Definiere eine Konstante für ein Limit (z. B. maximale Puffergröße) auf zwei verschiedene Arten. Versuche anschließend im Code, diese Werte zu verändern, und beobachte die Fehlermeldungen des Compilers. Nutze zusätzlich `static_assert`, um sicherzustellen, dass die Größe deines `int`-Typs auf deinem System mindestens 4 Byte beträgt.
