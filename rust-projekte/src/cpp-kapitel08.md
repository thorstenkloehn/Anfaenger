# 8 Funktionen

Funktionen sind die grundlegenden Bausteine jeder größeren C++-Anwendung. Sie erlauben es dir, deinen Code in kleine, überschaubare und wiederverwendbare Einheiten aufzuteilen. Anstatt ein langes, unübersichtliches Programm zu schreiben, teilst du die Aufgaben in logische Abschnitte auf. Das erhöht nicht nur die Lesbarkeit, sondern vereinfacht auch das Testen und die Fehlersuche erheblich.

In diesem Kapitel lernst du, wie du Funktionen definierst, sie mit unterschiedlichen Übergabemechanismen fütterst und wie der moderne C++23-Standard dir dabei hilft, dies performant und sicher zu tun.

---

## 8.1 Grundlegendes zu Funktionen

Eine Funktion kannst du dir wie eine "Blackbox" vorstellen: Sie nimmt optionale Eingabewerte (Parameter) entgegen, verarbeitet diese nach einem festen Rezept und gibt optional ein Ergebnis zurück.

### Definition einer Funktion
Die Definition enthält den tatsächlichen Code (den Rumpf) der Funktion. Sie besteht aus dem Rückgabetyp, dem Namen, der Parameterliste in runden Klammern und dem Funktionskörper in geschweiften Klammern.

Syntax-Schema:
```cpp
Rückgabetyp funktionsName(Typ1 parameter1, Typ2 parameter2) {
    // Anweisungen
    return ergebnis; // Falls Rückgabetyp nicht void ist
}
```

### Aufruf einer Funktion
Um eine Funktion auszuführen, rufst du sie unter ihrem Namen auf und übergibst ihr die geforderten Argumente in runden Klammern.

> [!NOTE]
> Wenn eine Funktion keine Werte zurückgibt, verwendest du als Rückgabetyp das Schlüsselwort `void`. Bei solchen Funktionen kannst du das `return`-Statement weglassen oder einfach `return;` schreiben.

### Deklaration (Prototyp)
In C++ muss der Compiler eine Funktion kennen, bevor du sie aufrufen kannst. Wenn du eine Funktion erst unterhalb ihrer Verwendung (z. B. unterhalb der `main`-Funktion) definierst, meldet der Compiler einen Fehler. 

Um dies zu verhindern, nutzt man eine **Deklaration** (auch **Prototyp** genannt). Sie teilt dem Compiler lediglich mit, dass es eine Funktion mit diesem Namen, diesen Parametern und diesem Rückgabetyp gibt. Die eigentliche Definition kann dann an einer anderen Stelle (oder sogar in einer anderen Datei) stehen.

Syntax-Schema einer Deklaration:
```cpp
Rückgabetyp funktionsName(Typ1 parameter1, Typ2 parameter2);
```

---

## 8.2 Funktionsparameter

Parameter sind die Kanäle, über die du einer Funktion Daten zur Verfügung stellst. C++ bietet verschiedene Wege, wie Daten an eine Funktion übergeben werden können.

### Call-by-Value (Wertübergabe)
Standardmäßig werden Argumente in C++ als Kopie an die Funktion übergeben. Das bedeutet, dass die Funktion mit einer eigenen Kopie des Wertes arbeitet. Änderungen an diesem Parameter innerhalb der Funktion haben keinerlei Auswirkungen auf die ursprüngliche Variable im Aufrufer.

> [!WARNING]
> Für einfache Datentypen wie `int` oder `double` ist Call-by-Value extrem effizient. Bei großen Objekten (z. B. langen Listen oder großen Texten) führt Call-by-Value jedoch zu teuren Kopieroperationen, was die Performance deines Programms beeinträchtigt.

### Call-by-Reference (Referenzübergabe)
Wenn du ein Kaufmanns-Und-Zeichen (`&`) an den Typ des Parameters anhängst, wird keine Kopie erzeugt. Stattdessen erhält die Funktion eine Referenz (einen Alias) auf die originale Variable. Modifikationen an diesem Parameter wirken sich direkt auf das Original aus.

