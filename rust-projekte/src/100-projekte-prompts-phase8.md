# Phase 8 - Prompts 1 bis 20: Closures-Fokus

### 1. Verzögerter Logger (Lazy Logger)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Entwirf die Datenstrukturen für ein Logging-System.
*   **Hinweise**: Definiere ein Enum `LogLevel` mit Varianten wie `Info`, `Warn` und `Error`. Erstelle eine Struktur `Logger`, die das minimal auszugebende `LogLevel` speichert. Überlege, wie du Closures typisierst, die eine Nachricht generieren, ohne sie sofort auszuwerten.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Schreibe die Methode zur verzögerten Log-Ausgabe.
*   **Hinweise**: Implementiere auf `Logger` eine Methode `log`. Sie soll ein `LogLevel` und eine Closure entgegennehmen, die ein `String` zurückgibt. Nutze die Eigenschaften von Closures, um die Auswertung der Closure nur dann anzustoßen, wenn das übergebene Level die Mindestanforderung erfüllt. Welches Closure-Trait (`Fn`, `FnMut` oder `FnOnce`) ist hier das passendste?

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Erstelle das Hauptprogramm und teste die Verzögerung.
*   **Hinweise**: Schreibe eine `main`-Funktion. Erstelle einen `Logger` mit Level `Warn`. Rufe `log` einmal mit `Info` und einmal mit `Error` auf. Platziere innerhalb der Closures ein `println!`, um auf der Konsole sichtbar zu machen, dass die Closure bei `Info` überhaupt nicht ausgeführt wird.

---

### 2. Dynamischer Rabatt-Kalkulator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere Datenstrukturen für Produkte und Berechnungen.
*   **Hinweise**: Erstelle ein Struct `Product` mit Feldern für den Namen und den Grundpreis. Überlege dir, wie du eine Funktion designst, die ein Produkt und eine Berechnungs-Closure entgegennimmt, um den Endpreis zu ermitteln.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Preisberechnung mit dynamischen Faktoren.
*   **Hinweise**: Schreibe eine Funktion `calculate_price`, die ein `Product` und eine Closure des Typs `Fn(f64) -> f64` erwartet. Die Closure soll den Preis manipulieren können. Kapsele Variablen aus der Umgebung (wie aktuelle Mehrwertsteuer oder Sonderrabatte) in der Closure, um sie an die Funktion zu übergeben.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Bilde den Kassiervorgang ab und teste verschiedene Rabatte.
*   **Hinweise**: Erzeuge in `main` mehrere Produkte. Definiere unterschiedliche Closures (z.B. eine für 10% Rabatt, eine andere für Rabatt plus Steuer) und wende sie auf die Produkte an. Gib die berechneten Endpreise aus.

---

### 3. Zustandsbehafteter Klick-Zähler

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Zustand für den Zähler vor.
*   **Hinweise**: Überlege dir, welche Variable du in der Umgebung einer Closure definieren musst, um Klicks zu zählen. Es wird kein separates Struct benötigt, sondern eine geschickt platzierte Variable, die von der Closure veränderlich eingefangen wird.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Erstelle die zustandsbehaftete Closure.
*   **Hinweise**: Definiere eine Closure, die die Zählervariable erhöht und den aktuellen Stand zurückgibt. Da die Closure ihren Zustand (die eingefangene Variable) verändert, musst du dich fragen, welches Trait (`Fn`, `FnMut` oder `FnOnce`) Rust dieser Closure automatisch zuweist und wie du sie deklarieren musst.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere mehrere Klicks und zeige die Funktionsweise.
*   **Hinweise**: Rufe die Closure in einer Schleife in `main` mehrmals auf. Gib den zurückgegebenen Zählerstand aus. Demonstriere, dass der Zählerzustand über die Aufrufe hinweg erhalten bleibt.

---

### 4. Einmaliger Ressourcen-Verbraucher

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere eine nicht-kopierbare Ressource.
*   **Hinweise**: Erstelle ein Struct `Resource` mit einem Feld (z.B. ein Name). Verwende keinen `Copy`-Trait für dieses Struct, damit das Eigentumsrecht (Ownership) eine Rolle spielt.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Entwickle eine Closure, die die Ressource konsumiert.
*   **Hinweise**: Schreibe eine Closure, die die `Resource` aus der Umgebung übernimmt und sie verbraucht (z.B. durch eine Methode, die die Ressource droppt oder deren Eigentum übernimmt). Nutze das Schlüsselwort `move`, um den Transfer der Ownership zu erzwingen. Welcher Closure-Trait (`Fn`, `FnMut` oder `FnOnce`) wird hier erzwungen und warum?

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste den einmaligen Verbrauch der Ressource.
*   **Hinweise**: Versuche in `main`, die Closure ein zweites Mal aufzurufen, und beobachte, wie der Compiler dies verhindert. Implementiere ein sauberes Hauptprogramm, das die Closure genau einmal aufruft und das korrekte Verhalten aufzeigt.

---

### 5. Generischer Event-Callback

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Struktur für einen Event-Handler.
*   **Hinweise**: Erstelle ein Struct `Button` oder `EventManager`. Es soll ein Feld für eine Callback-Closure enthalten. Da der Typ der Closure zur Compilezeit oft nicht exakt bekannt ist, überlege, ob du ein Generikum mit einem Trait-Bound verwendest oder die Closure in ein `Box<dyn Fn()>` packst.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Ermögliche das Registrieren und Auslösen des Events.
*   **Hinweise**: Schreibe eine Methode `on_click` zum Registrieren der Callback-Closure und eine Methode `click`, die den Callback auslöst. Achte darauf, wie das Struct das Eigentum an der Closure hält.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere die Interaktion mit dem Event-Manager.
*   **Hinweise**: Erzeuge in `main` eine Instanz deiner Struktur. Registriere eine Closure, die eine Nachricht ausgibt oder eine Variable in der Umgebung manipuliert (falls `FnMut` verwendet wird). Löse das Event aus und verifiziere die Ausgabe.

---

### 6. Mathematische Funktions-Tabelle

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die mathematische Auswertung vor.
*   **Hinweise**: Es werden keine komplexen Datenstrukturen benötigt. Du brauchst eine Funktion, die Startwert, Endwert, Schrittweite und die mathematische Funktion selbst als Parameter akzeptiert.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Tabellengenerierung.
*   **Hinweise**: Schreibe die Funktion `print_table`. Der Parameter für die mathematische Funktion soll ein Trait-Bound wie `F: Fn(f64) -> f64` sein. Berechne in einer Schleife (oder mit einem Iterator) die Werte von Start bis Ende und rufe für jeden Schritt die Closure auf.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Werte verschiedene mathematische Funktionen aus.
*   **Hinweise**: Rufe in `main` die Funktion `print_table` mit unterschiedlichen Closures auf (z.B. für eine lineare Funktion `x * 2.0`, eine quadratische `x * x` oder die Sinus-Funktion). Gib die Werte übersichtlich formatiert auf der Konsole aus.

---

### 7. Thread-sicherer Job-Wrapper

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Erstelle Datenstrukturen für den Job.
*   **Hinweise**: Definiere eine Struktur `Job`, die eine Closure kapselt, die an einen Thread übergeben werden kann. Überlege, welche Auto-Traits (`Send`, `'static`) die Closure erfüllen muss, um thread-sicher zu sein.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Kapsele den Thread-Start.
*   **Hinweise**: Schreibe eine Methode `run_in_background` für `Job`. Nutze `std::thread::spawn`. Die Closure muss mit `move` alle Daten aus ihrer Umgebung übernehmen, da die Lebensdauer des Threads nicht an die des aktuellen Scopes gebunden ist.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Führe einen Job im Hintergrund aus.
*   **Hinweise**: Erstelle in `main` Daten (z.B. einen Vektor), erstelle einen `Job`, der diese Daten in einer Closure verarbeitet, und starte ihn im Hintergrund. Warte mit `.join()` auf das Ende des Threads und gib das Ergebnis aus.

---

### 8. Memoisation-Cache

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Cache-Struktur.
*   **Hinweise**: Erstelle ein Struct `Cacher<F>` mit den Feldern `calculation: F` (die Closure) und `value: Option<u32>` (das berechnete Ergebnis). Verwende Generics für den Typ der Closure.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die lazy Auswertung und Zwischenspeicherung.
*   **Hinweise**: Schreibe eine Methode `value` auf `Cacher`. Wenn `value` bereits `Some` enthält, gib diesen Wert zurück. Wenn nicht, rufe die Closure in `calculation` auf, speichere das Ergebnis in `value` und gib es zurück. Welches Trait-Bound für `F` ist notwendig?

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste den Cache auf Performance und Korrektheit.
*   **Hinweise**: Erzeuge in `main` einen `Cacher` mit einer Closure, die eine langsame Berechnung simuliert (z.B. mit `sleep` oder einer rechenintensiven Operation). Rufe `.value()` mehrmals auf und zeige, dass der langsame Teil nur beim ersten Mal ausgeführt wird.

---

### 9. Benutzerdefinierter Kontrollfluss

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Überlege dir das Kontrollfluss-Muster.
*   **Hinweise**: Du brauchst keine komplexen Structs. Du implementierst eine Funktion `unless`, die eine Bedingung und zwei Closures für den Wahr- und Falsch-Fall akzeptiert.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Schreibe die Verzweigungslogik.
*   **Hinweise**: Die Funktion `unless` soll als Signatur `unless<T, F1, F2>(condition: bool, on_true: F1, on_false: F2)` haben. Wähle die passenden Trait-Bounds für `F1` und `F2`. Rufe je nach Wert von `condition` nur eine der beiden Closures auf.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste deinen Kontrollfluss im Einsatz.
*   **Hinweise**: Rufe `unless` in `main` mit Bedingungen auf, die zur Laufzeit ermittelt werden. Gib in den Closures unterschiedliche Testnachrichten aus, um zu zeigen, dass nur der zutreffende Zweig evaluiert wird.

---

### 10. Sortier-Kriterium-Konfigurator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Erstelle Datenstrukturen für zu sortierende Objekte.
*   **Hinweise**: Definiere eine Struktur `Person` mit Feldern wie `name` (String) und `age` (u32).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die flexible Sortierfunktion.
*   **Hinweise**: Schreibe eine Funktion oder verwende eine Methode auf einem Vektor von Personen, die eine Vergleichs-Closure vom Typ `Fn(&Person, &Person) -> std::cmp::Ordering` akzeptiert. Nutze Rusts integrierte Sortier-Methoden (wie `sort_by`), die selbst Closures annehmen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Sortiere eine Liste nach verschiedenen Kriterien.
*   **Hinweise**: Erzeuge in `main` eine Liste von Personen. Sortiere sie einmal nach Alter (aufsteigend) und einmal nach Name (alphabetisch), indem du jeweils eine passende Sortier-Closure übergibst. Gib das Ergebnis jeweils aus.

---

