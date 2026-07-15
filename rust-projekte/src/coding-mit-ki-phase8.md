# 💡 Phase 8: Idiomatisches Programmieren (Ausdrücke & Lambdas)

Willkommen in Phase 8 deiner Reise! Bisher hast du gelernt, wie du Programme schreibst, die funktionieren. Jetzt gehen wir einen Schritt weiter: Wir schreiben Code, der nicht nur funktioniert, sondern **elegant, lesbar und ausdrucksstark** ist. Man nennt diesen Stil auch **idiomatisch**.

Beim Programmieren gibt es oft zwei grundlegende Denkweisen:
1. **Imperativ ("Wie"):** Du erklärst dem Computer Schritt für Schritt jeden einzelnen Zwischenschritt (z. B. mit klassischen Schleifen und Variablen, die ständig ihren Wert ändern).
2. **Deklarativ/Idiomatisch ("Was"):** Du beschreibst, *was* mit den Daten passieren soll, und überlässt die Details dem System (z. B. durch Ausdrücke, Iteratoren und kleine, anonyme Hilfsfunktionen).

In diesem Kapitel erfährst du, wie du mithilfe von KI lernst, imperative Schleifen in elegante funktionale Pipelines zu verwandeln und repetitive Aufgaben durch geschickte Texttransformationen und reguläre Ausdrücke (RegEx) zu automatisieren. Das Beste daran: Diese Konzepte sind in fast jeder modernen Programmiersprache (wie Python, JavaScript/TypeScript, Java, C++, Rust) identisch!

---

## 🧠 Theorie

### 1. Fortgeschrittenes Refactoring: Vom "Wie" zum "Was"
Klassische Schleifen (`for`, `while`) sind oft fehleranfällig. Man muss Indizes verwalten, Zwischenzustände speichern und läuft Gefahr, sich um eins zu verzählen (der berüchtigte "Off-by-one-Error"). 

Idiomatische Sprachen bieten hierfür das concept der **Datenströme (Iteratoren)** und **anonymen Funktionen (Lambdas / Closures)**:

*   **Iteratoren:** Sie repräsentieren einen Strom von Elementen, den du Schritt für Schritt verarbeiten kannst.
*   **Lambdas / Closures:** Das sind winzige, namenlose Funktionen, die du direkt als Argument an andere Funktionen übergeben kannst. Sie eignen sich perfekt, um kurze Rechenregeln zu definieren (z. B. `x => x * 2`).
*   **Die funktionalen Bausteine:**
    *   `map`: Wendet eine Funktion auf jedes Element des Stroms an und transformiert es.
    *   `filter`: Prüft jedes Element anhand einer Bedingung und behält nur diejenigen, die diese erfüllen.
    *   `reduce` (oder `fold`): Kombiniert alle Elemente des Stroms Schritt für Schritt zu einem einzigen Gesamtwert (z. B. zur Summe oder zum Produkt).

Durch das Aneinanderketten (*Chaining*) dieser Bausteine entsteht eine Pipeline, die wie ein Fließband in einer Fabrik funktioniert: Rohdaten rein $\rightarrow$ Filtern $\rightarrow$ Transformieren $\rightarrow$ Ergebnis raus.

> [!TIP]
> **Lern-Prompt für deinen KI-Tutor:**
> *"Ich habe hier eine klassische imperative Schleife geschrieben [Füge deinen Code ein]. Ich möchte lernen, diesen Code deklarativer und idiomatischer mit Iteratoren (wie map, filter) zu gestalten. Erkläre mir Schritt für Schritt, wie ich den Datenfluss umbauen kann, ohne mir direkt die fertige Lösung zu verraten. Stelle mir Fragen, die mich zur Lösung führen."*

---

### 2. Automatisierung repetitiver Aufgaben: Reguläre Ausdrücke (RegEx)
Reguläre Ausdrücke sind Suchmuster für Texte. Sie sind extrem mächtig, um unstrukturierte Daten zu durchsuchen, zu validieren oder umzuwandeln. Da RegEx-Syntax jedoch sehr kompakt und kryptisch wirken kann, ist sie ein ideales Einsatzgebiet für KI-Assistenten.

Anstatt RegEx-Muster auswendig zu lernen, solltest du lernen, wie du der KI präzise beschreibst, was du filtern möchtest, und dir den Ausdruck erklären lässt.

