# Phase 5: Projektvorschläge zu Generics, Traits & Lifetimes

In dieser Phase führst du die drei mächtigsten Konzepte von Rust zusammen: **Generics** (generische Typen), **Traits** (Schnittstellen) und **Lifetimes** (Lebensdauern). Diese Werkzeuge ermöglichen es dir, extrem flexiblen, wiederverwendbaren und gleichzeitig sicheren Code zu schreiben, ohne Laufzeit-Einbußen (Zero-Cost Abstractions) in Kauf nehmen zu müssen.

Die folgenden 10 didaktisch aufbereiteten Projektvorschläge fordern dich heraus, diese Konzepte in Kombination anzuwenden. Sie sind bewusst so gestaltet, dass du die Architektur selbst entwirfst. Es werden keine fertigen Codelösungen vorgegeben – stattdessen erhältst du klare Strukturierungs- und Denkansätze.

---

## 🗃️ Projekt 1: Der In-Memory "Zero-Copy" Cache

### 1. Beschreibung der Funktionsweise
Ein Zwischenspeicher (Cache), der Daten vorübergehend im Hauptspeicher vorhält, um wiederholte langsame Zugriffe zu vermeiden. Um Speicherplatz und CPU-Zyklen für das Kopieren zu sparen, soll dieser Cache "Zero-Copy" arbeiten. Das bedeutet, dass er keine Kopien der Schlüssel und Werte speichert, sondern direkt mit Referenzen auf bereits existierende Daten arbeitet. Der Cache soll abgelaufene Einträge anhand eines Kriteriums (z. B. eines Zeitstempels oder einer Gültigkeitsdauer) identifizieren und entfernen können.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Cache<'a, K, V>`: Das zentrale Cache-Struct. Die Lifetime `'a` stellt sicher, dass die im Cache gespeicherten Referenzen nicht länger leben als die Daten im umgebenden Scope. `K` (Schlüssel) und `V` (Wert) sind generische Parameter.
*   `Trait Cacheable`: Definiert das Verhalten für Werte, die im Cache abgelegt werden dürfen. Es verlangt z. B. eine Methode `is_expired(&self) -> bool` oder `size_bytes(&self) -> usize`.
*   **Trait-Bounds**: Die HashMap im Inneren des Caches erfordert Trait-Bounds auf den Schlüssel-Typen: `K: Eq + std::hash::Hash`. Zudem muss der Wert-Typ die Bedingung `V: Cacheable` erfüllen.
*   **Modulstruktur**:
    *   `cache.rs`: Enthält die definition und die Methoden des `Cache`-Structs.
    *   `traits.rs`: Definiert den `Cacheable`-Trait.
    *   `main.rs`: Demonstriert die Nutzung des Caches mit verschiedenen Typen und zeigt, wie der Compiler ungültige Speicherzugriffe verhindert.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig. Die Standardbibliothek (`std::collections::HashMap`, `std::time::Instant`) reicht vollständig aus.

### 4. Didaktische Hinweise
*   **Hürde**: Der Borrow Checker wird hier streng aufpassen. Wenn du eine Referenz in den Cache legst, gehört der referenzierte Wert nicht dem Cache. Du musst mit der Lifetime `'a` garantieren, dass das ursprüngliche Objekt existiert, solange der Cache darauf zugreifen möchte.
*   **Achtung**: Überlege dir gut, ob der Schlüssel (`K`) im Cache als Kopie, als eigener Typ oder ebenfalls als Referenz vorliegen soll (z. B. `HashMap<&'a K, &'a V>`). Das verändert die Flexibilität deines Caches enorm.

### 5. Optionale Zusatz-Herausforderung
Implementiere eine automatische Bereinigungsstrategie (Eviction Policy) wie LRU (Least Recently Used). Definiere dafür ein generisches Trait `EvictionPolicy<'a, K, V>` und baue den Cache so um, dass er bei Erreichen einer Kapazitätsgrenze das älteste Element verwirft.

---

## 📑 Projekt 2: Der flexible Log-Pipeline-Prozessor

