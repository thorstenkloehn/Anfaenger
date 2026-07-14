# 4 Arbeiten mit den eingebauten Typen

In den vorherigen Kapiteln hast du bereits gelernt, wie man Variablen deklariert und welche grundlegenden Datentypen C++ bereitstellt. Doch eine Variable allein bewirkt noch nicht viel. Erst wenn wir diese Werte verändern, miteinander verrechnen, umwandeln und formatiert ausgeben, erwacht unser Programm zum Leben.

In diesem Kapitel erfährst du, wie du Berechnungen durchführst, warum Fließkommazahlen manchmal lügen, wie du Typen sicher ineinander umwandelst und wie du deine Ergebnisse mit C++23 elegant auf dem Bildschirm präsentierst.

---

## 4.1 Arithmetische Operatoren

Um Berechnungen anzustellen, nutzt C++ die klassischen arithmetischen Operatoren. Diese funktionieren im Wesentlichen so, wie du es aus der Schulmathematik gewohnt bist:

*   `+` (Addition)
*   `-` (Subtraktion)
*   `*` (Multiplikation)
*   `/` (Division)
*   `%` (Modulo / Restwert einer Ganzzahldivision)

> [!IMPORTANT]
> Achte bei der Division (`/`) genau auf die Datentypen der beteiligten Werte! Wenn du zwei Ganzzahlen (z. B. `int`) durcheinander teilst, führt C++ eine **Ganzzahldivision** durch. Nachkommastellen werden dabei rigoros abgeschnitten, nicht gerundet. Möchtest du ein mathematisch exaktes Ergebnis mit Nachkommastellen, muss mindestens einer der beiden Operanden eine Fließkommazahl (z. B. `double`) sein.

### Kurzschreibweisen (Verbundzuweisungen)
Häufig möchtest du den Wert einer Variablen nehmen, eine Berechnung darauf ausführen und das Ergebnis wieder in derselben Variablen speichern. Statt die Variable doppelt schreiben zu müssen, bietet dir C++ praktische Kurzschreibweisen:

```cpp
// Langform:
variable = variable + 5;

// Kurzschreibweise:
variable += 5;
```

Diese Zuweisungsoperatoren gibt es für alle Grundrechenarten: `+=`, `-=`, `*=`, `/=` und `%=`.

### Inkrement- und Dekrementoperator
Um eine Zahl um genau `1` zu erhöhen oder zu verringern, gibt es noch kompaktere Operatoren:
*   `++` (Inkrement, erhöht um 1)
*   `--` (Dekrement, verringert um 1)

Diese können auf zwei verschiedene Weisen eingesetzt werden, je nachdem, ob das Symbol vor oder nach der Variablen steht:

1.  **Präfix-Variante (`++variable` / `--variable`):** Der Wert wird *zuerst* verändert, und der veränderte Wert wird im aktuellen Ausdruck verwendet.
2.  **Postfix-Variante (`variable++` / `variable--`):** Der aktuelle Wert wird im Ausdruck verwendet, und *danach* wird die Variable erhöht oder verringert.

> [!TIP]
> Verwende im Zweifel immer die **Präfix-Variante** (`++variable`). Sie ist nicht nur intuitiver zu lesen, sondern kann bei komplexeren Datentypen (wie Iteratoren, die du später kennenlernst) auch effizienter sein, da keine temporäre Kopie des alten Wertes angelegt werden muss.

---

## 4.2 Ungenaue Fließkommazahlen

Fließkommazahlen (`float`, `double`) sind im Computer unverzichtbar, um mit Nachkommastellen zu rechnen. Allerdings verbirgt sich hinter ihnen eine Stolperfalle: Sie können nicht jede rationale Zahl exakt darstellen.

### Warum ist das so?
Unser Computer arbeitet intern im Binärsystem (Basis 2). Manche Zahlen, die im Dezimalsystem (Basis 10) völlig problemlos als endlicher Bruch darstellbar sind (z. B. `0.1` oder `0.2`), werden im Binärsystem zu periodischen Brüchen (ähnlich wie $1/3 = 0{,}3333\dots$ im Dezimalsystem). Da der Speicherplatz für eine Fließkommazahl jedoch begrenzt ist, muss der Computer die Zahl nach einer bestimmten Anzahl von Binärstellen abschneiden. Das führt zu winzigen Rundungsfehlern.

