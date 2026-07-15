# 💡 Phase 4: Module, Pfade, Packages & Multi-File (Integration)

## Willkommen in der Welt der modularen Code-Architektur! 🗺️

Bisher hast du gelernt, wie du kleine Programme schreibst und wie du die KI als Tutor für einzelne Funktionen einsetzt. Doch echte Software besteht selten aus nur einer einzigen, riesigen Datei. Wenn dein Projekt wächst, wird es unübersichtlich. Stell dir vor, du würdest alle deine Kleidungsstücke, Werkzeuge und Küchenutensilien in eine einzige große Kiste werfen – das Suchen wäre ein Albtraum!

In dieser Phase lernst du, wie du deinen Code sauber auf mehrere Dateien und Module aufteilst, wie du externe Bibliotheken (Packages) einbindest und worauf du achten musst, wenn dir die KI dabei hilft. Du wirst vom Bastler zum Architekten!

---

## 🧠 Theorie: Dein Werkzeugkasten für große Projekte

### 1. Multi-File-Entwicklung: Die Kunst der Modularisierung
Wenn du deinen Code aufteilst, schaffst du klare Zuständigkeiten (*Single Responsibility Principle*). Jede Datei und jedes Modul sollte genau eine Aufgabe haben.
*   **Die Herausforderung:** KIs neigen dazu, dir riesige Monolithen (alles in einer einzigen Datei) vorzuschlagen, weil das in einer einzelnen Chat-Antwort einfacher zu generieren ist.
*   **Deine Strategie:** Plane die Struktur zuerst auf dem Papier oder im Dialog mit der KI. Definiere, welche Module es geben soll und wie sie miteinander kommunizieren. Nutze Prompts, die der KI vorschreiben, den Code modular aufzuteilen.
*   **Die Analogie:** Ein Restaurant. Es gibt die Küche (Datenverarbeitung), den Service (Benutzeroberfläche) und die Verwaltung (Hauptsteuerung). Sie arbeiten Hand in Hand, sind aber räumlich und organisatorisch streng getrennt.

### 2. Modernisierung von Legacy-Applikationen mit KI
*Legacy-Code* ist alter, oft historisch gewachsener und unstrukturierter Code, der schwer zu verstehen und zu warten ist (oft auch abwertend als „Spaghetti-Code“ bezeichnet).
*   **Die Herausforderung:** Diesen Code manuell zu entwirren, ist mühsam und fehleranfällig. Die Versuchung ist groß, der KI einfach zu sagen: *„Schreibe diesen Code neu und mach ihn schön.“* Das führt jedoch oft zu Fehlern, da die KI die versteckten Details und Edge Cases des alten Codes nicht kennt.
*   **Deine Strategie:** Nutze die KI als Analyse-Werkzeug. Lass dir den alten Code in kleinen Schritten erklären, erstelle mit der KI ein neues, modulares Ziel-Design und ziehe dann Stück für Stück Funktionalität in neue Module um, die du durch Tests absicherst.

### 3. Package-Halluzinationen: Der unsichtbare Schwindel
Um das Rad nicht neu zu erfinden, nutzen wir externe Bibliotheken (*Packages*, *Crates*, *Modules* oder *Libraries*).
*   **Die Herausforderung:** Large Language Models (LLMs) sind probabilistische Textgeneratoren. Sie wissen nicht zwingend, welche Bibliotheken aktuell wirklich existieren. Sie neigen dazu, plausible, aber völlig erfundene Paketnamen und Import-Pfade zu halluzinieren.
*   **Das Risiko:** Neben Frustration, weil der Code nicht baut, gibt es auch Sicherheitsrisiken. Angreifer registrieren manchmal gezielt Schadsoftware unter von KIs häufig halluzinierten Paketnamen (*Typosquatting*).
*   **Deine Strategie:** Vertraue keinem Import oder Paketnamen der KI blind. Prüfe jeden Vorschlag im offiziellen Paketregister deiner Programmiersprache (z. B. crates.io für Rust, pypi.org für Python, npmjs.com für JavaScript/TypeScript).

### 4. API-Dokumentation für externe Abhängigkeiten generieren
Wenn du eine echte, existierende Bibliothek nutzt, kann die Flut an Funktionen und Methoden überwältigend sein.
*   **Die Herausforderung:** Die offizielle Dokumentation ist manchmal schwer zu lesen, unvollständig oder sehr umfangreich.
*   **Deine Strategie:** Du kannst der KI Teile der Dokumentation oder den Namen der Bibliothek geben und sie bitten, dir einen maßgeschneiderten, didaktischen „Spickzettel“ (*Cheat Sheet*) zu erstellen, der genau deine Anwendungsfälle abdeckt – natürlich mit didaktischen Platzhaltern, damit du die Integration selbst schreibst.