### 1. Beschreibung der Funktionsweise
Dieses Tool dient der Verarbeitung von Log-Einträgen aus unterschiedlichen Quellen (z. B. Log-Dateien auf der Festplatte, direkte Konsoleneingaben oder Speicher-Arrays). Die Pipeline liest Logs ein, filtert sie nach bestimmten Kriterien, extrahiert relevante Daten (wie Zeitstempel, Log-Level und Nachricht) und gibt sie formatiert aus. Um maximale Performance zu erzielen, verweisen alle extrahierten Textteile direkt auf die Originalquelle, ohne neuen Speicher für Strings zu reservieren.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct LogEntry<'a>`: Repräsentiert die strukturierten Daten einer Log-Zeile. Die Felder für Log-Level und Nachricht sind String-Slices (`&'a str`), die direkt auf die ursprüngliche Log-Zeile verweisen.
*   `Trait LogReader<'a>`: Schnittstelle für beliebige Datenquellen. Es definiert eine Methode, die das nächste Log als String-Slice liefert. Die Lifetime `'a` stellt sicher, dass der gelesene Slice an das Quellobjekt gebunden ist.
*   `Struct LogPipeline<'a, R>`: Die generische Pipeline, die eine Quelle vom Typ `R` liest. Trait-Bound: `R: LogReader<'a>`.
*   **Modulstruktur**:
    *   `reader.rs`: Implementiert den `LogReader` für verschiedene Quellen (z. B. Datei-Reader oder Speicher-Slice-Reader).
    *   `parser.rs`: Beinhaltet die Logik zur Zerlegung des Log-Strings in ein `LogEntry`.
    *   `pipeline.rs`: Steuert den Fluss der Daten von der Quelle bis zur Ausgabe.

### 3. Zu verwendende Crates
*   Keine externen Crates zwingend notwendig.
*   *Optional*: `regex` (falls du reguläre Ausdrücke zur Analyse der Log-Muster nutzen willst).

### 4. Didaktische Hinweise
*   **Hürde**: Die Lifetime `'a` zieht sich von der Quelle über den `LogReader` bis in die Struktur `LogEntry`. Wenn die Quelle (z. B. eine lokale Variable in einer Funktion) zerstört wird, darf auch kein `LogEntry` mehr existieren.
*   **Achtung**: Du wirst hier lernen, warum du Log-Zeilen nicht in einer temporären Schleifenvariable zwischenspeichern und gleichzeitig als Referenz herausgeben kannst. Die Daten müssen eine ausreichend lange Lebensdauer besitzen.

### 5. Optionale Zusatz-Herausforderung
Implementiere ein Trait `LogFilter` mit einer generischen Methode `filter<'a>(&self, entry: &LogEntry<'a>) -> bool`. Schreibe Filter, die sich per Generic oder Dynamic Dispatch kombinieren lassen (z. B. ein Filter, der nur Fehler-Logs zulässt, die ein bestimmtes Wort enthalten).

---

## ⚔️ Projekt 3: Rundenbasiertes Arena-Kampfsystem

### 1. Beschreibung der Funktionsweise
Ein Simulator für rundenbasierte Kämpfe in einem Rollenspiel. Unterschiedliche Charaktere (Helden, Monster, Bosse) treten in einer Arena gegeneinander an. Das System verwaltet Attribute (Lebenspunkte, Stärke, Initiative) und berechnet Angriffe sowie Statuseffekte (z. B. Verbrennung, Gift), die über mehrere Runden aktiv sind. Statuseffekte können sich auf die Eigenschaften des Verursachers beziehen und nutzen daher Referenzen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait Combatant`: Schnittstelle, die alle Kämpfer implementieren müssen. Sie enthält Methoden wie `attack(&self) -> u32`, `take_damage(&mut self, amount: u32)` und `tick_status_effects(&mut self)`.
*   `Struct StatusEffect<'a>`: Repräsentiert einen aktiven Effekt. Er hält eine Referenz mit der Lifetime `'a` auf den Charakter, der den Effekt verursacht hat, um z. B. Schadensboni dynamisch zu berechnen.
*   `Struct Arena<'a, T, U>`: Die Kampf-Arena, die generisch zwei Kämpfer-Typen `T` und `U` aufnimmt. Trait-Bounds: `T: Combatant`, `U: Combatant`.
*   **Modulstruktur**:
    *   `combatant.rs`: Definiert den Trait `Combatant` und Basis-Strukturen.
    *   `effects.rs`: Enthält die Logik für Statuseffeffekte und deren Lebensdauern.
    *   `arena.rs`: Implementiert die Kampfschleife (Rundenablauf, Schadensberechnung, Siegbedingungen).

