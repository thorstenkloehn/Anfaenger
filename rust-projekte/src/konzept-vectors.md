# 🗃️ Vektoren (Vec<T>)

Herzlich willkommen zu einem der wichtigsten Werkzeuge in Rust, wenn es um das Verwalten von Datensammlungen geht: den Vektoren (`Vec<T>`).

Bisher hast du vielleicht schon Arrays kennengelernt. Arrays sind super, wenn du im Voraus genau weißt, wie viele Elemente du speichern willst – zum Beispiel die 7 Wochentage oder die 12 Monate des Jahres. Aber was ist, wenn du eine Einkaufsliste schreibst, bei der du noch nicht weißt, wie viele Artikel am Ende darauf landen? Oder wenn du ein Spiel programmierst und die Anzahl der Gegner auf dem Bildschirm ständig wechselt?

Genau hier kommen Vektoren ins Spiel. Sie sind dynamisch, flexibel und können während der Laufzeit deines Programms beliebig wachsen oder schrumpfen.

In diesem Kapitel schauen wir uns an, wie Vektoren im Speicher funktionieren, wie Rusts Ownership-Modell auf sie wirkt und wie man sicher mit ihnen arbeitet, ohne dass das Programm abstürzt.

---

## 🧠 Theorie

### Die Analogie: Das modulare Regalsystem

Stell dir vor, du kaufst ein klassisches Bücherregal aus Holz, das genau Platz für 10 Bücher bietet. Dieses Regal ist wie ein **Array** in Rust. Seine Größe ist fest in die Struktur des Holzes eingebaut. Du kannst nicht einfach ein 11. Buch hineinstellen, ohne das Regal zu beschädigen oder ein neues zu kaufen.

Ein **Vektor** (`Vec<T>`) hingegen ist wie ein modulares Regalsystem. Du startest mit einem kleinen Brett, das Platz für ein paar Bücher bietet. Sobald du mehr Bücher kaufst, schraubst du einfach ein weiteres Brett an. Das Regal wächst mit deiner Bibliothek.

Doch wie macht der Computer das im Hintergrund?

### Stack vs. Heap: Wo liegen die Daten?

Um zu verstehen, wie ein Vektor funktioniert, müssen wir einen Blick in den Arbeitsspeicher werfen. Ein Vektor teilt sich in zwei Bereiche auf:

1. **Die Verwaltungszentrale auf dem Stack:**
   Auf dem schnellen, aber starren Stack speichert Rust die Metadaten des Vektors. Das sind drei Werte (jeweils mit der Größe eines Zeigers, z. B. 64 Bit auf modernen Systemen):
   - **Pointer (Zeiger):** Die genaue Adresse im Speicher (auf dem Heap), wo das allererste Element deines Vektors liegt.
   - **Länge (Length):** Die Anzahl der Elemente, die sich aktuell *tatsächlich* im Vektor befinden.
   - **Kapazität (Capacity):** Die Anzahl der Elemente, für die auf dem Heap bereits Speicherplatz reserviert wurde.

2. **Die eigentlichen Daten auf dem Heap:**
   Auf dem flexiblen Heap liegen die eigentlichen Elemente des Vektors direkt hintereinander aufgereiht im Speicher.

### Wie ein Vektor wächst: Die Reallozierung

Was passiert, wenn du einen neuen Gegenstand in deinen Vektor legst (z. B. mit `.push()`), die Länge aber bereits der Kapazität entspricht? Das Regal ist voll!

In diesem Moment passiert im Hintergrund etwas Spannendes:
1. **Neuen Platz suchen:** Rust bittet das Betriebssystem um einen neuen, größeren und zusammenhängenden Speicherbereich auf dem Heap. In der Regel wird die Kapazität dabei verdoppelt (z. B. von 4 auf 8 Plätze).
2. **Umziehen:** Rust kopiert alle bisherigen Elemente an den neuen Ort.
3. **Aufräumen:** Der alte Speicherbereich auf dem Heap wird freigegeben.
4. **Update:** Der Zeiger auf dem Stack wird auf die neue Adresse umgebogen, die Kapazität wird aktualisiert und das neue Element wird am Ende angehängt.

> [!NOTE]
> Dieses "Umziehen" (Reallozierung) kostet Zeit. Wenn du im Voraus weißt, dass dein Vektor ungefähr 1000 Elemente enthalten wird, kannst du Rust mit `Vec::with_capacity(1000)` anweisen, sofort genügend Platz zu reservieren. Dadurch verhinderst du unnötige Umzüge im Speicher und machst dein Programm spürbar schneller.

