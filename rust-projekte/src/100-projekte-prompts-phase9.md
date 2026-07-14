# 100 Projekte - Unsafe & FFI Prompts

Hier findest du für jedes der 100 Projekte aus Phase 9 jeweils genau drei modulare Präzisions-Prompts zur didaktischen Begleitung.

---

# Phase 9: Rohe Zeiger & Speicher-Tricks (Teil 1) - Projekte 1 bis 20

Dieses Dokument enthält jeweils genau drei modulare Präzisions-Prompts für die ersten 20 Projekte der Phase 9. Die Prompts sind didaktisch aufgebaut, verzichten auf fertige Codelösungen und leiten dich Schritt für Schritt an.

---

## Projekt 1: Speicheradresse anzeigen
*Ziel: Nimm eine normale Ganzzahl-Variable und gib ihre Adresse über einen unveränderlichen rohen Zeiger (`*const T`) aus.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle eine einfache Ganzzahl-Variable (z. B. vom Typ `i32`) und überlege dir, wie du einen unveränderlichen rohen Zeiger (`*const i32`) auf diese Variable erstellst. Wie sieht das Speicherlayout aus, wenn eine Referenz zu einem rohen Zeiger gecastet wird?
*   **Modul 2: Implementierung & Methoden**
    Finde heraus, wie du die Adresse des Zeigers ausgeben kannst. Benötigt das bloße Erstellen oder das Formatieren der Zeigeradresse einen `unsafe`-Block? Nutze den Format-Spezifizierer `{:p}` in Rust, um den Zeiger als hexadezimale Speicheradresse darzustellen.
*   **Modul 3: Vollendung & Hauptprogramm**
    Integriere die Datenstruktur und die Ausgabe in deine `main.rs`. Verifiziere das Ergebnis, indem du die Adresse ausgibst und erklärst, warum der Compiler für das reine Ausgeben des Zeigers (ohne Dereferenzierung) keine `unsafe`-Garantien verlangt.

---

## Projekt 2: Wert über Zeiger verändern
*Ziel: Erstelle einen veränderlichen rohen Zeiger (`*mut T`) auf eine Variable und überschreibe deren Wert in einem unsafe-Block.*

*   **Modul 1: Basis-Datenstrukturen**
    Definiere eine veränderliche Ganzzahl-Variable und erstelle einen veränderlichen rohen Zeiger (`*mut i32`) auf diese Variable. Was musst du beim Erstellen beachten, damit der Compiler die Veränderbarkeit des darunterliegenden Werts erlaubt?
*   **Modul 2: Implementierung & Methoden**
    Implementiere den Schreibzugriff über den rohen Zeiger. Nutze dafür einen `unsafe`-Block und dereferenziere den Zeiger (`*zeiger = neuer_wert`), um den Wert direkt im Speicher zu überschreiben. Welche Sicherheitsgarantien gibst du dem Compiler in diesem Moment manuell?
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe das Hauptprogramm in `main.rs`, das den Wert vor und nach der Änderung ausgibt. Teste, ob der ursprüngliche Variablenwert tatsächlich überschrieben wurde, und stelle sicher, dass keine Aliasing-Regeln von Rust während des sicheren Lesezugriffs verletzt werden.

---

## Projekt 3: Zeiger-Arithmetik mit Arrays
*Ziel: Navigiere durch ein Array von Ganzzahlen, indem du den Startzeiger nimmst und mit den Methoden offset oder add weiterrechnest.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle ein Array mit mehreren Ganzzahlen. Wie liegt ein solches Array im Speicher (Layout, Kontiguität, Ausrichtung)? Deklariere einen rohen Zeiger, der auf das erste Element des Arrays zeigt.
*   **Modul 2: Implementierung & Methoden**
    Nutze Zeiger-Arithmetik, um auf das zweite und dritte Element zuzugreifen. Verwende dazu die Methoden `add` oder `offset` auf dem rohen Zeiger innerhalb eines `unsafe`-Blocks. Was ist der Unterschied zwischen `add` und `offset`, und warum müssen diese Operationen `unsafe` sein?
*   **Modul 3: Vollendung & Hauptprogramm**
    Bilde das Hauptprogramm ab, das das Array und den Startzeiger anlegt, per Zeiger-Arithmetik durch das Array wandert, die Werte ausliest und ausgibt. Stelle sicher, dass du nicht über die Grenzen des Arrays hinausliest (Out-of-Bounds), da dies undefiniertes Verhalten (Undefined Behavior) hervorrufen würde.

---

## Projekt 4: Nullzeiger-Prüfung
*Ziel: Initialisiere einen rohen Zeiger mit std::ptr::null() und schreibe eine Prüfung, ob dieser sicher dereferenziert werden kann.*

*   **Modul 1: Basis-Datenstrukturen**
    Initialisiere einen unveränderlichen Nullzeiger mithilfe von `std::ptr::null::<i32>()`. Was unterscheidet diesen Zeiger im Speicherlayout von einer normalen Rust-Referenz `&T` oder Option-gekapselten Referenz `Option<&T>`?
*   **Modul 2: Implementierung & Methoden**
    Implementiere eine Sicherheitsprüfung. Verwende die Methode `is_null()`, um zu überprüfen, ob der Zeiger null ist. Versuche nur dann, den Zeiger in einem `unsafe`-Block zu dereferenzieren, wenn er *nicht* null ist. Wie verhinderst du einen Absturz oder undefiniertes Verhalten?
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe deine `main`-Funktion, die sowohl einen Nullzeiger als auch einen gültigen Zeiger auf eine Variable anlegt. Führe für beide die Prüfung durch und gib entsprechende Meldungen aus. Teste das Verhalten und stelle sicher, dass niemals ein Nullzeiger dereferenziert wird.

---

## Projekt 5: Transmutieren von primitiven Typen
*Ziel: Nutze std::mem::transmute, um ein Array von vier u8-Werten direkt in eine einzelne u32-Zahl umzuinterpretieren.*

*   **Modul 1: Basis-Datenstrukturen**
    Definiere ein Array aus genau vier `u8`-Werten. Achte auf die Größe und Ausrichtung (Alignment) dieses Arrays im Vergleich zu einer einzelnen `u32`-Ganzzahl. Warum ist die Bytereihenfolge (Endianness) deines Systems entscheidend für das Endergebnis?
*   **Modul 2: Implementierung & Methoden**
    Verwende `std::mem::transmute` in einem `unsafe`-Block, um die vier `u8`-Bytes bitweise in ein `u32` umzuwandeln. Welche Zusicherungen bezüglich der Größe (`size_of`) müssen die beiden Typen erfüllen, damit `transmute` überhaupt kompiliert?
*   **Modul 3: Vollendung & Hauptprogramm**
    Erstelle das Hauptprogramm in `main.rs`, führe die Transmutation durch und gib das Ergebnis sowohl als `u32` als auch hexadezimal aus. Schreibe einen Test, der das Ergebnis unter Berücksichtigung der System-Endianness (`u32::from_ne_bytes` oder `to_ne_bytes`) validiert.

---

## Projekt 6: Manuelle Speicherallokation
*Ziel: Verwende std::alloc::alloc und std::alloc::Layout, um Speicher für eine Ganzzahl auf dem Heap manuell anzufordern und wieder freizugeben.*

*   **Modul 1: Basis-Datenstrukturen**
    Wie wird Speicher in Rust manuell definiert? Nutze `std::alloc::Layout`, um das Layout (Größe und Ausrichtung) für einen `i32`-Wert zu beschreiben. Welche Rolle spielt die Ausrichtung (`align`) bei der Speicherallokation?
*   **Modul 2: Implementierung & Methoden**
    Allokiere den Speicher mithilfe von `std::alloc::alloc` und dem erstellten Layout. Achte darauf, das Ergebnis (einen rohen Zeiger `*mut u8`) auf Gültigkeit zu prüfen (kein Nullzeiger). Schreibe den Wert in den allokierten Speicher und gib ihn später mit `std::alloc::dealloc` wieder frei.
*   **Modul 3: Vollendung & Hauptprogramm**
    Baue das vollständige Programm in `main.rs`. Implementiere ein sauberes Exception- bzw. Fehlerhandling für den Fall, dass die Allokation fehlschlägt. Stelle sicher, dass der Speicher in jedem Ausführungspfad wieder freigegeben wird, um Memory Leaks zu vermeiden.

---

## Projekt 7: Auslesen nicht ausgerichteter Daten
*Ziel: Lies mit std::ptr::read_unaligned einen Wert aus einem Bytestrom, der nicht an den natürlichen Speichergrenzen ausgerichtet ist.*

*   **Modul 1: Basis-Datenstrukturen**
    Definiere ein Byte-Array (`[u8; 5]`). Wenn du ab dem Index 1 eine `u32`-Zahl (4 Bytes) lesen möchtest, ist diese Adresse im Speicher in der Regel nicht an einer 4-Byte-Grenze ausgerichtet (unaligned). Warum führt ein normaler Zeiger-Zugriff hier auf manchen Architekturen zum Absturz oder zu Performance-Einbußen?
*   **Modul 2: Implementierung & Methoden**
    Erstelle einen rohen Zeiger auf die nicht ausgerichtete Startadresse im Byte-Array. Verwende `std::ptr::read_unaligned` innerhalb eines `unsafe`-Blocks, um den Wert sicher als `u32` zu lesen. Wie unterscheidet sich diese Funktion intern von einer normalen Dereferenzierung?
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe die `main.rs`, befülle das Byte-Array mit Testwerten, lies die unaligned Daten aus und gib sie aus. Teste das Programm und stelle sicher, dass du keine Out-of-Bounds-Zugriffe auf das Array machst.

---

## Projekt 8: Schreiben nicht ausgerichteter Daten
*Ziel: Verwende std::ptr::write_unaligned, um Werte in ein Byte-Array an beliebigen Positionen zu schreiben, ohne Ausrichtungsfehler (Alignment-Fehler) zu riskieren.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle ein Byte-Array mit ausreichender Größe (z. B. `[u8; 8]`). Überlege dir, an welchem Offset du eine `u32`-Zahl schreiben möchtest, sodass sie nicht-ausgerichtet (unaligned) positioniert ist.
*   **Modul 2: Implementierung & Methoden**
    Berechne den Ziel-Zeiger für den Schreibvorgang. Verwende `std::ptr::write_unaligned` in einem `unsafe`-Block, um den `u32`-Wert an diese Adresse zu schreiben. Welche Gefahren von unaligned-Writes auf CPU-Ebene fängt diese Funktion für dich ab?
*   **Modul 3: Vollendung & Hauptprogramm**
    Erstelle das Hauptprogramm, führe den Schreibvorgang durch und gib das resultierende Byte-Array aus, um zu überprüfen, ob die Bytes an den richtigen Positionen gelandet sind. Stelle sicher, dass das Array groß genug ist, um den geschriebenen Typ komplett aufzunehmen.

---

## Projekt 9: Zeiger-Vergleiche
*Ziel: Erstelle zwei unterschiedliche Zeiger auf dasselbe Objekt und vergleiche ihre Adressen direkt miteinander.*

*   **Modul 1: Basis-Datenstrukturen**
    Deklariere eine Variable. Erstelle zwei getrennte rohe Zeiger auf diese Variable (z. B. einen über eine direkte Referenz und einen über einen Cast). Besitzen beide Zeiger dieselbe Zieladresse im Speicherlayout?
*   **Modul 2: Implementierung & Methoden**
    Finde heraus, wie man zwei rohe Zeiger vergleicht. Kannst du die Operatoren `==` und `!=` direkt auf rohen Zeigern anwenden, oder musst du sie vorher in Zahlen casten? Benötigt dieser Vergleich einen `unsafe`-Block?
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe ein Programm in `main.rs`, das die Adressen vergleicht und das Ergebnis ausgibt. Erstelle zusätzlich ein zweites Objekt und zeige, dass der Vergleich der Zeiger auf unterschiedliche Objekte wie erwartet `false` ergibt.

---

## Projekt 10: Größe und Ausrichtung ermitteln
*Ziel: Nutze std::mem::size_of und std::mem::align_of für verschiedene selbstdefinierte Strukturen.*

*   **Modul 1: Basis-Datenstrukturen**
    Definiere mehrere Structs mit unterschiedlichen Layouts: eines mit `#[repr(C)]`, eines im Standard-Rust-Layout und eines mit gemischten Datentypen (z. B. `u8`, `u32`, `u64`). Wie beeinflusst Padding die Größe und das Alignment im Speicher?
*   **Modul 2: Implementierung & Methoden**
    Verwende `std::mem::size_of::<T>()` und `std::mem::align_of::<T>()`, um die Größe und das minimale Alignment deiner Structs zur Laufzeit zu ermitteln. Benötigen diese Funktionen `unsafe`-Blöcke?
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe die `main.rs`, welche die ermittelten Werte für alle Strukturen tabellarisch ausgibt. Analysiere das Ergebnis und erkläre, wie der Compiler durch Padding die Ausrichtungsregeln der CPU einhält.

---

## Projekt 11: Dangling-Zeiger-Szenario
*Ziel: Erstelle einen Zeiger auf eine lokale Variable, die am Ende eines inneren Scopes zerstört wird, und gib danach seine Adresse aus.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle einen äußeren Scope und eine Zeiger-Variable (z. B. vom Typ `*const i32`), die anfänglich auf einen Dummy-Wert oder Null zeigt. Erstelle einen inneren Scope, in dem du eine lokale Variable deklarierst. Wie verhält sich die Lebensdauer (Lifetime) dieser lokalen Variable?
*   **Modul 2: Implementierung & Methoden**
    Weise dem äußeren Zeiger im inneren Scope die Adresse der lokalen Variable zu. Nach dem Ende des inneren Scopes ist der Zeiger "dangling" (er zeigt auf freigegebenen Stack-Speicher). Gib die Adresse des Zeigers aus. Warum darfst du diesen Zeiger nun unter keinen Umständen dereferenzieren?
*   **Modul 3: Vollendung & Hauptprogramm**
    Implementiere dieses Szenario in `main.rs`. Zeige auf, wie der Compiler dich davor schützt, solche Dangling-Zeiger in sicherem Rust zu verwenden, und warum das bloße Ausgeben der Adresse (ohne Dereferenzierung) dennoch kompiliert.

---

## Projekt 12: Speicher kopieren mit copy_nonoverlapping
*Ziel: Kopiere den Inhalt eines Speicherbereichs direkt in einen anderen mit std::ptr::copy_nonoverlapping.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle zwei separate Arrays vom gleichen Typ und gleicher Größe (z. B. `[i32; 5]`), die im Speicher an völlig unterschiedlichen Orten liegen (non-overlapping).
*   **Modul 2: Implementierung & Methoden**
    Erstelle Quell- und Zielzeiger. Nutze `std::ptr::copy_nonoverlapping` in einem `unsafe`-Block, um die Elemente des Quell-Arrays in das Ziel-Array zu kopieren. Welche Argumente erwartet die Funktion, und in welcher Einheit wird die Anzahl der zu kopierenden Elemente angegeben (Bytes oder Elementanzahl `count`)?
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe das Hauptprogramm, führe den Kopiervorgang aus und gib das Ziel-Array aus. Stelle sicher, dass die Quell- und Zielbereiche sich wirklich nicht überlappen, um undefiniertes Verhalten zu vermeiden.

---

## Projekt 13: Speicher kopieren mit Überlappung
*Ziel: Verwende std::ptr::copy für zwei sich überschneidende Bereiche eines Arrays.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle ein einzelnes, größeres Array (z. B. `[i32; 10]`). Definiere zwei sich überlappende Bereiche innerhalb dieses Arrays (z. B. Quelle ab Index 0, Ziel ab Index 2). Warum ist `copy_nonoverlapping` hier ungeeignet?
*   **Modul 2: Implementierung & Methoden**
    Berechne die Quell- und Zielzeiger auf dieselbe Array-Struktur. Verwende `std::ptr::copy` (was dem C-Pendant `memmove` entspricht) in einem `unsafe`-Block, um die Daten sicher zu kopieren. Wie sorgt diese Funktion dafür, dass sich überlappende Daten nicht gegenseitig überschreiben, bevor sie gelesen wurden?
*   **Modul 3: Vollendung & Hauptprogramm**
    Erstelle die `main.rs`, führe den überlappenden Kopiervorgang aus und gib das Array vor und nach der Operation aus. Überprüfe die Korrektheit der kopierten Werte.

---

## Projekt 14: Zeiger aus einer Referenz casten
*Ziel: Nutze as *const _ und as *mut _, um sicher zwischen unveränderlichen und veränderlichen Zeigern zu casten.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle eine veränderliche Variable. Wie kannst du eine normale Rust-Referenz (`&T` bzw. `&mut T`) mithilfe des `as`-Schlüsselworts in rohe Zeiger (`*const T` bzw. `*mut T`) umwandeln?
*   **Modul 2: Implementierung & Methoden**
    Führe Casts zwischen den Zeigertypen durch: Caste einen `*const T` zu einem `*mut T` und umgekehrt. Welche Einschränkungen bezüglich der Sicherheit gelten, wenn du einen ursprünglich als unveränderlich deklarierten Speicherbereich über einen zu `*mut` gecasteten Zeiger veränderst?
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe das Hauptprogramm in `main.rs`, das diese Casts demonstriert. Verändere den Wert der Variablen über den gecasteten `*mut`-Zeiger und gib den Wert aus. Erkläre in Kommentaren, warum dieser Cast zwar sicher deklariert werden kann, die Dereferenzierung aber `unsafe` bleibt.

---

## Projekt 15: Initialisierung mit MaybeUninit
*Ziel: Lege ein Array mithilfe von std::mem::MaybeUninit an und initialisiere es Stück für Stück, bevor du es als initialisiert markierst.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle ein Array von nicht initialisiertem Speicher unter Verwendung von `std::mem::MaybeUninit`. Welchen Vorteil bietet `MaybeUninit` gegenüber dem alten `std::mem::uninitialized` bezüglich der Compiler-Optimierungen und der Vermeidung von undefiniertem Verhalten?
*   **Modul 2: Implementierung & Methoden**
    Initialisiere jedes Element des Arrays in einer Schleife. Nutze dafür die rohen Zeiger-Methoden (z. B. `as_mut_ptr` und `write`) von `MaybeUninit`. Wenn alle Elemente vollständig initialisiert sind, überführe das Array mit `MaybeUninit::assume_init` (einem `unsafe`-Aufruf) in ein voll initialisiertes normales Array.
*   **Modul 3: Vollendung & Hauptprogramm**
    Implementiere die Logik in `main.rs` und gib das initialisierte Array aus. Stelle sicher, dass du `assume_init` erst aufrufst, wenn absolut jedes Element des Speichers garantiert initialisiert ist.

---

## Projekt 16: Speicherbereich mit Nullen füllen
*Ziel: Verwende std::ptr::write_bytes, um ein Struct oder Array komplett mit Nullen oder einem anderen Byte-Wert zu überschreiben.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle eine Struktur oder ein Array mit Testdaten. Überlege dir, wie du den Zeiger auf diesen Speicherbereich ermittelst. Wie ist das Layout dieses Speichers aufgebaut?
*   **Modul 2: Implementierung & Methoden**
    Verwende `std::ptr::write_bytes` (entspricht `memset` in C) in einem `unsafe`-Block, um den Speicherbereich komplett mit einem bestimmten Byte (z. B. `0` oder `0xFF`) zu überschreiben. Welche Argumente nimmt diese Funktion entgegen, und wie berechnest du die Anzahl der zu überschreibenden Elemente (`count`)?
*   **Modul 3: Vollendung & Hauptprogramm**
    Erstelle das Hauptprogramm in `main.rs`, initialisiere die Daten, führe `write_bytes` aus und gib die Daten danach aus. Achte darauf, dass du keine Speicherbereiche außerhalb der Struktur überschreibst (Buffer Overflow).

---

## Projekt 17: Zeiger in Integer umwandeln
*Ziel: Caste einen rohen Zeiger in einen usize-Wert und gib diesen als Hexadezimalzahl aus.*

*   **Modul 1: Basis-Datenstrukturen**
    Erstelle eine Variable und einen rohen Zeiger auf diese Variable. Warum wird der Typ `usize` verwendet, um Speicheradressen plattformunabhängig als Ganzzahlen darzustellen?
*   **Modul 2: Implementierung & Methoden**
    Caste den rohen Zeiger mit `as usize` in eine Ganzzahl. Ist dieser Cast an sich eine `unsafe`-Operation? Gib die erhaltene Zahl mithilfe der hexadezimale Formatierung `{:x}` oder `{:X}` aus.
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe das Hauptprogramm, führe den Cast durch und gib das Ergebnis aus. Vergleiche die Ausgabe mit der Ausgabe des Zeigers über das `{:p}`-Format.

---

