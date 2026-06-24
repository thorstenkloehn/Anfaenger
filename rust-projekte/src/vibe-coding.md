# 🎵 Vibe Coding – Programmieren mit KI im Flow

*Wenn die KI den Code schreibt – und du die Ideen hast.*

---

„Vibe Coding" ist ein Begriff, der 2025 durch den KI-Forscher **Andrej Karpathy** geprägt wurde. Er beschreibt einen Programmierstil, bei dem der Mensch **Ideen, Richtung und Vision** gibt – und die KI den Großteil des Codes schreibt.

In dieser Lektion lernen wir, was Vibe Coding bedeutet, welche Chancen und Risiken es birgt, und wie wir als Rust-Anfänger es **bewusst und lernfördernd** einsetzen können – ohne uns dabei zu verirren.

> **Wichtig für Anfänger:** Vibe Coding ist weder gut noch schlecht. Es ist ein Werkzeug – wie ein Taschenrechner. Wer nicht rechnen kann, lernt nichts vom Taschenrechner. Wer rechnen kann, wird produktiver.  
> **Lerne zuerst – vibe dann.**

---

## 🧠 Theorie: Was ist Vibe Coding?

### Das Konzept

Beim Vibe Coding lässt du die KI den Code **fast vollständig** schreiben. Du:
- Beschreibst das Problem auf natürliche Sprache
- Siehst den Output
- Testest, ob es funktioniert
- Sagst der KI, was noch fehlt oder falsch ist

Du schreibst **selten** selbst Code – du führst ein Gespräch mit der KI und beobachtest das Ergebnis.

---

### Wie Andrej Karpathy es beschreibt

> *„I mostly just see stuff, say stuff, run stuff, and copy-paste stuff, and it mostly works."*  
> — Andrej Karpathy, 2025

Das klingt verlockend einfach. Aber Karpathy ist einer der führenden KI-Forscher der Welt – er **versteht**, was die KI macht, auch wenn er es nicht selbst tippt.

---

### 🎭 Vibe Coding in der Praxis – Der Ablauf

```
1. Du:    „Ich will eine CLI-App, die Wörter zählt."
      ↓
2. KI:    Schreibt vollständigen Code
      ↓
3. Du:    Führst aus → es funktioniert (oder nicht)
      ↓
4. Du:    „Das Programm zählt Leerzeilen auch – das soll nicht sein."
      ↓
5. KI:    Korrigiert den Code
      ↓
6. Du:    Führst wieder aus → iterierst weiter
```

Das ist Vibe Coding: **Iteration durch Beschreibung**, nicht durch Typen.

---

### 🌈 Die Stärken von Vibe Coding

| Stärke | Wann wertvoll |
|---|---|
| **Schnelles Prototyping** | Wenn du eine Idee schnell ausprobieren willst |
| **Unbekannte Konzepte entdecken** | Wenn du nicht weißt, wie etwas geht |
| **Boilerplate vermeiden** | Wenn du immer gleiche Strukturen schreibst |
| **Kreative Ideen umsetzen** | Wenn die Vision wichtiger ist als der Code |
| **Lernbeschleuniger** | Wenn du den Output verstehst und analysierst |

---

### ⚠️ Die Risiken von Vibe Coding

| Risiko | Warum gefährlich |
|---|---|
| **Kein Verständnis** | Code, den du nicht verstehst, kannst du nicht debuggen |
| **Bugs übersehen** | Die KI irrt sich – ohne Grundwissen merkst du es nicht |
| **Abhängigkeit** | Wer nie selbst coded, verliert die Fähigkeit |
| **Sicherheitsprobleme** | KI schreibt manchmal unsicheren Code |
| **Rust-spezifisch** | Borrow Checker-Fehler brauchen Verständnis, nicht nur Copy-Paste |

---

### 🦀 Vibe Coding in Rust – Besondere Herausforderung

Rust ist **keine gute Vibe-Coding-Sprache für Anfänger**, die gar nichts verstehen.

Warum?

```
KI-Code in Python → läuft oft sofort
KI-Code in Rust   → scheitert oft am Borrow Checker
```

Der Rust-Compiler ist streng. Wenn du nicht verstehst, **warum** er sich beschwert, kannst du nicht sinnvoll mit der KI iterieren.

