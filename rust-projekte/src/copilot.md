# 🐙 GitHub Copilot – Der klassische KI-Assistent

*Code-Vervollständigung der nächsten Generation – direkt im Editor.*

---

GitHub Copilot war einer der **ersten KI-Assistenten**, die direkt im Code-Editor eingesetzt wurden. Er gilt als der „klassische Assistent": Er schlägt Code vor, vervollständigt Funktionen und erklärt – aber er handelt nicht selbstständig.

In dieser Lektion lernen wir, wie GitHub Copilot funktioniert, wo er sich von modernen KI-Agenten unterscheidet und wie wir ihn sinnvoll beim Rust-Lernen einsetzen können.

> **Wichtig für Anfänger:** Copilot ist ein **Assistent**, kein Agent. Er antwortet auf das, was du gerade tippst – er plant nicht, handelt nicht und liest keine Konfigurationsdateien. Das macht ihn einfacher – und in manchen Situationen auch nützlicher.

---

## 🧠 Theorie: Was ist GitHub Copilot?

GitHub Copilot ist ein KI-Assistent von **GitHub und OpenAI**. Er wurde auf Milliarden von Zeilen öffentlichen Codes trainiert und läuft als Plugin in deinem Editor.

### Wie funktioniert Copilot?

Copilot analysiert **Kontext in Echtzeit**:

- Den Code, den du gerade schreibst
- Die Datei, in der du arbeitest
- Den Kommentar direkt über dem Cursor
- Den Dateinamen und die Programmiersprache

Daraus generiert er **Vorschläge** – einzelne Zeilen, ganze Funktionen oder sogar vollständige Klassen.

---

### Die vier Copilot-Funktionen im Überblick

| Funktion | Was passiert | Wann hilfreich? |
|---|---|---|
| **Inline-Vorschläge** | Copilot tippt mit dir mit | Immer – der Kernmodus |
| **Copilot Chat** | Chatfenster direkt im Editor | Für Erklärungen & Refactoring |
| **Copilot in der Kommandozeile** | Terminalbefehle vorschlagen | Wenn du nicht weißt, wie ein Befehl heißt |
| **Copilot Edits** | Mehrere Dateien gleichzeitig ändern | Für größere Umstrukturierungen |

---

### 🔧 Wie Copilot denkt – ein Beispiel

Du schreibst in Rust:

```rust
// Berechne den Durchschnitt einer Liste von Zahlen
fn
```

Copilot sieht deinen Kommentar und schlägt sofort vor:

```rust
fn berechne_durchschnitt(zahlen: &[f64]) -> f64 {
    let summe: f64 = zahlen.iter().sum();
    summe / zahlen.len() as f64
}
```

**Das ist das Prinzip:** Kommentare sind deine Anweisungen. Je präziser der Kommentar, desto besser der Vorschlag.

---

### 📐 Copilot vs. KI-Agent – Was ist der Unterschied?

| | GitHub Copilot | KI-Agent (z. B. Antigravity) |
|---|---|---|
| **Typ** | Assistent | Agent |
| **Handelt selbstständig** | ❌ Nein | ✅ Ja |
| **Dateien lesen/schreiben** | ❌ Nur die aktuelle Datei | ✅ Projektweite Dateien |
| **Terminal ausführen** | ❌ Nein | ✅ Ja |
| **Erinnert sich** | ❌ Nur innerhalb der Sitzung | ✅ Über AGENTS.md und Skills |
| **Planungsmodus** | ❌ Nein | ✅ Ja |
| **Vorschlags-Modus** | ✅ Inline, sofort | ❌ Auf Anfrage |
| **Installation** | Plugin im Editor | Eigene App / CLI |

**Die wichtigste Erkenntnis:**
> 🤝 Copilot ist perfekt beim **aktiven Tippen** – er schlägt vor, du entscheidest.  
> 🤖 Ein Agent ist perfekt für **größere Aufgaben** – er plant und handelt.

---

### ⌨️ Copilot-Shortcuts (in VS Code)

| Tastenkürzel | Was passiert |
|---|---|
| `Tab` | Vorschlag annehmen |
| `Esc` | Vorschlag ablehnen |
| `Alt + ]` | Nächster Vorschlag |
| `Alt + [` | Vorheriger Vorschlag |
| `Ctrl + Enter` | Alle Vorschläge anzeigen |
| `Ctrl + I` | Copilot Chat öffnen (Inline) |
| `Ctrl + Shift + I` | Copilot Chat in Seitenleiste |

---

### 💡 Copilot richtig einsetzen – Best Practices

