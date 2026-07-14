# 8 Präprozessor-Direktiven

Bevor dein C-Programm vom Compiler in Maschinencode übersetzt wird, geht ein unsichtbarer Helfer über deinen Quellcode: der **Präprozessor**. Er führt rein textuelle Ersetzungen durch und bereitet den Code für die eigentliche Übersetzung vor. 

Alle Anweisungen an den Präprozessor beginnen mit dem Doppelkreuz-Symbol `#` und benötigen am Zeilenende **kein** Semikolon. In diesem Kapitel lernst du, wie du den Präprozessor steuerst, um Code modularer, flexibler und robuster zu gestalten.

---

## 8.1 Dateien einfügen mit `#include` (`<>` vs. `""`)

Die `#include`-Direktive kopiert den gesamten Inhalt einer anderen Datei an genau der Stelle ein, an der die Direktive steht. Das kennst du bereits von der Standardbibliothek (z. B. `<stdio.h>`). 

Es gibt zwei Schreibweisen für das Einbinden von Dateien, die dem Präprozessor sagen, *wo* er nach der Datei suchen soll:

### Die spitzen Klammern: `#include <...>`
* **Syntax:** `#include <datei.h>`
* **Suchort:** Der Compiler sucht ausschließlich in den Systemverzeichnissen (den Standard-Suchpfaden der Entwicklungsumgebung), in denen die Header-Dateien der C-Standardbibliothek liegen.
* **Verwendung:** Für alle Standardbibliotheken (z. B. `stdio.h`, `stdlib.h`, `math.h`).

### Die Anführungszeichen: `#include "..."`
* **Syntax:** `#include "datei.h"`
* **Suchort:** Der Compiler sucht zuerst im aktuellen Projektverzeichnis (wo deine eigene `.c`-Datei liegt). Wird die Datei dort nicht gefunden, sucht er erst in den Systemverzeichnissen.
* **Verwendung:** Für selbst geschriebene Header-Dateien, die Teil deines Projekts sind.

> [!NOTE]
> Der Präprozessor überprüft nicht, ob der eingefügte Inhalt syntaktisch korrektes C ist. Er kopiert die Datei blind. Fehler fallen erst im anschließenden Compiler-Schritt auf.

---

## 8.2 Konstanten und Makros mit `#define` und `#undef`

Mit `#define` kannst du Textersetzungen definieren. Diese Ersetzungen werden überall dort im Quellcode vorgenommen, wo der definierte Name auftaucht.

### Symbolische Konstanten
Anstatt Zahlenwerte (sogenannte "magische Zahlen") mitten im Code zu verwenden, kannst du ihnen einen sprechenden Namen geben:

```c
#define ANZAHL_ELEMENTE 100
#define PI 3.14159
```

Wenn der Präprozessor nun durch deinen Code läuft, ersetzt er jedes Vorkommen von `ANZAHL_ELEMENTE` durch `100`. 

> [!WARNING]
> Setze niemals ein Semikolon am Ende einer `#define`-Zeile! Wenn du `#define MAX 10;` schreibst, wird das Semikolon mit in den Code kopiert. Aus `int x = MAX;` würde dann `int x = 10;;` werden, was zu schwer auffindbaren Syntaxfehlern führen kann.

### Parametrisierte Makros
Du kannst Makros auch wie Funktionen definieren, die Argumente entgegennehmen. Der Präprozessor ersetzt den Makroaufruf durch den definierten Code und setzt die Argumente an den entsprechenden Stellen ein.

#### Die Gefahr der fehlenden Klammern
Da es sich um reine Textersetzung handelt, musst du bei der Definition von Makros äußerst vorsichtig mit Klammern umgehen. Betrachten wir ein klassisches Beispiel:

```c
// Achtung: fehleranfällig!
#define QUADRAT(x) x * x
```

Wenn du dieses Makro mit `QUADRAT(5)` aufrufst, wird daraus `5 * 5` (Ergebnis: `25`). Das funktioniert.
Was passiert aber bei `QUADRAT(2 + 3)`? 
Der Präprozessor ersetzt den Text blind zu:
`2 + 3 * 2 + 3`

Da Punkt- vor Strichrechnung gilt, wird zuerst `3 * 2` gerechnet. Die Formel lautet also `2 + 6 + 3 = 11` – statt des erwarteten Werts `25` (aus `(2+3) * (2+3)`).

**Die Lösung:** Klammere jedes Argument und den gesamten Makro-Ausdruck ein!

```c
// Sicherer:
#define QUADRAT(x) ((x) * (x))
```

> [!TIP]
> Makros haben keinen Typen-Check und können Seiteneffekte haben. Wenn du ein Makro wie `QUADRAT(i++)` aufrufst, wird `i` im ersetzten Code eventuell mehrfach inkrementiert. Bevorzuge im modernen C oft `const`-Variablen oder `inline`-Funktionen, wenn du echte Typsicherheit benötigst.

