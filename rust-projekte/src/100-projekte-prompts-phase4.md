# 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 4 – Module, Pfade, Packages & Crates)

In diesem Kapitel erarbeitest du die 100 Projekte aus **Phase 4 (Module, Pfade, Packages & Crates)** Schritt für Schritt mithilfe von künstlicher Intelligenz (KI), ohne fertigen Code abzuschreiben.
Das Ziel ist das **passive Auffrischen** und aktive Verstehen der Projekt-, Modul- und Datenstrukturen in Rust.

| Thema | Was du lernst |
| :--- | :--- |
| 📦 Structs & Methoden | Eigene Datenstrukturen entwerfen und mit `impl` logische Funktionen anhängen |
| 🏷️ Enums | Feste Zustände und Kategorien modellieren |
| 🔍 Pattern Matching | Strukturierter Kontrollfluss mit `match` (vollständig) und kompaktem `if let` |
| 🗃️ Collections & Fehler | `Vec<T>`, `HashMap<K, V>`, `Result<T, E>` und `Option<T>` |
| 📂 Module & Sichtbarkeit | Code aufteilen mit `mod`, Kapselung mit `pub` und `pub(crate)` |
| 🔗 Pfade & Importe | Navigieren mit `use`, `super`, `self` und `crate`, Re-Exporting |
| 📚 Packages, Cargo & Crates | Strukturierung in Packages mit Cargo und Einbinden von externen Bibliotheken aus crates.io in der `Cargo.toml` |

---
## Der modulare Prompt-Katalog für alle 100 Projekte (Phase 4)
Hier findest du für jedes Projekt den genauen modularen Ablauf mit Präzisions-Prompts. Kopiere diese in den Chat mit deiner KI.
## 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 4 – Teil 1: 1 bis 25)

In diesem Kapitel erarbeitest du die ersten 25 Projekte aus **Phase 4 (Module, Pfade, Packages & Crates)** Schritt für Schritt mithilfe von künstlicher Intelligenz (KI), ohne fertigen Code abzuschreiben.
Das Ziel ist das **passive Auffrischen** und aktive Verstehen von Modularisierung, Importpfaden, Kapselung und externen Abhängigkeiten in Rust.

| Thema | Was du lernst |
| :--- | :--- |
| 📦 Module (`mod`) | Aufteilen von Code in separate Dateien und Ordner. |
| 🗺️ Pfade (`use`, `super`, `crate`) | Navigieren in der Modulhierarchie und Importieren von Elementen. |
| 🛡️ Sichtbarkeit (`pub`, `pub(crate)`) | Kapselung von Daten und gezieltes Verbergen von Implementierungsdetails. |
| 🔗 Packages, Cargo & Crates | Strukturierung in Packages mit Cargo und Einbinden und Nutzen externer Bibliotheken. |

---

### Projekt 1: Multi-Modul-CLI-Taschenrechner

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen und die Modulstruktur für einen Multi-Modul-Taschenrechner in Rust. Wir haben ein Modul `operations` mit den Untermodulen `basic` und `advanced` sowie ein Modul `history`. Definiere im Modul `history` das Struct `Calculation` mit den Feldern `expression: String` (der Rechenweg) und `result: f64` (das Ergebnis). Die Felder von `Calculation` sollen öffentlich sein. Im Modul `operations::basic` deklarierst du einfache Funktionen für Addition, Subtraktion, Multiplikation und Division. Im Modul `operations::advanced` deklarierst du Funktionen für Potenzen und Fakultäten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere das Projekt um die Methoden und Re-Exporte. In `operations/mod.rs` re-exportierst du alle Funktionen aus `basic` und `advanced` mit `pub use`, um dem Hauptprogramm eine flache API zu bieten. Im Modul `history` erstellst du ein Struct `History` mit einem privaten Feld `records: Vec<Calculation>` und implementierst eine öffentliche Methode `add_record(&mut self, record: Calculation)` sowie eine Methode `show_history(&self)` zur Ausgabe aller vergangenen Berechnungen. Achte darauf, dass die Berechnungshistorie selbst nicht direkt manipuliert werden kann."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle das CLI-Modul `cli` und die `main.rs` für den Taschenrechner. Binde das externe Crate `clap` (mit dem `derive`-Feature) ein, um mathematische Ausdrücke über Kommandozeilenparameter entgegenzunehmen. Nutze das Crate `colored` für eine farbige Hervorhebung der Ergebnisse im Terminal. Verarbeite die CLI-Argumente in `main.rs`, rufe die re-exportierten Funktionen aus `operations` auf, füge das Ergebnis der `History` hinzu und gib die Historie sowie das aktuelle Ergebnis formatiert auf der Konsole aus."

---

### Projekt 2: Konsolen-Würfelspiel

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für ein rundenbasiertes Würfelspiel. Wir haben ein Modul `game` mit den Untermodulen `state` und `rules`. Definiere im Modul `game::state` das Struct `GameState` mit den Feldern `player_score: u32`, `computer_score: u32` und `round: u32`. Definiere im Modul `game::rules` ein Enum `RoundResult` mit den Werten `PlayerWins`, `ComputerWins` und `Draw`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere das Spiel um die Logik. Implementiere im Modul `game::state` Methoden zum Erhöhen der Punkte und Rundenanzahl. Im Modul `game::rules` implementierst du eine Funktion `evaluate_round(player_roll: u32, computer_roll: u32) -> RoundResult`. Verwende das Crate `rand` privat im `game`-Modul, um Würfe zu simulieren. Das UI-Modul darf keine direkte Abhängigkeit zum Crate `rand` besitzen. Nutze `super::` innerhalb der Untermodule, um auf Geschwistermodule zuzugreifen."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle das Modul `ui` für die Interaktion mit dem Benutzer und die `main.rs`. Im Modul `ui` soll der Benutzer zur Eingabe aufgefordert werden, ob er würfeln oder das Spiel beenden möchte. In `main.rs` steuerst du die Hauptschleife des Spiels, aktualisierst den Zustand in `GameState` und gibst nach jeder Runde die Ergebnisse farbig aus, bis das Spiel beendet wird."

---

### Projekt 3: Paket-Tracker (Sendungsverfolgung)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für eine Sendungsverfolgung. Wir haben die Module `model`, `storage` und `tracker`. Definiere in `model` ein Enum `Status` mit den Werten `InZustellung`, `Zugestellt` und `Verzoegert`. Definiere in `model` das Struct `Paket` mit den Feldern `id: String`, `status: Status` und `zeitstempel: DateTime<Utc>` aus dem Crate `chrono`. Verwende `serde` (mit `derive`), damit das Struct serialisiert werden kann."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Speicherlogik und Aktualisierungen. In `storage` implementierst du Funktionen zum Laden und Speichern einer Liste von Paketen in einer JSON-Datei mit `serde_json`. In `tracker` implementierst du eine Funktion, die den Status eines Pakets aktualisiert und den Zeitstempel neu setzt. Referenziere das Struct `Paket` in `storage` und `tracker` über den absoluten Modulpfad `crate::model::Paket`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle das Hauptprogramm in `main.rs`. Biete dem Benutzer über ein einfaches Konsolenmenü die Optionen: 1) Neues Paket anlegen, 2) Paketstatus aktualisieren, 3) Alle Pakete anzeigen. Lade beim Start vorhandene Daten aus der JSON-Datei und speichere Änderungen persistent ab. Gib Statusänderungen verständlich im Terminal aus."

---

### Projekt 4: Wetter-Informations-CLI

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für eine Wetter-CLI. Wir haben die Module `api`, `parser` und `display`. Definiere in `parser` die Datenstrukturen `WeatherData` mit den Feldern `temp: f64`, `humidity: u32` und `description: String`. Verwende `serde::Deserialize` auf diesen Datenstrukturen, um sie auf die API-Antwort vorzubereiten."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die API-Abfrage. Nutze eine asynchrone Funktion in `api` unter Verwendung des Crates `reqwest` (mit `json`-Feature), um Wetterdaten für einen Stadtnamen abzufragen. Verwende die asynchrone Runtime `tokio` (mit `macros` und `rt-multi-thread` Features). Die API-Abfrage soll das JSON-Ergebnis an `parser` übergeben und Fehler in ein anwendungsfreundliches `Result` übersetzen."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Implementiere in `display` die formatierte Ausgabe der Wetterdaten. In `main.rs` startest du die asynchrone Runtime von `tokio`, liest den Stadtnamen von der Konsole ein, rufst die Wetterdaten über `api` ab und gibst diese mit `display` farbig und übersichtlich auf Deutsch aus."

---

### Projekt 5: Passwort-Manager

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für einen sicheren Passwort-Manager. Wir haben die Module `crypto`, `storage` und `ui`. Definiere in `storage` das Struct `PasswordEntry` mit den Feldern `website: String`, `username: String` und `encrypted_password: Vec<u8>`. Implementiere das Crate `serde` auf `PasswordEntry` zur Serialisierung."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Krypto- und Speicherfunktionen. In `crypto` implementierst du Funktionen zur Verschlüsselung und Entschlüsselung von Text unter Verwendung des Crates `aes-gcm` (oder `simple-crypt`). Halte Krypto-Interna privat im Modul und nutze `pub(crate)` für Hilfsfunktionen, die nur innerhalb deines Crates sichtbar sein sollen. In `storage` implementierst du das Laden und Speichern der verschlüsselten Passwörter in einer Datei."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle in `ui` eine sichere Abfrage des Master-Passworts unter Verwendung des Crates `rpassword`, ohne dass die Eingabe im Terminal angezeigt wird. In `main.rs` steuerst du den Ablauf: Authentifiziere den Nutzer, entschlüssele die Passwörter im Speicher und biete Optionen zum Suchen, Hinzufügen und Speichern von Anmeldedaten."

---

### Projekt 6: Markdown-zu-HTML-Konverter

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für einen Markdown-Konverter. Wir haben die Module `file_io` und `converter`. Definiere in `converter` die Schnittstelle für die Übersetzungslogik. Nutze `std::path::PathBuf` in `file_io` zur Übergabe von Dateipfaden."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Dateiverarbeitung und Konvertierung. In `file_io` implementierst du das Einlesen von Dateien und das Schreiben des HTML-Outputs. In `converter` implementierst du den Übersetzungsprozess unter Verwendung des Crates `pulldown-cmark`. Übersetze Betriebssystem- und Dateifehler in einen eigenen Fehlertyp `ConverterError`, um sie sicher nach oben weiterzuleiten."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Implementiere die CLI-Argumenten-Verarbeitung in `main.rs`. Nimm den Eingabepfad (`.md`) und den Ausgabepfad (`.html`) entgegen, validiere diese mit `file_io`, führe die Konvertierung mit `converter` aus und gib bei Erfolg eine Erfolgsmeldung aus."

---

### Projekt 7: Kommandozeilen-Aufgabenplaner (ToDo-App)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für eine ToDo-App. Wir haben ein Modul `todo` mit den Untermodulen `task` und `search`, sowie das Modul `io` für Terminalausgaben. Definiere in `todo::task` das Enum `Priority` (Low, Medium, High) und das Struct `Task` mit `title: String`, `priority: Priority` und `due_date: DateTime<Utc>` aus dem Crate `chrono`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere die ToDo-App um Such- und Filterfunktionen. In `todo::search` implementierst du Funktionen zur Suche nach Titel oder Priorität. Nutze `super::task::Task`, um auf den Typ zuzugreifen. In `todo/mod.rs` verwaltest du die Aufgabenliste in einer `HashMap` und re-exportierst wichtige Typen mittels `pub use` für eine flache API."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle das Hauptprogramm in `main.rs`. Verarbeite CLI-Eingaben für Befehle wie 'hinzufügen', 'anzeigen', 'suchen' und 'erledigen'. Persistiere die Aufgabenliste mittels `serde` in einer Datei und stelle sicher, dass ungültige Eingaben abgefangen werden."

---

### Projekt 8: Universeller Einheiten-Konverter

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle das Modul `converters` mit den Untermodulen `length`, `weight` und `temperature`. Deklariere in jedem Untermodul private Konstanten für Umrechnungsfaktoren (z. B. Meter zu Fuß, Kilogramm zu Pfund)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere in den Untermodulen die Umrechnungsfunktionen (z. B. `celsius_to_fahrenheit`, `meters_to_feet`). In `converters/mod.rs` re-exportierst du alle Umrechnungsfunktionen mittels `pub use`. Halte interne Hilfsberechnungen privat, um eine saubere Kapselung zu üben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `ui` für die Formatierung von Ausgaben. In `main.rs` erstellst du ein interaktives Menü. Der Benutzer wählt die Kategorie und den Wert. Die Konvertierung soll direkt über `converters::convert_...` aufgerufen werden können, ohne dass das Hauptprogramm die Untermodule importieren muss."

---

### Projekt 9: Textbasiertes RPG-Adventure

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für ein RPG-Textadventure. Wir haben die Module `player`, `engine` und `world` (mit den Untermodulen `map` und `combat`). Definiere in `player` das Struct `Player` mit den Feldern `name: String`, `hp: u32` und `inventory: Vec<String>`. Definiere in `world::map` das Struct `Room` mit `description: String` und `items: Vec<String>`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Interaktionen. Um zirkuläre Abhängigkeiten zu vermeiden, übergibst du den `Player` als veränderliche Referenz in die Funktionen von `world::combat` und `engine`. Nutze das Crate `crossterm` für Terminalsteuerungen (Cursor, Farben). Halte den Kartenzustand in `world::map` privat."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle das Hauptprogramm in `main.rs`. Initialisiere den Spieler, erstelle die Karte in `world` und starte die Hauptschleife in `engine`. Lass den Spieler Aktionen eintippen und bewege ihn durch die Räume des Spiels."

---

### Projekt 10: CSV-Daten-Analysator

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für einen CSV-Analysator. Wir haben die Module `reader`, `stats` und `writer`. Definiere in `reader` ein Struct `SalesRecord` mit den Feldern `product: String`, `revenue: f64` und `quantity: u32` für das automatische Mapping mittels `serde`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Datenverarbeitung. Lass `reader` die CSV-Datei einlesen unter Verwendung des Crates `csv` und gib eventuelle Fehler an das Hauptprogramm zurück. In `stats` implementierst du Berechnungsfunktionen wie Mittelwert und Median. Achte darauf, dass `stats` entkoppelt ist und nur mit Standardtypen (z. B. `Vec<f64>`) arbeitet."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Implementiere `main.rs`. Lies den Pfad einer CSV-Datei ein, filtere und analysiere die Daten über `stats` und schreibe die aggregierten Statistiken mit dem Modul `writer` in eine neue Datei oder gib sie formatiert aus."

---

