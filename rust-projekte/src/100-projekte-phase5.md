# 100 Projekte - Generics, Traits & Lifetimes

Willkommen in Phase 5! Hier findest du eine Sammlung von 100 kleinen Projektideen und Übungsszenarien. Sie sind speziell darauf ausgelegt, dein Verständnis für die mächtigen Werkzeuge des Rust-Typsystems zu vertiefen: Generics, Traits und Lifetimes.

Die Übungen sind in fünf Kategorien unterteilt, damit du dich gezielt auf einzelne Aspekte konzentrieren oder dich an komplexe Kombinationen wagen kannst. Nutze diese Ideen, um eigene Programme zu schreiben – ganz ohne fertige Lösungen, sondern als kreativen Leitfaden für deinen Lernweg.

---

## 1. Generics-Fokus

In dieser Kategorie lernst du, wie du deine Datenstrukturen und Funktionen flexibel gestaltest, sodass sie mit beliebigen Datentypen arbeiten können.

1. **Generischer Stapelspeicher (Stack)**: Implementiere eine Struktur, die Elemente eines beliebigen Typs `T` nach dem LIFO-Prinzip (Last-In-First-Out) speichert. Du lernst hierbei, wie du Generics in Structs und `impl`-Blöcken definierst.
2. **Generische Warteschlange (Queue)**: Erstelle eine FIFO-Warteschlange (First-In-First-Out) für beliebige Typen. Das zeigt dir, wie du generische Datenstrukturen in internen Vektoren oder Listen verwaltest.
3. **Generisches Werte-Paar**: Definiere ein Struct, das zwei Werte unterschiedlicher generischer Typen `T` und `U` zusammenhält. So verstehst du die Verwendung mehrerer Typparameter in einer einzigen Datenstruktur.
4. **Einfacher Cache**: Entwickle einen Cache, der einen Wert vom Typ `T` und einen Schlüssel vom Typ `K` speichert. Dies trainiert den Umgang mit generischen Feldern und deren Initialisierung.
5. **Generische Matrix**: Erstelle eine zweidimensionale Matrix, die Werte eines generischen Typs `T` hält. Du übst dabei den Zugriff und die Speicherung generischer Daten in einem flachen oder verschachtellten Vektor.
6. **Typisierte ID**: Entwirf eine ID-Struktur `Id<T>`, die an einen bestimmten Typ gebunden ist, um Verwechslungen von IDs verschiedener Entitäten zur Compilezeit zu verhindern. Nutze dafür `std::marker::PhantomData`.
7. **Generischer Zustandsautomat**: Implementiere ein System, bei dem die Zustände als generische Parameter dargestellt werden. Dies zeigt dir, wie du Zustandsübergänge zur Kompilierzeit durch geschickte Typisierung absicherst.
8. **Generischer Event-Dispatcher**: Schreibe einen Dispatcher, der Events vom Typ `E` an registrierte Listener verteilt. Hier lernst du generische Parameter in Methoden und Funktionssignaturen kennen.
9. **Generischer JSON-Parser-Stumpf**: Entwickle ein Gerüst für einen Parser, der einen String liest und ein Objekt des generischen Typs `T` zurückgeben möchte. Du übst das Formulieren von Signaturen für Deserialisierung.
10. **Generischer Binärbaum (Tree)**: Baue einen binären Suchbaum, dessen Knoten Werte vom Typ `T` enthalten. Du lernst, generische Typen rekursiv unter Verwendung von `Box` oder `Option` zu verschachteln.
11. **Generische Konfigurations-Struktur**: Erstelle ein Struct, das Konfigurationseinstellungen für verschiedene Server-Umgebungen über einen generischen Parameter verwaltet.
12. **Typ-sicherer Wrapper**: Schreibe einen Wrapper um primitive Typen, um Maßeinheiten wie Meter oder Sekunden generisch voneinander abzugrenzen und Fehlberechnungen zu verhindern.
13. **Generische mathematische Vektoren**: Definiere einen 3D-Vektor, der sowohl Fließkommazahlen als auch Ganzzahlen aufnehmen kann. So lernst du, wie sich generische mathematische Strukturen deklarieren lassen.
14. **Generischer Logger**: Implementiere eine Protokollierungsfunktion, die Nachrichten von jedem Typ `T` akzeptiert. Hierbei probierst du aus, wie man beliebige Typen formatiert oder verarbeitet.
15. **Generische Liste mit Prioritäten**: Programmiere eine Prioritätswarteschlange, in der die Priorität und der eigentliche Wert jeweils generische Typen sind.
16. **Generischer Iterator-Adapter**: Schreibe einen eigenen Iterator, der ein anderes Iterator-Objekt über einen generischen Typparameter kapselt. Das trainiert das Weiterreichen von generischen Elementen.
17. **Generisches Koordinatensystem**: Definiere Punkte im zweidimensionalen Raum mit generischen Koordinatentypen, um sowohl Ganzzahl- als auch Fließkomma-Koordinaten flexibel abzubilden.
18. **Generische API-Antwort**: Entwirf eine Struktur `ApiResponse<T>`, die entweder Daten vom Typ `T` oder eine Fehlermeldung enthält. So verstehst du, wie du API-Schnittstellen typisiert modellierst.
19. **Generischer Ringpuffer**: Implementiere einen zirkulären Puffer fester Größe, der Elemente eines beliebigen Typs `T` überschreibt, sobald er voll ist.
20. **Generischer Messwert-Container**: Erstelle einen Container, der Zeitreihendaten für beliebige Sensortypen speichert und statistische Werte berechnet.
21. **Generische Suchfunktion**: Schreibe eine Funktion, die ein Element in einem Slice sucht und dessen Position zurückgibt, unabhängig vom Typ der Elemente im Slice.
22. **Generischer E-Mail-Builder**: Entwickle einen Builder-Pattern, bei dem der Zustand des Empfängers und des Betreffs generisch überprüft wird, um das Senden unvollständiger E-Mails zu verhindern.
23. **Generischer Undo-Redo-Manager**: Baue einen Manager, der Aktionen vom Typ `T` in zwei Stacks speichert, um eine Historie für beliebige Benutzerinteraktionen zu verwalten.
24. **Generische SQL-Abfrage-Abstraktion**: Entwirf eine Struktur, die SQL-Queries repräsentiert und die zurückgegebenen Spalten und Zeilen generisch typisiert.
25. **Generischer Dateisystem-Cache**: Implementiere einen Speicher-Cache, der Dateiinhalte liest und in einem generischen Format vorhält, um Lesezugriffe zu beschleunigen.

