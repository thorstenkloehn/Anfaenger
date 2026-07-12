# 🔍 Fehlerbehandlung mit Option<T>

Stell dir vor, du öffnest eine Schublade in deiner Küche, in der du normalerweise deine Lieblingstasse aufbewahrst. Manchmal steht die Tasse genau dort, wo sie sein soll. Manchmal hat sie aber jemand in die Spülmaschine gestellt, und die Schublade ist komplett leer.

In vielen klassischen Programmiersprachen ist diese Situation brandgefährlich. Wenn du versuchst, aus einer leeren Schublade zu trinken, stürzt dein gesamtes Programm ab. Rust geht hier einen völlig anderen, revolutionären Weg: Es zwingt dich dazu, vor dem Trinken erst nachzusehen, ob die Tasse überhaupt da ist!

In diesem Kapitel erfährst du, wie Rust das Fehlen von Werten sicher und elegant löst, ohne dass dein Programm jemals unerwartet abstürzt.

---

## 🧠 Theorie

### Das Problem der Null-Pointer (Der Milliarden-Dollar-Fehler)

In fast allen gängigen Programmiersprachen (wie Java, C++, Python oder JavaScript) gibt es das Konzept von `null`, `nil` oder `None`. Es bedeutet einfach: "Hier ist kein Wert". 

Das Problem daran ist, dass diese Sprachen dir erlauben, eine Variable so zu behandeln, als wäre immer ein Wert da. Wenn du zum Beispiel den Namen eines Benutzers ausgeben willst:

```java
// Java-Beispiel
String name = benutzer.getName();
System.out.println(name.toUpperCase());
```

Wenn `benutzer.getName()` nun `null` zurückgibt (weil kein Name eingetragen wurde), stürzt dieses Java-Programm sofort mit einer `NullPointerException` ab. 

Der Erfinder der Null-Referenz, Tony Hoare, nannte diese Erfindung rückblickend seinen **„Billion Dollar Mistake“** (Milliarden-Dollar-Fehler). Sie ist die Ursache für unzählige Abstürze, Sicherheitslücken und frustrierte Entwickler weltweit.

### Wie Rust das Problem löst: Das `Option<T>`-Enum

Rust macht Schluss mit diesem Chaos. In Rust gibt es das klassische `null` schlichtweg nicht! Jede normale Variable **muss** immer einen gültigen Wert besitzen. 

Was machen wir aber, wenn ein Wert tatsächlich mal fehlen kann? Zum Beispiel bei:
- Einer Suche in einer Datenbank, die kein Ergebnis liefert.
- Einem optionalen Feld im Profil eines Nutzers (z.B. die Website-URL).
- Dem Auslesen einer Datei, die vielleicht gar nicht existiert.

Für diese Fälle hat Rust den Datentyp `Option<T>` in seiner Standardbibliothek. Es handelt sich dabei um ein ganz normales Enum, das zwei Zustände annehmen kann:

```rust
enum Option<T> {
    Some(T), // Ein Wert vom Typ T ist vorhanden
    None,    // Kein Wert vorhanden
}
```

Das geniale daran: `Option<T>` is ein komplett anderer Typ als `T`. Eine Variable vom Typ `Option<String>` ist kein `String`. Du kannst sie nicht wie einen String behandeln, keine String-Methoden darauf aufrufen und sie nicht direkt ausgeben. Sie ist wie ein verschlossenes Paket. Erst wenn du das Paket öffnest, kommst du an den eigentlichen Wert heran.

### Option auspacken: Der sichere Weg mit `match`

Der gründlichste und sicherste Weg, eine `Option` auszupacken, ist Pattern Matching mit `match`. Rust verlangt von dir, dass du lückenlos (`exhaustive`) sowohl den Fall mit Wert (`Some`) als auch den Fall ohne Wert (`None`) behandelst:

```rust
let benutzername: Option<String> = einige_suchfunktion();

match benutzername {
    Some(name) => println!("Willkommen zurück, {}!", name),
    None => println!("Willkommen, Gast!"),
}
```