### Ownership und Vektoren: Wer besitzt die Daten?

In Rust gilt das Gesetz der Ownership: Jeder Wert hat genau einen Besitzer. Bei einem Vektor verhält es sich so:
- **Der Vektor besitzt seine Elemente.** Wenn du ein Element in einen Vektor einfügst, übergibst du die Ownership an den Vektor.
- **Automatisches Aufräumen (Drop):** Wenn der Vektor selbst das Ende seines Gültigkeitsbereichs (Scope) erreicht und gelöscht wird, löscht Rust automatisch auch alle darin enthaltenen Elemente und gibt deren Speicher auf dem Heap frei. Es entstehen keine Speicherlecks!

Das führt jedoch zu einer wichtigen Einschränkung beim Zugriff:
- Du kannst nicht einfach ein Element aus der Mitte des Vektors herauskopieren, wenn der Datentyp keine automatische Kopie erlaubt (wie z. B. `String`). Der Code `let element = mein_vektor[0];` würde einen Compilerfehler verursachen, weil du damit versuchen würdest, dem Vektor die Ownership an diesem Element zu stehlen, wodurch eine "Lücke" im Vektor entstehen würde.
- **Lösungen:** Entweder nimmst du nur eine Referenz (`let element = &mein_vektor[0];`), kopierst den Wert explizit (`let element = mein_vektor[0].clone();`) oder entnimmst ihn kontrolliert (z. B. mit `.pop()` am Ende oder `.remove(index)` in der Mitte, was jedoch die nachfolgenden Elemente im Speicher verschieben muss).

### Sicheres Arbeiten: Panics und Iterator-Invalidierung

Zwei häufige Fehlerquellen lauern beim Umgang mit dynamischen Listen:

#### 1. Der Index-Absturz (Out of Bounds)
Wenn dein Vektor 3 Elemente hat und du versuchst, auf das Element am Index 5 zuzugreifen (`mein_vektor[5]`), stürzt dein Programm sofort mit einer sogenannten `Panic` ab.
- **Sicherer Zugriff mit `.get()`:** Verwende stattdessen die Methode `.get(index)`. Diese gibt eine `Option<&T>` zurück. Existiert der Index, erhältst du `Some(&wert)`. Existiert er nicht, erhältst du `None`. Dein Programm stürzt nicht ab, und du kannst den Fehler sauber behandeln.

#### 2. Iterator-Invalidierung
Stell dir vor, du läufst durch eine Liste von Zahlen und fügst bei jeder geraden Zahl eine neue Zahl am Ende der Liste hinzu. Wenn die Liste während des Durchlaufens ihre Kapazität überschreitet, zieht sie im Speicher um. Dein Iterator würde plötzlich auf den alten, mittlerweile freigegebenen Speicher zeigen – ein schwerwiegender Sicherheitsfehler!
- **Rusts Rettung:** Der Borrow Checker verhindert das zur Compilezeit. Du darfst keine veränderliche Referenz auf den Vektor haben (um Elemente hinzuzufügen), während du gleichzeitig eine unveränderliche Referenz halte (um über die Elemente zu iterieren). Der Compiler bricht mit einer Fehlermeldung ab und schützt dich vor diesem Bug.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben selbstständig zu lösen. Verwende dabei die besprochenen Konzepte und die Tipps, um sicheren Code zu schreiben.

### Aufgabe 1: Leicht (Grundlagen & Syntax) – Die Einkaufsliste
1. **Zielbeschreibung:** Erstelle eine einfache Einkaufsliste, füge Artikel hinzu und frage das erste Element sicher ab.
2. **Code-Gerüst:** Ergänze den Code an den Stellen mit `todo!()`.
   ```rust
   fn main() {
       // 1. Erstelle einen leeren, veränderbaren Vektor für Strings
       let mut einkaufsliste: Vec<String> = todo!();

       // 2. Füge drei Artikel deiner Wahl hinzu (z. B. "Äpfel", "Milch", "Brot")
       todo!();

       // 3. Greife sicher auf das erste Element zu, ohne dass das Programm abstürzen kann
       // Tipp: Nutze die .get()-Methode und ein match-Konstrukt oder if-let!
       match todo!() {
           Some(artikel) => println!("Erster Artikel: {}", artikel),
           None => println!("Die Einkaufsliste ist leer!"),
       }
   }
   ```
