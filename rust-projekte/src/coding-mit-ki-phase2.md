# 💡 Phase 2: Eigene Datentypen (Objektorientierung & Refactoring-Einstieg)

## Willkommen in der Werkstatt des Software-Architekten! 🛠️

In Phase 1 hast du gelernt, wie du einfache logische Abläufe steuerst und die KI als deinen „Küchenhilfen“ für Boilerplate-Code einsetzt. Jetzt gehen wir einen großen Schritt weiter: Wir wechseln von der reinen Ablaufsteuerung zum **Software-Entwurf**. 

Du lernst in diesem Kapitel, wie du eigene Datentypen (wie Klassen oder Datenstrukturen) entwirfst, bestehenden Code aufräumst (Refactoring) und die KI als deinen persönlichen Chef-Architekten und Clean-Code-Coach nutzt. Das Ziel ist nicht, einfach mehr Code zu schreiben, sondern **strukturierteren, lesbareren und wartbareren Code** zu erschaffen.

Egal ob du **Rust, Python, JavaScript, Java oder C/C++** lernst: Die hier gezeigten Konzepte und Prompt-Techniken sind universell anwendbar!

---

## 🧠 Theorie: Fortgeschrittene Konzepte & Prompt-Methoden

Um komplexere Programme ohne Chaos zu entwickeln, benötigst du strukturierte Entwurfsmethoden. Hier sind die Werkzeuge, mit denen du und deine KI ein unschlagbares Team werdet.

### 1. Objektorientiertes und strukturiertes Design mit KI planen
Bevor du anfängst zu tippen, musst du klären: *Welche Daten gehören zusammen und wer darf was mit ihnen tun?*
*   **Datenstrukturen (Structs/Records):** Reine Datenspeicher ohne eigene Logik (z. B. eine Adresse mit Straße, PLZ und Ort).
*   **Klassen (Objekte):** Kombinieren Daten (Attribute) und Verhalten (Methoden). Sie schützen ihre Daten oft vor direktem Zugriff von außen (Kapselung).

Wenn du die KI nach einem Entwurf fragst, neigt sie dazu, sofort seitenweise Code auszugeben. Bremse sie aus! Lass dir zuerst ein **UML-artiges Diagramm** oder eine textuelle Struktur der Daten und Methoden erstellen.

---

### 2. Fortgeschrittenes Prompt-Engineering: Contract-First & Explain-Then-Implement
Zwei mächtige Techniken verhindern, dass die KI dir den Code-Entwurf abnimmt:

*   **Contract-First (Schnittstellendesign):**
    Du definierst zuerst den „Vertrag“ einer Funktion oder Klasse – also ihren Namen, die Parameter (Eingaben) und den Rückgabetyp (Ausgaben) sowie das erwartete Verhalten (z. B. via Docstring). Erst wenn dieser Vertrag steht, wird die eigentliche Logik implementiert.
*   **Explain-Then-Implement (Erst erklären, dann bauen):**
    Bevor die KI Code ausgibt, must sie dir in eigenen Worten erklären, *wie* sie das Problem lösen will. Dadurch verstehst du die Logik hinter der Lösung und verhinderst blindes Copy-Paste.

---

### 3. Kontext-Management: Session-Architekturen optimal steuern
Mit der Größe deines Projekts wächst auch der Chat-Verlauf. Jede KI hat ein begrenztes Kontextfenster. Wird dieses zu voll, fängt sie an, Details zu vergessen oder zu halluzinieren.
*   **Tipp 1: Trenne deine Sessions!** Eröffne für jedes neue Modul oder jede Klasse einen neuen Chat.
*   **Tipp 2: Das Status-Update.** Bevor du in einem neuen Chat weiterarbeitest, gib der KI eine kurze Zusammenfassung deines bisherigen Systemzustands.
*   **Tipp 3: Ein- und Ausgabelogik trennen.** Halte deine Berechnungslogik getrennt von der Konsolenein- oder -ausgabe. So bleibt der Kontext schlank und der Code leicht zu testen.

---

### 4. Praxisprojekt planen: Ein modulares Sudoku-Spielfeld
Wie planen wir ein Sudoku? Ein gutes Design bricht das Problem herunter:
1.  **Die Zelle:** Braucht einen Wert (1–9) und einen Status (ob sie vom Spiel vorgegeben oder vom Spieler editierbar ist).
2.  **Das Spielfeld (Grid):** Besteht aus 9x9 Zellen. Es muss prüfen können, ob ein Zug gültig ist (Zeile, Spalte und 3x3-Block validieren).
3.  **Die Spiel-Engine:** Steuert den Ablauf (Zahl eingeben, Spielstand prüfen).