Wenn du einen der beiden Fälle vergisst, wird der Compiler dein Programm nicht übersetzen. Du bist also absolut sicher vor Abstürzen durch vergessene "Null"-Werte.

### Die schnelle Abkürzung: `if let`

Manchmal interessiert dich nur, ob ein Wert da ist, und du willst den leeren Fall einfach ignorieren. Statt eines sperrigen `match` kannst du dafür das kompakte `if let` nutzen:

```rust
let optionales_profilbild: Option<String> = hole_profilbild();

if let Some(bild_url) = optionales_profilbild {
    println!("Profilbild wird geladen von: {}", bild_url);
}
// Der None-Fall wird hier einfach stillschweigend ignoriert.
```

### Der ungeduldige Holzhammer: `unwrap` und `expect`

Es gibt Situationen, in denen du absolut sicher bist, dass ein Paket einen Wert enthält. Oder dir ist es recht, wenn das Programm abstürzt, falls kein Wert da ist (z.B. beim Schreiben von schnellen Prototypen oder Tests).

Dafür gibt es zwei Methoden:

1. **`unwrap()`**: Holt den Wert aus `Some` heraus. Ist die Option jedoch `None`, stürzt das Programm sofort mit einem lauten Knall (*Panic*) ab.
   ```rust
   let wert = optionale_zahl.unwrap(); // Gefährlich!
   ```

2. **`expect("Fehlermeldung")`**: Funktioniert genau wie `unwrap()`, lässt dich aber eine eigene Fehlermeldung angeben, die beim Absturz ausgegeben wird. Das macht die Fehlersuche deutlich einfacher.
   ```rust
   let konfig = lies_einstellungen().expect("Die Konfigurationsdatei fehlt!");
   ```

> [!WARNING]
> Verwende `unwrap()` und `expect()` mit äußerster Vorsicht! In produktivem Code solltest du sie fast nie benutzen. Nutze stattdessen immer `match`, `if let` oder Hilfsmethoden wie `unwrap_or()`, um Standardwerte festzulegen, wenn kein Wert vorhanden ist.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben theoretisch zu durchdenken. Entwirfe die Datenstrukturen und den Ablauf im Kopf oder auf einem Blatt Papier. Schreibe keinen fertigen Code!

### Aufgabe 1: Die Artikelsuche im Online-Shop
1. Du hast eine Liste von Produkten. Jedes Produkt hat eine ID (Zahl) und einen Namen (Text).
2. Entwirfe eine Suchfunktion, die nach einer ID sucht. Überlege, welchen Rückgabetyp diese Funktion haben muss, da die ID existieren kann oder eben nicht.
3. Skizziere, wie du das Ergebnis dieser Suche mit `match` auswertest, um dem Kunden entweder den Namen des Produkts anzuzeigen oder eine freundliche Meldung wie „Artikel nicht gefunden“ auszugeben.

### Aufgabe 2: Der optionale Rucksack im Rollenspiel
1. Ein Held in einem RPG hat einen Ausrüstungsslot für einen Rucksack. Der Rucksack kann angelegt sein oder nicht.
2. Wenn ein Rucksack angelegt ist, hat er ein bestimmtes Eigengewicht (Zahl). Wenn kein Rucksack angelegt ist, gibt es kein zusätzliches Gewicht.
3. Überlege dir, wie du den Rucksack-Slot als `Option` darstellst.
4. Skizziere eine Logik, die das Gesamtgewicht des Helden berechnet. Nutze dafür `if let` oder `match`, um das Gewicht des Rucksacks nur dann zu addieren, wenn er auch wirklich da ist.

### Aufgabe 3: Standard-Lautstärke für einen Audio-Player
1. Ein Benutzer kann in einer Musik-App eine Wunsch-Lautstärke von 0 bis 100 einstellen.
2. Diese Einstellung ist optional: Hat der Benutzer nichts eingestellt, soll die App auf den Standardwert `80` zurückgreifen.
3. Wie würdest du diese optionale Einstellung in Rust abbilden?
4. Welche Methoden bietet Rust auf `Option`, um elegant an den eingestellten Wert zu kommen oder – falls dieser fehlt – automatisch den Standardwert `80` zu wählen, ohne das Programm zum Absturz zu bringen? (Tipp: Schau dir in der Dokumentation die Methode `unwrap_or` an).

