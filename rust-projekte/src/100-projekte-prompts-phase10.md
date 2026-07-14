# Prompt-Katalog Phase 10: Makros & Metaprogrammierung
## Projekte 1–20: Deklarative Makros (Mustervergleich)

---

## Projekt 1: Einfaches Logging-Makro

### Modul 1: Basis-Datenstrukturen
- Welche Makro-Art brauchst du hier – `macro_rules!` oder ein prozedurales Makro? Warum reicht ersteres für diesen Fall aus?
- Welchen Designator verwendest du, um einen beliebigen Ausdruck als Argument entgegenzunehmen – `expr`, `ident` oder `tt`?
- Welche eingebauten Makros liefern dir zur Laufzeit den Dateinamen (`file!()`) und die Zeilennummer (`line!()`)? Wo sind diese definiert?
- Wie kannst du den Typ eines Wertes zur Laufzeit ermitteln? Gibt es dafür eine Standardfunktion in Rust?

### Modul 2: Implementierung & Methoden
- Wie definierst du in `macro_rules!` ein Muster, das genau einen `expr`-Designator akzeptiert? Wie sieht die grundlegende Syntax aus?
- Damit der übergebene Ausdruck nur **einmal** ausgewertet wird, solltest du ihn in eine lokale Variable binden. Wie würdest du das innerhalb des Makros erreichen?
- Wie kannst du mehrere Werte (Typ, Dateiname, Zeile) in einem einzigen `println!`-Aufruf ausgeben?
- Das Makro soll den Wert **unverändert zurückliefern**. Welche Art von Ausdruck muss der Makrorkörper als letztes enthalten, damit das funktioniert?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro in `main.rs` mit verschiedenen Typen (Integer, String, Bool) auf, um sicherzustellen, dass es generisch funktioniert?
- Wie schreibst du einen `#[test]`, der prüft, ob der Rückgabewert des Makros mit dem ursprünglichen Eingabewert übereinstimmt?
- Mit `cargo expand` kannst du sehen, welchen Code dein Makro tatsächlich generiert. Wie installierst du `cargo-expand` und was verrät dir die Ausgabe?
- Welche Grenzen hat `macro_rules!` bei der Typbestimmung zur Compilezeit im Vergleich zu prozeduralen Makros?

---

## Projekt 2: Mathematische Quadrierung

### Modul 1: Basis-Datenstrukturen
- Welchen Designator benötigst du, damit dein Makro einen beliebigen mathematischen Ausdruck (z. B. `2 + 3`) als Ganzes akzeptiert?
- Warum ist es bei einem Makro, das einen Ausdruck quadriert, besonders wichtig, doppelte Auswertung zu vermeiden? Denke an Ausdrücke mit Seiteneffekten.
- Benötigst du für dieses Projekt externe Crates, oder genügen die Sprachmittel von Rust selbst?
- Welchen numerischen Trait müsste der Typ implementieren, damit die Multiplikation funktioniert – und muss dein Makro das überhaupt erzwingen?

### Modul 2: Implementierung & Methoden
- Wie bindest du innerhalb des Makros den übergebenen Ausdruck an eine temporäre Variable, bevor du ihn multiplizierst?
- Welche Syntax verwendest du in `macro_rules!`, um die gebundene Variable anschließend mit sich selbst zu multiplizieren?
- Was passiert, wenn du den Ausdruck direkt (ohne Zwischenvariable) zweimal im Makrokörper einfügst? Wann wäre das ein Problem?
- Wie stellst du sicher, dass der gesamte Makrokörper als ein einziger Ausdruck gilt, damit er an einer Stelle wie `let x = quadriere!(2 + 3);` verwendet werden kann?

### Modul 3: Vollendung & Hauptprogramm
- Teste dein Makro mit einfachen Werten, aber auch mit Ausdrücken, die eine Funktion aufrufen. Welches Verhalten erwartest du jeweils?
- Wie überzeugst du dich mit `cargo expand`, dass der Ausdruck wirklich nur einmal im generierten Code vorkommt?
- Schreibe einen `#[test]`, der das Ergebnis für bekannte Eingaben prüft (z. B. `quadriere!(5)` sollte `25` ergeben).
- Überlege: Könnte dein Makro auch mit Gleitkommazahlen umgehen, ohne Änderungen vornehmen zu müssen?

---

## Projekt 3: Typ-Alias-Generator

### Modul 1: Basis-Datenstrukturen
- Welche Designatoren brauchst du, um einen **Namen** (neuer Alias) und einen **bestehenden Typ** separat als Argumente entgegenzunehmen?
- Was ist der Unterschied zwischen den Designatoren `ident` und `ty` in `macro_rules!`? Wann verwendest du welchen?
- Welche Rust-Syntax erzeugst du im Makrokörper, um einen Typ-Alias zu definieren? Wie lautet das entsprechende Schlüsselwort?
- Welche Sichtbarkeits-Modifizierer (z. B. `pub`) könntest du optional unterstützen, und wie würde das die Makrodefinition beeinflussen?

### Modul 2: Implementierung & Methoden
- Wie sieht das Muster in `macro_rules!` aus, wenn du zwei Argumente verschiedener Designatoren (z. B. `ident` und `ty`) trennen willst?
- Welches Trennzeichen (`,`, `=>`, `:`) zwischen den Argumenten ist in `macro_rules!`-Mustern erlaubt, und welches wählt du für lesbare Aufrufsyntax?
- Wie erzeugst du im Makrokörper die eigentliche `type`-Deklaration mit den gematachten Bezeichnern?
- Wie kannst du das Makro erweitern, um mehrere Typ-Aliase in einem einzigen Aufruf zu erzeugen (Wiederholungssyntax `$(...),+`)?

### Modul 3: Vollendung & Hauptprogramm
- Wie verifizierst du in `main.rs`, dass der neue Typ-Alias tatsächlich wie der Originaltyp verwendbar ist?
- Schreibe einen `#[test]`, der eine Variable vom Alias-Typ anlegt und prüft, ob sie mit einer Variable des Originaltyps kompatibel ist.
- Was zeigt `cargo expand` für dein Makro, und entspricht es dem, was du erwartet hast?
- Welche Einschränkungen gibt es bei `macro_rules!` im Vergleich zu einem prozeduralen Makro, wenn du komplexere Generics im Typ-Alias unterstützen möchtest?

---

## Projekt 4: Conditional-Compilation-Helper

### Modul 1: Basis-Datenstrukturen
- Rust hat eingebaute Unterstützung für bedingte Kompilierung mit `#[cfg(...)]`. Warum könnte es trotzdem sinnvoll sein, ein Makro dafür zu schreiben?
- Welchen Designator verwendest du für einen Codeblock, der nur bei bestimmten Bedingungen kompiliert werden soll – `block` oder `tt`?
- Wie definierst du in Rust ein eigenes Kompilierungs-Flag (ein sogenanntes `cfg`-Feature)? Wo trägst du es ein?
- Brauchst du externe Crates für dieses Projekt, oder sind alle nötigen Werkzeuge in Rust eingebaut?

### Modul 2: Implementierung & Methoden
- Wie kannst du innerhalb von `macro_rules!` auf `#[cfg(debug_assertions)]` oder ein eigenes Feature reagieren? Schaue dir an, wie `cfg!()` als Makro funktioniert.
- Welche Muster-Alternativen (mehrere `=>` Arme) bietest du an – einen für den Fall, dass das Flag gesetzt ist, und einen für den anderen Fall?
- Wie übergibst du einen Code-Block als Argument an dein Makro, und wie fügst du ihn im generierten Code ein?
- Was ist der Unterschied zwischen dem Attribut `#[cfg(...)]` und dem Makro `cfg!(...)`? In welchem Kontext ist welches besser geeignet?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du das Makro für beide Fälle (Flag gesetzt / nicht gesetzt)? Welche Cargo-Optionen oder Feature-Flags brauchst du dafür?
- Schreibe einen `#[test]`, der mit und ohne das Debug-Flag unterschiedliche Ergebnisse prüft.
- Was offenbart `cargo expand` über die bedingte Struktur deines Makros?
- Überlege: Wo liegen die Grenzen eines solchen Makros gegenüber einer einfachen `if cfg!(...)` Abfrage im Code?

---

## Projekt 5: Standardwert-Zuweiser

### Modul 1: Basis-Datenstrukturen
- Welche Rust-Standardtypen sind relevant, wenn du mit optionalen Werten arbeitest, die entweder `Some(...)` oder `None` sein können?
- Welchen Designator verwendest du für den optionalen Wert (ein Ausdruck vom Typ `Option<T>`) und welchen für den Standardwert?
- Warum solltest du auch hier doppelte Auswertung vermeiden, obwohl es sich "nur" um eine Prüfung handelt?
- Gibt es in Rust bereits eine Methode auf `Option`, die ähnliches leistet? Welche wäre das, und was unterscheidet sie von deinem Makro?

### Modul 2: Implementierung & Methoden
- Wie formulierst du das Muster in `macro_rules!`, das zwei Ausdrücke (die Option und den Standardwert) entgegennimmt?
- Welche Rust-Kontrollstruktur oder welcher Ausdruck im Makrokörper prüft, ob der erste Wert `None` ist?
- Wie stellst du sicher, dass der Standardwert-Ausdruck nur ausgewertet wird, wenn er tatsächlich benötigt wird (lazy evaluation)?
- Wie formulierst du den Makrokörper so, dass er in beiden Fällen (Some und None) einen Wert zurückliefert?

### Modul 3: Vollendung & Hauptprogramm
- Teste dein Makro in `main.rs` mit `Some(42)`, `None` und einem Standardwert, der einen Funktionsaufruf enthält.
- Schreibe `#[test]`-Fälle für beide Zweige (Some-Pfad und None-Pfad).
- Überprüfe mit `cargo expand`, welchen Ausdruck dein Makro im generierten Code erzeugt.
- Vergleiche die Lesbarkeit deines Makros mit der direkten Verwendung von `.unwrap_or_else(|| ...)`. Wann wäre das Makro vorzuziehen?

---

## Projekt 6: Einfache JSON-Struktur

### Modul 1: Basis-Datenstrukturen
- Welche Rust-Datenstruktur eignet sich, um Schlüssel-Wert-Paare zu speichern, wie sie in einem JSON-Objekt vorkommen?
- Welchen Designator oder welche Kombination von Designatoren verwendest du, um mehrere Schlüssel-Wert-Paare in einem Makro-Aufruf zu erfassen?
- Die Crate `serde_json` bietet ähnliche Funktionalität. Schaust du dir an, wie `serde_json::json!` aussieht, als Inspiration – ohne es direkt zu kopieren?
- Welchen Typ sollen die Schlüssel und Werte in deiner Map haben – `String` und `String`, oder etwas Flexibleres?

### Modul 2: Implementierung & Methoden
- Wie verwendest du die Wiederholungssyntax `$( $key:expr => $val:expr ),*` in `macro_rules!`, um beliebig viele Schlüssel-Wert-Paare zu akzeptieren?
- Wie baust du im Makrokörper schrittweise eine `HashMap` auf und fügst die gematchten Paare ein?
- Wie trennst du im Muster den Schlüssel vom Wert – welches Zeichen eignet sich syntaktisch und sieht "JSON-ähnlich" aus?
- Was passiert, wenn du das Makro mit null Paaren aufrufst? Wie gehst du mit diesem Grenzfall um?

### Modul 3: Vollendung & Hauptprogramm
- Demonstriere in `main.rs` einen Aufruf deines Makros mit drei oder mehr Schlüssel-Wert-Paaren.
- Schreibe einen `#[test]`, der prüft, ob ein bestimmter Schlüssel in der zurückgegebenen Map vorhanden ist und den richtigen Wert hat.
- Was zeigt `cargo expand` für die Wiederholungssyntax – wie sieht der entfaltete Code aus?
- Überlege: Wie müsste das Makro erweitert werden, um auch verschachtelte Objekte zu unterstützen?

---

## Projekt 7: HTML-Tag-Wrapper

### Modul 1: Basis-Datenstrukturen
- Welche Typen spielen hier die Hauptrolle: Welchen Designator verwendest du für den Tag-Namen und welchen für den Textinhalt?
- Soll der Tag-Name ein Bezeichner (`ident`) oder ein String-Literal (`literal`) sein? Was sind die Vor- und Nachteile beider Ansätze?
- Was ist der Rückgabetyp deines Makros – ein `String`, ein `&str` oder etwas anderes?
- Brauchst du externe Crates, oder reicht `format!` aus der Standardbibliothek?

### Modul 2: Implementierung & Methoden
- Wie sieht das Muster in `macro_rules!` aus, das Tag-Name und Inhalt als separate Argumente akzeptiert?
- Wie verwendest du `format!` oder String-Konkatenation im Makrokörper, um den HTML-String zusammenzusetzen?
- Wie könntest du das Makro erweitern, damit es auch optionale HTML-Attribute (z. B. `class="..."`) unterstützt – mit Wiederholungssyntax?
- Was passiert, wenn der Tag-Name Sonderzeichen enthält? Solltest du das zur Compilezeit prüfen?

### Modul 3: Vollendung & Hauptprogramm
- Rufe das Makro in `main.rs` mit verschiedenen Tags (z. B. `div`, `p`, `span`) auf und gib die Ergebnisse aus.
- Schreibe einen `#[test]`, der prüft, ob das Ergebnis exakt dem erwarteten HTML-String entspricht.
- Überprüfe mit `cargo expand`, wie der generierte String-Ausdruck aussieht.
- Überlege: Wie würde ein prozedurales Makro hier helfen, wenn du den Tag-Namen zur Compilezeit validieren möchtest?

---

## Projekt 8: Automatischer Getter

### Modul 1: Basis-Datenstrukturen
- Welche Designatoren brauchst du, um den Struct-Namen, den Feldnamen und den Feldtyp als Argumente entgegenzunehmen?
- Was ist der Unterschied zwischen `ident` und `ty` – und warum brauchst du beide für dieses Makro?
- In welchem `impl`-Block wird die generierte Getter-Methode platziert? Wie siehst du das im Makrokörper vor?
- Soll der Getter eine Referenz (`&T`) oder einen geklonten Wert (`T`) zurückgeben? Was ist idiomatischer in Rust?

### Modul 2: Implementierung & Methoden
- Wie formulierst du das Muster, das Struct-Name, Feld-Name und Feld-Typ als drei separate Argumente akzeptiert?
- Wie erzeugst du im Makrokörper eine vollständige `impl`-Deklaration mit einer Methode – welche Syntax benötigst du?
- Wie leitest du den Rückgabewert der Methode aus dem Feld des Structs ab (z. B. `&self.feldname`)?
- Wie kannst du das Makro erweitern, um automatisch den Methodennamen aus dem Feldnamen abzuleiten (z. B. `get_feldname`)?

### Modul 3: Vollendung & Hauptprogramm
- Definiere in `main.rs` ein Beispiel-Struct und verwende dein Makro, um einen Getter zu generieren.
- Schreibe einen `#[test]`, der eine Instanz des Structs erstellt und den Getter aufruft.
- Was zeigt `cargo expand` für den generierten `impl`-Block?
- Überlege: Welche Grenzen hat `macro_rules!` hier im Vergleich zu `derive`-Makros?

---

## Projekt 9: Infix-zu-Postfix-Rechner

### Modul 1: Basis-Datenstrukturen
- Was versteht man unter Infix- und Postfix-Notation? Welche bekannte Methode wandelt Infix in Postfix um (Shunting-Yard-Algorithmus)?
- Welchen Designator verwendest du, um einen Token-Strom eines mathematischen Ausdrucks zu erfassen – `tt` oder `expr`?
- Wie komplex kann ein `macro_rules!`-Makro werden, bevor ein prozedurales Makro sinnvoller wäre? Wo siehst du die Grenze?
- Welche Datenstruktur bräuchtest du zur Laufzeit für einen Stack-basierten Ansatz?

### Modul 2: Implementierung & Methoden
- Wie kannst du mit `macro_rules!` zwischen verschiedenen Operatoren (`+`, `-`, `*`, `/`) in einem Token-Strom unterscheiden?
- Welche Rolle spielt die interne Akkumulator-Technik (ein versteckter Arm mit einem "Arbeits"-Puffer) in komplexen `macro_rules!`-Makros?
- Wie gibt dein Makro das Ergebnis zurück – als String, als Ausdruck, oder als etwas anderes?
- Ab welchem Punkt würdest du dieses Makro eher als prozedurales Makro (mit `proc_macro2` und `syn`) implementieren?

### Modul 3: Vollendung & Hauptprogramm
- Demonstriere in `main.rs` die Umwandlung einfacher Ausdrücke (z. B. `a + b * c`).
- Schreibe einen `#[test]` für einen bekannten Infix-Ausdruck und sein erwartetes Postfix-Ergebnis.
- Was offenbart `cargo expand` über die interne Struktur deines Makros?
- Überlege: Was würde passieren, wenn du versuchst, Klammern zu unterstützen?

---

## Projekt 10: Typ-Überprüfer

### Modul 1: Basis-Datenstrukturen
- Welchen Designator verwendest du, um einen Typ (nicht einen Wert) als Argument entgegenzunehmen?
- Was bedeutet "Typ-Gleichheit zur Compilezeit" in Rust? Gibt es einen eingebauten Mechanismus (z. B. über Traits), der prüft, ob zwei Typen identisch sind?
- Welche Rolle spielt der Trait `std::any::TypeId` oder ähnliche Konzepte für dieses Projekt?
- Brauchst du externe Crates, oder lässt sich das mit Rust-Boardmitteln lösen?

### Modul 2: Implementierung & Methoden
- Wie kannst du in `macro_rules!` zwei Typ-Argumente akzeptieren und ein Muster formulieren, das beide vergleicht?
- Ein Ansatz: Du erzeugst Code, der nur compiliert, wenn die Typen übereinstimmen (z. B. eine Zuweisung oder eine Funktion, die einen bestimmten Typ erwartet). Wie würde das aussehen?
- Wie kannst du einen aussagekräftigen Compile-Fehler erzeugen, wenn die Typen nicht übereinstimmen?
- Welche Grenzen hat ein rein auf `macro_rules!` basierender Ansatz für diese Aufgabe?

### Modul 3: Vollendung & Hauptprogramm
- Zeige in `main.rs` Beispiele, bei denen die Typen übereinstimmen (keine Compiler-Fehler) und bei denen sie es nicht tun (Compiler-Fehler erwartet).
- Wie kannst du das erwartete Scheitern eines Tests mit `compile_fail` in einem Doctest dokumentieren?
- Was zeigt `cargo expand` für dieses Makro?
- Überlege: Wo könntest du einen Typ-Überprüfer in einer echten Bibliothek sinnvoll einsetzen?

---

## Projekt 11: Einfacher Singleton-Generator

### Modul 1: Basis-Datenstrukturen
- Was ist ein Singleton-Muster, und warum ist es in Rust (mit seinem Ownership-Modell) komplizierter als in anderen Sprachen?
- Welche Rust-Typen ermöglichen eine sichere, einmalige Initialisierung – z. B. `std::sync::OnceLock` oder `std::sync::LazyLock`?
- Welchen Designator verwendest du für den Namen der statischen Variable und welchen für den Typ?
- Brauchst du externe Crates (z. B. `once_cell`), oder reichen die Typen aus `std` (ab Rust 1.70+)?

### Modul 2: Implementierung & Methoden
- Wie sieht das Muster in `macro_rules!` aus, das Name, Typ und einen Initialisierungsausdruck akzeptiert?
- Wie erzeugst du im Makrokörper eine `static`-Variable mit dem richtigen Typ (z. B. `OnceLock<T>` oder `LazyLock<T>`)?
- Wie generierst du gleichzeitig eine Zugriffsfunktion, die die statische Variable initialisiert, falls noch nicht geschehen?
- Wie handhabst du Thread-Sicherheit in deinem generierten Code?

### Modul 3: Vollendung & Hauptprogramm
- Demonstriere in `main.rs`, dass mehrere Aufrufe der Zugriffsfunktion immer dieselbe Instanz zurückliefern.
- Schreibe einen `#[test]`, der prüft, ob die Singleton-Instanz korrekt initialisiert ist.
- Was zeigt `cargo expand` für den generierten `static`-Block?
- Überlege: Welche Probleme könnten in einem Multithread-Kontext auftreten, und wie adressiert dein Makro diese?

---

## Projekt 12: Zustands-Prüfer

### Modul 1: Basis-Datenstrukturen
- Welche Designatoren brauchst du, um einen Enum-Wert (Ausdruck) und eine Enum-Variante (Bezeichner oder Pfad) zu akzeptieren?
- Was ist der Unterschied zwischen `ident` und `path` als Designator, wenn du eine Enum-Variante mit Pfad (z. B. `Status::Aktiv`) matchen willst?
- Was soll dein Makro zurückgeben – ein `bool`, oder soll es eine Aktion ausführen?
- Gibt es in Rust eine Alternative zu einem Makro für diesen Zweck (z. B. `matches!()`)? Wie verhält sich deine Lösung dazu?

### Modul 2: Implementierung & Methoden
- Wie formulierst du das Muster, um sowohl den Ausdruck als auch die Variante zu matchen?
- Welche Rust-Syntax im Makrokörper prüft, ob ein Enum-Wert einer bestimmten Variante entspricht (z. B. `if let` oder `matches!`)?
- Wie gehst du mit Varianten um, die Daten enthalten (Tuple-Varianten oder Struct-Varianten)?
- Schau dir das eingebaute `matches!`-Makro an: Was macht es, und wie unterscheidet sich deine Implementierung?

