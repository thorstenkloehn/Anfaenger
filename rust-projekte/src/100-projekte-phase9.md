# 100 Projekte - Unsafe & FFI

Hier ist eine Sammlung von Projektideen, die speziell darauf ausgelegt sind, dein Verständnis von Unsafe Rust und C-Kompatibilität zu schärfen. Diese Szenarien helfen dir dabei, die Brücke zwischen Rusts Sicherheitsgarantien und der hardwarenahen Systemprogrammierung zu schlagen.

> [!IMPORTANT]
> Arbeite diese Projekte Schritt für Schritt durch. Versuche stets zu verstehen, warum ein `unsafe`-Block an der jeweiligen Stelle notwendig istd und wie du die Schnittstellen so gestaltest, dass der nach außen sichtbare Code sicher bleibt.

---

## Teil 1: Rohe Zeiger & Speicher-Tricks

In diesem Abschnitt beschäftigst du dich mit der direkten Adressierung von Speicherbereichen und umgehst die strengen Aliasing-Regeln des Borrow Checkers.

1. **Speicheradresse anzeigen**: Nimm eine normale Ganzzahl-Variable und gib ihre adresse über einen unveränderlichen rohen Zeiger (`*const T`) aus. Das zeigt dir, wie du den Speicherort von Variablen im RAM ermittelst.
2. **Wert über Zeiger verändern**: Erstelle einen veränderlichen rohen Zeiger (`*mut T`) auf eine Variable und überschreibe deren Wert in einem `unsafe`-Block. Hierbei übst du das manuelle Dereferenzieren von Speicheradressen.
3. **Zeiger-Arithmetik mit Arrays**: Navigiere durch ein Array von Ganzzahlen, indem du den Startzeiger nimmst und mit den Methoden `offset` oder `add` weiterrechnest. Du verstehst damit, wie Rust Daten fortlaufend im Speicher anordnet.
4. **Nullzeiger-Prüfung**: Initialisiere einen rohen Zeiger mit `std::ptr::null()` und schreibe eine Prüfung, ob dieser sicher dereferenziert werden kann. Das schützt dich vor Speicherzugriffsfehlern (Segmentation Faults).
5. **Transmutieren von primitiven Typen**: Nutze `std::mem::transmute`, um ein Array von vier `u8`-Werten direkt in eine einzelne `u32`-Zahl umzuinterpretieren. Du lernst, wie Daten auf Bitebene ohne Typkonvertierung neu interpretiert werden.
6. **Manuelle Speicherallokation**: Verwende `std::alloc::alloc` und `std::alloc::Layout`, um Speicher für eine Ganzzahl auf dem Heap manuell anzufordern und wieder freizugeben. So erfährst du genau, was unter der Haube von `Box` passiert.
7. **Auslesen nicht ausgerichteter Daten**: Lies mit `std::ptr::read_unaligned` einen wert aus einem Bytestrom, der nicht an den natürlichen Speichergrenzen ausgerichtet ist. Das ist besonders nützlich für die Arbeit mit Binärprotokollen.
8. **Schreiben nicht ausgerichteter Daten**: Verwende `std::ptr::write_unaligned`, um Werte in ein Byte-Array an beliebigen Positionen zu schreiben, ohne Ausrichtungsfehler (Alignment-Fehler) zu riskieren. Das hilft beim Serialisieren komplexer Protokollstrukturen.
9. **Zeiger-Vergleiche**: Erstelle zwei unterschiedliche Zeiger auf dasselbe Objekt und vergleiche ihre Adressen direkt miteinander. Du verstehst dadurch, dass Zeigervergleiche auf Adressenebene und nicht auf Wertebene stattfinden.
10. **Größe und Ausrichtung ermitteln**: Nutze `std::mem::size_of` und `std::mem::align_of` für verschiedene selbstdefinierte Strukturen. Dies verdeutlicht, wie viel Platz Typen im Speicher belegen und wie das Compiler-Padding (Füllbytes) funktioniert.
11. **Dangling-Zeiger-Szenario**: Erstelle einen Zeiger auf eine lokale Variable, die am Ende eines inneren Scopes zerstört wird, und gib danach seine Adresse aus. Du lernst, warum die Lebensdauer von rohen Zeigern vom Compiler nicht überwacht wird.
12. **Speicher kopieren mit `copy_nonoverlapping`**: Kopiere den Inhalt eines Speicherbereichs direkt in einen anderen mit `std::ptr::copy_nonoverlapping`. Dies zeigt dir, wie Rohdaten ohne Kopiervorgänge über sichere Schnittstellen verschoben werden.
13. **Speicher kopieren mit Überlappung**: Verwende `std::ptr::copy` für zwei sich überschneidende Bereiche eines Arrays. Du verstehst den Unterschied zwischen überlappenden und nicht-überlappenden Kopiervorgängen im RAM.
14. **Zeiger aus einer Referenz casten**: Nutze `as *const _` und `as *mut _`, um sicher zwischen unveränderlichen und veränderlichen Zeigern zu casten. Das zeigt dir die syntaktischen Wege für Zeigerkonvertierungen auf.
15. **Initialisierung mit `MaybeUninit`**: Lege ein Array mithilfe von `std::mem::MaybeUninit` an und initialisiere es Stück für Stück, bevor du es als initialisiert markierst. Du lernst, wie man teure Standard-Initialisierungen einspart.
16. **Speicherbereich mit Nullen füllen**: Verwende `std::ptr::write_bytes`, um ein Struct oder Array komplett mit Nullen oder einem anderen Byte-Wert zu überschreiben. Das entspricht dem klassischen Speicherlöschen (`memset`).
17. **Zeiger in Integer umwandeln**: Caste einen rohen Zeiger in einen `usize`-Wert und gib diesen als Hexadezimalzahl aus. Das hilft dir zu verstehen, dass Zeiger letztlich nur Zahlen sind, die Speicheradressen darstellen.
18. **Integer in Zeiger umwandeln**: Wandle eine konkrete Speicheradresse (als `usize`) zurück in einen rohen Zeiger um. Du erkennst dabei die großen Gefahren von willkürlichen Adresszugriffen.
19. **Zeiger auf Funktionen**: Deklariere einen Funktionszeiger auf eine einfache mathematische Funktion und rufe sie über diesen Zeiger auf. Das vermittelt dir die Grundlagen für dynamische Aufrufsysteme auf Systemebene.
20. **Manuelles Drop mit `std::ptr::drop_in_place`**: Zerstöre den Wert an einer Speicheradresse manuell mit `drop_in_place`, ohne den Speicher selbst freizugeben. Du lernst, wie du Destruktoren von Typen auf rohen Speicherbereichen manuell ausführst.

