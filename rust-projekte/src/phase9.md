# Phase 9: Projektvorschläge zu Unsafe Rust & FFI

Willkommen in der Welt der Systemprogrammierung! Du hast die Konzepte gelernt, die Rust so nah an die Hardware bringen wie C oder C++: den bewussten Ausstieg aus dem Sicherheitsnetz des Compilers mit **Unsafe Rust** und die Interaktion mit der Außenwelt über das **Foreign Function Interface (FFI)**. Nun ist es an der Zeit, diese mächtigen, aber auch gefährlichen Werkzeuge in echten Projekten zu erproben.

In dieser Phase findest du **10 strukturierte Projektvorschläge**, die Unsafe Rust und FFI in Kombination anwenden. Sie decken das gesamte Spektrum ab – von der manuellen Speicherverwaltung über die Anbindung mächtiger C-Bibliotheken bis hin zur Entwicklung von Rust-Bibliotheken für andere Sprachen.

> [!IMPORTANT]
> **Didaktischer Hinweis:** Für keines dieser Projekte findest du hier fertige Codelösungen! Das Ziel ist es, dass du die Zeiger selbst verwaltest, das Speicher-Layout genau planst und die APIs so designst, dass sie trotz interner Unsafe-Magie nach außen hin absolut sicher zu benutzen sind. Klettere vorsichtig und sichere deine Pfade ab!

---

## Projekt 1: Speicherabbildung mit `mmap` (Direktes OS-Memory-Mapping)

### 1. Beschreibung der Funktionsweise
Du baust ein Werkzeug, das eine Datei nicht über die Standard-I/O-Funktionen einliest, sondern sie direkt über den Systemaufruf `mmap` in den virtuellen Adressraum deines Programms einblendet. Dadurch kannst du wie auf ein normales Array (`&[u8]`) auf die Datei zugreifen, was bei sehr großen Dateien extrem performant istd. Das Programm soll sowohl lesenden als auch schreibenden Zugriff erlauben.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **OS-Schnittstelle (`os_ffi`):** Deklaration der FFI-Funktionen `mmap`, `munmap`, `open` und `close` aus dem Unix/Linux-System (oder den entsprechenden Windows-Pendants).
* **Dateihandle-Wrapper (`FileDescriptor`):** Ein sicherer Wrapper um den rohen Dateideskriptor (ein Integer), der das automatische Schließen der Datei via `Drop`-Trait garantiert.
* **Mmap-Wrapper (`Mmap`):** Das zentrale Struct, das die Speicheradresse (`*mut c_void`) und die Dateigröße speichert. Es implementiert `Deref` und `DerefMut` auf einen Slice (`&[u8]` bzw. `&mut [u8]`), um sicheren Zugriff zu ermöglichen.

### 3. Zu verwendende Crates oder Bibliotheken
* `libc` (für die direkten Systemaufrufe und C-Typen wie `size_t`, `off_t`, `c_int`).

### 4. Didaktische Hinweise
* **Memory Leaks:** Wenn du vergisst, `munmap` aufzurufen, wenn dein Wrapper den Scope verlässt, bleibt der Speicher reserviert. Du musst das `Drop`-Trait für deine `Mmap`-Struktur implementieren.
* **Null-Pointer & Fehlerwerte:** `mmap` gibt im Fehlerfall nicht `NULL`, sondern die Konstante `MAP_FAILED` (oft `-1` als Zeiger gecastet) zurück. Das Überprüfen dieser Rückgabe erfordert präzises Casting und ist eine klassische Fehlerquelle.
* **Dangling Slices:** Wie verhinderst du, dass der vom `Deref`-Trait zurückgegebene Slice (`&[u8]`) länger existiert als das `Mmap`-Objekt selbst? Hier spielen die impliziten Lifetimes eine entscheidende Rolle.

