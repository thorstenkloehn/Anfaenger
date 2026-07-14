# 5 Kontrollstrukturen

Bisher haben wir Programme geschrieben, die strikt von oben nach unten ausgeführt werden. Doch die echte Magie der Programmierung beginnt erst, wenn dein Programm Entscheidungen treffen und bestimmte Codeabschnitte wiederholt ausführen kann. In diesem Kapitel lernst du, wie du den Kontrollfluss deines Programms mithilfe von Verzweigungen und Schleifen steuerst – und das auf dem modernen Stand von **C++23**.

---

## 5.1 Der eingebaute Datentyp `bool` & 5.2 Vergleichsoperatoren

### Der Datentyp `bool`
Bevor wir Entscheidungen treffen können, müssen wir Bedingungen formulieren. Das Ergebnis einer Bedingung ist entweder wahr oder falsch. In C++ gibt es dafür den eingebauten Datentyp `bool` (benannt nach dem Mathematiker George Boole). Ein `bool` kann genau zwei Zustände annehmen:
*   `true` (wahr)
*   `false` (falsch)

Im Speicher belegt ein `bool` in der Regel 1 Byte (obwohl theoretisch 1 Bit ausreichen würde, sind Computer darauf optimiert, mit ganzen Bytes zu arbeiten).

> [!NOTE]
> Wenn du einen `bool`-Wert mit `std::print` oder `std::println` ausgibst, gibt C++ standardmäßig `true` oder `false` als Text aus. Möchtest du stattdessen die numerische Darstellung (1 für `true`, 0 für `false`), kannst du den Wert explizit umwandeln oder formatieren.

### Vergleichsoperatoren
Um einen `bool`-Wert zu erhalten, vergleichen wir meist Werte miteinander. C++ stellt dir hierfür die folgenden Vergleichsoperatoren zur Verfügung:

| Operator | Bedeutung |
| :--- | :--- |
| `==` | Gleichheit |
| `!=` | Ungleichheit |
| `<` | Kleiner als |
| `>` | Größer als |
| `<=` | Kleiner oder gleich |
| `>=` | Größer oder gleich |

Seit C++20 gibt es zudem den Drei-Wege-Vergleichsoperator `<=>` (oft „Spaceship-Operator“ genannt). Er vergleicht zwei Werte und liefert ein Ergebnis zurück, das angibt, ob der erste Wert kleiner, gleich oder größer als der zweite ist.

```cpp
// Syntax-Skizze für Vergleiche
bool istGleich = (wert1 == wert2);
bool istKleiner = (wert1 < wert2);
auto vergleich = (wert1 <=> wert2); // Liefert ein strukturierte Vergleichs-Ergebnis
```

---

## 5.3 Bedingte Anweisung mit `if`

Mit der bedingten Anweisung `if` kannst du steuern, ob ein bestimmter Codeblock nur unter einer bestimmten Bedingung ausgeführt wird.

### Anweisungsblöcke
Ein Anweisungsblock wird durch geschweifte Klammern `{}` begrenzt. Variablen, die innerhalb dieses Blocks deklariert werden, sind auch nur dort gültig (lokaler Gültigkeitsbereich oder *Scope*).

```cpp
// Prinzipieller Aufbau
if (bedingung) {
    // Dieser Block wird nur ausgeführt, wenn bedingung == true ist
}
```

### Alternative `else`-Verzweigung
Wenn die Bedingung nicht erfüllt ist, kannst du mit `else` einen Alternativpfad vorgeben:

```cpp
// Prinzipieller Aufbau mit Alternative
if (bedingung) {
    // Pfad A
} else {
    // Pfad B (wenn bedingung == false ist)
}
```

### `if` mit Initialisierung
Seit C++17 (und auch in C++23 ein fester Bestandteil) kannst du direkt im Kopf der `if`-Anweisung eine Variable initialisieren. Diese Variable ist dann nur innerhalb der `if`- und `else`-Blöcke gültig. Das verhindert, dass Variablen den äußeren Namensraum „verschmutzen“, wenn sie nur für diese eine Abfrage gebraucht werden.

```cpp
// Prinzipieller Aufbau eines if-Statements mit Initialisierer
if (auto daten = holeDaten(); daten.istValide()) {
    // 'daten' ist hier sichtbar und nutzbar
} else {
    // 'daten' ist auch hier sichtbar (z. B. für Fehlerbehandlung)
}
// Hier außerhalb ist 'daten' nicht mehr bekannt!
```

---

## 5.4 Mehrfache Verzweigung (if-else-Kette) & 5.5 Der Bedingungsoperator `?:` (Ternär)

### Mehrfache Verzweigung
Wenn du mehr als zwei Pfade hast, kannst du mehrere `if`- und `else`-Zweige aneinanderreihen:

```cpp
if (bedingung1) {
    // Pfad 1
} else if (bedingung2) {
    // Pfad 2
} else {
    // Standardpfad, wenn nichts zutrifft
}
```