Typische Anwendungsbereiche:
*   **Validierung:** Prüfen, ob eine Eingabe das Format einer E-Mail, Postleitzahl oder Telefonnummer hat.
*   **Extraktion:** Aus einer langen Log-Datei gezielt alle IP-Adressen herausfiltern.
*   **Transformation:** Textmuster finden und durch strukturierte Formate ersetzen.

> [!TIP]
> **Lern-Prompt für deinen KI-Tutor:**
> *"Ich brauche einen regulären Ausdruck, um [beschreibe das gesuchte Muster, z. B. Datumsangaben im Format TT.MM.JJJJ] aus einem Text zu filtern. Generiere mir nicht nur den Ausdruck, sondern schlüssele jedes einzelne Symbol darin auf und erkläre mir didaktisch, was es bewirkt. Gib mir zudem 3 Testfälle (zwei gültige, einen ungültigen), mit denen ich den Ausdruck prüfen kann."*

---

### 3. Algorithmen-Optimierung & Komplexitätsanalyse (Big-O) mit KI
Wenn deine Programme größer werden und mit mehr Daten arbeiten, reicht es oft nicht mehr aus, dass der Code einfach nur funktioniert. Er muss auch effizient sein. Hier kommt die **Komplexitätsanalyse** ins Spiel, meist ausgedrückt in der **Big-O-Notation** (z. B. $O(1)$, $O(n)$, $O(n^2)$). Sie beschreibt, wie sich die Laufzeit (Zeitkomplexität) oder der Speicherbedarf (Speicherkomplexität) deines Programms verhält, wenn die Eingabemenge ($n$) wächst.

Nach den Ansätzen von Software-Experten wie Michael Kofler und Durgesh Rajubhai Pawar ist das Verständnis für Laufzeiten entscheidend, um Softwaredesign richtig zu bewerten. Oft schleichen sich unbemerkt Ineffizienzen in den Code ein – zum Beispiel verschachtelte Schleifen, die bei großen Datenmengen dein Programm extrem verlangsamen ($O(n^2)$). Deine KI ist ein hervorragender Partner, um:
1. **Flaschenhälse zu finden:** Sie kann deinen Code analysieren und dir sagen, welche Teile bei großen Datenmengen langsam werden.
2. **Die Komplexität zu bestimmen:** Sie erklärt dir, welche Big-O-Laufzeit dein aktueller Code hat und warum.
3. **Optimierungspfade aufzuzeigen:** Sie kann dir Tipps geben, wie du durch den Einsatz besserer Datenstrukturen (z. B. HashMaps oder Sets statt Listen) oder anderer Algorithmen die Laufzeit drastisch verbesserst.

> [!TIP]
> **Lern-Prompt für deinen KI-Tutor:**
> *"Ich habe den folgenden Algorithmus geschrieben: [Code einfügen]. Bitte analysiere die Zeit- und Speicherkomplexität in der Big-O-Notation. Erkläre mir Schritt für Schritt, wo der Flaschenhals liegt, und gib mir didaktische Hinweise (keine fertigen Codelösungen!), wie ich den Code optimieren kann (z. B. durch geeignetere Datenstrukturen)."*

---

## 🛠️ Praxis-Aufgaben

Verwende für die folgenden Aufgaben deine bevorzugte Programmiersprache. Versuche zuerst, den imperativen Pseudocode zu verstehen, und übersetze ihn dann mithilfe deines KI-Tutors in idiomatischen Code (funktionale Ausdrücke).

### Aufgabe 1: Filtern und Verdoppeln (Leicht)
Gegeben ist eine Liste von Zahlen. Deine Aufgabe ist es, alle ungeraden Zahlen herauszufiltern und die verbleibenden geraden Zahlen zu verdoppeln.

*   **Imperativer Pseudocode (Ausgangslage):**
    ```text
    Erstelle leere Liste 'ergebnis'
    Für jede 'zahl' in 'zahlen_liste':
        Wenn 'zahl' gerade ist:
            Berechne 'verdoppelt' = 'zahl' * 2
            Füge 'verdoppelt' zur Liste 'ergebnis' hinzu
    ```

*   **Deine Aufgabe:** 
    Setze diese Logik als funktionale Pipeline um.
    ```text
    // Verwende in deiner Programmiersprache:
    // 1. Einen Iterator/Stream aus der zahlen_liste
    // 2. filter (Prüfung auf gerade Zahlen)
    // 3. map (Multiplikation mit 2)
    // 4. Sammle das Ergebnis wieder in einer Liste
    ```

---

