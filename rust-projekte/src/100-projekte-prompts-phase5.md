# 100 Projektdetails und Prompts - Phase 5

Dieses Kapitel enthält detaillierte, modular aufgebaute Übungs-Prompts für alle 100 Projektideen aus Phase 5. Sie sind didaktisch so konzipiert, dass du die Umsetzung Schritt für Schritt selbst erarbeitest. Jedes Projekt ist in drei aufeinander aufbauende Module unterteilt:

- **Modul 1: Basis-Datenstrukturen** (Generics, Structs, Enums und Sichtbarkeiten entwerfen)
- **Modul 2: Implementierung & Methoden** (Methoden, Trait-Implementierungen, Lifetimes und Berechnungslogik)
- **Modul 3: Vollendung & Hauptprogramm** (main.rs, Konsolenmenü, Fehlerbehandlung und Integration)

Viel Erfolg beim Programmieren und Lernen!

---

## 1. Generics-Fokus

### 1. Generischer Stapelspeicher (Stack)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein generisches Struct `Stack<T>`. Überlege dir, wie du den internen Speicher aufbaust (z.B. mit einem `Vec<T>`). Achte auf die Sichtbarkeit (`pub`) der Struktur und ihrer Felder.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden für deinen `Stack<T>`: `new` zum Erstellen, `push` zum Hinzufügen, `pop` zum Entfernen (Rückgabetyp beachten!), sowie Hilfsmethoden wie `is_empty` oder `peek`.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Hauptprogramm in `main.rs`, das einen `Stack` für verschiedene Datentypen (z.B. `i32` und `String`) instanziiert, Operationen ausführt und das Ergebnis auf der Konsole ausgibt. Integriere eine benutzerfreundliche Fehlerbehandlung (z.B. für den Fall, dass `pop` auf einem leeren Stack aufgerufen wird).

### 2. Generische Warteschlange (Queue)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein generisches Struct `Queue<T>`. Überlege dir, welche Datenstruktur sich im Inneren eignet, um Elemente nach dem FIFO-Prinzip (First-In-First-Out) effizient zu verwalten.
- **Modul 2 (Implementierung & Methoden):** Implementiere die notwendigen Methoden: `new` für eine leere Warteschlange, `enqueue` zum Hinzufügen eines Elements und `dequeue` zum Entfernen. Überlege dir, welchen Rückgabetyp `dequeue` haben sollte, wenn die Warteschlange leer ist.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe eine `main.rs`, die eine `Queue` mit verschiedenen Elementen befüllt, diese nacheinander ausgibt und leert. Fange Fehler ab, wenn versucht wird, aus einer leeren Warteschlange zu lesen.

### 3. Generisches Werte-Paar
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Pair<T, U>`, das zwei Werte unterschiedlicher generischer Typen zusammenhält. Beachte dabei, dass die beiden Typen auch gleich sein können, aber nicht müssen.
- **Modul 2 (Implementierung & Methoden):** Implementiere einen Konstruktor `new` sowie Getter-Methoden für beide Felder. Implementiere zusätzlich eine Methode `swap`, falls beide Typen identisch sind (überlege dir, wie du das mit Trait-Bounds oder impl-Blöcken einschränken kannst).
- **Modul 3 (Vollendung & Hauptprogramm):** Erstelle in der `main.rs` Paare von unterschiedlichen Typen (z.B. `Pair<i32, String>`) und gib deren Werte auf der Konsole aus. Verwende eine saubere Strukturierung.

### 4. Einfacher Cache
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `SimpleCache<K, V>`, das einen Schlüssel vom Typ `K` und einen Wert vom Typ `V` hält. Denke über die Datentypen nach, die als Schlüssel verwendet werden können.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Einfügen und Abrufen von Werten. Überlege dir, wie du mit Trait-Bounds sicherstellst, dass Schlüssel verglichen werden können (z.B. `Eq` und `Hash`).
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Hauptprogramm, das einen Cache für Benutzer-IDs und deren Namen instanziiert. Demonstriere das Speichern und erfolgreiche Abrufen sowie den Fall eines Cache-Misses.

### 5. Generische Matrix
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Matrix<T>`, das eine zweidimensionale Matrix darstellt. Überlege dir, wie du die Dimensionen (Zeilen und Spalten) sowie die eigentlichen Daten in einem flachen Vektor (`Vec<T>`) speicherst.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zur Instanziierung (z.B. mit Standardwerten), zum Setzen und zum Abrufen eines Elements an einer bestimmten Zeilen- und Spaltenposition.
- **Modul 3 (Vollendung & Hauptprogramm):** Baue ein Konsolenprogramm auf, das eine Matrix mit Zahlen befüllt und diese formatiert auf dem Bildschirm ausgibt. Implementiere eine Fehlerbehandlung für ungültige Index-Zugriffe.

### 6. Typisierte ID
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Id<T>`, das intern einen primitiven Typen (wie `u64`) kapselt. Nutze `std::marker::PhantomData<T>`, um die ID an einen bestimmten Typ `T` (z.B. `User` oder `Product`) zu binden, ohne dass `T` im Struct selbst gespeichert werden muss.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Erstellen der ID und zum Auslesen des inneren Wertes. Implementiere grundlegende Traits wie `Clone`, `Copy` und `PartialEq` für deine Struktur.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm, dass der Compiler verhindert, dass eine `Id<User>` mit einer `Id<Product>` verwechselt oder verglichen wird, obwohl beide intern eine Zahl nutzen.

### 7. Generischer Zustandsautomat
- **Modul 1 (Basis-Datenstrukturen):** Entwirf Strukturen, die verschiedene Zustände repräsentieren (z.B. `Draft`, `Review`, `Published`). Definiere eine Struktur `Document<S>`, bei der der Typparameter `S` den aktuellen Zustand darstellt.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden, die nur für bestimmte Zustände definiert sind (z.B. eine Methode `approve`, die nur auf `Document<Review>` existiert und ein `Document<Published>` zurückgibt).
- **Modul 3 (Vollendung & Hauptprogramm):** Simuliere im Hauptprogramm den Lebenszyklus eines Dokuments. Zeige, dass unerlaubte Zustandsübergänge (z.B. direkt von `Draft` zu `Published`) bereits vom Compiler blockiert werden.

### 8. Generischer Event-Dispatcher
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `EventDispatcher<E>`, das eine Liste von Event-Handlern (Funktionszeigern oder Closures) für ein bestimmtes Event `E` verwaltet.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine Methode `register_listener`, um neue Handler hinzuzufügen, und eine Methode `dispatch`, um ein Event an alle registrierten Handler zu senden.
- **Modul 3 (Vollendung & Hauptprogramm):** Erstelle verschiedene Event-Typen und zeige in `main.rs`, wie der Dispatcher Ereignisse an die entsprechenden Callback-Funktionen verteilt.

### 9. Generischer JSON-Parser-Stumpf
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Parser<T>`, das für die Deserialisierung eines Strings in ein Objekt des Typs `T` zuständig ist.
- **Modul 2 (Implementierung & Methoden):** Definiere eine Methode `parse`, die einen String-Slice entgegennimmt und ein `Result<T, ParseError>` zurückgibt. Nutze hierbei Trait-Bounds, um sicherzustellen, dass `T` aus einem String erstellt werden kann.
- **Modul 3 (Vollendung & Hauptprogramm):** Implementiere das Hauptprogramm mit einer Test-Datenstruktur und simuliere das Parsen von korrekten sowie fehlerhaften Eingabestrings inklusive Fehleranzeige.

