# 🎯 Konzept: Pattern Matching – Intelligentes Sortieren

Stell dir vor, du stehst an einem riesigen Sortierband in einer Postfiliale. Sekündlich rollen Pakete an dir vorbei: winzige Briefe, schwere Pakete, runde Rollen und manchmal sogar beschädigte Sendungen, bei denen die Adresse fehlt. Deine Aufgabe ist es, jedes Paket blitzschnell zu prüfen und in den richtigen Container zu werfen. 

Wenn du ein eckiges Paket siehst, kommt es in Box A. Wenn es eine Rolle ist, kommt es in Box B. Und wenn es gar keine Adresse hat, wandert es direkt in die Schadensabteilung. 

Genau das ist **Pattern Matching** (zu Deutsch: Musterabgleich) in Rust! Es ist wie eine hochentwickelte, intelligente Sortiermaschine. Du gibst ihr einen Wert und sagst: „Prüfe diesen Wert gegen verschiedene Schablonen. Sobald eine Schablone perfekt passt, führe die dazugehörige Aktion aus.“

In diesem Kapitel lernst du, wie dieses Sortiersystem funktioniert und warum der Rust-Compiler dabei dein treuester (und strengster!) Assistent ist.

---

## 🧠 Theorie

### Die Schablonen und der Musterabgleich

Im Kern von Pattern Matching stehen zwei Dinge: der **Wert**, den du untersuchen willst, und die **Muster** (Schablonen), auf die der Wert passen soll. 

Ein Muster ist wie ein Plätzchenausstecher. Wenn der Teig (dein Wert) die richtige Form hat, passt er durch den Ausstecher. Wenn nicht, probiert die Maschine den nächsten Ausstecher aus.

In Rust benutzen wir dafür den sogenannten `match`-Ausdruck. Das Ganze sieht vom Aufbau her so aus:

```rust
match dein_wert {
    schablone_1 => {
        // Was soll passieren, wenn Schablone 1 passt?
    },
    schablone_2 => {
        // Was soll passieren, wenn Schablone 2 passt?
    },
    // Weitere Schablonen...
}
```

Die Maschine geht die Schablonen von oben nach unten durch. Sobald das erste passende Muster gefunden wird, stoppt Rust die Suche, führt den Code daneben aus und ignoriert alle weiteren Schablonen darunter.

---

### Exhaustiveness Checking: Der lückenlose Qualitätskontrolleur

Jetzt kommt die Besonderheit von Rust, die diese Sprache so sicher macht: das **Exhaustiveness Checking** (Lückenlosigkeitsprüfung). 

Stell dir vor, auf deinem Post-Sortierband taucht plötzlich ein dreieckiges Paket auf. Deine Sortiermaschine hat aber nur Fächer für eckige und runde Pakete. Was passiert? Das Band verstopft, die Maschine stürzt ab oder das Paket fällt herunter und geht verloren. 

Rust hasst solche unsicheren Zustände. Deshalb verhält sich der Rust-Compiler wie ein extrem strenger Chef der Qualitätskontrolle. Er schaut sich deine Sortiermaschine (`match`) an und fragt: „Hast du wirklich an **jeden einzelnen Fall** gedacht, der jemals eintreffen könnte?“

Wenn du zum Beispiel einen Datentyp mit drei Möglichkeiten prüfst (z. B. eine Ampel mit Rot, Gelb und Grün), aber nur Schablonen für Rot und Grün eingebaut hast, wird der Compiler lautstark protestieren. Dein Programm wird sich gar nicht erst kompilieren lassen! Rust zwingt dich dazu, lückenlos zu sein.

#### Das Auffangbecken: Der Unterstrich `_`

Da wir aber nicht immer für jede erdenkliche Möglichkeit (wie jede Zahl von 1 bis zu einer Milliarde) eine eigene Schablone basteln können, gibt es ein universelles Auffangbecken: den Unterstrich `_`.

Der Unterstrich ist das Muster für **„alles andere“** oder **„sonstige Fälle“**. Wenn kein anderes Muster vorher gepasst hat, greift garantiert dieses Muster. Es ist wie das Fach für den Restmüll oder die Fundgrube in unserer Postfiliale:

```rust
match zahl {
    1 => { /* Spezialfall 1 */ },
    2 => { /* Spezialfall 2 */ },
    _ => { /* Für jede andere Zahl */ }
}
```

---

### Die Abkürzung: `if let` für den schnellen Check

Manchmal ist uns die große Sortiermaschine mit all ihren Fächern viel zu aufwendig. Stell dir vor, du hast einen großen Korb voll Post und suchst ausschließlich nach einem goldenen Umschlag. Wenn du ihn findest, möchtest du dich freuen. Alle anderen Briefe sind dir in diesem Moment völlig egal – du willst sie nicht sortieren, sondern einfach ignorieren.

Wenn du dafür ein `match` benutzen würdest, müsstest du schreiben:

```rust
match umschlag {
    Gold => { /* Freuen! */ },
    _ => { /* Tu nichts */ }
}
```

