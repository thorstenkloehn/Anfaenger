# Phase 10: Projektvorschläge zu Makros & Metaprogrammierung

Willkommen in der Königsklasse der Rust-Programmierung! Du hast gelernt, wie du mit **deklarativen Makros** (`macro_rules!`) einfache Code-Schablonen erstellst und mit **prozeduralen Makros** (Derive-, Attribut- und Funktions-Makros) tief in den Compiler eingreifst, um den Abstract Syntax Tree (AST) deines Codes zu transformieren.

In dieser Phase heben wir deine Fähigkeiten auf das nächste Level. Metaprogrammierung wird erst dann richtig mächtig, wenn du deklarative und prozedurale Makros geschickt miteinander kombinierst. Das deklarative Makro dient dabei oft als benutzerfreundliche Schnittstelle (DSL), während das prozedurale Makro im Hintergrund die schwere Arbeit verrichtet: Parsen, Validieren zur Compilezeit und Generieren von komplexem Boilerplate-Code.

> [!IMPORTANT]
> **Didaktischer Hinweis:** Für keines dieser Projekte findest du hier fertige Codelösungen! Das Ziel ist es, dass du die AST-Strukturen selbst analysierst, Fehler zur Compilezeit abfängst und die Makro-Hygiene meisterst. Verwende Werkzeuge wie `cargo-expand`, um den generierten Code sichtbar zu machen, und gehe Schritt für Schritt vor!

---

## Projekt 1: Sichere Typen-Generierung aus JSON/TOML-Konfigurationen (Compile-Time Config Parser)

### 1. Beschreibung der Funktionsweise
Du entwickelst ein System, das eine Konfigurationsdatei (z. B. eine `config.json` oder `config.toml`) zur Compilezeit einliest, ihre Struktur analysiert und automatisch ein passendes, typsicheres Rust-Struct generiert. Das deklarative Makro dient als einfache Schnittstelle, um den Dateipfad anzugeben, während das prozedurale Attribut-Makro die Datei parst, die Typen ableitet und das Struct generiert. Wenn die Konfigurationsdatei fehlerhaft ist (z. B. ungültiges JSON oder ungültige Werte), bricht der Kompilierprozess mit einer präzisen Fehlermeldung ab.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Schnittstellen-Makro (`load_config!`):** Ein deklaratives Makro, das den Pfad zur Konfigurationsdatei entgegennimmt und ein Struct deklariert, das mit dem prozeduralen Attribut-Makro annotiert wird.
* **Prozedurales Attribut-Makro (`#[config_source]`):** Liest den Pfad aus, lädt die Datei zur Compilezeit vom Dateisystem und parst ihren Inhalt.
* **Code-Generator:** Generiert die Definitionen für die Structs und implementiert nützliche Hilfsmethoden (z. B. Getter oder Standardwerte).
* **Validierungs-Engine:** Überprüft die Werte der Konfigurationsdatei zur Compilezeit auf Plausibilität (z. B. Portnummern im Bereich 1–65535).

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` (zum Parsen des Structs, auf das das Attribut angewendet wird).
* `quote` und `proc-macro2` (zur Generierung des neuen Rust-Codes).
* `serde_json` oder `toml` (zum Einlesen und Validieren der Konfigurationsdaten zur Compilezeit).

### 4. Didaktische Hinweise
* **Pfadauflösung:** Da das Makro zur Compilezeit ausgeführt wird, musst du den Dateipfad relativ zum Projektverzeichnis auflösen. Verwende dazu die Umgebungsvariable `CARGO_MANIFEST_DIR`.
* **Caching-Probleme von Cargo:** Cargo merkt sich, dass der Rust-Code unverändert ist, und führt das Makro bei Änderungen an der JSON-Datei eventuell nicht erneut aus. Wie kannst du dem Compiler signalisieren, dass sich die Abhängigkeit geändert hat? (Tipp: Nutze den `include_bytes!`-Trick oder registriere die Datei als Cargo-Abhängigkeit).
* **Compile-Fehler:** Nutze `syn::Error`, um ungültige JSON-Syntax direkt an der Stelle des Makro-Aufrufs im Editor als Compilerfehler anzuzeigen.

### 5. Optionale Zusatz-Herausforderung
Unterstütze Standardwerte und Wertebereiche direkt über Custom-Attribute auf den generierten Feldern (z. B. `#[config(default = 8080)]` oder `#[config(min = 1024)]`).