### 3. Zu verwendende Crates
*   `rand` (zur Simulation von kritischen Treffern, Ausweichchancen und variablen Schadenswerten).

### 4. Didaktische Hinweise
*   **Hürde**: Du wirst den Unterschied zwischen statischer Bindung (Generics: `Arena<T, U>`) und dynamischer Bindung (Dynamic Dispatch mit Traits: `Box<dyn Combatant>`) kennenlernen.
*   **Achtung**: Da Statuseffekte eine Referenz auf ihren Verursacher halten können, darf der Verursacher nicht aus der Arena gelöscht werden, während der Effekt noch auf einem anderen Charakter aktiv ist. Der Borrow Checker wird dich zwingen, diese Beziehungen sauber über Lifetimes abzubilden.

### 5. Optionale Zusatz-Herausforderung
Führe "Associated Types" (assoziierte Typen) im `Combatant`-Trait ein. Definiere einen Typ `type Resource`, der angibt, welche Energiequelle der Kämpfer nutzt (z. B. Magier nutzen `Mana`, Krieger nutzen `Wut`).

---

## 🛡️ Projekt 4: Generischer Formular-Validator

### 1. Beschreibung der Funktionsweise
Eine erweiterbare Bibliothek zur Validierung von Benutzereingaben in Formularen. Das System prüft, ob Eingaben (z. B. Strings, Zahlen, E-Mail-Adressen) bestimmten Regeln entsprechen. Tritt ein Validierungsfehler auf, soll die Fehlermeldung direkt auf das fehlerhafte Eingabefeld verweisen. So wird vermieden, dass Fehlermeldungen für jedes Feld als neue Strings auf dem Heap alloziiert werden müssen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait Validator<T>`: Definiert eine Schnittstelle mit der Methode `validate(&self, input: &T) -> Result<(), ValidationError>`.
*   `Struct ValidationError<'a>`: Verwaltet die Fehlermeldung. Das Feld für das betroffene Eingabefeld ist eine Referenz `&'a str`.
*   **Generische Validatoren**: Typen wie `MinLengthValidator`, `RangeValidator<T>` (wobei `T` das Trait-Bound `PartialOrd` erfüllen muss) und logische Verknüpfungen wie `AndValidator<V1, V2, T>`.
*   **Modulstruktur**:
    *   `validation.rs`: Enthält den zentralen Trait `Validator` und das Fehler-Struct.
    *   `rules.rs`: Implementiert konkrete Validierungsregeln für diverse Datentypen.
    *   `main.rs`: Zeigt, wie ein komplexes Benutzer-Registrierungsformular validiert wird.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Das Verschachteln von generischen Validatoren (z. B. ein Validator, der zwei andere kombinierte Validatoren ausführt) erfordert ein gutes Verständnis von Trait-Bounds auf generischen Strukturen.
*   **Achtung**: Der Lebenszeit-Parameter `'a` in `ValidationError<'a>` gibt an, wie lange die Eingabedaten im Speicher liegen müssen. Du darfst das Formular nicht verändern oder löschen, solange du die Fehlerberichte liest.

### 5. Optionale Zusatz-Herausforderung
Implementiere die Möglichkeit, Validatoren dynamisch in einer Liste (`Vec<Box<dyn Validator<T>>>`) zu sammeln, um Validierungsketten erst zur Laufzeit dynamisch zusammenzusetzen.

---

## 🔍 Projekt 5: Typsicherer In-Memory Query Builder

### 1. Beschreibung der Funktionsweise
Ein Werkzeug, mit dem du typsichere Abfragen auf Listen von Datenstrukturen (z. B. einer Liste von Benutzern oder Produkten) formulieren kannst – ähnlich wie SQL oder LINQ in C#. Das Tool erlaubt das Filtern, Sortieren und Transformieren (Projizieren) von Daten. Alle Operationen sollen "Zero-Copy" ablaufen: Sie filtern und referenzieren die Originaldaten, ohne neue Instanzen der zugrundeliegenden Strukturen zu kopieren.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct Query<'a, T>`: Hält eine Referenz auf ein Slice von Daten (`&'a [T]`) und verwaltet den aktuellen Zustand der Abfrage.
*   `Trait Filter<'a, T>`: Beschreibt ein Filterkriterium für ein Element vom Typ `T`. Es definiert eine Methode `matches(&self, item: &'a T) -> bool`.
*   **Methoden auf `Query`**: Generische Funktionen wie `where_clause<F>(self, filter: F) -> Query<'a, T>` mit dem Bound `F: Filter<'a, T>`.
*   **Modulstruktur**:
    *   `query.rs`: Die Implementierung des Query-Builders und seiner Fluent-API.
    *   `filter.rs`: Vordefinierte Filterbedingungen (z. B. Vergleiche, logisches UND/ODER).

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Da der Query-Builder nur Referenzen auf die Datenquelle hält, is er stark an deren Lebensdauer gebunden. Ein häufiger Anfängerfehler ist es, die gefilterten Referenzen aus einer Funktion zurückzugeben, in der die Datenquelle nur lokal existierte.
*   **Achtung**: Achte darauf, wie sich die Lebensdauer der ursprünglichen Liste im Rückgabetyp der Abfragemethoden widerspiegeln muss, damit der Compiler die Sicherheit garantieren kann.

