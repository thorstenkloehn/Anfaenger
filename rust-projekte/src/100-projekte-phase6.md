# 100 Projekte - Smart Pointer & Speicherverwaltung

Willkommen in Phase 6! In dieser Phase dreht sich alles um die Speicherverwaltung auf dem Heap und die flexiblen Möglichkeiten, die dir Rusts Smart Pointer bieten. Um dein Verständnis für Heap-Allokationen, geteilte Ownership und Interior Mutability zu festigen, findest du hier eine Sammlung von 100 kleinen Projektideen und Übungsszenarien.

Die Liste ist in fünf sinnvolle Kategorien unterteilt. Jede Idee soll dir als Inspiration dienen, um eigene Programme zu schreiben. Wichtig: Es gibt hier keine fertigen Codelösungen – das Ziel ist es, dass du dich selbst an den Compiler wagst, Fehlermeldungen verstehst und die Konzepte Schritt für Schritt in die Praxis umsetzt.

---

## 1. Box-Fokus

In dieser Kategorie geht es um die einfachste Form der Heap-Allokation mit `Box`. Du lernst, wie du rekursive Datenstrukturen aufbaust, Speicher auf den Heap auslagerst und Trait-Objekte (Dynamic Dispatch) für polymorphes Verhalten nutzt.

1. **Rekursive Liste (Cons List)**: Baue eine klassische, einfach verkettete Liste, in der jeder Knoten über `Box` auf den nächsten Knoten auf dem Heap zeigt. Du lernst hierbei, wie man rekursive Datenstrukturen durch Heap-Allokation ermöglicht, da deren exakte Größe zur Compilezeit nicht bekannt ist.
2. **Generischer Binärbaum**: Implementiere einen binären Suchbaum, dessen linke und rechte Äste in `Box` verpackt sind. So verstehst du, wie verschachtelte Bäume ohne unendliche Größe zur Compilezeit aufgebaut werden.
3. **AST für mathematische Ausdrücke**: Erstelle einen abstrakten Syntaxbaum (AST) für einfache Rechenoperationen (z. B. Addition, Multiplikation), bei dem die Operanden rekursiv in `Box` gespeichert werden. Dies zeigt dir, wie du hierarchische Ausdrücke parst und auswertest.
4. **Vektor von Trait-Objekten (dyn-Typen)**: Verwalte eine Sammlung unterschiedlicher GUI-Elemente (wie Buttons und Textfelder), die alle ein `Draw`-Trait implementieren, in einem `Vec<Box<dyn Draw>>`. Dadurch lernst du, wie dynamic dispatching zur Laufzeit mit Heap-Pointern funktioniert.
5. **Polymorphes Plugin-System**: Entwickle unkompliziert ein Plugin-System, bei dem Erweiterungen über ein gemeinsames Trait definiert und in einer Liste als `Box<dyn Plugin>` gehalten werden. Das übt das Laden und Ausführen von dynamischem Verhalten zur Laufzeit.
6. **Große Struktur auslagern**: Definiere ein Struct mit sehr großen Datenfeldern (z. B. ein großes Array) und lagere es via `Box` auf den Heap aus. Du lernst, wie du damit den Stack-Speicher entlastest und Kopierkosten bei Funktionsaufrufen minimierst.
7. **Heap-basierter Zustandsautomat**: Implementiere einen Zustandsautomaten, bei dem die einzelnen Zustände als Heap-allozierte Trait-Objekte realisiert sind. Das zeigt dir, wie du den aktuellen Zustand flexibel durch Zuweisung eines neuen `Box`-Pointers änderst.
8. **JSON-AST-Parser**: Entwirf einen einfachen JSON-Parser, der Werte (Objekte, Arrays, Strings) als rekursive Strukturen darstellt, wobei Arrays und Objekte ihre Kindelemente via `Box` referenzieren.
9. **Kommando-Muster (Command Pattern)**: Baue eine Undo-Historie auf, indem du ausführbare Befehle als `Box<dyn Command>` in einer Liste speicherst. So kannst du zur Laufzeit verschiedene Aktionen dynamisch hinzufügen und rückgängig machen.
10. **Spiel-Entitäten auf dem Heap**: Erstelle ein Spiel-Framework, bei dem alle aktiven Entitäten (Spieler, Gegner, Items) ein `Entity`-Trait implementieren und als `Box<dyn Entity>` verwaltet werden.
11. **Benutzerdefinierter Fehler-Wrapper**: Implementiere einen eigenen Fehlertyp, der interne Fehlerursachen dynamisch über `Box<dyn std::error::Error>` speichert. Das hilft dir zu verstehen, wie Rusts Standardbibliothek Fehler-Chaining löst.
12. **Dynamische Callback-Liste**: Registriere verschiedene Event-Listener als Closures, die du als `Box<dyn Fn()>` in einem Vektor speicherst. Du übst das dynamische Aufrufen von Code bei bestimmten Ereignissen.
13. **Dateisystem-Baum**: Modelliere Verzeichnisse und Dateien, bei denen ein Ordner eine Liste von Elementen enthält, die über `Box` rekursiv verschachtelt sind.
14. **Heap-alloziertes Array (Box-Slice)**: Erzeuge ein dynamisch großes Array zur Laufzeit und konvertiere es in ein `Box<[T]>`. Du erfährst, wie du Speicherplatz auf dem Heap fixierst, sodass die Größe des Arrays danach nicht mehr verändert werden kann.
15. **Strategie-Entwurfsmuster (Strategy Pattern)**: Schreibe ein Textformatierungsprogramm, bei dem die Formatierungsstrategie zur Laufzeit durch Übergabe eines `Box<dyn Formatter>` ausgetauscht werden kann.
16. **Ausdrucks-Parser für Boolesche Logik**: Baue einen Parser für logische Formeln (UND, ODER, NICHT), bei dem die logischen Verknüpfungen als Boxen verschachtelt sind.
17. **Dynamischer Middleware-Stack**: Entwickle einen HTTP-Server-Prototyp, bei dem Request-Middleware in einer Kette von `Box<dyn Middleware>` abgearbeitet wird.
18. **Unendlicher Stream-Generator**: Implementiere einen Iterator, der unendlich viele Werte generiert und dessen Zustand in einer rekursiven `Box`-Struktur verwaltet wird.
19. **Suchbaum mit N-ären Knoten**: Erstelle einen Baum, bei dem jeder Knoten eine variable Anzahl von Kindknoten hat, die als Vektor von Boxen (`Vec<Box<Node>>`) gespeichert werden.
20. **Dependency Injection Container**: Baue einen einfachen DI-Container, der Services als `Box<dyn Any>` registriert und bei Bedarf zur Verfügung stellt.