**Die goldene Regel:**
> 🦀 Vibe Code in Rust erst, wenn du **Ownership, Borrowing und Lifetimes** grundlegend verstanden hast.  
> Dann wird Vibe Coding ein mächtiges Werkzeug – nicht ein Frustrations-Generator.

---

### 🔄 Drei Arten des Vibe Codings

#### 1. Exploratives Vibe Coding
Ziel: Ein unbekanntes Konzept durch Beispiele verstehen.

```
„Zeig mir, wie Iteratoren in Rust funktionieren.
Schreibe 3 verschiedene Beispiele, die .map() nutzen."
```

→ Du siehst Code, analysierst ihn, lernst das Muster.

#### 2. Produktives Vibe Coding
Ziel: Ein Projekt schnell aufbauen, das du dann lernend weiterentwickelst.

```
„Baue eine CLI-App mit clap, die Dateien umbenennt.
Erkläre den Code danach Zeile für Zeile."
```

→ Du bekommst eine Basis und arbeitest dich in den Code ein.

#### 3. Iteratives Vibe Coding
Ziel: Funktionierenden Code schrittweise verbessern.

```
„Das hier ist mein Code. Was würde Clippy bemängeln?
Verbessere es – aber erkläre jede Änderung."
```

→ Du iterierst mit der KI wie mit einem Code-Reviewer.

---

### 🧭 Der Lernende Vibe-Coder – Ein Manifest

Wenn du als Anfänger Vibe Coding nutzt, halte dich an diese Regeln:

1. **Niemals blind kopieren** – Jeden Code, den die KI schreibt, verstehen.
2. **Den KI-Code erklären lassen** – „Erkläre mir diesen Code Zeile für Zeile."
3. **Eigene Tests schreiben** – Teste, ob du den Code wirklich verstehst.
4. **Fehler selbst analysieren** – Wenn Cargo sich beschwert: erst selbst denken.
5. **Regelmäßig ohne KI üben** – Mindestens 20% des Codes selbst schreiben.

---

## 🛠️ Praxis-Aufgaben

### Aufgabe A: Explorations-Session

Starte einen Chat mit dem Agenten und sage:

```
Ich lerne Rust. Zeig mir drei verschiedene Möglichkeiten,
eine Liste von Zahlen zu summieren. Erkläre die Unterschiede.
Schreibe nur Code mit ausführlichen Kommentaren.
```

→ Lies jeden Code durch. Tippe den Code selbst ab (kein Copy-Paste!).

---

### Aufgabe B: Vibe Coding mit Analyse

Lass die KI eine kleine Funktion schreiben:

```
Schreibe eine Rust-Funktion, die prüft ob ein String
eine gültige E-Mail-Adresse ist (einfache Prüfung ohne Regex).
```

Dann: **Erkläre die Funktion selbst**, ohne auf den Code zu schauen.  
Wenn du nicht kannst: Lies nochmal, verstehe, erkläre erneut.

---

### Aufgabe C: Bewusster Stopp

Fange an, Vibe Coding zu nutzen – aber setze eine Regel:

```
Nach jedem 3. KI-Output: Schreibe die nächste Funktion selbst,
ohne KI-Hilfe.
```

Beobachte: Wie verändert sich dein Verständnis?

---

## 🚀 50 Rust-Projektvorschläge für Vibe Coding

Diese Projekte sind dafür gedacht, mit **iterativem Dialog** mit der KI umgesetzt zu werden. Du beschreibst, die KI schreibt, du analysierst und verstehst.

> 🦀 **Lernregel:** Für jedes Projekt gilt: Du bekommst den Code – aber du **erklärst ihn**.  
> Sage laut, was jede Zeile tut. Wenn du stockst: Frage, höre zu, probiere aus.

---

### 🟢 Einstiegs-Vibe-Projekte (1–10)

1. **Die Erklärer-App** – Lass die KI eine Funktion schreiben und dann **sich selbst erklären**: „Erkläre mir diesen Code so, als wäre ich 10 Jahre alt."

2. **Fehler absichtlich bauen** – Bitte die KI, Code zu schreiben, der **einen spezifischen Rust-Fehler** provoziert. Dann verstehe den Fehler.

3. **Ownership-Visualisierer** – Die KI schreibt Code mit ASCII-Diagrammen in Kommentaren, die Ownership zeigen.

4. **Analogie-Programm** – Bitte um Code zu einem Konzept **plus** einer Alltagsanalogie in Kommentaren.