### 5. Optionale Zusatz-Herausforderung
Füge dem Query-Builder eine Projektionsmethode `project<U, P>(self, projector: P) -> Vec<U>` hinzu. Diese soll die gefilterten Referenzen mithilfe des Projektors `P` (einem Trait oder einer Closure) in einen neuen, generischen Typ `U` transformieren.

---

## 📡 Projekt 6: Das generische Event-Broker-System

### 1. Beschreibung der Funktionsweise
Ein zentraler Nachrichtenverteiler (Event Broker), der dem Publish-Subscribe-Muster folgt. Komponenten können sich als Empfänger (Listener) für bestimmte Event-Typen registrieren. Wenn eine andere Komponente ein Event an den Broker sendet, verteilt dieser es an alle registrierten Listener. Um Allokationen zu minimieren, registrieren sich die Listener mit Referenzen, und Events werden als Referenzen übergeben.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait Event`: Ein leeres Markierungs-Trait, das Typen als gültige Events kennzeichnet.
*   `Trait Listener<'a, E>`: Definiert das Verhalten eines Empfängers. Die Methode `on_event(&self, event: &'a E)` wird aufgerufen, wenn das Event `E` eintritt.
*   `Struct EventBroker<'a, E>`: Der Broker, der eine Liste von Listener-Referenzen (`&'a dyn Listener<'a, E>`) verwaltet und das Verteilen übernimmt.
*   **Modulstruktur**:
    *   `event.rs`: Enthält die Definitionen der Traits `Event` und `Listener`.
    *   `broker.rs`: Implementiert den `EventBroker` und das Registrierungs-Management.
    *   `main.rs`: Zeigt das Zusammenspiel mit verschiedenen Event-Typen.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Das Speichern von Referenzen in einer Collection (wie einem `Vec`) innerhalb einer Struktur ist eine der anspruchsvollsten Aufgaben in Rust. Alle registrierten Listener müssen nachweislich mindestens so lange leben wie der Broker selbst.
*   **Achtung**: Du wirst hier lernen, warum du die Lebensdauer der Listener mit der Lifetime des Brokers koppeln musst, um das "Dangling Pointer"-Problem zur Compilezeit auszuschließen.

### 5. Optionale Zusatz-Herausforderung
Erweitere das System so, dass der Broker thread-sicher wird und Events über Thread-Grenzen hinweg verteilen kann. Nutze dafür die Trait-Bounds `Send + Sync + 'static` für Events und Listener.

---

## 📊 Projekt 7: Generischer Daten-Exporter (CSV, JSON & Markdown)

