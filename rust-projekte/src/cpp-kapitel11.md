# 11 Klassen

Bisher hast du gelernt, wie du Daten in einfachen Variablen oder Datenstrukturen (`struct`) speicherst und Funktionen schreibst, um diese Daten zu verarbeiten. In der objektorientierten Programmierung (OOP) gehen wir einen Schritt weiter: Wir verschmelzen Daten und die darauf operierenden Funktionen zu einer Einheit. 

Eine **Klasse** ist der Bauplan für diese Einheit, und ein **Objekt** ist das konkrete Haus, das nach diesem Bauplan gebaut wurde. In diesem Kapitel erfährst du, wie du eigene Klassen entwirfst, Daten vor unbefugtem Zugriff schützt und die Lebenszyklen deiner Objekte kontrollierst.

---

## 11.1 Klassen und Kapselung

### Der Bauplan und das Geheimnisprinzip
Eine Klasse definiert neue Datentypen. Im Gegensatz zu einfachen Strukturen (`struct`), bei denen standardmäßig alle Elemente für jeden sichtbar und veränderbar sind, nutzt man bei Klassen das Prinzip der **Datenkapselung**. Das bedeutet, dass die internen Details und Daten eines Objekts vor der Außenwelt verborgen werden. Der Zugriff erfolgt stattdessen kontrolliert über eine definierte Schnittstelle (Methoden).

### Zugriffskontrolle: public, private und protected
C++ bietet drei Zugriffsspezifizierer, um zu steuern, wer auf die Elemente (Daten und Funktionen) einer Klasse zugreifen darf:

*   **`private`**: Nur die Klasse selbst (ihre eigenen Methoden) darf auf diese Elemente zugreifen. Dies ist der Standard für Klassen in C++.
*   **`public`**: Jeder, der ein Objekt der Klasse besitzt, kann auf diese Elemente zugreifen. Sie bilden die öffentliche Schnittstelle.
*   **`protected`**: Ähnlich wie `private`, aber auch abgeleitete Klassen (Vererbung) haben Zugriff darauf. (Mehr dazu lernst du in einem späteren Kapitel).

> [!NOTE]
> Der einzige technische Unterschied zwischen `struct` und `class` in C++ ist der Standard-Zugriffsschutz: Bei `struct` ist standardmäßig alles `public`, bei `class` ist standardmäßig alles `private`.

### Syntax einer Klassendefinition
Hier siehst du die schematische Struktur einer Klasse:

```cpp
class KlassenName {
private:
    // Interne Daten (Membervariablen) - von außen unsichtbar
    Type m_daten_member;

public:
    // Öffentliche Schnittstelle (Methoden)
    void tu_etwas();
};
```

> [!TIP]
> Es hat sich als Konvention etabliert, Membervariablen mit einem Präfix wie `m_` (für Member) oder einem Unterstrich am Ende (z. B. `daten_`) zu kennzeichnen. Das erhöht die Lesbarkeit und verhindert Namenskonflikte mit Parametern.

### Methoden definieren und Objekte benutzen
Eine **Methode** ist eine Funktion, die zu einer Klasse gehört. Du kannst sie entweder direkt innerhalb der Klasse definieren oder in der Klasse deklarieren und außerhalb (z. B. in einer `.cpp`-Datei) implementieren. Wenn du sie außerhalb definierst, musst du den Gültigkeitsbereichsoperator `::` verwenden:

```cpp
// Deklaration in der Klasse:
class Beispiel {
public:
    void methode();
};

// Definition außerhalb:
void Beispiel::methode() {
    // Implementierung
}
```

Um ein Objekt zu erzeugen und zu nutzen, verwendest du die vertraute Variablendeklaration und den Punkt-Operator (`.`):

```cpp
// Erzeugen eines Objekts
KlassenName mein_objekt;

// Aufruf einer öffentlichen Methode
mein_objekt.tu_etwas();
```

---

## 11.2 Konstruktoren

Ein **Konstruktor** ist eine spezielle Methode, die automatisch aufgerufen wird, wenn ein Objekt einer Klasse erstellt wird. Seine Hauptaufgabe ist es, das Objekt in einen gültigen Anfangszustand zu versetzen (z. B. Variablen mit Startwerten zu belegen oder Ressourcen anzufordern).

Eigenschaften eines Konstruktors:
*   Er trägt exakt denselben Namen wie die Klasse.
*   Er hat keinen Rückgabetyp (nicht einmal `void`).

