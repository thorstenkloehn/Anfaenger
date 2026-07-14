# Phase 7: Projektvorschläge zu Fearless Concurrency

Herzlichen Glückwunsch! Du hast die theoretischen Grundlagen der Nebenläufigkeit (Concurrency) in Rust gemeistert. Du weißt nun, wie man Threads erstellt, Daten sicher über Channels austauscht, den Zugriff auf gemeinsame Daten mit Mutexen synchronisiert und asynchronen Code mit Tokio schreibt.

Jetzt ist es an der Zeit, dieses Wissen in der Praxis anzuwenden. In dieser Phase findest du **10 strukturierte Projektvorschläge**, die diese Konzepte in verschiedenen Kombinationen nutzen. Bei diesen Projekten geht es darum, die Theorie in die Praxis umzusetzen und ein Gefühl für die typischen Stolpersteine nebenläufiger Programmierung zu bekommen.

> [!IMPORTANT]
> **Didaktischer Hinweis:** Für keines dieser Projekte findest du hier fertige Codelösungen. Das Ziel ist es, dass du die Architektur selbst planst, die Stolpersteine eigenständig löst und so ein tiefes Verständnis entwickelst!

---

## Projekt 1: Der parallele Link-Checker (Web-Scraper)

### 1. Beschreibung der Funktionsweise
Du hast eine Liste von Hunderten von URLs (z. B. aus einer Textdatei oder einem Array) und möchtest wissen, welche davon erreichbar sind (HTTP-Status 200) und welche Fehler aufweisen. Um diese Aufgabe effizient zu erledigen, sollen die URLs parallel im Hintergrund überprüft werden, anstatt sie nacheinander abzuarbeiten.

### 2. Strukturierte Komponenten-Aufteilung
*   **Haupt-Task:** Liest die Liste der URLs ein, startet die Worker-Tasks und gibt am Ende eine Zusammenfassung der Ergebnisse aus.
*   **Worker-Tasks (Tokio):** Mehrere asynchrone Tasks, die sich URLs aus einem gemeinsamen Kanal holen, den HTTP-Status abfragen und das Ergebnis zurückmelden.
*   **Ergebnis-Speicher (Shared State):** Eine gemeinsame, Mutex-geschützte Datenstruktur (z. B. eine `HashMap`), auf die alle Tasks zugreifen, um ihre Ergebnisse einzutragen. Alternativ ein dedizierter Sammler-Task, der Ergebnisse über einen separaten Channel empfängt.

### 3. Zu verwendende Crates
*   `tokio` (mit Features `macros`, `rt-multi-thread`, `sync`)
*   `reqwest` (für asynchrone HTTP-Anfragen)

### 4. Didaktische Hinweise & Hürden
*   **Lifetimes bei Tasks:** Wenn du URLs als `&str` an Tokio-Tasks übergibst, wird der Compiler protestieren. Du musst verstehen, warum Tokio-Tasks `'static` erfordern und wie du das Problem durch Klonen oder die Verwendung von `Arc` lösen kannst.
*   **Lock Contention:** Wenn viele Tasks gleichzeitig auf denselben Mutex zugreifen, um ihre Ergebnisse einzutragen, blockieren sie sich gegenseitig. Überlege, wie du den Mutex-Zugriff minimieren kannst.
*   **Verbindungs-Limits:** Was passiert, wenn du 1000 URLs gleichzeitig abrufst? Du läufst Gefahr, dass dein Betriebssystem keine Sockets mehr frei hat oder die Ziel-Server deine IP blockieren.

### 5. Optionale Zusatz-Herausforderung
Implementiere ein Rate-Limiting oder ein Semaphor (`tokio::sync::Semaphore`), um die maximale Anzahl gleichzeitiger HTTP-Anfragen im gesamten Programm hart zu begrenzen.

---

## Projekt 2: Der Multi-Client Chat-Server