3. **Didaktische Tipps:**
   - Nutze `Vec::new()` oder das Makro `vec![]` zum Erstellen.
   - Mit `.push(wert)` kannst du Elemente an das Ende des Vektors anhängen. Denke daran, dass ein `&str` mit `.to_string()` oder `String::from()` in einen `String` umgewandelt werden muss.
4. **Testfall:** Stelle sicher, dass beim Ausführen deines Programms der erste Artikel auf der Konsole ausgegeben wird. Wenn du die Hinzufügung auskommentierst, sollte das Programm nicht abstürzen, sondern die Meldung ausgeben, dass die Liste leer ist.

### Aufgabe 2: Mittel (Kombination & kleine Anwendungen) – Der Temperatur-Filter
1. **Aufgabenstellung:** Schreibe eine Funktion, die eine Liste von gemessenen Temperaturen filtert und nur die Temperaturen zurückgibt, die über einem bestimmten Grenzwert liegen.
2. **Anforderungen:**
   - Die Funktion soll einen Vektor von Kommazahlen (`f64`) und einen Grenzwert (`f64`) als Parameter annehmen.
   - Da wir die Originalwerte nicht zerstören wollen, soll die Funktion die Eingabewerte als Referenz entgegennehmen.
   - Die Funktion soll einen neuen Vektor mit den gefilterten Temperaturen zurückgeben.
3. **Didaktische Tipps:**
   - Übergib den Eingabe-Vektor als `&Vec<f64>` oder besser als Slice `&[f64]`.
   - Iteriere mit einer `for`-Schleife über den Vektor (z. B. `for &temp in list`), um Kopien der Zahlen zu vergleichen, da `f64` das `Copy`-Trait implementiert.
4. **Testfälle:**
   Implementiere einen Test in deinem Code, um die Funktion zu prüfen:
   ```rust
   #[test]
   fn test_temperatur_filter() {
       let messwerte = vec![15.5, 22.0, 9.8, 30.1, 18.2];
       let grenzwert = 20.0;
       let ergebnis = filter_temperaturen(&messwerte, grenzwert);
       assert_eq!(ergebnis, vec![22.0, 30.1]);
   }
   ```

### Aufgabe 3: Schwer (Architektur & fortgeschrittene Konzepte) – Das undo-fähige Notizbuch
1. **Szenario:** Du möchtest ein einfaches Notizbuch programmieren, das Änderungen rückgängig machen kann. Wenn eine Notiz geändert oder gelöscht wird, soll der vorherige Zustand in einer Historie gespeichert werden.
2. **Architekturvorgaben:**
   - Erstelle eine Struktur `Notizbuch` mit zwei Feldern: `notizen: Vec<String>` (für die aktuellen Notizen) und `historie: Vec<String>` (für gelöschte oder überschriebene Notizen).
   - Implementiere folgende Methoden:
     - `new()`: Erstellt ein leeres Notizbuch.
     - `hinzufuegen(&mut self, text: String)`: Fügt eine neue Notiz hinzu.
     - `ersetzen(&mut self, index: usize, neuer_text: String) -> Result<(), String>`: Ersetzt die Notiz am angegebenen Index. Die *alte* Notiz muss in die `historie` verschoben werden. Falls der Index ungültig ist, soll ein Fehler zurückgegeben werden.
     - `rueckgaengig(&mut self) -> Result<(), String>`: Nimmt den letzten Eintrag aus der `historie` und hängt ihn wieder an die aktiven `notizen` an. Falls die Historie leer ist, soll ein Fehler zurückgegeben werden.
3. **Tipps zur Herangehensweise:**
   - Verwende `Result` für Fehlerbehandlung, um ungültige Indizes abzufangen.
   - Nutze Methoden wie `.push()`, `.pop()` und `.remove()`, um Elemente zwischen den Vektoren zu bewegen.
   - Denke an Ownership: Um ein Element aus dem Vektor zu ersetzen, kannst du `std::mem::replace` verwenden oder das Element mit `.remove(index)` entfernen und ein neues mit `.insert(index, ...)` einfügen.
4. **Schnittstellen (API):**
   ```rust
   struct Notizbuch {
       notizen: Vec<String>,
       historie: Vec<String>,
   }

   impl Notizbuch {
       fn new() -> Self { todo!() }
       fn hinzufuegen(&mut self, text: String) { todo!() }
       fn ersetzen(&mut self, index: usize, neuer_text: String) -> Result<(), String> { todo!() }
       fn rueckgaengig(&mut self) -> Result<(), String> { todo!() }
   }
   ```