### 10. Generischer Binärbaum (Tree)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Enum `TreeNode<T>` für die Knoten eines Binärbaums. Jedes Element kann entweder ein Blatt (`Empty`) oder ein Knoten (`Node`) mit einem Wert und zwei optionalen Kindknoten sein. Verwende `Box`, um rekursive Typen zu ermöglichen.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden wie `insert` zum Hinzufügen von Werten und `contains` zum Suchen nach einem Element im Baum. Setze Trait-Bounds wie `Ord` voraus, um die Ordnung im Baum zu wahren.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Hauptprogramm, das einen Binärbaum mit Zahlen oder Wörtern aufbaut, Werte darin sucht und den Baum in In-Order-Reihenfolge auf der Konsole ausgibt.

### 11. Generische Konfigurations-Struktur
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `Config<Env>`, die Konfigurationseinstellungen kapselt. Der Typ `Env` stellt die Umgebung dar (z.B. `Development` oder `Production`).
- **Modul 2 (Implementierung & Methoden):** Schreibe Implementierungen, die je nach Umgebung unterschiedliche Standardwerte setzen oder Validierungen durchführen (z.B. unterschiedliche Port-Nummern oder Sicherheitsstufen).
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm, wie Konfigurationen für verschiedene Umgebungen erzeugt werden und wie sich deren Verhalten unterscheidet.

### 12. Typ-sicherer Wrapper
- **Modul 1 (Basis-Datenstrukturen):** Erstelle ein generisches Struct `Measure<Unit, Val>`, um Werte mit einer physikalischen Einheit zu versehen.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Addieren und Subtrahieren von Maßen. Nutze Trait-Bounds, um sicherzustellen, dass nur Maße derselben Einheit miteinander verrechnet werden können.
- **Modul 3 (Vollendung & Hauptprogramm):** Erstelle Einheiten-Typen für Meter und Sekunden und demonstriere im Hauptprogramm, dass der Compiler fehlerhafte Berechnungen (z.B. Meter + Sekunden) unterbindet.

### 13. Generische mathematische Vektoren
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Vector3D<T>` mit den Feldern `x`, `y` und `z` vom Typ `T`.
- **Modul 2 (Implementierung & Methoden):** Implementiere grundlegende mathematische Operationen wie die Vektoraddition. Nutze dafür die passenden mathematischen Traits (wie `std::ops::Add`) als Bounds für `T`.
- **Modul 3 (Vollendung & Hauptprogramm):** Berechne im Hauptprogramm die Summe von mathematischen Vektoren sowohl mit `f64` als auch mit `i32` und gib die Ergebnisse aus.

### 14. Generischer Logger
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Logger<T>`, das Nachrichten eines beliebigen Typs `T` verarbeitet und protokolliert.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine Methode `log`, die eine Nachricht entgegennimmt. Verwende Trait-Bounds wie `std::fmt::Debug` oder `std::fmt::Display`, um die Nachricht formatieren zu können.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere in `main.rs`, wie der Logger sowohl einfache Strings als auch komplexe Custom-Structs protokolliert.

### 15. Generische Liste mit Prioritäten
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `PriorityQueue<T, P>`, bei dem `T` das gespeicherte Element und `P` die Priorität repräsentiert.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Einfügen (`push`) und Entfernen des Elements mit der höchsten Priorität (`pop`). Setze Trait-Bounds wie `Ord` für `P` voraus.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Hauptprogramm, das Aufgaben mit unterschiedlichen Prioritäten einfügt und diese in der korrekten Reihenfolge abarbeitet und ausgibt.

### 16. Generischer Iterator-Adapter
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `SkipEverySecond<I>`, das einen anderen Iterator `I` kapselt.
- **Modul 2 (Implementierung & Methoden):** Implementiere das `Iterator`-Trait für dein Struct. Die `next`-Methode soll jedes zweite Element des inneren Iterators überspringen.
- **Modul 3 (Vollendung & Hauptprogramm):** Verwende den Adapter in `main.rs` auf einem Bereich von Zahlen oder einer Liste von Wörtern und gib das Ergebnis aus.

