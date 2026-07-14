# 100 Projekte - Makros & Metaprogrammierung

Hier ist eine Sammlung von Projektideen, die speziell darauf ausgelegt sind, dein Verständnis von Codegenerierung und AST-Manipulation in Rust zu schärfen. Diese Szenarien helfen dir dabei, die Funktionsweise von deklarativen und prozeduralen Makros zu durchdringen.

> [!IMPORTANT]
> Arbeite diese Projekte Schritt für Schritt durch. Versuche stets zu verstehen, warum ein Makro an der jeweiligen Stelle sinnvoll ist, wie es den Code vereinfacht und wo die Grenzen der Metaprogrammierung liegen. Bedenke, dass guter Rust-Code oft auch ohne Makros auskommt, sie aber bei richtiger Anwendung extrem mächtig sind.

---

## Teil 1: Deklarative Makros (Mustervergleich)

In diesem Abschnitt lernst du die Grundlagen von `macro_rules!`. Du übst den Mustervergleich mit verschiedenen Fragment-Spezifikationen (Designatoren) wie `expr`, `ident`, `ty` oder `path`.

1. **Einfaches Logging-Makro**: Übergib dem Makro einen Wert. Es soll den Typ, den Dateinamen und die Zeilennummer ausgeben und den Wert unverändert zurückliefern, um das Debuggen zu erleichtern.
2. **Mathematische Quadrierung**: Erstelle ein Makro, das einen mathematischen Ausdruck nimmt und ihn quadriert. Achte darauf, dass der Ausdruck im AST nur einmal ausgewertet wird, um Seiteneffekte zu vermeiden.
3. **Typ-Alias-Generator**: Definiere ein Makro, das einen Namen und einen bestehenden Typ entgegennimmt und einen neuen Typ-Alias anlegt, um lesbareren Code zu schreiben.
4. **Conditional-Compilation-Helper**: Schreibe ein Makro, das abhängig von einem Debug-Flag bestimmte Codeblöcke ein- oder ausschließt. So kannst du Testcode elegant vom Produktionscode trennen.
5. **Standardwert-Zuweiser**: Baue ein Makro, das eine `Option` auf `Some` prüft und bei `None` einen benutzerdefinierten Ausweichwert zurückgibt. Dies simuliert ein kompaktes Pattern Matching ohne `unwrap_or`.
6. **Einfache JSON-Struktur**: Erstelle ein Makro, das syntaktisch wie ein JSON-Objekt aufgebaut ist. Es soll diese Struktur in eine einfache Schlüssel-Wert-Map konvertieren.
7. **HTML-Tag-Wrapper**: Entwickle ein Makro, das einen HTML-Tag-Namen und einen Textinhalt als Bezeichner nimmt. Es generiert daraus einen korrekt formatierten HTML-String.
8. **Automatischer Getter**: Schreibe ein Makro, das für ein Struct und ein Feld eine Getter-Methode generiert. Der Feldname wird dabei als Bezeichner übergeben, um Boilerplate-Code zu reduzieren.
9. **Infix-zu-Postfix-Rechner**: Entwirf ein Makro, das mathematische Ausdrücke in Infix-Notation (z. B. `3 + 4`) liest und sie in eine Postfix-Reihenfolge bringt. Das hilft dir, die Funktionsweise des Compilers beim Parsen zu verstehen.
10. **Typ-Überprüfer**: Implementiere ein Makro, das zur Compilezeit prüft, ob zwei Typen exakt übereinstimmen. Wenn nicht, soll die Kompilierung mit einer Fehlermeldung abgebrochen werden.
11. **Einfacher Singleton-Generator**: Erstelle ein Makro, das eine statische Variable sicher und träge initialisiert. Es kapselt den unsicheren Zugriff ab und stellt eine sichere Schnittstelle bereit.
12. **Zustands-Prüfer**: Schreibe ein Makro, das ein Enum und eine Variante entgegennimmt und prüft, ob die Instanz dieser Variante entspricht. Es liefert einen booleschen Wert zurück und ähnelt der Funktionsweise von `matches!`.
13. **Konstanten-Definierer**: Baue ein Makro, dem du eine Liste von Bezeichnern und Werten übergibst. Es deklariert diese automatisch als öffentliche Konstanten vom Typ `usize`.
14. **Sicheres Array-Lookup**: Entwirf ein Makro, das ein Array und einen Index entgegennimmt. Es gibt ein `Option` zurück, um Laufzeit-Panics durch ungültige Indizes zu verhindern.
15. **SQL-Query-String-Validierung**: Schreibe ein Makro, das prüft, ob ein übergebener String mit dem Wort `SELECT` oder `INSERT` beginnt. Es validiert die SQL-Grundstruktur bereits zur Compilezeit.
16. **Struktur-Kopierer**: Erstelle ein Makro, das Felder mit identischen Namen aus einer Quellstruktur in eine Zielstruktur kopiert. Das spart manuelle Zuweisungen bei DTO-Konvertierungen.
17. **Codeblock-Zeitmessung**: Entwickle ein Makro, das einen beliebigen Rust-Codeblock umschließt. Es misst die Ausführungszeit des Blocks und gibt sie formatiert aus.
18. **Assert mit Zusatznachricht**: Schreibe ein eigenes `assert`-Makro, das im Fehlerfall nicht nur fehlschlägt, sondern auch den genauen Code-Ausdruck und einen benutzerdefinierten Kontext ausgibt.
19. **Schnelle Enum-Erstellung**: Baue ein Makro, dem du einen Enum-Namen und eine Reihe von Varianten übergibst. Es generiert daraus die vollständige Enum-Definition im Code.
20. **Umgebungsvariablen-Checker**: Erstelle ein Makro, das prüft, ob eine bestimmte Umgebungsvariable während des Kompilierens existiert. Ist dies nicht der Fall, bricht der Compiler mit einer klaren Meldung ab.