---

## Teil 2: Unsafe Datenstrukturen

Hier baust du deine eigenen Versionen bekannter Datenstrukturen und lernst, wie du mit Unsafe Rust maximale Performance herausholst.

21. **Einfache verkettete Liste (Singly Linked List)**: Implementiere eine verkettete Liste mit rohen Zeigern, bei der du das Einfügen und Löschen manuell steuerst. Dies zeigt dir, wie du ohne den Borrow Checker dynamische Ketten baust.
22. **Doppelt verkettete Liste (Doubly Linked List)**: Erweitere deine verkettete Liste um Rückwärtszeiger, die du bei jeder Operation sauber synchronisieren musst. Hier lernst du den Umgang mit komplexen Zeiger-Beziehungen.
23. **Eigener `Box`-Klon**: Baue ein eigenes Smart-Pointer-Struct, das Speicher auf dem Heap alloziiert und beim Verlassen des Gültigkeitsbereichs über das `Drop`-Trait wieder freigibt. Das vertieft dein Verständnis für RAII in Rust.
24. **Eigener `Vec`-Klon (Minimal)**: Implementiere eine dynamisch wachsende Liste mit Kapazität, Länge und einem Zeiger auf das Heap-Array. Du erfährst, wie Speicherreallokationen manuell verwaltet werden.
25. **Unsafe Ringpuffer**: Erstelle einen zirkulären Puffer mit festem Speicherbereich, der Lese- und Schreibzeiger direkt manipuliert. Du lernst, wie man Hochleistungsdatenstrukturen ohne Index-Prüfungen (Bounds-Checks) optimiert.
26. **Lock-freie Queue (Einfach)**: Baue eine einfache Warteschlange für Threads unter Verwendung von atomaren Zeiger-Operationen aus `std::sync::atomic`. Du verstehst dadurch die Grundlagen von threadsicheren, unsafe Datenstrukturen.
27. **Eigene `Cell`-Implementierung**: Simuliere die interne Veränderlichkeit durch das Aushebeln von Aliasing-Regeln mit `UnsafeCell`. Das zeigt dir, wie Rusts sichere Abstraktionen im Kern aufgebaut sind.
28. **Eigener `Rc`-Klon (Reference Counting)**: Implementiere einen Smart Pointer, der die Anzahl der Referenzen auf dem Heap zählt und das Objekt erst löscht, wenn der Zähler auf Null fällt. Du übst das Teilen von Werten über rohe Zeiger.
29. **Trie-Datenstruktur mit Rohzeigern**: Erstelle einen Präfixbaum zur Suche nach Wörtern, dessen Knoten direkt über rohe Zeiger verknüpft sind. Das optimiert die Performance und spart den Overhead von sicheren Wrappern.
30. **Binary Heap ohne sichere Indizes**: Programmiere einen binären Heap auf Basis eines Rohzeiger-Arrays, bei dem die Eltern-Kind-Beziehungen über Zeiger-Arithmetik berechnet werden. Das trainiert die schnelle Navigation in flachen Speicherstrukturen.
31. **Eigener Arena-Allokator**: Baue einen Allokator, der einen großen Speicherblock reserviert und kleinere Teile davon auf Anfrage über rohe Zeiger herausgibt. Das lehrt dich, wie man Allokations-Overhead minimiert.
32. **Unsafe Stack (Stapel)**: Entwickle einen einfachen Stack, der direkt auf einem festen Speicherbereich arbeitet und Push- sowie Pop-Operationen über Zeiger-Offsets abwickelt.
33. **Selbst-referenzierendes Struct**: Erzeuge eine Struktur, die ein Feld und gleichzeitig einen Zeiger auf dieses Feld enthält. Du erfährst, warum das in sicherem Rust extrem schwer ist und welche Gefahren beim Verschieben von Objekten lauern.
34. **Eigener `Arc`-Klon (Atomarer Rc)**: Erweitere das Reference Counting um atomare Operationen, damit der Smart Pointer sicher zwischen Threads geteilt werden kann. Du lernst das Zusammenspiel aus Unsafe und Thread-Sicherheit.
35. **Graph mit Adjazenzliste über Zeiger**: Erstelle einen gerichteten Graphen, in dem Knoten direkt auf ihre Nachbarn zeigen. Das verhindert Zyklen-Probleme, die bei sicheren Smart Pointern wie `Rc` auftreten würden.
36. **Dynamisches Array mit variabler Elementgröße**: Implementiere eine Struktur, die Bytes speichert, aber Elemente unterschiedlicher Typen und Größen hintereinander ablegt. Das ist nützlich für Serialisierungs-Engines.
37. **LIFO-Queue mit atomarem Austausch**: Verwende atomare Zeiger-Operationen wie `compare_exchange`, um eine einfache LIFO-Warteschlange ohne Mutex zu bauen. Du lernst die Grundlagen von Concurrent Programming kennen.
38. **Speichereffizientes Bit-Set**: Erstelle eine Datenstruktur, die einzelne Bits in einem rohen Speicherbereich direkt per Bit-Masken setzt und ausliest. Das zeigt, wie hardwarenah Daten verdichtet werden können.
39. **Eigener `String`-Typ**: Baue ein Struct, das ein UTF-8-validiertes Byte-Array auf dem Heap verwaltet, inklusive dynamischer Vergrößerung. Du lernst, wie Zeichenketten intern organisiert sind.
40. **B-Baum-Knoten mit Unsafe-Links**: Implementiere einen B-Baum-Knoten, der Schlüssel und Kindzeiger in zusammenhängendem Speicher verwaltet. Dies steigert die Cache-Lokalität durch manuelle Speicherlayouts.