### 5. Optionale Zusatz-Herausforderung
Mache die Speicherabbildung thread-sicher. Implementiere `Send` und `Sync` für deine Struktur, aber stelle sicher, dass dies nur möglich ist, wenn das Mapping nicht schreibbar ist, oder nutze Synchronisationsprimitive (z. B. OS-Mutexes), falls mehrere Threads schreibend zugreifen.

---

## Projekt 2: Eigene Bindings für eine C-Grafikbibliothek

### 1. Beschreibung der Funktionsweise
Du möchtest eine kleine interaktive Anwendung oder ein Spiel programmieren. Statt fertige Rust-Crates zu nutzen, baust du deine eigenen FFI-Bindings für eine minimalistische C-Grafikbibliothek (wie GLFW). Dein Rust-Programm soll ein Fenster öffnen, die Hintergrundfarbe ändern, Eingaben von Tastatur und Maus abfragen und das Fenster sauber schließen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **C-Deklarationen (`glfw_ffi`):** Import der benötigten GLFW-Funktionen (wie `glfwInit`, `glfwCreateWindow`, `glfwWindowShouldClose`, `glfwPollEvents`, `glfwTerminate`).
* **Ressourcen-Manager (`GlfwContext`):** Initialisiert GLFW und stellt sicher, dass `glfwTerminate` am Ende aufgerufen wird (Singleton-Muster oder RAII-Guard).
* **Fenster-Abstraktion (`Window`):** Hält den rohen Zeiger `*mut GLFWwindow` und bietet sichere Methoden für die Interaktion (z. B. `.should_close() -> bool`, `.swap_buffers()`).

### 3. Zu verwendende Crates oder Bibliotheken
* `bindgen` (um die Header-Dateien automatisch in Rust-Signaturen zu übersetzen).
* GLFW (als auf dem System installierte C-Bibliothek, die über Cargo verlinkt wird).

### 4. Didaktische Hinweise
* **Null-Pointer-Gefahren:** C-Funktionen wie `glfwCreateWindow` geben `NULL` zurück, wenn die Fenstererstellung fehlschlägt. Du musst diesen Zustand sofort prüfen und in ein Rust-freundliches `Option` oder `Result` überführen.
* **Typ-Mismatches & String-Übersetzung:** Fenstertitel werden in C als `*const c_char` (Null-terminiert) übergeben. Du musst einen Rust-`str` mittels `CString` konvertieren und sicherstellen, dass das `CString`-Objekt lange genug im Speicher lebt, während C darauf zugreift.
* **Thread-Sicherheit:** Viele UI-Bibliotheken dürfen nur vom Haupt-Thread (Main Thread) aufgerufen werden. Wie stellst du sicher, dass dein `Window`-Typ nicht versehentlich in einen anderen Thread verschoben werden kann? (Tipp: `Window` sollte `!Send` und `!Sync` sein).

### 5. Optionale Zusatz-Herausforderung
Registriere einen Tastatur-Callback in GLFW. Du musst eine Rust-Funktion als C-kompatiblen Funktionszeiger (`extern "C" fn`) übergeben, die Tastendrücke abfängt und an einen sicheren Rust-Zustand weiterleitet.

---

## Projekt 3: Die zeigerbasierte Double Linked List (Doppelt verkettete Liste)

### 1. Beschreibung der Funktionsweise
Im sicheren Rust ist eine doppelt verkettete Liste aufgrund der Aliasing-Regeln (jeder Knoten hat Referenzen auf seinen Nachfolger und Vorgänger) extrem schwer ohne `Rc` und `RefCell` umzusetzen. Um maximale Performance zu erzielen und Speicher-Overhead zu vermeiden, implementierst du eine vollständige Double Linked List unter Verwendung roher Zeiger.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Datenknoten (`Node<T>`):** Ein internes Struct, das den Wert sowie zwei rohe Zeiger (`*mut Node<T>`) auf den vorherigen und nächsten Knoten speichert.
* **Listen-Kopf (`DoubleLinkedList<T>`):** Verwaltet Zeiger auf den Anfang (`head`) und das Ende (`tail`) der Liste sowie die aktuelle Länge.
* **Iterator-Komponenten:** Strukturen für das sequentielle Durchlaufen der Liste (`Iter<'a, T>`, `IterMut<'a, T>`), die sichere Referenzen zurückgeben.

