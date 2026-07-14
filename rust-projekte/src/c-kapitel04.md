# 4 Rechnen mit C und Operatoren

Ein Computer wäre nutzlos, wenn er nicht rechnen könnte. In diesem Kapitel lernst du, wie du Daten vom Benutzer einliest, diese mithilfe von verschiedenen Operatoren verarbeitest, den Datentyp bei Bedarf anpasst und komplexe mathematische Berechnungen durchführst.

---

## 📥 4.1 Werte formatiert einlesen mit `scanf()`

### Die Analogie: Der Paketbote und das Klingelschild
Wenn du dem Programm über die Tastatur Daten übergibst, ist das wie ein Paket, das an dein Haus geliefert wird. 
* Die Funktion `scanf()` übernimmt die Rolle des Paketboten.
* Sie benötigt zwei Dinge: 
  1. Eine **Versandanweisung** (den Formatbezeichner), die beschreibt, was im Paket ist (z. B. eine Ganzzahl oder ein Buchstabe).
  2. Die **genaue Adresse** (den Speicherort der Variable), an die das Paket geliefert werden soll.

Gibst du dem Boten nur den Namen der Variable, weiß er nicht, wo die Kiste im Speicherregal steht. Du musst ihm die genaue Adresse geben. Das erreichst du in C mit dem **Adressoperator `&`** (Und-Zeichen).

### Syntax-Template: Daten einlesen
```c
int alter = 0;
// Der Adressoperator & liefert die Speicheradresse der Variable 'alter'
scanf("%d", &alter);
```

### Die wichtigsten Formatbezeichner für `scanf()`
| Typ | Formatbezeichner | Erklärung |
| :--- | :--- | :--- |
| `int` | `%d` oder `%i` | Ganzzahl (Integer) |
| `float` | `%f` | Einfache Gleitkommazahl |
| `double` | `%lf` | Doppelt genaue Gleitkommazahl (long float) |
| `char` | `%c` | Einzelnes Zeichen |

> [!WARNING]
> **Die häufigste Fehlerquelle für Abstürze:**
> Wenn du das `&` vor dem Variablennamen bei `scanf()` vergisst (z. B. `scanf("%d", alter);`), interpretiert C den aktuellen *Wert* der Variable als Speicheradresse. Das Programm versucht dann, an einen völlig zufälligen Ort im Arbeitsspeicher zu schreiben. Die Folge: Ein sofortiger Absturz des Programms (oft als *Segmentation Fault* oder *Segmentierungsfehler* bezeichnet).

> [!TIP]
> **Das Problem mit dem Zeilenumbruch bei `%c`:**
> Wenn du eine Zahl einliest und direkt danach ein einzelnes Zeichen (`char`) mit `%c` einlesen möchtest, überspringt `scanf()` die Eingabe scheinbar. Das liegt daran, dass die Eingabetaste (`Enter`), die du nach der Zahl gedrückt hast, als Steuerzeichen (`\n`) im Eingabepuffer verbleibt. `scanf("%c", ...)` liest dann einfach diesen Zeilenumbruch ein.
> **Die Lösung:** Schreibe ein führendes Leerzeichen vor den Formatbezeichner: `scanf(" %c", &zeichen);`. Dieses Leerzeichen weist `scanf()` an, alle vorherigen Whitespaces (wie Leerzeichen oder Zeilenumbrüche) zu ignorieren.

---

## ➕ 4.2 & 4.3 Operatoren und Arithmetische Operatoren

Operatoren sind Symbole, die den Compiler anweisen, eine bestimmte mathematische oder logische Operation durchzuführen.

### Die fünf arithmetischen Grundoperatoren in C
C bietet die klassischen mathematischen Operationen an:

* `+` (Addition)
* `-` (Subtraktion)
* `*` (Multiplikation)
* `/` (Division)
* `%` (Modulo / Restwert-Division)

### Die Falle der Ganzzahldivision
In C bestimmt der Datentyp der Operanden das Ergebnis der Operation. Wenn du zwei Ganzzahlen (`int`) durcheinander teilst, führt C eine **Ganzzahldivision** durch. Alle Nachkommastellen werden einfach abgeschnitten (nicht gerundet!).

```c
int ergebnis_ganz = 5 / 2;     // Ergibt 2, nicht 2.5!
double ergebnis_komma = 5 / 2; // Ergibt ebenfalls 2.0! Warum? Weil die Division 5/2 zuerst als Ganzzahl gerechnet wird.
```

