# Phase 6: Projektvorschläge zu Smart Pointer & Speicherverwaltung

In dieser Phase tauchst du tief in die fortgeschrittene Speicherverwaltung von Rust ein. Du verlässt die Pfade der klassischen Ownership-Modelle und nutzt die Werkzeuge für geteilten Besitz und dynamische Veränderlichkeit zur Laufzeit: **[`Box<T>`](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-box.md)**, **[`Rc<T>` und `Arc<T>`](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-rc-arc.md)** sowie **[`RefCell<T>`](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-refcell.md)**. 

Diese Smart Pointer ermöglichen es dir, hochflexible Architekturen zu entwerfen, wie sie in Benutzeroberflächen, Graphenstrukturen, Event-Systemen und parallelen Programmen benötigt werden.

Die folgenden 10 didaktisch aufbereiteten Projektvorschläge fordern dich heraus, diese Konzepte in Kombination anzuwenden. Auch in dieser Phase gilt: Es werden keine fertigen Codelösungen vorgegeben, damit du die Architektur komplett eigenständig erarbeiten und aus Fehlern lernen kannst. Du erhältst stattdessen detaillierte Architekturvorschläge und didaktische Leitplanken.

---

## 🌐 Projekt 1: Die bidirektionale Graph-Datenstruktur (Soziales Netzwerk)

### 1. Beschreibung der Funktionsweise
Ein einfaches soziales Netzwerk, in dem Benutzerprofile (`UserNode`) miteinander verknüpft sind. Die Beziehungen zwischen Benutzern sollen bidirektional sein (wenn Benutzer A mit Benutzer B befreundet ist, ist B auch mit A befreundet). Du kannst Benutzer hinzufügen, Freundschaften schließen und den Graphen traversieren, um beispielsweise Vorschläge für neue Freunde zu berechnen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct UserNode`: Speichert den Benutzernamen und eine Liste von Freunden. Da ein Benutzer von mehreren anderen Profilen referenziert wird und sich Freundschaften zur Laufzeit ändern können, müssen die Beziehungen flexibel sein.
*   **Pointer-Zusammenspiel**:
    *   Um mehrere Besitzer für einen Knoten zu erlauben, wird jeder Knoten in ein `Rc<RefCell<UserNode>>` verpackt.
    *   Die Liste der Freunde in `UserNode` speichert `Weak<RefCell<UserNode>>` für die Rückbeziehungen, um zyklische Referenzen (Reference Cycles) zu verhindern. Sonst würde der Speicher der Knoten niemals freigegeben werden.
*   `Struct SocialGraph`: Verwaltet eine Liste aller Profile (z.B. als `Vec<Rc<RefCell<UserNode>>>` oder `HashMap<String, Rc<RefCell<UserNode>>>`).
*   **Modulstruktur**:
    *   `node.rs`: Definiert `UserNode` und die Logik zum Hinzufügen/Entfernen von Beziehungen.
    *   `graph.rs`: Implementiert den übergeordneten Graphen und Suchalgorithmen.
    *   `main.rs`: Demonstriert das Erstellen von Benutzern und zeigt, dass beim Löschen eines Nutzers der Speicher korrekt freigegeben wird.

### 3. Zu verwendende Crates
*   Keine externen Crates erforderlich. Die Standardbibliothek (`std::rc::{Rc, Weak}` und `std::cell::RefCell`) reicht aus.

### 4. Didaktische Hinweise
*   **Hürde**: Speicherlecks durch zirkuläre Referenzen. Wenn zwei `Rc`-Zeiger im Kreis aufeinander verweisen, sinkt der Referenzzähler niemals auf null. Du musst verstehen, wann du `Rc::downgrade` nutzt, um einen `Weak`-Zeiger zu erstellen, und wie du diesen mit `Weak::upgrade` wieder in einen nutzbaren `Rc` umwandelst.
*   **Achtung**: Das Ausleihen mit `borrow()` und `borrow_mut()` auf `RefCell` findet erst zur Laufzeit statt. Wenn du beim Durchlaufen des Graphen einen Knoten veränderst und gleichzeitig an einer anderen Stelle desselben Pfads denselben Knoten liest, stürzt dein Programm mit einem `Panic` ab.

### 5. Optionale Zusatz-Herausforderung
Baue die Datenstruktur so um, dass sie thread-sicher ist. Ersetze hierfür `Rc` durch `Arc` und `RefCell` durch `Mutex` oder `RwLock`. Simuliere mehrere Threads, die gleichzeitig Freundschaften anfragen oder Profile abrufen.

---

## 🔌 Projekt 2: Der erweiterbare Plugin-Manager mit geteilter Zustandsverwaltung (Shared State)

### 1. Beschreibung der Funktionsweise
Eine Anwendung, die verschiedene Erweiterungen (Plugins) laden und ausführen kann. Jedes Plugin soll in der Lage sein, auf einen zentralen Anwendungszustand (`AppState`) zuzugreifen, diesen zu lesen und zu modifizieren. Beispielsweise könnte ein Plugin Log-Einträge schreiben, während ein anderes Plugin Zählerstände im Zustand inkrementiert.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait Plugin`: Definiert die Schnittstelle für alle Plugins. Es verlangt eine Methode wie `execute(&self, state: Rc<RefCell<AppState>>)` oder `name(&self) -> &str`.
*   `Struct AppState`: Hält die geteilten Anwendungsdaten, wie Konfigurationseinstellungen oder ein einfaches Key-Value-Repository.
*   `Struct PluginManager`: Verwaltet eine Liste geladener Plugins. Da die Plugins unterschiedliche Strukturen haben können, werden sie als Dynamic Dispatch in einer Collection gespeichert.
*   **Pointer-Zusammenspiel**:
    *   `Box<dyn Plugin>`: Da die konkreten Typen der Plugins zur Compilezeit unbekannt sind, lagert der Manager sie auf dem Heap aus.
    *   `Rc<RefCell<AppState>>`: Ermöglicht es, dass der Manager und jedes einzelne Plugin gleichzeitig Zugriff auf denselben Zustand haben und diesen zur Laufzeit verändern können.
