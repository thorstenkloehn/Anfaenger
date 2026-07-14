# 10 Strukturen, Aufzählungen und dynamische Speicherobjekte

Bisher hast du mit den grundlegenden Datentypen gearbeitet, die C++ dir standardmäßig zur Verfügung stellt – wie `int` für ganze Zahlen, `double` für Kommazahlen oder `std::string` für Texte. Doch in der realen Softwareentwicklung reichen diese einfachen Typen selten aus. Stell dir vor, du möchtest ein Adressbuch programmieren: Eine Adresse besteht aus einem Vornamen, einem Nachnamen, einer Straße, einer Hausnummer und einer Postleitzahl. Es wäre extrem unpraktisch, diese Daten stets in einzelnen, unzusammenhängenden Variablen zu verwalten.

In diesem Kapitel lernst du, wie du deine eigenen, maßgeschneiderten Datentypen definierst, wie du Zustände mithilfe von Aufzählungen sauber verwaltest und wie C++ den Arbeitsspeicher organisiert. Zudem werfen wir einen Blick hinter die Kulissen der Speicherverwaltung und schauen uns an, wie moderne Hilfsmittel (sogenannte Smart Pointer) dir dabei helfen, Fehler im Umgang mit dem Arbeitsspeicher von vornherein zu vermeiden.

---

## 10.1 Erste eigene Datentypen mit Strukturen

Eine Struktur (in C++ mit dem Schlüsselwort `struct` deklariert) erlaubt es dir, mehrere Variablen unterschiedlicher Datentypen zu einer neuen logischen Einheit zusammenzufassen. Die einzelnen Variablen innerhalb einer Struktur nennen wir **Member** (oder Mitglieder).

### Eine Struktur definieren und initialisieren

Um eine Struktur zu definieren, beschreibst du ihren Bauplan. Dieser Bauplan belegt selbst noch keinen Speicherplatz – er teilt dem Compiler lediglich mit, wie ein Objekt dieses Typs aufgebaut sein soll.

Hier ist die grundlegende Syntaxschablone für eine Struktur:

```cpp
struct MeinDatentyp {
    Typ1 memberVariable1;
    Typ2 memberVariable2;
}; // WICHTIG: Das Semikolon am Ende ist zwingend erforderlich!
```

Sobald die Struktur definiert ist, kannst du Variablen dieses Typs erstellen. Im modernen C++ (insbesondere ab C++20, was wir in unserem C++23-Standard nutzen) nutzt man hierfür gerne die sogenannte **Designated Initialisierung** (benannte Initialisierung). Das macht den Code extrem lesbar, da du direkt siehst, welcher Wert welchem Member zugewiesen wird.

Ein schematisches Beispiel:

```cpp
MeinDatentyp objektName {
    .memberVariable1 = wert1,
    .memberVariable2 = wert2
};
```

> [!TIP]
> Die Designated Initializers müssen in genau der gleichen Reihenfolge angegeben werden, in der die Member in der `struct`-Definition deklariert wurden.

### Zugriff auf Member

Um auf die einzelnen Werte einer Struktur zuzugreifen (sie zu lesen oder zu verändern), verwendest du den **Punkt-Operator** (`.`).

```cpp
// Wert auslesen
auto wert = objektName.memberVariable1;

// Wert ändern
objektName.memberVariable2 = neuerWert;
```

### Strukturen in Vektoren und Arrays

Da eine Struktur ein vollwertiger Datentyp ist, kannst du sie wie jeden anderen Typ in Containern wie `std::vector` verwenden. Das ermöglicht es dir, komplexe Datenlisten aufzubauen.

Die Definition eines solchen Vektors sieht schematisch so aus:

```cpp
import std;

// Ein Vektor, der Objekte deiner Struktur speichert
std::vector<MeinDatentyp> meineListe;
```

Du kannst Elemente zu diesem Vektor hinzufügen, indem du neue Instanzen der Struktur erzeugst und sie (beispielsweise mit `.push_back()`) anhängst.

### Structured Bindings

Manchmal möchtest du die Member einer Struktur in einzelne Variablen entpacken. Hierfür bietet C++ seit C++17 die **Structured Bindings** (strukturierte Bindungen) an, die wir in unserem C++23-Standard vollumfänglich nutzen können:

```cpp
auto [var1, var2] = objektName;
```

> [!NOTE]
> **Ausblick auf C++26:**
> In zukünftigen C++-Standards (ab C++26) wird es voraussichtlich möglich sein, unbenannte Platzhalter mit dem Unterstrich `_` zu verwenden (z. B. `auto [wichtigesElement, _] = objektName;`), um nicht benötigte Variablen ohne Compiler-Warnungen zu ignorieren. In unserem C++23-Standard müssen wir noch alle Variablen beim Entpacken regulär benennen.

