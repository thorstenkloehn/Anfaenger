# 10 Zeiger (Pointer)

Zeiger gehören zu den mächtigsten, aber auch zu den am meisten gefürchteten Werkzeugen in der Programmiersprache C. Sie ermöglichen es dir, direkt mit dem Arbeitsspeicher deines Computers zu interagieren. In diesem Kapitel wirst du lernen, was Zeiger sind, wie du sie deklarierst und verwendest, und warum sie für die effiziente Programmierung in C unerlässlich sind.

---

## 10.1 Zeiger vereinbaren & 10.2 Zeiger verwenden

Um Zeiger zu verstehen, hilft eine einfache Analogie: Stell dir den Arbeitsspeicher (RAM) deines Computers wie eine lange Straße mit durchnummerierten Häusern vor. Jedes Haus steht für eine Speicherzelle (ein Byte), und die Hausnummer ist die **Speicheradresse**.

Eine normale Variable ist wie das Haus selbst – sie enthält Daten (z. B. eine Zahl oder einen Buchstaben). Ein **Zeiger (Pointer)** hingegen ist wie ein Zettel, auf dem die Hausnummer (die Speicheradresse) aufgeschrieben ist. Der Zeiger selbst enthält also keinen Nutzwert wie die Zahl 42, sondern er sagt dir, *wo* im Speicher die Zahl 42 zu finden ist.

### Zeiger deklarieren (vereinbaren)
Ein Zeiger muss immer wissen, auf welchen Datentyp er zeigt. Die Deklaration sieht wie folgt aus:

```c
Datentyp *zeiger_name;
```

Das Sternchen (`*`) signalisiert dem Compiler hierbei, dass es sich nicht um eine normale Variable, sondern um einen Zeiger handelt.

### Die beiden wichtigsten Operatoren: `&` und `*`

*   **Der Adressoperator (`&`)**: Dieser Operator gibt dir die Speicheradresse einer bereits existierenden Variable. Du kannst ihn dir als Frage vorstellen: *"Wo wohnst du?"*
*   **Der Dereferenzierungsoperator (`*`)**: Wenn du diesen Operator auf einen Zeiger anwendest, folgst du der Adresse und greifst auf den Wert zu, der an dieser Adresse gespeichert ist. Du kannst ihn dir als Aktion vorstellen: *"Gehe zu der Adresse auf dem Zettel und schaue nach, was im Haus liegt."*

> [!NOTE]
> Das Symbol `*` hat in C verschiedene Bedeutungen je nach Kontext:
> 1. Bei der **Deklaration** (`int *ptr;`) kennzeichnet es die Variable als Zeiger.
> 2. Bei der **Verwendung** im Code (`*ptr = 5;`) dient es als Dereferenzierungsoperator, um auf den Inhalt zuzugreifen.
> 3. Bei mathematischen Berechnungen dient es als **Multiplikationsoperator** (`a * b`).

### Byteweiser Zugriff mit Casts
Da Zeiger Adressen im Speicher sind, können wir dem Compiler auch vorschreiben, wie er den Speicher an einer bestimmten Adresse interpretieren soll. Wenn du beispielsweise eine Variable vom Typ `int` (die üblicherweise 4 Bytes groß ist) hast, zeigt ein `int *`-Zeiger auf den Anfang dieser 4 Bytes.

Wenn wir diesen Zeiger nun explizit in einen Zeiger auf ein einzelnes Byte umwandeln – einen sogenannten **Typecast** auf `char *` oder `uint8_t *` durchführen –, können wir die einzelnen Bytes der Variable nacheinander im Speicher auslesen.

Ein solches Syntax-Template sieht schematisch so aus:
```c
(char *)&variable
```

> [!WARNING]
> Beim byteweisen Zugriff spielt die sogenannte **Endianness** (Byte-Reihenfolge) deiner CPU eine Rolle. Auf den meisten modernen PCs (x86/x64-Architektur) wird das "Little-Endian"-Format genutzt. Das bedeutet, dass das niederwertigste Byte (Least Significant Byte) an der niedrigsten Speicheradresse liegt.

---

## 10.3 Zugriff auf Zeigerinhalt

Wenn du einen Zeiger deklarierst, ohne ihm eine Adresse zuzuweisen, zeigt er auf eine zufällige Stelle im Speicher. Man nennt einen solchen Zeiger einen **wilden Zeiger (Wild Pointer)**. Wenn du versuchst, auf diesen wilden Zeiger zuzugreifen (ihn zu dereferenzieren), kann das zu unvorhersehbarem Verhalten oder einem sofortigen Absturz des Programms (z. B. *Segmentation Fault*) führen.

