# 🤖 Modernes Programmieren mit KI

*Der goldene Weg: Modulär statt alles auf einmal.*

---

KI-Assistenten wie Antigravity, Gemini oder Claude Code sind fantastische Werkzeuge. Sie können uns beim Lernen unterstützen, Code erklären und uns mühsame Schreibarbeit abnehmen. Doch wer falsch mit ihnen interagiert, landet schnell in einer Frustrationsfalle.

Der häufigste Fehler von Einsteigern ist es, der KI eine riesige Aufgabe zu geben und zu erwarten, dass sie ein fertiges, fehlerfreies Programm ausspuckt. Das nennen wir die **„Monster-Prompt-Falle“**. In diesem Kapitel lernen wir, wie man Software mit KI **modulär und Schritt für Schritt** entwickelt.

---

## 🚫 Die Monster-Prompt-Falle (Und warum sie scheitert)

Stell dir vor, du gibst einer KI folgenden Prompt:

> *„Schreibe mir eine komplette To-Do-App in Rust. Sie soll eine SQLite-Datenbank nutzen, eine Weboberfläche haben, Benutzer einloggen können und E-Mail-Erinnerungen verschicken.“*

Was passiert? Die KI generiert Hunderte Zeilen Code. Du kopierst ihn in dein Projekt, drückst auf `cargo run` und der Compiler wirft dir 42 Fehlermeldungen entgegen. Da du den Code nicht selbst geschrieben hast, verstehst du weder die Fehler noch den Code selbst. Du bist frustriert, und der Lerneffekt ist gleich null.

### Warum scheitert dieser Ansatz?

1. **Kontext-Grenzen:** Obwohl moderne KIs viel Text verarbeiten können, sinkt die Präzision, je mehr Code sie auf einmal generieren müssen.
2. **Fehlende Kontrolle:** Wenn an zehn Stellen gleichzeitig Fehler auftreten, ist es fast unmöglich, die Ursache systematisch zu finden.
3. **Kein Lerneffekt:** Du wirst zum „Copy-Paste-Programmierer“. Wenn etwas nicht funktioniert, bist du hilflos.

---

## 🏗️ Das Prinzip: Modulär statt alles auf einmal

Der Schlüssel zum Erfolg ist die **Modularisierung**. Wir teilen ein großes Problem in viele kleine, unabhängige Bausteine (Module) auf. Jeden Baustein entwickeln, testen und verstehen wir einzeln, bevor wir zum nächsten übergehen.

| Vorgehen | Alles auf einmal (Autopilot) | Modulär (Co-Pilot/Pair Programming) |
| :--- | :--- | :--- |
| **Vorgehensweise** | Einen riesigen Prompt schreiben und hoffen. | Das Projekt in kleine Teilschritte zerlegen. |
| **Code-Größe** | 200+ Zeilen Code auf einmal generieren. | 10–30 Zeilen pro Schritt erstellen und prüfen. |
| **Fehlersuche** | 40+ Compiler-Fehler gleichzeitig debuggen. | Jeden Fehler sofort im Keim ersticken. |
| **Lerneffekt** | Gering (nur Kopieren). | Hoch (jeder Schritt wird verstanden). |

---

## 🧭 Die 8 goldenen Regeln für modulares KI-Programming

### 1. Starte mit dem MVP (Minimum Viable Product)
Baue zuerst das absolute Minimum, das funktionsfähig ist. 
*Beispiel:* Wenn du ein Spiel wie Tic-Tac-Toe bauen willst, lass die KI nicht direkt die grafische Oberfläche planen. Starte mit einem einfachen 3x3-Spielfeld im Terminal.

### 2. Definiere Schnittstellen (APIs) zuerst
Bevor du Logik schreiben lässt, überlege dir, wie deine Datenstrukturen aussehen.
*Beispiel:* Lass dir nicht die Spiellogik generieren, sondern frage die KI: *„Ich möchte ein Tic-Tac-Toe-Spiel bauen. Welche Structs und Enums brauche ich, um den Spielzustand darzustellen?“*

### 3. Ein Schritt nach dem anderen (Iteratives Prompting)
Arbeite in einer Schleife:
1. Erkläre der KI den nächsten kleinen Schritt.
2. Lass den Code generieren oder erklären.
3. **Kompiliere und teste sofort.**
4. Gehe erst weiter, wenn dieser Schritt perfekt funktioniert.

