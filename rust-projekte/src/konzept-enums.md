# 🔠 Konzept: Enums – Klare Zustände und Optionen

Stell dir vor, du stehst in einem Aufzug. Auf dem Bedienfeld siehst du verschiedene Knöpfe: Erdgeschoss, 1. Stock, 2. Stock und Keller. Der Aufzug kann sich immer nur auf einem einzigen dieser Stockwerke befinden. Er kann unmöglich gleichzeitig im Keller sein und im 2. Stock stehen. Oder stell dir eine Ampel vor: Sie zeigt entweder Rot, Gelb oder Grün – aber niemals alle drei gleichzeitig (zumindest nicht im Normalbetrieb!).

In der echten Welt begegnen uns solche festen Auswahlen ständig. Und genau für diese Situationen gibt es in Rust ein extrem mächtiges Werkzeug namens **Enums** (kurz für *Enumerations*, zu Deutsch: Aufzählungen).

Ein Enum erlaubt es dir, einen eigenen Datentyp zu erschaffen, der aus einer festen Liste von vordefinierten, sich gegenseitig ausschließenden Auswahlmöglichkeiten besteht.

---

## 🧠 Theorie

### Was sind Enums und wozu braucht man sie?

Wenn du programmierst, möchtest du oft Zustände oder Kategorien darstellen. Ohne Enums müsste man sich mit Behelfslösungen herumschlagen. Du könntest zum Beispiel Zahlen verwenden:
- `0` steht für "Aus"
- `1` steht für "An"
- `2` steht für "Standby"

Das Problem dabei? Du musst dir ständig merken, was die Zahlen bedeuten. Und was passiert, wenn jemand versehentlich eine `3` einträgt? Dein Programm weiß dann nicht, was es tun soll, und stürzt im schlimmsten Fall ab.

Ein Enum löst dieses Problem elegant. Du definierst damit genau, welche Zustände erlaubt sind. Der Compiler (unser strenger Bibliothekar) passt dann penibel darauf auf, dass niemand einen ungültigen Zustand einschmuggelt.

### Wie sieht die Struktur in Rust aus?

Um ein Enum zu definieren, nutzt du das Schlüsselwort `enum`, gefolgt von einem Namen und den möglichen Optionen (den sogenannten Varianten) in geschweiften Klammern:

```rust
enum GeraeteZustand {
    Aus,
    An,
    Standby,
}
```

Wenn du dieses Enum in deinem Programm benutzen möchtest, greifst du über den Namen des Enums und zwei Doppelpunkte (`::`) auf die einzelnen Varianten zu:

```rust
let mein_geraet = GeraeteZustand::Standby;
```

### Der wahre Superheld: Enums mit eigenen Daten

In vielen anderen Programmiersprachen sind Enums nur einfache Listen von Wörtern. In Rust hingegen sind sie echte Allrounder! Jede Option in einem Enum kann nämlich **eigene Daten mit sich herumtragen**.

Stell dir das wie verschiedene Briefumschläge vor:
- Der Umschlag `StandardBrief` ist ganz flach und enthält keine zusätzlichen Objekte.
- Der Umschlag `Paket` ist dick und enthält ein Gewicht (eine Zahl) und eine Adresse (einen Text).
- Der Umschlag `Einschreiben` enthält einen Empfänger-Namen und eine Tracking-Nummer.

In Rust-Syntax sieht das konzeptionell so aus:

```rust
enum PostSendung {
    StandardBrief,                            // Keine Zusatzdaten
    Paket(u32, String),                       // Trägt ein Gewicht (Zahl) und eine Adresse (Text)
    Einschreiben(String, u64),                // Trägt einen Empfänger (Text) und eine Sendungsnummer
}
```

Das macht Enums unglaublich flexibel, da du unterschiedliche Datenstrukturen unter einem einzigen gemeinsamen Namen zusammenfassen kannst!

### Wie werten wir Enums aus? Der Weichensteller `match`

Ein Enum zu haben ist toll, aber wir müssen auch darauf reagieren können. Das perfekte Werkzeug dafür ist `match`. 

Stell dir `match` wie einen großen Bahnhof mit verschiedenen Gleisen vor. Je nachdem, welche Option dein Enum hat, wird der Zug auf ein anderes Gleis geleitet:

```rust
match meine_sendung {
    PostSendung::StandardBrief => {
        // Gleis 1: Aktion für einen normalen Brief
    }
    PostSendung::Paket(gewicht, adresse) => {
        // Gleis 2: Aktion für ein Paket. 
        // Hier hast du sofort Zugriff auf das Gewicht und die Adresse!
    }
    PostSendung::Einschreiben(empfaenger, nummer) => {
        // Gleis 3: Aktion für ein Einschreiben
    }
}
```