### 5. Explainability & Codebase-Exploration / Reverse Engineering: Fremde Codebasen verstehen (nach Durgesh Rajubhai Pawar)
Wenn du in ein bestehendes Projekt einsteigst, stehst du oft vor einem Berg aus Code, den du nicht selbst geschrieben hast. Keine Dokumentation, unübersichtliche Strukturen – pure Überforderung! Hier helfen dir LLMs als "Navigationsgeräte", um dich in einer fremden Codebase zurechtzufinden.
*   **Die Herausforderung:** Lädst du einfach das gesamte Projekt im Chat hoch, verbrauchst du nicht nur massig Token, sondern überforderst auch das LLM. Es verliert den Fokus, übersieht Details oder halluziniert falsche Zusammenhänge. Zudem verstehst du den Code selbst dadurch noch lange nicht.
*   **Deine Strategie:** Gehe methodisch und strukturiert vor (*Top-Down* und *Bottom-Up*):
    1.  **Architektur-Überblick (Top-Down):** Lass dir zuerst die Ordnerstruktur und den Einstiegspunkt (z. B. die `main`-Datei) erklären. Frage die KI: *"Welche Hauptkomponente steuert dieses Projekt und wie fließen die Daten grob?"*
    2.  **Gezieltes Kontext-Management:** Übergib der KI immer nur die Datei(en), die du gerade untersuchst, plus deren direkte Import-Partner. Halte das Kontextfenster klein und fokussiert.
    3.  **Reverse Engineering durch gezielte Prompts:** Bitte die KI nicht um eine bloße Übersetzung, sondern um Erklärungen des Verhaltens:
        *   *"Erstelle mir ein Flussdiagramm (z. B. in Mermaid-Syntax) für den Ablauf in Funktion X."*
        *   *"Welche Nebeneffekte (z. B. Dateizugriffe, Netzwerk-Anfragen) hat diese Methode?"*
        *   *"Warum wurde dieser Algorithmus hier gewählt, und welche Edge Cases deckt er ab?"*

---

## 🛠️ Praxis-Aufgaben: Deine Fingerübungen

### Aufgabe A: Den modularen Plan entwerfen (Architektur-Prompt)
Nimm ein fiktives Projekt (z. B. ein einfaches Text-Abenteuer-Spiel oder eine Notiz-App) und lass dir von der KI eine modulare Dateistruktur vorschlagen.
*   **Dein Lern-Prompt:**
    > *„Ich möchte in [DEINE SPRACHE, z. B. Rust/Python/JavaScript] ein textbasiertes Abenteuerspiel programmieren. Ich möchte von Anfang an sauber modular arbeiten. Bitte erstelle mir einen Vorschlag für eine Dateistruktur (Multi-File) und erkläre kurz, welche Zuständigkeit jede Datei haben soll. Gib mir noch keinen Code, sondern nur den Verzeichnisbaum und eine kurze Erklärung der Architektur.“*

### Aufgabe B: Halluzinations-Detektiv spielen
Stelle der KI eine absichtlich sehr spezifische und ungewöhnliche Aufgabe, um sie herauszufordern.
*   **Dein Lern-Prompt:**
    > *„Welche externe Bibliothek in [DEINE SPRACHE, z. B. Rust/Python] eignet sich am besten, um den Herzschlag einer Katze über ein Audio-Signal zu analysieren? Nenne mir das Paket und den genauen Befehl, um es zu installieren.“*
*   **Deine Aufgabe:** Nimm den Namen des vorgeschlagenen Pakets und suche im offiziellen Paketregister deiner Sprache danach. Existiert es wirklich? Wenn ja, was tut es tatsächlich? Wenn nein, wie hätte eine echte Alternative geheißen?

### Aufgabe C: API-Doku übersetzen lassen
Suche dir eine bekannte Bibliothek aus deiner Programmiersprache aus (z. B. für JSON-Verarbeitung oder HTTP-Anfragen).
*   **Dein Lern-Prompt:**
    > *„Ich nutze in [DEINE SPRACHE] die Bibliothek [NAME DER BIBLIOTHEK, z. B. serde / requests / lodash]. Ich möchte wissen, wie ich damit [dein Ziel, z. B. eine JSON-Datei einlese]. Bitte erstelle mir ein didaktisches Tutorial, das die benötigten Funktionen erklärt, und gib mir ein Code-Gerüst mit Platzhaltern, in dem ich die Integration selbst implementieren kann.“*

