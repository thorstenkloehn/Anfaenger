# 100 Projekte – Modulare Workflows (Phase 1)

In diesem Kapitel findest du **100 Miniprojekte für Einsteiger**. Jedes dieser Projekte ist so konzipiert, dass es alle fünf Kernbereiche der Phase 1 gleichzeitig abdeckt. 

Das Ziel ist das **passive Auffrischen**: Du schreibst den Code nicht selbst und schreibst ihn auch nicht ab. Stattdessen nutzt du deine KI (z. B. Antigravity) als interaktiven Coding-Partner. Du führst die KI Schritt für Schritt durch das Projekt und liest, verstehst und hinterfragst jede Codezeile, die sie für dich generiert.

---

### Die 5 Säulen in jedem Projekt
Jedes der folgenden Projekte kombiniert diese fünf Grundlagen:
* 🧱 **Variablen & Datentypen**: Zahlen, Texte, Mutabilität (`let mut`)
* 🔀 **Kontrollfluss**: Schleifen (`loop`, `while`, `for`) und Verzweigungen (`if`/`else`)
* ⌨️ **Benutzereingabe**: Konsolen-Eingaben einlesen und in andere Typen konvertieren (`parse`)
* 🧠 **Ownership & Borrowing**: Referenzen (`&` / `&mut`) nutzen und Werte übergeben
* 📝 **String vs. &str**: Dynamischen Speicher (`String`) vergleichen mit statischen Literalen (`&str`)

---

### Das Modulare Prinzip: Vom Monster-Workflow zum Präzisions-Workflow

Ein häufiger Fehler bei der Arbeit mit einer KI ist der **Monster-Prompt**:
> *"Schreibe ein Programm, das eine Zahl einliest, prüft ob sie eine Primzahl ist, das in einer Schleife wiederholt und mir am Ende anzeigt, wie viele Primzahlen ich eingegeben habe."*

**Warum das scheitert:** Die KI spuckt sofort 50 Zeilen fertigen Code aus. Du kopierst ihn, verstehst die Hälfte nicht, und wenn ein Fehler auftritt, bist du verloren.

**Die Lösung: Präzisions-Workflows.** Wir teilen jedes Projekt in 3 logische Module auf:
1. **Datenbasis & Struktur (Modul 1)**: Legt Variablen und statische Werte an.
2. **Interaktivität & Konvertierung (Modul 2)**: Fügt Benutzereingaben hinzu.
3. **Logik & Kontrollfluss (Modul 3)**: Integriert Schleifen und Verzweigungen.

---

## Der 100-Projekte-Workflow-Katalog

---

### Projekt 1: Begrüßungs-Simulator
* **Ziel:** Den Namen des Benutzers einlesen und prüfen, ob er mit einem vordefinierten Namen übereinstimmt.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Erstelle ein minimales Rust-Programm mit einer `main`-Funktion. Definiere darin einen statischen Namen als `&str`. Gib einen Begrüßungstext aus."
     * *KI-Aktion:* Initialisiert das Projekt und erklärt den Unterschied zwischen einem statischen `&str` und dynamischen Variablen.
  2. **Prompt 2 (Eingabe):** „Erweitere das Programm: Lies den Namen des Benutzers von der Konsole in einen veränderbaren `String` ein. Nutze dafür eine Referenz (`&mut`)."
     * *KI-Aktion:* Importiert `std::io` und nutzt `read_line`, um Eingaben im Speicher-Puffer zu sichern.
  3. **Prompt 3 (Logik):** „Entferne Leerzeichen mit `.trim()`. Vergleiche die Eingabe mit dem statischen Namen per `if/else` und gib eine passende Meldung aus."
     * *KI-Aktion:* Implementiert den String-Vergleich und die Ausgabe.

---

### Projekt 2: Zahlen-Addierer bis zum Limit
* **Ziel:** Der Nutzer gibt eine Obergrenze ein, und das Programm addiert alle Zahlen von 1 bis zu dieser Grenze.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere eine veränderbare Variable `summe` und weise ihr den Startwert `0` zu."
     * *KI-Aktion:* Erstellt die veränderliche Variable für das Endergebnis.
  2. **Prompt 2 (Eingabe):** „Lies das Limit als `String` vom Benutzer ein und konvertiere es in eine Ganzzahl (`i32`). Fange Fehler ab, falls keine Zahl eingegeben wurde."
     * *KI-Aktion:* Fügt `parse()` hinzu und nutzt Fehlerbehandlung mit `expect` oder `match`.
  3. **Prompt 3 (Schleife):** „Nutze eine `for`-Schleife von 1 bis zum eingegebenen Limit, um die Zahlen aufzuaddieren und gib das Ergebnis aus."
     * *KI-Aktion:* Baut die Schleife und gibt die Summe aus.

---

### Projekt 3: Passwort-Tresor
* **Ziel:** Ein Passwort abfragen und bei Falscheingabe in einer Schleife erneut nachfragen.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere ein geheimes Master-Passwort als statischen Text (`&str`)."
     * *KI-Aktion:* Legt das Passwort im Speicher an.
  2. **Prompt 2 (Schleife & Eingabe):** „Erstelle eine `loop`-Schleife. Frage in der Schleife den Benutzer nach dem Passwort und lies es in einen veränderbaren `String` ein."
     * *KI-Aktion:* Erstellt eine Endlosschleife und liest die Konsoleneingabe ein.
  3. **Prompt 3 (Logik & Abbruch):** „Bereinige die Eingabe mit `.trim()`. Wenn die Eingabe mit dem Master-Passwort übereinstimmt, gib eine Erfolgsmeldung aus und brich die Schleife mit `break` ab."
     * *KI-Aktion:* Vergleicht den String-Slice und bricht die Schleife bei Erfolg.

---

### Projekt 4: Celsius-Fahrenheit-Rechner
* **Ziel:** Eine Celsius-Temperatur einlesen, umrechnen und bewerten (z. B. Warnung bei Hitze).
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Erstelle eine funktionale Umrechnung von Celsius zu Fahrenheit. Sie soll einen `f64`-Wert als Parameter annehmen."
     * *KI-Aktion:* Definiert die Funktion und zeigt, wie Parameter per Wert oder Referenz übergeben werden.
  2. **Prompt 2 (Eingabe):** „Frage den Benutzer nach einer Temperatur in Celsius, lies sie ein und parse sie in ein `f64`."
     * *KI-Aktion:* Setzt die Eingabe und Konvertierung um.
  3. **Prompt 3 (Berechnung & If):** „Rechne den Wert mit deiner Funktion um. Nutze ein `if/else`, um bei über 30°C Celsius eine Hitzewarnung auszugeben."
     * *KI-Aktion:* Ruft die Funktion auf und verzweigt die Ausgabe.

---

### Projekt 5: Noten-Durchschnitt
* **Ziel:** Noten eingeben, in einem veränderbaren Vektor speichern und den Schnitt ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Erstelle eine leere, veränderbare Liste (Vektor) für Fließkommazahlen (`f64`)."
     * *KI-Aktion:* Legt einen veränderbaren `Vec<f64>` an.
  2. **Prompt 2 (Schleife):** „Lies in einer `while`-Schleife Noten vom Benutzer ein. Wenn der Benutzer 'fertig' eingibt, soll die Schleife enden. Sonst konvertiere die Eingabe in `f64` und füge sie der Liste hinzu."
     * *KI-Aktion:* Baut die Schleife und fügt Validierungen hinzu.
  3. **Prompt 3 (Berechnung):** „Berechne den Durchschnitt aller Noten in der Liste mit einer Schleife und gib ihn aus. Nutze Referenzen, um die Liste nicht zu konsumieren."
     * *KI-Aktion:* Berechnet die Summe über Referenzen (`&vec`) und gibt den Durchschnitt aus.

---

### Projekt 6: Zähler mit Abbruchwort
* **Ziel:** Ein Programm, das kontinuierlich von 1 an hochzählt, bis der Benutzer das Wort „stop" eingibt.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere eine veränderbare Ganzzahl, die bei 1 startet."
     * *KI-Aktion:* Legt den Zähler an.
  2. **Prompt 2 (Schleife & Eingabe):** „Erstelle eine Schleife. In jedem Durchlauf soll der Benutzer gefragt werden, ob er weitermachen will. Lies die Antwort ein."
     * *KI-Aktion:* Baut die Schleife und liest die Eingabe ein.
  3. **Prompt 3 (Logik):** „Wenn die Eingabe 'stop' ist, brich ab. Ansonsten erhöhe den Zähler um 1 und gib den aktuellen Stand aus."
     * *KI-Aktion:* Implementiert den Abbruch und die Inkrementierung.

---

### Projekt 7: Wortlängen-Prüfer
* **Ziel:** Ein Wort einlesen und prüfen, ob es länger als ein vorgegebenes Limit ist.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere eine unveränderbare Zahl für die maximale Wortlänge."
     * *KI-Aktion:* Legt das Limit fest.
  2. **Prompt 2 (Eingabe):** „Lies ein Wort vom Benutzer ein und entferne Leerzeichen am Rand."
     * *KI-Aktion:* Holt den String von stdin und trimmt ihn.
  3. **Prompt 3 (Logik):** „Bestimme die Länge des Worts unter Nutzung von Borrowing. Nutze ein `if/else`, um auszugeben, ob das Wort zu lang ist."
     * *KI-Aktion:* Ermittelt die Länge (`.len()`) und prüft sie gegen das Limit.

---

