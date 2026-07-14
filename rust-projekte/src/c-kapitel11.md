# 11 Dynamische Speicherverwaltung

Bisher hast du in C Variablen und Arrays verwendet, deren Größe bereits beim Schreiben des Programms (also zur Compilezeit) feststehen musste. Der Speicher für diese Variablen wird automatisch auf dem sogenannten **Stack** verwaltet: Tritt eine Funktion in Aktion, wird der Speicher bereitgestellt, und sobald die Funktion endet, wird er automatisch wieder freigegeben.

Doch was tust du, wenn die Größe eines Arrays erst während der Programmausführung (zur Laufzeit) bekannt ist – zum Beispiel, weil der Benutzer eingibt, wie viele Messwerte er erfassen möchte?

Hier kommt die **dynamische Speicherverwaltung** ins Spiel. Dabei forderst du Speicher aus einem großen, flexiblen Speicherbereich an, dem **Heap**. Dieser Speicher bleibt so lange reserviert, bis du ihn explizit wieder freigibst.

---

## 11.1 Neuen Speicher zur Laufzeit reservieren

Um dynamischen Speicher zu verwalten, benötigst du die Standardbibliothek `<stdlib.h>`. Die beiden wichtigsten Funktionen, um frischen Speicher anzufordern, sind `malloc()` und `calloc()`.

### malloc()
Die Funktion `malloc()` steht für *memory allocation* (Speicherreservierung). Sie reserviert einen zusammenhängenden Speicherblock der gewünschten Größe in Bytes.

Die Syntax sieht im Prinzip so aus:
```c
void* malloc(size_t size);
```

- **`size_t`**: Ein ganzzahliger Datentyp, der für Größenangaben verwendet wird.
- **`void*`**: Ein generischer Zeiger. Er zeigt einfach auf eine Adresse im Speicher, ohne dass C weiß, welcher Datentyp dort liegen soll. Du musst diesen Zeiger dem passenden Zeigertyp deiner Variable zuweisen.
- **`sizeof`-Operator**: Da die Größe in Bytes angegeben werden muss, nutzt man fast immer den `sizeof`-Operator, um die plattformunabhängige Größe eines Datentyps zu ermitteln.

Ein minimales Struktur-Template für die Verwendung von `malloc()` für ein Array von `n` Ganzzahlen (`int`):

```c
// Template zur Speicherreservierung
Typ *zeiger = malloc(anzahl * sizeof(Typ));
```

> [!NOTE]
> Der durch `malloc()` reservierte Speicher enthält **zufällige Werte** (Speichermüll). Du darfst nicht davon ausgehen, dass der Speicher mit `0` initialisiert ist!

### calloc()
Die Funktion `calloc()` steht für *contiguous allocation*. Sie unterscheidet sich in zwei Punkten von `malloc()`:
1. Sie nimmt zwei Argumente: Die Anzahl der Elemente und die Größe eines einzelnen Elements.
2. Sie **initialisiert den gesamten reservierten Speicherbereich mit Nullen (0)**.

Die Syntax lautet:
```c
void* calloc(size_t num, size_t size);
```

Ein Struktur-Template für `calloc()`:
```c
Typ *zeiger = calloc(anzahl, sizeof(Typ));
```

### Die unabdingbare Fehlerprüfung
Speicher ist keine unendliche Ressource. Wenn das Betriebssystem keinen Speicher mehr zur Verfügung stellen kann (z. B. weil der RAM voll ist), schlägt die Reservierung fehl. In diesem Fall geben sowohl `malloc()` als auch `calloc()` einen speziellen Zeiger zurück: **`NULL`**.

> [!IMPORTANT]
> Du darfst **niemals** auf einen Speicherbereich zugreifen, ohne vorher geprüft zu haben, ob die Reservierung erfolgreich war! Ein Zugriff auf einen `NULL`-Zeiger führt unweigerlich zu einem Absturz deines Programms (Segmentation Fault).

Prüfe die Speicherreservierung immer nach folgendem Muster:

```c
Typ *ptr = malloc(...);
if (ptr == NULL) {
    // Fehlerbehandlung: z. B. Fehlermeldung ausgeben und Programm kontrolliert beenden
}
```

---

## 11.2 Speicherblöcke vergrößern oder verkleinern

Manchmal stellt sich während der Laufzeit heraus, dass der zuvor reservierte Speicherplatz nicht ausreicht oder viel zu groß bemessen war. Mit der Funktion `realloc()` (*re-allocation*) kannst du die Größe eines bereits bestehenden dynamischen Speicherblocks anpassen.

Die Syntax lautet:
```c
void* realloc(void *ptr, size_t new_size);
```

### Wie arbeitet `realloc()` unter der Haube?
1. **Vergrößerung vor Ort**: Wenn hinter dem aktuellen Speicherblock noch genügend freier Platz im Heap vorhanden ist, wird der Block einfach vergrößert. Die Adresse bleibt gleich.
2. **Umzug**: Ist dahinter kein Platz frei, sucht `realloc()` an einer anderen Stelle im Heap nach einem ausreichend großen freien Block, kopiert die bisherigen Daten dorthin, gibt den alten Speicherblock automatisch frei und gibt die Adresse des neuen Speicherblocks zurück.
3. **Fehlschlag**: Kann kein passender Speicherplatz gefunden werden, gibt `realloc()` `NULL` zurück. Der ursprüngliche Speicherblock bleibt jedoch unberührt und existiert weiterhin an seiner alten Adresse!

> [!WARNING]
> Weise das Ergebnis von `realloc()` niemals direkt dem alten Zeiger zu! Wenn `realloc()` fehlschlägt und `NULL` zurückgibt, überschreibst du deinen einzigen Verweis auf den alten Speicherblock. Die Daten sind verloren und der Speicher kann nicht mehr freigegeben werden (Memory Leak).

Verwende stattdessen immer einen temporären Zeiger für die Prüfung:

```c
// Sicheres Vorgehen bei realloc
Typ *temp = realloc(alter_zeiger, neue_groesse);
if (temp == NULL) {
    // Fehlerbehandlung: Der alte Speicher blockiert immer noch unter 'alter_zeiger'!
} else {
    alter_zeiger = temp; // Zuweisung erst nach erfolgreicher Prüfung
}
```

---

## 11.3 Speicherblöcke wieder freigeben

Im Gegensatz zum Stack wird der Heap-Speicher nicht automatisch bereinigt, wenn die Funktion oder der Block endet, in dem er angefordert wurde. Du als Programmierer bist vollkommen selbst dafür verantwortlich, jeden reservierten Speicherblock wieder dem System zur Verfügung stellen, sobald du ihn nicht mehr benötigst.

Dazu dient die Funktion `free()`:
```c
void free(void *ptr);
```

Du übergibst `free()` einfach die Startadresse des Speicherblocks, den du freigeben möchtest.

### Dangling Pointer (Hängende Zeiger)
Nachdem du `free(ptr)` aufgerufen hast, zeigt die Variable `ptr` immer noch auf dieselbe Speicheradresse wie zuvor. Der Speicher an dieser Adresse wurde jedoch bereits für andere Anwendungen freigegeben.

Wenn du nun versuchst, über `ptr` auf die Daten zuzugreifen oder sie zu verändern, greifst du auf einen ungültigen Speicherbereich zu. Dies nennt man einen **Dangling Pointer** (hängenden Zeiger).

> [!TIP]
> Um versehentliche Zugriffe auf freigegebenen Speicher zu verhindern, solltest du den Zeiger direkt nach dem Aufruf von `free()` auf `NULL` setzen. Ein Zugriff auf einen `NULL`-Zeiger stürzt zwar auch ab, ist aber wesentlich einfacher zu debuggen als das unvorhersehbare Verhalten eines Dangling Pointers.

```c
free(ptr);
ptr = NULL; // Zeiger sicher "entwerten"
```

