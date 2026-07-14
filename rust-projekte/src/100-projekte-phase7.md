# 100 Projekte - Fearless Concurrency

Willkommen in Phase 7! In dieser Phase dreht sich alles um die Nebenläufigkeit und parallele Programmierung in Rust – ein Thema, das durch Rusts strenge Speichersicherheitsgarantien auch als "Fearless Concurrency" bekannt ist. Um dein Verständnis für Threads, Synchronisation, Message Passing und asynchronen Code zu vertiefen, findest du hier eine Sammlung von 100 kleinen Projektideen und Übungsszenarien.

Die Liste ist in fünf sinnvolle Kategorien unterteilt. Jede Idee soll dir als Inspiration dienen, um eigene Programme zu schreiben. Wichtig: Es gibt hier keine fertigen Codelösungen – das Ziel ist es, dass du dich selbst an den Compiler wagst, Fehlermeldungen verstehst und die Konzepte Schritt für Schritt in die Praxis umsetzt.

---

## 1. Threads & Mutex-Fokus

In dieser Kategorie geht es um die Grundlagen der parallelen Ausführung mit Betriebssystem-Threads (`std::thread`) und die klassische Synchronisation von geteilten Daten. Du lernst, wie du Daten mit `Arc` sicher teilst, sie mit `Mutex` oder `RwLock` vor Datenrennen schützt und mit atomaren Werten effiziente Sperren umgehst.

