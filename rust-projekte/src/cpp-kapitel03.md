# 3 Die eingebauten C++-Basisdatentypen

Willkommen im dritten Kapitel! In diesem Kapitel beschäftigen wir uns mit den grundlegenden Bausteinen, aus denen jedes C++-Programm besteht: den eingebauten Datentypen. Du wirst lernen, wie du Daten im Speicher deines Computers ablegst, wie du diese Daten benennst, veränderst und vor unbeabsichtigten Modifikationen schützt. 

Wir orientieren uns dabei am modernen Standard **C++23**, was bedeutet, dass wir von Anfang an auf moderne Sprach- und Bibliotheksfeatures setzen.

---

## 3.1 Variablen

Stell dir den Arbeitsspeicher (RAM) deines Computers wie ein riesiges Lagerhaus voller nummerierter Boxen vor. Jede Box kann Daten aufnehmen. Um nicht mit kryptischen Speicheradressen hantieren zu müssen, nutzen wir **Variablen**.

Eine Variable ist nichts anderes als ein benannter Speicherbereich. In C++ ist jede Variable an einen bestimmten **Datentyp** gebunden. C++ ist eine statisch typisierte Sprache. Das bedeutet:
1. Du musst dem Compiler mitteilen, welche Art von Daten (z. B. Ganzzahl, Fließkommazahl oder Zeichen) in der Variablen gespeichert werden soll.
2. Der Datentyp einer Variablen kann sich während ihrer gesamten Lebensdauer nicht mehr ändern.

Diese strenge Typisierung hilft dem Compiler, bereits vor dem Ausführen des Programms viele Fehler (wie das versehentliche Addieren eines Buchstabens zu einer Zahl) zu erkennen.

---

## 3.2 Definition und Deklaration

Bevor du eine Variable verwenden kannst, muss der Compiler sie kennen. Hierbei unterscheidet C++ streng zwischen zwei Begriffen:

*   **Deklaration:** Du machst dem Compiler den Namen und den Typ einer Variablen bekannt. Es wird jedoch noch kein Speicherplatz reserviert.
*   **Definition:** Du forderst den Compiler auf, tatsächlich Speicherplatz für die Variable zu reservieren. Jede Definition ist gleichzeitig auch eine Deklaration, aber nicht jede Deklaration ist eine Definition.

In der Praxis wirst du Variablen meistens direkt definieren. Eine reine Deklaration benötigst du vor allem dann, wenn eine Variable in einer anderen Datei existiert und du dem aktuellen Quelltext mitteilen willst, dass es sie gibt.

### Syntax-Schema für eine Definition:
```cpp
Typbezeichner Variablenname;
```

---

## 3.3 Initialisierung und Zuweisung

Es ist ein wichtiger Unterschied, ob du einer Variablen zum ersten Mal einen Wert givst (**Initialisierung**) oder ob du einen bereits existierenden Wert überschreibst (**Zuweisung**).

### Die Zuweisung
Eine Zuweisung nutzt den Zuweisungsoperator `=`. Dabei wird der Wert auf der rechten Seite in die Variable auf der linken Seite geschrieben.

### Die Evolution der Initialisierung in C++
Historisch gewachsen gibt es in C++ verschiedene Wege, eine Variable zu initialisieren. 

1.  **Kopierinitialisierung** (aus C übernommen):
    ```cpp
    Typ name = wert;
    ```
2.  **Direkte Initialisierung** (mit runden Klammern):
    ```cpp
    Typ name(wert);
    ```
3.  **Brace-Initialization (Uniform Initialization)**:
    Seit C++11 (und in C++23 der absolute Standard) wird die Initialisierung mit geschweiften Klammern `{}` empfohlen.
    ```cpp
    Typ name{wert};
    ```

#### Warum solltest du Brace-Initialization bevorzugen?
*   **Sicherheit vor Datenverlust (Narrowing Conversions):** Wenn du versuchst, einen Wert mit Nachkommastellen (z. B. eine Fließkommazahl) in eine Ganzzahl-Variable zu zwingen, bricht der Compiler bei der Verwendung von geschweiften Klammern mit einem Fehler ab. Bei der Kopierinitialisierung würde der Nachkommateil einfach stillschweigend abgeschnitten werden!
*   **Wertinitialisierung (Zero-Initialization):** Schreibst du leere geschweifte Klammern `{}`, wird die Variable automatisch mit einem sicheren Standardwert (bei Zahlen ist das `0`) initialisiert. Uninitialisierte Variablen, die zufälligen "Speichermüll" enthalten, gehören damit der Vergangenheit an.