### 4. Nutze den Planungsmodus (`/planning`)
Wenn du mit Antigravity arbeitest, nutze immer den `/planning`-Befehl für größere Aufgaben. Dadurch zwingst du dich und die KI dazu, das Projekt in eine Liste von Checkboxen zu zerlegen.

### 5. Der „Architekt-Sicherheitsgurt“ (Constraints vorgeben)
Bevor die KI wild drauflosgeneriert, zwinge sie per Prompt, die Architektur festzulegen. Damit verhinderst du, dass der Code später instabil oder chaotisch wird.

**Prompt-Vorlage:**
> *„Ich möchte [Projekt-Beschreibung] bauen. Bevor du Code generierst, liste mir die 3 besten Architektur-Ansätze dafür auf. Nenne Vor- und Nachteile bezüglich Skalierbarkeit und Einfachheit. Ich wähle dann einen aus.“*

### 6. Test-Driven Vibe Coding (Erst Tests, dann Feature)
Lass die KI die Tests schreiben, bevor sie das Feature baut. Das zwingt die Generierung zu extrem hoher Genauigkeit und klärt Missverständnisse vorab.

**Prompt-Vorlage:**
> *„Wir bauen Feature X. Schreibe zuerst die automatisierten Unit-Tests für die erwarteten Ein- und Ausgaben. Erst wenn ich die Tests freigebe, schreibst du den eigentlichen Code, der diese Tests bestehen muss.“*

### 7. Das „Kritiker-Modul“ zuschalten (Self-Refinement)
Standardmäßig neigen KIs dazu, schnelle, aber manchmal unsaubere Lösungen auszugeben. Du kannst eine zweite Instanz (oder einen Folge-Prompt) als Code-Reviewer nutzen, um die Code-Qualität drastisch zu steigern.

**Prompt-Vorlage:**
> *„Reviewe den Code, den du gerade erstellt hast. Wo gibt es Sicherheitslücken, Performance-Flaschenhälse oder unsaubere Fehlerbehandlung? Optimiere den Code basierend auf deiner eigenen Kritik.“*

### 8. Technische Rahmenbedingungen festnageln (Tech-Stack definieren)
Vibe Coding bedeutet nicht, dass du keine Details nennen darfst. Je präziser der Tech-Stack, die Rust-Edition (z.B. Rust 2021) und die erlaubten Bibliotheken (Crates) definiert sind, desto weniger halluziniert die KI.

**Prompt-Vorlage:**
> *„Ich möchte ein Rust-Programm bauen, das [Zweck] erfüllt. Wir nutzen dafür Rust 2021 und ausschließlich die Standardbibliothek (keine externen Crates). Erstelle mir dafür...“*

---

## 🛠️ Alternativen zum reinen Vibe Coding

Es gibt verschiedene Philosophien, wie man KI im Entwicklungsprozess einsetzt. Neben dem spielerischen, manchmal unkontrollierten *Vibe Coding* (wo man sich eher treiben lässt) haben sich professionellere Ansätze etabliert:

### 1. Augmented Coding (Erweitertes Programmieren)
Das ist der direkte Gegensatz zum Vibe Coding für professionelle Software-Ingenieure. Während Vibe Coding oft versucht, das eigentliche Verstehen des Codes komplett zu überspringen, nutzt Augmented Coding die KI als reinen Kraftverstärker (Power Tool) für die eigene Expertise.

* **Der Kern:** Du behältst die volle Kontrolle über die Architektur, die Typsicherheit und das Systemdesign.
* **Wie es funktioniert:** Du nutzt die KI gezielt für mechanische Aufgaben (wie das Schreiben von Unit-Tests, das Erzeugen von Boilerplate-Code oder das Konvertieren von Datenstrukturen), prüfst aber jede Zeile Code manuell.
* **Fokus:** Codequalität, testgetriebene Entwicklung (TDD) und Wartbarkeit stehen im Vordergrund. Die Verantwortung bleibt zu 100 % beim Entwickler.

### 2. Design AI Coding (Architektur-zentriertes Coding)
Hier arbeitet die KI innerhalb eines streng vordefinierten, disziplinierten Rahmens. Man überlässt der KI nicht das Raten, wie das System aufgebaut sein soll.