## Projekt 18: Integer in Zeiger umwandeln
*Ziel: Wandle eine konkrete Speicheradresse (als usize) zurück in einen rohen Zeiger um.*

*   **Modul 1: Basis-Datenstrukturen**
    Nimm eine zuvor ermittelte Speicheradresse (als `usize`). Überlege dir, wie das Speicherlayout aussieht, wenn eine bloße Zahl als Adresse interpretiert wird.
*   **Modul 2: Implementierung & Methoden**
    Caste den `usize`-Wert mit `as *const i32` (oder `as *mut i32`) zurück in einen rohen Zeiger. Warum ist dieser Cast an sich sicher, aber jede anschließende Dereferenzierung hochgradig `unsafe`?
*   **Modul 3: Vollendung & Hauptprogramm**
    Erstelle ein kurzes, kontrolliertes Szenario in `main.rs`, in dem du die adresse einer gültigen lokalen Variablen nimmst, sie in `usize` und wieder zurück in einen Zeiger castest, diesen dereferenzierst und den Wert verifizierst. Warum ist die Erstellung beliebiger Zeiger aus zufälligen Zahlen gefährlich?

---

## Projekt 19: Zeiger auf Funktionen
*Ziel: Deklariere einen Funktionszeiger auf eine einfache mathematische Funktion und rufe sie über diesen Zeiger auf.*

*   **Modul 1: Basis-Datenstrukturen**
    Definiere eine einfache Funktion (z. B. `fn addiere(a: i32, b: i32) -> i32`). Deklariere den Typ des Funktionszeigers in Rust (z. B. `fn(i32, i32) -> i32`). Wie unterscheiden sich Funktionszeiger von Closures im Speicherlayout?
*   **Modul 2: Implementierung & Methoden**
    Weise dem Funktionszeiger die Funktion zu. Rufe die Funktion über den Zeiger auf. Benötigt der Aufruf eines normalen Funktionszeigers in Rust einen `unsafe`-Block? (Hinweis: Unterscheide zwischen Rust-Funktionszeigern und `extern`-C-Funktionszeigern).
*   **Modul 3: Vollendung & Hauptprogramm**
    Implementiere die `main`-Funktion, weise verschiedene mathematische Funktionen demselben Funktionszeiger-Typ zu und rufe sie dynamisch auf. Gib die Ergebnisse aus.

---

## Projekt 20: Manuelles Drop mit std::ptr::drop_in_place
*Ziel: Zerstöre den Wert an einer Speicheradresse manuell mit drop_in_place, ohne den Speicher selbst freizugeben.*

*   **Modul 1: Basis-Datenstrukturen**
    Definiere ein Struct, das das `Drop`-Trait implementiert (z. B. mit einer Print-Ausgabe beim Löschen). Lege dieses Struct in einem Speicherbereich an (z. B. in einer manuell allokierten Heap-Struktur oder mithilfe von `MaybeUninit`).
*   **Modul 2: Implementierung & Methoden**
    Erstelle einen rohen veränderlichen Zeiger (`*mut T`) auf dieses Struct. Rufe `std::ptr::drop_in_place` auf diesem Zeiger in einem `unsafe`-Block auf. Was passiert mit den Ressourcen, die das Struct hält, und was passiert mit dem Speicher, in dem das Struct lag?
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe die `main.rs`, um das Verhalten zu testen. Zeige, dass der Destruktor (`drop`) genau einmal manuell ausgeführt wird. Stelle sicher, dass das Objekt danach nicht ein zweites Mal automatisch gedroppt wird (Double Free), was zu undefiniertem Verhalten führen würde.


# Phase 9: Unsafe Datenstrukturen (Teil 2) - Projekte 21 bis 40

Dieses Dokument enthält jeweils genau drei modulare Präzisions-Prompts für die Projekte 21 bis 40. Die Prompts richten sich an Anfänger (in der freundlichen "Du"-Form) und verzichten bewusst auf fertige Codelösungen, um das eigenständige Denken und Lernen zu fördern.

---

## Projekt 21: Einfache verkettete Liste (Singly Linked List)

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Erstelle die grundlegenden Datenstrukturen für eine einfach verkettete Liste (`SinglyLinkedList<T>`), die ohne sichere Smart Pointer wie `Box` oder `Rc` auskommt. Verwende stattdessen rohe Zeiger (`*mut Node<T>`).
1. Definiere ein privates Struct `Node<T>` mit den Feldern `value: T` und `next: *mut Node<T>`.
2. Definiere das öffentliche Struct `SinglyLinkedList<T>` mit den Feldern `head: *mut Node<T>` und `len: usize`.
3. Verwende `std::ptr::null_mut()`, um einen leeren Zeiger zu repräsentieren.
4. Erkläre kurz in einem Kommentar, warum wir hier `*mut Node<T>` statt `Option<Box<Node<T>>>` verwenden und wie sich dies auf die Speicherausrichtung (Alignment) auswirkt.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Kernoperationen für deine einfach verkettete Liste.
1. Schreibe eine `new`-Methode, die eine leere Liste initialisiert.
2. Implementiere `push_front(&mut self, item: T)`. Alloziere den neuen Knoten auf dem Heap, indem du `Box::new` verwendest und anschließend mit `Box::into_raw` in einen rohen Zeiger umwandelst. Verwende einen `unsafe`-Block, um den `next`-Zeiger des neuen Knotens auf den bisherigen `head` zu setzen.
3. Implementiere `pop_front(&mut self) -> Option<T>`. Verwende `unsafe`, um den `head`-Knoten zu dereferenzieren, lies den Wert mit `std::ptr::read` aus, biege den `head`-Zeiger auf den Nachfolger um und gib den Speicher des alten Knotens mit `Box::from_raw` frei.
4. Achte darauf, alle Randfälle (wie eine leere Liste) korrekt zu behandeln.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Vervollständige die Implementierung und stelle sicher, dass kein Speicher geleakt wird.
1. Implementiere das `Drop`-Trait für `SinglyLinkedList<T>`. Schreibe eine Schleife, die so lange `pop_front` aufruft, bis die Liste leer ist, um den gesamten dynamisch alloziierten Speicher sauber freizugeben.
2. Erstelle eine `main.rs`, in der du die Liste mit verschiedenen Elementen befüllst und wieder leerst.
3. Schreibe Tests, die das Verhalten bei mehreren Einfüge- und Löschoperationen überprüfen, und nutze (falls installiert) `cargo valgrind` oder Miri, um deine Implementierung auf Speicherlecks und undefiniertes Verhalten zu prüfen.

---

## Projekt 22: Doppelt verkettete Liste (Doubly Linked List)

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe die Datenstrukturen für eine doppelt verkettete Liste (`DoublyLinkedList<T>`), die rohe Zeiger für Vorwärts- und Rückwärtsverbindungen nutzt.
1. Definiere ein Struct `Node<T>` mit den Feldern `value: T`, `next: *mut Node<T>` und `prev: *mut Node<T>`.
2. Definiere das Struct `DoublyLinkedList<T>` mit den Feldern `head: *mut Node<T>`, `tail: *mut Node<T>` und `len: usize`.
3. Stelle sicher, dass die Strukturen mit `std::ptr::null_mut()` initialisiert werden können.
4. Beschreibe konzeptionell, wie du Aliasing-Probleme vermeidest, da hier mehrere rohe Zeiger auf dieselben Speicherbereiche zeigen können.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Modifikationsmethoden für die doppelt verkettete Liste unter Einhaltung der Zeigersynchronisation.
1. Schreibe Methoden `push_front` und `push_back`. Konvertiere die mit `Box::new` erstellten Knoten über `Box::into_raw` in rohe Zeiger.
2. Nutze `unsafe`-Blöcke, um bei jedem Einfügevorgang sowohl die Vorwärtszeiger (`next`) als auch die Rückwärtszeiger (`prev`) der betroffenen Knoten anzupassen.
3. Implementiere `pop_front` und `pop_back`. Nutze `Box::from_raw`, um den Speicher des gelöschten Knotens freizugeben, nachdem du die Zeiger der benachbarten Knoten aktualisiert hast.
4. Achte besonders darauf, dass bei einer Liste mit nur einem Element `head` und `tail` nach dem Entfernen beide wieder auf `null_mut()` zeigen.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Schließe das Projekt ab und teste die Speicherbereinigung.
1. Implementiere das `Drop`-Trait, das die Liste von vorne nach hinten traversiert und alle verbleibenden Knoten über `Box::from_raw` dealloziert.
2. Schreibe ein Hauptprogramm in `main.rs`, das Elemente von beiden Seiten einfügt, Traversierungen vor- und rückwärts durchführt und Elemente wieder entfernt.
3. Schreibe automatisierte Tests, um das Zusammenspiel von `push_front`, `push_back`, `pop_front` und `pop_back` abzusichern.

---

## Projekt 23: Eigener Box-Klon

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Erstelle die Struktur für einen eigenen Smart Pointer `MyBox<T>`, der sich wie `std::boxed::Box` verhält und Speicher direkt auf dem Heap verwaltet.
1. Definiere das Struct `MyBox<T>` mit einem einzigen Feld vom Typ `std::ptr::NonNull<T>`. Verwende `NonNull`, da eine Box niemals null sein darf und Kovarianz über `T` aufweisen soll.
2. Nutze `std::alloc::Layout`, um das Speicherlayout für den Typ `T` zu berechnen.
3. Erkläre in einem Kommentar, warum `NonNull` für dieses Vorhaben besser geeignet ist als ein einfacher roher Zeiger `*mut T`.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Heap-Allokation und den Zugriff auf die Daten in deiner Box.
1. Schreibe eine Funktion `MyBox::new(value: T) -> Self`. Nutze `std::alloc::alloc`, um Speicher auf dem Heap gemäß dem Layout von `T` zu reservieren.
2. Schreibe den Wert `value` mittels unsafe-Schreiboperationen (`std::ptr::write`) in den alloziierten Speicherbereich. Falls die Allokation fehlschlägt, rufe `std::alloc::handle_alloc_error` auf.
3. Implementiere das `Deref`- und das `DerefMut`-Trait für `MyBox<T>`, damit man auf den inneren Wert wie bei einer normalen Referenz zugreifen kann. Nutze dafür die Dereferenzierung des rohen Zeigers im `unsafe`-Block.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Sorge für die automatische Speicherbereinigung und integriere deinen Smart Pointer.
1. Implementiere das `Drop`-Trait für `MyBox<T>`. Nutze `std::ptr::drop_in_place`, um den Destruktor des inneren Typs `T` aufzurufen, und dealloziere anschließend den Heap-Speicher der `RcBox<T>` über `Box::from_raw` (oder direkt mit `dealloc`).
2. Schreibe ein Testprogramm in `main.rs`, das `MyBox` mit komplexen Typen (z. B. einem `String` oder einem Struct, das selbst `Drop` implementiert) verwendet.
3. Verifiziere durch Ausgaben in einer Test-Drop-Implementierung, dass sowohl der Inhalt der Box als auch der Heap-Speicher der Box selbst beim Verlassen des Scopes korrekt freigegeben werden.

---

## Projekt 24: Eigener Vec-Klon (Minimal)

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe ein minimales dynamisches Array `MyVec<T>`, das Speicherplatz auf dem Heap dynamisch vergrößern kann.
1. Definiere das Struct `MyVec<T>` mit den drei Feldern: `ptr: std::ptr::NonNull<T>` (Zeiger auf den Anfang des Arrays), `cap: usize` (aktuelle Kapazität) und `len: usize` (Anzahl der aktuell belegten Elemente).
2. Erstelle eine `new`-Methode, die mit einer Kapazität von 0 startet und `NonNull::dangling()` als Zeiger verwendet, um unnötige Heap-Allokationen bei leeren Vektoren zu vermeiden.
3. Dokumentiere, wie das `Layout` für ein Array der Größe `cap` berechnet werden muss und welche Besonderheiten bei Zero-Sized Types (ZSTs) zu beachten wären (du kannst dich zur Vereinfachung vorerst auf Typen mit einer Größe > 0 beschränken).

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Speicherverwaltung und die Kernfunktionen deines Vektors.
1. Schreibe eine private Methode `grow(&mut self)`, die die Kapazität verdoppelt (oder auf 1 setzt, falls sie 0 war). Nutze `std::alloc::realloc` (oder `alloc`, falls vorher keine Allokation vorlag), um neuen Speicher zu reservieren, und aktualisiere den Zeiger `ptr`. Behandle Allokationsfehler sauber.
2. Implementiere `push(&mut self, value: T)`. Überprüfe, ob `len == cap` gilt, und rufe gegebenenfalls `grow` auf. Schreibe das Element mittels `std::ptr::write` an den Index `self.len` und erhöhe `len` um 1.
3. Implementiere `pop(&mut self) -> Option<T>`. Falls `len > 0`, dekrementiere `len` und lies das Element am entsprechenden Index mit `std::ptr::read` aus.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Vervollständige den Vektor durch Speicherfreigabe und Tests.
1. Implementiere das `Drop`-Trait für `MyVec<T>`. Es muss alle initialisierten Elemente im Array mittels `std::ptr::drop_in_place` zerstören und danach den gesamten Speicherblock via `std::alloc::dealloc` freigeben, sofern Kapazität alloziiert wurde.
2. Biete sicheren Lese- und Schreibzugriff an, indem du das `Deref`- und `DerefMut`-Trait implementierst, die auf ein Slice `&[T]` bzw. `&mut [T]` verweisen (nutze `std::slice::from_raw_parts`).
3. Schreibe ein Hauptprogramm in `main.rs`, das Elemente pusht, poppt und per Index anspricht. Überprüfe die Abwesenheit von Memory Leaks.

---

## Projekt 25: Unsafe Ringpuffer

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Konstruiere die Datenstruktur für einen zirkulären Ringpuffer (`RingBuffer<T>`) mit einer festen Kapazität, der rohe Zeiger verwendet.
1. Definiere `RingBuffer<T>` mit den Feldern: `buf: *mut T` (Zeiger auf den Anfang des alloziierten Puffers), `cap: usize` (Kapazität), `head: usize` (Lese-Index), `tail: usize` (Schreib-Index) und `len: usize` (Anzahl der Elemente).
2. Erstelle eine Methode `with_capacity(cap: usize) -> Self`, die ein passendes Speicherlayout bestimmt und Speicher über `std::alloc::alloc` reserviert.
3. Erkläre im Code, warum man bei der Berechnung von `head` und `tail` Modulo-Arithmetik verwenden muss und wie sich dies auf das Speicherlayout auswirkt.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere das Hinzufügen und Entfernen von Elementen unter Umgehung von Standard-Sicherheitsprüfungen.
1. Implementiere `push(&mut self, value: T) -> Result<(), T>`. Falls der Puffer voll ist (`len == cap`), gib den Wert im Fehlerfall zurück. Andernfalls berechne den Offset für `tail` mittels Zeiger-Arithmetik (`self.buf.add(self.tail)`), schreibe das Element mit `std::ptr::write` und passe `tail` sowie `len` an.
2. Implementiere `pop(&mut self) -> Option<T>`. Falls der Puffer leer ist, gib `None` zurück. Berechne den Offset für `head`, lies den Wert mit `std::ptr::read`, passe `head` sowie `len` an und gib den Wert zurück.
3. Achte darauf, dass `head` und `tail` bei Erreichen von `cap` wieder auf 0 zurückgesetzt werden.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Schreibe die Speicherbereinigung und den Integrationstest für den Ringpuffer.
1. Implementiere das `Drop`-Trait: Es muss alle noch im Puffer befindlichen Elemente (von `head` bis `tail`, unter Berücksichtigung des Wraparounds) mit `std::ptr::drop_in_place` zerstören und danach den gesamten Puffer mit `std::alloc::dealloc` freigeben.
2. Baue ein Demonstrationsprogramm in `main.rs`, das Elemente in den Puffer schreibt, ihn gezielt überlaufen lässt (Fehlerbehandlung testen), Elemente ausliest und die korrekte FIFO-Reihenfolge verifiziert.
3. Teste das Freigabeverhalten mit komplexen Typen wie `String`.

---

## Projekt 26: Lock-freie Queue (Einfach)

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe das Speicherlayout für eine minimalistische, lock-freie Single-Producer Single-Consumer (SPSC) Queue unter Verwendung atomarer Zeiger.
1. Definiere ein Struct `Node<T>` mit den Feldern `value: Option<T>` und `next: std::sync::atomic::AtomicPtr<Node<T>>`.
2. Definiere das Struct `LockFreeQueue<T>` mit den Feldern `head: std::sync::atomic::AtomicPtr<Node<T>>` und `tail: std::sync::atomic::AtomicPtr<Node<T>>`.
3. Initialisiere die Queue mit einem Dummy-Knoten (`value: None`), damit `head` und `tail` zu Beginn auf denselben gültigen Knoten zeigen.
4. Erkläre in Kommentaren, welche Speicherordnungen (`std::sync::atomic::Ordering`) für die atomaren Operationen auf `next`, `head` und `tail` relevant sind.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die thread-sicheren Operationen der Queue ohne klassische Mutexe.
1. Implementiere die `enqueue(&self, value: T)`-Methode. Erstelle einen neuen Knoten auf dem Heap, wandle ihn in einen `*mut Node<T>` um und hänge ihn atomar an das Ende der Liste an, indem du den `next`-Zeiger des aktuellen `tail`-Knotens änderst. Aktualisiere danach den `tail`-Zeiger der Queue.
2. Implementiere `dequeue(&self) -> Option<T>`. Versuche atomar den `head`-Zeiger auf den nächsten Knoten zu verschieben. Falls dies gelingt, nimm den Wert aus dem Nachfolgeknoten heraus (`Option::take`) und dealloziere den alten Dummy-Knoten.
3. Verwende passende `std::sync::atomic::Ordering`-Argumente (z. B. `Acquire` und `Release`), um Race Conditions zu vermeiden.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Stelle die korrekte Freigabe und Multi-Threading-Fähigkeit sicher.
1. Implementiere das `Drop`-Trait für die Queue, um alle verbleibenden Knoten sicher abzuräumen.
2. Implementiere `Send` und `Sync` für deine Queue, sofern die Typparameter dies erlauben (nutze `unsafe impl`).
3. Schreibe in `main.rs` einen Test, der einen Producer-Thread und einen Consumer-Thread startet, Daten über die Queue austauscht und sicherstellt, dass alle gesendeten Daten korrekt und in der richtigen Reihenfolge ankommen.

---

## Projekt 27: Eigene Cell-Implementierung

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe eine eigene Implementierung von `Cell<T>`, die interne Veränderlichkeit (Interior Mutability) ermöglicht, ohne auf Laufzeit-Ausleihen wie `RefCell` zurückzugreifen.
1. Definiere ein Struct `MyCell<T>` mit einem einzigen Feld `value: std::cell::UnsafeCell<T>`.
2. Stelle sicher, dass `MyCell` nicht thread-sicher ist (deaktiviere `Sync` implizit oder explizit).
3. Erkläre in einem Kommentar, welche Rolle `UnsafeCell` als magischer Typ für den Rust-Compiler spielt und warum er Aliasing-Optimierungen für diesen Speicherbereich unterbindet.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere Methoden zum sicheren Ändern und Auslesen des Werts in `MyCell`.
1. Schreibe eine `new`-Methode zur Initialisierung.
2. Implementiere `set(&self, value: T)`. Da man nur eine unveränderliche Referenz `&self` besitzt, musst du über `self.value.get()` einen rohen Zeiger `*mut T` holen und diesen im `unsafe`-Block überschreiben (`std::ptr::write`).
3. Implementiere `get(&self) -> T` unter der Voraussetzung, dass `T` das `Copy`-Trait implementiert. Nutze `std::ptr::read`, um den Wert über den rohen Zeiger zu kopieren.
4. Implementiere `replace(&self, value: T) -> T`. Tausche den inneren Wert atomar gegen den neuen aus und gib den alten Wert zurück (nutze `std::ptr::replace`).

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Erweitere und teste deine Cell-Implementierung.
1. Ergänze Hilfsmethoden wie `into_inner(self) -> T`, die den Wert ohne `unsafe` zurückgeben, da hier die Ownership konsumiert wird.
2. Erstelle ein Hauptprogramm in `main.rs`, das zeigt, wie man mit einer unveränderlichen Referenz auf ein Struct, welches ein `MyCell` enthält, dessen Zustand verändern kann.
3. Schreibe Tests, die verifizieren, dass die Datenintegrität gewahrt bleibt und keine Aliasing-Regeln verletzt werden.

---