1. **Kommentare als Anweisungen nutzen:** Schreibe erst, was die Funktion tun soll, dann lass Copilot vorschlagen.
2. **Vorschläge hinterfragen:** Verstehe immer, was Copilot vorschlägt – übernimm keinen Code blind.
3. **Namen als Hinweise:** Gute Variablen- und Funktionsnamen führen zu besseren Vorschlägen.
4. **Für Anfänger: Langsamer werden:** Tippe bewusst langsam und lies jeden Vorschlag durch.
5. **Copilot Chat für Erklärungen:** Markiere fremden Code und frage „Was macht dieser Code?"

---

## 🛠️ Praxis-Aufgaben

### Aufgabe A: Copilot kennenlernen

Installiere das **GitHub Copilot Plugin** in VS Code (oder Antigravity IDE):
1. Erweiterungen öffnen (`Ctrl+Shift+X`)
2. „GitHub Copilot" suchen
3. Installieren und mit GitHub-Konto anmelden

Teste dann: Schreibe einen Kommentar auf Deutsch und lass Copilot eine Funktion vorschlagen.

```rust
// Gibt eine Begrüßungsnachricht mit dem übergebenen Namen zurück
fn
```

---

### Aufgabe B: Vorschläge bewusst lesen

Lass Copilot einen Vorschlag machen – aber bevor du `Tab` drückst:
- Lies den gesamten Code durch
- Verstehe jede Zeile
- Frage dich: Würde ich das so schreiben?

Erst dann: annehmen oder ablehnen.

---

### Aufgabe C: Copilot Chat nutzen

Markiere diesen Code im Editor:

```rust
let ergebnis: Result<i32, _> = "42abc".parse();
```

Öffne den Copilot Chat (`Ctrl+I`) und frage:
```
Erkläre mir, was hier passiert und warum Rust Result verwendet.
```

---

## 🚀 50 Rust-Projektvorschläge für GitHub Copilot

Diese Projekte sind speziell dafür gedacht, **mit GitHub Copilot** als klassischem Assistenten zu arbeiten. Schreibe immer erst einen Kommentar, der beschreibt, was du willst – dann lass Copilot vorschlagen und entscheide selbst.

> 🦀 **Lernregel:** Copilot darf vorschlagen – aber du musst jede Zeile verstehen.  
> Nimm keinen Vorschlag an, den du nicht erklären könntest!

---

### 🟢 Einstiegsprojekte (1–10)

1. **Hallo, Welt!** – Lass Copilot die klassische Begrüßung vorschlagen und experimentiere mit verschiedenen Ausgabeformaten.

2. **Taschenrechner** – Schreibe Kommentare für Addition, Subtraktion, Multiplikation und Division. Lass Copilot die Funktionen vorschlagen.

3. **Temperatumrechner** – Celsius ↔ Fahrenheit ↔ Kelvin. Schreibe je einen Kommentar pro Umrechnung.

4. **Geradzahlen-Prüfer** – Kommentiere: „Prüfe ob eine Zahl gerade ist" – was schlägt Copilot vor?

5. **Fibonacci-Folge** – Lass Copilot eine rekursive und eine iterative Variante vorschlagen. Vergleiche beide.

6. **Buchstaben zählen** – Zähle, wie oft ein bestimmter Buchstabe in einem String vorkommt.

7. **Palindrom-Prüfer** – Schreibe den Kommentar, lass Copilot prüfen ob ein Wort rückwärts gleich ist.

8. **Zahl erraten** – Copilot schlägt eine Zufallszahl und eine Eingabeschleife vor. Du verstehst, warum.

9. **Primzahl-Checker** – Kommentiere die Logik schrittweise, beobachte Copilots Vorschläge.

10. **Wörter zählen** – Zähle die Wörter in einem eingegebenen Satz.

---

### 🟡 Mittlere Projekte (11–25)

11. **Einkaufsliste** – Eine Vektor-basierte Liste, die du ergänzen und ausgeben kannst.

12. **Notenrechner** – Gib Noten ein, berechne den Durchschnitt und das Prädikat.

13. **Passwort-Stärke-Checker** – Prüfe Länge, Sonderzeichen und Zahlen in einem Passwort.

14. **Wechselgeldrechner** – Berechne das optimale Wechselgeld (Scheine und Münzen).

15. **Würfelspiel** – Simuliere das Würfeln mit verschiedenen Würfeltypen (W6, W12, W20).

16. **Binäre Suche** – Implementiere mit Copilots Hilfe eine binäre Suche in einem sortierten Array.

17. **Stack (Stapel)** – Baue einen eigenen Stack mit `push`, `pop` und `peek`.

18. **Wortverschlüsselung** – Einfache Caesar-Chiffre: Buchstaben um N Stellen verschieben.

19. **Einheitenrechner** – Kilometer ↔ Meilen, Kilogramm ↔ Pfund, Liter ↔ Gallonen.

