# 📚 Crates und Cargo – Die Bausteine deines Rust-Projekts

Stell dir vor, du möchtest ein großes, stabiles Haus aus Lego bauen. Du könntest natürlich versuchen, jeden einzelnen Legostein selbst aus flüssigem Kunststoff zu gießen. Aber das wäre unglaublich mühsam, zeitaufwendig und wahrscheinlich würden die Steine am Ende nicht perfekt zusammenpassen. Stattdessen greifst du auf fertige, genormte Bausteine zurück, die perfekt ineinandergreifen, und konzentrierst dich ganz auf die Architektur deines Hauses.

In der Rust-Welt ist das genau so! Du musst das Rad (oder den Sortieralgorithmus, den Netzwerk-Client und den JSON-Parser) nicht jedes Mal neu erfinden. Rust bietet dir mit **Crates** (den Bausteinen) und **Cargo** (dem genialen Bauleiter und Paketmanager) ein mächtiges Ökosystem, mit dem du fertige Programmteile blitzschnell und sicher in dein Projekt integrieren kannst.

---

## 🧠 Theorie

### Was sind Crates?

Ein **Crate** (zu Deutsch: Kiste oder Transportkiste) ist die kleinste eigenständige Code-Einheit, die der Rust-Compiler verarbeiten kann. Wenn du ein Rust-Projekt baust, erstellst du immer mindestens ein Crate. 

Es gibt zwei grundlegend verschiedene Arten von Crates:

#### 1. Binary Crates (Ausführbare Programme)
*   **Was sie sind:** Ein Programm, das du direkt starten und ausführen kannst (z. B. ein Konsolenwerkzeug, ein Spiel oder ein Webserver).
*   **Erkennungsmerkmal:** Sie besitzen eine Funktion namens `fn main()`, die als Einstiegspunkt für das Programm dient. Die Standarddatei dafür ist die `src/main.rs`.
*   **Analogie:** Ein fertiges, fahrbereites Auto. Du kannst einsteigen und losfahren.

#### 2. Library Crates (Bibliotheken)
*   **Was sie sind:** Sammlungen von nützlichem Code (Funktionen, Structs, Enums), die von anderen Programmen wiederverwendet werden können. Sie können nicht direkt ausgeführt werden.
*   **Erkennungsmerkmal:** Sie haben keine `main()`, sondern stellen Funktionen für andere bereit. Die Standarddatei dafür ist die `src/lib.rs`.
*   **Analogie:** Ein fertiger Automotor oder eine Klimaanlage. Du kannst sie nicht direkt "fahren", aber du kannst sie in verschiedene Autos einbauen.

---

### Die Cargo.toml und Semantic Versioning