## Projekt 28: Eigener Rc-Klon (Reference Counting)

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe die Datenstrukturen für einen eigenen, nicht-thread-sicheren Referenzzähler `MyRc<T>`.
1. Definiere ein internes Struct `RcBox<T>` mit den Feldern: `value: T`, `strong: std::cell::Cell<usize>` (für die Anzahl der starken Referenzen).
2. Definiere das öffentliche Struct `MyRc<T>` mit dem Feld `ptr: std::ptr::NonNull<RcBox<T>>`.
3. Erkläre, warum `strong` als `Cell<usize>` definiert werden muss und warum wir `NonNull` verwenden.
4. Stelle sicher, dass `MyRc<T>` als nicht thread-sicher markiert ist (entziehe `Send` und `Sync` via `PhantomData` oder explizitem negativen Impl, falls nötig).

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Erstellung, das Klonen und den Zugriff auf deinen Rc-Pointer.
1. Schreibe `MyRc::new(value: T) -> Self`. Alloziere eine `RcBox<T>` auf dem Heap (mittels `Box::into_raw(Box::new(...))`) und setze den Zähler auf 1.
2. Implementiere das `Clone`-Trait für `MyRc<T>`. Erhöhe im `unsafe`-Block den Zähler in der `RcBox` um 1 und gib eine Kopie des `MyRc`-Structs (mit demselben Zeiger) zurück.
3. Implementiere das `Deref`-Trait für `MyRc<T>`, um transparent auf den inneren Wert `T` zuzugreifen.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Implementiere die Speicherfreigabe und teste die Rc-Implementierung.
1. Implementiere das `Drop`-Trait für `MyRc<T>`. Dekrementiere den starken Zähler. Wenn dieser 0 erreicht, zerstöre das Objekt mit `std::ptr::drop_in_place` auf dem inneren Wert und dealloziere den Heap-Speicher der `RcBox<T>` über `Box::from_raw`.
2. Schreibe ein Hauptprogramm in `main.rs`, das zeigt, wie sich der Referenzzähler beim Klonen und Verlassen von Scopes verändert.
3. Teste, ob der Speicher eines Test-Structs mit einer benutzerdefinierten `Drop`-Meldung erst dann freigegeben wird, wenn die letzte Referenz von `MyRc` erlischt.

---

## Projekt 29: Trie-Datenstruktur mit Rohzeigern

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe einen Präfixbaum (Trie) zur Speicherung von ASCII-Strings, der direkt auf rohen Zeigern basiert.
1. Definiere das Struct `TrieNode` mit den Feldern: `children: [*mut TrieNode; 26]` (für die 26 Buchstaben des Alphabets) und `is_end_of_word: bool`.
2. Definiere das Haupt-Struct `Trie` mit dem Feld `root: *mut TrieNode`.
3. Überlege dir, wie ein leerer Knoten initialisiert wird (alle Kindzeiger müssen `null_mut()` sein).
4. Dokumentiere das Speicherlayout und die Vor- und Nachteile von rohen Zeigern gegenüber sicheren Typen wie `Option<Box<TrieNode>>` bezüglich des Speicher-Overheads.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Einfüge- und Suchfunktionen im Trie.
1. Schreibe eine Methode `insert(&mut self, word: &str)`. Traversiere den Baum Zeichen für Zeichen. Wenn ein Kindzeiger `null_mut()` ist, erstelle einen neuen `TrieNode` auf dem Heap (über `Box::into_raw`) und trage ihn ein. Nutze `unsafe`, um den Zeiger zu dereferenzieren.
2. Implementiere `contains(&self, word: &str) -> bool`. Navigiere entlang der Kindzeiger. Falls du auf einen `null_mut()`-Zeiger stößt, gib `false` zurück. Wenn der Pfad existiert, gib den Wert von `is_end_of_word` des Zielknotens zurück.
3. Achte auf korrekte Validierung der Zeichen (nur 'a' bis 'z').

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Implementiere den rekursiven Abbau des Baums und die Tests.
1. Implementiere das `Drop`-Trait für `Trie`. Schreibe eine rekursive Hilfsfunktion (oder nutze einen iterativen Stack), die für jeden Knoten alle nicht-null Kindzeiger besucht, diese dealloziert (mittels `Box::from_raw`) und schließlich den Wurzelknoten freigibt.
2. Schreibe ein Hauptprogramm in `main.rs`, das mehrere Wörter in den Trie einfügt, nach ihnen sucht und auch nach nicht vorhandenen Wörtern oder Präfixen sucht.
3. Stelle mittels Miri sicher, dass die rekursive Freigabe keinen Stack-Overflow erzeugt und alle Knoten sauber gelöscht werden.

---

## Projekt 30: Binary Heap ohne sichere Indizes

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe einen binären Min-Heap (`BinaryHeap<T>`), der intern ein rohes Speicher-Array anstelle eines `Vec` nutzt und Navigation per Zeiger-Arithmetik betreibt.
1. Definiere das Struct `BinaryHeap<T>` mit den Feldern: `ptr: *mut T` (Start des alloziierten Arrays), `cap: usize` (Kapazität) und `len: usize` (Anzahl der Elemente).
2. Erstelle eine `new(cap: usize) -> Self`-Methode, die den benötigten Speicherbereich über `std::alloc::alloc` anfordert.
3. Beschreibe mathematisch in einem Kommentar, wie du die Eltern- und Kind-Zeiger für ein Element an der Speicheradresse `ptr.add(i)` berechnest.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Heap-Operationen mittels Zeigermanipulation.
1. Implementiere `push(&mut self, value: T)`. Falls `len == cap`, gib einen Fehler zurück oder vergrößere den Speicher. Schreibe das Element an das Ende (`ptr.add(len)`) und lasse es über eine `sift_up`-Hilfsmethode aufsteigen.
2. Implementiere `pop(&mut self) -> Option<T>`. Falls leer, gib `None` zurück. Tausche das erste Element (`ptr`) mit dem letzten Element (`ptr.add(len-1)`), lies das letzte Element mit `std::ptr::read` aus, verringere `len` und lasse das neue Wurzel-Element über `sift_down` absinken.
3. Verwende `unsafe` und `std::ptr::swap` bzw. direkte Zeiger-Dereferenzierungen für die Vertauschungen.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Sorge für Speicherfreigabe und führe Funktionstests durch.
1. Implementiere das `Drop`-Trait für den Heap. Es muss alle enthaltenen Elemente (`0` bis `len`) mittels `std::ptr::drop_in_place` zerstören und danach das Array über `std::alloc::dealloc` freigeben.
2. Schreibe ein Testprogramm in `main.rs`, das ungeordnete Zahlen in den Heap einfügt und diese in sortierter Reihenfolge wieder herausholt (Heap-Sort).
3. Teste den Heap mit komplexen Datentypen und überprüfe die korrekte Freigabe bei vorzeitigem Abbruch.

---

## Projekt 31: Eigener Arena-Allokator

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe die Datenstruktur für einen einfachen Arena-Allokator (`Arena`), der einen großen Speicherblock im Voraus alloziert und kleinere Teilstücke davon schnell per Zeiger-Offset herausgibt.
1. Definiere das Struct `Arena` mit den Feldern: `buffer: *mut u8` (Anfang des Speicherblocks), `cap: usize` (Gesamtgröße in Bytes) und `current_offset: std::cell::Cell<usize>` (aktuelle Schreibposition).
2. Erstelle `Arena::with_capacity(bytes: usize) -> Self`. Reserviere den Speicherblock via `std::alloc::alloc` mit einem passenden Standard-Alignment.
3. Erkläre das Konzept des Memory Alignments und warum zurückgegebene Zeiger an bestimmten Byte-Grenzen (z. B. 8-Byte-Grenzen) ausgerichtet sein müssen.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Speicherzuweisung innerhalb deiner Arena.
1. Schreibe eine Methode `alloc<T>(&self, value: T) -> &mut T` (oder gib einen `*mut T` zurück).
2. Berechne das Alignment für `T` und passe den `current_offset` so an, dass die nächste freie, korrekt ausgerichtete Speicheradresse ermittelt wird. Falls nicht genügend Platz im Puffer ist, wirf ein Panic oder gib einen Fehler aus.
3. Schreibe den Wert `value` mit `std::ptr::write` an die berechnete Adresse und gib eine veränderliche Referenz zurück. Nutze `unsafe`, um den rohen Zeiger in eine Referenz umzuwandeln (`&mut *typed_ptr`).

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Stelle die Zerstörung der Arena sicher und schreibe das Testprogramm.
1. Implementiere das `Drop`-Trait für `Arena`. Da die Arena die Lebenszyklen der alloziierten Objekte nicht einzeln nachverfolgt (was typisch für Arena-Allokatoren ist), dealloziere einfach den gesamten Puffer mit `std::alloc::dealloc`.
2. Erstelle ein Hauptprogramm in `main.rs`, das in einer Schleife viele kleine Objekte in der Arena alloziert.
3. Überprüfe die Performance-Vorteile im Vergleich zu Standard-Heap-Allokationen und verifiziere das korrekte Alignment der alloziierten Daten.

---

## Projekt 32: Unsafe Stack (Stapel)

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Erstelle die Datenstruktur für einen Stack (`UnsafeStack<T>`), der auf einem festen, im Vorfeld alloziierten Rohspeicher-Array arbeitet.
1. Definiere `UnsafeStack<T>` mit den Feldern `data: *mut T` (Zeiger auf den Speicherbereich), `cap: usize` und `len: usize`.
2. Schreibe eine Methode `new(capacity: usize) -> Self`, die das Speicherlayout für `capacity` Elemente vom Typ `T` ermittelt und den Speicher über `std::alloc::alloc` anfordert.
3. Diskutiere in Kommentaren das Exception-Safety-Verhalten: Was passiert, wenn beim Befüllen des Stacks ein Fehler auftritt?

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Push- und Pop-Operationen über direkte Offset-Berechnungen.
1. Implementiere `push(&mut self, item: T) -> Result<(), T>`. Prüfe, ob die Kapazität erschöpft ist. Falls nicht, berechne den Schreibzeiger über `self.data.add(self.len)`, schreibe das Element via `std::ptr::write` und erhöhe `len`.
2. Implementiere `pop(&mut self) -> Option<T>`. Falls `len > 0`, dekrementiere `len`, berechne den Lesezeiger `self.data.add(self.len)` und lies das Element über `std::ptr::read` aus.
3. Nutze `unsafe`-Blöcke für die Zeigerarithmetik und Dereferenzierung.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Implementiere die Speicherfreigabe und teste den Stack.
1. Implementiere das `Drop`-Trait für `UnsafeStack<T>`. Iteriere rückwärts durch alle aktiven Elemente und rufe für jedes `std::ptr::drop_in_place` auf. Dealloziere danach den gesamten Speicherblock.
2. Schreibe ein Hauptprogramm in `main.rs`, das den Stack bis zur maximalen Kapazität füllt, Elemente herunterholt und die korrekte LIFO-Funktionsweise überprüft.
3. Teste mit `cargo test` unter Miri, um sicherzustellen, dass keine Out-of-bounds-Zugriffe oder doppelte Freigaben (Double Drops) stattfinden.

---

## Projekt 33: Selbst-referenzierendes Struct

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Konstruiere eine selbst-referenzierende Struktur, bei der ein Feld auf ein anderes Feld innerhalb derselben Struktur zeigt.
1. Definiere ein Struct `SelfReferential` mit den Feldern: `value: String` und `ptr: *const String` (ein roher Zeiger, der auf das Feld `value` zeigen soll).
2. Erkläre in einem Kommentar ausführlich das Problem, das entsteht, wenn eine solche Struktur im Speicher verschoben (moved) wird (z. B. bei der Rückgabe aus einer Funktion), und warum dies zu hängenden Zeigern (Dangling Pointers) führt.
3. Beschäftige dich mit der API von `std::pin::Pin` und überlege, wie Pinning dieses Verschieben unterbinden kann.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Initialisierung und den sicheren Zugriff unter Verwendung von `unsafe`.
1. Schreibe eine `new(text: &str) -> Self`-Methode. Initialisiere `value` mit dem String und setze `ptr` zunächst auf `std::ptr::null()`.
2. Schreibe eine Methode `init(&mut self)`. Verwende `unsafe`, um die Adresse von `self.value` zu ermitteln und diese in `self.ptr` abzuspeichern.
3. Schreibe eine Methode `get_referenced_value(&self) -> &str`. Nutze `unsafe`, um den Zeiger `self.ptr` zu dereferenzieren und den Inhalt als sichere Referenz zurückzugeben. Falls `ptr` null ist, gib einen leeren String oder ein Fallback zurück.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Schreibe ein Testprogramm, das die Gefahren von Moves aufzeigt und wie man sie verhindert.
1. Schreibe ein Hauptprogramm in `main.rs`. Erstelle eine Instanz von `SelfReferential`, initialisiere sie und gib die referenzierte Zeichenkette aus.
2. Demonstriere (durch eine Verschiebung, z. B. durch Übergabe an eine Funktion oder Speichern in einem Vektor), dass der Zeiger nach dem Verschieben auf eine ungültige Speicheradresse zeigt.
3. Zeige, wie man das Struct mithilfe von `Pin` (z. B. `Pin<Box<SelfReferential>>`) absichern kann, sodass es nicht mehr verschoben werden kann.

---

## Projekt 34: Eigener Arc-Klon (Atomarer Rc)

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Konstruiere die Datenstrukturen für einen thread-sicheren, atomaren Referenzzähler `MyArc<T>`.
1. Definiere ein internes Struct `ArcBox<T>` mit den Feldern: `value: T`, `strong: std::sync::atomic::AtomicUsize` (für die Anzahl der starken Referenzen).
2. Definiere das öffentliche Struct `MyArc<T>` mit dem Feld `ptr: std::ptr::NonNull<ArcBox<T>>`.
3. Implementiere `Send` und `Sync` für `MyArc<T>` unter der Bedingung, dass `T` ebenfalls `Send` und `Sync` ist (`unsafe impl<T: Send + Sync> Send for MyArc<T> {}`).
4. Dokumentiere, warum atomare Typen anstelle von `Cell` benötigt werden, um Thread-Sicherheit zu garantieren.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die atomare Referenzverwaltung und den Zugriff.
1. Schreibe `MyArc::new(value: T) -> Self`. Reserviere Speicher auf dem Heap für `ArcBox<T>` und setze den atomaren Zähler initial auf 1.
2. Implementiere das `Clone`-Trait für `MyArc<T>`. Nutze `self.ptr.as_ref().strong.fetch_add(1, Ordering::Relaxed)`, um den Zähler atomar zu erhöhen.
3. Implementiere `Deref` für `MyArc<T>`.
4. Diskutiere, welche atomaren Speicherordnungen (`Ordering::SeqCst`, `Ordering::Acquire`/`Release` oder `Ordering::Relaxed`) für das Klonen und das spätere Freigeben optimal sind, um Performance und Korrektheit zu wahren.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Vervollständige die atomare Speicherbereinigung und teste unter echten Threads.
1. Implementiere das `Drop`-Trait für `MyArc<T>`. Nutze `fetch_sub(1, Ordering::Release)` auf dem Zähler. Falls der Wert (nach der Subtraktion) 0 erreicht, füge einen `Acquire`-Zaun (`std::sync::atomic::fence`) ein und dealloziere den Speicher über `Box::from_raw` (oder direkt mit `dealloc`).
2. Schreibe ein Hauptprogramm in `main.rs`, das ein `MyArc` erstellt und an mehrere parallel laufende Threads übergibt (`std::thread::spawn`).
3. Verifiziere, dass die Daten von allen Threads gelesen werden können und dass das Objekt nach dem Beenden aller Threads genau einmal zerstört wird.

---

## Projekt 35: Graph mit Adjazenzliste über Zeiger

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe die Datenstrukturen für einen gerichteten Graphen, bei dem die Knoten direkt über rohe Zeiger auf ihre Nachbarn verweisen.
1. Definiere ein Struct `Node` mit den Feldern: `id: usize`, `value: String` und `neighbors: Vec<*mut Node>`.
2. Definiere ein Haupt-Struct `Graph` mit dem Feld `nodes: Vec<*mut Node>`.
3. Verwende rohe Zeiger, um zyklische Abhängigkeiten zu ermöglichen, ohne dass es zu Zählschleifen (Reference Cycles) wie bei `Rc` kommt.
4. Beschreibe das Eigentumsverhältnis (Ownership): Wer besitzt die Knoten und wer ist für deren Zerstörung verantwortlich?

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Erstellung von Knoten und Kanten im Graphen.
1. Schreibe eine Methode `add_node(&mut self, id: usize, val: &str) -> *mut Node` im `Graph`. Alloziere den Knoten auf dem Heap (`Box::into_raw`) und füge den Zeiger zu `self.nodes` hinzu.
2. Implementiere `add_edge(&self, from: *mut Node, to: *mut Node)`. Füge den `to`-Zeiger direkt in die `neighbors`-Liste des `from`-Knotens ein (nutze `unsafe`, um `from` zu dereferenzieren).
3. Implementiere eine Traversierungsmethode (z. B. Tiefensuche oder Breitensuche), die die Nachbarzeiger dereferenziert und zyklische Pfade mittels eines "Visited"-Sets aus IDs vermeidet.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Implementiere die sichere Deallokation des Graphen und erstelle Tests.
1. Implementiere das `Drop`-Trait für `Graph`. Da alle Knoten in `self.nodes` registriert sind, kannst du durch diese Liste iterieren und jeden Knoten genau einmal mittels `Box::from_raw` freigeben.
2. Schreibe ein Hauptprogramm in `main.rs`, das einen Graphen mit Zyklen (z. B. A -> B -> C -> A) aufbaut und traversiert.
3. Teste das Programm intensiv mit Miri, um sicherzustellen, dass keine ungültigen Zeigerzugriffe während der Traversierung oder Zerstörung des Graphen stattfinden.

---

## Projekt 36: Dynamisches Array mit variabler Elementgröße

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe das Layout für ein Byte-Array (`HeterogeneousVector`), das Elemente unterschiedlicher Typen und Größen direkt hintereinander im Speicher ablegt.
1. Definiere das Struct `HeterogeneousVector` mit den Feldern: `buf: *mut u8` (Byte-Puffer), `cap: usize` (Kapazität in Bytes), `len: usize` (aktuelle Belegung in Bytes) und `offsets: Vec<usize>` (Start-Offsets der einzelnen Elemente).
2. Erstelle eine `new`-Methode, die einen initialen Byte-Speicherbereich über `std::alloc::alloc` reserviert.
3. Beschreibe, wie du beim Einfügen das Alignment des jeweiligen Typs `T` berücksichtigen musst, um undefiniertes Verhalten beim späteren Auslesen zu vermeiden.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere das Einfügen und typsichere Auslesen von Elementen.
1. Implementiere eine generische Methode `push<T>(&mut self, value: T)`. Berechne das erforderliche Alignment und die Größe von `T`. Passe `len` so an, dass das Alignment eingehalten wird (Padding). Kopiere die Bytes des Werts mittels `std::ptr::write` an die Stelle `self.buf.add(aligned_offset)` und speichere das Offset in `self.offsets`.
2. Implementiere eine generische Methode `get<T>(&self, index: usize) -> Option<&T>`. Überprüfe, ob der Index gültig ist, hole das Offset aus `self.offsets`, berechne den Zeiger und caste ihn in einen typisierten Zeiger `*const T`. Verwandle diesen `unsafe` in eine sichere Referenz.
3. Achte auf ausreichende Kapazitätsprüfungen und vergrößere den Puffer bei Bedarf mit `realloc`.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Schreibe die Speicherbereinigung und ein Integrationsbeispiel.
1. Da die Typinformationen zur Laufzeit verloren gehen, speichere zusätzlich zu den Offsets auch Funktionszeiger auf Destruktoren (Vtable-artig) ab oder implementiere `Drop` so, dass es nur den rohen Speicher über `dealloc` freigibt.
2. Schreibe in `main.rs` ein Szenario, in dem du nacheinander ein `u32`, ein `u8` und ein `f64` in den Vektor schreibst und diese wieder korrekt ausliest.
3. Überprüfe die Ausrichtung (Alignment) der zurückgegebenen Referenzen.

---

