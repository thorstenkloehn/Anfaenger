# 16 Ausnahmebehandlung (Fehlerbehandlung)

Fehler sind in der Softwareentwicklung unvermeidlich. Ob ein Benutzer eine ungültige Eingabe tätigt, eine benötigte Datei gelöscht wurde oder die Netzwerkverbindung mitten in einer Übertragung abbricht – dein Programm muss auf solche Situationen robust reagieren können, ohne unkontrolliert abstürzen.

In diesem Kapitel lernst du, wie C++ mit unerwarteten Situationen umgeht. Wir betrachten die klassische Ausnahmebehandlung (Exceptions), lernen das fundamentale Prinzip von RAII im Fehlerfall kennen und werfen einen Blick auf moderne Alternativen wie `std::expected`, das in C++23 eingeführt wurde.

---

## 16.1 Grundlagen der Fehlerbehandlung in C++ (try, catch, throw)

Wenn in einer Funktion ein Fehler auftritt, den sie selbst nicht sinnvoll lösen kann, kann sie diesen Fehler signalisieren. In C++ gesieht dies traditionell über das **Auslösen einer Ausnahme** (engl. *throwing an exception*).

Das Zusammenspiel der Ausnahmebehandlung basiert auf drei Säulen:

*   **`throw`**: Mit dieser Anweisung wird eine Ausnahme signalisiert und ein Ausnahmeobjekt "geworfen". Der normale Kontrollfluss wird sofort unterbrochen.
*   **`try`**: Du umschließt einen Codeblock, in dem Fehler auftreten könnten, mit einem `try`-Block. Dies signalisiert dem Programm: "Beobachte diesen Abschnitt auf Ausnahmen".
*   **`catch`**: Direkt nach dem `try`-Block folgen einer oder mehrere `catch`-Blöcke (auch Exception-Handler genannt). Sie fangen die geworfene Ausnahme ab, falls deren Typ mit dem im `catch`-Block angegebenen Typ übereinstimmt.

### Analogie aus dem Alltag

Stell dir vor, du beauftragst einen Postboten (eine Funktion), ein Paket zuzustellen. 
*   **Normaler Pfad**: Der Postbote klingelt, übergibt das Paket und du quittierst den Empfang.
*   **Ausnahmefall**: Der Empfänger ist unbekannt verzogen. Der Postbote kann die Aufgabe nicht abschließen. Er wirft das Paket nicht einfach in den Müll (Programmabsturz), sondern bringt es mit einem Benachrichtigungszettel (Ausnahmeobjekt) zurück zur Postfiliale (Aufrufer), wo der Fall bearbeitet (abgefangen) wird.

### Syntaktische Struktur (Prinzipskizze)

Um das Prinzip zu verdenlichen, betrachten wir die grundlegende Struktur. Beachte, dass wir im modernen C++ die Standardbibliothek über Module mit `import std;` einbinden:

```cpp
import std;

// Struktur eines Try-Catch-Blocks
try {
    // Hier steht Code, der eine Ausnahme auslösen könnte
    if (/* Bedingung für einen Fehler */) {
        throw FehlerTyp{/* Details zum Fehler */}; 
    }
} 
catch (const FehlerTyp& ex) {
    // Hier reagierst du auf den spezifischen Fehler
}
```

> [!NOTE]
> Wenn eine Ausnahme geworfen wird, sucht die C++-Laufzeitumgebung im aktuellen `try`-Block nach einem passenden `catch`-Block. Wird dort keiner gefunden, wird die aktuelle Funktion verlassen und die Suche in der aufrufenden Funktion fortgesetzt. Dieser Prozess setzt sich fort, bis ein passender Handler gefunden wird oder das Programm mit einem Fehler abbricht.

---

## 16.2 Ausnahme auslösen, auffangen und behandeln

Ausnahmen können beliebige Typen haben – du kannst theoretisch ein `int`, eine Zeichenkette oder ein benutzerdefiniertes Objekt werfen. In der Praxis wirft man jedoch fast ausschließlich Objekte, die von der Standardklasse `std::exception` abgeleitet sind.

### Ausnahmen der Standardbibliothek auffangen