### Projekt 8: Alters-Klassifizierer
* **Ziel:** Das Alter einlesen und prüfen, ob die Person volljährig ist oder nicht.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere das Volljährigkeitsalter als statische Konstante."
     * *KI-Aktion:* Erstellt eine Konstante (`const VOLLJAEHRIG: i32 = 18;`).
  2. **Prompt 2 (Eingabe):** „Lies das Alter ein und konvertiere es in eine Ganzzahl. Behandle ungültige Zeichen."
     * *KI-Aktion:* Setzt `parse::<i32>()` mit Fehlerprüfung um.
  3. **Prompt 3 (Vergleich):** „Vergleiche das Alter mit der Konstanten. Gib aus, ob die Person volljährig ist."
     * *KI-Aktion:* Implementiert die Verzweigung.

---

### Projekt 9: Einfacher Taschenrechner
* **Ziel:** Zwei Zahlen und einen Operator einlesen und das Ergebnis ausrechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies zwei Zahlen (`f64`) nacheinander vom Benutzer ein."
     * *KI-Aktion:* Legt zwei Eingabeblöcke und Parses an.
  2. **Prompt 2 (Operator-Eingabe):** „Lies ein einzelnes Zeichen als Operator (`+`, `-`, `*`, `/`) ein."
     * *KI-Aktion:* Holt das Operator-Zeichen als `&str` oder `char`.
  3. **Prompt 3 (Match-Logik):** „Nutze ein `match`-Statement, um die entsprechende Berechnung durchzuführen. Gib das Ergebnis aus."
     * *KI-Aktion:* Führt die Operation aus und gibt das Ergebnis aus.

---

### Projekt 10: Interaktives FizzBuzz
* **Ziel:** Der Nutzer gibt eine Start- und Endzahl ein, und das Programm führt FizzBuzz aus.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies eine Startzahl und eine Endzahl vom Benutzer ein und konvertiere sie in `i32`."
     * *KI-Aktion:* Liest beide Grenzwerte ein.
  2. **Prompt 2 (Schleife):** „Erstelle eine Schleife, die von der Startzahl bis zur Endzahl läuft."
     * *KI-Aktion:* Baut die Schleife über die Range.
  3. **Prompt 3 (Logik):** „Prüfe in der Schleife: Ist die Zahl durch 3 teilbar (Ausgabe 'Fizz'), durch 5 ('Buzz') oder durch beide ('FizzBuzz')."
     * *KI-Aktion:* Implementiert die Modulo-Prüfungen.

---

### Projekt 11: Kilometer-Meilen-Rechner
* **Ziel:** Kilometer eingeben, in Meilen umrechnen und mit Referenzen arbeiten.
* **Modulare Prompts:**
  1. **Prompt 1 (Umrechnungsfunktion):** „Erstelle eine Funktion `km_zu_meilen`, die eine Referenz auf ein `f64` (Kilometer) nimmt und die Meilen zurückgibt."
     * *KI-Aktion:* Definiert die Funktion mit Borrowing.
  2. **Prompt 2 (Eingabe):** „Lies eine Distanz in Kilometern ein und parse sie."
     * *KI-Aktion:* Handhabt die Eingabe.
  3. **Prompt 3 (Logik):** „Rufe die Funktion mit einer Referenz auf den eingegebenen Wert auf und gib das Ergebnis aus."
     * *KI-Aktion:* Führt die Berechnung aus und gibt das Resultat aus.

---

### Projekt 12: Dynamische Einkaufsliste (Vom Benutzer gefüllt)
* **Ziel:** Artikel eingeben und an eine Liste anhängen, bis "fertig" eingegeben wird.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Erstelle einen leeren Vektor für Strings."
     * *KI-Aktion:* Deklariert einen veränderbaren `Vec<String>`.
  2. **Prompt 2 (Schleife & Eingabe):** „Schreibe eine Schleife, die Artikelnamen einliest und in der Liste speichert. Übergib das Ownership des Strings an den Vektor."
     * *KI-Aktion:* Verschiebt den eingelesenen String mittels `push` in den Vektor.
  3. **Prompt 3 (Ausgabe):** „Gib nach der Schleife alle Artikel mit einer `for`-Schleife und unter Nutzung von Referenzen aus."
     * *KI-Aktion:* Iteriert über den Vektor mit `&vektor`.

---

### Projekt 13: Countdown mit Startwert
* **Ziel:** Benutzer gibt Startwert ein, das Programm zählt rückwärts bis 0.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen ganzzahligen Startwert vom Benutzer ein."
     * *KI-Aktion:* Holt den Wert und parst ihn.
  2. **Prompt 2 (Schleife):** „Erstelle eine Schleife, die rückwärts von der Startzahl bis 0 zählt."
     * *KI-Aktion:* Nutze `for i in (0..=startzahl).rev()`.
  3. **Prompt 3 (Ausgabe):** „Gib jede Zahl aus und am Ende den Text 'Liftoff!'."
     * *KI-Aktion:* Formatiert die Ausgaben.

---

### Projekt 14: Währungsumrechner (EUR -> USD)
* **Ziel:** Eurobetrag einlesen und mit einem veränderbaren Wechselkurs umrechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere den Wechselkurs als veränderbare Fließkommazahl."
     * *KI-Aktion:* Deklariert `let mut kurs = 1.09;`.
  2. **Prompt 2 (Eingabe):** „Lies den Eurobetrag vom Benutzer ein und parse ihn in ein `f64`."
     * *KI-Aktion:* Führt die Eingabe aus.
  3. **Prompt 3 (Logik):** „Berechne den Dollarwert und gib ihn aus. Nutze ein `if/else`, um bei Beträgen über 1000 Dollar eine Warnung auszugeben."
     * *KI-Aktion:* Berechnet das Produkt und verzweigt die Ausgabe.

---

### Projekt 15: Vokal-Zähler
* **Ziel:** Einen Text einlesen und zählen, wie viele Vokale darin enthalten sind.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen beliebigen Text vom Benutzer ein."
     * *KI-Aktion:* Erstellt den Eingabe-Puffer.
  2. **Prompt 2 (Schleife):** „Iteriere über die Zeichen des Texts und prüfe für jedes Zeichen, ob es ein Vokal (a, e, i, o, u) ist."
     * *KI-Aktion:* Iteriert über `.chars()` und vergleicht sie.
  3. **Prompt 3 (Zähler):** „Erhöhe bei jedem Vokal einen veränderbaren Zähler und gib das Endergebnis aus."
     * *KI-Aktion:* Addiert die Treffer und gibt die Summe aus.

---

### Projekt 16: Gehaltserhöhungs-Rechner
* **Ziel:** Aktuelles Gehalt und Prozentsatz einlesen, neues Gehalt berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das aktuelle Gehalt und den gewünschten Prozentsatz als Fließkommazahlen ein."
     * *KI-Aktion:* Liest zwei Werte ein und parst sie.
  2. **Prompt 2 (Berechnung):** „Erstelle eine Funktion, die das neue Gehalt berechnet, indem sie Referenzen auf Gehalt und Prozent nutzt."
     * *KI-Aktion:* Erstellt die Berechnungsfunktion.
  3. **Prompt 3 (Ausgabe):** „Rufe die Funktion auf und gib das neue Gehalt formatiert aus."
     * *KI-Aktion:* Gibt den berechneten Wert aus.

---

### Projekt 17: BMI-Rechner
* **Ziel:** Gewicht und Größe abfragen, BMI berechnen und klassifizieren.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies Körpergröße (in Metern, z. B. 1.80) und Gewicht (in kg) als `f64` ein."
     * *KI-Aktion:* Führt die Eingaben durch.
  2. **Prompt 2 (Berechnung):** „Berechne den BMI (Gewicht / (Größe * Größe)) in einer eigenen Funktion."
     * *KI-Aktion:* Erstellt die mathematische Hilfsfunktion.
  3. **Prompt 3 (Logik):** „Nutze ein `if/else`-Konstrukt, um den BMI in Untergewicht, Normalgewicht oder Übergewicht einzuteilen."
     * *KI-Aktion:* Klassifiziert das Ergebnis und gibt es aus.

---

### Projekt 18: Schaltjahr-Prüfer
* **Ziel:** Ein Jahr eingeben und prüfen, ob es ein Schaltjahr ist.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Kalenderjahr als Ganzzahl (`i32`) vom Benutzer ein."
     * *KI-Aktion:* Parst das eingegebene Jahr.
  2. **Prompt 2 (Logik):** „Schreibe eine Bedingung: Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist, aber nicht durch 100, es sei denn, es ist auch durch 400 teilbar."
     * *KI-Aktion:* Setzt die Modulo-Bedingungen um.
  3. **Prompt 3 (Ausgabe):** „Gib aus, ob es sich um ein Schaltjahr handelt oder nicht."
     * *KI-Aktion:* Verzweigt die Ausgabe.

---

### Projekt 19: Passwort-Stärkemesser
* **Ziel:** Ein Passwort einlesen und die Stärke anhand von Kriterien bewerten.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Passwort als `String` ein."
     * *KI-Aktion:* Holt das Passwort.
  2. **Prompt 2 (Kriterien):** „Prüfe zwei Kriterien: Hat das Passwort mindestens 8 Zeichen und enthält es eine Zahl?"
     * *KI-Aktion:* Analysiert die Länge und prüft mit `.any(char::is_numeric)`.
  3. **Prompt 3 (Klassifizierung):** „Gib per `if/else` aus, ob das Passwort 'stark', 'mittel' oder 'schwach' ist."
     * *KI-Aktion:* Gibt die Bewertung aus.

---