### Der NULL-Zeiger
Um dieses Problem zu vermeiden, solltest du Zeiger, die noch auf keine gültige Adresse zeigen, immer mit `NULL` initialisieren. `NULL` ist eine spezielle Konstante (definiert in Standard-Headern wie `<stdio.h>` oder `<stddef.h>`), die für die Adresse `0` steht. Der Zugriff auf die Adresse `0` ist vom Betriebssystem strengstens untersagt.

```c
Datentyp *ptr = NULL;
```

Bevor du einen Zeiger dereferenzierst, solltest du immer prüfen, ob er gültig ist:

```c
if (ptr != NULL) {
    // Sicherer Zugriff möglich
}
```

> [!TIP]
> In C wird der Wert `0` als "logisch falsch" (false) interpretiert und jeder Wert ungleich `0` als "logisch wahr" (true). Daher schreiben viele Programmierer kürzer:
> `if (ptr)` statt `if (ptr != NULL)` und `if (!ptr)` statt `if (ptr == NULL)`.

---

## 10.4 Zeiger als Funktionsparameter (Call-by-Reference Simulation)

Standardmäßig übergibt C Parameter an Funktionen als Kopie (**Call-by-Value**). Wenn du eine Variable an eine Funktion übergibst und sie dort änderst, bleibt die ursprüngliche Variable in der aufrufenden Funktion völlig unberührt.

Möchtest du jedoch, dass eine Funktion den Wert einer Variablen außerhalb ihres eigenen Gültigkeitsbereichs dauerhaft verändert, musst du der Funktion die *Adresse* dieser Variable übergeben. Die Funktion nimmt dann einen Zeiger als Parameter entgegen. Dies nennt man die Simulation von **Call-by-Reference**.

### Das klassische Tausch-Konzept (Swap)
Stell dir vor, du möchtest die Werte von zwei Variablen vertauschen. Wenn du nur Kopien übergibst, klappt das nicht. Übergibst du hingegen die Adressen, kann die Funktion über die Dereferenzierung direkt auf die Original-Speicherplätze zugreifen.

Die Signatur einer solchen Funktion sieht schematisch so aus:
```c
void tausche(int *adresse_a, int *adresse_b);
```
Innerhalb der Funktion nutzt du eine temporäre Hilvsvariable, um den Wert, auf den `adresse_a` zeigt, zwischenzuspeichern, bevor du ihn überschreibst.

---

## 10.5 Zeiger als Rückgabewert (Gefahren lokaler Zeiger)

Eine Funktion kann auch einen Zeiger als Rückgabewert liefern. Das ist oft nützlich, birgt aber eine der größten Gefahren in der C-Programmierung: **Die Rückgabe eines Zeigers auf eine lokale Variable**.

Lokale Variablen werden auf dem sogenannten **Stack** angelegt. Sobald eine Funktion beendet wird, wird ihr Stack-Bereich (ihr Gültigkeitsbereich) wieder freigegeben und kann von anderen Funktionen überschrieben werden. Wenn du die Adresse einer lokalen Variable zurückgibst, zeigt der zurückgegebene Zeiger ins Leere – man spricht von einem **Dangling Pointer (hängenden Zeiger)**.

```c
// WARNUNG: Dieser Entwurf ist fehlerhaft und führt zu undefiniertem Verhalten!
int* fehlerhafte_funktion() {
    int lokale_variable = 10;
    return &lokale_variable; // Die Variable existiert nach dem return nicht mehr!
}
```

### Wie macht man es richtig?
Es gibt drei gängige Wege, um Daten sicher aus einer Funktion über Zeiger bereitzustellen:
1. Der Speicher wird außerhalb der Funktion angelegt und die Adresse als Argument an die Funktion übergeben (der sicherste und sauberste Weg).
2. Nutzung von dynamischem Speicher auf dem Heap (mittels `malloc`), welcher manuell freigegeben werden muss (wird in einem späteren Kapitel vertieft).
3. Nutzung des Schlüsselworts `static` bei der lokalen Variable, wodurch sie über die gesamte Programmlaufzeit im Speicher verbleibt.

---

## 10.6 Zeigerarithmetik