Da alle Standardausnahmen von `std::exception` erben, kannst du sie polymorph abfangen. Es ist Best Practice, Ausnahmen als **Referenz auf ein konstantes Objekt** abzufangen (`const std::exception&`). 

Es designt zwei entscheidende Vorteile:
1.  **Vermeidung von Kopien**: Das Ausnahmeobjekt muss nicht kopiert werden.
2.  **Vermeidung von Object Slicing**: Wenn du eine abgeleitete Ausnahme (z. B. `std::out_of_range`) als Kopie der Basisklasse (`std::exception`) fängst, gehen die spezifischen Informationen der abgeleiteten Klasse verloren. Durch die Referenz bleibt die Identität des tatsächlichen Typs erhalten.

Über die virtuelle Methode `.what()` kannst du eine Fehlermeldung als C-Style-String (`const char*`) abfragen.

### Der Universal-Catch-Block: `catch (...)`

Manchmal möchtest du absolut sicherstellen, dass keine Ausnahme dein Programm ungeregelt beendet, selbst wenn du den genauen Typ der Ausnahme nicht kennst. Hierfür gibt es den "Catch-All"-Handler:

```cpp
catch (...) {
    // Fängt JEDE Ausnahme ab, unabhängig von ihrem Typ
}
```

> [!WARNING]
> Verwende `catch (...)` mit Bedacht! Da du in diesem Block keinen Zugriff auf das Ausnahmeobjekt hast, weißt du nicht, was genau schiefgelaufen ist. Er eignet sich vor allem an den äußersten Grenzen deines Programms (z. B. in der `main`-Funktion oder an Thread-Grenzen), um letzte Aufräumarbeiten durchzuführen oder einen Absturzbericht zu schreiben.

### Ausnahmen weiterwerfen (Rethrowing)

Manchmal kann eine Funktion eine Ausnahme zwar registrieren (z. B. um einen Logeintrag zu schreiben), kann oder will den Fehler aber nicht endgültig beheben. In diesem Fall kann die Ausnahme an den übergeordneten Aufrufer weitergegeben werden.

Dies geschieht durch die Anweisung `throw;` ohne Angabe eines Objekts innerhalb des `catch`-Blocks:

```cpp
catch (const EinigeException& ex) {
    // 1. Protokolliere den Fehler lokal
    // 2. Wirf die exakt gleiche Ausnahme weiter
    throw; 
}
```

> [!IMPORTANT]
> Nutze für das Weiterwerfen immer das nackte `throw;`. Wenn du stattdessen `throw ex;` schreiben würdest, würde das Ausnahmeobjekt kopiert und eventuell auf den Typ der Catch-Variable zurechtgeschnitten (Slicing), wodurch wertvolle Detailinformationen verloren gehen können.

---

## 16.3 Das Schlüsselwort `noexcept` und Stack-Abwicklung

Um die Ausnahmebehandlung im Detail zu verstehen, müssen wir einen Blick hinter die Kulissen werfen.

### Stack-Abwicklung (Stack Unwinding)

Wenn eine Ausnahme geworfen wird, verlässt das Programm den aktuellen Ausführungspfad. Dabei wird der Aufrufstapel (Stack) schrittweise rückwärts abgebaut (abgewickelt), bis ein passender `catch`-Block gefunden wird.

Das Besondere an C++: **Für alle lokalen Objekte, die auf dem Stack liegen und deren Gültigkeitsbereich durch das Verlassen der Funktionen beendet wird, wird automatisch der Destruktor aufgerufen.**

### Das RAII-Prinzip bei Ausnahmen

Dieses automatische Zerstören von lokalen Objekten beim Stack Unwinding ist die Basis für das wichtigste Entwurfsmuster in C++: **RAII** (Resource Acquisition Is Initialization).

Verwaltest du Ressourcen (Speicher, Dateien, Mutexe) über RAII-Objekte (wie `std::unique_ptr`, `std::shared_ptr`, `std::fstream` oder `std::lock_guard`), garantierst du, dass diese Ressourcen auch im Fehlerfall freigegeben werden. Manuelles Aufräumen (z. B. ein `delete` oder `file.close()`) nach einem kritischen Schritt wird beim Auslösen einer Ausnahme übersprungen, was zu Ressourcenlecks führt. RAII-Objekte räumen sich im Destruktor selbst auf, sobald der Stack abgebaut wird.

