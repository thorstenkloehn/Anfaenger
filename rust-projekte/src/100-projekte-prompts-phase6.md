# Phase 6: Box-Fokus (Projekte 1-20)

Hier findest du didaktische Prompts für die ersten 20 Projekte aus Phase 6 (Box-Fokus). Diese Prompts führen dich Schritt für Schritt durch die Implementierung, ohne dir fertigen Code vorzugeben.

---

### 1. Rekursive Liste (Cons List)

**Hintergrund:**
Eine einfach verkettete Liste ist das klassische Beispiel für eine rekursive Datenstruktur. Da Rust zur Compilezeit die exakte Größe jedes Typs wissen muss, können wir einen Knoten nicht direkt in sich selbst schachteln – hier kommt die Heap-Allokation mit einer Box ins Spiel, die uns eine feste Zeigergröße garantiert.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Datenstruktur für die Liste. Nutze ein Enum, das entweder einen Wert und den Zeiger auf den nächsten Knoten (verpackt in einer Box auf dem Heap) oder ein Signal für das Listenende darstellt. Achte darauf, wie die Sichtbarkeiten für eine spätere Nutzung außerhalb des Moduls definiert sein müssen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere grundlegende Methoden für deine Liste, wie das Erstellen einer leeren Liste, das Hinzufügen von Elementen am Anfang und das Entfernen des ersten Elements. Achte dabei auf die saubere Handhabung von Eigentumsrechten beim Traversieren oder Ändern der Liste.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Integriere deine Liste in das Hauptprogramm. Erstelle ein einfaches textbasiertes Menü in der Konsolenanwendung, über das du Elemente hinzufügen, löschen und die gesamte Liste auf der Konsole ausgeben kannst.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 2. Generischer Binärbaum

**Hintergrund:**
Ein Binärbaum eignet sich hervorragend, um Daten hierarchisch zu organisieren. Da jeder Ast selbst wieder ein ganzer Baum sein kann, ist die Struktur inhärent rekursiv – Boxen auf dem Heap helfen uns, diese unendliche Verschachtelung speichertechnisch sauber aufzulösen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere einen generischen Knoten für deinen Suchbaum. Der Knoten benötigt einen Wert und optionale linke sowie rechte Kindknoten, die du über Heap-Allokation referenzierst. Verwende geeignete Rust-Typen wie Option und Box, um das Fehlen oder Vorhandensein von Teilbäumen abzubilden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Einfügen von Werten nach den Regeln eines binären Suchbaums sowie eine Methode zur Suche nach einem Wert. Überlege, wie du Trait-Schranken für die Generics verwendest, um Werte vergleichen zu können, und wie du die rekursive Natur des Baums sicher in deinen Methoden durchläufst.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Binde deinen Binärbaum in das Hauptprogramm ein. Ermögliche es dem Benutzer über die Konsole, Zahlen in den Baum einzufügen und nach ihnen zu suchen, und gib den Baum in einer einfachen Textdarstellung aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 3. AST für mathematische Ausdrücke

**Hintergrund:**
Ein abstrakter Syntaxbaum repräsentiert die hierarchische Struktur von mathematischen Gleichungen. Durch die Nutzung von Heap-Zeigern können wir komplexe Verschachtelungen von Operatoren und Zahlen flexibel darstellen und zur Laufzeit auswerten.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle ein Enum für den Syntaxbaum, das verschiedene mathematische Ausdrücke repräsentieren kann, wie einfache Zahlen oder zweistellige Operationen (z. B. Addition und Multiplikation). Die Operanden dieser Operationen müssen rekursiv im Heap alloziiert werden, um beliebig tiefe Verschachtelungen zu erlauben.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode zur rekursiven Auswertung des Syntaxbaums, die das mathematische Ergebnis berechnet, sowie eine Methode, die den Ausdruck als lesbaren String formatiert. Achte auf den korrekten Zugriff auf die inneren Operanden, ohne die Eigentumsrechte des Baums ungewollt zu verletzen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein Demoprogramm auf, das verschiedene mathematische Ausdrücke manuell oder über eine einfache Eingabe konstruiert, diese auswertet und das Ergebnis sowie den formatierten mathematischen Ausdruck auf der Konsole ausgibt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 4. Vektor von Trait-Objekten (dyn-Typen)

**Hintergrund:**
In Benutzeroberflächen müssen oft völlig unterschiedliche Elemente wie Buttons, Labels oder Eingabefelder in einer gemeinsamen Liste verwaltet werden. Boxen in Kombination mit Trait-Objekten erlauben uns genau dieses polymorphe Verhalten zur Laufzeit über Dynamic Dispatch.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein gemeinsames Trait für grafische Elemente mit einer Methode zum Zeichnen. Erstelle anschließend mehrere eigenständige Structs für konkrete Steuerelemente. Die konkreten Elemente sollen später in einer gemeinsamen Liste auf dem Heap verwaltet werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das gemeinsame Trait für all deine Steuerelemente. Erstelle ein weiteres Struct, das eine Liste von Heap-allozierten Trait-Objekten verwaltet, und implementiere Methoden, um neue Elemente hinzuzufügen und alle Elemente nacheinander aufzurufen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein Hauptprogramm, das verschiedene Steuerelemente erstellt, sie der Liste hinzufügt und einen Zeichenvorgang simuliert, bei dem jedes Element eine entsprechende Textausgabe auf der Konsole erzeugt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 5. Polymorphes Plugin-System

**Hintergrund:**
Ein erweiterbares System lebt davon, dass neue Funktionalitäten hinzugefügt werden können, ohne den bestehenden Kern zu verändern. Mit Heap-basierten Trait-Objekten lässt sich eine dynamische Plugin-Architektur aufbauen, bei der Plugins zur Laufzeit geladen und ausgeführt werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Plugin-Trait mit Methoden für die Initialisierung und die Ausführung einer Aktion. Erstelle verschiedene Structs, die jeweils ein konkretes Plugin darstellen (z. B. ein Logger-Plugin oder ein Statistik-Plugin), um diese als dynamische Trait-Objekte im Heap zu speichern.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Plugin-Trait für deine konkreten Plugins. Entwickle einen Plugin-Manager, der eine Liste dieser Heap-allozierten Plugins verwaltet und Schnittstellen bietet, um Plugins zu registrieren und Aktionen auf allen aktiven Plugins auszuführen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Setze in der main.rs eine Konsolenanwendung auf, bei der der Benutzer Plugins aktivieren oder deaktivieren kann und die Auswirkungen der Plugins bei der Ausführung von Systemereignissen auf der Konsole beobachtet werden können.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 6. Große Struktur auslagern

**Hintergrund:**
Der Stack-Speicher ist begrenzt und schnelles Kopieren großer Datenmengen kann die Performance beeinträchtigen. Indem wir eine sehr große Datenstruktur explizit per Box auf dem Heap allozieren, bleibt auf dem Stack nur ein kleiner Zeiger übrig, was die Speicherverwaltung hocheffizient macht.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Datenstruktur, die ein sehr großes Datenfeld (z. B. ein großes Array von Fließkommazahlen oder eine riesige Matrix) enthält. Verpacke dieses Struct in eine Box, um sicherzustellen, dass die Allokation auf dem Heap stattfindet und der Stack entlastet wird.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zur Modifikation und Auswertung der großen Datenmenge. Zeige, wie Daten manipuliert werden können, ohne die gesamte Struktur kopieren zu müssen, und wie die Dereferenzierung auf den inneren Heap-Speicher transparent funktioniert.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein Hauptprogramm, das die Allokation auf dem Heap vornimmt, Funktionen mit Referenzen auf das Heap-Objekt aufruft und demonstriert, dass trotz der enormen Größe der Datenstruktur die Funktionsaufrufe durch Zeigerübergabe minimalen Overhead verursachen.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 7. Heap-basierter Zustandsautomat

**Hintergrund:**
Zustandsautomaten eignen sich hervorragend für komplexe Abläufe. Wenn wir die einzelnen Zustände als Heap-allozierte Trait-Objekte modellieren, können wir Zustandsübergänge flexibel zur Laufzeit durchführen, indem wir einfach den Zeiger auf das aktuelle Zustandsobjekt austauschen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Trait für den Zustand des Automaten, welches das Verhalten bei bestimmten Ereignissen beschreibt. Erstelle konkrete Structs für die verschiedenen Zustände und eine übergeordnete Struktur für den Automaten, die den aktuellen Zustand als Box-Trait-Objekt hält.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere für jeden Zustand die spezifischen Reaktionen auf Ereignisse und wie der Folgezustand zurückgegeben wird. Sorge im Automaten-Struct dafür, dass bei einem Ereignis der Zustand aktualisiert wird, indem der Box-Pointer sicher auf den neuen Zustand umgebogen wird.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle eine interaktive Konsolenanwendung, in der ein Benutzer durch Eingaben Ereignisse auslöst. Zeige auf Knopfdruck an, wie sich der Zustand des Automaten ändert und wie das Verhalten je nach aktivem Zustand variiert.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 8. JSON-AST-Parser

**Hintergrund:**
JSON ist eine hierarchische Datenstruktur, bei der Objekte und Arrays beliebig tief verschachtelt sein können. Um diese variable und potenziell rekursive Baumstruktur im Speicher abzubilden, sind Heap-Allokationen mit Boxen unumgänglich.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere ein Enum, das die verschiedenen JSON-Datentypen repräsentiert (z. B. Null, Booleans, Zahlen, Strings, Arrays und Objekte). Objekte und Arrays enthalten Sammlungen von JSON-Werten, die über Boxen auf dem Heap referenziert werden müssen, um Rekursion zu ermöglichen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden, um neue JSON-Strukturen aufzubauen (z. B. Werte zu einem Objekt oder Array hinzuzufügen) und eine Methode, die den JSON-Baum in einen formatierten String übersetzt. Achte darauf, wie du rekursiv durch die verschachtelten Boxen wanderst.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle ein Testprogramm, das eine kleine, verschachtelte JSON-Struktur programmatisch aufbaut und diese formatiert auf der Konsole ausgibt. Ermögliche auch eine einfache Fehlerbehandlung, falls ungültige Datenstrukturen erzeugt werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 9. Kommando-Muster (Command Pattern)

**Hintergrund:**
Das Command-Pattern kapselt Aktionen in Objekten. Indem wir diese Aktionen als Trait-Objekte auf dem Heap speichern, können wir eine dynamische Liste von ausgeführten Befehlen verwalten, um eine flexible Undo/Redo-Historie zur Laufzeit zu realisieren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Command-Trait mit Methoden für das Ausführen und das Rückgängigmachen einer Aktion. Erstelle mehrere konkrete Befehls-Structs (z. B. Text hinzufügen, Text löschen) und ein Verlaufs-Struct, das eine Liste von ausgeführten Befehlen als Box-Trait-Objekte verwaltet.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Command-Trait für deine konkreten Befehle und statte sie mit dem nötigen Zustand aus, um die Aktion umzukehren. Entwickle im Verlaufs-Struct Methoden zum Ausführen eines neuen Befehls und zum Auslösen der Undo-Funktion, die den letzten Befehl vom Heap holt und rückgängig macht.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere eine Anwendung (z. B. einen minimalistischen Texteditor) in der main.rs, bei der der Benutzer über Tastatureingaben Befehle ausführen und rückgängig machen kann, während der aktuelle Zustand auf der Konsole ausgegeben wird.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 10. Spiel-Entitäten auf dem Heap

**Hintergrund:**
In einem Spiel interagieren viele verschiedene Objekte wie Spieler, Monster und Schatzkisten miteinander. Indem wir all diese unterschiedlichen Typen über ein gemeinsames Trait vereinheitlichen und in Boxen verpacken, können wir sie in einer einzigen Schleife verwalten und aktualisieren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Entity-Trait mit Methoden für das Aktualisieren der Spiellogik und das Rendern. Erstelle konkrete Structs für Spieler, Gegner und Items. Diese sollen in einem gemeinsamen Vektor als Heap-allozierte Box-Trait-Objekte gespeichert werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Entity-Trait für alle konkreten Spielfiguren und Objekte. Entwickle eine Spielwelt-Struktur, die den Vektor der Entitäten verwaltet, und schreibe Methoden zum Hinzufügen von Entitäten sowie eine Aktualisierungsschleife, die alle Entitäten auf dem Heap durchläuft.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle eine einfache Spielschleife in der main.rs, die Eingaben simuliert, die Spielwelt und alle darin befindlichen Entitäten aktualisiert und deren neuen Zustand als Text auf der Konsole ausgibt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 11. Benutzerdefinierter Fehler-Wrapper

**Hintergrund:**
In komplexen Anwendungen treten Fehler aus verschiedenen Quellen auf. Ein benutzerdefinierter Fehler-Wrapper, der die ursprüngliche Fehlerursache als dynamisches Fehler-Trait-Objekt auf dem Heap speichert, ermöglicht es, unterschiedliche Fehlerarten einheitlich zu behandeln und zu verketten.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle ein eigenes Fehler-Struct, das eine Beschreibung und optional einen Verweis auf einen zugrunde liegenden Fehler enthält. Verwende eine Box zur Speicherung dieses inneren Fehlers als dynamisches Trait-Objekt der Standardbibliothek, um beliebige Fehlerursachen zu erlauben.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Debug- und Display-Trait für deinen Fehlertyp sowie das Standard-Error-Trait. Schreibe Konstruktoren, die es erlauben, einen Fehler mit oder ohne eine zugrunde liegende Ursache auf dem Heap zu erstellen, und stelle Methoden bereit, um die Fehlerkette auszugeben.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe Funktionen, die verschiedene Standard-Fehler auslösen (z. B. I/O- oder Parse-Fehler), fange diese ab, verpacke sie in deinem Fehler-Wrapper und gib die gesamte Fehlerhistorie formatiert in der main() aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 12. Dynamische Callback-Liste