### 17. Generisches Koordinatensystem
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Point<T>` zur Darstellung eines Punkts im zweidimensionalen Raum mit Koordinaten `x` und `y`.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zur Berechnung des Abstands zum Ursprung. Nutze Trait-Bounds, um sicherzustellen, dass der Typ `T` mathematische Operationen und das Ziehen einer Quadratwurzel unterstützt.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere die Verwendung des Punktes mit Ganzzahlen und Fließkommazahlen im Hauptprogramm.

### 18. Generische API-Antwort
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Enum `ApiResponse<T>`, das entweder den Zustand `Success(T)` mit Daten vom Typ `T` oder den Zustand `Error(String)` repräsentiert.
- **Modul 2 (Implementierung & Methoden):** Implementiere Hilfsmethoden wie `is_success`, `unwrap_or` und `map`, um komfortabel auf die Daten zugreifen oder diese transformieren zu können.
- **Modul 3 (Vollendung & Hauptprogramm):** Simuliere im Hauptprogramm API-Abrufe, verarbeite die Antworten und gib entsprechende Statusmeldungen aus.

### 19. Generischer Ringpuffer
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `CircularBuffer<T>` mit einer festen Kapazität. Überlege dir, wie du den Lese- und Schreib-Index verwaltest.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Schreiben (`push`) und Lesen (`pop`). Beim Schreiben in einen vollen Puffer soll das älteste Element überschrieben werden.
- **Modul 3 (Vollendung & Hauptprogramm):** Teste den Puffer in `main.rs` durch kontinuierliches Schreiben und Lesen. Zeige, dass die Kapazitätsgrenze eingehalten wird.

### 20. Generischer Messwert-Container
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `SensorData<T>`, das eine Liste von Messwerten des Typs `T` zusammen mit einem Zeitstempel speichert.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Hinzufügen von Werten und zur Berechnung des Durchschnitts. Nutze Trait-Bounds für mathematische Grundoperationen.
- **Modul 3 (Vollendung & Hauptprogramm):** Nutze den Container in `main.rs` für verschiedene Sensortypen (z.B. Temperatur- und Feuchtigkeitssensoren) und gib die Statistiken aus.
### 21. Generische Suchfunktion
- **Modul 1 (Basis-Datenstrukturen):** Definiere eine generische Funktion `find_element<T>`, die als Argumente eine Referenz auf ein Element vom Typ `T` und einen Slice von Elementen des Typs `T` entgegennimmt.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Suchlogik. Überlege dir, welche Trait-Bounds auf den Typ `T` angewendet werden müssen, um Elemente miteinander vergleichen zu können (z.B. `PartialEq`).
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige in der `main.rs`, wie du die Funktion mit unterschiedlichen Datentypen (z.B. Ganzzahlen, Strings und benutzerdefinierten Strukturen) aufrufst und die gefundenen Indizes oder Fehler ausgibst.

### 22. Generischer E-Mail-Builder
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `EmailBuilder<RecipientState, SubjectState>`, die den Zustand des Empfängers und des Betreffs über generische Zustandstypen (z.B. `NoRecipient`, `HasRecipient`, `NoSubject`, `HasSubject`) darstellt.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Hinzufügen des Empfängers und des Betreffs. Diese Methoden sollen ein neues Builder-Objekt zurückgeben, bei dem der entsprechende Zustandstyp aktualisiert ist. Die Methode `build` darf nur für `EmailBuilder<HasRecipient, HasSubject>` implementiert sein.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere in der `main.rs`, dass unvollständige E-Mails (z.B. ohne Empfänger) nicht gebaut werden können, da der Compiler dies verhindert.

### 23. Generischer Undo-Redo-Manager
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `UndoRedo<T>`, das zwei Stacks (Vektoren) verwaltet: einen für Undo-Aktionen und einen für Redo-Aktionen, beide vom generischen Typ `T`.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Methoden `execute` (neue Aktion ausführen und Redo-Stack leeren), `undo` (letzte Aktion rückgängig machen und auf den Redo-Stack schieben) und `redo` (letzte rückgängig gemachte Aktion wiederherstellen).
- **Modul 3 (Vollendung & Hauptprogramm):** Simuliere im Hauptprogramm einen Texteditor, bei dem Aktionen (z.B. Text hinzufügen, Text löschen) rückgängig gemacht und wiederholt werden können.

### 24. Generische SQL-Abfrage-Abstraktion
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `SqlQuery<RowType>`, die eine SQL-Abfrage repräsentiert, wobei `RowType` den generischen Typ einer Datenzeile darstellt.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden, um die SQL-Abfrage mit Parametern zu versehen und ein `Result<Vec<RowType>, QueryError>` zurückzugeben. Nutze Trait-Bounds, um festzulegen, dass `RowType` aus einer Datenbankzeile konvertiert werden kann.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Testprogramm, das Mock-Zeilen aus einer Abfrage liest und die typisierten Ergebnisse auf der Konsole ausgibt.

### 25. Generischer Dateisystem-Cache
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `FileCache<T>`, das Dateipfade als Schlüssel und Dateiinhalte im generischen Format `T` speichert.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Abrufen einer Datei. Ist sie im Cache, wird der Wert zurückgegeben; andernfalls wird sie gelesen, geparst und im Cache abgelegt. Verwende Trait-Bounds, um sicherzustellen, dass `T` aus Bytes oder einem String geparst werden kann.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere im Hauptprogramm den Geschwindigkeitsvorteil durch wiederholtes Abrufen einer Datei und gib entsprechende Protokollzeilen aus.

---

## 2. Traits-Fokus

### 26. Trait 'Printable'
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein eigenes Trait `Printable` mit einer Methode `print_formatted(&self)`.
- **Modul 2 (Implementierung & Methoden):** Implementiere dieses Trait für verschiedene eigene Datenstrukturen (z.B. ein Struct `Book` und ein Struct `Car`). Jede Struktur soll ihre Daten auf eine spezifische Art formatieren.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Hauptprogramm, das eine generische Funktion aufruft, die nur Typen akzeptiert, die `Printable` implementieren, und diese formatiert ausgibt.

### 27. Trait 'Serializable'
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Serializable` mit einer Methode `serialize(&self) -> String`.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für ein Struct `User` (Serialisierung als JSON-Stumpf) und ein Struct `Product` (Serialisierung als CSV-Zeile).
- **Modul 3 (Vollendung & Hauptprogramm):** Erzeuge im Hauptprogramm Instanzen dieser Strukturen, serialisiere sie und gib die resultierenden Textrepräsentationen auf der Konsole aus.

### 28. Trait 'Deserializable'
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Deserializable` mit einer statischen Methode (oder assoziierten Funktion) `deserialize(data: &str) -> Result<Self, String>`.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für ein Struct `User` und ein Struct `Product`, sodass sie aus ihren jeweiligen Textrepräsentationen (aus Projekt 27) wiederhergestellt werden können.
- **Modul 3 (Vollendung & Hauptprogramm):** Teste das Deserialisieren von korrekten und fehlerhaften Texten im Hauptprogramm und gib die Fehlermeldungen verständlich aus.

### 29. Trait 'Volume'
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Volume` mit einer Methode `calculate_volume(&self) -> f64`.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für geometrische Körper wie `Cube` (Würfel), `Sphere` (Kugel) und `Cylinder` (Zylinder).
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe eine Funktion, die das Gesamtvolumen einer Liste von Objekten berechnet, die alle das Trait `Volume` implementieren, und teste sie in `main.rs`.

### 30. Trait-Bounds für Berechnungen
- **Modul 1 (Basis-Datenstrukturen):** Definiere eine generische Funktion `add_three<T>`, die drei Werte des Typs `T` entgegennimmt.
- **Modul 2 (Implementierung & Methoden):** Schränke den Typ `T` mithilfe von Trait-Bounds so ein, dass die mathematische Addition (`std::ops::Add`) darauf ausgeführt werden kann und die Rückgabetypen korrekt zusammenpassen.
- **Modul 3 (Vollendung & Hauptprogramm):** Teste die Funktion in `main.rs` mit Ganzzahlen, Fließkommazahlen und erkläre im Code, was passiert, wenn man einen Typ übergibt, der keine Addition unterstützt.

### 31. Eigener Vergleichs-Trait
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `FuzzyEq` mit einer Methode `fuzzy_eq(&self, other: &Self, tolerance: f64) -> bool`.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für ein Struct `Document` (Vergleich der Wortanzahl oder Textlänge) und ein Struct `Measurement` (Vergleich von Fließkommawerten mit Toleranz).
- **Modul 3 (Vollendung & Hauptprogramm):** Vergleiche im Hauptprogramm verschiedene Dokumente und Messwerte mit unterschiedlichen Toleranzen und gib das Ergebnis aus.