Das ist viel Tipparbeit für eine einzige Bedingung. Deshalb hat Rust eine bequeme Abkürzung eingebaut: das `if let`. 

Mit `if let` sagst du: „*Wenn* dieser Wert auf diese eine Schablone passt, dann mache folgendes. Ansonsten mach einfach weiter im Text.“

Der abstrakte Aufbau sieht so aus:

```rust
if let schablone = wert {
    // Wird nur ausgeführt, wenn das Muster passt
}
```

Damit sparst du dir das Auffangbecken `_` und hältst deinen Code sauber und übersichtlich, wenn dich nur ein ganz bestimmter Fall interessiert.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Hier sind einige Aufgaben, mit denen du das Konzept des intelligenten Sortierens üben kannst. Versuche, die Logik zuerst auf einem Blatt Papier oder in Gedanken zu entwerfen, bevor du sie in Rust programmierst!

### Aufgabe 1: Der Ampel-Assistent
Erstelle ein Programm, das den Zustand einer Ampel simuliert. 
* Nutze ein `match`, um auf die drei Ampelphasen (Rot, Gelb, Grün) zu reagieren.
* Drucke für jede Phase eine passende Aktion aus (z. B. „Halt!“, „Achtung!“, „Freie Fahrt!“).
* *Herausforderung:* Versuche absichtlich, eine Phase wegzulassen, und beobachte, wie sich der Compiler beschwert!

### Aufgabe 2: Der Noten-Übersetzer
Schreibe eine Logik, die eine Schulnote von 1 bis 6 als Zahl entgegennimmt.
* Verwende ein `match`-Konstrukt.
* Gib für die Noten 1 bis 3 ein Lob aus.
* Gib für die Noten 4 und 5 eine Ermutigung aus.
* Reagiere bei einer 6 mit einem Hinweis auf Nachhilfe.
* Nutze das Auffangbecken `_`, um ungültige Eingaben (wie z. B. eine Note 0 oder 7) abzufangen und eine Fehlermeldung auszugeben.

### Aufgabe 3: Der Schatzsucher mit `if let`
Stell dir vor, du hast eine Kiste, die entweder leer ist, ein normales Buch enthält oder eine wertvolle Goldmünze.
* Dich interessiert ausschließlich der Fall, dass sich eine Goldmünze in der Kiste befindet.
* Setze diese Prüfung mit dem kompakten `if let` um, sodass andere Inhalte einfach ignoriert werden.

---

## 🚀 50 Projekte

Pattern Matching ist das Schweizer Taschenmesser in Rust. Hier sind 50 spannende Ideen für Projekte, bei denen du dieses Konzept perfekt einsetzen kannst:

### Spiele & Simulationen
1. **Münzwurf-Simulator**: Entscheide je nach Wurfseite über Gewinn oder Verlust.
2. **Text-Adventure-Steuerung**: Werte Spielerbefehle wie „Norden“, „Osten“, „Süden“, „Westen“ aus.
3. **Schere-Stein-Papier**: Vergleiche die Wahl beider Spieler per Musterabgleich.
4. **Würfelspiel-Auswerter**: Erkenne Sonderregeln beim Erreichen bestimmter Augenzahlen.
5. **Karten-Stärkeberechner**: Ordne Spielkarten (Ass, König, Dame, etc.) ihre Werte zu.
6. **Tier-Simulator**: Lasse Tiere je nach Typ unterschiedliche Geräusche machen.
7. **Wetter-Simulator**: Berechne die Kleidungsempfehlung basierend auf Sonnig, Regnerisch oder Schnee.
8. **RPG-Kampfsystem**: Bestimme den Schaden je nach Waffentyp (Schwert, Bogen, Magie).
9. **Schachfiguren-Bewegung**: Prüfe, ob ein Zug für die ausgewählte Figur erlaubt ist.
10. **Labyrinth-Navigator**: Reagiere auf Hindernisse (Wand, Falle, Ausgang) vor dem Spieler.

### Alltagshelfer & Produktivität
11. **Einfacher Taschenrechner**: Führe Rechenoperationen basierend auf den Symbolen (+, -, *, /) aus.
12. **Einheiten-Konverter**: Rechne Längen um (Meter in Kilometer, Meilen, etc.).
13. **Währungsrechner**: Konvertiere Geldbeträge je nach Länderkürzel (EUR, USD, GBP).
14. **Kalender-Helfer**: Gib die Anzahl der Tage für jeden Monat aus.
15. **Temperatur-Klassifizierer**: Teile Temperaturen in Gefrierpunkt, Kalt, Angenehm und Heiß ein.
16. **BMI-Analysator**: Werte den Body-Mass-Index in Untergewicht, Normalgewicht und Übergewicht aus.
17. **Alters-Checker**: Entscheide über Eintrittspreise (Kind, Student, Erwachsener, Senior).
18. **Rabatt-Kalkulator**: Berechne Preise basierend auf Gutscheincodes.
19. **Paket-Porto-Rechner**: Bestimme Versandkosten nach Gewichtsklassen.
20. **To-Do-Priorisierer**: Ordne Aufgaben nach Wichtigkeit (Hoch, Mittel, Niedrig) verschiedene Farben zu.

