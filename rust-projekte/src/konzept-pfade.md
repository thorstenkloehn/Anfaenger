# 🔗 Pfade und Importe

Stell dir vor, du ziehst in eine neue, riesige Wohnung mit vielen Zimmern. Am Anfang hast du nur ein paar Kartons, die alle im Wohnzimmer stehen. Aber je länger du dort wohnst, desto mehr Sachen sammeln sich an. Irgendwann beschließt du, Ordnung zu schaffen: Kleidung kommt ins Schlafzimmer, Geschirr in die Küche und Werkzeug in den Keller. 

In deinen bisherigen Rust-Programmen hast du vielleicht fast alles in eine einzige Datei (`main.rs`) geschrieben. Wenn dein Programm wächst, wird das jedoch unübersichtlich. Um Ordnung zu halten, unterteilst du deinen Code in **Module** (Zimmer) und **Dateien** (Schränke). 

Damit die verschiedenen Teile deines Codes miteinander sprechen können, müssen sie wissen, wie sie sich gegenseitig finden. Genau hier kommen **Pfade** und **Importe** ins Spiel. Sie sind die Adressen und Wegweiser in deinem Rust-Projekt.

---

## 🧠 Theorie

### 1. Module und die Struktur deines Projekts
Bevor wir uns Pfade ansehen, halten wir kurz fest, worauf sie verweisen: auf **Module** (deklariert mit dem Schlüsselwort `mod`). Module strukturieren deinen Code hierarchisch wie Ordner auf deiner Festplatte. Ein Modul kann Funktionen, Structs, Enums und sogar andere Module enthalten.

### 2. Absolute vs. relative Pfade
Wenn du in Rust auf ein Element (z. B. eine Funktion oder ein Struct) zugreifen willst, musst du Rust sagen, wo dieses liegt. Dafür gibt es zwei Möglichkeiten:

#### Absolute Pfade (`crate::`)
Ein absoluter Pfad beginnt immer an der Wurzel (Root) deines Projekts. In Rust ist diese Wurzel die aktuelle Crate. Das Schlüsselwort dafür heißt `crate::`. Es ist vergleichbar mit einer vollständigen Postadresse inklusive Land und Postleitzahl oder einem absoluten Dateipfad ab `/` unter Linux.

Egal aus welchem Modul heraus du ein Element aufrufst: Wenn der Pfad mit `crate::` beginnt, sucht Rust immer ganz oben in der Projektwurzel.

```rust
mod garten {
    pub mod gemuese {
        pub fn karotte_ernten() {
            // ...
        }
    }
}

fn main() {
    // Absoluter Pfad ab der Projektwurzel
    crate::garten::gemuese::karotte_ernten();
}
```

*Hinweis:* Damit du von außen (z. B. aus `main()`) auf Module oder Funktionen zugreifen kannst, müssen diese mit dem Schlüsselwort `pub` als öffentlich markiert sein.

#### Relative Pfade (`self::` und `super::`)
Ein relativer Pfad beginnt im aktuellen Modul. Das ist so, als würdest du im selben Zimmer sagen: „Gib mir mal das Buch auf dem Tisch“, statt die komplette Adresse des Hauses aufzusagen.

Rust bietet hierfür zwei wichtige Wegweiser:

*   **`self::` (Dieses Modul):** Verweist auf das aktuelle Modul. Meistens kannst du `self::` weglassen, da Rust standardmäßig im aktuellen Modul sucht. Es ist jedoch nützlich, um explizit zu machen, dass ein Element im selben Modul liegt, oder um Namenskonflikte aufzulösen.
*   **`super::` (Das übergeordnete Modul):** Verweist auf das Eltern-Modul – also genau eine Ebene nach oben in der Modul-Hierarchie. Das ist das Äquivalent zu `..` in Terminal-Dateipfaden. Du nutzt es oft, wenn ein inneres Modul auf Funktionen zugreifen möchte, die direkt eine Ebene darüber definiert sind.

```rust
mod kueche {
    pub fn herd_anschalten() {}

    pub mod backofen {
        pub fn pizza_backen() {
            // Wir gehen eine Ebene hoch (kueche) und schalten den Herd an
            super::herd_anschalten();
            
            // Alternativ können wir uns explizit auf uns selbst beziehen:
            self::temperatur_pruefen();
        }

        fn temperatur_pruefen() {}
    }
}
```

---

### 3. Einbinden mit `use`
Wenn du eine Funktion oder ein Struct oft benutzt, wird es schnell lästig, jedes Mal den kompletten Pfad (wie `crate::garten::gemuese::karotte_ernten()`) auszuschreiben. 

Mit dem Schlüsselwort `use` erstellst du eine Abkürzung (einen Import). Das ist wie ein Schnellzugriff-Icon auf deinem Desktop:

```rust
mod garten {
    pub mod gemuese {
        pub struct Tomate;
    }
}

// Wir erstellen eine Abkürzung für das Struct Tomate
use crate::garten::gemuese::Tomate;

fn main() {
    // Jetzt können wir Tomate direkt verwenden!
    let lieblings_gemuese = Tomate;
}
```

#### Verschachtelte Importe (Nested Paths)
Wenn du mehrere Dinge aus demselben Modul importieren möchtest, musst du nicht für jedes Element eine eigene `use`-Zeile schreiben. Du kannst sie in geschweiften Klammern `{}` zusammenfassen:

```rust
// Unhandlich:
// use std::collections::HashMap;
// use std::collections::HashSet;

// Elegant und kompakt:
use std::collections::{HashMap, HashSet};
```

Wenn du sowohl ein Modul selbst als auch Elemente *in* diesem Modul importieren willst, kannst du das magische Wort `self` in den Klammern nutzen:

```rust
// Importiert das Modul `io` und gleichzeitig das Trait `Write` aus `io`
use std::io::{self, Write};
```

#### Umbenennung mit `as`
Manchmal importierst du zwei verschiedene Dinge, die genau denselben Namen haben. Wenn du beispielsweise ein `Result` aus der Standardbibliothek für Ein-/Ausgabe (`std::io::Result`) und eines für Formatierung (`std::fmt::Result`) brauchst, würde Rust meckern, weil der Name doppelt belegt ist.

Mit dem Schlüsselwort `as` kannst du einen Import für deine Datei umbenennen:

```rust
use std::fmt::Result as FmtResult;
use std::io::Result as IoResult;

fn main() {
    // Kein Namenskonflikt mehr!
}
```

#### Die Wildcard `*` (Glob-Operator)
Mit dem Sternchen `*` kannst du *alle* öffentlichen Elemente eines Moduls auf einmal in den aktuellen Gültigkeitsbereich importieren:

```rust
use std::collections::*; // Importiert HashMap, HashSet, BTreeMap und alles andere
```

**Achtung:** Verwende die Wildcard sparsam! Sie macht deinen Code schwerer lesbar, weil man nicht mehr sieht, woher ein bestimmter Typ kommt. Außerdem kann es leicht zu Namenskonflikten führen, wenn die Standardbibliothek oder ein Paket neue Funktionen hinzufügt. 
*Typische Ausnahme:* In Test-Modulen schreibt man fast immer `use super::*;`, um alle Funktionen des zu testenden Moduls direkt parat zu haben.

---

### 4. Re-Exporting mit `pub use`
Wenn du eine Bibliothek (ein Library-Crate) schreibst, möchtest du deinen Code intern sauber strukturieren. Vielleicht hast du einen Ordner für Netzwerk-Code, einen für Verschlüsselung und einen für Datenstrukturen. 

Für den Programmierer, der deine Bibliothek später benutzt, ist diese interne Struktur aber oft viel zu kompliziert. Er möchte nicht wissen müssen, in welchem Unter-Unter-Modul dein wichtigstes Struct vergraben ist.

Mit **`pub use`** nimmst du ein Element aus einem inneren Modul und exportierst es erneut so, dass es von außen über einen viel einfacheren Pfad erreichbar ist. Man nennt das auch das Designen einer sauberen **öffentlichen API** (Schnittstelle).

```rust
// Interne Struktur
mod intern {
    pub mod geheim {
        pub struct WichtigerTyp;
    }
}

// Re-Export: Wir machen den Typen direkt auf der Hauptebene verfügbar!
pub use crate::intern::geheim::WichtigerTyp;
```

Jemand, der deine Bibliothek nun als Abhängigkeit einbindet, kann einfach schreiben:
`use dein_paket::WichtigerTyp;` statt `use dein_paket::intern::geheim::WichtigerTyp;`. Die interne Komplexität bleibt versteckt!

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, diese Aufgaben ohne fertige Codelösungen zu lösen. Konzentriere dich auf die Strukturierung der Module und Pfade!

### Aufgabe 1: Die Modul-Küche 🍳
Entwirf ein Modulsystem für eine Restaurant-Küche.
*   Erstelle ein Modul namens `kueche`.
*   Erstelle darin ein Untermodul `herd`.
*   Im Modul `herd` soll eine Funktion `suppe_kochen` liegen.
*   Das Modul `kueche` soll außerdem ein Untermodul `vorratskammer` enthalten, in dem eine Funktion `zutaten_holen` definiert ist.
*   **Die Herausforderung:** Rufe in der Funktion `suppe_kochen` die Funktion `zutaten_holen` auf. Verwende dafür einen *relativen* Pfad mit `super::`.
*   Schreibe eine `main`-Funktion außerhalb der Module und rufe `suppe_kochen` mit einem *absoluten* Pfad auf.