---

## 2. Rc & Arc-Fokus

In dieser Kategorie übst du das Teilen von Eigentumsrechten (Shared Ownership). Verwende `Rc` für Single-Threaded-Anwendungen und `Arc` für threadsicheres Teilen von Daten. Zudem lernst du mit `Weak` umzugehen, um Speicherlecks durch zirkuläre Referenzen zu vermeiden.

21. **Geteilte Konfigurationsdaten (Rc)**: Verwende `Rc` (Reference Counted), um eine schreibgeschützte Konfigurationsstruktur an mehrere Programmteile im selben Thread zu verteilen. Du lernst, wie mehrere Besitzer auf dieselben Daten zugreifen können, ohne sie zu kopieren.
22. **Webserver-Konfiguration (Arc)**: Nutze `Arc` (Atomic Reference Counted), um globale Einstellungen sicher an mehrere Worker-Threads zu übergeben. Das zeigt dir den Unterschied zwischen `Rc` (für Single-Thread) und `Arc` (für Multi-Thread).
23. **Graph-Knoten mit mehreren Eltern**: Erstelle eine gerichtete Graph-Struktur, bei der ein Kindknoten von mehreren Elternknoten referenziert wird. Durch `Rc` verhinderst du, dass der Knoten gelöscht wird, solange noch mindestens ein Elternteil auf ihn zeigt.
24. **Weak-Pointer in Baumstrukturen**: Ergänze einen Binärbaum um Eltern-Referenzen unter Verwendung von `Weak`. Dadurch lernst du, wie man zirkuläre Referenzen vermeidet, die sonst zu Speicherlecks (Memory Leaks) führen würden.
25. **Dateisystem mit Verknüpfungen (Hardlinks)**: Modelliere Dateien, die in mehreren Verzeichnissen gleichzeitig auftauchen können, indem du die Datei-Struktur in ein `Rc` verpackst.
26. **Thread-Pool-Task-Verteiler**: Schreibe ein System, bei dem Aufgaben (Tasks) mithilfe von `Arc` an verschiedene Threads im Pool verteilt werden, um redundante Datenkopien zu vermeiden.
27. **Zirkulärer Cache mit Weak**: Baue einen Cache, der Daten hält, aber bei Inaktivität oder Speicherknappheit zulässt, dass diese freigegeben werden, indem du `Weak` anstelle von `Rc` verwendest.
28. **Observer-Muster mit Weak**: Registriere Beobachter an einem Subjekt über `Weak`-Referenzen. Dadurch verhinderst du, dass Beobachter im Speicher gehalten werden, nur weil sie noch beim Subjekt registriert sind.
29. **Gemeinsamer Chat-Verlauf**: Simuliere einen Chatroom, in dem mehrere Benutzer (User-Strukturen) denselben Chat-Verlauf (`Rc<Vec<String>>`) gemeinsam lesen.
30. **Spieler-Inventar mit geteilten Items**: Erstelle ein RPG-System, bei dem mehrere Spielfiguren auf dasselbe, unzerstörbare Quest-Item im Speicher verweisen (`Rc<Item>`).
31. **Multi-Thread-Log-Writer**: Verteile einen gemeinsamen Log-Kanal via `Arc` an verschiedene Threads, damit jeder Thread sicher Statusmeldungen in dasselbe Log schreiben kann.
32. **DOM-Baum-Modellierung**: Programmiere ein vereinfachtes HTML-Dokumentenmodell (DOM), bei dem Kinder ihre Eltern über `Weak` und Eltern ihre Kinder über `Rc` referenzieren.
33. **Musik-Playliste mit geteilten Songs**: Baue eine App, bei der Songs in mehreren Playlisten existieren können, ohne dass die Song-Daten dupliziert werden, indem du `Rc<Song>` verwendest.
34. **Routing-Tabelle im Netzwerk**: Modelliere ein Netzwerk aus Routern, bei dem benachbarte Router über `Rc<Router>` miteinander verknüpft sind.
35. **Multi-Thread-Bildverarbeitung**: Teile ein großes Bild in Segmente auf und gib jedem Thread über `Arc` Lesezugriff auf das Originalbild, um Pixeloperationen parallel auszuführen.
36. **Bibliotheks-System**: Verwalte Bücher, die von mehreren Bibliotheks-Benutzern gleichzeitig vorgemerkt sind, unter Verwendung von `Rc`.
37. **Zustands-Sharing im UI-Framework**: Teile den globalen Anwendungszustand über `Rc` mit verschiedenen UI-Komponenten, die diesen Zustand rendern müssen.
38. **Pipeline-Verarbeitung (Producer-Consumer)**: Erstelle eine Verarbeitungs-Pipeline, bei dem Zwischenstufen über `Arc` auf gemeinsame Metadaten zugreifen.
39. **Weak-Referenzen im Dateisystem-Cache**: Implementiere einen Cache für geöffnete Dateien, der `Weak`-Zeiger nutzt, um zu prüfen, ob eine Datei an anderer Stelle noch aktiv verwendet wird.
40. **Flugverbindungs-Netzwerk**: Modelliere Flughäfen und Routen, bei denen Flughäfen gegenseitig über `Rc` und `Weak` referenziert sind, um Flugwege zu berechnen.

