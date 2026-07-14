# 15 Templates

In diesem Kapitel betreten wir eines der mächtigsten Werkzeuge von C++: die **Metaprogrammierung** mithilfe von **Templates** (Vorlagen). Stell dir vor, du möchtest eine Funktion schreiben, die zwei Werte vergleicht und den größeren zurückgibt. Ohne Templates müsstest du diese Funktion für `int`, `double`, `float` und jeden anderen Datentyp einzeln schreiben. Templates erlauben es dir, den Code einmal als allgemeine Vorlage zu schreiben und dem Compiler die Arbeit zu überlassen, den passenden Code für jeden Typ zu generieren.

---

## 15.1 Funktionstemplates

### Definieren und Instanziieren
Ein Funktionstemplate ist eine Funktion, bei der ein oder mehrere Typen als Platzhalter definiert sind. Du leitest die Definition mit dem Schlüsselwort `template`, gefolgt von den Parametern in spitzen Klammern `< >`, ein.

Syntax-Muster:
```cpp
template <typename T>
T addieren(T a, T b) {
    // Hier steht deine Logik, bei der T als Typ verwendet wird
}
```

Wenn du diese Funktion aufrufst, kann der Compiler den Typ `T` oft automatisch anhand der übergebenen Argumente bestimmen. Dies nennt man **implizite Instanziierung**:
```cpp
auto ergebnis = addieren(5, 3); // Der Compiler erkennt: T ist int
```

Manchmal möchtest du den Typ jedoch selbst vorgeben, z. B. wenn du zwei unterschiedliche Typen hast, diese aber in einen gemeinsamen Typ zwingen willst. Das machst du über **explizite Template-Argumente**:
```cpp
auto ergebnis = addieren<double>(5, 3.2); // Erzwingt T = double
```

### Mehrere Parameter
Templates sind nicht auf einen Typ beschränkt. Du kannst beliebig viele Platzhalter definieren, getrennt durch Kommata:
```cpp
template <typename T, typename U>
auto kombiniere(T a, U b) {
    // T und U können unterschiedliche Typen sein
}
```

### Überladen und Spezialisieren
Genauso wie normale Funktionen können auch Funktionstemplates überladen werden. Du kannst beispielsweise ein Template für alle Typen bereitstellen und zusätzlich eine spezielle Überladung für Zeigertypen oder bestimmte Klassen anbieten.

Manchmal reicht das einfache Überladen nicht aus und du möchtest das Verhalten für einen ganz bestimmten Typ komplett ändern. Hier kommt die **explizite (vollständige) Spezialisierung** ins Spiel:
```cpp
// Allgemeine Vorlage
template <typename T>
void verarbeite(T wert);

// Spezialisierung für std::string
template <>
void verarbeite<std::string>(std::string wert) {
    // Spezieller Code für Strings
}
```

> [!NOTE]
> Bei der Spezialisierung bleibt die Parameterliste nach `template` leer (`template <>`), und der Zieltyp wird hinter dem Funktionsnamen in spitzen Klammern angegeben.

---

## 15.2 Einschränkungen mit Concepts und Constraints

Vor C++20 war die Arbeit mit Templates manchmal frustrierend: Wenn du einen unpassenden Typ an ein Template übergeben hast (z. B. eine Klasse ohne Vergleichsoperatoren an eine Sortierfunktion), spuckte der Compiler oft seitenlange, kryptische Fehlermeldungen tief aus dem Inneren der Template-Implementierung aus. 

Mit **Concepts** (eingeführt in C++20 und in C++23 weiter verfeinert) kannst du Bedingungen an deine Template-Parameter knüpfen. Du schränkst ein, welche Eigenschaften ein Typ erfüllen muss.

### Was ist ein Concept?
Ein Concept ist eine compilezeit-geprüfte Anforderung an einen oder mehrere Typen. C++ bietet im Header `<concepts>` (den du über `import std;` erhältst) bereits viele vordefinierte Concepts wie `std::integral`, `std::floating_point` oder `std::equality_comparable`.