**Hintergrund:**
Event-gesteuerte Programmierung erfordert die Registrierung von Funktionen, die bei bestimmten Ereignissen aufgerufen werden. Da Closures in Rust unterschliche Typen und Größen haben, nutzen wir Heap-allozierte Box-Trait-Objekte, um sie flexibel in einer Liste verwalten zu können.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf eine Struktur, die eine Liste von Event-Listenern speichert. Da die Listener als Closures (Funktionszeiger mit Kontext) übergeben werden, musst du sie in Boxen verpacken, die das entsprechende Fn- oder FnMut-Trait implementieren.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Registrieren eines neuen Callbacks (durch Hinzufügen der Box zum Vektor) und eine Methode zum Auslösen des Events, die alle gespeicherten Closures auf dem Heap nacheinander aufruft und eventuelle Parameter übergibt.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Richte in der main.rs ein Szenario ein, bei dem verschiedene Callback-Funktionen (z. B. eine, die einen Zähler erhöht, und eine andere, die Text loggt) registriert werden. Simuliere das Eintreffen von Ereignissen und prüfe die Ausgaben auf der Konsole.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 13. Dateisystem-Baum

**Hintergrund:**
Ein Dateisystem besteht aus Dateien und Ordnern, wobei Ordner wiederum Dateien und andere Ordner enthalten können. Um diese hierarchische, rekursive Baumstruktur speichersicher und flexibel abzubilden, verpacken wir die Ordnerinhalte in Heap-basierte Boxen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere das Dateisystem über ein Enum, das entweder eine Datei (mit Name und Größe) oder einen Ordner (mit Name und einer Liste von Elementen) repräsentiert. Da Ordner rekursiv andere Dateisystemelemente enthalten, müssen diese Elemente in Boxen auf dem Heap gelagert werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zur Erstellung von Dateien und Ordnern, zum Hinzufügen von Elementen zu einem Ordner sowie eine Methode zur rekursiven Berechnung der Gesamtgröße eines Ordners. Achte darauf, wie du die Eigentumsrechte beim Traversieren des Verzeichnisbaums verwaltest.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle eine Konsolenanwendung, die einen kleinen Verzeichnisbaum aufbaut, diesen in einer strukturierten Baumansicht auf der Konsole ausgibt und die berechnete Gesamtgröße der Verzeichnisse anzeigt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 14. Heap-alloziertes Array (Box-Slice)

**Hintergrund:**
Ein normaler Vektor kann wachsen und schrumpfen, was zusätzlichen Speicher-Overhead verursacht. Ein Heap-alloziertes Box-Slice fixiert die Größe eines Arrays zur Laufzeit auf dem Heap und spart Speicherplatz, da keine Kapazitätsreserven vorgehalten werden müssen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf eine Struktur, die ein Array fester Größe zur Laufzeit auf dem Heap verwaltet. Verwende hierzu ein Box-Slice (Box von Slice), um den Speicherbereich nach der Initialisierung fest zu verankern und vor nachträglichen Größenänderungen zu schützen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zur Initialisierung des Box-Slices aus einem Vektor oder einer Eingabe sowie Methoden zum sicheren Lesen und Schreiben von Werten an bestimmten Indizes. Überlege, wie du die Dereferenzierung nutzt, um direkt auf die Elemente des Slices zuzugreifen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle ein CLI-Programm, das ein Array basierend auf Benutzereingaben zur Laufzeit auf dem Heap alloziiert, Werte manipuliert und ausgibt, und stelle sicher, dass Zugriffe außerhalb der Array-Grenzen abgefangen werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 15. Strategie-Entwurfsmuster (Strategy Pattern)

**Hintergrund:**
Das Strategy-Pattern ermöglicht es, Algorithmen zur Laufzeit dynamisch auszutauschen. Durch die Kapselung der Algorithmen in Heap-allozierte Box-Trait-Objekte können wir die Verarbeitungsstrategie einer Anwendung flexibel wechseln, ohne den Client-Code anzupassen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Trait für eine Formatierungsstrategie (z. B. Text formatieren). Erstelle mehrere konkrete Structs, die dieses Trait unterschiedlich implementieren (z. B. Großbuchstaben, Kleingebuchstaben, Markdown-Formatierung). Die aktive Strategie soll in einem Kontext-Struct als Box-Trait-Objekt auf dem Heap gehalten werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Trait für deine verschiedenen Formatierer. Entwickle im Kontext-Struct Methoden, um die aktive Strategie zur Laufzeit durch Zuweisung eines neuen Box-Pointers auszutauschen, und eine Methode zur Textverarbeitung, die die aktuelle Strategie aufruft.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein interaktives Konsolenprogramm, bei dem der Benutzer einen Text eingeben und die Formatierungsstrategie über ein Menü auswählen kann. Zeige den formatierten Text direkt auf der Konsole an.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 16. Ausdrucks-Parser für Boolesche Logik

**Hintergrund:**
Logische Formeln wie UND- oder ODER-Verknüpfungen können beliebig tief ineinander geschachtelt sein. Boxen helfen uns, diese rekursiven Ausdrücke zur Laufzeit auf dem Heap zu speichern und auszuwerten.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle ein Enum für logische Ausdrücke, das Wahrheitswerte, Variablen und logische Operatoren (NICHT, UND, ODER) darstellen kann. Da die Operatoren rekursiv andere Teilausdrücke verknüpfen, müssen diese in Boxen verpackt werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode, um den logischen Ausdruck rekursiv auszuwerten (wobei Variablenbelegungen übergeben werden können), und eine Methode zur textuellen Darstellung der Formel. Achte auf den sicheren Zugriff auf die inneren Ausdrücke in den Boxen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein Programm, das verschiedene logische Formeln konstruiert, sie mit unterschiedlichen Belegungen der Variablen auswertet und die Formel samt Auswertungsergebnis auf der Konsole ausgibt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 17. Dynamischer Middleware-Stack

**Hintergrund:**
In Webservern werden HTTP-Anfragen oft durch eine Kette von Middleware-Komponenten (z. B. Logging, Authentifizierung) geschleust. Ein flexibler Middleware-Stack lässt sich zur Laufzeit aufbauen, indem die einzelnen Middleware-Schritte in einer Kette von Box-Trait-Objekten auf dem Heap verkettet werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Middleware-Trait mit einer Methode zur Bearbeitung eines simulierten Requests. Erstelle mehrere konkrete Middleware-Structs. Entwirf eine Stack-Struktur, die diese Middleware-Instanzen in einer Liste als Heap-allozierte Box-Trait-Objekte verwaltet.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Middleware-Trait für deine konkreten Komponenten. Entwickle Methoden im Middleware-Stack, um neue Middlewares hinzuzufügen und eine Anfrage nacheinander durch alle registrierten Middlewares zu schleusen, wobei der Request-Zustand modifiziert werden kann.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der main.rs das Eintreffen einer HTTP-Anfrage, lass sie den Middleware-Stack durchlaufen (z. B. erst Logging, dann Authentifizierungsprüfung) und gib das Endergebnis der Anfrageverarbeitung auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 18. Unendlicher Stream-Generator

**Hintergrund:**
Ein Stream-Generator erzeugt kontinuierlich Werte (z. B. mathematische Sequenzen). Durch die Speicherung des Generatorzustands in einer Heap-basierten rekursiven Box-Struktur können wir unendliche Ströme mit komplexem internem Zustand sauber in Rusts Iteratoren-System integrieren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf eine Struktur für den Generator, die den aktuellen Zustand und die Berechnungslogik kapselt. Nutze Boxen, falls der Zustand rekursiv aufgebaut ist oder dynamische Transformationsfunktionen (Closures) auf dem Heap gehalten werden müssen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Standard-Iterator-Trait für deinen Stream-Generator. Achte darauf, wie der interne Zustand bei jedem Aufruf von next() mutiert werden muss und wie du Ownership-Regeln einhältst, wenn du Daten aus dem Heap-Speicher liest oder aktualisierst.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der main.rs ein Hauptprogramm, das einen solchen unendlichen Stream initialisiert, eine begrenzte Anzahl an Elementen (z. B. die ersten 20 generierten Werte) zieht und diese auf der Konsole ausgibt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 19. Suchbaum mit N-ären Knoten

**Hintergrund:**
Im Gegensatz zu Binärbäumen kann ein Knoten in einem N-ären Baum eine variable Anzahl von Kindknoten haben (z. B. für Dateisysteme oder XML-Strukturen). Wir verwalten diese dynamische Liste von Kindern speichereffizient als Vektor von Boxen auf dem Heap.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für einen Baumknoten, die einen Wert und einen Vektor enthält. Dieser Vektor speichert die Kindknoten, die aufgrund der rekursiven Struktur des Baums in Boxen auf dem Heap alloziiert werden müssen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Hinzufügen von Kindknoten und zum rekursiven Suchen nach einem Wert im gesamten Baum. Achte auf die korrekte Kapselung und wie du die Ownership der Knoten beim Traversieren und Einfügen handhabst.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle ein Testprogramm, das einen verschachtelten N-ären Baum aufbaut, eine Tiefensuche oder Breitensuche durchführt und die Struktur des Baums hierarchisch eingerückt auf der Konsole ausgibt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 20. Dependency Injection Container

**Hintergrund:**
Ein Dependency-Injection-Container verwaltet Services und stellt sie bei Bedarf zur Verfügung. Da Services unterschiedliche Typen haben, speichern wir sie als Heap-allozierte dynamische Any-Trait-Objekt-Boxen, um sie zur Laufzeit anhand ihres Typs registrieren und abfragen zu können.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf eine Container-Struktur, die eine Sammlung von Services speichert. Verwende eine geeignete Map, die die Services unter Verwendung von Boxen als dynamische Any-Trait-Objekte (dyn Any) auf dem Heap verwaltet, um Typosicherheit zur Laufzeit zu ermöglichen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Box) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zur Registrierung eines Services im Container und zum Abfragen eines Services. Nutze das Downcasting-System von Rusts Any-Trait, um die Heap-allozierte Box sicher wieder in den konkreten Typ zurückzuverwandeln.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein Hauptprogramm, das verschiedene Testdienste im Container registriert, diese an anderer Stelle abfragt, Methoden auf den abgerufenen Diensten aufruft und Fehler behandelt, falls ein Dienst nicht registriert ist.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?
# Phase 6: Rc & Arc-Fokus (Projekte 21-40)

Hier findest du didaktische Prompts für die Projekte 21 bis 40 aus Phase 6 (Rc & Arc-Fokus). Diese Prompts führen dich Schritt für Schritt durch die Implementierung, ohne dir fertigen Code vorzugeben.

---

### 21. Geteilte Konfigurationsdaten (Rc)

**Hintergrund:**
Wenn verschiedene Teile einer Anwendung auf dieselbe schreibgeschützte Konfiguration zugreifen müssen, wollen wir unnötige Speicherduplikate vermeiden. Mit dem passenden Smart Pointer für geteiltes Eigentum im selben Thread können wir dieselben Daten effizient und sicher an mehrere Module verteilen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für die Konfigurationseinstellungen mit typischen Feldern wie Server-Adresse, Port und Debug-Modus. Verwende einen Smart Pointer für geteilten Lesezugriff innerhalb eines einzelnen Threads, um die Datenstruktur an mehrere Programmteile zu binden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zur Erstellung der Konfiguration und Hilfsfunktionen in den verschiedenen Modulen, die die geteilten Konfigurationsdaten als Parameter entgegennehmen. Nutze die Möglichkeit, Referenzen kostengünstig zu vervielfältigen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der Hauptfunktion den Start der Anwendung. Erstelle die Konfiguration und verteile sie an mehrere simulierte Dienste (z. B. einen Datenbankdienst und einen Netzwerkdienst), die anschließend ihre Einstellungen auf der Konsole ausgeben.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 22. Webserver-Konfiguration (Arc)

**Hintergrund:**
In modernen Webservern werden Anfragen parallel in mehreren Threads verarbeitet. Damit alle Worker-Threads auf die globalen Einstellungen zugreifen können, ohne dass die Daten kopiert werden müssen, benötigen wir eine threadsichere Variante des geteilten Eigentums.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Datenstruktur für globale Server-Einstellungen, wie die maximale Anzahl an Verbindungen und den Pfad zum Root-Verzeichnis. Wähle einen Smart Pointer, der die Eigentümerschaft sicher über Thread-Grenzen hinweg teilen kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Konstruktoren und Hilfsfunktionen, um die Konfiguration zu initialisieren. Stelle sicher, dass die Worker-Threads eine eigene, geklonte Referenz auf den Smart Pointer erhalten, um sicher auf die Daten zuzugreifen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Starte in der Hauptfunktion mehrere simulierte Worker-Threads. Übergib jedem Thread eine geklonte Referenz auf die Konfiguration, führe in den Threads Berechnungen aus und stelle sicher, dass alle Threads korrekt beendet werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 23. Graph-Knoten mit mehreren Eltern

**Hintergrund:**
In vielen Netzwerk- und Graphstrukturen kann ein Knoten von mehreren anderen Knoten direkt referenziert werden. Um zu verhindern, dass ein Knoten vorzeitig aus dem Speicher gelöscht wird, während er noch von mindestens einem Elternknoten benötigt wird, nutzen wir geteilte Eigentumsrechte.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf eine Struktur für einen Graph-Knoten, der einen Wert speichert und eine Liste von Zeigern auf seine Kindknoten enthält. Verwende einen Smart Pointer, um zu erlauben, dass mehrere Elternknoten denselben Kindknoten im selben Thread besitzen können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Schreibe Methoden zum Erstellen eines neuen Knotens und zum Hinzufügen einer Kante (Verbindung) von einem Elternknoten zu einem Kindknoten. Achte darauf, wie du den Referenzzähler erhöhst.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue im Hauptprogramm ein kleines Test-Netzwerk auf, bei dem ein bestimmter Knoten von zwei verschiedenen Pfaden aus erreicht wird. Gib die Struktur des Graphen aus und überprüfe die Anzahl der aktiven Referenzen auf den geteilten Knoten.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 24. Weak-Pointer in Baumstrukturen