### 1. Beschreibung der Funktionsweise
Ein einfacher TCP-Chat-Server, auf den sich mehrere Benutzer gleichzeitig verbinden können (z. B. per Telnet oder Netcat). Wenn ein Benutzer eine Nachricht eingibt, wird diese an alle anderen angemeldeten Benutzer weitergeleitet.

### 2. Strukturierte Komponenten-Aufteilung
*   **Listener-Loop:** Lauscht asynchron auf eingehende TCP-Verbindungen. Für jede Verbindung wird ein neuer Client-Task gestartet.
*   **Client-Task:** Verwaltet die Verbindung zu einem einzelnen Client. Er liest eingehende Nachrichten vom Socket und schreibt ausgehende Nachrichten auf den Socket.
*   **Nachrichten-Verteiler (Broadcast):** Ein zentraler Broadcast-Channel (`tokio::sync::broadcast`), über den Nachrichten an alle aktiven Client-Tasks verteilt werden. Jeder Client-Task besitzt einen Empfänger dieses Kanals.

### 3. Zu verwendende Crates
*   `tokio` (mit Features `net`, `io-util`, `sync`)

### 4. Didaktische Hinweise & Hürden
*   **Ressourcenbereinigung (Cleanup):** Was passiert, wenn ein Client einfach das Fenster schließt? Du musst erkennen, wann ein Socket keine Daten mehr liefert (`Ok(0)` beim Lesen), und den Task sowie seine Abonnements sauber beenden.
*   **Deadlocks:** Wenn das Lesen und Schreiben auf einem TCP-Socket im selben Task blockiert, kann das die Verbindung einfrieren. Lerne, wie du den Socket in einen Lese- und Schreib-Teil aufteilst (`split` oder `into_split`).

### 5. Optionale Zusatz-Herausforderung
Füge ein einfaches Befehlssystem hinzu. Benutzer sollen mit `/nick <name>` ihren Namen ändern und mit `/msg <name> <nachricht>` private Nachrichten an einzelne Benutzer schicken können. Dafür benötigst du eine Mutex-geschützte Registry aller aktiven Benutzer-Channels.

---

## Projekt 3: Paralleler Bild-Verkleinerer (Image Resizer)

### 1. Beschreibung der Funktionsweise
Ein Kommandozeilentool, das alle Bilder in einem Quellverzeichnis einliest, sie auf eine Standardgröße verkleinert (z. B. Breite 800 Pixel) und im Zielverzeichnis speichert. Da Bildbearbeitung sehr CPU-intensiv ist, soll diese Arbeit parallel über echte OS-Threads auf alle CPU-Kerne verteilt werden.

### 2. Strukturierte Komponenten-Aufteilung
*   **Scanner-Thread:** Durchsucht das Quellverzeichnis nach Bilddateien und sendet die Pfade über einen Channel an die Worker.
*   **Worker-Threads:** Ein Thread-Pool (z. B. mit `std::thread`), der Pfade aus dem Channel liest, die Bilder lädt, skaliert und speichert.
*   **Koordinations-Thread:** Überwacht den Fortschritt und gibt eine Meldung aus, sobald alle Threads fertig sind.

### 3. Zu verwendende Crates
*   `image` (zum Laden, Bearbeiten und Speichern von Bildern)
*   `walkdir` (optional, zum einfachen Durchsuchen von Ordnerstrukturen)

### 4. Didaktische Hinweise & Hürden
*   **CPU-Bound vs. I/O-Bound:** Warum ist dieses Projekt ein schlechter Kandidat für asynchrone Tokio-Tasks ohne Blocking-Handler? Verstehe den Unterschied zwischen blockierender CPU-Arbeit (Skalieren) und asynchronem I/O.
*   **Poisoning von Mutexen:** Wenn ein Worker-Thread beim Verarbeiten eines korrupten Bildes abstürzt (`panic`), kann er einen gemeinsamen Mutex "vergiften". Wie gehst du in Rust mit `PoisonError` um?