### 32. Trait 'Flyable'
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Flyable` mit den Methoden `take_off`, `land` und `current_altitude`.
- **Modul 2 (Implementierung & Methoden):** Implementiere `Flyable` für ein Struct `Bird` und ein Struct `Airplane`. Jedes soll eine eigene interne Zustandsverwaltung für die aktuelle Höhe haben.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Konsolenmenü, über das du einen Vogel oder ein Flugzeug auswählen und deren Flugverhalten simulieren kannst.

### 33. Standard-Trait 'Clone' & 'Copy'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `UniqueToken`, das ein dynamisch alloziiertes Feld (wie ein `String` oder `Vec`) besitzt, wodurch es nicht einfach kopiert (`Copy`) werden kann.
- **Modul 2 (Implementierung & Methoden):** Implementiere das `Clone`-Trait manuell für dieses Struct und füge ein `println!` in die Methode ein, um zu demonstrieren, wann eine tiefe Kopie erstellt wird.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm den Unterschied zwischen Zuweisung (Besitzübergabe/Move) und explizitem Klonen und beobachte die Konsolenausgaben.

### 34. Standard-Trait 'Display'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `PlayingCard` mit einer Farbe (Enum) und einem Wert (Enum).
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait `std::fmt::Display` für `PlayingCard`, sodass Karten ansprechend formatiert ausgegeben werden (z.B. "Herz Ass" statt der Debug-Ausgabe).
- **Modul 3 (Vollendung & Hauptprogramm):** Gib ein ganzes Kartendeck oder eine Handvoll gezogener Karten im Hauptprogramm mithilfe des `{}`-Formatierers aus.

### 35. Standard-Trait 'Default'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `GameSettings` mit vielen Einstellungsfeldern (z.B. Lautstärke, Schwierigkeit, Vollbildmodus).
- **Modul 2 (Implementierung & Methoden):** Implementiere das `Default`-Trait für `GameSettings`, um sinnvolle Standardwerte festzulegen (z.B. Lautstärke = 80, Schwierigkeit = Normal).
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige in der `main.rs`, wie du eine Instanz erstellst, bei der du nur einzelne Felder änderst und den Rest mit `..Default::default()` übernimmst.

### 36. Standard-Trait 'Drop'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `DatabaseConnection`, das eine simulierte Verbindung zu einer Datenbank repräsentiert (z.B. durch eine Verbindungs-ID).
- **Modul 2 (Implementierung & Methoden):** Implementiere das `Drop`-Trait für `DatabaseConnection`, sodass beim Verlassen des Gültigkeitsbereichs automatisch eine Meldung wie "Verbindung ID geschlossen" ausgegeben wird.
- **Modul 3 (Vollendung & Hauptprogramm):** Erzeuge in `main.rs` Verbindungen in verschachtelten Scopes `{ ... }` und zeige, wann die Verbindungen automatisch abgebaut werden.

### 37. Standard-Trait 'From' und 'Into'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf zwei Strukturen: `ExternalUser` (mit getrennten Feldern für Vor- und Nachname) und `InternalUser` (mit einem einzigen Feld für den vollen Namen).
- **Modul 2 (Implementierung & Methoden):** Implementiere das `From<ExternalUser>`-Trait für `InternalUser`. Nutze die automatische Bereitstellung von `Into` durch Rust.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm die nahtlose Konvertierung unter Verwendung von `.into()` und verarbeite die konvertierten Daten.

### 38. Standard-Trait 'Iterator'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Fibonacci`, das den aktuellen Zustand für die Berechnung der Fibonacci-Zahlen speichert.
- **Modul 2 (Implementierung & Methoden):** Implementiere das `Iterator`-Trait für `Fibonacci`, indem du die `next`-Methode schreibst. Überlege dir, wie du einen Überlauf verhinderst (z.B. durch Rückgabe von `None`).
- **Modul 3 (Vollendung & Hauptprogramm):** Gib im Hauptprogramm die ersten 20 Fibonacci-Zahlen mithilfe einer einfachen `for`-Schleife oder Iterator-Methoden (wie `take`) aus.

### 39. Standard-Trait 'AsRef' & 'AsMut'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `EncryptedString`, die intern einen privaten Byte-Vektor kapselt.
- **Modul 2 (Implementierung & Methoden):** Implementiere `AsRef<[u8]>` für `EncryptedString`, um einen einfachen Lesezugriff auf die internen Bytes zu ermöglichen, ohne das Struct zu konsumieren.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe eine Funktion, die beliebige Typen akzeptiert, die `AsRef<[u8]>` implementieren, und teste sie mit Standard-Strings und deinem `EncryptedString`.

### 40. Trait-Objekte (dyn Trait)
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Widget` mit einer Methode `draw(&self)`.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für die Strukturen `Button`, `TextBox` und `Image`.
- **Modul 3 (Vollendung & Hauptprogramm):** Erstelle einen Vektor `Vec<Box<dyn Widget>>` in `main.rs`, füge verschiedene Widgets hinzu und zeichne alle in einer Schleife, um dynamischen Dispatch zu demonstrieren.
### 41. Assoziierte Typen
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Graph`, das die assoziierten Typen `Node` und `Edge` besitzt.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für ein Struct `SimpleGraph`. Definiere Methoden im Trait wie `add_node` und `add_edge`, die diese assoziierten Typen nutzen.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm, wie du einen konkreten Graphen erstellst, Knoten sowie Kanten hinzufügst und den Graphen auf der Konsole ausgibst.

### 42. Super-Traits
- **Modul 1 (Basis-Datenstrukturen):** Definiere zwei Basis-Traits: `Device` (mit einer Methode `turn_on`) und `Display` (mit einer Methode `show`). Definiere anschließend ein Super-Trait `SmartDevice`, das voraussetzt, dass ein Typ bereits beide Basis-Traits implementiert.
- **Modul 2 (Implementierung & Methoden):** Implementiere alle benötigten Traits für eine Struktur `SmartPhone`.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe eine Funktion, die ein `SmartDevice`-Objekt als Parameter erwartet, und teste sie in `main.rs` mit deiner Smartphone-Struktur.

### 43. Trait für Verschlüsselung
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Encryptable` mit den Methoden `encrypt` und `decrypt`.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für ein Struct `StringWrapper` (z.B. mit ROT13) und für einen Byte-Vektor `Vec<u8>` (z.B. mit XOR).
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere im Hauptprogramm das Ver- und Entschlüsseln von Texten und Binärdaten und gib die Ergebnisse aus.

### 44. Trait für Datenbank-Verbindungen
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Trait `Database` mit CRUD-Methoden (`create`, `read`, `update`, `delete`).
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait einmal für eine `MockDatabase` (die Daten im RAM speichert) und einmal für eine `SqliteDatabase` (die den Zugriff simuliert).
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Hauptprogramm, das über eine Konfigurationsvariable entscheidet, welche Datenbank-Implementierung verwendet wird, und führe dieselben Operationen auf beiden aus.

### 45. Standard-Trait 'PartialOrd' und 'Ord'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Player` mit den Feldern `name` (String) und `score` (u32).
- **Modul 2 (Implementierung & Methoden):** Implementiere `PartialEq`, `Eq`, `PartialOrd` und `Ord` für `Player`, sodass Spieler primär nach ihrer Punktzahl (absteigend) und sekundär nach ihrem Namen (alphabetisch aufsteigend) sortiert werden.
- **Modul 3 (Vollendung & Hauptprogramm):** Erzeuge in `main.rs` eine Liste von Spielern, sortiere sie mit `.sort()` und gib die Bestenliste aus.

### 46. Trait-Bounds mit Where-Klauseln
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine generische Funktion `process_data<T, U>`, die Daten verarbeitet.
- **Modul 2 (Implementierung & Methoden):** Formuliere komplexe Trait-Bounds für `T` und `U` (z.B. `T` muss `Display` und `Clone` sein, `U` muss `Debug` und `Default` sein) übersichtlich mit einer `where`-Klausel am Ende der Signatur.
- **Modul 3 (Vollendung & Hauptprogramm):** Teste die Funktion im Hauptprogramm mit passenden Typen und demonstriere die Übersichtlichkeit.

