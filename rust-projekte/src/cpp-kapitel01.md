# 1 Einstieg in die Welt von C++

Herzlich willkommen in der Welt von C++! Wenn du programmieren lernen oder eine der leistungsfähigsten Sprachen der Welt meistern möchtest, bist du hier genau richtig. C++ ist die treibende Kraft hinter Betriebssystemen, Spiele-Engines, Web-Browsern, Flugsteuerungen und vielen anderen geschäftskritischen Systemen.

In diesem Kapitel legen wir das Fundament. Du erfährst, wie sich C++ entwickelt hat, welche Werkzeuge du benötigst und wie du deinen Compiler so einstellst, dass er den modernen Standard **C++23** versteht. Am Ende wirst du in der Lage sein, dein erstes eigenes C++23-Programmgerüst zu übersetzen.

---

## 1.1 Der C++-Standard (C++23 und Ausblick auf C++26)

C++ ist keine statische Sprache. Seit ihrer Entstehung in den 1980er-Jahren durch Bjarne Stroustrup hat sie sich kontinuierlich weiterentwickelt. Das wichtigste Organ hinter dieser Entwicklung ist das ISO-C++-Komitee, das alle drei Jahre einen neuen offiziellen Standard verabschiedet.

### Die Evolution des Standards
*   **Klassisches C++ (C++98 / C++03):** Die Grundlagen der Sprache wurden gelegt, doch viele Dinge waren im Vergleich zu heute sperrig und fehleranfällig.
*   **Modernes C++ (ab C++11):** Mit C++11 (und den Verfeinerungen C++14/C++17) erlebte die Sprache eine Renaissance. Features wie automatische Typableitung (`auto`) und Smart Pointer machten C++ sicherer und lesbarer.
*   **Das modulare Zeitalter (C++20 / C++23):** C++20 brachte revolutionäre Konzepte wie **Module** (die das veraltete `#include`-System ablösen) und **Concepts** (zur präzisen Steuerung von Templates). C++23 verfeinerte dies unter anderem mit komfortablen I/O-Funktionen wie `std::print` und `std::println` sowie dem Fehlertyp `std::expected`.
*   **Die Zukunft: C++26:** Der kommende Standard C++26 verfeinert die Sprache weiter. Er bringt Vereinfachungen wie den Platzhalter `_` (den du vielleicht schon aus Sprachen wie Rust oder Python kennst), verbessertes Pack-Indexing bei Metaprogrammierung und eine noch tiefere Integration von Modulen in der Standardbibliothek.

> [!NOTE]
> In diesem Buch konzentrieren wir uns konsequent auf das moderne **C++23** und werfen überall dort, wo es bereits sinnvoll ist, einen kurzen Ausblick auf kommende Neuerungen von **C++26**. So lernst du von Anfang an den saubersten und sichersten Programmierstil auf Basis des aktuellen Standards.

### Warum C++23? Ein kurzer Vorgeschmack auf die Syntax
Im modernen C++ schreiben wir nicht mehr zwingend `#include <iostream>`. Stattdessen importieren wir die gesamte Standardbibliothek effizient über ein einziges Modul:

```cpp
import std;
```

Und anstelle des alten `std::cout << "Hallo Welt\n";` nutzen wir die moderne, formatierte Ausgabe:

```cpp
std::println("Hallo, C++23-Welt!");
```

Ein weiteres Highlight als Ausblick auf C++26 ist der anonyme Platzhalter `_`. Wenn du einen Rückgabewert einer Funktion nicht benötigst (z. B. bei Structured Bindings), kannst du ihn einfach ignorieren, ohne einen künstlichen Variablennamen erfinden zu müssen. Unter C++23 greift man hierbei noch auf unbenannte Variablen (oft in Kombination mit dem Attribut `[[maybe_unused]]`) zurück:

```cpp
// Zukünftige Syntax ab C++26 (Structured Bindings mit Platzhalter):
auto [ergebnis, _] = berechne_daten();

// Unter C++23 weicht man meistens so aus:
auto [ergebnis, ungenutzt] = berechne_daten();
(void)ungenutzt; // oder [[maybe_unused]]
```

---

## 1.2 Die nötigen Werkzeuge für C++

Um C++-Code zu schreiben und auszuführen, benötigst du im Wesentlichen zwei Werkzeuge: einen **Texteditor** (oder eine integrierte Entwicklungsumgebung) und einen **Compiler**.