---

## 2. Traits-Fokus

Traits definieren das Verhalten von Typen. In dieser Kategorie erfährst du, wie du eigene Schnittstellen deklarierst und die reichhaltige Palette an Rust-Standard-Traits verwendest.

26. **Trait 'Printable'**: Definiere ein eigenes Trait für Objekte, die in einem speziellen Format auf der Konsole ausgegeben werden können, und implementiere es für verschiedene Structs.
27. **Trait 'Serializable'**: Erstelle ein Trait zur Serialisierung von Daten in Textform (z. B. XML oder JSON) und implementiere es für deine eigenen Datentypen.
28. **Trait 'Deserializable'**: Das Gegenstück zum Serialisieren – implementiere ein Trait, um deine Strukturen aus einfachen Zeilenketten wiederherzustellen.
29. **Trait 'Volume'**: Definiere ein Trait, das das Volumen von geometrischen 3D-Körpern (wie Würfel oder Kugel) berechnet, und nutze es in Berechnungsfunktionen.
30. **Trait-Bounds für Berechnungen**: Schreibe eine generische Funktion, die nur Typen addieren kann, die das Standard-Trait `std::ops::Add` implementieren. So lernst du Einschränkungen (Bounds) kennen.
31. **Eigener Vergleichs-Trait**: Erstelle ein Trait für "Ähnlichkeit" statt exakter Gleichheit und implementiere es für textbasierte Dokumente, um Abweichungen in Prozent zu messen.
32. **Trait 'Flyable'**: Definiere Verhaltensweisen für flugfähige Objekte und implementiere sie für Vögel und Flugzeuge, um Polymorphie und gemeinsames Verhalten zu üben.
33. **Standard-Trait 'Clone' & 'Copy'**: Implementiere manuell das `Clone`-Trait für ein Struct und verstehe, warum manche Typen das `Copy`-Trait nicht einfach ableiten können.
34. **Standard-Trait 'Display'**: Implementiere `std::fmt::Display` für eine komplexe Struktur, um die benutzerfreundliche Ausgabe mit `{}` im Makro `println!` anzupassen.
35. **Standard-Trait 'Default'**: Nutze das `Default`-Trait, um sinnvolle Standardwerte für eine komplexe Einstellungs-Struktur deines Programms bereitzustellen.
36. **Standard-Trait 'Drop'**: Implementiere `Drop`, um eine Nachricht auszugeben oder Ressourcen freizugeben, wenn eine Struktur den aktuellen Scope verlässt.
37. **Standard-Trait 'From' und 'Into'**: Schreibe eine saubere Konvertierungslogik zwischen zwei unterschiedlichen Datenstrukturen mithilfe dieser beiden Standard-Traits.
38. **Standard-Trait 'Iterator'**: Erstelle einen eigenen Iterator für eine mathematische Sequenz (z. B. Fibonacci) durch Implementierung der erforderlichen `next`-Methode.
39. **Standard-Trait 'AsRef' & 'AsMut'**: Verwende diese Traits, um Funktionen zu schreiben, die flexibel Referenzen auf Daten (wie Strings oder Pfade) entgegennehmen können.
40. **Trait-Objekte (dyn Trait)**: Verwalte eine Liste von unterschiedlichen Objekten, die alle dasselbe Trait implementieren, in einem Vektor unter Verwendung von `Box<dyn Trait>`.
41. **Assoziierte Typen**: Erstelle ein Trait `Graph`, das assoziierte Typen für Knoten (`Node`) und Kanten (`Edge`) verwendet, um flexibel verschiedene Graph-Arten abzubilden.
42. **Super-Traits**: Definiere ein Trait `SmartDevice`, das voraussetzt, dass ein Typ bereits die Traits `Device` und `Display` implementiert.
43. **Trait für Verschlüsselung**: Entwirf ein Trait `Encryptable` mit einer Methode zur Verschlüsselung und wende es auf String-Wrapper und Byte-Vektoren an.
44. **Trait für Datenbank-Verbindungen**: Erstelle ein Trait, das die grundlegenden CRUD-Operationen (Create, Read, Update, Delete) vorgibt, um Mock- und echte Datenbanken austauschbar zu machen.
45. **Standard-Trait 'PartialOrd' und 'Ord'**: Implementiere Sortierlogik für eine Spieler-Struktur basierend auf Punkten und Namen, um sie in Vektoren sortieren zu können.
46. **Trait-Bounds mit Where-Klauseln**: Schreibe komplexe generische Funktionen und strukturiere die Trait-Bounds übersichtlich mit einer `where`-Klausel am Ende der Signatur.
47. **Standard-Trait 'Index' & 'IndexMut'**: Ermögliche es, auf deine eigene Container-Struktur über die eckigen Klammern `container[index]` zuzugreifen und Werte zu modifizieren.
48. **Marker-Traits**: Definiere ein leeres Trait als Marker (wie `SafeToPublish`) und nutze es in Compilezeit-Prüfungen für sensible Daten.
49. **Trait 'Drawable'**: Erstelle ein Trait für grafische Elemente, die auf einer virtuellen Leinwand gezeichnet werden können, und implementiere es für Kreise und Quadrate.
50. **Trait 'Validator'**: Definiere ein Trait zur Validierung von Benutzereingaben und implementiere es für E-Mail- und Passwort-Strukturen, um Eingaben auf Korrektheit zu prüfen.

