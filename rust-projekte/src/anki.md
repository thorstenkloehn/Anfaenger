# 📇 Anki – Dein Lernkartei-System

Die effektivste Methode gegen das Vergessen ist das Wiederholen von Lerninhalten in immer größer werdenden Zeitabständen (Spaced Repetition) – idealerweise kurz bevor das Gehirn die Information wieder löscht. In diesem Kapitel lernst du, wie du Anki einrichtest und nutzt, um deine Rust-Kenntnisse langfristig im Gedächtnis zu behalten.

## 🧠 Theorie

### Was ist Spaced Repetition?
Beim Lernen neuer Programmiersprachen stoßen wir oft auf das Problem, dass wir Syntax und Konzepte nach wenigen Tagen wieder vergessen, wenn wir sie nicht täglich anwenden. Spaced Repetition löst dieses Problem: Das System zeigt dir Karteikarten genau in dem Moment, in dem du kurz davor bist, sie zu vergessen. Beantwortest du eine karte richtig, vergrößert sich der zeitliche Abstand bis zur nächsten Abfrage. Beantwortest du sie falsch, wird der Abstand verkürzt.

### Wie schreibt man gute Karteikarten?
Für das Programmieren gelten besondere Regeln beim Erstellen von Karteikarten:
* **Keine riesigen Codeblöcke:** Versuche nicht, ganze Programme auf eine Karte zu packen.
* **Das Atomaritätsprinzip:** Jede Karte sollte nur eine einzige, präzise Frage und eine kurze Antwort enthalten.
* **Aktive Rekonstruktion:** Formuliere Fragen so, dass du die Antwort aktiv aus dem Gedächtnis abrufen musst, anstatt sie nur wiederzuerkennen.

*Beispiel:*
* **Schlecht:** „Schreibe ein Programm, das Benutzereingaben einliest, in eine Zahl parst und ausgibt.“
* **Gut:** „Wie liest man eine Zeile von der Standardeingabe in einen String namens `input` ein?“ -> `io::stdin().read_line(&mut input)`

### Die vorgefertigten Rust-Lernkarten importieren
Im Projektverzeichnis findest du bereits eine Datei namens `rust_anki_karten.csv` mit den wichtigsten Grundlagen. Um diese in Anki zu importieren, gehe wie folgt vor:
1. Öffne **Anki**.
2. Klicke unten auf **Datei importieren** (Import File).
3. Wähle die Datei `rust_anki_karten.csv` aus.
4. **Wichtig:** Da die Datei mit Semikolons (`;`) strukturiert ist, stelle sicher, dass in den Import-Optionen das Trennzeichen auf **Semikolon** eingestellt ist.
5. Weise die Spalten den Feldern „Vorderseite“ (Frage) und „Rückseite“ (Antwort) zu.
6. Importiere die Karten in einen neuen Stapel (z. B. „Rust-Grundlagen“).

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Hier sind Übungen, mit denen du dein eigenes Karteikartensystem aufbaust und erweiterst:

1. **Die erste eigene Karte erstellen:**
   Formuliere eine karteikarte zu einem Thema aus Phase 1, das dir anfangs schwergefallen ist (z. B. der Unterschied zwischen `String` und `&str`).
   *Hinweis:* Überlege, wie du den Unterschied in einem einzigen Satz oder einer kurzen Codezeile auf den Punkt bringen kannst.

2. **Das Importieren üben:**
   Importiere die Datei `rust_anki_karten.csv` in Anki und mache deine erste Lern-Session mit mindestens 10 Karten.

3. **Karten-Refactoring:**
   Nimm eine komplexe Programmieraufgabe aus Phase 1 und zerlege sie in 5 kleine, atomare Fragen für dein Karteikartensystem.

---

## 🚀 50 Karteikarten-Ideen für Rust-Grundlagen

Nutze diese Liste als Inspiration, um deine eigenen Karteikarten in Anki anzulegen. Versuche, die Antworten selbstständig zu formulieren und in Anki einzupflegen:

### Variablen & Datentypen
1. Welches Schlüsselwort deklariert eine unveränderbare Variable? (Hinweis: Standard in Rust)
2. Wie macht man eine Variable explizit veränderbar? (Hinweis: Zusatzschlüsselwort)
3. Welcher Ganzzahltyp ist der Standard in Rust? (Hinweis: 32-Bit)
4. Welcher Datentyp speichert vorzeichenlose 8-Bit-Ganzzahlen?
5. Wie deklariert man eine Konstante? (Hinweis: Benötigt Typannotation)
6. Was unterscheidet eine Konstante von einer unveränderbaren Variable?
7. Welcher Datentyp repräsentiert einen Wahrheitswert?
8. Welches Zeichen leitet einen Zeichen-Datentyp (Char) ein? (Hinweis: Einfache vs. doppelte Anführungszeichen)
9. Wie gibt man den Typ einer Variable explizit an (Typannotation)?
10. Was versteht man unter Typinferenz?