1. **Paralleler Array-Summierer**: Teile einen großen Vektor in Segmente auf und lasse mehrere Threads die Teilsummen berechnen. Du lernst hierbei, wie du Berechnungsaufgaben aufteilst und die Einzelergebnisse am Ende im Hauptthread zusammenführst.
2. **Geteilter Zähler mit Mutex**: Erstelle einen globalen Zähler in einem `Arc<Mutex<i32>>`, auf den mehrere Threads parallel zugreifen. Du übst das Erwerben und Freigeben von Sperren (Locks) unter Verwendung von atomarer Referenzzählung.
3. **Threadsichere Log-Datei**: Schreibe Log-Nachrichten aus mehreren Threads in eine einzige Datei, die durch einen Mutex geschützt ist. Das zeigt dir, wie du exklusiven Zugriff auf E/A-Ressourcen in einer Multi-Thread-Umgebung koordinierst.
4. **Paralleler Primzahlprüfer**: Überprüfe eine Liste von großen Zahlen parallel auf Primzahleigenschaft. Du lernst, wie du Rechenlast auf verschiedene Betriebssystem-Threads verteilst, um die CPU-Kerne optimal auszulasten.
5. **Multi-Reader Lese-/Schreibsperre (RwLock)**: Implementiere eine Konfigurationsstruktur, die von vielen Threads gleichzeitig gelesen werden kann (`RwLock`), aber nur von einem exklusiv aktualisiert wird. Du verstehst dadurch den Unterschied zwischen exklusivem und geteiltem Lese-/Schreibzugriff.
6. **Atomarer Fortschrittsbalken**: Nutze atomare Variablen wie `AtomicUsize`, um den Fortschritt einer parallelen Berechnung threadübergreifend ohne Mutex-Overhead zu zählen. Das schult dich im Umgang mit lock-freien Basisdatentypen und Speicherreihenfolgen.
7. **Thread-Spawning in einer Schleife**: Starte dynamisch eine vom Benutzer definierte Anzahl von Threads, die jeweils eine persönliche Begrüßung auf der Konsole ausgeben. Du lernst, wie du Argumente sicher in die Closures von Threads verschiebst (`move`).
8. **Parallele Bildverarbeitung (Graustufen)**: Lese ein Bild ein und lasse jeden Thread einen Bildbereich parallel in Graustufen umwandeln. Du übst das Aufteilen von Speicherbereichen und das parallele Schreiben in nicht-überlappende Abschnitte eines Vektors.
9. **Deadlock-Demonstrator**: Provoziere absichtlich einen Deadlock, indem du zwei Threads erstellst, die versuchen, zwei verschiedene Mutexes in umgekehrter Reihenfolge zu sperren. Das hilft dir zu verstehen, wie Deadlocks entstehen und wie man sie vermeidet.
10. **Thread-lokaler Zustand (Thread Local)**: Verwende thread-lokalen Speicher (`thread_local!`), um für jeden Thread einen eigenen Zustand (wie einen Zufallszahlengenerator oder Cache) zu halten. Du lernst, wie du Daten isolierst, ohne sperren zu müssen.
11. **Parallele Wortzählung in Texten**: Teile eine Liste großer Textdateien auf mehrere Threads auf, die unabhängig voneinander die Häufigkeit von Wörtern zählen. Du übst das Zusammenführen komplexer Datenstrukturen (wie `HashMap`) nach der parallelen Phase.
12. **Thread-Priorisierungs-Simulator**: Simuliere verschiedene Ausführungsgeschwindigkeiten, indem du Threads unterschiedlich lange Berechnungen durchführen oder künstliche Pausen mit `thread::sleep` einlegen lässt. Das verdeutlicht die Nicht-Determinismus-Natur von Thread-Schedulern.
13. **Daten-Rennen-Schutz**: Schreibe ein Programm, das versucht, Daten unsicher zwischen Threads zu teilen. Du lernst anhand der Compiler-Fehlermeldungen, wie Rusts `Send`- und `Sync`-Traits dich vor unbemerktem Daten-Undercutting schützen.
14. **Parallele Matrix-Multiplikation**: Berechne das Produkt zweier Matrizen, indem du die Berechnung der einzelnen Zeilen auf verschiedene Threads aufteilst. Das übt die mathematische Zerlegung von Problemen in parallele Teilaufgaben.
15. **Selbstgemachter Thread-Pool-Worker**: Implementiere eine Schleife, in der Threads dauerhaft auf neue Berechnungsaufträge warten. Du lernst, wie man das teure Neuerstellen von Betriebssystem-Threads vermeidet, indem man bestehende Threads wiederverwendet.
16. **Atomarer Stopp-Schalter (Kill Switch)**: Nutze ein `AtomicBool`, das von mehreren Worker-Threads regelmäßig abgefragt wird, um alle Threads sauber zu beenden. Du lernst, wie man einen kontrollierten und kooperativen Programmabbruch implementiert.
17. **Mutex-basiertes Bankkonto**: Simuliere Überweisungen zwischen mehreren Konten, die durch Mutexes geschützt sind. Du übst das gleichzeitige Sperren von zwei Objekten und verhinderst dabei typische Race Conditions bei Finanztransaktionen.
18. **Paralleler Dateisucher**: Durchsuche ein Verzeichnisbaum nach einer bestimmten Datei, indem jeder Unterordner von einem eigenen Thread durchsucht wird. Das zeigt dir, wie du dynamisch neue Threads basierend auf der Dateisystemstruktur erzeugst.
19. **Threadübergreifende Fehlerbehandlung**: Fange Panics in Kind-Threads im Hauptthread ab, indem du den Rückgabewert von `thread::spawn` (das `JoinHandle`-Resultat) auswertest. Du lernst, wie du dein Programm vor dem vollständigen Absturz bewahrst, wenn ein einzelner Thread fehlschlägt.
20. **Daten-Pipeline mit Barriere**: Synchronisiere mehrere Threads an einer bestimmten Stelle mit einer `Barrier`, sodass sie erst weitermachen, wenn alle Threads diesen Punkt erreicht haben. Das übt die Phasen-Synchronisation in parallelen Algorithmen.

---

## 2. Channels-Fokus

In dieser Kategorie dreht sich alles um das Message-Passing-Prinzip ("Do not communicate by sharing memory; instead, share memory by communicating"). Du lernst, wie du Daten über Kanäle (`std::sync::mpsc`) zwischen Threads austauchst, Datenströme filterst und komplexe Producer-Consumer-Szenarien aufbaust.

