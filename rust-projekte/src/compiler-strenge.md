# 🛠️ Strenge Compiler: C/C++ wie Rust & OCaml einstellen

Wenn du mit dem Programmieren in Rust oder OCaml beginnst, fällt dir sofort eines auf: Der Compiler ist unglaublich streng. Er lässt dich kein Programm ausführen, das auch nur den kleinsten Fehler in der Speicherverwaltung oder im Typsystem enthält. Er verhält sich wie ein aufmerksamer Mentor, der deine Arbeit Korrektur liest, bevor sie Schaden anrichten kann.

Kommst du hingegen von C oder C++, bist du es vielleicht gewohnt, dass der Compiler fast alles durchgehen lässt. Ein vergessener Rückgabewert? Ein impliziter Typwechsel? Ein Speicherzugriff außerhalb des Arrays? Der Compiler murmelt vielleicht eine leise Warnung, baut dir aber trotzdem klaglos eine ausführbare Datei. Das böse Erwachen folgt dann zur Laufzeit: Das Programm stürzt ab, liefert falsche Werte oder öffnet Sicherheitslücken.

In diesem Kapitel lernst du, wie du deine C- und C++-Compiler (GCC und Clang) so streng einstellst, dass sie sich fast wie der Rust- oder OCaml-Compiler verhalten.

---

## 🧠 Theorie

### Die Analogie: Der nachsichtige vs. der strenge Fahrlehrer

Stell dir vor, du machst deinen Führerschein:
* **Der standardmäßige C-Fahrlehrer** sits schweigend auf dem Beifahrersitz. Du vergisst den Schulterblick, blinkst falsch und fährst zu schnell in die Kurve. Er seufzt vielleicht kurz, greift aber nicht ein. Erst wenn du gegen die Wand fährst (Laufzeit-Absturz), ist die Fahrt vorbei.
* **Der Rust- und OCaml-Fahrlehrer** hingegen lässt dich das Auto gar nicht erst starten, wenn du nicht angeschnallt bist und die Spiegel nicht perfekt eingestellt hast. Sobald du einen Fehler machst, bremst er sofort ab und erklärt dir, was du falsch gemacht hast.

Wir wollen unseren C/C++-Compiler so konfigurieren, dass er zum strengen Fahrlehrer wird!

### Warum sind C und C++ standardmäßig so "nett"?

Historisch gesehen wurden C und C++ in einer Zeit entwickelt, in der Computer extrem langsam waren. Compiler mussten schnell laufen und durften den Entwickler nicht mit zu vielen Prüfungen aufhalten. Zudem gilt in C/C++ das Prinzip der Abwärtskompatibilität: Code, der vor 30 Jahren geschrieben wurde, soll heute immer noch ohne Änderungen kompilieren. Deshalb sind die strengsten Prüfungen standardmäßig **deaktiviert**.

### Schritt 1: Warnungen maximieren und zu Fehlern machen

Mit Compiler-Flags kannst du dem Compiler mitteilen, wie genau er hinschauen soll. Die wichtigsten Flags für GCC und Clang sind:

| Flag | Bedeutung | Erklärung |
| :--- | :--- | :--- |
| `-Wall` | *Warnings: All* | Aktiviert eine große Gruppe grundlegender Warnungen (z. B. ungenutzte Variablen). |
| `-Wextra` | *Warnings: Extra* | Aktiviert zusätzliche, sehr nützliche Warnungen, die `-Wall` nicht abdeckt. |
| `-Wpedantic` | *Pedantic* | Zwingt den Compiler zur strikten Einhaltung des ISO-C/C++-Standards. Eigenwillige Compiler-Erweiterungen werden bemängelt. |
| `-Werror` | *Warnings as Errors* | **Der wichtigste Schalter!** Er sorgt dafür, dass jede Warnung als harter Compiler-Fehler behandelt wird. Das Programm wird erst gebaut, wenn *alle* Warnungen behoben sind. |

#### Spezifische Lints (Feineinstellungen)

Um die Strenge von Rust und OCaml noch besser nachzubilden, solltest du diese Flags hinzufügen:
* `-Wconversion`: Warnt bei impliziten Typumwandlungen, die zu Datenverlust führen können (z. B. wenn ein `double` heimlich in ein `int` gequetscht wird).
* `-Wshadow`: Warnt, wenn eine lokale Variable eine andere Variable im äußeren Namensbereich verdeckt (Shadowing).
* `-Wimplicit-fallthrough`: Zwingt dich dazu, in `switch`-Blöcken explizit zu kennzeichnen, wenn ein Fall in den nächsten übergehen soll.

