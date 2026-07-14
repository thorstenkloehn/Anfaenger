# 9 Modularisierung und Präprozessor

Bisher hast du deine Programme vermutlich in einer einzigen großen Datei geschrieben. Für kleine Experimente ist das völlig in Ordnung. Sobald deine Software jedoch wächst, wird eine einzelne Datei schnell unübersichtlich. Stell dir vor, du müsstest ein ganzes Betriebssystem oder ein modernes 3D-Spiel in einer einzigen Textdatei verwalten – das wäre ein absoluter Albtraum!

In diesem Kapitel erfährst du, wie du deinen Code in logische Bausteine zerlegst, Schnittstellen von Implementierungen trennst und Namenskonflikte verhinderst. Wir werfen einen Blick auf den historischen (aber immer noch allgegenwärtigen) Präprozessor und reisen direkt weiter in die moderne C++-Gegenwart mit dem zukunftsweisenden Modulsystem von C++20 bis C++23.

---

## 9.1 Präprozessor-Direktiven

Bevor der eigentliche C++-Compiler deinen Quellcode zu Gesicht bekommt, jagt der Compiler ein anderes Werkzeug über deinen Code: den **Präprozessor**. 

Der Präprozessor ist im Grunde ein einfacher, aber mächtiger Text-Editor. Er versteht kein C++, sondern sucht lediglich nach Zeilen, die mit einem Raute-Symbol (`#`) beginnen. Diese Zeilen nennen wir **Präprozessor-Direktiven**. Der Präprozessor führt die entsprechenden Textmanipulationen aus und übergibt das Ergebnis (die sogenannte *Übersetzungseinheit*) an den eigentlichen Compiler.

### `#include` – Text kopieren leicht gemacht
Die wohl bekannteste Direktive ist `#include`. Sie macht nichts anderes, als den Inhalt einer anderen Datei an genau dieser Stelle eins zu eins hineinzukopieren.

Dabei gibt es zwei Schreibweisen:
*   `#include <dateiname>`: Der Präprozessor sucht die Datei in den Standard-Verzeichnissen des Systems und Compilers (z. B. Header der Standardbibliothek).
*   `#include "dateiname"`: Der Präprozessor sucht zuerst im aktuellen Projektverzeichnis, in dem sich auch deine Quellcodedatei befindet. Findet er sie dort nicht, sucht er in den Systempfaden weiter.

### `#define` und `#undef` – Makros und Textersetzung
Mit `#define` kannst du dem Präprozessor sagen: "Ersetze ab jetzt jedes Vorkommen von Wort A durch Text B."
```cpp
// Syntax-Schema:
#define BEZEICHNER ersetzungstext
```
Der Präprozessor geht nun durch den Code und tauscht jeden gefundenen `BEZEICHNER` stumpf durch den `ersetzungstext` aus. 

Mit `#undef` kannst du eine solche Definition wieder aufheben:
```cpp
#undef BEZEICHNER
```

> [!WARNING]
> In modernem C++ solltest du `#define` für Konstanten oder Funktionen (sogenannte Makros) meiden! Der Präprozessor kennt keine C++-Typen, keine Gültigkeitsbereiche (Scopes) und ignoriert Namensräume. Nutze istattdessen typsichere `constexpr`-Konstanten oder echte Funktionen.

### Bedingte Kompilierung
Manchmal möchtest du, dass bestimmter Code nur unter bestimmten Bedingungen übersetzt wird – beispielsweise nur, wenn du das Programm auf Windows offiziell ausführst oder wenn du dich im "Debug-Modus" zur Fehlersuche befindest. Hier hilft die bedingte Kompilierung:

```cpp
#ifdef DEBUG_MODE
    // Dieser Code wird nur kompiliert, wenn DEBUG_MODE definiert ist
#endif

#ifndef BUFFER_SIZE
    #define BUFFER_SIZE 1024
#endif
```

*   `#ifdef` (if defined): Prüft, ob ein Makro existiert.
*   `#ifndef` (if not defined): Prüft, ob ein Makro *nicht* existiert.
*   `#if`, `#elif`, `#else`, `#endif`: Erlauben komplexere logische Abfragen (z. B. auf Zahlenwerte).

---

## 9.2 Moderne Module und `import std;`

Jahrzehntelang basierte C++ ausschließlich auf dem Kopieren von Textdateien via `#include`. Das hatte enorme Nachteile: Lange Kompilierzeiten (weil dieselben Header in Hunderten Dateien immer wieder neu eingelesen und analysiert werden mussten) und die Gefahr, dass Makros unbeabsichtigt andere Codeteile überschreiben.

Mit **C++20** wurden **Module** eingeführt, die mit **C++23** weiter verfeinert wurden. Sie revolutionieren die Art und Weise, wie wir Code strukturieren.