### Das Schlüsselwort `noexcept`

Mit dem Bezeichner `noexcept` kannst du eine Funktion dekorieren, um dem Compiler (und anderen Entwicklern) zu garantieren, dass diese Funktion niemals eine Ausnahme nach außen dringen lässt.

```cpp
void meineSichereFunktion() noexcept;
```

Warum ist das wichtig?
1.  **Optimierung**: Der Compiler muss für `noexcept`-Funktionen keinen Code für die Stack-Abwicklung generieren, was den Code kleiner und schneller machen kann.
2.  **Sicherheit in Containern**: Viele Standardbibliotheks-Container (wie `std::vector`) verschieben Elemente bei einer Größenänderung nur dann effizient per Move-Semantik, wenn der Move-Konstruktor des Typs als `noexcept` deklariert ist. Andernfalls fallen sie auf langsame Kopien zurück, um die starke Ausnahmegarantie zu wahren.

> [!CAUTION]
> Wenn eine als `noexcept` deklarierte Funktion dennoch eine Ausnahme wirft, die nicht innerhalb der Funktion abgefangen wird, bricht das Programm sofort durch den Aufruf von `std::terminate()` ab. Es findet in diesem Fall keine vollständige Stack-Abwicklung mehr statt!

> [!TIP]
> Destruktoren sind in C++ standardmäßig implizit `noexcept`. Du solltest niemals zulassen, dass eine Ausnahme aus einem Destruktor entweicht. Wenn während einer laufenden Stack-Abwicklung (wegen einer ersten Ausnahme) ein Destruktor eine zweite Ausnahme wirft, stürzt das Programm sofort abstürzt.

---

## 16.4 Standardausnahmen

C++ stellt in der Header-Datei `<stdexcept>` (bzw. im Modul `std`) eine Hierarchie von vordefinierten Ausnahme-Klassen zur Verfügung. Alle erben von `std::exception`. Es wird zwischen zwei Hauptkategorien unterschieden:

### 1. Logische Fehler (`std::logic_error`)
Diese Fehler resultieren aus Fehlern in der Programmlogik und könnten theoretisch durch eine bessere Überprüfung des Codes vermieden werden.
*   **`std::invalid_argument`**: Wird geworfen, wenn einer Funktion ein ungültiges Argument übergeben wird (z. B. ein mathematischer Wert außerhalb des Definitionsbereichs).
*   **`std::out_of_range`**: Wird geworfen, wenn versucht wird, auf ein Element außerhalb der erlaubten Grenzen zuzugreifen (z. B. bei der Methode `.at()` von `std::vector` oder `std::string`).
*   **`std::length_error`**: Tritt auf, wenn versucht wird, ein Objekt über seine maximale Kapazitätsgrenze hinaus zu vergrößern.

### 2. Laufzeitfehler (`std::runtime_error`)
Diese Fehler hängen von externen Faktoren ab, die sich der direkten Kontrolle des Programms entziehen und erst zur Laufzeit auftreten.
*   **`std::range_error`**: Für mathematische Berechnungen, deren Ergebnis nicht im darstellbaren Bereich liegt.
*   **`std::overflow_error` / `std::underflow_error`**: Bei arithmetischem Über- oder Unterlauf.
*   **`std::system_error`**: Wird von Betriebssystemfunktionen ausgelöst (z. B. Dateisystem- oder Netzwerfehler).

---

## 16.5 Moderne Alternativen zur Ausnahmebehandlung: `std::expected`

Ausnahmen sind ein mächtiges Werkzeug, aber sie haben ihren Preis:
*   Sie unterbrechen den Kontrollfluss drastisch.
*   Die Stack-Abwicklung ist zur Laufzeit teuer (Performance-Overhead im Fehlerfall).
*   Sie sind für *außergewöhnliche* Fehler gedacht (z. B. Speicher voll), nicht für alltägliche, erwartbare Fehlschläge (z. B. eine ungültige Zahleneingabe im Formular).

Seit C++23 gibt es mit **`std::expected`** eine moderne, elegante Alternative für den Umgang mit vorhersehbaren Fehlern.

### Was ist `std::expected`?