### Konstante Parameter (`const Reference`)
Möchtest du die Performance der Referenzübergabe nutzen (kein Kopieren), aber gleichzeitig garantieren, dass die Funktion die Daten nicht versehentlich verändert? Dann verwendest du eine **konstante Referenz**:
```cpp
void verarbeiteDaten(const GroßerTyp& daten);
```
Dies ist der Standardweg in C++ für die Übergabe von größeren Objekten, die nur gelesen werden sollen.

### Standardparameter (Default-Argumente)
Du kannst Parametern in der Funktionsdeklaration Standardwerte zuweisen. Wird beim Aufruf kein Argument für diesen Parameter übergeben, greift automatisch der Standardwert.

> [!TIP]
> Standardwerte werden von rechts nach links zugewiesen. Sobald ein Parameter einen Standardwert hat, müssen alle folgenden Parameter rechts davon ebenfalls einen Standardwert besitzen. Deklariere Standardparameter vorzugsweise im Prototyp (Deklaration), nicht in der Definition!

---

## 8.3 Rückgabe aus Funktionen

Das `return`-Statement beendet die Ausführung einer Funktion und gibt optional einen Wert an den Aufrufer zurück.

### RVO und NRVO (Return Value Optimization)
Du fragst dich vielleicht: "Wenn ich ein großes Objekt per Wert zurückgebe, wird es dann nicht kopiert und verlangsamt mein Programm?"
Hier kommt eine der wichtigsten Compiler-Optimierungen von C++ ins Spiel: **Copy Elision** (Kopiereliminierung).

* **RVO (Return Value Optimization):** Wenn eine Funktion ein temporäres, namenloses Objekt zurückgibt, baut der Compiler dieses Objekt direkt im Speicherbereich des Empfängers auf. Es findet keinerlei Kopier- oder Verschiebeoperation statt. Seit C++17 ist dies sogar vom Standard vorgeschrieben (Mandatory Copy Elision).
* **NRVO (Named Return Value Optimization):** Gibt die Funktion ein lokales Objekt mit Namen zurück, kann der Compiler denselben Optimierungsschritt durchführen. Dies ist zwar nicht garantiert vorgeschrieben, aber moderne Compiler optimieren dies fast immer.

> [!NOTE]
> Dank RVO und NRVO kannst du in modernem C++ bedenkenlos komplexe Datentypen wie Vektoren oder Strings per Wert aus Funktionen zurückgeben. Du musst keine Zeiger oder Referenzen missbrauchen, um "schnell" Daten zurückzugeben.

---

## 8.4 Funktionen überladen (Overloading)

In C++ können mehrere Funktionen denselben Namen tragen, solange sie sich in ihrer **Parametersignatur** unterscheiden. Das nennt man Funktionsüberladung.

Der Compiler entscheidet anhand der übergebenen Argumente beim Aufruf, welche der überladenen Varianten ausgeführt werden muss. Der Unterschied kann liegen in:
* der Anzahl der Parameter
* den Datentypen der Parameter
* der Reihenfolge der Datentypen

> [!IMPORTANT]
> Der Rückgabetyp einer Funktion ist **kein** Unterscheidungsmerkmal für das Überladen! Zwei Funktionen, die sich nur im Rückgabetyp unterscheiden, führen zu einem Compilerfehler.

---

## 8.5 Gültigkeitsbereich und Sichtbarkeit von Variablen (Scope)

Jede Variable, die du deklarierst, hat einen begrenzten Bereich, in dem sie existiert und sichtbar ist.

* **Lokale Variablen:** Variablen, die innerhalb einer Funktion (oder eines Blocks `{ }`) deklariert werden. Sie werden auf dem *Stack* erzeugt, wenn der Programmfluss ihre Deklaration erreicht, und automatisch zerstört, wenn der umgebende Block verlassen wird.
* **Globale Variablen:** Außerhalb aller Funktionen deklarierte Variablen. Sie sind überall im Programm sichtbar. 
  > [!WARNING]
  > Vermeide globale Variablen, wo immer es geht! Sie machen den Programmzustand unvorhersehbar und erschweren die Fehlersuche massiv.