21. **Einfacher Nachrichtenkanal (mpsc)**: Sende Textnachrichten von einem Worker-Thread an den Hauptthread über einen klassischen Kanal. Du lernst das grundlegende Konzept von Sendern (`Sender`) und Empfängern (`Receiver`) kennen.
22. **Fortschritts-Updates via Channel**: Berechne eine komplexe Aufgabe in einem Hintergrund-Thread und sende regelmäßig Prozentwerte über einen Channel an die Konsolen-UI. Das zeigt dir, wie du die Benutzeroberfläche reaktiv hältst.
23. **Producer-Consumer-Bäcker**: Ein Thread (Bäcker) produziert "Brötchen" (Datenstrukturen) und sendet sie über einen Channel an einen anderen Thread (Kunde), der sie verarbeitet. Das übt die Entkopplung von Datenproduktion und Datenkonsum.
24. **Mehrere Sender, ein Empfänger**: Erstelle mehrere Worker-Threads, die alle Ergebnisse ihrer Arbeit über geklonte Sender-Instanzen an einen zentralen Empfänger-Thread schicken. Du lernst, wie man Kanäle für Multi-Producer-Szenarien verwaltet.
25. **Begrenzter Kanal (SyncChannel)**: Verwende einen `sync_channel` mit einer festen Kapazität. Du erforschst experimentell, wie der Sender blockiert (Backpressure), sobald der Puffer voll ist, und wie dies zur Systemstabilität beiträgt.
26. **Job-Queue mit Channels**: Sende Berechnungsaufträge (Enums oder Structs) über einen Channel an einen Worker-Thread, der diese nacheinander abarbeitet. Das zeigt dir, wie du Aufgaben dynamisch zur Laufzeit delegierst.
27. **Bidirektionale Kommunikation**: Richte zwei getrennte Channels ein, damit zwei Threads abwechselnd Nachrichten hin und her schicken können. Du lernst, wie du Kommunikationsprotokolle (wie ein Ping-Pong-Spiel) zwischen Threads entwirfst.
28. **Kanal-Verteilung (Multiplexer)**: Empfange Daten aus verschiedenen Quellen über unterschiedliche Kanäle und führe sie in einem einzigen zentralen Thread zusammen. Das zeigt dir, wie du heterogene Datenströme konsolidierst.
29. **Konsolen-Chatroom-Simulator**: Simuliere einen Chatroom, bei dem jede Client-Verbindung einen Sender-Channel besitzt, um Nachrichten in eine zentrale Verteilerschleife zu leiten.
30. **Dateiverarbeitungs-Pipeline**: Nutze mehrere hintereinandergeschaltete Channels, um Daten einzulesen, zu filtern und schließlich auf die Festplatte zu schreiben. Du übst das Aufbauen modularer Datenverarbeitungsketten.
31. **Timeout beim Kanal-Empfang**: Verwende `recv_timeout` beim Empfänger, um eine Aktion auszuführen oder eine Warnung auszugeben, wenn nach einer gewissen Zeit keine Nachricht eintrifft. Das schult dich in der robusten Fehlerbehandlung bei blockierenden Operationen.
32. **Nicht-blockierendes Abfragen (try_recv)**: Implementiere eine Schleife, die mit `try_recv` prüft, ob Hintergrundaufgaben fertig sind, ohne die Hauptschleife zu blockieren. Du lernst, wie du zyklische Aufgaben ausführst, während du auf Nachrichten wartest.
33. **Event-Bus mit Kanälen**: Verteile Benutzereingaben und Systemereignisse über Channels an die jeweils zuständigen Verarbeitungs-Threads. Das übt das Entkoppeln von Eingabelogik und Geschäftslogik.
34. **Datenfilter-Worker**: Ein Thread generiert Zufallszahlen und sendet sie über einen Channel; ein zweiter Thread filtert diese und leitet nur gerade Zahlen an einen dritten Thread weiter. Das zeigt dir das Prinzip der Stream-Filterung.
35. **Sensor-Aggregator**: Simuliere mehrere Sensoren, die in eigenen Threads laufen und periodisch Daten über einen gemeinsamen Channel an einen Auswertungs-Thread senden. Du lernst, wie du Datenströme aus unregelmäßigen Quellen konsistent verarbeitest.
36. **Graceful Shutdown via Channel**: Beende Worker-Threads sauber, indem du ihnen ein spezielles "Stop"-Signal (z.B. ein Enum-Variant) über den Channel sendest. Das schult dich im sicheren Beenden von Hintergrundprozessen.
37. **Auftragsbestätigung (Request-Response)**: Sende eine Aufgabe über einen Channel zusammen mit einem Einweg-Sender, über den der Worker das Ergebnis direkt an den Aufrufer zurückschicken kann. Du verstehst dadurch das RPC-Prinzip (Remote Procedure Call).
38. **Paralleler Web-Scraper (Simuliert)**: Mehrere Threads laden simulierte Webseiten herunter und schicken den extrahierten Text zur Bereinigung an einen zentralen Hauptthread. Das übt die parallele Textverarbeitung.
39. **Lastverteilung (Load Balancer)**: Verteile eintreffende Aufgaben über eine Liste von Channels rundlaufend (Round-Robin) an mehrere Worker-Threads, um eine gleichmäßige Auslastung zu garantieren.
40. **Audio-Synthesizer-Pipeline**: Generiere Audiosamples in einem Thread und sende sie kontinuierlich über einen Channel an den Thread, der die Soundausgabe steuert. Du lernst, wie man Echtzeitanforderungen mit kontinuierlichem Datenfluss realisiert.