---

## Projekt 2: SQL-Query-Validierer mit Mock-Datenbank (Compile-Time SQL Validator)

### 1. Beschreibung der Funktionsweise
Du baust ein Werkzeug, das SQL-Queries im Rust-Code zur Compilezeit validiert. Über ein deklaratives Makro gibst du eine Query an. Dieses Makro leitet die Token an ein prozedurales Funktions-Makro weiter, das die SQL-Syntax überprüft und abgleicht, ob die verwendeten Spalten und Tabellen mit einer lokalen Datenbankschema-Datei übereinstimmen. Bei Fehlern scheitert das Kompilieren.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Schnittstelle (`sql!`):** Ein deklaratives Makro, das den SQL-String als Tokenstrom einliest und an das prozedurale Funktions-Makro delegiert.
* **Prozedurales Funktions-Makro (`validate_sql!`):** Parst den SQL-String und analysiert die Struktur.
* **Schema-Parser:** Ein internes Hilfsmodul, das eine Schema-Datei (z. B. `schema.sql`) zur Compilezeit einliest, um Tabellennamen und Spaltentypen zu extrahieren.
* **Validierer:** Vergleicht die AST-Struktur der SQL-Query mit dem geparsten Schema.

### 3. Zu verwendende Crates oder Bibliotheken
* `syn`, `quote`, `proc-macro2` (für die AST-Transformation und Code-Generierung).
* `sqlparser` (eine in Rust geschriebene Bibliothek zum Parsen von SQL-Statements).

### 4. Didaktische Hinweise
* **Span-Management:** Damit Fehlermeldungen nützlich sind, muss der Compilerfehler genau auf dem fehlerhaften SQL-Schlüsselwort oder Tabellennamen liegen. Du musst den `Span` des fehlerhaften Tokens im SQL-String ermitteln und an den generierten `compile_error!` übergeben.
* **External Dependencies:** Da die `schema.sql` außerhalb des Rust-Quellcodes liegt, musst du sicherstellen, dass Änderungen an ihr das Makro invalidieren.

### 5. Optionale Zusatz-Herausforderung
Generiere automatisch eine typsichere Struktur für die Abfrageergebnisse. Das Makro soll den Typ jeder ausgewählten Spalte aus dem Schema ermitteln und ein passendes Struct für die Zeilen generieren.

---

## Projekt 3: Typsicherer State-Machine-Generator mit DSL (State Machine Metaprogramming)

