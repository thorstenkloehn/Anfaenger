# 12 Objekte und Klassenelemente

Klassen sind die Baupläne für deine Datenstrukturen, aber erst die **Objekte** erwecken diese Baupläne zum Leben. In diesem Kapitel vertiefen wir dein Verständnis dafür, wie Objekte miteinander interagieren, wie sie im Speicher verwaltet werden und wie du die volle Kontrolle über ihren Lebenszyklus behältst. 

Wir orientieren uns dabei am modernen Standard **C++23**, der dir durch ausgereifte Module (`import std;`) und ausdrucksstarke Ausgabefunktionen wie `std::println` das Schreiben von sauberem Code so einfach wie nie zuvor macht.

---

## 12.1 Objekte als Parameter

Wenn du ein Objekt an eine Funktion oder Methode übergibst, entscheidest du darüber, wie C++ mit dem Speicher und der Rechenzeit umgeht. Hierbei gibt es zwei grundlegende Wege:

### Übergabe per Wert (*Call-by-Value*)
Übergibst du ein Objekt per Wert, wird eine **Kopie** des gesamten Objekts erstellt. 
* **Analogie:** Stell dir vor, du möchtest jemandem ein Buch zeigen. Bei *Call-by-Value* kopierst du jede einzelne Seite des Buches am Kopierer und gibst der Person den neuen Stapel Papier. Das Original bleibt sicher bei dir.
* **Problem:** Für große Klassen mit vielen Attributen oder dynamischem Speicher ist das Kopieren extrem teuer und verlangsamt dein Programm unnötig.

### Übergabe per Referenz (*Call-by-Reference*)
Hierbei übergibst du dem Empfänger eine Referenz (einen Aliasnamen) auf das bereits existierende Objekt.
* **Analogie:** Statt das Buch zu kopieren, sagst du der Person einfach: „Da drüben im Regal steht das Buch, schau es dir an.“
* **Die `const`-Referenz (`const T&`):** Da der Empfänger das Original im Regal direkt vor sich hat, könnte er theoretisch darin herumschreiben. Um das zu verhindern, nutzt du fast immer das Schlüsselwort `const`. Eine konstante Referenz erlaubt schnelles Lesen ohne Kopieraufwand, verbietet aber jegliche Modifikation.

> [!TIP]
> **Die Faustregel für C++23:** 
> Übergib kleine, primitive Typen (wie `int`, `double`, `char`) per Wert. Übergib eigene Klassenobjekte standardmäßig als **konstante Referenz** (`const MeineKlasse&`), es sei denn, du musst das Original in der Funktion explizit verändern.

#### Syntaktisches Schema

So sieht die Deklaration von Funktionen mit unterschiedlichen Übergabearten aus:

```cpp
// Übergabe per Wert: Erzeugt eine Kopie
void verarbeite_kopie(MeinObjekt obj);

// Übergabe per konstanter Referenz: Effizient und leseschützend (Standard)
void zeige_objekt(const MeinObjekt& obj);

// Übergabe per veränderlicher Referenz: Erlaubt Modifikationen am Original
void modifiziere_objekt(MeinObjekt& obj);
```

---

## 12.2 Freundfunktionen und Freundklassen (`friend`)

Das Prinzip der **Kapselung** besagt, dass interne Details einer Klasse (ihre `private`- und `protected`-Elemente) vor der Außenwelt geschützt sein sollten. Manchmal gibt es jedoch eng verwandte Funktionen oder Klassen, die einen direkten Zugriff auf diese Interna benötigen, um effizient arbeiten zu können. Hier kommt das Schlüsselwort `friend` ins Spiel.

* **Freundfunktion:** Eine freie Funktion, die außerhalb der Klasse steht, aber das Recht besitzt, auf alle privaten Member der Klasse zuzugreifen.
* **Freundklasse:** Eine andere Klasse, deren Methoden alle privaten Elemente der befreundeten Klasse einsehen und verändern dürfen.

> [!IMPORTANT]
> **Freundschaft ist einseitig und nicht vererbbar!**
> Wenn Klasse A Klasse B als Freund deklariert, darf B auf A zugreifen. A darf aber nicht automatisch auf B zugreifen. Zudem gilt: Der Freund deines Freundes ist *nicht* dein Freund.

### Wann nutzt man `friend`?
Ein klassischer Anwendungsfall ist die Überladung von Operatoren (z. B. der Ausgabeoperator `<<` für `std::cout` oder andere Streams), damit diese direkt auf die privaten Daten deiner Klasse zugreifen können, ohne dass du dafür öffentliche Getter-Methoden schreiben musst.

#### Syntaktisches Schema

