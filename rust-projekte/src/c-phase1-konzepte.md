# Konzepte statt Syntax lernen (C-Programmierung Phase 1)

Der Einstieg in eine neue Programmiersprache fällt viel leichter, wenn du zuerst die grundlegenden **Ideen und Konzepte** verstehst, anstatt nur auswendig gelernte Codezeilen (Syntax) abzutippen. C ist eine der ältesten und einflussreichsten Programmiersprachen der Welt. Sie gibt dir die absolute Kontrolle über die Hardware – verzichtet aber im Vergleich zu modernen Sprachen wie Rust fast vollständig auf ein Sicherheitsnetz.

Dieses Kapitel erklärt die fünf wichtigsten Kernkonzepte der C-Programmierung für Einsteiger anhand von anschaulichen Analogien.

---

## 🧱 1. Variablen & Datentypen: Offene Kisten und manuelle Typwahl

### Die Analogie: Die offenen Kartons
Stell dir den Arbeitsspeicher deines Computers wie ein riesiges Lagerregal voller Kisten (Variablen) vor.
*   **In Rust** sind alle Kisten standardmäßig fest mit Klebeband verschlossen. Du musst explizit ein `mut`-Schild darauf kleben, um den Inhalt verändern zu dürfen.
*   **In C** ist es genau umgekehrt: Alle Kisten sind **standardmäßig offen**! Jeder kann den Inhalt jederzeit herausnehmen, ändern oder überschreiben. Wenn eine Kiste unveränderlich sein soll, musst du sie explizit mit einem `const`-Aufkleber versiegeln.

### Theorie: Explizite Datentypen und Mutabilität
C besitzt keine automatische Typerkennung (Typinferenz). Du musst dem Compiler bei jeder Variable sofort mitteilen, wie groß die Kiste sein soll und was hineinpasst.

```c
// Eine normale, veränderbare Ganzzahl-Variable (int)
int punkte = 100;
punkte = 200; // ✅ In C standardmäßig erlaubt!

// Eine unveränderbare Variable (Konstante)
const float pi = 3.14159f;
// pi = 3.0f; // ❌ Fehler! Der Compiler verhindert das Überschreiben.
```

Die wichtigsten Grundtypen in C:
*   `int`: Ganze Zahlen (meist 32-Bit groß).
*   `float`: Einfache Gleitkommazahlen für Dezimalwerte.
*   `double`: Doppelt genaue Gleitkommazahlen (präziser als `float`).
*   `char`: Ein einzelnes Zeichen (belegt genau 1 Byte im Speicher).

### Typische Einsteigerfehler bei Variablen
*   **Müll-Werte (Garbage Values):** Wenn du in Rust eine Variable ohne Wert erstellst, verhindert der Compiler deren Nutzung. C lässt dich eiskalt darauf zugreifen:
    ```c
    int alter; // Variable ist nicht initialisiert!
    // printf("%d", alter); // ❌ Gibt einen zufälligen Wert aus, der gerade im Speicher lag!
    ```
    *Lösung:* Gewöhne dir an, jede Variable in C direkt bei der Erstellung mit einem Startwert zu belegen (z. B. `int alter = 0;`).

---

## 🔀 2. Kontrollfluss: Anweisungen statt Ausdrücke

### Die Analogie: Straßenkarten und Abzweigungen
Der Kontrollfluss steuert über Bedingungen (`if`) und Schleifen, welchen Weg dein Programm nimmt. In C gilt hier ein strenger Unterschied zu moderneren Sprachen:
*   **In Rust** ist fast alles ein **Ausdruck (Expression)**, der einen Wert zurückgeben kann.
*   **In C** sind Kontrollstrukturen reine **Anweisungen (Statements)**. Sie steuern den Ablauf, können aber selbst keinen Wert erzeugen.

### Theorie: Bedingungen und Zählschleifen
In C müssen die Bedingungen von `if`-Abfragen und Schleifen zwingend in runden Klammern `()` stehen. Zudem nutzt C eine sehr klassische Form der `for`-Schleife, die auf einem Zähler basiert.

```c
int temperatur = 18;

// Die runden Klammern um die Bedingung sind Pflicht!
if (temperatur < 10) {
    printf("Zieh eine Jacke an.\n");
} else {
    printf("Das Wetter ist angenehm.\n");
}

// Eine C-for-Schleife arbeitet mit einem Zähler:
// Startwert; Bedingung zum Weitermachen; Zähler erhöhen
for (int i = 0; i < 5; i++) {
    printf("%d ", i); // Ausgabe: 0 1 2 3 4
}
```

