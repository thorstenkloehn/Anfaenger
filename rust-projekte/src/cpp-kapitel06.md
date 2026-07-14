# 6 Arrays und Strings

Herzlich willkommen zu Kapitel 6! In diesem Kapitel beschäftigen wir uns damit, wie du mehrere Daten des gleichen Typs in deinem Programm verwalten und wie du mit Texten (Zeichenketten) arbeiten kannst. 

Bisher hast du meistens einzelne Variablen wie `int alter = 25;` oder `double preis = 19.99;` verwendet. Was aber, wenn du die Noten einer ganzen Klasse oder die Namen aller Teilnehmer eines Kurses speichern möchtest? Dafür brauchst du Collections (Sammlungen). In C++ stehen dir dafür mächtige Werkzeuge zur Verfügung: **Arrays** für numerische oder strukturierte Datensammlungen und **Strings** für Text.

Wir schauen uns an, wie du diese Konzepte in modernem C++ (Standard C++23) sicher und elegant einsetzt.

---

## 6.1 Arrays
Stell dir ein Array wie eine Reihe von nummerierten Schließfächern vor. Jedes Schließfach hat dieselbe Größe und kann genau ein Element desselben Datentyps aufnehmen. Der Zugriff auf diese Fächer erfolgt über einen sogenannten Index (eine Hausnummer), der in C++ immer bei **0** beginnt.

### 6.1.1 Der C++-Container `std::vector`
Wenn du zur Laufzeit nicht weißt, wie viele Elemente du speichern musst (z. B. weil der Benutzer flexibel Werte eingibt), ist `std::vector` deine erste Wahl. Er verhält sich wie ein dynamisches Array: Wenn du mehr Platz brauchst, wächst er automatisch im Hintergrund.

**Analogie:** Stell dir einen flexiblen Aktenordner vor, in den du jederzeit hinten neue Blätter einheften kannst. Der Ordner sorgt selbst dafür, dass er bei Bedarf durch einen größeren ersetzt wird.

**Besonderheiten in modernem C++ (C++23):**
- Du kannst ihn einfach mit `import std;` nutzen.
- Er ist die Standard-Empfehlung für die meisten Anwendungsfälle, in denen du eine Liste von Elementen verwaltest.

**Wie deklariert man einen Vector?**
Um einen Vector zu deklarieren, gibst du in spitzen Klammern `<>` an, welchen Typ die Elemente haben sollen:
```cpp
// Syntax-Template (kein vollständiges Programm!)
std::vector<Typ> name;
```

> [!TIP]
> Um Elemente an das Ende des Vectors anzufügen, kannst du eine Methode verwenden, die sich übersetzt wie "schiebe nach hinten" (`push_back`) oder noch besser das modernere `emplace_back`, das das Element direkt vor Ort konstruiert.

> [!IMPORTANT]
> Der Zugriff auf Elemente über den Index (z. B. `name[0]`) prüft standardmäßig nicht, ob der Index überhaupt existiert! Wenn du auf Nummer sicher gehen willst, bietet der Vector eine Methode namens `.at(index)`, die bei einem ungültigen Index eine Ausnahme (Exception) auslöst.

### 6.1.2 Der C++-Container `std::array`
Wenn die Anzahl der Elemente bereits beim Schreiben des Codes felsenfest feststeht (z. B. die 12 Monate eines Jahres oder die 7 Wochentage), solltest du `std::array` verwenden. Es hat eine feste Größe, die sich nach der Erstellung nicht mehr ändern lässt.

**Vorteil gegenüber `std::vector`:** Da die Größe feststeht, belegt das `std::array` genau so viel Speicher wie nötig und ist extrem performant, da kein dynamischer Speicher auf dem Heap reserviert werden muss.

**Wie deklariert man ein Array?**
Zusätzlich zum Datentyp musst du bei der Deklaration auch die feste Anzahl der Elemente angeben:
```cpp
// Syntax-Template
std::array<Typ, Anzahl> name;
```

> [!NOTE]
> Genau wie der Vector bietet auch `std::array` die sichere Methode `.at()` an. Du solltest sie immer dann bevorzugen, wenn du nicht absolut garantieren kannst, dass dein Index im gültigen Bereich liegt.

### 6.1.3 Klassische C-Arrays (Unterschiede und Nachteile)
Vielleicht stößt du in älteren Lehrbüchern oder C-Code auf Deklarationen wie `int zahlen[10];`. Das sind klassische C-Arrays (auch Raw-Arrays genannt). 

Im modernen C++ solltest du diese **vermeiden**. Hier sind die Gründe dafür:
1. **Keine Größeninformation:** Ein C-Array weiß selbst nicht, wie viele Elemente es enthält. Übergibst du es an eine Funktion, zerfällt es in einen Zeiger auf das erste Element (Pointer Decay). Du musst die Größe immer separat mitliefern.
2. **Keine Sicherheitsprüfung:** Es gibt keine `.at()`-Methode. Ein Zugriff außerhalb der Grenzen führt zu undefiniertem Verhalten (Undefined Behavior) – einer der häufigsten Sicherheitslücken in Software.
3. **Keine Wertsemantik:** Du kannst ein C-Array nicht einfach mit `=` an ein anderes zuweisen.

> [!WARNING]
> Verwende C-Arrays nur, wenn du zwingend mit historischem C-Code oder sehr hardwarenahen APIs interagieren musst. In allen anderen Fällen greife zu `std::array` oder `std::vector`.

---

## 6.2 Strings in C++
Ein String (Zeichenkette) ist im Grunde eine Sammlung von Zeichen. In C++ ist die Textverarbeitung mit modernen Klassen sehr komfortabel geworden.