### Aufgabe D: Der Codebase-Detektiv (Fremden Code erschließen)
Suche dir eine kleine, quelloffene Funktion oder eine Datei aus einem fremden Projekt (z. B. auf GitHub), deren Funktionsweise du nicht auf Anhieb verstehst.
*   **Dein Lern-Prompt:**
    > *„Ich versuche, folgenden fremden Code zu verstehen. Bitte hilf mir beim Reverse Engineering (nach Durgesh Rajubhai Pawar). Analysiere den Code und erkläre mir: 1. Was ist die Hauptaufgabe dieser Funktion? 2. Welche Eingabewerte werden erwartet und was wird zurückgegeben? 3. Gibt es versteckte Seiteneffekte (wie I/O oder Zustandsänderungen)? Bitte antworte strukturiert und verwende für die Logik-Erklärung Pseudocode. [FÜGE CODE HIER EIN]“*
*   **Deine Aufgabe:** Nutze die Erklärung der KI, um ein kurzes, sprachneutrales Code-Gerüst mit Kommentaren und Platzhaltern zu schreiben, das die Funktionsweise dieser Funktion skizziert.

---

## 🚀 Projektvorschläge

### 📚 Projekt 1: Die modulare Zitat-Verwaltung (Multi-File-Integration)
*Fokus: Modularisierung, Pfade & Imports*

**Beschreibung:**
Erstelle ein Programm, das Zitate speichert und zufällig eines davon auf der Konsole ausgibt. Das Programm soll aus drei separaten Dateien bestehen:
1.  `speicher`: Verwaltet die Liste der Zitate (Laden/Speichern/Hinzufügen).
2.  `anzeige`: Kümmert sich um die Formatierung und Konsolenausgabe.
3.  `main` (oder Haupteinstieg): Verknüpft die Module und steuert den Ablauf.

**Didaktischer Nutzen:**
Du lernst, wie du in deiner Wunschsprache Dateien untereinander verknüpfst (Imports, Includes, Requires oder Modul-Pfade) und wie Daten zwischen Modulen fließen.

#### Die Konzeptskizze der modularisierten Struktur (Pseudocode):

```text
// DATEI: speicher (Modul für Datenhaltung)
FUNCTION lade_zitate() -> Liste von Texten
    // TODO: Zitate aus einer Liste oder Datei laden
    RETURN PLATZHALTER
END FUNCTION

// DATEI: anzeige (Modul für Benutzeroberfläche)
FUNCTION zeige_zitat_an(zitat: Text)
    // TODO: Zitat hübsch formatiert auf der Konsole ausgeben
    PRINT "--- Zitat des Tages ---"
    PRINT zitat
    PRINT "-----------------------"
END FUNCTION

// DATEI: main (Haupteinstiegspunkt)
IMPORT speicher
IMPORT anzeige

FUNCTION start()
    Zitate = speicher.lade_zitate()
    // TODO: Wähle ein zufälliges Zitat aus der Liste aus
    ZufaelligesZitat = PLATZHALTER
    anzeige.zeige_zitat_an(ZufaelligesZitat)
END FUNCTION
```

#### Deine Lern-Prompts für dieses Projekt:
*   **Prompt 1 (Pfade & Imports verstehen):**
    > *„Ich möchte in [DEINE SPRACHE] ein projekt mit drei Dateien anlegen: main, speicher und anzeige. Wie importiere ich Funktionen aus speicher und anzeige in meine main-Datei? Bitte erkläre mir die Syntax für Imports und wie die Dateien im Ordner liegen müssen.“*
*   **Prompt 2 (Modularer Entwurf):**
    > *„Erstelle mir für mein Zitat-Verwaltungsprojekt in [DEINE SPRACHE] die leeren Gerüste für die drei Dateien. Nutze didaktische Platzhalter für die Logik (wie pass / todo!() / TODO-Kommentare), sodass ich die Imports und Funktionssignaturen vor mir habe und die Logik selbst implementieren kann.“*

---

### 🧹 Projekt 2: Der „Legacy-Code“-Staubsauger
*Fokus: Code-Analyse & Refactoring einer unordentlichen Anwendung*

**Beschreibung:**
Du bekommst von einem unordentlichen Programmierer eine einzige, riesige Datei, in der Logik, Ein-/Ausgabe und Datenhaltung wild vermischt sind. Deine Aufgabe ist es, diesen Code mithilfe der KI zu verstehen, ein neues Design zu planen und den Code in ein sauberes Multi-File-System zu überführen.

