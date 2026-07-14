# 100 Projekte - Iteratoren & Closures

Willkommen in Phase 8! In dieser Phase tauchen wir tief in das funktionale Herz von Rust ein. Closures (anonyme Funktionen) und Iteratoren sind fundamentale Werkzeuge, um deinen Code ausdrucksstark, sicher und extrem effizient zu machen. Durch das Beherrschen dieser Konzepte verabschiedest du dich von klassischen, fehleranfälligen Index-Schleifen und schreibst stattdessen eleganten, deklarativen Code.

Um dein Verständnis zu vertiefen, findest du hier eine Sammlung von 100 kleinen Projektideen und Übungsszenarien. Sie sind so konzipiert, dass sie ohne fortgeschrittene externe Bibliotheken gelöst werden können, und fordern dich heraus, Closures, das `Iterator`-Trait und die mächtigen Iterator-Adapter kreativ einzusetzen.

Wichtig: Es gibt hier **keine fertigen Codelösungen**! Der Sinn dieser Übungen ist es, dass du selbst ausprobiert, Fehler machst, Compiler-Meldungen entschlüsselst und eigene Lösungen entwickelst.

---

## 1. Closures-Fokus

Hier dreht sich alles um anonyme Funktionen. Du lernst, wie Closures Variablen aus ihrer Umgebung einfangen (by reference, mutable reference oder by value mit `move`), was die Unterschiede zwischen den Traits `Fn`, `FnMut` und `FnOnce` sind und wie du sie als Argumente oder Rückgabewerte nutzt.

1. **Verzögerter Logger (Lazy Logger)**: Schreibe ein Logging-System, bei dem die Formatierung des Textes in einer Closure gekapselt ist. Die Closure wird nur ausgeführt, wenn das Log-Level aktiv ist, um CPU-Zeit zu sparen.
2. **Dynamischer Rabatt-Kalkulator**: Erstelle eine Funktion, die eine `Fn`-Closure entgegennimmt, um Preise basierend auf dynamischen Faktoren (wie Steuern oder Rabatte aus der Umgebung) zu berechnen.
3. **Zustandsbehafteter Klick-Zähler**: Implementiere eine `FnMut`-Closure, die eine veränderbare Variable aus ihrer Umgebung einfängt und bei jedem Aufruf inkrementiert.
4. **Einmaliger Ressourcen-Verbraucher**: Zeige den Einsatz von `FnOnce`, indem du eine Closure schreibst, die eine nicht-kopierbare Ressource (wie ein Dateihandle) mittels `move` übernimmt und beim Aufruf schließt oder verbraucht.
5. **Generischer Event-Callback**: Baue einen Event-Manager, bei dem Benutzer Closures für bestimmte Ereignisse (z.B. Mausklicks) registrieren können, die später aufgerufen werden.
6. **Mathematische Funktions-Tabelle**: Übergib eine mathematische Gleichung als Closure an eine Auswertungsfunktion, die für einen bestimmten x-Bereich eine Wertetabelle ausgibt.
7. **Thread-sicherer Job-Wrapper**: Kapsle eine Aufgabe in eine `move`-Closure, die alle benötigten Daten besitzt, damit sie sicher an einen Hintergrund-Thread übergeben werden kann.
8. **Memoisation-Cache**: Erstelle eine Struktur, die eine rechenintensive Closure und deren Ergebnis speichert. Bei erneutem Aufruf wird das Ergebnis direkt aus dem Cache geliefert.
9. **Benutzerdefinierter Kontrollfluss**: Schreibe eine Kontrollfluss-Funktion, die eine Bedingung prüft und je nach Ausgang eine `true_branch`- oder eine `false_branch`-Closure ausführt.
10. **Sortier-Kriterium-Konfigurator**: Verwende eine Closure als Vergleichsfunktion in einer Sortierfunktion, um eine Liste von Objekten nach dynamisch auswählbaren Feldern zu ordnen.
11. **Flexibler Text-Formatierer**: Implementiere eine Funktion, die Text verarbeitet und für jedes Wort eine übergebene Formatierungs-Closure aufruft (z.B. für Zensur oder Großschreibung).
12. **Zustandsautomat mit FnMut**: Simuliere einen Spielcharakter, dessen Bewegung durch eine `FnMut`-Closure gesteuert wird, die seine internen Koordinaten bei jedem Aufruf anpasst.
13. **Konfigurations-Fallback**: Nutze eine Closure, die nur dann aufgerufen wird, wenn ein Konfigurationswert in einer `Option` fehlt, um den Standardwert erst bei Bedarf (lazy) zu berechnen.
14. **Sicheres Ressourcen-Handling (Scope Guard)**: Baue eine Funktion, die eine Datei öffnet, eine Closure darauf ausführt und garantiert, dass die Datei danach geschlossen wird, selbst wenn ein Fehler auftritt.
15. **Verzeichnis-Filter mit dynamischem Muster**: Entwickle einen Dateifilter, der eine Closure nutzt, um Pfade anhand von Mustern zu überprüfen, die erst zur Laufzeit eingegeben werden.
16. **Fortschritts-Callback**: Implementiere einen Kopierdienst, der in regelmäßigen Abständen eine benutzerdefinierte Closure aufruft, um den aktuellen Fortschritt an die UI zu melden.
17. **Validierungs-Pipeline**: Erstelle ein System, das Eingaben durch eine Reihe von Validierungs-Closures schleust, um sicherzustellen, dass alle Regeln eingehalten werden.
18. **Zufallszahlengenerator mit Zustand**: Kapsle den Zustand eines mathematischen Zufallsgenerators in einer `FnMut`-Closure, die bei jedem Aufruf den Zustand aktualisiert und die neue Zahl liefert.
19. **Currying-Simulation**: Schreibe eine Funktion, die ein Argument nimmt und eine Closure zurückgibt, welche wiederum das zweite Argument erwartet und die eigentliche Berechnung durchführt.
20. **Fehler-Mapper**: Nutze eine Closure in der Methode `.map_err()`, um rohe Systemfehler in ein anwendungsfreundliches Fehlerformat zu übersetzen und mit Kontext zu versehen.

