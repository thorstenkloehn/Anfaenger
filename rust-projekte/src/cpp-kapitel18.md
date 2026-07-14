# 18 Die Standardbibliothek und weitere Sprachelemente

Willkommen in einem der mächtigsten Kapitel dieses Buches! Bisher hast du die grundlegenden Bausteine von C++ kennengelernt: Variablen, Schleifen, Funktionen und Klassen. Doch C++ wäre nicht die Sprache, die sie heute ist, wenn sie nicht eine gigantische Werkzeugkiste mitliefern würde: die **C++ Standard Library** (Standardbibliothek).

In diesem Kapitel tauchen wir tief in diese Werkzeugkiste ein. Wir lernen, wie wir Daten elegant verwalten, wie wir Algorithmen auf ihnen ausführen, wie wir modernen Speicher sichern und wie wir die Zeit messen. Zudem werfen wir einen Blick auf moderne Sprachfeatures, die C++23 so ausdrucksstark und sicher machen.

> [!IMPORTANT]
> C++ entwickelt sich stetig weiter. In diesem Kapitel nutzen wir den modernen Standard **C++23**. Das bedeutet unter anderem, dass wir die modularisierte Standardbibliothek (`import std;`) verwenden und moderne Formatierungs- und Ausgabemethoden wie `std::println` nutzen.

---

## 18.1 Container der Standardbibliothek

Wenn du Daten im Speicher ablegen möchtest, reicht ein einfaches Array oft nicht aus. Vielleicht wächst deine Datenmenge dynamisch, vielleicht möchtest du Elemente mittendrin einfügen oder suchst nach einer schnellen Möglichkeit, Werte über einen Schlüssel (wie in einem Wörterbuch) wiederzufinden. Hier kommen **Container** ins Spiel.

Die Standardbibliothek unterscheidet im Wesentlichen zwei Arten von Containern: **Sequence Container** (Sequenzielle Container) und **Associative Container** (Assoziative Container).

### Sequence Container
Diese Container speichern Elemente in einer streng linearen Reihenfolge. Du kannst dir das wie eine Perlenkette oder eine Warteschlange vorstellen.

*   **`std::vector`**: Der unangefochtene Standard-Container in C++. Er verhält sich wie ein dynamisches Array. Der Speicher liegt hintereinander (kontinuierlich) im RAM. Das macht den Zugriff auf ein bestimmtes Element über einen Index blitzschnell. Das Hinzufügen am Ende ist meistens sehr effizient, während das Einfügen in der Mitte teuer ist, da alle nachfolgenden Elemente verschoben werden müssen.
*   **`std::list`**: Eine doppelt verkettete Liste. Jedes Element kennt seinen Nachfolger und seinen Vorgänger. Der Vorteil: Du kannst überall in der Liste extrem schnell Elemente einfügen oder löschen, ohne andere Elemente verschieben zu müssen. Der Nachteil: Du kannst nicht direkt auf das 5. Element springen, sondern musst dich vom Startelement aus durchhangeln.
*   **`std::forward_list`**: Eine einfach verkettete Liste. Jedes Element kennt nur seinen Nachfolger. Sie spart im Vergleich zur `std::list` Speicherplatz, da sie nur einen Zeiger pro Element benötigt, ist aber in ihrer Bewegungsrichtung eingeschränkt.

### Assoziative Container
Hier steht nicht die Reihenfolge der Speicherung im Vordergrund, sondern das schnelle Wiederfinden von Elementen anhand eines **Schlüssels** (Key).

*   **`std::map`**: Ein sortiertes Wörterbuch. Jedes Element besteht aus einem Schlüssel-Wert-Paar (Key-Value-Pair). Die Elemente werden automatisch nach dem Schlüssel sortiert (meistens als binärer Suchbaum implementiert). Die Suche hat eine logarithmische Laufzeit.
*   **`std::set`**: Eine Menge einzigartiger Elemente. Es speichert nur Schlüssel (keine doppelten Werte) und sortiert diese ebenfalls automatisch.
*   **`std::unordered_map`**: Ein ungeordnetes Wörterbuch. Es nutzt eine Hash-Tabelle. Das bedeutet, dass der Zugriff im Durchschnitt extrem schnell ist (konstante Laufzeit), die Elemente aber in keiner bestimmten Reihenfolge vorliegen.