### Der Bedingungsoperator `?:` (Ternär)
Für sehr kurze, einfache Entscheidungen, die einen Wert zurückliefern sollen, gibt es den ternären Operator. Er ist der einzige dreistellige Operator in C++ und wird oft verwendet, um Variablen direkt bei der Deklaration bedingt zu initialisieren.

```cpp
// Struktur: Bedingung ? Ausdruck_wenn_wahr : Ausdruck_wenn_falsch;
auto ergebnis = (zahl > 0) ? wertA : wertB;
```

> [!TIP]
> Verwende den ternären Operator nur für einfache Zuweisungen. Wenn die Ausdrücke zu komplex werden, leidet die Lesbarkeit deines Codes massiv. In solchen Fällen ist eine klassische `if-else`-Struktur vorzuziehen.

---

## 5.6 Logische Operatoren

Möchtest du mehrere Bedingungen miteinander verknüpfen oder eine Bedingung umkehren, nutzt du logische Operatoren:

| Operator | Bedeutung | Beschreibung |
| :--- | :--- | :--- |
| `&&` | Logisches UND (AND) | Wahr, wenn **beide** Operanden wahr sind. |
| `\|\|` | Logisches ODER (OR) | Wahr, wenn **mindestens einer** der Operanden wahr ist. |
| `!` | Logisches NICHT (NOT) | Kehrt den Wahrheitswert um (wahr wird falsch, falsch wird wahr). |

### Kurzschluss-Auswertung (Short-Circuit Evaluation)
C++ evaluiert logische Ausdrücke von links nach rechts und bricht ab, sobald das Gesamtergebnis feststeht:
*   Bei einem `&&` (UND): Ist der erste Operand bereits `false`, kann das Gesamtergebnis niemals `true` werden. Der zweite Operand wird gar nicht erst ausgewertet.
*   Bei einem `||` (ODER): Ist der erste Operand bereits `true`, ist das Gesamtergebnis sicher `true`. Der zweite Operand wird übersprungen.

Dies kannst du nutzen, um Laufzeitfehler zu vermeiden (z. B. prüfen, ob ein Zeiger gültig ist, bevor du auf seine Daten zugreifst).

---

## 5.7 Die Fallunterscheidung – `switch`

Wenn du eine einzelne Variable auf viele verschiedene feste Werte prüfen möchtest, wird eine `if-else`-Kette schnell unübersichtlich. Hier hilft die `switch`-Anweisung.

```cpp
// Schematischer Aufbau
switch (ausdruck) {
    case wert1:
        // Anweisungen
        break;
    case wert2:
        // Anweisungen
        break;
    default:
        // Wenn kein Fall zutrifft
        break;
}
```

### Die Rolle von `break` und `[[fallthrough]]`
Vergisst du das `break` am Ende eines `case`-Blocks, springt das Programm automatisch in den nächsten `case`-Block (sogenanntes *Fallthrough*). Meistens ist dies ein Fehler. Wenn du dieses Verhalten jedoch absichtlich nutzen möchtest, solltest du das Attribut `[[fallthrough]]` verwenden, um dem Compiler (und anderen Entwicklern) zu signalisieren, dass dies Absicht is.

### Strukturierte Bindung (Structured Bindings) im `switch`-Initialisierer
Wie schon beim `if` kannst du auch beim `switch` einen Initialisierer verwenden. Das ist besonders praktisch, um strukturierte Bindungen (Structured Bindings) direkt in der Bedingung einzusetzen. In C++23 müssen wir noch für jeden Teil des entpackten Objekts einen eigenen Variablennamen vergeben, selbst wenn wir manche davon gar nicht benutzen:

```cpp
// C++23 Syntax: Beide Variablen müssen benannt werden
switch (auto [id, status] = bestimmeStatus(); id) {
    case 1:
        // Code
        break;
    default:
        // Code
        break;
}
```

> [!NOTE]
> **Ausblick auf C++26:** Der zukünftige Standard führt den unbenannten Platzhalter `_` (Wildcard) ein. Damit lassen sich nicht benötigte Variablen einfach verwerfen (z. B. `auto [id, _] = bestimmeStatus();`). In C++23 verwenden wir stattdessen noch reguläre Variablennamen wie hier im Beispiel `status`.

---

## 5.8 Die kopfgesteuerte `while`-Schleife & 5.9 Die fußgesteuerte `do-while`-Schleife

Schleifen ermöglichen es, Codeblöcke mehrfach auszuführen.

### Die kopfgesteuerte `while`-Schleife
Vor jedem Durchlauf wird die Bedingung geprüft. Ist sie von Anfang an `false`, wird der Rumpf der Schleife **nie** ausgeführt.

```cpp
while (bedingung) {
    // Wird ausgeführt, solange bedingung true ist
}
```