### Projekt 11: Flugzeug-Reservierungen

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für ein Flugzeug-Reservierungssystem. Wir haben das Modul `flights` mit den Untermodulen `seating` und `booking`. Definiere in `flights::seating` ein Struct `Seat` mit den Feldern `sitz_id: String` und `passagier: Option<String>` (mit dem Passagiernamen im `Some`-Fall, sonst `None`)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Buchungslogik. In `flights::booking` definierst du das Struct `Flight` mit `seats: Vec<Seat>`. Implementiere eine Methode `find_passenger(&self, sitz_id: &str) -> Option<&str>`, die eine Referenz auf den Passagiernamen zurückgibt. Nutze relative Pfade wie `super::seating::Seat`, um auf das Struct zuzugreifen. Halte den Vektor privat."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Erzeuge eine Instanz von `Flight`, füge Sitzplätze hinzu (einige reserviert, andere frei) und suche nach Passagieren auf bestimmten Sitzplätzen. Werte die Rückgabewerte mit Pattern Matching aus und gib das Ergebnis auf Deutsch aus."

---

### Projekt 12: Playlist-Suche

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für einen Playlist-Manager. Wir haben ein Modul `music` mit den Untermodulen `track` und `playlist_manager`. Definiere in `music::track` das Struct `Song` mit den Feldern `title: String`, `artist: String` und `duration: u32` (Dauer in Sekunden). Halte die Felder privat und biete öffentliche Getter an."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Verwaltungslogik. In `music::playlist_manager` definierst du das Struct `Playlist` mit `songs: Vec<Song>`. Implementiere eine Methode `search_by_artist(&self, artist: &str) -> Vec<&Song>`. Nutze `super::track::Song` für die Pfade. Re-exportiere in `music/mod.rs` das Struct `Playlist` und die `Song`-Struktur flach."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Erstelle eine `Playlist`, füge Songs hinzu, suche nach Liedern eines bestimmten Künstlers und gib die Treffer sowie die Gesamtlaufzeit der gefundenen Songs übersichtlich aus."

---

### Projekt 13: Elektroauto-Finder

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für ein Elektroauto-Verzeichnis. Wir haben ein Modul `cars` mit den Untermodulen `database` und `search`. Definiere in `cars::database` das Struct `ElectricCar` mit den Feldern `model: String`, `range: u32` (Reichweite in km) und `price: f64`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Suche. In `cars::search` implementierst du eine Funktion `find_efficient_cars(inventory: &[ElectricCar], max_price: f64) -> Vec<&ElectricCar>`. Verwende relative Pfade (`super::database::ElectricCar`) und re-exportiere die Suchfunktion in `cars/mod.rs` mittels `pub use`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Lege eine Liste von Elektroautos an, frage das Budget des Benutzers über die Konsole ab, rufe die re-exportierte Suchfunktion auf und gib passende Autos oder eine Fehlermeldung aus, falls keine vorhanden sind."

---

### Projekt 14: Wunschzettel-Sortierung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für einen Wunschzettel-Organizer. Wir haben das Modul `wishlist` mit den Untermodulen `item` und `sorter`. Definiere in `wishlist::item` das Struct `WishItem` mit den Feldern `name: String`, `price: f64` und `priority: u32` (1 bis 5)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Sortierlogik. In `wishlist::sorter` definierst du eine Funktion `sort_by_priority(items: &mut [WishItem])`, die die Liste sortiert. Nutze `super::item::WishItem`. Setze die Sichtbarkeit der Sortierfunktion auf `pub(crate)`, damit sie nur innerhalb des Wunschzettel-Pakets nutzbar ist."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Erstelle eine Liste von Geschenkwünschen, sortiere diese über das `wishlist`-Modul und gib die sortierte Liste im Terminal aus. Verwende das Crate `colored` für eine ansprechende Formatierung."

---

### Projekt 15: Spieler-Matchmaking

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für ein Matchmaking-System. Wir haben ein Modul `matchmaker` mit den Untermodulen `player` und `queue`. Definiere in `matchmaker::player` das Struct `Player` mit den Feldern `name: String`, `rank: u32` und `ping: u32`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Warteschlange. In `matchmaker::queue` definierst du das Struct `MatchQueue` mit `players: Vec<Player>`. Schreibe eine Methode `find_match(&mut self) -> Option<(Player, Player)>`, die zwei Spieler mit ähnlichem Rang (Differenz max. 100 Punkte) paart und aus dem Vektor entfernt. Nutze `super::player::Player`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Nutze das Crate `rand`, um zufällige Spieler mit verschiedenen Rängen zu erstellen und in die Warteschlange einzufügen. Rufe `find_match` auf und gib die gematchten Spieler auf der Konsole aus."

---

### Projekt 16: Tierpensions-Suche

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für eine Tierpension. Wir haben ein Modul `pension` mit den Untermodulen `room` und `booking`. Definiere in `pension::room` das Enum `PetType` (Dog, Cat, Bird) und das Struct `PensionRoom` mit `room_id: u32`, `capacity: u32` und `allowed_pet: PetType`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Zimmerverwaltung. In `pension::booking` definierst du das Struct `BookingSystem` mit `rooms: Vec<PensionRoom>`. Implementiere eine Methode `book_room(&mut self, pet: PetType) -> Result<u32, String>`, die ein passendes, freies Zimmer sucht und dessen ID zurückgibt. Nutze Pfade relativ zu `room` und kapsle die Zimmerbelegung privat."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Erzeuge ein `BookingSystem` mit einer Auswahl an Zimmern. Teste das Einchecken von verschiedenen Haustieren (Hunde, Katzen) und fange den Fall, dass kein passendes Zimmer frei ist, sauber ab."

---

### Projekt 17: Logbuch-Suche

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für eine Log-Suche. Wir haben die Module `logger` und `parser`. Definiere in `logger` ein Struct `LogEntry` mit den Feldern `timestamp: DateTime<Utc>` aus dem Crate `chrono`, `level: String` (INFO, WARN, ERROR) und `message: String`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere das Filtern. In `parser` definierst du eine Funktion `filter_logs(logs: &[LogEntry], level: &str) -> Vec<LogEntry>`. Nutze `crate::logger::LogEntry` für den Pfad. Implementiere die Serialisierung mit `serde`, um Logdaten persistent in einer Datei zu sichern."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Erzeuge Test-Logeinträge, filtere nach ERROR-Meldungen und gib diese mit dem Crate `colored` farbig im Terminal aus (rot für ERROR, gelb für WARN)."

---

