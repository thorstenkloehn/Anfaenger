# Didaktische Prompts für Rust-Concurrency-Projekte (1–20)

Dieses Dokument enthält strukturierte, modulare Prompts für die ersten 20 Projekte deines Rust-Anfängerbuchs. Jedes Projekt ist in drei aufeinander aufbauende Module unterteilt, die dich schrittweise durch den Entwicklungsprozess führen, ohne fertigen Code vorwegzunehmen.

---

## Projekt 1: Paralleler Array-Summierer

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf die Datenstrukturen, um einen großen Vektor effizient und ohne unnötige Klon-Operationen auf mehrere Berechnungs-Threads aufzuteilen.
* **Konzepte**: Heap-Allokation mit `Vec<T>`, Speichereffizienz, Stack-Referenzen und Lebensdauern (`'static` vs. temporär).
* **Hinweise**: 
  - Überlege dir, wie du den Vektor in gleich große Abschnitte (Slices) unterteilung kannst. Ein Slice `&[T]` ist eine Sicht auf einen Teilbereich eines Vektors auf dem Heap.
  - Wenn du Standard-Threads mit `std::thread::spawn` verwendest, fordert der Compiler, dass die Daten `'static` sind (also die gesamte Programmlaufzeit leben), da er nicht weiß, wie lange ein Thread läuft. Wie kannst du dieses Problem umgehen? Schau dir dazu `std::thread::scope` (Scoped Threads) in der Standardbibliothek an.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Logik zum Aufteilen des Vektors und zum parallelen Berechnen der Teilsummen in Threads.
* **Konzepte**: Scoped Threads, Datenbesitz (Ownership) in Closures, Rückgabewerte aus Threads.
* **Hinweise**:
  - Nutze `chunks` oder `chunks_exact` auf deinem Vektor, um ihn in gleich große Teile zu zerlegen.
  - Starte innerhalb eines `thread::scope` für jedes Segment einen Thread mit `s.spawn()`.
  - Jeder Thread kann die Summe seines Segments berechnen (z.B. mit `.iter().sum()`) und diesen Wert direkt aus der Closure zurückgeben.
  - Sammle die `JoinHandle`-Objekte, die beim Spawnen zurückgegeben werden, in einem Vektor.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Schreibe das Hauptprogramm, verarbeite die Threads und gib das Gesamtergebnis aus.
* **Konzepte**: Synchronisation mit `join()`, Fehlerbehandlung bei Join-Fehlern, Performance-Vergleich.
* **Hinweise**:
  - Durchlaufe in `main.rs` deine gesammelten `JoinHandle`s und rufe `.join()` auf, um auf die Fertigstellung der Threads zu warten und die Teilsummen zu erhalten.
  - Behandle das `Result` von `.join()` aufmerksam. Was passiert, wenn ein Thread panickt?
  - Addiere die Teilsummen auf und vergleiche das Ergebnis mit einer einfachen, sequenziellen Summation, um die Korrektheit zu prüfen.

---

## Projekt 2: Geteilter Zähler mit Mutex

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Struktur, die einen Zähler kapselt, der von mehreren Threads gleichzeitig sicher verändert werden kann.
* **Konzepte**: Shared Mutability, Thread-Sicherheit (`Send` und `Sync`), Heap-Sharing.
* **Hinweise**:
  - Ein normaler Integer-Typ auf dem Stack kann nicht ohne Weiteres von mehreren Threads gleichzeitig verändert werden.
  - Um Daten sicher auf dem Heap zu teilen und gleichzeitig veränderbar zu machen, kombiniert man in Rust zwei Wrapper: `Arc` (Atomic Reference Counting) für das Teilen des Besitzes und `Mutex` (Mutual Exclusion) für die gegenseitig ausschließende Veränderbarkeit.
  - Überlege dir, wie deine Struktur aufgebaut sein muss, um einen solchen `Arc<Mutex<i32>>` zu halten.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Methoden zum Erhöhen und Auslesen des Zählers.
* **Konzepte**: Sperren (Locks), RAII-Pattern (Resource Acquisition Is Initialization), Poisoning.
* **Hinweise**:
  - Um den Wert im Mutex zu verändern, musst du zuerst `.lock()` aufrufen. Das gibt ein `Result` zurück. Warum? Wenn ein Thread mit einem aktiven Lock panickt, wird der Mutex "vergiftet" (poisoned).
  - Nach erfolgreichem `.lock()` erhältst du einen `MutexGuard`. Dieser verhält sich dank des `Deref`-Traits wie eine veränderbare Referenz auf deinen inneren Wert.
  - Der Lock wird automatisch freigegeben, sobald der `MutexGuard` den Scope verlässt (RAII). Überlege dir, wie du Scopes bewusst klein halten kannst, damit andere Threads nicht unnötig blockiert werden.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte mehrere Threads, die den Zähler parallel erhöhen, und gib den Endwert aus.
* **Konzepte**: Thread-Spawning in einer Schleife, Klonen von `Arc`, Zusammenführen der Threads.
* **Hinweise**:
  - Klonen des `Arc` erstellt nur einen neuen Zeiger auf dieselben Daten im Heap. Klonen muss *vor* dem Spawnen des Threads für diesen Thread geschehen.
  - Verwende eine Schleife, um z.B. 10 Threads zu starten, die jeweils den Zähler um einen bestimmten Wert erhöhen.
  - Warte im Hauptthread auf alle Threads, bevor du den finalen Zählerstand ausliest und ausgibst.

---

## Projekt 3: Threadsichere Log-Datei

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine thread-sichere Logger-Struktur, die in eine physische Datei auf dem System schreibt.
* **Konzepte**: Datei-I/O in Rust (`std::fs::File`), Thread-Sicherheit bei I/O-Ressourcen.
* **Hinweise**:
  - Eine Datei ist eine exklusive Systemressource. Wenn mehrere Threads gleichzeitig unkoordiniert schreiben, kommt es zu Zeilenüberlappungen.
  - Schütze die `File`-Struktur in deiner `Logger`-Struktur mit einem `Mutex`.
  - Verwende `Arc`, damit jeder Thread eine Referenz auf den Logger halten kann.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Methode zum Schreiben von Log-Einträgen.
* **Konzepte**: Schreiben in Dateien (`std::io::Write`), Formatierung, Thread-Identifikation.
* **Hinweise**:
  - Implementiere eine Methode `log(&self, message: &str)`.
  - Innerhalb der Methode musst du den Mutex sperren.
  - Formatiere die Log-Nachricht so, dass sie beispielsweise einen Zeitstempel (z.B. über das `chrono`-Crate oder einfache Systemzeit) und die aktuelle Thread-ID (`std::thread::current().id()`) enthält.
  - Verwende `writeln!`, um sauber in den geschützten File-Stream zu schreiben, und vergesse nicht, den Puffer bei Bedarf zu flashen (`flush()`).

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Initialisiere den Logger und starte mehrere Worker-Threads, die gleichzeitig Log-Meldungen erzeugen.
* **Konzepte**: Fehlerbehandlung beim Erstellen von Dateien, CLI-Integration, Beendigung.
* **Hinweise**:
  - Erstelle die Log-Datei im Hauptprogramm unter Verwendung von `std::fs::OpenOptions` (z.B. zum Anhängen/Append).
  - Starte mehrere Threads und bewege Klone des Loggers in sie hinein.
  - Lass die Threads in Schleifen arbeiten und Log-Nachrichten absetzen. Stelle sicher, dass nach Programmende alle Einträge sauber in der Datei stehen und keine Panics unbemerkt blieben.

---

## Projekt 4: Paralleler Primzahlprüfer

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf die Datenstrukturen für die Verwaltung von zu prüfenden Zahlenbereichen und der Lastverteilung.
* **Konzepte**: Verteilung von Daten, Vektoren, Stack vs. Heap.
* **Hinweise**:
  - Wie teilen wir eine Liste von großen Zahlen auf Threads auf? Du kannst einen gemeinsamen Vektor verwenden oder jedem Thread einen festen Teilbereich (Range) zuweisen.
  - Überlege dir, ob die Zahlen vorab generiert und im Heap abgelegt werden sollen, oder ob jeder Thread seine Zahlen dynamisch berechnet.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere den Primzahl-Prüfalgorithmus und die Thread-Logik.
* **Konzepte**: Mathematische Algorithmen in Rust, Channels (`std::sync::mpsc`) für die Rückgabe.
* **Hinweise**:
  - Schreibe eine effiziente Funktion `is_prime(n: u64) -> bool`.
  - Um Ergebnisse der Threads an den Hauptthread zurückzusenden, eignet sich ein Multi-Producer, Single-Consumer Channel (`mpsc::channel`).
  - Jeder Thread erhält einen Sender (`Sender<u64>` oder `Sender<(u64, bool)>`) und schickt seine gefundenen Primzahlen oder Prüfergebnisse durch den Kanal.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Baue das CLI-Hauptprogramm, das die Ergebnisse einsammelt und auswertet.
* **Konzepte**: Empfangen über Channels (`Receiver`), Zeitmessung mit `std::time::Instant`, Benutzerinteraktion.
* **Hinweise**:
  - Lies die Parameter (z.B. Obergrenze der Zahlen, Thread-Anzahl) über die Konsole ein.
  - Starte die Threads und schließe den eigenen Sender des Hauptthreads, damit die Empfänger-Schleife (`for prime in rx { ... }`) terminiert, wenn alle Worker-Threads fertig sind.
  - Stoppe die Zeit und gib die Anzahl der gefundenen Primzahlen sowie die Berechnungsdauer aus.

---

## Projekt 5: Multi-Reader Lese-/Schreibsperre (RwLock)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Konfigurations-Struktur, die von vielen Threads gleichzeitig gelesen, aber nur von einem Thread geschrieben werden darf.
* **Konzepte**: `std::sync::RwLock` im Vergleich zu `Mutex`, Shared-Read vs. Exclusive-Write.
* **Hinweise**:
  - Ein `Mutex` erlaubt immer nur einem einzigen Thread Zugriff. Für Konfigurationsdaten, die oft gelesen, aber selten geändert werden, ist das ein Flaschenhals.
  - Verwende `RwLock<T>`. Dieses erlaubt unendlich viele parallele Leser (`read()`), blockiert aber alle Leser, sobald ein Schreiber (`write()`) die Daten ändern möchte.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere thread-sichere Lese- und Schreibzugriffe auf die Konfiguration.
* **Konzepte**: `RwLockReadGuard`, `RwLockWriteGuard`, Vermeidung von Deadlocks (Read-Locks blockieren Write-Locks).
* **Hinweise**:
  - Implementiere Methoden wie `get_setting(&self) -> String` und `set_setting(&self, new_value: String)`.
  - Achte darauf: Wenn ein Thread versucht, einen Write-Lock zu erwerben, während er selbst oder ein anderer Thread noch einen Read-Lock hält, kann das zu einem Deadlock führen. Locks müssen so schnell wie möglich wieder freigegeben werden.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Simuliere ein realistisches Szenario mit vielen Lese-Threads und einem periodischen Schreib-Thread.
* **Konzepte**: Thread-Koordination, Simulation mit `thread::sleep`, Konsolenausgabe.
* **Hinweise**:
  - Starte beispielsweise 5 Lese-Threads, die in einer Schleife fortlaufend die Konfiguration auslesen und ausgeben.
  - Starte 1 Schreib-Thread, der alle paar Sekunden eine Änderung an den Daten vornimmt.
  - Beobachte und dokumentiere anhand der Konsolenausgaben, wie die Lese-Threads während des Schreibvorgangs kurz pausieren und danach parallel fortfahren.

---

## Projekt 6: Atomarer Fortschrittsbalken

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Fortschritts-Struktur, die ohne Sperren (lock-frei) aktualisiert werden kann.
* **Konzepte**: Atomare Datentypen (`std::sync::atomic::AtomicUsize`), Lock-freie Programmierung.
* **Hinweise**:
  - Mutexes haben einen Overhead durch das Betriebssystem. Atomare Typen nutzen CPU-Instruktionen, um Threadsicherheit ohne Sperren zu garantieren.
  - Verwende für den Fortschritt einen `AtomicUsize`. Überlege, wie du den Maximalwert und den aktuellen Wert speicherst.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Methoden zur Erhöhung und zum Auslesen des Fortschritts.
* **Konzepte**: Memory Ordering (`Ordering::SeqCst`, `Ordering::Relaxed`), atomare Modifikationen (`fetch_add`, `load`).
* **Hinweise**:
  - Zum Erhöhen des Fortschritts verwende `fetch_add(1, Ordering::Relaxed)`. Überlege, warum `Relaxed` in diesem Fall für die Performance ausreicht.
  - Zum Auslesen des Wertes verwende `load(Ordering::Relaxed)`.
  - Kapsle diese Logik in einer sauberen API deiner Struktur.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Erzeuge eine CLI-Animation eines Fortschrittsbalkens, der von Hintergrund-Workern gefüttert wird.
* **Konzepte**: Thread-Synchronisation, Terminal-Manipulation (Cursor zurücksetzen, Carriage Return `\r`).
* **Hinweise**:
  - Starte mehrere Worker-Threads, die eine Aufgabe simulieren (z.B. Berechnung mit kurzem Sleep) und den atomaren Zähler erhöhen.
  - Lass den Hauptthread in einer Schleife laufen, die alle 100ms den atomaren Wert ausliest, den Fortschritt in Prozent berechnet, einen Balken `[===   ]` ausgibt und `std::io::stdout().flush()` aufruft.
  - Beendigung der Schleife, sobald der Zähler den Maximalwert erreicht hat.

---

## Projekt 7: Thread-Spawning in einer Schleife

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere die Daten, die an dynamisch erzeugte Threads übergeben werden sollen.
* **Konzepte**: Eigentumsrechte an Variablen, Heap-Allokation von Zeichenketten (`String`), Stack-Variablen in Closures.
* **Hinweise**:
  - Wenn du Daten wie eine ID (Zahl) oder einen Namen (String) in einer Schleife an Threads übergeben willst, musst du aufpassen, wer der Besitzer dieser Daten ist.
  - Stack-Variablen aus der Schleife können nicht einfach referenziert werden, da die Schleife enden könnte, bevor die Threads fertig sind.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere das Spawning der Threads und die Übergabe der Daten.
* **Konzepte**: Das `move`-Keyword vor Closures, Klonen von Werten für Threads.
* **Hinweise**:
  - Nutze `move` vor der Closure im `thread::spawn`: `thread::spawn(move || { ... })`.
  - Das `move`-Keyword zwingt die Closure dazu, die Variablen, die sie aus der Umgebung verwendet, in ihren eigenen Speicherbereich zu kopieren oder zu verschieben (Ownership-Transfer).
  - Wenn du denselben String in mehreren Threads brauchst, musst du ihn vor dem Spawnen mit `.clone()` kopieren.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Baue das Hauptprogramm, das Benutzerdaten entgegennimmt und die Threads koordiniert.
* **Konzepte**: Benutzerinteraktion mit `std::io::stdin`, Verwaltung von `JoinHandle`s in einem Vektor.
* **Hinweise**:
  - Frag den Benutzer nach der Anzahl der Threads und einem Begrüßungstext.
  - Sammle alle `JoinHandle`s in einem `Vec`.
  - Durchlaufe nach dem Starten aller Threads den Vektor und rufe `.join().unwrap()` auf. Verstehe, warum das wichtig ist, damit das Programm nicht vorzeitig beendet wird.

---

## Projekt 8: Parallele Bildverarbeitung (Graustufen)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf ein einfaches Speicherlayout für ein Bild und seine Pixel im Speicher.
* **Konzepte**: Eindimensionale Vektoren für zweidimensionale Daten, RGB-Strukturen.
* **Hinweise**:
  - Repräsentiere ein Bild als `struct Image` mit Breite, Höhe und einem flachen `Vec<u8>` oder `Vec<Pixel>` (wobei `Pixel` ein Struct aus R, G, B ist).
  - Wie teilen wir diesen Bildvektor auf, sodass mehrere Threads gleichzeitig darin schreiben können, ohne dass Rusts Compiler wegen veränderbarer Aliase ("mutable aliasing") protestiert?

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Aufteilung des Bildes und die Graustufen-Berechnung.
* **Konzepte**: Paralleles Schreiben in Slices, `chunks_mut`, mathematische Graustufenkonvertierung (Luminanz-Formel).
* **Hinweise**:
  - Da Threads in nicht-überlappende Bereiche schreiben, ist das sicher. Rust stellt dafür die Methode `chunks_mut` auf Slices zur Verfügung.
  - Teile das Bild zeilenweise auf. Jeder Thread erhält ein exklusives, veränderbares Slice des Vektors.
  - Implementiere die Graustufen-Methode für ein Pixel: `Y = 0.299*R + 0.587*G + 0.114*B`.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Generiere ein Testbild, verarbeite es parallel und überprüfe das Ergebnis.
* **Konzepte**: Scoped Threads oder Thread-Pools, Leistungs-Benchmarking.
* **Hinweise**:
  - Erstelle im Hauptprogramm ein großes, buntes Test-Pixel-Array im Heap.
  - Nutze Scoped Threads, um die veränderbaren Slices an die Threads zu übergeben (da Scoped Threads garantieren, vor dem Ende des Scopes fertig zu sein, erlaubt Rust hier veränderbare Referenzen).
  - Miss die Zeit und gib aus, ob die Transformation erfolgreich war.

---

## Projekt 9: Deadlock-Demonstrator

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf zwei getrennte, durch Mutexes geschützte Ressourcen, die zu einem Deadlock führen können.
* **Konzepte**: Deadlocks, Lock-Reihenfolge.
* **Hinweise**:
  - Definiere zwei einfache Ressourcen, z.B. `struct ResourceA` und `struct ResourceB`.
  - Packe beide jeweils in ein `Arc<Mutex<...>>`.
  - Ein Deadlock entsteht, wenn Thread 1 Ressource A hält und auf B wartet, während Thread 2 Ressource B hält und auf A wartet.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Logik der beiden konkurrierenden Threads.
* **Konzepte**: Thread::sleep zur Timingsteuerung, Sperren in unterschiedlicher Reihenfolge.
* **Hinweise**:
  - Thread 1 sperrt Ressource A. Baue danach ein kurzes `thread::sleep` ein (damit Thread 2 Zeit hat, Ressource B zu sperren). Danach versucht Thread 1, Ressource B zu sperren.
  - Thread 2 sperrt Ressource B. Nach einem kurzen Schlaf versucht er, Ressource A zu sperren.
  - Beobachte, was passiert, wenn beide versuchen, den jeweils anderen Lock zu erhalten.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte das Programm, beobachte das Hängenbleiben (Freeze) und finde Lösungsansätze.
* **Konzepte**: Debugging von Deadlocks, Lösungsstrategien (`try_lock`, feste Sperrreihenfolge).
* **Hinweise**:
  - Starte die Threads im Hauptprogramm. Das Programm wird nie enden (Deadlock).
  - Implementiere als Alternative eine sichere Variante, bei der z.B. `std::sync::Mutex::try_lock` verwendet wird, um die Sperre nicht-blockierend zu versuchen, oder sorge für eine feste Sperrreihenfolge in allen Threads.

---

## Projekt 10: Thread-lokaler Zustand (Thread Local)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf einen thread-lokalen Speicher für Zustände, die nicht geteilt werden müssen.
* **Konzepte**: Thread Local Storage (TLS), das `thread_local!`-Makro, Speicherisolierung.
* **Hinweise**:
  - Manchmal ist es besser, Daten gar nicht erst zwischen Threads zu teilen, um Sperr-Overhead zu vermeiden.
  - Nutze das Makro `thread_local!`, um eine statische Variable zu deklarieren. Jeder Thread erhält beim Zugriff eine eigene, isolierte Kopie dieser Variable auf seinem Stack/Heap.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere den Zugriff und die Modifikation des thread-lokalen Zustands.
* **Konzepte**: Die `.with()`-Methode, `RefCell` für innere Veränderbarkeit im Thread.
* **Hinweise**:
  - Thread-lokale Variablen in Rust sind standardmäßig nicht veränderbar. Um sie zu ändern, musst du sie mit `std::cell::Cell` oder `std::cell::RefCell` kombinieren.
  - Der Zugriff erfolgt über `NAME.with(|cell| { ... })`. Hierbei wird eine Closure ausgeführt, die Zugriff auf die thread-spezifischen Daten hat.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte mehrere Threads, verändere ihre lokalen Zustände und beweise die Isolation.
* **Konzepte**: Thread-IDs, Assertions, Konsolenausgaben.
* **Hinweise**:
  - Starte mehrere Threads. Jeder Thread soll den thread-lokalen Zähler erhöhen und seinen Wert zusammen mit der Thread-ID ausgeben.
  - Zeige im Hauptprogramm, dass der Zähler des Hauptthreads von den Erhöhungen in den Kind-Threads völlig unberührt bleibt.

---

## Projekt 11: Parallele Wortzählung in Texten

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere die Datenstrukturen für die Texte und die Zählergebnisse.
* **Konzepte**: `std::collections::HashMap`, Zeichenketten-Verarbeitung.
* **Hinweise**:
  - Das Ergebnis einer Wortzählung ist eine Zuordnung von Wörtern zu Häufigkeiten: `HashMap<String, usize>`.
  - Jeder Thread sollte eine eigene, lokale HashMap aufbauen, um Sperrkonflikte (Contention) während der Zählung zu vermeiden.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Zähl-Logik pro Thread und das Zusammenführen der Ergebnisse.
* **Konzepte**: Text-Tokenisierung (z.B. mit `.split_whitespace()`), HashMap-Einträge verändern (`entry`).
* **Hinweise**:
  - Schreibe eine Funktion, die einen Text-String nimmt, ihn bereinigt (Satzzeichen entfernen, Kleinschreibung) und die Worthäufigkeiten in einer HashMap sammelt.
  - Nutze `entry` von HashMap: `map.entry(word.to_string()).and_modify(|c| *c += 1).or_insert(1)`.
  - Die Threads geben diese HashMaps als Rückgabewert ihrer JoinHandles zurück.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Lese Testdaten ein, verteile sie, führe die Teilergebnisse zusammen und gib sie aus.
* **Konzepte**: Iteratoren, Reduktionsphase (MapReduce-Prinzip).
* **Hinweise**:
  - Erstelle im Hauptprogramm eine Liste von langen Strings (oder lade Testdateien).
  - Starte für jeden Text einen Thread, sammle die Ergebnisse ein.
  - Iteriere im Hauptthread über alle zurückgegebenen HashMaps und addiere die Werte in eine globale Gesamt-HashMap. Gib die Top-10 der häufigsten Wörter aus.

---

## Projekt 12: Thread-Priorisierungs-Simulator

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Struktur, die einen Worker mit einer bestimmten Arbeitslast repräsentiert.
* **Konzepte**: Simulation von Systemressourcen, Nicht-Determinismus.
* **Hinweise**:
  - Erstelle ein Struct `Worker` mit einer ID und einer Angabe zur Arbeitsdauer.
  - Wir können die Priorität von Threads im Betriebssystem in purem Rust nicht ohne Weiteres direkt steuern, aber wir können unterschiedliche Geschwindigkeiten simulieren.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Arbeitslogik und die Protokollierung der Fertigstellung.
* **Konzepte**: Künstliche Verzögerungen mit `thread::sleep`, Zeitmessung, atomare Listen oder Channels.
* **Hinweise**:
  - Lass die Worker in ihren Threads eine Schleife durchlaufen. In jedem Schritt schlafen sie für eine kurze Zeit (z.B. 10ms oder 50ms).
  - Nutze einen gemeinsamen Channel oder eine atomare Liste, in die sich die Threads beim Beenden eintragen, um die genaue Reihenfolge der Fertigstellung festzuhalten.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Führe die Simulation aus und visualisiere die unvorhersehbare Reihenfolge.
* **Konzepte**: Nicht-deterministisches Verhalten von Betriebssystem-Schedulern.
* **Hinweise**:
  - Starte 10 Threads mit exakt der gleichen simulierten Arbeitslast.
  - Drucke beim Beenden jedes Threads eine Meldung aus.
  - Führe das Programm mehrmals hintereinander aus und beobachte, dass die Reihenfolge der Fertigstellung fast immer variiert. Erkläre dieses Phänomen.

---