### 1. Beschreibung der Funktionsweise
Zustandsmaschinen (State Machines) sind in Rust hervorragend über das Typstate-Pattern (Zustände als separate Typen) abbildbar. Um den enormen Boilerplate-Code zu reduzieren, entwirfst du eine eigene deklarative Domain-Specific Language (DSL) für Zustandsübergänge. Das deklarative Makro liest diese DSL und ruft ein prozedurales Attribut-Makro auf, das die Zustandsstrukturen erzeugt und die erlaubten Übergangs-Traits implementiert. Ungültige Übergänge sind dadurch zur Compilezeit unmöglich.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **DSL-Interface (`state_machine!`):** Ein deklaratives Makro, das eine Syntax wie `StateA -> EventX -> StateB` parst.
* **Prozedurales Attribut-Makro (`#[generate_states]`):** Nimmt die strukturierten Übergänge entgegen, generiert für jeden Zustand ein Struct und implementiert Übergangs-Traits.
* **Zustandskontroll-Generierung:** Erstellt das Haupt-Kontext-Struct, das den aktuellen Zustand hält und nur die Methoden anbietet, die im aktuellen Zustand erlaubt sind.

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` (zur Analyse der Zustands- und Event-Namen).
* `quote` (zur Generierung der Trait-Implementierungen).
* `proc-macro2`.

### 4. Didaktische Hinweise
* **Rekursive Makro-Muster:** Deklarative Makros neigen bei der Analyse von DSLs mit Wiederholungen (wie Listen von Übergängen) zu komplexen rekursiven Aufrufen. Halte die DSL-Syntax so einfach wie möglich.
* **Formatierung von Identifiers:** Du musst zur Laufzeit des Makros neue Typnamen erzeugen (z. B. aus dem Zustand `Idle` und dem Event `Start` den Übergangs-Typ `IdleToStart`). Nutze dafür `format_ident!`.
* **Fehlermeldungen im Typstate-Pattern:** Wenn der Benutzer einen ungültigen Übergang wählt, erzeugt der Compiler oft lange, kryptische Fehler. Gestalte die generierten Traits so, dass die Fehlermeldungen verständlich aufzeigen, welcher Übergang fehlt.

### 5. Optionale Zusatz-Herausforderung
Generiere zur Compilezeit automatisch eine Graphviz-DOT-Datei der Zustandsmaschine in deinem `target/`-Verzeichnis, damit der Benutzer seine Zustandsmaschine visualisieren kann.

---

## Projekt 4: Deklarativ-prozeduraler REST-API-Client-Generator (Meta-REST Client)

### 1. Beschreibung der Funktionsweise
Du schreibst ein System, mit dem Web-API-Clients fast ohne Boilerplate definiert werden können. Über ein deklaratives Makro deklarierst du die HTTP-Endpunkte, HTTP-Methoden (GET, POST usw.) und die erwarteten JSON-Antworttypen. Ein prozedurales Derive-Makro analysiert diese Deklarationen und generiert die asynchronen Client-Methoden, die die HTTP-Anfragen durchführen, die Antworten deserialisieren und Fehler behandeln.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Schnittstellen-Definition (`define_api!`):** Ein deklaratives Makro, das eine Schnittstelle in Form eines Traits oder einer Struct-Definition mit Metadaten vorgibt.
* **Prozedurales Derive-Makro (`#[derive(ApiClient)]`):** Wird auf das generierte Struct angewendet. Es analysiert die Felder und Attribute, um den Netzwerk-Code zu erzeugen.
* **HTTP-Transporter:** Die generierten Methoden nutzen eine gemeinsame HTTP-Client-Basis (z. B. `reqwest::Client`), um Redundanz zu vermeiden.

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` und `quote` (zum Extrahieren der API-Struktur und zum Generieren der Client-Methoden).
* `reqwest` (als HTTP-Client im generierten Code).
* `serde` (für die Serialisierung/Deserialisierung).

### 4. Didaktische Hinweise
* **Asynchroner Code in Makros:** Das Generieren von `async fn`-Methoden in Makros erfordert Aufmerksamkeit bezüglich Lebensdauern (`'static` vs. temporäre Referenzen) und der korrekten Verwendung von `Future`-Typen im generierten Code.
* **Hygiene bei externen Crates:** Der generierte Code ruft Methoden aus `reqwest` und `serde` auf. Wenn der Benutzer deines Makros diese Bibliotheken unter einem anderen Namen importiert hat, bricht dein Code. Verwende vollqualifizierte Pfade (z. B. `::reqwest::Client::new()`).

### 5. Optionale Zusatz-Herausforderung
Implementiere ein Custom-Attribut `#[auth]`, das auf API-Methoden angewendet werden kann, um automatisch Bearer-Token-Header in die ausgehende HTTP-Anfrage einzufügen.

---

## Projekt 5: Automatischer Profiler & Logging-Wrapper (Aspect-Oriented Profiler)