### Die Memberinitialisierungsliste
Anstatt Werte im Rumpf des Konstruktors zuzuweisen, solltest du in C++ die **Memberinitialisierungsliste** bevorzugen. Diese wird nach der Parameterliste mit einem Doppelpunkt eingeleitet und initialisiert die Variablen direkt bei ihrer Entstehung, was effizienter ist und für manche Typen (wie Referenzen oder Konstanten) sogar zwingend erforderlich ist.

```cpp
// Schema der Memberinitialisierungsliste
KlassenName(Typ parameter1, Typ parameter2)
    : m_member1{parameter1}, m_member2{parameter2} 
{
    // Konstruktorrumpf (kann oft leer bleiben)
}
```

### Der Standardkonstruktor
Ein Konstruktor, der ohne Argumente aufgerufen werden kann, heißt **Standardkonstruktor** (Default Constructor). Wenn du gar keinen Konstruktor schreibst, generiert der Compiler automatisch einen für dich. Sobald du jedoch einen eigenen Konstruktor mit Parametern definierst, wird kein Standardkonstruktor mehr automatisch erzeugt. Du kannst ihn dann explizit mit `= default` anfordern:

```cpp
class Auto {
public:
    // Fordert den Standardkonstruktor explizit vom Compiler an
    Auto() = default; 
};
```

### Delegierende Konstruktoren
Wenn eine Klasse mehrere Konstruktoren hat, die ähnlichen Initialisierungscode ausführen, kann ein Konstruktor seine Arbeit an einen anderen Konstruktor derselben Klasse delegieren. Dies verhindert Code-Duplizierung.

```cpp
class Uhrzeit {
public:
    Uhrzeit(int stunden, int minuten) : m_stunden{stunden}, m_minuten{minuten} {}
    // Delegiert an den obigen Konstruktor:
    Uhrzeit(int stunden) : Uhrzeit{stunden, 0} {} 
};
```

### Das Schlüsselwort `explicit`
Wenn ein Konstruktor mit genau einem Argument aufgerufen werden kann, kann der Compiler diesen für implizite Typkonvertierungen nutzen. Das kann zu schwer auffindbaren Bugs führen. Mit dem Schlüsselwort `explicit` verhinderst du, dass der Compiler diese Umwandlung ungefragt vornimmt.

> [!IMPORTANT]
> Gewöhne dir an, Konstruktoren mit einem einzelnen Parameter standardmäßig als `explicit` zu deklarieren, es sei denn, du wünschst explizit eine implizite Konvertierung.

### Kopier- und Verschiebekonstruktoren (Move)
Objekte müssen manchmal kopiert oder verschoben werden:

1.  **Kopierkonstruktor**: Erstellt ein neues Objekt als exakte Kopie eines bestehenden Objekts. Er erwartet eine konstante Referenz auf ein Objekt desselben Typs (`const KlassenName&`).
2.  **Verschiebekonstruktor (Move-Konstruktor)**: Erlaubt es, Ressourcen (z. B. dynamisch allokierten Speicher) von einem temporären Objekt auf ein neues Objekt zu übertragen ("zu stehlen"), ohne sie teuer kopieren zu müssen. Er arbeitet mit einer R-Wert-Referenz (`KlassenName&&`).

---

## 11.3 Destruktoren

Ein **Destruktor** ist das Gegenstück zum Konstruktor. Er wird automatisch aufgerufen, wenn die Lebensdauer eines Objekts endet (z. B. wenn eine lokale Variable den Gültigkeitsbereich `{ }` verlässt oder dynamischer Speicher freigegeben wird).

### Eigenschaften des Destruktors:
*   Er hat denselben Namen wie die Klasse, beginnt jedoch mit einer Tilde (`~`).
*   Er hat keine Parameter und keinen Rückgabetyp.
*   Es kann pro Klasse nur genau einen Destruktor geben.

```cpp
class RessourcenManager {
public:
    ~RessourcenManager() {
        // Hier wird aufgeräumt (z. B. Dateien schließen, Speicher freigeben)
    }
};
```

### Wann ist ein Destruktor erforderlich?
Wenn deine Klasse Ressourcen besitzt, die nicht automatisch vom System verwaltet werden (z. B. rohe Zeiger auf dynamisch allokierten Speicher, geöffnete Netzwerk-Sockets oder Dateihandles), musst du im Destruktor dafür sorgen, dass diese Ressourcen wieder freigegeben werden. Dadurch verhinderst du Ressourcenlecks.

