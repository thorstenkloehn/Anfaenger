# 🛹 Mitmach-Workshop: Phase 1 bildhaft verstehen (Die Poststation)

Willkommen in der manuellen Poststation! 📯✨

Wenn man zum ersten Mal von **Zeigern (Pointern)**, **Speicheradressen**, **scanf** und **char-Arrays** hört, kann sich das anfangs sehr abstrakt anfühlen. Aber keine Sorge: C arbeitet im Grunde genau wie ein traditionelles Postamt, bei dem alle Vorgänge manuell mit Zetteln und Adressen organisiert werden müssen!

In diesem Kapitel bauen wir zusammen ein Postamt im Kopf auf und setzen es danach Schritt für Schritt in C um. Mach dich bereit für deine ersten praktischen Schritte in C!

---

## 🧠 Hintergrund: Wie arbeitet der Speicher in C? (Stack vs. Heap)

Bevor wir Briefe sortieren, müssen wir verstehen, wo C die Daten im Arbeitsspeicher ablegt. Stell dir vor, unsere Poststation hat zwei Bereiche:

### 1. Der Sortiertisch (Stack)
Hier arbeitet der Postbeamte direkt. Auf dem Tisch liegen Briefe und Pakete, die sofort griffbereit sein müssen.
*   **Vorteil:** Blitzschnell erreichbar.
*   **Nachteil:** Der Platz auf dem Tisch ist klein und fest begrenzt. Und das Wichtigste: Jedes Paket hier muss eine **feste, unveränderliche Größe** haben (z. B. eine kleine Hausnummer wie `int` oder ein einzelner Buchstabe wie `char`).
*   Hier liegen auch unsere Adresszettel (Pointer), die uns sagen, wo größere Pakete gelagert sind.

### 2. Das Hauptlager (Heap)
Wenn wir sehr große Pakete empfangen, deren Größe wir vorher noch gar nicht genau kennen, passen sie nicht auf den Sortiertisch. Wir lagern sie im Hauptlager ein.
*   **Vorteil:** Fast unbegrenzter Platz. Pakete können dynamisch wachsen oder schrumpfen.
*   **Wie funktioniert das?** Das Paket liegt im Regal im Hauptlager. Auf dem Sortiertisch (Stack) liegt nur ein kleiner Zettel mit der genauen Regalnummer (die **Speicheradresse** oder der **Pointer**).
*   In C müssen wir dieses Lager manuell verwalten: Wir müssen Speicherplatz im Lager anfordern (`malloc`) und ihn, wenn wir ihn nicht mehr brauchen, zwingend wieder freigeben (`free`), sonst läuft das Lager irgendwann über (Speicherleck).

---

## 📦 Micro-Learning 1: Die Postfächer (Variablen & Datentypen)

### 🧸 Die Analogie: Nummerierte Postfächer und die Schlösser
Stell dir eine Wand mit Postfächern vor. Jedes Fach hat eine feste Nummer (**Speicheradresse**), einen Namen (**Variablenname**) und eine bestimmte Größe (**Datentyp**).

*   **Standardmäßig offen (veränderbar / mutable):** In C haben die Postfächer standardmäßig kein Schloss. Jeder, der die Adresse kennt, kann den Inhalt herausnehmen und durch etwas Neues ersetzen.
*   **Das Vorhängeschloss (`const`):** Wenn wir ein Postfach als `const` deklarieren, hängen wir ein Schloss davor. Der Inhalt kann ab jetzt nur noch gelesen, aber nie wieder verändert werden.

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Ein normales Postfach erstellen (veränderbar):**
    ```c
    // Ein Fach für ganze Zahlen. Standardmäßig veränderbar!
    int briefe_anzahl = 5;
    briefe_anzahl = 10; // ✅ Erlaubt!
    ```