### 1. Beschreibung der Funktionsweise
Um die Performance deiner Application zu analysieren, möchtest du die Ausführungszeit von Funktionen und Codeblöcken messen. Du erstellst ein duales System: Ein deklaratives Makro `profile_block!` misst die Ausführungszeit eines beliebigen Code-Blocks zur Laufzeit. Ein prozedurales Attribut-Makro `#[profile_fn]` wird an Funktionen gehängt und schreibt deren Funktionskörper so um, dass die Zeitmessung automatisch beim Betreten und Verlassen der Funktion erfolgt.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Deklaratives Makro (`profile_block!`):** Kapselt einen Code-Block, startet einen Timer vor der Ausführung und gibt die Zeitdauer danach aus.
* **Prozedurales Attribut-Makro (`#[profile_fn]`):** Liest die Signatur der Funktion ein, extrahiert den Funktionskörper (den Block) und bettet ihn in das deklarative `profile_block!`-Makro ein.
* **Profiler-Backend:** Ein einfaches Laufzeit-Modul, das die gemessenen Zeiten sammelt und formatiert ausgibt (z. B. über das `log`-Crate).

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` (zum Parsen und Umschreiben des Funktions-ASTs).
* `quote` (zum Rekonstruieren der modifizierten Funktion).
* `std::time::Instant` (zur Zeitmessung).

### 4. Didaktische Hinweise
* **Erhaltung der Funktionssignatur:** Das Attribut-Makro darf die Parameter, die Sichtbarkeit (`pub`), das `async`-Schlüsselwort und vor allem den Rückgabetyp der Funktion nicht verändern. Du musst den Rückgabewert der Funktion abfangen, den Timer stoppen und dann den Wert zurückgeben.
* **Hygiene bei Variablen-Namen:** Wenn das Makro Variablen zur Zeitmessung einführt (z. B. `let start = Instant::now();`), dürfen diese nicht mit Variablen im Funktionskörper kollidieren. Nutze eindeutige Identifier oder verlasse dich auf die Hygiene von prozeduralen Makros (`Span::mixed_site()`).

### 5. Optionale Zusatz-Herausforderung
Erweitere das Attribut-Makro um einen Schwellenwert-Parameter (z. B. `#[profile_fn(slow_only = "50ms")]`), sodass die Ausführungszeit nur dann protokolliert wird, wenn sie den angegebenen Wert überschreitet.

---

## Projekt 6: Minimalistischer CLI-Parser mit Attributen (Micro-Clap)

### 1. Beschreibung der Funktionsweise
Du entwickelst eine extrem leichtgewichtige Alternative zu `clap`. Ein prozedurales Derive-Makro `#[derive(CliParser)]` analysiert ein Struct und generiert eine Methode, die die Argumente von `std::env::args()` parst. Ein deklaratives Makro `parse_cli!` dient als bequemer Einstiegspunkt in der `main`-Funktion, um den Parser aufzurufen und Fehler elegant abzufangen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Einstiegs-Schnittstelle (`parse_cli!`):** Deklaratives Makro, das den CLI-Typ instanziiert und bei Fehlern das Programm mit einer verständlichen Meldung beendet.
* **Derive-Makro (`#[derive(CliParser)]`):** Liest die Felder des Structs aus.
* **Attribut-Parser:** Hilfsfunktionen innerhalb des Derive-Makros, die Custom-Attribute wie `#[cli(short = "d", help = "Aktiviert den Debug-Modus")]` analysieren.
* **Generierter Parser:** Erstellt den Parsing-Loop, der durch die Argumente läuft, Typen konvertiert und Fehler (z. B. fehlende Argumente) sammelt.

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` (speziell zur Analyse von Struct-Feldern und deren Attributen).
* `quote` (zum Generieren des Parsing-Match-Blocks).

### 4. Didaktische Hinweise
* **Parsen von Attributen:** Das Auslesen von Custom-Attributen in `syn` ist eine der größten Hürden für Makro-Anfänger. Du musst dich mit dem Konzept von `Meta`-Elementen vertraut machen (z. B. `Meta::List` oder `Meta::NameValue`).
* **Typkonvertierung zur Laufzeit:** Wie gehst du im generierten Code mit verschiedenen Feldtypen (z. B. `String`, `i32`, `bool`, `Option<T>`) um? Das Makro muss für jeden Typ den passenden `FromStr`-Aufruf generieren.

### 5. Optionale Zusatz-Herausforderung
Generiere automatisch eine formatierte Hilfeseite (`--help`), die nicht nur die Argumente auflistet, sondern auch die Doc-Kommentare (`///`) der Strukturfelder als Beschreibungen verwendet.

---

## Projekt 7: Compile-Time Dependency-Injection-Container (DI Metamodul)

