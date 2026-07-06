# 🧱 Konzept: Structs & Methoden – Die Baupläne deiner Daten

Stell dir vor, du baust ein Videospiel. Dein Spiel hat viele verschiedene Charaktere. Jeder Charakter hat einen Namen, Lebenspunkte, eine Zauberkraft und eine Position auf der Karte. 

Bisher hast du gelernt, dass du jede dieser Informationen in einer eigenen Variablen speichern kannst. Aber was passiert, wenn du zehn Charaktere hast? Dann hättest du vierzig einzelne Variablen! Das wird schnell unübersichtlich und fehleranfällig. 

Wie wäre es, wenn wir uns einen eigenen **Bauplan** für einen Charakter zeichnen könnten? Einen Bauplan, der beschreibt, welche Eigenschaften jeder Charakter besitzt, und wie sich ein Charakter verhält? In Rust nennen wir solche Baupläne **Structs** (Strukturen) und die dazugehörigen Aktionen **Methoden**.

## 🧠 Theorie

### 1. Was ist ein Struct?
Ein `struct` ist dein persönlicher, maßgeschneiderter Datentyp. Du nutzt ihn, um zusammengehörende Variablen wie in einer Kiste zu bündeln. 

Stell dir ein Struct wie den **Bauplan eines Hauses** vor. Im Bauplan steht: „Jedes Haus hat eine Wandfarbe, eine Anzahl an Fenstern und eine Angabe, ob es eine Garage besitzt.“ Der Bauplan selbst ist noch kein echtes Haus, er beschreibt nur, wie ein Haus aufgebaut sein muss.

Erst wenn du nach diesem Bauplan ein echtes Haus errichtest, entsteht ein konkreter Gegenstand (eine sogenannte *Instanz* des Structs). Dieses Haus hat dann zum Beispiel die Farbe Rot, 8 Fenster und eine Garage. Ein anderes Haus hat vielleicht die Farbe Blau, 4 Fenster und keine Garage. Beide stammen vom selben Bauplan ab, sind aber eigenständige Gegenstände.

In Rust deklarierst du einen solchen Bauplan mit dem Schlüsselwort `struct` gefolgt von geschweiften Klammern. Darin listest du die Eigenschaften (Feldnamen) und deren Datentypen auf:

```rust
struct NameDesBauplans {
    eigenschaft_eins: Typ,
    eigenschaft_zwei: Typ,
}
```

Wenn du nun ein echtes Objekt aus diesem Bauplan erstellen möchtest, füllst du die Eigenschaften mit Werten:

```rust
let mein_gegenstand = NameDesBauplans {
    eigenschaft_eins: wert_eins,
    eigenschaft_zwei: wert_zwei,
};
```

Um auf eine bestimmte Eigenschaft zuzugreifen (z. B. um zu sehen, welche Wandfarbe dein Haus hat), benutzt du den **Punkt-Operator** `.`:

```rust
let farbe = mein_gegenstand.eigenschaft_eins;
```

---

### 2. Was sind Methoden und der `impl`-Block?
Ein Haus steht nicht nur stumm in der Landschaft. Vielleicht möchtest du das Haus streichen oder die Haustür abschließen. In der Programmierung nennen wir Aktionen, die direkt mit einem Gegenstand verknüpft sind, **Methoden**.

In Rust trennen wir die Daten (Eigenschaften im `struct`) streng von den Aktionen (Funktionen). Die Aktionen schreiben wir in einen sogenannten **Implementierungs-Block**, kurz `impl`. 

Stell dir das so vor: Das `struct` ist die Hardware (das Auto), und der `impl`-Block ist das Handbuch mit den Knöpfen und Funktionen (wie `gas_geben` oder `hupen`).

Die abstrakte Syntax für einen `impl`-Block sieht so aus:

```rust
impl NameDesBauplans {
    fn meine_methode(&self) {
        // Hier steht, was die Aktion tut
    }
}
```

#### Das Geheimnis von `self`
Wenn du eine Methode in einem `impl`-Block schreibst, ist der allererste Parameter in der Klammer fast immer ein magisches Wort: `self` (auf Deutsch: „ich selbst“). 