## Projekt 37: LIFO-Queue mit atomarem Austausch

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe die Datenstruktur für eine lock-freie LIFO-Queue (Treiber-Stack) unter Verwendung der atomaren `compare_exchange`-Operation.
1. Definiere ein Struct `Node<T>` mit den Feldern `value: T` und `next: *mut Node<T>`.
2. Definiere das Struct `LifoQueue<T>` mit dem Feld `head: std::sync::atomic::AtomicPtr<Node<T>>`.
3. Implementiere `Send` und `Sync` für `LifoQueue<T>`.
4. Erkläre das ABA-Problem, das bei lock-freien Datenstrukturen auftreten kann, und warum es in diesem vereinfachten Kontext (oder durch Nutzung von Epochen/Miri) überwacht werden muss.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Push- und Pop-Operationen mittels einer CAS-Schleife (Compare-And-Swap).
1. Implementiere `push(&self, value: T)`. Erstelle einen neuen Knoten auf dem Heap (`Box::into_raw`). Lade in einer Schleife den aktuellen `head`-Zeiger, setze den `next`-Zeiger des neuen Knotens darauf und versuche atomar via `compare_exchange`, den `head`-Zeiger auf deinen neuen Knoten umzubiegen. Falls es fehlschlägt, wiederhole den Vorgang.
2. Implementiere `pop(&self) -> Option<T>`. Lade in einer Schleife den aktuellen `head`. Falls dieser null ist, gib `None` zurück. Versuche atomar, `head` durch das `next`-Feld des aktuellen Kopfknotens zu ersetzen. Gelingt dies, lies den Wert mit `std::ptr::read` aus und gib den alten Knoten über `Box::from_raw` frei.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Vervollständige die Implementierung und teste die Thread-Sicherheit.
1. Implementiere das `Drop`-Trait, das alle verbleibenden Knoten aus dem Stack poppt und dealloziere sie.
2. Schreibe ein Testprogramm in `main.rs`, bei dem mehrere Threads gleichzeitig Daten in den Stack pushen und andere Threads Daten herausziehen.
3. Stelle sicher, dass keine Daten verloren gehen (zähle die Anzahl der gesendeten und empfangenen Elemente) und überprüfe das Programm unter Miri auf Race Conditions.

---

## Projekt 38: Speichereffizientes Bit-Set

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe ein Bit-Set, das einzelne Bits direkt in einem dynamischen, rohen Speicherbereich verwaltet.
1. Definiere das Struct `BitSet` mit den Feldern: `ptr: *mut u8` (Zeiger auf den Byte-Puffer), `cap_bytes: usize` (Kapazität in Bytes).
2. Schreibe eine Methode `new(initial_bits: usize) -> Self`, die die benötigte Byte-Anzahl berechnet und Speicher über `std::alloc::alloc_zeroed` anfordert (damit alle Bits initial auf 0 stehen).
3. Dokumentiere, wie du den Index eines bestimmten Werts in ein Byte-Offset und eine Bit-Maske (0 bis 7) umrechnest.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die bitweisen Lese- und Schreiboperationen mittels Zeigerzugriff.
1. Implementiere `set(&mut self, bit_index: usize)`. Berechne das Byte-Offset (`bit_index / 8`) und das Ziel-Bit (`bit_index % 8`). Nutze `unsafe`, um das Byte an der Adresse `self.ptr.add(offset)` zu lesen, verknüpfe es bitweise mit `1 << (bit_index % 8)` und schreibe es zurück.
2. Implementiere `clear(&mut self, bit_index: usize)`. Lösche das Bit analog mittels einer bitweisen UND-NICHT-Maske.
3. Implementiere `is_set(&self, bit_index: usize) -> bool`. Lies das entsprechende Byte aus und überprüfe mit einer UND-Maske, ob das Bit gesetzt ist.
4. Stelle sicher, dass bei Zugriffen außerhalb der aktuellen Kapazität der Puffer vergrößert wird.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Schreibe die Speicherbereinigung und führe Funktionstests durch.
1. Implementiere das `Drop`-Trait für `BitSet` zur Freigabe des Byte-Puffers über `std::alloc::dealloc`.
2. Schreibe ein Hauptprogramm in `main.rs`, das Primzahlen mittels des Siebs des Eratosthenes im `BitSet` berechnet.
3. Schreibe Tests, die große Bit-Indizes setzen, um das dynamische Vergrößern des Puffers abzusichern, und überprüfe die Speicherintegrität.

---

## Projekt 39: Eigener String-Typ

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe ein eigenes String-Struct `MyString`, das UTF-8-validierte Zeichendaten auf dem Heap verwaltet.
1. Definiere das Struct `MyString` mit den Feldern: `buf: std::ptr::NonNull<u8>`, `len: usize` und `cap: usize`.
2. Erkläre den Unterschied zwischen einem rohen Byte-Vektor und einem validen UTF-8-String.
3. Schreibe eine Methode `new() -> Self`, die analog zu `Vec::new` ohne Heap-Allokation startet.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere die Zuweisung, Konvertierung und UTF-8-Validierung.
1. Schreibe eine Methode `from_str(s: &str) -> Self`. Alloziere Heap-Speicher für `s.len()` Bytes, kopiere die Bytes mittels `std::ptr::copy_nonoverlapping` und setze `len` und `cap`.
2. Implementiere eine Methode `push_str(&mut self, s: &str)`. Überprüfe die Kapazität, vergrößere gegebenenfalls den Puffer über `realloc` und kopiere die neuen Bytes an das Ende des bestehenden Puffers.
3. Implementiere das `Deref`-Trait, das eine Referenz auf ein sicheres `&str` zurückgibt (nutze dafür `std::str::from_utf8` oder `std::str::from_utf8_unchecked` im `unsafe`-Block, da der String intern stets als UTF-8 validiert sein muss).

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Implementiere die Speicherfreigabe und teste die String-Funktionalität.
1. Implementiere das `Drop`-Trait, um den Byte-Puffer über `std::alloc::dealloc` freigeben.
2. Schreibe ein Hauptprogramm in `main.rs`, das Strings konkateniert, ausgibt und in Slices schneidet.
3. Führe Tests durch, um sicherzustellen, dass keine Speicherlecks beim Manipulieren und Zuweisen von Strings entstehen.

---

## Projekt 40: B-Baum-Knoten mit Unsafe-Links

### Modul 1: Basis-Datenstrukturen
**Prompt:**
Entwerfe die Datenstruktur für einen B-Baum-Knoten (`BTreeNode<K, V>`), der Schlüssel, Werte und Kindzeiger in zusammenhängenden Speicherbereichen verwaltet.
1. Definiere ein Struct `BTreeNode<K, V>` mit den Feldern:
   - `keys: *mut K` (Zeiger auf ein Array von Schlüsseln mit max. Kapazität `2 * T - 1`)
   - `values: *mut V` (Zeiger auf ein Array von Werten)
   - `children: *mut *mut BTreeNode<K, V>` (Zeiger auf ein Array von Kindknoten-Zeigern)
   - `len: usize` (Anzahl der aktuellen Schlüssel im Knoten)
   - `is_leaf: bool`
2. Erstelle eine Initialisierungsmethode, die den Speicher für diese drei Arrays in einem einzigen zusammenhängenden Speicherblock (oder getrennten Blöcken) über `std::alloc::alloc` anfordert.
3. Erkläre das Layout und die Speicherersparnis gegenüber einer Struktur mit mehreren `Vec`-Instanzen pro Knoten.

### Modul 2: Implementierung & Methoden
**Prompt:**
Implementiere das Einfügen und Suchen innerhalb eines Knotens.
1. Schreibe eine Suchmethode `search(&self, key: &K) -> Option<&V>`. Nutze Zeiger-Arithmetik, um die Schlüssel im `keys`-Array zu durchsuchen (Casting auf `&K`).
2. Implementiere eine Methode zum Einfügen eines Schlüssels in einen nicht-vollen Blattknoten. Verschiebe dazu nachfolgende Schlüssel und Werte mit `std::ptr::copy` (da sich die Speicherbereiche überlappen), schreibe das neue Element mit `std::ptr::write` an die freigewordene Stelle und passe `len` an.
3. Verwende `unsafe` für alle Array-Zugriffe und Verschiebungen.

### Modul 3: Vollendung & Hauptprogramm
**Prompt:**
Implementiere die rekursive Speicherbereinigung und teste den B-Baum-Knoten.
1. Implementiere das `Drop`-Trait für `BTreeNode<K, V>`. Es muss rekursiv alle Kindknoten deallozieren (sofern `is_leaf` false ist), alle aktiven Schlüssel und Werte über `std::ptr::drop_in_place` zerstören und danach die alloziierten Puffer freigeben.
2. Schreibe in `main.rs` einen minimalen B-Baum auf Basis deiner Knotenstruktur, füge Schlüssel ein und suche nach ihnen.
3. Teste das Speicherverhalten unter Miri, um sicherzustellen, dass das Verschieben von Schlüsseln und Werten keine ungültigen Zeiger oder Speicherzugriffsfehler erzeugt.


# Phase 9: C-Bibliotheken anbinden (FFI) – Projekte 41 bis 60

Willkommen in Phase 9! Hier lernst Du, wie Rust mit der Programmiersprache C kommuniziert. Jedes Projekt ist in drei aufeinander aufbauende Module unterteilt, um Dir einen strukturierten und sicheren Weg durch die Welt der Foreign Function Interface (FFI) und `unsafe`-Programmierung zu weisen.

---

## Projekt 41: Mathematische C-Funktionen
Binde Standard-C-Funktionen wie sin oder cos direkt über eine extern "C"-Deklaration ein.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Verstehe, wie Rust-Datentypen auf C-Datentypen abgebildet werden, und bereite die Signatur-Deklaration vor.
*   **Deine Aufgabe**: Informiere dich über das `extern "C"`-Schlüsselwort in Rust. Welche primitiven Rust-Typen entsprechen den C-Typen `double` und `float`? Verwende die Typen aus `std::os::raw` oder direkt Rusts primitive Typen wie `f64`. Erstelle einen FFI-Block, in dem die mathematischen Funktionen deklariert werden, ohne ihren Rumpf zu implementieren. Achte darauf, dass der Name der deklarierten Funktion exakt dem Namen der C-Funktion in der mathematischen Standardbibliothek (`libm`) entspricht.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Kapselung der unsicheren C-Funktionsaufrufe in sichere Rust-Wrapper.
*   **Deine Aufgabe**: Da FFI-Aufrufe in Rust grundsätzlich als unsicher eingestuft werden, erstelle sichere Wrapper-Funktionen in Rust (z.B. `fn safe_sin(x: f64) -> f64`). Verwende darin einen `unsafe`-Block, um die deklarierte FFI-Funktion aufzurufen. Überlege, welche Garantien Rust für die Argumente verlangt und warum mathematische Funktionen wie `sin` und `cos` in der Regel keine Speicherverletzungen verursachen können, aber dennoch als `unsafe` markiert werden müssen.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Integration in die `main.rs`, Verifikation und Testen.
*   **Deine Aufgabe**: Schreibe ein Hauptprogramm, das Deine sicheren Wrapper-Funktionen aufruft und die Ergebnisse für verschiedene Testwerte (z.B. $0.0$, $\pi/2$) berechnet. Vergleiche die Ausgaben mit den in Rust eingebauten Funktionen `f64::sin` und `f64::cos`, um die Korrektheit zu verifizieren. Schreibe automatisierte Unittests, die diese Vergleiche überprüfen.

---

## Projekt 42: String-Länge mit strlen
Konvertiere einen Rust-String in ein C-kompatibles Format und bestimme die Länge mit der C-Funktion strlen.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Repräsentation von C-kompatiblen Zeichenketten im Speicher verstehen.
*   **Deine Aufgabe**: Erforsche den Unterschied zwischen Rusts `&str` / `String` (UTF-8, mit expliziter Länge) und C-Strings (nullterminierte Byte-Arrays). Welche Typen stellt Rusts Standardbibliothek in `std::ffi` bereit? Untersuche insbesondere `CString` (für die Erstellung und den Besitz von C-Strings) und `CStr` (für das Arbeiten mit geliehenen C-Strings). Plane, wie Du einen Zeiger vom Typ `*const std::os::raw::c_char` für den FFI-Aufruf gewinnst.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Deklaration von `strlen` und sichere Übergabe des String-Zeigers.
*   **Deine Aufgabe**: Deklariere die externe C-Funktion `strlen` im FFI-Block unter Verwendung des korrekten Zeigertyps für das Argument. Schreibe eine Rust-Funktion, die einen Rust-String-Slice (`&str`) entgegennimmt, diesen in ein FFI-kompatibles Format konvertiert und die Länge über `strlen` im `unsafe`-Block ermittelt. Achte darauf, wie Du mit eventuellen Null-Bytes innerhalb des Rust-Strings umgehst (Stichwort: Fehlerbehandlung beim Konvertieren).

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Ausgabe, Integration und Ressourcenfreigabe.
*   **Deine Aufgabe**: Rufe Deine Funktion in `main.rs` mit verschiedenen Test-Strings auf (z.B. einfachem ASCII-Text, Umlauten und Strings mit internen Null-Bytes). Gib die zurückgegebene Länge auf der Konsole aus und stelle sicher, dass der Speicher des temporären `CString` korrekt durch Rusts Drop-Semantik freigegeben wird. Schreibe Tests, die das Verhalten bei leeren Zeichenketten absichern.

---

## Projekt 43: C-Datenstruktur spiegeln
Definiere in Rust ein Struct mit #[repr(C)], das exakt dem Layout einer C-Struktur entspricht, und übergebe es an eine C-Funktion.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: ABI-Kompatibilität von Rust-Strukturen mit C herstellen.
*   **Deine Aufgabe**: Definiere eine Rust-Struktur, die ein hypothetisches C-Struct abbildet (z.B. ein 2D-Punkt `Point` mit `x` und `y` als `f64`, oder eine Person mit ID und einem C-String-Zeiger). Verwende das Attribut `#[repr(C)]`, um die Ausrichtung (Padding/Alignment) und das Layout der Struktur gemäß der C-ABI festzulegen. Warum ist dieses Attribut hier zwingend erforderlich und was würde ohne es passieren?

### Modul 2: Implementierung & Methoden
*   **Ziel**: Übergabe der Struktur per Zeiger an eine FFI-Funktion.
*   **Deine Aufgabe**: Deklariere eine FFI-Funktion, die einen Zeiger auf Dein Struct (entweder `*const` oder `*mut`) erwartet und Modifikationen oder Berechnungen darauf ausführt. Alternativ kannst du eine Rust-Funktion mit `#[no_mangle] extern "C"` schreiben, die als C-Funktion agiert. Implementiere die sichere Kapselung, indem Du eine Methode auf Deiner Rust-Struktur anbietest, die sich selbst als Zeiger an die FFI-Funktion übergibt.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Ausführen der Integration und Validierung der Felddaten.
*   **Deine Aufgabe**: Initialisiere Deine Struktur in `main.rs` mit Testwerten. Übergib sie an die FFI-Funktion und überprüfe anschließend, ob die Funktion die Werte wie erwartet gelesen oder manipuliert hat. Schreibe Unittests, die sicherstellen, dass das Speicherlayout und die Datenübergabe fehlerfrei funktionieren.

---

## Projekt 44: C-Speicherallokation mit malloc
Reserviere Speicher mithilfe der C-Funktion malloc und gib ihn mit free wieder frei.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Verständnis der rohen Speicherallokation und der Typ-Repräsentation.
*   **Deine Aufgabe**: Mache dich mit rohen Zeigern (`*mut c_void` bzw. typisierten Zeigern `*mut T`) in Rust verraut. Überlege, wie Du die benötigte Speichergröße unter Verwendung von `std::mem::size_of` berechnest. Wie verhalten sich Allokationen ohne Typenbindung im Vergleich zu Rusts nativem `std::alloc::Layout`?

### Modul 2: Implementierung & Methoden
*   **Ziel**: Allokation, Initialisierung und Deallokation im `unsafe`-Block.
*   **Deine Aufgabe**: Deklariere die Signaturen von `malloc` und `free` im FFI-Block. Schreibe eine sichere Rust-Funktion, die ein Array einer bestimmten Größe auf dem Heap via `malloc` anlegt. Achte akribisch darauf, den zurückgegebenen Zeiger auf `null` zu prüfen, bevor du darauf zugreifst. Schreibe Daten über den dereferenzierten Zeiger in den alloziierten Speicher und stelle sicher, dass dieser Speicher in einer sicheren Weise wieder mit `free` freigegeben werden kann.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: RAII-Muster implementieren und Speicherlecks verhindern.
*   **Deine Aufgabe**: Kapsle den alloziierten C-Speicher in einer benutzerdefinierten Rust-Struktur, die das `Drop`-Trait implementiert. Im `drop`-Aufruf muss die FFI-Funktion `free` aufgerufen werden. Demonstriere in `main.rs`, dass der Speicher automatisch freigegeben wird, wenn die Struktur den Scope verlässt. Schreibe Tests, die diese Speicherbereinigung und den korrekten Datenzugriff verifizieren.

---

## Projekt 45: Umgebungsvariablen über getenv
Rufe die C-Funktion getenv auf, um den Wert einer Umgebungsvariable direkt abzufragen.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Lebensdauer und Speicherstruktur von System-Umgebungsvariablen verstehen.
*   **Deine Aufgabe**: Analysiere die Signatur der C-Funktion `getenv`. Sie nimmt einen konstanten String-Zeiger entgegen und liefert einen String-Zeiger zurück. Überlege: Wem gehört der zurückgegebene Speicher? Darf dieser Speicher mit `free` freigegeben werden? Welcher Rust-Typ aus `std::ffi` eignet sich, um diesen geliehenen C-String sicher zu verpacken, ohne ihn zu kopieren?

### Modul 2: Implementierung & Methoden
*   **Ziel**: Sicheres Auslesen des Systemumgebung-Zeigers.
*   **Deine Aufgabe**: Deklariere `getenv` im FFI-Block. Schreibe eine sichere Rust-Funktion, die den Namen einer Umgebungsvariablen als `&str` übernimmt, diesen temporär in einen `CString` konvertiert und `getenv` aufruft. Behandle den Rückgabewert im `unsafe`-Block: Prüfe auf `null` (Variable existiert nicht) und wandle einen gültigen Zeiger sicher in ein `&CStr` und anschließend in einen Rust-String-Slice oder ein `String` um.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Integration, Testen und Vergleich mit die Standardbibliothek.
*   **Deine Aufgabe**: Frage in `main.rs` bekannte Variablen wie `PATH`, `USER` oder eine selbst definierte Variable ab. Gib das Ergebnis aus. Vergleiche die Funktionalität mit Rusts sicherer Implementierung `std::env::var`. Schreibe Tests für den Fall, dass eine nicht existierende Variable abgefragt wird, und stelle sicher, dass Dein Programm dabei nicht abstürzt.

---

## Projekt 46: Zeitmessung mit clock
Verwende den C-Systemaufruf clock, um einfache CPU-Zeitmessungen durchzuführen.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Definition plattformspezifischer FFI-Typen für Zeitwerte.
*   **Deine Aufgabe**: Ermittle, welcher Typ in Rust der C-Definition von `clock_t` entspricht (oft `c_long` oder ein plattformabhängiger Integer). Finde heraus, wie der Wert `CLOCKS_PER_SEC` in Deinem System definiert ist, um Ticks in Sekunden umrechnen zu können. Bereite die Definitionen in Deinem FFI-Modul vor.

### Modul 2: Implementierung & Methoden
*   **Ziel**: CPU-Zeitmessung kapseln und mathematisch konvertieren.
*   **Deine Aufgabe**: Deklariere die Funktion `clock` im FFI-Block. Implementiere eine Rust-Struktur oder -Hilfsfunktionen, die `clock` vor und nach einer rechenintensiven Operation (z.B. einer großen Schleife) aufrufen. Berechne die verstrichene CPU-Zeit im `unsafe`-Block und konvertiere das Ergebnis in Sekunden oder Millisekunden unter Verwendung von `CLOCKS_PER_SEC`.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Benchmark-Vergleich und Hauptprogramm.
*   **Deine Aufgabe**: Nutze Dein Zeitmessungs-Modul in `main.rs`, um eine rechenintensive Schleife zu bewerten. Vergleiche die gemessene CPU-Zeit mit den Werten von Rusts nativem `std::time::Instant` (das die reale Wandzeit misst). Diskutiere im Code-Kommentar den Unterschied zwischen CPU-Zeit und Wandzeit. Schreibe Tests, die sicherstellen, dass die Zeitdifferenz bei ruhendem Thread (z.B. durch `std::thread::sleep`) nicht oder kaum ansteigt.

---

## Projekt 47: Dynamisches Laden von Bibliotheken
Lade eine .so- oder .dll-Datei zur Laufzeit und rufe eine Funktion daraus auf, ohne sie fest einzulinken.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Datenstrukturen für OS-spezifische Bibliotheks-Handles definieren.
*   **Deine Aufgabe**: Erforsche die POSIX-Funktionen `dlopen`, `dlsym` und `dlclose` (oder die Windows-Äquivalente `LoadLibrary` / `GetProcAddress`). Definiere ein opakes Handle für die geladene Bibliothek (z.B. als `*mut c_void`). Überlege, wie die Signatur des Funktionszeigers aussehen muss, den Du aus der Bibliothek laden möchtest.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Dynamisches Binden und Ausführen des Funktionszeigers.
*   **Deine Aufgabe**: Deklariere die FFI-Signaturen für das dynamische Laden. Schreibe eine Rust-Struktur `DynamicLibrary`, die den Pfad zur Bibliothek lädt. Verwende `unsafe`, um das Symbol der Zielfunktion über seinen Namen zu suchen und in einen typisierten Rust-Funktionszeiger (mit der korrekten ABI `extern "C"`) zu casten. Stelle sicher, dass die Funktion sicher aufgerufen werden kann.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Lebenszyklus-Management der Bibliothek und Tests.
*   **Deine Aufgabe**: Implementiere `Drop` für `DynamicLibrary`, sodass `dlclose` aufgerufen wird, um Ressourcenlecks zu vermeiden. Erstelle eine einfache Shared Library (z.B. eine kleine C-Datei oder ein Rust-Projekt mit `crate-type = ["cdylib"]`), lade sie in `main.rs`, rufe die exportierte Funktion auf und verifiziere das Ergebnis.