### 47. Standard-Trait 'Index' & 'IndexMut'
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `CustomList<T>`, die intern ein Array oder einen Vektor von Elementen hält.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Traits `std::ops::Index` und `std::ops::IndexMut` für `CustomList<T>`, sodass auf Elemente über `list[index]` lesend und schreibend zugegriffen werden kann.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige in `main.rs` die Verwendung der eckigen Klammern zur Manipulation der Liste und fange ungültige Indizes ab.

### 48. Marker-Traits
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein leeres Trait `SafeToPublish`.
- **Modul 2 (Implementierung & Methoden):** Implementiere dieses Marker-Trait für ein Struct `PublicArticle`, aber nicht für ein Struct `DraftArticle`.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe eine Funktion `publish<T: SafeToPublish>(article: T)` und zeige im Hauptprogramm, dass der Compiler den Aufruf für Entwürfe verweigert.

### 49. Trait 'Drawable'
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Drawable` mit der Methode `draw(&self)`.
- **Modul 2 (Implementierung & Methoden):** Implementiere dieses Trait für ein Struct `Circle` und ein Struct `Square`, die jeweils ihre Eigenschaften (z.B. Radius, Seitenlänge) auf einer simulierten Text-Leinwand ausgeben.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeichne im Hauptprogramm eine Liste verschiedener geometrischer Formen auf der Konsole.

### 50. Trait 'Validator'
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Validator` mit einer Methode `validate(&self) -> Result<(), String>`.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für ein Struct `Email` (Überprüfung auf das '@'-Zeichen) und ein Struct `Password` (Überprüfung auf eine Mindestlänge).
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Registrierungsformular in `main.rs`, das die Eingaben mithilfe des Traits validiert und Fehlermeldungen ausgibt.

---

## 3. Lifetimes-Fokus

### 51. Referenz-Wrapper
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `BorrowedNumber<'a>`, das eine Referenz auf eine Zahl vom Typ `i32` hält. Annotiere die Struktur korrekt mit der Lifetime `'a`.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine Methode `get_value` und einen `impl`-Block, der ebenfalls die Lifetime `'a` verwendet.
- **Modul 3 (Vollendung & Hauptprogramm):** Teste im Hauptprogramm, dass der Wrapper nicht länger existieren kann als die Variable, auf die er verweist.

### 52. Text-Parser
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `WordSplitter<'a>`, die eine Referenz auf einen langen Text hält und eine Liste von Referenzen (`&'a str`) auf einzelne Wörter speichert.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Methode `split`, die den Text analysiert und die Wort-Referenzen ohne Kopieren in der Struktur ablegt.
- **Modul 3 (Vollendung & Hauptprogramm):** Gib im Hauptprogramm die extrahierten Wörter aus und demonstriere, dass der Originaltext während der gesamten Lebensdauer des Splitters im Speicher bleibt.

### 53. Zwei Referenzen, gleiche Lifetime
- **Modul 1 (Basis-Datenstrukturen):** Schreibe die Signatur einer Funktion `longest<'a>(x: &'a str, y: &'a str) -> &'a str`.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Funktion so, dass sie die Länge der beiden Strings vergleicht und den längeren String-Slice zurückgibt.
- **Modul 3 (Vollendung & Hauptprogramm):** Rufe die Funktion mit Variablen unterschiedlicher Gültigkeitsbereiche auf und analysiere, wie der Compiler die Lebensdauer des Rückgabewerts bestimmt.

### 54. Zwei Referenzen, verschiedene Lifetimes
- **Modul 1 (Basis-Datenstrukturen):** Schreibe die Signatur einer Funktion `select_first<'a, 'b>(x: &'a str, y: &'b str) -> &'a str`.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Funktion so, dass sie immer die erste Referenz zurückgibt. Überlege dir, warum die Lebensdauer des zweiten Arguments (`'b`) unabhängig sein darf.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere in `main.rs`, dass der Rückgabewert auch dann noch gültig ist, wenn die Variable für das zweite Argument bereits ungültig geworden ist.

### 55. Die statische Lifetime (`'static`)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `ConfigManager`, die eine Referenz mit der Lifetime `'static` hält (z.B. einen globalen Info-Text).
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Auslesen dieser statischen Daten.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm, wie du String-Literale (die standardmäßig `'static` sind) an den Manager übergibst und warum diese das gesamte Programm über leben.

### 56. Struktur mit String-Referenz
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `User<'a>` mit einem Feld `username: &'a str`.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine Methode `greet(&self)` zur Ausgabe einer Begrüßung.
- **Modul 3 (Vollendung & Hauptprogramm):** Erzeuge einen User im Hauptprogramm, dessen Name aus einer Benutzereingabe stammt, und demonstriere die Lebensdauerbindung.

### 57. Lifetime Elision Rules
- **Modul 1 (Basis-Datenstrukturen):** Schreibe drei verschiedene Funktionen mit Referenzen in den Signaturen (z.B. `first_word(s: &str) -> &str`), ohne Lebensdauern explizit anzugeben.
- **Modul 2 (Implementierung & Methoden):** Implementiere diese Funktionen und füge Kommentare hinzu, die erklären, welche Lifetime-Regeln der Compiler hier automatisch anwendet.
- **Modul 3 (Vollendung & Hauptprogramm):** Rufe diese Funktionen im Hauptprogramm auf und veranschauliche das fehlerfreie Kompilieren.

### 58. Iterator mit Lifetime
- **Modul 1 (Basis-Datenstrukturen):** Entwirf einen eigenen Iterator `ReferenceIterator<'a, T>`, der Referenzen auf Elemente einer Liste liefert.
- **Modul 2 (Implementierung & Methoden):** Implementiere das `Iterator`-Trait mit dem Typ `Item = &'a T` für dieses Struct.
- **Modul 3 (Vollendung & Hauptprogramm):** Nutze den Iterator in einer Schleife in `main.rs` und zeige, dass die ausgeliehenen Elemente nicht verändert werden können, solange der Iterator aktiv ist.

### 59. Referenzen in Enums
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Enum `Token<'a>` mit Varianten wie `Identifier(&'a str)`, `Number(i32)` und `Operator(&'a str)`.
- **Modul 2 (Implementierung & Methoden):** Schreibe eine Hilfsmethode, um den Inhalt des Tokens als String-Repräsentation zurückzugeben.
- **Modul 3 (Vollendung & Hauptprogramm):** Zerlege im Hauptprogramm einen mathematischen Ausdruck in eine Liste von solchen Tokens und gib diese aus.

### 60. Nested Lifetimes (Lebensdauer-Hierarchien)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Manager<'a, 'b>` (mit `'a: 'b`), das eine Referenz auf ein Objekt hält, welches wiederum eine Referenz der Lebensdauer `'b` besitzt.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zur Datenabfrage über diese Hierarchie hinweg.
- **Modul 3 (Vollendung & Hauptprogramm):** Baue ein Szenario auf, bei dem Daten über zwei unterschiedliche Scopes hinweg referenziert werden, und zeige die Einhaltung der Lebensdauerregeln.
### 61. Rückgabe einer Referenz aus einer Methode
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `DataHolder` mit einem privaten Feld für einen String.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine Methode `get_ref<'a>(&'a self) -> &'a str` im `impl`-Block. Überlege dir, wie Rusts automatische Zuweisung (Elision) hier wirkt und wie du sie explizit deklarierst.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm, wie du die Referenz liest und dass sie nicht mehr verwendet werden kann, sobald das `DataHolder`-Objekt gelöscht wird.

