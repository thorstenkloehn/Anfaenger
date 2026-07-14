# 🛹 Mitmach-Workshop: Phase 1 bildhaft verstehen (Die Poststation 2.0)

Willkommen in der modernen Poststation 2.0! 📯✨

In der C-Poststation mussten wir noch alles manuell auf Zetteln notieren, auf Null-Bytes achten und mit gefährlichen Adressen hantieren. In C++ bekommt unser Postamt ein großes Upgrade: Wir führen **Daten-Fließbänder (Streams)**, **selbstdehnende Paketbänder (std::string)** und **sichere Spitznamen (Referenzen)** ein!

In diesem Kapitel bauen wir die neue Poststation in unserem Kopf auf und setzen sie danach Schritt für Schritt in C++ um. Mach dich bereit für deine ersten praktischen Schritte in C++!

---

## 🧠 Hintergrund: Wie arbeitet der Speicher in C++?

Genau wie in C hat auch unser C++-Postamt zwei Hauptbereiche im Arbeitsspeicher:

### 1. Der Sortiertisch (Stack)
Hier arbeitet unser Postbeamte direkt. Auf dem Tisch liegen Variablen mit fester Größe (wie `int`, `double` oder Referenzen). Der Zugriff ist extrem schnell, aber der Platz ist begrenzt.

### 2. Das Hauptlager (Heap)
Hier lagern die großen und flexiblen Pakete. Wenn wir einen Vektor (`std::vector`) oder einen dynamischen String (`std::string`) verwenden, kümmert sich C++ im Hintergrund ganz von alleine darum, diese im Hauptlager abzulegen und zu verwalten. Anders als in C müssen wir hier nicht mehr manuell mit `malloc` und `free` hantieren – C++ räumt das Lager automatisch auf, wenn die Kisten nicht mehr gebraucht werden (RAII-Prinzip)!

---

## 📦 Micro-Learning 1: Variablen & Datentypen (Das const-Schloss)

### 🧸 Die Analogie: Standardmäßig offene Postfächer
Unsere Postfächer haben standardmäßig kein Schloss. Jeder kann den Inhalt herausnehmen und ändern.
*   **Das Vorhängeschloss (`const`):** Hängen wir ein Schloss davor, wird die Variable unveränderlich. Der Inhalt kann nur noch abgelesen, aber nie wieder überschrieben werden.

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Ein veränderbares Postfach:**
    ```cpp
    int briefe_anzahl = 5;
    briefe_anzahl = 10; // ✅ In C++ erlaubt!
    ```
*   **Ein verschlossenes Postfach (`const`):**
    ```cpp
    const int postleitzahl = 12345;
    // postleitzahl = 54321; // ❌ Fehler! Der Compiler verbietet das.
    ```

---

## 🏷️ Micro-Learning 2: Kontrollfluss (Der Sortierer)

### 🧸 Die Analogie: Die Sortierweiche
Der Postsortierer prüft Bedingungen (`if`) und lenkt die Briefe um.
*   In C++ müssen Bedingungen immer in runden Klammern `()` stehen.
*   Genau wie in C sind Kontrollstrukturen in C++ **Anweisungen** (Statements) und keine Ausdrücke (wie in Rust).

### 🛠️ Anleitung & Syntax-Spickzettel

```cpp
int plz = 20457;

if (plz < 30000) {
    std::cout << "Brief geht in den Norden." << std::endl;
} else {
    std::cout << "Brief geht in den Süden." << std::endl;
}

// Eine Zählschleife zum Stempeln
for (int i = 0; i < 3; i++) {
    std::cout << "Brief gestempelt!" << std::endl;
}
```

---

## 🍯 Micro-Learning 3: Streams (Das Fließband für Ein-/Ausgabe)

### 🧸 Die Analogie: Keine Schablonen mehr!
In C mussten wir dem Boten eine Schablone mitgeben (z.B. `%d` bei `scanf`), um Daten einzulesen. In C++ nutzen wir komfortable Fließbänder:
*   `std::cout <<` schiebt Daten auf das Ausgabe-Fließband.
*   `std::cin >>` lenkt Daten vom Eingabe-Fließband in unsere Variablen – ganz ohne den fehleranfälligen Adress-Operator `&`!

### 🛠️ Anleitung & Syntax-Spickzettel