### Modul 3: Vollendung & Hauptprogramm
- Definiere in `main.rs` ein Beispiel-Enum mit mehreren Varianten und teste dein Makro für jede.
- Schreibe `#[test]`-Fälle, die `true` und `false` als Ergebnis erwarten.
- Was zeigt `cargo expand` für deinen generierten Prüf-Ausdruck?
- Überlege: Wann lohnt es sich, ein eigenes Makro zu schreiben, statt einfach `matches!` zu verwenden?

---

## Projekt 13: Konstanten-Definierer

### Modul 1: Basis-Datenstrukturen
- Welche Designatoren verwendest du, um eine Liste von Bezeichner-Wert-Paaren zu akzeptieren?
- Welche Wiederholungssyntax (`$(...),*` oder `$(...);*`) eignet sich für eine Liste von Konstantendefinitionen?
- Sollen die erzeugten Konstanten einen festen Typ haben, oder soll der Typ vom Wert abgeleitet werden? Was sind die Konsequenzen beider Ansätze?
- Müssen die Konstanten `pub` sein? Wie könntest du optional die Sichtbarkeit steuern?

### Modul 2: Implementierung & Methoden
- Wie definierst du ein `macro_rules!`-Muster, das beliebig viele `BEZEICHNER = WERT`-Paare akzeptiert?
- Wie erzeugst du im Makrokörper für jedes Paar eine separate `pub const`-Deklaration mit der Wiederholungssyntax?
- Wie legst du den Typ der Konstante fest – explizit oder implizit? Welchen Designator nutzt du für einen optionalen Typ-Parameter?
- Was passiert, wenn zwei Bezeichner denselben Namen haben? Wie reagiert der Compiler?

### Modul 3: Vollendung & Hauptprogramm
- Nutze dein Makro in `main.rs`, um eine Gruppe zusammengehöriger Konstanten (z. B. Konfigurationswerte) zu definieren.
- Schreibe `#[test]`-Fälle, die den Wert jeder generierten Konstante prüfen.
- Was zeigt `cargo expand` für die entfaltete Liste von Konstanten?
- Überlege: Wann wäre ein `enum` oder eine `struct` besser geeignet als eine Sammlung von Konstanten?

---

## Projekt 14: Sicheres Array-Lookup

### Modul 1: Basis-Datenstrukturen
- Welchen Typ gibt dein Makro zurück – `Option<T>` oder etwas anderes? Warum ist `Option` hier sinnvoll?
- Welche Designatoren verwendest du für das Array und den Index?
- Wie prüft man in Rust sicher, ob ein Index innerhalb der Grenzen eines Arrays liegt, ohne eine Panic auszulösen?
- Gibt es in Rust eine eingebaute Methode auf Slices, die bereits sicheres Indexieren bietet? Wie würde sich dein Makro davon unterscheiden?

### Modul 2: Implementierung & Methoden
- Wie formulierst du das `macro_rules!`-Muster, das Array und Index als getrennte Argumente akzeptiert?
- Welche Prüfung führst du im Makrokörper durch, bevor du auf das Element zugreifst?
- Wie lieferst du `Some(&element)` bzw. `None` zurück, je nach Ergebnis der Prüfung?
- Warum solltest du beide Argumente (Array und Index) in lokale Variablen binden, bevor du sie verwendest?

### Modul 3: Vollendung & Hauptprogramm
- Demonstriere in `main.rs` gültige und ungültige Indexzugriffe auf dasselbe Array.
- Schreibe `#[test]`-Fälle für den `Some`-Fall (gültiger Index) und den `None`-Fall (ungültiger Index).
- Was zeigt `cargo expand` für den generierten Prüf-Ausdruck?
- Vergleiche dein Makro mit der direkten Verwendung von `.get(index)` auf einem Slice. Was ist der Mehrwert?

---

## Projekt 15: SQL-Query-String-Validierung

### Modul 1: Basis-Datenstrukturen
- Was soll dein Makro prüfen – und zu welchem Zeitpunkt: zur Compilezeit oder zur Laufzeit?
- Welchen Designator verwendest du für einen String-Literal, der zur Compilezeit bekannt ist – `literal` oder `expr`?
- Welche eingebauten Makros oder Methoden helfen dir, einen String-Literal zur Compilezeit zu untersuchen?
- Brauchst du externe Crates, oder lässt sich die Prüfung mit `macro_rules!` allein realisieren?

### Modul 2: Implementierung & Methoden
- Wie kannst du in `macro_rules!` einen String-Literal als Muster matchen? Welche Grenzen gibt es dabei?
- Ein `macro_rules!`-Makro kann keine willkürliche String-Analyse zur Compilezeit durchführen. Welche Alternative gibt es für echte Compilezeit-Validierung (Stichwort: prozedurales Makro)?
- Wie kannst du mit einem `macro_rules!`-Makro zumindest zur Laufzeit prüfen, ob der String mit `SELECT` oder `INSERT` beginnt, und einen Fehler erzeugen?
- Wie verwendest du `compile_error!` oder `panic!`, um eine aussagekräftige Fehlermeldung zu produzieren?

### Modul 3: Vollendung & Hauptprogramm
- Zeige in `main.rs` gültige Queries (beginnend mit SELECT/INSERT) und was bei ungültigen Eingaben passiert.
- Schreibe `#[test]`-Fälle für gültige und ungültige Strings.
- Was zeigt `cargo expand` für dein Makro, und wo liegen die Grenzen?
- Überlege: Wie würde ein prozedurales Makro die Compilezeit-Validierung verbessern?

---

## Projekt 16: Struktur-Kopierer

### Modul 1: Basis-Datenstrukturen
- Welche Designatoren brauchst du für Quell-Struct, Ziel-Struct und die Liste der gemeinsamen Felder?
- Muss dein Makro wissen, welche Felder beide Structs haben? Oder übergibst du die Felder explizit als Argumente?
- Welche Wiederholungssyntax verwendest du, um eine Liste von Feldnamen zu akzeptieren?
- Was soll das Makro genau erzeugen – eine Zuweisung, eine Methode oder einen Ausdruck?

### Modul 2: Implementierung & Methoden
- Wie formulierst du das `macro_rules!`-Muster, das Quell-Ausdruck, Ziel-Ausdruck und eine kommagetrennte Liste von Feldnamen akzeptiert?
- Wie erzeugst du im Makrokörper für jedes Feld eine Zuweisung (`ziel.feld = quelle.feld;`) mit der Wiederholungssyntax?
- Wie bindest du Quell- und Ziel-Ausdruck in lokale Variablen, um Mehrdeutigkeiten zu vermeiden?
- Was passiert, wenn ein Feldname in einer der Strukturen nicht existiert? Wie reagiert der Compiler?

### Modul 3: Vollendung & Hauptprogramm
- Definiere in `main.rs` zwei Structs mit überlappenden Feldern und nutze dein Makro, um sie zu kopieren.
- Schreibe einen `#[test]`, der nach dem Kopieren die Werte der Felder in der Zielstruktur prüft.
- Was zeigt `cargo expand` für die generierten Zuweisungen?
- Überlege: Wann wäre eine `From`/`Into`-Implementierung oder ein `derive`-Makro (z. B. aus `derive_more`) besser geeignet?

---

## Projekt 17: Codeblock-Zeitmessung

### Modul 1: Basis-Datenstrukturen
- Welchen Designator verwendest du, um einen beliebigen Rust-Codeblock als Argument entgegenzunehmen?
- Welche Typen aus `std::time` brauchst du, um Ausführungszeiten zu messen?
- Soll das Makro den Rückgabewert des Codeblocks weiterleiten oder ignorieren?
- Brauchst du externe Crates, oder reicht `std::time::Instant` aus der Standardbibliothek?

### Modul 2: Implementierung & Methoden
- Wie formulierst du das Muster, das einen Block als `block`-Designator akzeptiert?
- Wie rufst du `Instant::now()` vor dem Block und `elapsed()` nach dem Block im Makrokörper auf?
- Wie stellst du sicher, dass der Rückgabewert des eingebetteten Blocks auch der Rückgabewert des gesamten Makro-Ausdrucks ist?
- Wie vermeidest du, dass die Zeitmessung selbst das Ergebnis des Blocks überschreibt?

### Modul 3: Vollendung & Hauptprogramm
- Umschließe in `main.rs` verschiedene Codeblöcke (einfache Berechnungen, Schleifen) mit deinem Makro.
- Schreibe einen `#[test]`, der prüft, dass das Makro den richtigen Rückgabewert des Blocks weitergibt.
- Was zeigt `cargo expand` für den generierten Timing-Code?
- Überlege: Wie könntest du optional einen Label-String mitgeben, der in der Ausgabe erscheint?

---

## Projekt 18: Assert mit Zusatznachricht

### Modul 1: Basis-Datenstrukturen
- Welche Designatoren brauchst du für den zu prüfenden Ausdruck und die Kontext-Nachricht?
- Wie verhält sich dein Makro im Erfolgsfall – soll es nichts tun, oder einen Wert zurückgeben?
- Schau dir das eingebaute `assert!`-Makro an: Was gibt es im Fehlerfall aus, und was möchtest du zusätzlich anzeigen?
- Welches Makro verwendest du intern, um das Programm im Fehlerfall zu beenden – `panic!`, `eprintln!` + `std::process::exit`, oder etwas anderes?

### Modul 2: Implementierung & Methoden
- Wie formulierst du das Muster, das einen Ausdruck und optional eine Fehlermeldung akzeptiert? Nutze Wiederholungssyntax für optionale Parameter.
- Wie wandelst du den Ausdruck in einen String um, damit du ihn im Fehlerfall ausgeben kannst (Stichwort: `stringify!`)?
- Wie integrierst du `file!()`, `line!()` und `column!()` in die Fehlermeldung?
- Wie baust du das Muster so, dass du auch ohne Nachricht eine vernünftige Fehlermeldung erhältst?

### Modul 3: Vollendung & Hauptprogramm
- Teste dein Makro in `main.rs` mit Ausdrücken, die wahr und die falsch sind.
- Schreibe einen `#[test]` mit `#[should_panic]`, der prüft, dass das Makro bei einem falschen Ausdruck abbricht.
- Was zeigt `cargo expand` für `stringify!(ausdruck)` und die Dateiangaben?
- Vergleiche deine Implementierung mit `assert!` und `assert_eq!` aus der Standardbibliothek.

---

## Projekt 19: Schnelle Enum-Erstellung

### Modul 1: Basis-Datenstrukturen
- Welche Designatoren verwendest du für den Enum-Namen und die Liste der Varianten?
- Welche Wiederholungssyntax akzeptiert eine kommagetrennte Liste von Bezeichnern als Varianten?
- Welche zusätzlichen Derives (z. B. `Debug`, `Clone`, `PartialEq`) möchtest du automatisch hinzufügen?
- Soll dein Makro auch Varianten mit Daten (z. B. Tupel-Varianten) unterstützen, oder zunächst nur einfache Unit-Varianten?

### Modul 2: Implementierung & Methoden
- Wie sieht das Muster in `macro_rules!` aus, das Name und eine kommagetrennte Variantenliste akzeptiert?
- Wie erzeugst du im Makrokörper die vollständige `enum`-Definition inklusive aller Varianten mit der Wiederholungssyntax?
- Wie fügst du `#[derive(...)]`-Attribute in den generierten Code ein?
- Wie erweiterst du das Muster, um optional Daten für jede Variante zu unterstützen (z. B. `($name:ident($ty:ty))`)?

### Modul 3: Vollendung & Hauptprogramm
- Nutze dein Makro in `main.rs`, um verschiedene Enums zu erstellen und mit ihnen zu arbeiten.
- Schreibe einen `#[test]`, der eine Instanz des generierten Enums erstellt und prüft.
- Was zeigt `cargo expand` für die generierte `enum`-Definition?
- Vergleiche die Lesbarkeit deines Makros mit einer manuellen Enum-Definition.

---

## Projekt 20: Umgebungsvariablen-Checker

### Modul 1: Basis-Datenstrukturen
- Was bedeutet "während des Kompilierens" – wann genau wird dein Makro ausgeführt, zur Buildzeit oder zur Laufzeit?
- Welchen Designator verwendest du für den Namen der Umgebungsvariable?
- Welche eingebauten Rust-Makros arbeiten zur Compilezeit mit Umgebungsvariablen? Schaue dir `env!` und `option_env!` an.
- Was soll dein Makro zurückgeben, wenn die Variable nicht existiert – einen Fehler, `None`, oder einen Standardwert?

### Modul 2: Implementierung & Methoden
- Wie nutzt du `option_env!` oder `env!` innerhalb deines eigenen `macro_rules!`-Makros?
- Wie erzeugst du mit `compile_error!` eine aussagekräftige Fehlermeldung, wenn die Variable fehlt?
- Wie kannst du einen Standardwert zurückgeben, falls die Variable nicht gesetzt ist, ohne einen Compilefehler zu erzeugen?
- Wie formulierst du das Muster, um optional einen Standardwert als zweites Argument zu akzeptieren?

### Modul 3: Vollendung & Hauptprogramm
- Demonstriere in `main.rs`, wie dein Makro eine vorhandene Umgebungsvariable ausliest (z. B. `PATH`).
- Wie setzt du beim Testen temporär eine Umgebungsvariable für die Buildzeit (z. B. in `.cargo/config.toml` oder mit `RUSTFLAGS`)?
- Was zeigt `cargo expand` für den generierten `env!`/`option_env!`-Aufruf?
- Überlege: Warum sind Buildzeit-Umgebungsvariablen nützlich, z. B. für Versionsnummern oder Feature-Flags?

---
## Projekte 21–40: Deklarative Makros (Wiederholungen & Listen)

---

## Projekt 21: Vektor-Builder mit Multiplikator

### Modul 1: Basis-Datenstrukturen
- Welche zwei Syntaxvarianten soll dein Makro unterstützen – eine mit einzelnen Werten und eine mit der `[wert; anzahl]`-Notation?
- Welche `macro_rules!`-Designatoren eignen sich für den Wert (z. B. `expr`) und für die Anzahl (z. B. `literal` oder `expr`)?
- Wie unterscheidest du in `macro_rules!` zwischen den zwei Armen – welche Trennzeichen (`()`, `[]`, `{}`) und Muster legst du fest?
- Wie sieht die interne Datenstruktur aus, die dein Makro erzeugt – ein `Vec<T>` oder ein Array?

### Modul 2: Implementierung & Methoden
- Wie kannst du in einem Makro-Arm für die `[wert; anzahl]`-Variante einen Vektor erzeugen, ohne direkt Code vorzugeben – welche Standardmethoden von `Vec` könntest du dafür nutzen?
- Wie verarbeitest du im ersten Arm eine variable Anzahl von Einzelwerten mit der `$(...),*`-Syntax?
- Welche Schwierigkeiten entstehen, wenn `anzahl` ein beliebiger Ausdruck ist – muss er zur Compile-Zeit bekannt sein?
- Wie stellst du sicher, dass beide Arme denselben Typ zurückgeben?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro in `main.rs` mit beiden Syntaxvarianten auf und überprüfst die Ausgabe?
- Wie testest du den Grenzfall `[wert; 0]` – was erwartest du als Ergebnis?
- Wie nutzt du `cargo expand` (oder das Crate `cargo-expand`), um den vom Makro generierten Code sichtbar zu machen?
- Welche Fehlermeldung erhältst du, wenn du einen unbekannten Arm verwendest, und wie liest du sie?

---

## Projekt 22: Map-Literal-Generator

### Modul 1: Basis-Datenstrukturen
- Welchen Designator verwendest du für Schlüssel und Wert – `expr`, `literal` oder `tt`? Wann ist `tt` (token tree) flexibler?
- Welches Trennzeichen wählst du für das `Key => Value`-Paar, und wie erklärt dir Rust, wenn du ein unbekanntes Symbol verwendest?
- Welcher Sammeltyp (`HashMap`, `BTreeMap`) eignet sich für ein Map-Literal, und wo liegt der Unterschied bei der Schlüsselsortierung?
- Wie viele Paare soll dein Makro mindestens akzeptieren – null, eins oder mehr?

### Modul 2: Implementierung & Methoden
- Wie sieht die Wiederholungs-Syntax in `macro_rules!` aus, um mehrere `key => value`-Paare durch Komma getrennt zu verarbeiten?
- Wie erzeugst du innerhalb des Makros eine neue, leere Map und befüllst sie in der Expansion – welche Methode verwendest du zum Einfügen?
- Wie stellst du sicher, dass alle Schlüssel und Werte denselben Typ haben – oder verzichtest du auf diese Einschränkung?
- Was passiert, wenn derselbe Schlüssel zweimal angegeben wird – wie verhält sich `HashMap` dabei?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du dein Makro mit verschiedenen Typen (z. B. `&str => i32` und `String => String`)?
- Wie überprüfst du mit `cargo expand`, ob der erzeugte Code wirklich `insert`-Aufrufe enthält?
- Wie verhält sich dein Makro, wenn du es mit null Paaren aufrufst – ergibt das eine leere Map oder einen Fehler?
- Wie dokumentierst du dein Makro mit einem `///`-Kommentar, damit andere Entwickler die Syntax verstehen?

---

## Projekt 23: Verschachtelter HTML-Builder

### Modul 1: Basis-Datenstrukturen
- Welche Makro-Designatoren brauchst du, um Tag-Namen (Bezeichner oder Literale) und Inhalte zu parsen?
- Wie stellst du dir die Eingabe-Syntax vor – z. B. `html! { div { p { "Text" } } }` – und welche Tokens sind dabei relevant?
- Welchen Rückgabetyp soll dein Makro haben – einen `String` oder einen eigenen Typ?
- Wie gehst du mit Attributen um – lässt du sie zunächst weg oder planst du sie von Anfang an ein?

### Modul 2: Implementierung & Methoden
- Wie verarbeitest du verschachtelte Ausdrücke in `macro_rules!` – reicht `tt` aus, oder brauchst du mehrere Arme?
- Wie baust du öffnende und schließende Tags in der String-Ausgabe zusammen?
- Wie gehst du mit dem rekursiven Aufruf des eigenen Makros für Kindelemente um?
- Welche Grenzen hat `macro_rules!` bei sehr tiefer Verschachtelung – gibt es eine Rekursionstiefe?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du dein Makro mit einem einfachen einstufigen Tag und dann mit mehreren Ebenen?
- Wie überprüfst du die korrekte Einrückung oder Formatierung des generierten HTML-Strings?
- Wie nutzt du `cargo expand`, um die vollständige Expansion bei mehrfacher Verschachtelung zu sehen?
- Welche Erweiterung wäre als nächster Schritt sinnvoll – z. B. self-closing Tags oder Attribute?

---

## Projekt 24: Mehrfach-Implementierung von Traits

### Modul 1: Basis-Datenstrukturen
- Welches Trait möchtest du für mehrere Typen implementieren – ein selbst definiertes oder ein Standard-Trait wie `Display`?
- Welchen Designator verwendest du für Typnamen in `macro_rules!` – `ty` oder `ident`? Was ist der Unterschied?
- Wie sieht die Signatur des Traits aus – hat es Methoden mit oder ohne Parameter?
- Welche primitiven Typen sollen unterstützt werden – `i32`, `u32`, `f64`, `bool`?

### Modul 2: Implementierung & Methoden
- Wie schreibst du einen Wiederholungsblock `$(...),+`, der für jeden Typ einen eigenen `impl`-Block erzeugt?
- Wie greifst du innerhalb des `impl`-Blocks auf den aktuellen Typ `$t` zu?
- Wie gehst du damit um, dass die Methoden-Implementierung für jeden Typ leicht verschieden sein könnte?
- Kannst du in `macro_rules!` bedingt auf den Typ reagieren – oder brauchst du dafür proc-macros?

### Modul 3: Vollendung & Hauptprogramm
- Wie überprüfst du, ob die Trait-Implementierung für alle Typen korrekt kompiliert?
- Wie rufst du eine Trait-Methode auf einer Instanz jedes Typs auf und gibst das Ergebnis aus?
- Wie nutzt du `cargo expand`, um alle generierten `impl`-Blöcke auf einmal zu sehen?
- Was passiert, wenn du denselben Typ zweimal in der Liste angibst – ergibt das einen Compiler-Fehler?

---

## Projekt 25: Batch-Funktionsaufrufer

### Modul 1: Basis-Datenstrukturen
- Welchen Designator verwendest du für Funktionsnamen – `ident` oder `expr`? Wann ist `expr` nötig?
- Wie übergibst du das gemeinsame Argument – als `expr`-Designator?
- Was soll dein Makro zurückgeben – nichts (`()`), die letzte Rückgabe oder alle Rückgaben in einem Vec?
- Wie viele Funktionen soll das Makro mindestens akzeptieren – eine oder beliebig viele?

### Modul 2: Implementierung & Methoden
- Wie sieht die `$(...),+`-Syntax aus, um alle Funktionsnamen nacheinander aufzurufen?
- Wie übergibst du dasselbe Argument `$arg` an jede Funktion in der Wiederholung?
- Wie gehst du damit um, wenn die Funktionen unterschiedliche Rückgabetypen haben?
- Wie kannst du die Reihenfolge der Aufrufe garantieren – ist die Auswertungsreihenfolge in Makros definiert?

### Modul 3: Vollendung & Hauptprogramm
- Wie definierst du in `main.rs` drei einfache Funktionen, die du dann per Makro aufrufst?
- Wie überprüfst du mit `cargo expand`, in welcher Reihenfolge die Aufrufe expandiert werden?
- Wie erweiterst du das Makro, sodass es die Rückgabewerte in einem `Vec` sammelt?
- Wie gibst du alle gesammelten Ergebnisse formatiert aus?

---

## Projekt 26: Automatischer Builder-Pattern-Generator

