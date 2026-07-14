# 14 Vererbung (Abgeleitete Klassen)

In diesem Kapitel erfährst du, wie du mithilfe von Vererbung bestehenden Code wiederverwendest, spezialisierst und erweiterst. Vererbung gehört zu den Grundpfeilern der objektorientierten Programmierung (OOP) und ermöglicht es dir, Hierarchien und logische Beziehungen zwischen Klassen abzubilden. Zudem lernst du, wie sich modernstes C++23 verhält und wie du mithilfe von Polymorphie flexiblen, erweiterbaren Code schreibst.

---

## 14.1 Grundlagen der Vererbung

### Was ist Vererbung?
In der realen Welt teilen viele Objekte gemeinsame Eigenschaften. Ein PKW, ein LKW und ein Motorrad sind allesamt Fahrzeuge. Sie besitzen einen Motor, eine Geschwindigkeit und können fahren. Dennoch hat jedes dieser Fahrzeuge eigene, spezifische Eigenschaften (ein LKW hat eine maximale Achslast, ein Cabrio ein Faltdach).

In der Softwareentwicklung wollen wir dieses Prinzip nachbilden, um doppelten Code zu vermeiden. Vererbung beschreibt eine **"Ist-ein"-Beziehung** (engl. *IS-A*):
* Ein Auto **ist ein** Fahrzeug.
* Ein Kreis **ist eine** geometrische Form.

Dies unterscheidet sich grundlegend von der **"Hat-ein"-Beziehung** (engl. *HAS-A*, auch Komposition genannt), bei der ein Objekt ein anderes Objekt als Member enthält (z. B. ein Auto *hat einen* Motor).

### Basisklasse und abgeleitete Klasse
* **Basisklasse (Elternklasse / Superklasse):** Die allgemeinere Klasse, die grundlegende Attribute und Funktionen definiert.
* **Abgeleitete Klasse (Kindklasse / Subklasse):** Die speziellere Klasse, die alle Eigenschaften der Basisklasse übernimmt (erbt) und durch eigene Attribute und Funktionen ergänzen (erweitern) kann.

### Syntax der Vererbung in C++
Um eine Klasse von einer anderen erben zu lassen, verwendest du nach dem Klassennamen einen Doppelpunkt, gefolgt von einem Zugriffsmodifizierer und dem Namen der Basisklasse:

```cpp
// Syntax-Template
class Basisklasse {
    // Gemeinsame Attribute und Methoden
};

class AbgeleiteteKlasse : public Basisklasse {
    // Zusätzliche Attribute und Methoden
};
```

> [!NOTE]
> Die abgeleitete Klasse besitzt nun automatisch alle Member-Variablen und Methoden der Basisklasse (abhängig von den Zugriffsrechten), ohne dass du diese erneut deklarieren musst.

---

## 14.2 Zugriffsrechte bei Vererbung

In C++ gibt es drei Zugriffsmodifizierer innerhalb von Klassen: `public`, `protected` und `private`. Bei der Vererbung spielen sie zwei Rollen:
1. Wie sind die Member in der Basisklasse geschützt?
2. Wie wird die Basisklasse abgeleitet (Sichtbarkeit der Vererbung)?

### Der Zugriffsmodifizierer `protected`
Du kennst bereits `public` (jeder hat Zugriff) und `private` (nur die Klasse selbst hat Zugriff).
* `protected` schließt die Lücke: Auf `protected`-Member kann die Klasse selbst sowie **jede von ihr abgeleitete Klasse** zugreifen. Von außen (z. B. in der `main`-Funktion) ist der direkte Zugriff jedoch verboten.

### Arten der Ableitung
Wenn du eine Klasse ableitest, bestimmt der Modifizierer vor dem Namen der Basisklasse (`public`, `protected` oder `private`), wie sich die Zugriffsrechte der geerbten Member in der abgeleiteten Klasse verändern:

```cpp
class Kind : public Parent { ... };
```

Hier ist eine Übersicht, wie sich die Zugriffsrechte der Basisklasse in der abgeleiteten Klasse verhalten:

| Sichtbarkeit in Basisklasse | public Ableitung (`public`) | protected Ableitung (`protected`) | private Ableitung (`private`) |
| :--- | :--- | :--- | :--- |
| **`public`** | bleibt `public` | wird `protected` | wird `private` |
| **`protected`** | bleibt `protected` | wird `protected` | wird `private` |
| **`private`** | unzugänglich | unzugänglich | unzugänglich |

> [!TIP]
> In der Praxis wird fast ausschließlich die **`public`-Vererbung** verwendet, da sie die klassische "Ist-ein"-Beziehung darstellt. `private`- und `protected`-Vererbung sind Spezialfälle (oft als "implementiert mittels"-Beziehung verstanden) und sollten nur mit gutem Grund eingesetzt werden.