> [!TIP]
> Im Zweifel gilt in C++ fast immer die Faustregel: Benutze `std::vector`. Durch die kontinuierliche Speicheranordnung nutzt er die Cache-Mechanismen moderner CPUs optimal aus und schlägt in der Praxis oft Container, die theoretisch für bestimmte Operationen besser geeignet wären.

---

## 18.2 Iteratoren und Ranges

Wie greift man einheitlich auf die Elemente eines Containers zu, ohne wissen zu müssen, ob es sich um einen Vektor, eine verkettete Liste oder einen Suchbaum handelt? Die Antwort lautet: **Iteratoren**.

### Das Iterator-Prinzip
Ein Iterator verhält sich im Grunde wie ein Zeiger. Er zeigt auf ein bestimmtes Element in einem Container und kann "weitergeschoben" werden (meist mit dem Inkrement-Operator `++`). Jeder Standard-Container stellt Methoden bereit, um den Anfang (`begin()`) und das Ende (`end()`) zu markieren.

```cpp
// Syntax-Skizze für das traditionelle Iterieren
auto it = container.begin();
while (it != container.end()) {
    // Zugriff auf das Element via *it
    ++it;
}
```

> [!WARNING]
> Der Iterator `end()` zeigt *nicht* auf das letzte Element, sondern auf die Position *dahinter* (past-the-end). Ein Dereferenzieren von `end()` führt zu undefiniertem Verhalten!

### Ranges und Views (C++20 bis C++23)
Mit C++20 wurden **Ranges** eingeführt, die in C++23 weiter ausgebaut wurden. Eine Range ist vereinfacht gesagt alles, worüber man iterieren kann (z. B. ein Container). 

Anstatt mühsam mit `begin()` und `end()` zu hantieren, erlauben Ranges es uns, Operationen direkt auf dem Container auszuführen. Zudem bieten **Views** (Ansichten) die Möglichkeit, Datenströme faul (lazy) zu transformieren oder zu filtern. Sie kopieren die Daten nicht, sondern beschreiben nur eine Pipeline.

Das Ganze wird mit dem Pipe-Operator `|` verknüpft, ähnlich wie in der Unix-Kommandozeile:

```cpp
// Prinzip der Pipeline-Syntax mit std::views:
auto ergebnis = mein_container 
                | std::views::filter(bedingung) 
                | std::views::transform(umwandlung);
```

Unter C++23 kannst du dank verbesserter Ranges-Unterstützung noch flüssiger komplexe Transformationen schreiben, ohne jemals temporäre Kopien im Speicher anlegen zu müssen.

---

## 18.3 Algorithmen der Standardbibliothek

C++ folgt der Philosophie: "Schreibe keine eigenen Schleifen, wenn es bereits einen Algorithmus dafür gibt." Die Standardbibliothek bietet im Header `<algorithm>` (bzw. im Modul `std`) über hundert hochinnovative, optimierte Algorithmen.

Seit C++20 nutzen wir bevorzugt die Varianten aus dem Namensraum `std::ranges`, da sie sicherer und komfortabler zu bedienen sind.

### Wichtige Standardalgorithmen
*   **`std::ranges::sort`**: Sortiert die Elemente einer Range aufsteigend.
*   **`std::ranges::find`**: Sucht nach einem bestimmten Wert und liefert einen Iterator auf das erste gefundene Element zurück.
*   **`std::ranges::transform`**: Wendet eine Funktion auf jedes Element an und schreibt das Ergebnis in ein Ziel.
*   **`std::ranges::any_of` / `all_of` / `none_of`**: Prüft, ob Bedingungen für (einige/alle/keine) Elemente zutreffen.

