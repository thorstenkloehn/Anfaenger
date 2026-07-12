# 100 Projekte – Nur Prompts (Modulares Prinzip)
In diesem Kapitel erfährst du, wie du die 100 Projekte aus Phase 1 mithilfe von künstlicher Intelligenz (KI) erarbeitest, ohne fertigen Code abzuschreiben. Das Ziel ist **passives Auffrischen**: Du lässt die KI den Code schreiben, begleitest sie dabei aber Schritt für Schritt und verstehst dadurch jede Zeile.
Dazu nutzen wir **das modulare Prinzip** und lernen den Unterschied zwischen ungenauen "Monster-Prompts" und präzisen Einzelschritten.
---
## Jedes Projekt übt alle Grundlagen gleichzeitig
Jedes der 100 Projekte ist so konzipiert, dass es die fünf Kernbereiche von Rusts Phase 1 kombiniert:
| Thema | Was du lernst |
| :--- | :--- |
| 🧱 Variablen & Datentypen | Zahlen, Texte, Mutabilität |
| 🔀 Kontrollfluss | `if/else`, `loop`, `while`, `for` |
| ⌨️ Benutzereingabe | Lesen von der Konsole, Konvertierung |
| 🧠 Ownership & Borrowing | Wer besitzt was? Referenzen nutzen |
| 📝 String vs. &str | Texte speichern, vergleichen, ausgeben |
---
## Das Modulare Prinzip: Vom Monster-Prompt zum Präzisions-Input
### Was ist ein "Monster-Prompt"?
Ein Monster-Prompt ist eine lange, ungegliederte Anweisung, bei der du der KI alle Anforderungen auf einmal vorwirfst.
*Beispiel:*
> "Schreibe mir ein Rust-Programm, das ein Passwort einliest, prüft ob es richtig ist, mir 3 Versuche gibt, Eingabefehler abfängt und mir am Ende ausgibt, ob der Login erfolgreich war. Nutze Strings und Borrowing."
**Das Problem:** Die KI generiert sofort 40–60 Zeilen fertigen Code. Als Anfänger verliert man schnell den Überblick, übersieht Fehler und versteht nicht, welche Zeile wofür verantwortlich ist. Wenn das Programm nicht läuft, ist das Frustpotenzial hoch.
### Was ist ein "Präzisions-Input" (Das Modulare Prinzip)?
Anstatt die KI alles auf einmal bauen zu lassen, teilen wir das Projekt in **Module** auf. Du fütterst die KI mit präzisen Anweisungen für jeden einzelnen Teilschritt. Erst wenn Schritt 1 läuft und du ihn verstanden hast, machst du mit Schritt 2 weiter.
*Vorteile:*
1. **Verständnis:** Du siehst genau, wie sich der Code mit jedem Schritt weiterentwickelt.
2. **Fehlersuche:** Wenn etwas schiefgeht, weißt du sofort, dass der Fehler im letzten kleinen Modul liegt.
3. **Lerneffekt:** Du bestimmst das Tempo und liest nur kleine, verdauliche Codestücke.
---
## Der modulare Prompt-Katalog für alle 100 Projekte
Hier findest du für jedes der 100 Projekte der Phase 1 den genauen modularen Ablauf mit kopierfertigen Präzisions-Prompts. Nutze diese Prompts in deinem Chat mit der KI, um die Programme Schritt für Schritt selbst zu erarbeiten!

### Projekt 1: Begrüßung mit Eingabe

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion, das eine statische Begrüßung ausgibt."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Erweitere das Programm, sodass der Benutzer nach seinem Namen gefragt wird. Lies den Namen von der Konsole ein und speichere ihn in einem veränderbaren `String`."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Erweitere das Programm um eine Bedingung: Wenn der Name 'Rust' lautet, gib eine spezielle Nachricht aus, andernfalls begrüße den Benutzer mit seinem eingegebenen Namen. Bereinige die Eingabe zuvor mit `.trim()`."

---