### Modul 1: Basis-Datenstrukturen
- Was ist das Builder-Pattern – welche Struktur (das eigentliche Struct) und welche Hilfsstruktur (der Builder) brauchst du?
- Welche Designatoren verwendest du für Feldnamen (`ident`) und Feldtypen (`ty`)?
- Wie gibst du im Makro-Aufruf den Struct-Namen und die Felder an – trennst du sie durch Komma oder Semikolon?
- Welche zwei Strukturen muss dein Makro erzeugen – das Ziel-Struct und das Builder-Struct?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du im Makro zwei `struct`-Definitionen mit denselben Feldern (einmal direkt, einmal als `Option<T>`)?
- Wie generierst du für jedes Feld eine Setter-Methode am Builder, die `&mut self` zurückgibt?
- Wie implementierst du eine `build()`-Methode, die aus dem Builder das Ziel-Struct erstellt?
- Wie gehst du mit fehlenden Pflichtfeldern um – verwendest du `unwrap()`, `expect()` oder `Result`?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro in `main.rs` auf und erstellst eine Instanz über den generierten Builder?
- Wie testest du, was passiert, wenn du ein Pflichtfeld nicht setzt?
- Wie nutzt du `cargo expand`, um den vollständigen generierten Code der Builder-Implementierung zu überprüfen?
- Welche Einschränkungen hat diese Makro-Lösung im Vergleich zu proc-macros?

---

## Projekt 27: Zahlen-Reihenfolge-Generator

### Modul 1: Basis-Datenstrukturen
- Welchen Designator verwendest du für die einzelnen Zahlen – `literal`, `expr` oder `tt`?
- Was ist ein `static`-Array in Rust – wie unterscheidet es sich von einem normalen `let`-Array?
- Wie bestimmst du die Länge des Arrays zur Compile-Zeit – kannst du die Anzahl der Argumente zählen?
- Soll das Array aufsteigend oder nach Eingabe-Reihenfolge sortiert sein – und wie sortierst du in einem Makro?

### Modul 2: Implementierung & Methoden
- Wie sammelst du beliebig viele Zahlenliterale mit `$(...),*` und erzeugst daraus ein Array-Literal?
- Wie lässt sich ein Array zur Compile-Zeit sortieren – geht das mit `macro_rules!` direkt, oder brauchst du einen anderen Ansatz?
- Wie definierst du den Typ des statischen Arrays (`[i32; N]`) – wie leitest du `N` aus der Argumentliste ab?
- Was ist der Unterschied zwischen einem `const`-Array und einem `static`-Array?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro mit verschiedenen Zahlenmengen auf und überprüfst die Ausgabe?
- Wie iterierst du in `main.rs` über das generierte statische Array?
- Wie nutzt du `cargo expand`, um das erzeugte Array-Literal zu sehen?
- Wie verhält sich dein Makro, wenn du es mit duplizierten Zahlen aufrufst?

---

## Projekt 28: String-Verkettungs-Makro

### Modul 1: Basis-Datenstrukturen
- Welchen Designator wählst du für Argumente unterschiedlicher Typen – `expr` oder `tt`? Warum?
- Welches Trait muss ein Typ implementieren, damit er in einen String umgewandelt werden kann?
- Was ist der Unterschied zwischen `format!`, `String::new()` + `push_str` und einem `String`-Builder in Bezug auf Effizienz?
- Soll dein Makro einen neuen `String` zurückgeben oder direkt ausgeben?

### Modul 2: Implementierung & Methoden
- Wie iterierst du mit `$(...),*` über alle Argumente und rufst für jedes `to_string()` auf?
- Wie verkettest du die Teilstrings effizient – verwendest du `push_str`, `+` oder `format!`?
- Wie stellst du sicher, dass alle Argumente das `Display`- oder `ToString`-Trait implementieren?
- Wie gehst du mit dem Fall um, dass keine Argumente übergeben werden?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro mit gemischten Typen (`i32`, `f64`, `&str`, `bool`) auf?
- Wie vergleichst du die Ausgabe deines Makros mit der von `format!("{}{}{}", ...)`?
- Wie nutzt du `cargo expand`, um die erzeugten `push_str`- oder `format!`-Aufrufe zu sehen?
- Wie erweiterst du dein Makro, um ein optionales Trennzeichen zu unterstützen?

---

## Projekt 29: Mehrfach-Zuweisung

### Modul 1: Basis-Datenstrukturen
- Welchen Designator verwendest du für Variablennamen – `ident` oder `pat`? Was ist der Unterschied?
- Welchen Designator verwendest du für den zuzuweisenden Wert – `expr` oder `literal`?
- Soll dein Makro `let`-Bindungen oder Zuweisungen an bereits existierende Variablen erzeugen?
- Wie verhält sich Rust bei der Zuweisung eines Werts mit Seiteneffekten – wird der Ausdruck einmal oder mehrfach ausgewertet?

### Modul 2: Implementierung & Methoden
- Wie schreibst du den Wiederholungsblock, der für jeden Variablennamen eine Zuweisung erzeugt?
- Wie stellst du sicher, dass der Wert-Ausdruck nur einmal ausgewertet wird – verwendest du eine temporäre Variable?
- Wie sieht die Expansion für `multi_assign!(a, b, c = 42)` aus?
- Was passiert, wenn die Variablen unterschiedliche Typen haben und der Wert nur für einen Typ passt?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du dein Makro mit `let`-Bindungen und mit bereits deklarierten `mut`-Variablen?
- Wie überprüfst du, ob der Wert-Ausdruck wirklich nur einmal ausgewertet wird (z. B. mit einem Zähler)?
- Wie nutzt du `cargo expand`, um die generierten Zuweisungen zu sehen?
- Wie erweiterst du das Makro, um verschiedene Werte pro Variable zu unterstützen?

---

## Projekt 30: Rekursiver Listen-Parser

### Modul 1: Basis-Datenstrukturen
- Was ist eine „geschachtelte Baumstruktur" in Rust – welches `enum` könntest du dafür definieren?
- Wie sieht der rekursive Aufbau eines Makros in `macro_rules!` aus – welcher Arm ist der Basisfall?
- Welchen Designator verwendest du für die Listenelemente – `expr` oder `tt`?
- Wie unterscheidest du im Makro den letzten Wert (Basisfall) von einer noch nicht leeren Liste?

### Modul 2: Implementierung & Methoden
- Wie sieht der Rekursionsschritt in `macro_rules!` aus – wie entfernst du das erste Element und rufst das Makro erneut auf?
- Wie baust du den Baum aus Konten (innere Knoten) und Blättern auf?
- Was ist die maximale Rekursionstiefe von `macro_rules!` in Rust – wie kannst du sie anpassen?
- Wie stellst du sicher, dass die Expansion terminiert?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro mit verschieden langen Listen auf und prüfst die resultierende Struktur?
- Wie traversierst du den erzeugten Baum in `main.rs` rekursiv?
- Wie nutzt du `cargo expand`, um die Makro-Expansion Schritt für Schritt nachzuvollziehen?
- Was passiert bei einer leeren Liste – gibt es einen Basisfall dafür?

---

## Projekt 31: CSV-Zeilen-Parser

### Modul 1: Basis-Datenstrukturen
- Welche Datenstruktur (Struct) repräsentiert eine CSV-Zeile – welche Felder hat sie?
- Welchen Designator verwendest du für die einzelnen Werte – `literal`, `expr` oder `tt`?
- Wie trennst du im Makro die einzelnen Felder – durch Komma, durch ein eigenes Token?
- Wie viele Felder hat deine Datenstruktur, und soll das Makro zur Compile-Zeit prüfen, ob die Anzahl stimmt?

### Modul 2: Implementierung & Methoden
- Wie weist du die geparsten Werte den Feldern deiner Datenstruktur zu – positionell oder per Name?
- Wie stellst du sicher, dass die Typen stimmen – wandelt das Makro Typen um oder überlässt es das dem Compiler?
- Wie gehst du mit optionalen Feldern oder fehlenden Werten um?
- Wie sieht die Expansion für `csv_parse!(Person, "Alice", 30, true)` aus?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro mit mehreren verschiedenen Datensätzen auf und sammelst sie in einem `Vec`?
- Wie überprüfst du, ob die geparsten Werte die richtigen Typen haben?
- Wie nutzt du `cargo expand`, um die Struct-Initialisierung zu sehen?
- Wie erweiterst du das Makro, um mehrere Zeilen auf einmal zu verarbeiten?

---

## Projekt 32: Trait-Delegation

### Modul 1: Basis-Datenstrukturen
- Was bedeutet „Delegation" im Kontext von Traits – wie leitet ein äußeres Struct Methodenaufrufe weiter?
- Welche Designatoren brauchst du für Trait-Namen (`ident`), Struct-Namen (`ident`), Feld-Namen (`ident`) und Methoden-Signaturen (`tt` oder einzelne Teile)?
- Wie komplex kann die Methoden-Signatur sein – brauchst du Generics oder reicht eine einfache Methode?
- Welches innere Feld hält die Implementierung, und welchen Typ hat es?

### Modul 2: Implementierung & Methoden
- Wie generierst du in einer Wiederholung für jede Methode des Traits einen Delegations-Aufruf?
- Wie greifst du auf das innere Feld `self.$feld` zu und rufst dort die Methode auf?
- Wie gehst du mit Methoden um, die `&self`, `&mut self` oder `self` nehmen?
- Wie übergibst du die Parameter der Methode an den inneren Aufruf?

### Modul 3: Vollendung & Hauptprogramm
- Wie definierst du ein Trait mit mehreren Methoden und verwendest dein Makro, um es für ein Wrapper-Struct zu implementieren?
- Wie überprüfst du, ob der Wrapper sich genauso verhält wie das innere Objekt?
- Wie nutzt du `cargo expand`, um die generierten `impl`-Blöcke zu untersuchen?
- Welche Einschränkungen hat deine Makro-Lösung gegenüber einer manuellen Implementierung?

---

## Projekt 33: Batch-Test-Generator

### Modul 1: Basis-Datenstrukturen
- Was ist ein `#[test]`-Attribut in Rust, und wie strukturierst du eine Testfunktion?
- Welche Designatoren brauchst du für Testnamen (`ident`) und Testdaten (`expr` oder `literal`)?
- Wie viele Informationen braucht ein einzelner Test – Eingabe, erwartete Ausgabe, Name?
- Wie soll die Eingabesyntax deines Makros aussehen – z. B. `gen_tests!(test_add: (1, 2) => 3, ...)`?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du in der Wiederholung für jedes Testdaten-Tripel eine eigene `#[test]`-Funktion?
- Wie verwendest du `$(...),+`, um mehrere Test-Definitionen zu iterieren?
- Wie rufst du die zu testende Funktion innerhalb des generierten Tests auf?
- Wie verwendest du `assert_eq!` innerhalb der generierten Testfunktion?

### Modul 3: Vollendung & Hauptprogramm
- Wie führst du `cargo test` aus und überprüfst, ob alle generierten Tests durchlaufen?
- Wie nutzt du `cargo expand`, um die generierten `#[test]`-Funktionen zu sehen?
- Wie erweiterst du das Makro, um auch negative Tests (should_panic) zu unterstützen?
- Wie stellst du sicher, dass generierte Funktionsnamen eindeutig sind?

---

## Projekt 34: Konfigurations-Parser

### Modul 1: Basis-Datenstrukturen
- Was ist ein „statisches Konfigurationsobjekt" – verwendest du ein Struct mit `const`- oder `static`-Feldern?
- Welche Designatoren brauchst du für Schlüsselnamen (`ident`) und Standardwerte (`expr` oder `literal`)?
- Wie sieht die Struct-Definition aus, die dein Makro erzeugen soll?
- Wie ermöglicht dein Makro das Festlegen von Standardwerten?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du mit der Wiederholungs-Syntax für jeden Konfigurationsschlüssel ein Struct-Feld?
- Wie initialisierst du das statische Objekt mit den Standardwerten?
- Wie stellst du sicher, dass alle Werte `'static`-Lebensdauer haben, falls es sich um Strings handelt?
- Wie implementierst du Getter-Methoden für die Konfigurationsfelder?

### Modul 3: Vollendung & Hauptprogramm
- Wie greifst du in `main.rs` auf die Konfigurationswerte zu?
- Wie überprüfst du mit `cargo expand`, dass das Struct und die Initialisierung korrekt generiert wurden?
- Wie erweiterst du das Makro, um Werte aus Umgebungsvariablen zu lesen?
- Welche Typen können als Konfigurationswerte verwendet werden – was sind die Einschränkungen?

---

## Projekt 35: Kompaktes Error-Handling

### Modul 1: Basis-Datenstrukturen
- Welche Bestandteile braucht ein Error-Enum in Rust – Varianten, Beschreibungen, `Display`-Implementierung?
- Welche Designatoren brauchst du für Fehlernamen (`ident`) und Beschreibungen (`literal`)?
- Was ist das `std::fmt::Display`-Trait, und wie implementierst du es für ein Enum?
- Soll dein Makro auch das `std::error::Error`-Trait implementieren?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du mit `$(...),+` für jeden Fehlernamen eine Enum-Variante?
- Wie implementierst du `Display` mit einem `match`-Ausdruck, der die Beschreibung zurückgibt?
- Wie verknüpfst du in der Wiederholung den Variantennamen mit seiner Beschreibung?
- Wie nutzt du `macro_rules!` innerhalb des `impl`-Blocks für die Wiederholung der Match-Arme?

### Modul 3: Vollendung & Hauptprogramm
- Wie verwendest du dein Error-Enum in `main.rs` als Rückgabetyp einer `Result`-Funktion?
- Wie nutzt du `cargo expand`, um das generierte Enum und den `impl Display`-Block zu sehen?
- Wie erweiterst du das Makro, um `From`-Implementierungen für andere Fehlertypen zu generieren?
- Wie überprüfst du, ob die `Display`-Ausgabe der Fehlermeldungen korrekt ist?

---

## Projekt 36: Batch-Veränderung

### Modul 1: Basis-Datenstrukturen
- Welchen Designator verwendest du für die Variablennamen – `ident`?
- Welchen Designator verwendest du für die anzuwendende Operation – `expr` oder eine eigene Closure?
- Soll die Operation als Closure, als Funktionsname oder als Ausdruck übergeben werden?
- Müssen die Variablen als `mut` deklariert sein – und wie prüfst du das zur Compile-Zeit?

### Modul 2: Implementierung & Methoden
- Wie schreibst du den Wiederholungsblock, der für jede Variable die Operation anwendet?
- Wie übergibst du die Operation genau einmal und wendest sie auf jede Variable an?
- Wie gehst du mit einer Operation um, die den Wert in-place verändert (z. B. `*= 2`)?
- Wie stellst du sicher, dass alle Variablen denselben Typ haben?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du dein Makro mit einer Addition, einer Multiplikation und einer String-Anhängung?
- Wie überprüfst du die Werte der Variablen nach der Batch-Veränderung?
- Wie nutzt du `cargo expand`, um die generierten Ausdrücke zu sehen?
- Wie erweiterst du das Makro, um verschiedene Operationen pro Variable zu unterstützen?

---

## Projekt 37: Strukturierte Tabellen-Ausgabe

### Modul 1: Basis-Datenstrukturen
- Wie representierst du Spaltenüberschriften und Datenzeilen in der Makro-Syntax?
- Welche Designatoren brauchst du für Spaltennamen (`literal` oder `ident`) und Datenwerte (`expr`)?
- Wie bestimmst du die Spaltenbreite zur Compile-Zeit – oder passt du sie zur Laufzeit an?
- Welchen Rückgabetyp hat dein Makro – gibt es einen `String` zurück oder druckt es direkt?

### Modul 2: Implementierung & Methoden
- Wie iterierst du mit `$(...),+` über die Spaltenüberschriften und erzeugst die Kopfzeile?
- Wie iterierst du über die Datenzeilen und richtest die Spalten bündig aus?
- Wie berechnest du die maximale Breite jeder Spalte, wenn die Werte unterschiedlich lang sind?
- Wie verwendest du `format!` innerhalb des Makros, um Werte mit Padding auszugeben?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro mit einem Beispiel aus Personen-Daten auf und überprüfst die Ausrichtung?
- Wie nutzt du `cargo expand`, um die generierten `println!`- oder `format!`-Aufrufe zu sehen?
- Wie erweiterst du dein Makro, um Trennlinien zwischen Kopfzeile und Daten einzufügen?
- Wie gehst du mit Werten um, die Sonderzeichen oder unterschiedliche Unicode-Breiten haben?

---

## Projekt 38: Bit-Flag-Generator

### Modul 1: Basis-Datenstrukturen
- Was sind Bit-Flags – wie werden sie als Potenzen von 2 dargestellt (`1 << 0`, `1 << 1`, ...)?
- Welchen Designator verwendest du für Flag-Namen – `ident`?
- Welchen Typ verwendest du für die Bit-Flag-Konstanten – `u8`, `u16`, `u32` oder `u64`?
- Wie sieht das Struct aus, das die Flags speichert – enthält es nur ein einziges Integer-Feld?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du in einer Wiederholung für jeden Flag-Namen eine Konstante mit dem richtigen Bitwert?
- Wie zählst du die Flags, um den richtigen Shift-Wert zu berechnen – kannst du das in `macro_rules!` direkt tun?
- Wie implementierst du Hilfsmethoden wie `set`, `unset` und `is_set` für das Flag-Struct?
- Welche bitweisen Operatoren (`|`, `&`, `!`) verwendest du in diesen Methoden?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du dein Makro mit mehreren Flags und überprüfst die bitweisen Werte?
- Wie kombinierst du mehrere Flags mit dem `|`-Operator?
- Wie nutzt du `cargo expand`, um die generierten Konstanten und den `impl`-Block zu sehen?
- Wie erweiterst du das Makro, um eine `Debug`-Ausgabe zu generieren, die aktive Flags benennt?

---

## Projekt 39: Typen-Konvertierer

### Modul 1: Basis-Datenstrukturen
- Welche Designatoren brauchst du für Variablennamen (`ident`) und den Zieltyp (`ty`)?
- Welche Cast-Mechanismen gibt es in Rust – `as`, `From`/`Into`, `TryFrom`/`TryInto`?
- Wann ist `as`-Casting sicher, und wann kann es zu Datenverlust führen?
- Soll dein Makro neue Variablen erzeugen oder die bestehenden überschreiben?

### Modul 2: Implementierung & Methoden
- Wie schreibst du den Wiederholungsblock, der für jede Variable eine `as $zieltyp`-Konvertierung erzeugt?
- Wie benennt du die neuen Variablen – verwendest du dasselbe oder ein anderes Namensschema?
- Wie stellst du sicher, dass nur primitive Typen verwendet werden, für die `as` funktioniert?
- Wie gehst du mit Konvertierungen um, die zur Laufzeit fehlschlagen könnten – z. B. `f64 as u8`?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du dein Makro mit `i32`-, `f64`- und `u8`-Werten auf und konvertierst sie alle zu `f32`?
- Wie überprüfst du, ob die Konvertierung korrekte Werte liefert?
- Wie nutzt du `cargo expand`, um die generierten `as`-Ausdrücke zu sehen?
- Wie erweiterst du das Makro, um `TryInto` für sichere Konvertierungen zu unterstützen?

---

## Projekt 40: Rekursives Muster-Matching

### Modul 1: Basis-Datenstrukturen
- Was ist eine „Baumstruktur" in Rust – definiere ein rekursives `enum` mit Blatt- und Knotentypen?
- Welche Designatoren brauchst du, um Muster in `macro_rules!` zu beschreiben – `pat`, `tt` oder `expr`?
- Wie sieht ein tiefes Mustervergleich ohne Makro aus – welchen Boilerplate willst du vereinfachen?
- Wie viele Ebenen tief soll dein Makro Muster matchen können?

### Modul 2: Implementierung & Methoden
- Wie schreibst du ein Makro, das ein Match-Muster für die äußerste Ebene generiert und sich dann selbst für die inneren Ebenen aufruft?
- Wie kombinierst du `macro_rules!`-Rekursion mit `match`-Ausdrücken?
- Wie gehst du mit dem Basisfall um – was passiert bei einem Blattknoten?
- Wie übergibst du den zu matchenden Ausdruck an das rekursive Makro?

### Modul 3: Vollendung & Hauptprogramm
- Wie definierst du eine Baumstruktur und testest dein Makro mit verschieden tiefen Bäumen?
- Wie vergleichst du die Lesbarkeit mit und ohne dein Makro?
- Wie nutzt du `cargo expand`, um die expandierten `match`-Ausdrücke zu sehen?
- Was sind die Grenzen deines Makros – welche Muster kann es nicht vereinfachen?

---
# Prompt-Katalog Phase 10: Makros & Metaprogrammierung

## Projekte 41–60: Custom Derive Prozedurale Makros

---

## Projekt 41: Derive Describe

### Modul 1: Basis-Datenstrukturen
- Welche Art von prozeduralem Makro brauchst du hier – `proc_macro_derive`, `proc_macro_attribute` oder `proc_macro`? Was ist der Unterschied?
- Wie richtest du ein separates Crate für prozedurale Makros ein? Welche Zeile muss zwingend in der `Cargo.toml` des Makro-Crates stehen?
- Welche externen Crates benötigst du, um den TokenStream zu parsen und neuen Code zu erzeugen? Was ist die Aufgabe von `syn`, `quote` und `proc-macro2` jeweils?
- Welches Trait sollte dein Makro automatisch implementieren? Wie könnte die Signatur des `Describe`-Traits aussehen – welche Methode mit welchem Rückgabetyp ist sinnvoll?