Da Zeiger Adressen sind (die intern als Ganzzahlen dargestellt werden), könnte man meinen, man könne mit ihnen wie mit normalen Zahlen rechnen. Das ist jedoch nur bedingt richtig. C erlaubt mathematische Operationen auf Zeigern, passt diese aber automatisch an die Größe des Datentyps an, auf den gezeigt wird.

### Addition und Subtraktion von Ganzzahlen
Wenn du zu einem Zeiger `1` addierst, wird die Adresse nicht um ein einzelnes Byte erhöht (außer bei `char-Zeigern`), sondern um die Größe des Typs, auf den der Zeiger zeigt.

Mathematisch ausgedrückt:
$$\text{Neue Adresse} = \text{Alte Adresse} + \left( n \cdot \text{sizeof(Datentyp)} \right)$$

*   Zeigt ein `int *ptr` auf die Adresse `1000` (und ein `int` belegt 4 Bytes), dann zeigt `ptr + 1` auf die Adresse `1004`.
*   Zeigt ein `double *ptr` auf die Adresse `1000` (und ein `double` belegt 8 Bytes), dann zeigt `ptr + 1` auf die Adresse `1008`.

### Weitere erlaubte Operationen:
*   **Subtraktion zweier Zeiger desselben Typs**: Zieht man zwei Zeiger voneinander ab, erhält man die Anzahl der *Elemente*, die zwischen ihnen liegen (nicht die Differenz in Bytes!). Das Ergebnis hat den speziellen vorzeichenbehafteten Ganzzahltyp `ptrdiff_t`.
*   **Vergleiche**: Du kannst Zeiger mit `<`, `>`, `==`, `!=` vergleichen, um herauszufinden, welcher Zeiger weiter vorne oder hinten im Speicher liegt (besonders nützlich bei Arrays).

---

## 10.7 Array-Zugriff über Zeiger & 10.8 Arrays und Zeiger an Funktionen

In C besteht eine sehr enge Verwandtschaft zwischen Arrays und Zeigern. Tatsächlich ist der Name eines Arrays ohne Index-Klammern nichts anderes als ein konstanter Zeiger auf das allererste Element des Arrays.

Wenn du ein Array deklarierst:
```c
int mein_array[5];
```
Dann ist der Name `mein_array` intern gleichbedeutend mit der Adresse des ersten Elements: `&mein_array[0]`.

### Zeigerschreibweise vs. Array-Schreibweise
Aufgrund der Zeigerarithmetik sind die folgenden beiden Ausdrücke für den Zugriff auf ein Element am Index `i` absolut identisch:

```c
mein_array[i]    // Array-Index-Schreibweise
*(mein_array + i) // Zeiger-Schreibweise
```

### Arrays an Funktionen übergeben (Array-Decay)
Wenn du ein Array als Parameter an eine Funktion übergibst, "zerfällt" das Array zu einem Zeiger auf sein erstes Element. Die Funktion verliert jegliche Information darüber, wie groß das Array ist. Daher musst du bei Arrays immer die Größe als zusätzlichen Parameter mitgeben.

Die beiden folgenden Funktionssignaturen bedeuten für den Compiler exakt dasselbe:
```c
void verarbeite_array(int arr[], int groesse);
void verarbeite_array(int *arr, int groesse);
```

### Das `const`-Versprechen
Wenn eine Funktion ein Array nur lesen, aber nicht verändern soll, solltest du den Parameter als Zeiger auf konstante Daten deklarieren. Dies dokumentiert deinen Code und verhindert, dass du versehentlich Daten überschreibst:

```c
void zeige_array(const int *arr, int groesse);
```

---

## 10.9 char-Arrays und Zeiger

Bei Zeichenketten (Strings) wird der Unterschied zwischen Arrays und Zeigern besonders deutlich und ist eine häufige Fehlerquelle für Einsteiger.

Es gibt zwei Möglichkeiten, einen String zu initialisieren:

1.  **Das beschreibbare Array auf dem Stack**:
    ```c
    char string_array[] = "Hallo";
    ```
    Hierbei reserviert der Compiler genügend Speicher auf dem Stack und kopiert die Zeichenkette inklusive des Nullbytes (`\0`) dorthin. Du darfst die einzelnen Zeichen nach Belieben verändern (z. B. `string_array[0] = 'h';`).