### Was sind Module?
Ein Modul ist eine logisch abgeschlossene Einheit. Anstatt den Code als rohen Text zu kopieren, wird das Modul einmalig vom Compiler übersetzt und in ein binäres Zwischenformat abgespeichert. Andere Programmteile importieren dieses fertige Modul. Das spart enorm viel Zeit beim Übersetzen deines Projekts.

Zudem bestimmst du in einem Modul explizit, welche Funktionen, Klassen oder Variablen nach außen hin sichtbar sein sollen. Alles am Modul bleibt gekapselt und unsichtbar.

### Die Syntax eines Moduls
Ein einfaches Modul besteht aus einer Schnittstelle. Ein typischer Aufbau sieht schematisch so aus:

```cpp
// Kennzeichnung als Modul-Schnittstellendatei (oft mit Endung .ixx oder .cppm)
export module mein_modul; 

// Wir können im Modul andere Module importieren
import std; 

// Nur Dinge mit dem Schlüsselwort 'export' sind außerhalb des Moduls sichtbar
export void meine_funktion();

// Ohne 'export' bleibt diese Funktion ein internes Geheimnis des Moduls
void interne_hilfsfunktion();
```

Im Hauptprogramm kannst du dieses Modul dann ganz einfach verwenden:

```cpp
import mein_modul;
import std; // C++23 Standardbibliothek importieren

int main() {
    meine_funktion();
}
```

> [!TIP]
> Seit C++23 kannst du die gesamte Standardbibliothek mit einer einzigen Zeile importieren: `import std;`. Das ersetzt die unzähligen alten Header wie `<iostream>`, `<vector>` oder `<string>` und verkürzt die Kompilierzeit drastisch!

---

## 9.3 Modulare Programmierung (Das klassische Modell)

Auch wenn Module die Zukunft sind, wirst du in der Praxis noch sehr häufig auf das klassische Modell aus Header- und Implementierungsdateien stoßen. Es ist wichtig, dieses Konzept zu verstehen, da Millionen Zeilen von C++-Code darauf basieren.

Das klassische Modell trennt Code in zwei (bzw. drei) Rollen auf:

```
                  +-----------------------+
                  |  Header-Datei (.hpp)  | <---+
                  |   "Was gibt es?"      |     |
                  +-----------------------+     |
                               ^                 |
                               | bindet ein      | bindet ein
      stellt bereit           |                 |
+------------------------------+     +--------------------------+
| Implementierungsdatei (.cpp) |     |    Client-Datei (.cpp)   |
|       "Wie funktioniert es?" |     |     Nutzt die Funktion   |
+------------------------------+     +--------------------------+
               |                                  |
               v kompiliert                       v kompiliert
      +-----------------+                +-----------------+
      | Objektdatei (.o)|                | Objektdatei (.o)|
      +-----------------+                +-----------------+
               \                                  /
                \                                /
                 v                              v
               +----------------------------------+
               |          Linker-Prozess          |
               | (Fügt Puzzleteile zusammen)      |
               +----------------------------------+
                                |
                                v
                       Ausführbare Datei
```

### 1. Die Header-Datei (`.h` oder `.hpp`)
Hier legst du die **Schnittstelle** fest. Du sagst dem Compiler, welche Funktionen, Klassen oder Variablen existieren. Du verrätst aber noch nicht, *wie* sie genau funktionieren. Man spricht von Deklarationen.

Um zu verhindern, dass eine Header-Datei versehentlich mehrfach in derselben Übersetzungseinheit eingebunden wird (was zu Fehlern führt), nutzt man **Header-Guards**:

```cpp
#ifndef MEIN_HEADER_HPP
#define MEIN_HEADER_HPP

// Deklarationen...
void berechne_wert(int x);

#endif // MEIN_HEADER_HPP
```
*Alternativ unterstützen fast alle modernen Compiler das pragmatische `#pragma once` ganz oben in der Datei.*

### 2. Die Implementierungsdatei (`.cpp`)
Hier wird das Geheimnis gelüftet. Du bindest deinen eigenen Header ein und schreibst die tatsächliche Logik (Definition).

### 3. Die Client-Datei (z. B. `main.cpp`)
Hier bindest du ebenfalls den Header ein, um die Funktionen zu nutzen. Der Compiler weiß durch den Header, dass die Funktion existiert und wie sie aufgerufen werden muss.

### Der Linker-Prozess
Der Compiler übersetzt jede `.cpp`-Datei einzeln für sich in eine maschinenlesbare Objektdatei (`.o` oder `.obj`). Wenn du in der `main.cpp` die Funktion `berechne_wert` aufrufst, weiß der Compiler beim Übersetzen der `main.cpp` noch nicht, wo der tatsächliche Maschinencode dieser Funktion liegt – er vertraut dem Header, dass sich später darum gekümmert wird.