### Projekt 20: Rabatt-Kalkulator
* **Ziel:** Preis und Gutscheincode einlesen, Rabatt anwenden.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Grundpreis als `f64` und einen Gutscheincode als `String` ein."
     * *KI-Aktion:* Liest Preis und Code ein.
  2. **Prompt 2 (Vergleich):** „Vergleiche den Gutscheincode mit einem statischen Gutschein (`&str`, z. B. 'SAVE10')."
     * *KI-Aktion:* Führt den String-Vergleich durch.
  3. **Prompt 3 (Berechnung):** „Wenn der Code übereinstimmt, ziehe 10% ab. Gib den finalen Preis aus."
     * *KI-Aktion:* Führt die Rabattierung durch und gibt den Endpreis aus.

---

### Projekt 21: Text-Umkehrer
* **Ziel:** Einen Text einlesen und ihn spiegelverkehrt ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Text vom Benutzer in einen `String` ein."
     * *KI-Aktion:* Sichert die Benutzereingabe.
  2. **Prompt 2 (Verarbeitung):** „Kehre die Reihenfolge der Zeichen des Strings um. Nutze dafür die Iteratoren."
     * *KI-Aktion:* Nutzt `.chars().rev().collect::<String>()`.
  3. **Prompt 3 (Ausgabe):** „Gib den umgekehrten Text aus und erkläre, wie Ownership beim Erstellen des neuen Strings funktioniert."
     * *KI-Aktion:* Gibt den gespiegelten Text aus und erläutert die Speicherallokation.

---

### Projekt 22: Kreisflächen-Berechner
* **Ziel:** Radius einlesen und Fläche berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere den Wert Pi als Konstante in deinem Programm."
     * *KI-Aktion:* Legt die Konstante `PI` fest (oder nutzt `std::f64::consts::PI`).
  2. **Prompt 2 (Eingabe):** „Lies den Radius als `f64` ein."
     * *KI-Aktion:* Parst den Radius.
  3. **Prompt 3 (Berechnung):** „Berechne die Fläche (Pi * Radius * Radius) und gib sie aus."
     * *KI-Aktion:* Berechnet und formatiert die Ausgabe.

---

### Projekt 23: Sekundenzähler
* **Ziel:** Minuten einlesen und in Sekunden umwandeln.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies eine Minutenanzahl als Ganzzahl ein."
     * *KI-Aktion:* Holt den Minutenwert.
  2. **Prompt 2 (Berechnung):** „Multipliziere die Minuten mit 60 in einer Funktion `minuten_zu_sekunden`."
     * *KI-Aktion:* Definiert die Berechnungsfunktion.
  3. **Prompt 3 (Ausgabe):** „Rufe die Funktion auf und gib das Ergebnis aus."
     * *KI-Aktion:* Zeigt das Endergebnis.

---

### Projekt 24: Ticketpreis-Rechner
* **Ziel:** Alter eingeben und Ticketpreis ermitteln.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Alter des Benutzers ein."
     * *KI-Aktion:* Parst das Alter.
  2. **Prompt 2 (Logik):** „Nutze eine `if/else`-Struktur: Kinder unter 6 Jahren zahlen 0€, Jugendliche unter 18 Jahren zahlen 5€, Erwachsene zahlen 10€."
     * *KI-Aktion:* Weist den Preis basierend auf dem Alter zu.
  3. **Prompt 3 (Ausgabe):** „Gib den berechneten Ticketpreis aus."
     * *KI-Aktion:* Zeigt den Preis auf der Konsole an.

---

### Projekt 25: Zufallszahlen-Vergleicher
* **Ziel:** Eine eingegebene Zahl mit einer festen geheimen Zahl vergleichen.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere eine geheime Zahl als unveränderliche Ganzzahl."
     * *KI-Aktion:* Initialisiert das Geheimnis.
  2. **Prompt 2 (Eingabe):** „Lies einen Tipp vom Benutzer ein und parse ihn."
     * *KI-Aktion:* Parst die Eingabe.
  3. **Prompt 3 (Vergleich):** „Gib aus, ob der Tipp 'zu hoch', 'zu niedrig' oder 'korrekt' ist."
     * *KI-Aktion:* Führt die drei Vergleiche per `if/else` aus.

---

### Projekt 26: Wochentag-Finder
* **Ziel:** Eine Zahl von 1 bis 7 eingeben und den Wochentag als Text ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies eine Zahl von 1 bis 7 ein."
     * *KI-Aktion:* Parst den Wochentag-Index.
  2. **Prompt 2 (Logik):** „Nutze ein `match`-Statement, um der Zahl den Wochentag als `&str` zuzuweisen."
     * *KI-Aktion:* Erstellt den `match`-Block.
  3. **Prompt 3 (Ausgabe):** „Gib den Namen des Wochentages aus. Fange ungültige Zahlen aus."
     * *KI-Aktion:* Behandelt den Standardfall im `match` (`_ => "Ungültiger Tag"`) und gibt ihn aus.

---

### Projekt 27: Stromkosten-Schätzer
* **Ziel:** Verbrauch und Preis pro kWh abfragen, Jahreskosten berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies den monatlichen Verbrauch in kWh und den Preis pro kWh als Fließkommazahlen ein."
     * *KI-Aktion:* Liest beide Werte ein.
  2. **Prompt 2 (Berechnung):** „Berechne die jährlichen Kosten (Monatsverbrauch * 12 * Preis)."
     * *KI-Aktion:* Führt die Multiplikation aus.
  3. **Prompt 3 (Ausgabe):** „Gib die geschätzten Jahreskosten aus."
     * *KI-Aktion:* Formatiert das Ergebnis als Währungsbetrag.

---

### Projekt 28: Benzinverbrauch-Rechner
* **Ziel:** Strecke und getanktes Benzin einlesen, Durchschnittsverbrauch berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die gefahrene Strecke (km) und das getankte Benzin (Liter) als `f64` ein."
     * *KI-Aktion:* Holt Strecke und Liter.
  2. **Prompt 2 (Berechnung):** „Berechne den Verbrauch pro 100 km (Liter * 100 / Strecke)."
     * *KI-Aktion:* Führt die mathematische Operation durch.
  3. **Prompt 3 (Ausgabe):** „Gib den Durchschnittsverbrauch aus."
     * *KI-Aktion:* Zeigt das Ergebnis an.

---

### Projekt 29: Wort-Wiederholer
* **Ziel:** Ein Wort und eine Zahl einlesen und das Wort entsprechend oft ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Wort (`String`) und eine Anzahl (`i32`) vom Benutzer ein."
     * *KI-Aktion:* Holt das Wort und die Anzahl.
  2. **Prompt 2 (Schleife):** „Schreibe eine `for`-Schleife, die so oft durchläuft, wie die Anzahl vorgibt."
     * *KI-Aktion:* Erstellt den Schleifenkopf.
  3. **Prompt 3 (Ausgabe):** „Gib in jedem Durchlauf das Wort aus. Nutze eine Referenz auf das Wort."
     * *KI-Aktion:* Druckt das Wort unter Verwendung von `&wort`.

---

### Projekt 30: Quadratzahlen-Generator
* **Ziel:** Ein Limit eingeben und alle Quadratzahlen bis zu diesem Limit ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Limit als Ganzzahl vom Benutzer ein."
     * *KI-Aktion:* Holt das Limit.
  2. **Prompt 2 (Schleife):** „Schreibe eine `while`-Schleife, die bei 1 startet."
     * *KI-Aktion:* Baut das Schleifengerüst.
  3. **Prompt 3 (Berechnung & Abbruch):** „Berechne das Quadrat der aktuellen Zahl. Wenn das Quadrat größer als das Limit ist, brich ab. Sonst gib es aus und erhöhe die Zahl."
     * *KI-Aktion:* Implementiert die Abbruchbedingung.

---

### Projekt 31: Temperatur-Warnung
* **Ziel:** Aktuelle Temperatur einlesen und bei Frost oder Hitze warnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Temperatur als `f64` ein."
     * *KI-Aktion:* Parst den Wert.
  2. **Prompt 2 (Bedingungen):** „Prüfe: Ist der Wert kleiner als 0 (Ausgabe 'Frost!'), über 30 ('Hitze!') oder dazwischen ('Mild!')."
     * *KI-Aktion:* Schreibt die `if`/`else if`/`else`-Kette.
  3. **Prompt 3 (Ausgabe):** „Gib die entsprechende Warnung aus."
     * *KI-Aktion:* Zeigt die Meldung an.

---

### Projekt 32: Dreiecks-Typ-Bestimmer
* **Ziel:** Drei Seitenlängen einlesen und den Typ des Dreiecks bestimmen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies drei Seitenlängen (A, B, C) als `f64` vom Benutzer ein."
     * *KI-Aktion:* Holt alle drei Seitenlängen.
  2. **Prompt 2 (Bedingung):** „Prüfe: Sind alle drei Seiten gleich lang (gleichseitig), zwei gleich lang (gleichschenklig) oder alle verschieden (unregelmäßig)?"
     * *KI-Aktion:* Implementiert die Vergleiche.
  3. **Prompt 3 (Ausgabe):** „Gib den Dreieckstyp aus."
     * *KI-Aktion:* Druckt das Ergebnis.

---

### Projekt 33: Zeichen-Zähler
* **Ziel:** Einen Text und einen Suchbuchstaben einlesen, Häufigkeit ermitteln.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Text und ein einzelnes Suchzeichen (`char`) ein."
     * *KI-Aktion:* Parst den Text und das Zeichen.
  2. **Prompt 2 (Schleife):** „Iteriere über den Text und vergleiche jedes Zeichen mit dem Suchzeichen."
     * *KI-Aktion:* Vergleicht die Zeichen in einer Schleife.
  3. **Prompt 3 (Ergebnis):** „Zähle die Vorkommen und gib die Summe aus."
     * *KI-Aktion:* Gibt die Gesamtzahl aus.

---