### Die Löschfunktion: `#undef`
Mit `#undef` kannst du eine zuvor definierte Konstante oder ein Makro wieder ungültig machen:

```c
#undef ANZAHL_ELEMENTE
```
Ab dieser Zeile ist `ANZAHL_ELEMENTE` dem Compiler unbekannt, es sei denn, es wird neu definiert.

---

## 8.3 Bedingte Kompilierung

Mit der bedingten Kompilierung kannst du steuern, welche Teile deines Quellcodes tatsächlich vom Compiler übersetzt werden und welche ignoriert werden sollen. Das ist nützlich, um Code für verschiedene Betriebssysteme anzupassen, Debug-Ausgaben ein- und auszuschalten oder doppelte Einbindungen zu verhindern.

Die wichtigsten Direktiven sind:
* `#if`: Prüft, ob eine Bedingung wahr (ungleich 0) ist.
* `#ifdef` (if defined): Prüft, ob ein Makro definiert ist.
* `#ifndef` (if not defined): Prüft, ob ein Makro *nicht* definiert ist.
* `#else`: Alternativzweig, falls die vorherige Bedingung falsch war.
* `#elif` (else if): Weitere Bedingungsprüfung.
* `#endif`: Schließt jeden bedingten Block ab.

### Beispiel: Debug-Modus aktivieren
Du kannst im Code Debug-Meldungen einbauen, die nur ausgegeben werden, wenn ein bestimmtes Makro definiert ist:

```c
#ifdef DEBUG_MODUS
    // Code, der nur im Debug-Modus kompiliert wird
#endif
```

### Inklusionsschutz / Header Guards
Wenn ein Projekt wächst, passiert es schnell, dass eine Header-Datei über Umwege mehrfach in einer `.c`-Datei eingebunden wird. Dies führt zu Fehlern wegen doppelter Definitionen von Strukturen oder Funktionen.

Um das zu verhindern, nutzt man sogenannte **Header Guards**:

```c
#ifndef MEIN_HEADER_H
#define MEIN_HEADER_H

// Hier stehen alle Deklarationen deiner Header-Datei

#endif /* MEIN_HEADER_H */
```

**Wie das funktioniert:**
1. Beim ersten Einbinden ist `MEIN_HEADER_H` noch nicht definiert. `#ifndef` (ist nicht definiert) ist wahr.
2. Der Präprozessor springt in den Block und definiert sofort `MEIN_HEADER_H`.
3. Wird die Datei ein zweites Mal eingebunden, ist `MEIN_HEADER_H` bereits definiert. `#ifndef` ist falsch und der gesamte Inhalt bis `#endif` wird übersprungen.

> [!NOTE]
> Viele moderne Compiler unterstützen auch die nicht-standardisierte, aber weit verbreitete Direktive `#pragma once` am Anfang einer Header-Datei, um denselben Effekt mit nur einer Zeile zu erzielen.

---

## 8.4 Programmdiagnose mit `assert()` (`assert.h`)

Um logische Fehler während der Entwicklung aufzuspüren, kannst du Annahmen (Zusicherungen) in deinem Code mit `assert()` absichern. Du benötigst dazu die Header-Datei `<assert.h>`.

* **Syntax:** `assert(ausdruck);`
* **Funktionsweise:** Ist der `ausdruck` wahr (ungleich 0), läuft das Programm normal weiter. Ist der `ausdruck` falsch (gleich 0), wird das Programm sofort abgebrochen. Auf der Konsole wird eine Fehlermeldung ausgegeben, die den genauen Ausdruck, den Dateinamen und die Zeilennummer anzeigt.

> [!IMPORTANT]
> Nutze `assert()` nur, um Programmierfehler zu finden (z. B. "Dieser Zeiger darf hier niemals `NULL` sein"). Nutze es **nicht** für normale Laufzeitfehler (z. B. fehlerhafte Benutzereingaben oder eine nicht gefundene Datei) – diese müssen mit regulären `if`-Abfragen abgefangen werden.

### Deaktivieren für die Release-Version
Wenn du dein fertiges Programm an Endnutzer auslieferst, möchtest du nicht, dass es wegen eines Asserts abstürzt. Zudem kosten Asserts etwas Performance. Du kannst alle Asserts im gesamten Programm ausschalten, indem du das Makro `NDEBUG` (No Debug) definierst, bevor du `<assert.h>` einbindest:

```c
#define NDEBUG
#include <assert.h>
```

---

## 8.5 Generische Auswahl (`_Generic`)

Seit dem Standard C11 gibt es das Schlüsselwort `_Generic`. Damit kannst du eine Auswahl treffen, die auf dem Datentyp eines Ausdrucks zur Übersetzungszeit basiert. Dies wird meistens genutzt, um typübergreifende (überladene) Makros zu schreiben.

