# 13 Operatoren überladen

In C++ kannst du die eingebaute Syntax der Sprache nutzen, um mit deinen eigenen Klassen so natürlich zu arbeiten wie mit grundlegenden Datentypen (z. B. `int` oder `double`). Stell dir vor, du erstellst eine Klasse für mathematische Vektoren, komplexe Zahlen oder Brüche. Ohne Operatorenüberladung müsstest du für jede Addition eine Methode wie `addiere()` aufrufen: `ergebnis = v1.addiere(v2);`. 

Mit die Operatorenüberladung kannst du stattdessen einfach schreiben: `ergebnis = v1 + v2;`. Das macht deinen Code nicht nur kürzer, sondern auch erheblich lesbarer. Man spricht hierbei von **syntaktischem Zucker** – die Funktionalität bleibt gleich, aber die Schreibweise wird für uns Menschen viel angenehmer.

In diesem Kapitel lernst du, wie du die verschiedenen Operatoren in C++ sicher und nach modernen Standards (C++23) für deine eigenen Typen definierst.

---

## 13.1 Das Schlüsselwort `operator`

Um einem Operator eine neue Bedeutung für deine Klasse zu geben, definierst du eine spezielle Funktion. Der Name dieser Funktion besteht immer aus dem Schlüsselwort `operator` und dem jeweiligen Symbol (z. B. `+`, `*`, `<<`, `==`).

Ein schematischer Bauplan für eine solche Deklaration sieht so aus:

```cpp
Rückgabetyp operatorSymbol(Parameterliste);
```

Obwohl das Überladen von Operatoren dir große gestalterische Freiheit gibt, existieren im C++-Standard strikte Spielregeln, um das Verhalten der Sprache vorhersehbar zu halten:

1. **Keine neuen Symbole erfinden:** Du kannst nur Operatoren überladen, die es in C++ bereits gibt. Es ist nicht möglich, eigene Operatoren wie `@` oder einen Potenzoperator `**` zu erschaffen.
2. **Mindestens ein benutzerdefinierter Typ:** Mindestens einer der Operanden muss ein von dir erstellter Typ sein (z. B. eine Klasse, eine Struktur oder ein Enum). Du kannst das Verhalten von eingebauten Typen untereinander (wie `int + int`) nicht verändern.
3. **Priorität und Assoziativität bleiben gleich:** Die Rangfolge der Operatoren (z. B. Punkt- vor Strichrechnung) und die Richtung, in der sie ausgewertet werden (von links nach rechts oder umgekehrt), können nicht verändert werden. Ein `*` wird immer vor einem `+` ausgewertet.
4. **Nicht alle Operatoren sind überladbar:** Einige wenige Operatoren dürfen nicht überladen werden. Dazu gehören:
   - Der Punkt-Operator für den Memberzugriff (`.`)
   - Der Scope-Auflösungsoperator (`::`)
   - Der Bedingungsoperator (`?:`)
   - Der `sizeof`-Operator

> [!WARNING]
> Nutze die Operatorenüberladung nur dort, wo sie intuitiv und logisch sinnvoll ist. Wenn du den Operator `+` für eine Klasse `Dokument` so überlädst, dass er das Dokument löscht statt etwas hinzuzufügen, stiftest du bei jedem, der deinen Code liest, extreme Verwirrung. Bleibe nah an der mathematischen oder allgemein erwarteten Intuition.

---

## 13.2 Zweistellige arithmetische Operatoren überladen

Zweistellige (binäre) Operatoren verknüpfen zwei Werte miteinander. Beispiele hierfür sind `+`, `-`, `*` und `/`. Wenn du einen solchen Operator für deine Klasse definieren möchtest, hast du zwei grundlegende Möglichkeiten:

### 1. Die Umsetzung als Klassenmethode (Member-Funktion)

Wenn du den Operator direkt in deiner Klasse definierst, übernimmt das aktuelle Objekt (`this`) implizit die Rolle des linken Operanden. Der rechte Operand wird als Argument an die Funktion übergeben.

Ein Struktur-Template für eine solche Methode sieht so aus:

```cpp
// Innerhalb der Klassendefinition:
MeinTyp operator+(const MeinTyp& rhs) const;
```