---

## 3. Lifetimes-Fokus

Lifetimes (Lebensdauern) garantieren Speicher-Sicherheit, indem sie verhindern, dass Referenzen länger existieren als die Daten, auf die sie verweisen. Diese Übungen machen dich mit dem Lifetime-Borrow-Checker vertraut.

51. **Referenz-Wrapper**: Erstelle ein Struct, das eine Referenz auf eine Zahl hält. Deklariere die dafür notwendige Lifetime-Annotation `'a` an der Struktur.
52. **Text-Parser**: Schreibe ein Struct, das einen geladenen Text parst und Referenzen auf einzelne Wörter innerhalb dieses Textes speichert, um unnötige Kopien zu vermeiden.
53. **Zwei Referenzen, gleiche Lifetime**: Entwickle eine Funktion, die zwei Referenzen entgegennimmt, sie vergleicht und die längere zurückgibt. Deklariere dafür eine geteilte Lifetime.
54. **Zwei Referenzen, verschiedene Lifetimes**: Schreibe eine Funktion, die zwei Referenzen mit unterschiedlichen Lifetimes akzeptiert, und lerne, wie sich diese auf die Rückgabewerte auswirken.
55. **Die statische Lifetime (`'static`)**: Verwende `'static` für globale Konstanten oder feste String-Literale und lerne, wie man Daten definiert, die das gesamte Programm über leben.
56. **Struktur mit String-Referenz**: Erstelle eine Struktur `User<'a>`, die den Benutzernamen als Referenz hält, und teste im Code, wie der Compiler Lebensdauern überwacht.
57. **Lifetime Elision Rules**: Schreibe Funktionen, bei denen der Rust-Compiler die Lifetimes automatisch herleitet, und dokumentiere, warum dies ohne explizite Annotationen funktioniert.
58. **Iterator mit Lifetime**: Entwirf einen Iterator, der Referenzen auf die Elemente einer benutzerdefinierten Sammlung liefert, und annotiere die Lifetimes der Rückgabewerte korrekt.
59. **Referenzen in Enums**: Erstelle ein Enum, dessen Varianten Referenzen enthalten (z. B. `Token<'a>`), und deklariere die Lifetime am Enum selbst.
60. **Nested Lifetimes (Lebensdauer-Hierarchien)**: Schreibe eine Struktur, die eine Referenz auf ein Objekt (z. B. `Manager<'a, 'b>`) hält, welches wiederum eine Referenz besitzt, um Hierarchien abzubilden.
61. **Rückgabe einer Referenz aus einer Methode**: Implementiere ein Struct mit einer Methode, die eine Referenz auf ein internes Feld zurückgibt, und annotiere die Lifetimes im `impl`-Block.
62. **Konfigurations-Reader mit Lifetime**: Entwickle einen Reader, der aus einer Konfigurationsdatei liest und Referenzen auf die Abschnitte im Speicher hält, statt sie neu zu allozieren.
63. **Log-Filter**: Schreibe eine Struktur, die Log-Einträge filtert und Referenzen auf die relevanten Zeilen in einem großen, im Speicher liegenden Log-String speichert.
64. **Tokenisierer für Compiler**: Entwirf einen Tokenizer, der einen Quellcode-String scannt und Token-Objekte zurückgibt, die direkt auf Teilstücke des Quellcodes verweisen.
65. **Subtyping bei Lifetimes (`'a: 'b`)**: Zeige an einem praktischen Beispiel, wie du definierst, dass die Lifetime `'a` mindestens so lange leben muss wie die Lifetime `'b`.
66. **Generischer Typ mit Lifetime-Bound (`T: 'a`)**: Schreibe eine Struktur, die einen generischen Typ `T` speichert, welcher wiederum Referenzen mit der Lifetime `'a` enthalten darf.
67. **Lifetime im Trait-Objekt**: Erstelle ein Trait-Objekt mit einer Lifetime-Einschränkung wie `Box<dyn MyTrait + 'a>`, um temporäre Objekte dynamisch und sicher zu verwalten.
68. **Einfacher Cache mit Referenzen**: Implementiere einen Cache, der Referenzen auf teure Berechnungsergebnisse speichert, statt die Ergebnisse bei jedem Zugriff zu kopieren.
69. **URL-Parser**: Schreibe einen Parser, der eine URL in Protokoll, Domain und Pfad zerlegt und diese Teile als Referenzen auf die Original-URL zurückgibt.
70. **AST-Knoten (Abstract Syntax Tree)**: Baue eine Baumstruktur für einen Parser, bei der jeder Knoten Referenzen auf den eingelesenen Quellcode-Text enthält.
71. **Referenzierte JSON-Keys**: Erstelle einen JSON-Parser-Stumpf, der Schlüssel und Werte als Referenzen auf den eingelesenen JSON-String speichert, um Heap-Allokationen zu minimieren.
72. **Zeilen-Gruppierer**: Schreibe eine Funktion, die Zeilen eines Dokuments gruppiert und Referenzen auf diese Zeilen in einer Map ablegt, ohne die Strings neu zu erstellen.
73. **Zirkuläre Referenzen vermeiden**: Versuche, zwei Strukturen zu bauen, die sich gegenseitig referenzieren, und lerne, warum der Compiler dies verhindert und wie man Referenzzyklen vermeidet.
74. **Text-Highlighter**: Programmiere ein Tool, das Suchbegriffe in einem Text findet und Referenzen auf die Fundstellen für die spätere Formatierung speichert.
75. **Befehlszeilen-Argument-Parser**: Entwickle einen Parser für Kommandozeilenargumente, der direkt Referenzen aus dem ursprünglichen Argument-Array nutzt.