**Hintergrund:**
Wenn Knoten in einem Baum nicht nur auf ihre Kinder zeigen, sondern Kinder auch auf ihre Eltern verweisen sollen, entsteht eine zirkuläre Referenz. Ohne besondere Vorsicht führt dies dazu, dass der Speicher nie wieder freigegeben wird. Hier hilft eine abgeschwächte Form des Zeigers.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere einen Binärbaum-Knoten mit Verweisen auf ein linkes Kind, ein rechtes Kind und den Elternknoten. Verwende für die Kinder vollwertige Smart Pointer und für die Eltern-Referenz einen schwachen Smart Pointer, um Zyklen zu vermeiden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Knoten und zum Einfügen von Kindern. Beim Einfügen musst du die Eltern-Referenz des Kindes korrekt setzen und beim Zugriff auf den Elternknoten prüfen, ob dieser noch existiert.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue in deiner Hauptfunktion einen kleinen Beispielbaum auf. Traversiere den Baum abwärts und navigiere anschließend von einem Blattknoten über die schwache Eltern-Referenz wieder aufwärts. Simuliere das Löschen von Teilen des Baums.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 25. Dateisystem mit Verknüpfungen (Hardlinks)

**Hintergrund:**
Im echten Dateisystem kann dieselbe Datei über Hardlinks in mehreren Verzeichnissen gleichzeitig eingetragen sein. Sie darf erst dann gelöscht werden, wenn auch der letzte Link darauf entfernt wurde. Das lässt sich hervorragend mit geteiltem Eigentum abbilden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere Strukturen für Dateien (mit Name und Inhalt) und Verzeichnisse (mit Name und einer Liste von Einträgen). Da eine Datei in mehreren Verzeichnissen eingetragen sein kann, müssen die Dateistrukturen über einen Smart Pointer geteilt werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Funktionen, um neue Verzeichnisse und Dateien anzulegen sowie Hardlinks auf bestehende Dateien zu erstellen. Achte darauf, wie der Referenzzähler der Datei bei einer neuen Verknüpfung steigt.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle im Hauptprogramm eine Verzeichnisstruktur mit mehreren Ordnern. Füge eine Datei in einen Ordner ein und verlinke sie in einem anderen. Gib die Struktur aus und zeige, dass nach dem Entfernen eines Verzeichniseintrags die Datei noch existiert, solange ein anderer Link aktiv ist.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 26. Thread-Pool-Task-Verteiler

**Hintergrund:**
In parallelen Anwendungen müssen Aufgaben (Tasks) an verschiedene Threads verteilt werden. Damit die Aufgabenbeschreibung nicht für jeden Thread teuer kopiert werden muss, teilen wir uns die Daten über einen atomaren Smart Pointer.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für eine Aufgabe (Task), die Details zur auszuführenden Arbeit enthält. Verwende einen threadsicheren Smart Pointer für geteilte Ownership, um die Aufgabe an die Worker-Threads zu übergeben.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Aufgaben und zum Klonen der Smart Pointer. Die Threads sollen Zugriff auf die Aufgabendetails erhalten, ohne dass die ursprünglichen Daten dupliziert oder gesperrt werden müssen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der Hauptfunktion eine Reihe von Aufgaben, verpacke sie und verteile sie an einen Pool aus neu gestarteten Threads. Jeder Thread gibt Details der empfangenen Aufgabe aus, um die erfolgreiche Verteilung zu demonstrieren.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 27. Zirkulärer Cache mit Weak

**Hintergrund:**
Ein Cache soll den schnellen Zugriff auf häufig benötigte Daten ermöglichen. Allerdings wollen wir verhindern, dass der Cache Objekte dauerhaft im Speicher feshält, wenn sie an anderer Stelle im Programm längst nicht mehr verwendet werden. Schwache Referenzen sind hier die ideale Lösung.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle ein Cache-System, das Schlüssel-Wert-Paare speichert. Wähle eine Struktur, bei der die Werte im Cache als schwache Zeiger gehalten werden, sodass die eigentlichen Daten freigegeben werden können, wenn die Hauptanwendung sie loslässt.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Einfügen von Werten und zum Abfragen aus dem Cache. Beim Abfragen musst du versuchen, die schwache Referenz aufzuwerten (Upgrade) – schlägt dies fehl, wurde der Wert bereits gelöscht und muss neu geladen oder bereinigt werden.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Demonstriere in der Hauptfunktion die Funktionsweise deines Caches: Füge Objekte hinzu, halte einige davon in der Hauptfunktion aktiv und lasse andere out of scope gehen. Zeige, welche Objekte der Cache noch erfolgreich ausgeben kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 28. Observer-Muster mit Weak

**Hintergrund:**
Beim Entwurfsmuster "Beobachter" registrieren sich Empfänger bei einer Quelle, um über Änderungen benachrichtigt zu werden. Halten wir in der Quelle starke Verweise auf die Beobachter, können diese niemals gelöscht werden. Schwache Referenzen lösen dieses Problem elegant.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Quelle (Subjekt) und Beobachter (Observer). Die Quelle verwaltet eine Liste von Empfängern. Wähle für diese Liste schwache Referenzen, damit die Lebensdauer der Beobachter nicht künstlich durch die Registrierung verlängert wird.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zur Registrierung von Beobachtern sowie eine Methode zur Benachrichtigung aller aktiven Beobachter. Beim Benachrichtigen müssen ungültige (bereits gelöschte) Beobachter automatisch aus der Liste entfernt werden.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle im Hauptprogramm ein Subjekt und mehrere Beobachter. Simuliere Zustandsänderungen. Lass im Verlauf des Programms einige Beobachter aus dem Scope fallen und zeige, dass das Subjekt sie beim nächsten Ereignis nicht mehr benachrichtigt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 29. Gemeinsamer Chat-Verlauf

**Hintergrund:**
In einer Chat-Anwendung möchten wir, dass mehrere Benutzer gleichzeitig auf denselben Chat-Verlauf zugreifen und neue Nachrichten lesen können, ohne dass der Verlauf für jeden Benutzer kopiert werden muss.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere eine Struktur für einen Benutzer und eine für den Chat-Verlauf. Der Chat-Verlauf speichert eine Liste von Nachrichten. Verwende einen Smart Pointer für geteilte Ownership im selben Thread, damit mehrere Benutzer denselben Verlauf lesen können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Schreibe Methoden zum Erstellen von Benutzern und zum Zuweisen des geteilten Chat-Verlaufs. Implementiere eine Lesemethode für Benutzer, die auf die Nachrichten des Verlaufs zugreift.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der Hauptfunktion einen Chatroom. Erstelle einen Chat-Verlauf und weise ihn mehreren Benutzern zu. Lass die Benutzer den Verlauf auslesen und veranschauliche die gemeinsame Datennutzung auf der Konsole.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 30. Spieler-Inventar mit geteilten Items

**Hintergrund:**
In einem Rollenspiel (RPG) können mehrere Spielfiguren denselben unzerstörbaren Quest-Gegenstand besitzen oder auf dieselbe Item-Definition verweisen. Damit wir den Gegenstand nicht für jeden Spieler duplizieren müssen, teilen wir uns die Referenz darauf.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle Strukturen für einen Gegenstand (Item) und einen Spieler. Der Spieler besitzt eine Liste von Gegenständen. Verpacke die Gegenstände in einen Smart Pointer, damit ein Item von mehreren Spielern gleichzeitig im Inventar gehalten werden kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Items und Spielern sowie zum Hinzufügen von Items zum Inventar. Stelle sicher, dass beim Hinzufügen eines Items zu einem weiteren Spieler nur der Referenzzähler erhöht wird.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle im Hauptprogramm ein Quest-Item und zwei Spieler. Gib beiden Spielern das Item ins Inventar. Zeige auf der Konsole die Inventare beider Spieler und überprüfe die Anzahl der Besitzer des Quest-Items im Speicher.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 31. Multi-Thread-Log-Writer

**Hintergrund:**
In einer Multi-Threaded-Anwendung möchten wir oft, dass alle Threads in dieselbe Log-Datei oder denselben Log-Kanal schreiben. Um sicherzustellen, dass die Threads auf die Log-Ressource zugreifen können, verwenden wir eine threadsichere geteilte Ownership.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Logger-Struktur, die den Dateipfad oder Schreibkanal verwaltet. Wähle einen Smart Pointer, der es ermöglicht, den Logger sicher an mehrere parallel laufende Threads zu übergeben.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Protokollieren von Nachrichten. Sorge dafür, dass jeder Thread eine geklonte Referenz auf den Logger erhält und darüber Statusmeldungen schreiben kann.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Initialisiere den Logger in deiner Hauptfunktion, starte mehrere Threads und lass diese parallel Log-Einträge schreiben. Warte darauf, dass alle Threads ihre Arbeit beenden, und gib anschließend den Inhalt des Logs aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 32. DOM-Baum-Modellierung

**Hintergrund:**
Ein DOM-Baum (Document Object Model) repräsentiert HTML-Elemente hierarchisch. Ein Kindelement muss oft auf sein Elternelement verweisen können, während das Elternelement eine Liste seiner Kinder besitzt. Um Speicherlecks durch diese kreisförmige Struktur zu vermeiden, kombinieren wir starke und schwache Zeiger.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für ein DOM-Element (mit Tag-Name und Textinhalt). Das Element soll eine Liste seiner Kinder verwalten und eine optionale Referenz auf sein Elternelement besitzen. Nutze eine Kombination aus starken und schwachen Smart Pointern.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Elementen und zum Hinzufügen von Kindelementen. Stelle sicher, dass die schwache Referenz auf das Elternelement beim Hinzufügen eines Kindes korrekt gesetzt wird.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erzeuge im Hauptprogramm eine kleine DOM-Struktur (z. B. ein Haupt-Element mit mehreren Unter-Elementen). Navigiere vom Haupt-Element zu den Kindern und frage von einem Kind-Element aus dessen Eltern-Element ab.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 33. Musik-Playliste mit geteilten Songs

**Hintergrund:**
In einer Musikbibliothek kann derselbe Song in verschiedenen Playlisten vorkommen (z. B. "Favoriten" und "Rock"). Anstatt die Audio- und Metadaten des Songs für jede Playliste im Speicher zu duplizieren, teilen wir uns die Eigentümerschaft an den Songs.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle Strukturen für einen Song (mit Titel und Künstler) und eine Playliste (mit Name und einer Liste von Songs). Nutze einen Smart Pointer, damit ein Song von mehreren Playlisten referenziert werden kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Songs und Playlisten. Schreibe eine Funktion, um Songs zu einer Playliste hinzuzufügen. Achte darauf, dass beim Hinzufügen nur der Referenzzähler des Songs steigt.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der Hauptfunktion eine Reihe von Songs und zwei verschiedene Playlisten. Füge einen Song zu beiden Playlisten hinzu und gib die Inhalte der Playlisten aus. Überprüfe die Anzahl der aktiven Referenzen auf den geteilten Song.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 34. Routing-Tabelle im Netzwerk

**Hintergrund:**
Ein Computernetzwerk besteht aus Routern, die miteinander verbunden sind. Jeder Router muss seine Nachbarn kennen, um Pakete weiterzuleiten. Da Nachbarschaften gegenseitig sind, entstehen zyklische Referenzen, die wir durch eine durchdachte Wahl von Smart Pointern handhaben müssen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere eine Struktur für einen Router (mit Name oder IP-Adresse). Der Router verwaltet eine Liste seiner Nachbar-Router. Verwende Smart Pointer, um das gegenseitige Verweisen der Router im selben Thread zu ermöglichen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Routern und zum Verbinden zweier Router als Nachbarn. Achte darauf, wie du zirkuläre Referenzen verhinderst, damit das Netzwerk beim Programmende wieder vollständig aus dem Speicher gelöscht wird.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue in der Hauptfunktion ein kleines Netzwerk aus mehreren Routern auf. Simuliere das Weiterleiten eines Datenpakets von einem Router zum nächsten und gib die Nachbar-Verbindungen auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 35. Multi-Thread-Bildverarbeitung

**Hintergrund:**
Die Bildverarbeitung kann sehr rechenintensiv sein. Um die Leistung zu steigern, teilen wir das Bild in Segmente auf und verarbeiten diese parallel in separaten Threads. Damit das große Originalbild nicht für jeden Thread kopiert werden muss, geben wir allen Threads Lesezugriff auf dieselbe Speicheradresse.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für ein Bild (z. B. mit Pixeldaten und Abmessungen). Verwende einen threadsicheren Smart Pointer for geteilte Ownership, um das Bild sicher an die verschiedenen Threads zu übergeben.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen des Bildes und Hilfsfunktionen zur pixelweisen Analyse. Jeder Thread erhält eine geklonte Referenz auf den Smart Pointer, um parallel auf das Bild zuzugreifen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erzeuge in der Hauptfunktion ein Bild und starte mehrere Worker-Threads. Jeder Thread analysiert ein anderes Segment des Bildes (z. B. Helligkeit bestimmen) und gibt sein Ergebnis aus. Synchronisiere die Threads und gib das Gesamtergebnis aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 36. Bibliotheks-System

**Hintergrund:**
In einer Bibliothek können Bücher von mehreren Benutzern gleichzeitig auf eine Vormerkliste gesetzt werden. Das Buch existiert physikalisch nur einmal im Speicher, wird aber von den Vormerklisten mehrerer Benutzer referenziert.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere Strukturen für ein Buch (mit Titel und ISBN) und einen Benutzer (mit Name und einer Liste vorgemerkter Bücher). Verwende einen Smart Pointer für geteiltes Eigentum, um ein Buch in mehreren Listen zu verwalten.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Büchern und Benutzern. Schreibe eine Methode, die es einem Benutzer erlaubt, ein Buch vorzumerken. Stelle sicher, dass das Buch nicht gelöscht wird, solange noch Benutzer ein Interesse daran haben.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in main() ein Buch und zwei Benutzer. Lass beide Benutzer das Buch vormerken. Gib die Vormerklisten aus und veranschauliche auf der Konsole, wie sich die Referenzanzahl des Buchs im Verlauf ändert.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 37. Zustands-Sharing im UI-Framework