```cpp
// Syntax-Template für einen Sortiervorgang
std::ranges::sort(container);
```

---

## 18.4 Fortgeschrittene Funktionskonzepte

Um die Algorithmen der Standardbibliothek effektiv nutzen zu können, müssen wir ihnen oft mitteilen, *wie* sie filtern, sortieren oder transformieren sollen. C++ bietet hierfür extrem flexible Konzepte.

### decltype
Mit dem Schlüsselwort `decltype` kannst du den Datentyp eines Ausdrucks zur Kompilierzeit abfragen, ohne ihn explizit ausschreiben zu müssen. Das ist besonders in der generischen Programmierung (Templates) nützlich.

### Lambda-Funktionen
Lambdas sind anonyme Funktionen, die du direkt "vor Ort" im Code definieren kannst. Sie eignen sich hervorragend als Argumente für Algorithmen.

Eine Lambda-Funktion ist wie folgt aufgebaut:
```cpp
[capture_clause](parameters) -> return_type {
    // Funktionsrumpf
}
```

*   **Capture-Clause (`[...]`)**: Bestimmt, welche Variablen aus der umgebenden Funktion im Lambda verfügbar sind (z. B. per Kopie `[=]` oder per Referenz `[&]`).
*   **Generische Lambdas**: Seit C++14 (und verfeinert in neueren Standards) kannst du `auto` in den Parametern verwenden, um ein "Mini-Template" zu erstellen.
*   **Ausblick auf C++26 (Platzhalter `_`)**: Zukünftig (ab C++26) kannst du den unbenannten Platzhalter `_` nutzen, um ungenutzte Parameter im Lambda prägnant zu ignorieren.

### Funktoren (Callable Objects)
Ein Funktor ist eine Klasse, die den Funktionsaufruf-Operator `operator()` überlädt. Dadurch kann eine Instanz dieser Klasse wie eine normale Funktion aufgerufen werden, besitzt aber den Vorteil, dass sie einen Zustand (Variablen) speichern kann.

### Nachlaufende Rückgabetypen (Trailing Return Types)
Manchmal hängt der Rückgabetyp einer Funktion von ihren Parametern ab. Mit der nachlaufenden Deklaration kannst du den Rückgabetyp *hinter* die Parameterliste schreiben:

```cpp
auto addiere(auto a, auto b) -> decltype(a + b);
```

---

## 18.5 Smart Pointer und Speicherverwaltung

In C++ verwalten wir Ressourcen nach dem Prinzip **RAII** (Resource Acquisition Is Initialization). Das bedeutet: Wenn ein Objekt zerstört wird, soll es automatisch seinen Speicher freigeben. Die Verwendung von rohen Zeigern (`new` und `delete`) ist im modernen C++ verpönt, da sie extrem fehleranfällig is und zu Speicherlecks führt.

Stattdessen nutzen wir intelligente Zeiger (**Smart Pointer**):

### 1. `std::unique_ptr`
Ein `std::unique_ptr` besitzt eine Ressource exklusiv. Es kann keine Kopie von ihm existieren. Wenn der `unique_ptr` den Gültigkeitsbereich (Scope) verlässt, wird der zugrundeliegende Speicher automatisch freigegeben.

### 2. `std::shared_ptr`
Ein `std::shared_ptr` teilt sich den Besitz einer Ressource mit anderen `shared_ptr`-Instanzen. Intern wird ein Referenzzähler (Reference Counter) verwaltet. Erst wenn der letzte `shared_ptr`, der auf die Ressource zeigt, zerstört wird, wird auch der Speicher freigegeben.

### 3. `std::weak_ptr`
Wenn sich zwei Objekte gegenseitig mit `shared_ptr` referenzieren, entsteht ein Kreisbezug. Der Referenzzähler wird niemals null, und es kommt zum Speicherleck. Ein `std::weak_ptr` bietet eine "schwache", nicht-besitzende Referenz auf ein von `std::shared_ptr` verwaltetes Objekt, ohne den Referenzzähler zu erhöhen.