### 62. Konfigurations-Reader mit Lifetime
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `ConfigReader<'a>` mit einem Feld für die Rohdaten des Konfigurations-Strings.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden, die bestimmte Schlüssel (z.B. "port=") im Rohdaten-String suchen und den Wert als Referenz (`&'a str`) zurückgeben.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere im Hauptprogramm das effiziente Parsen einer Einstellungsdatei ohne zusätzliche Speicherallokationen für die Werte.

### 63. Log-Filter
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `LogFilter<'a>` zur Filterung großer Log-Dateien.
- **Modul 2 (Implementierung & Methoden):** Schreibe eine Methode `filter`, die Zeilen mit bestimmten Schlüsselwörtern (wie "ERROR") heraussucht und Referenzen auf diese Zeilen in einem Vektor speichert.
- **Modul 3 (Vollendung & Hauptprogramm):** Gib die gefilterten Fehlerzeilen im Hauptprogramm aus und zeige, dass der ursprüngliche Log-String im Speicher bleiben muss.

### 64. Tokenisierer für Compiler
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Tokenizer<'a>`, das den Quellcode-Text als Referenz speichert.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine Methode `next_token`, die die nächste Sinneinheit (z.B. ein Schlüsselwort oder eine Zahl) als Enum-Variante mit Lifetime-Referenz zurückgibt.
- **Modul 3 (Vollendung & Hauptprogramm):** Tokenisiere eine kleine Beispiel-Codezeile in `main.rs` und gib die generierten Tokens aus.

### 65. Subtyping bei Lifetimes (`'a: 'b`)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `Wrapper<'a>` und eine Funktion `assign<'a, 'b>(x: &mut Wrapper<'a>, y: Wrapper<'b>)`.
- **Modul 2 (Implementierung & Methoden):** Nutze das Lifetime-Subtyping `'b: 'a` (Lebensdauer `'b` muss mindestens so lang wie `'a` sein), um die Zuweisung kompilierbar zu machen.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe ein Hauptprogramm, das dieses Verhalten verdeutlicht und demonstriere, was passiert, wenn die Lebensdauer-Einschränkung nicht erfüllt ist.

### 66. Generischer Typ mit Lifetime-Bound (`T: 'a`)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `RefHolder<'a, T>`, das einen generischen Typ `T` speichert.
- **Modul 2 (Implementierung & Methoden):** Schränke den generischen Typen mit `T: 'a` ein, damit `T` Referenzen enthalten darf, die mindestens so lange wie `'a` leben.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere in `main.rs` das sichere Speichern von generischen Typen mit internen Referenzen im `RefHolder`.

### 67. Lifetime im Trait-Objekt
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `TextProcessor` mit einer Methode `process(&self)`.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für ein Struct `WordPrinter<'a>`, das eine String-Referenz speichert. Verwende für die dynamische Übergabe den Typ `Box<dyn TextProcessor + 'a>`.
- **Modul 3 (Vollendung & Hauptprogramm):** Verwalte eine Liste solcher Trait-Objekte im Hauptprogramm und führe sie aus.

### 68. Einfacher Cache mit Referenzen
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `ReferenceCache<'a, K, V>`, das Referenzen auf berechnete Werte speichert.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Hinzufügen und Abrufen von Einträgen. Stelle sicher, dass die Lebensdauer der Werte korrekt deklariert ist.
- **Modul 3 (Vollendung & Hauptprogramm):** Teste den Cache im Hauptprogramm mit temporären Objekten und zeige die Einhaltung der Gültigkeitsbereiche.

### 69. URL-Parser
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `ParsedUrl<'a>` mit Feldern wie `protocol`, `domain` und `path`, die alle als `&'a str` auf eine Original-URL verweisen.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine Methode `parse`, die eine URL analysiert und die Referenzen extrahiert.
- **Modul 3 (Vollendung & Hauptprogramm):** Zerlege im Hauptprogramm mehrere URLs und gib die extrahierten Abschnitte aus.

### 70. AST-Knoten (Abstract Syntax Tree)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Enum `AstNode<'a>` für einen Syntaxbaum, bei dem jeder Knoten (z.B. Variablenname, Funktionsname) Referenzen auf den Originalquellcode enthält.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zur rekursiven Auswertung des Baumes.
- **Modul 3 (Vollendung & Hauptprogramm):** Baue in `main.rs` einen kleinen Baum manuell auf und evaluiere ihn.

### 71. Referenzierte JSON-Keys
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `JsonKeyValue<'a>` zur Speicherung von JSON-Schlüssel-Wert-Paaren als Referenzen auf einen String.
- **Modul 2 (Implementierung & Methoden):** Implementiere einen einfachen Such- und Extraktions-Algorithmus für JSON-Strukturen.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere im Hauptprogramm die Extraktion von Schlüsseln und Werten aus einem Test-JSON-String ohne Speicherallokationen.

### 72. Zeilen-Gruppierer
- **Modul 1 (Basis-Datenstrukturen):** Entwirf eine Struktur `LineGroup<'a>` zur Gruppierung von Zeilen.
- **Modul 2 (Implementierung & Methoden):** Schreibe eine Methode, die Textzeilen analysiert und in einer `HashMap<String, Vec<&'a str>>` nach bestimmten Kriterien (z.B. Zeilenlänge oder Anfangsbuchstabe) gruppiert.
- **Modul 3 (Vollendung & Hauptprogramm):** Gruppiere einen mehrzeiligen Text im Hauptprogramm und gib die Gruppen übersichtlich aus.

### 73. Zirkuläre Referenzen vermeiden
- **Modul 1 (Basis-Datenstrukturen):** Entwirf zwei Strukturen `NodeA` und `NodeB`, die versuchen, sich gegenseitig direkt zu referenzieren.
- **Modul 2 (Implementierung & Methoden):** Dokumentiere im Code ausführlich, warum der Compiler dies verhindert und wie man das Problem mithilfe von `Weak`-Referenzen oder Indizes in einem gemeinsamen Vektor umgeht.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm die funktionierende Alternative (z.B. über Vektor-Indizes) ohne zirkuläre Referenzfehler.

### 74. Text-Highlighter
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Highlight<'a>` mit der Position und einer Referenz auf den gefundenen Suchbegriff.
- **Modul 2 (Implementierung & Methoden):** Schreibe eine Suchfunktion, die alle Vorkommen eines Suchbegriffs in einem Text analysiert und eine Liste von `Highlight`-Objekten zurückgibt.
- **Modul 3 (Vollendung & Hauptprogramm):** Formatiere den Text im Hauptprogramm basierend auf den gefundenen Highlights (z.B. durch Einfügen von Sternchen um die Wörter) und gib ihn aus.