**Hintergrund:**
In Benutzeroberflächen (UI) müssen oft mehrere visuelle Komponenten (z. B. eine Statusleiste und eine Detailansicht) auf denselben globalen Anwendungszustand zugreifen, um sich bei Änderungen zu aktualisieren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für den Anwendungszustand (z. B. aktueller Benutzername, Ladestatus) und UI-Komponenten. Verpacke den Zustand in einen Smart Pointer, damit mehrere UI-Komponenten denselben Zustand lesend teilen können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zur Initialisierung des Zustands und zum Erzeugen von Komponenten. Jede Komponente hält eine Referenz auf den Zustand und implementiert eine Render-Methode, die diesen Zustand ausgibt.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der Hauptfunktion das UI-Framework. Erstelle den globalen Zustand und übergebe ihn an zwei Komponenten. Rufe deren Render-Methoden auf, um zu zeigen, dass beide denselben Zustand anzeigen.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 38. Pipeline-Verarbeitung (Producer-Consumer)

**Hintergrund:**
In einer Verarbeitungs-Pipeline wandern Datenpakete durch verschiedene Stufen. Jede Stufe muss auf gemeinsame Metadaten (wie Konfigurationsparameter oder Laufzeitstatistiken) zugreifen können, ohne dass diese kopiert werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere Strukturen für Pipeline-Metadaten und die einzelnen Pipeline-Stufen. Verwende einen threadsicheren Smart Pointer für geteilte Ownership, um den Zugriff auf die Metadaten über die Stufen hinweg zu ermöglichen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Schreibe Methoden für die Ausführung der Pipeline-Stufen. Jede Stufe erhält beim Start eine geklonte Referenz auf die Metadaten, um während der Verarbeitung darauf zuzugreifen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue in der Hauptfunktion eine Pipeline auf, erstelle die gemeinsamen Metadaten und starte die Verarbeitung. Lass die verschiedenen Stufen ihre Aktionen protokollieren und zeige, dass alle Stufen erfolgreich auf dieselben Metadaten zugegriffen haben.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 39. Weak-Referenzen im Dateisystem-Cache

**Hintergrund:**
Um Festplattenzugriffe zu minimieren, werden geöffnete Dateien oft in einem Cache vorgehalten. Falls eine Datei aber im gesamten restlichen Programm geschlossen wurde, soll sie auch automatisch aus dem Cache verschwinden. Dies lässt sich perfekt über schwache Referenzen steuern.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf einen Cache für Dateien. Die Datei-Objekte werden von den Programmteilen aktiv genutzt. Der Cache selbst hält jedoch nur schwache Zeiger auf diese Dateien, um den Verbleib im Speicher nicht künstlich zu erzwingen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Öffnen einer Datei (die ein starkes Handle zurückgibt) und zum Abfragen einer Datei aus dem Cache. Versuche bei der Abfrage, den schwachen Zeiger aufzuwerten. Schlägt dies fehl, muss die Datei neu geladen werden.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere im Hauptprogramm den Dateizugriff. Öffne Dateien über den Cache, halte manche Referenzen aktiv und lasse andere verfallen. Rufe den Cache erneut auf und zeige auf der Konsole, wann Dateien neu geladen werden müssen und wann sie aus dem Cache bedient werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 40. Flugverbindungs-Netzwerk

**Hintergrund:**
Ein Flugnetzwerk besteht aus Flughäfen, die über Direktflüge miteinander verbunden sind. Ein Flughafen hat Verbindungen zu anderen Flughäfen, welche wiederum zurückverweisen. Um dieses Beziehungsgeflecht speichersicher und ohne Endlosschleifen abzubilden, müssen wir starke und schwache Smart Pointer geschickt kombinieren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere eine Struktur für einen Flughafen (mit Name und Code). Der Flughafen verwaltet eine Liste seiner ausgehenden und eingehenden Flugverbindungen. Wähle eine Kombination aus starken und schwachen Smart Pointern, um Zyklen im Speicher zu vermeiden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc, Arc, Weak) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Flughäfen und zum Hinzufügen von Routen. Achte darauf, wie du die gegenseitigen Referenzen setzt, und implementiere eine Hilfsfunktion, die prüft, ob eine direkte Route zwischen zwei Flughäfen existiert.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der Hauptfunktion ein kleines Netzwerk aus Flughäfen (z. B. Frankfurt, London, New York) und füge Verbindungen hinzu. Führe eine einfache Abfrage durch, um zu prüfen, welche Flughäfen von einem bestimmten Startpunkt aus erreichbar sind, und gib das Ergebnis aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?
# Phase 6: RefCell-Fokus (Projekte 41-60)

Hier findest du didaktische Prompts für die Projekte 41 bis 60 aus Phase 6 (RefCell-Fokus). Diese Prompts führen dich Schritt für Schritt durch die Implementierung, ohne dir fertigen Code vorzugeben.

---

### 41. Einfacher Konsolen-Logger

**Hintergrund:**
Manchmal verlangt ein Trait eine unveränderliche Referenz, aber du musst intern Buch führen. Hier lernst du, wie du mithilfe von `RefCell` Daten änderst, obwohl die Trait-Signatur es eigentlich verbietet.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Logger-Trait mit einer Methode zum Protokollieren von Nachrichten. Erstelle anschließend ein Struct für deinen Konsolen-Logger, das intern die Liste der protokollierten Nachrichten speichert. Nutze den passenden Smart Pointer, um diese Liste veränderbar zu machen, obwohl das Struct nach außen hin unveränderlich referenziert wird.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Logger-Trait für dein Struct. Greife in der Protokollmethode auf den inneren Zustand zu, um die Nachricht hinzuzufügen. Biete zusätzlich eine Methode an, um die Anzahl der Log-Einträge abzufragen, und nutze dabei die Mechanismen zur Laufzeit-Ausleihe.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der Hauptdatei ein Szenario, in dem du eine Instanz deines Loggers erzeugst, sie hinter einer unveränderlichen Referenz verbirgst und mehrfach Nachrichten protokollierst. Gib am Ende alle Logs und deren Anzahl auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 42. Mock-Datenbank für Tests

**Hintergrund:**
Beim Schreiben von Unit-Tests möchte man keine echte Datenbankverbindung aufbauen. Mit "Interior Mutability" kannst du eine Testdatenbank simulieren, die intern Aufrufe zählt und simulierte Ergebnisse zurückgibt, ohne ihre äußere Schnittstelle zu verändern.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Trait für Datenbankabfragen (z.B. Abfragen von Datensätzen nach ID). Erstelle dann eine Mock-Datenbank-Struktur, die intern einen Zähler für die Abfragen und eine Liste simulierter Datensätze enthält. Um den Zähler in schreibgeschützten Methoden zu erhöhen, verwende die innere Veränderlichkeit.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Datenbank-Trait für dein Mock-Struct. Erhöhe bei jedem Aufruf der Abfragemethode den internen Zähler und gib den passenden Testdatensatz zurück. Implementiere zudem Hilfsmethoden, um den aktuellen Zählerstand für die Validierung im Test auszulesen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe einen Testfall oder ein Hauptprogramm, das die Mock-Datenbank über das Trait anspricht, Abfragen durchführt und am Ende verifiziert, dass die richtige Anzahl an Abfragen registriert wurde.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 43. Zähler für Funktionsaufrufe

**Hintergrund:**
Zur Optimierung und Analyse von Software ist es wichtig zu wissen, wie oft bestimmte Funktionen aufgerufen werden. Mit `RefCell` kannst du diese Statistiken unauffällig im Hintergrund mitschreiben, selbst innerhalb von Getter-Methoden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Struktur, die eine bestimmte Dienstleistung anbietet (z. B. mathematische Berechnungen). Integriere interne Felder, um die Aufrufhäufigkeit der einzelnen Methoden zu zählen. Diese Zähler sollen auch bei lesenden Zugriffen aktualisiert werden können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere die mathematischen Methoden sowie Getter-Methoden zum Auslesen der Berechnungen. Jede Berechnungsmethode muss bei Aufruf ihren zugehörigen Zähler über eine Laufzeit-Ausleihe inkrementieren.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der Hauptfunktion eine Reihe von Rechenoperationen und frage anschließend die Aufrufstatistiken ab, um sie übersichtlich auf der Konsole auszugeben.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 44. Laufzeit-Borrow-Checker-Experiment

**Hintergrund:**
Während der Rust-Compiler deine Ausleih-Regeln meist zur Compilezeit prüft, verschiebt `RefCell` diese Prüfung auf die Laufzeit. In diesem Experiment lernst du die Grenzen kennen, indem du absichtlich einen Absturz provozierst.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine einfache Struktur, die einen einfachen Datenwert (z.B. eine Zahl) enthält. Packe diesen Wert in eine `RefCell`, um die Ausleihen zur Laufzeit verwalten zu können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Schreibe eine Methode, die versucht, gleichzeitig zwei veränderliche Referenzen auf den inneren Wert zu erhalten. Nutze eine Fehlerbehandlung oder fange den Absturz ab, um zu demonstrieren, wann und wie der Laufzeit-Borrow-Checker eingreift.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein Konsolenprogramm, das dem Benutzer erklärt, was gleich passieren wird, und führe dann das Experiment aus. Nutze gegebenenfalls Rusts Panic-Handling-Mechanismen, um den Absturz kontrolliert zu dokumentieren.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 45. Einfacher Cache mit Interior Mutability

**Hintergrund:**
Aufwendige Berechnungen sollten nur einmal durchgeführt werden. Ein Cache speichert Ergebnisse ab – doch das soll oft unbemerkt während eines schreibgeschützten Lesezugriffs geschehen. `RefCell` macht dies möglich.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Cache-Struktur, die eine Funktion zur Berechnung (z.B. Fibonacci-Zahlen) und ein optionales Feld zur Zwischenspeicherung des Ergebnisses besitzt. Verwende die innere Veränderlichkeit, um das berechnete Ergebnis nachträglich eintragen zu können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode zum Abrufen des Wertes. Diese Methode nimmt eine unveränderliche Referenz entgegen. Wenn der Wert noch nicht im Cache liegt, berechne ihn, speichere ihn ab und gib ihn zurück. Andernfalls liefere direkt den zwischengespeicherten Wert.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein CLI-Programm, das eine teure Berechnung simuliert. Lass den Benutzer denselben Wert mehrfach abfragen und gib aus, ob der Wert neu berechnet oder aus dem Cache gelesen wurde, inklusive der benötigten Zeit.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 46. GUI-Button mit Klick-Zähler

**Hintergrund:**
Benutzeroberflächen basieren oft auf unveränderlichen Strukturen, die auf Benutzerereignisse reagieren müssen. Mit `RefCell` kann ein Button seine eigenen Klicks zählen, ohne dass die gesamte Benutzeroberfläche veränderlich sein muss.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Button-Struct mit einer Beschriftung und einem Klickzähler. Da Klicks über eine unveränderliche Methode verarbeitet werden sollen, musst du den Klickzähler in einen Smart Pointer verpacken, der innere Veränderlichkeit erlaubt.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode zur Simulation eines Klicks sowie eine Methode zum Auslesen des aktuellen Klickstands. Der Klick-Simulations-Aufruf darf nur eine unveränderliche Referenz erfordern und erhöht den Zähler im Inneren.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein einfaches Menü in `main.rs`, in dem der Benutzer virtuell auf den Button klicken kann. Zeige nach jedem Klick den aktualisierten Zählerstand an.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 47. Lazy-Initialization-Container

**Hintergrund:**
Manchmal ist die Erstellung eines Objekts sehr speicher- oder zeitintensiv. In solchen Fällen ist es klug, das Objekt erst dann zu erstellen, wenn es wirklich gebraucht wird. `RefCell` hilft uns, diese verzögerte Initialisierung sauber zu kapseln.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Container-Struktur, die einen optionalen Wert enthält. Zu Beginn ist dieser Wert leer. Erst beim ersten Zugriff soll der Wert erzeugt werden. Verwende einen Smart Pointer für die innere Veränderlichkeit des Werts.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Zugriffsmethode, die eine unveränderliche Referenz auf den Container verlangt. Falls der Container noch leer ist, initialisiere den Wert über eine Bereitstellungsfunktion und speichere ihn ab. Gib anschließend eine Referenz auf den Wert zurück.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Demonstriere in deiner `main.rs`, dass das teure Objekt beim Programmstart noch nicht existiert. Zeige durch Konsolenausgaben, in welchem Moment die Initialisierung tatsächlich stattfindet.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 48. Konfigurations-Hot-Reload

**Hintergrund:**
Bei lang laufenden Anwendungen (wie Servern) möchte man Konfigurationen im laufenden Betrieb ändern, ohne das System neu zu starten. Hier lernst du, wie du Konfigurationsdaten im Hintergrund sicher aktualisierst, während andere Systemteile lesend darauf zugreifen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf ein Konfigurations-Struct mit verschiedenen Feldern (z. B. Port, Datenbank-URL). Erstelle eine übergeordnete Manager-Struktur, die diese Konfiguration hält und dank innerer Veränderlichkeit Aktualisierungen zur Laufzeit erlaubt.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Lesen der Konfigurationswerte sowie eine Methode zum Aktualisieren (Reload) der Konfiguration aus einer simulierten Quelle. Beide Zugriffe müssen sicherstellen, dass keine ungültigen Zustände oder Konflikte bei der Ausleihe entstehen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in deinem Hauptprogramm einen Ablauf, bei dem ein Hintergrund-Event die Konfiguration ändert, während gleichzeitig Lesezugriffe stattfinden. Gib die Änderungen auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 49. Spiel-Statistiken-Tracker

**Hintergrund:**
In Spielen werden Erfolge (Achievements) oft an unerwarteten Stellen freigeschaltet. Ein zentraler Tracker sammelt diese Ereignisse über eine einfache Schnittstelle und aktualisiert die Spieler-Statistiken mithilfe von `RefCell`.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Struktur für die Spielstatistiken (z.B. besiegte Gegner, gesammelte Münzen) und eine Liste freigeschalteter Erfolge. Verpacke diese Daten so, dass sie über eine unveränderliche Referenz des Trackers modifiziert werden können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden wie das Registrieren eines besiegten Gegners. Prüfe im Zuge dieser Aktualisierung, ob ein bestimmter Meilenstein erreicht wurde, und füge bei Erfolg ein neues Achievement hinzu.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein kleines CLI-Spiel-Szenario auf, in dem der Spieler Aktionen ausführt. Gib nach jeder Aktion den aktuellen Fortschritt und eventuell neu freigeschaltete Erfolge aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 50. Virtueller RAM-Speicher

