# 17 Ein-/Ausgabestreams für Dateien

Bisher hast du Daten meist über die Konsole eingegeben und ausgegeben. Sobald du dein Programm beendest, gehen diese Daten jedoch verloren. Um Daten dauerhaft (persistent) zu speichern, greifen wir auf Dateien zurück. 

In diesem Kapitel lernst du, wie du in modernem C++ (ausgerichtet am **C++23-Standard**) Daten in Dateien schreibst, aus ihnen liest und das Dateisystem deines Betriebssystems manipulierst.

---

## 17.1 Umgang mit Dateien in C++ & 17.2 Verschiedene Streams für Dateien

In C++ wird die Kommunikation mit externen Geräten – sei es die Konsole oder eine Datei auf der Festplatte – über das Konzept der **Streams (Datenströme)** realisiert. Stell dir einen Stream wie eine Wasserleitung vor: Daten fließen Byte für Byte von einer Quelle (z. B. einer Datei) zu einem Ziel (z. B. deinem Programm) oder umgekehrt.

Um mit Dateien zu arbeiten, stellt dir die C++-Standardbibliothek drei spezialisierte Stream-Klassen zur Verfügung:

1. **`std::ifstream` (Input File Stream):** 
   Dieser Stream ist eine Einbahnstraße *in* dein Programm hinein. Du nutzt ihn ausschließlich zum **Lesen** von Dateien.
2. **`std::ofstream` (Output File Stream):** 
   Dieser Stream leitet Daten *aus* deinem Programm heraus. Du nutzt ihn ausschließlich zum **Schreiben** von Dateien. Falls die Zieldatei noch nicht existiert, wird sie in der Regel erstellt.
3. **`std::fstream` (File Stream):** 
   Dieser Stream ist ein Allrounder. Er beherrscht beide Richtungen und erlaubt es dir, eine Datei gleichzeitig zu **lesen und zu schreiben**.

In modernem C++ importierst du die gesamte Standardbibliothek komfortabel über das Modul-System:

```cpp
import std;
```

> [!NOTE]
> Die Verwendung von `import std;` ist ab C++23 standardisiert. Es ersetzt die älteren Header-Inklusionen wie `<fstream>`, `<iostream>` und `<filesystem>` und beschleunigt die Kompilierzeiten drastisch.

---

## 17.3 Eine Datei öffnen und schließen

Bevor du Daten durch die Leitung schicken kannst, musst du die Verbindung aufbauen. Das nennen wir „eine Datei öffnen“.

### 17.3.1 Datei öffnen

Es gibt zwei Wege, eine Datei mit einem Stream-Objekt zu verknüpfen:

*   **Direkt bei der Initialisierung (Konstruktor):** Du übergibst den Dateinamen direkt beim Erstellen des Stream-Objekts.
*   **Nachträglich über die Methode `.open()`:** Du erstellst zuerst das Stream-Objekt und verknüpfst es später mit einer Datei.

```cpp
// Möglichkeit A: Öffnen direkt beim Erstellen
std::ofstream ausgabe{"daten.txt"};

// Möglichkeit B: Nachträgliches Öffnen
std::ifstream eingabe;
eingabe.open("daten.txt");
```

### 17.3.2 Die Fehlerprüfung (Ein absolutes Muss!)

Beim Arbeiten mit Dateien kann viel schiefgehen: Die Datei existiert nicht, du hast keine Leserechte, oder die Festplatte ist voll. Du darfst **niemals** davon ausgehen, dass ein Öffnungsversuch erfolgreich war!

Du kannst das Stream-Objekt selbst in einer Bedingung prüfen (es lässt sich implizit in einen Wahrheitswert umwandeln) oder die Methode `.is_open()` nutzen:

```cpp
if (!eingabe) {
    // Fehlerbehandlung: Datei konnte nicht geöffnet werden!
}

if (eingabe.is_open()) {
    // Sicherer Lesezugriff möglich
}
```

Zusätzlich besitzt jeder Stream Status-Flags, die du abfragen kannst:
*   `.good()`: Alles ist in Ordnung.
*   `.fail()`: Eine Operation ist fehlgeschlagen (z. B. falsches Datenformat gelesen oder Datei nicht geöffnet).
*   `.bad()`: Ein schwerwiegender Fehler ist aufgetreten (z. B. Hardware-Fehler).
*   `.eof()`: Das Ende der Datei (End of File) wurde erreicht.