### Methoden in Strukturen

Strukturen in C++ können weit mehr als nur Daten speichern. Du kannst ihnen auch eigene Funktionen spendieren, die man dann **Methoden** nennt. Diese Methoden haben direkten Zugriff auf die Membervariablen der Struktur, ohne dass du das Objekt selbst als Parameter übergeben musst.

```cpp
struct Person {
    std::string name;
    
    // Eine Methode innerhalb der Struktur
    void gruessen() const {
        // Kann direkt auf 'name' zugreifen
    }
};
```

### Strukturen vergleichen

Möchtest du zwei Objekte einer Struktur miteinander vergleichen (z. B. auf Gleichheit mit `==`), macht C++ das standardmäßig nicht automatisch, da der Compiler nicht weiß, wie ein sinnvoller Vergleich für deine Daten aussieht.

Seit C++20 kannst du dem Compiler jedoch mitteilen, dass er einen Standardvergleich generieren soll. Dazu nutzt man den Drei-Wege-Vergleichsoperator (auch "Spaceship-Operator" genannt: `<=>`) oder den Gleichheitsoperator mit `= default`:

```cpp
struct Punkt {
    int x;
    int y;Prefix

    // Erzeugt automatisch alle Vergleichsoperatoren (==, !=, <, >, <=, >=)
    auto operator<=>(const Punkt&) const = default;
};
```

---

## 10.2 Der Aufzählungstyp enum

Häufig gibt es in Programmen Variablen, die nur eine feste Menge von Zuständen annehmen dürfen – zum Beispiel Wochentage (Montag bis Sonntag), Ampelphasen (Rot, Gelb, Grün) oder Himmelsrichtungen (Nord, Ost, Süd, West). Hierfür verwendet man Aufzählungstypen (`enum`).

### Klassisches enum (nicht empfohlen)

In älterem C++-Code (und in C) deklarierte man Enums einfach so:

```cpp
enum Ampel Phase {
    ROT,
    GELB,
    GRUEN
};
```

**Das Problem dabei:** Die Namen der Zustände (`ROT`, `GELB`, `GRUEN`) landen im globalen Namensraum. Wenn du nun ein anderes Enum mit dem Namen `Farbe` definierst, das ebenfalls `ROT` enthält, kommt es zu einem Namenskonflikt. Zudem konvertiert C++ klassische Enums gerne ungefragt in einfache Ganzzahlen (`int`), was zu schwer auffindbaren Logikfehlern führen kann.

### Typisierte enum class (Scoped Enums)

Im modernen C++ nutzt man daher fast ausschließlich **`enum class`** (auch "Scoped Enums" genannt). Diese lösen beide Probleme:
1. Die Werte sind im Namensraum des Enums gekapselt.
2. Es findet keine implizite (automatische) Konvertierung in Zahlen statt.

```cpp
enum class Ampel {
    Rot,
    Gelb,
    Gruen
};
```

Um einen Wert aus einer `enum class` zu nutzen, musst du den Scope-Operator (`::`) verwenden:

```cpp
Ampel aktuelleAmpelPhase = Ampel::Rot;
```

Möchtest du einen solchen Wert doch einmal als Zahl ausgeben oder verarbeiten, musst du ihn explizit mit `static_cast` umwandeln:

```cpp
int numerischerWert = static_cast<int>(Ampel::Rot);
```

---

## 10.3 Eigene Namen mit type aliases

C++-Datentypen können manchmal sehr lang und unübersichtlich werden. Stell dir vor, du hast einen Vektor, der Paare aus Strings und Listen von Zahlen speichert. Der Typname wäre gigantisch.

Um deinen Code lesbarer zu gestalten, kannst du Typ-Aliase (alternative Namen für bestehende Typen) definieren. Im modernen C++ verwendet man dafür das Schlüsselwort `using`.

```cpp
using NeuerName = ExistierenderTyp;
```

Ein konkretes Beispiel zur Veranschaulichung:

```cpp
// Statt immer 'unsigned long long' schreiben zu müssen:
using RiesigeZahl = unsigned long long;

// Statt eines unübersichtlichen Vektortyps:
using PersonenListe = std::vector<Person>;
```

> [!NOTE]
> Ein Typ-Alias erzeugt keinen neuen Datentyp. Er ist lediglich ein alternativer Name (ein Synonym) für einen bereits existierenden Typen. Der Compiler behandelt beide absolut identisch.