**Hintergrund:**
Die Simulation von Hardwarekomponenten ist ein klassischer Anwendungsfall für `RefCell`. Hier simulierst du einen RAM-Riegel, der bei jedem Lese- und Schreibzugriff im Hintergrund Metadaten (wie Zugriffsstatistiken) aktualisiert.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere eine Struktur, die ein Array von Bytes als virtuellen Speicher darstellt. Ergänze statistische Felder, um die Anzahl der Lese- und Schreibvorgänge zu erfassen. Nutze innere Veränderlichkeit für diese Statistikfelder.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Lesen und Schreiben von Speicheradressen. Der Lesezugriff soll unveränderlich sein, aktualisiert aber dennoch den Lese-Statistikzähler. Der Schreibzugriff modifiziert sowohl den Speicherinhalt als auch den Schreibzähler.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein interaktives CLI-Menü, in dem der Benutzer Werte in den virtuellen RAM schreiben und lesen kann. Zeige auf Knopfdruck die detaillierten Zugriffsstatistiken des RAMs an.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 51. Trace-Utility für Funktionen

**Hintergrund:**
Um tiefe Funktionsaufrufe zu verstehen, ist ein Call-Stack-Trace hilfreich. Hier entwickelst du ein Utility, das mithilfe von `RefCell` die aktuelle Aufruftiefe und den Funktionsverlauf aufzeichnet.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Trace-Struktur, die eine Liste von Funktionsnamen und die aktuelle Verschachtelungstiefe speichert. Diese Struktur soll global oder lokal bereitgestellt werden und Einträge über unveränderliche Referenzen aufnehmen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Betreten und Verlassen einer Funktion. Beim Betreten wird der Name hinzugefügt und die Tiefe erhöht, beim Verlassen wird die Tiefe verringert. Nutze temporäre Hilfsstrukturen (z.B. RAII über das `Drop`-Trait), um das Verlassen automatisch zu regeln.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe einige verschachtelte Beispielfunktionen in deiner `main.rs`, die sich beim Trace-Utility an- und abmelden. Gib am Ende den gesamten formatierten Aufrufbaum auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 52. Dateisystem-Node mit Schreibschutz

**Hintergrund:**
Auch wenn eine Datei schreibgeschützt ist, ändert das Betriebssystem oft Metadaten wie das letzte Zugriffsdatum, sobald die Datei gelesen wird. Mit `RefCell` kannst du dieses Verhalten exakt nachbilden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere eine Datei-Struktur mit Inhaltsfeldern und Metadaten (z.B. Dateigröße, letzter Zugriff als Zeitstempel). Verwende für den Zeitstempel die innere Veränderlichkeit, damit dieser beim Lesen aktualisiert werden kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode zum Lesen des Datei-Inhalts. Diese Methode ist unveränderlich, muss aber den internen Zeitstempel des letzten Zugriffs aktualisieren. Stelle sicher, dass die Ausleihe zur Laufzeit korrekt freigegeben wird.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der `main.rs` ein Szenario, in dem du eine Datei liest und den Zeitstempel davor und danach vergleichen kannst. Gib die Ergebnisse auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 53. Zustands-Verbindung für Netzwerk-Sockets

**Hintergrund:**
Ein Netzwerk-Socket ändert seinen Zustand (z. B. von Bereit auf Beschäftigt) während des Sendens von Daten. Damit die Sende-Methode einfach zu benutzen bleibt, verwalten wir diesen Zustand intern veränderbar.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle ein Enum für den Verbindungsstatus (z.B. Getrennt, Verbindet, Verbunden) und ein Struct für das Socket. Das Struct soll den aktuellen Status sowie einen Puffer für gesendete Daten halten. Nutze `RefCell` für den Status und den Puffer.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere die Methode zum Senden einer Nachricht. Die Methode nimmt eine unveränderliche Referenz auf das Socket. Ändere den Zustand intern auf "Beschäftigt", füge die Nachricht dem Puffer hinzu und setze den Zustand wieder zurück.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in `main.rs` das Senden mehrerer Nachrichten über ein Socket. Fange mögliche Fehler ab (z.B. Senden bei unterbrochener Verbindung) und gib den Verbindungsverlauf auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 54. Einfacher Task-Scheduler

**Hintergrund:**
Ein Task-Scheduler verwaltet anstehende Aufgaben. Um neue Aufgaben hinzuzufügen oder abzuarbeiten, während der Scheduler selbst in verschiedenen Kontexten referenziert wird, nutzen wir die innere Veränderlichkeit.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für eine Aufgabe (z. B. mit ID, Priorität und Beschreibung). Erstelle die Scheduler-Struktur, die eine Liste dieser Aufgaben verwaltet. Nutze die innere Veränderlichkeit für die Aufgabenliste.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Hinzufügen einer Aufgabe, zum Herausholen der nächsten anstehenden Aufgabe und zum Markieren einer Aufgabe als erledigt. Achte darauf, dass während des Verschiebens der Aufgaben keine ungültigen Referenzen bestehen bleiben.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein Konsolenmenü, über das der Benutzer neue Aufgaben erstellen und die jeweils nächste anstehende Aufgabe abarbeiten lassen kann. Zeige die verbleibende Aufgabenliste an.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 55. Grafik-Pipeline-Konstruktor

**Hintergrund:**
Beim Zeichnen von Grafiken ändern sich Einstellungen wie die Stiftfarbe oder Pinseldicke häufig. Mit `RefCell` kannst du diese Zustandskonfigurationen flexibel anpassen, ohne die gesamte Zeichenfläche neu instanziieren zu müssen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Struktur für einen Grafikkontext, die Einstellungen wie Hintergrundfarbe, Linienstärke und Zeichenmodus enthält. Verwende für diese Einstellungen die innere Veränderlichkeit, damit sie während des Zeichnens angepasst werden können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Ändern der Zeichenparameter sowie Methoden zum Simulieren des Zeichnens (z. B. Zeichne Kreis). Die Zeichenmethoden greifen lesend auf die Einstellungen zu, während die Konfigurationsmethoden diese verändern.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in `main.rs` den Aufbau einer Grafik-Pipeline. Ändere die Farbe und zeichne verschiedene geometrische Formen. Gib den Zustand der Pipeline auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 56. Mock-E-Mail-Sender

**Hintergrund:**
Um in Tests sicherzustellen, dass E-Mails korrekt verschickt werden, verwendet man einen Mock-Sender. Dieser fängt die E-Mails ab und speichert sie intern ab, sodass der Test sie überprüfen kann.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein E-Mail-Sender-Trait. Erstelle dann deine Mock-Struktur, die intern einen Vektor der gesendeten E-Mails speichert. Verwende einen Smart Pointer für die innere Veränderlichkeit des Vektors, da das Sende-Trait eine unveränderliche Referenz verlangt.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Sende-Trait für deinen Mock-Sender. Füge beim Aufruf die E-Mail dem internen Vektor hinzu. Implementiere zusätzlich Methoden, um den Vektor auszulesen und zu leeren.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein Testprogramm, das den Mock-Sender mit verschiedenen Nachrichten füttert und anschließend überprüft, ob alle E-Mails korrekt aufgezeichnet wurden.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 57. Sensor-Simulator

**Hintergrund:**
Bei der Simulation von IoT-Sensoren müssen kontinuierlich Werte generiert und im Verlaufspuffer abgelegt werden. Die Abfrage erfolgt oft über eine schreibgeschützte Schnittstelle, die jedoch intern den Verlauf aktualisiert.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Sensor-Struktur mit einem Puffer für die letzten Messwerte und einer ID. Nutze die innere Veränderlichkeit für den Verlaufspuffer, um neue Messungen bei jeder Abfrage zu protokollieren.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode zum Abrufen des aktuellen Sensorwerts. Generiere bei jedem Aufruf einen neuen Zufallswert, füge ihn dem Puffer hinzu und liefere ihn zurück. Begrenze die Größe des Puffers (z. B. auf die letzten 10 Werte).
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in `main.rs` eine Schleife, die den Sensor mehrfach abfragt. Zeige am Ende den aufgezeichneten Verlauf aller Messwerte auf der Konsole an.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 58. Benutzer-Session-Manager

**Hintergrund:**
Um die Sicherheit einer Webanwendung zu gewährleisten, verfallen Sessions nach einer gewissen Inaktivität. Bei jedem Zugriff muss die Ablaufzeit aktualisiert werden – auch bei rein lesenden Abfragen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Struktur für eine Benutzer-Session (mit Benutzername und Ablauf-Zeitstempel). Nutze einen Smart Pointer für die Ablaufzeit, damit diese bei jedem Lesezugriff auf die Session aktualisiert werden kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode zur Überprüfung der Session-Gültigkeit. Ist die Session noch gültig, verlängere die Ablaufzeit um eine feste Dauer und gib die Benutzerdaten frei. Ist sie abgelaufen, liefere einen Fehler zurück.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein CLI-Programm, das eine Benutzer-Session erstellt. Lass den Benutzer wiederholt Aktionen ausführen und simuliere Wartezeiten, um zu demonstrieren, wie die Session verlängert wird oder abläuft.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 59. Undo-Stack für Texteditor

**Hintergrund:**
In einem Texteditor möchte der Benutzer Aktionen rückgängig machen können. Die Editor-Komponente verwaltet diesen Undo-Verlauf im Hintergrund mithilfe von `RefCell`, um den Zustand des Dokuments sauber zu trennen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Editor-Struktur, die den aktuellen Text und einen Stapel (Stack) früherer Textzustände enthält. Nutze die innere Veränderlichkeit für den Undo-Stapel.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Schreiben von Text (speichert den alten Zustand auf dem Stack) und eine Undo-Methode (stellt den letzten Zustand vom Stack wieder her). Stelle sicher, dass die Zustandsübergänge konsistent sind.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Entwickle ein einfaches CLI-Texteditor-Interface, in dem der Benutzer Text eingeben, den aktuellen Text anzeigen und die letzte Eingabe rückgängig machen kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 60. Cache für DNS-Anfragen

**Hintergrund:**
DNS-Abfragen über das Netzwerk sind langsam. Ein lokaler Cache speichert die IP-Adressen für bereits angefragte Domains. Mit `RefCell` können wir diesen Cache bei jeder Auflösung im Hintergrund aktualisieren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere eine DNS-Resolver-Struktur, die eine Map (z. B. HashMap) als Cache für Domain-IP-Paare enthält. Da der Resolver über eine unveränderliche Methode abgefragt wird, verpacke den Cache in einen veränderbaren Smart Pointer.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. RefCell) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere die Methode zur Namensauflösung. Sucht diese zuerst im Cache. Falls nicht vorhanden, simuliere eine Netzwerkabfrage, trage das Ergebnis in den Cache ein und liefere die IP zurück.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein CLI-Programm, bei dem der Benutzer Domains eingeben kann. Gib an, ob die IP aus dem Cache geladen oder neu ermittelt wurde, und zeige am Ende den gesamten Cache-Inhalt an.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?
# Phase 6: Kombinations-Projekte (Projekte 61-80)

Hier findest du didaktische Prompts für die Projekte 61 bis 80 aus Phase 6 (Kombinations-Projekte). Diese Prompts führen dich Schritt für Schritt durch die Implementierung, ohne dir fertigen Code vorzugeben.

---

### 61. Verkettete Liste mit zwei Richtungen (Doubly Linked List)

**Hintergrund:**
Eine doppelt verkettete Liste erlaubt das Navigieren in beide Richtungen. In Rust ist das durch die Ownership-Regeln eine echte Herausforderung, da ein Knoten sowohl einen Nachfolger als auch einen Vorgänger referenziert, was ohne die richtigen Smart Pointer zu Zyklen und Speicherlecks führt.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Datenstruktur für einen Knoten und die Liste selbst. Da mehrere Instanzen Besitzrechte an einem Knoten teilen (Nachfolger und Vorgänger) und Knoten veränderbar sein müssen, ist eine Heap-Allokation mit geteilten Besitzrechten und innerer Veränderbarkeit notwendig. Um Speicherlecks durch zirkuläre Referenzen zu vermeiden, muss eine Richtung schwach referenziert werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Einfügen von Elementen am Anfang und Ende, zum Entfernen von Elementen sowie zum Durchlaufen der Liste in beide Richtungen. Nutze die Methoden für innere Veränderbarkeit, um die Zeiger sicher umzuhängen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Binde die Liste in die main.rs ein. Erstelle ein CLI-Menü, mit dem der Benutzer Werte hinzufügen, entfernen, die Liste vorwärts und rückwärts ausgeben oder nach Werten suchen kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 62. Shared State im Multi-Threading (Arc<Mutex>)

**Hintergrund:**
Wenn mehrere Threads denselben Zustand verändern sollen, verbietet Rust dies aus Sicherheitsgründen standardmäßig. Mit atomaren Smart Pointern und Mutexen kannst du Daten sicher über Thread-Grenzen hinweg teilen und gegenseitigen Ausschluss garantieren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Struktur, die den geteilten Zustand (einen Zähler) kapselt. Überlege, wie dieser Zustand für mehrere Threads im Speicher alloziiert und abgesichert sein muss, damit Threads gleichzeitig Zugriff anfordern können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode zum sicheren Inkrementieren des Zählers. Nutze Sperrmechanismen (Locks), um exklusiven Zugriff zu erhalten, und stelle sicher, dass der Lock nach getaner Arbeit wieder freigegeben wird.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Starte in der main.rs zehn Threads, die alle parallel auf den geteilten Zähler zugreifen und ihn inkrementieren. Warte auf alle Threads (Join) und gib den finalen Wert fehlerfrei aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 63. Multi-Reader, Single-Writer Cache (Arc<RwLock>)