### Syntax zur Typsicherung
Es gibt mehrere Möglichkeiten, ein Template mit Constraints einzuschränken:

1. **Die `requires`-Klausel**:
```cpp
template <typename T>
requires std::integral<T>
T berechne(T wert);
```

2. **Die Kurzschreibweise** (direkt anstelle von `typename`):
```cpp
template <std::integral T>
T berechne(T wert);
```

### Eigene Concepts definieren
Du kannst auch eigene Concepts erstellen. Dafür nutzt du das Schlüsselwort `concept` zusammen mit einem Konstanten-Ausdruck, der zur Compilezeit ausgewertet werden kann, oder einem `requires`-Block, der syntaktische Anforderungen prüft:
```cpp
template <typename T>
concept Addierbar = requires(T a, T b) {
    { a + b } -> std::same_as<T>;
};
```

> [!TIP]
> Verwende Concepts wann immer möglich! Sie machen deinen Code sicherer, dokumentieren die Anforderungen direkt im Funktionskopf und sorgen für kurze, verständliche Fehlermeldungen, wenn jemand versucht, ein Template falsch zu benutzen.

---

## 15.3 Klassentemplates

Nicht nur Funktionen, auch Klassen (und Structs) können als Vorlagen dienen. Ein klassisches Beispiel hierfür sind Container wie `std::vector` oder `std::array`.

### Definieren und Instanziieren
Die Definition folgt demselben Muster wie bei Funktionen. Der Platzhalter-Typ kann innerhalb der Klasse für Membervariablen, Methodenparameter und Rückgabetypen verwendet werden:
```cpp
template <typename T>
class Box {
private:
    T inhalt;
public:
    void setze(T wert);
    T hole() const;
};
```

Wenn du Methoden eines Klassentemplates außerhalb der Klassendeklaration definierst, musst du die Template-Syntax jedes Mal wiederholen:
```cpp
template <typename T>
void Box<T>::setze(T wert) {
    inhalt = wert;
}
```

Dank **CTAD (Class Template Argument Deduction)** musst du ab C++17 die Typen beim Instanziieren oft nicht mehr explizit hinschreiben, wenn der Compiler sie aus den Konstruktor-Argumenten herleiten kann:
```cpp
// Wenn der Konstruktor Box(T) existiert:
Box meineBox{42}; // Der Compiler leitet Box<int> her!
```

### Mehrere formaler Parameter
Genau wie bei Funktionen kannst du auch bei Klassentemplates mehrere Parameter verwenden. Diese müssen nicht zwingend Typen sein:
```cpp
template <typename T, size_t Groesse>
class Puffer {
    T daten[Groesse];
};
```
Hier siehst du einen **Nicht-Typ-Template-Parameter** (`size_t Groesse`), der keinen Datentyp, sondern einen konkreten Wert zur Compilezeit darstellt.

### Spezialisierung von Klassentemplates
Klassentemplates können wie Funktionstemplates spezialisiert werden. Du kannst eine Klasse komplett neu für einen bestimmten Typ entwerfen oder nur Teile anpassen (partielle Spezialisierung).
```cpp
// Spezialisierung der Box für boolsche Werte
template <>
class Box<bool> {
    // Eigene, speicheroptimierte Implementierung für bool
};
```

---

## 15.4 Ausblick auf C++26: Pack Indexing

Manchmal arbeitet man mit einer variablen Anzahl von Template-Argumenten. Das nennt sich **Variadic Templates** und verwendet sogenannte **Parameter Packs** (gekennzeichnet durch `...`).

```cpp
template <typename... Args>
void verarbeiteAlles(Args... args);
```

Bis einschließlich **C++23** ist es noch recht umständlich, auf ein einzelnes Element oder einen einzelnen Typ innerhalb eines solchen Packs zuzugreifen. Man musste oft auf rekursive Template-Aufrufe, Hilfsstrukturen wie `std::tuple` oder komplexe Hilfsfunktionen zurückgreifen.

