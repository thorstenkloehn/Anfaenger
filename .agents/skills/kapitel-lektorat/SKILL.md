---
name: kapitel-lektorat
description: Prüft Buchkapitel auf Verständlichkeit für Anfänger, Grammatik, Rechtschreibung und Einhaltung der Du-Form.
---

# Skill: Kapitel-Lektorat

Dieser Skill leitet das Lektorat von Buchkapiteln an, um sicherzustellen, dass die Inhalte für Rust-Einsteiger leicht verständlich, didaktisch sinnvoll und motivierend gestaltet sind.

## Kernrichtlinien für das Lektorat

### 1. Verständlichkeit für Anfänger & Tonalität
- **Du-Form einhalten:** Der gesamte Text muss durchgehend in der direkten und freundlichen "Du"-Form verfasst sein. Vermeide das unpersönliche "man" oder die "Sie"-Form.
- **Einfache Sprache:** Verwende kurze, präzise Sätze. Vermeide verschachtelte Sätze und unnötigen Nominalstil.
- **Keine unnötigen Hürden:** Setze kein fortgeschrittenes Informatikwissen voraus. Konzepte wie Speicherverwaltung, Zeiger oder Systemprogrammierung müssen von Grund auf erklärt werden.

### 2. Erklärung von Fachbegriffen & Analogien
- **Fachbegriffe vereinfachen:** Jeder neue Fachbegriff (z. B. *Ownership*, *Borrowing*, *Lifetimes*, *Traits*) muss bei der ersten Verwendung verständlich eingeführt und definiert werden.
- **Analogien vorschlagen:** Nutze alltagsnahe Analogien, um abstrakte Konzepte greifbar zu machen.
  - *Beispiel Ownership:* Ein physisches Buch, das immer nur einer Person gleichzeitig gehören kann. Wird es verschenkt (Move), verliert der Vorbesitzer den Zugriff.
  - *Beispiel Borrowing:* Das Ausleihen des Buchs. Der Entleiher darf es lesen (immutable borrow) oder reinschreiben (mutable borrow), aber der Besitzer behält das Eigentumsrecht.
- **Lernziele prüfen:** Stelle sicher, dass jedes Kapitel mit klaren, messbaren Lernzielen beginnt und am Ende überprüft, ob diese erreicht wurden.

### 3. Didaktischer Code-Umgang (Keine fertigen Lösungen!)
- **Kein Vorwegnehmen von Code:** Zeige niemals die fertige Gesamtlösung für Übungsaufgaben oder Compiler-Fehler. Der Leser soll die Lösung selbst erarbeiten.
- **Erlaubte Hilfestellungen:**
  - Konzeptionelle Denkanstöße und Hinweise (z. B. "Denke daran, wer zu diesem Zeitpunkt der Besitzer des Werts ist").
  - Unvollständige Code-Gerüste mit Platzhaltern (z. B. `todo!()` oder `// TODO: Ergänze hier deinen Code`).
  - Analyse von Fehlermeldungen des Compilers, um dem Leser zu helfen, das Problem selbst zu verstehen und zu beheben.

### 4. Grammatik, Rechtschreibung und Formatierung
- Prüfe den Text sorgfältig auf Tippfehler, Kommasetzung und Grammatik.
- Achte auf eine konsistente Formatierung von Code-Elementen (z. B. Variablen, Typen und Funktionen immer als inline-code wie `let x = 5;` formatieren).