> [!TIP]
> Gewöhne dir von Anfang an an, Variablen immer zu initialisieren. Nutze dafür bevorzugt die geschweiften Klammern `{}`.

---

## 3.4 Ganzzahltypen

Ganzzahlen (engl. *integers*) sind Zahlen ohne Nachkommastellen. C++ stellt verschiedene Ganzzahltypen zur Verfügung, die sich in ihrer Speichergröße und damit in ihrem Wertebereich unterscheiden:

*   `short`: Für kleinere Ganzzahlen (meistens 16 Bit groß).
*   `int`: Der Standardtyp für Ganzzahlen (meistens 32 Bit groß).
*   `long`: Für größere Ganzzahlen (meistens 32 oder 64 Bit groß).
*   `long long`: Für sehr große Ganzzahlen (garantiert mindestens 64 Bit groß).

### Vorzeichenbehaftet vs. Vorzeichenlos
Standardmäßig können diese Typen sowohl positive als auch negative Werte speichern (sie sind *signed*). Wenn du das Schlüsselwort `unsigned` voranstellst, kann die Variable nur noch nicht-negative Werte (0 und größer) speichern. Dadurch verdoppelt sich der positive Wertebereich.

```cpp
unsigned int positiveZahl{42u};
```

### Ganzzahl-Literale und Formatierungen
Du kannst Zahlen im Code auf verschiedene Weisen schreiben:
*   **Dezimal:** `15`
*   **Binär** (mit Präfix `0b`): `0b1111`
*   **Oktal** (mit Präfix `0`): `017`
*   **Hexadezimal** (mit Präfix `0x`): `0xF`

> [!NOTE]
> Seit C++14 kannst du das einfache Anführungszeichen `'` als Tausendertrennzeichen nutzen, um große Zahlen lesbarer zu schreiben, z. B. `1'000'000`.

Um dem Compiler mitzuteilen, welchen genauen Typ ein Literal hat, kannst du Suffixe anhängen (z. B. `U` für `unsigned`, `L` für `long`, `LL` für `long long`).

---

## 3.5 Ganzzahldatentyp für Zeichen

Zeichen wie Buchstaben, Ziffern und Sonderzeichen werden im Computer als Zahlen codiert (z. B. über ASCII oder Unicode). In C++ sind Zeichentypen daher im Kern ebenfalls Ganzzahltypen.

*   `char`: Der klassische Typ für ein einzelnes Zeichen (meistens 1 Byte). Er wird meist für ASCII-Zeichen verwendet.
*   `wchar_t`: Ein "breiter" Zeichentyp für größere Zeichensätze (plattformabhängig).
*   `char8_t` (seit C++20): Speziell für UTF-8-codierte Zeichen.
*   `char16_t` (seit C++11): Speziell für UTF-16-codierte Zeichen.
*   `char32_t` (seit C++11): Speziell für UTF-32-codierte Zeichen.

Zeichenliterale werden in einfache Anführungszeichen gesetzt (z. B. `'A'`). Je nach Zeichentyp stellt man ein Präfix voran (z. B. `u8'A'` für ein UTF-8-Zeichen).

---

## 3.6 Fließkommazahlentypen

Fließkommazahlen (oder Gleitkommazahlen) werden zur Darstellung von reellen Zahlen mit Nachkommastellen verwendet. C++ bietet drei Standardtypen:

*   `float`: Einfache Genauigkeit (meist 32 Bit).
*   `double`: Doppelte Genauigkeit (meist 64 Bit). Dies ist der Standardtyp für wissenschaftliche Berechnungen und allgemeine Fließkommazahlen.
*   `long double`: Erweiterte Genauigkeit (meist 80 oder 128 Bit).

### Literale
Standardmäßig ist ein Fließkommaliteral im Code (z. B. `3.14`) vom Typ `double`. Möchtest du explizit ein `float` deklarieren, hängst du ein `f` oder `F` an (`3.14f`). Für wissenschaftliche Notationen kannst du den Exponenten mit `e` oder `E` angeben (z. B. `2.99792e8` für $2.99792 \times 10^8$).

---

## 3.7 Der auto-Typ (Typinferenz)

Manchmal ist der Typ einer Variablen offensichtlich, weil wir sie sofort mit einem Wert initialisieren. C++ bietet mit dem Schlüsselwort `auto` die Möglichkeit der automatischen Typableitung (Typinferenz). Der Compiler schaut sich den Typ des Initialisierungswerts an und bestimmt den Typ der Variablen zur Compilezeit.

```cpp
auto temperatur{21.5}; // Compiler leitet double ab
auto zaehler{100};     // Compiler leitet int ab
```