*   **Modulstruktur**:
    *   `plugin.rs`: Beinhaltet den `Plugin`-Trait und konkrete Beispiel-Implementierungen.
    *   `state.rs`: Definiert den Zustand `AppState`.
    *   `manager.rs`: Verwaltet und triggert die Ausführung der Plugins.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Der Unterschied zwischen statischer und dynamischer Polymorphie. Du lernst hier, warum du `Box<dyn Plugin>` verwenden musst, um eine heterogene Liste von Plugins zu verwalten.
*   **Achtung**: Vermeide "Double Borrows". Wenn ein Plugin `state.borrow_mut()` aufruft, darf kein anderes Element (oder das Plugin selbst an einer anderen Stelle der Funktion) ein aktives `borrow()` oder `borrow_mut()` halten.

### 5. Optionale Zusatz-Herausforderung
Führe eine Lebenszeitbegrenzung für Plugins ein. Ermögliche es dem `PluginManager`, Plugins zur Laufzeit dynamisch zu entladen. Der geteilte Zustand soll thread-sicher über `Arc<Mutex<AppState>>` und die Plugins über `Box<dyn Plugin + Send + Sync>` verwalten werden.

---

## 🧱 Projekt 3: Der hierarchische UI-Widget-Baum (DOM-Struktur)