```cpp
class MeineKlasse {
private:
    int m_geheimnis{42};

    // Deklaration einer befreundeten Funktion
    friend void lüfte_geheimnis(const MeineKlasse& obj);

    // Deklaration einer befreundeten Klasse
    friend class PartnerKlasse;
};
```

---

## 12.3 Objekte einer Klasse als Rückgabewerte

Genau wie bei Parametern stellt sich auch bei Rückgabewerten die Frage: Wert oder Referenz?

### Rückgabe per Wert (*Return-by-Value*)
Wenn eine Funktion ein neues Objekt erstellt, gibt sie dieses standardmäßig per Wert zurück. 
* **Keine Sorge wegen der Performance:** Modernes C++ nutzt hier die sogenannte **RVO (Return Value Optimization)** sowie die *Move-Semantik*. Der Compiler optimiert das Kopieren fast immer komplett weg. Das Objekt wird direkt an der Stelle im Speicher konstruiert, wo der Aufrufer es erwartet.

### Rückgabe per Referenz (*Return-by-Reference*)
Du darfst eine Referenz zurückgeben, wenn das referenzierte Objekt **außerhalb** der Funktion weiterlebt. Das ist oft bei Methoden der Fall, die eine Referenz auf ein internes Attribut der Klasse zurückgeben (z. B. ein Getter, der direkten Lesezugriff erlaubt).

> [!WARNING]
> **Dangling Reference Gefahr!**
> Gib niemals eine Referenz auf ein lokales Objekt zurück, das innerhalb der Funktion erstellt wurde. Sobald die Funktion endet, wird dieses lokale Objekt vom Stack gelöscht. Die zurückgegebene Referenz zeigt dann ins Leere (undefiniertes Verhalten!).

#### Syntaktisches Schema

```cpp
class DatenKapsel {
private:
    std::string m_text;

public:
    // Sicher: Gibt eine konstante Referenz auf ein langlebiges Attribut zurück
    const std::string& hole_text() const;

    // Sicher: Erstellt ein neues Objekt und gibt es per Wert zurück (RVO greift)
    std::string erstelle_neuen_text();
};
```

---

## 12.4 Arrays und Vektoren von Objekten

Wenn du mehrere Objekte desselben Typs verwalten möchtest, nutzt du in modernem C++ Container. 

### Der Vektor (`std::vector`)
`std::vector` ist das dynamische Standard-Array in C++. Es passt seine Größe automatisch an.
* Wenn du einen Vektor von Objekten erstellst, ruft C++ für jedes Element den entsprechenden Konstruktor auf.
* Beim Hinzufügen von Elementen (z. B. über `push_back` oder das effizientere `emplace_back`) können Objekte kopiert oder verschoben werden, wenn der Vektor im Hintergrund neuen Speicher reservieren muss.

### Das statische Array (`std::array`)
Falls die Anzahl der Objekte bereits zur Kompilierzeit feststeht, ist `std::array` die speicherschonendere und schnellere Alternative, da es keinen dynamischen Heap-Speicher benötigt.

> [!NOTE]
> Wenn du einen Container mit Objekten anlegst, müssen diese Objekte in der Regel einen Standardkonstruktor besitzen (also einen Konstruktor, der ohne Argumente aufgerufen werden kann), sofern du die Größe des Containers initial vorgibst.

#### Syntaktisches Schema

```cpp
// Ein dynamischer Container für mehrere Objekte
std::vector<MeineKlasse> meine_objekte;

// Ein statischer Container mit fester Größe zur Kompilierzeit
std::array<MeineKlasse, 5> feste_objekte;
```

---

## 12.5 Dynamische Objekte

Objekte können auf zwei Arten im Speicher angelegt werden:

1. **Auf dem Stack (automatische Lebensdauer):**
   * Werden lokal in einer Funktion oder einem Block `{}` deklariert.
   * Werden automatisch zerstört, sobald der Gültigkeitsbereich verlassen wird.
   * Schnell und sicher.
2. **Auf dem Heap (dynamische Lebensdauer):**
   * Werden zur Laufzeit dynamisch angefordert.
   * Bleiben so lange im Speicher, bis sie explizit wieder freigegeben werden.

> [!CAUTION]
> **Nutze im modernen C++23 niemals direkt `new` und `delete`!**
> Manuelles Speichermanagement führt fast immer zu Speicherlecks (*Memory Leaks*) oder Abstürzen. Nutze stattdessen immer **Smart Pointer** (siehe Abschnitt 12.6), um die Lebensdauer dynamischer Objekte automatisch zu verwalten.

---

## 12.6 Klassenobjekte, Container und Smart Pointer als Klassenattribute

