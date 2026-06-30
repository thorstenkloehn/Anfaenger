# Konzepte statt Syntax lernen

Oft ist es am Anfang hilfreicher, die **Idee** hinter einer Technik zu verstehen, als sich sofort Code-Zeilen zu merken. In Phase 1 dreht sich alles um diese Kern-Konzepte:

## 🧱 Variablen & Datentypen (Zahlen, Texte, Mutabilität)
- **Konzept:** Stell dir Variablen wie Kisten vor, in denen du Dinge (Daten) aufbewahrst. 
- **In Rust wichtig:** Standardmäßig sind diese Kisten "abgeschlossen" (immutable) – du kannst den Inhalt nicht mehr ändern, sobald er einmal drin ist. Willst du den Inhalt später austauschen können, musst du beim Erstellen der Kiste ausdrücklich sagen, dass sie veränderbar sein soll (mit dem Wort `mut`).

## 🔀 Kontrollfluss (if/else, loop, while, for)
- **Konzept:** Kontrollfluss ist wie ein Wegweiser oder eine Ampel für dein Programm. Ohne ihn würde das Programm einfach nur stur von oben nach unten durchlaufen.
- **In Rust wichtig:** 
  - `if/else` sind Abzweigungen ("Wenn das Wetter schön ist, geh raus, ansonsten bleib drinnen").
  - Schleifen (`loop`, `while`, `for`) sagen dem Programm, dass es etwas immer wieder tun soll, bis eine bestimmte Bedingung erfüllt ist (z. B. "Lies Eingaben, bis der Nutzer 'Ende' eintippt").

## ⌨️ Benutzereingabe (Lesen von der Konsole, Konvertierung)
- **Konzept:** Ein Programm ist nur interaktiv, wenn es auf uns reagiert.
- **In Rust wichtig:** Alles, was wir über die Tastatur in die Konsole eingeben, versteht der Computer zuerst nur als simplen Text – selbst wenn wir eine `5` tippen. Wenn wir mit dieser `5` rechnen wollen, müssen wir den eingegebenen Text ausdrücklich in eine echte Zahl umwandeln ("parsen" oder konvertieren).

## 🧠 Ownership & Borrowing (Wer besitzt was? Referenzen nutzen)
- **Konzept:** Das ist die wichtigste Besonderheit in Rust und funktioniert wie im echten Leben (z. B. mit einem Buch).
- **In Rust wichtig:** 
  - **Ownership:** Wenn du ein Buch kaufst, gehört es dir. Wenn du es jemand anderem dauerhaft gibst, hast du es nicht mehr (Besitzerwechsel / Move).
  - **Borrowing (Ausleihen):** Statt das Buch für immer wegzugeben, kannst du es verleihen (Referenz `&`). Andere dürfen es dann lesen. Wenn du es ausdrücklich erlaubst, dürfen sie sogar Notizen hineinschreiben (veränderbare Referenz `&mut`). Aber am Ende gehört das Buch immer noch dir.

## 📝 String vs. &str (Texte speichern, vergleichen, ausgeben)
- **Konzept:** In Rust unterscheidet man sehr genau, wie und wo Texte im Speicher aufbewahrt werden.
- **In Rust wichtig:** 
  - Ein `String` ist wie ein eigener Notizblock. Du bist der Besitzer, du kannst jederzeit neue Seiten hinzufügen, Text dranhängen oder wegradieren (er ist veränderbar und wächst bei Bedarf).
  - Ein `&str` (sprich "String Slice") ist wie ein ausgedruckter Satz in einem Buch. Du schaust nur darauf (Referenz). Du kannst ihn lesen, aber du kannst keine Wörter einfach so austauschen oder den Text länger machen, da er feststeht.