## Projekt 13: Daten-Rennen-Schutz

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine nicht-threadsichere Struktur, um Rusts Sicherheitsgarantien zu provozieren.
* **Konzepte**: `std::rc::Rc` (Reference Counting für Single-Thread), Compiler-Fehlermeldungen verstehen.
* **Hinweise**:
  - In Rust gibt es die Auto-Traits `Send` und `Sync`. Sie bestimmen, ob ein Typ an andere Threads gesendet (`Send`) oder von mehreren Threads verarbeitet (`Sync`) werden darf.
  - `Rc` ist explizit nicht threadsicher (nicht `Send` und nicht `Sync`), da seine Referenzzähler-Updates nicht atomar sind.

### Modul 2: Implementierung & Methoden
* **Ziel**: Versuche, die nicht-threadsicheren Daten an einen Thread zu übergeben, und analysiere den Compiler-Fehler.
* **Konzepte**: Compiler als Partner, `Arc` als Lösung.
* **Hinweise**:
  - Erstelle ein `Rc<i32>` und versuche, es in einer `thread::spawn`-Closure zu verwenden.
  - Lies die Fehlermeldung des Compilers genau durch. Er wird dir sagen, dass `Rc` nicht `Send` implementiert.
  - Ersetze im nächsten Schritt `Rc` durch `Arc` und beobachte, wie das Programm kompiliert.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Dokumentiere den Lerneffekt im Hauptprogramm.
* **Konzepte**: Erklärung von Daten-Rennen (Data Races) und wie Rust sie zur Compilezeit verhindert.
* **Hinweise**:
  - Schreibe das funktionierende Programm mit `Arc`.
  - Ergänze im Code ausführliche Kommentare, die erklären, warum Rusts Typsystem (speziell `Send`/`Sync`) uns vor Abstürzen und undefiniertem Verhalten im Multithreading bewahrt, ohne dass Laufzeit-Garbage-Collection nötig ist.

---

## Projekt 14: Parallele Matrix-Multiplikation

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Matrix-Struktur, die für die zeilenweise Aufteilung geeignet ist.
* **Konzepte**: Zweidimensionale Daten im Speicher (Row-Major-Layout), Vektoren.
* **Hinweise**:
  - Repräsentiere eine Matrix als `struct Matrix` mit Zeilen, Spalten und einem flachen Vektor für die Daten.
  - Für die Multiplikation $C = A \times B$ benötigt jeder Thread Zugriff auf die gesamte Matrix B, aber nur auf bestimmte Zeilen von Matrix A.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Multiplikationslogik und die Thread-Aufteilung.
* **Konzepte**: `Arc` zur gemeinsamen Nutzung von schreibgeschützten Matrizen, Zeilen-Index-Berechnung.
* **Hinweise**:
  - Verpacke die Matrizen A und B in ein `Arc`. Dadurch können alle Threads extrem performant und ohne Klonen der Daten darauf zugreifen.
  - Starte für jede Zeile (oder für Gruppen von Zeilen) der Ergebnismatrix einen Thread.
  - Berechne das Skalarprodukt der entsprechenden Zeile von A mit den Spalten von B.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Baue das Hauptprogramm, erstelle Testmatrizen und führe die Berechnung durch.
* **Konzepte**: Rekonstruktion der Ergebnismatrix aus Thread-Ergebnissen, Validierung.
* **Hinweise**:
  - Definiere zwei Testmatrizen (z.B. $3\times3$ oder größer).
  - Sammle die Zeilen-Ergebnisse der Threads ein und baue daraus die finale Ergebnismatrix auf.
  - Gib die Ausgangsmatrizen und das berechnete Produkt formatiert auf der Konsole aus.

---

## Projekt 15: Selbstgemachter Thread-Pool-Worker

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf die Kernkomponenten eines Thread-Pools: Pool, Worker und Jobs.
* **Konzepte**: Closures im Heap (`Box<dyn FnOnce() + Send + 'static>`), Nachrichtenwarteschlangen.
* **Hinweise**:
  - Ein Thread-Pool vermeidet den Overhead des ständigen Spawnens von Threads, indem er eine feste Anzahl an Workern permanent laufen lässt.
  - Definiere einen Typen-Alias für einen Job: `type Job = Box<dyn FnOnce() + Send + 'static>;`.
  - Die Worker halten einen Empfänger (`Receiver`) eines Channels, über den sie Jobs erhalten. Da ein Standard-Receiver nicht sicher von mehreren Workern geteilt werden kann, musst du ihn in einen `Arc<Mutex<Receiver<Job>>>` einpacken.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Worker-Schleife und die Job-Übergabe.
* **Konzepte**: Endlosschleife in Threads, Sperren des Receivers, Ausführen von Boxed Closures.
* **Hinweise**:
  - Jeder Worker läuft in einer Schleife: `loop { ... }`.
  - Sperre den Mutex des Receivers und warte auf eine Nachricht (`.recv()`). Sobald ein Job kommt, lasse den Lock sofort wieder los, damit andere Worker nicht blockieren.
  - Führe den Job aus: `job()`.
  - Implementiere im `ThreadPool` eine Methode `execute<F>(&self, f: F) where F: FnOnce() + Send + 'static`.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Implementiere das kontrollierte Beenden (Graceful Shutdown) des Pools und teste ihn.
* **Konzepte**: `Drop`-Trait in Rust, Senden von Abbruchsignalen (z.B. Enums für Jobs: `Execute(Job)` oder `Terminate`).
* **Hinweise**:
  - Damit dein Programm nicht ewig läuft, muss der `ThreadPool` den `Drop`-Trait implementieren.
  - Beim Drop des Pools müssen Abbruchsignale an alle Worker gesendet werden, und der Hauptthread muss auf alle Worker-Threads mittels `.join()` warten.
  - Teste deinen Pool im Hauptprogramm mit verschiedenen Rechenaufgaben.

---

## Projekt 16: Atomarer Stopp-Schalter (Kill Switch)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Struktur, die einen globalen und sicheren Stopp-Schalter für laufende Threads bereitstellt.
* **Konzepte**: `std::sync::atomic::AtomicBool`, kooperatives Multitasking.
* **Hinweise**:
  - Du kannst Threads in Rust nicht einfach hart von außen abbrechen (das wäre unsicher, da Ressourcen nicht freigegeben würden). Stattdessen müssen Threads kooperativ arbeiten und selbst prüfen, ob sie aufhören sollen.
  - Verwende ein `Arc<AtomicBool>` als Schalter.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Worker-Schleife mit regelmäßiger Überprüfung des Schalters.
* **Konzepte**: Atomare Leseoperationen, Schleifensteuerung.
* **Hinweise**:
  - Die Worker-Threads führen eine zeitintensive Aufgabe in einer Schleife aus.
  - Zu Beginn jedes Schleifendurchlaufs prüfen sie den Schalter: `if shutdown_signal.load(Ordering::Relaxed) { break; }`.
  - Überlege dir, wie du den Schalter von außen (z.B. über eine Methode `trigger_shutdown(&self)`) auf `true` setzen kannst.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte die Worker und beende sie nach einer gewissen Zeit sauber über den Schalter.
* **Konzepte**: Zeitgesteuertes Abbrechen, Abfangen von Tastatur-Inputs, sauberes Beenden.
* **Hinweise**:
  - Starte die Threads.
  - Lass das Hauptprogramm entweder für 2 Sekunden schlafen oder auf einen Tastendruck des Benutzers (`std::io::stdin().read_line(...)`) warten.
  - Setze das Flag auf `true`, warte auf alle Threads mittels `join()` und gib eine Erfolgsmeldung aus, dass alle Threads sauber beendet wurden.

---

## Projekt 17: Mutex-basiertes Bankkonto

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Kontostruktur, die vor Race Conditions bei Überweisungen geschützt ist.
* **Konzepte**: Mutex-Kapselung, Kontostand-Sicherheit.
* **Hinweise**:
  - Ein Konto besteht aus einer ID und einem Saldo.
  - Um Überweisungen parallel sicher zu machen, muss jedes Konto (oder sein Saldo) durch einen `Mutex` geschützt sein.
  - Wir benötigen einen Mechanismus, um Überweisungen zwischen zwei Konten abzuwickeln.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere eine sichere Überweisungsfunktion und vermeide Deadlocks.
* **Konzepte**: Deadlock-Vermeidung durch Sortierung von Sperren, Sperren von zwei Mutexes parallel.
* **Hinweise**:
  - Wenn Thread 1 Geld von A nach B überweist und Thread 2 gleichzeitig von B nach A, kann es zu einem Deadlock kommen.
  - Lösung: Sortiere die Konten vor dem Sperren immer nach ihrer ID (z.B. sperre immer zuerst das Konto mit der kleineren ID). Dadurch sperren alle Threads die Konten in der exakt gleichen Reihenfolge!

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Simuliere hunderte parallele Überweisungen und überprüfe die Bilanzkreise.
* **Konzepte**: Konsistenzprüfung, Thread-Spawning.
* **Hinweise**:
  - Erstelle im Hauptprogramm einen Vektor von Konten, die jeweils in `Arc` verpackt sind.
  - Starte viele Threads, die zufällige Überweisungen zwischen den Konten vornehmen.
  - Berechne vor und nach der Simulation die Summe aller Kontostände und stelle sicher, dass kein Geld "erfunden" wurde oder verloren ging.

---

## Projekt 18: Paralleler Dateisucher

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf Datenstrukturen zur Speicherung von Suchaufträgen und gefundenen Pfaden.
* **Konzepte**: Dateisystempfade (`std::path::PathBuf`), dynamische Thread-Erstellung.
* **Hinweise**:
  - Wir wollen ein Verzeichnis durchsuchen. Wenn wir ein Unterverzeichnis finden, soll dafür ein neuer Thread gestartet werden (oder eine Aufgabe erzeugt werden).
  - Wie sammeln wir die Ergebnisse? Verwende einen `mpsc::channel` zur Rückgabe gefundener Dateipfade.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die rekursive, parallele Suchfunktion.
* **Konzepte**: Verzeichnisse lesen (`std::fs::read_dir`), Kanäle klonen, Lebensdauern.
* **Hinweise**:
  - Da die Anzahl der Unterverzeichnisse dynamisch ist, müssen wir beim Finden eines Ordners den Sender (`Sender<PathBuf>`) klonen und in den neuen Thread verschieben (`move`).
  - Achte darauf, dass Dateizugriffe fehlschlagen können (z.B. fehlende Berechtigungen). Behandle diese Fehler mit `match` oder `if let`, damit das Programm nicht abstürzt.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: CLI-Interface zur Sucheingabe und Echtzeit-Ausgabe der Pfade.
* **Konzepte**: Konsolenmenü, Empfangen in einer Schleife, Performance-Aspekte.
* **Hinweise**:
  - Lies das Startverzeichnis und den Suchbegriff vom Benutzer ein.
  - Starte die Suche im Hauptverzeichnis.
  - Lass den Hauptthread in einer Schleife über den `Receiver` laufen und gib gefundene Pfade sofort auf der Konsole aus.
  - Überlege dir, wie du erkennst, dass die Suche beendet ist (wenn alle Sender-Klone den Scope verlassen haben, schließt sich der Kanal automatisch).

---

## Projekt 19: Threadübergreifende Fehlerbehandlung

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere einen benutzerdefinierten Fehlertyp und ein Speicherlayout für Thread-Ergebnisse.
* **Konzepte**: `Result`-Typen in Rust, Enums für Fehler.
* **Hinweise**:
  - Threads können auf zwei Arten fehlschlagen: Sie können einen Fehler kontrolliert zurückgeben (`Result::Err`) oder sie können panicken.
  - Definiere einen passenden Fehlertyp (z.B. einen Enum mit verschiedenen Fehlerursachen).

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere Berechnungs-Threads, die gezielt Fehler zurückgeben oder panicken können.
* **Konzepte**: JoinHandles auswerten, Panics abfangen (`std::panic::catch_unwind`).
* **Hinweise**:
  - Wenn ein Thread panickt, gibt `.join()` ein `Err` zurück, das ein `Any`-Objekt (die Panic-Payload) enthält.
  - Wenn der Thread normal durchläuft, gibt `.join()` ein `Ok(Result)` zurück.
  - Implementiere Methoden, die diese beiden Fälle unterscheiden und entsprechend protokollieren.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Schreibe das Hauptprogramm, das fehlerhafte Threads startet und robust weiterläuft.
* **Konzepte**: Auswerten von `Any`, Fehler-Logging, Robustheit.
* **Hinweise**:
  - Starte drei Threads: Einer läuft erfolgreich durch, einer gibt ein `Result::Err` zurück, der dritte panickt (z.B. durch `panic!()`).
  - Werte im Hauptthread alle drei `JoinHandle`s aus.
  - Stelle sicher, dass das Hauptprogramm trotz der Fehler und des Absturzes des dritten Threads sauber bis zum Ende läuft und die Fehlerursachen verständlich ausgibt.

---

## Projekt 20: Daten-Pipeline mit Barriere

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf ein Pipeline-Szenario, bei dem Threads in synchronisierten Phasen arbeiten müssen.
* **Konzepte**: Phasen-Synchronisation, `std::sync::Barrier`.
* **Hinweise**:
  - Eine `Barrier` blockiert jeden Thread so lange, bis eine definierte Anzahl von Threads an dieser Barriere angekommen ist. Erst dann dürfen alle gemeinsam fortfahren.
  - Erstelle eine Struktur, die eine `Barrier` mittels `Arc` teilt.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die mehrphasige Arbeitslogik der Worker.
* **Konzepte**: `barrier.wait()`, Synchronisation von parallelen Arbeitsschritten.
* **Hinweise**:
  - Jeder Thread soll drei Phasen durchlaufen (z.B. 1. Datenvorbereitung, 2. Hauptberechnung, 3. Datenbericht).
  - Nach Phase 1 ruft jeder Thread `barrier.wait()` auf. Erst wenn alle Threads Phase 1 beendet haben, startet Phase 2.
  - Nach Phase 2 ruft jeder Thread erneut `barrier.wait()` auf, bevor Phase 3 startet.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Initialisiere die Pipeline und visualisiere den synchronen Ablauf.
* **Konzepte**: Konsolenausgaben zur Ablaufkontrolle, Zeitversatz simulieren.
* **Hinweise**:
  - Initialisiere die `Barrier` mit the exakten Anzahl der Worker-Threads.
  - Lass die Threads unterschiedlich lange in ihren Phasen rechnen (mittels `thread::sleep`).
  - Beobachte an den Konsolenausgaben, dass kein Thread vorprescht, sondern alle sauber an den Phasengrenzen aufeinander warten.
# Didaktische Prompts für Rust-Projekte (21 - 40)

Dieses Dokument enthält strukturierte, modulare Prompts für die Projekte 21 bis 40, die darauf ausgelegt sind, Rust-Anfänger Schritt für Schritt an fortgeschrittene Concurrency- und Kommunikationskonzepte heranzuführen. Für jedes Projekt gibt es genau drei Module: Basis-Datenstrukturen, Implementierung & Methoden sowie Vollendung & Hauptprogramm.

---

## Projekt 21: Einfacher Nachrichtenkanal (mpsc)

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen für einen einfachen Nachrichtenkanal, über den Textnachrichten übertragen werden sollen.
- Definiere ein benutzerdefiniertes Struct `Message`, das den Textinhalt als `String` sowie einen Zeitstempel (z. B. unter Verwendung von `std::time::SystemTime`) speichert. Überlege dir, wie du die Felder sichtbar machen musst, damit andere Module darauf zugreifen können.
- Beantworte für dich selbst die Frage: Welche Datenstrukturen müssen auf dem Heap liegen und welche können auf dem Stack verbleiben?
- Denke daran, keine fertigen Implementierungen zu schreiben. Deklariere nur die Struktur und stelle sicher, dass sie die nötigen Traits für die Konsolenausgabe ableitet (z. B. `Debug`).

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere nun die Kommunikationslogik mithilfe der Rust-Standardbibliothek.
- Nutze das Modul `std::sync::mpsc`, um einen Kommunikationskanal zu erstellen.
- Schreibe eine Funktion, die einen Worker-Thread startet (`std::thread::spawn`). Dieser Thread soll die Ownership über den Sender (`Sender<Message>`) übernehmen. Nutze dazu das `move`-Keyword vor dem Closure.
- Im Worker-Thread soll eine Nachricht konstruiert und über den Kanal gesendet werden. Achte darauf, wie das Senden Fehler zurückgeben kann und wie man diesen Zustand sicher behandelt.
- Verwende keine fertigen Codelösungen, sondern konzentriere dich auf den Fluss der Ownership und das Fehlerhandling des `send`-Aufrufs.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Führe die Teile in der `main.rs` zusammen.
- Erstelle das Hauptprogramm, das den Worker-Thread startet und die Nachricht im Hauptthread über den `Receiver` empfängt.
- Nutze eine blockierende Empfangsmethode und gib die empfangene Nachricht formatiert auf der Konsole aus.
- Implementiere eine saubere Fehlerbehandlung: Was passiert, wenn der Sender vorzeitig geschlossen wird? Fange diesen Fall ab, ohne dass das Programm abstürzt.

---

## Projekt 22: Fortschritts-Updates via Channel

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen zur Übertragung von Fortschrittsdaten aus einem Hintergrund-Thread.
- Definiere ein Enum `ProgressUpdate` , das den aktuellen Zustand einer Berechnung darstellt. Es sollte mindestens drei Varianten haben: `Started`, `InProgress(u8)` (für den Prozentwert) und `Finished`.
- Überlege, wie das Speicherlayout dieses Enums aussieht. Liegen die Daten auf dem Stack oder dem Heap?
- Bereite das Enum so vor, dass es sicher zwischen Threads übertragen werden kann. Welche automatischen Traits von Rust (`Send`, `Sync`) spielen hier eine Rolle?

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die Berechnungslogik, die im Hintergrund läuft und regelmäßig Updates sendet.
- Schreibe eine Funktion für den Worker-Thread, die eine Schleife durchläuft und eine langsame Berechnung simuliert (z. B. mit `std::thread::sleep`).
- In jedem Schleifendurchgang soll ein `ProgressUpdate::InProgress` über einen `Sender<ProgressUpdate>` geschickt werden.
- Achte darauf, dass der Sender nach Abschluss der Berechnung ein `ProgressUpdate::Finished` sendet. Wie gehst du didaktisch klug mit potenziellen Fehlern beim Senden um, falls der Empfänger die Verbindung trennt?

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Baue die Benutzeroberfläche in der `main.rs` auf.
- Empfange die Fortschrittsdaten im Hauptthread.
- Statt nur Text auszugeben, zeichne einen dynamischen Ladebalken auf der Konsole (z. B. unter Verwendung des Zeilenumbruch-Zeichens `\r`, um die aktuelle Zeile zu überschreiben).
- Beende das Hauptprogramm sauber, sobald `ProgressUpdate::Finished` empfangen wurde oder der Kanal geschlossen ist.

---

## Projekt 23: Producer-Consumer-Bäcker

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf das Domänenmodell für ein Producer-Consumer-Szenario am Beispiel einer Bäckerei.
- Erstelle ein Struct `BakedGood` (z. B. ein Brötchen), das eine eindeutige ID (`u32`) und eine Angabe zur Backzeit enthält.
- Überlege, wie du den Zugriff auf diese Datenstruktur regelst. Da sie über einen Kanal gesendet wird, benötigt sie exklusive Ownership. Muss die Struktur Heap-allokierte Daten enthalten?
- Stelle sicher, dass die Struktur über Thread-Grenzen hinweg bewegt werden kann.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die Rollen des Bäckers (Producer) und des Kunden (Consumer).
- Der Bäcker soll in einem eigenen Thread laufen und in definierten Abständen neue `BakedGood`-Instanzen erzeugen und in einen Kanal einspeisen.
- Der Kunde läuft in einem anderen Thread und entnimmt die Brötchen dem Kanal, um sie zu "verarbeiten" (was du durch ein kurzes Schlafen des Threads simulieren kannst).
- Verwende einen Standard-mpsc-Kanal. Überlege, wie du den Kanal schließt, wenn der Bäcker seine Arbeit beendet hat, und wie der Kunde das Ende des Datenstroms erkennt.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Verbinde die Threads in der `main.rs` und visualisiere den Ablauf.
- Starte den Bäcker-Thread und den Kunden-Thread aus dem Hauptprogramm heraus.
- Implementiere ein Konsolenmenü, in dem der Benutzer festlegen kann, wie viele Brötchen gebacken werden sollen.
- Stelle sicher, dass das Programm erst beendet wird, wenn der Kunde das letzte Brötchen verarbeitet hat (nutze dafür `join` auf den Thread-Handles).

---

## Projekt 24: Mehrere Sender, ein Empfänger

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen für ein Multi-Producer-Szenario.
- Definiere ein Struct `TaskResult` (z. B. das Ergebnis eines Workers). Es soll eine `worker_id: usize` und einen berechneten Wert (`i32`) enthalten.
- Überlege dir, wie du die Sichtbarkeiten der Felder gestaltest.
- Warum ist es in Rust möglich, dass mehrere Threads in denselben Kanal schreiben, aber nur einer liest? Recherchiere das Konzept hinter "mpsc" (Multi-Producer, Single-Consumer).

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere das Aufteilen der Arbeit auf mehrere Threads.
- Erstelle einen mpsc-Kanal im Hauptthread.
- Starte eine Schleife, um mehrere Worker-Threads zu erzeugen. Verwende das Klonen des Senders (`tx.clone()`), um jedem Worker-Thread eine eigene Sender-Instanz mitzugeben.
- Jeder Worker-Thread soll eine Berechnung durchführen, sein Ergebnis als `TaskResult` verpacken und über seinen geklonten Sender abschicken. Achte darauf, dass der ursprüngliche Sender im Hauptthread nach dem Klonen fallen gelassen (`drop`) wird. Warum ist das wichtig?

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Führe die Fäden im Hauptthread zusammen.
- Lies in einer Schleife alle ankommenden Ergebnisse aus dem Empfänger aus.
- Da der Empfänger blockiert, solange noch Sender existieren, stellt das korrekte Droppen aller Sender sicher, dass die Schleife terminiert.
- Gib eine Übersichtstabelle aller Worker-Ergebnisse auf der Konsole aus und berechne die Summe aller Werte.

---

## Projekt 25: Begrenzter Kanal (SyncChannel)

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf ein Experiment zur Erforschung von Backpressure.
- Definiere ein einfaches Struct `Payload`, das eine Sequenznummer (`u32`) enthält.
- Überlege, wie viel Speicher eine solche Instanz belegt. Da wir einen begrenzten Kanal nutzen wollen, ist die Anzahl der Elemente im Speicher fest gedeckelt.
- Leite die notwendigen Traits ab, damit wir den Zustand der Payload leicht protokollieren können.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere einen synchronen Kanal mit feste Puffergröße.
- Nutze `std::sync::mpsc::sync_channel` anstelle des normalen Kanals und wähle eine kleine Kapazität (z. B. 2).
- Schreibe einen schnellen Sender-Thread, der ohne Verzögerung Payloads in den Kanal schreibt.
- Schreibe einen langsamen Empfänger-Thread, der vor jedem Lesevorgang künstlich verzögert wird.
- Nutze Logging-Ausgaben vor und nach dem Sende-Aufruf, um zu beobachten, wann der Sender blockiert. Diskutiere das concept der Backpressure.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Integriere das Experiment in dein Hauptprogramm.
- Starte beide Threads und lasse sie eine definierte Anzahl von Nachrichten austauschen.
- Zeige auf der Konsole in Echtzeit an, wie viele Elemente sich im Kanal befinden bzw. wann der Sender blockiert ist.
- Fange Fehler beim Schließen des Kanals ab und beende das Programm ordnungsgemäß.

---

## Projekt 26: Job-Queue mit Channels

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf das Typsystem für eine dynamische Job-Queue.
- Erstelle ein Enum `Job`, das verschiedene mathematische Operationen repräsentiert, z. B. `Add(i32, i32)`, `Multiply(i32, i32)` oder `Factorial(u32)`.
- Füge eine Variante `Shutdown` hinzu, um dem Worker-Thread das Ende der Arbeit zu signalisieren.
- Überlege, ob das Speicherlayout des Enums durch die unterschiedlichen Payload-Größen beeinträchtigt wird und wie Rust dies optimiert.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere den Worker-Thread, der die Job-Queue abarbeitet.
- Schreibe eine Funktion für den Worker, die in einer Endlosschleife auf neue `Job`-Instanzen wartet.
- Verwende ein Pattern Matching (`match`) auf dem empfangenen Enum, um die entsprechende Berechnung auszuführen und das Ergebnis auszugeben.
- Wenn der Worker die Variante `Shutdown` empfängt, soll er die Schleife sauber abbrechen und sich beenden.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Erstelle das interaktive Kontrollzentrum.
- Implementiere ein Konsolenmenü, über das der Benutzer manuell neue Jobs (z. B. Additionen) erstellen und in die Queue schieben kann.
- Biete eine Option an, um den Worker sauber herunterzufahren (`Shutdown`).
- Warte mit `join` auf den Worker-Thread, um sicherzustellen, dass alle restlichen Jobs vor Programmende verarbeitet wurden.