### 1. Beschreibung der Funktionsweise
Dependency Injection (DI) hilft bei der Entkopplung von Code. Du baust einen DI-Container, der zur Compilezeit überprüft wird. Ein deklaratives Makro registriert verfügbare Typen (z. B. Datenbankverbindungen, Logger). Ein prozedurales Derive-Makro `#[derive(Injectable)]` analysiert die Konstruktoren von Typen und prüft, ob alle benötigten Abhängigkeiten im Container vorhanden sind. Wenn eine Abhängigkeit fehlt, schlägt die Kompilierung fehl.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Container-Deklaration (`di_container!`):** Deklaratives Makro zur Definition des Containers und der darin registrierten Typen.
* **Derive-Makro (`#[derive(Injectable)]`):** Generiert eine Factory-Methode (z. B. `inject`), die die Instanziiermethode des Structs aufruft und die Parameter aus dem Container bezieht.
* **Compilezeit-Prüfer:** Ein prozedurales Makro, das den Abhängigkeitsbaum analysiert und bei Zyklen oder fehlenden Bindungen blockiert.

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` (zur Analyse der Typen im Konstruktor).
* `quote` (zur Generierung des DI-Lösungscodes).

### 4. Didaktische Hinweise
* **Zirkuläre Abhängigkeiten:** Wenn Service A den Service B benötigt und Service B wiederum Service A, führt dies zu einer unendlichen Rekursion. Du musst Mechanismen entwickeln, die solche Zyklen zur Compilezeit erkennen.
* **Typauflösung:** Wie unterscheidest du zwischen transienten Abhängigkeiten (die jedes Mal neu erstellt werden) und Singletons (die in einem `Arc` geteilt werden)? Das Makro muss unterschiedliche Auflösungsstrategien generieren.

### 5. Optionale Zusatz-Herausforderung
Erlaube die Registrierung von Traits statt konkreten Typen. Das Makro muss dann in der Lage sein, eine Implementierung (z. B. `SqlDatabase`) an ein Trait (z. B. `Database`) zu binden.

---

## Projekt 8: Typsichere HTML-Template-Engine (Static HTML Builder)

### 1. Beschreibung der Funktionsweise
Du möchtest HTML-Code direkt in Rust schreiben, ohne Performance-Einbußen durch String-Parsing zur Laufzeit. Ein deklaratives Makro `html!` erlaubt eine XML-ähnliche Syntax im Code. Dieses leitet die Token an ein prozedurales Funktions-Makro weiter. Das Funktions-Makro prüft zur Compilezeit, ob alle geöffneten HTML-Tags korrekt geschlossen und valide verschachtelt sind. Ist alles korrekt, generiert es hocheffizienten String-Builder-Code.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Schnittstellen-Makro (`html!`):** Ein deklaratives Makro, das die Token-Sequenz an das prozedurale Makro übergibt.
* **Prozedurales Funktions-Makro (`build_html!`):** Implementiert einen eigenen Parser für die XML-Struktur.
* **Hierarchie-Validierer:** Ein Modul, das den geparsten HTML-Baum durchläuft und auf syntaktische Korrektheit (z. B. keine ungeschlossenen Tags) prüft.
* **String-Builder-Code-Generator:** Übersetzt die HTML-Struktur in eine Kette von `write!`-Aufrufen in einen Ziel-String.

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` (zur Bereitstellung der Parser-Infrastruktur).
* `quote` (zur Generierung der String-Operationen).

### 4. Didaktische Hinweise
* **Implementierung von `Parse`:** Du musst das `syn::parse::Parse`-Trait für deine HTML-Knoten implementieren. Das Parsen von XML-ähnlichen Tags (z. B. `<div class="container">...</div>`) erfordert das manuelle Konsumieren von Tokens wie `<`, `>`, `/` und Bezeichnern.
* **Fehlermeldungen bei unvollständigen Bäumen:** Wenn ein Tag nicht geschlossen ist, muss der Fehler auf dem öffnenden Tag angezeigt werden. Dies erfordert ein präzises Management der `Span`-Lebensdauern.

### 5. Optionale Zusatz-Herausforderung
Ermögliche es, beliebige Rust-Ausdrücke innerhalb des Templates mittels einer geschweiften Klammer `{expression}` zu platzieren, die zur Laufzeit ausgewertet und in den String eingefügt werden.

---

## Projekt 9: Event-Bus und Subscriber-Generator (Compile-Time Event Dispatcher)