---

## 2. Eigene Iteratoren

Hier programmierst du deine eigenen Datentypen, die das `Iterator`-Trait implementieren. Du lernst, wie du `next()` definierst, den internen Zustand deines Iterators verwaltest und optionale Hilfs-Traits wie `DoubleEndedIterator` oder `ExactSizeIterator` umsetzt.

21. **Fibonacci-Iterator**: Implementiere einen Iterator für eine Struktur, die fortlaufend die nächste Zahl der Fibonacci-Folge berechnet, ohne jemals zu stoppen.
22. **Bereichs-Iterator mit Schrittweite**: Baue einen Iterator, der einen Zahlenbereich von Start bis Ende mit einer frei wählbaren Schrittweite (z.B. in 0.5er-Schritten) durchläuft.
23. **Custom String-Splitter**: Erstelle einen eigenen Iterator, der eine Zeichenkette anhand eines bestimmten Trennzeichens in Teil-Strings zerlegt, ohne Standard-Methoden zu nutzen.
24. **Endloser Zufalls-Stream**: Implementiere einen unendlichen Iterator, der bei jedem Aufruf von `next()` eine neue Zufallszahl innerhalb eines definierten Bereichs generiert.
25. **Grid-Traversierer**: Entwickle einen Iterator für eine zweidimensionale Matrix, der die Elemente wahlweise zeilenweise oder spaltenweise durchläuft.
26. **Beidseitiger Queue-Iterator**: Implementiere `DoubleEndedIterator` für eine eigene Liste, sodass Elemente sowohl vom Anfang als auch vom Ende her entnommen werden können.
27. **Zirkulärer Puffer-Iterator**: Baue einen Iterator für einen Ringpuffer, der nach Erreichen des letzten Elements wieder von vorne beginnt und unendlich weiterläuft.
28. **Dateizeilen-Streaming**: Schreibe einen Iterator, der eine Textdatei zeilenweise liest. Er lädt immer nur die aktuelle Zeile in den Speicher, um Ressourcen zu sparen.
29. **Primzahl-Iterator (Sieb)**: Implementiere einen Iterator, der nach dem Prinzip des Sieb des Eratosthenes arbeitet und nacheinander alle Primzahlen liefert.
30. **Rückwärts-Iterator für verkettete Listen**: Entwickle einen Iterator, der sich von hinten nach vorne durch eine einfach verkettete Liste arbeitet.
31. **Custom Chunk-Iterator**: Schreibe einen Iterator, der eine Kollektion in feste Stücke (Chunks) einer bestimmten Größe aufteilt und diese als Slices zurückgibt.
32. **DNA-Basen-Transkriptor**: Implementiere einen Iterator, der einen Strom von DNA-Nukleotiden (A, T, C, G) liest und sie direkt beim Iterieren in RNA-Gegenstücke übersetzt.
33. **Run-Length-Decoder**: Erstelle einen Iterator, der Lauflängencodierte Sequenzen (z.B. `(4, 'B')`) wieder in eine Folge einzelner Zeichen (`'B', 'B', 'B', 'B'`) entpackt.
34. **Historien-Fenster (Windowed Iterator)**: Baue einen Iterator, der bei jedem Schritt ein gleitendes Fenster der letzten n Elemente einer Sequenz liefert.
35. **Kombinations-Iterator**: Implementiere einen Iterator, der aus einer Liste von Elementen alle möglichen Paarkombinationen erzeugt.
36. **Interleaved Iterator**: Mische zwei unterschiedliche Iteratoren abwechselnd zusammen (z.B. liefert er abwechselnd ein Element aus Iterator A und eines aus Iterator B).
37. **CSV-Parser-Iterator**: Entwickle einen Iterator, der rohe Textzeilen einliest, sie als CSV parst und bei Fehlern in einer Zeile diese überspringt, aber intern protokolliert.
38. **Dateisystem-Tiefensuche (DFS)**: Implementiere einen Iterator, der ausgehend von einem Startverzeichnis alle Unterverzeichnisse und Dateien tiefenorientiert durchläuft.
39. **Fortschritts-Iterator (ExactSize)**: Baue einen Iterator, der `ExactSizeIterator` implementiert, damit eine äußere Schleife vorab weiß, wie viele Schritte verbleiben, und eine Fortschrittsanzeige rendern kann.
40. **Zyklischer Wochentags-Iterator**: Erstelle einen Iterator, der die Wochentage von Montag bis Sonntag unendlich oft wiederholt.