5. **Code-Vergleicher** – Lass die KI dasselbe Problem auf drei Arten lösen: mit Schleife, mit Iterator, mit Rekursion.

6. **Kommentier-Challenge** – Die KI schreibt Code **ohne Kommentare**. Du schreibst die Kommentare selbst.

7. **Reparier-Übung** – Bitte die KI, Code zu schreiben, der **absichtlich einen Fehler** enthält. Finde und repariere ihn selbst.

8. **Typ-Quiz** – Die KI schreibt Variablen ohne Typ-Annotationen. Du fügst sie hinzu und lässt danach prüfen.

9. **Refactor-Session** – Gib der KI schlechten, unleserlichen Code. Lass ihn verbessern und erkläre, warum jede Änderung sinnvoll ist.

10. **Mini-Spiel erklärt** – Die KI baut ein Würfelspiel (10 Zeilen) und erklärt alles in Extra-Kommentaren.

---

### 🟡 Mittlere Vibe-Projekte (11–25)

11. **Persönlicher Assistent** – Eine CLI-App, die Notizen mit Datum speichert. Du beschreibst die Funktion – die KI baut, du analysierst.

12. **Quiz-App** – Die KI baut eine Multiple-Choice-Quiz-App. Du verstehst, wie Vektoren von Structs funktionieren.

13. **Habit-Tracker** – Täglich erledigte Aufgaben markieren und Statistiken ausgeben.

14. **Rezept-Manager** – Zutaten und Mengen verwalten – die KI plant das Daten-Modell, du verstehst die Structs.

15. **Tagesplan-App** – Aufgaben mit Zeitfenstern – Prioritäten, Ausgabe, Sortierung.

16. **Wetter-Simulator** – Zufällige Wetterdaten generieren und auswerten (ohne echte API).

17. **Sparschwein-Rechner** – Monatlich sparen, Zinsen berechnen, Ziel erreichen – mit Diagramm im Terminal.

18. **Horoskop-Generator** – Sternzeichen eingeben, zufällige Vorhersage ausgeben. Wichtig: Wie funktioniert der Zufall in Rust?

19. **Morse-Code-Übersetzer** – Deutsch → Morse → Deutsch. Die KI baut, du verstehst `match`.

20. **Kalorienzähler** – Mahlzeiten eingeben, Kalorien summieren, Tagesziel vergleichen.

21. **Farb-Mixer** – RGB-Werte mischen und den resultierenden Farbton beschreiben.

22. **Tippgeschwindigkeit-Test** – Zeit messen, wie lange der Nutzer braucht, einen Text abzutippen.

23. **Schulnotenrechner** – Noten eingeben, Durchschnitt, Bestanden/Nicht Bestanden, Statistiken.

24. **Mini-Bibliothek** – Bücher verwalten: Titel, Autor, ISBN, Ausgeliehen/Verfügbar.

25. **Sprichwort-App** – Zufällige Sprichwörter ausgeben – Vektoren, Zufallszahlen, Indexierung.

---

### 🔴 Fortgeschrittene Vibe-Projekte (26–40)

26. **To-Do-CLI mit Dateispeicherung** – Die KI baut eine vollständige To-Do-App, die in einer Datei speichert. Du verstehst `fs::read_to_string` und `fs::write`.

27. **Zeiterfassung** – Zeiten für Projekte erfassen, Berichte ausgeben – du lernst `chrono`.

28. **Passwort-Vault** – Passwörter mit einem Master-Passwort verschlüsseln. Du lernst Hashing-Konzepte.

29. **RSS-Feed-Reader** – Eine URL abrufen, XML-Daten parsen, Nachrichten ausgeben.

30. **JSON-Datei-Editor** – JSON laden, Werte ändern, wieder speichern – `serde_json` im Einsatz.

31. **Markdown-zu-HTML** – Einfache Markdown-Regeln (Überschriften, fett, kursiv) in HTML umwandeln.

32. **Datei-Duplikat-Finder** – Alle Dateien in einem Ordner auf Duplikate prüfen (via Hash).

33. **Git-Log-Analyse** – `git log` parsen und Statistiken ausgeben (wer hat wie oft committed?).

34. **Terminal-Dashboard** – Systeminfos (CPU, RAM, Laufzeit) im Terminal anzeigen.

35. **Spell-Checker (simpel)** – Wörter gegen eine Wortliste prüfen, Ähnlichkeiten vorschlagen.

