# Phase 8: Projektvorschläge zu Iteratoren & Closures

Herzlichen Glückwunsch! Du hast die Konzepte der funktionalen Programmierung in Rust – Closures (closures), Iteratoren (iterators) und das Verketten von Operationen (method chaining) – kennengelernt. Diese Werkzeuge ermöglichen es dir, ausdrucksstarken, performanten und sicheren Code zu schreiben, der ohne unnötige Schleifen und veränderliche Zwischenzustände auskommt.

Jetzt geht es darum, diese Werkzeuge in der Praxis einzusetzen. In dieser Phase findest du **10 strukturierte Projektvorschläge**, die Closures und Iteratoren in den Fokus stellen. Sie helfen dir dabei, typische Stolpersteine der funktionalen Programmierung in Rust zu verstehen und zu meistern.

> [!IMPORTANT]
> **Didaktischer Hinweis:** Für keines dieser Projekte findest du hier fertige Codelösungen. Das Ziel ist es, dass du die Datenflüsse selbst planst, die Hürden des Borrow-Checkers überwindest und ein tiefes Verständnis für die funktionale Denkweise in Rust entwickelst!

---

## Projekt 1: Der funktionale Log-Parser & Analysator

### 1. Beschreibung der Funktionsweise
Du hast eine große Log-Datei (z. B. von einem Webserver), die Zeile für Zeile analysiert werden soll. Das Ziel ist es, fehlerhafte Anfragen (z. B. HTTP-Status 4xx oder 5xx oder Zeilen mit dem Label `[ERROR]`) herauszufiltern, die IP-Adressen der Verursacher zu extrahieren und eine Statistik darüber zu erstellen, wie oft welche IP-Adresse eine Fehlermeldung ausgelöst hat. Die gesamte Verarbeitung soll als eine fließende Iterator-Kette realisiert werden.

### 2. Strukturierte Komponenten-Aufteilung
* **Log-Quelle:** Ein Iterator über die Zeilen einer Datei (`std::io::BufReader::lines`), der als Datenquelle dient.
* **Parsing-Pipeline:** Eine Kette funktionaler Operationen, die:
  * Fehlerhafte Zeilen filtert (`.filter`).
  * Die Rohzeile in eine strukturierte Darstellung (z. B. ein `LogEntry`-Struct) parst (`.filter_map`).
  * Den Zeitstempel und die IP-Adresse extrahiert.
* **Statistik-Sammler:** Eine Aggregation, die die gefilterten IP-Adressen mithilfe einer End-Operation (z. B. `.fold` oder `.collect`) in einer `HashMap` zählt und gruppiert.

### 3. Zu verwendende Crates
* `regex` (optional, um Log-Muster effizient mittels Regulärer Ausdrücke zu parsen)
* `chrono` (für das Parsen und Vergleichen von Datums- und Zeitangaben)

### 4. Didaktische Hinweise & Hürden
* **Lazy Evaluation:** Wenn du deine Iterator-Kette aufbaust, aber am Ende kein `.collect()`, `.fold()` oder `.for_each()` aufrufst, passiert absolut nichts. Du musst verstehen, warum Rust-Iteratoren träge sind.
* **Borrowing in Closures:** Wenn du in einer der filter- oder map-Methoden auf Variablen außerhalb der Closure zugreifen willst (z. B. auf einen Zähler oder eine Konfiguration), musst du darauf achten, wie Rusts Borrow-Checker die Lebensdauer dieser Referenzen bewertet.
* **Fehlerbehandlung:** Die Zeilen-Iteratoren liefern meist `Result<String, io::Error>`. Wie filterst du Fehler aus oder reichst sie weiter, ohne die gesamte Kette zu unterbrechen?

### 5. Optionale Zusatz-Herausforderung
Erweitere die Pipeline so, dass sie mit einem unendlichen Log-Stream arbeitet (z. B. durch das kontinuierliche Überwachen einer wachsenden Log-Datei ähnlich wie `tail -f`) und die Statistik in Echtzeit alle 5 Sekunden über ein Zeit-Intervall ausgibt.