### 11.3.1 Memory Leaks (Speicherlecks)
Ein Speicherleck (Memory Leak) entsteht, wenn du Speicher reservierst, aber die Adresse (den Zeiger) darauf verlierst, ohne den Speicher vorher mit `free()` freigegeben zu haben.

**Wie verliert man eine Adresse?**
- Du überschreibst den Zeiger mit einer neuen Adresse:
  ```c
  int *ptr = malloc(sizeof(int));
  ptr = malloc(sizeof(int)); // Die Adresse des ersten malloc ist unwiederbringlich verloren!
  ```
- Die Zeigervariable verliert ihre Gültigkeit (Scope), z. B. am Ende einer Funktion:
  ```c
  void funktion() {
      int *lokaler_ptr = malloc(100 * sizeof(int));
      // Kein free(lokaler_ptr) am Ende!
  } // lokaler_ptr wird gelöscht, aber der Speicher auf dem Heap bleibt reserviert.
  ```

Ein einzelnes kleines Speicherleck ist meist kein Problem, da moderne Betriebssysteme den gesamten Speicher eines Programms nach dessen Beendigung automatisch aufräumen. Läuft dein Programm jedoch über Tage, Wochen oder Monate (wie z. B. ein Webserver, ein Hintergrunddienst oder ein Spiel) und verliert kontinuierlich Speicher, wird das System irgendwann verlangsamt oder das Programm stürzt ab, weil kein RAM mehr übrig ist.

---

## 11.4 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der grundlegende Unterschied zwischen Stack und Heap bezüglich der Lebensdauer von Variablen?
2. Welchen Wert gibt `malloc()` zurück, wenn nicht genügend freier Speicher vorhanden ist, und warum ist das wichtig?
3. Worin besteht der Unterschied zwischen `malloc()` und `calloc()`?
4. Warum darfst du das Ergebnis von `realloc()` nicht direkt in der Zeigervariablen speichern, die du vergrößern möchtest?
5. Was versteht man unter einem "Dangling Pointer" und wie kann man sich davor schützen?
6. Erkläre den Begriff "Memory Leak" (Speicherleck). Welche Auswirkungen kann ein solches Leck auf ein Betriebssystem haben?

### Aufgaben

#### Aufgabe 1: Dynamischer Notenschnitt
Schreibe ein Programm, das den Benutzer zuerst fragt, wie viele Noten er eingeben möchte. Reserviere daraufhin exakt passenden Speicher für diese Anzahl an Noten (als Fließkommazahlen `float`).
Lies die Noten ein, berechne den Durchschnitt und gib ihn aus. Vergiss nicht, den Speicher am Ende wieder freizugeben und die Fehlerprüfung für die Speicherreservierung durchzuführen.

#### Aufgabe 2: Der wachsende Speicher
Simuliere ein einfaches dynamisches Array. Reserviere zu Beginn Platz für genau 3 ganze Zahlen (`int`).
Lies Zahlen vom Benutzer in einer Schleife ein. Wenn der Benutzer mehr als 3 Zahlen eingeben möchte, verdopple die Größe des Speicherbereichs mithilfe von `realloc()` (verwende das sichere Zuweisungsschema!).
Die Schleife soll enden, wenn der Benutzer `0` eingibt. Gib am Ende alle eingegebenen Zahlen aus und räume den Speicher auf.

#### Aufgabe 3: Finde die Speicherfehler (Review)
Betrachte gedanklich die folgenden Code-Snippets. Welche Probleme (Memory Leaks, Dangling Pointer, Abstürze) lauern hier? (Schreibe sie auf, ohne echten Code auszuführen.)

**Snippet A:**
```c
void erstelle_daten() {
    double *daten = malloc(50 * sizeof(double));
    daten[0] = 3.14;
}
```

**Snippet B:**
```c
int *ptr = malloc(sizeof(int));
*ptr = 42;
free(ptr);
printf("Wert: %d\n", *ptr);
```

**Snippet C:**
```c
int *werte = malloc(5 * sizeof(int));
// ... werte wird befüllt ...
werte = realloc(werte, 10 * sizeof(int));
```
