# 2 Erste Schritte in C++

Willkommen im zweiten Kapitel! Hier legst du das Fundament für deine Reise mit C++. Wir schauen uns an, wie ein typisches C++-Programm aufgebaut ist, wie Daten ein- und ausgegeben werden und welche grundlegenden Konzepte du verinnerlichen musst. Dabei richten wir uns nach dem modernen Standard: **C++23**.

## 2.1 Das erste Programm in C++
Jedes C++-Programm benötigt einen definierten Einstiegspunkt – einen Ort, an dem der Computer mit der Ausführung beginnt.

### Die `main()`-Funktion
Der Einstiegspunkt ist immer die Funktion `main()`. Sie hat eine ganz bestimmte Struktur:
- Sie muss einen ganzzahligen Rückgabetyp besitzen (üblicherweise `int`).
- Sie enthält den Rumpf in geschweiften Klammern `{ ... }`, in dem deine Befehle stehen.
- Sie gibt standardmäßig dem Betriebssystem eine Rückmeldung (z. B. `0` für "alles okay"), wobei das `return 0;` am Ende der `main()`-Funktion in C++ sogar optional ist (wenn es fehlt, wird automatisch `0` zurückgegeben).

Ein grobes Schema der Struktur sieht so aus:
```cpp
int main() {
    // Hier stehen deine Anweisungen
}
```

### Module und Header-Dateien: `#include` vs. `import std;`
Um nützliche Dinge wie Textausgaben auf dem Bildschirm zu tun, müssen wir Funktionalität aus der C++-Standardbibliothek verwenden. Früher geschah das ausschließlich über den Präprozessor-Befehl `#include`. Seit C++20 und verfeinert in C++23 nutzen wir das moderne Modulsystem.

- **Klassischer Weg (`#include`):** Hiermit kopiert der Compiler Text aus Header-Dateien (z. B. `<iostream>`).
  ```cpp
  #include <iostream>
  ```
- **Moderner Weg (`import std;`):** Seit C++23 importieren wir die gesamte Standardbibliothek als Modul. Das geht viel schneller beim Kompilieren und ist sauberer.
  ```cpp
  import std;
  ```

> [!TIP]
> Versuche in deinen Programmen nach Möglichkeit immer auf das moderne `import std;` zu setzen, da dies die Zukunft von C++ darstellt und den Kompilierungsprozess erheblich beschleunigt!

---

## 2.2 Anweisungen und Ausdrücke
C++-Programme bestehen im Wesentlichen aus zwei Dingen: Anweisungen (Statements) und Ausdrücken (Expressions).

- **Ausdruck (Expression):** Ein Codefragment, das einen Wert berechnet. Zum Beispiel ist `3 + 4` ein Ausdruck, der den Wert `7` liefert. Auch der Aufruf einer Funktion, die etwas berechnet, ist ein Ausdruck.
- **Anweisung (Statement):** Eine Anweisung ist eine Aktion, die ausgeführt wird. Sie tut etwas (z. B. eine Variable deklarieren oder einen Wert zuweisen) und wird in C++ fast immer mit einem **Semikolon (`;`)** abgeschlossen. 

Wenn du einen Ausdruck mit einem Semikolon versiehst, machst du daraus eine Ausdrucksanweisung (Expression Statement):
```cpp
ausdruck; // Dies ist nun eine Anweisung
```

---

## 2.3 Die Standardeingabe- und -ausgabestreams
Um mit der Außenwelt zu kommunizieren, nutzt C++ das concept von "Streams" (Datenströmen). Du kannst dir einen Stream wie eine Röhre vorstellen, durch die Zeichen nacheinander fließen.

### 2.3.1 Die Streams von C++
In der Standardbibliothek gibt es vordefinierte Datenströme, die mit der Konsole verknüpft sind. Der Namensraum `std::` (steht für "standard") sorgt dafür, dass diese Namen nicht mit deinen eigenen verwechselt werden.

### 2.3.2 Ausgabe mit `std::cout`
`std::cout` (Character Output) ist der klassische Weg, um Zeichen auf der Konsole auszugeben.
- Man verwendet ihn zusammen mit dem Stream-Einfügeoperator `<<`.
- Wenn du eine neue Zeile erzeugen möchtest, kannst du das Steuerzeichen `\n` oder den Manipulator `std::endl` verwenden. (Hinweis: `std::endl` erzwingt zusätzlich das Leeren des Puffers, was langsamer sein kann als ein einfaches `\n`).

Syntax-Schema:
```cpp
std::cout << "Dein Text" << '\n';
```