* **Der Kern:** Bevor überhaupt eine Zeile Code generiert wird, werden die Domänenmodelle, Datenbankschemata (z. B. PostgreSQL-Tabellen und Relationen) und Geschäftsregeln präzise dokumentiert und der KI als striktes Kontext-Framework (z. B. via Claude Projects oder Custom Instructions) vorgegeben.
* **Vorteil:** Die KI liefert keine zufälligen, isolierten Code-Schnipsel, sondern baut exakt auf dem vorgegebenen Software-Design auf. Das verhindert Wildwuchs und sorgt für saubere Abstraktionen und Skalierbarkeit.

### 3. Agentic Coding (Autonomes Agenten-Coding)
Während Vibe Coding oft ein sequenzieller Chat mit einem Editor wie Cursor oder v0 ist, geht Agentic Coding (unterstützt durch Werkzeuge wie Claude Code oder spezialisierte Coding-Agenten) einen Schritt weiter in Richtung autonomer Workflows – aber mit technischem Verstand.

* **Der Kern:** Du gibst dem Agenten ein High-Level-Ziel (z. B. *„Migriere diese API-Endpunkte auf die neue Bibliotheksversion und passe die Tests an“*).
* **Wie es funktioniert:** Der Agent arbeitet autonom auf Dateiebene, liest das Repository, führt das Build-Tool aus, analysiert Compiler-Fehler, korrigiert sich selbst und reicht am Ende einen strukturierten Pull Request ein.
* **Unterschied zu Vibe:** Es ist kein blindes Hoffen auf die „Vibe“. Der Agent validiert seine Arbeit selbstständig durch Test-Suites und Compiler-Feedback im Terminal.

> [!NOTE]
> Die moderne Programmierung bewegt sich weg vom naiven „Lass die KI mal machen“ hin zu einer symbiotischen, aber kontrollierten Partnerschaft. Die stärksten Entwickler nutzen KI-Agenten heute nicht, um das Denken zu ersetzen, sondern um die Zeitspanne zwischen Architekturentwurf und fertiger, getesteter Implementierung drastisch zu verkürzen.

---

## ⚡ Moderne Entwicklungstechniken

Im Zusammenspiel mit KI-Systemen etablieren sich moderne Arbeitsweisen, die über das bloße Generieren von Code hinausgehen:

- **Der KI-gestützte Workflow:** Nutze KI-Tools wie Sprachmodelle nicht nur zum reinen Code-Generieren, sondern gezielt als Sparringspartner. Lass dir komplexe Algorithmen erklären, nutze sie für Code-Reviews oder um Edge-Cases (Sonderfälle) für Unittests zu finden.
- **Test-Driven Development (TDD) light:** Du musst nicht jede Zeile vorab testen, aber schreibe Tests für die Kernlogik (z. B. Geschäftslogik, Datenvalidierung). Das spart bei späteren Refactorings (Code-Umbauten) massig Zeit.
- **Continuous Integration (CI):** Richte frühzeitig automatisierte Pipelines (z. B. über GitHub Actions) ein, die deinen Code bei jedem Push automatisch kompilieren, testen und auf Formatierungsfehler prüfen.

---

## 📐 Architektur & Code-Qualität

Neben den Entwicklungstechniken gibt es fundamentale Prinzipien für die Architektur und Qualität deines Codes, die du auch bei der Arbeit mit KI stets im Auge behalten solltest:

- **Modularität und lose Kopplung:** Halte Komponenten unabhängig voneinander. Wenn du beispielsweise rechenintensive Logik optimieren musst, isoliere sie so, dass du sie bei Bedarf leicht austauschen oder beschleunigen kannst (z. B. durch das Auslagern in native Bibliotheken).
- **Keep It Simple (KISS):** Schreibe Code so, dass dein zukünftiges Ich ihn in sechs Monaten ohne stundenlanges Einlesen versteht. Klare Benennung von Variablen und Funktionen ist oft wertvoller als exzessive Kommentare.
- **Ressourcen- und Speichereffizienz:** Achte besonders bei Systemen mit begrenzten Ressourcen oder in nebenläufigen Umgebungen (Multi-Threading) auf Thread-Safety und minimalen Speicher-Overhead.

---

## 💬 Workflow-Vergleich: So promptest du richtig