> [!NOTE]
> Da ein `if` in C keinen Wert zurückgibt, kannst du nicht schreiben: `int x = if (bed) { 1 } else { 2 };`.
> C nutzt dafür den sogenannten **Ternär-Operator** für kurze Zuweisungen:
> `int x = (bedingung) ? 1 : 2;`

### Typische Einsteigerfehler beim Kontrollfluss
*   **Die Zuweisungs-Falle:** In C steht ein einzelnes `=` für eine Zuweisung, zwei `==` für einen Vergleich. Da C jede Zahl ungleich `0` als "wahr" (true) interpretiert, führt das zu gefährlichen Fehlern:
    ```c
    int status = 0;
    if (status = 5) { // ❌ Setzt status auf 5 und wertet die Bedingung als WAHR aus!
        // Dieser Code-Block wird fälschlicherweise immer ausgeführt!
    }
    ```
    *Lösung:* Achte peinlich genau darauf, `==` für Vergleiche zu nutzen, und aktiviere immer alle Compiler-Warnungen (z. B. mit `-Wall`).

---

## ⌨️ 3. Benutzereingabe: Die Tücken von `scanf`

### Die Analogie: Schablonen und Postkoordinaten
Wenn du Daten vom Benutzer einlesen möchtest, verlangt C absolute Präzision. Du musst dem Programm genau sagen, in welchem Format die Daten ankommen und an welcher genauen Position im Speicher (Adresse) sie abgelegt werden sollen.
*   **Die Schablone (Format-Platzhalter):** Du musst C mitteilen, was du erwartest (z. B. `%d` für eine Ganzzahl oder `%f` für eine Kommazahl).
*   **Die Postkoordinate (Speicheradresse):** Du gibst der Funktion nicht die Variable selbst, sondern den genauen Standort der Variable im Arbeitsspeicher.

### Theorie: Einlesen mit `scanf`
Um an die Speicheradresse einer Variable zu gelangen, nutzt man in C den Adress-Operator `&` (Und-Zeichen).

```c
#include <stdio.h>

int main() {
    int alter = 0;
    printf("Gib dein Alter ein: ");
    
    // %d = "Erwarte eine Ganzzahl"
    // &alter = "Schreibe das Ergebnis direkt an die Adresse von 'alter'"
    scanf("%d", &alter); 
    
    printf("Du bist %d Jahre alt.\n", alter);
    return 0;
}
```

### Typische Einsteigerfehler bei der Eingabe
*   **Das vergessene `&`:** Vergisst du das `&` vor der Variable bei `scanf`, nimmt C den aktuellen Wert der Variable als Speicheradresse. Da dieser Wert meist `0` oder zufälliger Müll ist, versucht C in einen geschützten Speicherbereich zu schreiben. Das Programm stürzt sofort mit einem `Segmentation fault` (Speicherzugriffsfehler) ab.
*   **Pufferüberlauf (Buffer Overflow):** Wenn du Text einliest und der Benutzer mehr Zeichen eingibt, als deine Variable Platz bietet, schreibt `scanf` die Daten einfach über das Ende der Variable hinaus in benachbarte Speicherbereiche. Dies ist eine der häufigsten Sicherheitslücken in C.

---

## 🧠 4. Pointer & Speicheradressen: Adresszettel statt Eigentum

### Die Analogie: Postadressen statt Eigentumsurkunden
Der Umgang mit Speicher unterscheidet C radikal von modernen Sprachen wie Rust:
*   **Rust** nutzt ein strenges Ownership-Modell. Jedes Datenobjekt hat einen festen Besitzer, und der Compiler wacht darüber, wer wann auf Daten zugreifen darf.
*   **C** kennt kein Ownership. C nutzt **Pointer (Zeiger)**. Ein Pointer ist ein Zettel, auf dem die Postadresse einer Kiste im Speicher steht. Du kannst diese Zettel beliebig oft kopieren, verändern und weitergeben. Es gibt keinen Wächter, der dich vor Fehlern schützt.

### Theorie: Adressen und Dereferenzierung
Ein Pointer wird mit einem Sternchen `*` deklariert.
*   Mit dem Adress-Operator `&` holst du dir die Adresse einer Variable.
*   Mit dem Dereferenzierungs-Operator `*` gehst du zur Adresse auf dem Zettel und greifst auf den Wert zu.

```c
int zahl = 42;
int *zeiger = &zahl; // 'zeiger' speichert nun die Adresse der Variable 'zahl'

// Den Wert über den Zeiger auslesen
printf("Wert: %d\n", *zeiger); // Ausgabe: 42

// Den Wert an der Adresse des Zeigers ändern
*zeiger = 99; // Gehe zur Adresse und schreibe dort 99 rein
printf("Originale Zahl: %d\n", zahl); // Ausgabe: 99
```