2.  **Der Zeiger auf ein schreibgeschütztes String-Literal**:
    ```c
    char *string_zeiger = "Hallo";
    ```
    In diesem Fall wird die Zeichenkette `"Hallo"` im sogenannten Textsegment (Read-only-Speicher) des Programms abgelegt. Der Zeiger `string_zeiger` speichert lediglich die Adresse dieses schreibgeschützten Bereichs. Ein Versuch, die Zeichen zu ändern (z. B. `string_zeiger[0] = 'h';`), führt zu einem Programmabsturz.

> [!IMPORTANT]
> Wenn du einen Zeiger direkt auf unstrukturierte Literale zeigst lässt, solltest du ihn immer als `const char *` deklarieren. So kann der Compiler dich sofort warnen, falls du versuchst, den schreibgeschützten Inhalt zu modifizieren:
> `const char *sicherer_zeiger = "Hallo";`

---

## 10.10 Arrays von Zeigern (Zeiger-Arrays)

Genau wie du Arrays von Integern oder Characters erstellen kannst, kannst du auch Arrays erstellen, deren Elemente Zeiger sind.

Die Deklaration sieht so aus:
```c
Typ *array_name[Groesse];
```

Ein klassischer Anwendungsfall ist ein Array von Zeichenketten. Anstatt ein zweidimensionales `char`-Array mit fester Breite zu erstellen (bei dem viel Speicherplatz ungenutzt bleibt, wenn die Strings unterschiedlich lang sind), erstellt man ein Array von `char`-Zeigern, bei dem jeder Zeiger auf den Anfang eines unterschiedlich langen Strings zeigt.

```c
const char *wochentage[] = {
    "Montag",
    "Dienstag",
    "Mittwoch"
    // ...
};
```

---

## 10.11 void-Zeiger (Generische Zeiger)

Manchmal möchte man mit Speicheradressen arbeiten, ohne sich zum Zeitpunkt der Programmierung auf einen bestimmten Datentyp festzulegen. Hierfür gibt es den **void-Zeiger (`void *`)**, auch bekannt als generischer Zeiger.

*   Ein `void *` kann die Adresse jedes beliebigen Datentyps aufnehmen, ohne dass ein expliziter Cast nötig ist.
*   **Achtung**: Ein `void *` weiß nicht, wie groß der Datentyp ist, auf den er zeigt. Deshalb kannst du ihn **nicht direkt dereferenzieren** und auch **keine Zeigerarithmetik** auf ihm durchführen!

Um auf den Wert zuzugreifen, musst du den `void`-Zeiger zuerst in einen Zeiger eines konkreten Typs umwandeln (casten):

```c
void *gen_ptr = &eine_zahl;
// Zugriff erfolgt durch Umwandlung, z.B. *(int *)gen_ptr
```

---

## 10.12 Typqualifizierer bei Zeigern

Die Kombination aus `const` und Zeigern kann verwirrend sein. Hier hilft die **Rechts-nach-Links-Regel**: Lies die Deklaration von rechts nach links (wobei das `*` als "Zeiger auf" gelesen wird).

### 1. Zeiger auf konstante Daten (Pointer to const)
Die Daten, auf die gezeigt wird, dürfen nicht verändert werden. Der Zeiger selbst darf jedoch auf eine andere Adresse umgebogen werden.
```c
const int *ptr; // Lies: "ptr ist ein Zeiger auf ein konstantes int"
int const *ptr; // Identische Bedeutung
```

### 2. Konstanter Zeiger (Const pointer)
Der Zeiger ist fest an eine Adresse gebunden und darf nicht mehr auf eine andere Adresse zeigen. Die Daten an dieser Adresse dürfen jedoch verändert werden.
```c
int * const ptr; // Lies: "ptr ist ein konstanter Zeiger auf ein int"
```

### 3. Konstanter Zeiger auf konstante Daten
Weder der Zeiger (die Adresse) noch die Daten dürfen verändert werden.
```c
const int * const ptr; // Lies: "ptr ist ein konstanter Zeiger auf ein konstantes int"
```

### Der `restrict`-Qualifizierer
Seit dem C99-Standard gibt es den Qualifizierer `restrict`:
```c
int * restrict ptr;
```
Mit `restrict` versicherst du dem Compiler, dass der Speicherbereich, auf den `ptr` zeigt, *ausschließlich* über diesen Zeiger (und nicht über andere, gleichzeitig existierende Zeiger/Aliase) angesprochen wird. Dies erlaubt dem Compiler, extrem effiziente Optimierungen im Maschinencode vorzunehmen, da er nicht damit rechnen muss, dass der Wert unbemerkt über einen anderen Zeiger verändert wird.

