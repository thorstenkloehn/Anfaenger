# Phase 4: Projektvorschläge zu Modulen, Pfaden & Crates

In dieser Phase lernst du, wie du größere Rust-Projekte organisierst, indem du deinen Code in mehrere Module aufteilst, Importpfade richtig nutzt und externe Bibliotheken (Crates) einbindest. Du wirst erfahren, wie du durch eine klare Kapselung Wartbarkeit und Lesbarkeit deines Codes drastisch verbesserst.

### Was wir wiederholen:
| Thema | Was du wiederholst |
|---|---|
| 🧱 Collections | Dynamische Datenhaltung mit `Vec<T>` und `HashMap<K, V>` |
| 🛡️ Fehlerbehandlung | Fehlerfortpflanzung mit `Result<T, E>` und `Option<T>` |
| 📦 Strukturierung | Eigene Typen mit `struct` und `enum` |

### Neue Themen (in JEDEM Projekt angewendet):
* **Module (`mod`):** Aufteilen von Code in separate Dateien und Ordner.
* **Pfade (`use`, `super`, `crate`):** Navigieren in der Modulhierarchie und gezieltes Importieren von Funktionen und Typen.
* **Kapselung & Sichtbarkeit (`pub`, `pub(crate)`):** Verbergen von Implementierungsdetails und Definieren klarer öffentlicher Schnittstellen.
* **Cargo & Crates:** Einbinden und Nutzen externer Abhängigkeiten aus `crates.io`.

---

## 🧮 Projekt 1: Multi-Modul-CLI-Taschenrechner

### Beschreibung der Funktionsweise
Ein erweiterter Taschenrechner für das Terminal. Das Tool soll über Kommandozeilenparameter mathematische Operationen entgegennehmen und ausführen. Neben Standardoperationen (Addition, Subtraktion, Multiplikation, Division) sollen auch fortgeschrittene Operationen (Potenzen, Fakultät) unterstützt werden. Eine Berechnungshistorie soll optional ausgegeben werden können.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # Einstiegspunkt: Verarbeitet CLI-Argumente, ruft die Logik auf
├── cli.rs             # CLI-Parsing und Argument-Definitionen
├── history.rs         # Speichert und lädt vergangene Berechnungen
└── operations/        # Ordner für Rechenoperationen
    ├── mod.rs         # Modul-Deklaration und API-Re-Exporte
    ├── basic.rs       # Einfache Rechenarten (+, -, *, /)
    └── advanced.rs    # Komplexe Rechenarten (Power, Fakultät)
```

### Zu verwendende Crates
* `clap` (mit `derive`-Feature für sauberes Parsen von Kommandozeilenargumenten)
* `colored` (für farbige Hervorhebung der Ergebnisse im Terminal)

### Didaktische Hinweise
* Nutze `pub use` in `operations/mod.rs`, um die Funktionen aus `basic.rs` und `advanced.rs` auf Modulebene von `operations` verfügbar zu machen (Re-Exporting).
* Achte auf Sichtbarkeiten: Hilfsfunktionen in `basic.rs` sollten ohne `pub` privat bleiben.

---

## 🎲 Projekt 2: Konsolen-Würfelspiel

### Beschreibung der Funktionsweise
Ein interaktives, rundenbasiertes Würfelspiel (z. B. Kniffel-Variante oder 10.000) gegen einen Computerspieler. Der Spieler wählt über ein Konsolenmenü Aktionen aus, während das Spiel den Zustand verwaltet und zufällige Würfelergebnisse generiert.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # Hauptschleife (Main Loop) und Programmstart
├── ui.rs              # Textbasierte Benutzeroberfläche und Eingabe-Helper
├── game/              # Spielverzeichnis
    ├── mod.rs         # Einstiegspunkt für die Spielkomponenten
    ├── rules.rs       # Gewinnbedingungen und Punkteregeln
    └── state.rs       # Spielfluss und Zustand (Punkte, Runden)
```

### Zu verwendende Crates
* `rand` (für das Generieren von Zufallszahlen beim Würfeln)

### Didaktische Hinweise
* Kapsle den Zufallsgenerator (`rand::Rng`) in einem privaten Bereich der Spiel-Logik. Das UI-Modul sollte keine direkte Abhängigkeit zum Crate `rand` benötigen.
* Übe die Nutzung von `super::` innerhalb von `rules.rs`, um auf Strukturen in `state.rs` zuzugreifen.

---

## 📦 Projekt 3: Paket-Tracker (Sendungsverfolgung)