### Modul 2: Implementierung & Methoden
- Wie verwendest du `syn::parse_macro_input!` um den `TokenStream` in ein `DeriveInput` umzuwandeln? Was enthält ein `DeriveInput`?
- Wie kommst du vom `DeriveInput` an die einzelnen Felder eines Structs? Welche Variante von `syn::Data` und welche `Fields`-Typen (`Named`, `Unnamed`, `Unit`) musst du unterscheiden?
- Wie liest du für jedes Feld sowohl den Feldnamen (als `Ident`) als auch den Feldtyp (als `Type`) aus? Was gibt `field.ident` zurück und wie kannst du den Typ als lesbaren String darstellen?
- Wie nutzt du das `quote!`-Makro, um einen `impl Describe for MeinStruct`-Block zu erzeugen? Wie iterierst du dabei in `quote!` über eine Liste von Feldinformationen?

### Modul 3: Vollendung & Hauptprogramm
- Wie trägst du dein Makro-Crate als Abhängigkeit in die `Cargo.toml` des Hauptprojekts ein? Welche Art von Abhängigkeit ist das?
- Wie verwendest du `#[derive(Describe)]` in deiner `main.rs` auf einem Struct? Was musst du zusätzlich mit `use` importieren?
- Wie nutzt du `cargo expand` (aus dem Crate `cargo-expand`), um den vom Makro generierten Code sichtbar zu machen? Was zeigt dir die Ausgabe?
- Wie schreibst du einen Integrationstest im `tests/`-Verzeichnis, der überprüft, ob `.describe()` die korrekte Ausgabe liefert?

---

## Projekt 42: Derive JsonSerializable

### Modul 1: Basis-Datenstrukturen
- Warum ist ein prozedurales Makro der richtige Weg, um JSON-Serialisierung zu automatisieren, anstatt das Trait manuell zu implementieren?
- Welche `Cargo.toml`-Einträge sind für ein `proc-macro`-Crate Pflicht, und welche Abhängigkeiten (`syn`, `quote`, `proc-macro2`) trägst du dort ein?
- Welche Rust-Typen müssen beim Erzeugen von JSON besonders behandelt werden (z. B. `String` braucht Anführungszeichen, Zahlen nicht)? Wie könnte dein Makro das unterscheiden?
- Denkst du daran, ein eigenes Trait `JsonSerializable` mit einer Methode `to_json(&self) -> String` zu definieren? Wo definierst du dieses Trait – im Makro-Crate oder im Hauptprojekt?

### Modul 2: Implementierung & Methoden
- Wie parst du den `TokenStream` mit `syn::parse_macro_input!` und wie kommst du an die Felder (`Fields::Named`) des Structs?
- Wie liest du für jedes Feld sowohl den Namen als auch den Typ aus, um den JSON-Schlüssel und den passenden Formatierungsausdruck zu bestimmen?
- Wie iterierst du in `quote!` über alle Felder, um für jedes Feld einen `"name": value`-Teil des JSON-Strings zu erzeugen? Welche Hilfsmakros aus `quote` sind dabei nützlich?
- Wie fügst du die einzelnen Feldteile mit Komma korrekt zu einem vollständigen JSON-Objekt-String zusammen, und wie behandelst du das abschließende Komma-Problem?

### Modul 3: Vollendung & Hauptprogramm
- Wie bindest du das Makro-Crate und das Crate mit dem `JsonSerializable`-Trait in deinem Hauptprojekt ein?
- Wie testest du, ob der erzeugte JSON-String valide ist? Gibt es eine einfache Möglichkeit das zu prüfen, ohne eine vollständige JSON-Bibliothek einzubinden?
- Was passiert, wenn ein Feld einen geschachtelten Typ hat (z. B. ein `Vec<String>` oder ein anderes Struct)? Wie könntest du das in einer einfachen Implementierung handhaben?
- Wie kannst du mit `cargo expand` überprüfen, ob der generierte `impl`-Block syntaktisch korrekt ist?

---

## Projekt 43: Derive Validate

### Modul 1: Basis-Datenstrukturen
- Welche Makro-Art verwendest du, und wie heißt der `proc_macro_derive`-Aufruf mit Attribut-Unterstützung (Stichwort: `attributes(...)`-Parameter)?
- Wie gibst du in der `proc_macro_derive`-Deklaration an, dass dein Makro das Hilfsmerkmal `#[validate(...)]` versteht? Was bewirkt der `attributes(validate)`-Parameter?
- Welche Datenstruktur repräsentiert das Ergebnis einer Validierung – ein `Result<(), Vec<String>>` oder etwas anderes?
- Welche Crates brauchst du neben `syn` und `quote`, um Attribute wie `#[validate(min = 10)]` zu parsen?

### Modul 2: Implementierung & Methoden
- Wie iterierst du nach dem Parsen des `DeriveInput` über die Felder und liest zu jedem Feld die `attrs`-Liste aus?
- Wie parst du den Inhalt eines Attributs wie `#[validate(min = 10)]` mit `syn`? Welche `syn`-Typen helfen dir, den Inhalt als Schlüssel-Wert-Paar zu lesen (Stichwort: `Meta`, `MetaNameValue`)?
- Wie erzeugst du mit `quote!` für jedes Feld mit einem `min`-Attribut eine Prüfbedingung, die den Feldwert gegen den Minimalwert vergleicht und einen Fehlerstring erzeugt?
- Wie sammelst du die einzelnen generierten Prüfausdrücke in einem `Vec` und fügst sie in den finalen `impl Validate`-Block ein?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du in `main.rs` die generierte `validate()`-Methode auf und wie wertest du das Ergebnis aus?
- Wie testest du, dass die Validierung bei einem ungültigen Wert tatsächlich einen Fehler zurückgibt und bei einem gültigen Wert `Ok(())` liefert?
- Was passiert, wenn ein Feld kein `#[validate]`-Attribut hat? Wie stellst du sicher, dass dein Makro solche Felder stillschweigend überspringt?
- Kannst du das Makro erweitern, um zusätzlich zu `min` auch `max` oder `not_empty` zu unterstützen? Wie würde das die Logik beim Attribut-Parsing verändern?

---

## Projekt 44: Derive DatabaseTable

### Modul 1: Basis-Datenstrukturen
- Welchen Zusammenhang siehst du zwischen den Feldern eines Rust-Structs und den Spalten einer Datenbanktabelle? Wie wird der Struct-Name zum Tabellennamen?
- Wie richtest du das Makro-Crate ein, und welche Traits oder Methoden soll das Makro erzeugen (z. B. `insert_sql(&self) -> String`)?
- Welche Feldtypen lassen sich direkt als SQL-Werte darstellen (Zahlen, `String`), und welche könnten Probleme bereiten?
- Denkst du an SQL-Injection? Wie könntest du Stringwerte in deinem generierten Code korrekt escapen?

### Modul 2: Implementierung & Methoden
- Wie liest du aus dem `DeriveInput` den Struct-Namen als String (Stichwort: `ident.to_string()`) für den Tabellennamen?
- Wie iterierst du über alle benannten Felder, um einerseits die Spaltennamen und andererseits die Werte zu erzeugen?
- Wie verwendest du `quote!`, um für jedes Feld den Ausdruck `self.feldname` im generierten Code zu referenzieren?
- Wie fügst du die Spalten- und Wertelisten korrekt zu einem vollständigen SQL-String zusammen?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du den erzeugten SQL-String auf Korrektheit, ohne eine echte Datenbank zu benötigen?
- Wie sieht die Nutzung von `#[derive(DatabaseTable)]` in `main.rs` aus, und wie rufst du `insert_sql()` auf?
- Was müsstest du ändern, um auch `SELECT`- oder `UPDATE`-Statements zu generieren?
- Wie kannst du mit einem Hilfsattribut `#[primary_key]` ein Feld als Primärschlüssel markieren und es im Statement gesondert behandeln?

---

## Projekt 45: Derive DefaultZero

### Modul 1: Basis-Datenstrukturen
- Das Standard-`Default`-Trait in Rust erzeugt für numerische Typen bereits `0` und für `String` bereits `String::new()`. Wann und warum wäre ein eigenes Makro trotzdem sinnvoll?
- Wie deklarierst du ein `proc_macro_derive`-Makro mit dem Namen `DefaultZero`, das das eingebaute `Default`-Trait implementiert?
- Welche Rust-Typen gelten als "numerisch" (z. B. `i32`, `u64`, `f64`)? Wie könntest du im Makro anhand des Typnamens unterscheiden, ob ein Feld numerisch oder ein `String` ist?
- Was sind die Grenzen dieses Ansatzes, wenn Felder komplexere Typen wie `Vec<T>` oder eigene Structs haben?

### Modul 2: Implementierung & Methoden
- Wie parst du das `DeriveInput` und wie kommst du an die Felder mit ihren Typen?
- Wie kannst du den `Type` eines Feldes als String auslesen, um ihn mit bekannten numerischen Typnamen zu vergleichen?
- Wie erzeugst du im `quote!`-Block für jedes Feld den passenden Standardwert (`0`, `0.0` oder `String::new()`) abhängig vom Typ?
- Wie sieht der vollständige mit `quote!` generierte `impl Default for MeinStruct`-Block konzeptionell aus?

### Modul 3: Vollendung & Hauptprogramm
- Wie überprüfst du mit einem Test, dass `MeinStruct::default()` wirklich alle Felder korrekt initialisiert?
- Was passiert, wenn du `#[derive(DefaultZero, Default)]` gleichzeitig verwendest? Welchen Fehler erhältst du und warum?
- Wie könntest du das Makro erweitern, sodass ein Hilfsattribut `#[default_value = "42"]` pro Feld einen benutzerdefinierten Standardwert erlaubt?
- Nutze `cargo expand`, um den generierten `impl`-Block zu inspizieren. Stimmt er mit deiner Erwartung überein?

---

## Projekt 46: Derive CloneFields

### Modul 1: Basis-Datenstrukturen
- Was ist der konzeptionelle Unterschied zwischen dem Standard-`Clone`-Trait (das alle Felder klont) und dem, was dieses Makro leisten soll (nur markierte Felder)?
- Welchen Namen wählst du für dein Makro und die zu generierende Methode? Was gibt `clone_marked(&self) -> Self` zurück, wenn nicht alle Felder geklont werden sollen?
- Wie richtest du das proc-macro-Crate mit `syn`, `quote` und `proc-macro2` ein?
- Was soll mit Feldern passieren, die nicht mit `#[clone]` markiert sind? Werden sie mit `Default::default()` befüllt oder anders behandelt?

### Modul 2: Implementierung & Methoden
- Wie prüfst du für jedes Feld, ob es das `#[clone]`-Attribut trägt? Wie durchsuchst du `field.attrs` nach einem Attribut mit dem Namen `clone`?
- Wie erzeugst du im `quote!`-Block für ein markiertes Feld `feldname: self.feldname.clone()` und für ein nicht-markiertes Feld `feldname: Default::default()`?
- Wie baust du aus den einzelnen Feldausdrücken einen vollständigen `MeinStruct { ... }`-Konstruktoraufruf?
- Welchen `attributes(...)`-Parameter musst du in der `proc_macro_derive`-Deklaration angeben, damit Rust das `#[clone]`-Hilfsattribut akzeptiert?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du, dass ein geklontes Struct die markierten Felder korrekt übernimmt und die nicht-markierten den Standardwert haben?
- Was passiert, wenn ein Feld mit `#[clone]` keinen `Clone`-Trait implementiert? Welchen Compiler-Fehler erhältst du?
- Wie kannst du die Anforderung an `Default` für nicht-markierte Felder als Trait-Bound (`where`) in den generierten Code einbauen?
- Nutze `cargo expand`, um zu prüfen, ob der generierte Code kompilierbar ist.

---

## Projekt 47: Derive Mockable

### Modul 1: Basis-Datenstrukturen
- Was ist eine Mock-Struktur im Kontext von Tests? Welchen Sinn hat es, sie automatisch aus einem Struct zu generieren?
- Welche Konvention verwendest du für den Namen der generierten Mock-Struktur (z. B. `Mock` + Struct-Name)?
- Welche Felder soll die Mock-Struktur haben? Könnte jedes Feld vom Typ `Option<OriginalTyp>` sein, damit Felder einzeln gesetzt oder leer gelassen werden können?
- Welche Methoden soll die Mock-Struktur anbieten (z. B. Setter-Methoden und `build() -> OriginalStruct`)?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du mit `quote!` eine komplett neue Struct-Definition (`struct MockMeinStruct { ... }`), nicht nur einen `impl`-Block?
- Wie generierst du für jedes Feld des Original-Structs ein `Option<OriginalTyp>`-Feld in der Mock-Struktur?
- Wie generierst du für jedes Feld eine Setter-Methode (z. B. `pub fn name(mut self, val: String) -> Self`)?
- Wie generierst du eine `build()`-Methode, die aus den `Option`-Feldern ein Original-Struct erstellt und dabei `.unwrap_or_default()` verwendet?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du `MockMeinStruct::default()` in Tests auf und wie nutzt du die Setter-Methoden in einer Builder-Kette?
- Wie testest du, dass `build()` funktioniert, wenn nur ein Teil der Felder gesetzt wurde?
- Was muss das Original-Struct zusätzlich implementieren (z. B. `Default`), damit `build()` mit `unwrap_or_default()` funktioniert?
- Nutze `cargo expand`, um die vollständige generierte Mock-Struktur zu inspizieren.

---

## Projekt 48: Derive FromRow

### Modul 1: Basis-Datenstrukturen
- Was bedeutet "aus einer Datenbankzeile instanziieren"? Welches Datenformat simulierst du hier – eine `HashMap<String, String>` als Ersatz für eine echte DB-Zeile?
- Welches Trait soll dein Makro implementieren? Wie könnte die Signatur von `from_row(row: &HashMap<String, String>) -> Result<Self, String>` aussehen?
- Welche Crates brauchst du für das Makro-Crate, und welche Typen aus `std::collections` werden im generierten Code referenziert?
- Wie gehst du damit um, dass ein Feld in der Map fehlen könnte? Welche Fehlerbehandlungsstrategien gibt es?

### Modul 2: Implementierung & Methoden
- Wie iterierst du über die benannten Felder des Structs und liest deren Namen als String für den Map-Key?
- Wie erzeugst du für jedes Feld den Ausdruck `row.get("feldname").ok_or(...)?.parse().map_err(...)?` im `quote!`-Block?
- Wie baust du aus den einzelnen Feld-Ausdrücken einen vollständigen Struct-Konstruktor im generierten `from_row`-Methodenkörper?
- Was passiert, wenn ein Feldtyp nicht den `FromStr`-Trait implementiert und somit `.parse()` nicht funktioniert?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du `from_row` mit einer manuell erstellten `HashMap`, die alle Felder als Strings enthält?
- Wie testest du den Fehlerfall, wenn ein Pflichtfeld in der Map fehlt?
- Könntest du mit einem Hilfsattribut `#[column = "anderer_name"]` den Map-Key vom Feldnamen entkoppeln? Wie würde das das Attribut-Parsing verändern?
- Wie integrierst du das Makro in ein Projekt, das eine echte Datenbankbibliothek (konzeptionell) verwendet?

---

## Projekt 49: Derive Invert

### Modul 1: Basis-Datenstrukturen
- Für welche Art von Typen ist dieses Makro gedacht – Structs oder Enums? Welche Einschränkung gilt (genau zwei Varianten)?
- Wie prüfst du beim Parsen des `DeriveInput`, ob der Typ ein Enum ist (Stichwort: `Data::Enum`)? Was machst du, wenn es kein Enum mit genau zwei Varianten ist?
- Welche Methode soll generiert werden (z. B. `fn invert(self) -> Self`)? Gibt es Fälle, wo diese Methode nicht sinnvoll ist?
- Wie nutzt du `proc_macro2::Span`, um im Fehlerfall eine hilfreiche Fehlermeldung mit Quellcode-Bezug auszugeben?

### Modul 2: Implementierung & Methoden
- Wie liest du aus einem `Data::Enum` die Liste der Varianten (`variants`) aus?
- Wie erzeugst du mit `quote!` einen `match self`-Block, der `VariantA => VariantB` und `VariantB => VariantA` abbildet?
- Was musst du beachten, wenn die Enum-Varianten Daten enthalten (Tuple-Varianten oder Struct-Varianten)?
- Wie erzeugst du einen Compile-Fehler mit einer sprechenden Nachricht, wenn das Enum mehr oder weniger als zwei Varianten hat?

### Modul 3: Vollendung & Hauptprogramm
- Wie nutzt du `#[derive(Invert)]` auf einem einfachen Enum wie `enum Toggle { On, Off }` in `main.rs`?
- Wie testest du, dass `Toggle::On.invert() == Toggle::Off` und umgekehrt?
- Was passiert, wenn du das Makro auf einem Enum mit drei Varianten verwendest? Bekommst du zur Compile-Zeit einen Fehler?
- Kannst du `cargo expand` nutzen, um die generierte `match`-Anweisung zu sehen?

---

## Projekt 50: Derive DeepSizeOf

### Modul 1: Basis-Datenstrukturen
- Was ist der Unterschied zwischen `std::mem::size_of::<T>()` (Stack-Größe) und dem tatsächlichen Speicherbedarf inklusive Heap-Daten (z. B. bei `String` oder `Vec<T>`)?
- Welches Trait soll generiert werden (z. B. `DeepSizeOf` mit Methode `deep_size_of(&self) -> usize`)?
- Welche Typen haben Heap-Daten, die berücksichtigt werden müssen (`String`, `Vec`, `Box`)? Wie viel Heap-Speicher belegt ein `String` mit Inhalt?
- Welche Crates brauchst du neben `syn` und `quote`?

### Modul 2: Implementierung & Methoden
- Wie iterierst du über die Felder und erzeugst für jedes Feld einen Ausdruck, der zur Gesamtgröße beiträgt?
- Wie erzeugst du für einfache skalare Felder `std::mem::size_of_val(&self.feldname)` und für `String`-Felder zusätzlich `self.feldname.capacity()`?
- Wie kannst du im Makro anhand des Typnamens (als String) entscheiden, welchen Ausdruck du generierst? Was sind die Schwächen dieses Ansatzes?
- Wie summierst du im `quote!`-Block alle Einzel-Ausdrücke auf?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du, dass `deep_size_of()` für ein Struct mit einem `String`-Feld einen größeren Wert zurückgibt als `std::mem::size_of`?
- Für welche Typen ist eine rekursive Tiefenmessung nötig (z. B. ein Feld vom Typ eines anderen Structs, das auch `DeepSizeOf` implementiert)?
- Wie kannst du das Makro so gestalten, dass es für unbekannte Typen auf das rekursive Aufrufen von `deep_size_of()` zurückfällt?
- Nutze `cargo expand`, um die summierten Ausdrücke zu prüfen.

---

## Projekt 51: Derive Configuration

### Modul 1: Basis-Datenstrukturen
- Warum ist das automatische Befüllen von Konfigurationsstructs aus Umgebungsvariablen ein häufiges Muster? Welche Bibliotheken lösen das Problem bereits?
- Welches Trait und welche Methode soll dein Makro generieren (z. B. `from_env() -> Result<Self, String>`)?
- Welche Konvention verwendest du, um den Umgebungsvariablen-Namen aus dem Feldnamen abzuleiten (z. B. Großbuchstaben, Präfix)?
- Welche Crates brauchst du im Makro-Crate? Welche Funktion aus `std::env` liest eine Umgebungsvariable?

### Modul 2: Implementierung & Methoden
- Wie leitest du für jedes Feld den Umgebungsvariablen-Namen ab (z. B. `ident.to_string().to_uppercase()`)? Wie machst du das im `quote!`-Block?
- Wie erzeugst du den Ausdruck `std::env::var("FELDNAME").map_err(|_| "...")?.parse().map_err(|_| "...")?` für jedes Feld?
- Wie baust du aus diesen Einzelausdrücken den vollständigen `from_env()`-Methodenkörper zusammen?
- Wie könntest du mit einem Hilfsattribut `#[env = "ANDERER_NAME"]` den Umgebungsvariablen-Namen für ein Feld überschreiben?

### Modul 3: Vollendung & Hauptprogramm
- Wie setzt du in einem Test Umgebungsvariablen (`std::env::set_var`) und rufst dann `from_env()` auf?
- Was muss bei parallelen Tests mit `std::env::set_var` beachtet werden?
- Wie testest du den Fehlerfall, wenn eine Pflicht-Umgebungsvariable nicht gesetzt ist?
- Wie könntest du optionale Felder (`Option<T>`) unterstützen, die einfach `None` sind, wenn die Umgebungsvariable fehlt?

---

## Projekt 52: Derive Diff

### Modul 1: Basis-Datenstrukturen
- Was soll der Rückgabetyp der `diff`-Methode sein? Bietet sich ein dynamisch generiertes `MeinStructDiff`-Struct mit `Option`-Feldern an?
- Wie heißt das Trait und die Methode (z. B. `fn diff(&self, other: &Self) -> MeinStructDiff`)?
- Welche Felder soll das Diff-Struct enthalten? Für jedes Originalfeld ein `Option<(OriginalTyp, OriginalTyp)>` (alt, neu), wenn das Feld sich unterscheidet?
- Welche Trait-Bounds müssen die Feldtypen erfüllen (z. B. `PartialEq` zum Vergleichen, `Clone` zum Kopieren)?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du mit `quote!` neben dem `impl Diff`-Block auch ein komplett neues `struct MeinStructDiff { ... }`?
- Wie generierst du für jedes Feld die Vergleichslogik: Wenn die Werte ungleich sind, gib `Some((alt, neu))` zurück, sonst `None`?
- Wie baust du den Konstruktor für das Diff-Struct aus den einzelnen Feldausdrücken zusammen?
- Wie fügst du die notwendigen Trait-Bounds in den generierten `impl`-Block ein?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du, dass bei zwei identischen Structs alle Diff-Felder `None` sind und bei unterschiedlichen die richtigen Felder `Some` enthalten?
- Wie gibst du in `main.rs` ein Diff-Objekt lesbar aus?
- Wie könntest du das Makro erweitern, um auch geschachtelte Structs zu unterstützen?
- Nutze `cargo expand`, um die generierte Diff-Struktur und den `impl`-Block zu prüfen.