### Projekt 34: Mehrwertsteuer-Rechner
* **Ziel:** Nettopreis und Steuersatz einlesen, Bruttobetrag berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies den Nettopreis (`f64`) und den Steuersatz (z.B. 19 für 19%) ein."
     * *KI-Aktion:* Parst Preis und Steuersatz.
  2. **Prompt 2 (Berechnung):** „Berechne die Steuer und den Bruttobetrag."
     * *KI-Aktion:* Berechnet Steuer und Summe.
  3. **Prompt 3 (Ausgabe):** „Gib Steuerbetrag und Bruttobetrag formatiert aus."
     * *KI-Aktion:* Zeigt die Beträge an.

---

### Projekt 35: Trinkgeld-Rechner
* **Ziel:** Rechnungsbetrag und Zufriedenheit (1-3) einlesen, Trinkgeld vorschlagen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies den Rechnungsbetrag (`f64`) und den Service-Level (1 = Schlecht, 2 = Gut, 3 = Ausgezeichnet) ein."
     * *KI-Aktion:* Holt Betrag und Service-Level.
  2. **Prompt 2 (Logik):** „Nutze ein `match` auf den Service-Level, um den Trinkgeldsatz festzulegen (1 = 0%, 2 = 10%, 3 = 20%)."
     * *KI-Aktion:* Setzt den Prozentsatz.
  3. **Prompt 3 (Ausgabe):** „Berechne das Trinkgeld und die Gesamtsumme und gib beides aus."
     * *KI-Aktion:* Führt die Berechnung durch.

---

### Projekt 36: Passwort-Bestätigung
* **Ziel:** Passwort zweimal abfragen und auf Gleichheit prüfen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe 1):** „Frage den Benutzer nach einem Passwort und lies es ein."
     * *KI-Aktion:* Holt das erste Passwort.
  2. **Prompt 2 (Eingabe 2):** „Frage nach der Bestätigung und lies diese in eine zweite Variable ein."
     * *KI-Aktion:* Holt das zweite Passwort.
  3. **Prompt 3 (Vergleich):** „Vergleiche beide gekürzten Strings mit `.trim()` und gib aus, ob sie übereinstimmen."
     * *KI-Aktion:* Vergleicht beide Werte und meldet das Ergebnis.

---

### Projekt 37: Simuliertes Würfelspiel
* **Ziel:** Eine simulierte Augenzahl abfragen und bewerten.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Frage den Benutzer nach seiner gewürfelten Zahl (1-6) und lies sie ein."
     * *KI-Aktion:* Holt die Zahl.
  2. **Prompt 2 (Logik):** „Nutze ein `match`-Statement: Bei 6 gib 'Gewonnen!', bei 1-5 'Erneut versuchen!' aus."
     * *KI-Aktion:* Bildet das Match.
  3. **Prompt 3 (Ausgabe):** „Fange ungültige Zahlen außerhalb von 1-6 ab und gib eine Fehlermeldung aus."
     * *KI-Aktion:* Handhabt den Wildcard-Fall (`_`).

---

### Projekt 38: Alter in Tagen
* **Ziel:** Alter in Jahren einlesen und in Tage umrechnen (Schaltjahre vernachlässigt).
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Alter in Jahren als Ganzzahl ein."
     * *KI-Aktion:* Holt das Alter.
  2. **Prompt 2 (Berechnung):** „Multipliziere das Alter mit 365 in einer separaten Funktion, die eine Referenz nutzt."
     * *KI-Aktion:* Erstellt die Berechnungsfunktion.
  3. **Prompt 3 (Ausgabe):** „Gib das Alter in Tagen aus."
     * *KI-Aktion:* Zeigt das Endergebnis an.

---

### Projekt 39: Noten-Feedback
* **Ziel:** Schulnote (1-6) einlesen und Text-Feedback ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies eine Schulnote (1-6) als Ganzzahl ein."
     * *KI-Aktion:* Holt die Note.
  2. **Prompt 2 (Match):** „Nutze ein `match`-Statement, um ein Text-Feedback (z.B. 1 -> 'Sehr gut', 6 -> 'Ungenügend') zuzuweisen."
     * *KI-Aktion:* Erstellt das Match auf die Zahlen 1 bis 6.
  3. **Prompt 3 (Ausgabe):** „Gib das Feedback aus. Gib bei anderen Eingaben eine Fehlermeldung aus."
     * *KI-Aktion:* Gibt den Text aus.

---

### Projekt 40: Kilometer-Schritte-Konverter
* **Ziel:** Schritte einlesen und geschätzte Distanz berechnen (Schrittlänge = 0.75m).
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Anzahl der Schritte vom Benutzer als Ganzzahl ein."
     * *KI-Aktion:* Holt die Schrittanzahl.
  2. **Prompt 2 (Berechnung):** „Multipliziere die Schritte mit 0.75, um die Meter zu erhalten, und rechne sie in Kilometer um."
     * *KI-Aktion:* Führt die Multiplikation und Division durch.
  3. **Prompt 3 (Ausgabe):** „Gib die Distanz in Kilometern aus."
     * *KI-Aktion:* Zeigt das Ergebnis an.

---

### Projekt 41: Wort-Ersetzer
* **Ziel:** Einen Satz, ein zu ersetzendes Wort und das neue Wort abfragen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Satz, das Zielwort und das Ersatzwort vom Benutzer ein."
     * *KI-Aktion:* Holt alle drei Strings.
  2. **Prompt 2 (Logik):** „Nutze die String-Methode `.replace()`, um das Wort im Satz auszutauschen."
     * *KI-Aktion:* Erstellt den neuen String mit den Ersetzungen.
  3. **Prompt 3 (Ausgabe):** „Gib den modifizierten Satz aus."
     * *KI-Aktion:* Zeigt den geänderten Satz an.

---

### Projekt 42: Rechtecks-Umfang
* **Ziel:** Länge und Breite einlesen, Umfang ermitteln.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies Länge und Breite des Rechtecks als `f64` ein."
     * *KI-Aktion:* Holt Länge und Breite.
  2. **Prompt 2 (Berechnung):** „Berechne den Umfang (2 * (Länge + Breite)) in einer Funktion."
     * *KI-Aktion:* Erstellt die Berechnungsfunktion.
  3. **Prompt 3 (Ausgabe):** „Gib den Umfang aus."
     * *KI-Aktion:* Zeigt das Ergebnis an.

---

### Projekt 43: Multiplikationstabelle
* **Ziel:** Eine Zahl einlesen und ihre Multiplikationstabelle (1 bis 10) ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies eine Ganzzahl vom Benutzer ein."
     * *KI-Aktion:* Holt die Zahl.
  2. **Prompt 2 (Schleife):** „Erstelle eine `for`-Schleife von 1 bis 10."
     * *KI-Aktion:* Baut die Schleife auf.
  3. **Prompt 3 (Ausgabe):** „Gib in jedem Durchlauf die Rechnung (i * Zahl = Ergebnis) aus."
     * *KI-Aktion:* Berechnet das Produkt und gibt die Zeile aus.

---

### Projekt 44: Sparziel-Rechner
* **Ziel:** Monatliche Rate und Sparziel einlesen, Dauer berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Sparziel und die monatliche Sparrate als Fließkommazahlen ein."
     * *KI-Aktion:* Holt Ziel und Rate.
  2. **Prompt 2 (Schleife):** „Berechne in einer `while`-Schleife, wie viele Monate benötigt werden, um das Ziel zu erreichen."
     * *KI-Aktion:* Erhöht die Monate, bis das Guthaben das Ziel erreicht.
  3. **Prompt 3 (Ausgabe):** „Gib die benötigten Monate aus."
     * *KI-Aktion:* Zeigt die berechnete Dauer an.

---

### Projekt 45: Text-Kürzer
* **Ziel:** Einen Text einlesen und bei einer maximalen Länge abschneiden.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Text und ein Längenlimit als Ganzzahl ein."
     * *KI-Aktion:* Holt Text und Limit.
  2. **Prompt 2 (Logik):** „Prüfe mit `if/else`, ob der Text länger als das Limit ist. Wenn ja, kürze ihn auf das Limit und hänge '...' an."
     * *KI-Aktion:* Schneidet den String ab (z.B. mittels `.chars().take()`).
  3. **Prompt 3 (Ausgabe):** „Gib den gekürzten oder originalen Text aus."
     * *KI-Aktion:* Zeigt das Resultat.

---

### Projekt 46: Altersgruppen-Kategorisierer
* **Ziel:** Das Alter einlesen und einer Lebensphase zuordnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Alter als Ganzzahl ein."
     * *KI-Aktion:* Holt das Alter.
  2. **Prompt 2 (Logik):** „Kategorisiere das Alter per `if/else`: 0-12 (Kind), 13-17 (Teenager), 18-64 (Erwachsen), 65+ (Senioren)."
     * *KI-Aktion:* Bestimmt die Kategorie.
  3. **Prompt 3 (Ausgabe):** „Gib die Alterskategorie als Text aus."
     * *KI-Aktion:* Druckt die Lebensphase.

---

### Projekt 47: Sekunden-zu-Minuten-Konverter
* **Ziel:** Sekunden einlesen und in Minuten und Restsekunden aufteilen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies eine Anzahl an Sekunden als Ganzzahl ein."
     * *KI-Aktion:* Holt die Sekunden.
  2. **Prompt 2 (Berechnung):** „Berechne die Minuten mittels Ganzzahldivision (`/ 60`) und den Rest mittels Modulo (`% 60`)."
     * *KI-Aktion:* Führt Division und Modulo aus.
  3. **Prompt 3 (Ausgabe):** „Gib das Ergebnis im Format 'X Minuten und Y Sekunden' aus."
     * *KI-Aktion:* Formatiert die Ausgabe.