### Aufgabe 2: Der Bibliotheks-Katalog und der Namenskonflikt 📚
Simuliere ein System zur Buchverwaltung.
*   Erstelle zwei unterschiedliche Module: `analog` (für gedruckte Bücher) und `digital` (für E-Books).
*   In beiden Modulen soll jeweils ein Struct namens `Buch` existieren (gedruckte Bücher haben eine Seitenzahl, E-Books eine Dateigröße in KB).
*   Erstelle ein drittes Modul `anzeige`.
*   **Die Herausforderung:** Importiere in das Modul `anzeige` beide `Buch`-Structs mithilfe von `use` und löse den Namenskonflikt auf, indem du sie mit `as` in `GedrucktesBuch` und `EBook` umbenennst.
*   Schreibe eine Funktion im `anzeige`-Modul, die beide Buchtypen als Parameter entgegennehmen kann (als Platzhalter kannst du einfache Ausgaben nutzen).

### Aufgabe 3: Das ordentliche API-Paket 📦
Entwirf eine Struktur für eine mathematische Bibliothek, die ihren Nutzern das Leben leicht macht.
*   Erstelle ein Modul `arithmetik`. Darin befinden sich Untermodule `addition` und `subtraktion`.
*   In `addition` gibt es eine Funktion `addieren(a: i32, b: i32) -> i32`.
*   In `subtraktion` gibt es eine Funktion `subtrahieren(a: i32, b: i32) -> i32`.
*   **Die Herausforderung:** Die Module `addition` und `subtraktion` sollen von außen privat und unzugänglich sein (also kein `pub mod`). Die mathematischen Funktionen darin müssen jedoch nutzbar sein.
*   Verwende `pub use`, um die Funktionen `addieren` und `subtrahieren` direkt auf der Hauptebene deiner Crate verfügbar zu machen, sodass ein Nutzer sie ohne Pfad-Verschachtelung aufrufen kann.

---

## 🚀 50 Projekte

Hier sind 50 kleine Projektideen, die du umsetzen kannst, um den Umgang mit Modulen, Pfaden, Importen und Re-Exports in Rust zu üben:

### Spiele & Welten
1.  **Dungeon-Generator:** Module für `karten_erstellung`, `monster_platzierung` und `schatz_verteilung`.
2.  **RPG-Kampfsystem:** Module für `helden`, `gegner` und `berechnung` (Nutze `super::` für Schadensberechnung).
3.  **Kartenspiel-Engine:** Module für `deck`, `spieler` und `regeln`. Re-exportiere die Haupt-Spielfigur.
4.  **Weltraum-Simulation:** Untermodule für `planeten`, `monde` und `asteroiden` im Hauptmodul `himmelskoerper`.
5.  **Text-Adventure:** Module für die Himmelsrichtungen (`norden`, `sueden`, ...) mit relativen Pfaden zur Bewegung.
6.  **Schach-Validierer:** Module für jede Spielfigur (`turm`, `bauer`, ...) mit gemeinsamen Hilfsfunktionen im Elternmodul.
7.  **Würfelspiel-Simulator:** `becher`- und `statistik`-Modul. Nutze `as` für umbenannte Zufallsgeneratoren.
8.  **Inventar-Manager:** Module für `ausruestung` und `verbrauchsgut`.
9.  **Wetter-Simulator für Spiele:** Module für `regen`, `schnee` und `sonne`.
10. **KI-Gegner-Verhalten:** Module für `patrouille`, `angriff` und `flucht`.

### Werkzeuge & CLI
11. **Todo-Listen-CLI:** Module für `speicher`, `anzeige` und `eingabe`.
12. **Passwort-Generator:** Module für `entropie`, `zeichensaetze` und `hasher`.
13. **Dateimanager:** Module für `lesen`, `schreiben` und `loeschen`.
14. **Markdown-Parser:** Module für `ueberschriften`, `listen` und `fettgedruckt`.
15. **System-Info-Tool:** Module für `cpu`, `ram` and `festplatte`.
16. **Währungsrechner:** Module für `wechselkurse`, `api` und `formatierung`.
17. **Einheiten-Konverter:** Module für `gewicht`, `laenge` und `temperatur`.
18. **Log-Schreiber:** Module für `datei_schreiben`, `konsole_schreiben` und `formatierer`.
19. **Netzwerk-Ping-Tool:** Module für `verbindung`, `paket_bau` und `antwort_analyse`.
20. **CSV-Verarbeiter:** Module für `zeilen_leser`, `spalten_filter` und `ausgabe`.