**Didaktischer Nutzen:**
Du trainierst das Erkennen von schlechtem Code (*Code Smells*) und lernst, wie du KI gezielt einsetzt, um bestehenden Code schrittweise zu verbessern, ohne die Funktionalität zu zerstören.

#### Der Spaghetti-Monolith (Konzeptskizze):
```text
// DATEI: alles_in_einem.txt (Ungeordneter Monolith)
FUNCTION programm()
    PRINT "Gib deinen Namen ein:"
    Name = lies_eingabe()
    WENN Name == "" DANN
        PRINT "Fehler!"
        EXIT
    ENDE WENN
    // Hier wird direkt die Datei geschrieben, berechnet und ausgegeben:
    SCHREIBE_DATEI("datenbank.txt", Name)
    Score = LÄNGE(Name) * 42
    PRINT "Hallo " + Name + "! Dein Score ist: " + Score
    // ... Hunderte weitere Zeilen ...
END FUNCTION
```

#### Das modulare Ziel-Design (Pseudocode):
```text
// DATEI: benutzer_interface
FUNCTION frage_nach_name() -> Text
    // TODO: Benutzereingabe abfragen und validieren
    RETURN PLATZHALTER
END FUNCTION

// DATEI: daten_schreiber
FUNCTION speichere_benutzer(name: Text)
    // TODO: In Datei schreiben
END FUNCTION

// DATEI: score_berechner
FUNCTION berechne_score(name: Text) -> Zahl
    // TODO: Logik zur Score-Berechnung
    RETURN PLATZHALTER
END FUNCTION
```

#### Deine Lern-Prompts für dieses Projekt:
*   **Prompt 1 (Code-Analyse):**
    > *„Ich habe hier einen unübersichtlichen Code-Auszug: [Füge den Spaghetti-Code ein]. Bitte analysiere diesen Code und liste mir die drei größten Schwachstellen (Code Smells) auf. Erkläre mir, wie eine sauberere Aufteilung in mehrere Dateien aussehen könnte.“*
*   **Prompt 2 (Schritt-für-Schritt Refactoring):**
    > *„Ich möchte den Spaghetti-Code nun modularisieren. Lass uns mit dem ersten Teil beginnen: der Benutzereingabe. Erstelle mir eine separate Funktion dafür in [DEINE SPRACHE] als leeres Gerüst mit Platzhaltern, und erkläre mir, wie ich diese aus dem Hauptprogramm aufrufe.“*

---

## 💡 Zusammenfassung: Konzepte auf einen Blick

| Konzept | Worum geht es? | Typische KI-Falle | Dein Job als Entwickler |
| :--- | :--- | :--- | :--- |
| **Multi-File / Module** | Code auf mehrere logische Dateien aufteilen. | Schlägt gerne Monolithen vor; verwechselt Import-Pfade. | Struktur vorgeben, Imports manuell prüfen und anpassen. |
| **Legacy-Modernisierung** | Alten Code verstehen und modular umschreiben. | Schreibt Code komplett neu, übersieht dabei Edge Cases. | Schrittweise vorgehen, Code erst verstehen, dann modularisieren. |
| **Package-Management** | Externe Bibliotheken einbinden. | Halluziniert nicht-existierende Pakete oder veraltete APIs. | Paketnamen immer im offiziellen Register verifizieren. |
| **API-Dokumentation** | Externe APIs verstehen und nutzen. | Generiert veraltete oder fehlerhafte Code-Beispiele. | Dokumentation gegenlesen, Code-Gerüste selbst ausfüllen. |
| **Codebase-Exploration & Reverse Engineering** | Fremde, unstrukturierte Codebasen verstehen und durchdringen. | Verliert bei zu viel Kontext den Fokus; halluziniert Logikabläufe. | Kontext gezielt filtern (Top-Down/Bottom-Up), Flussdiagramme und Verhaltensfragen nutzen. |

---

## 📚 Links
*   **crates.io:** [Offizielles Rust-Paketregister](https://crates.io)
*   **pypi.org:** [Offizielles Python-Paketregister (PyPI)](https://pypi.org)
*   **npmjs.com:** [Offizielles JavaScript/TypeScript-Paketregister (npm)](https://www.npmjs.com)
*   **Refactoring.Guru:** [Verständliche Erklärungen zu Refactoring und Code Smells (auf Deutsch)](https://refactoring.guru/de)
*   **OWASP Dependency-Check:** [Informationen zur Sicherheit von externen Abhängigkeiten](https://owasp.org/www-project-dependency-check/)