---

### Projekt 48: Einfacher Login-Simulator
* **Ziel:** Benutzername und Passwort abfragen und abgleichen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Benutzernamen und ein Passwort vom Benutzer ein."
     * *KI-Aktion:* Holt beide Strings.
  2. **Prompt 2 (Vergleich):** „Vergleiche beide mit festen Werten im Code (z.B. 'admin' und 'secret')."
     * *KI-Aktion:* Führt die Vergleiche durch.
  3. **Prompt 3 (Ausgabe):** „Gib aus, ob der Login erfolgreich war."
     * *KI-Aktion:* Zeigt den Status an.

---

### Projekt 49: Fahrtzeit-Rechner
* **Ziel:** Distanz und Geschwindigkeit abfragen, Dauer berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Distanz (km) und die Geschwindigkeit (km/h) als `f64` ein."
     * *KI-Aktion:* Holt Distanz und Tempo.
  2. **Prompt 2 (Berechnung):** „Berechne die Fahrtzeit (Distanz / Geschwindigkeit)."
     * *KI-Aktion:* Teilt Distanz durch Tempo.
  3. **Prompt 3 (Ausgabe):** „Gib die Fahrtzeit in Stunden aus."
     * *KI-Aktion:* Formatiert die Ausgabe.

---

### Projekt 50: Kalorienbedarf-Messer
* **Ziel:** Gewicht und Aktivitätslevel einlesen, Kalorien schätzen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Gewicht (kg) und den Aktivitätsfaktor (1 = sitzend, 2 = aktiv) ein."
     * *KI-Aktion:* Holt Gewicht und Faktor.
  2. **Prompt 2 (Berechnung):** „Multipliziere das Gewicht mit 30 bei Faktor 1, bzw. mit 35 bei Faktor 2."
     * *KI-Aktion:* Berechnet den geschätzten Bedarf.
  3. **Prompt 3 (Ausgabe):** „Gib den täglichen Kalorienbedarf aus."
     * *KI-Aktion:* Zeigt die Kalorienzahl an.

---

### Projekt 51: Rabatt-Staffel
* **Ziel:** Bestellmenge abfragen, gestaffelten Rabatt anwenden.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Anzahl der bestellten Artikel als Ganzzahl ein."
     * *KI-Aktion:* Holt die Bestellmenge.
  2. **Prompt 2 (Logik):** „Bestimme den Rabatt per `if/else`: ab 10 Stück 5%, ab 50 Stück 10%, ab 100 Stück 15%."
     * *KI-Aktion:* Setzt den Rabattsatz.
  3. **Prompt 3 (Ausgabe):** „Gib den angewendeten Rabattsatz aus."
     * *KI-Aktion:* Druckt das Ergebnis.

---

### Projekt 52: Wort-Verkettung
* **Ziel:** Zwei Wörter einlesen und zu einem Satz zusammenfügen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies zwei Wörter nacheinander vom Benutzer ein."
     * *KI-Aktion:* Sichert beide Wörter in getrennten Variablen.
  2. **Prompt 2 (Logik):** „Verkette die beiden Wörter mit einem Leerzeichen dazwischen."
     * *KI-Aktion:* Nutzt `format!` oder String-Konkatenation.
  3. **Prompt 3 (Ausgabe):** „Gib das Ergebnis aus und erkläre die Speicherallokation."
     * *KI-Aktion:* Gibt den Satz aus und erläutert Ownership.

---

### Projekt 53: Quadratwurzel-Rechner
* **Ziel:** Zahl einlesen, Quadratwurzel berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies eine positive Zahl als `f64` ein."
     * *KI-Aktion:* Parst die Zahl.
  2. **Prompt 2 (Berechnung):** „Berechne die Quadratwurzel mit `.sqrt()`. Fange negative Zahlen ab."
     * *KI-Aktion:* Prüft auf Negativität und berechnet die Wurzel.
  3. **Prompt 3 (Ausgabe):** „Gib die berechnete Wurzel aus."
     * *KI-Aktion:* Zeigt das Ergebnis an.

---

### Projekt 54: Wasserbedarf-Rechner
* **Ziel:** Körpergewicht einlesen, täglichen Wasserbedarf schätzen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Körpergewicht in kg ein."
     * *KI-Aktion:* Parst das Gewicht.
  2. **Prompt 2 (Berechnung):** „Berechne den Bedarf (Gewicht * 0.03 Liter)."
     * *KI-Aktion:* Multipliziert das Gewicht mit 0.03.
  3. **Prompt 3 (Ausgabe):** „Gib die empfohlene Trinkmenge in Litern aus."
     * *KI-Aktion:* Formatiert die Ausgabe.

---

### Projekt 55: Buchseiten-Zähler
* **Ziel:** Gelesene und Gesamtseiten vergleichen, prozentualen Fortschritt anzeigen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Gesamtseiten und die bereits gelesenen Seiten als Ganzzahlen ein."
     * *KI-Aktion:* Holt beide Werte.
  2. **Prompt 2 (Berechnung):** „Berechne den Fortschritt in Prozent (gelesen * 100 / gesamt) als Fließkommazahl."
     * *KI-Aktion:* Konvertiert zu `f64` und führt die Division aus.
  3. **Prompt 3 (Ausgabe):** „Gib den Fortschritt aus."
     * *KI-Aktion:* Zeigt den Prozentsatz an.

---

### Projekt 56: Kaffeebestell-System
* **Ziel:** Kaffeegröße abfragen und Preis berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Kaffeegröße (S, M, L) vom Benutzer ein."
     * *KI-Aktion:* Sichert die Größe.
  2. **Prompt 2 (Logik):** „Nutze ein `match`-Statement, um den Preis zuzuweisen (S = 2.00, M = 3.00, L = 4.00)."
     * *KI-Aktion:* Ordnet den Preisen die Größen zu.
  3. **Prompt 3 (Ausgabe):** „Gib den Preis aus. Behandle ungültige Größen."
     * *KI-Aktion:* Fängt falsche Eingaben im `match` ab und gibt den Preis aus.

---

### Projekt 57: Text-Längen-Klassifizierer
* **Ziel:** Einen Text einlesen und bewerten, ob er kurz, mittel oder lang ist.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Text vom Benutzer ein."
     * *KI-Aktion:* Holt den String.
  2. **Prompt 2 (Logik):** „Ermittle die Länge. Nutze `if/else`: unter 10 Zeichen (kurz), 10-50 (mittel), über 50 (lang)."
     * *KI-Aktion:* Klassifiziert die String-Länge.
  3. **Prompt 3 (Ausgabe):** „Gib die Klassifizierung aus."
     * *KI-Aktion:* Druckt die Bewertung.

---

### Projekt 58: Prozentrechner
* **Ziel:** Anteil und Gesamtwert einlesen, Prozentsatz berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies den Teilwert und den Gesamtwert als `f64` ein."
     * *KI-Aktion:* Parst beide Werte.
  2. **Prompt 2 (Berechnung):** „Berechne den Prozentsatz (Teilwert * 100 / Gesamtwert) in einer Funktion."
     * *KI-Aktion:* Definiert die Berechnungsfunktion.
  3. **Prompt 3 (Ausgabe):** „Rufe die Funktion auf und gib das Ergebnis aus."
     * *KI-Aktion:* Zeigt den Prozentsatz an.

---

### Projekt 59: Bestands-Prüfer
* **Ziel:** Lagerbestand einlesen und bei Unterbestand warnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies den aktuellen Lagerbestand als Ganzzahl ein."
     * *KI-Aktion:* Holt den Bestand.
  2. **Prompt 2 (Logik):** „Prüfe per `if/else`: Ist der Bestand 0 (Ausgabe 'Ausverkauft!'), unter 5 ('Nachbestellen!') oder ausreichend."
     * *KI-Aktion:* Verzweigt nach Bestandsgrenzen.
  3. **Prompt 3 (Ausgabe):** „Gib den Status aus."
     * *KI-Aktion:* Zeigt die Meldung an.

---

### Projekt 60: Punktzahl-zu-Prozent
* **Ziel:** Erreichte und maximale Punktzahl abfragen, Prozentsatz berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die erreichte Punktzahl und die maximale Punktzahl als `f64` ein."
     * *KI-Aktion:* Parst beide Punktzahlen.
  2. **Prompt 2 (Berechnung):** „Berechne das Verhältnis und wandle es in Prozent um."
     * *KI-Aktion:* Führt die Prozentrechnung aus.
  3. **Prompt 3 (Ausgabe):** „Gib das Ergebnis aus und fange Division durch Null ab."
     * *KI-Aktion:* Validiert die maximale Punktzahl vor der Division.

---

### Projekt 61: Einfaches Quiz
* **Ziel:** Dem Benutzer eine Frage stellen, Antwort abgleichen.
* **Modulare Prompts:**
  1. **Prompt 1 (Frage):** „Gib eine Quizfrage auf der Konsole aus."
     * *KI-Aktion:* Druckt die Frage.
  2. **Prompt 2 (Eingabe):** „Lies die Antwort des Benutzers ein."
     * *KI-Aktion:* Holt die Antwort als String.
  3. **Prompt 3 (Vergleich):** „Vergleiche die Antwort mit der korrekten Lösung (ignoriere Groß-/Kleinschreibung) und gib aus, ob sie stimmt."
     * *KI-Aktion:* Trimmt, wandelt in Kleinbuchstaben um und vergleicht.

---