**Hintergrund:**
In leseintensiven Szenarien bremst ein einfacher Mutex die Performance aus, da immer nur ein Thread gleichzeitig zugreifen darf. Mit einem Lese-Schreib-Lock können beliebig viele Threads gleichzeitig lesen, während Schreibzugriffe exklusiv gesichert werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf eine Cache-Struktur (z. B. auf Basis einer Schlüssel-Wert-Tabelle), die über Thread-Grenzen hinweg geteilt werden kann. Die Struktur muss so verpackt sein, dass paralleles Lesen effizient möglich ist, aber Schreiben exklusiv bleibt.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Abfragen (Lesen) und Aktualisieren (Schreiben) von Cache-Einträgen. Nutze die entsprechenden Sperren für Lese- und Schreibzugriff und achte darauf, Deadlocks zu vermeiden.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der main.rs mehrere Lese-Threads und einen separaten Schreib-Thread, die parallel auf den Cache zugreifen. Gib Statusmeldungen auf der Konsole aus, um das Verhalten der Sperren zu verdeutlichen.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 64. Zyklischer Graph mit veränderbaren Knoten

**Hintergrund:**
Soziale Netzwerke oder Web-Graphen bestehen aus Knoten, die sich gegenseitig referenzieren. In Rust erfordert das Teilen und Verändern von Knoten in einem zyklischen Beziehungsgeflecht eine Kombination aus geteilter Ownership und dynamischer Ausleihe zur Laufzeit.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für eine Person (Knoten) und das Netzwerk (Graph). Da Personen mehrere Freunde (Referenzen auf andere Personen) haben und Profile veränderbar sein müssen, ist eine Heap-Struktur mit Referenzzählung und innerer Veränderbarkeit gefragt.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Hinzufügen von Personen, zum Knüpfen von Freundschaften (gegenseitige Referenzen) und zum Aktualisieren von Profildaten. Nutze die Laufzeitausleihe, um die Listen der Freunde sicher zu manipulieren.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Binde das Netzwerk in die main.rs ein. Erstelle ein CLI-Menü, über das man neue Nutzer anlegen, Freundschaften schließen, Profile ändern und die Freundesliste einer Person anzeigen kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 65. Thread-sichere Job-Warteschlange

**Hintergrund:**
In modernen Anwendungen ist es üblich, dass Hintergrundaufgaben von mehreren Erzeugern (Producern) generiert und von mehreren Arbeitern (Consumern) abgearbeitet werden. Um Datenkorruption zu vermeiden, muss der Zugriff auf die Warteschlange threadsicher koordiniert werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Struct für einen Job und eine Warteschlange (z.B. eine doppelseitige Warteschlange). Der Speicherplatz für die Jobs muss so geteilt werden, dass mehrere Threads sicher Elemente hinzufügen oder entnehmen können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Einstellen eines neuen Jobs (Push) und zum Entnehmen des nächsten anstehenden Jobs (Pop). Schütze die zugrundeliegende Datenstruktur durch gegenseitigen Ausschluss (Locks) während des Zugriffs.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Starte in der main.rs mehrere Producer-Threads, die zufällige Jobs erzeugen, und mehrere Consumer-Threads, die diese abarbeiten. Zeige den Fortschritt und die Abarbeitungsreihenfolge im Terminal an.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 66. Baumstruktur mit dynamischen Eltern-Updates

**Hintergrund:**
In Benutzeroberflächen oder Szenengraphen müssen Knoten oft flexibel im Baum verschoben werden (z. B. Umhängen eines Ordners). Um dabei sowohl Kinder als auch Eltern referenzieren zu können, ohne Speicherlecks zu verursachen, ist eine Kombination aus starken und schwachen Pointern nötig.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Knotenstruktur für den Baum. Jeder Knoten soll eine Liste von Kindknoten besitzen und optional auf seinen Elternknoten verweisen können. Die Referenz auf die Kinder muss das Eigentum teilen und veränderbar sein, während die Referenz zum Elternteil das Löschen des Knotens nicht verhindern darf.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden wie das Hinzufügen eines Kindes, das Entfernen eines Kindes und das Ändern des Elternteils (Verschieben eines Knotens). Nutze die Methoden der inneren Veränderbarkeit, um Referenzen zur Laufzeit sicher aufzulösen und neu zuzuweisen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Binde die Baumstruktur in die main.rs ein. Zeige über ein Konsolenmenü die Hierarchie des Baums an und erlaube es dem Benutzer, Knoten interaktiv an andere Stellen im Baum zu verschieben.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 67. Gemeinsamer Spielzustand im Multiplayer

**Hintergrund:**
Bei einem Multiplayer-Spiel greifen viele Clients gleichzeitig auf denselben Server-Spielzustand zu (z. B. Positionen von Spielern). Um Race Conditions zu verhindern und Konsistenz zu wahren, muss dieser globale Zustand threadübergreifend geschützt werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere den Spielzustand (z. B. eine Liste aktiver Spieler und deren Koordinaten). Verpacke diesen Zustand so, dass mehrere Client-Threads parallel Lese- und Schreibrechte anfordern können, ohne dass das Programm abstürzt oder inkonsistente Zustände entstehen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Aktualisieren einer Position eines Spielers, zum Hinzufügen/Entfernen von Spielern und zum Abfragen der gesamten Spielwelt. Sichere diese Zugriffe über atomare Sperrmechanismen ab.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der main.rs mehrere Threads (Clients), die kontinuierlich Bewegungsdaten an den Server senden. Ein separater Thread soll in regelmäßigen Abständen den aktuellen Zustand der Spielwelt auf der Konsole ausgeben.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 68. Thread-sicherer Event-Bus

**Hintergrund:**
Ein Event-Bus verteilt Ereignisse (Events) an registrierte Abonnenten. Da diese Abonnenten in verschiedenen Threads laufen können, muss die Verwaltung der Abonnentenliste sowie das Senden von Events threadübergreifend synchronisiert werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Event-Objekt und die Struktur des Event-Bus. Der Bus muss eine Liste von Abonnenten (Subscribers) verwalten. Die Liste muss threadsicher geteilt werden und dynamisch erweitert oder verringert werden können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Registrieren eines Abonnenten, zum Abmelden und zum Veröffentlichen (Publish) eines Events. Nutze Sperren, um die Abonnentenliste während des Veröffentlichungsprozesses vor parallelen Änderungen zu schützen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der main.rs einen Event-Bus, registriere mehrere Empfänger-Threads und sende aus einem Sender-Thread verschiedene Test-Events. Dokumentiere die Event-Zustellung über Konsolenausgaben.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 69. Dynamisches Menü-System

**Hintergrund:**
In komplexen CLI-Anwendungen hängen Menüpunkte oft voneinander ab oder verweisen zurück auf ihr übergeordnetes Menü (z. B. "Zurück"-Button). Ohne die richtige Kombination aus veränderbaren, geteilten und schwachen Zeigern gerät Rusts Ownership-Modell hier an seine Grenzen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Strukturen für einen Menüpunkt und ein Untermenü. Untermenüs müssen eine Liste ihrer Kind-Einträge besitzen und einen Zeiger auf das übergeordnete Menü (Parent) halten. Die Speicherstruktur muss zirkelsicher und veränderbar sein.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Hinzufügen von Untermenüs, zum Löschen von Menüpunkten und zum Navigieren ("Gehe zu Untermenü", "Gehe zurück"). Nutze innere Veränderbarkeit, um den Zustand des aktuell ausgewählten Menüs zu aktualisieren.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue in main.rs ein interaktives Konsolenmenü auf. Der Benutzer soll durch Eingabe von Zahlen durch die Menüstruktur navigieren und Menüeinträge zur Laufzeit dynamisch hinzufügen oder umbenennen können.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 70. Thread-sicheres Logging-System

**Hintergrund:**
Wenn viele Programmteile gleichzeitig Log-Einträge schreiben, müssen diese geordnet gesammelt und ohne Blockierung des Hauptprogramms in eine Datei oder die Konsole geschrieben werden. Ein geteilter, threadsicherer Puffer löst diese Anforderung.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Logger-Struktur, die einen internen Puffer (z.B. eine Liste von Texten) verwaltet. Der Puffer muss so im Speicher abgelegt sein, dass mehrere Threads gleichzeitig und sicher neue Log-Meldungen hineinschreiben können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode zum Hinzufügen einer Log-Nachricht und eine Methode, die den Puffer leert und in eine Datei schreibt (Flushing). Verwende gegenseitigen Ausschluss, um den Schreibzugriff auf den Puffer abzusichern.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erzeuge in der main.rs einen globalen Logger. Starte mehrere Threads, die intensiv Log-Nachrichten produzieren, und einen Hintergrund-Thread, der den Logger in regelmäßigen Abständen in eine Datei flusht.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 71. Teilnehmerliste in einer Chat-Gruppe

**Hintergrund:**
Ein Chat-Server muss die Verbindungen aller aktiven Benutzer verwalten. Da Benutzer jederzeit beitreten oder den Chat verlassen können, während andere Threads Nachrichten an alle senden wollen, muss die Teilnehmerliste hochgradig parallel lesbar und veränderbar sein.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Datenstruktur für Benutzer und eine Teilnehmerliste (z.B. eine Hash-Tabelle). Da die Liste von vielen Threads gelesen wird (Nachrichtenverteilung) und seltener geschrieben wird (Beitritt/Austritt), muss die Struktur entsprechend geschützt werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Hinzufügen eines Nutzers, zum Entfernen eines Nutzers und zum Senden einer Nachricht an alle angemeldeten Nutzer. Nutze Lese- und Schreibsperren, um maximale Parallelität beim Lesen zu gewährleisten.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Binde die Teilnehmerliste in die main.rs ein. Simuliere das An- und Abmelden von Usern sowie das Senden von Gruppen-Nachrichten über mehrere parallele Threads hinweg und gib den Ablauf auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 72. Web-Scraper mit geteilten Ergebnissen

**Hintergrund:**
Beim parallelen Herunterladen von Webseiten (Web Scraping) verarbeiten mehrere Threads unterschiedliche URLs. Die Ergebnisse müssen am Ende in einer zentralen Liste gesammelt werden. Dies erfordert eine threadsichere und geteilte Datenstruktur für die gesammelten Daten.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur für die gesammelten Seitendaten (z.B. URL und Inhalt) und die Ergebnisliste. Der Speicherplatz für die Ergebnisliste muss so aufgeteilt werden, dass Threads unkompliziert Daten anhängen können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden, um ein Ergebnis der Liste hinzuzufügen und um die gesammelten Ergebnisse auszulesen. Nutze Thread-Sperren, um sicherzustellen, dass das Hinzufügen von Elementen aus unterschiedlichen Threads nicht kollidiert.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der main.rs eine Liste von fiktiven URLs. Starte für jede URL einen Thread, der das Herunterladen simuliert (z.B. über eine kurze Verzögerung) und das Ergebnis in die Liste einträgt. Gib am Ende alle gesammelten Daten aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 73. Zustandssteuerung für Roboter

**Hintergrund:**
Ein autonomer Roboter besitzt verschiedene Subsysteme (z. B. Abstandssensoren, Antriebsmotoren, Navigations-KIs), die alle in eigenen Threads laufen. Sie müssen alle auf einen gemeinsamen Roboterzustand zugreifen, um Entscheidungen zu treffen und Aktionen zu koordinieren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Datenstruktur für den Roboterzustand (z. B. Sensorwerte, Motorleistung, Systemstatus). Da dieser Zustand von mehreren Threads gelesen und geschrieben wird, muss er im Speicher atomar geschützt und geteilt werden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Aktualisieren von Sensorwerten (Schreiben) und zum Abrufen des Zustands zur Verhaltensplanung (Lesen). Achte auf eine atomare Sperrung, um zu verhindern, dass ein Thread veraltete oder inkonsistente Sensorwerte liest.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Binde die Steuerung in die main.rs ein. Simuliere einen Sensor-Thread, einen Motor-Thread und einen Logik-Thread, die parallel arbeiten, und stelle den Roboterstatus fortlaufend im Terminal dar.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 74. Dokumenten-Editor (Kooperatives Schreiben)

**Hintergrund:**
In einem kooperativen Dokumenten-Editor arbeiten mehrere Bearbeiter gleichzeitig an verschiedenen Abschnitten desselben Dokuments. Um dies in einem Single-Threaded-Kontext (z. B. einer Event-Loop) abzubilden, müssen die Abschnitte des Dokuments flexibel geteilt und verändert werden können.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Strukturen für einen Dokumentenabschnitt (Text) und das Dokument selbst. Da mehrere Bearbeiter-Objekte auf Abschnitte verweisen und diese verändern können müssen, ist eine Heap-Struktur mit geteilten Rechten und innerer Veränderbarkeit notwendig.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Einfügen von Text in einen Abschnitt, zum Anhängen neuer Abschnitte und zum Lesen des gesamten Dokuments. Nutze die Ausleihe zur Laufzeit, um Bearbeitungen sicher durchzuführen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der main.rs ein Dokument und simuliere zwei Bearbeiter, die abwechselnd Textänderungen an unterschiedlichen Stellen vornehmen. Gib das Dokument nach jedem Bearbeitungsschritt auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 75. Thread-sicherer Rate-Limiter

**Hintergrund:**
Ein Rate-Limiter schützt APIs vor Überlastung, indem er Anfragen zählt und abweist, wenn ein Benutzer sein Limit überschreitet. Da Anfragen auf verschiedenen Threads eingehen, muss die Zähler- und Zeitstempeldatenbank threadsicher geteilt und aktualisiert werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf eine Struktur für die Anfragedaten (z. B. eine Tabelle mit Benutzer-IDs und deren Anfrage-Zeitstempeln). Verpacke diese Struktur so, dass sie für alle anfragenden Threads zugänglich und vor Gleichzeitigkeitskonflikten geschützt ist.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode wie check_request(user_id) -> bool, die prüft, ob die Anfrage zulässig ist, und den internen Zustand aktualisiert. Nutze Locks, um die Überprüfung und das Hochzählen atomar auszuführen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der main.rs mehrere Threads, die in schneller Folge Anfragen für verschiedene Benutzer absenden. Der Rate-Limiter soll zulässige Anfragen erlauben und überschrittene Anfragen im Terminal protokollieren.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 76. Verzeichnissystem mit Dateigrößen-Berechnung