Damit eine Division Nachkommastellen liefert, muss mindestens einer der beiden Partner eine Gleitkommazahl sein:

```c
double korrekt = 5.0 / 2;      // Ergibt 2.5, da 5.0 ein double ist.
```

### Der Modulo-Operator `%`
Der Modulo-Operator berechnet den **Rest** einer Ganzzahldivision. Er ist extrem nützlich, um beispielsweise zu prüfen, ob eine Zahl gerade oder ungerade ist, oder um periodische Abläufe zu programmieren.

```c
int rest = 7 % 3; // Ergibt 1, da 7 = 2 * 3 + Rest 1
```

> [!NOTE]
> Der Modulo-Operator `%` darf in C **ausschließlich** auf Ganzzahltypen (`int`, `char`, `short`, `long`) angewendet werden. Die Verwendung auf Fließkommazahlen (`float`, `double`) führt zu einem Compilerfehler.

### Operatorrangfolge (Präzedenz)
Wie in der Schulmathematik gilt auch in C: **Punktrechnung vor Strichrechnung** (`*`, `/`, `%` binden stärker als `+`, `-`). Du kannst Klammern `()` verwenden, um die Reihenfolge der Auswertung explizit zu steuern.

---

## 📈 4.4 Inkrement- und Dekrement-Operator (`++`, `--`)

Sehr häufig muss eine Variable um genau den Wert `1` erhöht oder verringert werden (z. B. beim Zählen in Schleifen). C bietet dafür extrem kompakte Operatoren:

* `++` (Inkrement, erhöht um 1)
* `--` (Dekrement, verringert um 1)

Es gibt zwei Arten, diese Operatoren einzusetzen: **Präfix** (vor der Variable) und **Postfix** (nach der Variable). Der Unterschied ist subtil, aber entscheidend, wenn der Ausdruck gleichzeitig in einer Zuweisung genutzt wird.

### 1. Präfix-Schreibweise (`++x` / `--x`)
* **Prinzip:** Erst erhöhen/verringern, dann den Wert im Ausdruck verwenden.

```c
int x = 5;
int y = ++x; // x wird auf 6 erhöht. Danach wird der neue Wert (6) an y zugewiesen.
             // Ergebnis: x = 6, y = 6
```

### 2. Postfix-Schreibweise (`x++` / `x--`)
* **Prinzip:** Erst den aktuellen Wert im Ausdruck verwenden, danach die Variable erhöhen/verringern.

```c
int x = 5;
int y = x++; // Der aktuelle Wert von x (5) wird an y zugewiesen. Danach erst wird x auf 6 erhöht.
             // Ergebnis: x = 6, y = 5
```

> [!TIP]
> Wenn der Inkrement- oder Dekrement-Operator alleine auf einer Zeile steht (z. B. `x++;` oder `++x;`), gibt es keinen Unterschied im Ergebnis. Nutze in diesem Fall die Variante, die du besser lesen kannst. Aus historischen Gründen sieht man in C-Code sehr häufig die Postfix-Variante (`x++`).

---

## 🔌 4.5 Bit-Operatoren (`&`, `|`, `^`, `~`, `<<`, `>>`)

### Die Analogie: Das Schaltbrett mit Lämpchen
Im Computer wird alles als Folge von Nullen und Einsen (Bits) gespeichert. Stell dir eine Variable wie eine Reihe von 8 Glühbirnen vor (ein Byte). Jede Birne kann entweder aus (`0`) oder an (`1`) sein.
Mit Bit-Operatoren manipulierst du diese Birnen direkt einzeln oder verschiebst sie auf dem Brett.

| Operator | Name | Wirkungsweise | Analogie |
| :--- | :--- | :--- | :--- |
| `&` | Bitweises UND | Ergibt 1, wenn beide Bits 1 sind. | Licht brennt nur, wenn Schalter A **und** B an sind. |
| `\|` | Bitweises ODER | Ergibt 1, wenn mindestens ein Bit 1 ist. | Licht brennt, wenn Schalter A **oder** B (oder beide) an sind. |
| `^` | Bitweises XOR | Ergibt 1, wenn genau ein Bit 1 ist. | Wechselschaltung: Licht brennt nur, wenn die Schalter ungleich stehen. |
| `~` | Bitweises NICHT | Invertiert alle Bits (aus 0 wird 1, aus 1 wird 0). | Ein Umkehrschalter. |
| `<<` | Links-Shift | Verschiebt alle Bits nach links (füllt rechts mit 0). | Alle Lämpchen rutschen nach links. (Entspricht Multiplikation mit 2) |
| `>>` | Rechts-Shift | Verschiebt alle Bits nach rechts. | Alle Lämpchen rutschen nach rechts. (Entspricht Division durch 2) |