### Beschreibung der Funktionsweise
Ein Tool zur Verwaltung von Postsendungen. Der Nutzer kann Sendungen mit einer ID und einem Status anlegen, aktualisieren und abfragen. Die Daten werden persistent in einer JSON-Datei gespeichert.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # App-Initialisierung und CLI-Menü
├── model.rs           # Datenstrukturen für Paket, Adresse, Status
├── storage.rs         # Laden und Speichern der JSON-Datei
└── tracker.rs         # Logik zur Statusaktualisierung
```

### Zu verwendende Crates
* `serde` (mit dem Feature `derive` zur Serialisierung)
* `serde_json` (für die JSON-Repräsentation der Daten)
* `chrono` (für die Erfassung von Zeitstempeln der Statusänderungen)

### Didaktische Hinweise
* Lerne, wie du externe Traits wie `Serialize` und `Deserialize` auf deine eigenen Structs in `model.rs` anwendest.
* Das Modul `storage` benötigt Zugriff auf `model::Paket`. Überlege, wie du den Pfad dorthin über `crate::model::Paket` referenzierst.

---

## 🌤️ Projekt 4: Wetter-Informations-CLI

### Beschreibung der Funktionsweise
Ein Tool, das Wetterdaten für eine eingegebene Stadt abfragt. Da Netzwerkabfragen in Rust meist asynchron sind, nutzt dieses Projekt eine asynchrone Laufzeitumgebung, um eine Web-API abzufragen und das JSON-Ergebnis formatiert auszugeben.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # Einstiegspunkt, startet die asynchrone Laufzeit
├── api.rs             # Durchführung des HTTP-Requests
├── parser.rs          # Extraktion der relevanten Wetterdaten aus dem API-JSON
└── display.rs         # Formatierte Ausgabe der Wetterdaten
```

### Zu verwendende Crates
* `reqwest` (für HTTP-Anfragen, mit dem Feature `json`)
* `tokio` (als asynchrone Runtime mit dem Feature `macros` und `rt-multi-thread`)
* `serde` (zur Abbildung der API-Antwort auf Rust-Structs)

### Didaktische Hinweise
* Hier erfährst du, wie asynchroner Code (`async`/`await`) die Signatur von Funktionen in Modulen beeinflusst.
* Achte darauf, wie Fehlertypen von `reqwest` in `api.rs` behandelt und in ein anwendungsfreundliches `Result` übersetzt werden.

---

## 🔑 Projekt 5: Passwort-Manager

### Beschreibung der Funktionsweise
Ein lokaler, sicherer Passwort-Manager. Der Nutzer authentifiziert sich über ein Master-Passwort (das verdeckt eingegeben wird). Die Passwörter werden verschlüsselt in einer lokalen Datei gespeichert und können über das CLI abgerufen oder neu hinzugefügt werden.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # Einstiegspunkt und Interaktionsschleife
├── crypto.rs          # Verschlüsselung und Entschlüsselung
├── storage.rs         # Dateizugriffe und Struktur der Passwort-Datenbank
└── ui.rs              # Sichere Passworteingabe und Konsolenmenü
```

### Zu verwendende Crates
* `rpassword` (für das Einlesen des Master-Passworts, ohne es im Terminal anzuzeigen)
* `aes-gcm` oder `simple-crypt` (für kryptografische Operationen)
* `serde` (für die Strukturierung der Datenbankdatei)

### Didaktische Hinweise
* Sensible Datenströme: Achte darauf, dass die Krypto-Geheimnisse ausschließlich im Speicher von `crypto.rs` verarbeitet werden und nicht unnötig über öffentliche Modulschnittstellen nach außen dringen.
* Verwende `pub(crate)` für Hilfsfunktionen, die nur innerhalb deines eigenen Crates, aber nicht für externe Nutzer (falls es eine Bibliothek wäre) sichtbar sein sollen.

---

## 📝 Projekt 6: Markdown-zu-HTML-Konverter

### Beschreibung der Funktionsweise
Ein CLI-Utility, das eine angegebene Markdown-Datei (`.md`) einliest, die Syntax analysiert, in HTML übersetzt und das Ergebnis in einer neuen HTML-Datei abspeichert.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # Argument-Verarbeitung (Ein-/Ausgabepfade)
├── file_io.rs         # Validierung, Lesen und Schreiben von Dateien
└── converter.rs       # Logik zur Markdown-Übersetzung
```

### Zu verwendende Crates
* `pulldown-cmark` (ein hocheffizienter Markdown-Parser für Rust)

### Didaktische Hinweise
* Unterscheide zwischen Dateipfaden im Betriebssystem (`std::path::PathBuf` in `file_io.rs`) und Modul-Pfaden (`crate::file_io` in Rust).
* Implementiere eine Fehlerkapselung: Der Konverter sollte Fehler aus dem Dateisystem in eigene Fehlertypen übersetzen.

---

## 📅 Projekt 7: Kommandozeilen-Aufgabenplaner (ToDo-App)

### Beschreibung der Funktionsweise
Eine ToDo-App, bei der Aufgaben Prioritäten (Niedrig, Mittel, Hoch) und Fälligkeitsdaten besitzen. Der Nutzer kann Aufgaben nach Priorität filtern, durchsuchen und als erledigt markieren.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # CLI-Kommando-Routing
├── io.rs              # Konsolenausgaben und Tastatur-Eingaben
└── todo/              # Das Kernmodul für die Aufgabenverwaltung
    ├── mod.rs         # Definition der Hauptliste und Schnittstellen
    ├── task.rs        # Structs und Enums für einzelne Aufgaben und Prioritäten
    └── search.rs      # Such- und Filteralgorithmen