### Textverarbeitung & Parser
21. **Vokal-Zähler**: Prüfe einzelne Buchstaben darauf, ob es Vokale oder Konsonanten sind.
22. **Befehlszeilen-Parser**: Werte Startparameter deines Programms aus.
23. **Satzzeichen-Filter**: Entferne oder ersetze Satzzeichen je nach Typ.
24. **Markdown-Konverter**: Erkenne Überschriften-Symbole (#) am Zeilenanfang.
25. **Emoji-Übersetzer**: Ersetze Text-Smileys (wie `:)`) durch echte Emojis.
26. **Telefonnummer-Formatierer**: Erkenne Ländervorwahlen und formatiere den Rest.
27. **Zensur-Filter**: Erkenne Schimpfwörter und ersetze sie durch Sternchen.
28. **Dateiendungs-Erkenner**: Bestimme den Dateityp anhand der Endung (.txt, .jpg, .pdf).
29. **Römische Zahlen**: Konvertiere römische Ziffern (I, V, X, L, C, D, M) in Zahlen.
30. **Morsecode-Decoder**: Übersetze Morse-Signale in Buchstaben.

### Hardware & IoT Simulationen
31. **Ampelsteuerung**: Schalte Phasen einer simulierten Straßenkreuzung.
32. **Heizungsthermostat**: Schalte die Heizung an oder aus, je nachdem, ob ein Schwellenwert erreicht ist.
33. **Alarmanlagen-Status**: Werte Sensor-Signale (Bewegung, Fenster offen, Rauch) aus.
34. **Smart-Home-Licht**: Ändere die Helligkeit je nach Tageszeit (Morgen, Mittag, Abend, Nacht).
35. **Getränkeautomat**: Prüfe den eingeworfenen Geldbetrag und gib das gewählte Getränk aus.
36. **Fahrstuhl-Steuerung**: Entscheide, in welches Stockwerk der Fahrstuhl als Nächstes fährt.
37. **Tastatur-Layout-Mapper**: Übersetze Tastendrücke in Aktionen.
38. **Batteriestands-Warnung**: Zeige LED-Farben (Grün, Gelb, Rot) je nach Ladestand an.
39. **Lüftersteuerung**: Passe die Lüftergeschwindigkeit an die CPU-Temperatur an.
40. **Mikrowellen-Timer**: Wähle das Heizprogramm je nach Speisentyp (Suppe, Pizza, Popcorn).

### Daten- & Systemwerkzeuge
41. **Fehlercode-Erklärer**: Übersetze HTTP-Statuscodes (200, 404, 500) in lesbaren Text.
42. **Benutzerrollen-Prüfer**: Gewähre Rechte je nach Status (Admin, Editor, Gast).
43. **Datenbank-Antwort-Sorter**: Sortiere Datensätze nach Erfolg oder Fehlermeldung.
44. **Dateisystem-Scanner**: Unterscheide beim Scannen zwischen Dateien, Ordnern und Links.
45. **Log-Datei-Filter**: Filtere Log-Einträge nach Typ (INFO, WARN, ERROR).
46. **Netzwerkprotokoll-Parser**: Werte eintreffende Datenpakete aus.
47. **JSON-Typen-Analysator**: Erkenne, ob ein Wert ein Text, eine Zahl oder ein Array ist.
48. **Arbeitsspeicher-Überwachung**: Reagiere auf normalen, erhöhten oder kritischen Speicherverbrauch.
49. **Backup-Planer**: Entscheide je nach Wochentag, ob ein inkrementelles oder volles Backup nötig ist.
50. **Prozess-Status-Monitor**: Überwache Prozesse (Gestartet, Läuft, Gestoppt, Abgestürzt).

---

## 💡 Zusammenfassung

* **Pattern Matching** ist wie eine intelligente Sortiermaschine, die Werte mit verschiedenen Schablonen vergleicht.
* Der `match`-Ausdruck prüft Schablonen nacheinander von oben nach unten.
* **Exhaustiveness Checking** bedeutet: Der Compiler zwingt dich, jeden möglich Fall abzudecken, um Abstürze zu verhindern.
* Mit dem Unterstrich `_` baust du ein praktisches **Auffangbecken** für alle sonstigen Fälle.
* **`if let`** ist die bequeme Abkürzung, wenn du nur nach einer einzigen Schablone suchst und alles andere ignorieren möchtest.

---

## 📚 Links

* [Das offizielle Rust-Buch: Pattern Matching (Englisch)](https://doc.rust-lang.org/book/ch06-02-match.html)
* [Rust by Example: Match (Englisch)](https://doc.rust-lang.org/rust-by-example/flow_control/match.html)
* [Rust by Example: if let (Englisch)](https://doc.rust-lang.org/rust-by-example/flow_control/if_let.html)