*   **Ein Postfach verschließen (`const`):**
    ```c
    // Dieses Fach kann nicht mehr überschrieben werden
    const int postleitzahl = 12345;
    // postleitzahl = 54321; // ❌ Fehler! Der Compiler verbietet das.
    ```

> [!WARNING]
> **Staub im Postfach (Garbage Values):**
> Wenn du ein neues Fach reservierst, aber nichts hineinlegst (`int gewicht;`), liegt dort nicht "Nichts". Es liegt dort der Müll (zufällige Daten) vom Vorgänger, der das Fach vor dir benutzt hat! Initialisiere deine Variablen in C daher **immer** sofort mit einem Startwert (z. B. `int gewicht = 0;`).

---

## 🏷️ Micro-Learning 2: Der Postsortierer (Kontrollfluss)

### 🧸 Die Analogie: Die Sortierweiche
Der Kontrollfluss entscheidet, welchen Weg ein Brief nimmt. Ein Postsortierer schaut sich die Postleitzahl an: "Liegt die Postleitzahl im Norden?" Wenn ja, kommt der Brief in die linke Kiste, sonst in die rechte.

In C nutzen wir dafür `if` und `else`. Anders als in Rust ist eine `if`-Bedingung in C eine reine **Anweisung** und kein Ausdruck – sie kann also nicht direkt einen Wert zurückgeben. Außerdem müssen Bedingungen in C immer in runden Klammern `()` stehen!

### 🛠️ Anleitung & Syntax-Spickzettel

*   **Der Postleitzahlen-Check (`if-else`):**
    ```c
    int plz = 20457;

    // Runden Klammern um die Bedingung sind Pflicht!
    if (plz < 30000) {
        printf("Brief geht in den Norden.\n");
    } else {
        printf("Brief geht in den Süden.\n");
    }
    ```
*   **Die endlose Stempelmaschine (`while`-Schleife):**
    Solange noch Briefe im Korb sind, stempeln wir weiter.
    ```c
    int briefstapel = 3;

    while (briefstapel > 0) {
        printf("Brief gestempelt!\n");
        briefstapel--; // Einen Brief vom Stapel abziehen
    }
    ```

---

## 🍯 Micro-Learning 3: Der Zustelldienst (Benutzereingabe mit `scanf`)

### 🧸 Die Analogie: Der Zustellschein und der Hausbriefkasten
Wenn ein Zusteller ein Paket abgibt, benötigt er zwei Dinge:
1.  **Eine Schablone (Format-Platzhalter):** Er muss wissen, was geliefert wird. Ist es ein Brief (Text) oder eine Kiste (Zahl)? In C nutzen wir dafür Symbole wie `%d` (für Ganzzahlen) oder `%f` (für Kommazahlen).
2.  **Die genaue Speicheradresse (`&`):** Er kann das Paket nicht einfach in die Luft werfen. Er muss wissen, zu welcher Postfachnummer (Speicheradresse) er gehen soll. Das `&`-Zeichen liefert ihm diese genaue Adresse.

### 🛠️ Anleitung & Syntax-Spickzettel

```c
#include <stdio.h>

int main() {
    int hausnummer = 0;
    printf("Bitte gib deine Hausnummer ein: ");

    // %d = "Erwarte eine Ganzzahl"
    // &hausnummer = "Gehe direkt zur Adresse der Variable und lege die Zahl dort ab"
    scanf("%d", &hausnummer);

    printf("Geliefert an Hausnummer %d!\n", hausnummer);
    return 0;
}
```

> [!CAUTION]
> **Das vergessene `&`:**
> Wenn du das `&` vergisst (`scanf("%d", hausnummer);`), versucht der Bote, das Paket an die Postfachnummer `0` (den Standardwert) oder eine andere willkürliche Zahl zuzustellen. Das Betriebssystem stoppt diesen illegalen Speicherzugriff sofort und beendet dein Programm mit einem Absturz (`Segmentation fault`).

---

## 🪙 Micro-Learning 4: Die Adresszettel (Pointer)