### Projekt 18: Rezept-Finder

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für ein Kochbuch. Wir haben ein Modul `cookbook` mit den Untermodulen `recipe` und `search`. Definiere in `cookbook::recipe` das Struct `Recipe` mit `name: String`, `ingredients: Vec<String>` und `preparation_time: u32` (in Minuten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Suche. In `cookbook::search` schreibst du eine Funktion `find_by_ingredients(recipes: &[Recipe], available: &[String]) -> Vec<Recipe>`. Nutze relative Pfade wie `super::recipe::Recipe`. Re-exportiere in `cookbook/mod.rs` die Suchfunktion flach."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Befülle das Kochbuch mit Rezepten. Lies vom Benutzer eine Liste vorhandener Zutaten ein, suche nach kochbaren Rezepten und gib diese sortiert nach der Zubereitungszeit aus."

---

### Projekt 19: Lieferdienst

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für einen Lieferdienst. Wir haben ein Modul `delivery` mit den Untermodulen `order` und `routing`. Definiere in `delivery::order` das Struct `Order` mit `id: String`, `address: String` und `weight: f64`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Routenberechnung. In `delivery::routing` definierst du das Struct `Route` mit `orders: Vec<Order>`. Implementiere eine Methode `calculate_route(&self) -> Vec<String>` (eine geordnete Liste von Adressen). Halte die Berechnungsalgorithmen privat."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Erzeuge Bestellungen, füge sie einer Route hinzu und gib den optimalen Lieferweg formatiert auf der Konsole aus. Nutze `serde`, um die Bestellliste beim Start zu laden."

---

### Projekt 20: Vereinsmitglieder

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für eine Mitgliederverwaltung. Wir haben ein Modul `club` mit den Untermodulen `member` und `finance`. Definiere in `club::member` das Struct `Member` mit den Feldern `id: u32`, `name: String` und `has_paid: bool`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Buchungslogik. In `club::finance` definierst du das Struct `Treasury` mit `balance: f64` und `members: Vec<Member>`. Implementiere eine Methode `collect_fee(&mut self, id: u32, amount: f64) -> Result<(), String>`. Kapsle die Finanzen privat im Modul."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Erzeuge Mitglieder, verbuche Beiträge und verwalte die Vereinskasse. Fange Fehler ab, wenn eine Zahlung für ein nicht existierendes Mitglied gebucht werden soll."

---

### Projekt 21: Paket-Tracker

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für ein Logistikzentrum. Wir haben ein Modul `logistics` mit den Untermodulen `parcel` und `status`. Definiere in `logistics::parcel` das Struct `LogisticsParcel` mit den Feldern `tracking_number: String` und `destination: String`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Statusupdates. In `logistics::status` definierst du ein Enum `LogisticsStatus` (InTransit, Sorted, OutForDelivery). Nutze `super::parcel::LogisticsParcel` und `chrono` für Zeitstempel. Re-exportiere die Kernkomponenten in `logistics/mod.rs`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Erstelle Pakete, aktualisiere den Status und lasse den aktuellen Standort mittels `serde_json` speichern."

---

### Projekt 22: Notaufnahme

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für eine Notaufnahme. Wir haben ein Modul `triage` mit den Untermodulen `patient` und `priority_queue`. Definiere in `triage::patient` das Struct `EmergencyPatient` mit `name: String` und `urgency: u32` (Dringlichkeit von 1 bis 5)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Priorisierung. In `triage::priority_queue` definierst du das Struct `TriageQueue` mit `patients: Vec<EmergencyPatient>`. Implementiere eine Methode `next_patient(&mut self) -> Option<EmergencyPatient>`, die den Patienten mit der höchsten Dringlichkeit zurückgibt und aus der Liste löscht."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Nimm simulierte Patienten mit unterschiedlichen Symptomen auf, weise ihnen eine Priorität zu und simuliere die Behandlungsreihenfolge in der Notaufnahme."

---

### Projekt 23: Student ohne Note

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für ein Notenverzeichnis. Wir haben das Modul `grading` mit den Untermodulen `student` und `database`. Definiere in `grading::student` das Struct `Student` mit den Feldern `id: u32` und `name: String`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Notenverwaltung. In `grading::database` definierst du das Struct `GradeDb` mit einer `HashMap<u32, Option<u32>>` (Studenten-ID zu Note). Implementiere eine Methode `get_grade(&self, student_id: u32) -> Result<Option<u32>, String>`. Kapsle die HashMap privat."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Füge Studenten der Datenbank hinzu, trage Noten ein (wobei unbenotete Fächer mit `None` abgebildet werden) und gib den Notenspiegel aus (nutze Pattern Matching, um Studenten ohne Note gesondert aufzulisten)."

---

### Projekt 24: Kältester Ort

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für eine Wetteranalyse. Wir haben ein Modul `weather` mit den Untermodulen `station` and `analysis`. Definiere in `weather::station` das Struct `WeatherStation` mit den Feldern `name: String` und `temperature: f64`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die statistischen Methoden. In `weather::analysis` definierst du die Funktion `find_coldest(stations: &[WeatherStation]) -> Option<&WeatherStation>`. Nutze `super::station::WeatherStation` und re-exportiere die Funktion flach."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Definiere Wetterstationen in ganz Deutschland, trage simulierte Temperaturen ein, ermittle die kälteste Station und gib das Ergebnis farbig mit dem Crate `colored` aus."

---

### Projekt 25: Vokabelbox

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Modulstruktur für einen Vokabeltrainer. Wir haben ein Modul `vocab` mit den Untermodulen `card` und `box_manager`. Definiere in `vocab::card` das Struct `Flashcard` mit den Feldern `foreign: String` and `native: String`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Implementiere die Vokabelbox. In `vocab::box_manager` definierst du das Struct `VocabBox` mit `cards: HashMap<u32, Vec<Flashcard>>` (Fachnummer zu Karteikarten). Implementiere Methoden zum Verschieben von Karten zwischen Fächern. Verwende `serde` zur dauerhaften JSON-Speicherung."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main.rs`. Implementiere die Interaktionsschleife zum Abfragen von Vokabeln, zum Verschieben bei richtiger Antwort in das nächste Fach und gib Lernstatistiken auf der Konsole aus."

---

## 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 4) – Teil 2 (Projekte 26 bis 50)

In diesem Abschnitt findest du die Präzisions-Prompts für die Projekte 26 bis 50 der Phase 4. Der Fokus liegt hierbei auf der Strukturierung von Code in Module, der Nutzung von Pfaden und Importen (`use`, `crate`, `super`) sowie der Steuerung der Kapselung und Sichtbarkeit (`pub`).

---

### Projekt 26: Status-Manager (Klimaanlage 26)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `devices` (z. B. als separate Datei `devices.rs` oder als Inline-Modul `mod devices`). Definiere darin ein öffentliches Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere außerdem ein öffentliches Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Stelle sicher, dass sowohl das Struct als auch alle seine Felder mit `pub` markiert sind, damit andere Module darauf zugreifen können."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `manager` (z. B. als separate Datei `manager.rs` oder als Inline-Modul `mod manager`). Importiere darin das Struct `Geraet` und das Enum `GeraeteStatus` aus dem Modul `devices` über einen absoluten Pfad (z. B. `use crate::devices::{Geraet, GeraeteStatus}`). Definiere im Modul `manager` ein öffentliches Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`. Implementiere für `StatusManager` eine öffentliche Methode `geraet_hinzufuegen(&mut self, g: Geraet)` und eine öffentliche Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID suchen und seinen Status ändern, oder andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `devices` und `manager`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::devices::Geraet` und `use crate::manager::StatusManager`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Klimaanlage', der ID 26 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts und teste auch den Fehlerfall mit einer ungültigen ID. Behandle alle Ergebnisse sicher mit Pattern Matching (z. B. `match` oder `if let`) und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 27: Ticket-System (Ticket 27)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `tickets` (z. B. als separate Datei `tickets.rs` oder als Inline-Modul `mod tickets`). Definiere darin ein öffentliches Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere außerdem ein öffentliches Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Stelle sicher, dass das Struct und alle seine Felder mit `pub` markiert sind, um sie für andere Module sichtbar zu machen."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `system` (z. B. als separate Datei `system.rs` oder als Inline-Modul `mod system`). Importiere darin `Ticket` und `Prioritaet` aus dem Modul `tickets` über einen absoluten Pfad (z. B. `use crate::tickets::{Ticket, Prioritaet}`). Definiere im Modul `system` ein öffentliches Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`. Implementiere für `TicketSystem` eine öffentliche Methode `ticket_hinzufuegen(&mut self, t: Ticket)` und eine öffentliche Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `tickets` und `system`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::tickets::Ticket` und `use crate::system::TicketSystem`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 27, dem Titel 'Fehler in Modul 27' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket im System ist. Behandle alle Ergebnisse sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 28: Paket-Tracker (Paket 28)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `shipping` (z. B. als separate Datei `shipping.rs` oder als Inline-Modul `mod shipping`). Definiere darin ein öffentliches Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere außerdem ein öffentliches Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Achte darauf, das Struct und alle seine Felder mit `pub` zu markieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `tracker` (z. B. als separate Datei `tracker.rs` oder als Inline-Modul `mod tracker`). Importiere darin das Struct `Paket` und das Enum `PaketStatus` aus dem Modul `shipping` über einen absoluten Pfad (z. B. `use crate::shipping::{Paket, PaketStatus}`). Definiere im Modul `tracker` ein öffentliches Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`. Implementiere für `PaketTracker` eine öffentliche Methode `paket_registrieren(&mut self, p: Paket)` und eine öffentliche Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID suchen und seinen Status aktualisieren, andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `shipping` und `tracker`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::shipping::Paket` und `use crate::tracker::PaketTracker`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 28, Zielort 'Koeln' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch den Fehlerfall mit einer ungültigen ID. Behandle die Resultate sicher mit Pattern Matching und gib verständliche Ausgaben auf der Konsole aus."

---

### Projekt 29: Fahrzeug-Klasse (Fahrzeug 29)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `vehicles` (z. B. als separate Datei `vehicles.rs` oder als Inline-Modul `mod vehicles`). Definiere darin ein öffentliches Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere außerdem ein öffentliches Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `fleet` (z. B. als separate Datei `fleet.rs` oder als Inline-Modul `mod fleet`). Importiere darin `Fahrzeug` und `FahrzeugTyp` aus dem Modul `vehicles` über einen absoluten Pfad (z. B. `use crate::vehicles::{Fahrzeug, FahrzeugTyp}`). Definiere im Modul `fleet` ein öffentliches Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`. Implementiere für `Fuhrpark` eine öffentliche Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` und eine öffentliche Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID suchen, die Maut berechnen (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und als `Ok(f64)` zurückgeben. Falls das Fahrzeug nicht existiert, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `vehicles` und `fleet`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::vehicles::Fahrzeug` und `use crate::fleet::Fuhrpark`). Schreibe die `main`-Funktion: Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Volkswagen' (ID 29, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 30: Mitarbeiter-Rolle (Mitarbeiter 30)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `staff` (z. B. als separate Datei `staff.rs` oder als Inline-Modul `mod staff`). Definiere darin ein öffentliches Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere außerdem ein öffentliches Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `hr` (z. B. als separate Datei `hr.rs` oder als Inline-Modul `mod hr`). Importiere darin `Mitarbeiter` und `Rolle` aus dem Modul `staff` über einen absoluten Pfad (z. B. `use crate::staff::{Mitarbeiter, Rolle}`). Definiere im Modul `hr` ein öffentliches Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`. Implementiere für `Abteilung` eine öffentliche Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` und eine öffentliche Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen, über Pattern Matching auf `Rolle` prüfen, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgeben. Wenn nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `staff` und `hr`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::staff::Mitarbeiter` und `use crate::hr::Abteilung`). Schreibe die `main`-Funktion: Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Daniel' (ID 30, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Daniel sowie für eine ungültige ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 31: Status-Manager (Fernseher 31)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `devices` (z. B. als separate Datei `devices.rs` oder als Inline-Modul `mod devices`). Definiere darin ein öffentliches Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere außerdem ein öffentliches Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Stelle sicher, dass sowohl das Struct als auch alle seine Felder mit `pub` markiert sind, damit andere Module darauf zugreifen können."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `manager` (z. B. als separate Datei `manager.rs` oder als Inline-Modul `mod manager`). Importiere darin das Struct `Geraet` und das Enum `GeraeteStatus` aus dem Modul `devices` über einen absoluten Pfad (z. B. `use crate::devices::{Geraet, GeraeteStatus}`). Definiere im Modul `manager` ein öffentliches Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`. Implementiere für `StatusManager` eine öffentliche Methode `geraet_hinzufuegen(&mut self, g: Geraet)` und eine öffentliche Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID suchen und seinen Status ändern, oder andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `devices` und `manager`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::devices::Geraet` und `use crate::manager::StatusManager`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Fernseher', der ID 31 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts und teste auch den Fehlerfall mit einer ungültigen ID. Behandle alle Ergebnisse sicher mit Pattern Matching (z. B. `match` oder `if let`) und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 32: Ticket-System (Ticket 32)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `tickets` (z. B. als separate Datei `tickets.rs` oder als Inline-Modul `mod tickets`). Definiere darin ein öffentliches Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere außerdem ein öffentliches Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Stelle sicher, dass das Struct und alle seine Felder mit `pub` markiert sind, um sie für andere Module sichtbar zu machen."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `system` (z. B. als separate Datei `system.rs` oder als Inline-Modul `mod system`). Importiere darin `Ticket` und `Prioritaet` aus dem Modul `tickets` über einen absoluten Pfad (z. B. `use crate::tickets::{Ticket, Prioritaet}`). Definiere im Modul `system` ein öffentliches Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`. Implementiere für `TicketSystem` eine öffentliche Methode `ticket_hinzufuegen(&mut self, t: Ticket)` und eine öffentliche Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `tickets` und `system`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::tickets::Ticket` und `use crate::system::TicketSystem`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 32, dem Titel 'Fehler in Modul 32' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket im System ist. Behandle alle Ergebnisse sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 33: Paket-Tracker (Paket 33)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `shipping` (z. B. als separate Datei `shipping.rs` oder als Inline-Modul `mod shipping`). Definiere darin ein öffentliches Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere außerdem ein öffentliches Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Achte darauf, das Struct und alle seine Felder mit `pub` zu markieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `tracker` (z. B. als separate Datei `tracker.rs` oder als Inline-Modul `mod tracker`). Importiere darin das Struct `Paket` und das Enum `PaketStatus` aus dem Modul `shipping` über einen absoluten Pfad (z. B. `use crate::shipping::{Paket, PaketStatus}`). Definiere im Modul `tracker` ein öffentliches Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`. Implementiere für `PaketTracker` eine öffentliche Methode `paket_registrieren(&mut self, p: Paket)` und eine öffentliche Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID suchen und seinen Status aktualisieren, andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `shipping` und `tracker`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::shipping::Paket` und `use crate::tracker::PaketTracker`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 33, Zielort 'Frankfurt' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch den Fehlerfall mit einer ungültigen ID. Behandle die Resultate sicher mit Pattern Matching und gib verständliche Ausgaben auf der Konsole aus."

---

### Projekt 34: Fahrzeug-Klasse (Fahrzeug 34)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `vehicles` (z. B. als separate Datei `vehicles.rs` oder als Inline-Modul `mod vehicles`). Definiere darin ein öffentliches Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere außerdem ein öffentliches Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `fleet` (z. B. als separate Datei `fleet.rs` oder als Inline-Modul `mod fleet`). Importiere darin `Fahrzeug` und `FahrzeugTyp` aus dem Modul `vehicles` über einen absoluten Pfad (z. B. `use crate::vehicles::{Fahrzeug, FahrzeugTyp}`). Definiere im Modul `fleet` ein öffentliches Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`. Implementiere für `Fuhrpark` eine öffentliche Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` und eine öffentliche Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID suchen, die Maut berechnen (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und als `Ok(f64)` zurückgeben. Falls das Fahrzeug nicht existiert, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `vehicles` und `fleet`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::vehicles::Fahrzeug` und `use crate::fleet::Fuhrpark`). Schreibe die `main`-Funktion: Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Porsche' (ID 34, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 35: Mitarbeiter-Rolle (Mitarbeiter 35)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `staff` (z. B. als separate Datei `staff.rs` or als Inline-Modul `mod staff`). Definiere darin ein öffentliches Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere außerdem ein öffentliches Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `hr` (z. B. als separate Datei `hr.rs` oder als Inline-Modul `mod hr`). Importiere darin `Mitarbeiter` und `Rolle` aus dem Modul `staff` über einen absoluten Pfad (z. B. `use crate::staff::{Mitarbeiter, Rolle}`). Definiere im Modul `hr` ein öffentliches Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`. Implementiere für `Abteilung` eine öffentliche Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` und eine öffentliche Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen, über Pattern Matching auf `Rolle` prüfen, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgeben. Wenn nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `staff` und `hr`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::staff::Mitarbeiter` und `use crate::hr::Abteilung`). Schreibe die `main`-Funktion: Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Emma' (ID 35, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Emma sowie für eine ungültige ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 36: Status-Manager (Drucker 36)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `devices` (z. B. als separate Datei `devices.rs` oder als Inline-Modul `mod devices`). Definiere darin ein öffentliches Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere außerdem ein öffentliches Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Stelle sicher, dass sowohl das Struct als auch alle seine Felder mit `pub` markiert sind, damit andere Module darauf zugreifen können."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `manager` (z. B. als separate Datei `manager.rs` oder als Inline-Modul `mod manager`). Importiere darin das Struct `Geraet` und das Enum `GeraeteStatus` aus dem Modul `devices` über einen absoluten Pfad (z. B. `use crate::devices::{Geraet, GeraeteStatus}`). Definiere im Modul `manager` ein öffentliches Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`. Implementiere für `StatusManager` eine öffentliche Methode `geraet_hinzufuegen(&mut self, g: Geraet)` und eine öffentliche Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID suchen und seinen Status ändern, oder andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `devices` und `manager`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::devices::Geraet` und `use crate::manager::StatusManager`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Drucker', der ID 36 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts und teste auch den Fehlerfall mit einer ungültigen ID. Behandle alle Ergebnisse sicher mit Pattern Matching (z. B. `match` oder `if let`) und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 37: Ticket-System (Ticket 37)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `tickets` (z. B. als separate Datei `tickets.rs` oder als Inline-Modul `mod tickets`). Definiere darin ein öffentliches Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere außerdem ein öffentliches Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Stelle sicher, dass das Struct und alle seine Felder mit `pub` markiert sind, um sie für andere Module sichtbar zu machen."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `system` (z. B. als separate Datei `system.rs` oder als Inline-Modul `mod system`). Importiere darin `Ticket` und `Prioritaet` aus dem Modul `tickets` über einen absoluten Pfad (z. B. `use crate::tickets::{Ticket, Prioritaet}`). Definiere im Modul `system` ein öffentliches Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`. Implementiere für `TicketSystem` eine öffentliche Methode `ticket_hinzufuegen(&mut self, t: Ticket)` und eine öffentliche Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `tickets` und `system`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::tickets::Ticket` und `use crate::system::TicketSystem`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 37, dem Titel 'Fehler in Modul 37' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket im System ist. Behandle alle Ergebnisse sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 38: Paket-Tracker (Paket 38)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `shipping` (z. B. als separate Datei `shipping.rs` oder als Inline-Modul `mod shipping`). Definiere darin ein öffentliches Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere außerdem ein öffentliches Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Achte darauf, das Struct und alle seine Felder mit `pub` zu markieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `tracker` (z. B. als separate Datei `tracker.rs` oder als Inline-Modul `mod tracker`). Importiere darin das Struct `Paket` und das Enum `PaketStatus` aus dem Modul `shipping` über einen absoluten Pfad (z. B. `use crate::shipping::{Paket, PaketStatus}`). Definiere im Modul `tracker` ein öffentliches Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`. Implementiere für `PaketTracker` eine öffentliche Methode `paket_registrieren(&mut self, p: Paket)` und eine öffentliche Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID suchen und seinen Status aktualisieren, andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `shipping` und `tracker`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::shipping::Paket` und `use crate::tracker::PaketTracker`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 38, Zielort 'Stuttgart' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch den Fehlerfall mit einer ungültigen ID. Behandle die Resultate sicher mit Pattern Matching und gib verständliche Ausgaben auf der Konsole aus."

---

### Projekt 39: Fahrzeug-Klasse (Fahrzeug 39)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `vehicles` (z. B. als separate Datei `vehicles.rs` oder als Inline-Modul `mod vehicles`). Definiere darin ein öffentliches Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere außerdem ein öffentliches Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `fleet` (z. B. als separate Datei `fleet.rs` oder als Inline-Modul `mod fleet`). Importiere darin `Fahrzeug` und `FahrzeugTyp` aus dem Modul `vehicles` über einen absoluten Pfad (z. B. `use crate::vehicles::{Fahrzeug, FahrzeugTyp}`). Definiere im Modul `fleet` ein öffentliches Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`. Implementiere für `Fuhrpark` eine öffentliche Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` und eine öffentliche Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID suchen, die Maut berechnen (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und als `Ok(f64)` zurückgeben. Falls das Fahrzeug nicht existiert, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `vehicles` und `fleet`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::vehicles::Fahrzeug` und `use crate::fleet::Fuhrpark`). Schreibe die `main`-Funktion: Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Opel' (ID 39, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 40: Mitarbeiter-Rolle (Mitarbeiter 40)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `staff` (z. B. als separate Datei `staff.rs` oder als Inline-Modul `mod staff`). Definiere darin ein öffentliches Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere außerdem ein öffentliches Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `hr` (z. B. als separate Datei `hr.rs` oder als Inline-Modul `mod hr`). Importiere darin `Mitarbeiter` und `Rolle` aus dem Modul `staff` über einen absoluten Pfad (z. B. `use crate::staff::{Mitarbeiter, Rolle}`). Definiere im Modul `hr` ein öffentliches Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`. Implementiere für `Abteilung` eine öffentliche Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` und eine öffentliche Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen, über Pattern Matching auf `Rolle` prüfen, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgeben. Wenn nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `staff` und `hr`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::staff::Mitarbeiter` und `use crate::hr::Abteilung`). Schreibe die `main`-Funktion: Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Felix' (ID 40, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Felix sowie für eine ungültige ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 41: Status-Manager (Lichtleiste 41)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `devices` (z. B. als separate Datei `devices.rs` oder als Inline-Modul `mod devices`). Definiere darin ein öffentliches Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere außerdem ein öffentliches Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Stelle sicher, dass sowohl das Struct als auch alle seine Felder mit `pub` markiert sind, damit andere Module darauf zugreifen können."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `manager` (z. B. als separate Datei `manager.rs` oder als Inline-Modul `mod manager`). Importiere darin das Struct `Geraet` und das Enum `GeraeteStatus` aus dem Modul `devices` über einen absoluten Pfad (z. B. `use crate::devices::{Geraet, GeraeteStatus}`). Definiere im Modul `manager` ein öffentliches Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`. Implementiere für `StatusManager` eine öffentliche Methode `geraet_hinzufuegen(&mut self, g: Geraet)` und eine öffentliche Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID suchen und seinen Status ändern, oder andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `devices` und `manager`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::devices::Geraet` und `use crate::manager::StatusManager`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Lichtleiste', der ID 41 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts und teste auch den Fehlerfall mit einer ungültigen ID. Behandle alle Ergebnisse sicher mit Pattern Matching (z. B. `match` oder `if let`) und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 42: Ticket-System (Ticket 42)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `tickets` (z. B. als separate Datei `tickets.rs` oder als Inline-Modul `mod tickets`). Definiere darin ein öffentliches Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere außerdem ein öffentliches Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Stelle sicher, dass das Struct und alle seine Felder mit `pub` markiert sind, um sie für andere Module sichtbar zu machen."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `system` (z. B. als separate Datei `system.rs` oder als Inline-Modul `mod system`). Importiere darin `Ticket` und `Prioritaet` aus dem Modul `tickets` über einen absoluten Pfad (z. B. `use crate::tickets::{Ticket, Prioritaet}`). Definiere im Modul `system` ein öffentliches Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`. Implementiere für `TicketSystem` eine öffentliche Methode `ticket_hinzufuegen(&mut self, t: Ticket)` und eine öffentliche Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `tickets` und `system`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::tickets::Ticket` und `use crate::system::TicketSystem`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 42, dem Titel 'Fehler in Modul 42' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket im System ist. Behandle alle Ergebnisse sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 43: Paket-Tracker (Paket 43)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `shipping` (z. B. als separate Datei `shipping.rs` oder als Inline-Modul `mod shipping`). Definiere darin ein öffentliches Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere außerdem ein öffentliches Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Achte darauf, das Struct und alle seine Felder mit `pub` zu markieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `tracker` (z. B. als separate Datei `tracker.rs` oder als Inline-Modul `mod tracker`). Importiere darin das Struct `Paket` und das Enum `PaketStatus` aus dem Modul `shipping` über einen absoluten Pfad (z. B. `use crate::shipping::{Paket, PaketStatus}`). Definiere im Modul `tracker` ein öffentliches Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`. Implementiere für `PaketTracker` eine öffentliche Methode `paket_registrieren(&mut self, p: Paket)` und eine öffentliche Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID suchen und seinen Status aktualisieren, andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `shipping` und `tracker`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::shipping::Paket` und `use crate::tracker::PaketTracker`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 43, Zielort 'Duesseldorf' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch den Fehlerfall mit einer ungültigen ID. Behandle die Resultate sicher mit Pattern Matching und gib verständliche Ausgaben auf der Konsole aus."

---

### Projekt 44: Fahrzeug-Klasse (Fahrzeug 44)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `vehicles` (z. B. als separate Datei `vehicles.rs` oder als Inline-Modul `mod vehicles`). Definiere darin ein öffentliches Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere außerdem ein öffentliches Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `fleet` (z. B. als separate Datei `fleet.rs` oder als Inline-Modul `mod fleet`). Importiere darin `Fahrzeug` und `FahrzeugTyp` aus dem Modul `vehicles` über einen absoluten Pfad (z. B. `use crate::vehicles::{Fahrzeug, FahrzeugTyp}`). Definiere im Modul `fleet` ein öffentliches Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`. Implementiere für `Fuhrpark` eine öffentliche Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` und eine öffentliche Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID suchen, die Maut berechnen (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und als `Ok(f64)` zurückgeben. Falls das Fahrzeug nicht existiert, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `vehicles` und `fleet`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::vehicles::Fahrzeug` und `use crate::fleet::Fuhrpark`). Schreibe die `main`-Funktion: Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Ford' (ID 44, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 45: Mitarbeiter-Rolle (Mitarbeiter 45)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `staff` (z. B. als separate Datei `staff.rs` oder als Inline-Modul `mod staff`). Definiere darin ein öffentliches Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere außerdem ein öffentliches Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `hr` (z. B. als separate Datei `hr.rs` oder als Inline-Modul `mod hr`). Importiere darin `Mitarbeiter` und `Rolle` aus dem Modul `staff` über einen absoluten Pfad (z. B. `use crate::staff::{Mitarbeiter, Rolle}`). Definiere im Modul `hr` ein öffentliches Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`. Implementiere für `Abteilung` eine öffentliche Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` und eine öffentliche Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen, über Pattern Matching auf `Rolle` prüfen, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgeben. Wenn nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `staff` und `hr`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::staff::Mitarbeiter` und `use crate::hr::Abteilung`). Schreibe die `main`-Funktion: Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Greta' (ID 45, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Greta sowie für eine ungültige ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 46: Status-Manager (Kamera 46)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `devices` (z. B. als separate Datei `devices.rs` oder als Inline-Modul `mod devices`). Definiere darin ein öffentliches Enum `GeraeteStatus` mit den Werten `An`, `Aus` und `Standby`. Definiere außerdem ein öffentliches Struct `Geraet` mit den Feldern `name: String`, `id: i32` und `status: GeraeteStatus`. Stelle sicher, dass sowohl das Struct als auch alle seine Felder mit `pub` markiert sind, damit andere Module darauf zugreifen können."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `manager` (z. B. als separate Datei `manager.rs` oder als Inline-Modul `mod manager`). Importiere darin das Struct `Geraet` und das Enum `GeraeteStatus` aus dem Modul `devices` über einen absoluten Pfad (z. B. `use crate::devices::{Geraet, GeraeteStatus}`). Definiere im Modul `manager` ein öffentliches Struct `StatusManager` mit dem Feld `geraete: Vec<Geraet>`. Implementiere für `StatusManager` eine öffentliche Methode `geraet_hinzufuegen(&mut self, g: Geraet)` und eine öffentliche Methode `status_aendern(&mut self, id: i32, neuer_status: GeraeteStatus) -> Result<(), String>`. Die Methode soll das Gerät mit der passenden ID suchen und seinen Status ändern, oder andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `devices` und `manager`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::devices::Geraet` und `use crate::manager::StatusManager`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `StatusManager`, füge ein `Geraet` mit dem Namen 'Kamera', der ID 46 und dem Status `Standby` hinzu. Ändere danach den Status dieses Geräts und teste auch den Fehlerfall mit einer ungültigen ID. Behandle alle Ergebnisse sicher mit Pattern Matching (z. B. `match` oder `if let`) und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 47: Ticket-System (Ticket 47)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `tickets` (z. B. als separate Datei `tickets.rs` oder als Inline-Modul `mod tickets`). Definiere darin ein öffentliches Enum `Prioritaet` mit den Werten `Niedrig`, `Mittel` und `Hoch`. Definiere außerdem ein öffentliches Struct `Ticket` mit den Feldern `id: i32`, `titel: String` und `prioritaet: Prioritaet`. Stelle sicher, dass das Struct und alle seine Felder mit `pub` markiert sind, um sie für andere Module sichtbar zu machen."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `system` (z. B. als separate Datei `system.rs` oder als Inline-Modul `mod system`). Importiere darin `Ticket` und `Prioritaet` aus dem Modul `tickets` über einen absoluten Pfad (z. B. `use crate::tickets::{Ticket, Prioritaet}`). Definiere im Modul `system` ein öffentliches Struct `TicketSystem` mit dem Feld `tickets: Vec<Ticket>`. Implementiere für `TicketSystem` eine öffentliche Methode `ticket_hinzufuegen(&mut self, t: Ticket)` und eine öffentliche Methode `dringendes_ticket_loesen(&mut self) -> Result<Ticket, String>`. Die Methode soll das erste Ticket mit der Priorität `Hoch` suchen, es aus dem Vektor entfernen und als `Ok(Ticket)` zurückgeben. Falls kein solches Ticket existiert, soll ein `Err` mit einer Fehlermeldung zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `tickets` und `system`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::tickets::Ticket` und `use crate::system::TicketSystem`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `TicketSystem` und füge mehrere Tickets hinzu (darunter eines mit ID 47, dem Titel 'Fehler in Modul 47' und der Priorität `Hoch`). Versuche das dringende Ticket zu lösen. Teste auch den Fall, wenn kein dringendes Ticket im System ist. Behandle alle Ergebnisse sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 48: Paket-Tracker (Paket 48)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `shipping` (z. B. als separate Datei `shipping.rs` oder als Inline-Modul `mod shipping`). Definiere darin ein öffentliches Enum `PaketStatus` mit den Werten `ImLager`, `Unterwegs` und `Zugestellt`. Definiere außerdem ein öffentliches Struct `Paket` mit den Feldern `id: i32`, `zielort: String` und `status: PaketStatus`. Achte darauf, das Struct und alle seine Felder mit `pub` zu markieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `tracker` (z. B. als separate Datei `tracker.rs` oder als Inline-Modul `mod tracker`). Importiere darin das Struct `Paket` und das Enum `PaketStatus` aus dem Modul `shipping` über einen absoluten Pfad (z. B. `use crate::shipping::{Paket, PaketStatus}`). Definiere im Modul `tracker` ein öffentliches Struct `PaketTracker` mit dem Feld `pakete: Vec<Paket>`. Implementiere für `PaketTracker` eine öffentliche Methode `paket_registrieren(&mut self, p: Paket)` und eine öffentliche Methode `status_aktualisieren(&mut self, id: i32, neuer_status: PaketStatus) -> Result<(), String>`. Die Methode soll das Paket mit der passenden ID suchen und seinen Status aktualisieren, andernfalls ein `Err` mit einer Fehlermeldung zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `shipping` und `tracker`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::shipping::Paket` und `use crate::tracker::PaketTracker`). Schreibe die `main`-Funktion: Erzeuge eine Instanz von `PaketTracker` und registriere ein Paket mit ID 48, Zielort 'Dortmund' und dem Status `Unterwegs`. Aktualisiere den Status des Pakets auf `Zugestellt` und teste auch den Fehlerfall mit einer ungültigen ID. Behandle die Resultate sicher mit Pattern Matching und gib verständliche Ausgaben auf der Konsole aus."

---

### Projekt 49: Fahrzeug-Klasse (Fahrzeug 49)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `vehicles` (z. B. als separate Datei `vehicles.rs` oder als Inline-Modul `mod vehicles`). Definiere darin ein öffentliches Enum `FahrzeugTyp` mit den Werten `Auto`, `Motorrad` und `Lkw`. Definiere außerdem ein öffentliches Struct `Fahrzeug` mit den Feldern `hersteller: String`, `id: i32` und `typ: FahrzeugTyp`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein zweites Modul `fleet` (z. B. als separate Datei `fleet.rs` oder als Inline-Modul `mod fleet`). Importiere darin `Fahrzeug` und `FahrzeugTyp` aus dem Modul `vehicles` über einen absoluten Pfad (z. B. `use crate::vehicles::{Fahrzeug, FahrzeugTyp}`). Definiere im Modul `fleet` ein öffentliches Struct `Fuhrpark` mit dem Feld `fahrzeuge: Vec<Fahrzeug>`. Implementiere für `Fuhrpark` eine öffentliche Methode `fahrzeug_aufnehmen(&mut self, f: Fahrzeug)` und eine öffentliche Methode `maut_berechnen(&self, id: i32) -> Result<f64, String>`. Die Methode soll das Fahrzeug mit der passenden ID suchen, die Maut berechnen (Motorrad: 2.50, Auto: 5.00, Lkw: 15.00) und als `Ok(f64)` zurückgeben. Falls das Fahrzeug nicht existiert, gib ein `Err` mit einer Fehlermeldung zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `vehicles` und `fleet`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::vehicles::Fahrzeug` und `use crate::fleet::Fuhrpark`). Schreibe die `main`-Funktion: Erzeuge einen `Fuhrpark` und nimm ein Fahrzeug des Herstellers 'Volvo' (ID 49, Typ `Lkw`) auf. Berechne die Maut für dieses Fahrzeug und teste danach die Berechnung für eine ungültige Fahrzeug-ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

### Projekt 50: Mitarbeiter-Rolle (Mitarbeiter 50)

#### 🛠️ Modul 1: Basis-Datenstrukturen (Modul & Sichtbarkeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Modul `staff` (z. B. als separate Datei `staff.rs` oder als Inline-Modul `mod staff`). Definiere darin ein öffentliches Enum `Rolle` mit den Werten `Admin`, `Entwickler` und `Gast`. Definiere außerdem ein öffentliches Struct `Mitarbeiter` mit den Feldern `id: i32`, `name: String` und `rolle: Rolle`. Achte darauf, das Struct und alle seine Felder mit `pub` zu deklarieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Importe & Pfade)
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um ein zweites Modul `hr` (z. B. als separate Datei `hr.rs` oder als Inline-Modul `mod hr`). Importiere darin `Mitarbeiter` und `Rolle` aus dem Modul `staff` über einen absoluten Pfad (z. B. `use crate::staff::{Mitarbeiter, Rolle}`). Definiere im Modul `hr` ein öffentliches Struct `Abteilung` mit dem Feld `mitarbeiter: Vec<Mitarbeiter>`. Implementiere für `Abteilung` eine öffentliche Methode `mitarbeiter_einstellen(&mut self, m: Mitarbeiter)` und eine öffentliche Methode `schreibrechte_pruefen(&self, id: i32) -> Result<bool, String>`. Die Methode soll den Mitarbeiter mit der passenden ID suchen, über Pattern Matching auf `Rolle` prüfen, ob er Schreibrechte besitzt (Admin und Entwickler haben Schreibrechte, Gast nicht) und das Ergebnis als `Ok(bool)` zurückgeben. Wenn nicht gefunden, gib ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Modul-Integration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datei `main.rs`. Deklariere darin die Module `staff` und `hr`. Importiere die benötigten Typen über absolute Pfade (z. B. `use crate::staff::Mitarbeiter` und `use crate::hr::Abteilung`). Schreibe die `main`-Funktion: Erzeuge eine `Abteilung` und füge einen Mitarbeiter namens 'Henry' (ID 50, Rolle `Entwickler`) hinzu. Überprüfe die Schreibrechte für Henry sowie für eine ungültige ID. Behandle die Erfolgs- und Fehler-Rückgabewerte sicher mit Pattern Matching und gib verständliche Nachrichten auf der Konsole aus."

---

## 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 4) – Teil 3 (Projekte 51 bis 75)

In diesem Abschnitt findest du die Präzisions-Prompts für die Projekte 51 bis 75 der Phase 4. Der Fokus liegt hierbei auf der **Einbindung und praktischen Nutzung von externen Abhängigkeiten (Crates)** über den Paketmanager Cargo. Jedes Projekt zeigt, wie du Bibliotheken aus dem Rust-Ökosystem (`crates.io`) einbindest und diese mit den Konzepten der vorherigen Phasen kombinierst.

---

### Projekt 51: Zufallsgenerator-Spiel mit `rand` und farbigen Ausgaben mit `colored`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust für ein Zahlenratespiel. Definiere ein Enum `SpielStatus` mit den Werten `Gewonnen`, `ZuNiedrig` und `ZuHoch`. Definiere ein Struct `Ratespiel` mit den Feldern `geheimzahl: u32` und `versuche: u32`."

#### 🛠️ Modul 2: Implementierung & Methoden (Externe Abhängigkeiten & Rng)
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Ratespiel`. Importiere das `rand`-Crate und implementiere eine Methode `neu() -> Self`, die eine geheime Zahl zwischen 1 und 100 unter Verwendung von `rand::thread_rng().gen_range(1..=100)` generiert und `versuche` mit 0 initialisiert. Implementiere außerdem eine Methode `rate_einmal(&mut self, tipp: u32) -> SpielStatus`, die die Versuche um eins erhöht, den Tipp mit der Geheimzahl vergleicht und den entsprechenden `SpielStatus` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & farbige Ausgaben)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Importiere das `colored`-Crate (z. B. `use colored::Colorize;`) und frage den Nutzer in einer Schleife nach Tipps. Lies die Benutzereingabe robust ein und konvertiere sie in einen `u32`. Werte den Tipp mit `rate_einmal` aus, nutze Pattern Matching auf das Ergebnis und gib farbige Rückmeldungen auf der Konsole aus (z. B. grün für gewonnen, gelb für zu hoch/niedrig, rot für Fehler). Zeige bei Erfolg die Anzahl der Versuche an und beende das Spiel."

---

### Projekt 52: JSON-Dateiverwaltung von Kontakten mit `serde` und `serde_json`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Structs & Serde)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstrukturen für eine Kontaktverwaltung in Rust. Definiere ein Struct `Kontakt` mit den Feldern `name: String`, `email: String` und `telefon: Option<String>`. Definiere ein Struct `KontaktBuch` mit dem Feld `kontakte: Vec<Kontakt>`. Verwende die Serde-Makros `Serialize` und `Deserialize` auf beiden Structs, um sie für das JSON-Format vorzubereiten."

#### 🛠️ Modul 2: Implementierung & Methoden (Dateizugriff & JSON-Modul)
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `KontaktBuch`. Implementiere die Methoden `neu() -> Self`, `hinzufuegen(&mut self, name: &str, email: &str, telefon: Option<&str>)` sowie die Methoden `speichern(&self, dateipfad: &str) -> Result<(), std::io::Error>` und `laden(dateipfad: &str) -> Result<Self, std::io::Error>`. Nutze `serde_json::to_writer_pretty` und `serde_json::from_reader` für die Dateioperationen und implementiere eine Fehlerfortpflanzung über `Result`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Verifikation)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion für dieses Projekt. Erstelle ein `KontaktBuch`, füge Test-Kontakte hinzu (einen mit Telefonnummer, einen ohne), speichere das Buch in einer Datei namens 'kontakte_test.json', lade es anschließend wieder in eine neue Instanz und gib alle geladenen Kontakte im Terminal aus. Behandle Fehler sicher mit Pattern Matching."

---

### Projekt 53: Zeitstempel-Logger für Aufgaben mit `chrono`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Structs & Chrono-Typen)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstrukturen für einen Zeitstempel-Logger. Definiere ein Struct `LogEintrag` mit den Feldern `aufgabe: String` und `erstellt_am: DateTime<Local>` unter Verwendung des `chrono`-Crates. Definiere ein Struct `Logger` mit dem Feld `eintraege: Vec<LogEintrag>`."

#### 🛠️ Modul 2: Implementierung & Methoden (Zeiterfassung & Formatierung)
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für das Struct `Logger`. Implementiere eine Methode `neu() -> Self` und eine Methode `logge_aufgabe(&mut self, name: &str)`, die den aktuellen lokalen Zeitstempel mit `Local::now()` erfasst und einen Eintrag hinzufügt. Implementiere außerdem eine Methode `zeige_log(&self)`, die alle Einträge durchläuft und ihren Zeitstempel formatiert (z. B. mit `.format(\"%Y-%m-%d %H:%M:%S\")`) zusammen mit dem Aufgabennamen auf der Konsole ausgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Verzögerung)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Erzeuge eine Instanz von `Logger` und logge eine erste Aufgabe. Verwende `std::thread::sleep(std::time::Duration::from_millis(500))`, um eine kurze zeitliche Verzögerung zu simulieren, logge eine zweite Aufgabe und gib das gesamte Log am Ende formatiert auf dem Bildschirm aus."

---

### Projekt 54: Regex-E-Mail-Validator und -Extraktor mit `regex`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Regex)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstruktur für einen E-Mail-Extraktor in Rust. Definiere ein Struct `EmailExtraktor` mit dem Feld `muster: Regex` aus dem `regex`-Crate, um das reguläre Ausdrucksmuster vorkompiliert zu speichern."

#### 🛠️ Modul 2: Implementierung & Methoden (Kompilierung & Extraktion)
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `EmailExtraktor`. Implementiere eine Methode `neu() -> Result<Self, regex::Error>`, die das Regex-Muster `r\"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\"` kompiliert und bei Erfolg die Instanz zurückgibt. Implementiere eine Methode `extrahiere(&self, text: &str) -> Vec<String>`, die den übergebenen Text nach allen Übereinstimmungen durchsucht (`find_iter`) und diese als Vektor von Strings zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Textanalyse)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Erzeuge eine Instanz von `EmailExtraktor` beim Programmstart und behandle eventuelle Kompilierungsfehler. Definiere einen Test-Text, der mehrere E-Mail-Adressen sowie normalen Text enthält, rufe die Methode `extrahiere` auf und gib alle gefundenen Adressen geordnet im Terminal aus."

---

### Projekt 55: UUID-Generator für Datenbanksätze mit `uuid`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & HashMap mit Uuid)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen für eine Benutzerdatenbank. Definiere ein Struct `Benutzer` mit den Feldern `id: Uuid` (aus dem `uuid`-Crate) und `benutzername: String`. Definiere ein Struct `BenutzerDatenbank` mit dem Feld `daten: HashMap<Uuid, Benutzer>`."

#### 🛠️ Modul 2: Implementierung & Methoden (UUID-Generierung & Abfrage)
* **Dein Präzisions-Prompt:**
  > "Erweitere das Struct `BenutzerDatenbank` um einen `impl`-Block. Implementiere die Methoden `neu() -> Self` und `benutzer_anlegen(&mut self, name: &str) -> Uuid`, welche eine neue ID mittels `Uuid::new_v4()` generiert, einen Benutzer anlegt und ihn in die HashMap einträgt. Implementiere auch `finde_benutzer(&self, id: &Uuid) -> Option<&Benutzer>`, um einen Benutzer anhand seiner ID zu suchen."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & ID-Vergleich)