### Typische Einsteigerfehler bei Pointern
*   **Dangling Pointer (Verwaiste Zeiger):** Ein Pointer zeigt auf eine Speicheradresse, die bereits freigegeben wurde oder nicht mehr gültig ist (z. B. wenn eine lokale Variable am Ende einer Funktion gelöscht wird). Greifst du darauf zu, stürzt dein Programm ab oder verhält sich unvorhersehbar.
*   **Speicherlecks (Memory Leaks):** Wenn du Speicher dynamisch zur Laufzeit reservierst (mit `malloc`), musst du ihn nach der Verwendung manuell mit `free` wieder freigeben. Vergisst du das, bleibt der Speicher blockiert und dein Programm verbraucht immer mehr Arbeitsspeicher.

---

## 📝 5. Strings: Die Perlenkette mit dem Stoppschild

### Die Analogie: Die Perlenkette mit Stoppschild
In C gibt es kein echtes, dynamisches Text-Objekt (wie `String` in Rust).
*   Ein String in C ist eine einfache **Reihe von Zeichen** (ein Array vom Typ `char`).
*   Damit das Programm weiß, wo das Wort zu Ende ist, hängt am Ende der Kette immer ein spezielles Zeichen: das Null-Byte-Zeichen `'\0'`. Es dient als **Stoppschild** für alle Textoperationen.

### Theorie: C-Strings deklarieren
Wenn du einen Text in doppelten Anführungszeichen schreibst, fügt der Compiler das Stoppschild `'\0'` automatisch am Ende hinzu. Du musst bei der Größe des Arrays also immer 1 Byte mehr einplanen als der Text Zeichen hat!

```c
// "Thorsten" hat 8 Buchstaben. Wir brauchen mindestens 9 Plätze im Array!
char vorname[9] = "Thorsten";

// Im Speicher sieht das so aus:
// ['T', 'h', 'o', 'r', 's', 't', 'e', 'n', '\0']

printf("Hallo %s!\n", vorname); // %s liest den Speicher aus, bis es auf '\0' trifft.
```

### Typische Einsteigerfehler bei C-Strings
*   **Das fehlende Stoppschild:** Wenn du das Zeichen `'\0'` am Ende überschreibst oder das Array zu klein wählst, liest C beim Ausgeben einfach immer weiter durch deinen Arbeitsspeicher, bis es zufällig auf eine Null stößt. Das führt zu seltsamen Hieroglyphen oder Abstürzen.
*   **Strings vergleichen mit `==`:** Wenn du zwei C-Strings mit `==` vergleichst, vergleicht C nicht den Textinhalt, sondern die Speicheradressen (wo die Arrays im Speicher liegen). Um den tatsächlichen Inhalt zu vergleichen, musst du spezielle Funktionen wie `strcmp` verwenden.

---

## 📌 Zusammenfassung: Rust vs. C auf einen Blick

| Konzept | Rust 🦀 | C 🇨 |
| :--- | :--- | :--- |
| **Sicherheit** | Extrem hoch (Compiler prüft alles zur Compilezeit) | Keine (Volle Verantwortung liegt beim Programmierer) |
| **Mutabilität** | Standardmäßig unveränderbar (`let`) | Standardmäßig veränderbar (außer mit `const`) |
| **Typen** | Automatische Erkennung (Typinferenz) | Müssen immer explizit angegeben werden (`int`, `char`, ...) |
| **Speicher** | Automatisches Ownership-Modell (kein GC) | Manuelle Zeiger (`*`) und Speicherverwaltung (`malloc`/`free`) |
| **Strings** | Eigener, sicherer Typ `String` | Zeichen-Array mit Null-Byte `'\0'` am Ende |
| **Auswertung** | `if` ist ein Ausdruck (gibt Wert zurück) | `if` ist eine Anweisung (gibt keinen Wert zurück) |

---

## 🚀 Wie du diese Phase am besten nutzt

1.  **Konzepte verinnerlichen:** Lies dieses Kapitel aufmerksam durch und versuche die Analogien im Kopf nachzuvollziehen.
2.  **Mit Fehlern experimentieren:** Schreibe einfache C-Programme und provoziere bewusst Fehler (z. B. das Weglassen des `&` bei `scanf` oder das Vergessen des `const`-Schlüssels). Dadurch verstehst du, warum C-Programme abstürzen und wie du die Fehler behebst.
3.  **Vorsicht walten lassen:** C verzeiht keine Fehler. Programmiere stets aufmerksam, initialisiere deine Variablen sofort und behalte deine Speicheradressen im Blick!