---

## Projekt 48: Dateizugriff mit fopen und fread
Öffne und lies eine Datei unter direkter Verwendung der C-Standard-I/O-Bibliothek.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Opake Zeigertypen für C-Bibliotheks-Ressourcen definieren.
*   **Deine Aufgabe**: In C wird eine Datei durch einen Zeiger auf ein `FILE`-Objekt repräsentiert. Da Rust das Innenleben dieser Struktur nicht kennen muss, definiere einen opaken Typ (z.B. ein leeres Enum oder ein Struct) und verwende rohe Zeiger vom Typ `*mut FILE` für die FFI-Kommunikation. Bereite außerdem die C-Strings für die Dateipfade und den Dateimodus (z.B. `"r"`) vor.

### Modul 2: Implementierung & Methoden
*   **Ziel**: FFI-Aufrufe für I/O-Aktionen kapseln.
*   **Deine Aufgabe**: Deklariere `fopen`, `fread` und `fclose` im FFI-Block. Schreibe einen sicheren Rust-Wrapper, der eine Datei öffnet, Bytes in einen bereitgestellten Puffer liest und die Anzahl der tatsächlich gelesenen Bytes zurückgibt. Achte darauf, dass im `unsafe`-Block überprüft wird, ob `fopen` einen Nullzeiger zurückgegeben hat, und wirf im Fehlerfall ein entsprechendes Rust-Resultat.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Datei-Reader-Integration und automatische Freigabe.
*   **Deine Aufgabe**: Implementiere ein Hauptprogramm, das eine Testdatei öffnet, ihren Inhalt stückweise einliest und auf der Konsole ausgibt. Implementiere das `Drop`-Trait für Deinen Datei-Wrapper, um sicherzustellen, dass die Datei über `fclose` geschlossen wird, sobald das Objekct ungültig wird. Schreibe Tests, die das Verhalten bei nicht existierenden Dateien prüfen.

---

## Projekt 49: C-Callbacks registrieren
Übergib eine Rust-Funktion als Callback-Zeiger an eine C-Bibliothek, die diese Funktion später aufruft.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Definition von FFI-kompatiblen Funktionszeigern und Kontexten.
*   **Deine Aufgabe**: Definiere den Typ eines Callbacks in Rust unter Verwendung der C-ABI: `extern "C" fn(user_data: *mut c_void, value: c_int)`. Überlege, wie ein beliebiger Rust-Kontext (z.B. eine Closure oder ein veränderbares Struct) als roher Zeiger (`*mut c_void`) übergeben und im Callback wieder sicher rekonstruiert werden kann.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Callback-Registrierung und sichere Ausführung im FFI-Kontext.
*   **Deine Aufgabe**: Deklariere eine FFI-Funktion, die den Funktionszeiger und den `user_data`-Zeiger registriert. Schreibe eine `extern "C"`-Hilfsfunktion in Rust, die als Brücke dient: Sie nimmt die Rohdaten entgegen, castet sie zurück in einen sicheren Rust-Typ (z.B. mittels `&mut T` oder einer Box) und führt die eigentliche Rust-Logik aus. Achte darauf, dass ein Panik-Absturz innerhalb des Callbacks die FFI-Grenze nicht überschreitet (nutze ggf. `std::panic::catch_unwind`).

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Integration im Hauptprogramm und Ereignis-Simulation.
*   **Deine Aufgabe**: Simuliere in `main.rs` den Callback-Mechanismus (oder nutze eine FFI-Bibliothek, die Ereignisse feuert). Registriere einen Callback, der den Zustand einer Rust-Variable im Hauptprogramm verändert. Gib das modifizierte Ergebnis aus. Schreibe Tests, die sicherstellen, dass der Zustandsübergang und das Casting fehlerfrei und ohne Speicherlecks funktionieren.

---

## Projekt 50: Fehlerbehandlung mit errno
Lies nach dem Fehlschlagen einer C-Funktion die globale C-Variable errno aus, um den genauen Fehlergrund zu ermitteln.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Thread-lokalen Zugriff auf C-Systemfehler definieren.
*   **Deine Aufgabe**: Erforsche, wie `errno` in C definiert ist. Da es sich meist um ein Thread-lokales Makro handelt, kann man in Rust nicht direkt eine statische Variable binden. Deklariere die plattformspezifische Hilfsfunktion, die die Adresse von `errno` liefert (z.B. `__errno_location` unter Linux/POSIX). Definiere die Fehlercodes als sprechende Konstanten oder ein Enum in Rust.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Auslesen von errno und Umwandlung in System-Fehlermeldungen.
*   **Deine Aufgabe**: Schreibe eine Funktion, die nach einem fehlgeschlagenen Systemaufruf den aktuellen Wert von `errno` im `unsafe`-Block ausliest. Deklariere außerdem die C-Funktion `strerror`, um den Fehlercode in einen lesbaren FFI-String (`*const c_char`) zu übersetzen, und konvertiere diesen in einen sicheren Rust-String.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Fehlererzeugung, Fehlerdiagnose und Tests.
*   **Deine Aufgabe**: Schreibe ein Programm in `main.rs`, das absichtlich einen Fehler provoziert (z.B. das Öffnen einer nicht existierenden Datei über `fopen` oder das Senden an einen ungültigen Socket). Lies sofort nach dem Fehlschlag `errno` aus, übersetze den Fehler und gib ihn strukturiert aus. Erstelle Unittests, die das Verhalten bei erfolgreichen vs. fehlerhaften FFI-Aufrufen verifizieren.

---

## Projekt 51: Sortieren mit qsort
Nutze die C-Standardfunktion qsort und übergib ihr ein Rust-Array sowie eine Vergleichsfunktion.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Signatur von qsort und die Struktur der Vergleichsfunktion verstehen.
*   **Deine Aufgabe**: Analysiere die Signatur von `qsort` in C. Sie benötigt das Array, die Anzahl der Elemente, die Elementgröße und einen Funktionszeiger zur Auswertung. Definiere die Signatur der Vergleichsfunktion in Rust: `extern "C" fn(*const c_void, *const c_void) -> c_int`. Achte darauf, dass die Elemente im Speicher sequentiell angeordnet sein müssen.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Implementierung der Vergleichsfunktion und FFI-Aufruf.
*   **Deine Aufgabe**: Deklariere `qsort` im FFI-Block. Schreibe die `extern "C"`-Vergleichsfunktion in Rust. Verwende im Rumpf dieser Funktion `unsafe`, um die rohen Zeiger wieder in Referenzen auf Deine Rust-Typen (z.B. `&i32`) umzuwandeln. Rufe `qsort` auf einem mutable Slice eines Rust-Vektors oder -Arrays auf.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Sortier-Benchmark und Integration.
*   **Deine Aufgabe**: Erstelle in `main.rs` ein unsortiertes Array mit Zahlen. Sortiere dieses mithilfe Deiner `qsort`-Kapselung. Gib das sortierte Array aus und vergleiche das Ergebnis mit der nativen Rust-Methode `.sort()`. Schreibe Unittests, um die Stabilität bei leeren Arrays oder Arrays mit gleichen Elementen zu prüfen.

---

## Projekt 52: C-Union in Rust abbilden
Erstelle eine Rust-Struktur unter Verwendung des Schlüsselworts union und greife auf deren Felder zu.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Speicherlayout und syntaktische Struktur von Unions definieren.
*   **Deine Aufgabe**: Mache dich mit dem Schlüsselwort `union` in Rust vertraut. Definiere eine Union, die verschiedene Interpretationen desselben Speicherbereichs ermöglicht (z.B. 4 Bytes, die entweder als ein `u32`, zwei `u16` oder ein Array von vier `u8` gelesen werden können). Verwende `#[repr(C)]`, um das exakte C-Speicherlayout sicherzustellen.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Sicherer Zugriff und Kapselung der Union-Felder.
*   **Deine Aufgabe**: Da das Lesen von Union-Felder in Rust immer `unsafe` ist (weil der Compiler die Gültigkeit des aktiven Feldes nicht prüfen kann), schreibe eine sichere Wrapper-Struktur oder Methoden um die Union herum. Biete typsichere Lese- und Schreiboperationen an, die die unsafe-Details vor dem Benutzer verbergen.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Datentyp-Konvertierung und Testen im Hauptprogramm.
*   **Deine Aufgabe**: Initialisiere Deine Union in `main.rs`. Schreibe Werte in ein Feld (z.B. den `u32`-Wert) und lies die Bytes über das `u8`-Array-Feld aus, um die Byte-Reihenfolge (Endianness) Deines Systems zu demonstrieren. Schreibe Tests, die die korrekte Adressierung und das Speicherlayout der Union validieren.

---

## Projekt 53: Zufallszahlen mit rand
Rufe die C-Funktionen srand und rand auf, um Pseudozufallszahlen zu generieren.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Schnittstellen-Definition für System-Zufallsgeneratoren.
*   **Deine Aufgabe**: Informiere dich über die Signaturen von `srand` (Samenwert-Initialisierung) und `rand` (Generierung) in der C-Standardbibliothek. Welche C-Typen werden für den Seed (`unsigned int`) und das Ergebnis (`int`) benötigt? Deklariere diese FFI-Schnittstellen in Rust unter Verwendung passender plattformübergreifender Typen aus `std::os::raw`.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Zustandskapselung und sichere Generierungsmethoden.
*   **Deine Aufgabe**: Deklariere `srand` und `rand` im FFI-Block. Kapsle diese in einem Rust-Struct `CRng`. Implementiere eine Methode `new(seed: u32)`, die `srand` aufruft, und eine Methode `next() -> i32`, die `rand` aufruft. Verwende `unsafe` intern und biete eine sichere Schnittstelle nach außen an.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Simulation, Ausgabe und Testen der Zufälligkeit.
*   **Deine Aufgabe**: Initialisiere Deinen Generator in `main.rs` unter Verwendung der aktuellen Systemzeit (z.B. über `std::time::SystemTime`) als Seed. Erzeuge eine Sequenz von Zufallszahlen und gib sie aus. Schreibe Tests, die sicherstellen, dass bei gleichem Seed auch exakt die gleiche Zahlenfolge generiert wird.

---

## Projekt 54: Speicherbereiche vergleichen mit memcmp
Vergleiche zwei Speicherbereiche direkt auf Byte-Ebene mithilfe der C-Funktion memcmp.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Zeigertypen und Längenparameter für Speicher-FFI definieren.
*   **Deine Aufgabe**: Analysiere die Signatur von `memcmp` in C. Sie benötigt zwei konstante Zeiger (`*const c_void`) und eine Bytegröße (`size_t`). Ermittle, wie Du diese Typen in Rust repräsentierst. Verstehe, warum die Typsicherheit bei rohen Zeigern umgangen wird und wie wir die Korrektheit der Längenangaben garantieren können.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Kapselung des Byte-Vergleichs für Rust-Slices.
*   **Deine Aufgabe**: Deklariere `memcmp` im FFI-Block. Schreibe eine sichere Rust-Funktion, die zwei beliebige Slices vom Typ `&[T]` entgegennimmt, deren Längen in Bytes berechnet (unter Beachtung von `std::mem::size_of`) und sie im `unsafe`-Block vergleicht. Stelle sicher, dass der Aufruf nur dann erfolgt, wenn beide Puffer groß genug für die angegebene Vergleichslänge sind.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Vergleichs-Benchmark, Integration und Validierung.
*   **Deine Aufgabe**: Vergleiche in `main.rs` verschiedene Datenstrukturen (z.B. Byte-Arrays, Integer-Arrays und Strings) auf Byte-Ebene. Gib aus, ob sie identisch, kleiner oder größer sind. Schreibe automatisierte Unittests, die Grenzfälle wie leere Slices und ungleiche Pufferlängen abdecken.

---

## Projekt 55: System-Hostname ermitteln
Rufe die POSIX-Funktion gethostname auf und konvertiere den erhaltenen Puffer in einen Rust-String.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Vorbereitung von Pufferstrukturen für Systeminformationen.
*   **Deine Aufgabe**: Erforsche die POSIX-Funktion `gethostname`. Sie schreibt den Hostnamen in einen bereitgestellten Puffer. Wie groß sollte dieser Puffer mindestens sein (Stichwort: `HOST_NAME_MAX` oder typischerweise 256 Bytes)? Bereite ein Byte-Array in Rust vor, das als Zielpuffer dient, und ermittle den passenden Integer-Typ für die Längenangabe.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Pufferbefüllung und String-Extraktion.
*   **Deine Aufgabe**: Deklariere `gethostname` im FFI-Block. Schreibe eine Rust-Funktion, die das vorbereitete Byte-Array initialisiert, einen Zeiger auf diesen Speicher (`*mut c_char`) im `unsafe`-Block an `gethostname` übergibt und den Rückgabewert auf Fehler prüft. Wandle den nun nullterminierten Puffer sicher in ein `&CStr` und anschließend in einen validen Rust-`String` um.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Integration und Fehlerbehandlung bei Pufferüberlauf.
*   **Deine Aufgabe**: Rufe die Hostnamen-Funktion in `main.rs` auf und präsentiere das Ergebnis. Wie reagiert Dein Code, wenn der Puffer zu klein gewählt wurde? Baue eine entsprechende Fehlerbehandlung ein. Verifiziere das Ergebnis, indem Du es mit der Standardbibliothek (falls vorhanden) oder Umgebungsvariablen abgleichst.

---

## Projekt 56: Formatierte Ausgabe mit printf
Deklariere und nutze die variadische C-Funktion printf (Funktionen mit variabler Argumentanzahl).

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Deklaration variadischer FFI-Funktionssignaturen.
*   **Deine Aufgabe**: C-Funktionen wie `printf` erlauben eine variable Anzahl an Argumenten (gekennzeichnet durch `...` in C). Recherchiere, wie Rust variadische FFI-Funktionen deklariert (z.B. `extern "C" fn(format: *const c_char, ...) -> c_int`). Beachte das Speicherlayout des Formatstrings: Er muss als nullterminierter C-String vorliegen.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Sichere Argumentübergabe und Vermeidung von Format-String-Lücken.
*   **Deine Aufgabe**: Deklariere `printf` im FFI-Block. Schreibe eine sichere Rust-Schnittstelle. Achtung: Übergib niemals unkontrollierte Rust-Strings direkt als Formatstring an `printf` (Sicherheitsrisiko!). Verwende einen festen C-Format-String und übergebe die Werte (z.B. Integer, Floats, C-String-Zeiger) kontrolliert im `unsafe`-Block.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Integration, Testen verschiedener Format-Typen und Ausgabe.
*   **Deine Aufgabe**: Gib in `main.rs` verschiedene formatierte Zeilen aus (z.B. Zahlenwerte, Gleitkommazahlen und Text). Vergleiche das Verhalten mit Rusts nativem `println!`. Schreibe Tests, die sicherstellen, dass Sonderzeichen und Formatierungsanweisungen korrekt interpretiert werden.

---

## Projekt 57: Komprimierung mit zlib
Binde die populäre zlib-Bibliothek ein, um Daten direkt im Speicher zu komprimieren.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Nachbildung komplexer C-Kontrollstrukturen und Ströme.
*   **Deine Aufgabe**: Untersuche die `z_stream`-Struktur aus der `zlib`-Bibliothek. Definiere diese Struktur in Rust unter Verwendung von `#[repr(C)]` und den passenden FFI-Typen. Achte auf die exakte Feldreihenfolge, da sonst Speicherzugriffsfehler vorprogrammiert sind. Informiere dich über die benötigten Status- und Steuerungs-Konstanten.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Steuerung des Kompressionszyklus über FFI-Funktionsaufrufe.
*   **Deine Aufgabe**: Deklariere die Kernfunktionen `deflateInit_`, `deflate` und `deflateEnd` im FFI-Block. Implementiere eine sichere Kapselung in Rust, die einen Eingabepuffer Schritt für Schritt komprimiert und in einen Ausgabepuffer schreibt. Steuere den Lebenszyklus des `z_stream` im `unsafe`-Block und behandle zlib-spezifische Rückgabecodes (wie `Z_OK`, `Z_STREAM_END`).

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: RAII-Bereinigung, Kompressions-Benchmark und Tests.
*   **Deine Aufgabe**: Implementiere `Drop` für Dein Kompressions-Struct, um sicherzustellen, dass `deflateEnd` aufgerufen und zlib-interner Speicher freigegeben wird. Schreibe ein Hauptprogramm in `main.rs`, das einen längeren Text komprimiert, die Kompressionsrate berechnet und ausgibt. Teste die Funktionalität mit leeren Datenströmen.

---

## Projekt 58: SQLite-Datenbank abfragen
Binde die C-API von SQLite ein, öffne eine Datenbank im Speicher und führe eine Abfrage aus.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Repräsentation von Datenbank- und Statement-Handles.
*   **Deine Aufgabe**: SQLite verwendet opake Handles für die Verbindung (`sqlite3`) und für vorbereitete SQL-Statements (`sqlite3_stmt`). Definiere diese in Rust als opake Typen und verwende rohe Zeiger wie `*mut sqlite3`. Lege die nötigen Status-Konstanten fest (z.B. `SQLITE_OK`, `SQLITE_ROW`, `SQLITE_DONE`).

### Modul 2: Implementierung & Methoden
*   **Ziel**: Transaktionssteuerung, Vorbereitung und Auswertung von Statements.
*   **Deine Aufgabe**: Deklariere die C-Funktionen `sqlite3_open`, `sqlite3_prepare_v2`, `sqlite3_step`, `sqlite3_column_text` und `sqlite3_close` im FFI-Block. Implementiere eine sichere Rust-Struktur `SqliteConnection`, die eine In-Memory-Datenbank öffnet, ein einfaches Query-Statement vorbereitet, zeilenweise ausliest und die Spaltenwerte im `unsafe`-Block in sichere Rust-Strings konvertiert.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Ressourcenfreigabe bei Fehlern und Datenbank-Integration.
*   **Deine Aufgabe**: Implementiere die automatische Ressourcenfreigabe über `Drop` (Aufruf von `sqlite3_finalize` auf Statements und `sqlite3_close` auf der Verbindung). Erstelle in `main.rs` eine Tabelle, füge Testdatensätze ein und frage diese ab. Behandle potenzielle SQL-Syntaxfehler oder Verbindungsausfälle robust.

---

## Projekt 59: Netzwerk-Sockets auf Systemebene
Erstelle einen Socket über die C-Funktion socket und verbinde dich mit einem Server.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Spiegelung von POSIX-Netzwerk- und Adressstrukturen.
*   **Deine Aufgabe**: Erforsche die POSIX-Strukturen `sockaddr` und `sockaddr_in`. Definiere diese Typen in Rust unter Verwendung von `#[repr(C)]`. Achte auf die korrekten Byte-Orders für Portnummern und IP-Adressen (Stichwort: Network Byte Order / Big Endian vs. Host Byte Order). Verwende Rusts native Typen wie `in_addr` oder richte die Rohbytes manuell aus.

### Modul 2: Implementierung & Methoden
*   **Ziel**: Socket-Lebenszyklus und Netzwerk-I/O im unsafe-Kontext.
*   **Deine Aufgabe**: Deklariere die Systemaufrufe `socket`, `connect`, `send`, `recv` und `close` (oder `closesocket` unter Windows) im FFI-Block. Schreibe einen sicheren Rust-Wrapper `TcpSocket`, der den Socket erstellt und eine Verbindung zu einer Zieladresse herstellt. Implementiere das Senden und Empfangen von Daten über rohe Puffer im `unsafe`-Block und fange Fehler über `errno` ab.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: HTTP-Client-Verbindung und Socket-Schließung.
*   **Deine Aufgabe**: Implementiere `Drop` für `TcpSocket`, um den Socket sauber zu schließen. Schreibe ein Hauptprogramm in `main.rs`, das eine TCP-Verbindung zu einem Webserver aufbaut, eine einfache HTTP-Anfrage (z.B. `"GET / HTTP/1.0\r\n\r\n"`) sendet, die Antwort liest, auf der Konsole ausgibt und den Socket schließt. Teste das Verhalten bei nicht erreichbaren Servern.

---