```

### Zu verwendende Crates
* `serde` (zur dauerhaften Speicherung der Aufgabenliste)
* `chrono` (für das Verwalten von Fälligkeitsterminen)

### Didaktische Hinweise
* Strukturierung verschachtelter Module: `search.rs` muss auf das Struct `Task` in `task.rs` zugreifen. Lerne, wie du das über `super::task::Task` oder `crate::todo::task::Task` löst.
* Re-exportiere wichtige Typen in `todo/mod.rs`, damit die `main.rs` nicht tief in die Ordnerstruktur greifen muss.

---

## 📐 Projekt 8: Universeller Einheiten-Konverter

### Beschreibung der Funktionsweise
Ein mathematisches Hilfswerkzeug, das Werte zwischen verschiedenen physikalischen Einheiten (z. B. Celsius/Fahrenheit, Meter/Fuß, Kilogramm/Pfund) umrechnet. Dieses Projekt verzichtet bewusst auf externe Crates, um den Fokus vollständig auf Rusts Modulsystem zu legen.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # Interaktives Konsolenmenü
├── ui.rs              # Formatierung der Benutzereingaben
└── converters/        # Container-Modul für Umrechnungen
    ├── mod.rs         # Einstiegspunkt und API-Re-Exporte
    ├── length.rs      # Logik für Längenmaße
    ├── weight.rs      # Logik für Gewichte
    └── temperature.rs # Logik für Temperaturen
```

### Zu verwendende Crates
* *Keine* (Fokus rein auf die Rust-Standardbibliothek)

### Didaktische Hinweise
* Nutze dieses Projekt, um die Vorteile einer "flachen API" zu verstehen: Die `main.rs` soll alle Konverter direkt über `converters::convert_length(...)` aufrufen können, ohne wissen zu müssen, dass der Code physisch in `converters/length.rs` liegt.
* Nutze `pub(self)` oder lasse Funktionen ohne Modifikator, um interne Hilfskonstanten (z. B. Umrechnungsfaktoren) im jeweiligen Modul zu kapseln.

---

## 🗺️ Projekt 9: Textbasiertes RPG-Adventure

### Beschreibung der Funktionsweise
Ein Textadventure, bei dem sich der Spieler durch verschiedene Räume bewegt, Gegenstände einsammelt und gegen Monster kämpft. Die Anzeige im Terminal soll dynamisch aktualisiert werden.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # Initialisierung und Game Loop
├── player.rs          # Spieler-Status (Leben, Inventar)
├── engine.rs          # Steuerung von Spielrunden und Aktionen
└── world/             # Modul für die Spielwelt
    ├── mod.rs         # Raum- und Kartenstruktur
    ├── map.rs         # Layout der Spielkarte
    └── combat.rs      # Kampfbegegnungen in Räumen
```

### Zu verwendende Crates
* `crossterm` (für Terminalsteuerung: Cursor-Manipulation, Farbausgabe und Key-Event-Listening)

### Didaktische Hinweise
* **Zirkuläre Abhängigkeiten vermeiden:** Dies ist eine häufige Falle für Einsteiger. Wenn `player.rs` das Modul `world.rs` benötigt und umgekehrt, überlege, wie du Daten über Parameter in Funktionen übergibst, anstatt Module eng zu koppeln.
* Kapselung: Halte den internen Zustand der Karte in `world/map.rs` privat und erlaube den Zugriff nur über definierte Methoden.

---

## 📊 Projekt 10: CSV-Daten-Analysator

### Beschreibung der Funktionsweise
Ein Tool, das eine CSV-Datei (z. B. Verkaufsdaten oder Sensormessungen) einliest, statistische Berechnungen (Mittelwert, Median, Min/Max) durchführt und die Ergebnisse gefiltert in eine neue Datei schreibt.

### Strukturierte Modul-Aufteilung
```text
src/
├── main.rs            # CLI-Steuerung und Programmablauf
├── reader.rs          # Einlesen und Validieren der CSV-Daten
├── stats.rs           # Mathematische Analysefunktionen
└── writer.rs          # Strukturierte Ausgabe in Datei oder Konsole
```

### Zu verwendende Crates
* `csv` (für effizientes Lesen und Schreiben von CSV-Dateien)
* `serde` (für das automatische Mapping von CSV-Zeilen auf Structs)

### Didaktische Hinweise
* Entkopplung: Der Algorithmus in `stats.rs` sollte unabhängig von der CSV-Struktur arbeiten. Er sollte lediglich mit Standard-Rust-Datentypen (z. B. `Vec<f64>`) gefüttert werden.
* Fehlerweiterleitung: Lass `reader.rs` Fehler über `?` zurückgeben, damit `main.rs` die Fehler dem Benutzer verständlich präsentieren kann.