---

## 3. Async/Tokio-Fokus

Asynchroner Code ermöglicht es dir, Tausende von E/A-Operationen (I/O) gleichzeitig auf einer geringen Anzahl von Threads auszuführen. Hier nutzt du das `async/await`-Paradigma, die `Tokio`-Runtime, asynchrone Tasks, Timeouts und fortgeschrittene Kontrollstrukturen wie `join!` und `select!`.

41. **Erste asynchrone Funktion**: Schreibe eine einfache `async fn`, die eine Sekunde wartet (`tokio::time::sleep`) und dann eine Nachricht ausgibt. Du lernst die Grundlagen der asynchronen Funktionsdefinition und des Aufrufs mit `.await`.
42. **Parallele HTTP-Anfragen (Simuliert)**: Starte mit `tokio::spawn` mehrere asynchrone Aufgaben, die simulierte Netzwerkanfragen durchführen. Du lernst, wie man leichtgewichtige Tasks erstellt, die von der Runtime nebenläufig verwaltet werden.
43. **Asynchroner Timer-Dienst**: Baue ein System, das mehrere unterschiedliche Timer startet und Benachrichtigungen ausgibt, sobald ein Timer abgelaufen ist. Das zeigt dir, wie asynchrones Zeitmanagement ohne das Blockieren von Threads funktioniert.
44. **Asynchrone Dateileser**: Lies mehrere Dateien asynchron mit `tokio::fs::File` ein. Du lernst, wie du I/O-Wartezeiten des Betriebssystems überbrückst, während die CPU andere Aufgaben erledigt.
45. **Tokio-Channel (mpsc)**: Nutze die asynchronen Channels von Tokio (`tokio::sync::mpsc`), um Daten zwischen asynchronen Tasks auszutauschen. Du verstehst den Unterschied zu synchronen Standard-Channels.
46. **Timeout für asynchrone Tasks**: Verwende `tokio::time::timeout`, um eine asynchrone Netzwerkabfrage abzubrechen, falls sie länger als eine bestimmte Zeit dauert. Das schult dich in der Absicherung von Netzwerk-Clients gegen Hänger.
47. **Parallele Ausführung mit join!**: Führe drei asynchrone Berechnungen gleichzeitig aus und warte mit dem Makro `tokio::join!`, bis alle drei abgeschlossen sind. Das zeigt dir, wie du unabhängige Aufgaben parallelisierst und abwartest.
48. **Wer gewinnt? (select!)**: Starte zwei konkurrierende asynchrone Tasks und verwende `tokio::select!`, um nur das Ergebnis des Tasks zu verarbeiten, der zuerst fertig wird. Du lernst die asynchrone Ablaufsteuerung bei unvorhersehbaren Ereignissen.
49. **Asynchroner TCP-Echo-Server**: Programmiere einen TCP-Server mit `tokio::net::TcpListener`, der eingehenden Text liest und ihn unverändert an den Client zurückschickt. Das zeigt dir die Grundlagen der asynchronen Netzwerkprogrammierung.
50. **Asynchroner TCP-Client**: Verbinde dich asynchron mit deinem TCP-Echo-Server, sende Nachrichten und gib die empfangene Antwort aus. Das übt den Umgang mit asynchronen Read/Write-Streams.
51. **Asynchroner Mutex**: Verwende `tokio::sync::Mutex`, um einen gemeinsamen Zustand über `.await`-Grenzen hinweg sicher zu modifizieren. Du verstehst, warum synchrone Mutexes in asynchronem Code problematisch sein können.
52. **Task-Limitierung (Semaphore)**: Begrenze die Anzahl der gleichzeitig aktiven asynchronen Web-Downloads mit einem `tokio::sync::Semaphore`. Das lehrt dich, Ressourcenüberlastung (z.B. zu viele offene Sockets) zu verhindern.
53. **Broadcast-Channel**: Nutze `tokio::sync::broadcast`, um eine Nachricht von einer Quelle an viele asynchrone Empfänger gleichzeitig zu senden. Das eignet sich hervorragend für Chatroom-Verteiler.
54. **Oneshot-Kanal**: Verwende einen `tokio::sync::oneshot`-Kanal, um das Ergebnis einer asynchronen Hintergrundberechnung genau einmal an den Aufrufer zurückzugeben. Das übt die punktuelle asynchrone Kommunikation.
55. **Asynchroner Intervall-Ticker**: Erstelle eine Schleife, die mithilfe von `tokio::time::interval` präzise alle 500 Millisekunden eine Aktion ausführt. Du lernst, wie du periodische Aufgaben sauber in asynchronen Systemen einplanst.
56. **Paralleler Web-Crawler (Limitierung)**: Scrape URLs asynchron, stelle jedoch sicher, dass maximal eine bestimmte Anzahl an Anfragen gleichzeitig aktiv ist. Das übt den kontrollierten asynchronen Datenabruf.
57. **Asynchroner Ping-Utility**: Sende periodisch asynchrone Ping-Signale an mehrere Server-Adressen und messe die Antwortzeiten parallel. Das zeigt dir die Stärke von Async bei der Parallelisierung von Netzwerklatenzen.
58. **Watch-Channel für Konfigurations-Updates**: Nutze `tokio::sync::watch`, um Konfigurationsänderungen sofort an viele lesende Tasks zu streamen. Das zeigt dir, wie man globale Zustände effizient und mit minimalem Overhead verteilt.
59. **Asynchrones Log-Rotationssystem**: Schreibe Logs asynchron in Dateien und wechsle die Datei automatisch, sobald sie eine bestimmte Größe überschreitet. Das übt das asynchrone Verwalten von Datei-Ressourcen.
60. **Dateien-Downloader mit Fortschritt**: Lade mehrere Dateien parallel herunter und aktualisiere asynchron eine Konsolen-Anzeige mit den jeweiligen Fortschritten. Das schult dich in der Koordinierung von UI-Updates und E/A-Tasks.

