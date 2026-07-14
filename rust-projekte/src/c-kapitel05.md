# 5 Bedingte Anweisungen und Verzweigungen

Bisher liefen deine Programme wie auf einer Schiene ab: Zeile für Zeile von oben nach unten. Doch im echten Leben treffen wir ständig Entscheidungen: *Wenn* die Ampel rot ist, bleibe ich stehen. *Andernfalls* gehe ich weiter. 
In diesem Kapitel lernst du, wie du deinem Programm beibringst, Entscheidungen zu treffen und den Programmablauf dynamisch zu steuern.

---

## 5.1 Bedingte Anweisungen

Die einfachste Form einer Verzweigung ist die `if`-Anweisung. Sie erlaubt es dir, einen bestimmten Codeabschnitt nur dann auszuführen, wenn eine Bedingung erfüllt ist.

### Die Syntax der `if`-Anweisung

```c
if (Bedingung) {
    // Dieser Code wird nur ausgeführt, wenn die Bedingung wahr ist
}
```

> [!NOTE]
> In C wird jeder Wert ungleich `0` als **wahr** (true) interpretiert. Der Wert `0` gilt als **falsch** (false).

### Vergleichsoperatoren
Um Bedingungen zu formulieren, nutzt du Vergleichsoperatoren. Das Ergebnis eines solchen Vergleichs ist entweder wahr (`1`) oder falsch (`0`).

| Operator | Bedeutung | Beispiel |
| :--- | :--- | :--- |
| `==` | Gleichheit (Achtung: nicht verwechseln mit `=`!) | `a == b` |
| `!=` | Ungleichheit | `a != b` |
| `<` | Kleiner als | `a < b` |
| `>` | Größer als | `a > b` |
| `<=` | Kleiner oder gleich | `a <= b` |
| `>=` | Größer oder gleich | `a >= b` |

> [!WARNING]
> Ein sehr häufiger Anfängerfehler ist die Verwechslung von `==` (Vergleich) und `=` (Wertzuweisung). Ein einfacher `=` in einer `if`-Bedingung führt dazu, dass der Wert zugewiesen wird und das Ergebnis dieser Zuweisung überprüft wird. Das ist syntaktisch oft korrekt, führt aber fast immer zu Logikfehlern!

### Anweisungsblöcke
Wenn du nach dem `if` nur eine einzige Anweisung hast, kannst du die geschweiften Klammern `{}` weglassen. Sobald es aber mehr als eine Anweisung ist, **musst** du sie in einen Block `{ ... }` einschließen.

> [!TIP]
> Gewöhne dir an, geschweifte Klammern *immer* zu setzen. Das macht deinen Code lesbarer und verhindert Fehler, wenn du später eine weitere Zeile hinzufügen möchtest.

---

## 5.2 Die alternative Verzweigung (else)

Häufig möchtest du nicht nur bestimmen, was passiert, wenn eine Bedingung wahr ist, sondern auch, was im anderen Fall geschehen soll. Hier kommt `else` ins Spiel.

```c
if (Bedingung) {
    // Wird ausgeführt, wenn die Bedingung wahr (nicht 0) ist
} else {
    // Wird ausgeführt, wenn die Bedingung falsch (0) ist
}
```

### Ein Alltagsbeispiel
Stell dir vor, du prüfst das Alter eines Nutzers:
- Wenn das Alter größer oder gleich 18 ist, gibst du "Volljährig" aus.
- In allen anderen Fällen gibst du "Minderjährig" aus.

Überlege dir, wie du die Vergleichsoperatoren aus 5.1 hier einsetzen kannst, ohne dass du zwei getrennte `if`-Abfragen schreiben musst.

---

## 5.3 Der Bedingungsoperator ?: (Ternärer Operator)

Für sehr kurze `if-else`-Entscheidungen gibt es in C eine kompakte Schreibweise: den ternären Operator. Er heißt so, weil er als einziger Operator in C drei Operanden besitzt.

### Syntax
```c
Variable = (Bedingung) ? Wert_wenn_wahr : Wert_wenn_falsch;
```

### Wie funktioniert das?
1. Die `Bedingung` wird ausgewertet.
2. Ist sie wahr (ungleich 0), wird der Ausdruck vor dem Doppelpunkt (`Wert_wenn_wahr`) zurückgegeben.
3. Ist sie falsch (gleich 0), wird der Ausdruck nach dem Doppelpunkt (`Wert_wenn_falsch`) zurückgegeben.

> [!TIP]
> Nutze den ternären Operator sparsam und nur für einfache Zuweisungen. Wenn die Ausdrücke zu lang werden, leidet die Lesbarkeit deines Codes massiv.

---

## 5.4 Mehrfache Verzweigung mit if und else if

Manchmal reichen zwei Wege nicht aus. Wenn du mehrere Bedingungen nacheinander prüfen willst, kannst du `else if` verwenden.

### Struktur einer Kaskade
```c
if (Bedingung_1) {
    // Ausgeführt, wenn Bedingung_1 wahr ist
} else if (Bedingung_2) {
    // Ausgeführt, wenn Bedingung_1 falsch und Bedingung_2 wahr ist
} else {
    // Ausgeführt, wenn keine der vorherigen Bedingungen wahr war
}
```