### 17.3.3 Modi zum Öffnen von Dateien

Du kannst C++ genau mitteilen, *wie* eine Datei geöffnet werden soll. Diese Steuerung erfolgt über **Öffnungsmodi** (Open Modes), die du im Namensraum `std::ios` findest. Du kannst sie mit dem bitweisen ODER-Operator (`|`) kombinieren:

| Modus | Bedeutung |
| :--- | :--- |
| `std::ios::in` | Öffnet die Datei zum Lesen (Standard für `std::ifstream`). |
| `std::ios::out` | Öffnet die Datei zum Schreiben (Standard für `std::ofstream`). Überschreibt vorhandenen Inhalt. |
| `std::ios::app` | (Append) Hängt neue Daten an das Ende der Datei an, statt sie zu überschreiben. |
| `std::ios::ate` | (At the end) Öffnet die Datei und springt sofort an ihr Ende. |
| `std::ios::trunc` | (Truncate) Löscht den Inhalt der Datei beim Öffnen komplett (Standard bei `std::ios::out`). |
| `std::ios::binary` | Öffnet die Datei im Binärmodus statt im Textmodus (verhindert automatische Zeilenumbruch-Konvertierungen). |

*Hinweis zur Syntax:*
```cpp
// Öffnet eine Datei im Binärmodus zum Anhängen
std::ofstream datei{"archiv.bin", std::ios::binary | std::ios::app};
```

### 17.3.4 Dateizeiger steuern (Seek & Tell)

Stell dir eine geöffnete Datei wie ein Magnetband vor. Es gibt einen Lesezeiger und einen Schreibzeiger, die angeben, an welcher Position das nächste Byte verarbeitet wird.

*   **Für Leseströme (input):**
    *   `seekg(offset, richtung)`: Positioniert den Lesezeiger (**seek g**et).
    *   `tellg()`: Gibt die aktuelle Position des Lesezeigers zurück (**tell g**et).
*   **Für Schreibströme (output):**
    *   `seekp(offset, richtung)`: Positioniert den Schreibzeiger (**seek p**ut).
    *   `tellp()`: Gibt die aktuelle Position des Schreibzeigers zurück (**tell p**ut).

Als `richtung` kannst du folgende Konstanten angeben:
*   `std::ios::beg`: Relativ zum Dateianfang.
*   `std::ios::cur`: Relativ zur aktuellen Position.
*   `std::ios::end`: Relativ zum Dateiende.

> [!TIP]
> Möchtest du herausfinden, wie viele Bytes eine Datei groß ist? Springe mit `seekg` an das Ende der Datei (`std::ios::end`) und frage die Position mit `tellg()` ab! Vergiss danach nicht, wieder an den Anfang zurückzuspringen, wenn du die Datei lesen willst.

### 17.3.5 Datei schließen und das RAII-Prinzip

Um Ressourcen freizugeben und sicherzustellen, dass alle Daten aus dem Zwischenspeicher (Buffer) physisch auf die Festplatte geschrieben werden, muss eine Datei geschlossen werden.

In C++ nutzen wir dafür das **RAII-Prinzip** (Resource Acquisition Is Initialization):
Der Destruktor der Stream-Klasse schließt die Datei automatisch, sobald die Stream-Variable ihren Gültigkeitsbereich (Scope) verlässt (z. B. am Ende einer Funktion oder eines `{}`-Blocks). 

Ein manueller Aufruf von `.close()` ist nur dann notwendig, wenn du die Datei noch vor dem Ende des Scopes schließen möchtest, um sie für andere Prozesse freizugeben.

---

## 17.4 Lese- und Schreiboperationen

Es gibt drei wesentliche Arten, wie du Daten in C++ aus einer Datei lesen oder in sie schreiben kannst.

### 17.4.1 Byteweises und formatiertes Arbeiten

Genau wie bei `std::cin` und `std::cout` kannst du die Stream-Operatoren `>>` (Einlesen) und `<<` (Schreiben) verwenden.

*   **Schreiben:** `datei << "Wert: " << 42;`
*   **Lesen:** `datei >> variable;`

> [!WARNING]
> Der Operator `>>` überspringt standardmäßig alle Whitespaces (Leerzeichen, Tabulatoren, Zeilenumbrüche). Wenn du eine Datei wortweise liest, verlierst du das Layout des Textes.
> Für das exakte byte- oder zeichenweise Lesen nutzt man stattdessen oft die Methode `.get(char_variable)` und zum Schreiben `.put(char_wert)`.