### 1. Beschreibung der Funktionsweise
Ein System zur Repräsentation einer grafischen Benutzeroberfläche. UI-Elemente (Widgets wie Panels, Buttons und Labels) sind in einem hierarchischen Baum organisiert. Ein Container-Widget kann mehrere Kinder besitzen. Jedes Kind-Widget muss wiederum auf sein übergeordnetes Eltern-Widget verweisen können, um beispielsweise Layout-Größen abzufragen oder Events nach oben zu delegieren (Event Bubbling).

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait Widget`: Definiert grundlegende UI-Verhaltensweisen wie `draw(&self)` und `layout(&mut self)`.
*   `Struct Panel`: Ein Container-Widget, das andere Widgets enthalten kann.
*   `Struct Button`: Ein einfaches End-Widget ohne Kinder.
*   **Pointer-Zusammenspiel**:
    *   Der Eltern-Knoten besitzt seine Kinder und teilt sie über `Rc<RefCell<dyn Widget>>`.
    *   Die Kinder halten einen schwachen Verweis `Weak<RefCell<dyn Widget>>` zurück auf ihr Elternteil. Dadurch werden zirkuläre Referenzen vermieden.
    *   Die dynamischen Widgets werden über Dynamic Dispatch (`dyn Widget`) auf dem Heap verwaltet.
*   **Modulstruktur**:
    *   `widget.rs`: Der grundlegende Trait.
    *   `components.rs`: Die konkreten Widgets (`Panel`, `Button`, `Label`).
    *   `main.rs`: Baut einen komplexen Widget-Baum auf und simuliert ein Zeichnen der UI.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Die Typumwandlung und das Upcasting von `dyn Widget` zu konkreten Typen (falls nötig). Rusts Typsystem ist hier sehr streng. Überlege genau, welche Methoden im Trait definiert werden müssen, um Downcasting zu vermeiden.
*   **Achtung**: Wenn du das Layout des Baumes rekursiv berechnest, musst du aufpassen, dass du nicht gleichzeitig ein Kind-Widget veränderst, während das Eltern-Widget seine Kinder-Liste durchläuft und ausleiht.

### 5. Optionale Zusatz-Herausforderung
Implementiere ein einfaches Event-System. Wenn ein Benutzer einen Klick auf ein tief verschachteltes Widget simuliert, soll dieses Event über die `Weak`-Referenzen nach oben gereicht werden (Bubbling), bis ein Widget das Event abfängt und verarbeitet.

---

## ⏱️ Projekt 4: Der Undo-Redo-History-Manager (Grafik-Editor)

### 1. Beschreibung der Funktionsweise
Ein Verlaufssystem für einen Vektor-Grafik-Editor. Auf einer Zeichenfläche befinden sich verschiedene geometrische Formen (`Shapes` wie Kreise oder Rechtecke). Der Benutzer kann Formen hinzufügen, verschieben oder einfärben. Das System speichert jeden Bearbeitungsschritt auf einem Stack ab. Der Benutzer kann Aktionen beliebig oft rückgängig machen (Undo) oder wiederholen (Redo), ohne dass die Shapes bei jedem Schritt komplett dupliziert werden müssen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct Shape`: Repräsentiert ein grafisches Objekt (z. B. Position, Farbe, Größe).
*   `Struct Canvas`: Die Zeichenfläche, die die aktuell angezeigten Shapes verwaltet.
*   `Struct HistoryManager`: Hält einen Stapel (Stack) von Befehlen für Undo und Redo.
*   **Pointer-Zusammenspiel**:
    *   Shapes werden als `Rc<RefCell<Shape>>` auf dem Heap abgelegt.
    *   Sowohl die `Canvas` als auch die Befehle im `HistoryManager` halten `Rc`-Zeiger auf dieselben Shapes. Wenn ein Befehl eine Form verändert, greift er über `RefCell::borrow_mut` darauf zu. Dadurch wird die Änderung sofort auf der Leinwand sichtbar.
*   **Modulstruktur**:
    *   `shape.rs`: Definiert die geometrischen Formen.
    *   `canvas.rs`: Verwaltet die aktive Zeichenfläche.
    *   `history.rs`: Implementiert das Command-Pattern und verwaltet den Verlauf.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Das saubere Design des Command-Patterns. Ein Command-Objekt muss den Zustand vor der Änderung speichern, um ihn beim Rückgängigmachen wiederherstellen zu können.
*   **Achtung**: Klonen eines `Rc`-Pointers dupliziert nur den Zeiger und erhöht den Referenzzähler, nicht aber die Daten selbst. Genau das ermöglicht die speichereffiziente Verwaltung der Historie.

### 5. Optionale Zusatz-Herausforderung
Erweitere die Shapes um ein Gruppierungs-Feature. Gruppen von Shapes können wiederum in Gruppen verschachtelt werden (Composite-Pattern). Nutze `Rc` und `RefCell`, um diese Baumstruktur innerhalb der Historie flexibel zu modifizieren.