---

## 14.3 Methoden überschreiben und Konstruktoren/Destruktoren in abgeleiteten Klassen

### Reihenfolge der Konstruktion und Destruktion
Wenn du ein Objekt einer abgeleiteten Klasse erstellst, muss zuerst die Basisklasse aufgebaut werden, da die abgeleitete Klasse auf deren Daten aufbaut.
* **Konstruktion:** Die Basisklasse wird zuerst konstruiert, danach die abgeleitete Klasse.
* **Destruktion:** Die abgeleitete Klasse wird zuerst destruiert, danach die Basisklasse (genau umgekehrt zur Konstruktion).

Stell dir das wie eine Zwiebel vor: Die innerste Schicht (Basisklasse) wird zuerst angelegt. Beim Abziehen (Destruieren) nimmst du die äußeren Schichten (abgeleitete Klasse) zuerst ab.

### Aufruf von Basisklassen-Konstruktoren
C++ versucht standardmäßig, den parameterlosen Standardkonstruktor der Basisklasse aufzurufen. Besitzt deine Basisklasse keinen Standardkonstruktor oder möchtest du einen bestimmten parametrisierten Konstruktor aufrufen, musst du diesen explizit in der **Initialisierungsliste** des Kind-Konstruktors aufrufen:

```cpp
// Prinzipskizze
AbgeleiteteKlasse(Typ parameter1, Typ parameter2)
    : Basisklasse(parameter1) // Expliziter Aufruf des Basis-Konstruktors
{
    // Eigene Initialisierungen für die abgeleitete Klasse
}
```

### Konstruktoren vererben mit `using`
Manchmal möchtest du, dass die abgeleitete Klasse exakt dieselben Konstruktoren anbietet wie die Basisklasse, ohne sie alle manuell neu zu schreiben. Seit C++11 (und unverändert im modernen C++23) kannst du dies mit dem `using`-Schlüsselwort tun:

```cpp
class AbgeleiteteKlasse : public Basisklasse {
public:
    using Basisklasse::Basisklasse; // Alle Konstruktoren der Basisklasse importieren
};
```

### Methoden überschreiben
Eine abgeleitete Klasse kann eine Methode der Basisklasse mit exakt demselben Namen und derselben Signatur neu definieren. Dies nennt man **Überschreiben (Overriding)**.
Wenn du die Methode aufrufst, wird standardmäßig die Version der abgeleiteten Klasse ausgeführt. Möchtest du innerhalb der überschriebenen Methode dennoch die Funktionalität der Basisklasse aufrufen, kannst du den Gültigkeitsbereichsoperator `::` nutzen:

```cpp
// Aufruf der Basisklassen-Implementierung innerhalb einer Methode der abgeleiteten Klasse
Basisklasse::methodenName();
```

---

## 14.4 Polymorphie (Vielgestaltigkeit)

Polymorphie ist die Fähigkeit, Objekte verschiedener Klassen einheitlich über eine gemeinsame Schnittstelle (Zeiger oder Referenzen auf die Basisklasse) anzusprechen, während zur Laufzeit das tatsächlich korrekte Verhalten der abgeleiteten Klasse ausgeführt wird.

### Dynamische Polymorphie und virtuelle Methoden
Standardmäßig führt C++ beim Aufruf einer Methode über einen Basisklassen-Zeiger die Methode der Basisklasse aus (statische Bindung). Um C++ mitzuteilen, dass die Methode der tatsächlich abgeleiteten Klasse aufgerufen werden soll (dynamische Bindung zur Laufzeit), deklarierst du die Methode in der Basisklasse als `virtual`.

```cpp
class Basisklasse {
public:
    virtual void zeigeInfo() const; // Virtuelle Methode
};
```

### Der `override`-Spezifizierer
Wenn du eine virtuelle Methode in einer abgeleiteten Klasse überschreibst, solltest du das Schlüsselwort `override` an das Ende der Methodendeklaration setzen:

```cpp
class AbgeleiteteKlasse : public Basisklasse {
public:
    void zeigeInfo() const override; // Signalisiert dem Compiler die Absicht zu überschreiben
};
```

Warum ist `override` so wichtig?
* Wenn du dich beim Namen oder den Parametertypen verschreibst (z. B. `const` vergisst), würde der Compiler ohne `override` annehmen, dass du eine neue, zusätzliche Methode erstellst.
* Mit `override` prüft der Compiler, ob tatsächlich eine virtuelle Methode der Basisklasse exakt übereinstimmt. Tut sie das nicht, bricht der Übersetzungsvorgang mit einer Fehlermeldung ab. Das schützt dich vor schwer auffindbaren Fehlern!

### Der virtuelle Destruktor – Ein absolutes MUSS
Sobald eine Klasse mindestens eine virtuelle Methode besitzt und als Basisklasse dient, **muss** ihr Destruktor ebenfalls `virtual` deklariert werden!