---

## Projekt 2: CSV-Daten-Transformator & Validator (ETL-Pipeline)

### 1. Beschreibung der Funktionsweise
In diesem Projekt baust du eine ETL-Pipeline (Extract, Transform, Load). Du liest Rohdaten aus einer CSV-Datei ein. Diese Daten enthalten unvollständige, falsch formatierte oder fehlerhafte Datensätze. Deine Pipeline soll diese Daten bereinigen (z. B. Whitespaces entfernen, fehlende Werte durch Standardwerte ersetzen), anhand definierter Kriterien validieren (z. B. E-Mail-Formate prüfen) und die bereinigten Daten in eine neue CSV-Datei exportieren.

### 2. Strukturierte Komponenten-Aufteilung
* **Extraktor:** Iterator über die CSV-Datensätze (Records).
* **Transformator-Pipeline:** Eine Kette aus `.map()` für die Formatierung, `.filter_map()` zum Aussortieren fehlerhafter Datensätze und `.inspect()` zum Protokollieren fehlerhafter Einträge zu Debug-Zwecken.
* **Validierer:** Dynamisch registrierbare Closures, die Prüfregeln (z. B. `Fn(&Record) -> bool`) definieren.
* **Lader:** Ein Writer, der den finalen Iterator konsumiert und die bereinigten Datensätze in die Zieldatei schreibt.

### 3. Zu verwendende Crates
* `csv` (zum schnellen Einlesen und Schreiben von CSV-Dateien)
* `serde` (für die deklarative Deserialisierung der CSV-Zeilen in Rust-Structs)

### 4. Didaktische Hinweise & Hürden
* **Umgang mit Fehlern (`Result` in Ketten):** Wie transformiert man einen `Iterator<Item = Result<T, E>>`? Lerne den Unterschied zwischen `.filter_map(Result::ok)` (Fehler ignorieren) und dem Sammeln in ein `Result<Vec<T>, E>` (Abbruch beim ersten Fehler).
* **Ownership bei der Transformation:** Wenn du Daten reinigst, veränderst du oft Strings. Wann ist es sinnvoll, Strings direkt zu mutieren, wann solltest du neue Strings allokieren, und wann helfen dir Referenzen (`&str`)?

### 5. Optionale Zusatz-Herausforderung
Implementiere ein System, bei dem Validierungsfehler nicht einfach verworfen, sondern in eine separate "Dead Letter"-CSV-Datei umgeleitet werden, inklusive einer Begründung, warum die Validierung fehlgeschlagen ist (z. B. unter Verwendung von `.partition` oder eines benutzerdefinierten Split-Iterators).

---

## Projekt 3: Eine funktionale In-Memory Query Engine

### 1. Beschreibung der Funktionsweise
Du erstellst eine Abfrage-Engine (Query Engine) für eine im Arbeitsspeicher liegende Datenbank von Objekten (z. B. eine Liste von Benutzern oder Produkten). Anstatt klassische Schleifen zu schreiben, soll der Benutzer der Engine komplexe Filter-, Sortier- und Gruppierbedingungen über eine Fluent API verketten können, die intern vollständig auf Closures und Iterator-Kombinatoren basiert.

### 2. Strukturierte Komponenten-Aufteilung
* **Data-Store:** Eine einfache Kollektion wie `Vec<T>`.
* **Query-Builder:** Eine Struktur, die Filter-Closures (`Fn(&T) -> bool`) und Sortier-Funktionen sammelt, ohne sie sofort auszuführen.
* **Execution-Engine:** Führt die gesammelten Operationen aus, indem sie die Daten in einen Iterator überführt, die Filter-Closures nacheinander anwendet, sortiert und das Ergebnis zurückgibt.

### 3. Zu verwendende Crates
* Keine (die Standardbibliothek von Rust bietet alle nötigen Abstraktionen).