### Syntax-Templates der Bit-Operationen
```c
int a = 0b00001100; // Binärschreibweise (in modernem C erlaubt)
int b = 0b00001010;

int ergebnis_und  = a & b;  // Bitweises UND
int ergebnis_oder = a | b;  // Bitweises ODER
int ergebnis_xor  = a ^ b;  // Bitweises XOR
int invertiert    = ~a;     // Bitweises NICHT

int shift_links   = a << 2; // Bits um 2 Stellen nach links schieben
int shift_rechts  = a >> 1; // Bits um 1 Stelle nach rechts schieben
```

> [!IMPORTANT]
> **Verwechsle niemals Bit-Operatoren mit logischen Operatoren!**
> * `&` und `|` arbeiten auf Bit-Ebene mit den einzelnen Bits von Zahlen.
> * `&&` (logisches UND) und `||` (logisches ODER) arbeiten auf logischer Ebene und werten Bedingungen als Ganzes aus (`wahr` oder `falsch`). 

---

## 🔀 4.6 Implizite Typumwandlung (Arithmetische Umwandlung)

Manchmal mischst du in einer Berechnung unterschiedliche Datentypen, zum Beispiel wenn du eine Ganzzahl (`int`) mit einer Fließkommazahl (`float`) addierst. C lässt das zu und konvertiert die Typen automatisch (implizit) im Hintergrund.

### Die goldene Regel: Die Promotion zum größeren Typ
C möchte keinen Informationsverlust erleiden. Daher gilt die Faustregel: **Der kleinere Typ wird temporär in den größeren, präziseren Typ umgewandelt.**

Die Hierarchie der wichtigsten Typen (vereinfacht, von klein/ungenau zu groß/präzise):
$$\text{char} \rightarrow \text{int} \rightarrow \text{float} \rightarrow \text{double}$$

Wird ein `int` mit einem `double` verrechnet, konvertiert C den `int`-Wert im Hintergrund in einen `double` und rechnet dann mit zwei `double`-Werten weiter. Das Ergebnis ist ebenfalls ein `double`.

### Typpromotion (Integer Promotion)
Kleine Ganzzahltypen (`char`, `short`) werden bei Berechnungen in C automatisch immer zuerst in den Standard-Ganzzahltyp `int` umgewandelt (promotet), noch bevor die eigentliche Operation stattfindet.

---

## 🛠️ 4.7 Explizite Typumwandlung (Typecast)

Manchmal möchtest du die automatische Umwandlung von C gezielt überstimmen oder eine Umwandlung erzwingen. Das nennt man einen **Typecast**.

### Die Syntax
Du setzt einfach den gewünschten Zieltyp in runden Klammern direkt vor den Wert oder die Variable, die du umwandeln möchtest.

```c
(Zieltyp) Variable_oder_Wert
```

### Anwendungsfall: Die Ganzzahldivision bezwingen
Wenn du zwei `int`-Variablen hast, aber ein Ergebnis mit Kommastellen erzwingen willst, hilft der Typecast:

```c
int zaehler = 5;
int nenner = 2;

// Einer der beiden Werte wird explizit in ein double verwandelt
double ergebnis = (double)zaehler / nenner; 
```

Da `zaehler` durch den Typecast nun als `double` behandelt wird, greift die automatische implizite Typumwandlung für `nenner`. C rechnet also `double / int`, wandelt den `nenner` ebenfalls in ein `double` um und führt eine präzise Fließkommadivision durch. Das Ergebnis ist korrekt `2.5`.

> [!WARNING]
> **Achtung bei der Klammerung!**
> Wenn du stattdessen schreibst: `(double)(zaehler / nenner)`, wird zuerst die Ganzzahldivision durchgeführt (Ergebnis `2`) und erst danach das Ergebnis `2` in `2.0` umgewandelt. Die Nachkommastellen sind dann bereits verloren!

---

## 🧮 4.8 Mathematische Funktionen in C (`math.h`)