### 5. Optionale Zusatz-Herausforderung
Implementiere eine dynamische Fortschrittsanzeige im Terminal (z. B. "23/100 Bildern verarbeitet"), die von einem separaten Fortschritts-Thread aktualisiert wird, ohne die Performance der Worker-Threads durch ständige Konsolenausgaben zu beeinträchtigen.

---

## Projekt 4: In-Memory-Datenbank mit Time-to-Live (TTL)

### 1. Beschreibung der Funktionsweise
Ein einfacher Schlüssel-Wert-Speicher im RAM (ähnlich wie Redis). Einträge können mit einer optionalen Ablaufzeit (TTL) gespeichert werden. Ein Hintergrund-Prozess muss abgelaufene Einträge automatisch finden und entfernen, damit der Speicher nicht überläuft.

### 2. Strukturierte Komponenten-Aufteilung
*   **Datenbank-Kern:** Eine Struktur, die eine gemeinsame, Mutex- oder RwLock-geschützte `HashMap` kapselt.
*   **Hintergrund-Cleaner-Task (Tokio):** Ein Task, der in einer Endlosschleife läuft, in festen Intervallen aufwacht und abgelaufene Schlüssel aus der Map löscht.
*   **API-Schnittstelle:** Methoden zum Einfügen (`insert`), Auslesen (`get`) und Löschen (`remove`) von Werten.

### 3. Zu verwendende Crates
*   `tokio` (mit Features `time`, `sync`)

### 4. Didaktische Hinweise & Hürden
*   **Mutex vs. RwLock:** Da in einer Datenbank meist viel häufiger gelesen als geschrieben wird, ist ein normaler `Mutex` oft ein Flaschenhals. Lerne, wie du `std::sync::RwLock` oder `tokio::sync::RwLock` verwendest, um parallele Lesezugriffe zu erlauben.
*   **Lock Contention durch den Cleaner:** Wenn der Cleaner-Task einmal pro Sekunde die gesamte Map sperrt und scannt, blockiert er in dieser Zeit alle Client-Zugriffe. Wie lässt sich das verhindern? (Tipp: Halte die Sperrzeiten so kurz wie möglich oder verwende separate Locks).

### 5. Optionale Zusatz-Herausforderung
Implementiere "Database Sharding": Teile die Datenbank intern in z. B. 16 separate Untermaps auf, die jeweils durch ein eigenes Lock geschützt sind. Der Schlüssel bestimmt über eine Hash-Funktion, in welchem "Shard" die Daten liegen. Das verringert die Wahrscheinlichkeit von Sperrkonflikten drastisch.

---

## Projekt 5: Paralleler Download-Manager mit Segmentierung

### 1. Beschreibung der Funktionsweise
Ein Tool, das eine große Datei über HTTP herunterlädt, indem es die Datei in mehrere Segmente (Byte-Bereiche) aufgeteilt wird. Diese Segmente werden parallel heruntergeladen und am Ende korrekt zusammengefügt, um die Bandbreite optimal zu nutzen.

### 2. Strukturierte Komponenten-Aufteilung
*   **Koordinator-Task:** Ermittelt vorab per HTTP-HEAD-Request die Gesamtgröße der Datei, teilt sie in Segmente auf und startet die Worker-Tasks.
*   **Download-Worker-Tasks:** Laden jeweils ihren zugewiesenen Byte-Bereich herunter und schreiben die Daten in eine gemeinsame Datei.
*   **Schreib-Synchronisation:** Die Tasks müssen koordiniert in dieselbe Datei schreiben, ohne die Daten der anderen Tasks zu überschreiben.

### 3. Zu verwendende Crates
*   `tokio` (mit Feature `fs`)
*   `reqwest` (für HTTP-Range-Requests)