Hierbei steht `rhs` für *Right-Hand Side* (die rechte Seite des Operators). Da die Addition das Originalobjekt nicht verändern soll, deklarieren wir die Methode als `const` und geben ein neues Objekt per Wert zurück.

### 2. Die Umsetzung als globale Hilfsfunktion (Non-Member-Funktion)

Alternativ kannst du den Operator als eigenständige, globale Funktion außerhalb der Klasse definieren. In diesem Fall müssen beide Operanden explizit als Parameter übergeben werden:

```cpp
// Außerhalb der Klassendefinition:
MeinTyp operator+(const MeinTyp& lhs, const MeinTyp& rhs);
```

Hierbei steht `lhs` für *Left-Hand Side* (die linke Seite). Wenn diese globale Funktion Zugriff auf private Attribute deiner Klasse benötigt, kannst du sie innerhalb deiner Klasse mit dem Schlüsselwort `friend` bekannt machen.

### Der entscheidende Unterschied: Symmetrie bei Konvertierungen

Warum gibt es diese zwei Wege und welcher ist besser? Stell dir vor, du hast eine Klasse für Brüche geschrieben, die einen Konstruktor besitzt, der eine ganze Zahl (`int`) automatisch in einen Bruch umwandeln kann (implizite Konvertierung).

* **Mit einer Klassenmethode:** 
  Schreibst du `meinBruch + 5`, funktioniert das. Der Compiler sieht, dass links ein Objekt deiner Klasse steht, und wandelt die `5` auf der rechten Seite in einen Bruch um.
  Schreibst du jedoch `5 + meinBruch`, meldet der Compiler einen Fehler! Da die linke Seite eine eingebaute Zahl (`int`) ist, sucht der Compiler in der Klasse `int` nach einem passenden Operator. Da du diese nicht verändern kannst, scheitert der Versuch.
* **Mit einer globalen Hilfsfunktion:**
  Da beide Parameter gleichwertig als Argumente an eine Funktion übergeben werden, kann der Compiler in beiden Fällen (`meinBruch + 5` und `5 + meinBruch`) die implizite Konvertierung anwenden.

> [!TIP]
> Bevorzuge für zweistellige arithmetische Operatoren in der Regel **globale Hilfsfunktionen** (oft als `friend` in der Klasse deklariert). Dies garantiert eine symmetrische Behandlung beider Operanden und verhindert überraschende Compilerfehler bei Konvertierungen.

---

## 13.3 Einstellige Operatoren überladen

Einstellige (unäre) Operatoren wirken auf ein einziges Objekt. Typische Vertreter sind das unäre Vorzeichen-Minus (`-x`), das Vorzeichen-Plus (`+x`) sowie die Inkrement- (`++`) und Dekrement-Operatoren (`--`).

### Vorzeichen-Operatoren

Diese Operatoren verändern das Objekt meist nicht selbst, sondern liefern eine modifizierte Kopie zurück. Sie benötigen als Member-Funktion keine Parameter:

```cpp
MeinTyp operator-() const;
```

### Inkrement und Dekrement: Präfix vs. Postfix

Die größte Besonderheit im C++-Design liegt beim Unterschied zwischen dem Vorher-Ändern (Präfix, z. B. `++x`) und dem Nachher-Ändern (Postfix, z. B. `x++`). Beide nutzen dasselbe Symbol, müssen aber unterschiedlich deklariert werden.

#### Die Präfix-Variante (`++x`)
Der Präfix-Operator erhöht den Wert des Objekts und gibt das geänderte Objekt selbst als Referenz zurück.

```cpp
MeinTyp& operator++(); // Präfix
```

Da das Objekt direkt verändert und zurückgegeben wird, ist dies sehr effizient.

#### Die Postfix-Variante (`x++`)
Der Postfix-Operator soll den Wert des Objekts erhöhen, aber den *alten* Zustand vor der Erhöhung zurückgeben. Um diese Methode syntaktisch von der Präfix-Variante zu unterscheiden, verlangt C++ einen ungenutzten Dummy-Parameter vom Typ `int`:

```cpp
MeinTyp operator++(int); // Postfix (das int ist ein reines Unterscheidungsmerkmal)
```