### 75. Befehlszeilen-Argument-Parser
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `ArgParser<'a>` mit einer Liste von erwarteten Optionen und den übergebenen Argumenten als Referenzen auf die originalen Systemargumente.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine Methode `parse`, die die Argumente analysiert und die gefundenen Parameter zuordnet.
- **Modul 3 (Vollendung & Hauptprogramm):** Initialisiere den Parser in `main.rs` mit Argumenten und zeige das korrekte Auslesen von Flags.

---

## 4. Kombinations-Projekte

### 76. Generisches Repository mit Lifetime
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Repository<T>` und ein Struct `DbRepository<'a, T>`, das eine Referenz auf eine temporäre Datenbankverbindung hält.
- **Modul 2 (Implementierung & Methoden):** Implementiere das Trait für dein Struct unter Einhaltung der Lebensdauer-Annotationen für die Verbindung und die generischen Typen.
- **Modul 3 (Vollendung & Hauptprogramm):** Simuliere Datenbankabfragen für unterschiedliche Datenmodelle in `main.rs`.

### 77. Eigener generischer Iterator mit Lebensdauer
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein generisches Struct `CustomIter<'a, T>`, das über ein Array von Elementen iteriert.
- **Modul 2 (Implementierung & Methoden):** Implementiere das `Iterator`-Trait, sodass es Referenzen der Form `&'a T` zurückgibt.
- **Modul 3 (Vollendung & Hauptprogramm):** Nutze den Iterator im Hauptprogramm mit verschiedenen Datentypen und führe Filter- und Map-Operationen aus.

### 78. Generischer Event-Listener mit Lifetimes
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `EventManager<'a, E>`, das Event-Listener (Traits) als Referenzen mit der Lebensdauer `'a` speichert.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Registrierung und den Dispatch von Events an alle Listener.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm, dass Listener vor dem Event-Manager existieren müssen und Events korrekt empfangen.

### 79. Generischer AST-Parser
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `AstParser<'a, Op>` für mathematische Ausdrücke, das generische Operatortypen `Op` und Referenzen auf den Quelltext hält.
- **Modul 2 (Implementierung & Methoden):** Schreibe die Parsing-Logik, die den Eingabetext in einen AST überführt.
- **Modul 3 (Vollendung & Hauptprogramm):** Parse im Hauptprogramm Ausdrücke und gib den aufgebauten Baum strukturiert aus.

### 80. Typ-sicheres Transaktions-System
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Executable` und ein generisches Struct `Transaction<'a, T>`, das eine Referenz auf das zu belastende Konto enthält.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Ausführungslogik für verschiedene Kontotypen (z.B. Sparkonto, Girokonto).
- **Modul 3 (Vollendung & Hauptprogramm):** Simuliere im Hauptprogramm Transaktionen und behandle Fehler wie unzureichende Deckung.
### 81. Generischer Graph-Algorithmus
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Graph` mit Methoden zur Abfrage von Nachbarn eines Knotens.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine generische Funktion `breadth_first_search<G: Graph>(graph: &G, start: G::Node)` zur Durchführung einer Breitensuche.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige die Funktionsweise der Breitensuche in `main.rs` an zwei verschiedenen Graphenstrukturen.

### 82. Generischer Serialisierer mit Lebensdauer
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Serializer<'a>` mit einer Methode `serialize_to_slice(&self) -> &'a [u8]`.
- **Modul 2 (Implementierung & Methoden):** Implementiere dieses Trait für verschiedene Datenstrukturen, sodass sie direkt Referenzen auf ihre internen Puffer zurückgeben, anstatt neue Vektoren zu allozieren.
- **Modul 3 (Vollendung & Hauptprogramm):** Teste im Hauptprogramm das Serialisieren mehrerer Objekte und gib die resultierenden Byte-Slices formatiert aus.

### 83. Generische Cache-Struktur mit Validierungs-Trait
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Validator<T>` mit einer Gültigkeitsprüfung und ein Struct `ValidatedCache<'a, T: 'a, V>`, das Einträge mit einer bestimmten Lebensdauer und einem Validator `V` hält.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Schreiben und Lesen, bei denen ungültige Einträge automatisch verworfen werden.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere in `main.rs` das Verhalten des Caches, wenn Werte ablaufen oder ungültig werden.

### 84. Dependency-Injection-Container
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Container` zur Registrierung von Abhängigkeiten.
- **Modul 2 (Implementierung & Methoden):** Implementiere generische Methoden `register<T>` und `resolve<T>() -> Option<Box<T>>` (oder unter Verwendung von Trait-Objekten).
- **Modul 3 (Vollendung & Hauptprogramm):** Simuliere ein einfaches Web-Framework im Hauptprogramm, bei dem Services (wie ein `DatabaseService`) über den Container aufgelöst und bereitgestellt werden.

### 85. Generischer Query-Builder mit Lifetime
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `QueryBuilder<'a>` mit einer SQL-Vorlage und einer Liste von Parametern als Referenzen `&'a str`.
- **Modul 2 (Implementierung & Methoden):** Implementiere Methoden zum Hinzufügen von Parametern und zum Generieren der finalen Abfrage unter sicherer Kapselung der Lebensdauern.
- **Modul 3 (Vollendung & Hauptprogramm):** Baue in `main.rs` eine SQL-Abfrage dynamisch zusammen und gib sie aus.

### 86. Generische Pipeline
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `PipelineStep<Input, Output>` mit einer Methode `process`.
- **Modul 2 (Implementierung & Methoden):** Implementiere ein Struct `Pipeline<'a, T>`, das mehrere Schritte verkettet und Daten als Referenzen durchreicht.
- **Modul 3 (Vollendung & Hauptprogramm):** Baue eine Datenverarbeitungspipeline (z.B. Text filtern, in Großbuchstaben umwandeln, Wörter zählen) in `main.rs` auf und teste sie.

### 87. Generischer State-Pattern-Automat
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `State<T>` für die Zustände eines Spielobjekts vom Typ `T`.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Übergangslogik im Zustand und im Spielobjekt. Die Zustände können generische Daten halten.
- **Modul 3 (Vollendung & Hauptprogramm):** Simuliere im Hauptprogramm einen Spielercharakter mit den Zuständen `Stehend`, `Laufend` und `Springend` und steuere diesen über Benutzereingaben.

### 88. Plugin-System
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Plugin<'a>` mit einer Methode `run(&self, context: &'a Context)`.
- **Modul 2 (Implementierung & Methoden):** Implementiere ein Struct `PluginManager<'a>`, das Plugins speichert und ausführt.
- **Modul 3 (Vollendung & Hauptprogramm):** Schreibe zwei verschiedene Plugins (z.B. für Logging und Analyse) und führe sie im Hauptprogramm über den Manager aus.

### 89. Generische Suchmaschine
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Indexable` und ein Struct `SearchIndex<'a, T>`, das Dokumente indiziert.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Indizierungs- und Suchmethoden. Die Suchergebnisse sollen als Referenzen auf die Originaldokumente zurückgegeben werden.
- **Modul 3 (Vollendung & Hauptprogramm):** Indiziere im Hauptprogramm verschiedene Dokumententypen (z.B. Artikel und E-Mails) und zeige Suchergebnisse an.