### Ausblick: Wildcard-Platzhalter (`_`) ab C++26
Ab C++26 gibt es die Möglichkeit, den Unterstrich `_` als Platzhalter-Namen für Variablen zu verwenden. Wenn du eine Variable deklarieren musst (z. B. beim Entpacken mit Structured Bindings oder beim Abfangen von Fehlern), deren Wert du im Anschluss aber gar nicht liest, signalisierst du das mit `_`. Der Compiler weiß dann, dass diese Variable ungenutzt bleibt, und unterdrückt entsprechende Warnungen. Zudem blockiert dieser Name keine anderen Bezeichner. Unter C++23 musst du dafür noch reguläre Variablennamen verwenden (und diese gegebenenfalls mit dem Attribut `[[maybe_unused]]` versehen).

---

## 8.6 Die main()-Funktion und Programmende

Die `main`-Funktion ist der Eintrittspunkt deines Programms. Sie hat in C++ einige Besonderheiten:
* Sie muss den Rückgabetyp `int` besitzen.
* Wenn du kein explizites `return`-Statement am Ende von `main()` platzierst, fügt der Compiler automatisch ein implizites `return 0;` ein.
* Ein Rückgabewert von `0` signalisiert der Betriebssystem-Umgebung, dass das Programm erfolgreich und ohne Fehler beendet wurde.

### Beenden mit std::exit
Aus dem Modul `std` stehen dir Konstanten und Funktionen für das Programmende zur Verfügung:
* `std::exit(...)`: Beendet das Programm sofort von jeder beliebigen Stelle im Code aus.
* `EXIT_SUCCESS`: Makro für einen erfolgreichen Programmabbruch (entspricht meist 0).
* `EXIT_FAILURE`: Makro für einen fehlerhaften Programmabbruch.

> [!CAUTION]
> Der direkte Aufruf von `std::exit()` umgeht unter Umständen die geordnete Zerstörung (Destruktion) von lokalen automatischen Variablen, die sich aktuell auf dem Stack befinden. Verwende es daher mit Bedacht und bevorzugt nur im absoluten Ausnahmefall.

---

## 8.7 Referenzen/Zeiger als Parameter und Rückgabewerte

### Zeiger als Parameter
Anstelle von Referenzen kannst du auch Zeiger (`T*`) als Parameter übergeben. Der wesentliche Unterschied ist:
* Ein Zeiger kann `nullptr` sein (er zeigt auf "nichts"). Das ist nützlich für optionale Argumente.
* Um auf den Wert zuzugreifen, musst du den Zeiger dereferenzieren (`*pointer`).

### Gefährliche Rückgaben: Dangling References
Wenn eine Funktion eine Referenz oder einen Zeiger zurückgibt, musst du extrem aufpassen, worauf diese verweisen.
* **Verboten:** Die Rückgabe einer Referenz oder eines Zeigers auf eine lokale Variable, die innerhalb der Funktion erstellt wurde. Sobald die Funktion endet, wird diese lokale Variable zerstört. Die zurückgegebene Referenz zeigt auf ungültigen Speicher (eine sogenannte *Dangling Reference*). Das führt zu undefiniertem Verhalten (Undefined Behavior).
* **Erlaubt:** Die Rückgabe einer Referenz auf ein Objekt, dessen Lebensdauer über den Funktionsaufruf hinausgeht (z. B. ein Objekt, das als Referenz an die Funktion übergeben wurde, oder ein Element innerhalb eines langlebigen Containers).

---

## 8.8 Übergabe großer Elemente

Um Programme schnell und speicherschonend zu halten, nutzt man in modernem C++ spezialisierte Typen für den Lesezugriff auf Daten, ohne Kopien anzufertigen.

### std::string_view
Wenn du eine Funktion schreibst, die eine Zeichenkette nur lesen muss, verwende weder `const std::string&` noch `const char*`. Nutze stattdessen `std::string_view`:
```cpp
void druckeText(std::string_view text);
```
Ein `std::string_view` ist eine extrem leichtgewichtige Sicht (nur ein Zeiger auf den Start und eine Länge) auf eine beliebige Zeichenkette. Es funktioniert nahtlos und ohne Speicherallozierung sowohl mit String-Literalen (`"Hallo"`) als auch mit `std::string`.