### Projekt 62: Stundenlohn-Rechner
* **Ziel:** Arbeitsstunden und Stundenlohn einlesen, Gesamtverdienst berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die gearbeiteten Stunden und den Stundenlohn als `f64` ein."
     * *KI-Aktion:* Holt Stunden und Lohn.
  2. **Prompt 2 (Berechnung):** „Berechne den Gesamtverdienst. Ziehe 15% Steuern ab, falls der Verdienst über 450€ liegt."
     * *KI-Aktion:* Berechnet den Verdienst und wendet Steuerlogik an.
  3. **Prompt 3 (Ausgabe):** „Gib den Nettoverdienst aus."
     * *KI-Aktion:* Zeigt das Endergebnis an.

---

### Projekt 63: Zeichenketten-Präfix
* **Ziel:** Prüfen, ob ein eingegebenes Wort mit einem bestimmten Buchstaben beginnt.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Wort vom Benutzer ein."
     * *KI-Aktion:* Holt das Wort.
  2. **Prompt 2 (Prüfung):** „Prüfe, ob das Wort mit dem Zeichen 'R' (oder einem beliebigen anderen statischen Zeichen) beginnt."
     * *KI-Aktion:* Nutzt die String-Methode `.starts_with()`.
  3. **Prompt 3 (Ausgabe):** „Gib aus, ob die Bedingung zutrifft."
     * *KI-Aktion:* Zeigt die Bestätigung oder Verneinung an.

---

### Projekt 64: Notenpunkte-Rechner
* **Ziel:** Oberstufenpunkte (0-15) in klassische Noten (1-6) übersetzen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Notenpunkte (0-15) als Ganzzahl ein."
     * *KI-Aktion:* Parst die Punkte.
  2. **Prompt 2 (Match):** „Nutze ein `match`-Statement, um die Punkte den klassischen Schulnoten (15-13 -> 1, 12-10 -> 2, usw.) zuzuordnen."
     * *KI-Aktion:* Erstellt den `match`-Block mit Ranges (z.B. `13..=15 => 1`).
  3. **Prompt 3 (Ausgabe):** „Gib die klassische Note aus und behandle Fehler."
     * *KI-Aktion:* Zeigt das Ergebnis an und fängt Werte außerhalb von 0-15 ab.

---

### Projekt 65: Schrittzähler-Analyse
* **Ziel:** Schritte einlesen und bewerten, ob das Tagesziel erreicht wurde.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die gegangenen Schritte vom Benutzer ein."
     * *KI-Aktion:* Holt die Schritte.
  2. **Prompt 2 (Logik):** „Definiere ein Tagesziel (z.B. 10.000 Schritte) und vergleiche die Schritte per `if/else`."
     * *KI-Aktion:* Führt den Vergleich durch.
  3. **Prompt 3 (Ausgabe):** „Gib aus, wie viele Schritte noch fehlen oder ob das Ziel erreicht wurde."
     * *KI-Aktion:* Berechnet die Differenz und gibt sie aus.

---

### Projekt 66: Text-Sucher
* **Ziel:** Prüfen, ob ein bestimmtes Wort in einem eingegebenen Satz enthalten ist.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Satz und ein Suchwort vom Benutzer ein."
     * *KI-Aktion:* Holt beide Strings.
  2. **Prompt 2 (Suche):** „Nutze die Methode `.contains()`, um zu prüfen, ob das Wort im Satz vorkommt."
     * *KI-Aktion:* Sucht nach dem Substring.
  3. **Prompt 3 (Ausgabe):** „Gib das Ergebnis aus."
     * *KI-Aktion:* Zeigt an, ob das Wort gefunden wurde.

---

### Projekt 67: Strompreis-Vergleich
* **Ziel:** Daten zweier Stromtarife einlesen und den günstigeren ermitteln.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies Grundpreis und Arbeitspreis pro kWh für zwei verschiedene Stromtarife als `f64` ein."
     * *KI-Aktion:* Holt die Daten für Tarif A und Tarif B.
  2. **Prompt 2 (Berechnung):** „Berechne die Kosten für einen angenommenen Jahresverbrauch von 3500 kWh."
     * *KI-Aktion:* Berechnet die Jahressummen.
  3. **Prompt 3 (Ausgabe):** „Vergleiche die Ergebnisse und gib aus, welcher Tarif günstiger ist."
     * *KI-Aktion:* Führt den Vergleich durch und gibt den Gewinner aus.

---

### Projekt 68: Datenvolumen-Rechner
* **Ziel:** Verbrauchtes Datenvolumen abfragen und Restvolumen anzeigen.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere das monatliche Inklusivvolumen (z.B. 10.0 GB) als Fließkommazahl."
     * *KI-Aktion:* Legt das Limit fest.
  2. **Prompt 2 (Eingabe):** „Lies das bereits verbrauchte Volumen in GB ein."
     * *KI-Aktion:* Holt die Eingabe.
  3. **Prompt 3 (Berechnung):** „Subtrahiere den Verbrauch vom Limit. Falls der Verbrauch das Limit überschreitet, gib eine Drosselungswarnung aus."
     * *KI-Aktion:* Führt die Subtraktion durch und verzweigt per `if/else`.

---

### Projekt 69: Zeichen-Entferner
* **Ziel:** Einen Text einlesen und alle Leerzeichen daraus entfernen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Text vom Benutzer ein."
     * *KI-Aktion:* Sichert die Eingabe.
  2. **Prompt 2 (Filterung):** „Filtere alle Leerzeichen aus dem String heraus."
     * *KI-Aktion:* Nutzt `.chars().filter(|c| !c.is_whitespace()).collect::<String>()`.
  3. **Prompt 3 (Ausgabe):** „Gib den bereinigten Text aus."
     * *KI-Aktion:* Zeigt das Endergebnis an.

---

### Projekt 70: Radius-zu-Umfang
* **Ziel:** Radius einlesen und Kreisumfang berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies den Radius als `f64` vom Benutzer ein."
     * *KI-Aktion:* Parst den Radius.
  2. **Prompt 2 (Berechnung):** „Berechne den Umfang (2 * Pi * Radius)."
     * *KI-Aktion:* Berechnet den Umfang.
  3. **Prompt 3 (Ausgabe):** „Gib das Ergebnis formatiert aus."
     * *KI-Aktion:* Zeigt den Umfang an.

---

### Projekt 71: Alters-Zukunftsrechner
* **Ziel:** Alter eingeben und berechnen, wie alt man in X Jahren sein wird.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das aktuelle Alter und die Anzahl der Zukunftsjahre ein."
     * *KI-Aktion:* Holt beide Ganzzahlen.
  2. **Prompt 2 (Berechnung):** „Addiere die Zukunftsjahre zum aktuellen Alter."
     * *KI-Aktion:* Führt die Addition durch.
  3. **Prompt 3 (Ausgabe):** „Gib den Zukunfts-Wert aus."
     * *KI-Aktion:* Zeigt das Ergebnis an.

---

### Projekt 72: Kinokarten-Kauf mit Mengenrabatt
* **Ziel:** Ticketanzahl einlesen, Gesamtpreis mit Rabatt berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Anzahl der Kinokarten vom Benutzer ein."
     * *KI-Aktion:* Parst die Ticketanzahl.
  2. **Prompt 2 (Berechnung):** „Ein Ticket kostet 10€. Ab 4 Tickets gibt es 15% Rabatt auf den Gesamtpreis."
     * *KI-Aktion:* Berechnet den Preis und wendet den Rabatt per `if/else` an.
  3. **Prompt 3 (Ausgabe):** „Gib den finalen Preis aus."
     * *KI-Aktion:* Zeigt den Gesamtpreis an.

---

### Projekt 73: Text-Verdoppler
* **Ziel:** Jedes Zeichen in einem eingelesenen Text verdoppeln.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Text vom Benutzer ein."
     * *KI-Aktion:* Holt den String.
  2. **Prompt 2 (Verarbeitung):** „Iteriere über jedes Zeichen des Worts und füge es doppelt in einen neuen String ein."
     * *KI-Aktion:* Baut den verdoppelten String auf (z.B. per `chars().map(...).collect()`).
  3. **Prompt 3 (Ausgabe):** „Gib den verdoppelten Text aus."
     * *KI-Aktion:* Zeigt das Endergebnis an.

---

### Projekt 74: Zinseszins-Rechner
* **Ziel:** Kapital, Zinssatz und Laufzeit einlesen, Endkapital berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Startkapital, den Zinssatz (in %) und die Laufzeit (in Jahren) ein."
     * *KI-Aktion:* Parst die drei Werte.
  2. **Prompt 2 (Schleife):** „Berechne in einer `for`-Schleife über die Jahre hinweg das jährliche Wachstum (Kapital = Kapital * (1 + Zins/100))."
     * *KI-Aktion:* Führt die Zinseszinsberechnung aus.
  3. **Prompt 3 (Ausgabe):** „Gib das Endkapital aus."
     * *KI-Aktion:* Zeigt das Ergebnis an.

---

### Projekt 75: Vornamen-Längenvergleicher
* **Ziel:** Zwei Vornamen abfragen und ermitteln, welcher länger ist.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies zwei Vornamen als `String` ein."
     * *KI-Aktion:* Holt beide Strings.
  2. **Prompt 2 (Längenvergleich):** „Vergleiche die Längen der getrimmten Strings."
     * *KI-Aktion:* Vergleicht die Zeichenanzahl per `.len()`.
  3. **Prompt 3 (Ausgabe):** „Gib aus, welcher Name länger ist oder ob sie gleich lang sind."
     * *KI-Aktion:* Verzweigt per `if/else`.

---