Hier siehst du den Unterschied zwischen einem schlechten (monolithischen) und einem guten (modularen) Prompt-Verlauf für ein einfaches CLI-Tool, das Vokabeln abfragt.

### ❌ Schlechter Workflow (Alles auf einmal)
> **Du:** *„Schreibe ein Rust-Programm, das Vokabeln aus einer CSV-Datei liest, sie zufällig abfragt, die Punkte zählt und falsche Vokabeln am Ende wiederholt.“*
> *(Ergebnis: Riesiger Code-Block, schwer anzupassen, oft mit Fehlern beim CSV-Parsing oder der Zufallsgenerierung.)*

### ✅ Guter Workflow (Modulär & Schrittweise)

> [!TIP]
> Geh Schritt für Schritt vor. Das hält den Kontext sauber und dich im Fahrersitz.

**Schritt 1: Datenstruktur festlegen**
* **Prompt:** *„Ich möchte ein Vokabeltrainer-Programm in Rust schreiben. Wie sollte das Struct für eine einzelne `Vokabel` aussehen, wenn sie ein deutsches Wort, ein englisches Wort und eine Schwierigkeitsstufe hat?“*
* *Ergebnis:* Du erstellst die Datei `src/vokabel.rs` mit dem Struct. Du verstehst die Felder.

**Schritt 2: Einzelne Funktion schreiben**
* **Prompt:** *„Ich habe das Struct `Vokabel`. Schreibe mir eine Methode `ist_korrekt(&self, antwort: &str) -> bool`, die prüft, ob die eingegebene Antwort (ignoriere Groß-/Kleinschreibung) stimmt.“*
* *Ergebnis:* Du fügst die Methode hinzu, kompilierst und testest sie manuell oder mit einem Unit-Test.

**Schritt 3: Daten einlesen**
* **Prompt:** *„Jetzt möchte ich eine Liste von Vokabeln aus einem Hardcoded-Array laden, um die Logik zu testen, bevor ich später CSV-Dateien einbinde. Wie erstelle ich eine Funktion, die mir eine `Vec<Vokabel>` zurückgibt?“*
* *Ergebnis:* Der Code bleibt übersichtlich und testbar.

## 🎓 Die KI als Programmiertutor nutzen

Um eine KI effektiv als Programmiertutor zu nutzen, müssen Sie die Prompts so formulieren, dass die KI erklärt und anleitet, anstatt fertige Lösungen auszugeben.

Hier sind konkrete Prompt-Beispiele für verschiedene Lernphasen, die Sie direkt kopieren und anpassen können:

### 1. Konzept-Erkundung (Verständnis aufbauen)
Wenn du ein theoretisches Thema oder ein Rust-spezifisches Konzept verstehen willst:
> *„Erkläre mir das Konzept [Konzept, z. B. Generics oder Lifetimes] in Rust für einen Anfänger. Verwende eine prägnante Alltagsanalogie und zeige mir ein minimales Code-Beispiel. Gib mir keine komplexen Sonderfälle.“*

### 2. Strukturierte Planung (Vor dem Coden)
Wenn du ein neues kleines Feature oder Projekt planst:
> *„Ich plane ein Feature, das [Funktionalität] macht. Schreibe keinen lauffähigen Code. Erstelle mir stattdessen eine Liste der Structs, Enums und Funktionssignaturen (Schnittstellen), die für dieses Vorhaben sinnvoll sind, und begründe deine Design-Entscheidungen.“*

### 3. Fehleranalyse (Lernen aus Compiler-Meldungen)
Wenn der Compiler meckert und du die Fehlermeldung verstehen willst:
> *„Ich erhalte beim Kompilieren folgende Fehlermeldung: [Fehlermeldung kopieren]. Hier ist der betroffene Code-Abschnitt: [Code einfügen]. Erkläre mir genau, warum der Compiler diesen Fehler wirft, und gib mir Hinweise zur Behebung. Bitte erstelle keine fertige Codelösung.“*

### 4. Code-Optimierung & Review (Besser werden)
Wenn dein Code zwar funktioniert, du aber lernen willst, wie man ihn idiomatischer (nach Rust-Best-Practices) schreibt:
> *„Hier ist mein funktionierender Rust-Code: [Code einfügen]. Reviewe diesen Code bezüglich Lesbarkeit, Fehlerbehandlung und idiomatischem Rust-Stil. Zeige mir Verbesserungspotenziale auf und erkläre mir die Vorteile der vorgeschlagenen Änderungen.“*

