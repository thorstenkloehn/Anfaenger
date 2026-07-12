# ⚠️ Fehlerbehandlung mit Result<T, E>

Fehler gehören zum Programmieren wie der Kaffee am Morgen. Aber wie wir mit ihnen umgehen, entscheidet darüber, ob unsere Software stabil läuft oder unerwartet abstürzt. In diesem Kapitel lernst du, wie Rust das Thema Fehlerbehandlung anpackt. Du wirst sehen, dass Rust einen ganz anderen Weg geht als viele andere Programmiersprachen – und warum dieser Weg deinen Code sicherer und verständlicher macht.

---

## 🧠 Theorie

### 1. Warum nutzt Rust keine Exceptions?
In vielen modernen Sprachen (wie Java, Python oder C++) werden Fehler über sogenannte **Exceptions (Ausnahmen)** behandelt. Wenn dort etwas schiefgeht, wird eine Exception "geworfen", die den normalen Programmablauf sofort unterbricht und den Stack nach oben wandert, bis sie irgendwo abgefangen wird. Wenn sie niemand abfängt, stürzt das Programm ab.

Rust verzichtet ganz bewusst auf dieses Konzept. Die Gründe dafür sind:
* **Exceptions sind unsichtbar:** Wenn du eine Funktion aufrufst, siehst du ihrer Signatur meistens nicht an, ob sie eine Exception werfen kann und welche das sein könnte. Das führt dazu, dass man leicht vergisst, Fehler abzufangen.
* **Unvorhersehbarer Kontrollfluss:** Exceptions erzeugen unsichtbare Sprünge im Code. Das macht es schwer zu verstehen, welcher Code bei einem Fehler eigentlich als Nächstes ausgeführt wird.
* **Performance:** Das sogenannte "Stack Unwinding" (das Zurückverfolgen des Aufrufstapels beim Auflegen einer Exception) ist laufzeitintensiv und kostet Performance.

**Rusts Philosophie:** Behebbare Fehler sind keine Ausnahmezustände, sondern völlig normale Ergebnisse einer Operation. Sie werden als ganz normale Daten behandelt und sind fest im Typsystem verankert. Der Compiler zwingt dich dazu, dich mit ihnen zu befassen, bevor dein Programm überhaupt kompiliert werden kann!

---

### 2. Wie ist der `Result<T, E>`-Enum aufgebaut?
Um einen Wert zurückzugeben, der entweder ein Erfolg oder ein Fehler sein kann, nutzt Rust den integrierten Typ `Result<T, E>`. Dies ist ein einfacher Enum mit zwei Varianten:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

* **`T`** und **`E`** sind Platzhalter für Typen (Generics).
* **`Ok(T)`**: Repräsentiert den Erfolgsfall und enthält den eigentlichen Rückgabewert vom Typ `T`.
* **`Err(E)`**: Repräsentiert den Fehlerfall und enthält Details zum Fehler vom Typ `E`.

Da `Result` mit dem Attribut `#[must_use]` versehen ist, gibt der Rust-Compiler eine Warnung aus, wenn du eine Funktion aufrufst, die ein `Result` zurückgibt, und dieses einfach ignorierst. Du musst dich aktiv entscheiden, wie du mit dem potenziellen Fehler umgehst.

---

### 3. Fehler behandeln und weiterreichen

Es gibt verschiedene Möglichkeiten, mit einem `Result` zu arbeiten:

#### A) Explizites Entpacken mit `match`
Der sicherste und präziseste Weg, ein `Result` zu verarbeiten, ist das Pattern Matching mit `match`. Hierbei musst du sowohl den Erfolgsfall (`Ok`) als auch den Fehlerfall (`Err`) explizit behandeln.

```rust
// Beispielhafter Kontrollfluss (Pseudocode)
match ergebnis {
    Ok(wert) => {
        // Tu etwas mit dem erfolgreichen Wert
    }
    Err(fehler) => {
        // Reagiere auf den Fehler
    }
}
```

#### B) Kompaktes Auswerten mit `if let`
Manchmal interessiert dich nur der Erfolgsfall oder du möchtest im Fehlerfall nur eine kurze Aktion ausführen, ohne das komplette `match`-Gerüst aufbauen zu müssen. Hierfür eignet sich `if let`:

```rust
// Beispielhafter Kontrollfluss (Pseudocode)
if let Err(fehler) = ergebnis {
    // Reagiere nur, wenn ein Fehler aufgetreten ist
}
```