`std::expected<T, E>` ist ein Container-Typ, der entweder:
*   den erwarteten Wert vom Typ `T` enthält (Erfolgsfall) **oder**
*   einen Fehlerwert vom Typ `E` enthält (Fehlerfall).

Damit wird der Fehler direkt über den Rückgabetyp der Funktion transportiert. Der Compiler zwingt dich nicht zum Fangen, aber das Ignorieren wird deutlich erschwert.

### Syntax-Skelett

Eine Funktion, die `std::expected` nutzt, sieht konzeptionell so aus:

```cpp
import std;

// Rückgabetyp ist entweder ein double (Erfolg) oder ein std::string (Fehler)
std::expected<double, std::string> dividiere(double zaehler, double nenner) {
    if (nenner == 0.0) {
        // Wir geben den Fehler explizit zurück
        return std::unexpected{"Division durch Null!"s};
    }
    // Wir geben den regulären Wert zurück
    return zaehler / nenner;
}
```

### Abfrage des Ergebnisses

Um mit dem Rückgabewert zu arbeiten, bietet `std::expected` verschiedene Methoden:
*   **`has_value()`**: Liefert `true`, wenn die Operation erfolgreich war. (Alternativ kann das Objekt im `if`-Kontext direkt als `bool` ausgewertet werden).
*   **`value()`**: Liefert den Wert, wirft jedoch eine Ausnahme (`std::bad_expected_access`), falls ein Fehler vorliegt.
*   **`operator*` und `operator->`**: Ermöglichen den direkten Zugriff auf den Wert ohne Prüfung (Achtung: Undefined Behavior, wenn kein Wert vorhanden ist!).
*   **`error()`**: Liefert den Fehlerwert.
*   **`value_or(Standardwert)`**: Liefert den Wert oder einen Standardwert, falls ein Fehler vorliegt.

### Monadische Operationen (C++23)

Ein großer Vorteil von `std::expected` ist die Möglichkeit, Operationen elegant zu verketten, ohne verschachtelte `if`-Abfragen schreiben zu müssen. Dies geschieht über monadische Funktionen:

*   **`.and_then()`**: Führt die nächste Funktion aus, wenn der vorherige Schritt erfolgreich war.
*   **`.or_else()`**: Ermöglicht eine Fehlerbehandlung oder einen Fallback, wenn ein Fehler aufgetreten ist.
*   **`.transform()`**: Transformiert den Erfolgswert in einen anderen Wert, falls vorhanden.

Durch diese Methoden kannst du fehleranfällige Pipelines schreiben, die sich wie ein fließender Text lesen.

---

## 16.6 Vermeidung von Fehlern mit `[[nodiscard]]` Attribut

Ein häufiges Problem bei Funktionen, die Fehlercodes oder `std::expected` zurückgeben, ist, dass der Aufrufer den Rückgabetyp einfach ignoriert. Das Programm läuft dann mit ungültigen Annahmen weiter.

Um dies zu verhindern, stellt C++ das standardisierte Attribut **`[[nodiscard]]`** zur Verfügung.

Wird eine Funktion oder ein Typ mit `[[nodiscard]]` deklariert, erzeugt der Compiler eine Warnung (oder bei entsprechenden Einstellungen einen Fehler), wenn der Rückgabewert beim Aufruf ignoriert wird.

```cpp
// Der Aufrufer MUSS diesen Rückgabewert auswerten
[[nodiscard]] std::expected<int, ErrorCode> berechneKritischenWert();
```

Du kannst das Attribut auch mit einer Begründung versehen:

```cpp
[[nodiscard]("Das Ignorieren des Ergebnisses führt zu unentdeckten Fehlern!")]
std::expected<void, std::string> speichereDaten();
```

> [!TIP]
> Du kannst `[[nodiscard]]` nicht nur an Funktionen schreiben, sondern auch direkt an Klassen- oder Struktur-Definitionen (z. B. an deine eigene Fehlerklasse). Jede Funktion, die diesen Typ dann zurückgibt, verhält sich automatisch so, als wäre sie mit `[[nodiscard]]` deklariert worden.

---

## 16.7 Fehlerdiagnose mit `std::source_location`

Wenn ein Fehler auftritt, ist es für die Fehlersuche extrem hilfreich zu wissen, *wo* im Quellcode der Fehler passiert ist (Dateiname, Funktionsname, Zeilennummer). 