### 4. Didaktische Hinweise & Hürden
* **Typisierung von Closures:** Closures in Rust haben keinen direkt benennbaren Typ. Wenn du mehrere unterschiedliche Closures in einer Struktur (z. B. einem `Vec`) speichern willst, musst du sie hinter einem Pointer verstecken. Lerne, wie du `Box<dyn Fn(&T) -> bool>` dafür einsetzt.
* **Lifetimes bei Dynamic Dispatch:** Wenn du Closures in einer Box speicherst, fordert Rust standardmäßig eine `'static`-Lifetime. Wie gehst du um, wenn deine Closures Werte aus ihrer Umgebung referenzieren müssen?
* **Die Kosten von `Box`:** Überlege, welche Performance-Auswirkungen dynamischer Dispatch (`dyn`) im Vergleich zu statischem Dispatch hat und wann es eine Rolle spielt.

### 5. Optionale Zusatz-Herausforderung
Erweitere die Query-Engine so, dass sie "Lazy" bleibt. Das bedeutet, dass die Abfrage erst dann ausgeführt wird, wenn der Benutzer tatsächlich Daten anfordert (z. B. indem deine Query-Struktur selbst das `Iterator`-Trait implementiert und die Filter on-the-fly beim Aufruf von `.next()` anwendet).

---

## Projekt 4: Der Markdown-Dokument-Generator (Static Site Generator)

### 1. Beschreibung der Funktionsweise
Ein minimalistischer Static Site Generator (SSG), der einen Ordner mit Markdown-Dateien einliest, Metadaten (Front Matter wie Titel, Datum, Entwurfsstatus) parst, die Dokumente filtert (z. B. keine Entwürfe), sie nach Veröffentlichungsdatum sortiert und eine HTML-Indexseite generiert. Zusätzlich werden die einzelnen Seiten in HTML-Dateien umgewandelt.

### 2. Strukturierte Komponenten-Aufteilung
* **Verzeichnis-Scanner:** Ein Iterator über die Dateien eines Verzeichnisses.
* **Dokument-Parser:** Ein Mapper, der Dateipfade einliest, Front Matter extrahiert und den Markdown-Inhalt in HTML umwandelt.
* **Sammlungs-Pipeline:** Eine Iterator-Kette, die Entwürfe aussortiert, die Beiträge sortiert und eine Struktur für die Indexseite aufbaut.
* **HTML-Renderer:** Generiert die HTML-Seiten über ein Template-System.

### 3. Zu verwendende Crates
* `pulldown-cmark` (für hocheffizientes, iteratorbasiertes Markdown-Parsing)
* `gray_matter` (zum Parsen von YAML/JSON Front Matter in Markdown-Dateien)
* `walkdir` (optional, um Verzeichnisse rekursiv zu durchsuchen)

### 4. Didaktische Hinweise & Hürden
* **Fehlerfortpflanzung in verschachtelten Iteratoren:** Wenn du Dateien liest, können I/O-Fehler auftreten. Wie gehst du innerhalb einer `.map()`-Kette damit um? Wann solltest du `panic!` vermeiden und stattdessen `Result` zurückgeben?
* **Unnötige Allokationen:** Markdown-Parser arbeiten oft mit Referenzen auf den Originaltext. Wie vermeidest du es, bei jeder Transformation den kompletten Text zu kopieren? Setze dich mit `std::borrow::Cow` (Clone-on-Write) auseinander.

### 5. Optionale Zusatz-Herausforderung
Implementiere eine Paginierungs-Funktion (`Pagination`). Schreibe einen benutzerdefinierten Iterator-Adapter namens `.paginate(size)`, der eine flache Liste von Dokumenten in Seiten-Chunks der Größe `size` unterteilt, um automatisch nummerierte Unterseiten (`/page/1.html`, `/page/2.html`) zu erstellen.

---

## Projekt 5: Custom Iterator: Unendliche mathematische Folgen