---

## Teil 2: Deklarative Makros (Wiederholungen & Listen)

Hier lernst du die Wiederholungs-Operatoren `*`, `+` und `?` in `macro_rules!` kennen. Du übst das Verarbeiten von beliebig langen Listen, rekursiven Strukturen und komplexeren Token-Abfolgen.

21. **Vektor-Builder mit Multiplikator**: Entwickle ein Makro, das ähnlich wie `vec!` arbeitet, aber eine Syntax wie `[wert; anzahl]` nutzt, um Elemente mehrfach in eine dynamische Liste einzufügen.
22. **Map-Literal-Generator**: Schreibe ein Makro, das eine Liste von `Key => Value` Paaren entgegennimmt. Es erzeugt daraus eine fertig befüllte `HashMap` mit den entsprechenden Einträgen.
23. **Verschachtelter HTML-Builder**: Erstelle ein Makro, das eine verschachtelte Struktur aus XML-Tags parst. Es wandelt diese in einen zusammenhängenden, korrekt eingerückten HTML-String um.
24. **Mehrfach-Implementierung von Traits**: Implementiere ein Makro, das ein bestimmtes Trait für eine Liste von primitiven Datentypen (z. B. `i32`, `i64`, `f32`) auf einmal implementiert. Das spart redundanten Code für numerische Typen.
25. **Batch-Funktionsaufrufer**: Baue ein Makro, das eine Liste von Funktionen und ein einzelnes Argument entgegennimmt. Es ruft alle diese Funktionen nacheinander mit dem übergebenen Argument auf.
26. **Automatischer Builder-Pattern-Generator**: Entwirf ein Makro, dem du eine Liste von Feldern übergibst. Es generiert daraus eine Builder-Struktur mit den passenden Setter-Methoden für dein Struct.
27. **Zahlen-Reihenfolge-Generator**: Schreibe ein Makro, das eine beliebige Anzahl von Zahlen entgegennimmt und daraus zur Compilezeit ein sortiertes statisches Array generiert.
28. **String-Verkettungs-Makro**: Erstelle ein Makro, das eine variable Anzahl von Argumenten unterschiedlicher Typen entgegennimmt. Es formatiert und verkettet diese effizient zu einem einzigen `String`.
29. **Mehrfach-Zuweisung**: Entwickle ein Makro, mit dem du mehreren Variablen gleichzeitig denselben Wert zuweisen kannst, wie zum Beispiel `a, b, c = 10`.
30. **Rekursiver Listen-Parser**: Baue ein Makro, das eine Liste von Ausdrücken rekursiv verarbeitet, um beispielsweise eine geschachtelte mathematische Baumstruktur aufzubauen.
31. **CSV-Zeilen-Parser**: Schreibe ein Makro, das eine Liste von kommaseparierten Werten parst und diese direkt in die Felder einer Datenstruktur überführt.
32. **Trait-Delegation**: Erstelle ein Makro, das alle Methoden eines Traits für ein Struct implementiert, indem es die Aufrufe an ein definiertes inneres Feld weiterleitet.
33. **Batch-Test-Generator**: Entwickle ein Makro, das aus einer Liste von Testnamen und Testdaten automatisch eigenständige Testfunktionen für dein Test-Framework generiert.
34. **Konfigurations-Parser**: Baue ein Makro, das eine Liste von Konfigurationsschlüsseln und Standardwerten einliest und ein statisches Konfigurationsobjekt erzeugt.
35. **Kompaktes Error-Handling**: Schreibe ein Makro, das aus einer Liste von Fehlernamen und Beschreibungen automatisch ein Enum und die zugehörige `Display`-Implementierung generiert.
36. **Batch-Veränderung**: Erstelle ein Makro, dem du eine Liste von Variablen übergibst, um auf alle dieselbe mathematische Operation (z. B. Inkrementieren) anzuwenden.
37. **Strukturierte Tabellen-Ausgabe**: Entwickle ein Makro, das Spaltenüberschriften und Datenzeilen entgegennimmt und diese als sauber ausgerichtete Texttabelle auf der Konsole ausgibt.
38. **Bit-Flag-Generator**: Schreibe ein Makro, das eine Liste von Flag-Namen nimmt und daraus ein Struct mit bitweisen Konstanten (1, 2, 4, 8, ...) generiert.
39. **Typen-Konvertierer**: Baue ein Makro, das eine Liste von Variablen unterschiedlicher Typen nimmt und diese alle in einen Zieltyp wie `f64` castet.
40. **Rekursives Muster-Matching**: Entwirf ein Makro, das tiefe und verschachtelte Mustervergleiche für Baumstrukturen vereinfacht, indem es die Pfade flach klopft.