20. **Körper-Maß-Index** – Berechne BMI und zeige Kategorien an.

21. **Countdown-Timer** – Zähle von einer eingegebenen Zahl rückwärts bis 0.

22. **Vokabeln abfragen** – Speichere Deutsch-Englisch-Paare und prüfe das Wissen.

23. **Lottozahlen** – Ziehe 6 zufällige Zahlen aus 1–49, keine Duplikate.

24. **Textstatistik** – Zähle Buchstaben, Wörter, Sätze und berechne durchschnittliche Wortlänge.

25. **Tic-Tac-Toe** – Zwei Spieler im Terminal. Copilot hilft mit der Siegbedingung.

---

### 🔴 Fortgeschrittene Projekte (26–40)

26. **Taschenrechner mit Fehlerbehandlung** – Erweitere Projekt 2 um `Result` und sinnvolle Fehlermeldungen.

27. **Kontaktbuch** – Speichere Namen und Telefonnummern in einer `HashMap`.

28. **Notiz-App** – Füge Notizen hinzu, lösche sie, zeige alle an – alles im Terminal.

29. **Budgetverwaltung** – Einnahmen und Ausgaben buchen, Kontostand anzeigen.

30. **Wortfrequenz-Analyse** – Welches Wort kommt in einem Text am häufigsten vor?

31. **Morse-Code** – Konvertiere Text in Morsecode und zurück.

32. **Bruchrechnung** – Brüche addieren, subtrahieren, kürzen – mit eigenem Bruch-Struct.

33. **Zahlenraten mit KI-Tipp** – Die KI (simpler Algorithmus) rät die Zahl des Nutzers durch Fragen.

34. **Matrix-Rechner** – Addiere und multipliziere 2×2-Matrizen.

35. **Anagramm-Prüfer** – Sind zwei Wörter Anagramme voneinander?

36. **Roman-Zahlen-Konverter** – Arabische Zahlen in römische und zurück.

37. **Bankkonto** – Ein Struct mit Einzahlen, Abheben und Kontostand – mit Fehlern bei Überziehung.

38. **Textadventure** – Eine einfache Welt mit Räumen und Gegenständen – Copilot hilft bei der Struktur.

39. **Zahlenformatierung** – Zeige Zahlen mit Tausender-Trennzeichen an (1.000.000).

40. **Stoppuhr** – Miss, wie lange der Nutzer eine Eingabe benötigt.

---

### ⚡ Herausforderungsprojekte (41–50)

41. **Vollständiger Student-Verwalter** – Struct für Studenten, Noten speichern, Durchschnitt berechnen, Rangfolge ausgeben.

42. **Einfache Datenbank im Speicher** – Tabellen simulieren: Zeilen einfügen, suchen, löschen.

43. **Taschenrechner mit Operator-Vorrang** – Klammern und Punkt-vor-Strich korrekt berechnen.

44. **Schiffe versenken** – Terminal-Spiel für zwei Spieler mit Spielfeld-Ausgabe.

45. **CSV-Parser** – Lies eine CSV-Datei zeilenweise und gib strukturierte Daten aus.

46. **Passwort-Generator** – Erzeuge sichere Passwörter mit einstellbarer Länge und Zeichenvorrat.

47. **Farbmischer** – RGB-Farben mischen, HEX-Code ausgeben.

48. **Reguläre Ausdrücke** – Validiere E-Mail-Adressen oder Telefonnummern mit einem Pattern.

49. **Mehrstufige Menü-App** – Eine CLI-App mit Hauptmenü, Untermenüs und Navigation.

50. **Eigenes Assembler-Spielzeug** – Ein Mini-Interpreter, der einfache „Befehle" wie `ADD 5 3` ausführt.

---

## 💡 Zusammenfassung

| Konzept | Bedeutung |
|---|---|
| Inline-Vorschläge | Copilots Kernfunktion – er tippt mit |
| Kommentar als Anweisung | Präzise Kommentare = bessere Vorschläge |
| Tab-Entscheidung | Du entscheidest immer, ob du annimmst |
| Copilot Chat | Für Erklärungen und Verständnisfragen |
| Vorschläge verstehen | Nie blind annehmen – immer lesen! |

> 🦀 **Merke:** Copilot ist kein Autopilot. Er schlägt vor – **du** programmierst.  
> Wer jeden Vorschlag versteht, lernt schneller als jemand, der blind annimmt.

---

## 📚 Weiterführende Links

- [GitHub Copilot](https://github.com/features/copilot) – Offizielle Seite
- [Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview) – Dokumentation
- [Copilot Chat](https://docs.github.com/en/copilot/github-copilot-chat) – Chat-Funktion erklärt
- [Rust-Buch](https://doc.rust-lang.org/book/) – Die offizielle Rust-Referenz