### 1. Beschreibung der Funktionsweise
Rusts Standardbibliothek bietet viele nutenreiche Iteratoren, aber manchmal musst du eigene mathematische Ströme definieren. In diesem Projekt implementierst du eigene, potenziell unendliche Iteratoren für mathematische Konzepte (z. B. Primzahlen, Fibonacci-Zahlen oder Collatz-Folgen). Anschließend kombinierst du diese Generatoren mit funktionalen Ketten, um komplexe Fragen zu beantworten (z. B. "Was ist die Summe aller Primzahlen unter 10.000, die auf die Ziffer 7 enden?").

### 2. Strukturierte Komponenten-Aufteilung
* **Generator-Strukturen:** Typen wie `PrimeGenerator` oder `Fibonacci`, die den aktuellen Zustand der Berechnung speichern.
* **Iterator-Implementierung:** Das Implementieren des `Iterator`-Traits für diese Strukturen.
* **Analyse-Pipeline:** Funktionale Ketten, die diese unendlichen Ströme über `.take()`, `.filter()`, `.zip()` oder `.skip_while()` begrenzen, filtern und auswerten.

### 3. Zu verwendende Crates
* Keine (reine Standardbibliothek).

### 4. Didaktische Hinweise & Hürden
* **Das `Iterator`-Trait:** Verstehe die Signatur von `fn next(&mut self) -> Option<Self::Item>`. Bei unendlichen Strömen gibt `next` niemals `None` zurück – warum ist das kein Problem, solange wir Begrenzer wie `.take()` nutzen?
* **Zustandskonservierung:** Wie speicherst du den Zustand effizient? Für Fibonacci reichen zwei Variablen; für einen effizienten Primzahl-Generator benötigst du eventuell ein Sieb oder eine Liste bisher gefundener Primzahlen.
* **Vermeidung von Stack Overflows:** Achte darauf, dass deine Berechnungen in `next` iterativ und nicht tief-rekursiv sind.

### 5. Optionale Zusatz-Herausforderung
Schreibe einen eigenen Iterator-Adapter `.lookahead(n)`, der auf jedem beliebigen Iterator aufgerufen werden kann. Er soll es ermöglichen, die nächsten `n` Elemente als Slice zu betrachten (mittels eines internen Puffers), ohne sie endgültig aus dem Haupt-Iterator zu entfernen.

---

## Projekt 6: Musik-Wiedergabelisten-Generator (Playlist Generator)

### 1. Beschreibung der Funktionsweise
Du entwickelst ein Programm, das eine Musikbibliothek (eingelesen aus einer JSON-Datei) verwaltet. Der Benutzer möchte Wiedergabelisten basierend auf flexiblen Kriterien erstellen. Diese Kriterien (z. B. "Länge über 3 Minuten", "Genre ist Rock", "Bewertung mindestens 4 Sterne") sollen durch Closures repräsentiert werden. Das Programm soll es ermöglichen, diese Filter-Closures dynamisch miteinander zu kombinieren (z. B. durch logische UND- / ODER-Verknüpfungen) und die daraus resultierende Liste zufällig zu mischen.

### 2. Strukturierte Komponenten-Aufteilung
* **Bibliotheks-Speicher:** Eine Datenstruktur, die eine Liste von `Song`-Structs hält.
* **Filter-Kombinatoren:** Hilfsfunktionen, die zwei Closures entgegennehmen und eine neue Closure zurückgeben, welche die logische Verknüpfung der beiden darstellt.
* **Misch-Adapter (Shuffler):** Ein Iterator-Adapter, der die gefilterten Elemente in zufälliger Reihenfolge zurückgibt.

### 3. Zu verwendende Crates
* `serde_json` (zum Laden der Musikbibliothek)
* `rand` (für die Zufallsauswahl und das Mischen)