---

## Teil 3: Custom Derive Prozedurale Makros

Prozedurale Makros manipulieren den Token-Stream direkt. Hier erstellst du eigene `#[derive(...)]`-Makros, liest Struct- und Enum-Strukturen mit Bibliotheken wie `syn` ein und generierst Code mit `quote`.

41. **Derive Describe**: Implementiere ein prozedurales Makro, das für ein Struct ein `Describe`-Trait implementiert. Dieses gibt den Namen des Structs sowie die Namen und Typen aller Felder aus.
42. **Derive JsonSerializable**: Schreibe ein Makro, das automatisch eine Methode zum Konvertieren eines Structs in ein valides JSON-Format generiert.
43. **Derive Validate**: Baue ein Makro, das Struct-Felder anhand von Attributen wie `#[validate(min = 10)]` analysiert und eine Methode zur Validierung der Daten generiert.
44. **Derive DatabaseTable**: Erstelle ein Makro, das den Struct-Namen als Tabellennamen und die Felder als Spalten interpretiert, um automatisch SQL-Insert-Statements zu erzeugen.
45. **Derive DefaultZero**: Entwickle ein Makro, das das `Default`-Trait so implementiert, dass numerische Felder mit Null und Strings mit einem leeren Wert initialisiert werden.
46. **Derive CloneFields**: Schreibe ein Makro, das eine Klon-Methode generiert, welche nur bestimmte mit `#[clone]` markierte Felder kopiert und andere auf Standardwerte setzt.
47. **Derive Mockable**: Baue ein Makro, das für ein Struct oder ein Trait automatisch eine Mock-Struktur generiert, um Unit-Tests zu vereinfachen.
48. **Derive FromRow**: Erstelle ein Makro, das es ermöglicht, ein Struct direkt aus einer Zeile einer SQL-Datenbankabfrage oder einer Key-Value-Map zu instanziieren.
49. **Derive Invert**: Entwickle ein Makro für Enums mit zwei Zuständen, das eine Methode generiert, um den aktuellen Zustand in sein Gegenteil umzukehren.
50. **Derive DeepSizeOf**: Schreibe ein Makro, das den exakten Speicherbedarf eines Structs berechnet, indem es auch dynamisch allozierte Heap-Daten rekursiv erfasst.
51. **Derive Configuration**: Baue ein Makro, das ein Struct mit einer Methode ausstattet, um seine Felder automatisch aus Umgebungsvariablen zu befüllen.
52. **Derive Diff**: Erstelle ein Makro, das zwei Instanzen desselben Structs vergleicht und ein Objekt mit allen Feldänderungen zurückgibt.
53. **Derive AutoForm**: Entwickle ein Makro, das aus den Felatern eines Structs Metadaten für Benutzeroberflächen generiert, um Eingabeformulare automatisch zu erstellen.
54. **Derive ToMap**: Schreibe ein Makro, das ein Struct in eine `HashMap<String, String>` konvertiert, wobei Feldnamen zu Schlüsseln und Werte zu Strings werden.
55. **Derive CommandLineArgs**: Baue ein Makro, das Struct-Felder in Kommandozeilen-Argumente übersetzt und eine Parser-Funktion bereitstellt.
56. **Derive Encryptable**: Erstelle ein Makro, das Felder mit dem Attribut `#[encrypt]` vor dem Serialisieren oder Speichern automatisch verschlüsselt.
57. **Derive Randomizable**: Entwickle ein Makro, das eine Methode zur Generierung einer Instanz mit zufälligen Testdaten für alle Felder bereitstellt.
58. **Derive GraphQLObject**: Schreibe ein Makro, das die notwendigen Schema- und Resolver-Typen generiert, um ein Struct in einer GraphQL-API zu registrieren.
59. **Derive CSVRecord**: Baue ein Makro, das ein Struct für das Lesen und Schreiben in CSV-Dateien vorbereitet, indem es die Zeilen-Konvertierung automatisiert.
60. **Derive StateMachine**: Erstelle ein Makro für Enums, das Zustandsübergänge validiert und Methoden zur sicheren Zustandsänderung generiert.