---

## Projekt 27: Bidirektionale Kommunikation

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf das Protokoll für ein Ping-Pong-Spiel zwischen zwei Threads.
- Definiere zwei getrennte Enums: `PingMessage` und `PongMessage`.
- Jede Nachricht soll eine Runden-Nummer enthalten.
- Überlege dir, wie du zwei getrennte mpsc-Kanäle konzipierst, damit Daten in beide Richtungen fließen können, ohne dass ein Deadlock entsteht. Welche Datenstrukturen müssen wohin verschoben werden?

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die Spiellogik der beiden Akteure.
- Definiere zwei Funktionen: `play_ping(tx, rx)` und `play_pong(tx, rx)`.
- Jede Funktion erhält einen Sender für den einen Kanal und einen Receiver für den anderen Kanal.
- Achte auf die Reihenfolge der Lese- und Schreiboperationen in den Threads. Ein Thread muss das Spiel mit einem initialen Senden beginnen, während der andere zuerst auf den Empfang wartet. Wie verhinderst du, dass beide gleichzeitig blockieren?

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Verbinde die Akteure in der `main.rs`.
- Erstelle die beiden Kanäle und starte die beiden Threads.
- Setze ein Limit für die Rundenanzahl fest. Sobald dieses erreicht ist, bricht die Kommunikation ab.
- Gib jede gesendete und empfangene Nachricht mit Zeitstempel auf der Konsole aus, um den Ablauf sichtbar zu machen.

---

## Projekt 28: Kanal-Verteilung (Multiplexer)

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen für einen Daten-Multiplexer.
- Definiere ein Enum `DataSource`, das beschreibt, woher eine Information stammt (z. B. `SensorA`, `SensorB`).
- Erstelle ein Struct `DataPackage`, das die Quelle (`DataSource`), einen Zeitstempel und den eigentlichen Messwert (`f64`) kapselt.
- Stelle sicher, dass die Datenstrukturen thread-sicher sind und auf dem Stack liegen können.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere das Zusammenführen mehrerer Kanäle.
- Erstelle zwei separate Quell-Kanäle für zwei unterschiedliche Worker-Threads.
- Da Rusts Standard-`Receiver` keine einfache `select!`-Funktion ohne Zusatz-Crates bietet, implementiere einen Multiplexer-Thread, der mittels nicht-blockierendem Abfragen (`try_recv`) oder durch Weiterleiten in einen gemeinsamen, dritten mpsc-Kanal die Daten vereinheitlicht.
- Achte darauf, wie du die Ownership der Sender aufteilst oder klonst.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Erstelle das Hauptprogramm für die Datenvisualisierung.
- Starte die Quell-Threads, die unregelmäßig Daten generieren.
- Der Multiplexer-Thread soll die Daten sammeln und in eine zentrale Log-Datei schreiben oder formatiert ausgeben.
- Implementiere eine Fehlerbehandlung für den Fall, dass eine der Datenquellen unerwartet abbricht.

---

## Projekt 29: Konsolen-Chatroom-Simulator

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Strukturen für einen Chatroom-Server und seine Clients.
- Definiere ein Struct `ChatMessage`, das den Namen des Absenders und die Textnachricht enthält.
- Um Nachrichten an alle Teilnehmer zu verteilen, benötigt der Server eine Liste aller aktiven Empfänger. Da diese Liste von mehreren Threads geteilt und modifiziert werden muss, überlege, wie du sie mit `Arc` und `Mutex` schützt.
- Welche Typen eignen sich für die Liste der aktiven Client-Kanäle?

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die Routing-Schleife des Chatrooms.
- Broker-Thread: Empfängt eingehende Nachrichten über einen zentralen Kanal.
- Bei jedem Empfang einer Nachricht soll der Broker die Liste der registrierten Client-Sender durchgehen und die Nachricht an jeden Client weiterleiten.
- Achte darauf, wie du fehlerhafte Verbindungen (z. B. wenn ein Client-Thread beendet wurde) erkennst und aus der Liste entfernst (Dead Channel Detection).

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Simuliere das Chat-Szenario im Hauptprogramm.
- Starte den Broker-Thread.
- Erstelle mehrere Client-Threads, die in zufälligen Abständen Nachrichten in den Raum senden und gleichzeitig auf ihren individuellen Empfangskanälen lauschen.
- Gib den gesamten Chatverlauf synchronisiert auf der Konsole aus.

---

## Projekt 30: Dateiverarbeitungs-Pipeline

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf das Datenlayout für eine dreistufige Pipeline.
- Definiere drei Typen: `RawLine` (ein einfacher String, der aus einer Datei gelesen wurde), `FilteredLine` (nach Anwendung eines Filters) und `FormattedLine` (bereit zum Schreiben).
- Überlege, wie du den Speicher effizient nutzt. Müssen die Strings bei jedem Schritt neu allokiert werden, oder können wir sie per Ownership durch die Pipeline reichen?
- Stelle sicher, dass die Sichtbarkeiten für die verschiedenen Stufen der Pipeline passen.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die drei Pipeline-Stufen als separate Threads.
- Stufe 1 (Reader): Liest Zeilen aus einer Quelldatei und sendet sie über Kanal A.
- Stufe 2 (Filter): Empfängt aus Kanal A, filtert Zeilen heraus, die ein bestimmtes Suchwort nicht enthalten, und sendet den Rest über Kanal B.
- Stufe 3 (Writer): Empfängt aus Kanal B und schreibt die Zeilen in eine Zieldatei.
- Stelle sicher, dass jede Stufe ihren Sender schließt, sobald sie fertig ist, damit die nachfolgende Stufe weiß, dass keine Daten mehr kommen.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Konfiguriere und starte die Pipeline in der `main.rs`.
- Frage den Benutzer nach dem Pfad zur Eingabedatei und dem Suchbegriff.
- Starte alle Threads, warte auf deren Beendigung und gib eine Erfolgsmeldung inklusive der Anzahl verarbeiteter Zeilen aus.
- Behandle E/A-Fehler (z. B. Datei nicht gefunden) robust auf der Ebene des Hauptprogramms.

---

## Projekt 31: Timeout beim Kanal-Empfang

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf ein System für zeitkritische Nachrichten.
- Erstelle ein Struct `SensorData`, das eine Sensor-ID und einen Messwert enthält.
- Überlege, wie du die Zeitspanne (Timeout) definierst, nach der ein Datenpaket als "verloren" gilt. Welche Typen aus `std::time` sind dafür geeignet?
- Bereite die Datenstruktur so vor, dass sie für Concurrency-Zwecke geeignet ist.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere den Empfang mit Zeitlimit.
- Verwende `std::sync::mpsc::Receiver::recv_timeout` anstelle des blockierenden `recv`.
- Schreibe einen Worker-Thread, der unregelmäßig (z. B. gesteuert durch Zufallszahlen) Daten sendet.
- Implementiere die Empfangsschleife so, dass sie bei Überschreiten des Timeouts eine Warnung ausgibt, aber weiterhin versucht, auf neue Daten zu warten.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Bringe das Zeitlimit-Experiment in die `main.rs`.
- Simuliere einen Ausfall des Senders nach einer bestimmten Zeit.
- Das Hauptprogramm soll nach drei aufeinanderfolgenden Timeouts die Reißleine ziehen, eine Fehlermeldung ausgeben und sich kontrolliert beenden.
- Implementiere ein Konsolenmenü, um die Timeout-Dauer vor dem Start dynamisch anzupassen.

---

## Projekt 32: Nicht-blockierendes Abfragen (try_recv)

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen für eine interaktive Hauptschleife mit Hintergrundaufgaben.
- Definiere ein Struct `TaskStatus` mit einer ID und einem Status-String.
- Überlege, wie du eine nicht-blockierende Kommunikation aufbaust. Welche Zustände kann ein nicht-blockierender Leseversuch zurückgeben? (Hinweis: Schau dir das `TryRecvError`-Enum der Standardbibliothek an).

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere das Polling in der Hauptschleife.
- Starte einen Hintergrund-Thread, der langwierige Aufgaben erledigt und die Ergebnisse über einen Kanal zurücksendet.
- Implementiere im Hauptthread eine "Game Loop"-ähnliche Schleife. Nutze `try_recv`, um in jedem Durchlauf zu prüfen, ob ein Ergebnis vorliegt.
- Wenn kein Ergebnis vorliegt, darf die Schleife nicht blockieren. Führe stattdessen eine andere Aktion aus (z. B. das Zeichnen eines sich drehenden Symbols oder das Verarbeiten von Benutzereingaben).

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Baue die interaktive Konsole in `main.rs` auf.
- Lass den Benutzer während der Hintergrundberechnung Text in die Konsole eingeben.
- Zeige an, wie die Tastatureingaben sofort reagieren, obwohl im Hintergrund gearbeitet wird.
- Beende das Programm sauber, sobald der Hintergrund-Thread meldet, dass er fertig ist.

---

## Projekt 33: Event-Bus mit Kanälen

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Typen für einen flexiblen Event-Bus.
- Definiere ein Enum `SystemEvent`, das verschiedene Ereignisse im System abbildet, z. B. `KeyPress(char)`, `NetworkStatus(bool)` und `SystemAlert(String)`.
- Überlege, wie die Events im Speicher liegen. Sind sie kompakt genug für den Stack?
- Wie würdest du eine Struktur entwerfen, die mehrere Empfänger für dieser Event-Bus verarbeitet?

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere den Event-Verteiler.
- Erstelle einen zentralen Thread, der als Event-Bus fungiert.
- Eingehende Ereignisse sollen analysiert und je nach Typ an unterschiedliche Worker-Threads weitergeleitet werden (z. B. Tastaturevents an den UI-Thread, Alarme an den Logger-Thread).
- Nutze das Klonen von Sendern, um den Event-Bus mit verschiedenen Ereignisquellen zu verbinden.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Integriere den Event-Bus in das Gesamtsystem.
- Simuliere verschiedene Ereignisquellen (z. B. einen Timer-Thread und einen Tastatur-Horcher).
- Lass das Hauptprogramm die ankommenden System-Alerts auf der Konsole farbig hervorheben.
- Stelle sicher, dass bei einem kritischen SystemAlert das gesamte System geordnet heruntergefahren wird.

---

## Projekt 34: Datenfilter-Worker

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf das Datenflussmodell für einen mehrstufigen Zahlenfilter.
- Wir benötigen keine komplexen Structs, sondern arbeiten mit primitiven Ganzzahlen.
- Überlege dir jedoch, wie du die Kanäle typisierst. Welcher Datentyp fließt vom Generator zum Filter, und welcher vom Filter zum Empfänger?
- Diskutiere gedanklich, wie Rusts Typsystem sicherstellt, dass keine ungültigen Datentypen durch die Pipeline geschickt werden.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die Filter-Arbeitsschritte in Threads.
- Thread 1 (Generator): Erzeugt kontinuierlich Zufallszahlen und schickt sie in Kanal 1.
- Thread 2 (Filter): Liest aus Kanal 1, prüft, ob die Zahl gerade ist (z. B. `x % 2 == 0`), und schickt sie bei Erfolg in Kanal 2.
- Verwende Channels für die Verbindung. Achte darauf, dass der Filter-Thread korrekt beendet wird, wenn der Generator-Kanal geschlossen wird.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Verbinde die Stufen in `main.rs`.
- Empfange die gefilterten Zahlen im Hauptthread und gib sie aus.
- Begrenze die Anzahl der zu generierenden Zahlen, damit das Programm nicht endlos läuft.
- Implementiere eine saubere Join-Logik für alle beteiligten Threads.

---

## Projekt 35: Sensor-Aggregator

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen für ein Sensornetzwerk.
- Definiere ein Struct `SensorReading` mit den Feldern `sensor_id: u32`, `value: f32` und `timestamp: std::time::Instant`.
- Überlege dir, wie du dieses Struct auf dem Stack verwaltest. Ist es vorteilhaft, `Copy` und `Clone` für diese Struktur zu implementieren?
- Welche Sichtbarkeitsregeln gelten für die Felder, wenn die Sensoren in einem eigenen Modul definiert sind?

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die simulierten Sensoren und den Aggregator.
- Schreibe eine Funktion, die einen Sensor-Thread startet. Jeder Sensor-Thread erhält eine ID, eine individuelle Frequenz (Sleep-Zeit) und eine Kopie des mpsc-Senders.
- Der Aggregator-Thread empfängt alle Messwerte über den zentralen Receiver.
- Implementiere im Aggregator eine Methode, die die eingehenden Werte pro Sensor-ID zwischenspeichert und einen gleitenden Mittelwert berechnet.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Führe die Sensoren in der `main.rs` zusammen.
- Starte fünf unterschiedliche Sensor-Threads über eine Schleife.
- Gib in der Konsole periodisch eine formatierte Tabelle aus, die den aktuellen Mittelwert jedes Sensors anzeigt.
- Biete dem Benutzer die Möglichkeit, die Simulation durch Drücken von 'Enter' sauber zu beenden.

---

## Projekt 36: Graceful Shutdown via Channel

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf ein Kontrollprotokoll für Worker-Threads.
- Definiere ein Enum `ControlMessage<T>`, das generisch über den Datentyp `T` ist.
- Es soll zwei Varianten haben: `Data(T)` für die normale Arbeitslast und `Shutdown` für das Signal zum Beenden.
- Überlege, welche Vorteile diese generische Definition für die Wiederverwendbarkeit in anderen Projekten hat.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die Shutdown-Logik im Worker.
- Schreibe einen Worker-Thread, der Nachrichten vom Typ `ControlMessage<String>` empfängt.
- Nutze Pattern Matching. Bei `Data` soll der String verarbeitet werden. Bei `Shutdown` soll die Schleife abgebrochen und eventuelle Aufräumarbeiten (z. B. offene Dateihandles schließen) durchgeführt werden.
- Diskutiere, warum dies sicherer ist, als einen Thread einfach hart vom Betriebssystem abbrechen zu lassen.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Integriere das Shutdown-Protokoll in die `main.rs`.
- Sende einige Testdaten an den Worker.
- Sende anschließend die `Shutdown`-Nachricht.
- Warte mit `join` auf den Worker-Thread und gib eine Bestätigung aus, dass der Thread sich ordnungsgemäß beendet hat.

---

## Projekt 37: Auftragsbestätigung (Request-Response)

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf das Kommunikationsmuster für ein Request-Response-System über Channels.
- Erstelle ein Struct `Response` mit dem Ergebnis der Berechnung (z. B. `result: u64`).
- Erstelle ein Struct `Request`, das die Eingabedaten (z. B. eine Zahl `n` für die Fakultätsberechnung) sowie einen eigenen, dedizierten Rückkanal `oneshot_tx: Sender<Response>` enthält!
- Überlege dir gut: Wie wird das Speicherlayout beeinflusst, wenn ein Kanal-Sender selbst als Datenfeld in einer Nachricht über einen anderen Kanal verschickt wird?

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere den Server-Worker, der Anfragen beantwortet.
- Der Server-Thread läuft in einer Schleife und wartet auf `Request`-Objekte auf einem globalen Kanal.
- Für jede Anfrage führt er die Berechnung durch, packt das Ergebnis in ein `Response`-Struct und sendet dieses über den im Request mitgelieferten `oneshot_tx` zurück.
- Achte darauf, dass der Server-Thread nicht blockiert, falls ein einzelner Rückkanal geschlossen ist. Behandle diesen Fehler isoliert.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Setze das Client-Server-Szenario in der `main.rs` um.
- Der Hauptthread (Client) erstellt einen temporären mpsc-Kanal für die Antwort.
- Er schickt ein `Request` mit seinen Daten und dem Sender dieses temporären Kanals an den Server-Thread.
- Der Client wartet dann auf dem Empfänger des temporären Kanals auf die Antwort. Gib das Ergebnis auf der Konsole aus und teste das Verhalten mit mehreren parallelen Anfragen.

---

## Projekt 38: Paralleler Web-Scraper (Simuliert)

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen für einen parallelen Scraper.
- Erstelle ein Struct `ScrapeResult` (z. B. das Ergebnis eines Scraping-Vorgangs), das die URL, den extrahierten Text (simuliert als `String`) und die Anzahl der gefundenen Wörter speichert.
- Überlege, wie du den Speicher für die Texte verwaltest. Da wir viele Webseiten parallel verarbeiten, sollten wir unnötige Kopien vermeiden.
- Leite die benötigten Debug-Traits ab.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere die parallele Scraping-Logik.
- Schreibe eine Funktion, die eine Liste von URLs entgegennimmt.
- Starte für jede URL einen eigenen Thread, der das Herunterladen simuliert (mittels `std::time::Duration` und `sleep`).
- Nach dem simulierten Download parst der Text, zählt die Wörter und schickt das `ScrapeResult` über einen gemeinsamen, geklonten Sender an den Hauptthread zurück.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Erstelle den Aggregator im Hauptprogramm.
- Empfange alle `ScrapeResult`-Strukturen im Hauptthread.
- Berechne die Gesamtanzahl der gescrapten Wörter über alle Seiten hinweg und gib eine formatierte Zusammenfassung aus.
- Implementiere eine Fehlerbehandlung für URLs, die nicht geladen werden konnten (simuliere z. B. Netzwerkfehler).

---

## Projekt 39: Lastverteilung (Load Balancer)

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen für einen Load Balancer.
- Definiere ein Struct `WorkTask` mit einer ID und einer Gewichtung (z. B. Dauer der Ausführung).
- Erstelle eine Datenstruktur `LoadBalancer`, die eine Liste von Sende-Kanälen zu den verschiedenen Worker-Threads verwalte.
- Wie verwaltest du den aktuellen Zustand (z. B. den Zeiger auf den nächsten Worker für Round-Robin) im Load Balancer? Liegt dieser Zustand auf dem Stack?

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere den Verteilungs-Algorithmus.
- Implementiere eine Methode `dispatch(&mut self, task: WorkTask)` für den `LoadBalancer`.
- Diese Methode soll die Aufgabe nach dem Round-Robin-Prinzip (abwechselnd der Reihe nach) an einen der Worker-Threads senden.
- Achte darauf, wie du erkennst, ob ein Worker-Thread abgestürzt oder nicht mehr erreichbar ist, und wie du diesen aus der Liste der verfügbaren Kanäle entfernst.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Simuliere eine hohe Arbeitslast in `main.rs`.
- Initialisiere den Load Balancer mit z. B. vier Worker-Threads.
- Generiere in einer Schleife 20 Aufgaben und verteile sie über den Load Balancer.
- Gib auf der Konsole aus, welcher Worker welche Aufgabe erhalten hat, um die gleichmäßige Verteilung zu verifizieren.

---

## Projekt 40: Audio-Synthesizer-Pipeline

### Modul 1: Basis-Datenstrukturen
*Prompt:*
Entwirf die Datenstrukturen für einen Echtzeit-Audiosynthesizer.
- Definiere ein Struct `AudioBuffer` , das einen Vektor von Samples (`Vec<f32>`) und eine Samplerate (`u32`) enthält.
- Überlege, wie du Speicherallokationen im Audiothread vermeidest (da Allokationen auf dem Heap nicht deterministisch sind und zu Audio-Aussetzern führen können). Wie kannst du Puffer wiederverwenden?
- Überlege, wie die Concurrency-Primitive ausgelegt sein müssen, damit der Generierungsthread und der Wiedergabethread ohne gegenseitiges Blockieren arbeiten können.

### Modul 2: Implementierung & Methoden
*Prompt:*
Implementiere den Synthesizer und den Abspieler.
- Thread 1 (Synthesizer): Generiert mathematisch eine Sinusschwingung und schreibt die Samples in einen `AudioBuffer`. Dieser wird über einen mpsc-Kanal gesendet.
- Thread 2 (Player): Empfängt die Puffer kontinuierlich und simuliert das Abspielen (z. B. durch zeitgenaues Schlafen entsprechend der Pufferlänge).
- Verwende einen begrenzten Kanal (`sync_channel`), um zu verhindern, dass der Synthesizer unendlich viele Puffer im Voraus generiert und den Speicher überfüllt.

### Modul 3: Vollendung & Hauptprogramm
*Prompt:*
Erstelle das Steuerungsmenü in `main.rs`.
- Biete dem Benutzer ein interaktives Konsolenmenü, um während des Abspielens die Frequenz (Tonhöhe) der Sinuswelle dynamisch zu ändern (z. B. von 440 Hz auf 880 Hz).
- Wie übergibst du diese Steuerungsparameter sicher an den Synthesizer-Thread, während dieser läuft? (Nutze dafür entweder einen zweiten Kontroll-Kanal oder ein atomares Flag/Wert wie `std::sync::atomic`).
- Implementiere ein sauberes Beenden der gesamten Audiopipeline auf Tastendruck.
# Didaktische Prompts für Rust-Projekte (Kapitel 41 - 60)

Dieses Dokument enthält präzise, modulare Prompts für die Projekte 41 bis 60 eines Rust-Anfängerbuchs. Die Prompts sind didaktisch aufgebaut, verzichten vollständig auf fertige Codelösungen und leiten dich Schritt für Schritt durch die asynchrone Programmierung mit der Tokio-Runtime.

---

## Projekt 41: Erste asynchrone Funktion

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine einfache Struktur, die eine auszugebende Nachricht und eine Verzögerungsdauer kapselt.
* **Konzepte**: Structs, Sichtbarkeiten, `std::time::Duration`.
* **Hinweise**: 
  - Erstelle eine Struktur, die den Text hält, der nach dem Warten ausgegeben werden soll.
  - Verwende für die Verzögerungszeit den Typ `Duration` aus der Standardbibliothek.
  - Überlege dir, wie du das Speicherlayout wählst: Soll der Text als String-Typ auf dem Heap liegen (`String`) oder reicht eine geliehene Referenz (`&str`)? Bedenke dabei die Lebensdauer (`'a`), wenn du Referenzen in Strukturen verwendest. Für den Einstieg is ein `String` oft einfacher zu handhaben.
  - Achte auf die Sichtbarkeit (`pub`), damit diese Struktur später in anderen Modulen verwendet werden kann.

### Modul 2: Implementierung & Methoden
* **Ziel**: Schreibe eine asynchrone Methode, die die Verzögerung durchführt und danach die Nachricht ausgibt.
* **Konzepte**: `async fn`, `.await`, `tokio::time::sleep`, `Future`.
* **Hinweise**:
  - Implementiere eine Methode für deine Struktur, die als `async fn` deklariert ist.
  - Nutze `tokio::time::sleep` anstelle von `std::thread::sleep`. Warum ist das in einer asynchronen Runtime wichtig? Was passiert mit dem Betriebssystem-Thread, wenn du asynchron schläfst?
  - Denke daran, das Ergebnis von `sleep` mit `.await` aufzulösen. Jedes `async fn` gibt implizit einen Typ zurück, der das `Future`-Trait implementiert. Ohne `.await` wird der Code nicht ausgeführt.
  - Gib nach dem `.await` die in der Struktur gespeicherte Nachricht auf der Konsole aus.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Binde deine Struktur und Methode in die asynchrone Hauptfunktion ein und starte das Programm.
* **Konzepte**: `#[tokio::main]`, `async fn main()`, Fehlerbehandlung.
* **Hinweise**:
  - Deklariere deine `main`-Funktion als `async fn` und verziere sie mit dem Makro `#[tokio::main]`. Was macht dieses Makro im Hintergrund mit deiner Runtime?
  - Erzeuge in `main` eine Instanz deiner Struktur.
  - Rufe die asynchrone Methode auf und verwende auch hier `.await`, um sicherzustellen, dass die Ausführung stattfindet und blockiert, bis sie fertig ist.
  - Stelle sicher, dass du eventuelle Fehler sauber behandelst (in diesem einfachen Fall reicht eine saubere Konsolenausgabe des Erfolgs).

---

## Projekt 42: Parallele HTTP-Anfragen (Simuliert)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Datenstruktur, die eine simulierte Netzwerkanfrage repräsentiert.
* **Konzepte**: Structs, Enums für Statusmeldungen, Heap-Allokation.
* **Hinweise**:
  - Erstelle ein Struct für einen `Request`, das eine eindeutige ID (z. B. `u32`) und eine simulierte URL (z. B. `String`) enthält.
  - Definiere ein Enum `RequestStatus` mit Varianten wie `Pending`, `Success(String)` und `Failed(String)`.
  - Achte darauf, dass deine Strukturen das Trait `Clone` implementieren, falls sie zwischen mehreren Tasks geteilt werden müssen, oder überlege, ob ein reiner Besitztransfer (Move-Semantik) ausreicht.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere eine asynchrone Simulationsfunktion und starte mehrere Instanzen davon parallel.
