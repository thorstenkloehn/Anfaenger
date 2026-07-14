# 🤖 Konzepte statt Syntax lernen (Coding mit KI - Phase 1)

In der ersten Phase deiner Programmierausbildung geht es vor allem darum, ein grundlegendes Verständnis dafür zu entwickeln, wie du künstliche Intelligenz als mächtiges Werkzeug und didaktischen Partner einsetzt. Programmieren mit KI bedeutet nicht, Code blind zu kopieren – es bedeutet, die Konzepte dahinter zu verstehen und die KI gezielt zu steuern.

---

## 📌 1. Der Paradigmenwechsel: Vom Coder zum Orchestrator

Früher war Programmieren wie das Schreiben eines Kochbuchs: Jede einzelne Anweisung, jede Zutat und jeder Schritt mussten präzise manuell aufgeschrieben werden. Mit dem Einzug von KI-Systemen verändert sich deine Rolle grundlegend.

* **Vom Linienkoch zum Küchenchef:** Die KI übernimmt die Handarbeit (das Schneiden der Zwiebeln bzw. das Schreiben von Standard-Code-Zeilen), während du die Vision, die Systemarchitektur, das Rezept und die finale Qualitätskontrolle übernimmst.
* **Die FAAFO-Philosophie (nach Gene Kim & Steve Yegge):** *Fast, Ambitious, Autonomous, Fun, Optionality*. KI-Tools ermöglichen dir ein extrem schnelles und spielerisches Prototyping (oft als *Vibe Coding* bezeichnet). Du kannst Ideen in Minuten ausprobieren und verwerfen.
* **Das 70%-Problem (nach Addy Osmani):** KI-Tools können dir ca. 70 % der Arbeit abnehmen (Boilerplate-Code, Standard-Funktionen). Die verbleibenden 30 % – die kritische Architektur, Fehlerbehandlung, Sicherheit, Optimierung und die korrekte Logik – erfordern jedoch zwingend deine menschliche Expertise. Verlässt du dich blind auf die 70 %, baust du fehlerhafte und unsichere Software.

---

## 🔀 2. Wie KI-Coding-Technologie funktioniert

Um ein Werkzeug effektiv zu nutzen, musst du verstehen, wie es funktioniert.

* **Die probabilistische Engine (nach Durgesh Rajubhai Pawar):** Ein Large Language Model (LLM) ist im Grunde eine hochentwickelte Wahrscheinlichkeitsmaschine. Wenn du Code eingibst, berechnet das Modell, welche Zeichen und Wörter als Nächstes didaktisch und syntaktisch am wahrscheinlichsten folgen sollten.
* **Codevorschläge vs. Smart Completion:**
  * *Klassische Autovervollständigung (IntelliSense):* Liest die strikten Syntaxregeln der Programmiersprache aus und schlägt existierende Variablen oder Funktionen vor.
  * *KI-gestützte Programmierassistenten (GitHub Copilot, Cursor etc.):* Analysieren deinen geschriebenen Code, deine Kommentare und offene Dateien, um den logischen Kontext zu erfassen und ganze Codeblöcke vorherzusagen.
* **Das Abstraktionsproblem:** Da die KI auf Mustern aus Trainingsdaten basiert, „versteht“ sie logische Zusammenhänge nicht im menschlichen Sinne. Sie kann syntaktisch perfekten Code generieren, der jedoch logisch völlig fehlerhaft ist (semantische Fehler). Deine Aufgabe ist es, diesen Code stets kritisch zu hinterfragen.

---

## ⌨️ 3. Die Kunst des Promptings (Prompt Engineering)

Ein Prompt ist die Anweisung, die du der KI gibst. Im professionellen Kontext ist Prompting kein bloßes Ausprobieren, sondern eine strukturierte Methode.

### Die Anatomie eines guten Prompts *(nach Tom Taulli)*
1. **Rolle/Kontext:** Sag der KI, wer sie ist (z. B. *„Du bist ein didaktischer Rust-Mentor für Anfänger.“*).
2. **Aufgabe/Anweisung:** Definiere präzise, was getan werden soll (z. B. *„Erkläre mir das Konzept von Variablen im Vergleich zu Kisten.“*).
3. **Eingabedaten:** Gib relevanten Code oder Fehlermeldungen als Kontext mit.
4. **Format/Einschränkungen:** Bestimme das Ausgabeformat (z. B. *„Gib mir keine fertigen Codelösungen. Verwende stattdessen Code-Gerüste mit `todo!()` und führe mich mit Hinweisen zur Lösung.“*).

### Fortgeschrittene Prompt-Techniken für Einsteiger
* **Explain-Then-Implement (Erst erklären, dann umsetzen):** Lass dir von der KI erst das theoretische Konzept erklären und die Schritte strukturieren, bevor du sie Code generieren lässt.
* **Contract-First (Schnittstellen zuerst):** Definiere mit der KI zuerst die Signaturen (Eingabe- und Ausgabewerte einer Funktion), bevor du die eigentliche Logik ausarbeiten lässt.
* **Adversarial Review (Kritische Prüfung):** Bitte die KI nach einer Generierung: *„Welche Edge-Cases (Grenzfälle) oder potenziellen Fehlerquellen siehst du in diesem Entwurf?“*

---

## 🧠 4. Pair Programming als Lernwerkzeug nutzen

Wenn du Programmieren lernst, besteht die größte Gefahr darin, dass die KI deine Denkarbeit übernimmt. Verwende sie stattdessen als persönlichen Tutor:

* **Fordere didaktische Unterstützung ein:** Nutze Prompts wie: *„Ich möchte lernen, wie man Benutzereingaben in Rust verarbeitet. Gib mir eine kleine Aufgabe, aber verrate mir nicht den Code. Gib mir stattdessen Tipps, wie ich anfangen kann.“*
* **Umgang mit Fehlern:** Wenn der Compiler einen Fehler wirft, kopiere nicht einfach stumm die Korrektur der KI. Frage sie: *„Warum ist dieser Fehler aufgetreten und was lerne ich daraus über das Typsystem von Rust?“*
* **Gefahr von Package-Halluzinationen:** KI-Modelle neigen manchmal dazu, Crates (Bibliotheken) oder Funktionen zu erfinden, die es gar nicht gibt. Überprüfe die Vorschläge der KI daher immer in der offiziellen Dokumentation (z. B. auf docs.rs).

---

## 📌 Didaktischer Leitfaden für Phase 1

> [!IMPORTANT]
> **Deine goldenen Regeln im Umgang mit KI in Phase 1:**
> 
> 1. **Lies jeden generierten Codezeile aufmerksam durch.** Wenn du eine Zeile nicht verstehst, frage die KI nach einer Erklärung, bevor du weitermachst.
> 2. **Nutze Code-Gerüste:** Lass dir von der KI Funktionen mit `todo!()` generieren und versuche, die eigentliche Logik selbst auszufüllen.
> 3. **Hinterfrage Vorschläge:** Führe keine Befehle im Terminal aus und binde keine Crates ein, deren Funktionsweise du nicht grob verstehst.