5. **Integrationstest:**
   ```rust
   #[test]
   fn test_notizbuch_historie() {
       let mut buch = Notizbuch::new();
       buch.hinzufuegen("Einkaufen gehen".to_string());
       buch.hinzufuegen("Rost lernen".to_string());
       
       assert!(buch.ersetzen(1, "Rust lernen".to_string()).is_ok());
       assert_eq!(buch.notizen[1], "Rust lernen");
       assert_eq!(buch.historie[0], "Rost lernen");
       
       assert!(buch.rueckgaengig().is_ok());
       assert_eq!(buch.notizen.last().unwrap(), "Rost lernen");
   }
   ```

---

## 🚀 50 Projekte

Hier sind 50 kurze Projektideen, mit denen du den Umgang mit Vektoren in verschiedenen Schwierigkeitsgraden üben kannst:

1. **Einfache To-Do-Liste:** Aufgaben per Konsole hinzufügen und auflisten.
2. **Noten-Durchschnittsrechner:** Noten in Vektor speichern und Durchschnitt berechnen.
3. **Zufallsauswahl-Generator:** Eine Liste von Namen eintragen und einen zufälligen Gewinner ziehen.
4. **Wort-Statistik:** Einen Text einlesen, in Wörter zerlegen und die Anzahl der Wörter zählen.
5. **Winkelsummen-Prüfer:** Vektor von Winkeln prüfen, ob sie ein gültiges Vieleck bilden.
6. **Einkaufswagen:** Artikel mit Preisen in einem Vektor verwalten und die Summe berechnen.
7. **Kartenstapel:** Kartendeck als Vektor von Enums erstellen und mischen.
8. **Highscore-Tabelle:** Liste der Top-10-Scores verwalten und automatisch sortieren.
9. **FIFO-Warteschlange:** Kundenservice-Simulation (First In, First Out) mit `.push()` und `.remove(0)`.
10. **LIFO-Stack:** Ein Stapel von Büchern (Last In, First Out) mit `.push()` und `.pop()`.
11. **Duplikat-Entferner:** Einen Vektor bereinigen, sodass jeder Wert nur einmal vorkommt.
12. **Primzahlen-Sieb:** Das Sieb des Eratosthenes mithilfe eines Vektors von Booleans umsetzen.
13. **Palindrom-Prüfer:** Prüfen, ob ein Vektor von Zeichen vorwärts wie rückwärts identisch ist.
14. **Wetterstation:** Temperaturen speichern und den kältesten und wärmsten Tag ermitteln.
15. **CSV-Parser:** Eine einzelne CSV-Zeile an den Kommas trennen und in einen Vektor aufteilen.
16. **Wort-Anagramm-Tester:** Zwei Wörter in Zeichen-Vektoren zerlegen, sortieren und vergleichen.
17. **Log-Dateien-Filter:** Eine Liste von Log-Einträgen durchsuchen und nur "ERROR"-Einträge filtern.
18. **Römische Zahlen:** Einen Vektor als Nachschlagetabelle für römische Schriftzeichen nutzen.
19. **Musik-Playlist:** Lieder in einem Vektor verwalten, abspielen und mischen.
20. **Teilnehmer-Gruppierer:** Eine Liste von Personen zufällig in Zweierteams aufteilen.
21. **Vokabeltrainer:** Ein Vektor von Tupeln `(Deutsch, Englisch)` für ein einfaches Quiz nutzen.
22. **Sitzplatzreservierung:** Einen Vektor von Booleans nutzen, um freie und belegte Kinositze anzuzeigen.
23. **Börsenkurs-Analysator:** Kurshistorie analysieren und den maximalen Gewinn (Kauf- und Verkaufszeitpunkt) finden.
24. **Run-Length-Encoding (RLE):** Zeichenfolgen komprimieren (z. B. `['A', 'A', 'B']` zu `[('A', 2), ('B', 1)]`).
25. **Matrix-Transponierung:** Ein 2D-Gitter (Vektor von Vektoren) an der Diagonale spiegeln.
26. **Morsecode-Übersetzer:** Text in einen Vektor aus Morse-Zeichen (`.`, `-`) übersetzen.
27. **Zahlen-Sortierer:** Einen benutzerdefinierten Sortieralgorithmus (z. B. Bubble Sort) auf einem Vektor implementieren.
28. **Wegfinder-Tracker:** Die Koordinaten eines zurückgelegten Pfades als Vektor von Structs speichern.
29. **Text-Zeilen-Formatierer:** Einen langen String in einen Vektor von Zeilen mit maximal 80 Zeichen aufteilen.
30. **Einfacher Compiler-Tokenizer:** Quellcode-Text in eine Liste von Token (Schlüsselwörter, Zahlen, Operatoren) zerlegen.
31. **Bild-Pixel-Graustufen:** Ein Bild als Vektor von Helligkeitswerten repräsentieren und invertieren.
32. **Inventar-System:** Gegenstände in einem Rollenspiel-Inventar hinzufügen, entfernen und stapeln.
33. **Wahlkabinen-Simulator:** Stimmen für verschiedene Kandidaten zählen und den Sieger ermitteln.
34. **Einfacher Chat-Verlauf:** Die letzten 50 Nachrichten in einem Vektor speichern und alte Einträge löschen.
35. **Kommandozeilen-History:** Die vom Benutzer eingegebenen Befehle speichern und durchsuchbar machen.
36. **Frequenzanalyse:** Die Häufigkeit von Buchstaben in einem Text ermitteln und sortiert ausgeben.
37. **Dateiendungs-Filter:** Eine Liste von Dateinamen nach bestimmten Endungen (z. B. `.txt`) filtern.
38. **Rucksack-Problem:** Eine Liste von Gegenständen filtern, um den maximalen Wert bei begrenztem Gewicht zu finden.
39. **Taschenrechner-Verlauf:** Mathematische Gleichungen und Ergebnisse in einem Verlauf-Vektor speichern.
40. **Bruchrechner-Sammlung:** Brüche als Structs in einem Vektor speichern und alle addieren.
41. **Social-Media-Feed:** Posts in einem Vektor verwalten und nach "Likes" sortieren.
42. **Sudoku-Validierer:** Prüfen, ob ein Vektor mit 9 Zahlen die Sudoku-Regeln (1-9 ohne Duplikate) erfüllt.
43. **Netzwerk-Paket-Buffer:** Eingehende Datenpakete zwischenspeichern und der Reihe nach verarbeiten.
44. **Paketdienst-Routenplaner:** Adressen-Vektor nach der geografischen Nähe sortieren.
45. **Text-Diff-Viewer:** Zwei Listen von Textzeilen vergleichen und Abweichungen anzeigen.
46. **Münzwechsler:** Einen Vektor von verfügbaren Münzen nutzen, um Wechselgeld optimal aufzuteilen.
47. **Auto-Vervollständigung:** Eine Liste von Wörtern filtern, die mit den vom Benutzer eingegebenen Buchstaben beginnen.
48. **Rezept-Skalierer:** Zutatenmengen in einer Liste proportional für eine andere Personenanzahl umrechnen.
49. **Turnierbaum-Generator:** Paarungen für ein K.-o.-System aus einer Liste von Spielern erstellen.
50. **Verzeichnisstruktur-Flachleger:** Alle Dateien aus verschachtelten Ordnern in einer flachen Liste sammeln.