### 5. Code-Erklärer (Bestehenden Code verstehen)
Nutzen Sie diesen Prompt, wenn Sie ein bestehendes Code-Beispiel sehen (z. B. aus einer Dokumentation oder einem Repository) und die Logik dahinter nicht verstehen.

**Prompt-Vorlage:**
> *„Ich lerne gerade Rust und versuche, diesen Code-Ausschnitt zu verstehen. Bitte schreibe mir keinen neuen Code. Erkläre mir stattdessen Schritt für Schritt in einfachem Deutsch, was hier passiert, besonders [spezifisches Konzept, z. B. die Speicherverwaltung / das Ownership-Modell / die Schleife].*
>
> *Hier ist der Code:*
> *[Code-Ausschnitt einfügen]“*

### 6. Architekt & Mentor (Konzepte verinnerlichen)
Wenn Sie wissen, was Sie bauen wollen, aber nicht wissen, wie Sie die Struktur aufsetzen sollen. Dieser Prompt verhindert, dass die KI das Projekt für Sie schreibt.

**Prompt-Vorlage:**
> *„Ich möchte ein kleines Projekt bauen: [Projektbeschreibung, z. B. ein lokales CLI-Tool zur Textanalyse]. Ich nutze dafür [Sprache/Framework].*
> *Bitte gib mir keinen fertigen Programmcode. Erstelle mir stattdessen einen logischen Bauplan (Pseudocode oder Architektur-Schritte), wie ich das Projekt modular aufbauen sollte. Welche Datenstrukturen und Konzepte machen hier Sinn?“*

### 7. Socratic Method (Fehlersuche durch Selbstdenken)
Wenn Ihr Code einen Fehler wirft. Statt die KI den Bug fixen zu lassen, zwingt dieser Prompt die KI, Ihnen nur Hinweise zu geben, damit Sie den Fehler selbst finden.

**Prompt-Vorlage:**
> *„Mein Code wirft einen Fehler, und ich möchte selbst herausfinden, woran es liegt. Bitte korrigiere den Code nicht für mich. Spiele die Rolle eines Sokratischen Lehrers: Analysiere meinen Code und den Fehler, und stelle mir dann 1–2 gezielte Fragen oder gib mir minimale Hinweise, die mich in die richtige Richtung lenken, um den Fehler selbst zu finden.*
>
> *Mein Code:*
> *[Code einfügen]*
>
> *Die Fehlermeldung:*
> *[Fehlermeldung einfügen]“*

### 8. Code-Review (Besser werden)
Wenn Ihr Code funktioniert, Sie aber wissen wollen, ob Sie idiomatisch, sicher und performant geschrieben haben (Refactoring lernen).

**Prompt-Vorlage:**
> *„Ich habe diese Funktion in Rust geschrieben und sie funktioniert wie gewünscht. Da ich die Best Practices der Sprache lernen möchte: Welche Aspekte dieses Codes könnte ich verbessern? Achte besonders auf [z. B. Speicher-Effizienz, Lesbarkeit, Typsicherheit]. Bitte erkläre mir die Schwachstellen meines Ansatzes, bevor du Optimierungsvorschläge zeigst.*
>
> *Mein Code:*
> *[Code einfügen]“*

### 9. Konzept-Vergleich (Transferwissen aufbauen)
Wenn Sie bereits eine Sprache können (oder Grundlagen haben) und ein neues, abstraktes Konzept verstehen wollen, indem Sie es mit Bekanntem verknüpfen.

**Prompt-Vorlage:**
> *„Ich versuche das Konzept von [Neues Konzept, z. B. Traits / Interfaces / Asynchrone Programmierung] in Rust zu verstehen. Kannst du mir dieses Konzept anhand einer Analogie aus der echten Welt erklären und kurz zeigen, wie sich das grundlegend von [Bekanntes Konzept, z. B. klassischer Vererbung] unterscheidet?“*

### 10. Syntax- und Grammatik-Erklärer (Code-Struktur entschlüsseln)
Nutzen Sie diesen Prompt, wenn Sie auf eine Codezeile mit ungewohnten Symbolen, Schlüsselwörtern oder einer unklaren Syntax stoßen und die genaue Grammatik verstehen wollen.