### Schritt 2: Statische Analyse (Linter)

Der Compiler sieht viel, aber nicht alles. Statische Analysewerkzeuge scannen deinen Quellcode ohne ihn auszuführen und suchen nach tieferliegenden logischen Fehlern.
* **`cppcheck`**: Ein leichtgewichtiges Tool, das hervorragend nach Ressourcenlecks, Out-of-Bounds-Zugriffen und uninitialisierten Variablen sucht.
* **`clang-tidy`**: Ein extrem mächtiger Linter aus der LLVM-Familie. Er kann dir sogar Vorschläge zur Modernisierung deines C++-Codes machen.

### Schritt 3: Dynamische Analyse (Sanitizers)

Rust verhindert Speicherfehler komplett zur Compilezeit. In C und C++ ist das ohne Garbage Collector oder Borrow Checker unmöglich. Aber wir können uns zur **Laufzeit** absichern. Die sogenannten **Sanitizers** instrumentieren deinen Code mit zusätzlichen Schutzprüfungen:

* **AddressSanitizer (ASan)**: Aktiviert über `-fsanitize=address`. Er findet Speicherfehler wie Buffer Overflows (Schreiben über Arraygrenzen) oder Use-After-Free (Zugriff auf bereits freigegebenen Speicher).
* **UndefinedBehaviorSanitizer (UBSan)**: Aktiviert über `-fsanitize=undefined`. Er findet undefiniertes Verhalten wie Ganzzahlüberläufe oder Division durch Null.

### 🔍 Gibt es einen Borrow Checker für C und C++?

Rust verdankt seine garantierte Speichersicherheit vor allem dem **Borrow Checker**, der Lebensdauern und Besitzverhältnisse zur Compilezeit rigoros überprüft. In C und C++ gibt es standardmäßig keinen solchen Wächter. Doch moderne Compiler und statische Analysewerkzeuge versuchen zunehmend, diese Lücke zu schließen:

1. **GCCs `-fanalyzer` (Statische Analyse zur Compilezeit):**
   Ab GCC 10 gibt es das eingebaute Flag `-fanalyzer`. Wenn du es aktivierst, führt der Compiler eine tiefgehende Pfadanalyse deines Codes durch. Er sucht nach Pfaden, die zu Speicherlecks, Double-Free (zweifacher Speicherfreigabe) oder Use-after-Free (Zugriff nach der Freigabe) führen könnten. Es ist kein vollständiger mathematischer Beweis wie in Rust, findet aber sehr viele Fehler bereits beim Übersetzen!

2. **Clangs `lifetimebound`-Attribute (C++):**
   Clang unterstützt das Attribut `[[clang::lifetimebound]]`. Damit kannst du dem Compiler signalisieren, dass die Lebensdauer des Rückgabewerts einer Funktion direkt an die Lebensdauer eines Parameters gekoppelt ist.
   
   ```cpp
   // Die zurückgegebene Referenz darf nicht länger leben als 'a' oder 'b'!
   const int& max(const int& a [[clang::lifetimebound]], const int& b [[clang::lifetimebound]]);
   ```
   Verwendest du die Funktion nun so, dass eine Referenz auf ein temporäres Objekt (z. B. den Rückgabewert einer anderen Funktion) überlebt, warnt dich der Compiler sofort.

3. **C++ Core Guidelines & Lifetime Profile:**
   Unter der Leitung von C++-Pionieren (wie Bjarne Stroustrup und Herb Sutter) wurde das *Lifetime Profile* entwickelt. Es definiert formale Regeln für Besitz und Ausleihe in C++. Werkzeuge wie `clang-tidy` können diese Richtlinien prüfen (z. B. mit `cppcoreguidelines-owning-memory`).

**Die Grenze:** Da C und C++ nicht von Grund auf mit dem Ownership-Prinzip im Typsystem entworfen wurden, können diese Compiler-Flags und Linter keine 100%ige Speichersicherheit garantieren wie Rust oder OCaml. Sie sind hervorragende Hilfsmittel, aber die Verantwortung für das ordentliche Aufräumen bleibt letztlich bei dir!