### Projekt 2: Zahlen addieren bis 100

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm mit einer `main`-Funktion. Definiere eine veränderbare Variable für die Summe und initialisiere sie mit 0."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Erweitere das Programm um eine `for`-Schleife, die von 1 bis 100 zählt und in jedem Schritt den aktuellen Wert zur Summe addiert."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib die berechnete Gesamtsumme am Ende der `main`-Funktion auf der Konsole aus."

---

### Projekt 3: Passwort-Prüfer

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm mit einer `main`-Funktion. Definiere darin ein festes Passwort als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Erweitere den Code. Der Benutzer soll nun aufgefordert werden, ein Passwort über die Konsole einzugeben. Speichere diese Eingabe in einem veränderbaren `String`."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Entferne Leerzeichen mit `.trim()` und vergleiche die Eingabe mit dem geheimen Passwort. Gib je nach Ergebnis 'Zugriff gewährt!' oder 'Zugriff verweigert!' aus."

---

### Projekt 4: Gerade oder Ungerade

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Schreibe ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als String von der Konsole einliest."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (z.B. `i32`) und fange eventuelle Fehler ab."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mithilfe des Modulo-Operators `%`, ob die Zahl gerade (Rest 0 bei Teilung durch 2) oder ungerade ist, und gib das Ergebnis aus."

---

### Projekt 5: Zählen bis zum Ziel

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Schreibe ein Rust-Programm, das den Benutzer fragt, bis wohin gezählt werden soll, und diese Zahl als String einliest."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) und erstelle eine veränderbare Zählervariable, die bei 1 startet."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `while`-Schleife, um von 1 bis zur Zielzahl zu zählen und jede Zahl auszugeben. Erhöhe den Zähler in jedem Durchlauf."

---

### Projekt 6: Lieblingsfarbe erraten

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Schreibe ein Rust-Programm, das eine endlose `loop`-Schleife startet, in der der Benutzer nach einer Farbe gefragt wird."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Lies die Antwort des Benutzers in einen veränderbaren String ein."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe, ob die mit `.trim()` bereinigte Eingabe mit der Lieblingsfarbe 'rot' übereinstimmt. Wenn ja, gib eine Erfolgsmeldung aus und beende die Schleife mit `break`. Wenn nein, frage erneut."

---

### Projekt 7: Temperatur-Umrechner

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Schreibe ein Rust-Programm, das den Benutzer nach einer Temperatur in Celsius fragt und die Eingabe einliest."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Fließkommazahl (`f64`) und fange Konvertierungsfehler ab."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Berechne die Temperatur in Fahrenheit (Formel: Celsius * 1.8 + 32.0) und gib das Ergebnis aus."

---

### Projekt 8: Wortlängen-Messer

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Schreibe ein Rust-Programm, das den Benutzer nach einem Wort fragt und dieses in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Entferne eventuelle Leerzeichen und Zeilenumbrüche am Ende des Worts mit `.trim()`."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Ermittle die Länge des bereinigten Worts mit `.len()` und gib die Anzahl der Zeichen aus. Erkläre im Kommentar, warum wir eine Referenz nutzen."

---

### Projekt 9: Countdown

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das eine Range von 1 bis 10 definiert."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Nutze die Methode `.rev()` auf der Range, um rückwärts zu zählen, und gib die Zahlen in einer `for`-Schleife aus."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib nach dem Ende der Schleife die Meldung 'Start!' aus."

---

### Projekt 10: Einfacher Taschenrechner (Addition)

#### 🛠️ Modul 1: Basisstruktur
* **Dein Präzisions-Prompt:**
  > "Schreibe ein Rust-Programm, das nacheinander zwei verschiedene Zahlen als Strings vom Benutzer einliest."

#### 🛠️ Modul 2: Interaktion & Logik-Vorbereitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere beide Eingaben in Fließkommazahlen (`f64`)."

#### 🛠️ Modul 3: Vollendung & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Addiere die beiden Zahlen und gib das Ergebnis auf der Konsole aus."

---