---

## 💡 Zusammenfassung

- **Dynamische Größe:** Im Gegensatz zu Arrays können Vektoren (`Vec<T>`) zur Laufzeit wachsen und schrumpfen.
- **Speicheraufteilung:** Die Metadaten (Pointer, Length, Capacity) liegen auf dem Stack, während die eigentlichen Daten hintereinander auf dem Heap liegen.
- **Reallozierung:** Wenn die Kapazität erschöpft ist, reserviert Rust automatisch einen neuen, größeren Speicherbereich auf dem Heap und kopiert die Daten dorthin.
- **Ownership:** Vektoren besitzen ihre Elemente. Wird der Vektor gelöscht, werden alle Elemente ebenfalls gelöscht (Drop).
- **Sicherer Zugriff:** Indexierung mit `[]` kann bei ungültigen Indizes zum Absturz (`Panic`) führen. Nutze `.get()` für einen sicheren Zugriff, der eine `Option` zurückgibt.
- **Iterator-Sicherheit:** Der Borrow Checker verhindert zur Compilezeit, dass ein Vektor verändert wird, während man über ihn iteriert (Iterator-Invalidierung).

---

## 📚 Links

- [Offizielle Rust-Dokumentation für `Vec`](https://doc.rust-lang.org/std/vec/struct.Vec.html)
- [Kapitel 8.1 im offiziellen Rust-Buch: Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html)
- [Rust by Example: Vectors](https://doc.rust-lang.org/rust-by-example/std/vec.html)