### 4. Didaktische Hinweise & Hürden
*   **Wahlfreier Dateizugriff (Seeking):** Du musst die Zieldatei im Schreibmodus öffnen und den Schreibzeiger vor jedem Schreibvorgang an die korrekte absolute Position im Segment bewegen. Wie machst du das in einer asynchronen Umgebung sicher?
*   **Fehlerbehandlung und Abbruch:** Wenn ein Download-Worker die Verbindung verliert, müssen die anderen Worker informiert werden und ihre Arbeit einstellen (oder pausieren), statt sinnlos weiterzuladen.

### 5. Optionale Zusatz-Herausforderung
Implementiere eine Pausieren- und Fortsetzen-Funktion (Resume). Die bereits geschriebenen Segmente sollen bei einem Neustart des Programms erkannt werden, sodass nur noch die fehlenden Teile geladen werden müssen.

---

## Projekt 6: IoT-Sensor-Simulator & Aggregator

### 1. Beschreibung der Funktionsweise
Dieses Projekt simuliert ein Netzwerk von Hunderten von IoT-Sensoren (z. B. Temperaturfühlern), die in unregelmäßigen Abständen Daten senden. Ein zentraler Aggregator nimmt diese Datenströme entgegen, berechnet kontinuierlich Statistiken (Mittelwert, Min/Max) pro Sensor und gibt diese aus.

### 2. Strukturierte Komponenten-Aufteilung
*   **Sensor-Simulatoren (Tasks):** Jeder Sensor läuft als eigener asynchroner Task, der in einer Schleife Messwerte generiert und über einen gemeinsamen MPSC-Channel sendet.
*   **Zentraler Empfänger (Aggregator):** Ein einzelner Task, der den Empfänger des Channels ausliest.
*   **Statistik-Speicher:** Eine Struktur, die die aggregierten Sensordaten hält. Da der Aggregator-Task der einzige ist, der sie beschreibt, ist hier eventuell gar kein Mutex für die Map selbst nötig. Überlege, wie du Ownership hier geschickt einsetzt.

### 3. Zu verwendende Crates
*   `tokio` (mit Feature `sync`)
*   `rand` (für zufällige Sensorwerte und Sende-Intervalle)

### 4. Didaktische Hinweise & Hürden
*   **Bounded vs. Unbounded Channels:** Wenn du einen unbegrenzten Kanal (`unbounded_channel`) verwendest und der Aggregator langsamer verarbeitet als die Sensoren senden, läuft dein RAM voll. Bei einem begrenzten Kanal (`channel`) blockieren die Sender. Welches Verhalten ist für IoT-Sensoren erwünscht?
*   **Sender-Klonen:** Du musst verstehen, wie man den Sender (`Sender<T>`) klont, um ihn an Hunderte von unabhängig laufenden Tasks zu übergeben.

### 5. Optionale Zusatz-Herausforderung
Erstelle ein Alarm-System: Wenn ein Sensor einen kritischen Wert überschreitet, soll dieser Wert über einen separaten, priorisierten Kanal geschickt werden. Der Aggregator muss diesen Kanal bevorzugt auslesen (z. B. mittels `tokio::select!`).

---

## Projekt 7: Der ausdauernde Web-Crawler

### 1. Beschreibung der Funktionsweise
Ein Crawler, der bei einer Start-URL beginnt, die Seite herunterlädt, alle dort enthaltenen Links extrahiert, diesen Links folgt und so rekursiv das Web durchsucht (bis zu einer maximalen Tiefe).

### 2. Strukturierte Komponenten-Aufteilung
*   **Besucht-Register (`HashSet`):** Ein gemeinsamer, Mutex-geschützter Speicher aller bereits besuchten URLs, um Endlosschleifen zu verhindern.
*   **Arbeits-Warteschlange (Channel):** Ein Kanal, in den neu gefundene URLs hineingeschrieben und aus dem die Worker-Tasks ihre nächsten Aufgaben lesen.
*   **Crawler-Worker-Tasks:** Laden Webseiten herunter, parsen die Links und senden neue URLs zurück in den Kanal.

