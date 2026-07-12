# 📦 Module und Sichtbarkeit

Stell dir vor, du baust ein großes Haus. Am Anfang ist es nur ein einziger Raum, in dem alle Werkzeuge, Baumaterialien und Pläne auf dem Boden liegen. Solange das Haus klein ist, findest du alles schnell wieder. Doch je größer das Haus wird, desto chaotischer wird es. Irgendwann stolperst du über Zementsäcke und suchst stundenlang nach dem passenden Schraubendreher.

Um dieses Chaos zu verhindern, unterteilst du das Haus in verschiedene Räume: eine Küche für die Lebensmittel, eine Werkstatt für das Werkzeug und ein Schlafzimmer für die Privatsphäre. 

Genau das macht das **Modulsystem in Rust**. Es hilft dir, deinen Programmcode in logische Einheiten (Module) aufzuteilen, Ordnung zu halten und den Zugriff auf deine Daten und Funktionen sauber zu regeln.

---

## 🧠 Theorie

### 1. Was ist ein Modul in Rust?
Ein Modul (`module`) ist ein Container für Code. In einem Modul kannst du Funktionen, Structs, Enums, Konstanten und sogar andere Module zusammenfassen.

Es gibt zwei Möglichkeiten, Module in Rust zu definieren:
- **Inline-Module:** Das Modul wird direkt in einer Datei (z. B. `main.rs`) definiert.
- **Separate Dateien:** Das Modul wird in eine eigene Datei ausgelagert. Das ist der Standard für wachsende Projekte.

#### Inline-Module definieren
Um ein Modul direkt im Code zu deklarieren, nutzt du das Schlüsselwort `mod` gefolgt vom Modulnamen und geschweiften Klammern `{}`:

```rust
mod gartenschuppen {
    fn rasenmaeher_starten() {
        println!("Brumm brumm!");
    }
}
```

#### Separate Dateien (Der moderne Rust-Weg)
Wenn dein Projekt größer wird, möchtest du nicht Tausende Zeilen Code in einer einzigen `main.rs` haben. Du kannst Module in eigene Dateien auslagern.

1. **Deklaration:** In deiner Hauptdatei (`main.rs` oder `lib.rs`) sagst du Rust, dass ein Modul existiert:
   ```rust
   mod gartenschuppen; // Beachte das Semikolon!
   ```
2. **Die Datei erstellen:** Rust sucht nun automatisch im selben Ordner nach einer Datei namens `gartenschuppen.rs` (oder dem älteren Pfad `gartenschuppen/mod.rs`). Du erstellst also die Datei `src/gartenschuppen.rs` und schreibst deinen Code hinein:
   ```rust
   // Inhalt von src/gartenschuppen.rs
   fn rasenmaeher_starten() {
       println!("Brumm brumm!");
   }
   ```
   *Hinweis:* In der Datei `gartenschuppen.rs` schreibst du **nicht** noch einmal `mod gartenschuppen { ... }`. Die Datei selbst *ist* das Modul!

---

### 2. Das Prinzip der Kapselung: Standardmäßige Privatheit
In Rust gilt eine ganz fundamentale Sicherheitsregel: **Alles ist standardmäßig privat (private).**

Das bedeutet, dass Funktionen, Structs oder Module nur von Code aufgerufen werden können, der sich im **selben Modul** (oder in dessen Untermodulen) befindet. 

#### Warum ist Kapselung so wichtig?
Kapselung (Encapsulation) bedeutet, dass du die inneren Details deines Codes vor der Außenwelt verbirgst. Stell dir eine Mikrowelle vor: Sie hat Knöpfe zum Einstellen der Zeit (öffentliche Schnittstelle). Die Kabel, der Transformator und das Magnetron im Inneren sind jedoch gut verschlossen (private Details). Du musst nicht wissen, wie die Kabel verschaltet sind, um deine Suppe zu erwärmen. Schlimmer noch: Wenn jeder an den inneren Kabeln herumspielen könnte, würde die Mikrowelle schnell kaputtgehen.

In Rust schützt die standardmäßige Privatheit deinen Code davor, dass andere Programmteile versehentlich interne Details manipulieren oder sich von ihnen abhängig machen.

---

### 3. Sichtbarkeits-Modifier: Das Tor zur Welt öffnen
Damit andere Teile deines Programms auf deine Module, Funktionen und Structs zugreifen können, musst du sie explizit als öffentlich deklarieren. Dafür nutzt du Sichtbarkeits-Modifier.

#### Der Modifier `pub` (Public)
Mit dem Schlüsselwort `pub` machst du ein Element komplett öffentlich. Jedes andere Modul in deinem Projekt (und sogar externe Projekte, die deinen Code als Bibliothek nutzen) kann darauf zugreifen.

