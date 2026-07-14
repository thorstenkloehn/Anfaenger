# 13 Dynamische Datenstrukturen

Bisher hast du Daten meistens in Arrays gespeichert. Arrays haben jedoch einen großen Nachteil: Ihre Größe muss bereits beim Erstellen feststehen (entweder zur Compilezeit oder dynamisch auf dem Heap) und kann danach nicht mehr flexibel schrumpfen oder wachsen. Was aber, wenn du eine Anwendung schreibst, bei der du im Vorhinein nicht weißt, wie viele Elemente der Benutzer eingeben wird? Beispielsweise eine Aufgabenliste (To-Do-Liste), bei der ständig Einträge hinzukommen oder gelöscht werden.

Hier kommen **dynamische Datenstrukturen** ins Spiel. Sie wachsen und schrumpfen flexibel im Speicher, während dein Programm läuft. In diesem Kapitel lernst du die Grundlagen dieser Strukturen kennen, insbesondere die verketteten Listen.

---

## 13.1 Einfach verkettete Listen

Stell dir eine einfach verkettete Liste vor wie eine **Schnitzeljagd**. Jeder Teilnehmer (ein Element bzw. "Knoten") hat einen Zettel mit einer Information (den Nutzdaten) und einem Hinweis, wo der nächste Teilnehmer zu finden ist (einen Zeiger auf das nächste Element). Der letzte Teilnehmer hat keinen Zettel mehr – er zeigt ins Leere (`NULL`).

### Das Fundament: Der Knoten (Node)

In C setzen wir einen solchen Knoten mithilfe einer Struktur (`struct`) um. Diese Struktur enthält zwei wesentliche Dinge:
1. Die eigentlichen Daten (z. B. eine Zahl, einen Text).
2. Einen Zeiger, der auf eine Struktur desselben Typs verweist.

Ein minimaler Bauplan für einen solchen Knoten sieht so aus:

```c
struct Knoten {
    int daten;               // Die Nutzdaten
    struct Knoten* naechster; // Zeiger auf das nächste Element
};
```

> [!NOTE]
> Dieser Zeiger `naechster` (oft auch `next` genannt) zeigt auf ein Element vom Typ `struct Knoten`. Zeigt er auf `NULL`, signalisiert das das Ende der Liste. Der Einstiegspunkt in die Liste ist immer ein Zeiger auf das allererste Element, den sogenannten **Kopf** (Head) der Liste.

---

### Elemente einfügen

Das Einfügen von Elementen erfordert ein präzises Management der Zeiger. Es gibt drei typische Szenarien:

#### 1. Einfügen am Anfang (Kopf) der Liste
Das ist die schnellste Methode, da du die Liste nicht durchsuchen musst.
* **Schritt 1:** Erstelle einen neuen Knoten dynamisch im Speicher (mittels `malloc`).
* **Schritt 2:** Setze die Nutzdaten des neuen Knotens.
* **Schritt 3:** Lass den `naechster`-Zeiger des neuen Knotens auf das zeigen, worauf der bisherige Kopfzeiger zeigt.
* **Schritt 4:** Aktualisiere den Kopfzeiger, sodass er nun auf deinen neuen Knoten zeigt.

> [!WARNING]
> Vertauschst du Schritt 3 und Schritt 4, verlierst du den Zugriff auf die gesamte restliche Liste! Das nennt man einen Speicherverlust (Memory Leak), da die bisherigen Elemente im Speicher verbleiben, aber nicht mehr erreichbar sind.

#### 2. Einfügen am Ende der Liste
Hierbei musst du die Liste erst "traversieren" (durchwandern).
* **Schritt 1:** Erstelle den neuen Knoten und setze seinen `naechster`-Zeiger auf `NULL`.
* **Schritt 2:** Wenn die Liste leer ist (Kopf zeigt auf `NULL`), wird der neue Knoten zum Kopf.
* **Schritt 3:** Ist die Liste nicht leer, wandere mit einem Hilfszeiger von Element zu Element, bis du beim letzten Knoten ankommst (dessen `naechster`-Zeiger ist `NULL`).
* **Schritt 4:** Biege den `naechster`-Zeiger dieses letzten Elements so um, dass er auf den neuen Knoten zeigt.

#### 3. Einfügen nach einem bestimmten Element (dazwischen)
Möchtest du ein Element mitten in der Liste einfügen, musst du zwei Verbindungen anpassen:
* **Schritt 1:** Finde das Element, hinter dem eingefügt werden soll (nennen wir es `A`).
* **Schritt 2:** Erstelle den neuen Knoten (nennen wir ihn `Neu`).
* **Schritt 3:** Setze `Neu->naechster` auf das Element, auf das `A` aktuell zeigt (`A->naechster`).
* **Schritt 4:** Setze `A->naechster` auf `Neu`.

---

### Suchen und ausgeben

Um die Elemente einer Liste auszugeben oder nach einem bestimmten Wert zu suchen, musst du die Liste von vorne nach hinten durchlaufen.

Verwende dazu einen **Hilfszeiger** (oft `aktuell` oder `temp` genannt), den du mit der Adresse des Kopfes initialisierst. 

Ein typisches logisches Muster für das Durchwandern sieht so aus:

```c
// Pseudocode / Struktur-Template zur Orientierung
Hilfszeiger = Kopf;
Solange (Hilfszeiger nicht NULL ist) {
    // Verarbeite Hilfszeiger->daten (z.B. ausgeben oder vergleichen)
    Hilfszeiger = Hilfszeiger->naechster; // Gehe zum nächsten Element
}
```