### 3. Zu verwendende Crates oder Bibliotheken
* Keine (Standardbibliothek, insbesondere `std::ptr` und `std::ptr::NonNull`).

### 4. Didaktische Hinweise
* **Ownership & Speicherverwaltung:** Wenn du Elemente entfernst oder die Liste löschst, musst du den Speicher manuell freigeben. Hierzu nimmst du die Eigentümerschaft mit `Box::from_raw` zurück, damit Rusts Standard-Deallokator greifen kann.
* **Alignment & Uninitialisierter Speicher:** Wenn du Knoten auf dem Heap erstellst, musst du sicherstellen, dass sie korrekt ausgerichtet (aligned) sind. Die Verwendung von `Box::into_raw` nimmt dir diese Sorge ab, erfordert aber höchste Disziplin beim Gegenstück `Box::from_raw`.
* **Dangling Pointer:** Achte genau darauf, dass nach dem Entfernen eines Knotens die Zeiger der benachbarten Knoten aktualisiert werden. Ein einziger vergessener Zeiger führt zu undefiniertem Verhalten oder Abstürzen.

### 5. Optionale Zusatz-Herausforderung
Implementiere das `Drop`-Trait so, dass es nicht-rekursiv arbeitet. Wenn eine Liste mit vielen Knoten rekursiv gedroppt wird (Knoten A droppt Knoten B, B droppt C...), kann dies zu einem Stack Overflow führen. Schreibe eine iterative Freigabeschleife.

---

## Projekt 4: Rust-Plugins für eine C-Anwendung (Plugin-Architektur)

### 1. Beschreibung der Funktionsweise
Du wechselst die Seiten: Du schreibst eine dynamische Bibliothek (`.so` / `.dll`) in Rust. Diese Bibliothek soll von einer in C geschriebenen Anwendung zur Laufzeit geladen werden, um eine bestimmte Funktionalität (z. B. Filterung oder Datenverarbeitung) bereitzustellen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Cargo-Konfiguration:** Einstellen von `crate-type = ["cdylib"]` in der `Cargo.toml`.
* **Exportierte Schnittstelle (`plugin_api`):** Funktionen, die mit `#[no_mangle]` und `pub extern "C"` gekennzeichnet sind, um sie für den C-Linker sichtbar zu machen.
* **Zustandsverwaltung:** Da C keinen Zustand verwalten kann, gibt Rust beim Initialisieren einen opaken Zeiger (z. B. `*mut c_void`) zurück, den C bei jedem nachfolgenden Funktionsaufruf wieder an Rust übergibt.

### 3. Zu verwendende Crates oder Bibliotheken
* `libc` (für C-Datentypen).

### 4. Didaktische Hinweise
* **Panics über FFI-Grenzen:** Eine Rust-`panic!` darf niemals über die FFI-Grenze in den C-Code entweichen. Dies führt sofort zu undefiniertem Verhalten (oft zum harten Programmabsturz). Verwende `std::panic::catch_unwind`, um alle potenziellen Panics an der Grenze abzufangen und in C-Fehlercodes (z. B. einen Integer ungleich 0) umzuwandeln.
* **String-Besitz:** Wenn Rust einen String für C generiert und als `*const c_char` zurückgibt, muss C diesen Speicher lesen, darf ihn aber nicht selbst löschen. Du musst eine separate FFI-Funktion bereitstellen (z. B. `free_string`), die den Zeiger wieder an Rust übergibt, wo er sicher freigegeben wird.
* **ABI-Kompatibilität:** Alle übergebenen Strukturen müssen `#[repr(C)]` nutzen. Vermeide komplexe Rust-Typen wie `Vec` or `String` in den Signaturen der exportierten Funktionen.