```rust
// In src/gartenschuppen.rs
pub fn rasenmaeher_starten() { // Jetzt öffentlich!
    println!("Brumm brumm!");
}
```

In der `main.rs` kannst du nun auf diese Funktion zugreifen:

```rust
// In src/main.rs
mod gartenschuppen;

fn main() {
    gartenschuppen::rasenmaeher_starten(); // Funktioniert!
}
```

> [!IMPORTANT]
> **Öffentliche Structs und ihre Felder**
> Wenn du ein Struct mit `pub struct` öffentlich machst, sind seine Felder trotzdem noch privat! Du musst jedes einzelne Feld, das von außen gelesen oder verändert werden soll, ebenfalls mit `pub` markieren:
> ```rust
> pub struct Gartengeraet {
>     pub name: String,   // Öffentlich
>     seriennummer: u32,  // Privat! Kann nur im selben Modul gelesen werden.
> }
> ```

#### Der Modifier `pub(crate)`
Manchmal möchtest du, dass bestimmte Funktionen oder Structs zwar von all deinen eigenen Modulen im gesamten Projekt (dem sogenannten "Crate") genutzt werden können, aber **nicht** für externe Benutzer sichtbar sind, die dein Projekt als Bibliothek einbinden.

Hierfür nutzt du `pub(crate)`:

```rust
pub(crate) fn interner_sicherheitscheck() {
    // Sichtbar im gesamten eigenen Projekt, aber unsichtbar für externe Nutzer.
}
```

---

### 4. Untermodule (Verschachtelung von Modulen)
Module können beliebig tief ineinander verschachtelt werden. Auch hier gilt die moderne Ordnerstruktur von Rust:

Stell dir vor, dein Modul `gartenschuppen` soll ein Untermodul namens `werkzeuge` besitzen.

1. **Deklaration im Eltern-Modul:** In `src/gartenschuppen.rs` deklarierst du das Untermodul:
   ```rust
   pub mod werkzeuge; // Untermodul deklarieren und öffentlich machen
   ```
2. **Die Datei im Unterordner anlegen:** Rust sucht nun nach einer Datei im Ordner des Eltern-Moduls. Du erstellst also einen Ordner `src/gartenschuppen/` und darin die Datei `werkzeuge.rs` (Pfad: `src/gartenschuppen/werkzeuge.rs`):
   ```rust
   // Inhalt von src/gartenschuppen/werkzeuge.rs
   pub fn hammer_holen() {
       println!("Hammer bereit!");
   }
   ```
3. **Aufruf in der `main.rs`:**
   ```rust
   fn main() {
       gartenschuppen::werkzeuge::hammer_holen();
   }
   ```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, diese Aufgaben selbstständig zu lösen, um dein Verständnis für Module und Sichtbarkeit zu festigen. Schreibe die Struktur auf und achte darauf, wo du `pub` benötigst!

### Aufgabe 1: Das modulare Smart-Home 🏠
Entwirf die Struktur für ein einfaches Smart-Home-System mit verschiedenen Modulen.
- **Struktur:**
  - Erstelle ein Hauptprogramm mit einer `main.rs`.
  - Deklariere ein Modul `beleuchtung` und ein Modul `sicherheit`.
  - Lagere beide Module in separate Dateien aus (`src/beleuchtung.rs` und `src/sicherheit.rs`).
- **Sichtbarkeiten:**
  - Im Modul `beleuchtung` soll es eine öffentliche Funktion zum Einschalten der Lampen geben.
  - Im Modul `sicherheit` soll es eine öffentliche Funktion zum Aktivieren der Alarmanlage geben sowie eine private Hilfsfunktion, die den PIN-Code überprüft.
  - Teste in der `main.rs`, ob du die Alarmanlage aktivieren kannst, und stelle sicher, dass du auf die PIN-Prüfung von außen nicht zugreifen kannst.

### Aufgabe 2: Die Autowerkstatt mit geheimem Inventar 🚗
Simuliere ein einfaches Werkstattsystem, bei dem bestimmte Daten geschützt bleiben müssen.
- **Struktur:**
  - Erstelle ein Modul `werkstatt` in einer eigenen Datei `src/werkstatt.rs`.
- **Datenkapselung:**
  - Definiere im Modul `werkstatt` ein öffentliches Struct `Auto`.
  - Das Auto soll ein öffentliches Feld `modell` (z. B. "Golf") und ein privates Feld `besitzer_name` (z. B. "Max") haben.
  - Biete eine öffentliche Methode an, mit der man das Auto instanziieren kann (Konstruktor), und eine öffentliche Methode, die das Auto repariert und eine Ausgabe erzeugt.
  - Versuche in der `main.rs`, direkt auf den `besitzer_name` zuzugreifen. Was sagt der Compiler? Wie kannst du das Problem lösen, ohne das Feld öffentlich zu machen (z. B. über eine Getter-Methode)?