## Projekt 60: C-Makros emulieren
Viele C-Header nutzen komplexe Makros. Implementiere ein solches Makro als Rust-Funktion oder -Konstante nach, um die Funktionalität für Rust-Nutzer verfügbar zu machen.

### Modul 1: Basis-Datenstrukturen
*   **Ziel**: Analyse und Abstraktion von C-Präprozessor-Logik.
*   **Deine Aufgabe**: Wähle ein komplexes C-Makro aus (z.B. Bitmanipulations-Makros wie `FD_SET`, Netzwerk-Konvertierungen wie `htonl` / `ntohl` oder mathematische Formeln). Analysiere, wie das Makro in C implementiert ist. Welche Datentypen sind involviert und welche Speicherbereiche oder Bitmasken werden modifiziert?

### Modul 2: Implementierung & Methoden
*   **Ziel**: Typsichere Nachbildung der Makro-Logik in Rust.
*   **Deine Aufgabe**: Implementiere die Logik des C-Makros als Rust-Funktion (nutze nach Möglichkeit `const fn` für Compile-Zeit-Auswertungen) oder als Rust-Makro (`macro_rules!`). Nutze Rusts Typsystem, um Typsicherheitsgarantien zu geben, die das ursprüngliche C-Makro (das oft nur auf rohen Typen oder textueller Ersetzung basiert) nicht bieten konnte.

### Modul 3: Vollendung & Hauptprogramm
*   **Ziel**: Vergleichende Tests und Integration.
*   **Deine Aufgabe**: Binde Deine emulierten Makros/Funktionen in `main.rs` ein. Schreibe ausführliche Unittests, die die Ausgaben Deiner Rust-Nachbildung mit den Ausgaben des echten C-Makros (z.B. über ein kleines FFI-Testprogramm, das das Original-Makro aufruft) vergleichen. Teste insbesondere Grenzfälle wie Integer-Überläufe oder ungültige Bitmasken.


# Phase 9: Rust-Bibliotheken für C exportieren (Teil 4) - Projekte 61 bis 80

Dieses Dokument enthält für jedes der 20 Projekte aus Phase 9 genau drei modulare Präzisions-Prompts auf Deutsch in der anfängerfreundlichen "Du"-Form. Die Prompts sind didaktisch aufgebaut und nehmen keine fertigen Codelösungen vorweg, sondern leiten dich konzeptionell an.

---

## 61. Einfache Additionsfunktion exportieren

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe die Grundlagen der ABI-Kompatibilität und des Datentyp-Mappings zwischen Rust und C.
* **Konzeptuelle Hinweise**:
  * Beschäftige dich mit der Calling Convention und wie Rust-Funktionen für C lesbar gemacht werden (`extern "C"`).
  * Recherchiere, wie primitive Datentypen (z. B. vorzeichenbehaftete 32-Bit-Integer) in Rust und C aufeinander abgebildet werden. Warum sind hier keine komplexen Layouts wie `#[repr(C)]` nötig?
  * Überlege dir, wie du eine Bibliotheks-Kiste (`lib`) in Rust aufbaust, die als dynamische Bibliothek (`cdylib`) kompiliert werden kann. Welche Einstellungen in der `Cargo.toml` sind dafür erforderlich?

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere und exportiere die Additionsfunktion, sodass sie von C aufgerufen werden kann.
* **Konzeptuelle Hinweise**:
  * Nutze das Attribut `#[no_mangle]`, um die Namensverstümmelung durch den Rust-Compiler zu unterdrücken. Warum ist das für den C-Linker wichtig?
  * Deklariere eine öffentliche Funktion mit der passenden FFI-Signatur (`pub extern "C" fn`).
  * Implementiere die Additionslogik. Warum ist dieser FFI-Aufruf im Gegensatz zu vielen anderen FFI-Operationen vollkommen sicher und benötigt keinen `unsafe`-Block?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Kompiliere die Bibliothek und simuliere den Aufruf aus einem C-Programm.
* **Konzeptuelle Hinweise**:
  * Erstelle ein minimales C-Quellcode-Beispiel, das die exportierte Funktion mittels `extern` deklariert.
  * Verwende den Rust-Compiler oder Cargo, um die `.so`, `.dll` oder `.dylib` zu bauen.
  * Erkläre, wie man das C-Programm mit der erzeugten Rust-Bibliothek verlinkt und ausführt, um das Ergebnis auf der Konsole auszugeben.

---

## 62. Rust-String an C übergeben

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe die fundamentalen Unterschiede im Speicherlayout von Rust-Strings und C-Strings.
* **Konzeptuelle Hinweise**:
  * Vergleiche das Layout eines Rust-`String` (Zeiger, Länge, Kapazität, UTF-8 ohne Null-Terminator) mit einem klassischen C-String (Null-terminiertes Char-Array).
  * Untersuche das Modul `std::ffi` und die Typen `CString` und `CStr`. Welcher Typ ist für die Erstellung und den Besitz eines FFI-kompatiblen Strings zuständig?
  * Lerne das Layout des rohen Zeigers `*const std::os::raw::c_char` kennen.

### Modul 2: Implementierung & Methoden
* **Ziel**: Erstelle eine Rust-Funktion, die einen String alloziert und einen FFI-sicheren Zeiger exportiert.
* **Konzeptuelle Hinweise**:
  * Erzeuge einen Rust-String und konvertiere ihn in ein `CString`. Achte auf mögliche Fehler (z. B. Null-Bytes im Rust-String).
  * Nutze die Methode `CString::into_raw`, um den Besitz des Speichers explizit an die aufrufende Umgebung zu übertragen. Warum verhindert dies, dass Rust den Speicher am Ende der Funktion freigibt?
  * Versehe die Export-Funktion mit den Attributen `#[no_mangle]` und `pub extern "C"`.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Binde den exportierten String-Zeiger in ein C-Programm ein und teste das Verhalten.
* **Konzeptuelle Hinweise**:
  * Zeige auf, wie ein C-Programm den Zeiger empfangen und mit `printf` oder einer ähnlichen Funktion ausgeben kann.
  * Dokumentiere eindringlich, warum dieser Speicher ein Leck verursacht, wenn er nicht wieder kontrolliert freigegeben wird.
  * Schreibe einen Testfall, der den Zeiger erzeugt und dessen Korrektheit validiert.

---

## 63. C-String in Rust freigeben

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe das Konzept der Speicher-Ownership an FFI-Grenzen und warum Allocator-Mischung gefährlich ist.
* **Konzeptuelle Hinweise**:
  * Warum darf ein C-Programm Speicher, der von der Rust-Laufzeitumgebung (z. B. über `CString::into_raw`) alloziert wurde, niemals mit dem C-Standard-`free()` freigeben?
  * Beschäftige dich mit dem rohen Zeigertyp `*mut std::os::raw::c_char` und dessen Lebenszyklus.

### Modul 2: Implementierung & Methoden
* **Ziel**: Schreibe die Funktion `free_rust_string`, die den Speicher sicher dealloziert.
* **Konzeptuelle Hinweise**:
  * Deklariere eine Export-Funktion `pub extern "C" fn free_rust_string(ptr: *mut c_char)` mit `#[no_mangle]`.
  * Verwende einen `unsafe`-Block, um den rohen Zeiger mit `CString::from_raw` wieder in ein Rust-eigenes `CString`-Objekt zu überführen.
  * Erkläre, warum der Speicher automatisch und sicher freigegeben wird, sobald dieses rekonstruierte `CString`-Objekt das Ende seines Gültigkeitsbereichs (Scope) erreicht.
  * Implementiere eine Sicherheitsprüfung auf Null-Zeiger (`ptr.is_null()`), bevor du den Speicher rekonstruierst.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste den kompletten Lebenszyklus eines exportierten und wieder freigegebenen Strings.
* **Konzeptuelle Hinweise**:
  * Entwerfe ein Testszenario in Rust (oder über ein C-Test-Skript), das einen String anfordert, ihn verwendet und anschließend über `free_rust_string` wieder freigibt.
  * Nutze ein Werkzeug wie Valgrind oder den AddressSanitizer, um zu überprüfen, dass nach der Ausführung keine Speicherlecks oder ungültigen Speicherzugriffe (Use-after-free) vorliegen.

---

## 64. Rust-Struct für C bereitstellen (Opaque Pointer)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe das Konzept des "Opaque Pointers" zur Kapselung von Rust-Datenstrukturen vor C.
* **Konzeptuelle Hinweise**:
  * Definiere eine Rust-Struktur `struct CustomObject` mit einigen internen Feldern. Warum muss dieses Struct für C nicht zwingend `#[repr(C)]` sein, wenn wir nur Zeiger darauf übergeben?
  * Erarbeite das Konzept, wie C ein unvollständiges Struct (`typedef struct CustomObject CustomObject;`) deklariert, um mit Zeigern darauf zu arbeiten, ohne deren inneren Aufbau zu kennen.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere Konstruktor-, Manipulations- und Destruktor-Funktionen für das opake Struct.
* **Konzeptuelle Hinweise**:
  * Schreibe eine Konstruktor-Funktion, die das Struct auf dem Heap alloziert und mittels `Box::into_raw(Box::new(obj))` als rohen Zeiger `*mut CustomObject` zurückgibt.
  * Erstelle Methoden, die den Zeiger entgegennehmen, ihn im `unsafe`-Block dereferenzieren (nach einem Null-Check) und Lese- oder Schreibzugriffe auf die inneren Felder durchführen.
  * Schreibe eine Freigabefunktion, die `Box::from_raw(ptr)` nutzt, um den Speicher des Structs kontrolliert zu zerstören.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Integriere die API und teste die Kapselung und Speicherbereinigung.
* **Konzeptuelle Hinweise**:
  * Simuliere den Ablauf aus C-Sicht: Objekt erzeugen, Methoden aufrufen, Zustand ändern und Objekt zerstören.
  * Vergewissere dich durch Unit-Tests in Rust, dass die Konvertierung von `Box` zu rohen Zeigern und zurück fehlerfrei funktioniert.
  * Dokumentiere, wie man mit ungültigen oder bereits freigegebenen Zeigern umgeht.

---

## 65. Fehlercodes an C zurückgeben

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwerfe C-kompatible Repräsentationen für Fehlerzustände.
* **Konzeptuelle Hinweise**:
  * Untersuche das Attribut `#[repr(C)]` für Enums in Rust. Wie stellst du sicher, dass die Diskriminantenwerte des Enums exakt den Ganzzahlen in C entsprechen?
  * Definiere ein Fehler-Enum mit verschiedenen Varianten (z. B. `Success`, `InvalidArgument`, `RuntimeError`).
  * Überlege, wie eine API aussehen muss, die sowohl einen Statuscode zurückgibt als auch das eigentliche Berechnungsergebnis über einen Out-Parameter (`*mut T`) bereitstellt.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere FFI-Funktionen, die Fehlercodes zurückgeben und Ergebnisse sicher schreiben.
* **Konzeptuelle Hinweise**:
  * Schreibe eine FFI-Funktion, die Berechnungen durchführt, die fehlschlagen können (z. B. Division oder Parsen).
  * Nutze einen Out-Parameter als rohen Zeiger, um das Ergebnis zu transportieren. Verwende im `unsafe`-Block eine Prüfung, ob der Zeiger gültig (nicht null) ist, bevor du das Ergebnis dort hineinschreibst.
  * Gib im Erfolgsfall den Erfolgs-Fehlercode zurück, andernfalls den passenden spezifischen Fehlercode.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste die Fehlerbehandlungs-API unter verschiedenen Szenarien.
* **Konzeptuelle Hinweise**:
  * Schreibe Testfälle für den Erfolgsfall sowie für verschiedene Fehlerfälle (z. B. Division durch Null, Übergabe von Nullzeigern für den Out-Parameter).
  * Simuliere, wie ein C-Aufrufer die zurückgegebenen Fehlercodes auswertet und darauf reagiert.

---

## 66. Rust-Logger für C

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere die Datenstrukturen für den Empfang von Log-Nachrichten aus einer externen Umgebung.
* **Konzeptuelle Hinweise**:
  * Erstelle ein `#[repr(C)]` Enum für Log-Level (z. B. `Info`, `Warn`, `Error`), das mit Rusts `log::Level` kompatibel ist oder sich leicht darin konvertieren lässt.
  * Überlege, wie Log-Nachrichten als `*const std::os::raw::c_char` im Speicher strukturiert sein müssen.

### Modul 2: Implementierung & Methoden
* **Ziel**: Binde das Rust-Logging-Framework ein und exportiere die Log-Funktion.
* **Konzeptuelle Hinweise**:
  * Mit einem gängigen Rust-Logging-Crate (wie `log`) und initialisiere einen Logger innerhalb deiner Bibliothek.
  * Exportiere eine Funktion `pub extern "C" fn rust_log(level: LogLevel, message: *const c_char)`.
  * Verwende im `unsafe`-Block `std::ffi::CStr::from_ptr`, um den C-String sicher in ein Rust-`&str` zu konvertieren. Achte darauf, dass die Konvertierung fehlerfrei verläuft (Validierung von UTF-8).
  * Leite die Nachricht mit dem entsprechenden Log-Level an das Rust-Logging-System weiter.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste den Logger und verifiziere die Ausgabeformate.
* **Konzeptuelle Hinweise**:
  * Schreibe ein Testprogramm, das Log-Nachrichten über die FFI-Schnittstelle absetzt.
  * Stelle sicher, dass die Logs wie gewünscht auf der Standardausgabe oder in einer Logdatei protokolliert werden.
  * Teste das Verhalten bei der Übergabe von ungültigen UTF-8-Sequenzen im String.

---

## 67. Callback aus C empfangen und ausführen

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe die Darstellung von C-Funktionszeigern in Rust und deren Nullzeiger-Sicherheit.
* **Konzeptuelle Hinweise**:
  * Lerne, wie Funktionszeiger in Rust-FFI deklariert werden. Verwende die C-kompatible Signatur `extern "C" fn(i32)`.
  * Warum verpackt man FFI-Funktionszeiger in Rust in ein `Option<...>` (z. B. `Option<extern "C" fn(i32)>`)? Welche Rolle spielt die "Nullable Pointer Optimization" des Rust-Compilers hierbei?

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Funktion, die den Callback entgegennimmt und aufruft.
* **Konzeptuelle Hinweise**:
  * Exportiere eine Funktion `pub extern "C" fn execute_callback(callback: Option<extern "C" fn(i32)>, data: i32)`.
  * Nutze Pattern Matching (`if let Some(cb) = callback`), um zu prüfen, ob ein gültiger Funktionszeiger übergeben wurde.
  * Führe den Callback aus. Beachte, dass der Aufruf eines externen Funktionszeigers in Rust immer als `unsafe` gilt. Warum ist das so, und welche Sicherheitsgarantien musst du einhalten?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste den Callback-Mechanismus mit Rust- und C-Gegenstücken.
* **Konzeptuelle Hinweise**:
  * Schreibe in Rust eine Testfunktion mit `extern "C" fn`, die als Callback dient.
  * Übergib diese Testfunktion an deine Export-Schnittstelle und überprüfe, ob sie mit den korrekten Daten aufgerufen wird.
  * Simuliere den Fall, dass ein Null-Zeiger (`None`) übergeben wird, und stelle sicher, dass die API robust darauf reagiert und nicht abstürzt.

---

## 68. Rust-Array an C übergeben

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe das Speicherlayout von Arrays und Vektoren und deren Repräsentation in C.
* **Konzeptuelle Hinweise**:
  * Untersuche, wie Rust ein flaches Array (`[T; N]`) oder ein Slice (`&[T]`) im Speicher anordnet. Warum ist dieses Layout direkt zu C-Arrays kompatibel?
  * Verstehe, dass C keine dynamische Längenprüfung besitzt. Warum ist es zwingend notwendig, neben dem rohen Zeiger auf das erste Element (`*const T`) auch die Länge des Arrays (`size_t` bzw. `usize`) an C zu übergeben?

### Modul 2: Implementierung & Methoden
* **Ziel**: Exportiere ein Rust-Array mitsamt Längenangabe an C.
* **Konzeptuelle Hinweise**:
  * Erstelle ein Array auf dem Heap (z. B. `Box<[i32]>`) oder nutze ein statisches Array.
  * Verwende die Methoden `.as_ptr()` und `.len()`, um den Zeiger und die Anzahl der Elemente zu ermitteln.
  * Wenn das Array auf dem Heap liegt: Nutze `Box::into_raw`, um die automatische Freigabe zu verhindern, solange C auf die Daten zugreift.
  * Schreibe eine zugehörige Freigabefunktion für das Array, um Speicherlecks zu vermeiden.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Simuliere den lesenden Zugriff von C auf das exportierte Rust-Array.
* **Konzeptuelle Hinweise**:
  * Zeige, wie ein C-Programm über den erhaltenen Zeiger iteriert, um die Elemente auszulesen.
  * Teste das Zusammenspiel von Array-Erzeugung, Übergabe und anschließender Freigabe in Rust.
  * Verwende Tools zur Speicheranalyse, um sicherzustellen, dass keine Out-of-Bounds-Zugriffe oder Lecks stattfinden.

---

## 69. C-Array in Rust verarbeiten

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Lerne das Layout von C-Arrays kennen und bereite den Import in Rust vor.
* **Konzeptuelle Hinweise**:
  * Ein C-Array wird als roher Zeiger `*const T` zusammen mit einer Länge `len: usize` übergeben. Welche Annahmen über das Speicherlayout, die Ausrichtung (Alignment) und die Gültigkeit des Speichers musst du treffen?

### Modul 2: Implementierung & Methoden
* **Ziel**: Wandle den C-Zeiger in einen sicheren Rust-Slice um und verarbeite ihn.
* **Konzeptuelle Hinweise**:
  * Exportiere eine Funktion wie `pub extern "C" fn process_array(array: *const i32, len: usize) -> i32`.
  * Verwende im `unsafe`-Block die Funktion `std::slice::from_raw_parts`. Welche Bedingungen (Null-Zeiger, Alignment, Lebensdauer) müssen erfüllt sein, damit dieser Aufruf kein undefiniertes Verhalten auslöst?
  * Berechne einen Wert auf dem erzeugten Rust-Slice (z. B. Summe oder Durchschnitt) mit sicheren, idiomatischen Rust-Methoden.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste die Array-Verarbeitungsfunktion mit verschiedenen Eingabedaten.
* **Konzeptuelle Hinweise**:
  * Schreibe Tests, die ein Rust-Array erstellen, dessen rohen Zeiger extrahieren und an deine Export-Funktion übergeben.
  * Teste das Verhalten bei einer Länge von `0` oder bei Übergabe eines Nullzeigers. Wie verhinderst du einen Absturz in diesen Fällen?

---

## 70. Panic-Sicherheit an FFI-Grenzen

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe die Auswirkungen von Rust-Panics (Unwinding) an der ABI-Grenze.
* **Konzeptuelle Hinweise**:
  * Was passiert auf CPU- und Stack-Ebene, wenn eine Rust-Panic ausgelöst wird und versucht, über eine `extern "C"`-Grenze in ein C-Programm zurückzuspringen? Warum führt dies zu undefiniertem Verhalten (UB)?
  * Untersuche Strategien, wie man Panics abfangen kann. Welche Typen und APIs stellt die Standardbibliothek dafür bereit?

### Modul 2: Implementierung & Methoden
* **Ziel**: Sichere eine exportierte FFI-Funktion gegen Panics ab.
* **Konzeptuelle Hinweise**:
  * Nutze die Funktion `std::panic::catch_unwind`, um den potenziell panikauslösenden Rust-Code in einer Closure zu kapseln.
  * Beachte die Einschränkungen von `catch_unwind` bezüglich des `UnwindSafe`-Traits.
  * Übersetze das Ergebnis von `catch_unwind` (ein `Result<T, Box<dyn Any + Send>>`) in ein FFI-kompatibles Format (z. B. Rückgabe eines Fehlerstatus oder eines Standardwerts).

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste die Absicherung unter simulierten Panic-Bedingungen.
* **Konzeptuelle Hinweise**:
  * Schreibe einen Testfall, in dem der gekapselte Code absichtlich eine Panic auslöst (z. B. durch ein explizites `panic!()` oder einen Out-of-Bounds-Zugriff).
  * Verifiziere, dass das Programm nicht abstürzt, sondern die Panic abgefangen wird und ein definierter Fehlercode an den Aufrufer zurückgegeben wird.

---

## 71. Rust-Iterator für C

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwerfe eine Kapselungsstruktur für Rust-Iteratoren zur Nutzung in C.
* **Konzeptuelle Hinweise**:
  * Da C keine Generics oder Traits kennt, musst du einen Iterator hinter einer opaken Struktur verstecken.
  * Definiere ein Struct (z. B. `struct IntIterator`), das einen dynamischen Rust-Iterator (`Box<dyn Iterator<Item = i32>>`) hält.
  * Plane das FFI-Speicherlayout: Der Iterator wird als opaker Zeiger `*mut IntIterator` an C übergeben.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Schnittstellen für Initialisierung, Iteration und Freigabe.