### 11. Flexibler Text-Formatierer

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Schnittstelle für die Texttransformation.
*   **Hinweise**: Du benötigst eine Funktion, die einen Text-Slice und eine Formatierungs-Closure entgegennimmt und einen modifizierten String zurückgibt.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Wort-für-Wort-Transformation.
*   **Hinweise**: Schreibe eine Funktion `format_words`, die den Text in Wörter zerlegt, jedes Wort an die Closure `Fn(&str) -> String` übergibt und die Ergebnisse wieder zu einem Satz zusammenfügt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Wende verschiedene Transformationen an.
*   **Hinweise**: Teste die Funktion in `main` mit verschiedenen Closures: Eine, die Wörter zensiert (z.B. durch Sternchen ersetzt), eine, die alles in Großbuchstaben umwandelt, und eine, die jedes Wort umdreht.

---

### 12. Zustandsautomat mit FnMut

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Zustände des Spielcharakters.
*   **Hinweise**: Erstelle ein Struct `Player` mit Koordinaten `x` und `y`.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die zustandsverändernde Bewegungs-Closure.
*   **Hinweise**: Schreibe eine Funktion oder eine Closure, die einen veränderlichen Verweis auf `Player` oder die Koordinaten selbst einfängt. Diese Closure soll bei jedem Aufruf die Koordinaten anpassen. Da der Zustand modifiziert wird, muss die Closure den `FnMut`-Trait erfüllen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere einen Bewegungspfad.
*   **Hinweise**: Rufe die Closure in `main` mehrmals auf, um den Spieler in eine bestimmte Richtung zu bewegen (z.B. im Zickzack). Gib die Position des Spielers nach jedem Schritt aus.

---

### 13. Konfigurations-Fallback

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Entwirf die Konfigurationsdaten.
*   **Hinweise**: Verwende den Typ `Option<String>` für Konfigurationswerte, die vorhanden sein können oder nicht.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Nutze lazy Fallback-Berechnung.
*   **Hinweise**: Verwende die Methode `unwrap_or_else` auf `Option`. Übergib eine Closure, die einen Standardwert (z.B. durch Einlesen einer Umgebungsvariablen oder Generieren eines Standardpfads) erzeugt. Erkläre den Unterschied zu `unwrap_or`, insbesondere bezüglich der Performance (Lazy Evaluation).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zeige das Verhalten bei vorhandenen und fehlenden Werten.
*   **Hinweise**: Teste in `main` beide Fälle: Einmal ist der Konfigurationswert `Some`, einmal `None`. Gib aus, in welchem Fall die Fallback-Closure tatsächlich ausgeführt wird (z.B. indem du ein `println!` in die Closure einbaust).

---

### 14. Sicheres Ressourcen-Handling (Scope Guard)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere eine Struktur, die eine Aufräumaktion kapselt.
*   **Hinweise**: Erstelle ein Struct `ScopeGuard<F>` mit einem Feld für eine Closure. Dieses Struct soll beim Verlassen des Scopes eine Aktion ausführen.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Nutze das `Drop`-Trait für die automatische Ausführung.
*   **Hinweise**: Implementiere das `Drop`-Trait für `ScopeGuard`. In der `drop`-Methode soll die Closure ausgeführt werden. Welches Trait-Bound muss die Closure erfüllen? (Tipp: Typischerweise `FnOnce` oder `FnMut`).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste die Absicherung bei normalen und fehlerhaften Durchläufen.
*   **Hinweise**: Erstelle in `main` einen `ScopeGuard`, dessen Closure eine Datei schließt oder eine Statusmeldung ausgibt. Zeige, dass die Closure ausgeführt wird, sobald die Variable den Scope verlässt (auch bei einem vorzeitigen `return`).

---