### 17.4.2 Zeilenweises Lesen mit `std::getline`

Möchtest du eine Datei Zeile für Zeile auslesen (inklusive aller Leerzeichen), verwendest du die Funktion `std::getline`. Sie liest so lange Zeichen, bis sie auf ein Zeilenumbruchzeichen (`\n`) trifft.

Die typische Schleifenstruktur nutzt den Rückgabewert von `std::getline` als Bedingung. Solange erfolgreich gelesen wird, läuft die Schleife:

```cpp
std::string zeile;
// Struktur zum zeilenweisen Einlesen einer geöffneten Datei:
while (std::getline(eingabe_stream, zeile)) {
    // Verarbeite die eingelesene Zeile
}
```

### 17.4.3 Blockweises und binäres Lesen/Schreiben

Wenn du keine Textdateien, sondern strukturierte Binärdaten (z. B. Bilder, Spielstände oder Rohdaten von Structs) speichern willst, nutzt du `.write()` und `.read()`. Diese arbeiten nicht mit Textformatierungen, sondern kopieren den Speicherbereich eins zu eins.

*   **Schreiben:** `.write(const char* s, std::streamsize n)`
*   **Lesen:** `.read(char* s, std::streamsize n)`

Da diese Methoden einen Zeiger vom Typ `char*` (oder ab C++20 häufiger im Kontext von Raw-Daten auch `std::byte*`) erwarten, musst du deine Datenstrukturen beim Aufruf entsprechend umwandeln (casten) und die exakte Bytegröße mittels `sizeof` angeben.

---

## 17.5 Arbeiten mit std::filesystem

Seit C++17 besitzt C++ eine mächtige Bibliothek zur Navigation im Dateisystem des Betriebssystems. Sie befindet sich im Namensraum `std::filesystem`.

### 17.5.1 Pfade repräsentieren und manipulieren

