# 2 Erste Schritte in C

Willkommen im zweiten Kapitel! Nachdem du im ersten Kapitel erfahren hast, wie du deine Entwicklungsumgebung einrichtest und ein erstes Programm compilierst, wollen wir uns nun genauer ansehen, wie C-Programme aufgebaut sind. Du lernst die Grundbausteine kennen, aus denen jedes C-Programm zusammengesetzt ist, wie du Text formatiert auf dem Bildschirm ausgibst und wie du deinen Code mit Kommentaren strukturierst.

---

## 2.1 Das erste Programm genauer betrachtet

Ein C-Programm mag auf den ersten Blick kryptisch wirken, aber es folgt einer sehr logischen und strengen Struktur. Betrachten wir die drei wichtigsten Bestandteile des Grundgerüsts, das dir in fast jedem C-Programm begegnen wird.

### 2.1.1 Die Präprozessor-Direktive (`#include`)

Bevor der eigentliche Compiler deinen Code übersetzt, bereitet der sogenannte **Präprozessor** die Datei vor. Zeilen, die mit einem Doppelkreuz (`#`) beginnen, sind Befehle an diesen Präprozessor.

*   `#include <stdio.h>`
    *   **Bedeutung:** Diese Zeile weist den Präprozessor an, den Inhalt der Header-Datei `stdio.h` (Standard Input/Output) in dein Programm einzufügen.
    *   **Analogie:** Stell dir vor, du möchtest ein Möbelstück aufbauen. `#include` ist wie das Bereitlegen des passenden Werkzeugkoffers. Ohne `stdio.h` fehlen deinem Programm die "Werkzeuge", um Text auf dem Bildschirm auszugeben oder Tastatureingaben einzulesen.

> [!NOTE]
> Header-Dateien mit der Endung `.h` enthalten Deklarationen von Funktionen, die in den Standard-Bibliotheken von C definiert sind. Sie sagen dem Compiler, welche Werkzeuge es gibt und wie sie benutzt werden müssen.

### 2.1.2 Die Hauptfunktion (`main()`)

Jedes eigenständige C-Programm benötigt einen definierten Startpunkt. Diesen Startpunkt bildet die Funktion `main`.

*   **Struktur:**
    ```c
    int main(void) {
        // Hier beginnt die Ausführung deines Programms
    }
    ```
*   `int`: Steht für *Integer* (Ganzzahl). Es gibt an, welchen Datentyp die Funktion an das Betriebssystem zurückgibt, wenn sie fertig ist.
*   `main`: Der feste Name der Hauptfunktion. Der Linker sucht genau nach diesem Namen, um den Einstiegspunkt festzulegen.
*   `void` (in den Klammern): Bedeutet "leer". Es signalisiert, dass diese Funktion beim Start keine Argumente (Parameter) erwartet.
*   Die geschweiften Klammern `{ ... }` umschließen den sogenannten **Funktionsrumpf** (Block). Alles, was dazwischen steht, wird nacheinander ausgeführt.

### 2.1.3 Der Rückgabewert (`return`)

Am Ende der `main`-Funktion steht üblicherweise eine Anweisung, die das Programm beendet und einen Statuscode an das Betriebssystem zurückliefert.

*   `return 0;`
    *   Der Wert `0` signalisiert dem Betriebssystem traditionell: *"Das Programm wurde erfolgreich und ohne Fehler ausgeführt."*
    *   Jeder Wert ungleich Null (z. B. `1` oder `-1`) deutet auf einen Fehler oder einen ungewöhnlichen Zustand hin.

> [!TIP]
> Jede Anweisung in C (wie `return 0;`) muss zwingend mit einem Semikolon `;` abgeschlossen werden. Vergisst du es, beschwert sich der Compiler mit einem Syntaxfehler.

---

## 2.2 Die Funktion `printf()` (Formatierte Ausgabe)

Um Daten für den Benutzer sichtbar zu machen, nutzt man die Funktion `printf`. Das "f" steht für *formatted* (formatiert), da diese Funktion extrem flexibel darin ist, Text und Variablenwerte miteinander zu kombinieren.

### Das Prinzip der Lückenhalter

Stell dir `printf` wie einen Lückentext vor. Du definierst eine Zeichenkette (einen String) mit bestimmten Platzhaltern und übergibst dem Programm danach die Werte, die in diese Lücken eingefügt werden sollen.

Die Syntax sieht schematisch so aus:

```c
printf("Text mit %platzhalter1 und %platzhalter2", wert1, wert2);
```

### Wichtige Format-Spezifizierer

Je nachdem, was für einen Wert du ausgeben möchtest, musst du den passenden Platzhalter (Format-Spezifizierer) wählen:

| Platzhalter | Datentyp | Beschreibung |
| :--- | :--- | :--- |
| `%d` oder `%i` | Ganzzahl (Integer) | Gibt eine ganze Zahl mit Vorzeichen aus (z. B. `42`, `-12`). |
| `%f` | Fließkommazahl (Float/Double) | Gibt eine Dezimalzahl aus (z. B. `3.1415`). |
| `%c` | Einzelnes Zeichen (Char) | Gibt ein einzelnes Schriftzeichen aus (z. B. `'A'`). |
| `%s` | Zeichenkette (String) | Gibt eine Reihe von Zeichen aus (z. B. `"Hallo Welt"`). |