### Syntax-Template

```c
#define mein_generisches_makro(x) _Generic((x), \
    int: funktion_fuer_int, \
    double: funktion_fuer_double, \
    default: funktion_fuer_andere \
)(x)
```

**Erklärung:**
Der Präprozessor prüft den Typ der übergebenen Variable `x`. 
* Ist `x` ein `int`, wird `mein_generisches_makro(x)` durch `funktion_fuer_int(x)` ersetzt.
* Ist `x` ein `double`, wird es durch `funktion_fuer_double(x)` ersetzt.
* Bei allen anderen Typen greift der `default`-Zweig.

---

## 8.6 Eigene Header-Dateien erstellen

Um deinen C-Code sauber zu strukturieren, teilst du ihn in Module auf. Jedes Modul besteht in der Regel aus zwei Dateien:
1. **Die Header-Datei (`.h`):** Sie bildet die "Schnittstelle" nach außen. Sie enthält Funktionsprototypen, Strukturdefinitionen, Makros und Konstanten. Hier wird kein ausführbarer Code (wie Funktionsrümpfe) abgelegt.
2. **Die Quellcodedatei (`.c`):** Sie enthält die tatsächliche Implementierung (die Definitionen) der Funktionen.

### Schritt-für-Schritt-Struktur

Wenn du zum Beispiel ein mathematisches Modul für Kreisberechnungen erstellen willst:

#### 1. Die Header-Datei (z. B. `kreis.h`)
* Beginne immer mit einem Header Guard.
* Deklariere deine Konstanten (z. B. `PI`).
* Deklariere die Funktionsprototypen (z. B. zur Flächenberechnung).
* Beende den Header Guard mit `#endif`.

#### 2. Die Implementierung (z. B. `kreis.c`)
* Binde deine eigene Header-Datei mit `#include "kreis.h"` ein (damit der Compiler prüfen kann, ob die Implementierung zu den Deklarationen passt).
* Schreibe den eigentlichen Code für die Funktionen.

#### 3. Die Nutzung im Hauptprogramm (z. B. `main.c`)
* Binde dein Modul mit `#include "kreis.h"` ein.
* Rufe die Funktionen auf.
* Beim Kompilieren müssen dem Compiler beide `.c`-Dateien übergeben werden (z. B. `gcc main.c kreis.c -o mein_programm`).

---

## 8.7 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen `#include <datei.h>` und `#include "datei.h"`?
2. Warum sollte man bei der Definition von Makros mit Parametern immer großzügig Klammern setzen?
3. Welche Aufgabe erfüllt ein Header Guard (`#ifndef` ... `#define` ... `#endif`)?
4. Was passiert mit den `assert()`-Anweisungen im Code, wenn vor dem Einbinden von `<assert.h>` das Makro `NDEBUG` definiert wird?
5. Warum sollte man hinter einem `#define` kein Semikolon setzen?

### Aufgaben

#### Aufgabe 1: Der Makro-Klassiker (Maximum ermitteln)
Schreibe ein parametrisiertes Makro `MAX(a, b)`, das den größeren der beiden Werte zurückgibt. 
* *Hinweis:* Nutze den ternären Operator `? :`.
* *Wichtig:* Achte auf die vollständige Einklammerung der Argumente und des Gesamtausdrucks, damit das Makro auch mit Rechenoperationen als Argumenten (z. B. `MAX(x + 2, y - 3)`) korrekt funktioniert.

#### Aufgabe 2: Ein eigenes Modul entwerfen
Entwirfst du ein kleines Modul zur Temperaturumrechnung (Celsius in Fahrenheit und umgekehrt):
1. Erstelle eine Header-Datei `temperatur.h` mit entsprechenden Funktionsprototypen und schütze sie vor mehrfachem Einbinden.
2. Erstelle eine Quelldatei `temperatur.c`, welche die mathematischen Umrechnungen implementiert.
3. Erstelle eine `main.c`, die dein neues Modul einbindet und die Funktionen testet.
*(Verrate dir selbst nicht die fertige Formel im Code, sondern überlege dir, wie du die Parameter sauber von der `.h` in die `.c` übergibst!)*

#### Aufgabe 3: Typ-Selektion
Erstelle ein einfaches generisches Makro unter Verwendung von `_Generic`. Das Makro soll, je nachdem ob ihm ein `float` oder ein `int` übergeben wird, den Namen des Datentyps als Text (String-Literal) zurückgeben. 
* *Tipp:* Du brauchst dafür keine echten Funktionen aufzurufen. Der Ersetzungstext im `_Generic` kann auch direkt ein String wie `"Ganzzahl"` oder `"Fließkommazahl"` sein.