**Hintergrund:**
In einem Dateisystem hat jede Datei eine Größe. Wenn sich die Größe einer Datei ändert, soll sich dies sofort auf die Gesamtgröße des übergeordneten Ordners auswirken. Dies erfordert eine dynamische Aktualisierung der Elternknoten über geteilte, veränderbare Referenzen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Strukturen für Dateien und Ordner. Ein Ordner hält eine Liste von Dateien und Unterordnern. Da Dateigrößen geändert werden können und diese Änderung nach oben propagiert werden muss, ist eine flexible Speicherstruktur auf dem Heap nötig.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Erstellen von Dateien, zum Ändern der Größe einer Datei und zur automatischen Neuberechnung der Ordnergröße. Verwende innere Veränderbarkeit, um die Metadaten der Ordnerhierarchie anzupassen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue in der main.rs ein kleines Verzeichnissystem auf. Erstelle eine interaktive CLI, in der der Benutzer Dateien anlegen, deren Größe verändern und sich den Verzeichnisbaum mit den berechneten Ordnergrößen anzeigen lassen kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 77. Thread-sicherer Connection-Pool

**Hintergrund:**
Datenbankverbindungen sind teuer in der Erstellung. Ein Connection-Pool hält eine feste Anzahl geöffneter Verbindungen bereit. Mehrere Threads können sich Verbindungen ausleihen und wieder zurückgeben. Der Zugriff auf diesen Pool muss threadsicher koordiniert werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Struktur einer Verbindung und des Pools. Der Pool muss eine Liste freier Verbindungen verwalten. Diese Liste muss threadsicher geteilt werden, sodass Verbindungen entnommen und wieder hinzugefügt werden können.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden wie get_connection() (Ausleihen) und release_connection() (Zurückgeben). Nutze Mutex-Sperren, um sicherzustellen, dass keine Verbindung doppelt verliehen wird und die Liste konsistent bleibt.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der main.rs einen Pool mit drei Verbindungen. Starte fünf Threads, die parallel versuchen, eine Verbindung auszuleihen, damit kurz arbeiten und sie anschließend wieder freigeben. Gib den Zustand des Pools fortlaufend aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 78. Echtzeit-Aktien-Ticker

**Hintergrund:**
Ein Ticker-System aktualisiert im Hintergrund Börsenkurse. Gleichzeitig wollen viele Anzeige-Threads diese Kurse in Echtzeit lesen. Da das Schreiben (Aktualisieren) seltener als das Lesen (Anzeigen) vorkommt, eignet sich hier ein Lese-Schreib-Sperrmechanismus.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Struktur für die Aktienpreise (z. B. eine Tabelle mit Aktiensymbolen und Preisen). Verpacke diese Struktur so, dass sie für viele Threads parallel lesbar ist, aber ein Hintergrund-Thread exklusiv schreiben kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Aktualisieren des Kurses einer Aktie und zum Abfragen aller aktuellen Kurse. Schütze die Methoden mit den entsprechenden Lese- bzw. Schreibsperren.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der main.rs den Aktien-Ticker. Starte einen Thread, der zufällig Kurse aktualisiert, und drei Anzeige-Threads, die die Kurse lesen und auf der Konsole ausgeben. Beobachte, wie die Threads parallel auf die Daten zugreifen.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 79. Spielkarten-Deck im Mehrspielerspiel

**Hintergrund:**
In einem Kartenspiel teilen sich alle Spieler dasselbe Deck und den Ablagestapel. Jeder Spieler zieht Karten vom Deck und legt Karten auf den Ablagestapel. Im Single-Threaded-Modus erfordert dieser gemeinsame, veränderbare Zustand ein intensives Ownership-Sharing.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere ein Struct für das Deck und einen Spieler. Da alle Spieler auf dasselbe Deck zugreifen und dieses manipulieren, muss das Deck im Speicher geteilt und veränderbar sein.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Ziehen einer Karte, zum Ablegen einer Karte und zum Mischen des Decks. Nutze die innere Veränderbarkeit, um den Zustand des Decks beim Ziehen oder Ablegen zu manipulieren.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der main.rs ein kleines Kartenspiel. Erstelle ein Deck und drei Spieler, die nacheinander Karten ziehen, auf der Hand halten und wieder ablegen. Zeige den Zustand des Decks und der Spielerhände nach jeder Runde im Terminal an.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 80. Thread-sicherer Dateicache

**Hintergrund:**
Dateizugriffe sind langsam. Ein Dateicache liest Dateien beim ersten Zugriff von der Festplatte und hält sie im Speicher. Da mehrere Threads gleichzeitig Dateien aus dem Cache anfordern können, muss dieser Cache threadsicher geteilt und abgesichert werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Cache-Struktur (z.B. eine Tabelle, die Pfade auf Dateiinhalte abbildet). Wähle eine Verpackung, die paralleles Auslesen bereits gecachter Dateien erlaubt, aber das Hinzufügen einer neuen Datei absichert.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer (z.B. Rc<RefCell<T>>, Arc<Mutex<T>>, Arc<RwLock<T>>) sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Methode get_file_content(path), die prüft, ob die Datei im Cache liegt. Wenn ja, wird der Inhalt zurückgegeben; wenn nein, wird die Datei geladen (simuliert), im Cache gespeichert und dann zurückgegeben.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Binde den Dateicache in die main.rs ein. Simuliere mehrere Threads, die parallel auf gleiche und unterschiedliche Dateien zugreifen, und messe/protokolliere, ob die Dateien geladen werden oder direkt aus dem Cache kommen.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?
# Phase 6: Fortgeschrittene Speicher-Szenarien & Datenstrukturen (Projekte 81-100)

Hier findest du didaktische Prompts für die Projekte 81 bis 100 aus Phase 6 (Fortgeschrittene Speicher-Szenarien & Datenstrukturen). Diese Prompts führen dich Schritt für Schritt durch die Implementierung, ohne dir fertigen Code vorzugeben.

---

### 81. Eigener Arena-Allokator (Arena Allocator)

**Hintergrund:**
Bei vielen kleinen Speicherallokationen auf dem Heap leidet die Performance deines Programms unter der Fragmentierung. Mit einem Arena-Allokator reservierst du einen großen zusammenhängenden Speicherblock auf einmal und verteilst daraus kleinere Stücke, was die Effizienz drastisch steigert und die Verwaltung vereinfacht.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Arena-Struktur, die den vorab alloziierten Speicherbereich verwaltet, sowie die Datenstruktur, mit der du freie und belegte Offsets trackst. Überlege dir, wie du den Speicher auf dem Heap reservierst und die Lebensdauer der alloziierten Objekte an die Arena bindest.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere die Methode zur Allokation von Speicher innerhalb der Arena. Verwende dabei Lebenszeiten (Lifetimes), um sicherzustellen, dass die zurückgegebenen Referenzen nicht länger existieren können als die Arena selbst. Implementiere zudem das Verhalten beim Zerstören der Arena, um den gesamten Block sauber freizugeben.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Binde deinen Arena-Allokator in die Hauptdatei ein und teste seine Funktionalität mit einer Vielzahl von Objekten. Vergleiche die Laufzeit deiner Arena mit der standardmäßigen Einzelallokation von Objekten auf dem Heap.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 82. Speicherleck-Detektor (Memory Leak Detector)

**Hintergrund:**
Obwohl Rusts Ownership-Modell Speicherlecks weitgehend verhindert, können durch zyklische Referenzen mit Referenzzählern dennoch Lecks entstehen. Ein benutzerdefinierter Speicherleck-Detektor hilft dir dabei, vergessene oder zirkulär gehaltene Heap-Objekte beim Programmende aufzuspüren.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle eine Wrapper-Struktur um einen Smart-Pointer deiner Wahl sowie eine globale oder thread-lokale Statistik-Struktur, die die Anzahl der aktiven und freigegebenen Objekte zählt.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere die Dereferenzierungs-Traits, damit sich dein Wrapper wie das zugrundeliegende Objekt verhält. Überschreibe das Drop-Trait so, dass es bei der Zerstörung des Wrappers den Zähler der aktiven Objekte verringert und eventuelle Warnungen ausgibt.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein Testprogramm, das absichtlich zyklische Abhängigkeiten erzeugt, um Speicherlecks zu provozieren. Gib beim Beenden des Programms eine Übersicht über die verbliebenen, nicht freigegebenen Objekte aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 83. Eigener Smart-Pointer (Custom Box)

**Hintergrund:**
Die Standard-Box ist der einfachste Smart Pointer in Rust. Um zu verstehen, wie sie intern funktioniert, baust du deine eigene Version, die direkt mit rohen Zeigern und manuellem Speichermanagement auf dem Heap arbeitet.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine generische Smart-Pointer-Struktur, die intern einen rohen Zeiger auf den Heap-Speicher hält. Achte darauf, wie Rusts Compiler über die Varianz und Ownership dieses Zeigers informiert wird.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere einen Konstruktor, der den Wert auf dem Heap anlegt und den Zeiger speichert. Setze die Schnittstellen für die Dereferenzierung um, um den Zugriff auf den Wert zu ermöglichen, und kümmere dich im Drop-Trait um die manuelle Freigabe des belegten Speichers.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der Hauptdatei Testfälle, die deinen Smart-Pointer mit verschiedenen Datentypen instanziieren, Werte verändern und demonstrieren, dass beim Verlassen des Gültigkeitsbereichs kein Speicher verloren geht.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 84. Referenz-Zählungs-Pointer von Hand gebaut

**Hintergrund:**
Ein Referenzzähler-Pointer ermöglicht es mehreren Besitzern, dieselben schreibgeschützten Daten auf dem Heap zu teilen. Indem du diese Struktur selbst implementierst, durchdringst du das Prinzip hinter dem automatischen Freigeben von geteiltem Speicher.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere das Speicherlayout auf dem Heap, das sowohl den eigentlichen Wert als auch den aktuellen Zählerstand speichert. Definiere die Smart-Pointer-Struktur selbst, die auf diesen geteilten Heap-Block zeigt.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere die Logik für das Klonen, bei der lediglich der Referenzzähler erhöht wird, ohne die Daten zu duplizieren. Implementiere die Freigabelogik im Drop-Trait, die den Zähler dekrementiert und den Heap-Speicher erst dann freigibt, wenn der Zähler Null erreicht.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Demonstriere in deiner main-Funktion das Verhalten deines Pointers, indem du ihn mehrfach klonst, in verschiedenen Scopes verwendest und den Zählerstand sowie die Freigabe auf der Konsole ausgibst.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 85. Copy-on-Write (Cow) Nachbau

**Hintergrund:**
Das Copy-on-Write-Muster spart Zeit und Speicher, indem es Daten so lange wie möglich als unveränderliche Referenz teilt und erst dann eine echte Kopie auf dem Heap anfertigt, wenn eine Modifikation erforderlich wird.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Enum-Struktur, die entweder eine geliehene Referenz auf Daten oder einen eigenen, besessenen Wert auf dem Heap repräsentiert.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden für den schreibgeschützten Zugriff. Schreibe eine Methode zur veränderbaren Ausleihe, die prüft, ob die Daten bereits besessen werden – falls nicht, klone sie auf den Heap und wechsle den Zustand des Enums, bevor du die veränderbare Referenz zurückgibst.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein interaktives Konsolenprogramm, das Text verarbeitet. Zeige dem Benutzer an, wann Daten nur gelesen werden (keine Heap-Kopie) und in welchem Moment durch eine Änderung eine echte Kopie ausgelöst wird.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 86. Self-Referential Structs (Selbstreferenzierende Strukturen)

**Hintergrund:**
Strukturen, die Zeiger auf ihre eigenen Felder enthalten, sind in Rust ein bekanntes Problem, da das Verschieben der Struktur im Speicher die internen Zeiger ungültig machen würde. Mit Pin lernst du das offizielle Werkzeug kennen, um solche Datenstrukturen an eine feste Speicheradresse zu binden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf eine Struktur, die ein Datenfeld und ein zweites Feld mit einem rohen Zeiger auf das erste Feld besitzt. Überlege dir, wie du verhinderst, dass diese Struktur verschoben werden kann.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine sichere Schnittstelle zur Initialisierung der Struktur unter Verwendung des Pin-Konzepts. Kapsle die unsicheren Zeigeroperationen und stelle Methoden bereit, die den selbstreferenzierenden Zustand sicher auslesen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein Hauptprogramm, das versucht, die Struktur zu verschieben, und demonstriere, wie das Pin-Konzept die Speichersicherheit gewährleistet. Führe einen Testlauf durch, der die Zeiger-Konsistenz validiert.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 87. Sicherer Wrapper um Unsafe Raw Pointer

**Hintergrund:**
Bei der hardwarenahen Programmierung oder bei der Interaktion mit anderen Sprachen (FFI) kommt man an rohen Zeigern nicht vorbei. Damit dein restlicher Rust-Code fehlerfrei bleibt, kapselst du diese Zeiger in einer absolut sicheren und idiomatischen API-Schnittstelle.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Erstelle ein Struct, das einen rohen konstanten oder veränderlichen Zeiger speichert. Achte darauf, wie du die Zugriffsrechte nach außen einschränkst.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Schreibe sichere Kapselungsmethoden, die Lese- und Schreibvorgänge über den rohen Zeiger ausführen. Verwende unsafe-Blöcke nur intern und stelle sicher, dass alle Rust-Sicherheitsgarantien (wie Gültigkeit des Zeigers und Daten-Races-Schutz) eingehalten werden.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere in der main.rs einen Speicherpuffer, greife über deinen Wrapper darauf zu und teste, wie deine API auf ungültige Speicherzugriffe oder Grenzüberschreitungen reagiert.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 88. Ringpuffer mit Shared Memory

