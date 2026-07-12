---
name: uebungen-erstellen
description: Entwirft für ein Buchkapitel passende, anspruchsvolle Praxis-Aufgaben ohne fertige Codelösungen.
---

# Skill: Übungen erstellen

Dieser Skill beschreibt das standardisierte Vorgehen zur automatischen Erstellung von didaktisch wertvollen, praxisnahen Übungsaufgaben für die Kapitel des Rust-Buchs.

## Wichtige Grundregel (CRITICAL)
**Präsentiere niemals fertige Codelösungen!** 
Der Sinn der Übungen ist es, dass die Lernenden den Code selbst schreiben. Gib stattdessen didaktische Tipps, Verweise auf relevante Konzepte, nützliche Funktionen aus der Standardbibliothek oder beschreibe die erwartete Funktionsweise sowie Unittests zur Verifizierung der Lösung.

---

## Struktur der Übungsaufgaben

Jedes Kapitel soll Übungen in den folgenden drei Schwierigkeitsgraden anbieten:

### 1. Leicht (Grundlagen & Syntax)
*   **Fokus:** Direkte Anwendung der im Kapitel neu gelernten Konzepte und Syntaxelemente.
*   **Struktur:**
    1.  **Zielbeschreibung:** Was soll das Programm oder die Funktion tun?
    2.  **Code-Gerüst (optional):** Ein vorgegebenes Template mit `todo!()`, bei dem nur bestimmte Zeilen ergänzt werden müssen.
    3.  **Didaktische Tipps:** Konkrete Hinweise, welche Schlüsselwörter, Konstrukte oder Typen verwendet werden sollen.
    4.  **Testfall:** Ein einfacher Test (z. B. mit `assert_eq!`), den die Lernenden nutzen können, um ihre Lösung zu überprüfen.

### 2. Mittel (Kombination & kleine Anwendungen)
*   **Fokus:** Verknüpfung der neuen Konzepte mit bereits gelerntem Wissen, einfache Fehlerbehandlung und selbstständige Strukturierung von Funktionen.
*   **Struktur:**
    1.  **Aufgabenstellung:** Beschreibung eines kleinen, in sich geschlossenen Programms (z. B. ein Konsolen-Tool oder ein kleiner Datenkonverter).
    2.  **Anforderungen:** Eine detaillierte Kriterienliste, die erfüllt sein muss (z. B. "Behandle Fehler robust mit `Result`").
    3.  **Didaktische Tipps:** Verweise auf relevante Methoden der Standardbibliothek (z. B. `std::str::FromStr` oder `Option::unwrap_or`). Keine fertigen Implementierungen!
    4.  **Testfälle:** Mehrere Testfälle für unterschiedliche Eingabedaten und Randfälle.

### 3. Schwer (Architektur & fortgeschrittene Konzepte)
*   **Fokus:** Tiefes Verständnis der Rust-Besonderheiten (z. B. Ownership, Lifetimes, Traits, Generics, Concurrency oder fortgeschrittenes Error-Handling).
*   **Struktur:**
    1.  **Szenario:** Ein realistisches Praxis-Problem aus der Softwareentwicklung (z. B. ein einfacher Cache, ein Mini-Parser oder ein multithreaded Worker).
    2.  **Architekturvorgaben:** Welche Traits müssen implementiert werden? Welche Lifetime-Beziehungen müssen beachtet werden?
    3.  **Tipps zur Herangehensweise:** Empfohlene Einzelschritte zur schrittweisen Lösung der Aufgabe.
    4.  **Schnittstellen (API):** Die exakte Funktionssignatur oder Struct-Definition, die implementiert werden muss.
    5.  **Integrationstests:** Komplette Test-Suiten, die die korrekte Implementierung verifizieren.

---

## Schritt-für-Schritt-Anleitung für den Agenten

Wenn dieser Skill zur Erstellung von Übungen aufgerufen wird, gehe wie folgt vor:

1.  **Analyse des Ziel-Kapitels:** Lies das Buchkapitel aufmerksam durch, um die Kernkonzepte zu identifizieren.
2.  **Konzeption der Aufgaben:** Entwerfe je eine Aufgabe für die Schwierigkeitsgrade Leicht, Mittel und Schwer, die genau auf diese Kernkonzepte abgestimmt sind.
3.  **Erstellung der Aufgabenbeschreibungen:** Formuliere die Aufgaben gemäß den oben definierte Strukturen. Nutze dabei ausschließlich **absolute Pfade** bei der Referenzierung von Projektdateien oder Verzeichnissen im Buchprojekt (z. B. `/home/thorsten/Anfaenger/rust-projekte/src/...`).
4.  **Qualitätsprüfung:** Stelle sicher, dass an keiner Stelle fertige Codelösungen vorweggenommen werden. Ersetze Programmlösungen durch didaktische Hilfestellungen und Verweise auf Dokumentationen.
5.  **Speichern:** Schreibe die Übungsaufgaben in die entsprechende Übungsdatei des Buchprojekts, ohne die Datei `/home/thorsten/Anfaenger/rust-projekte/src/SUMMARY.md` zu verändern.