```cpp
#include <iostream>

int main() {
    int hausnummer = 0;
    std::cout << "Bitte gib deine Hausnummer ein: ";
    
    // Daten fließen vom Eingabeband direkt in die Variable hausnummer
    std::cin >> hausnummer; 
    
    std::cout << "Geliefert an Hausnummer: " << hausnummer << std::endl;
    return 0;
}
```

---

## 🪙 Micro-Learning 4: Referenzen (Der Spitzname)

### 🧸 Die Analogie: Das Namensschild
Anstatt mit Adresszetteln (Pointern) zu arbeiten, vergeben wir in C++ einfach einen **Spitznamen (Referenz)** für ein Postfach. Das geschieht mit dem Zeichen `&` im Datentyp (z. B. `int&`).

### 🛠️ Anleitung & Syntax-Spickzettel

```cpp
#include <iostream>

int main() {
    int briefkasten = 42;
    int& alias = briefkasten; // 'alias' ist nun ein Spitzname für 'briefkasten'

    alias = 100; // Wir ändern den Wert über den Spitznamen

    std::cout << "Originaler Briefkasten: " << briefkasten << std::endl; // Ausgabe: 100
    return 0;
}
```

---

## 📖 Micro-Learning 5: `std::string` (Das elastische Druckerband)

### 🧸 Die Analogie: Keine Stoppschilder-Sorgen!
Vergiss `char`-Arrays und das Null-Byte `'\0'`. In C++ verwenden wir `std::string`. Das ist ein elastisches Band, das sich bei längerem Text vollautomatisch dehnt.

### 🛠️ Anleitung & Syntax-Spickzettel

```cpp
#include <iostream>
#include <string>

int main() {
    std::string kunden_name = "Thorsten";
    kunden_name = kunden_name + " Kloehn"; // Direktes Zusammenfügen!

    std::cout << "Kunde: " << kunden_name << std::endl;
    return 0;
}
```

---

## 🛠️ Mitmach-Workshop: Programmiere deine Poststation 2.0!

Jetzt bist du an der Reihe! Wir schreiben ein kleines, interaktives C++-Programm, um das Gelernte anzuwenden.

### 📝 Dein Notizzettel (Das Ziel des Workshops)
Dein Programm soll:
1.  Ein Postfach für ein Paketgewicht (`int`) anlegen.
2.  Eine Funktion nutzen, die das Paketgewicht über eine **Referenz** (Call-by-Reference) direkt ändert.
3.  Einen Kundennamen als `std::string` über die Konsole einlesen.
4.  Eine Erfolgsmeldung mit dem Namen und dem neuen Gewicht ausgeben.

---

### 💻 Das Code-Skelett (Bitte ausfüllen!)

Kopiere diesen Code in deine Entwicklungsumgebung und ersetze die `/* TODO */`-Kommentare durch deine eigene Logik.

```cpp
#include <iostream>
#include <string>

// Schritt 2: Diese Funktion erhält das Gewicht als REFERENZ (Spitzname)
// Welches Zeichen müssen wir an den Typ anhängen? (Tipp: &)
void paket_wiegen(int/* TODO: Referenz-Operator */ gewicht_ref) {
    // TODO: Setze das Gewicht über die Referenz auf den Wert 25
}

int main() {
    // 1. Paketgewicht erstellen und initialisieren
    int paket_gewicht = 10;
    
    std::cout << "Gewicht vor dem Wiegen: " << paket_gewicht << " kg" << std::endl;

    // 2. Funktion aufrufen. In C++ übergeben wir die Variable einfach direkt!
    // C++ kümmert sich selbst darum, die Referenz im Funktionskopf zu verknüpfen.
    paket_wiegen(/* TODO: Variable übergeben */);

    std::cout << "Gewicht nach dem Wiegen: " << paket_gewicht << " kg" << std::endl; // Sollte 25 sein!

    // 3. std::string für den Kundennamen vorbereiten
    std::string kunden_name = "";

    std::cout << "Bitte gib deinen Namen ein: ";
    
    // Tipp: Verwende std::cin, um den Namen einzulesen
    /* TODO: Einlesen */ >> kunden_name;

    std::cout << "Paket erfolgreich zugestellt an: " << kunden_name << std::endl;

    return 0;
}
```

---

## 📝 Reichlich Übungen zum Vertiefen

Vervollständige die folgenden Code-Gerüste, um die C++-Konzepte abzusichern.

### 🟢 Übung 1 (Leicht): Spitznamen-Test
**Ziel:** Verstehe die Funktionsweise von Referenzen.
**Szenario:** Erstelle eine Variable und weise ihr zwei verschiedene Referenzen zu. Ändere den Wert über eine Referenz und gib ihn über die andere aus.