Eine Klasse kann andere Klassen als Attribute besitzen. Dies nennt man **Komposition** (eine „Hat-ein“-Beziehung). Ein Auto *hat einen* Motor, eine Schule *hat eine* Liste von Schülern.

Dabei kannst du verschiedene Typen von Attributen kombinieren:

1. **Direkte Klassenobjekte:** Das Objekt wird direkt im Speicherbereich des Elternobjekts angelegt.
2. **Containerklassen:** Deine Klasse kann z. B. einen `std::vector` besitzen, um eine dynamische Menge an Unterobjekten zu verwalten.
3. **Smart Pointer:**
   * `std::unique_ptr`: Drückt **exklusiven Besitz** aus. Nur dieses eine Klassenobjekt besitzt die dynamische Ressource. Wird das Elternobjekt zerstört, wird auch die Ressource automatisch freigegeben.
   * `std::shared_ptr`: Drückt **geteilten Besitz** aus. Mehrere Objekte können sich die Ressource teilen. Erst wenn der letzte Zeiger darauf gelöscht wird, wird die Ressource freigegeben.

#### Syntaktisches Schema

```cpp
class Motor { /* ... */ };

class Auto {
private:
    Motor m_motor;                                     // Direktes Objekt als Attribut
    std::vector<std::string> m_insassen;               // Container als Attribut
    std::unique_ptr<Steuergeraet> m_steuergeraet;      // Smart Pointer auf eine dynamische Ressource
};
```

---

## 12.7 Statische und konstante Klassenelemente

Klassenelemente (Attribute und Methoden) können mit speziellen Eigenschaften versehen werden, um ihr Verhalten zu steuern.

### Statische Attribute (`static`)
Ein statisches Attribut existiert genau **einmal** für die gesamte Klasse, unabhängig davon, wie viele Objekte du von dieser Klasse erstellst. Alle Objekte teilen sich diese eine Variable.
* **C++-Tipp:** Nutze `inline static` (seit C++17), um statische Variablen direkt in der Klassendefinition zu initialisieren, ohne eine zusätzliche Definition in einer `.cpp`-Datei zu benötigen.

### Statische Methoden
Statische Methoden können aufgerufen werden, ohne dass ein Objekt der Klasse existiert. Da sie an kein konkretes Objekt gebunden sind, besitzen sie keinen `this`-Zeiger und können ausschließlich auf statische Attribute oder andere statische Methoden der Klasse zugreifen.

### Konstante Klassenelemente (`const` / `constexpr`)
* **`const`-Attribute:** Variablen, die nach ihrer Initialisierung im Konstruktor nicht mehr verändert werden dürfen.
* **`constexpr`-Attribute:** Konstanten, deren Wert bereits zur Kompilierzeit feststeht. Sie sind implizit auch statisch (`static constexpr`).

#### Syntaktisches Schema

```cpp
class Universum {
public:
    // Statische Konstante, zur Kompilierzeit bekannt
    static constexpr double Lichtgeschwindigkeit = 299792458.0;

    // Statische Variable, die über alle Instanzen hinweg geteilt wird
    inline static int s_anzahl_beobachter{0};

    // Statische Methode (benötigt kein Objekt zum Aufruf)
    static int hole_beobachter_anzahl();

private:
    const int m_galaxie_id; // Konstantes Attribut, individuell pro Instanz im Konstruktor gesetzt
};
```

---

## 12.8 Die Rule of Zero (Nullregel) und die "Großen Fünf" (Big Five)

C++ bietet dir die volle Kontrolle darüber, was passiert, wenn ein Objekt erzeugt, kopiert, verschoben oder zerstört wird. Diese Aktionen werden durch fünf spezielle Elementfunktionen gesteuert:

1. **Destruktor (`~Klasse()`):** Wird aufgerufen, wenn das Objekt das Ende seiner Lebensdauer erreicht. Hier werden Ressourcen (wie geöffnete Dateien oder Netzwerkschnittstellen) freigegeben.
2. **Kopierkonstruktor (`Klasse(const Klasse&)`):** Initialisiert ein neues Objekt als Kopie eines existierenden Objekts.
3. **Kopierzuweisungsoperator (`operator=(const Klasse&)`):** Kopiert die Werte eines existierenden Objekts in ein anderes, bereits existierendes Objekt.
4. **Verschiebekonstruktor (`Klasse(Klasse&&)`):** „Stiehlt“ die Ressourcen eines temporären Objekts, anstatt sie teuer zu kopieren. Das temporäre Objekt wird in einen leeren, aber gültigen Zustand versetzt.
5. **Verschiebezuweisungsoperator (`operator=(Klasse&&)`):** Überträgt die Ressourcen eines Objekts auf ein anderes bereits existierendes Objekt mittels Move-Semantik.