### 2.3.3 Moderne Ausgabe mit `std::print` und `std::println` (C++23)
In modernem C++ (seit C++23) gibt es eine viel elegantere, sicherere und schnellere Methode zur Textformatierung und -ausgabe: `std::print` und `std::println`. Sie funktionieren ähnlich wie in Python oder Rust und nutzen geschweifte Klammern `{}` als Platzhalter.

- `std::print` gibt den Text genau so aus, wie er angegeben ist.
- `std::println` fügt automatisch am Ende einen Zeilenumbruch hinzu.

Schema für Platzhalter:
```cpp
std::println("Der Wert ist {}", ausdruck);
```

> [!NOTE]
> Die Verwendung von `std::print` und `std::println` benötigt das Modul `import std;` oder den Header `<print>`. Es ist der empfohlene Weg für jegliche Textausgabe in C++23!

### 2.3.4 Eingabe mit `std::cin`
Um Daten vom Benutzer über die Tastatur einzulesen, nutzen wir `std::cin` (Character Input).
- Hierbei wird der Stream-Extraktionsoperator `>>` verwendet.
- Die Daten fließen von `std::cin` in eine Variable.

Syntax-Schema:
```cpp
std::cin >> variable;
```

### 2.3.5 Ausgabe mit `std::cerr`
Neben der normalen Ausgabe gibt es den Standard-Fehlerstrom `std::cerr` (Character Error).
- Er wird für Fehlermeldungen und Diagnoseausgaben verwendet.
- Der Unterschied zu `std::cout` ist, dass `std::cerr` standardmäßig nicht gepuffert wird. Fehlermeldungen erscheinen also sofort auf dem Bildschirm, selbst wenn das Programm kurz danach abstürzt.

Syntax-Schema:
```cpp
std::cerr << "Fehlermeldung!" << '\n';
```

---

## 2.4 Einige Begriffe zu C++
Bevor du dein erstes eigenes Programm schreibst, solltest du drei wichtige Begriffe kennen:

- **Bezeichner (Identifiers):** Das sind die Namen, die du selbst vergibst – zum Beispiel für Variablen, Funktionen oder Klassen. Sie dürfen aus Buchstaben, Ziffern und Unterstrichen `_` bestehen, dürfen aber nicht mit einer Ziffer beginnen. Groß- und Kleinschreibung wird unterschieden (`wert` ist etwas anderes als `Wert`). C++-Schlüsselwörter (wie `int` oder `return`) dürfen nicht als Bezeichner verwendet werden.
- **Literale:** Das sind feste Werte, die direkt im Quellcode stehen. Beispiele:
  - Ganzzahliges Literal: `42`
  - Fließkomma-Literal: `3.14`
  - Zeichen-Literal: `'A'`
  - Zeichenketten-Literal (String): `"Hallo Welt"`
- **Kommentare:** Notizen für dich oder andere Entwickler, die vom Compiler völlig ignoriert werden.
  - Einzeiliger Kommentar: Beginnt mit `//`
  - Mehrzeiliger Kommentar: Eingeschlossen in `/*` und `*/`

---

## 2.5 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Welchen Rückgabetyp muss die `main()`-Funktion haben und was bedeutet dieser Rückgabewert?
2. Was ist der Unterschied zwischen `#include <iostream>` und `import std;`?
3. Warum ist das Semikolon `;` in C++ so wichtig und was unterscheidet einen Ausdruck von einer Anweisung?
4. In welche Richtung zeigen die Pfeile bei `std::cout` (`<<`) und `std::cin` (`>>`)? Gibt es eine Eselsbrücke, um sich das zu merken?
5. Warum sollte man für Fehlermeldungen lieber `std::cerr` anstelle von `std::cout` verwenden?

### Aufgaben
1. **Das Begrüßungsprogramm:**
   Schreibe ein Programm, das die moderne Anweisung `std::println` nutzt, um einen freundlichen Gruß auf der Konsole auszugeben. Nutze dabei das moderne `import std;`.
2. **Das Echo-Programm:**
   Erstelle ein Programm, das den Benutzer nach einer Zahl fragt, diese einliest und sie anschließend mit einem erklärenden Text wieder auf dem Bildschirm ausgibt.
3. **Fehlersuche:**
   Finde die Fehler im folgenden (gedanklichen) Code-Ausschnitt:
   ```cpp
   // Nur zur Veranschaulichung - nicht lauffähig!
   int main()
   (
       std::cout >> "Hallo Welt"
       return "Erfolg";
   )
   ```
   *Tipp: Schau dir die Klammerung, die Stream-Operatoren und den Rückgabetyp genau an!*