Wenn du beispielsweise `0.1` und `0.2` addierst, wirst du als mathematisches Ergebnis `0.3` erwarten. Für den Computer ist die Summe jedoch minimal größer oder kleiner als `0.3`.

> [!WARNING]
> Vergleiche Fließkommazahlen niemals direkt mit dem Gleichheitsoperator (`==`)!
> Eine Abfrage wie `if (ergebnis == 0.3)` wird in vielen hellen Fällen fehlschlagen, selbst wenn die mathematische Logik korrekt ist.

### Wie löst man das Problem?
Anstatt auf exakte Gleichheit zu prüfen, berechnet man in der Praxis den absoluten Abstand der beiden Zahlen und prüft, ob dieser Abstand kleiner als ein sehr kleiner Schwellenwert (oft als *Epsilon* bezeichnet) ist. 

Wenn der Unterschied zwischen zwei Werten verschwindend gering ist, betrachten wir sie für unser Programm als "gleich".

---

## 4.3 Typumwandlung (Type Casting)

Manchmal müssen Werte eines bestimmten Typs in einen anderen Typ konvertiert werden – beispielsweise, wenn du eine Ganzzahl mit einer Fließkommazahl verrechnen willst oder eine Funktion einen bestimmten Typ erwartet.

### Implizite Typumwandlung
C++ führt viele Typumwandlungen automatisch (implizit) durch. 
*   **Erweiterung (Promotion):** Ein "kleinerer" Typ wird ohne Datenverlust in einen "größeren" Typ umgewandelt (z. B. `float` zu `double` oder `char` zu `int`). Das ist absolut sicher.
*   **Einschränkung (Narrowing):** Ein Typ wird in einen Typ mit kleinerem Wertebereich oder anderer Darstellung umgewandelt (z. B. `double` zu `int`). Hierbei gehen Informationen verloren! Bei `double` zu `int` werden die Nachkommastellen einfach abgeschnitten.

### Automatische Typumwandlung beschränken
Um ungewollten Datenverlust durch implizite Einschränkungen zu verhindern, solltest du die **Braced Initialization** (Initialisierung mit geschweiften Klammern `{}`) verwenden. Der Compiler wird dich dann aktiv warnen oder den Kompiliervorgang abbrechen, wenn eine einschränkende Konvertierung droht:

```cpp
// Syntax-Prinzip:
int meine_zahl{3.14}; // Der Compiler meckert, da 3.14 nicht ohne Verlust in int passt!
```

### Explizite Typumwandlung mit `static_cast`
Wenn du eine Typumwandlung ganz bewusst und gewollt durchführen möchtest, solltest du dies dem Compiler und anderen Entwicklern explizit mitteilen. Verwende dazu den modernen C++-Cast-Operator `static_cast`.

Die Syntax sieht wie folgt aus:

```cpp
static_cast<Zieltyp>(Ausdruck)
```

Mit `static_cast` zeigst du deutlich, dass der Typwechsel kein Versehen ist. Es ist wesentlich sicherer als der veraltete C-Style Cast (z. B. `(int)variable`), da der Compiler prüft, ob die gewünschte Umwandlung überhaupt sinnvoll und erlaubt ist.

---

## 4.4 Formatierte Ausgabe von Werten

Im modernen C++23 nutzen wir das Modul `std`, um Zugriff auf die Standardbibliothek zu erhalten. Für die Textausgabe auf der Konsole verabschieden wir uns von den alten, oft sperrigen `std::cout`-Zeilen und greifen stattdessen auf die modernen Funktionen aus dem Header `<print>` (bzw. direkt aus `import std;`) zurück.

```cpp
import std;
```

### `std::print` und `std::println`
*   `std::print` gibt Text aus, ohne am Ende eine neue Zeile zu beginnen.
*   `std::println` macht genau dasselbe, fügt aber automatisch einen Zeilenumbruch am Ende hinzu.

Beide Funktionen arbeiten mit Platzhaltern in Form von geschweiften Klammern `{}`.

### Formatierung mit Platzhaltern
Du kannst Werte direkt in deinen Text einbetten, indem du Platzhalter verwendest. C++ setzt die Argumente in der Reihenfolge ihres Auftretens ein:

```cpp
// Syntax-Template:
std::println("Hallo {}, du bist {} Jahre alt.", name, alter);
```

### Format-Spezifizierer
Das eigentliche Kraftpaket ist die Formatierung innerhalb der geschweiften Klammern. Durch einen Doppelpunkt `:` gefolgt von speziellen Zeichen kannst du genau steuern, wie ein Wert dargestellt wird:

*   **Nachkommastellen begrenzen:** `{:.2f}` formatiert eine Fließkommazahl auf genau 2 Nachkommastellen.
*   **Mindestbreite festlegen:** `{:5}` sorgt dafür, dass die Ausgabe mindestens 5 Zeichen breit ist (nützlich für tabellarische Ausgaben).
*   **Zahlenbasen ändern:** `{:x}` gibt eine Zahl im Hexadezimalsystem aus, `{:b}` im Binärsystem.

```cpp
// Beispiel für Format-Spezifikation bei Fließkommazahlen:
std::println("Wert: {:.3f}", pi); // Gibt die Zahl mit drei Nachkommastellen aus
```

### `std::format`
Möchtest du einen formatierten Text nicht direkt ausgeben, sondern in einer String-Variablen speichern, um ihn später zu verwenden? Dafür gibt es `std::format`. Die Funktionsweise und Syntax der Platzhalter ist identisch mit `std::print`, nur dass das Ergebnis als `std::string` zurückgegeben wird:

```cpp
// Speichern statt Ausgeben:
std::string info = std::format("Ergebnis: {:.2f}", wert);
```

---

## 4.5 Kontrollfragen und Aufgaben

### Kontrollfragen
1.  Was ist der Unterschied zwischen `x++` und `++x`? Beschreibe eine Situation, in der dieser Unterschied wichtig wird.
2.  Warum führt die Rechnung `int ergebnis = 5 / 2;` dazu, dass `ergebnis` den Wert `2` erhält? Wie könntest du die Division anpassen, um `2.5` zu erhalten?
3.  Warum ist es eine schlechte Idee, zwei `double`-Variablen mit `if (a == b)` zu vergleichen? Wie sieht ein sicherer Vergleich aus?
4.  Welchen Vorteil bietet `static_cast` gegenüber der älteren Typumwandlung im C-Stil (z. B. `(int)wert`)?
5.  Welchen Vorteil hat die Verwendung von `std::println` gegenüber der klassischen Ausgabe mit `std::cout`?

### Aufgaben

#### Aufgabe 1: Der Modulo-Detektiv
Schreibe ein Programm, das eine vom Benutzer eingegebene Ganzzahl einliest. Das Programm soll mithilfe des Modulo-Operators prüfen, ob die Zahl gerade oder ungerade ist, und das Ergebnis auf der Konsole ausgeben.
*   *Hinweis:* Eine Zahl ist gerade, wenn sie ohne Rest durch 2 teilbar ist.

#### Aufgabe 2: Fließkomma-Präzision visualisieren
Erstelle ein Programm, das eine mathematische Berechnung durchführt, bei der ein kleiner Rundungsfehler entsteht (z. B. die Addition von `0.1` dreimal hintereinander und der Vergleich mit `0.3`).
1.  Lass das Programm zuerst prüfen, ob das Ergebnis exakt gleich `0.3` ist, und gib das Ergebnis dieser Prüfung aus.
2.  Implementiere anschließend den Vergleich über die Berechnung der absoluten Differenz (unter Verwendung einer kleinen Toleranzgrenze) und gib das Ergebnis dieses Vergleichs aus.
3.  Nutze `std::println` mit Format-Spezifizierern, um das berechnete Ergebnis einmal mit 6 und einmal mit 20 Nachkommastellen auszugeben.

#### Aufgabe 3: Der Währungsumrechner
Entwickle ein kleines Programm zur Währungsumrechnung. 
1.  Lies einen Betrag in Euro als Fließkommazahl ein.
2.  Rechne diesen Betrag mit einem festen Wechselkurs (z. B. Dollar) um.
3.  Verwende `static_cast`, um den umgerechneten Betrag zusätzlich als gerundeten Cent-Betrag (also als Ganzzahl) zu speichern.
4.  Gib sowohl den genauen Betrag (formatiert auf 2 Nachkommastellen) als auch den reinen Ganzzahl-Cent-Wert sauber beschriftet aus.