* **Dein Präzisions-Prompt:**
  > "Schreibe eine `main`-Funktion, die eine `BenutzerDatenbank` instanziiert und zwei Testbenutzer anlegt. Gib die generierten UUIDs aus. Suche anschließend einen der Benutzer mithilfe seiner ID in der Datenbank, entpacke die Rückgabe (`Option`) sicher mit Pattern Matching und gib den Benutzernamen aus."

---

### Projekt 56: Datei-Integrations-Prüfer mit `sha2` und `hex`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `Dateipruefer` in Rust, die als Namensraum für Datei-Hashing-Operationen dienen soll."

#### 🛠️ Modul 2: Implementierung & Methoden (SHA-256 & Hex-Enkodierung)
* **Dein Präzisions-Prompt:**
  > "Erweitere `Dateipruefer` um einen `impl`-Block mit der statischen Methode `berechne_sha256(pfad: &str) -> Result<String, std::io::Error>`. Die Methode soll die Datei öffnen, ihren Inhalt stückweise in einen Puffer einlesen, den Hasher `Sha256` aus dem `sha2`-Crate damit füttern und das Ergebnis mithilfe von `hex::encode` als lesbaren Hex-String zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Testdatei)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion für dieses Projekt. Erzeuge programmgesteuert eine temporäre Textdatei und schreibe einen kurzen Text hinein. Berechne den SHA-256-Hash dieser Datei mit `berechne_sha256`, gib den berechneten Hash auf der Konsole aus, behandle Fehler sicher und lösche die Datei anschließend wieder."