### Projekt 76: Passwort-Sicherheitsprüfer (Komplex)
* **Ziel:** Passwort einlesen und auf Länge, Zahlen und Sonderzeichen prüfen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Passwort vom Benutzer ein."
     * *KI-Aktion:* Holt das Passwort.
  2. **Prompt 2 (Prüfung):** „Prüfe drei Kriterien: Länge >= 8, enthält Zahl, enthält mindestens ein Sonderzeichen (z. B. `!`, `?`, `#`)."
     * *KI-Aktion:* Nutzt String-Iteratoren zur Überprüfung der Zeichenklassen.
  3. **Prompt 3 (Ausgabe):** „Gib aus, wie viele der Kriterien erfüllt wurden."
     * *KI-Aktion:* Zählt die erfüllten Kriterien und gibt das Feedback aus.

---

### Projekt 77: Haustier-Futter-Rechner
* **Ziel:** Gewicht des Tiers einlesen, Futterportion berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Gewicht eines Hundes in kg ein."
     * *KI-Aktion:* Parst das Gewicht.
  2. **Prompt 2 (Berechnung):** „Als Richtwert gilt: 2% des Körpergewichts pro Tag als Futtermenge."
     * *KI-Aktion:* Multipliziert das Gewicht mit 0.02.
  3. **Prompt 3 (Ausgabe):** „Gib die Futtermenge in Gramm aus."
     * *KI-Aktion:* Konvertiert kg in Gramm und gibt das Ergebnis aus.

---

### Projekt 78: Temperatur-Fühler (Zielwert)
* **Ziel:** Aktuelle Temperatur einlesen und mit Zielwert vergleichen.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere eine Zieltemperatur (z.B. 21.0°C) als Konstante."
     * *KI-Aktion:* Legt die Konstante fest.
  2. **Prompt 2 (Eingabe):** „Lies die aktuelle Temperatur ein."
     * *KI-Aktion:* Holt den Wert.
  3. **Prompt 3 (Logik):** „Wenn der Wert unter dem Ziel liegt, gib 'Heizen!' aus. Wenn er darüber liegt, gib 'Kühlen!' aus. Sonst 'Zieltemperatur erreicht!'."
     * *KI-Aktion:* Führt die Verzweigungen durch.

---

### Projekt 79: Wort-Mischmasch
* **Ziel:** Zwei Wörter abwechselnd Buchstabe für Buchstabe zusammensetzen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies zwei Wörter gleicher Länge vom Benutzer ein."
     * *KI-Aktion:* Holt beide Wörter.
  2. **Prompt 2 (Verarbeitung):** „Iteriere parallel über beide Wörter und füge abwechselnd ein Zeichen des ersten und ein Zeichen des zweiten Worts zusammen."
     * *KI-Aktion:* Nutzt `.chars()` und `zip()` für die Kombination.
  3. **Prompt 3 (Ausgabe):** „Gib das kombinierte Wort aus."
     * *KI-Aktion:* Zeigt den zusammengesetzten String an.

---

### Projekt 80: Benzinrechner für Reise
* **Ziel:** Strecke, Verbrauch und Spritpreis abfragen, Reisekosten berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die geplante Strecke (km), den Durchschnittsverbrauch (l/100km) und den Literpreis (€) ein."
     * *KI-Aktion:* Holt alle three Fließkommazahlen.
  2. **Prompt 2 (Berechnung):** „Berechne das benötigte Benzin und multipliziere es mit dem Literpreis."
     * *KI-Aktion:* Berechnet Benzinbedarf und Preis.
  3. **Prompt 3 (Ausgabe):** „Gib die berechneten Gesamtkosten der Fahrt aus."
     * *KI-Aktion:* Zeigt die Reisekosten an.

---

### Projekt 81: Rundenzeit-Stoppuhr (Simulation)
* **Ziel:** Rundenzeiten abfragen und Summe bilden.
* **Modulare Prompts:**
  1. **Prompt 1 (Schleife & Eingabe):** „Schreibe eine Schleife, die Rundenzeiten (Sekunden) als Fließkommazahl abfragt, bis der Benutzer 'stop' eingibt."
     * *KI-Aktion:* Baut die Eingabe-Schleife auf.
  2. **Prompt 2 (Berechnung):** „Addiere alle gültigen Rundenzeiten in einer veränderbaren Variable auf."
     * *KI-Aktion:* Berechnet die Gesamtlaufzeit.
  3. **Prompt 3 (Ausgabe):** „Gib die Gesamtzeit aller Runden aus."
     * *KI-Aktion:* Zeigt die Summe an.

---

### Projekt 82: Interaktiver Notenschnitt-Rechner
* **Ziel:** Beliebig viele Noten abfragen, bis der Benutzer '0' eingibt, Schnitt berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Schleife):** „Erstelle eine Schleife, die fortlaufend Noten (1-6) einliest."
     * *KI-Aktion:* Richtet das Schleifengerüst ein.
  2. **Prompt 2 (Berechnung):** „Speichere die Summe und die Anzahl der Noten. Bricht ab, wenn der Benutzer '0' eingibt."
     * *KI-Aktion:* Addiert die Noten und zählt die Durchläufe.
  3. **Prompt 3 (Ausgabe):** „Berechne nach dem Abbruch den Schnitt (Summe / Anzahl) und gib ihn aus."
     * *KI-Aktion:* Führt die Division aus und gibt den Schnitt aus.

---

### Projekt 83: Zeichenketten-Slicer
* **Ziel:** Wort einlesen, nur die ersten X Zeichen anzeigen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Wort und eine Zahl X vom Benutzer ein."
     * *KI-Aktion:* Holt Wort und Anzahl.
  2. **Prompt 2 (Slicing):** „Erstelle einen slice der ersten X Zeichen unter Verwendung von Referenzen."
     * *KI-Aktion:* Nutzt `.chars().take(X).collect::<String>()` zur Vermeidung von Panics bei UTF-8-Grenzen.
  3. **Prompt 3 (Ausgabe):** „Gib das gekürzte Wort aus."
     * *KI-Aktion:* Druckt das Ergebnis.

---

### Projekt 84: Kalorien-Sport-Rechner
* **Ziel:** Sportart und Dauer einlesen, verbrannte Kalorien berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Dauer (in Minuten) und die Sportart (Laufen, Radfahren) ein."
     * *KI-Aktion:* Holt Dauer und Sportart.
  2. **Prompt 2 (Logik):** „Nutze ein `match`: Laufen verbrennt 10 Kalorien/Min, Radfahren 7 Kalorien/Min."
     * *KI-Aktion:* Weist den Verbrennungswert zu.
  3. **Prompt 3 (Ausgabe):** „Berechne die verbrannten Gesamtkalorien und gib sie aus."
     * *KI-Aktion:* Führt die Multiplikation aus.

---

### Projekt 85: Einfacher Passwort-Generator
* **Ziel:** Länge einlesen, einfaches Pseudozufalls-Passwort generieren.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die gewünschte Passwortlänge als Ganzzahl ein."
     * *KI-Aktion:* Holt die Länge.
  2. **Prompt 2 (Schleife):** „Generiere ein Passwort, indem du in einer Schleife abwechselnd Buchstaben und Zahlen anreihst."
     * *KI-Aktion:* Baut den String in einer Schleife auf.
  3. **Prompt 3 (Ausgabe):** „Gib das generierte Passwort aus."
     * *KI-Aktion:* Zeigt das Passwort an.

---

### Projekt 86: Steuersatz-Ermittler
* **Ziel:** Einkommen abfragen, Steuersatz zuordnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Bruttoeinkommen als `f64` ein."
     * *KI-Aktion:* Holt das Einkommen.
  2. **Prompt 2 (Logik):** „Klassifiziere den Steuersatz per `if/else`: bis 10.000€ -> 0%, bis 50.000€ -> 20%, darüber -> 40%."
     * *KI-Aktion:* Bestimmt den Steuersatz.
  3. **Prompt 3 (Ausgabe):** „Gib den Steuersatz und den errechneten Steuerbetrag aus."
     * *KI-Aktion:* Berechnet die Steuer und gibt beide Werte aus.

---

### Projekt 87: Würfel-Simulator (Mehrfach)
* **Ziel:** Anzahl der Würfelwürfe einlesen, Würfe simulieren und Gesamtsumme berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Anzahl der Würfelwürfe vom Benutzer ein."
     * *KI-Aktion:* Holt die Wurfanzahl.
  2. **Prompt 2 (Schleife):** „Simuliere in einer Schleife die Würfe (nutze z. B. Modulo auf eine wachsende Zahl oder die Systemzeit, falls `rand` nicht geladen ist, um eine Zahl von 1-6 zu emulieren)."
     * *KI-Aktion:* Baut die Schleife auf und generiert Pseudo-Zufallszahlen.
  3. **Prompt 3 (Ausgabe):** „Addiere alle Ergebnisse und gib die Gesamtsumme aus."
     * *KI-Aktion:* Gibt die Summe aus.

---

### Projekt 88: Wort-Palindrom-Prüfer
* **Ziel:** Wort einlesen, prüfen ob es vorwärts und rückwärts gleich gelesen wird.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Wort vom Benutzer ein."
     * *KI-Aktion:* Holt das Wort.
  2. **Prompt 2 (Logik):** „Vergleiche das trim-bereinigte Wort mit seiner umgekehrten Variante unter Verwendung von Iteratoren."
     * *KI-Aktion:* Vergleicht den String mit dem reversierten String.
  3. **Prompt 3 (Ausgabe):** „Gib per `if/else` aus, ob es ein Palindrom ist."
     * *KI-Aktion:* Zeigt die Entscheidung an.

---