Wenn du Cargo-Projekte erstellst, findest du im Hauptverzeichnis deines Projekts immer eine Datei namens `Cargo.toml`. Sie wird im **TOML-Format** (*Tom's Obvious Minimal Language*) geschrieben und ist die Steuerzentrale und Packliste deines Projekts.

Eine typische `Cargo.toml` sieht so aus:

```toml
[package]
name = "mein_projekt"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.8.5"
```

*   `[package]`: Hier stehen Metadaten über dein eigenes Projekt wie Name, Version und die genutzte Rust-Edition.
*   `[dependencies]`: Das ist deine Einkaufsliste! Hier listest du alle externen Crates auf, die dein Projekt benötigt.

#### Semantic Versioning (SemVer)
Rust verwendet ein standardisiertes System zur Versionsverwaltung namens **Semantic Versioning**. Eine Versionsnummer besteht immer aus drei Zahlen, die durch Punkte getrennt sind: `MAJOR.MINOR.PATCH` (z. B. `1.4.2`).

*   **MAJOR (Hauptversion):** Wird erhöht, wenn es inkompatible API-Änderungen gibt. Code, der mit Version `1.x.y` lief, funktioniert mit `2.x.y` möglicherweise nicht mehr ohne Anpassungen.
*   **MINOR (Nebenversion):** Wird erhöht, wenn neue Funktionen hinzugefügt werden, die aber vollkommen abwärtskompatibel sind. Dein alter Code läuft weiterhin problemlos.
*   **PATCH (Fehlerbehebung):** Wird erhöht, wenn kleine Bugs korrigiert wurden. Keine neuen Features, keine Inkompatibilitäten.

In der `Cargo.toml` kannst du festlegen, wie flexibel Cargo bei Updates sein darf:
*   `rand = "0.8.5"` (oder `^0.8.5`): Cargo darf Sicherheitsupdates und kleinere Features installieren (alles ab `0.8.5` bis vor `0.9.0`). Das ist der Standard.
*   `rand = "~0.8.5"`: Cargo darf nur Patch-Updates installieren (alles von `0.8.5` bis vor `0.8.6`).
*   `rand = "=0.8.5"`: Cargo muss exakt diese Version verwenden.

---

### Moderne Cargo-Features

Wenn Projekte größer werden, bietet Cargo fortschrittliche Konzepte, um den Code übersichtlich und effizient zu halten.

#### Cargo Workspaces (Monorepos)
Stell dir vor, du entwickelst ein Onlinespiel. Du hast:
1. Den Spiel-Client (eine App für den Spieler)
2. Den Spiel-Server (für die Logik im Hintergrund)
3. Eine gemeinsame Bibliothek (die mathematische Berechnungen für beide enthält)

Anstatt drei völlig separate Projekte anzulegen, kannst du einen **Cargo Workspace** erstellen. Ein Workspace gruppiert mehrere Crates in einem einzigen Verzeichnis. 
*   Sie teilen sich einen gemeinsamen `target`-Ordner (das spart enorm viel Speicherplatz und beschleunigt das Kompilieren).
*   Sie teilen sich eine einzige `Cargo.lock`-Datei, was sicherstellt, dass alle Crates im Workspace exakt dieselben Versionen der externen Abhängigkeiten nutzen.

In der Haupt-`Cargo.toml` eines Workspaces definierst du einfach die Mitglieder:

```toml
[workspace]
members = [
    "spiel-client",
    "spiel-server",
    "gemeinsame-bibliothek",
]
```

#### Cargo Features (Optionale Abhängigkeiten)
Noterwerbbar ist nicht jeder, der eine Bibliothek nutzt, braucht auch all ihre Funktionen. Cargo bietet dafür ein modulares System namens **Features**. Damit kannst du Teile deines Codes optional machen.

Ein Entwickler einer großen Bildbearbeitungs-Bibliothek könnte zum Beispiel die Unterstützung für PNG-Bilder standardmäßig aktivieren, die Unterstützung für das veraltete BMP-Format aber als optionales Feature anbieten. 
Wer BMP nicht braucht, muss den Code dafür nicht mitkompilieren. Das hält das fertige Programm klein und spart Kompilierzeit!

In der `Cargo.toml` der Bibliothek sieht das so aus:

```toml
[features]
default = ["png"]
png = []
bmp = []
```

Ein Nutzer deiner Bibliothek kann dann in seiner eigenen `Cargo.toml` gezielt entscheiden:

```toml
[dependencies]
bild_bibliothek = { version = "1.0", default-features = false, features = ["bmp"] }
```

---

### Beliebte externe Crates einbinden

Das offizielle Repository für Rust-Crates ist [crates.io](https://crates.io). Hier findest du zehntausende Bibliotheken für jeden erdenklichen Zweck. Um ein Crate zu benutzen, fügst du es einfach deiner `Cargo.toml` hinzu (entweder manuell oder über den Terminal-Befehl `cargo add <crate_name>`).

Zwei der wichtigsten Crates in der Rust-Community sind:

#### 1. `rand` (Zufall)
Rust bringt von Haus aus keinen Zufallszahlengenerator in der Standardbibliothek mit. Das Crate `rand` füllt diese Lücke perfekt. Es liefert dir Funktionen, um Zufallszahlen zu generieren, Elemente aus Listen zufällig auszuwählen oder Würfelspiele zu programmieren.

#### 2. `serde` (Serialisierung & Deserialisierung)
Wenn du Daten speichern oder über das Netzwerk senden willst, musst du sie in ein Format wie JSON, XML oder YAML umwandeln (Serialisierung) und wieder zurück in Rust-Strukturen einlesen (Deserialisierung). `serde` (*Serializer/Deserializer*) ist das absolute Standard-Werkzeug dafür in Rust. Es arbeitet extrem schnell und sicher. 
Oft wird es zusammen mit dem Feature `derive` genutzt, damit Rust-Strukturen automatisch die Fähigkeit erhalten, sich selbst in JSON zu verwandeln.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu lösen, indem du die Konzepte skizzierst oder die passende Konfiguration planst.

### Aufgabe 1: Die perfekte Cargo.toml entwerfen
Du planst ein neues CLI-Werkzeug namens "DataWizard". Das Tool soll:
1. JSON-Dateien einlesen und verarbeiten.
2. Zufällige Passwörter generieren können.
3. Die externe Bibliothek `serde` (mit dem Feature `derive` zur automatischen Code-Generierung) nutzen.
4. Die Bibliothek `rand` in Version 0.8 oder höher verwenden, solange keine inkompatiblen Änderungen auftreten.

*Schreibe die vollständige `Cargo.toml`-Datei für dieses Projekt auf.*

### Aufgabe 2: Der SemVer-Detektiv
Ein Entwickler hat eine Bibliothek zur Berechnung von Steuern veröffentlicht (Version `1.4.2`). Überlege, welche Versionsnummer (nach Semantic Versioning) die nächste Veröffentlichung haben sollte, wenn:
1. Ein kleiner Rechenfehler in einer internen Funktion behoben wurde.
2. Eine völlig neue Funktion hinzugefügt wurde, mit der man auch ausländische Steuersätze berechnen kann. Die alte Berechnungsfunktion bleibt unverändert.
3. Die alte Berechnungsfunktion komplett entfernt wurde, da sie durch ein moderneres Konzept ersetzt wird. Wer die Bibliothek nutzt, muss seinen Code umschreiben.

### Aufgabe 3: Cargo Workspace Struktur planen
Du möchtest eine Web-Plattform für eine Schule bauen. Das System soll aus folgenden Teilen bestehen:
*   Einem Admin-Dashboard (Binary Crate `school-admin`)
*   Einer Schüler-App (Binary Crate `school-student`)
*   Einer Kern-Bibliothek für die Notenberechnung und Datenbankanbindung (Library Crate `school-core`)

1. *Skizziere die Ordnerstruktur deines Projekts.*
2. *Wie muss die Haupt-`Cargo.toml` aussehen, die diese Struktur als Workspace definiert?*

### Aufgabe 4: Optionale Features aktivieren
Du bindest eine hypothetische Bibliothek namens `cryptography` in dein Projekt ein. Diese Bibliothek bietet standardmäßig sehr viele Algorithmen an. Da du auf einem kleinen Mikrocontroller programmierst, möchtest du:
1. Alle Standard-Features der Bibliothek deaktivieren.
2. Ausschließlich das optionale Feature `"sha256"` aktivieren.

*Wie müsste der Eintrag unter `[dependencies]` in deiner `Cargo.toml` aussehen?*

---

## 🚀 50 Projekte

Hier sind 50 kleine Projektideen und Übungsszenarien, mit denen du den Umgang mit Cargo und verschiedenen externen Crates praktisch erproben kannst:

1.  **Zufalls-Passwort-Generator:** Generiere sichere Passwörter mit anpassbaren Kriterien (`rand`).
2.  **JSON-Konfigurations-Parser:** Lies Einstellungen für ein Programm aus einer JSON-Datei ein (`serde`, `serde_json`).
3.  **Konsolen-Fortschrittsbalken:** Zeige beim Kopieren oder Berechnen einen animierten Ladebalken an (`indicatif`).
4.  **CSV-Statistik-Rechner:** Lies eine Tabelle mit Verkaufszahlen ein und berechne Durchschnitt und Summen (`csv`).
5.  **Wort-Zähler (CLI):** Analysiere Textdateien und gib die häufigsten Wörter grafisch in der Konsole aus.
6.  **Einfacher HTTP-Client:** Lade den HTML-Quelltext einer Website herunter (`reqwest`).
7.  **Wetter-Abfrage-Tool:** Frage das aktuelle Wetter einer Stadt über eine öffentliche API ab (`reqwest`, `serde`).
8.  **Terminal-Todo-Liste mit JSON-Speicher:** Speichere und lade Aufgaben dauerhaft auf der Festplatte (`serde`).
9.  **Zufallszahlen-Ratespiel:** Das klassische "Errate die Zahl" mit einstellbarem Schwierigkeitsgrad (`rand`).
10. **ASCII-Art-Generator:** Verwandle ein eingegebenes Wort in große ASCII-Banner (`figlet` oder ähnliche Crates).
11. **UUID-Erzeuger:** Generiere eindeutige Identifikationsnummern für Datenbankeinträge (`uuid`).
12. **Markdown-zu-HTML-Konverter:** Lies eine Markdown-Datei ein und erstelle eine formatierte Webseite (`pulldown-cmark`).
13. **SHA-256-Hasher:** Berechne den digitalen Fingerabdruck einer eingegebenen Textnachricht (`sha2`).
14. **Konsolen-Taschenrechner mit Verlauf:** Speichere die letzten Rechnungen in einer Textdatei ab.
15. **Regex-Textprüfer:** Überprüfe, ob eine E-Mail-Adresse oder Telefonnummer dem richtigen Format entspricht (`regex`).
16. **Farbiger Konsolen-Logger:** Erstelle ein Log-System, das Info-, Warnungs- und Fehlermeldungen farblich trennt (`colored`).
17. **ZIP-Archivierer:** Komprimiere mehrere Dateien in einen ZIP-Ordner (`zip`).
18. **Verlaufsgrafik im Terminal:** Zeichne eine kleine Fieberkurve oder ein Balkendiagramm direkt in die Konsole (`textplots`).
19. **Bild-Format-Konverter:** Konvertiere Bilder von PNG in JPEG (`image`).
20. **Mini-Datenbank mit SQLite:** Speichere Kontaktdaten in einer lokalen SQL-Datenbankdatei (`rusqlite`).
21. **Automatischer E-Mail-Sender:** Verschicke eine E-Mail direkt aus deinem Rust-Programm heraus (`lettre`).
22. **System-Info-Monitor:** Lies die aktuelle CPU-Auslastung und den freien RAM deines PCs aus (`sysinfo`).
23. **QR-Code-Generator:** Erzeuge aus einem Text-Link ein QR-Code-Bild (`qrcode`).
24. **Stoppuhr mit Rundenzeiten:** Eine präzise Terminal-Uhr für sportliche Aktivitäten.
25. **Zufälliger Namensgenerator:** Erzeuge Fantasy-Namen durch das zufällige Kombinieren von Silben (`rand`).
26. **Base64-Kodierer/Dekodierer:** Verschlüssele Texte in das Base64-Format und stelle sie wieder her.
27. **URL-Parser:** Zerlege eine komplexe Webadresse in protokol, Domain, Pfad und Parameter (`url`).
28. **XML-Konfigurations-Lader:** Verarbeite Konfigurationen im XML-Format (`quick-xml`).
29. **Verzeichnisschutz-Prüfer:** Berechne Prüfsummen für alle Dateien in einem Ordner, um Änderungen zu bemerken.
30. **Argument-Parser für CLI:** Erstelle ein Tool, das komplexe Startparameter sauber auswertet (`clap`).
31. **Zufälliges Zitat des Tages:** Zeige beim Starten des Terminals ein zufälliges Zitat aus einer Liste an (`rand`).
32. **Web-Scraper:** Suche auf einer Nachrichtenseite nach allen Überschriften und speichere sie (`scraper`).
33. **TOML-Konfigurations-Writer:** Erstelle und bearbeite TOML-Dateien dynamisch aus deinem Programm heraus.
34. **Konsolen-Uhr mit Zeitzonen:** Zeige die aktuelle Uhrzeit in New York, Tokio und Berlin an (`chrono`).
35. **DNS-Resolver:** Finde die IP-Adresse zu einer eingegebenen Domain heraus (`trust-dns-resolver`).
36. **IP-Adressen-Prüfer:** Finde heraus, ob eine IP-Adresse IPv4 oder IPv6 ist und ob sie privat oder öffentlich ist.
37. **Labyrinth-Generator:** Erzeuge ein zufälliges Labyrinth im Terminal (`rand`).
38. **Befehls-Alias-Manager:** Verwalte Abkürzungen für lange Terminal-Befehle in einer Konfigurationsdatei.
39. **RSS-Feed-Reader:** Abonniere den Newsfeed deines Lieblingsblogs und zeige neue Beiträge an (`rss`).
40. **Zufalls-Farbpaletten-Generator:** Erzeuge harmonische RGB-Farbwerte für Webdesigner (`rand`).
41. **Dateigrößen-Formatierer:** Wandle Byte-Angaben in lesbare Formate wie KB, MB oder GB um.
42. **Passwort-Hasher für Logins:** Sichere Passwörter mit modernen kryptografischen Verfahren ab (`bcrypt`).
43. **Feiertags-Kalender:** Berechne, ob ein bestimmtes Datum ein gesetzlicher Feiertag ist (`chrono`).
44. **Konsolen-Würfelbecher:** Simuliere das Werfen mehrerer Spielwürfel mit detaillierter Statistik.
45. **Text-Verschlüsselungs-Tool:** Verschlüssele Nachrichten mit einem geheimen Passwort (`aes-gcm`).
46. **Markdown-Link-Checker:** Durchsuche eine Markdown-Datei nach Web-Links und prüfe, ob diese noch erreichbar sind.
47. **Tagebuch-Manager mit Verschlüsselung:** Schreibe tägliche Einträge, die geschützt auf der Festplatte liegen.
48. **Port-Scanner:** Überprüfe, welche Netzwerk-Ports auf einem Server geöffnet sind.
49. **Währungsrechner mit Live-Kursen:** Lade aktuelle Wechselkurse herunter und rechne Beträge um.
50. **Terminal-Musik-Player:** Spiele einfache Soundeffekte oder MP3-Dateien über die Konsole ab (`rodio`).

---

## 💡 Zusammenfassung

*   **Crates** sind die Bausteine in Rust. **Binary Crates** sind ausführbare Programme mit einer `main()`-Funktion; **Library Crates** sind wiederverwendbare Bibliotheken.
*   Die **`Cargo.toml`** ist die Konfigurationsdatei deines Projekts. Hier definierst du Projektdaten und deine Abhängigkeiten.
*   Rust nutzt **Semantic Versioning (SemVer)** (`MAJOR.MINOR.PATCH`), um Updates sicher und berechenbar zu machen.
*   **Cargo Workspaces** helfen dir, große Projekte mit mehreren Crates in einem einzigen Ordner (Monorepos) zu verwalten.
*   **Cargo Features** erlauben es, optionale Funktionalitäten in Bibliotheken anzubieten, um Kompilierzeit und Dateigröße zu sparen.
*   Externe Crates von [crates.io](https://crates.io) wie `rand` und `serde` lassen sich spielend leicht integrieren und erweitern die Standardbibliothek um mächtige Werkzeuge.

---

## 📚 Links

*   [Das offizielle Rust-Buch: Cargo und Crates.io](https://doc.rust-lang.org/book/ch14-00-more-about-cargo.html)
*   [Die offizielle Cargo-Dokumentation (englisch)](https://doc.rust-lang.org/cargo/)
*   [crates.io – Das zentrale Rust-Crate-Verzeichnis](https://crates.io)
*   [Konzept: Structs (für die Datenstrukturen in Serde)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-structs.md)