36. **Verschlüsselungs-App** – XOR-Verschlüsselung für Dateien – die KI erklärt Bitoperationen.

37. **Dependency-Analyzer** – `Cargo.toml` lesen und alle Dependencies auflisten.

38. **Code-Zähler** – Zeilen Code, Kommentare und Leerzeilen in einer Rust-Datei zählen.

39. **Konfigurations-Loader** – Eine `.toml`-Datei einlesen und Einstellungen anwenden.

40. **Web-Scraper (simpel)** – Eine Webseite herunterladen und Text-Inhalte extrahieren.

---

### ⚡ Vibe-Coding-Herausforderungen (41–50)

41. **Vollständige Blog-Engine (CLI)** – Beiträge erstellen, bearbeiten, löschen, ausgeben – alles im Terminal, alles in Dateien gespeichert.

42. **Mini-Datenbank** – Eine einfache Key-Value-Datenbank, die in einer Datei speichert. Du lernst Serialisierung.

43. **Aufgaben-Scheduler** – Tasks mit Zeitplan eintragen, zu bestimmten Zeiten als fällig markieren.

44. **Multi-User-Notizen** – Mehrere Nutzerprofile, je eigene Notizen – `HashMap<String, Vec<String>>`.

45. **Spielwelt-Generator** – Zufällige Karte generieren, auf der du durch Räume wandern kannst.

46. **Sprachtrainer** – Vokabeln mit Lernstatistik – wie oft richtig, wie oft falsch, welche Strategie?

47. **Pomodoro-Timer** – Arbeits- und Pausenintervalle messen und anzeigen.

48. **KI-Tagebuch** – Du schreibst Einträge, die KI fasst wöchentlich zusammen (als simulierte KI-Funktion im Code).

49. **Einfaches Betriebssystem-Spielzeug** – Ein Mini-Shell, das Befehle wie `ls`, `echo` und `pwd` simuliert.

50. **Dein Vibe-Coding-Abschlussprojekt** – Beschreibe der KI deine eigene Idee. Lass sie bauen. Verstehe alles. Präsentiere es.

---

## 🔍 Vibe Coding im Vergleich

| | GitHub Copilot | IDE KI-Agent | Vibe Coding |
|---|---|---|---|
| **Wer gibt die Richtung?** | Du (durch Tippen) | Du (durch Aufgaben) | Du (durch Beschreibungen) |
| **Wer schreibt den Code?** | Copilot schlägt vor, du tippst | Agent schreibt, du genehmigst | KI schreibt fast alles |
| **Kontrolle** | Hoch | Mittel (Planungsmodus) | Gering bis mittel |
| **Lernkurve** | Niedrig | Mittel | Hoch (wenn unbewusst genutzt) |
| **Bestens für** | Aktives Coden mit Unterstützung | Projektstruktur und Refactoring | Prototypen und Exploration |

---

## 💡 Zusammenfassung

| Konzept | Bedeutung |
|---|---|
| Vibe Coding | KI schreibt Code, Mensch gibt Vision |
| Exploratives Vibe Coding | Konzepte durch Beispiele entdecken |
| Produktives Vibe Coding | Schnell Projekte aufbauen und dann verstehen |
| Iteratives Vibe Coding | Code schrittweise mit KI verbessern |
| Lernender Vibe-Coder | Jede Zeile erklären können – nicht nur ausführen |

> 🦀 **Die wichtigste Lektion:**  
> Vibe Coding ist kein Abkürzung vom Lernen.  
> Es ist eine **andere Art, zu lernen** – wenn du dabei aktiv bleibst.  
> Wer vibecoded und dabei denkt, lernt schnell.  
> Wer vibecoded und dabei schläft, lernt nichts.

---

## 📚 Weiterführende Links

- [Andrej Karpathy über Vibe Coding](https://x.com/karpathy) – Der Ursprung des Begriffs
- [Rust-Buch](https://doc.rust-lang.org/book/) – Ohne Grundlagen kein gutes Vibe Coding
- [Antigravity IDE](https://antigravity.google/docs) – Vibe Coding mit Agentenunterstützung
- [Cursor](https://cursor.sh/) – Einer der beliebtesten Vibe-Coding-Editoren
- [Rust Playground](https://play.rust-lang.org/) – Vibe Coding ohne lokale Installation testen