---

## 📡 Projekt 5: Reaktives Data-Binding-System (Signals / Observable-Pattern)

### 1. Beschreibung der Funktionsweise
Ein System zur automatischen Synchronisierung von Daten. Ein `Signal<T>` kapselt einen veränderlichen Wert. Andere Komponenten können diesen Wert abonnieren (beobachten). Sobald sich der Wert des Signals ändert, werden alle registrierten Abonnenten (Observer) automatisch benachrichtigt und führen eine definierte Aktion aus (z. B. die Aktualisierung einer UI oder das Schreiben in eine Log-Datei).

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct Signal<T>`: Hält den eigentlichen Wert und eine Liste von Listenern.
*   `Trait Observer<T>`: Schnittstelle für Komponenten, die auf Wertänderungen reagieren wollen.
*   **Pointer-Zusammenspiel**:
    *   Der Wert im Signal wird in ein `Rc<RefCell<T>>` gepackt, damit er von mehreren Observern gelesen und vom Signal selbst modifiziert werden kann.
    *   Die Liste der Observer im `Signal` verwaltet Closures oder Traits, die auf dem Heap als `Box<dyn Fn(&T)>` oder `Rc<RefCell<dyn Observer<T>>>` gespeichert werden.
*   **Modulstruktur**:
    *   `signal.rs`: Beinhaltet das `Signal`-Struct und die Registrierungs-Logik.
    *   `observer.rs`: Definiert den `Observer`-Trait und konkrete Implementierungen.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Lebensdauern von Callbacks. Wenn sich ein Observer registriert, darf er nicht gelöscht werden, während das Signal noch versucht, ihn zu benachrichtigen. Die Verwendung von `Rc` hilft hier, die Lebensdauern zu entkoppeln.
*   **Achtung**: Zirkuläre Benachrichtigungen (Endlosschleifen). Wenn Observer A das Signal B ändert und Observer B wiederum das Signal A ändert, stürzt das System absturzgefährdet ab oder läuft in einen Stack Overflow. Überlege, wie du solche Zyklen erkennst oder verhinderst.

### 5. Optionale Zusatz-Herausforderung
Implementiere berechnete Signale (Computed Signals). Diese hängen von anderen Signalen ab (z. B. `Signal C = Signal A + Signal B`). Ändert sich A oder B, muss sich C automatisch neu berechnen.

---

## 🎛️ Projekt 6: Der Audiosignal-Routing-Graph (Synthesizer/DSP)

### 1. Beschreibung der Funktionsweise
Ein modularer Audiosignal-Prozessor. Einzelne Audio-Module (Oszillatoren, Filter, Effekte, Ausgabegeräte) werden wie bei einem echten Synthesizer flexibel miteinander verkabelt. Ein Audiosignal fließt durch diesen Graphen. Da ein Signal-Ausgang in mehrere Effekte gleichzeitig fließen kann (z. B. parallel in ein Reverb und ein Delay), müssen Knoten geteilt besessen werden.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait AudioNode`: Definiert die Schnittstelle für alle Audiomodule mit einer Methode `process(&mut self, buffer: &mut [f32])`.
*   `Struct Oscillator`: Generiert eine Sinuswelle.
*   `Struct GainNode`: Verstärkt oder dämpft das eingehende Signal.
*   **Pointer-Zusammenspiel**:
    *   Die Module werden als `Rc<RefCell<dyn AudioNode>>` verwaltet. Dies ermöglicht es, dass ein Knoten der Vorgänger für mehrere nachfolgende Knoten ist.
    *   Der Audio-Routing-Graph verwaltet die Verbindungen und steuert die Berechnungsreihenfolge.
*   **Modulstruktur**:
    *   `node.rs`: Definiert den Trait `AudioNode`.
    *   `modules.rs`: Enthält die konkreten Implementierungen der Module.
    *   `graph.rs`: Verwaltet das Routing und die Signalverarbeitungskette.