---

## 4. Kombinations-Projekte

Hier verbindest du synchrone OS-Threads und asynchronen Tokio-Code. Du lernst, wie du rechenintensive Aufgaben aus der asynchronen Welt auslagerst (um die Runtime nicht zu blockieren) und wie du komplexe Synchronisationsmuster über Thread-Grenzen hinweg realisierst.

61. **Bridge: CPU-intensive Tasks aus Tokio auslagern**: Führe eine rechenintensive mathematische Operation auf einem separaten OS-Thread aus, um den asynchronen Event-Loop nicht zu blockieren (`tokio::task::spawn_blocking`). Du verstehst hierbei das Zusammenspiel von CPU-bound und I/O-bound Tasks.
62. **Multiplayer-Lobby mit Async und Threads**: Verwalte Spieler-Lobbies mit asynchronen Netzwerkverbindungen, während die eigentliche Spielphysik in festen Intervallen auf OS-Threads läuft. Das übt die Aufteilung von Netzwerk- und Berechnungslogik.
63. **Daten-Pipeline (Thread zu Async-Task)**: Lese Sensordaten in einem schnellen, synchronen Hardware-Thread ein und sende sie über einen Tokio-Kanal an eine asynchrone Speicher-Task. Das zeigt dir, wie du synchrone Treiber an asynchrone Architekturen anbindest.
64. **Dateisystem-Beobachter mit Callback-Bridge**: Integriere eine synchrone Dateiüberwachungs-Bibliothek in eine asynchrone Anwendung, indem du Events per Channel in die Tokio-Runtime leitest.
65. **Asynchroner Webserver mit synchroner Datenbank**: Baue einen kleinen HTTP-Dienst, der Anfragen asynchron annimmt, aber blockierende Datenbankabfragen über einen separaten Thread-Pool abwickelt. Das schult dich im Umgang mit legacy oder blockierenden APIs.
66. **Chat-Server mit Raumverwaltung**: Kombiniere `tokio::net::TcpListener` mit einem `Arc<Mutex<HashMap<String, Room>>>`, um Chats über verschiedene Räume hinweg synchronisiert zu verwalten.
67. **Parallele Map-Reduce-Engine**: Implementiere ein einfaches Map-Reduce-System, das Daten über Channels verteilt, auf Threads verarbeitet und asynchron zusammenfasst.
68. **Verteilter Task-Planer**: Schreibe einen Planer, bei dem Aufgaben asynchron empfangen, in einem synchronen Thread-Pool abgearbeitet und Ergebnisse per Broadcast-Channel verteilt werden.
69. **Rate-Limiter mit Token-Bucket**: Erstelle ein System, das API-Anfragen blockiert oder verzögert, indem ein asynchroner Hintergrund-Task kontinuierlich Tokens in einen Mutex-geschützten Eimer füllt.
70. **Asynchroner Datei-Hasher mit Thread-Pool**: Berechne die Hashes von vielen großen Dateien parallel, indem du die I/O-Vorgänge asynchron abwickelst und das rechenintensive Hashing blockierend auslagerst.
71. **Sensor-Dashboard mit WebSocket-Simulator**: Sammle Logdaten asynchron im Speicher und schreibe sie blockweise über einen synchronen Hintergrund-Thread auf die Festplatte.
72. **Parallele Suchmaschine für Textdateien**: Durchsuche viele Dokumente nach Schlüsselwörtern. Nutze OS-Threads für das eigentliche Durchsuchen der Dateiinhalte und Async für die Steuerung und die Anzeige der Ergebnisse.
73. **Zustands-Synchronisation im Netzwerkspiel**: Synchronisiere die Positionen von Spielfiguren auf mehreren Clients über einen asynchronen UDP-Server, der einen synchronen Spielzustand aktualisiert.
74. **Dynamischer Thread-Pool-Skalierer**: Überwache die Auslastung einer asynchronen Warteschlange und spawne bei Bedarf dynamisch zusätzliche synchrone Worker-Threads.
75. **Backup-System mit Abbruchfunktion**: Kopiere Verzeichnisse parallel auf OS-Threads und biete dem Benutzer die Möglichkeit, den gesamten Vorgang asynchron per Tastendruck abzubrechen.
76. **Verteiltes Logging mit Puffer**: Sammle Logdaten asynchron im Speicher und schreibe sie blockweise über einen synchronen Hintergrund-Thread auf die Festplatte.
77. **Echtzeit-Daten-Filter**: Empfange Rohdatenströme asynchron, filtere Rauschen in parallelen Threads heraus und gib die bereinigten Daten über einen asynchronen TCP-Stream aus.
78. **Asynchrone GUI mit synchronem Rechenkern**: Simuliere eine Desktop-Oberfläche, die flüssig auf Benutzereingaben reagiert (Async), während komplexe Berechnungen im Hintergrund laufen (Threads).
79. **Batch-Verarbeitungs-Manager**: Sammle eingehende API-Anfragen asynchron, fasse sie in Gruppen zusammen und verarbeite diese Gruppen parallel auf OS-Threads.
80. **Web-Scraper mit persistenter Queue**: Crawle Webseiten asynchron und verwalte die Liste der noch zu besuchenden URLs in einer thread-sicheren, Mutex-geschützte Queue.