### Aufgabe 2: Aggregation und Schwellenwert (Mittel)
Gegeben ist eine Liste von Personen-Objekten mit Name und Alter. Berechne das Durchschnittsalter aller Personen, die mindestens 18 Jahre alt sind (Volljährigkeit).

*   **Imperativer Pseudocode (Ausgangslage):**
    ```text
    Setze 'alter_summe' = 0
    Setze 'anzahl_erwachsene' = 0
    Für jede 'person' in 'personen':
        Wenn 'person.alter' >= 18:
            'alter_summe' = 'alter_summe' + 'person.alter'
            'anzahl_erwachsene' = 'anzahl_erwachsene' + 1
    
    Wenn 'anzahl_erwachsene' > 0:
        'durchschnitt' = 'alter_summe' / 'anzahl_erwachsene'
    Anderenfalls:
        'durchschnitt' = 0
    ```

*   **Deine Aufgabe:** 
    Löse dies elegant mit einer kombinierten Pipeline. Überlege, wie du `filter` und `map` einsetzt und das Ergebnis anschließend aggregierst (z. B. mit einer Summen-Funktion oder `reduce`).

---

### Aufgabe 3: Log-Sanitizer mit RegEx (Schwer)
Du erhältst Zeilen aus einer Log-Datei. Du sollst alle Zeilen finden, die einen "ERROR" enthalten, und aus diesen Zeilen die IP-Adresse extrahieren.

*   **Beispiel-Logzeile:**
    `2026-07-15 08:12:03 [ERROR] Verbindung fehlgeschlagen von IP 192.168.1.42 nach Timeout`

*   **Deine Aufgabe:** 
    1. Entwirf mit der KI ein RegEx-Muster für IPv4-Adressen.
    2. Schreibe eine Pipeline, die die Zeilen filtert (nur Zeilen mit "ERROR").
    3. Extrahiere per RegEx die IP-Adresse aus den gefilterten Zeilen.
    4. Gib die bereinigten IP-Adressen aus.

---

### Aufgabe 4: Komplexitätsanalyse und Optimierung (Mittel/Schwer)
Gegeben ist ein ineffizienter Algorithmus, der doppelte Elemente in einer Liste finden soll. Durch die zwei ineinander verschachtelten Schleifen wächst die Rechenzeit quadratisch mit der Anzahl der Elemente.

*   **Ineffizienter Pseudocode (Ausgangslage):**
    ```text
    Funktion finde_duplikate(liste) {
        Erstelle leere Liste 'duplikate'
        Für jedes 'i' von 0 bis Länge von 'liste':
            Für jedes 'j' von 'i' + 1 bis Länge von 'liste':
                Wenn liste[i] == liste[j] und liste[i] nicht in 'duplikate':
                    Füge liste[i] zu 'duplikate' hinzu
        Return 'duplikate'
    }
    ```

*   **Deine Aufgabe:**
    1. Lass dir von der KI erklären, warum dieser Algorithmus eine Zeitkomplexität von $O(n^2)$ hat.
    2. Verwende einen Lern-Prompt, um zu erfahren, wie du mit einer Hilfsdatenstruktur (z. B. einem *Set* bzw. einer *Menge*) Duplikate in linearer Zeit ($O(n)$) finden kannst.
    3. Setze die optimierte Variante in deiner Programmiersprache um. Verwende ein Code-Gerüst wie dieses:
    ```text
    Funktion finde_duplikate_optimiert(liste) {
        Erstelle ein leeres Set/Menge 'gesehene_elemente'
        Erstelle ein leeres Set/Menge 'duplikate'
        
        // Iteriere über die Liste und nutze die O(1)-Suchzeit des Sets
        // TODO: Vervollständige die Logik hier
        
        Return 'duplikate'
    }
    ```

---

## 🚀 Projektvorschläge

Hier sind zwei Projekte, bei denen du das Gelernte anwenden kannst. Nutze die vorgegebenen Gerüste und frage deine KI gezielt nach Hinweisen, um die Implementierung selbstständig zu schreiben.

### Projekt 1: Der intelligente CSV-Datenanalyst
Schreibe ein kleines Programm, das eine unstrukturierte Textdatei im CSV-Format einliest, fehlerhafte Zeilen aussortiert, die Daten typisiert und statistische Kennzahlen ermittelt.