### 1. Beschreibung der Funktionsweise
Eine Bibliothek, die beliebige Datenstrukturen einliest und in verschiedene strukturierte Textformate konvertiert (z. B. CSV-Dateien, JSON-Arrays oder Markdown-Tabellen). Das System soll über ein Trait-basiertes Design so flexibel sein, dass neue Ausgabeformate leicht hinzugefügt werden können, ohne den bestehenden Code anzupassen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait Exportable`: Muss von allen Datenstrukturen implementiert werden, die exportiert werden sollen. Es gibt z. B. Spaltennamen und Feldwerte als Liste von Strings bzw. String-Slices zurück.
*   `Trait Formatter`: Definiert das Zielformat. Es beschreibt, wie Tabellenköpfe, Zeilen und Trennzeichen generiert werden (z. B. `format_row(fields: &[&str]) -> String`).
*   `Struct Exporter<F>`: Die generische Engine, die mit einem bestimmten Formatter `F` arbeitet. Trait-Bound: `F: Formatter`.
*   **Modulstruktur**:
    *   `traits.rs`: Definiert `Exportable` und `Formatter`.
    *   `formatters.rs`: Implementiert den `Formatter` für CSV, JSON und Markdown.
    *   `engine.rs`: Führt die Export-Logik aus.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Um unnötige Kopien zu vermeiden, sollten die Formatierungsfunktionen mit Referenzen arbeiten. Dies erfordert, dass die Lebensdauer der zu exportierenden Daten eng mit der Lebensdauer der temporären Formatierungs-Puffer abgestimmt wird.
*   **Achtung**: Überlege, wie du mit unterschiedlichen Datentypen umgehst. Nicht jede Struktur besteht nur aus Strings – wie bindest du Zahlen oder Wahrheitswerte generisch ein?

### 5. Optionale Zusatz-Herausforderung
Passe den `Exportable`-Trait so an, dass er statt fertiger Strings einen generischen Typ `T: std::fmt::Display` zurückgibt. So wird die Umwandlung in Text (die Formatierung) so spät wie möglich durchgeführt.

---

## 🔄 Projekt 8: Command-Pattern mit Undo/Redo

### 1. Beschreibung der Funktionsweise
Ein System zur Verwaltung und Ausführung von Aktionen (Commands) auf einem veränderlichen Zustand (z. B. einem Textdokument oder einer Einkaufsliste). Jede Aktionen muss in der Lage sein, sich selbst auszuführen und sich wieder rückgängig zu machen. Ein Verlauf (History-Manager) speichert die ausgeführten Befehle und erlaubt es dem Nutzer, beliebig viele Schritte vor- und zurückzugehen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait Command<'a, Target>`: Definiert das Verhalten eines Befehls. Es enthält die Methoden `execute(&mut self, target: &'a mut Target)` und `undo(&mut self, target: &'a mut Target)`.
*   `Struct History<'a, Target>`: Verwaltet zwei Stapel (Undo- und Redo-Stack) von Commands. Die Lifetime `'a` stellt sicher, dass kein Command länger existiert als das Zielobjekt (`Target`), das modifiziert wird.
*   **Modulstruktur**:
    *   `command.rs`: Definiert den `Command`-Trait.
    *   `history.rs`: Implementiert den Verlauf und die Undo/Redo-Logik.
    *   `actions.rs`: Enthält konkrete Implementierungen von Befehlen (z. B. `InsertText`, `DeleteText`).

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Commands müssen oft einen Teil des vorherigen Zustands speichern, um diesen beim `undo` wiederherzustellen. Da dies über Referenzen auf das Dokument geschehen kann, ist das Verwalten von exklusiven Referenzen (`&mut`) in Kombination mit Stacks eine exzellente Übung für den Borrow Checker.
*   **Achtung**: Achte darauf, dass die Lifetime des Zielobjekts `Target` die Lebensdauer der Stacks einschränkt. Du kannst kein Undo ausführen, wenn das Dokument, auf das sich die Commands beziehen, bereits gelöscht wurde.

### 5. Optionale Zusatz-Herausforderung
Implementiere das System unter Verwendung des *Memento-Patterns*. Commands speichern dabei nicht die Änderungsschritte, sondern einen generischen Zustand (das Memento). Nutze dafür ein Trait `Memento` und generische Zustandsbackups.

---

## 🖧 Projekt 9: Zero-Copy Netzwerk-Protokoll-Parser