### 3. Zu verwendende Crates
*   `tokio`
*   `reqwest`
*   `scraper` (oder ein anderes HTML-Parsing-Crate zum Extrahieren von `href`-Attributen)

### 4. Didaktische Hinweise & Hürden
*   **Der "Idle-Deadlock":** Wenn alle Worker-Tasks darauf warten, dass neue URLs im Kanal ankommen, aber kein Task mehr aktiv ist, der neue URLs finden könnte, blockiert das Programm für immer. Wie erkennst du, dass die Arbeit vollständig erledigt ist und alle Worker untätig sind?
*   **Ressourcenschonung:** Du musst sicherstellen, dass nicht versehentlich Tausende von HTTP-Requests gleichzeitig an dieselbe Website geschickt werden (DDoS-Verhalten).

### 5. Optionale Zusatz-Herausforderung
Implementiere einen "Graceful Shutdown": Wenn der Benutzer `Strg+C` drückt, sollen alle laufenden Downloads sauber beendet, keine neuen gestartet und die bisher besuchten URLs in einer JSON-Datei gesichert werden.

---

## Projekt 8: CPU-Raytracer mit Kachel-Aufteilung

### 1. Beschreibung der Funktionsweise
Ein mathematisch aufwendiger Raytracer berechnet ein Bild. Da das Berechnen der Pixel unabhängig voneinander geschehen kann, wird das Bild in Kacheln (z. B. 16x16 Pixel) aufgeteilt. Jede Kachel wird von einem eigenen Worker-Thread berechnet.

### 2. Strukturierte Komponenten-Aufteilung
*   **Task-Queue:** Eine Liste aller zu berechnenden Kacheln (Koordinaten), geschützt durch einen Mutex.
*   **Render-Threads:** Eine feste Anzahl von OS-Threads (`std::thread`), die sich Kacheln aus der Queue holen, die Pixel berechnen und das fertige Kachel-Bild über einen Channel senden.
*   **Haupt-Thread:** Empfängt die fertigen Kacheln aus dem Channel und setzt sie im Bildpuffer zusammen.

### 3. Zu verwendende Crates
*   `image` (zum Verwalten des Bildpuffers und Speichern der Datei)
*   `rand` (für zufällige Strahlenabweichungen bei Antialiasing)

### 4. Didaktische Hinweise & Hürden
*   **Körnung (Granularität):** Wenn die Kacheln zu groß sind, werden manche Threads viel schneller fertig als andere (Load Imbalance). Wenn die Kacheln zu klein sind, übersteigt der Verwaltungs-Overhead den Nutzen.
*   **Data Races vermeiden:** Der Haupt-Thread modifiziert den Bildpuffer. Wie stellst du sicher, dass die Worker-Threads keinen direkten Zugriff auf den Bildpuffer benötigen, sondern ihre Ergebnisse isoliert übertragen?

### 5. Optionale Zusatz-Herausforderung
Implementiere ein "Coarse-to-Fine"-Rendering: Die Worker rendern im ersten Durchgang nur jedes 4. Pixel (schnelle Vorschau) und verfeinern das Bild in den Folge-Durchgängen. Der Haupt-Thread aktualisiert die Bilddatei kontinuierlich, damit du den Fortschritt visuell verfolgen kannst.

---

## Projekt 9: Der HTTP Load Balancer

### 1. Beschreibung der Funktionsweise
Ein Proxy-Server, der auf einem Port (z. B. 8080) eingehende HTTP-Verbindungen annimmt und diese abwechselnd (Round-Robin) an eine Liste von echten Backend-Servern (z. B. auf Port 8081, 8082) weiterleitet.