### 90. Generisches Daten-Diff-Tool
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `Diff<'a, T>`, das die Unterschiede zwischen zwei Kollektionen als Referenzen auf die geänderten Elemente darstellt.
- **Modul 2 (Implementierung & Methoden):** Implementiere eine generische Funktion `compare<'a, T: PartialEq>(old: &'a [T], new: &'a [T]) -> Vec<Diff<'a, T>>`.
- **Modul 3 (Vollendung & Hauptprogramm):** Berechne im Hauptprogramm die Unterschiede zwischen zwei Wortlisten und gib sie übersichtlich aus.

---

## 5. Fortgeschrittene Szenarien

### 91. Dyn Traits vs. Impl Traits
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `Formatter` mit einer Formatierungsmethode.
- **Modul 2 (Implementierung & Methoden):** Schreibe zwei Funktionen zur Ausgabe: eine mit statischem Dispatch (`impl Formatter`) und eine mit dynamischem Dispatch (`Box<dyn Formatter>`). Erkläre den Unterschied im Code.
- **Modul 3 (Vollendung & Hauptprogramm):** Miss im Hauptprogramm die Ausführungszeit der beiden Varianten oder zeige ihre unterschiedliche Handhabung bei der Zuweisung.

### 92. Thread-Safety mit Send & Sync
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `UnsafeData`, das interne Zeiger verwendet und daher standardmäßig nicht `Send` oder `Sync` ist.
- **Modul 2 (Implementierung & Methoden):** Zeige im Code, wie der Compiler Fehler ausgibt, wenn versucht wird, dieses Struct an einen anderen Thread zu übergeben. Implementiere anschließend die Traits manuell (unter Einhaltung der Sicherheitsrichtlinien).
- **Modul 3 (Vollendung & Hauptprogramm):** Übergebe das modifizierte Struct an einen Thread in `main.rs` und starte eine parallele Berechnung.

### 93. Smart Pointer & Lifetimes (Rc/Arc)
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `SharedNode`, das über `Rc<RefCell<...>>` (für Single-Threaded) oder `Arc<Mutex<...>>` (für Multi-Threaded) geteilten Zugriff ermöglicht.
- **Modul 2 (Implementierung & Methoden):** Implementiere veränderliche Zugriffsoperationen auf die geteilten Daten.
- **Modul 3 (Vollendung & Hauptprogramm):** Demonstriere im Hauptprogramm den sicheren Zugriff aus mehreren Programmteilen oder Threads heraus.

### 94. Assoziierte Typen vs. Generics im Trait
- **Modul 1 (Basis-Datenstrukturen):** Definiere zwei alternative Versionen eines Traits `Converter`: einmal mit einem assoziierten Typen (`type Output`) und einmal mit einem generischen Typparameter (`Converter<Output>`).
- **Modul 2 (Implementierung & Methoden):** Implementiere beide Versionen für ein Struct und vergleiche die Handhabung bei der Implementierung mehrerer Konvertierungen.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm, wie sich die Syntax beim Aufruf der beiden Implementierungen unterscheidet, und dokumentiere die Vor- und Nachteile.

### 95. Blanket Implementations
- **Modul 1 (Basis-Datenstrukturen):** Definiere zwei Traits: `Logger` und `ExtendedLogger`.
- **Modul 2 (Implementierung & Methoden):** Schreibe eine Blanket-Implementation, die `ExtendedLogger` automatisch für jeden Typen implementiert, der bereits `Logger` implementiert.
- **Modul 3 (Vollendung & Hauptprogramm):** Implementiere nur `Logger` für ein Struct `SimpleLog` und zeige im Hauptprogramm, dass dieses sofort alle Methoden von `ExtendedLogger` nutzen kann.

### 96. GATs (Generic Associated Types)
- **Modul 1 (Basis-Datenstrukturen):** Definiere ein Trait `StreamingIterator`, das einen assoziierten Typen besitzt, welcher selbst einen Lifetime-Parameter akzeptiert (`type Item<'a> where Self: 'a`).
- **Modul 2 (Implementierung & Methoden):** Implementiere diesen Streaming-Iterator für einen Puffer, sodass `next` Referenzen mit der Lebensdauer der aktuellen Iteration zurückgeben kann.
- **Modul 3 (Vollendung & Hauptprogramm):** Verwende den Streaming-Iterator im Hauptprogramm in einer Schleife und veranschauliche den Unterschied zu einem Standard-Iterator.

### 97. Covariance & Contravariance
- **Modul 1 (Basis-Datenstrukturen):** Schreibe Code-Beispiele mit unterschiedlichen Lebensdauern (z.B. `'static` und eine kürzere Lifetime `'a`).
- **Modul 2 (Implementierung & Methoden):** Erkläre im Code, warum man eine Referenz mit `'static` an eine Funktion übergeben darf, die nur `'a` erwartet (Kovarianz), und warum dies bei veränderlichen Referenzen (`&mut T`) nicht immer möglich ist (Invarianz).
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige Compiler-Fehlermeldungen im Hauptprogramm, die durch Invarianz bei veränderlichen Referenzen entstehen, und erkläre die Fehlerdidaktik.

### 98. Trait-Bounds mit HRTBs (Higher-Rank Trait Bounds)
- **Modul 1 (Basis-Datenstrukturen):** Schreibe die Signatur einer Funktion, die eine Closure akzeptiert. Verwende die Syntax `for<'a> Fn(&'a str) -> &'a str`.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Funktion so, dass sie die übergebene Closure mit temporären Strings aufruft, deren Lebensdauer erst innerhalb der Funktion beginnt.
- **Modul 3 (Vollendung & Hauptprogramm):** Rufe die Funktion im Hauptprogramm mit einer passenden Closure auf und zeige das Zusammenspiel der Lifetimes.

### 99. PhantomData im Detail
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `TokenStore<T>` mit `PhantomData<T>`, das vorgibt, einen Typen `T` zu verwalten, ohne diesen tatsächlich zu speichern (z.B. zur Berechtigungsprüfung).
- **Modul 2 (Implementierung & Methoden):** Implementiere Zugriffsmethoden, die je nach Typ `T` (z.B. `Admin` oder `User`) unterschiedliche Rechte vergeben.
- **Modul 3 (Vollendung & Hauptprogramm):** Zeige im Hauptprogramm, dass der Compiler den Zugriff verweigert, wenn ein nicht autorisierter Typ verwendet wird.

### 100. Eigener Smart Pointer
- **Modul 1 (Basis-Datenstrukturen):** Entwirf ein Struct `MyBox<T>`, das intern einen Zeiger auf einen auf dem Heap alloziierten Wert hält.
- **Modul 2 (Implementierung & Methoden):** Implementiere die Traits `std::ops::Deref` und `std::ops::DerefMut` für den transparenten Zugriff auf die inneren Daten sowie das `Drop`-Trait zur Speicherbereinigung.
- **Modul 3 (Vollendung & Hauptprogramm):** Verwende deinen Smart Pointer in `main.rs` wie einen Standard-Box-Zeiger und zeige, dass der Heap-Speicher beim Verlassen des Scopes automatisch freigegeben wird.