---

## 3. Iterator-Ketten & Adapter

Hier lernst du die mächtige funktionale Pipeline von Rust kennen. Du kombinierst Standard-Methoden wie `map`, `filter`, `fold`, `scan`, `zip`, `flatten` und `collect`, um komplexe Datenumwandlungen kurz, lesbar und hocheffizient in einer einzigen Kette zu formulieren.

41. **Zahlen-Filter & Quadrierer**: Nimm eine Liste von Zahlen, filtere alle geraden Werte heraus und quadriere die verbleibenden ungeraden Zahlen in einer Kette.
42. **Gesamtwortlängen-Rechner**: Berechne die Summe der Längen aller Wörter in einem gegebenen Satz, indem du Wörter splittest, deren Längen ermittelst und sie aufsummierst.
43. **E-Mail-Domänen-Filter**: Filtere eine Liste von E-Mail-Adressen, extrahiere die Domänennamen und sammle nur die eindeutigen Werte in einem `HashSet`.
44. **Gleitender Durchschnitt mit Scan**: Berechne den gleitenden Durchschnitt einer Sensor-Messreihe, indem du mit `.scan()` den Zustand der letzten Messungen mitführst.
45. **Wörter-Partitionierung**: Teile eine Liste von Begriffen mit `.partition()` in zwei getrennte Vektoren auf: einen für Wörter, die mit einem Vokal beginnen, und einen für den Rest.
46. **Indexbasierte Suche**: Durchsuche eine Liste von Elementen, finde das erste Element, das ein Kriterium erfüllt, und gib dessen Index mithilfe von `.enumerate()` und `.find()` zurück.
47. **Verschachteltes JSON-Flattening**: Nutze `.flat_map()`, um verschachtelte Arrays in einer Datenstruktur zu einer flachen Liste zu reduzieren und ungültige Einträge direkt auszufiltern.
48. **Debugging-Pipeline mit Inspect**: Füge an verschiedenen Stellen einer komplexen Iterator-Kette `.inspect()` ein, um Zwischenschritte auf der Konsole auszugeben, ohne den Datenfluss zu stören.
49. **Wort-Häufigkeits-Zähler**: Analysiere ein Textdokument, indem du es in Wörter zerlegst und diese mit `.fold()` in eine Häufigkeits-Tabelle (`HashMap`) einträgst.
50. **ID-Namens-Verknüpfung (Zip)**: Verbinde eine Sequenz von numerischen IDs und eine Sequenz von Namen mit `.zip()` zu einer Liste von Tupeln.
51. **Paginierte Dateiliste**: Verkette mehrere Verzeichnislisten mit `.chain()`, überspringe die ersten n Einträge mit `.skip()` und nimm die nächsten m Einträge mit `.take()`.
52. **Messdaten-Abbruchbedingung**: Lies Datenpunkte ein, solange sie sich im normalen Bereich befinden, indem du `.take_while()` nutzt, um die Verarbeitung beim ersten Ausreißer zu stoppen.
53. **Status-Check (All/Any)**: Prüfe mit `.all()`, ob alle Verbindungen aktiv sind, und mit `.any()`, ob mindestens eine Verbindung einen kritischen Fehlerzustand aufweist.
54. **Komplexer Maximum-Finder**: Finde in einer Liste von Strukturen das Element mit dem höchsten berechneten Wert, indem du eine Vergleichs-Closure an `.max_by()` übergibst.
55. **Vektor-Flattener**: Konvertiere einen zweifach verschachtelten Vektor (`Vec<Vec<T>>`) mit `.flatten()` in einen einfachen flachen Vektor (`Vec<T>`).
56. **Bedingtes Fold (Reduce)**: Berechne das Produkt aller Zahlen in einem Vektor mit `.reduce()` und fange den Fall ab, dass die Liste leer ist.
57. **String-Konkatenation ohne Alloc**: Verbinde eine Liste von Wörtern mit einem Trennzeichen, indem du `.fold()` verwendest, um den Zielstring direkt zu befüllen und unnötige Zwischen-Vektoren zu vermeiden.
58. **Gleitende Fenster (Windows)**: Analysiere Kursschwankungen einer Aktie, indem du mit `.windows(2)` aufeinanderfolgende Wertepaare vergleichst.
59. **Batch-Verarbeiter (Chunks)**: Verarbeite eine große Liste von Datensätzen in festen Paketen (z. B. immer 10 Stück) mit `.chunks()`, um sie paketweise an eine Datenbank zu senden.
60. **Ergebnis-Filterung (Ok-Werte extrahieren)**: Filtere aus einer Liste von `Result`-Werten alle Fehler heraus und sammle nur die erfolgreichen Werte mithilfe von `.filter_map()`.

