# 7 Referenzen und Zeiger

In den vorherigen Kapiteln hast du gelernt, wie du Variablen erstellst und Werte in ihnen speicherst. Jede Variable liegt an einem bestimmten Ort im Arbeitsspeicher deines Computers. In diesem Kapitel lernst du zwei mächtige Konzepte kennen, mit denen du direkt auf diese Speicherorte verweisen kannst, ohne den Wert der Variable kopieren zu müssen: **Referenzen** und **Zeiger (Pointer)**. 

Diese Mechanismen sind der Schlüssel zu hocheffizientem C++-Code, da sie es dir erlauben, große Datenmengen ohne Performance-Verlust zu übergeben und komplexe Datenstrukturen aufzubauen.

---

## 7.1 Referenzen

Eine Referenz kannst du dir wie einen **Spitznamen** (Alias) für eine bereits existierende Variable vorstellen. Sie ist kein eigenständiges Objekt im Speicher, sondern verweist direkt auf das Original. Jede Aktion, die du mit der Referenz ausführst, wirkt sich unmittelbar auf das Originalobjekt aus.

### Lvalue-Referenzen

Eine Lvalue-Referenz verweist auf ein sogenanntes *Lvalue* (vereinfacht: ein Objekt mit einem festen Namen und einer festen Speicheradresse, wie eine normale Variable). 

In C++ deklarierst du eine Lvalue-Referenz mit dem Kaufmanns-Und-Zeichen (`&`):

```cpp
Typ OriginalVariable = Wert;
Typ& ReferenzName = OriginalVariable; // Lvalue-Referenz
```

> [!IMPORTANT]
> Eine Referenz **muss** immer sofort bei ihrer Erstellung initialisiert werden. Du kannst sie danach auch nicht mehr auf ein anderes objekt "umbiegen". Sie bleibt für ihre gesamte Lebensdauer fest mit dem Original verbunden.

### Rvalue-Referenzen

Mit dem modernen C++-Standard wurden Rvalue-Referenzen eingeführt. Sie werden mit zwei Kaufmanns-Und-Zeichen (`&&`) deklariert. Ein *Rvalue* ist ein temporärer Wert, der keinen Namen hat (z. B. das Ergebnis einer Berechnung wie `5 + 3` oder ein temporäres Funktionsobjekt).

Rvalue-Referenzen erlauben es dir, die Ressourcen von temporären Objekten zu "stehlen", anstatt sie aufwendig zu kopieren. Das ist die Grundlage für die sogenannte **Move-Semantik**, die C++ extrem schnell macht.

```cpp
Typ&& RvalueReferenz = TemporaererWert;
```

### Konstante Referenzen

Wenn du ein Objekt aus Performance-Gründen nicht kopieren möchtest (z. B. einen langen Text), es aber innerhalb eines Programmabschnitts oder einer Funktion **nicht verändern** darfst, nutzt du eine konstante Lvalue-Referenz (`const Typ&`).

```cpp
const Typ& SchreibgeschuetzteReferenz = OriginalVariable;
```

Dies ist der Standardweg in C++, um größere Datenstrukturen schreibgeschützt an Funktionen zu übergeben.

---

## 7.2 Zeiger (Pointer)

Während eine Referenz ein fester Spitzname ist, ist ein **Zeiger** (Pointer) eine eigenständige Variable. Anstatt eines normalen Wertes speichert ein Zeiger eine **Speicheradresse** – er zeigt also auf die Adresse einer anderen Variable.

Stell dir eine Postadresse vor: Der Zeiger ist der Zettel, auf dem die Adresse steht. Das Haus unter dieser Adresse ist die eigentliche Variable.

### 7.2.1 Die Syntax von Zeigern (& und *)

Um mit Zeigern zu arbeiten, nutzt du zwei wichtige Operatoren:
1. **Der Adressoperator (`&`)**: Er ermittelt die Speicheradresse einer Variable.
2. **Der Typ-Deklarator (`*`)**: Er kennzeichnet eine Variable bei der Deklaration als Zeiger.