### 1. Beschreibung der Funktionsweise
Ein extrem schneller Parser für ein vereinfachtes Netzwerkprotokoll (z. B. ein Textprotokoll ähnlich wie Redis RESP oder HTTP-Header). Der Parser liest Daten aus einem Byte-Buffer. Anstatt für Felder wie "Befehl", "Schlüssel" oder "Payload" neue Strings auf dem Heap zu erzeugen, verweisen die Felder der geparsten Struktur direkt als Slices auf den Eingabebuffer.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct Packet<'a>`: Die Struktur des geparsten Netzwerkpakets. Felder wie `command: &'a str` und `payload: &'a [u8]` verweisen direkt in den Buffer.
*   `Trait ProtocolParser<'a>`: Schnittstelle für den Parser. Sie definiert eine Methode `parse(&self, buffer: &'a [u8]) -> Result<Packet<'a>, ParseError>`.
*   **Modulstruktur**:
    *   `packet.rs`: Definiert das `Packet` und seine Lebensdauern.
    *   `parser.rs`: Implementiert die Parser-Schnittstelle und die Parsing-Zustandsmaschine.
    *   `errors.rs`: Enthält die Fehlertypen des Parsers.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Dies ist das klassische Anwendungsbeispiel für Lifetimes! Der Byte-Buffer darf im Speicher nicht verschoben oder gelöscht werden, solange du das geparste `Packet` verwendest.
*   **Achtung**: Du wirst lernen, wie du Compilerfehler behebst, die auftreten, wenn du versuchst, Daten aus einem flüchtigen Netzwerk-Stream direkt in eine langlebige Datenstruktur zu parsen.

### 5. Optionale Zusatz-Herausforderung
Verwende `std::borrow::Cow` (Clone-on-Write) für die Textfelder im Paket. Dadurch kann der Parser standardmäßig Referenzen auf den Buffer nutzen, aber dynamisch eigene Strings allozieren, wenn das Protokoll Escaping-Zeichen (z. B. `\n` oder `\t`) enthält, die transformiert werden müssen.

---

## ⚙️ Projekt 10: Zustandsmaschine (State Machine) mit Context-Lifetimes

### 1. Beschreibung der Funktionsweise
Eine generische Zustandsmaschine, die Übergänge zwischen verschiedenen Zuständen (z. B. der Lebenszyklus einer Bestellung: `Bestellt` -> `Bezahlt` -> `Versendet`) steuert. Die einzelnen Zustände greifen dabei auf einen gemeinsamen Kontext (z. B. eine Datenbankverbindung, Konfigurationsdaten oder System-Ressourcen) zu, ohne diesen zu besitzen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait State<'a, Ctx>`: Schnittstelle für alle Zustände. Sie definiert Methoden wie `on_enter(&self, ctx: &'a Ctx)` und `transition(&self, ctx: &'a Ctx) -> Option<Box<dyn State<'a, Ctx>>>`.
*   `Struct StateMachine<'a, Ctx>`: Verwaltet den aktuellen Zustand (als Dynamic Dispatch `Box<dyn State...>`) und eine Referenz auf den Kontext vom Typ `Ctx`.
*   **Modulstruktur**:
    *   `state.rs`: Definiert das `State`-Trait.
    *   `machine.rs`: Implementiert den Zustands-Manager (`StateMachine`).
    *   `states.rs`: Enthält die konkreten Zustände und deren Übergangsregeln.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Die Lifetime `'a` sorgt dafür, dass die Zustandsmaschine und alle aktiven Zustände nicht länger leben können als der geteilte Kontext `Ctx`.
*   **Achtung**: Achte darauf, dass Zustandsübergänge den Kontext nicht exklusiv ausleihen (`&mut Ctx`), wenn andere Zustände oder Komponenten zeitgleich lesend darauf zugreifen müssen.

### 5. Optionale Zusatz-Herausforderung
Baue die Zustandsmaschine so um, dass die Zustandsübergänge komplett typsicher zur Compilezeit (Type-State Pattern) erzwungen werden. Verwende dafür generische Strukturen für jeden Zustand (z. B. `Order<Pending>`, `Order<Paid>`), sodass ungültige Zustandsübergänge bereits beim Kompilieren zu einem Fehler führen.