### 1. Compiler
Der Compiler übersetzt deinen für Menschen lesbaren Quellcode in Maschinensprache, die dein Computer direkt ausführen kann. Es gibt drei große Compiler-Familien:
*   **GCC (GNU Compiler Collection / g++):** Der Standard-Compiler in der Linux-Welt. Extrem weit verbreitet und meistens führend bei der Implementierung neuer Sprachfeatures.
*   **Clang (clang++):** Ein moderner, modular aufgebauter Compiler, der für seine hervorragenden und verständlichen Fehlermeldungen bekannt ist. Er wird häufig auf macOS und Linux eingesetzt.
*   **MSVC (Microsoft Visual C++):** Der Standard-Compiler unter Windows, der zusammen mit Visual Studio ausgeliefert wird.

### 2. Entwicklungsumgebungen (IDEs)
Eine IDE (Integrated Development Environment) vereint Texteditor, Compiler-Steuerung und Fehlersuche (Debugging) in einer einzigen Oberfläche.
*   **Visual Studio (Windows):** Sehr mächtig und komfortabel, besonders für Windows-Entwickler die Standardwahl.
*   **VS Code (Plattformübergreifend):** Ein leichtgewichtiger, modularer Editor. Mit den Erweiterungen *C/C++* und *CMake Tools* lässt er sich in eine vollwertige IDE verwandeln.
*   **CLion (Plattformübergreifend):** Eine kommerzielle, aber sehr intelligente IDE von JetBrains, die hervorragenden Support für modernes C++ bietet.

---

## 1.3 Übersetzen mit g++ und clang++

Wenn du lieber auf der Kommandozeile arbeitest, kannst du deine Programme direkt mit den Befehlen `g++` oder `clang++` übersetzen.

Um die modernen C++23-Features nutzen zu können, musst du dem Compiler explizit mitteilen, welchen Standard er verwenden soll. Standardmäßig nutzen Compiler oft noch ältere Standards, um die Kompatibilität mit altem Code zu wahren.

### Der Kompilierbefehl
Der Aufruf auf dem Terminal folgt diesem Muster:

```bash
g++ -std=c++23 -Wall -Wextra -Wpedantic dein_programm.cpp -o dein_programm
```

*   `-std=c++23`: Aktiviert den C++23-Support des Compilers. (Hinweis: Bei älteren Compiler-Versionen musst du eventuell `-std=c++2b` nutzen, falls `c++23` noch nicht erkannt wird).
*   `-Wall -Wextra -Wpedantic`: Diese drei Flags sind deine besten Freunde! Sie weisen den Compiler an, dir so viele Warnungen und Hinweise auf potenzielle Fehler wie möglich auszugeben. Gewöhne dir an, Warnungen wie Fehler zu behandeln!
*   `dein_programm.cpp`: Die Quellcodedatei, die übersetzt werden soll.
*   `-o dein_programm`: Definiert den Namen der fertigen ausführbaren Datei.

> [!TIP]
> Sollte dein Compiler beim Parameter `-std=c++23` streiken, überprüfe seine Version mit `g++ --version` oder `clang++ --version`. Für C++23-Support (insbesondere Module und `std::println`) benötigst du eine aktuelle Version (z. B. GCC 13+ oder Clang 16+).

---

## 1.4 Übersetzen mit einer Entwicklungsumgebung

In der professionellen C++-Entwicklung nutzt man selten manuelle Compileraufrufe. Stattdessen verwendet man Build-Systeme. Das De-facto-Standard-Buildsystem für C++ ist **CMake**.

CMake generiert die passenden Projektdateien für deine IDE (z. B. für Visual Studio oder Makefiles für das Terminal).

### CMake-Konfiguration für C++23
Eine minimale Konfigurationsdatei namens `CMakeLists.txt` teilt dem Build-System mit, wie das Projekt aufgebaut ist. Um C++23 zu aktivieren, müssen wir die Standard-Eigenschaften festlegen:

```cmake
cmake_minimum_required(VERSION 3.25)
project(MeinErstesProjekt CXX)

# C++23 aktivieren
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Ausführbare Datei definieren
add_executable(mein_programm main.cpp)
```

Wenn du ein solches Projekt in VS Code (mit den *CMake Tools*) oder in CLion öffnest, erkennt die IDE automatisch die Einstellungen und konfiguriert den Compiler im Hintergrund für dich. Du musst nur noch auf "Build" oder "Run" klicken.

---

## 1.5 Listings zum Buch

Alle Code-Beispiele, Übungen und Vorlagen zu diesem Buch findest du in unserem offiziellen GitHub-Repository. 