---

## 3. RefCell-Fokus

`RefCell` ermöglicht "Interior Mutability" (innere Veränderlichkeit). Hier lernst du, wie du Daten veränderst, selbst wenn du nur unveränderliche Referenzen auf sie besitzt. Du übst dabei den Umgang mit dem Borrow-Checker zur Laufzeit.

41. **Einfacher Konsolen-Logger**: Erstelle ein Trait `Logger` mit einer schreibgeschützten Methode `log(&self, msg: &str)`. Implementiere eine Struktur, die intern `RefCell` nutzt, um die geloggten Nachrichten in einem Vektor zu zählen und zu speichern, obwohl die Methode als unveränderlich deklariert ist.
42. **Mock-Datenbank für Tests**: Schreibe eine Mock-Datenbank für deine Unit-Tests, die ein schreibgeschütztes Trait implementiert, aber intern per `RefCell` Aufrufe zählt und Ergebnisse manipulter. Das zeigt dir das Konzept der "Interior Mutability".
43. **Zähler für Funktionsaufrufe**: Implementiere ein Struct, das statistische Daten über die Nutzung seiner Methoden sammelt. Nutze `RefCell`, um diese Zähler auch in unveränderlichen Methoden (z.B. Gettern) hochzuzählen.
44. **Laufzeit-Borrow-Checker-Experiment**: Provoziere absichtlich einen Absturz (`panic`), indem du gleichzeitig zwei veränderliche Referenzen (`borrow_mut()`) aus einer `RefCell` anforderst. Das hilft dir zu verstehen, wie `RefCell` die Ausleihe-Regeln zur Laufzeit statt zur Compilezeit prüft.
45. **Einfacher Cache mit Interior Mutability**: Entwirf eine Struktur, die bei einem schreibgeschützten Lesezugriff prüft, ob ein Wert bereits berechnet wurde, und diesen bei Bedarf berechnet und in einer internen `RefCell` speichert.
46. **GUI-Button mit Klick-Zähler**: Modelliere einen Button, der bei jedem Klick (über eine unveränderliche Schnittstelle) seinen internen Zustand in einer `RefCell` aktualisiert.
7. **Lazy-Initialization-Container**: Baue einen Container, der ein teures Objekts erst dann erzeugt und in einer `RefCell` ablegt, wenn zum ersten Mal darauf zugegriffen wird.
48. **Konfigurations-Hot-Reload**: Implementiere ein System, bei dem die Konfigurationsdaten zur Laufzeit im Hintergrund aktualisiert werden können, während andere systemteile unveränderliche Referenzen darauf halten.
49. **Spiel-Statistiken-Tracker**: Schreibe einen Tracker, der während des Spiels Achievements freischaltet, indem er Daten über eine unveränderliche Schnittstelle in einer `RefCell` modifiziert.
50. **Virtueller RAM-Speicher**: Simuliere einen Arbeitsspeicher, bei dem Lese- und Schreibzugriffe über eine `RefCell` laufen, um Zugriffsstatistiken zur Laufzeit zu protokollieren.
51. **Trace-Utility für Funktionen**: Entwickle ein Werkzeug, das den Aufrufbaum von verschachtelten Funktionen aufzeichnet, indem es einen Thread-lokalen Zustand über `RefCell` modifiziert.
52. **Dateisystem-Node mit Schreibschutz**: Erstelle ein Datei-Modul, bei dem Metadaten (wie das letzte Zugriffsdatum) bei jedem Lesezugriff automatisch über eine `RefCell` aktualisiert werden.
53. **Zustands-Verbindung für Netzwerk-Sockets**: Modelliere ein Verbindungs-Objekt, das seinen internen Status (z.B. "Verbunden", "Wartend") bei jedem Sendeversuch über `RefCell` anpasst.
54. **Einfacher Task-Scheduler**: Schreibe einen Scheduler, der anstehende Aufgaben in einer `RefCell` verwaltet und diese bei der Ausführung entnimmt oder als erledigt markiert.
55. **Grafik-Pipeline-Konstruktor**: Baue einen Grafikkontext, bei dem Render-Einstellungen (wie die Hintergrundfarbe) über unveränderliche Referenzen mittels `RefCell` geändert werden können.
56. **Mock-E-Mail-Sender**: Erstelle einen E-Mail-Dienst für Tests, der gesendete E-Mails in einer `RefCell` speichert, um später zu verifizieren, ob die richtige E-Mail verschickt wurde.
57. **Sensor-Simulator**: Simuliere einen Sensor, der bei jeder Abfrage neue Zufallswerte generiert und seinen internen Verlaufspuffer via `RefCell` aktualisiert.
58. **Benutzer-Session-Manager**: Verwalte eine aktive Benutzer-Session, bei der die Ablaufzeit bei jedem Zugriff über eine `RefCell` aktualisiert wird.
59. **Undo-Stack für Texteditor**: Implementiere eine Text-Editor-Komponente, die ihren Undo-Verlauf über eine `RefCell` verwaltet, um Änderungen rückgängig machen zu können.
60. **Cache für DNS-Anfragen**: Schreibe einen DNS-Resolver, der IP-Adressen für Domains abfragt und die Ergebnisse in einer `RefCell` zwischenspeichert.