Die Syntax zur Deklaration eines Zeigers sieht schematisch so aus:

```cpp
Typ Variable = Wert;
Typ* ZeigerName = &Variable; // ZeigerName speichert nun die Adresse von Variable
```

> [!TIP]
> Platziere das `*` direkt an den Typ (z. B. `int* ptr`), um zu verdeutlichen, dass "Zeiger auf int" der Datentyp der Variable ist.

### 7.2.2 Zeiger dereferenzieren

Wenn du auf den Wert zugreifen möchtest, der sich an der Adresse befindet, die im Zeiger gespeichert ist, musst du den Zeiger **dereferenzieren**. Dazu nutzt du erneut das Sternchen (`*`), allerdings diesmal als Operator vor dem Zeigernamen im ausführbaren Code:

```cpp
// Wert an der Adresse auslesen oder verändern:
*ZeigerName = NeuerWert; 
```

Achte auf den Unterschied:
* `ZeigerName` gibt dir die gespeicherte **Adresse** (z. B. `0x7ffdd76a`).
* `*ZeigerName` gibt dir den **Wert**, der an dieser Adresse liegt.

### 7.2.3 Der Zeiger nullptr

Da ein Zeiger eine Adresse speichert, stellt sich die Frage: Worauf zeigt ein Zeiger, wenn er noch keine gültige Adresse hat? 

In modernem C++ initialisierst du solche Zeiger mit dem Schlüsselwort `nullptr`. Dies signalisiert eindeutig, dass der Zeiger ins Leere (auf keine gültige Adresse) zeigt.

```cpp
Typ* MeinZeiger = nullptr;
```

> [!WARNING]
> Versuche niemals, einen Zeiger zu dereferenzieren, der den Wert `nullptr` enthält oder uninitialisiert ist. Dies führt zu einem undefinierten Verhalten (meist einem sofortigen Absturz deines Programms).

### 7.2.4 Zeiger prüfen (Gültigkeitstest)

Bevor du einen Zeiger dereferenzierst, solltest du immer prüfen, ob er gültig ist (also nicht `nullptr`). Da ein Zeiger in einer Bedingung implizit zu `true` (wenn er eine Adresse enthält) oder `false` (wenn er `nullptr` ist) konvertiert wird, kannst du das sehr elegant prüfen:

```cpp
if (MeinZeiger) {
    // Sicher zu dereferenzieren: *MeinZeiger
} else {
    // Zeiger zeigt ins Nichts!
}
```

### 7.2.5 Die Adresse einer Referenz

Da eine Referenz nur ein Spitzname für eine Variable ist, besitzt sie keine eigene Speicheradresse im klassischen Sinne. Wenn du den Adressoperator auf eine Referenz anwendest (`&MeineReferenz`), erhältst du die Speicheradresse des **Originalobjekts**, auf das die Referenz verweist.

### 7.2.6 Referenzen vs. Zeiger: Wann verwendet man was?

Die Entscheidung zwischen Referenzen und Zeigern fällt meist leicht, wenn du folgende Richtlinien beachtest:

| Eigenschaft | Referenz (`&`) | Zeiger (`*`) |
| :--- | :--- | :--- |
| **Initialisierung** | Muss sofort initialisiert werden. | Kann später initialisiert werden (oder mit `nullptr`). |
| **Null-Wert** | Kann (unter normalen Umständen) nicht null sein. | Kann `nullptr` sein. |
| **Neuzuweisung** | Kann nicht auf ein anderes Objekt geändert werden. | Kann jederzeit auf eine andere Adresse zeigen. |
| **Syntax** | Direkte Nutzung wie eine normale Variable. | Benötigt `*` zur Dereferenzierung und `&` für Adressen. |