**Wichtig:** Rust verlangt hierbei absolute Gründlichkeit! Du musst bei einem `match` immer *alle* möglichen Varianten deines Enums abdecken. Vergisst du auch nur eine einzige Option, weigert sich der Compiler, dein Programm zu bauen. Das ist ein genialer Schutzmechanismus, der Fehler im Keim erstickt.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu durchdenken und die entsprechenden Enums auf einem Blatt Papier oder in einer leeren Datei zu entwerfen. Schreibe noch keine vollständigen Programme, sondern konzentriere dich auf die logische Struktur.

### Aufgabe 1: Die smarte Ampel
1. Entwirfe ein Enum namens `AmpelPhase` mit den typischen Zuständen einer Straßenampel.
2. Überlege dir, wie du eine zusätzliche Variante für eine defekte Ampel (z.B. "BlinktGelb") einbauen kannst.
3. Skizziere im Kopf ein `match`-Muster, das für jede Phase das passende Verhalten des Autofahrers ausgibt (z.B. "Stehen bleiben!", "Vorsicht!", "Freie Fahrt!").

### Aufgabe 2: Das Bestellsystem deiner Lieblings-Pizzeria
1. Erstelle ein Enum `BestellStatus` für eine Pizza-Bestellung. Die Zustände sollen sein: *Eingegangen*, *In Zubereitung*, *Im Ofen*, *Geliefert*.
2. Wenn die Pizza *Geliefert* wird, wollen wir wissen, welcher Bote sie bringt. Füge dieser Variante ein entsprechendes Datenfeld für den Namen des Boten (einen Text) hinzu.
3. Überlege dir, wie du mit `match` dem Kunden eine Benachrichtigung anzeigen kannst, die je nach Zustand variiert.

### Aufgabe 3: Ein einfaches Haustierspiel
1. Definiere ein Enum `TierAktion` für die Aktionen eines virtuellen Haustiers. Mögliche Aktionen sind: *Schlafen*, *Spielen*, *Füttern*.
2. Beim *Füttern* soll das Haustier unterschiedliche Nahrung bekommen. Hänge an die Variante *Füttern* einen Text an, der die Futtersorte beschreibt (z.B. "Karotte" oder "Fisch").
3. Wie könnte ein `match` aussehen, das bei der Fütterung reagiert und je nach Futter eine andere Nachricht ausgibt?

---

## 🚀 50 Projekte

Hier findest du 50 Ideen für kleine Programme und Systeme, bei denen Enums die Hauptrolle spielen. Du kannst diese Liste als Inspiration nutzen, um eigene Projekte zu starten!