### 5. Optionale Zusatz-Herausforderung
Implementiere Versionierung im Plugin-System. C soll beim Laden des Plugins eine Funktion aufrufen, die die unterstützte API-Version und den Plugin-Namen abfragt. Stimmt die Version nicht überein, wird das Laden verweigert.

---

## Projekt 5: Custom Memory Pool / Arena Allocator

### 1. Beschreibung der Funktionsweise
In performancekritischen Anwendungen sind häufige Heap-Allokationen über den Standard-Allokator ein Flaschenhals. Du entwickelst einen Arena-Allocator: Er reserviert einmalig einen großen Speicherbereich und verteilt bei Bedarf kleinere Stücke davon. Am Ende wird der gesamte Speicher der Arena in einem Rutsch freigegeben.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Speicher-Reservierung:** Nutzt Rusts Allokations-API (`std::alloc::alloc` und `Layout`), um den Speicherbereich für die Arena auf dem Heap anzufordern.
* **Zuweisungs-Logik (`Arena`):** Verwaltet einen Zeiger auf den freien Speicherbereich und führt Buch über den aktuellen Offset. Sie stellt eine unsichere Methode `.alloc<T>(&self, value: T) -> &mut T` bereit.
* **Deallokation:** Das `Drop`-Trait gibt den gesamten Speicherblock der Arena mit `std::alloc::dealloc` wieder frei.

### 3. Zu verwendende Crates oder Bibliotheken
* Keine (Standardbibliothek, speziell `std::alloc` und `std::ptr`).

### 4. Didaktische Hinweise
* **Alignment (Speicherausrichtung):** Typen in Rust haben unterschiedliche Alignment-Anforderungen (z. B. muss ein `u64` oft an einer Adresse liegen, die durch 8 teilbar ist). Wenn du Speicherblöcke nacheinander in der Arena verteilst, musst du den Zuweisungs-Zeiger so aufrunden (Padding) so, dass das Alignment des Typs `T` strikt eingehalten wird. Andernfalls droht undefiniertes Verhalten.
* **Lebensdauern (Lifetimes):** Jedes von der Arena allokierte Objekt darf nicht länger leben als die Arena selbst. Du musst die Ausgabereferenzen mit der Lebensdauer der Arena koppeln (`'a`).
* **Destruktoren (`Drop`):** Wenn die Arena einfach gelöscht wird, werden die Destruktoren der darin liegenden Objekte *nicht* automatisch aufgerufen. Wie gehst du damit um? Du musst entweder eine Registrierungsliste für Destruktoren führen oder die Arena auf "Copy"-Typen beschränken.

### 5. Optionale Zusatz-Herausforderung
Erweitere die Arena so, dass sie dynamisch wächst: Wenn der Speicherbereich voll ist, allokiert sie einen neuen, größeren Block und verkettet diesen mit dem alten, anstatt einen Fehler zurückzugeben.

---

## Projekt 6: Bindings für ein C-Datenbankformat (SQLite-Anbindung)

### 1. Beschreibung der Funktionsweise
SQLite ist die am weitesten verbreitete embedded SQL-Datenbank der Welt. Sie besitzt eine reine C-API. Du erstellst eigene, minimale Rust-Bindings, um eine SQLite-Datenbankdatei zu öffnen, Tabellen zu erstellen, Daten einzufügen und SQL-Abfragen auszuführen. Das Ergebnis soll in sichere Rust-Strukturen konvertiert werden.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **C-Interface (`sqlite_ffi`):** Import der essenziellen SQLite-Funktionen (wie `sqlite3_open`, `sqlite3_prepare_v2`, `sqlite3_step`, `sqlite3_column_text`, `sqlite3_finalize`, `sqlite3_close`).
* **Verbindungs-Wrapper (`Database`):** Kapselt den rohen Zeiger `*mut sqlite3`. Sie stellt eine Schnittstelle für Verbindungsaufrufe bereit.
* **Statement-Wrapper (`Statement`):** Kapselt den Zeiger `*mut sqlite3_stmt`. Sie steuert das Ausführen der Query und stellt Iteratoren über die Zeilen zur Verfügung.