---

## 🛠️ Praxis-Aufgaben

### Aufgabe 1: Der unbemerkte Datenverlust (C)
Compiliere den folgenden Code einmal ganz normal mit `gcc code.c -o programm` und führe ihn aus. Compiliere ihn danach mit den strengen Flags `gcc -Wall -Wextra -Wconversion -Werror code.c -o programm`. Was passiert?

```c
#include <stdio.h>

int main(void) {
    double pi = 3.1415926535;
    // Hier passiert ein unbemerkter Datenverlust!
    int abgeschnittene_zahl = pi; 
    
    printf("Wert: %d\n", abgeschnittene_zahl);
    return 0;
}
```

**Deine Aufgabe:** Korrigiere den Code so, dass er auch mit den strengen Flags fehlerfrei kompiliert. Nutze dafür einen expliziten Cast (Typumwandlung), um dem Compiler zu zeigen, dass du den Datenverlust bewusst in Kauf nimmst.
*(Hinweis: Ändere die Zeile mit dem Typwechsel ab.)*

```c
// Bringe diese Zeile zum Kompilieren:
int abgeschnittene_zahl = /* todo: expliziter Cast nach int */;
```

### Aufgabe 2: Das Schattenspiel (C++)
Dieser C++-Code enthält einen logischen Fehler, da eine Variable im inneren Scope eine andere überdeckt. Standardmäßig baut der Compiler das Programm ohne Murren.

```cpp
#include <iostream>

int main() {
    int count = 10;
    
    if (count > 5) {
        // Hier wird eine neue Variable mit demselben Namen deklariert!
        int count = 5;
        std::cout << "Innerer Count: " << count << std::endl;
    }
    
    std::cout << "Äußerer Count (sollte 10 sein): " << count << std::endl;
    return 0;
}
```

**Deine Aufgabe:** 
1. Compiliere den Code mit `g++ -Wshadow -Werror main.cpp`.
2. Behebe den Shadowing-Fehler, indem du die innere Variable umbenennst oder den Code so anpasst, dass der Compiler nicht mehr warnt.

---

## 🚀 Compiler-Experimente

### Experiment 1: Speicherfehler fangen mit ASan
Schreibe ein kurzes C-Programm, das versucht, auf das 11. Element eines Arrays mit der Größe 10 zuzugreifen.
1. Compiliere es normal. Es wird wahrscheinlich ohne Fehler starten (und eventuell wirre Zahlen ausgeben).
2. Compiliere es mit `gcc -fsanitize=address -g main.c` und starte es erneut. Schau dir den detaillierten Fehlerbericht an, den ASan dir im Terminal ausgibt. Er sagt dir genau, in welcher Zeile der Fehler aufgetreten ist!

### Experiment 2: Den Standard erzwingen mit `-Wpedantic`
Nutze in C++ eine Compiler-Erweiterung, die nicht zum offiziellen Standard gehört (z. B. ein dynamisch großes Array auf dem Stack: `int n = 10; int arr[n];` – in C++ ist das eigentlich verboten, GCC erlaubt es aber als Extension).
1. Compiliere mit `g++ main.cpp`.
2. Compiliere mit `g++ -Wpedantic -Werror main.cpp`. Der Compiler wird dir erklären, dass dies nicht ISO-konform ist.

---

## 💡 Zusammenfassung

| Werkzeug / Flag | Wann nutzen? | Nutzen |
| :--- | :--- | :--- |
| `-Wall -Wextra` | Immer | Findet 80 % der einfachen Programmierfehler sofort. |
| `-Werror` | Beim Entwickeln | Verhindert, dass Warnungen ignoriert werden. |
| `-fsanitize=address` | Beim Testen / Debuggen | Erkennt Speicherlecks und illegale Zugriffe zur Laufzeit. |
| `clang-tidy` / `cppcheck` | Vor dem Commit/Push | Analysiert den Code auf Logikfehler und unsauberen Stil. |

---

## 📚 Links
* [GCC Warnungsoptionen (Offizielle Dokumentation)](https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html)
* [Clang Compiler-Optionen](https://clang.llvm.org/docs/UsersManual.html)
* [Compiler Explorer (godbolt.org)](https://godbolt.org/) – ideal, um verschiedene Compiler-Versionen und Flags direkt im Browser auszuprobieren.