Dieses "Später" ist die Aufgabe des **Linkers**. Er nimmt alle Objektdateien und fügt sie zusammen. Er sucht die aufgerufene Funktion aus `main.o` in der `implementierung.o` und verknüpft sie.
Findet der Linker die Definition einer deklarierten Funktion nicht, bricht er mit einem **Linker-Fehler** (z. B. `undefined reference to...`) ab.

---

## 9.4 Namensräume (namespaces)

Stell dir vor, du arbeitest in einem großen Team. Du schreibst eine Funktion `daten_drucken()`. Gleichzeitig schreibt dein Kollege in einem anderen Modul ebenfalls eine Funktion namens `daten_drucken()`. Wenn ihr eure Programmteile zusammenfügt, weiß der Compiler nicht, welche Funktion gemeint ist. Es kommt zum Konflikt.

**Namensräume** lösen dieses Problem. Sie funktionieren wie Nachnamen. Es kann viele Personen mit dem Vornamen "Max" geben, aber durch den Nachnamen (z. B. "Müller" oder "Schmidt") werden sie unterscheidbar.

### Namensräume deklarieren und nutzen
Du kannst deinen Code in einen Namensraum einbetten:

```cpp
namespace projekt_a {
    void daten_drucken();
}

namespace projekt_b {
    void daten_drucken();
}
```

Um nun eine bestimmte Funktion aufzurufen, nutzt du den Bereichsauflösungs-Operator `::` (Scope Resolution Operator):

```cpp
int main() {
    projekt_a::daten_drucken(); // Ruft die Funktion aus Projekt A auf
    projekt_b::daten_drucken(); // Ruft die Funktion aus Projekt B auf
}
```

### Verschachtelte Namensräume
Namensräume lassen sich beliebig tief verschachteln, um Hierarchien abzubilden:

```cpp
namespace firma::abteilung::projekt {
    void start();
}
```

### `using`-Importe und ihre Gefahren
Wenn du nicht jedes Mal den vollen Namen schreiben willst, kannst du Abkürzungen nutzen:

*   **Der komplette Import:**
    ```cpp
    using namespace projekt_a;
    // Ab jetzt kannst du daten_drucken() direkt aufrufen.
    ```
*   **Der gezielte Import:**
    ```cpp
    using projekt_a::daten_drucken;
    // Holt nur diese eine Funktion in den aktuellen Gültigkeitsbereich.
    ```

> [!IMPORTANT]
> Nutze `using namespace` niemals im globalen Gültigkeitsbereich einer Header-Datei! Dadurch zwingst du jeden, der deinen Header einbindet, diesen Namensraum ebenfalls komplett zu importieren. Das macht den Sinn von Namensräumen zunichte (Namespace Pollution).

### Namespace-Aliase
Wenn ein Namensraum sehr lang ist, kannst du ihm einen kürzeren Spitznamen geben:

```cpp
namespace prg = firma::abteilung::projekt;
```

### Anonyme (ungenannte) Namensräume
Wenn du einen Namensraum ohne Namen deklarierst, ist alles darin Definierte nur innerhalb dieser einen Datei sichtbar. Es verhält sich so, als hätte der Code eine "interne Verlinkung". Andere Dateien können auf diese Funktionen oder Variablen nicht zugreifen, selbst wenn sie deren Existenz erraten würden.

```cpp
namespace {
    void nur_in_dieser_datei_sichtbar() {
        // ...
    }
}
```

### Der `std`-Namensraum
Alles, was die C++-Standardbibliothek mitbringt (wie `std::string`, `std::vector`, `std::println`), befindet sich im Namensraum `std`. Dadurch wird verhindert, dass Standardfunktionen mit deinen eigenen Kreationen kollidieren.

---

## 9.5 Spezifizierer und Qualifikatoren

In C++ bestimmen Schlüsselwörter vor Variablen- oder Funktionsnamen, wie diese im Speicher liegen, wie lange sie leben (Lebensdauer) und wo sie sichtbar sind (Sichtbarkeit/Verlinkung).

### `static`
Das Wort `static` hat in C++ je nach Kontext leider unterschiedliche Bedeutungen:
1.  **In Funktionen:** Eine statische lokale Variable wird nur ein einziges Mal initialisiert. Sie behält ihren Wert auch dann, wenn die Funktion verlassen und erneut aufgerufen wird.
2.  **Im globalen Scope / in Namensräumen (klassisches Modell):** Schränkt die Sichtbarkeit des Symbols auf die aktuelle Datei ein (interne Verlinkung). *In modernem C++ zieht man hierfür anonyme Namensräume vor.*
3.  **In Klassen:** Die Variable existiert nur einmal für die gesamte Klasse und wird von allen Objekten dieser Klasse geteilt.