---

## 5. Fortgeschrittene Concurrency & Netzwerk-Systeme

Diese Kategorie führt dich tiefer in fortgeschrittene Themen der Nebenläufigkeit und Systemprogrammierung ein. Du beschäftigst dich mit eigenen Executors, lock-freien Datenstrukturen, asynchronen Netzwerkprotokollen und verteilten Systemen.

81. **Eigener Executor für Futures**: Implementiere eine minimale asynchrone Runtime mit einem eigenen Executor und Waker. Du lernst, wie Rusts Futures im Hintergrund abgearbeitet werden und was unter der Haube von Tokio passiert.
82. **Lock-freie Stack-Datenstruktur**: Entwirf einen einfachen Stack, der ohne Mutex oder RwLock auskommt und stattdessen CAS-Operationen (`Compare-and-Swap`) auf atomaren Pointern nutzt. Das führt dich in die lock-freie Programmierung ein.
83. **Mehrbenutzer-Chat per UDP**: Baue einen UDP-basierten Chat-Server, der Nachrichten asynchron empfängt, die Client-Adressen verwaltet und Nachrichten an alle active Teilnehmer zurücksendet.
84. **Asynchroner Proxy-Server**: Entwickle einen HTTP-Proxy, der eingehende TCP-Verbindungen asynchron liest und die Anfragen an das eigentliche Ziel weiterleitet. Du übst das asynchrone Weiterleiten von Datenströmen.
85. **Custom Waker-Implementierung**: Programmiere ein Future, das erst nach einem Ereignis (z.B. einem Tastendruck) feuert, indem du den `Waker` manuell in einer Queue registrierst. Das vertieft dein Verständnis der Rust-Future-Architektur.
86. **Distributed Key-Value-Store (Simuliert)**: Simuliere mehrere Datenbankknoten als asynchrone Tasks, die über Kanäle kommunizieren und Daten konsistent halten müssen. Das führt dich in verteilte Konsensus-Konzepte ein.
87. **TCP-Chat-Server mit Authentifizierung**: Erstelle einen TCP-Chat-Server, bei dem Verbindungen erst nach einer erfolgreichen asynchronen Passworteingabe für den globalen Chat freigeschaltet werden.
88. **Asynchroner DNS-Client**: Sende DNS-Anfragen über UDP asynchron an einen DNS-Server und parse die empfangenen Byte-Pakete im Client. Das übt das bitweise Parsen in einer asynchronen Umgebung.
89. **Lock-freier Ringpuffer (Single-Producer, Single-Consumer)**: Implementiere einen schnellen Puffer für Audio- oder Videodaten, der nur auf atomaren Lese- und Schreibzeigern basiert. Das zeigt dir Hochleistungs-Synchronisationstechniken.
90. **TCP-Port-Scanner**: Programmiere einen schnellen Portscanner, der Hunderte IP-Adressen und Ports parallel asynchron auf Offenheit prüft. Du lernst, wie du viele Verbindungsversuche ohne Thread-Overhead verwaltest.
91. **Dateitransfer-Server mit Flusssteuerung**: Sende große Dateien über TCP und implementiere eine asynchrone Flusssteuerung, um den RAM-Verbrauch auf Sender- und Empfängerseite minimal zu halten.
92. **Raft-Konsensus-Prototyp (Simuliert)**: Modelliere das Raft-Protokoll zur Leader-Wahl in verteilten Systemen, indem du Knoten als asynchrone Tasks mit zufälligen Timeouts implementierst.
93. **Websocket-Chat-Server**: Verwende Tokio zusammen mit einer Websocket-Bibliothek, um einen Echtzeit-Chat für Browser-Clients bereitstellen. Das übt die Anbindung von modernen Webprotokollen.
94. **Asynchrone Ablaufsteuerung (Workflow-Engine)**: Baue eine Engine, die eine Kette von asynchronen Aufgaben mit Abhängigkeiten ausführt (z. B. Task B darf erst starten, wenn Task A erfolgreich abgeschlossen ist).
95. **Netzwerk-Bandbreiten-Limiter**: Schreibe einen TCP-Stream-Wrapper, der die Übertragungsrate asynchron drosselt, indem er nach dem Lesen einer bestimmten Datenmenge pausiert.
96. **Einfaches Actor-Modell**: Implementiere ein minimales Actor-System, bei dem "Aktoren" als eigenständige Tasks laufen und ausschließlich über asynchrone Channels kommunizieren. Das schult dich in alternativen Concurrency-Architekturen.
97. **Sicherer Shutdown-Koordinator**: Entwickle umgehend ein System, das beim Empfang von `Ctrl+C` alle laufenden Netzwerk-Tasks und Datenbankverbindungen benachrichtigt und auf deren sauberes Ende wartet.
98. **Load-Balancer mit Least-Connections-Algorithmus**: Leite eingehende TCP-Verbindungen asynchron an den Backend-Server weiter, der aktuell die wenigsten aktiven Verbindungen hält.
99. **Asynchroner SSH-Tunnel-Simulator**: Simuliere die Verschlüsselung und Weiterleitung von Datenströmen über eine gesicherte asynchrone TCP-Verbindung.
100. **Verteiltes Map-Reduce über TCP**: Implementiere ein echtes verteiltes System, bei dem ein Master-Knoten Berechnungsaufgaben über TCP an Worker-Programme verteilt und die Ergebnisse sammelt. Das verknüpft Netzwerk-I/O, Threading und Serialisierung.