> [!TIP]
> Benutze für das Durchwandern niemals den originalen Kopfzeiger direkt! Wenn du den Kopfzeiger verschiebst, verlierst du den Anfang deiner Liste und kannst später nicht mehr von vorne beginnen.

---

### Elemente entfernen

Beim Löschen eines Knotens musst du darauf achten, die Kette nicht zu unterbrechen und den dynamisch reservierten Speicher mit `free` wieder freizugeben.

#### Erstes Element (Kopf) löschen
* **Schritt 1:** Prüfe, ob die Liste leer ist. Wenn ja, gibt es nichts zu tun.
* **Schritt 2:** Erstelle einen temporären Zeiger, der auf das erste Element (den aktuellen Kopf) zeigt.
* **Schritt 3:** Setze den Kopfzeiger auf das zweite Element (`Kopf = Kopf->naechster`).
* **Schritt 4:** Gib den Speicher des temporär gemerkten alten Kopfes frei.

#### Beliebiges Element löschen
Möchtest du ein bestimmtes Element (z. B. mit einem bestimmten Wert oder an einer bestimmten Position) löschen, benötigst du Zugriff auf dessen **Vorgänger**. Da die Zeiger in einer einfach verketteten Liste nur nach vorne zeigen, musst du beim Durchsuchen der Liste immer ein Auge auf den Vorgänger richten.

* **Schritt 1:** Finde das zu löschende Element und merke dir gleichzeitig seinen Vorgänger.
* **Schritt 2:** Biege den `naechster`-Zeiger des Vorgängers so um, dass er direkt auf den Nachfolger des zu löschenden Knotens zeigt.
* **Schritt 3:** Gib den Speicher des zu löschenden Knotens frei.

> [!IMPORTANT]
> Vergiss niemals `free()` aufzurufen, wenn du einen Knoten entfernst. Da der Speicher auf dem Heap reserviert wurde, fordert C ihn nicht automatisch zurück, solange dein Programm läuft.

---

## 13.2 Doppelt verkettete Listen

Die einfach verkettete Liste hat einen Nachteil: Du kannst dich in ihr nur in eine Richtung bewegen – vorwärts. Willst du zum vorherigen Element zurückkehren, musst du die Liste wieder von vorne durchlaufen. 

Die **doppelt verkettete Liste** löst dieses Problem. Hier besitzt jeder Knoten zwei Zeiger:
1. Einen Zeiger auf den Nachfolger (`naechster` / `next`).
2. Einen Zeiger auf den Vorgänger (`vorheriger` / `prev`).

### Struktur einer doppelt verketteten Liste

Der Bauplan für einen solchen Knoten erweitert sich entsprechend:

```c
struct DoppeltKnoten {
    int daten;
    struct DoppeltKnoten* naechster;  // Zeiger auf das nächste Element
    struct DoppeltKnoten* vorheriger; // Zeiger auf das vorherige Element
};
```

### Vor- und Nachteile im Vergleich

| Eigenschaft | Einfach verkettet | Doppelt verkettet |
| :--- | :--- | :--- |
| **Speicherbedarf** | Geringer (nur 1 Zeiger pro Knoten) | Höher (2 Zeiger pro Knoten) |
| **Richtung** | Nur vorwärts | Vorwärts und rückwärts |
| **Löschen / Einfügen** | Aufwendiger, da der Vorgänger gesucht werden muss | Einfacher, da jeder Knoten seinen Vorgänger kennt |
| **Komplexität** | Geringer | Höher (mehr Zeiger müssen aktualisiert werden) |

Beim Einfügen oder Löschen in einer doppelt verketteten Liste musst du darauf achten, immer **vier Zeigerverbindungen** anzupassen (die Vorwärts- und Rückwärtszeiger des neuen bzw. der benachbarten Knoten).

---

## 13.3 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Warum muss man beim dynamischen Erzeugen eines Knotens prüfen, ob der Rückgabewert von `malloc` gleich `NULL` ist?
2. Was passiert mit dem Speicher auf dem Heap, wenn du ein Element aus einer verketteten Liste entfernst, ohne `free()` aufzurufen?
3. Warum ist es wichtig, beim Traversieren der Liste einen Hilfszeiger zu verwenden, statt direkt den Kopfzeiger (`head`) zu verändern?
4. Welche Zeiger müssen geändert werden, wenn ein neuer Knoten am Anfang einer doppelt verketteten Liste eingefügt wird?

### Aufgaben

#### Aufgabe 1: Der Zähler
Implementiere eine Funktion, die eine einfach verkettete Liste durchläuft und die Anzahl der darin enthaltenen Elemente zählt und zurückgibt. 

#### Aufgabe 2: Suchen in der Liste
Schreibe eine Funktion, die nach einem bestimmten ganzzahligen Wert in einer einfach verketteten Liste sucht. Die Funktion soll einen Zeiger auf den Knoten zurückgeben, wenn der Wert gefunden wurde, andernfalls `NULL`.

#### Aufgabe 3: Der Stapel (LIFO)
Nutze dein Wissen über einfach verkettete Listen, um ein LIFO-Prinzip (Last-In-First-Out) zu simulieren. Schreibe zwei Funktionen:
* Eine Funktion zum Hinzufügen eines Elements (Push) am Anfang der Liste.
* Eine Funktion zum Entfernen und Ausgeben des Elements (Pop) am Anfang der Liste.