Die Klasse `std::filesystem::path` abstrahiert Pfade plattformunabhängig. Sie kümmert sich automatisch darum, ob dein Betriebssystem Backslashes (`\`) unter Windows oder Slashes (`/`) unter Linux nutzt.

Das Geniale an `path` ist, dass du Pfade ganz einfach mit dem Division-Operator (`/`) verketten kannst:

```cpp
std::filesystem::path basisordner{"daten"};
std::filesystem::path dateiname{"protokoll.txt"};
// Verkettet die beiden Pfade plattformgerecht:
std::filesystem::path vollstaendiger_pfad = basisordner / dateiname;
```

### 17.5.2 Verzeichnisse manipulieren

Mit einfachen Funktionen kannst du Ordnerstrukturen verwalten:
*   `std::filesystem::create_directory(pfad)`: Erstellt ein einzelnes Verzeichnis.
*   `std::filesystem::create_directories(pfad)`: Erstellt eine ganze Verzeichnis-Kette (wie `mkdir -p`).
*   `std::filesystem::remove(pfad)`: Löscht eine Datei oder ein leeres Verzeichnis.
*   `std::filesystem::remove_all(pfad)`: Löscht ein Verzeichnis mitsamt allen Unterverzeichnissen und Dateien (Vorsicht!).
*   `std::filesystem::exists(pfad)`: Prüft, ob ein Pfad real existiert.

### 17.5.3 Metadaten auslesen

Du kannst nützliche Informationen über Dateien abfragen:
*   `std::filesystem::file_size(pfad)`: Gibt die Dateigröße in Bytes zurück.
*   `std::filesystem::is_directory(pfad)`: Prüft, ob der Pfad ein Ordner ist.
*   `std::filesystem::last_write_time(pfad)`: Ermittelt den Zeitpunkt der letzten Änderung.

### 17.5.4 Modernste Features (C++20 und C++23)

*   **Ausgabe mit `std::print` / `std::println` (seit C++23):**
    In C++23 nutzen wir die modernen Ausgabe-Funktionen `std::print` und `std::println`. Um einen Pfad auszugeben, konvertieren wir ihn mit `.string()` in eine Zeichenkette. (Als Ausblick auf C++26: Ab diesem Standard wird es voraussichtlich möglich sein, `std::filesystem::path` direkt ohne Konvertierung an `std::println` zu übergeben.)
    
    ```cpp
    std::filesystem::path mein_pfad{"/usr/local/bin"};
    // In C++23 nutzen wir .string() für die Ausgabe:
    std::println("Der Pfad lautet: {}", mein_pfad.string()); 
    ```

*   **Systemzeit-Integration (seit C++20):**
    Die Funktion `last_write_time` gibt einen Zeitstempel zurück, der sich nahtlos mit der `std::chrono`-Bibliothek formatieren und in menschenlesbare Zeitpunkte umwandeln lässt.

*   **Verzeichnisse durchwandern (Directory Iterators):**
    Du kannst den Inhalt eines Ordners ganz einfach mit einer Range-based `for`-Schleife durchlaufen. Nutze dafür `std::filesystem::directory_iterator` für die aktuelle Ebene oder `std::filesystem::recursive_directory_iterator`, um auch alle Unterordner zu durchsuchen.

---

## 17.6 Kontrollfragen und Aufgaben

### 17.6.1 Kontrollfragen

1. Welcher Stream-Typ (`std::ifstream`, `std::ofstream`, `std::fstream`) wird standardmäßig geöffnet, wenn du Daten ausschließlich anhängen (`std::ios::app`) möchtest?
2. Warum reicht es nicht aus zu prüfen, ob die Datei-Variable nach dem Öffnen ungleich `nullptr` ist? Wie prüft man stattdessen korrekt und modern auf Fehler?
3. Was ist der Unterschied zwischen den Operationen `seekg` und `seekp`?
4. Welche Gefahr besteht, wenn du eine Struktur, die einen Zeiger (z. B. `std::string` oder ein Array auf dem Heap) enthält, mittels `.write()` binär in eine Datei schreibst?
5. Warum erleichtert die Klasse `std::filesystem::path` das Schreiben von plattformübergreifendem C++-Code?

### 17.6.2 Aufgaben

> [!IMPORTANT]
> Löse die folgenden Aufgaben mit modernem C++ (nutze `import std;`, `std::println` und Structured Bindings bei Bedarf). Verwende kein veraltetes `#include` oder `printf`.

#### Aufgabe 1: Das Logbuch (Text-Schreiben)
Erstelle ein Programm, das den Benutzer in einer Schleife nach Texteingaben fragt. Jede Eingabe soll mit einem aktuellen Zeitstempel (nutze dafür die moderne C++ `std::chrono`-Bibliothek) versehen und an das Ende einer Datei namens `logbuch.txt` angehängt werden. Wenn der Benutzer das Wort `EXIT` eingibt, soll sich das Programm beenden. Achte auf eine korrekte Prüfung, ob die Datei erfolgreich geöffnet wurde.

#### Aufgabe 2: Der Zeilen-Zähler (Text-Lesen)
Entwickle ein Werkzeug, das eine Textdatei öffnet, diese zeilenweise einliest und am Ende ausgibt:
1. Wie viele Zeilen die Datei insgesamt hat.
2. Wie viele Wörter (getrennt durch Whitespaces) in der Datei enthalten sind.
3. Wie viele Zeichen (ohne Zeilenumbruch) gelesen wurden.

#### Aufgabe 3: Der Datei-Kloner (Binär-Kopieren)
Schreibe ein Programm, das eine beliebige Datei (z. B. ein Bild oder ein PDF) binär kopiert. 
*   Ermittle zuerst die Dateigröße mithilfe von `seekg`/`tellg` oder direkt über `std::filesystem::file_size`.
*   Lese die gesamte Datei blockweise in einen dynamischen Puffer (z. B. ein `std::vector<char>` oder `std::vector<std::byte>`).
*   Schreibe diesen Puffer in eine neue Zieldatei.
*   Gib über `std::println` die Kopiergeschwindigkeit und die kopierten Bytes aus.

#### Aufgabe 4: Der Verzeichnis-Aufräumer (Filesystem)
Entwickle ein Hilfsprogramm, das einen vom Benutzer angegebenen Ordnerpfad scannt:
*   Prüfe zuerst, ob der Pfad existiert und wirklich ein Verzeichnis ist.
*   Durchlaufe das Verzeichnis rekursiv.
*   Gib für jede gefundene Datei den Namen, die Dateiendung und die Dateigröße aus.
*   *Zusatz:* Filtere alle Dateien heraus, die größer als 10 Megabyte sind, und frage den Benutzer, ob diese gelöscht werden sollen.