Die arithmetischen Operatoren bieten nur die Grundrechenarten. Für komplexere Berechnungen (z. B. Wurzelziehen, Trigonometrie oder Potenzieren) bringt C eine Standardbibliothek mit.

Um diese Funktionen nutzen zu können, musst du die Header-Datei `<math.h>` am Anfang deines Programms einbinden:

```c
#include <math.h>
```

### Wichtige Funktionen im Überblick
Alle diese Funktionen arbeiten standardmäßig mit dem Datentyp `double` für maximale Präzision:

* `sqrt(x)`: Berechnet die Quadratwurzel von $x$ ($\sqrt{x}$).
* `pow(x, y)`: Berechnet $x$ hoch $y$ ($x^y$).
* `abs(x)`: Liefert den Absolutwert (Betrag) einer Ganzzahl (für Kommazahlen nutzt man `fabs(x)`).
* `ceil(x)`: Rundet auf die nächste ganze Zahl auf (z. B. `3.1` wird zu `4.0`).
* `floor(x)`: Rundet auf die nächste ganze Zahl ab (z. B. `3.9` wird zu `3.0`).
* `sin(x)`, `cos(x)`, `tan(x)`: Trigonometrische Funktionen (Achtung: Winkel im **Bogenmaß** angeben!).

> [!IMPORTANT]
> **Besonderheit beim Compilieren unter Linux (GCC):**
> Wenn du ein Programm kompilierst, das Funktionen aus `<math.h>` nutzt, erhältst du unter Linux häufig einen Fehler beim Linken (z. B. `undefined reference to 'sqrt'`). 
> **Die Lösung:** Du musst dem Compiler explizit sagen, dass er die Mathe-Bibliothek dazulinken soll. Das machst du durch Anhängen der Option `-lm` (Link Math) am Ende deines GCC-Befehls:
> `gcc mein_programm.c -o mein_programm -lm`

---

## 📝 4.9 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Warum führt `float ergebnis = 1 / 4;` dazu, dass in `ergebnis` der Wert `0.0` gespeichert wird? Wie kannst du das korrigieren?
2. Was ist der Unterschied zwischen der Postfix-Schreibweise (`x++`) und der Präfix-Schreibweise (`++x`)?
3. Welche Gefahr droht, wenn du bei `scanf()` das Adresszeichen `&` vor einer einfachen Variablen vergisst?
4. Warum ergibt der Ausdruck `~0` (bitweises NICHT einer 0) auf einem typischen System nicht einfach `1`, sondern eine sehr große negative oder positive Zahl?
5. Welchen Compiler-Parameter musst du unter Linux anfügen, wenn du Funktionen aus `math.h` verwendest, und warum?

### Aufgaben (Ohne fertige Programmlösungen)

#### Aufgabe 1: Der Temperatur-Umrechner
Schreibe ein Programm, das eine Temperatur in Fahrenheit vom Benutzer einliest und diese in Celsius umrechnet.
* **Formel:** $C = (F - 32) \cdot \frac{5}{9}$
* **Hinweis:** Achte penibel auf die Division in der Formel. Wenn du dort `5 / 9` schreibst, wird das Ergebnis immer `0` sein. Nutze dein Wissen über Typumwandlung oder Fließkomma-Konstanten!

#### Aufgabe 2: Gerade oder Ungerade via Bit-Check
Lies eine Ganzzahl vom Benutzer ein. Bestimme mithilfe des bitweisen UND-Operators (`&`), ob die eingegebene Zahl gerade oder ungerade ist, und gib einen entsprechenden Hinweis aus.
* **Tipp:** Betrachte die Binärdarstellung einer ungeraden Zahl. Welches Bit entscheidet darüber, ob eine Zahl durch 2 teilbar ist?

#### Aufgabe 3: Hypotenuse eines rechtwinkligen Dreiecks berechnen
Erstelle ein Programm, das die Längen der beiden Katheten $a$ und $b$ eines rechtwinkligen Dreiecks einliest und die Länge der Hypotenuse $c$ berechnet.
* **Formel (Satz des Pythagoras):** $c = \sqrt{a^2 + b^2}$
* **Hinweis:** Binde die passende mathematische Bibliothek ein und verwende die Funktionen zum Potenzieren und Wurzelziehen. Vergiss beim Kompilieren nicht den passenden Linker-Parameter!