### Die fußgesteuerte `do-while`-Schleife
Hier wird der Rumpf der Schleife zuerst ausgeführt und erst *danach* die Bedingung geprüft. Der Codeblock läuft also **mindestens einmal** durch.

```cpp
do {
    // Wird mindestens einmal ausgeführt
} while (bedingung);
```

---

## 5.10 Die Zählschleife `for` (und range-based `for`-Schleifen)

### Die klassische `for`-Schleife
Sie eignet sich besonders dann, wenn die Anzahl der Durchläufe im Vorfeld bekannt ist oder ein Index mitgezählt werden soll.

```cpp
for (initialisierung; bedingung; inkrement/dekrement) {
    // Schleifenkörper
}
```

### Die Range-based `for`-Schleife
Möchtest du über alle Elemente einer Sammlung (z. B. ein Array oder einen Container) iterieren, ist die Range-based `for`-Schleife die sicherste und lesbarste Wahl. Sie verhindert Indexfehler („Off-by-one“-Fehler) komplett.

```cpp
for (auto&& element : sammlung) {
    // Zugriff auf element
}
```

### Range-based `for` mit Initialisierer
Analog zum `if` und `switch` kannst du seit C++20 auch der Range-based `for`-Schleife einen Initialisierer voranstellen, um den Gültigkeitsbereich von Hilvsvariablen einzuschränken:

```cpp
for (auto index = 0; auto&& element : sammlung) {
    // Hier kannst du auf das element zugreifen und index manuell hochzählen
    ++index;
}
```

---

## 5.11 Kontrollierte Sprunganweisungen (`break`, `continue`)

Manchmal möchte man eine Schleife vorzeitig beenden oder den aktuellen Durchlauf überspringen.

*   `break`: Bricht die innerste Schleife (oder das `switch`) sofort komplett ab. Das Programm fährt nach der Schleife fort.
*   `continue`: Bricht den *aktuellen Durchlauf* ab. Das Programm springt direkt zur nächsten Überprüfung der Schleifenbedingung (bzw. zum Inkrement-Schritt bei einer `for`-Schleife).

> [!WARNING]
> Verwende `break` und `continue` mit Bedacht. Zu viele Sprünge innerhalb einer Schleife können den Code schwer nachvollziehbar und fehleranfällig machen (Stichwort: Spaghetticode).

---

## 5.12 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Welchen Wert gibt ein Vergleich standardmäßig auf der Konsole aus, wenn kein Formatierer genutzt wird und wir `std::print` verwenden?
2. Was versteht man unter dem Begriff „Short-Circuit Evaluation“ bei logischen Operatoren?
3. Warum sollte man bei der Nutzung von `switch` vorsichtig mit dem Weglassen von `break` sein, und wie hilft das Attribut `[[fallthrough]]`?
4. Was ist der Unterschied im Gültigkeitsbereich (Scope) einer Variable, die im Initialisierer eines `if`-Statements deklariert wurde, im Vergleich zu einer Variable, die direkt davor deklariert wurde?
5. Unter welcher Bedingung verhält sich eine `do-while`-Schleife anders als eine `while`-Schleife?

### Programmieraufgaben (Praxis)
*Um dein Wissen zu festigen, setze diese Aufgaben selbstständig um. Verwende dazu ein modernes C++23-Projekt-Setup mit `import std;` und `std::println`.*

#### Aufgabe 1: Der Schaltjahr-Prüfer
Schreibe ein Programm, das eine Jahreszahl einliest und prüft, ob es sich um ein Schaltjahr handelt. 
*   *Regel:* Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist. Ist es jedoch durch 100 teilbar, ist es kein Schaltjahr, es sei denn, es ist auch durch 400 teilbar.
*   *Hinweis:* Nutze den Modulo-Operator `%` für die Teilbarkeit und logische Operatoren zur Verknüpfung der Bedingungen.

#### Aufgabe 2: Das Zahlen-Ratespiel
Entwickle ein kleines Konsolenspiel:
1. Das Programm generiert eine feste (oder zufällige) Zahl zwischen 1 und 100.
2. Der Spieler wird in einer Schleife aufgefordert, die Zahl zu raten.
3. Nach jedem Versuch gibt das Programm einen Hinweis: „Zu hoch!“, „Zu niedrig!“ oder gratuliert zum Sieg.
4. Das Spiel endet erst, wenn die Zahl erraten wurde (oder der Spieler durch Eingabe einer bestimmten Zahl wie `0` abbricht).
5. Überlege, welche Schleifenart (`while`, `do-while` oder `for`) sich hier am besten eignet.

#### Aufgabe 3: Das kleine Einmaleins
Gib mithilfe von verschachtelten Schleifen das kleine Einmaleins (von 1x1 bis 10x10) formatiert auf der Konsole aus.
*   *Tipp:* Nutze `std::print` mit Formatierungsoptionen, damit die Spalten sauber untereinanderstehen.