### 4. Didaktische Hinweise & Hürden
* **Kombination von Closures:** Wie schreibt man eine Funktion in Rust, die zwei Closures (z. B. `F1` und `F2`) entgegennimmt und eine neue Closure zurückgeben? Du wirst auf das Problem stoßen, dass Closures nicht direkt zurückgegeben werden können, ohne sie zu boxen (`Box<dyn Fn(...) -> ...>`).
* **`move`-Semantik bei Closures:** Wenn du Filterbedingungen zur Laufzeit dynamisch erstellst, musst du Werte (wie den gesuchten Genre-Namen als String) in die Closures verschieben. Verstehe das Schlüsselwort `move`.
* **Zufall im Iterator:** Ein echter Shuffler-Iterator muss die Elemente puffern, da er für ein echtes Mischen die Gesamtzahl der Elemente kennen muss. Überlege dir, wie du den Speicherbedarf optimierst.

### 5. Optionale Zusatz-Herausforderung
Implementiere ein Limit-System, das nicht auf der Song-Anzahl basiert, sondern auf der Gesamtspielzeit. Die Kette soll so lange Songs hinzufügen, bis eine Wunschzeit (z. B. 60 Minuten) möglichst präzise erreicht wird, ohne sie zu überschreiten.

---

## Projekt 7: Text-Vervollständigungs-Engine (Markov-Ketten-Generator)

### 1. Beschreibung der Funktionsweise
Dieses Programm analysiert einen großen Textkorpus und baut eine statistische Wissensdatenbank auf. Es ermittelt N-Gramme (Wortpaare oder -triplets) und berechnet, wie häufig auf ein bestimmtes Wort ein anderes folgt. Auf Basis dieser Daten kann das Programm Vorschläge für das nächste Wort machen oder vollautomatisch Texte generieren. Die Zerlegung des Textes und die Frequenzanalyse sollen rein funktional über Iterator-Ketten gelöst werden.

### 2. Strukturierte Komponenten-Aufteilung
* **Text-Tokenizer:** Ein Iterator, der Text einliest, Satzzeichen entfernt und Wörter als Token liefert.
* **N-Gramm-Generator:** Nutzt Adapter wie `.windows()` auf einem Vektor oder einen selbstgebauten gleitenden Fenster-Iterator, um Wortpaare zu bilden.
* **Häufigkeits-Akkumulator:** Nutzt `.fold()`, um eine verästelte Map (`HashMap<String, HashMap<String, usize>>`) aufzubauen.
* **Vorschlags-Engine:** Eine Kette, die für ein gegebenes Wort die Liste der Nachfolger filtert, nach Häufigkeit sortiert und die Top-Vorschläge zurückgibt.

### 3. Zu verwendende Crates
* Keine (Standardbibliothek reicht vollkommen aus).

### 4. Didaktische Hinweise & Hürden
* **Lifetimes bei Tokenisierung:** Wenn dein Tokenizer Referenzen (`&str`) auf den Quelltext zurückgibt, ist das sehr effizient. Sobald du aber N-Gramme in einer Map speichern willst, die über die Lebensdauer des Quelltexts hinaus existiert, kollidiert das mit dem Borrow-Checker. Wie löst du diesen Konflikt? (Stichwort: `String` vs. `&str`, oder `Rc<str>` / `Arc<str>`).
* **Verschachtelte Datenstrukturen:** Das Akkumulieren in verschachtelten HashMaps mittels `.fold` erfordert ein gutes Verständnis des `Entry`-APIs von Rusts `HashMap`.

### 5. Optionale Zusatz-Herausforderung
Implementiere die Textgenerierung als einen unendlichen Iterator. Der Iterator nimmt ein Startwort entgegen und generiert bei jedem Aufruf von `.next()` das wahrscheinlichste nächste Wort basierend auf gewichteten Zufallswerten (Roulette-Wheel-Selection), die ebenfalls funktional berechnet werden.

---

## Projekt 8: Funktionale Bild-Filter-Pipeline

