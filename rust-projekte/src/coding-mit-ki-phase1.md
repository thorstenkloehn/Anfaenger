# 💡 Projektvorschläge: Coding mit KI (Phase 1)

## Willkommen in der Küche des System-Orchestrators! 🧑‍🍳

Egal ob du **Rust, Python, JavaScript, C oder C++** lernst: Die Konzepte des KI-gestützten Programmierens sind universell. In Phase 1 geht es darum zu verstehen, wie du dich vom reinen Code-Schreiber (dem „Linienkoch“) zum System-Orchestrator (dem „Küchenchef“) entwickelst. Du entwirfst die Logik, während die KI dir hilft, das Grundgerüst zu bauen.

Hier findest du **fünf sprachenunabhängige Praxisprojekte**, die speziell darauf ausgelegt sind, das Zusammenspiel zwischen menschlicher Logik und KI-Assistenten zu trainieren.

---

## 🧠 Theorie: Dein sprachenunabhängiger Werkzeugkasten

Um effektiv mit einer KI programmieren zu lernen, musst du wissen, wie du sie bremst, damit sie dir das Denken nicht abnimmt.

### Das Prinzip der „didaktischen Platzhalter“
Wenn du die KI nach einem Code-Gerüst fragst, soll sie die Logik aussparen. Jede Sprache hat dafür eigene Platzhalter, die du in den Gerüsten verwendest:

*   **Rust:** Das Makro `todo!()` (bringt das Programm beim Ausführen zum kontrollierten Absturz).
*   **Python:** Das Schlüsselwort `pass` oder `raise NotImplementedError()`.
*   **JavaScript / TypeScript:** Ein Kommentar `// TODO` oder `throw new Error("Nicht implementiert")`.
*   **C / C++:** Ein Kommentar `// TODO` und die Rückgabe eines leeren Dummy-Wertes (z. B. `return 0;` oder `return false;`).

### Fortgeschrittene Prompting-Verfahren
Wenn einfache Prompts an ihre Grenzen stoßen, helfen dir strukturierte Denkprozesse, die du der KI vorgibst. Diese Verfahren helfen besonders bei komplexen logischen Problemen oder beim Entwurf von Softwarearchitekturen:

*   **Tree of Thoughts (Gedankenbaum):**
    *   *Die Analogie:* Stell dir vor, du stehst vor einem Labyrinth oder planst Züge im Schach. Anstatt einfach den erstbesten Pfad zu wählen und blind loszulaufen, überlegst du an jeder Kreuzung verschiedene Möglichkeiten, bewertest deren Erfolgsaussichten und gehst nur die vielversprechendsten weiter. Sackgassen verwirfst du frühzeitig.
    *   *Das Konzept:* Die KI generiert nicht nur eine einzige Antwortkette, sondern verzweigt sich in verschiedene Lösungswege („Gedanken“). Jeder Schritt wird bewertet, und nur die vielversprechendsten Äste werden weiterverfolgt.
    *   *Nutzen:* Perfekt, um komplexe Algorithmen oder logische Probleme systematisch zu analysieren.
*   **Self-Consistency (Selbstkonsistenz / Mehrheitsentscheid):**
    *   *Die Analogie:* Wenn du eine wichtige medizinische Diagnose brauchst, holst du dir oft Zweit- und Drittmeinungen ein. Wenn drei unabhängige Ärzte zur gleichen Diagnose kommen, bist du dir sehr sicher, dass sie stimmt, selbst wenn einer vielleicht ein kleines Detail anders erklärt.
    *   *Das Konzept:* Du lässt die KI denselben komplexen logischen Gedankengang mehrfach unabhängig voneinander durchlaufen (z. B. in unterschiedlichen Chats). Das Endergebnis, das am häufigsten genannt wird (der Mehrheitsentscheid), ist mit hoher Wahrscheinlichkeit das korrekteste, da es zufällige Denkfehler („Halluzinationen“) der KI herausfiltert.
    *   *Nutzen:* Erhöht die Genauigkeit bei mathematischen Berechnungen, Logikrätseln oder kniffligen Code-Analysen.