---

## Teil 3: C-Bibliotheken anbinden (FFI)

Lerne, wie du mit ausländischen Funktionen (Foreign Function Interface) interagierst und bestehende C-Bibliotheken in dein Rust-Projekt integrierst.

41. **Mathematische C-Funktionen**: Binde Standard-C-Funktionen wie `sin` oder `cos` direkt über eine `extern "C"`-Deklaration ein. Du lernst die absolute Basis des Foreign Function Interfaces (FFI) kennen.
42. **String-Länge mit `strlen`**: Konvertiere einen Rust-String in ein C-kompatibles Format und bestimme die Länge mit der C-Funktion `strlen`. Du übst den Einsatz von `CString` und `CStr`.
43. **C-Datenstruktur spiegeln**: Definiere in Rust ein Struct mit `#[repr(C)]`, das exakt dem Layout einer C-Struktur entspricht, und übergebe es an eine C-Funktion. Du verstehst, wie Datenkompatibilität garantiert wird.
44. **C-Speicherallokation mit `malloc`**: Reserviere Speicher mithilfe der C-Funktion `malloc` und gib ihn mit `free` wieder frei. Das verdeutlicht dir, wie man plattformübergreifend mit dem C-Heap interagiert.
45. **Umgebungsvariablen über `getenv`**: Rufe die C-Funktion `getenv` auf, um den Wert einer Umgebungsvariable direkt abzufragen. Du lernst das Handling von Rückgabe-Zeigern, die Null sein können.
46. **Zeitmessung mit `clock`**: Verwende den C-Systemaufruf `clock`, um einfache CPU-Zeitmessungen durchzuführen. Das zeigt dir den Umgang mit plattformabhängigen C-Typen wie `clock_t`.
47. **Dynamisches Laden von Bibliotheken**: Lade eine `.so`- oder `.dll`-Datei zur Laufzeit und rufe eine Funktion daraus auf, ohne sie fest einzulinken. Du verstehst das Prinzip von Plugins und Dynamic Linking.
48. **Dateizugriff mit `fopen` und `fread`**: Öffne und lies eine Datei unter direkter Verwendung der C-Standard-I/O-Bibliothek. Du lernst den Umgang mit C-Dateizeigern (`*mut FILE`).
49. **C-Callbacks registrieren**: Übergib eine Rust-Funktion als Callback-Zeiger an eine C-Bibliothek, die diese Funktion später aufruft. Du lernst, wie Closures und Funktionszeiger die FFI-Grenze überwinden.
50. **Fehlerbehandlung mit `errno`**: Lies nach dem Fehlschlagen einer C-Funktion die globale C-Variable `errno` aus, um den genauen Fehlergrund zu ermitteln. Du verstehst den globalen Zustand von C-Programmen.
51. **Sortieren mit `qsort`**: Nutze die C-Standardfunktion `qsort` und übergib ihr ein Rust-Array sowie eine Vergleichsfunktion. Du übst das Zusammenspiel von Arrays und Callbacks über FFI.
52. **C-Union in Rust abbilden**: Erstelle eine Rust-Struktur unter Verwendung des Schlüsselworts `union` und greife auf deren Felder zu. Du lernst, wie verschiedene Typen denselben Speicherplatz teilen.
53. **Zufallszahlen mit `rand`**: Rufe die C-Funktionen `srand` und `rand` auf, um Pseudozufallszahlen zu generieren. Du lernst, wie zustandsbehaftete C-Bibliotheken initialisiert werden müssen.
54. **Speicherbereiche vergleichen mit `memcmp`**: Vergleiche zwei Speicherbereiche direkt auf Byte-Ebene mithilfe der C-Funktion `memcmp`. Das zeigt dir eine schnelle Methode zur Prüfung von Rohdaten.
55. **System-Hostname ermitteln**: Rufe die POSIX-Funktion `gethostname` auf und konvertiere den erhaltenen Puffer in einen Rust-String. Du lernst das Befüllen von vorbereiteten Puffern über FFI.
56. **Formatierte Ausgabe mit `printf`**: Deklariere und nutze die variadische C-Funktion `printf` (Funktionen mit variabler Argumentanzahl). Du lernst die Grenzen und Risiken variadischer FFI-Aufrufe kennen.
57. **Komprimierung mit `zlib`**: Binde die populäre `zlib`-Bibliothek ein, um Daten direkt im Speicher zu komprimieren. Du übst die Integration echter Dritthersteller-Bibliotheken.
58. **SQLite-Datenbank abfragen**: Binde die C-API von SQLite ein, öffne eine Datenbank im Speicher und führe eine Abfrage aus. Das zeigt dir den Umgang mit komplexen C-Handles und Zeiger-Lebensdauern.
59. **Netzwerk-Sockets auf Systemebene**: Erstelle einen Socket über die C-Funktion `socket` und verbinde dich mit einem Server. Du verstehst die hardwarenahe Netzwerkprogrammierung abseits der Standardbibliothek.
60. **C-Makros emulieren**: Viele C-Header nutzen komplexe Makros. Implementiere ein solches Makro als Rust-Funktion oder -Konstante nach, um die Funktionalität für Rust-Nutzer verfügbar zu machen.