### 1. Beschreibung der Funktionsweise
Du entwickelst ein ereignisgesteuertes System (Event-Driven System). Ein deklaratives Makro definiert einen Event-Bus und die darauf erlaubten Event-Typen. Ein prozedurales Attribut-Makro `#[subscriber]` wird an Methoden von Strukturen gehängt. Das Makro registriert diese Methoden automatisch als Empfänger für spezifische Events auf dem Bus und erzeugt den notwendigen Dispatcher-Glue-Code zur Compilezeit.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Bus-Deklarator (`create_event_bus!`):** Deklaratives Makro zur Erstellung der zentralen Dispatch-Struktur.
* **Prozedurales Attribut-Makro (`#[subscriber]`):** Analysiert die Signatur der annotierten Methode, um herauszufinden, auf welchen Event-Typ sie reagiert.
* **Dispatcher-Generator:** Generiert den Code, der die registrierten Subscriber bei einem Event-Aufruf triggert.

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` (zum Auslesen von Methodensignaturen und deren Parametertypen).
* `quote` und `proc-macro2`.

### 4. Didaktische Hinweise
* **Thread-Safety:** Da Events oft asynchron oder in verschiedenen Threads verarbeitet werden, muss der generierte Code sicherstellen, dass Subscriber `Send` und `Sync` implementieren und Referenzen korrekt über `Arc` und `Mutex` geschützt sind.
* **Hygiene bei der Registrierung:** Wie erfährt das zentrale Bus-Makro von den über das Projekt verstreuten `#[subscriber]`-Methoden? (Tipp: Verwende Traits, die von den Subscribern implementiert werden und die der Bus zur Laufzeit abfragt, oder nutze Linker-Tricks wie das `linkme`-Crate).

### 5. Optionale Zusatz-Herausforderung
Füge dem `#[subscriber]`-Attribut eine Prioritätssteuerung hinzu (z. B. `#[subscriber(priority = 10)]`), sodass die Event-Handler zur Compilezeit in der korrekten Reihenfolge sortiert und aufgerufen werden.

---

## Projekt 10: Compilezeit-Einheiten-Rechner (Type-Safe Units Calculator)

### 1. Beschreibung der Funktionsweise
Um physikalische Berechnungen (z. B. Geschwindigkeit = Weg / Zeit) abzusichern, baust du ein Einheiten-System. Ein deklaratives Makro definiert Basis-Dimensionen (Länge, Zeit, Masse) und deren Einheiten. Ein prozedurales Funktions-Makro `calc!` nimmt mathematische Ausdrücke entgegen, analysiert die physikalischen Dimensionen zur Compilezeit und generiert typsicheren Code. Versucht man, Meter und Sekunden zu addieren, schlägt die Kompilierung fehl.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
* **Dimensionen-Definierer (`define_units!`):** Deklaratives Makro, das die Dimensionen und deren Standard-Einheiten im System anlegt.
* **Prozedurales Funktions-Makro (`calc!`):** Parst eine mathematische Formel (z. B. `calc!(5_m / 2_s)`).
* **Dimensions-Analysator:** Ein Modul, das die mathematischen Operationen des Ausdrucks zur Compilezeit nachvollzieht (z. B. Division von Länge durch Zeit ergibt Geschwindigkeit) und die physikalische Korrektheit prüft.
* **Typ-Generator:** Generiert den Ziel-Code unter Verwendung von Rusts Generics und Const Generics für die Dimensionen.

### 3. Zu verwendende Crates oder Bibliotheken
* `syn` (zum Parsen mathematischer Operatoren und Literale).
* `quote`.

### 4. Didaktische Hinweise
* **Typ-Repräsentation:** Wie bildest du physikalische Dimensionen so in Rusts Typsystem ab, dass der Compiler die Arbeit übernimmt? (Tipp: Nutze Const Generics für die Exponenten der Basisdimensionen, z. B. `Quantity<VAL, const L: i8, const M: i8, const T: i8>`).
* **Lesbare Fehlermeldungen:** Die Fehlermeldungen bei Dimensionskonflikten müssen für den Benutzer klar verständlich sein (z. B. "Dimensions-Fehler: Addition von Länge und Zeit nicht möglich").
* **Operator-Overloading:** Du musst sicherstellen, dass die generierten Typen die Standard-Rechen-Traits (`Add`, `Sub`, `Mul`, `Div`) implementieren, ohne dass dies zu Namenskonflikten führt.

### 5. Optionale Zusatz-Herausforderung
Implementiere eine automatische Einheiten-Skalierung. Wenn der Benutzer `calc!(1_km + 500_m)` schreibt, soll das Makro die Einheiten automatisch auf die Basiseinheit (Meter) normalisieren, bevor die Addition durchgeführt wird.