### 1. Beschreibung der Funktionsweise
Du entwickelst eine Bildbearbeitungs-Bibliothek, bei der Bildfilter (z. B. Helligkeitsänderung, Kontrasterhöhung, Graustufen-Konvertierung, Invertierung) als Closures definiert sind. Ein Bild wird als Iterator über seine Pixel dargestellt. Mehrere Filter-Closures können zu einer einzigen Pipeline verkettet und in einem Rutsch auf das gesamte Bild angewendet werden, um unnötige Schleifendurchläufe und temporäre Bildkopien zu vermeiden.

### 2. Strukturierte Komponenten-Aufteilung
* **Pixel-Quelle:** Ein Iterator, der die Farbwerte (RGB/RGBA) der Pixel eines Bildes sequentiell liefert.
* **Filter-Pipeline:** Eine Struktur, die eine Liste von Filter-Closures (z. B. `Fn(Pixel) -> Pixel`) verwaltet.
* **Pixel-Mapper:** Eine Iterator-Kette, die die Filter-Pipeline über `.map()` auf jeden Pixel anwendet.
* **Bild-Rekonstrukteur:** Konsumiert den modifizierten Pixel-Iterator und schreibt die Pixel zurück in ein neues Bild-Objekt.

### 3. Zu verwendende Crates
* `image` (zum Laden und Speichern gängiger Bildformate wie PNG oder JPEG)

### 4. Didaktische Hinweise & Hürden
* **Zero-Cost Abstractions:** Bildverarbeitung erfordert hohe Performance. Verstehe, wie der Rust-Compiler Iterator-Ketten und Closures optimiert (Inlining) und warum dieser funktionale Ansatz oft genauso schnell ist wie handgeschriebene imperative Schleifen.
* **Änderung von Pixeln vor Ort vs. Neue Allokation:** Wenn du Pixel mutierst, musst du veränderliche Referenzen verwalten (`&mut Pixel`). Überlege, wie sich dies auf deine Closures auswirkt (z. B. `FnMut` vs. `Fn`).
* **Farbkanal-Überlauf:** Beim Verändern von Farbwerten (0–255) kommt es leicht zu Überläufen. Wie stellst du sicher, dass deine mathematischen Transformationen innerhalb der Closures sicher begrenzt werden (z. B. mit `saturating_add`)?

### 5. Optionale Zusatz-Herausforderung
Implementiere einen Faltungsfilter (Convolution Matrix), der für Operationen wie Weichzeichnen (Blur) oder Kantenerkennung (Sobel-Operator) die Nachbarpixel einbeziehen muss. Da dies nicht mehr rein punktweise geht, musst du einen Iterator entwerfen, der Zugriff auf ein gleitendes 2D-Fenster des Bildes hat.

---

## Projekt 9: Textbasierte Tabellenkalkulations-Engine

### 1. Beschreibung der Funktionsweise
Eine vereinfachte Engine für eine Tabellenkalkulation (wie Excel). Jede Zelle im zweidimensionalen Raster kann entweder einen statischen Wert (Text, Zahl) oder eine Formel enthalten. Formeln werden als Closures dargestellt, die das aktuelle Tabellengitter als Argument erhalten und einen dynamischen Wert berechnen. Die Auswertung von Zellen mit Abhängigkeiten wird über Iteratoren gesteuert.

### 2. Strukturierte Komponenten-Aufteilung
* **Grid-Speicher:** Eine zweidimensionale Struktur (z. B. `HashMap<(usize, usize), Cell>`), die die Zellen verwaltet.
* **Zell-Typen:** Ein Enum `Cell`, das entweder einen `Value(f64)` oder eine `Formula(Box<dyn Fn(&Grid) -> Result<f64, String>>)` hält.
* **Evaluator:** Eine Komponente, die bei Abfrage einer Zelle rekursiv die Formeln auswertet. Iteratoren werden genutzt, um Abhängigkeiten aufzulösen und alle geänderten Zellen nach einer Eingabe zu aktualisieren.

### 3. Zu verwendende Crates
* Keine (Standardbibliothek).