---

## 4. Kombinations-Projekte

In diesen Projekten verbindest du die gelernten Konzepte. Du nutzt Closures, um das Verhalten von Iterator-Ketten dynamisch zu steuern, und baust kleine, in sich geschlossene Werkzeuge, die Daten einlesen, transformieren und formatiert ausgeben.

61. **Text-Balkendiagramm**: Generiere ein einfaches Balkendiagramm auf der Konsole, indem du Eingabewerte über einen Iterator in Zeilen aus Sternchen (`*`) transformierst.
62. **Umgebungsdaten-Parser (.env)**: Lese eine Konfigurationsdatei ein, filtere Leerzeilen und Kommentare heraus und sammle die Schlüssel-Wert-Paare über Iteratoren in einer Map.
63. **Markdown-TOC-Builder**: Durchsuche eine Markdown-Datei nach Überschriften (Zeilen, die mit `#` starten) und erstelle daraus ein strukturiertes Inhaltsverzeichnis.
64. **Zeilenumbruch-Formatierer**: Implementiere einen Algorithmus, der Text-Token über einen Iterator einliest und sie so gruppiert, dass keine Zeile eine maximale Zeichenanzahl überschreitet.
65. **CSV-Spalten-Extraktor**: Lese eine CSV-Datei und filtere bestimmte Spalten heraus, indem du Zeilen iterativ splittest, die gewünschten Indizes auswählst und neu zusammensetzt.
66. **Caesar-Verschlüsselung**: Verschlüssele eine Zeichenkette, indem du ihre Zeichen als Iterator durchläufst, sie mit einer Verschiebe-Closure manipulierst und wieder als String sammelst.
67. **Log-Analysator**: Filtere Server-Logs nach Fehlerklassen und Zeiträumen und berechne die durchschnittliche Antwortzeit fehlerhafter Anfragen mittels Iterator-Ketten.
68. **Passwort-Validator**: Schreibe ein Validierungsprogramm, das prüft, ob ein Passwort alle Sicherheitsregeln erfüllt, indem es verschiedene Zeichen-Iteratoren und Such-Prüfungen kombiniert.
69. **Matrix-Transposition**: Transponiere eine zweidimensionale Matrix, indem du Iteratoren über Zeilen und Spalten verwickelst und die Werte in einer neuen Struktur sammelst.
70. **Spielkartendeck-Ersteller**: Generiere ein komplettes Set aus 52 Spielkarten, indem du Kartenfarben und Kartenwerte über `.flat_map()` miteinander kreuzt.
71. **Run-Length-Encoder (RLE)**: Komprimiere eine Zeichenkette, indem du aufeinanderfolgende, gleiche Zeichen zählst und diese als Sequenz von Häufigkeits-Tupeln ausgibst.
72. **Subnetz-IP-Generator**: Generiere alle gültigen IP-Adressen innerhalb einer CIDR-Block-Notierung (z.B. `/24`) unter Verwendung eines eigens dafür gebauten Iterators.
73. **Pfad-Normalisierer**: Zerlege einen Dateipfad in seine Segmente und verarbeite sie mit `.fold()`, um relative Pfade (mit `.` und `..`) zu bereinigen.
74. **Anagramm-Prüfer**: Finde heraus, ob zwei Wörter Anagramme sind, indem du ihre Zeichen-Iteratoren sortierst und die Ergebnisse direkt auf Gleichheit prüfst.
75. **SQL-Select-Builder**: Erstelle ein Programm, das aus einer Liste von Spalten, einer Tabelle und Bedingungen über Iterator-Verkettungen eine korrekte SQL-Abfrage generiert.
76. **Messwert-Glättung**: Reduziere Rauschen in einer Messreihe, indem du über gleitende Fenster iterierst und das arithmetische Mittel der Nachbarwerte berechnest.
77. **HTML-Tag-Entferner**: Befreie einen Text von HTML-Tags, indem du den Zeichenstrom filterst und den Zustand (ob man sich innerhalb eines Tags befindet) in einer scan-artigen Closure mitführst.
78. **Template-Engine**: Ersetze Platzhalter (wie `{{user}}`) in einem Vorlagentext durch Werte aus einer Map, indem du den Text zerlegst, mappst und wieder zusammensetzt.
79. **Rechnungs-Kalkulator**: Berechne den Gesamtwert eines Einkaufs, filtere ungültige Artikel aus, wende Steuersätze und prozentuale Rabatte an und summiere das Endergebnis.
80. **Bibliotheks-Katalog-Suche**: Implementiere eine Suche, die Bücher filtert, indem sie eine Liste von Suchbegriffen mit `.all()` gegen Titel und Autor abgleicht.