---

## 🚀 50 Projekte

Hier sind 50 kleine Programmierideen und Übungen, bei denen `Option<T>` eine zentrale Rolle spielt:

### Datensuche & Listen
1. **Ersthelfer**: Finde das erste Element in einer Liste, das eine bestimmte Bedingung erfüllt.
2. **Letzter Zeuge**: Finde das letzte Element in einer Liste von Benutzereingaben.
3. **Mittelwert-Finder**: Berechne den Durchschnitt einer Liste (Achtung: Was, wenn die Liste leer ist?).
4. **Wörtersuche**: Suche in einem Text nach einem bestimmten Wort und gib dessen Position zurück.
5. **Nächster Nachbar**: Finde in einer Liste von Zahlen den Wert, der einer Zielzahl am nächsten ist.
6. **Maximalwert-Detektor**: Ermittle die größte Zahl aus einer Liste (Rückgabe ist leer bei leerer Liste).
7. **Min-Max-Paar**: Finde gleichzeitig das Minimum und Maximum einer Zahlenreihe.
8. **Index-Finder**: Finde den Index eines Zeichens in einem String.
9. **Datenbank-Simulator**: Suche einen User-Datensatz anhand einer E-Mail-Adresse.
10. **Wörterbuch-Abfrage**: Schlage ein deutsches Wort nach und gib die englische Übersetzung zurück.

### Spiele & Simulationen
11. **Inventar-Slot**: Ein Gegenstandsslot im Spiel, der leer sein kann.
12. **Highscore-Vergleicher**: Vergleiche den aktuellen Score mit dem bisherigen Highscore (der anfangs noch nicht existiert).
13. **Spieler-Ziel**: Speichere den aktuellen Gegner, den ein Spieler anvisiert hat.
14. **Gilden-Anführer**: Bestimme den Anführer einer Gilde (kann vakant sein).
15. **Schatzkisten-Inhalt**: Eine Kiste, die beim Öffnen entweder ein Item enthält oder leer ist.
16. **Nächster Spielzug**: Berechne den besten Zug für eine KI (gibt `None` zurück, wenn kein Zug mehr möglich ist).
17. **Würfel-Glück**: Ein Würfelwurf, der unter bestimmten Bedingungen ungültig sein kann.
18. **Lebenspunkte-Regeneration**: Berechne die Heilung basierend auf einem optionalen Heiltrank-Effekt.
19. **Waffen-Aufsatz**: Ein Visier auf einem Gewehr, das montiert sein kann oder nicht.
20. **Aktives Quest**: Verwalte das aktuell vom Spieler verfolgte Abenteuer.

### Web & Netzwerke
21. **API-Schlüssel-Prüfer**: Lies den API-Key aus den Headern einer Anfrage aus.
22. **Profilbild-URL**: Lade ein Standardbild, falls der Nutzer keine eigene Profilbild-URL hinterlegt hat.
23. **Query-Parameter**: Extrahiere einen optionalen Filter-Parameter (z.B. `?sort=desc`) aus einer URL.
24. **Port-Finder**: Bestimme den Netzwerk-Port aus einer Konfiguration (nutze Standardwert `8080`, falls nicht definiert).
25. **HTTP-Referer**: Ermittle die Website, von der der Besucher weitergeleitet wurde.
26. **Wlan-Verbindung**: Speichere den Namen des aktuell verbundenen WLANs.
27. **Session-Token**: Prüfe, ob ein temporäres Login-Token im Browser des Nutzers vorhanden ist.
28. **Download-Fortschritt**: Berechne die verbleibende Zeit (ist unbestimmt, solange der Download nicht gestartet ist).
29. **IP-Adresse**: Ermittle die IP-Adresse des Absenders einer Nachricht.
30. **Webhook-Payload**: Lies optionale Metadaten aus einem eingehenden Webhook aus.