Damit weiß die Methode, auf welches konkrete Objekt sie angewendet wird. Rust unterscheidet hier drei wichtige Varianten:

1. **`&self` (Der Lese-Blick):**
   Du möchtest das Objekt nur betrachten, ohne es zu verändern. Das ist, als würdest du auf den Tacho deines Autos schauen. Du liest den Wert ab, aber das Auto bleibt genau so, wie es ist.
2. **`&mut self` (Das Verändern):**
   Du möchtest das Objekt verändern. Das ist, als würdest du das Auto umlackieren oder Benzin nachtanken. Dafür muss dein Objekt als veränderbar (`mut`) deklariert sein.
3. **`self` (Das Aufbrauchen):**
   Du möchtest das Objekt komplett übernehmen und dabei eventuell zerstören oder umwandeln. Das ist, als würdest du ein Geschenk auspacken (das Geschenkpapier ist danach zerrissen) oder ein Auto in der Schrottpresse zerquetschen. Danach existiert das ursprüngliche Objekt nicht mehr in deinem Programm.

#### Assoziierte Funktionen (Die Fabriken)
Manchmal möchtest du eine Funktion schreiben, die zu deinem Bauplan gehört, aber kein fertiges Objekt benötigt. Der bekannteste Fall ist eine Funktion, die ein neues Objekt überhaupt erst erschafft! 

Weil diese Funktion kein fertiges Objekt vor sich hat, nutzt sie **kein** `self`. In Rust nennen wir das eine assoziierte Funktion. Du rufst sie später mit einem doppelten Doppelpunkt `::` auf:

```rust
impl NameDesBauplans {
    fn neu(wert: Typ) -> NameDesBauplans {
        // Erschaffe und gib ein neues Objekt zurück
    }
}

// Aufruf:
let neues_objekt = NameDesBauplans::neu(wert);
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, diese Aufgaben selbstständig zu lösen. Schreibe die Baupläne und das Verhalten, ohne fertigen Code zu kopieren!

### Aufgabe 1: Das Haustier-Zentrum 🐱
Entwirf ein System für ein Haustier.
- **Der Bauplan (Struct):** Erstelle ein Struct für ein Haustier. Es soll einen Namen, eine Tierart (z. B. „Katze“) und ein Hungerlevel (eine ganze Zahl von 0 bis 100) speichern.
- **Die Aktionen (Methoden):**
  - Implementiere eine Methode `fuettern(&mut self)`. Wenn das Tier gefüttert wird, soll das Hungerlevel um einen bestimmten Wert sinken.
  - Implementiere eine Methode `status_zeigen(&self)`. Diese soll den Namen, die Tierart und das aktuelle Hungerlevel auf dem Bildschirm ausgeben.
  - Erstelle eine assoziierte Funktion `neu(name, tierart)`, die ein neues Haustier mit einem Hungerlevel von standardmäßig 50 (weder satt noch am Verhungern) zurückgibt.

### Aufgabe 2: Der Kaffeebereiter ☕
Simuliere eine Kaffeemaschine im Büro.
- **Der Bauplan (Struct):** Die Kaffeemaschine benötigt einen Wasservorrat (in Millilitern) und einen Kaffeebohnenvorrat (in Gramm).
- **Die Aktionen (Methoden):**
  - Schreibe eine Methode `nachfuellen(&mut self, wasser, bohnen)`, um die Vorräte aufzustocken.
  - Schreibe eine Methode `kaffee_bruehen(&mut self)`. Diese Methode soll prüfen, ob noch genug Wasser (z. B. 150 ml) und genug Bohnen (z. B. 15 g) vorhanden sind. Wenn ja, ziehe die Mengen ab und gib eine Erfolgsmeldung aus. Wenn nein, gib eine Fehlermeldung aus, dass die Maschine nachgefüllt werden muss.

### Aufgabe 3: Der Geometrie-Prüfer 📐
Arbeite mit geometrischen Formen.
- **Der Bauplan (Struct):** Erstelle ein Struct für ein Rechteck mit einer Breite und einer Höhe.
- **Die Aktionen (Methoden):**
  - Implementiere eine Methode `flaeche(&self)`, die die Fläche des Rechtecks berechnet und zurückgibt.
  - Implementiere eine Methode `ist_quadrat(&self)`, die prüft, ob Breite und Höhe gleich lang sind, und einen Wahrheitswert (`true` oder `false`) zurückgibt.

---

## 🚀 50 Projekte

Hier sind 50 Ideen für kleine Programme und Konzepte, die du mit Structs und Methoden in Rust umsetzen kannst. Nutze sie als Inspiration für deine eigenen Projekte!

### Spiele & Abenteuer
1. **Helden-Charakter:** Speichere HP, XP und Name mit einer Methode zum Schadennehmen.
2. **Gegner-Monster:** Verwalte Angriffskraft und Rüstung mit einer Kampf-Methode.
3. **Spieler-Inventar:** Simuliere das Hinzufügen und Entfernen von Gegenständen in einer Tasche.
4. **Würfelbecher:** Speichere Augenzahlen und schüttle sie mit einer Methode.
5. **Highscore-Eintrag:** Verwalte Spielername, Score und Datum eines Rekords.
6. **Schachfigur:** Speichere Farbe, Typ und Koordinaten mit einer Methode zur Positionsprüfung.
7. **Spielfeld-Kachel:** Verwalte Geländeart und Begehbarkeit.
8. **Quiz-Frage:** Speichere Frage, Antwortmöglichkeiten und die richtige Antwort mit einer Methode zum Prüfen.
9. **Virtuelles Tamagotchi:** Simuliere Hunger, Müdigkeit und Spielfreude über Zeit-Methoden.
10. **Text-Adventure-Raum:** Speichere Raumbeschreibung und mögliche Ausgänge.

### Werkzeuge & Nützliches
11. **Eieruhr:** Verwalte eine Minutenzahl und verringere sie mit einer Takt-Methode.
12. **Münzzähler:** Zähle Münzwerte und berechne die Gesamtsumme deiner Sparbüchse.
13. **Passwort-Validator:** Speichere ein Passwort und prüfe per Methode seine Sicherheitskriterien.
14. **Smartphone-Akku:** Simuliere Ladestand und Akkugesundheit bei Nutzung und Laden.
15. **Ampel:** Verwalte die Farben Rot, Gelb, Grün und schalte sie in der richtigen Reihenfolge weiter.
16. **Temperatur-Konverter:** Speichere Grad in Celsius und biete Methoden für Kelvin/Fahrenheit.
17. **Zeitmesser:** Simuliere eine Stoppuhr mit Start- und Stopp-Methoden.
18. **Notizzettel:** Speichere Titel und Textinhalt mit einer Methode zum Anhängen von Text.
19. **RGB-Farbe:** Speichere Rot-, Grün- und Blauwerte mit einer Methode zum Mischen zweier Farben.
20. **Taschenrechner:** Ein Struct, das Zwischenergebnisse speichert und Rechenmethoden anbietet.

### Simulationen & Natur
21. **Kreis-Rechner:** Berechne Umfang und Fläche über den Radius.
22. **Punkt im 2D-Raum:** Speichere X- und Y-Koordinaten mit einer Methode zur Distanzberechnung.
23. **Vektor-Mathematik:** Simuliere 3D-Vektoren und implementiere das Skalarprodukt.
24. **Bruch-Rechner:** Speichere Zähler und Nenner mit einer Methode zum Kürzen des Bruchs.
25. **Virtuelle Pflanze:** Simuliere Wachstum basierend auf Wasser- und Sonnenlichtmenge.
26. **Wetterbericht:** Speichere Temperatur, Windstärke und Regenwahrscheinlichkeit.
27. **Pendel-Simulation:** Berechne Schwingungsdauer anhand der Pendellänge.
28. **Auto-Tacho:** Verwalte aktuellen Gang, Drehzahl und Geschwindigkeit.
29. **Roboter-Arm:** Simuliere Gelenkwinkel und ändere sie mit Sicherheitsgrenzen.
30. **Planeten-Umlaufbahn:** Speichere Masse und Sonnenabstand mit Geschwindigkeitsberechnung.

### Medien & Freizeit
31. **Buch-Eintrag:** Speichere Titel, Autor und ob es ausgeliehen ist.
32. **Musik-Lied:** Verwalte Titel, Interpret und Länge in Sekunden.
33. **Foto-Metadaten:** Speichere Auflösung, Dateigröße und Kamera-Modell.
34. **Rezept-Zutaten:** Verwalte Zutatenmengen und skaliere sie für mehr Portionen.
35. **Kino-Saal:** Verwalte Sitzreihen und Plätze mit einer Methode zur Sitzplatzreservierung.
36. **Fahrkarte:** Speichere Start, Ziel, Preis und Gültigkeitsstatus.
37. **Kalender-Eintrag:** Verwalte Datum, Uhrzeit und Beschreibung mit Überschneidungsprüfung.
38. **Vokabeltrainer:** Speichere ein deutsches und ein fremdsprachiges Wort zum Abfragen.
39. **Pizza-Bestellung:** Wähle Pizza-Größe und Beläge und berechne den Preis.
40. **Audio-Lautstärke:** Verwalte Lautstärke und Stummschaltung mit Dämpfungsmethoden.

### Organisation & Verwaltung
41. **Bankkonto:** Speichere Kontonummer, Inhaber und Saldo mit Einzahlungs- und Abhebemethoden.
42. **Warenkorb-Artikel:** Verwalte Produkt, Preis und ANzahl.
43. **To-Do-Aufgabe:** Speichere Beschreibung, Priorität und Erledigt-Status.
44. **Gästebucheintrag:** Speichere Name, E-Mail und Nachrichtentext.
45. **Paket-Sendung:** Verwalte Gewicht, Absender, Empfänger und Lieferstatus.
46. **Studenten-Profil:** Speichere Name, Matrikelnummer und eine Liste von Noten mit Notenschnitt.
47. **Hotelzimmer:** Verwalte Zimmernummer, Bettenanzahl und Belegungsstatus.
48. **Mitarbeiter-Daten:** Speichere Gehalt, Abteilung und Einstellungsjahr.
49. **Fitness-Aktivität:** Verwalte Dauer, Sportart und verbrannte Kalorien.
50. **Zoo-Gehege:** Speichere Gehegegröße, Tierart und Futterbedarf der Tiere im Gehege.

---

## 💡 Zusammenfassung

- **Structs** sind deine eigenen, benutzerdefinierten Datentypen. Sie funktionieren wie **Baupläne** für Kisten, in denen du verschiedene zusammenhängende Variablen (Felder) verpackst.
- Der **`impl`-Block** trennt die Struktur der Daten von den Aktionen. Hier schreibst du alle Funktionen und Methoden hinein, die zu deinem Struct gehören.
- **Methoden** sind Aktionen eines Objekts. Sie verwenden als ersten Parameter **`self`** (bzw. `&self` oder `&mut self`), um auf die Eigenschaften des konkreten Objekts zuzugreifen.
- **Assoziierte Funktionen** verwenden kein `self`. Sie werden oft als „Konstruktoren“ (häufig `new` genannt) genutzt, um neue Objekte nach dem Bauplan zu erstellen. Sie werden mit `BauplanName::funktion()` aufgerufen.

---

## 📚 Links

- [Das offizielle Rust-Buch: Structs (Englisch)](https://doc.rust-lang.org/book/ch05-00-structs.html)
- [Die deutsche Übersetzung des Rust-Buchs: Structs (Deutsch)](https://rust-lang-de.github.io/rustbook-de/ch05-00-structs.html)
- [Rust by Example: Custom Types & Structs (Englisch)](https://doc.rust-lang.org/rust-by-example/custom_types/structs.html)
- [Rust by Example: Methods (Englisch)](https://doc.rust-lang.org/rust-by-example/fn/methods.html)