### Move-Semantik und `std::move`
Da ein `std::unique_ptr` nicht kopiert werden darf, müssen wir in der Lage sein, den Besitz an eine andere Funktion oder einen anderen Scope zu übertragen. Das geschieht über die **Move-Semantik** mit der Funktion `std::move`. Dabei wird die Ressource nicht kopiert, sondern die internen Zeiger werden einfach "umgehängt" (das alte Objekt wird in einen leeren, aber gültigen Zustand versetzt).

```cpp
// Syntax-Prinzip zum Verschieben von Ressourcen
std::unique_ptr<Typ> ptr2 = std::move(ptr1);
```

---

## 18.6 Textansichten und Formatierung

Die Arbeit mit Texten wurde in den letzten C++-Standards revolutioniert. Vergiss die unhandlichen C-Strings oder die oft langsamen Kopien von `std::string`.

### `std::string_view`
Ein `std::string_view` ist eine extrem leichtgewichtige, nicht-besitzende Ansicht auf ein Stück Text (eine Kombination aus Zeiger und Länge). Sie kopiert keine Zeichen. Wenn du eine Funktion schreibst, die einen String nur lesen soll, verwende standardmäßig `std::string_view` als Parametertyp.

> [!WARNING]
> Da `std::string_view` den Text nicht besitzt, musst du sicherstellen, dass der zugrundeliegende String (Besitzer) länger lebt als die Ansicht selbst. Andernfalls hast du eine "dangling reference" (einen hängenden Verweis).

### `std::format` und `std::print` (C++20 bis C++23)
Mit `std::format` (C++20) und den direkten Ausgabe-Funktionen `std::print` and `std::println` (C++23) wurde die String-Formatierung modernisiert. Sie vereint die Typsicherheit von `std::cout` mit der Übersichtlichkeit und Performance von `printf`.

```cpp
// Syntaxbeispiel für die moderne Ausgabe
std::println("Hallo {}, du bist {} Jahre alt.", name, alter);
```

### Eigene Typen formatierbar machen (`std::formatter`)
Du kannst das Verhalten von `std::format` für deine eigenen Klassen anpassen, indem du eine Spezialisierung des Templates `std::formatter` schreibst. Dadurch lassen sich deine eigenen Datenstrukturen nahtlos in Formatierungs-Strings einbetten.

---

## 18.7 Die Zeitbibliothek (`std::chrono`)

Zeitberechnungen sind fehleranfällig. Wer hat nicht schon einmal Sekunden und Millisekunden verwechselt? Die Bibliothek `std::chrono` macht Zeitberechnungen durch ein starkes Typensystem absolut sicher.

### Die Kernkonzepte
*   **Duration (Dauer)**: Repräsentiert eine Zeitspanne (z. B. 5 Sekunden, 20 Millisekunden). Typen wie `std::chrono::seconds` oder `std::chrono::milliseconds` verhindern, dass du aus Versehen Äpfel mit Birnen addierst.
*   **Time Point (Zeitpunkt)**: Repräsentiert einen konkreten Zeitpunkt relativ zu einer Epoche (z. B. "Jetzt" oder "1. Januar 1970").
*   **Clocks (Uhren)**: Liefern den aktuellen Zeitpunkt.
    *   `std::chrono::system_clock`: Die Systemuhr des Betriebssystems (kann vom Benutzer verstellt werden).
    *   `std::chrono::steady_clock`: Eine monotone Uhr, die garantiert niemals rückwärts läuft (ideal für Performance-Messungen).

```cpp
// Typisches Muster für eine Zeitmessung
auto start = std::chrono::steady_clock::now();
// ... Code ausführen ...
auto ende = std::chrono::steady_clock::now();
auto dauer = ende - start;
```

---