### Text- & Dateiverarbeitung
31. **Umgebungsvariable**: Lies die Variable `PATH` aus dem Betriebssystem aus.
32. **Dateiendungs-Extraktor**: Hole die Endung einer Datei (z.B. `txt` aus `dokument.txt` – Achtung bei Dateien ohne Endung!).
33. **Zahlen-Parser**: Versuche einen Text in eine Zahl umzuwandeln (gibt `None` zurück, wenn der Text Buchstaben enthält).
34. **Konfigurations-Lader**: Suche nach einer Konfigurationsdatei an verschiedenen Standard-Orten.
35. **Erste Zeile**: Lies die allererste Zeile einer Textdatei aus (was, wenn die Datei leer ist?).
36. **CSV-Spalten-Parser**: Extrahiere den Wert der 5. Spalte einer CSV-Zeile.
37. **JSON-Wert**: Suche nach einem optionalen Key in einem verschachtelten JSON-Objekt.
38. **Kommentar-Zeilen**: Finde den ersten Kommentar im Quellcode.
39. **Pfad-Vereinfacher**: Hole das übergeordnete Verzeichnis eines Pfades (gibt `None` bei der Root-Ebene zurück).
40. **Regex-Captures**: Finde die erste Übereinstimmung einer Regex-Suche.

### System & Hardware
41. **Akku-Ladestand**: Zeige den Ladestand an (ist `None`, wenn es sich um einen Desktop-PC ohne Akku handelt).
42. **Temperatursensor**: Lies den Sensor aus (gibt `None` zurück, falls der Sensor getrennt wurde).
43. **Zweit-Monitor**: Ermittle die Auflösung des zweiten angeschlossenen Bildschirms.
44. **GPS-Koordinaten**: Hole die aktuelle GPS-Position (kann im Tunnel oder bei deaktiviertem GPS fehlen).
45. **USB-Gerät**: Erkenne das zuletzt eingesteckte USB-Gerät.
46. **System-Uhrzeit**: Synchronisiere die Uhrzeit mit einem NTP-Server (kann fehlschlagen/fehlen).
47. **Freier Speicherplatz**: Berechne den freien Speicherplatz auf einem optionalen Netzlaufwerk.
48. **Lüfterdrehzahl**: Überwache die Drehzahl eines Lüfters (einige Lüfter haben keinen Drehzahlmesser).
49. **Drucker-Auswahl**: Finde den Standarddrucker im System.
50. **Hardware-Beschleunigung**: Prüfe, ob eine kompatible Grafikkarte für GPU-Berechnungen vorhanden ist.

---

## 💡 Zusammenfassung

- **Kein `null` in Rust**: Rust eliminiert die Gefahr von Null-Pointer-Abstürzen komplett an der Wurzel.
- **`Option<T>`**: Ist ein Enum mit zwei Varianten: `Some(wert)` (Wert vorhanden) und `None` (kein Wert vorhanden).
- **Kapselung**: Eine `Option<T>` ist nicht direkt benutzbar. Du musst sie erst auspacken.
- **Sicheres Entpacken**: 
  - Mit **`match`** behandelst du lückenlos alle Fälle.
  - Mit **`if let`** greifst du schnell auf `Some` zu und ignorierst `None`.
  - Hilfsmethoden wie **`unwrap_or(standard)`** erlauben es dir, sicher einen Standardwert festzulegen.
- **Gefährliches Entpacken**: **`unwrap()`** und **`expect()`** bringen dein Programm bei `None` zum Absturz. Benutze sie nur im Notfall oder für Tests!

---

## 📚 Links

- [Das offizielle Rust-Buch: Das Option-Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html#the-option-enum-and-its-advantages-over-null-values)
- [Rust by Example: Option & unwrap](https://doc.rust-lang.org/rust-by-example/error/option_unwrap.html)
- [Rust-Dokumentation: std::option::Option](https://doc.rust-lang.org/std/option/enum.Option.html)
- [Konzept: Enums](./konzept-enums.md)
- [Konzept: Pattern Matching](./konzept-matching.md)