> [!IMPORTANT]
> `auto` ist kein dynamischer Typ wie in JavaScript oder Python! Sobald der Typ beim Kompilieren festgelegt wurde, bleibt er unveränderlich. Du kannst `auto` nur verwenden, wenn die Variable bei der Definition auch direkt initialisiert wird.

---

## 3.8 Konstanten

Manchmal möchtest du Werte im Programm unveränderlich machen, um Fehler zu vermeiden und dem Compiler Optimierungen zu ermöglichen. C++ unterscheidet hierbei sehr fein:

### 1. `const` (Laufzeit-Konstante)
Das Versprechen, dass der Wert nach der Initialisierung nicht mehr verändert werden darf. Der Wert kann erst zur Laufzeit des Programms ermittelt werden (z. B. durch eine Benutzereingabe).

### 2. `constexpr` (Compilezeit-Konstante)
Garantiert, dass der Wert bereits während des Übersetzungsvorgangs (Compilezeit) berechnet werden kann. Das spart Rechenzeit beim Ausführen des Programms.

### 3. `consteval` (seit C++20)
Kennzeichnet eine Funktion als sogenannte "Immediate Function" (Sofortfunktion). Sie *muss* zur Compilezeit ausgewertet werden. Ein Aufruf zur Laufzeit ist ausgeschlossen.

### 4. `constinit` (seit C++20)
Garantiert, dass eine Variable mit statischer oder Thread-Lebensdauer zur Compilezeit initialisiert wird. Im Gegensatz zu `constexpr` muss die Variable selbst danach nicht zwingend konstant (`const`) sein.

---

## 3.9 Die Byte-Größe mit dem sizeof-Operator

Die tatsächliche physische Größe der Datentypen im Arbeitsspeicher kann sich je nach Computerarchitektur (z. B. 32-Bit vs. 64-Bit) und Betriebssystem unterscheiden. Mit dem Operator `sizeof` kannst du herausfinden, wie viele Bytes ein bestimmter Typ oder eine Variable auf deinem aktuellen System belegt.

### Syntax-Schema:
```cpp
sizeof(Typname)
// oder
sizeof(Variablenname)
```
Ein `sizeof(char)` liefert laut C++-Standard garantiert immer den Wert `1`.

---

## 3.10 Limits für die Basisdatentypen

Woher weißt du, wie groß die größte Zahl ist, die du in einem `int` speichern kannst? Die C++-Standardbibliothek bietet dafür das Template `std::numeric_limits` an (verfügbar über den Import der Standardbibliothek).

Mit Ausdrücken wie `std::numeric_limits<Typ>::max()` oder `std::numeric_limits<Typ>::min()` kannst du die jeweiligen Extremwerte für jeden eingebauten Typ abfragen.

---

## 3.11 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen einer Variablendeklaration und einer Variablendefinition?
2. Warum schützt dich die moderne *Brace-Initialization* `{}` besser vor Programmierfehlern als die klassische Kopierinitialisierung mit `=`?
3. Wann solltest du `constexpr` anstelle von einfachem `const` verwenden?
4. Welchen Vorteil bietet das Schlüsselwort `auto` und worauf musst du bei der Verwendung achten?
5. Warum liefert `sizeof(char)` auf jedem C++-kompatiblen System immer `1`?

### Aufgaben
*   **Aufgabe 1 (Speicherplatz-Detektiv):**
     Schreibe ein Programm, das mithilfe von `sizeof` die Speichergröße der Typen `short`, `int`, `long`, `long long`, `float`, `double` und `char` auf deinem System ermittelt und übersichtlich ausgibt. Nutze dafür die moderne Ausgabefunktion `std::println`.
    
*   **Aufgabe 2 (Das Limit austesten):**
    Finde mithilfe von `std::numeric_limits` heraus, welches die größte und kleinste darstellbare Zahl für `int` und `unsigned int` auf deinem System ist. Gib diese Werte aus. Was passiert wohl, wenn du zu dem maximalen Wert eines `unsigned int` eins addierst? (Stichwort: Ganzzahlüberlauf/Overflow).

*   **Aufgabe 3 (Sicherheitstest mit geschweiften Klammern):**
    Probiere aus, was passiert, wenn du versuchst, eine Fließkommazahl (z. B. `5.9`) per Brace-Initialization in eine Variable vom Typ `int` zu schreiben. Vergleiche die Reaktion deines Compilers mit einer Zuweisung über das Gleichheitszeichen `=`.

*   **Aufgabe 4 (Konstanten-Experiment):**
    Definiere eine `constexpr`-Variable für die Kreiszahl Pi und versuche im weiteren Verlauf deines Codes, diesen Wert zu verändern. Welche Fehlermeldung gibt dir der Compiler aus?