---

## Projekt 53: Derive AutoForm

### Modul 1: Basis-Datenstrukturen
- Was sind "Metadaten für UI-Formulare"? Denkst du an eine Struktur wie `struct FieldMeta { name: String, label: String, field_type: String }`?
- Welche Methode soll generiert werden (z. B. `fn form_fields() -> Vec<FieldMeta>`)? Ist das eine statische oder Instanzmethode?
- Wie könnte ein Hilfsattribut `#[form(label = "Vorname", type = "text")]` die generierten Metadaten beeinflussen?
- Welche Standardwerte verwendest du, wenn kein `#[form]`-Attribut vorhanden ist?

### Modul 2: Implementierung & Methoden
- Wie parst du für jedes Feld optionale `#[form(...)]`-Attribute mit `syn`? Welche `Meta`-Typen musst du unterscheiden?
- Wie erzeugst du im `quote!`-Block für jedes Feld einen `FieldMeta { name: "...", label: "...", field_type: "..." }`-Ausdruck?
- Wie sammelst du diese Ausdrücke in einem `vec![...]`-Aufruf im generierten Code?
- Wie referenzierst du die `FieldMeta`-Struktur im generierten Code – muss sie im selben Crate definiert sein?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du `MeinStruct::form_fields()` auf und iterierst in `main.rs` über die Metadaten?
- Wie testest du, dass die richtigen Labels und Typen für jedes Feld zurückgegeben werden?
- Wie könntest du die generierten Metadaten nutzen, um in einer Konsolenanwendung ein einfaches Formular auszugeben?
- Was sind die Grenzen dieses Ansatzes für komplexe UI-Frameworks?

---

## Projekt 54: Derive ToMap

### Modul 1: Basis-Datenstrukturen
- Warum ist eine Konvertierung in eine `HashMap<String, String>` nützlich (z. B. für Serialisierung, Logging, Konfigurationsweitergabe)?
- Welches Trait und welche Methode soll generiert werden (z. B. `fn to_map(&self) -> HashMap<String, String>`)?
- Wie musst du numerische Feldtypen in Strings umwandeln? Welches Trait nutzt Rust dafür (`ToString` bzw. `Display`)?
- Welche Felder könnten Probleme bereiten (z. B. `Option<T>`, `Vec<T>`, verschachtelte Structs)?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du im `quote!`-Block für jedes Feld den Ausdruck `map.insert("feldname".to_string(), self.feldname.to_string())`?
- Wie baust du den gesamten `to_map`-Methodenkörper mit `let mut map = HashMap::new();` und den Einfüge-Ausdrücken?
- Wie iterierst du in `quote!` über die Liste der generierten `insert`-Ausdrücke?
- Welchen `use`-Pfad musst du im generierten Code für `HashMap` angeben (Stichwort: voll qualifizierter Pfad)?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du, dass alle Felder korrekt als Schlüssel-Wert-Paare in der Map vorhanden sind?
- Wie verhält sich das Makro bei einem Struct mit vielen Feldern?
- Könntest du auch die Umkehroperation `from_map` implementieren? Welche Schwierigkeiten entstehen dabei?
- Nutze `cargo expand`, um den generierten Methodenkörper zu prüfen.

---

## Projekt 55: Derive CommandLineArgs

### Modul 1: Basis-Datenstrukturen
- Welche beliebten Crates (`clap`, `argh`) lösen dieses Problem bereits? Was lernst du, indem du es selbst mit einem Makro baust?
- Welche Konvention verwendest du für Kommandozeilen-Argumente (z. B. `--feldname` für Feldname `feldname`)?
- Welche Methode soll generiert werden (z. B. `fn from_args() -> Result<Self, String>`)?
- Wie nutzt du `std::env::args()` im generierten Code, um die Kommandozeilenargumente zu lesen?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du im generierten Code die Logik, die `std::env::args()` nach `--feldname wert`-Paaren durchsucht?
- Wie parsst du für jedes Feld den gefundenen String-Wert in den korrekten Feldtyp (Stichwort: `.parse::<FeldTyp>()`)?
- Wie erzeugst du für jedes Feld aus dem Feldnamen den passenden `--flagname`-String?
- Wie baust du die gesamte Parser-Logik im `quote!`-Block zusammen?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du die Parser-Funktion, ohne ein echtes Kommandozeilenargument setzen zu müssen?
- Wie verhält sich die Funktion, wenn ein Pflichtargument fehlt?
- Wie könntest du optionale Argumente mit Standardwerten über ein Hilfsattribut `#[arg(default = "42")]` unterstützen?
- Was sind die Grenzen dieses selbstgebauten Parsers im Vergleich zu `clap`?

---

## Projekt 56: Derive Encryptable

### Modul 1: Basis-Datenstrukturen
- Welche Sicherheitsüberlegungen sind beim Verschlüsseln von Struct-Feldern wichtig (Schlüsselverwaltung, Algorithmuswahl)?
- Welches Hilfsattribut `#[encrypt]` markiert zu verschlüsselnde Felder? Wie teilst du dem Makro den Schlüssel mit?
- Welche Methode soll generiert werden (z. B. `fn serialize_encrypted(&self, key: &[u8]) -> String`)?
- Da eine echte Verschlüsselung komplex ist: Welche einfache Simulation (z. B. Base64-Encoding oder XOR) kannst du für den Lernzweck verwenden?

### Modul 2: Implementierung & Methoden
- Wie prüfst du für jedes Feld, ob es das `#[encrypt]`-Attribut trägt?
- Wie erzeugst du für markierte Felder einen Verschlüsselungsausdruck und für nicht-markierte Felder eine einfache `to_string()`-Konvertierung?
- Wie baust du das Ergebnis (z. B. als JSON-ähnlichen String) aus den verarbeiteten Feldwerten zusammen?
- Welchen `attributes(encrypt)`-Parameter musst du in der `proc_macro_derive`-Deklaration eintragen?

### Modul 3: Vollendung & Hauptprogramm
- Wie übergibst du den Verschlüsselungsschlüssel an die generierte Methode in `main.rs`?
- Wie testest du, dass verschlüsselte Felder im Output anders aussehen als unverschlüsselte?
- Was müsstest du implementieren, um auch eine `deserialize_encrypted`-Methode zu generieren?
- Welche echten Verschlüsselungs-Crates (`aes`, `chacha20poly1305`) könntest du später einbinden?

---

## Projekt 57: Derive Randomizable

### Modul 1: Basis-Datenstrukturen
- Warum ist die automatische Generierung von Test-Zufallsdaten für Structs nützlich (z. B. für Property-Based-Tests)?
- Welches Trait und welche Methode soll generiert werden (z. B. `fn random() -> Self`)?
- Welches Crate stellt Zufallszahlen-Generierung bereit (`rand`)? Welche Traits aus `rand` sind relevant?
- Wie könntest du für verschiedene Feldtypen (`i32`, `String`, `f64`) passende Zufallswerte generieren?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du im `quote!`-Block für ein `i32`-Feld einen zufälligen Wert und für ein `String`-Feld eine zufällige Zeichenkette?
- Wie unterscheidest du im Makro anhand des Typnamens, welchen Zufallswert-Ausdruck du generierst?
- Wie baust du aus den Feldausdrücken einen vollständigen Struct-Konstruktor im `random()`-Methodenkörper?
- Wie stellst du sicher, dass der generierte Code das `rand`-Crate auch tatsächlich als Abhängigkeit hat?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du `MeinStruct::random()` in `main.rs` auf und gibst das Ergebnis aus?
- Wie testest du, dass zwei aufeinanderfolgende Aufrufe von `random()` unterschiedliche Ergebnisse liefern?
- Wie könntest du mit einem Hilfsattribut `#[random(min = 1, max = 100)]` den Wertebereich für numerische Felder einschränken?
- Welche Verbindung siehst du zu Property-Based-Testing-Crates wie `proptest` oder `quickcheck`?

---

## Projekt 58: Derive GraphQLObject

### Modul 1: Basis-Datenstrukturen
- Was sind die grundlegenden Konzepte von GraphQL (Schema, Typen, Resolver, Query)? Wie lassen sich Rust-Structs auf GraphQL-Typen abbilden?
- Welches populäre Crate (`async-graphql`, `juniper`) würde dieses Problem in der Praxis lösen? Was lernst du, indem du es selbst implementierst?
- Was soll dein Makro minimal erzeugen: Getter-Methoden als Resolver und eine `schema()`-Methode?
- Welche Einschränkungen machst du für dieses vereinfachte Makro (z. B. nur skalare Typen, keine Argumente)?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du mit `quote!` für jedes Feld eine öffentliche Getter-Methode, die einem GraphQL-Resolver entspricht?
- Wie generierst du eine statische Methode `schema() -> String`, die das GraphQL-Schema als String zurückgibt?
- Wie bildest du Rust-Typen (`String`, `i32`, `f64`, `bool`) auf GraphQL-Typen (`String`, `Int`, `Float`, `Boolean`) ab?
- Wie erzeugst du aus dem Struct-Namen den GraphQL-Typnamen?

### Modul 3: Vollendung & Hauptprogramm
- Wie rufst du in `main.rs` `MeinStruct::schema()` auf und gibst das Schema aus?
- Wie testest du, dass das generierte Schema den Struct-Namen und alle Felder korrekt enthält?
- Was wären die nächsten Schritte, um dieses einfache Makro mit `async-graphql` zu verbinden?
- Nutze `cargo expand`, um die generierten Resolver-Methoden zu inspizieren.

---

## Projekt 59: Derive CSVRecord

### Modul 1: Basis-Datenstrukturen
- Was bedeutet es, ein Struct "CSV-fähig" zu machen? Welche zwei Richtungen (Lesen und Schreiben) müssen unterstützt werden?
- Welche Methoden soll das Makro generieren (z. B. `to_csv_record(&self) -> String` und `from_csv_record(line: &str) -> Result<Self, String>`)?
- Wie bestimmst du die Reihenfolge der Felder im CSV-Record? Entspricht sie der Reihenfolge der Felder im Struct?
- Wie gehst du mit Feldern um, die Kommas oder Zeilenumbrüche im Wert enthalten (CSV-Escaping)?

### Modul 2: Implementierung & Methoden
- Wie erzeugst du im `quote!`-Block für `to_csv_record` einen Ausdruck, der alle Feldwerte mit Komma verbindet?
- Wie erzeugst du für `from_csv_record` die Logik, die einen String anhand von Kommas splittet und die Teile in die Felder des Structs parst?
- Wie verwendest du `split(',').nth(index)` im generierten Code, um die einzelnen CSV-Spalten den richtigen Feldern zuzuordnen?
- Wie behandelst du Parsing-Fehler für einzelne Felder im generierten Code?

### Modul 3: Vollendung & Hauptprogramm
- Wie testest du, dass `to_csv_record` und `from_csv_record` invers zueinander sind (Round-Trip-Test)?
- Wie könntest du eine Hilfsmethode `csv_header() -> String` generieren, die die Feldnamen als CSV-Kopfzeile ausgibt?
- Wie würdest du mit `#[csv(skip)]` bestimmte Felder aus dem CSV-Record ausschließen?
- Welche echten CSV-Crates würdest du in einem produktiven Projekt verwenden?

---

## Projekt 60: Derive StateMachine

### Modul 1: Basis-Datenstrukturen
- Was ist eine Zustandsmaschine? Welche Kernkonzepte (Zustände, Übergänge, Ereignisse) musst du modellieren?
- Welches Hilfsattribut verwendest du, um erlaubte Übergänge zu definieren (z. B. `#[transition(from = "Idle", to = "Running")]`)?
- Welche Methoden soll das Makro generieren (z. B. `can_transition_to(&self, target: &State) -> bool` und sichere Übergangsmethoden)?
- Warum ist ein Enum die natürliche Darstellung für Zustände einer Zustandsmaschine?

### Modul 2: Implementierung & Methoden
- Wie liest du aus einem `Data::Enum` alle Varianten aus und interpretierst sie als Zustände?
- Wie parst du für jede Variante die `#[transition(...)]`-Attribute, um erlaubte Übergänge zu extrahieren?
- Wie erzeugst du mit `quote!` eine `can_transition_to`-Methode, die anhand der aktuellen Variante und der Zielvariante `true` oder `false` zurückgibt?
- Wie generierst du sichere Übergangsmethoden, die einen Fehler zurückgeben, wenn der Übergang nicht erlaubt ist?

### Modul 3: Vollendung & Hauptprogramm
- Wie definierst du in `main.rs` einen Enum mit Zuständen und Übergängen und nutzt `#[derive(StateMachine)]`?
- Wie testest du, dass ein erlaubter Übergang klappt und ein unerlaubter einen Fehler zurückgibt?
- Was passiert bei einem Compile-Fehler in deinem Makro – wie hilfreich sind die Fehlermeldungen?
- Welche etablierten Zustandsmaschinen-Crates (`sm`, `rust-fsm`) gibt es, und wie unterscheiden sie sich von deinem Ansatz?

---
## Projekte 61–80: Attribut- & Funktions-Makros

---

## Projekt 61: Memoize-Attribut

### Modul 1: Basis-Datenstrukturen

- Welche Makro-Art benötigst du hier – `proc_macro_attribute` oder `proc_macro`? Was ist der Unterschied, und warum passt `proc_macro_attribute` besser für `#[memoize]`?
- Wie muss dein Einstiegspunkt in der Makro-Crate aussehen? Welche Signatur hat eine `pub fn memoize(attr: TokenStream, item: TokenStream) -> TokenStream`-Funktion?
- Welche externe Crate brauchst du, um den Cache zu speichern (z. B. `lazy_static`, `once_cell`, `std::collections::HashMap`)? Wie trägst du sie in `Cargo.toml` ein?
- Was sind `syn::ItemFn` und `proc_macro2::TokenStream`? Wozu brauchst du beide beim Schreiben von prozeduralen Makros?

### Modul 2: Implementierung & Methoden

- Wie extrahierst du den Funktionsnamen aus dem geparsten `syn::ItemFn`, um einen eindeutigen Schlüssel für den Cache zu erzeugen?
- Wie baust du mit `quote!` einen neuen Funktionsrumpf, der zuerst im Cache nachschaut und nur bei Cache-Miss die ursprüngliche Logik ausführt?
- Wie übergibst du Funktionsargumente als Cache-Schlüssel? Was musst du beachten, wenn Argumente nicht `Hash + Eq` implementieren?
- Wie stellst du sicher, dass der erzeugte Cache (`HashMap`) thread-sicher und statisch ist, ohne ein Data Race zu riskieren?

### Modul 3: Vollendung & Hauptprogramm

- Wie bindest du deine Makro-Crate in ein separates Binär-Projekt ein (`proc-macro = true` in `Cargo.toml`)? Wie sieht die Projektstruktur aus?
- Wie testest du, ob das Caching wirklich funktioniert – z. B. durch eine Funktion mit Seiteneffekt (Zähler, Logging), die nur einmal aufgerufen werden sollte?
- Wie nutzt du `cargo expand` (crate `cargo-expand`), um den vom Makro erzeugten Code anzuzeigen? Welchen Befehl rufst du dafür auf?
- Was passiert, wenn du `#[memoize]` auf eine Funktion mit einem Rückgabetyp anwendest, der nicht `Clone` implementiert? Wie könntest du diesen Fall im Makro erkennen und dem Nutzer melden?

---

## Projekt 62: Deprecated-Warning-Attribut

### Modul 1: Basis-Datenstrukturen

- Welche Makro-Art verwendest du für ein Attribut, das beim Kompilieren eine Warnung auslöst – und gibt es eventuell einen einfacheren Weg über Rust-Built-ins (`#[deprecated]`), den du zuerst kennen solltest?
- Wie sieht die grundlegende Struktur einer `proc_macro_attribute`-Funktion aus? Welche zwei `TokenStream`-Parameter empfängt sie?
- Welche `syn`-Typen brauchst du, um den `item`-TokenStream als Funktion zu parsen? Wie heißt der relevante Typ?
- Wie kann ein prozedurales Makro eine Compiler-Warnung ausgeben? Kennst du `proc_macro_error` oder `syn::Error`? Was ist der Unterschied zwischen einem Fehler und einer Warnung auf dieser Ebene?

### Modul 2: Implementierung & Methoden

- Wie parst du den `attr`-TokenStream, um eine benutzerdefinierte Warnmeldung als String-Argument entgegenzunehmen (z. B. `#[deprecated_warn("Bitte stattdessen foo() verwenden")]`)?
- Wie erzeugst du mit `quote!` ein Wrapper-Makro, das `compile_error!` oder einen `eprintln!`-Aufruf bei jeder Nutzung einbettet?
- Wie stellst du sicher, dass der ursprüngliche Funktionskörper erhalten bleibt und weiterhin aufrufbar ist, auch wenn die Warnung ausgegeben wird?
- Wie kannst du im erzeugten Code einen `#[deprecated(note = "...")]`-Hilfsattribut direkt einbetten, anstatt eigene Logik zu schreiben?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du, ob die Warnung tatsächlich beim Kompilieren erscheint? Welche Cargo-Optionen (`-W`, `--deny`) helfen dir dabei?
- Wie unterscheidest du in deinem Makro, ob der Aufrufer die Warnung als Fehler behandeln möchte (über ein Argument wie `#[deprecated_warn(error)]`)?
- Wie nutzt du `cargo expand`, um zu sehen, was dein Makro aus der Funktion macht?
- Was sind die Grenzen eines prozeduralen Makros beim Ausgeben echter Compiler-Warnungen (im Gegensatz zu Fehlern)?

---

## Projekt 63: Route-Attribut

### Modul 1: Basis-Datenstrukturen

- Welche Makro-Art ist `#[route(GET, "/users")]`? Wie unterscheidet sich das Parsen von Attribut-Argumenten mit mehreren Parametern (Method + Pfad) vom einfachen Fall?
- Welche Typen aus `syn` helfen dir, Bezeichner (`GET`) und String-Literale (`"/users"`) aus dem `attr`-TokenStream zu lesen? Schaue dir `syn::parse::Parser` und `syn::punctuated::Punctuated` an.
- Welche Crates kennt das Rust-Ökosystem für Web-Routing (z. B. `axum`, `actix-web`)? Wie registrieren diese Frameworks Routen intern, und was soll dein Makro nachahmen?
- Wie speicherst du registrierte Routen global zur Laufzeit? Welche Rolle könnte ein `lazy_static!`-`Vec` oder eine `inventory`-Crate spielen?

### Modul 2: Implementierung & Methoden

- Wie parst du den `attr`-TokenStream, um sowohl den HTTP-Methoden-Bezeichner als auch den Pfad-String zu extrahieren? Welche Fehler solltest du ausgeben, wenn das Format falsch ist?
- Wie baust du mit `quote!` Code, der die Funktion bei einer globalen Routen-Registry anmeldet (z. B. über einen `ctor`- oder `inventory`-Mechanismus)?
- Wie stellst du sicher, dass der ursprüngliche Funktionskörper (Handler-Logik) unverändert bleibt und nur der Registrierungscode hinzugefügt wird?
- Wie gehst du mit verschiedenen HTTP-Methoden (GET, POST, PUT, DELETE) im selben Makro um? Verwendest du ein `match`-Statement im generierten Code?

### Modul 3: Vollendung & Hauptprogramm

- Wie schreibst du eine einfache `main.rs`, die alle registrierten Routen ausgibt, um zu zeigen, dass das Makro funktioniert?
- Wie testest du, dass ein falsches Argument wie `#[route(PATCH)]` (ohne Pfad) einen hilfreichen Compile-Fehler erzeugt?
- Wie erweiterst du das Makro um Middleware-Unterstützung (z. B. `#[route(GET, "/admin", middleware = auth)]`)?
- Wie debuggst du den generierten Code mit `cargo expand`?

---

## Projekt 64: Timeout-Attribut

### Modul 1: Basis-Datenstrukturen

- Was bedeutet es, eine Funktion „abzubrechen, wenn sie zu lange läuft"? Welche Mechanismen bietet Rust dafür (Threads, async/await, `tokio::time::timeout`)?
- Welche Makro-Art verwendest du für `#[timeout(5)]`? Wie parst du das numerische Argument aus dem `attr`-TokenStream?
- Welchen `syn`-Typ brauchst du, um eine Ganzzahl (`LitInt`) aus dem Attribut zu lesen?
- Wie erkennst du im `item`-TokenStream, ob die dekorierte Funktion `async` ist? Welches Feld von `syn::ItemFn` verrät das?

### Modul 2: Implementierung & Methoden

- Wie wickelst du mit `quote!` einen `async`-Funktionsaufruf in `tokio::time::timeout(Duration::from_secs(N), ...)` ein?
- Wie gehst du mit dem Fall um, dass die Funktion *nicht* async ist? Kannst du dann dennoch einen Timeout erzwingen (z. B. via Thread)?
- Wie wandelst du das geparste `LitInt` in einen Rust-Ausdruck für die Dauer um, der in den generierten Code eingebettet wird?
- Wie behandelst du den `Elapsed`-Fehler, den `tokio::time::timeout` zurückgibt? Was soll dein Makro zurückgeben: `Result` oder `panic!`?

### Modul 3: Vollendung & Hauptprogramm

- Wie richtest du die `tokio`-Laufzeitumgebung in deiner Test-`main.rs` ein (`#[tokio::main]`)?
- Wie testest du, ob der Timeout tatsächlich ausgelöst wird (z. B. mit einer Funktion, die `tokio::time::sleep` nutzt)?
- Wie gibst du dem Nutzer eine hilfreiche Fehlermeldung, wenn er `#[timeout(5)]` auf eine synchrone Funktion anwendet, die keinen Thread-Mechanismus unterstützt?
- Wie nutzt du `cargo expand`, um den erzeugten async-Wrapper-Code zu inspizieren?