### Kontrollfluss
11. Benötigen Bedingungen in `if`-Statements in Rust runde Klammern?
12. Wie gibt man einen Wert aus einem `if-else`-Block zurück?
13. Mit welchem Schlüsselwort erstellst du eine dauerhafte Endlosschleife?
14. Wie bricht man aus einer Schleife aus und gibt gleichzeitig einen Wert zurück?
15. Wie springt man zum nächsten Schleifendurchlauf?
16. Wie sieht eine Schleife aus, die eine bestimmte Anzahl von Wiederholungen läuft? (Hinweis: Range-Syntax)
17. Wie schließt man die Endgrenze bei einer Range-Schleife mit ein? (Hinweis: `=`)
18. Welches Konstrukt wird in Rust anstelle eines klassischen `switch` verwendet?
19. Was passiert, wenn in einem `match`-Block nicht alle Fälle abgedeckt sind?
20. Welches Symbol dient als „Auffang-Muster“ (default/wildcard) in einem `match`?

### Benutzereingabe & Konvertierung
21. Welche Bibliothek muss importiert werden, um Eingaben zu verarbeiten?
22. Mit welcher Funktion liest man Zeilen aus dem Standard-Input?
23. Warum muss man beim Einlesen eine veränderbare Referenz übergeben?
24. Welcher Typ wird von `read_line` zurückgegeben? (Hinweis: Ergebnis-Typ)
25. Wie entfernt man Whitespaces und Zeilenumbrüche am Ende eines Strings?
26. Welche Methode konvertiert einen String in einen anderen Typ?
27. Was bewirkt die Methode `.expect("Meldung")`?
28. Wie fängt man Fehler beim Parsen ab, ohne dass das Programm abstürzt? (Hinweis: `match` auf Result)
29. Was ist der Unterschied zwischen `unwrap()` und `expect()`?
30. Wie wandelt man eine Zahl in einen String um?

### Ownership & Borrowing
31. Wie viele Besitzer (Owner) kann ein Wert in Rust zur gleichen Zeit haben?
32. Was passiert mit einem Wert, wenn sein Besitzer den Scope verlässt?
33. Welcher Begriff beschreibt das Übergeben eines Werts, wodurch der alte Besitzer ihn nicht mehr nutzen kann? (Hinweis: Move)
34. Wie übergibt man einen Wert als Referenz, ohne das Ownership abzugeben? (Hinweis: Borrowing)
35. Welches Symbol kennzeichnet eine Referenz?
36. Wie viele unveränderbare Referenzen darf es gleichzeitig auf einen Wert geben?
37. Wie viele veränderbare Referenzen darf es gleichzeitig auf einen Wert geben?
38. Darf eine veränderbare Referenz neben unveränderbaren Referenzen existieren?
39. Was versteht man unter einer „Dangling Reference“ und verhindert Rust diese?
40. Welcher Teil des Compilers prüft die Gültigkeit von Referenzen? (Hinweis: Borrow Checker)

### Strings & Textverarbeitung
41. Welcher String-Typ besitzt seinen Inhalt und ist dynamisch veränderbar?
42. Welcher String-Typ ist ein unveränderlicher Verweis auf Textdaten (String Slice)?
43. Wie erstellt man einen neuen, leeren `String`?
44. Wie konvertiert man ein String-Literal (`&str`) in einen `String`?
45. Mit welcher Methode hängt man ein einzelnes Zeichen an einen `String` an?
46. Mit welcher Methode hängt einen kompletten Text-Slice an einen `String` an?
47. Sind Strings in Rust standardmäßig UTF-8-kodiert?
48. Wie ermittelt man die Länge eines Strings in Bytes?
49. Warum ist direkter Index-Zugriff auf Zeichen eines Strings in Rust nicht ohne Weiteres erlaubt?
50. Wie durchläuft man die einzelnen Zeichen (Unicode-Skalarwerte) eines Strings?

---

## 💡 Zusammenfassung

* **Spaced Repetition** hilft dir, Syntax dauerhaft zu verinnerlichen, anstatt sie ständig nachschlagen zu müssen.
* Halte deine Karten **einfach und atomar** – eine Frage, eine klare Antwort.
* Nutze die beiliegende Datei `rust_anki_karten.csv`, um direkt mit einem soliden Grundstock an Karten durchzustarten.
* **Regelmäßigkeit ist der Schlüssel:** Lieber jeden Tag 5 Minuten lernen als einmal pro Woche eine Stunde.

---

## 📚 Links

* [Offizielle Anki-Webseite](https://apps.ankiweb.net/)
* [AnkiWeb (Karten online synchronisieren)](https://ankiweb.net/)
* [Flatpak-Installation für Anki](https://flathub.org/apps/net.ankiweb.Anki)
* [Spaced Repetition Lernmethode auf Wikipedia](https://de.wikipedia.org/wiki/Spaced_repetition)