### 🧸 Die Analogie: Adresszettel statt schwerer Pakete
Wenn du einem Kollegen sagen willst, wo ein riesiges Paket liegt, schleppst du nicht das Paket zu ihm. Du schreibst die Regalnummer auf einen kleinen Zettel und gibst ihm diesen. Dieser Zettel ist ein **Pointer (Zeiger)**.
*   **`&` (Adresse holen):** Du schaust auf die Kiste und schreibst ihre Adresse auf den Zettel.
*   **`*` (Dereferenzieren):** Dein Kollege nimmt den Zettel, geht zu der darauf geschriebenen Adresse und schaut in die Kiste hinein oder ändert ihren Inhalt.

Da C keinen "Wächter" (Borrow Checker) hat, kannst du beliebig viele Adresszettel kopieren und verteilen. Aber Vorsicht: Wenn das Paket weggeworfen wird und du trotzdem versuchst, der Adresse auf dem Zettel zu folgen, greifst du ins Leere (**Dangling Pointer**).

### 🛠️ Anleitung & Syntax-Spickzettel

```c
int briefkasten = 42;
int *adresszettel = &briefkasten; // Der Zeiger speichert die Adresse von "briefkasten"

// Ausgabe der Adresse und des Inhalts
printf("Die Adresse lautet: %p\n", (void*)adresszettel);
printf("Der Inhalt an der Adresse ist: %d\n", *adresszettel); // Ausgabe: 42

// Inhalt über den Adresszettel ändern
*adresszettel = 100; // Gehe zur Adresse und schreibe dort 100 rein
printf("Neuer Wert im Briefkasten: %d\n", briefkasten); // Ausgabe: 100
```

---

## 📖 Micro-Learning 5: Die Perlenkette (Strings)

### 🧸 Die Analogie: Die Perlenkette mit dem Stoppschild
In C gibt es keinen fertigen Datentyp für Wörter oder Sätze. Ein Text ist wie eine Kette aus einzelnen Buchstaben-Perlen (`char`), die nebeneinander in Postfächern liegen. 

Damit der Postbote weiß, wo der Text aufhört, muss am Ende der Kette zwingend eine spezielle Stopp-Perle hängen: das Null-Byte-Zeichen `'\0'`. Liest das Programm den Text aus, läuft es so lange von Fach zu Fach, bis es auf das Stoppschild trifft.

### 🛠️ Anleitung & Syntax-Spickzettel

```c
// Ein Text-Array mit Platz für 5 Zeichen + 1 Null-Byte
char status[6] = "Offen";

// Im Speicher sieht das so aus:
// Fach-Index:  [0]  [1]  [2]  [3]  [4]  [5]
// Inhalt:      'O'  'f'  'f'  'e'  'n'  '\0'

printf("Status: %s\n", status); // %s liest alle Fächer bis zum '\0'
```

> [!WARNING]
> **Das fehlende Stoppschild:**
> Wenn du das `'\0'`-Zeichen entfernst oder vergisst, liest C einfach über das Ende deines Textes hinaus im Speicher weiter. Es gibt dann zufälligen Zeichensalat aus anderen Variablen aus oder stürzt ab!

---

## 🛠️ Mitmach-Workshop: Programmiere deine Poststation!

Jetzt bist du an der Reihe! Wir schreiben ein kleines, interaktives C-Programm, um das Gelernte anzuwenden.

### 📝 Dein Notizzettel (Das Ziel des Workshops)
Dein Programm soll:
1.  Ein Postfach für ein Paketgewicht (`int`) anlegen.
2.  Einen Adresszettel (Pointer) auf dieses Fach erstellen.
3.  Eine Funktion nutzen, die das Paketgewicht über diesen Adresszettel ändert (Call-by-Reference).
4.  Einen Kundennamen als Text einlesen und ausgeben.

---

### 🧱 Schritt-für-Schritt-Bauanleitung