### 3. Zu verwendende Crates oder Bibliotheken
* `libc` (für C-Datentypen).
* SQLite3 (als Systembibliothek).

### 4. Didaktische Hinweise
* **Ressourcenfreigabe im Fehlerfall:** Wenn eine Abfrage fehlschlägt, müssen bereits geöffnete Statements und die Datenbankverbindung trotzdem geschlossen werden. Wie strukturierst du deinen Code, damit kein Speicher oder Dateihandles lecken?
* **Null-Pointer und String-Konvertierung:** Die von SQLite zurückgegebenen Spaltenwerte (z. B. Texte über `sqlite3_column_text`) sind Null-terminierte C-Strings. Sie können `NULL` sein. Du musst dies prüfen, bevor du sie in Rust-Strings (`&str`) konvertierst.
* **Typ-Mismatches:** SQLite ist dynamisch typisiert, Rust ist statisch typisiert. Wie gehst du damit um, wenn eine Spalte plötzlich einen anderen Typ liefert als erwartet? Du musst Fehlerbehandlungsmechanismen auf Rust-Seite etablieren.

### 5. Optionale Zusatz-Herausforderung
Implementiere prepared Statements mit Parameterbindung (z. B. `sqlite3_bind_int` oder `sqlite3_bind_text`). Verhindere SQL-Injections auf API-Ebene, indem du sicherstellst, dass Parameterwerte typsicher gebunden werden.

---

## Projekt 7: Zero-Copy Netzwerkpaket-Parser

### 1. Beschreibung der Funktionsweise
Beim Verarbeiten von Netzwerkpaketen zählt jede Mikrosekunde. Anstatt die Bytes eines Netzwerkpakets einzeln zu lesen und in Rust-Objekte zu kopieren, castest du den empfangenen Byte-Puffer direkt in Rust-Strukturen, die das exakte Bit- und Byte-Layout des Netzwerkheaders abbilden.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Protokoll-Header-Typen:** Structs wie `EthernetHeader` und `IPv4Header`. Sie müssen das exakte Layout der Netzwerkprotokolle widerspiegeln.
* **Parser-Engine:** Nimmt einen rohen Byte-Slice (`&[u8]`) entgegen, validiert die Mindestlänge und castet den Slice unsicher in eine Referenz auf die entsprechende Header-Struktur.
* **Byte-Order-Konverter:** Hilfsfunktionen, die Felder in Netzwerk-Byte-Reihenfolge (Big-Endian) in die Host-Byte-Reihenfolge des Prozessors konvertieren.

### 3. Zu verwendende Crates oder Bibliotheken
* Keine (Standardbibliothek, insbesondere `std::slice` und Byte-Order-Hilfsmittel der numerischen Typen wie `.to_be()` / `.from_be()`).

### 4. Didaktische Hinweise
* **Alignment & `repr(packed)`:** Netzwerk-Header sind oft nicht an 4- oder 8-Byte-Grenzen ausgerichtet (z. B. ist ungerade im Speicher). Wenn du ein normales Rust-Struct darauf castest, kann dies zu nicht ausgerichteten Zugriffen (Unaligned Reads) führen. Du musst `#[repr(C, packed)]` verwenden. Das Lesen von Feldern aus gepackten Structs ist in Rust hochgradig unsicher, da Referenzen darauf unaligned sein können!
* **Puffer-Grenzen (Out of Bounds):** Wie stellst du sicher, dass das Netzwerkpaket groß genug ist, bevor du den Zeiger castest? Ein Zugriff außerhalb der Puffergrenzen führt zu undefiniertem Verhalten.
* **Datenkorruption:** Wenn das Paket ungültige Daten enthält, darf der Parser nicht abstürzen. Der Cast an sich darf die Speichersicherheit des restlichen Programms nicht gefährden.