### Projekt 11: Zähler bis 11

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 11 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 12: Ist die Zahl größer als 12?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 12 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 13: Textwiederholung (Projekt 13)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 14: Altersprüfer (Mindestalter 14)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 14 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 15: Multiplikator 15

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 15 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 16: Zähler bis 16

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 16 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 17: Ist die Zahl größer als 17?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 17 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 18: Textwiederholung (Projekt 18)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 19: Altersprüfer (Mindestalter 19)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 19 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 20: Multiplikator 20

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 20 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 21: Zähler bis 21

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 21 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 22: Ist die Zahl größer als 22?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 22 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 23: Textwiederholung (Projekt 23)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 24: Altersprüfer (Mindestalter 24)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 24 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 25: Multiplikator 25

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 25 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 26: Zähler bis 26

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 26 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 27: Ist die Zahl größer als 27?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 27 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 28: Textwiederholung (Projekt 28)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 29: Altersprüfer (Mindestalter 29)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 29 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 30: Multiplikator 30

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 30 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 31: Zähler bis 31

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 31 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 32: Ist die Zahl größer als 32?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 32 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 33: Textwiederholung (Projekt 33)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 34: Altersprüfer (Mindestalter 34)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 34 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 35: Multiplikator 35

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 35 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 36: Zähler bis 36

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 36 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 37: Ist die Zahl größer als 37?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 37 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 38: Textwiederholung (Projekt 38)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 39: Altersprüfer (Mindestalter 39)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 39 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 40: Multiplikator 40

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 40 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 41: Zähler bis 41

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 41 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 42: Ist die Zahl größer als 42?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 42 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 43: Textwiederholung (Projekt 43)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 44: Altersprüfer (Mindestalter 44)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 44 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 45: Multiplikator 45

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 45 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 46: Zähler bis 46

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 46 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 47: Ist die Zahl größer als 47?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 47 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 48: Textwiederholung (Projekt 48)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 49: Altersprüfer (Mindestalter 49)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 49 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 50: Multiplikator 50

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 50 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 51: Zähler bis 51

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 51 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 52: Ist die Zahl größer als 52?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 52 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 53: Textwiederholung (Projekt 53)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 54: Altersprüfer (Mindestalter 54)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 54 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 55: Multiplikator 55

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 55 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 56: Zähler bis 56

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 56 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 57: Ist die Zahl größer als 57?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 57 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 58: Textwiederholung (Projekt 58)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 59: Altersprüfer (Mindestalter 59)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 59 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 60: Multiplikator 60

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 60 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 61: Zähler bis 61

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 61 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 62: Ist die Zahl größer als 62?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 62 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 63: Textwiederholung (Projekt 63)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 64: Altersprüfer (Mindestalter 64)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 64 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 65: Multiplikator 65

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 65 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 66: Zähler bis 66

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 66 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 67: Ist die Zahl größer als 67?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 67 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 68: Textwiederholung (Projekt 68)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 69: Altersprüfer (Mindestalter 69)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 69 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 70: Multiplikator 70

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 70 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 71: Zähler bis 71

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 71 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 72: Ist die Zahl größer als 72?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 72 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 73: Textwiederholung (Projekt 73)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 74: Altersprüfer (Mindestalter 74)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 74 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 75: Multiplikator 75

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 75 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 76: Zähler bis 76

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 76 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 77: Ist die Zahl größer als 77?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 77 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 78: Textwiederholung (Projekt 78)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 79: Altersprüfer (Mindestalter 79)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 79 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 80: Multiplikator 80

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 80 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 81: Zähler bis 81

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 81 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 82: Ist die Zahl größer als 82?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 82 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 83: Textwiederholung (Projekt 83)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 84: Altersprüfer (Mindestalter 84)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 84 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 85: Multiplikator 85

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 85 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 86: Zähler bis 86

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 86 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 87: Ist die Zahl größer als 87?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 87 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 88: Textwiederholung (Projekt 88)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 89: Altersprüfer (Mindestalter 89)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 89 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 90: Multiplikator 90

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 90 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 91: Zähler bis 91

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 91 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 92: Ist die Zahl größer als 92?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 92 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 93: Textwiederholung (Projekt 93)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 94: Altersprüfer (Mindestalter 94)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 94 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 95: Multiplikator 95

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 95 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