In älterem Code wirst du noch die C-Variante mit `typedef` finden (z. B. `typedef int MeinInt;`). Nutze in eigenem Code stattdessen immer `using`, da die Syntax intuitiver ist und auch mit Templates funktioniert.

---

## 10.4 Dynamische Speicherobjekte

Wenn du eine Variable wie `int x = 5;` deklarierst, wird der Speicher dafür automatisch auf dem sogenannten **Stack** (Stapelspeicher) reserviert und wieder freigegeben, sobald der aktuelle Gültigkeitsbereich (Scope, begrenzt durch `{}`) verlassen wird. Das ist extrem schnell und sicher.

Manchmal weißt du beim Schreiben des Codes jedoch noch nicht, wie viel Speicher du zur Laufzeit benötigst, oder du möchtest, dass ein Objekt länger lebt als die Funktion, in der es erstellt wurde. In diesen Fällen greift man auf den **Heap** (Freispeicher) zurück.

### Die Operatoren `new` und `delete`

Um Speicher auf dem Heap manuell anzufordern, nutzt man `new`. Um ihn wieder freizugeben, nutzt man `delete`.

```cpp
// Speicher für ein einzelnes Objekt auf dem Heap anfordern
Typ* zeiger = new Typ;

// Speicher wieder freigeben
delete zeiger;
```

Wenn du ein Array auf dem Heap erstellen möchtest, verwendest du die Array-Varianten `new[]` und `delete[]`:

```cpp
// Array auf dem Heap anfordern
Typ* arrayZeiger = new Typ[groesse];

// Array wieder freigeben (die eckigen Klammern sind essenziell!)
delete[] arrayZeiger;
```

### Die Gefahren von manuellem Speichermanagement

Das manuelle Arbeiten mit `new` und `delete` birgt enorme Risiken und ist eine der Hauptursachen für Programmabstürze und Sicherheitslücken:

1. **Speicherlecks (Memory Leaks):** Wenn du vergisst, angeforderten Speicher mit `delete` bzw. `delete[]` freizugeben, bleibt dieser Speicher reserviert, bis das Programm beendet wird. Läuft dein Programm tagelang (z. B. als Server), geht ihm irgendwann der Arbeitsspeicher aus.
2. **Dangling Pointer (Schwebende Zeiger):** Wenn du ein Objekt mit `delete` freigibst, zeigt dein Zeiger immer noch auf diese Speicheradresse. Greifst du danach über den Zeiger auf das Objekt zu, führt das zu undefiniertem Verhalten (oft zum Absturz).
3. **Double Free:** Wenn du versuchst, denselben Zeiger zweimal freizugeben, führt dies ebenfalls zu schweren Fehlern und Abstürzen.

> [!IMPORTANT]
> **Die goldene Regel des modernen C++:**
> Vermeide den direkten Einsatz von `new` und `delete` im normalen Anwendungscode! Nutze stattdessen Standard-Container (wie `std::vector` oder `std::string`) oder intelligente Zeiger (Smart Pointer), die die Speicherverwaltung vollautomatisch für dich übernehmen.

---

## 10.5 Smarte Pointer (Intelligente Zeiger)

Um die oben genannten Gefahren zu bannen, stellt das moderne C++ (verfügbar über `<memory>` bzw. im Modul `import std;`) sogenannte Smart Pointer zur Verfügung. Diese verpacken einen "rohen" Zeiger in ein Objekt, das auf dem Stack liegt. Sobald dieses Stack-Objekt zerstört wird (weil es seinen Gültigkeitsbereich verlässt), gibt sein Destruktor automatisch den Speicher auf dem Heap frei. Dieses Prinzip nennt man **RAII** (*Resource Acquisition Is Initialization*).

Es gibt zwei Hauptarten von Smart Pointern, die du kennen solltest:

### 1. `std::unique_ptr`

Ein `std::unique_ptr` drückt aus, dass ein Objekt auf dem Heap **exklusiv** einer einzigen Instanz gehört. Er kann nicht kopiert werden (denn dann gäbe es zwei Besitzer), kann aber bei Bedarf an einen anderen Besitzer verschoben werden (`std::move`).

Um einen `std::unique_ptr` zu erstellen, nutzt man die Hilfsfunktion `std::make_unique`:

```cpp
import std;

// Erstellt ein Objekt vom Typ 'MeinDatentyp' sicher auf dem Heap
auto meinSmartPointer = std::make_unique<MeinDatentyp>(initialisierungsParameter);
```