```cpp
class Basisklasse {
public:
    virtual ~Basisklasse() = default; // Virtueller Destruktor
};
```

> [!WARNING]
> Vergisst du den virtuellen Destruktor und löschst ein Objekt der abgeleiteten Klasse über einen Zeiger auf die Basisklasse (`Basisklasse* ptr = new AbgeleiteteKlasse(); delete ptr;`), wird nur der Destruktor der Basisklasse aufgerufen. Der Destruktor der abgeleiteten Klasse wird ignoriert, was zu unvollständigem Abbau und Speicherlecks führt!

### Der `final`-Spezifizierer
Mit `final` kannst du die Vererbungshierarchie einschränken:
1. **An einer Klasse:** Verhindert, dass andere Klassen von dieser Klasse erben können.
   `class LetzteKlasse final : public Basisklasse { ... };`
2. **An einer virtuellen Methode:** Verhindert, dass abgeleitete Klassen diese spezielle Methode weiter überschreiben können.
   `void methode() override final;`

### Abstrakte Klassen und rein virtuelle Methoden
Manchmal ist eine Basisklasse so allgemein, dass es keinen Sinn ergibt, Objekte von ihr zu erstellen. Ein Objekt vom Typ `Form` macht keinen Sinn – es muss ein konkreter `Kreis` oder ein `Rechteck` sein.

Eine Methode wird zu einer **rein virtuellen Methode (Pure Virtual Function)**, indem du `= 0` an ihre Deklaration anhängst:

```cpp
class Form {
public:
    virtual void zeichne() const = 0; // Rein virtuelle Methode
    virtual ~Form() = default;
};
```

* Eine Klasse, die mindestens eine rein virtuelle Methode enthält, nennt man **abstrakte Klasse**.
* Von einer abstrakten Klasse können **keine Objekte** instanziiert werden.
* Abgeleitete Klassen müssen alle rein virtuellen Methoden überschreiben, um selbst instanziiert werden zu können.

### Schnittstellen (Interfaces)
C++ hat kein eigenes Schlüsselwort `interface` wie andere Programmiersprachen. Stattdessen realisieren wir Schnittstellen über abstrakte Klassen, die:
* ausschließlich rein virtuelle Methoden enthalten (keine Member-Variablen außer ggf. statischen Konstanten),
* einen virtuellen Standard-Destruktor besitzen.

---

## 14.5 Mehrfachvererbung und das Diamant-Problem

In C++ kann eine abgeleitete Klasse von mehr als einer Basisklasse erben.

```cpp
class Smartphone : public Telefon, public Kamera { ... };
```

Obwohl dies mächtig ist, birgt es Gefahren wie Namenskollisionen (wenn beide Basisklassen eine Methode gleichen Namens haben).

### Das Diamant-Problem (Diamond Problem)
Das bekannteste Problem der Mehrfachvererbung entsteht, wenn zwei Klassen von derselben Basisklasse erben und eine vierte Klasse wiederum von beiden erbt.

```
       [ A ]  (Ur-Basisklasse)
      /     \
    [ B ]   [ C ]
      \     /
       [ D ]  (Mehrfach abgeleitet)
```

Wenn Klasse `A` ein Attribut `x` besitzt, besitzt Klasse `D` dieses Attribut nun doppelt (einmal über den Pfad `A -> B -> D` und einmal über `A -> C -> D`). Dies führt zu Mehrdeutigkeiten bei der Verwendung und unnötigem Speicherverbrauch.

### Virtuelle Basisklassen als Rettung
Um das Diamant-Problem zu lösen, müssen die mittleren Klassen (`B` und `C`) virtuell von der Ur-Basisklasse (`A`) erben. Das signalisiert dem Compiler, dass die Ur-Basisklasse nur ein einziges Mal in der finalen abgeleiteten Klasse existieren soll.

```cpp
// Syntax-Konzept zur Lösung des Diamant-Problems
class UrBasis { ... };
class BasisLinks : virtual public UrBasis { ... };
class BasisRechts : virtual public UrBasis { ... };
class KindKlasse : public BasisLinks, public BasisRechts { ... };
```

---

## 14.6 Implizite und explizite Typumwandlung bei abgeleiteten Klassen

### Upcasting
Unter *Upcasting* versteht man das Konvertieren eines Zeigers oder einer Referenz einer abgeleiteten Klasse in einen Zeiger oder eine Referenz auf ihre Basisklasse.
* Da eine abgeleitete Klasse alle Eigenschaften der Basisklasse besitzt, ist diese Umwandlung immer sicher.
* Sie erfolgt **implizit** (du brauchst keinen speziellen Cast-Operator).