**Hintergrund:**
Ein Ringpuffer ist eine hocheffiziente Datenstruktur für Warteschlangen, da er Elemente in einem kreisförmigen Heap-Array verwaltet, ohne dass beim Einfügen oder Entfernen Daten im Speicher verschoben werden müssen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Ringpuffer-Struktur mit einem fest alloziierten Heap-Array sowie Zeigern (oder Indizes) für das Lese- und Schreibende.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Hinzufügen und Auslesen von Elementen. Berücksichtige die Fälle, in denen der Puffer voll oder leer ist, und entscheide dich für ein Verhalten (z.B. Blockieren oder Überschreiben).
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Gestalte ein einfaches CLI-Menü, mit dem der Benutzer Elemente in den Puffer schreiben und daraus lesen kann. Visualisiere den Füllstand und die Positionen der Lese- und Schreibzeiger im Speicher.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 89. B-Baum-Knoten-Speicherverwaltung

**Hintergrund:**
B-Bäume eignen sich hervorragend für Datenbanksysteme, da ihre Knoten mehrere Elemente speichern und so die Tiefe des Baumes minimieren. Die Speicherverwaltung muss hierbei das dynamische Aufteilen und Verschieben von Schlüsseln und Werten effizient lösen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere die Struktur eines B-Baum-Knotens, der Listen von Schlüsseln, Werten und optionalen Zeigern auf Kindknoten enthält. Achte darauf, dass die Knoten eine dynamische Größe haben.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Einfügen von Schlüsseln in einen Knoten und schreibe die Logik, um einen überfüllten Knoten in zwei Hälften aufzuspalten und den Median-Schlüssel an den Elternknoten hochzureichen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle eine Benutzeroberfläche auf der Kommandozeile, die es dir erlaubt, Schlüssel einzufügen, und die den B-Baum nach jedem Schritt strukturiert auf der Konsole ausgibt.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 90. Garbage Collection Simulator

**Hintergrund:**
Rust nutzt standardmäßig RAII und Ownership zur Speicherverwaltung. Um zu verstehen, wie andere Sprachen (wie Java oder Go) arbeiten, baust du einen kleinen Simulator für einen Mark-and-Sweep Garbage Collector.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere ein System von Objekten auf dem Heap, die aufeinander verweisen können (ein gerichteter Graph), sowie die Menge der direkt erreichbaren Objekte (die Root-Menge).
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere den Garbage Collection Algorithmus in zwei Phasen: In der Mark-Phase markierst du alle von den Roots aus erreichbaren Objekte. In der Sweep-Phase durchläufst du den gesamten Heap und gibst alle nicht markierten Objekte wieder frei.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle in der main.rs ein komplexes Szenario mit verknüpften Objekten, entferne einige Root-Referenzen, starte die Garbage Collection manuell und verifiziere die Freigaben anhand von Konsolenausgaben.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 91. Flyweight-Entwurfsmuster (Flyweight Pattern)

**Hintergrund:**
Wenn du eine riesige Anzahl von Objekten im Speicher halten musst, kann der RAM-Bedarf explodieren. Mit dem Flyweight-Muster trennst du die intrinsischen, unveränderlichen Daten (z.B. Grafik-Bitmaps) von den extrinsischen Daten (z.B. Bildschirm-Koordinaten) und teilst erstere unter allen Instanzen auf.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Struktur für das geteilte, schwere Objekt und die Struktur für das leichte Kontextobjekt. Überlege dir, wie du den Zugriff auf das schwere Objekt über Smart Pointer organisierst, um Speicherduplizierung zu vermeiden.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere eine Factory-Struktur, die sicherstellt, dass jedes schwere Objekt nur einmal im Speicher alloziiert wird und bei Bedarf geteilte Referenzen darauf verteilt. Kapsle den Erstellungsprozess.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe eine Simulation, die Millionen von Zeichen oder Partikeln im Speicher anlegt. Vergleiche den RAM-Verbrauch deines Programms mit und ohne Verwendung des Flyweight-Musters.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 92. Dynamische Speicher-Defragmentierung

**Hintergrund:**
In Umgebungen mit begrenztem Speicher führt ständiges Allozieren und Freigeben zu einer Fragmentierung des Heaps. Durch eine Defragmentierung verschiebst du belegte Blöcke so, dass wieder ein großer zusammenhängender freier Speicherbereich entsteht.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere einen zusammenhängenden Speicherblock (z.B. einen großen Byte-Vektor) sowie eine Tabelle von indirekten Zeigern (Handles), über die auf die tatsächlichen Daten zugegriffen werden muss, um Verschiebungen zu ermöglichen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere den Verschiebungs- und Defragmentierungs-Algorithmus. Achte penibel darauf, dass beim Verschieben eines Speicherblocks im Byte-Vektor die entsprechenden Handles aktualisiert werden, damit keine ungültigen Zeiger (Dangling Pointers) entstehen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Programmiere eine CLI-Visualisierung, die den Zustand des simulierten Speichers grafisch auf der Konsole darstellt. Zeige den Zustand vor, während und nach einer Defragmentierung.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 93. Speicher-Profiler für Allocations

**Hintergrund:**
Um Speicherengpässe oder versteckte Heap-Allokationen in zeitkritischen Anwendungen zu finden, ist ein eigener Speicher-Profiler Gold wert. In Rust kannst du den globalen Allokator abfangen (hooken), um jede Allokation und Deallokation in Echtzeit zu überwachen.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Struktur, die den Systemallokator kapselt und Statistiken (z.B. allozierte Bytes, Anzahl der Allokationen) in einem thread-sicheren Zustand verwaltet.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere das Trait für globale Allokatoren der Standardbibliothek. Achte darauf, dass du innerhalb der Profiling-Methoden keine Operationen ausführst, die ihrerseits wieder den Heap beanspruchen, da dies zu einer Endlosrekursion führen würde.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Registriere deinen Profiler als globalen Allokator. Schreibe Testfunktionen, die typische Operationen ausführen (z.B. Vektoren vergrößern) und gib die Live-Statistiken auf der Konsole aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 94. Sparsely Populated Matrix (Dünnbesetzte Matrix)

**Hintergrund:**
Riesige Matrizen, bei denen die allermeisten Einträge Null sind, verschwenden bei herkömmlicher Speicherung enorm viel RAM. Eine dünnbesetzte Matrix alloziiert nur die Zellen auf dem Heap, die tatsächlich Werte ungleich Null enthalten.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf die speichersparende Repräsentation der Matrix auf dem Heap, zum Beispiel durch eine Schlüssel-Wert-Struktur mit Zeilen- und Spaltenindizes oder ein komprimiertes Zeilenformat.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Setzen und Auslesen von Werten. Wenn ein Wert auf Null gesetzt wird, muss der entsprechende Heap-Speicher freigegeben werden. Implementiere grundlegende mathematische Operationen wie die Matrix-Multiplikation.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein CLI, über das der Benutzer Werte eingeben und operationen ausführen kann. Stelle eine Gegenüberstellung des Speicherbedarfs deiner Matrix im Vergleich zu einer Standard-Matrix dar.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 95. Thread-lokaler Objektspeicher (Thread-local Storage)

**Hintergrund:**
Das Teilen von veränderlichen Daten über Threads hinweg erfordert meist langsame Synchronisationsmechanismen wie Mutexe. Mit Thread-lokalem Speicher gibst du jedem Thread eine eigene, unabhängige Kopie einer Variablen, wodurch Sperren komplett überflüssig werden.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Datenstruktur, die im Thread-lokalen Speicher abgelegt werden soll, sowie die Kapselung für eventuelle Interior Mutability, da Thread-lokaler Speicher standardmäßig schreibgeschützt zugänglich ist.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Schreibe Zugriffsmethoden, die sicherstellen, dass Threads nur auf ihre eigene Instanz zugreifen können. Implementiere die Logik zur Zusammenführung (Konsolidierung) der thread-lokalen Daten am Ende eines Arbeitsdurchlaufs.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Simuliere ein Multi-Thread-Szenario, bei dem mehrere Worker-Threads parallel Statistiken sammeln (z.B. Anzahl verarbeiteter Zeilen). Konsolidiere die Ergebnisse im Hauptthread und gib sie aus.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 96. Sichere API für Shared Memory (IPC)

**Hintergrund:**
Shared Memory ist der schnellste Weg für Interprozesskommunikation, birgt aber das Risiko von undefiniertem Verhalten und Speicherfehlern, wenn Prozesse gleichzeitig schreiben. Eine sichere Kapselung in Rust verhindert diese Gefahren zur Compilezeit.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere die Schnittstelle zu einem gemeinsam genutzten Speicherbereich (z.B. einer Shared-Memory-Datei) und die Kontrollstrukturen für den synchronisierten Zugriff.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Kapsle den unsafe-Zugriff auf den Shared-Memory-Bereich in sicheren Methoden für das Lesen und Schreiben. Implementiere Synchronisationsmechanismen wie Locks oder atomare Zustandsflags, um Daten-Races auszuschließen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle zwei simulierte Prozesse (Threads), die über deine sichere Shared-Memory-Schnittstelle Daten austauschen, und fange mögliche Verbindungs- oder Synchronisationsfehler sauber ab.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 97. Slices von Heap-Strukturen

**Hintergrund:**
Beim Arbeiten mit großen Datenmengen, die in Smart Pointern (wie Boxen) auf dem Heap liegen, möchte man oft nur Teilbereiche an Funktionen übergeben. Hier lernst du, wie du performant und ohne Kopiervorgänge Slices von Heap-Referenzen erzeugst und verwaltest.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere eine Datenstruktur, die eine Sammlung von Heap-alloziierten Objekten verwaltet, und überlege dir, wie das Speicherlayout eines Vektors von Boxen im Vergleich zu einem Slice aussehen muss.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden, die Teilbereiche der Struktur als Slices von Referenzen zurückgeben. Nutze explizite Lifetimes, um zu garantieren, dass die zurückgegebenen Slices nicht länger existieren als die zugrundeliegende Heap-Struktur.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Schreibe ein Hauptprogramm, das einen großen Datensatz lädt, Filterungen vornimmt, Teilausschnitte davon an Verarbeitungsfunktionen übergibt und die Speichereffizienz misst.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 98. Manuelles Speicher-Layouting mit Layout

**Hintergrund:**
In manchen Low-Level-Szenarien oder beim Bau eigener komplexer Datenstrukturen reicht die automatische Speicherverwaltung nicht aus. Du forderst direkt rohen Speicher mit einer exakt definierten Ausrichtung (Alignment) an und verwaltest diesen manuell.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Entwirf ein Struct, das keine direkten Rust-Typen, sondern ein manuell festgelegtes Speicherlayout (Größe, Alignment) repräsentiert, und bestimme, wie der rohe Heap-Speicher alloziiert werden soll.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Schreibe Methoden zur Initialisierung von Werten an bestimmten Offsets im alloziierten Speicherbereich. Implementiere das Drop-Trait, um den Speicher explizit wieder freizugeben und vorher die Destruktoren der enthaltenen Objekte manuell aufzurufen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Baue ein Testprogramm in main.rs, das dynamisch Strukturen unterschiedlicher Größe im manuellen Layout anlegt, Werte modifiziert und die korrekte Freigabe aller Ressourcen validiert.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 99. LRU-Cache (Least Recently Used) auf dem Heap

**Hintergrund:**
Ein LRU-Cache speichert eine begrenzte Anzahl von Elementen und verwirft automatisch die am längsten nicht mehr verwendeten Einträge, wenn die Kapazität überschritten wird. Dies erfordert eine clevere Kombination von Heap-Strukturen für schnellen Zugriff und Reihenfolge-Tracking.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Modelliere das Zusammenspiel einer Map für den schnellen Direktzugriff und einer doppelt verketteten Liste zur Nachverfolgung der Reihenfolge. Überlege dir, wie du die Elemente auf dem Heap verknüpfst.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Einfügen und Abfragen von Schlüssel-Wert-Paaren. Jede Abfrage muss das Element in der Liste an die Spitze der Aktualität verschieben. Beim Überschreiten der Kapazität muss das älteste Element aus beiden Strukturen entfernt werden.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Erstelle eine interaktive CLI-Anwendung, bei der der Benutzer Einträge hinzufügen und abfragen kann. Visualisiere den aktuellen Cache-Inhalt und markiere Treffer (Hits) und Fehlversuche (Misses).
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?

---

### 100. Graph-Datenbank im Speicher

**Hintergrund:**
Graphen sind hochgradig vernetzt und weisen oft zirkuläre Beziehungen auf. Um eine speichersichere und veränderbare Graph-Datenbank im RAM abzubilden, müssen verschiedene Smart Pointer präzise ineinandergreifen, um Speicherzyklen zu verhindern.

#### Modul 1: Basis-Datenstrukturen
* **Ziel:** Definiere die Datenstrukturen für Knoten und Kanten des Graphen. Überlege dir, wie du den veränderbaren Zugriff auf geteilte Knoten ermöglichst und wie du verhinderst, dass sich Kanten gegenseitig blockieren oder Speicherlecks verursachen.
* **Schlüsselfragen für dich:**
  - Wie sieht das Speicherlayout aus?
  - Welche Smart Pointer, rohe Zeiger, Pin oder Alloc-Strukturen sind notwendig und warum?
  - Welche Felder müssen öffentlich (pub) sein?

#### Modul 2: Implementierung & Methoden
* **Ziel:** Implementiere Methoden zum Hinzufügen von Knoten, zum Verknüpfen über gerichtete oder ungerichtete Kanten sowie Methoden zur Wegsuche (Traversierung). Achte beim Löschen eines Knotens darauf, alle verknüpften Kanten rückstandslos zu entfernen.
* **Schlüsselfragen für dich:**
  - Welche Methoden müssen implementiert werden?
  - Wie greifst du auf den inneren Zustand zu?
  - Wie stellst du sicher, dass die Ownership-Regeln eingehalten werden?

#### Modul 3: Vollendung & Hauptprogramm
* **Ziel:** Programmiere eine CLI-Schnittstelle zur Interaktion mit deiner Graph-Datenbank. Ermögliche das Anlegen von Entitäten (z.B. Personen) und Beziehungen (z.B. Freundschaften) sowie die Abfrage von Verbindungswegen über die Konsole.
* **Schlüsselfragen für dich:**
  - Wie sieht das User-Interface (CLI) aus?
  - Wie fängst du potenzielle Fehler ab?
  - Wie sieht ein Test-Durchlauf in main() aus?