**Prompt-Vorlage:**
> *„Ich lerne gerade Rust und verstehe die Syntax dieser Codezeile nicht: `[Codezeile, z. B. impl<'a> MyStruct<'a> / let x = match y { ... }]`. Bitte brich die Zeile in ihre einzelnen Bestandteile herunter. Erkläre mir genau, was jedes Symbol (z. B. < >, &, ', _, ::) und jedes Schlüsselwort in dieser Zeile bedeutet und welche grammatikalische Funktion es erfüllt.“*

---

## 🤝 Die Symbiose: Klassisches Coden & Vibe Coding kombiniert

Lerne unbedingt zuerst klassisch programmieren. Die beste Strategie für die aktuelle Softwareentwicklung ist eine Kombination, bei der das klassische Handwerk das unerschütterliche Fundament bildet und "Vibe Coding" (KI-gestützte Entwicklung) als Beschleuniger dient.

Wenn du nur eines von beiden wählst, gerätst du schnell in eine Sackgasse. Hier ist die Begründung und wie ein moderner, hocheffizienter Workflow aussieht:

### 1. Das Fundament: Warum klassisches Programmieren unverzichtbar ist
Wenn du dich rein auf Vibe Coding verlässt (also Code komplett per Prompt von KI-Modellen wie Claude, ChatGPT oder lokalen LLMs generieren lässt), wirst du schnell an eine gläserne Decke stoßen.

- **Fehlersuche (Debugging):** KIs generieren Code, der syntaktisch korrekt aussieht, aber subtile logische Fehler oder Sicherheitslücken enthalten kann. Wenn du die Grundlagen (Datentypen, Kontrollstrukturen, Speicherverwaltung, Algorithmen) nicht verstehst, bist du blind und kannst den Fehler nicht beheben.
- **Architektur & Systemdesign:** Eine KI ist hervorragend darin, isolierte Funktionen oder Komponenten zu schreiben. Wie man jedoch Systeme entkoppelt, wartbare Softwarearchitekturen baut und Flaschenhälse bei der Performance (z. B. Multithreading, effiziente Datenbankabfragen) vermeidet, erfordert echtes Verständnis.
- **Der „Kontext-Fenster“-Einbruch:** Sobald ein Softwareprojekt groß und komplex wird, verliert die KI oft den Überblick über das Gesamtsystem. Du musst in der Lage sein, die Zügel in die Hand zu nehmen und den Code manuell zu strukturieren.

### 2. Der moderne Workflow: Die Symbiose aus beidem
Der stärkste Entwicklertyp von heute ist der **"AI-Amplified Engineer"**. Dabei nutzt du das Beste aus beiden Welten:

- **Klassisch für das „Wie“ und „Warum“:** Du lernst Sprachen, Konzepte und Architekturen. Du verstehst, wie Code unter der Haube ausgeführt wird.
- **Vibe Coding für das Tempo:** Du nutzt die KI, um Boilerplate-Code (Standard-Code-Gerüste) zu schreiben, Algorithmen zu skizzieren, Dokumentation zu generieren oder APIs schneller zu erforschen.

#### Die perfekte Strategie für moderne Entwicklung
Mach am besten beides parallel, aber mit klarer Rollenverteilung:

```
[ Deine Idee & Konzept ] 
       │
       ▼
[ Vibe Coding (KI-Agent) ] ──> Generiert das Grundgerüst & Fleißarbeit
       │
       ▼
[ Klassischer Code-Review ] ──> Du prüfst Logik, Performance & Sicherheit
```

### Der optimale moderne Entwicklungs-Workflow
Ein zeitgemäßer Workflow nutzt Werkzeuge, die deine kognitive Last verringern, während du die volle Kontrolle behältst.

1. **Konzeption & Architektur (Manuell / Klassisch):** Du planst die Datenstrukturen, die Systemgrenzen und die Logik. Verwende Markdown-Dateien oder Repositories, um das Ziel sauber zu definieren.
2. **Generierung von Teilstücken (Vibe Coding / KI):** Lass dir von KI-Assistenten (wie Cursor, GitHub Copilot oder lokalen Editoren) isolierte Funktionen, Unit-Tests oder Konfigurationen (z. B. Dockerfiles, CI/CD-Pipelines) erstellen.
3. **Code-Review & Refactoring (Hybrid):** Lies jeden von der KI generierten Satz Code kritisch. Optimiere die Performance manuell, stelle sicher, dass keine Ressourcen-Leaks vorliegen und der Code den Best Practices entspricht.
4. **Automatisierte Absicherung (Moderne Tools):** Nutze starke Compiler-Checks, Linters und automatisierte Test-Pipelines, um die Korrektheit des Codes mathematisch oder durch Laufzeittests zu garantieren.

### Empfehlung für den Einstieg
- **Lerne eine solide Sprache gründlich:** Wähle eine Sprache, die dir ein tiefes Verständnis für Typen und Strukturen vermittelt (zum Einstieg eignen sich Sprachen mit klaren Konzepten wie Python für den schnellen Start oder direkt System- und Anwendungssprachen wie C#, Java oder Rust, wenn du Performance und Typsicherheit von Grund auf verstehen willst).
- **Nutze die KI als interaktiven Tutor, nicht als Autopilot:** Nutze Prompts wie *"Erkläre mir Zeile für Zeile, was dieser Code tut und warum diese Datenstruktur hier effizienter ist"* statt *"Schreibe mir eine App, die X tut"*.
- **Erweitere dein Tooling schrittweise:** Wenn das Fundament sitzt, integriere IDE-Erweiterungen oder spezialisierte KI-Code-Editoren in deinen Alltag, um deine Tipp- und Recherchezeit zu minimieren.

### Andere moderne Techniken, die du im Auge behalten solltest:
- **Model Context Protocol (MCP):** Extrem wichtig für die Zukunft des Vibe Codings. Damit können KI-Tools nativ auf deine lokalen Entwicklungswerkzeuge, Datenbanken oder APIs zugreifen, um echten Kontext zu erhalten.
- **Containerisierung & Cloud-Native (Docker, Podman):** Da KI-Code oft schnell weggeschrieben wird, musst du in der Lage sein, isolierte, sichere Umgebungen (Sandboxes) aufzusetzen, in denen dieser Code ohne Risiko ausgeführt werden kann.
- **Automatisierte Pipeline-Architekturen (CI/CD):** Je schneller Code generiert wird, desto strenger und automatisierter müssen deine Test-Suiten sein, um Fehler sofort abzufangen.

> [!TIP]
> **Kurz gesagt:** Wer heute nur klassisch programmiert, ist oft zu langsam. Wer nur „vibet“, baut instabile Kartenhäuser. Die Kombination macht dich unschlagbar schnell und sicher.

---

## 🛠️ Übungen für dich

### 🔵 Übung 1: Das Monster zähmen
**Ziel:** Lernen, eine komplexe Anforderung in modulare Teilschritte zu zerlegen.

Stell dir vor, du möchtest ein **Haushaltsbuch (Budget-Planer)** als CLI-Tool bauen. Das Tool soll:
1. Einnahmen und Ausgaben speichern.
2. Die Daten in einer lokalen Textdatei sichern.
3. Statistiken anzeigen (z. B. Gesamtausgaben diesen Monat).

**Deine Aufgabe:**
Schreibe eine Liste von **mindestens 5 modular aufgebauten Prompts**, die du einer KI nacheinander stellen würdest, um dieses Projekt Schritt für Schritt zu entwickeln.
* *Hinweis:* Fange bei den Datenstrukturen an, gehe über die Dateispeicherung und füge ganz am Ende die CLI-Benutzeroberfläche hinzu.

### 🔵 Übung 2: Fehler isolieren
**Ziel:** Systematisches Debuggen durch modulares Vorgehen.

Wenn du eine Fehlermeldung vom Rust-Compiler erhältst, kopiere nicht die gesamte Datei in den Chat.
1. Versuche, nur die betroffene Funktion und die Fehlermeldung an die KI zu senden.
2. Nutze den Prompt: *„Der Compiler meldet diesen Fehler in Zeile X. Erkläre mir, warum dieser Fehler auftritt und gib mir einen Hinweis (keinen fertigen Code!), wie ich ihn beheben kann.“*

> [!IMPORTANT]
> Behalte immer die Kontrolle. Die KI ist dein Assistent, du bist der Architekt!