### 6.2.1 Der C++-Container `std::string`
Die Standardklasse für Text in C++ heißt `std::string`. Unter der Haube verhält sie sich sehr ähnlich wie ein `std::vector<char>`, ist aber speziell für Text optimiert und bietet zahlreiche Hilfsmethoden (z. B. zum Suchen, Ersetzen oder Verketten).

* **Verkettung:** Du kannst Strings einfach mit dem `+`-Operator aneinanderhängen.
* **Vergleich:** Du kannst Strings direkt mit `==` oder `!=` vergleichen, um zu prüfen, ob sie identisch sind.

**Modernes I/O mit C++23:**
In modernem C++ nutzt du `std::println`, um Strings und andere Daten formatiert auszugeben:
```cpp
// Syntax-Beispiel für die moderne Ausgabe
std::println("Text: {}", mein_string);
```

### 6.2.2 Unterstützung von Unicode (wstrings, UTF-8 strings)
Die Welt spricht viele Sprachen, und nicht alle Zeichen passen in das klassische ASCII-Schema (das nur 128 Zeichen abdeckt). Deshalb gibt es in C++ spezielle String-Typen für Unicode:

* `std::wstring`: Verwendet breite Zeichen (`wchar_t`). Die genaue Größe (16 oder 32 Bit) ist leider plattformabhängig (unter Windows meist 16 Bit, unter Linux 32 Bit).
* `std::u8string` (seit C++20): Speziell für UTF-8 codierte Zeichenketten. Die einzelnen Zeichen sind vom Typ `char8_t`.
* `std::u16string` und `std::u32string`: Für UTF-16 bzw. UTF-32 Codierungen.

> [!NOTE]
> Für die meisten modernen Anwendungen ist UTF-8 der De-facto-Standard. Beachte jedoch, dass `std::u8string` nicht direkt mit den Standard-I/O-Strömen oder `std::println` kompatibel ist, ohne dass man die Zeichen explizit umwandelt.

### 6.2.3 Klassische C-Zeichenketten
Ähnlich wie bei Arrays gibt es auch bei Strings die "alte Welt". Eine C-Zeichenkette (C-String) ist ein einfaches C-Array von Zeichen (`char`), das mit einem speziellen Nullbyte-Zeichen (`'\0'`) endet. 

* **Deklarationsbeispiel:** `const char* text = "Hallo";`
* **Nachteil:** Fehleranfällig! Wenn das Nullbyte am Ende fehlt, liest das Programm so lange im Speicher weiter, bis es zufällig auf ein Nullbyte stößt oder abstürzt.

### 6.2.4 Zeichenkettenliterale
Wenn du im Code Text in Anführungszeichen schreibst (z. B. `"Hallo"`), erstellst du ein Literal.
In modernem C++ gibt es nützliche Suffixe, um den genauen Typ des Literals zu bestimmen:

* `"Hallo"s` erzeugt direkt ein `std::string`-Objekt (anstelle eines C-Strings). Dafür musst du den Namensraum `using namespace std::string_literals;` verwenden.
* `u8"Hallo"` erzeugt ein UTF-8-Literal.
* `R"(Raw-String)"` erzeugt ein sogenanntes **Raw-String-Literal**. Darin kannst du Backslashes `\` und Zeilenumbrüche verwenden, ohne sie mit `\` maskieren zu müssen (ideal für Pfadangaben oder JSON-Text).

---

## 6.3 Kontrollfragen und Aufgaben
 
Hier sind ein paar Fragen und Übungsaufgaben, mit denen du dein Wissen festigen kannst.

### Kontrollfragen
1. Wann solltest du `std::vector` verwenden und wann ist `std::array` die bessere Wahl?
2. Warum ist die Methode `.at()` sicherer als der Operator `[]`?
3. Was passiert, wenn du bei einem klassischen C-String das abschließende `'\0'` vergisst?
4. Welchen Vorteil bietet ein Raw-String-Literal (gekennzeichnet durch `R"..."`)?

### Praktische Aufgaben
*(Hinweis: Versuche, alle Aufgaben mit modernem C++23 zu lösen, indem du `import std;` und `std::println` verwendest!)*

1. **Die Notenliste (dynamisch):**
   Schreibe ein Programm, das den Benutzer fragt, wie viele Noten er eingeben möchte. Lies anschließend diese Anzahl an Noten (Ganzzahlen) ein und speichere sie in einem geeigneten Container. Berechne zum Schluss den Durchschnitt der Noten und gib ihn aus.
   *Tipp:* Nutze `std::vector` und seine dynamischen Erweiterungsmöglichkeiten.

2. **Wochentage (statisch):**
   Erstelle einen Container, der die Namen der 7 Wochentage enthält. Da sich die Anzahl der Wochentage nicht ändert, wähle den passenden Container-Typ aus. Lass den Benutzer eine Zahl von 1 bis 7 eingeben und gib den entsprechenden Wochentag aus. Denke an die Überprüfung von ungültigen Eingaben (z. B. Zahl 8 oder 0)!
   *Tipp:* Achte auf die 0-basierte Indizierung in C++.

3. **Der Pfadfinder:**
   Erstelle eine String-Variable, die einen typischen Windows-Dateipfad enthält (z. B. `C:\Programme\MeinProjekt\main.cpp`). Versuche dies einmal mit einem normalen String-Literal (bei dem du Backslashes maskieren musst) und einmal mit einem Raw-String-Literal. Gib beide Strings aus, um zu überprüfen, ob das Ergebnis identisch ist.