---

### Projekt 57: URL-Parser und Query-Parameter-Extraktor mit `url`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `UrlAnalysator` in Rust, die für die Extraktion von URL-Bestandteilen genutzt wird."

#### 🛠️ Modul 2: Implementierung & Methoden (URL-Parsing & Query-Pairs)
* **Dein Präzisions-Prompt:**
  > "Erweitere `UrlAnalysator` um einen `impl`-Block mit einer Methode `extrahiere_parameter(url_text: &str) -> Result<HashMap<String, String>, url::ParseError>`. Verwende das `url`-Crate (`Url::parse`), um die URL zu parsen, und iteriere über die Query-Schlüssel-Wert-Paare (`query_pairs()`), um sie in eine `HashMap` einzutragen."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Ausgabe)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `main`-Funktion, die eine Beispiel-URL (z. B. eine Suchanfrage mit mehreren Parameter) an die Methode `extrahiere_parameter` übergibt. Behandle das Resultat sicher, gib alle gefundenen Parameter im Format 'Schlüssel: Wert' auf dem Bildschirm aus und fange eventuelle Parse-Fehler ab."

---

### Projekt 58: CSV-Berichtsgenerator mit `csv` und `serde`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Structs & Serde-Serialize)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstrukturen für eine Transaktionserfassung. Definiere ein Struct `Transaktion` mit den Feldern `produkt: String`, `menge: u32` und `preis: f64`. Statte das Struct mit dem Serde-Makro `Serialize` aus. Definiere zudem ein leeres Struct `CSVVerwalter`."

#### 🛠️ Modul 2: Implementierung & Methoden (CSV-Writer)
* **Dein Präzisions-Prompt:**
  > "Erweitere `CSVVerwalter` um einen `impl`-Block. Implementiere eine Methode `erstelle_bericht<W: std::io::Write>(transaktionen: &[Transaktion], ziel: W) -> Result<(), csv::Error>`. Die Methode soll einen `csv::Writer::from_writer` erzeugen, über die Transaktionen iterieren, diese in das CSV-Format serialisieren und den Writer flushen."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Stdout-Ausgabe)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Erstelle einen Vektor mit Beispiel-Transaktionen. Rufe die Methode `erstelle_bericht` auf und übergib als Ausgabestrom direkt das Standard-Ausgabemedium des Systems (z. B. `std::io::stdout().lock()`), um die erzeugten CSV-Daten direkt auf der Konsole anzuzeigen."

---

### Projekt 59: CLI-Argumenten-Parser für System-Informationen mit `clap`

#### 🛠️ Modul 1: Basis-Datenstrukturen (CliArgs mit Clap)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Struct `CliArgs` in Rust. Definiere ein Feld `verbose: bool` und ein Feld `typ: String`. Verwende das `clap`-Crate mit dem `Parser`-Trait und Attributen (`#[arg(short, long)]`), um aus diesen Feldern Kommandozeilenargumente zu machen. Setze für das Feld `typ` den Standardwert auf 'cpu'."

#### 🛠️ Modul 2: Implementierung & Methoden (Clap-Integration)
* **Dein Präzisions-Prompt:**
  > "Erkläre und bereite vor, wie die Struktur `CliArgs` mit dem Clap-Derive-Makro versehen wird (z. B. `#[command(name = \"SysInfo\", version = \"1.0\", about = \"...\")]`) und wie die Argumente in das Programm eingelesen werden (`CliArgs::parse()`)."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & CLI-Evaluierung)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion für dieses Programm. Rufe die Parse-Methode auf, um die CLI-Parameter einzulesen. Gib eine Meldung aus, welcher Berichtstyp gewählt wurde, und zeige zusätzliche Debug-Meldungen auf der Konsole an, falls das Flag `verbose` aktiv ist."

---

### Projekt 60: Lokale Zeitzonen-Konvertierung mit `chrono`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct mit UTC-Zeit)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstrukturen für ein Termin-System. Definiere ein Struct `Termin` mit den Feldern `name: String` und `zeit_utc: DateTime<Utc>` unter Verwendung des `chrono`-Crates."

#### 🛠️ Modul 2: Implementierung & Methoden (FixedOffset & Zeitzonen-Konvertierung)
* **Dein Präzisions-Prompt:**
  > "Erweitere `Termin` um einen `impl`-Block. Implementiere eine Methode `neue_zeit_in_zeitzone(&self, stunden_offset: i32) -> Option<DateTime<FixedOffset>>`, die aus dem Stunden-Offset über `FixedOffset::east_opt` eine Zeitzonenverschiebung berechnet und das UTC-Datum mittels `.with_timezone` in diese Zeitzone konvertiert."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Zeitformatierung)
* **Dein Präzisions-Prompt:**
  > "Schreibe eine `main`-Funktion, die einen `Termin` mit dem Namen 'Standup Meeting' und der aktuellen UTC-Zeit anlegt. Gib den Namen und die UTC-Zeit aus. Konvertiere den Termin in die deutsche Ortszeit (+2 Stunden) und gib das Ergebnis formatiert aus (z. B. mit `format(\"%H:%M:%S UTC+2\")`)."

---

### Projekt 61: HTTP-GET-Client zur IP-Abfrage mit `reqwest` und `tokio`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct mit Deserialisierung)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstruktur für die Antwort einer IP-Abfrage. Definiere ein Struct `IpResponse` mit dem Feld `ip: String` und statte es mit dem Serde-Makro `Deserialize` aus."

#### 🛠️ Modul 2: Implementierung & Methoden (Asynchrones Main)
* **Dein Präzisions-Prompt:**
  > "Deklariere den asynchronen Einstiegspunkt deiner Anwendung unter Verwendung des `tokio`-Crates (z. B. `#[tokio::main] async fn main()`). Bereite vor, dass die Funktion ein `Result<(), reqwest::Error>` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (HTTP-Request & Await)
* **Dein Präzisions-Prompt:**
  > "Schreibe den Rumpf der asynchronen `main`-Funktion. Führe mit dem `reqwest`-Crate eine HTTP-GET-Anfrage an `https://api.ipify.org?format=json` aus. Nutze `.await` für das Senden des Requests und das Parsen des JSON-Ergebnisses in eine `IpResponse`-Struktur. Gib die extrahierte IP-Adresse im Terminal aus."

---

### Projekt 62: Passwort-Generierung mit `rand`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Konfiguration)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstrukturen für einen Passwort-Generator in Rust. Definiere ein Struct `PasswortKonfigurator` mit den Feldern `laenge: usize`, `zahlen_erlaubt: bool` und `sonderzeichen_erlaubt: bool`."

#### 🛠️ Modul 2: Implementierung & Methoden (Slice-Auswahl & Rng)
* **Dein Präzisions-Prompt:**
  > "Erweitere `PasswortKonfigurator` um einen `impl`-Block. Implementiere die Methode `generiere(&self) -> String`. Baue darin einen Zeichensatz auf: Starte mit Buchstaben und füge je nach Konfiguration Zahlen und Sonderzeichen hinzu. Nutze `rand::thread_rng()` und den Trait `rand::seq::SliceRandom` (`choose`), um zufällig Zeichen bis zur gewünschten Länge auszuwählen und als String zurückzugeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Instanziiere den `PasswortKonfigurator` mit einer Länge von 16 Zeichen, wobei Zahlen und Sonderzeichen erlaubt sind. Generiere das Passwort und gib es sicher auf der Konsole aus."

---

### Projekt 63: Base64-Codierer/Decodierer für Binärdaten mit `base64`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `Base64Konverter` in Rust, um Base64-Konvertierungsfunktionen zu kapseln."

#### 🛠️ Modul 2: Implementierung & Methoden (Base64-Engine)
* **Dein Präzisions-Prompt:**
  > "Erweitere `Base64Konverter` um einen `impl`-Block. Implementiere eine Methode `codiere(daten: &[u8]) -> String`, die Binärdaten mithilfe der Standard-Base64-Engine (`base64::engine::general_purpose::STANDARD.encode`) codiert. Implementiere auch `decodiere(base64_text: &str) -> Result<Vec<u8>, base64::DecodeError>` zum Decodieren."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & UTF-8)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Codiere einen String in Base64 und gib das Ergebnis aus. Decodiere den Base64-String wieder, konvertiere die Bytes sicher zurück in einen UTF-8-String und gib diesen aus. Behandle eventuelle Decodierungsfehler."

---

### Projekt 64: Logging-System für Anwendungs-Events mit `log` und `env_logger`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Initialisierungsfunktion)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine Hilfsfunktion `initialisiere_logger()`, die das globale Logging-System mit `env_logger::init()` initialisiert."