1. **Wetterstation**: Wetterlagen (Sonne, Regen, Schnee, Nebel, Sturm).
2. **Himmelsrichtungen-Kompass**: Navigation mit Norden, Osten, Süden, Westen.
3. **Kreditkarten-Validator**: Zahlungsarten (Visa, MasterCard, PayPal, Überweisung).
4. **Spielcharakter-Klassen**: Rollenspiel-Klassen (Krieger, Magier, Dieb, Heiler).
5. **Ampelschaltung**: Zustände einer Kreuzungsampel steuern.
6. **Fahrzeug-Konfigurator**: Antriebsarten (Benzin, Diesel, Elektro, Hybrid).
7. **Dateisystem-Explorer**: Dateitypen (Ordner, Textdatei, Bilddatei, Ausführbar).
8. **Fehlermeldungs-Handler**: Eigene Systemfehler kategorisieren (Netzwerkfehler, Dateifehler, Rechtefehler).
9. **Kaffeemaschine**: Kaffeevarianten (Espresso, Cappuccino, LatteMacchiato, KaffeeSchwarz).
10. **Taschenrechner**: Mathematische Operationen (Addition, Subtraktion, Multiplikation, Division).
11. **Smart-Home-Licht**: Lichtzustände (Aus, Ein(Helligkeit), Farbe(Rot, Gruen, Blau)).
12. **Zustand eines Wassertropfens**: Aggregatzustände (Fest, Flüssig, Gasförmig).
13. **Bestellverfolgung**: Paketstatus (Vorbereitung, Sortierung, Transport, Zustellung).
14. **Spielkarten-Farben**: Kartenspiel-Farben (Kreuz, Pik, Herz, Karo).
15. **Benutzer-Rollen**: Berechtigungen (Admin, Moderator, PremiumUser, Gast).
16. **Verbindung zur Datenbank**: Verbindungsstatus (Getrennt, Verbinde, Verbunden, Fehler(Grund)).
17. **Musik-Player**: Player-Zustände (Play, Pause, Stop).
18. **Dokumenten-Editor**: Formatierungsstile (Fett, Kursiv, Unterstrichen, Normal).
19. **Temperatur-Umrechner**: Temperatureinheiten (Celsius, Fahrenheit, Kelvin).
20. **Währungs-Umrechner**: Währungen (Euro, Dollar, Yen, Pfund).
21. **Tierstimmen-Generator**: Tierarten (Hund, Katze, Kuh, Schaf).
22. **Menüauswahl im Spiel**: Hauptmenü-Optionen (Start, Optionen, Credits, Beenden).
23. **Logbuch-Schreiber**: Log-Levels (Info, Warnung, Fehler, Debug).
24. **Paketversand-Rechner**: Paketgrößen (S, M, L, XL).
25. **Bibliotheks-Verwaltung**: Buch-Status (Verfügbar, Ausgeliehen(Datum), Verloren).
26. **Aufgabenplaner**: Prioritäten (Niedrig, Mittel, Hoch, Kritisch).
27. **Fahrstuhl-Steuerung**: Fahrtrichtung (Aufwärts, Abwärts, Stillstand).
28. **Klimaanlage**: Modi (Kühlen, Heizen, Lüften, Automatik).
29. **Roboter-Bewegung**: Befehle (Gehe(Schritte), Drehe(Winkel), Stop).
30. **Formen-Zeichner**: Geometrische Formen (Kreis(Radius), Rechteck(Breite, Hoehe), Dreieck).
31. **Koch-Timer**: Gargrad für Steaks (Rare, Medium, WellDone).
32. **Münz-Sortierer**: Euro-Münzen (1 Cent bis 2 Euro).
33. **Flugticket-Klassen**: Sitzplatzklassen (Economy, Business, FirstClass).
34. **Sensor-Messung**: Sensor-Status (Bereit, Messend, Kalibrierung, Defekt).
35. **E-Mail-Ordner**: Ordner-Kategorien (Posteingang, Spam, Entwürfe, Papierkorb).
36. **Spieler-Status**: Gesundheit (Gesund, Vergiftet, Gelähmt, K.o.).
37. **Monats-Finder**: Die 12 Monate des Jahres als Enum.
38. **Fahrradgang-Schaltung**: Gänge eines Fahrrads.
39. **Netzwerk-Protokoll**: Nachrichtentypen (Ping, Pong, Daten(Inhalt), Abmelden).
40. **Drucker-Warteschlange**: Status des Druckauftrags (Wartend, Druckend, Abgebrochen, Fertig).
41. **Zwei-Faktor-Authentifizierung**: Verifikationsmethoden (SMS(Nummer), Email(Adresse), AuthenticatorApp).
42. **Sprachauswahl**: Unterstützte Sprachen (Deutsch, Englisch, Französisch, Spanisch).
43. **Kino-Sitzplätze**: Reservierungsstatus (Frei, Reserviert, Besetzt).
44. **Farbmischer**: Grundfarben (Rot, Gelb, Blau).
45. **E-Book-Reader**: Lese-Modus (TagModus, NachtModus, SepiaModus).
46. **Fahrzeugschein-Klassen**: Führerscheinklassen (A, B, C, D).
47. **Pizza-Größen**: Durchmesser (Single, Family, Party).
48. **Haushaltsgeräte-Status**: Waschmaschinen-Programme (Baumwolle, Pflegeleicht, Wolle, Schleudern).
49. **Social-Media-Reaktionen**: Like-Typen (Like, Love, Haha, Wow, Sad, Angry).
50. **Schnittstellen-Format**: API-Antworttyp (Erfolg(Daten), ClientFehler(Code), ServerFehler(Code)).

---

## 💡 Zusammenfassung

- **Enums (Aufzählungen)** fassen eine feste Liste von sich gegenseitig ausschließenden Auswahlmöglichkeiten unter einem gemeinsamen Typnamen zusammen.
- Sie machen dein Programm **sicherer und lesbarer**, da du verständliche Namen statt kryptischer Zahlen oder Texte als Zustände nutzt.
- In Rust können Enums **zusätzliche Daten** an jede einzelne Variante anhängen – das unterscheidet sie von vielen anderen Sprachen und macht sie extrem mächtig.
- Mit dem Weichensteller **`match`** kannst du Enums sicher und übersichtlich auswerten. Rust zwingt dich dazu, jeden Fall zu berücksichtigen, damit kein Zustand vergessen wird.

---

## 📚 Links

- [Das offizielle Rust-Buch: Enums definieren](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
- [Rust by Example: Custom Types - Enums](https://doc.rust-lang.org/rust-by-example/custom_types/enum.html)
- [Konzept: Kontrollfluss (für die Nutzung von `match`)](file:///home/thorsten/Anfaenger/rust-projekte/src/konzept-kontrollfluss.md)