### 3. Zu verwendende Crates
*   Keine externen Crates zwingend notwendig.
*   *Optional*: `rodio` oder `cpal` (um die erzeugten Audiodaten tatsächlich über die Soundkarte auszugeben).

### 4. Didaktische Hinweise
*   **Hürde**: Geteilter, veränderlicher Zustand in einer Verarbeitungsschleife. Da Audio-Frames in sehr kurzen Zeitabständen verarbeitet werden müssen, is Performance entscheidend. Du wirst lernen, warum `RefCell` zur Laufzeit Kosten verursacht und wie man den Graph so optimiert, dass Ausleihen minimiert werden.
*   **Achtung**: Ein Audio-Graph darf keine Zyklen (Rückkopplungsschleifen) ohne eine Verzögerung (Delay-Node) enthalten, da sonst die rekursive Auswertung in einer Endlosschleife endet.

### 5. Optionale Zusatz-Herausforderung
Überführe das Audiosystem in ein Multithreading-Modell. Die Audioberechnung soll in einem separaten Echtzeit-Thread laufen. Nutze `Arc` und `Mutex` / `RwLock` zur Steuerung der Nodes aus dem Haupt-Thread (z. B. zum Ändern der Frequenz während des Abspielens).

---

## 🗺️ Projekt 7: Graphbasiertes Text-Adventure (Raum-Navigator)

### 1. Beschreibung der Funktionsweise
Ein Text-Adventure, in dem sich der Spieler durch eine Welt aus miteinander verbundenen Räumen bewegt. Die Räume bilden einen komplexen Graphen. Jeder Raum hat Ausgänge in verschiedene Himmelsrichtungen. Räume können dynamisch verändert werden (z. B. kann eine verschlossene Tür durch ein Event geöffnet werden). Der Spieler und eventuelle Nicht-Spieler-Charaktere (NPCs) bewegen sich unabhängig durch diesen Graphen.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct Room`: Speichert die Raumbeschreibung und Verweise auf die Nachbarräume.
*   `Struct World`: Verwaltet alle Räume der Spielwelt.
*   `Struct Player`: Hält eine Referenz auf den aktuellen Raum des Spielers.
*   **Pointer-Zusammenspiel**:
    *   Räume müssen über `Rc<RefCell<Room>>` geteilt besessen werden, da sie sich gegenseitig referenzieren (Raum A hat Ausgang nach Norden zu Raum B; Raum B hat Ausgang nach Süden zu Raum A).
    *   Um Speicherlecks zu vermeiden, werden die Rückverweise (z. B. von Raum B zu Raum A) als `Weak<RefCell<Room>>` gespeichert.
    *   Der Spieler hält ebenfalls ein `Rc<RefCell<Room>>` auf seinen aktuellen Aufenthaltsort.
*   **Modulstruktur**:
    *   `room.rs`: Definiert den Raum und die Himmelsrichtungs-Verknüpfungen.
    *   `player.rs`: Implementiert den Spieler und dessen Bewegungsaktionen.
    *   `world.rs`: Generiert die Karte und verwaltet den globalen Spielablauf.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Das Aufbrechen von Zyklen. Du musst eine klare Regel etablieren, welche Richtungen als "starke" (`Rc`) und welche als "schwache" (`Weak`) Referenzen gelten, oder alle Verbindungen standardmäßig als `Weak` deklarieren und die starken Referenzen zentral in der `World` verwalten.
*   **Achtung**: Wenn ein NPC und der Spieler gleichzeitig im selben Raum agieren und den Raumzustand verändern, musst du sicherstellen, dass die Ausleihen (`borrow_mut()`) sauber geschachtelt und sofort wieder freigegeben werden.

### 5. Optionale Zusatz-Herausforderung
Implementiere autonome NPCs. Nutze einen Game-Loop, in dem sich NPCs jede Runde zufällig in einen Nachbarraum bewegen. Da NPCs und der Spieler gleichzeitig auf Räume zugreifen, müssen Kollisionen und Rauminteraktionen dynamisch aufgelöst werden.

---

## 🗄️ Projekt 8: In-Memory-Cache mit automatischer Referenz-Bereinigung

### 1. Beschreibung der Funktionsweise
Ein speichereffizienter Zwischenspeicher (Cache) für ressourcenintensive Objekte (z. B. geladene Bilder oder Datenbankeinträge). Der Cache soll ein Objekt so lange im Speicher behalten, wie mindestens ein anderer Teil der Anwendung es aktiv nutzt. Sobald kein externer Programmteil mehr das Objekt benötigt, soll der Cache dies erkennen und die Ressource automatisch aus dem Speicher freigeben (Garbage Collection über Referenzzähler).

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct AutoCache<K, V>`: Das Cache-System, das Schlüssel auf Werte abbildet.
*   `Struct SharedResource<V>`: Ein Wrapper, den der Benutzer vom Cache erhält.
*   **Pointer-Zusammenspiel**:
    *   Der Cache speichert die Werte intern als `Weak<RefCell<V>>`. Dies erhöht den starken Referenzzähler des Objekts nicht.
    *   Fordert ein Programmteil einen Wert an, wandelt der Cache das `Weak` in ein `Rc<RefCell<V>>` um und gibt es zurück.
    *   Der Cache bietet eine Methode `cleanup()`, die in der internen Map alle Einträge sucht, deren `Weak::strong_count()` auf 0 gesunken ist, und löscht diese aus der Map.