---

## 4. Kombinations-Projekte

Hier verbindest du alle drei Konzepte. Du entwirfst generische Strukturen, schränkst sie durch Traits ein und verwaltest die Speicher-Sicherheit über Lifetimes.

76. **Generisches Repository mit Lifetime**: Erstelle ein Daten-Repository, das ein Trait implementiert und Referenzen auf eine temporäre Datenbankverbindung hält.
77. **Eigener generischer Iterator mit Lebensdauer**: Programmiere einen Iterator, der über eine generische Datenstruktur iteriert und Referenzen mit expliziten Lifetimes liefert.
78. **Generischer Event-Listener mit Lifetimes**: Implementiere ein Event-System, bei dem die Listener generische Typen sind und als Referenzen mit Lebensdauer registriert werden.
79. **Generischer AST-Parser**: Baue einen Parser für mathematische Ausdrücke, der generische Operatoren unterstützt und Referenzen auf den Quelltext speichert.
80. **Typ-sicheres Transaktions-System**: Entwirf ein System, das Transaktionen für verschiedene Kontotypen (generisch) abwickelt und das Trait `Executable` nutzt.
81. **Generischer Graph-Algorithmus**: Implementiere einen Suchalgorithmus (z. B. Breitensuche), der auf jedem Graphentyp arbeitet, der ein bestimmtes `Graph`-Trait erfüllt.
82. **Generischer Serialisierer mit Lebensdauer**: Schreibe ein Serialisierungs-Framework, das Datenstrukturen in Byte-Slices umwandelt, ohne sie im Speicher zu kopieren.
83. **Generische Cache-Struktur mit Validierungs-Trait**: Entwirf einen Cache, der ein Trait zur Gültigkeitsprüfung (`Validator`) und Lifetimes für die temporären Einträge nutzt.
84. **Dependency-Injection-Container**: Programmiere einen einfachen DI-Container, der Services über Generics registriert und über Trait-Objekte zurückgibt.
85. **Generischer Query-Builder mit Lifetime**: Schreibe einen SQL-Query-Builder, der Parameter als Referenzen speichert, um SQL-Injections zur Laufzeit zu verhindern.
86. **Generische Pipeline**: Entwickle ein Pipeline-System, bei dem Stufen über Traits definiert sind und Daten (generisch) per Referenz durchgereicht werden.
87. **Generischer State-Pattern-Automat**: Implementiere ein State-Pattern für ein Spielobjekt, bei dem die Zustände Traits implementieren und Zustandsdaten generisch sind.
88. **Plugin-System**: Programmiere ein einfaches System, das Plugins (Traits) dynamisch lädt und ihnen generische Kontextdaten als Referenz übergibt.
89. **Generische Suchmaschine**: Erstelle ein Suchindex-Modul, das beliebige Dokumententypen indiziert und Suchergebnisse als Referenzen zurückgibt.
90. **Generisches Daten-Diff-Tool**: Entwickle ein Tool, das Unterschiede zwischen zwei Kollektionen berechnet und die Unterschiede als Referenzen darstellt.