Durch diese Modularität können wir jedes Element einzeln entwerfen und testen.

---

### 5. Code lesbarer schreiben & Magic Numbers eliminieren
Schlechter Code ist schwer zu verstehen. Guter Code dokumentiert sich fast von selbst:
*   **Sprechende Bezeichner:** Benenne Variablen nach ihrem Zweck, nicht nach ihrem Datentyp (z. B. `let verbleibende_versuche = 3;` statt `let v = 3;`).
*   **Keine "Magic Numbers":** Verwende keine nackten Zahlen mitten im Code. Definiere stattdessen Konstanten!
    *   *Schlecht:* `let preis = basis * 1.19;`
    *   *Gut:* `const MEHRWERTSTEUERSATZ = 1.19; let preis = basis * MEHRWERTSTEUERSATZ;`

---

### 6. Code Smells mit der KI erkennen
**Code Smells** sind Indikatoren dafür, dass im Code etwas unsauber entworfen wurde (auch wenn das Programm fehlerfrei läuft). Typische Smells:
*   **Long Method:** Eine Funktion macht zu viele Dinge auf einmal und ist länger als 20–30 Zeilen.
*   **Primitive Obsession:** Verwendung von einfachen Datentypen für komplexe Konzepte (z. B. eine E-Mail-Adresse als einfacher String statt als eigener Typ `Email`).
*   **Nested Conditions:** Zu tief verschachtelte `if`-Abfragen, die den Code unlesbar machen ("Arrow Anti-Pattern").

---

### 7. UI/UX & Frontend-Prototyping mit KI
Wenn du moderne Web- oder App-Oberflächen gestaltest, kann dir die KI als kreativer UI/UX-Designer und Frontend-Spezialist zur Seite stehen. Der Entwicklungsprozess von einer ersten Skizze bis zur interaktiven Oberfläche lässt sich durch gezielte Prompts hervorragend begleiten:

*   **UI-Mockups & Layouts generieren:**
    KIs können schnell HTML/CSS-Gerüste, Flexbox- oder Grid-Strukturen erzeugen. Nutze hierbei das Prinzip des **iterativen Verfeinerns**: Lass dir erst das grobe Layout (z. B. Header, zweispaltiger Inhaltsbereich, Footer) ausgeben, bevor du dich um Detailfragen wie Farben, Abstände oder Schriftarten kümmerst.
*   **Figma-zu-Code Workflows:**
    Mit multimodalen KIs kannst du einen Screenshot eines Figma-Entwurfs oder einer Handzeichnung hochladen und die KI bitten, diese Struktur in Code zu übersetzen.
    *Tipp:* Verlange von der KI, dass sie CSS-Variablen (Custom Properties) für Farben und Abstände anlegt. Das hält den Code sauber und leicht anpassbar.
*   **Didaktische Trennung von Struktur und Design:**
    Lass dir keine fertigen, überladenen CSS-Designs ausgeben. Lerne stattdessen zu verstehen, *wie* die CSS-Regeln für das Layout sorgen. Bitte die KI um Erklärungen zu Flexbox-Achsen oder Grid-Templates mit didaktischen Platzhaltern für den eigentlichen Inhalt.

---

### 8. Technische Schulden (Technical Debt) im KI-Zeitalter & Refactoring-Kampagnen
Wenn du unter Zeitdruck programmierst, wählst du oft die schnellste statt der saubersten Lösung. In der Softwareentwicklung nennen wir das **Technische Schulden** (Technical Debt). Wie bei echten Schulden musst du dafür „Zinsen“ zahlen: Jedes neue Feature dauert länger, und das System wird instabiler, bis du die Schulden durch Aufräumen (Refactoring) wieder abbezahlst.