---

## Teil 4: Rust-Bibliotheken für C exportieren

Hier machst du deine Rust-Bibliothek für die C-Welt (und andere Sprachen, die C-APIs verstehen) nutzbar.

61. **Einfache Additionsfunktion exportieren**: Schreibe eine Rust-Funktion mit `#[no_mangle]` und `pub extern "C"`, die zwei Zahlen addiert und von C aufgerufen werden kann. Das ist der Einstieg in den Rust-Export.
62. **Rust-String an C übergeben**: Erstelle eine Rust-Funktion, die einen von Rust alloziierten String als C-kompatiblen Zeiger (`*const c_char`) zurückgibt. Du lernst, wie du Datenbesitz über Grenzen hinweg verwaltest.
63. **C-String in Rust freigeben**: Da C-Code den Rust-Speicher nicht direkt freigeben darf, schreibe eine Funktion `free_rust_string`, die den Zeiger wieder in Empfang nimmt und den Speicher korrekt zerstört.
64. **Rust-Struct für C bereitstellen**: Exportiere Funktionen zum Erzeugen und Manipulieren eines in Rust definierten Structs. Du lernst das Konzept von "Opaque Pointers" kennen, bei denen C die Strukturdetails nicht sieht.
65. **Fehlercodes an C zurückgeben**: Designe eine API, die bei Fehlern in Rust strukturierte Ganzzahl-Fehlercodes an das aufrufende C-Programm zurückliefert.
66. **Rust-Logger für C**: Schreibe ein Rust-Modul, das Log-Nachrichten aus C empfängt und über Rusts Standard-Logging-Infrastruktur ausgibt. Du übst den bidirektionalen Informationsfluss.
67. **Callback aus C empfangen und ausführen**: Definiere eine Rust-Funktion, die einen C-Funktionszeiger als Argument akzeptiert und diesen mit in Rust generierten Daten aufruft.
68. **Rust-Array an C übergeben**: Exportiere ein Rust-Array mitsamt seiner Länge an C, sodass C das Array wie ein normales C-Array auslesen kann.
69. **C-Array in Rust verarbeiten**: Nimm einen Zeiger auf ein C-Array und dessen Länge entgegen, wandle es mit `slice::from_raw_parts` in einen sicheren Rust-Slice um und verarbeite es.
70. **Panic-Sicherheit an FFI-Grenzen**: Stelle sicher, dass eine in Rust auftretende Panic nicht über die FFI-Grenze nach C entweicht (was zu undefiniertem Verhalten führt), indem du `std::panic::catch_unwind` nutzt.
71. **Rust-Iterator für C**: Exportiere einen Iterator als opaken Zeiger, den C über eine `next`-Funktion schrittweise auslesen kann, bis ein Nullzeiger das Ende signalisiert.
72. **Konfigurationen als Struct**: Definiere ein flaches Konfigurations-Struct mit `#[repr(C)]`, das direkt von C befüllt und an Rust zur Initialisierung übergeben wird.
73. **Asynchrone Tasks triggern**: Schreibe eine Export-Funktion, die einen asynchronen Task startet und den Fortschritt über einen von C übergebenen Callback meldet.
74. **Speicherstatistik exportieren**: Biete eine Funktion an, die den aktuellen Speicherverbrauch deiner Rust-Bibliothek ermittelt und als C-Struktur zur Verfügung stellt.
75. **Globale Zustände verwalten**: Nutze ein globales Element in Rust, das über FFI-Funktionen aus C heraus manipuliert und abgefragt werden kann.
76. **Generieren von C-Headern**: Verwende das Tool `cbindgen`, um automatisch die passenden C-Headerdateien (`.h`) für deine exportierten Rust-Funktionen zu erzeugen. Du lernst den Build-Prozess zu automatisieren.
77. **Rust-Vektor an C übertragen**: Exportiere eine Funktion, die einen Rust-Vektor in seine Einzelteile (Zeiger, Länge, Kapazität) zerlegt und an C übergibt (`Vec::into_raw_parts`).
78. **Rust-Vektor aus C wiederherstellen**: Nimm die von C gehaltenen Vektor-Einzelteile wieder an und baue daraus mithilfe von `Vec::from_raw_parts` den ursprünglichen Vektor zur korrekten Freigabe wieder auf.
79. **Thread-Erzeugung in Rust für C**: Erstelle eine exportierte Funktion, die einen neuen OS-Thread in Rust startet und dort eine übergebene C-Funktion parallel ausführt.
80. **Benutzerdefinierte Allocatoren**: Exportiere Schnittstellen, mit denen der aufrufende C-Code steuern kann, welchen Speicherallokator Rust intern verwenden soll.