### Bibliotheken & APIs (Fokus auf `pub use`)
21. **Kryptographie-Hilfsbibliothek:** Interne Module für AES und RSA, re-exportiert als flaches API.
22. **Datenbank-Treiber-Mock:** Module für `verbindung`, `abfrage` und `transaktion`.
23. **Geometrie-Bibliothek:** Module für `kreis`, `rechteck`, `dreieck`. Re-exportiere alle Flächenberechnungen.
24. **Farb-Misch-Bibliothek:** Module für `rgb`, `hsl`, `cmyk`. Re-exportiere Konverter-Funktionen.
25. **HTTP-Client-Mock:** Module für `request`, `response` und `headers`.
26. **JSON-Serializer-Mock:** Module für `tokeniser`, `parser` und `writer`.
27. **Bildbearbeitungs-Bibliothek:** Module für `filter`, `skalierung` und `drehung`.
28. **Validierungs-Bibliothek:** Module für `email`, `telefonnummer` und `postleitzahl`.
29. **Finanzmathematik-Bibliothek:** Module für `zinseszins`, `rendite` und `kredit`.
30. **String-Manipulations-Bibliothek:** Module für `umdrehen`, `kuerzen`, `ersetzen`.

### Simulationen & Berechnungen
31. **Verkehrsfluss-Simulation:** Module für `autos`, `ampeln` und `strassen`.
32. **Physik-Engine:** Module für `schwerkraft`, `kollision` und `reibung`.
33. **Ökosystem-Simulation:** Module für `tiere`, `pflanzen` und `ressourcen`.
34. **Chemisches Periodensystem:** Module für `metalle`, `nichtmetalle`, `edelgase`.
35. **Flugbahn-Berechnung:** Module für `abwurf`, `windwiderstand` und `landung`.
36. **Wetterstation:** Module für `temperatur_sensor`, `feuchtigkeits_sensor` und `daten_logger`.
37. **Solaranlage-Rechner:** Module für `ausrichtung`, `sonnenstunden` und `stromerzeugung`.
38. **Aufzug-Simulation:** Module für `kabine`, `tueren` und `steuerung`.
39. **Epidemie-Simulation:** Module für `gesunde`, `infizierte` und `genesene`.
40. **Bibliotheks-Verwaltung:** Module für `katalog`, `ausleihe` und `mitglieder`.

### Datenverarbeitung & Organisation
41. **Rezept-Manager:** Module für `zutaten`, `anleitung` und `portionierung`.
42. **Haushaltsbuch:** Module für `einnahmen`, `ausgaben` und `kategorien`.
43. **Fitness-Tracker:** Module für `laufen`, `schwimmen`, `kraftsport`.
44. **Musik-Playlisten-Manager:** Module für `song`, `album` und `playlist`.
45. **Stundenplaner:** Module für `faecher`, `lehrer` und `raeume`.
46. **Kontaktbuch:** Module für `adresse`, `telefon` und `notiz`.
47. **Flugbuchungs-System:** Module für `passagier`, `flug` und `ticket`.
48. **Online-Shop-Warenkorb:** Module für `artikel`, `rabatt` und `kasse`.
49. **Kinosaal-Reservierung:** Module für `saal`, `film` und `ticket_kauf`.
50. **Smart-Home-Steuerung:** Module für `licht`, `heizung` und `sicherheit`.

---

## 💡 Zusammenfassung

*   **Module (`mod`)** strukturieren deinen Code hierarchisch.
*   **Absolute Pfade** beginnen immer an der Crate-Wurzel mit **`crate::`**.
*   **Relative Pfade** starten im aktuellen Modul. Sie verwenden **`self::`** für das eigene Modul und **`super::`**, um eine Ebene nach oben zu springen.
*   Das Schlüsselwort **`use`** erstellt eine Abkürzung für einen Pfad, damit du ihn nicht ständig ausschreiben musst.
*   Mit **`as`** kannst du Importe umbenennen, um Namenskonflikte zu lösen.
*   Die Wildcard **`*`** importiert alle öffentlichen Elemente eines Moduls auf einmal. Sie sollte vorsichtig eingesetzt werden (außer in Tests).
*   Mit **`pub use` (Re-Exporting)** veredelst du deine Modulstruktur. Du verbirgst interne Komplexität und baust eine flache, leicht verständliche Schnittstelle (API) für andere.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Managing Growing Projects with Packages, Crates, and Modules (Englisch)](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
*   [Die deutsche Übersetzung des Rust-Buchs: Organisation von Code (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
*   [Rust by Example: Modules (Englisch)](https://doc.rust-lang.org/rust-by-example/mod.html)
*   [Rust by Example: use declaration (Englisch)](https://doc.rust-lang.org/rust-by-example/mod/use.html)