Da die Postfix-Variante den alten Zustand zurückliefern muss, läuft sie intern meist so ab:
1. Erstelle eine temporäre Kopie des aktuellen Zustands.
2. Erhöhe den Zustand des aktuellen Objekts (hierzu kann intern oft der Präfix-Operator aufgerufen werden).
3. Gib die zuvor erstellte Kopie per Wert zurück.

> [!NOTE]
> Da die Postfix-Variante zwingend eine temporäre Kopie anlegen muss, ist sie laufzeitintensiver als die Präfix-Variante. Verwende im Alltag daher bevorzugt den Präfix-Operator (`++i` statt `i++`), sofern du den alten Wert nicht explizit im selben Ausdruck benötigst.

---

## 13.4 Den Zuweisungsoperator überladen

Der Zuweisungsoperator (`operator=`) wird aufgerufen, wenn ein bereits initialisiertes Objekt einen neuen Wert von einem anderen Objekt zugewiesen bekommt:

```cpp
MeinTyp a;
MeinTyp b;
a = b; // Ruft den Zuweisungsoperator auf
```

Wenn du diesen Operator nicht selbst definierst, generiert der Compiler automatisch eine Standardvariante, die alle Attribute einzeln kopiert. Verwaltest du in deiner Klasse jedoch Ressourcen wie dynamischen Speicher (Heap) oder geöffnete Dateien, führt dieses flache Kopieren zu schweren Fehlern (z. B. doppelter Speicherfreigabe).

In modernem C++ unterscheidet man zwei Arten der Zuweisung:

### 1. Kopierzuweisung (Copy Assignment)

Bei der Kopierzuweisung wird der Zustand eines bestehenden Objekts in ein anderes kopiert. Das Quellobjekt bleibt dabei unverändert.

```cpp
MeinTyp& operator=(const MeinTyp& other);
```

Ein typischer Ablauf für die Implementierung einer Kopierzuweisung folgt diesen Schritten:
* **Selbstzuweisungsschutz:** Überprüfe, ob das übergebene Objekt mit dem eigenen Objekt identisch ist (`this == &other`). Wenn ja, tu nichts und gib direkt `*this` zurück. Andernfalls würdest du im nächsten Schritt eventuell deine eigenen Daten löschen, bevor du sie kopierst.
* **Ressourcen freigeben:** Lösche den bisherigen dynamischen Speicher des Zielobjekts.
* **Daten kopieren:** Reserviere neuen Speicher und kopiere die Daten des Quellobjekts.
* **Rückgabe:** Gib eine Referenz auf das eigene Objekt (`*this`) zurück, um Zuweisungsketten wie `a = b = c;` zu ermöglichen.

### 2. Verschiebezuweisung (Move Assignment)

Die Verschiebezuweisung (eingeführt mit Rvalue-Referenzen `&&`) kopiert keine Daten, sondern "stiehlt" die Ressourcen eines temporären Objekts, das ohnehin kurz danach zerstört wird. Das spart teure Speicherallokationen.

```cpp
MeinTyp& operator=(MeinTyp&& other) noexcept;
```

Der Ablauf ist ähnlich wie bei der Kopierzuweisung, jedoch mit einem entscheidenden Unterschied:
* Prüfe auch hier auf Selbstzuweisung.
* Gib die eigenen Ressourcen frei.
* Übernehme die Zeiger/Ressourcen direkt von `other` (einfaches Umbiegen der Zeiger).
* Setze die Zeiger von `other` auf `nullptr` oder einen sicheren Standardzustand, damit der Destruktor von `other` die soeben "gestohlenen" Daten nicht wieder freigibt.
* Gib `*this` zurück.

### Zuweisung unterbinden

Manche Klassen dürfen weder kopiert noch verschoben werden (z. B. Klassen, die eine exklusive Hardware- oder Netzwerkverbindung steuern). Du kannst diese Operationen gezielt verbieten, indem du sie mit `= delete` deklarierst:

```cpp
MeinTyp& operator=(const MeinTyp& other) = delete; // Kopieren verboten!
```