```cpp
#include <iostream>

int main() {
    int original_wert = 10;
    
    // TODO: Erstelle eine Referenz namens 'ref1' auf 'original_wert'
    
    // TODO: Erstelle eine weitere Referenz namens 'ref2' auf 'original_wert'
    
    // TODO: Ändere den Wert über 'ref1' auf 99
    
    // TODO: Gib 'ref2' über std::cout aus. Welcher Wert erscheint?
    
    return 0;
}
```

---

### 🟡 Übung 2 (Mittel): Der moderne Porto-Rechner
**Ziel:** Nutze `std::string` und Referenzen in einer Auswertung.
**Szenario:** Eine Funktion soll das Porto basierend auf dem Paketgewicht berechnen. Zusätzlich soll der Status ("Standard" oder "Premium") in einen String-Parameter geschrieben werden, der als Referenz übergeben wird.

```cpp
#include <iostream>
#include <string>

// Berechnet das Porto und setzt den Status-String
void berechne_porto(int gewicht, double& porto_ref, std::string& status_ref) {
    // TODO: 
    // Wenn das Gewicht kleiner oder gleich 5 kg ist, soll das Porto 4.99 betragen und der Status "Standard".
    // Wenn es schwerer ist, soll das Porto 9.99 betragen und der Status "Premium".
}

int main() {
    int gewicht = 8;
    double porto = 0.0;
    std::string versand_status = "";

    // TODO: Rufe berechne_porto auf
    
    std::cout << "Porto: " << porto << " Euro | Status: " << versand_status << std::endl;
    // Erwartete Ausgabe: Porto: 9.99 Euro | Status: Premium
    
    return 0;
}
```

---

### 🔴 Übung 3 (Schwer): Die Paket-Historie mit `std::vector`
**Ziel:** Nutze dynamische Container anstelle von C-Arrays.
**Szenario:** Der Benutzer soll nacheinander Paketgewichte eingeben können. Diese werden in einem `std::vector<double>` gespeichert. Sobald der Benutzer `0` eingibt, stoppt die Eingabe und das Programm berechnet die Summe aller Paketgewichte.

```cpp
#include <iostream>
#include <vector>
#include <numeric> // Optional für std::accumulate, oder berechne manuell in einer Schleife

int main() {
    std::vector<double> gewichte;
    double eingabe = -1.0;

    std::cout << "Gib die Paketgewichte ein (0 zum Beenden):" << std::endl;

    // TODO: Schreibe eine Schleife, die so lange Eingaben liest, bis der Benutzer 0 eingibt.
    // Füge die Gewichte mit .push_back(eingabe) dem Vektor hinzu.
    
    // TODO: Berechne die Summe aller Gewichte im Vektor und gib sie aus.
    // Tipp: Du kannst die Größe des Vektors mit gewichte.size() abfragen und mit einer Schleife durchlaufen.

    return 0;
}
```

---

## 📇 Merkzettel für die Hosentasche (Zusammenfassung)

| C++-Werkzeug | Was macht es? | Post-Analogie | Syntax-Beispiel |
| :--- | :--- | :--- | :--- |
| **`std::cout <<`** | Schiebt Daten auf das Ausgabe-Fließband | Postausgangsband | `std::cout << x;` |
| **`std::cin >>`** | Leitet Eingaben in eine Variable | Posteingangsband | `std::cin >> x;` |
| **`std::string`** | Ein sicherer, elastischer Texttyp | Dynamisches Druckerband | `std::string s = "C++";` |
| **`&`** (im Typ) | Deklariert eine Referenz | Spitzname für ein Fach | `int& ref = original;` |
| **`std::vector<T>`** | Ein dynamisches, mitwachsendes Array | Modulares Paketregal | `std::vector<int> v;` |

---

## 🎓 Mini-Quiz (Micro-Learning)
*Versuche, diese Fragen im Kopf zu beantworten:*
1.  Warum braucht man bei `std::cin >> variable;` keinen Adress-Operator `&` mehr?
2.  Was unterscheidet eine Referenz (`int&`) grundlegend von einem Pointer (`int*`)?
3.  Was passiert, wenn du vergisst, die Bibliothek `<string>` einzubinden, aber `std::string` verwendest?
4.  Warum ist `std::vector` sicherer und flexibler als ein klassisches C-Array?