* **Konzepte**: `tokio::spawn`, `JoinHandle`, Multithreading-Sicherheit, Datentransfer in Tasks.
* **Hinweise**:
  - Erstelle eine asynchrone Funktion, die einen `Request` entgegennimmt, eine zufällige Zeit lang schläft (z. B. mit `tokio::time::sleep`) und dann den Status zurückgibt.
  - Verwende `tokio::spawn`, um für jeden Request einen eigenen Task zu starten. Was passiert mit der Variable, wenn sie an `tokio::spawn` übergeben wird? Warum musst du das Schlüsselwort `move` vor den Closure-Block setzen?
  - `tokio::spawn` gibt ein `JoinHandle` zurück. Welchem Typ in der synchronen Standardbibliothek (`std::thread::JoinHandle`) ähnelt das? Wie fängst du Fehler ab, die auftreten, wenn ein Task panikt?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte in der Hauptfunktion eine Liste von Anfragen parallel, warte auf ihre Ergebnisse und gib diese aus.
* **Konzepte**: Vektoren von `JoinHandle`s, Schleifen über asynchrone Ergebnisse.
* **Hinweise**:
  - Erstelle eine Liste (z. B. einen `Vec`) mit mehreren simulierten Anfragen.
  - Iteriere über diese Liste, spawne die Tasks und sammle die `JoinHandle`s in einem Vektor.
  - Verwende eine weitere Schleife, um über die gesammelten Handles zu iterieren und auf jedes einzelne mit `.await` zu warten.
  - Behandle den Rückgabewert des Handles vorsichtig: Es kann ein Fehler der Runtime vorliegen (z. B. wenn der Task abgebrochen wurde) oder das tatsächliche Ergebnis der Simulation. Trenne diese Fehler sauber auf.

---

## Projekt 43: Asynchroner Timer-Dienst

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf die Datenstrukturen für ein Timer-Event und eine Timer-Verwaltung.
* **Konzepte**: Structs, `std::time::Duration`, Sichtbarkeiten.
* **Hinweise**:
  - Definiere eine Struktur `TimerEvent` mit einem Namen (`String`) und einer Laufzeit (`Duration`).
  - Definiere eine Struktur `TimerManager`, die eine Liste von `TimerEvent`s verwaltet.
  - Überlege dir, wie du die Events intern speicherst: Reicht ein einfacher Vektor? Müssen die Events sortiert sein?

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Logik zum asynchronen Starten der Timer.
* **Konzepte**: `tokio::spawn`, asynchrones Warten, nebenläufiges Abarbeiten.
* **Hinweise**:
  - Implementiere eine Methode für `TimerManager`, die alle registrierten Timer gleichzeitig startet.
  - Jeder Timer soll in einem eigenen Task (`tokio::spawn`) ausgeführt werden.
  - Nutze `tokio::time::sleep`, um die Wartezeit des Timers abzubilden.
  - Nach Ablauf der Wartezeit soll eine Benachrichtigung ausgegeben werden, die den Namen des abgelaufenen Timers enthält.
  - Achte darauf, dass die Tasks unabhängig voneinander laufen und sich nicht gegenseitig blockieren.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Binde den Timer-Dienst in ein Hauptprogramm ein, erstelle verschiedene Timer und beobachte die parallele Fertigstellung.
* **Konzepte**: `#[tokio::main]`, Integration, Benutzerinteraktion.
* **Hinweise**:
  - Erstelle in `main` eine Instanz des `TimerManager`.
  - Füge dem Manager mehrere Timer mit unterschiedlichen Zeiten hinzu (z. B. 1 Sekunde, 3 Sekunden, 500 Millisekunden).
  - Starte alle Timer und stelle sicher, dass das Hauptprogramm nicht sofort beendet wird, bevor alle Timer abgelaufen sind. Wie kannst du in `main` darauf warten, dass alle gestarteten Tasks fertig sind? (Denke an die `JoinHandle`s).

---

## Projekt 44: Asynchrone Dateileser

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere Strukturen für das Ergebnis eines asynchronen Dateilesevorgangs.
* **Konzepte**: Structs, Fehlerkapselung, Path-Handling (`std::path::PathBuf`).
* **Hinweise**:
  - Erstelle eine Struktur `FileReadResult`, die den Dateipfad, den gelesenen Inhalt als `String` und ein eventuelles Fehlerobjekt (`std::io::Error`) kapselt.
  - Warum ist es hier sinnvoll, `PathBuf` statt `&Path` zu verwenden? (Denke an Besitzansprüche und Lebensdauern bei der Übergabe an asynchrone Tasks).

### Modul 2: Implementierung & Methoden
* **Ziel**: Schreibe eine asynchrone Funktion, die eine Datei liest, und lagere den Prozess in Tasks aus.
* **Konzepte**: `tokio::fs::File`, `tokio::io::AsyncReadExt`, `tokio::spawn`, asynchroner I/O.
* **Hinweise**:
  - Verwende `tokio::fs::File::open` und Methoden wie `read_to_string` aus dem Trait `AsyncReadExt`.
  - Achte darauf, dass du das Trait `tokio::io::AsyncReadExt` in deinen Namensraum importierst, da du sonst die asynchronen Lesemethoden auf dem File-Objekt nicht aufrufen kannst.
  - Schreibe eine Funktion `read_file_async(path: PathBuf) -> FileReadResult`. Jede I/O-Operation erfordert ein `.await`. Was passiert im Hintergrund, wenn die Festplatte ausgelastet ist? Blockiert dein Thread?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Lies mehrere Dateien gleichzeitig ein und verarbeite die Inhalte in `main`.
* **Konzepte**: Dateisystemzugriff, Fehlerprüfung, Task-Synchronisation.
* **Hinweise**:
  - Erzeuge einige Testdateien auf deiner Festplatte.
  - Starte das Lesen dieser Dateien parallel mit `tokio::spawn`.
  - Warte auf alle Tasks und gib die gelesenen Inhalte oder aufgetretene Fehler (z. B. "Datei nicht gefunden") sauber formatiert auf der Konsole aus.

---

## Projekt 45: Tokio-Channel (mpsc)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf ein Nachrichtenformat für die Kommunikation zwischen mehreren Sendern und einem Empfänger.
* **Konzepte**: Enums für Nachrichten, `tokio::sync::mpsc`.
* **Hinweise**:
  - Definiere ein Enum `Message` mit verschiedenen Varianten (z. B. `WorkData(u32)`, `StatusReport(String)`, `Shutdown`).
  - Warum eignet sich ein Enum hier besser als ein einfacher String oder eine Zahl?
  - MPSC steht für "Multi-Producer, Single-Consumer". Überlege dir vorab, wie viele Sender (Producer) und wie viele Empfänger (Consumer) du benötigst.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Logik für Sender-Tasks und den Empfänger-Task unter Verwendung des Kanals.
* **Konzepte**: `tokio::sync::mpsc::channel`, `Sender::send`, `Receiver::recv`, Klonen von Sendern.
* **Hinweise**:
  - Initialisiere den Kanal mit `mpsc::channel(buffer_size)`. Was bedeutet die Puffergröße und was passiert, wenn sie voll ist?
  - Klone den `Sender`-Teil des Kanals mit `.clone()`, um ihn an mehrere asynchrone Tasks zu verteilen.
  - Spawne mehrere Sender-Tasks, die Nachrichten in den Kanal schreiben. Nutze `.send(msg).await`. Warum ist das Senden asynchron?
  - Implementiere in einer Schleife den Empfang auf dem `Receiver`-Teil. Verwende `.recv().await`. Wann gibt diese Methode `None` zurück?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Bringe Sender und Empfänger in `main` zusammen und beende das Programm sauber, wenn alle Nachrichten verarbeitet wurden.
* **Konzepte**: Lifecycle von Channels, Drop-Verhalten, Schleifensteuerung.
* **Hinweise**:
  - Starte die Sender-Tasks in `main`.
  - Lies die Nachrichten in einer asynchronen Schleife aus, bis der Kanal geschlossen wird.
  - Wichtig: Der Empfänger-Kanal schließt sich automatisch, sobald *alle* Sender-Instanzen out-of-scope gehen (gedroppt werden). Achte darauf, dass der ursprüngliche Sender in `main` nicht versehentlich die Schleife blockiert, weil er nie gedroppt wurde!

---

## Projekt 46: Timeout für asynchrone Tasks

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf eine Struktur, die eine langwierige Operation konfiguriert.
* **Konzepte**: Structs, `std::time::Duration`.
* **Hinweise**:
  - Erstelle eine Struktur `TaskConfig` mit einer ID, einer Arbeitsdauer und einer Timeout-Grenze.
  - Stelle sicher, dass die Felder logisch getrennt sind, damit du flexibel mit verschiedenen Wartezeiten experimentieren kannst.

### Modul 2: Implementierung & Methoden
* **Ziel**: Setze ein asynchrones Timeout für eine simulierte Netzwerkoperation um.
* **Konzepte**: `tokio::time::timeout`, Fehlerbehandlung bei Timeouts (`Elapsed`).
* **Hinweise**:
  - Schreibe eine asynchrone Funktion `heavy_calculation(duration: Duration) -> String`, die die angegebene Zeit schläft und dann ein Ergebnis zurückgibt.
  - Verwende `tokio::time::timeout(limit, heavy_calculation(duration))`.
  - Analysiere den Rückgabetyp von `timeout`. Dieser ist ein `Result<ResultType, Elapsed>`. Wie unterscheidest du zwischen dem erfolgreichen Abschluss deiner Funktion und dem Timeout-Ereignis?
  - Verwende Pattern Matching (`match` oder `if let`), um beide Pfade sauber zu trennen.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Teste das Verhalten mit verschiedenen Zeitkonfigurationen in `main`.
* **Konzepte**: Integration, Auswertung von Timeouts.
* **Hinweise**:
  - Führe in `main` zwei Szenarien aus:
    1. Die Operation ist schneller fertig als das Limit (Erfolg).
    2. Die Operation dauert länger als das Limit (Timeout).
  - Gib für beide Fälle eine klare und verständliche Rückmeldung auf der Konsole aus.

---

## Projekt 47: Parallele Ausführung mit join!

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Erstelle Datenstrukturen für unterschiedliche Berechnungsergebnisse.
* **Konzepte**: Structs, Ergebnistypen.
* **Hinweise**:
  - Da wir drei verschiedene Berechnungen durchführen wollen, entwirf für jede Berechnung einen passenden Ausgabetyp (z. B. `struct UserData`, `struct Statistics`, `struct SystemStatus`).
  - Alternativ kannst du auch ein Tuple oder ein Enum nutzen, um die unterschiedlichen Berechnungen zu kennzeichnen.

### Modul 2: Implementierung & Methoden
* **Ziel**: Schreibe drei eigenständige asynchrone Berechnungsfunktionen und führe sie parallel aus.
* **Konzepte**: `tokio::join!`, parallele Futures-Auswertung, kein separates Spawning.
* **Hinweise**:
  - Implementiere drei Funktionen, die jeweils eine simulierte Verzögerung (unterschiedlicher Länge) haben.
  - Verwende das Makro `tokio::join!(future1, future2, future3)`.
  - Wichtiges Konzept: Was ist der Unterschied zwischen `tokio::join!` und dem Spawnen von Tasks via `tokio::spawn`? (Hinweis: `join!` läuft kooperativ auf demselben Task, es sei denn, die Futures werden vorher gespawnt. Es ist perfekt für das gleichzeitige Abwarten unabhängiger Futures).
  - Wie erhältst du die Rückgabewerte aus dem Makro? Das Makro gibt ein Tuple der Ergebnisse zurück.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Rufe die parallelen Berechnungen in `main` auf und verarbeite die zusammengeführten Daten.
* **Konzepte**: `main.rs`, Konsolenausgabe, Zeitmessung.
* **Hinweise**:
  - Starte vor dem Aufruf von `join!` eine Zeitmessung (`std::time::Instant`).
  - Führe `join!` aus.
  - Gib die Ergebnisse aus und prüfe die verstrichene Zeit. Entspricht sie der Summe der drei Einzelzeiten oder der Dauer der längsten Einzelaufgabe? Warum ist das so?

---

## Projekt 48: Wer gewinnt? (select!)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere einen Typ für den Gewinner-Task und sein Ergebnis.
* **Konzepte**: Enums für Gewinner-Zuweisung, Structs.
* **Hinweise**:
  - Erstelle ein Enum `TaskResult` das beschreiben kann, welcher Task zuerst fertig wurde (z. B. `TaskA(String)`, `TaskB(u32)`).
  - Warum ist ein Enum hier nützlich? Da die Tasks unterschiedliche Rückgabetypen haben können, hilft ein Enum, das Gesamtergebnis einheitlich zu typisieren.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Logik mit `tokio::select!`.
* **Konzepte**: `tokio::select!`, Cancellation von Futures, asynchrone Verzweigung.
* **Hinweise**:
  - Erstelle zwei asynchrone Funktionen mit unvorhersehbarer Dauer (z. B. unter Verwendung eines Zufallszahlengenerators für die Schlafdauer).
  - Nutze `tokio::select!`, um auf beide Futures zu warten.
  - Wichtiges Konzept: Was passiert mit der verbleibenden Future, die den "Wettlauf" verloren hat, wenn `select!` feuert? (Stichwort: Cancellation / Dropping).
  - Achte darauf, wie du die Zweige in `select!` formulierst. Jeder Zweig wartet auf eine Future und stellt Variablen für den zugehörigen Codeblock bereit.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte das Rennen in der Hauptfunktion und gib den Gewinner aus.
* **Konzepte**: Integration, Schleifen mit `select!`, kontrollierter Abbruch.
* **Hinweise**:
  - Rufe das `select!`-Szenario mehrmals in einer Schleife auf.
  - Protokolliere auf der Konsole, wie oft Task A gewinnt und wie oft Task B gewinnt.
  - Stelle sicher, dass Ressourcen (wie offene Verbindungen oder Timer) beim Abbruch der langsameren Future sauber aufgeräumt werden.

---

## Projekt 49: Asynchroner TCP-Echo-Server

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere die Konfiguration des Servers (IP-Adresse und Port).
* **Konzepte**: Structs, Netzwerkkonfiguration (`std::net::SocketAddr`).
* **Hinweise**:
  - Erstelle ein Struct `ServerConfig` mit einer Adresse und einem Port.
  - Überlege dir, wie du die Adresse als String oder direkt als `SocketAddr` verwaltest. Letzteres validiert die Adresse bereits zur Erstellungszeit.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Server-Schleife und das Handling einzelner Client-Verbindungen.
* **Konzepte**: `tokio::net::TcpListener`, `tokio::net::TcpStream`, `tokio::io::split`, `tokio::io::copy`, `tokio::spawn`.
* **Hinweise**:
  - Binde den Listener mit `TcpListener::bind(&addr).await`.
  - Verwende eine Endlosschleife `loop`, um mit `.accept().await` eingehende Verbindungen entgegenzunehmen.
  - Spawne für jede eingehende Verbindung (`TcpStream`) einen eigenen Task mit `tokio::spawn`. Warum ist das wichtig? Was würde passieren, wenn wir die Verbindung direkt im Hauptthread des Listeners abarbeiten würden?
  - Verwende im Verbindungs-Task Hilfsmittel wie `tokio::io::copy` oder teile den Stream mit `stream.split()` in einen Reader und Writer auf, um Daten vom Client direkt wieder an ihn zurückzusenden (Echo).

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte den Server in `main` und füge eine saubere shutdown-Logik hinzu.
* **Konzepte**: Server-Lifecycle, Fehlerbehandlung bei Socket-Verbindungen.
* **Hinweise**:
  - Starte den Server in der asynchronen `main`.
  - Behandle potenzielle E/A-Fehler (z. B. belegte Ports) beim Starten des Servers.
  - Gib Log-Meldungen auf der Konsole aus, wenn sich ein Client verbindet oder die Verbindung trennt.

---

## Projekt 50: Asynchroner TCP-Client

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere die Daten, die an den Server gesendet werden sollen.
* **Konzepte**: Structs, Serialisierung zu Bytes.
* **Hinweise**:
  - Erstelle eine Struktur `ClientRequest`, die eine Nachricht als String enthält.
  - Überlege dir, wie du den String in Bytes umwandeln kannst (`.as_bytes()`), da Netzwerksockets nur rohe Byte-Buffer übertragen.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Verbindungs- und Kommunikationslogik des Clients.
* **Konzepte**: `tokio::net::TcpStream`, `tokio::io::AsyncWriteExt`, `tokio::io::AsyncReadExt`.
* **Hinweise**:
  - Verbinde dich mit dem Server unter Verwendung von `TcpStream::connect(address).await`.
  - Schreibe Daten auf den Socket mit `.write_all().await`.
  - Lies die Antwort vom Server unter Verwendung von `.read().await` in einen zuvor allokierten Puffer (z. B. `let mut buf = [0; 1024]`).
  - Achte darauf, wie viele Bytes tatsächlich gelesen wurden, und wandle diesen Teil des Puffers wieder in einen UTF-8-String um.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Schreibe ein interaktives Konsolenprogramm, das Benutzereingaben an den Server schickt.
* **Konzepte**: Konsolenmenü, asynchrone Eingabe (`tokio::io::stdin()`), Fehlerbehandlung.
* **Hinweise**:
  - Ermögliche es dem Benutzer in einer Schleife, Text in die Konsole einzugeben.
  - Sende diesen Text asynchron an den Echo-Server.
  - Zeige die Antwort des Servers an.
  - Implementiere eine Abbruchbedingung (z. B. wenn der Benutzer "exit" eingibt).

---

## Projekt 51: Asynchroner Mutex

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf einen gemeinsam genutzten Zustand.
* **Konzepte**: Structs, Thread-Sicherheit, Heap-Sharing (`std::sync::Arc`).
* **Hinweise**:
  - Erstelle ein Struct `SharedCounter`, das einen internen Zähler (z. B. `u64`) hält.
  - Um diesen Zähler sicher zwischen asynchronen Tasks zu teilen, musst du ihn in einen `Arc` (Atomic Reference Counted) verpacken.
  - Um ihn veränderbar zu machen, benötigst du einen Mutex. Verwende hier explizit `tokio::sync::Mutex` und nicht `std::sync::Mutex`. Warum? Was passiert, wenn eine Sperre (Lock) über einen `.await`-Punkt hinweg gehalten wird?

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere Methoden zum sicheren Erhöhen des Zählers in Tasks.
* **Konzepte**: `tokio::sync::MutexGuard`, `.lock().await`.
* **Hinweise**:
  - Schreibe eine Funktion, die den in `Arc<Mutex<SharedCounter>>` verpackten Zustand entgegennimmt.
  - Fordere die Sperre an: `let mut guard = counter.lock().await;`.
  - Inkrementiere den Zähler.
  - Was passiert, wenn du innerhalb der Sperre eine asynchrone Operation (z. B. `tokio::time::sleep`) aufrufst? Mit dem asynchronen Mutex von Tokio wird der Thread nicht blockiert, sondern andere Tasks können weiterlaufen, während dieser Task pausiert.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte viele konkurrierende Tasks, die den Zähler inkrementieren, und gib das Endergebnis aus.
* **Konzepte**: Task-Synchronisation, Akkumulation, Join-Schleife.
* **Hinweise**:
  - Erstelle in `main` den geteilten Zähler.
  - Spawne in einer Schleife z. B. 100 Tasks, die alle den Zähler erhöhen.
  - Warte, bis alle Tasks abgeschlossen sind.
  - Gib den finalen Wert des Zählers aus. Stelle sicher, dass keine "Race Conditions" aufgetreten sind (der Endwert muss exakt der Anzahl der Inkremente entsprechen).

---

## Projekt 52: Task-Limitierung (Semaphore)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere eine Struktur für einen Download-Auftrag und die Limitierung.
* **Konzepte**: Structs, `tokio::sync::Semaphore`.
* **Hinweise**:
  - Erstelle ein Struct `DownloadJob` mit einer ID und einer simulierten Dateigröße.
  - Um die Anzahl der gleichzeitigen Downloads zu begrenzen, verwende einen `Semaphore`, verpackt in einem `Arc`, um ihn zwischen den Tasks teilen zu können.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die download-Methode, die sich an die Limits des Semaphors hält.
* **Konzepte**: `Semaphore::acquire`, `SemaphorePermit`, Freigabe von Ressourcen.
* **Hinweise**:
  - Bevor der Download-Task mit der Arbeit beginnt, muss er ein "Permit" (Erlaubnis) vom Semaphor anfordern: `let permit = semaphore.acquire().await.unwrap();`.
  - Simuliere den Download mit `tokio::time::sleep`.
  - Was passiert mit dem Permit, wenn die Funktion beendet wird oder ein Fehler auftritt? (Stichwort: RAII-Pattern, automatisches Droppen gibt das Permit wieder frei).
  - Protokolliere den Start und das Ende des Downloads, um die Limitierung optisch sichtbar zu machen.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte eine große Menge an Downloads parallel und beobachte die Drosselung.
* **Konzepte**: Auswertung von Logs, Durchsatzkontrolle.
* **Hinweise**:
  - Erstelle einen Semaphor mit einer Kapazität von z. B. 3 (maximal 3 gleichzeitige Downloads).
  - Spawne 10 Download-Tasks parallel.
  - Beobachte die Konsolenausgabe: Es dürfen zu jedem Zeitpunkt nie mehr als 3 Downloads gleichzeitig aktiv ("in Arbeit") sein.

---

## Projekt 53: Broadcast-Channel

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf ein Chat-Nachrichtenformat für ein Multi-Receiver-System.
* **Konzepte**: Structs, `tokio::sync::broadcast`.
* **Hinweise**:
  - Definiere eine Struktur `ChatMessage` mit einem Sender-Namen (`String`) und dem Text (`String`).
  - Warum ist ein MPSC-Kanal ungeeignet, wenn alle Empfänger *jede* Nachricht erhalten sollen? (MPSC liefert eine Nachricht an genau *einen* freien Empfänger; Broadcast dupliziert die Nachricht an alle aktiven Empfänger).

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere Empfänger-Tasks und Sender-Logiken.
* **Konzepte**: `broadcast::channel`, `Receiver::recv`, `Sender::send`, Fehlerbehandlung bei verpassten Nachrichten (`RecvError::Lagged`).
* **Hinweise**:
  - Erstelle den Kanal mit `let (tx, rx) = broadcast::channel(capacity)`.
  - Jeder neue Empfänger-Task benötigt eine eigene Receiver-Instanz. Diese erhältst du durch das Abonnieren des Senders: `let rx = tx.subscribe();`.
  - Spawne mehrere Empfänger-Tasks, die in einer Schleife `.recv().await` aufrufen.
  - Behandle den Fehler `RecvError::Lagged(n)`. Dieser tritt auf, wenn ein Empfänger zu langsam ist und Nachrichten im Puffer überschrieben wurden.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Simuliere einen Chatroom in `main`, wo mehrere Teilnehmer Nachrichten schreiben und lesen.
* **Konzepte**: Integration, Task-Koordination, Konsolenausgabe.
* **Hinweise**:
  - Erstelle in `main` den Broadcast-Sender.
  - Spawne drei "Client"-Tasks, die den Kanal abonnieren und empfangene Nachrichten mit ihrem Namen auf der Konsole ausgeben.
  - Sende aus dem Hauptprogramm oder einem separaten Task im Sekundentakt Nachrichten über den Sender `tx`.
  - Stelle sicher, dass alle Clients die Nachrichten zeitgleich erhalten.

---