---

## 5. Fortgeschrittene Algorithmen & FP-Muster

Hier betrittst du die Welt der funktionalen Entwurfsmuster. Du lernst, wie du verzögerte Auswertung (Lazy Evaluation) nutzt, Parser-Kombinatoren schreibst, unendliche Datenströme verarbeitest und fortgeschrittene funktionale Konzepte wie partielle Applikation oder zustandsbehaftete Pipelines in Rust nachbildest.

81. **Unendlicher Primzahlgenerator**: Schreibe einen Iterator, der endlos Primzahlen generiert, wobei die nächste Zahl erst dann berechnet wird, wenn die Schleife danach verlangt.
82. **Fehler-Verkettung mit Monaden-Mustern**: Verarbeite verästelte, optionale API-Antworten mit `.and_then()`, `.map_or()` und `.or_else()`, um Kontrollstrukturen flach und lesbar zu halten.
83. **Einfacher Parser-Kombinator**: Definiere Parser als Closures, die Text analysieren und sich mit anderen Parser-Closures (z.B. für "und dann" oder "oder") flexibel verbinden lassen.
84. **Echtzeit-Stream-Aggregator**: Berechne aus einem unendlichen Datenstrom kontinuierlich die Top-10-Elemente, indem du einen Iterator schreibst, der den Zustand in einem Min-Heap verwaltet.
85. **Lazy JSON-Pfad-Evaluator**: Navigiere durch eine Baumstruktur. Die Pfadsegmente werden erst evaluiert und gesucht, wenn der Endbenutzer den Wert tatsächlich anfordert.
86. **N-Damen-Problem als Iterator**: Löse das N-Damen-Schachproblem, indem du den Suchbaum als Iterator modellierst, der bei jedem `next()`-Aufruf die nächste gültige Brettkonstellation liefert.
87. **State-Monaden-Simulator**: Schreibe Funktionen, die einen Zustand annehmen und eine Closure zurückgeben, welche den neuen Zustand und einen Ausgabewert berechnet.
88. **Custom Zip-With-Adapter**: Implementiere einen Iterator-Adapter `zip_with(self, other, closure)`, der zwei Iteratoren verbindet und ihre Elemente sofort mit der übergebenen Closure transformiert.
89. **Binärbaum-Traversierer**: Implementiere die Pre-Order-, In-Order- und Post-Order-Traversierung eines Baums als Lazy Iteratoren, ohne die Knoten vorab in einen Vektor zu kopieren.
90. **Collatz-Folgen-Iterator**: Generiere die mathematische Collatz-Folge für eine Zahl als Iterator und finde über Ketten heraus, welche Zahl im Bereich bis 1000 die längste Kette erzeugt.
91. **Curried Logger**: Baue ein Protokollierungssystem, das durch den schrittweisen Aufruf von Closures konfiguriert wird (z. B. `log(Level)(Module)(Message)`).
92. **Funktionale Funktionskomposition**: Schreibe eine Utility-Funktion, die zwei Closures `f(x)` und `g(x)` entgegennimmt und eine neue Closure erzeugt, die `g(f(x))` berechnet.
93. **Lazy Matrix-Transposition (Zero-Copy)**: Erstelle eine Matrix-Struktur, bei der die Transposition keine Daten kopiert, sondern nur die Index-Berechnung im Iterator anpasst.
94. **Ressourceneffizienter Stream-Join**: Führe zwei sortierte Iteratoren in einem einzigen Durchlauf (O(N) Zeitkomplexität) zu einem einzigen, sortierten Iterator zusammen.
95. **Partielle Applikation**: Simuliere die teilweise Übergabe von Funktionsargumenten, indem du eine Funktion schreibst, die eine Closure mit vordefinierten Parametern zurückgibt.
96. **Lazy Stream-Chiffre**: Verschlüssele Dateien Byte für Byte im Lesefluss, indem du den Dateistream-Iterator mit einem pseudozufälligen Schlüssel-Iterator verknüpfst.
97. **Funktionale Runden-Simulation**: Modelliere den Ablauf eines rundenbasierten Spiels als unendliche Iterator-Kette, bei der jeder Schritt den Spielzustand transformiert.
98. **Fehlertoleranter Flatten-Adapter**: Schreibe einen Iterator-Adapter, der verschachtelte Collections flachklopft, aber bei Auftreten des ersten Fehlers (z. B. ein `Err`) sofort abbricht.
99. **Lazy-Regex-Matcher**: Implementiere einen einfachen Zeichenmuster-Prüfer, der den Abgleich Schritt für Schritt über verknüpfte Iterator-Adapter vornimmt.
100. **Map-Reduce-Simulator**: Baue ein System, das Eingabedaten über Iteratoren aufgeteilt, durch Transformations-Closures leitet (Map) und sie anschließend funktional zusammenfasst (Reduce).