### `extern`
Mit `extern` signalisierst du dem Compiler: "Diese Variable oder Funktion existiert, aber sie ist irgendwo anders (in einer anderen Datei) definiert. Such bitte beim Linken danach."
```cpp
extern int globale_punkte; // Deklaration: Speicher wird nicht reserviert
```

### `constexpr`
Teilt dem Compiler mit, dass ein Ausdruck oder eine Funktion zur Compilezeit ausgewertet werden *kann*, sofern die Eingabewerte ebenfalls zur Compilezeit bekannt sind. Wenn nicht, wird sie ganz normal zur Laufzeit ausgeführt.

### `consteval` (C++20)
Erzwingt, dass eine Funktion *ausschließlich* zur Compilezeit ausgeführt werden darf. Kann der Compiler den Wert nicht während des Übersetzungsprozesses berechnen, gibt es einen Fehler. Man spricht von einer *Immediate Function*.

### `constinit` (C++20)
Garantiert, dass eine Variable mit statischer Lebensdauer (z. B. globale Variablen) bereits zur Compilezeit initialisiert wird. Im Gegensatz zu `constexpr` oder `const` darf der Wert dieser Variable zur Laufzeit aber später verändert werden. Sie verhindert das berüchtigte Problem der unvorhersehbaren Initialisierungsreihenfolge globaler Variablen (Static Initialization Order Fiasco).

### `const`
Ein Versprechen, dass der Wert nach der Initialisierung zur Laufzeit nicht mehr verändert werden darf.

### `inline`
Ein Hinweis an den Linker, dass eine Funktion oder Variable in mehreren Übersetzungseinheiten definiert sein darf, ohne dass dies zu einem Fehler wegen der ODR (One Definition Rule) führt. Der Linker wählt am Ende einfach eine der identischen Definitionen aus. Früher diente es auch als Tipp an den Compiler, den Funktionsaufruf direkt durch den Funktionscode zu ersetzen (Inlining), um den Overhead des Aufrufs zu sparen; moderne Compiler entscheiden dies jedoch meist selbst viel besser.

---

## 9.6 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was unterscheidet den Präprozessor vom Compiler?
2. Warum ist die bedingte Kompilierung nützlich, wenn man Software für verschiedene Betriebssysteme (z. B. Windows und macOS) schreibt?
3. Welche Probleme lösen C++20-Module im Vergleich zum klassischen Header-Implementierungs-Modell?
4. Was passiert im Linker-Prozess und wie unterscheidet sich ein Linker-Fehler von einem Compiler-Fehler?
5. Warum gilt `using namespace std;` in Header-Dateien als schlechter Stil?
6. Welchen Unterschied gibt es zwischen `const`, `constexpr`, `consteval` und `constinit`?

### Übungsaufgaben

> [!NOTE]
> Denke daran: Versuche, die Aufgaben selbstständig zu lösen, ohne fertigen Code zu kopieren. Verwende für die Ausgabe den modernen C++23-Standard mit `std::println` aus `import std;`.

#### Aufgabe 1: Der klassische Weg
Erstelle ein kleines Programm nach dem klassischen Modell.
1. Schreibe einen Header `mathematik.hpp`. Deklariere darin eine Funktion, die die Fakultät einer übergebenen Ganzzahl berechnet. Nutze einen Header-Guard.
2. Schreibe eine Implementierungsdatei `mathematik.cpp`, in der du die Berechnungslogik der Fakultät definierst.
3. Schreibe eine `main.cpp`, die deinen Header einbindet und das Ergebnis für eine Zahl auf der Konsole ausgibt.
4. *Zusatz:* Versuche einmal testweise, den Header-Guard wegzulassen und binde den Header zweimal in deiner `main.cpp` ein. Was passiert?

#### Aufgabe 2: Ordnung schaffen mit Namensräumen
Erstelle ein Programm mit zwei eigenen Namensräumen: `geometrie::zweidimensional` und `geometrie::dreidimensional`.
1. Deklariere im zweidimensionalen Namensraum eine Funktion zur Berechnung des Flächeninhalts eines Quadrat.
2. Deklariere im dreidimensionalen Namensraum eine Funktion zur Berechnung des Volumens eines Würfels.
3. Rufe beide Funktionen in der `main`-Funktion auf, indem du einmal den voll qualifizierten Namen nutzt und ein anderes Mal einen Namespace-Alias verwendest.

#### Aufgabe 3: Compilezeit-Magie
Schreibe eine Funktion, die prüft, ob eine Zahl eine Primzahl ist.
1. Verwende das passende Schlüsselwort, um sicherzustellen, dass diese Prüfung *garantiert* zur Compilezeit stattfindet, wenn du sie mit einem konstanten Wert aufrufst.
2. Überprüfe in deiner `main`-Funktion mithilfe einer statischen Zusicherung (`static_assert`), ob deine Funktion für die Zahl `17` den Wert `true` und für die Zahl `4` den Wert `false` liefert.