## Projekt 54: Oneshot-Kanal

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere die Datenstruktur für eine einmalige Rechenaufgabe.
* **Konzepte**: Structs, `tokio::sync::oneshot`.
* **Hinweise**:
  - Erstelle ein Struct `CalculationTask` mit Eingabedaten (z. B. einer großen Zahl).
  - Für das Ergebnis deklariere einen `oneshot::channel`.
  - Warum heißt dieser Kanal "oneshot"? (Er kann exakt eine Nachricht senden und wird danach konsumiert).

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere den Worker-Task, der das Ergebnis berechnet und über den Kanal zurückschickt.
* **Konzepte**: `oneshot::Sender::send`, `oneshot::Receiver`, Fehlerbehandlung bei Abbruch.
* **Hinweise**:
  - Spawne einen Task für die Berechnung. Übergib ihm den `oneshot::Sender`.
  - Führe die Berechnung durch (z. B. Primzahlprüfung oder Fibonacci) und sende das Ergebnis mit `tx.send(result)`.
  - Beachte, dass `tx.send` den Sender konsumiert (Besitzübergang), sodass du danach nicht mehr senden kannst.
  - Der Aufrufer wartet auf dem `Receiver`-Teil mit `.await`. Wie behandelst du den Fehler, falls der Worker-Task vor dem Senden panikt oder gedroppt wird? (Der Receiver erhält dann ein `RecvError`).

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte die Berechnung in `main`, führe parallel andere Dinge aus und warte am Ende auf das Ergebnis.
* **Konzepte**: Nebenläufigkeit, Latenzüberbrückung, Auswertung.
* **Hinweise**:
  - Starte die asynchrone Berechnung.
  - Während der Task im Hintergrund läuft, gib auf der Konsole Ladebalken-Animationen oder Statustexte aus.
  - Hole dir am Ende das Ergebnis über den `oneshot`-Kanal und gib es aus.

---

## Projekt 55: Asynchroner Intervall-Ticker

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Erstelle eine Konfigurationsstruktur für einen Ticker.
* **Konzepte**: Structs, `std::time::Duration`, Sichtbarkeiten.
* **Hinweise**:
  - Definiere eine Struktur `TickerConfig` mit einem Intervall (z. B. 500 ms) und einer maximalen Anzahl an Ticks.
  - Überlege dir, wie du den aktuellen Zustand des Tickers (z. B. verbleibende Ticks) verwaltest.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die Ticker-Schleife mit Tokios Intervall-Timer.
* **Konzepte**: `tokio::time::interval`, `Interval::tick`, Missed-Tick-Verhalten.
* **Hinweise**:
  - Erzeuge ein Intervall-Objekt: `let mut interval = tokio::time::interval(duration);`.
  - Rufe in einer Schleife `interval.tick().await` auf. Diese Methode blockiert asynchron, bis die Zeit abgelaufen ist.
  - Informiere dich über das Verhalten von `Interval`, wenn ein Tick verzögert wird (z. B. durch eine langsame Berechnung im Loop). Tokio bietet Strategien wie `MissedTickBehavior::Skip` oder `MissedTickBehavior::Burst`. Welche ist für dein Projekt sinnvoll?

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte den Ticker in `main` und lass ihn nach einer bestimmten Anzahl von Aktionen stoppen.
* **Konzepte**: Schleifensteuerung, Programmabbruch, Integration.
* **Hinweise**:
  - Lass den Ticker in einem eigenen Task laufen.
  - Zähle die ausgeführten Ticks mit und brich die Schleife ab, wenn das Limit erreicht ist.
  - Zeige bei jedem Tick die aktuelle Systemzeit an, um die Genauigkeit zu überprüfen.

---

## Projekt 56: Paralleler Web-Crawler (Limitierung)

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf Datenstrukturen für URLs, Ergebnisse und die Crawler-Konfiguration.
* **Konzepte**: Structs, Vektoren, `tokio::sync::Semaphore`.
* **Hinweise**:
  - Erstelle eine Struktur `Crawler`, die eine Liste von Ziel-URLs (`Vec<String>`) und ein Limit für gleichzeitige Anfragen (`usize`) hält.
  - Verwende einen `Semaphore` im `Arc`, um die Concurrency-Grenze durchzusetzen.

### Modul 2: Implementierung & Methoden
* **Ziel**: Schreibe die Crawling-Logik für einzelne Seiten und die Begrenzung.
* **Konzepte**: `tokio::spawn`, `Semaphore::acquire`, simulierte Netzwerkanfragen.
* **Hinweise**:
  - Schreibe eine asynchrone Hilfsfunktion `fetch_url(url: String) -> Result<String, String>`.
  - Iteriere in der Haupt-Crawler-Logik über die URLs.
  - Fordere vor jedem Spawnen eines Crawl-Tasks ein Permit vom Semaphor an.
  - Wichtig: Übergib das Permit *in* den Task (`move`), damit das Permit so lange gehalten wird, wie die Webseite geladen wird, und erst danach gedroppt wird.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Starte den Crawler mit einer Liste von Test-URLs und werte das Resultat aus.
* **Konzepte**: Integration, Fehlerprotokollierung, Aggregation.
* **Hinweise**:
  - Definiere eine Liste von 10 URLs in `main`.
  - Konfiguriere das Limit auf maximal 2 gleichzeitige Verbindungen.
  - Gib für jede URL aus, wann der Download startet, wann er endet und wie viele Downloads gerade parallel aktiv sind.

---

## Projekt 57: Asynchroner Ping-Utility

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere Strukturen für Serveradressen und Messergebnisse.
* **Konzepte**: Structs, `std::time::Duration`, `std::time::Instant`.
* **Hinweise**:
  - Erstelle eine Struktur `PingResult` mit der Server-IP/URL, der gemessenen Latenz (`Duration`) oder einem Fehler (z. B. Timeout).
  - Nutze `Instant` für präzise Zeitmessungen.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die asynchrone Ping-Logik und Latenzmessung.
* **Konzepte**: `tokio::time::timeout`, asynchroner Netzwerkzugriff (simuliert oder echt mit TCP-Connects), `std::time::Instant::now`.
* **Hinweise**:
  - Nimm die Startzeit mit `Instant::now()`.
  - Versuche eine Verbindung aufzubauen (z. B. mit `TcpStream::connect`).
  - Begrenze den Versuch mit `tokio::time::timeout`, um nicht ewig auf einen nicht erreichbaren Server zu warten.
  - Berechne nach erfolgreichem Connect (oder Timeout) die verstrichene Zeit mit `.elapsed()`.
  - Verwende `tokio::spawn`, um alle Server zeitgleich anzupingen.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Erstelle eine Liste von Servern in `main`, starte die Pings parallel und gib eine Tabelle der Antwortzeiten aus.
* **Konzepte**: Formatierte Konsolenausgabe, Aggregation von Futures, Tabellenlayout.
* **Hinweise**:
  - Definiere Adressen wie `127.0.0.1:80` oder bekannte öffentliche DNS-Server (falls du echte Verbindungen testen willst).
  - Starte die Messungen parallel und warte auf alle Ergebnisse.
  - Gib eine übersichtliche Auswertung aus: Welcher Server war am schnellsten? Welche Server hatten Timeouts?

---

## Projekt 58: Watch-Channel für Konfigurations-Updates

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Entwirf ein Datenmodell für die Konfiguration einer Anwendung.
* **Konzepte**: Structs, `tokio::sync::watch`.
* **Hinweise**:
  - Erstelle eine Struktur `AppConfig` mit verschiedenen Parametern (z. B. `log_level: String`, `port: u16`).
  - Warum ist ein `watch`-Kanal ideal für Konfigurationen? (Er hält immer das aktuelle Element im Speicher, erlaubt beliebig viele Leser und benachrichtigt sie nur, wenn sich der Wert tatsächlich ändert).

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere den Konfigurations-Updater (Sender) und die Worker-Tasks (Leser).
* **Konzepte**: `watch::channel`, `watch::Sender::send`, `watch::Receiver::changed`, sicheres Auslesen mit Borrowing (`*receiver.borrow()`).
* **Hinweise**:
  - Erzeuge den Kanal: `let (tx, rx) = watch::channel(initial_config)`.
  - Verteile Klone des `Receiver`s an verschiedene Worker-Tasks.
  - In den Worker-Tasks verwende eine Schleife mit `rx.changed().await`. Diese Methode pausiert, bis der Sender ein Update pusht.
  - Lese den neuen Wert mit `let current = rx.borrow()`. Achtung: Das Auslesen liefert eine Referenz, die du schnell wieder freigeben (droppen) solltest, damit der Sender beim nächsten Update nicht blockiert wird!

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Simuliere in `main` Konfigurationsänderungen zur Laufzeit und beobachte die Reaktion der Worker.
* **Konzepte**: Dynamisches Statusupdate, Log-Meldungen, Integration.
* **Hinweise**:
  - Spawne zwei Worker-Tasks, die auf Konfigurations-Updates reagieren.
  - Ändere in `main` nach ein paar Sekunden den Port oder den Log-Level über `tx.send(new_config)`.
  - Protokolliere, wie die Worker-Tasks sofort die neuen Einstellungen übernehmen, ohne neu gestartet werden zu müssen.

---

## Projekt 59: Asynchrones Log-Rotationssystem

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere die Datenstruktur für den Logger und die Grenzwerte.
* **Konzepte**: Structs, File-Handles, `PathBuf`, Concurrency-Wrapper.
* **Hinweise**:
  - Erstelle ein Struct `AsyncLogger` mit dem Pfad zur aktuellen Logdatei, dem aktuellen Größenlimit (z. B. in Bytes) und dem internen Schreib-Handle.
  - Da mehrere Tasks loggen sollen, muss der Logger threadsicher sein. Überlege dir, wie du den Dateizugriff schützt (z. B. mit `Arc<tokio::sync::Mutex<File>>` oder indem du Log-Einträge über einen Channel an einen zentralen Log-Schreiber-Task sendest). Letzteres (Channel-basiert) ist oft performanter und vermeidet Mutex-Contention.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere die asynchrone Schreib- und Rotationslogik.
* **Konzepte**: `tokio::fs::OpenOptions`, `tokio::io::AsyncWriteExt`, `tokio::fs::metadata`, `tokio::fs::rename`.
* **Hinweise**:
  - Schreibe eine Methode `log(&self, message: &str)`.
  - Überprüfe vor oder nach dem Schreiben die Dateigröße mit `tokio::fs::metadata(path)`.
  - Wenn die Größe das Limit überschreitet: Schließe die Datei, benenne sie um (z. B. `app.log` zu `app.log.1`) und erstelle eine neue, leere `app.log`.
  - Verwende `tokio::fs::rename` für das Umbenennen.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Schreibe ein Testprogramm, das massenhaft Logs erzeugt und die Rotation erzwingt.
* **Konzepte**: Belastungstest, Integration, Verifikation im Dateisystem.
* **Hinweise**:
  - Setze das Dateigrößenlimit testweise sehr niedrig an (z. B. 1 Kilobyte).
  - Spawne mehrere Tasks, die parallel Log-Einträge schreiben.
  - Überprüfe nach Programmende dein Arbeitsverzeichnis: Sind die rotierten Logdateien korrekt erstellt worden?

---

## Projekt 60: Dateien-Downloader mit Fortschritt

### Modul 1: Basis-Datenstrukturen
* **Ziel**: Definiere Strukturen für den Download-Status und die Kanäle.
* **Konzepte**: Structs, Enums für Fortschrittsupdates, MPSC-Kanal.
* **Hinweise**:
  - Definiere eine Struktur `DownloadProgress` mit der Datei-ID, den bereits geladenen Bytes und der Gesamtgröße.
  - Erstelle ein Enum `ProgressMessage`, um Fortschrittsupdates oder Fehlermeldungen von den Workern zur UI zu übertragen.
  - Bereite einen `mpsc::channel` vor, über den alle aktiven Downloads ihren Status an einen zentralen Anzeige-Task senden können.

### Modul 2: Implementierung & Methoden
* **Ziel**: Implementiere den Download-Task, der periodisch Fortschritte meldet.
* **Konzepte**: `tokio::sync::mpsc::Sender`, simulierte Chunks, `.send().await`.
* **Hinweise**:
  - Schreibe einen Download-Task, der eine Datei in kleinen Schritten (z. B. in 100-KB-Blöcken) herunterlädt.
  - Nach jedem gelesenen Block schläft der Task kurz (`sleep`) und sendet danach ein `ProgressMessage` mit dem aktuellen Stand über den Channel an den Empfänger.
  - Achte darauf, dass der Sender geclont wird, um ihn an jeden Download-Task zu übergeben.

### Modul 3: Vollendung & Hauptprogramm
* **Ziel**: Zeichne die Fortschrittsbalken aller Downloads dynamisch auf der Konsole.
* **Konzepte**: Terminal-Ausgabe, Cursor-Steuerung (optional) oder einfache Zeilenupdates, Auswertung der Fortschritte.
* **Hinweise**:
  - Starte 3 parallele Downloads mit unterschiedlichen simulierten Geschwindigkeiten.
  - Lies im Haupt-Task die `ProgressMessage`s aus dem Kanal.
  - Berechne den Prozentsatz (`(gelesen * 100) / gesamt`) und gib für jede Datei einen visualisierten Balken aus (z. B. `[=====....] 50%`).
  - Beende das Programm sauber, sobald alle Downloads 100% erreicht haben.
# Präzisions-Prompts für Rust-Projekte (Kapitel 61 - 80)

Dieses Dokument enthält didaktische, modulare Prompts für die Rust-Projekte 61 bis 80. Jedes Projekt ist in drei aufeinander aufbauende Module unterteilt, die ohne fertige Codelösungen den Lernenden helfen, die Konzepte selbstständig zu erarbeiten.

---

## 61. Bridge: CPU-intensive Tasks aus Tokio auslagern

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für ein System, das rechenintensive mathematische Berechnungen (z. B. Primzahlprüfung oder Faser-Berechnungen) auslagert.
- Überlege dir, wie du eine Struktur `CalculationTask` definieren kannst, die alle notwendigen Eingangsparameter für deine mathematische Operation enthält.
- Erstelle ein Enum `TaskStatus`, das den aktuellen Zustand der Berechnung (z. B. `Pending`, `Running`, `Completed`, `Failed`) beschreibt.
- Achte auf die Sichtbarkeiten (`pub`) der Felder. Da Daten zwischen Threads ausgetauscht werden, müssen deine Typen das `Send`-Trait erfüllen. Warum ist das für Stack- und Heap-Zuweisungen wichtig?
- Nutze keine externen Bibliotheken außer `tokio`. Überlege dir, wie das Speicherlayout im Heap aussehen muss, wenn mehrere asynchrone Tasks den Status einer Berechnung abfragen wollen.

### Modul 2: Implementierung & Methoden
Implementiere die Logik zur Auslagerung der Berechnung.
- Schreibe eine Funktion, die eine CPU-intensive Berechnung durchführt. Diese Funktion sollte bewusst blockierend (synchron) sein.
- Wie kannst du diese Funktion nun innerhalb einer asynchronen Tokio-Umgebung aufrufen, ohne dass der gesamte Event-Loop blockiert? Verwende dafür `tokio::task::spawn_blocking`.
- Überlege dir, wie du das Ergebnis der Berechnung zurückerhältst. Welche Rolle spielen hierbei `tokio::sync::oneshot`-Kanäle, um ein einzelnes Ergebnis von einem OS-Thread an eine wartende asynchrone Task zu senden?
- Welche Fehlermöglichkeiten entstehen beim Warten auf einen blockierenden Task (z. B. ein Panic im OS-Thread) und wie fängst du das über den Rückgabetyp von `spawn_blocking` ab?

### Modul 3: Vollendung & Hauptprogramm
Erstelle das Hauptprogramm in `main.rs`, um das Verhalten zu demonstrieren.
- Schreibe eine asynchrone Hauptfunktion (`#[tokio::main] async fn main()`).
- Starte im Hintergrund eine periodische asynchrone Schleife (z. B. mit `tokio::time::interval`), die jede Sekunde eine kurze Textmeldung auf der Konsole ausgibt (Simulation von I/O-bound Tasks).
- Starte parallel dazu deine rechenintensive Aufgabe über den in Modul 2 gebauten Mechanismus.
- Zeige auf der Konsole, dass die periodischen Meldungen flüssig weiterlaufen, während die CPU-intensive Berechnung im Hintergrund rattert. Baue ein einfaches Konsolenmenü ein, um neue Berechnungen anzustoßen.

---

## 62. Multiplayer-Lobby mit Async und Threads

### Modul 1: Basis-Datenstrukturen
Entwirf das Datenmodell für eine Spiele-Lobby, bei der Netzwerkverbindungen asynchron verwaltet werden, während die Spielphysik auf einem separaten OS-Thread läuft.
- Erstelle ein Struct `Player` mit Feldern für ID, Name und die letzte bekannte Position.
- Erstelle ein Struct `GameLobby`, das eine Liste von Spielern und den aktuellen Zustand des Spiels verwaltet.
- Da auf diese Lobby sowohl von den asynchronen Netzwerk-Tasks als auch vom synchronen Physik-Thread zugegriffen wird: Welche Wrapper-Typen der Standardbibliothek (`Arc`, `Mutex` oder `RwLock`) sind hier nötig, um Thread-Sicherheit und geteilten Zugriff zu garantieren?
- Achte darauf, dass die Strukturen im Speicher korrekt organisiert sind (Heap-Allokation für dynamische Listen).

### Modul 2: Implementierung & Methoden
Implementiere die Interaktion zwischen den asynchronen Netzwerk-Tasks und der synchronen Spielphysik.
- Schreibe eine Methode für `GameLobby`, um Spieler hinzuzufügen, zu entfernen und deren Position zu aktualisieren.
- Implementiere eine Schleife für den Physik-Thread. Dieser soll in festen Intervallen (z. B. alle 50 Millisekunden) laufen, den Zustand der Lobby sperren, die Positionen aktualisieren (z. B. einfache Bewegungssimulation) und den Zustand wieder freigeben. Wie verhinderst du hierbei Deadlocks?
- Implementiere den asynchronen Netzwerk-Teil: Nutze Tokio-Tasks (`tokio::spawn`), um eingehende (simulierte) Client-Nachrichten zu verarbeiten und die Bewegung der Spieler in der Lobby zu registrieren.

### Modul 3: Vollendung & Hauptprogramm
Integriere alles in der `main.rs`.
- Initialisiere die geteilte Lobby-Struktur.
- Spawne den synchronen Physik-Thread unter Verwendung von `std::thread::spawn`.
- Spawne mehrere asynchrone Tokio-Tasks, die Spieleraktivitäten und Beitritte simulieren.
- Implementiere eine ordentliche Fehlerbehandlung für den Fall, dass Threads unerwartet beendet werden, und sorge dafür, dass beim Beenden des Hauptprogramms alle Ressourcen sauber freigegeben werden.

---

## 63. Daten-Pipeline (Thread zu Async-Task)

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für eine Pipeline, die Daten von einem schnellen, synchronen Treiber-Thread an eine asynchrone Speicher-Task weiterleitet.
- Definiere ein Struct `SensorData` mit Feldern für einen Zeitstempel, einen Sensor-Identifikator und einen Messwert (z. B. `f64`).
- Überlege, welcher Kanaltyp aus `tokio::sync` geeignet ist, um Daten von einem synchronen zu einem asynchronen Kontext zu übertragen. Da der Sender synchron und der Empfänger asynchron ist: Welche Besonderheiten hat `tokio::sync::mpsc`?
- Lege fest, wie groß der Puffer des Kanals sein soll (Bounded vs. Unbounded), um Speicherüberläufe bei hoher Datenrate zu verhindern.

### Modul 2: Implementierung & Methoden
Implementiere die Sende- und Empfangslogik.
- Schreibe die Schleife für den synchronen Hardware-Thread. Dieser soll periodisch (z. B. mittels `std::thread::sleep`) Sensordaten generieren.
- Da der Thread synchron ist, kann er die asynchrone `.send()`-Methode des Tokio-Senders nicht direkt mit `.await` aufrufen. Nutze stattdessen die blockierende Methode `blocking_send` des Senders. Welche Vor- und Nachteile hat das?
- Implementiere auf der Empfängerseite einen asynchronen Task, der kontinuierlich mit `.recv()` Daten aus dem Kanal liest und diese verarbeitet (z. B. in einer simulierten Datenbank speichert).

### Modul 3: Vollendung & Hauptprogramm
Führe die Pipeline in `main.rs` zusammen.
- Erstelle den Kanal und teile die Sender- und Empfänger-Hälften auf.
- Spawne den synchronen Sensor-Thread und den asynchronen Speicher-Task.
- Implementiere eine Fehlerbehandlung: Was passiert, wenn der Empfänger geschlossen wird, während der Sender noch Daten schicken will? Wie reagiert `blocking_send` darauf?
- Baue eine Konsolenanzeige, die die Anzahl der verarbeiteten Pakete und eventuelle Puffer-Engpässe live darstellt.

---

## 64. Dateisystem-Beobachter mit Callback-Bridge

### Modul 1: Basis-Datenstrukturen
Entwirf die Brücken-Layout für ein System, das synchrone Dateisystem-Events in eine asynchrone Anwendung leitet.
- Erstelle ein Enum `FileEvent` mit Varianten wie `Created(PathBuf)`, `Modified(PathBuf)` und `Deleted(PathBuf)`.
- Überlege, wie du den Zustand des Beobachters verwaltest. Da viele Dateisystem-Bibliotheken (wie `notify`) mit synchronen Callbacks arbeiten, benötigen wir eine Brücken-Struktur, die den Sender eines asynchronen Kanals hält.
- Welche Kriterien müssen erfüllt sein, damit der Sender im Callback sicher aufgerufen werden kann? Denke an die Lifetimes und die `Send`/`Sync`-Eigenschaften des Kanals.

### Modul 2: Implementierung & Methoden
Implementiere die Callback-Brücke.
- Schreibe den synchronen Callback, der von der Dateiüberwachungs-Bibliothek aufgerufen wird. Dieser Callback muss das Ereignis in ein `FileEvent` übersetzen.
- Sende das Event über einen asynchronen Kanal an den asynchronen Haupt-Task. Nutze auch hier `blocking_send`, da der Callback-Kontext synchron ist.
- Schreibe eine asynchrone Methode, die die Events aus dem Kanal liest. Verwende ein asynchrones Pattern (z. B. einen Loop mit `.recv()`), um auf neue Events zu reagieren, ohne den Thread zu blockieren.

### Modul 3: Vollendung & Hauptprogramm
Integriere die Überwachung in das Hauptprogramm.
- Richte in `main.rs` die Dateiüberwachung für ein bestimmtes Verzeichnis ein.
- Starte den asynchronen Event-Loop, der auf eingehende Dateiänderungen reagiert und diese formatiert auf der Konsole ausgibt.
- Implementiere eine robuste Fehlerbehandlung für den Fall, dass Verzeichnisse nicht existieren oder Berechtigungen fehlen. Biete dem Benutzer die Möglichkeit, die Überwachung per Tastendruck sauber zu beenden.

---

## 65. Asynchroner Webserver mit synchroner Datenbank

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für einen asynchronen HTTP-Dienst, der mit einer blockierenden relationalen Datenbank kommuniziert.
- Erstelle ein Struct `DbConnection`, das eine blockierende Datenbankverbindung simuliert (z. B. mit einer künstlichen Verzögerung bei Abfragen).
- Definiere eine Struktur `DatabasePool`, die mehrere dieser Verbindungen verwaltet. Wie machst du diesen Pool thread-sicher, damit er von mehreren Webserver-Tasks geteilt werden kann? (Tipp: `Arc` und ein Verbindungs-Verteilungs-Mechanismus).
- Definiere ein Struct `User`, das als Datenmodell für deine API-Antworten dient.

### Modul 2: Implementierung & Methoden
Implementiere die Abfrage-Bridge.
- Implementiere eine synchrone Methode `query_user(&self, id: u64) -> Result<User, DbError>` auf deinem Verbindungsobjekt.
- Da du in einem asynchronen Webserver-Handler (z. B. mit Tokio/Axum) keine blockierenden Datenbankabfragen direkt aufrufen darfst (da dies den Executor lahmlegt), musst du die Abfrage auslagern.
- Nutze `tokio::task::spawn_blocking`, um die Abfrage im Thread-Pool von Tokio auszuführen. Wie übergibst du die Datenbankverbindung und die Parameter sicher an den blockierenden Task?

### Modul 3: Vollendung & Hauptprogramm
Erstelle das Hauptprogramm für deinen Webserver.
- Initialisiere den simulierten Datenbank-Pool in `main.rs`.
- Richte einen asynchronen HTTP-Server-Mock ein (oder simuliere Anfragen über eine asynchrone Schleife, falls keine HTTP-Bibliothek genutzt wird).
- Schreibe Handler, die Benutzerdaten abfragen, und stelle sicher, dass parallele Anfragen nicht gegenseitig blockiert werden.
- Implementiere ein detailliertes Logging und eine Fehlerbehandlung für Verbindungsabbrüche zur Datenbank.

---