> [!IMPORTANT]
> Denke an die **Rule of Five** (Regel der Fünf): Wenn du einen der folgenden mitgelieferten Mechanismen selbst implementieren musst, solltest du dir überlegen, ob du nicht alle fünf explizit definieren (oder verbieten) musst:
> 1. Destruktor
> 2. Kopierkonstruktor
> 3. Kopierzuweisungsoperator
> 4. Verschiebekonstruktor
> 5. Verschiebezuweisungsoperator

---

## 13.5 Ausgabe- und Eingabeoperatoren überladen

Möchtest du Objekte deiner Klasse direkt über Datenströme ausgeben (z. B. `std::cout << meinObjekt;`) oder einlesen (z. B. `std::cin >> meinObjekt;`), musst du die Stream-Operatoren überladen.

Da der linke Operand hierbei ein Stream-Objekt aus der Standardbibliothek ist (`std::ostream` bzw. `std::istream`), kannst du diese Operatoren **nicht als Member-Funktionen** deiner Klasse definieren. Sie müssen als globale Hilfsfunktionen implementiert werden.

### Der Ausgabeoperator (`operator<<`)

Um ein Objekt auf der Konsole oder in einer Datei auszugeben, deklarierst du folgende globale Funktion:

```cpp
// Typischerweise als friend deklariert in der Klasse:
friend std::ostream& operator<<(std::ostream& os, const MeinTyp& obj);
```

* Der erste Parameter ist eine veränderbare Referenz auf den Stream `os` (da Schreiben den Zustand des Streams verändert).
* Der zweite Parameter ist eine konstante Referenz auf das auszugebende Objekt.
* Die Funktion muss die Referenz auf den Stream `os` wieder zurückgeben, damit Ausdrücke verkettet werden können (`std::cout << a << b;`).

### Der Eingabeoperator (`operator>>`)

Das Einlesen funktioniert analog, allerdings darf das einzulesende Objekt nicht konstant sein:

```cpp
friend std::istream& operator>>(std::istream& is, MeinTyp& obj);
```

* Innerhalb der Funktion liest du die Werte in die Attribute von `obj` ein.
* Wichtig: Validierung! Falls die Eingabe fehlerhaft ist (z. B. Buchstaben eingegeben wurden, obwohl Zahlen erwartet wurden), solltest du den Fehlerzustand des Streams über `is.setstate(std::ios::failbit)` signalisieren.

---

### Der moderne C++23-Weg: Spezialisierung von `std::formatter`

In modernem C++ (eingeführt mit C++23 samt `import std;` und `std::println`) weicht die Verwendung von I/O-Streams immer mehr den moderneren, schnelleren und sichereren Funktionen `std::print` und `std::println`. 

Diese Funktionen nutzen unter der Haube `std::format`. Um ein eigenes Objekt mit `std::print` ausgeben zu können, überlädt man nicht `operator<<`, sondern spezialisiert das Template `std::formatter` für den eigenen Typ.

Ein Struktur-Template für eine solche Spezialisierung sieht so aus:

```cpp
// Spezialisierung im Namensraum std
template <>
struct std::formatter<MeinTyp> {
    // Parst optionale Formatierungsoptionen (z. B. {:d} oder {:f})
    constexpr auto parse(std::format_parse_context& ctx) {
        return ctx.begin(); // Einfachste Variante: Optionen überspringen
    }

    // Formatiert das Objekt und schreibt es in den Ausgabe-Buffer
    auto format(const MeinTyp& obj, std::format_context& ctx) const {
        // Hier nutzt du std::format_to, um die einzelnen Member strukturiert auszugeben
        return std::format_to(ctx.out(), "Format-String", /* Attribute von obj */);
    }
};
```

> [!TIP]
> Wenn du modernen C++23-Code schreibst, solltest du für die Textausgabe die Spezialisierung von `std::formatter` bevorzugen. Sie arbeitet nahtlos mit `std::print` zusammen, ist typsicherer und oft performanter als die alte Stream-Ausgabe mit `std::ostream`.

---

## 13.6 Vergleichsoperatoren

Vor C++20 war das Implementieren von Vergleichen eine monotone Aufgabe: Du musstest sechs verschiedene Operatoren (`<`, `>`, `<=`, `>=`, `==`, `!=`) einzeln schreiben, obwohl sie logisch alle voneinander abhängen.