*   **Meta-Prompting (Prompten über Prompts):**
    *   *Die Analogie:* Ein Filmregisseur, der nicht selbst schauspielert, sondern dem Hauptdarsteller eine detaillierte Regieanweisung schreibt, wie er die Rolle spielen soll, um die maximale Wirkung beim Publikum zu erzielen.
    *   *Das Konzept:* Du nutzt die KI als „Prompt-Designer“. Sie schreibt oder optimiert für dich die Prompts, mit denen du anschließend arbeitest, um das bestmögliche Ergebnis zu erzielen.
    *   *Nutzen:* Hilft dir, präzise und didaktisch wertvolle System-Prompts zu entwerfen, ohne selbst stundenlang an der Formulierung zu feilen.

### Vibe Coding & die mentalen Klippen

Wenn du mit einer KI programmierst, fühlt sich das oft magisch an. Du gibst ein paar Wünsche ein, und die KI generiert sofort lauffähigen Code. Dieses flüssige, intuitive Programmieren wird oft als **Vibe Coding** bezeichnet. Es birgt jedoch psychologische Gefahren, bei denen du das selbstständige Denken einstellst und die Kontrolle verlierst.

*   **Vibe Coding Anti-Patterns:**
    *   **The Infinite Loop of Fixes (Die Endlosschleife der Korrekturen):**
        *   *Die Analogie:* Stell dir vor, du fährst mit einem Navigationsgerät, das dich fälschlicherweise in eine Sackgasse leitet. Anstatt anzuhalten, auf die Schilder zu schauen und die Karte zu studieren, drückst du einfach immer wieder hektisch auf „Route neu berechnen“, in der Hoffnung, dass das Gerät den Fehler von selbst korrigiert.
        *   *Das Konzept:* Die KI generiert Code mit einem Fehler. Anstatt die Ursache selbst zu ergründen, kopierst du die Fehlermeldung zurück in den Chat und forderer: „Fix das.“ Die KI generiert neuen Code, der einen anderen Fehler wirft. Du kopierst auch diesen zurück... Nach kurzer Zeit hast du einen unlesbaren Code-Dschungel (Spaghetticode), den niemand mehr versteht.
        *   *Die Lösung:* Sobald die KI einen Fehler im zweiten Versuch nicht löst: **Stopp!** Lies die Fehlermeldung selbst durch, analysiere den Code und leite die KI gezielt mit präzisen Hinweisen an.
    *   **Vibe Coding Fatigue (Die Autopilot-Ermüdung):**
        *   *Die Analogie:* Autofahren mit einem hochmodernen Autopiloten auf einer langen, geraden Autobahn. Weil das Auto fast alles alleine macht, schwindet deine Aufmerksamkeit. Du wirst unkonzentriert. Taucht plötzlich ein Hindernis auf, kannst du im passiven Zustand nicht schnell genug reagieren, weil du gar nicht weißt, was gerade im System vor sich geht.
        *   *Das Konzept:* Weil die KI seitenweise funktionierenden Code ausspuckt, wirst du lesemüde. Du kopierst Code, ohne ihn Zeile für Zeile kritisch zu prüfen. Dadurch schleichen sich unbemerkt Logikfehler, Sicherheitslücken oder Performance-Probleme ein.
        *   *Die Lösung:* Bleibe der aktive Fahrer! Jede Zeile Code, die du in dein Projekt übernimmst, musst du vollständig verstanden haben. Nutze die KI als Co-Piloten, der Vorschläge macht, aber behalte die volle Verantwortung.