## 66. Chat-Server mit Raumverwaltung

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für einen TCP-Chat-Server mit mehreren Räumen.
- Erstelle ein Struct `Room`, das den Namen des Raums und eine Liste von Client-Sendern verwaltet. Welchen Kanaltyp nimmst du, um Nachrichten an alle Mitglieder eines Raums gleichzeitig zu senden? (Tipp: `tokio::sync::broadcast`).
- Erstelle ein Struct `ChatServer`, das eine `HashMap` von Räumen verwaltet.
- Da mehrere asynchrone Netzwerkverbindungen gleichzeitig Räume betreten, verlassen und Nachrichten senden wollen: Wie schützt du die `HashMap` im `ChatServer`? Nutze `Arc<Mutex<...>>` oder `Arc<RwLock<...>>`. Was ist hier sinnvoller?

### Modul 2: Implementierung & Methoden
Implementiere die Chat- und Raumlogik.
- Schreibe Methoden für den `ChatServer` wie `join_room`, `leave_room` und `broadcast_to_room`.
- Implementiere den asynchronen Handler für eingehende TCP-Verbindungen (`tokio::net::TcpStream`). Jede Verbindung soll in einem eigenen `tokio::spawn`-Task laufen.
- Der Handler muss eingehende Nachrichten vom Client lesen, Befehle (wie `/join [Raum]` oder `/quit`) parsen und entsprechende Aktionen auf dem `ChatServer` ausführen.
- Nutze `tokio::select!`, um gleichzeitig auf eingehende Nachrichten vom Client-Socket und auf Nachrichten aus dem Broadcast-Kanal des aktuellen Raums zu lauschen.

### Modul 3: Vollendung & Hauptprogramm
Erstelle den Server-Startpunkt in `main.rs`.
- Initialisiere den `ChatServer` und starte einen `tokio::net::TcpListener` auf einem konfigurierten Port.
- Implementiere das Verbindungsmanagement: Verbindungsaufbau, Zuweisung eines Standardraums und sauberes Aufräumen, wenn ein Client die Verbindung trennt (z. B. leere Räume löschen).
- Behandele I/O-Fehler und Kapazitätsgrenzen des Broadcast-Kanals (z. B. wenn ein Client zu langsam liest und Nachrichten verloren gehen).

---

## 67. Parallele Map-Reduce-Engine

### Modul 1: Basis-Datenstrukturen
Entwirf das Speicherlayout für eine einfache Map-Reduce-Engine, die Daten auf Threads verteilt und asynchron zusammenfasst.
- Erstelle ein Struct `Job`, das die Eingabedaten (z. B. eine Liste von Texten) enthält.
- Definiere Datenstrukturen für `MapTask` (Teilaufgabe) und `IntermediateResult` (Zwischenergebnis).
- Überlege, wie die Datenflüsse aussehen: Du benötigst Kanäle, um Aufgaben an die Worker-Threads zu senden, und Kanäle, um die Ergebnisse zurückzuerhalten. Welche Kombination aus asynchronen und synchronen Kanälen ist hier ratsam?

### Modul 2: Implementierung & Methoden
Implementiere die Map- und Reduce-Phasen.
- Schreibe die Map-Funktion, die auf mehreren OS-Worker-Threads läuft. Die Worker sollen blockierend Aufgaben aus einem gemeinsamen Kanal empfangen, verarbeiten und die Zwischenergebnisse über einen Sender zurückschicken.
- Schreibe die asynchrone Reduce-Task. Diese Task wartet asynchron auf den Eingang aller Zwischenergebnisse aus den Map-Tasks und aggregiert diese schrittweise (z. B. Worthäufigkeiten zählen).
- Wie verhinderst du, dass die Reduce-Task ewig wartet? Wie signalisieren die Map-Worker, dass keine weiteren Daten mehr kommen (Schließen des Kanals)?

### Modul 3: Vollendung & Hauptprogramm
Setze die Engine in `main.rs` zusammen.
- Bereite Testdaten vor (z. B. eine große Textdatei oder ein Array von Strings).
- Spawne die Worker-Threads und starte die asynchrone Aggregation.
- Miss die Zeit, die für die Verarbeitung benötigt wird, und vergleiche sie mit einer sequentiellen Ausführung.
- Baue eine Fehlerbehandlung ein für den Fall, dass ein Worker-Thread abstürzt (Panic), damit das Hauptprogramm nicht einfrieren.

---

## 68. Verteilter Task-Planer

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für einen Task-Planer.
- Erstelle ein Struct `Task`, das eine eindeutige ID, eine Priorität und eine auszuführende Operation (z. B. als Funktionszeiger oder Closure) beschreibt.
- Erstelle eine thread-sichere Warteschlange `TaskQueue`. Wie kannst du diese Queue so entwerfen, dass sie Aufgaben nach Priorität sortiert hält (z. B. mit `BinaryHeap`) und gleichzeitig thread-sicher für parallele Worker zugänglich ist?
- Überlege, wie Ergebnisse mittels eines `tokio::sync::broadcast::Sender` an mehrere asynchrone Beobachter verteilt werden können.

### Modul 2: Implementierung & Methoden
Implementiere den Planungs- und Ausführungsmechanismus.
- Schreibe Methoden zum Hinzufügen von Tasks zur Queue.
- Implementiere einen synchronen Thread-Pool (Worker-Threads). Die Worker holen sich blockierend die nächste verfügbare Aufgabe mit der höchsten Priorität aus der Queue. Nutze Synchronisationsprimitive (z. B. eine Kombination aus `Mutex` und `Condvar`), um Worker schlafen zu legen, wenn keine Aufgaben da sind.
- Sobald ein Worker eine Aufgabe erledigt hat, sendet er das Ergebnis über einen Broadcast-Kanal. Wie wird dieser Kanal vom synchronen Thread in die asynchrone Welt geleitet?

### Modul 3: Vollendung & Hauptprogramm
Integriere den Planer in `main.rs`.
- Erstelle ein Konsolenmenü, über das Benutzer neue Aufgaben mit unterschiedlichen Prioritäten erstellen können.
- Starte mehrere asynchrone Listener-Tasks, die auf den Broadcast-Kanal hören und die Ergebnisse der ausgeführten Aufgaben formatieren.
- Sorge für ein sauberes Herunterfahren (Graceful Shutdown) des gesamten Systems: Alle ausstehenden Aufgaben in der Queue sollten abgearbeitet und die Worker-Threads ordentlich beendet werden.

---

## 69. Rate-Limiter mit Token-Bucket

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für einen Token-Bucket Rate-Limiter.
- Erstelle ein Struct `TokenBucket` mit den Feldern: `max_tokens` (Kapazität), `current_tokens` (aktuelle Anzahl) und `replenish_rate` (Tokens pro Sekunde).
- Da dieser Limiter in einer asynchronen Umgebung Anfragen blockieren oder verzögern soll: Wie kapselst du den Zustand des Buckets? (Tipp: `Arc<Mutex<TokenBucket>>`).
- Überlege, ob du ein spezielles Enum `LimitResult` benötigst, das angibt, ob eine Anfrage sofort erlaubt (`Allow`), verzögert (`Wait(Duration)`) oder komplett abgewiesen (`Reject`) wird.

### Modul 2: Implementierung & Methoden
Implementiere die Nachfüll- und Prüflogik.
- Schreibe einen asynchronen Hintergrund-Task, der in festen Abständen (z. B. jede Sekunde mit `tokio::time::sleep`) erwacht und die Tokens im Bucket bis zur Maximalkapazität erhöht.
- Implementiere eine asynchrone Methode `acquire_token(&self) -> bool` für den Rate-Limiter. Wenn keine Tokens vorhanden sind, soll die Methode entweder sofort `false` zurückgeben oder asynchron warten, bis wieder ein Token verfügbar ist. Wie realisierst du das asynchrone Warten ohne CPU-Ressourcen zu verschwenden?

### Modul 3: Vollendung & Hauptprogramm
Simuliere API-Anfragen im Hauptprogramm.
- Erstelle in `main.rs` den Rate-Limiter und starte den Hintergrund-Task zum Auffüllen der Tokens.
- Spawne mehrere asynchrone Tasks, die in unregelmäßigen Abständen Anfragen an einen simulierten Endpunkt stellen.
- Protokolliere auf der Konsole präzise, welche Anfragen durchgelassen, welche verzögert und welche blockiert wurden. Behandle Fehler bei der Thread-Synchronisation.

---

## 70. Asynchroner Datei-Hasher mit Thread-Pool

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für ein paralleles Datei-Hashing-System.
- Erstelle ein Struct `HashJob` mit dem Pfad zur Datei und dem gewünschten Hash-Algorithmus (z. B. SHA-256, MD5).
- Erstelle ein Struct `HashResult` mit dem Dateipfad, dem berechneten Hash-Wert (als String) und eventuellen Fehlermeldungen bei I/O-Problemen.
- Überlege, wie du eine Liste von Jobs verwaltest und wie du die maximale Anzahl parallel arbeitender Threads im Pool festlegst, um die Festplatte nicht durch zu viele gleichzeitige Lesezugriffe zu überlasten.

### Modul 2: Implementierung & Methoden
Implementiere den Hashing-Ablauf.
- Schreibe eine asynchrone Funktion, die verzeichnisse nach Dateien durchsucht und die Pfade ermittelt.
- Schreibe die blockierende Hashing-Logik. Diese soll die Datei stückweise einlesen und den Hash berechnen.
- Verwende `tokio::task::spawn_blocking`, um das rechenintensive Hashing auf Threads auszulagern. Nutze einen Channel mit begrenzter Kapazität, um die Anzahl zeitgleich laufender Berechnungen zu steuern (Semaphor-Konzept oder Bounded Channel).

### Modul 3: Vollendung & Hauptprogramm
Integriere das System in `main.rs`.
- Lies den Zielpfad (Verzeichnis) über die Kommandozeile oder ein einfaches Prompt ein.
- Starte den Hashing-Prozess und zeige auf der Konsole eine Live-Statistik an (z. B. "15/100 Dateien verarbeitet").
- Behandle typische I/O-Fehler (z. B. fehlende Zugriffsrechte auf Systemdateien) robust, ohne dass das gesamte Programm abbricht. Gib am Ende eine Zusammenfassung aller Hashes aus.

---

## 71. Sensor-Dashboard mit WebSocket-Simulator

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für ein Sensor-Dashboard mit Datenpufferung.
- Definiere ein Struct `SensorMeasurement` mit Feldern für Sensor-ID, Typ (Temperatur, Feuchtigkeit), Wert und Zeitstempel.
- Definiere ein Struct `DashboardState`, das die letzten N Messwerte im Speicher puffert (z. B. in einem `VecDeque`).
- Da asynchrone WebSocket-Verbindungen neue Daten einliefern und ein synchroner Schreiber-Thread die Daten periodisch sichern soll: Wie sicherst du `DashboardState` für den parallelen Zugriff ab?

### Modul 2: Implementierung & Methoden
Implementiere die Datenverarbeitung.
- Schreibe einen asynchronen Task, der einen WebSocket-Datenstrom simuliert. Dieser generiert in hoher Frequenz neue Messwerte und fügt sie dem geteilten `DashboardState` hinzu.
- Schreibe einen synchronen Hintergrund-Thread. Dieser soll periodisch (z. B. alle 5 Sekunden) den Zustand sperren, die neu hinzugekommenen Messwerte entnehmen (Batch-Entnahme) und diese in eine CSV-Datei auf die Festplatte schreiben.
- Wie stellst du sicher, dass das Schreiben auf die Festplatte den asynchronen Empfang der Sensordaten nicht blockiert?

### Modul 3: Vollendung & Hauptprogramm
Baue die Anwendung in `main.rs` auf.
- Initialisiere das Dashboard und starte die WebSocket-Simulatoren.
- Starte den synchronen Festplatten-Schreiber.
- Implementiere eine Konsolen-Oberfläche, die im Sekundentakt den aktuellen Zustand des Dashboards anzeigt (z. B. Durchschnittswerte der letzten Messungen). Behandle Fehler wie Schreibblockaden oder Dateisystemfehler.

---

## 72. Parallele Suchmaschine für Textdateien

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für eine lokale Text-Suchmaschine.
- Erstelle ein Struct `Query` mit dem Suchbegriff und Optionen (z. B. Case-Sensitivity).
- Erstelle ein Struct `SearchResult` mit dem Dateipfad, der Zeilennummer und dem Inhalt der passenden Zeile.
- Wie organisierst du die Dateiliste? Da das Durchsuchen großer Verzeichnisse asynchron vorbereitet werden kann, überlege dir, wie du die Pfade effizient im Speicher ablegst, bevor du sie an die Worker übergibst.

### Modul 2: Implementierung & Methoden
Implementiere den parallelen Suchalgorithmus.
- Schreibe die asynchrone Verzeichnisdurchsuchung, die alle relevanten Textdateien auflistet.
- Implementiere die Suchlogik auf OS-Threads. Nutze hierbei Entwurfsmuster wie einen Thread-Pool oder die Bibliothek `rayon`, um die gefundenen Dateien parallel zu durchsuchen. Jede Datei wird zeilenweise gelesen und mit dem Suchbegriff abgeglichen.
- Leite die gefundenen `SearchResult`-Einträge über einen Thread-übergreifenden Kanal an den asynchronen Haupt-Task zurück.

### Modul 3: Vollendung & Hauptprogramm
Schreibe die Benutzeroberfläche in `main.rs`.
- Erstelle ein interaktives CLI-Menü, in dem der Nutzer einen Suchbegriff und ein Verzeichnis eingeben kann.
- Starte die Suche, zeige währenddessen einen Fortschrittsanzeiger und gib die Suchergebnisse formatiert aus.
- Implementiere eine Fehlerbehandlung für nicht lesbare Dateien (z. B. Binärdateien oder gesperrte Dateien).

---

## 73. Zustands-Synchronisation im Netzwerkspiel

### Modul 1: Basis-Datenstrukturen
Entwirf das Speicherlayout für die Zustandssynchronisation eines Multiplayer-Spiels.
- Erstelle ein Struct `EntityState` mit ID, Koordinaten (x, y, z) und einem Zeitstempel.
- Erstelle ein Struct `WorldState`, das eine Zuordnung aller aktiven Entitäten zu ihren Zuständen speichert.
- Da Netzwerkdaten über UDP asynchron reinkommen und die Physikberechnung synchron läuft: Welcher Typ eignet sich zum Schutz des `WorldState`? (Tipp: `Arc<RwLock<WorldState>>`, da Lesezugriffe für die Physik eventuell häufiger sind als Schreibzugriffe).

### Modul 2: Implementierung & Methoden
Implementiere die Netzwerk- und Synchronisationslogik.
- Richte einen asynchronen UDP-Socket (`tokio::net::UdpSocket`) ein. Dieser soll in einer asynchronen Schleife eingehende Positions-Updates der Clients empfangen, diese validieren und den `WorldState` aktualisieren.
- Implementiere eine synchrone Physik-Schleife auf einem OS-Thread. Dieser berechnet z. B. Kollisionen oder wendet Gravitation auf den Zustand an.
- Wie stellst du sicher, dass veraltete Netzwerkpakete (die z. B. durch die UDP-Natur verspätet eintreffen) nicht den neueren Zustand überschreiben? Nutze die Zeitstempel zur Filterung.

### Modul 3: Vollendung & Hauptprogramm
Führe die Komponenten in `main.rs` zusammen.
- Starte den UDP-Server und den Physik-Thread.
- Simuliere mehrere Clients, die UDP-Pakete mit Positionsdaten an deinen Server senden.
- Baue eine Konsolen-Visualisierung, die die Positionen der Spieler in Echtzeit darstellt. Behandle fehlerhafte Paketdaten und Netzwerkunterbrechungen.

---

## 74. Dynamischer Thread-Pool-Skalierer

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für einen selbst-skalierenden Thread-Pool.
- Erstelle ein Struct `PoolMonitor` mit Parametern wie `min_threads`, `max_threads`, `target_load_factor` und der aktuellen Thread-Anzahl.
- Definiere eine Struktur `WorkQueue`, die die anstehenden Berechnungs-Tasks verwaltet.
- Überlege, wie die Kommunikation zwischen dem Monitor (asynchron) und dem Thread-Pool (synchron) abläuft, um Threads sicher zu spawnen oder schlafen zu legen.

### Modul 2: Implementierung & Methoden
Implementiere die Skalierungslogik.
- Schreibe die Logik für einen Worker-Thread. Dieser holt sich Arbeit aus der Queue und verarbeitet sie. Wenn er für eine bestimmte Zeit keine Arbeit findet und die Thread-Anzahl über `min_threads` liegt, soll er sich selbst beenden.
- Schreibe einen asynchronen Überwachungs-Task. Dieser prüft in regelmäßigen Abständen die Länge der `WorkQueue`. Wenn die Queue zu voll ist, spawnt der Task dynamisch neue OS-Threads bis zur Grenze `max_threads`.
- Wie verhinderst du Datenrennen (Race Conditions) bei der Aktualisierung der aktiven Thread-Anzahl? (Tipp: Atomare Zähler wie `AtomicUsize`).

### Modul 3: Vollendung & Hauptprogramm
Simuliere Lastszenarien in `main.rs`.
- Erstelle den Skalierer und sende schubweise eine große Anzahl an Rechenaufgaben an den Pool.
- Gib auf der Konsole periodisch aus, wie viele Worker-Threads gerade aktiv sind und wie lang die Warteschlange ist.
- Implementiere eine Fehlerbehandlung für den Fall, dass Threads beim Spawnen fehlschlagen oder Aufgaben unerwartet fehlschlagen.

---

## 75. Backup-System mit Abbruchfunktion

### Modul 1: Basis-Datenstrukturen
Entwirf das Datenmodell für ein abbrechbares Backup-System.
- Erstelle ein Struct `BackupStatus` mit Feldern wie `bytes_copied`, `total_bytes` und `current_file`.
- Um den Vorgang jederzeit abbrechen zu können, benötigst du ein geteiltes Abbruch-Signal. Welcher Typ eignet sich dafür? (Tipp: `Arc<AtomicBool>`).
- Definiere ein Struct `BackupJob` mit Quell- und Zielpfad sowie dem Status-Objekt.

### Modul 2: Implementierung & Methoden
Implementiere die Kopiervorgänge und die Abbruch-Prüfung.
- Schreibe eine synchrone Kopierfunktion, die auf einem OS-Thread ausgeführt wird. Diese Funktion durchläuft die Quellverzeichnisse und kopiert Dateien blockweise.
- **Wichtig:** Nach jedem kopierten Datenblock (z. B. alle 10 KB) muss die Funktion den Zustand des `AtomicBool`-Abbruch-Signals prüfen. Ist es auf `true` gesetzt, bricht die Funktion sofort ab und löscht ggf. die angefangene Zieldatei.
- Implementiere einen asynchronen Task, der auf Benutzereingaben wartet (z. B. Tastendruck auf 'q') und bei Erkennung das Abbruch-Signal umschaltet.

### Modul 3: Vollendung & Hauptprogramm
Integriere das Backup in `main.rs`.
- Frage den Nutzer nach Quell- und Zielordner.
- Starte den Kopiervorgang auf einem Thread und die Abbruch-Überwachung in der Tokio-Laufzeitumgebung.
- Zeige den Fortschritt des Backups live an. Stelle sicher, dass das Programm nach einem Abbruch sauber aufräumt (Teildateien löschen) und eine entsprechende Meldung ausgibt. Behandle I/O-Fehler wie fehlenden Speicherplatz.

---

## 76. Verteiltes Logging mit Puffer

### Modul 1: Basis-Datenstrukturen
Entwirf die Strukturen für ein gepuffertes Logging-System.
- Erstelle ein Struct `LogEntry` mit Zeitstempel, Log-Level (Info, Warnung, Fehler) und der Nachricht.
- Erstelle eine Struktur `LogBuffer`, die eine feste Anzahl von Log-Einträgen im Speicher sammelt. Welcher Datentyp eignet sich für ein effizientes FIFO-Verhalten (First-In, First-Out)?
- Wie schützt du diesen Puffer, wenn Hunderte asynchrone Tasks gleichzeitig Log-Einträge schreiben wollen, während ein einzelner Hintergrund-Thread die Logs wegschreibt?

### Modul 2: Implementierung & Methoden
Implementiere die Pufferung und das Schreiben.
- Implementiere eine asynchrone Methode `log(&self, entry: LogEntry)`, die Einträge in den Puffer legt. Wenn der Puffer voll ist, soll der Task entweder blockieren oder ältere Logs überschreiben (je nach Strategie).
- Schreibe einen synchronen Hintergrund-Thread, der periodisch aufgeweckt wird oder reagiert, sobald der Puffer eine bestimmte Füllgrenze (z. B. 80%) erreicht. Dieser Thread entnimmt die Logs en bloc und schreibt sie blockierend in eine Log-Datei.
- Wie stellst du sicher, dass bei einem Absturz des Hauptprogramms verbleibende Logs im Puffer noch geschrieben werden (Flush-Mechanismus)?

### Modul 3: Vollendung & Hauptprogramm
Demonstriere den Logger in `main.rs`.
- Initialisiere das Logging-System.
- Spawne viele parallele asynchrone Tasks, die intensiv Log-Nachrichten erzeugen.
- Baue eine Fehlerbehandlung ein für den Fall, dass die Log-Datei nicht geöffnet oder geschrieben werden kann. Stelle sicher, dass Fehler im Logger nicht die Hauptanwendung zum Absturz bringen.

---

## 77. Echtzeit-Daten-Filter

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für eine Echtzeit-Filter-Pipeline.
- Erstelle ein Struct `RawFrame` mit rohen Binärdaten und Metadaten (z. B. Sequenznummer).
- Erstelle ein Struct `FilteredFrame` mit den bereinigten Daten.
- Wie definierst du die Kanäle für die Pipeline? Du benötigst einen Empfangskanal (Async zu Thread) und einen Sendekanal (Thread zu Async). Welche Typen aus `tokio::sync` und `std::sync::mpsc` sind hier am besten geeignet?

### Modul 2: Implementierung & Methoden
Implementiere den Filter-Prozess.
- Richte eine asynchrone Task ein, die Daten von einer TCP-Verbindung liest und als `RawFrame` verpackt.
- Spawne synchrone Worker-Threads, die die rohen Frames entgegennehmen. Hier soll die rechenintensive Filterung stattfinden (z. B. Rauschentfernung durch mathematische Algorithmen).
- Sende die bereinigten Frames an einen asynchronen Sende-Task zurück. Dieser schreibt die `FilteredFrame`-Daten kontinuierlich auf eine ausgehende TCP-Verbindung oder eine Datei.

### Modul 3: Vollendung & Hauptprogramm
Setze die Pipeline in `main.rs` zusammen.
- Simuliere einen eingehenden Datenstrom (z. B. über einen lokalen TCP-Server oder eine Dateiquelle).
- Verbinde die asynchronen I/O-Teile mit den synchronen Filter-Threads.
- Implementiere eine detaillierte Fehlerbehandlung für Verbindungsabbrüche und Pufferüberläufe. Zeige die Latenzzeit zwischen Empfang und Senden der gefilterten Frames auf der Konsole an.

---

## 78. Asynchrone GUI mit synchronem Rechenkern

### Modul 1: Basis-Datenstrukturen
Entwirf das Architekturmodell für eine GUI-Anwendung mit schwerem Rechenkern.
- Erstelle ein Struct `GuiState` für den Zustand der Benutzeroberfläche (z. B. Button-Zustände, Textfelder, Fortschrittsbalken).
- Erstelle ein Enum `GuiEvent` für Benutzerinteraktionen (z. B. `StartCalculation`, `CancelCalculation`).
- Erstelle ein Enum `ComputationUpdate` für Rückmeldungen des Rechenkerns (z. B. `Progress(f32)`, `Result(ResultData)`).
- Überlege, wie die beiden Komponenten über kanalisierte Nachrichten getrennt bleiben.

### Modul 2: Implementierung & Methoden
Implementiere die Interaktion zwischen GUI und Rechenkern.
- Schreibe die asynchrone GUI-Schleife. Diese reagiert auf Eingaben (z. B. Tastaturevents auf der Konsole) und aktualisiert das Rendering.
- Wenn eine Berechnung gestartet wird, spawne einen synchronen OS-Thread für den Rechenkern. Dieser führt die komplexe mathematische Simulation aus.
- Der Rechenkern soll während der Arbeit regelmäßig `ComputationUpdate::Progress` über einen Channel an die GUI senden. Wie liest die GUI diesen Kanal asynchron aus, ohne beim Rendern der Oberfläche ins Stocken zu geraten?