### Der Drei-Wege-Vergleichsoperator (`<=>`)

Seit C++20 (und verfeinert in C++23) gibt es den sogenannten **Spaceship-Operator** `<=>`. Dieser Operator vergleicht zwei Werte und gibt ein spezielles Ordnungsobjekt zurück, das beschreibt, ob der linke Wert kleiner, gleich oder größer als der rechte ist.

Sobald du `<=>` für deine Klasse definierst, generiert der Compiler die vier relationalen Vergleiche (`<`, `>`, `<=`, `>=`) automatisch für dich!

Das Geniale: Oft musst du die Logik gar nicht selbst schreiben. Du kannst den Compiler anweisen, den Standardvergleich zu generieren:

```cpp
// Innerhalb der Klasse:
auto operator<=>(const MeinTyp& rhs) const = default;
```

Mit `= default` vergleicht der Compiler alle Attribute deiner Klasse in der Reihenfolge, in der sie deklariert wurden (lexikographischer Vergleich).

### Gleichheit separat betrachten

Obwohl der Spaceship-Operator theoretisch auch Gleichheit prüfen kann, generiert der Compiler Vergleiche auf Gleichheit (`==` und `!=`) nur dann automatisch mit, wenn du auch `operator==` als `= default` deklarierst:

```cpp
bool operator==(const MeinTyp& rhs) const = default;
```

> [!NOTE]
> Die Trennung von `operator<=>` und `operator==` hat Performance-Gründe. Um festzustellen, ob zwei lange Strings oder Vektoren gleich sind, reicht ein schneller Vergleich auf ungleiche Längen oder Element-für-Element-Gleichheit. Ein echter Ordnungsvergleich (wer ist "größer") ist oft aufwendiger.

### Die drei Ordnungskategorien

Je nachdem, welche Eigenschaften deine Daten haben, gibt der Spaceship-Operator unterschiedliche Typen zurück:

1. **`std::strong_ordering`:** Eine strikte, totale Ordnung. Zwei Objekte sind entweder kleiner, größer oder absolut identisch (z. B. ganze Zahlen).
2. **`std::weak_ordering`:** Eine schwächere Ordnung. Zwei Objekte können wertmäßig als "äquivalent" gelten, ohne in all ihren Details identisch zu sein (z. B. ein case-insensitiver String-Vergleich: "Hallo" und "hallo" sind äquivalent, aber nicht identisch).
3. **`std::partial_ordering`:** Eine Ordnung, bei der manche Werte nicht miteinander vergleichbar sind (z. B. Gleitkommazahlen wegen `NaN` - Not a Number).

---

## 13.7 Konvertierungsoperatoren

Manchmal ist es praktisch, wenn sich ein Anwenderobjekt deiner Klasse verhält wie ein einfacher Datentyp. Beispielsweise soll eine Klasse `Gewicht` in einen einfachen `double`-Wert umgewandelt werden können, wenn eine mathematische Berechnung ansteht.

Dafür nutzt man Konvertierungsoperatoren. Ihre Syntax ist speziell, da sie **keinen expliziten Rückgabetyp** angeben (der Typ ergibt sich aus dem Operatornamen):

```cpp
operator Zieltyp() const;
```

### Die Gefahr impliziter Konvertierungen

Schreibst du einen einfachen Konvertierungsoperator wie `operator double() const;`, erlaubt das dem Compiler, deine Klasse vollautomatisch und ungefragt in eine Gleitkommazahl umzuwandeln, wann immer er es für nötig hält. 

Das kann zu absurden Fehlern führen: Ein unbeabsichtigter mathematischer Ausdruck mit einem deiner Objekte kompiliert fehlerfrei, führt aber zu völlig falschen Berechnungen.

### Die Rettung: `explicit`

Um unkontrollierte automatische Umwandlungen zu verhindern, solltest du Konvertierungsoperatoren fast immer als `explicit` deklarieren:

```cpp
explicit operator Zieltyp() const;
```

Dadurch darf der Compiler die Konvertierung nur noch dann durchführen, wenn du sie ausdrücklich anforderst:
- Durch einen direkten Cast: `static_cast<Zieltyp>(meinObjekt)`
- Bei der direkten Initialisierung: `Zieltyp wert(meinObjekt)`