> [!IMPORTANT]
> Die Anzahl und der Typ der übergebenen Werte müssen exakt mit den Platzhaltern im Text übereinstimmen! Wenn du ein `%d` hinschreibst, aber eine Fließkommazahl übergibst, führt das zu fehlerhaften Ausgaben oder Abstürzen.

---

## 2.3 Zeichensätze in C

Ein C-Programm verarbeitet Zeichen auf zwei Ebenen: beim Schreiben des Quellcodes und bei der Ausführung des Programms.

### 2.3.1 Basis-Ausführungszeichensatz

C wurde in einer Zeit entwickelt, in der Speicherplatz knapp und Zeichensätze wie ASCII der Standard waren. Daher verlangt der Standard, dass jedes C-System mindestens einen bestimmten Satz an Basiszeichen unterstützt:

*   **Buchstaben:** Die 26 lateinischen Großbuchstaben (`A`–`Z`) und Kleinbuchstaben (`a`–`z`).
*   **Ziffern:** Die Dezimalziffern von `0` bis `9`.
*   **Grafische Zeichen:** Sonderzeichen wie `+ - * / = _ . , : ; ? ! " ' ~ ^ | & # $ % @ < > ( ) [ ] { } \`
*   **Steuerzeichen:** Leerzeichen, horizontaler Tabulator, vertikaler Tabulator und Zeilenumbruch.

> [!WARNING]
> Verwende in Bezeichnern (wie Variablennamen) niemals Umlaute (ä, ö, ü) oder das Eszett (ß). Diese gehören nicht zum Basiszeichensatz und führen je nach Compiler zu Fehlern.

### 2.3.2 Wichtige Escape-Sequenzen

Manche Zeichen können nicht direkt in eine Zeichenkette eingetippt werden, weil sie entweder eine steuernde Funktion haben oder auf der Tastatur schwer darzustellen sind. In C werden diese durch sogenannte **Escape-Sequenzen** ausgedrückt. Sie beginnen immer mit einem Backslash `\`.

Hier sind die wichtigsten Escape-Sequenzen, die du kennen musst:

| Sequenz | Bedeutung | Wirkung |
| :--- | :--- | :--- |
| `\n` | Newline | Springt in die nächste Zeile (Zeilenumbruch). |
| `\t` | Horizontaler Tabulator | Springt zum nächsten Tabulatorstopp (Einrückung). |
| `\\` | Backslash | Gibt einen echten Backslash `\` aus. |
| `\"` | Doppeltes Anführungszeichen | Erlaubt es, `"` innerhalb einer Zeichenkette auszugeben, ohne sie zu beenden. |
| `\'` | Einfaches Anführungszeichen | Erlaubt die Darstellung von `'` (besonders bei einzelnen Zeichen). |
| `\a` | Alert / Bell | Erzeugt oft einen kurzen Systemton (Signalton). |

---

## 2.4 Symbole in C

Ein C-Compiler zerlegt deinen Quellcode in kleinste Sinneinheiten, die sogenannten **Tokens** (Symbole). Diese lassen sich in verschiedene Kategorien einteilen.

### 2.4.1 Bezeichnerregeln

Ein Bezeichner (Identifier) ist der Name, den du einer Variable, einer Funktion oder einem eigenen Datentyp gibst. Damit der Compiler diese Namen eindeutig verarbeiten kann, gelten strenge Regeln:

1.  **Erlaubte Zeichen:** Nur die Buchstaben `a`–`z`, `A`–`Z`, Ziffern `0`–`9` und der Unterstrich `_`.
2.  **Erstes Zeichen:** Must ein Buchstabe oder ein Unterstrich sein. Eine Ziffer am Anfang ist verboten (z. B. ist `1zahl` ungültig, während `zahl1` oder `_zahl` gültig sind).
3.  **Case-Sensitivity:** C unterscheidet strikt zwischen Groß- und Kleinschreibung. `meinWert`, `meinwert` und `MEINWERT` sind drei völlig verschiedene Bezeichner!
4.  **Keine Sonderzeichen:** Keine Leerzeichen, Umlaute oder Bindestriche (z. B. `mein-wert` ist ungültig, da `-` als Minus-Operator interpretiert wird).

### 2.4.2 Reservierte Schlüsselwörter

Es gibt Wörter, die eine feste, eingebaute Bedeutung im C-Standard haben. Du darfst sie **nicht** als eigene Variablennamen oder Funktionsnamen verwenden.

Beispiele für wichtige Schlüsselwörter in C:
*   Datentypen: `int`, `char`, `float`, `double`, `void`, `struct`
*   Kontrollstrukturen: `if`, `else`, `switch`, `case`, `default`, `while`, `for`, `do`, `break`, `continue`
*   Sonstige: `return`, `const`, `sizeof`, `typedef`

### 2.4.3 Literale

Ein Literal (auch Konstante genannt) ist ein fester Wert im Quellcode, dessen Typ und Wert direkt hingeschrieben werden:

*   **Ganzzahlliterale:** `10`, `-5`, `0`
*   **Gleitpunktliterale:** `3.14`, `0.5`
*   **Zeichenliterale:** `'A'`, `'7'`, `'\n'` (immer in einfachen Anführungszeichen)
*   **Zeichenkettenliterale (Strings):** `"Hallo"`, `"Das ist ein Test\n"` (immer in doppelten Anführungszeichen)

### 2.4.4 Einfache Begrenzer

Begrenzer (Punktuatoren) helfen dem Compiler, die logischen Einheiten voneinander zu trennen:

*   `;` (Semikolon): Schließt eine Anweisung ab.
*   `,` (Komma): Trennt Parameter oder Deklarationen.
*   `{ }` (Geschweifte Klammern): Begrenzen Codeblöcke.
*   `( )` (Runde Klammern): Umschließen Bedingungen oder Parameterlisten.
*   `[ ]` (Eckige Klammern): Werden für Arrays (Feldstrukturen) verwendet.

---

## 2.5 Kommentare

Kommentare dienen dazu, deinen Code für dich und andere Entwickler verständlicher zu machen. Sie werden vom Compiler ignoriert und haben keinen Einfluss auf die Größe oder Geschwindigkeit deines Programms.

In C gibt es zwei Arten von Kommentaren:

### Einzeilige Kommentare

Eingeleitet durch zwei Schrägstriche `//`. Alles, was in dieser Zeile nach den Schrägstrichen steht, gilt als Kommentar.