#### Der KI-Katalysator für schnellen Software-Müll
Im Zeitalter generativer KI ist die Versuchung riesig, technischen Müll anzuhäufen. Da die KI Code in Sekundenschnelle generiert, kopieren viele Entwickler riesige Blöcke unbesehen in ihr Projekt. Nach Tomasz Lelek und Artur Skowroński führt diese unkontrollierte Code-Generierung zu massiven Problemen:
*   **Konzeptlose Flickschusterei:** Da die KI keinen echten Gesamtüberblick über dein Projekt hat, schlägt sie lokal funktionierende, aber global inkonsistente Lösungen vor.
*   **„Code Bloat“ (Aufgeblähter Code):** Es wird viel mehr Code generiert und behalten, als eigentlich notwendig wäre.
*   **Wissensverlust:** Wenn du den generierten Code nicht Zeile für Zeile verstehst, kannst du ihn bei Fehlern auch nicht reparieren. Du wirst abhängig von der KI.

#### Strukturierte Refactoring-Kampagnen planen
Um nicht im KI-generierten Chaos zu versinken, solltest du Refactoring nicht als einmaligen Großputz sehen, sondern als fortlaufende, strukturierte **Kampagnen**. Die KI kann dabei dein Assistent sein – wenn du das Heft in der Hand behältst:

1.  **Analysieren & Hotspots identifizieren:** Bevor du aufräumst, musst du wissen, wo es am meisten brennt. Lass die KI deinen Code nach *Code Smells* analysieren und eine Prioritätenliste (Hotspots) erstellen.
2.  **Inkrementelles Vorgehen (Mikro-Refactorings):** Fordere die KI niemals auf, „den gesamten Code aufzuräumen“. Teile das Vorhaben in winzige Teilschritte auf (z. B. eine einzelne Funktion aufspalten, eine Magic Number ersetzen).
3.  **Refactoring-Plan einfordern:** Nutze die KI, um vorab einen konkreten Schritt-für-Schritt-Plan zu entwerfen.
4.  **Testgetriebene Sicherheit:** Lass dir von der KI Testfälle vorschlagen, um sicherzustellen, dass dein Refactoring das Verhalten des Programms nicht verändert.

> [!IMPORTANT]
> **Die goldene Regel:** Die KI schlägt Änderungen vor, aber du entscheidest, welcher Schritt als Nächstes gemacht wird, und validierst das Ergebnis. Lass dich nicht zum reinen Copy-Paste-Roboter degradieren!

---

### 9. Entwurfs-Muster (Design Patterns) & Over-Engineering mit KI
Wenn du mit der KI über Software-Architektur sprichst, wird sie dir schnell klassische Entwurfsmuster (wie das *Strategy-*, *Observer-* oder *Factory-Pattern*) vorschlagen. Diese Muster sind bewährte Schablonen für wiederkehrende Designprobleme. Doch Vorsicht: Im KI-Zeitalter droht hier eine große Gefahr: **Over-Engineering**.