### Projekt 96: Zähler bis 96

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion und einer unveränderbaren Variable `max`, die den Wert 96 speichert."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Definiere eine veränderbare Zählervariable `count`, die mit dem Wert 1 initialisiert wird."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Implementiere eine `while`-Schleife, die solange läuft, wie `count` kleiner oder gleich `max` ist. Gib in jedem Schleifendurchlauf den aktuellen Wert von `count` aus und erhöhe ihn um 1."

---

### Projekt 97: Ist die Zahl größer als 97?

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Zahl fragt und die Eingabe als veränderbaren String von der Konsole liest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere den eingelesenen String mit `.parse()` in einen Ganzzahl-Typ (`i32`) und fange eventuelle Fehler sauber ab."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Prüfe mit einer `if/else`-Bedingung, ob die eingegebene Zahl größer als 97 ist. Gib je nach Ergebnis eine passende Bestätigung oder Verneinung auf der Konsole aus."

---

### Projekt 98: Textwiederholung (Projekt 98)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm und definiere ein Wort wie 'Rust' als unveränderlichen Text (`&str`)."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Erstelle eine `for`-Schleife, die über eine Range von 0 bis 4 läuft (also genau 4 Durchläufe hat)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Gib in jedem Durchlauf den Text 'Ich lerne ' zusammen mit dem zuvor definierten Wort aus."

---

### Projekt 99: Altersprüfer (Mindestalter 99)

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach seinem Alter fragt und die Eingabe in einen veränderbaren String einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Konvertiere die Eingabe in eine Ganzzahl (`i32`) mit Fehlerbehandlung für den Fall, dass keine Zahl eingegeben wurde."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Nutze eine `if/else`-Struktur, um zu prüfen, ob das Alter mindestens 99 beträgt. Gib eine Erfolgsmeldung aus, wenn das der Fall ist, andernfalls eine Meldung, dass das Alter noch nicht erreicht ist."

---

### Projekt 100: Multiplikator 100

#### 🛠️ Modul 1: Basis
* **Dein Präzisions-Prompt:**
  > "Erstelle ein Rust-Programm, das den Benutzer auffordert, eine Zahl einzugeben, und diese über die Konsole einliest."

#### 🛠️ Modul 2: Verarbeitung
* **Dein Präzisions-Prompt:**
  > "Trimme die Eingabe mit `.trim()` und konvertiere sie in eine Ganzzahl (`i32`)."

#### 🛠️ Modul 3: Logik & Ausgabe
* **Dein Präzisions-Prompt:**
  > "Multipliziere die konvertierte Zahl mit 100 und gib das Ergebnis sauber formatiert auf der Konsole aus."

---

## So wendest du das Modulare Prinzip auf alle 100 Projekte an

Wenn du ein neues Projekt aus der Liste beginnst, gehe immer nach folgendem Muster vor:

1. **Analysiere das Ziel:** Welche Ein- und Ausgaben sind nötig?
2. **Schneide Module:** Zerlege das Projekt in mindestens 3 Einzelschritte (z.B. 1. Datenstruktur & statische Werte -> 2. Benutzereingabe & Konvertierung -> 3. Logik & Schleifen).
3. **Formuliere Schritt-Prompts:** Frage die KI nach einem Schritt nach dem anderen.
4. **Fordere Erklärungen:** Lass dir von der KI immer erklären, *warum* sie bestimmte Rust-Besonderheiten (wie `&mut`, `.trim()` oder Ownership) in diesem Schritt verwendet hat.
5. **Reflektiere aktiv:** Lies den generierten Code aufmerksam durch. Kannst du den Datenfluss nachvollziehen?

Durch diesen modularen Dialog lernst du nicht nur Rust-Syntax, sondern verinnerlichst auch das algorithmische Denken und den sicheren Umgang mit KI-Assistenten.