---

## 5. Fortgeschrittene Szenarien

Bereit für die Profi-Liga? Diese Herausforderungen decken spezielle Typ-System-Features, fortgeschrittenes Dispatching und fortgeschrittene Lifetime-Mechaniken ab.

91. **Dyn Traits vs. Impl Traits**: Schreibe ein Programm, das den Unterschied zwischen statischem Dispatch (`impl Trait`) und dynamischem Dispatch (`dyn Trait`) verdeutlicht.
92. **Thread-Safety mit Send & Sync**: Erstelle ein Szenario, in dem du eigene Typen definierst und prüfst, wie der Compiler `Send` und `Sync` automatisch ableitet oder blockiert.
93. **Smart Pointer & Lifetimes (Rc/Arc)**: Kombiniere Lifetimes mit `Rc` und `RefCell`, um geteilten, veränderlichen Zugriff auf Daten zu ermöglichen.
94. **Assoziierte Typen vs. Generics im Trait**: Schreibe zwei Versionen eines Traits (einmal mit assoziiertem Typ, einmal mit Generic) und vergleiche die Ergonomie bei der Benutzung.
95. **Blanket Implementations**: Implementiere ein Trait automatisch für alle Typen, die bereits ein anderes bestimmtes Trait implementieren.
96. **GATs (Generic Associated Types)**: Experimentiere mit assoziierten Typen, die selbst generisch sind (z. B. ein Iterator, der Referenzen mit der Lifetime der Iteration liefert).
97. **Covariance & Contravariance**: Untersuche an Beispielen mit Lifetimes, wie Rusts Subtypisierung funktioniert (z. B. warum `'static` für `'a` eingesetzt werden kann).
98. **Trait-Bounds mit HRTBs (Higher-Rank Trait Bounds)**: Verwende die `for<'a>` Syntax, um eine Funktion zu schreiben, die Closures mit beliebigen Lifetimes akzeptiert.
99. **PhantomData im Detail**: Entwirf eine Struktur, die vorgibt, eine Referenz oder einen Typ zu besitzen, um logische Fehler zur Compilezeit zu verhindern.
100. **Eigener Smart Pointer**: Implementiere das `Deref`- und `Drop`-Trait für eine eigene Struktur, um deinen eigenen Smart Pointer zu erstellen.