Nach Pawar und Lelek neigen generative KIs dazu, Architekturen unnötig komplex zu gestalten, da sie auf Unmengen von akademischem und hochgradig abstrahiertem Code trainiert wurden. Sie schlagen oft fünf Klassen und drei Schnittstellen vor, wo eine einfache, zehnzeilige Funktion vollkommen ausgereicht hätte.
*   **YAGNI (You Aren't Gonna Need It):** Implementiere Dinge erst, wenn du sie wirklich brauchst. Lass dir von der KI nicht einreden, dass du für ein einfaches Skript ein erweiterbares Plugin-System benötigst.
*   **KISS-Prinzip (Keep It Simple, Stupid):** Halte den Code so einfach wie möglich.
*   **Die KI-Steuerung:** Fordere die KI explizit auf, dir das *einfachste* Design vorzuschlagen. Frage sie kritisch: *„Warum ist dieses Entwurfsmuster hier wirklich notwendig und welche Nachteile (z. B. zusätzliche Komplexität) bringt es mit sich?“*

---

### 10. Barrierefreiheit (Accessibility / a11y) mit KI
Barrierefreie Software stellt sicher, dass alle Menschen – auch solche mit Seh-, Hör- oder motorischen Einschränkungen – deine Anwendung nutzen können. Der renommierte Entwickler Addy Osmani beschreibt, wie moderne, multimodale KIs (die neben Text auch Bilder verstehen können) ein mächtiges Werkzeug für **Accessibility-Audits** sein können.

Du kannst die KI auf verschiedene Weisen als deinen a11y-Coach nutzen:
*   **Visuelle Audits (Multimodalität):** Lade einen Screenshot deines User Interfaces hoch und bitte die KI, das visuelle Design auf Barrierefreiheit zu prüfen (z. B. unzureichende Farbkontraste zwischen Text und Hintergrund oder fehlende sichtbare Tastatur-Fokus-Rahmen).
*   **Semantisches HTML und ARIA:** KIs können HTML-Strukturen analysieren und prüfen, ob Screenreader die Seite korrekt vorlesen können (z. B. durch den richtigen Einsatz von `aria-*`-Attributen und semantischen Elementen wie `<main>`, `<nav>` oder `<button>`).
*   **Alt-Text-Generierung:** Übergib der KI ein Bild und lass dir didaktisch wertvolle Alternativtexte (`alt`-Attribute) vorschlagen, die den Inhalt des Bildes präzise für blinde Nutzer beschreiben.

---

## 🛠️ Praxis-Aufgaben: Kleine Fingerübungen

Probiere diese kleinen Aufgaben in deiner Wunsch-Programmiersprache aus:

### Aufgabe A: Den "Contract-First" Prompt testen
Erstelle einen Prompt, der die KI zwingt, nur die Schnittstelle einer Klasse für einen Bibliothekskatalog zu entwerfen.
*   **Dein Prompt:**
    > *„Ich lerne gerade Softwaredesign in [DEINE SPRACHE]. Ich möchte eine Klasse/Struktur `Buch` und eine Klasse `Bibliothek` entwerfen. Bitte erstelle mir nur die Schnittstellen (Klassendefinitionen, Methodennamen, Parameter und Rückgabetypen) als Code-Gerüst mit didaktischen Platzhaltern. Implementiere noch keinerlei Logik. Erkläre mir vor dem Code kurz in zwei Sätzen, warum diese Struktur sinnvoll gewählt ist.“*

### Aufgabe B: Explain-Then-Implement erzwingen
Stelle der KI ein logisches Problem (z. B. die Validierung eines Passworts nach bestimmten Regeln) und fordere sie auf, erst den Algorithmus auf Deutsch zu erklären.
*   **Dein Prompt:**
    > *„Ich muss eine Funktion schreiben, die prüft, ob ein Passwort mindestens 8 Zeichen, eine Zahl und ein Sonderzeichen enthält. Bevor du mir ein Code-Gerüst in [DEINE SPRACHE] mit Platzhaltern erstellst, erkläre mir bitte in drei klaren Schritten als Text, wie die Validierungslogik aufgebaut sein sollte. Erst wenn ich 'Start' schreibe, gibst du mir das leere Code-Gerüst.“*

### Aufgabe C: Magic Numbers aufspüren
Gib der KI ein kurzes, schlecht lesbares Code-Beispiel und lass dir Verbesserungsvorschläge machen, ohne den fertigen Code zu bekommen.
*   **Dein Prompt:**
    > *„Hier ist ein Code-Snippet: `let dauer = tage * 86400;`. Identifiziere die Magic Number in dieser Zeile. Erkläre mir, warum dies ein Problem für die Lesbarkeit ist, und zeige mir in [DEINE SPRACHE] ein Beispiel, wie man diese Zahl durch eine sauber benannte Konstante ersetzt.“*

### Aufgabe D: Prototyping mit einem Layout-Prompt
Erstelle einen Prompt, um die grundlegende Struktur einer Benutzeroberfläche zu planen, ohne dass die KI dir das eigentliche Design abnimmt.
*   **Dein Prompt:**
    > *„Ich möchte ein responsives 3-Spalten-Layout (Sidebar links, Hauptinhalt mittig, Info-Bereich rechts) mit HTML und CSS entwerfen. Auf kleinen Bildschirmen sollen die Spalten untereinander gestapelt werden. Erstelle mir das HTML- und CSS-Gerüst. Nutze didaktische Platzhalter für Styling-Details wie Hintergrundfarben und Abstände und kommentiere die Grid- oder Flexbox-Regeln verständlich auf Deutsch. Gib mir keine fertige Designlösung.“*

### Aufgabe E: Planen einer Refactoring-Kampagne
Erstelle einen Prompt, der die KI anleitet, ein Refactoring-Vorhaben in kleine, überschaubare Einzelschritte aufzuteilen (Kampagnen-Planung).
*   **Dein Prompt:**
    > *„Ich habe ein Modul in [DEINE SPRACHE] vorliegen, das über die Zeit sehr unübersichtlich geworden ist (ca. 300 Zeilen Code, alles in einer Datei). Ich möchte dieses refactoren. Bitte erstelle mir noch keinen Code, sondern schlage mir einen Schritt-für-Schritt-Plan (eine Refactoring-Kampagne) vor. Welche Teilschritte sollten wir nacheinander durchführen, um das Risiko von Fehlern zu minimieren? Erkläre die Schritte auf Deutsch.“*

### Aufgabe F: Over-Engineering hinterfragen (nach Pawar / Lelek)
Erstelle einen Prompt, um die KI an einem überkomplizierten Designentwurf zweifeln zu lassen und eine einfachere Lösung einzufordern.
*   **Dein Prompt:**
    > *„Ich möchte ein einfaches Benachrichtigungssystem in [DEINE SPRACHE] schreiben, das eine E-Mail sendet. Die KI hat mir dafür ein komplexes System mit `NotificationManager`, `ObserverPattern` und einer `NotificationFactory` vorgeschlagen. Bitte analysiere diese Struktur und erkläre mir kurz, warum das Over-Engineering sein könnte. Zeige mir anschließend ein minimales Code-Gerüst (mit didaktischen Platzhaltern wie `pass` oder `todo!()`), das das KISS-Prinzip einhält.“*

### Aufgabe G: Accessibility-Audit mit der KI (nach Addy Osmani)
Erstelle einen Prompt, um ein HTML-Formular von der KI auf Barrierefreiheit (a11y) prüfen zu lassen.
*   **Dein Prompt:**
    > *„Ich habe folgendes HTML-Formular für ein Login: [Füge dein HTML-Snippet ein]. Bitte führe ein Accessibility-Audit nach den Empfehlungen von Addy Osmani durch. Welche Probleme findest du bezüglich Screenreader-Tauglichkeit, Tastaturnavigation oder Semantik? Gib mir konkrete Verbesserungsvorschläge, aber zeige mir als Code-Beispiel nur ein leeres, barrierefreies HTML-Strukturgerüst mit Platzhaltern für die Formularfelder.“*

---

## 🚀 Projektvorschläge

### 🧩 Projekt 1: Die modulare Sudoku-Planung
*Fokus: Objektorientiertes Design & Contract-First*

**Beschreibung:**
Entwirf die Datenstrukturen für ein Sudoku-Spielfeld. Es geht hierbei noch nicht um das Lösen des Sudokus, sondern rein um die Repräsentation des Spielfelds im Speicher und die Definition der Schnittstellen, um Werte einzutragen und zu prüfen.

**Didaktischer Nutzen:**
Du lernst, ein komplexes Problem in kleine, logisch abgegrenzte Einheiten aufzuteilen und Schnittstellen sauber zu definieren.

#### Die didaktischen Platzhalter für deine Sprache:
*   **Rust:** `todo!()`
*   **Python:** `pass`
*   **JavaScript / TypeScript:** `throw new Error("Nicht implementiert");`
*   **Java / C++:** `// TODO: Implementierung fehlt` und Standardrückgabe (`return false;` / `return;`)

#### Das abstrakte Code-Gerüst (Pseudocode-Konzept):
```text
CLASS SudokuZelle
    Wert: Ganzzahl // 0 = leer, 1-9 = belegt
    IstVorgegeben: Boolean

    CONSTRUCTOR(wert, ist_vorgegeben)
        // TODO: Initialisiere die Zelle
    END CONSTRUCTOR
END CLASS

CLASS SudokuFeld
    Raster: Array von 9x9 SudokuZellen

    METHOD setze_wert(zeile, spalte, wert) -> Boolean
        // TODO: Setze einen Wert, falls die Zelle nicht vorgegeben ist
        // TIPP: Prüfe vorher, ob der Zug nach den Sudoku-Regeln gültig ist
        RETURN PLATZHALTER
    END METHOD

    METHOD ist_zug_gueltig(zeile, spalte, wert) -> Boolean
        // TODO: Prüfe Zeile, Spalte und den 3x3-Block
        RETURN PLATZHALTER
    END METHOD
END CLASS
```

#### Dein Lern-Prompt für dieses Projekt:
> *„Ich möchte ein Sudoku-Spiel in [DEINE SPRACHE] entwerfen. Ich habe mir ein grobes Klassendesign überlegt. Bitte erstelle mir die Klassen `SudokuZelle` und `SudokuFeld` in [DEINE SPRACHE] als leere Code-Gerüste. Nutze didaktische Platzhalter für die Methodenrümpfe. Schreibe ausführliche Kommentare (Docstrings) an jede Methode, die erklären, was die Parameter bedeuten und was die Methode tun soll. Implementiere keine Logik!“*

---

### 🏚️ Projekt 2: Refactoring einer Legacy-Benutzerverwaltung
*Fokus: Code Smells erkennen & Bezeichner verbessern*

**Beschreibung:**
Du bekommst ein schlecht geschriebenes Modul für eine Benutzerdatenbank. Deine Aufgabe ist es, dieses mithilfe der KI schrittweise zu analysieren, die Code Smells zu benennen und den Code sauber zu refactorn.

**Schlechter Ausgangscode (Beispiel):**
```text
FUNCTION db(u, p, a)
    WENN u == "" ODER p == "" DANN
        RETURN 0
    ENDE WENN
    WENN a < 18 DANN
        RETURN -1
    ENDE WENN
    // Speichern in Liste (Magic Number 120 steht für max. Benutzer)
    WENN liste.laenge() >= 120 DANN
        RETURN -2
    ENDE WENN
    liste.hinzufuegen(u, p, a)
    RETURN 1
END FUNCTION
```

**Didaktischer Nutzen:**
Du trainierst deinen Blick für unsauberen Code. Du lernst, wie du durch aussagekräftige Namen, Konstanten und eigene Datentypen den Code so umschreibst, dass er für jeden Entwickler sofort verständlich wird.

#### Dein Lern-Prompt für dieses Projekt:
> *„Ich habe folgenden schlechten Code in [DEINE SPRACHE] vorliegen: [Füge den schlechten Code ein]. Ich möchte diesen Code verbessern. 
> Bitte erstelle mir eine Liste mit allen 'Code Smells' und Design-Schwächen, die dir auffallen. Erkläre mir bei jedem Punkt kurz, warum er problematisch ist. 
> Erstelle mir anschließend ein leeres, sauberes Code-Gerüst (mit didaktischen Platzhaltern), das zeigt, wie die Struktur nach dem Refactoring aussehen könnte (z. B. durch Verwendung einer Struktur `Benutzer` und sprechenden Konstanten).“*

---

## 💡 Zusammenfassung: Welches Thema übt was?

| Thema / Konzept | Programmier-Herausforderung | KI-Lernkonzept | Didaktischer Fokus |
| :--- | :--- | :--- | :--- |
| **Klassen & Datenstrukturen** | Daten & Verhalten kapseln | Objektorientiertes Planen | Trennung von Daten und Logik verstehen |
| **Contract-First Prompting** | Schnittstellen definieren | Prompt-Technik | Erst über die Schnittstelle nachdenken, dann programmieren |
| **Explain-Then-Implement** | Logik verstehen lernen | KI-Tutor-Steuerung | Keine Generierung von blindem Copy-Paste-Code zulassen |
| **Kontext-Management** | Vermeidung von Chat-Chaos | Session-Architektur | Modular arbeiten und Chats fokussiert halten |
| **Magic Numbers & Clean Code** | Lesbarkeit erhöhen | Code-Qualität | Code schreiben, der ohne Kommentare lesbar es ist |
| **Refactoring & Code Smells** | Legacy-Code aufräumen | Code-Review durch KI | Schwachstellen im Code aufspüren und beheben lernen |
| **UI/UX & Frontend-Prototyping** | Layouts & responsive Strukturen entwerfen | Iterative UI-Generierung & Figma-zu-Code | Strukturierte Trennung von Layout und Design-Details lernen |
| **Technische Schulden & Refactoring-Kampagnen** | Code-Fäulnis durch KI-Generierung verhindern | Inkrementelle Refactoring-Kampagnen | Strukturierte, schrittweise Code-Verbesserung statt blinder Code-Müll |
| **Entwurfs-Muster & Over-Engineering** | Unnötige Komplexität vermeiden | YAGNI & KISS mit KI prüfen | Software-Architektur so einfach wie möglich halten |
| **Barrierefreiheit (a11y) mit KI** | Inklusive Software entwickeln | Multimodale Audits & Semantik | Anwendungen für Screenreader und Tastaturnavigation optimieren |

---

## 📚 Links
* [Clean Code Developer (Deutsch) - Initiative für mehr Softwarequalität](https://clean-code-developer.de/)
* [Refactoring.guru (Deutsch) - Verständliche Erklärungen zu Refactoring und Entwurfsmustern](https://refactoring.guru/de)
* [Fortgeschrittene Prompt-Techniken für Entwickler (Learn Prompting)](https://learnprompting.org/de/docs/intermediate/chain_of_thought)