#### C) Fehler elegant weiterreichen mit dem Fragezeichen-Operator (`?`)
In echten Programmen möchtest du einen Fehler oft nicht direkt an Ort und Stelle behandeln, sondern ihn an die aufrufende Funktion "hochreichen", damit diese entscheidet, was zu tun ist. 

Dafür hat Rust den **Fragezeichen-Operator (`?`)** eingeführt. Wenn du `?` an einen Funktionsaufruf anhängst, der ein `Result` zurückgibt, passiert folgendes:
1. Wenn das Ergebnis `Ok(wert)` is, wird der Wert entpackt und direkt zurückgegeben. Das Programm läuft in der aktuellen Funktion weiter.
2. Wenn das Ergebnis `Err(fehler)` ist, wird die aktuelle Funktion **sofort abgebrochen** (Early Return) und der Fehler wird als Rückgabewert der gesamten Funktion zurückgegeben.

**Wichtigste Regel für `?`:** Du kannst den `?`-Operator nur in Funktionen verwenden, die selbst wiederum ein `Result` (oder einen anderen kompatiblen Typ wie `Option`) als Rückgabetyp definiert haben! Der Fehlertyp der aufgerufenen Funktion muss außerdem in den Fehlertyp der umgebenden Funktion konvertierbar sein.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Probier die folgenden Aufgaben selbstständig aus, um ein Gefühl für `Result` zu bekommen. Schreibe den Code von Grund auf selbst und nutze die Fehlermeldungen des Compilers als Hilfestellung!

### 1. Aufgabe: Der Robuste Alter-Parser
Schreibe ein kleines Programm, das eine Zahl als Text (z.B. `"25"`) entgegennimmt und versucht, diese in eine Ganzzahl (`u32`) umzuwandeln. 
* Da die Eingabe fehlerhaft sein könnte (z.B. `"acht"` statt `"8"`), kann das Parsen fehlschlagen.
* Deine Funktion soll ein `Result<u32, String>` zurückgeben. Im Erfolgsfall liefert sie die Zahl, im Fehlerfall eine verständliche Fehlermeldung als Text.
* Nutze in der `main`-Funktion ein `match`, um das Ergebnis auszuwerten und dem Benutzer eine entsprechende Rückmeldung auf der Konsole auszugeben.

### 2. Aufgabe: Die sichere Division
Implementiere eine Funktion zur Division zweier Zahlen.
* Da eine Division durch Null mathematisch nicht definiert ist, soll deine Funktion diesen Fall abfangen.
* Wenn der Divisor ungleich Null ist, gib das Ergebnis verpackt in `Ok` zurück.
* Wenn der Divisor Null ist, gib einen passenden Fehler verpackt in `Err` zurück.
* Verwende in deiner `main`-Funktion `if let`, um gezielt auf den Fehlerfall zu reagieren und eine Warnung auszugeben.

### 3. Aufgabe: Fehlerverkettung beim Dateilesen
Erstelle eine Funktion, die den Inhalt einer Datei ausliest und die erste Zeile zurückgibt.
* Hierbei können zwei Dinge schiefgehen: Die Datei kann nicht geöffnet werden, oder das Lesen der Zeile schlägt fehl.
* Verwende den Fragezeichen-Operator (`?`), um eventuelle Fehler der Standardbibliothek (`std::io::Error`) direkt an den Aufrufer deiner Funktion weiterzureichen.
* Die Signatur deiner Funktion sollte als Rückgabetyp `Result<String, std::io::Error>` besitzen.

---

## 🚀 50 Projekte

Hier sind 50 kurze Projektideen und Übungsszenarien, bei denen du die Fehlerbehandlung mit `Result` trainieren kannst. Jede Idee konzentriert sich auf typische Fehlerquellen in realen Anwendungen:

1. **Dateileser mit Pfadprüfung:** Eine Funktion, die prüft, ob ein Dateipfad existiert, bevor sie versucht, ihn zu öffnen.
2. **JSON-Parser für Profile:** Ein Parser, der Benutzereingaben in ein JSON-Objekt umwandelt und ungültige JSON-Formate abfängt.
3. **Temperatur-Validierung:** Ein Konverter für Celsius in Kelvin, der Temperaturen unter dem absoluten Nullpunkt (-273,15 °C) abweist.
4. **Passwort-Stärke-Prüfer:** Ein Passwort-Validator, der Fehler zurückgibt, wenn das Passwort zu kurz ist oder keine Sonderzeichen enthält.
5. **Alter-Eingabe-Parser:** Ein CLI-Tool, das das Alter abfragt und negative Werte sowie Eingaben über 120 Jahren als Fehler zurückweist.
6. **HTTP-Status-Interpreter:** Eine Funktion, die numerische HTTP-Statuscodes auswertet und bei unbekannten Codes einen Fehler liefert.
7. **CSV-Spalten-Extraktor:** Ein Skript, das eine Zeile einer CSV-Datei liest und prüft, ob die erwartete Anzahl an Spalten vorhanden ist.
8. **IP-Adressen-Parser:** Ein Konverter, der einen String in eine IP-Adresse parsen will und ungültige Formate (z.B. 999.999.999.999) abfängt.
9. **Datenbank-Simulator:** Eine Mock-Datenbank, die beim Suchen nach einer ID einen Fehler zurückgibt, wenn der Datensatz nicht existiert.
10. **Taschenrechner mit Null-Schutz:** Ein Divisions-Rechner, der die Division durch Null explizit abfängt.
11. **Port-Belegungs-Scanner:** Ein Tool, das versucht, einen Netzwerk-Port zu binden, und Fehler ausgibt, falls dieser bereits belegt ist.
12. **Datei-Backup-Ersteller:** Eine Funktion, die eine Datei kopiert und Fehler meldet, wenn die Quelldatei fehlt oder Schreibrechte fehlen.
13. **URL-Syntax-Prüfer:** Ein Parser für URLs, der Fehler wirft, falls das Protokoll (http/https) fehlt.
14. **Kalenderdatum-Validator:** Eine Datumsprüfung, die Fehleingaben wie den 31. April oder den 30. Februar abfängt.
15. **XML-Tag-Validator:** Ein einfacher XML-Scanner, der prüft, ob alle geöffneten Tags auch wieder korrekt geschlossen werden.
16. **Umgebungsvariablen-Ausleser:** Eine Funktion, die wichtige Systemvariablen liest und einen Fehler wirft, wenn diese nicht gesetzt sind.
17. **Integer-Überlauf-Detektor:** Eine Additionsfunktion, die prüft, ob das Ergebnis den maximalen Wert des Typs überschreitet.
18. **E-Mail-Format-Prüfer:** Ein Validierer, der prüft, ob ein String ein gültiges E-Mail-Format besitzt (z.B. Vorhandensein von `@` und `.`).
19. **Quadratwurzel-Rechner:** Eine mathematische Funktion, die bei negativen Zahlen als Eingabe einen Fehler zurückgibt.
20. **Text-Chiffrierer:** Ein Verschlüsselungstool, das Fehler ausgibt, wenn der Schlüssel nicht die erforderliche Länge hat.
21. **INI-Konfigurations-Lader:** Ein Parser, der eine Konfigurationsdatei einliest und Fehler bei fehlerhaften Schlüssel-Wert-Paaren meldet.
22. **Array-Index-Prüfer:** Eine Funktion für sicheren Array-Zugriff, die einen Fehler zurückgibt, anstatt das Programm abstürzen zu lassen.
23. **UUID-Längen-Prüfer:** Ein Validierer, der prüft, ob eine übergebene UUID exakt 36 Zeichen lang ist.
24. **Schimpfwort-Filter:** Ein Text-Scanner, der einen Fehler zurückgibt, wenn der Text blockierte Wörter enthält.
25. **Dateigrößen-Wächter:** Ein Upload-Simulator, der prüft, ob eine Datei ein vordefiniertes Größenlimit überschreitet.
26. **Ping-Timeout-Simulator:** Ein Netzwerk-Tool, das eine Verbindung simuliert und bei zu hoher Latenz einen Timeout-Fehler ausgibt.
27. **Log-Datei-Parser:** Ein Analysetool für Server-Logs, das Zeilennummern ausgibt, in denen das Log-Format fehlerhaft ist.
28. **Schachzug-Validator:** Ein System, das prüft, ob ein Zug (z.B. E2 nach E5 für einen Bauern) regelkonform ist.
29. **Wechselkurs-Rechner:** Ein Währungsumrechner, der einen Fehler liefert, wenn für ein Währungspaar kein Kurs existiert.
30. **DNS-Resolver-Mock:** Eine Namensauflösung, die Fehler zurückgibt, wenn eine Domain nicht im Mock-DNS registriert ist.
31. **Verzeichnis-Ersteller:** Eine Funktion, die einen neuen Ordner anlegt und Fehler abfängt, wenn dieser bereits existiert.
32. **Token-Ablauf-Prüfer:** Ein Authentifizierungssystem, das prüft, ob der Timestamp eines Tokens in der Vergangenheit liegt.
33. **Bild-Header-Parser:** Ein Tool, das versucht, die Dimensionen aus einer Bilddatei zu lesen, und bei korrupten Headern abbricht.
34. **API-Rate-Limiter:** Ein Simulator, der Anfragen zählt und bei Überschreitung des Limits einen "Too Many Requests"-Fehler zurückgibt.
35. **Markdown-Header-Parser:** Eine Funktion, die prüft, ob eine Zeile eine gültige Überschrift (beginnend mit `#`) ist.
36. **Binär-Konverter:** Ein Übersetzer für Binärstrings in Dezimalzahlen, der Fehler bei Zeichen außer `0` und `1` wirft.
37. **Luhn-Kreditkartenprüfer:** Ein Validierungsalgorithmus für Kreditkartennummern, der fehlerhafte Nummern als Fehler ausgibt.
38. **Sudoku-Zeilenprüfer:** Eine Funktion, die eine Zeile eines Sudokus auf doppelte Zahlen prüft und bei Verstößen Fehler meldet.
39. **Archiv-Entpacker:** Ein Entpacker, der CRC-Prüfsummen abgleicht und bei beschädigten Archiven Fehler meldet.
40. **Geodaten-Validator:** Ein System, das prüft, ob Breitengrade zwischen -90 und 90 und Längengrade zwischen -180 und 180 liegen.
41. **Hex-Farbcode-Prüfer:** Ein Parser für CSS-Farbcodes, der Fehler bei ungültigen Zeichen oder falscher Länge (z.B. `#G12345`) wirft.
42. **Morsecode-Decoder:** Ein Decoder, der bei unleserlichen Signalen (kein Punkt oder Strich) Fehler ausgibt.
43. **Benutzer-Login-System:** Ein Login-Prozess, der zwischen "Benutzer existiert nicht" und "Passwort falsch" unterscheidet.
44. **Sensor-Messwert-Filter:** Ein Programm, das Sensorwerte glättet und bei plötzlichen Ausreißern (z.B. 0V statt 5V) Fehler ausgibt.
45. **CLI-Argumenten-Prüfer:** Ein Parser für Startparameter, der fehlende Pflichtparameter als Fehler zurückgibt.
46. **Datei-Verschieber:** Ein System, das Dateien verschiebt und Fehler abfängt, wenn das Zielverzeichnis schreibgeschützt ist.
47. **Base64-Decoder:** Ein Tool, das Base64-Strings dekodiert und bei ungültigen Zeichen (`=`, `+`, `/` an falschen Stellen) abbricht.
48. **Zeitzonen-Offset-Rechner:** Ein Zeitberechner, der ungültige Zeitzonen-Offsets (z.B. +15 Stunden) abfängt.
49. **Cäsar-Chiffre-Rotator:** Ein Verschiebungs-Chiffre, der negative oder zu große Rotationswerte (über 25) als Fehler zurückweist.
50. **Savegame-Parser:** Ein Lader für Spielstände, der prüft, ob die Datei manipuliert oder unvollständig ist.

---

## 💡 Zusammenfassung

* **Keine Exceptions:** Rust nutzt ein explizites Fehlersystem anstelle von unvorhersehbaren Ausnahmen (Exceptions).
* **Das Result-Enum:** Mit `Result<T, E>` werden Erfolg (`Ok`) und Fehler (`Err`) direkt im Typsystem abgebildet.
* **Sicherheit:** Der Compiler zwingt dich über das Attribut `#[must_use]`, Fehler aktiv zu behandeln.
* **Musterabgleich:** `match` and `if let` bieten flexible Wege, um Fehler direkt zu behandeln.
* **Weiterleitung:** Mit dem Fragezeichen-Operator `?` kannst du Fehler extrem elegant und mit minimalem Code an den Aufrufer hochreichen.

---

## 📚 Links

* [Das Rust-Buch: Kapitel 9 – Fehlerbehandlung (Englisch)](https://doc.rust-lang.org/book/ch09-00-error-handling.html)
* [Rust by Example: Result (Englisch)](https://doc.rust-lang.org/rust-by-example/error/result.html)
* [Rust API-Dokumentation: Der Result-Enum (Englisch)](https://doc.rust-lang.org/std/result/enum.Result.html)