---

## Projekt 65: MeasurePerformance-Attribut

### Modul 1: Basis-Datenstrukturen

- Welche Makro-Art brauchst du, und wie unterscheidet sich dieses Projekt von einem einfachen Wrapper? Was muss gemessen werden (Zeitpunkt vor und nach dem Aufruf)?
- Welche Rust-Typen aus `std::time` kannst du verwenden, um Laufzeit zu messen? Wie heißen `Instant` und `Duration`?
- Welche Typen aus `syn` brauchst du, um die Funktion zu parsen und Informationen wie den Funktionsnamen zu extrahieren?
- Was ist ein „Logging-System" im Kontext dieses Projekts? Reicht `println!` oder `eprintln!`, oder willst du die `log`-Crate verwenden?

### Modul 2: Implementierung & Methoden

- Wie baust du mit `quote!` einen Wrapper, der `Instant::now()` vor dem Funktionskörper und `.elapsed()` danach aufruft?
- Wie extrahierst du den Funktionsnamen als String, um ihn in die Log-Nachricht einzubauen?
- Wie stellst du sicher, dass der Rückgabewert der originalen Funktion korrekt weitergeleitet wird, auch wenn du Code davor und danach einfügst?
- Wie gehst du mit `async`-Funktionen um? Brauchst du `.await` im generierten Wrapper?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du das Makro mit einer Funktion, die eine bekannte Laufzeit hat (z. B. `std::thread::sleep`)?
- Wie erweiterst du das Makro, um die Messdaten an ein externes System zu senden (z. B. als HTTP-POST mit `reqwest`)?
- Wie leitest du im generierten Code die Laufzeit-Information an die `log`-Crate weiter (`log::info!`)?
- Wie siehst du den erzeugten Code mit `cargo expand` und prüfst, ob der Return-Wert korrekt übergeben wird?

---

## Projekt 66: Trace-Calls-Attribut

### Modul 1: Basis-Datenstrukturen

- Was soll das Makro konkret tun? Welche zwei Punkte im Kontrollfluss willst du mit Log-Nachrichten markieren (Eintreten und Verlassen)?
- Welche Makro-Art verwendest du? Wie sieht die grundlegende Signatur aus?
- Welche `syn`-Typen brauchst du, um den Funktionsnamen und die Parameterliste auszulesen?
- Welches Logging-Framework möchtest du nutzen: `println!`, `log`, `tracing`? Welche Crate musst du dann einbinden?

### Modul 2: Implementierung & Methoden

- Wie baust du mit `quote!` Code, der beim Betreten der Funktion eine Nachricht wie `"Entering: my_function"` ausgibt?
- Wie stellst du sicher, dass die „Verlassen"-Nachricht auch bei einem frühen `return` oder einem `panic!` ausgegeben wird? Kennst du das RAII-Muster für diesen Zweck?
- Wie kannst du die Funktionsargumente in die Trace-Nachricht einbauen (z. B. `"Entering: my_function(x=5, y=3)"`)? Was musst du bei Typen ohne `Debug`-Implementierung beachten?
- Wie extrahierst du die Parameternamen aus `syn::ItemFn` (Tipp: schaue dir `sig.inputs` an)?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du, ob beide Nachrichten (Enter/Exit) bei einem normalen Aufruf erscheinen?
- Wie testest du das Verhalten bei einem frühen `return`-Statement im Funktionskörper?
- Wie konfigurierst du das Logging-Framework (z. B. `tracing_subscriber`), damit die Ausgaben sichtbar sind?
- Wie nutzt du `cargo expand`, um den RAII-Guard oder den Wrapper-Code zu inspizieren?

---

## Projekt 67: Retry-Attribut

### Modul 1: Basis-Datenstrukturen

- Was bedeutet „Retry"? In welchem Fall soll die Funktion erneut aufgerufen werden – nur bei `Err`, nur bei `panic!`, oder bei beidem?
- Wie parst du das numerische Argument `3` aus `#[retry(3)]`? Welchen `syn`-Typ verwendest du für Ganzzahl-Literale?
- Welchen Rückgabetyp muss die dekorierte Funktion haben, damit ein Retry sinnvoll ist (`Result<T, E>`)? Wie erkennst du das im geparsten `ItemFn`?
- Brauchst du eine externe Crate, oder reicht eine einfache `loop`-Schleife mit einem Zähler im generierten Code?

### Modul 2: Implementierung & Methoden

- Wie baust du mit `quote!` eine `for`-Schleife oder `loop`, die den Funktionskörper bis zu N-mal aufruft?
- Wie leitest du bei Erfolg (`Ok(...)`) sofort den Wert zurück, ohne weitere Versuche zu unternehmen?
- Wie gibst du nach dem letzten Fehlversuch den letzten `Err`-Wert zurück?
- Wie fügst du optional eine Wartezeit zwischen den Versuchen ein (exponentielles Backoff)? Welche `std`-Funktion hilft hier?

### Modul 3: Vollendung & Hauptprogramm

- Wie schreibst du eine Test-Funktion, die die ersten zwei Aufrufe mit `Err` und den dritten mit `Ok` beantwortet (z. B. über eine statische Zähler-Variable)?
- Wie stellst du sicher, dass bei einem dauerhaften Fehler nach genau N Versuchen aufgehört wird?
- Wie erweiterst du das Makro auf `#[retry(3, delay_ms = 100)]`? Wie parst du mehrere benannte Argumente?
- Wie debuggst du den erzeugten Schleifen-Code mit `cargo expand`?

---

## Projekt 68: ThreadSafe-Attribut

### Modul 1: Basis-Datenstrukturen

- Was bedeutet es, eine Funktion „thread-sicher zu machen" durch einen Mutex? Welchen Typ aus `std::sync` brauchst du (`Mutex`, `RwLock`)?
- Welche Makro-Art verwendest du? Braucht das Makro Argumente, oder reicht `#[thread_safe]` ohne Parameter?
- Welche `syn`-Typen brauchst du, um den Funktionsrumpf zu extrahieren und in den Mutex-Block einzubetten?
- Wie deklarierst du einen globalen, statischen `Mutex` in Rust? Welche Crates oder Sprachmittel (`lazy_static`, `OnceLock`) helfen dir?

### Modul 2: Implementierung & Methoden

- Wie baust du mit `quote!` Code, der vor dem Funktionskörper `mutex.lock().unwrap()` aufruft und den Lock für die Dauer des Funktionskörpers hält?
- Wie stellst du sicher, dass der Mutex-Lock auch beim Verlassen der Funktion (frühe Returns, Panics) wieder freigegeben wird (RAII)?
- Was passiert, wenn die Funktion Parameter hat? Wie übergibst du sie korrekt in den generierten Code?
- Welche Granularität wählt der Mutex – einen pro Funktion oder einen global? Was sind die Auswirkungen auf die Performance?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du die Thread-Sicherheit, indem du mehrere Threads gleichzeitig dieselbe Funktion aufrufen lässt?
- Wie zeigst du, dass ohne das Makro ein Datenwettlauf auftreten würde?
- Was sind die Grenzen dieses Ansatzes (z. B. Deadlocks, wenn die Funktion sich selbst aufruft)?
- Wie inspizierst du den generierten Code mit `cargo expand`?

---

## Projekt 69: Singleton-Attribut

### Modul 1: Basis-Datenstrukturen

- Was ist das Singleton-Muster? Warum ist es in Rust besonders interessant und welche Herausforderungen bringt globaler Zustand mit sich?
- Welche Makro-Art verwendest du für ein Attribut auf einem Struct (`#[singleton]`)? Wie unterscheidet sich das Parsen eines `syn::ItemStruct` von einem `syn::ItemFn`?
- Welche Typen aus `std::sync` oder der Crate `once_cell` helfen dir, eine einmalig initialisierbare, globale Instanz zu bauen?
- Welche Methoden soll das Makro automatisch zum Struct hinzufügen (z. B. `get_instance() -> &'static Mutex<MyStruct>`)?

### Modul 2: Implementierung & Methoden

- Wie parst du den `item`-TokenStream als `syn::ItemStruct` statt als `syn::ItemFn`?
- Wie erzeugst du mit `quote!` eine statische Variable (`static INSTANCE: OnceLock<Mutex<MyStruct>>`) und eine `get_instance()`-Funktion?
- Wie stellst du sicher, dass `get_instance()` beim ersten Aufruf initialisiert und bei jedem weiteren Aufruf dieselbe Instanz zurückgibt?
- Wie übergibst du einen Initializer an das Makro (z. B. `#[singleton(default)]` vs. `#[singleton(MyStruct::new())]`)?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du, dass zwei Aufrufe von `get_instance()` denselben Speicherbereich zurückgeben?
- Wie gehst du mit Multi-Threading um – ist dein Singleton thread-sicher?
- Was sind die Nachteile des Singleton-Musters in Rust, und wie kommunizierst du das im Makro (z. B. über Dokumentation)?
- Wie nutzt du `cargo expand`, um den generierten `impl`-Block und die statische Variable zu sehen?

---

## Projekt 70: FormatCheck-Funktionsmakro

### Modul 1: Basis-Datenstrukturen

- Was ist ein `proc_macro` (Funktions-Makro) im Unterschied zu einem `proc_macro_attribute`? Wie sieht die Signatur aus (`pub fn format_check(input: TokenStream) -> TokenStream`)?
- Welche Formate möchtest du prüfen (E-Mail, IP-Adresse)? Welche regulären Ausdrücke oder Parser brauchst du dafür?
- Wie liest du einen String-Literal aus dem `input`-TokenStream? Welchen `syn`-Typ brauchst du (`LitStr`)?
- Welche Crate hilft dir mit regulären Ausdrücken in Rust (`regex`)? Kann diese Crate auch zur Compile-Zeit genutzt werden?

### Modul 2: Implementierung & Methoden

- Wie parst du den Eingabe-TokenStream, um den String-Literal zu extrahieren, und wie gibst du einen hilfreichen Fehler aus, wenn kein String übergeben wird?
- Wie wendest du die Validierungslogik auf den extrahierten String an, und wie erzeugst du einen `compile_error!`, wenn das Format ungültig ist?
- Wie gibst du bei gültigem Format den ursprünglichen String-Literal als TokenStream zurück, damit er im Code verwendet werden kann?
- Wie erweiterst du das Makro, um den Format-Typ als zweites Argument entgegenzunehmen (z. B. `format_check!("test@test.de", email)`)?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du, dass `format_check!("keine-email")` einen Compile-Fehler erzeugt?
- Wie testest du, dass `format_check!("user@example.com")` korrekt kompiliert?
- Wie erweiterst du das Makro um weitere Formate wie Telefonnummern oder URLs?
- Wie nutzt du `cargo expand`, um zu sehen, was das Makro mit einem gültigen String macht?

---

## Projekt 71: Inject-Attribut

### Modul 1: Basis-Datenstrukturen

- Was ist Dependency Injection? Welches Problem löst es, und warum ist ein Makro ein interessanter Ansatz dafür in Rust?
- Welche Makro-Art verwendest du? Wie kann das Makro wissen, welcher Typ aus dem Container injiziert werden soll?
- Wie könnte ein globaler „Container" in Rust aussehen (z. B. eine `HashMap<TypeId, Box<dyn Any>>`)?
- Welche `syn`-Typen brauchst du, um Funktionsargumente und ihre Typen auszulesen?

### Modul 2: Implementierung & Methoden

- Wie parst du die Parameterliste einer Funktion mit `syn`, um die Typen der zu injizierenden Parameter zu finden?
- Wie erzeugst du mit `quote!` Code, der beim Funktionsaufruf fehlende Argumente aus dem globalen Container auflöst?
- Wie markierst du, welche Parameter injiziert werden sollen und welche normal übergeben werden (z. B. über ein Hilfsattribut `#[inject]` am Parameter)?
- Was passiert, wenn der benötigte Typ nicht im Container registriert ist? Soll das zur Compile-Zeit oder zur Laufzeit einen Fehler auslösen?

### Modul 3: Vollendung & Hauptprogramm

- Wie registrierst du Abhängigkeiten im Container (z. B. `container.register(MyService::new())`)?
- Wie testest du, dass die Abhängigkeit korrekt injiziert wird, ohne sie explizit zu übergeben?
- Wie ersetzt du im Testmodus eine echte Abhängigkeit durch eine Mock-Implementierung?
- Wie nutzt du `cargo expand`, um den generierten Auflösungs-Code zu inspizieren?

---

## Projekt 72: Transactional-Attribut

### Modul 1: Basis-Datenstrukturen

- Was ist eine Datenbank-Transaktion? Welche Operationen (Begin, Commit, Rollback) musst du im generierten Code aufrufen?
- Welche Makro-Art verwendest du? Braucht das Attribut Argumente (z. B. den Transaktions-Typ)?
- Welche Datenbank-Crate willst du simulieren oder nutzen (z. B. `sqlx`, eine eigene Trait-Abstraktion)? Wie sieht ein minimales `Transaction`-Trait aus?
- Welchen Rückgabetyp muss die dekorierte Funktion haben (`Result<T, E>`), damit ein Rollback bei Fehler sinnvoll ist?

### Modul 2: Implementierung & Methoden

- Wie baust du mit `quote!` Code, der vor dem Funktionskörper eine Transaktion startet und den Transaktions-Handle als Parameter übergibt?
- Wie prüfst du den `Result`-Rückgabewert und rufst je nach Ergebnis `commit()` oder `rollback()` auf?
- Wie übergibst du den Transaktions-Handle an den Funktionskörper, ohne die Funktionssignatur manuell anpassen zu müssen?
- Wie gehst du mit Fehlern in `commit()` oder `rollback()` selbst um?

### Modul 3: Vollendung & Hauptprogramm

- Wie schreibst du eine Test-Implementierung des `Transaction`-Traits, die protokolliert, ob Commit oder Rollback aufgerufen wurde?
- Wie testest du den Rollback-Pfad, indem du eine Funktion zum Scheitern bringst?
- Wie erweiterst du das Makro um `#[transactional(isolation = "serializable")]`?
- Wie nutzt du `cargo expand`, um den generierten Try-Commit-Rollback-Code zu sehen?

---

## Projekt 73: HideImplementation-Attribut

### Modul 1: Basis-Datenstrukturen

- Was ist Rustdoc, und wie werden Funktionskörper normalerweise in der generierten Dokumentation behandelt (werden sie angezeigt oder nicht)?
- Welche Makro-Art verwendest du? Was soll das Makro konkret verändern – den Code selbst oder nur die Dokumentation?
- Wie fügt Rust Dokumentationskommentare (`///`) in den AST ein? Welche `syn`-Typen repräsentieren Attribute und Dokumentation (`Attribute`)?
- Welche Rustdoc-Attribute kennst du, die die Anzeige von Code beeinflussen (z. B. `#[doc(hidden)]`)?

### Modul 2: Implementierung & Methoden

- Wie fügst du mit `quote!` ein `#[doc(hidden)]`-Attribut zur dekorierten Funktion hinzu?
- Wie erstellst du alternativ eine öffentliche Stub-Funktion mit einem nichtssagenden Körper für die Dokumentation und eine private Funktion mit der echten Implementierung?
- Wie extrahierst du existierende `///`-Kommentare aus dem `ItemFn` und überträgst sie auf die Stub-Funktion?
- Was sind die Grenzen dieses Ansatzes? Kann man den echten Code immer noch in `cargo expand` sehen?

### Modul 3: Vollendung & Hauptprogramm

- Wie generierst du mit `cargo doc` die Dokumentation und prüfst, ob der Funktionskörper versteckt ist?
- Wie testest du, dass die Funktion weiterhin korrekt aufgerufen werden kann, obwohl ihre Implementierung versteckt ist?
- Wie kommunizierst du im Makro, dass dieses Tool nur die *Dokumentation* beeinflusst, nicht die Sicherheit?
- Wie nutzt du `cargo expand`, um zu sehen, welche Attribute dein Makro erzeugt hat?

---

## Projekt 74: InlineAssembly-Helper

### Modul 1: Basis-Datenstrukturen

- Was ist Inline-Assembly in Rust? Wie lautet die Rust-Syntax für `asm!`-Blöcke, und welche Plattformen werden unterstützt?
- Welche Makro-Art verwendest du (Funktions-Makro `proc_macro`)? Was soll dein Makro parsen – Assembly-Anweisungen als String?
- Wie liest du einen String-Literal aus dem `input`-TokenStream? Was musst du beim Parsen von plattformspezifischem Assembler-Code beachten?
- Welche Sicherheitsüberlegungen (`unsafe`) sind bei Inline-Assembly wichtig, und wie reflektierst du das im generierten Code?

### Modul 2: Implementierung & Methoden

- Wie parst du den Eingabe-String, um einzelne Assembly-Anweisungen zu extrahieren (z. B. kommasepariert)?
- Wie erzeugst du mit `quote!` einen `unsafe`-Block mit einem `asm!`-Makroaufruf, der die geparsten Anweisungen einbettet?
- Wie erkennst du die Zielplattform zur Compile-Zeit (z. B. über `cfg`-Attribute), um plattformspezifischen Code zu erzeugen?
- Wie gibst du einen hilfreichen Fehler aus, wenn das Makro auf einer nicht unterstützten Plattform verwendet wird?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du den erzeugten `asm!`-Block auf einer x86_64-Plattform (z. B. mit einem einfachen `NOP`-Test)?
- Wie nutzt du `cargo expand`, um den generierten `unsafe`-Block zu inspizieren?
- Wie erweiterst du das Makro um Unterstützung für Register-Constraints (z. B. `in("rax") val`)?
- Was sind die Grenzen eines Makros für Inline-Assembly, und wann solltest du lieber externe Assembler-Dateien verwenden?

---

## Projekt 75: CompileTimeMath-Funktionsmakro

### Modul 1: Basis-Datenstrukturen

- Was ist der Unterschied zwischen einem `const fn`-Ausdruck und einem Makro für Compile-Zeit-Berechnungen? Wann ist ein Makro notwendig?
- Welche Makro-Art verwendest du (`proc_macro`)? Wie sieht die Signatur aus?
- Wie liest du einen mathematischen Ausdruck als String oder als Token-Folge aus dem `input`-TokenStream? Welche `syn`-Typen helfen beim Parsen von Ausdrücken (`syn::Expr`)?
- Welche mathematischen Operationen möchtest du unterstützen (+, -, *, /, Potenzen, Klammern)?

### Modul 2: Implementierung & Methoden

- Wie implementierst du einen einfachen Ausdrucks-Evaluator (Parser + Evaluator) in deiner Makro-Crate?
- Wie wandelst du das berechnete Ergebnis mit `quote!` in ein Integer- oder Float-Literal um, das als Konstante im Code eingebettet wird?
- Wie gibst du einen hilfreichen `compile_error!` aus, wenn der Ausdruck syntaktisch falsch ist (z. B. `ctmath!(1 + * 2)`)?
- Wie gehst du mit Division durch Null zur Compile-Zeit um?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du, dass `const N: i32 = ctmath!(2 + 3 * 4);` zum korrekten Wert `14` kompiliert?
- Wie prüfst du mit `cargo expand`, welches Literal das Makro eingesetzt hat?
- Wie erweiterst du das Makro um benannte Konstanten (z. B. `ctmath!(PI * r * r)`)?
- Was sind die Grenzen dieses Ansatzes im Vergleich zu `const fn`?

---

## Projekt 76: Permission-Attribut

### Modul 1: Basis-Datenstrukturen

- Was soll `#[requires_role("Admin")]` konkret tun? Wann und wie wird die Berechtigungsprüfung durchgeführt – zur Compile-Zeit oder zur Laufzeit?
- Welche Makro-Art verwendest du? Wie parst du den String-Parameter `"Admin"` aus dem `attr`-TokenStream?
- Welchen Typ nutzt du, um den aktuellen Benutzerkontext zu repräsentieren (z. B. ein globales `Context`-Objekt oder ein Funktionsparameter)?
- Wie wird der Kontext zur Laufzeit an den Check übergeben – als Funktionsparameter, globale Variable oder Thread-Local?

### Modul 2: Implementierung & Methoden

- Wie baust du mit `quote!` Code, der am Anfang der Funktion `context.has_role("Admin")` prüft und bei Misserfolg einen `Err` oder `panic!` zurückgibt?
- Wie parst du den `attr`-TokenStream, um den Rollennamen als String zu extrahieren?
- Wie gehst du mit Funktionen um, die mehrere Rollen erlauben sollen (z. B. `#[requires_role("Admin", "Moderator")]`)?
- Wie stellst du sicher, dass der Funktionskörper nicht ausgeführt wird, wenn die Berechtigung fehlt?

### Modul 3: Vollendung & Hauptprogramm

- Wie schreibst du eine Test-Implementierung des Benutzer-Kontexts, um beide Fälle (berechtigt, nicht berechtigt) zu testen?
- Wie testest du, dass ein unberechtigter Aufruf tatsächlich abgebrochen wird?
- Wie erweiterst du das Makro um `#[requires_role("Admin", deny_action = "redirect")]`?
- Wie nutzt du `cargo expand`, um den generierten Prüf-Code am Funktionsanfang zu sehen?

---

## Projekt 77: MockFunction-Attribut

### Modul 1: Basis-Datenstrukturen

- Was ist ein Mock in Tests? Welches Problem löst ein Makro, das den Funktionskörper im Testmodus ersetzt?
- Welche Makro-Art verwendest du? Wie erkennt das Makro, ob es sich im Testmodus befindet (`cfg(test)`)? Kann ein prozedurales Makro `cfg`-Flags lesen?
- Welche `syn`-Typen brauchst du, um den originalen Funktionskörper zu lesen und durch einen anderen zu ersetzen?
- Wie übergibst du die Mock-Antwort als Argument an das Attribut (z. B. `#[mock_function(returns = 42)]`)?