### Wichtiges Prinzip
Das Programm prüft die Bedingungen von oben nach unten. Sobald *eine* Bedingung zutrifft, wird der dazugehörige Block ausgeführt und die gesamte restliche Struktur übersprungen – selbst wenn spätere `else if`-Bedingungen ebenfalls wahr wären.

---

## 5.5 Mehrfache Verzweigung mit switch

Wenn du eine einzelne Variable auf viele verschiedene feste Werte (Konstanten) prüfen möchtest, wird eine `if-else if`-Kette schnell unübersichtlich. Hier ist `switch` oft die elegantere Wahl.

### Syntax
```c
switch (Ausdruck) {
    case Konstante_1:
        // Code für Konstante_1
        break;
    case Konstante_2:
        // Code für Konstante_2
        break;
    default:
        // Code, wenn keine Konstante passt
}
```

### Wichtige Regeln für `switch`:
1. **Zulässige Typen**: Der `Ausdruck` in den runden Klammern muss ein ganzzahliger Typ sein (z.B. `int`, `char`, `short`). Fließkommazahlen (`float`, `double`) sind hier **nicht** erlaubt!
2. **Das `break`-Statement**: Vergisst du das `break` am Ende eines `case`-Blocks, springt das Programm automatisch in den Code des nächsten `case` hinein (sogenanntes *Fall-Through*). Manchmal ist das gewollt, meistens jedoch ein Bug.
3. **Der `default`-Zweig**: Er verhält sich wie das finale `else` und wird ausgeführt, wenn kein anderer `case` zutrifft. Es ist guter Stil, ihn immer anzugeben.

---

## 5.6 Logische Verknüpfungen

Oft reicht eine einzelne Bedingung nicht aus. Was ist, wenn du prüfen willst, ob eine Zahl zwischen 10 und 20 liegt? Dafür müssen zwei Bedingungen gleichzeitig wahr sein. C bietet dafür drei logische Operatoren:

| Operator | Name | Funktion |
| :--- | :--- | :--- |
| `&&` | Logisches UND | Wahr, wenn **beide** Bedingungen wahr sind |
| `||` | Logisches ODER | Wahr, wenn **mindestens eine** Bedingung wahr ist |
| `!` | Logisches NICHT | Kehrt den Wahrheitswert um (wahr wird falsch, falsch wird wahr) |

### Kurzschluss-Auswertung (Short-Circuit Evaluation)
C ist beim Auswerten logischer Ausdrücke faul (und effizient):
- Bei einem `&&` (UND): Wenn die erste Bedingung bereits falsch (`0`) ist, steht das Gesamtergebnis (falsch) bereits fest. Die zweite Bedingung wird **gar nicht erst ausgewertet**.
- Bei einem `||` (ODER): Wenn die erste Bedingung bereits wahr (`1`) ist, steht das Gesamtergebnis (wahr) bereits fest. Die zweite Bedingung wird ebenfalls **übersprungen**.

> [!IMPORTANT]
> Verlasse dich nie darauf, dass Funktionen oder Wertänderungen im zweiten Teil einer logischen Verknüpfung immer ausgeführt werden! Wenn z.B. die linke Seite eines `&&` falsch ist, wird eine Funktion auf der rechten Seite niemals aufgerufen.

---

## 5.7 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Welchen Wert muss eine Variable haben, damit sie in C als "wahr" gilt?
2. Was passiert, wenn du in einer `switch`-Anweisung das Schlüsselwort `break` vergisst?
3. Warum führt der Ausdruck `if (x = 5)` meistens zu unerwartetem Verhalten? Was bewirkt er tatsächlich?
4. Was versteht man unter der "Kurzschluss-Auswertung" bei logischen Operatoren?

### Praktische Aufgaben

#### Aufgabe 1: Der Schaltjahr-Prüfer
Schreibe ein Programm, das vom Benutzer eine Jahreszahl einliest und prüft, ob es sich um ein Schaltjahr handelt.
*Hinweise zur Logik:*
- Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist.
- Ausnahme: Ist es durch 100 teilbar, ist es *kein* Schaltjahr.
- Ausnahme von der Ausnahme: Ist es durch 400 teilbar, ist es *doch* ein Schaltjahr.
- *Tipp:* Nutze den Modulo-Operator `%` für die Teilbarkeit und verknüpfe die Bedingungen geschickt mit `&&` und `||`.

#### Aufgabe 2: Der einfache Taschenrechner
Erstelle ein Programm, das zwei Fließkommazahlen und einen Operator (als Zeichen: `+`, `-`, `*`, `/`) einliest.
*Hinweise zur Umsetzung:*
- Nutze eine `switch`-Anweisung, um je nach eingegebenem Operator die passende Rechenoperation durchzuführen.
- Vergiss nicht, vor einer Division zu prüfen, ob der Nenner ungleich Null is, um einen Absturz zu verhindern!
- Nutze den `default`-Zweig, um Fehleingaben abzufangen.

#### Aufgabe 3: Altersverifikation mit dem ternären Operator
Fordere den Benutzer auf, sein Alter einzugeben. Nutze den ternären Operator `?:`, um zu entscheiden, ob der Text "Zutritt gewährt" oder "Zutritt verweigert" ausgegeben oder in einer Variable gespeichert werden soll (Grenze: 18 Jahre).