### Aufgabe 3: Das Bibliotheks-Crate für eine Bank (pub(crate)) 🏦
Simuliere das Grundgerüst einer Bank-Software.
- **Struktur:**
  - Erstelle zwei Module: `konto` und `interne_pruefung`.
- **Sichtbarkeiten:**
  - Das Modul `konto` soll eine öffentliche Funktion zum Überweisen von Geld anbieten.
  - Das Modul `interne_pruefung` soll eine Funktion `risiko_check` besitzen. Diese Funktion soll für das gesamte Crate (also auch für das Modul `konto`) aufrufbar sein, damit vor einer Überweisung das Risiko geprüft werden kann.
  - Externe Benutzer der Bank-Bibliothek dürfen die Funktion `risiko_check` jedoch niemals direkt aufrufen können. Nutze hierfür den passenden Sichtbarkeits-Modifier!

---

## 🚀 50 Projekte

Hier sind 50 kleine Projektideen, bei denen du das Aufteilen von Code in Module und das Verbergen von Daten üben kannst:

### Alltag & Haushalt
1. **Rezept-Kiste:** Modul `rezepte` für Zutaten und Modul `kocher` für die Zubereitungsschritte.
2. **Kühlschrank-Inventar:** Modul `kuehlung` für Gemüse und Milchprodukte; verbirg das Haltbarkeitsdatum vor direkter Manipulation.
3. **Haushaltsbuch:** Modul `einnahmen` und Modul `ausgaben`; berechne das Budget über eine öffentliche Schnittstelle.
4. **Kaffeemaschine:** Modul `brueheinheit` (privat) und Modul `bedienfeld` (öffentlich).
5. **Garten-Bewässerung:** Modul `sensoren` misst Feuchtigkeit; Modul `ventile` steuert Wasserfluss crate-intern.
6. **Kleiderschrank-Organizer:** Modul `faecher` mit privaten Kapazitätsgrenzen für Hosen, T-Shirts und Socken.
7. **Einkaufszettel:** Modul `liste` verwaltet Einträge; Modul `export` formatiert die Ausgabe für den Drucker.
8. **Haustier-Fütterer:** Modul `futterautomat` mit privater Futtermenge und öffentlicher Zeitschaltuhr.
9. **Heizungssteuerung:** Modul `thermostat` regelt die Temperatur; die Kalibrierungswerte bleiben streng privat.
10. **Schlüsselbrett:** Modul `schluessel` verwaltet Berechtigungen für verschiedene Türen.

### Unterhaltung & Spiele
11. **Würfelspiel:** Modul `wuerfel` generiert Zufallszahlen; der Zufallsgenerator selbst bleibt privat.
12. **Text-Adventure:** Modul `karte` mit Räumen und Modul `spieler` mit Lebenspunkten.
13. **Kartenstapel:** Modul `stapel` mischt Karten; die genaue Reihenfolge der Karten im Stapel ist privat.
14. **Highscore-Tabelle:** Modul `liste` mit privaten Einträgen; Einträge können nur über eine Validierungs-Funktion hinzugefügt werden.
15. **Wort-Ratespiel (Galgenmännchen):** Modul `woerter` wählt das geheime Wort aus; das Wort ist für das Spielmodul unsichtbar.
16. **Münzautomat:** Modul `kasse` zählt Münzen; Modul `spiel` prüft, ob genug Guthaben vorhanden ist.
17. **Charakter-Editor:** Modul `attribute` verwaltet Stärke und Geschicklichkeit; Grenzwerte sind privat gekapselt.
18. **Schach-Spielfeld:** Modul `figuren` prüft Zugregeln; Modul `brett` zeichnet die aktuelle Position.
19. **Sound-Mixer:** Modul `effekte` wendet Filter an; Modul `lautstaerke` regelt Dezibel mit internen Limits.
20. **Quiz-Master:** Modul `fragen` lädt Fragen; die richtige Antwort ist privat, bis der Spieler tippt.