*   **Struktur:** Die Beispiele sind nach Kapiteln geordnet (z. B. `kapitel01/`).
*   **Vorbereitete Umgebungen:** Im Repository findest du bereits vorkonfigurierte `CMakeLists.txt`-Dateien, sodass du direkt loslegen kannst, ohne dich um die Einrichtung kümmern zu müssen.

> [!IMPORTANT]
> Versuche immer, den Code selbst abzutippen, anstatt ihn nur zu kopieren. Das Tippen schult dein Auge für Syntaxfehler (wie vergessene Semikolons) und verankert die Konzepte deutlich besser in deinem Gedächtnis.

---

## 1.6 Kontrollfragen und Aufgaben im Buch

Bevor du mit dem Schreiben von Code beginnst, überprüfe dein theoretisches Wissen mit diesen Fragen:

1.  **Standard-Zyklen:** In welchem zeitlichen Rhythmus veröffentlicht das ISO-C++-Komitee neue Standards?
2.  **Moderne I/O:** Welcher Befehl ersetzt im modernen C++ das alte `std::cout << "..."` für die Textausgabe und warum ist er komfortabler?
3.  **Compiler-Flags:** Warum ist es ratsam, immer die Flags `-Wall`, `-Wextra` und `-Wpedantic` beim Kompilieren per Hand anzugeben?
4.  **Dateiendung:** Welche Dateiendung ist für C++-Quellcodedateien üblich?
5.  **Buildsysteme:** Was ist die Hauptaufgabe von CMake in einem C++-Projekt?

---

## 1.7 Aufgabe: Dein erstes Programmgerüst

Deine Aufgabe ist es nun, ein minimales C++-Programm zu schreiben, das eine Willkommensnachricht auf der Konsole ausgibt.

### Hinweise zur Umsetzung:
1.  Erstelle eine Textdatei namens `main.cpp`.
2.  Verwende am Anfang der Datei den modernen C++23-Modulimport `import std;`, um Zugriff auf die Standardbibliothek zu erhalten.
3.  Definiere die Einstiegsfunktion `main`. Denke daran, dass diese Funktion einen Ganzzahl-Typ (`int`) zurückgeben muss.
4.  Nutze innerhalb von `main` die Funktion `std::println`, um einen Text deiner Wahl auszugeben.
5.  Die Funktion `main` sollte signalisieren, dass das Programm erfolgreich durchgelaufen ist, indem sie einen entsprechenden Statuscode zurückgibt (üblicherweise `0`).

### Code-Struktur (Template):
Verwende die folgende Struktur als Orientierungshilfe:

```cpp
// 1. Modul-Import hier einfuegen

// 2. Definition der Hauptfunktion main
int main() {
    // 3. Hier deine Ausgabe platzieren

    // 4. Erfolgreichen Rueckgabewert liefern
}
```

Versuche, dieses Programm auf der Kommandozeile mit dem in **Abschnitt 1.3** gelernten Befehl zu übersetzen und auszuführen.

---

## 1.8 Aufgabe zum Ausblick auf C++26 (z.B. Test-Kompilierung)

In dieser optionalen Aufgabe testen wir als Ausblick, ob dein Compiler bereits experimentelle C++26-Erweiterungen unterstützt. Wir wollen den kommenden anonymen Platzhalter `_` ausprobieren, der in C++23 noch nicht standardmäßig enthalten ist.

### Aufgabenstellung:
1.  Erstelle ein neues Programm.
2.  Definiere eine Variable und weise ihr einen Wert zu.
3.  Nutze in der nächsten Zeile den Platzhalter `_` als Variablennamen, um zu prüfen, ob dein Compiler die Deklaration einer ungenutzten Variable mit diesem Namen ohne Warnungen erlaubt.
4.  Kompiliere das Programm mit aktiviertem experimentellen C++26-Standard (`-std=c++26` bzw. `-std=c++2c`).

### Didaktischer Hinweis zur Fehlerbehebung:
Unter C++23 ist dieses Feature noch nicht Teil des Standards. Wenn dein Compiler eine Fehlermeldung wie `error: redefinition of '...'` oder `invalid variable name` ausgibt, unterstützt er dieses zukünftige C++26-Feature noch nicht. Für C++23-konformen Code musst du stattdessen auf das Attribut `[[maybe_unused]]` vor einem regulären Variablennamen ausweichen.

Viel Erfolg bei deinen ersten Schritten mit dem modernen C++23 und dem Ausblick auf C++26!