### Modul 3: Vollendung & Hauptprogramm
Integriere das System in `main.rs`.
- Schreibe eine konsolenbasierte GUI-Simulation (z. B. mit `crossterm` oder einfachen Terminal-Ausgaben), die flüssig auf Tastendrücke reagiert.
- Starte Berechnungen im Hintergrund und visualisiere den Fortschrittsbalken live.
- Behandle Fehler wie den Absturz des Rechenkerns oder blockierte Nachrichtenkanäle auf didaktische Weise.

---

## 79. Batch-Verarbeitungs-Manager

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für einen Batch-Manager.
- Erstelle ein Struct `ApiRequest` mit ID, Payload und einem Kanal zum Zurücksenden der Antwort (`oneshot::Sender`).
- Erstelle ein Struct `RequestBatch`, das eine Sammlung von `ApiRequest`s enthält.
- Überlege, wie du den temporären Speicher für eingehende Anfragen organisierst. Welche Synchronisations-Typen sind nötig, um Anfragen asynchron zu sammeln und ab einer bestimmten Batch-Größe an die Worker zu übergeben?

### Modul 2: Implementierung & Methoden
Implementiere die Batch-Zusammenstellung und -Ausführung.
- Schreibe einen asynchronen Task, der kontinuierlich Anfragen empfängt und in einem Puffer sammelt.
- Der Puffer soll geleert und als Batch verarbeitet werden, wenn entweder:
  1. Eine maximale Anzahl von Anfragen (z. B. 10 Stück) erreicht ist.
  2. Ein Zeitlimit (z. B. 100 Millisekunden) seit der ersten Anfrage abgelaufen ist.
  - Tipp: Nutze `tokio::time::sleep` und `tokio::select!`, um dieses zeitgesteuerte Verhalten umzusetzen.
- Übergib den Batch an einen synchronen Worker-Thread, der die Anfragen parallel verarbeitet und die Ergebnisse über die jeweiligen `oneshot`-Kanäle zurückgibt.

### Modul 3: Vollendung & Hauptprogramm
Erstelle das Test-Szenario in `main.rs`.
- Generiere in einer asynchronen Schleife viele zufällige Anfragen mit unterschiedlichen Zeitabständen.
- Warte asynchron auf die Antworten der einzelnen Anfragen und gib diese aus.
- Implementiere eine Fehlerbehandlung für Timeouts und den Fall, dass der Worker-Thread überlastet ist. Miss die Effizienz der Batch-Verarbeitung im Vergleich zur Einzelverarbeitung.

---

## 80. Web-Scraper mit persistenter Queue

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für einen Web-Scraper mit persistenter Warteschlange.
- Erstelle ein Struct `ScrapeJob` mit der Ziel-URL und der aktuellen Crawl-Tiefe.
- Definiere eine Struktur `CrawlQueue`, die eine Liste noch zu besuchender URLs und eine menge bereits besuchter URLs (`HashSet`) verwaltet.
- Da mehrere asynchrone Scraper-Tasks parallel auf diese Queue zugreifen: Wie schützt du sie? (Tipp: `Arc<Mutex<CrawlQueue>>`).
- Wie planst du das Speicherlayout, um den Zustand der Queue synchron auf die Festplatte zu schreiben (Persistierung)?

### Modul 2: Implementierung & Methoden
Implementiere die Scraper- und Persistierungs-Logik.
- Schreibe einen asynchronen Task, der eine URL aus der Queue entnimmt, die Seite herunterlädt und nach weiteren URLs parst. Neue URLs werden wieder in die Queue eingefügt (sofern sie nicht bereits besucht wurden).
- Um Datenverlust zu vermeiden, soll ein synchroner Hintergrund-Thread in festen Abständen den Zustand der `CrawlQueue` sperren und als JSON- oder Textdatei auf die Festplatte schreiben.
- Wie stellst du sicher, dass das Schreiben der Datei die asynchronen Netzwerk-Anfragen der Scraper nicht blockiert?

### Modul 3: Vollendung & Hauptprogramm
Integriere den Scraper in `main.rs`.
- Initialisiere die Queue (lade eventuell ein bestehendes Backup von der Festplatte).
- Starte mehrere Scraper-Tasks parallel und aktiviere die regelmäßige Persistierung.
- Implementiere eine solide Fehlerbehandlung für Netzwerkfehler, ungültige HTML-Strukturen und I/O-Fehler beim Schreiben der Queue-Datei. Biete eine Option, um den Scraper sauber zu beenden und den finalen Zustand zu sichern.
# Didaktische Prompts für Rust-Projekte (81-100)

Dieses Dokument enthält strukturierte, modulare Anleitungen für die Projekte 81 bis 100. Jedes Projekt ist in drei Module unterteilt, um einen schrittweisen und didaktisch begleiteten Lernprozess zu ermöglichen, ohne fertige Codelösungen vorwegzunehmen.

---

## Projekt 81: Eigener Executor für Futures

### Modul 1: Basis-Datenstrukturen
Entwirf die grundlegenden Datenstrukturen für deine eigene minimale asynchrone Runtime auf dem Heap und Stack.
- **Konzept**: Überlege dir, wie du eine `Task` definieren kannst, die ein abzuarbeitendes Future sowie eine Möglichkeit zur Benachrichtigung (`Waker`) besitzt.
- **Datenstrukturen**:
  - Wie verpackst du das Future in der `Task`-Struktur, da seine konkrete Größe zur Kompilierzeit unbekannt ist und es über Threads hinweg gesendet werden muss? Ziehe `Pin<Box<dyn Future<Output = ()> + Send + 'static>>` in Betracht. Welche Rolle spielt `Send` hier?
  - Entwirf eine `Executor`-Struktur und eine `Spawner`-Struktur. Der `Spawner` soll neue Tasks in eine Queue legen, die der `Executor` abarbeitet. Welchen Channel-Typ (z. B. `std::sync::mpsc` oder ein externes Crate) wählst du dafür und warum?
  - Welche Felder müssen öffentlich sein und wie verwaltest du den gemeinsamen Zugriff auf die Task-Queue mittels `Arc`?

### Modul 2: Implementierung & Methoden
Implementiere die Kernlogik zum Ausführen und Aufwecken deiner Tasks.
- **Methoden**:
  - Implementiere den `ArcWake`-Trait (z. B. aus dem `futures`-Crate) für deine `Task`-Struktur. Was muss die `wake_by_ref`-Methode tun? (Tipp: Sie muss die Task, verpackt in einen `Arc`, wieder in den Kanal des Spawners senden).
  - Implementiere die `run`-Methode des `Executor`. Diese Methode soll in einer Schleife Tasks aus dem Kanal empfangen.
  - Wenn eine Task empfangen wird, wie pollst du das darin enthaltene Future? Wie erstellst du einen passenden `Context` unter Verwendung des Wakers der Task (`waker_ref`)?
  - Behandle den Rückgabewert des Poll-Vorgangs. Was passiert bei `Poll::Pending` und was bei `Poll::Ready`?

### Modul 3: Vollendung & Hauptprogramm
Integriere die Komponenten in ein funktionierendes Hauptprogramm.
- **Integration**:
  - Erstelle die `main.rs`. Initialisiere einen `Executor` und einen `Spawner`.
  - Implementiere ein einfaches, benutzerdefiniertes Future (z. B. ein Timer-Future, das einen Thread schlafen legt und nach Ablauf der Zeit den Waker aufruft), um deine Runtime zu testen.
  - Baue eine CLI-Ausgabe ein, die den Lebenszyklus einer Task loggt: Spawnen, Pollen, Schlafenlegen, Aufwecken und Fertigstellung.
  - Wie handhabst du Fehler, wenn der Empfängerkanal geschlossen wird oder der Spawner fehlschlägt?

---

## Projekt 82: Lock-freie Stack-Datenstruktur

### Modul 1: Basis-Datenstrukturen
Entwirf das Speicherlayout für einen Stack, der ohne traditionelle Mutex- oder RwLock-Sperren auskommt.
- **Konzept**: Da wir auf Locks verzichten, müssen wir atomare Operationen auf Speicheradressen ausführen.
- **Datenstrukturen**:
  - Entwirf eine `Node<T>`-Struktur. Sie muss einen Wert und einen Verweis auf das nächste Element halten. Warum eignen sich rohe Pointer (`*mut Node<T>`) hier besser als `Option<Box<Node<T>>>`?
  - Entwirf das `LockFreeStack<T>`-Struct. Es benötigt einen atomaren Zeiger auf den Kopf (`head`). Welchen Typ aus `std::sync::atomic::AtomicPtr` verwendest du dafür?
  - Überlege dir, wie du die Sichtbarkeiten der Felder einschränkst, um zu verhindern, dass rohe Pointer außerhalb deines Moduls manipuliert werden.

### Modul 2: Implementierung & Methoden
Implementiere die fundamentalen Stack-Methoden unter Verwendung von CAS-Operationen.
- **Methoden**:
  - Implementiere die `push`-Methode. Du musst ein neues `Node` auf dem Heap allozieren. Wie liest du den aktuellen Kopf aus und versuchst atomar, den neuen Knoten als Kopf zu setzen?
  - Informiere dich über `compare_exchange` oder `compare_exchange_weak`. Welche Speicherordnungen (`std::sync::atomic::Ordering`) wie `Ordering::Acquire` und `Ordering::Release` sind für einen korrekten Datenaustausch zwischen Threads notwendig?
  - Implementiere die `pop`-Methode. Sie muss den aktuellen Kopf lesen, den Nachfolger ermitteln und den Kopf atomar aktualisieren. Wie stellst du sicher, dass du den Wert des gelöschten Knotens sicher zurückgibst und den Speicher freigibst?

### Modul 3: Vollendung & Hauptprogramm
Schreibe ein Testprogramm, um die Thread-Sicherheit deines Stacks zu überprüfen.
- **Integration**:
  - Erstelle ein Hauptprogramm, das mehrere Threads parallel spawnt, die gleichzeitig Werte auf den Stack schieben (`push`) und herunterholen (`pop`).
  - Implementiere das `Drop`-Trait für `LockFreeStack<T>`. Warum ist das extrem wichtig, wenn wir mit rohen Pointern arbeiten? (Tipp: Speicherlecks verhindern).
  - Implementiere ein Konsolenmenü, um manuelle Push- und Pop-Operationen durchzuführen und den aktuellen Füllstand anzuzeigen.
  - Wie bildest du leere Stack-Zustände sauber ab? (Verwende `Option<T>` als Rückgabetyp).

---

## Projekt 83: Mehrbenutzer-Chat per UDP

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für einen asynchronen UDP-basierten Chat-Server und -Client.
- **Konzept**: UDP ist verbindungslos. Der Server muss daher eingehende Datenpakete analysieren und die Absenderadressen dynamisch verwalten.
- **Datenstrukturen**:
  - Definiere ein Struct für den `ChatServer`. Es muss den UDP-Socket verwalten und eine Liste aller aktiven Teilnehmer (`SocketAddr`) halten.
  - Da mehrere Tasks auf die Teilnehmerliste zugreifen können, wie verpackst du sie thread-sicher? Nutze `Arc<Mutex<HashSet<SocketAddr>>>` or ein `RwLock`.
  - Entwirf eine Struktur für die Chat-Nachricht, die neben dem Text auch den Benutzernamen und einen Zeitstempel enthalten kann.

### Modul 2: Implementierung & Methoden
Implementiere die asynchrone Netzwerk- und Verteillogik.
- **Methoden**:
  - Verwende `tokio::net::UdpSocket`. Wie liest du in einer asynchronen Endlosschleife Daten vom Socket? (`recv_from`).
  - Implementiere eine Methode zum Hinzufügen neuer Clients zur Liste, sobald ein neues Paket empfangen wird.
  - Schreibe die Broadcast-Logik: Der Server durchläuft die Liste der aktiven Teilnehmer und sendet die Nachricht asynchron mit `send_to` an jeden Client (außer an den ursprünglichen Absender).
  - Wie verhinderst du Deadlocks, wenn du den Mutex der Client-Liste sperrst, während du asynchron sendest?

### Modul 3: Vollendung & Hauptprogramm
Erstelle das Hauptprogramm für Server und Client.
- **Integration**:
  - Schreibe ein Programm, das per CLI-Argument (z.B. `--mode server` oder `--mode client`) gesteuert wird.
  - Client-Logik: Wie liest du gleichzeitig von der Standardeingabe (`tokio::io::stdin`) und lauschst auf eingehende UDP-Pakete? Verwende `tokio::select!`.
  - Baue ein ansprechendes CLI-Layout für den Chat-Verlauf.
  - Implementiere eine solide Fehlerbehandlung für Netzwerkunterbrechungen und ungültige UTF-8-Daten.

---

## Projekt 84: Asynchroner Proxy-Server

### Modul 1: Basis-Datenstrukturen
Modelliere die Datenstrukturen für deinen HTTP/TCP-Proxy-Server.
- **Konzept**: Ein Proxy nimmt eingehende TCP-Verbindungen an und leitet den Datenstrom an ein anderes Ziel weiter.
- **Datenstrukturen**:
  - Entwirf ein `ProxyConfig`-Struct, das die lokale Abhöradresse und die Zieladresse speichert.
  - Wie repräsentierst du eine aktive Proxy-Verbindung?
  - Da wir Verbindungsstatistiken (aktive Verbindungen, transferierte Bytes) erfassen möchten: Wie entwirfst du eine thread-sichere Struktur dafür? (Verwende atomare Typen wie `AtomicUsize` und `Arc`).

### Modul 2: Implementierung & Methoden
Implementiere das asynchrone Weiterleiten der TCP-Datenströme.
- **Methoden**:
  - Verwende `tokio::net::TcpListener` zum Abhören des lokalen Ports.
  - Akzeptiere eingehende Verbindungen asynchron in einer Schleife und spawne für jede Verbindung einen neuen Task mit `tokio::spawn`.
  - Implementiere die Weiterleitungsfunktion: Baue eine ausgehende `TcpStream`-Verbindung zum Zielserver auf.
  - Wie kopierst du Daten bidirektional zwischen Client und Ziel? Erkundige dich nach `tokio::io::copy_bidirectional` oder dem Aufteilen der Streams in Lese- und Schreibhälften mit `.split()`.

### Modul 3: Vollendung & Hauptprogramm
Integriere den Proxy-Server und baue Überwachungstools.
- **Integration**:
  - Schreibe die `main.rs`. Konfiguriere den Server über Kommandozeilenargumente oder eine Konfigurationsdatei.
  - Protokolliere den Start des Servers sowie eingehende Verbindungen im Terminal.
  - Implementiere eine Fehlerbehandlung: Was passiert, wenn der Zielserver nicht erreichbar ist oder der Client die Verbindung abrupt trennt?
  - Stelle sicher, dass Ressourcen (Sockets, Tasks) beim Schließen einer Verbindung ordnungsgemäß freigegeben werden.

---

## Projekt 85: Custom Waker-Implementierung

### Modul 1: Basis-Datenstrukturen
Entwirf das Speicher- und Signalmodell für ein eigenes Future, das auf ein Ereignis wartet.
- **Konzept**: Rusts Asynchronität basiert auf dem Zusammenspiel von `Future` und `Waker`. Ein Waker benachrichtigt den Executor, dass eine Task erneut gepollt werden kann.
- **Datenstrukturen**:
  - Entwirf ein `SharedState`-Struct, das speichert, ob das Ereignis eingetreten ist (`completed: bool`) und den aktuellen `Waker` hält.
  - Warum muss der Waker als `Option<Waker>` deklariert werden?
  - Wie verpackst du dieses `SharedState`, damit das Future und der Ereignisauslöser thread-sicher darauf zugreifen können? (`Arc<Mutex<SharedState>>`).
  - Definiere deine eigene Future-Struktur, die den `Arc` auf den gemeinsamen Zustand besitzt.

### Modul 2: Implementierung & Methoden
Implementiere das `Future`-Trait und die Signalisierungsfunktion.
- **Methoden**:
  - Implementiere das `Future`-Trait für deine Struktur. In der `poll`-Methode: Wie prüfst du den Zustand im `Mutex`?
  - Wenn das Ereignis noch nicht eingetreten ist: Wie klonst du den aktuellen `Waker` aus dem `Context` (`cx.waker()`), speicherst ihn im Zustand und gibst `Poll::Pending` zurück?
  - Implementiere die Auslösemethode (`signal`) für den Event-Generator: Sie muss das Flag im Zustand auf `true` setzen und – falls vorhanden – den gespeicherten Waker aufrufen (`waker.wake()`).

### Modul 3: Vollendung & Hauptprogramm
Testen des eigenen Futures in einer asynchronen Umgebung.
- **Integration**:
  - Erstelle die `main.rs` und starte eine Tokio-Runtime.
  - Spawne eine Task, die auf dein benutzerdefiniertes Future wartet (`.await`).
  - Richte einen separaten Thread oder Task ein, der auf eine Benutzereingabe (z. B. Tastendruck in der Konsole) wartet und dann das Signal auslöst.
  - Behandle potenzielle Fehler wie Deadlocks bei der Mutex-Sperrung und die Situation, dass das Signal ausgelöst wird, bevor das Future überhaupt gepollt wurde.

---

## Projekt 86: Distributed Key-Value-Store (Simuliert)

### Modul 1: Basis-Datenstrukturen
Entwirf das Speicherlayout und Kommunikationsmodell für simulierte Datenbankknoten.
- **Konzept**: Mehrere Knoten müssen Daten konsistent halten und kommunizieren ausschließlich über Channels.
- **Datenstrukturen**:
  - Entwirf ein `Node`-Struct. Jeder Knoten benötigt eine ID und einen lokalen Speicher (`HashMap<String, String>`).
  - Wie kommunizieren die Knoten? Definiere ein `Message`-Enum mit Varianten wie `Read`, `Write` und `Replicate`.
  - Jeder Knoten benötigt eine Liste der Kanäle (`tokio::sync::mpsc::Sender<Message>`) zu allen anderen Knoten im Netzwerk. Wie verwaltest du diese Adressliste thread-sicher?

### Modul 2: Implementierung & Methoden
Implementiere die Konsens- und Nachrichtenschleife.
- **Methoden**:
  - Jeder Knoten läuft in einem eigenen asynchronen Task (`tokio::spawn`). Implementiere die Ereignisschleife, die eingehende Nachrichten verarbeitet.
  - Wenn eine Schreibanfrage eintrifft: Wie wird diese an die anderen Knoten verteilt?
  - Implementiere ein einfaches Quorum-System: Der initiierende Knoten wartet auf Bestätigungen von mindestens der Hälfte der Knoten (plus eins), bevor er dem Client Erfolg meldet. Welche Rolle spielen `tokio::sync::oneshot`-Kanäle für die Rückantworten?
  - Nutze `tokio::time::timeout`, um nicht enden wollende Wartezeiten bei Knotenausfällen zu verhindern.

### Modul 3: Vollendung & Hauptprogramm
Simuliere das Gesamtsystem und teste Ausfallszenarien.
- **Integration**:
  - Initialisiere in der `main.rs` ein System aus z. B. 3 oder 5 Knoten.
  - Implementiere ein CLI-Interface, das dem Benutzer erlaubt, Lese- und Schreibbefehle an bestimmte Knoten zu senden.
  - Füge eine funktionale Logik hinzu, um Knoten künstlich zu "stoppen" (z.B. durch Schließen oder Ignorieren seines Empfangskanals), um die Ausfallsicherheit des Quorums zu demonstrieren.
  - Behandle Fehler bei Kanaltrennungen und Timeouts.

---

## Projekt 87: TCP-Chat-Server mit Authentifizierung

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für Verbindungszustände und Benutzerverwaltung.
- **Konzept**: Client-Verbindungen durchlaufen Phasen (nicht authentifiziert, authentifiziert) und müssen zentral verwaltet werden.
- **Datenstrukturen**:
  - Definiere ein `ClientState`-Enum mit Varianten wie `Unauthenticated` und `Authenticated { username: String }`.
  - Der Server benötigt eine Liste der aktiven, authentifizierten Verbindungen. Wie ordnest du Adressen den jeweiligen Kanalsendern zu? (`Arc<Mutex<HashMap<SocketAddr, mpsc::Sender<String>>>>`).
  - Entwirf eine Struktur zur Speicherung der gültigen Zugangsdaten.

### Modul 2: Implementierung & Methoden
Implementiere die asynchrone Authentifizierung und den Broadcast.
- **Methoden**:
  - Verwende `tokio::net::TcpListener`. Spawne für jeden Client einen Task.
  - Implementiere die Logik zum Einlesen von Daten: Nutze `tokio::io::BufReader` und lies Zeilen asynchron ein.
  - Bevor der Client Nachrichten senden darf, muss er ein Passwort eingeben. Vergleiche die Eingabe asynchron mit deinen Zugangsdaten.
  - Implementiere die Weiterleitung: Sobald ein Client authentifiziert ist, wird er in die Serverliste eingetragen. Eingehende Textnachrichten werden an alle anderen authentifizierten Clients verteilt.

### Modul 3: Vollendung & Hauptprogramm
Integriere den TCP-Chat-Server und verwalte die Laufzeit.
- **Integration**:
  - Schreibe die `main.rs`, die den Server startet.
  - Implementiere administrative Befehle im Terminal (z. B. Liste der aktiven Benutzer anzeigen, einen Benutzer kicken).
  - Behandle Verbindungsabbrüche: Wenn ein Client die Verbindung trennt, wie entfernst du ihn zuverlässig aus der globalen Map?
  - Fange alle I/O-Fehler ab, um die Stabilität des Servers zu garantieren.

---

## Projekt 88: Asynchroner DNS-Client

### Modul 1: Basis-Datenstrukturen
Entwirf das Speicherlayout für DNS-Pakete im Binärformat.
- **Konzept**: DNS verwendet ein striktes Byte-Protokoll über UDP.
- **Datenstrukturen**:
  - Entwirf ein `DnsHeader`-Struct. Welche Felder (ID, Flags, Anzahl Fragen, Antworten) benötigst du?
  - Wie repräsentierst du eine `DnsQuestion` und einen `DnsRecord` (Antwort)?
  - Da DNS-Pakete typischerweise über Byte-Buffer verarbeitet werden, wie stellst du sicher, dass deine Parsingschritte keine Pufferüberläufe verursachen?

### Modul 2: Implementierung & Methoden
Implementiere die Byte-Serialisierung und das asynchrone Senden.
- **Methoden**:
  - Implementiere eine Methode, um eine DNS-Frage in ein Byte-Array zu serialisieren. Wie codierst du den Domainnamen (z.B. `google.com` zu `6google3com0`)?
  - Implementiere die Methode zum Parsen des Antwort-Byte-Buffers. Wie navigierst du durch die variable Länge von DNS-Namen (Labels) und Zeigern (Compression)?
  - Verwende `tokio::net::UdpSocket`, um die Anfrage an einen DNS-Server (z. B. `8.8.8.8:53`) zu senden und die Antwort asynchron zu empfangen.

### Modul 3: Vollendung & Hauptprogramm
Erstelle das DNS-Lookup-CLI-Tool.
- **Integration**:
  - Schreibe ein CLI-Programm, das einen Domainnamen entgegennimmt.
  - Führe den asynchronen DNS-Lookup durch und zeige die Antwort-IP-Adresse im Terminal an.
  - Implementiere ein Timeout für die UDP-Antwort mit `tokio::time::timeout`.
  - Behandle Fehler bei ungültigen Eingaben, Netzwerkproblemen und fehlerhaften DNS-Antworten.

---

## Projekt 89: Lock-freier Ringpuffer (Single-Producer, Single-Consumer)

### Modul 1: Basis-Datenstrukturen
Entwirf das Speicherlayout eines performanten Ringpuffers für einen Schreiber und einen Leser.
- **Konzept**: Ein lock-freier Ringpuffer synchronisiert den Lese- und Schreibzugriff ausschließlich über atomare Indizes.
- **Datenstrukturen**:
  - Entwirf das `RingBuffer<T>`-Struct. Es benötigt einen festen Speicherbereich (z. B. `Box<[T]>` oder einen rohen Zeiger).
  - Welche Indizes benötigst du für die Lese- und Schreibpositionen?
  - Wie definierst du diese Indizes, um Datenrennen zu vermeiden? Verwende `std::sync::atomic::AtomicUsize`.
  - Leistungstipp: Wie verhinderst du CPU-Cache-Probleme (False Sharing) zwischen den Indizes? (Tipp: Speicher-Alignment `#[repr(align(64))]`).