```c
// Dies ist ein einzeiliger Kommentar
int x = 5; // Deklaration mit Kommentar am Zeilenende
```

### Mehrzeilige Kommentare (Blockkommentare)

Beginnen mit `/*` und enden mit `*/`. Alles, was sich dazwischen befindet, wird als Kommentar behandelt – auch über mehrere Zeilen hinweg.

```c
/* Dies ist ein mehrzeiliger
   Kommentar, der sich über
   mehrere Zeilen erstrecken kann. */
```

> [!CAUTION]
> Mehrzeilige Kommentare dürfen nicht verschachtelt werden! Der Compiler sucht nach dem ersten `*/`, um den Kommentar zu beenden. Folgender Code führt zu einem Fehler:
> `/* Äußerer Kommentar /* Innerer Kommentar */ Ende des Äußeren? */`

---

## 2.6 Kontrollfragen und Aufgaben

Teste dein Wissen! Versuche die Fragen und Aufgaben selbstständig zu lösen, ohne fertigen Code zu kopieren.

### Kontrollfragen

1.  Welche Aufgabe hat der Präprozessor bei der Anweisung `#include <stdio.h>`?
2.  Warum führt die Anweisung `printf("Die Antwort ist %d");` zu einem Fehler oder unvorhersehbarem Verhalten? Was fehlt hier?
3.  Welcher der folgenden Bezeichner ist in C **gültig** und welcher **ungültig**? Begründe kurz.
    *   `wert_1`
    *   `1_wert`
    *   `preis in euro`
    *   `int`
    *   `HauptWert`
4.  Warum müssen wir ein doppeltes Anführungszeichen innerhalb eines Strings mit `\"` schreiben, statt einfach `"` zu nutzen?

### Praktische Aufgaben

#### Aufgabe 1: Der Gerüstbauer
Entwirf auf dem Papier oder in einer leeren Datei das minimale Gerüst für ein C-Programm. Es soll:
1. Die Ein-/Ausgabebibliothek einbinden.
2. Die Hauptfunktion definieren.
3. Einen Kommentar enthalten, der kurz beschreibt, was die Hauptfunktion zurückgibt.
4. Den korrekten Erfolgs-Statuscode zurückliefern.

#### Aufgabe 2: Die Visitenkarte
Überlege dir, wie ein Programm aussehen müsste, das mithilfe von `printf()` eine optisch ansprechende Visitenkarte auf der Konsole ausgibt.
*   Verwende Tabulatoren (`\t`) für saubere Abstände.
*   Verwende Zeilenumbrüche (`\n`), um mehrere Zeilen untereinander darzustellen.
*   Nutze Begrenzungslinien aus Bindestrichen oder Sternchen (z. B. `*****************`), um einen Rahmen zu ziehen.
*   *Hinweis:* Schreibe nur die `printf`-Anweisungen auf, die dafür nötig wären.

#### Aufgabe 3: Der Code-Inspektor
Finde in den folgenden Codefragmenten die syntaktischen Fehler (auf dem Papier):

*Fragment A:*
```c
// Kannst du den Fehler finden?
include stdio.h

int main(void)
{
    return 0;
}
```

*Fragment B:*
```c
int main(void) {
    printf("Hallo Welt")
    return 0;
}
```

*Fragment C:*
```c
int main(void) {
    int mein wert = 10;
    return 0;
}
```