*   **Rapid Feedback Loops (Schnelle Rückkopplungsschleifen nach Addy Osmani):**
    *   *Die Analogie:* Ein Bildhauer, der nach jedem leichten Meißelschlag kurz einen Schritt zurücktritt, um das Werk aus der Ferne zu begutachten, anstatt mit geschlossenen Augen zehn Minuten lang wild auf den Stein einzuschlagen und erst am Ende die Augen zu öffnen.
    *   *Das Konzept:* Die Geschwindigkeit, mit der du Feedback zu deinen Code-Änderungen erhältst, entscheidet über deinen Lernerfolg. Wenn du zu viel ungetesteten Code anhäufst, wird die Fehlersuche extrem schwer.
    *   *Die Lösung:* Ändere Code immer nur in kleinsten Schritten und teste ihn sofort (Compiler ausführen, Tests starten oder das Skript ausführen). Ein extrem kurzer Zyklus aus „Ändern -> Testen -> Analysieren“ bricht die *Infinite Loop of Fixes* auf, bevor sie entsteht.

*   **Developer Joy & Reduzierung kognitiver Last (nach Gene Kim & Steve Yegge):**
    *   *Die Analogie:* Ein Koch in einer Sterne-Küche, in der das *Mise en Place* perfekt vorbereitet ist: Alle Zutaten sind bereits exakt geschnitten und griffbereit. Der Koch kann sich ganz auf das Abschmecken und Kreieren konzentrieren, statt Zeit mit dem Suchen nach Messern zu verschwenden.
    *   *Das Konzept:* Kognitive Last (mental load) ist die geistige Energie, die du brauchst, um Code zu verstehen. Ist sie zu hoch, schwindet die Motivation.
    *   *Die Lösung:* Die KI sollte deine kognitive Last verringern, indem sie dir Fleißarbeit abnimmt (z. B. das Nachschlagen von Bibliotheks-Syntax). Das steigert deine **Developer Joy** (die Freude am Entwickeln), da du deine mentale Energie für die Architektur und das logische Lösen des eigentlichen Problems nutzen kannst.

*   **Prompt-Versionierung & Prompt-Ops im Team (nach Tomasz Lelek & Artur Skowroński):**
    *   *Die Analogie:* Stell dir vor, du arbeitest in einer Großküche. Wenn jeder Koch sein eigenes Rezept für die Soße im Kopf behält und nach Gefühl würzt, schmeckt das Gericht bei jedem Gast anders. Erst wenn das Rezept exakt aufgeschrieben, an einem zentralen Ort abgelegt und bei jeder Änderung mit einer Versionsnummer versehen wird, bleibt die Qualität der Gerichte im gesamten Team reproduzierbar und stabil.
    *   *Das Konzept:* Prompts – insbesondere System-Prompts, die das Verhalten von KIs in Softwareanwendungen steuern – sind ein vollwertiger Teil deines Quellcodes. Wenn du sie direkt im Code als Zeichenketten (Strings) festschreibst, ist es extrem schwer, Änderungen nachzuvollziehen oder verschiedene Versionen zu vergleichen. Prompt-Ops (Prompt Operations) umfasst den gesamten Lebenszyklus von Prompts: von der Erstellung über das Testen und Versionieren bis zum Deployment.
    *   *Die Lösung:* Speichere System-Prompts in separaten, versionierten Textdateien in deinem Git-Repository. So siehst du bei jedem `git diff`, was sich geändert hat, wer die Änderung vorgenommen hat und warum. Das Programm lädt diese Prompts dann dynamisch zur Laufzeit.

---

## 🛠️ Praxis-Aufgaben: Kleine Fingerübungen

Probiere diese Übungen in deiner Wunsch-Programmiersprache aus:

### Aufgabe A: Den Lernpartner richtig anleiten (System-Prompt)
Gib deiner KI (z. B. ChatGPT, Gemini oder Claude) zu Beginn einer Session folgenden Prompt:
> *„Du bist mein didaktischer Programmier-Tutor für [DEINE SPRACHE, z. B. Python/Rust]. Ich bin ein Einsteiger. Wenn ich dich nach Code frage, gib mir NIEMALS fertige Lösungen. Erstelle stattdessen strukturierte Code-Gerüste mit didaktischen Platzhaltern wie [dein Platzhalter, z. B. pass / todo!() / TODO-Kommentare] in den Funktionsrümpfen. Gib mir Tipps und stelle mir Leitfragen, damit ich die Logik selbst implementieren kann.“*