## 18.8 Ausblick auf Multithreading

Moderne Computer besitzen viele CPU-Kerne. Um diese optimal auszulasten, müssen wir Aufgaben parallel (zeitgleich) berechnen lassen. C++ bietet direkt in der Standardbibliothek Unterstützung für Nebenläufigkeit (Concurrency).

### `std::thread` vs. `std::jthread` (C++20)
Ein `std::thread` repräsentiert einen Ausführungsthread des Betriebssystems. Der modernere `std::jthread` (joining thread) verbessert dies entscheidend: Er wartet beim Verlassen seines Gültigkeitsbereichs automatisch auf das Ende der Thread-Ausführung (RAII-Prinzip) und unterstützt das kooperative Abbrechen von Threads via Interrupt-Tokens.

### Asynchrone Tasks: `std::async` und `std::future`
Manchmal möchten wir einfach eine Berechnung im Hintergrund starten und das Ergebnis zu einem späteren Zeitpunkt abholen.
*   `std::async` startet die Aufgabe (entweder in einem neuen Thread oder verzögert).
*   `std::future` ist das "Versprechen", mit dem wir später auf das Ergebnis zugreifen können (die Methode `.get()` wartet, bis die Berechnung fertig ist).

```cpp
// Syntax-Skizze für asynchrone Berechnungen
std::future<int> zukunft = std::async(berechne_etwas);
// ... im aktuellen Thread weiterarbeiten ...
int ergebnis = zukunft.get(); // Blockiert, bis das Ergebnis da ist
```

---

## 18.9 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Welcher Container ist im kontinuierlichen Speicher aufgebaut und warum ist das für die CPU vorteilhaft?
2. Was ist der Unterschied zwischen `std::map` und `std::unordered_map` bezüglich Sortierung und Performance?
3. Warum darf man das Ergebnis von `container.end()` nicht dereferenzieren?
4. Was ist eine "faule Auswertung" (Lazy Evaluation) bei C++ Ranges/Views?
5. Warum sollte man bevorzugt `std::unique_ptr` statt roher Zeiger verwenden?
6. Was passiert mit den Daten des Quell-Objekts, wenn wir `std::move` darauf anwenden?
7. Welchen Vorteil bietet `std::string_view` gegenüber `const std::string&`?
8. Warum ist `std::jthread` sicherer als `std::thread`?

### Übungsaufgaben

#### Aufgabe 1: Der Highscore-Verwalter
Entwerfe eine Konsolenanwendung zur Verwaltung einer Highscore-Liste für ein Spiel.
*   Verwende einen passenden Container, um Spielernamen und deren erreichte Punkte zu speichern. Die Liste soll automatisch nach der höchsten Punktzahl sortiert sein.
*   Nutze `std::print` oder `std::println`, um die Highscore-Tabelle formatiert auszugeben.
*   *Hinweis:* Überlege, ob sich `std::map` oder ein sortierter `std::vector` mit Paaren besser eignet.

#### Aufgabe 2: Der Wort-Filter mit Ranges
Schreibe ein Programm, das eine Liste von Wörtern (z. B. Namen) filtert.
*   Es sollen nur Wörter übrig bleiben, die mit einem bestimmten Buchstaben beginnen.
*   Verwende dafür die modernen C++ Ranges und Views (insbesondere den Pipe-Operator `|` und `std::views::filter`).
*   Gib die gefilterten Wörter auf der Konsole aus, ohne eine Kopie der Liste im Speicher anzulegen.

#### Aufgabe 3: Zeitmessung-Decorator
Erstelle ein kleines Testprogramm, das die Ausführungszeit einer mathematischen Berechnung misst.
*   Nutze `std::chrono::steady_clock`, um die Zeit vor und nach der Berechnung zu erfassen.
*   Gib die verstrichene Zeit präzise in Mikrosekunden aus.
*   Verpacke die Berechnung optional in ein Lambda, um sie flexibel austauschbar zu machen.