### 15. Verzeichnis-Filter mit dynamischem Muster

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Dateisuche vor.
*   **Hinweise**: Du benötigst keine speziellen Structs, sondern arbeitest mit Pfaden (z.B. `std::path::Path`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Filterlogik mit einer Closure.
*   **Hinweise**: Schreibe eine Funktion, die eine Liste von Dateipfaden und eine Filter-Closure entgegennimmt. Die Closure soll einen Pfad prüfen und ein `bool` zurückgeben. Fange in der Closure ein Muster (z.B. eine Dateiendung) aus der Umgebung ein.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Filter ein fiktives oder echtes Verzeichnis.
*   **Hinweise**: Definiere in `main` eine Liste von Dateinamen. Verwende die Filterfunktion mit einer Closure, die nach verschiedenen Kriterien filtert (z.B. nur `.txt`-Dateien, oder Dateien, die mit `log` beginnen). Gib die Ergebnisse aus.

---

### 16. Fortschritts-Callback

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Fortschrittsinformationen.
*   **Hinweise**: Erstelle ein Struct `Progress` mit Feldern wie `current_bytes` und `total_bytes`.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere den Kopiervorgang mit Callback.
*   **Hinweise**: Schreibe eine Funktion `copy_data`, die Daten in Blöcken kopiert. Sie soll eine Closure `Fn(&Progress)` akzeptieren. Rufe nach jedem kopierten Block die Closure mit den aktuellen Werten auf.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zeige eine Fortschrittsanzeige auf der Konsole.
*   **Hinweise**: Simuliere in `main` das Kopieren einer Datei. Die übergebene Closure soll den aktuellen Fortschritt in Prozent auf der Konsole ausgeben (z.B. mit Wagenrücklauf `\r`, um die Zeile zu aktualisieren).

---

### 17. Validierungs-Pipeline

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Entwirf eine Struktur für die Pipeline.
*   **Hinweise**: Erstelle ein Struct `Validator<T>`, das eine Liste von Closures (z.B. in einem `Vec<Box<dyn Fn(&T) -> bool>>`) speichert.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Ermögliche das Hinzufügen von Regeln und die Validierung.
*   **Hinweise**: Schreibe Methoden `add_rule`, um eine neue Validierungs-Closure hinzuzufügen, und `validate`, die alle Regeln gegen ein übergebenes Objekt prüft und `true` zurückgibt, wenn alle Regeln erfüllt sind.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Validierte Benutzereingaben (z.B. ein Passwort oder Alter).
*   **Hinweise**: Erstelle in `main` einen `Validator` für Strings. Füge Regeln hinzu (z.B. Mindestlänge, enthält Zahlen). Teste verschiedene Strings und gib aus, ob sie valide sind.

---

### 18. Zufallszahlengenerator mit Zustand

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Überlege dir das mathematische Modell.
*   **Hinweise**: Verwende eine einfache Formel (wie einen Linearen Kongruenzgenerator LCG) zur Erzeugung von Pseudozufallszahlen. Du brauchst einen Startwert (Seed), der von der Closure eingefangen wird.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Erstelle die Generator-Closure.
*   **Hinweise**: Definiere eine `FnMut`-Closure, die den Seed bei jedem Aufruf nach der LCG-Formel aktualisiert und die generierte Zahl zurückgibt. Achte darauf, wie der veränderliche Zustand im Scope gehalten wird.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Generiere eine Sequenz von Zufallszahlen.
*   **Hinweise**: Rufe in `main` die Generator-Closure mehrmals auf. Gib die Zahlen aus und zeige, dass sich bei gleichem Startwert (Seed) immer dieselbe deterministische Sequenz ergibt.

---

### 19. Currying-Simulation

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Verstehe das Konzept des Currying.
*   **Hinweise**: Currying wandelt eine Funktion mit mehreren Argumenten in eine Kette von Funktionen mit je einem Argument um. Überlege dir die Signatur einer Funktion, die einen Wert nimmt und eine Closure zurückgibt.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die verschachtelten Closures.
*   **Hinweise**: Schreibe eine Funktion `add`, die ein `i32` nimmt und eine Closure zurückgibt, die wiederum ein `i32` nimmt und die Summe berechnet. Der Rückgabetyp der äußeren Funktion ist ein impliziter Closure-Typ (z.B. `impl Fn(i32) -> i32`). Nutze `move`, um das erste Argument in die innere Closure zu übertragen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Wende die gecurryte Funktion an.
*   **Hinweise**: Erstelle in `main` eine spezialisierte Funktion `add_five` durch Aufruf von `add(5)`. Benutze diese neue Funktion, um verschiedene Zahlen um 5 zu erhöhen, und gib die Ergebnisse aus.

---

### 20. Fehler-Mapper

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere verschiedene Fehlertypen.
*   **Hinweise**: Erstelle ein Enum `AppError` mit Varianten wie `DatabaseError(String)` oder `NetworkError`. Simuliere einen rohen Systemfehler (z.B. `std::io::Error`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Nutze Closures zur Fehlerkonvertierung.
*   **Hinweise**: Verwende die Methode `.map_err()` auf einem `Result`. Übergib eine Closure, die den rohen Fehler nimmt, ihn in einen passenden `AppError` umwandelt und zusätzlichen Kontext (z.B. aus der Umgebung eingefangene Variablen wie eine IP oder ID) hinzufügt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere einen Dateizugriffsfehler und transformiere ihn.
*   **Hinweise**: Versuche in `main` eine nicht existierende Datei zu öffnen. Fange den Fehler ab, verwende `.map_err` mit einer Closure, um ihn in deinen `AppError` umzuwandeln, und gib den finalen Fehler aus.
# Phase 8 - Prompts 21 bis 40: Eigene Iteratoren

### 21. Fibonacci-Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Zustand des Fibonacci-Generators vor.
*   **Hinweise**: Definiere eine Struktur `Fibonacci`. Welche Variablen muss diese Struktur besitzen, um die aktuelle und die nächste Zahl der Folge zu speichern? Denke an den Startzustand (0 und 1).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere das `Iterator`-Trait.
*   **Hinweise**: Schreibe die `impl Iterator for Fibonacci`. Welcher Typ ist der `Item`-Typ? Implementiere `next()`, sodass die nächste Fibonacci-Zahl berechnet wird. Stelle sicher, dass die internen Variablen der Struktur aktualisiert werden, und gib den aktuellen Wert zurück. Da die Folge unendlich ist, gibt `next()` niemals `None` zurück (sondern immer `Some(wert)`).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib einen Ausschnitt der Fibonacci-Folge aus.
*   **Hinweise**: Erstelle in `main` eine Instanz des Iterators. Verwende Iterator-Adapter wie `.take(n)` oder `.skip(m)`, um eine bestimmte Anzahl von Zahlen auszugeben, da eine einfache Schleife ohne Abbruchbedingung unendlich laufen würde.

---

### 22. Bereichs-Iterator mit Schrittweite

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Grenzen und die Schrittweite des Bereichs.
*   **Hinweise**: Erstelle ein Struct `StepRange<T>`. Es benötigt Felder für den `current`-Wert, den `end`-Wert und die `step`-Größe. Verwende Typen wie `f64` oder ein generisches `T`, das mathematische Operationen und Vergleiche unterstützt.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere das Trait `Iterator`.
*   **Hinweise**: Implementiere `next()` für `StepRange`. Überprüfe, ob `current` den `end`-Wert überschritten hat. Wenn ja, gib `None` zurück. Wenn nein, addiere `step` zu `current`, speichere den neuen Zustand und gib den vorherigen Zustand als `Some(wert)` zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Durchlaufe einen Bereich mit Fließkommazahlen.
*   **Hinweise**: Erstelle in `main` einen Bereich von `0.0` bis `3.0` mit einer Schrittweite von `0.5`. Gib alle Werte mit einer Schleife oder `.for_each()` aus und überprüfe die korrekte Einhaltung der Grenzen.

---

### 23. Custom String-Splitter

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Halte den Zustand für die Textteilung fest.
*   **Hinweise**: Erstelle ein Struct `CustomSplit<'a>`. Es muss die verbleibende Lebensdauer des Textes abbilden. Welche Felder benötigt es? (Tipp: Einen Verweis auf den noch nicht verarbeiteten Teilstring `&'a str` und das Trennzeichen `char`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Logik zur Textaufspaltung in `next()`.
*   **Hinweise**: Suche in `next()` nach dem ersten Vorkommen des Trennzeichens im verbleibenden String. Wenn kein Trennzeichen mehr gefunden wird, gib den Rest des Strings zurück und setze den internen Zustand auf leer. Wenn eines gefunden wird, spalte den String an diesem Index, aktualisiere den Zustand auf den hinteren Teil und gib den vorderen Teil zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zerlege einen Satz in Wörter.
*   **Hinweise**: Erstelle in `main` einen Satz (z.B. durch Kommata getrennt). Verwende deinen `CustomSplit`-Iterator, um die Einzelteile nacheinander auszulesen, und gib sie auf der Konsole aus.

---

### 24. Endloser Zufalls-Stream

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Grenzen des Zufallsgenerators.
*   **Hinweise**: Erstelle ein Struct `RandomStream`. Es benötigt Felder für den minimalen und maximalen Wert der zu generierenden Zahlen. Zur Zufallsgenerierung kannst du eine einfache mathematische Formel (wie einen LCG) im Zustand mitführen.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Zufallsgenerierung im `Iterator`-Trait.
*   **Hinweise**: Implementiere `next()`. Berechne mithilfe des LCG-Zustands die nächste Zahl, passe sie an den gewünschten Bereich (Min bis Max) an und gib sie in `Some` zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Lies eine Stichprobe von Zufallszahlen aus.
*   **Hinweise**: Erstelle in `main` den `RandomStream`. Verwende `.take(10)`, um genau 10 Zufallszahlen zu ziehen und diese auszugeben.

---

### 25. Grid-Traversierer

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Matrix und den Positionszeiger.
*   **Hinweise**: Erstelle ein Struct `GridTraverser<'a, T>`. Es sollte eine Referenz auf ein zweidimensionales Array oder einen Vektor (`&'a [Vec<T>]`) halten sowie den aktuellen Index für Zeile (`row`) und Spalte (`col`). Zudem wird ein Enum benötigt, das die Richtung festlegt (`RowMajor` oder `ColumnMajor`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Traversierungslogik.
*   **Hinweise**: Implementiere `next()`. Berechne je nach eingestellter Richtung die nächste Position. Beachte den Zeilenumbruch bzw. Spaltenwechsel. Wenn das Ende des Grids erreicht ist, gib `None` zurück, andernfalls das Element als `Some(&T)`.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Traversiere ein Grid auf beide Arten.
*   **Hinweise**: Erzeuge in `main` ein 3x3-Grid. Verwende den `GridTraverser`, um die Werte einmal zeilenweise und einmal spaltenweise auszugeben.

---

### 26. Beidseitiger Queue-Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite eine eigene Kollektion für beidseitiges Iterieren vor.
*   **Hinweise**: Erstelle eine Struktur, die eine Liste von Elementen kapselt (z.B. einen Vektor). Der Iterator selbst benötigt zwei Indizes: einen für den Start (`head`) und einen für das Ende (`tail`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere `Iterator` und `DoubleEndedIterator`.
*   **Hinweise**: Implementiere zuerst `Iterator::next()`, um Elemente von `head` bis `tail` vorwärts zu lesen. Implementiere dann `DoubleEndedIterator::next_back()`, um Elemente von `tail` aus rückwärts zu lesen. Stelle sicher, dass die Indizes sich nicht überschneiden.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Entnehme Elemente von beiden Seiten.
*   **Hinweise**: Erzeuge in `main` eine Liste. Rufe abwechselnd `next()` und `next_back()` auf und beobachte, wie sich die Indizes aufeinander zubewegen, bis der Iterator leer ist.

---

### 27. Zirkulärer Puffer-Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Ringpuffer und den Iterator vor.
*   **Hinweise**: Erstelle ein Struct `RingBuffer<T>` mit einem Vektor und einer maximalen Kapazität. Der Iterator `RingBufferIterator` benötigt eine Referenz auf den Puffer und den aktuellen Index.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere das unendliche Iterieren.
*   **Hinweise**: In `next()` des Iterators erhöhst du den Index. Nutze den Modulo-Operator (`% Kapazität`), damit der Index nach dem letzten Element wieder auf 0 zurückfällt. Der Iterator liefert unendlich lange Elemente.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Lese Daten aus dem Ringpuffer aus.
*   **Hinweise**: Befülle den Puffer in `main` mit Elementen. Erstelle den Iterator und nutze `.take(15)`, um zu demonstrieren, wie sich die Elemente wiederholen.

---

### 28. Dateizeilen-Streaming

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite das ressourcenschonende Lesen vor.
*   **Hinweise**: Verwende `std::fs::File` und `std::io::BufReader`. Erstelle ein Struct `FileLineReader`, das den `BufReader` kapselt.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere das zeilenweise Lesen im Iterator.
*   **Hinweise**: Implementiere `next()`. Nutze die Methode `read_line` des `BufReader`, um jeweils eine Zeile in einen internen Puffer zu lesen. Gib diese Zeile als `Some(String)` zurück. Behandle Fehler oder das Erreichen des Dateiendes (Dateiende liefert `None`).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Lies eine Testdatei zeilenweise ein.
*   **Hinweise**: Schreibe in `main` ein Programm, das eine Textdatei öffnet, sie mit deinem `FileLineReader` zeilenweise durchläuft und jede Zeile nummeriert ausgibt.

---

### 29. Primzahl-Iterator (Sieb)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Kapsele den Zustand der Primzahlerzeugung.
*   **Hinweise**: Erstelle ein Struct `Primes`. Da du prüfen musst, ob eine Zahl prim ist, speichere im Struct eine Liste der bereits gefundenen Primzahlen, um neue Kandidaten effizient teilen zu können.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Primzahllogik in `next()`.
*   **Hinweise**: Teste in `next()` beginnend ab der letzten Zahl fortlaufend die ungeraden Zahlen. Prüfe, ob sie durch eine der bereits gefundenen Primzahlen teilbar sind. Sobald eine Primzahl gefunden wurde, füge sie der internen Liste hinzu und gib sie zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Generiere die ersten n Primzahlen.
*   **Hinweise**: Erzeuge den `Primes`-Iterator in `main` und gib mithilfe von `.take(20)` die ersten 20 Primzahlen aus.

---

### 30. Rückwärts-Iterator für verkettete Listen

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Entwirf eine einfache verkettete Liste.
*   **Hinweise**: Erstelle eine Struktur `Node<T>` mit den Feldern `value` und `next: Option<Box<Node<T>>>`. Der Rückwärts-Iterator benötigt eine Struktur, die die Elemente temporär für die Rückwärtstraversierung erfasst (z.B. indem sie in einem Vektor gesammelt werden).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere das Rückwärts-Iterieren.
*   **Hinweise**: Da es sich um eine einfach verkettete Liste handelt, kannst du beim Erzeugen des Iterators die Liste einmal durchlaufen und Referenzen auf die Werte in einem Vektor sammeln. Die `next()`-Methode des Iterators entnimmt dann die Elemente von hinten (z.B. mit `.pop()`).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib eine Liste rückwärts aus.
*   **Hinweise**: Baue in `main` eine verkettete Liste mit den Werten 1 -> 2 -> 3 auf. Erzeuge den Rückwärts-Iterator und gib die Elemente in der Reihenfolge 3, 2, 1 aus.

---

### 31. Custom Chunk-Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Datenstruktur für Chunks.
*   **Hinweise**: Erstelle ein Struct `Chunks<'a, T>`, das ein Slice `&'a [T]` und die gewünschte Chunk-Größe `usize` enthält.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere das Aufteilen des Slices in `next()`.
*   **Hinweise**: Prüfe in `next()`, ob das Slice leer ist. Wenn ja, gib `None` zurück. Wenn nein, teile das Slice mit `.split_at()` an der Position der Chunk-Größe (oder am Ende des Slices, falls es kürzer ist). Aktualisiere das gespeicherte Slice auf den hinteren Teil und gib den vorderen Teil als `Some(&[T])` zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zerlege ein Array in Pakete.
*   **Hinweise**: Erstelle in `main` ein Array mit 10 Elementen. Erzeuge einen `Chunks`-Iterator mit einer Größe von 3. Gib die einzelnen Teilstücke aus (die letzten sollten kleiner sein).

---

### 32. DNA-Basen-Transkriptor

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere Nukleotide und den Transkriptions-Zustand.
*   **Hinweise**: Erstelle Enums für `DnaNucleotide` (A, T, C, G) und `RnaNucleotide` (A, U, C, G). Der Iterator soll einen Iterator über `DnaNucleotide` als Quelle kapseln.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Transkription in `next()`.
*   **Hinweise**: Implementiere `Iterator` für `Transcriptor<I>` (wobei `I: Iterator<Item = DnaNucleotide>`). In `next()` rufst du `next()` auf dem inneren Iterator auf. Mappe die DNA-Base auf die entsprechende RNA-Base (A->U, T->A, C->G, G->C) und gib diese zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Transkribiere eine DNA-Sequenz.
*   **Hinweise**: Erstelle in `main` einen Vektor mit DNA-Basen. Wandle ihn in einen Iterator um, jage ihn durch den `Transcriptor` und gib die resultierenden RNA-Basen aus.

---

### 33. Run-Length-Decoder

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Dekodierung vor.
*   **Hinweise**: Erstelle ein Struct `RleDecoder<I>`, das einen Iterator `I` über Tupel vom Typ `(usize, char)` kapselt. Es benötigt zudem Felder, um das aktuelle Zeichen und dessen verbleibende Anzahl zwischenzuspeichern.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Entpackungs-Logik.
*   **Hinweise**: Prüfe in `next()`, ob die verbleibende Anzahl des aktuellen Zeichens größer als 0 ist. Wenn ja, dekrementiere sie und gib das Zeichen zurück. Wenn nein, hole das nächste Tupel aus dem inneren Iterator. Wenn der innere Iterator `None` liefert, gib `None` zurück, andernfalls aktualisiere den Zustand und wiederhole den Schritt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Dekodiere eine komprimierte Sequenz.
*   **Hinweise**: Erstelle in `main` eine Liste von RLE-Daten wie `[(3, 'A'), (1, 'B'), (2, 'C')]`. Dekodiere sie und gib das Ergebnis `AAABCC` aus.

---

### 34. Historien-Fenster (Windowed Iterator)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Fenstergröße und den Puffer.
*   **Hinweise**: Erstelle ein Struct `WindowedIterator<I, T>`, das einen Iterator `I` kapselt. Du benötigst eine Struktur (z.B. einen `VecDeque`), um das aktuelle Fenster der Größe `N` zwischenzuspeichern.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere das gleitende Fenster.
*   **Hinweise**: Befülle beim ersten Aufruf von `next()` das Fenster mit den ersten `N` Elementen. Bei jedem weiteren Aufruf schiebst du ein neues Element vom inneren Iterator nach und entfernst das älteste. Gib das aktuelle Fenster (z.B. als Vektor oder Slice) zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Analysiere eine Sequenz in Dreier-Fenstern.
*   **Hinweise**: Übergib einen Iterator von Zahlen an den `WindowedIterator` mit Fenstergröße 3. Gib in `main` jedes Fenster aus und zeige das Gleiten.

---

### 35. Kombinations-Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Paarbildung vor.
*   **Hinweise**: Erstelle ein Struct `Combinations<T>`. Es hält einen Vektor von Elementen und zwei Indizes `i` und `j`, um die aktuellen Positionen für die Kombinationen zu verfolgen.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Generiere alle Paarkombinationen.
*   **Hinweise**: Erhöhe in `next()` den Index `j`. Wenn `j` das Ende des Vektors erreicht, erhöhe `i` und setze `j` auf `i + 1`. Wenn `i` das Ende erreicht, gib `None` zurück. Gib andernfalls das Paar `(&T, &T)` an den Indizes `i` und `j` zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Erzeuge alle Paare aus einer Liste.
*   **Hinweise**: Erstelle in `main` eine Liste von Namen. Nutze deinen Iterator, um alle Zweier-Kombinationen auszugeben, ohne dass Paare doppelt (in unterschiedlicher Reihenfolge) vorkommen.

---

### 36. Interleaved Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Halte zwei Quell-Iteratoren bereit.
*   **Hinweise**: Erstelle ein Struct `Interleave<I1, I2>` mit zwei Feldern für die beiden Iteratoren. Ein Boolean-Feld `flag` bestimmt, welcher Iterator als nächstes an der Reihe ist.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Wechsel das Abrufen ab.
*   **Hinweise**: Lese in `next()` je nach Wert von `flag` ein Element aus `I1` oder `I2`. Schalte `flag` um. Wenn ein Iterator bereits leer ist, lies weiterhin aus dem anderen, bis beide leer sind.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Mische zwei Listen.
*   **Hinweise**: Erstelle zwei Vektoren in `main` (z.B. Zahlen und Buchstaben). Mische sie mit `Interleave` und gib das Ergebnis aus.

---

### 37. CSV-Parser-Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die CSV-Zeilenstruktur.
*   **Hinweise**: Erstelle eine Struktur `CsvParser<I>` um einen Zeilen-Iterator `I`. Sie soll Fehler protokollieren, weshalb ein optionales Log-Feld nützlich sein kann.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Parsen der CSV-Felder in `next()`.
*   **Hinweise**: Hole in `next()` die nächste Zeile. Splitte sie am Komma. Wenn das Parsen fehlschlägt (z.B. falsche Spaltenanzahl), überspringe die Zeile, protokolliere den Fehler und fahre mit der nächsten Zeile fort (rekursiver Aufruf von `next()` oder via Schleife).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Lese eine simulierte CSV-Datei aus.
*   **Hinweise**: Übergib einen Iterator von Strings (Zeilen), der auch fehlerhafte Zeilen enthält. Gib in `main` nur die erfolgreich geparsten Zeilen als Vektoren aus.

---

### 38. Dateisystem-Tiefensuche (DFS)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Zustand der Pfad-Traversierung vor.
*   **Hinweise**: Erstelle ein Struct `DirectoryDfs` mit einem Stack (z.B. einem Vektor von `std::path::PathBuf`) für die noch zu besuchenden Verzeichnisse.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Tiefensuche.
*   **Hinweise**: Nimm in `next()` den obersten Pfad vom Stack. Wenn es sich um eine Datei handelt, gib sie zurück. Wenn es ein Verzeichnis ist, lies dessen Inhalt mit `std::fs::read_dir` und lege alle gefundenen Pfade auf den Stack. Wiederhole dies, bis eine Datei gefunden wird oder der Stack leer ist.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Liste alle Dateien unter einem Startverzeichnis auf.
*   **Hinweise**: Erstelle in `main` einen `DirectoryDfs` für einen Testordner und gib alle darin gefundenen Dateipfade aus.

---

### 39. Fortschritts-Iterator (ExactSize)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Struktur für die Fortschrittsüberwachung.
*   **Hinweise**: Erstelle ein Struct `ProgressIterator<I>` mit dem inneren Iterator `I` und der Gesamtlänge.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere `Iterator` und `ExactSizeIterator`.
*   **Hinweise**: Leite den `next()`-Aufruf an den inneren Iterator weiter und dekrementiere die verbleibende Länge. Implementiere das `ExactSizeIterator`-Trait, indem du die Methode `len(&self) -> usize` bereitstellst, die die verbleibende Anzahl an Elementen zurückgibt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Visualisiere verbleibende Schritte.
*   **Hinweise**: Nutze den Iterator in `main` und zeige in jedem Schleifendurchlauf an, wie viele Elemente noch verarbeitet werden müssen, indem du `.len()` abfragst.

---

### 40. Zyklischer Wochentags-Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Wochentage.
*   **Hinweise**: Erstelle ein Enum `Weekday` mit allen sieben Wochentagen. Der Iterator `WeekdayIterator` benötigt ein Feld für den aktuellen Wochentag (oder einen Index 0-6).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die zyklische Rotation.
*   **Hinweise**: Ermittle in `next()` den aktuellen Tag, bestimme den nächsten Wochentag (Montag folgt auf Sonntag) und speichere ihn ab. Gib den ermittelten Tag in `Some` zurück. Der Iterator endet nie.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere einen zweiwöchigen Kalender.
*   **Hinweise**: Erzeuge den `WeekdayIterator` in `main` und lasse ihn über einen Adapter `.take(14)` laufen, um zwei komplette Wochen auszugeben.
# Phase 8 - Prompts 41 bis 60: Iterator-Ketten & Adapter

### 41. Zahlen-Filter & Quadrierer

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Zahlenliste vor.
*   **Hinweise**: Definiere einen Vektor mit ganzen Zahlen (`Vec<i32>`), die sowohl positive als auch negative Werte sowie gerade und ungerade Zahlen enthalten.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Baue die Transformations-Kette auf.
*   **Hinweise**: Wandle den Vektor in einen Iterator um. Verwende `.filter()`, um nur ungerade Zahlen übrig zu lassen (nutze den Modulo-Operator). Schließe einen `.map()`-Adapter an, der die verbleibenden Zahlen quadriert. Sammele das Ergebnis mit `.collect()` in einem neuen Vektor.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Werte und vergleiche die Eingabe und Ausgabe.
*   **Hinweise**: Gib in `main` die Ausgangsliste und die resultierende Liste aus, um zu verifizieren, dass alle Kriterien korrekt verarbeitet wurden.

---

### 42. Gesamtwortlängen-Rechner

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Eingabetext vor.
*   **Hinweise**: Verwende eine Zeichenkette (`&str`), die einen Satz mit Wörtern unterschiedlicher Länge und eventuell Satzzeichen enthält.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Verwende eine funktionale Kette zur Längenermittlung.
*   **Hinweise**: Splitte den Satz in Wörter auf (z.B. mit `.split_whitespace()`). Verwende `.map()`, um jedes Wort durch seine Länge zu ersetzen. Verwende am Ende `.sum()` oder `.fold()`, um alle Längen zu addieren.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Berechne und präsentiere das Ergebnis.
*   **Hinweise**: Gib in `main` den ursprünglichen Satz sowie die berechnete Gesamtlänge aller Wörter aus.

---

### 43. E-Mail-Domänen-Filter

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die E-Mail-Datenquelle.
*   **Hinweise**: Erstelle einen Vektor von Strings mit E-Mail-Adressen, wobei einige Domänen mehrfach vorkommen sollten.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Extrahiere die eindeutigen Domänen.
*   **Hinweise**: Erstelle einen Iterator aus den E-Mails. Verwende `.filter_map()`, um ungültige Adressen (die kein `@` enthalten) auszufiltern und gleichzeitig die Domäne (den Teil nach dem `@`) zu extrahieren. Verwende `.collect()`, um die Domänen direkt in ein `HashSet` einzulesen, welches Duplikate automatisch entfernt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib die Domänenliste aus.
*   **Hinweise**: Drucke in `main` die gesammelten Domänen aus und verifiziere, dass keine Domäne doppelt aufgeführt ist.

---

### 44. Gleitender Durchschnitt mit Scan

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Messdaten vor.
*   **Hinweise**: Erstelle eine Liste von Sensor-Messwerten (z.B. ein Vektor von `f64`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Berechne den gleitenden Durchschnitt über einen Zustand mit `scan`.
*   **Hinweise**: Nutze `.scan()`. Dieser Adapter erlaubt es dir, einen Zustand (z.B. ein Tupel aus der aktuellen Summe und der Anzahl der bisherigen Elemente) über die Iteration hinweg mitzuführen. Berechne in jedem Schritt den neuen Durchschnitt und gib ihn aus.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Stelle den Verlauf der Durchschnittswerte dar.
*   **Hinweise**: Erzeuge in `main` eine Messreihe mit Ausreißern. Wende die Kette an und gib die Liste der gleitenden Durchschnitte aus.

---

### 45. Wörter-Partitionierung

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Wortliste vor.
*   **Hinweise**: Erstelle einen Vektor von Wörtern (Strings), die teils mit Vokalen (A, E, I, O, U) und teils mit Konsonanten beginnen.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Teile die Liste mit `partition` auf.
*   **Hinweise**: Erstelle einen Iterator über die Wörter. Rufe die Methode `.partition()` auf. Diese Methode nimmt eine Closure entgegen, die `true` oder `false` zurückgibt, und teilt den Iterator in zwei Vektoren auf. Implementiere die Closure so, dass sie prüft, ob der Anfangsbuchstabe ein Vokal ist.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zeige beide Teil-Listen.
*   **Hinweise**: Gib in `main` beide durch die Partitionierung entstandenen Listen getrennt aus.

---

### 46. Indexbasierte Suche

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Suchdaten vor.
*   **Hinweise**: Definiere einen Vektor mit Elementen (z.B. Strings) und lege ein Kriterium fest (z.B. das erste Wort, das mit 'Z' beginnt).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Finde das Element und seinen Index.
*   **Hinweise**: Wandle den Vektor in einen Iterator um. Rufe `.enumerate()` auf, um Tupel aus Index und Element zu erhalten. Verwende danach `.find()`, um das erste Element zu finden, das die Bedingung erfüllt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Werte das Suchergebnis aus.
*   **Hinweise**: Gib in `main` aus, an welchem Index das gesuchte Element gefunden wurde. Behandle auch den Fall, dass kein Element die Bedingung erfüllt (`Option` sauber behandeln).

---

### 47. Verschachteltes JSON-Flattening

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Simuliere verschachtelte JSON-Arrays.
*   **Hinweise**: Erstelle ein Enum `JsonValue`, das Varianten wie `Null`, `Number(i32)` und `Array(Vec<JsonValue>)` besitzen kann.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Flache verschachtelte Arrays ab.
*   **Hinweise**: Schreibe eine Kette, die ein `JsonValue::Array` nimmt und mit `.flat_map()` bzw. `.filter_map()` arbeitet. Wenn ein Element ein verschachteltes Array ist, sollen dessen innere Werte geliefert werden. Wenn es ein einzelner Wert (z.B. eine Zahl) ist, soll dieser direkt übergeben werden.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste die Strukturierung auf einer Testeingabe.
*   **Hinweise**: Erstelle in `main` eine verschachtelte Struktur wie `[1, [2, 3], null, [4]]`. Jage sie durch deine Kette und sammle alle gefundenen Zahlen in einem flachen Vektor.

---

### 48. Debugging-Pipeline mit Inspect

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Testdaten vor.
*   **Hinweise**: Erstelle eine Liste von Zahlen, die transformiert werden soll.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Schleuse `inspect` in die Kette ein.
*   **Hinweise**: Baue eine Kette aus mehreren Adaptern (z.B. `filter`, `map`, `take`). Füge zwischen den Schritten `.inspect(|x| println!("Debug: {}", x))` ein. Das erlaubt es dir, den aktuellen Zustand der Daten zu betrachten, ohne das Element zu verändern oder die Kette zu unterbrechen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Beobachte den Datenfluss.
*   **Hinweise**: Führe die Kette in `main` aus. Achte in der Konsolenausgabe darauf, wie die Elemente Schritt für Schritt die Kette durchlaufen und an welchen Stellen sie ausgefiltert werden.

---

### 49. Wort-Häufigkeits-Zähler

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Analysetext vor.
*   **Hinweise**: Verwende einen längeren String, in dem bestimmte Wörter mehrfach vorkommen.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Zähle die Wörter mithilfe von `fold`.
*   **Hinweise**: Zerlege den Text in Wörter. Verwende `.fold()`, um eine `HashMap<String, usize>` aufzubauen. Der Akkumulator in `fold` startet mit einer leeren Map. Erhöhe für jedes Wort dessen Zähler in der Map.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib die Häufigkeitstabelle aus.
*   **Hinweise**: Gib in `main` die resultierende Map formatiert aus, sodass man die Häufigkeit jedes Wortes ablesen kann.

---

### 50. ID-Namens-Verknüpfung (Zip)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die beiden Datenquellen.
*   **Hinweise**: Erstelle eine Liste von IDs (`Vec<u32>`) und eine Liste von Namen (`Vec<String>`). Die Listen können unterschiedlich lang sein.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Verknüpfe beide Sequenzen.
*   **Hinweise**: Wandle beide Listen in Iteratoren um. Rufe `.zip()` auf dem ersten Iterator auf und übergib den zweiten. Mappe die resultierenden Tupel `(id, name)` in eine Struktur `User`.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zeige die verknüpften Benutzer.
*   **Hinweise**: Gib in `main` die Liste der erzeugten `User`-Strukturen aus. Achte darauf, was passiert, wenn eine der beiden Listen kürzer war.

---

### 51. Paginierte Dateiliste

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Simuliere Verzeichnisinhalte.
*   **Hinweise**: Erstelle zwei Vektoren von Strings, die Dateinamen aus unterschiedlichen Verzeichnissen repräsentieren.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Verkette und limitiere die Liste.
*   **Hinweise**: Verwende `.chain()`, um die Iteratoren der beiden Vektoren nahtlos aneinanderzuhängen. Nutze `.skip(page * page_size)` und `.take(page_size)`, um nur einen bestimmten Ausschnitt (eine Seite) der kombinierten Dateiliste zu erhalten.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere das Blättern.
*   **Hinweise**: Implementiere in `main` eine Schleife oder manuelle Abfragen für Seite 0 und Seite 1 mit einer festen Seitengröße und gib die Ergebnisse aus.

---

### 52. Messdaten-Abbruchbedingung

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Datenreihe.
*   **Hinweise**: Erstelle einen Vektor mit Zahlen, die Sensorwerte darstellen, bei dem ab einem gewissen Punkt kritische Werte (z.B. > 100) auftreten.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Brich die Iteration ab.
*   **Hinweise**: Wandle die Daten in einen Iterator um. Verwende `.take_while()`, um die Werte so lange zu verarbeiten, wie sie sich im normalen Bereich befinden. Sobald ein Wert das Kriterium verletzt, bricht der Iterator ab.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Überprüfe das Abbruchverhalten.
*   **Hinweise**: Jage die Liste in `main` durch den Iterator und gib die extrahierten Werte aus. Stelle sicher, dass nach dem ersten ungültigen Wert keine weiteren (auch wenn sie wieder gültig wären) verarbeitet werden.

---

### 53. Status-Check (All/Any)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Status-Objekte.
*   **Hinweise**: Erstelle eine Struktur `Connection` mit einem Boolean-Feld `is_active` und einem optionalen Fehlercode.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Überprüfe den Zustand aller Verbindungen.
*   **Hinweise**: Wandle eine Liste von Verbindungen in einen Iterator um. Verwende `.all()`, um zu prüfen, ob alle Verbindungen aktiv sind. Verwende `.any()`, um zu prüfen, ob mindestens eine Verbindung einen kritischen Fehlercode aufweist.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Werte die Verbindungen aus.
*   **Hinweise**: Erzeuge in `main` verschiedene Test-Szenarien (alle aktiv, eine inaktiv, eine mit Fehler) und gib die jeweiligen Testergebnisse aus.

---

### 54. Komplexer Maximum-Finder

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere eine Struktur für Produkte.
*   **Hinweise**: Erstelle ein Struct `Item` mit den Feldern `name`, `price` (f64) und `weight` (f64).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Finde das Element mit dem besten Preis-Leistungs-Verhältnis.
*   **Hinweise**: Nutze die Methode `.max_by()` oder `.max_by_key()`. Du übergibst eine Closure, die für jedes Item ein Verhältnis (z.B. Preis geteilt durch Gewicht) berechnet und diese miteinander vergleicht. Da Fließkommazahlen `f64` das Trait `Ord` nicht implementieren, musst du `.partial_cmp()` in der Closure verwenden.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zeige das Gewinner-Item.
*   **Hinweise**: Erstelle in `main` eine Einkaufsliste. Finde das beste Item und gib es aus.

---

### 55. Vektor-Flattener

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Erzeuge eine geschachtelte Struktur.
*   **Hinweise**: Erstelle einen Vektor von Vektoren (`Vec<Vec<i32>>`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Flache die Ebenen ab.
*   **Hinweise**: Wandle den geschachtelten Vektor in einen Iterator um. Rufe `.flatten()` auf, um die inneren Vektoren aufzulösen, und sammle alle Zahlen in einem einfachen Vektor.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Vergleiche vor und nach dem Flatten.
*   **Hinweise**: Gib in `main` beide Strukturen aus und demonstriere, wie aus dem verschachtelten Konstrukt eine flache Liste geworden ist.

---

### 56. Bedingtes Fold (Reduce)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Berechnungsdaten vor.
*   **Hinweise**: Erstelle einen Vektor von Zahlen, der auch leer sein kann.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Berechne das Produkt mit `reduce`.
*   **Hinweise**: Nutze `.reduce()`. Im Gegensatz zu `fold` benötigt `reduce` keinen expliziten Startwert, sondern nimmt das erste Element als Startwert. Es gibt ein `Option` zurück. Falls der Iterator leer ist, wird `None` geliefert.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Behandle beide Fälle.
*   **Hinweise**: Teste in `main` das Reduzieren mit einem vollen und einem leeren Vektor. Fange das `Option`-Ergebnis sauber ab.

---

### 57. String-Konkatenation ohne Alloc

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite eine Wortliste vor.
*   **Hinweise**: Erstelle ein Array oder einen Vektor von `&str`-Wörtern.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Baue den Zielstring effizient auf.
*   **Hinweise**: Nutze `.fold()`, um die Wörter mit einem Trennzeichen zu verbinden. Der Akkumulator sollte ein bereits allozierter `String` sein, an den du in jedem Schritt die Wörter und Trennzeichen anhängst. Vermeide es, in jedem Schritt neue Intermediär-Strings zu erzeugen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib den zusammengefügten String aus.
*   **Hinweise**: Setze in `main` eine Liste von Begriffen zu einem Satz zusammen und gib diesen aus.

---

### 58. Gleitende Fenster (Windows)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Kurswerte vor.
*   **Hinweise**: Erstelle eine Liste von Preisen (z.B. ein Vektor von `f64`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Vergleiche benachbarte Werte.
*   **Hinweise**: Rufe `.windows(2)` auf dem Vektor auf. Dies erzeugt einen Iterator über alle Paare aufeinanderfolgender Elemente. Verwende eine Kette (z.B. mit `.map()` oder `.filter()`), um zu ermitteln, ob der Kurs gestiegen oder gefallen ist.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib den Trend aus.
*   **Hinweise**: Analysiere eine Kursreihe in `main` und gib für jeden Schritt aus, ob sich der Kurs positiv oder negativ entwickelt hat.

---

### 59. Batch-Verarbeiter (Chunks)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Datensätze.
*   **Hinweise**: Erstelle eine größere Liste von Elementen (z.B. einen Vektor mit IDs).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Gruppiere die Datensätze.
*   **Hinweise**: Rufe `.chunks(size)` auf dem Vektor auf. Verarbeite die Gruppen in einer Kette (z.B. indem du jedes Chunk in ein anderes Format konvertierst oder eine simulierte Abfrage startest).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere die paketweise Verarbeitung.
*   **Hinweise**: Durchlaufe in `main` die Chunks (z.B. in 5er-Paketen) und gib jeweils aus, welche IDs gerade verarbeitet werden.

---

### 60. Ergebnis-Filterung (Ok-Werte extrahieren)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Erzeuge eine Liste von Resultaten.
*   **Hinweise**: Erstelle einen Vektor vom Typ `Vec<Result<i32, ParseIntError>>`, bei dem einige Werte `Ok` und andere `Err` sind (z.B. durch Parsen von Benutzereingaben).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Extrahiere nur die Erfolge.
*   **Hinweise**: Wandle den Vektor in einen Iterator um. Verwende `.filter_map(|res| res.ok())`. Die Methode `.ok()` wandelt ein `Result<T, E>` in ein `Option<T>` um, was `.filter_map` perfekt nutzen kann, um die Fehler zu verwerfen und die Erfolge zu extrahieren.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib die bereinigte Liste aus.
*   **Hinweise**: Führe das Filtern in `main` durch und gib die Liste der erfolgreich extrahierten Zahlen aus.
# Phase 8 - Prompts 61 bis 80: Kombinations-Projekte

### 61. Text-Balkendiagramm

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Eingabewerte vor.
*   **Hinweise**: Definiere eine Struktur `ChartValue` mit einem Namen (String) und einer Intensität (usize). Erstelle einen Vektor aus diesen Strukturen.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Transformiere Werte in Sternchenreihen.
*   **Hinweise**: Wandle den Vektor in einen Iterator um. Mappe jedes Element mit `.map()` in eine formatierte Zeile. Nutze den Iterator-Adapter `std::iter::repeat('*').take(wert).collect::<String>()`, um das Sternchen-Balkendiagramm dynamisch zu generieren.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib das Balkendiagramm aus.
*   **Hinweise**: Gib die erzeugten Zeilen in `main` aus, sodass auf der Konsole ein sauberes Balkendiagramm entsteht.

---

### 62. Umgebungsdaten-Parser (.env)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Inhalt der .env-Datei vor.
*   **Hinweise**: Verwende eine mehrzeilige Zeichenkette (`&str`), die Schlüssel-Wert-Paare (z.B. `PORT=8080`), Leerzeilen und Kommentare (beginnend mit `#`) enthält.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Parsen und Filtern der Zeilen.
*   **Hinweise**: Erstelle einen Iterator über die Zeilen. Filtere Leerzeilen und Kommentare mit `.filter()` aus. Verwende `.filter_map()`, um die verbleibenden Zeilen am `=` zu splitten und in ein Schlüssel-Wert-Tupel zu parsen. Sammele das Ergebnis in einer `HashMap`.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Lies die Konfiguration aus.
*   **Hinweise**: Gib in `main` die finale `HashMap` aus und greife gezielt auf einen Schlüssel zu.

---

### 63. Markdown-TOC-Builder

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite das Markdown-Dokument vor.
*   **Hinweise**: Erstelle eine Zeichenkette mit einem fiktiven Markdown-Text, der mehrere Überschriften (Zeilen, die mit `#`, `##` oder `###` beginnen) enthält.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Extrahiere die Überschriften und formatiere sie.
*   **Hinweise**: Iteriere über die Zeilen. Filtere Zeilen heraus, die mit `#` starten. Zähle die Anzahl der `#`, um die Einrückungstiefe zu bestimmen. Reinige den Text der Überschrift von den `#`-Zeichen und führenden Leerzeichen. Mappe dies in eine eingerückte Listen-Zeile (z.B. `- [Titel](#titel)`).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Generiere das Inhaltsverzeichnis.
*   **Hinweise**: Sammele die formatierten Zeilen in `main` und gib sie als Inhaltsverzeichnis (TOC) aus.

---

### 64. Zeilenumbruch-Formatierer

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Eingabedaten.
*   **Hinweise**: Du benötigst einen Text und eine maximale Zeilenbreite (z.B. 40 Zeichen).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Gruppiere Token mit `fold`.
*   **Hinweise**: Splitte den Text in Wörter. Verwende `.fold()`, um die Wörter zu Zeilen zusammenzufügen. Der Akkumulator speichert den bisherigen Text und die Länge der aktuellen Zeile. Füge ein Wort der aktuellen Zeile hinzu, wenn es passt, andernfalls füge einen Zeilenumbruch ein und beginne eine neue Zeile.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib den neu umgebrochenen Text aus.
*   **Hinweise**: Teste den Formatierer in `main` mit verschiedenen Zeilenbreiten und verifiziere, dass keine Zeile die Grenze überschreitet.

---

### 65. CSV-Spalten-Extraktor

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die CSV-Daten.
*   **Hinweise**: Verwende eine Zeichenkette mit mehreren CSV-Zeilen (z.B. Name, Alter, Stadt). Definiere die Indizes der Spalten, die du extrahieren möchtest (z.B. nur Spalte 0 und 2).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Extrahiere die gewünschten Spalten.
*   **Hinweise**: Iteriere über die Zeilen. Splitte jede Zeile am Komma. Verwende einen Iterator über die Felder, filtere nach den gewünschten Indizes (z.B. mit `.enumerate()` und `.filter()`), und füge die extrahierten Spalten wieder mit einem Komma zusammen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib die gefilterte CSV aus.
*   **Hinweise**: Jage die CSV-Zeilen durch deinen Extraktor und gib das Ergebnis aus.

---

### 66. Caesar-Verschlüsselung

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Text und den Schlüssel vor.
*   **Hinweise**: Du brauchst einen String (den Klartext) und eine Verschiebezahl (Schlüssel).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Verschiebe die Buchstaben funktional.
*   **Hinweise**: Wandle den String in einen Iterator über seine Zeichen (`chars()`) um. Verwende `.map()`. In der Closure fängst du den Schlüssel ein. Prüfe, ob es sich um einen Buchstaben handelt, verschiebe ihn im Alphabet (unter Beachtung des Überlaufs von Z nach A) und sammle alle modifizierten Zeichen wieder in einem `String`.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Verschlüssele und entschlüssele einen Text.
*   **Hinweise**: Verschlüssele in `main` eine Nachricht. Entschlüssele sie wieder, indem du die Verschiebung umkehrst, und gib beide Zwischenschritte aus.

---

### 67. Log-Analysator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Log-Einträge.
*   **Hinweise**: Erstelle ein Struct `LogEntry` mit Feldern wie `level` (Enum), `timestamp` (u64) und `response_time` (u32).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Filtere und berechne Durchschnittswerte.
*   **Hinweise**: Erstelle einen Iterator aus einer Liste von Log-Einträgen. Filtere mit `.filter()` nach Einträgen mit Level `Error`. Extrahiere mit `.map()` die Antwortzeiten. Verwende `.fold()` oder `.sum()`, um die Gesamtlaufzeit und die Anzahl der Fehler-Einträge zu berechnen, und teile sie für den Durchschnitt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib die Analyse aus.
*   **Hinweise**: Erzeuge in `main` eine Liste von Logs. Berechne die durchschnittliche Antwortzeit bei Fehlern und gib das Ergebnis aus.

---

### 68. Passwort-Validator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Kriterien.
*   **Hinweise**: Das Passwort ist ein String. Die Regeln umfassen: Mindestlänge, enthält Großbuchstaben, Kleinbuchstaben, Ziffern und Sonderzeichen.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Validiere alle Kriterien funktional.
*   **Hinweise**: Nutze Iterator-Methoden auf den Zeichen des Passworts. Prüfe z.B. mit `chars().any(|c| c.is_ascii_uppercase())`, ob Großbuchstaben vorhanden sind. Kombiniere diese Prüfungen (z.B. in einem Vektor von Validierungs-Closures), um das Passwort auf alle Kriterien zu prüfen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste verschiedene Passwörter.
*   **Hinweise**: Prüfe in `main` schwache und starke Passwörter und gib eine detaillierte Liste der verletzten Regeln aus.

---

### 69. Matrix-Transposition

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Matrix vor.
*   **Hinweise**: Definiere eine Matrix als zweidimensionalen Vektor (`Vec<Vec<i32>>`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Vertausche Zeilen und Spalten funktional.
*   **Hinweise**: Ermittle die Spaltenanzahl. Erstelle einen Bereichs-Iterator von 0 bis Spaltenanzahl. Verwende `.map()`. Für jeden Spaltenindex iterierst du über die Zeilen der Matrix und sammelst die Elemente an diesem Spaltenindex in einen neuen Vektor. Sammele alle Spalten-Vektoren in einen Gesamtvektor.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zeige die transponierte Matrix.
*   **Hinweise**: Gib in `main` die ursprüngliche und die transponierte Matrix Zeile für Zeile aus.

---

### 70. Spielkartendeck-Ersteller

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Eigenschaften einer Spielkarte.
*   **Hinweise**: Erstelle ein Enum `Suit` (Kreuz, Pik, Herz, Karo) und ein Enum `Value` (7, 8, 9, 10, Bube, Dame, König, Ass). Erstelle eine Struktur `Card` mit beiden Enums.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Generiere alle Kombinationen.
*   **Hinweise**: Erstelle Arrays oder Iteratoren über alle Farb-Varianten und alle Wert-Varianten. Verwende `.flat_map()`, um jedes Element der einen Liste mit jedem Element der anderen Liste zu kreuzen und neue `Card`-Objekte zu erzeugen. Sammele das Ergebnis in einem Vektor.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib das Kartendeck aus.
*   **Hinweise**: Zeige in `main`, dass exakt 52 (oder 32) einzigartige Karten generiert wurden, und gib das gesamte Deck aus.

---

### 71. Run-Length-Encoder (RLE)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Eingabestring vor.
*   **Hinweise**: Verwende eine Zeichenkette, die sich wiederholende Zeichen enthält (z.B. `AAABCCDDDD`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Komprimiere die Zeichenkette mit `fold`.
*   **Hinweise**: Iteriere über die Zeichen. Nutze `.fold()`, um eine Liste von Tupeln `Vec<(usize, char)>` aufzubauen. Prüfe im Akkumulator, ob das aktuelle Zeichen dem des letzten Tupels entspricht. Wenn ja, inkrementiere die Anzahl. Wenn nein, füge ein neues Tupel `(1, zeichen)` hinzu.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zeige das Kompressionsergebnis.
*   **Hinweise**: Wandle das Ergebnis in einen lesbaren String um (z.B. `3A1B2C4D`) und gib das Ergebnis sowie die Ersparnis in Prozent aus.

---

### 72. Subnetz-IP-Generator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die CIDR-Notation.
*   **Hinweise**: Erstelle ein Struct `IpSubnet` mit der Basis-IP (z.B. `192.168.1.0`) und der Subnetzmaske (z.B. `24`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere einen Iterator über alle IPs im Subnetz.
*   **Hinweise**: Konvertiere die Basis-IP in eine 32-Bit-Zahl (`u32`). Berechne die Anzahl der verfügbaren IP-Adressen anhand der Subnetzmaske (z.B. `2^(32 - mask)`). Implementiere einen Iterator, der ausgehend von der Basis-IP hochzählt und die Zahlen wieder in das IP-Format (`x.x.x.x`) umwandelt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Generiere IPs aus einem Subnetz.
*   **Hinweise**: Erstelle in `main` ein Subnetz und gib die ersten 10 verfügbaren IP-Adressen sowie die Gesamtzahl aus.

---

### 73. Pfad-Normalisierer

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite die Pfadsegmente vor.
*   **Hinweise**: Verwende einen String, der einen relativen Pfad mit Segmenten wie `.` und `..` enthält (z.B. `a/b/../c/./d`).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Bereinige den Pfad funktional.
*   **Hinweise**: Splitte den Pfad am `/`-Zeichen. Verwende `.fold()`, um einen neuen Vektor von Segmenten aufzubauen. Wenn ein Segment `.` ist, ignoriere es. Wenn es `..` ist, entferne das letzte Element aus dem Akkumulator. Bei normalen Namen hänge sie an.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib den normalisierten Pfad aus.
*   **Hinweise**: Führe die Normalisierung in `main` aus und verknüpfe die verbleibenden Segmente wieder zu einem sauberen Pfad-String.

---

### 74. Anagramm-Prüfer

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Vergleich vor.
*   **Hinweise**: Verwende zwei Strings, die auf die Anagramm-Eigenschaft geprüft werden sollen.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Sortiere die Zeichen.
*   **Hinweise**: Schreibe eine Hilfsfunktion, die einen String in einen Iterator seiner Zeichen umwandelt, diese in Kleinbuchstaben konvertiert, in einen Vektor sammelt, sortiert und wieder als String zusammenfügt. Vergleiche die bereinigten Strings der beiden Wörter auf Gleichheit.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste positive und negative Beispiele.
*   **Hinweise**: Prüfe in `main` Wortpaare wie "Ampel" und "Palme" (Anagramm) sowie "Test" und "Toast" (kein Anagramm) und gib das Ergebnis aus.

---

### 75. SQL-Select-Builder

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Query-Bausteine.
*   **Hinweise**: Erstelle eine Struktur `SelectQuery` mit Feldern wie `columns` (Vec), `table` (String) und `conditions` (Vec).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Baue das Statement funktional zusammen.
*   **Hinweise**: Verwende Iteratoren, um die Spalten mit Kommata zu verbinden. Verwende ebenfalls einen Iterator, um die Bedingungen mit ` AND ` zu verknüpfen. Baue das finale SQL-Statement über String-Verkettungen zusammen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Erzeuge eine SQL-Abfrage.
*   **Hinweise**: Definiere in `main` eine Abfrage, generiere das SQL-Statement und gib es aus.

---

### 76. Messwert-Glättung

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Datenreihe.
*   **Hinweise**: Erstelle einen Vektor mit verrauschten Zahlenwerten.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Berechne das gleitende Mittel.
*   **Hinweise**: Verwende `.windows(3)`, um jeweils ein Element und seine beiden Nachbarn zu betrachten. Berechne in einem `.map()` den Durchschnitt dieser drei Werte, um das Rauschen zu reduzieren.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Vergleiche Rohdaten und geglättete Daten.
*   **Hinweise**: Gib in `main` beide Datenreihen aus und vergleiche die Kurvenverläufe.

---

### 77. HTML-Tag-Entferner

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den HTML-String vor.
*   **Hinweise**: Verwende einen String, der Text und HTML-Tags (z.B. `<p>`, `</p>`) enthält.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Filtere den Text über einen Zustand mit `scan`.
*   **Hinweise**: Iteriere über die Zeichen. Verwende `.scan()`, um den Zustand `in_tag` (bool) mitzuführen. Schalte `in_tag` auf `true`, wenn ein `<` auftaucht, und auf `false` nach einem `>`. Filtere alle Zeichen aus, die sich innerhalb eines Tags befinden, und sammle den Rest.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zeige den bereinigten Text.
*   **Hinweise**: Jage einen HTML-Text in `main` durch deinen Entferner und gib den reinen Text aus.

---

### 78. Template-Engine

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere den Vorlagentext und die Ersetzungen.
*   **Hinweise**: Verwende einen String mit Platzhaltern (z.B. `Hallo {{name}}`) und eine `HashMap`, die den Platzhaltern Werte zuordnet.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Ersetze Platzhalter funktional.
*   **Hinweise**: Splitte den Text so auf, dass Platzhalter isoliert werden (oder nutze einfache String-Ersetzungen). Versuche, den Text in Segmente zu zerlegen, diese mit einem Iterator zu durchlaufen und gefundene Platzhalter über die `HashMap` zu übersetzen, bevor du sie wieder zusammensetzt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Generiere eine E-Mail oder Nachricht.
*   **Hinweise**: Befülle in `main` ein Template mit dynamischen Daten aus der Map und gib das Ergebnis aus.

---

### 79. Rechnungs-Kalkulator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Rechnungsposten.
*   **Hinweise**: Erstelle ein Struct `InvoiceItem` mit den Feldern `name`, `price`, `quantity` und `tax_rate` (z.B. 0.19 für 19%).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Berechne den Endpreis funktional.
*   **Hinweise**: Erstelle einen Iterator über die Posten. Berechne für jeden Posten den Zwischenpreis (Preis * Menge), addiere die Steuer und ziehe eventuelle Rabatte ab. Summiere die Endpreise aller Posten mit `.sum()`.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Gib eine detaillierte Rechnungssumme aus.
*   **Hinweise**: Erzeuge in `main` eine Liste von Artikeln, berechne die Gesamtsumme und gib sie aus.

---

### 80. Bibliotheks-Katalog-Suche

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere das Buch.
*   **Hinweise**: Erstelle ein Struct `Book` mit Feldern wie `title`, `author` und `tags` (Vec).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Suche mit mehreren Begriffen.
*   **Hinweise**: Schreibe eine Suchfunktion, die eine Liste von Büchern und eine Liste von Suchbegriffen entgegennimmt. Ein Buch erfüllt die Suche, wenn alle Suchbegriffe mit `.all()` im Titel, Autor oder in den Tags gefunden werden.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Führe eine komplexe Suche aus.
*   **Hinweise**: Erstelle in `main` einen kleinen Bibliothekskatalog. Suche nach Büchern mit bestimmten Schlagworten und gib die Treffer aus.
# Phase 8 - Prompts 81 bis 100: Fortgeschrittene Algorithmen & FP-Muster

### 81. Unendlicher Primzahlgenerator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Entwirf die Datenstrukturen für eine verzögerte Primzahlerzeugung.
*   **Hinweise**: Definiere eine Struktur `InfinitePrimes`. Überlege, welche Daten (z.B. die zuletzt gefundene Primzahl oder ein Vektor aller bisherigen Primzahlen) du im Zustand halten musst, um die Generierung fortsetzen zu können.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die träge Primzahlberechnung im `next()`-Aufruf.
*   **Hinweise**: Implementiere `Iterator` für `InfinitePrimes`. Berechne in `next()` die jeweils nächste Primzahl erst in dem Moment, in dem die Methode aufgerufen wird. Nutze eine effiziente Primzahlprüfung (z.B. Testen durch Teilen mit den bereits gefundenen Primzahlen). Da Primzahlen unendlich sind, gibt die Methode immer `Some(u64)` zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Generiere Primzahlen nach Bedarf.
*   **Hinweise**: Erzeuge den Generator in `main`. Nutze `.take(15)` oder filtere Primzahlen in einem bestimmten Zahlenbereich heraus, um zu zeigen, dass Berechnungen nur für die tatsächlich abgerufenen Zahlen stattfinden.

---

### 82. Fehler-Verkettung mit Monaden-Mustern

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Datenmodelle der verschachtelten API-Antworten.
*   **Hinweise**: Erstelle Strukturen wie `User`, `Profile` und `Settings`. Verwende `Option` und `Result` für Felder, die fehlen oder Fehler enthalten können.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Verkette die Abfragen monadisch.
*   **Hinweise**: Schreibe eine Kette, die ausgehend von einer Benutzer-ID die Einstellungen abfragt. Verwende Methoden wie `.and_then()`, um verschachtelte `Option`-Werte aufzulösen (z.B. erst User laden, dann dessen Profil laden, dann dessen Einstellungen extrahieren). Nutze `.map_or()` oder `.or_else()`, um Standardwerte oder alternative Fehlerbehandlungen bereitzustellen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste die Verkettung mit verschiedenen Datenkonstellationen.
*   **Hinweise**: Simuliere in `main` unvollständige Daten und stelle sicher, dass die Pipeline nicht abstürzt, sondern elegant mit `None` oder Fehlern umgeht.

---

### 83. Einfacher Parser-Kombinator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere den Typ des Parsers.
*   **Hinweise**: Definiere einen Parser als Closure oder Alias-Typ: `Parser<T> = Box<dyn Fn(&str) -> Option<(T, &str)>>`. Ein Parser nimmt einen String-Slice und gibt bei Erfolg den geparsten Wert und den verbleibenden String-Slice zurück.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere Kombinatoren.
*   **Hinweise**: Schreibe Funktionen, die Parser miteinander verbinden. Beispielsweise einen `and_then`-Kombinator, der zwei Parser nacheinander ausführt, oder einen `or_else`-Kombinator, der den zweiten Parser probiert, falls der erste fehlschlägt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Parser für eine einfache Grammatik.
*   **Hinweise**: Baue in `main` einen Parser für eine Zahl gefolgt von einem Buchstaben auf und teste ihn mit verschiedenen Eingabestrings.

---

### 84. Echtzeit-Stream-Aggregator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere den Aggregator-Zustand.
*   **Hinweise**: Erstelle ein Struct `TopKStream<I>` um einen unendlichen Datenstrom-Iterator `I`. Du benötigst eine geeignete Datenstruktur (z.B. einen `std::collections::BinaryHeap` als Min-Heap), um die Top-K-Elemente effizient zu verwalten.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Aggriere Elemente bei jedem Iterationsschritt.
*   **Hinweise**: In `next()` des Aggregators holst du das nächste Element aus dem Stream. Füge es in den Heap ein und entferne das kleinste Element, falls der Heap die Größe K überschreitet. Gib das aktuelle Top-K-Ergebnis als Vektor zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Analysiere einen Live-Datenstrom.
*   **Hinweise**: Erzeuge in `main` einen unendlichen Strom von Zahlen. Lass den Aggregator laufen und gib in regelmäßigen Abständen die aktuellen Top-5-Werte aus.

---

### 85. Lazy JSON-Pfad-Evaluator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die JSON-Baumstruktur.
*   **Hinweise**: Erstelle ein Enum `JsonNode` mit Varianten wie `Value(String)`, `Map(HashMap<String, JsonNode>)` und `Array(Vec<JsonNode>)`.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die träge Pfadevaluierung.
*   **Hinweise**: Schreibe eine Struktur `PathEvaluator`, die eine Referenz auf einen `JsonNode` und eine Liste von Suchsegmenten hält. Der Iterator über den `PathEvaluator` soll den Baum erst bei Aufruf von `next()` durchsuchen. Der Pfad wird somit nur so weit evaluiert, wie Werte angefordert werden.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Suche in einem komplexen Dokument.
*   **Hinweise**: Erzeuge in `main` eine tiefe Baumstruktur und frage Pfade ab. Zeige das lazy Verhalten, indem du den Zugriff protokollierst.

---

### 86. N-Damen-Problem als Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere das Schachbrett.
*   **Hinweise**: Erstelle ein Struct `QueensSolver`, das die aktuelle Damen-Konfiguration (z.B. als `Vec<usize>`, wobei der Index die Zeile und der Wert die Spalte darstellt) und die Brettgröße `N` speichert.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere Backtracking im Iterator-Trait.
*   **Hinweise**: Jedes Mal, wenn `next()` aufgerufen wird, soll das Backtracking fortgesetzt werden, um die nächste gültige Positionierung aller N Damen zu finden, bei der sich keine zwei Damen gegenseitig schlagen. Wenn eine gültige Konfiguration gefunden wurde, gib sie als `Some` zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Finde alle Lösungen für ein 8x8-Brett.
*   **Hinweise**: Erstelle in `main` den Solver für N=8. Iteriere über alle Lösungen und gib die Gesamtanzahl sowie einige Bretter als Textdiagramm aus.

---

### 87. State-Monaden-Simulator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere das State-Monaden-Konzept.
*   **Hinweise**: Ein Zustandstransformator kann als Struktur `State<'a, S, A>` definiert werden, die eine Box mit einer Closure `Fn(S) -> (A, S)` enthält. `S` ist der Zustand, `A` der berechnete Wert.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere Transformationen.
*   **Hinweise**: Implementiere Methoden wie `map` und `and_then` auf `State`. `and_then` nimmt eine Closure entgegen, die aus dem Ergebnis `A` einen neuen `State` erzeugt. Dadurch lassen sich Zustandsänderungen sequenziell aneinanderhängen, ohne den Zustand explizit in jedem Schritt übergeben zu müssen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere einen Spielzustand.
*   **Hinweise**: Erstelle in `main` eine Kette von Zustandsübergängen (z.B. Lebenspunkte abziehen, Gold hinzufügen) und führe sie mit einem Startzustand aus.

---

### 88. Custom Zip-With-Adapter

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere den Adapter-Typ.
*   **Hinweise**: Erstelle ein Struct `ZipWith<I1, I2, F>` mit Feldern für zwei Iteratoren `I1` und `I2` sowie eine Kombinations-Closure `F`.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere das Trait `Iterator`.
*   **Hinweise**: Implementiere `next()` für `ZipWith`. Hole das nächste Element aus `I1` und `I2`. Wenn eines der beiden `None` liefert, gib `None` zurück. Andernfalls wende die Closure `F` auf beide Elemente an und gib das Ergebnis zurück.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Kombiniere Zahlenreihen.
*   **Hinweise**: Erstelle zwei Vektoren in `main` und nutze `zip_with` mit einer Additions- oder Multiplikations-Closure, um die Elemente paarweise zu verrechnen.

---

### 89. Binärbaum-Traversierer

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere den Binärbaum.
*   **Hinweise**: Erstelle ein Struct `TreeNode<T>` mit `value` und optionalen linken und rechten Kindern `Option<Box<TreeNode<T>>>`.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere Traversierung ohne vollständige Vektorkopie.
*   **Hinweise**: Erstelle einen Iterator `TreeIterator` mit einem Stack von Referenzen auf die Knoten. Je nachdem, ob Pre-Order, In-Order oder Post-Order gewählt ist, lege die Knoten in der richtigen Reihenfolge auf den Stack und entnimm sie in `next()` Stück für Stück (lazy).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Traversiere einen Testbaum.
*   **Hinweise**: Baue in `main` einen kleinen Binärbaum auf und gib seine Elemente über die Iterator-Traversierung aus.

---

### 90. Collatz-Folgen-Iterator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Collatz-Struktur.
*   **Hinweise**: Erstelle ein Struct `Collatz` mit einem Feld für den aktuellen Wert.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Berechne die Collatz-Folge in `next()`.
*   **Hinweise**: In `next()` wird der aktuelle Wert nach den Collatz-Regeln angepasst: Wenn er gerade ist, teile ihn durch 2, wenn er ungerade ist, multipliziere ihn mit 3 und addiere 1. Wenn der Wert 1 erreicht und bereits ausgegeben wurde, endet der Iterator (`None`).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Analysiere Collatz-Folgen.
*   **Hinweise**: Nutze den Iterator in `main` für alle Zahlen bis 1000. Finde über Iterator-Ketten heraus, welche Startzahl die längste Collatz-Folge generiert.

---

### 91. Curried Logger

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite das funktionale Logging vor.
*   **Hinweise**: Es sind keine komplexen Datenstrukturen erforderlich. Du erstellst geschachtelte Closures zur Konfiguration des Loggers.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Currying-Hierarchie.
*   **Hinweise**: Schreibe eine Funktion `curried_log`. Sie nimmt ein `LogLevel` und gibt eine Closure zurück. Diese Closure nimmt ein Modul (`&str`) und gibt eine weitere Closure zurück. Diese letzte Closure nimmt die eigentliche Nachricht (`&str`) entgegen und führt das Logging aus. Nutze `move`, um die Werte in die inneren Closures zu übertragen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Erstelle spezialisierte Logger.
*   **Hinweise**: Erzeuge in `main` einen `info_logger` und daraus einen `database_info_logger`. Protokolliere Nachrichten und zeige die Flexibilität auf.

---

### 92. Funktionale Funktionskomposition

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Verstehe die Komposition.
*   **Hinweise**: Du benötigst eine generische Funktion, die zwei Closures (Funktionen) entgegennimmt und eine neue Closure zurückgibt, die beide nacheinander ausführt.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Kompositionsfunktion.
*   **Hinweise**: Schreibe eine Funktion `compose<A, B, C, F, G>(f: F, g: G) -> impl Fn(A) -> C`, wobei `F: Fn(A) -> B` und `G: Fn(B) -> C` sind. Die zurückgegebene Closure soll `g(f(x))` berechnen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Kombiniere mathematische und Text-Transformationen.
*   **Hinweise**: Komponiere in `main` eine Funktion, die eine Zahl verdoppelt und das Ergebnis in einen String umwandelt. Wende sie an.

---

### 93. Lazy Matrix-Transposition (Zero-Copy)

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Matrix-Struktur.
*   **Hinweise**: Erstelle ein Struct `LazyMatrix<T>` mit einem eindimensionalen Vektor `data` und den Dimensionen `rows` und `cols`.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Implementiere die Transposition ohne Kopiervorgang.
*   **Hinweise**: Schreibe eine Methode `transpose(&self)` die eine Struktur `TransposedMatrix<'a, T>` zurückgibt. Der Iterator über diese transponierte Struktur greift über angepasste Index-Berechnungen (`(col * rows) + row` statt `(row * cols) + col`) auf die Originaldaten zu, ohne die Matrix im Speicher zu drehen.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Traversiere die transponierte Matrix.
*   **Hinweise**: Erstelle eine 3x4-Matrix in `main`, transponiere sie virtuell und gib die transponierten Werte aus.

---

### 94. Ressourceneffizienter Stream-Join

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere den Merge-Iterator.
*   **Hinweise**: Erstelle ein Struct `SortedMerge<I1, I2>` mit zwei sortierten Iteratoren `I1` und `I2`. Du benötigst zwei Puffer (`Option<I1::Item>` und `Option<I2::Item>`), um das jeweils aktuelle Element der Ströme zwischenzuspeichern (Peeking).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Führe die Ströme in O(N) zusammen.
*   **Hinweise**: Vergleiche in `next()` die aktuellen Elemente der beiden Puffer. Gib das kleinere Element zurück und lade aus dem entsprechenden Iterator nach. Wenn ein Iterator leer ist, leere den anderen. Dadurch werden die Ströme in einem einzigen Durchlauf sortiert zusammengeführt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Führe zwei sortierte Listen zusammen.
*   **Hinweise**: Erstelle in `main` zwei sortierte Vektoren und merge sie mit deinem `SortedMerge`-Iterator zu einem einzigen sortierten Datenstrom.

---

### 95. Partielle Applikation

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Verstehe die partielle Applikation.
*   **Hinweise**: Partielle Applikation fixiert eine Reihe von Argumenten einer Funktion und gibt eine neue Funktion mit den restlichen Argumenten zurück.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Fixiere Argumente mit Closures.
*   **Hinweise**: Schreibe eine Funktion, die eine Funktion mit drei Argumenten (z.B. `f(x, y, z)`) und einen Wert für `x` entgegennimmt und eine Closure zurückgibt, die nur noch `y` und `z` erwartet. Wähle die passenden Trait-Bounds.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Erzeuge spezialisierte mathematische Funktionen.
*   **Hinweise**: Fixiere in `main` den Zinssatz einer Zinseszinsberechnung und berechne Zinsen für unterschiedliche Laufzeiten und Anlagebeträge.

---

### 96. Lazy Stream-Chiffre

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Bereite den Schlüsselstrom vor.
*   **Hinweise**: Du benötigst einen Iterator für die zu verschlüsselnden Bytes (z.B. aus einer Datei) und einen Iterator für den Schlüsselstrom (Keystream, z.B. ein deterministischer Zufallszahlengenerator).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Verschlüssele Byte für Byte im Durchfluss.
*   **Hinweise**: Erstelle einen Iterator `CipherStream<I, K>` um den Datenstrom `I` und den Keystream `K`. Verknüpfe beide in `next()`, indem du das Datenbyte und das Schlüsselbyte mittels XOR (`^`) verknüpfst. Die Verschlüsselung findet lazy während der Iteration statt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Ver- und entschlüssele eine Nachricht.
*   **Hinweise**: Verschlüssele in `main` einen String in ein Byte-Array und entschlüssele dieses wieder mit demselben Keystream.

---

### 97. Funktionale Runden-Simulation

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere den Spielzustand.
*   **Hinweise**: Erstelle ein Struct `GameState` mit Feldern wie `round` (u32), `player_health` (i32) und `enemy_health` (i32).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Schreibe den Rundenübergang als Transformation.
*   **Hinweise**: Erstelle eine Funktion `next_round`, die einen `GameState` nimmt und den Zustand für die nächste Runde berechnet (z.B. Schaden abziehen). Implementiere einen Iterator `GameSimulation`, der unendlich fortlaufende `GameState` liefert, indem er die Transformation in jedem `next()`-Aufruf auf den vorherigen Zustand anwendet.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Simuliere ein Spiel bis zum Ende.
*   **Hinweise**: Nutze die Iterator-Kette in `main` und breche die Simulation mit `.take_while()` ab, sobald einer der Spieler keine Lebenspunkte mehr hat. Gib den Verlauf aus.

---

### 98. Fehlertoleranter Flatten-Adapter

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere den Fehlerfall.
*   **Hinweise**: Du arbeitest mit verschachtelten Collections, bei denen der äußere oder die inneren Iteratoren Fehler (`Result`) liefern können.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Flatten mit sofortigem Abbruch bei Fehlern.
*   **Hinweise**: Schreibe einen Iterator-Adapter `TryFlatten<I>`. Wenn in `next()` ein `Err` im äußeren Iterator oder in einem der inneren Elemente auftritt, soll der Iterator sofort abbrechen und fortan nur noch `None` (oder den Fehler als letzten Wert) liefern.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste das Abbruchverhalten.
*   **Hinweise**: Übergib in `main` eine Liste von Listen, in der ein Fehler versteckt ist. Verifiziere, dass nach dem Auftreten des Fehlers keine weiteren Elemente mehr verarbeitet werden.

---

### 99. Lazy-Regex-Matcher

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere einfache Regex-Token.
*   **Hinweise**: Erstelle ein Enum `RegexToken` mit Varianten wie `Char(char)`, `Wildcard` (Punkt) und `Optional(char)`.

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Validiere Muster lazy.
*   **Hinweise**: Erstelle eine Struktur `RegexMatcher` mit einer Liste von Tokens. Der Iterator über diese Struktur soll einen String-Slice Zeichen für Zeichen prüfen. Der Abgleich soll Schritt für Schritt über verknüpfte Iterator-Adapter erfolgen und sofort abbrechen, sobald ein Token nicht passt.

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Teste das Pattern-Matching.
*   **Hinweise**: Prüfe in `main` verschiedene Wörter gegen einfache Muster (z.B. `a.b` oder `a?bc`) und gib aus, ob sie matchen.

---

### 100. Map-Reduce-Simulator

**Modul 1: Basis-Datenstrukturen**
*   **Ziel**: Definiere die Daten und Partitionen.
*   **Hinweise**: Erstelle eine Liste von Rohdaten (z.B. Texte).

**Modul 2: Implementierung & Methoden**
*   **Ziel**: Simuliere Map und Reduce über Iteratoren.
*   **Hinweise**: Wandle die Rohdaten in einen Iterator um. Verwende `.map()`, um eine Transformations-Closure anzuwenden, die beispielsweise Wörter zählt oder filtert (Map-Phase). Verwende anschließend `.fold()` oder `.reduce()`, um die transformierten Daten zu einem Endergebnis zu aggregieren (Reduce-Phase).

**Modul 3: Vollendung & Hauptprogramm**
*   **Ziel**: Zähle Wörter über mehrere Zeilen.
*   **Hinweise**: Verarbeite in `main` eine Liste von Sätzen. Verwende den Map-Reduce-Simulator, um die Häufigkeit bestimmter Wörter über alle Sätze hinweg zu zählen und auszugeben.