* **Konzeptuelle Hinweise**:
  * Erstelle eine FFI-Funktion, die den Iterator auf dem Heap alloziert und als `*mut IntIterator` zurückgibt.
  * Schreibe die Iterationsfunktion: `pub extern "C" fn iterator_next(iter: *mut IntIterator, out_value: *mut i32) -> bool`. Dereferenziere im `unsafe`-Block den Iterator-Zeiger und rufe `.next()` auf.
  * Schreibe das Ergebnis bei Erfolg in `out_value` und gib `true` zurück. Wenn der Iterator erschöpft ist (`None`), gib `false` zurück.
  * Implementiere eine Freigabefunktion für den Iterator mittels `Box::from_raw`.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Simuliere die Iteration über eine Schleife im FFI-Kontext.
* **Konzeptuelle Hinweise**:
  * Erstelle ein Testszenario, das den Iterator aus Rust anfordert und in einer Schleife so lange `iterator_next` aufruft, bis die Funktion `false` zurückgibt.
  * Stelle sicher, dass der Iterator am Ende des Durchlaufs vollständig dealloziert wird.
  * Teste das Verhalten bei leeren Iteratoren.

---

## 72. Konfigurationen als Struct

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere ein flaches Konfigurations-Struct mit ABI-Kompatibilität.
* **Konzeptuelle Hinweise**:
  * Nutze das Attribut `#[repr(C)]` für dein Konfigurations-Struct. Warum ist die Reihenfolge der Felder im Speicher hierbei wichtig?
  * Verwende ausschließlich C-kompatible Typen für die Felder (z. B. `u32`, `bool`, und `*const c_char` für Zeichenketten). Warum sind Standard-Rust-Typen wie `String` oder `&str` hier unzulässig?

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere eine FFI-Funktion, die das Konfigurations-Struct einliest und verarbeitet.
* **Konzeptuelle Hinweise**:
  * Schreibe eine FFI-Funktion `pub extern "C" fn initialize_library(config: *const Config) -> bool`.
  * Prüfe im `unsafe`-Block, ob der übergebene Zeiger `config` gültig ist.
  * Lies die Felder des Structs aus. Falls Strings enthalten sind, wandle die rohen `*const c_char` Zeiger mittels `CStr::from_ptr` sicher in Rust-Strings um.
  * Nutze diese Werte zur Initialisierung deiner internen Rust-Bibliothekszustände.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Validiere die Konfigurationsübergabe mit korrekten und fehlerhaften Werten.
* **Konzeptuelle Hinweise**:
  * Simuliere die Erstellung des Structs auf C-Seite und dessen Übergabe an Rust.
  * Teste das Verhalten bei der Übergabe fehlerhafter Konfigurationen (z. B. Nullzeiger für Strings oder ungültige Wertebereiche) und implementiere entsprechende Fehlerprüfungen in Rust.

---

## 73. Asynchrone Tasks triggern

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere Strukturen zur Steuerung asynchroner Abläufe über FFI.
* **Konzeptuelle Hinweise**:
  * Überlege, wie ein asynchroner Task gestartet und dessen Fortschritt zurückgemeldet werden kann.
  * Definiere einen FFI-kompatiblen Callback-Typ für den Fortschritt: `extern "C" fn(f32)` (Fortschritt in Prozent).
  * Bereite die Einbindung einer asynchronen Runtime (z. B. `tokio` oder `async-std`) oder die manuelle Nutzung von OS-Threads vor.

### Modul 2: Implementierung & Methoden
* **Ziel**: Starte den asynchronen Task und führe Fortschritts-Callbacks aus.
* **Konzeptuelle Hinweise**:
  * Schreibe eine Export-Funktion `pub extern "C" fn start_async_task(callback: Option<extern "C" fn(f32)>)`.
  * Starte einen neuen Thread oder spawne einen Task auf der Runtime. Da der Callback über Thread-Grenzen hinweg transportiert werden muss, stelle sicher, dass er die Anforderungen für den Transfer erfüllt.
  * Führe im Hintergrund-Task Berechnungen durch und rufe periodisch im `unsafe`-Block den Callback auf, um den Fortschritt an den Aufrufer zu melden.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste den asynchronen Ablauf und die Synchronisation.
* **Konzeptuelle Hinweise**:
  * Implementiere einen Testaufruf, der den Task startet, einen Callback bereitstellt und auf das Ende des Tasks wartet.
  * Stelle sicher, dass die Anwendung nicht vorzeitig beendet wird, während der Hintergrund-Thread noch läuft.
  * Prüfe, ob der Callback im Erfolgsfall bis zu 100% (bzw. `1.0`) durchläuft.

---

## 74. Speicherstatistik exportieren

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwerfe Datenstrukturen zur Abfrage des Speicherverbrauchs.
* **Konzeptuelle Hinweise**:
  * Definiere ein Struct `MemoryStats` mit `#[repr(C)]`, das Felder wie `allocated_bytes`, `active_allocations` oder `deallocated_bytes` enthält.
  * Informiere dich über Rusts Global-Allocator-API. Wie kannst du einen Custom Allocator schreiben oder einbinden, der Statistiken über jede Allokation und Deallokation mitprotokolliert?

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Speicherabfrage und stelle sie C zur Verfügung.
* **Konzeptuelle Hinweise**:
  * Registriere deinen statistischen Allocator über das Attribut `#[global_allocator]`.
  * Exportiere eine Funktion `pub extern "C" fn get_memory_stats() -> MemoryStats`.
  * Lies im Rumpf dieser Funktion die aktuell erfassten Werte deines Allocators aus und gib die `MemoryStats`-Struktur per Wert (by value) zurück. Warum ist eine Rückgabe per Wert hier unproblematisch und ABI-kompatibel?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Validiere die Speicherstatistiken anhand gezielter Speicheroperationen.
* **Konzeptuelle Hinweise**:
  * Schreibe einen Testablauf: Frage die Statistik ab, führe eine größere Speicherallokation in Rust durch (z. B. einen großen Vektor), frage die Statistik erneut ab und überprüfe, ob der Wert angestiegen ist.
  * Dealloziere den Speicher wieder und prüfe, ob die Statistik dies korrekt widerspiegelt.

---

## 75. Globale Zustände verwalten

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Konzipiere die sichere Repräsentation eines globalen Zustands in Rust.
* **Konzeptuelle Hinweise**:
  * Da globale Variablen in Rust standardmäßig unsicher zu manipulieren sind, benötigst du sichere Abstraktionen.
  * Untersuche Mechanismen zur Thread-sicheren Initialisierung von globalen Daten wie `std::sync::OnceLock` oder externe Crates wie `lazy_static`.
  * Schütze den eigentlichen Zustand mit Synchronisations-Primitiven wie `Mutex` oder `RwLock`, um Datenrennen (Data Races) zu verhindern.

### Modul 2: Implementierung & Methoden
* **Ziel**: Schreibe FFI-Schnittstellen zur thread-sicheren Abfrage und Änderung des globalen Zustands.
* **Konzeptuelle Hinweise**:
  * Exportiere Funktionen wie `pub extern "C" fn set_global_value(val: i32)` und `pub extern "C" fn get_global_value() -> i32`.
  * Greife in den Funktionen auf das globale Element zu, sperre den Mutex und führe die Modifikationen oder Abfragen durch.
  * Denke an die Fehlerbehandlung, falls ein Mutex "poisoned" ist (wenn ein Thread mit gesperrtem Mutex eine Panic hatte). Wie gehst du damit um?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste den globalen Zustand unter concurrenten (parallelen) Zugriffen.
* **Konzeptuelle Hinweise**:
  * Simuliere den Zugriff aus mehreren Threads (in Rust-Tests oder einem C-Testprogramm) auf die globalen FFI-Funktionen.
  * Verifiziere, dass keine Race Conditions auftreten und die Werte konsistent verwaltet werden.

---

## 76. Generieren von C-Headern

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Bereite das Rust-Projekt für die automatische Header-Generierung vor.
* **Konzeptuelle Hinweise**:
  * Deklariere in deiner Bibliothek einige FFI-kompatible Structs, Enums und Funktionen mit den passenden Attributen (`#[repr(C)]`, `#[no_mangle]`, `extern "C"`).
  * Mache dich mit dem Tool `cbindgen` vertraut. Wie konfiguriert man dieses Tool über eine `cbindgen.toml` Datei?

### Modul 2: Implementierung & Methoden
* **Ziel**: Richte den Build-Prozess zur Header-Erstellung ein.
* **Konzeptuelle Hinweise**:
  * Erstelle ein Cargo-Build-Skript (`build.rs`).
  * Verwende die `cbindgen`-Bibliothek innerhalb von `build.rs`, um während des Kompilierungsprozesses (`cargo build`) den Rust-Quellcode zu parsen.
  * Schreibe den generierten C-Header in eine Ausgabedatei (z. B. `my_lib.h`) in deinem Projektverzeichnis.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Überprüfe und teste den generierten Header.
* **Konzeptuelle Hinweise**:
  * Inspiziere die generierte `.h`-Datei. Wurden alle Funktionen, Structs und Enums korrekt in C-Syntax übersetzt?
  * Binde den Header in ein C-Testprogramm ein und kompiliere dieses, um sicherzustellen, dass der C-Compiler keine Syntax- oder Typfehler meldet.

---

## 77. Rust-Vektor an C übertragen

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Zerlege einen Rust-Vektor in seine elementaren Bestandteile für C.
* **Konzeptuelle Hinweise**:
  * Ein `Vec<T>` besteht im Wesentlichen aus drei Werten: Einem Zeiger auf den Heap-Speicher (`*mut T`), einer Länge (`usize`) und einer Kapazität (`usize`).
  * Definiere ein FFI-kompatibles Transfer-Struct mit `#[repr(C)]` (z. B. `struct ByteBuf { data: *mut u8, len: usize, cap: usize }`), um diese Informationen gebündelt an C zu übergeben.

### Modul 2: Implementierung & Methoden
* **Ziel**: Schreibe die Exportfunktion, die den Vektor zerlegt und die Ownership abgibt.
* **Konzeptuelle Hinweise**:
  * Verwende die Methode `Vec::into_raw_parts` (oder eine äquivalente Methode, um Zeiger, Länge und Kapazität zu extrahieren und den Vektor mit `std::mem::forget` vor dem automatischen Drop zu schützen).
  * Befülle dein Transfer-Struct mit diesen Werten und gib es über eine `#[no_mangle] pub extern "C"` Funktion an C zurück.
  * Warum ist es wichtig, dass C die Kapazität des Vektors kennt?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Dokumentiere und simuliere die Übergabe und die Sicherheitsregeln.
* **Konzeptuelle Hinweise**:
  * Erkläre dem C-Entwickler, dass er zwar lesend und schreibend auf den Speicherbereich zugreifen, aber niemals versuchen darf, die Kapazität zu überschreiten oder den Speicher selbst mit C-Mitteln freizugeben.
  * Schreibe einen Testfall, der den Vektor zerlegt und die extrahierten Komponenten validiert.

---

## 78. Rust-Vektor aus C wiederherstellen

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe das exakte Gegenstück zur Vektor-Zerlegung und plane die Reallokation/Freigabe.
* **Konzeptuelle Hinweise**:
  * Um Speicherlecks zu verhindern, muss der an C übergebene Vektor wieder an Rust zurückgegeben werden.
  * Welche Parameter (Zeiger, Länge, Kapazität) müssen exakt mit den ursprünglichen Werten übereinstimmen, damit Rust den Speicher sicher freigeben kann?

### Modul 2: Implementierung & Methoden
* **Ziel**: Rekonstruiere den Vektor und dealloziere ihn kontrolliert.
* **Konzeptuelle Hinweise**:
  * Implementiere eine FFI-Funktion `pub extern "C" fn free_vector(ptr: *mut i32, len: usize, cap: usize)` mit `#[no_mangle]`.
  * Nutze im `unsafe`-Block `Vec::from_raw_parts`, um den Vektor wiederherzustellen. Welche Voraussetzungen bezüglich Speicher-Alignment und Allocator müssen hierbei zwingend erfüllt sein?
  * Lass den rekonstruierten Vektor am Ende der Funktion einfach aus dem Scope laufen, damit Rusts Drop-Mechanismus den Heap-Speicher dealloziert.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste den vollständigen Lebenszyklus von Vektoren über die FFI-Grenze.
* **Konzeptuelle Hinweise**:
  * Schreibe einen Testlauf: Vektor in Rust erzeugen -> Zerlegen und an FFI übergeben -> FFI-Komponenten an die Freigabefunktion übergeben -> Verifizieren, dass der Speicher bereinigt wurde.
  * Nutze Tools wie Miri oder Valgrind, um sicherzustellen, dass keine ungültigen Deallokationen (z. B. mit falscher Kapazität oder falschem Alignment) stattfinden.

---

## 79. Thread-Erzeugung in Rust für C

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Konzipiere die Übergabe von Callbacks und Argumenten für asynchrone Threads.
* **Konzeptuelle Hinweise**:
  * Um einen Thread in Rust zu starten, der C-Code ausführt, benötigst du einen C-Funktionszeiger (`extern "C" fn(*mut c_void)`) und einen opaken Argumenten-Zeiger (`*mut c_void`) für den Kontext.
  * Überlege, welche Thread-Safety-Bedingungen erfüllt sein müssen (z. B. Send/Sync für den Kontext-Zeiger).

### Modul 2: Implementierung & Methoden
* **Ziel**: Erstelle den Thread in Rust und führe den C-Callback darin aus.
* **Konzeptuelle Hinweise**:
  * Exportiere eine Funktion `pub extern "C" fn spawn_rust_thread(callback: extern "C" fn(*mut c_void), arg: *mut c_void)`.
  * Verwende `std::thread::spawn`.
  * Kapsle den Aufruf des C-Callbacks im neuen Thread in einer Closure. Führe den Aufruf des Callbacks im `unsafe`-Block aus. Warum ist das unsafe?
  * Achte darauf, wie der Thread-Handle verwaltet wird. Wird der Thread gejoint oder detached?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste die parallele Ausführung und die Synchronisation.
* **Konzeptuelle Hinweise**:
  * Schreibe eine Testumgebung, in der eine C-kompatible Funktion als Callback übergeben wird, die eine zeitintensive Aufgabe simuliert.
  * Implementiere Synchronisationsmechanismen (z. B. Joins oder Barrieren), damit das Hauptprogramm wartet, bis der erzeugte Thread seine Arbeit abgeschlossen hat.

---

## 80. Benutzerdefinierte Allocatoren

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Verstehe Rusts Allokations-Schnittstellen für benutzerdefinierte Speichermanager.
* **Konzeptuelle Hinweise**:
  * Untersuche den Trait `std::alloc::GlobalAlloc` und seine Methoden `alloc` und `dealloc`.
  * Überlege, wie ein Custom Allocator in Rust aufgebaut sein muss, der die eigentliche Speicherverwaltung an FFI-Callbacks (bereitgestellt von C) delegiert.
  * Definiere die C-kompatiblen Funktionszeiger-Signaturen für Allokation und Deallokation.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere den Custom Allocator und registriere ihn global.