---

## 10.13 Zeiger auf Funktionen (Funktionszeiger)

Nicht nur Variablen haben Adressen im Speicher, sondern auch der ausführbare Code von Funktionen. Ein **Funktionszeiger** speichert die Einstiegsadresse einer Funktion. Damit kannst du Funktionen wie Variablen an andere Funktionen übergeben oder dynamisch zur Laufzeit entscheiden, welche Funktion aufgerufen werden soll.

### Deklaration eines Funktionszeigers
Die Syntax erfordert genaue Klammersetzung:
```c
Rückgabetyp (*zeiger_name)(Parameterliste);
```

> [!WARNING]
> Die Klammern um den Stern und den Namen sind zwingend erforderlich!
> `int *funktion(void);` deklariert eine normale Funktion, die einen Zeiger auf ein `int` zurückgibt.
> `int (*zeiger)(void);` deklariert einen Zeiger auf eine Funktion, die ein `int` zurückgibt.

### Zuweisung und Aufruf
Du kannst dem Funktionszeiger einfach den Namen einer Funktion (ohne Klammern) zuweisen. Der Aufruf erfolgt dann wie bei einer normalen Funktion über den Zeigernamen.

Ein typischer Einsatzzweck sind sogenannte **Callback-Funktionen**. Ein Beispiel aus der Standardbibliothek ist die Sortierfunktion `qsort()`, die einen Funktionszeiger auf eine Vergleichsfunktion erwartet, um Elemente flexibel nach deinen eigenen Kriterien zu sortieren.

---

## 10.14 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen dem Adressoperator `&` und dem Dereferenzierungsoperator `*`?
2. Warum ist ein uninitialisierter Zeiger gefährlich und wie schützt man sich davor?
3. Warum führt die Rückgabe der Adresse einer lokalen Variable aus einer Funktion heraus meist zu einem Programmabsturz oder fehlerhaften Daten?
4. Wenn ein `int *ptr` auf die Speicheradresse `0x1000` zeigt und ein `int` 4 Bytes groß ist, auf welche Adresse zeigt `ptr + 2`?
5. Was ist der Unterschied zwischen `char *str = "Test";` und `char str[] = "Test";`?
6. Erkläre den Unterschied zwischen `const int *p` und `int * const p`.

### Praktische Aufgaben (ohne fertige Codelösungen)

#### Aufgabe 1: Die eigene Swap-Funktion
Entwirf eine Funktion, die die Werte zweier `double`-Variablen dauerhaft vertauscht. Schreibe ein kleines Testprogramm, das zwei Variablen deklariert, ihre Werte vor dem Funktionsaufruf ausgibt, die Funktion aufruft und die getauschten Werte danach erneut anzeigt.
*Hinweis: Verwende das Call-by-Reference-Prinzip.*

#### Aufgabe 2: Byteweise Zerlegung einer Zahl
Schreibe ein Programm, das eine `unsigned int`-Zahl einliest (z.B. im Hexadezimalformat wie `0x12345678`). Verwende einen Zeigercast auf einen Byte-Typ (`unsigned char *`), um die vier einzelnen Bytes, aus denen die Zahl im Speicher besteht, nacheinander auf der Konsole auszugeben.
*Tipp: Beobachte die Reihenfolge der Bytes auf deinem PC (Stichwort: Endianness).*

#### Aufgabe 3: Zeichenketten-Länge ermitteln (strlen-Nachbau)
Schreibe eine Funktion, die die Länge einer Zeichenkette ermittelt, ohne die Bibliotheksfunktion `strlen` oder den Array-Index-Operator `[]` zu verwenden. Nutze stattdessen ausschließlich Zeigerarithmetik, um durch das Array zu wandern, bis du auf das terminierende Nullbyte stößt.
*Hinweis: Die Signatur sollte einen Zeiger auf konstante Zeichen entgegennehmen.*

#### Aufgabe 4: Das sichere Array-Minimum
Erstelle eine Funktion, die das kleinste Element eines `double`-Arrays sucht und einen *Zeiger auf dieses Element* zurückgibt. Sollte das Array leer sein (Größe 0) oder der übergebene Array-Zeiger ungültig (`NULL`) sein, soll die Funktion ebenfalls `NULL` zurückgeben.
*Achtung: Achte darauf, dass du nicht den Wert oder den Index zurückgibst, sondern die konkrete Adresse des Elements im Original-Array.*