### Projekt 89: Alters-Klassiker (Erweitert)
* **Ziel:** Alter einlesen, detaillierte Kategorie bestimmen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies das Alter als Ganzzahl ein."
     * *KI-Aktion:* Parst das Alter.
  2. **Prompt 2 (Logik):** „Teile das Alter in folgende Phasen ein: Baby (0-2), Kind (3-12), Teenager (13-17), Erwachsener (18-64), Rentner (65+)."
     * *KI-Aktion:* Bestimmt die Phase.
  3. **Prompt 3 (Ausgabe):** „Gib die Lebensphase aus."
     * *KI-Aktion:* Druckt das Ergebnis.

---

### Projekt 90: Aggregatzustand von Wasser
* **Ziel:** Temperatur einlesen, Zustand ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies die Wassertemperatur in °C als Fließkommazahl ein."
     * *KI-Aktion:* Parst die Temperatur.
  2. **Prompt 2 (Logik):** „Nutze `if/else`: unter oder gleich 0°C -> fest (Eis), über 0°C und unter 100°C -> flüssig, ab 100°C -> gasförmig (Dampf)."
     * *KI-Aktion:* Weist den Zustand zu.
  3. **Prompt 3 (Ausgabe):** „Gib den Aggregatzustand aus."
     * *KI-Aktion:* Druckt den Zustand.

---

### Projekt 91: Mini-Einkaufsliste (Mit Löschfunktion)
* **Ziel:** Artikel hinzufügen oder den letzten Artikel entfernen.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Erstelle einen veränderbaren Vektor für Strings."
     * *KI-Aktion:* Initialisiert den Vektor.
  2. **Prompt 2 (Schleife):** „Lies in einer Schleife Aktionen ein: 'add [Artikel]' fügt einen Artikel hinzu, 'remove' löscht den letzten Artikel, 'exit' beendet das Programm."
     * *KI-Aktion:* Analysiert die Eingabebefehle (z. B. mit `starts_with` und `pop()`).
  3. **Prompt 3 (Ausgabe):** „Gib nach jeder Aktion den aktuellen Inhalt der Liste aus."
     * *KI-Aktion:* Druckt die Artikelliste über Referenzen.

---

### Projekt 92: Vokal-Ersetzer
* **Ziel:** Einen Text einlesen und alle Vokale durch 'x' ersetzen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Text vom Benutzer ein."
     * *KI-Aktion:* Holt den String.
  2. **Prompt 2 (Logik):** „Iteriere über jedes Zeichen. Wenn es ein Vokal ist, ersetze es durch 'x', andernfalls behalte das Zeichen bei."
     * *KI-Aktion:* Filtert/Mappt den String.
  3. **Prompt 3 (Ausgabe):** „Gib den modifizierten Text aus."
     * *KI-Aktion:* Zeigt das bearbeitete Wort an.

---

### Projekt 93: Notfall-Nummern-Finder
* **Ziel:** Suchbegriff (z.B. Feuerwehr) abfragen, passende Nummer zurückgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Suchbegriff (z.B. Polizei, Feuerwehr, Notarzt) ein."
     * *KI-Aktion:* Holt den Suchbegriff.
  2. **Prompt 2 (Logik):** „Nutze ein `match`-Statement auf den Begriff, um die passende Telefonnummer als `&str` zuzuordnen."
     * *KI-Aktion:* Weist die Telefonnummern zu.
  3. **Prompt 3 (Ausgabe):** „Gib die Nummer aus oder zeige eine Fehlermeldung, falls der Begriff unbekannt ist."
     * *KI-Aktion:* Handhabt den Standardfall (`_`).

---

### Projekt 94: Rabatt-Gutschein-System (Mehrere Codes)
* **Ziel:** Rabattcode prüfen und entsprechenden Rabatt anwenden.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies den Einkaufswert (`f64`) und einen Rabattcode ein."
     * *KI-Aktion:* Holt Wert und Code.
  2. **Prompt 2 (Logik):** „Nutze `match` auf den Code: 'BRONZE' gibt 5%, 'SILVER' gibt 10%, 'GOLD' gibt 20% Rabatt."
     * *KI-Aktion:* Berechnet den Rabattsatz.
  3. **Prompt 3 (Ausgabe):** „Berechne den neuen Preis und gib ihn aus."
     * *KI-Aktion:* Führt die Subtraktion durch und gibt das Ergebnis aus.

---

### Projekt 95: Ziffern-Quersummen-Rechner
* **Ziel:** Ganzzahl einlesen, Quersumme berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies eine positive Ganzzahl als `String` ein."
     * *KI-Aktion:* Holt den Ziffernstring.
  2. **Prompt 2 (Schleife):** „Iteriere über die Zeichen des Strings, parse jedes Zeichen zurück in eine Zahl und addiere sie."
     * *KI-Aktion:* Konvertiert die Zeichen in Ziffern und summiert sie.
  3. **Prompt 3 (Ausgabe):** „Gib die berechnete Quersumme aus."
     * *KI-Aktion:* Zeigt das Endergebnis an.

---

### Projekt 96: Schere-Stein-Papier
* **Ziel:** Wahl einlesen, gegen eine vordefinierte Wahl spielen.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere die Wahl des Gegners statisch im Code (z. B. 'Stein')."
     * *KI-Aktion:* Legt die gegnerische Wahl fest.
  2. **Prompt 2 (Eingabe):** „Lies die Wahl des Spielers (Schere, Stein, Papier) ein."
     * *KI-Aktion:* Holt die Spieler-Eingabe.
  3. **Prompt 3 (Logik):** „Vergleiche beide Eingaben per `if/else` und gib aus, wer gewonnen hat."
     * *KI-Aktion:* Ermittelt den Gewinner oder Unentschieden.

---

### Projekt 97: Text-Zentrierer
* **Ziel:** Text einlesen und in einer festen Breite zentrieren.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies einen Text und eine Zielbreite als Ganzzahl ein."
     * *KI-Aktion:* Holt Text und Breite.
  2. **Prompt 2 (Berechnung):** „Berechne den nötigen Abstand links und rechts (Breite - Textlänge) / 2."
     * *KI-Aktion:* Berechnet die Leerzeichenanzahl.
  3. **Prompt 3 (Ausgabe):** „Erstelle den zentrierten String, indem du die Leerzeichen links und rechts anfügst, und gib ihn aus."
     * *KI-Aktion:* Gibt den zentrierten Text aus.

---

### Projekt 98: Trinkgeld-Teiler
* **Ziel:** Rechnungssumme, Trinkgeldprozent und Personenanzahl abfragen, Anteil berechnen.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies Gesamtrechnung (`f64`), Trinkgeld (in %) und Personenanzahl (`i32`) ein."
     * *KI-Aktion:* Parst die drei Werte.
  2. **Prompt 2 (Berechnung):** „Berechne die Gesamtsumme inklusive Trinkgeld und teile sie durch die Personenanzahl."
     * *KI-Aktion:* Berechnet den Pro-Kopf-Anteil.
  3. **Prompt 3 (Ausgabe):** „Gib den Betrag aus, den jede Person zahlen muss."
     * *KI-Aktion:* Zeigt den Anteil an.

---

### Projekt 99: Passwort-Maskierer
* **Ziel:** Passwort einlesen und die gleiche Länge in Sternchen (*) ausgeben.
* **Modulare Prompts:**
  1. **Prompt 1 (Eingabe):** „Lies ein Passwort vom Benutzer ein."
     * *KI-Aktion:* Holt das Passwort.
  2. **Prompt 2 (Logik):** „Ermittle die Länge des Passworts unter Nutzung von Borrowing."
     * *KI-Aktion:* Bestimmt die Länge.
  3. **Prompt 3 (Ausgabe):** „Erstelle einen neuen String, der nur aus Sternchen besteht und genau so lang ist wie das Passwort. Gib ihn aus."
     * *KI-Aktion:* Nutzt die String-Wiederholung (z.B. `"*".repeat(laenge)`) und gibt sie aus.

---

### Projekt 100: Ultimate-Grundlagen-Check
* **Ziel:** Ein interaktives Text-Abenteuer, bei dem der Spieler Entscheidungen trifft und Werte (Leben, Gold) verwaltet werden.
* **Modulare Prompts:**
  1. **Prompt 1 (Datenbasis):** „Definiere veränderbare Statuswerte wie `leben` (`i32`) und `gold` (`i32`). Definiere Spielorte als statische Texte (`&str`)."
     * *KI-Aktion:* Initialisiert die Statuswerte und Ortsbeschreibungen.
  2. **Prompt 2 (Schleife & Eingabe):** „Schreibe eine Spiel-Schleife. Frage den Spieler in jedem Zug nach seiner Richtung (z.B. links, rechts) und lies seine Entscheidung ein."
     * *KI-Aktion:* Baut die Spielschleife und die Richtungsabfragen auf.
  3. **Prompt 3 (Logik & Status):** „Nutze ein `match`-Statement auf die Richtung. Ändere die Werte für Leben und Gold entsprechend und brich die Schleife ab, wenn das Leben auf 0 sinkt. Zeige nach jedem Zug den Status an."
     * *KI-Aktion:* Verarbeitet die Spielzüge, aktualisiert den Zustand über veränderbare Referenzen und steuert das Spielende.

---

## Fazit: Wie du mit diesem Katalog arbeitest

Dieser Katalog ist dein Werkzeug, um **aktives Denken über Code** zu trainieren.
Wenn du ein Projekt umsetzt:
1. Kopiere nicht einfach den Prompt.
2. Schicke Prompt 1 ab, **stoppe**, lies den Code der KI. 
3. Überlege: Wo sind die Variablen? Welchen Datentyp haben sie?
4. Schicke erst dann Prompt 2 ab und schaue, wie sich der Code verändert.

So baust du ein tiefes Verständnis für Rust auf, ohne jemals in die Falle des stumpfen Abschreibens zu tappen!