---

## 4. Kombinations-Projekte

Hier kombinierst du Smart Pointer, um komplexe Speicher- und Zugriffsszenarien abzubilden. Du nutzt `Rc<RefCell<T>>` für veränderbare, geteilte Daten in einem Thread sowie `Arc<Mutex<T>>` oder `Arc<RwLock<T>>` für sichere Datenmutationen über Threadgrenzen hinweg.

61. **Verkettete Liste mit zwei Richtungen (Doubly Linked List)**: Baue eine doppelt verkettete Liste, bei der jeder Knoten einen `Rc<RefCell<Node>>` auf den Nachfolger und einen `Weak<RefCell<Node>>` auf den Vorgänger hält. So lernst du die Kombination aus geteilter Ownership, Interior Mutability und Zyklenvermeidung.
62. **Shared State im Multi-Threading (Arc<Mutex>)**: Erstelle ein Programm, bei dem zehn Threads parallel einen gemeinsamen Zähler hochzählen. Nutze `Arc<Mutex<i32>>`, um den Zähler threadsicher zu teilen und zu verändern.
63. **Multi-Reader, Single-Writer Cache (Arc<RwLock>)**: Entwickle einen threadsicheren Cache mit `Arc<RwLock<T>>`, der paralleles Lesen durch beliebig viele Threads erlaubt, aber exklusiven Schreibzugriff gewährt, wenn Daten aktualisiert werden.
64. **Zyklischer Graph mit veränderbaren Knoten**: Modelliere ein soziales Netzwerk, in dem Personen als Knoten über `Rc<RefCell<Person>>` miteinander befreundet sind und ihre Namen oder Profile dynamisch ändern können.
65. **Thread-sichere Job-Warteschlange**: Implementiere eine Warteschlange, bei dem mehrere Producer-Threads Aufgaben einstellen und mehrere Consumer-Threads diese abarbeiten, synchronisiert über `Arc<Mutex<VecDeque<Job>>>`.
66. **Baumstruktur mit dynamischen Eltern-Updates**: Programmiere einen Baum, bei dem du zur Laufzeit Knoten verschieben und Elternbeziehungen anpassen kannst. Nutze `Rc<RefCell<Node>>` für Kinder und `Weak<RefCell<Node>>` für Eltern.
67. **Gemeinsamer Spielzustand im Multiplayer**: Simuliere einen Spielserver, auf dem der globale Zustand der Spielwelt in einem `Arc<Mutex<WorldState>>` liegt und von verschiedenen Client-Threads gelesen und manipuliert wird.
68. **Thread-sicherer Event-Bus**: Entwickle einen Event-Bus, der Events an Abonnenten in verschiedenen Threads verteilt, wobei die Abonnentenliste in einem `Arc<RwLock<Vec<Subscriber>>>` verwaltet wird.
69. **Dynamisches Menü-System**: Baue eine verschachtelte Konsolen-Menüstruktur, bei dem untermenüs ihre übergeordneten Menüs referenzieren und Menüpunkte zur Laufzeit hinzugefügt oder entfernt werden (`Rc<RefCell<Menu>>`).
70. **Thread-sicheres Logging-System**: Schreibe einen Logger, der Log-Einträge im Speicher sammelt und regelmäßig in einem separaten Thread in eine Datei schreibt, synchronisiert über `Arc<Mutex<Vec<String>>>`.
71. **Teilnehmerliste in einer Chat-Gruppe**: Modelliere einen Chat-Server, bei dem die Liste der aktiven Verbindungen in einem `Arc<RwLock<HashMap<u64, User>>>` verwaltet wird.
72. **Web-Scraper mit geteilten Ergebnissen**: Implementiere einen Scraper, der mehrere URLs parallel abruft und die gefundenen Daten in einer gemeinsamen Liste (`Arc<Mutex<Vec<PageData>>>`) speichert.
73. **Zustandssteuerung für Roboter**: Simuliere einen Roboter, dessen verschiedene Sensoren und Aktoren (in eigenen Threads) auf einen gemeinsamen Steuerungszustand (`Arc<Mutex<RobotState>>`) zugreifen.
74. **Dokumenten-Editor (Kooperatives Schreiben)**: Entwirf ein vereinfachtes Google-Docs-Modell, bei dem mehrere Redakteure im selben Thread an verschiedenen Abschnitten desselben Dokuments arbeiten (`Rc<RefCell<Document>>`).
75. **Thread-sicherer Rate-Limiter**: Baue einen Rate-Limiter, der API-Anfragen zählt und blockiert, wenn Limits überschritten werden, geteilt über `Arc<Mutex<RateData>>`.
76. **Verzeichnissystem mit Dateigrößen-Berechnung**: Modelliere ein Dateisystem, bei dem Änderungen an einer Datei (z.B. Dateigröße) über `Rc<RefCell<File>>` sofort die Größenberechnung des Elternordners triggern.
77. **Thread-sicherer Connection-Pool**: Erstelle einen Pool aus Datenbankverbindungen, die von mehreren Threads ausgeliehen und wieder zurückgegeben werden können (`Arc<Mutex<Vec<Connection>>>`).
78. **Echtzeit-Aktien-Ticker**: Schreibe ein Programm, das Börsenkurse im Hintergrund aktualisiert (`Arc<RwLock<StockPrices>>`) und diese Daten an mehrere Anzeige-Threads streamt.
79. **Spielkarten-Deck im Mehrspielerspiel**: Modelliere ein Kartenspiel, bei dem das Deck und die Ablagestapel als `Rc<RefCell<Deck>>` von allen Spielern geteilt und verändert werden.
80. **Thread-sicherer Dateicache**: Implementiere einen Cache, der geladene Dateien im Speicher behält, sodass threads sie lesen können, ohne sie neu zu laden, abgesichert mit `Arc<RwLock<FileMap>>`.