### Aufgabe B: Compiler- oder Laufzeitfehler verstehen
Provoziere absichtlich einen Fehler (z. B. Division durch Null oder die Verwendung einer undefinierten Variable) und frage die KI:
> *„Hier ist mein Code in [DEINE SPRACHE] und hier ist die Fehlermeldung: [Fehler einfügen]. Bitte erkläre mir den logischen Fehler dahinter anhand einer Analogie aus dem echten Leben, ohne mir den korrigierten Code zu zeigen.“*

### Aufgabe C: Fortgeschrittenes Prompting ausprobieren (Meta-Prompting)
Nutze die KI als Prompt-Designer, um dir einen maßgeschneiderten didaktischen Lern-Prompt für ein beliebiges Programmierthema erstellen zu lassen:
1. Sende der KI folgenden Prompt:
   > *„Du bist ein Experte für Prompt-Engineering. Ich möchte das Konzept [Lernthema, z. B. Schleifen / Fehlerbehandlung / Arrays] in [DEINE SPRACHE] lernen. Schreibe mir einen optimalen, didaktischen Prompt für eine KI. Der Prompt soll die KI anweisen, mir das Thema mit einer Alltagsanalogie zu erklären, mir ein Code-Gerüst mit didaktischen Platzhaltern zu erstellen und mir drei kurze Fragen zur Selbstkontrolle zu stellen. Gib mir nur den Prompt als Kopiervorlage aus.“*
2. Kopiere den generierten Prompt der KI.
3. Öffne einen neuen, leeren Chat (um den Kontext zu bereinigen) und füge den kopierten Prompt dort ein.
4. Arbeite die Antwort der KI durch und versuche, die Platzhalter im bereitgestellten Code-Gerüst selbst auszufüllen.

### Aufgabe D: Der bewusste Ausbruch aus der Korrekturschleife (Vibe Coding Anti-Pattern)
Um zu üben, wie du der *Infinite Loop of Fixes* entkommst und deine Aufmerksamkeit hochhältst:
1. Baue absichtlich einen kleinen Tippfehler oder einen Logikfehler in dein aktuelles Programm ein.
2. Kopiere den Code und die Fehlermeldung in die KI und frage nach einer Lösung.
3. Sobald die KI dir geantwortet hat: **Kopiere den Code nicht direkt!**
4. Vergleiche stattdessen die vorgeschlagene Änderung Zeile für Zeile mit deinem fehlerhaften Code.
5. Schreibe einen kurzen Kommentar über die fehlerhafte Zeile in deinem Code, um in eigenen Worten zu erklären, was die Ursache was, bevor du den Fehler manuell behebst.
6. Führe den Code aus und nutze eine *Rapid Feedback Loop*, um sofort das Ergebnis zu prüfen.

### Aufgabe E: System-Prompts entkoppeln und versionieren (Prompt-Ops)
Um zu lernen, wie man Prompts im Team sauber verwaltet und versioniert:
1. Erstelle in deinem Projektverzeichnis einen Ordner namens `prompts/`.
2. Erstelle darin eine Textdatei `system_prompt_v1.txt` und schreibe dort deine System-Anweisungen hinein (z. B. den Tutor-Prompt aus Aufgabe A).
3. Schreibe ein kurzes, sprachenneutrales Programmgerüst, das diese Datei einliest und den Inhalt zur Laufzeit lädt.
4. Nutze Git, um die Datei zu versionieren. Ändere danach den Text in der Datei ab, erstelle ein Commit und schaue dir mit `git diff` an, wie sich dein System-Prompt verändert hat.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
FUNCTION lade_prompt_aus_datei(dateipfad: Text) -> Text
    // TODO: Öffne die Datei am angegebenen Pfad, lies ihren Inhalt
    // und gib ihn als String zurück.
    RETURN PLATZHALTER
END FUNCTION