*   **Sprachneutrales Struktur-Gerüst:**
    ```text
    // Struktur einer Zeile: "Produktname, Preis, Auf_Lager"
    // Beispiel: "Kaffeemaschine, 89.99, true"
    
    Funktion analysiere_daten(zeilen_liste) {
        // 1. Filtere ungültige Zeilen heraus (z. B. falsches Format oder fehlende Werte)
        // 2. Transformiere die Text-Zeilen in strukturierte Datenobjekte
        // 3. Berechne den Gesamtwert aller vorrätigen Produkte (Preis * Menge)
        // 4. Ermittle das teuerste Produkt per Reduktion/Vergleich
        
        // Return: Zusammenfassung (Statistik-Objekt)
    }
    ```

*   **Lern-Prompt:** 
    *"Ich arbeite an einem CSV-Analysten-Projekt und möchte die Datenverarbeitung komplett deklarativ mit map, filter und reduce umbauen. Hilf mir, die Teilschritte gedanklich zu strukturieren. Welche Zwischenschritte muss mein Datenstrom durchlaufen? Gib mir Tipps zur Typumwandlung und Fehlerbehandlung, aber schreibe keinen fertigen Code."*

---

### Projekt 2: Der interaktive Markdown-Link-Extraktor
Entgelte ein Werkzeug, das einen Markdown-Text scannt, alle darin enthaltenen Weblinks sucht, diese validiert und in einer übersichtlichen Liste ausgibt.

*   **Sprachneutrales Struktur-Gerüst:**
    ```text
    // Markdown-Link-Format: [Linktext](https://beispiel.de)
    
    Funktion extrahiere_links(markdown_inhalt) {
        // 1. Definiere ein RegEx-Muster, das Linktext und URL in Gruppen erfasst
        // 2. Finde alle Übereinstimmungen im Text
        // 3. Filtere URLs heraus, die nicht mit "https://" beginnen
        // 4. Transformiere die Treffer in eine Liste von URL-Strings
        
        // Return: Liste der extrahierten URLs
    }
    ```

*   **Lern-Prompt:**
    *"Ich möchte einen Markdown-Link-Extraktor bauen. Wie muss ein regulärer Ausdrück aussehen, der Gruppen für [Linktext] und (URL) separat erfasst? Erkläre mir das Konzept von Capture Groups in RegEx anhand dieses Beispiels und zeige mir, wie ich in meiner Programmiersprache auf diese Gruppen zugreifen kann."*

---

## 💡 Zusammenfassung

| Konzept | Imperativer Ansatz (Wie) | Idiomatischer/Funktionaler Ansatz (Was) | Hauptvorteil |
| :--- | :--- | :--- | :--- |
| **Datenauswahl** | Schleife mit `if`-Bedingung und manuellem Hinzufügen zu neuer Liste. | `.filter(element => bedingung)` | Weniger Code, keine temporären Hilfsvariablen. |
| **Transformation** | Schleife, die Elemente modifiziert und in neuer Liste speichert. | `.map(element => neues_element)` | Klares Mapping von Eingabe zu Ausgabe. |
| **Berechnung / Summe** | Akkumulator-Variable außerhalb der Schleife hochzählen. | `.reduce((summe, element) => summe + element)` | Zustand bleibt lokal und unveränderlich. |
| **Textsuche** | Manuelles Suchen mit `indexOf`, `substring` und vielen Verzweigungen. | Reguläre Ausdrücke (RegEx) | Extrem kompakt und robust bei komplexen Mustern. |
| **Komplexitätsanalyse & Optimierung** | Ineffiziente Algorithmen (z. B. $O(n^2)$ mit verschachtelten Schleifen). | Optimierte Algorithmen (z. B. $O(n)$ durch geschickte Datenstrukturen wie HashMaps/Sets). | Drastische Performance-Gewinne und Ressourceneinsparung bei großen Datenmengen. |

---

## 📚 Links
*   **Didaktischer Hintergrund:** Schau dir in *Kofler, Kapitel 5* die Abschnitte zu funktionaler Programmierung und Lambdas an.
*   **RegEx-Spielwiesen:** Nutze interaktive Online-Tools wie [Regex101](https://regex101.com/), um deine regulären Ausdrücke live an Testdaten auszuprobieren.
*   **Automatisierung & Text:** Lies in *Taulli* nach, wie KI-Prompts gezielt zur Generierung von Suchmustern und Skripten eingesetzt werden können.
*   **Komplexitäts-Visualisierung:** Nutze [Big-O Cheat Sheet](https://www.bigocheatsheet.com/), um ein Gefühl für das Wachstum verschiedener Komplexitätsklassen zu bekommen.