---

## 5. Fortgeschrittene Speicher-Szenarien & Datenstrukturen

Diese Kategorie führt dich tiefer in fortgeschrittene Themen ein. Du beschäftigst dich mit benutzerdefinierten Smart Pointern, manuellen Speicherallokationen, `Pin`, `Unsafe` zur Kapselung sicherer Schnittstellen und Performance-Optimierungen.

81. **Eigener Arena-Allokator (Arena Allocator)**: Implementiere einen einfachen Arena-Allokator, der Speicher in großen Blöcken reserviert und kleinere Objekte darin platziert. Du lernst, wie man die Lebensdauer allozierter Objekte an die Arena bindet und die Performance durch Reduzierung einzelner Heap-Allokationen steigert.
82. **Speicherleck-Detektor (Memory Leak Detector)**: Baue eine Wrapper-Struktur um einen Smart-Pointer, die beim Programmende prüft, ob alle erstellten Objekte ordnungsgemäß freigegeben wurden, indem sie Zähler im `Drop`-Trait auswertet.
83. **Eigener Smart-Pointer (Custom Box)**: Schreibe ein Struct `MyBox<T>`, das intern rohe Zeiger (`*mut T`) verwendet, Speicher auf dem Heap alloziert und das `Deref`- sowie das `Drop`-Trait manuell implementiert.
84. **Referenz-Zählungs-Pointer von Hand gebaut**: Entwirf deinen eigenen `Rc`-Klon (`MyRc<T>`). Du lernst, wie du die Heap-Allokation für den Wert und den Zähler durchführst und den Zähler bei `clone()` erhöhst bzw. bei `drop()` verringerst.
85. **Copy-on-Write (Cow) Nachbau**: Implementiere eine eigene Datenstruktur, die Daten erst dann auf dem Heap dupliziert, wenn ein Schreibzugriff stattfindet. Das schult dein Verständnis für speicher- und laufzeitoptimierte Datenstrukturen.
86. **Self-Referential Structs (Selbstreferenzierende Strukturen)**: Versuche, eine Struktur zu bauen, die ein Feld und eine Referenz auf dieses Feld enthält, und erforsche, warum Rusts Borrow-Checker dies standardmäßig verbietet (und wie man es über `Pin` löst).
87. **Sicherer Wrapper um Unsafe Raw Pointer**: Schreibe eine Datenstruktur, die intern mit `*const T` oder `*mut T` arbeitet, aber nach außen hin eine vollkommen sichere, idiomatische Schnittstelle anbietet.
88. **Ringpuffer mit Shared Memory**: Entwirf einen Ringpuffer auf dem Heap, der sich wie ein kreisförmiges Array verhält, ohne Elemente beim Einfügen physisch zu verschieben.
89. **B-Baum-Knoten-Speicherverwaltung**: Implementiere die Speicherverwaltung für einen B-Baum, bei dem Knoten eine dynamische Größe haben und Speicherplatz zur Laufzeit effizient aufgeteilt werden muss.
90. **Garbage Collection Simulator**: Schreibe einen einfachen Mark-and-Sweep-Garbage-Collector in Rust, der Objekte im Speicher markiert und nicht mehr erreichbare Objekte freigibt.
91. **Flyweight-Entwurfsmuster (Flyweight Pattern)**: Baue ein System zur Textdarstellung, bei dem sich Millionen von Schriftzeichen die Speicherdaten der eigentlichen Glyphen (Grafiken) teilen, um RAM zu sparen.
92. **Dynamische Speicher-Defragmentierung**: Simuliere einen Speicherbereich, in dem allozierte Blöcke verschoben und defragmentiert werden können, und verwalte die Zeiger darauf.
93. **Speicher-Profiler für Allocations**: Schreibe ein Tool, das die Anzahl und die Größe aller aktiven Heap-Allokationen in Echtzeit misst und visualisiert.
94. **Sparsely Populated Matrix (Dünnbesetzte Matrix)**: Entwirf eine Matrix, die nur Werte ungleich Null auf dem Heap speichert, um Speicherplatz bei riesigen, fast leeren Tabellen zu sparen.
95. **Thread-lokaler Objektspeicher (Thread-local Storage)**: Nutze Thread-lokalen Speicher (`thread_local!`), um threadspezifische Caches aufzubauen, ohne Sperren (Mutexes) verwenden zu müssen.
96. **Sichere API für Shared Memory (IPC)**: Modelliere ein Interface, das den Zugriff auf einen Shared-Memory-Bereich zwischen zwei simulierten Prozessen speichersicher kapselt.
97. **Slices von Heap-Strukturen**: Erzeuge einen Vektor von Boxen und schreibe eine Funktion, die einen Teilbereich davon als Slice von Referenzen zurückgibt, ohne Kopien anzufertigen.
98. **Manuelles Speicher-Layouting mit Layout**: Verwende `std::alloc::Layout` und `std::alloc::alloc`, um rohen Heap-Speicher für ein dynamisches Struct zur Laufzeit direkt anzufordern und freizugeben.
99. **LRU-Cache (Least Recently Used) auf dem Heap**: Baue einen LRU-Cache, der eine begrenzte Anzahl an Elementen speichert und bei Speicherüberschreitung das am längsten ungenutzte Element freigibt.
100. **Graph-Datenbank im Speicher**: Entwirf ein Datenmodell für eine kleine Graph-Datenbank, bei der Knoten und Kanten dynamisch erzeugt, verknüpft und speichersicher traversiert werden können.