### 2. Strukturierte Komponenten-Aufteilung
*   **Proxy-Listener:** Nimmt asynchron Client-Verbindungen entgegen.
*   **Backend-Registry:** Ein gemeinsamer Zustand (`Arc<RwLock<Vec<Backend>>>`), der die Adressen der Backend-Server und deren aktuellen Status (Online/Offline) enthält.
*   **Health-Checker (Hintergrund-Task):** Pingelt in regelmäßigen Abständen alle Backend-Server an und markiert sie in der Registry als aktiv oder inaktiv.
*   **Routing-Logik:** Wählt für jede eingehende Verbindung das nächste freie und aktive Backend aus.

### 3. Zu verwendende Crates
*   `tokio` (mit Features `net`, `io-util`, `sync`)
*   `reqwest` (optional, für einfache Health-Checks)

### 4. Didaktische Hinweise & Hürden
*   **Asynchrones Daten-Streaming:** Um Daten vom Client zum Backend und gleichzeitig vom Backend zum Client zu leiten, benötigst du eine asynchrone Kopiermethode wie `tokio::io::copy_bidirectional`.
*   **Verbindungs-Timeouts:** Wenn ein Backend offline geht, darf der Client-Request nicht ewig hängen. Du musst lernen, wie du Timeouts in asynchrone Abläufe integrierst (`tokio::time::timeout`).

### 5. Optionale Zusatz-Herausforderung
Implementiere "Sticky Sessions": Ein Client, der einmal an Backend A weitergeleitet wurde, soll bei nachfolgenden Anfragen (innerhalb einer bestimmten Zeitspanne) bevorzugt wieder an Backend A geleitet werden (z. B. identifiziert über die IP-Adresse).

---

## Projekt 10: Event-gesteuertes Handelsbuch (Order Book)

### 1. Beschreibung der Funktionsweise
Eine Echtzeit-Simulation eines Finanzmarktes. Kauf- und Verkaufsaufträge (Orders) für eine Aktie kommen asynchron herein. Ein zentraler Matching-Task verwaltet das Orderbuch und führt Transaktionen aus, sobald Kauf- und Verkaufsgebote preislich übereinstimmen.

### 2. Strukturierte Komponenten-Aufteilung
*   **Order-Generatoren (Tasks):** Mehrere asynchrone Tasks simulieren Händler, die in unregelmäßigen Abständen Kauf- oder Verkaufsorders generieren und in einen MPSC-Channel schreiben.
*   **Matching-Engine (Task):** Liest fortlaufend Orders aus dem Channel, pflegt das Orderbuch (sortierte Listen für Gebote und Angebote) und führt Matches aus.
*   **Ticker-Feed (Broadcast):** Erfolgte Transaktionen werden über einen Broadcast-Channel an Protokollierungs- und Statistik-Tasks gesendet.

### 3. Zu verwendende Crates
*   `tokio` (mit Feature `sync`)
*   `rand` (zur Simulation von Marktpreisen)

### 4. Didaktische Hinweise & Hürden
*   **Reihenfolge und Fairness:** Concurrency-Systeme neigen dazu, die genaue Reihenfolge von Ereignissen zu verwischen. Im Finanzwesen ist die Reihenfolge des Eintreffens (FIFO) aber essenziell. Wie garantiert dein Kanalsystem diese Fairness?
*   **Latenzentkopplung:** Der Matching-Task darf niemals durch langsame I/O-Vorgänge (wie das Schreiben in eine Datei oder Ausgaben auf der Konsole) blockiert werden. Wie trennst du die schnelle Berechnung im RAM von der langsamen Protokollierung?

### 5. Optionale Zusatz-Herausforderung
Erlaube das Stornieren von Orders. Ein Händler-Task muss eine zuvor gesendete Order über einen separaten Kanal zurückziehen können. Das Matching-Buch muss diese Order dann effizient und thread-sicher aus den Sortierlisten entfernen, bevor sie ausgeführt wird.