### Büro & Finanzen
21. **Stundenzettel:** Modul `zeiterfassung` bucht Stunden; die Überprüfung auf Feiertage geschieht intern.
22. **Rechnungs-Generator:** Modul `posten` sammelt Preise; Modul `steuer` berechnet die Mehrwertsteuer crate-intern.
23. **Kunden-Datenbank:** Modul `kunden` speichert sensible Daten privat; nur Name und ID sind öffentlich.
24. **Projekt-Planer:** Modul `aufgaben` verwaltet Deadlines; Überschneidungen werden privat geprüft.
25. **Aktien-Ticker:** Modul `datenquelle` holt Kurse; Modul `portfolio` berechnet Gewinne.
26. **Dokumenten-Archiv:** Modul `archiv` speichert Pfade; Modul `verschluesselung` sichert Dateien privat ab.
27. **Fahrtenbuch:** Modul `kilometer` addiert Strecken; die GPS-Rohdaten bleiben privat.
28. **Gehaltsabrechnung:** Modul `mitarbeiter` und Modul `steuern`; Berechnungsformeln sind `pub(crate)`.
29. **Notiz-Tresor:** Modul `tresor` verlangt eine PIN, bevor Notizen aus dem privaten Speicher gelesen werden dürfen.
30. **Terminkalender:** Modul `buchung` blockiert Termine; Kollisionsprüfung läuft komplett im Hintergrund.

### Wissenschaft & Mathematik
31. **Einheiten-Umrechner:** Modul `metrisch` und Modul `imperial` kommunizieren über eine gemeinsame Schnittstelle.
32. **Bruch-Rechner:** Modul `mathematik` kürzt Brüche automatisch im Hintergrund bei der Erstellung.
33. **Wetterstation:** Modul `barometer` und Modul `hygrometer` liefern Daten für das Hauptmodul `prognose`.
34. **Geometrie-Tool:** Modul `formen` berechnet Flächen; die mathematischen Pi-Konstanten sind privat.
35. **Statistik-Rechner:** Modul `analyse` berechnet Mittelwert und Median aus einem privaten Datenvektor.
36. **Periodensystem:** Modul `elemente` liefert Atomgewichte; die Detail-Elektronenkonfiguration bleibt gekapselt.
37. **Physik-Simulation:** Modul `gravitation` berechnet Anziehungskräfte zwischen Himmelskörpern.
38. **Matrix-Rechner:** Modul `algebra` führt Multiplikationen durch; Dimensionsprüfungen laufen privat ab.
39. **Zufalls-Generator:** Modul `algorithmus` erzeugt Pseudozufall; der Seed-Wert ist privat.
40. **Zeitzonen-Rechner:** Modul `weltzeit` berechnet Offsets zur UTC-Zeit.

### System & Werkzeuge
41. **Log-Schreiber (Logger):** Modul `schreiber` speichert Logs; Modul `formatierung` bereitet Texte intern vor.
42. **Konfigurations-Parser:** Modul `datei` liest INI-Dateien; Modul `parser` wandelt sie intern in Structs um.
43. **Datei-Backup:** Modul `quelle` scannt Ordner; Modul `ziel` kopiert geänderte Dateien.
44. **Netzwerk-Ping:** Modul `verbindung` prüft Latenz; Sockets werden privat verwaltet und geschlossen.
45. **Passwort-Manager:** Modul `tresor` verschlüsselt Passwörter; der Schlüssel verlässt niemals das Modul.
46. **Markdown-Parser:** Modul `lexer` zerlegt Text in Tokens; Modul `html` generiert die Ausgabe.
47. **Task-Runner:** Modul `warteschlange` reiht Aufgaben ein; die Ausführungsprioritäten sind privat.
48. **System-Info:** Modul `cpu` und Modul `ram` lesen Systemwerte; Rohdaten werden vor der Ausgabe bereinigt.
49. **Cache-Speicher:** Modul `speicher` hält Daten bereit; das automatische Löschen alter Einträge läuft privat ab.
50. **URL-Parser:** Modul `url` zerlegt Webadressen in Protokoll, Host und Pfad mit privater Validierung.

---

## 💡 Zusammenfassung

- **Module (`mod`)** strukturieren deinen Code in logische Einheiten und verhindern unübersichtliche Riesendateien.
- **Kapselung** ist in Rust standardmäßig aktiv: Jedes Element ist ohne Modifier privat und kann von außen nicht gesehen werden.
- Mit **`pub`** machst du Module, Funktionen oder Struct-Felder für jedermann öffentlich zugänglich.
- Mit **`pub(crate)`** machst du Elemente innerhalb deines eigenen Projekts (deines Crates) verfügbar, verbirgst sie aber vor externen Verwendern deiner Bibliothek.
- **Moderne Struktur:** Deklariere ein Modul mit `mod name;` und erstelle die dazugehörige Datei `name.rs`. Für Untermodule deklarierst du diese in `name.rs` und erstellst sie in `name/untermodul.rs`.

---

## 📚 Links

- [Das offizielle Rust-Buch: Managing Growing Projects with Packages, Crates, and Modules (Englisch)](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [Die deutsche Übersetzung des Rust-Buchs: Pakete, Crates und Module (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [Rust by Example: Modules (Englisch)](https://doc.rust-lang.org/rust-by-example/mod.html)
- [Rust by Example: Visibility (Englisch)](https://doc.rust-lang.org/rust-by-example/mod/visibility.html)
