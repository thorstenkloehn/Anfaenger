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

## Modulare Prompt-Workflows: Beispiele zum Mitmachen

Hier zeigen wir dir, wie du typische Projekte modular planen und mit Prompts anleiten kannst. *Hinweis: Die KI liefert dir den Code – deine Aufgabe ist es, die Prompts zu senden und den Code Zeile für Zeile nachzuvollziehen!*

### Beispiel 1: Der Passwort-Prüfer

#### 🛠️ Modul 1: Die Datenbasis schaffen
* **Dein Präzisions-Input:** 
  > "Erstelle ein minimales Rust-Programm mit einer `main`-Funktion. Definiere darin ein festes Passwort als unveränderlichen Text (`&str`). Gib einen Begrüßungstext aus. Erkläre kurz den Unterschied zwischen `String` und `&str` in deinem Code."
* **Was die KI im Hintergrund macht:**
  Sie legt die Grundstruktur des Programms an und erklärt dir den Unterschied zwischen statischen Texten (`&str`) und dynamischen Zeichenketten.

#### 🛠️ Modul 2: Die Interaktivität hinzufügen (Benutzereingabe)
* **Dein Präzisions-Input:**
  > "Erweitere den bestehenden Code. Der Benutzer soll nun aufgefordert werden, ein Passwort über die Konsole einzugeben. Speichere diese Eingabe in einem veränderbaren `String`. Erkläre, warum wir hier `&mut` (Borrowing) bei `read_line` nutzen müssen."
* **Was die KI im Hintergrund macht:**
  Sie importiert das Ein-/Ausgabe-Modul (`std::io`), erstellt einen veränderbaren Puffer und bindet die Eingabe über eine veränderliche Referenz ein.

#### 🛠️ Modul 3: Logik & Vergleich einbauen
* **Dein Präzisions-Input:**
  > "Füge nun den Vergleich hinzu. Entferne Leerzeichen und Zeilenumbrüche von der Benutzereingabe mit `.trim()`. Vergleiche die bereinigte Eingabe mit dem festen Passwort aus Schritt 1. Gib 'Zugriff erlaubt' oder 'Zugriff verweigert' aus."
* **Was die KI im Hintergrund macht:**
  Sie baut eine `if/else`-Verzweigung auf und wendet String-Methoden zur Bereinigung an.

---

### Beispiel 2: Ein flexibler Temperatur-Umrechner

#### 🛠️ Modul 1: Eingabe & Umwandlung
* **Dein Präzisions-Input:**
  > "Erstelle ein Rust-Programm, das den Benutzer nach einer Temperatur in Celsius fragt. Lies die Eingabe von der Konsole und konvertiere (parse) sie in eine Fließkommazahl (`f64`). Fange Fehler ab, falls keine gültige Zahl eingegeben wurde."
* **Was die KI im Hintergrund macht:**
  Sie demonstriert die Fehlerbehandlung bei der Typkonvertierung von `String` zu `f64`.

#### 🛠️ Modul 2: Berechnung & Kontrollfluss
* **Dein Präzisions-Input:**
  > "Erweitere das Programm: Berechne die Temperatur in Fahrenheit (Formel: Celsius * 1.8 + 32). Gib das Ergebnis aus. Nutze eine `if/else`-Struktur, um eine Warnung auszugeben, falls die Temperatur über 30 Grad Celsius liegt."
* **Was die KI im Hintergrund macht:**
  Sie fügt die mathematische Formel und eine Kontrollstruktur für Schwellenwerte hinzu.

#### 🛠️ Modul 3: Modularisierung mit Funktionen (Ownership)
* **Dein Präzisions-Input:**
  > "Lagere die Celsius-zu-Fahrenheit-Berechnung in eine eigene Funktion aus. Achte darauf, wie Werte übergeben werden (Ownership). Erkläre, ob der Wert kopiert oder verschoben wird."
* **Was die KI im Hintergrund macht:**
  Sie zeigt dir, wie primitive Datentypen (wie `f64`) in Rust das `Copy`-Trait implementieren und daher ohne Ownership-Probleme an Funktionen übergeben werden können.

---

## So wendest du das Modulare Prinzip auf alle 100 Projekte an

Wenn du ein neues Projekt aus der Liste beginnst, gehe immer nach folgendem Muster vor:

1. **Analysiere das Ziel:** Welche Ein- und Ausgaben sind nötig?
2. **Schneide Module:** Zerlege das Projekt in mindestens 3 Einzelschritte (z.B. 1. Datenstruktur & statische Werte -> 2. Benutzereingabe & Konvertierung -> 3. Logik & Schleifen).
3. **Formuliere Schritt-Prompts:** Frage die KI nach einem Schritt nach dem anderen.
4. **Fordere Erklärungen:** Lass dir von der KI immer erklären, *warum* sie bestimmte Rust-Besonderheiten (wie `&mut`, `.trim()` oder Ownership) in diesem Schritt verwendet hat.
5. **Reflektiere aktiv:** Lies den generierten Code aufmerksam durch. Kannst du den Datenfluss nachvollziehen?

Durch diesen modularen Dialog lernst du nicht nur Rust-Syntax, sondern verinnerlichst auch das algorithmische Denken und den sicheren Umgang mit KI-Assistenten.