### Modul 2: Implementierung & Methoden

- Wie baust du mit `quote!` eine Funktion, die im Testmodus (`#[cfg(test)]`) den Mock-Körper verwendet und im normalen Build den Original-Körper?
- Wie extrahierst du den `returns`-Wert aus dem `attr`-TokenStream und bettest ihn in den generierten Code ein?
- Wie gehst du damit um, dass der Mock-Rückgabewert zum tatsächlichen Rückgabetyp der Funktion passen muss?
- Wie erzeugst du zwei separate Funktionsdefinitionen (`#[cfg(not(test))]` und `#[cfg(test)]`) mit demselben Namen?

### Modul 3: Vollendung & Hauptprogramm

- Wie schreibst du einen Unit-Test, der prüft, dass die gemockte Version aufgerufen wird?
- Wie stellst du sicher, dass im Produktions-Build die echte Funktion aufgerufen wird?
- Wie erweiterst du das Makro, um Mock-Funktionen aus einer externen Quelle zu laden (z. B. `#[mock_function(with = "my_mock_fn")]`)?
- Wie nutzt du `cargo expand --tests`, um den generierten Code im Testmodus zu sehen?

---

## Projekt 78: GenerateBindings-Attribut

### Modul 1: Basis-Datenstrukturen

- Was sind C-kompatible Bindings? Was bedeutet `extern "C"` und `#[no_mangle]` in Rust? Welche Einschränkungen gelten für Typen?
- Welche Makro-Art verwendest du? Was soll das Makro erzeugen – Code in Rust, eine separate Header-Datei, oder beides?
- Welche `syn`-Typen brauchst du, um Funktionsname, Parameter-Typen und Rückgabetyp auszulesen?
- Wie kannst du aus einem Makro heraus eine externe Datei (`.h`-Datei) schreiben? Welche Rust-APIs stehen dir zur Compile-Zeit zur Verfügung (`std::fs`, `OUT_DIR`)?

### Modul 2: Implementierung & Methoden

- Wie übersetzt du Rust-Typen (`i32`, `f64`, `*const c_char`) in ihre C-Äquivalente für den Header?
- Wie erzeugst du mit `quote!` die `#[no_mangle] pub extern "C" fn`-Version der Funktion?
- Wie schreibst du den C-Header-String (z. B. `int my_function(int x, double y);`) und speicherst ihn in `OUT_DIR`?
- Was passiert, wenn die Funktion Rust-spezifische Typen enthält (z. B. `String`, `Vec`), die nicht C-kompatibel sind? Wie erzeugst du einen Compile-Fehler?

### Modul 3: Vollendung & Hauptprogramm

- Wie liest du die erzeugte `.h`-Datei aus `OUT_DIR` und prüfst ihren Inhalt?
- Wie testest du, dass die erzeugte C-Funktion tatsächlich aus einem C-Programm heraus aufrufbar ist?
- Wie erweiterst du das Makro um Dokumentations-Kommentare in der Header-Datei (`/** ... */`)?
- Wie nutzt du `cargo expand`, um die erzeugte `extern "C"`-Funktion in Rust zu sehen?

---

## Projekt 79: Benchmark-Attribut

### Modul 1: Basis-Datenstrukturen

- Was ist der Unterschied zwischen Benchmarking und einfachem Performance-Messen? Warum sind Wiederholungen wichtig (Durchschnitt, Min/Max)?
- Welche Makro-Art verwendest du? Welche Argumente soll das Attribut annehmen (Anzahl Iterationen, Warmup-Phase)?
- Welche `std::time`-Typen brauchst du (`Instant`, `Duration`)? Wie berechnest du Durchschnitt und Standardabweichung?
- Welchen Rückgabetyp hat eine Benchmark-Funktion, und wie vermeidest du, dass der Compiler die Berechnungen wegoptimiert (`black_box`)?

### Modul 2: Implementierung & Methoden

- Wie baust du mit `quote!` eine Schleife, die die Funktion N-mal aufruft und die Laufzeiten in einem `Vec<Duration>` speichert?
- Wie berechnest du aus dem `Vec<Duration>` Durchschnitt, Minimum und Maximum?
- Wie gibst du die Ergebnisse am Ende aus (z. B. `println!("Avg: {:?}, Min: {:?}, Max: {:?}",...)`)?
- Wie verwendest du `std::hint::black_box`, um zu verhindern, dass der Compiler den Funktionskörper wegoptimiert?

### Modul 3: Vollendung & Hauptprogramm

- Wie testest du das Makro mit einer Funktion bekannter Laufzeit (z. B. Sortierung eines Arrays)?
- Wie erweiterst du das Makro um eine Warmup-Phase, deren Ergebnisse nicht in die Statistik einfließen?
- Wie stellst du sicher, dass das Makro nur in Benchmark-Builds aktiv ist (z. B. mit `#[cfg(feature = "bench")]`)?
- Wie nutzt du `cargo expand`, um den generierten Schleifen- und Statistik-Code zu sehen?

---

## Projekt 80: DebugPrint-Attribut

### Modul 1: Basis-Datenstrukturen

- Was ist ein AST (Abstract Syntax Tree) im Kontext von Rust-Makros? Was genau gibt `syn::ItemFn` zurück, und wie sieht die Baumstruktur aus?
- Welche Makro-Art verwendest du? Was soll das Makro konkret tun – den AST ausgeben, ohne den Code zu verändern?
- Welche Methode oder welches Trait kannst du verwenden, um eine `syn`-Struktur als lesbaren String auszugeben? Kennst du `quote::ToTokens` und die `prettyplease`-Crate?
- Welche Ausgabe-Methode wählst du, damit die Ausgabe im Compiler-Prozess sichtbar ist (`eprintln!` im Makro-Code selbst)?

### Modul 2: Implementierung & Methoden

- Wie parst du den `item`-TokenStream als `syn::ItemFn` und gibst ihn mit `eprintln!("{:#?}", item)` aus?
- Wie stellst du sicher, dass der Funktionscode nach der Debug-Ausgabe unverändert zurückgegeben wird?
- Wie nutzt du die `prettyplease`-Crate, um den AST als formatierten Rust-Code statt als Debug-Ausgabe darzustellen?
- Wie steuerst du die Ausgabe über ein Attribut-Argument (z. B. `#[debug_print(pretty)]` vs. `#[debug_print(raw)]`)?

### Modul 3: Vollendung & Hauptprogramm

- Wie kompilierst du ein Projekt mit diesem Attribut und siehst du die AST-Ausgabe in der Compiler-Ausgabe (`cargo build`)?
- Wie unterscheidet sich die Ausgabe dieses Makros von der Ausgabe von `cargo expand`?
- Wie erweiterst du das Makro, um nur bestimmte Teile des AST auszugeben (z. B. nur die Parameterliste)?
- Wofür ist dieses Makro besonders nützlich – beim Entwickeln anderer Makros oder beim Debuggen von Codegenerierung?

---
## Projekte 81–100: Fortgeschrittene DSLs & Parser-Makros

---

## Projekt 81: HTML-Template-Engine

### Modul 1: Basis-Datenstrukturen

- Welche Art von proc_macro wählst du – `macro_rules!`, ein Function-like-proc_macro (`html! { ... }`) oder ein Derive-Makro? Warum passt ein Function-like-proc_macro hier besonders gut?
- Wie modellierst du einen HTML-AST in Rust? Überlege, welche Typen du für Element, Attribut, Textknoten und Ausdrucks-Interpolation (`{variable}`) brauchst.
- Welche Crates helfen dir? Schau dir `proc-macro2`, `quote` und `syn` an – was liefert jedes davon, und reicht `syn` für eine eigene HTML-Grammatik aus oder brauchst du zusätzlich `pest` oder `nom`?
- Wie unterscheidet sich ein HTML-Tag (`<div class="x">`) von einem selbstschließenden Tag (`<br/>`)? Modelliere diesen Unterschied in deiner AST-Struktur.

### Modul 2: Implementierung & Methoden

- Wie liest du den rohen `TokenStream` aus dem Makro-Eingabe und wandelst ihn in eine Zeichenkette um, die du dann Zeichen für Zeichen parsen kannst?
- Welche Parsing-Strategie eignet sich für verschachtelte HTML-Tags? Denke an rekursiven Abstieg – wie rufst du eine Funktion auf, die ihrerseits wieder Tags parsen kann?
- Wie interpolierst du Rust-Ausdrücke in den Template-Text? Überlege, wie `{name}` im Template erkannt und später als echter Rust-Bezeichner im generierten Code verwendet wird.
- Wie baust du mit `quote!` den generierten Code auf, der zur Laufzeit einen `String` zusammensetzt? Welche `quote!`-Besonderheiten (z. B. `#var`, `#(#items)*`) brauchst du für Listen von Kindelementen?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du dein `html!`-Makro in `main.rs` auf und bindest das Ergebnis an eine Variable? Welchen Rückgabetyp (`String` oder eigener Typ) erwartest du?
- Wie testest du absichtlich fehlerhafte Eingaben wie nicht geschlossene Tags oder unbekannte Attribut-Syntax? Was soll dein Makro als Fehlermeldung ausgeben?
- Führe `cargo-expand` aus – wie sieht der entfaltete Code für ein einfaches `html! { <p>{name}</p> }` aus? Was lernst du daraus über deinen Generator?
- Wie kannst du sinnvolle `span`-Informationen weitergeben, damit Fehlermeldungen auf die richtige Zeile in der DSL-Eingabe zeigen?

---

## Projekt 82: CSS-in-Rust-Parser

### Modul 1: Basis-Datenstrukturen

- Welche Grundbausteine hat CSS? Überlege, welche Rust-Typen du für Selektor, Eigenschaft (Property), Wert (Value) und Regelblock (Rule) benötigst.
- Wie modellierst du verschiedene CSS-Werttypen (Farbe, Länge, Prozent, Schlüsselwort) typsicher mit einem Rust-`enum`?
- Welche Crates ziehst du in Betracht? Braucht ein CSS-Parser eher `syn` oder einen eigenständigen Lexer/Parser wie `logos` + handgeschriebener Descent-Parser?
- Welche CSS-Eigenschaften möchtest du in deinem Makro unterstützen? Beginne mit einer kleinen, klar definierten Teilmenge – warum ist das für ein erstes Makro sinnvoller?

### Modul 2: Implementierung & Methoden

- Wie tokenisierst du den CSS-Text (Bezeichner, Doppelpunkt, Semikolon, geschweifte Klammern)? Beschreibe die Schritte eines einfachen Lexers.
- Wie unterscheidest du beim Parsen zwischen Selektor und Eigenschaftsname? Welche Lookahead-Strategie hilft dir dabei?
- Wie prüfst du zur Compilezeit, ob ein CSS-Eigenschaftsname gültig ist (z. B. `color` ja, `colour` nein)? Wie erzeugst du einen aussagekräftigen Compilerfehler?
- Wie generierst du mit `quote!` ein typsicheres `Stylesheet`-Struct, das zur Laufzeit abgefragt werden kann?

### Modul 3: Vollendung & Hauptprogramm

- Wie verwendest du das CSS-Makro in `main.rs`, um ein Stylesheet zu definieren und dessen Regeln auszugeben?
- Welche Tests prüfen ungültige CSS-Syntax (z. B. fehlende Semikolons, unbekannte Properties)? Wie schreibst du diese Tests mit `#[test]`?
- Wie zeigt `cargo-expand` die generierten Structs und `impl`-Blöcke an? Welche Verbesserungen am Generator siehst du danach?
- Wie könntest du das Makro um CSS-Kaskadierung oder Vererbung erweitern, ohne die DSL-Syntax zu verändern?

---

## Projekt 83: Zustandsautomat-DSL

### Modul 1: Basis-Datenstrukturen

- Welche Bestandteile hat ein endlicher Automat (FSM)? Überlege, welche Typen du für Zustand (State), Ereignis (Event) und Übergang (Transition) benötigst.
- Wie modellierst du die Syntax `A -> B via Event` als AST? Welche Felder hat ein `Transition`-Struct?
- Welche Crates helfen dir beim Parsen dieser einfachen DSL-Syntax aus dem `TokenStream`? Könnte `syn::parse::ParseStream` mit `Ident` und `Token![->]` ausreichen?
- Wie stellst du sicher, dass alle referenzierten Zustände tatsächlich definiert wurden? Wo prüfst du das – zur Parsezeit oder nach dem Aufbau des AST?

### Modul 2: Implementierung & Methoden

- Wie implementierst du `syn::parse::Parse` für deine `Transition`-Typen, um die Übergangssyntax schrittweise zu lesen?
- Wie sammelst du alle Zustände und Ereignisse, die in den Transitionen vorkommen, und deduplizierst sie, um daraus `enum`-Varianten zu erzeugen?
- Wie generierst du mit `quote!` eine `transition`-Funktion, die für `(aktueller_zustand, ereignis)` den nächsten Zustand zurückgibt?
- Welche Pratt-Parsing- oder Precedence-Konzepte sind für eine einfache Zustandsmaschinen-DSL eher nicht nötig – und warum?

### Modul 3: Vollendung & Hauptprogramm

- Wie nutzt du das FSM-Makro in `main.rs`, um einen Zustandsautomaten für eine einfache Ampel oder Türschloss zu definieren?
- Wie testest du, dass ein Übergang für eine unbekannte Zustandskombination einen definierten Fehler (z. B. `None` oder `panic!`) liefert?
- Was zeigt `cargo-expand` für dein FSM-Makro – welche `enum`s und `impl`-Blöcke werden erzeugt?
- Wie fügst du Guard-Bedingungen (`A -> B via Event if guard_fn`) zur DSL hinzu, ohne die bestehende Parsing-Logik stark zu verändern?

---

## Projekt 84: SQL-Query-Builder-DSL

### Modul 1: Basis-Datenstrukturen

- Welche SQL-Klauseln willst du in deiner DSL unterstützen (SELECT, FROM, WHERE, ORDER BY, LIMIT)? Modelliere jede als eigene Rust-Struktur.
- Wie stellst du Typsicherheit her? Überlege, wie du Spaltennamen und Tabellennamen als eigene Typen (statt rohe Strings) modellierst.
- Welche Crates brauchst du? Reicht `syn` + `quote`, oder lohnt sich ein Lexer-Crate für SQL-Schlüsselwörter?
- Wie unterscheidest du SQL-Schlüsselwörter (`SELECT`, `FROM`) von Benutzerkennzeichnern (Tabellen-/Spaltennamen) im TokenStream?

### Modul 2: Implementierung & Methoden

- Wie parsest du eine SELECT-Liste mit mehreren Spalten, getrennt durch Kommas, aus dem `TokenStream`?
- Wie modellierst du WHERE-Bedingungen (Vergleiche, AND/OR-Verknüpfungen) als rekursiven AST?
- Wie generierst du mit `quote!` entweder eine fertige SQL-String-Konstante oder ein Builder-Objekt, das zur Laufzeit parametrisiert werden kann?
- Wie verhindert dein Makro SQL-Injection, wenn Werte als Rust-Ausdrücke eingebettet werden?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das SQL-Makro in `main.rs` auf und verwendest das Ergebnis mit einer echten oder gemockten Datenbankverbindung?
- Welche Test-Szenarien deckst du ab: fehlende FROM-Klausel, ungültige Spaltennamen, fehlende WHERE-Operanden?
- Was zeigt `cargo-expand` – wird ein statischer String oder ein Query-Builder-Objekt generiert?
- Wie erweiterst du die DSL um JOIN-Klauseln, ohne die bestehende Grammatik zu brechen?

---

## Projekt 85: Regex-Parser zur Compilezeit

### Modul 1: Basis-Datenstrukturen

- Welche Elemente eines regulären Ausdrucks (Literal, `.`, `*`, `+`, `?`, `|`, Gruppen) willst du in deinem AST modellieren?
- Wie repräsentierst du einen NFA (nichtdeterministischer endlicher Automat) oder DFA als Rust-Datenstruktur, die zur Compilezeit gebaut werden kann?
- Welche Crates helfen dir? Schau dir an, was `proc-macro2` und `quote` anbieten – reicht das, oder brauchst du eine eigene Regex-Parsing-Bibliothek?
- Warum ist es sinnvoll, den Regex zur Compilezeit zu kompilieren statt zur Laufzeit? Welche Vorteile hat das für Performance und Fehlerfrüherkennung?

### Modul 2: Implementierung & Methoden

- Wie parsest du einen Regex-String aus dem Makro-Argument Token für Token? Beschreibe, wie du Zeichen-Literale, Sonderzeichen und Quantoren erkennst.
- Wie baust du aus dem Regex-AST einen NFA auf (Thompson-Konstruktion)? Welche Zustände und Epsilon-Übergänge brauchst du?
- Wie konvertierst du optional den NFA in einen DFA (Potenzmengenkonstruktion)? Welche Kompromisse gibt es zwischen NFA und DFA im generierten Code?
- Wie erzeugst du mit `quote!` eine Match-Funktion, die den generierten Automaten zur Laufzeit ausführt?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Regex-Makro in `main.rs` auf und testest es gegen verschiedene Eingabestrings?
- Welche ungültigen Regex-Ausdrücke (z. B. ungeschlossene Gruppe, ungültiger Quantor) soll dein Makro mit welchem Fehler ablehnen?
- Was zeigt `cargo-expand` für den generierten Automaten-Code? Ist die Ausgabe lesbar und nachvollziehbar?
- Wie könnte man Named Capture Groups (`(?P<name>...)`) nachträglich zur DSL hinzufügen?

---

## Projekt 86: JSON-Parser-DSL

### Modul 1: Basis-Datenstrukturen

- Welche JSON-Typen (Objekt, Array, String, Zahl, Boolean, Null) musst du in deinem AST modellieren? Wie bildet ein Rust-`enum` diese Varianten ab?
- Wie modellierst du ein JSON-Objekt mit Schlüssel-Wert-Paaren als AST-Knoten, der zur Compilezeit in ein typsicheres Rust-Struct übersetzt werden soll?
- Welche Crates wählst du? Würde `syn` allein reichen, oder benötigst du einen eigenständigen JSON-Lexer?
- Wie unterscheidest du, ob die DSL ein Rust-Struct generieren soll (für statische Daten) oder eine Funktion, die JSON zur Laufzeit aufbaut?

### Modul 2: Implementierung & Methoden

- Wie parsest du JSON-Strings (mit Escape-Sequenzen) aus dem Makro-Eingabe-TokenStream?
- Wie gehst du mit verschachtelten JSON-Objekten und Arrays rekursiv um? Wo rufst du deine Parse-Funktion rekursiv auf?
- Wie generierst du mit `quote!` ein konkretes Rust-Struct (mit `impl`-Block für Zugriffsmethoden) aus einem JSON-Objekt-AST?
- Wie stellst du sicher, dass Schlüsselkonflikte (doppelte Felder in einem JSON-Objekt) zur Compilezeit erkannt werden?

### Modul 3: Vollendung & Hauptprogramm

- Wie verwendest du das JSON-Makro in `main.rs`, um ein typsicheres Konfigurations-Objekt zu erzeugen?
- Welche Fehlerszenarien testest du: ungültige JSON-Syntax, fehlende Anführungszeichen, falsche Klammerung?
- Was zeigt `cargo-expand` – welche Structs und Methoden entstehen aus dem JSON-Makro?
- Wie könnte man das Makro um JSON-Schema-Validierung erweitern?

---

## Projekt 87: Mathematische Formelsprache

### Modul 1: Basis-Datenstrukturen

- Welche Elemente einer mathematischen Formel (Zahl, Variable, binärer Operator, Funktion, Klammer) modellierst du in deinem AST?
- Wie berücksichtigst du Operatorvorrang (Multiplikation vor Addition) in der AST-Struktur? Warum reicht ein einfacher Baum nicht aus?
- Welche Crates helfen dir? Schau dir an, ob `syn` für das Parsen von Infix-Ausdrücken geeignet ist oder ob du einen eigenen Pratt-Parser schreiben solltest.
- Wie unterscheidest du Funktionsaufrufe (z. B. `sin(x)`) von Variablenbezeichnern in der DSL?

### Modul 2: Implementierung & Methoden

- Wie implementierst du Pratt-Parsing (Top-Down Operator Precedence) für Infix-Ausdrücke? Erkläre die Rolle von `nud` (null denotation) und `led` (left denotation).
- Wie behandelst du Klammern im Parser – als eigene Grammatikregel oder als Präfix-Operator?
- Wie generierst du mit `quote!` eine Rust-Funktion, die die Formel für gegebene Variablenwerte berechnet?
- Wie optimierst du den Berechnungsbaum zur Compilezeit (z. B. konstante Teilausdrücke falten)?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Formel-Makro in `main.rs` auf und wertest die generierte Funktion für verschiedene Eingabewerte aus?
- Welche Fehlerfälle testest du: Division durch null zur Compilezeit, unbekannte Variablen, fehlerhafte Klammerung?
- Was zeigt `cargo-expand` für eine Formel wie `a * (b + c) / 2`?
- Wie könntest du symbolische Differentiation als weitere Makro-Funktion ergänzen?

---

## Projekt 88: Routing-Tabelle für Webserver

### Modul 1: Basis-Datenstrukturen

- Wie modellierst du eine Route (Pfad-Pattern, HTTP-Methode, Handler-Funktion) als AST-Knoten in deiner DSL?
- Wie unterscheidest du statische Pfadsegmente (`/users`) von dynamischen Parametern (`/:id`) in der DSL-Syntax?
- Welche Crates ziehst du in Betracht? Reicht `syn` + `quote`, oder hilft ein Lexer-Crate wie `logos` für den Pfad-Parser?
- Wie modellierst du den resultierenden Routing-Baum (Trie) als Datenstruktur, die zur Compilezeit gebaut wird?