* **Konzeptuelle Hinweise**:
  * Schreibe ein Struct, das `GlobalAlloc` implementiert. Dieses Struct leitet Speicheranforderungen an globale Funktionszeiger weiter.
  * Registriere diesen Allocator über das Attribut `#[global_allocator]`.
  * Exportiere FFI-Funktionen, mit denen der aufrufende C-Code die Zuweisungs-Callbacks (z. B. auf C's `malloc` und `free` oder einen Custom Allocator) zur Laufzeit setzen kann.
  * Beachte die Gefahren von Rekursionen im Allocator (z. B. Logging während der Allokation).

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste den Allocator mit benutzerdefinierten Speicherfunktionen.
* **Konzeptuelle Hinweise**:
  * Schreibe Testfälle, in denen du Test-Callbacks registrierst, die jede Speicheranforderung auf der Konsole ausgeben.
  * Alloziere und dealloziere Rust-Objekte (z. B. `Box` oder `Vec`) und überprüfe, ob deine registrierten C-Callbacks aufgerufen werden.
  * Stelle sicher, dass die Ausrichtung und die Größenangaben bei der Allokation und Deallokation korrekt übermittelt werden.


# Phase 9: Betriebssystem- & Hardware-Zugriffe (Teil 5) - Projekte 81 bis 100

Dieses Dokument enthält jeweils genau drei modulare Präzisions-Prompts für die Projekte 81 bis 100 aus Phase 9. Die Prompts sind didaktisch aufbereitet, richten sich an Einsteiger (freundliche "Du"-Form) und verzichten komplett auf fertige Codelösungen, um die eigene Problemlösungskompetenz zu stärken.

---

## Projekt 81: Direkter syscall unter Linux
*Ziel: Nutze die Funktion syscall aus der libc, um einen Systemaufruf (z. B. gettid für die Thread-ID) direkt ohne Wrapper auszuführen.*

*   **Modul 1: Basis-Datenstrukturen**
    Recherchiere die Funktionssignatur von `syscall` in der C-Bibliothek (libc). Welche Datentypen werden für die Systemaufruf-Nummer und die Argumente benötigt? Mache dich mit dem Crate `libc` vertraut und binde die Typen für plattformspezifische Ganzzahlen (wie `c_long`) ein.
*   **Modul 2: Implementierung & Methoden**
    Finde die konkrete Systemaufrufnummer für `gettid` auf deiner Zielarchitektur (z. B. x86_64) heraus. Schreibe eine Funktion, die diesen Systemaufruf in einem `unsafe`-Block über `libc::syscall` absetzt. Wie gehst du mit dem Rückgabetyp und potenziellen Fehlern (Rückgabewert -1) um?
*   **Modul 3: Vollendung & Hauptprogramm**
    Integriere den Aufruf in `main.rs` und gib die erhaltene Thread-ID aus. Vergleiche das Ergebnis mit der Thread-ID, die Rusts Standardbibliothek liefert. Schreibe Tests, die sicherstellen, dass der Systemaufruf in einem Multi-Threading-Szenario für jeden Thread eine eindeutige ID zurückgibt.

---

## Projekt 82: Windows-MessageBox
*Ziel: Rufe die Win32-API-Funktion MessageBoxW auf, um ein natives Windows-Dialogfenster anzuzeigen. (UTF-16-Strings)*

*   **Modul 1: Basis-Datenstrukturen**
    Analysiere die Parameter von `MessageBoxW` in der Win32-Dokumentation. Wie unterscheidet sich die Repräsentation von Unicode-Strings in Windows (UTF-16, nullterminiert, `*const u16`) von Rusts Standard-Strings? Verwende `std::os::windows::ffi::OsStrExt`, um Rust-Strings in nullterminierte UTF-16-Vektoren zu konvertieren.
*   **Modul 2: Implementierung & Methoden**
    Deklariere die FFI-Signatur für `MessageBoxW` unter Verwendung des Crates `windows-sys` oder durch direkte `extern "system"`-Deklarationen. Implementiere eine sichere Rust-Funktion, die Titel und Text als `&str` übernimmt, die UTF-16-Konvertierung durchführt und die MessageBox in einem `unsafe`-Block öffnet.
*   **Modul 3: Vollendung & Hauptprogramm**
    Erstelle das Hauptprogramm in `main.rs` (dieses Projekt läuft nativ nur unter Windows, nutze bedingte Kompilierung `#[cfg(target_os = "windows")]`). Zeige ein Dialogfeld an und werte den Rückgabewert (z. B. welche Schaltfläche gedrückt wurde) im Hauptprogramm aus.

---

## Projekt 83: Memory-Mapped Files (mmap)
*Ziel: Verwende den mmap-Systemaufruf, um eine Datei direkt in den virtuellen Adressraum deines Prozesses zu laden und als Byte-Slice zu lesen.*

*   **Modul 1: Basis-Datenstrukturen**
    Beschäftige dich mit dem POSIX-Systemaufruf `mmap` und den zugehörigen Flags (`PROT_READ`, `MAP_PRIVATE`). Welche Typen und Argumente (Dateideskriptor, Länge, Offsets) werden benötigt? Wie sieht das Speicherlayout aus, wenn eine Datei direkt im Speicher abgebildet wird?
*   **Modul 2: Implementierung & Methoden**
    Öffne eine Datei und hole ihren Dateideskriptor (unter Unix via `.as_raw_fd()`). Rufe in einem `unsafe`-Block `libc::mmap` auf. Prüfe sorgfältig, ob der Aufruf fehlgeschlagen ist (Rückgabewert `MAP_FAILED`). Wandle den erhaltenen rohen Zeiger mit `std::slice::from_raw_parts` in einen sicheren Rust-Byte-Slice (`&[u8]`) um.
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe eine sichere Kapselung, die im `Drop`-Trait das Unmapping mittels `libc::munmap` durchführt. Lies den Dateiinhalt über den Slice aus und gib ihn aus. Teste das Verhalten mit verschiedenen Dateigrößen und stelle sicher, dass bei leeren Dateien kein ungültiger Adresszugriff erfolgt.

---

## Projekt 84: Prozess-ID (PID) ermitteln
*Ziel: Rufe das POSIX getpid oder die entsprechende Windows-API auf, um die eigene Prozess-ID direkt vom Betriebssystem abzufragen.*

*   **Modul 1: Basis-Datenstrukturen**
    Ermittle die Signatur der Funktion `getpid` aus der libc (oder `GetCurrentProcessId` aus der Win32-API). Welche Typen (z. B. `pid_t` oder `DWORD`) werden plattformspezifisch zurückgegeben?
*   **Modul 2: Implementierung & Methoden**
    Implementiere eine plattformübergreifende Abfrage mit bedingter Kompilierung (`cfg`). Rufe die FFI-Funktion in einem `unsafe`-Block auf und verpacke sie in eine sichere Rust-Funktion, die einen standardisierten Ganzzahltyp zurückgibt.
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe das Hauptprogramm in `main.rs`, gib deine eigene PID aus und vergleiche sie mit dem Ergebnis von `std::process::id()`. Schreibe einen Test, um zu prüfen, ob die ID plausibel (größer als 0) ist.

---

## Projekt 85: Terminal-Größe abfragen
*Ziel: Nutze den Systemaufruf ioctl mit der Konstante TIOCGWINSZ, um die aktuelle Breite und Höhe deines Terminalfensters in Byte-Strukturen auszulesen.*

*   **Modul 1: Basis-Datenstrukturen**
    Definiere das Struct `winsize` (mit den Feldern für Zeilen, Spalten und Pixelmaße) gemäß der POSIX-Spezifikation und nutze `#[repr(C)]`. Finde den numerischen Wert der Konstante `TIOCGWINSZ` für dein Betriebssystem heraus.
*   **Modul 2: Implementierung & Methoden**
    Rufe `libc::ioctl` in einem `unsafe`-Block auf und übergib den Standard-Output-Dateideskriptor (1) sowie eine veränderliche Referenz auf deine `winsize`-Struktur. Behandle potenzielle Fehlercodes, die von `ioctl` zurückgegeben werden.
*   **Modul 3: Vollendung & Hauptprogramm**
    Präsentiere die ermittelten Zeilen und Spalten in `main.rs`. Teste das Programm, indem du die Terminalgröße im Terminal manuell veränderst und das Programm erneut ausführst.

---

## Projekt 86: CPU-Features abfragen
*Ziel: Verwende Inline-Assembly (asm!) oder CPUID-Befehle über Unsafe, um spezifische Prozessor-Features (wie AVX oder SSE) direkt abzufragen.*

*   **Modul 1: Basis-Datenstrukturen**
    Lerne die Funktionsweise des x86/x86_64-Assemblerbefehls `cpuid` kennen. Welche Register (`eax`, `ebx`, `ecx`, `edx`) werden als Ein- und Ausgaberaster für die Feature-Flags genutzt?
*   **Modul 2: Implementierung & Methoden**
    Schreibe eine Funktion, die das Makro `core::arch::asm!` in einem `unsafe`-Block nutzt, um den `cpuid`-Befehl auszuführen. Alternativ kannst du die intrinsischen Funktionen aus `core::arch::x86_64::__cpuid` verwenden. Werte die Bits in den Ergebnisregistern aus, um bestimmte Flags (z. B. AVX2-Unterstützung) zu prüfen.
*   **Modul 3: Vollendung & Hauptprogramm**
    Erzeuge eine strukturierte Ausgabe aller abgefragten CPU-Features in `main.rs`. Ergänze Unittests, die verifizieren, dass die Abfrage auf modernen x86-Systemen ohne Absturz durchläuft.

---

## Projekt 87: Virtuellen Speicher schützen
*Ziel: Nutze die Systemfunktion mprotect (POSIX) oder VirtualProtect (Windows), um einen Speicherbereich zur Laufzeit als schreibgeschützt zu markieren.*

*   **Modul 1: Basis-Datenstrukturen**
    Alloziere einen Speicherblock auf dem Heap, der an den Speicherseitengrenzen (Page Alignment) ausgerichtet ist. Warum verlangen `mprotect`/`VirtualProtect` diese spezielle Ausrichtung? Nutze `posix_memalign` oder ermittle die Page-Size deines Systems.
*   **Modul 2: Implementierung & Methoden**
    Schreibe Werte in den Speicherbereich. Nutze danach `libc::mprotect` in einem `unsafe`-Block, um die Schutzrechte der Speicherseite auf schreibgeschützt (`PROT_READ`) zu setzen. Versuche danach testweise, in den Speicher zu schreiben, und fange das Signal (z. B. `SIGSEGV`) ab oder beobachte den gezielten Absturz.
*   **Modul 3: Vollendung & Hauptprogramm**
    Demonstriere in `main.rs` den Übergang der Zugriffsrechte. Zeige auf, wie man den Speicherbereich nach der Nutzung wieder freigibt und wie man Schutzverletzungen diagnostiziert.

---

## Projekt 88: Direktes Auslesen von Hardware-Registern
*Ziel: Simuliere den Zugriff auf ein Memory-Mapped I/O (MMIO) Register, indem du einen Zeiger auf eine feste Speicheradresse castest und mit volatile liest.*

*   **Modul 1: Basis-Datenstrukturen**
    Verstehe das Konzept von MMIO (Memory-Mapped I/O). Warum optimiert der Compiler normale Lesezugriffe auf scheinbar unveränderte Speicheradressen weg, und wie verhindert das volatile Auslesen dies?
*   **Modul 2: Implementierung & Methoden**
    Definiere eine simulierte Register-Adresse (z. B. ein statisches Byte-Array als Hardware-Attrappe). Caste die Adresse in einen rohen Zeiger `*const u32`. Verwende `std::ptr::read_volatile` in einem `unsafe`-Block, um den Wert direkt aus dem Speicher zu lesen, ohne dass der Compiler diesen Zugriff wegoptimieren darf.
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe ein Testprogramm, das den Wert der simulierten Hardware-Adresse im Hintergrund verändert und über deine volatile Lese-Schnittstelle zyklisch abfragt. Verifiziere, dass jeder Zugriff physisch stattfindet.

---

## Projekt 89: Volatile-Schreibzugriffe
*Ziel: Verwende std::ptr::write_volatile, um Werte an eine Adresse zu schreiben, bei denen der Compiler die Schreiboperation nicht wegoptimieren darf.*

*   **Modul 1: Basis-Datenstrukturen**
    Lerne den Unterschied zwischen normalen Zuweisungen und volatile Schreibvorgängen kennen. Warum sind aufeinanderfolgende Schreibvorgänge auf dieselbe MMIO-Adresse für Hardware-Steuerungen wichtig, selbst wenn dazwischen nicht gelesen wird?
*   **Modul 2: Implementierung & Methoden**
    Caste eine Zieladresse in einen veränderlichen Zeiger `*mut u8`. Nutze `std::ptr::write_volatile` im `unsafe`-Block, um nacheinander verschiedene Werte an diese Adresse zu senden. Erkläre in einem Kommentar, warum der Compiler diese Sequenz nicht zu einer einzigen Schreiboperation zusammenfassen darf.
*   **Modul 3: Vollendung & Hauptprogramm**
    Implementiere die Logik in `main.rs` mit einer Test-Speicheradresse. Inspiziere (konzeptionell), wie der generierte Maschinencode die Schreibbefehle exakt beibehält, und verifiziere die Funktionsweise.

---

## Projekt 90: Signale abfangen (Signal-Handler)
*Ziel: Registriere über die libc einen Signal-Handler für SIGINT (Strg+C) und reagiere im unsafe Kontext darauf.*

*   **Modul 1: Basis-Datenstrukturen**
    Analysiere die POSIX-Funktion `sigaction` und die zugehörige Struktur. Welche Anforderungen stellt das Betriebssystem an die Signal-Handler-Funktionssignatur (C-ABI)?
*   **Modul 2: Implementierung & Methoden**
    Definiere eine `extern "C" fn(c_int)` als Signal-Handler. Registriere diesen über `libc::sigaction` in einem `unsafe`-Block für das Signal `SIGINT`. Achte darauf, dass im Signal-Handler nur async-signal-safe Funktionen aufgerufen werden dürfen (kein direktes `println!`!). Verwende stattdessen atomare Flags, um den Status an die Hauptschleife zu kommunizieren.
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe eine Endlosschleife in `main.rs`, die darauf wartet, dass das atomare Flag durch das Signal (z. B. Strg+C im Terminal) gesetzt wird, und beende das Programm dann kontrolliert mit einer Abschiedsmeldung.

---

## Projekt 91: Hardware-Timer nutzen
*Ziel: Greife auf hochauflösende Hardware-Timer des Prozessors zu, um präzise Taktzyklen zu zählen (z. B. über den Assemblerbefehl RDTSC).*

*   **Modul 1: Basis-Datenstrukturen**
    Mache dich mit dem CPU-Befehl `rdtsc` (Read Time-Stamp Counter) auf x86-Prozessoren vertraut. Welchen Wert liefert dieser Zähler und welche Genauigkeit hat er im Vergleich zu Betriebssystem-Timern?
*   **Modul 2: Implementierung & Methoden**
    Nutze `core::arch::x86_64::_rdtsc` oder Inline-Assembly im `unsafe`-Block, um den aktuellen Zählerstand abzufragen. Schreibe eine Messfunktion, die den Zähler vor und nach einem zu messenden Codeblock ausliest und die Differenz (verstrichene CPU-Zyklen) ermittelt.
*   **Modul 3: Vollendung & Hauptprogramm**
    Miss die Laufzeit verschiedener Operationen (z. B. eine mathematische Berechnung vs. eine Speicherallokation) in `main.rs` und gib die Ergebnisse in Taktzyklen aus. Schreibe Tests, um die Konsistenz der Messungen zu validieren.

---

## Projekt 92: Roh-Zugriff auf die serielle Schnittstelle
*Ziel: Öffne und konfiguriere eine serielle Schnittstelle (COM-Port oder /dev/tty) über direkte Systemaufrufe und ioctl.*

*   **Modul 1: Basis-Datenstrukturen**
    Informiere dich über die POSIX-Struktur `termios` zur Konfiguration von seriellen Schnittstellen. Welche Flags steuern die Baudrate, Datenbits, Parität und Stopbits? Verwende `#[repr(C)]` für plattformkompatible Strukturen.
*   **Modul 2: Implementierung & Methoden**
    Öffne die Gerätedatei (z. B. `/dev/ttyS0` oder `/dev/ttyUSB0`) über `libc::open`. Nutze `libc::tcgetattr` und `libc::tcsetattr` im `unsafe`-Block, um die Schnittstelle auf die gewünschte Baudrate einzustellen und rohe Eingabe- und Ausgabemodi zu konfigurieren.
*   **Modul 3: Vollendung & Hauptprogramm**
    Implementiere das Senden und Empfangen einfacher Test-Bytes über die Dateideskriptoren. Stelle sicher, dass die geöffnete Schnittstelle beim Beenden des Programms im `Drop`-Trait über `libc::close` wieder freigegeben wird.

---

## Projekt 93: Shared Memory zwischen Prozessen
*Ziel: Erstelle einen gemeinsamen Speicherbereich über shm_open und mmap, um Daten ohne Sockets oder Pipes direkt mit einem anderen Prozess zu teilen.*

*   **Modul 1: Basis-Datenstrukturen**
    Analysiere die Funktionsweise von POSIX Shared Memory. Welche Konstanten und Zugriffsrechte (z. B. `O_CREAT`, `O_RDWR`) werden für `shm_open` benötigt? Wie wird das Layout der geteilten Datenstruktur im Speicher definiert?
*   **Modul 2: Implementierung & Methoden**
    Rufe `libc::shm_open` auf, um ein Shared-Memory-Objekt zu erzeugen. Konfiguriere die Größe mit `libc::ftruncate`. Blende das Objekt anschließend via `libc::mmap` im `unsafe`-Block in den Adressraum ein. Caste den resultierenden Zeiger auf dein geteiltes Daten-Struct.
*   **Modul 3: Vollendung & Hauptprogramm**
    Schreibe ein Programm, das in den Shared Memory schreibt, und ein zweites, das zeitgleich die Daten ausliest. Stelle die Bereinigung des Shared Memory im `Drop`-Trait mittels `shm_unlink` sicher.

---

## Projekt 94: Dateirechte auf Systemebene ändern
*Ziel: Rufe die POSIX-Funktion chmod direkt auf, um die Berechtigungen einer Datei über Oktalmasken manuell zu manipulieren.*

*   **Modul 1: Basis-Datenstrukturen**
    Lerne die Berechtigungs-Oktalmasken von POSIX-Dateisystemen kennen (z. B. `0o755` für ausführbare Dateien). Welche Datentypen erwartet `chmod` (Pfade als C-Strings, Berechtigungen als `mode_t`)?
*   **Modul 2: Implementierung & Methoden**
    Deklariere `libc::chmod` und konvertiere den Dateipfad in einen nullterminierten `CString`. Rufe `libc::chmod` im `unsafe`-Block auf und fange eventuelle Fehlercodes (wie fehlende Berechtigungen) ab.
*   **Modul 3: Vollendung & Hauptprogramm**
    Erstelle eine Testdatei in `main.rs`, ändere die Dateirechte auf schreibgeschützt, versuche in sie zu schreiben (was fehlschlagen sollte) und stelle die ursprünglichen Rechte wieder her. Validiere die Änderungen.

---

## Projekt 95: Systemzeit direkt auslesen
*Ziel: Nutze clock_gettime aus der POSIX-Bibliothek, um die aktuelle Systemzeit mit Nanosekunden-Präzision abzufragen.*

*   **Modul 1: Basis-Datenstrukturen**
    Definiere das Struct `timespec` (mit den Feldern `tv_sec` und `tv_nsec`) unter Verwendung von `#[repr(C)]`. Ermittle die Konstanten für verschiedene Uhren-IDs (z. B. `CLOCK_REALTIME` oder `CLOCK_MONOTONIC`).
*   **Modul 2: Implementierung & Methoden**
    Rufe `libc::clock_gettime` im `unsafe`-Block auf und übergib die Uhren-ID sowie eine veränderliche Referenz auf deine `timespec`-Struktur. Behandle potenzielle Systemfehler beim Aufruf.
*   **Modul 3: Vollendung & Hauptprogramm**
    Rechne die Sekunden und Nanosekunden in `main.rs` in ein lesbares Format um und gib die Zeit aus. Vergleiche die Genauigkeit deiner Zeitmessung mit Rusts `std::time::SystemTime`.

---

## Projekt 96: Daemon-Prozess erstellen
*Ziel: Nutze den Systemaufruf fork, um den aktuellen Prozess zu duplizieren und im Hintergrund als Daemon weiterlaufen zu lassen.*

*   **Modul 1: Basis-Datenstrukturen**
    Verstehe die Funktionsweise von `fork` unter Unix/Linux. Was bedeuten die unterschiedlichen Rückgabewerte (0 für das Kind, PID des Kindes für den Vater, negativ bei Fehlern)?
*   **Modul 2: Implementierung & Methoden**
    Rufe `libc::fork` in einem `unsafe`-Block auf. Beende den Vaterprozess sofort. Rufe im Kindprozess `libc::setsid` auf, um eine neue Session zu starten und die Verbindung zum steuernden Terminal zu trennen. Führe einen zweiten `fork` aus, um sicherzustellen, dass der Daemon kein neues Terminal öffnen kann. Richte die Standard-Datenströme (stdin, stdout, stderr) auf `/dev/null` ein.
*   **Modul 3: Vollendung & Hauptprogramm**
    Lass den Daemon im Hintergrund eine periodische Aufgabe ausführen (z. B. jede Sekunde einen Log-Eintrag schreiben). Teste das Verhalten, indem du das Terminal schließt und überprüfst, ob der Prozess im Hintergrund weiterläuft.

---

## Projekt 97: Windows-Registry manipulieren
*Ziel: Greife über Win32-APIs wie RegOpenKeyExW auf die Windows-Registrierungsdatenbank zu, um Werte auszulesen oder zu schreiben.*

*   **Modul 1: Basis-Datenstrukturen**
    Analysiere die benötigten Win32-Typen (z. B. `HKEY`, `LSTATUS`) und die Repräsentation von Schlüsseln und Werten als UTF-16-Strings.
*   **Modul 2: Implementierung & Methoden**
    Deklariere die APIs `RegOpenKeyExW`, `RegQueryValueExW` und `RegCloseKey` (oder binde sie über `windows-sys` ein). Implementiere eine Rust-Funktion, die einen Registry-Pfad öffnet, einen Wert im `unsafe`-Block ausliest, den Typ verifiziert und den Schlüssel wieder schließt.
*   **Modul 3: Vollendung & Hauptprogramm**
    Lies in `main.rs` einen bekannten Systemwert aus der Registry aus (z. B. Windows-Versionsinformationen) und gib ihn aus. Implementiere eine saubere Fehlerbehandlung für den Fall, dass der Schlüssel nicht existiert oder die Rechte unzureichend sind.

---

## Projekt 98: Page-Size des Betriebssystems ermitteln
*Ziel: Rufe die Systemkonfiguration sysconf mit _SC_PAGESIZE auf, um die native Seitengröße des virtuellen Speichers abzufragen.*

*   **Modul 1: Basis-Datenstrukturen**
    Recherchiere die Konstante `_SC_PAGESIZE` (oder `_SC_PAGE_SIZE`) auf deiner Plattform. Welche Datentypen werden für die Parameter und den Rückgabewert der Funktion `sysconf` benötigt?
*   **Modul 2: Implementierung & Methoden**
    Rufe `libc::sysconf` in einem `unsafe`-Block mit dem entsprechenden Argument auf. Behandle den Fall, dass die Funktion -1 zurückgibt (Systemkonfiguration nicht unterstützt oder Fehler).
*   **Modul 3: Vollendung & Hauptprogramm**
    Gib die ermittelte Seitengröße (typischerweise 4096 Bytes) in `main.rs` aus. Nutze diesen Wert, um Berechnungen für Page-Alignment-Szenarien durchzuführen und verifiziere das Ergebnis.

---

## Projekt 99: Prozess-Priorität ändern
*Ziel: Verwende die Funktion setpriority, um die Scheduling-Priorität (Nice-Wert) deines aktuellen Prozesses direkt zu manuell manipulieren.*

*   **Modul 1: Basis-Datenstrukturen**
    Lerne das Nice-Wert-System von Unix kennen (Wertebereich von -20 bis 19, wobei niedrigere Werte höhere Priorität bedeuten). Welche Konstanten (z. B. `PRIO_PROCESS`) werden benötigt?
*   **Modul 2: Implementierung & Methoden**
    Rufe `libc::setpriority` im `unsafe`-Block auf, um die Priorität des aktuellen Prozesses (PID 0) zu ändern. Fange Fehler ab (z. B. `EACCES` bei dem Versuch, ohne Admin-Rechte eine höhere Priorität zu setzen).
*   **Modul 3: Vollendung & Hauptprogramm**
    Lies die aktuelle Priorität vor und nach der Änderung mit `libc::getpriority` aus und präsentiere den Nice-Wert. Schreibe Tests, die die Prioritätsänderungen validieren.

---

## Projekt 100: Inline-Assembler für mathematische Tricks
*Ziel: Schreibe eine Funktion, die mithilfe des asm!-Makros direkt Assembler-Befehle ausführt, um eine Berechnung extrem zu beschleunigen.*

*   **Modul 1: Basis-Datenstrukturen**
    Wähle einen einfachen mathematischen Trick aus, der auf CPU-Ebene optimiert werden kann (z. B. Bit-Rotationen, schnelles Runden oder die Bestimmung führender Nullen). Plane das Register-Mapping für die Eingangs- und Ausgangswerte.
*   **Modul 2: Implementierung & Methoden**
    Schreibe eine Funktion in Rust und nutze `core::arch::asm!`, um den spezifischen CPU-Befehl (z. B. `rol` für Bit-Rotation oder `bsf`/`bsr` für Bit-Scan) direkt auszuführen. Deklariere die Registerbelegungen korrekt, damit der Rust-Compiler die Umgebungsvariablen nicht beschädigt.
*   **Modul 3: Vollendung & Hauptprogramm**
    Erstelle das Hauptprogramm in `main.rs`, führe die Assembler-optimierte Berechnung aus und verifiziere das Ergebnis mit der mathematisch identischen, langsameren Rust-Standardmethode. Führe Micro-Benchmarks durch.