#### 🛠️ Modul 2: Implementierung & Methoden (Log-Makros)
* **Dein Präzisions-Prompt:**
  > "Implementiere eine Funktion `pruefe_system(temperatur: f64)`. Nutze darin die Makros `error!`, `warn!` und `info!` aus dem `log`-Crate, um je nach Temperaturwert (z. B. über 90°C Fehler, über 75°C Warnung, sonst Info) entsprechende Log-Meldungen zu generieren."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Env-Variablen)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Setze programmgesteuert die Umgebungsvariable `RUST_LOG` auf 'info' (über `std::env::set_var`), initialisiere den Logger und rufe die Funktion `pruefe_system` mit verschiedenen Testwerten auf, um die Ausgaben im Terminal zu überprüfen."

---

### Projekt 65: IP-Netzwerk-Rechner mit `ipnetwork`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `NetzwerkRechner` in Rust, die zur Netzwerkanalyse dienen soll."

#### 🛠️ Modul 2: Implementierung & Methoden (IpNetwork-Parsing & Abfragen)
* **Dein Präzisions-Prompt:**
  > "Erweitere `NetzwerkRechner` um einen `impl`-Block. Implementiere eine Methode `analysiere_netzwerk(cidr: &str) -> Result<(), ipnetwork::IpNetworkError>`, die den CIDR-String als `Ipv4Network` parst und grundlegende Details wie Netzwerkadresse, Subnetzmaske, Broadcast-Adresse und die Anzahl der verfügbaren IP-Adressen ermittelt und ausgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Rufe die Methode `analysiere_netzwerk` mit einem Beispiel-CIDR-String wie '192.168.178.0/24' auf. Behandle Fehler sicher mit Pattern Matching."

---

### Projekt 66: Konfigurationsdatei-Parser für TOML mit `toml` und `serde`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Structs & Serde)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstrukturen für eine Server-Konfiguration. Definiere ein Struct `ServerConfig` mit den Feldern `host: String`, `port: u16` und `max_verbindungen: u32`. Dekoriere das Struct mit `Serialize` und `Deserialize`. Definiere zudem ein leeres Struct `ConfigVerwalter`."

#### 🛠️ Modul 2: Implementierung & Methoden (TOML-De/Serialization)
* **Dein Präzisions-Prompt:**
  > "Erweitere `ConfigVerwalter` um einen `impl`-Block. Implementiere eine Methode `lade_aus_toml(toml_inhalt: &str) -> Result<ServerConfig, toml::de::Error>`, die das `toml`-Crate (`toml::from_str`) nutzt. Implementiere auch `erstelle_toml(config: &ServerConfig) -> Result<String, toml::ser::Error>` mittels `toml::to_string_pretty`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Definiere eine TOML-Zeichenkette mit Host, Port und Verbindungen. Lade die Konfiguration in ein `ServerConfig`-Objekt, gib dieses aus, serialisiere es wieder zurück in das TOML-Format und zeige das generierte TOML an."

---

### Projekt 67: SemVer-Versionsvergleicher mit `semver`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `PluginSchnittstelle` in Rust zur Kapselung von Versionsprüfungen."

#### 🛠️ Modul 2: Implementierung & Methoden (SemVer-Vergleich)
* **Dein Präzisions-Prompt:**
  > "Erweitere `PluginSchnittstelle` um einen `impl`-Block. Implementiere eine Methode `ist_kompatibel(plugin_version: &str, app_anforderung: &str) -> Result<bool, semver::Error>`, die die Version (`Version::parse`) und die Anforderung (`VersionReq::parse`) parst und prüft, ob die Version der Anforderung entspricht."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Definiere eine App-Anforderung (z. B. '>=1.2.0, <2.0.0'). Teste zwei unterschiedliche Plugin-Versionen auf Kompatibilität und gib das Ergebnis übersichtlich auf der Konsole aus."

---

### Projekt 68: Temporäre Dateien und Verzeichnisse für Tests mit `tempfile`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `TemporaererSpeicher` in Rust, um das Erstellen von temporären Dateien zu kapseln."

#### 🛠️ Modul 2: Implementierung & Methoden (NamedTempFile & Pfad-Ermittlung)
* **Dein Präzisions-Prompt:**
  > "Erweitere `TemporaererSpeicher` um einen `impl`-Block. Implementiere eine Methode `schreibe_temporaere_daten(inhalt: &str) -> Result<String, io::Error>`, die eine temporäre Datei mit `NamedTempFile::new()` erstellt, Text hineinschreibt und den Pfad der Datei als String zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main & Scope-Verhalten)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Rufe die Methode `schreibe_temporaere_daten` mit Testdaten auf, gib den ermittelten Dateipfad aus und verifiziere mit `std::path::Path::new(&pfad).exists()`, ob die Datei existiert. Zeige, dass die Datei nach Verlassen des Gültigkeitsbereichs automatisch vom System gelöscht wird."

---

### Projekt 69: Glob-Pattern-Dateisuche mit `glob`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `Dateisucher` in Rust, um Dateisuchfunktionen zu strukturieren."

#### 🛠️ Modul 2: Implementierung & Methoden (Globbing & Pfad-Sammlung)
* **Dein Präzisions-Prompt:**
  > "Erweitere `Dateisucher` um einen `impl`-Block. Implementiere eine Methode `finde_dateien(muster: &str) -> Result<Vec<PathBuf>, glob::PatternError>`, die über `glob(muster)` nach passenden Dateien sucht und die gefundenen Pfade (`PathBuf`) in einem Vektor sammelt und zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Starte eine Dateisuche mit einem Suchmuster (z. B. '*.json') im aktuellen Verzeichnis, gib alle gefundenen Pfade aus und behandle Musterfehler."

---

### Projekt 70: HTML-Scraper für Überschriften mit `scraper`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `HtmlAnalysator` in Rust."

#### 🛠️ Modul 2: Implementierung & Methoden (Html-Parsing & CSS-Selektoren)
* **Dein Präzisions-Prompt:**
  > "Erweitere `HtmlAnalysator` um einen `impl`-Block. Implementiere eine Methode `extrahiere_h1(html_dokument: &str) -> Vec<String>`, die HTML über `Html::parse_document` parst, einen Selektor für 'h1' über `Selector::parse` definiert und die Texte aller passenden Elemente sammelt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Definiere ein HTML-Dokument mit H1-Elementen als String. Extrahiere die Überschriften mit `extrahiere_h1` und gib sie im Terminal aus."

---

### Projekt 71: Tar-Archiv-Ersteller mit `tar` und `flate2`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Hilfsstruktur)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `Archivierer` in Rust."

#### 🛠️ Modul 2: Implementierung & Methoden (Tar-Builder & GzEncoder)
* **Dein Präzisions-Prompt:**
  > "Erweitere `Archivierer` um einen `impl`-Block. Implementiere eine Methode `packe_verzeichnis(ordner_pfad: &str, archiv_pfad: &str) -> Result<(), io::Error>`, die eine Datei erstellt, einen `GzEncoder` (aus dem `flate2`-Crate) zur Gzip-Komprimierung erzeugt und mithilfe von `tar::Builder::new` das Verzeichnis packt (`append_dir_all`)."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Packe das aktuelle Verzeichnis in ein Archiv namens 'test_archiv.tar.gz'. Behandle Fehler sicher, gib eine Erfolgsmeldung aus und lösche das Archiv nach dem Test programmgesteuert wieder."

---

### Projekt 72: JWT-Token-Generator und -Prüfer mit `jsonwebtoken` und `serde`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Claims & Serde)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstrukturen für ein JWT-System in Rust. Definiere ein Struct `Claims` mit den Feldern `sub: String`, `company: String` und `exp: usize` (Ablaufzeitstempel) und statte es mit `Serialize` und `Deserialize` aus. Definiere ein leeres Struct `TokenManager`."

#### 🛠️ Modul 2: Implementierung & Methoden (JWT-Kompilierung & Validierung)
* **Dein Präzisions-Prompt:**
  > "Erweitere `TokenManager` um einen `impl`-Block. Implementiere die Methoden `erstelle_token(claims: &Claims, geheimnis: &[u8]) -> Result<String, jsonwebtoken::errors::Error>` und `validiere_token(token: &str, geheimnis: &[u8]) -> Result<Claims, jsonwebtoken::errors::Error>`. Nutze `encode` und `decode` mit dem HS256-Algorithmus aus dem `jsonwebtoken`-Crate."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Erzeuge Claims mit einer E-Mail-Adresse und einem Ablaufdatum in der Zukunft. Generiere ein Token mit einem geheimen Schlüssel, gib es aus, validiere das Token und gib den Validierungsstatus sowie das Subjekt aus."

---

### Projekt 73: Terminal-Fortschrittsbalken-Simulation mit `indicatif`

#### 🛠️ Modul 1: Basis-Datenstrukturen (FortschrittsSimulant)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine leere Struktur `FortschrittsSimulant` in Rust."

#### 🛠️ Modul 2: Implementierung & Methoden (ProgressBar & ProgressStyle)
* **Dein Präzisions-Prompt:**
  > "Erweitere `FortschrittsSimulant` um einen `impl`-Block. Implementiere eine Methode `simuliere_laden(schritte: u64)`, die eine `ProgressBar` über `ProgressBar::new` erstellt, das Style mit `ProgressStyle::with_template` konfiguriert (z. B. mit einem Spinner und Fortschrittszeichen '#>-') und den Balken in einer Schleife mittels `pb.inc(1)` und einer Pause (`std::thread::sleep`) erhöht."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Rufe `simuliere_laden` mit 50 Schritten auf, um einen Download-Ladevorgang mit Fortschrittsbalken im Terminal zu simulieren."

---

### Projekt 74: Thread-sichere globale Konfiguration mit `once_cell`

#### 🛠️ Modul 1: Basis-Datenstrukturen (SystemStatus & Globaler Lazy Zustand)
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Struct `SystemStatus` mit dem Feld `fehler_anzahl: u32`. Deklariere eine thread-sichere globale Konfiguration `GLOBALER_STATUS` vom Typ `Lazy<Mutex<SystemStatus>>` unter Verwendung des `once_cell::sync::Lazy`-Crates."

#### 🛠️ Modul 2: Implementierung & Methoden (Mutex-Locking)
* **Dein Präzisions-Prompt:**
  > "Implementiere eine Funktion `logge_fehler()`, die auf den globalen Zustand `GLOBALER_STATUS` zugreift, den Mutex sperrt, die Fehleranzahl um eins erhöht und die Gesamtfehleranzahl auf der Konsole ausgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Rufe die Funktion `logge_fehler` mehrfach auf, um zu demonstrieren, dass der Zustand global und thread-sicher über die Funktionsaufrufe hinweg erhalten bleibt."

---

### Projekt 75: YAML-Datenkonverter mit `serde_yaml` und `serde_json`

#### 🛠️ Modul 1: Basis-Datenstrukturen (Structs & Serde-Attribute)
* **Dein Präzisions-Prompt:**
  > "Erstelle die Datenstrukturen für ein Benutzerprofil. Definiere ein Struct `BenutzerProfil` mit den Feldern `benutzername: String`, `berechtigungen: Vec<String>` und `aktiviert: bool`. Statte das Struct mit `Serialize` und `Deserialize` aus. Definiere ein leeres Struct `FormatKonverter`."

#### 🛠️ Modul 2: Implementierung & Methoden (Yaml-zu-Json Konvertierung)
* **Dein Präzisions-Prompt:**
  > "Erweitere `FormatKonverter` um einen `impl`-Block. Implementiere eine Methode `yaml_zu_json(yaml_inhalt: &str) -> Result<String, String>`, die das YAML-Dokument mittels `serde_yaml::from_str` deserialisiert und das Ergebnis mittels `serde_json::to_string_pretty` in ein formatiertes JSON konvertiert."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Schreibe die `main`-Funktion. Definiere ein YAML-Dokument als String (mit Benutzername, Berechtigungen und Aktivierungsstatus). Konvertiere das YAML mithilfe von `yaml_zu_json` in JSON und gib das Ergebnis auf dem Bildschirm aus. Behandle Fehler sicher."

---

## 100 Projekte – Nur Prompts (Modulares Prinzip) (Phase 4 - Teil 4: Projekte 76 bis 100)

In diesem Teil des Katalogs erarbeitest du die Projekte 76 bis 100 mit Fokus auf **Kombination von Collections, Fehlerbehandlung und modularer Strukturierung**. Der Schwerpunkt liegt darauf, wie du diese komplexeren Anwendungen sauber strukturierst und durch das modulare Prinzip Schritt für Schritt aufbaust.

---

### Projekt 76: Smarthome-Geräte-Status

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `GeraeteTyp` mit den Varianten `Licht`, `Heizung` und `Steckdose`. Definiere ein Enum `GeraeteStatus` mit den Varianten `An`, `Aus` und `Standby`. Leite für `GeraeteStatus` die Traits `Debug`, `Clone`, `Copy` und `PartialEq` ab. Definiere ein Struct `SmartGeraet` mit den Feldern `id: u32`, `typ: GeraeteTyp` und `status: GeraeteStatus`. Definiere ein Struct `SmartHomeZentrale` mit einem Feld `geraete: HashMap<String, SmartGeraet>`, das die Geräte verwaltet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `SmartHomeZentrale`. Implementiere die Methode `neu() -> Self` zum Erstellen einer leeren Zentrale. Implementiere die Methode `registrieren(&mut self, name: String, id: u32, typ: GeraeteTyp)`, die ein neues `SmartGeraet` mit dem Status `GeraeteStatus::Aus` erzeugt und in die HashMap einträgt. Implementiere die Methode `status_aendern(&mut self, name: &str, neuer_status: GeraeteStatus) -> Result<(), String>`, die den Status des angegebenen Geräts ändert oder ein `Err` zurückgibt, falls das Gerät nicht gefunden wird."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion für das Smarthome-System. Instanziere die `SmartHomeZentrale`, registriere ein 'Wohnzimmerlicht' (Typ `Licht`) und eine 'Kuechenheizung' (Typ `Heizung`). Versuche, den Status des Lichts erfolgreich zu ändern, und versuche danach, den Status eines nicht existierenden Geräts namens 'Garagentor' zu ändern. Werte die zurückgegebenen `Result`-Werte mit Pattern Matching bzw. `if let Err` aus und gib deutsche Statusmeldungen auf der Konsole aus."

---