### 5. Optionale Zusatz-Herausforderung
Implementiere einen Payload-Splitter. Der Parser soll nicht nur den Header casten, sondern auch einen sicheren Slice auf die verbleibende Payload des Pakets zurückgeben, ohne die Daten zu kopieren.

---

## Projekt 8: Integration einer C-Komprimierungsbibliothek (z. B. zlib)

### 1. Beschreibung der Funktionsweise
Du baust einen sicheren Wrapper um die klassische `zlib`-Bibliothek, um Daten im Deflate- oder Gzip-Format zu komprimieren oder zu dekomprimieren. Dein Rust-Code soll Datenblöcke (Slices) an `zlib` übergeben und die komprimierten Bytes stream-basiert in einen Zielpuffer schreiben.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **C-Deklarationen (`zlib_ffi`):** Import der `zlib`-Typen (wie `z_stream`) und der Kernfunktionen (`deflateInit_`, `deflate`, `deflateEnd`).
* **Zustands-Wrapper (`Compressor`):** Kapselt den `z_stream`-Zustand und kümmert sich um die korrekte Initialisierung und Freigabe.
* **I/O-Schnittstelle:** Bietet Methoden wie `.compress(&mut self, input: &[u8], output: &mut [u8]) -> Result<usize, ZlibError>` an.

### 3. Zu verwendende Crates oder Bibliotheken
* `libc` (für C-Typen).
* `zlib` (Systembibliothek).

### 4. Didaktische Hinweise
* **Pufferverwaltung und Zeiger:** Die Struktur `z_stream` erwartet Zeiger auf den Eingabe- (`next_in`) und Ausgabe-Puffer (`next_out`) sowie deren Restlängen. Da Rust-Vektoren und Slices im Speicher verschoben werden könnten (z. B. bei Reallokation), musst du penibel darauf achten, dass die Zeiger während des Rufs von `deflate` gültig bleiben und nicht auf freigegebenen oder verschobenen Speicher zeigen.
* **Speicher-Cleanup bei Fehlern:** Wenn die Komprimierung fehlschlägt, musst du `deflateEnd` aufrufen, um den von `zlib` intern allokierten Speicher freizugeben. Andernfalls erzeugst du Memory Leaks auf C-Seite.
* **Typ-Konvertierung:** Die `zlib`-Fehlercodes (z. B. `Z_OK`, `Z_STREAM_END`, `Z_MEM_ERROR`) sind Integers. Du musst sie in ein aussagekräftiges Rust-`Result` mit einem eigenen Error-Enum übersetzen.

### 5. Optionale Zusatz-Herausforderung
Implementiere das Standard-Rust-Trait `std::io::Write` für deinen `Compressor`. Dadurch kann dein Kompressor nahtlos als Ziel für andere Rust-Schreiber (wie `BufWriter` oder `File`) verwendet werden.

---

## Projekt 9: OS-nativer Thread-Pool mit pthreads / Windows-Threads

### 1. Beschreibung der Funktionsweise
Anstatt Rusts komfortable `std::thread`-Bibliothek zu nutzen, implementierst du einen minimalen Thread-Pool direkt auf Basis der nativen Betriebssystem-Schnittstelle (z. B. `pthread` unter Linux/macOS oder die Threading-APIs unter Windows). Dies gibt dir tiefe Kontrolle darüber, wie Threads gestartet, priorisiert und synchronisiert werden.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Threading-FFI:** Deklarationen von `pthread_create`, `pthread_join`, `pthread_mutex_init`, `pthread_mutex_lock`, etc.
* **Mutex-Wrapper (`RawMutex`):** Ein sicherer Wrapper um die pthreads-Mutex-Struktur, der das Sperren und Entsperren übernimmt.
* **Thread-Pool (`NativeThreadPool`):** Verwaltet eine Queue von Aufgaben (Closures) und ein Array roher Thread-IDs.

### 3. Zu verwendende Crates oder Bibliotheken
* `libc` (bietet alle pthreads-Typen und -Funktionen out-of-the-box).