*   **Modulstruktur**:
    *   `cache.rs`: Die Implementierung des Caches und der Bereinigungslogik.
    *   `resource.rs`: Der benutzerseitige Zugriffs-Wrapper.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Das Verständnis des Zusammenspiels von strong und weak counts. Du lernst hier, wie du die Speicherverwaltung von Rust als eine Art automatischen Müllsammler für deine eigene Datenstrukturen einsetzt.
*   **Achtung**: Die Bereinigung darf nicht während einer aktiven Ausleihe des Caches blockiert werden. Überlege, wie und wann die `cleanup`-Methode am besten aufgerufen wird (z. B. bei jedem Einfügen oder zeitgesteuert).

### 5. Optionale Zusatz-Herausforderung
Mache den Cache thread-sicher, indem du `Arc` und `Weak` nutzt. Implementiere die `cleanup`-Funktion so, dass sie in einem eigenen Hintergrund-Thread läuft und in periodischen Abständen verwaiste Einträge entfernt.

---

## 🔐 Projekt 9: Der thread-sichere, transaktionale Key-Value Store

### 1. Beschreibung der Funktionsweise
Ein Datenspeicher, der Schlüssel auf Werte abbildet und von mehreren Threads gleichzeitig genutzt werden kann. Der Store unterstützt Transaktionen (ACID-Prinzip): Ein Thread kann eine Transaktion starten, mehrere Werte ändern oder hinzufügen, und diese Änderungen werden erst dann für alle anderen Threads sichtbar, wenn der Thread die Transaktion erfolgreich abschließt (Commit). Bei einem Fehler können die Änderungen verworfen werden (Rollback).

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Struct DbStore`: Der globale Datenspeicher.
*   `Struct Transaction`: Repräsentiert eine aktive Transaktion, die an einen Thread gebunden ist.
*   **Pointer-Zusammenspiel**:
    *   Der Hauptspeicher in `DbStore` wird über `Arc<RwLock<HashMap<String, String>>>` verwaltet, um parallele Lesezugriffe und exklusive Schreibzugriffe aus mehreren Threads zu ermöglichen.
    *   Die `Transaction` hält eine lokale Kopie der geänderten Daten (z. B. in einem `RefCell<HashMap<String, String>>`) und eine Referenz auf den Haupt-Store. Erst beim Commit werden die Daten in den Haupt-Store geschrieben.
*   **Modulstruktur**:
    *   `store.rs`: Enthält die Definition des globalen Speichers.
    *   `transaction.rs`: Implementiert die Transaktionslogik mit Commit und Rollback.
    *   `main.rs`: Zeigt parallele Zugriffe und isolierte Transaktionen aus verschiedenen Threads.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig.

### 4. Didaktische Hinweise
*   **Hürde**: Vermeidung von Deadlocks. Wenn mehrere Transaktionen gleichzeitig versuchen, den Haupt-Store zu beschreiben, kann es zu Verklemmungen kommen. Du musst lernen, wie man Sperren (`RwLockWriteGuard`) so kurz wie möglich hält.
*   **Achtung**: Verstehe den Unterschied zwischen der Thread-Sicherheit von `Arc`/`RwLock` und der lokalen Flexibilität von `RefCell` innerhalb eines einzelnen Threads.

### 5. Optionale Zusatz-Herausforderung
Implementiere ein einfaches Write-Ahead-Logging (WAL). Jede Transaktion schreibt ihre Änderungen vor dem Commit in eine Log-Datei auf die Festplatte. Bei einem Absturz des Programms kann der Zustand der Datenbank beim nächsten Start anhand der Log-Datei wiederhergestellt werden.

---

## 🎭 Projekt 10: Das Actor-Modell für Nebenläufigkeit (Mini-Actor-System)

### 1. Beschreibung der Funktionsweise
Ein System zur parallelen Verarbeitung, inspiriert vom Actor-Modell (bekannt aus Erlang oder Akka). Unabhängige Einheiten (Actoren) teilen keinen gemeinsamen Zustand, sondern kommunizieren ausschließlich über das Senden von Nachrichten. Jeder Actor hat ein eigenes Postfach (Mailbox). Wenn ein Actor eine Nachricht erhält, verarbeitet er diese sequenziell und kann daraufhin seinen eigenen Zustand ändern oder Nachrichten an andere Actoren senden.

### 2. Strukturierte Modul- oder Komponenten-Aufteilung
*   `Trait Actor`: Definiert das Verhalten eines Actors mit einer Methode `receive(&mut self, msg: Message, ctx: &ActorContext)`.
*   `Struct ActorRef`: Eine sichere Referenz auf einen Actor, über die andere Actoren Nachrichten an ihn senden können.
*   `Struct ActorSystem`: Verwaltet die Registrierung, Erstellung und das Routing der Nachrichten zwischen den Actoren.
*   **Pointer-Zusammenspiel**:
    *   Die Actoren selbst werden vom System auf dem Heap in `Box<dyn Actor>` verwaltet, da sie unterschiedliche konkrete Typen haben.
    *   Das Postfach eines Actors wird über einen thread-sicheren Kanal (z. B. `std::sync::mpsc`) realisiert. Die `ActorRef` hält ein `Arc<Mutex<Sender<Message>>>` (oder direkt den geklonten Sender), um Nachrichten an das Postfach zu schicken.
*   **Modulstruktur**:
    *   `actor.rs`: Definiert den `Actor`-Trait und Nachrichtenstrukturen.
    *   `system.rs`: Implementiert das `ActorSystem` und den Nachrichtentransport.
    *   `main.rs`: Zeigt ein Beispiel, bei dem mehrere Actoren (z. B. ein Ping- und ein Pong-Actor) Nachrichten austauschen.

### 3. Zu verwendende Crates
*   Keine externen Crates notwendig. Die Standardkanäle `std::sync::mpsc` reichen aus.

### 4. Didaktische Hinweise
*   **Hürde**: Kapselung des Zustands. Die große Stärke des Actor-Modells ist, dass kein Actor den Zustand eines anderen direkt manipulieren kann. Du musst sicherstellen, dass über die Kanäle nur Daten gesendet werden, die das Ownership-Modell von Rust respektieren (`Send + 'static`).
*   **Achtung**: Wenn Actoren zyklisch aufeinander warten, kann das System blockieren. Überlege, wie Nachrichten asynchron verarbeitet werden können, ohne dass der sendende Thread blockiert.

### 5. Optionale Zusatz-Herausforderung
Implementiere ein einfaches Fehlerbehandlungssystem (Supervision). Wenn ein Actor bei der Verarbeitung einer Nachricht abstürzt (z. B. durch ein `panic!`), soll ein übergeordneter Supervisor-Actor dies abfangen und entscheiden, ob der Actor neu gestartet, gestoppt oder der Fehler ignoriert werden soll.