### Projekt 77: Studenten-Kurssystem

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen in Rust. Definiere ein Enum `RegistrierungsFehler` mit den Varianten `StudentNichtGefunden`, `KursBereitsBelegt` und `KursVoll`. Definiere ein Struct `Student` mit den Feldern `name: String` und `kurse: Vec<String>`. Definiere das Struct `KursSystem` mit den Feldern `studenten: HashMap<u32, Student>` (Matrikelnummer zu Student) und `kurse: HashMap<String, (usize, usize)>` (Kursname zu belegten Plätzen und maximaler Kapazität)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `KursSystem`. Implementiere die Methode `neu() -> Self`. Implementiere `student_anlegen(&mut self, matrikelnr: u32, name: String)`, die einen Studenten in der Map einträgt. Implementiere `kurs_anlegen(&mut self, name: String, kapazitaet: usize)`, die einen Kurs mit 0 belegten Plätzen einträgt. Implementiere die Methode `registrieren(&mut self, matrikelnr: u32, kurs_name: String) -> Result<(), RegistrierungsFehler>`, die: 1. Prüft, ob der Kurs existiert (andernfalls `Err(RegistrierungsFehler::StudentNichtGefunden)` zurückgibt). 2. Prüft, ob der Kurs voll ist (andernfalls `Err(RegistrierungsFehler::KursVoll)` zurückgibt). 3. Prüft, ob der Student existiert (andernfalls `Err(RegistrierungsFehler::StudentNichtGefunden)` zurückgibt). 4. Prüft, ob der Student bereits für den Kurs registriert ist (andernfalls `Err(RegistrierungsFehler::KursBereitsBelegt)` zurückgibt). 5. Wenn alles in Ordnung ist, die belegten Plätze erhöht, den Kursnamen in die Liste des Studenten einträgt und `Ok(())` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Initialisiere das `KursSystem`. Lege eine Studentin namens 'Anna' mit Matrikelnummer 1001 und einen Kurs 'Rust-Programmierung' mit Kapazität 2 an. Registriere Anna erfolgreich für den Kurs und versuche danach, sie ein zweites Mal für denselben Kurs zu registrieren. Behandle die Fehler und Erfolge mit `match` und gib verständliche Meldungen aus."

---

### Projekt 78: Paket-Versandstation

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen für ein Paketsystem. Definiere ein Enum `PaketStatus` mit den Varianten `ImDepot`, `InZustellung` und `Zugestellt(String)` (wobei die Variante `Zugestellt` den Namen des Empfängers holds). Definiere ein Struct `Paket` mit den Feldern `zieladresse: String` und `status: PaketStatus`. Definiere ein Struct `VersandStation` mit dem Feld `pakete: HashMap<String, Paket>` zur Verknüpfung der Sendungsnummer mit dem Paket."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `VersandStation`. Implementiere `neu() -> Self` zur Initialisierung. Implementiere `paket_einliefern(&mut self, sendungsnr: String, adresse: String)`, die ein Paket im Status `PaketStatus::ImDepot` einträgt. Implementiere `status_aendern(&mut self, sendungsnr: &str, neuer_status: PaketStatus) -> Result<(), String>`, die den Status eines Pakets anpasst. Falls das Paket bereits zugestellt ist (`Zugestellt(_)`) oder die Sendungsnummer nicht existiert, soll ein Fehler zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge eine `VersandStation` und liefere ein Paket mit der Nummer 'DE123456789' an. Ändere den Status erfolgreich auf zugestellt (Empfängerin: 'Frau Schmidt'). Versuche danach, den Status erneut auf 'InZustellung' zu ändern, fange den Fehler mit `if let Err` ab und gib ihn aus."

---

### Projekt 79: Bankkonten-Verwaltung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen für ein Bankensystem. Definiere ein Enum `TransaktionsFehler` mit den Werten `KontoNichtGefunden`, `UeberziehungsschutzAktiv` und `UngueltigerBetrag`. Definiere ein Struct `Konto` mit den Feldern `inhaber: String` und `kontostand: f64`. Definiere ein Struct `Bank` mit dem Feld `konten: HashMap<String, Konto>`, das IBANs auf Konten abbildet."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Bank`. Implementiere `neu() -> Self`. Implementiere `konto_eroeffnen(&mut self, iban: String, inhaber: String, startguthaben: f64)`. Implementiere `ueberweisen(&mut self, von_iban: &str, zu_iban: &str, betrag: f64) -> Result<(), TransaktionsFehler>`: - Prüfe, ob der Betrag kleiner oder gleich 0 ist (`UngueltigerBetrag`). - Prüfe die Existenz beider Konten (`KontoNichtGefunden`). - Prüfe, ob das Absenderkonto ausreichend gedeckt ist (`UeberziehungsschutzAktiv`). - Ziehe den Betrag vom Absenderkonto ab und schreibe ihn dem Empfängerkonto gut."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Eröffne Konten für Alice (DE01, Guthaben 500.0) und Bob (DE02, Guthaben 100.0). Überweise 150.0 von Alice zu Bob, werte das Resultat mit `match` aus und gib den Status der Transaktion aus."

---

### Projekt 80: Fitness-Tracker

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere ein Enum `Aktivitaet` mit den Varianten `Laufen`, `Radfahren` und `Schwimmen`. Definiere ein Struct `Training` mit den Feldern `typ: Aktivitaet`, `dauer_minuten: u32` und `kalorien: u32`. Definiere das Struct `FitnessTracker` mit dem Feld `trainings_log: HashMap<String, Vec<Training>>` (Datum zu Trainingsliste)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `FitnessTracker`. Implementiere `neu() -> Self`. Implementiere die Methode `training_eintragen(&mut self, datum: String, training: Training)`, die den Eintrag für das angegebene Datum hinzufügt (nutze `entry` und `or_insert`, um die Liste bei Bedarf zu erzeugen). Implementiere `kalorien_am_tag(&self, datum: &str) -> Result<u32, String>`, die alle verbrannten Kalorien an diesem Tag aufsummiert (mit `map` und `sum`), oder ein `Err` zurückgibt, falls für das Datum kein Log existiert."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Instanziere den `FitnessTracker`, trage zwei Trainings für das Datum '2026-07-12' ein (z. B. Laufen für 450 kcal und Schwimmen für 300 kcal). Rufe die Gesamtkalorien ab, werte das Ergebnis mit `match` aus und gib das Resultat auf der Konsole aus."

---

### Projekt 81: Parkplatz-Reservierung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `FahrzeugTyp` mit den Varianten `Motorrad`, `Pkw` und `Lkw`. Definiere das Struct `ParkTicket` mit `typ: FahrzeugTyp` und `einfahrtzeit: u64` (in Minuten). Definiere das Struct `Parkhaus` mit `belegte_plaetze: HashMap<String, ParkTicket>` (Kennzeichen zu Ticket) und `kapazitaet: usize`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Parkhaus`. Implementiere `neu(kapazitaet: usize) -> Self`. Implementiere `einfahren(&mut self, kennzeichen: String, typ: FahrzeugTyp, zeit: u64) -> Result<(), String>`, die fehlschlägt, falls das Parkhaus voll ist oder das Fahrzeug bereits registriert ist. Implementiere `ausfahren(&mut self, kennzeichen: &str, ausfahrtzeit: u64) -> Result<f64, String>`, die das Fahrzeug aus der Map entfernt, die Zeitdifferenz berechnet und basierend auf dem Fahrzeugtyp (Motorrad: 1.50 EUR, Pkw: 3.00 EUR, Lkw: 8.00 EUR pro angefangener Stunde) die Parkgebühr berechnet und zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `main`-Funktion. Initialisiere das `Parkhaus` mit Kapazität 5. Registriere ein Auto 'HH-AB-123' bei Einfahrtzeit 0. Simuliere die Ausfahrt nach 120 Minuten, berechne die Parkgebühr und gib sie formatiert auf Deutsch aus (Fehlerfälle mit `match` abfangen)."

---