---

## Teil 4: Attribut- & Funktions-Makros

In diesem Abschnitt erstellst du Makros, die als Attribute (`#[attr]`) direkt auf Funktionen, Strukturen oder Module gesetzt werden, sowie freie Funktions-Makros, die wie Funktionsaufrufe aufgerufen werden.

61. **Memoize-Attribut**: Schreibe ein Attribut-Makro `#[memoize]`, das die Ergebnisse einer Funktion cached, um wiederholte Berechnungen mit gleichen Argumenten zu beschleunigen.
62. **Deprecated-Warning-Attribut**: Entwickle ein Makro, das beim Kompilieren eine benutzerdefinierte Warnung ausgibt, wenn eine bestimmte Funktion im Code aufgerufen wird.
63. **Route-Attribut**: Baue ein Makro wie `#[route(GET, "/users")]`, das Web-Endpunkte registriert und die Funktion in ein HTTP-Routing-System einbindet.
64. **Timeout-Attribut**: Erstelle ein Makro `#[timeout(5)]`, das eine Funktion so umschreibt, dass sie abgebrochen wird, wenn die Ausführung länger als die angegebene Zeit dauert.
65. **MeasurePerformance-Attribut**: Entwickle ein Makro, das die Laufzeit einer Funktion misst und die Ergebnisse automatisch an ein Monitoring- oder Logging-System sendet.
66. **Trace-Calls-Attribut**: Schreibe ein Makro, das beim Betreten und Verlassen einer Funktion Log-Nachrichten mit den Argumenten und dem Rückgabewert schreibt.
67. **Retry-Attribut**: Baue ein Makro `#[retry(3)]`, das eine Funktion, die ein `Result` zurückgibt, im Fehlerfall automatisch bis zu dreimal neu ausführt.
68. **ThreadSafe-Attribut**: Erstelle ein Makro, das eine Funktion so umschreibt, dass sie intern einen Mutex sperrt, um Thread-Sicherheit bei jedem Aufruf zu garantieren.
69. **Singleton-Attribut**: Entwickle ein Attribut für Structs, das sicherstellt, dass zur Laufzeit nur eine einzige globale Instanz dieses Typs existieren kann.
70. **FormatCheck-Funktionsmakro**: Schreibe ein Makro, das zur Compilezeit die Syntax eines speziellen String-Formats (wie E-Mail oder IP-Adresse) validiert.
71. **Inject-Attribut**: Baue ein Makro, das Abhängigkeiten in die Argumente einer Funktion injiziert, indem es diese aus einem globalen Container auflöst.
72. **Transactional-Attribut**: Erstelle ein Makro, das eine Datenbank-Transaktion vor Ausführung der Funktion startet und bei Fehlern einen Rollback durchführt.
73. **HideImplementation-Attribut**: Entwickle ein Makro, das den tatsächlichen Funktionscode im generierten Dokumentations-Output von Rustdoc versteckt.
74. **InlineAssembly-Helper**: Schreibe ein Funktions-Makro, das plattformspezifischen Assembler-Code parst und in das Binärdokument einbettet.
75. **CompileTimeMath-Funktionsmakro**: Baue ein Makro, das mathematische Ausdrücke parst und das Ergebnis direkt als Konstante in den Code schreibt.
76. **Permission-Attribut**: Erstelle ein Makro `#[requires_role("Admin")]`, das vor dem Ausführen der Funktion prüft, ob der aktuelle Benutzer die nötigen Rechte hat.
77. **MockFunction-Attribut**: Entwickle ein Makro, das es erlaubt, den Funktionskörper im Testmodus durch eine vordefinierte Mock-Antwort zu ersetzen.
78. **GenerateBindings-Attribut**: Schreibe ein Makro, das für eine Rust-Funktion automatisch C-kompatible Header-Dateien (.h) erzeugt.
79. **Benchmark-Attribut**: Baue ein Makro, das eine Funktion mehrfach ausführt, um statistische Daten über deren Performance zu sammeln.
80. **DebugPrint-Attribut**: Erstelle ein Makro, das den AST (Abstract Syntax Tree) der dekorierten Funktion während des Kompilierens im Terminal ausgibt.