#### 🏢 Schritt 1: Das Paketgewicht anlegen
Erstelle in deiner `main`-Funktion ein Paketgewicht als Ganzzahl mit dem Startwert `10`.

#### ✉️ Schritt 2: Den Adresszettel nutzen
Schreibe eine Funktion `paket_wiegen`. Sie soll das Gewicht verändern. Da C-Funktionen normalerweise nur Kopien von Werten erhalten, müssen wir der Funktion die Adresse der Variable übergeben (also einen Pointer `int *gewicht_ptr`).

#### 📯 Schritt 3: Den Kundennamen einlesen
Erstelle ein `char`-Array für den Kundennamen. Lies den Namen mit `scanf` ein. Denk daran, dass ein String-Array in C bereits eine Adresse ist – du brauchst hier also kein `&` bei `scanf`!

---

### 💻 Das Code-Skelett (Bitte ausfüllen!)

Kopiere diesen Code in deine Entwicklungsumgebung und ersetze die `/* TODO */`-Kommentare durch deine eigene Logik.

```c
#include <stdio.h>

// Schritt 2: Diese Funktion erhält die ADRESSE des Gewichts und ändert den Wert vor Ort.
// Welcher Typ muss "gewicht_ptr" sein? (Tipp: Ein Zeiger auf ein int)
void paket_wiegen(/* TODO: Typ für Zeiger */ gewicht_ptr) {
    // TODO: Setze das Gewicht an der Adresse auf einen neuen Wert (z. B. 25)
    // Tipp: Nutze den Dereferenzierungs-Operator *
}

int main() {
    // 1. Paketgewicht erstellen und initialisieren
    int paket_gewicht = 10;
    
    printf("Gewicht vor dem Wiegen: %d kg\n", paket_gewicht);

    // 2. Funktion aufrufen. Wir müssen die ADRESSE von "paket_gewicht" übergeben!
    // Tipp: Nutze den Adress-Operator &
    paket_wiegen(/* TODO: Adresse übergeben */);

    printf("Gewicht nach dem Wiegen: %d kg\n", paket_gewicht); // Sollte 25 sein!

    // 3. String-Array für den Kundennamen vorbereiten (z. B. maximal 19 Zeichen + '\0')
    char kunden_name[20] = "";

    printf("Bitte gib deinen Vornamen ein: ");
    
    // Lies den Namen über die Konsole ein.
    // Tipp: Der Format-Platzhalter für Text ist %s.
    // Achtung: kunden_name ist bereits ein Array (also eine Adresse), kein & nötig!
    scanf(/* TODO: Format und Variable */);

    printf("Paket erfolgreich zugestellt an: %s\n", kunden_name);

    return 0;
}
```

---

## 📝 Reichlich Übungen zum Vertiefen

Vervollständige die folgenden Code-Gerüste, um die Konzepte abzusichern.

### 🟢 Übung 1 (Leicht): Das const-Schloss knacken?
**Ziel:** Verstehe die Auswirkung von `const`.
**Szenario:** Versuche, den Wert einer geschützten Variable zu ändern. Stelle fest, was der Compiler dazu sagt.

```c
#include <stdio.h>

int main() {
    const int max_paket_groesse = 100;
    
    // TODO: Versuche hier, "max_paket_groesse" den Wert 200 zuzuweisen.
    // Welcher Fehler wird beim Kompilieren angezeigt?
    
    printf("Maximale Größe: %d\n", max_paket_groesse);
    return 0;
}
```

---

### 🟡 Übung 2 (Mittel): Der Porto-Rechner (Kontrollfluss und Zeiger)
**Ziel:** Nutze Kontrollstrukturen und bearbeite Werte über Zeiger.
**Szenario:** Eine Funktion soll das Porto berechnen und das Ergebnis direkt in eine Variable in `main` schreiben.