Wenn `meinSmartPointer` das Ende seines Blocks `{}` erreicht, wird der Speicher auf dem Heap automatisch und absolut sicher freigegeben. Du musst kein `delete` aufrufen!

### 2. `std::shared_ptr`

Manchmal müssen sich mehrere Programmteile den Besitz an einem Objekt teilen. Hier kommt `std::shared_ptr` ins Spiel. Er verwendet einen internen Referenzzähler. Jedes Mal, wenn du den `shared_ptr` kopierst, erhöht sich der Zähler um eins. Wird ein `shared_ptr` zerstört, verringert sich der Zähler. Erst wenn der Zähler auf `0` sinkt (also niemand mehr das Objekt besitzt), wird der Speicher auf dem Heap freigegeben.

Du erstellst ihn analog mit `std::make_shared`:

```cpp
auto geteilterPointer = std::make_shared<MeinDatentyp>(initialisierungsParameter);
```

> [!NOTE]
> Obwohl `std::shared_ptr` sehr komfortabel wirkt, solltest du standardmäßig immer `std::unique_ptr` bevorzugen. Der Referenzzähler von `std::shared_ptr` erzeugt einen kleinen Laufzeit-Overhead, und es können bei unvorsichtigem Design sogenannte "Zyklische Referenzen" entstehen, bei denen sich Objekte gegenseitig besitzen und somit niemals freigegeben werden.

---

## 10.6 Kontrollfragen und Aufgaben

### Kontrollfragen

1. Warum muss am Ende einer Strukturdefinition (`struct`) ein Semikolon stehen, während dies bei Funktionen nicht der Fall ist?
2. Welcher Operator wird verwendet, um auf die Member einer Struktur zuzugreifen?
3. Was ist der Unterschied zwischen einer Designated Initialisierung und der klassischen Initialisierung einer Struktur?
4. Warum ist eine `enum class` sicherer zu verwenden als ein klassisches `enum`?
5. Erzeugt ein `using`-Alias einen völlig neuen Datentyp im Speicher? Erkläre die Funktionsweise.
6. Was versteht man unter einem "Memory Leak" (Speicherleck) und wie entsteht es beim manuellen Speichermanagement?
7. Warum darf man Speicher, der mit `new[]` angefordert wurde, nicht mit einem einfachen `delete` freigeben?
8. Welches grundlegende Prinzip des C++-Ressourcenmanagements nutzen Smart Pointer aus, um Speicherlecks zu verhindern?
9. Wann solltest du einen `std::unique_ptr` einem `std::shared_ptr` vorziehen?

### Praktische Aufgaben (Ohne fertige Codelösungen!)

#### Aufgabe 1: Die Videospiel-Charakter-Struktur
Entwirf eine Struktur namens `Charakter`. Sie soll den Namen des Helden (Text), seine Lebenspunkte (Ganzzahl) und seine Angriffsstärke (Kommazahl) speichern. 
- Definiere diese Struktur.
- Deklariere in deiner Hauptfunktion einen Helden mit Werten deiner Wahl unter Verwendung der Designated Initialisierung.
- Erstelle eine Funktion/Methode innerhalb der Struktur, die die Daten des Charakters mit `std::println` formatiert auf der Konsole ausgibt.

#### Aufgabe 2: Die Aufgabenliste (To-Do-List)
Erstelle ein Programm zur Verwaltung von Aufgaben.
1. Definiere ein `enum class Prioritaet` mit den Stufen *Niedrig*, *Mittel* und *Hoch*.
2. Definiere eine Struktur `Aufgabe`, die eine Beschreibung (Text) und eine Priorität besitzt.
3. Erstelle einen `std::vector` aus solchen Aufgaben.
4. Befülle den Vektor mit drei verschiedenen Aufgaben.
5. Schreibe eine Schleife, die alle Aufgaben durchgeht und diejenigen Aufgaben ausgibt, die eine *Hohe* Priorität haben.

#### Aufgabe 3: Sicherer dynamischer Speicher mit Smart Pointern
Schreibe ein Programm, das ein Objekt einer Struktur dynamisch auf dem Heap anlegt.
- Verwende dazu **kein** manuelles `new` oder `delete`.
- Nutze stattdessen die passende moderne C++-Funktion, um einen Smart Pointer zu erzeugen, der das Objekt exklusiv besitzt.
- Weise dem Objekt Werte zu und gib diese aus. 
- Überprüfe gedanklich (oder durch Ausgaben im Destruktor), wie der Speicher automatisch bereinigt wird, sobald der Smart Pointer den Scope verlässt.