> [!TIP]
> Eine wichtige Ausnahme gibt es für `explicit operator bool() const;`. Wenn du ein Objekt in einer Kontrollstruktur (wie `if (meinObjekt)`) prüfst, wertet der Compiler diesen Konvertierungsoperator trotz des Schlüsselworts `explicit` implizit aus. Das ist extrem nützlich, um beispielsweise die Gültigkeit von Objekten (wie Dateien oder Netzwerkverbindungen) direkt in Bedingungen abzufragen.

---

## 13.8 Kontrollfragen und Aufgaben

### Kontrollfragen

1. Warum ist es unmöglich, einen neuen Operator wie `operator**` zu definieren?
2. Worin unterscheidet sich die Implementierung eines binären Operators als Klassenmethode von der als globale Hilfsfunktion? Welcher Parameter fällt bei der Klassenmethode weg?
3. Warum benötigt der Postfix-Inkrement-Operator (`x++`) einen `int`-Parameter, obwohl dieser im Funktionskörper meist gar nicht verwendet wird?
4. Warum ist die Präfix-Variante (`++x`) in der Regel performanter als die Postfix-Variante?
5. Was ist das Problem bei einer Selbstzuweisung (`a = a;`) und wie schützt man sich in der Implementierung von `operator=` dagegen?
6. Warum müssen Stream-Operatoren wie `operator<<` zwingend globale Funktionen sein?
7. Welchen Vorteil bietet die Spezialisierung von `std::formatter` in C++23 gegenüber dem klassischen Überladen von `operator<<`?
8. Warum generiert der Compiler durch das Deklarieren von `operator<=> = default` automatisch auch die Operatoren `<`, `>`, `<=` und `>=`?
9. Welche Gefahr bergen implizite Konvertierungsoperatoren und wie entschärft man diese?

---

### Aufgaben

#### Aufgabe 1: Die zweidimensionale Vektorklasse (Didaktische Übung)
Konstruiere im Geiste oder in einem Testprojekt eine Klasse für 2D-Vektoren (mit den Koordinaten `x` und `y`).
* Implementiere die Addition und Subtraktion zweier Vektoren. Nutze dafür globale Hilfsfunktionen, um Symmetrie zu wahren.
* Überlade die Operatoren so, dass du auch einen Vektor mit einem einfachen Skalar (`double`) addieren kannst (sowohl `Vektor + Skalar` als auch `Skalar + Vektor`).
* Überlege, wie du den Multiplikationsoperator `*` für das Skalarprodukt zweier Vektoren umsetzen würdest.

#### Aufgabe 2: Der sichere Wrapper für IDs (Didaktische Übung)
Entwirf eine Klasse, die eine numerische Datenbank-ID (z. B. einen `unsigned long`) kapselt.
* Die Klasse soll nicht für arithmetische Berechnungen missbraucht werden können (keine Addition, keine Multiplikation).
* Sie soll jedoch auf Gleichheit und Ordnung prüfbar sein. Verwende den C++20-Spaceship-Operator und lasse den Compiler die Arbeit tun.
* Implementiere einen Konvertierungsoperator zu `unsigned long`, der jedoch ausschließlich explizit aufgerufen werden darf.
* Mache die Klasse mithilfe von `std::formatter` für `std::print` ausgebbar.

#### Aufgabe 3: Der exklusive Ressourcen-Manager (Didaktische Übung)
Stell dir vor, du schreibst eine Klasse, die ein Handle auf eine Systemressource (z. B. eine Datei oder einen Grafikspeicher-Puffer) hält.
* Da die Ressource exklusiv verwaltet werden soll, darf das Objekt nicht kopiert werden. Verbiete den Kopierkonstruktor und die Kopierzuweisung.
* Erlaube jedoch das Verschieben der Ressource (Move-Semantik). Implementiere die Verschiebezuweisung. Achte penibel darauf, die Ressource des Zielobjekts vor der Übernahme freizugeben und die Ressource des Quellobjekts zu leeren, um einen Double-Free-Fehler beim Zerstören zu verhindern.