### 4. Didaktische Hinweise & Hürden
* **Zirkuläre Abhängigkeiten:** Was passiert, wenn Zelle A sich auf Zelle B bezieht und Zelle B auf Zelle A? Du musst lernen, wie du mithilfe von Iteratoren und Suchalgorithmen (z. B. Tiefensuche) Zyklen erkennst, bevor es zu einem Stack Overflow kommt.
* **Shared State und dynamic Borrow Checking:** Die Formel-Closures benötigen Zugriff auf das gesamte Grid, während dieses eventuell gerade ausgewertet wird. Dies kann zu Konflikten mit Rusts Aliasing-Regeln führen. Überlege, wie du den Lesezugriff sauber gestaltest, ohne den Compiler zu verärgern.

### 5. Optionale Zusatz-Herausforderung
Implementiere ein Caching-System: Berechnete Werte von Formel-Zellen sollen zwischengespeichert werden. Erst wenn sich eine Zelle ändert, auf die sich eine Formel bezieht (direkt oder indirekt), soll der Cache dieser Zelle als "dirty" markiert und beim nächsten Zugriff neu berechnet werden. Nutze Iteratoren, um den Abhängigkeitsbaum rückwärts zu durchlaufen.

---

## Projekt 10: Custom Collectors & Parallele Iteration

### 1. Beschreibung der Funktionsweise
In diesem fortgeschrittenen Projekt verlässt du die Standardpfade der Iterator-Nutzung. Du implementierst eine eigene, komplexe Datenstruktur (z. B. einen Prefix-Tree/Trie für Autovervollständigung oder einen gerichteten Graphen). Du schreibst einen eigenen Collector für diese Struktur, sodass sie direkt aus einer Iterator-Kette befüllt werden kann. Zudem baust du einen Wrapper für parallele Iteratoren, der Datenströme auf CPU-Threads aufteilt und verarbeitet.

### 2. Strukturierte Komponenten-Aufteilung
* **Custom Collection:** Ein selbstgebauter Datentyp (z. B. `Trie`), der effiziente Operationen auf Zeichenketten erlaubt.
* **Collector-Implementierung:** Das Implementieren des `std::iter::FromIterator`-Traits für deine Collection.
* **Parallel-Iterator-Wrapper:** Eine Struktur, die einen regulären Iterator in Teilstücke (Chunks) zerlegt, diese an Worker-Threads übergibt, dort verarbeitet und die Ergebnisse wieder zusammenführt.

### 3. Zu verwendende Crates
* Keine (für die Lerneffekte soll die Thread-Verteilung über die Standardbibliothek `std::thread` implementiert werden).

### 4. Didaktische Hinweise & Hürden
* **Das `FromIterator`-Trait:** Wie funktioniert die Schnittstelle genau? Verstehe den Unterschied zwischen `from_iter` und dem `Extend`-Trait.
* **Thread-Sicherheit bei Closures:** Wenn du Iteratoren parallel verarbeitest, werden Closures über Thread-Grenzen hinweg geschickt. Deine Closures müssen das `Send`- und `Sync`-Trait erfüllen. Lerne, welche Daten du in eine parallele Closure verschieben darfst und welche nicht.
* **Das Aufteilungs-Problem (Splitting):** Um einen Iterator parallel verarbeiten zu können, muss man ihn in Stücke schneiden. Da Iteratoren aber sequentiell sind, ist das nicht trivial. Überlege dir Strategien, wie du dieses Problem löst (z. B. durch vorheriges Sammeln in einen Vektor oder dynamisches Verteilen über Channels).

### 5. Optionale Zusatz-Herausforderung
Schreibe eine eigene Erweiterungsmethode `.parallel_map(self, num_threads, closure)` für reguläre Iteratoren, die die Berechnungen der übergebenen Closure auf die angegebene Anzahl an Threads verteilt und die Ergebnisse in der ursprünglichen Reihenfolge zurückgibt.