### Projekt 82: Restaurant-Bestellsystem

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen für eine Restaurantkasse. Definiere ein Enum `SpeiseStatus` mit den Varianten `Bestellt`, `InZubereitung` und `Serviert`. Definiere ein Struct `Gericht` mit den Feldern `name: String`, `preis: f64` und `status: SpeiseStatus`. Definiere das Struct `RestaurantKasse` mit dem Feld `tisch_bestellungen: HashMap<u8, Vec<Gericht>>` (Tischnummer zu Liste von Gerichten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `RestaurantKasse`. Implementiere `neu() -> Self`. Implementiere `gericht_bestellen(&mut self, tisch: u8, name: String, preis: f64)`, um eine Bestellung hinzuzufügen. Implementiere `status_aendern(&mut self, tisch: u8, index: usize, neuer_status: SpeiseStatus) -> Result<(), String>`, die den Status des Gerichts an der angegebenen Indexposition des Tisches ändert oder bei ungültigem Tisch bzw. Index ein `Err` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `main`-Funktion. Erzeuge eine `RestaurantKasse`, bestelle für Tisch 3 ein 'Schnitzel' (14.50) and ein 'Spezi' (3.50). Ändere den Status des Schnitzels (Index 0) erfolgreich auf 'InZubereitung' und behandle das Ergebnis mit `match`."

---

### Projekt 83: Bibliothek-Benutzerkonten

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Struct `Ausleihe` mit `titel: String` und `ausleihtag: u32`. Definiere ein Struct `Benutzer` mit `name: String` und `ausgeliehene_buecher: Vec<Ausleihe>`. Definiere das Struct `BibliotheksSystem` mit dem Feld `mitglieder: HashMap<u32, Benutzer>` (Mitglieds-ID zu Benutzer)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `BibliotheksSystem`. Implementiere `neu() -> Self`. Implementiere `mitglied_registrieren(&mut self, id: u32, name: String)`. Implementiere `buch_ausleihen(&mut self, id: u32, titel: String, tag: u32)`. Implementiere `mahngebuehr_berechnen(&self, id: u32, aktueller_tag: u32) -> Result<f64, String>`, die das Mitglied sucht, die Ausleihfrist von 14 Tagen für jedes Buch prüft und bei Überschreitung 0.50 EUR pro Tag berechnet. Gibt die Summe zurück oder ein `Err` bei unbekanntem Mitglied."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Registriere das Mitglied Dieter (ID 101) im `BibliotheksSystem`. Leihe an Tag 100 das Buch 'Rust Handbuch' aus. Berechne an Tag 120 die Mahngebühren und gib sie formatiert auf Deutsch aus (mit `match` zur Fehlerprüfung)."

---

### Projekt 84: DNS-Cache-Simulator

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere ein Struct `DnsEintrag` mit `ip_adresse: String` und `ablaufzeit: u32`. Definiere das Struct `DnsCache` mit `eintraege: HashMap<String, DnsEintrag>` (Domain zu DnsEintrag)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `DnsCache`. Implementiere `neu() -> Self`. Implementiere `eintragen(&mut self, domain: String, ip: String, ttl_sekunden: u32, startzeit: u32)`, die die Ablaufzeit als `startzeit + ttl_sekunden` speichert. Implementiere `aufloesen(&self, domain: &str, aktuelle_zeit: u32) -> Result<String, String>`, die die Domain sucht. Wenn sie existiert und die Ablaufzeit noch nicht überschritten ist, gibt sie die IP-Adresse zurück. Andernfalls gibt sie ein `Err` zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Erzeuge den `DnsCache` und trage 'rust-lang.org' mit der IP '13.224.29.89' und TTL 60 bei Zeitpunkt 1000 ein. Löst die Domain bei Zeitpunkt 1030 erfolgreich auf und gib die IP aus. Teste die Auflösung bei Zeitpunkt 1100, um den Fehler für abgelaufene Einträge auszugeben."

---

### Projekt 85: Videospiel-Inventar

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere ein Enum `Seltenheit` mit den Varianten `Gewoehnlich`, `Selten`, `Episch` und `Legendaer`. Definiere ein Struct `Item` mit den Feldern `name: String` und `seltenheit: Seltenheit`. Definiere das Struct `Inventar` mit `plaetze: HashMap<String, (Item, u32)>` (Item-Name zu (Item, Anzahl)) und `max_plaetze: usize`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Inventar`. Implementiere `neu(max_plaetze: usize) -> Self`. Implementiere `item_hinzufuegen(&mut self, item: Item, anzahl: u32) -> Result<(), String>`, die bei bereits existierendem Item die Anzahl erhöht. Ist das Item neu, das Inventar aber voll, soll ein `Err` zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle eine passende `main`-Funktion. Erzeuge ein `Inventar` mit 2 Plätzen. Füge ein 'Eisenschwert' und einen 'Elfenbogen' hinzu. Versuche danach, einen 'Heiltrank' hinzuzufügen, fange den Fehler (Inventar voll) mit `match` ab und gib ihn auf Deutsch aus."

---

### Projekt 86: Flugbuchungs-System

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `FlugKlasse` mit den Varianten `Economy` und `Business`. Definiere das Struct `Passagier` mit `name: String` und `klasse: FlugKlasse`. Definiere das Struct `Flug` mit `flugnummer: String`, `passagiere: HashMap<String, Passagier>` (Sitzplatz zu Passagier) und `kapazitaet: usize`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Flug`. Implementiere `neu(flugnummer: String, kapazitaet: usize) -> Self`. Implementiere `sitz_buchen(&mut self, sitz: String, name: String, klasse: FlugKlasse) -> Result<(), String>`, die einen Sitzplatz bucht, falls der Flug noch nicht ausgebucht ist und der Sitzplatz noch frei ist, andernfalls soll ein Fehler zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Erzeuge einen `Flug` mit Flugnummer 'LH456' und Kapazität 150. Reserviere Sitz '12A' für Markus. Versuche danach, Sitz '12A' für Sabine zu buchen, fange den Fehler mit `if let Err` ab und gib eine verständliche Fehlermeldung aus."

---

### Projekt 87: Kinosaal-Ticketshop

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `PlatzKategorie` mit `Parkett` und `Loge`. Definiere das Enum `BelegungsStatus` mit `Frei` und `Verkauft`. Definiere ein Struct `KinoSitz` mit `kategorie: PlatzKategorie` und `status: BelegungsStatus`. Definiere das Struct `TicketShop` mit `saalplan: HashMap<String, KinoSitz>` (Koordinate zu Sitz)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `TicketShop`. Implementiere `neu() -> Self`. Implementiere `sitz_hinzufuegen(&mut self, koordinate: String, kat: PlatzKategorie)`, um einen freien Sitz im Saalplan anzulegen. Implementiere `ticket_kaufen(&mut self, koordinate: &str) -> Result<f64, String>`, die den Sitz sucht, auf `Verkauft` setzt und den Preis zurückgibt (Parkett: 8.50 EUR, Loge: 12.00 EUR). Gibt einen Fehler zurück, falls der Sitz bereits belegt ist oder nicht existiert."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Initialisiere den `TicketShop`, füge einen Sitz 'R1-P5' (Parkett) und 'R5-P10' (Loge) hinzu. Kaufe das Ticket 'R5-P10' erfolgreich, werte das Resultat mit `match` aus und gib den Ticketpreis aus."

---

### Projekt 88: Onlineshop-Wunschzettel

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Struct `Produkt` mit `id: u32`, `name: String` und `preis: f64`. Definiere das Struct `Kunde` mit `wunschzettel: Vec<Produkt>` und `warenkorb: HashMap<u32, u32>` (Produkt-ID zu Menge). Definiere das Struct `OnlineShop` mit `kunden: HashMap<String, Kunde>` (Name zu Kunde)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `OnlineShop`. Implementiere `neu() -> Self`. Implementiere `kunde_registrieren(&mut self, name: String)`. Implementiere `wunsch_hinzufuegen(&mut self, kundenname: &str, produkt: Produkt)`. Implementiere `wunsch_in_warenkorb(&mut self, kundenname: &str, produkt_id: u32) -> Result<(), String>`, die das Produkt vom Wunschzettel des Kunden entfernt und als Artikel im Warenkorb ablegt (Menge erhöhen), oder andernfalls ein `Err` zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Registriere den Kunden Mark, füge ein 'Rust Buch' (ID 44, Preis 29.90) zu seinem Wunschzettel hinzu. Verschiebe das Buch in den Warenkorb und gib das Ergebnis mit `match` auf der Konsole aus."

---

### Projekt 89: Wetterdaten-Archiv

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Struct `WetterStation` mit `bezeichnung: String` und `messwerte: Vec<f64>`. Definiere das Struct `WetterArchiv` mit `stationen: HashMap<String, WetterStation>` (Stations-ID zu Station)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `WetterArchiv`. Implementiere `neu() -> Self`. Implementiere `station_anlegen(&mut self, id: String, name: String)`. Implementiere `messwert_hinzufuegen(&mut self, id: &str, temperatur: f64)`. Implementiere `durchschnitts_temperatur(&self, id: &str) -> Result<f64, String>`, die den Temperaturdurchschnitt einer Station berechnet oder ein `Err` zurückgibt, falls die Station nicht existiert oder noch keine Messwerte vorliegen."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Erzeuge ein `WetterArchiv`, lege eine Station 'STA-01' ('Zugspitze') an und füge drei Temperaturen hinzu (-2.5, -1.0, 0.5). Berechne den Durchschnitt und gib ihn auf Deutsch aus."

---

### Projekt 90: Auto-Werkstatt-Planer

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `AuftragsStatus` mit `Angenommen`, `InArbeit` und `Erledigt`. Definiere ein Struct `ReparaturAuftrag` mit `kennzeichen: String`, `beschreibung: String`, `status: AuftragsStatus` und `kosten: f64`. Definiere ein Struct `KfzWerkstatt` mit `auftraege: HashMap<u32, ReparaturAuftrag>` und `naechste_id: u32`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `KfzWerkstatt`. Implementiere `neu() -> Self`. Implementiere `auftrag_erstellen(&mut self, kennzeichen: String, beschreibung: String) -> u32`, die den Auftrag mit Status `Angenommen` anlegt und die neue ID zurückgibt. Implementiere `auftrag_starten(&mut self, id: u32) -> Result<(), String>` und `auftrag_abschliessen(&mut self, id: u32, kosten: f64) -> Result<(), String>`. Beide Methoden müssen den aktuellen Status validieren und den Status ändern (bzw. die Kosten hinterlegen) oder bei ungültigen Übergängen ein `Err` zurückgeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Initialisiere die `KfzWerkstatt`, erstelle einen Auftrag für das Kennzeichen 'B-R-2026' ('Bremsscheiben wechseln'). Starte den Auftrag und schließe ihn danach erfolgreich mit Kosten von 250.0 ab. Behandle alle Fehler per `match`."

---

### Projekt 91: Server-Metriken-Monitor

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `MetrikTyp` mit `Cpu` und `Ram`. Definiere das Enum `WarnStufe` mit `Normal`, `Warnung` und `Kritisch`. Definiere ein Struct `Metrik` mit `typ: MetrikTyp` und `wert: f64`. Definiere das Struct `ServerMonitor` mit `server_daten: HashMap<String, Vec<Metrik>>` (Server-ID zu Messwerten)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `ServerMonitor`. Implementiere `neu() -> Self`. Implementiere `metrik_speichern(&mut self, server_id: String, typ: MetrikTyp, wert: f64)`. Implementiere `cpu_status_pruefen(&self, server_id: &str) -> Result<WarnStufe, String>`, die den Server sucht, den letzten CPU-Wert ermittelt und basierend auf Schwellenwerten (>90.0: Kritisch, >70.0: Warnung, sonst Normal) die Warnstufe zurückgibt. Bei fehlenden CPU-Daten oder unbekanntem Server soll ein `Err` erzeugt werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Erzeuge den `ServerMonitor`, speichere für 'srv-01' zwei CPU-Metriken (45.0, danach 92.5). Prüfe die Warnstufe und gib sie aus."

---

### Projekt 92: E-Learning-Fortschritt

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `KursStatus` mit `Aktiv` und `Abgeschlossen`. Definiere ein Struct `LektionsFortschritt` mit `lektions_name: String` und `bestanden: bool`. Definiere das Struct `BenutzerProfil` mit `kurs_daten: HashMap<String, (KursStatus, Vec<LektionsFortschritt>)>` (Kursname zu Kursstatus und Lektionsfortschritt). Definiere das Struct `ELearningPlattform` mit `benutzer: HashMap<u32, BenutzerProfil>` (Benutzer-ID zu Benutzerprofil)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `ELearningPlattform`. Implementiere `neu() -> Self`, `user_registrieren(&mut self, id: u32)`, `kurs_belegen(&mut self, id: u32, kurs: String)` und `lektion_abschliessen(&mut self, id: u32, kurs: &str, lektion: String, bestanden: bool)`. Implementiere die Methode `zertifikat_ausstellen(&mut self, id: u32, kurs: &str) -> Result<(), String>`, die prüft, ob alle Lektionen des Kurses bestanden wurden (`all`), den Status auf `Abgeschlossen` setzt und `Ok(())` zurückgibt, andernfalls ein `Err`."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Registriere den Benutzer 99, belege den Kurs 'Einführung in Rust' und schließe die Lektion 'Ownership' (bestanden) und 'Generics' (nicht bestanden) ab. Versuche, ein Zertifikat auszustellen und gib das Ergebnis aus."

---

### Projekt 93: Rezept-Zutatenrechner

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Struct `Zutat` mit `einheit: String` und `menge_pro_portion: f64`. Definiere das Struct `Rezept` mit `bezeichnung: String` und `zutatenliste: HashMap<String, Zutat>` (Zutatenname zu Zutat). Definiere das Struct `BackStube` mit `rezepte: HashMap<String, Rezept>` und `lager: HashMap<String, f64>` (Zutatenname zu Menge)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `BackStube`. Implementiere `neu() -> Self`, `rezept_hinzufuegen(&mut self, rezept: Rezept)` und `zutat_einlagern(&mut self, name: String, menge: f64)`. Implementiere `backen_moeglich(&self, rezept_name: &str, portionen: f64) -> Result<(), String>`, die prüft, ob für das Rezept genug Zutaten im Lager vorhanden sind (vergleiche die benötigte Menge mit dem Lagerbestand) und bei Mangel einen Fehler mit Details zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Erzeuge eine `BackStube` und erstelle das Rezept 'Pfannkuchen' mit den Zutaten 'Eier' (1 Stk/Portion) und 'Mehl' (100g/Portion). Lagere 3 Eier und 500g Mehl ein. Prüfe, ob 4 Portionen gebacken werden können, und gib das Ergebnis aus."

---

### Projekt 94: E-Scooter-Verleih

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `ScooterStatus` mit den Varianten `Verfuegbar`, `Ausgeliehen(String)` (mit dem Namen des Benutzers) und `Wartung`. Definiere das Struct `Scooter` mit `akku: u8` und `status: ScooterStatus`. Definiere das Struct `ScooterVerleih` mit `flotte: HashMap<u32, Scooter>` (Scooter-ID zu Scooter)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `ScooterVerleih`. Implementiere `neu() -> Self` und `scooter_registrieren(&mut self, id: u32, akku: u8)`. Implementiere `ausleihen(&mut self, id: u32, benutzer: String) -> Result<(), String>`, die den Scooter sucht und ausleiht, sofern er `Verfuegbar` ist und der Ladestand mindestens 20 % beträgt, andernfalls soll ein `Err` zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Registriere Scooter 1 (85% Akku) und Scooter 2 (15% Akku) im Verleih. Leihe Scooter 1 erfolgreich aus. Versuche, Scooter 2 auszuleihen, fange den Fehler ab und gib ihn aus."

---

### Projekt 95: Fuhrpark-Manager

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `FahrzeugStatus` mit `Bereit` und `Dienstfahrt`. Definiere ein Struct `Dienstwagen` mit `kennzeichen: String`, `kilometerstand: u32` und `status: FahrzeugStatus`. Definiere ein Struct `Fuhrpark` mit `autos: HashMap<String, Dienstwagen>` (Kennzeichen zu Dienstwagen)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Fuhrpark`. Implementiere `neu() -> Self` und `fahrzeug_aufnehmen(&mut self, kennzeichen: String, kilometer: u32)`. Implementiere `fahrt_beenden(&mut self, kennzeichen: &str, kilometer_neu: u32) -> Result<(), String>`, die den Kilometerstand aktualisiert und den Status wieder auf `Bereit` setzt. Fällt der neue Kilometerstand geringer aus als der alte, soll ein Fehler zurückgegeben werden."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Nimm ein Auto 'M-EX-2026' mit 12500 km im `Fuhrpark` auf. Beende eine Fahrt bei Kilometerstand 12850 und gib das Ergebnis mit `match` aus."

---

### Projekt 96: Chatroom-Moderation

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `ChatRolle` mit `User` und `Moderator`. Definiere das Enum `ModStatus` mit `Aktiv`, `Verwarnt(u32)` (wobei die Anzahl der Verwarnungen gespeichert wird) und `Gesperrt`. Definiere ein Struct `Mitglied` mit `name: String`, `rolle: ChatRolle` und `status: ModStatus`. Definiere das Struct `ModSystem` mit `mitglieder: HashMap<String, Mitglied>` (Name zu Mitglied)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `ModSystem`. Implementiere `neu() -> Self` und `user_registrieren(&mut self, name: String, rolle: ChatRolle)`. Implementiere `user_verwarnen(&mut self, moderator_name: &str, target_name: &str) -> Result<(), String>`, die prüft, ob der Verwarnende die Rolle `Moderator` besitzt (andernfalls Aktion verweigern). Erhöhe bei Verwarnungen den Zähler; bei der 3. Verwarnung soll der Benutzer gesperrt werden. Ist er bereits gesperrt, gib einen Fehler zurück."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Registriere Alice als Moderatorin und BadGuy als normalen User. Verwarne BadGuy dreimal und zeige die automatische Sperrung nach der 3. Verwarnung."

---

### Projekt 97: Gutschein-Verwaltung

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `RabattTyp` mit den Varianten `Prozent(f64)` (z. B. 0.10 für 10%) und `Festwert(f64)`. Definiere das Struct `Gutschein` mit `typ: RabattTyp` und `aktiv: bool`. Definiere das Struct `GutscheinSystem` mit `datenbank: HashMap<String, Gutschein>` (Code zu Gutschein)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `GutscheinSystem`. Implementiere `neu() -> Self` und `gutschein_erstellen(&mut self, code: String, typ: RabattTyp)`. Implementiere `gutschein_anwenden(&mut self, code: &str, warenwert: f64) -> Result<f64, String>`, die den Gutschein sucht, prüft ob er noch `aktiv` ist, den Rabatt berechnet (maximal bis zum Warenwert), den Gutschein deaktiviert und den reduzierten Preis zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Erstelle den Gutschein 'SAVE10' mit 10% Rabatt. Wende den Gutschein erfolgreich auf einen Warenwert von 50.00 EUR an und gib den neuen Preis aus. Versuche, ihn ein zweites Mal anzuwenden und fange den Fehler ab."

---

### Projekt 98: Bewerber-Tracking-System

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `BewerbungsStatus` mit `Eingegangen`, `Interview`, `Eingestellt` und `Abgelehnt`. Definiere ein Struct `Bewerber` mit `name: String`, `email: String` und `status: BewerbungsStatus`. Definiere das Struct `RecruitingSystem` mit `datenbank: HashMap<u32, Bewerber>` und `naechste_id: u32`."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `RecruitingSystem`. Implementiere `neu() -> Self` und `bewerbung_eintragen(&mut self, name: String, email: String) -> u32`. Implementiere `status_aendern(&mut self, id: u32, neuer_status: BewerbungsStatus) -> Result<(), String>`, die den Status ändert. Implementiere eine Validierungsregel: Ein Bewerber darf nur dann auf den Status `Eingestellt` gesetzt werden, wenn der vorherige Status `Interview` war, andernfalls wird ein `Err` zurückgegeben."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Trage die Bewerberin Clara ein, versuche sie direkt einzustellen (muss fehlschlagen), setze ihren Status dann auf Interview und stelle sie anschließend erfolgreich ein. Behandle alle Ausgaben strukturiert."

---

### Projekt 99: Smart-Grid-Stromzähler

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Enum `KundeKategorie` mit `Haushalt` und `Industrie`. Definiere das Struct `SmartZaehler` mit `kategorie: KundeKategorie` und `verbrauchsdaten: Vec<f64>` (Messwerte in kWh). Definiere das Struct `SmartGrid` mit `zaehler: HashMap<u32, SmartZaehler>` (Zählernummer zu SmartZaehler)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `SmartGrid`. Implementiere `neu() -> Self`, `zaehler_anmelden(&mut self, id: u32, kat: KundeKategorie)` und `messwert_senden(&mut self, id: u32, kwh: f64)`. Implementiere `durchschnitts_verbrauch(&self, id: u32) -> Result<f64, String>`, die den Durchschnittsverbrauch aller Messwerte für den Zähler berechnet oder ein `Err` zurückgibt, falls der Zähler nicht registriert ist oder keine Daten vorliegen."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Melde den Zähler 12345 (Haushalt) an, sende zwei Messwerte (1.2 und 2.5 kWh) und berechne den Durchschnittsverbrauch mit anschließender Ausgabe."

---

### Projekt 100: Krypto-Portfolio-Tracker

#### 🛠️ Modul 1: Basis-Datenstrukturen (Struct & Enum)
* **Dein Präzisions-Prompt:**
  > "Erstelle die grundlegenden Datenstrukturen. Definiere das Struct `KryptoAsset` mit `name: String`, `menge: f64` und `durchschnitts_kaufpreis: f64`. Definiere das Struct `Portfolio` mit `inhaber: String` und `assets: HashMap<String, KryptoAsset>` (Symbol zu Asset)."

#### 🛠️ Modul 2: Implementierung & Methoden
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code um einen `impl`-Block für `Portfolio`. Implementiere `neu(inhaber: String) -> Self`. Implementiere `kauf_buchen(&mut self, symbol: String, name: String, menge: f64, kaufpreis: f64)`, die den durchschnittlichen Kaufpreis gewichtet aktualisiert (nutze `entry` für neue Assets). Implementiere `verkauf_buchen(&mut self, symbol: &str, menge: f64, verkaufspreis: f64) -> Result<f64, String>`, die prüft ob genug Asset-Menge da ist, den Verkauf bucht und den realisierten Gewinn/Verlust zurückgibt."

#### 🛠️ Modul 3: Vollendung & Hauptprogramm (main)
* **Dein Präzisions-Prompt:**
  > "Erstelle die `main`-Funktion. Erzeuge das Portfolio für Thorsten. Buche Käufe von 0.5 BTC zu 30000.0 und 0.5 BTC zu 40000.0. Buche einen Verkauf von 0.4 BTC zu 38000.0, berechne den Gewinn und gib das Resultat auf Deutsch aus."