**Faustregel:**
* Verwende **Referenzen** als Standard für Funktionsparameter und überall dort, wo ein Verweis immer gültig sein muss und sich nicht ändert.
* Verwende **Zeiger** nur dann, wenn der Verweis optional sein muss (d.h. er darf `nullptr` sein) oder wenn du die Adresse im Laufe der Zeit auf ein anderes Objekt umbiegen musst.

### 7.2.7 Verwendung von Zeigern und moderne Alternativen

In modernem C++23 versucht man, sogenannte **rohe Zeiger** (Raw Pointer) für das Ressourcenmanagement (wie die manuelle Speicherverwaltung mit `new` und `delete`) komplett zu vermeiden. Rohe Zeiger bergen das Risiko von Speicherlecks und Zeiger-Fehlern.

Stattdessen nutzt man moderne Alternativen:
* **Smart Pointer** (`std::unique_ptr`, `std::shared_ptr` aus dem Header `<memory>`): Sie verwalten den Speicher automatisch und geben ihn frei, sobald er nicht mehr benötigt wird.
* **`std::optional`** (aus `<optional>`): Wenn du einen Wert zurückgeben oder übergeben möchtest, der "leer" sein kann, ist dies die sicherere Alternative zu einem Zeiger, der `nullptr` sein kann.
* **`std::reference_wrapper`** (aus `<functional>`): Falls du eine Referenz benötigst, die du in einem Container (wie `std::vector`) speichern oder nachträglich neu zuweisen möchtest.

---

## 7.3 Kontrollfragen und Aufgaben

### Kontrollfragen

1. Was passiert, wenn du versuchst, eine Referenz zu deklarieren, ohne sie direkt zu initialisieren?
2. Welchen Wert liefert der Ausdruck `&Variable`, und welchen Datentyp hat das Ergebnis?
3. Wie unterscheidet sich das Verhalten des Operators `*` bei der Deklaration einer Variable von seiner Verwendung im ausführbaren Code?
4. Warum ist es gefährlich, einen Zeiger zu dereferenzieren, der mit `nullptr` initialisiert wurde, und wie verhinderst du diesen Fehler?
5. Warum gibt es in C++ überhaupt Rvalue-Referenzen (`&&`) und was ist ihr primärer Einsatzzweck?

### Aufgaben

> [!NOTE]
> Nutze für die Ein- und Ausgabe in deinen Programmen den modernen C++23-Standard mit `import std;` und `std::println`.

#### Aufgabe 1: Der Tausch-Trick (Referenzen)
Schreibe eine Funktion (nennen wir sie `tausche`), die zwei Ganzzahlen entgegennimmt. Die Funktion soll die Werte der beiden Variablen so vertauschen, dass die Änderung auch nach dem Funktionsaufruf in der aufrufenden Funktion (z. B. in deiner Hauptfunktion) wirksam bleibt. 
* *Tipp:* Überlege dir, ob du hierfür Kopien, Zeiger oder Referenzen als Parameter benötigst.

#### Aufgabe 2: Der sichere Addierer (Zeiger)
Entwirf eine Funktion, die zwei Zeiger auf Ganzzahlen als Argumente akzeptiert. Die Funktion soll die Werte, auf die die Zeiger zeigen, addieren und das Ergebnis zurückgeben.
* *Wichtig:* Die Funktion muss absolut absturzsicher sein, selbst wenn einer oder beide Zeiger als `nullptr` übergeben werden. Falls ein Zeiger ungültig ist, soll der Wert `0` für diesen Summanden angenommen werden.

#### Aufgabe 3: Der Lese-Spitzname (Konstante Referenzen)
Erstelle eine Funktion, die einen sehr langen Text (`std::string`) entgegennimmt und die Anzahl der Zeichen auf der Konsole ausgibt.
* *Anforderung:* Sorge dafür, dass der Text beim Aufruf der Funktion aus Performance-Gründen nicht kopiert werden muss, stelle aber gleichzeitig compilerseitig sicher, dass die Funktion den Text nicht versehentlich verändern kann.