Früher musste man hierfür auf unschöne Präprozessor-Makros wie `__FILE__` und `__LINE__` zurückgreifen. Seit C++20 (mit Erweiterungen in C++23) gibt es dafür die saubere, typsichere und namensraumfreundliche Klasse **`std::source_location`**.

### Wie funktioniert es?

Die statische Methode `std::source_location::current()` erzeugt ein Objekt, das die Metadaten des aktuellen Quelltext-Standorts enthält.

Wenn du diese Methode als Standardargument in einer Funktion verwendest, wird der Standort der *Aufruferzeile* ermittelt, nicht der Standort der Funktionsdefinition!

```cpp
import std;

// Standardargument sorgt dafür, dass die Position des Aufrufers erfasst wird
void loggeFehler(std::string_view nachricht, 
                 std::source_location loc = std::source_location::current()) {
    // Hier kannst du auf folgende Methoden zugreifen:
    // loc.file_name()     -> Name der Datei
    // loc.function_name() -> Name der Funktion
    // loc.line()          -> Zeilennummer
    // loc.column()        -> Spaltennummer
}
```

Auf diese Weise kannst du sehr präzise Diagnosewerkzeuge schreiben, die dir im Fehlerfall genau sagen, welche Codezeile den Fehler ausgelöst hat.

---

## 16.8 Kontrollfragen und Aufgaben

### Kontrollfragen

1.  Was ist der Unterschied zwischen einem logischen Fehler (`std::logic_error`) und einem Laufzeitfehler (`std::runtime_error`)?
2.  Warum sollten Ausnahmen immer als konstante Referenz (`const std::exception&`) aufgefangen werden?
3.  Erkläre den Begriff *Stack Unwinding*. Was passiert dabei mit lokalen Variablen?
4.  Warum ist es gefährlich, wenn ein Destruktor eine Ausnahme wirft?
5.  Welchen Vorteil bietet `std::expected` gegenüber klassischen Ausnahmen bei der Fehlerbehandlung?
6.  Was bewirkt das Attribut `[[nodiscard]]` und wie hilft es bei der Vermeidung von Softwarefehlern?

### Aufgaben

> [!IMPORTANT]
> Löse die Aufgaben selbstständig, ohne vorgefertigte Lösungen zu kopieren. Nutze moderne I/O-Funktionen wie `std::println`.

#### Aufgabe 1: Der sichere E-Mail-Parser (Ausnahmen)
Schreibe ein Programm, das eine E-Mail-Adresse einliest und validiert.
*   Erstelle eine Funktion zur Validierung der Adresse.
*   Wenn die Adresse kein `@`-Zeichen enthält, wirf eine `std::invalid_argument`-Ausnahme mit einer passenden Fehlermeldung.
*   Fange die Ausnahme in deiner `main`-Funktion auf und gib die Fehlermeldung aus.

#### Aufgabe 2: Robuste Dateigrößen-Ermittlung (`std::expected`)
Entwirf eine Funktion, die den Speicherbedarf einer hypothetischen Datei ermittelt.
*   Da eine Datei fehlen könnte, soll die Funktion keinen Standardwert (wie `-1`) zurückgeben, sondern ein `std::expected<uintmax_t, std::string>`.
*   Simuliere im Fehlerfall den Rückgabetyp mit einem passenden Fehlertext über `std::unexpected`.
*   Nutze das Attribut `[[nodiscard]]`, um sicherzustellen, dass der Rückgabewert in `main` ausgewertet werden muss.
*   Prüfe in `main` das Ergebnis mit `.has_value()` und gib entweder die Größe oder die Fehlermeldung aus.

#### Aufgabe 3: Intelligentes Logging (`std::source_location`)
Schreibe eine eigene, kleine Log-Funktion.
*   Die Funktion soll eine Fehlermeldung entgegennehmen und auf der Konsole ausgeben.
*   Nutze `std::source_location` as optionalen Standardparameter.
*   Formatiere die Ausgabe so, dass sie wie folgt aussieht: `[FEHLER] in main (main.cpp:42): Datei nicht gefunden`.
*   Rufe die Funktion an verschiedenen Stellen deines Programms auf, um zu überprüfen, ob die Zeilennummern korrekt mitwandern.