```c
#include <stdio.h>

// Berechnet das Porto basierend auf dem Gewicht und schreibt es in *porto_ptr
void berechne_porto(int gewicht, float *porto_ptr) {
    // TODO: 
    // Wenn das Gewicht kleiner oder gleich 5 kg ist, soll das Porto 4.99 betragen.
    // Wenn es schwerer ist, soll das Porto 9.99 betragen.
    // Schreibe das Ergebnis direkt über den Zeiger in die Variable!
}

int main() {
    int gewicht = 8;
    float porto = 0.0f;

    // TODO: Rufe berechne_porto auf
    
    printf("Das Porto für %d kg beträgt: %.2f Euro\n", gewicht, porto);
    // Erwartete Ausgabe: 9.99 Euro
    
    return 0;
}
```

---

### 🔴 Übung 3 (Schwer): Das kaputte Stoppschild reparieren (Strings)
**Ziel:** Verstehe die Funktionsweise des Null-Byte-Zeichens `'\0'`.
**Szenario:** Ein Text-Array wurde beschädigt und das Stoppschild ging verloren. Repariere das Array, indem du das Stoppschild manuell an die richtige Stelle setzt.

```c
#include <stdio.h>

int main() {
    // Ein Array, das Buchstaben enthält. Es fehlt jedoch das '\0' am Ende!
    char beschädigter_text[5] = {'R', 'u', 's', 't', '?'}; 
    
    // TODO: Erstelle ein neues, passendes Array namens "reparierter_text" der Größe 5.
    // Kopiere die ersten 4 Zeichen ('R', 'u', 's', 't') und setze an Index [4] das Zeichen '\0'.
    
    // TODO: Gib den reparierten Text mit printf aus.
    
    return 0;
}
```

---

## 📇 Merkzettel für die Hosentasche (Zusammenfassung)

| C-Werkzeug | Was macht es? | Post-Analogie | Syntax-Beispiel |
| :--- | :--- | :--- | :--- |
| **`int x = 5;`** | Erstellt eine veränderbare Ganzzahl-Variable. | Offenes Postfach | `int briefe = 5;` |
| **`const`** | Macht eine Variable unveränderbar. | Postfach mit Vorhängeschloss | `const int plz = 12345;` |
| **`&`** | Liefert die Speicheradresse einer Variable. | Adresse auf Kiste ablesen | `&briefe` |
| **`*`** (Typ) | Deklariert einen Zeiger (Pointer). | Leeren Adresszettel vorbereiten | `int *adress_zettel;` |
| **`*`** (Code) | Greift auf den Wert an einer Adresse zu. | Zur Kiste gehen und Inhalt ändern | `*adress_zettel = 10;` |
| **`char s[10]`** | Erstellt ein Array für Text (String). | Eine Kette von Zeichen-Fächern | `char name[10] = "Tim";` |
| **`'\0'`** | Markiert das Ende eines Strings. | Das Stoppschild am Ende der Kette | *(Vom Compiler automatisch angehängt)* |

---

## 🎓 Mini-Quiz (Micro-Learning)
*Versuche, diese Fragen im Kopf zu beantworten:*
1.  Was passiert, wenn du bei `scanf` den Adress-Operator `&` vergisst?
2.  Warum belegt der String `"Hallo"` im Speicher von C eigentlich 6 Bytes, obwohl er nur 5 Buchstaben hat?
3.  Was ist der Unterschied zwischen der Deklaration `int *p;` und der Zuweisung `*p = 10;`?
4.  Warum stürzt ein C-Programm ab, wenn ein Zeiger auf eine ungültige Speicheradresse zeigt und man versucht, darauf zuzugreifen?

*Viel Erfolg beim Programmieren deiner Poststation und beim Meistern der Übungen! Wenn du eine Frage hast oder nicht weiterkommst, frage deinen KI-Lernpartner nach einem didaktischen Tipp – aber lass dir keine fertigen Code-Lösungen geben!*