FUNCTION main()
    Pfad = "prompts/system_prompt_v1.txt"
    SystemPrompt = lade_prompt_aus_datei(Pfad)
    
    // TODO: Initialisiere den KI-Client mit dem geladenen SystemPrompt
    // und starte die Interaktion.
    PLATZHALTER_INITIALISIERUNG
END FUNCTION
```

---

## 🚀 Projektvorschläge

### 🦖 Projekt 1: Der "Lochkarten-zu-Hochsprache" Übersetzer
*Fokus: Evolution der Softwareentwicklung & Die probabilistische Engine*

**Beschreibung:**
Schreibe ein kurzes Programm in deiner gewählten Sprache, das eine mathematische oder logische Operation (z. B. Modulo `%` oder eine bitweise Verschiebung) durchführt. Lass dir von der KI erklären, wie dieselbe Operation in den früheren Epochen der Softwareentwicklung (Maschinencode und Assembler) gelöst wurde.

**Didaktischer Nutzen (Taulli, Kap. 1 & 2):**
Du verstehst den Weg der Abstraktion und erkennst, dass Programmiersprachen nur Werkzeuge sind, um der Hardware Befehle zu erteilen.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
FUNCTION main()
    Zahl1 = 10
    Zahl2 = 3
    
    // TODO: Berechne den Rest der Division von Zahl1 durch Zahl2 (Modulo)
    Ergebnis = PLATZHALTER
    
    PRINT "Der Rest ist: " + Ergebnis
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *„Ich lerne gerade [DEINE SPRACHE]. Ich möchte ein Programm schreiben, das den Modulo-Wert zweier Zahlen berechnet. Bitte erkläre mir kurz, wie der Modulo-Operator in [DEINE SPRACHE] geschrieben wird. Erkläre mir zusätzlich, wie man eine Modulo-Operation in Assembler (Epoche 2) und in reinem Binärcode (Epoche 1) hätte umsetzen müssen, damit ich den historischen Abstraktionsschritt verstehe.“*

---

### 🧑‍🍳 Projekt 2: Der "Küchenchef"-Taschenrechner
*Fokus: Der Paradigmenwechsel & Das 70%-Problem*

**Beschreibung:**
Plane einen einfachen Konsolen-Taschenrechner. Die KI übernimmt als „Praktikant“ die Fleißarbeit (Einlesen der Tastatureingaben), während du als „Küchenchef“ die Logik übernimmst und dich um die Fehlerbehandlung kümmerst (z. B. Division durch Null abfangen).

**Didaktischer Nutzen (Kim & Yegge, Teil 2; Osmani):**
Du lernst die Aufteilung kennen: Die KI schreibt das Boilerplate (die ersten 70%), du sicherst die Edge Cases und die Logik ab (die kritischen 30%).

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
FUNCTION lies_zahl_von_tastatur() -> Zahl
    // Boilerplate: Text einlesen und in Zahl konvertieren
    // (Lass dies die KI für dich vorbereiten)
    RETURN PLATZHALTER
END FUNCTION

FUNCTION main()
    Zahl_A = lies_zahl_von_tastatur()
    Zahl_B = lies_zahl_von_tastatur()
    Operator = lies_zeichen_von_tastatur() // +, -, *, /
    
    WENN Operator == '/' DANN
        // TODO: Das sind deine 30%! Fange ab, falls Zahl_B gleich 0 ist!
        PLATZHALTER_FEHLERBEHANDLUNG
    SONST
        // Berechne das Ergebnis
    ENDE WENN
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *„Ich möchte in [DEINE SPRACHE] einen Taschenrechner programmieren. Ich möchte die Rechenlogik und die Fehlerbehandlung (wie die Division durch Null) selbst schreiben. Bitte erstelle mir ein Code-Gerüst für das Einlesen von zwei Zahlen und einem Operator von der Konsole. Verwende in den Funktionsrümpfen didaktische Platzhalter, damit ich die eigentliche Berechnung selbst einfügen kann.“*

---

### 💬 Projekt 3: Der Prompt-Baukasten (Temperaturumrechner)
*Fokus: Zero-Shot, Few-Shot, Chain-of-Thought, fortgeschrittene Verfahren & Tool-Setup*

**Beschreibung:**
Erstelle ein Programm zur Umrechnung von Celsius in Fahrenheit. Du programmierst dies jedoch nicht direkt, sondern testest verschiedene Prompting-Methoden an deiner KI, um das beste didaktische Ergebnis zu erzielen.

**Didaktischer Nutzen (Kofler, Kap. 1; Taulli, Kap. 3):**
Du erfährst am eigenen Leib, wie sich die Qualität der KI-Vorschläge verändert, wenn du ihr Kontext und strukturierte Anweisungen gibst.

#### Die Testphasen:
1. **Test 1 (Zero-Shot):** Frage die KI: *„Schreibe mir ein Programm für Temperaturumrechnung in [DEINE SPRACHE].“* (Die KI wird dir fertigen Code ausspucken. Du lernst dabei fast nichts.)
2. **Test 2 (Few-Shot):** Zeige der KI ein Beispiel (z. B. Meilen in Kilometer) und fordere sie auf, das Umrechnungsmuster auf Temperaturen zu übertragen.
3. **Test 3 (Chain-of-Thought):** Sende einen strukturierten Prompt (siehe unten) und vergleiche das Ergebnis.
4. **Test 4 (Meta-Prompting / Gedankenbaum):** Lass dir von der KI einen optimalen Prompt entwerfen, der das Problem über einen „Gedankenbaum“ löst (z. B. indem die KI verschiedene Umrechnungswege vergleicht und bewertet, bevor sie das Gerüst ausgibt).

#### Dein Lern-Prompt für Test 3 (Chain-of-Thought):
> *„Rolle: Du bist mein didaktischer Programmier-Tutor für [DEINE SPRACHE].
> Aufgabe: Erstelle mir ein leeres Code-Gerüst für einen Temperaturumrechner (Celsius zu Fahrenheit).
> Schritte:
> 1. Schreibe als Kommentar die mathematische Formel für die Umrechnung auf.
> 2. Definiere die Funktion `celsius_zu_fahrenheit` mit leeren Rümpfen (nutze Platzhalter).
> 3. Schreibe eine Hauptfunktion, die diese Umrechnung aufruft.
> Regel: Gib mir unter keinen Umständen die fertige mathematische Berechnung im Code aus!“*

---

### 💳 Projekt 4: Der schrittweise IBAN-Validator
*Fokus: Pair Programming zum Lernen & Kontext-Management*

**Beschreibung:**
Entwickle eine vereinfachte IBAN-Validierung für deutsche Konten (beginnt mit `DE` und hat genau 22 Zeichen). Teile das große Problem in kleine Teilfunktionen auf und löse diese nacheinander mit der KI.

**Didaktischer Nutzen (Kofler, Kap. 1 & 2):**
Große Codeblöcke überfordern das Kontextfenster von KIs und führen zu „Halluzinationen“. Du lernst, modular zu programmieren und der KI immer nur kleine Informationshäppchen zu füttern.

#### Die logischen Schritte (sprachunabhängig):
1. **Bereinigen:** Entferne alle Leerzeichen und wandle den String in Großbuchstaben um.
2. **Format-Check:** Prüfe, ob die Länge genau 22 Zeichen beträgt und mit "DE" startet.
3. **Verschieben:** Schneide die ersten 4 Zeichen ab und hänge sie hinten an (z. B. `DE8912345` wird zu `12345DE89`).

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
FUNCTION bereinige_iban(iban: Text) -> Text
    // TIPP: Entferne Leerzeichen und wandle in Großbuchstaben um
    RETURN PLATZHALTER
END FUNCTION

FUNCTION check_format(iban: Text) -> Boolean
    // TIPP: Prüfe Ländercode und Länge
    RETURN PLATZHALTER
END FUNCTION

FUNCTION verschiebe_zeichen(iban: Text) -> Text
    // TIPP: Nutze String-Slicing
    RETURN PLATZHALTER
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt (Schritt 3):
> *„Ich arbeite an einer IBAN-Validierung in [DEINE SPRACHE]. Ich muss die ersten vier Zeichen eines Strings abschneiden und an das Ende des Strings anhängen. Ich weiß nicht, wie man in [DEINE SPRACHE] Teile von Zeichenketten (Slices/Substrings) ausschneidet. Erkläre mir bitte das Konzept des String-Slicings mit Beispielen, ohne die fertige Funktion für mich zu schreiben.“*

---

### 🧠 Projekt 5: Das interaktive Quiz mit Docstrings
*Fokus: Inline-Dokumentation & verständliche Kommentare*

**Beschreibung:**
Baue ein kleines Text-Quiz für die Konsole, das Fragen zu den KI-Grundlagen (wie *Kontextfenster* oder *probabilistische Engine*) stellt und die Benutzereingaben auswertet. Am Ende nutzt du die KI, um professionelle Dokumentationskommentare (Docstrings) für deinen Code zu generieren, um diese zu lernen.

**Didaktischer Nutzen (Kofler, Kap. 2 & 7):**
Du lernst, wie wertvoll gute Code-Dokumentation ist und wie dir KI-Assistenten dabei helfen können, fremden oder eigenen Code blitzschnell zu erklären und zu strukturieren.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
STRUCT Frage
    FrageText: Text
    AntwortA: Text
    AntwortB: Text
    KorrekteAntwort: Zeichen
END STRUCT

// TODO: Lass die KI diesen Bereich mit standardisierten Docstrings dokumentieren!
FUNCTION frage_stellen(frage: Frage) -> Boolean
    PRINT frage.FrageText
    PRINT "a) " + frage.AntwortA
    PRINT "b) " + frage.AntwortB
    Eingabe = lies_tastatur()
    RETURN (Eingabe == frage.KorrekteAntwort)
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *„Hier ist mein Code für ein Konsolen-Quiz in [DEINE SPRACHE]: [Code einfügen]. Bitte generiere für alle Funktionen und Datenstrukturen standardkonforme Dokumentationskommentare (Docstrings) gemäß den Best Practices von [DEINE SPRACHE]. Erkläre darin die Parameter und die Rückgabewerte auf einfache Weise für Einsteiger.“*

---

## 💡 Zusammenfassung: Welches Projekt übt was?

| Projekt | Programmier-Konzepte | KI-Lernkonzept | Didaktischer Fokus |
| :--- | :--- | :--- | :--- |
| **1. Lochkarten-Übersetzer** | Datentypen, Operatoren | Evolution der Software | Verständnis der Abstraktionsebenen |
| **2. Küchenchef-Rechner** | Verzweigungen, I/O | Das 70%-Problem & Reduzierung kognitiver Last | Verantwortung für Fehlerbehandlung übernehmen (Steigerung der *Developer Joy*) |
| **3. Prompt-Baukasten** | Funktionen, Parameter | Prompt-Techniken & fortgeschrittene Verfahren | Optimierung der eigenen Prompts (CoT, ToT, Self-Consistency, Meta-Prompting) |
| **4. IBAN-Validator** | Zeichenketten-Operationen | Kontext-Management & Rapid Feedback Loops | Komplexe Probleme in kleine, testbare Häppchen aufteilen (Vermeidung von *Vibe Coding Fatigue* & *Infinite Loops*) |
| **5. KI-Quiz** | Datenstrukturen (Structs/Klassen) | Inline-Dokumentation | Code verstehen durch automatische Erklärungen |
| **Aufgabe E (Prompt-Ops)** | Dateizugriff (I/O), Konfiguration | Prompt-Ops & Versionierung (Git) | Entkopplung von Prompts und Code für reproduzierbare Ergebnisse im Team |

---

## 📚 Links
* [Learn Prompting - Kostenloser Kurs für Prompt Engineering](https://learnprompting.org/de/)
* [MDN Web Docs: Programmieren für Einsteiger](https://developer.mozilla.org/de/docs/Learn)
* [Die offiziellen Dokumentationen deiner Wunschsprache (z.B. python.org, rust-lang.org)]