> [!NOTE]
> In modernem C++ nutzt man dafür das Prinzip **RAII** (Resource Acquisition Is Initialization). Standard-Ressourcen wie `std::vector` oder `std::unique_ptr` verwalten ihre Lebensdauer bereits selbst, weshalb du in vielen Fällen gar keinen eigenen Destruktor schreiben musst (Rule of Zero).

---

## 11.4 Weitere Formen von Methoden

### Inline-Methoden
Methoden, die direkt innerhalb der Klassendefinition implementiert werden, gelten implizit als `inline`. Das bedeutet, dass der Compiler versuchen kann, den Funktionsaufruf direkt durch den eigentlichen Code der Methode zu ersetzen, um den Overhead des Aufrufs zu sparen. Dies ist vor allem bei kleinen Getter- und Setter-Methoden sinnvoll.

### Konstante Methoden (const)
Wenn du garantieren möchtest, dass eine Methode das Objekt nicht verändert (d. h. keine Membervariablen modifiziert), markierst du sie mit dem Schlüsselwort `const` hinter der Parameterliste. 

```cpp
class Sensor {
private:
    double m_wert;
public:
    // Diese Methode liest nur und darf m_wert nicht verändern
    double lies_wert() const {
        return m_wert;
    }
};
```

> [!IMPORTANT]
> Auf `const`-Objekte können nur Methoden aufgerufen werden, die selbst als `const` deklariert sind. Deklariere daher jede Methode, die den Objektzustand nicht verändert, konsequent als `const`.

### Der `this`-Zeiger
Innerhalb jeder Methode einer Klasse existiert ein impliziter Zeiger namens `this`. Er zeigt auf das Objekt, für das die Methode gerade aufgerufen wurde. Du kannst `this` nutzen, um:
*   Namensgleichheiten zwischen Parametern und Membervariablen aufzulösen.
*   Das aktuelle Objekt als Referenz zurückzugeben (wichtig für Method-Chaining).

> [!NOTE]
> Seit C++23 gibt es mit **Deducing this** eine moderne Syntaxalternative, bei der der Objektparameter explizit als erster Parameter übergeben werden kann (z. B. `self`). Dies erleichtert fortgeschrittene OOP-Muster, für den Einstieg bleibt der klassische, implizite `this`-Zeiger jedoch die Grundlage.

---

## 11.5 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen `public` und `private` in einer C++-Klasse?
2. Warum sollte man die Memberinitialisierungsliste im Konstruktor anstelle einer Zuweisung im Rumpf verwenden?
3. Welche Aufgabe hat das Schlüsselwort `explicit` vor einem Konstruktor?
4. Was passiert mit einem Objekt und seinen Ressourcen, wenn es seinen Gültigkeitsbereich (Scope) verlässt?
5. Warum können konstante Methoden keine Membervariablen verändern? Welche Fehlermeldung könnte der Compiler erzeugen, wenn du es dennoch versuchst?

### Praktische Aufgaben (ohne Codelösungen)

#### Aufgabe 1: Die Würfel-Klasse
Entwirfe eine Klasse `Wuerfel`.
*   Sie soll die Anzahl der Seiten des Würfels als privaten Member speichern (z. B. standardmäßig 6).
*   Implementiere einen Konstruktor, mit dem man die Seitenanzahl festlegen kann. Stelle sicher, dass ungültige Seitenanzahlen (z. B. kleiner als 2) verhindert werden.
*   Schreibe eine Methode `werfen()`, die eine Zufallszahl zwischen 1 und der Seitenanzahl zurückgibt. Verwende hierzu die modernen C++-Zufallsgeneratoren aus dem Header `<random>`.
*   Schreibe eine Methode `get_seiten()` zum Abfragen der Seitenanzahl. Sollte diese Methode `const` sein?

#### Aufgabe 2: Ein einfaches Bankkonto
Entwirfe eine Klasse `BankKonto`.
*   Sie soll den Namen des Kontoinhabers (als `std::string`) und den aktuellen Kontostand (als `double` oder `long` in Cent) privat speichern.
*   Biete einen Konstruktor an, der den Inhaber und einen optionalen Startbetrag setzt.
*   Implementiere Methoden für `einzahlen` und `auszahlen`. Achte darauf, dass bei `auszahlen` nicht mehr Geld abgehoben werden kann, als auf dem Konto vorhanden ist (bzw. lege ein Dispolimit fest) und dass keine negativen Beträge übergeben werden können.
*   Schreibe eine Methode, die den aktuellen Kontostand formatiert auf der Konsole ausgibt (nutze hierfür `std::println`).