---

## Teil 5: Betriebssystem- & Hardware-Zugriffe

Arbeite direkt mit den Schnittstellen deines Betriebssystems und führe hardwarenahe Operationen aus.

81. **Direkter syscall unter Linux**: Nutze die Funktion `syscall` aus der libc, um einen Systemaufruf (z. B. `gettid` für die Thread-ID) direkt ohne Wrapper auszuführen. Du lernst die Schnittstelle zum OS-Kernel kennen.
82. **Windows-MessageBox**: Rufe die Win32-API-Funktion `MessageBoxW` auf, um ein natives Windows-Dialogfenster anzuzeigen. Du lernst das Handling von UTF-16-Strings.
83. **Memory-Mapped Files (mmap)**: Verwende den `mmap`-Systemaufruf, um eine Datei direkt in den virtuellen Adressraum deines Prozesses zu laden und als Byte-Slice zu lesen. Das demonstriert extrem schnellen Datei-I/O.
84. **Prozess-ID (PID) ermitteln**: Rufe das POSIX `getpid` oder die entsprechende Windows-API auf, um die eigene Prozess-ID direkt vom Betriebssystem abzufragen.
85. **Terminal-Größe abfragen**: Nutze den Systemaufruf `ioctl` mit der Konstante `TIOCGWINSZ`, um die aktuelle Breite und Höhe deines Terminalfensters in Byte-Strukturen auszulesen.
86. **CPU-Features abfragen**: Verwende Inline-Assembly (`asm!`) oder CPUID-Befehle über Unsafe, um spezifische Prozessor-Features (wie AVX oder SSE) direkt abzufragen.
87. **Virtuellen Speicher schützen**: Nutze die Systemfunktion `mprotect` (POSIX) oder `VirtualProtect` (Windows), um einen Speicherbereich zur Laufzeit als schreibgeschützt zu markieren.
88. **Direktes Auslesen von Hardware-Registern**: Simuliere den Zugriff auf ein Memory-Mapped I/O (MMIO) Register, indem du einen Zeiger auf eine feste Speicheradresse castest und mit `volatile` liest.
89. **Volatile-Schreibzugriffe**: Verwende `std::ptr::write_volatile`, um Werte an eine Adresse zu schreiben, bei denen der Compiler die Schreiboperation nicht wegoptimieren darf (wichtig für Treiberentwicklung).
90. **Signale abfangen (Signal-Handler)**: Registriere über die libc einen Signal-Handler für `SIGINT` (Strg+C) und reagiere im unsafe Kontext darauf. Du erfährst, wie asynchrone OS-Interrupts funktionieren.
91. **Hardware-Timer nutzen**: Greife auf hochauflösende Hardware-Timer des Prozessors zu, um präzise Taktzyklen zu zählen (z. B. über den Assemblerbefehl `RDTSC`).
92. **Roh-Zugriff auf die serielle Schnittstelle**: Öffne und konfiguriere eine serielle Schnittstelle (COM-Port oder `/dev/tty`) über direkte Systemaufrufe und `ioctl`.
93. **Shared Memory zwischen Prozessen**: Erstelle einen gemeinsamen Speicherbereich über `shm_open` and `mmap`, um Daten ohne Sockets oder Pipes direkt mit einem anderen Prozess zu teilen.
94. **Dateirechte auf Systemebene ändern**: Rufe die POSIX-Funktion `chmod` direkt auf, um die Berechtigungen einer Datei über Oktalmasken zu manipulieren.
95. **Systemzeit direkt auslesen**: Nutze `clock_gettime` aus der POSIX-Bibliothek, um die aktuelle Systemzeit mit Nanosekunden-Präzision abzufragen.
96. **Daemon-Prozess erstellen**: Nutze den Systemaufruf `fork`, um den aktuellen Prozess zu duplizieren und im Hintergrund als Daemon weiterlaufen zu lassen.
97. **Windows-Registry manipulieren**: Greife über Win32-APIs wie `RegOpenKeyExW` auf die Windows-Registrierungsdatenbank zu, um Werte auszulesen oder zu schreiben.
98. **Page-Size des Betriebssystems ermitteln**: Rufe die Systemkonfiguration `sysconf` mit `_SC_PAGESIZE` auf, um die native Seitengröße des virtuellen Speichers abzufragen.
99. **Prozess-Priorität ändern**: Verwende die Funktion `setpriority`, um die Scheduling-Priorität (Nice-Wert) deines aktuellen Prozesses direkt zu manipulieren.
100. **Inline-Assembler für mathematische Tricks**: Schreibe eine Funktion, die mithilfe des `asm!`-Makros direkt Assembler-Befehle (z. B. Bit-Manipulationen) ausführt, um eine Berechnung extrem zu beschleunigen.