### Die Rule of Zero (Die Nullregel)
Dies ist das wichtigste Designprinzip im modernen C++:
> **Schreibe keine der fünf oben genannten Funktionen selbst, wenn du es vermeiden kannst.**
> Wenn deine Klasse nur Attribute besitzt, die ihr Speichermanagement selbst beherrschen (wie `std::string`, `std::vector` or Smart Pointer), generiert der Compiler alle fünf Funktionen automatisch und fehlerfrei für dich.

### Die Rule of Five (Die Fünferregel)
Wenn du für deine Klasse *eine* der fünf Funktionen explizit selbst implementieren musst (z. B. weil du eine alte C-Bibliothek ansprichst und einen rohen Zeiger manuell verwalten musst), dann musst du mit sehr hoher Wahrscheinlichkeit **alle fünf** implementieren, um Speicherlecks und undefiniertes Verhalten zu verhindern.

#### Syntaktisches Schema der "Großen Fünf"

```cpp
class RessourcenVerwalter {
public:
    // 1. Destruktor
    ~RessourcenVerwalter() noexcept;

    // 2. Kopierkonstruktor
    RessourcenVerwalter(const RessourcenVerwalter& other);

    // 3. Kopierzuweisungsoperator
    RessourcenVerwalter& operator=(const RessourcenVerwalter& other);

    // 4. Verschiebekonstruktor (Move)
    RessourcenVerwalter(RessourcenVerwalter&& other) noexcept;

    // 5. Verschiebezuweisungsoperator (Move)
    RessourcenVerwalter& operator=(RessourcenVerwalter&& other) noexcept;
};
```

---

## 12.9 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Warum sollte man Objekte standardmäßig als `const T&` und nicht per Wert (`T`) an Funktionen übergeben?
2. Was unterscheidet eine Freundfunktion (`friend`) von einer regulären Mitgliedsfunktion (Methode) einer Klasse?
3. Warum ist die Rückgabe einer Referenz auf eine lokale Funktionsvariable gefährlich und was passiert dabei im Speicher?
4. Welche Aufgabe hat die *Rule of Zero* und warum erleichtert sie die Programmierung in modernem C++?
5. Was ist der Unterschied zwischen dem Kopieren und dem Verschieben (Move) eines Objekts?
6. Wann macht es Sinn, ein Attribut als `static` zu deklarieren?

### Aufgaben (Ohne fertige Codelösungen!)

#### Aufgabe 1: Die Zählklasse (Statische Elemente)
Entwirf eine Klasse (z. B. `Benutzer`), die bei jeder Erstellung einer neuen Instanz einen globalen Zähler erhöht und bei der Zerstörung des Objekts diesen Zähler wieder verringert.
* Nutze ein statisches Attribut für den Zähler.
* Stelle eine statische Methode bereit, um den aktuellen Zählerstand abzufragen.
* Teste das Verhalten, indem du Objekte in verschiedenen Gültigkeitsbereichen `{}` erstellst und zerstörst.

#### Aufgabe 2: Die Gerät-Klasse (Die Großen Fünfe testen)
Entwirf eine Klasse `Geraet`, die eine Ressource (z. B. eine ID oder einen Namen als `std::string`) verwaltet. 
* Deklariere die großen Fünf (Destruktor, Kopierkonstruktor, Kopierzuweisung, Verschiebekonstruktor, Verschiebezuweisung).
* Füge in jede dieser Funktionen eine Textausgabe mit `std::println` ein, die den Namen der aktuell ausgeführten Funktion auf der Konsole ausgibt.
* Schreibe ein kurzes Test-Szenario, in dem du:
  1. Ein Objekt normal erstellst.
  2. Es kopierst.
  3. Es einem anderen Objekt zuweist.
  4. Es mithilfe von `std::move` verschiebst.
* Beobachte die Konsolenausgaben, um zu verstehen, wann welche Methode vom Compiler aufgerufen wird.

#### Aufgabe 3: Komposition und Vektoren
Erstelle ein Modell für eine `Bibliothek`.
* Entwirf eine Klasse `Buch`.
* Entwirf die Klasse `Bibliothek`, die als Attribut einen `std::vector` von `Buch`-Objekten besitzt.
* Schreibe Methoden in `Bibliothek`, um neue Bücher hinzuzufügen und alle vorhandenen Bücher auf der Konsole auszugeben. 
* Achte darauf, wie du die Bücher an die Funktionen übergibst (Vermeidung von unnötigen Kopien!).