### Modul 2: Implementierung & Methoden
Implementiere die Synchronisation und die atomaren Operationen.
- **Methoden**:
  - Implementiere die `push`-Methode (für den Producer). Wie prüfst du, ob der Puffer voll ist, ohne ein Lock zu verwenden? Welche Speicherordnung (`Ordering::Release`) ist nötig, wenn du den Schreibindex erhöhst?
  - Implementiere die `pop`-Methode (für den Consumer). Wie liest du den Schreibindex atomar (`Ordering::Acquire`) und entnimmst das Element sicher aus dem Speicher?
  - Achte darauf, wie du mit nicht-initialisiertem Speicher umgehst (z.B. mittels `MaybeUninit<T>`), um undefiniertes Verhalten in Rust zu vermeiden.

### Modul 3: Vollendung & Hauptprogramm
Entwickle das Performanz-Testprogramm.
- **Integration**:
  - Schreibe ein Programm, das den Ringpuffer initialisiert und in eine Producer- und eine Consumer-Hälfte teilt.
  - Spawne zwei Threads, die Daten mit maximaler Geschwindigkeit austauschen.
  - Implementiere eine Fehlerbehandlung für den Fall, dass der Puffer voll (Push-Fehler) oder leer (Pop-Fehler) ist.
  - Berechne die Anzahl der übertragenen Elemente pro Sekunde und gib das Ergebnis auf der Konsole aus.

---

## Projekt 90: TCP-Port-Scanner

### Modul 1: Basis-Datenstrukturen
Definiere die Strukturen für den parallelen Port-Scanner.
- **Konzept**: Um Tausende von Ports parallel zu scannen, müssen wir asynchrone Verbindungsversuche starten, deren Anzahl jedoch begrenzen, um das System nicht zu überlasten.
- **Datenstrukturen**:
  - Entwirf ein Struct für das Scan-Ziel, das die IP-Adresse und eine Liste von Ports enthält.
  - Welches Tokio-Primitive verwendest du zur Begrenzung der maximalen Gleichzeitigkeit? (Tipp: `tokio::sync::Semaphore`).
  - Wie strukturierst du das Ergebnis-Struct (z. B. Port, Status: Offen/Geschlossen/Timeout)?

### Modul 2: Implementierung & Methoden
Implementiere die asynchrone Scan-Logik und das Concurrency-Management.
- **Methoden**:
  - Schreibe eine asynchrone Funktion `scan_port`, die versucht, eine Verbindung über `tokio::net::TcpStream::connect` aufzubauen.
  - Wie implementierst du ein kurzes Timeout für den Verbindungsaufbau, damit der Scan nicht hängen bleibt? (`tokio::time::timeout`).
  - Implementiere die Schleife, die über alle Ports iteriert, ein Permit vom Semaphor anfordert und die Task mit `tokio::spawn` startet.
  - Wie sendest du die Ergebnisse über einen asynchronen `mpsc`-Kanal zurück an die Haupt-Task?

### Modul 3: Vollendung & Hauptprogramm
Baue das CLI-Tool und die Ergebnisanzeige.
- **Integration**:
  - Schreibe die `main.rs`. Lass den Benutzer die Ziel-IP, den Portbereich und die Anzahl der parallelen Tasks über die Kommandozeile konfigurieren.
  - Implementiere eine Fortschrittsanzeige in der Konsole.
  - Sammle alle Ergebnisse ein, sortiere sie und gib die offenen Ports übersichtlich aus.
  - Achte auf die korrekte Handhabung von ungültigen IPs, Port-Eingaben und System-Fehlern.

---

## Projekt 91: Dateitransfer-Server mit Flusssteuerung

### Modul 1: Basis-Datenstrukturen
Entwirf das Modell für die speicherschonende Dateiübertragung.
- **Konzept**: Große Dateien dürfen nicht komplett in den RAM geladen werden. Wir müssen mit festen Puffergrößen arbeiten.
- **Datenstrukturen**:
  - Entwirf ein `TransferSession`-Struct, das die Datei und den Netzwerksocket hält.
  - Welchen Datentyp wählst du für den Buffer auf dem Heap, um eine definierte Speichergröße (z. B. 64 KB) nicht zu überschreiten?
  - Welche Felder benötigst du zur Fortschrittsverfolgung?

### Modul 2: Implementierung & Methoden
Implementiere die asynchrone E/A-Schleife und die Flusssteuerung.
- **Methoden**:
  - Verwende `tokio::fs::File` für das asynchrone Lesen von der Festplatte.
  - Wie implementierst du Flusssteuerung (Backpressure)? Warum sorgt das asynchrone `await` auf `AsyncWriteExt::write_all` beim Senden in den `TcpStream` automatisch dafür, dass nicht schneller von der Festplatte gelesen wird, als das Netzwerk senden kann?
  - Schreibe die asynchrone Lese-Schreib-Schleife, die blockweise Daten liest, sendet und den Puffer wiederverwendet.

### Modul 3: Vollendung & Hauptprogramm
Integriere den Server und den Empfänger-Client.
- **Integration**:
  - Schreibe das Server-Programm, das auf Verbindungen wartet und eine Datei ausliefert.
  - Schreibe das Client-Programm, das die Daten empfängt, in eine lokale Datei schreibt und die Download-Rate berechnet.
  - Baue eine Fortschrittsanzeige (Prozent und aktuelle Geschwindigkeit in MB/s) auf der Konsole ein.
  - Implementiere Fehlerbehandlung für Festplatten-Lese-/Schreibfehler und plötzliche Verbindungsabbrüche.

---

## Projekt 92: Raft-Konsensus-Prototyp (Simuliert)

### Modul 1: Basis-Datenstrukturen
Modelliere die Zustände und Nachrichten des Raft-Konsensprotokolls.
- **Konzept**: Raft regelt die Wahl eines Leaders in einem verteilten System.
- **Datenstrukturen**:
  - Definiere die Rollen eines Knotens mit einem `Role`-Enum (`Follower`, `Candidate`, `Leader`).
  - Entwirf das `NodeState`-Struct für Term-Nummer, Log-Einträge und Abstimmungsverhalten.
  - Erstelle das `Message`-Enum mit den Varianten `RequestVote` und `AppendEntries` sowie deren Antworten. How do you design the payload structures?

### Modul 2: Implementierung & Methoden
Implementiere die asynchrone Raft-Ereignisschleife.
- **Methoden**:
  - Jeder Knoten wird als asynchroner Task gestartet. Wie implementierst du das zufällige Election-Timeout (z. B. zwischen 150 und 300 ms)? (Nutze `tokio::time::sleep` mit einem Zufallsgenerator).
  - Verwende `tokio::select!`, um gleichzeitig auf eingehende Nachrichten aus dem Kanal und auf das Ablaufen von Timeouts zu reagieren.
  - Implementiere die Zustandsübergänge: Wie wird ein `Follower` zum `Candidate`, startet eine Wahl und sendet Abstimmungsbitten?
  - Wie reagiert der `Leader`, um periodisch Heartbeats zu senden?

### Modul 3: Vollendung & Hauptprogramm
Simuliere das Netzwerk und teste Fehlerfälle.
- **Integration**:
  - Schreibe die `main.rs`, die ein System aus mehreren Knoten (z. B. 5) über Tokio-Channels vernetzt.
  - Implementiere eine Konsolenausgabe, die den Zustand jedes Knotens visualisiert.
  - Biete CLI-Befehle an, um einzelne Knoten "ausfallen" zu lassen oder Netzwerk-Partitionen zu simulieren, und beobachte, wie sich das System verhält.
  - Behandle Fehler bei Kanaltrennungen und unvollständigen Quoren.

---

## Projekt 93: Websocket-Chat-Server

### Modul 1: Basis-Datenstrukturen
Entwirf die Websocket-Verbindungsdatenstrukturen.
- **Konzept**: Websockets ermöglichen eine dauerhafte Vollduplex-Verbindung zwischen Browser-Clients und dem Server.
- **Datenstrukturen**:
  - Wie verwaltest du die aktiven Verbindungen auf dem Server, um Nachrichten an alle zu verteilen? Nutze `tokio::sync::broadcast::Sender`.
  - Entwirf ein Struct für Chat-Nachrichten. Wie serialisierst du diese in das JSON-Format?
  - Welche Sichtbarkeiten sind für deine Verbindungs- und Broadcast-Module notwendig?

### Modul 2: Implementierung & Methoden
Implementiere den Websocket-Handshake und die asynchrone Weiterleitung.
- **Methoden**:
  - Akzeptiere eingehende TCP-Verbindungen. Wie führst du den asynchronen Websocket-Handshake durch? (Verwende z. B. `tokio-tungstenite`).
  - Spawne pro Verbindung einen Task. Dieser Task muss zwei Datenströme parallel verarbeiten: Eingehende Websocket-Nachrichten lesen und auf den globalen Broadcast-Kanal lauschen. Nutze `tokio::select!`.
  - Wie filterst du Websocket-Kontroll-Frames (wie Ping, Pong, Close) heraus?

### Modul 3: Vollendung & Hauptprogramm
Baue den lauffähigen Chat-Server.
- **Integration**:
  - Schreibe die `main.rs`, die den Server auf einem konfigurierten Port startet.
  - Implementiere Log-Ausgaben im Server-Terminal für Verbindungsaufbauten, Trennungen und Nachrichten.
  - Wie behandelst du Fehler, wenn ein Client sehr langsam liest oder ungültige Zeichen sendet?
  - (Optional) Erstelle eine minimale HTML-Datei mit JavaScript, um deinen Websocket-Chat direkt im Browser zu testen.

---

## Projekt 94: Asynchrone Ablaufsteuerung (Workflow-Engine)

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für eine Workflow-Engine auf Basis eines DAG (Directed Acyclic Graph).
- **Konzept**: Aufgaben haben Abhängigkeiten. Aufgabe B darf erst starten, wenn Aufgabe A erfolgreich abgeschlossen ist.
- **Datenstrukturen**:
  - Entwirf das `Task`-Struct. Es benötigt eine eindeutige ID, eine Liste von IDs der Tasks, von denen es abhängt, und eine asynchrone Funktion (z.B. ein Future), die ausgeführt werden soll.
  - Wie definierst du den Zustand einer Aufgabe? (`enum TaskState` mit `Pending`, `Running`, `Completed`, `Failed`).
  - Entwirf das `Workflow`-Struct zur Verwaltung aller Tasks. Wie stellst du sicher, dass keine zyklischen Abhängigkeiten existieren?

### Modul 2: Implementierung & Methoden
Implementiere den Ablauf-Scheduler.
- **Methoden**:
  - Wie ermittelt die Engine, welche Aufgaben startbereit sind? (Tipp: Alle Abhängigkeiten müssen im Zustand `Completed` sein).
  - Wenn Aufgaben bereit sind: Wie spawnst du sie parallel über `tokio::spawn`?
  - Wie verwaltest du den Gesamtzustand des Workflows thread-sicher, wenn mehrere Hintergrund-Tasks gleichzeitig fertiggestellt werden? (Verwende `Arc<Mutex<WorkflowState>>` oder steuere den Zustand über einen zentralen Event-Kanal).
  - Wie wartet die Engine asynchron auf die Fertigstellung von Tasks?

### Modul 3: Vollendung & Hauptprogramm
Integriere die Workflow-Engine und implementiere die Fehlerbehandlung.
- **Integration**:
  - Schreibe die `main.rs`, die einen komplexen Workflow mit mehreren Abhängigkeiten definiert.
  - Implementiere eine Konsolenausgabe, die den aktuellen Zustand des Workflows und der einzelnen Tasks grafisch oder strukturiert darstellt.
  - Was passiert, wenn eine Aufgabe fehlschlägt? Implementiere Strategien (z. B. Abbruch aller Nachfolger, Fortsetzen unabhängiger Pfade).
  - Baue eine saubere Fehlerbehandlung für Timeouts und ungültige Task-Konfigurationen auf.

---

## Projekt 95: Netzwerk-Bandbreiten-Limiter

### Modul 1: Basis-Datenstrukturen
Entwirf den Wrapper zur künstlichen Drosselung von asynchronen Streams.
- **Konzept**: Ein Wrapper-Struct soll sich wie ein normaler TCP-Stream verhalten, jedoch die Übertragungsrate begrenzen.
- **Datenstrukturen**:
  - Entwirf das Struct `RateLimitedStream<S>`, das einen inneren Stream `S` kapselt.
  - Welche Felder benötigst du zur Konfiguration der Bandbreite (z.B. Bytes pro Sekunde)?
  - Welche Variablen müssen den Zustand des aktuellen Zeitfensters (übertragene Bytes, Startzeit des Fensters) speichern?
  - Wie verwaltest du das `Sleep`-Future im Wrapper, um es bei Bedarf zu pollt?

### Modul 2: Implementierung & Methoden
Implementiere die asynchronen Lese- und Schreib-Traits für die Drosselung.
- **Methoden**:
  - Implementiere `tokio::io::AsyncRead` für `RateLimitedStream`.
  - In `poll_read`: Rufe zuerst das `poll_read` des inneren Streams auf. Wenn Daten gelesen wurden, berechne, ob das Limit im aktuellen Zeitfenster überschritten wurde.
  - Wenn das Limit überschritten ist: Wie verzögerst du die Rückgabe? (Tipp: Du musst das `Sleep`-Future pollt und `Poll::Pending` zurückgeben, damit die Task blockiert, bis die Zeit abgelaufen ist).
  - Implementiere analog `tokio::io::AsyncWrite`.

### Modul 3: Vollendung & Hauptprogramm
Erstelle das Testprogramm zur Geschwindigkeitsmessung.
- **Integration**:
  - Schreibe ein Server-Programm, das eine Datei über den gedrosselten Stream bereitstellt.
  - Schreibe das Client-Programm, das die Datei empfängt und periodisch die aktuelle Empfangsgeschwindigkeit auf der Konsole ausgibt.
  - Biete eine Möglichkeit an, das Limit beim Programmstart über CLI-Argumente festzulegen.
  - Behandle Fehler bei I/O-Problemen und Verbindungsabbrüche.

---

## Projekt 96: Einfaches Actor-Modell

### Modul 1: Basis-Datenstrukturen
Entwirf das Typmodell für Aktoren und asynchrone Nachrichten.
- **Konzept**: Aktoren sind eigenständige Einheiten, die ausschließlich über Nachrichten kommunizieren und ihren eigenen Zustand verwalten.
- **Datenstrukturen**:
  - Definiere ein `Actor`-Trait mit einer asynchronen `handle`-Methode.
  - Was ist eine Actor-Adresse `Addr<A>`? Sie muss einen Kanal-Sender enthalten, um Nachrichten an den Actor zu senden. Welchen Kanaltyp wählst du? (`tokio::sync::mpsc::Sender`).
  - Wie modellierst du Nachrichten? Überlege dir, wie du ein Enum für verschiedene Nachrichtentypen entwirfst.

### Modul 2: Implementierung & Methoden
Implementiere den Actor-Eventloop und das Antwortverhalten.
- **Methoden**:
  - Schreibe die Funktion `spawn_actor<A>(actor: A) -> Addr<A>`, die eine asynchrone Endlosschleife (`tokio::spawn`) startet.
  - In der Schleife liest der Actor Nachrichten aus seinem Empfängerkanal und ruft die `handle`-Methode auf.
  - Wie implementierst du ein Anfrage-Antwort-Muster? Wenn der Sender eine Antwort erwartet, wie übergibst du einen One-Shot-Kanal (`tokio::sync::oneshot::Sender`) in der Nachricht?
  - Wie stellst du sicher, dass die Task des Actors beendet wird, wenn alle Adress-Sender (`Addr`) gelöscht werden?

### Modul 3: Vollendung & Hauptprogramm
Baue ein lauffähiges Beispiel mit kooperierenden Aktoren.
- **Integration**:
  - Schreibe ein Hauptprogramm, das mindestens zwei Aktoren instanziiert (z. B. einen `CounterActor` und einen `LoggerActor`).
  - Lass die Aktoren miteinander kommunizieren und Antworten austauschen.
  - Baue ein einfaches Konsolenmenü, um Nachrichten an die Aktoren zu senden und die Ergebnisse asynchron auszugeben.
  - Behandle Fehler bei geschlossenen Kanälen.

---

## Projekt 97: Sicherer Shutdown-Koordinator

### Modul 1: Basis-Datenstrukturen
Entwirf die Datenstrukturen für das Shutdown-Tracking.
- **Konzept**: Bei einem Abbruch (z. B. Ctrl+C) müssen alle asynchronen Hintergrund-Tasks benachrichtigt werden, um ihre Arbeit sauber zu beenden.
- **Datenstrukturen**:
  - Wie signalisierst du allen Tasks gleichzeitig den Shutdown? Welchen Typ wählst du? (Tipp: `tokio::sync::watch::Receiver` oder `tokio_util::sync::CancellationToken`).
  - Wie erfasst der Koordinator die Anzahl der noch aktiven Tasks?
  - (Didaktischer Tipp): Du kannst ein Kanal-Sender-Empfänger-Paar nutzen. Jede Task hält eine Kopie eines Senders. Wenn alle Tasks beendet sind und ihre Sender gedroppt werden, schließt sich der Empfänger des Koordinators.

### Modul 2: Implementierung & Methoden
Implementiere die Shutdown-Überwachung in den Tasks.
- **Methoden**:
  - Schreibe eine Beispiel-Hintergrund-Task. Wie prüft diese asynchron in ihrer Hauptschleife, ob ein Shutdown-Signal vorliegt, während sie gleichzeitig auf andere Ereignisse wartet? Nutze `tokio::select!`.
  - Implementiere die Shutdown-Methode im Koordinator. Sie muss das Signal auslösen und dann auf das Ende aller Tasks warten.
  - Wie verhinderst du, dass der Shutdown blockiert, falls eine Task hängt? Verwende `tokio::time::timeout`.

### Modul 3: Vollendung & Hauptprogramm
Integriere den Koordinator in ein Mehr-Task-System.
- **Integration**:
  - Schreibe die `main.rs`, die mehrere simulierte Netzwerk- und Datenbank-Tasks startet.
  - Fange das Betriebssystem-Signal Ctrl+C ab (`tokio::signal::ctrl_c()`).
  - Löse nach dem Signal den Shutdown aus und gib im Terminal detailliert aus, welche Tasks sich erfolgreich beendet haben.
  - Behandle Timeouts und unvollständige Task-Beendigungen sauber.

---

## Projekt 98: Load-Balancer mit Least-Connections-Algorithmus

### Modul 1: Basis-Datenstrukturen
Entwirf die Backend-Strukturen und den Verbindungszähler.
- **Konzept**: Ein Load-Balancer leitet eingehende TCP-Verbindungen an das Backend-Server-System weiter, das aktuell die wenigsten aktiven Verbindungen hält.
- **Datenstrukturen**:
  - Entwirf ein `Backend`-Struct, das die Adresse des Zielservers speichert.
  - Wie verwaltest du die Anzahl der aktiven Verbindungen für jedes Backend thread-sicher ohne klassische Sperren? (`std::sync::atomic::AtomicUsize`).
  - Wie wird die Liste aller Backends verwaltet? (`Arc<Vec<Backend>>`).

### Modul 2: Implementierung & Methoden
Implementiere den Auswahl-Algorithmus und das asynchrone Proxy-Verhalten.
- **Methoden**:
  - Schreibe eine Methode, die die Backend-Liste durchläuft und das Backend mit der geringsten Verbindungsanzahl ermittelt.
  - Wenn eine neue TCP-Verbindung eingeht: Inkrementiere den Verbindungszähler des ausgewählten Backends.
  - Wie stellst du sicher, dass der Zähler verringert wird, wenn die asynchrone Proxy-Task (die Daten bidirektional kopiert) endet – egal ob durch Erfolg, Fehler oder Verbindungsabbruch? (Tipp: Verwende ein Hilfs-Struct mit einer `Drop`-Implementierung zur automatischen Dekrementierung).

### Modul 3: Vollendung & Hauptprogramm
Simuliere das Load-Balancing.
- **Integration**:
  - Schreibe ein Programm, das den Load-Balancer startet und im Hintergrund 3 Dummy-TCP-Server auf unterschiedlichen Ports simuliert.
  - Implementiere eine Konsonenanzeige, die jede Sekunde den Verbindungszähler aller Backends anzeigt.
  - Sende mehrere Anfragen und demonstriere, wie der Balancer die Verbindungen verteilt.
  - Behandle Fehler bei unerreichbaren Backends.

---

## Projekt 99: Asynchroner SSH-Tunnel-Simulator

### Modul 1: Basis-Datenstrukturen
Entwirf die Tunnel- und Verschlüsselungskonfiguration.
- **Konzept**: Ein Tunnel leitet Daten über eine verschlüsselte TCP-Verbindung weiter.
- **Datenstrukturen**:
  - Entwirf ein Struct zur Speicherung der lokalen Abhöradresse, des simulierten SSH-Zwischenservers und der Zieladresse.
  - Wie modellierst du die Verschlüsselung? Definiere eine einfache Struktur, die Datenströme ver- und entschlüsselt (z.B. mittels eines XOR-Verfahrens mit einem geheimen Schlüssel).
  - Welche Sichtbarkeiten sind für deine Tunnelkomponenten sinnvoll?

### Modul 2: Implementierung & Methoden
Implementiere das Tunneln und die Stream-Modifikation.
- **Methoden**:
  - Akzeptiere lokale TCP-Verbindungen asynchron.
  - Verbinde dich asynchron zum simulierten SSH-Server und baue die Verbindung zum eigentlichen Ziel auf.
  - Da du die Daten verschlüsselt übertragen möchtest: Wie liest du in einer Schleife Daten aus dem Quell-Stream, modifizierst die Bytes (Verschlüsselung) und schreibst sie in den SSH-Stream?
  - Nutze asynchrone Lese- und Schreiboperationen (`read` und `write_all`).

### Modul 3: Vollendung & Hauptprogramm
Integriere den Simulator und teste die Übertragung.
- **Integration**:
  - Schreibe die `main.rs`, die den lokalen Tunnel und den SSH-Server startet.
  - Teste das Setup, indem du eine einfache TCP- oder HTTP-Verbindung durch den Tunnel leitest.
  - Protokolliere die verschlüsselten Bytes auf dem simulierten SSH-Server, um zu belegen, dass die Übertragung verschlüsselt stattfindet.
  - Behandle Fehler bei Verschlüsselungsfehlern und Verbindungsabbrüche.

---

## Projekt 100: Verteiltes Map-Reduce über TCP

### Modul 1: Basis-Datenstrukturen
Modelliere das verteilte Berechnungsnetzwerk.
- **Konzept**: Ein Master-Knoten verteilt Map- und Reduce-Aufgaben über TCP-Verbindungen an Worker-Knoten und sammelt die Ergebnisse.
- **Datenstrukturen**:
  - Welche Nachrichten werden über TCP übertragen? Definiere ein `Message`-Enum mit Varianten wie `MapTask(data)`, `ReduceTask(keys, values)`, `TaskCompleted(result)` und `RegisterWorker`.
  - Der Master benötigt eine Struktur, um die verbundenen Worker und deren Auslastungszustand (`Idle`, `Working`, `Offline`) zu verwalten.
  - Wie serialisierst du die Nachrichten für das Netzwerk?

### Modul 2: Implementierung & Methoden
Implementiere die Aufgabenverteilung und die asynchrone Netzwerkkommunikation.
- **Methoden**:
  - Wie liest und schreibst du strukturierte Nachrichten über TCP? (Tipp: Verwende ein Framed-Protokoll mit `tokio_util::codec` und JSON-Serialisierung).
  - Master-Logik: Starte eine asynchrone Schleife, die auf Worker-Verbindungen wartet. Teile die Eingabedaten auf, sende Map-Aufgaben an freie Worker und sammle die Ergebnisse.
  - Nach dem Map-Schritt: Wie führst du den Shuffle-Schritt (Gruppierung) durch und verteilst anschließende Reduce-Aufgaben?
  - Worker-Logik: Verbinde dich zum Master, lies in einer Schleife Aufgaben, führe die Berechnungen durch und sende das Ergebnis zurück.

### Modul 3: Vollendung & Hauptprogramm
Erstelle das verteilte Map-Reduce-System.
- **Integration**:
  - Schreibe das Hauptprogramm so, dass es sich über CLI-Argumente im Master- oder Worker-Modus starten lässt.
  - Implementiere ein konkretes Anwendungsbeispiel (z. B. Wortzählung über ein großes Textdokument).
  - Fehlerbehandlung: Was passiert, wenn ein Worker während der Berechnung die Verbindung verliert? (Der Master muss die abgebrochene Aufgabe erkennen und sie an einen anderen Worker neu vergeben).
  - Gib am Ende die gesammelten Ergebnisse aus.