Als **Ausblick auf das kommende C++26** wird dafür das **Pack Indexing** eingeführt. Damit kannst du direkt per Index auf ein Element eines Parameter Packs zugreifen.

### Syntax von Pack Indexing (Ausblick auf C++26)
Die Syntax verwendet eckige Klammern direkt nach dem Pack-Namen, um den Index anzugeben.

1. **Typ-Indexierung**: Zugriff auf einen Typ an einer bestimmten Stelle im Typ-Pack.
```cpp
template <typename... Ts>
struct Container {
    // Holt den Typ an Index 0 aus dem Parameter Pack
    using ErsterTyp = Ts...[0]; 
};
```

2. **Wert-Indexierung**: Zugriff auf den Wert an einer bestimmten Stelle im Werte-Pack.
```cpp
template <typename... Args>
void ausgabe(Args... args) {
    // Holt den Wert an Index 1 aus dem Argumenten-Pack
    auto zweiterWert = args...[1];
}
```

> [!IMPORTANT]
> Da Pack Indexing erst mit C++26 eingeführt wird, ist es in unserem Standard C++23 noch nicht verfügbar. Der Index beim Pack Indexing muss ein konstanter Ausdruck (`constexpr`) sein und innerhalb der Grenzen des Packs liegen (0 bis `sizeof...(Pack) - 1`).

---

## 15.5 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen der impliziten und der expliziten Instanziierung eines Funktionstemplates?
2. Warum sollte man bevorzugt Concepts statt reiner Templates verwenden, wenn man Einschränkungen für Typen hat?
3. Was versteht man unter einem "Nicht-Typ-Template-Parameter"? Nenne ein Beispiel aus der Standardbibliothek.
4. Wie unterscheidet sich das Verhalten von `template <>` bei einer vollständigen Spezialisierung von einer partiellen Spezialisierung?
5. Welches Problem löst das zukünftige C++26-Feature "Pack Indexing" im Vergleich zur Umsetzung in C++23?

### Übungsaufgaben

> [!WARNING]
> Denke daran: Versuche, die Aufgaben selbstständig zu lösen, ohne fertigen Code zu kopieren. Nutze die Konzepte und Analogien aus diesem Kapitel!

#### Aufgabe 1: Die universelle Minimum-Funktion
Schreibe ein Funktionstemplate, das das Minimum von zwei Werten ermittelt.
*   **Anforderung**: Verwende ein Concept, um sicherzustellen, dass die beiden übergebenen Werte miteinander verglichen werden können (z.B. mittels `<`).
*   **Hinweis**: Schau dir das Concept `std::totally_ordered` in der Standardbibliothek an oder überlege dir, wie du ein eigenes Concept dafür schreiben kannst.

#### Aufgabe 2: Ein typsicherer Werte-Speicher
Entwirf ein Klassentemplate für einen einfachen Behälter, der genau ein Element speichert.
*   **Anforderung**: Füge eine Methode hinzu, die den gespeicherten Wert zurückgibt. Spezialisiere diese Klasse für den Typ `std::string` so, dass bei der Rückgabe des Strings automatisch ein bestimmtes Präfix (z. B. `"String-Inhalt: "`) vorangestellt wird.

#### Aufgabe 3: Der Erstlings-Selektor (C++23 & C++26)
Schreibe ein variadisches Funktionstemplate, das eine beliebige Anzahl von Argumenten entgegennimmt.
*   **Anforderung**: Löse die Aufgabe für **C++23**, indem du den Wert des allerersten Arguments (Index 0) ermittelst und ausgibst. (Tipp: Du kannst das erste Argument in der Parameterliste separat deklarieren, gefolgt von einem Parameter-Pack für den Rest).
*   **Ausblick**: Überlege oder beschreibe kurz, wie sich diese Aufgabe mit dem zukünftigen C++26-Feature **Pack Indexing** lösen ließe, ohne die Parameterliste aufzuteilen.
*   **Hinweis**: Verwende `std::println`, um das Ergebnis anzuzeigen. Achte darauf, dass die Funktion nur aufgerufen werden darf, wenn mindestens ein Argument übergeben wurde.