### std::span
Ähnlich wie `std::string_view` für Text funktioniert `std::span` für zusammenhängende Speicherbereiche beliebiger Typen (wie Arrays oder Vektoren).
```cpp
void verarbeiteZahlen(std::span<const int> zahlen);
```
Mit `std::span` erlaubst du deiner Funktion, Vektoren (`std::vector<int>`), Standard-Arrays (`std::array<int, N>`) und klassische C-Arrays zu akzeptieren, ohne dass dafür Daten kopiert werden müssen oder die Funktion an einen spezifischen Containertyp gebunden ist.

---

## 8.9 C-Arrays oder C-Strings als Parameter

Aus Kompatibilitätsgründen mit der Sprache C begegnen dir in C++ hin und wieder klassische C-Arrays (`int arr[]`) und C-Strings (`const char*`).

### Array Decay (Array-Zerfall)
Wenn du ein C-Array an eine Funktion übergibst, zerfällt es automatisch in einen Zeiger auf sein erstes Element. Das bedeutet:
* Die Funktion verliert jegliche Information darüber, wie groß das Array ist.
* Du musst die Größe des Arrays als zusätzlichen Parameter übergeben.
* Die Syntax `void funktion(int arr[10])` täuscht eine feste Größe nur vor – für den Compiler ist es dennoch ein einfacher Zeiger `int* arr`.

### C-Strings
Ein C-String ist ein Array von Zeichen (`char`), das mit dem Nullzeichen `'\0'` endet. Funktionen, die `const char*` erwarten, laufen so lange durch den Speicher, bis sie auf diese Nullterminierung stoßen. Fehlt diese, kommt es zu Speicherzugriffsfehlern.

> [!TIP]
> Verwende im modernen C++ bevorzugt `std::array`, `std::vector` sowie `std::span` und `std::string_view`, um die Fehleranfälligkeit von klassischen C-Arrays und C-Strings zu vermeiden.

---

## 8.10 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen einer Funktionsdeklaration und einer Funktionsdefinition?
2. Warum führt die Übergabe eines `std::vector` per Call-by-Value zu Performance-Problemen, und wie löst man das elegant?
3. Warum darf der Rückgabetyp nicht das einzige Unterscheidungsmerkmal beim Überladen von Funktionen sein?
4. Was versteht man unter RVO und NRVO, und warum musst du dich beim Zurückgeben großer Objekte meist nicht um Kopierkosten sorgen?
5. Warum ist die Rückgabe einer Referenz auf eine lokale Funktionsvariable gefährlich?
6. Welchen Vorteil bietet `std::string_view` gegenüber `const std::string&`?

### Übungsaufgaben

> [!IMPORTANT]
> Versuche, die folgenden Aufgaben selbstständig zu lösen. Achte auf modernen C++-Stil (Verwendung von `import std;` und `std::println`).

#### Aufgabe 1: Die Tausch-Funktion (Referenzen verstehen)
Entwirf eine Funktion namens `swap`, die zwei Ganzzahlen entgegennimmt und deren Werte vertauscht. 
* Überlege dir genau, welcher Parameter-Übergabetyp notwendig ist, damit die Änderung auch außerhalb der Funktion wirksam ist.
* *Hinweis:* Du benötigst eine temporäre Variable innerhalb der Funktion, um einen der Werte zwischenzuspeichern.

#### Aufgabe 2: Standardwerte für Begrüßungen
Schreibe eine Funktion, die eine Begrüßung auf der Konsole ausgibt. Sie soll zwei Parameter haben: einen Namen und einen Begrüßungstext.
* Wenn kein Begrüßungstext angegeben wird, soll standardmäßig `"Hallo"` verwendet werden.
* Rufe die Funktion einmal mit einem Argument und einmal mit zwei Argumenten auf.

#### Aufgabe 3: Statistik auswerten mit std::span
Schreibe eine Funktion, die den Durchschnitt (Mittelwert) einer Liste von Fließkommazahlen berechnet.
* Die Funktion soll ungebunden von einem konkreten Containertyp sein, sodass sie sowohl mit einem `std::vector<double>` als auch mit einem `std::array<double, 5>` funktioniert.
* Verwende dazu den passenden Parametertyp aus Kapitel 8.8.
* Gib den berechneten Durchschnitt zurück.