### Modul 2: Implementierung & Methoden

- Wie parsest du Pfad-Strings wie `GET /users/:id` aus dem DSL-Eingabe-TokenStream Token für Token?
- Wie baust du aus den geparsten Routen einen Trie auf, der schnelles Prefix-Matching ermöglicht?
- Wie generierst du mit `quote!` eine `route`-Funktion, die einen URL-Pfad gegen den Trie matched und den Handler aufruft?
- Wie gehst du mit Konflikten um (z. B. zwei Routen, die dasselbe Muster matchen)?

### Modul 3: Vollendung & Hauptprogramm

- Wie verwendest du das Routing-Makro in `main.rs`, um einen einfachen Webserver-Router zu definieren und zu testen?
- Welche Fehlerfälle prüfst du: doppelte Routen, ungültige HTTP-Methoden, fehlende Handler-Funktionen?
- Was zeigt `cargo-expand` für den generierten Router-Code?
- Wie erweiterst du die DSL um Middleware-Unterstützung (z. B. `GET /admin/* mit auth_middleware`)?

---

## Projekt 89: Grafik-Pipeline-DSL

### Modul 1: Basis-Datenstrukturen

- Welche Grundbausteine einer Grafik-Pipeline (Vertex-Shader, Fragment-Shader, Render-Pass, Binding) willst du in deiner DSL modellieren?
- Wie repräsentierst du Shader-Ein- und Ausgaben (Attribute, Uniforms, Varyings) typsicher in deinem AST?
- Welche Crates helfen dir? Gibt es bestehende Rust-Crates für WGSL oder GLSL-Parsing, auf die du aufbauen könntest?
- Warum ist eine compile-time-DSL für Grafik-Pipelines vorteilhaft gegenüber einer reinen Laufzeit-Konfiguration?

### Modul 2: Implementierung & Methoden

- Wie parsest du Shader-Definitionen aus dem DSL-TokenStream? Welche Syntax wählst du für Ein-/Ausgabe-Deklarationen?
- Wie validierst du zur Compilezeit, dass Vertex-Shader-Ausgaben mit Fragment-Shader-Eingaben übereinstimmen?
- Wie generierst du mit `quote!` Rust-Code, der die Pipeline-Objekte (z. B. `wgpu::RenderPipeline`) zur Laufzeit erstellt?
- Wie gehst du mit plattformspezifischen Unterschieden (WebGPU vs. Vulkan) im generierten Code um?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Pipeline-Makro in `main.rs` auf und nutzt den generierten Code in einem einfachen Render-Loop?
- Welche Fehler soll das Makro bei Typ-Inkompatibilitäten zwischen Shader-Stufen ausgeben?
- Was zeigt `cargo-expand` für eine einfache Dreiecks-Pipeline?
- Wie könntest du die DSL um compute shaders oder post-processing Passes erweitern?

---

## Projekt 90: Protokoll-Parser (Binary DSL)

### Modul 1: Basis-Datenstrukturen

- Wie beschreibst du ein Binärprotokoll in deiner DSL? Überlege, welche Felder (Name, Typ, Bit-Breite, Byte-Order) du für jedes Protokollfeld brauchst.
- Wie modellierst du variable Felder (z. B. ein Längenfeld gefolgt von einem Datenbuffer mit dieser Länge) im AST?
- Welche Crates helfen dir? Schau dir `syn` + `quote` für die Makro-Infrastruktur und `bitvec` oder `bytes` für die Laufzeit-Puffer an.
- Wie unterscheidest du Big-Endian von Little-Endian im DSL-Syntax?

### Modul 2: Implementierung & Methoden

- Wie parsest du Feld-Definitionen (z. B. `header: u16 be`, `payload: [u8; length]`) aus dem TokenStream?
- Wie berechnest du zur Compilezeit die Gesamtgröße eines Protokollpakets, wenn alle Felder feste Größen haben?
- Wie generierst du mit `quote!` eine `decode`-Funktion, die Bytes in das Protokoll-Struct deserialisiert, und eine `encode`-Funktion für die umgekehrte Richtung?
- Wie behandelst du optionale Felder oder Felder mit Versionsbedingungen in der DSL?

### Modul 3: Vollendung & Hauptprogramm

- Wie nutzt du das Protokoll-Makro in `main.rs`, um ein einfaches Netzwerkpaket zu kodieren und zu dekodieren?
- Welche Fehlerfälle prüfst du: Puffer zu kurz, ungültige Magic-Bytes, fehlerhafte Feldtypen?
- Was zeigt `cargo-expand` für ein einfaches Protokoll mit Header und Payload?
- Wie erweiterst du die DSL um Checksum-Felder, die automatisch berechnet werden?

---

## Projekt 91: Markdown-to-Slides-Parser

### Modul 1: Basis-Datenstrukturen

- Wie trennst du Markdown-Inhalte in einzelne Folien? Definiere eine DSL-Konvention (z. B. `---` als Folientrenner).
- Welche Markdown-Elemente (Überschrift, Aufzählung, Codeblock, Bild) modellierst du als AST-Knoten?
- Welche Crates ziehst du in Betracht? Gibt es einen Rust-Markdown-Parser, den du als Grundlage nutzen könntest?
- Wie unterscheidest du Folientypen (Titel-Folie, Inhalts-Folie, Code-Folie) anhand des Markdown-Inhalts?

### Modul 2: Implementierung & Methoden

- Wie parsest du den Markdown-String aus dem Makro-Argument und teilst ihn an Folientrennern auf?
- Wie wandelst du Markdown-Überschriften (H1, H2) in Folientitel und -untertitel um?
- Wie generierst du mit `quote!` eine Datenstruktur (`Vec<Slide>`), die zur Laufzeit von einer Präsentations-Engine gerendert werden kann?
- Wie gehst du mit Markdown-Erweiterungen (z. B. Speaker-Notes nach `???`) in der DSL um?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Slides-Makro in `main.rs` auf und gibst die Folienstruktur aus?
- Welche Fehler soll das Makro bei ungültigem Markdown oder fehlenden Pflichtfeldern ausgeben?
- Was zeigt `cargo-expand` für ein Dokument mit drei Folien?
- Wie könntest du Themes und Layouts als DSL-Parameter hinzufügen?

---

## Projekt 92: Dependency-Graph-DSL

### Modul 1: Basis-Datenstrukturen

- Wie beschreibst du Tasks und ihre Abhängigkeiten in deiner DSL? Überlege, welche Syntax intuitiv ist (z. B. `task_b depends_on task_a`).
- Wie modellierst du einen gerichteten azyklischen Graphen (DAG) als Rust-Datenstruktur in deinem AST?
- Welche Crates helfen dir? Gibt es Graph-Crates wie `petgraph`, die du im generierten Code nutzen kannst?
- Wie prüfst du zur Compilezeit, ob der beschriebene Graph tatsächlich kreisfrei ist?

### Modul 2: Implementierung & Methoden

- Wie parsest du Task-Deklarationen und Abhängigkeitskanten aus dem TokenStream?
- Wie implementierst du eine Kreiserkennung (z. B. Tiefensuche mit Farbmarkierung) zur Compilezeit auf dem AST?
- Wie generierst du mit `quote!` eine topologische Sortierung der Tasks, die angibt, welche Tasks parallel ausgeführt werden können?
- Wie behandelst du Tasks ohne Abhängigkeiten – wo erscheinen sie im generierten Ausführungsplan?

### Modul 3: Vollendung & Hauptprogramm

- Wie nutzt du das Dependency-Makro in `main.rs`, um einen Build-Plan zu definieren und auszugeben?
- Welche Fehler soll das Makro bei zyklischen Abhängigkeiten oder unbekannten Task-Referenzen ausgeben?
- Was zeigt `cargo-expand` für einen Graphen mit fünf Tasks?
- Wie erweiterst du die DSL um Task-Gewichte oder Ressourcenbeschränkungen?

---

## Projekt 93: Eigene Lisp-in-Rust-DSL

### Modul 1: Basis-Datenstrukturen

- Welche Lisp-Grundelemente (Symbol, Zahl, String, Liste/S-Expression) willst du in deinem AST modellieren?
- Wie unterscheidest du in der DSL zwischen Daten-Listen (`'(1 2 3)`) und Code-Listen/Aufrufen (`(+ 1 2)`)? Modelliere diesen Unterschied im AST.
- Welche Crates helfen dir? Reicht `syn` für das Parsen von geklammerten Ausdrücken, oder schreibst du einen eigenen Lisp-Reader?
- Welche Lisp-Spezialformen (`define`, `if`, `lambda`, `let`) willst du unterstützen?

### Modul 2: Implementierung & Methoden

- Wie parsest du S-Expressions rekursiv aus dem TokenStream? Wann weißt du, dass eine Liste endet?
- Wie unterscheidest du beim Traversieren des AST zwischen Spezialformen und normalen Funktionsaufrufen?
- Wie generierst du mit `quote!` äquivalenten Rust-Code für Lisp-Ausdrücke (z. B. `(+ a b)` → `a + b`, `(if cond then else)` → `if cond { then } else { else }`)?
- Wie gehst du mit Lisp-Closures (`lambda`) um – welche Rust-Konstrukte erzeugst du dafür?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Lisp-Makro in `main.rs` auf und wertest einfache Lisp-Ausdrücke aus?
- Welche Fehler soll das Makro bei unbekannten Symbolen oder falscher Argumentanzahl ausgeben?
- Was zeigt `cargo-expand` für `(let ((x 5)) (* x x))`?
- Wie könntest du Makros in Lisp (Metaprogrammierung im Makro) unterstützen?

---

## Projekt 94: Cron-Job-Zeitplaner-DSL

### Modul 1: Basis-Datenstrukturen

- Welche fünf Felder eines Cron-Ausdrucks (`Minute Stunde Tag Monat Wochentag`) modellierst du als AST-Knoten?
- Wie repräsentierst du die verschiedenen Cron-Wert-Typen (Wildcard `*`, Einzelwert `5`, Bereich `1-5`, Schrittweite `*/15`, Liste `1,3,5`) als Rust-`enum`?
- Welche Crates helfen dir? Reicht `syn` für das Token-für-Token-Parsen eines Cron-Strings?
- Wie definierst du die Wertebereiche für jedes Feld (Minute: 0–59, Stunde: 0–23 usw.) und wann prüfst du diese?

### Modul 2: Implementierung & Methoden

- Wie parsest du einen Cron-String wie `*/5 8-17 * * 1-5` aus dem Makro-Argument?
- Wie prüfst du zur Compilezeit, ob alle Werte im gültigen Bereich liegen (z. B. Monat nicht > 12)?
- Wie generierst du mit `quote!` eine Funktion, die für einen gegebenen `DateTime`-Wert prüft, ob der Cron-Ausdruck zutrifft?
- Wie gehst du mit benannten Sonderausdrücken (`@daily`, `@weekly`, `@reboot`) um?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Cron-Makro in `main.rs` auf und testest, ob bestimmte Zeitpunkte zum Ausdruck passen?
- Welche Fehlerfälle prüfst du: Minutenwert 60, ungültige Bereiche, leere Listen?
- Was zeigt `cargo-expand` für `* * * * *` (jede Minute) und `0 9 * * 1-5` (Montag–Freitag um 9 Uhr)?
- Wie erweiterst du das Makro um Zeitzonensupport?

---

## Projekt 95: Game-Design-Dialog-DSL

### Modul 1: Basis-Datenstrukturen

- Wie modellierst du einen Dialogbaum? Überlege, welche Typen du für Dialog-Knoten, Sprecher, Text, Optionen und Sprungziele brauchst.
- Wie unterscheidest du lineare Dialogsequenzen von Verzweigungen (Spielerentscheidungen) im AST?
- Welche Crates helfen dir? Reicht `syn` + `quote`, oder brauchst du einen vollständigen Textparser für mehrzeilige DSL-Blöcke?
- Wie modellierst du Bedingungen (z. B. `if player.has_item("key")`) als Teil des Dialogbaum-AST?

### Modul 2: Implementierung & Methoden

- Wie parsest du mehrzeiligen Dialogtext und Sprecher-Bezeichner aus dem Makro-Eingabe-TokenStream?
- Wie verknüpfst du Dialog-Knoten mit Labels und Sprungzielen zur Compilezeit?
- Wie generierst du mit `quote!` eine `run_dialog`-Funktion, die den Dialogbaum traversiert und Nutzereingaben verarbeitet?
- Wie prüfst du zur Compilezeit, dass alle Sprungziel-Labels tatsächlich definiert wurden?

### Modul 3: Vollendung & Hauptprogramm

- Wie nutzt du das Dialog-Makro in `main.rs`, um eine kurze Textadventure-Szene zu definieren und interaktiv auszuführen?
- Welche Fehler soll das Makro bei undeklarierten Labels oder fehlenden Pflichtfeldern ausgeben?
- Was zeigt `cargo-expand` für einen einfachen Zwei-Wege-Dialog?
- Wie erweiterst du die DSL um Zustandsvariablen, die während des Dialogs verändert werden können?

---

## Projekt 96: Schaltplan-Simulator-DSL

### Modul 1: Basis-Datenstrukturen

- Welche logischen Gatter (AND, OR, NOT, XOR, NAND, NOR) willst du in deiner DSL unterstützen? Modelliere jedes als AST-Knoten.
- Wie beschreibst du Verbindungen zwischen Gatterausgängen und -eingängen in der DSL-Syntax (z. B. `out_a -> in_b`)?
- Welche Crates helfen dir? Reicht `syn` für das Parsen von Gatter-Deklarationen?
- Wie erkennst du Rückkopplungsschleifen (Feedback Loops) zur Compilezeit und wie behandelst du sie?

### Modul 2: Implementierung & Methoden

- Wie parsest du eine Schaltplan-Beschreibung mit mehreren Gattern und Verbindungen aus dem TokenStream?
- Wie baust du aus dem geparsten Netzwerk eine Auswertungsreihenfolge (topologische Sortierung) auf?
- Wie generierst du mit `quote!` eine `simulate`-Funktion, die für gegebene Eingangssignale alle Ausgangssignale berechnet?
- Wie prüfst du zur Compilezeit, dass alle Eingänge eines Gatters verbunden sind?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Schaltplan-Makro in `main.rs` auf, um einen Halbaddierer oder Volladdierer zu simulieren?
- Welche Fehler soll das Makro bei unverbundenen Eingängen oder zyklischen Verbindungen ausgeben?
- Was zeigt `cargo-expand` für einen einfachen AND-NOT-Schaltkreis?
- Wie erweiterst du die DSL um Flip-Flops und getaktete Schaltkreise?

---

## Projekt 97: Musik-Notations-DSL

### Modul 1: Basis-Datenstrukturen

- Welche Elemente einer vereinfachten Notation (Note, Oktave, Dauer, Pause, Takt) modellierst du als AST-Knoten?
- Wie repräsentierst du Noten (C, D, E, F, G, A, B) mit Vorzeichen (# oder b) und Oktave als typsicheres Rust-`enum` oder `struct`?
- Welche Crates helfen dir? Gibt es Rust-Crates für MIDI-Generierung, auf die du im generierten Code zurückgreifen kannst?
- Wie definierst du Taktarten (4/4, 3/4, 6/8) in der DSL und prüfst, ob jeder Takt korrekt gefüllt ist?

### Modul 2: Implementierung & Methoden

- Wie parsest du eine Folge von Noten wie `C4q D4q E4h` (Note, Oktave, Dauer) aus dem TokenStream?
- Wie prüfst du zur Compilezeit, dass alle Töne einer Melodie in der gewählten Tonart liegen?
- Wie generierst du mit `quote!` eine Datenstruktur, die MIDI-Events oder Audio-Sample-Daten beschreibt?
- Wie gehst du mit Akkorden (mehrere gleichzeitige Noten) in der DSL um?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Musik-Makro in `main.rs` auf und gibst die generierte Notenfolge als MIDI-Datei oder Text aus?
- Welche Fehler soll das Makro bei ungültigen Notennamen, zu langen Takten oder unbekannten Dauern ausgeben?
- Was zeigt `cargo-expand` für eine einfache Melodie mit vier Takten?
- Wie erweiterst du die DSL um Wiederholungszeichen und Dynamik (pp, mf, ff)?

---

## Projekt 98: Feature-Flag-Matrix

### Modul 1: Basis-Datenstrukturen

- Wie beschreibst du eine Feature-Flag-Tabelle in deiner DSL? Überlege, welche Zeilen (Features) und Spalten (Plattformen: linux, windows, macos, wasm) du hast.
- Wie modellierst du den Zustand jedes Tabellenfelds (aktiviert, deaktiviert, optional) als Rust-`enum`?
- Welche Crates helfen dir? Reicht `syn` + `quote` für das Parsen einer tabellarischen DSL-Syntax?
- Wie definierst du die DSL-Syntax – als verschachtelte Makro-Aufrufe, als CSV-ähnliche Textzeilen oder als eine eigene Blockstruktur?

### Modul 2: Implementierung & Methoden

- Wie parsest du die Feature-Tabelle (Zeilen, Spalten, Werte) aus dem Makro-Eingabe-TokenStream?
- Wie generierst du aus jedem Tabelleneintrag den entsprechenden `#[cfg(target_os = "...")]`-Attribut-Code?
- Wie prüfst du zur Compilezeit, dass alle Plattformnamen bekannt und gültig sind?
- Wie stellst du sicher, dass Feature-Flags konsistent sind (z. B. ein Feature, das von einem anderen abhängt, ist nicht aktiviert, wenn das Basis-Feature deaktiviert ist)?

### Modul 3: Vollendung & Hauptprogramm

- Wie nutzt du das Feature-Matrix-Makro in `main.rs`, um plattformabhängige Funktionen zu aktivieren?
- Welche Fehler soll das Makro bei unbekannten Plattformen, Tippfehlern oder widersprüchlichen Einträgen ausgeben?
- Was zeigt `cargo-expand` für eine Tabelle mit drei Features und vier Plattformen?
- Wie erweiterst du die DSL um Feature-Kombinationen (z. B. Feature X erfordert Feature Y)?

---

## Projekt 99: Neuronales-Netzwerk-DSL

### Modul 1: Basis-Datenstrukturen

- Welche Layer-Typen (Dense, Conv2D, ReLU, Dropout, Flatten) willst du in deiner DSL unterstützen? Modelliere jeden als AST-Knoten mit seinen Parametern.
- Wie modellierst du den Datenfluss zwischen Layern – als sequentielle Liste oder als Graph?
- Welche Crates helfen dir im generierten Code? Schau dir an, ob `ndarray` oder andere Tensor-Crates für die Laufzeit-Berechnungen geeignet sind.
- Wie validierst du zur Compilezeit, dass die Ausgabedimensionen eines Layers mit den Eingabedimensionen des nächsten kompatibel sind?

### Modul 2: Implementierung & Methoden

- Wie parsest du Layer-Definitionen mit Parametern (z. B. `Dense(128, activation = "relu")`) aus dem TokenStream?
- Wie propagierst du Dimensionsinformationen durch das Netzwerk zur Compilezeit (Shape-Inference)?
- Wie generierst du mit `quote!` eine `forward`-Funktion, die den Feedforward-Durchlauf für eine Eingabe berechnet?
- Wie gehst du mit optionalen Parametern (z. B. `dropout_rate`) in der DSL-Syntax um?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Netzwerk-Makro in `main.rs` auf und führst einen Feedforward-Pass mit Zufallsdaten durch?
- Welche Fehler soll das Makro bei inkompatiblen Dimensionen oder unbekannten Aktivierungsfunktionen ausgeben?
- Was zeigt `cargo-expand` für ein einfaches 3-Layer-Netzwerk (Input → Dense → Output)?
- Wie erweiterst du die DSL um Backpropagation-Code oder automatische Differenzierung?

---

## Projekt 100: Rust-in-Rust-Interpreter-DSL

### Modul 1: Basis-Datenstrukturen

- Welche Teilmenge von Rust willst du in deiner DSL unterstützen? Definiere klar, welche Ausdrücke (Arithmetik, Variablenbindung, `if`, `loop`, `fn`) du implementieren willst.
- Wie modellierst du den AST für diese Rust-Teilmenge? Welche Knoten-Typen brauchst du für Ausdrücke, Statements und Deklarationen?
- Welche Crates helfen dir? Könnte `syn` selbst als Rust-Parser wiederverwendet werden, oder parst du eine vereinfachte Syntax mit eigenem Lexer?
- Wie modellierst du die Laufzeitumgebung des Interpreters (Variablenscope, Call-Stack) als Rust-Datenstruktur?

### Modul 2: Implementierung & Methoden

- Wie parsest du die vereinfachte Rust-Syntax aus dem Makro-Eingabe-TokenStream – nutzt du `syn::parse` für bestehende Rust-Syntax direkt?
- Wie traversierst du den AST und generierst mit `quote!` einen Rust-Interpreter (eine `eval`-Funktion), der den DSL-Code schrittweise auswertet?
- Wie implementierst du Variablen-Scoping im generierten Interpreter-Code (z. B. mit einer `HashMap`)?
- Wie gehst du mit Rekursion und dem Call-Stack im generierten Interpreter um?

### Modul 3: Vollendung & Hauptprogramm

- Wie rufst du das Interpreter-Makro in `main.rs` auf und führst ein einfaches Rust-Snippet (z. B. Fibonacci-Berechnung) aus?
- Welche Fehler soll das Makro bei syntaktisch ungültigem Code oder nicht unterstützten Sprachfeatures ausgeben?
- Was zeigt `cargo-expand` für ein eingebettetes Snippet mit einer Schleife und einer Variablenbindung?
- Wie könntest du den Interpreter um einen einfachen Typchecker erweitern, der Typ-Fehler zur Compilezeit erkennt?

---