### Downcasting und `dynamic_cast`
Unter *Downcasting* versteht man das Konvertieren von einer Basisklasse zurück zu einer abgeleiteten Klasse. Dies ist potenziell unsicher, da ein Basisklassen-Zeiger zur Laufzeit nicht zwingend auf die erwartete Kindklasse zeigen muss.

Für sicheres Downcasting zur Laufzeit bietet C++ den Operator `dynamic_cast`.

```cpp
// Anwendungsschema
Basisklasse* basisPtr = ...;
AbgeleiteteKlasse* kindPtr = dynamic_cast<AbgeleiteteKlasse*>(basisPtr);
```

Wie verhält sich `dynamic_cast`?
1. **Bei Zeigern:**
   * Ist die Umwandlung gültig, wird der konvertierte Zeiger zurückgegeben.
   * Ist die Umwandlung ungültig, gibt `dynamic_cast` `nullptr` zurück. Du solltest das Ergebnis also immer auf `nullptr` prüfen!
2. **Bei Referenzen:**
   * Da es keine "Null-Referenzen" gibt, wirft `dynamic_cast` bei Fehlschlag eine Ausnahme vom Typ `std::bad_cast`.

> [!IMPORTANT]
> `dynamic_cast` funktioniert nur bei **polymorphischen Klassen**, das heißt, die Basisklasse muss mindestens eine virtuelle Methode (üblicherweise den Destruktor) besitzen. Der Compiler benötigt dies, um Typinformationen zur Laufzeit (RTTI - Run-Time Type Information) abzufragen.

---

## 14.7 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen einer "Ist-ein"-Beziehung und einer "Hat-ein"-Beziehung? Nenne jeweils ein Beispiel.
2. Welche Sichtbarkeit besitzt ein Member in einer abgeleiteten Klasse, wenn er in der Basisklasse als `protected` deklariert wurde und die Ableitung `public` erfolgte? Was passiert bei einer `private`-Ableitung?
3. Warum muss der Destruktor einer Basisklasse virtuell sein, wenn die Klasse polymorph genutzt wird?
4. Was ist eine rein virtuelle Methode und was folgt daraus für die Instanziierung der Klasse?
5. Wie unterscheidet sich das Verhalten von `dynamic_cast` bei Zeigern im Vergleich zu Referenzen im Fehlerfall?

### Praktische Aufgaben

> [!TIP]
> Verwende für die Ausgaben in deinen Programmen den modernen C++23-Standard mit `import std;` und `std::println`.

#### Aufgabe 1: Die Tierhierarchie
Entwirf eine Hierarchie von Klassen, die Tiere repräsentieren.
1. Erstelle eine abstrakte Basisklasse `Tier`. Sie soll ein Attribut für den Namen des Tiers enthalten sowie eine rein virtuelle Methode `macheGeräusch()`.
2. Leite mindestens zwei konkrete Klassen ab (z. B. `Hund` und `Katze`). Implementiere in diesen Klassen die Methode `macheGeräusch()` so, dass ein passender Text ausgegeben wird.
3. Schreibe eine Funktion, die ein Array oder einen Vektor von Zeigern auf die Basisklasse `Tier` entgegennimmt und für jedes Tier das entsprechende Geräusch abspielt. Stelle sicher, dass kein Speicherleck entsteht!

#### Aufgabe 2: Das Diamant-Problem lösen
Erstelle eine Struktur, die das Diamant-Problem demonstriert und löst.
1. Definiere eine Basisklasse `Gerät` mit einer Methode `einschalten()`.
2. Erstelle zwei abgeleitete Klassen `Drucker` und `Scanner`, die virtuell von `Gerät` erben.
3. Erstelle eine vierte Klasse `Multifunktionsdrucker`, die von `Drucker` und `Scanner` erbt.
4. Teste in einem Hauptprogramm, ob sich ein objekt der Klasse `Multifunktionsdrucker` fehlerfrei einschalten lässt und die Methode `einschalten()` eindeutig aufgerufen werden kann.

#### Aufgabe 3: Der sichere Museumsbesucher (`dynamic_cast`)
Simuliere ein Einlasssystem für ein Museum mit verschiedenen Besuchertypen.
1. Erstelle eine Basisklasse `Besucher` mit einem virtuellen Destruktor.
2. Leite eine Klasse `StandardBesucher` und eine Klasse `PremiumBesucher` davon ab.
3. Die Klasse `PremiumBesucher` besitzt eine zusätzliche Methode `nutzeVIPLounge()`.
4. Schreibe eine Funktion `gewähreZutritt(Besucher* b)`, die überprüft, ob es sich bei dem übergebenen Besucher um einen `PremiumBesucher` handelt. Falls ja, soll die Methode `nutzeVIPLounge()` aufgerufen werden. Nutze hierfür `dynamic_cast` und fange eventuelle `nullptr`-Fälle sicher ab.