### 4. Didaktische Hinweise
* **Lebensdauer von Closures über Thread-Grenzen:** C-Thread-Funktionen akzeptieren nur einen rohen Funktionszeiger und ein einzelnes `void*`-Argument für Daten. Um eine Rust-Closure auszuführen, musst du sie in eine `Box` packen, diese mit `Box::into_raw` in einen rohen Zeiger verwandeln und in der Thread-Funktion wieder zurück in eine Box umwandeln, um sie aufzurufen und freizugeben.
* **Datenrennen (Data Races):** Da der Compiler die Synchronisation über `pthread_mutex` nicht analysieren kann, liegt es in deiner Verantwortung, sicherzustellen, dass keine zwei Threads ohne Sperre auf die Aufgabenliste zugreifen.
* **Panics im Worker-Thread:** Was passiert, wenn eine vom Benutzer übergebene Aufgabe panikt? Wenn der Thread abstürzt, während er einen FFI-Mutex hält, kann dies das gesamte Programm blockieren (Deadlock). Du musst Panics in der FFI-Thread-Schleife abfangen.

### 5. Optionale Zusatz-Herausforderung
Implementiere eine dynamische Größenanpassung: Der Thread-Pool soll bei hoher Last automatisch neue native Threads starten und diese bei Inaktivität nach einer bestimmten Zeit wieder beenden.

---

## Projekt 10: Eigene Implementierung von `String` mit Stack-Optimierung (SSO)

### 1. Beschreibung der Funktionsweise
Du entwickelst eine eigene, hochoptimierte Zeichenketten-Struktur (`InlineString`). Um kleine Strings extrem schnell zu verarbeiten, allokiert die Struktur bis zu einer Länge von 22 Bytes keinen Speicher auf dem Heap, sondern speichert die Zeichen direkt im Struct auf dem Stack. Erst ab 23 Bytes wird auf eine klassische Heap-Allokation umgeschwenkt.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Daten-Layout (`union`):** Ein `union`-Konstrukt, das entweder die Stack-Variante (ein Byte-Array und ein Längenfeld) oder die Heap-Variante (ein Zeiger, eine Kapazität und eine Länge) repräsentiert.
* **String-Zustand (`InlineString`):** Kapselt die Union und ein Flag (oder nutzt ein Bit des Längenfeldes), um zu erkennen, welcher Zustand aktiv ist.
* **Deref-Implementierung:** Implementiert `Deref<Target = str>`, um alle Standard-String-Methoden nutzbar zu machen.

### 3. Zu verwendende Crates oder Bibliotheken
* Keine (Standardbibliothek, insbesondere `std::mem::ManuallyDrop` und Zeiger-Kopierfunktionen wie `std::ptr::copy`).

### 4. Didaktische Hinweise
* **Arbeiten mit `union`:** Das Lesen von Feldern einer `union` ist in Rust immer `unsafe`, da der Compiler nicht garantieren kann, welcher Zustand aktuell gültig ist. Du musst diesen Zustand manuell und fehlerfrei über ein Flag verwalten.
* **Manuelles Drop-Management:** Wenn der String auf dem Heap liegt, muss der Speicher beim Löschen freigegeben werden. Liegt er auf dem Stack, darf kein Heap-Deallokator aufgerufen werden. Du musst das `Drop`-Trait implementieren und je nach Zustand den Speicher freigeben oder Destruktoren der Felder manuell ausführen.
* **Zeiger-Aliasing & Verschieben:** Wenn der String kopiert oder verschoben wird, müssen die Zeiger der Heap-Variante weiterhin auf die korrekten Adressen zeigen. Da der Stack-Inhalt verschoben wird, dürfen keine Zeiger *in das Struct selbst* zeigen!

### 5. Optionale Zusatz-Herausforderung
Implementiere das `Clone`-Trait für deinen `InlineString`. Stelle sicher, dass beim Klonen eines Heap-Strings ein neuer Heap-Speicherbereich reserviert wird, während beim Klonen eines Stack-Strings nur die Bytes kopiert werden.