---

## Teil 5: Fortgeschrittene DSLs & Parser-Makros

Hier kombinierst du prozedurale Makros mit echten Parsing-Konzepten. Du baust eigene domänenspezifische Sprachen (DSLs), die zur Compilezeit in Rust-Code übersetzt werden.

81. **HTML-Template-Engine**: Entwickle ein Makro, das eine HTML-ähnliche Syntax parst und in effizienten Rust-Code umwandelt, der Variablen dynamisch einsetzt.
82. **CSS-in-Rust-Parser**: Schreibe ein Makro, das CSS-Regeln parst, auf Gültigkeit prüft und ein typsicheres Stylesheet-Objekt erzeugt.
83. **Zustandsautomat-DSL**: Baue ein Makro, mit dem man Zustände und Übergänge in einer klaren Text-Syntax definiert (z. B. `A -> B via Event`).
84. **SQL-Query-Builder-DSL**: Erstelle ein Makro, mit dem man SQL-Abfragen typsicher direkt in Rust schreiben kann, wobei Tabellen- und Spaltennamen zur Compilezeit geprüft werden.
85. **Regex-Parser zur Compilezeit**: Entwickle ein Makro, das einen regulären Ausdruck parst und einen optimierten Zustandsautomaten zur Compilezeit generiert.
86. **JSON-Parser-DSL**: Schreibe ein Makro, das beliebige JSON-Datenstrukturen parst und zur Compilezeit typsichere Rust-Objekte daraus baut.
87. **Mathematische Formelsprache**: Baue ein Makro, das mathematische Formeln in Infix-Notation parst und einen optimierten Berechnungsbaum generiert.
88. **Routing-Tabelle für Webserver**: Erstelle ein Makro, das eine Liste von Routen in einer benutzerdefinierten DSL parst und einen schnellen Routing-Baum aufbaut.
89. **Grafik-Pipeline-DSL**: Entwickle ein Makro, das Shader-Definitionen und Render-Schritte parst und die notwendigen WebGPU- oder Vulkan-Aufrufe generiert.
90. **Protokoll-Parser (Binary DSL)**: Schreibe ein Makro, das die Struktur eines Binärprotokolls beschreibt und hocheffiziente Encoder/Decoder-Funktionen generiert.
91. **Markdown-to-Slides-Parser**: Baue ein Makro, das Markdown-Inhalte parst und daraus zur Compilezeit Datenstrukturen für eine Präsentations-App baut.
92. **Dependency-Graph-DSL**: Erstelle ein Makro, das Abhängigkeiten zwischen Tasks beschreibt und einen kreisfreien Graphen zur parallelen Ausführung generiert.
93. **Eigene Lisp-in-Rust-DSL**: Entwickle ein Makro, das Lisp-ähnliche Ausdrücke parst und diese direkt in Rust-Code übersetzt und ausführt.
94. **Cron-Job-Zeitplaner-DSL**: Schreibe ein Makro, das Cron-Ausdrücke (z. B. `* * * * *`) parst und zur Compilezeit auf syntaktische Korrektheit prüft.
95. **Game-Design-Dialog-DSL**: Baue ein Makro, das Dialogbäume für ein Textadventure parst und die Story-Logik generiert.
96. **Schaltplan-Simulator-DSL**: Erstelle ein Makro, das logische Gatter und deren Verbindungen parst und eine simulationsfunktion erzeugt.
97. **Musik-Notations-DSL**: Entwickle ein Makro, das eine vereinfachte Notenschrift parst und daraus Audio-Samples oder MIDI-Daten generiert.
98. **Feature-Flag-Matrix**: Schreibe ein Makro, das eine Tabelle von Features und Plattformen parst und die entsprechenden `#[cfg]`-Attribute generiert.
99. **Neuronales-Netzwerk-DSL**: Baue ein Makro, das die Layer-Architektur eines neuronalen Netzes parst und den Feedforward-Code generiert.
100. **Rust-in-Rust-Interpreter-DSL**: Erstelle ein Makro, das eine stark vereinfachte Teilmenge von Rust parst und einen Interpreter dafür im generierten Code bereitstellt.
